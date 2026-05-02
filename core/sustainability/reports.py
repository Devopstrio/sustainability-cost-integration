from typing import List, Dict, Any
from datetime import datetime

class ReportingEngine:
    """Generates sustainability and financial impact reports."""
    
    def generate_executive_summary(self, correlation_data: Dict[str, Any]) -> Dict[str, Any]:
        return {
            "title": "Sustainability & Cost Impact Report",
            "generation_date": datetime.utcnow().isoformat(),
            "metrics": correlation_data["summary"],
            "status": "IMPROVING" if correlation_data["summary"]["avg_carbon_per_dollar"] < 10 else "ATTENTION_REQUIRED"
        }

class BenchmarkingEngine:
    """Compares current performance against organizational sustainability goals."""
    
    def compare_to_goals(self, current_carbon: float, goal_carbon: float) -> Dict[str, Any]:
        variance = current_carbon - goal_carbon
        return {
            "carbon_variance_g": round(variance, 2),
            "attainment_pct": round((goal_carbon / current_carbon if current_carbon > 0 else 1) * 100, 2),
            "status": "ON_TRACK" if variance <= 0 else "OFF_TRACK"
        }
