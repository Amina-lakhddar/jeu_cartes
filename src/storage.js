import { joueurs } from "./players.js";

export function souvegarder_joueur(){
    localStorage.setItem("joueurs",JSON.stringify(joueurs));
}


export function lire_joueurs(){
    return JSON.parse(localStorage.getItem("joueurs") || [])
}

