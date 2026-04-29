# Library Management System (React + Vite)

A simple **Library Management** project built with **React** and **Vite** focusing on essential book management and borrowing features. This is a **public** application where users can browse and borrow books without authentication.

---

## 🚀 Features

### 1. Public Routes

- All pages are accessible **without login or authentication**.
- Focus on core functionalities: viewing books, borrowing, and managing inventory.

### 2. Book Management

- **Book List Table:**
  - Displays all books in a tabular format.
  - Columns include: **Title, Author, Genre, ISBN, Copies, Availability, Actions**.
- **Action Buttons / Icons:**
  - **Edit Book:**  
    Opens a form pre-filled with existing book data.  
    On submission, updates the book via API and instantly refreshes UI.
  - **Delete Book:**  
    Opens a confirmation dialog before permanently deleting a book.
  - **Borrow Book:**  
    Opens a simple form to borrow a specific quantity of the book.
- **Business Logic:**
  - If `copies` count reaches **0**, the book is automatically marked as **unavailable**.
- **Add New Book:**
  - A dedicated button opens a form to add a new book.
  - Fields:  
    `Title`, `Author`, `Genre`, `ISBN`, `Description`, `Copies`, `Available` (optional, defaults to true).
  - After creation, redirects to the book list and updates the UI immediately.

### 3. Borrow Book

- Accessible via the **Borrow** button in the book list.
- Fields in borrow form:
  - `Quantity` (number)
  - `Due Date` (date)
- Business logic:
  - Quantity cannot exceed the number of available copies.
  - When copies reach zero, the book is marked unavailable.
- On successful submission:
  - Shows a success message.
  - Redirects to the **Borrow Summary** page.

### 4. Borrow Summary

- Displays a summary of all borrowed books.
- Columns include:  
  `Book Title`, `ISBN`, `Total Quantity Borrowed`.
- Data is retrieved via aggregation API.

---

## 🏠 Landing Page Components

- **Navbar:**  
  Simple navigation with links to:

  - All Books
  - Add Book
  - Borrow Summary

- **Book List Table/Grid:**  
  Displays all books with core actions like Edit, Delete, Borrow.

## 🔧 Tech Stack

- **Frontend:** React.js with Vite
- **State Management:** Redux
- **API:** REST API (Express Js)
- **Styling:** Tailwind CSS

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 14.x
- npm or yarn

### Installation

```bash
git clone https://github.com/Sadid205/library-management-frontend-assignment-04.git
cd library-management-frontend
npm install
npm run dev
```
