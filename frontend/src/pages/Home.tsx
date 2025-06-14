import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

export const Home = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl font-bold text-primary-900 mb-6">
            Welcome to Contacts App
          </h1>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Manage your contacts efficiently and securely with our modern,
            user-friendly platform
          </p>

          {isAuthenticated ? (
            <div className="space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/contacts" className="btn-primary text-lg px-8 py-3">
                View Contacts
              </Link>
              <Link to="/profile" className="btn-secondary text-lg px-8 py-3">
                View Profile
              </Link>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/login" className="btn-primary text-lg px-8 py-3">
                Get Started
              </Link>
            </div>
          )}
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3 className="feature-title">Easy Management</h3>
            <p className="feature-description">
              Organize your contacts with an intuitive interface
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3 className="feature-title">Secure Storage</h3>
            <p className="feature-description">
              Your data is protected with modern security measures
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3 className="feature-title">Fast & Reliable</h3>
            <p className="feature-description">
              Quick access to your contacts whenever you need them
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
