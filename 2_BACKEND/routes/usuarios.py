from flask import Blueprint, request, jsonify
from conexion import obtener_conexion
from flask_jwt_extended import create_access_token

usuario_bp = Blueprint(
    "usuario",
    __name__,
    url_prefix="/api/usuarios"
)


# LOGIN
@usuario_bp.route("/login", methods=["POST"])
def login():
    datos = request.json
    nombre_usuario = datos["nombre_usuario"]
    contraseña = datos["contraseña"]
    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)
    # MODIFICABLE:
    # Aquí llamamos al procedure creado en MySQL
    cursor.callproc(
        "sp_login_usuario",
        [nombre_usuario]
    )

    usuario = None

    for resultado in cursor.stored_results():
        usuario = resultado.fetchone()
    cursor.close()
    conexion.close()
    if usuario:

        if usuario["contraseña"] == contraseña:

            token = create_access_token(
                identity={
                    "id_usuario": usuario["id_usuario"],
                    "rol": usuario["rol"]
                }
            )

            return jsonify({
                "mensaje": "Login correcto",
                "token": token,
                "usuario": usuario
            })

        else:
            return jsonify({
                "mensaje": "Contraseña incorrecta"
            }),401

    return jsonify({
        "mensaje": "Usuario no encontrado"
    }),404