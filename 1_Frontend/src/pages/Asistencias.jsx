import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import AsistenciaForm from "../components/AsistenciaForm";
import {
  listarAsistencias,
  eliminarAsistencia,
} from "../api/asistenciaApi";

function Asistencias() {
  const [asistencias, setAsistencias] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [asistenciaEditar, setAsistenciaEditar] = useState(null);

  useEffect(() => {
    cargarAsistencias();
  }, []);

  const cargarAsistencias = async () => {
    try {
      const respuesta = await listarAsistencias();
      setAsistencias(respuesta.data);
    } catch (error) {
      console.log(error);
    }
  };

  const eliminar = async (id) => {
    const confirmar = window.confirm(
      "¿Desea eliminar esta asistencia?"
    );

    if (!confirmar) return;

    try {
      await eliminarAsistencia(id);
      cargarAsistencias();
    } catch (error) {
      console.log(error);
    }
  };

  const editar = (asistencia) => {
    setAsistenciaEditar(asistencia);
    setMostrarFormulario(true);
  };

  const abrirNuevoFormulario = () => {
    setAsistenciaEditar(null);
    setMostrarFormulario(true);
  };

  const cerrarFormulario = () => {
    setMostrarFormulario(false);
    setAsistenciaEditar(null);
  };

  return (
    <Layout>
      <h1>Gestión de Asistencias</h1>

      <button onClick={abrirNuevoFormulario}>
        + Registrar asistencia
      </button>

      {mostrarFormulario && (
        <AsistenciaForm
          cerrarFormulario={cerrarFormulario}
          actualizarLista={cargarAsistencias}
          asistenciaEditar={asistenciaEditar}
        />
      )}

      <table border="1">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Estudiante</th>
            <th>Grupo</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>

        <tbody>
          {asistencias.map((a) => (
            <tr key={a.id_asistencia}>
              <td>{a.fecha}</td>
             <td>{a.estudiante}</td>
              <td>{a.nombre_grupo ? a.nombre_grupo : a.id_grupo}</td>
              <td>{a.estado_asistencia}</td>
              <td>
                <button onClick={() => editar(a)}>Editar</button>
                <button onClick={() => eliminar(a.id_asistencia)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}

export default Asistencias;