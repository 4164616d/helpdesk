# flake8-in-file-ignores: noqa: E501

from src.utils.schema import register
import re


def test_email_schema():
    email_regex = re.compile(register['properties']["email"]["pattern"])

    # Valid Email Inputs
    assert email_regex.match("bob@email.com") is not None
    assert email_regex.match("adsadasdasdsad@email.uk") is not None
    assert email_regex.match("1231232543.dafhsb@email.co.uk") is not None
    assert email_regex.match("abc123@email.com.uk.com") is not None

    # Invalid Email Inputs
    assert email_regex.match("bobemail.com") is None
    assert email_regex.match("bobemail") is None
    assert email_regex.match("@bob.mail") is None
    assert email_regex.match("@bob.mail.com") is None
    assert email_regex.match("a@b") is None


def test_password_schema():
    password_regex = re.compile(register['properties']["password"]["pattern"])

    # Valid Password Inputs
    assert password_regex.match("Password1234!") is not None
    assert password_regex.match("ALongPassword123456789!") is not None

    # Invalid Password Inputs
    assert password_regex.match("Password1234") is None
    assert password_regex.match("Password!") is None
    assert password_regex.match("password1234!") is None
    assert password_regex.match("password!") is None
    assert password_regex.match("P1!") is None
    assert password_regex.match("ALongPassword123456789") is None
    assert password_regex.match("ALongPassword!") is None
    assert password_regex.match("alongpassword123456789!") is None


def test_type_schema():
    type_regex = re.compile(register['properties']["type"]["pattern"])

    # Valid Type Inputs
    assert type_regex.match("User") is not None
    assert type_regex.match("Admin") is not None

    # Invalid Type Inputs
    assert type_regex.match("user") is None
    assert type_regex.match("admin") is None
    assert type_regex.match("god") is None
    assert type_regex.match("owner") is None
    assert type_regex.match("manager") is None
    assert type_regex.match("1234") is None
