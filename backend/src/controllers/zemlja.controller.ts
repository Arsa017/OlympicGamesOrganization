import express from 'express';
import Zemlja from '../models/zemlja';

export class ZemljaController {
    dodajZemlju = (req: express.Request, res: express.Response) => {
        let zemlja = new Zemlja(req.body);

        zemlja.save().then((zemlja) => {
            res.status(200).json({ "message": "ok" });
        }).catch(err => {
            res.status(400).json(err);
        })
    }

    uvecajBrojSportista = (req: express.Request, res: express.Response) => {
        let naziv = req.body.naziv;

        Zemlja.collection.updateOne({ "naziv": naziv }, { $inc: { "ukBrSportista": 1 } });
        res.status(200).json({ "message": "ok" });
    }

    dohvatiZemlje = (req: express.Request, res: express.Response) => {
        const pageSize = parseInt(req.body.pagesize);
        const currentPage = parseInt(req.body.page);

        const postQuery = Zemlja.find();
        if (pageSize && currentPage) {
            postQuery
                .skip(pageSize * (currentPage - 1))
                .limit(pageSize);
        }
        postQuery.then(podaci => {
            res.status(200).json(podaci);
        });

    }

    dohvatiSveZemlje = (req: express.Request, res: express.Response) => {
        Zemlja.find({}, (err, zemlje) => {
            if (err) console.log(err);
            else {
                res.json(zemlje);
            }
        })
    }

    dohvatiZemljeSortiranePoMedaljama = (req: express.Request, res: express.Response) => {
        Zemlja.find().sort({ "ukBrMedalja": "desc" }).then(data => {
            res.status(200).json(data);
        })

    }

    uvecajBrojZlatnihMedalja = (req: express.Request, res: express.Response) => {
        let naziv = req.body.naziv;

        Zemlja.collection.updateOne({ "naziv": naziv }, { $inc: { "brZlatnihMedalja": 1, "ukBrMedalja": 1 } });
        res.json({ "message": "ok" });
    }

    uvecajBrojSrebrnihMedalja = (req: express.Request, res: express.Response) => {
        let naziv = req.body.naziv;

        Zemlja.collection.updateOne({ "naziv": naziv }, { $inc: { "brSrebrnihMedalja": 1, "ukBrMedalja": 1 } });
        res.json({ "message": "ok" });
    }

    uvecajBrojBronzanihMedalja = (req: express.Request, res: express.Response) => {
        let naziv = req.body.naziv;

        Zemlja.collection.updateOne({ "naziv": naziv }, { $inc: { "brBronzanihMedalja": 1, "ukBrMedalja": 1 } });
        res.json({ "message": "ok" });
    }

    uvecajUkupanBrojMedalja = (req: express.Request, res: express.Response) => {
        let naziv = req.body.naziv;

        Zemlja.collection.updateOne({ "naziv": naziv }, { $inc: { "ukBrMedalja": 1 } });
        res.json({ "message": "ok" });
    }
 

}

