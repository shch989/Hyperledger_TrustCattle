import { Module } from '@nestjs/common';
import { CAUtilsService } from './cautil.service';
import { AppUtilsService } from './apputil.service';

@Module({
  exports: [AppUtilsService, CAUtilsService],
  providers: [AppUtilsService, CAUtilsService]
})
export class LibModule { }
