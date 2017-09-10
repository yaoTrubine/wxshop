import express from 'express';
import dbConfig from './config/db';
import middlewaresConfig from './config/middlewares';
import { ProductRoutes } from './modules';

const app = express();

//database
dbConfig();

//middlewares
middlewaresConfig(app);

app.use('/api',[ProductRoutes]);

const PORT = process.env.PORT || 8000;

app.listen(PORT , err => {
    if(err){
        console.error(err);
    }else{
        console.log(`App listen to port: ${PORT}`);
    }
});