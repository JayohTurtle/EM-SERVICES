//Ajout du prénom de l'utilisateur

if (localStorage.length === 0) {
    window.location.href = 'index.html';
} else {
    const nom = localStorage.getItem('prenom');
    const app = document.getElementById('app'); //on récupérere l'endroit du fichier html où on va insérer le prénom
    const divPrenom = document.createElement('div');
    divPrenom.classList.add('fs-2');
    divPrenom.innerHTML = `Bonjour ${nom}`;

    app.prepend(divPrenom);
}

//Création du lien pour accés à la page statistiques

const navbar = document.getElementById('mainNav')

const popup = document.getElementById('alert')

const aDiv = document.createElement('div')
aDiv.classList.add('me-5')

const statLink = document.createElement('a')
statLink.href = 'stat.html'
statLink.classList.add('text-white', 'me-5', 'fs-5')
statLink.innerText = "Statistiques"

navbar.appendChild(aDiv)
aDiv.append(statLink)

/**
 * Fonction pour initialiser les todos
 * @returns void
 */
const initializeTodos = async () => {
    try {
        const response = await fetch("https://back-end-em-services.vercel.app/todos", {
            method: 'GET',
            headers: {
                "Accept": "application/json"
            }
        })
        
        if (!response.ok) {
            throw new Error('Impossible de contacter le serveur : ' + response.statusText)
            
        }
        
        const data = await response.json()
        const todos = data[0].todolist
        
        if (todos.length === 0) {
            throw new Error('Aucune tâche trouvée')
        }
        
        todos.forEach(task => {
            displayTask(task)
        })
    } catch (error) {
            messageErreur('Erreur lors de la récupération des tâches : ' + error.message)
    } 
}

// Appel des fonctions après que le DOM est complètement chargé
document.addEventListener('DOMContentLoaded', () => {
    initializeTodos()
})

//Ajout du bouton qui permet d'ajouter une tâche

const divBtn = document.createElement('div')//on crée une div
divBtn.classList.add('container','accordion-body')//on aoute les classes utiles à la div

const btnAjout = document.createElement('button')//on crée l'élément bouton
btnAjout.textContent = ("Ajouter une tâche")//on écrit le contenu text du bouton
btnAjout.classList.add('btn','btn-secondary')//on ajoute des classes au bouton pour son style et sa position dans la page

app.appendChild(divBtn)//on insére la div dans la page
divBtn.appendChild(btnAjout)//on insére le bouton dans la div

//Ajouter une tâche
//Création du formulaire
const divForm = document.createElement('div')

const form = document.createElement('form')
    form.classList.add( 'd-none','border', 'border-black')
    form.setAttribute('id', 'task-form')

let inputName = document.createElement('input')
    inputName.id = 'taskName'
    inputName.type = 'text'
    inputName.Name = 'taskName'
    inputName.placeholder = "Nom de la tâche"
    inputName.classList.add('m-2')

let inputTags = document.createElement('input')
    inputTags.id = 'tagsName'
    inputTags.type = 'text'
    inputTags.Name = 'tagsName'
    inputTags.placeholder = "Tags"
    inputTags.classList.add('m-2')

const btnSubmit = document.createElement('button')
    btnSubmit.textContent = "Ajouter"
    btnSubmit.classList.add('btn', 'btn-primary', 'm-2')
    btnSubmit.setAttribute('type','submit')
    btnSubmit.id= 'task-submit'

const btnCancel = document.createElement('button')
    btnCancel.textContent = "Annuler"
    btnCancel.classList.add('btn', 'btn-danger', 'm-2')

    divForm.append(form)
    form.append(inputName)
    form.append(inputTags)
    form.append(btnSubmit)
    form.append(btnCancel)
    app.append(divForm)

//on écoute les clics sur les boutons d'ajout de tâche
btnAjout.addEventListener('click', ()=>{
    form.classList.remove('d-none')
})

btnSubmit.addEventListener('click', (event) => {
    addTask(event, inputName, inputTags)
})

btnCancel.addEventListener('click', () => {
    form.classList.add('d-none')
})

/**
 * Fonction qui crée l'accordéon dans le DOM
 * @param {object} task 
 */
function displayTask(task){
    const numTask = task.id
        
        const div = document.createElement('div')
        div.classList.add('accordion-item')
        
        const h2 = document.createElement('h2')
        h2.classList.add('accordion-header')
        
        const btn = document.createElement('button')
        btn.innerHTML = task.text;
        btn.classList.add('accordion-button')
        if (numTask > 1) {
            btn.classList.add('collapsed')
        }
        btn.setAttribute('data-bs-toggle', 'collapse')
        btn.setAttribute('data-bs-target', '#collapse' + numTask)
        if (numTask > 1) {
            btn.setAttribute('aria-expanded', 'false')
        } else {
            btn.setAttribute('aria-expanded', 'true')
        }
        btn.setAttribute('aria-controls', 'collapse' + numTask)
        
        const div2 = document.createElement('div')
        div2.setAttribute('id', 'collapse' + numTask)
        if (numTask === 1) {
            div2.classList.add('show')
        }
        div2.classList.add('accordion-collapse', 'collapse')
        div2.setAttribute('data-bs-parent', '#accordion-task')
        div2.setAttribute('aria-labelledby', 'heading' + numTask)
        
        const div3 = document.createElement('div')
        div3.classList.add('accordion-body')
        div3.setAttribute('id', 'detail' + numTask)
        
        const a = document.createElement('a')
        a.href = 'item.html?id=' + task.id
        a.textContent = 'Détails de la tâche'
        a.classList.add('btn', 'btn-primary')
        
        app.append(div)
        div.append(h2)
        h2.append(btn)
        div.append(div2)
        div2.append(div3)
        div3.append(a)
}
/**
 * Fonction pour ajouter une tâche
 * gestion des erreurs
 * @param {} event 
 * @param {*} inputName 
 * @param {*} inputTags 
 */
function addTask(event, inputName, inputTags) {
    event.preventDefault(event)
    try {
        const task = {
            text: inputName.value,
            Tags: inputTags.value.split(',')
        }
        const chargeUtile = JSON.stringify(task)
        fetch("https://back-end-em-services.vercel.app/todos", { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: chargeUtile
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur lors de l'ajout de la tâche (statut: ${response.status}) : ${response.statusText}`)
            }
            return response.json()
        })
        .then(() => {
            const formTask = document.getElementById('task-form')
            formTask.classList.add('d-none')
            window.location.reload(false)
        })
        .catch(error => {  // Ajout de la gestion des erreurs ici
            messageErreur("Erreur lors de la tentative d'ajout de la tâche:", error)
        })
    } catch (error) {
        messageErreur("Erreur lors de la tentative d'ajout de la tâche:", error)
    }
}
    
/**
 * Fonction qui place le message d'erreur
 * @param {string} message 
 */
function messageErreur(message) {
    let spanMessage = document.getElementById("erreur-message");
    if (!spanMessage) {
        spanMessage = document.createElement("span");
        spanMessage.id = "erreur-message";
        spanMessage.classList.add('text-danger', 'fs-4', 'ml-5');
        popup.append(spanMessage);
    }
    spanMessage.innerHTML = message;
}


