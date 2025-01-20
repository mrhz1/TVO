import Server from './server.ts';

const PORT = process.env.PORT ?? '10000';
const server = new Server(PORT);
server.listen();
