import { useEffect, useState } from "react";
import { registrarPagoEstudiante, actualizarPagoEstudiante } from "../api/pagoEstudianteApi";
import { listarEstudiantes } from "../api/estudianteApi";

function PagoEstudianteForm({ cerrarFormulario, actualizarLista, pagoEditar }) {
  const [datos, setDatos] = useState({
    fecha_pago: "",
    monto: "",
    concepto: "",
    periodo_pagado: "",
    fecha_inicio_pago: "",
    fecha_fin_pago: "",
    id_estudiante: "",
  });

  const [estudiantes, setEstudiantes] = useState([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    cargarEstudiantes();
  }, []);

  useEffect(() => {
    if (pagoEditar) {
      setDatos({
        fecha_pago: pagoEditar.fecha_pago || "",
        monto: pagoEditar.monto || "",
        concepto: pagoEditar.concepto || "",
        periodo_pagado: pagoEditar.periodo_pagado || "",
        fecha_inicio_pago: pagoEditar.fecha_inicio_pago || "",
        fecha_fin_pago: pagoEditar.fecha_fin_pago || "",
        id_estudiante: pagoEditar.id_estudiante || "",
      });
    }
  }, [pagoEditar]);

  const cargarEstudiantes = async () => {
    try {
      const respuesta = await listarEstudiantes();
      setEstudiantes(respuesta.data);
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
        await actualizarPagoEstudiante(pagoEditar.id_pago, {
          monto: datos.monto,
          concepto: datos.concepto,
          estado: pagoEditar.estado,
          fecha_fin_pago: datos.fecha_fin_pago,
        });
      } else {
        await registrarPagoEstudiante(datos);
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
      <h2>
        {pagoEditar ? "Editar Pago Estudiante" : "Nuevo Pago Estudiante"}
      </h2>

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

      <input
        type="text"
        name="periodo_pagado"
        placeholder="Periodo pagado"
        value={datos.periodo_pagado}
        onChange={handleChange}
      />

      <label>Fecha inicio pago</label>
      <input
        type="date"
        name="fecha_inicio_pago"
        value={datos.fecha_inicio_pago}
        onChange={handleChange}
      />

      <label>Fecha fin pago</label>
      <input
        type="date"
        name="fecha_fin_pago"
        value={datos.fecha_fin_pago}
        onChange={handleChange}
      />

      <select
        name="id_estudiante"
        value={datos.id_estudiante}
        onChange={handleChange}
        required
      >
        <option value="">Seleccione estudiante</option>
        {estudiantes.map((e) => (
          <option key={e.id_estudiante} value={e.id_estudiante}>
            {e.nombres} {e.apellidos}
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

export default PagoEstudianteForm;