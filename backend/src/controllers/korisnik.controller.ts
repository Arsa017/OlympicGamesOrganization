import express from 'express'
import Korisnik from '../models/korisnik';

export class KorisnikController {
    prijava = (req: express.Request, res: express.Response) => {
        let kor_ime = req.body.kor_ime;
        let lozinka = req.body.lozinka;

        Korisnik.findOne({ "kor_ime": kor_ime, "lozinka": lozinka }, (err, kor) => {
            if (err) console.log(err)
            else {
                res.json(kor);
            }
        })
    }

    registracija = (req: express.Request, res: express.Response) => {
        let korisnik = new Korisnik(req.body);

        // console.log(korisnik);

        korisnik.save().then((korisnik) => {
            res.status(200).json({ 'message': 'user added' });
        }).catch((err) => {
            res.status(400).json({ 'message': err });
        })
    }

    dohvatiOrganizatora = (req: express.Request, res: express.Response) => {
        //  let tip = req.body.tip;

        Korisnik.findOne({ "tip": "organizator" }, (err, kor) => {
            if (err) console.log(err)
            else {
                res.json(kor);
            }
        })
    }

    dohvatiRegistrovaneDelegate = (req: express.Request, res: express.Response) => {
        Korisnik.find({ "tip": "delegat", "registrovan": true }, (err, delegati) => {
            if (err) console.log(err);
            else {
                res.json(delegati);
            }
        })
    }


    dohvatiVodjuNacije = (req: express.Request, res: express.Response) => {
        let zemlja = req.body.nacionalnost;

        Korisnik.findOne({ "tip": "vodja", "nacionalnost": zemlja }, (err, kor) => {
            if (err) console.log(err)
            else {
                res.json(kor);
            }
        })
    }

    dohvatiNeregistrovaneKorisnike = (req: express.Request, res: express.Response) => {
        Korisnik.find({ "registrovan": false }, (err, data) => {
            if (err) console.log(err);
            else {
                res.json(data)
            }
        })
    }

    odobriRegistraciju = (req: express.Request, res: express.Response) => {
        let username = req.body.kor_ime;

        //   console.log(username);

        Korisnik.collection.updateOne({ "kor_ime": username }, { $set: { "registrovan": true } });
        res.json({ poruka: "ok" });
    }

    dohvatiKorisnika = (req: express.Request, res: express.Response) => {
        let username = req.body.kor_ime;

        Korisnik.findOne({ "kor_ime": username }, (err, korisnik) => {
            if (err) console.log(err);
            else {
                res.json(korisnik);
            }
        })
    }

    dohvatiKorisnikaUP = (req: express.Request, res: express.Response) => {
        let username = req.body.kor_ime;
        let lozinka = req.body.lozinka;

        Korisnik.findOne({ "kor_ime": username, "lozinka": lozinka }, (err, user) => {
            if (err) console.log(err);
            else {
                res.json(user);
            }
        })
    }

    promeniLozinkuKorisniku = (req: express.Request, res: express.Response) => {
        let username = req.body.kor_ime;
        let staraLozinka = req.body.staraLozinka;
        let novaLozinka = req.body.novaLozinka;

        Korisnik.collection.updateOne({ "kor_ime": username, "lozinka": staraLozinka }, { $set: { "lozinka": novaLozinka } });
        res.json({ "message": "ok" });
    }

}