import { Link, useNavigate } from "react-router-dom";
import "../App.css";


function Sidebar(){

    const navigate = useNavigate();


    const cerrarSesion = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("usuario");

        navigate("/login");

    };


    return (

        <aside className="sidebar">


            <div className="sidebar-logo">

                <h2>
                    Einstein
                </h2>

            </div>



            <nav className="sidebar-menu">


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


                <Link to="/historial-pagos">
                    💳 Historial Pagos
                </Link>


            </nav>



            <button 
                className="btn-logout"
                onClick={cerrarSesion}
            >

                🚪 Cerrar sesión

            </button>


        </aside>

    );

}


export default Sidebar;