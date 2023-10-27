# Contributing
Install [PNPM](https://pnpm.io/installation) and run `pnpm install` in the main directory. By using pnpm, the cutups can share node modules, keeping the footprint lower. This means that all node scripts should be run via pnpm instead, for example; `pnpm run serve` or `pnpm run build`.

## Starting a cutup
* `cd` into the appropriate cutup folder
* Checkout a new feature branch for your work, using the `feature/[JIRATICKETID]` convention.
* Duplicate an existing cutup from the `src/html` folder and name it `[whatevercutup].html`
* Add it to the `index.html` list in an appropriate place
* Open `webpack/config.js` and find the `chunks` setting. Add your new cutup page to the pages array. This will mean TailWind will include your page in the style generation, which will be needed to get global styles.
* Run `pnpm run serve` to start local development, it’ll pop up with http://127.0.0.1:4000/ or similar and you’ll be able to navigate to the page you added to index.html.
* Break your cutup into modules under the `src/modules` folder and include them in your cutup where appropriate. These will likely be turned into components later as part of implementation, where appropriate.
* The cutup should use a mix of TailWind and CSS specific to the module/page you are creating, with tailwind classes having a prefix of su-
    * Find available classes via quick search here (and just prefix them with su-) https://tailwindcss.com/docs/installation
    * There are a bunch of custom class configs noted in the tailwind.config.js file, which are sourcing details from Stanford’s Decanter design system: `src/css/plugins`
    * Available colours can be found here: `cutup/search/src/css/plugins/theme/colors.js`
* Build using pnpm run build
