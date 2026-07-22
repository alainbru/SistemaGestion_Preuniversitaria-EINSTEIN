import { useEffect, useState } from "react";
import { registrarDocente, actualizarDocente } from "../api/docenteApi";
import "../styles/EstudianteForm.css";

const DOCENTE_INICIAL = {
  DNI: "",
  nombres: "",
  apellidos: "",
  especialidad: "",
  telefono: "",
  correo: "",
};

function DocenteForm({ cerrarFormulario, actualizarLista, docenteEditar }) {
  const [datos, setDatos] = useState(DOCENTE_INICIAL);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (docenteEditar) {
      setDatos({
        DNI: docenteEditar.DNI ?? "",
        nombres: docenteEditar.nombres ?? "",
        apellidos: docenteEditar.apellidos ?? "",
        especialidad: docenteEditar.especialidad ?? "",
        telefono: docenteEditar.telefono ?? "",
        correo: docenteEditar.correo ?? "",
      });
    } else {
      setDatos(DOCENTE_INICIAL);
    }
  }, [docenteEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);

    try {
      if (docenteEditar) {
        await actualizarDocente(docenteEditar.id_docente, datos);
      } else {
        await registrarDocente(datos);
      }

      await actualizarLista();
      cerrarFormulario();
    } catch (err) {
      console.error("Error al guardar docente:", err);
      setError(
        err.response?.data?.error ||
          err.response?.data?.mensaje ||
          "Error al guardar docente"
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <form className="formulario" onSubmit={handleGuardar}>
      <h2>
        {docenteEditar ? "✏️ Editar Docente" : "👨‍🏫 Registrar Docente"}
      </h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="text"
        name="DNI"
        placeholder="DNI"
        value={datos.DNI}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="nombres"
        placeholder="Nombres"
        value={datos.nombres}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="apellidos"
        placeholder="Apellidos"
        value={datos.apellidos}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="especialidad"
        placeholder="Especialidad"
        value={datos.especialidad}
        onChange={handleChange}
      />

      <input
        type="text"
        name="telefono"
        placeholder="Teléfono"
        value={datos.telefono}
        onChange={handleChange}
      />

      <input
        type="email"
        name="correo"
        placeholder="Correo"
        value={datos.correo}
        onChange={handleChange}
      />

      <div className="botones-form">
        <button className="btn-guardar" type="submit" disabled={cargando}>
          {cargando ? "Guardando..." : "Guardar"}
        </button>

        <button
          className="btn-cancelar"
          type="button"
          onClick={cerrarFormulario}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default DocenteForm;