# BookNook – A Small Online Library

BookNook is a small online library management web application where users can explore books, add new books, borrow books, manage their own books, and return borrowed books.

## Live Website

https://booknook-client-gules.vercel.app/

## Client Repository

https://github.com/mainulislamrabby/booknook-client

## Server Repository

https://github.com/mainulislamrabby/booknook-server

## Features

- Browse all available books with detailed information.
- Secure authentication using Better Auth with email/password and Google login.
- Logged-in users can add new books with images, categories, descriptions, and available copies.
- Users can borrow available books and view their borrowed books.
- Users can return borrowed books and available copies are automatically updated.
- Users can edit and delete books that they have added.
- Prevents users from borrowing the same book more than once at the same time.
- Protected API routes using JWT authentication.
- Fully responsive design for mobile, tablet, and desktop devices.
- Toast notifications for successful and failed operations.
- Book images can be uploaded using an external image hosting service.
- New Arrivals section dynamically displays the latest books.
- Users can view and update their profile information.
- Loading spinner and custom 404 page for a better user experience.

## Technologies Used

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide React
- Better Auth
- MongoDB Adapter

### Backend

- Node.js
- Express.js
- MongoDB
- JavaScript
- JOSE / JWT

### Authentication

- Better Auth
- Email & Password Authentication
- Google OAuth
- JWT Token Validation
- MongoDB Adapter

## Main Pages

### Home

The homepage includes:

- Hero slider section
- New Arrivals
- Additional library sections
- Navigation to browse books

### All Books

Public page where users can browse all books in a responsive card grid.

### Book Details

Shows complete information about a selected book, including:

- Book image
- Title
- Author
- Category
- Description
- Added by information
- Available copies
- Borrow option

### Add Book

Private page where authenticated users can add a new book.

Users can provide:

- Book title
- Author
- Category
- Book image
- Description
- Total copies
- User information

### My Books

Private page where users can manage books they have added.

Users can:

- View their books
- Edit book information
- Delete books

### My Borrows

Private page where users can view their borrowed books.

Users can:

- View borrowed books
- Check borrow date
- Check return date
- Return books

### My Profile

Private profile page where users can:

- View their profile information
- Update their name
- Update their profile image
- View their email address

## Borrow System

BookNook includes an available-copy management system.

When a user borrows a book, the available copies decrease by 1.

When a user returns a book, the available copies increase by 1.

If no copies are available, the borrow button is disabled and displays:

**Not Available**

The system also prevents the same user from borrowing the same book multiple times while their previous borrow is still active.

## Authentication & Authorization

BookNook uses Better Auth for authentication.

Supported authentication methods:

- Email and password
- Google login

Private routes are protected so users must be authenticated before accessing features such as:

- Add Book
- My Books
- My Borrows
- My Profile
- Borrowing books

The Express server also validates JWT tokens for protected API requests.

## API

The Express backend provides APIs for managing books and borrowing operations.

### Books

- `GET /all-books` — Get all books
- `GET /new-arrivals` — Get the latest 6 books
- `GET /book/:id` — Get a single book
- `POST /add-book` — Add a new book
- `PATCH /book/:id` — Update a book
- `DELETE /book/:id` — Delete a book

### Borrows

- `POST /borrow-book` — Borrow a book
- `GET /my-borrows/:email` — Get the logged-in user's borrowed books
- `PATCH /return-book/:id` — Return a borrowed book

## Database

MongoDB is used as the main database.

**Database:** `book_nook`

**Collections:**

- `books`
- `borrows`

### Books Collection

Book documents contain information such as:

- `title`
- `author`
- `category`
- `image`
- `description`
- `userName`
- `email`
- `addedDate`
- `totalCopies`

### Borrows Collection

Borrow documents contain:

- `bookId`
- `bookTitle`
- `bookImage`
- `userEmail`
- `borrowDate`
- `returnDate`
- `status`

## Project Structure

### Client

```text
booknook-client/
├── src/
│   ├── app/
│   │   ├── api/
│   │   ├── add-book/
│   │   ├── books/
│   │   ├── my-books/
│   │   ├── my-borrows/
│   │   ├── my-profile/
│   │   ├── login/
│   │   ├── signup/
│   │   ├── loading.tsx
│   │   └── not-found.tsx
│   │
│   ├── components/
│   │   ├── books/
│   │   ├── borrows/
│   │   ├── home/
│   │   └── shared/
│   │
│   └── lib/
│       ├── auth.ts
│       ├── auth-client.ts
│       └── getTokenFromClient.ts
│
└── package.json
```

### Server

```text
booknook-server/
├── index.js
├── package.json
├── .env
└── README.md
```

## Environment Variables

### Client

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=your_backend_url
NEXT_PUBLIC_BETTER_AUTH_URL=your_better_auth_url
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Server

Create a `.env` file:

```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
CLIENT_URL=your_client_url
```

Do not commit `.env` or `.env.local` files to GitHub.

## Running Locally

### Client

```bash
npm install
npm run dev
```

The frontend will run on:

`http://localhost:3000`

### Server

```bash
npm install
npm run dev
```

The backend will run on:

`http://localhost:5000`

## GitHub Commit Requirements

This project includes meaningful development commits throughout the development process.

### Client

15+ notable GitHub commits.

### Server

8+ notable GitHub commits.

The commits represent meaningful development changes such as authentication, book management, borrowing functionality, UI development, API implementation, and bug fixes.

## Responsive Design

BookNook is designed to work across:

- Mobile devices
- Tablets
- Laptops
- Desktop screens

The interface uses responsive layouts, grids, spacing, and navigation for different screen sizes.

## Error Handling

The application uses toast notifications instead of browser default alerts.

Examples include:

- Login errors
- Registration errors
- Book creation errors
- Book update errors
- Book deletion errors
- Borrow errors
- Return errors
- Authentication errors

## Other Features

- Custom loading spinner
- Custom 404 Not Found page
- Page-specific titles
- Responsive navbar
- Responsive footer
- User profile management
- Protected private routes
- JWT-protected backend APIs
- Available-copy tracking
- Duplicate borrow prevention

## Future Improvements

Possible future improvements include:

- Dark/light theme
- Email verification
- Password reset
- Book search and advanced filtering
- Admin dashboard
- Book reviews and ratings
- Pagination
- Reading lists
- Notifications

## Author

**MD Mainul Islam Rabby**

BookNook – A Small Online Library