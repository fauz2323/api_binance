# Binance API Documentation

Dokumentasi ini menjelaskan endpoint yang tersedia pada Binance API service.

## Base URL

```
http://localhost:3000/binance
```

## Endpoints

### 1. Server Time

Mendapatkan waktu server Binance.

**Endpoint:** `GET /binance/time`

**Response:**

```json
{
  "serverTime": 1699999999999
}
```

**Status Codes:**

- `200` - Success
- `503` - Service Unavailable (jika Binance API tidak dapat diakses)

---

### 2. Exchange Information

Mendapatkan informasi exchange dari Binance.

**Endpoint:** `GET /binance/exchange-info`

**Response:**

```json
{
  "timezone": "UTC",
  "serverTime": 1699999999999,
  "rateLimits": [...],
  "exchangeFilters": [...],
  "symbols": [...]
}
```

**Status Codes:**

- `200` - Success
- `503` - Service Unavailable

---

### 3. Market Price

Mendapatkan harga ticker untuk symbol tertentu atau semua symbol.

**Endpoint:** `GET /binance/market/price`

**Query Parameters:**

- `symbol` (optional) - Symbol trading pair (contoh: BTCUSDT)

**Examples:**

```bash
# Mendapatkan semua harga
GET /binance/market/price

# Mendapatkan harga specific symbol
GET /binance/market/price?symbol=BTCUSDT
```

**Response (single symbol):**

```json
{
  "symbol": "BTCUSDT",
  "price": "35000.00000000"
}
```

**Response (all symbols):**

```json
[
  {
    "symbol": "ETHBTC",
    "price": "0.06123400"
  },
  {
    "symbol": "LTCBTC",
    "price": "0.00180300"
  }
]
```

**Status Codes:**

- `200` - Success
- `400` - Bad Request (invalid symbol)
- `503` - Service Unavailable

---

### 4. Health Check

Memeriksa status kesehatan API dan koneksi ke Binance.

**Endpoint:** `GET /binance/health`

**Response (Healthy):**

```json
{
  "status": "healthy",
  "binanceServerTime": 1699999999999,
  "timestamp": 1699999999999
}
```

**Response (Unhealthy):**

```json
{
  "status": "unhealthy",
  "error": "Error message",
  "timestamp": 1699999999999
}
```

**Status Codes:**

- `200` - Success

---

### 5. Place Sell Orders

Membuat multiple sell orders secara bersamaan.

**Endpoint:** `POST /binance/sell-orders`

**Request Body:**

```json
{
  "symbol": "BTCUSDT",
  "price": "35000.00",
  "orders": [
    {
      "apiKey": "your_api_key_1",
      "secret": "your_secret_key_1"
    },
    {
      "apiKey": "your_api_key_2",
      "secret": "your_secret_key_2"
    }
  ]
}
```

**Request Body Schema:**

- `symbol` (string, required) - Trading pair symbol
- `price` (string, optional) - Harga sell order
- `orders` (array, required) - Array berisi API credentials
  - `apiKey` (string, required) - Binance API key
  - `secret` (string, required) - Binance secret key

**Response:**

```json
{
  "success": true,
  "results": [
    {
      "orderId": 12345,
      "symbol": "BTCUSDT",
      "status": "FILLED"
    }
  ]
}
```

**Status Codes:**

- `200` - Success
- `400` - Bad Request (invalid parameters)
- `401` - Unauthorized (invalid API credentials)
- `500` - Internal Server Error

---

### 6. Place Make Orders (Batch Orders)

Membuat multiple orders dalam satu batch dengan berbagai parameter.

**Endpoint:** `POST /binance/make-orders`

**Request Body:**

```json
{
  "symbol": "BTCUSDT",
  "side": "BUY",
  "type": "LIMIT",
  "quantity": "0.001",
  "price": "34000.00",
  "orders": [
    {
      "apiKey": "your_api_key_1",
      "secret": "your_secret_key_1"
    },
    {
      "apiKey": "your_api_key_2",
      "secret": "your_secret_key_2"
    }
  ]
}
```

**Request Body Schema:**

- `symbol` (string, required) - Trading pair symbol (contoh: BTCUSDT)
- `side` (string, required) - Order side: "BUY" atau "SELL"
- `type` (string, required) - Order type: "LIMIT", "MARKET", dll
- `quantity` (string, required) - Jumlah asset yang akan di-trade
- `price` (string, required) - Harga order (untuk LIMIT order)
- `orders` (array, required) - Array berisi API credentials
  - `apiKey` (string, required) - Binance API key
  - `secret` (string, required) - Binance secret key

**Response:**

```json
{
  "success": true,
  "results": [
    {
      "orderId": 12345,
      "symbol": "BTCUSDT",
      "side": "BUY",
      "type": "LIMIT",
      "quantity": "0.001",
      "price": "34000.00",
      "status": "NEW"
    }
  ]
}
```

**Status Codes:**

- `200` - Success
- `400` - Bad Request (invalid parameters)
- `401` - Unauthorized (invalid API credentials)
- `500` - Internal Server Error

---

## Error Responses

Semua endpoint dapat mengembalikan error response dengan format berikut:

```json
{
  "statusCode": 400,
  "message": "Error description",
  "error": "Bad Request"
}
```

## Authentication

Untuk endpoint yang memerlukan trading (sell-orders dan make-orders), Anda perlu menyediakan:

- `apiKey` - Binance API Key
- `secret` - Binance Secret Key

API credentials ini harus valid dan memiliki permission untuk trading.

## Rate Limits

API ini mengikuti rate limits dari Binance API. Pastikan untuk tidak melebihi batas yang ditetapkan:

- Weight limit per minute
- Order limit per second
- Request limit per minute

## Security Notes

⚠️ **PENTING**:

- Jangan pernah expose API key dan secret key di client-side
- Selalu gunakan HTTPS dalam production
- Simpan credentials dengan aman
- Gunakan IP restriction di Binance API settings jika memungkinkan

## Examples

### cURL Examples

```bash
# Get server time
curl -X GET "http://localhost:3000/binance/time"

# Get market price for BTCUSDT
curl -X GET "http://localhost:3000/binance/market/price?symbol=BTCUSDT"

# Health check
curl -X GET "http://localhost:3000/binance/health"

# Place sell orders
curl -X POST "http://localhost:3000/binance/sell-orders" \
  -H "Content-Type: application/json" \
  -d '{
    "symbol": "BTCUSDT",
    "price": "35000.00",
    "orders": [
      {
        "apiKey": "your_api_key",
        "secret": "your_secret_key"
      }
    ]
  }'

# Place make orders
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
        "apiKey": "your_api_key",
        "secret": "your_secret_key"
      }
    ]
  }'
```

### JavaScript/Axios Examples

```javascript
const axios = require('axios');

const baseURL = 'http://localhost:3000/binance';

// Get server time
async function getServerTime() {
  try {
    const response = await axios.get(`${baseURL}/time`);
    console.log(response.data);
  } catch (error) {
    console.error(error.response.data);
  }
}

// Get market price
async function getMarketPrice(symbol) {
  try {
    const response = await axios.get(`${baseURL}/market/price`, {
      params: { symbol },
    });
    console.log(response.data);
  } catch (error) {
    console.error(error.response.data);
  }
}

// Place sell orders
async function placeSellOrders() {
  try {
    const response = await axios.post(`${baseURL}/sell-orders`, {
      symbol: 'BTCUSDT',
      price: '35000.00',
      orders: [
        {
          apiKey: 'your_api_key',
          secret: 'your_secret_key',
        },
      ],
    });
    console.log(response.data);
  } catch (error) {
    console.error(error.response.data);
  }
}
```

## Changelog

- **v1.0.0** - Initial release dengan endpoint dasar
- **v1.1.0** - Menambahkan batch order functionality
- **v1.2.0** - Menambahkan health check endpoint
