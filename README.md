# Notes:
- React v17
- ReactDOM v18
- react-router-dom v6
- bootstrap v5
- PHP v8
- MySQL database
- web hosting w/ Hostinger 
    - CI / CD w/ git

to do : 
- deny user access to dist/ files + non user files (w/ .htaccess)
- remove search bar in navbar
- add more "themes" to each style-picker style
- add documentation (both display on screen (maybe use an api/lib) and document the API/ backend functions)

## Deploying to Hostinger
### `npm run build`

Webpack outputs prod files to `build_prod/` folder.\

### `git add .`
### `git commit -m "deploy..."
### `git push`

Deploys to git repo & prod site.

## Source code in repo `jake_app/`