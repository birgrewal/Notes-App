// Declaring Variables
const input = document.querySelector('#noteInput');
const addBtn = document.querySelector('#addBtn');
const noteShelf = document.querySelector('#noteShelf ul');
const filterSelect = document.querySelector('#filterSelect');
filterSelect.selectedIndex = "0"
let notes;

// Declaring the notes list
if (localStorage.getItem('notes') !== null) {
    notes = JSON.parse(localStorage.getItem('notes'));
} else {
    let items = [];
    localStorage.setItem('notes', JSON.stringify(items));
    notes = JSON.parse(localStorage.getItem('notes'));
}

// Event Listeners
document.addEventListener('DOMContentLoaded', showNotes)
addBtn.addEventListener('click', addNote);
document.addEventListener('DOMContentLoaded', checkDeleteNote);
document.addEventListener('DOMContentLoaded', isChecked)
filterSelect.addEventListener('click', filterList)

// Functions
function addNote() {
    let noteValue = input.value;
    let text = document.createTextNode(noteValue);
    let li = document.createElement('li');
    li.appendChild(text)
    let completeBtn = document.createElement('button');
    completeBtn.innerHTML = '<i class="fas fa-check"></i>';
    completeBtn.classList.add('completeBtn');
    let deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.classList.add('deleteBtn');
    let noteDiv = document.createElement('div');
    noteDiv.classList.add('note');
    noteDiv.appendChild(li);
    noteDiv.appendChild(completeBtn);
    noteDiv.appendChild(deleteBtn);
    noteShelf.appendChild(noteDiv);
    notes.push(input.value);
    localStorage.setItem('notes', JSON.stringify(notes));
    input.value = "";
    checkDeleteNote();
    isChecked();
}

function showNotes() {
    Array.from(notes).forEach(element => {
        let text = document.createTextNode(element);
        let li = document.createElement('li');
        li.appendChild(text)
        let completeBtn = document.createElement('button');
        completeBtn.innerHTML = '<i class="fas fa-check"></i>';
        completeBtn.classList.add('completeBtn');
        let deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.classList.add('deleteBtn');
        let noteDiv = document.createElement('div');
        noteDiv.classList.add('note');
        noteDiv.appendChild(li);
        noteDiv.appendChild(completeBtn);
        noteDiv.appendChild(deleteBtn);
        noteShelf.appendChild(noteDiv);
    });
}

function checkDeleteNote() {
    let deleteBtns = document.getElementsByClassName('deleteBtn');
    Array.from(deleteBtns).forEach(e => {
        e.addEventListener('click', () => {
            let parent = e.parentElement;
            let childNum = parent.childElementCount;
            let innerText = parent.innerText.split('DeleteEdit')[0]
            let index = notes.indexOf(innerText);
            notes.splice(index, 1);
            localStorage.setItem('notes', JSON.stringify(notes));
            parent.remove();
        });
    });
}

function filterList(element) {
    let todos = noteShelf.childNodes;
    console.log(todos);
    todos.forEach(e => {
        if (e.nodeType === 1) {
            let checked;
            let classList = Array.from(e.classList);
            (classList.includes('checked')) ? checked = true : checked = false;
            switch (element.explicitOriginalTarget.value) {
                case 'All':
                    e.classList.remove('hidden');
                    e.style.display = "flex";
                    break;
                case 'Checked':
                    if (!checked) {
                        e.classList.add('hidden')
                        e.style.display = "none";
                    } else if (checked) {
                        e.classList.remove('hidden')
                        e.style.display = "flex";
                    }
                    break;
                case 'Unchecked':
                    if (checked) {
                        e.classList.add('hidden')
                        e.style.display = "none";
                    } else if (!checked) {
                        e.classList.remove('hidden')
                        e.style.display = "flex";
                    }
                    break;
            }
        }
    });
}

function isChecked() {
    let completeBtns = document.getElementsByClassName('completeBtn');
    console.log(completeBtns);

    Array.from(completeBtns).forEach(e => {
        e.addEventListener('click', () => {
            e.parentElement.classList.add('checked')
        })
    });
}