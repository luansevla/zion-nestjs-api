import { Types } from "mongoose";

export class Meeting {
    cell: Types.ObjectId | string
    date: Date
    month: string
    year: number
    theme: string
    crew: [Types.ObjectId | string] 
    adults: number
    children: number
    singles: number
    offer: number
    kilo: number
    kiloItens: number
    observations: string
}
