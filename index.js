const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
var _ = require('lodash');

const users = [{
    _id:"1",
    name:"neernnnnaj gupta",
    email:"n@gmail.com",
    address:"10"
},{
    _id:"2",
    name:"neeraj gupta 1",
    email:"n1@gmail.com",
    address:"20"
},
{
    _id:"4",
    name:"neeraj gupta 3",
    email:"n3@gmail.com",
    address:"30"
}];

const address = [
    {
    _id: "10",
    city: "lucknow",
    country: "india",
    userId:"1"

},
{
    _id: "20",
    city: "lucknow1",
    country: "india1" ,
    userId:"2"
},
{
    _id: "30",
    city: "lucknow2",
    country: "india2",
    userId:"3"  
}
]
// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    getUser(_id: ID!): User,
    getUsers: [User],
    getAddresses: [Address],
    hello: String,
    hey: String,
    getAddress(_id:ID!):Address
  }

  type User {
    _id: String,
    name: String,
    email: String,
    time:String,
    address: Address
  },

  type Address {
    _id: String,
    city: String,
    country: String,
    user: User
  }
`;

// resolvers are used to retreive data
const resolvers = {
    Query: {
         getUser(parent, args, context, info) {
             // when this will resolve it will give the users along with theri address
             // getting from the backend 
            const users  =  _.find(users, {_id:args._id});
            // filter out the users to get the address
           

        },
         getUsers() {        
            const time = new Date()    
            const r = users.map(u => {
                addr = {};
                addr.city = "lucknow"+u._id;
                addr.country = "india"+u._id;
                addr.user = u;
                u.address = addr;
                u.time=time;
                console.log('return data');
                return u;
            });
            
            return r;
        },
         getAddresses() {
            return address;
        },
        hello() {
            return 'Hi World'
        },
        hey() {
            return "GraphQL is fun"
        }
        
    }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);