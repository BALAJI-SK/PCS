const app = require('./app');

const InitiateMongoServer = require('./db/connection');
const mongoURI = process.env.MONGODB_URI_DEV;

InitiateMongoServer(mongoURI);
const client = require('prom-client');
const server = require('http').createServer();

const registry = new client.Registry();

client.collectDefaultMetrics({ register: registry });

const prometheusPort = 9090;

app.listen(process.env.PORT_API || 5000 ,()=>{
    console.log(`Prometheus metrics exposed at http://localhost:${prometheusPort}/metrics`);

  client.register.clear();

  client.collectDefaultMetrics({ register: registry });

  require('prom-client').push({ jobName: 'integrations/nodejs' }, function (err, res, body) {
    console.log(`Pushed metrics to Prometheus`);
    console.log(process.env.PORT_API || 5000);
  });
});