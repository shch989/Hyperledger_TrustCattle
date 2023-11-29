import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AppUtilsService } from 'src/lib/apputil.service';
import { CAUtilsService } from 'src/lib/cautil.service';
import { FarmerRequestDto } from './dtos/FarmerRequest.dto';
import { Gateway, Wallet } from 'fabric-network';

@Injectable()
export class FarmerService {
  constructor(private readonly appUtilsService: AppUtilsService, private readonly caUtilsService: CAUtilsService) { }

  private readonly channelName = "mychannel";
  private readonly chaincodeName = "basic";
  private readonly affilication = "org1.department1"

  async signUpUser(userData: FarmerRequestDto) {
    // 회원가입 서비스
    const uid = userData.userId
    const affilication = this.affilication
    try {
      const caClient = this.caUtilsService.buildCAClient();
      const wallet = await this.appUtilsService.buildWallet();
      await this.caUtilsService.registerAndEnrollUser(caClient, wallet, 'Org1MSP', affilication, userData);

      const rObj = { message: `An user id is created - ${uid}` };
      return rObj;
      
    } catch (error) {
      console.error(error);
      throw new HttpException({
        error: error.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  logInUser(userData: any): Promise<any> {
    // 로그인 서비스
    return userData
  }

  updateProfile(userId: string, updatedData: any): Promise<any> {
    // 프로필 업데이트 서비스
    return updatedData
  }
}
