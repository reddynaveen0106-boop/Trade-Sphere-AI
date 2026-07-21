from sqlalchemy import asc, desc
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.country import Country
from app.schemas.country import CountryCreate, CountryUpdate


# Create Country
def create_country(db: Session, country: CountryCreate):
    db_country = Country(
        name=country.name,
        code=country.code,
        flag=country.flag,
        capital=country.capital,
        currency=country.currency,
        population=country.population,
        gdp=country.gdp,
        imports=country.imports,
        exports=country.exports,
        top_commodity=country.top_commodity,
        risk_level=country.risk_level,
        trade_rank=country.trade_rank,
    )

    db.add(db_country)
    db.commit()
    db.refresh(db_country)

    return db_country



# Get All Countries
def get_countries(
    db: Session,
    sort: str = None,
    order: str = "asc",
    page: int = 1,
    limit: int = 10,
):
    query = db.query(Country)

    allowed_columns = {
        "name": Country.name,
        "population": Country.population,
        "trade_rank": Country.trade_rank,
    }

    if sort in allowed_columns:
        column = allowed_columns[sort]

        if order.lower() == "desc":
            query = query.order_by(desc(column))
        else:
            query = query.order_by(asc(column))

    offset = (page - 1) * limit

    return query.offset(offset).limit(limit).all()


# Get Country by ID
def get_country_by_id(db: Session, country_id: int):
    return db.query(Country).filter(Country.id == country_id).first()


# Get Country by Code
def get_country_by_code(db: Session, country_code: str):
    return (
        db.query(Country)
        .filter(Country.code == country_code.upper())
        .first()
    )


# Update Country
def update_country(db: Session, country_id: int, country: CountryUpdate):
    db_country = db.query(Country).filter(Country.id == country_id).first()

    if db_country is None:
        return None

    db_country.name = country.name
    db_country.code = country.code
    db_country.flag = country.flag
    db_country.capital = country.capital
    db_country.currency = country.currency
    db_country.population = country.population
    db_country.gdp = country.gdp
    db_country.imports = country.imports
    db_country.exports = country.exports
    db_country.top_commodity = country.top_commodity
    db_country.risk_level = country.risk_level
    db_country.trade_rank = country.trade_rank

    db.commit()
    db.refresh(db_country)

    return db_country


# Delete Country
def delete_country(db: Session, country_id: int):
    db_country = db.query(Country).filter(Country.id == country_id).first()

    if db_country is None:
        return None

    db.delete(db_country)
    db.commit()

    return db_country

    # Compare Two Countries
def compare_countries(db: Session, country1: str, country2: str):
    first = (
        db.query(Country)
        .filter(Country.code == country1.upper())
        .first()
    )

    second = (
        db.query(Country)
        .filter(Country.code == country2.upper())
        .first()
    )

    if first is None or second is None:
        return None

    comparison = {
        "higherPopulation": first.name if first.population > second.population else second.name,
        "betterTradeRank": first.name if first.trade_rank < second.trade_rank else second.name,
    }

    return {
        "country1": first,
        "country2": second,
        "comparison": comparison,
    }

# Trade Risk Analysis
def get_trade_risk(db: Session, country_code: str):
    country = (
        db.query(Country)
        .filter(Country.code == country_code.upper())
        .first()
    )

    if country is None:
        return None

    analysis = {
        "riskFactors": [],
        "strengths": [],
        "recommendation": ""
    }

    if country.risk_level == "Low":
        analysis["riskFactors"].append("Low trade risk")
        analysis["strengths"].append("Stable trade environment")
        analysis["recommendation"] = "Maintain current trade policies."

    elif country.risk_level == "Medium":
        analysis["riskFactors"].append("Moderate market volatility")
        analysis["strengths"].append("Balanced trade opportunities")
        analysis["recommendation"] = "Diversify import and export markets."

    else:
        analysis["riskFactors"].append("High geopolitical or economic risk")
        analysis["strengths"].append("Potential for strategic growth")
        analysis["recommendation"] = "Reduce dependency on high-risk markets."

    return {
        "country": country.name,
        "riskLevel": country.risk_level,
        "tradeRank": country.trade_rank,
        "topCommodity": country.top_commodity,
        "analysis": analysis,
    }

# Trade Statistics Dashboard
def get_trade_statistics(db: Session):
    total_countries = db.query(Country).count()

    low_risk = db.query(Country).filter(
        Country.risk_level == "Low"
    ).count()

    medium_risk = db.query(Country).filter(
        Country.risk_level == "Medium"
    ).count()

    high_risk = db.query(Country).filter(
        Country.risk_level == "High"
    ).count()

    top_exporter = (
        db.query(Country)
        .order_by(Country.exports.desc())
        .first()
    )

    highest_gdp = (
        db.query(Country)
        .order_by(Country.gdp.desc())
        .first()
    )

    average_trade_rank = (
        db.query(func.avg(Country.trade_rank))
        .scalar()
    )

    return {
        "totalCountries": total_countries,
        "lowRiskCountries": low_risk,
        "mediumRiskCountries": medium_risk,
        "highRiskCountries": high_risk,
        "topExporter": top_exporter.name if top_exporter else None,
        "highestGDP": highest_gdp.name if highest_gdp else None,
        "averageTradeRank": round(float(average_trade_rank), 2)
        if average_trade_rank
        else 0,
    }

# Search Countries
def search_countries(
    db: Session,
    name: str = None,
    capital: str = None,
    commodity: str = None,
):
    query = db.query(Country)

    if name:
        query = query.filter(
            Country.name.ilike(f"%{name}%")
        )

    if capital:
        query = query.filter(
            Country.capital.ilike(f"%{capital}%")
        )

    if commodity:
        query = query.filter(
            Country.top_commodity.ilike(f"%{commodity}%")
        )

    return query.all()

# Filter Countries
def filter_countries(
    db: Session,
    risk: str = None,
    trade_rank: int = None,
):
    query = db.query(Country)

    if risk:
        query = query.filter(
            Country.risk_level.ilike(risk)
        )

    if trade_rank:
        query = query.filter(
            Country.trade_rank == trade_rank
        )

    return query.all()