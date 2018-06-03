import * as fs from 'fs';
import { configFile } from './constants';

// only on dev
export const config = {
    host: 'host',
    port: 5432,
    database: 'test',
    user: 'test',
    password: 'test'
};

// the config file can be replaced by
// export const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
