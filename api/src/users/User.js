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
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: [true, 'You need to enter an email address'],
        unique: [true, 'This email address is alreay taken']
    },
    password: {
        type: String,
        required: [true, 'You need to enter a password']
    },
    username: {
        type: String,
        required: [true, 'You need to enter a username']
    },
    firstName: {
        type: String,
        required: [true, 'You need to enter a first name']
    },
    lastName: {
        type: String,
        required: [true, 'You need to enter a last name']
    },
    country: {
        type: String
    }
}, { timestamps: true });
userSchema.methods.validPassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield bcrypt_1.default.compare(password, this.password);
            return result;
        }
        catch (_a) {
            return false;
        }
    });
};
userSchema.methods.hashPassword = function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcrypt_1.default.hash(this.password, 8);
    });
};
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
