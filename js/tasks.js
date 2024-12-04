// tasks.js
    const fetchTodos = async () => {
    const response = await fetch("http://localhost:3000/todos/",{
        method : 'GET',
        headers:{
            "Accept" : "application/json"
        }
    })
    if (response.ok ===true){
        const data = await response.json()
            return data[0].todolist
    }
    throw new Error("Impossible de contacter le serveur")
}
// Fonction pour initialiser les todos
const initializeTodos = async () => {
    const todos = await fetchTodos()
    
    if (todos.length === 0) {
        console.error('Aucune tâche trouvée')
        return
    }
    
    const app = document.getElementById('app')
    
    if (!app) {
        console.error('Element with id "app" not found in the DOM')
        return;
    }

    todos.forEach(task => {
        displayTask(task)
    })
}

// Appel des fonctions après que le DOM est complètement chargé
document.addEventListener('DOMContentLoaded', () => {
    initializeTodos()

})


//Ajout du bouton qui permet d'ajouter une tâche
let app = document.getElementById('app')//on récupérere l'endroit du fichier html où on va insérer le bouton
let divBtn = document.createElement('div')//on crée une div
let btnAjout = document.createElement('button')//on crée l'élément bouton
btnAjout.textContent = ("Ajouter une tâche")//on écrit le contenu text du bouton
divBtn.classList.add('container','accordion-body')//on aoute les classes utiles à la div
btnAjout.classList.add('btn','btn-secondary')//on ajoute des classes au bouton pour son style et sa position dans la page
app.appendChild(divBtn)//on insére la div dans la page
divBtn.appendChild(btnAjout)//on insére le bouton dans la div

//Ajouter une tâche
//Création du formulaire
let divForm = document.createElement('div')
let form = document.createElement('form')
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
let btnValide = document.createElement('button')
    btnValide.textContent = "Envoyer"
    btnValide.classList.add('btn', 'btn-primary', 'm-2')
    btnValide.setAttribute('type','submit')
    btnValide.id= 'task-submit';
    divForm.append(form)
    form.append(inputName)
    form.append(inputTags)
    form.append(btnValide)
    app.append(divForm)

//on écoute le click sur le bouton d'ajout
btnAjout.addEventListener('click', ()=>{
    form.classList.remove('d-none')
})

const dateFormatUtile = date()
console.log(dateFormatUtile)

btnValide.addEventListener('click', (event) => {
    addTask(event, inputName, inputTags,dateFormatUtile)
})

function displayTask(task){
    const numTask = task.id
        
        let div = document.createElement('div')
        div.classList.add('accordion-item')
        
        let h2 = document.createElement('h2')
        h2.classList.add('accordion-header')
        
        let btn = document.createElement('button')
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
        
        let div2 = document.createElement('div')
        div2.setAttribute('id', 'collapse' + numTask)
        if (numTask === 1) {
            div2.classList.add('show')
        }
        div2.classList.add('accordion-collapse', 'collapse')
        div2.setAttribute('data-bs-parent', '#accordion-task')
        div2.setAttribute('aria-labelledby', 'heading' + numTask)
        
        let div3 = document.createElement('div')
        div3.classList.add('accordion-body')
        div3.setAttribute('id', 'detail' + numTask)
        
        let a = document.createElement('a')
        a.href = 'item.html?id=' + task.id;
        a.textContent = 'Détails de la tâche'
        a.classList.add('btn', 'btn-primary')
        
        app.append(div)
        div.append(h2)
        h2.append(btn)
        div.append(div2)
        div2.append(div3)
        div3.append(a)
}

function addTask(event, inputName, inputTags,dateFormatUtile){
        event.preventDefault(event)
        // Création de l’objet du nouvel avis.
        const task = {
        text: inputName.value,
        created_at: dateFormatUtile,
        Tags: inputTags.value.split(',')
        
        } 
        // Création de la charge utile au format JSON
        const chargeUtile = JSON.stringify(task)
        console.log(chargeUtile)
        // Appel de la fonction fetch avec toutes les informations nécessaires
        fetch("http://localhost:3000/todos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: chargeUtile
        })
        const form = document.getElementById('task-form')
        form.classList.add('d-none')
        
}

function date(){
    const date = new Date()
        // Récupérer les composants de la date
        const jours = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const mois = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const jourSemaine = jours[date.getUTCDay()]
        const moisCourant = mois[date.getUTCMonth()]
        const jour = String(date.getUTCDate()).padStart(2, '0')
        const année = date.getUTCFullYear()
        const heures = String(date.getUTCHours()).padStart(2, '0')
        const minutes = String(date.getUTCMinutes()).padStart(2, '0')
        const secondes = String(date.getUTCSeconds()).padStart(2, '0')
        const timezone = '+0000'
        const dateFormat = `${jourSemaine} ${moisCourant} ${jour} ${heures}:${minutes}:${secondes} ${timezone} ${année}`
        return dateFormat
}


