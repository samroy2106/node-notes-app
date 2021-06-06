const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
  const notes = loadNotes()
  const duplicateNote = notes.find(note => note.title === title)

  if(!duplicateNote) {
    notes.push({
      title: title,
      body: body
    })

    saveNotes(notes)
    console.log(chalk.green('New note added!'))
  } else {
    console.log(chalk.red('Note title taken!'))
  }
}

const removeNote = (title) => {
  const notes = loadNotes()
  const remainingNotes = notes.filter(note => note.title != title)

  if(notes.length - remainingNotes.length === 1) {
    saveNotes(remainingNotes)
    console.log(chalk.green('Note removed!'))
  } else {
    console.log(chalk.red('No note with given title found!'))
  }
}

const listNotes = () => {
  const notes = loadNotes()
  console.log(chalk.yellow('Your notes...'))

  notes.forEach((note) => console.log(note.title))
}

const readNote = (title) => {
  const notes = loadNotes()

  const noteToRead = notes.find(note => note.title === title)

  if(noteToRead) {
    console.log(chalk.yellow(noteToRead.title))
    console.log(noteToRead.body)
  } else {
    console.log(chalk.red('Note with given title does not exist!'))
  }
}

const saveNotes = (notes) => {
  dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
  try{
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch(e) {
    return []
  }
}

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
}
