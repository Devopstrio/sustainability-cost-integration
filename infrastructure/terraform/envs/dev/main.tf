module "sustainability_db" {
  source = "./modules/database"

  db_name = "sustainability_impact_platform"
}

module "finops_cache" {
  source = "./modules/redis"

  cluster_mode = false
}

module "impact_monitoring" {
  source = "./modules/monitoring"

  retention_days = 730
}

resource "kubernetes_namespace" "finops_ops" {
  metadata {
    name = "sustainability-cost-integration"
    labels = {
      "finops.ops/managed" = "true"
    }
  }
}

resource "kubernetes_config_map" "sustainability_configs" {
  metadata {
    name      = "sustainability-global-configs"
    namespace = kubernetes_namespace.finops_ops.metadata[0].name
  }

  data = {
    "normalization-engine" = "standard"
    "emission-factors"     = "lifecycle-v2"
    "optimization-mode"    = "balanced"
    "report-retention"     = "P2Y"
  }
}
