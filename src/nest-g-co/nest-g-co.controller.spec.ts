import { Test, TestingModule } from '@nestjs/testing';
import { NestGCoController } from './nest-g-co.controller';

describe('NestGCoController', () => {
  let controller: NestGCoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NestGCoController],
    }).compile();

    controller = module.get<NestGCoController>(NestGCoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
