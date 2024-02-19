import { Module } from '@nestjs/common';
import { ExperienceController } from './experience.controller';
import { ExperienceService } from './experience.service';
import { LibModule } from 'src/lib/lib.module';

@Module({
  imports: [LibModule],
  controllers: [ExperienceController],
  providers: [ExperienceService]
})
export class ExperienceModule {}
