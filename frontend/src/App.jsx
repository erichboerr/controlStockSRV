// App.jsx
import useAuth from './common/hooks/useAuth.js';
import useSession from './common/hooks/useSession.js';
import Login from './pages/login/Login.jsx';
import AppRouter from "./routes/AppRouter.jsx";

export default function App() {
  const { auth, loading } = useAuth();
  useSession();

  if (loading) return null; // espera a que useSession termine
  if (!auth.isLoggedIn) return <Login />;
  return <AppRouter />;
}