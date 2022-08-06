import express from 'express';
import { SportController } from '../controllers/sport.contoller';

const sportRouter = express.Router();

sportRouter.route('/dodajSport').post(
    (req, res) => new SportController().dodajSport(req, res)
)

sportRouter.route('/dohvatiSportove').get(
    (req, res) => new SportController().dohvatiSportove(req, res)
)

sportRouter.route('/dohvatiSport').post(
    (req, res) => new SportController().dohvatiSport(req, res)
)

sportRouter.route('/dohvatiIndividualneSportove').get(
    (req, res) => new SportController().dohvatiIndividualneSportove(req, res)
)

sportRouter.route('/registrujMuskiSport').post(
    (req, res) => new SportController().registrujMuskiSport(req, res)
)

sportRouter.route('/registrujZenskiSport').post(
    (req, res) => new SportController().registrujZenskiSport(req, res)
)

sportRouter.route('/dohvatiRazliciteNaziveSportova').get(
    (req, res) => new SportController().dohvatiRazliciteNaziveSportova(req, res)
)

sportRouter.route('/dohvatiRazliciteDiscipline').get(
    (req, res) => new SportController().dohvatiRazliciteDiscipline(req, res)
)

export default sportRouter;