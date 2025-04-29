import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { VideoLibrary } from './pages/VideoLibrary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<VideoLibrary />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
