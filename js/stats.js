/**
 * 
 * @returns {promise<string>} valeur de todolist du premier élément
 */
const fetchTodos = async () => {
    try {
        const response = await fetch("https://back-end-em-services.vercel.app/todos", {
            method: 'GET',
            headers: {
                "Accept": "application/json"
            }
        })

        if (!response.ok) {
            throw new Error("Impossible de contacter le serveur")
        }

        const data = await response.json()
        return data[0].todolist

        }catch (error) {
            console.error(error)
        }
}

/**
 * fonction pour compter les todos
 * @returns 
 */
const countAndListTodos = async () => {
    try {
        const todos = await fetchTodos()
        
        // Nombre total de todos
        const totalTodos = todos.length
        
        // Todos complétées
        const completedTodos = todos.filter(todo => todo.is_complete)
        const completedTodosCount = completedTodos.length
        const completedTodosNames = completedTodos.map(todo => todo.text)

        // Todos non complétées
        const unCompletedTodos = todos.filter(todo => !todo.is_complete)
        const unCompletedTodosCount = unCompletedTodos.length
        const unCompletedTodosNames = unCompletedTodos.map(todo => todo.text)

        return {
            totalTodos,
            completedTodosCount,
            completedTodosNames,
            unCompletedTodosCount,
            unCompletedTodosNames,
        }
    } catch (error) {
        console.error(error)
    }
}

// On insère les éléments dans le DOM
countAndListTodos().then(result => {
    if (result) {
        const portfolio = document.getElementById('app')

        const article=document.createElement('article')

        const numberTasksTitle = document.createElement('h2')
        numberTasksTitle.classList.add('fs-4','text-center')
        numberTasksTitle.innerHTML = "Nombre total de tâches"

        const numberTasks = document.createElement('h3')
        numberTasks.classList.add('fs-4','text-center')
        numberTasks.innerHTML = `${result.totalTodos}`

        portfolio.append(article)
        article.append(numberTasksTitle)
        article.append(numberTasks)
        const divCanvas = document.createElement('div')
        divCanvas.classList.add('d-flex','justify-content-center')
        const canvas = document.createElement('canvas')
        canvas.height = '400'
        canvas.width = '400'
        canvas.setAttribute('id','myPieChart')
        canvas.classList.add()
        article.append(divCanvas)
        divCanvas.append(canvas)

        const ctx = document.getElementById('myPieChart').getContext('2d')
        const myPieChart = new Chart(ctx, {
        type: 'pie',
            data: {
                labels: ['A faire', 'Terminées'],
                datasets: [{
                    data: [`${result.unCompletedTodosCount}`, `${result.completedTodosCount}`],
                    backgroundColor: ['#E4080A', '#40BF0E']
                }]
            },
            options: {
                responsive: false,
                maintainAspectRatio: false,
                plugins: { 
                    legend: { 
                        labels: { 
                            font: { size: 24 // Taille de la police des labels 
                            } 
                        } 
                    }
                }
            }   
        })
    }
})

//retour à la page des tâches
const navbar = document.getElementById('mainNav')

const aDiv = document.createElement('div')
aDiv.classList.add('me-5')

const returnLink = document.createElement('a')
returnLink.href = 'tasks.html'
returnLink.classList.add('text-white','fs-5')
returnLink.innerText = "Accueil"

navbar.appendChild(aDiv)
aDiv.append(returnLink)
