from fastapi import APIRouter
router = APIRouter()
@router.get('/')
def get_correlation():
    return {'summary': {'total_cost': 45000.0, 'total_carbon_g': 1250000.0, 'efficiency_score': 88}}
@router.get('/workloads')
def list_workloads():
    return {'workloads': [{'id': 'ec2-prod', 'cost': 1200, 'carbon': 4500, 'intensity': 'high'}]}
