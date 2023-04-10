from src.classes.User import User
from src.classes.Comment import Comment


def test_user_class():
    email = "example@example.com"
    passwordHash = "1234"
    type = "admin"
    user = User(email, passwordHash, type)

    assert user.get_email() is email
    assert user.get_passwordHash() is passwordHash
    assert user.get_type() is type


def test_Comment_class():
    email = "example@example.com"
    passwordHash = "1234"
    type = "admin"
    user = User(email, passwordHash, type)
    user.set_id(1)

    text = "comment text"
    ticket_id = 45323
    commet = Comment(text, ticket_id, user)

    assert commet.get_text() is text
    assert commet.get_user_id() == 1
    assert commet.get_ticket_id() == 45323
