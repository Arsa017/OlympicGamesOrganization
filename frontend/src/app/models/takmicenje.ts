import { SportistaObject } from "./sportistaObject";

export class Takmicenje {
    nazivSporta: string;
    nazivDiscipline: string;
    format: string;
    pol: string;
    datumPocetka: string;
    datumKraja: string;
    tacanDatum: string;
    satnica: string;
    lokacija: string;
    boljiRezultat: number;
    sportistiDodati: boolean = false;
    delegati: Array<String>;
    sportisti: Array<SportistaObject>;
}