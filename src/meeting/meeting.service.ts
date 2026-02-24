import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { Meeting, MeetingDocument } from './schema/meeting.schema';

@Injectable()
export class MeetingService {
  constructor(@InjectModel(Meeting.name) private meetingModel: Model<MeetingDocument>) {}

  async create(createMeetingDto: CreateMeetingDto): Promise<Meeting> {
    const created = new this.meetingModel(createMeetingDto);
    return created.save();
  }

  async findAll(): Promise<Meeting[]> {
    return this.meetingModel
      .find()
      .populate('cell', 'name area') // Traz info da célula
      .populate('crew', 'name')     // Traz nomes dos participantes
      .sort({ date: -1 })           // Mais recentes primeiro
      .exec();
  }

  async findOne(id: string): Promise<Meeting> {
    const meeting = await this.meetingModel.findById(id).populate('cell crew').exec();
    if (!meeting) throw new NotFoundException(`Relatório ${id} não encontrado`);
    return meeting;
  }

  async update(id: string, updateMeetingDto: UpdateMeetingDto): Promise<Meeting> {
    const updated = await this.meetingModel
      .findByIdAndUpdate(id, updateMeetingDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException(`Relatório ${id} não encontrado`);
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.meetingModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException(`Relatório ${id} não encontrado`);
    return { message: 'Relatório removido com sucesso' };
  }
}