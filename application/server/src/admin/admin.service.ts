import { Injectable } from '@nestjs/common';
import { AppUtilsService } from 'src/lib/apputil.service';
import { CAUtilsService } from 'src/lib/cautil.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly caUtilsService: CAUtilsService, 
    private readonly appUtilsService: AppUtilsService
  ) {}
  
  async adminService(adminId: string, adminPw: string) {
    try {
        const caClient = this.caUtilsService.buildCAClient();
        const wallet = await this.appUtilsService.buildWallet();
        await this.caUtilsService.enrollAdmin(caClient, wallet, adminId, adminPw);

        const rObj = {
          result: "success",
          message: "An admin id is created",
        }
        return rObj

    } catch (error) {
        console.log(error);
        const rObj = {
          result: "fail",
          error: error.message,
        }
        return rObj
    }
  }
}
