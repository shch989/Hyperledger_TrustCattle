import { Body, Controller, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  async signUp(@Body() body: any) {
    // 사육자 회원가입
    const result = await this.authService.signUpUser(body)
    return result
  }

  @Post('login')
  async logIn(@Body() body: any) {
    // 사육자 로그인
    const result = await this.authService.logInUser(body)
    return result
  }

  @Post('update-profile/:userId')
  async updateProfile(@Param('userId') userId: string, @Body() body: any) {
    // 사육자 정보 수정
    const result = await this.authService.updateProfile(userId, body)
    return result    
  }
}
