import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

let notes = [
  {
    userId: 1,
    id: 1,
    title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
  },
  {
    userId: 1,
    id: 2,
    title: 'qui est esse',
    body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla'
  },
  {
    userId: 1,
    id: 3,
    title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
    body: 'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut'
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello world</h1>')
})

app.get('/notes', (request, response) => {
  response.json(notes)
})

app.get('/notes/:id', (request, response) => {
  const { id } = request.params
  const note = notes.find(note => note.id === Number(id))

  if (note) {
    response.json(note)
  }
  response.status(404).end()
})

app.delete('/notes/:id', (request, response) => {
  const { id } = request.params
  notes = notes.filter(note => note.id !== Number(id))
  console.log(notes)
  response.status(204).end()
})

app.post('/notes', (request, response) => {
  const { title, body } = request.body

  if (!title || !body) {
    return response.status(400).json({
      error: 'content is missing'
    })
  }

  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    title,
    body
  }
  notes = [...notes, newNote]

  response.status(201).json(newNote)
})

app.use((request, response) => {
  console.log(request.path)
  response.status(404).json({
    error: 'Not found'
  })
})

const PORT = 3001
app.listen(PORT, () => {
  console.log('Server is running on port', PORT)
})
