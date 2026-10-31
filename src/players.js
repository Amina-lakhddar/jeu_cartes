let joueurs=[];
let nickname;
let source;
let form_profil=document.querySelector("#form_profil");
let liste_avatar=document.querySelector(".liste_avatar");

let regexPseudo=/^[A-Za-z0-9]{3,15}$/;

function valider_joueur(){
    form_profil.addEventListener("input",function(event){
        if(event.target.tagName==="INPUT"){
            nickname=event.target;
            let message=document.querySelector(".message-error");
            if(regexPseudo.test(nickname.value)){
                message.textContent="Pseudo Valide !";
                message.classList.add("message_success");
                message.classList.remove("message_error");

                nickname.classList.add("success");
                nickname.classList.remove("error");
            }else{
                message.textContent="Pseudo Invalide !";
                message.classList.remove("message_success");
                message.classList.add("message_error");

                nickname.classList.add("error");
                nickname.classList.remove("success")
            }

        }
    })

    liste_avatar.addEventListener("click",function(event){
        source=event.target.getAttribute("src");
    })
}
valider_joueur()
let isExist;
function ajouter_joueur(){
    valider_joueur()
    isExist=joueurs.find(function(joueur){
        return joueur.name===nickname.value
    })
    if(isExist){
        console.log("deja exist")
    }
    
    if(regexPseudo.test(nickname.value) && source!=="" && !isExist){
        let joueur={
            id: new Date().toLocaleDateString("fr-FR"),
            name:nickname.value,
            image:source,
            createAt: new Date.toISOString().split("t")[0]
        }
        joueurs.push(joueur)
    }
}
let btn=document.querySelector(".ajouter_joueur");
btn.addEventListener("click",function(){
    ajouter_joueur()
    afficher_joueurs(joueurs)
})


let grille_joueurs=document.getElementById("liste_joueurs");
function afficher_joueurs(joueurs){
    grille_joueurs.innerHTML=joueurs.map(joueur=>{
        return `<article class="bg-[#8B1E2D] w-60 m-2 rounded-xl flex flex-col justify-center items-center gap-2 p-2">
                        <img src="${joueur.image}" alt="" width="70px" height="70px">
                        <h2 class="font-bold text-white">${joueur.name}</h2>
                        <p class="text-white">nombre de parties jouées : 6</p>
                        <button class="manipuler_profil modifier">Modifier</button>
                        <button class="manipuler_profil supprimer">Supprimer</button>
                    </article>`
        
    }).join("")  
    }
afficher_joueurs(joueurs)