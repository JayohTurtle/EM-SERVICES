// On crée un nouvel objet url depuis l'url de la page actuelle
const url = new URL(window.location.href)

// On accède aux paramètres de recherche
const params = new URLSearchParams(url.search)

// On récupère la valeur du paramètre id
let id = params.get('id')

const reponse = await fetch('http://localhost:3000/todos/'+ id,{
    method: "GET",
    headers: { "Content-Type": "application/json" },
})
const task = await reponse.json()

const h1 = document.querySelector('.masthead-heading')
h1.innerHTML = task.text
const portfolio = document.getElementById('app')
const article = document.createElement('article')
article.classList.add('border','border-primary','border-5')
article.setAttribute('id','article')
const creation = document.createElement('h2')
creation.classList.add('fs-2','ms-2')
const date = task.created_at.split(' ')
const jour = task.created_at.substring(0,3)
const mois = task.created_at.substring(4,7)
const jourFrenchTask = jourFrench(jour)
const moisFrenchTask = moisFrench(mois)
const dateUtileTask = dateTask(date,jourFrenchTask,moisFrenchTask)
creation.innerHTML = `Créée le  ${dateUtileTask}`
const Tags = document.createElement('h3')
Tags.classList.add('fs-2','text-center')
Tags.innerHTML = "Tags:"
const tableau = task.Tags
for (let i = 0; i < tableau.length; i++) { 
    const tag = document.createElement('h3')
    tag.innerHTML = tableau[i]
    Tags.append(tag)
}
const complete = document.createElement('h2')
if (task.is_complete === true){
    complete.innerHTML = "Tâche terminée"
    complete.classList.add('text-success')
}else{
    complete.innerHTML = "A faire"
    complete.classList.add('text-danger')
}
complete.classList.add('ms-2')
portfolio.append(article)
article.append(creation)
article.append(Tags)
article.append(complete)


//Supprimer une tâche
const btnTrash = document.createElement('button')
btnTrash.innerText = "Supprimer"
btnTrash.classList.add('btn','btn-danger','btn-sm','fs-4','mt-3')
portfolio.append(btnTrash)

btnTrash.addEventListener('click', (event)=>{
    event.preventDefault()

    fetch('http://localhost:3000/todos/'+ id,{
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    })
    const article = document.getElementById('article')
    article.classList.add('d-none')
    const btnTrash = document.querySelector('.btn-danger')
    btnTrash.classList.add('d-none')
    const h1 = document.querySelector('.masthead-heading')
    h1.innerHTML = "Tâche supprimée"
    const btnRetour = document.createElement('button')
    const portfolio = document.getElementById('app')
    btnRetour.innerText = "Retour à la page des tâches"
    btnRetour.classList.add('btn','btn-primary')
    portfolio.prepend(btnRetour)
    btnRetour.addEventListener('click', (event)=>{
        event.preventDefault()
        window.location.href = 'tasks.html'
    })
})

//Tâche terminée

function jourFrench(jour) {
    let jourFrench = ""
    switch(jour) {
        case "Mon":
            jourFrench = "Lundi"
            break
        case "Tue":
            jourFrench = "Mardi"
            break
        case "Wed":
            jourFrench = "Mercredi"
            break
        case "Thu":
            jourFrench = "Jeudi"
            break
        case "Fri":
            jourFrench = "Vendredi"
            break
        case "Sat":
            jourFrench = "Samedi"
            break;
        case "Sun":
            jourFrench = "Dimanche"
            break
    }
    return jourFrench
}

function moisFrench(mois) {
    let moisFrench = ""
    switch(mois) {
        case "Jan":
            moisFrench = "Janvier"
            break
        case "Feb":
            moisFrench = "Février"
            break
        case "Mar":
            moisFrench = "Mars"
            break
        case "Apr":
            moisFrench = "Avril"
            break
        case "May":
            moisFrench = "Mai"
            break
        case "Jun":
            moisFrench = "Juin"
            break
        case "Jul":
            moisFrench = "Juillet";
            break
        case "Aug":
            moisFrench = "Août"
            break
        case "Sep":
            moisFrench = "Septembre"
            break
        case "Oct":
            moisFrench = "Octobre"
            break
        case "Nov":
            moisFrench = "Novembre"
            break
        case "Dec":
            moisFrench = "Décembre"
            break
    }
    return moisFrench
}

function dateTask (date,jourFrenchTask,moisFrenchTask){
    const jourNombre = date[2]
    const annee = date[5]
    const heure = date[3]
    const dateUtile = `${jourFrenchTask} ${jourNombre} ${moisFrenchTask} ${annee} à ${heure}`
    return dateUtile
}
