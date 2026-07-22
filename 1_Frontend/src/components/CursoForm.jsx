import { useEffect, useState } from "react";
import { registrarCurso, actualizarCurso } from "../api/cursoApi";
import "../styles/CursoForm.css";

const CURSO_INICIAL = {
  nombre_curso: "",
  descripcion: "",
  estado: "Activo",
};

function CursoForm({ cerrarFormulario, actualizarLista, cursoEditar }) {
  const [datos, setDatos] = useState(CURSO_INICIAL);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (cursoEditar) {
      setDatos({
        nombre_curso: cursoEditar.nombre_curso ?? "",
        descripcion: cursoEditar.descripcion ?? "",
        estado: cursoEditar.estado ?? "Activo",
      });
    } else {
      setDatos(CURSO_INICIAL);
    }
  }, [cursoEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const guardarCurso = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError("");

    try {
      if (cursoEditar) {
        await actualizarCurso(cursoEditar.id_curso, datos);
      } else {
        await registrarCurso(datos);
      }

      await actualizarLista();
      cerrarFormulario();
    } catch (err) {
      console.error("Error al guardar curso:", err);
      setError(
        err.response?.data?.mensaje ||
          err.response?.data?.error ||
          "Error al guardar curso"
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <form className="formulario" onSubmit={guardarCurso}>
      <h2>
        {cursoEditar ? "✏️ Editar Curso" : "📚 Nuevo Curso"}
      </h2>

      {error && <p className="error">{error}</p>}

      <input
        type="text"
        name="nombre_curso"
        placeholder="Nombre del curso"
        value={datos.nombre_curso}
        onChange={handleChange}
        required
      />

      <textarea
        name="descripcion"
        placeholder="Descripción del curso..."
        value={datos.descripcion}
        onChange={handleChange}
        rows="3"
      />

      {cursoEditar && (
        <select
          name="estado"
          value={datos.estado}
          onChange={handleChange}
        >
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
      )}

      <div className="botones-form">
        <button
          className="btn-guardar"
          type="submit"
          disabled={cargando}
        >
          {cargando ? "Guardando..." : "Guardar"}
        </button>

        <button
          className="btn-cancelar"
          type="button"
          onClick={cerrarFormulario}
          disabled={cargando}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default CursoForm;