from flask import Blueprint, request, jsonify
from conexion import obtener_conexion

estudiante_bp = Blueprint(
    "estudiante",
    __name__,
    url_prefix="/api/estudiantes"
)


# ===============================
# REGISTRAR ESTUDIANTE
# ===============================
@estudiante_bp.route("/", methods=["POST"])
def registrar_estudiante():

    datos = request.json

    conexion = obtener_conexion()
    cursor = conexion.cursor()

    cursor.callproc(
        "sp_registrar_estudiante",
        [
            datos["DNI"],
            datos["nombres"],
            datos["apellidos"],
            datos["fecha_nacimiento"],
            datos["telefono"],
            datos["correo"],
            datos["direccion"]
        ]
    )

    conexion.commit()

    cursor.close()
    conexion.close()

    return jsonify({
        "mensaje": "Estudiante registrado correctamente"
    }),201



# ===============================
# LISTAR ESTUDIANTES
# ===============================
@estudiante_bp.route("/", methods=["GET"])
def listar_estudiantes():

    conexion = obtener_conexion()

    cursor = conexion.cursor(dictionary=True)


    cursor.callproc(
        "sp_listar_estudiantes"
    )


    estudiantes = []

    for resultado in cursor.stored_results():

        estudiantes = resultado.fetchall()


    cursor.close()
    conexion.close()


    return jsonify(estudiantes)



# ===============================
# BUSCAR ESTUDIANTE
# ===============================
@estudiante_bp.route("/buscar/<dato>", methods=["GET"])
def buscar_estudiante(dato):

    conexion = obtener_conexion()

    cursor = conexion.cursor(dictionary=True)


    cursor.callproc(
        "sp_buscar_estudiante",
        [dato]
    )


    estudiantes=[]


    for resultado in cursor.stored_results():

        estudiantes = resultado.fetchall()



    cursor.close()
    conexion.close()


    return jsonify(estudiantes)

# ===============================
# ACTUALIZAR ESTUDIANTE
# ===============================
@estudiante_bp.route("/<int:id_estudiante>", methods=["PUT"])
def actualizar_estudiante(id_estudiante):

    datos = request.json

    conexion = obtener_conexion()
    cursor = conexion.cursor()

    cursor.callproc(
        "sp_actualizar_estudiante",
        [
            id_estudiante,
            datos["DNI"],
            datos["nombres"],
            datos["apellidos"],
            datos["fecha_nacimiento"],
            datos["telefono"],
            datos["correo"],
            datos["direccion"],
            datos["estado_estudiante"]
        ]
    )

    conexion.commit()

    cursor.close()
    conexion.close()

    return jsonify({
        "mensaje": "Estudiante actualizado correctamente"
    })
    
    
# ===============================
# RETIRAR ESTUDIANTE
# ===============================
@estudiante_bp.route("/<int:id_estudiante>", methods=["DELETE"])
def eliminar_estudiante(id_estudiante):

    conexion = obtener_conexion()
    cursor = conexion.cursor()

    cursor.callproc(
        "sp_eliminar_estudiante",
        [
            id_estudiante
        ]
    )

    conexion.commit()

    cursor.close()
    conexion.close()

    return jsonify({
        "mensaje":"Estudiante retirado correctamente"
    })