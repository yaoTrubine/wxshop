import express from 'express';
import dbConfig from './config/db';
import path from 'path';
import middlewaresConfig from './config/middlewares';
import { ProductRoutes, UserRoutes, OrderRoutes } from './modules';

const app = express();

//database
dbConfig();

//middlewares
middlewaresConfig(app);

app.use('/api',[ProductRoutes, UserRoutes, OrderRoutes]);

app.use(express.static(path.join(__dirname, 'build/static')));
app.get('/',(req,res) =>{
    res.sendFile(path.join(__dirname, 'build/index.html'));
})

const PORT = process.env.PORT || 8000;

app.listen(PORT , err => {
    if(err){
        console.error(err);
    }else{
        console.log(`App listen to port: ${PORT}`);
    }
});