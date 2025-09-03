import { Test, TestingModule } from '@nestjs/testing';
import { CoffeesService } from './coffees.service';
import { DataSource, ObjectLiteral, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { NotFoundException } from '@nestjs/common';
import { Flavor } from './entities/flavor.entity/flavor.entity';
import { ConfigService } from '@nestjs/config';
import coffeesConfig from './config/coffees.config';

type MockRepository<T extends ObjectLiteral = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T extends ObjectLiteral = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  preload: jest.fn(),
});

describe('CoffeesService', () => {
  let service: CoffeesService;
  let coffeeRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeesService,
        // Repositories
        { provide: getRepositoryToken(Coffee), useValue: createMockRepository() },
        { provide: getRepositoryToken(Flavor), useValue: createMockRepository() },

        // DataSource (only needed if you test recommendCoffee)
        { provide: DataSource, useValue: { createQueryRunner: jest.fn() } },

        // ConfigService
        { provide: ConfigService, useValue: { get: jest.fn() } },

        // Typed feature config token (what @Inject(coffeesConfig.KEY) resolves to)
        { provide: coffeesConfig.KEY, useValue: { foo: 'test-value' } },
      ],
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
    coffeeRepository = module.get<MockRepository>(getRepositoryToken(Coffee));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('returns the coffee when it exists', async () => {
      const coffeeId = '1';
      const expectedCoffee = { id: 1, name: 'Espresso' };

      coffeeRepository.findOne!.mockResolvedValue(expectedCoffee);

      await expect(service.findOne(coffeeId)).resolves.toEqual(expectedCoffee);
      expect(coffeeRepository.findOne).toHaveBeenCalledWith({
        where: { id: +coffeeId },
        relations: { flavors: true },
      });
    });

    it('throws NotFoundException when it does not exist', async () => {
      const coffeeId = '1';
      coffeeRepository.findOne!.mockResolvedValue(undefined);

      await expect(service.findOne(coffeeId)).rejects.toThrow(NotFoundException);
      await expect(service.findOne(coffeeId)).rejects.toThrow(
        `Coffee #${coffeeId} not found`,
      );
    });
  });
});
