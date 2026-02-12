# Trello Clone

A full-featured Trello clone built with modern web technologies and best practices.

**Live Demo:** [https://trello-fkr.vercel.app/](https://trello-fkr.vercel.app/)

## Features

- Drag & drop lists and cards using @dnd-kit
- Create, edit, and delete lists
- Create, edit, and delete cards
- Comment system for each card
- Editable board and list titles
- Data persistence with IndexedDB
- Responsive design

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
- **Drag & Drop:** [@dnd-kit](https://dndkit.com/)
- **Styling:** SCSS Modules
- **Data Persistence:** IndexedDB
- **Linting:** ESLint
- **Git Hooks:** Husky + Commitlint (Conventional Commits)
- **Package Manager:** pnpm

## Project Structure

The project follows a **feature-based folder structure** with single responsibility principle:

```
src/
├── app/                    # Next.js App Router pages
├── assets/styles/          # Global SCSS (variables, mixins, typography)
├── components/             # Shared/global components (Modal, Button)
├── config/                 # App configuration (API URLs, seed data)
├── features/
│   ├── board/              # Board feature
│   │   ├── components/     # Board-specific components
│   │   ├── hooks/          # Board hooks (useAddBoard, useBoardList, etc.)
│   │   ├── pages/          # Board pages (HomePage)
│   │   ├── services/       # Board services (addBoard, deleteBoard, etc.)
│   │   ├── store/          # Board Redux slice
│   │   └── types/          # Board TypeScript types
│   ├── task/               # Task feature
│   │   ├── components/     # Task-specific components
│   │   ├── hooks/          # Task hooks (useAddTask, useDeleteTask, etc.)
│   │   ├── services/       # Task services
│   │   └── types/          # Task TypeScript types
│   └── comment/            # Comment feature
│       ├── components/     # Comment-specific components
│       ├── hooks/          # Comment hooks (useComments, useAddComment)
│       ├── services/       # Comment services
│       └── types/          # Comment TypeScript types
├── providers/              # React providers (Redux, DND)
├── store/                  # Redux store configuration
├── types/                  # Shared TypeScript types
└── utils/                  # Utility functions (IndexedDB helpers)
```

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build
```

## Author

**Farshad Karami** - [LinkedIn](https://www.linkedin.com/in/farshadkr/)
