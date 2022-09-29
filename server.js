const express = require('express')
const cors = require('cors')
const { graphqlHTTP } = require('express-graphql')
const { executableSchema } = require('./schema')
const app = express()

const PORT = process.env.PORT || 8000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get(
    '/',
    (req, res) => {
        res.send('The GrapQL endpoint is /graphql')
    }
)

app.use(
    '/graphql',
    graphqlHTTP({
        schema: executableSchema,
        graphiql: true,
    })
)


app.listen(PORT, () => {
    console.log(`Running a server at http://localhost:${PORT}`)
})