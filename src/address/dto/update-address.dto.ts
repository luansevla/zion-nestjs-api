import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAddressDto } from './create-address.dto';
import { IsString } from 'class-validator';

export class UpdateAddressDto extends PartialType(CreateAddressDto) {
    @ApiProperty({ type: String, example: 'Rua das Flores', description: 'Nome da rua ou logradouro' })
    @IsString()
    street: string;

    @ApiProperty({ type: String, example: '123', description: 'Número do imóvel' })
    @IsString()
    number: string;

    @ApiProperty({ type: String, example: 'Apt 42', required: false })
    @IsString()
    complement: string;

    @ApiProperty({ type: String, example: 'Centro' })
    @IsString()
    neighborhood: string;

    @ApiProperty({ type: String, example: 'São Paulo' })
    @IsString()
    city: string;

    @ApiProperty({ type: String, example: 'SP' })
    @IsString()
    state: string;

    @ApiProperty({ type: String, example: '01001-000' })
    @IsString()
    zipCode: string;
}
