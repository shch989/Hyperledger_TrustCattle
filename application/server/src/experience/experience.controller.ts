import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { ExperienceQueryDto } from './dtos/experience-query.dto';
import { ExperienceCreateDto } from './dtos/experience-create-dto';

@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Get()
  getExperience(@Query() experienceQueryDto: ExperienceQueryDto) {
    const result = this.experienceService.getExperience(experienceQueryDto) 
    return result
  }

  @Post()
  createExperience(@Body() experienceCreateDto: ExperienceCreateDto) {
    const result = this.experienceService.createExperience(experienceCreateDto) 
    return result
  }

  @Get('/history')
  getExperienceHistory(@Query() experienceQueryDto: ExperienceQueryDto) {
    const result = this.experienceService.getExperienceHistory(experienceQueryDto) 
    return result
  }  
}
