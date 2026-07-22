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

// Auxiliar para asegurar formato YYYY-MM-DD en los inputs de tipo date
const formatearFecha = (fecha) => {
  if (!fecha) return "";
  return String(fecha).split("T")[0];
};

function PagoDocenteForm({ cerrarFormulario, actualizarLista, pagoEditar }) {
  const [datos, setDatos] = useState(PAGO_INICIAL);
  const [docentes, setDocentes] = useState([]);
  const [cargando, setCargando] = useState(false);

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
    } catch (error) {
      console.error("Error al cargar docentes:", error);
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

    try {
      if (pagoEditar) {
        await actualizarPagoDocente(pagoEditar.id_pago_docente, {
          fecha_pago: datos.fecha_pago,
          monto: datos.monto,
          concepto: datos.concepto,
          id_docente: datos.id_docente,
          estado: pagoEditar.estado,
        });
      } else {
        await registrarPagoDocente(datos);
      }

      alert(
        pagoEditar
          ? "Pago de docente actualizado correctamente"
          : "Pago de docente registrado correctamente"
      );

      actualizarLista();
      cerrarFormulario();
    } catch (error) {
      console.error("Error al guardar el pago del docente:", error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <form className="formulario" onSubmit={guardar}>
      <h2>
        {pagoEditar ? "✏️ Editar Pago Docente" : "💼 Nuevo Pago Docente"}
      </h2>

      <label>Fecha de pago</label>
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
        placeholder="Ejm: Honorarios del mes"
        value={datos.concepto}
        onChange={handleChange}
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
        <button className="btn-guardar" disabled={cargando}>
          {cargando ? "Guardando..." : "Guardar"}
        </button>

        <button
          className="btn-cancelar"
          type="button"
          onClick={cerrarFormulario}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default PagoDocenteForm;