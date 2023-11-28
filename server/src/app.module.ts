import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CattleModule } from './cattle/cattle.module';
import { TransactionModule } from './transaction/transaction.module';
import { LibModule } from './lib/lib.module';

@Module({
  imports: [AuthModule, CattleModule, TransactionModule, LibModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
