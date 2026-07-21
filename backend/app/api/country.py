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
    get_country_by_code,
    compare_countries,
    get_trade_risk,
    get_trade_statistics,
    search_countries,
    filter_countries,
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
def read_countries(
    sort: str = None,
    order: str = "asc",
    page: int = 1,
    limit: int = 10,
    db: Session = Depends(get_db),
):
    return get_countries(
        db=db,
        sort=sort,
        order=order,
        page=page,
        limit=limit,
    )
# Search Countries
@router.get("/countries/search", response_model=list[CountryResponse])
def search_country(
    name: str = None,
    capital: str = None,
    commodity: str = None,
    db: Session = Depends(get_db),
):
    return search_countries(
        db=db,
        name=name,
        capital=capital,
        commodity=commodity,
    )


# Filter Countries
@router.get("/countries/filter", response_model=list[CountryResponse])
def filter_country(
    risk: str = None,
    tradeRank: int = None,
    db: Session = Depends(get_db),
):
    return filter_countries(
        db=db,
        risk=risk,
        trade_rank=tradeRank,
    )


# Get Country by Code
@router.get("/countries/code/{country_code}", response_model=CountryResponse)
def read_country_by_code(
    country_code: str,
    db: Session = Depends(get_db),
):
    country = get_country_by_code(db, country_code)

    if country is None:
        raise HTTPException(
            status_code=404,
            detail="Country not found"
        )

    return country


# Compare Two Countries
@router.get("/countries/compare")
def compare_country_data(
    country1: str,
    country2: str,
    db: Session = Depends(get_db),
):
    result = compare_countries(db, country1, country2)

    if result is None:
        raise HTTPException(
            status_code=404,
            detail="One or both countries not found"
        )

    return result


# Trade Risk Analysis
@router.get("/countries/risk/{country_code}")
def trade_risk_analysis(
    country_code: str,
    db: Session = Depends(get_db),
):
    result = get_trade_risk(db, country_code)

    if result is None:
        raise HTTPException(
            status_code=404,
            detail="Country not found"
        )

    return result


# Trade Statistics Dashboard
@router.get("/countries/stats")
def trade_statistics(
    db: Session = Depends(get_db),
):
    return get_trade_statistics(db)


# Get Country by ID
@router.get("/countries/{country_id}", response_model=CountryResponse)
def read_country(
    country_id: int,
    db: Session = Depends(get_db),
):
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
def remove_country(
    country_id: int,
    db: Session = Depends(get_db),
):
    deleted_country = delete_country(db, country_id)

    if deleted_country is None:
        raise HTTPException(
            status_code=404,
            detail="Country not found"
        )

    return {
        "message": "Country deleted successfully"
    }