"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'thesaurus',
    password: '14159199',
    port: 5432,
});
pool.connect();
exports.default = pool;
