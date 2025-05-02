# Video Library Dashboard

A full-stack application for browsing and managing a video library, built with React and Node.js.

## 🚀 Features

- **Video Grid Display**: Responsive grid layout showing video thumbnails
- **Search & Filter**:
  - Search videos by title
  - Filter by date range
  - Filter by tags
- **Sorting Options**:
  - Newest/Oldest
  - Alphabetical (A-Z/Z-A)
- **Video Details**: Modal view with comprehensive video information
- **Pagination**: Efficient browsing through the video collection

## 🛠️ Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- React Query (for data fetching)
- React Router (for navigation)

### Backend
- Node.js
- Express
- SQLite
- Prisma (ORM)
- TypeScript

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- SQLite

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/video-library-dashboard.git
cd video-library-dashboard
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up the database:
```bash
cd backend
npm run db:seed
```

4. Start the development servers:
```bash
cd backend
npm run dev

cd ../frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:4000

## 🐳 Docker Setup

### Prerequisites
- Docker
- Docker Compose

### Running with Docker

1. Build and start the containers:
```bash
docker-compose -f docker-compose.dev.yml up --build
```

This will:
- Build the frontend and backend containers
- Set up the SQLite database
- Run database migrations
- Seed the database with initial data
- Start both frontend and backend services

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:4000


## 💭 Developer's Note

In implementing this project, I focused on delivering a robust and user-friendly video library dashboard. Here's my approach and priorities:

### 🎯 Key Focus Areas

1. **User Experience**
   - Implemented an intuitive interface for video browsing
   - Created a responsive design that works seamlessly on both desktop and mobile devices
   - Added clear loading states and error handling for a smooth user experience
   - Designed a modal-based video details view for quick access to information

2. **Code Organization**
   - Split components into clean, reusable parts
   - Maintained a clear separation between frontend and backend
   - Followed consistent naming conventions and file structure
   - Implemented modular architecture for better scalability

3. **Development Experience**
   - Set up Docker containers to simplify application deployment
   - Created a development environment with hot-reloading
   - Documented setup and running instructions thoroughly

### 🤝 Trade-offs and Future Improvements

While I prioritized core functionality and user experience, there are areas I would enhance given more time:

1. **Type Safety**
   - Would implement end-to-end type safety between frontend and backend
   - Add comprehensive TypeScript interfaces for API responses

2. **Testing**
   - Add unit tests for critical components
   - Implement integration tests for API endpoints
   - Add end-to-end testing for key user flows


I'm looking forward to discussing these choices and potential improvements during our conversation!

## 📝 Project Structure

```
video-library-dashboard/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── utils/
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   └── package.json
└── README.md
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.