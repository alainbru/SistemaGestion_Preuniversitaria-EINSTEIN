function ActivityList(){


const actividades=[

"Juan P. - Pago S/.50",

"María G. - Matrícula Física II",

"Pedro R. - Nuevo estudiante",

"Docente registrado"

];


return(

<div className="activity-list-container">

<h3>
Últimas Actividades
</h3>


<ul>

{
actividades.map((a,index)=>(

<li key={index}>
{a}
</li>

))
}

</ul>


</div>

)

}


export default ActivityList;