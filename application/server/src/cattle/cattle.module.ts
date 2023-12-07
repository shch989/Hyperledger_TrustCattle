import { Module } from '@nestjs/common';
import { CattleController } from './cattle.controller';
import { CattleService } from './cattle.service';

@Module({
  controllers: [CattleController],
  providers: [CattleService]
})
export class CattleModule {}
