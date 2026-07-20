from sqlalchemy import Column, Integer, String, BigInteger
from app.database.base import Base


class Country(Base):
    __tablename__ = "countries"

    id = Column(Integer, primary_key=True, index=True)

    # Basic Information
    name = Column(String, nullable=False)
    code = Column(String(3), unique=True, nullable=False)
    flag = Column(String(10))
    capital = Column(String)
    currency = Column(String)
    population = Column(BigInteger)

    # Trade Information
    gdp = Column(String)
    imports = Column(String)
    exports = Column(String)
    top_commodity = Column(String)
    risk_level = Column(String)
    trade_rank = Column(Integer)