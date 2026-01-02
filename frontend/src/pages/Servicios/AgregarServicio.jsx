import FormularioMarco from "../../common/components/FormularioMarco.jsx";
import InputGeneric from "../../common/components/InputGeneric.jsx";
import Button from "../../common/components/Button";
import useAltaServiciosForm from "./hooks/useAltaServiciosForm.js";

export default function AgregarServicio() {
  const { servicio, setServicio, agregarServicio, handleCancelar } =
    useAltaServiciosForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    agregarServicio();
  };

  return (
    <FormularioMarco titulo="Agregar Servicio">
      <form onSubmit={handleSubmit}>
        <InputGeneric
          value={servicio}
          onChange={(e) => setServicio(e.target.value)}
          requerido={true}
          placeholder="Agregar nombre del servicio"
          icono="bi-gear"
        />
        {/* Botones */}
        <div className="flex justify-between mt-4">
          <Button variant="secondary" type="button" onClick={handleCancelar}>
            Cerrar
          </Button>

          <Button
            variant="primary"
            type="submit"
            disabled={!servicio.trim()}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Agregar
          </Button>
        </div>
      </form>
    </FormularioMarco>
  );
}
