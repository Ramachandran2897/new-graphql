const { gql } = require('apollo-server')

const typeDefs = gql`
enum nationality{
    INDIA
    USA
}
type movie{
    id: ID!,
    name: String!,
    reliseDate: Int!
}
type user{
    id: ID!
    name: String!,
    age: Int!
    nationality: nationality,
    favouriteMovie: [movie]
}
type Query{
    users: [user!]!
    # unoin example
    employees: getEmployeesOrError!
    user(id: ID!): user!
}
input createUserInput {
    name: String!,
    age: Int!,
    nationality: nationality = INDIA
}
input updateUserInput {
    id: ID!,
    name: String!,
    age: Int!
    nationality: nationality = INDIA
}
type Mutation{
    createUser(data: createUserInput!): [user!]! 
    updateUser(data: updateUserInput!): [user!]! 
    deleteUser(id: ID!): [user!]!
}
# union example
type employee{
    id: ID!,
    name: String!,
    age: Int!
}
type employeeData {
    employees: [employee!]!
}
type error{
    message: String!
}
union getEmployeesOrError = employeeData | error
`
module.exports = typeDefs