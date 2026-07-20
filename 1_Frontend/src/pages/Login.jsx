import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

function Login(){
    const navigate = useNavigate();
    const [usuario,setUsuario] = useState("");
    const [password,setPassword] = useState("");
    const iniciarSesion = async(e)=>{

        e.preventDefault();
        try{

            const respuesta = await api.post("/usuarios/login", {

                nombre_usuario: usuario,
                contraseña: password

            });

            console.log(respuesta.data);
            localStorage.setItem("token", respuesta.data.token);
            localStorage.setItem("usuario", JSON.stringify(respuesta.data.usuario));
            alert("Login correcto");

            navigate("/dashboard");

            // guardar token
            localStorage.setItem(
                "token",
                respuesta.data.token
            );
        }
        catch(error){
            console.log(error);
            alert("Usuario o contraseña incorrectos");

        }
    }
    return(
        <div className="login-container">
            <div className="login-card">
                <h1>
                    Academia Einstein
                </h1>
                <h3>
                    Inicio de Sesión
                </h3>
                <form onSubmit={iniciarSesion}>
                    <label>Usuario</label>
                    <input
                    type="text"
                    value={usuario}
                    onChange={
                        (e)=>setUsuario(e.target.value)
                    }
                    />
                    <label>Contraseña</label>
                    <input
                    type="password"
                    value={password}
                    onChange={
                        (e)=>setPassword(e.target.value)
                    }

                    />
                    <button>Ingresar</button>
                </form>
            </div>

        </div>
    )
}


export default Login;