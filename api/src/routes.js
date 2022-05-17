"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userHandlers_1 = __importDefault(require("./users/userHandlers"));
const setRoutes = (app) => {
    app.use('/users', userHandlers_1.default);
};
exports.default = setRoutes;
