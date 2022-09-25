sh ./build.sh
echo "* Minifying..."
npx html-minifier-terser  --collapse-whitespace --remove-comments --minify-js true --minify-css true ./src/client/bundles/bundle.html > ./dist/frontend.html
npx uglifyjs --compress --mangle -- ./src/server/bundle/bundle.js > ./dist/backend.js
echo "✔️ Done"
echo "🔼  Uploading..."
cd dist
clasp push
echo "🚀  Done! Deploy finalized at: $(date +"%T")"