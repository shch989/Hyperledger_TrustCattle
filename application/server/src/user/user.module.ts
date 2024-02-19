import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { LibModule } from 'src/lib/lib.module';

@Module({
  imports: [LibModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
