import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { VideoLibrary } from './pages/VideoLibrary';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './config/queryClient';
import { Layout } from './components/Layout';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<VideoLibrary />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
