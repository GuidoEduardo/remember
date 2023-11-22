import { yoga } from './config/yoga';

async function main() {
	const server = Bun.serve(yoga);

	console.log(`🚀 server running on ${new URL(yoga.graphqlEndpoint, `http://${server.hostname}:${server.port}`)}\n💫 launched`);
}

main().catch(console.error);
