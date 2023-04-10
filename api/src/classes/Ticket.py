class Ticket:
    title = ""
    description = ""
    status = ""
    user_id = None

    # Constructor
    def __init__(self, title, description, status, user):
        self.title = title
        self.description = description
        self.status = status
        self.user_id = user.get_id()

    def get_title(self):
        return self.title

    def get_description(self):
        return self.description

    def get_status(self):
        return self.status

    def get_user_id(self):
        return self.user_id