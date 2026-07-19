from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager


#-----------MODULOS----------------
from routes.usuarios import usuario_bp
from routes.estudiantes import estudiante_bp
from routes.docente import docente_bp
from routes.asignacion import asignacion_bp
from routes.curso import curso_bp
from routes.ciclo import ciclo_bp
from routes.grupo import grupo_bp
from routes.horario import horario_bp
from routes.matricula import matricula_bp
from routes.asistencia import asistencia_bp
from routes.evaluacion import evaluacion_bp
from routes.calificacion import calificacion_bp
from routes.pago_estudiante import pago_estudiante_bp
from routes.pago_docente import pago_docente_bp
from routes.reporte import reportes_bp


app = Flask(__name__)
CORS(app)

# Configuración de JWT (Debe ir antes de inicializar JWTManager)
app.config["JWT_SECRET_KEY"] = "academia_einstein_secret"
jwt = JWTManager(app)

# Registrar módulos de rutas
app.register_blueprint(usuario_bp)
app.register_blueprint(estudiante_bp)
app.register_blueprint(docente_bp)
app.register_blueprint(asignacion_bp)
app.register_blueprint(curso_bp)
app.register_blueprint(ciclo_bp)
app.register_blueprint(grupo_bp)
app.register_blueprint(horario_bp)
app.register_blueprint(matricula_bp)
app.register_blueprint(asistencia_bp)
app.register_blueprint(evaluacion_bp)
app.register_blueprint(calificacion_bp)
app.register_blueprint(pago_estudiante_bp)
app.register_blueprint(pago_docente_bp)
app.register_blueprint(reportes_bp)

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