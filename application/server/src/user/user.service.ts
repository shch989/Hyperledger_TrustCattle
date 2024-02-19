import { Injectable } from '@nestjs/common';
import { AppUtilsService } from 'src/lib/apputil.service';
import { CAUtilsService } from 'src/lib/cautil.service';

@Injectable()
export class UserService {
  constructor(
    private readonly caUtils: CAUtilsService,
    private readonly appUtils: AppUtilsService,
    ) {}
  
  async createUser(userId: string, affiliation: string) {
    try {
        const caClient = this.caUtils.buildCAClient();
        const wallet = await this.appUtils.buildWallet();
        await this.caUtils.registerAndEnrollUser(caClient, wallet, userId, affiliation);

        const rObj = {
          result: "Success",
          message: `An user id is created - ${userId}`
        }
        return rObj
    } catch (error) {
        const rObj = {
          result: "fail",
          error: error.message
        }
        return rObj
    }    
  }
}
