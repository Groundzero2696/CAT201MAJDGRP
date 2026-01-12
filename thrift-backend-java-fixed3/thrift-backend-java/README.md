# ThriftStore Backend (Plain Java, No Frameworks)

This backend is implemented using only the **JDK built-in** HTTP server:
- `com.sun.net.httpserver.HttpServer`
- No Spring / Struts / GWT (complies with “no web frameworks” rule)

It demonstrates:
- OOP domain model (Product, Order, TradeInRequest, Promotion, User, etc.)
- Processing/business logic (filter/sort, cart subtotal, free shipping threshold, order creation, trade-in flow)
- Input/Output (HTTP JSON input/output + file persistence in `/data`)

## Requirements
- JDK 11+ installed (`java -version`)

## Run (Windows PowerShell)
From the backend folder:
```powershell
./run.ps1
```

## Run (Windows CMD)
```bat
run.bat
```

## Run (macOS/Linux)
```bash
bash run.sh
```

Server starts at:
- http://localhost:8080

## API quick test
Open in browser:
- http://localhost:8080/api/promo
- http://localhost:8080/api/products
- http://localhost:8080/api/products?category=women&sort=price_asc

## Connect to your Vite React frontend (recommended)
In your Vite `vite.config.js`, add:
```js
server: { proxy: { "/api": "http://localhost:8080" } }
```

Then your React can call:
- `fetch("/api/products")` (no CORS issues via proxy)

## Data files
- `data/products.txt`   pipe-delimited product seed data
- `data/promo.txt`      announcement|threshold
- `data/orders.txt`     orders appended
- `data/tradeins.txt`   trade-ins appended

