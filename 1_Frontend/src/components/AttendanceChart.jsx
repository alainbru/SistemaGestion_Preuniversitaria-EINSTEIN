import {
    Bar
} from "react-chartjs-2";


import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend

} from "chart.js";


import {
    useEffect,
    useState
} from "react";


import {
    obtenerAsistenciaMensual
} from "../api/dashboardApi";



ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);



function AttendanceChart(){


const [datos,setDatos]=useState([]);



useEffect(()=>{

    cargarDatos();

},[]);



const cargarDatos=async()=>{


try{


const respuesta =
await obtenerAsistenciaMensual();


setDatos(respuesta.data);



}catch(error){

console.log(error);

}


};




const data={


labels:

datos.map(item=>{

    const meses=[

        "",
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"

    ];


    return meses[item.mes];

}),



datasets:[

{

label:"Asistencia %",

data:

datos.map(
item=>item.porcentaje
),


borderWidth:1

}

]


};




return(

<div className="attendance-chart">


<h3>
Gráfico de Asistencia Mensual
</h3>


<Bar

data={data}


/>


</div>

)


}


export default AttendanceChart;