import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CellService } from './cell.service';
import { CreateCellDto } from './dto/create-cell.dto';
import { UpdateCellDto } from './dto/update-cell.dto';

@ApiTags('cells')
@Controller('cells')
export class CellController {
  constructor(private readonly cellService: CellService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova célula' })
  create(@Body() createCellDto: CreateCellDto) {
    return this.cellService.create(createCellDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as células' })
  findAll() {
    return this.cellService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma célula pelo ID' })
  findOne(@Param('id') id: string) {
    return this.cellService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar dados da célula' })
  update(@Param('id') id: string, @Body() updateCellDto: UpdateCellDto) {
    return this.cellService.update(id, updateCellDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover célula' })
  remove(@Param('id') id: string) {
    return this.cellService.remove(id);
  }
}