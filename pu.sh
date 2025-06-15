#!/bin/bash

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "\n${BLUE}🚀 Starting git push process...${NC}\n"

# Check if a commit message is provided
if [ -z "$1" ]; then
  echo "Usage: ./pusher.sh \"Your commit message\""
  exit 1
fi

# Add changes
echo -e "${BLUE}📦 Adding changes to git...${NC}"
git add .
echo -e "${GREEN}✓ Changes added${NC}\n"

# Commit changes
echo -e "${BLUE}💾 Committing changes with message:${NC}"
echo -e "→ $1"
git commit -m "$1"
echo -e "${GREEN}✓ Changes committed${NC}\n"

# Push changes
echo -e "${BLUE}⬆️  Pushing changes to remote...${NC}"
git push
echo -e "${GREEN}✓ Changes pushed${NC}\n"

echo -e "${GREEN}✨ All done! Changes pushed successfully!${NC}\n"
