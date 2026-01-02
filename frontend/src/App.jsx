import useAuth from './common/hooks/useAuth.js';
import useSession from './common/hooks/useSession.js';
import Login from './pages/login/Login.jsx';
import AppRouter from "./routes/AppRouter.jsx";

export default function App() {
  const { auth } = useAuth();
  useSession();

  if (!auth.isLoggedIn) return <Login />;
  return <AppRouter />;
}