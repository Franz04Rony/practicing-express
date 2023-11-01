import 'dotenv/config'
import express from "express"
import data from './data.json' assert {type: "json"}

const app = express()
const port = process.env.PORT ?? 3010


//devolver un cliente por id (params)
app.get('/clients/:id', (req, res, next) =>{
    const {id} = req.params
    const user = data.find((v) => v.id === id)
    return res.json(user)
})


app.get('/', (req,res) => {
    return res.json({ welcome: "Hello everyone!" })
})


//devolver todos los clientes o por ocupacion o por restriccion de edad (query params)
app.get('/clients', (req,res)=> {
    const {ocupacion, restriccion} = req.query

    if(restriccion){
        if(restriccion === 'adultos'){
            const users = data.filter((v)=> v.age > 18)
            return res.json(users)
        }
    }

    if(ocupacion) {
        const users = data.filter((v) => v.ocupacion.some((e) => e.toLocaleLowerCase() === ocupacion.toLocaleLowerCase()))
        return res.json(users)
    }

    return res.json(data)
})

app.use("/secret",(req,res,next)=>{
    return res.status(418).send("aaa")
})

app.listen( port , ()=>{
    console.log(`Escuchando el puerto ${port}`)
} )