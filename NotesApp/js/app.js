console.log("Welcome to notes app. This is app.js");
showNotes();


// If user clicks on Add Note, add it to local storage.

let addBtn = document.getElementById('addBtn');

addBtn.addEventListener('click', function (e) {

    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem('notes');

    if (notes == null) {
        notesObj = []
    }
    // notesObj is an array that's why we have to retreive it using JSON.parse
    else {
        notesObj = JSON.parse(notes);
    }

    // Object created for title and note
    let myObj = {
        title : addTitle.value,
        text : addTxt.value
    }

    // Since notesObj is converted into an array we can apply
    // push operation on it to add addTxt value in local storage.

    notesObj.push(myObj);

    //JSON.stringify to save an array as a string.
    localStorage.setItem('notes', JSON.stringify(notesObj))

    //To empty the textarea after adding a note
    addTxt.value = "";
    addTitle.value = "";
    showNotes();

    // console.log(notesObj);

});


// Function to show elements from local storage.
function showNotes() {

    // To retreive the content from local storage for it to display in Your Notes Section.
    let notes = localStorage.getItem('notes');

    // To check if the notes is available or not.
    if (notes == null) {
        notesObj = []
    }
    else {
        notesObj = JSON.parse(notes);
    }

    // Creating an empty string to create a card every time a note is created and store it in notesElm.innerHTML(Your Card)
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
              <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                      <div class="card-body">
                          <h5 class="card-title">${element.title}</h5>
                          <p class="card-text"> ${element.text}</p>
                          <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                      </div>
                  </div>`;
    });
    // If the local storage (notesObj) is not null, add it to notesElm i.e create a card.

    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show here! Use "Add a Note" section to add notes`
    }
}

function deleteNote(index) {
    let notes = localStorage.getItem('notes');

    // To check if the notes is available or not.
    if (notes == null) {
        notesObj = []
    }
    else {
        notesObj = JSON.parse(notes);
    }
    //  We have added onclick delete note so that the index of the note gets marked and can be deleted by onclick
    // Local variable to splice (Deleting the note).
    notesObj.splice(index, 1);

    //To set notesObj back into local storage so that we can delete the note.
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes(); 
}

let search = document.getElementById('searchTxt');
search.addEventListener('input', function () {
    let inputVal = search.value.toLowerCase();     //tagging search box value

    // Now grabbing the notecard section (your notes card)
    let noteCards = document.getElementsByClassName('noteCard');

    // Applying loop for every paragraph to save its content to card text


    Array.from(noteCards).forEach(function (element) {

        // Iterating via cardTxt on the paragraph created in Your Notes section. 

        let cardTxt = element.getElementsByTagName('p')[0].innerText;     // Since there is only 1 element so [0] means first elem of p.  
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})  


