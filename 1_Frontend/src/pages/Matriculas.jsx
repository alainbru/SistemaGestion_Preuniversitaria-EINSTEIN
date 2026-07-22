import { useCallback, useEffect, useState } from "react";
import Layout from "../components/Layout";
import MatriculaForm from "../components/MatriculaForm";
import { listarMatriculas, anularMatricula } from "../api/matriculaApi";
import "../styles/Matriculas.css";

function Matriculas() {
  const [matriculas, setMatriculas] = useState([]);
  const [matriculaEditar, setMatriculaEditar] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  const cargarMatriculas = useCallback(async () => {
    try {
      const respuesta = await listarMatriculas();
      setMatriculas(respuesta.data || []);
    } catch (error) {
      console.error("Error al cargar matrículas:", error);
    }
  }, []);

  useEffect(() => {
    cargarMatriculas();
  }, [cargarMatriculas]);

  const handleAnular = async (id) => {
    const confirmar = window.confirm("¿Desea anular esta matrícula?");
    if (!confirmar) return;

    try {
      await anularMatricula(id);
      cargarMatriculas();
    } catch (error) {
      console.error("Error al anular matrícula:", error);
    }
  };

  const handleEditar = (matricula) => {
    setMatriculaEditar(matricula);
  };

  const handleCerrarFormulario = () => {
    setMatriculaEditar(null);
  };

  const matriculasFiltradas = matriculas.filter((m) => {
    const terminoBusqueda = busqueda.toLowerCase().trim();
    if (!terminoBusqueda) return true;

    const textoCompleto = `${m.nombres ?? ""} ${m.apellidos ?? ""} ${m.DNI ?? ""}`.toLowerCase();
    return textoCompleto.includes(terminoBusqueda);
  });

  return (
    <Layout>
      <h1>Módulo de Matrículas</h1>

      <div className="matricula-layout">
        {/* FORMULARIO */}
        <div className="card matricula-form-card">
          <h2>{matriculaEditar ? "Editar Matrícula" : "Nueva Matrícula"}</h2>

          <MatriculaForm
            cerrarFormulario={handleCerrarFormulario}
            actualizarLista={cargarMatriculas}
            matriculaEditar={matriculaEditar}
          />
        </div>

        {/* HISTORIAL */}
        <div className="card">
          <h2>Historial y Consulta de Matrículas</h2>

          <div className="filtros">
            <input
              type="text"
              placeholder="Buscar por nombre o código de estudiante..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />

            <select>
              <option>Todos los ciclos</option>
            </select>
          </div>

          <table>
            <thead>
              <tr>
                <th>Fecha Reg.</th>
                <th>Estudiante</th>
                <th>Grupo</th>
                <th>Ciclo</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {matriculasFiltradas.map((m) => (
                <tr key={m.id_matricula}>
                  <td>{m.fecha_matricula}</td>
                  <td>
                    <strong>{m.DNI}</strong>
                    <br />
                    <span>
                      {m.nombres} {m.apellidos}
                    </span>
                  </td>
                  <td>{m.nombre_grupo}</td>
                  <td>
                    <span className="badge">{m.nombre_ciclo}</span>
                  </td>
                  <td>{m.estado}</td>
                  <td>
                    <button onClick={() => handleEditar(m)}>Editar</button>
                    <button onClick={() => handleAnular(m.id_matricula)}>
                      Anular
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default Matriculas;