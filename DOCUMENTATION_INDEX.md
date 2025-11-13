# Binance API Service - Documentation Index

Selamat datang di dokumentasi lengkap untuk Binance API Service. Dokumentasi ini terdiri dari beberapa file yang mencakup berbagai aspek penggunaan API.

## 📚 Daftar Dokumentasi

### 1. [BINANCE_API_DOCUMENTATION.md](./BINANCE_API_DOCUMENTATION.md)

**Dokumentasi Utama API**

- Penjelasan lengkap setiap endpoint
- Schema request dan response
- Status codes dan error handling
- Authentication dan security notes
- Contoh penggunaan dengan cURL dan JavaScript

### 2. [API_EXAMPLES.md](./API_EXAMPLES.md)

**Kumpulan Contoh Lengkap**

- Request dan response examples untuk setiap endpoint
- Berbagai skenario penggunaan
- Error responses dan handling
- Multiple accounts examples
- Testing examples

### 3. [swagger.yaml](./swagger.yaml)

**OpenAPI/Swagger Specification**

- Spesifikasi API dalam format OpenAPI 3.0
- Dapat digunakan untuk generate client libraries
- Interactive documentation dengan Swagger UI
- Schema definitions dan validation rules

### 4. [postman_collection.json](./postman_collection.json)

**Postman Collection**

- Collection lengkap untuk testing di Postman
- Pre-configured requests dengan variables
- Test scripts untuk validation
- Environment variables setup

### 5. [README.md](./README.md)

**Project Overview**

- Deskripsi umum project
- Setup dan installation guide
- Features overview
- Link ke dokumentasi lainnya

## 🚀 Quick Start

### 1. Setup Project

```bash
# Install dependencies
npm install

# Start development server
npm run start:dev

# Start production server
npm run start:prod
```

### 2. Test Endpoints

#### Menggunakan cURL

```bash
# Test health check
curl -X GET "http://localhost:3000/binance/health"

# Get ticker price
curl -X GET "http://localhost:3000/binance/market/price?symbol=BTCUSDT"
```

#### Menggunakan Postman

1. Import file `postman_collection.json` ke Postman
2. Set environment variables (API keys, base URL)
3. Run collection atau individual requests

#### Menggunakan Swagger UI

1. Start server
2. Buka `http://localhost:3000/api` (jika Swagger module enabled)
3. Explore dan test endpoints langsung dari browser

## 📋 Endpoint Summary

| Method | Endpoint                 | Description        | Auth Required |
| ------ | ------------------------ | ------------------ | ------------- |
| GET    | `/binance/time`          | Get server time    | ❌            |
| GET    | `/binance/exchange-info` | Get exchange info  | ❌            |
| GET    | `/binance/market/price`  | Get ticker prices  | ❌            |
| GET    | `/binance/health`        | Health check       | ❌            |
| POST   | `/binance/sell-orders`   | Place sell orders  | ✅            |
| POST   | `/binance/make-orders`   | Place batch orders | ✅            |

## 🔒 Authentication

Untuk endpoint trading (`sell-orders` dan `make-orders`), Anda perlu menyediakan:

```json
{
  "orders": [
    {
      "apiKey": "your_binance_api_key",
      "secret": "your_binance_secret_key"
    }
  ]
}
```

⚠️ **Security Reminder:**

- Jangan expose API credentials di client-side
- Gunakan environment variables untuk menyimpan credentials
- Enable IP restriction di Binance API settings
- Gunakan HTTPS di production

## 🛠️ Development

### Project Structure

```
src/
├── binance/
│   ├── binance.controller.ts     # API endpoints
│   ├── binance.service.ts        # Business logic
│   ├── binance.module.ts         # Module configuration
│   └── dto/
│       ├── placeOrder.dto.ts     # Order DTOs
│       └── sellOrder.dto.ts      # Sell order DTOs
└── main.ts                       # Application entry point
```

### Adding New Endpoints

1. **Add method to service** (`binance.service.ts`)

```typescript
async newMethod() {
  // Implementation
}
```

2. **Add endpoint to controller** (`binance.controller.ts`)

```typescript
@Get('new-endpoint')
async newEndpoint() {
  return await this.binanceService.newMethod();
}
```

3. **Update documentation**

- Add to `BINANCE_API_DOCUMENTATION.md`
- Add examples to `API_EXAMPLES.md`
- Update `swagger.yaml`
- Add to Postman collection

## 🧪 Testing

### Unit Tests

```bash
npm run test
```

### E2E Tests

```bash
npm run test:e2e
```

### Manual Testing

1. Use Postman collection
2. Use Swagger UI
3. Use cURL commands from documentation

## 📊 Monitoring

### Health Check

```bash
curl -X GET "http://localhost:3000/binance/health"
```

Response indicates:

- API server status
- Binance connectivity
- Server timestamp

### Logs

Application logs include:

- Request/response details
- Error messages
- Performance metrics
- Trading activity

## 🔄 Rate Limits

API mengikuti rate limits Binance:

- **Weight limit:** 1200 per minute
- **Orders limit:** 10 per second
- **Raw requests:** 6000 per 5 minutes

## 🆘 Troubleshooting

### Common Issues

1. **Connection timeout**
   - Check internet connection
   - Verify Binance API status
   - Check firewall settings

2. **Invalid API credentials**
   - Verify API key and secret
   - Check API permissions
   - Ensure IP whitelist is correct

3. **Insufficient balance**
   - Check account balance
   - Verify symbol precision
   - Check minimum order requirements

4. **Rate limit exceeded**
   - Implement request throttling
   - Use request queuing
   - Monitor request frequency

### Getting Help

1. Check [API_EXAMPLES.md](./API_EXAMPLES.md) for usage examples
2. Review error responses in documentation
3. Check logs for detailed error messages
4. Verify Binance API documentation for latest updates

## 📈 Performance Tips

1. **Batch requests** when possible
2. **Cache exchange info** and reuse
3. **Implement retry logic** for temporary failures
4. **Monitor rate limits** and implement throttling
5. **Use WebSocket** for real-time data (future enhancement)

## 🔮 Future Enhancements

- [ ] WebSocket support for real-time data
- [ ] Advanced order types (OCO, trailing stop)
- [ ] Account balance monitoring
- [ ] Trade history endpoints
- [ ] Automated trading strategies
- [ ] Risk management features

## 📝 Contributing

1. Fork the repository
2. Create feature branch
3. Add tests for new features
4. Update documentation
5. Submit pull request

## 📞 Support

For technical support:

- Create GitHub issue
- Check existing documentation
- Review troubleshooting guide

---

**Version:** 1.2.0  
**Last Updated:** November 2024  
**Maintainer:** Development Team
