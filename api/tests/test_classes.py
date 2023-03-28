from src.classes.User import User

def test_user_class():
    email = "example@example.com"
    passwordHash = "1234"
    type = "admin"
    user = User(email,passwordHash,type)

    assert user.get_email() is email
    assert user.get_passwordHash() is passwordHash
    assert user.get_type() is type

def test_user_class():
    email = "example@example.com"
    passwordHash = "1234"
    type = "admin"
    user = User(email,passwordHash,type)

    assert user.get_email() is email
    assert user.get_passwordHash() is passwordHash
    assert user.get_type() is type