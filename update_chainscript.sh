#!/bin/bash

# Run this script to update the ChainScript git subtree.
# You can also run this from npm: `npm run update_chainscript`

if [[ -n $(git diff --stat) ]]; then
    >&2 echo "Chainscript cannot be updated: you have unstaged changes in your working tree. Please commit or stash your current work and retry."
elif [[ -n $(git status -s) ]]; then
    >&2 echo "Chainscript cannot be updated: you have staged changes. Please commit or stash your current work and retry."
else
    rm -r ./proto
    git commit -m -a "removing old chainscript subtree"
    git subtree add --prefix proto git@github.com:stratumn/chainscript.git master --squash
fi