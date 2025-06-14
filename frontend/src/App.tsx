import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './components/ThemeProvider';
import { Layout } from './components/layout/Layout';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useAuthStore } from './store/auth';
import React from 'react';
import { Loader } from './components/Loader';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

// Lazy load pages
const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Contacts = React.lazy(() => import('./pages/Contacts'));
const ContactDetails = React.lazy(() => import('./pages/ContactDetails'));
const Profile = React.lazy(() => import('./pages/Profile'));
const ForgotPassword = React.lazy(() => import('./pages/ForgotPassword'));

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <ThemeProvider>
          <Router>
            <Layout>
              <React.Suspense
                fallback={
                  <div className="flex items-center justify-center min-h-screen">
                    <Loader
                      size="lg"
                      variant="primary"
                      className="w-24 h-24 text-green-500"
                    />
                  </div>
                }
              >
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route
                    path="/login"
                    element={
                      isAuthenticated ? <Navigate to="/contacts" /> : <Login />
                    }
                  />
                  <Route
                    path="/register"
                    element={
                      isAuthenticated ? (
                        <Navigate to="/contacts" />
                      ) : (
                        <Register />
                      )
                    }
                  />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route
                    path="/contacts"
                    element={
                      isAuthenticated ? <Contacts /> : <Navigate to="/login" />
                    }
                  />
                  <Route
                    path="/contacts/new"
                    element={
                      isAuthenticated ? (
                        <ContactDetails />
                      ) : (
                        <Navigate to="/login" />
                      )
                    }
                  />
                  <Route
                    path="/contacts/:id"
                    element={
                      isAuthenticated ? (
                        <ContactDetails />
                      ) : (
                        <Navigate to="/login" />
                      )
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      isAuthenticated ? <Profile /> : <Navigate to="/login" />
                    }
                  />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </React.Suspense>
            </Layout>
          </Router>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 5000,
              style: {
                background: '#333',
                color: '#fff',
              },
              success: {
                duration: 3000,
                theme: {
                  primary: '#4aed88',
                },
              },
              error: {
                duration: 4000,
                theme: {
                  primary: '#ff4b4b',
                },
              },
            }}
          />
        </ThemeProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
