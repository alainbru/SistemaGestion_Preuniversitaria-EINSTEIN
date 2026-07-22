import { useEffect, useState } from "react";
import { registrarPagoDocente, actualizarPagoDocente } from "../api/pagoDocenteApi";
import { listarDocentes } from "../api/docenteApi";

function PagoDocenteForm({ cerrarFormulario, actualizarLista, pagoEditar }) {
  const [datos, setDatos] = useState({
    fecha_pago: "",
    monto: "",
    concepto: "",
    id_docente: "",
  });

  const [docentes, setDocentes] = useState([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    cargarDocentes();
  }, []);

  useEffect(() => {
    if (pagoEditar) {
      setDatos({
        fecha_pago: pagoEditar.fecha_pago || "",
        monto: pagoEditar.monto || "",
        concepto: pagoEditar.concepto || "",
        id_docente: pagoEditar.id_docente || "",
      });
    }
  }, [pagoEditar]);

  const cargarDocentes = async () => {
    try {
      const respuesta = await listarDocentes();
      setDocentes(respuesta.data);
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
    setCargando(true);

    try {
      if (pagoEditar) {
        await actualizarPagoDocente(pagoEditar.id_pago_docente, {
          monto: datos.monto,
          concepto: datos.concepto,
          estado: pagoEditar.estado,
        });
      } else {
        await registrarPagoDocente(datos);
      }

      alert(
        pagoEditar
          ? "Pago actualizado correctamente"
          : "Pago registrado correctamente"
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
      <h2>{pagoEditar ? "Editar Pago Docente" : "Nuevo Pago Docente"}</h2>

      <input
        type="date"
        name="fecha_pago"
        value={datos.fecha_pago}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        step="0.01"
        name="monto"
        placeholder="Monto"
        value={datos.monto}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="concepto"
        placeholder="Concepto"
        value={datos.concepto}
        onChange={handleChange}
      />

      <select
        name="id_docente"
        value={datos.id_docente}
        onChange={handleChange}
        required
      >
        <option value="">Seleccione docente</option>
        {docentes.map((d) => (
          <option key={d.id_docente} value={d.id_docente}>
            {d.nombres} {d.apellidos}
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

export default PagoDocenteForm;