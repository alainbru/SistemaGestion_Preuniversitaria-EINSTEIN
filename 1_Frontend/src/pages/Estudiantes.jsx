import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import EstudianteForm from "../components/EstudianteForm";

import {
    listarEstudiantes,
    eliminarEstudiante,
    actualizarEstudiante,
    buscarEstudiante
} from "../api/estudianteApi";


function Estudiantes() {

    const [estudiantes, setEstudiantes] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [estudianteEditar, setEstudianteEditar] = useState(null);
    const [busqueda, setBusqueda] = useState("");
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


    const eliminar = async (id) => {
        console.log("ID A ELIMINAR:", id);
        const confirmar = window.confirm(
            "¿Desea retirar este estudiante?"
            
        );


        if (!confirmar) {
            return;
        }


        try {

            await eliminarEstudiante(id);

            cargarEstudiantes();

        } catch (error) {

            console.log(error);

        }

    };

    const editar = (estudiante) => {
    setEstudianteEditar(estudiante);
    setMostrarFormulario(true);

    };

    const buscar = async () => {

        if (busqueda.trim() === "") {
            cargarEstudiantes();
            return;
        }
        try {
            const respuesta = await buscarEstudiante(busqueda);
            setEstudiantes(respuesta.data);
        } catch (error) {
            console.log(error);
        }

    };

    useEffect(() => {

    buscar();

    }, [busqueda]);
 
    return (

        <Layout>

            <h1>
                Gestión de Estudiantes
            </h1>
            <input
                type="text"
                placeholder="Buscar por DNI, nombre o apellido..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />

            <button
                onClick={() => {
                    setEstudianteEditar(null);
                    setMostrarFormulario(true);
                }}
            >
                + Nuevo estudiante
            </button>



            {
                mostrarFormulario && (

                    <EstudianteForm
                        cerrarFormulario={() => {
                            setMostrarFormulario(false);
                            setEstudianteEditar(null);
                        }}

                        actualizarLista={cargarEstudiantes}

                        estudianteEditar={estudianteEditar}
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
                        <th>Acción</th>
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
                                <td>
                                <button
                                    onClick={() => editar(e)}
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => eliminar(e.id_estudiante)}
                                >
                                    Retirar
                                </button>
                            </td>
                            </tr>

                        ))
                    }

                </tbody>

            </table>


        </Layout>

    );

}


export default Estudiantes;