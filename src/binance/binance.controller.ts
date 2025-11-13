import {
  Controller,
  Get,
  Query,
  Param,
  HttpException,
  HttpStatus,
  Post,
  Body,
} from '@nestjs/common';
import { BinanceService } from './binance.service';
import { PlaceOrderBatchDto } from './dto/placeOrder.dto';
import { SellOrderDto } from './dto/sellOrder.dto';

@Controller('binance')
export class BinanceController {
  constructor(private readonly binanceService: BinanceService) {}

  @Get('time')
  async getServerTime() {
    return await this.binanceService.getServerTime();
  }

  @Get('exchange-info')
  async getExchangeInfo() {
    return await this.binanceService.getExchangeInfo();
  }

  @Get('market/price')
  async getTickerPrice(@Query('symbol') symbol?: string) {
    return await this.binanceService.getTickerPrice(symbol);
  }

  @Get('health')
  async healthCheck() {
    try {
      const serverTime = await this.binanceService.getServerTime();
      return {
        status: 'healthy',
        binanceServerTime: serverTime.serverTime,
        timestamp: Date.now(),
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: error.message,
        timestamp: Date.now(),
      };
    }
  }

  @Post('sell-orders')
  async placeSellOrders(@Body() body: SellOrderDto) {
    return await this.binanceService.makeSellOrders(body);
  }

  @Post('make-orders')
  async placeMakeOrders(@Body() body: PlaceOrderBatchDto) {
    return await this.binanceService.placeOrderbatch(body);
  }
}
