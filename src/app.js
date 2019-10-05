const express = require('express')
const path = require('path') //modulo core di Node per i path
const hbs = require('hbs')


//console.log(__dirname) //stampa nome directory dove si trova questo file
//console.log(__filename) //stampa tutto il percorso con il nome di questo file
/*console.log(path.join(__dirname)) //comportamento uguale a sopra
console.log(path.join(__dirname,'../..')) //per ogni coppia di .. torna indietro di una cartella
console.log(path.join(__dirname,'../public')) //stampa dov'è publix
*/
const app = express()

//Define Paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')  //set da delle impostazioni ad Express, hbs è il modulo installato --> in questa riga abbiamo settato handlebars e ora possiamo creare template dinamici
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index', { //renderizza una mia view, index deve coincidere con il nome della view (in questo caso index.hbs)
        title: "Weather App",
        name: "Christian"
    }) 
})

app.get('/about',(req,res) => {
    res.render('about', {
        title: 'About Me',
        name:'Christian'

    })
})

app.get('/help',(req,res) => {
    res.render('help', {
        message: 'Help page for users',
        title: 'Help',
        name: 'Christian'
    })
})

/*app.get('',(req, res) => { //cosa restituisce
    //res.send('Hello Express!')
    res.send('<h1>Weather<h1>') //Restituisco HTML
})*/ //Non serve, sopra applica già una pagina per quella principale

/*app.get('/help',(req,res) => {
    res.send({ //Restituisco JSON
        name: 'Christian',
        age: 24
    })
})*/

/*app.get('/about', (req,res) => {
    res.send('<h1>About Page<h1>')
})*/

app.get('/weather',(req,res) => {
    res.send([
        {
            location: 'Torino',
            forecast: '50C°'
        },
        {
            location: 'Seattle',
            forecast: '14C°'
        }
    ])
})

app.get('/help/*',(req,res) => {
    res.send('Help Article not found')
})

app.get('*',(req,res) => { // * sta ad indicare tutto quello che non è riconosciuto nei precedenti get
    res.send('My 404 Page')
})


app.listen(3000, () => { //Inizializzi il server in ascolto, dando la porta dove rimani in ascolto e 3000 è per lo sviluppo locale
    console.log('Server is up on the port 3000')
}) 