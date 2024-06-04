"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generatePassword = () => {
    return Math.random().toString(36).slice(2, 10);
};
exports.default = generatePassword;
