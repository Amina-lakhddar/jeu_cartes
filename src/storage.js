import { joueurs } from "./players.js";

export function souvegarder_joueur(){
    localStorage.setItem("joueurs",JSON.stringify(joueurs));
}


export function lire_joueurs(){
    return JSON.parse(localStorage.getItem("joueurs")) || [];
}

export function lire_historique(){
    return JSON.parse(localStorage.getItem("historique")) || [];
}

export function ajouter_partie(partie){
    let historique=lire_historique();
    historique.push(partie);
    localStorage.setItem("historique",JSON.stringify(historique));
}