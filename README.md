# Nex Loyalty Web

Frontend developed for the Nex Digital Full Stack technical challenge.

## Technologies

* React
* TypeScript
* Vite
* Axios
* Ant Design
* Framer Motion
* React Toastify

---

## Features

### Authentication

* Login
* Registration
* JWT authentication

### Admin Dashboard

* Spreadsheet upload
* Transactions report
* Filters:

  * CPF
  * Product
  * Transaction date range
  * Amount range
  * Status

### User area

* Statement page
* Transaction filters
* Wallet page
* Approved points balance

---

## Project structure

```txt
src
├── @types
├── components
├── constants
├── hooks
├── pages
├── routes
├── services
├── utils
├── App.tsx
└── main.tsx
```

---

## Installation

Install dependencies:

```bash
pnpm install
```

Create .env:

```env
VITE_API_URL=http://localhost:3333
```

Run:

```bash
pnpm dev
```
---

## Business Rules

### Authentication

* Authentication uses JWT.
* Protected routes require a valid token.
* Users are redirected according to their role.

Admin:

```txt
/admin
```

User:

```txt
/statement
```

---

### Spreadsheet Upload

Spreadsheet upload follows these rules:

* Uploading a spreadsheet does not create users.
* Transactions are only associated with registered users.

Behavior:

```txt
Registered CPF → transaction created
Unregistered CPF → transaction ignored
```

---

### Statement

Users can only see:

```txt
their own transactions
```

Users cannot access information from other accounts.

---

### Wallet

The displayed balance is calculated using only:

```txt
Approved transactions
```

Pending and rejected transactions do not affect balance.

---

## Development time

Start:

Sunday: 18:30 → 23:00
Monday: 09:00 → 13:00

Total:

8 hours 30 minutes

```
```
