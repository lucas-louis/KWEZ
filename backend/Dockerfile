FROM python:alpine3.19

# Set the working directory
WORKDIR /app

# Copy source (see .dockerignore)
COPY . .

# Install dependencies
RUN pip install -r requirements.txt

ENV PORT 8080

CMD ["python", "app.py"]
