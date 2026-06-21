from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models import Participant
from app.schemas import (
    ParticipantCreate,
    ParticipantPublic,
    SweepstakesStatus,
    SearchResult,
    DrawResponse,
)

router = APIRouter(prefix="/api", tags=["sweepstakes"])


@router.post(
    "/participants",
    status_code=status.HTTP_201_CREATED,
)
async def create_participant(
    data: ParticipantCreate,
    db: AsyncSession = Depends(get_db),
):
    if not data.name.strip() or not data.email.strip() or not data.code.strip():
        raise HTTPException(status_code=400, detail="Todos los campos son obligatorios")

    existing = await db.execute(
        select(Participant).where(Participant.email == data.email).order_by(Participant.created_at.asc()).limit(1)
    )
    first_entry = existing.scalar_one_or_none()

    final_name = first_entry.name if first_entry else data.name.strip()

    participant = Participant(
        name=final_name,
        email=data.email.strip().lower(),
        code=data.code.strip(),
        flavor_voted=data.flavor_voted,
    )
    db.add(participant)
    await db.commit()
    await db.refresh(participant)

    return {
        "success": True,
        "name": final_name,
        "is_returning": first_entry is not None,
    }


@router.get("/participants/recent", response_model=list[ParticipantPublic])
async def list_recent(
    limit: int = Query(10, ge=1, le=50),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Participant).order_by(Participant.created_at.desc()).limit(limit)
    )
    return result.scalars().all()


@router.get("/participants/search", response_model=SearchResult)
async def search_participant(
    name: str = Query(..., min_length=1),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Participant)
        .where(Participant.name.ilike(name.strip()))
        .order_by(Participant.created_at.desc())
        .limit(1)
    )
    p = result.scalar_one_or_none()
    if not p:
        return SearchResult(exists=False)
    return SearchResult(exists=True, name=p.name, flavor_voted=p.flavor_voted)


@router.get("/sweepstakes/status", response_model=SweepstakesStatus)
async def sweepstakes_status(db: AsyncSession = Depends(get_db)):
    total_result = await db.execute(select(func.count(Participant.id)))
    total = total_result.scalar() or 0

    first_result = await db.execute(
        select(Participant.created_at).order_by(Participant.created_at.asc()).limit(1)
    )
    first_created = first_result.scalar_one_or_none()

    deadline = first_created + timedelta(days=15) if first_created else None

    winner_result = await db.execute(
        select(Participant).where(Participant.is_winner == True).limit(1)
    )
    winner = winner_result.scalar_one_or_none()

    return SweepstakesStatus(
        deadline=deadline,
        total_participants=total,
        has_winner=winner is not None,
        winner_name=winner.name if winner else None,
    )


@router.post("/sweepstakes/draw", response_model=DrawResponse)
async def draw_winner(db: AsyncSession = Depends(get_db)):
    first_result = await db.execute(
        select(Participant.created_at).order_by(Participant.created_at.asc()).limit(1)
    )
    first_created = first_result.scalar_one_or_none()
    if not first_created:
        raise HTTPException(status_code=400, detail="No hay participantes")

    deadline = first_created + timedelta(days=15)
    if datetime.now(timezone.utc) < deadline:
        remaining = (deadline - datetime.now(timezone.utc)).days
        raise HTTPException(
            status_code=400,
            detail=f"El sorteo aún no está disponible. Quedan {remaining} días.",
        )

    existing_winner = await db.execute(
        select(Participant).where(Participant.is_winner == True).limit(1)
    )
    if existing_winner.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="El ganador ya ha sido sorteado")

    count_result = await db.execute(select(func.count(Participant.id)))
    total = count_result.scalar() or 0
    if total == 0:
        raise HTTPException(status_code=400, detail="No hay participantes")

    random_result = await db.execute(
        select(Participant).order_by(func.random()).limit(1)
    )
    winner = random_result.scalar_one_or_none()
    if not winner:
        raise HTTPException(status_code=500, detail="Error al seleccionar ganador")

    winner.is_winner = True
    await db.commit()
    await db.refresh(winner)

    return DrawResponse(winner_id=winner.id, winner_name=winner.name)
