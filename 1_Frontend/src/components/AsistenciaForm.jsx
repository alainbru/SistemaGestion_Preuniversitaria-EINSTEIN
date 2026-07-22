import { useEffect, useState } from "react";
import { registrarAsistencia, actualizarAsistencia } from "../api/asistenciaApi";
import { listarEstudiantes } from "../api/estudianteApi";
import { listarGrupos } from "../api/grupoApi";

function AsistenciaForm({ cerrarFormulario, actualizarLista, asistenciaEditar }) {
  const [datos, setDatos] = useState({
    fecha: "",
    estado_asistencia: "Presente",
    id_estudiante: "",
    id_grupo: "",
  });

  const [estudiantes, setEstudiantes] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    cargarDatos();
  }, []);

  useEffect(() => {
    if (asistenciaEditar) {
      setDatos({
        fecha: asistenciaEditar.fecha || "",
        estado_asistencia: asistenciaEditar.estado_asistencia || "Presente",
        id_estudiante: asistenciaEditar.id_estudiante || "",
        id_grupo: asistenciaEditar.id_grupo || "",
      });
    }
  }, [asistenciaEditar]);

  const cargarDatos = async () => {
    try {
      const [estudiantesRespuesta, gruposRespuesta] = await Promise.all([
        listarEstudiantes(),
        listarGrupos(),
      ]);

      setEstudiantes(estudiantesRespuesta.data);
      setGrupos(gruposRespuesta.data);
    } catch (error) {
      console.log(error);
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
      console.log(error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <form onSubmit={guardar}>
      <h2>{asistenciaEditar ? "Editar Asistencia" : "Registrar Asistencia"}</h2>

      <label>Fecha</label>
      <input
        type="date"
        name="fecha"
        value={datos.fecha}
        onChange={handleChange}
        required
      />

      <select
        name="id_estudiante"
        value={datos.id_estudiante}
        onChange={handleChange}
        required
      >
        <option value="">Seleccione estudiante</option>
        {estudiantes.map((e) => (
          <option key={e.id_estudiante} value={e.id_estudiante}>
            {e.nombres} {e.apellidos}
          </option>
        ))}
      </select>

      <select
        name="id_grupo"
        value={datos.id_grupo}
        onChange={handleChange}
        required
      >
        <option value="">Seleccione grupo</option>
        {grupos.map((g) => (
          <option key={g.id_grupo} value={g.id_grupo}>
            {g.nombre_grupo} - {g.turno}
          </option>
        ))}
      </select>

      <select
        name="estado_asistencia"
        value={datos.estado_asistencia}
        onChange={handleChange}
      >
        <option value="Presente">Presente</option>
        <option value="Falta">Falta</option>
        <option value="Tardanza">Tardanza</option>
      </select>

      <button disabled={cargando}>
        {cargando ? "Guardando..." : "Guardar"}
      </button>

      <button type="button" onClick={cerrarFormulario}>
        Cancelar
      </button>
    </form>
  );
}

export default AsistenciaForm;