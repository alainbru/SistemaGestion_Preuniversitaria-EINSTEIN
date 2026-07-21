import { useEffect, useState } from "react";

import {
    registrarCurso,
    actualizarCurso
} from "../api/cursoApi";


function CursoForm({
    cerrarFormulario,
    actualizarLista,
    cursoEditar
}) {


    const [datos, setDatos] = useState({

        nombre_curso: "",
        descripcion: "",
        estado: "Activo"

    });


    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(false);



    const handleChange = (e) => {

        setDatos({

            ...datos,
            [e.target.name]: e.target.value

        });

    };



    const guardarCurso = async (e) => {

        e.preventDefault();

        setError("");
        setCargando(true);


        try {

            let respuesta;


            if(cursoEditar){


                respuesta = await actualizarCurso(

                    cursoEditar.id_curso,
                    datos

                );


            }else{


                respuesta = await registrarCurso(datos);


            }


            console.log(respuesta);


            alert(

                cursoEditar

                ? "Curso actualizado correctamente"

                : "Curso registrado correctamente"

            );


            actualizarLista();

            cerrarFormulario();



        } catch(error){


            console.log(error);


            const mensaje =

                error.response?.data?.error ||

                error.response?.data?.mensaje ||

                error.message;


            setError(mensaje);

            alert(mensaje);



        } finally {


            setCargando(false);


        }


    };




    useEffect(() => {


        if(cursoEditar){


            setDatos({

                nombre_curso: cursoEditar.nombre_curso,

                descripcion: cursoEditar.descripcion,

                estado: cursoEditar.estado

            });


        }


    },[cursoEditar]);





    return (

        <form onSubmit={guardarCurso}>


            <h2>

                {

                    cursoEditar

                    ? "Editar Curso"

                    : "Nuevo Curso"

                }


            </h2>


            {
                error &&

                <div style={{color:"red"}}>

                    {error}

                </div>
            }



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

                placeholder="Descripción"

                value={datos.descripcion}

                onChange={handleChange}

            />



            {
                cursoEditar &&

                <select

                    name="estado"

                    value={datos.estado}

                    onChange={handleChange}

                >

                    <option value="Activo">

                        Activo

                    </option>


                    <option value="Inactivo">

                        Inactivo

                    </option>


                </select>

            }



            <button

                type="submit"

                disabled={cargando}

            >

                {
                    cargando

                    ? "Guardando..."

                    : "Guardar"

                }

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


export default CursoForm;