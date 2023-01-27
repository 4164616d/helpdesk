# Using lightweight alpine image
FROM python:3.10-alpine

# Installing packages
RUN apk update
RUN apk add --no-cache python3-dev musl-dev openssl-dev libffi-dev gcc && pip3 install --upgrade pip
RUN pip install --no-cache-dir pipenv

# Defining working directory and adding source code
WORKDIR /usr/src/app
COPY Pipfile run.sh ./
COPY src ./src

# Install API dependencies
RUN pipenv install
RUN ["chmod", "+x", "/usr/src/app/run.sh"]

# Start app
EXPOSE 5000
ENTRYPOINT ["/usr/src/app/run.sh"]