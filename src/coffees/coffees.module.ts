import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity/flavor.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import coffeesConfig from './config/coffees.config';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event]), ConfigModule.forFeature(coffeesConfig)],
  controllers: [CoffeesController],
  providers: [CoffeesService, ConfigService],
  exports: [CoffeesService],
})
export class CoffeesModule {}