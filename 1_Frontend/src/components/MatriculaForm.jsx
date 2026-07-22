import { useEffect, useState } from "react";
import {
  registrarMatricula,
  actualizarMatricula,
} from "../api/matriculaApi";
import { listarEstudiantes } from "../api/estudianteApi";
import { listarCiclos } from "../api/cicloApi";
import { listarGrupos } from "../api/grupoApi";

import "../styles/EstudianteForm.css";

const MATRICULA_INICIAL = {
  fecha_matricula: new Date().toISOString().split("T")[0],
  fecha_inicio: "",
  fecha_fin: "",
  id_estudiante: "",
  id_ciclo: "",
  id_grupo: "",
};

// Función auxiliar para asegurar el formato YYYY-MM-DD en inputs tipo date
const formatearFecha = (fecha) => {
  if (!fecha) return "";
  return String(fecha).split("T")[0];
};

function MatriculaForm({ cerrarFormulario, actualizarLista, matriculaEditar }) {
  const [datos, setDatos] = useState(MATRICULA_INICIAL);
  const [estudiantes, setEstudiantes] = useState([]);
  const [ciclos, setCiclos] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  // Cargar las opciones de los selectores al montar el componente
  useEffect(() => {
    const cargarCatalogos = async () => {
      try {
        const [resEstudiantes, resCiclos, resGrupos] = await Promise.all([
          listarEstudiantes(),
          listarCiclos(),
          listarGrupos(),
        ]);

        setEstudiantes(resEstudiantes.data || []);
        setCiclos(resCiclos.data || []);
        setGrupos(resGrupos.data || []);
      } catch (err) {
        console.error("Error al cargar datos del formulario:", err);
        setError("No se pudieron cargar los datos de los desplegables.");
      }
    };

    cargarCatalogos();
  }, []);

  // Llenar los datos si es edición o reiniciar si es nuevo
  useEffect(() => {
    if (matriculaEditar) {
      setDatos({
        fecha_matricula: formatearFecha(matriculaEditar.fecha_matricula),
        fecha_inicio: formatearFecha(matriculaEditar.fecha_inicio),
        fecha_fin: formatearFecha(matriculaEditar.fecha_fin),
        id_estudiante: matriculaEditar.id_estudiante ?? "",
        id_ciclo: matriculaEditar.id_ciclo ?? "",
        id_grupo: matriculaEditar.id_grupo ?? "",
      });
    } else {
      setDatos(MATRICULA_INICIAL);
    }
  }, [matriculaEditar]);

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
      if (matriculaEditar) {
        await actualizarMatricula(matriculaEditar.id_matricula, datos);
      } else {
        await registrarMatricula(datos);
      }

      await actualizarLista();
      if (cerrarFormulario) cerrarFormulario();
    } catch (err) {
      console.error("Error al guardar matrícula:", err);
      setError(
        err.response?.data?.error ||
          err.response?.data?.mensaje ||
          "Error al guardar matrícula"
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <form className="formulario" onSubmit={handleGuardar}>
      <h2>
        {matriculaEditar ? "✏️ Editar Matrícula" : "📝 Nueva Matrícula"}
      </h2>

      {error && <p className="error">{error}</p>}

      <label>Fecha de matrícula</label>
      <input
        type="date"
        name="fecha_matricula"
        value={datos.fecha_matricula}
        onChange={handleChange}
        required
      />

      <label>Fecha inicio</label>
      <input
        type="date"
        name="fecha_inicio"
        value={datos.fecha_inicio}
        onChange={handleChange}
        required
      />

      <label>Fecha fin</label>
      <input
        type="date"
        name="fecha_fin"
        value={datos.fecha_fin}
        onChange={handleChange}
        required
      />

      {/* Seleccionar Estudiante */}
      <label>Seleccionar Estudiante</label>
      <select
        name="id_estudiante"
        value={datos.id_estudiante}
        onChange={handleChange}
        required
      >
        <option value="">-- Seleccione estudiante --</option>
        {estudiantes.map((e) => (
          <option key={e.id_estudiante} value={e.id_estudiante}>
            {e.DNI} - {e.nombres} {e.apellidos}
          </option>
        ))}
      </select>

      {/* Seleccionar Ciclo */}
      <label>Ciclo Académico</label>
      <select
        name="id_ciclo"
        value={datos.id_ciclo}
        onChange={handleChange}
        required
      >
        <option value="">-- Seleccione ciclo --</option>
        {ciclos.map((c) => (
          <option key={c.id_ciclo} value={c.id_ciclo}>
            {c.nombre}
          </option>
        ))}
      </select>

      {/* Seleccionar Grupo */}
      <label>Programa / Grupo</label>
      <select
        name="id_grupo"
        value={datos.id_grupo}
        onChange={handleChange}
        required
      >
        <option value="">-- Seleccione grupo --</option>
        {grupos.map((g) => (
          <option key={g.id_grupo} value={g.id_grupo}>
            {g.nombre_grupo} - {g.turno}
          </option>
        ))}
      </select>

      {/* Botones de acción estandarizados */}
      <div className="botones-form">
        <button className="btn-guardar" type="submit" disabled={cargando}>
          {cargando ? "Guardando..." : "Guardar"}
        </button>

        {cerrarFormulario && (
          <button
            className="btn-cancelar"
            type="button"
            onClick={cerrarFormulario}
            disabled={cargando}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default MatriculaForm;