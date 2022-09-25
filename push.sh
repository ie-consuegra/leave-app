sh ./build.sh
cat ./src/client/bundles/bundle.html > ./dist/frontend.html
cat ./src/server/bundle/bundle.js > ./dist/backend.js
echo "🔼  Uploading..."
cd dist
clasp push
echo "🚀  Done! Deploy finalized at: $(date +"%T")"
