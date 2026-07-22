import { useEffect, useState } from "react";
import {
  registrarEstudiante,
  actualizarEstudiante,
} from "../api/estudianteApi";


import "../styles/EstudianteForm.css";


const ESTADO_INICIAL = {
  DNI: "",
  nombres: "",
  apellidos: "",
  fecha_nacimiento: "",
  telefono: "",
  correo: "",
  direccion: "",
  estado_estudiante: "ACTIVO",
};

function EstudianteForm({
  cerrarFormulario,
  actualizarLista,
  estudianteEditar,
}) {
  const [datos, setDatos] = useState(ESTADO_INICIAL);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (estudianteEditar) {
      setDatos({
        DNI: estudianteEditar.DNI || "",
        nombres: estudianteEditar.nombres || "",
        apellidos: estudianteEditar.apellidos || "",
        // Limpia la fecha a formato YYYY-MM-DD para el input tipo date
        fecha_nacimiento: estudianteEditar.fecha_nacimiento
          ? estudianteEditar.fecha_nacimiento.split("T")[0]
          : "",
        telefono: estudianteEditar.telefono || "",
        correo: estudianteEditar.correo || "",
        direccion: estudianteEditar.direccion || "",
        estado_estudiante: estudianteEditar.estado_estudiante || "ACTIVO",
      });
    } else {
      setDatos(ESTADO_INICIAL);
    }
  }, [estudianteEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const guardarEstudiante = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);

    try {
      if (estudianteEditar) {
        await actualizarEstudiante(estudianteEditar.id_estudiante, datos);
      } else {
        await registrarEstudiante(datos);
      }

      // Cerrar formulario primero
      cerrarFormulario();
      
      // Luego actualizar la lista
      await actualizarLista();
    } catch (err) {
      console.error(err);
      const mensaje =
        err.response?.data?.error ||
        err.response?.data?.mensaje ||
        "Error al guardar estudiante";
      setError(mensaje);
      setCargando(false);
    }
  };

  return (
    <div className="modal-fondo">
      <div className="modal-contenido">
        <h2>
          {estudianteEditar ? "Editar Estudiante" : "Nuevo Estudiante"}
        </h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={guardarEstudiante}>
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

          <label htmlFor="fecha_nacimiento">Fecha nacimiento</label>
          <input
            id="fecha_nacimiento"
            type="date"
            name="fecha_nacimiento"
            value={datos.fecha_nacimiento}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            value={datos.telefono}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="correo"
            placeholder="Correo"
            value={datos.correo}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="direccion"
            placeholder="Dirección"
            value={datos.direccion}
            onChange={handleChange}
            required
          />

          <div>
            <button type="submit" disabled={cargando}>
              {cargando ? "Guardando..." : "Guardar"}
            </button>

            <button
              type="button"
              onClick={cerrarFormulario}
              disabled={cargando}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EstudianteForm;