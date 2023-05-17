import os
import logging
import pymysql
from fastapi import FastAPI, Path, Query
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(debug=True)

logger = logging.getLogger("uvicorn")
logger.level = logging.INFO
origins = [os.environ.get('FRONT_URL', "http://localhost:3000")]
        
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

def connect_to_database():
    db = pymysql.connect(
        host=os.environ.get("DB_HOST", "localhost"),
        port=int(os.environ.get("DB_PORT", 3306)),
        user=os.environ.get("DB_USER","root"),
        password=os.environ.get("DB_PASSWORD"),
        database=os.environ.get("DB_NAME")
    )

    return db

db = connect_to_database()

@app.get("/")
async def root():
    return {"message": "Hello, world!"}

@app.get("/office_hour_course/{course_num}")
async def get_oh_course(course_num: str):
    query = '''
        select name as student_name, 
        case day_of_week 
            when '1' then 'Sunday'
            when '2' then 'Monday'
            when '3' then 'Tuesday'
            when '4' then 'Wednesday'
            when '5' then 'Thursday'
            when '6' then 'Friday'
            when '7' then 'Saturday'
        end as 'day', 
        start_time, end_time, 
        ifnull(room,'No room assigned') as room, 
        ifnull(zoomlink,"No link available") as zoomlink 
        from course 
        left join TA using (course_id) 
        left join student using (student_id)
        left join office_hour using (Ta_id)
        where course_num = %s
        order by course_num, day_of_week, start_time, end_time;
    '''
    with db.cursor() as cursor:
        cursor.execute(query, (course_num,))
        results = cursor.fetchall()
    return results

@app.get("/office_hour_student/{student_name}")
async def get_oh_student(student_name: str):
    query = '''
        select course_num, TAinformation.name as 'TA_Name', case day_of_week 
        when '1' then 'Sunday'
        when '2' then 'Monday'
        when '3' then 'Tuesday'
        when '4' then 'Wednesday'
        when '5' then 'Thursday'
        when '6' then 'Friday'
        when '7' then 'Saturday'
        end as 'day',
            start_time, end_time, ifnull(room,'No room assigned') as room_information, ifnull(zoomlink,"No link available") as 'Link'
            from student
        left join enrollment using (student_id)
        left join course using (course_id)
        left join TA using (course_id)
        left join office_hour using (TA_id)
        left join student as TAinformation on TAinformation.student_id = TA.student_id
        where student.name = %s
        order by course_num, day_of_week, start_time, end_time;
    '''
    with db.cursor() as cursor:
        cursor.execute(query, (student_name,))
        results = cursor.fetchall()
    return results

@app.get("/exactoh")
async def get_office_hour(course_num: str = Query(...), TA_name: str = Query(...)):
    query = '''
        select course_num, TAstudent.name as 'TA_Name', case day_of_week 
        when '1' then 'Sunday'
        when '2' then 'Monday'
        when '3' then 'Tuesday'
        when '4' then 'Wednesday'
        when '5' then 'Thursday'
        when '6' then 'Friday'
        when '7' then 'Saturday'
        end as 'day',
        start_time, end_time, ifnull(room,'No room assigned') as room_information, ifnull(zoomlink,"No link available") as 'Link'
        from student 
        left join ta using (student_id)
        left join student as TAstudent on TAstudent.student_id = ta.student_id
        left join course using (course_id)
        left join office_hour using (ta_id)
        where course_num = %s and TAstudent.name = %s
        order by course_num, day_of_week, start_time, end_time;
    '''
    print(query, (course_num,TA_name))
    with db.cursor() as cursor:
        cursor.execute(query, (course_num,TA_name))
        results = cursor.fetchall()
    return results

@app.get("/student")
async def getStudent():
    query = '''
        select * from student;
    '''
    with db.cursor() as cursor:
        cursor.execute(query)
        results = cursor.fetchall()
    return results

@app.get("/course")
async def getCourse():
    query = '''
        select course_id, course_num from course;
    '''
    with db.cursor() as cursor:
        cursor.execute(query)
        results = cursor.fetchall()
    return results

# $ uvicorn main:app --reload --port 9000
