from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, func
from app.database import Base


class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


class Participant(Base):
    __tablename__ = "participants"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    email = Column(String(255), nullable=False)
    code = Column(String(100), nullable=False)
    flavor_voted = Column(String(50), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    is_winner = Column(Boolean, default=False, server_default="false")
