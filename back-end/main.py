import os
import logging
import mysql.connector
from fastapi import FastAPI, Form, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware

class App:
    def __init__(self):
        self.app = FastAPI(debug=True)
        self.logger = logging.getLogger("uvicorn")
        self.logger.level = logging.INFO
        self.origins = [os.environ.get('FRONT_URL', "http://localhost:3000")]
        
        self.app.add_middleware(
            CORSMiddleware,
            allow_origins=self.origins,
            allow_credentials=False,
            allow_methods=["GET", "POST", "PUT", "DELETE"],
            allow_headers=["*"],
        )

        self.db = self.connect_to_database()
        
    def connect_to_database(self):
        db = mysql.connector.connect(
            host=os.environ.get("DB_HOST", "localhost"),
            port=int(os.environ.get("DB_PORT", 3306)),
            user=os.environ.get("DB_USER"),
            password=os.environ.get("DB_PASSWORD"),
            database=os.environ.get("DB_NAME")
        )

        return db
       
    def root(self):
        return {"message": "Hello, world!"}
    
    def preview(self):
        query = "SELECT * FROM your_table_name LIMIT 5"
        with self.db.cursor() as cursor:
            cursor.execute(query)
            results = cursor.fetchall()
        return results
    

def main():
    app_instance = App()
    app = app_instance.app

    app.get("/")(app_instance.root)
    app.get("/preview")(app_instance.preview)
    
    return app

app = main()

# $ uvicorn main:app --reload --port 9000