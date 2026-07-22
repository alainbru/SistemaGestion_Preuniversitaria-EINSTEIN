import { useCallback, useEffect, useState } from "react";
import Layout from "../components/Layout";
import Modal from "../components/Modal";
import AsistenciaForm from "../components/AsistenciaForm";
import { listarAsistencias, eliminarAsistencia } from "../api/asistenciaApi";
import "../styles/Pagos.css";

function Asistencias() {
  const [asistencias, setAsistencias] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [asistenciaEditar, setAsistenciaEditar] = useState(null);

  const cargarAsistencias = useCallback(async () => {
    try {
      const respuesta = await listarAsistencias();
      setAsistencias(respuesta.data || []);
    } catch (error) {
      console.error("Error al cargar asistencias:", error);
    }
  }, []);

  useEffect(() => {
    cargarAsistencias();
  }, [cargarAsistencias]);

  const handleNuevoRegistro = () => {
    setAsistenciaEditar(null);
    setMostrarFormulario(true);
  };

  const handleEditar = (asistencia) => {
    setAsistenciaEditar(asistencia);
    setMostrarFormulario(true);
  };

  const handleCerrarFormulario = () => {
    setMostrarFormulario(false);
    setAsistenciaEditar(null);
  };

  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Desea eliminar este registro de asistencia?");
    if (!confirmar) return;

    try {
      await eliminarAsistencia(id);
      cargarAsistencias();
    } catch (error) {
      console.error("Error al eliminar la asistencia:", error);
    }
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return "-";
    return String(fecha).split("T")[0];
  };

  return (
    <Layout>
      <div className="page-header">
        <div>
          <h1>📋 Gestión de Asistencias</h1>
          <p>Control e historial de asistencia diaria de los estudiantes por grupo.</p>
        </div>
      </div>

      <div className="barra-acciones">
        <button className="btn-nuevo" onClick={handleNuevoRegistro}>
          + Registrar asistencia
        </button>
      </div>

      <div className="card">
        <table className="tabla">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Estudiante</th>
              <th>Grupo</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {asistencias.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                  No hay registros de asistencia guardados.
                </td>
              </tr>
            ) : (
              asistencias.map((a) => (
                <tr key={a.id_asistencia}>
                  <td>{formatearFecha(a.fecha)}</td>
                  <td>
                    <strong>{a.estudiante || "-"}</strong>
                  </td>
                  <td>{a.nombre_grupo || a.id_grupo || "-"}</td>
                  <td>
                    <span
                      className={`badge ${
                        a.estado_asistencia === "Presente"
                          ? "badge-activo"
                          : a.estado_asistencia === "Falta"
                          ? "badge-inactivo"
                          : "badge-pendiente"
                      }`}
                    >
                      {a.estado_asistencia === "Presente"
                        ? "🟢 Presente"
                        : a.estado_asistencia === "Falta"
                        ? "🔴 Falta"
                        : "🟡 Tardanza"}
                    </span>
                  </td>
                  <td className="acciones-tabla">
                    <button
                      className="btn-edit"
                      onClick={() => handleEditar(a)}
                      title="Editar Asistencia"
                    >
                      ✏️
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleEliminar(a.id_asistencia)}
                      title="Eliminar Asistencia"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {mostrarFormulario && (
        <Modal cerrar={handleCerrarFormulario}>
          <AsistenciaForm
            cerrarFormulario={handleCerrarFormulario}
            actualizarLista={cargarAsistencias}
            asistenciaEditar={asistenciaEditar}
          />
        </Modal>
      )}
    </Layout>
  );
}

export default Asistencias;