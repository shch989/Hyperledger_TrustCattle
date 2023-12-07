import { Body, Controller, Param, Post, UseInterceptors } from '@nestjs/common';
import { FarmerService } from './farmer.service';
import { FarmerRequestDto } from './dtos/FarmerRequest.dto';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';

@Controller('farmer')
@UseInterceptors(new SuccessInterceptor())
export class FarmerController {
  constructor(private readonly farmerService: FarmerService) { }

  @Post('signup')
  async signUp(@Body() userData: FarmerRequestDto) {
    // 사육자 회원가입
    const result = await this.farmerService.signUpUser(userData)
    return result
  }

  @Post('login')
  async logIn(@Body() body: any) {
    // 사육자 로그인
    const result = await this.farmerService.logInUser(body)
    return result
  }

  @Post('update-profile/:userId')
  async updateProfile(@Param('userId') userId: string, @Body() body: any) {
    // 사육자 정보 수정
    const result = await this.farmerService.updateProfile(userId, body)
    return result    
  }
}
