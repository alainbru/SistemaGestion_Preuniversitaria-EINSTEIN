import { useCallback, useEffect, useState } from "react";
import Layout from "../components/Layout";
import EstudianteForm from "../components/EstudianteForm";
import {
  listarEstudiantes,
  buscarEstudiante,
  eliminarEstudiante,
} from "../api/estudianteApi";

import "../styles/Estudiantes.css";

function Estudiantes() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [estudianteEditar, setEstudianteEditar] = useState(null);
  const [estudianteConsultar, setEstudianteConsultar] = useState(null);

  const cargarEstudiantes = useCallback(async () => {
    try {
      const query = busqueda.trim();
      const respuesta = query
        ? await buscarEstudiante(query)
        : await listarEstudiantes();

      setEstudiantes(respuesta.data || []);
    } catch (error) {
      console.error("Error al cargar estudiantes:", error);
    }
  }, [busqueda]);

  useEffect(() => {
    cargarEstudiantes();
  }, [cargarEstudiantes]);

  const handleNuevoEstudiante = () => {
    setEstudianteEditar(null);
    setMostrarFormulario(true);
  };

  const handleEditar = (estudiante) => {
    setEstudianteEditar(estudiante);
    setMostrarFormulario(true);
  };

  const handleCerrarFormulario = () => {
    setMostrarFormulario(false);
    setEstudianteEditar(null);
  };

  const handleEliminar = async (id) => {
    const confirmar = window.confirm(
      "¿Desea eliminar este estudiante?"
    );

    if (!confirmar) return;

    try {
      await eliminarEstudiante(id);
      cargarEstudiantes();
    } catch (error) {
      console.error("Error al eliminar estudiante:", error);
    }
  };

  return (
    <Layout>
      <div className="page-header">
        <div>
          <h1>Gestión de Estudiantes</h1>
          <p>
            Registro, consulta y administración de estudiantes.
          </p>
        </div>

        <button
          className="btn-primary"
          onClick={handleNuevoEstudiante}
        >
          ➕ Nuevo estudiante
        </button>
      </div>

      <div className="card">
        <div className="table-toolbar">
          <input
            className="input-search"
            type="text"
            placeholder="Buscar por DNI, nombre o apellido..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <table className="tabla">
          <thead>
            <tr>
              <th>DNI</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {estudiantes.map((e) => (
              <tr key={e.id_estudiante}>
                <td>{e.DNI}</td>
                <td>
                  <strong>
                    {e.nombres} {e.apellidos}
                  </strong>
                </td>
                <td>{e.correo}</td>
                <td>{e.telefono}</td>
                <td>
                  <span
                    className={
                      e.estado_estudiante === "ACTIVO"
                        ? "badge badge-success"
                        : "badge badge-danger"
                    }
                  >
                    {e.estado_estudiante === "ACTIVO"
                      ? "Activo"
                      : "Inactivo"}
                  </span>
                </td>

                <td className="acciones">

                  <button
                    className="icon-btn edit"
                    onClick={() => handleEditar(e)}
                    title="Editar"
                  >
                    ✏️
                  </button>

                  <button
                    className="icon-btn view"
                    onClick={() => setEstudianteConsultar(e)}
                    title="Ver"
                  >
                    👁
                  </button>

                  <button
                    className="icon-btn delete"
                    onClick={() => handleEliminar(e.id_estudiante)}
                    title="Retirar"
                  >
                    🗑
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {mostrarFormulario && (
        <EstudianteForm
          cerrarFormulario={handleCerrarFormulario}
          actualizarLista={cargarEstudiantes}
          estudianteEditar={estudianteEditar}
        />
      )}

      {estudianteConsultar && (
        <div className="modal-fondo">
          <div className="modal-contenido">
            <h2>Información del estudiante</h2>
            <p>
              <strong>DNI:</strong> {estudianteConsultar.DNI}
            </p>
            <p>
              <strong>Nombre:</strong> {estudianteConsultar.nombres}{" "}
              {estudianteConsultar.apellidos}
            </p>
            <p>
              <strong>Correo:</strong> {estudianteConsultar.correo}
            </p>
            <p>
              <strong>Teléfono:</strong> {estudianteConsultar.telefono}
            </p>
            <p>
              <strong>Dirección:</strong> {estudianteConsultar.direccion}
            </p>
            <p>
              <strong>Estado:</strong> {estudianteConsultar.estado_estudiante}
            </p>

            <button
              className="btn-primary"
              onClick={() => setEstudianteConsultar(null)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Estudiantes;