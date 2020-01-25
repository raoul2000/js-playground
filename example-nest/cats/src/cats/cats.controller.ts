import { Controller, Get, Req, Post, Body } from '@nestjs/common';
import { Request } from 'express';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';


@Controller('cats')
export class CatsController {

    constructor(private readonly catsService: CatsService) {}

    @Get()
    async findAll(@Req() request: Request): Promise<Cat[]> {
        return this.catsService.findAll();
    }

    @Post()
    async create(@Body() createCatDto : CreateCatDto) {
        this.catsService.create(createCatDto);
    }
}
