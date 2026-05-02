import sys
import time
from core.sustainability.engine import CostIngestionEngine, CarbonEstimationEngine, CorrelationEngine, OptimizationEngine

def run_sustainability_simulation():
    # 1. Initialize Engines
    ingestor = CostIngestionEngine()
    estimator = CarbonEstimationEngine()
    correlator = CorrelationEngine()
    optimizer = OptimizationEngine()
    
    print("--- Sustainability & Cost Platform Simulation ---")
    
    # 2. Simulate Multi-Cloud Ingestion
    print(f"\n[INGESTION] Fetching normalized billing records from AWS, Azure, and GCP...")
    raw_billing = [
        {"cloud": "aws", "service_type": "ec2", "unblended_cost": 1200.50, "usage_amount": 5000, "region": "us-east-1"},
        {"cloud": "azure", "service_type": "vm", "unblended_cost": 850.75, "usage_amount": 3500, "region": "west-europe"},
        {"cloud": "gcp", "service_type": "compute-engine", "unblended_cost": 1500.00, "usage_amount": 6000, "region": "us-central-1"},
    ]
    normalized = ingestor.normalize_cost(raw_billing)
    
    # 3. Analyze Environmental Impact
    print(f"\n[ANALYSIS] Computing carbon footprint based on usage and regional intensity...")
    with_carbon = estimator.estimate_emissions(normalized)
    
    # 4. Correlate and Report
    print(f"\n[CORRELATION] Generating integrated financial & environmental report...")
    report = correlator.correlate(with_carbon)
    print(f"  Total Portfolio Cost: ${report['summary']['total_cost_usd']}")
    print(f"  Total Carbon Footprint: {report['summary']['total_carbon_g']}g CO2e")
    print(f"  Efficiency Score: {report['summary']['avg_carbon_per_dollar']} g/USD")
    
    # 5. Strategic Optimization
    print(f"\n[OPTIMIZATION] Identifying high-impact green-ops opportunities...")
    recommendations = optimizer.generate_recommendations(report)
    for rec in recommendations:
        print(f"  >>> RECO: Move {rec['target']} from {rec['current_region']} to {rec['suggested_region']}")
        print(f"      Estimated Carbon Reduction: {rec['estimated_carbon_reduction_pct']}%")

if __name__ == "__main__":
    run_sustainability_simulation()
