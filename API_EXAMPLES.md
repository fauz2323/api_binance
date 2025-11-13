# API Examples - Binance Service

Kumpulan contoh request dan response untuk setiap endpoint API Binance Service.

## Table of Contents

1. [Server Time](#server-time)
2. [Exchange Information](#exchange-information)
3. [Market Price](#market-price)
4. [Health Check](#health-check)
5. [Sell Orders](#sell-orders)
6. [Batch Orders](#batch-orders)

---

## Server Time

### Request

```http
GET /binance/time HTTP/1.1
Host: localhost:3000
Content-Type: application/json
```

### Response

```json
{
  "serverTime": 1699999999999
}
```

### cURL Example

```bash
curl -X GET "http://localhost:3000/binance/time"
```

### JavaScript Example

```javascript
const response = await fetch('http://localhost:3000/binance/time');
const data = await response.json();
console.log(data);
```

---

## Exchange Information

### Request

```http
GET /binance/exchange-info HTTP/1.1
Host: localhost:3000
Content-Type: application/json
```

### Response

```json
{
  "timezone": "UTC",
  "serverTime": 1699999999999,
  "rateLimits": [
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 1200
    }
  ],
  "exchangeFilters": [],
  "symbols": [
    {
      "symbol": "ETHBTC",
      "status": "TRADING",
      "baseAsset": "ETH",
      "baseAssetPrecision": 8,
      "quoteAsset": "BTC",
      "quotePrecision": 8,
      "orderTypes": [
        "LIMIT",
        "LIMIT_MAKER",
        "MARKET",
        "STOP_LOSS_LIMIT",
        "TAKE_PROFIT_LIMIT"
      ],
      "icebergAllowed": true,
      "ocoAllowed": true,
      "isSpotTradingAllowed": true,
      "isMarginTradingAllowed": true,
      "permissions": ["SPOT", "MARGIN"]
    }
  ]
}
```

### cURL Example

```bash
curl -X GET "http://localhost:3000/binance/exchange-info"
```

---

## Market Price

### Request - Single Symbol

```http
GET /binance/market/price?symbol=BTCUSDT HTTP/1.1
Host: localhost:3000
Content-Type: application/json
```

### Response - Single Symbol

```json
{
  "symbol": "BTCUSDT",
  "price": "35000.00000000"
}
```

### Request - All Symbols

```http
GET /binance/market/price HTTP/1.1
Host: localhost:3000
Content-Type: application/json
```

### Response - All Symbols

```json
[
  {
    "symbol": "ETHBTC",
    "price": "0.06123400"
  },
  {
    "symbol": "LTCBTC",
    "price": "0.00180300"
  },
  {
    "symbol": "BNBBTC",
    "price": "0.00516700"
  }
]
```

### cURL Examples

```bash
# Single symbol
curl -X GET "http://localhost:3000/binance/market/price?symbol=BTCUSDT"

# All symbols
curl -X GET "http://localhost:3000/binance/market/price"
```

### JavaScript Examples

```javascript
// Single symbol
const singlePrice = await fetch(
  'http://localhost:3000/binance/market/price?symbol=BTCUSDT',
);
const priceData = await singlePrice.json();

// All symbols
const allPrices = await fetch('http://localhost:3000/binance/market/price');
const allPricesData = await allPrices.json();
```

---

## Health Check

### Request

```http
GET /binance/health HTTP/1.1
Host: localhost:3000
Content-Type: application/json
```

### Response - Healthy

```json
{
  "status": "healthy",
  "binanceServerTime": 1699999999999,
  "timestamp": 1699999999999
}
```

### Response - Unhealthy

```json
{
  "status": "unhealthy",
  "error": "Connection timeout to Binance API",
  "timestamp": 1699999999999
}
```

### cURL Example

```bash
curl -X GET "http://localhost:3000/binance/health"
```

---

## Sell Orders

### Request

```http
POST /binance/sell-orders HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "symbol": "BTCUSDT",
  "price": "35000.00",
  "orders": [
    {
      "apiKey": "NhqPtmdSJYdKjVHjA7PZj4Mge3R5YNiP1e3UZjInClVN65XAbvqqM6A7H5fATj0j",
      "secret": "pPeQdx8VNqL2qIGl2D1Zv9AlKBdRZaLKq8xJZfYK8fUgQAGEAvJZaYJKyKgGzJqP"
    },
    {
      "apiKey": "BmtY8YdKjVHjA7PZj4Mge3R5YNiP1e3UZjInClVN65XAbvqqM6A7H5fATj0jNhqP",
      "secret": "xJZfYK8fUgQAGEAvJZaYJKyKgGzJqPpPeQdx8VNqL2qIGl2D1Zv9AlKBdRZaLKq8"
    }
  ]
}
```

### Response - Success

```json
{
  "success": true,
  "results": [
    {
      "orderId": 28,
      "symbol": "BTCUSDT",
      "status": "FILLED",
      "clientOrderId": "6gCrw2kRUAF9CvJDGP16IP",
      "price": "35000.00000000",
      "origQty": "0.10000000",
      "executedQty": "0.10000000",
      "cummulativeQuoteQty": "3500.00000000",
      "timeInForce": "GTC",
      "type": "LIMIT",
      "side": "SELL"
    },
    {
      "orderId": 29,
      "symbol": "BTCUSDT",
      "status": "FILLED",
      "clientOrderId": "7hBsw3lSVBG0DwKEHP27JQ",
      "price": "35000.00000000",
      "origQty": "0.05000000",
      "executedQty": "0.05000000",
      "cummulativeQuoteQty": "1750.00000000",
      "timeInForce": "GTC",
      "type": "LIMIT",
      "side": "SELL"
    }
  ]
}
```

### Response - Error

```json
{
  "statusCode": 400,
  "message": "Invalid symbol",
  "error": "Bad Request"
}
```

### cURL Example

```bash
curl -X POST "http://localhost:3000/binance/sell-orders" \
  -H "Content-Type: application/json" \
  -d '{
    "symbol": "BTCUSDT",
    "price": "35000.00",
    "orders": [
      {
        "apiKey": "your_api_key_here",
        "secret": "your_secret_key_here"
      }
    ]
  }'
```

### JavaScript Example

```javascript
const sellOrdersData = {
  symbol: 'BTCUSDT',
  price: '35000.00',
  orders: [
    {
      apiKey: 'your_api_key_here',
      secret: 'your_secret_key_here',
    },
  ],
};

const response = await fetch('http://localhost:3000/binance/sell-orders', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(sellOrdersData),
});

const result = await response.json();
console.log(result);
```

---

## Batch Orders

### Request

```http
POST /binance/make-orders HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "symbol": "BTCUSDT",
  "side": "BUY",
  "type": "LIMIT",
  "quantity": "0.001",
  "price": "34000.00",
  "orders": [
    {
      "apiKey": "NhqPtmdSJYdKjVHjA7PZj4Mge3R5YNiP1e3UZjInClVN65XAbvqqM6A7H5fATj0j",
      "secret": "pPeQdx8VNqL2qIGl2D1Zv9AlKBdRZaLKq8xJZfYK8fUgQAGEAvJZaYJKyKgGzJqP"
    },
    {
      "apiKey": "BmtY8YdKjVHjA7PZj4Mge3R5YNiP1e3UZjInClVN65XAbvqqM6A7H5fATj0jNhqP",
      "secret": "xJZfYK8fUgQAGEAvJZaYJKyKgGzJqPpPeQdx8VNqL2qIGl2D1Zv9AlKBdRZaLKq8"
    }
  ]
}
```

### Response - Success

```json
{
  "success": true,
  "results": [
    {
      "orderId": 123456,
      "symbol": "BTCUSDT",
      "side": "BUY",
      "type": "LIMIT",
      "quantity": "0.00100000",
      "price": "34000.00000000",
      "status": "NEW",
      "clientOrderId": "abc123def456",
      "timeInForce": "GTC",
      "transactTime": 1699999999999
    },
    {
      "orderId": 123457,
      "symbol": "BTCUSDT",
      "side": "BUY",
      "type": "LIMIT",
      "quantity": "0.00100000",
      "price": "34000.00000000",
      "status": "NEW",
      "clientOrderId": "def456ghi789",
      "timeInForce": "GTC",
      "transactTime": 1699999999999
    }
  ]
}
```

### Request - Market Order Example

```json
{
  "symbol": "BTCUSDT",
  "side": "BUY",
  "type": "MARKET",
  "quantity": "0.001",
  "orders": [
    {
      "apiKey": "your_api_key_here",
      "secret": "your_secret_key_here"
    }
  ]
}
```

### Request - Stop Loss Order Example

```json
{
  "symbol": "BTCUSDT",
  "side": "SELL",
  "type": "STOP_LOSS_LIMIT",
  "quantity": "0.001",
  "price": "33000.00",
  "stopPrice": "33500.00",
  "orders": [
    {
      "apiKey": "your_api_key_here",
      "secret": "your_secret_key_here"
    }
  ]
}
```

### cURL Example

```bash
curl -X POST "http://localhost:3000/binance/make-orders" \
  -H "Content-Type: application/json" \
  -d '{
    "symbol": "BTCUSDT",
    "side": "BUY",
    "type": "LIMIT",
    "quantity": "0.001",
    "price": "34000.00",
    "orders": [
      {
        "apiKey": "your_api_key_here",
        "secret": "your_secret_key_here"
      }
    ]
  }'
```

### JavaScript Example

```javascript
const batchOrderData = {
  symbol: 'BTCUSDT',
  side: 'BUY',
  type: 'LIMIT',
  quantity: '0.001',
  price: '34000.00',
  orders: [
    {
      apiKey: 'your_api_key_here',
      secret: 'your_secret_key_here',
    },
  ],
};

const response = await fetch('http://localhost:3000/binance/make-orders', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(batchOrderData),
});

const result = await response.json();
console.log(result);
```

---

## Common Error Responses

### 400 Bad Request

```json
{
  "statusCode": 400,
  "message": ["symbol should not be empty", "quantity must be a string"],
  "error": "Bad Request"
}
```

### 401 Unauthorized

```json
{
  "statusCode": 401,
  "message": "Invalid API credentials",
  "error": "Unauthorized"
}
```

### 500 Internal Server Error

```json
{
  "statusCode": 500,
  "message": "Failed to place order",
  "error": "Internal Server Error"
}
```

### 503 Service Unavailable

```json
{
  "statusCode": 503,
  "message": "Binance API is currently unavailable",
  "error": "Service Unavailable"
}
```

---

## Rate Limiting Examples

### Too Many Requests Response

```json
{
  "statusCode": 429,
  "message": "Too many requests. Please try again later.",
  "error": "Too Many Requests",
  "retryAfter": 60
}
```

---

## Multiple Accounts Examples

### Request with 5 Different Accounts

```json
{
  "symbol": "ETHUSDT",
  "side": "BUY",
  "type": "LIMIT",
  "quantity": "0.1",
  "price": "2000.00",
  "orders": [
    {
      "apiKey": "account1_api_key",
      "secret": "account1_secret"
    },
    {
      "apiKey": "account2_api_key",
      "secret": "account2_secret"
    },
    {
      "apiKey": "account3_api_key",
      "secret": "account3_secret"
    },
    {
      "apiKey": "account4_api_key",
      "secret": "account4_secret"
    },
    {
      "apiKey": "account5_api_key",
      "secret": "account5_secret"
    }
  ]
}
```

### Mixed Success/Failure Response

```json
{
  "success": false,
  "results": [
    {
      "orderId": 123456,
      "status": "NEW",
      "account": "account1"
    },
    {
      "error": "Insufficient balance",
      "account": "account2"
    },
    {
      "orderId": 123458,
      "status": "NEW",
      "account": "account3"
    },
    {
      "error": "Invalid API key",
      "account": "account4"
    },
    {
      "orderId": 123459,
      "status": "NEW",
      "account": "account5"
    }
  ]
}
```

---

## Testing Examples

### Postman Collection JSON

```json
{
  "info": {
    "name": "Binance API Service",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Get Server Time",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "{{baseUrl}}/binance/time",
          "host": ["{{baseUrl}}"],
          "path": ["binance", "time"]
        }
      }
    },
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "{{baseUrl}}/binance/health",
          "host": ["{{baseUrl}}"],
          "path": ["binance", "health"]
        }
      }
    }
  ],
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:3000"
    }
  ]
}
```

### Environment Variables for Testing

```json
{
  "baseUrl": "http://localhost:3000",
  "testApiKey": "your_test_api_key",
  "testSecret": "your_test_secret",
  "testSymbol": "BTCUSDT"
}
```
