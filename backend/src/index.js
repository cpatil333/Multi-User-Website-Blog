import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createContext } from "./context.js";
import { ApolloServer } from "@apollo/server";
import { resolvers } from "./resolvers/index.js";
import { typeDefs } from "./models/schema.js";
import { expressMiddleware } from "@apollo/server/express4";
import path from "path";
import { fileURLToPath } from "url";
import routerUploads from "./middlewares/upload.js";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", routerUploads);
app.use("/uploads", express.static(path.join(__dirname, "src/uploads")));
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
await server.start();
app.use((req, res, next) => {
    if (!req.body && process.env.NODE_ENV !== "production") {
        req.body = {};
    }
    next();
});
app.use("/graphql", expressMiddleware(server, {
    context: async ({ req, res }) => await createContext({ req, res }),
}));
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}/graphql`);
});
//# sourceMappingURL=index.js.map