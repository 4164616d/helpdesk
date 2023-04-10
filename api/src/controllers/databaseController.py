# flake8-in-file-ignores: noqa: E722

from classes.Database import Database
from flask import abort
from classes.User import User

db = Database()


# Users
def get_user(email):
    try:
        userJson = db.get_user_with_email(email)
        passwordHash = userJson.get("password")
        type = userJson.get("type")
        user = User(email, passwordHash, type)
        user.set_id(userJson.get("id"))
        return user
    except:
        abort(401, "Incorrect email or password")


def insert_user(user):
    email = user.get_email()
    password = user.get_passwordHash()
    type = user.get_type()

    db.insert_into_users(email, password, type)


def emailIsRegistered(email):
    users = db.get_users_with_email(email)
    return len(users) > 0


def get_all_normal_users():
    customers = db.get_normal_users()
    return customers


def get_all_users():
    customers = db.get_users()
    return customers


# Tickets
def insert_ticket(ticket):
    title = ticket.get_title()
    description = ticket.get_description()
    status = ticket.get_status()
    user_id = ticket.get_user_id()

    db.insert_into_tickets(title, description, status, user_id)


def get_all_tickets():
    comments = db.get_all_comments()
    tickets = db.get_all_tickets()
    for ticket in tickets:
        ticket["comments"] = list(
            filter(lambda x: x["ticket_id"] == ticket["id"], comments))
    return tickets


def get_all_comments():
    comments = db.get_all_comments()
    return comments


def get_owner_of_ticket(ticket_id):
    ticket = db.get_ticket_with_id(ticket_id)
    return ticket["user_id"]


def set_ticket_closed(ticket_id):
    db.update_status_of_ticket(ticket_id, "Closed")


# Comments
def insert_comment(comment):
    text = comment.get_text()
    ticket_id = comment.get_ticket_id()
    user_id = comment.get_user_id()

    db.insert_into_comments(text, ticket_id, user_id)
