
const express = require('express')
const bodyParser = require('body-parser')
const PORT = 3000
const path = require('path')
const expressHbs = require('express-handlebars')
//my own import 
const routeDir = require('./utiils/path')
const app = express()

app.engine('handlebars', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'handlebars'}))
app.set('view engine', 'handlebars')
// app.set('view engine', 'pug') //global configuration
app.set('views', 'views') //where to find the views if the folder isn't called views

app.use(express.static(path.join(routeDir, 'public')))

app.use(bodyParser.urlencoded({extended: false}))

const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use('/admin', adminData.routes)
app.use(shopRoutes)

app.use((req, res,next) => {
    res.status(404).render('404', {pageTitle: 'Page not found'})
})
app.listen(PORT )

// const server = http.createServer((req, res) => {
//     const url = req.url
//     const method = req.method

//     if( url === '/' ) {
//         res.setHeader('Content-Type', 'text/html')
//         res.write('<html><head><title>Main page</title></head><body><h1>Main page.</h1></body>')
//         res.write('<form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></input></form>')
//         res.write('</html>')
//         return res.end()
//     }
//     else if (url === '/users') {
//         res.setHeader('Content-Type', 'text/html')
//         res.write('<html>')
//         res.write('<head><title>Users</title></head>')
//         res.write('<body><ul><li>User 1</li><li>User2</li></ul></body>')
//         res.write('</html>')
//         return res.end()
//     }

//     if(url === '/create-user' && method==="POST") {
//         const nameUser = []
//         req.on('data', (chunk) => {
//             nameUser.push(chunk)
//         })

//         req.on('end', () => {
//             const nameUserParsed = Buffer.concat(nameUser).toString().split('=')[1]
//             console.log(nameUserParsed)
//         })
//         res.statusCode = 302
//         res.setHeader('Location', '/')
//         return res.end()
//     }
// })

// server.listen(PORT)