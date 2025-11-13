import { Type } from 'class-transformer';
import { IsArray, isString, IsString, ValidateNested } from 'class-validator';

export class PlaceOrderDto {
  @IsString()
  apiKey: string;
  @IsString()
  secret: string;
}

export class PlaceOrderBatchDto {
  @IsString()
  symbol: string;

  @IsString()
  side: string;

  @IsString()
  type: string;

  @IsString()
  quantity: string;

  @IsString()
  price: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PlaceOrderDto)
  orders: PlaceOrderDto[];
}
