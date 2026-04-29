# Library Management API

**Built with:** Express, TypeScript & MongoDB (Mongoose)

---

## 🎯 Objective

Develop a robust **Library Management System API** using **Express**, **TypeScript**, and **MongoDB** with **Mongoose** ODM.

This API provides book and borrowing management features, including schema validation, business logic enforcement, aggregation queries, and advanced Mongoose features like static methods and middleware.

---

## 🔧 Core Requirements

- Built with **Express** and **TypeScript**
- Connects to **MongoDB** via **Mongoose**
- Enforces business logic (e.g., availability control during borrowing)
- Uses **Mongoose aggregation pipeline** for summaries
- Implements **Mongoose static method**
- Utilizes **Mongoose middleware** (`post` hooks)
- Supports filtering features on API endpoints

---

## 📚 Models & Validation

### Book Model

| Field         | Type    | Validation & Notes                                                                            |
| ------------- | ------- | --------------------------------------------------------------------------------------------- |
| `title`       | string  | **Required** — Book's title                                                                   |
| `author`      | string  | **Required** — Book's author                                                                  |
| `genre`       | string  | **Required** — One of: `FICTION`, `NON_FICTION`, `SCIENCE`, `HISTORY`, `BIOGRAPHY`, `FANTASY` |
| `isbn`        | string  | **Required & Unique** — International Standard Book Number                                    |
| `description` | string  | Optional — Brief summary or description                                                       |
| `copies`      | number  | **Required** — Non-negative integer representing total copies available                       |
| `available`   | boolean | Defaults to `true` — Indicates if book is currently available for borrowing                   |

### Borrow Model

| Field      | Type     | Validation & Notes                                            |
| ---------- | -------- | ------------------------------------------------------------- |
| `book`     | ObjectId | **Required** — References the borrowed book's ID (Book model) |
| `quantity` | number   | **Required** — Positive integer, number of copies borrowed    |
| `dueDate`  | Date     | **Required** — Date by which book must be returned            |

---

## 🛠️ Business Logic Highlights

- When a borrow request is made, the system **checks availability**:

  - Borrow quantity **cannot exceed** available copies.
  - If after borrowing, copies reach zero, `available` status is updated accordingly.

  - Updating book availability.
  - Validations and side effects on related models.

- Implements **Mongoose static or instance methods** for reusable queries or operations (e.g., total borrowed quantity per book).

- Provides **filtering** on book list or borrow records via query parameters.

- Uses **aggregation pipeline** for summary endpoints, e.g., total quantity borrowed per book.

---

## 🚀 API Endpoints (Summary)

| Method | Endpoint     | Description                          |
| ------ | ------------ | ------------------------------------ |
| GET    | `/books`     | List all books with optional filters |
| POST   | `/books`     | Add a new book                       |
| PUT    | `/books/:id` | Edit existing book                   |
| DELETE | `/books/:id` | Delete a book                        |
| POST   | `/borrow`    | Borrow a book                        |
| GET    | `/borrow`    | Get borrow summary (aggregated)      |

---

## 🔧 Tech Stack

- **Backend:** Node.js, Express.js, TypeScript
- **Database:** MongoDB with Mongoose ODM
- **Validation:** Mongoose schema validation & custom middleware

---

## ⚙️ Getting Started

### Prerequisites

- Node.js >= 14.x
- MongoDB running (local or cloud)

### Installation

```bash
git clone https://github.com/Sadid205/Assignment-3-Library-Management.git
cd Assignment-3
npm install
npm run dev
```
