import { Module } from '@nestjs/common';
import { CoffeeRatingService } from './coffee-rating.service';
import { CoffeesService } from 'src/coffees/coffees.service';
import { CoffeesModule } from 'src/coffees/coffees.module';

@Module({
  imports: [CoffeesModule], 
  providers: [CoffeeRatingService],
})
export class CoffeeRatingModule {}
