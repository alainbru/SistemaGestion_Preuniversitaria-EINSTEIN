function DashboardCard({
    titulo,
    valor,
    descripcion,
    icono,
    color
}) {


    return (

        <div 
            className="dashboard-card"
            style={{
                borderLeft: `5px solid ${color}`
            }}
        >


            <div className="dashboard-card-header">


                <div className="dashboard-card-info">


                    <p className="dashboard-card-title">
                        {titulo}
                    </p>


                    <h2 className="dashboard-card-value">
                        {valor}
                    </h2>


                    <p className="dashboard-card-description">
                        {descripcion}
                    </p>


                </div>



                <div className="dashboard-card-icon">

                    {icono}

                </div>


            </div>


        </div>

    );

}


export default DashboardCard;