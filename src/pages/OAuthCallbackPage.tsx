import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { api } from '../lib/api';

export function OAuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useApp();

  useEffect(() => {
    const userId = searchParams.get('user_id');
    
    if (!userId) {
      navigate('/login?error=missing_user_id');
      return;
    }

    const fetchUser = async () => {
      try {
        const users = await api.getUsers();
        const loggedInUser = users.find(u => u.id === userId || (u as any)._id === userId);
        
        if (loggedInUser) {
          setUser(loggedInUser);
          navigate('/dashboard');
        } else {
          navigate('/login?error=user_not_found');
        }
      } catch (err) {
        console.error('Error fetching user after OAuth', err);
        navigate('/login?error=fetch_failed');
      }
    };

    fetchUser();
  }, [searchParams, navigate, setUser]);

  return (
    <div className="min-h-screen bg-rose-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Completing Sign In...</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Please wait while we log you in.</p>
      </div>
    </div>
  );
}
