import { lire_joueurs, souvegarder_joueur } from "./storage.js";
export let joueurs = lire_joueurs();
export let historique = JSON.parse(localStorage.getItem("historique")) || [];


//Vérifier les champs avant ajouter un joueur
export let nickname;
export let source;
export let form_profil = document.querySelector("#form_profil");
export let liste_avatar = document.querySelector(".liste_avatar");

export let regexPseudo = /^[A-Za-z0-9]{3,15}$/;

export function valider_joueur() {
    form_profil.addEventListener("input", function (event) {
        if (event.target.tagName === "INPUT") {
            nickname = event.target;
            let message = document.querySelector(".message-error");
            if (regexPseudo.test(nickname.value)) {
                message.textContent = "Pseudo Valide !";
                message.classList.add("message_success");
                message.classList.remove("message_error");

                nickname.classList.add("success");
                nickname.classList.remove("error");
            } else {
                message.textContent = "Pseudo Invalide !";
                message.classList.remove("message_success");
                message.classList.add("message_error");

                nickname.classList.add("error");
                nickname.classList.remove("success")
            }

        }
    })

    liste_avatar.addEventListener("click", function (event) {
        source = event.target.getAttribute("src");
    })
}

// Ajouter un joueur
export let isExist;
export function ajouter_joueur() {
    valider_joueur()
    isExist = joueurs.find(function (joueur) {
        return joueur.name === nickname.value
    })
    let message = document.querySelector(".message-error");
    if (isExist) {
        message.textContent = "Joueur déjà exist";
        message.classList.remove("message_success");
        message.classList.add("message_error");

        nickname.classList.add("error");
        nickname.classList.remove("success")
    }

    if (regexPseudo.test(nickname.value) && source !== undefined && !isExist) {
        let joueur = {
            id: new Date().toISOString().split("t")[0],
            name: nickname.value,
            image: source,
            createAt: new Date().toLocaleDateString("fr-FR")
        }
        joueurs.push(joueur);
        souvegarder_joueur();
    }
    else {
        let message = document.querySelector(".error-valider-joueur");
        message.textContent = "Joueur invalide : Entrez pseudo valide ou choisissez un avatar";

    }
}
export let btn_ajouter = document.querySelector(".ajouter_joueur");
if (btn_ajouter)
    btn_ajouter.addEventListener("click", function () {
        ajouter_joueur()
        afficher_joueurs(joueurs)
    })

// Afficher tous les joueurs
export let grille_joueurs = document.getElementById("liste_joueurs");
export function afficher_joueurs(joueurs) {
    grille_joueurs.innerHTML = joueurs.map(function (joueur) {
        return `
            <article class="w-60 m-2 rounded-xl flex flex-col justify-center items-center gap-2 p-2 border border-dashed border-white bg-[#8B1E2D]">
                <img src="${joueur.image}" alt="" width="70px" height="70px">
                <h2 class="font-bold text-white">${joueur.name}</h2>
                <p class="text-white">nombre de parties jouées : 6</p>

                <button class="manipuler_profil modifier" data-id="${joueur.id}">
                    Modifier
                </button>

                <button class="manipuler_profil supprimer" data-id="${joueur.id}">
                    Supprimer
                </button>
                <button class="manipuler_profil selectionner" data-id="${joueur.id}">Selectionner</button>
            </article>
        `;
    }).join("");
}



// Modifier un joueur
export function modifier_joueur() {
    let joueur_modifier;
    grille_joueurs.addEventListener("click", (event) => {
        if (event.target.classList.contains("modifier")) {
            let id = event.target.dataset.id;
            joueur_modifier = joueurs.find((element) => {
                return element.id === id;
            })
            if (joueur_modifier) {
                console.log(joueur_modifier.name)
            }

        }
        nickname.value = joueur_modifier.name;
        let avatars = document.querySelectorAll(".avatar");
        avatars.forEach((avatar) => {
            avatar.classList.remove("focus")
            if (joueur_modifier.image === avatar.getAttribute("src")) {
                avatar.classList.add("focus")
            }

        })
        valider_joueur();
        let btn_enregistre = document.querySelector(".enregistrer_modification");
        btn_ajouter.classList.add("hidden");
        btn_enregistre.classList.remove("hidden");

        btn_enregistre.addEventListener("click", () => {
            if (regexPseudo.test(nickname.value) && source !== undefined && !isExist) {
                joueur_modifier.name = nickname.value;
                joueur_modifier.image = source;
                souvegarder_joueur();
                afficher_joueurs(joueurs)
                avatars.forEach((avatar) => {
                    avatar.classList.remove("focus")

                })
            }
        })
    })

}



//Supprimer un joueur
export function supprimer_joueur() {
    grille_joueurs.addEventListener("click", (event) => {
        if (event.target.classList.contains("supprimer")) {
            let confirmation = confirm("Voulez-vous vraiment supprimer ce joueur ?");
            let id = event.target.dataset.id;
            // console.log(joueurs)
            // console.log(id);
            let indice = joueurs.findIndex(joueur => joueur.id === id)
            console.log(indice)
            if (confirmation) {
                joueurs.splice(indice, 1);

                historique.forEach((partie) => {
                    partie.joueurs.forEach((joueur) => {
                        joueur.name = "joueur supprimé"
                    })
                }
                )
                souvegarder_joueur();
                localStorage.setItem("historique", JSON.stringify(historique));
                afficher_joueurs(joueurs)
            }
        }
    })
}


//Selecter un joueur pour commencer le jeu
export function selecter_joueur() {
    grille_joueurs.addEventListener("click", (event) => {
        if (event.target.classList.contains("selectionner")) {
            let id = event.target.dataset.id;
            let joueur_selectioner = joueurs.find(joueur =>
                joueur.id = id
            )
            let btn_selectionner = event.target;
            btn_selectionner.textContent = "selectionné";
            btn_selectionner.classList.add("bg-green-500")
        }
    })
}