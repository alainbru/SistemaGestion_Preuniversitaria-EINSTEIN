import { useEffect, useState } from "react";
import { registrarMatricula, actualizarMatricula } from "../api/matriculaApi";
import { listarEstudiantes } from "../api/estudianteApi";
import { listarCiclos } from "../api/cicloApi";
import { listarGrupos } from "../api/grupoApi";
import Modal from "../components/Modal";

function MatriculaForm({ cerrarFormulario, actualizarLista, matriculaEditar }) {
  const [datos, setDatos] = useState({
    fecha_matricula: "",
    fecha_inicio: "",
    fecha_fin: "",
    id_estudiante: "",
    id_ciclo: "",
    id_grupo: "",
  });

  const [estudiantes, setEstudiantes] = useState([]);
  const [ciclos, setCiclos] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    cargarDatos();
  }, []);

  useEffect(() => {
    if (matriculaEditar) {
      setDatos({
        fecha_matricula: matriculaEditar.fecha_matricula || "",
        fecha_inicio: matriculaEditar.fecha_inicio || "",
        fecha_fin: matriculaEditar.fecha_fin || "",
        id_estudiante: matriculaEditar.id_estudiante || "",
        id_ciclo: matriculaEditar.id_ciclo || "",
        id_grupo: matriculaEditar.id_grupo || "",
      });
    }
  }, [matriculaEditar]);

  const cargarDatos = async () => {
    try {
      const [est, cic, gru] = await Promise.all([
        listarEstudiantes(),
        listarCiclos(),
        listarGrupos(),
      ]);

      setEstudiantes(est.data);
      setCiclos(cic.data);
      setGrupos(gru.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

const guardar = async (e) => {

    e.preventDefault();


    if(
        !datos.id_estudiante ||
        !datos.id_ciclo ||
        !datos.id_grupo
    ){

        alert(
            "Debe seleccionar estudiante, ciclo y grupo"
        );

        return;

    }

    try {
      if (matriculaEditar) {
        await actualizarMatricula(matriculaEditar.id_matricula, datos);
      } else {
        await registrarMatricula(datos);
      }

      alert(
        matriculaEditar
          ? "Matrícula actualizada"
          : "Matrícula registrada"
      );

      actualizarLista();
      cerrarFormulario();
    } catch (error) {
      console.log(error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <form onSubmit={guardar}>
      <h2>{matriculaEditar ? "Editar Matrícula" : "Nueva Matrícula"}</h2>
       <label>
         Fecha matrícula
        </label>

        <input
            type="date"
            name="fecha_matricula"
            value={datos.fecha_matricula}
            onChange={handleChange}
            required
        />


        <label>
            Fecha inicio
        </label>

        <input
            type="date"
            name="fecha_inicio"
            value={datos.fecha_inicio}
            onChange={handleChange}
            required
        />


        <label>
            Fecha fin
        </label>

        <input
            type="date"
            name="fecha_fin"
            value={datos.fecha_fin}
            onChange={handleChange}
            required
        />
      <select
        name="id_estudiante"
        value={datos.id_estudiante}
        onChange={handleChange}
      >
        <option value="">Seleccione estudiante</option>
        {estudiantes.map((e) => (
        <option 
            key={e.id_estudiante} 
            value={e.id_estudiante}
            >

            {e.DNI} - {e.nombres} {e.apellidos}

            </option>
        ))}
      </select>

      <select
        name="id_ciclo"
        value={datos.id_ciclo}
        onChange={handleChange}
      >
        <option value="">Seleccione ciclo</option>
        {ciclos.map((c) => (
         <option 
            key={c.id_ciclo}
            value={c.id_ciclo}
            >

            {c.nombre} 
            ({c.fecha_inicio} - {c.fecha_fin})

            </option>
        ))}
      </select>

      <select
        name="id_grupo"
        value={datos.id_grupo}
        onChange={handleChange}
      >
        <option value="">Seleccione grupo</option>
        {grupos.map((g) => (
          <option key={g.id_grupo} value={g.id_grupo}>
            {g.nombre_grupo} - Turno {g.turno}
          </option>
        ))}
      </select>

      <button disabled={cargando}>
        {cargando ? "Guardando..." : "Guardar"}
      </button>

      <button type="button" onClick={cerrarFormulario}>
        Cancelar
      </button>
    </form>
  );
}

export default MatriculaForm;