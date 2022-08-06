import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let Sportista = new Schema({
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    pol: {
        type: String
    },
    nazivSporta: {
        type: String
    },
    discipline: {
        type: Array
    },
    nacionalnost: {
        type: String
    },
    osvajacMedalje: {
        type: String
    }
})

export default mongoose.model("Sportista", Sportista, "sportisti"); // probaj da promenis