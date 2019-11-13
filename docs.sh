#!/bin/bash

################################
# UPDATE DOCS FOR GITHUB-PAGES #
################################

# Build application
cd application/
npm install
npm run build

if [ $? -eq 0 ]; then
    echo ">> Build succeeded"
    echo ">> Removing old application docs (if any)"
    rm -rf ../docs/application
    echo ">> Creating docs directory (if not already)"
    mkdir -p ../docs/
    echo ">> Copying application build into application docs"
    cp -ar build/ ../docs/application/
    echo ">> Application docs updated!"
else
    echo ">> Build failed. Will not update docs!"
fi
