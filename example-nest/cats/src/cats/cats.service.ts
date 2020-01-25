import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
    private readonly cats: Cat[] = [];

    /**
     * Create a cat
     * @param cat Cat the cat to create
     */
    create(cat: Cat) {
        this.cats.push(cat);
    }
    
    findAll(): Cat[] {
        return this.cats;
    }
}
