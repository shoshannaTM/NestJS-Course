import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  SetMetadata,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto/pagination-query.dto';
import { Public } from '../common/decorators/public.decorator';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags()
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Public()
  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    //await new Promise(resolve => setTimeout(resolve, 5000));
    // const { limit, offset } = paginationQuery;
    return this.coffeesService.findAll(paginationQuery);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(id);
    return this.coffeesService.findOne('' + id);
  }

  @Public()
  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(createCoffeeDto);
  }

  @Public()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(id, updateCoffeeDto);
  }
  
  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(id);
  }
}