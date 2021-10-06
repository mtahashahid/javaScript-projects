const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector(".add-note");
// creating notesElement for each note from local storage and displaying before addNoteButton
getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content);
  notesContainer.insertBefore(noteElement, addNoteButton);
});
// invoking the addNote function to add note on click
addNoteButton.addEventListener("click", () => addNote());

// getting previously saved notes from local storage
function getNotes() {
  return JSON.parse(localStorage.getItem("sticky-notes") || "[]");
}
// saving notes to the local storage
function saveNotes(notes) {
  localStorage.setItem("sticky-notes", JSON.stringify(notes));
}
// create DOM element for each note
function createNoteElement(id, content) {
  const noteEl = document.createElement("textarea");
  noteEl.classList.add("note");
  noteEl.value = content;
  noteEl.placeholder = "Empty Sticky Note";

  noteEl.addEventListener("change", () => {
    updateNote(id, noteEl.value);
  });
  noteEl.addEventListener("dblclick", () => {
    const doDelete = confirm("Are you sure you want to delete this note?");
    doDelete ? deleteNote(id, noteEl) : "";
  });
  return noteEl;
}
// adding new notes
function addNote() {
  const notes = getNotes();
  const noteObject = {
    id: Math.floor(Math.random() * 100000),
    content: "",
  };
  const noteElement = createNoteElement(noteObject.id, noteObject.content);
  notesContainer.insertBefore(noteElement, addNoteButton);
  notes.push(noteObject);
  saveNotes(notes);
}
// updating notes
function updateNote(id, newContent) {
  const notes = getNotes();
  const targetNote = notes.filter((note) => note.id == id)[0];
  targetNote.content = newContent;
  saveNotes(notes);
}
// deleting the specified note
function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id != id);
  saveNotes(notes);
  notesContainer.removeChild(element);
}
