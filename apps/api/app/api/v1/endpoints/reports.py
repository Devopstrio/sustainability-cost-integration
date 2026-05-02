from fastapi import APIRouter
router = APIRouter()
@router.get('/')
def get_reports():
    return {'status': 'ok', 'component': 'reports'}
