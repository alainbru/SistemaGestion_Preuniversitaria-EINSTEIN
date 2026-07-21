import { useState } from "react";
import { registrarEstudiante } from "../api/estudianteApi";


function EstudianteForm({ cerrarFormulario, actualizarLista }) {

    const [datos, setDatos] = useState({

        DNI: "",
        nombres: "",
        apellidos: "",
        fecha_nacimiento: "",
        telefono: "",
        correo: "",
        direccion: ""

    });

    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(false);


    const handleChange = (e) => {

        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        });

    };


    const guardarEstudiante = async (e) => {

        e.preventDefault();
        setError("");
        setCargando(true);

        try {

            const respuesta = await registrarEstudiante(datos);
            
            console.log("Respuesta del servidor:", respuesta);

            alert("Estudiante registrado correctamente");

            actualizarLista();
            cerrarFormulario();

        } catch (error) {

            console.error("Error completo:", error);
            
            const mensajeError = error.response?.data?.error || 
                               error.response?.data?.mensaje ||
                               error.message || 
                               "Error desconocido al registrar estudiante";
            
            setError(mensajeError);
            alert(`Error: ${mensajeError}`);

        } finally {
            setCargando(false);
        }

    };


    return (

        <form onSubmit={guardarEstudiante}>

            <h2>Nuevo Estudiante</h2>

            {error && <div style={{color: "red", marginBottom: "10px"}}>{error}</div>}


            <input
                type="text"
                name="DNI"
                placeholder="DNI"
                value={datos.DNI}
                onChange={handleChange}
                required
            />


            <input
                type="text"
                name="nombres"
                placeholder="Nombres"
                value={datos.nombres}
                onChange={handleChange}
                required
            />


            <input
                type="text"
                name="apellidos"
                placeholder="Apellidos"
                value={datos.apellidos}
                onChange={handleChange}
                required
            />


            <input
                type="date"
                name="fecha_nacimiento"
                value={datos.fecha_nacimiento}
                onChange={handleChange}
                required
            />


            <input
                type="text"
                name="telefono"
                placeholder="Teléfono"
                value={datos.telefono}
                onChange={handleChange}
                required
            />


            <input
                type="email"
                name="correo"
                placeholder="Correo"
                value={datos.correo}
                onChange={handleChange}
                required
            />


            <input
                type="text"
                name="direccion"
                placeholder="Dirección"
                value={datos.direccion}
                onChange={handleChange}
                required
            />


            <button type="submit" disabled={cargando}>
                {cargando ? "Guardando..." : "Guardar"}
            </button>


            <button 
                type="button"
                onClick={cerrarFormulario}
                disabled={cargando}
            >
                Cancelar
            </button>


        </form>

    );

}


export default EstudianteForm;