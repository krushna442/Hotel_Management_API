# Hotel Management System API

A robust RESTful API for managing hotel operations, including user authentication, room management, bookings, and payment simulation. Built with Node.js, Express, and MongoDB.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Room Management](#room-management)
  - [Booking Management](#booking-management)
  - [Payment Simulation](#payment-simulation)
- [Validation & Security](#validation--security)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **User Registration & Authentication** (JWT-based)
- **Role-based Access Control** (Admin & User)
- **Room Management** (CRUD, admin only)
- **Booking Management** (with date validation and room availability)
- **Payment Simulation** (with booking and room status updates)
- **Secure Password Hashing** (bcrypt)
- **Input Validation** (server-side)
- **Cookie-based Session Management**

---

## Tech Stack

- **Node.js** & **Express.js** (API & server)
- **MongoDB** & **Mongoose** (database & ODM)
- **JWT** (authentication)
- **bcrypt** (password hashing)
- **cookie-parser** (cookie management)

---

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB (local or cloud)

### Installation

```bash
git clone <repository-url>
cd hotel-management-api
npm install
```

### Environment Variables

Create a `.env` file in the root directory and set the following:

```
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
NODE_ENV=development
PORT=3000
```

### Running the Server

```bash
npm start
```

The API will be available at `http://localhost:3000` by default.

---

## API Endpoints

### Authentication

| Method | Endpoint      | Description                | Access |
|--------|--------------|----------------------------|--------|
| POST   | `/register`  | Register a new user        | Public |
| POST   | `/login`     | Login and receive JWT      | Public |
| POST   | `/logout`    | Logout and clear session   | Auth   |

### Room Management

| Method | Endpoint         | Description                | Access    |
|--------|-----------------|----------------------------|-----------|
| GET    | `/rooms`        | List all available rooms   | Auth      |
| POST   | `/rooms`        | Add a new room             | Admin     |
| PUT    | `/rooms/:id`    | Update room details        | Admin     |
| DELETE | `/rooms/:id`    | Delete a room              | Admin     |

### Booking Management

| Method | Endpoint        | Description                       | Access |
|--------|----------------|-----------------------------------|--------|
| POST   | `/book`        | Book a room                       | Auth   |
| GET    | `/my-bookings` | Get bookings for authenticated user| Auth   |

### Payment Simulation

| Method | Endpoint | Description           | Access |
|--------|----------|----------------------|--------|
| POST   | `/pay`   | Simulate a payment   | Auth   |

---

## Validation & Security

- **All endpoints** validate input data for type, format, and required fields.
- **Passwords** are hashed using bcrypt before storage.
- **JWT tokens** are used for authentication and stored in HTTP-only cookies.
- **Admin-only routes** are protected and require the user to have `isAdmin: true`.

---

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request. For major changes, open an issue first to discuss your ideas.

---

## License

This project is licensed under the MIT License.
