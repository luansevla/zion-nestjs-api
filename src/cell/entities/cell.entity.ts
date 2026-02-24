import { Types } from "mongoose"
import { Address } from "src/address/entities/address.entity"

export class Cell {
    name: string
    day: string
    time: string
    area: string
    cellType: string
    status: boolean
    address: Address
    leader: [Types.ObjectId | string]
    coleader: [Types.ObjectId | string]
    pastors: [Types.ObjectId | string]
}
