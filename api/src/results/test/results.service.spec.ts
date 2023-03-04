import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from './../entities/result.entity';
import { ResultsService } from '../results.service';
//import { mockResultsRepository } from './mockResultsRepository';
import { resultsStub, resultStub } from './result.stub';

export const mockResultsRepository = {
  find: jest.fn().mockResolvedValue(resultsStub()),
  findOneOrFail: jest.fn().mockResolvedValue(resultStub()),
  findOneBy: jest.fn().mockResolvedValue(resultStub()),
  create: jest.fn().mockResolvedValue(resultStub()),
  save: jest.fn((product: Result) => product),
  delete: jest.fn((id: number) => id),
};

describe('ResultsService', () => {
  let service: ResultsService;
  let resultRepository: Repository<Result>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResultsService,
        {
          provide: getRepositoryToken(Result),
          useValue: mockResultsRepository,
        },
      ],
    }).compile();

    service = module.get<ResultsService>(ResultsService);
    resultRepository = module.get(getRepositoryToken(Result));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of results', async () => {
      const cats = await service.getAll();
      expect(cats).toEqual(resultsStub());
    });
  });

  describe('getOneById', () => {
    it('should get a single result', () => {
      expect(service.getOneById(1)).resolves.toEqual(resultStub());
      expect(resultRepository.findOneOrFail).toBeCalledWith({
        where: { id: 1 },
      });
    });

    it("should return an http error when result id doesn't exist", async () => {
      const id = 10;
      const spy = jest
        .spyOn(resultRepository, 'findOneOrFail')
        .mockImplementationOnce(() => {
          throw new HttpException(
            `result with id ${id} not found.`,
            HttpStatus.NOT_FOUND,
          );
        });
      await expect(service.getOneById(id)).rejects.toThrowError(HttpException);
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith({
        where: { id: id },
      });
    });
  });

  describe('create', () => {
    it('should successfully create a result', () => {
      expect(service.create(resultStub())).resolves.toEqual(resultStub());
      expect(resultRepository.create).toBeCalledTimes(1);
      expect(resultRepository.create).toBeCalledWith(resultStub());
      expect(resultRepository.save).toBeCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update a result', async () => {
      const updatedresult = await service.update(1, resultStub());
      expect(updatedresult).toEqual({
        ...resultStub(),
        updatedAt: updatedresult.updatedAt,
      });
      expect(resultRepository.findOneBy).toBeCalledTimes(1);
      expect(resultRepository.findOneBy).toBeCalledWith({
        id: 1,
      });
      expect(resultRepository.save).toBeCalledTimes(1);
      expect(resultRepository.save).toBeCalledWith(updatedresult);
    });

    it("should return an http error when result id doesn't exist", async () => {
      const id = 10;
      const spy = jest
        .spyOn(resultRepository, 'findOneBy')
        .mockImplementationOnce(() => undefined);
      await expect(service.update(id, resultStub())).rejects.toThrowError(
        HttpException,
      );
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({
        id: id,
      });
      expect(resultRepository.save).toHaveBeenCalledTimes(0);
    });
  });

  describe('delete', () => {
    it('should delete a result', async () => {
      const deletedId = await service.delete(1);
      expect(deletedId).toEqual(1);
      expect(resultRepository.findOneBy).toBeCalledTimes(1);
      expect(resultRepository.findOneBy).toBeCalledWith({
        id: 1,
      });
      expect(resultRepository.delete).toBeCalledTimes(1);
    });

    it("should return an http error when result id doesn't exist", async () => {
      const id = 10;
      const spy = jest
        .spyOn(resultRepository, 'findOneBy')
        .mockImplementationOnce(() => undefined);
      await expect(service.delete(id)).rejects.toThrowError(HttpException);
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith({
        id: id,
      });
      expect(resultRepository.delete).toBeCalledTimes(0);
    });
  });
});
