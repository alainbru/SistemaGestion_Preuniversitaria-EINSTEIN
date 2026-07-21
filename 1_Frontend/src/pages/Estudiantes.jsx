import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { listarEstudiantes } from "../api/estudianteApi";
import EstudianteForm from "../components/EstudianteForm";
function Estudiantes() {

    const [estudiantes, setEstudiantes] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    useEffect(() => {
        cargarEstudiantes();
    }, []);

    const cargarEstudiantes = async () => {

        try {

            const respuesta = await listarEstudiantes();
            setEstudiantes(respuesta.data);

        } catch (error) {

            console.log(error);

        }

    };


    return (
        <Layout>

            <h1>Gestión de Estudiantes</h1>

            <button 
                onClick={() => setMostrarFormulario(true)}
            >
                + Nuevo estudiante
            </button>

        {
            mostrarFormulario && (
                <EstudianteForm
                    cerrarFormulario={() => setMostrarFormulario(false)}
                    actualizarLista={cargarEstudiantes}
                />
            )
        }
            <table border="1">

                <thead>
                    <tr>
                        <th>DNI</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Teléfono</th>
                        <th>Correo</th>
                    </tr>
                </thead>


                <tbody>

                    {
                        estudiantes.map((e) => (

                            <tr key={e.id_estudiante}>

                                <td>{e.DNI}</td>
                                <td>{e.nombres}</td>
                                <td>{e.apellidos}</td>
                                <td>{e.telefono}</td>
                                <td>{e.correo}</td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>


        </Layout>
    );

}


export default Estudiantes;