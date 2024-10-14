#!/usr/bin/env bash

name="build-$(date +%Y%m%d-%H%M%S).zip"

git ls-files | grep -v -E \
				'^(.gitignore|jsconfig.json|package.json|vite.config.js|README.md|research/.*)$' \
				| xargs zip -r "$name"

echo "$name"
