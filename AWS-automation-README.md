# AutoScreen Automation Scripts

This directory contains automation scripts for managing infrastructure and deployments across multiple brands and environments.

## 📁 Directory Structure

```
scripts/
├── infrastructure/      # Infrastructure management
│   ├── create-environment.sh
│   ├── destroy-environment.sh
│   ├── update-environment.sh
│   └── validate-environment.sh
├── deployment/         # Application deployment
│   ├── deploy.sh
│   ├── rollback.sh
│   ├── migrate-database.sh
│   └── seed-database.sh
├── monitoring/         # Monitoring and health checks
│   ├── check-health.sh
│   ├── view-logs.sh
│   └── generate-report.sh
└── utils/             # Utility functions
    └── common.sh
```

## 🚀 Quick Start

### Create a New Environment

```bash
./scripts/infrastructure/create-environment.sh <brand> <environment>

# Examples:
./scripts/infrastructure/create-environment.sh autoscreen staging
./scripts/infrastructure/create-environment.sh autoscreen production
./scripts/infrastructure/create-environment.sh otherbrand staging
```

### Deploy Application

```bash
./scripts/deployment/deploy.sh <brand> <environment>

# Example:
./scripts/deployment/deploy.sh autoscreen staging
```

### Check Environment Health

```bash
./scripts/monitoring/check-health.sh <brand> <environment>

# Example:
./scripts/monitoring/check-health.sh autoscreen production
```

## 📋 Prerequisites

All scripts require:

-   AWS CLI configured with appropriate credentials
-   Terraform installed (>= 1.6.0)
-   EB CLI installed (for Elastic Beanstalk operations)
-   Bash shell (Git Bash on Windows, native on Linux/Mac)

## 🎯 Multi-Brand Support

All scripts are parameterized to support multiple brands:

```bash
# AutoScreen brand
./scripts/infrastructure/create-environment.sh autoscreen production

# Other brand
./scripts/infrastructure/create-environment.sh otherbrand production
```

Resources are automatically namespaced: `{brand}-{environment}-{resource}`

## 📚 Documentation

For detailed documentation on each script, see [../docs/scripts/](../docs/scripts/)
