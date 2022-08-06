import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Grupa = new Schema(
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
        finalisti: {
            type: Array
        },
        boljiRezultat: {    // -1 uzimamo manju vrednost kao bolji rezultat; +1 veca vrednost je bolji rezultat
            type: Number
        },
        grupaKreirana: {
            type: Boolean
        },
        medaljeDodeljene: {
            type: Boolean
        }
    }
)

export default mongoose.model("Grupa", Grupa, "grupe");