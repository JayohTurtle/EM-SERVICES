//Ajout du bouton qui permet d'ajouter une tâche
let portfolio = document.getElementById('portfolio')//on récupérere l'endroit du fichier html où on va insérer le bouton
let divBtn = document.createElement('div')//on crée une div
let btnAjout = document.createElement('button')//on crée l'élément bouton
btnAjout.textContent = ("Ajouter une tâche")//on écrit le contenu text du bouton
divBtn.classList.add('container','accordion-body')//on aoute les classes utiles à la div
btnAjout.classList.add('btn','btn-secondary','float-end')//on ajoute des classes au bouton pour son style et sa position dans la page
portfolio.appendChild(divBtn)//on insére la div dans la page
divBtn.appendChild(btnAjout)//on insére le bouton dans la div


//Récupération des tâches dans l'API et insertion de celles-ci dans la page tasks.html
let app = document.getElementById('app')//on récupère l'endroit où on va insérer les tâches
let divAccordeon = document.createElement('div')//on crée une div
divAccordeon.classList.add('accordion')//on ajoute la class accordion à notre div
divAccordeon.setAttribute('id','accordion-task')//on ajoute l'id accordion-task à notre div
app.appendChild(divAccordeon)//on place la div dans app
//on récupère la liste des tâches dans l'API
const todos = fetch("http://localhost:3000/todos/")
    .then (
        todos => 
            todos.json().then(tasks=>{
                tasks[0].todolist.forEach( task => {
                    let numTask = task.id
                    let tag = task.Tags
                    console.log(tag)
                    let div = document.createElement('div')
                    div.classList.add('accordion-item')
                    let h2 = document.createElement('h2')
                    h2.classList.add('accordion-header')
                    let btn = document.createElement('button')
                    btn.innerHTML = task.text
                    btn.classList.add('accordion-button')
                    if (numTask > 1 ){
                        btn.classList.add('collapsed')
                    }
                    btn.setAttribute('data-bs-toggle', 'collapse')
                    btn.setAttribute('data-bs-target', '#collapse'+ numTask)
                    if (numTask > 1){
                        btn.setAttribute('aria-expanded', 'false')
                     }else{
                        btn.setAttribute('aria-expanded', 'true')
                     }   
                    btn.setAttribute('aria-controls', 'collapse'+ numTask)
                    let div2 = document.createElement('div')
                    div2.setAttribute('id', 'collapse'+ numTask)
                    if (numTask === 1){
                        div2.classList.add('show')
                    }
                    div2.classList.add('accordion-collapse', 'collapse')
                    div2.setAttribute('data-bs-parent', '#accordion-task')
                    div2.setAttribute('aria-labelledby','heading'+ numTask)
                    let div3 = document.createElement('div')
                    div3.classList.add('accordion-body')
                    let a = document.createElement('a')
                    a.href='item.html'
                    a.textContent = 'Détails de la tâche'
                    a.classList.add('btn', 'btn-primary')
                    app.appendChild(div);
                    app.appendChild(h2);
                    app.appendChild(btn)
                    app.appendChild(div2)
                    div2.appendChild(div3)
                    div3.appendChild(a)
                    console.log(task)
                })
            })
    )
