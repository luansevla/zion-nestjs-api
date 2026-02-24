import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MeetingService } from './meeting.service';
import { MeetingController } from './meeting.controller';
import { Meeting, MeetingSchema } from './schema/meeting.schema';

@Module({
  imports: [
    // Registra o model no contexto do Mongoose para este módulo
    MongooseModule.forFeature([{ name: Meeting.name, schema: MeetingSchema }])
  ],
  controllers: [MeetingController],
  providers: [MeetingService],
  // Exportamos o Service caso outro módulo precise consultar reuniões no futuro
  exports: [MeetingService]
})
export class MeetingModule {}