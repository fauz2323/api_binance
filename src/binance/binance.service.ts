import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import dayjs from 'dayjs';
import { timestamp } from 'rxjs';
import * as crypto from 'crypto';
import { PlaceOrderBatchDto } from './dto/placeOrder.dto';
import pLimit from 'p-limit';
import { SellOrderDto } from './dto/sellOrder.dto';

export interface TickerData {
  symbol: string;
  price: string;
  priceChange: string;
  priceChangePercent: string;
  volume: string;
  lastPrice: string;
}

export interface AccountInfo {
  makerCommission: number;
  takerCommission: number;
  buyerCommission: number;
  sellerCommission: number;
  canTrade: boolean;
  canWithdraw: boolean;
  canDeposit: boolean;
  balances: Array<{
    asset: string;
    free: string;
    locked: string;
  }>;
}

@Injectable()
export class BinanceService {
  private readonly baseUrl = 'https://api.binance.com';

  async getServerTime(): Promise<{ serverTime: number }> {
    // try {
    const response = await axios.get(`${this.baseUrl}/api/v3/time`);
    if (response.status !== 200) {
      throw new Error('Failed to fetch server time');
    }
    return response.data;
    // } catch (error) {
    //   throw new HttpException(
    //     'Failed to get Binance server time',
    //     HttpStatus.SERVICE_UNAVAILABLE,
    //   );
    // }
  }

  async getExchangeInfo(): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/exchangeInfo`);
      if (!response.ok) {
        throw new Error('Failed to fetch exchange info');
      }
      return await response.json();
    } catch (error) {
      throw new HttpException(
        'Failed to get exchange info',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  async getTickerPrice(symbol?: string): Promise<TickerData | TickerData[]> {
    try {
      const url = symbol
        ? `${this.baseUrl}/ticker/price?symbol=${symbol.toUpperCase()}`
        : `${this.baseUrl}/ticker/price`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch ticker price');
      }
      return await response.json();
    } catch (error) {
      throw new HttpException(
        'Failed to get ticker price',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  private generateSignature(secret: string, query: any): string {
    return crypto
      .createHmac('sha256', secret)
      .update(query, 'utf8')
      .digest('hex');
  }

  private buildQueryString(params: Record<string, any>): string {
    const queryParams = new URLSearchParams();
    for (const key of Object.keys(params)) {
      const val = params[key];
      if (val === undefined || val === null) continue;
      queryParams.append(key, String(val));
    }
    return queryParams.toString();
  }

  private async buyMarketOrder(
    symbol: string,
    side: 'BUY' | 'SELL',
    type: 'MARKET',
    quantity: number,
    secret: string,
    apiKey: string,
    price?: number,
  ): Promise<any> {
    const url = `${this.baseUrl}/api/v3/order`;
    const epochMilliseconds = dayjs().valueOf();
    const query = {
      symbol: symbol,
      side: side,
      type: type,
      quantity: quantity,
      price: price,
      timestamp: epochMilliseconds,
    };

    const signature = this.generateSignature(
      secret,
      this.buildQueryString(query),
    );

    query['signature'] = signature;

    const headers = {
      'X-MBX-APIKEY': apiKey,
    };

    const response = await axios.post(url, null, {
      params: query,
      headers: headers,
    });
    return response.data;
  }

  async placeOrderbatch(data: PlaceOrderBatchDto): Promise<any> {
    const dataArrays = data.orders;
    const side = 'BUY';
    const limit = pLimit(25);

    const requestBatch = dataArrays.map((order) => {
      return limit(async () => {
        try {
          return await this.buyMarketOrder(
            data.symbol,
            side,
            'MARKET',
            Number(data.quantity),
            order.secret,
            order.apiKey,
            Number(data.price),
          );
        } catch (error) {
          return { error: error.message, order };
        }
      });
    });

    return await Promise.allSettled(requestBatch);
  }

  private async getAccountInfo(apiKey: string, secret: string): Promise<any> {
    const url = `${this.baseUrl}/api/v3/account`;
    const epochMilliseconds = dayjs().valueOf();
    const query = {
      timestamp: epochMilliseconds,
    };

    const signature = this.generateSignature(
      secret,
      this.buildQueryString(query),
    );

    query['signature'] = signature;

    const headers = {
      'X-MBX-APIKEY': apiKey,
    };

    const response = await axios.get(url, {
      params: query,
      headers: headers,
    });
    return response.data;
  }

  private async filterBalances(
    apiKey: string,
    secret: string,
    assetSymbol: string,
  ): Promise<any> {
    const accountData = await this.getAccountInfo(apiKey, secret);
    return accountData.balances.find((bal) => bal.asset === assetSymbol);
  }

  private async sellOrderData(
    symbol: string,
    secret: string,
    apiKey: string,
  ): Promise<any> {
    const balanceData = await this.filterBalances(apiKey, secret, symbol);
    const sellAll = await this.buyMarketOrder(
      symbol,
      'SELL',
      'MARKET',
      Number(balanceData.free),
      secret,
      apiKey,
    );

    return sellAll;
  }

  async makeSellOrders(orders: SellOrderDto): Promise<any> {
    const dataArrays = orders.orders;
    const limit = pLimit(25);

    const requestBatch = dataArrays.map((order) => {
      return limit(async () => {
        try {
          return await this.sellOrderData(
            orders.symbol,
            order.secret,
            order.apiKey,
          );
        } catch (error) {
          return { error: error.message, order };
        }
      });
    });

    return await Promise.allSettled(requestBatch);
  }
}
