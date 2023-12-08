import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AppUtilsService } from 'src/lib/apputil.service';
import { CAUtilsService } from 'src/lib/cautil.service';
import { CattleRequestDto } from './dtos/CattleRequest.dto';
import { Gateway, Wallet } from 'fabric-network';
import { GetCattleRequestDto } from './dtos/GetCattleRequest.dto';

@Injectable()
export class CattleService {
  constructor(private readonly appUtilsService: AppUtilsService, private readonly cautilsService: CAUtilsService) { }
  
  private readonly channelName = "cattlechannel";
  private readonly chaincodeName = "cattle";
  
  async registerCattle(cattleData: CattleRequestDto) {
    console.log(cattleData)

    const wallet: Wallet = await this.appUtilsService.buildWallet()
    const gateway = new Gateway()
    const ccp = this.appUtilsService.buildCCPOrg1()
    try {
      await gateway.connect(ccp, {
        wallet,
        identity: cattleData.owner,
        discovery: {
          enabled: true,
          asLocalhost: true
        }
      })
      const network = await gateway.getNetwork(this.channelName)
      const contract = network.getContract(this.chaincodeName)

      await contract.submitTransaction('CreateCattle', cattleData.cattleId, cattleData.birthdate, cattleData.gender, cattleData.weight, cattleData.dad, cattleData.mom, cattleData.owner)
      const rObj = { message: `tx has been submitted` };
      return rObj;

    } catch (error) {
      console.error(error);
      throw new HttpException({
        error: error.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      gateway.disconnect()
    }
  }

  async findCattles(findData: GetCattleRequestDto) {
    console.log(findData.cattleId, findData.owner)

    const wallet: Wallet = await this.appUtilsService.buildWallet()
    const gateway = new Gateway()
    const ccp = this.appUtilsService.buildCCPOrg1()
    try {
      await gateway.connect(ccp, {
        wallet,
        identity: findData.owner,
        discovery: {
          enabled: true,
          asLocalhost: true
        }
      })
      const network = await gateway.getNetwork(this.channelName)
      const contract = network.getContract(this.chaincodeName)

      const result = await contract.evaluateTransaction('ReadCattle', findData.cattleId)
      const resultString = result.toString('utf-8');
      const parsed_data = JSON.parse(resultString)
      const rObj = { message: parsed_data };
      return rObj;

    } catch (error) {
      console.error(error);
      throw new HttpException({
        error: error.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      gateway.disconnect()
    }
  }

  updateCattleInfo(cattleId: string, updatedData: any) {
    // 가축 정보 업데이트 로직
    return updatedData
  }

  requestCattleSale(cattleId: string, saleData: any) {
    // 가축 판매 신청 로직
    return saleData
  }

  getAllForSaleCattle() {
    // 판매 중인 모든 가축 조회 로직
    const cattleData = []
    return cattleData[""]
  }
}
