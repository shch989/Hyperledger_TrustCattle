import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dtos/create-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Post()
  async createAdmin(@Body() createAdminDto: CreateAdminDto) {
    const { adminId, adminPw } = createAdminDto;
    const result = await this.adminService.adminService(adminId, adminPw)
    return result;
  }
}
