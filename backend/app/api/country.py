from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.country import CountryCreate
from app.crud.country import (
    create_country,
    get_countries,
    get_country_by_id,
)

router = APIRouter()


@router.post("/countries")
def add_country(country: CountryCreate, db: Session = Depends(get_db)):
    return create_country(db, country)


@router.get("/countries")
def read_countries(db: Session = Depends(get_db)):
    return get_countries(db)


@router.get("/countries/{country_id}")
def read_country(country_id: int, db: Session = Depends(get_db)):
    return get_country_by_id(db, country_id)