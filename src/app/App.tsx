import { RouterProvider } from 'react-router';
import { router } from './routes.tsx';
import { WebBossProvider } from './context/WebBossContext';
import { AuthProvider } from '../context/AuthContext';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <AuthProvider>
      <WebBossProvider>
        <RouterProvider router={router} />
        <Toaster position="top-center" />
      </WebBossProvider>
    </AuthProvider>
  );
}