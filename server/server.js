const { createServer, createPubSub } = require("@graphql-yoga/node");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");

// Provide your schema

const messages = [];

const pubSub = createPubSub();

const typeDefs = `
    type Message {
        id: ID!
        user: String!
        content: String!
    }
    type Query {
        messages: [Message!]
    }
    type Mutation {
        postMessage(user: String!, content: String!): ID!
    }

    type Subscription {
      messages: [Message!]
    }
`;

const subscribers = [];
const onMessagesUpdates = (fn) => subscribers.push(fn);

const resolvers = {
  Query: {
    messages: () => messages,
  },
  Mutation: {
    postMessage: (_, { user, content }) => {
      const id = messages.length;
      messages.push({
        id,
        user,
        content,
      });
      subscribers.forEach((fn) => fn());
      return id;
    },
  },
  Subscription: {
    messages: {
      subscribe: () => {
        const channel = Math.random().toString(36).slice(2, 15);
        console.log({ channel, messages });
        onMessagesUpdates(() => pubSub.publish(channel, { messages }));
        setTimeout(() => pubSub.publish(channel, { messages }), 0);
        return pubSub.subscribe(channel);
      },
      // resolve: (payload) => payload,
    },
  },
};

async function main() {
  const server = createServer({
    schema: {
      typeDefs,
      resolvers,
    },
    context: { pubSub },
    graphiql: {
      subscriptionsProtocol: "ws",
    },
  });

  // Start the server and explore http://localhost:4000/graphql
  const httpServer = await server.start();

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: server.getAddressInfo().endpoint,
  });

  // Integrate Yoga's Envelop instance and NodeJS server with graphql-ws
  useServer(
    {
      execute: (args) => args.rootValue.execute(args),
      subscribe: (args) => args.rootValue.subscribe(args),
      onSubscribe: async (ctx, msg) => {
        const { schema, execute, subscribe, contextFactory, parse, validate } =
          server.getEnveloped(ctx);

        const args = {
          schema,
          operationName: msg.payload.operationName,
          document: parse(msg.payload.query),
          variableValues: msg.payload.variables,
          contextValue: await contextFactory(),
          rootValue: {
            execute,
            subscribe,
          },
        };

        const errors = validate(args.schema, args.document);
        if (errors.length) return errors;
        return args;
      },
    },
    wsServer
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
