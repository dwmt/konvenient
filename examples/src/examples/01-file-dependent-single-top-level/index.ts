import {config} from './config';

import express from 'express';

const app = express();

if (!config.isProd()) {
	console.log(
		'The application is not in production mode. Hopefully, this is not the actual prod env then.',
	);
}

app.get('/', (_req, res) => {
	res.send(config.greeting.message);
});

app.listen(config.port, () => {
	console.log(`The application is listening on port ${config.port}!`);
});
