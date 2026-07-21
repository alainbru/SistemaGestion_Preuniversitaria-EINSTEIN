import Layout from "../components/Layout";


function Dashboard(){


    const usuario = JSON.parse(
        localStorage.getItem("usuario")
    );


    return (

        <Layout>


            <h1>
                Dashboard
            </h1>


            <h2>
                Bienvenido {usuario?.nombre_usuario}
            </h2>


            <p>
                Rol:
                {usuario?.rol}
            </p>


        </Layout>

    );


}


export default Dashboard;