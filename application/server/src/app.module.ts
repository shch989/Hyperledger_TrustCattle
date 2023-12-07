import { Module } from '@nestjs/common';
import { FarmerModule } from './farmer/farmer.module';
import { CattleModule } from './cattle/cattle.module';
import { TransactionModule } from './transaction/transaction.module';
import { LibModule } from './lib/lib.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [FarmerModule, CattleModule, TransactionModule, LibModule, AdminModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
