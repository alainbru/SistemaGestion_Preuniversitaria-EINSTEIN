import { useCallback, useEffect, useState } from "react";
import Layout from "../components/Layout";
import DocenteForm from "../components/DocenteForm";
import Modal from "../components/Modal";
import {
  obtenerDocentes,
  buscarDocente,
  eliminarDocente,
} from "../api/docenteApi";

import "../styles/modal.css";
import "../styles/Docentes.css";

function Docentes() {
  const [docentes, setDocentes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [docenteEditar, setDocenteEditar] = useState(null);
  const [docenteConsultar, setDocenteConsultar] = useState(null);

  const cargarDocentes = useCallback(async () => {
    try {
      const query = busqueda.trim();
      const respuesta = query
        ? await buscarDocente(query)
        : await obtenerDocentes();

      setDocentes(respuesta.data || []);
    } catch (error) {
      console.error("Error al cargar docentes:", error);
    }
  }, [busqueda]);

  useEffect(() => {
    cargarDocentes();
  }, [cargarDocentes]);

  const handleNuevoDocente = () => {
    setDocenteEditar(null);
    setMostrarFormulario(true);
  };

  const handleEditar = (docente) => {
    setDocenteEditar(docente);
    setMostrarFormulario(true);
  };

  const handleCerrarFormulario = () => {
    setMostrarFormulario(false);
    setDocenteEditar(null);
  };

  const handleEliminar = async (id) => {
    const confirmar = window.confirm(
      "¿Desea eliminar este docente?"
    );

    if (!confirmar) return;

    try {
      await eliminarDocente(id);
      cargarDocentes();
    } catch (error) {
      console.error("Error al eliminar docente:", error);
    }
  };

  return (
    <Layout>
      <div className="page-header">
        <div>
          <h1>👨‍🏫 Gestión de Docentes</h1>
          <p>Administración de los docentes de la academia.</p>
        </div>
      </div>

      <div className="barra-acciones">
        <input
          type="text"
          placeholder="🔍 Buscar por DNI o nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <button className="btn-nuevo" onClick={handleNuevoDocente}>
          + Nuevo Docente
        </button>
      </div>

      <div className="card">
        <table className="tabla">
          <thead>
            <tr>
              <th>DNI</th>
              <th>Nombre Completo</th>
              <th>Especialidad</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {docentes.map((d) => (
              <tr key={d.id_docente}>
                <td>{d.DNI}</td>
                <td>
                  <strong>
                    {d.nombres} {d.apellidos}
                  </strong>
                </td>
                <td>{d.especialidad}</td>
                <td>{d.correo}</td>
                <td>{d.telefono}</td>
             <td className="acciones-tabla">

            <button
                className="btn-edit"
                onClick={() => handleEditar(d)}
                title="Editar"
            >
                ✏️
            </button>

            <button
                className="btn-view"
                onClick={() => setDocenteConsultar(d)}
                title="Consultar"
            >
                👁️
            </button>

            <button
                className="btn-delete"
                onClick={() => handleEliminar(d.id_docente)}
                title="Eliminar"
            >
                🗑️
            </button>

        </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para Formulario (Crear/Editar) */}
    {mostrarFormulario && (

        <Modal cerrar={handleCerrarFormulario}>

            <DocenteForm

                cerrarFormulario={handleCerrarFormulario}

                actualizarLista={cargarDocentes}

                docenteEditar={docenteEditar}

            />

        </Modal>

    )}

      {/* Modal de Detalle */}
      {docenteConsultar && (
        <Modal cerrar={() => setDocenteConsultar(null)}>
          <div className="detalle-card">
            <h2>Información del Docente</h2>
            <p>
              <strong>DNI:</strong> {docenteConsultar.DNI}
            </p>
            <p>
              <strong>Nombre:</strong> {docenteConsultar.nombres}{" "}
              {docenteConsultar.apellidos}
            </p>
            <p>
              <strong>Especialidad:</strong> {docenteConsultar.especialidad}
            </p>
            <p>
              <strong>Correo:</strong> {docenteConsultar.correo}
            </p>
            <p>
              <strong>Teléfono:</strong> {docenteConsultar.telefono}
            </p>

            <button
              className="btn-cerrar"
              onClick={() => setDocenteConsultar(null)}
            >
              Cerrar
            </button>
          </div>
        </Modal>
      )}
    </Layout>
  );
}

export default Docentes;