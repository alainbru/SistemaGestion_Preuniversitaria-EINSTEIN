import { Link, useNavigate } from "react-router-dom";


function Sidebar(){

    const navigate = useNavigate();


    const cerrarSesion = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("usuario");

        navigate("/login");

    };


    return (

        <div className="sidebar">

            <h2>
                Einstein
            </h2>


            <nav>


                <Link to="/dashboard">
                    🏠 Dashboard
                </Link>


                <Link to="/estudiantes">
                    👨‍🎓 Estudiantes
                </Link>


                <Link to="/docentes">
                    👨‍🏫 Docentes
                </Link>


                <Link to="/cursos">
                    📚 Cursos
                </Link>


                <Link to="/matriculas">
                    📝 Matrículas
                </Link>


                <Link to="/pagos-estudiantes">
                    💰 Pagos Estudiantes
                </Link>


                <Link to="/pagos-docentes">
                    👨‍🏫 Pagos Docentes
                </Link>


                <Link to="/asistencia">
                    📋 Asistencia
                </Link>


                <Link to="/reportes">
                    📊 Reportes
                </Link>


            </nav>


            <button onClick={cerrarSesion}>
                🚪 Cerrar sesión
            </button>


        </div>

    );

}


export default Sidebar;