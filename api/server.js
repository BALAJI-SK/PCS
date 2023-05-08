const app = require('./app');
const  { collectDefaultMetrics, register } = require( 'prom-client');
const InitiateMongoServer = require('./db/connection');
const mongoURI = process.env.MONGODB_URI_DEV;

InitiateMongoServer(mongoURI);





collectDefaultMetrics();


app.get('/metrics', async (_req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});

app.listen(process.env.PORT_API || 5000 ,()=>{
  
    console.log(process.env.PORT_API || 5000);
  });
