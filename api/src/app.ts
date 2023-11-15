import { createServer } from "https";
import { graphqlServer } from "./config/graphql";

async function main() {
    const server = createServer(graphqlServer);

    server.listen(5000, () => {
        console.info('server is running on https://localhost:5000 💫')
    });
}

main().catch(console.error);