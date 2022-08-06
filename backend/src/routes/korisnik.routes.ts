import express from 'express'
import { KorisnikController } from '../controllers/korisnik.controller';

const korisnikRouter = express.Router();

korisnikRouter.route('/prijava').post(
    (req, res) => new KorisnikController().prijava(req, res)
)

korisnikRouter.route('/registracija').post(
    (req, res) => new KorisnikController().registracija(req, res)
)

korisnikRouter.route('/dohvatiOrganizatora').get(
    (req, res) => new KorisnikController().dohvatiOrganizatora(req, res)
)

korisnikRouter.route('/dohvatiVodjuNacije').post(
    (req, res) => new KorisnikController().dohvatiVodjuNacije(req, res)
)

korisnikRouter.route('/dohvatiNeregistrovaneKorisnike').get(
    (req, res) => new KorisnikController().dohvatiNeregistrovaneKorisnike(req, res)
)

korisnikRouter.route('/odobriRegistraciju').post(
    (req, res) => new KorisnikController().odobriRegistraciju(req, res)
)

korisnikRouter.route('/dohvatiKorisnika').post(
    (req, res) => new KorisnikController().dohvatiKorisnika(req, res)
)

korisnikRouter.route('/dohvatiRegistrovaneDelegate').get(
    (req, res) => new KorisnikController().dohvatiRegistrovaneDelegate(req, res)
)

korisnikRouter.route('/dohvatiKorisnikaUP').post(
    (req, res) => new KorisnikController().dohvatiKorisnikaUP(req, res)
)

korisnikRouter.route('/promeniLozinkuKorisniku').post(
    (req, res) => new KorisnikController().promeniLozinkuKorisniku(req, res)
)

export default korisnikRouter;