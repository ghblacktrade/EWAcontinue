import express, { Request, Response } from 'express'
import englishController from './controllers/word.controller'


const app = express()
const port = 3000

//template engine
app.set('view engine', 'pug')

app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

app.get('/', (req: Request, res: Response) => {

    res.render('index')
})

app.post('/', async (req: Request, res: Response) => {

    const rusWord = req.body.russian
    const engWord = await englishController(rusWord)

    res.render('result', {engWord})
})


// app.get('/', (req: Request, res: Response) => {

//     res.send('hi, my test thesaurus')
// })


app.listen(port, () => {

    console.log('start pasha server')
})