import { PartialType } from '@nestjs/swagger';
import { CreateCellDto } from './create-cell.dto';
import { Types } from 'mongoose';
import { UpdateAddressDto } from 'src/address/dto/update-address.dto';

export class UpdateCellDto extends PartialType(CreateCellDto) {
    name: string
    day: string
    time: string
    area: string
    cellType: string
    status: boolean
    address: UpdateAddressDto
    leader: [Types.ObjectId | string]
    coleader: [Types.ObjectId | string]
    pastors: [Types.ObjectId | string]
}
