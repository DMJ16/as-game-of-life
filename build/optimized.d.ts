declare module ASModule {
  type i8 = number;
  type i16 = number;
  type i32 = number;
  type i64 = BigInt;
  type isize = number;
  type u8 = number;
  type u16 = number;
  type u32 = number;
  type u64 = BigInt;
  type usize = number;
  type f32 = number;
  type f64 = number;
  type bool = any;
  export var __asbind_entryfile_flag: i32;
  export var __asbind_String_ID: u32;
  export var __asbind_ArrayBuffer_ID: u32;
  export var __asbind_ArrayBufferView_ID: u32;
  export var __asbind_Int8Array_ID: u32;
  export var __asbind_Uint8Array_ID: u32;
  export var __asbind_Int16Array_ID: u32;
  export var __asbind_Uint16Array_ID: u32;
  export var __asbind_Int32Array_ID: u32;
  export var __asbind_Uint32Array_ID: u32;
  export var __asbind_Float32Array_ID: u32;
  export var __asbind_Float64Array_ID: u32;
  export class Universe {
    width: u32;
    height: u32;
    cells: usize;
    getWidth(): u32;
    getHeight(): u32;
    getCells(): usize;
    getIdx(row: u32, col: u32): u32;
    liveNeighborCount(row: u32, col: u32): u8;
    tick(): void;
    constructor();
  }
}
export default ASModule;
