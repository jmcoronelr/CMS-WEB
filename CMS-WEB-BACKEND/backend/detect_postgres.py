import time
import psycopg2
import os

"""
Función para detectar si el servidor de postgres ya esta en curso para evitar
que la api intente conectarse antes de que postgres haya inicializado
"""
def check_postgres():
    try:
        # Intentar conectar a la base de datos usando los parámetros de settings
        conn = psycopg2.connect(
            dbname='Django',
            user='postgres',
            password=os.getenv('POSTGRES_KEY'),
            host='database',
            port=5432
        )
        conn.autocommit = True  # Necesario para ejecutar comandos como LIST DATABASES

        # Crear un cursor para ejecutar consultas
        cursor = conn.cursor()
        
        # Verificar si la base de datos 'Django' existe
        cursor.execute("SELECT 1 FROM pg_database WHERE datname = 'Django'")
        db_exists = cursor.fetchone()
        
        cursor.close()
        conn.close()
        
        return db_exists is not None
        
    except psycopg2.OperationalError:
        return False

def main():
    print("Checking PostgreSQL...")
    while not check_postgres():
        print("PostgreSQL is not available. Retrying in 5 seconds...")
        time.sleep(5)
    print("PostgreSQL is up and running!")

if __name__ == "__main__":
    main()