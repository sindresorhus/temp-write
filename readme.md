# temp-write

> Write data to a random temporary file

## Install

```sh
npm install temp-write
```

## Usage

```js
import fs from 'node:fs';
import tempWrite from 'temp-write';

const filePath = tempWrite.sync('unicorn');
//=> '/var/folders/_1/tk89k8215ts0rg0kmb096nj80000gn/T/4049f192-43e7-43b2-98d9-094e6760861b'

fs.readFileSync(filePath, 'utf8');
//=> 'unicorn'

tempWrite.sync('unicorn', 'pony.png');
//=> '/var/folders/_1/tk89k8215ts0rg0kmb096nj80000gn/T/4049f192-43e7-43b2-98d9-094e6760861b/pony.png'

tempWrite.sync('unicorn', 'rainbow/cake/pony.png');
//=> '/var/folders/_1/tk89k8215ts0rg0kmb096nj80000gn/T/4049f192-43e7-43b2-98d9-094e6760861b/rainbow/cake/pony.png'
```

## API

### tempWrite(fileContent, filePath?)

Returns a `Promise` for the file path of the temporary file.

### tempWrite.sync(fileContent, filePath?)

Returns the file path of the temporary file.

#### fileContent

Type: `string | Uint8Array | stream.Readable`

The data to write to the temporary file. Streams are supported only with the async API.

#### filePath

Type: `string`\
Examples: `'img.png'` `'foo/bar/baz.png'`

Optionally specify a file path which is appended to the random path.

## Related

- [tempy](https://github.com/sindresorhus/tempy) - Get a random temporary file or directory path
