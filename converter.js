// Api base end point: https://api.frankfurter.dev/v1/latest or https://api.frankfurter.dev/v1/2000-01-01

const version = '1.0.0';
const axios = require('axios').default;
const process = require('process');

// Get rate
function getRate(base, symbols, amount) {
    axios.get(`https://api.frankfurter.dev/v1/${date}?symbols=${symbols}&base=${base}&amount=${amount}`)
        .then(response => {
            const res = response.data;
            console.log(`Date: ${res.date}`);
            const parsedAmount = parseFloat(amount);
            if (!isNaN(parsedAmount)) {
                for (const symbol in res.rates) {
                    const rate = parseFloat(res.rates[symbol]);
                    const convertedAmount = (rate * parsedAmount).toFixed(4);
                    console.log(`${amount} ${base} = ${convertedAmount} ${symbol}`);
                }
            } else {
                console.error(`Error: Invalid amount provided ('${amount}'). Please provide a valid number.`);
                process.exit(1);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            if (error.response) {
                console.error(`Status Code: ${error.response.status}`);
                console.error(`Data: ${JSON.stringify(error.response.data)}`);
            }
            process.exit(1);
        });
}

// Default values
let date = 'latest';
let amount = '1';
let base = 'USD';
let symbols = ['CAD', 'EUR', 'GBP', 'JPY', 'AUD'];

// Verify command line arguments
const args = process.argv.slice(2);

if (args.length > 0) {
    args.forEach(arg => {
        const [key, value] = arg.split('=');
        if (key === 'amount') {
            amount = value;
        } else if (key === 'base') {
            base = value.toUpperCase();
        } else if (key === 'date') {
            date = value;
        } else if (key === 'symbols') {
            symbols = value.toUpperCase().split(',').filter(s => s !== ''); // Remove símbolos vazios
        } else if (key === '-help' || key === '-h') {
            console.log('Usage: node converter.js [amount=1] [base=USD] [symbols=EUR,GBP,JPY] [date=latest]');
            console.log('Example: node converter.js amount=10 base=USD symbols=CAD,EUR,GBP date=2025-01-01');
            console.log('The default values are: date=latest, amount=1, base=USD, symbols=EUR,GBP,JPY,AUD');
            console.log('For multiple symbols, use a comma-separated list (e.g., symbols=EUR,GBP,JPY).');
            console.log('Use --version to display the script version.');
            process.exit(0);
        } else if (key === '-version' || key === '--version') {
            console.log(`Version: ${version}`);
            process.exit(0);
        } else {
            console.error(`Unknown argument: ${key}`);
            console.log('Run "node converter.js -h" or "node converter.js --help" for usage instructions.');
            process.exit(1);
        }
    });
}

// execute the function with the provided arguments
console.log(`Executing conversion of ${amount} ${base} on ${date}`);
console.log('--- Results ---');
getRate(base, symbols.join(','), amount);