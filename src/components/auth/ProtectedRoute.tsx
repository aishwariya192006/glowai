import { Navigate, Outlet } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

interface ProtectedRouteProps {
  allowedRoles?: Array<'customer' | 'salon_owner' | 'admin'>;
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated, loading } = useApp();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If user is admin but tries to access a customer dashboard, we could redirect to admin.
    // Or just generic redirect
    if (user.role === 'admin') return <Navigate to="/admin" replace />;
    if (user.role === 'customer') return <Navigate to="/dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
