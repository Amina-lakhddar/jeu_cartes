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
        return grille_ordinateur.innerHTML+=`<img data-id=${carte.id} src="images/Dos de carte bleu à motifs géométriques.png" alt="" class=" w-20">`
    })
}
afficher_cartes_ordinateur()
// let carte_inverse=document.querySelectorAll(".main_ordinateur img");
// carte_inverse.forEach((a)=>{
//     console.log(a)
// })



// jouer les cartes
let choix_joueur=document.getElementById("carte_choisi_joueur");
let choix_ordinateure=document.getElementById("carte_choisi_ordinateur");
function jouer_cartes()  {    
    grille_joueur.addEventListener("click",(event)=>{
            if(event.target.tagName=="IMG"){
                let carte_choisi=event.target;
                carte_choisi.classList.add("w-full", "h-full", "object-cover")
                choix_joueur.textContent="";
                choix_joueur.append(carte_choisi)


                // carte ordinateur
                setTimeout(()=>{
                    let index=Math.floor(Math.random()*main_ordinateur.length);
                    let carte_choisi2=cartes.find((carte)=>{
                        return carte.nom===main_ordinateur[index].name
                    })
            
                    let img=document.createElement("img");
                    img.src=carte_choisi2.image;
                    img.classList.add("w-full", "h-full", "object-cover");
                    choix_ordinateure.textContent=""
                    choix_ordinateure.append(img);
                    let images=document.querySelectorAll("img");
                    images.forEach((img)=>{
                        if(img.dataset.id==main_ordinateur[index].id){
                            img.classList.add("hidden")
                        }
                    })

                },2000)
            }
        })
    }

jouer_cartes()