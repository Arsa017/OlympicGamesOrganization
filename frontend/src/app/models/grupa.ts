import { SportistaObject } from "./sportistaObject";

export class Grupa {
    nazivSporta: string;
    nazivDiscipline: string;
    format: string;
    pol: string;
    finalisti: Array<SportistaObject>;
    boljiRezultat: number;
    grupaKreirana: boolean;
    medaljeDodeljene: boolean;
}
