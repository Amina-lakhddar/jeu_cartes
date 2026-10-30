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
        console.log(source)
    })
}
valider_joueur()
let isExist;
function ajouter_joueur(){
    valider_joueur()
    isExist=joueurs.find(function(joueur){
        return joueur.name===nickname.value
    })
    
    if(regexPseudo.test(nickname.value) && source!=="" && !isExist){
        let joueur={
            name:nickname.value,
            image:source
        }
        joueurs.push(joueur)
    }
    console.log(joueurs)
}
let btn=document.querySelector(".ajouter_joueur");
btn.addEventListener("click",function(){
    ajouter_joueur()
})

