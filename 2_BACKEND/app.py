from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

#-----------MODULOS----------------
from routes.usuarios import usuario_bp
from routes.estudiantes import estudiante_bp


app = Flask(__name__)
CORS(app)

# Configuración de JWT (Debe ir antes de inicializar JWTManager)
app.config["JWT_SECRET_KEY"] = "academia_einstein_secret"
jwt = JWTManager(app)

# Registrar módulos de rutas (Solo una vez)
app.register_blueprint(usuario_bp)
app.register_blueprint(estudiante_bp)

# Clave para firmar tokens
app.config["JWT_SECRET_KEY"] = "academia_einstein_secret"

#-------------------------------------------------
@app.route("/")
def inicio():
    return {
        "mensaje": "API Academia Einstein funcionando"
    }
#-----------------------------------------------

if __name__ == "__main__":
    app.run(debug=True)