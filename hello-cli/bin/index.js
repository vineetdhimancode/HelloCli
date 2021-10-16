const chalk = require('chalk');
const boxen = require('boxen');
const yargs = require('yargs');
const axios = require('axios');
const { option } = require('yargs');

const options = yargs
.usage('Usage: -n <name>')
.option('n', {alias: 'name', describe: 'Your name', type: 'string', demandOption: true})
.option('s', {alias: 'search', descibe: 'Search value', type: 'string'})
.argv;

const greeting = chalk.yellow.bold(`Hello! ${options.name} Search value: ${options.search}`);
const query = options.search;
const boxenOptions = {
    padding: 1,
    margin: 1,
    borderStyle: 'round',
    borderColor: 'green',
    backgroundColor: 'red'
}

const msgBox = boxen(greeting, boxenOptions);
console.log(msgBox);

console.log('Here is a random joke:');
let url = '';
if (query != '') {
    url = `https://api.chucknorris.io/jokes/search?query=${query}`;
} else {
    url = 'https://api.chucknorris.io/jokes/random/';
}

axios.get(url, { headers: { Accept: 'application/json'}})
.then((res) => {
    console.log(res.data.result[0].value)
})
