import { ItemDto } from './dto/ItemDto';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class ItemsService {

    items: ItemDto[] = [{
        id: "f630f285-ac85-4be1-99e8-da235b468d6a",
        name: "Item1",
        price: 10,
        description: "This is item 1"
    }, {
        id: "f630f285-ac85-4be1-99e8-da235b468d6b",
        name: "Item2",
        price: 17.5,
        description: "This is item 2"
    }, {
        id: "f630f285-ac85-4be1-99e8-da235b468d6c",
        name: "Item3",
        price: 105,
        description: "This is item 3"
    }];


    find(id: string) : ItemDto {
        //Logger.log("from service");
        let res = this.items.find((item)=> {
            if(item.id == id)
                return item;
        });
        if(!res)
            throw new NotFoundException(`No results found for Id: ${id}`);
        return res;
    }

    findAll() : ItemDto[] {
        return this.items;
    } 

    create(item: ItemDto) : object {
        item.id = uuidv4();
        Logger.log(`Item Id : ${item.id}`);
        try {
            this.items.push(item);
            return {"id": item.id};
        } catch (error) {
            return (this.find(item.id)) ? { "error": `Please retry. Item with ${item.id} id already exists`} : {"error" : `Unknown Error: ${error}`};
        };
    }

    delete(id: string): object {
        let item = this.find(id);
        let index;
        index = this.items.indexOf(item);
        return {
            "message": `${this.items.splice(index, 1)[0].id} was successfully deleted`
        };   
    }

    update(id: string, updatedItem: ItemDto) {
        let item = this.find(id);
        if(!updatedItem.id)
            updatedItem.id = id;
        let index;
        index = this.items.indexOf(item);
        this.items[index] = updatedItem;
        return {
            "message": `Item with ${id} was successfully updated`
        };
    }
}
