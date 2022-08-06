import express from 'express';
import { ZemljaController } from '../controllers/zemlja.controller';

const zemljaRouter = express.Router();

zemljaRouter.route('/dodajZemlju').post(
    (req, res) => new ZemljaController().dodajZemlju(req, res)
)

zemljaRouter.route('/uvecajBrojSportista').post(
    (req, res) => new ZemljaController().uvecajBrojSportista(req, res)
)

zemljaRouter.route('/dohvatiZemlje').post(
    (req, res) => new ZemljaController().dohvatiZemlje(req, res)
)

zemljaRouter.route('/dohvatiSveZemlje').get(
    (req, res) => new ZemljaController().dohvatiSveZemlje(req, res)
)

zemljaRouter.route('/dohvatiZemljeSortiranePoMedaljama').get(
    (req, res) => new ZemljaController().dohvatiZemljeSortiranePoMedaljama(req, res)
)

zemljaRouter.route('/uvecajBrojZlatnihMedalja').post(
    (req, res) => new ZemljaController().uvecajBrojZlatnihMedalja(req, res)
)

zemljaRouter.route('/uvecajBrojSrebrnihMedalja').post(
    (req, res) => new ZemljaController().uvecajBrojSrebrnihMedalja(req, res)
)

zemljaRouter.route('/uvecajBrojBronzanihMedalja').post(
    (req, res) => new ZemljaController().uvecajBrojBronzanihMedalja(req, res)
)

zemljaRouter.route('/uvecajUkupanBrojMedalja').post(
    (req, res) => new ZemljaController().uvecajUkupanBrojMedalja(req, res)
)

export default zemljaRouter;