class User:
    id = None
    email = ""
    passwordHash = ""
    token = ""
    signupDate = None
    type = ""

    # Constructor
    def __init__(self, email, passwordHash, type):
        self.email = email
        self.passwordHash = passwordHash
        self.type = type

    def get_email(self):
        return self.email

    def get_passwordHash(self):
        return self.passwordHash

    def get_token(self):
        return self.token

    def get_type(self):
        return self.type

    def set_token(self, token):
        self.token = token

    def set_id(self, id):
        self.id = id

    def get_id(self):
        return self.id
