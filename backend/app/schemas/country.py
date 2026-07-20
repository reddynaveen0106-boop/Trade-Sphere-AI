from pydantic import BaseModel, ConfigDict
from typing import Optional


class CountryBase(BaseModel):
    name: str
    code: Optional[str] = None
    flag: Optional[str] = None
    capital: str
    currency: str
    population: int
    gdp: Optional[str] = None
    imports: Optional[str] = None
    exports: Optional[str] = None
    top_commodity: Optional[str] = None
    risk_level: Optional[str] = None
    trade_rank: Optional[int] = None

    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True,
        alias_generator=lambda field: "".join(
            word.capitalize() if i else word
            for i, word in enumerate(field.split("_"))
        )
    )


class CountryCreate(CountryBase):
    pass


class CountryUpdate(CountryBase):
    pass


class CountryResponse(CountryBase):
    id: int