import express, { Response, Request } from 'express';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import morgan from 'morgan';
import cors from 'cors';
import http from 'http';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { auth } from './helpers';

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

// import path from 'path';
// app.get('/image', async (req: Request, res: Response) => {
//   try {
//     await auth(req.headers.authorization);

//     const list = [];
//     // const links = req.body.data.links;

//     // links.map((l) => {

//     // })
//     const link = 'uploads/62920f92c26d0c2d67bbad03/testimage.jpg';
//     res.sendFile(link, {
//       root: path.join(__dirname)
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });

// app.get('/image', async (req: Request, res: Response) => {
//   try {
//     await auth(req.headers.authorization);

//     console.log('PARAMS  ', req.query);
//     const link = ('uploads/' + req.query['path']) as string;

//     res.sendFile(link, {
//       root: path.join(__dirname)
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });

// Cloudinary
import { v2 as cloudinary } from 'cloudinary';

app.get('/upload-auth', async (req: Request, res: Response) => {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);
    // const config = cloudinary.config();
    // const apiSecret = config.api_secret as string;
    const apiSecret = process.env.API_SECRET as string;

    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        folder: req.query?.dir || ''
      },
      apiSecret
    );

    const signData = {
      timestamp,
      signature,
      apiKey: process.env.API_KEY,
      cloudname: process.env.CLOUD_NAME
    };

    res.send(signData);
  } catch (err) {
    console.log(err);
  }
});

setRoutes(app);

// Catch 404 errors

// app.use((req, res, next) => {
//   next(createError(404));
// });

// app.use(
//   (
//     err: { [prop: string]: unknown },
//     req: express.Request,
//     res: express.Response
//   ): void => {
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') == 'development' ? err : {};
//     console.log(err);
//     res.status((err.status as number) || 500);
//     res.json(res.locals.error);
//   }
// );

// MongoDB Connection
import './mongo';

server.listen(port, () => {
  console.log(`Server is operational on port ${port}`);
});

export default app;
