// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { ResultsService } from './results.service';
// import { CreateResultDto } from './dto/create-result.dto';
// import { UpdateResultDto } from './dto/update-result.dto';

// @Controller('results')
// export class ResultsController {
//   constructor(private readonly resultsService: ResultsService) {}

//   @Post()
//   create(@Body() createResultDto: CreateResultDto) {
//     return this.resultsService.create(createResultDto);
//   }

//   @Get()
//   findAll() {
//     return this.resultsService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.resultsService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateResultDto: UpdateResultDto) {
//     return this.resultsService.update(+id, updateResultDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.resultsService.remove(+id);
//   }
// }

import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  Patch,
} from '@nestjs/common';
import { CreateResultDto, UpdateResultDto } from './dto/index';
import { Result } from './entities/result.entity';
import { ResultsService } from './results.service';

@Controller('results')
export class ResultsController {
  constructor(private ResultsService: ResultsService) {}

  @Get()
  async GetAll(): Promise<Result[]> {
    return this.ResultsService.getAll();
  }

  @Get(':id')
  async GetOne(@Param('id', ParseIntPipe) id: number): Promise<Result> {
    return this.ResultsService.getOneById(id);
  }

  @Post()
  async create(@Body() result: CreateResultDto): Promise<Result> {
    return this.ResultsService.create(result);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() result: UpdateResultDto,
  ): Promise<Result> {
    return this.ResultsService.update(id, result);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return this.ResultsService.delete(id);
  }
}
