from fastapi import APIRouter
from app.api.v1.endpoints import (
    auth, cost, carbon, correlation, optimization, reports, metrics
)

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(cost.router, prefix="/cost", tags=["cost"])
api_router.include_router(carbon.router, prefix="/carbon", tags=["carbon"])
api_router.include_router(correlation.router, prefix="/correlation", tags=["correlation"])
api_router.include_router(optimization.router, prefix="/optimization", tags=["optimization"])
api_router.include_router(reports.router, prefix="/reports", tags=["reports"])
api_router.include_router(metrics.router, prefix="/metrics", tags=["metrics"])
