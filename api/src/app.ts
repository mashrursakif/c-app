import express from 'express';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import morgan from 'morgan';
import cors from 'cors';
import http from 'http';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: 'src/.env' });

const app = express();

const port = process.env.EXPRESS_PORT;

app.use(morgan(':date[web] - :method :url :status - :response-time ms'));
app.use(
	cors({
		origin: ['http://localhost:5000', 'http:/web:5000'],
		methods: ['POST']
	})
);

// Parse request body as JSON
app.use(
	express.json({
		verify: (req: http.IncomingMessage, res, buf) => {
			req['rawBody'] = buf;
		}
	})
);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const server = http.createServer(app);

// Routes
import setRoutes from './routes';

app.get('/', (req, res) => {
	const a = JSON.stringify({ hi: 'hi' });
	res.send(a);
});

setRoutes(app);

// Catch 404 errors

// app.use((req, res, next) => {
// 	next(createError(404));
// });

// app.use(
// 	(
// 		err: { [prop: string]: unknown },
// 		req: express.Request,
// 		res: express.Response
// 	): void => {
// 		res.locals.message = err.message;
// 		res.locals.error = req.app.get('env') == 'development' ? err : {};
// 		console.log(err);
// 		res.status((err.status as number) || 500);
// 		res.json(res.locals.error);
// 	}
// );

// MongoDB Connection
import './mongo';

server.listen(port, () => {
	console.log(`Server is operational on port ${port}`);
});

export default app;
