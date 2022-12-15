#!/bin/bash

if [[ "$VERCEL_GIT_COMMIT_REF" == "main" ]]; then
  echo "✅ Commit to `main`, build can proceed"
  exit 1;

else
  git remote add origin "https://github.com/$VERCEL_GIT_REPO_OWNER/$VERCEL_GIT_REPO_SLUG.git"
  git fetch origin main
  git diff --quiet origin/main HEAD -- ../playground
  CHANGED=$?

  if [[ $CHANGED == 0 ]]; then
    echo "🛑 Skip build, no changes in /playground"
    exit 0;

  else
    echo "✅ Playground changed, let's build"
    exit 1;
  fi
fi
