#!/bin/bash
# =============================================================================
# Deploy Script for AI Skill Scan Career Assessment Website
# Target OS: CentOS Linux
# Repository: https://github.com/igniquest-ekajalakam/aiskillscancareerassessment.com.git
# =============================================================================

set -e  # Exit immediately on any error

# ----- Configuration -----
REPO_URL="https://github.com/igniquest-ekajalakam/aiskillscancareerassessment.com.git"
BRANCH="main"
BUILD_DIR="/home/aiskillscancareerassessment_build"
REPO_DIR="${BUILD_DIR}/aiskillscancareerassessment.com"
SOURCE_DIR="${REPO_DIR}/ai-skill-scan-website"
DEPLOY_DIR="/home/ekajalak/aiskillscancareerassessment.com/public_html"

# ----- Helper Functions -----
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

error_exit() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ERROR: $1" >&2
    exit 1
}

# ----- Pre-flight Checks -----
log "Starting deployment..."

# Check if git is installed
if ! command -v git &> /dev/null; then
    error_exit "git is not installed. Install it with: sudo yum install git -y"
fi

# Check if deploy directory exists
if [ ! -d "$DEPLOY_DIR" ]; then
    error_exit "Deploy directory does not exist: $DEPLOY_DIR"
fi

# ----- Create Build Directory -----
if [ ! -d "$BUILD_DIR" ]; then
    log "Creating build directory: $BUILD_DIR"
    mkdir -p "$BUILD_DIR"
fi

# ----- Clone or Pull Repository -----
if [ -d "$REPO_DIR/.git" ]; then
    log "Repository already exists. Pulling latest changes..."
    cd "$REPO_DIR"
    git fetch origin
    git reset --hard "origin/$BRANCH"
    git clean -fd
else
    log "Cloning repository..."
    rm -rf "$REPO_DIR"
    git clone --branch "$BRANCH" --single-branch "$REPO_URL" "$REPO_DIR"
fi

# ----- Verify Source Directory -----
if [ ! -d "$SOURCE_DIR" ]; then
    error_exit "Source directory not found: $SOURCE_DIR"
fi

# ----- Deploy to Public HTML -----
log "Deploying files to $DEPLOY_DIR ..."

# Clean the deploy directory (preserve .htaccess if it exists)
if [ -f "$DEPLOY_DIR/.htaccess" ]; then
    log "Backing up .htaccess..."
    cp "$DEPLOY_DIR/.htaccess" "/tmp/.htaccess.backup"
fi

# Copy website files to deploy directory
cp -rf "$SOURCE_DIR"/. "$DEPLOY_DIR"/

# Restore .htaccess if it was backed up
if [ -f "/tmp/.htaccess.backup" ]; then
    log "Restoring .htaccess..."
    mv "/tmp/.htaccess.backup" "$DEPLOY_DIR/.htaccess"
fi

# ----- Set Permissions -----
log "Setting file permissions..."
find "$DEPLOY_DIR" -type d -exec chmod 755 {} \;
find "$DEPLOY_DIR" -type f -exec chmod 644 {} \;

# ----- Done -----
log "Deployment completed successfully!"
log "Website files deployed to: $DEPLOY_DIR"
