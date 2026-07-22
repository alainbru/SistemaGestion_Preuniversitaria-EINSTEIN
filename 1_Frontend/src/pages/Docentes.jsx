import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import DocenteForm from "../components/DocenteForm";
import {
  listarDocentes,
  eliminarDocente,
  buscarDocente,
} from "../api/docenteApi";

function Docentes() {
  const [docentes, setDocentes] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [docenteEditar, setDocenteEditar] = useState(null);
  const [docenteConsultar, setDocenteConsultar] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  const location = useLocation();

  // Carga o busca docentes según el término ingresado
  const cargarDocentes = useCallback(async () => {
    try {
      const query = busqueda.trim();
      const respuesta = query
        ? await buscarDocente(query)
        : await listarDocentes();

      setDocentes(respuesta.data ?? []);
    } catch (error) {
      console.error("Error al obtener docentes:", error);
    }
  }, [busqueda]);

  // Carga inicial y reacción a la búsqueda dinámica
  useEffect(() => {
    cargarDocentes();
  }, [cargarDocentes]);

  // Cierra modales/formularios al cambiar de ruta
  useEffect(() => {
    setMostrarFormulario(false);
    setDocenteEditar(null);
    setDocenteConsultar(null);
  }, [location]);

  // Acciones
  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Desea retirar este docente?");
    if (!confirmar) return;

    try {
      await eliminarDocente(id);
      cargarDocentes();
    } catch (error) {
      console.error("Error al eliminar docente:", error);
    }
  };

  const handleEditar = (docente) => {
    setDocenteEditar(docente);
    setMostrarFormulario(true);
  };

  const handleNuevoDocente = () => {
    setDocenteEditar(null);
    setMostrarFormulario(true);
  };

  const handleCerrarFormulario = () => {
    setMostrarFormulario(false);
    setDocenteEditar(null);
  };

  return (
    <Layout>
      <h1>Gestión de Docentes</h1>

      {/* Buscador */}
      <div>
        <input
          type="text"
          placeholder="Buscar por DNI, nombre o apellido..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <br />

      <button onClick={handleNuevoDocente}>+ Nuevo docente</button>

    {
    mostrarFormulario &&

            <Modal
                cerrar={()=>{
                    setMostrarFormulario(false);
                    setDocenteEditar(null);
                }}
            >

                <DocenteForm

                    cerrarFormulario={()=>{
                        setMostrarFormulario(false);
                        setDocenteEditar(null);
                    }}

                    actualizarLista={cargarDocentes}

                    docenteEditar={docenteEditar}

                />


            </Modal>

        }

      {/* Tabla de Docentes */}
      <table border="1">
        <thead>
          <tr>
            <th>DNI</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Especialidad</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {docentes.map((d) => (
            <tr key={d.id_docente}>
              <td>{d.DNI}</td>
              <td>{d.nombres}</td>
              <td>{d.apellidos}</td>
              <td>{d.especialidad}</td>
              <td>
                {d.estado === "Activo" ? "🟢 Activo" : "🔴 Retirado"}
              </td>
              <td>
                <button onClick={() => handleEditar(d)}>Editar</button>
                <button onClick={() => setDocenteConsultar(d)}>
                  Consultar
                </button>
                <button onClick={() => handleEliminar(d.id_docente)}>
                  Retirar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Detalle Docente */}
      {docenteConsultar && (
        <div>
          <h2>Detalle Docente</h2>
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

          <button onClick={() => setDocenteConsultar(null)}>Cerrar</button>
        </div>
      )}
    </Layout>
  );
}

export default Docentes;