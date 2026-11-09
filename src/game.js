// import { joueurs,historique } from "./players.js";
import { lire_joueurs ,ajouter_partie} from "./storage.js";
export let cartes=[
    {
        nom:"Empereur",
        image:"images/empereur.png"
    },
    {
        nom:"esclave",
        image:"images/esclave.png"
    },
    {
        nom:"citoyen",
        image:"images/citoyen.png"
    }
];
// tableau des cartes de joueur
export let main_ordinateur=[
   {
    id:"esc",
    name:"esclave"
   },
    {
        id:"c1",
        name:"citoyen"
    },
    {
        id:"c2",
        name:"citoyen"
    },
    {
        id:"c3",
        name:"citoyen"
    },
    {
        id:"c4",
        name:"citoyen"
    }
];


// tableau des cartes d'ordinateur
export let main_joueur=
[
    "Empereur",
    "citoyen",
    "citoyen",
    "citoyen",
    "citoyen"
];


// le Camp
let camp=document.getElementById("camp");


// fonction afficher les cartes d'un joueur
export let grille_joueur=document.querySelector(".main_joueur");
export function afficher_cartes_joueur(){
    if(!grille_joueur){
        return;
    }
    grille_joueur.innerHTML="";
    let carte;

    copierJoueur.forEach((element)=>{
        carte=cartes.find((c)=>{
            return c.nom.toLocaleLowerCase()===element.toLocaleLowerCase();
        })
        if(carte){
        let img = document.createElement("img");

            img.src = carte.image;
            img.dataset.nom = carte.nom;
            img.alt = carte.nom;

            img.classList.add("w-20", "cursor-pointer");

            grille_joueur.append(img);
    }
    })

}




//fonction afficher les cartes d'ordinateur
export let grille_ordinateur=document.querySelector(".main_ordinateur");

export function afficher_cartes_ordinateur(){

    if(!grille_ordinateur){
        return;
    }

    grille_ordinateur.innerHTML = "";

    copierOrdinateur.forEach(function(carte){
        grille_ordinateur.innerHTML += `
            <img data-id="${carte.id}"
            src="images/Dos de carte bleu à motifs géométriques.png"
            alt="Carte cachée"
            class="w-20">
        `;
    });
}

// let carte_inverse=document.querySelectorAll(".main_ordinateur img");
// carte_inverse.forEach((a)=>{
//     console.log(a)
// })



// jouer les cartes
export let choix_joueur=document.getElementById("carte_choisi_joueur");
export let choix_ordinateur=document.getElementById("carte_choisi_ordinateur");
export let carteJoueur;
export let carteOrdinateur;
let duelEncours = false;
export function jouer_cartes()  {  
    if(!grille_joueur || !choix_joueur || !choix_ordinateur) {
        return;
    }
    grille_joueur.addEventListener("click",(event)=>{

            if(duelEncours || event.target.tagName!=="IMG"){
                return;
            }
                duelEncours=true;
                let carte_choisi=event.target;
                carteJoueur=event.target.dataset.nom;
                carte_choisi.classList.add("w-full", "h-full", "object-cover");
                choix_joueur.textContent="";
                choix_joueur.append(carte_choisi)


                // carte ordinateur
                setTimeout(()=>{
                    if(copierOrdinateur.length===0){
                        duelEncours=false;
                        return;
                    }

                    let index=Math.floor(Math.random()*copierOrdinateur.length);
                    let carteChoisiOrdinateur=copierOrdinateur[index];
                    carteOrdinateur=carteChoisiOrdinateur.name;
                    let carteImage=cartes.find((carte)=>{
                        return carte.nom.toLocaleLowerCase()===carteChoisiOrdinateur.name.toLocaleLowerCase();
                    });

                    if(carteImage){
                        let img=document.createElement("img");
                        img.src=carteImage.image;
                        img.classList.add("w-full","h-full","object-cover");

                        choix_ordinateur.textContent="";
                        choix_ordinateur.append(img);

                        // cacher la carte jouer (dos)
                        let imagecachee=grille_ordinateur.querySelector(`[data-id="${carteChoisiOrdinateur.id}"]`);
                        if(imagecachee){
                            imagecachee.classList.add("hidden")
                        };

                        //comparer les deux cartes 
                        setTimeout(lancerDuel,1500)
                    }

                },2000)
            
        })
    }



// fonction duel comparer les cartes
function duel(carteJoueur, carteOrdinateur) {

    carteJoueur = carteJoueur.toLowerCase();
    carteOrdinateur = carteOrdinateur.toLowerCase();

    if (carteJoueur === carteOrdinateur) {
        return "égalité";
    }

    else if (
        (carteJoueur === "empereur" && carteOrdinateur === "citoyen") ||
        (carteJoueur === "citoyen" && carteOrdinateur === "esclave") ||
        (carteJoueur === "esclave" && carteOrdinateur === "empereur")
    ) {
        return "victoire";
    }

    else {
        return "défaite";
    }
}
// copier les tableaux des cartes
export let copierJoueur=[...main_joueur];
export let copierOrdinateur=[...main_ordinateur];

export let scoreJoueur=0;
export let scoreOrdinateur=0;

export let numeroManche=1;

export function lancerDuel(){

    let indexJoueur;
    let indexOrdinateur;

    let resultat = duel(carteJoueur, carteOrdinateur);
    changerPremier();

    if(resultat === "égalité"){

        indexJoueur = copierJoueur.indexOf(carteJoueur);

        indexOrdinateur = copierOrdinateur.findIndex(function(carte){
            return carte.name === carteOrdinateur;
        });

        if(indexJoueur !== -1 && indexOrdinateur !== -1){

            copierJoueur.splice(indexJoueur, 1);
            copierOrdinateur.splice(indexOrdinateur, 1);
        }

        carteJoueur = undefined;
        carteOrdinateur = undefined;

        choix_joueur.textContent = "Votre carte ici";
        choix_ordinateur.textContent = "Votre carte ici";

        afficher_cartes_joueur();
        afficher_cartes_ordinateur();

        duelEncours = false;

    }else if(resultat === "victoire"){

        finManche("joueur");

    }else{

        finManche("ordinateur");
    }
}


export function reinitialiserMains(){

    copierJoueur = [...main_joueur];
    copierOrdinateur = [...main_ordinateur];

    choix_joueur.textContent = "Votre carte ici";
    choix_ordinateur.textContent = "Votre carte ici";

    afficher_cartes_joueur();
    afficher_cartes_ordinateur();

    duelEncours = false;
}


function changerCamp(){
    let actuel = camp.textContent.trim();
    if(actuel === "Empereur"){
        camp.textContent = "Esclave";
        main_joueur[0] = "Esclave";
        main_ordinateur[0].name = "Empereur";
    }else{
        camp.textContent = "Empereur";
        main_joueur[0] = "Empereur";
        main_ordinateur[0].name = "Esclave";
    }
}
export function finManche(gagnant){

    let campJoueur = camp.textContent.trim();

    if(gagnant === "joueur"){

        if(campJoueur === "Empereur"){
            scoreJoueur += 1;
        }else{
            scoreJoueur += 5;
        }

    }else{

        if(campJoueur === "Empereur"){
            scoreOrdinateur += 5;
        }else{
            scoreOrdinateur += 1;
        }
    }

    document.getElementById("score_joueur").textContent = scoreJoueur;
    document.getElementById("score_ordinateur").textContent = scoreOrdinateur;

    numeroManche++;
    if((numeroManche-1)%3===0 && numeroManche<=12){
        changerCamp();
    }

    if(numeroManche > 12){

       setTimeout(finPartie, 1500);

        return;
    };

    afficherInfos();

    setTimeout(reinitialiserMains,1500)
}


function afficherInfos(){
    let manche =Math.min(numeroManche,12);
    document.getElementById("manche").textContent=manche+"/12";
    document.getElementById("groupe").textContent=Math.ceil(manche/3)+"/4";
}


let premier = "Empereur";

function changerPremier(){
    premier=premier === "Empereur" ? "Esclave" : "Empereur";
    document.getElementById("premier").textContent=premier;

};


function finPartie(){
    let resultat;
    if(scoreJoueur>scoreOrdinateur){
        resultat="Victoire";
    }else if(scoreJoueur<scoreOrdinateur){
        resultat="Défaite"
    }else{
        resultat="Égalité"
    }

    //enregisrer la partie dans l historique 
    ajouter_partie({
        date:new Date().toLocaleString("fr-FR"),
        joueur:"joueur",
        scoreJoueur:scoreJoueur,
        scoreOrdinateur:scoreOrdinateur,
        resultat:resultat
    });

    alert(resultat+"!Score : "+scoreJoueur+" - "+scoreOrdinateur);
    if(confirm("Voulez-vous rejouer ?")){
        location.reload()
    }
}



