import FormularioMarco from "../../common/components/FormularioMarco.jsx";
import SelectGeneric from "../../common/components/SelectGeneric.jsx";
import InputGeneric from "../../common/components/InputGeneric.jsx";
import Button from "../../common/components/Button";
import useEditarInsumosForm from "./hooks/useEditarInsumoForm.js";

export default function EditarInsumo() { 
  const {
    insumo,
    setInsumo,
    insumos,
    modelos,
    modeloSeleccionado,
    setModeloSeleccionado,
    insumoSeleccionado,
    setInsumoSeleccionado,
    handleSubmit,
    handleCancelar,
  } = useEditarInsumosForm();

  return (
    <FormularioMarco titulo="Editar Insumo">
      <form onSubmit={handleSubmit} className="space-y-4">

        <SelectGeneric
          generic={modelos}
          value="Seleccione un modelo"
          seleccionado={modeloSeleccionado}
          setSeleccionado={setModeloSeleccionado}
          icono="bi-layers"
          labelKey="modelo"
        />

        <SelectGeneric
          generic={insumos}
          value="Seleccione el insumo a editar"
          seleccionado={insumoSeleccionado}
          setSeleccionado={setInsumoSeleccionado}
          icono="bi-droplet"
          labelKey="insumo"
        />

        <InputGeneric
          value={insumo}
          onChange={(e) => setInsumo(e.target.value)}
          requerido
          icono="bi-droplet-fill"
          placeholder="Nuevo nombre del insumo"
        />

        <div className="flex justify-between mt-4">
          <Button variant="secondary" type="button" onClick={handleCancelar}>
            Cerrar
          </Button>

          <Button
            variant="warning"
            type="submit"
            disabled={!insumoSeleccionado || !insumo.trim()}
          >
            Editar
          </Button>
        </div>
      </form>
    </FormularioMarco>
  );
}