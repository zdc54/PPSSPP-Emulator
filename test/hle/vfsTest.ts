﻿///<reference path="../global.d.ts" />
import {assert} from "chai"
import {downloadFileAsync} from "../../src/global/async";
import {MemoryAsyncStream,Stream} from "../../src/global/stream";
import {ArrayBufferUtils, PromiseFast} from "../../src/global/utils";
import {parseIntFormat} from "../../src/global/math";
import {Iso} from "../../src/format/iso";
import {Psf} from "../../src/format/psf";
import {IsoVfs} from "../../src/hle/vfs/vfs_iso";
import {FileOpenFlags} from "../../src/hle/vfs/vfs";
import {StorageVfs} from "../../src/hle/vfs/vfs_storage";
import {MemoryStickVfs} from "../../src/hle/vfs/vfs_ms";
import {MemoryVfs} from "../../src/hle/vfs/vfs_memory";

export function ref() { } // Workaround to allow typescript to include this module

describe('vfs', () => {
	var isoData: Uint8Array;

	before(() => {
		return downloadFileAsync('data/samples/cube.iso').then((data) => {
			isoData = new Uint8Array(data);
		});
	});

	it('iso', () => {
		var asyncStream = new MemoryAsyncStream(ArrayBufferUtils.fromUInt8Array(isoData));

		return Iso.fromStreamAsync(asyncStream).then(iso => {
			var vfs = new IsoVfs(iso);
			return vfs.openAsync("PSP_GAME/PARAM.SFO", FileOpenFlags.Read, parseInt('777', 8)).then(file => {
				return file.readAllAsync().then(content => {
					var psf = Psf.fromStream(Stream.fromArrayBuffer(content));
					assert.equal(psf.entriesByName["DISC_ID"], "UCJS10041");
				});
			});
		});
	});

	it('storage', () => {
		var storageVfs = new StorageVfs('test');
		
		return PromiseFast.resolve(0)
			.then(() => {
				return storageVfs.writeAllAsync('simple', new Uint8Array([1, 2, 3, 4, 5]).buffer);
			})
			.then(() => {
				return storageVfs.getStatAsync('simple').then(stat => {
					assert.equal('simple', stat.name);
					assert.equal(5, stat.size);
				});
			})
			.then(() => {
				return storageVfs.readAllAsync('simple').then(data => {
					assert.equal(5, data.byteLength);
				});
			})
			.then(() => {
				return storageVfs.readAllAsync('nonExistant').then(data => {
					assert.fail();
				}).catch((e) => {
					assert.equal("File 'nonExistant' doesn't exist", e.message);
				});
			})
			.then(() => {
				return storageVfs.openAsync('simple2', FileOpenFlags.Create | FileOpenFlags.Write | FileOpenFlags.Truncate, parseIntFormat('0777')).then(file => {
					return PromiseFast.resolve(0)
						.then(() => {
							return file.writeChunkAsync(0, new Int8Array([1, 2, 3, 4, 5]).buffer);
						})
						.then(() => {
							return file.writeChunkAsync(2, new Int8Array([-3, -4, -5, -6, -7]).buffer);
						})
						.then(() => {
							return file.readAllAsync().then((data) => {
								var v = new Int8Array(data);
								assert.equal(7, v.length);
								assert.equal(1, v[0]);
								assert.equal(2, v[1]);
								assert.equal(-3, v[2]);
								assert.equal(-4, v[3]);
								assert.equal(-5, v[4]);
								assert.equal(-6, v[5]);
								assert.equal(-7, v[6]);
							});
						});
					;
				});
			})
		;
	});

	it('memorystick', () => {
		var storageVfs = new StorageVfs('test');
		var msVfs = new MemoryStickVfs([storageVfs], null as any, null as any);

		return PromiseFast.resolve(0)
			.then(() => {
				return msVfs.writeAllAsync('simple', new Uint8Array([1, 2, 3, 4, 5]).buffer);
			})
			.then(() => {
				return msVfs.getStatAsync('simple').then(stat => {
					assert.equal('simple', stat.name);
					assert.equal(5, stat.size);
				});
			})
			.then(() => {
				return msVfs.readAllAsync('simple').then(data => {
					assert.equal(5, data.byteLength);
				});
			})
			.then(() => {
				return msVfs.readAllAsync('nonExistant').then(data => {
					assert['fail']();
				}).catch((e) => {
						assert.equal("File 'nonExistant' doesn't exist", e.message);
					});
			})
			;
	});

	it('memorystick_combined', () => {
		var vfs1 = new MemoryVfs();
		var vfs2 = new MemoryVfs();

		var msVfs = new MemoryStickVfs([vfs1, vfs2], null as any, null as any);

		return PromiseFast.resolve(0)
			.then(() => {
				vfs1.writeAllAsync('simple1', new Uint8Array([1, 2, 3, 4, 5]).buffer);
				vfs2.writeAllAsync('simple2', new Uint8Array([1, 2, 3, 4, 5]).buffer);
			})
			.then(() => {
				return msVfs.getStatAsync('simple1').then(stat => {
					//console.log(stat);
					assert.equal('simple1', stat.name);
					assert.equal(5, stat.size);
				});
			})
			.then(() => {
				return msVfs.getStatAsync('simple2').then(stat => {
					assert.equal('simple2', stat.name);
					assert.equal(5, stat.size);
				});
			})
	});
}); 