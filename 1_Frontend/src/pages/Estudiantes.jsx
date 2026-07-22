import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import EstudianteForm from "../components/EstudianteForm";
import {
  listarEstudiantes,
  eliminarEstudiante,
  buscarEstudiante,
} from "../api/estudianteApi";

function Estudiantes() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [estudianteEditar, setEstudianteEditar] = useState(null);
  const [estudianteConsultar, setEstudianteConsultar] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  const location = useLocation();

  // Carga o busca estudiantes según el término ingresado
  const cargarEstudiantes = useCallback(async () => {
    try {
      const query = busqueda.trim();
      const respuesta = query
        ? await buscarEstudiante(query)
        : await listarEstudiantes();

      setEstudiantes(respuesta.data ?? []);
    } catch (error) {
      console.error("Error al obtener estudiantes:", error);
    }
  }, [busqueda]);

  // Ejecuta carga inicial y búsqueda dinámica
  useEffect(() => {
    cargarEstudiantes();
  }, [cargarEstudiantes]);

  // Limpia el estado del formulario/modal si se navega a otra ruta
  useEffect(() => {
    setMostrarFormulario(false);
    setEstudianteEditar(null);
    setEstudianteConsultar(null);
    setBusqueda("");
  }, [location.pathname]);

  // Acciones
  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Desea retirar este estudiante?");
    if (!confirmar) return;

    try {
      await eliminarEstudiante(id);
      cargarEstudiantes();
    } catch (error) {
      console.error("Error al eliminar estudiante:", error);
    }
  };

  const handleEditar = (estudiante) => {
    setEstudianteEditar(estudiante);
    setMostrarFormulario(true);
  };

  const handleNuevoEstudiante = () => {
    setEstudianteEditar(null);
    setMostrarFormulario(true);
  };

  const handleCerrarFormulario = () => {
    setMostrarFormulario(false);
    setEstudianteEditar(null);
  };

  return (
    <Layout>
      <h1>Gestión de Estudiantes</h1>

      {/* Buscador */}
      <input
        type="text"
        placeholder="Buscar por DNI, nombre o apellido..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleNuevoEstudiante}>+ Nuevo estudiante</button>

      {/* Formulario Crear / Editar */}
      {mostrarFormulario && (
        <EstudianteForm
          cerrarFormulario={handleCerrarFormulario}
          actualizarLista={cargarEstudiantes}
          estudianteEditar={estudianteEditar}
        />
      )}

      {/* Tabla de Estudiantes */}
      <table border="1">
        <thead>
          <tr>
            <th>DNI</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map((e) => (
            <tr key={e.id_estudiante}>
              <td>{e.DNI}</td>
              <td>{e.nombres}</td>
              <td>{e.apellidos}</td>
              <td>
                {e.estado_estudiante === "ACTIVO" ? "🟢 Activo" : "🔴 Inactivo"}
              </td>
              <td>
                <button onClick={() => handleEditar(e)}>Editar</button>
                <button onClick={() => setEstudianteConsultar(e)}>
                  Consultar
                </button>
                <button onClick={() => handleEliminar(e.id_estudiante)}>
                  Retirar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Detalle Estudiante */}
      {estudianteConsultar && (
        <div>
          <h2>Detalle estudiante</h2>
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
            <strong>Estado:</strong> {estudianteConsultar.estado_estudiante}
          </p>

          <button onClick={() => setEstudianteConsultar(null)}>
            Cerrar
          </button>
        </div>
      )}
    </Layout>
  );
}

export default Estudiantes;