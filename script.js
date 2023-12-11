//Example
// const car = {
//     model: 'Tesla   Model S',
//     year: 2020,
// }

// const json = JSON.stringify(car)
// console.log(json)

// const parsed = JSON.parse(json)
// console.log(parsed)

const list = document.getElementById('list')
const filter = document.getElementById('filter')
let USERS = []

filter.addEventListener('input', (event) => {
    const term = event.target.value.toLowerCase()
    const filtered = USERS.filter((user) => {
        return user.name.toLowerCase().includes(term)
    })
    render(filtered)
})
async function start() {
    list.innerHTML = 'Загрузка...'
    try {
        const resp = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await resp.json()
        setTimeout(() => {
            USERS = data
            render(data)
        })
    } catch (err) {
        list.style.color = 'red'
        list.innerHTML = err.message
    }
}

function render(users = []) {
    if (users.length === 0) {
        list.innerHTML = 'Ничего не найдено'

    } else {
        const html = users.map(toHTML).join('')
        list.innerHTML = html
    }


}

function toHTML(user) {
    return `
    <li class="list-group-item d-flex justify-content-between">${user.name}</li>
    `
}
start()