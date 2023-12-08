import { Body, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { CattleService } from './cattle.service';
import { CattleRequestDto } from './dtos/CattleRequest.dto';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { GetCattleRequestDto } from './dtos/GetCattleRequest.dto';

@Controller('cattle')
@UseInterceptors(new SuccessInterceptor())
export class CattleController {
  constructor(private readonly cattleService: CattleService) { }

  @Post('register')
  async registerCattle(@Body() cattleData: CattleRequestDto) {
    // 가축 등록
    const result = await this.cattleService.registerCattle(cattleData)
    return result
  }

  @Post('findcattle')
  async findCattles(@Body() findData: GetCattleRequestDto) {
    // 가축 등록
    const result = await this.cattleService.findCattles(findData)
    return result
  }

  @Post('update-info/:cattleId')
  async updateCattleInfo(@Param('cattleId') cattleId: string, @Body() body: any) {
    // 가축 정보 수정
    const result = await this.cattleService.updateCattleInfo(cattleId, body)
    return result
  }

  @Get('get-all-for-sale')
  async getAllForSaleCattle() {
    // 판매중인 모든 가축 정보 출력
    const result = await this.cattleService.getAllForSaleCattle();
    return result
  }

  @Post('sell-request/:cattleId')
  async sellRequest(@Param('cattleId') cattleId: string, @Body() body: any) {
    // 가축 판매 신청
    const result = await this.cattleService.requestCattleSale(cattleId, body)
    return result
  }
}
