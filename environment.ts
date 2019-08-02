const dev = {
    context: 'http://localhost:8012'
}

const prod = {
    context: '/youNeedToSetTheProductionContext'
}

export let environment = dev;

console.log(process.env.REACT_APP_ENV);

if (process.env.NODE_ENV === 'production' || process.env.REACT_APP_ENV === 'production') {
    environment = prod;
}