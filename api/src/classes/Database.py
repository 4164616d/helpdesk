from ast import While
from mysql.connector import connect
from flask import abort
import os
from dotenv import load_dotenv
import time
load_dotenv()
class Database:
    connection = None
    cursor = None
    connection_attemps = 0

    def __init__(self):
        if(self.connection_attemps<6):
            self.connection_attemps += 1
            print("Connecting to SQL Server. Attempt:", self.connection_attemps)
            try:
                self.connection = connect(
                    host=os.getenv('DB_ADDRESS'),
                    user=os.getenv('DB_USER'),
                    password=os.getenv('DB_PASSWORD'),
                    database=os.getenv('DB_DATABASE'))
                if self.connection.is_connected():
                    self.cursor = self.connection.cursor()
                    self.cursor.execute("select database();")
                    record = self.cursor.fetchone()
                    print("Connected to", record)
            except:
                print("Connection error, waiting:", (self.connection_attemps+1)**2, " seconds")
                time.sleep((self.connection_attemps+1)**2)
                self.__init__()
        else:
            return abort(500, "Could not connect to SQL server")

    def check_connection(self):
        if(not self.connection.is_connected()):
            self.__init__()

    #Insert single ticket
    def insert_into_tickets(self, title,description,status,user_id):
        self.check_connection()
        insert_ticket_query = "INSERT INTO Tickets (title, description, status, user_id) VALUES (%s,%s,%s,%s)"
        self.cursor.execute(insert_ticket_query, (title, description, status, user_id))
        self.connection.commit()

    #Insert single user
    def insert_into_users(self, email,password,type):
        self.check_connection()
        insert_user_query = "INSERT INTO Users (email, password,type) VALUES (%s,%s,%s)"
        self.cursor.execute(insert_user_query, (email,password,type))
        self.connection.commit()

    #Insert single comment
    def insert_into_comments(self, text,ticket_id,user_id):
        self.check_connection()
        insert_comment_query = "INSERT INTO Comments (text, ticket_id, user_id) VALUES (%s,%s,%s)"
        self.cursor.execute(insert_comment_query, (text,ticket_id,user_id))
        self.connection.commit()

    #Get single user with email
    def get_user_with_email(self, email):
        self.check_connection()
        select_customers_query = "SELECT * FROM Users WHERE email = %s"
        self.cursor.execute(select_customers_query, (email,))
        return self.parse_result(self.cursor)[0]
    
    #Get all users with email
    def get_users_with_email(self, email):
        self.check_connection()
        select_customers_query = "SELECT * FROM Users WHERE email = %s"
        self.cursor.execute(select_customers_query, (email,))
        return self.parse_result(self.cursor)
    
    #Get all nromal users
    def get_normal_users(self):
        self.check_connection()
        select_customers_query = "SELECT id, email, signupDate FROM Users WHERE type='User'"
        self.cursor.execute(select_customers_query)
        return self.parse_result(self.cursor)
    
    #Get all users
    def get_users(self):
        self.check_connection()
        select_users_query = "SELECT id, email, signupDate FROM Users"
        self.cursor.execute(select_users_query)
        return self.parse_result(self.cursor)
    
    #Get specific ticket
    def get_ticket_with_id(self, id):
        self.check_connection()
        select_ticket_query = "SELECT * FROM Tickets WHERE id = %s"
        self.cursor.execute(select_ticket_query, (id,))
        return self.parse_result(self.cursor)[0]

    #Update specific ticket status
    def update_status_of_ticket(self, id,status):
        self.check_connection()
        update_ticket_query = "UPDATE Tickets SET status=%s WHERE id = %s"
        self.cursor.execute(update_ticket_query, (status,id))

    #Get all tickets
    def get_all_tickets(self):
        self.check_connection()
        select_tickets_query = "SELECT t.id, t.title, t.description, t.description, t.status, u.email FROM Tickets t INNER JOIN Users u ON u.id=t.user_id"
        self.cursor.execute(select_tickets_query)
        return self.parse_result(self.cursor)

    #Get all comments
    def get_all_comments(self):
        self.check_connection()
        select_comments_query = "SELECT c.id, c.text, c.timestamp, c.ticket_id, c.user_id, u.email FROM Comments c INNER JOIN Users u ON u.id=c.user_id"
        self.cursor.execute(select_comments_query)
        return self.parse_result(self.cursor)

    # Database utils
    def parse_result(self, cur):
        row_headers=[x[0] for x in cur.description]
        rv = cur.fetchall()
        json_data=[]
        for result in rv:
             json_data.append(dict(zip(row_headers,result)))
        return json_data
        