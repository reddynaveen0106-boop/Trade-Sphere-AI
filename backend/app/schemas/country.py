from pydantic import BaseModel


class CountryCreate(BaseModel):
    name: str
    capital: str
    currency: str
    population: int


class CountryUpdate(BaseModel):
    name: str
    capital: str
    currency: str
    population: int