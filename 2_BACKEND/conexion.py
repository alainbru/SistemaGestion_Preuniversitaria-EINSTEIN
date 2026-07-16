import mysql.connector
from mysql.connector import Error

def obtener_conexion():
    try:
        conexion = mysql.connector.connect(
            host="localhost",
            port=3306,
            user="root",
            password="603030GIMENA",
            database="academia_einstein"
        )

        if conexion.is_connected():
            return conexion

    except Error as e:
        print(f"Error al conectar con MySQL: {e}")
        return None