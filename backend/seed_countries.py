from app.database.session import SessionLocal
from app.models.country import Country

db = SessionLocal()

countries = [
    Country(
        name="India",
        code="IND",
        flag="🇮🇳",
        capital="New Delhi",
        currency="INR",
        population=1428627663,
        gdp="$3.9T",
        imports="$720B",
        exports="$770B",
        top_commodity="Petroleum Products",
        risk_level="Medium",
        trade_rank=5,
    ),
    Country(
        name="United States",
        code="USA",
        flag="🇺🇸",
        capital="Washington D.C.",
        currency="USD",
        population=339996563,
        gdp="$29.2T",
        imports="$3.8T",
        exports="$3.1T",
        top_commodity="Technology",
        risk_level="Low",
        trade_rank=1,
    ),
    Country(
        name="China",
        code="CHN",
        flag="🇨🇳",
        capital="Beijing",
        currency="CNY",
        population=1410710000,
        gdp="$18.9T",
        imports="$2.6T",
        exports="$3.8T",
        top_commodity="Electronics",
        risk_level="Medium",
        trade_rank=2,
    ),
    Country(
        name="Japan",
        code="JPN",
        flag="🇯🇵",
        capital="Tokyo",
        currency="JPY",
        population=123000000,
        gdp="$4.2T",
        imports="$1.1T",
        exports="$920B",
        top_commodity="Automobiles",
        risk_level="Low",
        trade_rank=4,
    ),
    Country(
        name="Germany",
        code="DEU",
        flag="🇩🇪",
        capital="Berlin",
        currency="EUR",
        population=84000000,
        gdp="$4.7T",
        imports="$1.6T",
        exports="$1.9T",
        top_commodity="Machinery",
        risk_level="Low",
        trade_rank=3,
    ),
]

for country in countries:
    existing = db.query(Country).filter(Country.code == country.code).first()

    if not existing:
        db.add(country)

db.commit()
db.close()

print("✅ Countries inserted successfully!")