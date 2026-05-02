from typing import List, Dict, Any
from datetime import datetime

class CostIngestionEngine:
    """Ingests and normalizes multi-cloud cost data."""
    
    def normalize_cost(self, raw_data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        normalized = []
        for entry in raw_data:
            normalized.append({
                "provider": entry.get("cloud", "unknown"),
                "service": entry.get("service_type", "other"),
                "cost_usd": float(entry.get("unblended_cost", 0)),
                "usage_quantity": float(entry.get("usage_amount", 0)),
                "usage_unit": entry.get("unit", "hours"),
                "region": entry.get("region", "global"),
                "tags": entry.get("resource_tags", {}),
                "timestamp": entry.get("date", datetime.utcnow().isoformat())
            })
        return normalized

class CarbonEstimationEngine:
    """Estimates carbon emissions based on usage and regional intensity."""
    
    # gCO2 per kWh (Sample intensities)
    REGIONAL_INTENSITY = {
        "us-east-1": 350,
        "west-europe": 220,
        "us-central-1": 410,
        "asia-northeast-1": 550
    }

    def estimate_emissions(self, usage_data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        estimated = []
        for entry in usage_data:
            intensity = self.REGIONAL_INTENSITY.get(entry["region"], 400) # Fallback to 400
            # Rough model: 1 unit of compute (vCPU hour) ~ 0.05 kWh
            kwh_estimate = entry["usage_quantity"] * 0.05
            carbon_g = kwh_estimate * intensity
            
            entry["carbon_emissions_g"] = round(carbon_g, 2)
            entry["carbon_intensity_g_kwh"] = intensity
            estimated.append(entry)
        return estimated

class CorrelationEngine:
    """Correlates financial cost with environmental impact."""
    
    def correlate(self, data: List[Dict[str, Any]]) -> Dict[str, Any]:
        total_cost = sum(d["cost_usd"] for d in data)
        total_carbon = sum(d["carbon_emissions_g"] for d in data)
        
        # High impact analysis
        high_impact = [d for d in data if d["carbon_emissions_g"] > 1000] # Example threshold
        
        return {
            "summary": {
                "total_cost_usd": round(total_cost, 2),
                "total_carbon_g": round(total_carbon, 2),
                "avg_carbon_per_dollar": round(total_carbon / total_cost if total_cost > 0 else 0, 2)
            },
            "high_impact_workloads": high_impact
        }

class OptimizationEngine:
    """Generates recommendations for cost and sustainability optimization."""
    
    def generate_recommendations(self, correlation_report: Dict[str, Any]) -> List[Dict[str, Any]]:
        recommendations = []
        for workload in correlation_report["high_impact_workloads"]:
            if workload["carbon_intensity_g_kwh"] > 400:
                recommendations.append({
                    "type": "REGION_OPTIMIZATION",
                    "target": workload["service"],
                    "current_region": workload["region"],
                    "suggested_region": "west-europe",
                    "estimated_carbon_reduction_pct": 45.0,
                    "estimated_cost_delta_pct": 5.0,
                    "priority": "HIGH"
                })
        return recommendations

if __name__ == "__main__":
    # Test Simulation
    ingestor = CostIngestionEngine()
    estimator = CarbonEstimationEngine()
    correlator = CorrelationEngine()
    optimizer = OptimizationEngine()
    
    print("--- Sustainability & Cost Platform Simulation ---")
    
    # 1. Ingest
    raw = [
        {"cloud": "aws", "service_type": "ec2", "unblended_cost": 50, "usage_amount": 100, "region": "us-east-1", "resource_tags": {"env": "prod"}},
        {"cloud": "gcp", "service_type": "gke", "unblended_cost": 80, "usage_amount": 150, "region": "us-central-1", "resource_tags": {"env": "staging"}}
    ]
    normalized = ingestor.normalize_cost(raw)
    
    # 2. Carbon Estimate
    with_carbon = estimator.estimate_emissions(normalized)
    
    # 3. Correlation
    report = correlator.correlate(with_carbon)
    print(f"[REPORT] Total Cost: ${report['summary']['total_cost_usd']} | Total Carbon: {report['summary']['total_carbon_g']}g")
    
    # 4. Optimize
    recs = optimizer.generate_recommendations(report)
    for r in recs:
        print(f"[REC] {r['type']}: Move {r['target']} from {r['current_region']} to {r['suggested_region']} (Reduction: {r['estimated_carbon_reduction_pct']}%)")
