import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { EvaluateEntity } from './evaluate.entity';
import { AddEvaluateDto } from '../dto/addEvaluateDto';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class EvaluateService {
    constructor(
        @InjectRepository(EvaluateEntity)
        private evaluateRepository:Repository<EvaluateEntity>
    ){}

    async createEvaluate(book,evaluate:AddEvaluateDto){
        const newevaluate =this.evaluateRepository.create(evaluate)
        newevaluate.book=book
        console.log(newevaluate)
        return  this.evaluateRepository.save(newevaluate)  
    }

}
