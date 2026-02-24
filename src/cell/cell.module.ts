import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CellService } from './cell.service';
import { CellController } from './cell.controller';
import { Cell } from './entities/cell.entity';
import { CellSchema } from './schema/cell.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cell.name, schema: CellSchema }])
  ],
  controllers: [CellController],
  providers: [CellService],
})
export class CellModule {}