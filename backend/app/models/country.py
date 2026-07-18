from sqlalchemy import Column, Integer, String, BigInteger
from app.database.base import Base


class Country(Base):
    __tablename__ = "countries"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    capital = Column(String)
    currency = Column(String)
    population = Column(BigInteger)