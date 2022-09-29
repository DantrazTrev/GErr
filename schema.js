const { makeExecutableSchema } = require('@graphql-tools/schema')
const { GraphQLScalarType } = require('graphql')
const { mentionFinder, emojiFinder, linkFinder, IsValidURL } = require('./resolvers')


//Custom Scalar type Link to allow * returns from links , Additional typecheck just yk for saftey
const Link = new GraphQLScalarType({
    name: 'Link',
    description: 'A Link object contains a url and a title \n  {url:String! , title:String!}',
    serialize(value) {
        if (!typeof value.title === 'string')
            throw ("title must be a string")
        if (!typeof value.url === 'string' && IsValidURL(value.url))
            throw ("URL must be a string")
        return value
    },
    parseValue(value) {
        let obj = JSON.parse(value)
        if (!typeof obj.title === 'string')
            throw ("title must be a string")
        if (!typeof obj.url === 'string' && IsValidURL(value.url))
            throw ("URL must be a string")
        return obj
    },
    parseLiteral(ast) {
        switch (
        ast.kind

        ) {
        }
    }
})
const typeDefs = `

scalar Link

type records {
  mentions:[String]
  emoticons:[String]
  links: [Link]
}
scalar Object


type Query {
  records(message:String!): records!
}
`
const resolvers = {
    Query: {
        records: async (obj, args, context, info) => {
            obj = {
                mentions: mentionFinder(args.message),
                emoticons: emojiFinder(args.message),
                links: await linkFinder(args.message)
            }
            return obj

        },

    },
    Link: Link



}

const executableSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
})



module.exports = { executableSchema }