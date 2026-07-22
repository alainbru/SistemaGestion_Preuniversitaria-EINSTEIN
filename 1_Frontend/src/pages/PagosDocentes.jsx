import { useCallback, useEffect, useState } from "react";
import Layout from "../components/Layout";
import Modal from "../components/Modal";
import PagoDocenteForm from "../components/PagoDocenteForm";
import { listarPagosDocente } from "../api/pagoDocenteApi";
import "../styles/Pagos.css";

function PagosDocentes() {
  const [pagos, setPagos] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [pagoEditar, setPagoEditar] = useState(null);

  const cargarPagos = useCallback(async () => {
    try {
      const respuesta = await listarPagosDocente();
      setPagos(respuesta.data || []);
    } catch (error) {
      console.error("Error al cargar pagos de docentes:", error);
    }
  }, []);

  useEffect(() => {
    cargarPagos();
  }, [cargarPagos]);

  const handleNuevoPago = () => {
    setPagoEditar(null);
    setMostrarFormulario(true);
  };

  const handleEditar = (pago) => {
    setPagoEditar(pago);
    setMostrarFormulario(true);
  };

  const handleCerrarFormulario = () => {
    setMostrarFormulario(false);
    setPagoEditar(null);
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return "-";
    return String(fecha).split("T")[0];
  };

  return (
    <Layout>
      <div className="page-header">
        <div>
          <h1>👨‍🏫 Pagos de Docentes</h1>
          <p>Registro y control de honorarios y pagos al personal docente.</p>
        </div>
      </div>

      <div className="barra-acciones">
        <button className="btn-nuevo" onClick={handleNuevoPago}>
          + Nuevo pago docente
        </button>
      </div>

      <div className="card">
        <table className="tabla">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Docente</th>
              <th>Concepto</th>
              <th>Monto</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {pagos.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                  No hay pagos de docentes registrados.
                </td>
              </tr>
            ) : (
              pagos.map((p) => (
                <tr key={p.id_pago_docente}>
                  <td>{formatearFecha(p.fecha_pago)}</td>
                  <td>
                    <strong>{p.docente || "-"}</strong>
                  </td>
                  <td>{p.concepto}</td>
                  <td>
                    <strong>S/. {Number(p.monto).toFixed(2)}</strong>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        p.estado === "Pagado" ? "badge-activo" : "badge-pendiente"
                      }`}
                    >
                      {p.estado === "Pagado" ? "🟢 Pagado" : "🟡 Pendiente"}
                    </span>
                  </td>
                  <td className="acciones-tabla">
                    <button
                      className="btn-edit"
                      onClick={() => handleEditar(p)}
                      title="Editar Pago"
                    >
                      ✏️
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
          <PagoDocenteForm
            cerrarFormulario={handleCerrarFormulario}
            actualizarLista={cargarPagos}
            pagoEditar={pagoEditar}
          />
        </Modal>
      )}
    </Layout>
  );
}

export default PagosDocentes;