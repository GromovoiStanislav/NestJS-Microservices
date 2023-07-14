## NestJS GraphQL Microservices monorepo with Apollo Federation 2 (+Authentication)

```
nest g app gateway
nest g app users
nest g app posts
```

edit nest-cli.json

```
npm run start:dev users
npm run start:dev posts
npm run start:dev
```

```
npm i @apollo/gateway @apollo/subgraph
npm i @nestjs/graphql @nestjs/apollo @apollo/server graphql
```

Access the GraphQL http://localhost:3002/graphql

```
in Headers:
{
  "Authorization": "Bearer JWT"
}


mutation CreateUser {
  createUser(createUserInput: { email: "user@mail.com", password: "123" }) {
    id
    email
    password
  }
}

query Users {
  users {
    id
    email
    password
    posts {
      id
      body
    }
  }
}

query User {
  user(id: 1) {
    id
    email
    password
    posts {
      id
      body
    }
  }
}



mutation CreatePost {
  createPost(createPostInput: { body: "body", authorId: 1 }) {
    id
    authorId
    body
  }
}

query Posts {
  posts {
    id
    authorId
    body
     user {
      id
      email
      password
    }
  }
}

query Post {
  post(id: 1) {
    id
    authorId
    body
     user {
      id
      email
      password
    }
  }
}
```


