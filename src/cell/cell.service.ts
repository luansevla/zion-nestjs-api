import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCellDto } from './dto/create-cell.dto';
import { UpdateCellDto } from './dto/update-cell.dto';
import { Cell, CellDocument } from './schema/cell.schema';

@Injectable()
export class CellService {
  constructor(
    @InjectModel(Cell.name) private cellModel: Model<CellDocument>,
  ) {}

  async create(createCellDto: CreateCellDto): Promise<Cell> {
    const createdCell = new this.cellModel(createCellDto);
    return createdCell.save();
  }

  async findAll(): Promise<Cell[]> {
    return this.cellModel
      .find()
      .populate('leader coleader pastors', 'name email') // Traz apenas nome e email dos relacionados
      .exec();
  }

  async findOne(id: string): Promise<Cell> {
    const cell = await this.cellModel
      .findById(id)
      .populate('leader coleader pastors')
      .exec();
    if (!cell) throw new NotFoundException(`Célula com ID ${id} não encontrada`);
    return cell;
  }

  async update(id: string, updateCellDto: UpdateCellDto): Promise<Cell> {
    const updated = await this.cellModel
      .findByIdAndUpdate(id, updateCellDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException(`Célula com ID ${id} não encontrada`);
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.cellModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException(`Célula com ID ${id} não encontrada`);
    return { message: 'Célula removida com sucesso' };
  }
}