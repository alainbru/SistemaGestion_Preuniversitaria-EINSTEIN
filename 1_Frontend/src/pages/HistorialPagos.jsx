import { useCallback, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { listarHistorialPagos } from "../api/historialPagoApi";
import "../styles/Pagos.css";

function HistorialPagos() {
  const [pagos, setPagos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cargar = useCallback(async () => {
    try {
      setCargando(true);
      const respuesta = await listarHistorialPagos();
      setPagos(respuesta.data || []);
    } catch (error) {
      console.error("Error al cargar historial de pagos:", error);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  const formatearFecha = (fecha) => {
    if (!fecha) return "-";
    return String(fecha).split("T")[0];
  };

  const formatearMonto = (monto) => {
    const valor = parseFloat(monto) || 0;
    return `S/. ${valor.toFixed(2)}`;
  };

  return (
    <Layout>
      <div className="page-header">
        <div>
          <h1>💳 Historial de Pagos</h1>
          <p>Registro consolidado y consulta de movimientos de pagos.</p>
        </div>
      </div>

      <div className="card">
        <table className="tabla">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Estudiante</th>
              <th>Concepto</th>
              <th>Periodo</th>
              <th>Monto</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>

          <tbody>
            {cargando ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                  Cargando historial de pagos...
                </td>
              </tr>
            ) : pagos.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                  No hay registros de pagos en el historial.
                </td>
              </tr>
            ) : (
              pagos.map((p) => (
                <tr key={p.id_pago}>
                  <td>{formatearFecha(p.fecha_pago)}</td>
                  <td>
                    <strong>{p.estudiante || "-"}</strong>
                  </td>
                  <td>{p.concepto || "-"}</td>
                  <td>{p.periodo_pagado || "-"}</td>
                  <td>
                    <strong>{formatearMonto(p.monto)}</strong>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        p.estado === "Cancelado"
                          ? "badge-activo"
                          : "badge-pendiente"
                      }`}
                    >
                      {p.estado === "Cancelado" ? "🟢 Cancelado" : "🟡 Pendiente"}
                    </span>
                  </td>
                  <td className="acciones-tabla">
                    <button className="btn-view" title="Ver detalle">
                      👁️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default HistorialPagos;