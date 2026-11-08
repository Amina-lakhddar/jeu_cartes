import {
    joueurs,
    historique,
    nickname,
    source,
    form_profil,
    liste_avatar,
    regexPseudo,
    valider_joueur,
    isExist,
    ajouter_joueur,
    btn_ajouter,
    grille_joueurs,
    afficher_joueurs,
    modifier_joueur,
    supprimer_joueur,
    selecter_joueur
} from "./players.js";

import {
    afficher_cartes_joueur,
    afficher_cartes_ordinateur,
    jouer_cartes
} from "./game.js";


// CRUD players
if(grille_joueurs){

    valider_joueur();
    afficher_joueurs(joueurs);
    modifier_joueur();
    supprimer_joueur();
    selecter_joueur();

}


// Jouer avec les cartes
let btn_commencer = document.getElementById("btn_commencer");

if(btn_commencer){

    afficher_cartes_ordinateur();

    btn_commencer.addEventListener("click", function(){

        afficher_cartes_joueur();

        jouer_cartes();

        btn_commencer.classList.add("hidden");

    });

}