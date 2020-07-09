const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

const MAX_ID_VALUE = 10000

let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    },
    {
      "name": "Bob",
      "number": "040-123456",
      "id": 5
    },
    {
      "name": "Olympia",
      "number": "12-43-234345",
      "id": 6
    }
  ]
  
app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    const totalPeople = persons.length
    const date = new Date()

    res.send(`<div> Phonebook has info for ${totalPeople} people <br /> ${date}</div>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if(person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})


const generateId = () => {
  return (Math.floor(Math.random() * MAX_ID_VALUE)) 
}

app.post('/api/persons', (req, res) => {
    const body = req.body
    const name = body.name.trim()
    const number = body.number.trim()

    if(!name || !number){
      return res.status(400).json({
        error: 'missing name or number'
      })
    }
    
    const sameName = persons.find(person => person.name === name)
    if(sameName){
      return res.status(403).json({
        error: 'name must be unique'
      })
    }
    
    const person = {
      name: name,
      number: number,
      id: generateId()
    }
    
    persons = persons.concat(person)
    res.json(person)
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})