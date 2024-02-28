FROM python:alpine3.19

# Set the working directory
WORKDIR /app

COPY requirements.txt .

# Install dependencies
RUN pip install -r requirements.txt

# Copy source (see .dockerignore)
COPY . .

ENV PORT 8080

CMD ["python", "app.py"]
