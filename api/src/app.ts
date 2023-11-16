import { createServer } from "http";
import { yogaServer } from  "./config/yoga";

async function main() {
    const server = createServer(yogaServer);

    server.listen(5000, () => {
        console.info(`🚀 server ready at: http://localhost:5000\n💫 launched`);
    });
}

main().catch(console.error);
