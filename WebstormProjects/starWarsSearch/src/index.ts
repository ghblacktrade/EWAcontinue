import express, {Request, Response} from 'express'


const app = express()
const port = 3000
const apiUrl = 'https://swapi.dev/api/'

app.get('/', async(request: Request, response: Response) => {

   response.send('Pasha ebusha')

})


app.listen(port, () => {

    console.log(`Pasha create server on port ${port}`)
})