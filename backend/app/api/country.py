from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.country import (
    CountryCreate,
    CountryUpdate,
    CountryResponse,
)
from app.crud.country import (
    create_country,
    get_countries,
    get_country_by_id,
    update_country,
    delete_country,
)

router = APIRouter()


# Create Country
@router.post("/countries", response_model=CountryResponse)
def add_country(country: CountryCreate, db: Session = Depends(get_db)):
    return create_country(db, country)


# Get All Countries
@router.get("/countries", response_model=list[CountryResponse])
def read_countries(db: Session = Depends(get_db)):
    return get_countries(db)

# Get Country by ID
@router.get("/countries/{country_id}", response_model=CountryResponse)
def read_country(country_id: int, db: Session = Depends(get_db)):
    country = get_country_by_id(db, country_id)

    if country is None:
        raise HTTPException(
            status_code=404,
            detail="Country not found"
        )

    return country


# Update Country
@router.put("/countries/{country_id}", response_model=CountryResponse)
def edit_country(
    country_id: int,
    country: CountryUpdate,
    db: Session = Depends(get_db),
):
    updated_country = update_country(db, country_id, country)

    if updated_country is None:
        raise HTTPException(
            status_code=404,
            detail="Country not found"
        )

    return updated_country


# Delete Country
@router.delete("/countries/{country_id}")
def remove_country(country_id: int, db: Session = Depends(get_db)):
    deleted_country = delete_country(db, country_id)

    if deleted_country is None:
        raise HTTPException(
            status_code=404,
            detail="Country not found"
        )

    return {
        "message": "Country deleted successfully"
    }