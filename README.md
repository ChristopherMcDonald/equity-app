# Poker Equity App

By using ranges of hands, as opposed to individual cards, this tool can give you a better idea of how your range may play against an opponents in no-limit texas hold'em. 

## TODOs

- [ ] Better CSS, use brackets w/ SASS
- [ ] Break app into components
- [ ] Allow types ranges (e.g. KK+ for AA,KK)
- [ ] Allow percent ranges (e.g. top 10%)
- [ ] Add unit tests
 
## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

The only thing you need to run this app is [Node.js](https://nodejs.org/en/download/).

### Running locally

```
npm i
npm run serve
```

## Running the tests

```
npm i
npm run test:unit
```

### And coding style tests

```
npm i
npm run lint
```

## Deployment

```
npm i
npm run build # produces dist/ folder
# push dist/ folder to the root level on branch gh-pages
```

## Built With

* [Vue](https://vuejs.org) - JS UI Framework
* [Vuetify](https://vuetifyjs.com/en/) - Component Library
* [Sass](https://sass-lang.com) - CSS Preprocessor
* [Poker Equity Calculator](https://github.com/rundef/node-poker-odds-calculator) - Poker Equity Calculator

## Contributing

Feel free to reach out, any PRs are welcome!

## Authors

* **Christopher McDonald** - *Initial work* - [ChristopherMcDonald](https://github.com/ChristopherMcDonald)

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE.txt](LICENSE.txt) file for details.
