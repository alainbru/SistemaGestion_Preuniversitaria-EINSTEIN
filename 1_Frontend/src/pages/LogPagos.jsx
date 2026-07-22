import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { listarLogsPago } from "../api/logPagoApi";


function LogPagos(){

    const [logs,setLogs] = useState([]);


    useEffect(()=>{

        cargarLogs();

    },[]);



    const cargarLogs = async()=>{

        try{

            const respuesta = await listarLogsPago();

            setLogs(respuesta.data);


        }catch(error){

            console.log(error);

        }

    };



    return (

        <Layout>


            <h1>
                Historial de Pagos
            </h1>


            <table border="1">


                <thead>

                    <tr>

                        <th>
                            Fecha
                        </th>

                        <th>
                            Acción
                        </th>

                        <th>
                            Descripción
                        </th>

                        <th>
                            Estado anterior
                        </th>

                        <th>
                            Estado nuevo
                        </th>

                        <th>
                            Usuario
                        </th>


                    </tr>

                </thead>



                <tbody>


                    {
                        logs.map((l)=>(


                            <tr key={l.id_log_pago}>


                                <td>
                                    {
                                    new Date(l.fecha_hora)
                                    .toLocaleString()
                                    }
                                </td>


                                <td>
                                    {l.accion}
                                </td>


                                <td>
                                    {l.descripcion}
                                </td>


                                <td>
                                    {
                                    l.estado_anterior || "-"
                                    }
                                </td>


                                <td>
                                    {
                                    l.estado_nuevo || "-"
                                    }
                                </td>


                                <td>
                                    {l.nombre_usuario}
                                </td>


                            </tr>


                        ))
                    }



                </tbody>


            </table>


        </Layout>

    );


}


export default LogPagos;