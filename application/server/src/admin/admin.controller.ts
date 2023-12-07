import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { AdminService } from './admin.service';
import { AdminRequestDto } from './dtos/AdminRequest.dto';

@Controller('admin')
@UseInterceptors(new SuccessInterceptor())
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Post()
  async createAdmin(@Body() adminData: AdminRequestDto) {
    const adminResult = await this.adminService.createAdmin(adminData)
    return adminResult
  }
}