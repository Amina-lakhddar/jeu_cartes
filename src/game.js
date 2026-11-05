// import { joueurs,historique } from "./players.js";
import { lire_joueurs } from "./storage.js";
let cartes=[
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
let main_ordinateur=[
   {
    id:"imp",
    name:"Empereur"
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
let main_joueur=
[
    "esclave",
    "citoyen",
    "citoyen",
    "citoyen",
    "citoyen"
];


// le Camp
let camp=document.getElementById("camp");
if(camp.textContent==="Empereur"){
    main_ordinateur[0].name="Empereur";
    main_joueur[0]="esclave";
}else{
    main_ordinateur[0].name="esclave";
    main_joueur[0]="Empereur";
}



// fonction afficher les cartes d'un joueur
let grille_joueur=document.querySelector(".main_joueur");
function afficher_cartes_joueur(){
    grille_joueur.innerHTML="";
    cartes.forEach((carte)=>{
        main_joueur.forEach((element)=>{
            if(carte.nom===element){
              return  grille_joueur.innerHTML+=`<img src=${carte.image} alt="" class="w-20">`
            }
        })
    })
}
afficher_cartes_joueur();



//fonction afficher les cartes d'ordinateur
let grille_ordinateur=document.querySelector(".main_ordinateur");

function afficher_cartes_ordinateur(){
    main_ordinateur.forEach((carte)=>{
        return grille_ordinateur.innerHTML+=`<img id=${carte.id} src="images/Dos de carte bleu à motifs géométriques.png" alt="" class=" w-20">`
    })
}
afficher_cartes_ordinateur()
// let carte_inverse=document.querySelectorAll(".main_ordinateur img");
// carte_inverse.forEach((a)=>{
//     console.log(a)
// })

