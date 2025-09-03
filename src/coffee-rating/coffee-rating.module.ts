import { Module } from '@nestjs/common';
import { CoffeeRatingService } from './coffee-rating.service';
import { CoffeesService } from '../coffees/coffees.service';
import { CoffeesModule } from '../coffees/coffees.module';

@Module({
  imports: [CoffeesModule], 
  providers: [CoffeeRatingService],
})
export class CoffeeRatingModule {}
