import { Injectable } from '@nestjs/common';
import * as FabricCAServices from 'fabric-ca-client';
import { Wallet, X509Identity } from 'fabric-network';
import { AppUtilsService } from './apputil.service';

@Injectable()
export class CAUtilsService {
  constructor(private readonly appUtilsService: AppUtilsService) { }
  private readonly ccp = this.appUtilsService.buildCCPOrg2()
  private readonly adminUserId = 'admin';
  private readonly caHostName = 'ca.org2.example.com'
  private readonly mspOrg2 = 'Org2MSP'

  buildCAClient(): FabricCAServices {
    const caInfo = this.ccp.certificateAuthorities[this.caHostName];
    const caTLSCACerts = caInfo.tlsCACerts.pem;
    const caClient = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);

    console.log(`Built a CA Client named ${caInfo.caName}`);
    return caClient;
  }

  async enrollAdmin(caClient: FabricCAServices, wallet: Wallet, adminId: string, adminPw: string): Promise<void> {
    try {
      console.log(caClient, wallet, this.mspOrg2, adminId, adminPw)
      if (adminId != this.adminUserId) {
        throw new Error('Admin ID does not match.');
      }

      const identity = await wallet.get(this.adminUserId);
      if (identity) {
        console.log("An identity for the admin user already exists in the wallet");
        throw new Error("An identity for the admin user already exists in the wallet")
      }

      const enrollment = await caClient.enroll({ enrollmentID: adminId, enrollmentSecret: adminPw });
      const x509Identity = {
        credentials: {
          certificate: enrollment.certificate,
          privateKey: enrollment.key.toBytes(),
        },
        mspId: this.mspOrg2,
        type: "X.509",
      };

      await wallet.put(adminId, x509Identity);
      console.log("Successfully enrolled admin user and imported it into the wallet");
    } catch (error) {
      console.error(`Failed to enroll admin user - ${error}`);
      throw new Error(`Failed to enroll admin user - ${error}`);
    }
  }

  async registerAndEnrollUser(
    caClient: FabricCAServices,
    wallet: Wallet,
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
        console.log(`An identity for the admin user does not exist in the wallet`);
        throw new Error(`An identity for the admin user does not exist in the wallet`);
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

      const x509Identity: X509Identity = {
        credentials: {
          certificate: enrollment.certificate,
          privateKey: enrollment.key.toBytes(),
        },
        mspId: this.mspOrg2,
        type: "X.509",
      };

      // Store the user details in the wallet (or your database)
      await wallet.put(userId, x509Identity);

      console.log(`Successfully registered and enrolled user ${userId} and imported it into the wallet`);
    } catch (error) {
      console.error(`Failed to register user: ${error}`);
      throw new Error(`Failed to register user: ${error}`);
    }
  }
}