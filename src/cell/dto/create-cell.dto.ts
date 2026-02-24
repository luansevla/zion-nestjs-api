import { CreateAddressDto } from 'src/address/dto/create-address.dto';
import { Types } from "mongoose"

export class CreateCellDto {
    name: string
    day: string
    time: string
    area: string
    cellType: string
    status: boolean
    address: CreateAddressDto
    leader: [Types.ObjectId | string]
    coleader: [Types.ObjectId | string]
    pastors: [Types.ObjectId | string]
}
