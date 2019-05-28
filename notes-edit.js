const titleElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#note-body')
const removeButton = document.querySelector('#remove-note')
const dateElement = document.querySelector('#updated-at')
const noteId = location.hash.substring(1)
let notes = getSavedNotes()
let note = notes.find(function (note) {
    return note.id === noteId
})

if (note === undefined){
    location.assign('/notes-app/index.html')
}

titleElement.value = note.title
bodyElement.value = note.body
dateElement.textContent = generateLastEdited(note.updatedAt)

// Save title on the fly
titleElement.addEventListener('input', function (e){
    note.title = e.target.value
    dateElement.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})

// save body on the fly
bodyElement.addEventListener('input', function (e) {
    note.body = e.target.value
    dateElement.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})

// remove button
removeButton.addEventListener('click', function (e) {
    removeNote(note.id)
    saveNotes(notes)
    location.assign('/notes-app/index.html')
})

window.addEventListener('storage', function (e) {
    if (e.key === 'notes'){
       notes = JSON.parse(e.newValue)
       note = notes.find(function (note) {
       return note.id === noteId
    })

if (note === undefined){
    location.assign('/notes-app/index.html')
}

titleElement.value = note.title
bodyElement.value = note.body
dateElement.textContent = generateLastEdited(note.updatedAt)
    }
})

