# React task

## Quick start
1. Install dependencies - `yarn`
2. Add `.env` file and add a variable: `REACT_APP_API_URL=http://localhost:8080`
3. Download api from `https://levitated.pl/varia/sample-api.zip` and run it according readme file enclosed.
4. Run `yarn start`.

## Tech Stack
* React
* Typescript, 
* Material UI
* Axios
* React Virtuoso
* Tools: Eslint, Prettier, husky (pre-commit hook)

## Architecture
* `components` - collection of basic UI components, which can be used across different modules
* `contexts` - folder with contexts
* `modules` - organisms of the pages
* `pages` - pages of the project, contains only UI component for a page. All the logic and children is stored in corresponding module
* `services` - services for API and 3rd party services integration
* `theme` - material UI theme

## Package.json scripts
* `yarn prettier` - automaticaly fixes code style according prettier rules
* `yarn lint` - checks for eslint, prettier and TS errors
* `yarn lint:js` - runs eslint check
* `yarn lint:types` - runs types check
* `yarn start` - run the project in dev mode

## Description
The tables are implementing taking into account the possible big ammount of data they can render. To prevent app freezing because of the rendering of a lot of components I used React Virtuoso to prevent possible performance issue here.
Material UI library was used to make the development quicker.