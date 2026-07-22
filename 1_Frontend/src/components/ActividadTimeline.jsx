function ActividadTimeline({ actividades }) {


    return (

        <div className="actividad-card">


            <h3>
                Últimas Actividades
            </h3>


            {

            actividades.map((a)=>(

                <div 
                    key={a.id_actividad}
                    className="actividad-item"
                >

                    <div className="circulo">
                        ●
                    </div>


                    <div>

                        <strong>
                            {a.accion}
                        </strong>


                        <p>
                            {a.descripcion}
                        </p>


                        <small>
                            {a.fecha_hora}
                            {" - "}
                            {a.nombre_usuario}
                        </small>

                    </div>


                </div>


            ))

            }


        </div>

    );

}


export default ActividadTimeline;