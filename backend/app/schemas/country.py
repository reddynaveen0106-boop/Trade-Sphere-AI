from pydantic import BaseModel


class CountryBase(BaseModel):
    name: str
    code: str
    flag: str
    capital: str
    currency: str
    population: int
    gdp: str
    imports: str
    exports: str
    top_commodity: str
    risk_level: str
    trade_rank: int


class CountryCreate(CountryBase):
    pass


class CountryUpdate(CountryBase):
    pass


class CountryResponse(CountryBase):
    id: int

    class Config:
        from_attributes = True