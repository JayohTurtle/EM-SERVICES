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
        const response = await fetch("http://localhost:3000/todos/", {
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

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    const divForm = document.createElement('div');
    const form = document.createElement('form');
    form.classList.add('d-none', 'border', 'border-black');
    form.setAttribute('id', 'task-form');

    const inputName = document.createElement('input');
    inputName.id = 'taskName';
    inputName.type = 'text';
    inputName.name = 'taskName';
    inputName.placeholder = "Nom de la tâche";
    inputName.classList.add('m-2');

    const inputTags = document.createElement('input');
    inputTags.id = 'tagsName';
    inputTags.type = 'text';
    inputTags.name = 'tagsName';
    inputTags.placeholder = "Tags";
    inputTags.classList.add('m-2');

    const btnSubmit = document.createElement('button');
    btnSubmit.textContent = "Ajouter";
    btnSubmit.classList.add('btn', 'btn-primary', 'm-2');
    btnSubmit.setAttribute('type', 'submit');
    btnSubmit.id = 'task-submit';

    const btnCancel = document.createElement('button');
    btnCancel.textContent = "Annuler";
    btnCancel.classList.add('btn', 'btn-danger', 'm-2');

    divForm.append(form);
    form.append(inputName);
    form.append(inputTags);
    form.append(btnSubmit);
    form.append(btnCancel);
    app.append(divForm);

    form.addEventListener('submit', (event) => {
        console.log('Formulaire soumis');
        addTask(event, inputName, inputTags);
    });

    btnCancel.addEventListener('click', () => {
        form.classList.add('d-none');
    });
});

function addTask(event, inputName, inputTags) {
    event.preventDefault();
    console.log('addTask appelé');
    try {
        console.log('inputName valeur:', inputName.value);
        console.log('inputTags valeur:', inputTags.value);

        const task = {
            text: inputName.value,
            tags: inputTags.value.split(',')
        };
        const chargeUtile = JSON.stringify(task);
        console.log('chargeUtile:', chargeUtile);

        fetch("http://localhost:3000/todos", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: chargeUtile
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Erreur lors de l'ajout de la tâche (statut: ${response.status}) : ${response.statusText}`);
            }
            return response.json();
        }).then(data => {
            console.log('Réponse du serveur:', data);
            form.classList.add('d-none');
            window.location.reload(false);
        }).catch(error => {
            messageErreur(error.message);
        });
    } catch (error) {
        messageErreur("Erreur lors de la tentative d'ajout de la tâche:", error);
    }
}

function messageErreur(message) {
    const popup = document.getElementById('error');
    let spanMessage = document.getElementById("erreur-message");
    if (!spanMessage) {
        spanMessage = document.createElement("span");
        spanMessage.id = "erreur-message";
        spanMessage.classList.add('text-danger', 'fs-4', 'ml-5');
        popup.append(spanMessage);
    }
    spanMessage.innerHTML = message;
}


// Ajout du bouton qui permet d'ajouter une tâche

const divBtn = document.createElement('div')
divBtn.classList.add('container', 'accordion-body')

app.append(divBtn)

const btnAdd = document.createElement('button')
btnAdd.textContent = "Ajouter une tâche"
btnAdd.classList.add('btn', 'btn-secondary')

divBtn.append(btnAdd)

// On écoute le click sur le bouton d'ajout ou le bouton cancel
btnAdd.addEventListener('click', () => {
    form.classList.remove('d-none')
})

/**
 * Fonction qui permet de créer l'accordéon et de dispatcher les tâches dedans
 * @param {object} task 
 */
function displayTask(task) {
    const numTask = task.id
    
    let div = document.createElement('div')
    div.classList.add('accordion-item')
    
    let h2 = document.createElement('h2')
    h2.classList.add('accordion-header')
    
    let btn = document.createElement('button')
    btn.innerHTML = task.text
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
 * Fonction qui crée la span avec le message d'erreur
 * @param {string} message 
 */

/**
 * Fonction qui permet d'ajouter une tâche
 * @param {event} event 
 * @param {object} inputName 
 * @param {object} inputTags 
 */
