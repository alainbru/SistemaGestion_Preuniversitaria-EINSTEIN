import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import DocenteForm from "../components/DocenteForm";

import {
    listarDocentes,
    eliminarDocente,
    buscarDocente
} from "../api/docenteApi";


function Docentes() {

    const [docentes, setDocentes] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [docenteEditar, setDocenteEditar] = useState(null);
    const [busqueda, setBusqueda] = useState("");


    useEffect(() => {

        cargarDocentes();

    }, []);


    const cargarDocentes = async () => {

        try {

            const respuesta = await listarDocentes();

            setDocentes(respuesta.data);

        } catch (error) {

            console.log(error);

        }

    };


    const eliminar = async (id) => {

        const confirmar = window.confirm(
            "¿Desea retirar este docente?"
        );

        if (!confirmar) return;

        try {

            await eliminarDocente(id);

            cargarDocentes();

        } catch (error) {

            console.log(error);

        }

    };


    const editar = (docente) => {

        setDocenteEditar(docente);
        setMostrarFormulario(true);

    };


    const buscar = async () => {

        if (busqueda.trim() === "") {

            cargarDocentes();
            return;

        }

        try {

            const respuesta = await buscarDocente(busqueda);

            setDocentes(respuesta.data);

        } catch (error) {

            console.log(error);

        }

    };


    useEffect(() => {

        buscar();

    }, [busqueda]);


    return (

        <Layout>

            <h1>Gestión de Docentes</h1>

            <input
                type="text"
                placeholder="Buscar por DNI, nombre o apellido..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />

            <button
                onClick={() => {

                    setDocenteEditar(null);
                    setMostrarFormulario(true);

                }}
            >
                + Nuevo docente
            </button>


            {
                mostrarFormulario &&

                <DocenteForm

                    cerrarFormulario={() => {

                        setMostrarFormulario(false);
                        setDocenteEditar(null);

                    }}

                    actualizarLista={cargarDocentes}

                    docenteEditar={docenteEditar}

                />

            }


            <table border="1">

                <thead>

                    <tr>

                        <th>DNI</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Especialidad</th>
                        <th>Teléfono</th>
                        <th>Correo</th>
                        <th>Acción</th>

                    </tr>

                </thead>


                <tbody>

                    {

                        docentes.map((d) => (

                            <tr key={d.id_docente}>

                                <td>{d.DNI}</td>
                                <td>{d.nombres}</td>
                                <td>{d.apellidos}</td>
                                <td>{d.especialidad}</td>
                                <td>{d.telefono}</td>
                                <td>{d.correo}</td>

                                <td>

                                    <button
                                        onClick={() => editar(d)}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        onClick={() => eliminar(d.id_docente)}
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

export default Docentes;