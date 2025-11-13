import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { PlaceOrderDto } from './placeOrder.dto';

export class SellOrderDto {
  @IsString()
  symbol: string;

  @IsString()
  @IsOptional()
  price: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PlaceOrderDto)
  orders: PlaceOrderDto[];
}
