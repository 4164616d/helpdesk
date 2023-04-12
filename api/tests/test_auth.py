# flake8-in-file-ignores: noqa: E501

from src.controllers.authController import generateFingerprint, hashPassword, passwordIsCorrect


class Headers(object):

    def __init__(self):
        self.headers = {}

    def get(self, headerName):
        return self.headers[headerName]

    def set(self, headerName, value):
        self.headers[headerName] = value


headers = Headers()


class request():
    remote_addr = "123.456.789.10"
    headers = headers


def test_fingerprint():
    headers.set(
        "User-Agent",
        "Mozilla/5.0 (X11; CrOS x86_64 8172.45.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.64 Safari/537.36"
    )

    response = generateFingerprint(request)
    assert response > 10000000000000


def test_passwordhash():
    password = "password1234"
    hashedPassword = hashPassword(password)

    response = passwordIsCorrect(password, hashedPassword.decode('utf8'))
    assert response is True
