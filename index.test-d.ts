import {expectType} from 'tsd';
import tempWrite from './index.js';

expectType<Promise<string>>(tempWrite('unicorn'));
expectType<Promise<string>>(tempWrite('unicorn', 'pony.png'));
expectType<Promise<string>>(tempWrite(process.stdin, 'pony.png'));
expectType<Promise<string>>(tempWrite(Buffer.from('pony'), 'pony.png'));

expectType<string>(tempWrite.sync('unicorn'));
expectType<string>(tempWrite.sync(Buffer.from('unicorn')));
expectType<string>(tempWrite.sync('unicorn', 'pony.png'));
