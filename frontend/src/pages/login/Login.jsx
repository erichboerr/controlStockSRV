import { useLoginForm } from "./hooks/useLoginForm";
import LoginRow from "./components/LoginRow";
import { useSearchParams } from "react-router-dom";

function Login() {
  const {
    formData,
    handleChange,
    handleSubmit,
    loading,
  } = useLoginForm();

  const [searchParams] = useSearchParams();
  const expired = searchParams.get("expired");

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 px-4">
      <div className="w-full max-w-md bg-white shadow-xl border border-gray-200 rounded-2xl p-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <i className="bi bi-person-lock text-gray-600"></i>
            Iniciar Sesión
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Accedé con tus credenciales
          </p>
        </div>

        {expired && (
          <div className="mb-4 px-4 py-3 bg-yellow-50 border border-yellow-300 text-yellow-800 rounded-lg text-sm text-center">
            <i className="bi bi-exclamation-triangle me-2"></i>
            Tu sesión expiró. Ingresá nuevamente.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <LoginRow
            keyName="user"
            label="Usuario"
            value={formData.user}
            onChange={handleChange}
          />
          <LoginRow
            keyName="password"
            label="Contraseña"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="submit"
            disabled={loading}
            className="
              w-full bg-blue-600 hover:bg-blue-700 
              text-white font-semibold py-2.5 rounded-lg 
              transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center justify-center gap-2
            "
          >
            {loading ? (
              "Cargando..."
            ) : (
              <>
                <i className="bi bi-box-arrow-in-right"></i>
                Iniciar Sesión
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
export default Login;