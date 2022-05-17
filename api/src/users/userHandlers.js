"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("./User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = __importDefault(require("express"));
const helpers_1 = require("../helpers");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { loginData } = req.body;
        const user = yield User_1.default.findOne({ email: loginData.email });
        if (yield (user === null || user === void 0 ? void 0 : user.validPassword(loginData.password))) {
            const token = jsonwebtoken_1.default.sign(user === null || user === void 0 ? void 0 : user._id.toString(), process.env.JWT_SEC);
            res.send({ token, userId: user === null || user === void 0 ? void 0 : user._id });
            return;
        }
        throw 'auth';
    }
    catch (err) {
        res.send((0, helpers_1.formatErr)(err));
    }
});
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ;
    }
    catch (err) {
        console.log(err);
    }
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = new User_1.default(userParams(req.body.userData));
        yield user.validate();
        yield user.hashPassword();
        yield user.save();
        console.log('REQ   ', user);
        res.send({ user });
    }
    catch (err) {
        console.log('ERR  ', (0, helpers_1.formatErr)(err));
        res.send((0, helpers_1.formatErr)(err));
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ _id: req.body._id });
        Object.assign(user, req.body.userData);
        yield (user === null || user === void 0 ? void 0 : user.save());
        res.send({ user });
    }
    catch (err) {
        res.send((0, helpers_1.formatErr)(err));
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.deleteOne({ _id: req.body._id });
        res.send({ user });
    }
    catch (err) {
        res.send((0, helpers_1.formatErr)(err));
    }
});
const a = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const u = await User.findOne({ email: 'a@b.com' });
    console.log('REQ //  ', req.headers);
});
// a();
const userParams = (args) => {
    return (0, helpers_1.secureParams)(args, [
        'email',
        'password',
        'username',
        'firstName',
        'lastName',
        'country'
    ]);
};
const router = express_1.default.Router();
router.get('/', getUser);
router.post('/login', login);
router.post('/create', createUser);
exports.default = router;
