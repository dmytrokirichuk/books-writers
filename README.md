# React task

## Quick start
1. Install dependencies - `yarn`
2. Add `.env` file and add a variable: `REACT_APP_API_URL=http://localhost:8080`
3. Download api from `https://levitated.pl/varia/sample-api.zip` and run it according readme file enclosed.
4. Run `yarn start`.

## Tech Stack
* React
* Typescript, eslint, prettier, husky (pre-commit hook)
* TailwindCSS
* Axios
* Downshift

## Architecture
* assets - styles and icons
* components - collection of basic UI components
* contexts - folder with contexts
* modules - organisms of the pages
* pages - pages of the project
* services - designed for api management

## Package.json scripts
* yarn lint - checks for eslint and prettier errors
* yarn start - run the project in dev mode