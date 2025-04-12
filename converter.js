
// Api base end point: https://api.frankfurter.dev/v1/latest

const axios = require('axios').default;
const { get } = require('axios');
const process = require('process')

// Get rate 
function getRate(base,symbols,amount) {
    axios.get(`https://api.frankfurter.dev/v1/latest?symbols=${symbols}&base=${base}&amount=${amount}`)
    .then(response => {
        let res = response.data;
        console.log(res.rates);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

// Default values

let amount = '1';
let base = 'BRL';
let symbols = ['CAD', 'EUR', 'GBP', 'JPY', 'AUD'];

// Verify to line comands arguments

const args = process.argv.slice(2);

if (args.length > 0) {
    args.forEach(arg => {
        const [key, value] = arg.split('=');
        if (key === 'amount') {
            amount = value;
        } else if (key === 'base') {
            base = value;
        } else if (key === 'symbols') {
            symbols = value.toUpperCase().split(',');
        } else if (key === '-help' || key === '-h' || key === '--help') {
            console.log('Usage: node converter.js [amount=1] [base=USD] [symbols=EUR,GBP,JPY]');
            console.log('Example: node converter.js amount=10 base=USD symbols=CAD,EUR');
            console.log('The defalt values is: amount=1 base=BRL symbols=CAD,EUR,GBP,JPY,AUD'); 
            console.log('Extra: --version to see the version of the script');
            process.exit(0);
        } else {
            console.error(`Unknown argument: ${key}`);
        }
    })
}

// execute the function with the actiarguments
console.log(`Executing convert of the amount ${amount} from ${base}`);
console.log('Results: ');
getRate(base, symbols, amount);