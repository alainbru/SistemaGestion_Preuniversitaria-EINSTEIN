from flask import Blueprint, request, jsonify
from conexion import obtener_conexion

docente_bp = Blueprint(
    "docente",
    __name__,
    url_prefix="/api/docentes"
)


# ===============================
# REGISTRAR DOCENTE
# ===============================
@docente_bp.route("/", methods=["POST"])
def registrar_docente():

    datos = request.json

    conexion = obtener_conexion()
    cursor = conexion.cursor()

    cursor.callproc(
        "sp_registrar_docente",
        [
            datos["DNI"],
            datos["nombres"],
            datos["apellidos"],
            datos["especialidad"],
            datos["telefono"],
            datos["correo"]
        ]
    )

    conexion.commit()

    cursor.close()
    conexion.close()

    return jsonify({
        "mensaje": "Docente registrado correctamente"
    }),201



# ===============================
# LISTAR DOCENTES
# ===============================
@docente_bp.route("/", methods=["GET"])
def listar_docentes():

    conexion = obtener_conexion()

    cursor = conexion.cursor(dictionary=True)

    cursor.callproc(
        "sp_listar_docentes"
    )

    docentes = []

    for resultado in cursor.stored_results():
        docentes = resultado.fetchall()


    cursor.close()
    conexion.close()

    return jsonify(docentes)



# ===============================
# BUSCAR DOCENTE
# ===============================
@docente_bp.route("/buscar/<dato>", methods=["GET"])
def buscar_docente(dato):

    conexion = obtener_conexion()

    cursor = conexion.cursor(dictionary=True)


    cursor.callproc(
        "sp_buscar_docente",
        [dato]
    )


    docentes = []

    for resultado in cursor.stored_results():
        docentes = resultado.fetchall()


    cursor.close()
    conexion.close()


    return jsonify(docentes)



# ===============================
# OBTENER DOCENTE POR ID
# ===============================
@docente_bp.route("/<int:id_docente>", methods=["GET"])
def obtener_docente(id_docente):

    conexion = obtener_conexion()

    cursor = conexion.cursor(dictionary=True)


    cursor.callproc(
        "sp_obtener_docente",
        [id_docente]
    )


    docente = None


    for resultado in cursor.stored_results():
        docente = resultado.fetchone()


    cursor.close()
    conexion.close()


    if docente:

        return jsonify(docente)


    return jsonify({
        "mensaje":"Docente no encontrado"
    }),404



# ===============================
# ACTUALIZAR DOCENTE
# ===============================
@docente_bp.route("/<int:id_docente>", methods=["PUT"])
def actualizar_docente(id_docente):

    datos = request.json

    conexion = obtener_conexion()

    cursor = conexion.cursor()


    cursor.callproc(
        "sp_actualizar_docente",
        [
            id_docente,
            datos["DNI"],
            datos["nombres"],
            datos["apellidos"],
            datos["especialidad"],
            datos["telefono"],
            datos["correo"]
        ]
    )


    conexion.commit()


    cursor.close()
    conexion.close()


    return jsonify({
        "mensaje":"Docente actualizado correctamente"
    })



# ===============================
# RETIRAR DOCENTE
# ===============================
@docente_bp.route("/<int:id_docente>", methods=["DELETE"])
def retirar_docente(id_docente):

    conexion = obtener_conexion()

    cursor = conexion.cursor()


    cursor.callproc(
        "sp_retirar_docente",
        [
            id_docente
        ]
    )


    conexion.commit()


    cursor.close()
    conexion.close()


    return jsonify({
        "mensaje":"Docente retirado correctamente"
    })