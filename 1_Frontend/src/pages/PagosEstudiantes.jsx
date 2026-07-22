import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import PagoEstudianteForm from "../components/PagoEstudianteForm";
import { listarPagosEstudiante } from "../api/pagoEstudianteApi";

function PagosEstudiantes() {
  const [pagos, setPagos] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [pagoEditar, setPagoEditar] = useState(null);

  useEffect(() => {
    cargarPagos();
  }, []);

  const cargarPagos = async () => {
    try {
      const respuesta = await listarPagosEstudiante();
      setPagos(respuesta.data);
    } catch (error) {
      console.log(error);
    }
  };

  const editar = (pago) => {
    setPagoEditar(pago);
    setMostrarFormulario(true);
  };

  const abrirNuevoFormulario = () => {
    setPagoEditar(null);
    setMostrarFormulario(true);
  };

  const cerrarFormulario = () => {
    setMostrarFormulario(false);
    setPagoEditar(null);
  };

  return (
    <Layout>
      <h1>Pagos de Estudiantes</h1>

      <button onClick={abrirNuevoFormulario}>
        + Nuevo pago estudiante
      </button>

      {mostrarFormulario && (
        <PagoEstudianteForm
          cerrarFormulario={cerrarFormulario}
          actualizarLista={cargarPagos}
          pagoEditar={pagoEditar}
        />
      )}

      <table border="1">
        <thead>
          <tr>
            <th>Fecha pago</th>
            <th>Monto</th>
            <th>Concepto</th>
            <th>Periodo</th>
            <th>Inicio</th>
            <th>Fin</th>
            <th>Estado</th>
            <th>Estudiante</th>
            <th>Acción</th>
          </tr>
        </thead>

        <tbody>
          {pagos.map((p) => (
            <tr key={p.id_pago}>
              <td>{p.fecha_pago}</td>
              <td>S/. {p.monto}</td>
              <td>{p.concepto}</td>
              <td>{p.periodo_pagado}</td>
              <td>{p.fecha_inicio_pago}</td>
              <td>{p.fecha_fin_pago}</td>
              <td>{p.estado}</td>
             <td>
                    {p.estudiante}
            </td>
              <td>
                <button onClick={() => editar(p)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}

export default PagosEstudiantes;