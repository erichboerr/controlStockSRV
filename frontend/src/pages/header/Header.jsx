import { useNavigate } from 'react-router-dom';
import useAuth from '../../common/hooks/useAuth';
import { eliminarToken } from '../../common/utils/auth';

export default function Header() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();  

  const handleLogout = () => {
    eliminarToken();
    setAuth({ isLoggedIn: false, idRol: null, user: null });
    navigate('/');
  };

  return (
    <div className="row bg-dark text-white fixed-top" style={{ height: '60px', zIndex: 1100 }}>
      <div className="col d-flex align-items-center justify-content-between px-4">
        <div className="fw-bold fs-5">
          <i className="bi bi-boxes"></i> ControlStock v2
        </div>
        <div className="d-flex align-items-center">
          <span className="me-3">👤 {auth.user?.usuario}</span>
          <button className="btn btn-sm btn-outline-light" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right"></i> Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}