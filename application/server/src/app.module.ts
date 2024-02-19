import { Module } from '@nestjs/common';
import { LibModule } from './lib/lib.module';
import { AppController } from './app.controller';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { ExperienceModule } from './experience/experience.module';

@Module({
  imports: [LibModule, AdminModule, UserModule, ExperienceModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
