"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: 'src/.env' });
const app = (0, express_1.default)();
const port = process.env.EXPRESS_PORT;
app.use((0, morgan_1.default)(':date[web] - :method :url :status - :response-time ms'));
app.use((0, cors_1.default)({
    origin: ['http://localhost:5000', 'http:/web:5000'],
    methods: ['POST']
}));
// Parse request body as JSON
app.use(express_1.default.json({
    verify: (req, res, buf) => {
        req['rawBody'] = buf;
    }
}));
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
const server = http_1.default.createServer(app);
// Routes
const routes_1 = __importDefault(require("./routes"));
app.get('/', (req, res) => {
    const a = JSON.stringify({ hi: 'hi' });
    res.send(a);
});
(0, routes_1.default)(app);
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
require("./mongo");
server.listen(port, () => {
    console.log(`Server is operational on port ${port}`);
});
exports.default = app;
