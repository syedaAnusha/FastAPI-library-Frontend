# Library Management System - Frontend

A modern, responsive library management system built with Next.js and TypeScript, featuring a clean and intuitive user interface for managing books and their metadata.

## Features

- 📚 Comprehensive Book Management
  - Add, edit, and delete books
  - View book details including title, author, year, and description
  - Upload and display book cover images
  - Categorize books by genre
- 🔍 Advanced Search & Filtering
  - Search books by title
  - Filter books by category
  - Sort books by various fields (title, author, year)
- 💫 Modern UI/UX
  - Responsive design for all devices
  - Dark mode support
  - Animated transitions and feedback
  - Loading states and error handling
- 🛠 Technical Features
  - Built with Next.js 14+ and TypeScript
  - State management with Zustand
  - Form validation with Zod
  - Tailwind CSS for styling
  - Radix UI primitives for accessible components

## Tech Stack

- **Framework**: Next.js 14+
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Components**:
  - Radix UI primitives
  - Custom UI components
- **Form Validation**: Zod
- **Icons**: Lucide Icons
- **Fonts**: Geist Sans & Geist Mono

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18.17.0 or later
- npm, yarn, or pnpm

## Getting Started

1. Clone the repository:

```bash
git clone <repository-url>
cd FastAPI-library-Frontend
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add:

```env
NEXT_PUBLIC_API_URL=<your-backend-api-url>
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
src/
├── app/               # Next.js app router files
├── components/        # React components
│   ├── ui/           # Reusable UI components
│   └── ...           # Feature-specific components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── schemas/          # Zod validation schemas
├── store/            # Zustand store definitions
├── types/            # TypeScript type definitions
└── utils/            # Helper functions and API client
```

## Key Components

- **BookCard**: Displays individual book information
- **BookDialog**: Handles adding and editing books
- **DeleteDialog**: Confirmation dialog for book deletion
- **Filters**: Category and sorting controls
- **Header**: App header with search and add book button
- **Layout**: Main layout wrapper

## State Management

The application uses Zustand for state management with the following main features:

- Book list management
- Search and filter state
- Dialog states
- Loading and error states

## API Integration

The frontend communicates with a FastAPI backend through a RESTful API. The main endpoints include:

- GET /books/ - Fetch all books
- POST /books/ - Create a new book
- PUT /books/{id}/ - Update a book
- DELETE /books/{id}/ - Delete a book
- GET /books/search/{query} - Search books
- GET /books/category/{category} - Filter books by category
- GET /books/sort/{field} - Sort books by field

## Contributing

1. Fork the repository
2. Create a new branch for your feature
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Zustand Documentation](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Radix UI Documentation](https://www.radix-ui.com/docs/primitives)
