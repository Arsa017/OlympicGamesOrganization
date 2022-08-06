import express from 'express';
import { SportistaController } from '../controllers/sportista.controller';

const sportistaRuter = express.Router();

sportistaRuter.route('/unesiSportistu').post(
    (req, res) => new SportistaController().unesiSportistu(req, res)
)

sportistaRuter.route('/dohvatiSportistuZaSportIDisciplinu').post(
    (req, res) => new SportistaController().dohvatiSportistuZaSportIDisciplinu(req, res)
)

sportistaRuter.route('/dohvatiSportistuPoImenuIPrezimenu').post(
    (req, res) => new SportistaController().dohvatiSportistuPoImenuIPrezimenu(req, res)
)

sportistaRuter.route('/dohvatiSportisteIstogPolaZaSportIDisciplinu').post(
    (req, res) => new SportistaController().dohvatiSportisteIstogPolaZaSportIDisciplinu(req, res)
)

sportistaRuter.route('/dohvatiSveSportiste').get(
    (req, res) => new SportistaController().dohvatiSveSportiste(req, res)
)

sportistaRuter.route('/pretraziSportiste').post(
    (req, res) => new SportistaController().pretraziSportiste(req, res)
)

sportistaRuter.route('/dodeliMedaljuSportisti').post(
    (req, res) => new SportistaController().dodeliMedaljuSportisti(req, res)
)

export default sportistaRuter;