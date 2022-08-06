import express from 'express';
import { GrupaContoller } from '../controllers/grupa.controller';

const grupaRouter = express.Router();

grupaRouter.route('/kreirajGrupu').post(
    (req, res) => new GrupaContoller().kreirajGrupu(req, res)
)

grupaRouter.route('/dodajFinalistu').post(
    (req, res) => new GrupaContoller().dodajFinalistu(req, res)
)

grupaRouter.route('/dohvatiGrupu').post(
    (req, res) => new GrupaContoller().dohvatiGrupu(req, res)
)

grupaRouter.route('/dohvatiFinalneGrupeBezUnesenihRezultata').get(
    (req, res) => new GrupaContoller().dohvatiFinalneGrupeBezUnesenihRezultata(req, res)
)

grupaRouter.route('/azurirajFlegMedaljeDodeljene').post(
    (req, res) => new GrupaContoller().azurirajFlegMedaljeDodeljene(req, res)
)

export default grupaRouter;