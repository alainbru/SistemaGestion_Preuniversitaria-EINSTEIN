import Layout from "../components/Layout";

function Reportes(){

return(

<Layout>


<h1>📊 Reportes del Sistema</h1>


<div className="reportes-grid">


<div className="reporte-card">

<h2>📚 Reporte Académico</h2>

<p>
Notas, promedios y rendimiento académico.
</p>

<button>
Ver reporte
</button>

</div>



<div className="reporte-card">

<h2>💰 Reporte Financiero</h2>

<p>
Pagos, ingresos y pendientes.
</p>

<button>
Ver reporte
</button>

</div>



<div className="reporte-card">

<h2>👨‍🎓 Reporte Estudiantes</h2>

<p>
Información general de estudiantes.
</p>

<button>
Ver reporte
</button>

</div>




<div className="reporte-card">

<h2>👨‍🏫 Reporte Docentes</h2>

<p>
Docentes y pagos realizados.
</p>

<button>
Ver reporte
</button>

</div>




<div className="reporte-card">

<h2>📋 Reporte Asistencia</h2>

<p>
Control de asistencia.
</p>

<button>
Ver reporte
</button>

</div>



</div>


</Layout>


);


}


export default Reportes;