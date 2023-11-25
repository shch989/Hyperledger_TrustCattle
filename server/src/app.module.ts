import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CattleModule } from './cattle/cattle.module';

@Module({
  imports: [AuthModule, CattleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
