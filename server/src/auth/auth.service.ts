import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signUpUser(userData: any): Promise<any> {
    // 회원가입 서비스
    return userData
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
