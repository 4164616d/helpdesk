from urllib import response
from flask import Flask, jsonify, request, abort
from controllers.databaseController import get_all_normal_users, insert_ticket, get_all_tickets, insert_comment, get_owner_of_ticket, set_ticket_closed, get_all_comments
from flask_expects_json import expects_json
import utils.schema as schema
from controllers.authController import login,register, authorize
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_cors import CORS
from dotenv import load_dotenv
from classes.Ticket import Ticket
from classes.Comment import Comment
import os
from werkzeug.exceptions import HTTPException
import json

app = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": "*"}})
load_dotenv()

limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["200 per day", "20 per hour"]
)

@app.errorhandler(HTTPException)
def handle_exception(e):
    response = e.get_response()
    response.data = json.dumps({
        "code": e.code,
        "name": e.name,
        "description": e.description,
    })
    response.content_type = "application/json"
    return response

@app.errorhandler(429)
def page_not_found(e):
    response = e.get_response()
    response.data = json.dumps({
        "code": e.code,
        "name": e.name,
        "description": "Request limit reached: "+e.description,
    })
    response.content_type = "application/json"
    return response


@app.route('/login', methods=['POST'])
@expects_json(schema.login)
def post_login():
    response = login(request)
    return jsonify(response)

@app.route('/register', methods=['POST'])
@limiter.limit("10 per day")
@expects_json(schema.register)
def post_register():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")
    type = data.get("type", "User")

    adminRegistrationAllowed = os.getenv("ADMIN_REGISTRATION_ALLOWED", 'False').lower() in ('true', '1', 't')
    if(not adminRegistrationAllowed and type=="Admin"):
        abort(403, "Admin Registration Is Disabled")

    register(email, password, type)
    return 'success', 200

# Endpoint for admin to get list of all users
@app.route('/users', methods=['get'])
@authorize
def get_users(user):
  if(user.get_type() =="Admin"):
    return jsonify(get_all_normal_users())
  else:
    abort(403,"Administrator access only")

# Endpoint for user to create a ticket
@app.route('/createticket', methods=['POST'])
@limiter.limit("1 per minute")
@limiter.limit("2 per hour")
@limiter.limit("5 per day")
@authorize
@expects_json(schema.create_ticket)
def post_ticket(user):
  data = request.get_json()

  title = data.get("title")
  description = data.get("description")
  status = "Open"

  ticket = Ticket(title, description, status, user)
  insert_ticket(ticket)
  return 'success', 200

# Endpoint for users to get list of all tickets
@app.route('/tickets', methods=['get'])
@limiter.limit("400 per day")
@authorize
def get_tickets(user):
  return jsonify(get_all_tickets())

# Endpoint for users to get list of all comments
@app.route('/comments', methods=['get'])
@authorize
def get_comments(user):
  return jsonify(get_all_comments())

# Endpoint for user to create a ticket
@app.route('/comment', methods=['POST'])
@authorize
@expects_json(schema.add_comment)
def post_comment(user):
  data = request.get_json()

  text = data.get("text")
  ticket_id = data.get("ticket_id")

  comment = Comment(text, ticket_id, user)
  insert_comment(comment)
  return 'success', 200

# Endpoint for user or admin to update ticket status
@app.route('/ticket/<ticket_id>/closed', methods=['PUT'])
@authorize
def put_ticket_closed(user,ticket_id):
  # Check user is owner or admin of ticket
  if(user.get_type()=="Admin" or user.get_id()==get_owner_of_ticket(ticket_id)):
      set_ticket_closed(ticket_id)
      return 'success', 200
  else:
      abort(403, "You are not the owner of admin of this ticket")
  
