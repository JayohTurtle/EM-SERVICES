
//**avant de récupérer le prénom de l'utilisateur, on prévient le rafraichissement de la page au clic sur le bouton submit */
const form = document.getElementById('form');

// On utilise l'évènement submit
form.addEventListener("submit", function (event) {
    try{
        // On empêche le comportement par défaut
        event.preventDefault();
        let balisePrenom = document.getElementById("prenom")
        let prenom = balisePrenom.value
        //on vérifie que le champ contient au moins deux caractères en 
        if (prenom.length < 2){
            throw new Error ("Le prénom doit comporter au moins deux caractères")
        }
        //on enregistre le prénom dans le localstorage
        window.localStorage.setItem("prenom", prenom)
        //on passe sur la page des tâches
        window.location.href = "tasks.html"
    } catch (error){
        afficherMessageErreur(error.message)//on appelle la focntion message erreur avec les attributs de notre erreur
    }
})
//fonction qui affiche le message d'erreur
function afficherMessageErreur(message){
    let popup = document.getElementById("form")//on place le message dans la formulaire
    let spanMessage = document.getElementById("erreur-message")//on vérifie que le span n'existe pas déjà pour ne pas en créer un nouveau
    if (!spanMessage){
        spanMessage = document.createElement("span")
        spanMessage.id = "erreur-message"//on donne un id au message pour pouvoir vérifier son existence quand on clique plusieurs fois
        spanMessage.classList.add("text-danger")
        popup.appendChild(spanMessage)
    }
    spanMessage.innerText = message
}


/*
 //enregistrement du prénom dans le localstorage
//Récupération du prénom s'il existe déjà dans le localstorage
let prenom = window.localStorage.getItem('prenom');
if (prenom === null){
    // Transformation du prénom en JSON
   const valeurPrenom = JSON.stringify(prenom);
   // Stockage des informations dans le localStorage
   window.localStorage.setItem("prenom", valeurPrenom);
}else{
   pieces = JSON.parse(prenom);
}
*/

