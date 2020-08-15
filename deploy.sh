# bin/sh

if git diff-index --quiet HEAD --; then
    git checkout --orphan gh-pages
    npm run build
    git --work-tree dist add --all
    git --work-tree dist commit -m 'Deploy'
    git push origin HEAD:gh-pages --force
    rm -r dist
    git checkout -f master
    git branch -D gh-pages
    echo "Deployed!"
else
    echo "Changes found! Stash or commit these before deploying."
fi