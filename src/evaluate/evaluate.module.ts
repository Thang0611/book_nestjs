import { Module } from '@nestjs/common';
import { EvaluateService } from './evaluate.service';
import { EvaluateController } from './evaluate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluateEntity } from './evaluate.entity';

@Module({
  imports:[TypeOrmModule.forFeature([EvaluateEntity])],
  providers: [EvaluateService],
  controllers: [EvaluateController],
  exports:[EvaluateService]
})
export class EvaluateModule {}
