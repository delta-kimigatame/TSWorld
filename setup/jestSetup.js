import { TextDecoder } from 'util';
import { createRequire } from "module";
global.TextDecoder = TextDecoder;
global.createRequire = createRequire