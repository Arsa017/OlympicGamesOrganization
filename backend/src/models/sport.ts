import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Sport = new Schema(
    {
        nazivSporta: {
            type: String
        }, 
        nazivDiscipline: {
            type: String
        },
        vrstaSporta: {
            type: String
        },
        registrovanM: {  // registrovan == formiran; nakon setovanja na true, sportisti se vise ne mogu prijaviti za sportsku disciplinu ovog sporta
            type: Boolean 
        },
        registrovanZ: {
            type: Boolean
        }
    }    
);

export default mongoose.model("Sport", Sport, "sportovi");