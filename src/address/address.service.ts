import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address, AddressDocument } from './schema/address.schema';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address.name) private addressModel: Model<AddressDocument>,
  ) {}

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    const createdAddress = new this.addressModel(createAddressDto);
    return createdAddress.save();
  }

  async findAll(): Promise<Address[]> {
    return this.addressModel.find().exec();
  }

  async findOne(id: string): Promise<Address> {
    const address = await this.addressModel.findById(id).exec();
    if (!address) throw new NotFoundException(`Endereço com ID ${id} não encontrado`);
    return address;
  }

  // Update completo (Edit)
  async update(id: string, updateAddressDto: UpdateAddressDto): Promise<Address> {
    const updated = await this.addressModel
      .findByIdAndUpdate(id, updateAddressDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException(`Endereço com ID ${id} não encontrado`);
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.addressModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException(`Endereço com ID ${id} não encontrado`);
    return { message: 'Endereço removido com sucesso' };
  }

  async findByCep(cep: string): Promise<Address[]> {
    return this.addressModel.find({ cep }).exec();
  }
}