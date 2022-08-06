import mongoose, { mongo } from 'mongoose';
const Schema = mongoose.Schema;

let Zemlja = new Schema(
    {
        naziv: {
            type: String
        },
        brZlatnihMedalja: {
            type: Number
        },
        brSrebrnihMedalja: {
            type: Number
        },
        brBronzanihMedalja: {
            type: Number
        },
        ukBrMedalja: {
            type: Number
        },
        ukBrSportista: {
            type: Number
        }
    }
)

export default mongoose.model("Zemlja", Zemlja, "zemlje");