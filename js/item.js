//Accès à la page statistiques
const navbar = document.getElementById('mainNav')

const aDiv = document.createElement('div')
aDiv.classList.add('me-5')

const statLink = document.createElement('a')
statLink.href = 'stat.html'
statLink.classList.add('text-white','me-5','fs-5')
statLink.innerText = "Statistiques"

navbar.appendChild(aDiv)
aDiv.append(statLink)

//retour à la page des tâches
aDiv.classList.add('me-5')
const returnLink = document.createElement('a')
returnLink.href = 'tasks.html'
returnLink.classList.add('text-white','fs-5')
returnLink.innerText = "Accueil"

navbar.appendChild(aDiv)
aDiv.append(returnLink)

// On crée un nouvel objet url depuis l'url de la page actuelle
const url = new URL(window.location.href)

// On accède aux paramètres de recherche
const params = new URLSearchParams(url.search)

// On récupère la valeur du paramètre id
let id = params.get('id')

const reponse = await fetch('http://localhost:3000/todos/'+ id,{
    method: "GET",
    headers: { 
        "Accept":"application/json",
        "Content-Type": "application/json",
    }
})
const task = await reponse.json()

//on crée l'affichage de la tâche
const h1 = document.querySelector('.masthead-heading')
h1.innerHTML = task.text

const portfolio = document.getElementById('app')

const article = document.createElement('article')
article.classList.add('border','border-primary','border-5')
article.setAttribute('id','article')

const creation = document.createElement('h2')
creation.classList.add('fs-2','text-center')

const date = task.created_at
const dateObj = new Date(date)

// Les composants de la date
const joursSemaine = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
const moisAnnee = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]

const jourSemaine = joursSemaine[dateObj.getUTCDay()]
const jourMois = String(dateObj.getUTCDate()).padStart(2, '0')
const mois = moisAnnee[dateObj.getUTCMonth()]
const annee = dateObj.getUTCFullYear()
const heures = String(dateObj.getUTCHours()).padStart(2, '0')
const minutes = String(dateObj.getUTCMinutes()).padStart(2, '0')
const secondes = String(dateObj.getUTCSeconds()).padStart(2, '0')

// Construire la chaîne formatée
const dateFormatee = `${jourSemaine} ${jourMois} ${mois} à ${heures}:${minutes}:${secondes}`

creation.innerHTML = `Créée le  ${dateFormatee}`

const Tags = document.createElement('h3')
Tags.classList.add('fs-2','text-center')
Tags.innerHTML = "Tags:"

const tableau = task.Tags
for (let i = 0; i < tableau.length; i++) { 
    const tag = document.createElement('h3')
    tag.innerHTML = tableau[i]
    Tags.append(tag)
}
//fermer une tâche
const btnEnd = document.createElement('button')
btnEnd.classList.add('btn','btn-success','btn-sm','fs-4','mt-3')
btnEnd.innerText = 'Fermer la tâche'

//réouvrir une tâche
const btnOpen = document.createElement('button')
btnOpen.classList.add('btn','btn-info','btn-sm','fs-4','mt-3')
btnOpen.innerText = "Réouvrir la tâche"

const complete = document.createElement('h2')
if (task.is_complete === true){
    complete.innerHTML = "Tâche terminée"
    complete.classList.add('text-success')
    btnEnd.classList.add('d-none')
}else{
    complete.innerHTML = "A faire"
    complete.classList.add('text-danger')
    btnOpen.classList.add('d-none')
    //Tâche terminée

}
complete.classList.add('ms-2')

portfolio.append(article)
article.append(creation)
article.append(Tags)
article.append(complete)

//Supprimer une tâche
const btnTrash = document.createElement('button')
btnTrash.textContent = "Supprimer la tâche"
btnTrash.classList.add('btn','btn-danger','btn-sm','ms-3','fs-4','mt-3')

portfolio.append(btnEnd)
portfolio.append(btnOpen)
portfolio.append(btnTrash)

/**
 * on supprime la tâche au clic sur la bouton supprimer
 */
btnTrash.addEventListener('click', ()=>{
    const alert = confirm ("Etes-vous sûr de vouloir supprimer cette tâche?")
    if (alert){
        fetch('http://localhost:3000/todos/'+ id,{
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        })
        const article = document.getElementById('article')
        article.remove()

        const btnTrash = document.querySelector('.btn-danger')
        btnTrash.remove()
        btnOpen.remove()
        btnEnd.remove()

        const h1 = document.querySelector('.masthead-heading')
        h1.innerHTML = `La tâche ${task.text} a bien été supprimée`
        h1.classList.add('fs-3')
    }
})

/**
 * On ferme la tâche au clic sur le bouton fermer la tâche
 */
btnEnd.addEventListener('click', (event)=>{
    event.preventDefault()
    const complete = {
        is_complete : true
    }
    const chargeUtile = JSON.stringify(complete)
    fetch('http://localhost:3000/todos/'+ id,{
        method: "PUT",
        headers: { "Content-Type": "application/json","Accept":"Application/json"},
        body : chargeUtile
        })
        const oldComplete = document.querySelector('.text-danger')

        const completeTask = document.createElement('h2')
        completeTask.innerHTML = "Tâche terminée"
        completeTask.classList.add('text-success','ms-2')
        oldComplete.replaceWith(completeTask)

        btnOpen.classList.remove('d-none')
        btnEnd.classList.add('d-none')
})

/**
 * On ouvre la tâche au clic sur le bouton réouvrir la tâche
 */
btnOpen.addEventListener('click', (event)=>{
    event.preventDefault()
    const complete = {
        is_complete : false
    }
    const chargeUtile = JSON.stringify(complete)
    fetch('http://localhost:3000/todos/'+ id,{
        method: "PUT",
        headers: { "Content-Type": "application/json","Accept":"Application/json"},
        body : chargeUtile
        })
        const oldComplete = document.querySelector('.text-success')

        const completeTask = document.createElement('h2')
        completeTask.innerHTML = "A faire"
        completeTask.classList.add('text-danger','ms-2')
        oldComplete.replaceWith(completeTask)

        btnOpen.classList.add('d-none')
        btnEnd.classList.remove('d-none')
})



