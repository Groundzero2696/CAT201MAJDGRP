# ThriftStore UI (React + Vite) — Connected to Plain Java Backend

## Run order (important)
1) Start the Java backend first (port 8080):
   - In `thrift-backend-java`: `./run.ps1` (PowerShell) or `run.bat`

2) Start the React frontend:
```bash
npm install
npm run dev
```

## Backend connection
This frontend calls `/api/...` and relies on the Vite dev proxy:
- `/api` -> `http://localhost:8080`

## Quick URLs
- Storefront: http://localhost:5173/
- Admin login (demo UI): http://localhost:5173/admin/login
- Backend check: http://localhost:8080/api/products

## What is “real” vs “demo”
Real (Java backend):
- Promo: GET /api/promo, PUT /api/admin/promo
- Products: GET /api/products, GET /api/product?id=...
- Cart: GET/POST endpoints
- Checkout: POST /api/checkout (writes `data/orders.txt`)
- Orders: GET /api/orders?userId=demo
- Trade-ins: POST /api/tradeins/submit, GET /api/tradeins?userId=demo

Demo-only (frontend UI only):
- Admin CRUD pages (products/categories/users), account profile/addresses UI.
