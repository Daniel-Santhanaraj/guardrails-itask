import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateResultDto, UpdateResultDto } from './dto/index';
import { Result } from './entities/result.entity';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(Result) private resultRepository: Repository<Result>,
  ) {}

  async getAll(): Promise<Result[]> {
    return await this.resultRepository.find();
  }

  async getOneById(id: number): Promise<Result> {
    try {
      return await this.resultRepository.findOneOrFail({
        where: { id: id },
      });
    } catch (err) {
      console.log('Get one result by id error: ', err.message ?? err);
      throw new HttpException(
        `Result with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async create(result: CreateResultDto): Promise<Result> {
    //result.findings = JSON.stringify(result.findings);
    const createdResult = this.resultRepository.create(result);
    return await this.resultRepository.save(createdResult);
  }

  async update(id: number, result: UpdateResultDto): Promise<Result> {
    let foundResult = await this.resultRepository.findOneBy({
      id: id,
    });

    if (!foundResult) {
      throw new HttpException(
        `Result with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }

    foundResult = { ...foundResult, ...result, updatedAt: new Date() };
    return await this.resultRepository.save(foundResult);
  }

  async delete(id: number): Promise<number> {
    let foundResult = await this.resultRepository.findOneBy({
      id: id,
    });

    if (!foundResult) {
      throw new HttpException(
        `Pesult with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.resultRepository.delete(id);
    return foundResult.id;
  }
}

// import { Injectable } from '@nestjs/common';
// import { CreateResultDto } from './dto/create-result.dto';
// import { UpdateResultDto } from './dto/update-result.dto';

// @Injectable()
// export class ResultsService {
//   create(createResultDto: CreateResultDto) {
//     return 'This action adds a new result';
//   }

//   findAll() {
//     return `This action returns all results`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} result`;
//   }

//   update(id: number, updateResultDto: UpdateResultDto) {
//     return `This action updates a #${id} result`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} result`;
//   }
// }
