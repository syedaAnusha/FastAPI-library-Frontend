# Library Management System - Frontend

A modern, responsive library management system built with Next.js and TypeScript, featuring a clean and intuitive user interface for managing books and their metadata.

## Features

- 📚 Comprehensive Book Management
  - Add, edit, and delete books
  - View book details including title, author, year, and description
  - Upload and display book cover images
  - Categorize books by genre
  - Pagination support for large libraries
- 🔍 Advanced Search & Filtering
  - Real-time search by title with debounced input
  - Filter books by category with dynamic filtering
  - Sort books by multiple fields (title, author, year)
  - Ascending and descending sort options
- 💫 Modern UI/UX
  - Responsive design for all devices
  - Dark mode support
  - Animated transitions and feedback
  - Loading states and error handling
  - Toast notifications for user feedback
  - Modal dialogs for actions
- 🛠 Technical Features
  - Built with Next.js 14+ and TypeScript
  - State management with Zustand
  - Form validation with Zod
  - Tailwind CSS for styling
  - Radix UI primitives for accessible components
  - RESTful API integration
  - Dynamic routing for book details

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**:
  - Tailwind CSS for utility-first styling
  - shadcn/ui components for consistent design
  - CSS Variables for theming
- **State Management**:
  - Zustand for global state
  - React Query for server state
- **Components**:
  - Radix UI primitives for accessibility
  - Custom reusable UI components
  - Client-side components with 'use client' directives
- **Form Validation**:
  - Zod for schema validation
  - Custom form hooks for validation
- **Icons**: Lucide Icons for consistent iconography
- **Fonts**: Geist Sans & Geist Mono for modern typography
- **Development**:
  - ESLint for code quality
  - Prettier for code formatting
  - TypeScript strict mode enabled

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
├── app/                    # Next.js app router files
│   ├── books/             # Book-related pages
│   │   └── [id]/         # Dynamic book detail routes
│   ├── layout.tsx        # Root layout with providers
│   └── page.tsx          # Home page component
├── components/            # React components
│   ├── ui/               # Reusable UI components (shadcn/ui)
│   │   ├── button.tsx   # Button component
│   │   ├── card.tsx     # Card component
│   │   ├── dialog.tsx   # Dialog component
│   │   └── ...          # Other UI components
│   ├── BookCard.tsx      # Book display component
│   ├── BookDialog.tsx    # Book form dialog
│   ├── Filters.tsx       # Search and filter controls
│   └── ...               # Other feature components
├── hooks/                # Custom React hooks
│   └── useLibrary.ts    # Library management hook
├── lib/                  # Utility functions
│   └── utils.ts         # Helper utilities
├── schemas/              # Zod validation schemas
│   └── bookSchema.ts    # Book validation schema
├── store/               # Zustand store definitions
│   └── useBookStore.ts  # Book state management
├── types/               # TypeScript type definitions
│   └── types.ts        # Shared type definitions
└── utils/               # Helper functions
    ├── api.ts          # API client and endpoints
    └── helper.ts       # Helper utilities
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

The application integrates with a FastAPI backend service that provides the following endpoints:

- `GET /books/combined` - Combined endpoint for fetching, searching, filtering, and sorting books with pagination
  - Query parameters:
    - `page`: Page number (default: 1)
    - `page_size`: Items per page (default: 10)
    - `title`: Search by title
    - `category`: Filter by category
    - `sort_by`: Sort by field ("year", "author", "title")
    - `desc`: Sort direction (true/false)
- `GET /books/{id}` - Get a specific book by ID
- `POST /books/` - Create a new book
- `PUT /books/{id}` - Update an existing book
- `DELETE /books/{id}` - Delete a book

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
