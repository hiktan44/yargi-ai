FROM python:3.12-slim

WORKDIR /app

# Install uv
RUN pip install uv

# Copy project files
COPY . .

# Install dependencies
RUN uv pip install --system uvicorn

# Expose port
EXPOSE 8000

# Run the application
CMD ["uvicorn", "backend.asgi_app:app", "--host", "0.0.0.0", "--port", "8000"]
