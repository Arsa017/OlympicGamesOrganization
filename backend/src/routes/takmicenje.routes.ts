import express from 'express'
import { TakmicenjeController } from '../controllers/takmicenje.controller';

const takmicenjeRouter = express.Router();

takmicenjeRouter.route('/kreirajTakmicenje').post(
    (req, res) => new TakmicenjeController().kreirajTakmicenje(req, res)
)

takmicenjeRouter.route('/dohvatiTakmicenjeZaDisciplinuIPol').post(
    (req, res) => new TakmicenjeController().dohvatiTakmicenjeZaDisciplinuIPol(req, res)
)

takmicenjeRouter.route('/dohvatiTakmicenja').get(
    (req, res) => new TakmicenjeController().dohvatiTakmicenja(req, res)
)

takmicenjeRouter.route('/dohvatiTakmicenjaBezSportista').get(
    (req, res) => new TakmicenjeController().dohvatiTakmicenjaBezSportista(req, res)
)

takmicenjeRouter.route('/dodajSportistuUTakmicenje').post(
    (req, res) => new TakmicenjeController().dodajSportistuUTakmicenje(req, res)
)

takmicenjeRouter.route('/azurirajFlegSportistiDodati').post(
    (req, res) => new TakmicenjeController().azurirajFlegSportistiDodati(req, res)
)

takmicenjeRouter.route('/dodajDelegata').post(
    (req, res) => new TakmicenjeController().dodajDelegata(req, res)
)

takmicenjeRouter.route('/dohvatiDelegataZaTakmicenje').post(
    (req, res) => new TakmicenjeController().dohvatiDelegataZaTakmicenje(req, res)
)

takmicenjeRouter.route('/dohvatiTakmicenjaDelegata').post(
    (req, res) => new TakmicenjeController().dohvatiTakmicenjaDelegata(req, res)
)

takmicenjeRouter.route('/dohvatiTakmicenjaDelegataBezDatumaFinala').post(
    (req, res) => new TakmicenjeController().dohvatiTakmicenjaDelegataBezDatumaFinala(req, res)
)

takmicenjeRouter.route('/dohvatiTakmicenjeZaLokacijuDatumISatnicu').post(
    (req, res) => new TakmicenjeController().dohvatiTakmicenjeZaLokacijuDatumISatnicu(req, res)
)

takmicenjeRouter.route('/azurirajTacanDatumISatnicuTakmicenja').post(
    (req, res) => new TakmicenjeController().azurirajTacanDatumISatnicuTakmicenja(req, res)
)

export default takmicenjeRouter;