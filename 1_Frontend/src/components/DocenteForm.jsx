import { useEffect, useState } from "react";
import { registrarDocente, actualizarDocente } from "../api/docenteApi";
import "../styles/EstudianteForm.css";
import Modal from "./Modal";


function DocenteForm({ cerrarFormulario, actualizarLista, docenteEditar }) {
  const [datos, setDatos] = useState({
    DNI: "",
    nombres: "",
    apellidos: "",
    especialidad: "",
    telefono: "",
    correo: "",
  });

  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (docenteEditar) {
      setDatos({
        DNI: docenteEditar.DNI || "",
        nombres: docenteEditar.nombres || "",
        apellidos: docenteEditar.apellidos || "",
        especialidad: docenteEditar.especialidad || "",
        telefono: docenteEditar.telefono || "",
        correo: docenteEditar.correo || "",
      });
    }
  }, [docenteEditar]);

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const guardarDocente = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);

    try {
      if (docenteEditar) {
        await actualizarDocente(docenteEditar.id_docente, datos);
      } else {
        await registrarDocente(datos);
      }

      alert(
        docenteEditar
          ? "Docente actualizado correctamente"
          : "Docente registrado correctamente"
      );

      actualizarLista();
      cerrarFormulario();
    } catch (err) {
      console.error(err);
      const mensaje =
        err.response?.data?.error ||
        err.response?.data?.mensaje ||
        err.message;

      setError(mensaje);
      alert(mensaje);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="modal-fondo">
      <div className="modal-contenido">
        <form onSubmit={guardarDocente}>
          <h2>{docenteEditar ? "Editar Docente" : "Nuevo Docente"}</h2>

          {error && <div style={{ color: "red" }}>{error}</div>}

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

export default DocenteForm;