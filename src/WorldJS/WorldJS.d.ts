// TypeScript bindings for emscripten-generated code.  Automatically generated at compile time.
declare namespace RuntimeExports {
  let FS_createPath: any;
  function FS_createDataFile(parent: any, name: any, fileData: any, canRead: any, canWrite: any, canOwn: any): void;
  function FS_createPreloadedFile(parent: any, name: any, url: any, canRead: any, canWrite: any, onload: any, onerror: any, dontCreateFile: any, canOwn: any, preFinish: any): void;
  function FS_unlink(path: any): any;
  let FS_createLazyFile: any;
  let FS_createDevice: any;
  let addRunDependency: any;
  let removeRunDependency: any;
}
interface WasmModule {
__ZN7WorldJS3DioEiiid(_0: number, _1: number, _2: number, _3: number, _4: number): void;
__ZN7WorldJS7HarvestEiiid(_0: number, _1: number, _2: number, _3: number, _4: number): void;
__ZN7WorldJS10CheapTrickEiiiiii(_0: number, _1: number, _2: number, _3: number, _4: number, _5: number, _6: number): void;
__ZN7WorldJS3D4CEiiiiiiid(_0: number, _1: number, _2: number, _3: number, _4: number, _5: number, _6: number, _7: number, _8: number): void;
__ZN7WorldJS9SynthesisEiiiiiid(_0: number, _1: number, _2: number, _3: number, _4: number, _5: number, _6: number, _7: number): void;
__ZN7WorldJS18DisplayInformationEiii(_0: number, _1: number, _2: number): void;
__ZN13WorldNativeIO18DisplayInformationEiii(_0: number, _1: number, _2: number): void;
__ZN7WorldJS14GetInformationEiii(_0: number, _1: number, _2: number, _3: number): void;
__ZN13WorldNativeIO14GetInformationEiii(_0: number, _1: number, _2: number, _3: number): void;
__ZN7WorldJS7WavReadERKNSt3__212basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEE(_0: number, _1: number): void;
__ZN13WorldNativeIO10WavRead_JSERKNSt3__212basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEE(_0: number, _1: number): void;
__ZN7WorldJS8WavWriteEN10emscripten3valEiRKNSt3__212basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEE(_0: number, _1: number, _2: number, _3: number): void;
__ZN13WorldNativeIO11WavWrite_JSEN10emscripten3valEiRKNSt3__212basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEE(_0: number, _1: number, _2: number, _3: number): void;
__ZN7WorldJS21DisplayInformationValEN10emscripten3valE(_0: number): void;
__ZN14WorldJSWrapper21DisplayInformationValEN10emscripten3valE(_0: number): void;
__ZN7WorldJS17GetInformationValERKN10emscripten3valE(_0: number, _1: number): void;
__ZN14WorldJSWrapper17GetInformationValERKN10emscripten3valE(_0: number, _1: number): void;
__ZN7WorldJS9Wav2WorldERKNSt3__212basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEE(_0: number, _1: number): void;
__ZN14WorldJSWrapper7W2WorldERKNSt3__212basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEE(_0: number, _1: number): void;
_malloc(_0: number): number;
_free(_0: number): void;
HEAPF64:Float64Array;
}

type EmbindString = ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
export interface ClassHandle {
isAliasOf(other: ClassHandle): boolean;
delete(): void;
deleteLater(): this;
isDeleted(): boolean;
clone(): this;
}
export interface WorldJS extends ClassHandle {
}

interface EmbindModule {
WorldJS: {
  new(): WorldJS;
  DisplayInformation(_0: number, _1: number, _2: number): void;
  WavRead(_0: EmbindString): any;
  GetInformation(_0: number, _1: number, _2: number): any;
  WavWrite(_0: any, _1: number, _2: EmbindString): any;
  Dio(_0: number, _1: number, _2: number, _3: number): any;
  Harvest(_0: number, _1: number, _2: number, _3: number): any;
  CheapTrick(_0: number, _1: number, _2: number, _3: number, _4: number, _5: number): any;
  D4C(_0: number, _1: number, _2: number, _3: number, _4: number, _5: number, _6: number, _7: number): any;
  Synthesis(_0: number, _1: number, _2: number, _3: number, _4: number, _5: number, _6: number): any;
  DisplayInformationVal(_0: any): void;
  GetInformationVal(_0: any): any;
  Wav2World(_0: EmbindString): any;
};
}

export type MainModule = WasmModule & typeof RuntimeExports & EmbindModule;
export default function MainModuleFactory (options?: unknown): Promise<MainModule>;
