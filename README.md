# 📚 Library Management System

A **Library Management System** built using **Next.js, PostgreSQL, and Prisma** to efficiently manage books, members, and issuances.

## 🚀 Features

- **Database Model**: PostgreSQL schema designed to store books, members, and issuances.
- **CRUD RESTful APIs**: Manage **Books, Members, and Issuances** with proper API standards.
- **Analytics Dashboard**: Provides insights into:
  - Books that have never been borrowed
  - Outstanding books at any given time
  - Top 10 most borrowed books

## 🛠 Tech Stack

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (hosted on **Neon**)
- **Authentication**: API Key for secure access

## 📊 SQL Queries

### 1️⃣ Get all books that have never been borrowed

```sql
SELECT 
    b.name AS "Book Name",
    b.author AS "Author"
FROM Book b
LEFT JOIN Issuance i ON b.id = i.book_id
WHERE i.book_id IS NULL;
```

### 2️⃣ List all outstanding books at any given point in time
```sql
SELECT 
    m.name AS "Member Name",
    b.name AS "Book Name",
    i.issued_date AS "Issued Date",
    i.return_date AS "Target Return Date",
    b.author AS "Author"
FROM Issuance i
JOIN Member m ON i.member_id = m.id
JOIN Book b ON i.book_id = b.id
WHERE i.return_date IS NULL OR i.return_date > CURRENT_DATE;
```
### 3️⃣ Extract the top 10 most borrowed books

```sql
SELECT 
    b.name AS "Book Name",
    COUNT(i.book_id) AS "Times Borrowed",
    COUNT(DISTINCT i.member_id) AS "Unique Borrowers"
FROM Issuance i
JOIN Book b ON i.book_id = b.id
GROUP BY b.id
ORDER BY COUNT(i.book_id) DESC
LIMIT 10;
```

## 🌐 API Standards

Base URL: https://library-management-gamma-nine.vercel.app
Endpoints follow RESTful structure:
```bash
GET /books → Fetch all books
POST /books → Add a new book
GET /books/:id → Fetch book details
PUT /books/:id → Update book details
DELETE /books/:id → Remove a book
```

```bash
GET /members → Fetch all members
POST /members → Add a new member
GET /members/:id → Fetch member details
PUT /members/:id → Update member details
DELETE /members/:id → Remove a member
```

```bash
GET /issuances → Fetch all issuances
POST /issuances → Add a new issuance
GET /issuances/:id → Fetch issuance details
PUT /issuances/:id → Update issuance details
DELETE /issuances/:id → Remove a issuance 
```



Security: Implemented API Key authentication to prevent unauthorized access.

## 🏃‍♂️ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/library-management.git
cd library-management
```

### 2️⃣ Install Dependencies
```bash
npm install
# or yarn install
# or pnpm install
```

### 3️⃣ Start the Development Server

```bash
npm run dev
# or yarn dev
```

Open http://localhost:3000 to view the app.

## 📖 Learn More

- [Next.js Documentation](https://nextjs.org/learn)

- [Prisma ORM Documentation](https://www.prisma.io/docs/orm)


## 🚀 Deploying to Production

- The easiest way to deploy this Next.js app is with Vercel.
- For manual deployment, check the [Next.js Documentation](https://nextjs.org/docs).
## Deployment Link:
https://library-management-gamma-nine.vercel.app

## Screenshots

1. The dashboard for the OverDue books

![Dashboard UI](<Screenshot 2025-02-24 at 10.06.35 AM.png>)

2. Books List UI
![BooksList UI](<Screenshot 2025-02-24 at 10.06.53 AM.png>)

3. Members List UI
![MembersList UI](<Screenshot 2025-02-24 at 10.07.09 AM.png>)

4. Issuances List UI
![IssuancesList](<Screenshot 2025-02-24 at 10.07.09 AM-1.png>)

5. Analytics UI based on the SQL queries
![Books Never Borrowed](<Screenshot 2025-02-24 at 10.08.02 AM.png>)
![Top 10 books borrowed](<Screenshot 2025-02-24 at 10.08.12 AM.png>)