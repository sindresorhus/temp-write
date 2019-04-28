import {expectType} from 'tsd';
import tempWrite = require('.');

expectType<Promise<string>>(tempWrite('unicorn'));
expectType<Promise<string>>(tempWrite('unicorn', 'pony.png'));
expectType<Promise<string>>(tempWrite(process.stdin, 'pony.png'));
expectType<Promise<string>>(tempWrite(new Buffer('pony'), 'pony.png'));

expectType<string>(tempWrite.sync('unicorn'));
expectType<string>(tempWrite.sync(new Buffer('unicorn')));
expectType<string>(tempWrite.sync('unicorn', 'pony.png'));
