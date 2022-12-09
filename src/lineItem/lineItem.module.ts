import { Module } from '@nestjs/common';
import { LineItemService } from './lineItem.service';
import { LineItemController } from './lineItem.controller';

@Module({
  providers: [LineItemService],
  controllers: [LineItemController]
})
export class LineItemModule {}
