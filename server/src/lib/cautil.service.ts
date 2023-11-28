import { Injectable } from '@nestjs/common';
import * as FabricCAServices from 'fabric-ca-client';
import { Wallet } from 'fabric-network';
import { AppUtilsService } from './apputil.service';

@Injectable()
export class CAUtilsService {
  constructor(private readonly appUtilsService: AppUtilsService) {}
  private readonly ccp = this.appUtilsService.buildCCPOrg1()
  private readonly adminUserId = 'admin';
  private readonly caHostName = 'ca.org1.example.com'
  private readonly mspOrg1 = 'Org1MSP'

  buildCAClient(): FabricCAServices {
    const caInfo = this.ccp.certificateAuthorities[this.caHostName];
    const caTLSCACerts = caInfo.tlsCACerts.pem;
    const caClient = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);

    console.log(`Built a CA Client named ${caInfo.caName}`);
    return caClient;
  }

  async enrollAdmin(caClient: FabricCAServices, wallet: Wallet, adminId: string, adminPasswd: string): Promise<void> {
    try {
      if (adminId != this.adminUserId) {
        throw new Error('Admin ID does not match.');
      }

      const identity = await wallet.get(this.adminUserId);
      if (identity) {
        console.log("An identity for the admin user already exists in the wallet");
        return;
      }

      const enrollment = await caClient.enroll({ enrollmentID: adminId, enrollmentSecret: adminPasswd });
      const x509Identity = {
        credentials: {
          certificate: enrollment.certificate,
          privateKey: enrollment.key.toBytes(),
        },
        mspId: this.mspOrg1,
        type: "X.509",
      };

      await wallet.put(this.adminUserId, x509Identity);
      console.log("Successfully enrolled admin user and imported it into the wallet");
    } catch (error) {
      console.error(`Failed to enroll admin user - ${error}`);
      throw new Error(error);
    }
  }

  async registerAndEnrollUser(
    caClient: FabricCAServices,
    wallet: Wallet,
    orgMspId: string,
    userId: string,
    affiliation: string,
  ): Promise<void> {
    try {
      const userIdentity = await wallet.get(userId);
      if (userIdentity) {
        console.log(`An identity for the user ${userId} already exists in the wallet`);
        throw new Error(`An identity for the user ${userId} already exists in the wallet`);
      }

      const adminIdentity = await wallet.get(this.adminUserId);
      if (!adminIdentity) {
        console.log(`An identity for the user ${userId} already exists in the wallet`);
        throw new Error(`An identity for the user ${userId} already exists in the wallet`);
      }

      const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
      const adminUser = await provider.getUserContext(adminIdentity, this.adminUserId);

      const secret = await caClient.register(
        {
          affiliation: affiliation,
          enrollmentID: userId,
          role: "client",
        },
        adminUser,
      );

      const enrollment = await caClient.enroll({
        enrollmentID: userId,
        enrollmentSecret: secret,
      });

      const x509Identity = {
        credentials: {
          certificate: enrollment.certificate,
          privateKey: enrollment.key.toBytes(),
        },
        mspId: orgMspId,
        type: "X.509",
      };

      await wallet.put(userId, x509Identity);
      console.log(`Successfully registered and enrolled user ${userId} and imported it into the wallet`);
    } catch (error) {
      console.error(`Failed to register user: ${error}`);
      throw new Error(error);
    }
  }
}
