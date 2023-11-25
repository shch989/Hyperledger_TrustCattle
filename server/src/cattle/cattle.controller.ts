import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CattleService } from './cattle.service';

@Controller('cattle')
export class CattleController {
  constructor(private readonly cattleService: CattleService) { }

  @Post('register')
  async registerCattle(@Body() body: any) {
    // 가축 등록
    const result = await this.cattleService.registerCattle(body)
    return result
  }

  @Post('update-info/:cattleId')
  async updateCattleInfo(@Param('cattleId') cattleId: string, @Body() body: any) {
    // 가축 정보 수정
    const result = await this.cattleService.updateCattleInfo(cattleId, body)
    return result
  }

  @Get('get-all-for-sale')
  getAllForSaleCattle() {
    return this.cattleService.getAllForSaleCattle();
  }

  @Post('sell-request')
  async sellRequest(@Body() body: any) {
    // 가축 판매 신청
    const result = await this.cattleService.requestCattleSale(body)
    return result
  }
}
