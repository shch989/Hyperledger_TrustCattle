import { Injectable } from '@nestjs/common';
import { Gateway, Wallet } from 'fabric-network';
import { AppUtilsService } from 'src/lib/apputil.service';
// dtos
import { ExperienceCreateDto } from './dtos/experience-create-dto';
import { ExperienceQueryDto } from './dtos/experience-query.dto';

@Injectable()
export class ExperienceService {
  constructor(
    private readonly appUtilsService: AppUtilsService,
  ) { }

  private readonly channelName = 'toychannel';
  private readonly chaincodeName = 'exp';
  private readonly ccp = this.appUtilsService.buildCCPOrg2()

  async createExperience(experienceCreateDto: ExperienceCreateDto) {
    const { cert, eid, sid, kcid } = experienceCreateDto
    const wallet: Wallet = await this.appUtilsService.buildWallet();
    const gateway = new Gateway();
    try {
      await gateway.connect(this.ccp, {
        wallet,
        identity: cert,
        discovery: { enabled: true, asLocalhost: true }
      });
      const network = await gateway.getNetwork(this.channelName);
      const contract = network.getContract(this.chaincodeName);

      await contract.submitTransaction('ProposeEXP', eid, sid, kcid);
      //성공응답
      const rObj = {
        result: "success",
        message: "tx has been submitted"
      }
      return rObj
    } catch (error) {
      //실패응답
      const rObj = {
        result: "fail",
        error: error.message
      }
      return rObj
    } finally {
      gateway.disconnect();
    }
  }

  async getExperience(experienceQueryDto: ExperienceQueryDto) {
    const { cert, id } = experienceQueryDto
    const wallet: Wallet = await this.appUtilsService.buildWallet();
    const gateway = new Gateway();
    try {
      await gateway.connect(this.ccp, {
        wallet,
        identity: cert,
        discovery: { enabled: true, asLocalhost: true }
      });

      const network = await gateway.getNetwork(this.channelName);
      const contract = network.getContract(this.chaincodeName);

      let result = await contract.evaluateTransaction('ReadEXP', id);
      console.log('반환된 결과:', result);
      const parsed_data = JSON.parse(result.toString());
      //성공응답
      const rObj = {
        result: "success",
        message: parsed_data
      }
      return rObj
    } catch (error) {
      //실패응답
      const rObj = {
        result: "fail",
        error: error.message
      }
      return rObj
    } finally {
      gateway.disconnect();
    }
  }

  async getExperienceHistory(experienceQueryDto: ExperienceQueryDto) {
    const { cert, id } = experienceQueryDto
    const wallet = await this.appUtilsService.buildWallet();
    const gateway = new Gateway();

    try {
      await gateway.connect(this.ccp, {
        wallet,
        identity: cert,
        discovery: { enabled: true, asLocalhost: true }
      });

      const network = await gateway.getNetwork(this.channelName);
      const contract = network.getContract(this.chaincodeName);

      let result = await contract.evaluateTransaction('QueryEXPHistory', id);
      console.log('반환된 결과:', result);
      var parsed_data = JSON.parse(result.toString());
      console.log(parsed_data)
      //성공응답
      const rObj = {
        result: "success",
        message: parsed_data
      }
      return rObj
    } catch (error) {
      //실패응답
      const rObj = {
        result: "fail",
        error: error.message
      }
      return rObj
    } finally {
      gateway.disconnect();
    }
  }
}
