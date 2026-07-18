from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.database.base import Base
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# Create engine
engine = create_engine(DATABASE_URL)

# Test connection
try:
    with engine.connect() as connection:
        print("✅ Successfully connected to PostgreSQL!")
except Exception as e:
    print("❌ Connection failed:")
    print(e)

# Session factory
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

from app.models.country import Country

Base.metadata.create_all(bind=engine)

from app.models.country import Country

print(Base.metadata.tables.keys())

Base.metadata.create_all(bind=engine)