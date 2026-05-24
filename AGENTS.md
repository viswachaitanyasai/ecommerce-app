# E-Commerce App — Agent Guide

## Stack
- **Backend:** Express + Mongoose (ESM — `"type": "module"` in root package.json)
- **Frontend:** Create React App under `client/`
- **Auth:** JWT (7d expiry, `JWT_SECRET`), bcrypt (salt rounds=10)
- **Payments:** Braintree sandbox gateway
- **No tests, no linter, no typechecker** configured in this repo.

## Dev Commands (run from repo root)
| Command | What it does |
|---|---|
| `npm run dev` | Starts Express (nodemon) + React concurrently |
| `npm run server` | Express only via nodemon |
| `npm run client` | React dev server only |
| `npm start` | Express only (no reload) |

## Env Variables (`.env` — gitignored)
```
PORT=8080
MONGO_URL=mongodb://...
JWT_SECRET=...
BRAINTREE_MERCHANT_ID=...
BRAINTREE_PUBLIC_KEY=...
BRAINTREE_PRIVATE_KEY=...
```

## Key Architecture
- **Server entry:** `server.js` — mounts routes at `/api/v1/auth`, `/api/v1/category`, `/api/v1/product`
- **Route files:** `routes/authRoute.js`, `routes/categoryRoute.js`, `routes/productRoute.js`
- **Controllers:** `controller/authController.js`, `controller/categoryController.js`, `controller/productController.js`
- **Models:** `models/userModel.js`, `models/productModel.js`, `models/categoryModel.js`, `models/orderModel.js`
- **Middlewares:** `middlewares/authmiddleware.js` (`requireSignIn`, `isAdmin`)
- **Helper:** `helper/authHelper.js` (`hashPassword`, `comparePassword`)
- **DB config:** `config/db.js` — Mongoose connect via `process.env.MONGO_URL`

## Conventions & Gotchas
- **Dir names are singular:** `controller/`, `helper/`, not `controllers/`, `helpers/`
- **Admin check:** `user.role === 1` (in `isAdmin` middleware)
- **Product photos** stored in MongoDB as Buffer (field: `photo.data`, `photo.contentType`)
- **Form uploads:** Use `express-formidable` middleware on create/update product routes
- **Pagination:** Product list defaults to 8 per page (`productListController`)
- **Validation uses `switch(true)` pattern** in product controllers (no break — intentional)
- **Login response bug:** `res.send({ user: { email: user.name, ... } })` — sends name as email field
- **categoryModel** has `required:true` commented out on name; schema is mostly lenient
- **Frontend entry:** `client/src/index.js` wraps app in `AuthProvider` > `SearchProvider` > `CartProvider` > `BrowserRouter`
- **Client pages barrel export:** `client/src/pages/pages.js` re-exports all page components
- **No `.env`** is loaded in client-side CRA by default (uses `REACT_APP_` prefix convention; none found currently)
