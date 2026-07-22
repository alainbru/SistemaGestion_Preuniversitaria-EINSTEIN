import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import PagoDocenteForm from "../components/PagoDocenteForm";
import { listarPagosDocente } from "../api/pagoDocenteApi";
import { listarDocentes } from "../api/docenteApi";

function PagosDocentes() {
  const [pagos, setPagos] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [pagoEditar, setPagoEditar] = useState(null);

  useEffect(() => {
    cargarPagos();
  }, []);

  const cargarPagos = async () => {
    try {
      const respuesta = await listarPagosDocente();
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
      <h1>Pagos de Docentes</h1>

      <button onClick={abrirNuevoFormulario}>
        + Nuevo pago docente
      </button>

      {mostrarFormulario && (
        <PagoDocenteForm
          cerrarFormulario={cerrarFormulario}
          actualizarLista={cargarPagos}
          pagoEditar={pagoEditar}
        />
      )}

      <table border="1">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Monto</th>
            <th>Concepto</th>
            <th>Estado</th>
            <th>Docente</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
            {pagos.map((p) => (
                <tr key={p.id_pago_docente}>
                <td>{p.fecha_pago}</td>
                <td>S/. {p.monto}</td>
                <td>{p.concepto}</td>
                <td>{p.estado}</td>
                <td>{p.docente}</td>
                <td>
                    <button onClick={() => editar(p)}>
                    Editar
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
      </table>
    </Layout>
  );
}

export default PagosDocentes;