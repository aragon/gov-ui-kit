#!/bin/bash

# Script to process PRs: checkout, add empty changeset, commit, and push
# Usage: ./process_prs.sh

set -e  # Exit on any error

# Array of PR numbers to process
PRS=(577 578)

echo "🚀 Starting PR processing script..."

for pr in "${PRS[@]}"; do
    echo ""
    echo "📋 Processing PR #$pr..."
    
    # Checkout the PR
    echo "  🔄 Checking out PR #$pr..."
    gh pr checkout $pr
    
    # Add empty changeset
    echo "  📝 Adding empty changeset..."
    yarn changeset --empty
    
    # Add changes to git
    echo "  ➕ Adding changes to git..."
    git add .
    
    # Commit changes
    echo "  💾 Committing changes..."
    git commit -m "Add empty changeset"
    
    # Push changes
    echo "  🚀 Pushing changes..."
    git push
    
    echo "  ✅ PR #$pr completed successfully!"
done

echo ""
echo "🎉 All PRs processed successfully!"
echo "📊 Summary:"
echo "  - PR #575: ✅ Already completed"
echo "  - PR #576: ✅ Already completed"
for pr in "${PRS[@]}"; do
    echo "  - PR #$pr: ✅ Completed"
done
