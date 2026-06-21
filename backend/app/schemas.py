from datetime import datetime
from pydantic import BaseModel


class ItemBase(BaseModel):
    title: str
    description: str | None = None


class ItemCreate(ItemBase):
    pass


class ItemResponse(ItemBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class ParticipantCreate(BaseModel):
    name: str
    email: str
    code: str
    flavor_voted: str


class ParticipantPublic(BaseModel):
    id: int
    name: str
    flavor_voted: str
    created_at: datetime

    model_config = {"from_attributes": True}


class SweepstakesStatus(BaseModel):
    deadline: datetime | None = None
    total_participants: int = 0
    has_winner: bool = False
    winner_name: str | None = None


class SearchResult(BaseModel):
    exists: bool
    name: str | None = None
    flavor_voted: str | None = None


class DrawResponse(BaseModel):
    winner_id: int
    winner_name: str
