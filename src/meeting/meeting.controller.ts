import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MeetingService } from './meeting.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';

@ApiTags('meetings') // Agrupamento no Swagger
@Controller('meetings')
export class MeetingController {
  constructor(private readonly meetingService: MeetingService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar uma nova reunião/relatório de célula' })
  @ApiResponse({ status: 201, description: 'Reunião registrada com sucesso.' })
  create(@Body() createMeetingDto: CreateMeetingDto) {
    return this.meetingService.create(createMeetingDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as reuniões (com população de dados)' })
  findAll() {
    return this.meetingService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar detalhes de uma reunião específica' })
  findOne(@Param('id') id: string) {
    return this.meetingService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar dados de uma reunião' })
  update(@Param('id') id: string, @Body() updateMeetingDto: UpdateMeetingDto) {
    return this.meetingService.update(id, updateMeetingDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover registro de reunião' })
  remove(@Param('id') id: string) {
    return this.meetingService.remove(id);
  }
}