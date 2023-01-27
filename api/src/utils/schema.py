from ast import pattern


register = {
  "type": "object",
  "properties": {
    "email": { "type": "string", "minLength": 5, "maxLength": 100, "pattern": '^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$' },
    "password": { "type": "string", "pattern": "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$" },
    "type": { "type": ["string", "null"], "pattern": "^(Admin|User)$"}
  },
  "required": ["email","password"]
}

login = {
  "type": "object",
  "properties": {
    "email": { "type": "string", "minLength": 5, "maxLength": 100 },
    "password": { "type": "string"}
  },
  "required": ["email","password"]
}

create_ticket = {
  "type": "object",
  "properties": {
    "title": { "type": "string", "minLength": 5, "maxLength": 50 },
    "description": { "type": "string", "minLength": 30, "maxLength": 5000 }
  },
  "required": ["title","description"]
}

add_comment = {
  "type": "object",
  "properties": {
    "text": { "type": "string", "minLength": 5, "maxLength": 5000 },
    "ticket_id": { "type": "number"}
  },
  "required": ["text","ticket_id"]
}