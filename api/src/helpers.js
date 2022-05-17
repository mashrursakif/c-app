"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.formatErr = exports.secureParams = void 0;
const secureParams = (args, safeList) => {
    const params = Object.keys(args);
    const passed = {};
    params.map((p) => {
        if (safeList.includes(p)) {
            passed[p] = args[p];
        }
    });
    return passed;
};
exports.secureParams = secureParams;
const formatErr = (err) => {
    if (err === 'auth') {
        return { category: 'auth' };
    }
    else if (err.name === 'ValidationError') {
        const res = {};
        Object.keys(err.errors).map((k) => {
            if (err.errors[k].name === 'CastError') {
                res[k] = 'This value is invalid';
            }
            else {
                const message = err.errors[k]
                    .properties.message;
                res[k] = message;
            }
        });
        return { category: 'form', errors: res };
    }
    else {
        return { category: 'unknown' };
    }
};
exports.formatErr = formatErr;
const auth = () => {
    const token = ;
};
exports.auth = auth;
