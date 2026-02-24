import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('address')
@ApiBearerAuth()
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Criar novo endereço' })
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard) // Protege esta rota com JWT
  @ApiOperation({ summary: 'Listar todos os endereços' })
  findAll() {
    return this.addressService.findAll();
  }

  @Get('search')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Buscar endereços por CEP' })
  @ApiQuery({ name: 'cep', required: true })
  findByCep(@Query('cep') cep: string) {
    return this.addressService.findByCep(cep);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Buscar um endereço pelo ID' })
  findOne(@Param('id') id: string) {
    return this.addressService.findOne(id);
  }

  @Put(':id') // Edit (Substituição completa)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Atualizar endereço (Edit)' })
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(id, updateAddressDto);
  }

  @Patch(':id') // Modify (Atualização parcial)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Modificar campos específicos do endereço' })
  modify(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(id, updateAddressDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Remover um endereço' })
  remove(@Param('id') id: string) {
    return this.addressService.remove(id);
  }
}