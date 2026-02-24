import { Types } from "mongoose"
import { Address } from "src/address/entities/address.entity"
import { Cell } from "src/cell/entities/cell.entity"

export class User {
    name: string
    email: string
    password: string
    phoneNumber: string
    role: string
    userType: string
    birthDate: Date
    cell: Cell
    address: Address
    status: boolean
    otp: string
    area: string
    leader: Types.ObjectId | string
}
