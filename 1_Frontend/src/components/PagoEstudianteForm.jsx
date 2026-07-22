import { useEffect, useState } from "react";
import {
  registrarPagoDocente,
  actualizarPagoDocente,
} from "../api/pagoDocenteApi";
import { listarDocentes } from "../api/docenteApi";

const PAGO_INICIAL = {
  fecha_pago: new Date().toISOString().split("T")[0],
  monto: "",
  concepto: "",
  id_docente: "",
};

// Auxiliar para formatear fecha YYYY-MM-DD en inputs tipo date
const formatearFecha = (fecha) => {
  if (!fecha) return "";
  return String(fecha).split("T")[0];
};

function PagoDocenteForm({ cerrarFormulario, actualizarLista, pagoEditar }) {
  const [datos, setDatos] = useState(PAGO_INICIAL);
  const [docentes, setDocentes] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    cargarDocentes();
  }, []);

  useEffect(() => {
    if (pagoEditar) {
      setDatos({
        fecha_pago: formatearFecha(pagoEditar.fecha_pago),
        monto: pagoEditar.monto || "",
        concepto: pagoEditar.concepto || "",
        id_docente: pagoEditar.id_docente || "",
      });
    } else {
      setDatos(PAGO_INICIAL);
    }
  }, [pagoEditar]);

  const cargarDocentes = async () => {
    try {
      const respuesta = await listarDocentes();
      setDocentes(respuesta.data || []);
    } catch (err) {
      console.error("Error al cargar lista de docentes:", err);
      setError("No se pudo cargar la lista de docentes.");
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
    setCargando(true);
    setError("");

    try {
      if (pagoEditar) {
        await actualizarPagoDocente(pagoEditar.id_pago_docente, {
          fecha_pago: datos.fecha_pago,
          monto: datos.monto,
          concepto: datos.concepto,
          id_docente: datos.id_docente,
        });
      } else {
        await registrarPagoDocente(datos);
      }

      await actualizarLista();
      cerrarFormulario();
    } catch (err) {
      console.error("Error al guardar el pago del docente:", err);
      setError(
        err.response?.data?.mensaje ||
          err.response?.data?.error ||
          "Error al guardar el pago del docente."
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <form className="formulario" onSubmit={guardar}>
      <h2>
        {pagoEditar ? "✏️ Editar Pago Docente" : "💼 Nuevo Pago Docente"}
      </h2>

      {error && <p className="error">{error}</p>}

      <label>Fecha de Pago</label>
      <input
        type="date"
        name="fecha_pago"
        value={datos.fecha_pago}
        onChange={handleChange}
        required
      />

      <label>Monto (S/.)</label>
      <input
        type="number"
        step="0.01"
        name="monto"
        placeholder="Monto"
        value={datos.monto}
        onChange={handleChange}
        required
      />

      <label>Concepto</label>
      <input
        type="text"
        name="concepto"
        placeholder="Ejm: Honorarios Mayo / Horas Dictadas"
        value={datos.concepto}
        onChange={handleChange}
        required
      />

      <label>Docente</label>
      <select
        name="id_docente"
        value={datos.id_docente}
        onChange={handleChange}
        required
      >
        <option value="">-- Seleccione docente --</option>
        {docentes.map((d) => (
          <option key={d.id_docente} value={d.id_docente}>
            {d.nombres} {d.apellidos}
          </option>
        ))}
      </select>

      <div className="botones-form">
        <button className="btn-guardar" type="submit" disabled={cargando}>
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

export default PagoDocenteForm;