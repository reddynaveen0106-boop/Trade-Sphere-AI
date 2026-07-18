from sqlalchemy.orm import Session

from app.models.country import Country
from app.schemas.country import CountryCreate, CountryUpdate


# Create Country
def create_country(db: Session, country: CountryCreate):
    db_country = Country(
        name=country.name,
        capital=country.capital,
        currency=country.currency,
        population=country.population,
    )

    db.add(db_country)
    db.commit()
    db.refresh(db_country)

    return db_country


# Get All Countries
def get_countries(db: Session):
    return db.query(Country).all()


# Get Country by ID
def get_country_by_id(db: Session, country_id: int):
    return db.query(Country).filter(Country.id == country_id).first()


# Update Country
def update_country(db: Session, country_id: int, country: CountryUpdate):
    db_country = db.query(Country).filter(Country.id == country_id).first()

    if db_country is None:
        return None

    db_country.name = country.name
    db_country.capital = country.capital
    db_country.currency = country.currency
    db_country.population = country.population

    db.commit()
    db.refresh(db_country)

    return db_country