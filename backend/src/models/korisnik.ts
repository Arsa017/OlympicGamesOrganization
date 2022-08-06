import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Korisnik = new Schema(
    {
        kor_ime: {
            type: String
        },
        lozinka: {
            type: String
        },
        ime: {
            type: String
        },
        prezime: {
            type: String
        },
        nacionalnost: {
            type: String
        },
        email: {
            type: String
        },
        tip: {
            type: String
        },
        registrovan: {
            type: Boolean
        }
    }
)

export default mongoose.model("Korisnik", Korisnik, "korisnici");