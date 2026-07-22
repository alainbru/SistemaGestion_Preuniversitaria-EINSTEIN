import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import MatriculaForm from "../components/MatriculaForm";
import { listarMatriculas, anularMatricula } from "../api/matriculaApi";
import Modal from "../components/Modal";

function Matriculas() {
  const [matriculas, setMatriculas] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [matriculaEditar, setMatriculaEditar] = useState(null);

  useEffect(() => {
    cargarMatriculas();
  }, []);

  const cargarMatriculas = async () => {
    try {
      const respuesta = await listarMatriculas();
      setMatriculas(respuesta.data);
    } catch (error) {
      console.log(error);
    }
  };

  const anular = async (id) => {
    const confirmar = window.confirm("¿Desea anular esta matrícula?");
    if (!confirmar) return;

    try {
      await anularMatricula(id);
      cargarMatriculas();
    } catch (error) {
      console.log(error);
    }
  };

  const editar = (matricula) => {
    setMatriculaEditar(matricula);
    setMostrarFormulario(true);
  };

  const abrirNuevoFormulario = () => {
    setMatriculaEditar(null);
    setMostrarFormulario(true);
  };

  const cerrarFormulario = () => {
    setMostrarFormulario(false);
    setMatriculaEditar(null);
  };

  return (
    <Layout>
      <h1>Gestión de Matrículas</h1>

      <button onClick={abrirNuevoFormulario}>
        + Nueva matrícula
      </button>

      {
mostrarFormulario && (

    <Modal
        cerrar={cerrarFormulario}
    >

        <MatriculaForm

            cerrarFormulario={cerrarFormulario}
            actualizarLista={cargarMatriculas}
            matriculaEditar={matriculaEditar}
        />
    </Modal>
)
}

      <table border="1">
        <thead>
          <tr>
            <th>Fecha matrícula</th>
            <th>Inicio</th>
            <th>Fin</th>
            <th>Estudiante</th>
            <th>Ciclo</th>
            <th>Grupo</th>
            <th>Estado</th>
            <th>Pago</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {matriculas.map((m) => (
            <tr key={m.id_matricula}>
              <td>{m.fecha_matricula}</td>
              <td>{m.fecha_inicio}</td>
              <td>{m.fecha_fin}</td>
              <td>{m.estudiante || m.nombres || m.id_estudiante}</td>
              <td>{m.ciclo || m.nombre_ciclo || m.id_ciclo}</td>
              <td>{m.grupo || m.nombre_grupo || m.id_grupo}</td>
              <td>{m.estado}</td>
              <td>{m.estado_pago}</td>
              <td>
                <button onClick={() => editar(m)}>Editar</button>
                <button onClick={() => anular(m.id_matricula)}>Anular</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}

export default Matriculas;