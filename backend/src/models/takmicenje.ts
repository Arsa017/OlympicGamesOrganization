import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Takmicenje = new Schema(
    {
        nazivSporta: {
            type: String
        },
        nazivDiscipline: {
            type: String
        },
        format: {
            type: String
        },
        pol: {
            type: String
        },
        datumPocetka: {
            type: String
        },
        datumKraja: {
            type: String
        },
        tacanDatum: {
            type: String
        },
        satnica: {
            type: String
        },
        lokacija: {
            type: String
        },
        sportisti: {
            type: Array
        },
        delegati: {
            type: Array
        },
        boljiRezultat: {    // -1 uzimamo manju vrednost kao bolji rezultat; +1 veca vrednost je bolji rezultat
            type: Number
        },
       /* takmicenjeFormirano: {
            type: Boolean
        },*/
        sportistiDodati: {
            type: Boolean
        }
    }
)

export default mongoose.model("Takmicenje", Takmicenje, "takmicenja");