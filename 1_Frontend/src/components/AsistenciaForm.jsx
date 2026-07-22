import { useEffect, useState } from "react";
import {
  registrarAsistencia,
  actualizarAsistencia,
} from "../api/asistenciaApi";
import { listarEstudiantes } from "../api/estudianteApi";
import { listarGrupos } from "../api/grupoApi";

const ASISTENCIA_INICIAL = {
  fecha: new Date().toISOString().split("T")[0],
  id_estudiante: "",
  id_grupo: "",
  estado_asistencia: "Presente",
};

// Auxiliar para formatear fecha YYYY-MM-DD en los inputs tipo date
const formatearFecha = (fecha) => {
  if (!fecha) return "";
  return String(fecha).split("T")[0];
};

function AsistenciaForm({ cerrarFormulario, actualizarLista, asistenciaEditar }) {
  const [datos, setDatos] = useState(ASISTENCIA_INICIAL);
  const [estudiantes, setEstudiantes] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    cargarSelects();
  }, []);

  useEffect(() => {
    if (asistenciaEditar) {
      setDatos({
        fecha: formatearFecha(asistenciaEditar.fecha),
        id_estudiante: asistenciaEditar.id_estudiante || "",
        id_grupo: asistenciaEditar.id_grupo || "",
        estado_asistencia: asistenciaEditar.estado_asistencia || "Presente",
      });
    } else {
      setDatos(ASISTENCIA_INICIAL);
    }
  }, [asistenciaEditar]);

  const cargarSelects = async () => {
    try {
      const [resEstudiantes, resGrupos] = await Promise.all([
        listarEstudiantes(),
        listarGrupos(),
      ]);
      setEstudiantes(resEstudiantes.data || []);
      setGrupos(resGrupos.data || []);
    } catch (error) {
      console.error("Error al cargar listas auxiliares:", error);
    }
  };

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const guardar = async (e) => {
    e.preventDefault();
    setCargando(true);

    try {
      if (asistenciaEditar) {
        await actualizarAsistencia(asistenciaEditar.id_asistencia, {
          fecha: datos.fecha,
          id_estudiante: datos.id_estudiante,
          id_grupo: datos.id_grupo,
          estado_asistencia: datos.estado_asistencia,
        });
      } else {
        await registrarAsistencia(datos);
      }

      alert(
        asistenciaEditar
          ? "Asistencia actualizada correctamente"
          : "Asistencia registrada correctamente"
      );

      actualizarLista();
      cerrarFormulario();
    } catch (error) {
      console.error("Error al guardar asistencia:", error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <form className="formulario" onSubmit={guardar}>
      <h2>
        {asistenciaEditar ? "✏️ Editar Asistencia" : "📋 Registrar Asistencia"}
      </h2>

      <label>Fecha</label>
      <input
        type="date"
        name="fecha"
        value={datos.fecha}
        onChange={handleChange}
        required
      />

      <label>Estudiante</label>
      <select
        name="id_estudiante"
        value={datos.id_estudiante}
        onChange={handleChange}
        required
      >
        <option value="">-- Seleccione estudiante --</option>
        {estudiantes.map((e) => (
          <option key={e.id_estudiante} value={e.id_estudiante}>
            {e.nombres} {e.apellidos}
          </option>
        ))}
      </select>

      <label>Grupo</label>
      <select
        name="id_grupo"
        value={datos.id_grupo}
        onChange={handleChange}
        required
      >
        <option value="">-- Seleccione grupo --</option>
        {grupos.map((g) => (
          <option key={g.id_grupo} value={g.id_grupo}>
            {g.nombre_grupo} {g.turno ? `- ${g.turno}` : ""}
          </option>
        ))}
      </select>

      <label>Estado</label>
      <select
        name="estado_asistencia"
        value={datos.estado_asistencia}
        onChange={handleChange}
      >
        <option value="Presente">Presente</option>
        <option value="Falta">Falta</option>
        <option value="Tardanza">Tardanza</option>
      </select>

      <div className="botones-form">
        <button className="btn-guardar" disabled={cargando}>
          {cargando ? "Guardando..." : "Guardar"}
        </button>

        <button
          type="button"
          className="btn-cancelar"
          onClick={cerrarFormulario}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default AsistenciaForm;