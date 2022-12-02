import { Module } from '@nestjs/common';
import { LineItemService } from './line-item.service';
import { LineItemController } from './line-item.controller';

@Module({
  providers: [LineItemService],
  controllers: [LineItemController]
})
export class LineItemModule {}
