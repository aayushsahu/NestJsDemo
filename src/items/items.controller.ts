import { ItemsService } from './items.service';
import { ItemDto } from './dto/ItemDto';
import { Body, Controller, Delete, Get, Logger, Param, Post, Put } from '@nestjs/common';

@Controller('items')
export class ItemsController {

    constructor(private readonly itemsService : ItemsService) {}; 

    @Get(':id')
    find(@Param('id') id: string) : ItemDto {
        Logger.log("from Controller");
        return this.itemsService.find(id);
    }

    @Get()
    findAll(): ItemDto[] {
        return this.itemsService.findAll();
    }

    @Post()
    create(@Body() item: ItemDto ): object {
        return this.itemsService.create(item);
    }

    @Delete(':id') 
    deleteById(@Param('id') id: string) : object{
        return this.itemsService.delete(id);
    }

    @Put(':id') 
    update(@Param('id') id: string, @Body() item: ItemDto) {
        return this.itemsService.update(id, item);
    }



}
