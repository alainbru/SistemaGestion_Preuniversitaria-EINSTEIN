import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import CursoForm from "../components/CursoForm";
import { listarCursos, eliminarCurso, buscarCurso } from "../api/cursoApi";
import Modal from "../components/Modal";

function Cursos() {
  const [cursos, setCursos] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [cursoEditar, setCursoEditar] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  const cargarCursos = async () => {
    try {
      const respuesta = await listarCursos();
      setCursos(respuesta.data);
    } catch (error) {
      console.log(error);
    }
  };

  const eliminar = async (id) => {
    const confirmar = window.confirm("¿Desea desactivar este curso?");
    if (!confirmar) return;

    try {
      await eliminarCurso(id);
      cargarCursos();
    } catch (error) {
      console.log(error);
    }
  };

  const editar = (curso) => {
    setCursoEditar(curso);
    setMostrarFormulario(true);
  };

  const buscar = async () => {
    if (busqueda.trim() === "") {
      cargarCursos();
      return;
    }

    try {
      const respuesta = await buscarCurso(busqueda);
      setCursos(respuesta.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    buscar();
  }, [busqueda]);

  const abrirNuevoFormulario = () => {
    setCursoEditar(null);
    setMostrarFormulario(true);
  };

  const cerrarFormulario = () => {
    setMostrarFormulario(false);
    setCursoEditar(null);
  };

  return (
    <Layout>
      <h1>Gestión de Cursos</h1>

      <input
        type="text"
        placeholder="Buscar curso..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <button onClick={abrirNuevoFormulario}>
        + Nuevo curso
      </button>

      {
        mostrarFormulario && (

        <Modal
            cerrar={cerrarFormulario}
        >

        <CursoForm

            cerrarFormulario={cerrarFormulario}

            actualizarLista={cargarCursos}

            cursoEditar={cursoEditar}

        />


        </Modal>

        )
        }

      <table border="1">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {cursos.map((c) => (
            <tr key={c.id_curso}>
              <td>{c.nombre_curso}</td>
              <td>{c.descripcion}</td>
              <td>{c.estado}</td>
              <td>
                <button onClick={() => editar(c)}>Editar</button>
                <button onClick={() => eliminar(c.id_curso)}>Desactivar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}

export default Cursos;