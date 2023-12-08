import { Module } from '@nestjs/common';
import { CattleController } from './cattle.controller';
import { CattleService } from './cattle.service';
import { LibModule } from 'src/lib/lib.module';

@Module({
  imports: [LibModule],
  controllers: [CattleController],
  providers: [CattleService]
})
export class CattleModule {}
