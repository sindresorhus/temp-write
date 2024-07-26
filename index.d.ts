declare const tempWrite: { // eslint-disable-line unicorn/prevent-abbreviations
	/**
	Write data to a random temporary file.

	@param fileContent - The data to write to the temporary file.
	@param filePath - Optionally specify a file path which is appended to the random path. Example: `'img.png'` `'foo/bar/baz.png'`.
	@returns The file path of the temporary file.

	@example
	```
	import fs from 'node:fs/promises';
	import tempWrite from 'temp-write';

	const filePath = await tempWrite('unicorn');
	//=> '/var/folders/_1/tk89k8215ts0rg0kmb096nj80000gn/T/4049f192-43e7-43b2-98d9-094e6760861b'

	await fs.readFile(filePath, 'utf8');
	//=> 'unicorn'

	await tempWrite('unicorn', 'pony.png');
	//=> '/var/folders/_1/tk89k8215ts0rg0kmb096nj80000gn/T/4049f192-43e7-43b2-98d9-094e6760861b/pony.png'

	await tempWrite('unicorn', 'rainbow/cake/pony.png');
	//=> '/var/folders/_1/tk89k8215ts0rg0kmb096nj80000gn/T/4049f192-43e7-43b2-98d9-094e6760861b/rainbow/cake/pony.png'
	```
	*/
	(fileContent: string | Uint8Array | NodeJS.ReadableStream, filePath?: string): Promise<string>;

	/**
	Synchronously write data to a random temporary file.

	@param fileContent - The data to write to the temporary file.
	@param filePath - Optionally specify a file path which is appended to the random path. Example: `'img.png'` `'foo/bar/baz.png'`.
	@returns The file path of the temporary file.

	@example
	```
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
	*/
	sync(fileContent: string | Uint8Array, filePath?: string): string;
};

export default tempWrite;
