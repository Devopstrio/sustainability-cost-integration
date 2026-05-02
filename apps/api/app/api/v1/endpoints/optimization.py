from fastapi import APIRouter
router = APIRouter()
@router.get('/')
def get_recommendations():
    return {'recommendations': [{'type': 'RIGHTSIZING', 'service': 'RDS', 'savings_usd': 250, 'carbon_reduction_g': 800}]}
