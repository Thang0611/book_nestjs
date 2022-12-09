import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AddReviewDto } from 'src/dto/addReviewDto';
import { ReviewEntity } from './review.entity';



@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(ReviewEntity)
        private reviewRepository:Repository<ReviewEntity>
    ){}

    async createReview(book,review:AddReviewDto){
        const newReview =this.reviewRepository.create(review)
        newReview.book=book
        console.log(newReview)
        return  this.reviewRepository.save(newReview)  
    }

}
