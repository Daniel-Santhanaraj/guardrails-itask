import { Result } from './../entities/result.entity';
import { resultsStub, resultStub } from './result.stub';

export const mockResultsRepository = {
  find: jest.fn().mockResolvedValue(resultsStub()),
  findOneOrFail: jest.fn().mockResolvedValue(resultStub()),
  findOneBy: jest.fn().mockResolvedValue(resultStub()),
  create: jest.fn().mockResolvedValue(resultStub()),
  save: jest.fn((product: Result) => product),
  delete: jest.fn((id: number) => id),
};
