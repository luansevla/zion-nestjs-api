import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@ApiTags('Address')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo endereço' })
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os endereços' })
  findAll() {
    return this.addressService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Buscar endereços por CEP' })
  @ApiQuery({ name: 'cep', required: true })
  findByCep(@Query('cep') cep: string) {
    return this.addressService.findByCep(cep);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um endereço pelo ID' })
  findOne(@Param('id') id: string) {
    return this.addressService.findOne(id);
  }

  @Put(':id') // Edit (Substituição completa)
  @ApiOperation({ summary: 'Atualizar endereço (Edit)' })
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(id, updateAddressDto);
  }

  @Patch(':id') // Modify (Atualização parcial)
  @ApiOperation({ summary: 'Modificar campos específicos do endereço' })
  modify(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(id, updateAddressDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um endereço' })
  remove(@Param('id') id: string) {
    return this.addressService.remove(id);
  }
}