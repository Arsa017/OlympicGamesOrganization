import express, { Router } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose  from 'mongoose';
import korisnikRouter from './routes/korisnik.routes';
import sportRouter from './routes/sport.routes';
import sportistaRuter from './routes/sportista.routes';
import takmicenjeRouter from './routes/takmicenje.routes';
import zemljaRouter from './routes/zemlja.routes';
import grupaRouter from './routes/grupa.routes';


const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/olimpijada");
const conn = mongoose.connection;
conn.once('open', ()=> {
    console.log("Konekcija sa bazom uspesno otvorena");
})

const router = express.Router()
router.use('/korisnici', korisnikRouter);
router.use('/sportovi', sportRouter);
router.use('/sportisti', sportistaRuter);
router.use('/takmicenja', takmicenjeRouter);
router.use('/zemlje', zemljaRouter);
router.use('/grupe', grupaRouter);


app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));