const library = document.querySelector('main')
const addBook = document.querySelector('button')
const form = document.querySelector('form')
const cancelForm = document.querySelector('.form-exit')

let myLibrary = [];

class Book {
    constructor(title, author, pages, language, hasRead) {
        this.title = title
        this.author = author
        this.pages = pages
        this.language = language
        this.hasRead = hasRead
    }
    addBookToLibrary() {
        myLibrary.push(this)
        createCard(this, myLibrary.indexOf(this))
    }
    removeBookFromLibrary() {
        let bookIndex = myLibrary.indexOf(this)
        removeElementsByClass(`card${bookIndex}`)
        myLibrary.splice(bookIndex, 1)
    }
    removeCard(index) {
        const deleteBtn = document.querySelector(`.remove${index}`)
        deleteBtn.addEventListener('click', () => {
            this.removeBookFromLibrary()
            removeElementsByClass(`card${index}`)
        })
    }
}

function createCard(book, bookNum) {
    const card = document.createElement('div')
    const remove = document.createElement('div')
    const title = document.createElement('div')
    const author = document.createElement('div')
    const pages = document.createElement('div')
    const language = document.createElement('div')
    const read = document.createElement('div')
    const label = document.createElement('label')
    const input = document.createElement('input')
    const span = document.createElement('span')
    input.type = 'checkbox'
    input.value = book.hasRead
    if (input.value == 'true') {
        input.checked = true
    }

    remove.textContent = 'X'
    title.textContent = book.title
    author.textContent = `By: ${book.author}`
    pages.textContent = `Pages: ${book.pages}`
    language.textContent = `Language: ${book.language}`
    read.textContent = 'Mark as read:'

    card.classList.add('card', `card${bookNum}`)
    remove.classList.add('remove', `remove${bookNum}`)
    title.className = 'title'
    author.className = 'author'
    pages.className = 'pages'
    language.className = 'language'
    read.className = 'read'
    label.className = 'switch'
    span.classList.add('slider', 'round')

    library.append(card)
    card.append(remove, title, author, pages, language, read, label)
    read.append(label)
    label.append(input, span)
}

function removeElementsByClass(className) {
    const elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function openForm() {
    document.querySelector('form').style.display = 'block'
    document.querySelector('.blur').className = 'blurred'
}
function closeForm() {
    document.querySelector('form').style.display = 'none'
    document.querySelector('.blurred').className = 'blur'
}

addBook.addEventListener('click', () => {
    openForm()
    cancelForm.onclick = closeForm
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputTitle = document.querySelector('#title').value
    const inputAuthor = document.querySelector('#author').value
    const inputPages = document.querySelector('#pages').value
    const inputLang = document.querySelector('#language').value
    const inputRead = document.querySelector('input[name="read-status"]:checked').value
    const book = new Book(inputTitle, inputAuthor, inputPages, inputLang, inputRead)
    book.addBookToLibrary()
    book.removeCard(myLibrary.indexOf(book))
    form.reset()
    closeForm()
})