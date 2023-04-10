class Comment:
    text = ""
    user_id = None
    ticket_id = None

    # Constructor
    def __init__(self, text, ticket_id, user):
        self.text = text
        self.ticket_id = ticket_id
        self.user_id = user.get_id()

    def get_text(self):
        return self.text

    def get_user_id(self):
        return self.user_id

    def get_ticket_id(self):
        return self.ticket_id
