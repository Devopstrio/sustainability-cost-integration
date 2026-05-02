from fastapi import APIRouter
router = APIRouter()
@router.get('/')
def get_carbon():
    return {'status': 'ok', 'component': 'carbon'}
