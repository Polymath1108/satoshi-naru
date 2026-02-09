#!/bin/bash

##############################################
# CastingNinja - Automated Deployment Script
##############################################
# This script:
# 1. Fetches database credentials from AWS Secrets Manager
# 2. Retrieves infrastructure outputs from Terraform
# 3. Configures .env file with all required variables
# 4. Deploys application to Elastic Beanstalk
##############################################

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
BRAND="${1:-castingninja}"
ENVIRONMENT="${2:-development}"
TERRAFORM_DIR="infrastructure"

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  CastingNinja - Automated Deployment                        ║${NC}"
echo -e "${BLUE}║  Brand: ${BRAND}                                           ║${NC}"
echo -e "${BLUE}║  Environment: ${ENVIRONMENT}                               ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

##############################################
# Step 1: Validate Prerequisites
##############################################

echo -e "${YELLOW}[1/8] Validating prerequisites...${NC}"

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}✗ AWS CLI not found. Please install it first.${NC}"
    exit 1
fi

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    echo -e "${RED}✗ jq not found. Please install it first.${NC}"
    exit 1
fi

# Check if terraform is installed
if ! command -v terraform &> /dev/null; then
    echo -e "${RED}✗ Terraform not found. Please install it first.${NC}"
    exit 1
fi

# Check if in correct directory
if [ ! -f "artisan" ]; then
    echo -e "${RED}✗ Please run this script from the Laravel project root.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ All prerequisites met${NC}"
echo ""

##############################################
# Step 2: Get Terraform Outputs
##############################################

echo -e "${YELLOW}[2/8] Fetching infrastructure details from Terraform...${NC}"

cd "$TERRAFORM_DIR"

# Initialize terraform if needed (required for CI/CD to fetch remote state)
if [ ! -d ".terraform" ]; then
    echo -e "${YELLOW}  Initializing Terraform...${NC}"
    terraform init -backend-config="key=${BRAND}/${ENVIRONMENT}/terraform.tfstate" -input=false
fi

# Select the correct workspace
echo -e "  Selecting workspace ${BRAND}-${ENVIRONMENT}..."
terraform workspace select "${BRAND}-${ENVIRONMENT}" || {
    echo -e "${RED}✗ Workspace ${BRAND}-${ENVIRONMENT} not found${NC}"
    echo -e "${RED}  Please create the environment first using: ./scripts/create-environment.sh ${BRAND} ${ENVIRONMENT}${NC}"
    exit 1
}

# Get all outputs as JSON
TERRAFORM_OUTPUTS=$(terraform output -json)

# Extract values
DB_SECRET_ARN=$(echo "$TERRAFORM_OUTPUTS" | jq -r '.db_secret_arn.value')
REDIS_ENDPOINT=$(echo "$TERRAFORM_OUTPUTS" | jq -r '.redis_endpoint.value')
REDIS_PORT=$(echo "$TERRAFORM_OUTPUTS" | jq -r '.redis_port.value')
S3_BUCKET=$(echo "$TERRAFORM_OUTPUTS" | jq -r '.s3_bucket_name.value')
EB_ENV_NAME=$(echo "$TERRAFORM_OUTPUTS" | jq -r '.eb_environment_name.value')
EB_APP_NAME=$(echo "$TERRAFORM_OUTPUTS" | jq -r '.eb_application_name.value')
AWS_REGION=$(terraform output -raw aws_region 2>/dev/null || echo "us-east-1")

cd ..

echo -e "${GREEN}✓ Infrastructure details retrieved${NC}"
echo -e "  - EB Application: ${EB_APP_NAME}"
echo -e "  - EB Environment: ${EB_ENV_NAME}"
echo -e "  - S3 Bucket: ${S3_BUCKET}"
echo ""

##############################################
# Step 3: Get Database Credentials
##############################################

echo -e "${YELLOW}[3/8] Fetching database credentials from Secrets Manager...${NC}"

# Fetch secret from AWS Secrets Manager
DB_SECRET=$(aws secretsmanager get-secret-value \
    --secret-id "$DB_SECRET_ARN" \
    --query SecretString \
    --output text)

# Parse secret JSON
DB_HOST=$(echo "$DB_SECRET" | jq -r '.host')
DB_PORT=$(echo "$DB_SECRET" | jq -r '.port')
DB_DATABASE=$(echo "$DB_SECRET" | jq -r '.dbname')
DB_USERNAME=$(echo "$DB_SECRET" | jq -r '.username')
DB_PASSWORD=$(echo "$DB_SECRET" | jq -r '.password')

echo -e "${GREEN}✓ Database credentials retrieved${NC}"
echo -e "  - Host: ${DB_HOST}"
echo -e "  - Database: ${DB_DATABASE}"
echo ""

##############################################
# Step 4: Handle Application Secrets
##############################################

echo -e "${YELLOW}[4/8] Configuring application secrets...${NC}"

# Check if APP_KEY exists in current .env
if [ -f ".env" ] && grep -q "^APP_KEY=" .env; then
    APP_KEY=$(grep "^APP_KEY=" .env | cut -d '=' -f2)
    echo -e "${GREEN}✓ Using existing APP_KEY${NC}"
else
    # Generate new APP_KEY
    echo -e "${YELLOW}  Generating new APP_KEY...${NC}"
    APP_KEY="base64:$(openssl rand -base64 32)"
    echo -e "${GREEN}✓ New APP_KEY generated${NC}"
fi

# Fetch API keys from AWS Secrets Manager
API_SECRETS_NAME="${BRAND}/${ENVIRONMENT}/api-keys"
echo -e "${YELLOW}  Fetching API keys from Secrets Manager (${API_SECRETS_NAME})...${NC}"

API_SECRETS=$(aws secretsmanager get-secret-value \
    --secret-id "$API_SECRETS_NAME" \
    --query SecretString \
    --output text 2>/dev/null) || {
    echo -e "${YELLOW}  ⚠ Secret ${API_SECRETS_NAME} not found, falling back to .env file${NC}"
    API_SECRETS=""
}

if [ -n "$API_SECRETS" ]; then
    # Parse secrets from Secrets Manager
    STRIPE_KEY=$(echo "$API_SECRETS" | jq -r '.STRIPE_KEY // empty')
    STRIPE_SECRET=$(echo "$API_SECRETS" | jq -r '.STRIPE_SECRET // empty')
    STRIPE_WEBHOOK_SECRET=$(echo "$API_SECRETS" | jq -r '.STRIPE_WEBHOOK_SECRET // empty')
    OPENAI_API_KEY=$(echo "$API_SECRETS" | jq -r '.OPENAI_API_KEY // empty')
    OPENAI_ORGANIZATION=$(echo "$API_SECRETS" | jq -r '.OPENAI_ORGANIZATION // empty')
    PLIVO_AUTH_ID=$(echo "$API_SECRETS" | jq -r '.PLIVO_AUTH_ID // empty')
    PLIVO_AUTH_TOKEN=$(echo "$API_SECRETS" | jq -r '.PLIVO_AUTH_TOKEN // empty')
    PLIVO_PHONE_NUMBER=$(echo "$API_SECRETS" | jq -r '.PLIVO_PHONE_NUMBER // empty')
    MAILGUN_DOMAIN=$(echo "$API_SECRETS" | jq -r '.MAILGUN_DOMAIN // empty')
    MAILGUN_SECRET=$(echo "$API_SECRETS" | jq -r '.MAILGUN_SECRET // empty')
    MAIL_FROM_ADDRESS=$(echo "$API_SECRETS" | jq -r '.MAIL_FROM_ADDRESS // empty')
    MAIL_FROM_NAME=$(echo "$API_SECRETS" | jq -r '.MAIL_FROM_NAME // empty')
    MAIL_ADMIN_ADDRESS=$(echo "$API_SECRETS" | jq -r '.MAIL_ADMIN_ADDRESS // empty')
    GOOGLE_CLIENT_ID=$(echo "$API_SECRETS" | jq -r '.GOOGLE_CLIENT_ID // empty')
    GOOGLE_CLIENT_SECRET=$(echo "$API_SECRETS" | jq -r '.GOOGLE_CLIENT_SECRET // empty')
    WORKABLE_API_KEY=$(echo "$API_SECRETS" | jq -r '.WORKABLE_API_KEY // empty')
    WORKABLE_MEMBER_ID=$(echo "$API_SECRETS" | jq -r '.WORKABLE_MEMBER_ID // empty')
    WORKABLE_SUBDOMAIN=$(echo "$API_SECRETS" | jq -r '.WORKABLE_SUBDOMAIN // empty')
    WORKABLE_WEBHOOK_SECRET=$(echo "$API_SECRETS" | jq -r '.WORKABLE_WEBHOOK_SECRET // empty')
    AUTH0_DOMAIN=$(echo "$API_SECRETS" | jq -r '.AUTH0_DOMAIN // empty')
    AUTH0_CLIENT_ID=$(echo "$API_SECRETS" | jq -r '.AUTH0_CLIENT_ID // empty')
    AUTH0_CLIENT_SECRET=$(echo "$API_SECRETS" | jq -r '.AUTH0_CLIENT_SECRET // empty')
    AUTH0_COOKIE_SECRET=$(echo "$API_SECRETS" | jq -r '.AUTH0_COOKIE_SECRET // empty')
    AUTH0_AUDIENCE=$(echo "$API_SECRETS" | jq -r '.AUTH0_AUDIENCE // empty')
    LOCATION_TESTING=$(echo "$API_SECRETS" | jq -r '.LOCATION_TESTING // empty')
    SESSION_SAME_SITE=$(echo "$API_SECRETS" | jq -r '.SESSION_SAME_SITE // "lax"')
    SESSION_SECURE_COOKIE=$(echo "$API_SECRETS" | jq -r '.SESSION_SECURE_COOKIE // "true"')
    REDIS_CACHE_DB=$(echo "$API_SECRETS" | jq -r '.REDIS_CACHE_DB // "0"')
    MAIL_NEWSLETTER_ADDRESS=$(echo "$API_SECRETS" | jq -r '.MAIL_NEWSLETTER_ADDRESS // empty')
    echo -e "${GREEN}✓ API keys loaded from Secrets Manager${NC}"
else
    # Fallback: read from .env file
    echo -e "${YELLOW}  Reading secrets from .env file...${NC}"
    if [ -f ".env" ]; then
        MAIL_ADMIN_ADDRESS=$(grep "^MAIL_ADMIN_ADDRESS=" .env | cut -d '=' -f2 || echo "")
        MAIL_FROM_ADDRESS=$(grep "^MAIL_FROM_ADDRESS=" .env | cut -d '=' -f2 || echo "")
        MAIL_FROM_NAME=$(grep "^MAIL_FROM_NAME=" .env | cut -d '=' -f2 || echo "CastingNinja")
        STRIPE_KEY=$(grep "^STRIPE_KEY=" .env | cut -d '=' -f2 || echo "")
        STRIPE_SECRET=$(grep "^STRIPE_SECRET=" .env | cut -d '=' -f2 || echo "")
        STRIPE_WEBHOOK_SECRET=$(grep "^STRIPE_WEBHOOK_SECRET=" .env | cut -d '=' -f2 || echo "")
        OPENAI_API_KEY=$(grep "^OPENAI_API_KEY=" .env | cut -d '=' -f2 || echo "")
        OPENAI_ORGANIZATION=$(grep "^OPENAI_ORGANIZATION=" .env | cut -d '=' -f2 || echo "")
        PLIVO_AUTH_ID=$(grep "^PLIVO_AUTH_ID=" .env | cut -d '=' -f2 || echo "")
        PLIVO_AUTH_TOKEN=$(grep "^PLIVO_AUTH_TOKEN=" .env | cut -d '=' -f2 || echo "")
        PLIVO_PHONE_NUMBER=$(grep "^PLIVO_PHONE_NUMBER=" .env | cut -d '=' -f2 || echo "")
        MAILGUN_DOMAIN=$(grep "^MAILGUN_DOMAIN=" .env | cut -d '=' -f2 || echo "")
        MAILGUN_SECRET=$(grep "^MAILGUN_SECRET=" .env | cut -d '=' -f2 || echo "")
        GOOGLE_CLIENT_ID=$(grep "^GOOGLE_CLIENT_ID=" .env | cut -d '=' -f2 || echo "")
        GOOGLE_CLIENT_SECRET=$(grep "^GOOGLE_CLIENT_SECRET=" .env | cut -d '=' -f2 || echo "")
        WORKABLE_API_KEY=$(grep "^WORKABLE_API_KEY=" .env | cut -d '=' -f2 || echo "")
        WORKABLE_MEMBER_ID=$(grep "^WORKABLE_MEMBER_ID=" .env | cut -d '=' -f2 || echo "")
        WORKABLE_SUBDOMAIN=$(grep "^WORKABLE_SUBDOMAIN=" .env | cut -d '=' -f2 || echo "")
        WORKABLE_WEBHOOK_SECRET=$(grep "^WORKABLE_WEBHOOK_SECRET=" .env | cut -d '=' -f2 || echo "")
        AUTH0_DOMAIN=$(grep "^AUTH0_DOMAIN=" .env | cut -d '=' -f2 || echo "")
        AUTH0_CLIENT_ID=$(grep "^AUTH0_CLIENT_ID=" .env | cut -d '=' -f2 || echo "")
        AUTH0_CLIENT_SECRET=$(grep "^AUTH0_CLIENT_SECRET=" .env | cut -d '=' -f2 || echo "")
        AUTH0_COOKIE_SECRET=$(grep "^AUTH0_COOKIE_SECRET=" .env | cut -d '=' -f2 || echo "")
        AUTH0_AUDIENCE=$(grep "^AUTH0_AUDIENCE=" .env | cut -d '=' -f2 || echo "")
        LOCATION_TESTING=$(grep "^LOCATION_TESTING=" .env | cut -d '=' -f2 || echo "")
        SESSION_SAME_SITE=$(grep "^SESSION_SAME_SITE=" .env | cut -d '=' -f2 || echo "lax")
        SESSION_SECURE_COOKIE=$(grep "^SESSION_SECURE_COOKIE=" .env | cut -d '=' -f2 || echo "true")
        REDIS_CACHE_DB=$(grep "^REDIS_CACHE_DB=" .env | cut -d '=' -f2 || echo "0")
        MAIL_NEWSLETTER_ADDRESS=$(grep "^MAIL_NEWSLETTER_ADDRESS=" .env | cut -d '=' -f2 || echo "")
    fi
fi

# Validate required secrets
if [ -z "$STRIPE_KEY" ]; then
  if [ -n "$CI" ]; then
    echo -e "${RED}✗ STRIPE_KEY not found in Secrets Manager or .env${NC}"
    exit 1
  fi
    read -p "Enter STRIPE_KEY: " STRIPE_KEY
fi

if [ -z "$STRIPE_SECRET" ]; then
  if [ -n "$CI" ]; then
    echo -e "${RED}✗ STRIPE_SECRET not found in Secrets Manager or .env${NC}"
    exit 1
  fi
    read -p "Enter STRIPE_SECRET: " STRIPE_SECRET
fi

# Set CORS/Sanctum/Session domains based on environment
case "$ENVIRONMENT" in
  production)
    APP_URL="https://api.castingninja.com"
    FRONTEND_URL="https://castingninja.com"
    SANCTUM_STATEFUL_DOMAINS="castingninja.com"
    SESSION_DOMAIN=".castingninja.com"
    ;;
  staging)
    APP_URL="https://api-staging.castingninja.com"
    FRONTEND_URL="https://staging.castingninja.com"
    SANCTUM_STATEFUL_DOMAINS="staging.castingninja.com"
    SESSION_DOMAIN=".castingninja.com"
    ;;
  development)
    APP_URL="https://api-dev.castingninja.com"
    FRONTEND_URL="https://dev.castingninja.com"
    SANCTUM_STATEFUL_DOMAINS="dev.castingninja.com"
    SESSION_DOMAIN=".castingninja.com"
    ;;
  *)
    APP_URL="http://localhost:8000"
    FRONTEND_URL="http://localhost:5173"
    SANCTUM_STATEFUL_DOMAINS="localhost:5173"
    SESSION_DOMAIN="localhost"
    ;;
esac

# Set APP_DEBUG - temporarily enabled for debugging
APP_DEBUG=true

echo -e "${GREEN}✓ Application secrets configured${NC}"
echo ""

##############################################
# Step 5: Create .env File for Deployment
##############################################

echo -e "${YELLOW}[5/8] Creating deployment .env file...${NC}"

cat > .env.deployment << EOF
##############################################
# CastingNinja - ${ENVIRONMENT} Environment
# Auto-generated: $(date)
##############################################

APP_NAME="CastingNinja"
APP_ENV=${ENVIRONMENT}
APP_KEY=${APP_KEY}
APP_DEBUG=true
APP_URL=${APP_URL}

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

##############################################
# Database Configuration
##############################################

DB_CONNECTION=mysql
DB_HOST=${DB_HOST}
DB_PORT=${DB_PORT}
DB_DATABASE=${DB_DATABASE}
DB_USERNAME=${DB_USERNAME}
DB_PASSWORD=${DB_PASSWORD}

##############################################
# Cache & Session (Redis)
##############################################

BROADCAST_DRIVER=log
CACHE_DRIVER=redis
FILESYSTEM_DISK=s3
QUEUE_CONNECTION=sync
SESSION_DRIVER=redis
SESSION_LIFETIME=120

REDIS_HOST=${REDIS_ENDPOINT}
REDIS_PASSWORD=
REDIS_PORT=${REDIS_PORT}
REDIS_CACHE_DB=${REDIS_CACHE_DB}

##############################################
# AWS Configuration
##############################################

AWS_DEFAULT_REGION=${AWS_REGION}
AWS_BUCKET=${S3_BUCKET}
AWS_USE_PATH_STYLE_ENDPOINT=false

##############################################
# Mail Configuration
##############################################

MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS=${MAIL_FROM_ADDRESS}
MAIL_FROM_NAME="${APP_NAME}"
MAIL_ADMIN_ADDRESS=${MAIL_ADMIN_ADDRESS}
MAIL_NEWSLETTER_ADDRESS=${MAIL_NEWSLETTER_ADDRESS}

##############################################
# Stripe Configuration
##############################################

STRIPE_KEY=${STRIPE_KEY}
STRIPE_SECRET=${STRIPE_SECRET}

##############################################
# Additional Configuration
##############################################

VITE_APP_NAME="${APP_NAME}"

##############################################
# Auth0 Configuration
##############################################

AUTH0_DOMAIN=${AUTH0_DOMAIN}
AUTH0_CLIENT_ID=${AUTH0_CLIENT_ID}
AUTH0_CLIENT_SECRET=${AUTH0_CLIENT_SECRET}
AUTH0_COOKIE_SECRET=${AUTH0_COOKIE_SECRET}
AUTH0_AUDIENCE=${AUTH0_AUDIENCE}

##############################################
# Session Configuration
##############################################

SESSION_SAME_SITE=${SESSION_SAME_SITE}
SESSION_SECURE_COOKIE=${SESSION_SECURE_COOKIE}

LOCATION_TESTING=${LOCATION_TESTING}
EOF

echo -e "${GREEN}✓ Deployment .env file created${NC}"
echo ""

##############################################
# Step 6: Package Application
##############################################

echo -e "${YELLOW}[6/8] Packaging application for deployment...${NC}"

# Create deployment package
DEPLOY_PACKAGE="${BRAND}-${ENVIRONMENT}-$(date +%Y%m%d-%H%M%S).zip"

# Copy .env.deployment to .env for packaging
cp .env.deployment .env

# Create zip excluding unnecessary files
zip -r "$DEPLOY_PACKAGE" . \
    -x "*.git*" \
    -x "*node_modules*" \
    -x "*vendor*" \
    -x "*.env.deployment" \
    -x "*storage/logs/*" \
    -x "*storage/framework/cache/*" \
    -x "*storage/framework/sessions/*" \
    -x "*storage/framework/views/*" \
    -x "*tests/*" \
    -x "*.md" \
    -x "*infrastructure/*" \
    -x "*docker*" \
    -x "*.tfplan" \
    -x "*.tfstate*" \
    -x ".elasticbeanstalk/*" \
    -x "lambda/*"

echo -e "${GREEN}✓ Application packaged: ${DEPLOY_PACKAGE}${NC}"
echo ""

##############################################
# Step 7: Configure EB Environment Variables
##############################################

echo -e "${YELLOW}[7/8] Configuring Elastic Beanstalk environment variables...${NC}"

# Create option settings JSON for environment variables
# We'll set the critical variables that EB needs
cat > eb-env-vars.json << EOF
[
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "APP_NAME",
    "Value": "CastingNinja"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "APP_ENV",
    "Value": "${ENVIRONMENT}"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "APP_KEY",
    "Value": "${APP_KEY}"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "APP_DEBUG",
    "Value": "true"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "APP_URL",
    "Value": "${APP_URL}"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "DB_CONNECTION",
    "Value": "mysql"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "DB_HOST",
    "Value": "${DB_HOST}"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "DB_PORT",
    "Value": "${DB_PORT}"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "DB_DATABASE",
    "Value": "${DB_DATABASE}"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "DB_USERNAME",
    "Value": "${DB_USERNAME}"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "DB_PASSWORD",
    "Value": "${DB_PASSWORD}"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "CACHE_DRIVER",
    "Value": "redis"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "SESSION_DRIVER",
    "Value": "redis"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "REDIS_HOST",
    "Value": "${REDIS_ENDPOINT}"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "REDIS_PORT",
    "Value": "${REDIS_PORT}"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "REDIS_PASSWORD",
    "Value": ""
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "FILESYSTEM_DISK",
    "Value": "s3"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "AWS_DEFAULT_REGION",
    "Value": "${AWS_REGION}"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "AWS_BUCKET",
    "Value": "${S3_BUCKET}"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "MAIL_ADMIN_ADDRESS",
    "Value": "${MAIL_ADMIN_ADDRESS}"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "MAIL_FROM_ADDRESS",
    "Value": "${MAIL_FROM_ADDRESS}"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "STRIPE_KEY",
    "Value": "${STRIPE_KEY}"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "STRIPE_SECRET",
    "Value": "${STRIPE_SECRET}"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "STRIPE_WEBHOOK_SECRET",
    "Value": "${STRIPE_WEBHOOK_SECRET}"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "OPENAI_API_KEY",
    "Value": "${OPENAI_API_KEY}"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "OPENAI_ORGANIZATION",
    "Value": "${OPENAI_ORGANIZATION}"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "PLIVO_AUTH_ID",
    "Value": "${PLIVO_AUTH_ID}"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "PLIVO_AUTH_TOKEN",
    "Value": "${PLIVO_AUTH_TOKEN}"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "PLIVO_PHONE_NUMBER",
    "Value": "${PLIVO_PHONE_NUMBER}"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "MAILGUN_DOMAIN",
    "Value": "${MAILGUN_DOMAIN}"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "MAILGUN_SECRET",
    "Value": "${MAILGUN_SECRET}"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "MAIL_MAILER",
    "Value": "mailgun"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "MAIL_FROM_NAME",
    "Value": "${MAIL_FROM_NAME}"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "GOOGLE_CLIENT_ID",
    "Value": "${GOOGLE_CLIENT_ID}"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "GOOGLE_CLIENT_SECRET",
    "Value": "${GOOGLE_CLIENT_SECRET}"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "WORKABLE_API_KEY",
    "Value": "${WORKABLE_API_KEY}"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "WORKABLE_MEMBER_ID",
    "Value": "${WORKABLE_MEMBER_ID}"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "WORKABLE_SUBDOMAIN",
    "Value": "${WORKABLE_SUBDOMAIN}"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "WORKABLE_WEBHOOK_SECRET",
    "Value": "${WORKABLE_WEBHOOK_SECRET}"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "FRONTEND_URL",
    "Value": "${FRONTEND_URL}"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "SANCTUM_STATEFUL_DOMAINS",
    "Value": "${SANCTUM_STATEFUL_DOMAINS}"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "SESSION_DOMAIN",
    "Value": "${SESSION_DOMAIN}"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "AUTH0_DOMAIN",
    "Value": "${AUTH0_DOMAIN}"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "AUTH0_CLIENT_ID",
    "Value": "${AUTH0_CLIENT_ID}"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "AUTH0_CLIENT_SECRET",
    "Value": "${AUTH0_CLIENT_SECRET}"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "AUTH0_COOKIE_SECRET",
    "Value": "${AUTH0_COOKIE_SECRET}"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "AUTH0_AUDIENCE",
    "Value": "${AUTH0_AUDIENCE}"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "LOCATION_TESTING",
    "Value": "${LOCATION_TESTING}"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "SESSION_SAME_SITE",
    "Value": "${SESSION_SAME_SITE}"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "SESSION_SECURE_COOKIE",
    "Value": "${SESSION_SECURE_COOKIE}"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "REDIS_CACHE_DB",
    "Value": "${REDIS_CACHE_DB}"
  },
  {
    "Namespace": "aws:elasticbeanstalk:application:environment",
    "OptionName": "MAIL_NEWSLETTER_ADDRESS",
    "Value": "${MAIL_NEWSLETTER_ADDRESS}"
  }
]
EOF

# Update environment configuration
aws elasticbeanstalk update-environment \
    --application-name "$EB_APP_NAME" \
    --environment-name "$EB_ENV_NAME" \
    --option-settings file://eb-env-vars.json


# Clean up JSON file
rm -f eb-env-vars.json

# Wait for environment to be Ready
echo -e "${YELLOW}  Waiting for environment to be ready (this may take 2-5 minutes)...${NC}"

MAX_WAIT=600  # Maximum 10 minutes
ELAPSED=0
SLEEP_INTERVAL=15

while [ $ELAPSED -lt $MAX_WAIT ]; do
    # Get environment status
    ENV_STATUS=$(aws elasticbeanstalk describe-environments \
        --environment-names "$EB_ENV_NAME" \
        --query 'Environments[0].Status' \
        --output text)
    
    if [ "$ENV_STATUS" = "Ready" ]; then
        echo -e "${GREEN}  ✓ Environment is ready${NC}"
        break
    fi
    
    echo -e "${YELLOW}  Environment status: $ENV_STATUS (waiting...)${NC}"
    sleep $SLEEP_INTERVAL
    ELAPSED=$((ELAPSED + SLEEP_INTERVAL))
done

# Check if we timed out
if [ $ELAPSED -ge $MAX_WAIT ]; then
    echo -e "${RED}✗ Timeout waiting for environment to be ready${NC}"
    echo -e "${RED}  Current status: $ENV_STATUS${NC}"
    echo -e "${YELLOW}  You can check the status with: aws elasticbeanstalk describe-environments --environment-names $EB_ENV_NAME${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Environment variables configured${NC}"
echo ""

##############################################
# Step 8: Deploy to Elastic Beanstalk
##############################################

echo -e "${YELLOW}[8/8] Deploying to Elastic Beanstalk...${NC}"

# Create application version
VERSION_LABEL="${BRAND}-${ENVIRONMENT}-$(date +%Y%m%d-%H%M%S)"

# Upload to S3
echo -e "${YELLOW}  Uploading application package to S3...${NC}"
aws s3 cp "$DEPLOY_PACKAGE" "s3://elasticbeanstalk-${AWS_REGION}-$(aws sts get-caller-identity --query Account --output text)/${EB_APP_NAME}/${DEPLOY_PACKAGE}"

# Create application version
echo -e "${YELLOW}  Creating application version...${NC}"
aws elasticbeanstalk create-application-version \
    --application-name "$EB_APP_NAME" \
    --version-label "$VERSION_LABEL" \
    --source-bundle S3Bucket="elasticbeanstalk-${AWS_REGION}-$(aws sts get-caller-identity --query Account --output text)",S3Key="${EB_APP_NAME}/${DEPLOY_PACKAGE}" \
    --description "Deployed on $(date)" \
    

# Deploy to environment
echo -e "${YELLOW}  Initiating deployment to environment...${NC}"
aws elasticbeanstalk update-environment \
    --application-name "$EB_APP_NAME" \
    --environment-name "$EB_ENV_NAME" \
    --version-label "$VERSION_LABEL" \
    > /dev/null 2>&1

echo -e "${GREEN}✓ Deployment initiated${NC}"
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}⏳ Deployment is now in progress...${NC}"
echo -e "${YELLOW}   This typically takes 5-10 minutes to complete.${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

##############################################
# Cleanup
##############################################

echo -e "${YELLOW} Cleaning up...${NC}"

# Remove deployment package
rm -f "$DEPLOY_PACKAGE"
rm -f .env.deployment

echo -e "${GREEN}✓ Cleanup complete${NC}"
echo ""

##############################################
# Summary
##############################################

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Deployment Summary                                        ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${GREEN}✓ Deployment package uploaded and deployment initiated!${NC}"
echo ""
echo -e "Environment Details:"
echo -e "  - Application: ${EB_APP_NAME}"
echo -e "  - Environment: ${EB_ENV_NAME}"
echo -e "  - Version: ${VERSION_LABEL}"
echo ""
echo -e "Infrastructure:"
echo -e "  - Database: ${DB_HOST}"
echo -e "  - Redis: ${REDIS_ENDPOINT}:${REDIS_PORT}"
echo -e "  - S3 Bucket: ${S3_BUCKET}"
echo ""
echo -e "${YELLOW}📊 Monitor Deployment Progress:${NC}"
echo ""
echo -e "  ${BLUE}1. Check deployment status:${NC}"
echo -e "     aws elasticbeanstalk describe-environments --environment-names ${EB_ENV_NAME} --query 'Environments[0].[Status,Health,HealthStatus]' --output table"
echo ""
echo -e "  ${BLUE}2. Watch deployment events:${NC}"
echo -e "     aws elasticbeanstalk describe-events --environment-name ${EB_ENV_NAME} --max-items 10"
echo ""
echo -e "  ${BLUE}3. View application logs (after deployment completes):${NC}"
echo -e "     eb logs -e ${EB_ENV_NAME}"
echo ""

EB_ENV_NAME="${BRAND}-${ENVIRONMENT}-env"
CNAME=$(aws elasticbeanstalk describe-environments --environment-names "$EB_ENV_NAME" --query 'Environments[0].CNAME' --output text)

echo -e "${YELLOW}🧪 Test Application (after deployment completes):${NC}"
echo ""
echo -e "  ${BLUE}Health check:${NC}"
echo -e "     curl http://${CNAME}/api/infrastructure/health"
echo ""
echo -e "  ${BLUE}Full infrastructure test:${NC}"
echo -e "     curl http://${CNAME}/api/infrastructure/health-check"
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}⏱️  Estimated completion time: 5-10 minutes${NC}"
echo -e "${YELLOW}   The environment will show 'Health: Green' when ready${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
