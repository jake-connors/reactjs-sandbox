# jacobconnors.com

## Description
Jacob Connors' portfolio website and personal sandbox for coding

## Stack
- ReactJS v17
- ReactDOM v18
- PHP v8
- react-router-dom v6
- Bootstrap v5
- SQL database
- Hostinger web hosting 
    - Apache config
- git source code & CI/CD integration

## Development & Deployment
### Source Code Repository
Source code is in a private repository on GitHub.
https://github.com/jake-connors/jake_dev

### Deployment Repository
Deployment repository is in a private repository on GitHub.
https://github.com/jake-connors/build_prod

### Develop Locally
Use `git` commands to pull in the source code to your local computer. Run `npm` commands to prepare the React app for development. Install and start a localhost server with Apache, PHP, & SQL database. Make sure to config a SQL database & create SQL tables (see script in devScripts/backfill_sql.php).

### Deploy to Hostinger
#### Navigate to `jake_dev/` folder.
#### `npm run build`
Webpack outputs prod files to `build_prod/` folder.
#### Navigate to `build_prod/` folder. 
#### `git add .`
#### `git commit -m "deploy..."`
#### `git push`
Deploys to the deployment git repository & automatically to the production website.