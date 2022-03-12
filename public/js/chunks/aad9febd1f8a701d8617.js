(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./node_modules/@wasm-audio-decoders/common/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/@wasm-audio-decoders/common/index.js ***!
  \***********************************************************/
/*! exports provided: WASMAudioDecoderCommon, WASMAudioDecoderWorker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_WASMAudioDecoderCommon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/WASMAudioDecoderCommon.js */ "./node_modules/@wasm-audio-decoders/common/src/WASMAudioDecoderCommon.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WASMAudioDecoderCommon", function() { return _src_WASMAudioDecoderCommon_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _src_WASMAudioDecoderWorker_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/WASMAudioDecoderWorker.js */ "./node_modules/@wasm-audio-decoders/common/src/WASMAudioDecoderWorker.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WASMAudioDecoderWorker", function() { return _src_WASMAudioDecoderWorker_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });







/***/ }),

/***/ "./node_modules/@wasm-audio-decoders/common/src/WASMAudioDecoderCommon.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@wasm-audio-decoders/common/src/WASMAudioDecoderCommon.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WASMAudioDecoderCommon; });
const compiledWasm = new WeakMap();

class WASMAudioDecoderCommon {
  constructor(wasm) {
    this._wasm = wasm;

    this._pointers = [];
  }

  get wasm() {
    return this._wasm;
  }

  static async initWASMAudioDecoder() {
    // instantiate wasm code as singleton
    if (!this._wasm) {
      // new decoder instance
      if (this._isWebWorker) {
        // web worker
        this._wasm = new this._EmscriptenWASM(WASMAudioDecoderCommon);
      } else {
        // main thread
        if (compiledWasm.has(this._EmscriptenWASM)) {
          // reuse existing compilation
          this._wasm = compiledWasm.get(this._EmscriptenWASM);
        } else {
          // first compilation
          this._wasm = new this._EmscriptenWASM(WASMAudioDecoderCommon);
          compiledWasm.set(this._EmscriptenWASM, this._wasm);
        }
      }
    }

    await this._wasm.ready;

    const common = new WASMAudioDecoderCommon(this._wasm);

    [this._inputPtr, this._input] = common.allocateTypedArray(
      this._inputPtrSize,
      Uint8Array
    );

    // output buffer
    [this._leftPtr, this._leftArr] = common.allocateTypedArray(
      this._outputPtrSize,
      Float32Array
    );
    [this._rightPtr, this._rightArr] = common.allocateTypedArray(
      this._outputPtrSize,
      Float32Array
    );

    return common;
  }

  static concatFloat32(buffers, length) {
    const ret = new Float32Array(length);

    let offset = 0;
    for (const buf of buffers) {
      ret.set(buf, offset);
      offset += buf.length;
    }

    return ret;
  }

  static getDecodedAudio(channelData, samplesDecoded, sampleRate) {
    return {
      channelData,
      samplesDecoded,
      sampleRate,
    };
  }

  static getDecodedAudioConcat(channelData, samplesDecoded, sampleRate) {
    return WASMAudioDecoderCommon.getDecodedAudio(
      channelData.map((data) =>
        WASMAudioDecoderCommon.concatFloat32(data, samplesDecoded)
      ),
      samplesDecoded,
      sampleRate
    );
  }

  allocateTypedArray(length, TypedArray) {
    const pointer = this._wasm._malloc(TypedArray.BYTES_PER_ELEMENT * length);
    const array = new TypedArray(this._wasm.HEAP, pointer, length);

    this._pointers.push(pointer);
    return [pointer, array];
  }

  free() {
    this._pointers.forEach((ptr) => this._wasm._free(ptr));
    this._pointers = [];
  }

  /*
   ******************
   * Compression Code
   ******************
   */

  static inflateYencString(source, dest) {
    const output = new Uint8Array(source.length);

    let continued = false,
      byteIndex = 0,
      byte;

    for (let i = 0; i < source.length; i++) {
      byte = source.charCodeAt(i);

      if (byte === 13 || byte === 10) continue;

      if (byte === 61 && !continued) {
        continued = true;
        continue;
      }

      if (continued) {
        continued = false;
        byte -= 64;
      }

      output[byteIndex++] = byte < 42 && byte > 0 ? byte + 214 : byte - 42;
    }

    return WASMAudioDecoderCommon.inflate(output.subarray(0, byteIndex), dest);
  }

  static inflate(source, dest) {
    const TINF_OK = 0;
    const TINF_DATA_ERROR = -3;

    const uint8Array = Uint8Array;
    const uint16Array = Uint16Array;

    class Tree {
      constructor() {
        this.t = new uint16Array(16); /* table of code length counts */
        this.trans = new uint16Array(
          288
        ); /* code -> symbol translation table */
      }
    }

    class Data {
      constructor(source, dest) {
        this.s = source;
        this.i = 0;
        this.t = 0;
        this.bitcount = 0;

        this.dest = dest;
        this.destLen = 0;

        this.ltree = new Tree(); /* dynamic length/symbol tree */
        this.dtree = new Tree(); /* dynamic distance tree */
      }
    }

    /* --------------------------------------------------- *
     * -- uninitialized global data (static structures) -- *
     * --------------------------------------------------- */

    const sltree = new Tree();
    const sdtree = new Tree();

    /* extra bits and base tables for length codes */
    const length_bits = new uint8Array(30);
    const length_base = new uint16Array(30);

    /* extra bits and base tables for distance codes */
    const dist_bits = new uint8Array(30);
    const dist_base = new uint16Array(30);

    /* special ordering of code length codes */
    const clcidx = new uint8Array([
      16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15,
    ]);

    /* used by tinf_decode_trees, avoids allocations every call */
    const code_tree = new Tree();
    const lengths = new uint8Array(288 + 32);

    /* ----------------------- *
     * -- utility functions -- *
     * ----------------------- */

    /* build extra bits and base tables */
    const tinf_build_bits_base = (bits, base, delta, first) => {
      let i, sum;

      /* build bits table */
      for (i = 0; i < delta; ++i) bits[i] = 0;
      for (i = 0; i < 30 - delta; ++i) bits[i + delta] = (i / delta) | 0;

      /* build base table */
      for (sum = first, i = 0; i < 30; ++i) {
        base[i] = sum;
        sum += 1 << bits[i];
      }
    };

    /* build the fixed huffman trees */
    const tinf_build_fixed_trees = (lt, dt) => {
      let i;

      /* build fixed length tree */
      for (i = 0; i < 7; ++i) lt.t[i] = 0;

      lt.t[7] = 24;
      lt.t[8] = 152;
      lt.t[9] = 112;

      for (i = 0; i < 24; ++i) lt.trans[i] = 256 + i;
      for (i = 0; i < 144; ++i) lt.trans[24 + i] = i;
      for (i = 0; i < 8; ++i) lt.trans[24 + 144 + i] = 280 + i;
      for (i = 0; i < 112; ++i) lt.trans[24 + 144 + 8 + i] = 144 + i;

      /* build fixed distance tree */
      for (i = 0; i < 5; ++i) dt.t[i] = 0;

      dt.t[5] = 32;

      for (i = 0; i < 32; ++i) dt.trans[i] = i;
    };

    /* given an array of code lengths, build a tree */
    const offs = new uint16Array(16);

    const tinf_build_tree = (t, lengths, off, num) => {
      let i, sum;

      /* clear code length count table */
      for (i = 0; i < 16; ++i) t.t[i] = 0;

      /* scan symbol lengths, and sum code length counts */
      for (i = 0; i < num; ++i) t.t[lengths[off + i]]++;

      t.t[0] = 0;

      /* compute offset table for distribution sort */
      for (sum = 0, i = 0; i < 16; ++i) {
        offs[i] = sum;
        sum += t.t[i];
      }

      /* create code->symbol translation table (symbols sorted by code) */
      for (i = 0; i < num; ++i) {
        if (lengths[off + i]) t.trans[offs[lengths[off + i]]++] = i;
      }
    };

    /* ---------------------- *
     * -- decode functions -- *
     * ---------------------- */

    /* get one bit from source stream */
    const tinf_getbit = (d) => {
      /* check if tag is empty */
      if (!d.bitcount--) {
        /* load next tag */
        d.t = d.s[d.i++];
        d.bitcount = 7;
      }

      /* shift bit out of tag */
      const bit = d.t & 1;
      d.t >>>= 1;

      return bit;
    };

    /* read a num bit value from a stream and add base */
    const tinf_read_bits = (d, num, base) => {
      if (!num) return base;

      while (d.bitcount < 24) {
        d.t |= d.s[d.i++] << d.bitcount;
        d.bitcount += 8;
      }

      const val = d.t & (0xffff >>> (16 - num));
      d.t >>>= num;
      d.bitcount -= num;
      return val + base;
    };

    /* given a data stream and a tree, decode a symbol */
    const tinf_decode_symbol = (d, t) => {
      while (d.bitcount < 24) {
        d.t |= d.s[d.i++] << d.bitcount;
        d.bitcount += 8;
      }

      let sum = 0,
        cur = 0,
        len = 0,
        tag = d.t;

      /* get more bits while code value is above sum */
      do {
        cur = 2 * cur + (tag & 1);
        tag >>>= 1;
        ++len;

        sum += t.t[len];
        cur -= t.t[len];
      } while (cur >= 0);

      d.t = tag;
      d.bitcount -= len;

      return t.trans[sum + cur];
    };

    /* given a data stream, decode dynamic trees from it */
    const tinf_decode_trees = (d, lt, dt) => {
      let i, length;

      /* get 5 bits HLIT (257-286) */
      const hlit = tinf_read_bits(d, 5, 257);

      /* get 5 bits HDIST (1-32) */
      const hdist = tinf_read_bits(d, 5, 1);

      /* get 4 bits HCLEN (4-19) */
      const hclen = tinf_read_bits(d, 4, 4);

      for (i = 0; i < 19; ++i) lengths[i] = 0;

      /* read code lengths for code length alphabet */
      for (i = 0; i < hclen; ++i) {
        /* get 3 bits code length (0-7) */
        const clen = tinf_read_bits(d, 3, 0);
        lengths[clcidx[i]] = clen;
      }

      /* build code length tree */
      tinf_build_tree(code_tree, lengths, 0, 19);

      /* decode code lengths for the dynamic trees */
      for (let num = 0; num < hlit + hdist; ) {
        const sym = tinf_decode_symbol(d, code_tree);

        switch (sym) {
          case 16:
            /* copy previous code length 3-6 times (read 2 bits) */
            const prev = lengths[num - 1];
            for (length = tinf_read_bits(d, 2, 3); length; --length) {
              lengths[num++] = prev;
            }
            break;
          case 17:
            /* repeat code length 0 for 3-10 times (read 3 bits) */
            for (length = tinf_read_bits(d, 3, 3); length; --length) {
              lengths[num++] = 0;
            }
            break;
          case 18:
            /* repeat code length 0 for 11-138 times (read 7 bits) */
            for (length = tinf_read_bits(d, 7, 11); length; --length) {
              lengths[num++] = 0;
            }
            break;
          default:
            /* values 0-15 represent the actual code lengths */
            lengths[num++] = sym;
            break;
        }
      }

      /* build dynamic trees */
      tinf_build_tree(lt, lengths, 0, hlit);
      tinf_build_tree(dt, lengths, hlit, hdist);
    };

    /* ----------------------------- *
     * -- block inflate functions -- *
     * ----------------------------- */

    /* given a stream and two trees, inflate a block of data */
    const tinf_inflate_block_data = (d, lt, dt) => {
      while (1) {
        let sym = tinf_decode_symbol(d, lt);

        /* check for end of block */
        if (sym === 256) {
          return TINF_OK;
        }

        if (sym < 256) {
          d.dest[d.destLen++] = sym;
        } else {
          let length, dist, offs;

          sym -= 257;

          /* possibly get more bits from length code */
          length = tinf_read_bits(d, length_bits[sym], length_base[sym]);

          dist = tinf_decode_symbol(d, dt);

          /* possibly get more bits from distance code */
          offs =
            d.destLen - tinf_read_bits(d, dist_bits[dist], dist_base[dist]);

          /* copy match */
          for (let i = offs; i < offs + length; ++i) {
            d.dest[d.destLen++] = d.dest[i];
          }
        }
      }
    };

    /* inflate an uncompressed block of data */
    const tinf_inflate_uncompressed_block = (d) => {
      let length, invlength;

      /* unread from bitbuffer */
      while (d.bitcount > 8) {
        d.i--;
        d.bitcount -= 8;
      }

      /* get length */
      length = d.s[d.i + 1];
      length = 256 * length + d.s[d.i];

      /* get one's complement of length */
      invlength = d.s[d.i + 3];
      invlength = 256 * invlength + d.s[d.i + 2];

      /* check length */
      if (length !== (~invlength & 0x0000ffff)) return TINF_DATA_ERROR;

      d.i += 4;

      /* copy block */
      for (let i = length; i; --i) d.dest[d.destLen++] = d.s[d.i++];

      /* make sure we start next block on a byte boundary */
      d.bitcount = 0;

      return TINF_OK;
    };

    /* -------------------- *
     * -- initialization -- *
     * -------------------- */

    /* build fixed huffman trees */
    tinf_build_fixed_trees(sltree, sdtree);

    /* build extra bits and base tables */
    tinf_build_bits_base(length_bits, length_base, 4, 3);
    tinf_build_bits_base(dist_bits, dist_base, 2, 1);

    /* fix a special case */
    length_bits[28] = 0;
    length_base[28] = 258;

    const d = new Data(source, dest);
    let bfinal, btype, res;

    do {
      /* read final block flag */
      bfinal = tinf_getbit(d);

      /* read block type (2 bits) */
      btype = tinf_read_bits(d, 2, 0);

      /* decompress block */
      switch (btype) {
        case 0:
          /* decompress uncompressed block */
          res = tinf_inflate_uncompressed_block(d);
          break;
        case 1:
          /* decompress block with fixed huffman trees */
          res = tinf_inflate_block_data(d, sltree, sdtree);
          break;
        case 2:
          /* decompress block with dynamic huffman trees */
          tinf_decode_trees(d, d.ltree, d.dtree);
          res = tinf_inflate_block_data(d, d.ltree, d.dtree);
          break;
        default:
          res = TINF_DATA_ERROR;
      }

      if (res !== TINF_OK) throw new Error("Data error");
    } while (!bfinal);

    if (d.destLen < d.dest.length) {
      if (typeof d.dest.slice === "function") return d.dest.slice(0, d.destLen);
      else return d.dest.subarray(0, d.destLen);
    }

    return d.dest;
  }
}


/***/ }),

/***/ "./node_modules/@wasm-audio-decoders/common/src/WASMAudioDecoderWorker.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@wasm-audio-decoders/common/src/WASMAudioDecoderWorker.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Buffer) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WASMAudioDecoderWorker; });
/* harmony import */ var web_worker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! web-worker */ "./node_modules/web-worker/cjs/browser.js");
/* harmony import */ var web_worker__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(web_worker__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _WASMAudioDecoderCommon_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WASMAudioDecoderCommon.js */ "./node_modules/@wasm-audio-decoders/common/src/WASMAudioDecoderCommon.js");



// statically store web worker source code
const sources = new WeakMap();

class WASMAudioDecoderWorker extends web_worker__WEBPACK_IMPORTED_MODULE_0___default.a {
  constructor(Decoder, EmscriptenWASM) {
    let source = sources.get(Decoder);

    if (!source) {
      const webworkerSourceCode =
        "'use strict';" +
        // dependencies need to be manually resolved when stringifying this function
        `(${((_WASMAudioDecoderCommon, _Decoder, _EmscriptenWASM) => {
          // We're in a Web Worker
          const decoder = new _Decoder(
            _WASMAudioDecoderCommon,
            _EmscriptenWASM
          );

          const detachBuffers = (buffer) =>
            Array.isArray(buffer)
              ? buffer.map((buffer) => new Uint8Array(buffer))
              : new Uint8Array(buffer);

          self.onmessage = ({ data: { id, command, data } }) => {
            switch (command) {
              case "ready":
                decoder.ready.then(() => {
                  self.postMessage({
                    id,
                  });
                });
                break;
              case "free":
                decoder.free();
                self.postMessage({
                  id,
                });
                break;
              case "reset":
                decoder.reset().then(() => {
                  self.postMessage({
                    id,
                  });
                });
                break;
              case "decode":
              case "decodeFrame":
              case "decodeFrames":
                const { channelData, samplesDecoded, sampleRate } = decoder[
                  command
                ](detachBuffers(data));

                self.postMessage(
                  {
                    id,
                    channelData,
                    samplesDecoded,
                    sampleRate,
                  },
                  // The "transferList" parameter transfers ownership of channel data to main thread,
                  // which avoids copying memory.
                  channelData.map((channel) => channel.buffer)
                );
                break;
              default:
                this.console.error(
                  "Unknown command sent to worker: " + command
                );
            }
          };
        }).toString()})(${_WASMAudioDecoderCommon_js__WEBPACK_IMPORTED_MODULE_1__["default"]}, ${Decoder}, ${EmscriptenWASM})`;

      const type = "text/javascript";

      try {
        // browser
        source = URL.createObjectURL(new Blob([webworkerSourceCode], { type }));
      } catch {
        // nodejs
        source = `data:${type};base64,${Buffer.from(
          webworkerSourceCode
        ).toString("base64")}`;
      }

      sources.set(Decoder, source);
    }

    super(source);

    this._id = Number.MIN_SAFE_INTEGER;
    this._enqueuedOperations = new Map();

    this.onmessage = ({ data }) => {
      const { id, ...rest } = data;
      this._enqueuedOperations.get(id)(rest);
      this._enqueuedOperations.delete(id);
    };
  }

  async _postToDecoder(command, data) {
    return new Promise((resolve) => {
      this.postMessage({
        command,
        id: this._id,
        data,
      });

      this._enqueuedOperations.set(this._id++, resolve);
    });
  }

  get ready() {
    return this._postToDecoder("ready");
  }

  async free() {
    await this._postToDecoder("free").finally(() => {
      this.terminate();
    });
  }

  async reset() {
    await this._postToDecoder("reset");
  }
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/buffer/index.js":
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
var ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
var isArray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/codec-parser/index.js":
/*!********************************************!*\
  !*** ./node_modules/codec-parser/index.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_CodecParser_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/CodecParser.js */ "./node_modules/codec-parser/src/CodecParser.js");


/* harmony default export */ __webpack_exports__["default"] = (_src_CodecParser_js__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./node_modules/codec-parser/src/CodecParser.js":
/*!******************************************************!*\
  !*** ./node_modules/codec-parser/src/CodecParser.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CodecParser; });
/* harmony import */ var _utilities_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilities.js */ "./node_modules/codec-parser/src/utilities.js");
/* harmony import */ var _codecs_HeaderCache_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./codecs/HeaderCache.js */ "./node_modules/codec-parser/src/codecs/HeaderCache.js");
/* harmony import */ var _codecs_mpeg_MPEGParser_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./codecs/mpeg/MPEGParser.js */ "./node_modules/codec-parser/src/codecs/mpeg/MPEGParser.js");
/* harmony import */ var _codecs_aac_AACParser_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./codecs/aac/AACParser.js */ "./node_modules/codec-parser/src/codecs/aac/AACParser.js");
/* harmony import */ var _codecs_flac_FLACParser_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./codecs/flac/FLACParser.js */ "./node_modules/codec-parser/src/codecs/flac/FLACParser.js");
/* harmony import */ var _containers_ogg_OggParser_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./containers/ogg/OggParser.js */ "./node_modules/codec-parser/src/containers/ogg/OggParser.js");
/* Copyright 2020-2021 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/








const noOp = () => {};

class CodecParser {
  constructor(mimeType, { onCodecUpdate, onCodec, enableLogging } = {}) {
    this._inputMimeType = mimeType;
    this._onCodec = onCodec || noOp;
    this._onCodecUpdate = onCodecUpdate;
    this._enableLogging = enableLogging;

    this._generator = this._getGenerator();
    this._generator.next();
  }

  /**
   * @public
   * @returns The detected codec
   */
  get codec() {
    return this._parser.codec;
  }

  /**
   * @public
   * @description Generator function that yields any buffered CodecFrames and resets the CodecParser
   * @returns {Iterable<CodecFrame|OggPage>} Iterator that operates over the codec data.
   * @yields {CodecFrame|OggPage} Parsed codec or ogg page data
   */
  *flush() {
    this._flushing = true;

    for (let i = this._generator.next(); i.value; i = this._generator.next()) {
      yield i.value;
    }

    this._flushing = false;

    this._generator = this._getGenerator();
    this._generator.next();
  }

  /**
   * @public
   * @description Generator function takes in a Uint8Array of data and returns a CodecFrame from the data for each iteration
   * @param {Uint8Array} chunk Next chunk of codec data to read
   * @returns {Iterable<CodecFrame|OggPage>} Iterator that operates over the codec data.
   * @yields {CodecFrame|OggPage} Parsed codec or ogg page data
   */
  *parseChunk(chunk) {
    for (
      let i = this._generator.next(chunk);
      i.value;
      i = this._generator.next()
    ) {
      yield i.value;
    }
  }

  /**
   * @public
   * @description Parses an entire file and returns all of the contained frames.
   * @param {Uint8Array} fileData Coded data to read
   * @returns {Array<CodecFrame|OggPage>} CodecFrames
   */
  parseAll(fileData) {
    return [...this.parseChunk(fileData), ...this.flush()];
  }

  /**
   * @private
   */
  *_getGenerator() {
    this._headerCache = new _codecs_HeaderCache_js__WEBPACK_IMPORTED_MODULE_1__["default"](this._onCodecUpdate);

    if (this._inputMimeType.match(/aac/)) {
      this._parser = new _codecs_aac_AACParser_js__WEBPACK_IMPORTED_MODULE_3__["default"](this, this._headerCache, this._onCodec);
    } else if (this._inputMimeType.match(/mpeg/)) {
      this._parser = new _codecs_mpeg_MPEGParser_js__WEBPACK_IMPORTED_MODULE_2__["default"](this, this._headerCache, this._onCodec);
    } else if (this._inputMimeType.match(/flac/)) {
      this._parser = new _codecs_flac_FLACParser_js__WEBPACK_IMPORTED_MODULE_4__["default"](this, this._headerCache, this._onCodec);
    } else if (this._inputMimeType.match(/ogg/)) {
      this._parser = new _containers_ogg_OggParser_js__WEBPACK_IMPORTED_MODULE_5__["default"](this, this._headerCache, this._onCodec);
    } else {
      throw new Error(`Unsupported Codec ${mimeType}`);
    }

    this._frameNumber = 0;
    this._currentReadPosition = 0;
    this._totalBytesIn = 0;
    this._totalBytesOut = 0;
    this._totalSamples = 0;
    this._sampleRate = undefined;

    this._rawData = new Uint8Array(0);

    // start parsing out frames
    while (true) {
      const frame = yield* this._parser.parseFrame();
      if (frame) yield frame;
    }
  }

  /**
   * @protected
   * @param {number} minSize Minimum bytes to have present in buffer
   * @returns {Uint8Array} rawData
   */
  *readRawData(minSize = 0, readOffset = 0) {
    let rawData;

    while (this._rawData.length <= minSize + readOffset) {
      rawData = yield;

      if (this._flushing) return this._rawData.subarray(readOffset);

      if (rawData) {
        this._totalBytesIn += rawData.length;
        this._rawData = Object(_utilities_js__WEBPACK_IMPORTED_MODULE_0__["concatBuffers"])(this._rawData, rawData);
      }
    }

    return this._rawData.subarray(readOffset);
  }

  /**
   * @protected
   * @param {number} increment Bytes to increment codec data
   */
  incrementRawData(increment) {
    this._currentReadPosition += increment;
    this._rawData = this._rawData.subarray(increment);
  }

  /**
   * @protected
   */
  mapCodecFrameStats(frame) {
    this._sampleRate = frame.header.sampleRate;

    frame.header.bitrate = Math.round(frame.data.length / frame.duration) * 8;
    frame.frameNumber = this._frameNumber++;
    frame.totalBytesOut = this._totalBytesOut;
    frame.totalSamples = this._totalSamples;
    frame.totalDuration = (this._totalSamples / this._sampleRate) * 1000;
    frame.crc32 = Object(_utilities_js__WEBPACK_IMPORTED_MODULE_0__["crc32"])(frame.data);

    this._headerCache.checkCodecUpdate(
      frame.header.bitrate,
      frame.totalDuration
    );

    this._totalBytesOut += frame.data.length;
    this._totalSamples += frame.samples;
  }

  /**
   * @protected
   */
  mapFrameStats(frame) {
    if (frame.codecFrames) {
      // Ogg container
      frame.codecFrames.forEach((codecFrame) => {
        frame.duration += codecFrame.duration;
        frame.samples += codecFrame.samples;
        this.mapCodecFrameStats(codecFrame);
      });

      frame.totalSamples = this._totalSamples;
      frame.totalDuration = (this._totalSamples / this._sampleRate) * 1000 || 0;
      frame.totalBytesOut = this._totalBytesOut;
    } else {
      this.mapCodecFrameStats(frame);
    }
  }

  /**
   * @private
   */
  _log(logger, messages) {
    if (this._enableLogging) {
      const stats = [
        `codec:         ${this.codec}`,
        `inputMimeType: ${this._inputMimeType}`,
        `readPosition:  ${this._currentReadPosition}`,
        `totalBytesIn:  ${this._totalBytesIn}`,
        `totalBytesOut: ${this._totalBytesOut}`,
      ];

      const width = Math.max(...stats.map((s) => s.length));

      messages.push(
        `--stats--${"-".repeat(width - 9)}`,
        ...stats,
        "-".repeat(width)
      );

      logger(
        "codec-parser",
        messages.reduce((acc, message) => acc + "\n  " + message, "")
      );
    }
  }

  /**
   * @protected
   */
  logWarning(...messages) {
    this._log(console.warn, messages);
  }

  /**
   * @protected
   */
  logError(...messages) {
    this._log(console.error, messages);
  }
}


/***/ }),

/***/ "./node_modules/codec-parser/src/codecs/CodecFrame.js":
/*!************************************************************!*\
  !*** ./node_modules/codec-parser/src/codecs/CodecFrame.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CodecFrame; });
/* harmony import */ var _globals_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../globals.js */ "./node_modules/codec-parser/src/globals.js");
/* harmony import */ var _containers_Frame_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../containers/Frame.js */ "./node_modules/codec-parser/src/containers/Frame.js");
/* Copyright 2020-2021 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/




class CodecFrame extends _containers_Frame_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  static *getFrame(Header, Frame, codecParser, headerCache, readOffset) {
    const header = yield* Header.getHeader(
      codecParser,
      headerCache,
      readOffset
    );

    if (header) {
      const frameLength = _globals_js__WEBPACK_IMPORTED_MODULE_0__["headerStore"].get(header).frameLength;
      const samples = _globals_js__WEBPACK_IMPORTED_MODULE_0__["headerStore"].get(header).samples;

      const frame = (yield* codecParser.readRawData(
        frameLength,
        readOffset
      )).subarray(0, frameLength);

      return new Frame(header, frame, samples);
    } else {
      return null;
    }
  }

  constructor(header, data, samples) {
    super(header, data);

    this.header = header;
    this.samples = samples;
    this.duration = (samples / header.sampleRate) * 1000;
    this.frameNumber = null;
    this.totalBytesOut = null;
    this.totalSamples = null;
    this.totalDuration = null;

    _globals_js__WEBPACK_IMPORTED_MODULE_0__["frameStore"].get(this).length = data.length;
  }
}


/***/ }),

/***/ "./node_modules/codec-parser/src/codecs/CodecHeader.js":
/*!*************************************************************!*\
  !*** ./node_modules/codec-parser/src/codecs/CodecHeader.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CodecHeader; });
/* harmony import */ var _globals_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../globals.js */ "./node_modules/codec-parser/src/globals.js");
/* Copyright 2020-2021 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/



class CodecHeader {
  /**
   * @private
   */
  constructor(header) {
    _globals_js__WEBPACK_IMPORTED_MODULE_0__["headerStore"].set(this, header);

    this.bitDepth = header.bitDepth;
    this.bitrate = null; // set during frame mapping
    this.channels = header.channels;
    this.channelMode = header.channelMode;
    this.sampleRate = header.sampleRate;
  }
}


/***/ }),

/***/ "./node_modules/codec-parser/src/codecs/HeaderCache.js":
/*!*************************************************************!*\
  !*** ./node_modules/codec-parser/src/codecs/HeaderCache.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HeaderCache; });
/* Copyright 2020-2021 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/

class HeaderCache {
  constructor(onCodecUpdate) {
    this._onCodecUpdate = onCodecUpdate;
    this.reset();
  }

  enable() {
    this._isEnabled = true;
  }

  reset() {
    this._headerCache = new Map();
    this._codecUpdateData = new WeakMap();
    this._codecShouldUpdate = false;
    this._bitrate = null;
    this._isEnabled = false;
  }

  checkCodecUpdate(bitrate, totalDuration) {
    if (this._onCodecUpdate) {
      if (this._bitrate !== bitrate) {
        this._bitrate = bitrate;
        this._codecShouldUpdate = true;
      }

      if (this._codecShouldUpdate) {
        this._onCodecUpdate(
          {
            bitrate,
            ...this._codecUpdateData.get(
              this._headerCache.get(this._currentHeader)
            ),
          },
          totalDuration
        );
      }

      this._codecShouldUpdate = false;
    }
  }

  updateCurrentHeader(key) {
    if (this._onCodecUpdate && key !== this._currentHeader) {
      this._codecShouldUpdate = true;
      this._currentHeader = key;
    }
  }

  getHeader(key) {
    const header = this._headerCache.get(key);

    if (header) {
      this.updateCurrentHeader(key);
    }

    return header;
  }

  setHeader(key, header, codecUpdateFields) {
    if (this._isEnabled) {
      this.updateCurrentHeader(key);

      this._headerCache.set(key, header);
      this._codecUpdateData.set(header, codecUpdateFields);
    }
  }
}


/***/ }),

/***/ "./node_modules/codec-parser/src/codecs/Parser.js":
/*!********************************************************!*\
  !*** ./node_modules/codec-parser/src/codecs/Parser.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Parser; });
/* harmony import */ var _globals_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../globals.js */ "./node_modules/codec-parser/src/globals.js");
/* Copyright 2020-2021 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/



/**
 * @abstract
 * @description Abstract class containing methods for parsing codec frames
 */
class Parser {
  constructor(codecParser, headerCache) {
    this._codecParser = codecParser;
    this._headerCache = headerCache;
  }

  *syncFrame() {
    let frame;

    do {
      frame = yield* this.Frame.getFrame(
        this._codecParser,
        this._headerCache,
        0
      );
      if (frame) return frame;
      this._codecParser.incrementRawData(1); // increment to continue syncing
    } while (true);
  }

  /**
   * @description Searches for Frames within bytes containing a sequence of known codec frames.
   * @param {boolean} ignoreNextFrame Set to true to return frames even if the next frame may not exist at the expected location
   * @returns {Frame}
   */
  *fixedLengthFrameSync(ignoreNextFrame) {
    let frame = yield* this.syncFrame();
    const frameLength = _globals_js__WEBPACK_IMPORTED_MODULE_0__["frameStore"].get(frame).length;

    if (
      ignoreNextFrame ||
      this._codecParser._flushing ||
      // check if there is a frame right after this one
      (yield* this.Header.getHeader(
        this._codecParser,
        this._headerCache,
        frameLength
      ))
    ) {
      this._headerCache.enable(); // start caching when synced

      this._codecParser.incrementRawData(frameLength); // increment to the next frame
      this._codecParser.mapFrameStats(frame);
      return frame;
    }

    this._codecParser.logWarning(
      `Missing frame frame at ${frameLength} bytes from current position.`,
      "Dropping current frame and trying again."
    );
    this._headerCache.reset(); // frame is invalid and must re-sync and clear cache
    this._codecParser.incrementRawData(1); // increment to invalidate the current frame
  }
}


/***/ }),

/***/ "./node_modules/codec-parser/src/codecs/aac/AACFrame.js":
/*!**************************************************************!*\
  !*** ./node_modules/codec-parser/src/codecs/aac/AACFrame.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AACFrame; });
/* harmony import */ var _CodecFrame_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../CodecFrame.js */ "./node_modules/codec-parser/src/codecs/CodecFrame.js");
/* harmony import */ var _AACHeader_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AACHeader.js */ "./node_modules/codec-parser/src/codecs/aac/AACHeader.js");
/* Copyright 2020-2021 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/




class AACFrame extends _CodecFrame_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  static *getFrame(codecParser, headerCache, readOffset) {
    return yield* super.getFrame(
      _AACHeader_js__WEBPACK_IMPORTED_MODULE_1__["default"],
      AACFrame,
      codecParser,
      headerCache,
      readOffset
    );
  }

  constructor(header, frame, samples) {
    super(header, frame, samples);
  }
}


/***/ }),

/***/ "./node_modules/codec-parser/src/codecs/aac/AACHeader.js":
/*!***************************************************************!*\
  !*** ./node_modules/codec-parser/src/codecs/aac/AACHeader.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AACHeader; });
/* harmony import */ var _globals_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../globals.js */ "./node_modules/codec-parser/src/globals.js");
/* harmony import */ var _utilities_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utilities.js */ "./node_modules/codec-parser/src/utilities.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../constants.js */ "./node_modules/codec-parser/src/constants.js");
/* harmony import */ var _CodecHeader_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../CodecHeader.js */ "./node_modules/codec-parser/src/codecs/CodecHeader.js");
/* Copyright 2020-2021 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/

/*
https://wiki.multimedia.cx/index.php/ADTS

AAAAAAAA AAAABCCD EEFFFFGH HHIJKLMM MMMMMMMM MMMOOOOO OOOOOOPP (QQQQQQQQ QQQQQQQQ)

AACHeader consists of 7 or 9 bytes (without or with CRC).
Letter  Length (bits)  Description
A  12  syncword 0xFFF, all bits must be 1
B  1   MPEG Version: 0 for MPEG-4, 1 for MPEG-2
C  2   Layer: always 0
D  1   protection absent, Warning, set to 1 if there is no CRC and 0 if there is CRC
E  2   profile, the MPEG-4 Audio Object Type minus 1
F  4   MPEG-4 Sampling Frequency Index (15 is forbidden)
G  1   private bit, guaranteed never to be used by MPEG, set to 0 when encoding, ignore when decoding
H  3   MPEG-4 Channel Configuration (in the case of 0, the channel configuration is sent via an inband PCE)
I  1   originality, set to 0 when encoding, ignore when decoding
J  1   home, set to 0 when encoding, ignore when decoding
K  1   copyrighted id bit, the next bit of a centrally registered copyright identifier, set to 0 when encoding, ignore when decoding
L  1   copyright id start, signals that this frame's copyright id bit is the first bit of the copyright id, set to 0 when encoding, ignore when decoding
M  13  frame length, this value must include 7 or 9 bytes of header length: FrameLength = (ProtectionAbsent == 1 ? 7 : 9) + size(AACFrame)
O  11  Buffer fullness // 0x7FF for VBR
P  2   Number of AAC frames (RDBs) in ADTS frame minus 1, for maximum compatibility always use 1 AAC frame per ADTS frame
Q  16  CRC if protection absent is 0 
*/







const mpegVersion = {
  0b00000000: "MPEG-4",
  0b00001000: "MPEG-2",
};

const layer = {
  0b00000000: "valid",
  0b00000010: _constants_js__WEBPACK_IMPORTED_MODULE_2__["bad"],
  0b00000100: _constants_js__WEBPACK_IMPORTED_MODULE_2__["bad"],
  0b00000110: _constants_js__WEBPACK_IMPORTED_MODULE_2__["bad"],
};

const protection = {
  0b00000000: _constants_js__WEBPACK_IMPORTED_MODULE_2__["sixteenBitCRC"],
  0b00000001: _constants_js__WEBPACK_IMPORTED_MODULE_2__["none"],
};

const profile = {
  0b00000000: "AAC Main",
  0b01000000: "AAC LC (Low Complexity)",
  0b10000000: "AAC SSR (Scalable Sample Rate)",
  0b11000000: "AAC LTP (Long Term Prediction)",
};

const sampleRates = {
  0b00000000: _constants_js__WEBPACK_IMPORTED_MODULE_2__["rate96000"],
  0b00000100: _constants_js__WEBPACK_IMPORTED_MODULE_2__["rate88200"],
  0b00001000: _constants_js__WEBPACK_IMPORTED_MODULE_2__["rate64000"],
  0b00001100: _constants_js__WEBPACK_IMPORTED_MODULE_2__["rate48000"],
  0b00010000: _constants_js__WEBPACK_IMPORTED_MODULE_2__["rate44100"],
  0b00010100: _constants_js__WEBPACK_IMPORTED_MODULE_2__["rate32000"],
  0b00011000: _constants_js__WEBPACK_IMPORTED_MODULE_2__["rate24000"],
  0b00011100: _constants_js__WEBPACK_IMPORTED_MODULE_2__["rate22050"],
  0b00100000: _constants_js__WEBPACK_IMPORTED_MODULE_2__["rate16000"],
  0b00100100: _constants_js__WEBPACK_IMPORTED_MODULE_2__["rate12000"],
  0b00101000: _constants_js__WEBPACK_IMPORTED_MODULE_2__["rate11025"],
  0b00101100: _constants_js__WEBPACK_IMPORTED_MODULE_2__["rate8000"],
  0b00110000: _constants_js__WEBPACK_IMPORTED_MODULE_2__["rate7350"],
  0b00110100: _constants_js__WEBPACK_IMPORTED_MODULE_2__["reserved"],
  0b00111000: _constants_js__WEBPACK_IMPORTED_MODULE_2__["reserved"],
  0b00111100: "frequency is written explicitly",
};

// prettier-ignore
const channelMode = {
  0b000000000: { channels: 0, description: "Defined in AOT Specific Config" },
  /*
  'monophonic (mono)'
  'stereo (left, right)'
  'linear surround (front center, front left, front right)'
  'quadraphonic (front center, front left, front right, rear center)'
  '5.0 surround (front center, front left, front right, rear left, rear right)'
  '5.1 surround (front center, front left, front right, rear left, rear right, LFE)'
  '7.1 surround (front center, front left, front right, side left, side right, rear left, rear right, LFE)'
  */
  0b001000000: { channels: 1, description: _constants_js__WEBPACK_IMPORTED_MODULE_2__["monophonic"] },
  0b010000000: { channels: 2, description: Object(_constants_js__WEBPACK_IMPORTED_MODULE_2__["getChannelMapping"])(2,_constants_js__WEBPACK_IMPORTED_MODULE_2__["channelMappings"][0][0]) },
  0b011000000: { channels: 3, description: Object(_constants_js__WEBPACK_IMPORTED_MODULE_2__["getChannelMapping"])(3,_constants_js__WEBPACK_IMPORTED_MODULE_2__["channelMappings"][1][3]), },
  0b100000000: { channels: 4, description: Object(_constants_js__WEBPACK_IMPORTED_MODULE_2__["getChannelMapping"])(4,_constants_js__WEBPACK_IMPORTED_MODULE_2__["channelMappings"][1][3],_constants_js__WEBPACK_IMPORTED_MODULE_2__["channelMappings"][3][4]), },
  0b101000000: { channels: 5, description: Object(_constants_js__WEBPACK_IMPORTED_MODULE_2__["getChannelMapping"])(5,_constants_js__WEBPACK_IMPORTED_MODULE_2__["channelMappings"][1][3],_constants_js__WEBPACK_IMPORTED_MODULE_2__["channelMappings"][3][0]), },
  0b110000000: { channels: 6, description: Object(_constants_js__WEBPACK_IMPORTED_MODULE_2__["getChannelMapping"])(6,_constants_js__WEBPACK_IMPORTED_MODULE_2__["channelMappings"][1][3],_constants_js__WEBPACK_IMPORTED_MODULE_2__["channelMappings"][3][0],_constants_js__WEBPACK_IMPORTED_MODULE_2__["lfe"]), },
  0b111000000: { channels: 8, description: Object(_constants_js__WEBPACK_IMPORTED_MODULE_2__["getChannelMapping"])(8,_constants_js__WEBPACK_IMPORTED_MODULE_2__["channelMappings"][1][3],_constants_js__WEBPACK_IMPORTED_MODULE_2__["channelMappings"][2][0],_constants_js__WEBPACK_IMPORTED_MODULE_2__["channelMappings"][3][0],_constants_js__WEBPACK_IMPORTED_MODULE_2__["lfe"]), },
};

class AACHeader extends _CodecHeader_js__WEBPACK_IMPORTED_MODULE_3__["default"] {
  static *getHeader(codecParser, headerCache, readOffset) {
    const header = {};

    // Must be at least seven bytes. Out of data
    const data = yield* codecParser.readRawData(7, readOffset);

    // Check header cache
    const key = Object(_utilities_js__WEBPACK_IMPORTED_MODULE_1__["bytesToString"])([
      data[0],
      data[1],
      data[2],
      (data[3] & 0b11111100) | (data[6] & 0b00000011), // frame length, buffer fullness varies so don't cache it
    ]);
    const cachedHeader = headerCache.getHeader(key);

    if (!cachedHeader) {
      // Frame sync (all bits must be set): `11111111|1111`:
      if (data[0] !== 0xff || data[1] < 0xf0) return null;

      // Byte (2 of 7)
      // * `1111BCCD`
      // * `....B...`: MPEG Version: 0 for MPEG-4, 1 for MPEG-2
      // * `.....CC.`: Layer: always 0
      // * `.......D`: protection absent, Warning, set to 1 if there is no CRC and 0 if there is CRC
      header.mpegVersion = mpegVersion[data[1] & 0b00001000];

      header.layer = layer[data[1] & 0b00000110];
      if (header.layer === _constants_js__WEBPACK_IMPORTED_MODULE_2__["bad"]) return null;

      const protectionBit = data[1] & 0b00000001;
      header.protection = protection[protectionBit];
      header.length = protectionBit ? 7 : 9;

      // Byte (3 of 7)
      // * `EEFFFFGH`
      // * `EE......`: profile, the MPEG-4 Audio Object Type minus 1
      // * `..FFFF..`: MPEG-4 Sampling Frequency Index (15 is forbidden)
      // * `......G.`: private bit, guaranteed never to be used by MPEG, set to 0 when encoding, ignore when decoding
      header.profileBits = data[2] & 0b11000000;
      header.sampleRateBits = data[2] & 0b00111100;
      const privateBit = data[2] & 0b00000010;

      header.profile = profile[header.profileBits];

      header.sampleRate = sampleRates[header.sampleRateBits];
      if (header.sampleRate === _constants_js__WEBPACK_IMPORTED_MODULE_2__["reserved"]) return null;

      header.isPrivate = Boolean(privateBit);

      // Byte (3,4 of 7)
      // * `.......H|HH......`: MPEG-4 Channel Configuration (in the case of 0, the channel configuration is sent via an inband PCE)
      header.channelModeBits = ((data[2] << 8) | data[3]) & 0b111000000;
      header.channelMode = channelMode[header.channelModeBits].description;
      header.channels = channelMode[header.channelModeBits].channels;

      // Byte (4 of 7)
      // * `HHIJKLMM`
      // * `..I.....`: originality, set to 0 when encoding, ignore when decoding
      // * `...J....`: home, set to 0 when encoding, ignore when decoding
      // * `....K...`: copyrighted id bit, the next bit of a centrally registered copyright identifier, set to 0 when encoding, ignore when decoding
      // * `.....L..`: copyright id start, signals that this frame's copyright id bit is the first bit of the copyright id, set to 0 when encoding, ignore when decoding
      header.isOriginal = Boolean(data[3] & 0b00100000);
      header.isHome = Boolean(data[3] & 0b00001000);
      header.copyrightId = Boolean(data[3] & 0b00001000);
      header.copyrightIdStart = Boolean(data[3] & 0b00000100);
      header.bitDepth = 16;
      header.samples = 1024;

      // Byte (7 of 7)
      // * `......PP` Number of AAC frames (RDBs) in ADTS frame minus 1, for maximum compatibility always use 1 AAC frame per ADTS frame
      header.numberAACFrames = data[6] & 0b00000011;

      const {
        length,
        channelModeBits,
        profileBits,
        sampleRateBits,
        frameLength,
        samples,
        numberAACFrames,
        ...codecUpdateFields
      } = header;
      headerCache.setHeader(key, header, codecUpdateFields);
    } else {
      Object.assign(header, cachedHeader);
    }

    // Byte (4,5,6 of 7)
    // * `.......MM|MMMMMMMM|MMM.....`: frame length, this value must include 7 or 9 bytes of header length: FrameLength = (ProtectionAbsent == 1 ? 7 : 9) + size(AACFrame)
    header.frameLength =
      ((data[3] << 11) | (data[4] << 3) | (data[5] >> 5)) & 0x1fff;
    if (!header.frameLength) return null;

    // Byte (6,7 of 7)
    // * `...OOOOO|OOOOOO..`: Buffer fullness
    const bufferFullnessBits = ((data[5] << 6) | (data[6] >> 2)) & 0x7ff;
    header.bufferFullness =
      bufferFullnessBits === 0x7ff ? "VBR" : bufferFullnessBits;

    return new AACHeader(header);
  }

  /**
   * @private
   * Call AACHeader.getHeader(Array<Uint8>) to get instance
   */
  constructor(header) {
    super(header);

    this.copyrightId = header.copyrightId;
    this.copyrightIdStart = header.copyrightIdStart;
    this.bufferFullness = header.bufferFullness;
    this.isHome = header.isHome;
    this.isOriginal = header.isOriginal;
    this.isPrivate = header.isPrivate;
    this.layer = header.layer;
    this.length = header.length;
    this.mpegVersion = header.mpegVersion;
    this.numberAACFrames = header.numberAACFrames;
    this.profile = header.profile;
    this.protection = header.protection;
  }

  get audioSpecificConfig() {
    // Audio Specific Configuration
    // * `000EEFFF|F0HHH000`:
    // * `000EE...|........`: Object Type (profileBit + 1)
    // * `.....FFF|F.......`: Sample Rate
    // * `........|.0HHH...`: Channel Configuration
    // * `........|.....0..`: Frame Length (1024)
    // * `........|......0.`: does not depend on core coder
    // * `........|.......0`: Not Extension
    const header = _globals_js__WEBPACK_IMPORTED_MODULE_0__["headerStore"].get(this);

    const audioSpecificConfig =
      ((header.profileBits + 0x40) << 5) |
      (header.sampleRateBits << 5) |
      (header.channelModeBits >> 3);

    const bytes = new Uint8Array(2);
    new DataView(bytes.buffer).setUint16(0, audioSpecificConfig, false);
    return bytes;
  }
}


/***/ }),

/***/ "./node_modules/codec-parser/src/codecs/aac/AACParser.js":
/*!***************************************************************!*\
  !*** ./node_modules/codec-parser/src/codecs/aac/AACParser.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AACParser; });
/* harmony import */ var _Parser_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Parser.js */ "./node_modules/codec-parser/src/codecs/Parser.js");
/* harmony import */ var _AACFrame_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AACFrame.js */ "./node_modules/codec-parser/src/codecs/aac/AACFrame.js");
/* harmony import */ var _AACHeader_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AACHeader.js */ "./node_modules/codec-parser/src/codecs/aac/AACHeader.js");
/* Copyright 2020-2021 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/





class AACParser extends _Parser_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(codecParser, headerCache, onCodec) {
    super(codecParser, headerCache);
    this.Frame = _AACFrame_js__WEBPACK_IMPORTED_MODULE_1__["default"];
    this.Header = _AACHeader_js__WEBPACK_IMPORTED_MODULE_2__["default"];

    onCodec(this.codec);
  }

  get codec() {
    return "aac";
  }

  *parseFrame() {
    return yield* this.fixedLengthFrameSync();
  }
}


/***/ }),

/***/ "./node_modules/codec-parser/src/codecs/flac/FLACFrame.js":
/*!****************************************************************!*\
  !*** ./node_modules/codec-parser/src/codecs/flac/FLACFrame.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FLACFrame; });
/* harmony import */ var _globals_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../globals.js */ "./node_modules/codec-parser/src/globals.js");
/* harmony import */ var _utilities_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utilities.js */ "./node_modules/codec-parser/src/utilities.js");
/* harmony import */ var _CodecFrame_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CodecFrame.js */ "./node_modules/codec-parser/src/codecs/CodecFrame.js");
/* Copyright 2020-2021 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/





class FLACFrame extends _CodecFrame_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
  static getFrameFooterCrc16(data) {
    return (data[data.length - 2] << 8) + data[data.length - 1];
  }

  // check frame footer crc
  // https://xiph.org/flac/format.html#frame_footer
  static checkFrameFooterCrc16(data) {
    const expectedCrc16 = FLACFrame.getFrameFooterCrc16(data);
    const actualCrc16 = Object(_utilities_js__WEBPACK_IMPORTED_MODULE_1__["flacCrc16"])(data.subarray(0, -2));

    return expectedCrc16 === actualCrc16;
  }

  constructor(data, header, streamInfo) {
    header.streamInfo = streamInfo;
    header.crc16 = FLACFrame.getFrameFooterCrc16(data);

    super(header, data, _globals_js__WEBPACK_IMPORTED_MODULE_0__["headerStore"].get(header).samples);
  }
}


/***/ }),

/***/ "./node_modules/codec-parser/src/codecs/flac/FLACHeader.js":
/*!*****************************************************************!*\
  !*** ./node_modules/codec-parser/src/codecs/flac/FLACHeader.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FLACHeader; });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants.js */ "./node_modules/codec-parser/src/constants.js");
/* harmony import */ var _utilities_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utilities.js */ "./node_modules/codec-parser/src/utilities.js");
/* harmony import */ var _CodecHeader_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CodecHeader.js */ "./node_modules/codec-parser/src/codecs/CodecHeader.js");
/* Copyright 2020-2021 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/

/*
https://xiph.org/flac/format.html

AAAAAAAA AAAAAABC DDDDEEEE FFFFGGGH 
(IIIIIIII...)
(JJJJJJJJ|JJJJJJJJ)
(KKKKKKKK|KKKKKKKK)
LLLLLLLLL

FLAC Frame Header
Letter  Length (bits)  Description
A   13  11111111|11111
B   1   Reserved 0 - mandatory, 1 - reserved
C   1   Blocking strategy, 0 - fixed, 1 - variable
D   4   Block size in inter-channel samples
E   4   Sample rate
F   4   Channel assignment
G   3   Sample size in bits
H   1   Reserved 0 - mandatory, 1 - reserved
I   ?   if(variable blocksize)
           <8-56>:"UTF-8" coded sample number (decoded number is 36 bits) [4]
        else
           <8-48>:"UTF-8" coded frame number (decoded number is 31 bits) [4]
J   ?   if(blocksize bits == 011x)
            8/16 bit (blocksize-1)
K   ?   if(sample rate bits == 11xx)
            8/16 bit sample rate
L   8   CRC-8 (polynomial = x^8 + x^2 + x^1 + x^0, initialized with 0) of everything before the crc, including the sync code
        
*/





const getFromStreamInfo = "get from STREAMINFO metadata block";

const blockingStrategy = {
  0b00000000: "Fixed",
  0b00000001: "Variable",
};

const blockSize = {
  0b00000000: _constants_js__WEBPACK_IMPORTED_MODULE_0__["reserved"],
  0b00010000: 192,
  // 0b00100000: 576,
  // 0b00110000: 1152,
  // 0b01000000: 2304,
  // 0b01010000: 4608,
  // 0b01100000: "8-bit (blocksize-1) from end of header",
  // 0b01110000: "16-bit (blocksize-1) from end of header",
  // 0b10000000: 256,
  // 0b10010000: 512,
  // 0b10100000: 1024,
  // 0b10110000: 2048,
  // 0b11000000: 4096,
  // 0b11010000: 8192,
  // 0b11100000: 16384,
  // 0b11110000: 32768,
};
for (let i = 2; i < 16; i++)
  blockSize[i << 4] = i < 6 ? 576 * 2 ** (i - 2) : 2 ** i;

const sampleRate = {
  0b00000000: getFromStreamInfo,
  0b00000001: _constants_js__WEBPACK_IMPORTED_MODULE_0__["rate88200"],
  0b00000010: _constants_js__WEBPACK_IMPORTED_MODULE_0__["rate176400"],
  0b00000011: _constants_js__WEBPACK_IMPORTED_MODULE_0__["rate192000"],
  0b00000100: _constants_js__WEBPACK_IMPORTED_MODULE_0__["rate8000"],
  0b00000101: _constants_js__WEBPACK_IMPORTED_MODULE_0__["rate16000"],
  0b00000110: _constants_js__WEBPACK_IMPORTED_MODULE_0__["rate22050"],
  0b00000111: _constants_js__WEBPACK_IMPORTED_MODULE_0__["rate24000"],
  0b00001000: _constants_js__WEBPACK_IMPORTED_MODULE_0__["rate32000"],
  0b00001001: _constants_js__WEBPACK_IMPORTED_MODULE_0__["rate44100"],
  0b00001010: _constants_js__WEBPACK_IMPORTED_MODULE_0__["rate48000"],
  0b00001011: _constants_js__WEBPACK_IMPORTED_MODULE_0__["rate96000"],
  // 0b00001100: "8-bit sample rate (in kHz) from end of header",
  // 0b00001101: "16-bit sample rate (in Hz) from end of header",
  // 0b00001110: "16-bit sample rate (in tens of Hz) from end of header",
  0b00001111: _constants_js__WEBPACK_IMPORTED_MODULE_0__["bad"],
};

/* prettier-ignore */
const channelAssignments = {
  /*'
  'monophonic (mono)'
  'stereo (left, right)'
  'linear surround (left, right, center)'
  'quadraphonic (front left, front right, rear left, rear right)'
  '5.0 surround (front left, front right, front center, rear left, rear right)'
  '5.1 surround (front left, front right, front center, LFE, rear left, rear right)'
  '6.1 surround (front left, front right, front center, LFE, rear center, side left, side right)'
  '7.1 surround (front left, front right, front center, LFE, rear left, rear right, side left, side right)'
  */
  0b00000000: {channels: 1, description: _constants_js__WEBPACK_IMPORTED_MODULE_0__["monophonic"]},
  0b00010000: {channels: 2, description: Object(_constants_js__WEBPACK_IMPORTED_MODULE_0__["getChannelMapping"])(2,_constants_js__WEBPACK_IMPORTED_MODULE_0__["channelMappings"][0][0])},
  0b00100000: {channels: 3, description: Object(_constants_js__WEBPACK_IMPORTED_MODULE_0__["getChannelMapping"])(3,_constants_js__WEBPACK_IMPORTED_MODULE_0__["channelMappings"][0][1])},
  0b00110000: {channels: 4, description: Object(_constants_js__WEBPACK_IMPORTED_MODULE_0__["getChannelMapping"])(4,_constants_js__WEBPACK_IMPORTED_MODULE_0__["channelMappings"][1][0],_constants_js__WEBPACK_IMPORTED_MODULE_0__["channelMappings"][3][0])},
  0b01000000: {channels: 5, description: Object(_constants_js__WEBPACK_IMPORTED_MODULE_0__["getChannelMapping"])(5,_constants_js__WEBPACK_IMPORTED_MODULE_0__["channelMappings"][1][1],_constants_js__WEBPACK_IMPORTED_MODULE_0__["channelMappings"][3][0])},
  0b01010000: {channels: 6, description: Object(_constants_js__WEBPACK_IMPORTED_MODULE_0__["getChannelMapping"])(6,_constants_js__WEBPACK_IMPORTED_MODULE_0__["channelMappings"][1][1],_constants_js__WEBPACK_IMPORTED_MODULE_0__["lfe"],_constants_js__WEBPACK_IMPORTED_MODULE_0__["channelMappings"][3][0])},
  0b01100000: {channels: 7, description: Object(_constants_js__WEBPACK_IMPORTED_MODULE_0__["getChannelMapping"])(7,_constants_js__WEBPACK_IMPORTED_MODULE_0__["channelMappings"][1][1],_constants_js__WEBPACK_IMPORTED_MODULE_0__["lfe"],_constants_js__WEBPACK_IMPORTED_MODULE_0__["channelMappings"][3][4],_constants_js__WEBPACK_IMPORTED_MODULE_0__["channelMappings"][2][0])},
  0b01110000: {channels: 8, description: Object(_constants_js__WEBPACK_IMPORTED_MODULE_0__["getChannelMapping"])(8,_constants_js__WEBPACK_IMPORTED_MODULE_0__["channelMappings"][1][1],_constants_js__WEBPACK_IMPORTED_MODULE_0__["lfe"],_constants_js__WEBPACK_IMPORTED_MODULE_0__["channelMappings"][3][0],_constants_js__WEBPACK_IMPORTED_MODULE_0__["channelMappings"][2][0])},
  0b10000000: {channels: 2, description: `${_constants_js__WEBPACK_IMPORTED_MODULE_0__["stereo"]} (left, diff)`},
  0b10010000: {channels: 2, description: `${_constants_js__WEBPACK_IMPORTED_MODULE_0__["stereo"]} (diff, right)`},
  0b10100000: {channels: 2, description: `${_constants_js__WEBPACK_IMPORTED_MODULE_0__["stereo"]} (avg, diff)`},
  0b10110000: _constants_js__WEBPACK_IMPORTED_MODULE_0__["reserved"],
  0b11000000: _constants_js__WEBPACK_IMPORTED_MODULE_0__["reserved"],
  0b11010000: _constants_js__WEBPACK_IMPORTED_MODULE_0__["reserved"],
  0b11100000: _constants_js__WEBPACK_IMPORTED_MODULE_0__["reserved"],
  0b11110000: _constants_js__WEBPACK_IMPORTED_MODULE_0__["reserved"],
}

const bitDepth = {
  0b00000000: getFromStreamInfo,
  0b00000010: 8,
  0b00000100: 12,
  0b00000110: _constants_js__WEBPACK_IMPORTED_MODULE_0__["reserved"],
  0b00001000: 16,
  0b00001010: 20,
  0b00001100: 24,
  0b00001110: _constants_js__WEBPACK_IMPORTED_MODULE_0__["reserved"],
};

class FLACHeader extends _CodecHeader_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
  // https://datatracker.ietf.org/doc/html/rfc3629#section-3
  //    Char. number range  |        UTF-8 octet sequence
  //    (hexadecimal)    |              (binary)
  // --------------------+---------------------------------------------
  // 0000 0000-0000 007F | 0xxxxxxx
  // 0000 0080-0000 07FF | 110xxxxx 10xxxxxx
  // 0000 0800-0000 FFFF | 1110xxxx 10xxxxxx 10xxxxxx
  // 0001 0000-0010 FFFF | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
  static decodeUTF8Int(data) {
    if (data[0] > 0xfe) {
      return null; // length byte must have at least one zero as the lsb
    }

    if (data[0] < 0x80) return { value: data[0], length: 1 };

    // get length by counting the number of msb that are set to 1
    let length = 1;
    for (let zeroMask = 0x40; zeroMask & data[0]; zeroMask >>= 1) length++;

    let idx = length - 1,
      value = 0,
      shift = 0;

    // sum together the encoded bits in bytes 2 to length
    // 1110xxxx 10[cccccc] 10[bbbbbb] 10[aaaaaa]
    //
    //    value = [cccccc] | [bbbbbb] | [aaaaaa]
    for (; idx > 0; shift += 6, idx--) {
      if ((data[idx] & 0xc0) !== 0x80) {
        return null; // each byte should have leading 10xxxxxx
      }
      value |= (data[idx] & 0x3f) << shift; // add the encoded bits
    }

    // read the final encoded bits in byte 1
    //     1110[dddd] 10[cccccc] 10[bbbbbb] 10[aaaaaa]
    //
    // value = [dddd] | [cccccc] | [bbbbbb] | [aaaaaa]
    value |= (data[idx] & (0x7f >> length)) << shift;

    return { value, length };
  }

  static getHeaderFromUint8Array(data, headerCache) {
    const codecParserStub = {
      readRawData: function* () {
        return data;
      },
    };

    return FLACHeader.getHeader(codecParserStub, headerCache, 0).next().value;
  }

  static *getHeader(codecParser, headerCache, readOffset) {
    // Must be at least 6 bytes.
    let data = yield* codecParser.readRawData(6, readOffset);

    // Bytes (1-2 of 6)
    // * `11111111|111110..`: Frame sync
    // * `........|......0.`: Reserved 0 - mandatory, 1 - reserved
    if (data[0] !== 0xff || !(data[1] === 0xf8 || data[1] === 0xf9)) {
      return null;
    }

    const header = {};

    // Check header cache
    const key = Object(_utilities_js__WEBPACK_IMPORTED_MODULE_1__["bytesToString"])(data.subarray(0, 4));
    const cachedHeader = headerCache.getHeader(key);

    if (!cachedHeader) {
      // Byte (2 of 6)
      // * `.......C`: Blocking strategy, 0 - fixed, 1 - variable
      header.blockingStrategyBits = data[1] & 0b00000001;
      header.blockingStrategy = blockingStrategy[header.blockingStrategyBits];

      // Byte (3 of 6)
      // * `DDDD....`: Block size in inter-channel samples
      // * `....EEEE`: Sample rate
      header.blockSizeBits = data[2] & 0b11110000;
      header.sampleRateBits = data[2] & 0b00001111;

      header.blockSize = blockSize[header.blockSizeBits];
      if (header.blockSize === _constants_js__WEBPACK_IMPORTED_MODULE_0__["reserved"]) {
        return null;
      }

      header.sampleRate = sampleRate[header.sampleRateBits];
      if (header.sampleRate === _constants_js__WEBPACK_IMPORTED_MODULE_0__["bad"]) {
        return null;
      }

      // Byte (4 of 6)
      // * `FFFF....`: Channel assignment
      // * `....GGG.`: Sample size in bits
      // * `.......H`: Reserved 0 - mandatory, 1 - reserved
      if (data[3] & 0b00000001) {
        return null;
      }

      const channelAssignment = channelAssignments[data[3] & 0b11110000];
      if (channelAssignment === _constants_js__WEBPACK_IMPORTED_MODULE_0__["reserved"]) {
        return null;
      }

      header.channels = channelAssignment.channels;
      header.channelMode = channelAssignment.description;

      header.bitDepth = bitDepth[data[3] & 0b00001110];
      if (header.bitDepth === _constants_js__WEBPACK_IMPORTED_MODULE_0__["reserved"]) {
        return null;
      }
    } else {
      Object.assign(header, cachedHeader);
    }

    // Byte (5...)
    // * `IIIIIIII|...`: VBR block size ? sample number : frame number
    header.length = 5;

    // check if there is enough data to parse UTF8
    data = yield* codecParser.readRawData(header.length + 8, readOffset);

    const decodedUtf8 = FLACHeader.decodeUTF8Int(data.subarray(4));
    if (!decodedUtf8) {
      return null;
    }

    if (header.blockingStrategyBits) {
      header.sampleNumber = decodedUtf8.value;
    } else {
      header.frameNumber = decodedUtf8.value;
    }

    header.length += decodedUtf8.length;

    // Byte (...)
    // * `JJJJJJJJ|(JJJJJJJJ)`: Blocksize (8/16bit custom value)
    if (header.blockSizeBits === 0b01100000) {
      // 8 bit
      if (data.length < header.length)
        data = yield* codecParser.readRawData(header.length, readOffset);

      header.blockSize = data[header.length - 1] + 1;
      header.length += 1;
    } else if (header.blockSizeBits === 0b01110000) {
      // 16 bit
      if (data.length < header.length)
        data = yield* codecParser.readRawData(header.length, readOffset);

      header.blockSize =
        (data[header.length - 1] << 8) + data[header.length] + 1;
      header.length += 2;
    }

    header.samples = header.blockSize;

    // Byte (...)
    // * `KKKKKKKK|(KKKKKKKK)`: Sample rate (8/16bit custom value)
    if (header.sampleRateBits === 0b00001100) {
      // 8 bit
      if (data.length < header.length)
        data = yield* codecParser.readRawData(header.length, readOffset);

      header.sampleRate = data[header.length - 1] * 1000;
      header.length += 1;
    } else if (header.sampleRateBits === 0b00001101) {
      // 16 bit
      if (data.length < header.length)
        data = yield* codecParser.readRawData(header.length, readOffset);

      header.sampleRate = (data[header.length - 1] << 8) + data[header.length];
      header.length += 2;
    } else if (header.sampleRateBits === 0b00001110) {
      // 16 bit
      if (data.length < header.length)
        data = yield* codecParser.readRawData(header.length, readOffset);

      header.sampleRate =
        ((data[header.length - 1] << 8) + data[header.length]) * 10;
      header.length += 2;
    }

    // Byte (...)
    // * `LLLLLLLL`: CRC-8
    if (data.length < header.length)
      data = yield* codecParser.readRawData(header.length, readOffset);

    header.crc = data[header.length - 1];
    if (header.crc !== Object(_utilities_js__WEBPACK_IMPORTED_MODULE_1__["crc8"])(data.subarray(0, header.length - 1))) {
      return null;
    }

    if (!cachedHeader) {
      const {
        blockingStrategyBits,
        frameNumber,
        sampleNumber,
        samples,
        sampleRateBits,
        blockSizeBits,
        crc,
        length,
        ...codecUpdateFields
      } = header;
      headerCache.setHeader(key, header, codecUpdateFields);
    }
    return new FLACHeader(header);
  }

  /**
   * @private
   * Call FLACHeader.getHeader(Array<Uint8>) to get instance
   */
  constructor(header) {
    super(header);

    this.crc16 = null; // set in FLACFrame
    this.blockingStrategy = header.blockingStrategy;
    this.blockSize = header.blockSize;
    this.frameNumber = header.frameNumber;
    this.sampleNumber = header.sampleNumber;
    this.streamInfo = null; // set during ogg parsing
  }
}


/***/ }),

/***/ "./node_modules/codec-parser/src/codecs/flac/FLACParser.js":
/*!*****************************************************************!*\
  !*** ./node_modules/codec-parser/src/codecs/flac/FLACParser.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FLACParser; });
/* harmony import */ var _globals_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../globals.js */ "./node_modules/codec-parser/src/globals.js");
/* harmony import */ var _Parser_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Parser.js */ "./node_modules/codec-parser/src/codecs/Parser.js");
/* harmony import */ var _FLACFrame_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FLACFrame.js */ "./node_modules/codec-parser/src/codecs/flac/FLACFrame.js");
/* harmony import */ var _FLACHeader_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FLACHeader.js */ "./node_modules/codec-parser/src/codecs/flac/FLACHeader.js");
/* Copyright 2020-2021 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/






const MIN_FLAC_FRAME_SIZE = 2;
const MAX_FLAC_FRAME_SIZE = 512 * 1024;

class FLACParser extends _Parser_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(codecParser, onCodecUpdate) {
    super(codecParser, onCodecUpdate);
    this.Frame = _FLACFrame_js__WEBPACK_IMPORTED_MODULE_2__["default"];
    this.Header = _FLACHeader_js__WEBPACK_IMPORTED_MODULE_3__["default"];
  }

  get codec() {
    return "flac";
  }

  *_getNextFrameSyncOffset(offset) {
    const data = yield* this._codecParser.readRawData(2, 0);
    const dataLength = data.length - 2;

    while (offset < dataLength) {
      // * `11111111|111110..`: Frame sync
      // * `........|......0.`: Reserved 0 - mandatory, 1 - reserved
      const firstByte = data[offset];
      if (firstByte === 0xff) {
        const secondByte = data[offset + 1];
        if (secondByte === 0xf8 || secondByte === 0xf9) break;
        if (secondByte !== 0xff) offset++; // might as well check for the next sync byte
      }
      offset++;
    }

    return offset;
  }

  *parseFrame() {
    // find the first valid frame header
    do {
      const header = yield* _FLACHeader_js__WEBPACK_IMPORTED_MODULE_3__["default"].getHeader(
        this._codecParser,
        this._headerCache,
        0
      );

      if (header) {
        // found a valid frame header
        // find the next valid frame header
        let nextHeaderOffset =
          _globals_js__WEBPACK_IMPORTED_MODULE_0__["headerStore"].get(header).length + MIN_FLAC_FRAME_SIZE;

        while (nextHeaderOffset <= MAX_FLAC_FRAME_SIZE) {
          if (
            this._codecParser._flushing ||
            (yield* _FLACHeader_js__WEBPACK_IMPORTED_MODULE_3__["default"].getHeader(
              this._codecParser,
              this._headerCache,
              nextHeaderOffset
            ))
          ) {
            // found a valid next frame header
            let frameData = yield* this._codecParser.readRawData(
              nextHeaderOffset
            );

            if (!this._codecParser._flushing)
              frameData = frameData.subarray(0, nextHeaderOffset);

            // check that this is actually the next header by validating the frame footer crc16
            if (_FLACFrame_js__WEBPACK_IMPORTED_MODULE_2__["default"].checkFrameFooterCrc16(frameData)) {
              // both frame headers, and frame footer crc16 are valid, we are synced (odds are pretty low of a false positive)
              const frame = new _FLACFrame_js__WEBPACK_IMPORTED_MODULE_2__["default"](frameData, header);

              this._headerCache.enable(); // start caching when synced
              this._codecParser.incrementRawData(nextHeaderOffset); // increment to the next frame
              this._codecParser.mapFrameStats(frame);

              return frame;
            }
          }

          nextHeaderOffset = yield* this._getNextFrameSyncOffset(
            nextHeaderOffset + 1
          );
        }

        this._codecParser.logWarning(
          `Unable to sync FLAC frame after searching ${nextHeaderOffset} bytes.`
        );
        this._codecParser.incrementRawData(nextHeaderOffset);
      } else {
        // not synced, increment data to continue syncing
        this._codecParser.incrementRawData(
          yield* this._getNextFrameSyncOffset(1)
        );
      }
    } while (true);
  }

  parseOggPage(oggPage) {
    if (oggPage.pageSequenceNumber === 0) {
      // Identification header

      this._headerCache.enable();
      this._streamInfo = oggPage.data.subarray(13);
    } else if (oggPage.pageSequenceNumber === 1) {
      // Vorbis comments
    } else {
      oggPage.codecFrames = _globals_js__WEBPACK_IMPORTED_MODULE_0__["frameStore"]
        .get(oggPage)
        .segments.map((segment) => {
          const header = _FLACHeader_js__WEBPACK_IMPORTED_MODULE_3__["default"].getHeaderFromUint8Array(
            segment,
            this._headerCache
          );

          if (header) {
            return new _FLACFrame_js__WEBPACK_IMPORTED_MODULE_2__["default"](segment, header, this._streamInfo);
          } else {
            this._codecParser.logWarning(
              "Failed to parse Ogg FLAC frame",
              "Skipping invalid FLAC frame"
            );
          }
        })
        .filter((frame) => Boolean(frame));
    }

    return oggPage;
  }
}


/***/ }),

/***/ "./node_modules/codec-parser/src/codecs/mpeg/MPEGFrame.js":
/*!****************************************************************!*\
  !*** ./node_modules/codec-parser/src/codecs/mpeg/MPEGFrame.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MPEGFrame; });
/* harmony import */ var _CodecFrame_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../CodecFrame.js */ "./node_modules/codec-parser/src/codecs/CodecFrame.js");
/* harmony import */ var _MPEGHeader_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MPEGHeader.js */ "./node_modules/codec-parser/src/codecs/mpeg/MPEGHeader.js");
/* Copyright 2020-2021 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/




class MPEGFrame extends _CodecFrame_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  static *getFrame(codecParser, headerCache, readOffset) {
    return yield* super.getFrame(
      _MPEGHeader_js__WEBPACK_IMPORTED_MODULE_1__["default"],
      MPEGFrame,
      codecParser,
      headerCache,
      readOffset
    );
  }

  constructor(header, frame, samples) {
    super(header, frame, samples);
  }
}


/***/ }),

/***/ "./node_modules/codec-parser/src/codecs/mpeg/MPEGHeader.js":
/*!*****************************************************************!*\
  !*** ./node_modules/codec-parser/src/codecs/mpeg/MPEGHeader.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MPEGHeader; });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants.js */ "./node_modules/codec-parser/src/constants.js");
/* harmony import */ var _utilities_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utilities.js */ "./node_modules/codec-parser/src/utilities.js");
/* harmony import */ var _metadata_ID3v2_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../metadata/ID3v2.js */ "./node_modules/codec-parser/src/metadata/ID3v2.js");
/* harmony import */ var _CodecHeader_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../CodecHeader.js */ "./node_modules/codec-parser/src/codecs/CodecHeader.js");
/* Copyright 2020-2021 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/







// http://www.mp3-tech.org/programmer/frame_header.html

const bitrateMatrix = {
  // bits | V1,L1 | V1,L2 | V1,L3 | V2,L1 | V2,L2 & L3
  0b00000000: [_constants_js__WEBPACK_IMPORTED_MODULE_0__["free"], _constants_js__WEBPACK_IMPORTED_MODULE_0__["free"], _constants_js__WEBPACK_IMPORTED_MODULE_0__["free"], _constants_js__WEBPACK_IMPORTED_MODULE_0__["free"], _constants_js__WEBPACK_IMPORTED_MODULE_0__["free"]],
  0b00010000: [32, 32, 32, 32, 8],
  // 0b00100000: [64,   48,  40,  48,  16,],
  // 0b00110000: [96,   56,  48,  56,  24,],
  // 0b01000000: [128,  64,  56,  64,  32,],
  // 0b01010000: [160,  80,  64,  80,  40,],
  // 0b01100000: [192,  96,  80,  96,  48,],
  // 0b01110000: [224, 112,  96, 112,  56,],
  // 0b10000000: [256, 128, 112, 128,  64,],
  // 0b10010000: [288, 160, 128, 144,  80,],
  // 0b10100000: [320, 192, 160, 160,  96,],
  // 0b10110000: [352, 224, 192, 176, 112,],
  // 0b11000000: [384, 256, 224, 192, 128,],
  // 0b11010000: [416, 320, 256, 224, 144,],
  // 0b11100000: [448, 384, 320, 256, 160,],
  0b11110000: [_constants_js__WEBPACK_IMPORTED_MODULE_0__["bad"], _constants_js__WEBPACK_IMPORTED_MODULE_0__["bad"], _constants_js__WEBPACK_IMPORTED_MODULE_0__["bad"], _constants_js__WEBPACK_IMPORTED_MODULE_0__["bad"], _constants_js__WEBPACK_IMPORTED_MODULE_0__["bad"]],
};

const calcBitrate = (idx, interval, intervalOffset) =>
  8 *
    (((idx + intervalOffset) % interval) + interval) *
    (1 << ((idx + intervalOffset) / interval)) -
  8 * interval * ((interval / 8) | 0);

// generate bitrate matrix
for (let i = 2; i < 15; i++)
  bitrateMatrix[i << 4] = [
    i * 32, //                V1,L1
    calcBitrate(i, 4, 0), //  V1,L2
    calcBitrate(i, 4, -1), // V1,L3
    calcBitrate(i, 8, 4), //  V2,L1
    calcBitrate(i, 8, 0), //  V2,L2 & L3
  ];

const v1Layer1 = 0;
const v1Layer2 = 1;
const v1Layer3 = 2;
const v2Layer1 = 3;
const v2Layer23 = 4;

const bands = "bands ";
const to31 = " to 31";
const layer12ModeExtensions = {
  0b00000000: bands + 4 + to31,
  0b00010000: bands + 8 + to31,
  0b00100000: bands + 12 + to31,
  0b00110000: bands + 16 + to31,
};

const intensityStereo = "Intensity stereo ";
const msStereo = ", MS stereo ";
const on = "on";
const off = "off";
const layer3ModeExtensions = {
  0b00000000: intensityStereo + off + msStereo + off,
  0b00010000: intensityStereo + on + msStereo + off,
  0b00100000: intensityStereo + off + msStereo + on,
  0b00110000: intensityStereo + on + msStereo + on,
};

const layer = "Layer ";
const layers = {
  0b00000000: { description: _constants_js__WEBPACK_IMPORTED_MODULE_0__["reserved"] },
  0b00000010: {
    description: "Layer III",
    framePadding: 1,
    modeExtensions: layer3ModeExtensions,
    v1: {
      bitrateIndex: v1Layer3,
      samples: 1152,
    },
    v2: {
      bitrateIndex: v2Layer23,
      samples: 576,
    },
  },
  0b00000100: {
    description: "Layer II",
    framePadding: 1,
    modeExtensions: layer12ModeExtensions,
    samples: 1152,
    v1: {
      bitrateIndex: v1Layer2,
    },
    v2: {
      bitrateIndex: v2Layer23,
    },
  },
  0b00000110: {
    description: "Layer I",
    framePadding: 4,
    modeExtensions: layer12ModeExtensions,
    samples: 384,
    v1: {
      bitrateIndex: v1Layer1,
    },
    v2: {
      bitrateIndex: v2Layer1,
    },
  },
};

const mpegVersion = "MPEG Version ";
const isoIec = "ISO/IEC ";
const v2 = "v2";
const v1 = "v1";
const mpegVersions = {
  0b00000000: {
    description: `${mpegVersion}2.5 (later extension of MPEG 2)`,
    layers: v2,
    sampleRates: {
      0b00000000: _constants_js__WEBPACK_IMPORTED_MODULE_0__["rate11025"],
      0b00000100: _constants_js__WEBPACK_IMPORTED_MODULE_0__["rate12000"],
      0b00001000: _constants_js__WEBPACK_IMPORTED_MODULE_0__["rate8000"],
      0b00001100: _constants_js__WEBPACK_IMPORTED_MODULE_0__["reserved"],
    },
  },
  0b00001000: { description: _constants_js__WEBPACK_IMPORTED_MODULE_0__["reserved"] },
  0b00010000: {
    description: `${mpegVersion}2 (${isoIec}13818-3)`,
    layers: v2,
    sampleRates: {
      0b00000000: _constants_js__WEBPACK_IMPORTED_MODULE_0__["rate22050"],
      0b00000100: _constants_js__WEBPACK_IMPORTED_MODULE_0__["rate24000"],
      0b00001000: _constants_js__WEBPACK_IMPORTED_MODULE_0__["rate16000"],
      0b00001100: _constants_js__WEBPACK_IMPORTED_MODULE_0__["reserved"],
    },
  },
  0b00011000: {
    description: `${mpegVersion}1 (${isoIec}11172-3)`,
    layers: v1,
    sampleRates: {
      0b00000000: _constants_js__WEBPACK_IMPORTED_MODULE_0__["rate44100"],
      0b00000100: _constants_js__WEBPACK_IMPORTED_MODULE_0__["rate48000"],
      0b00001000: _constants_js__WEBPACK_IMPORTED_MODULE_0__["rate32000"],
      0b00001100: _constants_js__WEBPACK_IMPORTED_MODULE_0__["reserved"],
    },
  },
};

const protection = {
  0b00000000: _constants_js__WEBPACK_IMPORTED_MODULE_0__["sixteenBitCRC"],
  0b00000001: _constants_js__WEBPACK_IMPORTED_MODULE_0__["none"],
};

const emphasis = {
  0b00000000: _constants_js__WEBPACK_IMPORTED_MODULE_0__["none"],
  0b00000001: "50/15 ms",
  0b00000010: _constants_js__WEBPACK_IMPORTED_MODULE_0__["reserved"],
  0b00000011: "CCIT J.17",
};

const channelModes = {
  0b00000000: { channels: 2, description: _constants_js__WEBPACK_IMPORTED_MODULE_0__["stereo"] },
  0b01000000: { channels: 2, description: "joint " + _constants_js__WEBPACK_IMPORTED_MODULE_0__["stereo"] },
  0b10000000: { channels: 2, description: "dual channel" },
  0b11000000: { channels: 1, description: _constants_js__WEBPACK_IMPORTED_MODULE_0__["monophonic"] },
};

class MPEGHeader extends _CodecHeader_js__WEBPACK_IMPORTED_MODULE_3__["default"] {
  static *getHeader(codecParser, headerCache, readOffset) {
    const header = {};

    // check for id3 header
    const id3v2Header = yield* _metadata_ID3v2_js__WEBPACK_IMPORTED_MODULE_2__["default"].getID3v2Header(
      codecParser,
      headerCache,
      readOffset
    );

    if (id3v2Header) {
      // throw away the data. id3 parsing is not implemented yet.
      yield* codecParser.readRawData(id3v2Header.length, readOffset);
      codecParser.incrementRawData(id3v2Header.length);
    }

    // Must be at least four bytes.
    const data = yield* codecParser.readRawData(4, readOffset);

    // Check header cache
    const key = Object(_utilities_js__WEBPACK_IMPORTED_MODULE_1__["bytesToString"])(data.subarray(0, 4));
    const cachedHeader = headerCache.getHeader(key);
    if (cachedHeader) return new MPEGHeader(cachedHeader);

    // Frame sync (all bits must be set): `11111111|111`:
    if (data[0] !== 0xff || data[1] < 0xe0) return null;

    // Byte (2 of 4)
    // * `111BBCCD`
    // * `...BB...`: MPEG Audio version ID
    // * `.....CC.`: Layer description
    // * `.......D`: Protection bit (0 - Protected by CRC (16bit CRC follows header), 1 = Not protected)

    // Mpeg version (1, 2, 2.5)
    const mpegVersion = mpegVersions[data[1] & 0b00011000];
    if (mpegVersion.description === _constants_js__WEBPACK_IMPORTED_MODULE_0__["reserved"]) return null;

    // Layer (I, II, III)
    const layerBits = data[1] & 0b00000110;
    if (layers[layerBits].description === _constants_js__WEBPACK_IMPORTED_MODULE_0__["reserved"]) return null;
    const layer = {
      ...layers[layerBits],
      ...layers[layerBits][mpegVersion.layers],
    };

    header.mpegVersion = mpegVersion.description;
    header.layer = layer.description;
    header.samples = layer.samples;
    header.protection = protection[data[1] & 0b00000001];

    header.length = 4;

    // Byte (3 of 4)
    // * `EEEEFFGH`
    // * `EEEE....`: Bitrate index. 1111 is invalid, everything else is accepted
    // * `....FF..`: Sample rate
    // * `......G.`: Padding bit, 0=frame not padded, 1=frame padded
    // * `.......H`: Private bit.
    header.bitrate = bitrateMatrix[data[2] & 0b11110000][layer.bitrateIndex];
    if (header.bitrate === _constants_js__WEBPACK_IMPORTED_MODULE_0__["bad"]) return null;

    header.sampleRate = mpegVersion.sampleRates[data[2] & 0b00001100];
    if (header.sampleRate === _constants_js__WEBPACK_IMPORTED_MODULE_0__["reserved"]) return null;

    header.framePadding = data[2] & 0b00000010 && layer.framePadding;
    header.isPrivate = Boolean(data[2] & 0b00000001);

    header.frameLength = Math.floor(
      (125 * header.bitrate * header.samples) / header.sampleRate +
        header.framePadding
    );
    if (!header.frameLength) return null;

    // Byte (4 of 4)
    // * `IIJJKLMM`
    // * `II......`: Channel mode
    // * `..JJ....`: Mode extension (only if joint stereo)
    // * `....K...`: Copyright
    // * `.....L..`: Original
    // * `......MM`: Emphasis
    const channelModeBits = data[3] & 0b11000000;
    header.channelMode = channelModes[channelModeBits].description;
    header.channels = channelModes[channelModeBits].channels;

    header.modeExtension = layer.modeExtensions[data[3] & 0b00110000];
    header.isCopyrighted = Boolean(data[3] & 0b00001000);
    header.isOriginal = Boolean(data[3] & 0b00000100);

    header.emphasis = emphasis[data[3] & 0b00000011];
    if (header.emphasis === _constants_js__WEBPACK_IMPORTED_MODULE_0__["reserved"]) return null;

    header.bitDepth = 16;

    // set header cache
    const { length, frameLength, samples, ...codecUpdateFields } = header;

    headerCache.setHeader(key, header, codecUpdateFields);
    return new MPEGHeader(header);
  }

  /**
   * @private
   * Call MPEGHeader.getHeader(Array<Uint8>) to get instance
   */
  constructor(header) {
    super(header);

    this.bitrate = header.bitrate;
    this.emphasis = header.emphasis;
    this.framePadding = header.framePadding;
    this.isCopyrighted = header.isCopyrighted;
    this.isOriginal = header.isOriginal;
    this.isPrivate = header.isPrivate;
    this.layer = header.layer;
    this.modeExtension = header.modeExtension;
    this.mpegVersion = header.mpegVersion;
    this.protection = header.protection;
  }
}


/***/ }),

/***/ "./node_modules/codec-parser/src/codecs/mpeg/MPEGParser.js":
/*!*****************************************************************!*\
  !*** ./node_modules/codec-parser/src/codecs/mpeg/MPEGParser.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MPEGParser; });
/* harmony import */ var _Parser_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Parser.js */ "./node_modules/codec-parser/src/codecs/Parser.js");
/* harmony import */ var _MPEGFrame_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MPEGFrame.js */ "./node_modules/codec-parser/src/codecs/mpeg/MPEGFrame.js");
/* harmony import */ var _MPEGHeader_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MPEGHeader.js */ "./node_modules/codec-parser/src/codecs/mpeg/MPEGHeader.js");
/* Copyright 2020-2021 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/





class MPEGParser extends _Parser_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(codecParser, headerCache, onCodec) {
    super(codecParser, headerCache);
    this.Frame = _MPEGFrame_js__WEBPACK_IMPORTED_MODULE_1__["default"];
    this.Header = _MPEGHeader_js__WEBPACK_IMPORTED_MODULE_2__["default"];

    onCodec(this.codec);
  }

  get codec() {
    return "mpeg";
  }

  *parseFrame() {
    return yield* this.fixedLengthFrameSync();
  }
}


/***/ }),

/***/ "./node_modules/codec-parser/src/codecs/opus/OpusFrame.js":
/*!****************************************************************!*\
  !*** ./node_modules/codec-parser/src/codecs/opus/OpusFrame.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return OpusFrame; });
/* harmony import */ var _CodecFrame_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../CodecFrame.js */ "./node_modules/codec-parser/src/codecs/CodecFrame.js");
/* Copyright 2020-2021 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/



class OpusFrame extends _CodecFrame_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(data, header) {
    super(
      header,
      data,
      ((header.frameSize * header.frameCount) / 1000) * header.sampleRate
    );
  }
}


/***/ }),

/***/ "./node_modules/codec-parser/src/codecs/opus/OpusHeader.js":
/*!*****************************************************************!*\
  !*** ./node_modules/codec-parser/src/codecs/opus/OpusHeader.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return OpusHeader; });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants.js */ "./node_modules/codec-parser/src/constants.js");
/* harmony import */ var _utilities_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utilities.js */ "./node_modules/codec-parser/src/utilities.js");
/* harmony import */ var _CodecHeader_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CodecHeader.js */ "./node_modules/codec-parser/src/codecs/CodecHeader.js");
/* Copyright 2020-2021 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/

/*
https://tools.ietf.org/html/rfc7845.html
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|      'O'      |      'p'      |      'u'      |      's'      |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|      'H'      |      'e'      |      'a'      |      'd'      |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|  Version = 1  | Channel Count |           Pre-skip            |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                     Input Sample Rate (Hz)                    |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|   Output Gain (Q7.8 in dB)    | Mapping Family|               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+               :
|                                                               |
:               Optional Channel Mapping Table...               :
|                                                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

Letter  Length (bits)  Description
A  64  Magic Signature - OpusHead
B  8   Version number - 00000001
C  8   Output channel count (unsigned)
D  16  Pre-skip (unsigned, little endian)
E  32  Sample rate (unsigned, little endian)
F  16  Output Gain (signed, little endian)
G  8   Channel Mapping family (unsigned)

// if(channel mapping !== 0)
H  8   Stream count (unsigned)
I  8   Coupled Stream Count (unsigned)
J  8*C Channel Mapping
*/






/* prettier-ignore */
const channelMappingFamilies = {
  0b00000000: _constants_js__WEBPACK_IMPORTED_MODULE_0__["vorbisOpusChannelMapping"].slice(0,2),
    /*
    0: "monophonic (mono)"
    1: "stereo (left, right)"
    */
  0b00000001: _constants_js__WEBPACK_IMPORTED_MODULE_0__["vorbisOpusChannelMapping"]
    /*
    0: "monophonic (mono)"
    1: "stereo (left, right)"
    2: "linear surround (left, center, right)"
    3: "quadraphonic (front left, front right, rear left, rear right)"
    4: "5.0 surround (front left, front center, front right, rear left, rear right)"
    5: "5.1 surround (front left, front center, front right, rear left, rear right, LFE)"
    6: "6.1 surround (front left, front center, front right, side left, side right, rear center, LFE)"
    7: "7.1 surround (front left, front center, front right, side left, side right, rear left, rear right, LFE)"
    */
};

const silkOnly = "SILK-only";
const celtOnly = "CELT-only";
const hybrid = "Hybrid";

const narrowBand = "narrowband";
const mediumBand = "medium-band";
const wideBand = "wideband";
const superWideBand = "super-wideband";
const fullBand = "fullband";

//  0 1 2 3 4 5 6 7
// +-+-+-+-+-+-+-+-+
// | config  |s| c |
// +-+-+-+-+-+-+-+-+
const configTable = {
  0b00000000: { mode: silkOnly, bandwidth: narrowBand, frameSize: 10 },
  0b00001000: { mode: silkOnly, bandwidth: narrowBand, frameSize: 20 },
  0b00010000: { mode: silkOnly, bandwidth: narrowBand, frameSize: 40 },
  0b00011000: { mode: silkOnly, bandwidth: narrowBand, frameSize: 60 },
  0b00100000: { mode: silkOnly, bandwidth: mediumBand, frameSize: 10 },
  0b00101000: { mode: silkOnly, bandwidth: mediumBand, frameSize: 20 },
  0b00110000: { mode: silkOnly, bandwidth: mediumBand, frameSize: 40 },
  0b00111000: { mode: silkOnly, bandwidth: mediumBand, frameSize: 60 },
  0b01000000: { mode: silkOnly, bandwidth: wideBand, frameSize: 10 },
  0b01001000: { mode: silkOnly, bandwidth: wideBand, frameSize: 20 },
  0b01010000: { mode: silkOnly, bandwidth: wideBand, frameSize: 40 },
  0b01011000: { mode: silkOnly, bandwidth: wideBand, frameSize: 60 },
  0b01100000: { mode: hybrid, bandwidth: superWideBand, frameSize: 10 },
  0b01101000: { mode: hybrid, bandwidth: superWideBand, frameSize: 20 },
  0b01110000: { mode: hybrid, bandwidth: fullBand, frameSize: 10 },
  0b01111000: { mode: hybrid, bandwidth: fullBand, frameSize: 20 },
  0b10000000: { mode: celtOnly, bandwidth: narrowBand, frameSize: 2.5 },
  0b10001000: { mode: celtOnly, bandwidth: narrowBand, frameSize: 5 },
  0b10010000: { mode: celtOnly, bandwidth: narrowBand, frameSize: 10 },
  0b10011000: { mode: celtOnly, bandwidth: narrowBand, frameSize: 20 },
  0b10100000: { mode: celtOnly, bandwidth: wideBand, frameSize: 2.5 },
  0b10101000: { mode: celtOnly, bandwidth: wideBand, frameSize: 5 },
  0b10110000: { mode: celtOnly, bandwidth: wideBand, frameSize: 10 },
  0b10111000: { mode: celtOnly, bandwidth: wideBand, frameSize: 20 },
  0b11000000: { mode: celtOnly, bandwidth: superWideBand, frameSize: 2.5 },
  0b11001000: { mode: celtOnly, bandwidth: superWideBand, frameSize: 5 },
  0b11010000: { mode: celtOnly, bandwidth: superWideBand, frameSize: 10 },
  0b11011000: { mode: celtOnly, bandwidth: superWideBand, frameSize: 20 },
  0b11100000: { mode: celtOnly, bandwidth: fullBand, frameSize: 2.5 },
  0b11101000: { mode: celtOnly, bandwidth: fullBand, frameSize: 5 },
  0b11110000: { mode: celtOnly, bandwidth: fullBand, frameSize: 10 },
  0b11111000: { mode: celtOnly, bandwidth: fullBand, frameSize: 20 },
};

class OpusHeader extends _CodecHeader_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
  static getHeaderFromUint8Array(data, packetData, headerCache) {
    const header = {};

    // get length of header
    // Byte (10 of 19)
    // * `CCCCCCCC`: Channel Count
    header.channels = data[9];
    // Byte (19 of 19)
    // * `GGGGGGGG`: Channel Mapping Family
    header.channelMappingFamily = data[18];

    header.length =
      header.channelMappingFamily !== 0 ? 21 + header.channels : 19;

    if (data.length < header.length)
      throw new Error("Out of data while inside an Ogg Page");

    // Page Segment Bytes (1-2)
    // * `AAAAA...`: Packet config
    // * `.....B..`:
    // * `......CC`: Packet code
    const packetMode = packetData[0] & 0b00000011;
    const packetLength = packetMode === 3 ? 2 : 1;

    // Check header cache
    const key =
      Object(_utilities_js__WEBPACK_IMPORTED_MODULE_1__["bytesToString"])(data.subarray(0, header.length)) +
      Object(_utilities_js__WEBPACK_IMPORTED_MODULE_1__["bytesToString"])(packetData.subarray(0, packetLength));
    const cachedHeader = headerCache.getHeader(key);

    if (cachedHeader) return new OpusHeader(cachedHeader);

    // Bytes (1-8 of 19): OpusHead - Magic Signature
    if (key.substr(0, 8) !== "OpusHead") {
      return null;
    }

    // Byte (9 of 19)
    // * `00000001`: Version number
    if (data[8] !== 1) return null;

    header.data = Uint8Array.from(data.subarray(0, header.length));

    const view = new DataView(header.data.buffer);

    header.bitDepth = 16;

    // Byte (10 of 19)
    // * `CCCCCCCC`: Channel Count
    // set earlier to determine length

    // Byte (11-12 of 19)
    // * `DDDDDDDD|DDDDDDDD`: Pre skip
    header.preSkip = view.getUint16(10, true);

    // Byte (13-16 of 19)
    // * `EEEEEEEE|EEEEEEEE|EEEEEEEE|EEEEEEEE`: Sample Rate
    header.inputSampleRate = view.getUint32(12, true);
    // Opus is always decoded at 48kHz
    header.sampleRate = _constants_js__WEBPACK_IMPORTED_MODULE_0__["rate48000"];

    // Byte (17-18 of 19)
    // * `FFFFFFFF|FFFFFFFF`: Output Gain
    header.outputGain = view.getInt16(16, true);

    // Byte (19 of 19)
    // * `GGGGGGGG`: Channel Mapping Family
    // set earlier to determine length
    if (!header.channelMappingFamily in channelMappingFamilies) return null;

    header.channelMode =
      channelMappingFamilies[header.channelMappingFamily][header.channels - 1];
    if (!header.channelMode) return null;

    if (header.channelMappingFamily !== 0) {
      // * `HHHHHHHH`: Stream count
      header.streamCount = data[19];

      // * `IIIIIIII`: Coupled Stream count
      header.coupledStreamCount = data[20];

      // * `JJJJJJJJ|...` Channel Mapping table
      header.channelMappingTable = data.subarray(21, header.channels + 21);
    }

    const packetConfig = configTable[0b11111000 & packetData[0]];
    header.mode = packetConfig.mode;
    header.bandwidth = packetConfig.bandwidth;
    header.frameSize = packetConfig.frameSize;

    // https://tools.ietf.org/html/rfc6716#appendix-B
    switch (packetMode) {
      case 0:
        // 0: 1 frame in the packet
        header.frameCount = 1;
        break;
      case 1:
      // 1: 2 frames in the packet, each with equal compressed size
      case 2:
        // 2: 2 frames in the packet, with different compressed sizes
        header.frameCount = 2;
        break;
      case 3:
        // 3: an arbitrary number of frames in the packet
        header.isVbr = Boolean(0b10000000 & packetData[1]);
        header.hasOpusPadding = Boolean(0b01000000 & packetData[1]);
        header.frameCount = 0b00111111 & packetData[1];
        break;
      default:
        return null;
    }

    // set header cache
    const {
      length,
      data: headerData,
      channelMappingFamily,
      ...codecUpdateFields
    } = header;

    headerCache.setHeader(key, header, codecUpdateFields);

    return new OpusHeader(header);
  }

  /**
   * @private
   * Call OpusHeader.getHeader(Array<Uint8>) to get instance
   */
  constructor(header) {
    super(header);

    this.data = header.data;
    this.bandwidth = header.bandwidth;
    this.channelMappingFamily = header.channelMappingFamily;
    this.channelMappingTable = header.channelMappingTable;
    this.coupledStreamCount = header.coupledStreamCount;
    this.frameCount = header.frameCount;
    this.frameSize = header.frameSize;
    this.hasOpusPadding = header.hasOpusPadding;
    this.inputSampleRate = header.inputSampleRate;
    this.isVbr = header.isVbr;
    this.mode = header.mode;
    this.outputGain = header.outputGain;
    this.preSkip = header.preSkip;
    this.streamCount = header.streamCount;
  }
}


/***/ }),

/***/ "./node_modules/codec-parser/src/codecs/opus/OpusParser.js":
/*!*****************************************************************!*\
  !*** ./node_modules/codec-parser/src/codecs/opus/OpusParser.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return OpusParser; });
/* harmony import */ var _globals_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../globals.js */ "./node_modules/codec-parser/src/globals.js");
/* harmony import */ var _Parser_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Parser.js */ "./node_modules/codec-parser/src/codecs/Parser.js");
/* harmony import */ var _OpusFrame_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OpusFrame.js */ "./node_modules/codec-parser/src/codecs/opus/OpusFrame.js");
/* harmony import */ var _OpusHeader_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./OpusHeader.js */ "./node_modules/codec-parser/src/codecs/opus/OpusHeader.js");
/* Copyright 2020-2021 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/






class OpusParser extends _Parser_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(codecParser, headerCache) {
    super(codecParser, headerCache);
    this.Frame = _OpusFrame_js__WEBPACK_IMPORTED_MODULE_2__["default"];
    this.Header = _OpusHeader_js__WEBPACK_IMPORTED_MODULE_3__["default"];

    this._identificationHeader = null;
  }

  get codec() {
    return "opus";
  }

  /**
   * @todo implement continued page support
   */
  parseOggPage(oggPage) {
    if (oggPage.pageSequenceNumber === 0) {
      // Identification header

      this._headerCache.enable();
      this._identificationHeader = oggPage.data;
    } else if (oggPage.pageSequenceNumber === 1) {
      // OpusTags
    } else {
      oggPage.codecFrames = _globals_js__WEBPACK_IMPORTED_MODULE_0__["frameStore"].get(oggPage).segments.map((segment) => {
        const header = _OpusHeader_js__WEBPACK_IMPORTED_MODULE_3__["default"].getHeaderFromUint8Array(
          this._identificationHeader,
          segment,
          this._headerCache
        );

        if (header) return new _OpusFrame_js__WEBPACK_IMPORTED_MODULE_2__["default"](segment, header);

        this._codecParser.logError(
          "Failed to parse Ogg Opus Header",
          "Not a valid Ogg Opus file"
        );
      });
    }

    return oggPage;
  }
}


/***/ }),

/***/ "./node_modules/codec-parser/src/codecs/vorbis/VorbisFrame.js":
/*!********************************************************************!*\
  !*** ./node_modules/codec-parser/src/codecs/vorbis/VorbisFrame.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return VorbisFrame; });
/* harmony import */ var _CodecFrame_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../CodecFrame.js */ "./node_modules/codec-parser/src/codecs/CodecFrame.js");
/* Copyright 2020-2021 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/



class VorbisFrame extends _CodecFrame_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(data, header, samples) {
    super(header, data, samples);
  }
}


/***/ }),

/***/ "./node_modules/codec-parser/src/codecs/vorbis/VorbisHeader.js":
/*!*********************************************************************!*\
  !*** ./node_modules/codec-parser/src/codecs/vorbis/VorbisHeader.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return VorbisHeader; });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants.js */ "./node_modules/codec-parser/src/constants.js");
/* harmony import */ var _utilities_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utilities.js */ "./node_modules/codec-parser/src/utilities.js");
/* harmony import */ var _CodecHeader_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CodecHeader.js */ "./node_modules/codec-parser/src/codecs/CodecHeader.js");
/* Copyright 2020-2021 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/

/*

1  1) [packet_type] : 8 bit value
2  2) 0x76, 0x6f, 0x72, 0x62, 0x69, 0x73: the characters ’v’,’o’,’r’,’b’,’i’,’s’ as six octets

Letter bits Description
A      8    Packet type
B      48   Magic signature (vorbis)
C      32   Version number
D      8    Channels
E      32   Sample rate
F      32   Bitrate Maximum (signed)
G      32   Bitrate Nominal (signed)
H      32   Bitrate Minimum (signed)
I      4    blocksize 1
J      4    blocksize 0
K      1    Framing flag
*/






const blockSizes = {
  // 0b0110: 64,
  // 0b0111: 128,
  // 0b1000: 256,
  // 0b1001: 512,
  // 0b1010: 1024,
  // 0b1011: 2048,
  // 0b1100: 4096,
  // 0b1101: 8192
};
for (let i = 0; i < 8; i++) blockSizes[i + 6] = 2 ** (6 + i);

class VorbisHeader extends _CodecHeader_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
  static getHeaderFromUint8Array(data, headerCache) {
    // Must be at least 30 bytes.
    if (data.length < 30)
      throw new Error("Out of data while inside an Ogg Page");

    // Check header cache
    const key = Object(_utilities_js__WEBPACK_IMPORTED_MODULE_1__["bytesToString"])(data.subarray(0, 30));
    const cachedHeader = headerCache.getHeader(key);
    if (cachedHeader) return new VorbisHeader(cachedHeader);

    const header = { length: 30 };

    // Bytes (1-7 of 30): /01vorbis - Magic Signature
    if (key.substr(0, 7) !== "\x01vorbis") {
      return null;
    }

    header.data = Uint8Array.from(data.subarray(0, 30));
    const view = new DataView(header.data.buffer);

    // Byte (8-11 of 30)
    // * `CCCCCCCC|CCCCCCCC|CCCCCCCC|CCCCCCCC`: Version number
    header.version = view.getUint32(7, true);
    if (header.version !== 0) return null;

    // Byte (12 of 30)
    // * `DDDDDDDD`: Channel Count
    header.channels = data[11];
    header.channelMode =
      _constants_js__WEBPACK_IMPORTED_MODULE_0__["vorbisOpusChannelMapping"][header.channels - 1] || "application defined";

    // Byte (13-16 of 30)
    // * `EEEEEEEE|EEEEEEEE|EEEEEEEE|EEEEEEEE`: Sample Rate
    header.sampleRate = view.getUint32(12, true);

    // Byte (17-20 of 30)
    // * `FFFFFFFF|FFFFFFFF|FFFFFFFF|FFFFFFFF`: Bitrate Maximum
    header.bitrateMaximum = view.getInt32(16, true);

    // Byte (21-24 of 30)
    // * `GGGGGGGG|GGGGGGGG|GGGGGGGG|GGGGGGGG`: Bitrate Nominal
    header.bitrateNominal = view.getInt32(20, true);

    // Byte (25-28 of 30)
    // * `HHHHHHHH|HHHHHHHH|HHHHHHHH|HHHHHHHH`: Bitrate Minimum
    header.bitrateMinimum = view.getInt32(24, true);

    // Byte (29 of 30)
    // * `IIII....` Blocksize 1
    // * `....JJJJ` Blocksize 0
    header.blocksize1 = blockSizes[(data[28] & 0b11110000) >> 4];
    header.blocksize0 = blockSizes[data[28] & 0b00001111];
    if (header.blocksize0 > header.blocksize1) return null;

    // Byte (29 of 30)
    // * `00000001` Framing bit
    if (data[29] !== 0x01) return null;

    header.bitDepth = 32;

    {
      // set header cache
      const { length, data, version, ...codecUpdateFields } = header;
      headerCache.setHeader(key, header, codecUpdateFields);
    }

    return new VorbisHeader(header);
  }

  /**
   * @private
   * Call VorbisHeader.getHeader(Array<Uint8>) to get instance
   */
  constructor(header) {
    super(header);

    this.bitrateMaximum = header.bitrateMaximum;
    this.bitrateMinimum = header.bitrateMinimum;
    this.bitrateNominal = header.bitrateNominal;
    this.blocksize0 = header.blocksize0;
    this.blocksize1 = header.blocksize1;
    this.data = header.data;
    this.vorbisComments = null; // set during ogg parsing
    this.vorbisSetup = null; // set during ogg parsing
  }
}


/***/ }),

/***/ "./node_modules/codec-parser/src/codecs/vorbis/VorbisParser.js":
/*!*********************************************************************!*\
  !*** ./node_modules/codec-parser/src/codecs/vorbis/VorbisParser.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return VorbisParser; });
/* harmony import */ var _globals_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../globals.js */ "./node_modules/codec-parser/src/globals.js");
/* harmony import */ var _utilities_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utilities.js */ "./node_modules/codec-parser/src/utilities.js");
/* harmony import */ var _Parser_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Parser.js */ "./node_modules/codec-parser/src/codecs/Parser.js");
/* harmony import */ var _VorbisFrame_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./VorbisFrame.js */ "./node_modules/codec-parser/src/codecs/vorbis/VorbisFrame.js");
/* harmony import */ var _VorbisHeader_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./VorbisHeader.js */ "./node_modules/codec-parser/src/codecs/vorbis/VorbisHeader.js");
/* Copyright 2020-2021 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/







class VorbisParser extends _Parser_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor(codecParser, headerCache) {
    super(codecParser, headerCache);
    this.Frame = _VorbisFrame_js__WEBPACK_IMPORTED_MODULE_3__["default"];

    this._identificationHeader = null;

    this._mode = {
      count: 0,
    };
    this._prevBlockSize = 0;
    this._currBlockSize = 0;
  }

  get codec() {
    return "vorbis";
  }

  parseOggPage(oggPage) {
    const oggPageSegments = _globals_js__WEBPACK_IMPORTED_MODULE_0__["frameStore"].get(oggPage).segments;

    if (oggPage.pageSequenceNumber === 0) {
      // Identification header

      this._headerCache.enable();
      this._identificationHeader = oggPage.data;
    } else if (oggPage.pageSequenceNumber === 1) {
      // gather WEBM CodecPrivate data
      if (oggPageSegments[1]) {
        this._vorbisComments = oggPageSegments[0];
        this._vorbisSetup = oggPageSegments[1];

        this._mode = this._parseSetupHeader(oggPageSegments[1]);
      }
    } else {
      oggPage.codecFrames = oggPageSegments.map((segment) => {
        const header = _VorbisHeader_js__WEBPACK_IMPORTED_MODULE_4__["default"].getHeaderFromUint8Array(
          this._identificationHeader,
          this._headerCache
        );

        if (header) {
          header.vorbisComments = this._vorbisComments;
          header.vorbisSetup = this._vorbisSetup;

          return new _VorbisFrame_js__WEBPACK_IMPORTED_MODULE_3__["default"](
            segment,
            header,
            this._getSamples(segment, header)
          );
        }

        this._codecParser.logError(
          "Failed to parse Ogg Vorbis Header",
          "Not a valid Ogg Vorbis file"
        );
      });
    }

    return oggPage;
  }

  _getSamples(segment, header) {
    const byte = segment[0] >> 1;

    const blockFlag = this._mode[byte & this._mode.mask];

    // is this a large window
    if (blockFlag) {
      this._prevBlockSize =
        byte & this._mode.prevMask ? header.blocksize1 : header.blocksize0;
    }

    this._currBlockSize = blockFlag ? header.blocksize1 : header.blocksize0;

    const samples = (this._prevBlockSize + this._currBlockSize) >> 2;
    this._prevBlockSize = this._currBlockSize;

    return samples;
  }

  // https://gitlab.xiph.org/xiph/liboggz/-/blob/master/src/liboggz/oggz_auto.c
  // https://github.com/FFmpeg/FFmpeg/blob/master/libavcodec/vorbis_parser.c
  /*
   * This is the format of the mode data at the end of the packet for all
   * Vorbis Version 1 :
   *
   * [ 6:number_of_modes ]
   * [ 1:size | 16:window_type(0) | 16:transform_type(0) | 8:mapping ]
   * [ 1:size | 16:window_type(0) | 16:transform_type(0) | 8:mapping ]
   * [ 1:size | 16:window_type(0) | 16:transform_type(0) | 8:mapping ]
   * [ 1:framing(1) ]
   *
   * e.g.:
   *
   * MsB         LsB
   *              <-
   * 0 0 0 0 0 1 0 0
   * 0 0 1 0 0 0 0 0
   * 0 0 1 0 0 0 0 0
   * 0 0 1|0 0 0 0 0
   * 0 0 0 0|0|0 0 0
   * 0 0 0 0 0 0 0 0
   * 0 0 0 0|0 0 0 0
   * 0 0 0 0 0 0 0 0
   * 0 0 0 0|0 0 0 0
   * 0 0 0|1|0 0 0 0 |
   * 0 0 0 0 0 0 0 0 V
   * 0 0 0|0 0 0 0 0
   * 0 0 0 0 0 0 0 0
   * 0 0 1|0 0 0 0 0
   *
   * The simplest way to approach this is to start at the end
   * and read backwards to determine the mode configuration.
   *
   * liboggz and ffmpeg both use this method.
   */
  _parseSetupHeader(setup) {
    const bitReader = new _utilities_js__WEBPACK_IMPORTED_MODULE_1__["BitReader"](setup);
    const failedToParseVorbisStream = "Failed to read Vorbis stream";
    const failedToParseVorbisModes = ", failed to parse vorbis modes";

    let mode = {
      count: 0,
    };

    // sync with the framing bit
    while ((bitReader.read(1) & 0x01) !== 1) {}

    let modeBits;
    // search in reverse to parse out the mode entries
    // limit mode count to 63 so previous block flag will be in first packet byte
    while (mode.count < 64 && bitReader.position > 0) {
      const mapping = Object(_utilities_js__WEBPACK_IMPORTED_MODULE_1__["reverse"])(bitReader.read(8));
      if (
        mapping in mode &&
        !(mode.count === 1 && mapping === 0) // allows for the possibility of only one mode
      ) {
        this._codecParser.logError(
          "received duplicate mode mapping" + failedToParseVorbisModes
        );
        throw new Error(failedToParseVorbisStream);
      }

      // 16 bits transform type, 16 bits window type, all values must be zero
      let i = 0;
      while (bitReader.read(8) === 0x00 && i++ < 3) {} // a non-zero value may indicate the end of the mode entries, or invalid data

      if (i === 4) {
        // transform type and window type were all zeros
        modeBits = bitReader.read(7); // modeBits may need to be used in the next iteration if this is the last mode entry
        mode[mapping] = modeBits & 0x01; // read and store mode -> block flag mapping
        bitReader.position += 6; // go back 6 bits so next iteration starts right after the block flag
        mode.count++;
      } else {
        // transform type and window type were not all zeros
        // check for mode count using previous iteration modeBits
        if (((Object(_utilities_js__WEBPACK_IMPORTED_MODULE_1__["reverse"])(modeBits) & 0b01111110) >> 1) + 1 !== mode.count) {
          this._codecParser.logError(
            "mode count did not match actual modes" + failedToParseVorbisModes
          );
          throw new Error(failedToParseVorbisStream);
        }

        break;
      }
    }

    // mode mask to read the mode from the first byte in the vorbis frame
    mode.mask = (1 << Math.log2(mode.count)) - 1;
    // previous window flag is the next bit after the mode mask
    mode.prevMask = (mode.mask | 0x1) + 1;

    return mode;
  }
}


/***/ }),

/***/ "./node_modules/codec-parser/src/constants.js":
/*!****************************************************!*\
  !*** ./node_modules/codec-parser/src/constants.js ***!
  \****************************************************/
/*! exports provided: reserved, bad, free, none, sixteenBitCRC, channelMappings, lfe, monophonic, stereo, getChannelMapping, vorbisOpusChannelMapping, rate192000, rate176400, rate96000, rate88200, rate64000, rate48000, rate44100, rate32000, rate24000, rate22050, rate16000, rate12000, rate11025, rate8000, rate7350 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reserved", function() { return reserved; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bad", function() { return bad; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "free", function() { return free; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "none", function() { return none; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sixteenBitCRC", function() { return sixteenBitCRC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "channelMappings", function() { return channelMappings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lfe", function() { return lfe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "monophonic", function() { return monophonic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stereo", function() { return stereo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getChannelMapping", function() { return getChannelMapping; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "vorbisOpusChannelMapping", function() { return vorbisOpusChannelMapping; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rate192000", function() { return rate192000; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rate176400", function() { return rate176400; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rate96000", function() { return rate96000; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rate88200", function() { return rate88200; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rate64000", function() { return rate64000; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rate48000", function() { return rate48000; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rate44100", function() { return rate44100; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rate32000", function() { return rate32000; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rate24000", function() { return rate24000; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rate22050", function() { return rate22050; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rate16000", function() { return rate16000; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rate12000", function() { return rate12000; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rate11025", function() { return rate11025; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rate8000", function() { return rate8000; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rate7350", function() { return rate7350; });
const reserved = "reserved";
const bad = "bad";
const free = "free";
const none = "none";
const sixteenBitCRC = "16bit CRC";

// channel mappings
const mappingJoin = ", ";

const front = "front";
const side = "side";
const rear = "rear";
const left = "left";
const center = "center";
const right = "right";

// prettier-ignore
/*
[
  [
    "left, right",
    "left, right, center",
    "left, center, right",
    "center, left, right",
    "center"
  ],
  [
    "front left, front right",
    "front left, front right, front center",
    "front left, front center, front right",
    "front center, front left, front right",
    "front center"
  ],
  [
    "side left, side right",
    "side left, side right, side center",
    "side left, side center, side right",
    "side center, side left, side right",
    "side center"
  ],
  [
    "rear left, rear right",
    "rear left, rear right, rear center",
    "rear left, rear center, rear right",
    "rear center, rear left, rear right",
    "rear center"
  ]
]
*/
const channelMappings = 
  [
    "", 
    front + " ",
    side + " ",
    rear + " "
  ].map((x) =>
  [
    [left, right],
    [left, right, center],
    [left, center, right],
    [center, left, right],
    [center],
  ].flatMap((y) => y.map((z) => x + z).join(mappingJoin))
);

const lfe = "LFE";
const monophonic = "monophonic (mono)";
const stereo = "stereo";
const surround = "surround";

const channels = [
  monophonic,
  stereo,
  `linear ${surround}`,
  "quadraphonic",
  `5.0 ${surround}`,
  `5.1 ${surround}`,
  `6.1 ${surround}`,
  `7.1 ${surround}`,
];

const getChannelMapping = (channelCount, ...mappings) =>
  `${channels[channelCount - 1]} (${mappings.join(mappingJoin)})`;

// prettier-ignore
const vorbisOpusChannelMapping = [
  monophonic,
  getChannelMapping(2,channelMappings[0][0]),
  getChannelMapping(3,channelMappings[0][2]),
  getChannelMapping(4,channelMappings[1][0],channelMappings[3][0]),
  getChannelMapping(5,channelMappings[1][2],channelMappings[3][0]),
  getChannelMapping(6,channelMappings[1][2],channelMappings[3][0],lfe),
  getChannelMapping(7,channelMappings[1][2],channelMappings[2][0],channelMappings[3][4],lfe),
  getChannelMapping(8,channelMappings[1][2],channelMappings[2][0],channelMappings[3][0],lfe),
]

// sampleRates
const rate192000 = 192000;
const rate176400 = 176400;
const rate96000 = 96000;
const rate88200 = 88200;
const rate64000 = 64000;
const rate48000 = 48000;
const rate44100 = 44100;
const rate32000 = 32000;
const rate24000 = 24000;
const rate22050 = 22050;
const rate16000 = 16000;
const rate12000 = 12000;
const rate11025 = 11025;
const rate8000 = 8000;
const rate7350 = 7350;


/***/ }),

/***/ "./node_modules/codec-parser/src/containers/Frame.js":
/*!***********************************************************!*\
  !*** ./node_modules/codec-parser/src/containers/Frame.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Frame; });
/* harmony import */ var _globals_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../globals.js */ "./node_modules/codec-parser/src/globals.js");
/* Copyright 2020-2021 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/



/**
 * @abstract
 */
class Frame {
  constructor(header, data) {
    _globals_js__WEBPACK_IMPORTED_MODULE_0__["frameStore"].set(this, { header });

    this.data = data;
  }
}


/***/ }),

/***/ "./node_modules/codec-parser/src/containers/ogg/OggPage.js":
/*!*****************************************************************!*\
  !*** ./node_modules/codec-parser/src/containers/ogg/OggPage.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return OggPage; });
/* harmony import */ var _globals_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../globals.js */ "./node_modules/codec-parser/src/globals.js");
/* harmony import */ var _Frame_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Frame.js */ "./node_modules/codec-parser/src/containers/Frame.js");
/* harmony import */ var _OggPageHeader_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OggPageHeader.js */ "./node_modules/codec-parser/src/containers/ogg/OggPageHeader.js");
/* Copyright 2020-2021 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/





class OggPage extends _Frame_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  static *getFrame(codecParser, headerCache, readOffset) {
    const header = yield* _OggPageHeader_js__WEBPACK_IMPORTED_MODULE_2__["default"].getHeader(
      codecParser,
      headerCache,
      readOffset
    );

    if (header) {
      const frameLength = _globals_js__WEBPACK_IMPORTED_MODULE_0__["headerStore"].get(header).frameLength;
      const headerLength = _globals_js__WEBPACK_IMPORTED_MODULE_0__["headerStore"].get(header).length;
      const totalLength = headerLength + frameLength;

      const rawData = (yield* codecParser.readRawData(totalLength, 0)).subarray(
        0,
        totalLength
      );

      const frame = rawData.subarray(headerLength, totalLength);

      return new OggPage(header, frame, rawData);
    } else {
      return null;
    }
  }

  constructor(header, frame, rawData) {
    super(header, frame);

    _globals_js__WEBPACK_IMPORTED_MODULE_0__["frameStore"].get(this).length = rawData.length;

    this.codecFrames = [];
    this.rawData = rawData;
    this.absoluteGranulePosition = header.absoluteGranulePosition;
    this.crc32 = header.pageChecksum;
    this.duration = 0;
    this.isContinuedPacket = header.isContinuedPacket;
    this.isFirstPage = header.isFirstPage;
    this.isLastPage = header.isLastPage;
    this.pageSequenceNumber = header.pageSequenceNumber;
    this.samples = 0;
    this.streamSerialNumber = header.streamSerialNumber;
  }
}


/***/ }),

/***/ "./node_modules/codec-parser/src/containers/ogg/OggPageHeader.js":
/*!***********************************************************************!*\
  !*** ./node_modules/codec-parser/src/containers/ogg/OggPageHeader.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return OggPageHeader; });
/* harmony import */ var _globals_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../globals.js */ "./node_modules/codec-parser/src/globals.js");
/* Copyright 2020-2021 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/

/*
https://xiph.org/ogg/doc/framing.html

AAAAAAAA AAAAAAAA AAAAAAAA AAAAAAAA BBBBBBBB 00000CDE

(LSB)                                                             (MSB)
FFFFFFFF FFFFFFFF FFFFFFFF FFFFFFFF FFFFFFFF FFFFFFFF FFFFFFFF FFFFFFFF
GGGGGGGG GGGGGGGG GGGGGGGG GGGGGGGG
HHHHHHHH HHHHHHHH HHHHHHHH HHHHHHHH
IIIIIIII IIIIIIII IIIIIIII IIIIIIII

JJJJJJJJ
LLLLLLLL...

Ogg Page Header
Letter  Length (bits)  Description
A   32  0x4f676753, "OggS"
B   8   stream_structure_version
C   1   (0 no, 1 yes) last page of logical bitstream (eos)
D   1   (0 no, 1 yes) first page of logical bitstream (bos)
E   1   (0 no, 1 yes) continued packet

F   64  absolute granule position
G   32  stream serial number
H   32  page sequence no
I   32  page checksum
J   8   Number of page segments in the segment table
L   n   Segment table (n=page_segments+26).
        Segment table values sum to the total length of the packet.
        Last value is always < 0xFF. Last lacing value will be 0x00 if evenly divisible by 0xFF.
        
*/



class OggPageHeader {
  static *getHeader(codecParser, headerCache, readOffset) {
    const header = {};

    // Must be at least 28 bytes.
    let data = yield* codecParser.readRawData(28, readOffset);

    // Bytes (1-4 of 28)
    // Frame sync (must equal OggS): `AAAAAAAA|AAAAAAAA|AAAAAAAA|AAAAAAAA`:
    if (
      data[0] !== 0x4f || // O
      data[1] !== 0x67 || // g
      data[2] !== 0x67 || // g
      data[3] !== 0x53 //    S
    ) {
      return null;
    }

    // Byte (5 of 28)
    // * `BBBBBBBB`: stream_structure_version
    header.streamStructureVersion = data[4];

    // Byte (6 of 28)
    // * `00000CDE`
    // * `00000...`: All zeros
    // * `.....C..`: (0 no, 1 yes) last page of logical bitstream (eos)
    // * `......D.`: (0 no, 1 yes) first page of logical bitstream (bos)
    // * `.......E`: (0 no, 1 yes) continued packet
    const zeros = data[5] & 0b11111000;
    if (zeros) return null;

    header.isLastPage = Boolean(data[5] & 0b00000100);
    header.isFirstPage = Boolean(data[5] & 0b00000010);
    header.isContinuedPacket = Boolean(data[5] & 0b00000001);

    const view = new DataView(Uint8Array.from(data.subarray(0, 28)).buffer);

    // Byte (7-14 of 28)
    // * `FFFFFFFF|FFFFFFFF|FFFFFFFF|FFFFFFFF|FFFFFFFF|FFFFFFFF|FFFFFFFF|FFFFFFFF`
    // * Absolute Granule Position

    /**
     * @todo Safari does not support getBigInt64, but it also doesn't support Ogg
     */
    try {
      header.absoluteGranulePosition = view.getBigInt64(6, true);
    } catch {}

    // Byte (15-18 of 28)
    // * `GGGGGGGG|GGGGGGGG|GGGGGGGG|GGGGGGGG`
    // * Stream Serial Number
    header.streamSerialNumber = view.getInt32(14, true);

    // Byte (19-22 of 28)
    // * `HHHHHHHH|HHHHHHHH|HHHHHHHH|HHHHHHHH`
    // * Page Sequence Number
    header.pageSequenceNumber = view.getInt32(18, true);

    // Byte (23-26 of 28)
    // * `IIIIIIII|IIIIIIII|IIIIIIII|IIIIIIII`
    // * Page Checksum
    header.pageChecksum = view.getInt32(22, true);

    // Byte (27 of 28)
    // * `JJJJJJJJ`: Number of page segments in the segment table
    const pageSegmentTableLength = data[26];
    header.length = pageSegmentTableLength + 27;

    data = yield* codecParser.readRawData(header.length, readOffset); // read in the page segment table

    header.frameLength = 0;
    header.pageSegmentTable = [];
    header.pageSegmentBytes = data.subarray(27, header.length);

    for (let i = 0, segmentLength = 0; i < pageSegmentTableLength; i++) {
      const segmentByte = header.pageSegmentBytes[i];

      header.frameLength += segmentByte;
      segmentLength += segmentByte;

      if (segmentByte !== 0xff || i === pageSegmentTableLength - 1) {
        header.pageSegmentTable.push(segmentLength);
        segmentLength = 0;
      }
    }

    return new OggPageHeader(header);
  }

  /**
   * @private
   * Call OggPageHeader.getHeader(Array<Uint8>) to get instance
   */
  constructor(header) {
    _globals_js__WEBPACK_IMPORTED_MODULE_0__["headerStore"].set(this, header);

    this.absoluteGranulePosition = header.absoluteGranulePosition;
    this.isContinuedPacket = header.isContinuedPacket;
    this.isFirstPage = header.isFirstPage;
    this.isLastPage = header.isLastPage;
    this.pageSegmentTable = header.pageSegmentTable;
    this.pageSequenceNumber = header.pageSequenceNumber;
    this.pageChecksum = header.pageChecksum;
    this.streamSerialNumber = header.streamSerialNumber;
  }
}


/***/ }),

/***/ "./node_modules/codec-parser/src/containers/ogg/OggParser.js":
/*!*******************************************************************!*\
  !*** ./node_modules/codec-parser/src/containers/ogg/OggParser.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return OggParser; });
/* harmony import */ var _globals_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../globals.js */ "./node_modules/codec-parser/src/globals.js");
/* harmony import */ var _utilities_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utilities.js */ "./node_modules/codec-parser/src/utilities.js");
/* harmony import */ var _codecs_Parser_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../codecs/Parser.js */ "./node_modules/codec-parser/src/codecs/Parser.js");
/* harmony import */ var _OggPage_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./OggPage.js */ "./node_modules/codec-parser/src/containers/ogg/OggPage.js");
/* harmony import */ var _OggPageHeader_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./OggPageHeader.js */ "./node_modules/codec-parser/src/containers/ogg/OggPageHeader.js");
/* harmony import */ var _codecs_flac_FLACParser_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../codecs/flac/FLACParser.js */ "./node_modules/codec-parser/src/codecs/flac/FLACParser.js");
/* harmony import */ var _codecs_opus_OpusParser_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../codecs/opus/OpusParser.js */ "./node_modules/codec-parser/src/codecs/opus/OpusParser.js");
/* harmony import */ var _codecs_vorbis_VorbisParser_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../codecs/vorbis/VorbisParser.js */ "./node_modules/codec-parser/src/codecs/vorbis/VorbisParser.js");
/* Copyright 2020-2021 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/












class OggParser extends _codecs_Parser_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor(codecParser, headerCache, onCodec) {
    super(codecParser, headerCache);

    this._onCodec = onCodec;
    this.Frame = _OggPage_js__WEBPACK_IMPORTED_MODULE_3__["default"];
    this.Header = _OggPageHeader_js__WEBPACK_IMPORTED_MODULE_4__["default"];
    this._codec = null;
    this._continuedPacket = new Uint8Array();

    this._pageSequenceNumber = 0;
  }

  get codec() {
    return this._codec || "";
  }

  _updateCodec(codec, Parser) {
    if (this._codec !== codec) {
      this._parser = new Parser(this._codecParser, this._headerCache);
      this._codec = codec;
      this._onCodec(codec);
    }
  }

  _checkForIdentifier({ data }) {
    const idString = Object(_utilities_js__WEBPACK_IMPORTED_MODULE_1__["bytesToString"])(data.subarray(0, 8));

    switch (idString) {
      case "fishead\0":
      case "fisbone\0":
      case "index\0\0\0":
        return false; // ignore ogg skeleton packets
      case "OpusHead":
        this._updateCodec("opus", _codecs_opus_OpusParser_js__WEBPACK_IMPORTED_MODULE_6__["default"]);
        return true;
      case /^\x7fFLAC/.test(idString) && idString:
        this._updateCodec("flac", _codecs_flac_FLACParser_js__WEBPACK_IMPORTED_MODULE_5__["default"]);
        return true;
      case /^\x01vorbis/.test(idString) && idString:
        this._updateCodec("vorbis", _codecs_vorbis_VorbisParser_js__WEBPACK_IMPORTED_MODULE_7__["default"]);
        return true;
    }
  }

  _checkPageSequenceNumber(oggPage) {
    if (
      oggPage.pageSequenceNumber !== this._pageSequenceNumber + 1 &&
      this._pageSequenceNumber > 1 &&
      oggPage.pageSequenceNumber > 1
    ) {
      this._codecParser.logWarning(
        "Unexpected gap in Ogg Page Sequence Number.",
        `Expected: ${this._pageSequenceNumber + 1}, Got: ${
          oggPage.pageSequenceNumber
        }`
      );
    }

    this._pageSequenceNumber = oggPage.pageSequenceNumber;
  }

  *parseFrame() {
    const oggPage = yield* this.fixedLengthFrameSync(true);

    this._checkPageSequenceNumber(oggPage);

    const oggPageStore = _globals_js__WEBPACK_IMPORTED_MODULE_0__["frameStore"].get(oggPage);
    const { pageSegmentBytes, pageSegmentTable } = _globals_js__WEBPACK_IMPORTED_MODULE_0__["headerStore"].get(
      oggPageStore.header
    );

    let offset = 0;

    oggPageStore.segments = pageSegmentTable.map((segmentLength) =>
      oggPage.data.subarray(offset, (offset += segmentLength))
    );

    if (pageSegmentBytes[pageSegmentBytes.length - 1] === 0xff) {
      // continued packet
      this._continuedPacket = Object(_utilities_js__WEBPACK_IMPORTED_MODULE_1__["concatBuffers"])(
        this._continuedPacket,
        oggPageStore.segments.pop()
      );
    } else if (this._continuedPacket.length) {
      oggPageStore.segments[0] = Object(_utilities_js__WEBPACK_IMPORTED_MODULE_1__["concatBuffers"])(
        this._continuedPacket,
        oggPageStore.segments[0]
      );

      this._continuedPacket = new Uint8Array();
    }

    if (this._codec || this._checkForIdentifier(oggPage)) {
      const frame = this._parser.parseOggPage(oggPage);
      this._codecParser.mapFrameStats(frame);
      return frame;
    }
  }
}


/***/ }),

/***/ "./node_modules/codec-parser/src/globals.js":
/*!**************************************************!*\
  !*** ./node_modules/codec-parser/src/globals.js ***!
  \**************************************************/
/*! exports provided: headerStore, frameStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "headerStore", function() { return headerStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "frameStore", function() { return frameStore; });
const headerStore = new WeakMap();
const frameStore = new WeakMap();


/***/ }),

/***/ "./node_modules/codec-parser/src/metadata/ID3v2.js":
/*!*********************************************************!*\
  !*** ./node_modules/codec-parser/src/metadata/ID3v2.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ID3v2; });
/* Copyright 2020-2021 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/

// https://id3.org/Developer%20Information

class ID3v2 {
  static *getID3v2Header(codecParser, headerCache, readOffset) {
    const header = { headerLength: 10 };

    let data = yield* codecParser.readRawData(3, readOffset);
    // Byte (0-2 of 9)
    // ID3
    if (data[0] !== 0x49 || data[1] !== 0x44 || data[2] !== 0x33) return null;

    data = yield* codecParser.readRawData(header.headerLength, readOffset);

    // Byte (3-4 of 9)
    // * `BBBBBBBB|........`: Major version
    // * `........|BBBBBBBB`: Minor version
    header.version = `id3v2.${data[3]}.${data[4]}`;

    // Byte (5 of 9)
    // * `....0000.: Zeros (flags not implemented yet)
    if (data[5] & 0b00001111) return null;

    // Byte (5 of 9)
    // * `CDEF0000`: Flags
    // * `C.......`: Unsynchronisation (indicates whether or not unsynchronisation is used)
    // * `.D......`: Extended header (indicates whether or not the header is followed by an extended header)
    // * `..E.....`: Experimental indicator (indicates whether or not the tag is in an experimental stage)
    // * `...F....`: Footer present (indicates that a footer is present at the very end of the tag)
    header.unsynchronizationFlag = Boolean(data[5] & 0b10000000);
    header.extendedHeaderFlag = Boolean(data[5] & 0b01000000);
    header.experimentalFlag = Boolean(data[5] & 0b00100000);
    header.footerPresent = Boolean(data[5] & 0b00010000);

    // Byte (6-9 of 9)
    // * `0.......|0.......|0.......|0.......`: Zeros
    if (
      data[6] & 0b10000000 ||
      data[7] & 0b10000000 ||
      data[8] & 0b10000000 ||
      data[9] & 0b10000000
    )
      return null;

    // Byte (6-9 of 9)
    // * `.FFFFFFF|.FFFFFFF|.FFFFFFF|.FFFFFFF`: Tag Length
    // The ID3v2 tag size is encoded with four bytes where the most significant bit (bit 7)
    // is set to zero in every byte, making a total of 28 bits. The zeroed bits are ignored,
    // so a 257 bytes long tag is represented as $00 00 02 01.
    header.dataLength =
      (data[6] << 21) | (data[7] << 14) | (data[8] << 7) | data[9];

    header.length = header.headerLength + header.dataLength;

    return new ID3v2(header);
  }

  constructor(header) {
    this.version = header.version;
    this.unsynchronizationFlag = header.unsynchronizationFlag;
    this.extendedHeaderFlag = header.extendedHeaderFlag;
    this.experimentalFlag = header.experimentalFlag;
    this.footerPresent = header.footerPresent;
    this.length = header.length;
  }
}


/***/ }),

/***/ "./node_modules/codec-parser/src/utilities.js":
/*!****************************************************!*\
  !*** ./node_modules/codec-parser/src/utilities.js ***!
  \****************************************************/
/*! exports provided: crc8, flacCrc16, crc32, reverse, concatBuffers, bytesToString, BitReader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "crc8", function() { return crc8; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flacCrc16", function() { return flacCrc16; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "crc32", function() { return crc32; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reverse", function() { return reverse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "concatBuffers", function() { return concatBuffers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bytesToString", function() { return bytesToString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BitReader", function() { return BitReader; });
/* Copyright 2020-2021 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/

const getCrcTable = (crcTable, crcInitialValueFunction, crcFunction) => {
  for (let byte = 0; byte < crcTable.length; byte++) {
    let crc = crcInitialValueFunction(byte);

    for (let bit = 8; bit > 0; bit--) crc = crcFunction(crc);

    crcTable[byte] = crc;
  }
  return crcTable;
};

const crc8Table = getCrcTable(
  new Uint8Array(256),
  (b) => b,
  (crc) => (crc & 0x80 ? 0x07 ^ (crc << 1) : crc << 1)
);

const flacCrc16Table = [
  getCrcTable(
    new Uint16Array(256),
    (b) => b << 8,
    (crc) => (crc << 1) ^ (crc & (1 << 15) ? 0x8005 : 0)
  ),
];

const crc32Table = [
  getCrcTable(
    new Uint32Array(256),
    (b) => b,
    (crc) => (crc >>> 1) ^ ((crc & 1) * 0xedb88320)
  ),
];

// build crc tables
for (let i = 0; i < 15; i++) {
  flacCrc16Table.push(new Uint16Array(256));
  crc32Table.push(new Uint32Array(256));

  for (let j = 0; j <= 0xff; j++) {
    flacCrc16Table[i + 1][j] =
      flacCrc16Table[0][flacCrc16Table[i][j] >>> 8] ^
      (flacCrc16Table[i][j] << 8);

    crc32Table[i + 1][j] =
      (crc32Table[i][j] >>> 8) ^ crc32Table[0][crc32Table[i][j] & 0xff];
  }
}

const crc8 = (data) => {
  let crc = 0;
  const dataLength = data.length;

  for (let i = 0; i !== dataLength; i++) crc = crc8Table[crc ^ data[i]];

  return crc;
};

const flacCrc16 = (data) => {
  const dataLength = data.length;
  const crcChunkSize = dataLength - 16;
  let crc = 0;
  let i = 0;

  while (i <= crcChunkSize) {
    crc ^= (data[i++] << 8) | data[i++];
    crc =
      flacCrc16Table[15][crc >> 8] ^
      flacCrc16Table[14][crc & 0xff] ^
      flacCrc16Table[13][data[i++]] ^
      flacCrc16Table[12][data[i++]] ^
      flacCrc16Table[11][data[i++]] ^
      flacCrc16Table[10][data[i++]] ^
      flacCrc16Table[9][data[i++]] ^
      flacCrc16Table[8][data[i++]] ^
      flacCrc16Table[7][data[i++]] ^
      flacCrc16Table[6][data[i++]] ^
      flacCrc16Table[5][data[i++]] ^
      flacCrc16Table[4][data[i++]] ^
      flacCrc16Table[3][data[i++]] ^
      flacCrc16Table[2][data[i++]] ^
      flacCrc16Table[1][data[i++]] ^
      flacCrc16Table[0][data[i++]];
  }

  while (i !== dataLength)
    crc = ((crc & 0xff) << 8) ^ flacCrc16Table[0][(crc >> 8) ^ data[i++]];

  return crc;
};

const crc32 = (data) => {
  const dataLength = data.length;
  const crcChunkSize = dataLength - 16;
  let crc = 0;
  let i = 0;

  while (i <= crcChunkSize)
    crc =
      crc32Table[15][(data[i++] ^ crc) & 0xff] ^
      crc32Table[14][(data[i++] ^ (crc >>> 8)) & 0xff] ^
      crc32Table[13][(data[i++] ^ (crc >>> 16)) & 0xff] ^
      crc32Table[12][data[i++] ^ (crc >>> 24)] ^
      crc32Table[11][data[i++]] ^
      crc32Table[10][data[i++]] ^
      crc32Table[9][data[i++]] ^
      crc32Table[8][data[i++]] ^
      crc32Table[7][data[i++]] ^
      crc32Table[6][data[i++]] ^
      crc32Table[5][data[i++]] ^
      crc32Table[4][data[i++]] ^
      crc32Table[3][data[i++]] ^
      crc32Table[2][data[i++]] ^
      crc32Table[1][data[i++]] ^
      crc32Table[0][data[i++]];

  while (i !== dataLength)
    crc = crc32Table[0][(crc ^ data[i++]) & 0xff] ^ (crc >>> 8);

  return crc ^ -1;
};

const concatBuffers = (...buffers) => {
  const buffer = new Uint8Array(
    buffers.reduce((acc, buf) => acc + buf.length, 0)
  );

  buffers.reduce((offset, buf) => {
    buffer.set(buf, offset);
    return offset + buf.length;
  }, 0);

  return buffer;
};

const bytesToString = (bytes) => String.fromCharCode(...bytes);

// prettier-ignore
const reverseTable = [0x0,0x8,0x4,0xc,0x2,0xa,0x6,0xe,0x1,0x9,0x5,0xd,0x3,0xb,0x7,0xf];
const reverse = (val) =>
  (reverseTable[val & 0b1111] << 4) | reverseTable[val >> 4];

class BitReader {
  constructor(data) {
    this._data = data;
    this._pos = data.length * 8;
  }

  set position(position) {
    this._pos = position;
  }

  get position() {
    return this._pos;
  }

  read(bits) {
    const byte = Math.floor(this._pos / 8);
    const bit = this._pos % 8;
    this._pos -= bits;

    const window =
      (reverse(this._data[byte - 1]) << 8) + reverse(this._data[byte]);

    return (window >> (7 - bit)) & 0xff;
  }
}




/***/ }),

/***/ "./node_modules/icecast-metadata-js/browser.js":
/*!*****************************************************!*\
  !*** ./node_modules/icecast-metadata-js/browser.js ***!
  \*****************************************************/
/*! exports provided: IcecastMetadataQueue, IcecastMetadataReader, IcecastReadableStream */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_IcecastMetadataQueue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/IcecastMetadataQueue */ "./node_modules/icecast-metadata-js/src/IcecastMetadataQueue.js");
/* harmony import */ var _src_IcecastMetadataQueue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_IcecastMetadataQueue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "IcecastMetadataQueue", function() { return _src_IcecastMetadataQueue__WEBPACK_IMPORTED_MODULE_0___default.a; });
/* harmony import */ var _src_IcecastMetadataReader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/IcecastMetadataReader */ "./node_modules/icecast-metadata-js/src/IcecastMetadataReader.js");
/* harmony import */ var _src_IcecastMetadataReader__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_src_IcecastMetadataReader__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "IcecastMetadataReader", function() { return _src_IcecastMetadataReader__WEBPACK_IMPORTED_MODULE_1___default.a; });
/* harmony import */ var _src_IcecastReadableStream__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/IcecastReadableStream */ "./node_modules/icecast-metadata-js/src/IcecastReadableStream.js");
/* harmony import */ var _src_IcecastReadableStream__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_src_IcecastReadableStream__WEBPACK_IMPORTED_MODULE_2__);
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "IcecastReadableStream", function() { return _src_IcecastReadableStream__WEBPACK_IMPORTED_MODULE_2___default.a; });







/***/ }),

/***/ "./node_modules/icecast-metadata-js/src/IcecastMetadataQueue.js":
/*!**********************************************************************!*\
  !*** ./node_modules/icecast-metadata-js/src/IcecastMetadataQueue.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Copyright 2020 Ethan Halsall
    This file is part of icecast-metadata-js.

    icecast-metadata-js free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    icecast-metadata-js distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/

const noOp = () => {};

class IcecastMetadataQueue {
  /**
   * @description Schedules updates up to the millisecond for Icecast Metadata from the response body of an Icecast stream mountpoint
   * @description The accuracy of metadata updates is a direct relationship of the icyMetaInt
   * @param {Object} IcecastMetadataQueue constructor parameter
   * @param {number} [IcecastMetadataQueue.icyBr] Bitrate of audio stream used to increase accuracy when to updating metadata
   * @param {onMetadataUpdate} [IcecastMetadataQueue.onMetadataUpdate] Callback executed when metadata is scheduled to update
   * @param {onMetadataEnqueue} [IcecastMetadataQueue.onMetadataEnqueue] Callback executed when metadata is enqueued
   *
   * @callback onMetadataUpdate
   * @param {Object} metadata Object containing all metadata received.
   * @param {string} [metadata.StreamTitle] Title of the metadata update.
   * @param {string} [metadata.StreamUrl] Url (usually album art) of the metadata update.
   * @param {number} timestampOffset Total time buffered when the metadata was added
   * @param {number} timestamp Current time of the audio player when the metadata was added
   *
   * @callback onMetadataEnqueue
   * @param {Object} metadata Object containing all metadata received.
   * @param {string} [metadata.StreamTitle] Title of the metadata update.
   * @param {string} [metadata.StreamUrl] Url (usually album art) of the metadata update.
   * @param {number} timestampOffset Total time buffered when the metadata was added
   * @param {number} timestamp Current time of the audio player when the metadata was added
   *
   */
  constructor({ icyBr, onMetadataUpdate = noOp, onMetadataEnqueue = noOp }) {
    this._icyBr = icyBr;
    this._onMetadataUpdate = onMetadataUpdate;
    this._onMetadataEnqueue = onMetadataEnqueue;
    this._isInitialMetadata = true;
    this._metadataQueue = [];
  }

  /**
   * @description Returns the metadata queued for updates
   * @type {{metadata: string, time: number}[]} Queued metadata
   */
  get metadataQueue() {
    return this._metadataQueue.map(({ _timeoutId, ...rest }) => rest);
  }

  /**
   *
   * @param {object} metadata Metadata object returned from IcecastMetadataReader
   * @param {number} timestampOffset Total buffered audio in seconds
   * @param {number} [timestamp] Current time in the audio player
   */
  addMetadata({ metadata, stats }, timestampOffset, timestamp = 0) {
    /**
     * Metadata time is derived from the total number of stream bytes read
     * since the latest buffer input. The buffer offset should be the total
     * seconds of audio in the player buffer when the metadata was read.
     */
    this._enqueueMetadata(
      metadata,
      timestampOffset,
      timestamp + this.getTimeByBytes(stats.currentStreamPosition)
    );
  }

  /**
   * @description Calculates audio stream length based on bitrate
   * @param {number} bytesRead Number of bytes
   * @type {number} Seconds
   */
  getTimeByBytes(bytesRead) {
    return this._icyBr ? bytesRead / (this._icyBr * 125) : 0;
  }

  /**
   * @description Clears all metadata updates and empties the queue
   */
  purgeMetadataQueue() {
    this._metadataQueue.forEach((i) => clearTimeout(i._timeoutId));
    this._metadataQueue = [];
  }

  _enqueueMetadata(metadata, timestampOffset, timestamp) {
    const metadataPayload = {
      metadata,
      timestampOffset,
      timestamp,
    };

    this._metadataQueue.push(metadataPayload);
    this._onMetadataEnqueue(metadata, timestampOffset, timestamp);

    if (this._isInitialMetadata) {
      this._dequeueMetadata();
      this._isInitialMetadata = false;
    } else {
      metadataPayload._timeoutId = setTimeout(() => {
        this._dequeueMetadata();
      }, (timestampOffset - timestamp) * 1000); // trigger timeout relative to play position
    }
  }

  _dequeueMetadata() {
    const {
      metadata,
      timestampOffset,
      timestamp,
    } = this._metadataQueue.shift();
    this._onMetadataUpdate(metadata, timestampOffset, timestamp);
  }
}

module.exports = IcecastMetadataQueue;


/***/ }),

/***/ "./node_modules/icecast-metadata-js/src/IcecastMetadataReader.js":
/*!***********************************************************************!*\
  !*** ./node_modules/icecast-metadata-js/src/IcecastMetadataReader.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright 2020 Ethan Halsall
    This file is part of icecast-metadata-js.

    icecast-metadata-js free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    icecast-metadata-js distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/

const MetadataParser = __webpack_require__(/*! ./MetadataParser/MetadataParser */ "./node_modules/icecast-metadata-js/src/MetadataParser/MetadataParser.js");
const IcyMetadataParser = __webpack_require__(/*! ./MetadataParser/IcyMetadataParser */ "./node_modules/icecast-metadata-js/src/MetadataParser/IcyMetadataParser.js");
const OggMetadataParser = __webpack_require__(/*! ./MetadataParser/OggMetadataParser */ "./node_modules/icecast-metadata-js/src/MetadataParser/OggMetadataParser.js");
const DualMetadataParser = __webpack_require__(/*! ./MetadataParser/DualMetadataParser */ "./node_modules/icecast-metadata-js/src/MetadataParser/DualMetadataParser.js");

class IcecastMetadataReader {
  /**
   * @description Splits Icecast raw response into stream bytes and metadata key / value pairs.
   * @param {number} IcecastMetadataReader.icyMetaInt Interval in bytes of metadata updates returned by the Icecast server
   * @param {number} IcecastMetadataReader.icyDetectionTimeout Duration in milliseconds to search for metadata if icyMetaInt isn't passed in
   * @param {Array} IcecastMetadataReader.metadataTypes Types of metadata to capture: "icy" and/or "ogg"
   *
   * @callback onMetadata
   * @param {object} value Object containing Metadata and Statistics
   * @param {object} metadata Object containing the metadata received.
   * @param {string} [metadata.StreamTitle] (ICY) Title of the metadata update.
   * @param {string} [metadata.StreamUrl] (ICY) Url (usually album art) of the metadata update.
   * @param {string} [metadata.TITLE] (OGG) Url Title of the metadata update.
   * @param {object} stats Object containing statistics on how many bytes were read and the current read position.
   *
   * @callback onStream
   * @param {object} value Object containing Stream data and Statistics
   * @param {Uint8Array} stream Object containing the stream buffer.
   * @param {object} stats Object containing statistics on how many bytes were read and the current read position.
   *
   * @callback onMetadataFailed Called when metadata detection has failed and no metadata will be returned
   * @param {string} metadataType Metadata type that failed ("icy" or "ogg")
   *
   * @callback onError Called when an error is encounted
   * @param {string} message Error message
   */
  constructor({ metadataTypes = ["icy"], ...rest } = {}) {
    const hasIcy = metadataTypes.includes("icy");
    const hasOgg = metadataTypes.includes("ogg");

    if (hasIcy && hasOgg) this._metadataParser = new DualMetadataParser(rest);
    else if (hasOgg) this._metadataParser = new OggMetadataParser(rest);
    else if (hasIcy) this._metadataParser = new IcyMetadataParser(rest);
    else this._metadataParser = new MetadataParser(rest);
  }

  /**
   * @description Parses an ICY metadata string into key value pairs.
   * @param {string} metadataString ICY formatted metadata string. (i.e. "StreamTitle='A Title';")
   * @returns {object} Parsed metadata key value pairs. (i.e. {StreamTitle: "A Title"})
   */
  static parseIcyMetadata(string) {
    return IcyMetadataParser.parseIcyMetadata(string);
  }

  /**
   * @description Gets the ICY metadata interval for this instance.
   * @returns {number} ICY metadata interval in bytes.
   */
  get icyMetaInt() {
    return this._metadataParser.icyMetaInt;
  }

  /**
   * @description Returns an iterator that yields stream or metadata.
   * @param {Uint8Array} chunk Next chunk of data to read
   * @returns {Iterator} Iterator that operates over a raw icecast response.
   * @yields {object} Object containing stream or metadata.
   */
  *iterator(chunk) {
    yield* this._metadataParser.iterator(chunk);
  }

  /**
   * @description Reads all data in the passed in chunk and calls the onStream and onMetadata callbacks.
   * @param {Uint8Array} chunk Next chunk of data to read
   */
  readAll(chunk) {
    this._metadataParser.readAll(chunk);
  }

  /**
   * @description Returns an async iterator that yields stream or metadata and awaits the onStream and onMetadata callbacks.
   * @param {Uint8Array} chunk Next chunk of data to read
   * @returns {IterableIterator} Iterator that operates over a raw icecast response.
   * @yields {object} Object containing stream or metadata.
   */
  async *asyncIterator(chunk) {
    return yield* this._metadataParser.asyncIterator(chunk);
  }

  /**
   * @description Reads all data in the chunk and awaits the onStream and onMetadata callbacks.
   * @param {Uint8Array} chunk Next chunk of data to read
   */
  async asyncReadAll(chunk) {
    return this._metadataParser.asyncReadAll(chunk);
  }
}

module.exports = IcecastMetadataReader;


/***/ }),

/***/ "./node_modules/icecast-metadata-js/src/IcecastReadableStream.js":
/*!***********************************************************************!*\
  !*** ./node_modules/icecast-metadata-js/src/IcecastReadableStream.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright 2020 Ethan Halsall
    This file is part of icecast-metadata-js.

    icecast-metadata-js free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    icecast-metadata-js distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/

const IcecastMetadataReader = __webpack_require__(/*! ./IcecastMetadataReader */ "./node_modules/icecast-metadata-js/src/IcecastMetadataReader.js");

const noOp = () => {};

/**
 * @description Browser ReadableStream wrapper for IcecastMetadataReader
 */
class IcecastReadableStream {
  /**
   * @param {ReadableStream} response ReadableStream for raw Icecast response data
   * @param {object} options Configuration options for IcecastMetadataReader
   * @see IcecastMetadataReader for information on the options parameter
   */
  constructor(response, { icyMetaInt, onStream = noOp, ...rest }) {
    let icecast;

    this._readableStream = new ReadableStream({
      async start(controller) {
        icecast = new IcecastMetadataReader({
          ...rest,
          icyMetaInt:
            parseInt(response.headers.get("Icy-MetaInt")) || icyMetaInt,
          onStream: async (value) => {
            controller.enqueue(value.stream);
            return onStream(value);
          },
        });

        for await (const chunk of IcecastReadableStream.asyncIterator(
          response.body
        )) {
          await icecast.asyncReadAll(chunk);
        }

        controller.close();
      },
    });

    this._icecast = icecast;
  }

  /**
   * @returns Icecast Metadata Interval if it is present on this stream
   */
  get icyMetaInt() {
    return this._icecast.icyMetaInt;
  }

  /**
   * @returns The ReadableStream instance
   */
  get readableStream() {
    return this._readableStream;
  }

  /**
   * @description Starts reading from the response and processing stream and metadata.
   */
  async startReading() {
    try {
      for await (const i of IcecastReadableStream.asyncIterator(
        this._readableStream
      )) {
      }
    } catch (e) {
      if (e.name !== "AbortError") throw e;
    }
  }

  /**
   * @description Wraps a ReadableStream as an Async Iterator.
   * @param {ReadableStream} readableStream ReadableStream to convert to AsyncIterator
   * @returns {Symbol.asyncIterator} Async Iterator that wraps the ReadableStream
   */
  static asyncIterator(readableStream) {
    const reader = readableStream.getReader();
    return {
      [Symbol.asyncIterator]: () => ({
        next: () => reader.read(),
      }),
    };
  }
}

module.exports = IcecastReadableStream;


/***/ }),

/***/ "./node_modules/icecast-metadata-js/src/MetadataParser/DualMetadataParser.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/icecast-metadata-js/src/MetadataParser/DualMetadataParser.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright 2020 Ethan Halsall
    This file is part of icecast-metadata-js.

    icecast-metadata-js free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    icecast-metadata-js distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/

const IcyMetadataParser = __webpack_require__(/*! ./IcyMetadataParser */ "./node_modules/icecast-metadata-js/src/MetadataParser/IcyMetadataParser.js");
const OggMetadataParser = __webpack_require__(/*! ./OggMetadataParser */ "./node_modules/icecast-metadata-js/src/MetadataParser/OggMetadataParser.js");

/**
 * @description Parses ICY and OGG metadata from an Icecast stream
 * @protected
 * @see IcecastMetadataReader
 */

class DualMetadataParser {
  constructor(params) {
    const { onStream, ...rest } = params;
    this._oggMetadataParser = new OggMetadataParser(params);
    this._icyMetadataParser = new IcyMetadataParser(rest);
  }

  get icyMetaInt() {
    return this._icyMetadataParser.icyMetaInt;
  }

  *iterator(chunk) {
    for (const value of this._icyMetadataParser.iterator(chunk)) {
      if (value.stream) {
        yield* this._oggMetadataParser.iterator(value.stream);
      } else {
        yield value;
      }
    }
  }

  readAll(chunk) {
    for (const value of this._icyMetadataParser.iterator(chunk)) {
      if (value.stream) {
        this._oggMetadataParser.readAll(value.stream);
      }
    }
  }

  async *asyncIterator(chunk) {
    for await (const value of this._icyMetadataParser.asyncIterator(chunk)) {
      if (value.stream) {
        for await (const oggValue of this._oggMetadataParser.asyncIterator(
          value.stream
        )) {
          yield oggValue;
        }
      } else {
        yield value;
      }
    }
  }

  async asyncReadAll(chunk) {
    for await (const value of this._icyMetadataParser.iterator(chunk)) {
      if (value.stream) {
        await this._oggMetadataParser.asyncReadAll(value.stream);
      }
    }
  }
}

module.exports = DualMetadataParser;


/***/ }),

/***/ "./node_modules/icecast-metadata-js/src/MetadataParser/IcyMetadataParser.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/icecast-metadata-js/src/MetadataParser/IcyMetadataParser.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright 2020 Ethan Halsall
    This file is part of icecast-metadata-js.

    icecast-metadata-js free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    icecast-metadata-js distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/

const MetadataParser = __webpack_require__(/*! ./MetadataParser */ "./node_modules/icecast-metadata-js/src/MetadataParser/MetadataParser.js");

/**
 * @description Parses ICY metadata from an Icecast stream
 * @protected
 * @see IcecastMetadataReader
 */

class IcyMetadataParser extends MetadataParser {
  constructor({ icyMetaInt, icyDetectionTimeout = 2000, ...rest }) {
    super(rest);

    this._icyMetaInt = icyMetaInt;
    this._icyDetectionTimeout = icyDetectionTimeout;

    this._generator = this._icyParser();
    this._generator.next();
  }

  *_icyParser() {
    if (yield* this._hasIcyMetadata()) {
      do {
        this._remainingData = this._icyMetaInt;
        yield* this._getStream();
        yield* this._getMetadataLength();
        if (this._remainingData) yield* this._getMetadata();
      } while (true);
    }

    this._remainingData = Infinity;
    yield* this._getStream();
  }

  static parseIcyMetadata(metadataString) {
    /**
     * Metadata is a string of key='value' pairs delimited by a semicolon.
     * The string is a fixed length and any unused bytes at the end are 0x00.
     * i.e. "StreamTitle='The Stream Title';StreamUrl='https://example.com';\0\0\0\0\0\0"
     */

    const metadataRegex = /(?<key>[^\0]+?)='(?<val>[^\0]*?)(;$|';|'$|$)/;
    const metadata = {};

    // [{key: "StreamTitle", val: "The Stream Title"}, {key: "StreamUrl", val: "https://example.com"}]
    for (const metadataElement of metadataString.match(
      new RegExp(metadataRegex, "g")
    ) || []) {
      const match = metadataElement.match(metadataRegex);
      if (match) metadata[match["groups"]["key"]] = match["groups"]["val"];
    }

    // {StreamTitle: "The Stream Title", StreamUrl: "https://example.com"}
    return metadata;
  }

  get icyMetaInt() {
    return this._icyMetaInt;
  }

  *_hasIcyMetadata() {
    if (this._icyMetaInt > 0) return true;
    if (!this._icyDetectionTimeout) return false;

    this._logError(
      "Passed in Icy-MetaInt is invalid. Attempting to detect ICY Metadata.",
      "See https://github.com/eshaz/icecast-metadata-js for information on how to properly request ICY Metadata."
    );

    // prettier-ignore
    const METADATA_SEARCH = [null,83,116,114,101,97,109,84,105,116,108,101,61]; // StreamTitle=
    const startTime = Date.now();
    let metaInt = 0;

    while (startTime + this._icyDetectionTimeout > Date.now()) {
      this._buffer = MetadataParser._concatBuffers(
        this._buffer,
        yield* this._readData()
      );

      // search for metadata
      detectMetadata: while (
        metaInt <
        this._buffer.length - METADATA_SEARCH.length
      ) {
        for (let i = 1; i < METADATA_SEARCH.length; i++) {
          if (this._buffer[i + metaInt] !== METADATA_SEARCH[i]) {
            metaInt++;
            continue detectMetadata;
          }
        }

        // found metadata
        // prettier-ignore
        this._logError(`Found ICY Metadata! Setting Icy-MetaInt to ${metaInt}.`);
        this._icyMetaInt = metaInt;

        return true;
      }
    }

    // prettier-ignore
    this._logError(
      "ICY Metadata not detected, but continuing anyway. Audio errors will occur if there is ICY metadata.",
      `Searched ${this._buffer.length} bytes for ${(Date.now() - startTime) / 1000} seconds.`,
      "Try increasing the `icyDetectionTimeout` value if ICY metadata is present in the stream."
    );
    this._onMetadataFailed("icy");

    return false;
  }

  *_getStream() {
    this._stats.currentStreamBytesRemaining = this._remainingData;

    while (this._remainingData) {
      yield* this._sendStream(yield* super._getNextValue());
    }
  }

  *_getMetadataLength() {
    this._remainingData = 1;

    do {
      this._remainingData = (yield* this._getNextValue())[0] * 16;
    } while (this._remainingData === 1);

    this._stats.addMetadataLengthBytes(1);
  }

  *_getMetadata() {
    this._stats.currentMetadataBytesRemaining = this._remainingData;

    const metadata = yield* this._getNextValue(this._remainingData);
    this._stats.addMetadataBytes(metadata.length);

    yield* this._sendMetadata(
      IcyMetadataParser.parseIcyMetadata(this._decoder.decode(metadata))
    );
  }
}

module.exports = IcyMetadataParser;


/***/ }),

/***/ "./node_modules/icecast-metadata-js/src/MetadataParser/MetadataParser.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/icecast-metadata-js/src/MetadataParser/MetadataParser.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright 2020 Ethan Halsall
    This file is part of icecast-metadata-js.

    icecast-metadata-js free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    icecast-metadata-js distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/

const Decoder = __webpack_require__(/*! util */ "./node_modules/node-libs-browser/node_modules/util/util.js").TextDecoder || TextDecoder;
const Stats = __webpack_require__(/*! ./Stats */ "./node_modules/icecast-metadata-js/src/MetadataParser/Stats.js");

const noOp = () => {};

/**
 * @description Passthrough parser
 * @protected
 * @see IcecastMetadataReader
 */

class MetadataParser {
  constructor(params) {
    this._remainingData = 0;
    this._currentPosition = 0;
    this._buffer = new Uint8Array(0);
    this._stats = new Stats();
    this._decoder = new Decoder("utf-8");

    this._onStream = params.onStream || noOp;
    this._onMetadata = params.onMetadata || noOp;
    this._onMetadataFailed = params.onMetadataFailed || noOp;
    this._onError = params.onError || noOp;
    this._enableLogging = params.enableLogging || false;

    this._onStreamPromise = Promise.resolve();
    this._onMetadataPromise = Promise.resolve();
    this._generator = this._passThroughParser();
    this._generator.next();
  }

  *_passThroughParser() {
    this._remainingData = Infinity;
    while (true) {
      yield* this._sendStream(yield* this._getNextValue());
    }
  }

  static _concatBuffers(buf1, buf2) {
    const result = new Uint8Array(buf1.length + buf2.length);
    result.set(buf1);
    result.set(buf2, buf1.length);
    return result;
  }

  *iterator(chunk) {
    for (
      let i = this._generator.next(chunk);
      i.value;
      i = this._generator.next()
    ) {
      yield i.value;
    }
  }

  readAll(chunk) {
    for (
      let i = this._generator.next(chunk);
      i.value;
      i = this._generator.next()
    ) {}
  }

  async *asyncIterator(chunk) {
    for (
      let i = this._generator.next(chunk);
      i.value;
      i = this._generator.next()
    ) {
      await this._onStreamPromise;
      await this._onMetadataPromise;
      yield i.value;
    }
  }

  async asyncReadAll(chunk) {
    for (
      let i = this._generator.next(chunk);
      i.value;
      i = this._generator.next()
    ) {
      await this._onStreamPromise;
      await this._onMetadataPromise;
    }
  }

  _logError(...messages) {
    if (this._enableLogging) {
      console.warn(
        "icecast-metadata-js",
        messages.reduce((acc, message) => acc + "\n  " + message, "")
      );
    }
    this._onError(...messages);
  }

  *_sendStream(stream) {
    this._stats.addStreamBytes(stream.length);

    const streamPayload = { stream, stats: this._stats.stats };

    this._onStreamPromise = this._onStream(streamPayload);
    yield streamPayload;
  }

  *_sendMetadata(metadata) {
    const metadataPayload = {
      metadata,
      stats: this._stats.stats,
    };

    this._onMetadataPromise = this._onMetadata(metadataPayload);
    yield metadataPayload;
  }

  *_getNextValue(minLength = 0) {
    if (this._currentPosition === this._buffer.length) {
      this._buffer = yield* this._readData();
      this._currentPosition = 0;
    }

    while (this._buffer.length - this._currentPosition < minLength) {
      this._buffer = MetadataParser._concatBuffers(
        this._buffer,
        yield* this._readData()
      );
    }

    const value = this._buffer.subarray(
      this._currentPosition,
      (minLength || this._remainingData) + this._currentPosition
    );

    this._stats.addBytes(value.length);
    this._remainingData =
      value.length < this._remainingData
        ? this._remainingData - value.length
        : 0;

    this._currentPosition += value.length;

    return value;
  }

  *_readData() {
    let data;

    do {
      data = yield; // if out of data, accept new data in the .next() call
    } while (!data || data.length === 0);

    this._stats.addCurrentBytesRemaining(data.length);
    return data;
  }
}

module.exports = MetadataParser;


/***/ }),

/***/ "./node_modules/icecast-metadata-js/src/MetadataParser/OggMetadataParser.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/icecast-metadata-js/src/MetadataParser/OggMetadataParser.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright 2020 Ethan Halsall
    This file is part of icecast-metadata-js.

    icecast-metadata-js free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    icecast-metadata-js distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/

const MetadataParser = __webpack_require__(/*! ./MetadataParser */ "./node_modules/icecast-metadata-js/src/MetadataParser/MetadataParser.js");

/**
 * @description Parses OGG metadata from an Icecast stream
 * @protected
 * @see IcecastMetadataReader
 */
class OggMetadataParser extends MetadataParser {
  constructor(params) {
    super(params);

    this._generator = this._oggParser();
    this._generator.next();
  }

  *_oggParser() {
    if (yield* this._hasOggPage()) {
      const codecMatcher = yield* this._identifyCodec();
      if (codecMatcher) {
        while (yield* this._hasOggPage()) {
          yield* this._getMetadata(codecMatcher);
          yield* this._getStream();
        }
      }
    }

    this._remainingData = Infinity;
    yield* this._getStream();
  }

  _getUint32(data, offset = 0) {
    return new DataView(
      Uint8Array.from([...data.subarray(offset, offset + 4)]).buffer
    ).getUint32(0, true);
  }

  _matchBytes(matchString, bytes) {
    return String.fromCharCode(...bytes).match(matchString);
  }

  *_hasOggPage() {
    // Bytes (1-4 of 28)
    // Frame sync (must equal OggS): `AAAAAAAA|AAAAAAAA|AAAAAAAA|AAAAAAAA`:
    // Byte (6 of 28)
    // * `00000...`: All zeros
    let syncBytes = [];
    while (syncBytes.length <= 65307) {
      // max ogg page size
      const bytes = yield* super._getNextValue(5); // Sync with OGG page without sending stream data
      if (
        bytes[0] === 0x4f &&
        bytes[1] === 0x67 &&
        bytes[2] === 0x67 &&
        bytes[3] === 0x53 &&
        !(bytes[5] & 0b11111000)
      ) {
        this._currentPosition -= 5;
        this._remainingData += 5;
        this._stats._totalBytesRead -= 5;
        this._stats._currentBytesRemaining += 5;
        break;
      }
      syncBytes.push(bytes[0]);

      this._currentPosition -= 4;
      this._stats._totalBytesRead -= 4;
      this._stats._currentBytesRemaining += 4;
    }

    if (syncBytes.length) yield* this._sendStream(Uint8Array.from(syncBytes));

    if (syncBytes.length > 65307) {
      this._logError(
        "This stream is not an OGG stream. No OGG metadata will be returned.",
        "See https://github.com/eshaz/icecast-metadata-js for information on OGG metadata."
      );
      this._onMetadataFailed("ogg");
      return false;
    }

    const baseOggPage = yield* this._getNextValue(27);
    // Byte (27 of 28)
    // * `JJJJJJJJ`: Number of page segments in the segment table
    const oggPageSegments = yield* this._getNextValue(baseOggPage[26]);

    this._remainingData = oggPageSegments.reduce(
      (acc, octet) => acc + octet,
      0
    );
    return true;
  }

  *_identifyCodec() {
    const data = yield* this._getNextValue(8);

    yield* this._getStream();

    if (this._matchBytes(/\x7fFLAC/, data.subarray(0, 5))) {
      return { regex: /^[\x84|\x04]/, length: 4 };
    } else if (this._matchBytes(/OpusHead/, data.subarray(0, 8))) {
      return { regex: /OpusTags/, length: 8 };
    } else if (this._matchBytes(/\x01vorbis/, data.subarray(0, 7))) {
      return { regex: /\x03vorbis/, length: 7 };
    }
  }

  *_getMetadata({ regex, length }) {
    if (this._matchBytes(regex, yield* this._getNextValue(length))) {
      yield* this._sendMetadata(yield* this._readVorbisComment());
    }
  }

  *_getStream() {
    while (this._remainingData) {
      yield* this._getNextValue();
    }
  }

  *_getNextValue(length) {
    const value = yield* super._getNextValue(length);

    yield* this._sendStream(value);
    return value;
  }

  *_readData() {
    const data = yield* super._readData();
    this._stats.currentStreamBytesRemaining = data.length;
    return data;
  }

  *_readVorbisComment() {
    /*
    1) [vendor_length] = read an unsigned integer of 32 bits
    2) [vendor_string] = read a UTF-8 vector as [vendor_length] octets
    3) [user_comment_list_length] = read an unsigned integer of 32 bits
    4) iterate [user_comment_list_length] times {
       5) [length] = read an unsigned integer of 32 bits
       6) this iteration's user comment = read a UTF-8 vector as [length] octets
    }
    7) [framing_bit] = read a single bit as boolean
    8) if ( [framing_bit] unset or end of packet ) then ERROR
    9) done.
    */
    const vendorStringLength = this._getUint32(yield* this._getNextValue(4));
    this._stats.addMetadataBytes(4);

    const vendorString = this._decoder.decode(
      yield* this._getNextValue(vendorStringLength)
    );
    this._stats.addMetadataBytes(vendorStringLength);

    const commentListLength = this._getUint32(yield* this._getNextValue(4));
    this._stats.addMetadataBytes(4);

    const comments = [];
    for (let i = 0; i < commentListLength; i++) {
      const commentLength = yield* this._getNextValue(4);
      this._stats.addMetadataBytes(4);

      comments.push(yield* this._getNextValue(this._getUint32(commentLength)));
      this._stats.addMetadataBytes(comments[comments.length - 1].length);
    }

    this._stats.currentMetadataBytesRemaining = 0;

    return comments.reduce(
      (metadata, comment) => {
        const delimiter = comment.indexOf(0x3d);
        // prettier-ignore
        const key = String.fromCharCode(...comment.subarray(0, delimiter)).toUpperCase();
        const val = this._decoder.decode(comment.subarray(delimiter + 1));

        metadata[key] = metadata[key] ? `${metadata[key]}; ${val}` : val;
        return metadata;
      },
      { VENDOR_STRING: vendorString }
    );
  }
}

module.exports = OggMetadataParser;


/***/ }),

/***/ "./node_modules/icecast-metadata-js/src/MetadataParser/Stats.js":
/*!**********************************************************************!*\
  !*** ./node_modules/icecast-metadata-js/src/MetadataParser/Stats.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Copyright 2020 Ethan Halsall
    This file is part of icecast-metadata-js.

    icecast-metadata-js free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    icecast-metadata-js distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/

class Stats {
  constructor() {
    this._totalBytesRead = 0;
    this._streamBytesRead = 0;
    this._metadataLengthBytesRead = 0;
    this._metadataBytesRead = 0;

    this._currentBytesRemaining = 0;
    this._currentStreamBytesRemaining = 0;
    this._currentMetadataBytesRemaining = 0;
  }

  get stats() {
    return {
      totalBytesRead: this._totalBytesRead,
      streamBytesRead: this._streamBytesRead,
      metadataLengthBytesRead: this._metadataLengthBytesRead,
      metadataBytesRead: this._metadataBytesRead,
      currentBytesRemaining: this._currentBytesRemaining,
      currentStreamBytesRemaining: this._currentStreamBytesRemaining,
      currentMetadataBytesRemaining: this._currentMetadataBytesRemaining,
    };
  }

  set currentStreamBytesRemaining(bytes) {
    this._currentStreamBytesRemaining += bytes;
  }

  set currentMetadataBytesRemaining(bytes) {
    this._currentMetadataBytesRemaining = bytes;
  }

  addBytes(bytes) {
    this._totalBytesRead += bytes;
    this._currentBytesRemaining -= bytes;
  }

  addStreamBytes(bytes) {
    this._streamBytesRead += bytes;
    this._currentStreamBytesRemaining -= bytes;
  }

  addMetadataLengthBytes(bytes) {
    this._metadataLengthBytesRead += bytes;
  }

  addMetadataBytes(bytes) {
    this._metadataBytesRead += bytes;
    this._currentMetadataBytesRemaining -= bytes;
  }

  addCurrentBytesRemaining(bytes) {
    this._currentBytesRemaining += bytes;
  }
}

module.exports = Stats;


/***/ }),

/***/ "./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/browser.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/browser.js ***!
  \******************************************************************************************/
/*! exports provided: IcecastMetadataQueue, IcecastMetadataReader, IcecastReadableStream */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_IcecastMetadataQueue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/IcecastMetadataQueue */ "./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/src/IcecastMetadataQueue.js");
/* harmony import */ var _src_IcecastMetadataQueue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_IcecastMetadataQueue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "IcecastMetadataQueue", function() { return _src_IcecastMetadataQueue__WEBPACK_IMPORTED_MODULE_0___default.a; });
/* harmony import */ var _src_IcecastMetadataReader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/IcecastMetadataReader */ "./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/src/IcecastMetadataReader.js");
/* harmony import */ var _src_IcecastMetadataReader__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_src_IcecastMetadataReader__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "IcecastMetadataReader", function() { return _src_IcecastMetadataReader__WEBPACK_IMPORTED_MODULE_1___default.a; });
/* harmony import */ var _src_IcecastReadableStream__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/IcecastReadableStream */ "./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/src/IcecastReadableStream.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IcecastReadableStream", function() { return _src_IcecastReadableStream__WEBPACK_IMPORTED_MODULE_2__["default"]; });








/***/ }),

/***/ "./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/src/IcecastMetadataQueue.js":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/src/IcecastMetadataQueue.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Copyright 2020-2021 Ethan Halsall
    This file is part of icecast-metadata-js.

    icecast-metadata-js free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    icecast-metadata-js distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/

const noOp = () => {};

class IcecastMetadataQueue {
  /**
   * @description Schedules updates up to the millisecond for Icecast Metadata from the response body of an Icecast stream mountpoint
   * @description The accuracy of metadata updates is a direct relationship of the icyMetaInt
   * @param {Object} IcecastMetadataQueue constructor parameter
   * @param {number} [IcecastMetadataQueue.icyBr] Bitrate of audio stream used to increase accuracy when to updating metadata
   * @param {onMetadataUpdate} [IcecastMetadataQueue.onMetadataUpdate] Callback executed when metadata is scheduled to update
   * @param {onMetadataEnqueue} [IcecastMetadataQueue.onMetadataEnqueue] Callback executed when metadata is enqueued
   *
   * @callback onMetadataUpdate
   * @param {Object} metadata Object containing all metadata received.
   * @param {string} [metadata.StreamTitle] Title of the metadata update.
   * @param {string} [metadata.StreamUrl] Url (usually album art) of the metadata update.
   * @param {number} timestampOffset Total time buffered when the metadata was added
   * @param {number} timestamp Current time of the audio player when the metadata was added
   *
   * @callback onMetadataEnqueue
   * @param {Object} metadata Object containing all metadata received.
   * @param {string} [metadata.StreamTitle] Title of the metadata update.
   * @param {string} [metadata.StreamUrl] Url (usually album art) of the metadata update.
   * @param {number} timestampOffset Total time buffered when the metadata was added
   * @param {number} timestamp Current time of the audio player when the metadata was added
   *
   */
  constructor({ icyBr, onMetadataUpdate = noOp, onMetadataEnqueue = noOp }) {
    this._icyBr = icyBr;
    this._onMetadataUpdate = onMetadataUpdate;
    this._onMetadataEnqueue = onMetadataEnqueue;
    this._isInitialMetadata = true;
    this._metadataQueue = [];
  }

  /**
   * @description Returns the metadata queued for updates
   * @type {{metadata: string, time: number}[]} Queued metadata
   */
  get metadataQueue() {
    return this._metadataQueue.map(({ _timeoutId, ...rest }) => rest);
  }

  /**
   *
   * @param {object} metadata Metadata object returned from IcecastMetadataReader
   * @param {number} timestampOffset Total buffered audio in seconds
   * @param {number} [timestamp] Current time in the audio player
   */
  addMetadata({ metadata, stats }, timestampOffset, timestamp = 0) {
    /**
     * Metadata time is derived from the total number of stream bytes read
     * since the latest buffer input. The buffer offset should be the total
     * seconds of audio in the player buffer when the metadata was read.
     */
    this._enqueueMetadata(
      metadata,
      timestampOffset,
      timestamp + this.getTimeByBytes(stats.currentStreamPosition)
    );
  }

  /**
   * @description Calculates audio stream length based on bitrate
   * @param {number} bytesRead Number of bytes
   * @type {number} Seconds
   */
  getTimeByBytes(bytesRead) {
    return this._icyBr ? bytesRead / (this._icyBr * 125) : 0;
  }

  /**
   * @description Clears all metadata updates and empties the queue
   */
  purgeMetadataQueue() {
    this._metadataQueue.forEach((i) => clearTimeout(i._timeoutId));
    this._metadataQueue = [];
  }

  _enqueueMetadata(metadata, timestampOffset, timestamp) {
    const metadataPayload = {
      metadata,
      timestampOffset,
      timestamp,
    };

    this._metadataQueue.push(metadataPayload);
    this._onMetadataEnqueue(metadata, timestampOffset, timestamp);

    if (this._isInitialMetadata) {
      this._dequeueMetadata();
      this._isInitialMetadata = false;
    } else {
      metadataPayload._timeoutId = setTimeout(() => {
        this._dequeueMetadata();
      }, (timestampOffset - timestamp) * 1000); // trigger timeout relative to play position
    }
  }

  _dequeueMetadata() {
    const { metadata, timestampOffset, timestamp } =
      this._metadataQueue.shift();
    this._onMetadataUpdate(metadata, timestampOffset, timestamp);
  }
}

module.exports = IcecastMetadataQueue;


/***/ }),

/***/ "./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/src/IcecastMetadataReader.js":
/*!************************************************************************************************************!*\
  !*** ./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/src/IcecastMetadataReader.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright 2020-2021 Ethan Halsall
    This file is part of icecast-metadata-js.

    icecast-metadata-js free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    icecast-metadata-js distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/

const MetadataParser = __webpack_require__(/*! ./MetadataParser/MetadataParser */ "./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/src/MetadataParser/MetadataParser.js");
const IcyMetadataParser = __webpack_require__(/*! ./MetadataParser/IcyMetadataParser */ "./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/src/MetadataParser/IcyMetadataParser.js");
const OggMetadataParser = __webpack_require__(/*! ./MetadataParser/OggMetadataParser */ "./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/src/MetadataParser/OggMetadataParser.js");
const DualMetadataParser = __webpack_require__(/*! ./MetadataParser/DualMetadataParser */ "./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/src/MetadataParser/DualMetadataParser.js");

class IcecastMetadataReader {
  /**
   * @description Splits Icecast raw response into stream bytes and metadata key / value pairs.
   * @param {number} IcecastMetadataReader.icyMetaInt Interval in bytes of metadata updates returned by the Icecast server
   * @param {number} IcecastMetadataReader.icyCharacterEncoding Character encoding to use for ICY metadata (defaults to "utf-8")
   * @param {number} IcecastMetadataReader.icyDetectionTimeout Duration in milliseconds to search for metadata if icyMetaInt isn't passed in
   * @param {Array} IcecastMetadataReader.metadataTypes Types of metadata to capture: "icy" and/or "ogg"
   *
   * @callback onMetadata
   * @param {object} value Object containing Metadata and Statistics
   * @param {object} metadata Object containing the metadata received.
   * @param {string} [metadata.StreamTitle] (ICY) Title of the metadata update.
   * @param {string} [metadata.StreamUrl] (ICY) Url (usually album art) of the metadata update.
   * @param {string} [metadata.TITLE] (OGG) Url Title of the metadata update.
   * @param {object} stats Object containing statistics on how many bytes were read and the current read position.
   *
   * @callback onStream
   * @param {object} value Object containing Stream data and Statistics
   * @param {Uint8Array} stream Object containing the stream buffer.
   * @param {object} stats Object containing statistics on how many bytes were read and the current read position.
   *
   * @callback onMetadataFailed Called when metadata detection has failed and no metadata will be returned
   * @param {string} metadataType Metadata type that failed ("icy" or "ogg")
   *
   * @callback onError Called when an error is encountered
   * @param {string} message Error message
   */
  constructor({ metadataTypes = ["icy"], ...rest } = {}) {
    const hasIcy = metadataTypes.includes("icy");
    const hasOgg = metadataTypes.includes("ogg");

    if (hasIcy && hasOgg) this._metadataParser = new DualMetadataParser(rest);
    else if (hasOgg) this._metadataParser = new OggMetadataParser(rest);
    else if (hasIcy) this._metadataParser = new IcyMetadataParser(rest);
    else this._metadataParser = new MetadataParser(rest);
  }

  /**
   * @description Parses an already decoded ICY metadata string into key value pairs.
   * @param {string} metadataString ICY formatted metadata string. (i.e. "StreamTitle='A Title';")
   * @returns {object} Parsed metadata key value pairs. (i.e. {StreamTitle: "A Title"})
   */
  static parseIcyMetadata(string) {
    return IcyMetadataParser.parseIcyMetadata(string);
  }

  /**
   * @description Gets the ICY metadata interval for this instance.
   * @returns {number} ICY metadata interval in bytes.
   */
  get icyMetaInt() {
    return this._metadataParser.icyMetaInt;
  }

  /**
   * @description Returns an iterator that yields stream or metadata.
   * @param {Uint8Array} chunk Next chunk of data to read
   * @returns {Iterator} Iterator that operates over a raw icecast response.
   * @yields {object} Object containing stream or metadata.
   */
  *iterator(chunk) {
    yield* this._metadataParser.iterator(chunk);
  }

  /**
   * @description Reads all data in the passed in chunk and calls the onStream and onMetadata callbacks.
   * @param {Uint8Array} chunk Next chunk of data to read
   */
  readAll(chunk) {
    this._metadataParser.readAll(chunk);
  }

  /**
   * @description Returns an async iterator that yields stream or metadata and awaits the onStream and onMetadata callbacks.
   * @param {Uint8Array} chunk Next chunk of data to read
   * @returns {IterableIterator} Iterator that operates over a raw icecast response.
   * @yields {object} Object containing stream or metadata.
   */
  async *asyncIterator(chunk) {
    return yield* this._metadataParser.asyncIterator(chunk);
  }

  /**
   * @description Reads all data in the chunk and awaits the onStream and onMetadata callbacks.
   * @param {Uint8Array} chunk Next chunk of data to read
   */
  async asyncReadAll(chunk) {
    return this._metadataParser.asyncReadAll(chunk);
  }
}

module.exports = IcecastMetadataReader;


/***/ }),

/***/ "./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/src/IcecastReadableStream.js":
/*!************************************************************************************************************!*\
  !*** ./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/src/IcecastReadableStream.js ***!
  \************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return IcecastReadableStream; });
/* harmony import */ var _IcecastMetadataReader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IcecastMetadataReader */ "./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/src/IcecastMetadataReader.js");
/* harmony import */ var _IcecastMetadataReader__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_IcecastMetadataReader__WEBPACK_IMPORTED_MODULE_0__);
/* Copyright 2020-2021 Ethan Halsall
    This file is part of icecast-metadata-js.

    icecast-metadata-js free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    icecast-metadata-js distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/



const noOp = () => {};

/**
 * @description Browser ReadableStream wrapper for IcecastMetadataReader
 */
class IcecastReadableStream {
  /**
   * @param {ReadableStream} response ReadableStream for raw Icecast response data
   * @param {object} options Configuration options for IcecastMetadataReader
   * @see IcecastMetadataReader for information on the options parameter
   */
  constructor(response, { onStream = noOp, ...rest }) {
    let icecast;

    this._readableStream = new ReadableStream({
      async start(controller) {
        icecast = new _IcecastMetadataReader__WEBPACK_IMPORTED_MODULE_0___default.a({
          icyMetaInt: parseInt(response.headers.get("Icy-MetaInt")),
          ...rest,
          onStream: async (value) => {
            controller.enqueue(value.stream);
            return onStream(value);
          },
        });

        for await (const chunk of IcecastReadableStream.asyncIterator(
          response.body
        )) {
          await icecast.asyncReadAll(chunk);
        }

        controller.close();
      },
    });

    this._icecast = icecast;
  }

  /**
   * @returns Icecast Metadata Interval if it is present on this stream
   */
  get icyMetaInt() {
    return this._icecast.icyMetaInt;
  }

  /**
   * @returns The ReadableStream instance
   */
  get readableStream() {
    return this._readableStream;
  }

  /**
   * @description Starts reading from the response and processing stream and metadata.
   */
  async startReading() {
    try {
      for await (const i of IcecastReadableStream.asyncIterator(
        this._readableStream
      )) {
      }
    } catch (e) {
      if (e.name !== "AbortError") throw e;
    }
  }

  /**
   * @description Wraps a ReadableStream as an Async Iterator.
   * @param {ReadableStream} readableStream ReadableStream to convert to AsyncIterator
   * @returns {Symbol.asyncIterator} Async Iterator that wraps the ReadableStream
   */
  static asyncIterator(readableStream) {
    const reader = readableStream.getReader();
    return {
      [Symbol.asyncIterator]: () => ({
        next: () => reader.read(),
      }),
    };
  }
}


/***/ }),

/***/ "./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/src/MetadataParser/DualMetadataParser.js":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/src/MetadataParser/DualMetadataParser.js ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright 2020-2021 Ethan Halsall
    This file is part of icecast-metadata-js.

    icecast-metadata-js free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    icecast-metadata-js distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/

const IcyMetadataParser = __webpack_require__(/*! ./IcyMetadataParser */ "./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/src/MetadataParser/IcyMetadataParser.js");
const OggMetadataParser = __webpack_require__(/*! ./OggMetadataParser */ "./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/src/MetadataParser/OggMetadataParser.js");

/**
 * @description Parses ICY and OGG metadata from an Icecast stream
 * @protected
 * @see IcecastMetadataReader
 */

class DualMetadataParser {
  constructor(params) {
    const { onStream, ...rest } = params;
    this._oggMetadataParser = new OggMetadataParser(params);
    this._icyMetadataParser = new IcyMetadataParser(rest);
  }

  get icyMetaInt() {
    return this._icyMetadataParser.icyMetaInt;
  }

  *iterator(chunk) {
    for (const value of this._icyMetadataParser.iterator(chunk)) {
      if (value.stream) {
        yield* this._oggMetadataParser.iterator(value.stream);
      } else {
        yield value;
      }
    }
  }

  readAll(chunk) {
    for (const value of this._icyMetadataParser.iterator(chunk)) {
      if (value.stream) {
        this._oggMetadataParser.readAll(value.stream);
      }
    }
  }

  async *asyncIterator(chunk) {
    for await (const value of this._icyMetadataParser.asyncIterator(chunk)) {
      if (value.stream) {
        for await (const oggValue of this._oggMetadataParser.asyncIterator(
          value.stream
        )) {
          yield oggValue;
        }
      } else {
        yield value;
      }
    }
  }

  async asyncReadAll(chunk) {
    for await (const value of this._icyMetadataParser.iterator(chunk)) {
      if (value.stream) {
        await this._oggMetadataParser.asyncReadAll(value.stream);
      }
    }
  }
}

module.exports = DualMetadataParser;


/***/ }),

/***/ "./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/src/MetadataParser/IcyMetadataParser.js":
/*!***********************************************************************************************************************!*\
  !*** ./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/src/MetadataParser/IcyMetadataParser.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright 2020-2021 Ethan Halsall
    This file is part of icecast-metadata-js.

    icecast-metadata-js free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    icecast-metadata-js distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/

const Decoder = globalThis.TextDecoder;
const MetadataParser = __webpack_require__(/*! ./MetadataParser */ "./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/src/MetadataParser/MetadataParser.js");

/**
 * @description Parses ICY metadata from an Icecast stream
 * @protected
 * @see IcecastMetadataReader
 */

class IcyMetadataParser extends MetadataParser {
  constructor({
    icyMetaInt,
    icyDetectionTimeout = 2000,
    icyCharacterEncoding = "utf-8",
    ...rest
  }) {
    super(rest);

    this._decoder = new Decoder(icyCharacterEncoding);
    this._icyMetaInt = icyMetaInt;
    this._icyDetectionTimeout = icyDetectionTimeout;

    this._generator = this._icyParser();
    this._generator.next();
  }

  *_icyParser() {
    if (yield* this._hasIcyMetadata()) {
      do {
        this._remainingData = this._icyMetaInt;
        yield* this._getStream();
        yield* this._getMetadataLength();
        if (this._remainingData) yield* this._getMetadata();
      } while (true);
    }

    this._remainingData = Infinity;
    yield* this._getStream();
  }

  static parseIcyMetadata(metadataString) {
    /**
     * Metadata is a string of key='value' pairs delimited by a semicolon.
     * The string is a fixed length and any unused bytes at the end are 0x00.
     * i.e. "StreamTitle='The Stream Title';StreamUrl='https://example.com';\0\0\0\0\0\0"
     */

    const metadataRegex = /(?<key>[^\0]+?)='(?<val>[^\0]*?)(;$|';|'$|$)/;
    const metadata = {};

    // [{key: "StreamTitle", val: "The Stream Title"}, {key: "StreamUrl", val: "https://example.com"}]
    for (const metadataElement of metadataString.match(
      new RegExp(metadataRegex, "g")
    ) || []) {
      const match = metadataElement.match(metadataRegex);
      if (match) metadata[match["groups"]["key"]] = match["groups"]["val"];
    }

    // {StreamTitle: "The Stream Title", StreamUrl: "https://example.com"}
    return metadata;
  }

  get icyMetaInt() {
    return this._icyMetaInt;
  }

  *_hasIcyMetadata() {
    if (this._icyMetaInt > 0) return true;
    if (!this._icyDetectionTimeout) return false;

    this._logError(
      "Passed in Icy-MetaInt is invalid. Attempting to detect ICY Metadata.",
      "See https://github.com/eshaz/icecast-metadata-js for information on how to properly request ICY Metadata."
    );

    // prettier-ignore
    const METADATA_SEARCH = [null,83,116,114,101,97,109,84,105,116,108,101,61]; // StreamTitle=
    const startTime = Date.now();
    let metaInt = 0;

    while (startTime + this._icyDetectionTimeout > Date.now()) {
      this._buffer = MetadataParser._concatBuffers(
        this._buffer,
        yield* this._readData()
      );

      // search for metadata
      detectMetadata: while (
        metaInt <
        this._buffer.length - METADATA_SEARCH.length
      ) {
        for (let i = 1; i < METADATA_SEARCH.length; i++) {
          if (this._buffer[i + metaInt] !== METADATA_SEARCH[i]) {
            metaInt++;
            continue detectMetadata;
          }
        }

        // found metadata
        // prettier-ignore
        this._logError(`Found ICY Metadata! Setting Icy-MetaInt to ${metaInt}.`);
        this._icyMetaInt = metaInt;

        return true;
      }
    }

    // prettier-ignore
    this._logError(
      "ICY Metadata not detected, but continuing anyway. Audio errors will occur if there is ICY metadata.",
      `Searched ${this._buffer.length} bytes for ${(Date.now() - startTime) / 1000} seconds.`,
      "Try increasing the `icyDetectionTimeout` value if ICY metadata is present in the stream."
    );
    this._onMetadataFailed("icy");

    return false;
  }

  *_getStream() {
    this._stats.currentStreamBytesRemaining = this._remainingData;

    while (this._remainingData) {
      this._addStream(yield* super._getNextValue());
    }
  }

  *_getMetadataLength() {
    this._remainingData = 1;

    do {
      this._remainingData = (yield* this._getNextValue())[0] * 16;
    } while (this._remainingData === 1);

    this._stats.addMetadataLengthBytes(1);
  }

  *_getMetadata() {
    this._stats.currentMetadataBytesRemaining = this._remainingData;

    const metadata = yield* this._getNextValue(this._remainingData);
    this._stats.addMetadataBytes(metadata.length);

    yield* this._sendMetadata(
      IcyMetadataParser.parseIcyMetadata(this._decoder.decode(metadata))
    );
  }
}

module.exports = IcyMetadataParser;


/***/ }),

/***/ "./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/src/MetadataParser/MetadataParser.js":
/*!********************************************************************************************************************!*\
  !*** ./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/src/MetadataParser/MetadataParser.js ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright 2020-2021 Ethan Halsall
    This file is part of icecast-metadata-js.

    icecast-metadata-js free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    icecast-metadata-js distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/

const Stats = __webpack_require__(/*! ./Stats */ "./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/src/MetadataParser/Stats.js");

const noOp = () => {};

/**
 * @description Passthrough parser
 * @protected
 * @see IcecastMetadataReader
 */

class MetadataParser {
  constructor(params) {
    this._remainingData = 0;
    this._currentPosition = 0;
    this._buffer = new Uint8Array(0);
    this._streamBuffer = [];
    this._streamBufferLength = 0;
    this._stats = new Stats();

    this._onStream = params.onStream || noOp;
    this._onMetadata = params.onMetadata || noOp;
    this._onMetadataFailed = params.onMetadataFailed || noOp;
    this._onError = params.onError || noOp;
    this._enableLogging = params.enableLogging || false;

    this._onStreamPromise = Promise.resolve();
    this._onMetadataPromise = Promise.resolve();
    this._generator = this._passThroughParser();
    this._generator.next();
  }

  *_passThroughParser() {
    this._remainingData = Infinity;
    while (true) {
      this._addStream(yield* this._getNextValue());
      yield* this._sendStream();
    }
  }

  static _concatBuffers(...buffers) {
    const length = buffers.reduce((acc, buf) => acc + buf.length, 0);

    return this._concatBuffersKnownLength(buffers, length);
  }

  static _concatBuffersKnownLength(buffers, length) {
    const buffer = new Uint8Array(length);

    buffers.reduce((offset, buf) => {
      buffer.set(buf, offset);
      return offset + buf.length;
    }, 0);

    return buffer;
  }

  *iterator(chunk) {
    for (
      let i = this._generator.next(chunk);
      i.value;
      i = this._generator.next()
    ) {
      yield i.value;
    }
  }

  readAll(chunk) {
    for (
      let i = this._generator.next(chunk);
      i.value;
      i = this._generator.next()
    ) {}
  }

  async *asyncIterator(chunk) {
    for (
      let i = this._generator.next(chunk);
      i.value;
      i = this._generator.next()
    ) {
      await this._onStreamPromise;
      await this._onMetadataPromise;
      yield i.value;
    }
  }

  async asyncReadAll(chunk) {
    for (
      let i = this._generator.next(chunk);
      i.value;
      i = this._generator.next()
    ) {
      await this._onStreamPromise;
      await this._onMetadataPromise;
    }
  }

  _logError(...messages) {
    if (this._enableLogging) {
      console.warn(
        "icecast-metadata-js",
        messages.reduce((acc, message) => acc + "\n  " + message, "")
      );
    }
    this._onError(...messages);
  }

  _addStream(stream) {
    this._streamBuffer.push(stream);
    this._streamBufferLength += stream.length;
  }

  *_sendStream() {
    if (this._streamBuffer.length) {
      const stream = MetadataParser._concatBuffersKnownLength(
        this._streamBuffer,
        this._streamBufferLength
      );
      this._streamBuffer = [];
      this._streamBufferLength = 0;

      this._stats.addStreamBytes(stream.length);

      const streamPayload = { stream, stats: this._stats.stats };

      this._onStreamPromise = this._onStream(streamPayload);
      yield streamPayload;
    }
  }

  *_sendMetadata(metadata) {
    yield* this._sendStream();

    const metadataPayload = {
      metadata,
      stats: this._stats.stats,
    };

    this._onMetadataPromise = this._onMetadata(metadataPayload);
    yield metadataPayload;
  }

  *_getNextValue(minLength = 0) {
    if (this._currentPosition === this._buffer.length) {
      this._buffer = yield* this._readData();
      this._currentPosition = 0;
    }

    while (this._buffer.length - this._currentPosition < minLength) {
      this._buffer = MetadataParser._concatBuffers(
        this._buffer,
        yield* this._readData()
      );
    }

    const value = this._buffer.subarray(
      this._currentPosition,
      (minLength || this._remainingData) + this._currentPosition
    );

    this._stats.addBytes(value.length);
    this._remainingData =
      value.length < this._remainingData
        ? this._remainingData - value.length
        : 0;

    this._currentPosition += value.length;

    return value;
  }

  *_readData() {
    yield* this._sendStream();

    let data;

    do {
      data = yield; // if out of data, accept new data in the .next() call
    } while (!data || data.length === 0);

    this._stats.addCurrentBytesRemaining(data.length);
    return data;
  }
}

module.exports = MetadataParser;


/***/ }),

/***/ "./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/src/MetadataParser/OggMetadataParser.js":
/*!***********************************************************************************************************************!*\
  !*** ./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/src/MetadataParser/OggMetadataParser.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright 2020-2021 Ethan Halsall
    This file is part of icecast-metadata-js.

    icecast-metadata-js free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    icecast-metadata-js distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/

const Decoder = globalThis.TextDecoder;
const MetadataParser = __webpack_require__(/*! ./MetadataParser */ "./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/src/MetadataParser/MetadataParser.js");

/**
 * @description Parses OGG metadata from an Icecast stream
 * @protected
 * @see IcecastMetadataReader
 */
class OggMetadataParser extends MetadataParser {
  constructor(params) {
    super(params);

    this._decoder = new Decoder("utf-8");
    this._generator = this._oggParser();
    this._generator.next();
    this._isContinuePacket = false;
  }

  *_oggParser() {
    if (yield* this._hasOggPage()) {
      const codecMatcher = yield* this._identifyCodec();
      if (codecMatcher) {
        while (yield* this._hasOggPage()) {
          if (!this._isContinuePacket) yield* this._getMetadata(codecMatcher);
          yield* this._getStream();
        }
      }
    }

    this._remainingData = Infinity;
    yield* this._getStream();
  }

  _getUint32(data, offset = 0) {
    return new DataView(
      Uint8Array.from([...data.subarray(offset, offset + 4)]).buffer
    ).getUint32(0, true);
  }

  _matchBytes(matchString, bytes) {
    return String.fromCharCode(...bytes).match(matchString);
  }

  *_hasOggPage() {
    // Bytes (1-4 of 28)
    // Frame sync (must equal OggS): `AAAAAAAA|AAAAAAAA|AAAAAAAA|AAAAAAAA`:
    // Byte (5 of 28) stream_structure_version
    // Byte (6 of 28)
    // * `00000...`: All zeros
    // * `.....C..`: (0 no, 1 yes) last page of logical bitstream (eos)
    // * `......D.`: (0 no, 1 yes) first page of logical bitstream (bos)
    // * `.......E`: (0 no, 1 yes) continued packet
    let syncBytes = [];
    while (syncBytes.length <= 65307) {
      // max ogg page size
      const bytes = yield* super._getNextValue(6); // Sync with OGG page without sending stream data
      if (
        bytes[0] === 0x4f &&
        bytes[1] === 0x67 &&
        bytes[2] === 0x67 &&
        bytes[3] === 0x53 &&
        !(bytes[5] & 0b11111000)
      ) {
        this._isContinuePacket = bytes[5] & 0b00000001;
        this._currentPosition -= 6;
        this._remainingData += 6;
        this._stats._totalBytesRead -= 6;
        this._stats._currentBytesRemaining += 6;
        break;
      }
      syncBytes.push(bytes[0]);

      this._currentPosition -= 4;
      this._stats._totalBytesRead -= 4;
      this._stats._currentBytesRemaining += 4;
    }

    if (syncBytes.length) this._addStream(Uint8Array.from(syncBytes));

    if (syncBytes.length > 65307) {
      this._logError(
        "This stream is not an OGG stream. No OGG metadata will be returned.",
        "See https://github.com/eshaz/icecast-metadata-js for information on OGG metadata."
      );
      this._onMetadataFailed("ogg");
      return false;
    }

    const baseOggPage = yield* this._getNextValue(27);
    // Byte (27 of 28)
    // * `JJJJJJJJ`: Number of page segments in the segment table
    const oggPageSegments = yield* this._getNextValue(baseOggPage[26]);

    this._remainingData = oggPageSegments.reduce(
      (acc, octet) => acc + octet,
      0
    );
    return true;
  }

  *_identifyCodec() {
    const data = yield* this._getNextValue(8);

    yield* this._getStream();

    if (this._matchBytes(/\x7fFLAC/, data.subarray(0, 5))) {
      return { regex: /^[\x84|\x04]/, length: 4 };
    } else if (this._matchBytes(/OpusHead/, data.subarray(0, 8))) {
      return { regex: /OpusTags/, length: 8 };
    } else if (this._matchBytes(/\x01vorbis/, data.subarray(0, 7))) {
      return { regex: /\x03vorbis/, length: 7 };
    }
  }

  *_getMetadata({ regex, length }) {
    if (this._matchBytes(regex, yield* this._getNextValue(length))) {
      yield* this._sendMetadata(yield* this._readVorbisComment());
    }
  }

  *_getStream() {
    while (this._remainingData) {
      yield* this._getNextValue();
    }
  }

  *_getNextValue(length) {
    const value = yield* super._getNextValue(length);

    this._addStream(value);
    return value;
  }

  *_readData() {
    const data = yield* super._readData();
    this._stats.currentStreamBytesRemaining = data.length;
    return data;
  }

  *_readVorbisComment() {
    /*
    1) [vendor_length] = read an unsigned integer of 32 bits
    2) [vendor_string] = read a UTF-8 vector as [vendor_length] octets
    3) [user_comment_list_length] = read an unsigned integer of 32 bits
    4) iterate [user_comment_list_length] times {
       5) [length] = read an unsigned integer of 32 bits
       6) this iteration's user comment = read a UTF-8 vector as [length] octets
    }
    7) [framing_bit] = read a single bit as boolean
    8) if ( [framing_bit] unset or end of packet ) then ERROR
    9) done.
    */
    const vendorStringLength = this._getUint32(yield* this._getNextValue(4));
    this._stats.addMetadataBytes(4);

    const vendorString = this._decoder.decode(
      yield* this._getNextValue(vendorStringLength)
    );
    this._stats.addMetadataBytes(vendorStringLength);

    const commentListLength = this._getUint32(yield* this._getNextValue(4));
    this._stats.addMetadataBytes(4);

    const comments = [];
    for (let i = 0; i < commentListLength; i++) {
      const commentLength = yield* this._getNextValue(4);
      this._stats.addMetadataBytes(4);

      comments.push(yield* this._getNextValue(this._getUint32(commentLength)));
      this._stats.addMetadataBytes(comments[comments.length - 1].length);
    }

    this._stats.currentMetadataBytesRemaining = 0;

    return comments.reduce(
      (metadata, comment) => {
        const delimiter = comment.indexOf(0x3d);
        // prettier-ignore
        const key = String.fromCharCode(...comment.subarray(0, delimiter)).toUpperCase();
        const val = this._decoder.decode(comment.subarray(delimiter + 1));

        metadata[key] = metadata[key] ? `${metadata[key]}; ${val}` : val;
        return metadata;
      },
      { VENDOR_STRING: vendorString }
    );
  }
}

module.exports = OggMetadataParser;


/***/ }),

/***/ "./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/src/MetadataParser/Stats.js":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/src/MetadataParser/Stats.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Copyright 2020-2021 Ethan Halsall
    This file is part of icecast-metadata-js.

    icecast-metadata-js free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    icecast-metadata-js distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/

class Stats {
  constructor() {
    this._totalBytesRead = 0;
    this._streamBytesRead = 0;
    this._metadataLengthBytesRead = 0;
    this._metadataBytesRead = 0;

    this._currentBytesRemaining = 0;
    this._currentStreamBytesRemaining = 0;
    this._currentMetadataBytesRemaining = 0;
  }

  get stats() {
    return {
      totalBytesRead: this._totalBytesRead,
      streamBytesRead: this._streamBytesRead,
      metadataLengthBytesRead: this._metadataLengthBytesRead,
      metadataBytesRead: this._metadataBytesRead,
      currentBytesRemaining: this._currentBytesRemaining,
      currentStreamBytesRemaining: this._currentStreamBytesRemaining,
      currentMetadataBytesRemaining: this._currentMetadataBytesRemaining,
    };
  }

  set currentStreamBytesRemaining(bytes) {
    this._currentStreamBytesRemaining += bytes;
  }

  set currentMetadataBytesRemaining(bytes) {
    this._currentMetadataBytesRemaining = bytes;
  }

  addBytes(bytes) {
    this._totalBytesRead += bytes;
    this._currentBytesRemaining -= bytes;
  }

  addStreamBytes(bytes) {
    this._streamBytesRead += bytes;
    this._currentStreamBytesRemaining -= bytes;
  }

  addMetadataLengthBytes(bytes) {
    this._metadataLengthBytesRead += bytes;
  }

  addMetadataBytes(bytes) {
    this._metadataBytesRead += bytes;
    this._currentMetadataBytesRemaining -= bytes;
  }

  addCurrentBytesRemaining(bytes) {
    this._currentBytesRemaining += bytes;
  }
}

module.exports = Stats;


/***/ }),

/***/ "./node_modules/icecast-metadata-player/src/EventTargetPolyfill.js":
/*!*************************************************************************!*\
  !*** ./node_modules/icecast-metadata-player/src/EventTargetPolyfill.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EventTargetPolyfill; });
// support for Safari 13
// https://stackoverflow.com/a/58209729/14911733

class EventTargetPolyfill {
  constructor() {
    this._listeners = [];
  }

  hasEventListener(type, listener) {
    return this._listeners.some(
      (item) => item.type === type && item.listener === listener
    );
  }

  addEventListener(type, listener, options = {}) {
    if (!this.hasEventListener(type, listener)) {
      this._listeners.push({ type, listener, options });
    }
    // console.log(`${this}-listeners:`,this._listeners);
    return this;
  }

  removeEventListener(type, listener) {
    const index = this._listeners.findIndex(
      (item) => item.type === type && item.listener === listener
    );
    if (index >= 0) this._listeners.splice(index, 1);
    return this;
  }

  removeEventListeners() {
    this._listeners = [];
    return this;
  }

  dispatchEvent(evt) {
    this._listeners
      .filter((item) => item.type === evt.type)
      .forEach((item) => {
        const {
          type,
          listener,
          options: { once },
        } = item;
        listener.call(this, evt);
        if (once === true) this.removeEventListener(type, listener);
      });
    return this;
  }
}


/***/ }),

/***/ "./node_modules/icecast-metadata-player/src/FrameQueue.js":
/*!****************************************************************!*\
  !*** ./node_modules/icecast-metadata-player/src/FrameQueue.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FrameQueue; });
/* harmony import */ var _global_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global.js */ "./node_modules/icecast-metadata-player/src/global.js");


class FrameQueue {
  constructor(icecast) {
    this.CACHE_DURATION = 300000; // milliseconds of burst on connect data

    this._icecast = icecast;

    this.initSync();
    this.initQueue();
  }

  initSync() {
    this._syncQueue = [];
    this._alignIndex = 0;
    this._syncIndex = 0;
  }

  initQueue() {
    this._queue = [];
    this._queueDuration = 0;
  }

  add({ crc32, duration }) {
    this._queue.push({ crc32, duration });
    this._queueDuration += duration;

    if (this._queueDuration >= this.CACHE_DURATION) {
      const { duration } = this._queue.shift();
      this._queueDuration -= duration;
    }
  }

  addAll(frames) {
    frames.forEach((frame) => this.add(frame));
  }

  /*
  Aligns the queue with a new incoming data by aligning the crc32 hashes 
  and then returning only the frames that do not existing on the queue.
  
                   old data | common data  | new data
  (old connection) ------------------------|
  (new connection)          |------------------>
                             ^^^^^^^^^^^^^^ ^^^^
                              (sync)         (frames to return)
  */

  /**
   *
   * @param {Array<CodecFrame|OggPage>} frames
   * @returns Array with frames as first element, boolean indicating if the sync was successful as the second element
   */
  sync(frames) {
    this._syncQueue.push(...frames);

    // find the index of the element in the queue that aligns with the sync queue
    align_queues: while (this._alignIndex < this._queue.length) {
      while (
        this._syncIndex < this._syncQueue.length &&
        this._alignIndex + this._syncIndex < this._queue.length
      ) {
        if (
          this._syncQueue[this._syncIndex].crc32 !==
          this._queue[this._alignIndex + this._syncIndex].crc32 // failed to match
        ) {
          this._syncIndex = 0; // reset sync queue index and start over
          this._alignIndex++;
          continue align_queues;
        }
        this._syncIndex++;
      }
      break; // full match, queues are aligned
    }

    // no matching data (not synced)
    if (this._alignIndex === this._queue.length) {
      // prettier-ignore
      this._icecast[_global_js__WEBPACK_IMPORTED_MODULE_0__["fireEvent"]](
        _global_js__WEBPACK_IMPORTED_MODULE_0__["event"].WARN,
        "Reconnected successfully after retry event.",
        "Found no overlapping frames from previous request.",
        "Unable to sync old and new request."
      );

      const syncQueue = this._syncQueue;
      this.initSync();
      this.initQueue(); // clear queue since there is a gap in data
      return [syncQueue, false];
    }

    const sliceIndex = this._queue.length - this._alignIndex;

    // new frames (synced)
    if (this._syncQueue.length > sliceIndex) {
      // prettier-ignore
      this._icecast[_global_js__WEBPACK_IMPORTED_MODULE_0__["fireEvent"]](
          _global_js__WEBPACK_IMPORTED_MODULE_0__["event"].WARN,
          "Reconnected successfully after retry event.",
          `Found ${sliceIndex} frames (${(this._queue
            .slice(this._alignIndex)
            .reduce((acc, { duration }) => acc + duration, 0) / 1000).toFixed(3)} seconds) of overlapping audio data in new request.`,
          "Synchronized old and new request."
        );

      const newFrames = this._syncQueue.slice(sliceIndex);
      this.initSync();
      return [newFrames, true];
    }

    // no new frames yet
    return [[], false];
  }
}


/***/ }),

/***/ "./node_modules/icecast-metadata-player/src/IcecastMetadataPlayer.js":
/*!***************************************************************************!*\
  !*** ./node_modules/icecast-metadata-player/src/IcecastMetadataPlayer.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return IcecastMetadataPlayer; });
/* harmony import */ var icecast_metadata_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! icecast-metadata-js */ "./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/browser.js");
/* harmony import */ var _global_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./global.js */ "./node_modules/icecast-metadata-player/src/global.js");
/* harmony import */ var _EventTargetPolyfill_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EventTargetPolyfill.js */ "./node_modules/icecast-metadata-player/src/EventTargetPolyfill.js");
/* harmony import */ var _PlayerFactory_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PlayerFactory.js */ "./node_modules/icecast-metadata-player/src/PlayerFactory.js");
/* harmony import */ var _players_MediaSourcePlayer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./players/MediaSourcePlayer.js */ "./node_modules/icecast-metadata-player/src/players/MediaSourcePlayer.js");
/* harmony import */ var _players_HTML5Player_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./players/HTML5Player.js */ "./node_modules/icecast-metadata-player/src/players/HTML5Player.js");
/* harmony import */ var _players_WebAudioPlayer_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./players/WebAudioPlayer.js */ "./node_modules/icecast-metadata-player/src/players/WebAudioPlayer.js");
/**
 * @license
 * @see https://github.com/eshaz/icecast-metadata-js
 * @copyright 2021-2022 Ethan Halsall
 *  This file is part of icecast-metadata-player.
 *
 *  icecast-metadata-player free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Lesser General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  icecast-metadata-player distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Lesser General Public License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>
 */










let EventClass;

try {
  new EventTarget();
  EventClass = EventTarget;
} catch {
  EventClass = _EventTargetPolyfill_js__WEBPACK_IMPORTED_MODULE_2__["default"];
}

const playbackMethod = Symbol();
const playerFactory = Symbol();
const playerResetPromise = Symbol();
const events = Symbol();
const playerState = Symbol();

const onAudioPause = Symbol();
const onAudioPlay = Symbol();
const onPlay = Symbol();
const onAudioError = Symbol();
const onAudioWaiting = Symbol();

const resetPlayback = Symbol();
const retryAttempt = Symbol();
const retryTimeoutId = Symbol();

class IcecastMetadataPlayer extends EventClass {
  /**
   * @constructor
   * @param {string} endpoint Endpoint of the Icecast compatible stream
   * @param {object} options Options object
   * @param {HTMLAudioElement} options.audioElement Audio element to play the stream
   * @param {Array} options.metadataTypes Array of metadata types to parse
   * @param {number} options.bufferLength Seconds of audio to buffer before starting playback
   * @param {number} options.icyMetaInt ICY metadata interval
   * @param {string} options.icyCharacterEncoding Character encoding to use for ICY metadata (defaults to "utf-8")
   * @param {number} options.icyDetectionTimeout ICY metadata detection timeout
   * @param {number} options.retryTimeout Number of seconds to wait before giving up on retries
   * @param {number} options.retryDelayRate Percentage of seconds to increment after each retry (how quickly to increase the back-off)
   * @param {number} options.retryDelayMin Minimum number of seconds between retries (start of the exponential back-off curve)
   * @param {number} options.retryDelayMax Maximum number of seconds between retries (end of the exponential back-off curve)
   * @param {boolean} options.enableLogging Set to `true` to enable warning and error logging to the console
   * @param {string} options.playbackMethod Sets the preferred playback method (mediasource (default), html5, webaudio)
   *
   * @callback options.onMetadata Called with metadata when synchronized with the audio
   * @callback options.onMetadataEnqueue Called with metadata when discovered on the response
   * @callback options.onError Called with message(s) when a fallback or error condition is met
   * @callback options.onWarn Called with message(s) when a warning condition is met
   * @callback options.onPlay Called when the audio element begins playing
   * @callback options.onLoad Called when stream request is started
   * @callback options.onStreamStart Called when stream requests begins to return data
   * @callback options.onBuffer Called when the audio buffer is being filled
   * @callback options.onStream Called when stream data is sent to the audio element
   * @callback options.onStreamEnd Called when the stream request completes
   * @callback options.onStop Called when the stream is completely stopped and all cleanup operations are complete
   * @callback options.onRetry Called when a connection retry is attempted
   * @callback options.onRetryTimeout Called when when connections attempts have timed out
   * @callback options.onCodecUpdate Called when the audio codec information has changed
   */
  constructor(url, options = {}) {
    super();

    _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].set(this, {
      // options
      [_global_js__WEBPACK_IMPORTED_MODULE_1__["endpoint"]]: url,
      [_global_js__WEBPACK_IMPORTED_MODULE_1__["audioElement"]]: options.audioElement || new Audio(),
      [_global_js__WEBPACK_IMPORTED_MODULE_1__["bufferLength"]]: options.bufferLength || 1,
      [_global_js__WEBPACK_IMPORTED_MODULE_1__["icyMetaInt"]]: options.icyMetaInt,
      [_global_js__WEBPACK_IMPORTED_MODULE_1__["icyCharacterEncoding"]]: options.icyCharacterEncoding,
      [_global_js__WEBPACK_IMPORTED_MODULE_1__["icyDetectionTimeout"]]: options.icyDetectionTimeout,
      [_global_js__WEBPACK_IMPORTED_MODULE_1__["metadataTypes"]]: options.metadataTypes || ["icy"],
      [_global_js__WEBPACK_IMPORTED_MODULE_1__["hasIcy"]]: (options.metadataTypes || ["icy"]).includes("icy"),
      [_global_js__WEBPACK_IMPORTED_MODULE_1__["enableLogging"]]: options.enableLogging || false,
      [_global_js__WEBPACK_IMPORTED_MODULE_1__["enableCodecUpdate"]]:
        Boolean(options.onCodecUpdate) || options.enableCodecUpdate,
      [_global_js__WEBPACK_IMPORTED_MODULE_1__["retryDelayRate"]]: (options.retryDelayRate || 0.1) + 1,
      [_global_js__WEBPACK_IMPORTED_MODULE_1__["retryDelayMin"]]: (options.retryDelayMin || 0.5) * 1000,
      [_global_js__WEBPACK_IMPORTED_MODULE_1__["retryDelayMax"]]: (options.retryDelayMax || 2) * 1000,
      [_global_js__WEBPACK_IMPORTED_MODULE_1__["retryTimeout"]]: (options.retryTimeout || 30) * 1000,
      [playbackMethod]: options.playbackMethod,
      // callbacks
      [events]: {
        [_global_js__WEBPACK_IMPORTED_MODULE_1__["event"].PLAY]: options.onPlay || _global_js__WEBPACK_IMPORTED_MODULE_1__["noOp"],
        [_global_js__WEBPACK_IMPORTED_MODULE_1__["event"].LOAD]: options.onLoad || _global_js__WEBPACK_IMPORTED_MODULE_1__["noOp"],
        [_global_js__WEBPACK_IMPORTED_MODULE_1__["event"].STREAM_START]: options.onStreamStart || _global_js__WEBPACK_IMPORTED_MODULE_1__["noOp"],
        [_global_js__WEBPACK_IMPORTED_MODULE_1__["event"].BUFFER]: options.onBuffer || _global_js__WEBPACK_IMPORTED_MODULE_1__["noOp"],
        [_global_js__WEBPACK_IMPORTED_MODULE_1__["event"].STREAM]: options.onStream || _global_js__WEBPACK_IMPORTED_MODULE_1__["noOp"],
        [_global_js__WEBPACK_IMPORTED_MODULE_1__["event"].STREAM_END]: options.onStreamEnd || _global_js__WEBPACK_IMPORTED_MODULE_1__["noOp"],
        [_global_js__WEBPACK_IMPORTED_MODULE_1__["event"].METADATA]: options.onMetadata || _global_js__WEBPACK_IMPORTED_MODULE_1__["noOp"],
        [_global_js__WEBPACK_IMPORTED_MODULE_1__["event"].METADATA_ENQUEUE]: options.onMetadataEnqueue || _global_js__WEBPACK_IMPORTED_MODULE_1__["noOp"],
        [_global_js__WEBPACK_IMPORTED_MODULE_1__["event"].CODEC_UPDATE]: options.onCodecUpdate || _global_js__WEBPACK_IMPORTED_MODULE_1__["noOp"],
        [_global_js__WEBPACK_IMPORTED_MODULE_1__["event"].STOP]: options.onStop || _global_js__WEBPACK_IMPORTED_MODULE_1__["noOp"],
        [_global_js__WEBPACK_IMPORTED_MODULE_1__["event"].RETRY]: options.onRetry || _global_js__WEBPACK_IMPORTED_MODULE_1__["noOp"],
        [_global_js__WEBPACK_IMPORTED_MODULE_1__["event"].RETRY_TIMEOUT]: options.onRetryTimeout || _global_js__WEBPACK_IMPORTED_MODULE_1__["noOp"],
        [_global_js__WEBPACK_IMPORTED_MODULE_1__["event"].WARN]: (...messages) => {
          this[_global_js__WEBPACK_IMPORTED_MODULE_1__["logError"]](console.warn, options.onWarn, messages);
        },
        [_global_js__WEBPACK_IMPORTED_MODULE_1__["event"].ERROR]: (...messages) => {
          this[_global_js__WEBPACK_IMPORTED_MODULE_1__["logError"]](console.error, options.onError, messages);
        },
      },
      // variables
      [_global_js__WEBPACK_IMPORTED_MODULE_1__["icecastMetadataQueue"]]: new icecast_metadata_js__WEBPACK_IMPORTED_MODULE_0__["IcecastMetadataQueue"]({
        onMetadataUpdate: (...args) => this[_global_js__WEBPACK_IMPORTED_MODULE_1__["fireEvent"]](_global_js__WEBPACK_IMPORTED_MODULE_1__["event"].METADATA, ...args),
        onMetadataEnqueue: (...args) =>
          this[_global_js__WEBPACK_IMPORTED_MODULE_1__["fireEvent"]](_global_js__WEBPACK_IMPORTED_MODULE_1__["event"].METADATA_ENQUEUE, ...args),
      }),
      [_global_js__WEBPACK_IMPORTED_MODULE_1__["codecUpdateQueue"]]: new icecast_metadata_js__WEBPACK_IMPORTED_MODULE_0__["IcecastMetadataQueue"]({
        onMetadataUpdate: (...args) =>
          this[_global_js__WEBPACK_IMPORTED_MODULE_1__["fireEvent"]](_global_js__WEBPACK_IMPORTED_MODULE_1__["event"].CODEC_UPDATE, ...args),
      }),
      [resetPlayback]: () => {
        clearTimeout(_global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[retryTimeoutId]);
        this.removeEventListener(
          _global_js__WEBPACK_IMPORTED_MODULE_1__["event"].STREAM_START,
          _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[resetPlayback]
        );
        _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[_global_js__WEBPACK_IMPORTED_MODULE_1__["audioElement"]].removeEventListener(
          "waiting",
          _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[onAudioWaiting]
        );

        if (this.state !== _global_js__WEBPACK_IMPORTED_MODULE_1__["state"].RETRYING) {
          _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[_global_js__WEBPACK_IMPORTED_MODULE_1__["audioElement"]].pause();
          _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[_global_js__WEBPACK_IMPORTED_MODULE_1__["icecastMetadataQueue"]].purgeMetadataQueue();
          _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[_global_js__WEBPACK_IMPORTED_MODULE_1__["codecUpdateQueue"]].purgeMetadataQueue();
          _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[playerResetPromise] = _global_js__WEBPACK_IMPORTED_MODULE_1__["p"]
            .get(this)
            [playerFactory].player.reset();
        }
      },
      // audio element event handlers
      [onAudioPlay]: () => {
        this.play();
      },
      [onAudioPause]: () => {
        this.stop();
      },
      [onAudioError]: (e) => {
        const errors = {
          1: "MEDIA_ERR_ABORTED The fetching of the associated resource was aborted by the user's request.",
          2: "MEDIA_ERR_NETWORK Some kind of network error occurred which prevented the media from being successfully fetched, despite having previously been available.",
          3: "MEDIA_ERR_DECODE Despite having previously been determined to be usable, an error occurred while trying to decode the media resource, resulting in an error.",
          4: "MEDIA_ERR_SRC_NOT_SUPPORTED The associated resource or media provider object (such as a MediaStream) has been found to be unsuitable.",
          5: "MEDIA_ERR_ENCRYPTED",
        };

        if (this.state !== _global_js__WEBPACK_IMPORTED_MODULE_1__["state"].RETRYING) {
          this[_global_js__WEBPACK_IMPORTED_MODULE_1__["fireEvent"]](
            _global_js__WEBPACK_IMPORTED_MODULE_1__["event"].ERROR,
            "The audio element encountered an error",
            errors[e.target.error.code] || `Code: ${e.target.error.code}`,
            `Message: ${e.target.error.message}`
          );

          this.stop();
        } else {
          _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[resetPlayback]();
        }
      },
      [onPlay]: () => {
        const audio = _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[_global_js__WEBPACK_IMPORTED_MODULE_1__["audioElement"]];

        if (
          this.state === _global_js__WEBPACK_IMPORTED_MODULE_1__["state"].LOADING ||
          (!audio.loop &&
            this.state !== _global_js__WEBPACK_IMPORTED_MODULE_1__["state"].STOPPING &&
            this.state !== _global_js__WEBPACK_IMPORTED_MODULE_1__["state"].STOPPED)
        ) {
          audio.play();
          this[playerState] = _global_js__WEBPACK_IMPORTED_MODULE_1__["state"].PLAYING;
        }
      },
    });

    this[_global_js__WEBPACK_IMPORTED_MODULE_1__["attachAudioElement"]]();
    this[playerState] = _global_js__WEBPACK_IMPORTED_MODULE_1__["state"].STOPPED;

    _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[playerFactory] = new _PlayerFactory_js__WEBPACK_IMPORTED_MODULE_3__["default"](
      this,
      _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[playbackMethod],
      _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[_global_js__WEBPACK_IMPORTED_MODULE_1__["icyCharacterEncoding"]]
    );
  }

  /**
   * @description Checks for MediaSource and HTML5 support for a given codec
   * @param {string} type Codec / mime-type to check
   * @returns {mediasource: string, html5: string} Object indicating if the codec is supported by MediaSource or HTML5 audio
   */
  static canPlayType(type) {
    return {
      mediasource: _players_MediaSourcePlayer_js__WEBPACK_IMPORTED_MODULE_4__["default"].canPlayType(type),
      html5: _players_HTML5Player_js__WEBPACK_IMPORTED_MODULE_5__["default"].canPlayType(type),
      webaudio: _players_WebAudioPlayer_js__WEBPACK_IMPORTED_MODULE_6__["default"].canPlayType(type),
    };
  }

  /**
   * @returns {HTMLAudioElement} The audio element associated with this instance
   */
  get audioElement() {
    return _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[_global_js__WEBPACK_IMPORTED_MODULE_1__["audioElement"]];
  }

  /**
   * @returns {number} The ICY metadata interval in number of bytes for this instance
   */
  get icyMetaInt() {
    return _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[playerFactory].icyMetaInt;
  }

  /**
   * @returns {Array<Metadata>} Array of enqueued metadata objects in FILO order
   */
  get metadataQueue() {
    return _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[_global_js__WEBPACK_IMPORTED_MODULE_1__["icecastMetadataQueue"]].metadataQueue;
  }

  /**
   * @returns {string} The current state ("loading", "playing", "stopping", "stopped", "retrying")
   */
  get state() {
    return _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[playerState];
  }

  /**
   * @returns {string} The playback method ("mediasource", "webaudio", "html5")
   */
  get playbackMethod() {
    return _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[playerFactory].playbackMethod;
  }

  set [playerState](_state) {
    this.dispatchEvent(new CustomEvent(_state));
    _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[playerState] = _state;
  }

  [_global_js__WEBPACK_IMPORTED_MODULE_1__["attachAudioElement"]]() {
    // audio events
    const audio = _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[_global_js__WEBPACK_IMPORTED_MODULE_1__["audioElement"]];
    audio.addEventListener("pause", _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[onAudioPause]);
    audio.addEventListener("play", _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[onAudioPlay]);
    audio.addEventListener("error", _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[onAudioError]);
    this.addEventListener("play", _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[onPlay]);
  }

  /**
   * @description Remove event listeners from the audio element and this instance and stops playback
   */
  async detachAudioElement() {
    const audio = _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[_global_js__WEBPACK_IMPORTED_MODULE_1__["audioElement"]];
    audio.removeEventListener("pause", _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[onAudioPause]);
    audio.removeEventListener("play", _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[onAudioPlay]);
    audio.removeEventListener("error", _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[onAudioError]);
    this.removeEventListener("play", _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[onPlay]);

    await this.stop();
  }

  /**
   * @description Plays the Icecast stream
   * @async Resolves when the audio element is playing
   */
  async play() {
    if (this.state === _global_js__WEBPACK_IMPORTED_MODULE_1__["state"].STOPPED) {
      _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[_global_js__WEBPACK_IMPORTED_MODULE_1__["abortController"]] = new AbortController();
      this[playerState] = _global_js__WEBPACK_IMPORTED_MODULE_1__["state"].LOADING;
      this[_global_js__WEBPACK_IMPORTED_MODULE_1__["fireEvent"]](_global_js__WEBPACK_IMPORTED_MODULE_1__["event"].LOAD);

      // prettier-ignore
      const tryFetching = async () =>
        _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[playerFactory].playStream()
          .catch(async (e) => {
            if (e.name !== "AbortError") {
              if (await this[_global_js__WEBPACK_IMPORTED_MODULE_1__["shouldRetry"]](e)) {
                this[_global_js__WEBPACK_IMPORTED_MODULE_1__["fireEvent"]](_global_js__WEBPACK_IMPORTED_MODULE_1__["event"].RETRY);
                return tryFetching();
              }

              _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[_global_js__WEBPACK_IMPORTED_MODULE_1__["abortController"]].abort(); // stop fetch if is wasn't aborted

              if (
                _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[playerState] !== _global_js__WEBPACK_IMPORTED_MODULE_1__["state"].STOPPING &&
                _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[playerState] !== _global_js__WEBPACK_IMPORTED_MODULE_1__["state"].STOPPED
              ) {
                this[_global_js__WEBPACK_IMPORTED_MODULE_1__["fireEvent"]](
                  _global_js__WEBPACK_IMPORTED_MODULE_1__["event"].ERROR,
                  e.message.match(/network|fetch|offline|codec/i) ? e : e.stack
                );
              }
            }
          });

      tryFetching().finally(() => {
        _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[resetPlayback]();

        this[_global_js__WEBPACK_IMPORTED_MODULE_1__["fireEvent"]](_global_js__WEBPACK_IMPORTED_MODULE_1__["event"].STOP);
        this[playerState] = _global_js__WEBPACK_IMPORTED_MODULE_1__["state"].STOPPED;
      });

      await new Promise((resolve) => {
        this.addEventListener(_global_js__WEBPACK_IMPORTED_MODULE_1__["event"].PLAY, resolve, { once: true });
      });
    }
  }

  /**
   * @description Stops playing the Icecast stream
   * @async Resolves the icecast stream has stopped
   */
  async stop() {
    if (this.state !== _global_js__WEBPACK_IMPORTED_MODULE_1__["state"].STOPPED && this.state !== _global_js__WEBPACK_IMPORTED_MODULE_1__["state"].STOPPING) {
      this[playerState] = _global_js__WEBPACK_IMPORTED_MODULE_1__["state"].STOPPING;
      _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[_global_js__WEBPACK_IMPORTED_MODULE_1__["abortController"]].abort();

      await new Promise((resolve) => {
        this.addEventListener(_global_js__WEBPACK_IMPORTED_MODULE_1__["event"].STOP, resolve, { once: true });
      });
    }
  }

  async [_global_js__WEBPACK_IMPORTED_MODULE_1__["shouldRetry"]](error) {
    if (_global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[_global_js__WEBPACK_IMPORTED_MODULE_1__["retryTimeout"]] === 0) return false;

    if (_global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[playerState] === _global_js__WEBPACK_IMPORTED_MODULE_1__["state"].RETRYING) {
      // wait for retry interval
      await new Promise((resolve) => {
        this.addEventListener(_global_js__WEBPACK_IMPORTED_MODULE_1__["state"].STOPPING, resolve, { once: true });

        const delay = Math.min(
          _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[_global_js__WEBPACK_IMPORTED_MODULE_1__["retryDelayMin"]] *
            _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[_global_js__WEBPACK_IMPORTED_MODULE_1__["retryDelayRate"]] ** _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[retryAttempt]++,
          _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[_global_js__WEBPACK_IMPORTED_MODULE_1__["retryDelayMax"]]
        ); // exponential backoff

        setTimeout(() => {
          this.removeEventListener(_global_js__WEBPACK_IMPORTED_MODULE_1__["state"].STOPPING, resolve);
          resolve();
        }, delay + delay * 0.3 * Math.random()); // jitter
      });

      // ensure the retry hasn't been cancelled while waiting
      return _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[playerState] === _global_js__WEBPACK_IMPORTED_MODULE_1__["state"].RETRYING;
    }

    if (
      _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[playerState] !== _global_js__WEBPACK_IMPORTED_MODULE_1__["state"].STOPPING &&
      _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[playerState] !== _global_js__WEBPACK_IMPORTED_MODULE_1__["state"].STOPPED &&
      (error.message.match(/network|fetch|offline|Error in body stream/i) ||
        error.name === "HTTP Response Error")
    ) {
      this[_global_js__WEBPACK_IMPORTED_MODULE_1__["fireEvent"]](_global_js__WEBPACK_IMPORTED_MODULE_1__["event"].ERROR, error);
      this[playerState] = _global_js__WEBPACK_IMPORTED_MODULE_1__["state"].RETRYING;
      this.addEventListener(_global_js__WEBPACK_IMPORTED_MODULE_1__["event"].STREAM_START, _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[resetPlayback], {
        once: true,
      });

      if (_global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[_global_js__WEBPACK_IMPORTED_MODULE_1__["hasIcy"]]) {
        this[_global_js__WEBPACK_IMPORTED_MODULE_1__["fireEvent"]](
          _global_js__WEBPACK_IMPORTED_MODULE_1__["event"].WARN,
          "This stream was requested with ICY metadata.",
          'If there is a CORS preflight failure, try removing "icy" from the metadataTypes option.',
          "See https://github.com/eshaz/icecast-metadata-js#cors for more details."
        );
      }

      const audioWaiting = new Promise((resolve) => {
        _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[onAudioWaiting] = resolve;
        _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[_global_js__WEBPACK_IMPORTED_MODULE_1__["audioElement"]].addEventListener(
          "waiting",
          _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[onAudioWaiting],
          {
            once: true,
          }
        );
      });

      // wait for whichever is longer, audio element waiting or retry timeout
      _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[retryTimeoutId] = setTimeout(() => {
        audioWaiting.then(() => {
          if (_global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[playerState] === _global_js__WEBPACK_IMPORTED_MODULE_1__["state"].RETRYING) {
            this[_global_js__WEBPACK_IMPORTED_MODULE_1__["fireEvent"]](_global_js__WEBPACK_IMPORTED_MODULE_1__["event"].RETRY_TIMEOUT);
            this.stop();
          }
        });
      }, _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[_global_js__WEBPACK_IMPORTED_MODULE_1__["retryTimeout"]]);

      _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[retryAttempt] = 0;
      return true;
    }

    return false;
  }

  [_global_js__WEBPACK_IMPORTED_MODULE_1__["fireEvent"]](event, ...args) {
    this.dispatchEvent(new CustomEvent(event, { detail: args }));
    _global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[events][event](...args);
  }

  [_global_js__WEBPACK_IMPORTED_MODULE_1__["logError"]](consoleFunction, callback, messages) {
    if (_global_js__WEBPACK_IMPORTED_MODULE_1__["p"].get(this)[_global_js__WEBPACK_IMPORTED_MODULE_1__["enableLogging"]]) {
      consoleFunction(
        "icecast-metadata-js",
        messages.reduce((acc, message) => acc + "\n  " + message, "")
      );
    }
    if (callback) callback(...messages);
  }
}


/***/ }),

/***/ "./node_modules/icecast-metadata-player/src/PlayerFactory.js":
/*!*******************************************************************!*\
  !*** ./node_modules/icecast-metadata-player/src/PlayerFactory.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PlayerFactory; });
/* harmony import */ var icecast_metadata_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! icecast-metadata-js */ "./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/browser.js");
/* harmony import */ var codec_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! codec-parser */ "./node_modules/codec-parser/index.js");
/* harmony import */ var _global_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./global.js */ "./node_modules/icecast-metadata-player/src/global.js");
/* harmony import */ var _players_Player_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./players/Player.js */ "./node_modules/icecast-metadata-player/src/players/Player.js");
/* harmony import */ var _players_HTML5Player_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./players/HTML5Player.js */ "./node_modules/icecast-metadata-player/src/players/HTML5Player.js");
/* harmony import */ var _players_MediaSourcePlayer_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./players/MediaSourcePlayer.js */ "./node_modules/icecast-metadata-player/src/players/MediaSourcePlayer.js");
/* harmony import */ var _players_WebAudioPlayer_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./players/WebAudioPlayer.js */ "./node_modules/icecast-metadata-player/src/players/WebAudioPlayer.js");









class PlayerFactory {
  constructor(icecast, preferredPlaybackMethod) {
    const instanceVariables = _global_js__WEBPACK_IMPORTED_MODULE_2__["p"].get(icecast);

    this._icecast = icecast;
    this._enableLogging = instanceVariables[_global_js__WEBPACK_IMPORTED_MODULE_2__["enableLogging"]];
    this._enableCodecUpdate = instanceVariables[_global_js__WEBPACK_IMPORTED_MODULE_2__["enableCodecUpdate"]];
    this._audioElement = instanceVariables[_global_js__WEBPACK_IMPORTED_MODULE_2__["audioElement"]];
    this._endpoint = instanceVariables[_global_js__WEBPACK_IMPORTED_MODULE_2__["endpoint"]];
    this._metadataTypes = instanceVariables[_global_js__WEBPACK_IMPORTED_MODULE_2__["metadataTypes"]];
    this._icyMetaInt = instanceVariables[_global_js__WEBPACK_IMPORTED_MODULE_2__["icyMetaInt"]];
    this._icyCharacterEncoding = instanceVariables[_global_js__WEBPACK_IMPORTED_MODULE_2__["icyCharacterEncoding"]];
    this._icyDetectionTimeout = instanceVariables[_global_js__WEBPACK_IMPORTED_MODULE_2__["icyDetectionTimeout"]];

    this._hasIcy = instanceVariables[_global_js__WEBPACK_IMPORTED_MODULE_2__["hasIcy"]];

    this._preferredPlaybackMethod = preferredPlaybackMethod || "mediasource";
    this._playbackMethod = "";
    this._player = new _players_Player_js__WEBPACK_IMPORTED_MODULE_3__["default"](this._icecast);
    this._unprocessedFrames = [];
    this._codecParser = undefined;
    this._inputMimeType = "";
    this._codec = "";
  }

  get player() {
    return this._player;
  }

  get playbackMethod() {
    return this._playbackMethod;
  }

  get icyMetaInt() {
    return (
      this._icecastReadableStream && this._icecastReadableStream.icyMetaInt
    );
  }

  async playStream() {
    return this.fetchStream().then(async (res) => {
      this._icecast[_global_js__WEBPACK_IMPORTED_MODULE_2__["fireEvent"]](_global_js__WEBPACK_IMPORTED_MODULE_2__["event"].STREAM_START);

      return this.readIcecastResponse(res).finally(() => {
        this._icecast[_global_js__WEBPACK_IMPORTED_MODULE_2__["fireEvent"]](_global_js__WEBPACK_IMPORTED_MODULE_2__["event"].STREAM_END);
      });
    });
  }

  async fetchStream() {
    const res = await fetch(this._endpoint, {
      method: "GET",
      headers: this._hasIcy ? { "Icy-MetaData": 1 } : {},
      signal: _global_js__WEBPACK_IMPORTED_MODULE_2__["p"].get(this._icecast)[_global_js__WEBPACK_IMPORTED_MODULE_2__["abortController"]].signal,
    });

    if (!res.ok) {
      const error = new Error(`${res.status} received from ${res.url}`);
      error.name = "HTTP Response Error";
      throw error;
    }

    return res;
  }

  async readIcecastResponse(res) {
    const inputMimeType = res.headers.get("content-type");

    const codecPromise = new Promise((onCodec) => {
      this._codecParser = new codec_parser__WEBPACK_IMPORTED_MODULE_1__["default"](inputMimeType, {
        onCodecUpdate:
          this._enableCodecUpdate &&
          ((...args) => this._player.onCodecUpdate(...args)),
        onCodec,
        enableLogging: this._enableLogging,
      });
    });

    this._icecastReadableStream = new icecast_metadata_js__WEBPACK_IMPORTED_MODULE_0__["IcecastReadableStream"](res, {
      onMetadata: async (metadata) => {
        this._player.onMetadata(metadata);
      },
      onStream: async ({ stream }) => {
        this._icecast[_global_js__WEBPACK_IMPORTED_MODULE_2__["fireEvent"]](_global_js__WEBPACK_IMPORTED_MODULE_2__["event"].STREAM, stream);

        const frames = [...this._codecParser.parseChunk(stream)];

        if (this._player.isAudioPlayer) {
          await this._player.onStream([...this._unprocessedFrames, ...frames]);

          this._unprocessedFrames = [];
        } else {
          this._unprocessedFrames.push(...frames);
        }
      },
      onError: (...args) => this._icecast[_global_js__WEBPACK_IMPORTED_MODULE_2__["fireEvent"]](_global_js__WEBPACK_IMPORTED_MODULE_2__["event"].WARN, ...args),
      metadataTypes: this._metadataTypes,
      icyCharacterEncoding: this._icyCharacterEncoding,
      icyDetectionTimeout: this._icyDetectionTimeout,
      ...(this._icyMetaInt && { icyMetaInt: this._icyMetaInt }),
    });

    const icecastPromise = this._icecastReadableStream.startReading();

    if (!this._player.isAudioPlayer) {
      this._buildPlayer(inputMimeType, await codecPromise);
    }

    await icecastPromise;
  }

  _buildPlayer(inputMimeType, codec) {
    // in order of preference
    const { [this._preferredPlaybackMethod]: firstMethod, ...rest } = {
      mediasource: _players_MediaSourcePlayer_js__WEBPACK_IMPORTED_MODULE_5__["default"],
      webaudio: _players_WebAudioPlayer_js__WEBPACK_IMPORTED_MODULE_6__["default"],
      html5: _players_HTML5Player_js__WEBPACK_IMPORTED_MODULE_4__["default"],
    };

    for (const player of Object.values({ firstMethod, ...rest })) {
      const support = player.canPlayType(`${inputMimeType};codecs="${codec}"`);

      if (support === "probably" || support === "maybe") {
        this._playbackMethod = player.name;
        this._player = new player(this._icecast, inputMimeType, codec);
        break;
      }
    }

    if (!this._player) {
      throw new Error(
        `Your browser does not support this audio codec ${inputMimeType}${
          codec && `;codecs="${codec}"`
        }`
      );
    }
  }
}


/***/ }),

/***/ "./node_modules/icecast-metadata-player/src/global.js":
/*!************************************************************!*\
  !*** ./node_modules/icecast-metadata-player/src/global.js ***!
  \************************************************************/
/*! exports provided: noOp, p, state, event, endpoint, metadataTypes, audioElement, bufferLength, icyMetaInt, icyCharacterEncoding, icyDetectionTimeout, enableLogging, retryDelayRate, retryDelayMin, retryDelayMax, retryTimeout, enableCodecUpdate, fireEvent, attachAudioElement, shouldRetry, logError, hasIcy, icecastMetadataQueue, codecUpdateQueue, abortController, SYNCED, SYNCING, NOT_SYNCED, concatBuffers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noOp", function() { return noOp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return p; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "state", function() { return state; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "event", function() { return event; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "endpoint", function() { return endpoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "metadataTypes", function() { return metadataTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "audioElement", function() { return audioElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bufferLength", function() { return bufferLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "icyMetaInt", function() { return icyMetaInt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "icyCharacterEncoding", function() { return icyCharacterEncoding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "icyDetectionTimeout", function() { return icyDetectionTimeout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enableLogging", function() { return enableLogging; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "retryDelayRate", function() { return retryDelayRate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "retryDelayMin", function() { return retryDelayMin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "retryDelayMax", function() { return retryDelayMax; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "retryTimeout", function() { return retryTimeout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enableCodecUpdate", function() { return enableCodecUpdate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fireEvent", function() { return fireEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "attachAudioElement", function() { return attachAudioElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shouldRetry", function() { return shouldRetry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logError", function() { return logError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasIcy", function() { return hasIcy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "icecastMetadataQueue", function() { return icecastMetadataQueue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "codecUpdateQueue", function() { return codecUpdateQueue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "abortController", function() { return abortController; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SYNCED", function() { return SYNCED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SYNCING", function() { return SYNCING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NOT_SYNCED", function() { return NOT_SYNCED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "concatBuffers", function() { return concatBuffers; });
const noOp = () => {};
const p = new WeakMap();

const state = {
  LOADING: "loading",
  PLAYING: "playing",
  STOPPING: "stopping",
  STOPPED: "stopped",
  RETRYING: "retrying",
};

const event = {
  BUFFER: "buffer",
  PLAY: "play",
  LOAD: "load",
  STREAM_START: "streamstart",
  STREAM: "stream",
  STREAM_END: "streamend",
  METADATA: "metadata",
  METADATA_ENQUEUE: "metadataenqueue",
  CODEC_UPDATE: "codecupdate",
  STOP: "stop",
  RETRY: "retry",
  RETRY_TIMEOUT: "retrytimeout",
  WARN: "warn",
  ERROR: "error",
};

// options
const endpoint = Symbol();
const metadataTypes = Symbol();
const audioElement = Symbol();
const bufferLength = Symbol();
const icyMetaInt = Symbol();
const icyCharacterEncoding = Symbol();
const icyDetectionTimeout = Symbol();
const enableLogging = Symbol();
const retryDelayRate = Symbol();
const retryDelayMin = Symbol();
const retryDelayMax = Symbol();
const retryTimeout = Symbol();
const enableCodecUpdate = Symbol();

// methods
const fireEvent = Symbol();
const attachAudioElement = Symbol();
const shouldRetry = Symbol();
const logError = Symbol();

// variables
const hasIcy = Symbol();
const icecastMetadataQueue = Symbol();
const codecUpdateQueue = Symbol();
const abortController = Symbol();

// sync state
const SYNCED = Symbol();
const SYNCING = Symbol();
const NOT_SYNCED = Symbol();

const concatBuffers = (buffers) => {
  const buffer = new Uint8Array(
    buffers.reduce((acc, buf) => acc + buf.length, 0)
  );

  buffers.reduce((offset, buf) => {
    buffer.set(buf, offset);
    return offset + buf.length;
  }, 0);

  return buffer;
};


/***/ }),

/***/ "./node_modules/icecast-metadata-player/src/players/HTML5Player.js":
/*!*************************************************************************!*\
  !*** ./node_modules/icecast-metadata-player/src/players/HTML5Player.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HTML5Player; });
/* harmony import */ var _global_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../global.js */ "./node_modules/icecast-metadata-player/src/global.js");
/* harmony import */ var _Player_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Player.js */ "./node_modules/icecast-metadata-player/src/players/Player.js");



class HTML5Player extends _Player_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(icecast) {
    super(icecast);

    this._audioElement.crossOrigin = "anonymous";
    this._audioElement.loop = false;
    this._audioElement.preload = "none";

    this.reset();
  }

  static canPlayType(mimeType) {
    return super.canPlayType((type) => new Audio().canPlayType(type), mimeType);
  }

  static get name() {
    return "html5";
  }

  get isAudioPlayer() {
    return true;
  }

  get metadataTimestamp() {
    return this._frame
      ? (this._frame.totalDuration + this._metadataTimestampOffset) / 1000
      : 0;
  }

  get currentTime() {
    return (
      this._audioLoadedTimestamp &&
      (performance.now() - this._audioLoadedTimestamp) / 1000
    );
  }

  async reset() {
    this._frame = null;
    this._metadataLoadedTimestamp = performance.now();
    this._audioLoadedTimestamp = 0;
    this._metadataTimestampOffset = 0;
    this._firedPlay = false;

    this._audioElement.removeAttribute("src");
    this._audioElement.src = this._endpoint;

    if (
      this._icecast.state !== _global_js__WEBPACK_IMPORTED_MODULE_0__["state"].STOPPING &&
      this._icecast.state !== _global_js__WEBPACK_IMPORTED_MODULE_0__["state"].STOPPED
    ) {
      this._audioElement.addEventListener(
        "playing",
        () => {
          this._audioLoadedTimestamp = performance.now();
          this._metadataTimestampOffset =
            performance.now() - this._metadataLoadedTimestamp;
        },
        { once: true }
      );

      if (!this._firedPlay) {
        this._icecast[_global_js__WEBPACK_IMPORTED_MODULE_0__["fireEvent"]](_global_js__WEBPACK_IMPORTED_MODULE_0__["event"].PLAY);
        this._firedPlay = true;
      }
    }
  }

  onStream(frames) {
    this._frame = frames[frames.length - 1] || this._frame;
  }
}


/***/ }),

/***/ "./node_modules/icecast-metadata-player/src/players/MediaSourcePlayer.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/icecast-metadata-player/src/players/MediaSourcePlayer.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MediaSourcePlayer; });
/* harmony import */ var mse_audio_wrapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mse-audio-wrapper */ "./node_modules/mse-audio-wrapper/src/MSEAudioWrapper.js");
/* harmony import */ var _global_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../global.js */ "./node_modules/icecast-metadata-player/src/global.js");
/* harmony import */ var _Player_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Player.js */ "./node_modules/icecast-metadata-player/src/players/Player.js");
/* harmony import */ var _FrameQueue_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../FrameQueue.js */ "./node_modules/icecast-metadata-player/src/FrameQueue.js");






const BUFFER = 5; // seconds of audio to store in SourceBuffer
const BUFFER_INTERVAL = 5; // seconds before removing from SourceBuffer

class MediaSourcePlayer extends _Player_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor(icecast, inputMimeType, codec) {
    super(icecast, inputMimeType, codec);

    this.reset();

    this._icecast.addEventListener(_global_js__WEBPACK_IMPORTED_MODULE_1__["event"].RETRY, () => {
      this._syncState = _global_js__WEBPACK_IMPORTED_MODULE_1__["NOT_SYNCED"];
    });
  }

  static canPlayType(mimeType) {
    const mapping = {
      mpeg: ['audio/mp4;codecs="mp3"'],
      aac: ['audio/mp4;codecs="mp4a.40.2"'],
      aacp: ['audio/mp4;codecs="mp4a.40.2"'],
      flac: ['audio/mp4;codecs="flac"'],
      ogg: {
        flac: ['audio/mp4;codecs="flac"'],
        opus: ['audio/mp4;codecs="opus"', 'audio/webm;codecs="opus"'],
        vorbis: ['audio/webm;codecs="vorbis"'],
      },
    };

    try {
      new MediaSource();
    } catch {
      return "";
    }
    if (MediaSource.isTypeSupported(mimeType)) return "probably";

    return super.canPlayType(MediaSource.isTypeSupported, mimeType, mapping);
  }

  static get name() {
    return "mediasource";
  }

  get isAudioPlayer() {
    return true;
  }

  get metadataTimestamp() {
    return (
      (this._mediaSource &&
        this._mediaSource.sourceBuffers.length &&
        Math.max(
          // work-around for WEBM reporting a negative timestampOffset
          this._mediaSource.sourceBuffers[0].timestampOffset,
          this._mediaSource.sourceBuffers[0].buffered.length
            ? this._mediaSource.sourceBuffers[0].buffered.end(0)
            : 0
        )) ||
      0
    );
  }

  get currentTime() {
    return this._audioElement.currentTime;
  }

  async reset() {
    this._syncState = _global_js__WEBPACK_IMPORTED_MODULE_1__["SYNCED"];
    this._frameQueue = new _FrameQueue_js__WEBPACK_IMPORTED_MODULE_3__["default"](this._icecast);
    this._sourceBufferQueue = [];
    this._firedPlay = false;

    this._mediaSourcePromise = this._prepareMediaSource(
      this._inputMimeType,
      this._codec
    );

    await this._mediaSourcePromise;
  }

  async onStream(frames) {
    frames = frames.flatMap((frame) => frame.codecFrames || frame);

    if (frames.length) {
      switch (this._syncState) {
        case _global_js__WEBPACK_IMPORTED_MODULE_1__["NOT_SYNCED"]:
          this._frameQueue.initSync();
          this._syncState = _global_js__WEBPACK_IMPORTED_MODULE_1__["SYNCING"];
        case _global_js__WEBPACK_IMPORTED_MODULE_1__["SYNCING"]:
          [frames] = this._frameQueue.sync(frames);
          if (frames.length) this._syncState = _global_js__WEBPACK_IMPORTED_MODULE_1__["SYNCED"];
      }

      this._frameQueue.addAll(frames);

      // when frames are present, we should already know the codec and have the mse audio mimetype determined
      await (
        await this._mediaSourcePromise
      )(frames); // wait for the source buffer to be created
    }
  }

  async _prepareMediaSource(inputMimeType, codec) {
    if (MediaSource.isTypeSupported(inputMimeType)) {
      // pass the audio directly to MSE

      await this._createMediaSource(inputMimeType);

      return async (frames) =>
        this._appendSourceBuffer(Object(_global_js__WEBPACK_IMPORTED_MODULE_1__["concatBuffers"])(frames.map((f) => f.data)));
    } else {
      // wrap the audio into fragments before passing to MSE
      const wrapper = new mse_audio_wrapper__WEBPACK_IMPORTED_MODULE_0__["default"](inputMimeType, {
        codec,
      });

      if (!MediaSource.isTypeSupported(wrapper.mimeType)) {
        this._icecast[_global_js__WEBPACK_IMPORTED_MODULE_1__["fireEvent"]](
          _global_js__WEBPACK_IMPORTED_MODULE_1__["event"].ERROR,
          `Media Source Extensions API in your browser does not support ${inputMimeType} or ${wrapper.mimeType}`,
          "See: https://caniuse.com/mediasource and https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API"
        );
        throw new Error(`Unsupported Media Source Codec ${wrapper.mimeType}`);
      }

      await this._createMediaSource(wrapper.mimeType);

      return async (codecFrames) => {
        const fragments = Object(_global_js__WEBPACK_IMPORTED_MODULE_1__["concatBuffers"])([...wrapper.iterator(codecFrames)]);

        await this._appendSourceBuffer(fragments);
      };
    }
  }

  async _createMediaSource(mimeType) {
    await new Promise(async (resolve) => {
      this._mediaSource = new MediaSource();
      this._audioElement.loop = false;
      this._audioElement.src = URL.createObjectURL(this._mediaSource);

      this._mediaSource.addEventListener("sourceopen", resolve, {
        once: true,
      });
    });

    this._sourceBufferRemoved = 0;
    this._mediaSource.addSourceBuffer(mimeType).mode = "sequence";
  }

  async _waitForSourceBuffer() {
    return new Promise((resolve) => {
      this._mediaSource.sourceBuffers[0].addEventListener(
        "updateend",
        resolve,
        {
          once: true,
        }
      );
    });
  }

  async _appendSourceBuffer(chunk) {
    this._icecast[_global_js__WEBPACK_IMPORTED_MODULE_1__["fireEvent"]](_global_js__WEBPACK_IMPORTED_MODULE_1__["event"].STREAM, chunk);

    if (!this._mediaSource.sourceBuffers.length) {
      this._icecast[_global_js__WEBPACK_IMPORTED_MODULE_1__["fireEvent"]](
        _global_js__WEBPACK_IMPORTED_MODULE_1__["event"].WARN,
        "Attempting to append audio, but MediaSource has not been or is no longer initialized",
        "Please be sure that `detachAudioElement()` was called and awaited before reusing the element with a new IcecastMetadataPlayer instance"
      );
    }

    if (
      this._icecast.state !== _global_js__WEBPACK_IMPORTED_MODULE_1__["state"].STOPPING &&
      this._mediaSource.sourceBuffers.length
    ) {
      this._sourceBufferQueue.push(chunk);

      try {
        do {
          this._mediaSource.sourceBuffers[0].appendBuffer(
            this._sourceBufferQueue[0]
          );
          await this._waitForSourceBuffer();
          this._sourceBufferQueue.shift();
        } while (this._sourceBufferQueue.length);
      } catch (e) {
        if (e.name !== "QuotaExceededError") throw e;
      }

      if (!this._firedPlay) {
        if (this._bufferLength <= this.metadataTimestamp) {
          this._icecast[_global_js__WEBPACK_IMPORTED_MODULE_1__["fireEvent"]](_global_js__WEBPACK_IMPORTED_MODULE_1__["event"].PLAY);
          this._firedPlay = true;
        } else {
          this._icecast[_global_js__WEBPACK_IMPORTED_MODULE_1__["fireEvent"]](_global_js__WEBPACK_IMPORTED_MODULE_1__["event"].BUFFER, this.metadataTimestamp);
        }
      }

      if (
        this._audioElement.currentTime > BUFFER + this._bufferLength &&
        this._sourceBufferRemoved + BUFFER_INTERVAL * 1000 < Date.now()
      ) {
        this._sourceBufferRemoved = Date.now();
        this._mediaSource.sourceBuffers[0].remove(
          0,
          this._audioElement.currentTime - BUFFER + this._bufferLength
        );
        await this._waitForSourceBuffer();
      }
    }
  }
}


/***/ }),

/***/ "./node_modules/icecast-metadata-player/src/players/Player.js":
/*!********************************************************************!*\
  !*** ./node_modules/icecast-metadata-player/src/players/Player.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Player; });
/* harmony import */ var _global_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../global.js */ "./node_modules/icecast-metadata-player/src/global.js");


class Player {
  constructor(icecast, inputMimeType, codec) {
    const instanceVariables = _global_js__WEBPACK_IMPORTED_MODULE_0__["p"].get(icecast);

    this._icecast = icecast;
    this._inputMimeType = inputMimeType;
    this._codec = codec;

    this._audioElement = instanceVariables[_global_js__WEBPACK_IMPORTED_MODULE_0__["audioElement"]];
    this._icecastMetadataQueue = instanceVariables[_global_js__WEBPACK_IMPORTED_MODULE_0__["icecastMetadataQueue"]];
    this._codecUpdateQueue = instanceVariables[_global_js__WEBPACK_IMPORTED_MODULE_0__["codecUpdateQueue"]];
    this._endpoint = instanceVariables[_global_js__WEBPACK_IMPORTED_MODULE_0__["endpoint"]];
    this._bufferLength = instanceVariables[_global_js__WEBPACK_IMPORTED_MODULE_0__["bufferLength"]];

    this._codecUpdateTimestamp = 0;
    this._codecUpdateOffset = 0;

    // set the audio element an empty source to enable the play button
    try {
      this._audioElement.removeAttribute("src");
      this._audioElement.srcObject = null;

      if (window.MediaSource) {
        // MediaSourcePlayer
        this._audioElement.src = URL.createObjectURL(new MediaSource());
      } else {
        // WebAudioPlayer
        this._mediaStream = new MediaStream();
        this._audioElement.srcObject = this._mediaStream;
      }
    } catch {
      // HTML5Player
      // mp3 32kbs silence
      this._audioElement.src =
        "data:audio/mpeg;base64,//sQxAAABFgC/SCEYACCgB9AAAAAppppVCAHBAEIgBByw9WD5+J8ufwxiDED" +
        "sMfE+D4fwG/RUGCx6VO4awVxV3qDtQNPiXKnZUNSwKuUDR6IgaeoGg7Fg6pMQU1FMy4xMDCqqqqqqqr/+xL" +
        "EB4PAAAGkAAAAIAAANIAAAASqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq" +
        "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqo=";

      this._audioElement.loop = true;
    }
  }

  static parseMimeType(mimeType) {
    return mimeType.match(
      /^(?:application\/|audio\/|)(?<mime>[a-zA-Z]+)(?:$|;[ ]*codecs=(?:\'|\")(?<codecs>[a-zA-Z,]+)(?:\'|\"))/
    );
  }

  static canPlayType(codecChecker, mimeType, mapping) {
    const matches = Player.parseMimeType(mimeType);

    const checkCodecs = (codecs) =>
      codecs.reduce((acc, codec) => {
        if (acc === "") return "";

        const result = codecChecker(codec);

        if (!result) return "";
        if (result === "maybe" || acc === "maybe") return "maybe";
        if (result === true || result === "probably") return "probably";
      }, null);

    if (matches) {
      const { mime, codecs } = matches.groups;

      const mimeMapping = mapping && mapping[mime];

      // mapping is a raw codec
      if (!mimeMapping || Array.isArray(mimeMapping)) {
        return (
          checkCodecs(mimeMapping || [mimeType]) || // check with the codec
          checkCodecs([`audio/${mime}`]) // check as a raw mimetype
        );
      }

      // mapping ia a container
      if (typeof mimeMapping === "object") {
        if (codecs) {
          const mimeCodecs = codecs.split(",");

          // multiple codecs are not supported
          if (mimeCodecs.length > 1) return "";
          if (!mimeMapping[mimeCodecs[0]]) return "";

          return checkCodecs(mimeMapping[mimeCodecs[0]]);
        }
        // container exists in list but no codecs were specified
        return "maybe";
      }
    }

    // codec not in the list
    return "";
  }

  /**
   * @abstract
   */
  get isAudioPlayer() {
    return false;
  }

  /**
   * @interface
   */
  get metadataTimestamp() {
    return 0;
  }

  /**
   * @interface
   */
  get currentTime() {
    return 0;
  }

  /**
   * @interface
   */
  async reset() {}

  /**
   * @abstract
   */
  onStream(frames) {
    return frames;
  }

  /**
   * @abstract
   */
  onMetadata(metadata) {
    this._icecastMetadataQueue.addMetadata(
      metadata,
      this.metadataTimestamp,
      this.currentTime
    );
  }

  /**
   * @abstract
   */
  onCodecUpdate(codecData, updateTimestamp) {
    const currentTime = this.currentTime;

    // add previous offset when reconnecting
    if (updateTimestamp < currentTime)
      this._codecUpdateOffset += this._codecUpdateTimestamp;

    this._codecUpdateTimestamp = updateTimestamp;

    this._codecUpdateQueue.addMetadata(
      { metadata: codecData, stats: {} },
      (updateTimestamp + this._codecUpdateOffset) / 1000,
      currentTime
    );
  }
}


/***/ }),

/***/ "./node_modules/icecast-metadata-player/src/players/WebAudioPlayer.js":
/*!****************************************************************************!*\
  !*** ./node_modules/icecast-metadata-player/src/players/WebAudioPlayer.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WebAudioPlayer; });
/* harmony import */ var opus_decoder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! opus-decoder */ "./node_modules/opus-decoder/index.js");
/* harmony import */ var mpg123_decoder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mpg123-decoder */ "./node_modules/mpg123-decoder/index.js");
/* harmony import */ var _FrameQueue_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../FrameQueue.js */ "./node_modules/icecast-metadata-player/src/FrameQueue.js");
/* harmony import */ var _global_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../global.js */ "./node_modules/icecast-metadata-player/src/global.js");
/* harmony import */ var _Player_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Player.js */ "./node_modules/icecast-metadata-player/src/players/Player.js");







class WebAudioPlayer extends _Player_js__WEBPACK_IMPORTED_MODULE_4__["default"] {
  constructor(icecast, inputMimeType, codec) {
    super(icecast, inputMimeType, codec);

    this._icecast.addEventListener(_global_js__WEBPACK_IMPORTED_MODULE_3__["event"].RETRY, () => {
      this._syncState = _global_js__WEBPACK_IMPORTED_MODULE_3__["NOT_SYNCED"];
    });
    this._icecast.addEventListener(_global_js__WEBPACK_IMPORTED_MODULE_3__["event"].STREAM_START, () => {
      if (!this._wasmDecoder) this._getWasmDecoder();
    });

    this._getWasmDecoder();

    // set up audio context once
    // audio context needs to be reused for the life of this instance for safari compatibility
    this._getAudioContext();

    this.reset();
  }

  static canPlayType(mimeType) {
    const mapping = {
      mpeg: ["audio/mpeg"],
      ogg: {
        opus: ['audio/ogg;codecs="opus"'],
      },
    };

    if (!window.WebAssembly) return "";
    if (!(window.AudioContext || window.webkitAudioContext)) return "";
    if (!window.MediaStream) return "";

    return super.canPlayType(
      (codec) => codec === 'audio/ogg;codecs="opus"' || codec === "audio/mpeg",
      mimeType,
      mapping
    );
  }

  static get name() {
    return "webaudio";
  }

  get isAudioPlayer() {
    return true;
  }

  get metadataTimestamp() {
    return this._currentTime / 1000;
  }

  get currentTime() {
    return (Date.now() - this._startTime) / 1000 || 0;
  }

  _getWasmDecoder() {
    switch (this._codec) {
      case "mpeg":
        this._wasmDecoder = new mpg123_decoder__WEBPACK_IMPORTED_MODULE_1__["MPEGDecoderWebWorker"]();
        break;
      case "opus":
        this._wasmDecoder = new opus_decoder__WEBPACK_IMPORTED_MODULE_0__["OpusDecoderWebWorker"]();
        break;
    }

    this._wasmReady = this._wasmDecoder.ready;
  }

  _getAudioContext() {
    const audioContextParams = {
      latencyHint: "playback",
    };

    this._audioContext = window.AudioContext
      ? new AudioContext(audioContextParams)
      : new window.webkitAudioContext(audioContextParams);

    // hack for iOS to continue playing while locked
    this._audioContext
      .createScriptProcessor(2 ** 14, 2, 2)
      .connect(this._audioContext.destination);

    this._audioContext.resume();
    this._audioContext.onstatechange = () => {
      if (this._audioContext !== "running") this._audioContext.resume();
    };
  }

  async reset() {
    this._syncState = _global_js__WEBPACK_IMPORTED_MODULE_3__["SYNCED"];
    this._syncSuccessful = false;
    this._frameQueue = new _FrameQueue_js__WEBPACK_IMPORTED_MODULE_2__["default"](this._icecast);

    this._currentTime = 0;
    this._decodedSample = 0;
    this._decodedSampleOffset = 0;
    this._sampleRate = 0;
    this._startTime = undefined;
    this._firedPlay = false;

    if (
      this._icecast.state === _global_js__WEBPACK_IMPORTED_MODULE_3__["state"].STOPPING ||
      this._icecast.state === _global_js__WEBPACK_IMPORTED_MODULE_3__["state"].STOPPED
    ) {
      if (this._wasmDecoder) {
        const decoder = this._wasmDecoder;
        this._wasmReady.then(() => {
          decoder.free();
        });
        this._wasmDecoder = null;
      }

      if (this._mediaStream) {
        // disconnect the currently playing media stream
        this._mediaStream.disconnect();
        this._mediaStream = null;
      }

      this._audioElement.srcObject = new MediaStream();
    }
  }

  async onStream(oggPages) {
    let frames = oggPages.flatMap((oggPage) => oggPage.codecFrames || oggPage);

    switch (this._syncState) {
      case _global_js__WEBPACK_IMPORTED_MODULE_3__["NOT_SYNCED"]:
        this._frameQueue.initSync();
        this._syncState = _global_js__WEBPACK_IMPORTED_MODULE_3__["SYNCING"];
      case _global_js__WEBPACK_IMPORTED_MODULE_3__["SYNCING"]:
        [frames, this._syncSuccessful] = this._frameQueue.sync(frames);

        if (frames.length) {
          this._syncState = _global_js__WEBPACK_IMPORTED_MODULE_3__["SYNCED"];

          if (!this._syncSuccessful) await this.reset();
        }
      case _global_js__WEBPACK_IMPORTED_MODULE_3__["SYNCED"]:
        if (frames.length) {
          this._currentTime = frames[frames.length - 1].totalDuration;

          await this._wasmReady;
          this._decodeAndPlay(frames);
        }
      default:
        this._frameQueue.addAll(frames); // always add frames
    }
  }

  async _decodeAndPlay(frames) {
    const { channelData, samplesDecoded, sampleRate } =
      await this._wasmDecoder.decodeFrames(frames.map((f) => f.data));

    if (
      this._icecast.state !== _global_js__WEBPACK_IMPORTED_MODULE_3__["state"].STOPPING &&
      this._icecast.state !== _global_js__WEBPACK_IMPORTED_MODULE_3__["state"].STOPPED &&
      samplesDecoded
    ) {
      this._icecast[_global_js__WEBPACK_IMPORTED_MODULE_3__["fireEvent"]](_global_js__WEBPACK_IMPORTED_MODULE_3__["event"].STREAM, {
        channelData,
        samplesDecoded,
        sampleRate,
      });

      if (!this._sampleRate) {
        this._sampleRate = sampleRate;

        this._mediaStream = this._audioContext.createMediaStreamDestination();
        this._audioElement.srcObject = this._mediaStream.stream; // triggers canplay event
      }

      const decodeDuration =
        (this._decodedSample + this._decodedSampleOffset) / this._sampleRate;

      if (decodeDuration < this._audioContext.currentTime) {
        // audio context time starts incrementing immediately when it's created
        // offset needs to be accounted for to prevent overlapping sources
        this._decodedSampleOffset += Math.floor(
          this._audioContext.currentTime * this._sampleRate
        );
      }

      const audioBuffer = this._audioContext.createBuffer(
        channelData.length,
        samplesDecoded,
        this._sampleRate
      );

      channelData.forEach((channel, idx) =>
        audioBuffer.getChannelData(idx).set(channel)
      );

      const source = this._audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(this._mediaStream);
      source.start(decodeDuration);

      if (!this._firedPlay) {
        if (this._bufferLength <= this.metadataTimestamp) {
          this._icecast[_global_js__WEBPACK_IMPORTED_MODULE_3__["fireEvent"]](_global_js__WEBPACK_IMPORTED_MODULE_3__["event"].PLAY);
          this._startTime = Date.now();
          this._firedPlay = true;
        } else {
          this._icecast[_global_js__WEBPACK_IMPORTED_MODULE_3__["fireEvent"]](_global_js__WEBPACK_IMPORTED_MODULE_3__["event"].BUFFER, this.metadataTimestamp);
        }
      }

      this._decodedSample += samplesDecoded;
    }
  }
}


/***/ }),

/***/ "./node_modules/icecast-metadata-stats/src/IcecastMetadataStats.js":
/*!*************************************************************************!*\
  !*** ./node_modules/icecast-metadata-stats/src/IcecastMetadataStats.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return IcecastMetadataStats; });
/* harmony import */ var icecast_metadata_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! icecast-metadata-js */ "./node_modules/icecast-metadata-js/browser.js");
/**
 * @license
 * @see https://github.com/eshaz/icecast-metadata-js
 * @copyright 2021 Ethan Halsall
 *  This file is part of icecast-metadata-stats.
 *
 *  icecast-metadata-stats free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Lesser General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  icecast-metadata-stats distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Lesser General Public License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>
 */



const noOp = () => {};

const STOPPED = "stopped";
const RUNNING = "running";
const FETCHING = "fetching";

const p = new WeakMap();

// variables
const icyController = Symbol();
const icyFetchStatus = Symbol();

const oggController = Symbol();
const oggFetchStatus = Symbol();

const icestatsEndpoint = Symbol();
const icestatsController = Symbol();
const icestatsFetchStatus = Symbol();

const statsEndpoint = Symbol();
const statsController = Symbol();
const statsFetchStatus = Symbol();

const nextsongsEndpoint = Symbol();
const nextsongsController = Symbol();
const nextsongsFetchStatus = Symbol();

const sevenhtmlEndpoint = Symbol();
const sevenhtmlController = Symbol();
const sevenhtmlFetchStatus = Symbol();

const streamEndpoint = Symbol();
const icyMetaInt = Symbol();
const icyDetectionTimeout = Symbol();
const sources = Symbol();
const interval = Symbol();
const onStats = Symbol();
const onStatsFetch = Symbol();

const state = Symbol();
const intervalId = Symbol();

// methods
const fetchStats = Symbol();
const getStreamMetadata = Symbol();

class IcecastMetadataStats {
  /**
   * @constructor
   * @param {URL} endpoint Stream endpoint
   * @param {object} [options] Options object
   *
   * @callback [options.onStats] Called when the automatic query completes
   * @callback [options.onStatsFetch] Called when the automatic query begins
   * @param {Array} [options.sources] List of sources to automatically query ["icy", "ogg", "icestats", "stats", "sevenhtml", "nextsongs"]
   * @param {number} [options.interval] Time in seconds to wait between automatically queries
   * @param {URL} [options.icestatsEndpoint] Endpoint for the `status-json.xsl` source
   * @param {URL} [options.statsEndpoint] Endpoint for the `stats` source
   * @param {URL} [options.nextsongsEndpoint] Endpoint for the `nextsongs` source
   * @param {URL} [options.sevenhtmlEndpoint] Endpoint for the `7.html` source
   * @param {number} [options.icyMetaInt] Manually sets the ICY metadata interval
   * @param {number} [options.icyDetectionTimeout] Time in milliseconds to search for ICY metadata
   */
  constructor(endpoint, options = {}) {
    const serverPath = endpoint.split("/").slice(0, -1).join("/");

    // prettier-ignore
    p.set(this, {
      [streamEndpoint]: endpoint,
      [icestatsEndpoint]: options.icestatsEndpoint || `${serverPath}/status-json.xsl`,
      [statsEndpoint] : options.statsEndpoint || `${serverPath}/stats`,
      [nextsongsEndpoint] : options.nextsongsEndpoint || `${serverPath}/nextsongs`,
      [sevenhtmlEndpoint] : options.sevenhtmlEndpoint || `${serverPath}/7.html`,
      [sources]: options.sources || [],
      [interval]: (options.interval || 30) * 1000,
      [onStats]: options.onStats || noOp,
      [onStatsFetch]: options.onStatsFetch || noOp,
      [icyMetaInt]: options.icyMetaInt,
      [icyDetectionTimeout]: options.icyDetectionTimeout,
      [icyController]: new AbortController(),
      [oggController]: new AbortController(),
      [icestatsController]: new AbortController(),
      [statsController]: new AbortController(),
      [nextsongsController]: new AbortController(),
      [sevenhtmlController]: new AbortController(),
      [state]: STOPPED,
    });
  }

  static xml2Json(xml) {
    const deserialize = (xml) =>
      new DOMParser().parseFromString(xml, "application/xml");

    const serialize = (element) => {
      if (!element.children.length) {
        return Number.isNaN(Number(element.innerHTML))
          ? element.innerHTML
          : Number(element.innerHTML);
      }

      const json = {};

      for (const child of element.children) {
        if (child.nodeName in json) {
          if (Array.isArray(json[child.nodeName])) {
            json[child.nodeName].push(serialize(child));
          } else {
            json[child.nodeName] = [json[child.nodeName], serialize(child)];
          }
        } else {
          json[child.nodeName] = serialize(child);
        }
      }

      return json;
    };

    return serialize(deserialize(xml));
  }

  /**
   * @returns The current state ["stopped", "running", "fetching"]
   */
  get state() {
    return p.get(this)[state];
  }

  /**
   * @returns The generated `status-json.xsl` endpoint
   */
  get icestatsEndpoint() {
    return p.get(this)[icestatsEndpoint];
  }

  /**
   * @returns The generated `stats` endpoint
   */
  get statsEndpoint() {
    return p.get(this)[statsEndpoint];
  }

  /**
   * @returns The generated `nextsongs` endpoint
   */
  get nextsongsEndpoint() {
    return p.get(this)[nextsongsEndpoint];
  }

  /**
   * @returns The generated `7.html` endpoint
   */
  get sevenhtmlEndpoint() {
    return p.get(this)[sevenhtmlEndpoint];
  }

  /**
   * @description Starts automatically fetching stats
   */
  start() {
    if (p.get(this)[state] === STOPPED) {
      p.get(this)[state] = RUNNING;

      this.fetch().then(p.get(this)[onStats]);

      p.get(this)[intervalId] = setInterval(() => {
        this.fetch().then(p.get(this)[onStats]);
      }, p.get(this)[interval]);
    }
  }

  /**
   * @description Stops automatically fetching stats and cancels any inprogress stats
   */
  stop() {
    if (p.get(this)[state] !== STOPPED) {
      p.get(this)[state] = STOPPED;

      clearInterval(p.get(this)[intervalId]);
      p.get(this)[icyController].abort();
      p.get(this)[oggController].abort();
      p.get(this)[icestatsController].abort();
      p.get(this)[statsController].abort();
      p.get(this)[sevenhtmlController].abort();
    }
  }

  /**
   * @description Manually fetches stats from the sources passed in to the `options.sources` parameter
   * @async
   * @returns {object} Object containing the stats from the sources
   */
  async fetch() {
    if (p.get(this)[state] !== FETCHING) {
      const oldState = p.get(this)[state];

      p.get(this)[state] = FETCHING;
      p.get(this)[onStatsFetch](p.get(this)[sources]);

      const promises = [];
      if (p.get(this)[sources].includes("icestats"))
        promises.push(this.getIcestats());
      if (p.get(this)[sources].includes("sevenhtml"))
        promises.push(this.getSevenhtml());
      if (p.get(this)[sources].includes("stats"))
        promises.push(this.getStats());
      if (p.get(this)[sources].includes("nextsongs"))
        promises.push(this.getNextsongs());
      if (p.get(this)[sources].includes("icy"))
        promises.push(this.getIcyMetadata());
      if (p.get(this)[sources].includes("ogg"))
        promises.push(this.getOggMetadata());

      const stats = await Promise.all(promises).then((stats) =>
        stats.reduce((acc, stat) => ({ ...acc, ...stat }), {})
      );

      p.get(this)[state] =
        p.get(this)[state] !== FETCHING ? p.get(this)[state] : oldState;

      return stats;
    }
  }

  /**
   * @description Fetches the data from the `/status-json.xsl` endpoint
   * @async
   * @returns {object} Object containing results of `/status-json.xsl`
   */
  async getIcestats() {
    return this[fetchStats]({
      status: icestatsFetchStatus,
      endpoint: icestatsEndpoint,
      controller: icestatsController,
      mapper: (res) => res.json(),
    }).then((stats) => ({ icestats: stats && stats.icestats }));
  }

  /*
  <HTML><meta http-equiv="Pragma" content="no-cache"></head><body>350,1,132,1000,41,128,Dj Mixes Sety</body></html>
  ,141,1000,50,128,Gra AutoPilot audycje Energy 2000</body></html>
  ,27,1000,8,128,Gra Wavelogic audycje Rave With The Wave</body></html>
  ,578,1000,233,128,youtube.com/RadioPartyOfficial</body></html>
  ,15,1000,5,64,youtube.com/RadioPartyOfficial</body></html>
  */

  // http://wiki.winamp.com/wiki/SHOUTcast_DNAS_Server_2_XML_Reponses#Equivalent_of_7.html
  // CURRENTLISTENERS STREAMSTATUS PEAKLISTENERS MAXLISTENERS UNIQUELISTENERS BITRATE SONGTITLE

  /**
   * @description Fetches the data from the `/7.html` endpoint
   * @async
   * @returns {object} Object containing results of `/7.html`
   */
  async getSevenhtml() {
    return this[fetchStats]({
      status: sevenhtmlFetchStatus,
      endpoint: sevenhtmlEndpoint,
      controller: sevenhtmlController,
      mapper: async (res) =>
        (await res.text()).match(/(.*?)<\/body>/gi).map((s) => {
          const stats = s
            .match(/(<body>|,)(?<stats>.*)<\/body>/i)
            .groups.stats.split(",");

          return stats.length === 7
            ? {
                StreamTitle: stats[6],
                currentListeners: parseInt(stats[4]),
                peakListeners: parseInt(stats[2]),
                maxListeners: parseInt(stats[3]),
                bitrate: parseInt(stats[5]),
                status: parseInt(stats[1]),
                serverListeners: parseInt(stats[0]),
              }
            : {
                StreamTitle: stats[4],
                currentListeners: parseInt(stats[2]),
                peakListeners: parseInt(stats[0]),
                maxListeners: parseInt(stats[1]),
                bitrate: parseInt(stats[3]),
              };
        }),
    }).then((sevenhtml) => ({
      sevenhtml,
    }));
  }

  // http://wiki.winamp.com/wiki/SHOUTcast_DNAS_Server_2_XML_Reponses#General_Server_Summary
  /**
   * @description Fetches the data from the `/stats` endpoint
   * @async
   * @returns {object} Object containing results of `/stats`
   */
  async getStats() {
    return this[fetchStats]({
      status: statsFetchStatus,
      endpoint: statsEndpoint,
      controller: statsController,
      mapper: async (res) =>
        IcecastMetadataStats.xml2Json(await res.text()).SHOUTCASTSERVER
          .STREAMSTATS,
    }).then((stats) => ({
      stats,
    }));
  }

  // http://wiki.winamp.com/wiki/SHOUTcast_DNAS_Server_2_XML_Reponses#Nextsongs
  /**
   * @description Fetches the data from the `/nextsongs` endpoint
   * @async
   * @returns {object} Object containing results of `/nextsongs`
   */
  async getNextsongs() {
    return this[fetchStats]({
      status: nextsongsFetchStatus,
      endpoint: nextsongsEndpoint,
      controller: nextsongsController,
      mapper: async (res) =>
        IcecastMetadataStats.xml2Json(await res.text()).SHOUTCASTSERVER
          .NEXTSONGS,
    }).then((nextsongs) => ({
      nextsongs,
    }));
  }

  /**
   * @description Fetches the first ICY metadata update from the stream
   * @async
   * @returns {object} Object containing ICY metadata
   */
  async getIcyMetadata() {
    return this[getStreamMetadata]({
      status: icyFetchStatus,
      endpoint: streamEndpoint,
      controller: icyController,
      metadataType: "icy",
      headers: { "Icy-MetaData": 1 },
    });
  }

  /**
   * @description Fetches the first Ogg metadata update from the stream
   * @async
   * @returns {object} Object containing Ogg metadata
   */
  async getOggMetadata() {
    return this[getStreamMetadata]({
      status: oggFetchStatus,
      endpoint: streamEndpoint,
      controller: oggController,
      metadataType: "ogg",
    });
  }

  async [getStreamMetadata]({
    status,
    endpoint,
    controller,
    headers,
    metadataType,
  }) {
    return this[fetchStats]({
      status,
      endpoint,
      controller,
      headers,
      mapper: async (res) =>
        new Promise((resolve) => {
          new icecast_metadata_js__WEBPACK_IMPORTED_MODULE_0__["IcecastReadableStream"](res, {
            onMetadata: ({ metadata }) => {
              p.get(this)[controller].abort();
              resolve(metadata);
            },
            onMetadataFailed: () => {
              p.get(this)[controller].abort();
              resolve();
            },
            metadataTypes: metadataType,
            icyMetaInt: p.get(this)[icyMetaInt],
            icyDetectionTimeout: p.get(this)[icyDetectionTimeout],
          }).startReading();
        }),
    }).then((metadata) => ({ [metadataType]: metadata }));
  }

  async [fetchStats]({ status, endpoint, controller, mapper, headers = {} }) {
    if (!p.get(this)[status]) {
      p.get(this)[status] = true;
      return fetch(p.get(this)[endpoint], {
        method: "GET",
        headers,
        signal: p.get(this)[controller].signal,
      })
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
          return res;
        })
        .then(mapper)
        .catch((e) => {
          if (e.name !== "AbortError") {
            console.warn(`Failed to fetch ${p.get(this)[endpoint]}`, e);
          }
        })
        .finally(() => {
          p.get(this)[status] = false;
          p.get(this)[controller] = new AbortController();
        });
    }
  }
}


/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/isarray/index.js":
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "./node_modules/mpg123-decoder/index.js":
/*!**********************************************!*\
  !*** ./node_modules/mpg123-decoder/index.js ***!
  \**********************************************/
/*! exports provided: MPEGDecoder, MPEGDecoderWebWorker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_MPEGDecoder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/MPEGDecoder.js */ "./node_modules/mpg123-decoder/src/MPEGDecoder.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MPEGDecoder", function() { return _src_MPEGDecoder_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _src_MPEGDecoderWebWorker_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/MPEGDecoderWebWorker.js */ "./node_modules/mpg123-decoder/src/MPEGDecoderWebWorker.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MPEGDecoderWebWorker", function() { return _src_MPEGDecoderWebWorker_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });







/***/ }),

/***/ "./node_modules/mpg123-decoder/src/EmscriptenWasm.js":
/*!***********************************************************!*\
  !*** ./node_modules/mpg123-decoder/src/EmscriptenWasm.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EmscriptenWASM; });
/* **************************************************
 * This file is auto-generated during the build process.
 * Any edits to this file will be overwritten.
 ****************************************************/

class EmscriptenWASM {
constructor(WASMAudioDecoderCommon) {
var Module = Module;

function out(text) {
 console.log(text);
}

function err(text) {
 console.error(text);
}

function ready() {}

Module = {};

function abort(what) {
 throw what;
}

for (var base64ReverseLookup = new Uint8Array(123), i = 25; i >= 0; --i) {
 base64ReverseLookup[48 + i] = 52 + i;
 base64ReverseLookup[65 + i] = i;
 base64ReverseLookup[97 + i] = 26 + i;
}

base64ReverseLookup[43] = 62;

base64ReverseLookup[47] = 63;

function base64Decode(b64) {
 var b1, b2, i = 0, j = 0, bLength = b64.length, output = new Uint8Array((bLength * 3 >> 2) - (b64[bLength - 2] == "=") - (b64[bLength - 1] == "="));
 for (;i < bLength; i += 4, j += 3) {
  b1 = base64ReverseLookup[b64.charCodeAt(i + 1)];
  b2 = base64ReverseLookup[b64.charCodeAt(i + 2)];
  output[j] = base64ReverseLookup[b64.charCodeAt(i)] << 2 | b1 >> 4;
  output[j + 1] = b1 << 4 | b2 >> 2;
  output[j + 2] = b2 << 6 | base64ReverseLookup[b64.charCodeAt(i + 3)];
 }
 return output;
}

Module["wasm"] = WASMAudioDecoderCommon.inflateYencString(`ç5¦§åIÓ§NGÜN8=Mª½³-Óü>¥U¸=Mfª.¼6¤jSÎ¼Ë»=M¢ì~À>.m§±s«êCFmiü¢ÄyY¯PîÄ ,mÊË´5>ü\`ÏËúÃzl¦éé)%rà½õfh=MnçÈ)$Ù)$é	;0k:¨gö´ÑÐÐìÓÅL%7yêÎ%ÆæÓn,Á¼ÙþN)¾ª~þÎ|Ò²ª½½fôtø]EçÓI.Éûî~bk=JnåòSl8%ÆÚÄ#Ëèsè!Ð¼Tþ¿BvjX¾WYZºÙï/~{W¦"J!WkiéévÝ	Fèÿl¨O2#§Å'ègÒ¥z³9®¡¯{W¶½ÍHÊ;7~Dç$=JzþÝÜÕevï{z5ÍÊ¡b7äÔßRØ±ßJxÌbX¯kF !|>1ûgY³íÝõ·<O§Ë¬|S²\\éB1+ú®kOØp$?nëÜb¿ôW°7tBxqý{Ïø¢Qè)¾~ùÓ¯éD/Ú[F5G°e­N¦qé±e­­"ë®7ìJ9½56!±%ìóçM=})ùå	AèQ&©'Øeìaãñ¢?vç ¡·õÙçGeñpa'÷©«çmé§#ØùÌÒîbqÍ×¦uè ¼çÈÀ	næ^òÅâPòÑ[óÐüJ7=@1ÏfFuuåX3Øt­ß{é¨×Öc)w:Ötç[Ç0MëÐâÓªÖÏÏvu£änû·º®´ÑÉ7ÍÞ[Ô;ìÍnÔ#áOÎríæ¡^9¿TÏ&fæ¬ú§ú´=}ÄÍ¬^ø­,ãÕ#¦ÔÁß{Ó?Ï«êEÿ\\4·8Ïà0¹vc»¿#¶ð©½LÌÞ¦^Ë¶^^×>Ç±Í!y´yü²ò9çìüîÁ.k¼ðóoÓsänZÀ*Õ^ü(Á¹¿ðMAG	ÏÀüÇMýïéÓ§×Ø^rÄ¶Î1÷Þ¥ÎjÕù°Ó^Üê»&ófÕ{¥(ótÞ-4&ó_=MÄ¯YÁ_¦¦É ¨aÖ»¹¦räéÿÿ²óßê+o,jÁUÊþ{jDál?<XÔø'ÔÌ^=@ý±ÉJæÿ_<ºÈ«rw[@V@´Ë'×rSüÑSôm_%|5j&Í%a|¤OiH¶¼kÃ¼^ã\`U9éUW¿qQ¸æ¡Ö½aýÕÆø·	¶@àÂ«æ»ËÒñlá'ÅSÔµÔ{öíB¿à­ØÄà_ù?Å0.[^ã½ç6rD|ÄöÀ=}¡êNækâ©7QQRLçÕÿ½PoBúw'S:ãVWìå}Ï+¾õÙitHôv9ÉÊH(ÍÁ=@·qýÞ3.Ï'}/7úgT²óÆ s%Öêh)(Öùôx³=}=J.íuÍ£¾sEú©Ä	NïymM¼ä^kUÀÏ'I¡ï·qQ.l\\*à>b-´ü+¼p¹¼4 Ô- Êw:ýÅ8KÎ=JµxÁx_æÁüK<|ÏwÃÂÊdÔD'=}&õ´ShI]0IÞôìòÀ-×®_:ïötf#2­ÓðqU=@¦érÕ ß¾äsIPûNS¬tk¤[&"diÃ¿FÖ²öy0ÍÃ~óýûÖTæ¼äùPÀÐ=@¦sÛ2¥eaº=@ù·%q¬IÿÔÉ('jOfWU¼ËL^*¢H_ß+½ÏÍMEù\\Ýÿ¨W÷4îù,dr+¾Ð¨Âòl¤ÀÒØ¾¶ïñ¼UíèL±à±}ÖGÊ=}ºjÕ=J$®'Ûü9®SòÂWm;ÅjóÚ'h:û$JÌ{fl·2"Ä_ãènO7Úædè{É ÂÍE¿Aju£a'ç÷¢ÇÖ¸m~à±Ës¼i³ì\\_DõßexEý¡cÉF3$Üà³by²½²¢þÞÃ°Tp_]Ò¢^Ý7½ft¦\`ÍÖNvuôtÏÀ?Æêèô°b[ÈpôòÒ×\`·,Ót+}_0 æ±wí\`&Ö^¢¥pýü×´ ¹	//¼y6ÁÒ£Îº)òÖ5WnãbóæÞÅ=M©Ì%ìIûý#;òñé©öÚ;Êi¤¨pcs0·ô2ý¬t­UOóåìNµò=MT\`ß\\Ô\\á¯ÖÜÎm³¿¾îPÜäya=MHÐÏs'ó3Üþ"×U{=@ÙjXÁ8Îm»s:A«²A÷á¸Hçõg\`ËY1ó}ûÖî¤QD¹Gßoy¡~}bÌ¼ÏbÒÕ2êpÖ.xúæ³U|PÃWkonÔaòÙâäe²àðº*èéÜ´òÃÆ³[[È-å¤"ÑaÐKôÉð^d¤JÕ§ðý'jÕ4,MF«~ý²ñ\`ôÄÕB·¨]Çÿþº¿äÕV9ÅÝ¤@à+%¼'RF.Â¦¤ä2÷Ü^qì-^Õ*ôû!}	<£¼k«O;ÔªR/hWÔæòBµÛ=}r!6A¿Ø84ÿ#\`*í ªqÁ¡­¦jË×|]\\;Ë¶é7[2ã£»<]Ù¸jü£*ôSìó4A9ú¶;ZØ\\ÐªÕÖÒqrË,U2Å¶å³]Gû¼_v3ý¦sþH:=MHvT<3ø·º¯ªfw"ïTÔ7ÏÈ¸Ä7µ|°½K}6â²r3^GDh{DÀnöhç®Â_ÄºG[»ÏÙr³¹x=@Bg\\ÅèdpôEA§ã×lÅÒ·µæô!$oSoâ =}ß9Ïã­é>ÀSÿ´g§ÅVô=@#4oûp° ºÇDÝ^èSy\\²ñn±A#Ìr½Öõ2ÞY]3RÉ\`ÙÞÞù+ÊÒ_¡-óÑtrÝýî¨ØE°ì>WÌBäéÝèJ¾Ú¯mmÕp¹ày:ß p­Ì"dGU¬=J´=M}U®Ú$1«@ FÄU~^EÅ'¿xq.}v6¢ny½÷rRÇürV|8YdßÎ{|Ì=Møa²SP>n~xÔþTbCd/mÅÓén·ìdVÈºD·z\\´ÊÞ4£Nôò+Úë²Þºt%=}=@¨[1.1§n·dI]­ao¥«ÊUWÿæÖyCÛª:=@m·¶åÒ\`Õ©µ¥Pú6©f­ß8Úþfì=}Û{tJzÑ%b[ÍàWLmí-º¡Ì@oÜ´zgJÎ|Fù+¾k¾ Hâ«YEª)o!0³&¹l¹d~g'Uìÿ»ÅF¬ÊYedüûÀÝ¤=M.¦iq½2þÂÿqcZÍC{5ÿø^|\\rtß|¯ebÒa:J:ábôJíÛ©u¸®¦ròwz^¿i&%Ê0eBIy)±Ú#4ñÁIs@z³â3"øóÙq[Æ½¯GÆzÒ´:x¯À	Ä¿=@{§Æ)Ûsn¥±e©ñ­xÊ_=}=MdrD¾qªúªX5yA&-ÖN\\´¬çt6Ã: ­JûMô=MU³¶Ò]%CêóÕXËî bºìï÷Cõ=M;ÆàMeó¢!(øö Db03l¦þ*¯Râã\`9;Ñµ¸Âÿoì¿®mûHw!ú8ÿé7ß	AoÓ;úå\\2Ry¢8äßcs¹´Î¯àïüÇº¤^m}Á±°eO;ÏÐT=MéQP¯®ø6±]'ºJ ñY\`¨¦¹G0õ¿©yc¾°pXS)E"÷W±9ÓM9½Ù'³»Iè$àÁéÎ!ó!ö	¢úmÉxØ8ML¯G=@(yí¾%ùH¦ùI'K¡©5	"HßÙ%ÇIçç÷èeàF Ù)y	íIRLbn	³^GQäDföÆÚm"b"¹¨&ÉRíõ¬¤µà&Y\\ilòé±Ä-°pih¡%tpghÎ|(×9h[âã'à©þÔùAYÌ­­8ÑÏm÷«­àOã¯}3¨âzº ä¹*Õõ	fHÕNôyfø¸@ÙVô9HÌ¬¯á's¿}=}\`y®ôML¢ÒGÒTGI=@ßê'LgF©½»×·\`YX!î+öö#·4&±»XÊôÜë®½ÅW0ó©O=MS¡ûÖ#ùìcG¹äàá2)%½«BtûòÏ¡CyÊÊ·YÇÚ¸SèÉcC&æ :Á\\rbÂÎJ½òBÁ2KÀM=@;¢c v$Ö¼N¦íC.Ò¸G=J]=JmeàÃCt^fl¯G+QIâ*8{4ø¸ã÷2eno÷²2[Dß¹úà¤eÜ4g7¢KÌÆj2±±Fîk=MLÊ+¯ÅN <¤rÏïóY¿/ÍåbTâmôÚá°:ç_¯|×bð°®ß"þ À¶|!àÞðç×B×\`ìÐàá7EÍ7·ûïðÝ¥åSWdÐ'Ààknvrº3Blm5ú±ãZ½Ò_Ürrñòäælá3m57¡.Ws¥]^»¡çëÂ@~u+wv«ÑE9+D;e¨Z!i;âë\`=}:¢Ö¡ÚWº½ç¬µQ~´Û|ÁP"Ê'cÆiÕN#GáÏGöQ¬¿	W¼O®#=JÚ XsAv£¨ØHøÉ_À±kzGgdñ8Q©QFÑÑ0¬_ðsf ©ðé*¾0uqôE°®TC°ÉF4mâqÄ\\DÄY×´xþÊ+º¯B{VÇi³x»¯ÝÅ²Ç{µüÖW«Ý]$±RGã=Jøi=}FOäÛÞæQpû$ß=M¡Ò=}\\ÝmÝq?Æ±×¼ÁM¯IÊo=}&[¨®mjC,d]ÍÊÏî¹â]8l¤dê¿?lFxÌcæÇEÿ¶ üE,GçÛØ¸Ð¯Ñ¡ÿZDçÍéGíç£À{ST}²(r,Æq¼î¼¾7Ý"ô\\Za"[v<EI9{»RÐËØþIïÕBÇ/»ÈV¤æQlq³Ón{ìYÕ°Ýd7}.cùzåZ.\\'y4HÑó-qÊµôr4áãóúºÖÅLbn((pàz«Wµ»îáusyü´ú6ÆÃ=@6G×Sä;3ÐX!Ûïc\\å³Eâodsoy¸w»gV\\xRE:.|¶ I7þ;¬po°aôqÜòµùC®\\Ý}ÖsÁ;t UÈZãGÒJÕ¸cT³¥B,^àÍI&=MÉ­6$±X¨÷7ºú:u(ÉHæ%%§²^ù'&§($	¬\`ÍÌ©^&ëé!À§®é 1yg¥©åÃæ&Á/I}a8©dyz9m=M£¯¢QyxgØÊ=}â¨ØÚ9ÌÑ±ØBy¨FonæZÞ±Õf?áXuk³Dö=J~úk³\`)ÐX§5§2Aº~-1óOÏ2epBklÕ½lMi>~¢2ÔÐÒÕw¤#äèX${ÈÀôßÔ@òUÕèQßþßz¿MéÆ=@,eZx+µÚòVÍçå¥E¨A+6ÌLg_ nò|²Pk´d0L¨ç3AÎã­¢ä;Qq"{c@=}¸?&ÜFù Ù=M¦Xq&CîHz&4¤­¨îÄ|òÇð=}üÃáaS|ÒÚE¦TU¡K¿çD~J>_æn=MÃÂ¡MÐÆâÙõ²ZÚÞ=M¾m¤:¾&Mæº}jDÆA¯Éð=MüvêâGfXøäÜò@5ªâ¶ñäVÃóÔÅKV=@ÕñÄÖ[½\`m4´¹ñv=@áCÌól±:ùùøÄóÜC´¹×?XÜ³ÖºqMEÆó°\`-Ü¯=@ÜÝRUÜÅOQb9øLåý?]r)]C)¡¸à;à\\h½WÜ¼dãpwÒ°lh.íÔ,°R}*üîÃv³\`uë*Þ©p6£AºÖê,ÀØ,+­]CïNÅÏªºÈF_=MIS3ÞÝYäÁÁ¹ãÁ_#ÍÆ¦çæV©çæf©úçÖ÷É&E¥iYÕyãÒCã¦èÉX-îÝüèPiÝ«ãæClôÝ#áò=J (vàX§s¨ìö<×ÄóÉSüãç®FÝ#ýXÊ_ÁZ]½b½79P$MÃsS¦­ÎÖS_ÙÂº¤ü¾4XLU´HÎY¥|ôó§\`ÏÚ¾=@öÀ÷Ùv=MÌÇýRß¹Å#rïýÔÎí\`Å7UbÇÅFwÝT7;®×ÛÚäl)V)MøØÜú$üËãÖÀsÿjÃsgfÅã,¢À);5OùÇs=}TÝv°ðvõ¡A©ÿC.Ôã/²nññ#ÊÇ@ÛSëÕ7¾ÔµUÔ°±¯³ñ¢¤Vì\\-]Á¿;ºèÀSÍÜà´¯½Øw1ü7twøÝÚß|Ðÿ=JOÊh]õ&Äý¤¬÷ÞEÖÚ¹Å"B9{©í-\`jj\\SÇ-Ç¯³ðbUg©\`WÝêý,ÒðÌ@JY1ºÌ9Íy1£Õ¡~¦e>Iéê±¾,RééÍ¨Õ.¨ËL\`â´aÂx§&áÆúÁè¶ÓÓz¦p$2o=}¾ÒÍ»§æ»¹ÐU/¤ôjkooë ~îï<=MÚÚSZ¥þcÞÌørüRuZG|Â¸ gI:«TÊ{JâÏ²vîL2zq:}³®[dtÙ¼YWtèÀ9ic5áuØSÎ=}ÓU#|5½tùÚ:vc§ÓKÑ¯¼9Ò; 7IèûFúOÁÖ>/­ãóWv~=MälÏee§oª#Êt¾æ­9íRjìÆÌjÏ"Ø=JÜo¥·8ÍÌÜpLJá=}hñnÇx»Wu©àT!X/óÑÉµ¥ùØóQmÖÎ\\ÑÈZ¹ïÃ'ûYu^Ób3×·hëZ­y´S ¼ ÒnAÁwí«9^¦°CV­Ç=@pt7Ãhn¦åN\\T±½Kó=MÐEºûGÐÔ¥·=}=@Ô¥ÔN¦B¸skßC}BúLbÆz-=}¿ðDán28>Dñ=MríÃî¸kï5Ùm83ÉRWHÅM²îúÚ-¼þ4ëgz¶¥ÎÓÛE[|»ÑÄ±=M<Ìú´¢#vêÿqlóVFd3Ø¾r­ÊÏUÌï¤=}!;HVèýê(¬¥K?=MaEÆø+éN^k+¸¸Ô ¨7(9(7x¬ØÌ¬7P|¼ªö¿åqòÃVí×ä-eäÞåþs=@ÙÂÑ!z'JÉÆá-råýJÌHÞI­Lßb=@ÔQZ_FÈ^@~S)ÙQy(ò$"±UñYa·FÈé8PV1´È¤«S£÷TÇó¬õ#÷Ñ\`ø9Óyk¿¹ö É&ÕX%yh¢8¦uA:!ó1áhÆy	^(2wÒ÷ø|³ùgV#¸äÏ@7åÍ,i Ûpt#=J#y¡êEYëÙûiF"èÛêô#É§énn!Äªí·Ä\\ex«C2¾¦hFÿùþ¥.THÔVE,Å¤Á±=}=JÜHdÍ=MUGÜð»LgXU ¹Ô¼¡qÍ¹Ú½=@ÏoK^*ÅAeøÆn¯D_Z!	M	¥íÕXå?eÖõôI%7g Ã¡fËñ±iÞõ6GÇ0+j¿p?,¨PÃÇO/ß:û<À¥§þ9¡å¡é ä÷¥à*õ©"ü)=JF¥¾7úìJ:ü¡dÕ¾q­ ÷ÐÝÝ3|gWPÅ®DS\\Æ½H=JV*ZY\\z°wñ¥uv øçO7~ÛUÜuiã#¿]üèÄ'o"87r%\`Õ!¥0¦¿¥QÞ®¥Ýé.D¾O&CÇH=}ÅeÄN¥¬Ûg¼ä~KcX1[ÙüüXËÄüÈvþâíðo¹¤¤¬lzèåW×¶i\\ÕX¿Êßµ¤¤¼­{ ÎØ,áF¦ùz/m4a,mW²'QCÞ'¡_9ôãõ¤(i)Xí¥í)è÷fÆ¦ò°(f×ÄvçÓ?_iMþëº÷<ÐlÒkÁüIl9Àu·l9xB,»×[J¿¥x¶0DYMy¾3M?dL©VC¹M[HÏá:¡vC=M{?û,OaSÐnÙdÌòå:M°ÍWZeð8ÿ¸h\\ñq¼cú~A¬î[ «¼þàïÊs{÷Ns=@Û«Dæ4½N°aÅ)U}À2å´'®½MÅ" WðºÐ2¥îÑ5ûçk}z±èVl.ÐYfè|ÕòáØyÉ;zhjSz8½p>|8Ó»,ß¿KvÑËãö³A^<ZbST¤Ëëéµïq7^éGFQãÒ}+±òªÃ'DÑÌ1y Û\\EEäv-ñ²ÊJ=}.áý¬mÇø^BSÂÍüJ|¿a%ÀøFý=}à<v,¶Q5=}þ5Zpï^vx[w¯ÂØÇZÓÓöïú\\|t|DWBñZÕ¿zÙTçÇ/dT¼dÔ<´oç´Lç¤®\\<©|Ù\\ÎÒ×\\Q>TÈ=}úGª{ö¿ãÜ}ÃüWQ»_çi=}µd´Ò	=@;=@ßÐå"÷Bï¦\${Í&^ãvÅVÆõï¼¢GäoÂ3ºS=}$r{}L»þÍÞ­3=}µcËw§Ti('¼2¢~axðpPûH{V-t¤\\+ò[,oâ\`sYzlÌuÑmã¢GtýÛÞ=@uÎ*Ü±ûßx=Mv¤,÷¤St<PgD®;mo=@Ç®ÑxJ¡Úc+Óö³ºc+I ¾ck|aQìý÷³8¿e}Í6l§ì³µfxÖd_t{1M=}Kã=}³Æ&V:ÜjÏ3¥?UjÔ-óËSqßlÌúÈ+Ñ½ó=@®{nÛuðm^ÐÖÖ\`º;ZØÌ%Ò°FZÒÜÂ~QYpKpo¬Õ·òP¿<ÃtÚ²ë.|þ}Âs§B5òåvõxOTsT1ðy¿Õ²_Ô¤rÐÓÍ­ë6Ù6*ï[M×õ	 ow¢±=Jâ=Mv¿Tr8Wï·û_:Åp÷ÍZvkúþXcJÏg\`²çýÈ[â)RïµÄ"nwÀ<Î?çÇBlÅ[=@ïõÆMtÈY[ð;ãJòÃ¨örìp­¦oäõÞpõ#cV^=M¿^Û3¢¶è½Ü¯ßõÊ4bìk²ô"°Ûæµîtô²èzÂOÀñ|¹ÎÞò=MDµàt=@*}<®k_~J@=JëP~w¥)âÎÇó¾lOZöT¬DwÜúÁßùÉLvUWüV¼¤¨Hêøw?2êêtH^Ï+uÓÞ=@\\õîãxB¥d@:¶õúúÞøÍ±þ\\(ð ]ç¸á´»Î²]çÂ-eëjwÿñ2ÊCúV¿÷é²ÁFñM~ïxÏ§Áäw],¾>äð:{ñrîØ¿Ï·}ôoW¬8ÌÄKèjôµ»øæµ+MPá«yÓ/kÕPà=@ªô=@ùúÉm¡Õi$_à=@S´sÁÁF÷¹§PþÔPr_3×Çß¦ãàÚ~Î¬ÙWáÁ\`¸Ðö½:CH/{´áDË ã»6A?ÎÆ¬v÷Øü÷'dU²ª·ï"Õp¡¨GÀSwÙ´\\×§x )¦Dß« u=Mà¸íÉj»XqÃiH¶ÞtU&éÈ?ç¿ÈÈÈ??§n¢ï´$´ï´¼;<Ë¤ÒÑÝLkDN(^ý5à0*÷;Ê¹o:VA\\Ós{DX°óÚÀ=JHz5IUµ¹%k7Î½íÊ[¦Jg6ÛR=}úKÉ°æÀ ûù*¾-]E7ü§,iG16¢_ÏÆÑ0¹Ò±¸iÇvabü¥Mu:ï>=@7I7µ]¯­9þ[Ä°CªNDÄáÏgôR²QaÊ³Akÿb=J=JrpÐìJTªN8×tE¤ÂZX=}ìºÀRè[MYÞ}ðnGfGÅ7ZjDÄ] FùÑÅ@?¼) dÌ21¡9QöÕ«ÞöÄ¾ÂDªO7ºÚäH(GÌnÇ³ÅéÊ3Ú7­?U.cÐÝÎ*ÏX+rX[Z­%êdßPé=@8þD|åÑkÙáwHóÅ3B{àÝdÎ» *º+áBÌôD=JD³tì[~uêdJ¾´h[ìôz%Àè°BF«ÄÂë:Ò¦ýT:³Ù­ïØkÅ1-1ÔLBH­»¦Öl/PþOOhI>ùB¨zñª¯7øveÉ@³¹JwæèÜÕåÐDÎäü?>rYÜÜ´ñ tDîP2<9W3äõ\\PN#ÎMüIfòz[DßF;üûNÏ¯Ì]ìpÿ>W>0è°ßäÌ7Q8LR»ç{ÿÔ-è¡|¥ú×NXÐÏä¶j¦¼ Ãláä8¢=}^¬ø»îÓÅXîj'¼¤w+²\`Z<{L¸¿ÀRW<ÄÄ2ò{Ý1§2ÅEg{)~-E¯Æä»¨=J¡çbEàÛùéíY§5Sã=}ëèz %±-~aÂ8RsËûF õy_Ù¥ËFC"zË&½)\\¯8¦üRdÑ=J2èloù³ês¤²¦´ºr«ÍHA|êFg 2{ú?ö%aW¢*WRÇs¿VHõ±+óÒÇaÍ­$§ Î½úHîÄníÖºÜ~cÉ±¡ö3¸û±áàÍ~C.Ð­÷ý!¯DÿùN³ae;¸ËYcÒ4ôÑLôÞ~ÙBY×bX3&~ÝN¦û°h¤èÇ´_U4ß@ÇÿÆC3Q­j} Ýp[Øy5{­¼kSG<8j¸KQ×æÐàã¾*jÏldÛë_ëE WQ_Å£õ3j©H§bEf­É>Þ[uh½ß=}¨8³sÀøè-L\\ÿöGpü>féq&dyGÑöË¯dê.-7>æ=@î_égÞµÚÖZ(µëìçá³«ð³üð5"Ä^oäpSÏ¾Xåw½Øø #¾58¼Û²Øë®±tMy/ZPXh"Q=MøÐÑ àl¢Ë=@¬õµìoßo=JÚ~@ÔkF]üÂ²zþª©ËµÊrQðÁ®+LGÎòî\\LR>9ÔSb|zÑ;P¶½ÿÝP6xØ¬ôó*'S3§A7L¬JË·kCÿbr\`iÝÛíaü¹Ùí©AZ1*ÒämÃQ@eø3û°>Á$Å¦3³ã~òðdübÇÇ7ß4ÜÂ#õ®ogã_D¾¸¢$_²N!ïÙkîJÃËW7ô*ðÉ¿[wo]]òÉ¢ûdÁ=@v¥=M-C\\ºl7?fù4³^.³áË\\ýõþU÷×t±LÃ°i^D=@ øóÖÈg»Ë6	dDp3|#Ã¬ÒáTÑ=JkÅ·khùóëðkËûoº=@:,s°£Oâÿ=M@Ðòmú¡F&´{û]à¢ÊS^t#03B7B²}{(8°ñEê±³x°ÃÇoåA¾QãD°oo¸Ã>S³ó=Jb@0³øPøn÷ÒÑð±hªHÐùJiÕÚòvyD°÷&1J®ÕN 1!æÿ>ÈÎ®x_Ñ±DªÈ%ÓiÝ®¶xFï"ßûí!r:e¸èºýéöIJ·xS¿Ú1+áÃ ¿\`O4!rD=M_VøyòåÛyu#LøsCÐ¯NrÓ£àìÃÐZGÑ·cWRÈÑ»ªÑ±jQcÝ®'«Ü¶qpEîýõÍÏ£¶·¥ð«5£úÿ0²Ãp°þ¼¨<²H;¨ÆÉ@B­|Ô=MÙì±SH%é¯²KJ5û Qý÷vÏÓYHDôÍ´3G9=@Ïý[Ç,õd9_á³}Þ;Ì½O.#ÝtÜù0é;Ã5½8äP/°_ÀtRãÝ¨E~0Ôü´ °úLá÷¬hæ7?·%´O0]\\"¥æºÈÜ¢¡È·ûAäÂªD^\\7)@ë!=}gþBtGÎÎÈ}e5ßÄ=MêËôÕ°yPQGG&´÷Â ,¼L%ÌÅµÀ+ÍjÑÚS!ôm\`h i0ík(m9vy[É´=}×ÆEGæQ>Ùº8O²¥wÝCÜ§ ©Hvù¾ÁÞ£¥;£ÂíÐVÚ[$²eî>VEÕô·«~¼oRð£¶Âô	É³ÜÆpî£SÊ\\qvÑÆ=MéEl¾V ê:àáyº+\\:üRÇìTræ^óµL·}}etYGS¹P8þm´£aù&(ñ¶géü¹¦ì§y!#¹%¢óòqò³°yÙè§ÆµeöW1íe«x¡zÖê87hªEbHÐ_5iTÒÐ%êäæÖ·È'i/¸'3XÊ¾Æ:u=M7Y4hf¤JfÛÃ&=}D³­yN5F¾¤ªL;Û)3m¶:e!ì2ý½ø2W)Q>DF=J6êkéÈÍñã@´÷Â7»]é))_æ2Óìx]I÷(PBçzxËð:°*àß9p½ÑÕZ459;^¯klÁ&Üw¿fwéYÓ"åtÔÍ#Ü¡è"tbx³8ã´J=Myò'ªBl§õ-NWj7H 7\`»@¿H&ä·©8ÉæÛvE"J±&ÊÀsnGPhâAøÚw±°-ÛÏÃiZnTõAÁßê°HÍgÊ=}Eß ¸#/*]6Õröl=@e;/*«Õoxæ[L­	3*ñDñ\\<5|ì£pÉXO©µ¼×Ë¼Ðz¦ûääéÛØ¼1X\`OE(/c»FwÂ1/1¾=}B£*_xlÅÌ7÷µchj=J"*£møJzóX­ÙI'Eó°ºoóaôÛ©vÎ*ÐPÓæØÂu=J¿3l½Ý/}Æ.@Î@ÅN"ÇÜH7¬¯~ìMdßu*^æ}:4®®¾ÛßOâõ!¢Ëç³lÅ=J{o!¼[?¦kã\\Z8WNxýIó[¶ýQ|\\¿CÝzQ=}XrÅb^;êk¸3ÇØ¬ÛBýW|ðëät=@¨9·a¯=Jò·:Ð°ØËwO>k¾õc<ë$[QAÊ]M­bdÃhÅkÎZ5ÏãÀRíÊmAÛêÁ½µ¶¬ýYÝåÁÝÈáZ]?«ÃÐðÖEÃt(4¡P,3´òã´'äêðlè´ìº{=JÚ{ßÜÀr­=@í}9fc¨ØIhü>Òs*&=}d¨Ûç*7´áàX|ØUe/¨Q.·¤\`ä T¥×OÄeqjÉîW÷4¼v­oõöäPÄev(}/1 Û®¢ýFX÷I°ýêk}+ªõÂâÊ­/Áo²  ªª½K"PÑ	w1YA,í1íÚßê¼ÂS¿êzÜüÛÖÔÂçõúP=}aÓlÚtöñûLw8\\|Â_ÐegVâqrU³³È·ê± l<þÅY¾ÆÂô[ñ ÁÃøæl¾ùïÔê«ád=MWØð´öý«øFeò³¯ÝëàË£ÉÖõ¦0#aÑ &d²SK0Æ°$Üç;)do\`àçõ0qWJ±ÔdZxNüTÈç|æ{ºü¼æPÔKi@Û!Ë*RTËÍËmÕRðL¹"ebJUèî_¼X_sñ;ÀÔÇÕÆ½Ã\\ÇÿütÇä:A´c~þ¨Ò©í¼$aå$aâ¸aFµ[È>v8Hbµ*ê¢Á1ZTTd+	]PÂÈ¸ðõò7îrÓÍY³¢°«ÒÜCÛZBééï«Üí«Ü3RUbÏì=J"x±ìû½\\òÖ.ØÎ¥bLK0¤ÆMñò(¸î:WoóíÀ·©Ã~+9O<ðÅ=}D?[ÀAü<.¸¦oÇê3  ÆrÐ÷WzÒÀá5Q-µo½ÂÍz²]º¸ç=@s,ýN[÷¯þÐ<Üó¼ÃðÝMLäÇ·CÚ þNüòtádýÁáIxw lSVeÿ0(¦óÓ²ÎCÐóã«ÖÊtôj$D<SòèS#ýÒdÿt2øÉyQÔ¬ßKà"<y»çuGlÄñÏ8K0h¹mòÈodéxÄý%ù2å=J:ÜÝLó^GÕýÍÙàoXs¤Éñc;ouÇrqIá¹í5#çEò]?	ý@üÛ:M©·Çæµ~4a\`7±h@[ fc4Y33ñó+ù>¼e4Ûô¤:óÓÈ9=Jøø#8¤=J9é%I»VJ}ÆV@oÝÙ)m¾ÊøõØÎ®&ÃWMþçGFrS9WlÅþá#[îÏ¶CõÄÑO%»	ìyò·Ñ÷ÌæñùºAßï£¹ÉÄ!«]¯ß»)+õY|o åWåãø5qF}L¶±lv±~´ÆòË¸#kVóîn{Iò<AZñþØJó|2ÈjÝPJz ¯1jÄò$qè~Úa½¹dV»dpò)ÇÏó=@Ô>w[?þÍÎr34Ý	æPèÓw¿ÃØ=JA¾}%QQúkÖY7ýj¼ÕÓ¸ÑM¾bµùk¦¢@Ã5ùK&X¦Ã¦à$²\`³§¡dòQÀùfÛíkÑã:ÏSf1Çxà«ËV=Jîª·è­ñLf¥Tí#Æº!úú&¥ÈéÊ}\`ù¬è=@oíuÆ=}øAñò*¸4s%^^Í¢\`÷·Q*Ùäoäô¨1üÝÎä«*²~Bjb¹ÈD,Ë§Ù~ñØ	ÒHîß¼I;¿»8qXäõ¦m_lq¾"Ë¤EpóÜbU=J	þSm»fYö|õûfXs÷ÁßËÍÖÅB gTUîÕR÷^>ÑødÑmzQ~À5îªk1aôÛS·s³NTÉ¬îRZÆR7|"è²a8^9Vsn>=}MöãnúJ«Éj©û=JZüÔ;'ÐçÖ¯bß½P#=MÙR£yh}=J2¸Û~¶çÂøåÞætÐ&d8@1¿ÐOðF4¥ãÁaöqNaË\\Ð|¸à­¼qjºôÃp7¹%5A|õ~Ónô¸=MóT~=}Y§	lËû{ñ÷¹&ÆçÈÇðÍý\`sÆ¡=@õt|à­K±GL=JuýfpÛá¦¼n8ÚþkÇÀ^Ibû¦ÑbÑ©rVGéýÞ^#÷ýkFáwéûK´òûmÂ6ãOôG7û,=J¼Õo8f,ÒbïÃÀÆûúoÿs¼1ÌbÆêÓbÐññy=M_5NÍò$=}*cç:GíË¼ëÐ83ï*=MmlO=}Odï#%u ¨ñà5ØÎs·h (\\¸)Æ=}~§@ô<Z=@@Su#=M#±³«'ÚcQ\\È¸4tKHf§ä$hÐ$b(YÔ9	{um=MåÍhûMãå1¥Þ¢Ù!\\Ë9¥v5Y¥dZÞßàÔ|Ý&¼=M¹,îÕxQº¸Ü¤³"Ã¿,8$Ö\\!=}(«pÛ:ÿô»8xiþ«9ÚødÈ(SÿÅÏÕ/TzÛ5ßæ4NÑÇ>s¹»ý4 ¸~:Aß>¹=}hö6<3¯¸ÕÑ¾LÉ×ÇíaåÜq÷ðò*½iAx+v80^=J&¾jÆQ+odÄÒ:#ËÁÁæ°íÚ¢64âVr.÷1T=Mã÷!2%)jpÐÖ?VLEÝ#Þµ\\=MU6íRsè"¡·ã¦!»ë]KÏÝª°'ÌÊÿ44>ÞäÂ3²ÖÛàâ@b!b1ÖôgÙÓÃ³«ì¯$én ^_5ubp>O}_êY¶ê<^V«D/=}ëOj;ÙBSdzÊÜlâU©ÄóÍëv\\¤Fo½¾e0ÑæOÝÅ=@Q@üçì8µGådí_ü8	<j](Ñ@àë?À¼kHÖ¢4·»åUx@	ÖH£ÒSeõ£Û§ôª	hÑá|hZ|n*î¢§N\`' 4øð²øzP<×µÔâÒÐCß%Ò¾x¦ZÝIßíoÃ±¤vð§þ÷Xt@l¦×_ÅI/t{¶\`ÍIåµüÇÙ÷Íà¾|ËÓ¬2G'í|æÿÑAËAWÙ¹ãèR=@Ì$×pIßå*ðÌX\`b§þ_o=}VÔ×{eµ°þd=}I5o¡þsI¯óæTW>9C6±_m7æ¡%QÜ[4¨î	\`£Yî»FC\`z1/¯Öîu¾w0æS½ÕLþmx#ªZAh»"Gªqís/ø\\M6öoÀ²M=Meûm.NóIµrþLG5}eÃÆÂJPñÆ=}åh	­Û]¯ihY«Óóï¢¡<<Q+ûÓë¢ ¤=J°|9RcOëKôòþÐBé­xYÜçkÆÌúW»r-Òè~-G"¥þ<zãÓÂR}Y­hNh¼Pô©æ¢#²/Í§ûçI³ Y¡K±>¼©,-§:5æáªCí§ì]Àè¢¶:2lëlð&jñå®o±Ö^ÊáîffW¯Íå7v½è0#ÊUwÔ¨kÓ¨Q2¬çÅyi=JÅ%Ðmãë©\`-þ^½Cb¶W·*³=J_¸P}ýî¦PkÅtHÕ±ç¥ç­¯àu¯ü¬0KQElUeÊ:Ì8I®?bJd	Y|m^9¤M=}KÝpÄìhú¿3ãså[³  ¶­DàñÇ=}ÂH·=J×ë³¡ã[Ùà¥½ì3¸}3 fû ¥ø_q(O1Óùß÷f¹ÊÔV&ÿ=J8-JÏÿ»¹»[¿L­c»ÈÜãwëF:Ç³ì×²k¦Æ¢HÅï'|ëdA\`¾ûååH¤4E@fò@}XÛãçÅøÍ³î4Å0ÓïLéH	^Gn\`Ádqo\`4A}«cqü:öüjE»P§9Ê\`ú/]|»½NÌºØ¹à=MvããlÛ<Ñ$úîÊíBBXM{;{ÑUÐæ=@âK{R^Ëõïæôú3:bÉ¶²Ò|U¿AÙ]QYRíä(=@&ªÐÍË¾èûÌæ»_ó´ª»5+c;M  9?ÕAÛ0y[ÿlIíÁ¯âú¤^øP;P¤²S$Gæøä÷àèÑ÷ççÍOê¨ÔþHÄYylâ¸xªÖKpÍãpo?.;×@G¥!exÖ¥KæÄªzuÃþVÊÈ¥ruâ!àµIåF¹üWØ	óÍô%>Æ§Ò	o¼@ñ=}¬u=MãbÄûÏÞx´¶ÏØ3?§ÁFot eæ»&^Z?³ìÙÁÉdóã[Rbu5¥áK	v~áë{» <0è<]>ïmÕ[bðöL¸¡ùÞÖUËKG4'PñCLë>'Bx,ñw².àîº|GmÛ:5|ánã|Ó ÒÁX=}Bòb­ÅÌÛï\`Ï$|#¨Ç¥ÏúÿºKDpÆ38SïbËmKéðø^ã8#s¨7KMÀ=MÉÜÇ\`´àg¡q¢X÷ytW6¤J^udÔ\`Ýir]Ê¬³±.÷8Óê¨1â»ÔÑGª1÷ì­ÞÐp¯wa=@^æ×$eÁ·åÇÅXÎÜÎ\`ê¡{-M3eò+x+Z¼²È=M¯f(óñw¿1MlÚHÙG1>]W?ÞN ë¶ñAÊøÌrÎ¿¦þrÚýÍÉð/K1S¶Bp"ÍxÂBÐ}Çûùô4øÚäK4­unQA®ÐÖ1X2UÜÝ.$ûVgNT=}kòì@gÆýÙ ¼Ñuêö[÷EìÌÍßÑÕ9£I·A_}pEðëÌW0»-îä¯¼×^ac~QÊsÑÕ[ö,n]õ¿Kò¿/\\O=MïçZ¾¸öð¤¸}]^îQ·Ál·=@Q&f§_dºR½þáW5½Â:7©òãYw4§\\KîÕ_"\\Àd1¢á©[±ÜkW}"iZ±ÂDüõZUÔIÞwX$pð)Ð¯4d<ä®2Þ®$uÒoWKÙ,ØOþ!LÀºw7Xr=@òê4h§ÂhtÈQ#¾9ÉK­¨û.hw}$Á\`¯ªow»Øt)\`ïÀ.v=}>¾dÚeé)­»#öcUgµì¤ÀÛ4p¼ß²0yýºÐVß@×a?³YÒ9@ tcÑÖdW\`#Ë'?Í11µðúöyyißK)½vÁ©TG²N!Üw%5þþ>è¤_:þ¨/ò®ü­ÍÇ5éÄ9öyÚ!ÚöÞy@åFd¢ëÞ½?åªc%AD¼~vA^·8YW-ÌûxR3\\ì=MËD®ÊMúC Sûàqón-mÊççÊ>æ¾<ÉÕ|_Å+sÖ}ÝÜ9BDß§êêî*/Ú¤)CÛ$iáµ$ù^ÄuÑ5+µÐµçÅX÷A_{vA8£ËLÉÇëºÿ«ßÅÑÍ$©õ@Þ;z'Þ2Ò¨.~¡2ÒÂ\\HÕNY4'VÇÄFÉæ*¤h±Ïèâm2þKÄùØmÔù	K÷©±Z~îµpîoyZ±x±¶/Âmð-Ä-Gë¯pF¿<®=@ì¼Ø\\oUXÂ>¤ê²	¡ew·èÞx]bÜ¿ï¯Í$W=M¢ ôO¿ríæÍHýLTå£Ï[6ã*$¼ü÷Oö5~z¾>4;ï±¼_«Ñ³gìp* ¬èÄFnoúÍj±ø­¦]Ñ&$i=J	÷ÇÈÝ¾ñÔ¦CUØÌÀ_\`2e+f7° å4q>? W®i<øbù'¨ï{'ó§È|ÆWNpx0Æg-×±¬W¤yèuN»VäRB}8%=J$g§ô¨ßg\\{iÀAö?ô£G/±ÄèæPß_Õµhê¸ðó)®´ÇZ¿dTeÂKY®¬sp@ï¼ïZÔà,PC@ZËþZ frZ°QøìÝ7}Í'¼ù~L!Xe´ºÁö×-éýM;ëOf¾}w1¹î¥X	Ã X¥Utfß7køI<KÇ£>zá¹¬N¨>¤øf4gGWp±òb=MRrÐ7¿ye]¬«û+#¯=J¾|+Ñ^lfÆ°Ýå-xÃBÆóy*Q®Öë! A=@çBøAi­ÀöøCþcÕ¢0Ã¨ð$ê#}Åª}ðRÒG Ø)í{íÜ)z­FúbðÜFOPRÉs_Å¹½é¶íîæÃ3<1=}©«@Tkï7	#OðÔ\`Wd OIìeº²ÑËÇü½¦|*Ö!q9e½³Ú\`e¸û&î!íði|ú²!Â8	RZ¢G-?"¬÷¼?4ÕÞ<·*ú0}}íCîÑµÐùÓÝ.Il}à0êÀôßZLuòC7vÍwdZÓzä Ï7E>yfÂýïý÷,X{=}pZÆÌ5]]çî#\\éEÐýÜE¶ËLºCp¤uú5÷2KE¼³BUÃU;\\z1Q%Råã´µ7y<]¼¿¦²^NQ;"õ²½ÏÏßÁ7­q¹^e1¼ýøÔå ¬aÈ9¶ÒÕ£ùp/8þC©¨ÍDú+íåcÍ=MP&Þá¡|[Ï¨0e]åºTL%fä¿¢=@øzMÞ7§©?;òÀ!Îß§q´umÇäÝ«*7+Óe	b¡@§ÊJsr¦úÝ«wbµù bµJ[en?*wÒ¾O!.âßuðöÒ¬ rúY=}=JÄ¡½è=Mü@F»5kvrNgeåêZíó®í5þ\\G¡ëÅioÐÁÅÜræ5èµtNÊA	.ù¬ükûfÓh½îÿ³ÜåÀ3stÁ&rbègÄáE|¹ÿ¨·H¸Þ­(b¸cIYÐÚaºÕîb¦à$ò"ehoÕh%Þ-ÅÞÌ»M¡Ä¸"ñmÌøKK#ÚZä§ªÊ®Ä°QLK$û»Þ÷÷ø=}É<ïeÈçù¹Å«áAVwÌ39Ùì§UX$ÛV(=@×õ2Kçæ¡Ó§Nu ¿ò0xQÕdU$óÚÚ½bòÁÜKMLÞæÍä!wíoà(ÆÔ uÿßíIüé	,sM	N±½øç\\%s#ä	 °©#ÁæÄ$=Môòÿ %ôþ&À&=}/³Ú9#ëÀmI¿I¢ÉXÅiÆ¿hô8áe0l=JPÔÔy|¤r[ØÉ	¿×±±{ö§äZj=@E¡KKÿÊL Öç¥#QéªØ£Ýqß7±Ý)wå)ÙÙ£%ÙåëØî á¨³yé=M3çðÙþéÜÕÖÒ7Ðwr\\WDÅi¾å¹® ¿L!ÐùI{øIÞAåÛbäèi¸Y#'i¨¡µXZ'ñ Éâÿ",}K3µÍì»B§üøªo_ÃÔuõ!Ï?$PhÖÕÏÿq±*ôP;=Jj÷aÅ6%uøÁç¸kÙ:¶àg!©´?Iæ~¡®¯!ç¨ûPÿ]ÄÊ#çéééN 0Kyh&Mâ¦À$°ÙÕ6j|QÄPQãy|³ñKe=M=MâÔÀ/çÏ¿ùLÜñI¥GúÜÁJ¶cg×F÷üÄ*¦èVfNíøøqg=MPA¦Å¸^®ÖCÝyù·R¶ÏÔÇÉæ#A|dhµ9ö;dà)ÎB)e(q 'Ðáç!ð(9ùh2=}ÆÍa Øö¨ »«ÇÉ¥E¡õ¥7$!1®Áoä÷Yï#mI]ç&ü§®Õí±ªÎ§5ð¿Ò\`PÖÛ¨z¾ªÝïÿ¾¥áács Û/án±µ@c²Thq	ð.¾ú8j9ÚÚÙìÍ2!/QqJÑËV$Â#ÄÄÄn¿=MgÑ×¸	Ucÿà²cÇOè=J*ñÐâ¢wÁÁWÛ[¼yè=JSGK°Ý9ÅÛ)Â\\?pkD¡µÂY!X=J£îÖúÏÞ\\C+mõËk@ÀpcÌp  O¥«hYZÔ ¿y±8h~¦jNù}%y#Ðª)î?Ñ!É?§´¨È +t(ÖÙÓØy»ùbBJ^=MMÅèg_5ÈÕ´A8FÆÂT«vúöTÖ(ogYzdüÝóãJ(>¿{¤@×¢ÈÎsÑ67o6Snlmxð¾+ÇSA¯%±G£ÎMúx8æ\\ð#I(äcé #;Dåà}	5î²#òáúÂKpSøâc|NùhWÄ=@8OùÈ\`OäßsÝp_ß+%Ø ¡·7aõ7î	ºÀÅç¸V¬×o§\`p	Õ³íâíÁÕAÝ½Ã$½ø6ýp¸Î=M-Kâ÷k­lÈ#Ñ#BL­·ÈbÉcº²ÔÝ	G×¨ø{ðê#ÜÍ,ÊÆã¬£ëë¹cw/Ï[ç$ÿ*ñfTÕ<²<ãeïÂ¦ÄmV#Q±lÈâ<rÛvwJ­çÇ6=Jäoy¯(±,¢Øyü[ÇCRl->ãðñæ:C<ÛÌe°¡pâÅ;b¨}óÌm'ðò1x@½ê[Húß¾Íe~VÉù=@îæÑ@÷ÈO\`×Çê5/=Må÷²Ö*4Ot±È¡Ä%Ã²¤ö¾0LO¹Æ]Q¥øcxúæ¸ôéMs«d¹ò4Íh¼hMÖYrüO÷=@¸.)ìø{ö<¿ÀØïwø}ÀzlÏè-F·óKÛnÝwUËÕUNº:: ¯¯(z=J,Ý±\\ùÂÒé#«kÒãð*Òd|Í=M5w8µ=@6Óãå¸-v©%Y"¼ìß\`qÈÉgÍ®U¤ìW=JîÕÕöñif"Å]=}Ö V$ýøiÈ\`ÁÕo<dVðøüõå2ÔË@¼)½¡¨ÖFRã¦ Äæ¶¤¢£,t¬ØÈÙþA-Ûw#Úë9ü2è//´nLôvSÑÁõ«v!=@Ùêóù°ípðc %F5ÁÅèS<@³Î wÓ$ÐÂÔ¹=Mà-èk÷aÂ,Ýã1·äQ¾°=@¼Æ%èÇyP1E¨ÖÕþ4º*6\\á2qb)=@Á=M­Bt{eçºÙà¿wLÀÒÑ®Å»uüA°	Ô×ç¦ïøKHÝîþý)øíÇ½ÆuÎAbßÍ4ûùr#/TÛïd¬·õ-Í5\\ÕP4¡aø¨Ä6Ûô"!i½ÙX¡(·ÞX&·¤	ÑÿÄÀ[söÈÌÀ­x«ò'?Õ·4É%a!&1üKËWÓµ·/:}çlXXÌð£µqAãÕë8ÿ¨ð£-Ý?¸*«Û+´MYÔØ³eqìW>5¥ÛµÄÀ7Áe|l	¦R)qÖÂnwwOÉñU±KgåÝ?ßË¿YsNY¯ð÷Ë=MH^¥é´¶Ïá.Â&yaÕÞBocw1þöodÿÕ x >ÞÊ;£+aþzÜå.Ó¤¢¤ÎW+AÒjÖÙ)v¨»¬¿íS~°w©°ÏÍ[0vÒìA,?tÌü®øÈÅNÜ	î³ø­\`dNÞ÷íÇØº)Ô³ÝÄ{²âhvzÁÖwã¾w:è 2eT³ãÊ3ââÊ@}Ya±[c¾$»gÓ&8ã®hìJcE3otyª°"ï¶ä¦¹àH´è^4Ç:]=MÙ×ÆIYw¸õøíôÆ9áE/ãÂÏÍ½*7pg¶ïL[	  í¯hùïý÷{µ3ñ\`>l´KK¡sÃ#oÁ¡òÞùáÈ6	»Ø=}û°Ñì-Öä(aÔ·piE#í)=@D'«rbàäÚ=MtråüÆ,µYõÉ¢Âf884xË|2éúv@åZ;C×eå£Û;=}ö£N.T>ÓÑËyoÚlÉ¤Ä?º-8dëùÕÝtå³kl5íãÅ^ûZõiàt;VXl¦¿EX^eÊ°}]$ûêO#£ëiKø'AùÜ£)LXø)ÈUWÆ¡>Ï&L&?_XÏÜ,ª|¨ñû»ZmLû=@i@þm(7#cÊäÌ3Ö¦Ô|WËÑ8pÍ÷Ç­wH	"d&ÎnÎ]»õÎÎß.úZ}GÔBÍ4Ña1e¿æksª¨$!\`g¦þÃ\`¸\`Îº3|¢Â	©+?Ý.¶%y;Ô	*z¯íñõÊ=@üG$0mÆ5ÇLÌÁÑQöPv³ùwèaMdq.$,¥	%Â<'çí°9ÑEü75à!í×7ïLÕÑE?iPkÄd¹¥÷+gz­_ê#)çÃí-"åMþÈ¥Jö{ùÛï»çø$µ#WÇR×b	¡ãêá6ÔTÃîòbc2ëkÅ#»íµ¬cÈzENëò7¸Þö=JÂøCªÁQýZ)ÇNð×¶_ÞÍfzñTþ¯<JÂéÇ¥Ú#Ì²k¼=JC¢jýÔD»ñ9¯Zø¸®#ÍeÿÖíÉáË÷3míæõ%x¿ÊvdÒßYè%¡i3E1ëp}uÑ4Ö]Éà5kHB¬ò?ÀeO{«P¸0a.¤g©túúÐ!Qè	ç©m1æV/çËÄhÙEì¤â'­!4ú8=@AÂ¼LêÝ=JGóEEÛ«BYîó	æ»Öã|fªgÅdSyûÔ&5ºÆMçÏi©á@8&wûÍïÑDõõ\\DÖnälüÊ¸¢~«±»ÿ>¡%<cHa (ÔNQE\\U¿·EçxSªìßÀ=@Ï¸lÝÒ\` ©D=M­Yi[û¸£ÇT½°Îôwl8ÞÆ½EêòtªÃõà]Y@jwÌ{a.*ÏÖ pÁ¥pÔÎ·¤ZóÇuä¦'2(\\e\`8¦z¹ì_jØ}Ôk/¼¸[ð(êéG\`ÙHÀèÂæ?×ÔL¯ä$õüsö*©nÔ>Ôl{ÍÄQToÒ¶Ì\\3.G{(¡¢ö¯jËÃõæØJrÍ|ØðKQTDU?+óÿñ4O\\=}Ðut&TY=@yA	ñÈXà~4tØúOVo@C·µX=Jü\`ÒgójFQTÅþâ$^qÂG3ÈT<ê,3Ü»Wx$,3±áA¨ËXÐ¬ñÿí»ø=}iÕQ©¬W¹ S	Þ×#=MT¼Ü\\q×(æ£p%eýÏ·èiÖéÀT=@_d§Ìûö?ø÷9Î÷Å¯~þ)ä«ô[E Ð³ò½Ü§ï@t¼´\\Þ¶Å²Ê{|1èAÚG"Dkèá=@t-È#ä,¹ãÍ=@4($"Q¢Õí%£&=Jx'øXïÒØK¹æùHñ_¶åÑ'e{&)H.wC©nh	"år¯#¹iCÞ2ÈÙ¡Ê=}¸Âñ·\`awWñ¸lÙwévë5[w!O'©öÇ£ª¿)ß¤ÓÖü+Á«@J,,láó5:,RLµEXâekK°6¸N>>Fþ00¸°ê6Òî³Ò:NW÷ÌÊìÂz:³-2TBn.%¦ùãÿÕxQPöI=}ý¨ùg!V	Æ=J^J#R@3GwâÎê¨ÚÕ/îùk^ÔÁz5[=J@kµ4#CNþKÁ]=MHÕ­^Ãd.àhÉP=MÝµ_.Ñöâ:a¸s=Jüv*sÊÝìu£ÇW¸¶k¬5in2Û6·Æ&'æaÉÇ|W:Béâç»Í=JðÎúõÀm9Ç?£¸±ØøbY{ÙF¢\`L=@*ólSÜëM]ÔK\\Éòe ×r¡rßïéLæÍng=@^¨æô%EZ¼ïyÂÚÈÃ¸ù­ì¦µ3³=}MÿåÒsö[àt9×o]FÉ;=J\\{=M}TêÜ¦^±}£4¿$¬kÏ4¢¶LþÜcZÊ§÷\\¶ÜÒêß"ø·CÂ£Ö=MHå/»ZÁBépí>v§[mæBzÿ4sQkÏ\\JRüCÿÇçBjXïÅÕ¤éØåKÁ5Hö­	%c(øV¯-)À¼]ãä4*¡=Jøö_jþÈ¼VT°¦ÍCiy;=@LÊLÑÎ0s¤|eQÜÝ,A³ß>7ÕyäÕ×öÏî{µáÙþÃÓ&ê-Bk!ÌìñÍj-ØÖlÒÍØëlÑ q wEKfD$Ìú1"åª Ýë:Åôh³D¬³\`ElÎ§×Ìå=J ¤ÿS4DÌf×OÜÞ7|å_=MÔßiKÎÀBôÚÌÞ^Ú ×.<Ô-¦S72ü7«þ#FEX|9¦9À@ºeCiÅp?ûôo;ÍLÏ®ÌÇôó$½O©ôZÍØ,_ÓAYV öà?ß£/¦lêh=}¿hpXsÈÚpD*+Ûdæá·@xøÔÚ=Jc5ÖD×µôM8a!ÊÎ.Ýzê7¾HÌ$GG$3Vb\`»$OëÙ=}áÓü=}ÊsuVFÕ0Yê±ôzËÇÓÝÌ'ß27ä~ÚÊ¶|ai4ßÒMG¸¦¦íqò~	4Ìþ\\vÐ[àv9j)µy¶Ò!Äô,db¨\\®Ã8ýWÇ6h®£,/½×(ãZtmp¨^A][¨¤^ðo3PùX KÒ@3¡ÚÀtðÃ^-BÇpèÆDËYqµï~:áï5×=M@î¹Ëo+ þ»Jò¼Z¦òº	ÝÍ±Ã$O¡?ÅTle ö7ØQjº&ë¥DVÖt£4T9yvvPÏâ¢GªwáQ%¨ãGµÎjæ~30¸°vügxrù¡tÜg¯ûPZx}RBv¨^Qj÷ºÁªý2A9´ÏÚ=@c»ÜóßVÐÃÐ0>?=M_atßFßKR6úµ>øùYh½ÃÜÚÐª_¿ºÞUäÇÒ×Åø¾a¬m°é[­Jí%òBS ÉõÞ»=@ÃÈûãíX¶]±.ÙÔ9a¤ªF*Vó\\ÞsþNô£ÑoWÑ¼7_=}V$þ¢Y¬VUV=@´µ[Å1uÏ{ÅZë=M®ÎokHèûTÜÏô¼=JÄÕ·û´ÇÛhÄOJ ,d0ãÝï×¼×\\YÊeY-ÚÈñ÷@^¨À =}P­WYqå¯¿Môâ,\`v~Y1Só 5Æ%´Ãj ¢O(ÑÆG¾TvbÐú3µ/Ìí£øýÃc·/È<UúH8B}NcµQ´££µVOW:3Ì/D~¦À$Cs\\$ñ0Ùæ¢×ÎºD8wDFm·d°x[äõ|NÜ®PPNÇN¼ÕüÐÒ¨óò±[²Û;XKéðL{ÔÔÂ	zÃÓ~Ouü®6\`ý¦Ø|ÂøüStëRÚ©O_%­ÿz¥?PÔßÃ#øÎè4È$ô2§r$ÔJ a¶ÔÎ9.Zø®Z^¸á­zXeaRÎ2,WC=JÃXl®ÉJDYsÌÛ¬=@&¸¾ÚÂÕÀùÚÓÌ¸ôø	JF×" Å~]øÈ{#-Ê_U¤L¹<ËM·ö<·}>!B§mCÒ	J³PîÁûu1ÁåÐMrî\`G7&	õ[Bùþë)¯kG!×°=MbªS>ùü]ïR>ÅÔ]_oa)YÏ¾Ãó¡ ^ ds	±ÌêÅ°oPÒy^%8Y2ZÊ¨2Hv!ÄBp¸_º_Ì¢^ÎÅ5û¶=McF¤ÏZP¿ÎûíÃéM\\ahÙÖ3ìÚöüÀ[$qÀ3è_LêäB{¢EiÇº7L ¿çÌ«w~«¯Cá?á±öÃëbîW7væCCPæ§½©~ëyíúv1"íÑÖpéqEò,ÌTüâë\\ZP¼¸J9AJ4¨ÔDû®+ c^,KÛe¾¶ôUª*wcÔÝÈgÿq¢âþPÌ=Js1Ô¥Ó¹!$·Aê8I]7_7EÂ°ÃòE½	ÝÌCL³dQ}/åm>¤LÏÏhGWz*oXjiáîª"ô/à$Ðð(´¶Æ¯82Ñ\`RCÅèªûVÂ\`F'7Ú6§@yûÊNµßÀ/	R¤\`¿M^rHÖÒøßÈ3EE¶Ö?Ü?ÍIUh|?C+hû¥¬÷þïª&N8UvûàI¨9£Ýê+¨øYÀ³4«lP$/à×UøQcø¯1#ZPè÷Aåá¯Ý²¥6'²ç	a}vy®öê¾ÒàÃ´¸÷ÞÃ²ptMÙÎíÀÌ©<FôcfxÈmKy0ÛX­Î|î¸ÕÚÆ6=@¼«Y©Þê¸^ø¤´9\\Qæ/DsGqD¥£ÁëÜÓßÃ8ÞÅÄ0æ÷Eþö¸¼Ô¿ÕêÎÚï½Ï²~ÞùÊöí÷#pv>8z:[6ÿûÊïÆ%ò¾ðrMþ¥fÉ÷ó'·:Ï}Ãa x/×·÷rÕ!â«¶2ÒÞÅÒ%ÏD[«]¼Ð¶\`l=Mv"ç×}=JìxìÉü-÷£D{òW½**Ý@ÇQ´,Jsz2%êËQTø%T(D/K_íîi>3{£aÁó@¶ºßÀµò]M@=}g1º XµYPPä<éÝúéVòçR¤<þn­àãV/áÇZ«[±nô¨ÖÅRFØGrÇùìãØù;6d=@å¢h²¥Ç u¸¤?eYJ,¹Ñ%íüLUcÆã¹k2Ýüõ­2{¡xÚ0tÞ}!ó8NÖØ\`ì7Ûo¤vM°ÙN\\x>Ü0Fl©nù=}¾éñ½ãcä=JÍdÃ¥@ê¶2?eègaAÒ=MGñ=@Uh\\'¡5ê6=@£ïb®YéJè²Y#k5°º¸9=Më¦Àó/Ë½÷%¦+Üô¨õñtEYiq¯î52}¬9kêþêaN}­z35=MÄ»¿ÙQT/$àÒÌýwÙ¨ÞÜÑ¡>EDÅª­²)²;½ÑbRKÿiÙJ¦|Q8qã;i÷KyzÅN[?ýù(0x»Éý°mÁèGK(OôÐ|'B´ÂÓ k1ówSÅäï«Xiá\\¦r=@H^$ÁR=@Âpo[}Üdf¡¬þüÕs¹=JØïÝÖZèþµ9s[ÿ°¸é~51?\`Ç=JÎáè4 ¨¶Ò0|¥ã6\`oUðyî>WPÄR´f3´mÁ´<w4à=@J qáNÏw=JÂoÅD§ÀLÏ¢ótÃ>\\È>\\Òe K½4b¬Ò&­@ÒÓxYÛ5u_=}|Ã$	Faú¸ÑÔ»JÓÏ²¾ZK¦D_¦R&ö±¼Sî×HIö/\`6b×êkXY¨¡¹¯a@{ÝRô	]ñ7¸~¿cµ°O·.zøöÆ¹Köc}Ðç¼×Õz;¾=@Ýg×è=J·®_ç¦ÀÓx[HrtÅ¶¥$®H­SzÒo¶VBX	eÛjdÀw.ÎI×í=@DcqO\`zà8{n^?$o²Ã\\µäèHÜfUÄç¥'ºÓ$#\\^×ìÜfÌþÐ×Ji!"ÅFÓzÃ"Y#ÄMâaF";ÀIòo°¹¯×QäuÒyó:ø;:Ò·{ãºûÃm>g=Mdþ¢"Læ¾}\`¼Å·þÐe/J¡£íØ×¼Ìÿp­._ÈÄÐ;×£^,öáMÞqË0	ÌÃ	ëwõ¶°i{Õ=Jobâó0ÊAEª¼ 9QlåàóøbäO&r\\Ä£´nÓµÐ¢7¥ëÖ=}']ke÷Ñ"å÷KîÅKûá{Ï^ß5VÌK]JÒ±¦Ä@Ë¡ÜSùôAê8ó­AÅÀ/Ë² ©ÉÇ2 ÒZþV´µý´Y£[4p.¸Z¹åÝQQþ'ïÆÖD³ù­eRS"»â0¹[¼Tzdj_g	ÈfbÇdZdï©çºC¤ë.PFóv=@CSãê=JYCb:ÛÃéh|¢°$\\íà tô@;,tQ	o_|$Å£ ÄF÷kH^¤s"ÍØþý_=J²Ô¯v¤¥ñZÓv|»\\,mùU®¿\\t[OjLÙçíÔ×e6Kèù\`Ö¬à4¿±ß:É!EÅ®£ùK§Yiã{K¨Þ×X\\Y:óò=@#å¸~3 [MRÌíÛpËkÂ·¿aûx@UvÎÕÀ:fµÕò#d¨­ÿ =MnÐHà=@4õ?®# ¨\\dæÜlce0´.¨t»Q´Neê¾öëul»¤î×Lv?å#Ü¬=Mt´bV?IZHOB¡¼þâmC^HÝÀ%»Ó@nZ+=}ø¯«Ùwº÷¥Í¢ÊÄ\`<_q´óG-o´Ùß2üØ=J¢µæ{;²RñáKk¸9þXVÀÅ¬ð.7Ýº­4 <Ú'Ä=MÝÍXµÅÞ#mD²s	v.ïJq^ójÒ¶Aj8¨õ¨=}òö=}êÔc/à÷jSBQ6%klgýj~ë2h;ó3ÅÞÒÞ6y8P=J69.v,+Æ~ïÏÊVXÇË]=}#<±pV7g½ ±!6­o5ûN.µ¯Oä/QºOÎoÒ/«ç5Õën}ÃÛh[>Á®Ø<IÇxúFóÝvçà6°=}fgHP3oÆ²ê_§ñV£ª	b¯bN£ª8ÎÜgÝq³2?xd\\÷>uög^lèºöOy_ÃBwü£7¾-LúNÝúE³vj=}øè;Sy³=J½1æøKÜ^Þ§ðÀ^ãv}Òÿ¤a3ê¾¯ÃÙrQíÒÍ6êÞâÀ"ô>+]Âh ¢Lùû6c Ã} ìÈÁv·6ù[8{òñÃO±ò\\ÁMà=MERñifbÈUIvª­SµcVéá±Ø@6£2]¨ã¬jjSª»ÃïøxvðüKÎ®#gÜèp	±¾CÉB)t¡ú$ÃgàsRH¶n#ÿuUt{1.>pvl?­qËcÚ{ú¯9Ïª¯­?vÃÏ\`ß\\TR»«V³w ù4Û21òòuû@b¥Ù2V°iUÀc.×oçÁh9ÿÏd³^pÞ5Mo¿o ÀbsÈâ<û£#»!§!²(Å9¬VóÔ1DGr³"cá8Üe þl¯ì÷ÙVø¹Ù©coù'#äEïiÿr* ÝÐÝKæC}äÍÂÔmÞ2Pë§>8w½ZV¢|ß¡=M¸Ùð{:(°e½"1ÂÖ±ÖÓ/©O¨x=}ðÆð}.EÅZ;Â/iÀìÌy´VNÙì<Q=}j¢ëõ7^+êSCõÅ9ë·Þ¹Ó4Ëå7"Tè'*ÊY¦$\\s3mH|J ·ÖG>Y¬yhf»âuÓÅ½ãVû<ÛFÕö³¢Êú>³ÉÁqÔÆ¡Èv.>UÝX1fÊ½¢\`l%ÞØ«÷QL(ôì.æ/7]dE÷äÔEþIS¯Õô'Í²lN#Óc-ä)aÌ{&éÔö1QinUôÑ5dïL19·d5Q¢9÷Ù#Ï¿dÛåé@+½ÌfcMtGêÑÌN@Yóf0ññdI$D´j0Ùë]éWÚÏ.iJ««LBMFè^ÌÏ¾=ME@nHìF£Ð§Äè 3½P¦ÐÙðÝ¦æ#ê"ø=J}ÞÇ	Gï)÷Ü<±ñùïYæfèÁ&5¡·ýFm.ûö¡b?mrT°4?øn¡ÏÈªsÊóP-è2Ú¯G#l¨+õ¤¤F<:¨z\`ìèè8½*S_Ò¥gÅü¸i¢èÌªQRøñ!]AEØy ÚÛ®G?ZÑ2{ÕÒ¢¨=J(ÓÀÉóAÛëdaéÜÚüd\`[+­&Åôú=@ùÁÞ»=MØ}×¶×Oé*R»ëÌøóÛD5OÙoÛñäcÞ=Jüx$rçùéXy^ãá,	ì¡º\\û*hþU6Fïú³Dì9YçÇÓF¥á&E|3þúZÒªw|¤±©öÉ6Gf¢GyºªGß¸°RÝ×'Ì­i¨õäEôs=@;ÂC6:¤«4\\Îiòa=M¤Q´c±¶J#àmHÍ÷zXãï´´X)¬ð;"D4Á2üÚ+K"ÎLù2Ø+YÓkÞSÍ¾«-¾§aiÚOÒ=@?kx6lpKÊçqÖãdÄ½· 5ýGM]a@zÖCØc³Òû0,Z,é¹aUü±vg²°þl p~®LP¼ÜÊÕ^ùýeç>YzZå?ãÞÆ	Ù[­"¨ØÕÜk}o÷ÛÆÒèz%Éà©F³kâÔ4m6h­Å_qÖ }ãwJ½|OWÑù#ü$HD&þ£K¥z¹{'UO!û¥xrðcgÏÈèt)ÕÈU¯È}mÃ%Ääíß@Û7Ä©£G	Âü7MlÆà=@]v>5-G·ãfz;o¸Puø,óo¯(¦âjfA>X©Ù:.ÚÊõpU"=@_=M}ø/¿Óøë7Ce%Z¢Í1)¹=J¬¸ëü;igså{.åV¨ÕL^µn@æ¸:"PqaÑ{)Lai¡û&¿@E©!ÞóåEÉã=J¡ åÕQåR\`þ¦u>Ê®&eLoÊâ<*[Ë_òYk4,:èòæëR\`ÀVZù;Æð=@{Ô´=@k7A}XU°Ô±yöûÑr>ë<[¤xõ4 ØÊÔPp_ëbIA=MAàS&T©¹Pæë=@Ö.<õM´fPÍî*c¦ÛúÛËË+7ÀyÛFý&KÊ4!""#0õènÅàJOØà* üáKßWÛ I+!ºtæ&4[fÆ¤Ü=}áèNëIgêòXO7$SÙYbRî@bhü=@ÞÚHµOþ×÷-òÂeT»pXÞNá©nrT^MBÜ¹Ð«"FSÞÅ½Aæ£=M¨¥¨±¹8Í#PH)ûõICà¦ë¦À¹J\\çqßÞj- ³,CF/G%+=@òKü £uë«\`Ý,ÃÈå¡Â=}01¶SÈwÓáª@b*RFY/þb|~82¹wá%C.ÞÜ]m¦&S9%ôw]\`ØzFy-cØßùì=M$ö×PTä.tæòGè°W\`6®XèsÆÉ¦óÎ¢X&x\`/Hy\\\`-gÿ£T	«\`[è^ÚQ4Ý¢Ðè?y£¨ßæÓ®ãZõ^¹ÄYÀê"Ë=}¹~µµ8=@~ÁÏ4©Ó,ÔîiÁ¥±ó·×q¬æ£±Z¹ÿÕ5/GÂÚ+/+}0ÈíÉj@Çz¿×5øéÏqÆ¤#¬¯Ø_ã¤àÛ'wÖÏ_ë×º½îÐØpau[*oò$ñ=Mª?¨Ré4[bÔ¾,"ÄPÃyAð{xKmE´ÙòÅö±,öõ5o¥µ§Â½z}Æhloº«ÛïÃ.Û¼¹QØê|£æüläãÊÕäÙ)8ØÏ¼aF{-ï/Ö,©>a=@Ê*FÀpõ«A7°ä[g¦-]Õ*Ejw$»9ù%#÷Ê©²ºbñJ+g&ÖÂW³'ÎtÝÎúr[Ùèl $ÇËòCTª0®¯rÙ*ìÄHwÿ\`ùâéª¸jîá(CTBX2&%P^P"Ã 	[kÅz:|DòA¹t°FÔ=M?¼Ë¢ÏTÑjµBÎà5Àª¹A4¸Ü?F0xiQ5¬TH/ËqDãüsÂùòG6ùM¬NpnùÄRêJlF3Yt±TKUö¢Ü]+Ò±¸áÇ¡ûPø¯/®5O¬ºU;®ãÝ¾À?GNÎe¥|í	-^Ò~Ã} ¿ÿ­ôÏÑbÇÓÄE óJ-ã=}jS[É$_jÅD¶>ÇÉnÌq=JèH<ÑÜ:þPòµ±Ë¼wÜlÜSÜïA¿Ý~b(GX)dùì Z®ø|¶º¦mâ2_7¯+pãbA1O·6ÜÒZ#@vëºkf%Ý¦4@p	Ú§ã¾îI}m¶	àaµåg¦ÇóÚ¤ofÿÎAç/TÌIZ¿/b)ê)Ü¿c¶?ºìÔ^~Ô±Î<ã#pï! j@JÁ/vPÒºAåÊ$¯0ÙpÉXLöà|»çúh¾«p>%¢CìbD-49{d^H¨®ûM8\\lÙ´DíÐ«ÉYzCW3@èö¿ë¨Çà¦KA¦{×¥â6¸ÿ¥³Â1»3Xß¼ªP ¥Ýö;8/mHöN¸ãÿ°LC$u7R ¥2éCf9òî;!0oT=@3[%åÚiíê,CpèßM=M¦1ÕÎ&DsÆÍm4Oðhza£b²Û§ÑÜMc¸îÕj£¶=@ÚÕðîõ¹¿´ºµ¬®yÌ6þ«Àf±êöÉTN{D¯gð§Ù©Q*?Ö8?æßçº:kÂ­p:Ü\`ãºÿÑAZ_M îwSúäÒÐíÿðYP0åNT#ZÜBdqxëaªÕq#rØ=}ÃÅ@O°^±M¿mí°$Ý~q®'þN«³²?ÖÇn¶ì$Ñ¯EmH¬0ñRÅÝ ø°7+Iønÿÿ.WdÁ=}Ô!xõ=JKDVàwñø©6Þ*Uþ¦¶;.<Â8wÑt'¶2Ô70ñMî¯1Ü¿{È·u+v¸Ö\`ÃÒÆw=@ÞÝÒIÎ¿}îs¢KëÒ»à»lÐ94-Ô=@?ñ|ÿ.<LG±~]u65"Ò|¡£ÀÙtG>ÍGçÀÚ²ß¶yXÉð\\Ød¦J ü_e)ôaä*,î=MZrPª2õ¡ã×	æÂö}ÅUYIQ\`qeòøHÃæ¥³ÜË¶->øÊZã;ÊZs¥*µ[¯Èp¾ÏIaôø=JaT|áíTì»ú^ifCñÒÑÅÐmÆgþ6®®ù5V5ÇúÔ|QuÓ~²ØÞÝ?!ú0!¤ÿ(,Fçs75	SüûypC õ{lö^åÊ2ìUâ:¾.¦Ð¯Åk§¢dh:XÉl ¼=J>Ô° +w¨½HÒ­[îÁ¹ó¨TN7 îÚLÆ2KÊü#rçÉMRGÝ®¦âÊ./%äæÝ^£ÏRÜæê ú¦Íßã§B!ô±´³3¸Æ«@IÇÆª)LÇ5ªaüÍ&ûÀ;¤bgì¬yÚ3rÉ.=@ÅñQÓSuYX~²]ØDµ&ÅuÕÊmÕ¡GË?Î[â¹QgµIØTí=MgRÄù0q0ìjò?X°lgÏÊÊÖÒÔïÁÒðuÚÄö»«hëM6&ã]\`ú ¸põÔYb£M!_·¶«¸ë·_¤Ut¢#hf^QHäW;ñb¦ÅZá×-ÛIx)\`­ºZ.\\i8V1Øªcø?¾³&Lø=}îZ÷âæÛãP1@ÔêÆ1jG~=Jîâ>·}[¤[Q¿pV]gv»Hu<;û¯ì>côXÒÛm]ìv¹¶Ì®ºþj¬j}þ\`lr@ØD,KW}Úå=JÕ=@þCÂìÊ»Bö-Xã±ô7ô²ã%dõúÜ9KÓ&øj£w½BküìvXtB½GLõ-ãÂì¥&ß´p<ìnÙÙõ-F(÷ÒÒ8SäHºÐs 5pKÿMtTqär;+È´À±·GJ% ¬§×ÃwS¡VÛ¡1»ìÙü±r6»_ä:êÉ_ÁÄíÉ_ÁDXÄi¨IêIé9×=J¹	àñùú6é9¦f©&(vù%¢ðñ­eëIé¹IE©&(ëähIÐí&¨ÉØ%=@Po@þÆ?Ûg·Ëp­§ñ\`_æ½Ü÷òg?½ÿÔÌw{" ~KA¡=@dÖÒ{VîLu»,¸	µÓ9;ÕÑ_b5¡8u~ìÇ­ýe½íÇ#ÇØ¤pâýÅ³ìÇÃGå¼~Zç5mdçc4AeçÏtÆÛÄóÈ^çßÁvRçWþÔuV¾kµsxÐQç9½û¾aÔÑó$³TâB.ßj@±ç÷õ÷[LAYOYQÅ*Qù¥vv]±e4/õÕVBýãfäaiºä¡lÈ;Þ\\V84ÔáÀÏ ýãÌò23:^3DöÀÿZum}o.zÛÁán]yHHObxD>P¼É÷hdDîö!C2·µ>í1è³ò2Uâ2\`/_În¥¤ÙÎAÝUû¥þ©qW©õQ´m!ÉTçùA¨G7_(Â©2DX½rc.k|®bÍüèëHöC=JØA×´ý^Þ?nüç%@ ~°û05Ê·<Ì/êY;D6A÷XRÐ-|ËL*j¬2U¡ë8Ñ£¹¾Ç£ïÃdjëjñ´jÞÐK4695¬bìÖÎÏÂêº=}aó#MA¡Å*o»ùDÏó>áÌ0ìóM^fÆ@I<I!N¯daXdÊk¦ï4¶Õà.µ!î@êóU±àòµlêÌöä¢2yí0jâNTÃLuxR¦+´´:Ü=}ÅeÌ×»më?[ûMÝ/­Çw=MWdÅ®¸[±.W¿?< °a{2|0[!:X>/x¥¶ø=@*6°ªÞÀ~U^cZ8Ë¨l8Ú¡E)íàä¶GÌäÀqP<Sû}ñí\\tÐöþ'ôy8D.%1®kqApGìMjæ[yJíx¿O-µÉée:«.&5°Ãvê¨Òïÿ9ÜÍ¡õô)ò©0@Ó©òWOtéûÈ øVù-°è¶|þÐ§OU:5¯¸a)Ø\`?²©¼¾¶h47ûÎßRG¼Ç¿'¡BÑøÍr°=JÊf{C6ÂöZ·ÎQÕ^?d³AXEæG;ÀY}*sâa*~>»áxá:¶Ð6úÃ=MA¹?¬<±ÄþþLéXyDLºTÌb¥þPE\`«W\`ÝîQ¯ÝsªÅ§¹lFmÀñGUÚÁ«½}|Xä6·8{$[»óEj×EÄ¾}{Àí¹þë¬Z>HðâÉÚ§+<3IÂs5ÔÎv!yz\`J^úHdîú$OæÆú©Ýâ"àíµ5Î?r«¥]QV0a.¶ùþÎï\\ëBÚB¹EªbØ¥lº×vw ôþ<'EáÙêËK _ÑxåÀ½ûSóÌýÀËÊ¯¼²Xß«|ERïÿû,RF±6éìëoÁtÀ^=}ÍFFÚ(_½g3Q5ÇdÎ¾ç®£/\\¸Ãx¬¯I*GOaºæ¨MÀ?0f}iÛ[D]ÛÍ¯ÉwäÝoçÙsÂàc¬7.KÛ²y×ÝÄº îà½÷<i7¯y5ä^CöÉgÕt\\Î*V~ªõâo®¯¯DrtlÒQ¸ÀÄ)®v\\ú^TÝd×ñóodEdÑ\\äËKÈL¿P"\` çP¼:ãuýpíê¾ÓÐÝ ­=Mô»P5ÄKÊ¤¼¶¬þs]\\¾ßÎê®ÆL{¼Pò§q=M¦¢JOHì³¥BGrV»§³èäÀÍRå§ÃC0vãü|¾¼Ë¿òè¶Gêe[Æ$(®:éPBf4²°·Ã=MFäM¢Ôµ\\Ï'wq¶{Å[ÈDwvõÜÈgÈè.Év^@M}9[=}X]Ìçßï×·ØdóÂVlx&a©ÛÖ×æV¸þï9¥zBKÝRIsÇ0Ú2Ôæ=@ï¼p.>ÞÓH4¡aóÒE°ùmÖ@UU0¡9¢AÀ¶ÏÞí\\wytJ»Ø7:©³,¹ûuÈéÿdYGùþ*´)6ré§4I?ÚÃâ~#r¢*Éxêþc±ªoPi®ÒÉõ&â² Ïäô¶ÁeÖÃ¾=@bLM°´ý°fÀ=}({ò äe124=MóåHwÅ/bÉXÐ	ìå/~ä¢Í¡QÑ7 öîU0wåJÊ§0bÆÃ=@ÚYE÷-X§zðcÅOë´ÐÞ¹\`D6=J,¬8Ns,<³H~¥^ëÁÝ=J¹ü´ÿL¿¯jYZÉþÿC\\í$ÈHLïÅ|¶\`Émj ÿeÝÌ§3±îSæW*¿J0jÓÖÏîvN' ­ëÒSÄÃ½bï÷Ák´vXÍü¥4_­2_uußJ	-ÿòÕ?ÏÿTn} W4-Õë´ø[BCS´=JmÀ9_Ä8¾P*;J0*ÂÅ²-µæ¿Þ pwHSÇ$ìÏ°°z7u®sÙéK~W»ãMtWÌ=@G×´ñøZÿÃð=JÉ·{ïÝ·»!ÃÑÉÑ®Êß°ò.áDì{j7Û_¨mN¸vE<LÎýÈk¶@7»:â\`ªe» fÛ îÁÛ¢Ö¨a@|A~{[LØaÒuÝÏc×µ0Q;ËýbÆ¤ÔM=Mlø_±>$ö÷v¬=@öùSñ®¸Hèg<6e}=@ÀX=MG¬u,ýðIMnëpP2r¾Øk¨Þ÷1z#m|CSµ5ÝcSú¨þ×Ënct¨GGvºöáÖ=M}þcJik6acXOîöÿ½=}ãr$Ôu@3ÔmÐûùÁ¤7&¸ÅNß4ºóî(Òï¶®ÒÙ0w~Z¼_®Êy(À	ßè»Ô³]W¼×¦?=MkÙHþ÷Q¤ÊMÄöE¼}%°Jµ¹îTzÖh øúäDÄÓàr6µ-\\=@A®dáÚÉý6ÿÁ½Ïl½£k¶-C}yÇj7Ae\`´×)ì=}S°ÊÙ©¼'\`\\¨¢4_-0ÜÖ~×Å§úå¬Õúïc=@´DèoçíâX5!]/8©_>r¶¼5ÞòB+Åg¤bé¾\\ÓÐä»µùûÄSLÑï]ý×Ç=MA8ãýà=@?·dj)¸,[=M×º¹p°P$ñ¬AFÂõzrÞ¾@ùO2=}üpQk=@EYD,¹ k£ÜÉVHz¬§½ÊòÅìW\`e:Ìiêû1ÊIÂéÒdú}ßl =@Ççç{Ç¬Uns|WXÛäNÃ:@!4'L;CÁ¯úmÌp¡å¶×1dLcBl_céèìþêæ2âæ^8ßâ×íßã²À®OT3è$®ð*ôlC³Æâ«µÿ6=}ÏzíÄ*qVðâ«.ùlÊÓ¯1øÚÄ:)Ê¢©ÿ§SÚKÓ/T·ÊÝ,¯RæL¥²õXxÙLrIaZ¹£MRnÝa>IÉÇ÷rmä:C=J²ðÈ¬¨¬o\`¿½sÏcÁRîtÍeAÊÂ>mÔW´ÎñÕ=@FÜÿz|±\\¿g®BkÎI­A·ÃzÇ^³¼V}Ða¢fàÒpùãÃÆOJ²I9_Éòv»¹»z}¯ÄÕÛùdéÖþÀýÇ>ÇPäúÂcl}÷¶Æ­Q£X,qøÄ+Ì¶¡z;3ßÂr2å½Ãjý¸Ò±RB*=@ß*7TX6¶ 4Ý|Ä$Å¾pßABîu×§b¦µmsß@ñE:î÷X¡½b'Âq7uBs[e4IõpF8.S;vÜbSùóöÜTºoú¼vk±Î¥Ígph<0n;ÂJª\`Ê*'òUGÊð¹ÜrÁ=}ÍÖ×¥zü1MºÁ@@å×Ú³Ãë	þøµ=MìºÂ)Yäÿæ=}|% !ÅhäY×ãð ë(ÍµñtáÅ))Q)ÔåmÕ¯ü°n{1w­Ù0¢úür4{«¾¯ mã#Ü=MSY>.Â\\	¶DèKµ-ä[[=}ÅÅeÅÙ8o¯?P¨S£NQ¯T8%ÊÇi=}\`ÄGNÜþÚSÅÌ«ÊgÆNéú07îÌ¢¼n×Z´ ¢Âë®ÆÖMÌ2å¡Ï3tªð=@{jOÓ°¯ã"Â"H-TáR&jªÈZ2¶B~cÀ±	v<EMuCª+Ðïdcv.qr£Ñd·~$R=@¡oý³½Æ8_Ü?Ò°ñ$ÞeüÏ,ÃwáuÅäú7<ý&Lúv[÷©ÜÂêÏ÷l}Uì XÙ×»G.òMX²À=}[ÈPÕa7-³FkªèÅú{©áÅlBMl â×Ú\`R¥ \`¼¯ÄZxÌ|l¹Î·;©ØvÁ8àûl[U¢k!RA%-,É[d¥q½Ç5Õg4åÎÆÍpæûïô¢lzëê¾£÷xUOS:¤[õß$²;ØYhhòttP5ôPqðh×ûK1ºHÔ·B^¾çÚ\\ «S½æCv3\`ÿ»½÷0ÿFYZÝ1ØaKnE}^¥±Ô\\1ãcÅ­ÞÅ¹×_ä§¦/òö×÷dsí]ÝØêQ\\#ÂÐ5ßP¯å~û$®ÛÅÅrûÎ½N^J=Jú"Y=}:Ä<³Â@T²p5¿=@÷ØzÓC]S]<L¹xÏÒÆ#PÒÛ±GÖàe$iKÃD5Ï;=}ÊÔwÅ³ä]ûÑ7^âQèÓ%Ñ@PÙX³9ð.iÊÀ<dKp=M6jÇ"¬®ñ5f¿4Ú3H>ÙOâe¯M¿35Éü£M	Ì DuËÚ*ë&ï:­üOZ{½r¤Uu³©t{Õ­ZÇìàìe¦¡=M³×²ÕÝ¤/ÏZ7¼ÇÇ´úÐ;²µÇ\\Z¨H´³DëóøãÎå·; OOÔª=M7¹¿R\\c*÷y9B£ Mµá×Ì2¡ÎòÔÛ÷ó%Cß¨s%¨wÎ þ¶àd9Î%hE¨Î,ýRpßì]üø¿æN|ÎAllLëûÎ	ðmS}Ùàä½?yÆ'S{XÒÙAvÙ¸d ±ÒõbºÈÓå)â<¨þ ÓcÝôäQ×¼ªÂñ=M[Õ\`f=}Ñº´Â?ÅHB&=@Ð¥\`{¡NEPe5å×ZNs9âbï{=}jH;^XGÝôþWIgwó³6©/5×ÂÄY2 >Ëz½Yê}Ô+÷0ê*$¾^*ë*fxÖ+jU6Á²­ÃAÝ!KR5,$²­Ð6â2¥,îò©Ði=Je=J(£õ|oZôÿÏÿXWõV!¹«»ùfÝÞtÈìÂ=@üs6Ò9T!e"?=M9¸Ú[(Zð"ÝUªëQ{Ë8+?Ä=@Ö©Q®åà]²AÜE<|íç¾FØ_¢O%¯0ZGwSGlÄ«dó:¶¤T¯Ò=}Ðk¡ïkÛR^´Xo§ë¯úiet:{ðRL3=J_³î=@g'¯p÷ÜõÅ]%þõ²³´ËJÐW»üÙ[¾ÒM´NHäÞûöæÃt¾;?6F éÚ_Zé¬Ù!r=Møeø*üCÜf±±Sk_YCñÌÁ&Ø«!rBTHF­dG¾q[Sì0àÀÀ"|±sÕú[«ûFíç0Ý>ûWmqÃ¼^xâÎ¨u³nfÐ·d¨ûð_g},~ÉÓïÔã-BÔåÄý¾ÛcëÔ9¼ðq}\\DõÞU¶.uª¯s)ÙÃ´¿f±¤Ü'áèséÍVÓ $LºsÅÛLPYó¾pÂÔð¾¸OÃÎ?ºé=@JôKÒ>CÎk°¾PQF®ZÆ¸LÞ­HÁººH×$H¡Ãl·ô¢yP¡h2ªÝXõýãutã½Rv½!ÐezÆßx«/»F®4C0,-«0æüÛæá åDé·ð;¶|õ/|X½ô'¥Ë®1Ø½-t28#=@íüÔæ5åFöbôqÇ°=}ä»,f¾õÃÝÁ¾r·=MTá¢?Tã¯¦½T±Éâ%±©° 5µÅú²«âõB0¾8b±_0-A¬uß;W<uà¿¤\`z^.aÈ=@êÄ-qÍ¬ÎÂO~+hêJ~ÊE%,*þÆb@Óò}úô·ñô¨=}-Âø¾{}a¬MËv6/ÕBÅ*s\`uàrUÔ÷y²PVV¢2ºünIb);/!U,°"P~+ïÛo©æ¥BÊµâÌöAEÓxIzö^=MEÒô÷¹v5ËÆAùèõ]#·öµaø]È®ÉÞLX¶Ð=Jã}þ:ØE?dsPHà¢ôà¹ÆÃjE"äÌg"£©<ù@ÅÛe(æ"ékFþË¸µ¿\`ÿozÇg?ÓûWDrufÊ8ãÔ××}¬¡4¥§dy°ÔÔââéÜbMlÌxüÕP$5KÉU²	Ú´ÙPeK7düôý¬m?=JV]¸²{yOåÖîÁK¨¤ÇõçÉè¨ÅÓÐ·ÿÛt¥g!=}ÙõàQ³6zAJ1nwºê øK~¾I\\áÑ(Gµ<yÍôÁ"Ø@§9û¤Ðü^­&þ2T{^ÇòtKÀ|9ûÙ^¨HyÓ%Úñò.|nPÊã*k¦7J.¤ðWÈmàm}ß{Âj Ô²ÕVd,UM_ëúL°Ó¶sEÐ7îW"Wsv5ã´©ÇVÚ5¬C=}ª~5W|%oZ6Óï¾ÅÄð¾Åe­¡ç¶¶o!=JG½Ígø´ÐX__M~Ñs1a ºÌfm/}Íå9ýp¾÷b¤HV5×goûNÚ0ÍT;=}Aù¸d]×~?&ÔÊè=@eõ|¢tCÉÕ>â¸¯J\`~rÅü;^Sõé9%bÿüÈo²K5C¬OA|¦ßÖ\`Â²ÂòölBîÊdÍ¶agÍRN)(¨SÜNH\`[Ó :~Þe4a3ÿ~ëøÒ"«þÒâþL´ <ÈÝ£Þ8=}<_<YXë?ÜJ	3AùXÊ¸½A¡¼ÈU"Ö=}hæ]Äöò Go=J§(áòüìMÛ(õÉË?-Ì%3àßn#õwWi«R#8ã]Þñð»°¼=JäNäåþAcB=}ú01Àüàç(àõ"=@»ðIÛà[M°ñîÖ^\`¼ÒZC¦·^ßâz§~ÜvVPñ=Mcá$hõ­ýõ¼0Z§þ¾»=MøÜã5YhâPò»Taba¶&2(÷ÈvrTn:.??axèMgýòÎ] ÛMþ&víÀ¬$º8n½uZuâÊIâJólô@Wxõk¥º¡¿c\`åéþNÈGæÑ§v¥«T!ÿ^zÎº!Dº_«Oa7¦§.úßú*¤ö6µ10õÑì8¸m@Û»­ÎÒk!xæfcX aQ74·ËCÕÑd¯Õ32_4È±2aöÎz¼ü±T.ß­È¼§ïÚ ªCÛØp!µRÞpj¹04NôzÓ* [:mv¤ñþ	Ü16ÅZ]ÒÊ1^¼Ä\\$Ï=McïªI	÷íÁ/Òw0o:1¶\\ÿDC×YÐCõéOðYd¤]¤»Ù«³=@/eÌ$µÆJÓdu4pþð¶!x¬Õ¡=JIÿ_\\×æaýÀB}ýûêdÊ¼¡q×iöþ<qÿÆ ÏÖ¬µê_÷î«BËªw²s\`f=J'Ä hßZ×°mËÑYàðWnÕKÜV7X}qö³Û¦6^Wýoäl(ì:\\ÅoS_4Ñ8;£µäØ5·wX×t;æ3ÊVÝÿµglö·@3w7%sAtÛjÄ­ëË´üjt&ÿÞQÚ\`±Õê9 ¼ù¬ç^ïÅ3ßKÃyÅÏëÜµáyþqG rôº\\\\óÜ_«MZý[%5,x¥CÊj\\·ý=@àr¢ß³Jk[¦z4¬å_m5ö-G©Rôîú º¨«÷ÔW@bµ«ÂÝv8me°$uuØzÌ0Jn/ë,Ú3?ÜvpôÎoKo/Þìw(GèX98ÌOÀBqèHB&Q=}ò+=Jº-EÀ2W¶'°OPtüS'&©Ílz¥¦2In÷¸íJîAª(F.|°ÁQÞ.x]\`_ÜÖêà1/G¢8´^sàìiWÁi.^ó9­bÔÔÍß³=JÁÆÔkVÏì<º]¼_ý±Ó¯PÃnºr@f9×dQÕN4!ZT=MW8;»2Ò6OÑõP$@eÀ;/j*w¶K+.;ëW­-ñêzw {üÆÆªêàÖ2CZfP}§1Æ1ººhW³'Aþi2=}4¯+ì+iâ9TÚÝXIÚyF÷LUûE ¤«:Ë6c=J±Ùï%êß²-§õë¯qÛíc(0«bªé*ë&+Ç,Ì,g ~èXßÄC=@ng~FõÁÓV¾_bñn=@ãC7Yf´ÆoÉ«gR0mZDØ®	úTKµ¼Ýµî=@0Õï²ë¬+Çîq\\:=MTqS<Õ´æìÚ1¬BU©ÓN9*EìÈÔ~<ÌÛÛgs7H{)¼9A(Ö nÑ2ã|üa»\\UÜ¬VèOv@=JL³âÛ[ õ0(cï {Ë®%º IÈðÊö?Óu©eÅ{Øæ;kÌfÜ,áïïþGâ à¸Ô%ý êrõ¨9}) ê¯=J¥fA'Í=}¥Ò(SQ£µsòLµyÌ=J-\`Bn@°7Þw²ÕceS[QÐn=}:äõ¿A°BèÏ\\Gü	3¶nsé mÙá\\õ<åxí31ÌCÚ_£¡Ü¯xÜ^;øÀ\\¿Z¯»ëËÂY3åì¥×®2\\ïáãZj}£yÌ¼ú\\oÊ÷êØ4Ä4 >rQ¦³hLËh4ØYæÂè¶õÄñmÃúípWq-Ç¯I2ÑÃûxw:Þ)ªÜsZ[n#Üä9ÛSÊ=J°"QÛ&sIúHWUì.A}yT Êf¯¯F¼Õ=J+4<ë¨"fë²Dâ·n=JeäcÛÍ½ØFvCË£(êöÑv×G ÌFÖ-ë-÷_X°"|ZµoKÐÁ7±"Ñ§øïÚ$_MØXm{£hb»K?øçb§ò¤Ý6±À¦µë~9_GïÑK°C=}Bhïjf÷ºÑZc:ÃoÐ? w*A£7TWè÷ÙÿWÇhÙQÀéÞyÛ?ìãï	AaM¬ÚZYK2'ýLª§	ÎägöRe!¢6û*¿{~¯5i£§þÄbÏ2:\\oõÓò÷àöëv÷^ÆÆb÷ò¼¤üMö³Éåë.Dµ&S1&2\`ºmà´DöuO¥êhÚ(*Ýj7ÉtZ®@(¤\\Hnzx³'·õÓñÄþvf¬±ïl6[âpö{]A¬8 ³¨.Þ°Bw¥[Ò´&_ÖÝ«â9Ñt³	AÂy>X7	¦~¨qÇÈÀ¯H^LÁ¢ÿ7¿Øù=@Æütg$O5'&­l¹)ùÈ"Sè(Uá'ÿ<¹¼"¿¡h;OÈJì7íùs<éâÿt $½g£°î÷$Au®Øp·úªÚ=M¥ýÎõR tSé¼0%°ÛÙÎXNö*NàË>ª#|­÷Å¢QU=JÓGR?f2¸çÀ¯ù6ÊÞÀYãÈyG¥ëôW)ïKvÀWõ¹×8vÜ\\h=}Kj ¤ÏêçD9õxh×5Ô6/ Dò\\¬c·×uÓAÓcªÒeÒ¹÷r{?9«t;ÆV×¹Ü=}tÔïf8¿é?*¾ô°¢³X=@fz«Å	Xk"[	=@üèÁ¡×éöà6JG¡D]¾f=}³tÔ&üÜ~T-¢×~¥k¸ÓÜSÚ|á ãþ|à¾ýÀ{È7¯Ï°Ùå=}4Î=}\`.·måûFØ÷³û=}ÕJñ°/+ûâ þL{×o[ýSS©n4ñ;£M½kP4ÿVOÒ«ZÅ«²¸{«L_ñ	¼©Xi°,ÉïÈaEcBÐ¾6$Ý¬­¯AÖ~?8I=@5°Ò´õu¬ì°¹¬Û«M×ÄvX®©þeMG^¤JÔãëÕ©{4ð%ÔüOÃÔ\`QWÊÔkÙBÔôúÚËPm>	ÁÓ=}ÿ%þFç	?°7ÝðZ.\\N[ßø4^=JÊÖ3ÅwÕ|S°É¼0á}:kIi¶Ä_üëjâÃÈZE#æ/=}{!¦9hóAeÃÑ{k>¨ÿ§ÎôB4h"q:ÍEÕGÓ£7F¼N*|1¯|ÖU5°NÚ.,Õ /a~YÍÓ0 °ñØö¯°"}ÃÕµÚå@?xkÑVtöCj·éV£ÂñÛäÀv\`¤Ç	¦þgqÖ¨Á(9¿5!Ù=@e F+7ÓBe½õaÚ4øïyD]íiçK¨ü¥' 0ÿ¹!"¥ðô0þðë¸|ØjÞ¼¦iºAçõÏ"µ¥ë<¡î²òÿ¯5Ùøyò-yÆæ¾	 ¼¢2ùÔýpa	+ñzÎ1¸}À¹)Uiþ®ár¡õ7´Xp\\»=M©é!IU·=@Å*@i#1±¾8ã)Àl;­ªÝ·d=@Lnþ¯|­ûÞTß¡\\o&»5i»W1ãê´âáÊÿhZ^ãò¦hÐ²s;ýðYì$v=Mùë\\éS/G$#­ß¸D@(V§J»ÉùwßZ¦×ae½ç¿wÛ0ÉpüÞÐuP=@ÈüÎ!í¶M£Ûã÷X\`ãÜ\\´#ú¨±ÇRýäÜù÷ß¿s]Å0ðCí¶WæõGå³¼)°¾ß~K=MÝÀµÖ§8ÚÜ48ÏÍÿA½V.ÎÔ|ÀmIØçaiô¾ZØâ ÈEdJ|IiÙ>SLcåÁ=@>mÛµOqeËnºByF""Á4£3ÿj\\×Épu­x=@¶wU(ÖÂ&X?=M'À>½ÛÛPB] f£;Ú=J=@N#Ý è­»¥ÏR±[ðI½kâ½ødÝ-û=@ùPºå(òÙ©5Tái WE~Ñ4à{ç³§éË	à[L¨f^Ým+èÛìùl¹d+b=@dlµÀHÚ@;l1ëÍÍ%Jë!Ô4Ì=MH¾¬\\nâ®5½jGòÐ÷PoÌÝwk®9ªÄ!éN±½¦Q}\\ú.©W¬,Ò¨+£Æj?PlüÇ«á8ªösH¹Ø/ºG[M>ìL×ûBc´ÂÜªv¶,¸âçÛ¸·gdÎ*¸ÇP3éDmêÌ¶ål=}'J°t6±?gI9¸:gì=MôÂröÝbÅFÀ¡Oé[ÝýËv»6.ëªtW±å¦àÞ"¶VÉÀcø{þ6.ê~û5ÖKÏm5Â-Ú	L£xFGp=@¨]2v@=}þ+eí=@ù]DJ ÂH Öø&XJìè±¢>Ùûú¨²îêÜËC uú¶Ý=}M]+¶-Ó=}«¥8¹«Ý 2:9¹=@ìldå\\lqQµÔjIµ'¦WdD­~²Ñ;\`ømßsnÛoWØ¥.=M§4hW*ÈëÅ²z}¸a:ö®ê©ï±zö¾õíE³áïNS©á×'E©çê@¯Ùi¹ÝÉemr¥«=}qm$Æ»!úY¨<üÍ¥ùÈ(ÈèIx		ò$ìÏ©vüÅ\`§&Ü'àºè)ª»Õ ¥çõeI9÷Eã'yh KgdÓéQé'"q92#±·ÆiYã¦kfa&i©ïò½9©§µ)åá±À)¼]è(÷Ã°M±çÁÙ'åËºøgÞSá±^ÆÎIeQ)å9wè\\s)¨ýÅÞ¦ÅKçZi=@##		Äf¡òñáç=JºH¡²=}¨òý)¿¾B£ uø)îýK'ðÃMQé¾ÏQì!1y$!!xxüÇ'Õ£AYQÎq¥p\`YäÙI<üÅ!©qYf'ÂºØFýéÞÙöEl$)éþ?9æiÎbÝç&«I§bó)ME	ó1&r9÷CóçÆÕa»f)'ÐÁ×ÅÝÛlä!Ê(Ð'å7	5Y)»	Ã¤=Jy¼$i!\`éurÉB·^Ç]µ	¢T#èáéA5é°CMÉ s#ÞóKçÏY1¦!3¯©e1!búº¸ )ðAh¡=M¼ºøß¶&"Îå¨¦þÅm$'%!¦ï97°mpÆõÙ¦¨¨ÔÁ'íÍ1§Ps&ûÃy×7Õ9EãóÙã#$º¨õU$y¥Ô¹qrá)%E¹Éà&ó!y$õHÃ ØQ¼ YfÓágÁþ©)H¥q (É\`'ùðy)(I 4WW'Ý ióU±'$	ä¢±µl¤»U £ÿï}m$)Î¡hó=MAüAH=@©÷áy$±mdÄú)Ó'g#ï©6ûð(¥É)Ó­8·Ýq\`¨?g¹2] É!©\\¢¥|é1$°GèÑs$ûèÕ§Aénr9ùE£	ýÿé$ÙK§þ(Ei_åÓ=M¡Èèª(Ù#ü©µl$ö³'ñy©ð1¯[Ù©&ÂEÑÆébÎ9eag Ó4A$0è)þ9V7÷×'QèÙ)çr9'Ü$'!ïÁ°Î¢&7)Æ¾h9¨=MÀ·Kgé=@=M±!äeÎ@$i¢ýá)íK§øME!&#á'¡æ\\Å=M¡\`hCðìòÀ½X¢´KçÏ)±¡i!ê¶'¼WM1  ÙY6÷GM}¢Æx3!èÜ)ñÅ	Ú)}5ô»EçÌiËÍ	bú=M·ø"v¢è$òí¡æ75Ù4¹%=@6)Aû·s£#(µÐÈÛ©¹mda¸áÈ¨bÎy©ä²ÙÉ ¾Ñm¤âýowñ%úèÀ(È¥¡rÃ\\ëQÅijr!!Í	¨è)¼Õ)$µØa°èU©'øQVwÈAqx"9Ñh\\>ü!á·6ÉèÖá¨\`ÎqÉ%ð«9@©'ÿºH=@áùñ8)ã	5Ë	G'&ýg);üûÉ\`üZ=Mi§fÎùóõiúÉ9ó}qà=J%P&Kã)Õ(^£èK'5%	±ÓqFnréé×)5('y6#WMi=M§]#ÈºøgàÒ	#'mri^Ü·!&'±i=}ühç³Õ'ÿKç#Ûèq©ñÉãSÎÑy©)Ñ!½ºhy§½Y!ßqm¤9$Pç#G©¨XÎ±(ÚÓ[èðÁd)B=@Åý=JË!3=@õHíímd!ßèÃq©=JÞ?Q°=@\`çþ¯IhçKgÍèíè!ÏY¦NÎag!ûèÃ¯%Y3ýYÉ¡_KHÃýu9#rr)é è-VÔ!G?.ÛÌ;ÏT4@nz~;gp1C:«+S ¬O ·D·WÀÒÛE·O\`p{O=@î´çEô¡ç\`ø©øã!h))ÉQçéÿéßèàôwuÇû!Õô¥xÕ¢ôìÀ	U¤oÉéQ=ME'ø©=JÕ¤ë¿ÇÓ	Àº¢­·ÓãæÀ¢qõò´ØÊï9²sIbá´îi4bæÍrÿ]ßß"-Ó=M±Åd_¼âùãªò Y=}¤®tæ¨SuYÇxÙLûãV]õ1>ö¼¢ùQ+Ï¢pñuæ¼½ë¥ol]­Oè³£óO¬ñ8bÂaÏäî1ê\\(í«5^$Ñ$þSiêtWé_=J'âa[Çau&=Jþ3[a­ÉÎsf¦ªÝ®ôý¹tbçxï¤N¨Ý½ÑÕ) mtEÀ×æü=M%q<éÅñ"~ä²¡D'/VÉf½!³ÑQ+äcÈú?¿b¨5¢=MïµNÈ"ïaP÷O0¡-°£¯ÉîÓ¹£Ù&m³çE=JÃË$1+§Ñ¦© ³%BØÎ!é^l(ã7o87ÄJ]H°¯e¸c]vU	ðs(Pr¦Cun!Çs&;íM9äW»¢Ýì°EµèÈÝxÄ¡ù]$8³	Ö~ðß­<Ý=@¡C³Ñ2ÚµeOÈ iê)&¥Á=@9Oh¢ö©a<IzÿÚÉÔ"6mã?-¾b'Ê¶ËýÄÁÁ¢÷ô°´o1XøÒVO7¡¶ók(<iüåë<!óòßmÕÉræ{õ$Éõ'5³ý(c9ç4¸À"³L°lõ=@Vbjé%D,¥çâ Þîý´¦ vuhw´Ù¾©[©«îC?fC[ßî±ââ"×'°aÏ$CàyS¯W S×(¬À«xéãL'þ=M-Ø%wÝUðÆ¤Íû'óaÐ]?!Õ"(!±ÿµÓ¢ô¿¢õ=@ÝW	ñº÷Vµ×ÒáßÔîåL´±Ú5º"³0!áaLìÄuFÁ|5WÆq³ÉÛE¡£Ûâî9äBÖÔ¥£³!þE\\½ôEØø@)\`Ûiv¼"ÿ¦ÀêèÏEö¿¢lµ¨û×ÄAÁuÂ(÷<y3^f{^eíI/â¥"=@3³YT{ýÛÜõ<!]F7WO(a³YÃ^wÈ=Já<é>ÛR\\ïãá7]ÕèÔºùÆ9_(ØÌî¥@ßàh)ìÝUDHE)§³=MjóðÈ Ë(ÁÓä}õEi1µ]ôh6M>qµ·³;Û-N¨ÿñªªÅA¹»¢-uÈýÙÅK§¨mìÝ¹çÀræcµ'Ëi_%ìX7YÓèå"=@ÊÉ_F°µCIâN"T°ÉE'jÕé¶OÁ!&¨E¿^ 7HH!là	ø?¦/³=M'\`8¿â5í¯ú#GU¾"cauÓ_YÉRðÿWAiæÞ·î-ÄCÌµõ²S¿6Ága%_·½¢JmëçYä9½"yu«FQÞÞÚä§U	l6Å×ßkU?ØÏ![b^\\ëºî9äyÃ]_"Æî\`[ýÙ´åM0ÏW±IüY£S"°×Á$å|Ea­ýÕáçÆN8ÇëámíTs&®½ÝóÜC_^û|^'÷P·NÈi¾þöOýí\\Õp±»(<ùÂ|êè<à6v±;(+§V"#~³9ÞÒ=Má¹¿=Jµµþ#=Jþñæ¨×½ñt©lxé³(mËÔGGpßQ(ÔÌAASTé£¡çdk¸ì>uÔù}ärÆ>;Ø[=M3S®o®^¨Î¦ÙÑ­Éòõ)G8©px&¾OôCkÍçþæH)¤(Êç\\iôa)(Êû¿G³Ó,Ë®Î'é­úô8}4'¥£ÿ=M_6ë±Ë&A¤GØlo,oTÝ§Ãéf:¸²\\qO7®¡¨fÑÝù*¢%ØýÃùh-T%6ú]ò_ãÔÜLöpÝò«úÊzÞ9´Ëwú\\RNBx¸³n¼ÓØhVKX=@qNBw¤ÂÒT$²ÒÂÂRÎhc	iTÓa-½­v3ÐnðOîï´ª¦\\¡PÖÕÅ¶í°Æ{÷÷;3Ð¨¤i®5uúñð¯Ýäin._ÕyZPÃnk©Òl^L¼SùëtýÝìÿ¼¬÷çk,=}ZÌÛS1ÌÐ´rZÃ;3ÛðNs¤þJ¯¨Wo~Ì/ß§¾I@¿n¬<w3'Ì<n ýÜó´ÐBÍüK{ð{¾êÞLÎñJß¹M·V_LQÿÜ¬F§½{W]óþUó>ÈoÎcXk>M¼õ°Ã¤C½=}w$â2§rÐèÿ^Þ=JHá784CFÞ§ÝyAÊ =Mé¬ü·{$Ð¬0ü}ÍÔn¢íi6\\½î!¸´['cèxð.Ý\\Æ7ÍLç¤E÷»FFë;{3³s¤¹º=@ëw'v3³{T¤ ÖSË´ìRÈw<¶\\¼³ÏPPOÂ¶Û)Ìò©ÍF¿® û{Ð[øö:¸yxÔÔO>ÁFmx[·$°K×ðÂÚç[kNÉºv<öü=}v$Úââ[ÊhS¸¦A4]Äí[{Û{/Å·´>DNÍPoà¶µµx°{wÄr8ótÊ £MÍFÁÎÚwl¾ÎAÙûÉÇ\`Pð>¶{qò»¡]¿	¦0â$"ñ6ú}pLL<wsªÂÒÖ¶Ù^ÍÉÙhóBÃÍ¤ ·hÂþÅöë÷Rhî/£B%CÍrÌó}wAÈÖZLÏÊãIïÈÄØ3j?§ÜLÅwFn¯ÉïªïµÌM7ÝtÉZzÎqõÌÕoßr\`q5¼¤Åb»{ëZ¤9sßñ²aCÍ/ýÜ÷'=Mös­³£Í<Ý|G¼nToËE¼÷¬/ìÓ)<vTð2°ïz»wBM¥RSëUËSÂÂÒ1pÏU\\Ö\\ØÔöbßÐNtªÿ¿Df£úÊ«$n½SÎ¹Ï¼LýÄ$û.R3ÿOc°Å<ÍLoWÍT®$7¹´²Ju³Ø;ØØÔ=J¢ßòR{b·´ÔÂ&|÷ ÉjµUîÙ6&3Þ!d9_RÎ]¯'¾à¾e8wyè5e1SÄ;@?+pôd#2é<4´äÏW¹^Ãw3{çâ%}ùÓXycÜ%ç.ËVë¯=JxÒkÒwZ:Ä:l3323®RlVK¯Z·ZÉvx´ýÔ;xtj~7©inÿ>ÁÌo¯®p·ðË'ÿªN.ïNo^lå ëB=J=}km:DT~ã2æÍöÿÍ¾Ã¼¼¥HÜ²Öz@»ÐG=}®EFF5±û¥Kî=}|2=Mìâ9Ú?Ñhõ&-¦ºìe33Næ@13Y3Y2ù2y3¹3¹29392¡3á3a22C®5®Ý®ý®=M®M®'®®~ì@ì¹®ÿ®353Ý3ý2=}3Í2m2ó®l.Ë1Ë=}Ë_ËckæHjM":T=}2X®®Ü®\\<îÝÈz»=JSý%=}D;;ä=}ö®;®231Nw¬]U³CgK¸Z±Ú¹Æ=JppÂpblòõîë®Y3128ãcz®®U.9ì lEÊO0,ËæWÃ¼ÚÂ¯z¼æItBxobs¢vÚÑ¾Pâ<3¤¬Z.;ënRqbì2Ài°*l^höà¾LEÑÝBOðTÃ=M4C=M>ÃEC0CLÆö=JoâwpÂmp&çqpB%î×jåÿ¼ö¯öº¢	ßéßXãíèO}åófî ×=@|¸qÖ=@X×ñòNAX»1YF2»®hËNë»=JuBrâyBñ" vEì¦-Â)6õ3éß¤ÚA=@ýÀM] eÔÛw7èÕ-èÉÞA¦tÄÚÙ1\`}/¡0ÈÀ@ûUa?H2ÏcDE6bá¢áB¡+\${On,Mö : RxSPÑ-UòFb±ò8b×=MB(.âÃ¾8vhö[c3vbõ(ù=J07XK	Í<¤îÿ<\\}ûájhUí=JÑm%&d~UÖíøÌdæ¡=@sGp¿ûjcG\`Èo±[?s±ñ®ØÆ]1±/äÿÕæ ;å\`ÉHb¨ÆÊ¯û0(eKmÈM,pÎJj	JÏH	ñÒÁÕtÇG	Zò½|±Dâ8S(Æ3#IeÛÍq¡<,#éø¾åvãÛ½¡+«¦P|Îdoî;oµ³1QÇ¾RÃÕ>¬=MYÞ.¹3í£=J*FÆnàimúð5a©^mkBMý¯yÃÔiÃÙcíb×æC±Âx^ ù:Þ¿É9íÄå¦¨õ#ÙDÎ(®Ýà"÷­a¾÷QÝïÕGpËÝ­Xý+ä!#Ë¥*äñ/Ëå2äÞìFÌ)S#T9vyÄ(ã(ø)éiéTÿÉø)¡&))¢ËÞÞ"©1))&Ç)'¡&©Á(#¡¿ê)?ûð)(Æ'Ó&)ý=M)é)Æ%ÏB­)#)ýñaÑè=}©=M)BYôÿ.yØcµßæ%×¼åÆÏK1ë@¸ãêí	ïF cô*Ø®S!ãtt©qÛæÛV¢Sáæ¡ðë3eîÉ*»ïÆ¸>=Mc°kw.Ì/äì¶[¶ç"Ç¥Gµ7îA"ÝßßÝõÁéÛ<æÔ%ßJtUëÆh¦ËÌU¹§µ'¢¹jÃíÀÓ5ddÁ=}åý©Ö÷5ÿ;ê/òøíÇÛ=}á{vlÁ¼Í\`»éÚÍCA¹Ô¨¨pùØ×g<7¡=@IÍ´ºÅWU¶I8'>¨öÿ@;Bðä ZÉ±XpÁÐ=M5ÎÞSÎ¿Õ	â§nÓ¹E°II(ä/ä\\\\±×G}Á|ñJiFiÔÓ_a*¼Z3Uºçpas¡lÁ¹£s¿tBÅÌ¶×÷ªð'Þ&Mg4P½¾FÜ/GuçîÒ©äà.¶=MÂëbPÚ\`ûüFßcdÁ¨«w"ßl;í],I(F_sÅdO(ýÀÝàÞÓß¿"(]ý"s$B¶ó¶^¸3=@\\¡³"ÔÅUJJ¨twHh(7 ÷O¨±9ñº±ù{\`½áéÈ|,.mÀR}³òæ´°;¾×|ÛîÇzNØð1§,±Ðà\`\`\`à\`£e	VæJËãÙ&dÜ#8@ô9°\\æ:íC*& àà¸Vý}bÖô¿ÑýÛ?ãø½q&ál+IÉ#Åî!î´æY¼!=}ØïÍÈ²½!>£YV¹WY¼¡H­}Î}¼¹b;½ÍfI3ü§âKòA¡ûJAMlÇ´åPAe³JdØÈµ?¡Og}y¿¦æµØA¡1£ØÞm:´md×;^/F,Z ÁÿeAÕ2T\`1ï3!ÔYu®åÚ¸=JX/¹)>Î4dëlôi%µ~¯äÊ¾Á<í¤ñ¤ù$®üDÒrwuIðWô=Jp<>ö»ÅÃÕRåLåíwÜ?ÿ¸´¶×xè>#ÿþï½ª¸[Ì._)8XmÇ\`þM\`"·|t1.]ègµI?Øþ=@x6Õß7mÅâwp®DÜµ"w¡¡Õ_²QÉÞ¼ò=@2dÞ=@2¤F¿¼hoùX=J=MÐ_¯X×dúì.ÝgÞò£õù}w^|lÝo¿Ånµ¬¾úf?aáÙn¥"×5 ¾µ±ño¾¥ V¥K¥quZ[×Ç «2=}W<|Ú\`t^|¤r¢²;×:|õ<Sô:×O©A·#ÞDGõWöß=@m.§ÊºrûI»vû9Ç¾óÞÕw¿ÑNâ3ßsßê=}ûn3A'µ[Þ}D>Ä¢°¯;.¯Ì?dEÍbHSÅá§³%ëwà}³¹¥	Cpg?H7ûIýÉqüYìDq ¢²ûz¦Ä	ñéÜXQ±&ço¸'Â$ÏFkåÊÆãJ;Ì9~$ß9I21¡=}2Ì1^TµÝYnTiÏÉ.g¶Ýc|çZO·Eÿ¸Ý¼}úXpfüËüX¾°ÙÊhQiÔ¾ÕÏÔkóYbjÏhQixàø=@ ¯¤w/''>¤i+½¬N¡JÏE<9¬ÔYÒ?Nå©D=}sÕÊ\\Vµp@¯>2húðì3DaÒ=}<z³Kl<7OÒAµ(zý^J1"rc:ÜRpµ=}gê·éV8òÇÉÄCÇã[7Î\\²¾/[ÜØv$çI:¥®Ut÷é=MbÛõOG¨P¨³Ú8!¢'7C¶{éï[¤êf¦ª¯ta\`×5X¼x_!¢÷ºÍ®IÚjÁS¦Hx¿¬Jà@ÓtM¢ó§Ë=M/ AgBaI¿âAâm7 òßÐéâIÐ)'¶[3½fºí}OvÉÍº=Mm",Õ¿úËbuùq½­"¿]2=}?Ù.!}Ì¯¹³ñWO	w$f0«EtÙãTùî×WÕûÇKé²¼=M*l²wîó{ZÁ"t$l4±+AcLÈð¢]&>ôTf=JJ:üÝp¥c]Æ~4=J.ýwÊÑsxuø«Ö=@&î*gn;à1¾%¶qC&lTÒ[:ÐÃwIùwMÖp×C0ü¹Ûa<ðPËÐØv¥nä¾Z*¿ ø=J©t=@0Ð<£u=MqÏX1ÈMK8ø÷þ ÿï<Z½Y¤'Q4ÞteOqhÐ¡Óà6Ä=MOÞ8'xÕutÙÄ=}ý¿Kñ(t5p[(¹äf{àÐNÐS ×=@oYÔÄÖ3ì£@Gs9V¯ð;ßÓ+´]r¦1eß'Á×=@Þ,y'XÖª+p¸]ìuù b®zÉú;l$ÿ\\¯0:üsóº¤ÚÂ7nÃÄ(õàªó!YæÇ¹ÙLÃ·\\èóxó	Ò+÷0²c\\Sl=@£­Øðæ·±³R#l×=@ÉÅ¶óêdS,¥jÓAD@ùõ§xÃJ	íÙÚ³çjá=M>·zrË½§ÉìÃ/9Bè¾$î·F#í¾©i¹óÏfg±º&¾&U´ÐAá{·y3øn²ºÕF¼W<¤JÔ¯\`Úm]µÈsÆq×«²©Ïæ5÷ÚwØÔ²Æ©³{äð¬fSùÍu"¯q¡:F2P¤°Ú¿ÜÙðõéº$}$þÅ8¡°7ð@Ï½´0:ç9=}Üñ4ÞònU®¾ù{NbªDl«kx¦ÃLÿ8æK~Ë0bn9wÍ]*¹àl=M½Æ¹é{³ÃïCäº¦w1zj©NÖÑ\`zõ=}Xì*OH¼ÿÃ)A{ÿ>l¯PÓÍúßÌ{£¶Y®×=@$þ}$Zý£ÇpRsÓ® ©dk·=J£pÕß.prf³}HÕ_¯äl¹=@ÓÀ-%T¡''3l9Òjîr§WmoYjòè'_õYìÕSõNé¬®þAÍaÊ¸Îº¥÷ Yø¤©c'I)\\Y| ß[©®vÐÐÇüHÑá¡ÇüÔ® &_è¼ExuWOç.·y¥=J/yr	]¸¸Mm¢)ÔQ±S2·Læ°%Þ=MÔè£²1tGeÓoî'<ßð9¼á®ÉÚ@A¾¾$íÀ¥Rá¯\`§³k_¸v'.ñ?³=}ãA:yï»F¤hç0¿´GþBcØ;4'×Ë´ÿ%Ús7Ê¢ÿQ:HkVö½D®Í5³£Ïü­#æ¯|¤m=@¿×7h=@,Å?©~Õ£À8:ÂÚ/¨õ¯vá~¨Ì9òäS ß=@ÝSÍÄA|Xu¡ÇÀhîsÏì°53XUõ@íwm?o]fG_ áÌqhíPÏhpGÊ=@?	m)7¾¦ßá¯55YÍâÔßàê|Ã¢0u¾Âäì_ý¯Æe5ÃúÒÂsãêBñ6ÃÕc»þ;Ì|Vy1ÿ(5§J^ëñ éI_nsOßú.}ãìNlq}-Ò)JÕè2#»t}Ø½¿zÈprqGJ§ÌÆnï:héº©èQfª(Ê3®@"Þ8zO+ßnj¿©8nI=J4§I×i-Þ)jEzi)ò(E\\Qü	#ÑN)×YòçP=Mû¼Ùóæ¡½=@fµ|®¯Wy¥¥qcÔrøO~¹ó§lM2ó_ê[²¯Ë=@Sf2ÿz'°ßî®éÊðH«Âe¿èë#V	ê4Q¤cì O3ykÇ;Òþ2ÃVêã¬´³ëKð©kñ@Ûÿþ\\fVwij+îg¾Ù¯/ßZÀ/HpÐxúÞ«3ÒÛ(ì!éÀÿØ)Ä1=JW5ùß(,e³ù)#Zn"!,=}HèâÉÊþ0ò<üÓWî&JW'+ø'Hô|®÷WèEìqÒÑÎù¯í|ô4K)LJEè²\`ô=Jp>A¨ë0á?²#ëaþ/]@4ð\\~".I%-øÒ9~Ê+[Í:|éÅù3#éT%ì-:è'iÜ(HgQf¦$¤´±Û®éY¥Ì|¬Â+N·äÂQ¥+±Â!ÕÛðÙ¤'TßÔ9Ê'Þé|_1²ßJ'i;ü¨´s¸&þ±\`)}%$$ßÙEcçFUïfÛÊâlX§?[½òq{:nÛ-ÏXÔ£5S,\\·-#möÎNóMß|X'kNXÒí¤ì¬yKG/2f9ðe\\Æ"¹³iPØ×5:µýÍVp=Mz]¥dQ¡þ¦«Úµ2Â]½³·úÕwP ·Wð§ÒØ®}K7û ToÃQÊPf©V­å«õÌ=@r^{?	E·w2D=@-éxÕ­ Í=JZÛñ¢æÛ=J#¤âvà7´~¥®¦QLà¦V¸9­';¡^ß/5Lí%¨9¡yð×11B&.Ùïà=}X$hô)- QíQ¡q6¨	.¹qmÉ¤F¨ùðôÜ"ìb7 Ï=MõcPVT=@-½EpôcU=}mâ©µíGÇoL0³sRãáS¸oÐí(OC¯³' Ãú¢0t d³-½´DíyåÂ\\ 6×8amdôoiììÊ#äB(ZÈ¶WµK}UÊyÏK"ï&@h'~Ù;\`A¹¼Û H~3i¦Ë@E]Þ3ðæ'{­ßd_.ÅÀùl8é=J=JuVS,K'M¦èAùØpÙKÙ[§Q>¡ä­ÞG{hI¿THëÙ=}$Í%´¦ÙEÈU·¼iëlULôëÆxpÖ£>í°É­µ5Ô	G¹å¤û²Ýq!$=J¦#Vdå¶õÐ=M¾µ1fðïøK©âdb=MúMRÈ=@DùôXq³Õzßw¶6íÒdæÂü79qã¥yûÖoM>¸f·Cm¹°&C#fÀÆwÚ >É!I¸O¥pëBZ8=}<1ÎØ²e«!Ü¢è2P¹¢.á»bB±ù%ëïS[x°=MË(ò=M6¸wÁçbâÙ[l\`v=MÁÈvÍßø£Y¾õÇ{ð{î)&e´0èêy|Úxd8æ ê\`]ÚåJÔ®m]¶&@Õ­{l^Çè1­Õm(8Ûrh?û¡ôí!òaB,k-Ù=M#¿âe@Ø	H·cè HpÍq9i"z:÷lüBw²óÕËýÎÜñætÔí¹Õ¾k+èÃ~#ç]ÄØÄ´Îeã#ß<70Ý.V¨®S]ÀýÞÁbØ7¸¥4'D¢ZÿEC«gúÊ¥¦c¨bdÞn^îÈU¶÷ÔÍõ® g­=J b°µR>µ"/£Í¥È=@~L!±Û´Í£z¾	¸ÌfÛ)DÖW=@H}Ù!ëâ=M{O«UÎu¡Ì©C¢í!î	å=M¨	?²ýF7Â¿[4uùlÍCIzöN"0ðd»;i3ïá«¿¤ÔCÉÑVl¾Ù#9ÐÐÍú¨eG=Jh­)þl|ÌIìè¡¬ò8FBé7¯EH^y ñ­ÉÌõ8Uà4=MÔK¦>çù¤_zpSÞÓå4Áëä±i=Jaqî3«!Ê»=@@I/%ñY{ãëNî$økÇw£»®$%Cl9©¹ß¹ tiÖÈh-C7¥ÍÙõa;¤yµ!A=M±=M´½Y"ª&XJfN,9àêý­xG¡ËSÉaºæCfèè¬ÿSh²Â<£¸b×µWø	V5íðÏ~$U"GÝqí¥RäS~¶ñÕtË¿/x(H85ËªÒ"ÐI0yö­ï=}Ú©eîÃÙ=Mû-µø¥5oqé=Mñ\\&"îE½p$(Bý,®'SùÛ_&\`Aiyï³õÛÂ¤ÊfæX(®OØaA§·Éd«Ñ!P¦À\\6AXqé/[âõ¡ ìÏW¢¥-ðöî"ÇIÝ6Îptfè^9Ö?H«£¶Ö+Ù<:ãy£±Ù÷ÂC1èåäã¶-·=JÖ¯miíò´#j9[ÌðL~²´Zñ} #îEÅMä=MöÕm8ß{ÁWÒY´Ä¥Êåùw¦Oôrñ¡ÿ'áS)rGÔ,è´ä3¡ØùÇlç·ñ@k)'F¦DÿäíÐa7{ì;6£,Xð@Ff, §hqÿ8ïê¹WB>2ñak½[ "=J¯ÉZ¢¦wfõîà5úåyUÞ«¥åì%Tø Ç·1ÌjòXíüxgzÖ(¹rÉ³Í¦oÓðBFä&=} ¦«:=}g¯æûÂÞ¨7\`ÎÇjÅ8÷zkövrñ<¤rz5àÁ0=M{®¤èïÙ±9ÝJ63é¶£¨ÑYÀøtq)ø:IHR´-úÎn=}r«}ÀAZy	¹_åÍ=M±R=}:ðç#H&$6Xm8MWòùx°ãùÖ)ÚIðºs²å+ñö;ÂZB%µëÕ=MUÃ¢/Å9Ñ0a>jü tâ_¾ÑHøwj+ÑTB{Li°oöªøýC51í±9eû[";øý ) èRP	°çÝí¡¯eÈÂý[ÉIø×²wU\`=M"û¬F·âx_{Ï=M¢ö##0¨ÿmAÕ:W´b´98W#evÓAµÔ=JÃû¢éOH'¨<Glßdp"¶ü9î%¦¢Ì9Ô¿c± ÅpMøNÞ¡c4Ù8Áºà)b¾&0ÏáLbä n'àé¢»l¢ø!=JI£«ÄÓ®	á%{¦û=}»}¤·qb~¦U¶ÇÑ~ÞCßI,5MÍ]¢Á$³zËt=}£ @1÷ð¬ _Wdèñ×«iæµI&äJu¡?pä#=MÇ£}Sþ";Uù@n¾w]Â\`fðõ[ØVæc±4ýaò@Â§æ,DVæ®uwe=J|nh²ö#ïÃHBFã>6l±Áµ{£Fitåç-äÂzë6iÐ_4=Mð×/ú&Gç¸!zÐú\\+]ð%z	$-ÄE­YE¯ËìÂ¤Ò\\04EñìÕÎ~S¯påF[øT0.¶ñ´ça×å1ù=MN£$XÂÀ~°ICªÏXëgÍAÌØ¶¼ó_±Ég)=}DYþM î¹¯mTÌúà(4´æ­4yÚÃhwÚ:¦Ü7\`é·»¨ïaCpbMß¥XîÒï	KVvH®»Lä$·ä¤òß(¢)æ-lß4¬üáF°_:ÉæhbsÆ rÃßb/üÝ÷û+rôÒü¹RÉGNxÇÏâ¶æëmd¦·$~×Läµ>;Uña+C²°äþ¹l#BÉeI)QFGBõµ-oH»](ÙæFC³6ºrXz4~\\.wÐ=J©±3Äïå½bpÏÆå­ç?ù¶Qü>ÃL·bI¼qY7:ÆÎ3¹³8î5=Mô=MÚPæyÆW;ÇÊgv~zíN§kùBò¹®1£¡|µXt?Cá ±æ¹©$)~íùþÖéxzíp·­ÅÖ´b0W¸|ÑÛeýbr=MSÂ^x¥üÙÖP·ïÑ[D3uMkf¡kD%]·wvUTh´pLßÿÞ.¨P×N«±Âü¢$[×6«íÑ>D	òAýòÓ{dy'ÖiÇÑÝ(=@Éø$ý©dy'ÖiÇÉ'ÖÉ×	Ëm¨ùù&#Ãi)kç(ÁiÖS¹·e¥CºùK©«¬¯4AVöóã¢³¼ÏtÁSØæè¬µ¢o%É²)(³©®Âaá×>7ÆvªxWS55ñÚwâ"ÔKeçÚey·ûËkílr#\`¯·"N{WllÞâ¥$X@õ9ö>Óç&ÎrLpfý{©=@®ô îp9hÞ6nú»^Ç­w­Ù;Qh©ÁuòË7Ñ!¦WÁjèÌÌ$sN7Á"ÈÝVµæí¯JîïS¹ÜçùÍc1¼Èè'Rç"']#¤ß¼È»¿¦¼sÎXÑÁNÜôU)#)x¤E.ç	m %é&üay=}5¹Mzµé=@Znña­¡Í¸¢zôÇmÕ&I`, new Uint8Array(107357));

var UTF8Decoder = new TextDecoder("utf8");

function UTF8ArrayToString(heap, idx, maxBytesToRead) {
 var endIdx = idx + maxBytesToRead;
 var endPtr = idx;
 while (heap[endPtr] && !(endPtr >= endIdx)) ++endPtr;
 return UTF8Decoder.decode(heap.subarray ? heap.subarray(idx, endPtr) : new Uint8Array(heap.slice(idx, endPtr)));
}

function UTF8ToString(ptr, maxBytesToRead) {
 if (!ptr) return "";
 var maxPtr = ptr + maxBytesToRead;
 for (var end = ptr; !(end >= maxPtr) && HEAPU8[end]; ) ++end;
 return UTF8Decoder.decode(HEAPU8.subarray(ptr, end));
}

var HEAP8, HEAP16, HEAP32, HEAPU8, HEAPU16, HEAPU32, HEAPF32, HEAPF64;

var wasmMemory, buffer, wasmTable;

function updateGlobalBufferAndViews(b) {
 buffer = b;
 HEAP8 = new Int8Array(b);
 HEAP16 = new Int16Array(b);
 HEAP32 = new Int32Array(b);
 HEAPU8 = new Uint8Array(b);
 HEAPU16 = new Uint16Array(b);
 HEAPU32 = new Uint32Array(b);
 HEAPF32 = new Float32Array(b);
 HEAPF64 = new Float64Array(b);
}

function _emscripten_memcpy_big(dest, src, num) {
 HEAPU8.copyWithin(dest, src, src + num);
}

function abortOnCannotGrowMemory(requestedSize) {
 abort("OOM");
}

function _emscripten_resize_heap(requestedSize) {
 var oldSize = HEAPU8.length;
 requestedSize = requestedSize >>> 0;
 abortOnCannotGrowMemory(requestedSize);
}

var ENV = {};

function getExecutableName() {
 return "./this.program";
}

function getEnvStrings() {
 if (!getEnvStrings.strings) {
  var lang = (typeof navigator === "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8";
  var env = {
   "USER": "web_user",
   "LOGNAME": "web_user",
   "PATH": "/",
   "PWD": "/",
   "HOME": "/home/web_user",
   "LANG": lang,
   "_": getExecutableName()
  };
  for (var x in ENV) {
   if (ENV[x] === undefined) delete env[x]; else env[x] = ENV[x];
  }
  var strings = [];
  for (var x in env) {
   strings.push(x + "=" + env[x]);
  }
  getEnvStrings.strings = strings;
 }
 return getEnvStrings.strings;
}

function writeAsciiToMemory(str, buffer, dontAddNull) {
 for (var i = 0; i < str.length; ++i) {
  HEAP8[buffer++ >> 0] = str.charCodeAt(i);
 }
 if (!dontAddNull) HEAP8[buffer >> 0] = 0;
}

var SYSCALLS = {
 mappings: {},
 buffers: [ null, [], [] ],
 printChar: function(stream, curr) {
  var buffer = SYSCALLS.buffers[stream];
  if (curr === 0 || curr === 10) {
   (stream === 1 ? out : err)(UTF8ArrayToString(buffer, 0));
   buffer.length = 0;
  } else {
   buffer.push(curr);
  }
 },
 varargs: undefined,
 get: function() {
  SYSCALLS.varargs += 4;
  var ret = HEAP32[SYSCALLS.varargs - 4 >> 2];
  return ret;
 },
 getStr: function(ptr) {
  var ret = UTF8ToString(ptr);
  return ret;
 },
 get64: function(low, high) {
  return low;
 }
};

function _environ_get(__environ, environ_buf) {
 var bufSize = 0;
 getEnvStrings().forEach(function(string, i) {
  var ptr = environ_buf + bufSize;
  HEAP32[__environ + i * 4 >> 2] = ptr;
  writeAsciiToMemory(string, ptr);
  bufSize += string.length + 1;
 });
 return 0;
}

function _environ_sizes_get(penviron_count, penviron_buf_size) {
 var strings = getEnvStrings();
 HEAP32[penviron_count >> 2] = strings.length;
 var bufSize = 0;
 strings.forEach(function(string) {
  bufSize += string.length + 1;
 });
 HEAP32[penviron_buf_size >> 2] = bufSize;
 return 0;
}

function _fd_close(fd) {
 return 0;
}

function _fd_read(fd, iov, iovcnt, pnum) {
 var stream = SYSCALLS.getStreamFromFD(fd);
 var num = SYSCALLS.doReadv(stream, iov, iovcnt);
 HEAP32[pnum >> 2] = num;
 return 0;
}

function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {}

function _fd_write(fd, iov, iovcnt, pnum) {
 var num = 0;
 for (var i = 0; i < iovcnt; i++) {
  var ptr = HEAP32[iov >> 2];
  var len = HEAP32[iov + 4 >> 2];
  iov += 8;
  for (var j = 0; j < len; j++) {
   SYSCALLS.printChar(fd, HEAPU8[ptr + j]);
  }
  num += len;
 }
 HEAP32[pnum >> 2] = num;
 return 0;
}

var asmLibraryArg = {
 "c": _emscripten_memcpy_big,
 "d": _emscripten_resize_heap,
 "e": _environ_get,
 "f": _environ_sizes_get,
 "a": _fd_close,
 "h": _fd_read,
 "b": _fd_seek,
 "g": _fd_write
};

function initRuntime(asm) {
 asm["j"]();
}

var imports = {
 "a": asmLibraryArg
};

var _malloc, _free, _mpeg_frame_decoder_create, _mpeg_decode_interleaved, _mpeg_frame_decoder_destroy;

WebAssembly.instantiate(Module["wasm"], imports).then(function(output) {
 var asm = output.instance.exports;
 _malloc = asm["k"];
 _free = asm["l"];
 _mpeg_frame_decoder_create = asm["m"];
 _mpeg_decode_interleaved = asm["n"];
 _mpeg_frame_decoder_destroy = asm["o"];
 wasmTable = asm["p"];
 wasmMemory = asm["i"];
 updateGlobalBufferAndViews(wasmMemory.buffer);
 initRuntime(asm);
 ready();
});

this.ready = new Promise(resolve => {
 ready = resolve;
}).then(() => {
 this.HEAP = buffer;
 this._malloc = _malloc;
 this._free = _free;
 this._mpeg_frame_decoder_create = _mpeg_frame_decoder_create;
 this._mpeg_decode_interleaved = _mpeg_decode_interleaved;
 this._mpeg_frame_decoder_destroy = _mpeg_frame_decoder_destroy;
});
}}

/***/ }),

/***/ "./node_modules/mpg123-decoder/src/MPEGDecoder.js":
/*!********************************************************!*\
  !*** ./node_modules/mpg123-decoder/src/MPEGDecoder.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MPEGDecoder; });
/* harmony import */ var _wasm_audio_decoders_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wasm-audio-decoders/common */ "./node_modules/@wasm-audio-decoders/common/index.js");
/* harmony import */ var _EmscriptenWasm_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EmscriptenWasm.js */ "./node_modules/mpg123-decoder/src/EmscriptenWasm.js");




class MPEGDecoder {
  constructor(_WASMAudioDecoderCommon, _EmscriptenWASM) {
    this._isWebWorker = _WASMAudioDecoderCommon && _EmscriptenWASM;
    this._WASMAudioDecoderCommon =
      _WASMAudioDecoderCommon || _wasm_audio_decoders_common__WEBPACK_IMPORTED_MODULE_0__["WASMAudioDecoderCommon"];
    this._EmscriptenWASM = _EmscriptenWASM || _EmscriptenWasm_js__WEBPACK_IMPORTED_MODULE_1__["default"];

    this._inputPtrSize = 2 ** 18;
    this._outputPtrSize = 1152 * 512;
    this._channelsOut = 2;

    this._ready = this._init();
  }

  // injects dependencies when running as a web worker
  async _init() {
    this._common = await this._WASMAudioDecoderCommon.initWASMAudioDecoder.bind(
      this
    )();

    this._sampleRate = 0;

    // input decoded bytes pointer
    [this._decodedBytesPtr, this._decodedBytes] =
      this._common.allocateTypedArray(1, Uint32Array);

    // sample rate
    [this._sampleRateBytePtr, this._sampleRateByte] =
      this._common.allocateTypedArray(1, Uint32Array);

    this._decoder = this._wasm._mpeg_frame_decoder_create();
  }

  get ready() {
    return this._ready;
  }

  async reset() {
    this.free();
    await this._init();
  }

  free() {
    this._wasm._mpeg_frame_decoder_destroy(this._decoder);
    this._wasm._free(this._decoder);

    this._common.free();
  }

  _decode(data, decodeInterval) {
    if (!(data instanceof Uint8Array))
      throw Error(
        `Data to decode must be Uint8Array. Instead got ${typeof data}`
      );

    this._input.set(data);
    this._decodedBytes[0] = 0;

    const samplesDecoded = this._wasm._mpeg_decode_interleaved(
      this._decoder,
      this._inputPtr,
      data.length,
      this._decodedBytesPtr,
      decodeInterval,
      this._leftPtr,
      this._rightPtr,
      this._outputPtrSize,
      this._sampleRateBytePtr
    );

    this._sampleRate = this._sampleRateByte[0];

    return this._WASMAudioDecoderCommon.getDecodedAudio(
      [
        this._leftArr.slice(0, samplesDecoded),
        this._rightArr.slice(0, samplesDecoded),
      ],
      samplesDecoded,
      this._sampleRate
    );
  }

  decode(data) {
    let left = [],
      right = [],
      samples = 0;

    for (
      let offset = 0;
      offset < data.length;
      offset += this._decodedBytes[0]
    ) {
      const { channelData, samplesDecoded } = this._decode(
        data.subarray(offset, offset + this._inputPtrSize),
        48
      );

      left.push(channelData[0]);
      right.push(channelData[1]);
      samples += samplesDecoded;
    }

    return this._WASMAudioDecoderCommon.getDecodedAudioConcat(
      [left, right],
      samples,
      this._sampleRate
    );
  }

  decodeFrame(mpegFrame) {
    return this._decode(mpegFrame, mpegFrame.length);
  }

  decodeFrames(mpegFrames) {
    let left = [],
      right = [],
      samples = 0;

    for (const frame of mpegFrames) {
      const { channelData, samplesDecoded } = this.decodeFrame(frame);

      left.push(channelData[0]);
      right.push(channelData[1]);
      samples += samplesDecoded;
    }

    return this._WASMAudioDecoderCommon.getDecodedAudioConcat(
      [left, right],
      samples,
      this._sampleRate
    );
  }
}


/***/ }),

/***/ "./node_modules/mpg123-decoder/src/MPEGDecoderWebWorker.js":
/*!*****************************************************************!*\
  !*** ./node_modules/mpg123-decoder/src/MPEGDecoderWebWorker.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MPEGDecoderWebWorker; });
/* harmony import */ var _wasm_audio_decoders_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wasm-audio-decoders/common */ "./node_modules/@wasm-audio-decoders/common/index.js");
/* harmony import */ var _EmscriptenWasm_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EmscriptenWasm.js */ "./node_modules/mpg123-decoder/src/EmscriptenWasm.js");
/* harmony import */ var _MPEGDecoder_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MPEGDecoder.js */ "./node_modules/mpg123-decoder/src/MPEGDecoder.js");




class MPEGDecoderWebWorker extends _wasm_audio_decoders_common__WEBPACK_IMPORTED_MODULE_0__["WASMAudioDecoderWorker"] {
  constructor() {
    super(_MPEGDecoder_js__WEBPACK_IMPORTED_MODULE_2__["default"], _EmscriptenWasm_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
  }

  async decode(data) {
    return this._postToDecoder("decode", data);
  }

  async decodeFrame(data) {
    return this._postToDecoder("decodeFrame", data);
  }

  async decodeFrames(data) {
    return this._postToDecoder("decodeFrames", data);
  }
}


/***/ }),

/***/ "./node_modules/mse-audio-wrapper/src/MSEAudioWrapper.js":
/*!***************************************************************!*\
  !*** ./node_modules/mse-audio-wrapper/src/MSEAudioWrapper.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MSEAudioWrapper; });
/* harmony import */ var codec_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! codec-parser */ "./node_modules/codec-parser/index.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants.js */ "./node_modules/mse-audio-wrapper/src/constants.js");
/* harmony import */ var _containers_isobmff_ISOBMFFContainer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./containers/isobmff/ISOBMFFContainer.js */ "./node_modules/mse-audio-wrapper/src/containers/isobmff/ISOBMFFContainer.js");
/* harmony import */ var _containers_webm_WEBMContainer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./containers/webm/WEBMContainer.js */ "./node_modules/mse-audio-wrapper/src/containers/webm/WEBMContainer.js");
/* Copyright 2020-2021 Ethan Halsall
    
    This file is part of mse-audio-wrapper.
    
    mse-audio-wrapper is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    mse-audio-wrapper is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/








const noOp = () => {};

class MSEAudioWrapper {
  /**
   * @description Wraps audio data into media source API compatible containers
   * @param {string} mimeType Mimetype of the audio data to wrap
   * @param {string} options.codec Codec of the audio data to wrap
   * @param {object} options.preferredContainer Preferred audio container to output if multiple containers are available
   * @param {number} options.minBytesPerSegment Minimum number of bytes to process before returning a media segment
   * @param {number} options.minFramesPerSegment Minimum number of frames to process before returning a media segment
   * @param {number} options.minBytesPerSegment Minimum number of bytes to process before returning a media segment
   * @param {boolean} options.enableLogging Set to true to enable debug logging
   */
  constructor(mimeType, options = {}) {
    this._inputMimeType = mimeType;

    this.PREFERRED_CONTAINER = options.preferredContainer || _constants_js__WEBPACK_IMPORTED_MODULE_1__["WEBM"];
    this.MIN_FRAMES = options.minFramesPerSegment || 4;
    this.MAX_FRAMES = options.maxFramesPerSegment || 50;
    this.MIN_FRAMES_LENGTH = options.minBytesPerSegment || 1022;
    this.MAX_SAMPLES_PER_SEGMENT = Infinity;

    this._onMimeType = options.onMimeType || noOp;

    if (options.codec) {
      this._container = this._getContainer(options.codec);
      this._onMimeType(this._mimeType);
    }

    this._frames = [];
    this._codecParser = new codec_parser__WEBPACK_IMPORTED_MODULE_0__["default"](mimeType, {
      onCodec: (codec) => {
        this._container = this._getContainer(codec);
        this._onMimeType(this._mimeType);
      },
      onCodecUpdate: options.onCodecUpdate,
      enableLogging: options.enableLogging,
    });
  }

  /**
   * @public
   * @returns The mimetype being returned from MSEAudioWrapper
   */
  get mimeType() {
    return this._mimeType;
  }

  /**
   * @public
   * @returns The mimetype of the incoming audio data
   */
  get inputMimeType() {
    return this._inputMimeType;
  }

  /**
   * @public
   * @description Returns an iterator for the passed in codec data.
   * @param {Uint8Array | Array<Frame>} chunk Next chunk of codec data to read
   * @returns {Iterator} Iterator that operates over the codec data.
   * @yields {Uint8Array} Movie Fragments containing codec frames
   */
  *iterator(chunk) {
    if (chunk.constructor === Uint8Array) {
      yield* this._processFrames(
        [...this._codecParser.parseChunk(chunk)].flatMap(
          (frame) => frame.codecFrames || frame
        )
      );
    } else if (Array.isArray(chunk)) {
      yield* this._processFrames(chunk);
    }
  }

  /**
   * @private
   */
  *_processFrames(frames) {
    this._frames.push(...frames);

    if (this._frames.length) {
      const groups = this._groupFrames();

      if (groups.length) {
        if (!this._sentInitialSegment) {
          this._sentInitialSegment = true;

          yield this._container.getInitializationSegment(groups[0][0]);
        }
        for (const frameGroup of groups) {
          yield this._container.getMediaSegment(frameGroup);
        }
      }
    }
  }

  /**
   * @private
   */
  _groupFrames() {
    const groups = [[]];
    let currentGroup = groups[0];
    let samples = 0;

    for (const frame of this._frames) {
      if (
        currentGroup.length === this.MAX_FRAMES ||
        samples >= this.MAX_SAMPLES_PER_SEGMENT
      ) {
        samples = 0;
        groups.push((currentGroup = [])); // create new group
      }

      currentGroup.push(frame);
      samples += frame.samples;
    }

    // store remaining frames
    this._frames =
      currentGroup.length < this.MIN_FRAMES ||
      currentGroup.reduce((acc, frame) => acc + frame.data.length, 0) <
        this.MIN_FRAMES_LENGTH
        ? groups.pop()
        : [];

    return groups;
  }

  /**
   * @private
   */
  _getContainer(codec) {
    switch (codec) {
      case "mpeg":
        this._mimeType = `${_constants_js__WEBPACK_IMPORTED_MODULE_1__["AUDIO_MP4"]}"${_constants_js__WEBPACK_IMPORTED_MODULE_1__["MP3"]}"`;
        return new _containers_isobmff_ISOBMFFContainer_js__WEBPACK_IMPORTED_MODULE_2__["default"](_constants_js__WEBPACK_IMPORTED_MODULE_1__["MP3"]);
      case "aac":
        this._mimeType = `${_constants_js__WEBPACK_IMPORTED_MODULE_1__["AUDIO_MP4"]}"${_constants_js__WEBPACK_IMPORTED_MODULE_1__["MP4A_40_2"]}`;
        return new _containers_isobmff_ISOBMFFContainer_js__WEBPACK_IMPORTED_MODULE_2__["default"](_constants_js__WEBPACK_IMPORTED_MODULE_1__["MP4A_40_2"]);
      case "flac":
        this._mimeType = `${_constants_js__WEBPACK_IMPORTED_MODULE_1__["AUDIO_MP4"]}"${_constants_js__WEBPACK_IMPORTED_MODULE_1__["FLAC"]}"`;
        return new _containers_isobmff_ISOBMFFContainer_js__WEBPACK_IMPORTED_MODULE_2__["default"](_constants_js__WEBPACK_IMPORTED_MODULE_1__["FLAC"]);
      case "vorbis":
        this._mimeType = `${_constants_js__WEBPACK_IMPORTED_MODULE_1__["AUDIO_WEBM"]}"${_constants_js__WEBPACK_IMPORTED_MODULE_1__["VORBIS"]}"`;

        this.MAX_SAMPLES_PER_SEGMENT = 32767;
        return new _containers_webm_WEBMContainer_js__WEBPACK_IMPORTED_MODULE_3__["default"](_constants_js__WEBPACK_IMPORTED_MODULE_1__["VORBIS"]);
      case "opus":
        if (this.PREFERRED_CONTAINER === _constants_js__WEBPACK_IMPORTED_MODULE_1__["WEBM"]) {
          this._mimeType = `${_constants_js__WEBPACK_IMPORTED_MODULE_1__["AUDIO_WEBM"]}"${_constants_js__WEBPACK_IMPORTED_MODULE_1__["OPUS"]}"`;

          this.MAX_SAMPLES_PER_SEGMENT = 32767;
          return new _containers_webm_WEBMContainer_js__WEBPACK_IMPORTED_MODULE_3__["default"](_constants_js__WEBPACK_IMPORTED_MODULE_1__["OPUS"]);
        }
        this._mimeType = `${_constants_js__WEBPACK_IMPORTED_MODULE_1__["AUDIO_MP4"]}"${_constants_js__WEBPACK_IMPORTED_MODULE_1__["OPUS"]}"`;
        return new _containers_isobmff_ISOBMFFContainer_js__WEBPACK_IMPORTED_MODULE_2__["default"](_constants_js__WEBPACK_IMPORTED_MODULE_1__["OPUS"]);
    }
  }
}


/***/ }),

/***/ "./node_modules/mse-audio-wrapper/src/constants.js":
/*!*********************************************************!*\
  !*** ./node_modules/mse-audio-wrapper/src/constants.js ***!
  \*********************************************************/
/*! exports provided: MP4, WEBM, MP3, MP4A_40_2, FLAC, VORBIS, OPUS, AUDIO_MP4, AUDIO_WEBM, MSE_AUDIO_WRAPPER */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MP4", function() { return MP4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WEBM", function() { return WEBM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MP3", function() { return MP3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MP4A_40_2", function() { return MP4A_40_2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FLAC", function() { return FLAC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VORBIS", function() { return VORBIS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OPUS", function() { return OPUS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AUDIO_MP4", function() { return AUDIO_MP4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AUDIO_WEBM", function() { return AUDIO_WEBM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MSE_AUDIO_WRAPPER", function() { return MSE_AUDIO_WRAPPER; });
// containers
const MP4 = "mp4";
const WEBM = "webm";

// codecs
const MP3 = "mp3";
const MP4A_40_2 = "mp4a.40.2";
const FLAC = "flac";
const VORBIS = "vorbis";
const OPUS = "opus";

const audio = "audio/";
const codecs = ";codecs=";
const AUDIO_MP4 = audio + MP4 + codecs;
const AUDIO_WEBM = audio + WEBM + codecs;

const MSE_AUDIO_WRAPPER = "mse-audio-wrapper";


/***/ }),

/***/ "./node_modules/mse-audio-wrapper/src/containers/ContainerElement.js":
/*!***************************************************************************!*\
  !*** ./node_modules/mse-audio-wrapper/src/containers/ContainerElement.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ContainerElement; });
/* Copyright 2020-2021 Ethan Halsall
    
    This file is part of mse-audio-wrapper.
    
    mse-audio-wrapper is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    mse-audio-wrapper is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/

class ContainerElement {
  /**
   * @abstract
   * @description Container Object structure Abstract Class
   * @param {any} name Name of the object
   * @param {Array<Uint8>} [contents] Array of arrays or typed arrays, or a single number or typed array
   * @param {Array<ContainerElement>} [objects] Array of objects to insert into this object
   */
  constructor({ name, contents = [], children = [] }) {
    this._name = name;
    this._contents = contents;
    this._children = children;
  }

  /**
   * @description Converts a string to a byte array
   * @param {string} name String to convert
   * @returns {Uint8Array}
   */
  static stringToByteArray(name) {
    return [...name].map((char) => char.charCodeAt(0));
  }

  /**
   * @description Converts a JavaScript number to Uint32
   * @param {number} number Number to convert
   * @returns {Uint32}
   */
  static getFloat64(number) {
    const bytes = new Uint8Array(8);
    new DataView(bytes.buffer).setFloat64(0, number);
    return bytes;
  }

  /**
   * @description Converts a JavaScript number to Uint32
   * @param {number} number Number to convert
   * @returns {Uint32}
   */
  static getUint64(number) {
    const bytes = new Uint8Array(8);
    new DataView(bytes.buffer).setBigUint64(0, BigInt(number));
    return bytes;
  }

  /**
   * @description Converts a JavaScript number to Uint32
   * @param {number} number Number to convert
   * @returns {Uint32}
   */
  static getUint32(number) {
    const bytes = new Uint8Array(4);
    new DataView(bytes.buffer).setUint32(0, number);
    return bytes;
  }

  /**
   * @description Converts a JavaScript number to Uint16
   * @param {number} number Number to convert
   * @returns {Uint32}
   */
  static getUint16(number) {
    const bytes = new Uint8Array(2);
    new DataView(bytes.buffer).setUint16(0, number);
    return bytes;
  }

  /**
   * @description Converts a JavaScript number to Int16
   * @param {number} number Number to convert
   * @returns {Uint32}
   */
  static getInt16(number) {
    const bytes = new Uint8Array(2);
    new DataView(bytes.buffer).setInt16(0, number);
    return bytes;
  }

  static *flatten(array) {
    for (const item of array) {
      if (Array.isArray(item)) {
        yield* ContainerElement.flatten(item);
      } else {
        yield item;
      }
    }
  }

  /**
   * @returns {Uint8Array} Contents of this container element
   */
  get contents() {
    const buffer = new Uint8Array(this.length);
    const contents = this._buildContents();

    let offset = 0;

    for (const element of ContainerElement.flatten(contents)) {
      if (typeof element !== "object") {
        buffer[offset] = element;
        offset++;
      } else {
        buffer.set(element, offset);
        offset += element.length;
      }
    }

    return buffer;
  }

  /**
   * @returns {number} Length of this container element
   */
  get length() {
    return this._buildLength();
  }

  _buildContents() {
    return [
      this._contents,
      ...this._children.map((obj) => obj._buildContents()),
    ];
  }

  _buildLength() {
    let length;

    if (Array.isArray(this._contents)) {
      length = this._contents.reduce(
        (acc, val) => acc + (val.length === undefined ? 1 : val.length),
        0
      );
    } else {
      length = this._contents.length === undefined ? 1 : this._contents.length;
    }

    return length + this._children.reduce((acc, obj) => acc + obj.length, 0);
  }

  addChild(object) {
    this._children.push(object);
  }
}


/***/ }),

/***/ "./node_modules/mse-audio-wrapper/src/containers/isobmff/Box.js":
/*!**********************************************************************!*\
  !*** ./node_modules/mse-audio-wrapper/src/containers/isobmff/Box.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Box; });
/* harmony import */ var _ContainerElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ContainerElement.js */ "./node_modules/mse-audio-wrapper/src/containers/ContainerElement.js");
/* Copyright 2020-2021 Ethan Halsall
    
    This file is part of mse-audio-wrapper.
    
    mse-audio-wrapper is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    mse-audio-wrapper is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/



class Box extends _ContainerElement_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /**
   * @description ISO/IEC 14496-12 Part 12 ISO Base Media File Format Box
   * @param {string} name Name of the box (i.e. 'moov', 'moof', 'traf')
   * @param {object} params Object containing contents or child boxes
   * @param {Array<Uint8>} [params.contents] Array of bytes to insert into this box
   * @param {Array<Box>} [params.children] Array of child boxes to insert into this box
   */
  constructor(name, { contents, children } = {}) {
    super({ name, contents, children });
  }

  _buildContents() {
    return [
      ...this._lengthBytes,
      ..._ContainerElement_js__WEBPACK_IMPORTED_MODULE_0__["default"].stringToByteArray(this._name),
      ...super._buildContents(),
    ];
  }

  _buildLength() {
    if (!this._length) {
      // length bytes + name length + content length
      this._length = 4 + this._name.length + super._buildLength();
      this._lengthBytes = _ContainerElement_js__WEBPACK_IMPORTED_MODULE_0__["default"].getUint32(this._length);
    }

    return this._length;
  }
}


/***/ }),

/***/ "./node_modules/mse-audio-wrapper/src/containers/isobmff/ESTag.js":
/*!************************************************************************!*\
  !*** ./node_modules/mse-audio-wrapper/src/containers/isobmff/ESTag.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ESTag; });
/* harmony import */ var _ContainerElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ContainerElement.js */ "./node_modules/mse-audio-wrapper/src/containers/ContainerElement.js");
/* Copyright 2020-2021 Ethan Halsall
    
    This file is part of mse-audio-wrapper.
    
    mse-audio-wrapper is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    mse-audio-wrapper is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/



class ESTag extends _ContainerElement_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(tagNumber, { contents, tags } = {}) {
    super({ name: tagNumber, contents, children: tags });
  }

  static getLength(length) {
    const bytes = _ContainerElement_js__WEBPACK_IMPORTED_MODULE_0__["default"].getUint32(length);

    bytes.every((byte, i, array) => {
      if (byte === 0x00) {
        array[i] = 0x80;
        return true;
      }
      return false;
    });

    return bytes;
  }

  /**
   * @returns {Uint8Array} Contents of this stream descriptor tag
   */
  _buildContents() {
    return [this._name, ...this._lengthBytes, ...super._buildContents()];
  }

  _buildLength() {
    if (!this._length) {
      const length = super._buildLength();
      this._lengthBytes = ESTag.getLength(length);
      this._length = 1 + length + this._lengthBytes.length;
    }

    return this._length;
  }

  addTag(tag) {
    this.addChild(tag);
  }
}


/***/ }),

/***/ "./node_modules/mse-audio-wrapper/src/containers/isobmff/ISOBMFFContainer.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/mse-audio-wrapper/src/containers/isobmff/ISOBMFFContainer.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ISOBMFFContainer; });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants.js */ "./node_modules/mse-audio-wrapper/src/constants.js");
/* harmony import */ var _ContainerElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ContainerElement.js */ "./node_modules/mse-audio-wrapper/src/containers/ContainerElement.js");
/* harmony import */ var _Box_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Box.js */ "./node_modules/mse-audio-wrapper/src/containers/isobmff/Box.js");
/* harmony import */ var _ESTag_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ESTag.js */ "./node_modules/mse-audio-wrapper/src/containers/isobmff/ESTag.js");
/* Copyright 2020-2021 Ethan Halsall
    
    This file is part of mse-audio-wrapper.
    
    mse-audio-wrapper is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    mse-audio-wrapper is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/







/**
 * @description Fragmented ISO Base Media File Format Builder is a class to
 * wrap codec frames in a MP4 container for streaming MP3 / AAC compatibility in Firefox.
 */
class ISOBMFFContainer {
  constructor(codec) {
    this._codec = codec;
  }

  getCodecBox(header) {
    /**
     * @description Codec mapping for `esds` box
     * https://stackoverflow.com/questions/3987850/mp4-atom-how-to-discriminate-the-audio-codec-is-it-aac-or-mp3
     * https://web.archive.org/web/20180312163039/http://mp4ra.org/object.html
     * 0x40 - MPEG-4 Audio
     * 0x6b - MPEG-1 Audio (MPEG-1 Layers 1, 2, and 3)
     * 0x69 - MPEG-2 Backward Compatible Audio (MPEG-2 Layers 1, 2, and 3)
     * 0x67 - MPEG-2 AAC LC
     */
    switch (this._codec) {
      case _constants_js__WEBPACK_IMPORTED_MODULE_0__["MP3"]:
        return this.getMp4a(header, 0x6b);
      case _constants_js__WEBPACK_IMPORTED_MODULE_0__["MP4A_40_2"]:
        return this.getMp4a(header, 0x40);
      case _constants_js__WEBPACK_IMPORTED_MODULE_0__["OPUS"]:
        return this.getOpus(header);
      case _constants_js__WEBPACK_IMPORTED_MODULE_0__["FLAC"]:
        return this.getFlaC(header);
    }
  }

  getOpus(header) {
    // https://opus-codec.org/docs/opus_in_isobmff.html
    return new _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"]("Opus", {
      /* prettier-ignore */
      contents: [
        0x00,0x00,0x00,0x00,0x00,0x00, // reserved
        0x00,0x01, // data reference index
        0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00, // reserved
        0x00,header.channels, // channel count
        0x00,header.bitDepth, // PCM bitrate (16bit)
        0x00,0x00, // predefined
        0x00,0x00, // reserved
        _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"].getUint16(header.sampleRate),0x00,0x00, // sample rate 16.16 fixed-point
      ],
      children: [
        new _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"]("dOps", {
          /* prettier-ignore */
          contents: [0x00, // version
            header.channels, // output channel count
            _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"].getUint16(header.preSkip), // pre skip
            _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"].getUint32(header.inputSampleRate),// input sample rate
            _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"].getInt16(header.outputGain), // output gain
            header.channelMappingFamily, // channel mapping family int(8)
            (header.channelMappingFamily !== 0 ? [
              header.streamCount,
              header.coupledStreamCount,
              header.channelMappingTable // channel mapping table
            ] : [])
          ],
        }),
      ],
    });
  }

  getFlaC(header) {
    // https://github.com/xiph/flac/blob/master/doc/isoflac.txt
    return new _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"]("fLaC", {
      /* prettier-ignore */
      contents: [
        0x00,0x00,0x00,0x00,0x00,0x00, // reserved
        0x00,0x01, // data reference index
        0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00, // reserved
        0x00,header.channels, // channel count
        0x00,header.bitDepth, // PCM bitrate (16bit)
        0x00,0x00, // predefined
        0x00,0x00, // reserved
        _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"].getUint16(header.sampleRate),0x00,0x00, // sample rate 16.16 fixed-point
        /*
        When the bitstream's native sample rate is greater
        than the maximum expressible value of 65535 Hz,
        the samplerate field shall hold the greatest
        expressible regular division of that rate. I.e.
        the samplerate field shall hold 48000.0 for
        native sample rates of 96 and 192 kHz. In the
        case of unusual sample rates which do not have
        an expressible regular division, the maximum value
        of 65535.0 Hz should be used.
        */
      ],
      children: [
        new _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"]("dfLa", {
          /* prettier-ignore */
          contents: [
            0x00, // version
            0x00,0x00,0x00, // flags
            ...(header.streamInfo || [
              // * `A........` Last metadata block flag
              // * `.BBBBBBBB` BlockType
              0x80, // last metadata block, stream info
              0x00,0x00,0x22, // Length
              _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"].getUint16(header.blockSize), // maximum block size
              _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"].getUint16(header.blockSize), // minimum block size
              0x00,0x00,0x00, // maximum frame size
              0x00,0x00,0x00, // minimum frame size
              _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"].getUint32((header.sampleRate << 12) | (header.channels << 8) | ((header.bitDepth - 1) << 4)), // 20bits sample rate, 3bits channels, 5bits bitDepth - 1
              0x00,0x00,0x00,0x00, // total samples
              0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00 // md5 of stream
            ])
          ],
        }),
      ],
    });
  }

  getMp4a(header, esdsCodec) {
    const streamDescriptorTag = new _ESTag_js__WEBPACK_IMPORTED_MODULE_3__["default"](4, {
      /* prettier-ignore */
      contents: [
        esdsCodec,
        0x15, // stream type(6bits)=5 audio, flags(2bits)=1
        0x00,0x00,0x00, // 24bit buffer size
        0x00,0x00,0x00,0x00, // max bitrate
        0x00,0x00,0x00,0x00, // avg bitrate
      ],
    });

    // mp4a.40.2
    if (esdsCodec === 0x40) {
      streamDescriptorTag.addTag(
        new _ESTag_js__WEBPACK_IMPORTED_MODULE_3__["default"](5, {
          contents: header.audioSpecificConfig,
        })
      );
    }

    return new _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"]("mp4a", {
      /* prettier-ignore */
      contents: [0x00,0x00,0x00,0x00,0x00,0x00, // reserved
        0x00,0x01, // data reference index
        0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00, // reserved
        0x00,header.channels, // channel count
        0x00,0x10, // PCM bitrate (16bit)
        0x00,0x00, // Compression ID
        0x00,0x00, // Packet size
        _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"].getUint16(header.sampleRate),0x00,0x00], // sample rate unsigned floating point
      children: [
        new _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"]("esds", {
          contents: [0x00, 0x00, 0x00, 0x00],
          children: [
            new _ESTag_js__WEBPACK_IMPORTED_MODULE_3__["default"](3, {
              contents: [
                0x00,
                0x01, // ES_ID = 1
                0x00, // flags etc = 0
              ],
              tags: [
                streamDescriptorTag,
                new _ESTag_js__WEBPACK_IMPORTED_MODULE_3__["default"](6, {
                  contents: 0x02,
                }),
              ],
            }),
          ],
        }),
      ],
    });
  }

  /**
   * @param {Header} header Codec frame
   * @returns {Uint8Array} Filetype and Movie Box information for the codec
   */
  getInitializationSegment({ header, samples }) {
    return new _ContainerElement_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
      children: [
        new _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"]("ftyp", {
          /* prettier-ignore */
          contents: [_Box_js__WEBPACK_IMPORTED_MODULE_2__["default"].stringToByteArray("iso5"), // major brand
            0x00,0x00,0x02,0x00, // minor version
            _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"].stringToByteArray("iso6mp41")], // compatible brands
        }),
        new _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"]("moov", {
          children: [
            new _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"]("mvhd", {
              /* prettier-ignore */
              contents: [0x00, // version
                0x00,0x00,0x00, // flags
                0x00,0x00,0x00,0x00, // creation time
                0x00,0x00,0x00,0x00, // modification time
                0x00,0x00,0x03,0xe8, // timescale
                0x00,0x00,0x00,0x00, // duration
                0x00,0x01,0x00,0x00, // rate
                0x01,0x00, // volume
                0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00, // reserved
                0x00,0x01,0x00,0x00, 0x00,0x00,0x00,0x00, 0x00,0x00,0x00,0x00, // a b u (matrix structure)
                0x00,0x00,0x00,0x00, 0x00,0x01,0x00,0x00, 0x00,0x00,0x00,0x00, // c d v
                0x00,0x00,0x00,0x00, 0x00,0x00,0x00,0x00, 0x40,0x00,0x00,0x00, // x y w
                0x00,0x00,0x00,0x00, // preview time
                0x00,0x00,0x00,0x00, // preview duration
                0x00,0x00,0x00,0x00, // poster time
                0x00,0x00,0x00,0x00, // selection time
                0x00,0x00,0x00,0x00, // selection duration
                0x00,0x00,0x00,0x00, // current time
                0x00,0x00,0x00,0x02], // next track
            }),
            new _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"]("trak", {
              children: [
                new _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"]("tkhd", {
                  /* prettier-ignore */
                  contents: [0x00, // version
                    0x00,0x00,0x03, // flags (0x01 - track enabled, 0x02 - track in movie, 0x04 - track in preview, 0x08 - track in poster)
                    0x00,0x00,0x00,0x00, // creation time
                    0x00,0x00,0x00,0x00, // modification time
                    0x00,0x00,0x00,0x01, // track id
                    0x00,0x00,0x00,0x00, // reserved
                    0x00,0x00,0x00,0x00, // duration
                    0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00, // reserved
                    0x00,0x00, // layer
                    0x00,0x01, // alternate group
                    0x01,0x00, // volume
                    0x00,0x00, // reserved
                    0x00,0x01,0x00,0x00, 0x00,0x00,0x00,0x00, 0x00,0x00,0x00,0x00, // a b u (matrix structure)
                    0x00,0x00,0x00,0x00, 0x00,0x01,0x00,0x00, 0x00,0x00,0x00,0x00, // c d v 
                    0x00,0x00,0x00,0x00, 0x00,0x00,0x00,0x00, 0x40,0x00,0x00,0x00, // x y w
                    0x00,0x00,0x00,0x00, // track width
                    0x00,0x00,0x00,0x00], // track height
                }),
                new _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"]("mdia", {
                  children: [
                    new _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"]("mdhd", {
                      /* prettier-ignore */
                      contents: [0x00, // version
                        0x00,0x00,0x00, // flags
                        0x00,0x00,0x00,0x00, // creation time (in seconds since midnight, January 1, 1904)
                        0x00,0x00,0x00,0x00, // modification time
                        _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"].getUint32(header.sampleRate), // time scale
                        0x00,0x00,0x00,0x00, // duration
                        0x55,0xc4, // language
                        0x00,0x00], // quality
                    }),
                    new _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"]("hdlr", {
                      /* prettier-ignore */
                      contents: [0x00, // version
                        0x00,0x00,0x00, // flags
                        _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"].stringToByteArray('mhlr'), // component type (mhlr, dhlr)
                        _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"].stringToByteArray('soun'), // component subtype (vide' for video data, 'soun' for sound data or ‘subt’ for subtitles)
                        0x00,0x00,0x00,0x00, // component manufacturer
                        0x00,0x00,0x00,0x00, // component flags
                        0x00,0x00,0x00,0x00, // component flags mask
                        0x00], // String that specifies the name of the component, terminated by a null character
                    }),
                    new _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"]("minf", {
                      children: [
                        new _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"]("stbl", {
                          children: [
                            new _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"]("stsd", {
                              // Sample description atom
                              /* prettier-ignore */
                              contents: [0x00, // version
                                0x00,0x00,0x00, // flags
                                0x00,0x00,0x00,0x01], // entry count
                              children: [this.getCodecBox(header)],
                            }),
                            new _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"]("stts", {
                              // Time-to-sample atom
                              /* prettier-ignore */
                              contents: [0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00],
                            }),
                            new _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"]("stsc", {
                              // Sample-to-chunk atom
                              /* prettier-ignore */
                              contents: [0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00],
                            }),
                            new _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"]("stsz", {
                              // Sample Size atom
                              /* prettier-ignore */
                              contents: [0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
                                0x00,0x00,0x00,0x00],
                            }),
                            new _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"]("stco", {
                              // Chunk Offset atom
                              /* prettier-ignore */
                              contents: [0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            new _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"]("mvex", {
              children: [
                new _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"]("trex", {
                  /* prettier-ignore */
                  contents: [0x00,0x00,0x00,0x00, // flags
                    0x00,0x00,0x00,0x01, // track id
                    0x00,0x00,0x00,0x01, // default_sample_description_index
                    _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"].getUint32(samples), // default_sample_duration
                    0x00,0x00,0x00,0x00, // default_sample_size;
                    0x00,0x00,0x00,0x00], // default_sample_flags;
                }),
              ],
            }),
          ],
        }),
      ],
    }).contents;
  }

  getSamplesPerFrame(frames) {
    return this._codec === _constants_js__WEBPACK_IMPORTED_MODULE_0__["MP4A_40_2"]
      ? frames.map(({ data, header }) =>
          _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"].getUint32(data.length - header.length)
        )
      : frames.map(({ data }) => _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"].getUint32(data.length));
  }

  getFrameData(frames) {
    return this._codec === _constants_js__WEBPACK_IMPORTED_MODULE_0__["MP4A_40_2"]
      ? frames.map(({ data, header }) => data.subarray(header.length))
      : frames.map(({ data }) => data);
  }

  /**
   * @description Wraps codec frames into a Movie Fragment
   * @param {Array<Frame>} frames Frames to contain in this Movie Fragment
   * @returns {Uint8Array} Movie Fragment containing the frames
   */
  getMediaSegment(frames) {
    return new _ContainerElement_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
      children: [
        new _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"]("moof", {
          children: [
            new _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"]("mfhd", {
              /* prettier-ignore */
              contents: [0x00,0x00,0x00,0x00, 0x00,0x00,0x00,0x00], // sequence number
            }),
            new _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"]("traf", {
              children: [
                new _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"]("tfhd", {
                  /* prettier-ignore */
                  contents: [0x00, // version
                    0b00000010,0x00,0b00000000, // flags
                    // * `AB|00000000|00CDE0FG`
                    // * `A.|........|........` default-base-is-moof
                    // * `.B|........|........` duration-is-empty
                    // * `..|........|..C.....` default-sample-flags-present
                    // * `..|........|...D....` default-sample-size-present
                    // * `..|........|....E...` default-sample-duration-present
                    // * `..|........|......F.` sample-description-index-present
                    // * `..|........|.......G` base-data-offset-present
                    0x00,0x00,0x00,0x01], // track id
                }),
                new _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"]("tfdt", {
                  /* prettier-ignore */
                  contents: [0x00, // version
                    0x00,0x00,0x00, // flags
                    0x00,0x00,0x00,0x00], // base media decode time
                }),
                new _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"]("trun", {
                  /* prettier-ignore */
                  contents: [0x00, // version
                    0x00,0b0000010,0b00000001, // flags
                    // * `ABCD|00000E0F`
                    // * `A...|........` sample‐composition‐time‐offsets‐present
                    // * `.B..|........` sample‐flags‐present
                    // * `..C.|........` sample‐size‐present
                    // * `...D|........` sample‐duration‐present
                    // * `....|.....E..` first‐sample‐flags‐present
                    // * `....|.......G` data-offset-present
                    _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"].getUint32(frames.length), // number of samples
                    _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"].getUint32(92 + frames.length * 4), // data offset
                    ...this.getSamplesPerFrame(frames)], // samples size per frame
                }),
              ],
            }),
          ],
        }),
        new _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"]("mdat", {
          contents: this.getFrameData(frames),
        }),
      ],
    }).contents;
  }
}


/***/ }),

/***/ "./node_modules/mse-audio-wrapper/src/containers/webm/EBML.js":
/*!********************************************************************!*\
  !*** ./node_modules/mse-audio-wrapper/src/containers/webm/EBML.js ***!
  \********************************************************************/
/*! exports provided: default, id */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EBML; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "id", function() { return id; });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants.js */ "./node_modules/mse-audio-wrapper/src/constants.js");
/* harmony import */ var _utilities_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utilities.js */ "./node_modules/mse-audio-wrapper/src/utilities.js");
/* harmony import */ var _ContainerElement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ContainerElement.js */ "./node_modules/mse-audio-wrapper/src/containers/ContainerElement.js");
/* Copyright 2020-2021 Ethan Halsall
    
    This file is part of mse-audio-wrapper.
    
    mse-audio-wrapper is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    mse-audio-wrapper is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/






class EBML extends _ContainerElement_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
  /**
   * @description Extensible Binary Meta Language element
   * @param {name} name ID of the EBML element
   * @param {object} params Object containing contents or children
   * @param {boolean} [isUnknownLength] Set to true to use the unknown length constant for EBML
   * @param {Array<Uint8>} [params.contents] Array of bytes to insert into this box
   * @param {Array<Box>} [params.children] Array of children to insert into this box
   */
  constructor(name, { contents, children, isUnknownLength = false } = {}) {
    super({ name, contents, children });

    this._isUnknownLength = isUnknownLength;
  }

  /**
   * @description Converts a JavaScript number into a variable length EBML integer
   * @param {number} number Number to convert
   */
  static getUintVariable(number) {
    let buffer;

    if (number < 0x7f) {
      buffer = [0b10000000 | number];
    } else if (number < 0x3fff) {
      buffer = _ContainerElement_js__WEBPACK_IMPORTED_MODULE_2__["default"].getUint16(number);
      buffer[0] |= 0b01000000;
    } else if (number < 0x1fffff) {
      buffer = _ContainerElement_js__WEBPACK_IMPORTED_MODULE_2__["default"].getUint32(number).subarray(1);
      buffer[0] |= 0b00100000;
    } else if (number < 0xfffffff) {
      buffer = _ContainerElement_js__WEBPACK_IMPORTED_MODULE_2__["default"].getUint32(number);
      buffer[0] |= 0b00010000;
    } else if (number < 0x7ffffffff) {
      buffer = _ContainerElement_js__WEBPACK_IMPORTED_MODULE_2__["default"].getUint64(number).subarray(3);
      buffer[0] |= 0b00001000;
    } else if (number < 0x3ffffffffff) {
      buffer = _ContainerElement_js__WEBPACK_IMPORTED_MODULE_2__["default"].getUint64(number).subarray(2);
      buffer[0] |= 0b00000100;
    } else if (number < 0x1ffffffffffff) {
      buffer = _ContainerElement_js__WEBPACK_IMPORTED_MODULE_2__["default"].getUint64(number).subarray(1);
      buffer[0] |= 0b00000010;
    } else if (number < 0xffffffffffffff) {
      buffer = _ContainerElement_js__WEBPACK_IMPORTED_MODULE_2__["default"].getUint64(number);
      buffer[0] |= 0b00000001;
    } else if (typeof number !== "number" || isNaN(number)) {
      Object(_utilities_js__WEBPACK_IMPORTED_MODULE_1__["logError"])(
        `EBML Variable integer must be a number, instead received ${number}`
      );
      throw new Error(_constants_js__WEBPACK_IMPORTED_MODULE_0__["MSE_AUDIO_WRAPPER"] + ": Unable to encode WEBM");
    }

    return buffer;
  }

  _buildContents() {
    return [...this._name, ...this._lengthBytes, ...super._buildContents()];
  }

  _buildLength() {
    if (!this._length) {
      this._contentLength = super._buildLength();
      this._lengthBytes = this._isUnknownLength
        ? [0x01, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff] // unknown length constant
        : EBML.getUintVariable(this._contentLength);
      this._length =
        this._name.length + this._lengthBytes.length + this._contentLength;
    }

    return this._length;
  }
}

// https://tools.ietf.org/id/draft-lhomme-cellar-matroska-00.html
const id = {
  AlphaMode: [0x53, 0xc0],
  AspectRatioType: [0x54, 0xb3],
  AttachedFile: [0x61, 0xa7],
  AttachmentLink: [0x74, 0x46],
  Attachments: [0x19, 0x41, 0xa4, 0x69],
  Audio: [0xe1],
  BitDepth: [0x62, 0x64],
  BitsPerChannel: [0x55, 0xb2],
  Block: [0xa1],
  BlockAddID: [0xee],
  BlockAdditional: [0xa5],
  BlockAdditions: [0x75, 0xa1],
  BlockDuration: [0x9b],
  BlockGroup: [0xa0],
  BlockMore: [0xa6],
  CbSubsamplingHorz: [0x55, 0xb5],
  CbSubsamplingVert: [0x55, 0xb6],
  Channels: [0x9f],
  ChapCountry: [0x43, 0x7e],
  ChapLanguage: [0x43, 0x7c],
  ChapProcess: [0x69, 0x44],
  ChapProcessCodecID: [0x69, 0x55],
  ChapProcessCommand: [0x69, 0x11],
  ChapProcessData: [0x69, 0x33],
  ChapProcessPrivate: [0x45, 0x0d],
  ChapProcessTime: [0x69, 0x22],
  ChapString: [0x85],
  ChapterAtom: [0xb6],
  ChapterDisplay: [0x80],
  ChapterFlagEnabled: [0x45, 0x98],
  ChapterFlagHidden: [0x98],
  ChapterPhysicalEquiv: [0x63, 0xc3],
  Chapters: [0x10, 0x43, 0xa7, 0x70],
  ChapterSegmentEditionUID: [0x6e, 0xbc],
  ChapterSegmentUID: [0x6e, 0x67],
  ChapterStringUID: [0x56, 0x54],
  ChapterTimeEnd: [0x92],
  ChapterTimeStart: [0x91],
  ChapterTrack: [0x8f],
  ChapterTrackNumber: [0x89],
  ChapterTranslate: [0x69, 0x24],
  ChapterTranslateCodec: [0x69, 0xbf],
  ChapterTranslateEditionUID: [0x69, 0xfc],
  ChapterTranslateID: [0x69, 0xa5],
  ChapterUID: [0x73, 0xc4],
  ChromaSitingHorz: [0x55, 0xb7],
  ChromaSitingVert: [0x55, 0xb8],
  ChromaSubsamplingHorz: [0x55, 0xb3],
  ChromaSubsamplingVert: [0x55, 0xb4],
  Cluster: [0x1f, 0x43, 0xb6, 0x75],
  CodecDecodeAll: [0xaa],
  CodecDelay: [0x56, 0xaa],
  CodecID: [0x86],
  CodecName: [0x25, 0x86, 0x88],
  CodecPrivate: [0x63, 0xa2],
  CodecState: [0xa4],
  Colour: [0x55, 0xb0],
  ColourSpace: [0x2e, 0xb5, 0x24],
  ContentCompAlgo: [0x42, 0x54],
  ContentCompression: [0x50, 0x34],
  ContentCompSettings: [0x42, 0x55],
  ContentEncAlgo: [0x47, 0xe1],
  ContentEncKeyID: [0x47, 0xe2],
  ContentEncoding: [0x62, 0x40],
  ContentEncodingOrder: [0x50, 0x31],
  ContentEncodings: [0x6d, 0x80],
  ContentEncodingScope: [0x50, 0x32],
  ContentEncodingType: [0x50, 0x33],
  ContentEncryption: [0x50, 0x35],
  ContentSigAlgo: [0x47, 0xe5],
  ContentSigHashAlgo: [0x47, 0xe6],
  ContentSigKeyID: [0x47, 0xe4],
  ContentSignature: [0x47, 0xe3],
  CRC32: [0xbf],
  CueBlockNumber: [0x53, 0x78],
  CueClusterPosition: [0xf1],
  CueCodecState: [0xea],
  CueDuration: [0xb2],
  CuePoint: [0xbb],
  CueReference: [0xdb],
  CueRefTime: [0x96],
  CueRelativePosition: [0xf0],
  Cues: [0x1c, 0x53, 0xbb, 0x6b],
  CueTime: [0xb3],
  CueTrack: [0xf7],
  CueTrackPositions: [0xb7],
  DateUTC: [0x44, 0x61],
  DefaultDecodedFieldDuration: [0x23, 0x4e, 0x7a],
  DefaultDuration: [0x23, 0xe3, 0x83],
  DiscardPadding: [0x75, 0xa2],
  DisplayHeight: [0x54, 0xba],
  DisplayUnit: [0x54, 0xb2],
  DisplayWidth: [0x54, 0xb0],
  DocType: [0x42, 0x82],
  DocTypeReadVersion: [0x42, 0x85],
  DocTypeVersion: [0x42, 0x87],
  Duration: [0x44, 0x89],
  EBML: [0x1a, 0x45, 0xdf, 0xa3],
  EBMLMaxIDLength: [0x42, 0xf2],
  EBMLMaxSizeLength: [0x42, 0xf3],
  EBMLReadVersion: [0x42, 0xf7],
  EBMLVersion: [0x42, 0x86],
  EditionEntry: [0x45, 0xb9],
  EditionFlagDefault: [0x45, 0xdb],
  EditionFlagHidden: [0x45, 0xbd],
  EditionFlagOrdered: [0x45, 0xdd],
  EditionUID: [0x45, 0xbc],
  FieldOrder: [0x9d],
  FileData: [0x46, 0x5c],
  FileDescription: [0x46, 0x7e],
  FileMimeType: [0x46, 0x60],
  FileName: [0x46, 0x6e],
  FileUID: [0x46, 0xae],
  FlagDefault: [0x88],
  FlagEnabled: [0xb9],
  FlagForced: [0x55, 0xaa],
  FlagInterlaced: [0x9a],
  FlagLacing: [0x9c],
  Info: [0x15, 0x49, 0xa9, 0x66],
  LaceNumber: [0xcc],
  Language: [0x22, 0xb5, 0x9c],
  LuminanceMax: [0x55, 0xd9],
  LuminanceMin: [0x55, 0xda],
  MasteringMetadata: [0x55, 0xd0],
  MatrixCoefficients: [0x55, 0xb1],
  MaxBlockAdditionID: [0x55, 0xee],
  MaxCache: [0x6d, 0xf8],
  MaxCLL: [0x55, 0xbc],
  MaxFALL: [0x55, 0xbd],
  MinCache: [0x6d, 0xe7],
  MuxingApp: [0x4d, 0x80],
  Name: [0x53, 0x6e],
  NextFilename: [0x3e, 0x83, 0xbb],
  NextUID: [0x3e, 0xb9, 0x23],
  OutputSamplingFrequency: [0x78, 0xb5],
  PixelCropBottom: [0x54, 0xaa],
  PixelCropLeft: [0x54, 0xcc],
  PixelCropRight: [0x54, 0xdd],
  PixelCropTop: [0x54, 0xbb],
  PixelHeight: [0xba],
  PixelWidth: [0xb0],
  Position: [0xa7],
  PrevFilename: [0x3c, 0x83, 0xab],
  PrevSize: [0xab],
  PrevUID: [0x3c, 0xb9, 0x23],
  Primaries: [0x55, 0xbb],
  PrimaryBChromaticityX: [0x55, 0xd5],
  PrimaryBChromaticityY: [0x55, 0xd6],
  PrimaryGChromaticityX: [0x55, 0xd3],
  PrimaryGChromaticityY: [0x55, 0xd4],
  PrimaryRChromaticityX: [0x55, 0xd1],
  PrimaryRChromaticityY: [0x55, 0xd2],
  Range: [0x55, 0xb9],
  ReferenceBlock: [0xfb],
  ReferencePriority: [0xfa],
  SamplingFrequency: [0xb5],
  Seek: [0x4d, 0xbb],
  SeekHead: [0x11, 0x4d, 0x9b, 0x74],
  SeekID: [0x53, 0xab],
  SeekPosition: [0x53, 0xac],
  SeekPreRoll: [0x56, 0xbb],
  Segment: [0x18, 0x53, 0x80, 0x67],
  SegmentFamily: [0x44, 0x44],
  SegmentFilename: [0x73, 0x84],
  SegmentUID: [0x73, 0xa4],
  SilentTrackNumber: [0x58, 0xd7],
  SilentTracks: [0x58, 0x54],
  SimpleBlock: [0xa3],
  SimpleTag: [0x67, 0xc8],
  Slices: [0x8e],
  StereoMode: [0x53, 0xb8],
  Tag: [0x73, 0x73],
  TagAttachmentUID: [0x63, 0xc6],
  TagBinary: [0x44, 0x85],
  TagChapterUID: [0x63, 0xc4],
  TagDefault: [0x44, 0x84],
  TagEditionUID: [0x63, 0xc9],
  TagLanguage: [0x44, 0x7a],
  TagName: [0x45, 0xa3],
  Tags: [0x12, 0x54, 0xc3, 0x67],
  TagString: [0x44, 0x87],
  TagTrackUID: [0x63, 0xc5],
  Targets: [0x63, 0xc0],
  TargetType: [0x63, 0xca],
  TargetTypeValue: [0x68, 0xca],
  Timestamp: [0xe7],
  TimestampScale: [0x2a, 0xd7, 0xb1],
  TimeSlice: [0xe8],
  Title: [0x7b, 0xa9],
  TrackCombinePlanes: [0xe3],
  TrackEntry: [0xae],
  TrackJoinBlocks: [0xe9],
  TrackJoinUID: [0xed],
  TrackNumber: [0xd7],
  TrackOperation: [0xe2],
  TrackOverlay: [0x6f, 0xab],
  TrackPlane: [0xe4],
  TrackPlaneType: [0xe6],
  TrackPlaneUID: [0xe5],
  Tracks: [0x16, 0x54, 0xae, 0x6b],
  TrackTranslate: [0x66, 0x24],
  TrackTranslateCodec: [0x66, 0xbf],
  TrackTranslateEditionUID: [0x66, 0xfc],
  TrackTranslateTrackID: [0x66, 0xa5],
  TrackType: [0x83],
  TrackUID: [0x73, 0xc5],
  TransferCharacteristics: [0x55, 0xba],
  Video: [0xe0],
  Void: [0xec],
  WhitePointChromaticityX: [0x55, 0xd7],
  WhitePointChromaticityY: [0x55, 0xd8],
  WritingApp: [0x57, 0x41],
};


/***/ }),

/***/ "./node_modules/mse-audio-wrapper/src/containers/webm/WEBMContainer.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/mse-audio-wrapper/src/containers/webm/WEBMContainer.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WEBMContainer; });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants.js */ "./node_modules/mse-audio-wrapper/src/constants.js");
/* harmony import */ var _utilities_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utilities.js */ "./node_modules/mse-audio-wrapper/src/utilities.js");
/* harmony import */ var _ContainerElement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ContainerElement.js */ "./node_modules/mse-audio-wrapper/src/containers/ContainerElement.js");
/* harmony import */ var _EBML_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./EBML.js */ "./node_modules/mse-audio-wrapper/src/containers/webm/EBML.js");
/* Copyright 2020-2021 Ethan Halsall
    
    This file is part of mse-audio-wrapper.
    
    mse-audio-wrapper is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    mse-audio-wrapper is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/







class WEBMContainer {
  constructor(codec) {
    switch (codec) {
      case _constants_js__WEBPACK_IMPORTED_MODULE_0__["OPUS"]: {
        this._codecId = "A_OPUS";
        this._getCodecSpecificTrack = (header) => [
          new _EBML_js__WEBPACK_IMPORTED_MODULE_3__["default"](_EBML_js__WEBPACK_IMPORTED_MODULE_3__["id"].CodecDelay, {
            contents: _EBML_js__WEBPACK_IMPORTED_MODULE_3__["default"].getUint32(
              Math.round(header.preSkip * this._timestampScale)
            ),
          }), // OPUS codec delay
          new _EBML_js__WEBPACK_IMPORTED_MODULE_3__["default"](_EBML_js__WEBPACK_IMPORTED_MODULE_3__["id"].SeekPreRoll, {
            contents: _EBML_js__WEBPACK_IMPORTED_MODULE_3__["default"].getUint32(Math.round(3840 * this._timestampScale)),
          }), // OPUS seek preroll 80ms
          new _EBML_js__WEBPACK_IMPORTED_MODULE_3__["default"](_EBML_js__WEBPACK_IMPORTED_MODULE_3__["id"].CodecPrivate, { contents: header.data }), // OpusHead bytes
        ];
        break;
      }
      case _constants_js__WEBPACK_IMPORTED_MODULE_0__["VORBIS"]: {
        this._codecId = "A_VORBIS";
        this._getCodecSpecificTrack = (header) => [
          new _EBML_js__WEBPACK_IMPORTED_MODULE_3__["default"](_EBML_js__WEBPACK_IMPORTED_MODULE_3__["id"].CodecPrivate, {
            contents: [
              0x02, // number of packets
              Object(_utilities_js__WEBPACK_IMPORTED_MODULE_1__["xiphLacing"])(header.data, header.vorbisComments),
              header.data,
              header.vorbisComments,
              header.vorbisSetup,
            ],
          }),
        ];
        break;
      }
    }
  }

  getInitializationSegment({ header }) {
    this._timestampScale = 1000000000 / header.sampleRate;

    return new _ContainerElement_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
      children: [
        new _EBML_js__WEBPACK_IMPORTED_MODULE_3__["default"](_EBML_js__WEBPACK_IMPORTED_MODULE_3__["id"].EBML, {
          children: [
            new _EBML_js__WEBPACK_IMPORTED_MODULE_3__["default"](_EBML_js__WEBPACK_IMPORTED_MODULE_3__["id"].EBMLVersion, { contents: 1 }),
            new _EBML_js__WEBPACK_IMPORTED_MODULE_3__["default"](_EBML_js__WEBPACK_IMPORTED_MODULE_3__["id"].EBMLReadVersion, { contents: 1 }),
            new _EBML_js__WEBPACK_IMPORTED_MODULE_3__["default"](_EBML_js__WEBPACK_IMPORTED_MODULE_3__["id"].EBMLMaxIDLength, { contents: 4 }),
            new _EBML_js__WEBPACK_IMPORTED_MODULE_3__["default"](_EBML_js__WEBPACK_IMPORTED_MODULE_3__["id"].EBMLMaxSizeLength, { contents: 8 }),
            new _EBML_js__WEBPACK_IMPORTED_MODULE_3__["default"](_EBML_js__WEBPACK_IMPORTED_MODULE_3__["id"].DocType, { contents: _EBML_js__WEBPACK_IMPORTED_MODULE_3__["default"].stringToByteArray(_constants_js__WEBPACK_IMPORTED_MODULE_0__["WEBM"]) }),
            new _EBML_js__WEBPACK_IMPORTED_MODULE_3__["default"](_EBML_js__WEBPACK_IMPORTED_MODULE_3__["id"].DocTypeVersion, { contents: 4 }),
            new _EBML_js__WEBPACK_IMPORTED_MODULE_3__["default"](_EBML_js__WEBPACK_IMPORTED_MODULE_3__["id"].DocTypeReadVersion, { contents: 2 }),
          ],
        }),
        new _EBML_js__WEBPACK_IMPORTED_MODULE_3__["default"](_EBML_js__WEBPACK_IMPORTED_MODULE_3__["id"].Segment, {
          isUnknownLength: true,
          children: [
            new _EBML_js__WEBPACK_IMPORTED_MODULE_3__["default"](_EBML_js__WEBPACK_IMPORTED_MODULE_3__["id"].Info, {
              children: [
                new _EBML_js__WEBPACK_IMPORTED_MODULE_3__["default"](_EBML_js__WEBPACK_IMPORTED_MODULE_3__["id"].TimestampScale, {
                  contents: _EBML_js__WEBPACK_IMPORTED_MODULE_3__["default"].getUint32(
                    Math.floor(this._timestampScale) // Base timestamps on sample rate vs. milliseconds https://www.matroska.org/technical/notes.html#timestamps
                  ),
                }),
                new _EBML_js__WEBPACK_IMPORTED_MODULE_3__["default"](_EBML_js__WEBPACK_IMPORTED_MODULE_3__["id"].MuxingApp, {
                  contents: _EBML_js__WEBPACK_IMPORTED_MODULE_3__["default"].stringToByteArray(_constants_js__WEBPACK_IMPORTED_MODULE_0__["MSE_AUDIO_WRAPPER"]),
                }),
                new _EBML_js__WEBPACK_IMPORTED_MODULE_3__["default"](_EBML_js__WEBPACK_IMPORTED_MODULE_3__["id"].WritingApp, {
                  contents: _EBML_js__WEBPACK_IMPORTED_MODULE_3__["default"].stringToByteArray(_constants_js__WEBPACK_IMPORTED_MODULE_0__["MSE_AUDIO_WRAPPER"]),
                }),
              ],
            }),
            new _EBML_js__WEBPACK_IMPORTED_MODULE_3__["default"](_EBML_js__WEBPACK_IMPORTED_MODULE_3__["id"].Tracks, {
              children: [
                new _EBML_js__WEBPACK_IMPORTED_MODULE_3__["default"](_EBML_js__WEBPACK_IMPORTED_MODULE_3__["id"].TrackEntry, {
                  children: [
                    new _EBML_js__WEBPACK_IMPORTED_MODULE_3__["default"](_EBML_js__WEBPACK_IMPORTED_MODULE_3__["id"].TrackNumber, { contents: 0x01 }),
                    new _EBML_js__WEBPACK_IMPORTED_MODULE_3__["default"](_EBML_js__WEBPACK_IMPORTED_MODULE_3__["id"].TrackUID, { contents: 0x01 }),
                    new _EBML_js__WEBPACK_IMPORTED_MODULE_3__["default"](_EBML_js__WEBPACK_IMPORTED_MODULE_3__["id"].FlagLacing, { contents: 0x00 }),
                    new _EBML_js__WEBPACK_IMPORTED_MODULE_3__["default"](_EBML_js__WEBPACK_IMPORTED_MODULE_3__["id"].CodecID, {
                      contents: _EBML_js__WEBPACK_IMPORTED_MODULE_3__["default"].stringToByteArray(this._codecId),
                    }),
                    new _EBML_js__WEBPACK_IMPORTED_MODULE_3__["default"](_EBML_js__WEBPACK_IMPORTED_MODULE_3__["id"].TrackType, { contents: 0x02 }), // audio
                    new _EBML_js__WEBPACK_IMPORTED_MODULE_3__["default"](_EBML_js__WEBPACK_IMPORTED_MODULE_3__["id"].Audio, {
                      children: [
                        new _EBML_js__WEBPACK_IMPORTED_MODULE_3__["default"](_EBML_js__WEBPACK_IMPORTED_MODULE_3__["id"].Channels, { contents: header.channels }),
                        new _EBML_js__WEBPACK_IMPORTED_MODULE_3__["default"](_EBML_js__WEBPACK_IMPORTED_MODULE_3__["id"].SamplingFrequency, {
                          contents: _EBML_js__WEBPACK_IMPORTED_MODULE_3__["default"].getFloat64(header.sampleRate),
                        }),
                        new _EBML_js__WEBPACK_IMPORTED_MODULE_3__["default"](_EBML_js__WEBPACK_IMPORTED_MODULE_3__["id"].BitDepth, { contents: header.bitDepth }),
                      ],
                    }),
                    ...this._getCodecSpecificTrack(header),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }).contents;
  }

  getMediaSegment(frames) {
    const offsetSamples = frames[0].totalSamples;

    return new _EBML_js__WEBPACK_IMPORTED_MODULE_3__["default"](_EBML_js__WEBPACK_IMPORTED_MODULE_3__["id"].Cluster, {
      children: [
        new _EBML_js__WEBPACK_IMPORTED_MODULE_3__["default"](_EBML_js__WEBPACK_IMPORTED_MODULE_3__["id"].Timestamp, {
          contents: _EBML_js__WEBPACK_IMPORTED_MODULE_3__["default"].getUintVariable(offsetSamples), // Absolute timecode of the cluster
        }),
        ...frames.map(
          ({ data, totalSamples }) =>
            new _EBML_js__WEBPACK_IMPORTED_MODULE_3__["default"](_EBML_js__WEBPACK_IMPORTED_MODULE_3__["id"].SimpleBlock, {
              contents: [
                0x81, // track number
                _EBML_js__WEBPACK_IMPORTED_MODULE_3__["default"].getInt16(totalSamples - offsetSamples), // timestamp relative to cluster Int16
                0x80, // No lacing
                data, // ogg page contents
              ],
            })
        ),
      ],
    }).contents;
  }
}


/***/ }),

/***/ "./node_modules/mse-audio-wrapper/src/utilities.js":
/*!*********************************************************!*\
  !*** ./node_modules/mse-audio-wrapper/src/utilities.js ***!
  \*********************************************************/
/*! exports provided: logError, xiphLacing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logError", function() { return logError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "xiphLacing", function() { return xiphLacing; });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ "./node_modules/mse-audio-wrapper/src/constants.js");
/* Copyright 2020-2021 Ethan Halsall
    
    This file is part of mse-audio-wrapper.
    
    mse-audio-wrapper is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    mse-audio-wrapper is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/



const xiphLacing = (...buffers) =>
  buffers.flatMap((buffer) => {
    const lacing = [];
    for (let l = buffer.length; l >= 0; l -= 255) {
      lacing.push(l >= 255 ? 255 : l);
    }
    return lacing;
  });

const logError = (...messages) => {
  console.error(
    _constants_js__WEBPACK_IMPORTED_MODULE_0__["MSE_AUDIO_WRAPPER"],
    messages.reduce((acc, message) => acc + "\n  " + message, "")
  );
};




/***/ }),

/***/ "./node_modules/node-libs-browser/node_modules/inherits/inherits_browser.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/node-libs-browser/node_modules/inherits/inherits_browser.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),

/***/ "./node_modules/node-libs-browser/node_modules/util/support/isBufferBrowser.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/node-libs-browser/node_modules/util/support/isBufferBrowser.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),

/***/ "./node_modules/node-libs-browser/node_modules/util/util.js":
/*!******************************************************************!*\
  !*** ./node_modules/node-libs-browser/node_modules/util/util.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors ||
  function getOwnPropertyDescriptors(obj) {
    var keys = Object.keys(obj);
    var descriptors = {};
    for (var i = 0; i < keys.length; i++) {
      descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    }
    return descriptors;
  };

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  if (typeof process !== 'undefined' && process.noDeprecation === true) {
    return fn;
  }

  // Allow for deprecating things in the process of starting up.
  if (typeof process === 'undefined') {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(/*! ./support/isBuffer */ "./node_modules/node-libs-browser/node_modules/util/support/isBufferBrowser.js");

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(/*! inherits */ "./node_modules/node-libs-browser/node_modules/inherits/inherits_browser.js");

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;

exports.promisify = function promisify(original) {
  if (typeof original !== 'function')
    throw new TypeError('The "original" argument must be of type Function');

  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
    var fn = original[kCustomPromisifiedSymbol];
    if (typeof fn !== 'function') {
      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
    }
    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn, enumerable: false, writable: false, configurable: true
    });
    return fn;
  }

  function fn() {
    var promiseResolve, promiseReject;
    var promise = new Promise(function (resolve, reject) {
      promiseResolve = resolve;
      promiseReject = reject;
    });

    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    args.push(function (err, value) {
      if (err) {
        promiseReject(err);
      } else {
        promiseResolve(value);
      }
    });

    try {
      original.apply(this, args);
    } catch (err) {
      promiseReject(err);
    }

    return promise;
  }

  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));

  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn, enumerable: false, writable: false, configurable: true
  });
  return Object.defineProperties(
    fn,
    getOwnPropertyDescriptors(original)
  );
}

exports.promisify.custom = kCustomPromisifiedSymbol

function callbackifyOnRejected(reason, cb) {
  // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
  // Because `null` is a special error value in callbacks which means "no error
  // occurred", we error-wrap so the callback consumer can distinguish between
  // "the promise rejected with null" or "the promise fulfilled with undefined".
  if (!reason) {
    var newReason = new Error('Promise was rejected with a falsy value');
    newReason.reason = reason;
    reason = newReason;
  }
  return cb(reason);
}

function callbackify(original) {
  if (typeof original !== 'function') {
    throw new TypeError('The "original" argument must be of type Function');
  }

  // We DO NOT return the promise as it gives the user a false sense that
  // the promise is actually somehow related to the callback's execution
  // and that the callback throwing will reject the promise.
  function callbackified() {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    var maybeCb = args.pop();
    if (typeof maybeCb !== 'function') {
      throw new TypeError('The last argument must be of type Function');
    }
    var self = this;
    var cb = function() {
      return maybeCb.apply(self, arguments);
    };
    // In true node style we process the callback on `nextTick` with all the
    // implications (stack, `uncaughtException`, `async_hooks`)
    original.apply(this, args)
      .then(function(ret) { process.nextTick(cb, null, ret) },
            function(rej) { process.nextTick(callbackifyOnRejected, rej, cb) });
  }

  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
  Object.defineProperties(callbackified,
                          getOwnPropertyDescriptors(original));
  return callbackified;
}
exports.callbackify = callbackify;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/opus-decoder/index.js":
/*!********************************************!*\
  !*** ./node_modules/opus-decoder/index.js ***!
  \********************************************/
/*! exports provided: OpusDecoder, OpusDecoderWebWorker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_OpusDecoder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/OpusDecoder.js */ "./node_modules/opus-decoder/src/OpusDecoder.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OpusDecoder", function() { return _src_OpusDecoder_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _src_OpusDecoderWebWorker_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/OpusDecoderWebWorker.js */ "./node_modules/opus-decoder/src/OpusDecoderWebWorker.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OpusDecoderWebWorker", function() { return _src_OpusDecoderWebWorker_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });







/***/ }),

/***/ "./node_modules/opus-decoder/src/EmscriptenWasm.js":
/*!*********************************************************!*\
  !*** ./node_modules/opus-decoder/src/EmscriptenWasm.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EmscriptenWASM; });
/* **************************************************
 * This file is auto-generated during the build process.
 * Any edits to this file will be overwritten.
 ****************************************************/

class EmscriptenWASM {
constructor(WASMAudioDecoderCommon) {
var Module = Module;

function ready() {}

Module = {};

function abort(what) {
 throw what;
}

for (var base64ReverseLookup = new Uint8Array(123), i = 25; i >= 0; --i) {
 base64ReverseLookup[48 + i] = 52 + i;
 base64ReverseLookup[65 + i] = i;
 base64ReverseLookup[97 + i] = 26 + i;
}

base64ReverseLookup[43] = 62;

base64ReverseLookup[47] = 63;

function base64Decode(b64) {
 var b1, b2, i = 0, j = 0, bLength = b64.length, output = new Uint8Array((bLength * 3 >> 2) - (b64[bLength - 2] == "=") - (b64[bLength - 1] == "="));
 for (;i < bLength; i += 4, j += 3) {
  b1 = base64ReverseLookup[b64.charCodeAt(i + 1)];
  b2 = base64ReverseLookup[b64.charCodeAt(i + 2)];
  output[j] = base64ReverseLookup[b64.charCodeAt(i)] << 2 | b1 >> 4;
  output[j + 1] = b1 << 4 | b2 >> 2;
  output[j + 2] = b2 << 6 | base64ReverseLookup[b64.charCodeAt(i + 3)];
 }
 return output;
}

Module["wasm"] = WASMAudioDecoderCommon.inflateYencString(`Æç7¶¿ÿ¡¡Ýé	!rsNïYs~µÌR»¹¼R´¾R©7Sô×æVÏÔÓ6ÓP[êL1;\`tpeÕ»¶Û®¯«_,1Z>¹¶GZr¶ê 6Q6;\`ó:-åsæÍ&(wtÈë´¤!¥çÈ#¤¿ùé[Ó~Tó%ó5ß&£Kç Wã lÿøõoyâv¹Ewå;uuóÁË$ÿUY^æ6¡ÖÿATîTØçoíUXðô¤ñêD§ËÖ³P&Õ~Ë¥¿ô5»lSfuhÉ¦èü!©~Ó%¯tÍ¤(ßÄNßYsÔ}OCÕd¿pdÓaåsÍ»Ð=MüÃ³ã$&wüpwmðL×eÎÈ¸aâÏß¯×÷t×=@Ï¤§Üy¨cs¼¤MsØÑýpÅëU%µ©Æ ÄU#¹µ¿å½AUA¼ÁTK#yTùP'ô#z¼ÖO¿Û©ÙÕ¨×À~Ù¯Þâ¥Ð fzRÎç[~PeÎ'ÖÄ´ÏññË¼ÏÎ=}ü»8ÿ=MK7óètr¯á´ÎÉ{K±fÿ=M®½=M¿x±ÄÔïÁXß¯EËFºtUÕSJÖàÄ=@&ÖßÄà&ÖåÄ 'ÖáÄ &_ÇÝ¯ÿëùÀýi5ÕÝÇÕxißÄÝçÕieâÄHÝmÕKieæÄH ÝÍÕ{¤ ¦jùªÁ½f§pgÃ=}s{ý2*fQ£¤°DÒ{¥âDßzCãrÎÌ=MVg|s'Ö¤Î|çß¿<ÄT?¨þ¦~=M¶fTÇyQßËìrfãÄÿHÜ÷ªÒ7yxr$~àÀN¬B·zGªÃje5Ëü4Ñ¼¸½ñÃ@,N­ìêÒ"KS~3ÐÍ!¯XÿûE^^çèä¨ë*,"´1BAG69Y ÿÊPØjMG~ý´¹½ÌeVâ:fü+îü+výËußÃìãÖtªT@Xÿ+Ê.Õa~%híQT9~j1=@+âz=M«lþ>´qÝÚ=@ÕrG=@Îû­Õ£U» <÷­PqR»6lä]:¡ýÙt­Ýæ)ªßÞ¤æzÌtT-íílÁoÏíÉÿ½$ßG?$Ç¡ñB±Ý^¯X¦&i¤iÔ6Pðÿ³LÇÂàT(sç¿ënÍh[ûÈªvsMØý buL~Äãè*=}sÍÆÛù#éÀ5¤îñ¨y{×ý5 Y¤5®wø¶¹£áÀ73Ö¢ÉÒ³TWÕ%w?ØûfuÚ|1øoäæ©Ýüý>'zé³¯ÜÈaªÌDYRÙÖ%ïI$·ãêæXê¤SúÚ2¼HÎ£Ýé¨'¨s5Í7Í7£<slk©9)¬(|*m4U$ñÀÌÞtÿUïÊÝ*Á-näüw©vÇËÖw}Z´$ûÿ[VàÒØÍSËÒT;/ëÞ±÷ÎÕKÅ^]Àõ®	sºzÆ~»êLQÃËÖ@ÏÕíã_{NÁHï=}Á¶íÏÑð+Øî^ÿ@/g-wR=}äuâç~åÑ³Ñø?ÝÝÍÛ\`áÅ·?½Á´G=@æ OÈ}%V¶±¸ß=MÝ5=MÜäëd;ðXú+@WÈÿKÅDà7· ïÞ¢ñ=JÏU6pGfõhþíÂÄ@Ï^v?xbz¢Têò³ÖEànàÿÅÃ¢iZ´V7þB´¢íê/ô_èHäçQdúÓàý^=}E¢m²4ç3ÿ=@¦ÍByÛ8º/hhÈÒ¿ÖwKç®ÊË#¾=Jé"u­æÛ}½ÏwÚm=}0ªóòä6¸H?ØgÈã-!cì¡o´Ý ycöÔÔ­¶©ßF©=@iÙt°@ï!9!ÝØ_×^?·Ì$jn_åÅ^ÚëB¯ ø´û"ñbfÈàûÒýVM\\KÖä¼¡¤½ö©Ôù)Þz,+ø{#7vËG¾/uD´D¤¸æ=}¼&ÅrZ7x$	) ¡Ü@Ò2¶±_×õz©Góm¾ð4@¤¿uCVÖÊ"GödNY=JWä·,OZª¼NÂ­Å)æÌ«h]ª@)XC(h<å;­½=JµÎs³Ô;9\\ÜÞçÀÉ~RRsê:+ûIÒívV®gþXmØÕïþSðÒÞRÄmØ_Â¡ùîÓÔ½sÃkª¼.¬v@<o+µeójûK³d<.ê$=JË^]{N¢s(¸÷ÔóÅû	7ËèTlÀhh8ÎIK÷9Jæ¸æVºã¤ó¯x»©?ÿ=Jzzº>~{¦µCUÔyåâY3/×S#AÁ£ÒõÏÜàûä|_9îíÔÝ·÷XP\`[|Vf®³ø3;°§öß.Øé]É Ù_ok:E±w¶1 K5FÔP3-Pî=@ËXì¿=J/ÅíAJ¼<üJ°ÄprÍ[¿ó;#>îPJÌzfWTeÕ ¸çÇøùnÈªá@ä§Pâéi¥ËQëwNéiWà$<NµÔôÛT»5ÙÔM¶-°8\\ÆÎ.kÂ¼pºä1CíjCEªÕ¶@^O]ß:Q6Éð£P@^Vu,sª.t\\N9µ¯¨xëõ2ëÝ¨mß#ïl,ôð5>³HZ²Ýd=@÷Æ^cÝÀk+-?É%í4¥sÇ'÷´ÂrµÐË[â\\òÜ§çi>Ul=M|°f]%RÅíaXÈ]õê1ceõ:£IRuÚWÔ<F>ïæÏÝ}uþ5i¬ôpåäSÆÆ\`B£=@¡Â5÷EKyJÕFr£ï\`7seÃ|£¥¬á\`æ(tlÍ§/ØÀRÞpuEU4â8n2nÐ.»Y£ÍÏ°DìÐÃ»°Ê5p°o®­ÖB\`ÐüöqúV*!ùJcßÃþ <vÌRBPæTÁcÙ|õ¤gÞeVês·Ê32\`9£ÕH+D¨4ìÀ¸ºZ£ÿÖx#®\`=}zë£¯c8	¹3=}U_\\äÛsñöiíê¸@µö»Ïcû¼ Â'ÛD8RËeÙ¾<Ý¿=MWè<Ñ¶Ô½ÕÇ[é÷û¡l'q©"­Ñ¸ç70ÔËQhñÿ#æ{°®É]ÒìÛÍõ¥sÖÔ\`¥ÊÁ¸ÝGmñìÞ¸=J*j%m¯Ê¬N	¤=MaãÓhqu	ºFv©Ï½MkýñZ0»§aÉ5Õ5Âå àÊ·î*V#7Ó×Xß·!Üp¡§E¬ZÐ»ÆïL¬©¢Ù(hEæw/&ÝP+q :[ÝËÁkýÖ×Þ(çÇYÇKVçWè:V.Öíç=J]cívÔhIa¶¡í¶	¤=M£êÅ1à×~¿²Vv¹xvuJQÓ^¯<0M¿bpïÞDSHYÕ¥µ=@ËÅý#ê®Ër^n^*_\\ÀÛdXÔ¬[Dæÿl½HÂõå¸çÊ©>1dn7ÌÍ'b=Mðÿögê]òÖv;ðúhb²³»½äað$Ö|sãÛ¸T/²£}a=J¾´Ìuþ|O}ÅÕÿ¸ËÑzÓMyí?²ß´DÌÊµòF*Ý=M7â ÒPÐ!ÂÚ×m­%:ì[ÇëgMZ@çqª<£ajQÎôº$·\`j]ÑlÄa*ÖÔ'Î»öòÐðOõaÒV©á>Ü¥M:xûasÐXÔ²Ô¢h<×´gOû9$wæï¤ËÎÿzõQm%Ït¥öZCÐ*£\\ìÞ´ã°9Tp3pùT»àµXNÓÌ;±qZ1±Î<<Ä«¤4OîJvç|=@µ?Ñ.Ö¹âëËKÚÂòªÇ´"&è_Ôi½=JO>};ër²Sx{{$Øu=Jü*ÄÉðÒ"À£§çZSSøªmúüm%Ù¬åaZ;?0ÊM¥Ë§ÑÒÜy40x´Üê§dVÓ¾÷*Úöe=M%?ô÷­Üg·®]òBæ ³@^XyXë©î½{jÕÛNw*s3ur7£ÏBLYuÚîÃâýØö"uV¿ÿ¨*O|ÀÖÏWÝÈEï:Á½Àëî(dò%T½6 KÛ5Êñ^³aºÊýzdû±åV=@é­©U(ái'©{¿ê©'¤¤óIvèÉÝÊõ'ÖÔ=@°HúÞ¯B+DÿÅã×Ó,×7	Xç÷HQ=MmÒøivü$ß_QÂ\`eØ"äl§¼UuïÁx÷ÔÛà¿à^Í_ ¹,RÙÓá)¡(aÊÄÅKD®M4ã4àéÖÝ÷¤]	=}ï·R´nk=}ì"ó:ªkåu]6=@vè¶üä=}ßÇÁzÄ¼¾OêÒÑÇûpK~.ßºÄ*×áòÀrexÎQßr¤@éVmª ãzßwÊÈ8r¤gP×ðïÞëãsbaýajÍdÿQ´¥Y1µ¿&z½õ\`\\NÖßìëLç¼ª¤ÒxÙx>Y@ÿ_¾/ßZôÒA¤Û<$pâ"ÂLÑ®³:üa½ôhKv×kCêî$]?84UÐÜÄä:o<8þ|^òpÑäý³Ó~ëBõ[ss¥³ÿÇG8ÜeË'}¤ÛÈWÅÇÚç"w\`ìVøÜÞâú// 4O;×Ñ"áµHVE0&ËöJiv:+ËæÏµ(Cbg^×:0E½ïÉakPniÁy³ñvSÍ1Q{£ë=}=M77|æßìØßxTçÁðã9¡Ô|Do§éa¥J3úY*áNüÊy¯¯}#Ã4ß ÑåMæø;Ø¾=MÎý5&ÍÝçï÷¶¯ ·ýÛðõñwuY=@ISë}iP¼Tá*R¥1ÒM÷£ùS©²øÆ iIûÆ@sÕä	ÍDz¦Ü¡xáAÂÖ¯µvüBmi Dít2±¦ÄÐâ(UÐW<¬¸Ai)«O@YUh¬ð=@À¾þÓIl 4­ BºÑìmí»V±RYôëd§5a­Ýeqpw	Ö±O¶ØíWñ0yûF~ú¡|å§MÝ×õyÐuË'Â¿è©L^®½¾! î¤v=Mô©æÜòÃ?Un@æÕExx ÜQ7ã½ØöÍ"ÇÜ3È¹ëìtYüÖS§ãnùÛ½JB¼¤~¤°¤Ûõ9]y¶µ=@ =J?ËäÇÀnH%/ùØÐazl°ð$ýå=@ÆaWðØ÷Ì]ÂÒQß7m@róÚ~¢Lû.áCÁÃòÖñµ$$_ÉzbÆ·1Ç]ËØ+Z÷Ø×úÌEóµÒéÃÜénÝ½cGZûÅ¹Gò#!?i£)ÉÌÃ_'Õ"ðktEHê#0Q)\`½ÅéõöúJ%d~Lÿu^$¸¾9·Æ«#Ä_µ[$ÐiÏ¡æ=@ç_ÍÞ$øA¹!j¾Ùý,CýÞlNWR+¥ª+Ð¥>e	Zå_ïù+â!ERöî¥ÿ_©Õa*îa9hºBü<áê=@Z­ûÌÞR·6uç-íÞ|Ï~ÓØAã@#$o«ý=@ñ@?·_¢æ­MtCsüR²×Ç>§WñMÏ´s[îp®{È@=}ÁmLdòóD1B´±D. ×ù¿Ðº í@^ÄWÔIþºwû>(çcGX*½çÒeÇ¸""ù9@)ùkã[þxÏë)f²Uö>×½zÛ!Ðwh¼ÎÂ+wÃßU¨à¹<é´Ìp×Ð	Æ Bä¦§ä"=Jj=@F\\CÖ=}4RSz&c¹^^)¶Í[v³×Ðiªl¿ý	9Ôr7_ Q¢QÊ=@!¦§6%5àØ@7qFfxR$n4íÒ½]Aýöç 9Ó{»vÂ3¼´FmÊ("®]ovLs®ë,ì¹"·m§¨=Mðnû  |î0ì3?×Ldp|é­¡o8åvN¸ÆcPvbGÍ4°2X»Y½ïyÑ%<ëC=}ÉµiÃ±ær¤6z,¶m¢AÉ§Z¸6ÍùQ^\\°OM&ÊCÅ­Îi½ýØüÄ	o?÷>Zc¿¿þµÉ{nåU7x2-	dÊGÃ&0öR2êD£RÔ>d"Ùà*IÒ®£Fk´ÔP±5ú;ÍíwÅz7DZâH¼ó"Ë¨ÐøZÐ¥?øu±à_iÇ¨\`ØøOÔI_6\`;;AÄ&Óâ!hW/O¢½EÉÜ+Zr~6RÑpäÊÜóLª¤ÉþU'±ÝLÅÆ&RÈ+ h{üSâÖ@Ütb]>ð¦47Ú^F°"*\`²wé£rwÏ8¾Ä\`t+»BE\`Y¯ó'ó¥Q}®,e)[ÙMöWkTÜ-%ýO·/0R×G_QàJ^	æeXk=})që»$×%bç¨}Qî1!£YñNv¶CùÝÕ¨:	9´v@Ç5©*s=M}Î'Z\`T±wåí.¼·?ËkkÏZKîéYqÑgÑ÷0Ð¯R.ñ=@"ÉÆú®Qe}´+¼w1Eã] ¢b[å¾L]Y#>5Ñ{:VÐü5±[9OÌ¢p-ok>Ó¡sPêXgÞÿÙvý zO¢]É$"ë±I¨²E-H~Â£/h/lÏªp.~ôÉ<8ßuÜt¥ÉÊCæÐ£;S/nÑêá:F	ª²¯ÎýÏ9ÿUaÐvð¯×]_X5À8´WºâVõpþ¼Exdyà\\©¸»-ëÖ=@Ã×õZeÚ3Ô	«+¡ÛÚV[mrÝbPð¿T¸g³nÀ_¬B|Eô°H{à_x)ZÖ7£=Méón g?íL¹Ë±¸X<Í·ÔÙ÷ÁÇäa#^åÇ7(×"Á\\;YÙA÷UDºÈßxIÀ3ýVjâ½À	^d°¦±°AÖø.mÃB !T­¦ÃÐ2ib'sEXèõ~_BÑ­Æõ °=@(ÎP©¼ì¬LOAUaÄ.&0ìx·\\HB#tÑÒ¥CÝ	ô?è7=J :hìÖã¡£×K8µé¾ú[*.Qî.cûðCî¸dõÐ'\\~Õ£>2n{Ç~Ìæçç_»n (À»ÛÂqLÌýµ¼önW\\^©ë<ÅæÙ"zÝí½u,î÷%Û£Ñ^à½Ëí·®j8øêjåSY¼}¦T¦GÑgÇÿ5_{+½Ý¹}bÜ°¼#GÞHµ±e@à0fÇÌ:±Ú³_ûn=Jnp{QñØÅqÑ?~ëàÚ}KiY¬g<¤KØ*BL|<DáËH=@laVR8·Ltæ½¤50Tñ(o~¶+k1$WüÁy²d®±Ñ\`+>ÃÐ*=@G/Ò =}9ÉG­¥jÅÁúòÅ»½îr÷(òzØí9'¦EHÁgÅ0H]MýOßS¼xâí±ªhÛldç<8¹Ø'Ë%=J>%Ç9Ýé·*ÿõ¡ZÒûëfÍ2rà[Ûë5LßîÃÐS©õÈòAñ­qþ¤ÌdX*kÌË<¼çaÀ!"PÎ\`l}ÐjU2WxÃPÐãE.}L××KñÌ{×<·èPçZÖ¨ý^Vúuæ]U<Ï¶T*«jÌÛ[º^F<FKúx+²ü	aïãvl=@\\îuÔýC{×K ø7FvK¶	ñíuÚþ¸~(ê6çÆjbÎN!áNcAÂ*0>A	Âà#í6å.-Wt4Óú·9Þ±sÙ47j>{ó_9êöÈãÁ%ðÛWzOÌàbD¤gõ na­@Em=M9Ôç"ÐìvXþæ})Ý÷Ç"-=MÓx	Ædå.³þç!ïá÷üÐ*½òhÒÛ¾÷@B8nB,ô³?§S=@wÐºs7|K>¯ä|vÙCE»%xaVÙÛ.ÿ¨IA#]RtMöÄ<=J¼ÛÒÛq-ö-bKvûcàÛZ×P°Þm²¦Ñæ¿Î(¸3×xm÷Á4©\\0­sTè¯âKók=}eàqÖ*mIt²=}ÂýzííÚ&Ë¯f!ý-DÉ-ôÞ"Ö¦càPëüj^Ùóuv#+äÂþ¬ ÙÅPt4qÅÐ¡ÐÃE<=M@+3Í´~ Íe¢±H§w×mv'µt(+Här<µ,æzË"-i?#Ú«>cêÇ¦R¹Ã.$ÈÚÒ×ÅF ©o¡aÐìHMS35hT<[°ù1éÁw}c¯Ý±Ò×ÈJ1&øEi$ÑÂr()"Yé¯³nì:¥¥¯~UOußxì0NûÈâ×g(^+?çà÷_-eQßï{e¿Ç¯-!J¾/&ï5Á$P#¶Öj¤b°~FjyÇõ>üº(@ó^Ì¨rH&éÌjÏRùX9Ã^J\\¶ÿíF¸uØüÒÅþ¬­8àZù´iÌßºsÚ«Öÿ{©µ©á{ÀTP÷·ívv{\\n×\\òãè5ËoÝ0öFÍ4±¾M÷äMA¾Dí½uG&$VÕ¢ë\\¶Å8gÃþd0o$\\§k±yY¢«ö4ÑêïÒZnËPÄÎXdúbRÚ²èC ©ß=}"±ïÙªÔüdO±GîiMýý¼½í@ÙÒ	ÍÁ0æÎÁ×æÙ¸ø?1RÃþcYwþ¿VµÌGéä©þ{÷¯'êÄ×]$Ð%°ý<¿=JÂ|9îÿ~Ê=MN4-x¨iî÷ß,v}£ÁÝ6DÊIkK/YâHHtèJaßR¨ÎÐ^;	½b58àÙ_O5ýÁ=Mës_\`\`'°ÛGs®<©IqÀÇm4:1ä»éUÖÑi²d=@ß½éÅ¢[²-RTäGF2¶=}æp=}áûÂÙ7"8ûöI÷Ú=M34zïýÍAÍ­m,ñÍï(ªgÐÇKï=@_>ü¡«pÆ×¥eN;6ìÁ^!QN=JÓ¼ZüAÇYc^¸7[ý¤Ú+ÎÕS×¥ê¾¾R´££hRÇ8d¡úkMÞÛ>À¶ÌÿGÅeR=@Û@}=Mý8¯'BLÓÝßÎvÉæ.ÿo/áÜGdæº«[FÚö³²ºtRü²mØ®Ú0;Ûß>¦Þ[C6°y¡Úþ=MG=M=@ð=Mðð=Mp#âåÂTI¥AïÿaHaaHa§®_ëÌÅ?_Å²ªS\`~º¾íæÆ¼}¸û\\ãÂ'­7þQíùñÃË1Ý;§Üì(eø\\G@Ý'dV!ZÁgÒív n±ª8çKGPÜÍdÝ±BõHûË¿×úòHÿËÀgÐmÄgØmOeC=}&½Å%tó5Í=J²3þl^<¨ìóßs·Â7úsIiÅî+\\ñ6H°Áz°ugÏv?(°@&Ûb"B=Mf¥=MÍ(áãgá±ÙôMEùHpµIÊï993xÑ¹feùDä':áO%ËU5ÈG¢ êseíoÙgZ*ü³Ìp1ç]½©tFÇy#eq°æè1a¥"Öù¢ 	õÉ	¢à©"6ÔÈËTÉíºÈðÆ?r¡ø²ûQbÅD(ñÖ±ñ©ÔóÓW®Ð'ïµB$¢VV2Orº·æÅ¡m=MÜäuÛV.=@8Ö=@à{0õ8ûÙ\`*/vIÄûÈL²h&®1·ò}eÞB ë÷:<\\aÅÎÞR(þù³Çh¸u\\ëDß.±ÝA³®Ñ{X"¥!nÁ>ÎMöÍçí2Ò&t­ñ;MperµQm±ñÕÒüeF¦¾K°ëü@_q¬/Í HhÀFU@ai±ÁËVO=MWPöP°DèA^-ðe¥é&÷ÿ¥PF(nÄì;¨Vþb WååRì,.m'½¿¨Ø]=MbØ÷jkí¯uµi(ÚLÈÃEX¿<;|4ÎHÚgÎyÌ±ÞzÐ¦'=@b÷>2=MüY¥ò³ppLq¾Ó1Ë­~pB*¬¦ûæ<C»?íÃÍZ:K" Z,P>Ï¯Øöâe\`@vb)uF&¥ekòZÙz"kÐÂÈeSçi©wä^î|âU·tpZ?Áä°b4|ÐÃ{iôG41où\`Ù÷¦»oË½Çy¤=@q÷ÌÕgø´'WOãD4HLÅlZ1« í@%_È}pxiÖfñ­ Æï$d¸­Ô÷DNrQ¡Z½RHÅèT\`ÓT\`4ÙFmH=J[ïýlH¾=M´Ù@p©A?ï@nì7uÓ,¾ÛRôd>àrRrÿt3?¼[u~=@çþ,ÚJÄ¬~15(2\`»gyem=@ôt~eÊPûÖ¬±¦ïðò#h.0ùÃhD\\ÍüZqQêCw*±o"d±/£¥µsÙZ­¼í Á8ç8GPì!c¶s¾:½øêcþF|ç~Ú¤è9ÕÂä]8eKF ÜbF,«bF_-Ã°t"6ñ3¹¾2gi¼ùÐ"ûRÈÇ7[9MòBÎbzº»-ôkÈjjðãï¦L¸ö± cA³ùh.wÁõFE\\FÙ.¾_få=MgMV$¸7@¡ñ¿òÌ¢ óÌk¨ * &óÈ?§¼ÙÔ&\`ôÙ¤#íäL¥Ò5ùÈ"VÜã·í»g±·{þµi=}«³ùn&ÃW#UÒ¹°ùÀiÀgÕ*9øÈk±ê²Ôlê£«òÍWf$ªc¹°>Ù°¡¡ðjÔ¹¼EHÏr´ÒÞòÖõ¨EÝ=@ý;ÇSýjÅÍd»¸ö5\\}ªîê=J÷@ã=@R{ö·Ô65nÖ\`xË5Vß²BøºýïÅ&ì¥]Æ)f6pQãÀûÿ2÷­:õä×æ5÷á4ö¤aT¿wE?¢=@=JtããOnrÿÂÆPxÙQL¤ì5{¡}Ww=Mq>èR2´0ðÞ¯ñÈçUëwØj¬NC=Müïg\`=M­Z{=MwûÞh90·ÓáÎ­¯Ûå"É=MôÂ¦°!vB!{Ýæ³biÁkîmÑ·õÄ¼yà)\\©8fvªåz&±£½·a®|\`yM(63{ïbÖÃëäYÁûX²|Ç~îÅ½»Ù²ßQ«IÑ´Úq§¿ò®DaÁ_½×æ?Y%IZ«^ O_çÞ±udÍ%ü=}ì?NüëÿíHéZ+Ml¨Ív§ÙÝCGÙu×¶vMv²xjöW[S10E¾æ¼#órÝJ@¸V¢}f°>d÷±C_.8fCøhäïÆ¸ëE,iRQl¤q¥ª-ËÓ´ð(í¨	ªñÂ"Ì=@5Àc=@µI6AÙAnÃ×"B(Own28´'ÆÂßðñ°fÞ/éÐ2ÿEtÒ$ua9Þð<®ÌÑÇNõ¢P­±¯ÀEÃ[å>4o;)¸Úù+ßÌJþkndßÚê®ÀÀJÉ@±§GdÂ§§¡7	)ä+3î¸±<£ý·E¿D?k\`ñ	o]û]NñDôÖÊ#oMAÊ£qPZ¿Üt'éPÕ 2ù/öL½±%¾®$< E\\Ã¡¾f/=@ü²LçX\`ò| ¸hEKïP/cbdêu7ô´À=M=}Z;9ÇHuüßÞÿ¼/ÊåiÞÚ6TÖÅ+=J9 >§Éy\\ð·ôÇ}ÞIÅ¨ý¥Ð=M,zd|g@<ïæ	ÚÐkaòb÷TÛEU;Å=@=Mïëúxy=JeSìsvåeëtos¹ÐRàz_/ÓD®Ð_k½pö§6;%=}ªZ¢!ÿµéåêÍ¨F/D	ÔºNø8uRÁX?	Ã\\¶ÙyÙSìFA£ÆòÕoØE*9ª\`Y?ñ@ÆÜ3#>ç±U®ZëËáæ*×ßáã]^ÙqHN,ëVBDß¦á=}j8dOuyQVò	Ó@ ¤×®gpfyhsàe¤;H+@}Ë¥òÓ)¤Ì	PY 5ÂÄcýA©=@fsNsJï>i"vKºàËJASäçhÐä)6É#vfãÃ}î,K@g<M2Ü÷w¯k\`ïu¬O;H(<á>OÇ.ÔîKì 88y.íA¿\\n»HH¬èxNkíuF²gë|PÙø4ûl(,¿¸X÷w=}5¹£ªß¥QõîìÝ3g¸=MçÁóRåW=M¼£\`¥=M\`WÙQºCaoÂµ$n7ù÷ÞSðÃ{8}Fªµo>ÝbÎIá·Yv}Àf%»¬oØQ'IäE&YññßñI:.q&ÉFº¦£LåÁ;qBå½§×3/ÓâWîª±¢CdÏVXoPòé?v~å´ìKM*ìòÇA´ÂµD 739ÉÊ×¯7g.ËÍ8!¼úGI2pðrð=M3c¥à]µó2=}Üî®G4ìZ$×ú¨0*ëN1â9ì\\6w¤F±¼§âUÄ,}ÌªDE,÷öAùHÝ;¹98ËfÒx²´kmß£áoØÙGl1&Ír,7@D@¿dÙæwË)Øqìý 5ùxa_´^ÍJ±p0jÚÓ>|éØ.Ýª£~\`F9=@­QôT«'¿ÝÎûþVc¹óK,K·=MÀox<¸³¹ì>wáq&nFXçÅìÉF|$l»ÔÈ| E7nÂ!Kìñì6®VaìÇE}pñ*ÐÓÕ¿++³M«ÁÇ¬@²µúgÛ(ÞûüÕûZInk6O×aË®Iä\`E·æ èÕJ	ûJR*ys¹LFn\`ç%ègq&)ë)!Yy)ý)Êóhw¯Ê´ÏòÔ®y©Q%öW"¬RX¦#¶Ïp-»­Ñ©nyÕ¢¿=M¿f«±Loô´Ì;ô(6>8Yå \`Ït²dý8Ô=M¾&+A«|¼ì³¦ô=JCß}Qê¼òvðsxÏSõ}[zÕv8+<lÛNzºAøÌÀ§uJ<þ=}uËÇî¦Wn+xb7ãD½,[(Ñ¤{+£ÎÞªmPt;² ï×¢X-yÆàW~N*{¥ïì1ï)Ï^ï±Unë¼ÛxÖÿLÿ}kµ)³wr/!s(çOóda)vmæÍ|¦É±ëÔ&2øï!)Lû	.ú)á©%òdÎs}1AUn8ÜñZ¿Ún\`_uZ2ÓvgPà@	gJSý®åZÂâT^I1ºíþw´+Õeù!ÌyÈ¾²¤qÆÖ{:ôÌÄL¬ÌÒV}ê=JJÔ/U+ë02RªÒså;r{nÏt5JGïÔ¾X«J»Ú4ö/ÐXkÄ=@úkNÍ(Zð½¬k<àzSÅðÏ£ùÚæ:@Õ64ÕEÊÿ³Ð¼såkËûÜQ#°Ô|¿]*É8y>ìíÜ·?°d(²Þt¡}anÇhO©õ52¢ÃÃ<	o|UM{7á1üwE¹Ñø¬Q N0ËÈ¦lÍ®,¿T"ÔWã"·}@;ÎØUï)Óö«%$)	:¶P²©¨ÃCÃ°s¹d)àÀàÙ_6ÀYqd2Ñ´ÐU°OÈSÍÔñ½¿rz®Oí]óÇâ¤µÇÔT4ûè!Îu·±r/Ø¯ê¬ôjßõ=M~tßëhkûBPÏ³ë/â´5s¨Rï	¥Ä=}MRQ.Û@EÐ	ôÑ¦Vj)0DS÷G4EsÀü yÒw$þ¤¶ôV±Ü3ö»V¨*¨Àì\\³hx4Ï3zÌ=}ÇõiÝã1´PÊ°*yúwOg6S;¬Þ/ÎÝa=J;FÚ¶(tF|ÀÓ]t%ª ÛªÃ¡£}/ü³ÿÁÒÄ¸¦û\\ÔïÆÀ­K{¾d¾@Jµ^9bú"X»õìqåd\\òjÛÄar\`\\gSÛëéÇÐ_<-Ù/c\`m=@D*²I:y@G8óÌ3J[uÒAVk1ÑµKÌ¬¼w=}Ì>t¼4uÓ¸²3cNC4ÀúRêÆNSw¶ÙívWµ|æ)éPÀÅn¼³)=}­(8Å2>N,­],ª;/nÿ]VnAzÀJ9zaRa9~¹%xx2Y;Þ$r(\\&ÆÎYqì+Àdé÷xK<CSªÙ¶#S=JúÒmWfG¾>sÙê1XÝ5üJCýv,÷üm9³ßý{Ä®»{{'Y?\\6®¿±ú¨;+ufÝÐJ»Cõü(5lú¯Ë:TCDAC)|g¾ÊÐ§âN²¹rr½.CXïÃtÍ8l_þ7¨¾¬õEÈÑ#OÖÚE°¢{é:=}ãõCÓE'QØwè>­2ÞÓ[«ÑQ¼ßmµrû×XßÇ¼ø?N\\ø®¡8dÂIÀLÍÊ1fÕB ¾MX¿4øb[QOVìyì6¥lHcàî¿(iõ÷{^çyRëRíªM®ú=Mu[Ô6Í#nÇ2|¹rÄ¤~ÌÿN=}Ý6ËÄñc.½(Êy«d¡BS¿ðu^lIËÞ²çr?Èº=@þ®æ{ÙI3y·RR2´¨<aïFô¾ò¢è¹ñè·;ÇÝ^¦¤QAÉÊm_vô}ÂX,t8Wô¿ÖÆ+´ÉjÑ¦oøD6d=}(à?FêÀµöÈn2GsÖòµoÆ£PMê FìÿïPN&§ ý"M¯ñªmNÁ)ãL/ñ"ã£VVYô,ûkêßB#ÚÃ³7D6ÀÙ*1WÏ¾TDÅ6nDÛ?m&¬4éÆÉ5ì¯ùW3Óóz[¼a{p¿®v©jZPâ [ÖÈ·MdAvw=}pÚP4=JÂHÀ¼Àìu¥ÚkÿÚ³b4øï}÷§÷DÅÝ±^ôKr-MºTqÓta×  sÿ4:Íøô<) sÐââÔ£ßWÍpôMw¸à¡âÔx/ÅÐHxIn¦m]ìêzCC\`ìçÑÎ·¤_V5}máú=}ßöFO¬jü{WPS*2.ã«aÎYÔ½O|]ÎN° ®õEÝb MHFvLùýs°Ö#}=}Qó&ÆOÙé¢±ûP¯îYËGÃG¯ªÄhQSÓìór¡¤b²©^)ç][½H¦³­>L0·´¾*sä£@n¢\`^	§iÇØHÏAÞ7A.¸Æ7¯6'ßù» X0®ÍÜ¹H'AéÒÚ¸8Ê{±TfuÅQ¥ø&åí5bÒïX¨øçwa¡wãiäSø#?©m± cGdþÜéÓú²#íêÚ·;#VMaìaììãE£°M&÷p¢KÆé;h%à(=}ÜìÝCÄ°øAìËPX>¾ÿ²;LWìt? Ã\`¾>qÂ´³úXØ¯FD¨T;dlþî¤©SôV¢ï%ü¬)àü)å[øÕ¿¤ÓÎ"%sÏt§¡qé¡®ÿ_åU'8ÅOdå¨Pæ¸£=@Ú7=}ìÐoF¿ù|¼åyp~ÿkNVI7I:äå©¼NE¦ßÝ¦ré!°é;¢èL,+Sê3É¯dDvÀÈ¼)ÇlëAs=@ÎF«(#£ÏÓT/·5ò>d\\y¨è%e =M£Ó3Xj¿ëgÏ~ÀJÑÎÑþ¨úù1ò5Ìãgà®zITú@9¼ZÕED ê2=}p01<àÞûWý+\`qÂ5Ë@TæbêOY7=JjÚ¼S¤J4²´s$ý¤IêKÅ.@Âº6-màí\\1Ñ¼{ê!ºv\`sÓÒV°Mx®¿öv^ðYtÀÇ>ïÜâ\\Ç¿<ÑÆZA_öÔÁï²´¯ßö>ò½êe9¶5ºÇÅ<eoÜÍ^p"Ç%¸,ß2AH'q9&zðX/Ñ¢ÛÇ×°,¹=}ÈÆ9â@¤ÑùUòî»ßºhdòØÎÖXc~´£OErF[KXI<c:¦o9bÊêÛaoéúõ1-ÞÁ=JHör!îgå/åýäöBïeYÇ=@æÝðGo=M6ÌD'R}çþ9çg5¬M·AWËæ9'÷¡zõËy*úì W¤kS¬7ü hØöïw]¿æLºZ*¢ÿºcW6-öÎ*üQ!,æhÆôiUý5ET¯¿GY=Jû;£²=Mzì5 iEÄã©+9¾{Ìõi%=}çH3ñ"ÑìêÇ:|Û°TÉ4ù¨aaÜ=M«>Ãùg^!º5\\ú;ïIó|X:oðòpøbò²pJ¸³w°® P·NXÒ®¥ºkíPÒ¡¶l´Z¸ªâÓ¨ÒØûIoÞ²èhø!rëø¸+Ò.eLø¦ë+U°õ£>~@êYÅ²þÄÊ;Æ¾mWæ7ÀÎT?ë@SPìË÷39ac=J·=MóZ×èêÇ§6´¶µk¡6HXA­ÚBzé¾µK1æ§tÑÆñÿêCuK©8*Jþè¨¢xÊY®ì¬Põ#Ýf65ã=}ÉGh©³3 :§¨È¬YÛÖR2/ê­úÊÊéû´c²EáØßG]góø,õ§ÎßêB§KLýÁÅ1eßéÚû¸óepÁ2T»ÆwÔ*kh0½Ã{ØÛç¹CGMÉG.Í>¥ßÀîÊH«)S»g27ôpö/Õ £bßùÔ¥°Ge¨a·úâ@SøXªôXAýFHÍgblà=J\`ÑöÙ{GÏùëÐtJDWå=J.ë@r1& ÒÏÜÕ¯ãgç}äS#ááeîtàÀh¸geö64@¹\\ÇW0N#Ý^Z°ÎÎÈÍ%ß÷¥Ç}ßFçÉ³Àå´¬=JÑ:Öø=}º)V¡àþ7l|tW×f B [N5­é}­$ø1cIQ5ÂïîXmàaätBqòB\`/µn^ºR©aÇ¡¹ähRVyxÂ2R¢èø t§È#su×gBÄîîI'_È¾×HÅÛü[|¯æ:b<²_ïþht;¨v%&N Ñ¸¢þÌÒ|ÍaÉ=}foo^Þ­OàpüÁ3íaJî"+U©%jÓØïq´ÞÁõv#9TJ·»b~]Àæ®Ê´Í«±´¾ï3"Ñ"x&³5F%ÈÜPR=MU°A¼CÛ,;Ü(ËÎ Í¿Ù§n8£t$æqÐ£;=@´#ãNíxbÊGfSÍòé¸9\\¸$mRy#y´g¢¬á¬NS»A|&iÛ¹¯S\\Çö¤H$\`ÙD=MGÁ?|¨=@½tòy7³µ?ù&17z£Ö3|@vÃ²PµÁVeý]uRÅ$ØkýLhÜmR%%ÊìÀ£â~"Xâñ¬ãòòê=Jèó½ÂsóQyMµäç èvÓ<>(_+ÏÁoøIí$Np7d75æS/ì*Ñhà­vh°ütÜJ!mg®ÙAæMÎá®Ì.|ä#qèù.úÁö6£?üLAöTx|ôQþíìñÕ¥mºÚçdIC|àò§cëgÑSÁ7ß=}ìi(Wyo%ö¤hf!\`c	{BÐ#pnDÏWâ±mzrHÞIM'mJQb¡+bÐº¬FWW·¬tæ¼^{Úøè®÷Ò»=}Z¿É{&F°Ú-£%hU¼-/>_<(	ÕëN-¹¶³eq HÈÙ'}EÅÕ÷rÓ§Ý×à[^EÒ£Ù\`R\\»øOtmæn	Ü~Véã¶4~6Û{ÁX~ÉBécC*ÝÖX%XðUÛ¾¦ã³WfòÜ¹¶èwZYmm¾ii|þsÝßDXðsªä[O´PSÜND»8ë,ÓÊyÝ¤¼TWY1})¶·\\ÑR¯B£j8õ¼ÉÝÅ RWÅà-~Ôäã\\2÷Æ ûaôËc\`uü=M£7Dtß8ªñÚqG-r¯3~¯q5Íé\\_6«ËöÈ8rÚN¹VãpJu\\=}ïQa?8R­ök'S{8¶ ÓØn¤ïPÌCK{Oþ¾cZE>àU±ÎI£wK¤Í^0zH~ëhÛC¤hºRWCë=@\\Â»4¬i<¨NkæÃÞ¿KGá¶V4ÚÄq+µdaû<p	"¹>wÄ°ÒÏ$½ña×u:Zi[ â8u^u½Ö¥ÀìgÞhÜ(Jr9Z&9²\\G¨t+µ¶=}ç#NlrvÓ³Æïo@ü!$Êÿ8mÌzä31òú¡?áô»÷èüí.Îo¶:Étf^ê=Mp²»[Yô$¢3T,b6ÀyôÜÛìåÑâè7ìå87ó´â9%¬¨A=JÏðkhùóæx¸¼Í²Øá÷hÅú4Æ@i,_Ð1/ûD"ªRÉÓ Âït6ä§LF±ÍöÄ§ðkJìï,jm|5ýDÉDÐiTÑ@§åÜ¡é¬03ÑßÚîAr²KÆ@tó0Z¨Õ2ª8t\\ò24ø1¾¿éã§pV×Q"¢¹*9G =JÁºuEñ|ÍØc"DBÝ×æ¦B#ìg-Ì¨ÚÄò}2=J yóFñím­þÖ$âNíýJùh#O¾£*<{óÊHl=MÏÕûÑ-tï#àý@,Æ~¢¾±6Ctì[Ä"¨¨OY¾¨!fô!Eï¯#4Õ?WOª3!ÙûÍ%¦°ämÝ·?ÀD#û.U{»wÔ¯|V²së&E8º0°ÛÂà%oÐP{>Tã^Vó*ôc=}a	U¦à«OéÉ[7Ôö­pÑqtµCð²­Ö$z[È@·­$tâ6¬H"ÊÏìÅñëÉ1W9p!yÐ\\zh$¨:Jò¦¯Y2«lxìcðÏm¾ö:ÄÀMlAÈ£t×¾£KÞp£wËÚ©Ú}+/»°òW?¡ÌÀÚóó´Ò»võ7L¿Ð6Uú7¾ÛÕ#KäR! \\\`Å§99!´ñ¿»þG"uØÜ	âË«öSlC&èLq?o=J£xßÖ8sè7BsøGÞ¹4R0jZ´3fÊyEÓ:ûtºQ.À-¦ ìh_,bnú6Ãb' Y¬réÊîGhéI7O6½m®c4C<UL¸Z¹fUrüRçe\`QLJ³	ÜÞkïü=J1Î­:j§Ci*ü2(?¤Ü2ïË3÷X£ÿ³ëTù1LösH=MMcÎ"eçN">ÄL	X=JÕ>ßíSO=MUÅÀKúfÔpòéº¯Ú¥Ò½+ Ëø\\9êBÑL¯¦kÝn«C3ùàeº'½»¶_1®ØN·to1È¼ýÝ¦áöhëOÓÞ?í$=MÇòr088äbSÅ7Õj\`]¡^¸$r¬Áp>ÔhÐp?=JÊªMÌø	ÓºcRD]O#	ì-côóJK{m8í³Âõ7ÕËK­­×m>O@PNÒ¢ßv=J_SØ-¥¡¥@RVà®¢ÄâËÐJsçð,båE(´à©o°¯Iì-Ê´ÿL½+nNÌk^ëfÌeÓuyäÈ< ¡XëBp}W«6ô j:Ï4l!¼ßóèÃL+¦º:b¦p<a=Js¡L¸òQ}CË2Gï<Gü"¼õEh~=J!°Gíý.Ï®>Ú,Â×íí±mÎÑ°fapeó"ÓÌZÍR½jÌé1ìµ¾º>áeÚvtÔ¸ª±mY=M[Ô·Ã&	3#?^ï¹shÏ;»¯ð|¨4ñ%é	ßâ ¾y°L·­÷á§@ê0¹ÌõÙ¿·ÅBLâ\`ÐV=J;¨ªX+ ?Àïàkº¡7Ty<døL$GÅ¨­FF=JøH76ÅP¬wYã·¶õ95õ°âê*44¬§¬	$îÞ&ú@·Rõ[õõïÑ{áô/®è*}eêXÛ×­ s©ÎMTóúÙª§|Ùu ÈC_ÏÛµujäß°ãïI¥Å¹ÿÛIÚ1Ä-ú'¨ù×ÕÄÂ·×«ûùx½FWz+cë6=MIq4DUIôfðiF4¤ÊÄM£eâ3ëzfe2¸q!\\õ¥@CÇÏóGèÑì"ofbè< ùNÕÙCôRiam;J	Ï£-rÞSiå¾i¸r4#dë7ÞE«]ÍzGà¹N£ÐPPQÉnªCIÁû;&ÜFéò(ì·mt[ËÙ¿êÏÅï9Z¡ÚdØJ¬n>ôá\\ÿL=J±¿kntÕ«ùQ®Ýur©ùrÚ7%µT&%\\¶<«êj9(;ÖÛ»u=M´:=M>3âIø²F¿í ¨|ÔÐ9ñ Ôð=M¶ª¼b²Á|måno+©xàÉbæb	Ï»Æõ·§®&H\\#´ßy UªD¯<Îö±ê°KÍ_3d\\ÄcöU=}Ûè«2gjËRoûMWÔüÉä;òÎ?¢Ð¿na<+n4îÝ¼ëûqÂÍÞZÒ{âËf±Þæ^b2Ub\\ÒB7lC<¢ÓÅ o0'(ß¦ü×½¶MÃË{æP»òf[¦õ¢Î¨¢U1±@bÓ&À#úFl®_}ÎQmN	\\²dÆ	sZf²f*êü|ÉôA¿²hFc³àLxacIÞy>.CvFyl²Ív;½°'6L2ékVoÝßõQ\\°ó§nl&TOr¥LE÷Z4+;K½Åñà&"rÒ=JbÒÊPàîüU=}æLºuðbç9ÃãÎ¤pÅ¾l½èá°@Þ"ßÄ¦l%b½2þx5uÊ~bFBD&Ø¶\`hîmÂQ­ZIh·>»ì×0ëM_ulwOÀÈpî´Ó;CÞjúKðpmÑ=M40¼í[3=@4	d¿å(=}ÈK¢É¾Qßc2'bR7ôÆÚl,Ôn?ÚÂµÑS}Ùÿe	ë¼ä.¤K¬Zõ5¤â¯ù;»×U)²NlE71¿û"ùäÔ¿Éÿÿ65ºm¹DFc½Vïßh´RVùþË9ÜÚå®|AæiZ±¤_&'Þ\\¯4Ã³^öio8RDo?HþªÁyÑ_Ç±yyÊs8AQ§BÆoÛàÜ·JÎåû8·[£%×4>"Õ¸ =JÅH¥*þ?¾þé6É7½Ï/UþÖî\\Ô	gó÷ BY'C#~í{=M° Öð]¿\`¡ãpÓM\`²Gî§§VCåÆyR.úÁ=}É2ðoÍrÍ´î'n	þ=@Ú¯'õq¶pÅ±ì+PvwkM/¶hó ÊèªôceE¶=JI©b³mÁ¤VØõXù¿?î!Ðõ³WI¨ß\`Ö3íPlãç¿zåávSHôç­Êz­VÆUæ=}OÃàÞêêwµy«ÃèDBÙÉ/ÏÉõ¦ÇxówEÜ&¯§\`2AÞÙ¥Eñ®ùØ¥×áõùi$ÓQáG#ÆrTø¡¢µð¤®Í&ÔgúkeÌ'aéÊ¤¸}CÓíZ¦ê-.Ißà8ºäéÃÉÅhf1^ Ûc%¾ÃH2 [¶ë¸LÂõ{M¨Ó\\Zÿz^eCkVø=@±y÷Ò=}k´âzÌËO%;%øÁûfïÜíùÄ#OÐ?ëË²Ç÷¡ý¬{É$Ïa=}æwn5§ËÉ=J÷ÛÜåaµæeÏÚ¾)r4eÖ-ÔpºÕ²XÁS%5+=@<äâ9óýVC[u®ÒvXôt1øHÞ&í+=}¿ô1^ÏR±½¯QU$ràþXP°Ç¼ü:äQ¬<R\`­¼ÝUÿ¥D½ó¯½=}£@ÅúáE;#Vv{g³>f}ÖÆöÜ^%Åµ¨EÇ!w®³o¼ËwßÝ¦(U=J-mÇÆ»Y±ÃÕðE(ûÂób­Îr=ME#Ç8k¿tÆ¶U§þÇ\\BÛqòÄ¨sJµÁÆaÂUõÖ/á_Aó¿¥ùôGÙ&en»ÁÆo&=@:Ü	%1GìciYÇeÕcÀé=Mõ"FIY&G{ù¯Ú¨ #O2%ÅÚéñ	ø(Pþ£áCm@þ(¼[r(PóMÀÅçSG8,»ÌÑ'uX£wlnã*[¬w¦íqÉA?ç Ysø¹Ëu}§zÔr§t\`¤uâ&fÚè;ÓYÒÁÓÚÛÕBt ­é0=@£Ì¯yód#Â©ìh$WRê¨s2'Ów÷öµY¿)<Åß±äJöo>y ²ªÚ§«ãv=J-l((V2)òXEF7Óýz{4ºS'=J~âµÂ ¨Èü­Í3frV|&½Ìó¢1À;©¬éúçø'ÐmTb~FêãÚD6b¶ýbY6ümÕþ¬óvÛ¿ÞäM*«<Ï=J¢Ñî ÃÏªÙ0U»®yU!§}õS¬®iSÖCàC°wSÇ¯£½Iuê­>Èaþ²ÀèTÊ³¨^f«T¯X$Ì®yô£&ie<Í¢öÁ¯nJþ¨e*At:h=MJÂÌ×7Bø	8­¼Ù«åñð]ôÌ_èAx(ERÐX÷·=@¶ö«¦iÎÄå+p-Áöº2¬#cõgAÂ¨k¿Aî½x±×áÖKcËXÖç@/×Y¸<&_=Jo.¡p9×Ç)äÔùÈ4Æ<¨¼±ÒûÇíjÛÒù,Z¶ô¥®ìToºÛ§­µ¬R RH>º×úÌ±gZØ?&·mTëR\\Ï,75&Ô.µÙªTÔüMÖ³/·µ¡?ãjûT}µÛ	hõDÛ	ßA[áÀÎñ¨}þéî¨SÛ	pH%Ç<%÷Éé3?ÙUé?üÛ	È¯âb*ÍFÂ÷Û	¹' bæBí+\`ê@ú;ijút#A¬µÉ'»¦>>Ö±C¿¡_Õ$rU«nhæ6sg~s};i°í8¬6+,,ßsÂß­è³ ×â#A=@lïåÏà­û4£ðö÷ù?VÇzÕ"Ï¾Ûq@_§¼-m3:2Õ!*ÅQP-Ú+=@¥> ³-1)áÒÐp=}ú¾4Ý!CRñhÍ_dÆ;Q>W²VDa.=@<Q<L#2ÆÊÒ=Mn{b»ª=}&7+NmÆúBEx>±ÚñþI=@µ¹ô1êÁSáÄ)© eV´ÎEÈK7m0/nN²+M{ZÆ:]Ê<0þ_Ù»__Þäî÷c×ØcÆM	~aòùçù§é(ö¡ïÔxÇÂlçÏà²|qåãÈg¸äÌ÷eâê;~Õ(ÙãbòÿOí$ë w^Uv¸2àE±¬SN)s­8EoQ_z^´øí.w*³*~1V]_A8"<=}x	XFª^Xpõ+¤¹:íP7MH'LÏ?vJì²¼ñ;Èú¾=Mq;Xyºos÷²pûH5ÃÄ¹H7sáÂ¶):U¼	ªXämxç9­@1òjÎ ò´8VM+ìÉ³Á·ÎöO»Á*ô¶3RòLKTôèy[ºð§ÜÀ>Ô­2JT­3Ú gZzõ«R²ªL/;ÑoæW\`3!68Ä[äè@FÅ>hÛê¬zþ?~LÉJ©"×M=Mû»ÛólÅAÛ()eëtpzªÍµì~BÞúFã«n,U;½<K^CM?Ån&QðP\`>MîL5Fà²±M®I­­-61K­=@|Û¼8·l@}fT´4¦anº@TêíëJTì2±¯ÁF]§ê{mA.æeª»DV.´Kblâª:Q {½0ÿZlbFà·@ÌD¤GOÄÏ.]´å«4Fé÷ý; µ:w¼ÇÝbú5C2>¾Æsi® äâ)næ?Ì±ÊSð¤l;8öiÄ©K®Æã:×¢Ãï®+izÝ=JðÍùJ$¥@gYLéklIÊK³?|²<sV\`ð×ÎJdµy:Èì6é±RêÄ»ÔªÜ×÷Óo-ÝIW,è(¢+Å4¯Ù{Ò<ALµ;¡T(\\µ}-ü@àûIuÕü2IïD¾5_D³°=}pÖÞlýã^¶óÄ0L/$ê®QûÌJyÜ-÷5j÷È%©ð	k¸>ô.§%6îÿZN­{Ånn4üd¾LF2lÈXÎÒúð·5ô®4· ÿÙâH¥ÊîÐ»å ]¨<8ªï,lFt´ðºÑ³]^_fÚÆ×jó¶t½í=MÏ(ÁqÍÔÇà1wLyÌ­Q»Ö3,¢gil4»äIÃ*.2<uFz®lf*öW9W4$W41ÃÆ2fÏ	ÎÏu\`ãk£¹¤¸E1¤¹¯ÍëéãfÛ=}Ñ°LA¯0(û m²ãpÛfòûçÜcnör{r.UóV[]ÀJÌÊÎëBF­@Ø¬ªÅì	¾J{§Ì50¦^±êBöç².DN7?ä&J»kX¾Ê_²Fíi¡gª6\\V¤jjÍ:À¼Æ,ã=}[/Áþ*=MgâË:@)KnáØ0qÕ·Ð<,/g­*óÉ¼¼,@þK/Å'õN^b®½©;K2áo©!ð2¾B[úÀ01Hª¯Ý>õju|J´rÌL=Jz<¹+ÏMF;®Ë°/¨m38VLâÏâ@dº4·¹;ÂÀ\\2o{ÊS0ÄI»¡6ÒM=@¨#¹ f=}{¤¶køÎg4í¸)Ó¯ËínXÜÙ[Í¨Oø3úC­bÝoÑîYÉCúJ¯->roËF]Gù</=}Ã§ÊÎçüð×²R½È½Hö¹*Èë#À¸,æÑ³l­çÑ©[§pzq|ßñi®"2®5IARBÍ!'újÉ¤ =MO§ä esB3µÉgwÅL%ÁCà)IÔwJ§$×éyiÝ	ÉÈÁú]öi/ü¶½­vÎ·e¼d(TÌ®®H]ê=}Y$-OÂM:P®ñéníï=@«¾º²ìÐõ"0®ÃA»¥Zª¦kf|1iºÏ;è:^iÿ´À'k4/paòsIna=JEØÀHøðW4ºqËFnÊTc½ð<ûlâ²ëóë³fHÞ.îµQKc×xí>lDéj].Ïª~âWL/L>­(«,Aß¨N»LVªpl]d@#¶°nxÀû6ÊçÑïXQÉn8¬w¨ÊkáËoµyFe:4´LÄ%1CÓ{) roj0nÇÌ:ß4(O4±?1Ô²õ1M·H¹ÿv|È³[í²@3LúbLðÐCwM ú¹Ðc2]-ËOaê7Òsÿ±~Í^µQÞlËB$õl«0á¦ì3E2W"¨´MoB¿®Íºw¶Hû-Þæ¼5W|Ö½=M¯ ¶¢Ç \\p\`w$E¾Iï;ã²=}D>T®§JR0cX0å]£þ³ðà5÷§;¶~6KvZ|º¾=}Ã­ãvM²ü½jMÚÎ×{Á1º9©zzàfj½0^O:|mªaKJ¢7Û0ãT¦Ð*á"Ïï-àâµ"Þä±D;²svQd²A¾Yaü³âæ®1e[À¾O:1AúÃIä{«8Söe2û/¬ÑpÊ^]øêQÂ=}}'1N{åjåEkü)1ÒÄx¼zQxòxÊm½3n.ÖlKzF<6Õ{³3ÕâÂ³C:{zÁ"GkÆí	ªnæÑûô7ýztïeÜñõà-3BPõ½a\`?êsÑä2òq{®g´âEÆ!Y¯º3lü"aÝæ)ß>zSzf¿:u6ºBvò­²:Ý0»1oJÑ*Ø^-}4óÏH'gI(OÜ³b(îé@=@5=JÀªpÛCëXòèwû$(íoÖkª]q±¡Âû=@9 n C=@ÎÇî¿ö=J²Æ9¹ÒÒ;ÿrÄaS¢5ûÎ§ªyÜ³vÍã[ÿf2}nÆ¨ÂsEé.DüqxjþÚ2²wRtþ²Ý5a²xó6ÛÙJáÆÒ°°E3Êh:8@Ñ¨ú¥BXÄÁ8ç8Ýø?¼öã¬c¯E*Ã@f«¸nDéUOÌmî]:}ó@kÆD«¶ßÑÔÝÕÜwAkÔ/­Ômé²µkF¢µ-Ëøà}ðDw9Û»îâyóÆê,^Ù\`¼äíM÷ã8ÆÆÐ1åùJ$¶^ó<á¨bÅXæîÏ½Q$ì7dºb¹"Pù>¾ì¡âÒtÊ1³-ýï89AwâuMPßJEÞÅöïkéÓe,/ës4	XÇE¤ò÷(azböz®äZ²}5z<(ìîf4s¤P³ÿHüY'Â,Ö\\ið¾H]z±©E}´²Ã¥ö¾¼=Möm6Hç»õjZp68=JÊ9¸»M¥¤bÜM¤ß=@e~l¨÷Ç{ãUä'a°®­õÜJ´oT±ó;:~Zý²½·bx<¬SsÀÊp-¥!s¿îýïâ]¼Ø7ÄÀnÜñS¢ÊãcSçõ^ëµü¡6fánçyÖÀZáª¦Àí9õÔq¬9£=J+¶W3õªü^.NM£â2:GÙ²qÓ/ºWÑ=JªjF(W±j\`ÅÕ½=@Ç'=MâQ8á>±è)wI¢Üß´;îi[¨®t"ÿJÚPÌD%q7êé´Û®lÁ»\\/ºr¡ïvðnàÀÙ\\ÇÿëÑ¬A·tÀvÂä°/;¹6Î,[Y8	· 0ÝÿP¯Æ²hÂòu ´tæ*È=M1ÙóðÎ]1®k'X$QÊÜ,ÊT8ã ¦idØ²ä³áZ7­ëÜp@v!Ô=JN*JYA²±ðÖíãïOOTFbµ0.:Wª*ÌîeÈInBmh­æ²t4-í°ÒÎ\`ú"IPKî6;h];h®°C«Tî´fBuL	=JÅE£zckó(qzÌç\\¬5ú¬Ü£{®{,wÎÝIVfÅ4ø{1På¤¢CâîsÇîÛ9E=}2­2´Ð½=@ßk.Q=@z­J!ê®ZQÐNeÐúô¿ûR?BAOQ««å\\B]F,D³>6uÕ©2ãöKîpMÉh¨L÷äj>ö{4²ë*Ë~@O¹Ìi½¬Çï6dNo{©.*çSo½?&u¿îÚÎTë#mé©~sö4.³P	³~¹T{¢ gÄÄ»{=@){U?#©Õ=@Æö)ÍDÖ_nøI©{ÌíG@x6^ÂÆÄDg,é+ÜÊµß	hd´ûì¼5Ì(uÔD¿F?b\`1ÜkM ý6öÀ;+ÍÓ]Ù[êÖÆL¬!<KÂÝn5è²0\\Wx**_ËßÓÝ®yëOÄ=J¤3f10e=JÁ ò4Ôèè³sdrHwq?o®,Ç(G®Låt|>÷|kï»òr5Xt[(3í¼ÏEZn¹Y8.â:l´1l'NÐÃB½Ü<§»ãÕ{.ÛZyQ)Æh:%.:}R-«È­ê°à6­/8NÊ Û»ÞBóBÞ;a,Í=M1½îwHðA,lsÊ©³Þ_ðfì{kbK®ò7Ö;b3iþ¢¨.{Ï®èü.ú9¸ÒGêê+5Ó§G=}+3Ü­=@O¸Z/ç9^jÑb_PC+yÑÉ©rÇBøBî=}sG¨¼YñIÁÊ4[=J<þã9ÑÉì²ª^ú6D5-ÕénîÅcW6ÓjÆE*?j¤ÚÎ~ÍkóYË:­êT[1¹Ë}.[Åo¶@;U½âc+×Ùðäázk|5QaÁ·Ü5ã=@øÎ³T"¶N%N0ÏÑÄvæl÷£ÜHw*»×v¶ªbÄ1îKf+%á@­:ioÚlQ'5,g§nP«²òjéo8îÖ+wshÏk£4J ÿe«aàækéïÀw¸VÐ+Êoiob]Êc2O5d¯\`Ëíç:ÄÍÊÝøcwíy{[îÿúZÉy¢±]ú»mB«KvÍnßÅ;{ùuéßjNó>GËD/{ºRlUÆ3ÕYÄ;Ì²kÄþñT¶¨¿G~pÅdL_éàêrü¼CCã¹ýæÝmaÇèîSå,KëO}qvd6¥¼KâóàÆZ³zÐ=}wTlÇ¼@	Ì°2GÏ£ïï~mºÕJ=@RÎ{6*¥ÚÙÊCqÐÐD2ûÔ=Jn«,­.8YFKH:ÑËðÒðC\\/rAÑtq;>vÙB¯¬j«*8ÈoAd,ºÅ²ÍN4Kqi¦T:6EJ^·V×Ê$bfrÌ5É²ßsXÙk=Mûc>\\ö]ÃBºQ;oZÅRjòCo´¥#árøä,\\¶=}úi»WQÈ¹¦2nc:Í-©+¯)¾ùxõ±Mh(,»(SIÌ&{¸N$-¹ä)¾÷{õ\`¶(¢'\`î=}ÎFÂK¼a&\`AWE^Nê7#Nj8vMÂ{)Æ·ºMqI$=}ùæÞg9ö£(SWA$}ÉÝKlMj©ì(chWE>OëV%#ßW9¶A(S+W=}$=}ù=Jl­^ÊiÚÇ$ÑëJ»Í8'ÓkÀiLÅà\`¢­Åà) ÝjàEÔMÀOÆDòof,Ý½ÈÞ%Ïýþú¸ð)²D6)M²K&ù²K°i=M¯Bì)¶@2)]²K&ù{=Mém5ÖW)7n&¡{#émµ);W.ÚjãjÊï);fx=@Í/1ã'*Ãàâ{OgR\`Zë;ÇqîpÉÌLø«¨rz.AªJ20³mïÆÙi\\C:I\\CÆ([­­ÀëI]bCæ([­½ÀëI]âC)04vJYC¬zÎA6I-2ËcªÜ»<ß=}CÔ'0´zqª"¹CÞ6¿)[-£K=J%ñ6¸0Wzéõ=JÎR¹CÞ6o)[­hK),ýÚ°éo^&!Z7ÇH¯"/=MZo¶V<ðì0|l5J±vJ¶nª=JÎÀÌj½( À(8vöÅ¶ÜM»àJÝ.û7v"é¯5;K»,¼/tË°êtÊîYI&³=JëL^HR]wM¯ª½LS<oUQîr2q@dÅsínêÒ0§µ2=MúàÝÆü~À®©<Ë]-êË:×ÑßQâÎý4ìÝ½À°ÇøßGf!-ÁÞ<©A[¦çRØDwÎ¤=Jd*­=J¼g©5}S_Q^ø¦;ß¶râ$¦K|æ¨Ò«îPùjÒkzÛ$¯DF^|~Å]ö?7æ«;«"¯a:I]@WÌ26<TÐôzAH¿ÊÏF^>»éëÓP$­º²ï­J<L¹ÏVg»W¡OW±¢«.æl1ÿ<û9K=Jn¸j3´\`|Ös²]ôÃ	%D,ê·:Oñµo;|)ºyÖ|¾(#b;EÓÂçD¬@GF@¥×ÝgÉA®ËÂz©ô?*ªÊ:ï¸,6µE¤=J¢4øÑ·9¥²@é8¶°¥jöÊ£&=MIi)ü©¼)0â=JjVu.&$3aºÓBw"jËV1.Ãj[n/¸+8´M:isïY.Õ0të­*wÝ0ðëþ91Id&|´Wö½~ÙÜ­=M¼ðED{f=}¤ÀGºD<O¾V®\\¸Gëf« iâöJ2ò°É­¢ðN«[sùÝËÃ I{bSMî×,nëÜ>_­ýpjYr=J1ËÍKÌlµØç:ÝÉÍ8t>+(~pZQlrù/ýÂJ¢ÃÈ}ÚÿÙrCÖªa@=}Ì»I´sÍ¯(±4må9'§Jzr+Z=JÂDÚ§\`ìõ9Ò*d³l:yHâ9l~xØEÛ&VÚV?x-mÚÞ§«ÄµkT&T -L¹ØªcGr×Ë¸Æ_¹&²¢:ÎÅ»®õ3c9È«_I¶Â,<v*.¸¿@X|ï_ñé;jxE2(¼UãÊ>·7G=}ËÞö-ÆJ&Usú°:Ôô,±.nH9&;á*îºb»e;6*¦=JÌXõ+q;sn¿·k¥ô$Ý­ê°N×D­Ç¡7û=Jç½?iãþn1·ÎÞ+xe_>²k5|\`ö4àe,>)iþ¬ë¸È)=JÞ¹KçMà3sgbDÚÚðÍL·íîâ4½KëÑQúRbâqß¬Õ18e£=}üKJª6¯Þ{K±Fl:ª\`©ün-»pr6ZÞ=@úøsègÕkaz(4¸*Kø¹ºmÌØ¹YjÄòº¬.½Sõ;8%ÌÕ¸*;Üb_ÎÉÚ§Adm\\J3Jæò"CËÒOl³ìß8ó­Êè¾¦SºN×Ïµ4	óe2èù0ì!n©kó£onºVëi@<<±Òµmµ®¨Êg<LH¥i=@Bì[À½ñX¹_Ù¢#=MÛ áI¹khi úHÅÖ!áQÙ«=Jçwú$«¢5,,Næ'=MW7¼Úà|æOW>ÚSúBcé2øÅÍþ$mÀúÀi.ù½Üßçfa,rMê\\/6J²W3+jà=Jtrn·.Ê+¥CåÄÆ­l,Ñ7~XÀS'§üxj11YôFÍ­;ö*{&ëì<EÊ0_Ú¸íX½yÉ%JÂåóXF£Fã-«>@ñ£j1èòôF#òãNB5ª4¦/z=Jõ5Z«Y9B\\õ·FÈ»Î²Elöi4ÊN,+Á16´Â.\\Ä0ýÄæ=}47Í9I©£Ýq,A=@ò+0f»¼ÖÝ\\o¹5?ÛðoH	+Ñ8XlÊ#-²LqR7Æ)0UÞÖ2Bû7Gpt{Ûªø£Ð=}²í\`Ä^æ<rl7¢@êÍWiiôg?.Ìë¢Ð!aÄò?ÒYµM#ÿâ:þûôÃÝn:a¿¶øëøÃ\\ÊÇ{jã[æÑ/K?2óÔPêx×p,WylEò´êî>e0³H-G®6¶\`CÎZ=}(¼_­:BÚ)·°:'¯õ{´BÁýJ",+×ØôwóôtîµKõË®SS3Æ³)42¬2ÀÕ0 ²h/SÞ8<ÞmJú1«­¹úô®¹Úýy5ä,,Gò^ìÚíô§í,	ArÎÔ²¤QxKéÜ®²1,Gú/Ó1±_ÙxÃ÷±Yz§«Ð¸TA¶j=J!ÏevýF£z¥ê.Ñ3.ªlÕeiWø¤ÊSBBí&ä AÌ¹'({LFQ<(W*=@ãÞÑT.\`Â¸zãµÊ]o8Òr;Ú¸zÚW2MÂÆê;ÍgËû@¹h«d?¾ O.¤:+=JÜ²iÜà¾Gév%X}7\\UÀWQisd­÷3#ZQhKa¦î$R¬|³»¾ ÝL=@ñgÎì(Ë?i ]·=@ùgbªÚõ¿Eo¢É^(Þ ff¸-}©§ÿ%	E"iDoO­..ìÃæp/.ÉÊðrax¶¸hb}ë]¼Êb-¯èbk.@öcê ¬C\\C3»ªXe²_4¬5FG,mV{UÄhñ,lýüj=JhR±Å$³cËÒñ¢?ÄRµ>FÐcpú°8²Á;ñkµÛ·ù£=}hùîÅúýù£ÁVU0õ£BY2í5«lHZKXÊ·:lå{²ºq:<A}¾/ÃµZ(úÍõ °Öû³bjÄoæ }mjØP¬_b;Ê*Æ®ñ!xTÈX45ào~Òj±¤®7ü>äàñßzK±ÞÓ´4YÉÎGyK|óÙb½+×x°Ò¯G¥aAánV2[­fÎÜiäÊæ¯4©Ùe2¯Ãºé½KD4;¯2N»îÁ-|ÒTö1+É5±2ä3ºÜ:[ÑÉ?Òú@ý-Ð1º5<òYSâ×4ÁJ}N6÷eLm¬my9àÌý=JÊm¨ncjÐ¾Ì/ó÷S/(3îÏ4î|ò¸-Ïb.ÅÁlToU^Ñ>×úÏbÏªÀå>×àÆ|Þltû4?ÏªzÊ{OW|¶Üâ?D²Dp]ðÂÖ33¥=MB;Ò=@Yèª\`äuL×^ËäGwBÐ&=Jüæt½,$ÁÐòmn±M¯mg.3o²v01p®D¬2Bµì¦,Ñ1¥|Yóäë?XÐ1å}YË¾²u¹ëHþuûÏW¬[ÒYWjWôÛË:ÞÏâmÓû7Á¤SHRÀX|óÏ@XÁÊ¿:Çå>×ãuû4÷SoU^¡SxE¶|Æ¬(;¿´aþ4¿¼q¾MXÒ>4@K5õê\\ò|®m6bª­¯Ë=M©{Êa¶Mýq{ÙéEoçxY×x¦kF59¦3Ë4×4;_A}Ïï"÷¯ù	Õ:_(ÒlþÂ/Ö£Ò44bmêj©¾wO´ðãµR¡¤OHL8È¯Å@9äñÂ[âªCÏâ0Ø8ßm ß½ nì;-Õ£-±o¹@Ç×tXBz9_ä'ÉÄ'îÆ/ÑÒ?k Å2uå5S¬ºý§ùÌÚléeeþ\\?WÌí4ueëLÚ¡XÅr{ìåJ61)E§¤>Q!±ýD@rûDT=@\`¬¨LàúÚï|x Õû=}xån¾a:ÅÌÞó\\ÛdÛu¼°Z­MI_úºªÑ=@@NñV¬]Ï1;»R¸¬úôúöòø}®KÊ=J3ìÖÉ=Jf3/~éw}F5nêLìë.ËwÅ&±ðê©oë£OM;=@Ú¿Fb xv¹Æ0èQ22Ü~õGbbº0lR£=}mMu.0Ñ\`ÈøîëKý_üë÷¼sQ²Ó:Ç¯PBëûÀ^©ü²:üô¬§²ÚÝýö60&P^@^gnéô9\\¾©Aôb>kqI+²E=}yÖ~ËipÕä9»+BB+4\\_êóÇ¾ =JÛì×ºzÙ@þÔZáZ¹ìÚOk÷wì}Ò5=J;H¯@yÉÐÅÓ;»µ2ô·YkqÊX=M®µ0ËU4'²S.¿÷Iñ16Km~7½GÚÅ°4"?D^õ¬¸ÒyvE;öö2¿5Z.k«2Å¬ 56®°Ñ=J;¼y/Ylt½¨ÄëH-¼aqsB=}¶ã;û5W]^ÿV:ýOe>'r;³éÎ=}éh¯ ½¨CÈº_·FüQ	"üóÖr5¼j&YDL(ÅpN«r:²c¥JWúÀbðªOÀ]AI$ì%Ã:p°Ä¾À@,õÚü°î_ú>Þ²LüoÎÇcÐÕ%$iÕ=}×zÁvªÞÏ\\pn"§¯¡ïDÒSÃúòEAq2­\\*lPª=J¤{òK£$<X5ö®õYËâÒË5^L¯=}×DÎMòsÞOyd®J¼&ÚtJ£2Ùñ¨àQT²,îqü0ÍpâYðx.;0¬.®ÎJ KÇ$dÔïMwR¯2De¯ÒqÎ-Fr^ow2ðnX[O÷bÔ(½4=}IQÖîøöøvøÑ°¼I=}gðÍBAEóJEkÙÚ¼^0Òz+÷@-këkÊ¢ÝèZlò"ß=}RRÈ°y¬§ïøTÈL² þk¥>;Lb	ªTiJ°J=@¡F<yÒÀ<>ðJZéâÓn©ÛÉMB3Ê±Å#=J¦ò8¹1ò¸uÙ¤±¬§A×êº{ûâ±«Ð6h¥LÞáU=MÓÖó¹ "0W¥L»iÑ²_lË²òøß<³ý%	q½t5ÖJÉhÂ *a«ßÿ~Æò9WíA$_GÈõKbi§#.%y9Xª\`âKIF·µ»A#æ¬5v98ÌxëgÒ'+ý­­oïE]ºY©Ê)6[\`R½ ÷jK«+]nÚ MI·*Ã¸ÓB¡M&z1µc_lÀVÀ#{ÿºr]Êê×ìÞè+RrU°d>f{¼,dHëíî7´.d~.Ý<²j¡<;Ôøw«5n2=JêpuB;%ú­Né¿øn%¼óa7;<\`_5(.&kLÒ+'6Ä¸=}?±â+Ø®Vð¯ñù=J÷UÊÊ¬5¿L2X®¶£Ëørá5­\`Î¥2åwÁËò¤RþÃÐfZdë*ìI´C466rÑò½âø9Ó¯ümf>AÂ×*<1K¤þn~ú§º0È9{bãè?{NÚB¿×/öm@Ø±¢ÔoAÅRF¯´:ïµÒ¶Y°ºX¢É·8 þzsÃ$Å¢cã=JûR=J{ÉaL]¼5}è[·îÌ?º2ÿôPÊY9\`KüÚl1í»=@oÛ-x~bï;=}«üw]/%[]ZllvÏªSbnöÖ7yê Z/x9XÒc·úµ3ÎËûdÚBjÆxª´µ¦ý­PDéÊ@Í@µÁïÂü,ë*áïÛkª°D?1A«¢lõ4£:p.J°ÖòÍÇJ\`µmnQÙýJÌjÖ/øg/êÁ}=Jv}JN¬¬=@ð#VÅ¨,ýD[=JìÿRw,£FïÂ<omv=J3Ó*+Zft5ÞúP´òòp¢5NÎJDgÙùEÜÌÓb®º|úpS¬ÕæéL{>8yDXj8³£qÝ28ÊÖÂjP=JÀjãjîÄ·N +E.¸O8oß¶d¤ß»ý@Ñè.ÁrA§p~»á>À@CóTg3ýJÓvä0ß]¥cV¹ªnÉr´²+iºÞJº>@µÑí5SA¬©îÚâcW±µìg_=}gnÛl;/dèzæ³d4+p¦-­ü+}KÚî5~É3ëÅX/^xqy¾XlYÁ8VimßªO1^Îº*[1âVWÔíÒI´æ«Ìã/z:*²}Þ=}v5n²¬V>=JdiÕr=}We.êÜ=MIBÎÿPþHÜ:GwopQ"Ì§e¡Ö*|öûºPgmk.bæúÛ]bÀmþR,Ñú¬<=}û¿)tSëö³ñÏ!ïÀ9M;d8¨­ë·ü·IÞxdõyºýcKÂó/zØà%D¼ Öþ½,G©3\`³Ç|tqaþ×9,|i_30<°*ðÓ¤ikøÍQêkûO:6yåúFáanÁ<?/:·)úl=}ÍJd ðZNÑúºónNÐ¬tÞÀíû«F²2¿Èâë~¸dÜÓZ</5Y7oö¤d·ýBÃo¦2¸_á¶ò~eÔ o-pWóOÞMÆ×ÌLßúP¬âKlÃ\`õH3~XÒC;1)]¼p¹=@Y¸ä]-TuUrÎtQ<2kÑxêú8w×÷ÃNÎþ±[Ð:[½µKú&ñëþÞ=MÜyl>LlÆµ3}GÎ­éBæxÈó÷^~ÞòÁhrA$LI¯½úÃ~=J²7´R«Ê0³*+ÖªR×H²¥ó[«b2¡ä.ÂWÑÞXt¥;ù;ò÷±ý¢¦÷£9{,Ü	Míà)È¨Óogß0ût¸UtL@º½Áxn6À6Óþo"=@X!9oÌzÜûJÇ-G×õ	´ò6·NÖ/Q0^§kxìôu6µ l%!ÍWHú5ÎÎ/CóC¦Kd¬=@	EWL¤=@ML^:GïºRàY"Yc,å?ÝÊ÷Q3¸h)x(åM×#Þv\`>¸nDyÆ/Í2RJ\`´ò18:²å¬K2#2þä®óK@|k¤«ª=}1¼é0bÂ¼hÁ8M5v3+G¯ýxË*ÍÂ=}"oºÌW=MÞKÜ5[/ý;÷Lj®=@Búsú©jl¡B¼w®¶®mÍ\`»¯Ê°dä=@5c4èæwË[+3ÄOñ!­Ð«qÖÎ«krøm´lÀ}çuþ| º-ÝRÄ §È=}tqG ¼Xl¸Q7K¿à;©¥K -ö42ÍjÅöä@QY!ìKdºw:64±Ùn¾Ëþa³­Ê@¬M^rí³b6Dùo®Oe+Y ÊÜó)û[ZÓ-$Æ÷KÁüit>*Ê× ?®AÛQÍ¸IO3þãuÍÈÆ§nÓÄ´'	3õV'Ñ¸S%êWA¯oKÌPãè+5êV:öû#ÄÀH^êÍ×¼¿¯P8OÁ~\`²¿o=@b\`äBOJf±»­Rò×¼âLgY;¡vÚÊi	:=Ms2ÙÙéÙJn=@ãÜÁ)ÝÁAð"Ã¯*$Éüì§pHx~RI=JzfeY ["vþ6.Íc8õèÜz*m=J~*m08¬,Æ²ÞO.AzøáÎÀ+£PâÞÊ4z^{2@W*Y#QPi+ë1t8ÀWL2¨¼H4÷ÛÀÓ»¢r9Nl<µÃÿ'bçÐ Þ½ªÐ³Ì´®tÝÐ0m7þ"låF+uR+.ÌK%Tä»sU¶=Jwå3µý&Àï?h«@¦¿ñW­ëßkä/ó3(jXlAÄlhÂVÙ}ªe5~Iï"ÍþtªðøÌ	¯w\`OC;(Áj=}b­ÕÁ½Xþ«Vlá<¡GÜõÌåzË<¡GÝnOâOêÍ,£ÇÜuj¦Ae5LÙ´åXO²8*gew«¦#:üA¦+³Ñé'ê/ÒM÷\\-H¼:=}r8sò=J"ðí\\läáî+@¬Lõèü.EäHe3³©e r¥üú~VÈ05XÏ£\\ÌÝA#<ÐÐ¸ÐMË>«Ð-oVQhÖCv¼Jwç0ÍÓM=}=}ÌUÅ¢ëgú@gz¶²RÝl¦K¸iw©¬Ì:4åuW|Ú»sic}ïX,1rFäAp¶+Sz{Äá¹À=J»ªS!¼qj@Ø >te÷xgv¼cÃ1fð¥à=}rõ9Þ Y(:6B¦F;ÁO69Ë_lôylê:êß{^÷Q´\\»\`hPÓ©hmsÁS×uðË~¨ÓwP²ô=}w¡×GWFKâ¹Ä¬uÞ/¹¿ÇíAÃmõxômá=@KQ=J½¼ÜÏ~ld»±¦4_ñ>WÕ=@fÉbá3§¯Gë'JZßáÜ§¿ÏF®:·8ªÎRWä-xÔ\`OÇtó}ÉûxcniÄ¹}¢Ø·¬wWc=JÂR1µ³¶¨Ús³¸²BÇæ;7=J%T°¸¨ôÀïÌ¯ìÉÊ=}WqÓ=JjüwÂaÂJM-n{uï=}<||ïu~:Ó¢Ë5N\`LÐ¤}/r.*4îX|?'=M»Þòo÷ÞßÆ@àï_ó©¿Á]xòñÚIà³³JÏÕÐÈ áó@<±(Éø­k@.ä×6àûYòÀ'DÖ´@úöýK;×=@´Ø²ë5oí³ÆDb®;Ìâ³w=@ÜÑ?ØPèÌmZfLåÔd/Ì³N5LÏ@ÙûßÙÌ¥$Äu³ìiî¹Ñ®©^î	<FÎQR¸^=MË~,@¾¶Èþá¾zP©Ä)|0¦W¼§ö£Æc¢&ûþ±½þ±+P¼1X¯RôFÇ»ó5,èûÆ·<¨Ë9ÏC1kJQîJÀ¯!6"ºËëtë¢8rÊ=J/KÞ"gØnp$Îq=@#:4IÄÕ9t\\TÔX+ ¸2þú=J<=@C´»*¶L»ÜÒÈÂ­Êkêõ:Laiu"þ:°ÄÀg³tÆ5;ÌW-ò}õ÷ºVÊwR$ZKÃÂÃµË¿ï²86´@	Á -_ÁþÓý{Ä%Ôå{¶Bç°=MèÅÑ£¹s A~Oû£[ò/ª<H}jm33Qñ¹Ú.ðrs\\tLíÓ+¬$ðhmûÕX ký|PBa9öPôbÀ¼Ù:«ÑÎ~j~[:àÎ2û6­´0;Î7?k9¾ë?¼»Jh®÷ÀÃ^&®+=@sQZql!¶­Þ205M5Ñ»éogiì÷2Ã%zÕTLHÊÊ°]²£´×Â®¾Põ=}Ì"¨´´þ8¨E+_8ÑÄÙt:¾_iBz:lº²îeòïrÞß¼N¢,J·¼Í0sôÄÚ2LüÂõ4v6ôQÜÓQ¡UÂ¥a6Ì^ï<Æ¸¿ê°AÕ2DLm-ÁKh0ã¦ñ?E¤s´¡6Ü^nh>jëÞËlV@¸ìÍjyV»{ÊW<ôGSîvMÑjÀþ¾ëÎPÖúõý=M©²\`<9|Å7Úþ8ËlÆ5ZHïcâLþ×¬Çúw²=Jêd#P/>ít/Á/4!ÉÎ!mÇ÷½ÖUV¾:Ñ6D1 \\,±wÔÿjæ6Ä){û03û;u¶bÇF^¾#jÏ~ &¦KKËªXø úªÏaov^WAb'üWú-V³=}³ÿLUÑu´u4%LD§öVæPúfú¿ì/¤|ò|eõ¥õMbCNº8Ë.ÖBsnÑL.Ì£k[ÍÓYD+64sCºw\`·Vcåóðb^BQ;ð«2>äþRkÆ=Jânê;%Ò&þ@#¼ÖMm-LM¼YO;kù²:=}xØÈÚ~³º\\úö¯ámëq"ËÙo8µ^WAt9Rj3OkzâF#¾Ù=}¸¼rÂmARÙkùÕÿ<51÷éûpì7DlDÎú*âQFº8:K+ÈÒ³Ìð´Y\\åNìhk$ªEûÍ|i¶v¯/ÙÚrî}ªºÐ¹É×:p6fÛÛCêé÷¸e|Glb·tÎ:NÀýÚ®hºÚî­ýþq&nìqÿG«à7ÚrPâðÜß6±E|¼<£ÛÝ¼û.Ë_ÍÇïQÛ{LYß½(ã,µvÞj7ZJDÄ^R62¤14ø\\8µ§J×X?»ñÚÃqHÁû=J^11¥Erö7ø¸à PA\\CG­'ø¾ãí8ÿtãK¼1X¯7¼»bþÜÈîicuø\\¦a¦a¨íg&î¯e³ZI¾7ñu¼j©ñÀ+y½ÜÏû)VC/¨a¦]Bé§_¨ßÛ#%#µQe±9iTøì9»ÅÑP=J?-òøJn=Mjç{ÕÒ°V=M!EgúÄÄjé©áÛ#%ÕeY8Éé¦\\kY-OÂNâàÁVÅF÷ý´æ~_óÈÿ %(Õ~Î¢pÕõ |¥Ó=@ót'äù|íÝ¤sUÝHÿ»¨VÎWD¥Rr_SD½?L¾Ï6l=@ìG9Êf[ûiáîôMñ=J¦"§;Fãø×õDP¾("¨Å·×wHÚ.èêE¶ÅÁ¾yÜ¿ò$Ä»s Ém=@#ÖÐ°ü G9cÁ¡áßIp=@ýÖ0óT®\\=@YÅÝôtK*íoÍ­x&[ç9âux¼-p§=@=MÖa²s9¿p´®áËFròº§Ç:Q÷d%ï£ÄÞ'ú(Ý7¹	dçüõGa·aðçÚèJâµß©ódÆ"ÜrÿcÓðØÙa¾Èfà}ØÖ°OIgÅß£Å4&Hh=JêÏª'+Õ,ð/5Ò<=JBÓê,4.Aâiÿiô)£(Ã#Õéaùû¨è#à#=}Ýå¾!æ£}fßóý÷Ýéñ!,m8äÜë#Í}_Ñûí¸¸¸v=}F8E?åàHE­·6ýÍïÖ(	¦å(_pð§)%ñTI=Mi©)(¡s!ç¢ý&¹£cï¿Éy© ½ÑÈ"fC#"ÍX¹øhÖ!ê­D98)çH!	Ç¦á­¡Ì¢{9æG%$×¯áäT¤'÷­aAF Ý÷wûÅ£d^¾XÿØæjHQlqúÓsÛþ¸VVúÿk¤ËgEÁ÷Ãfd	XÄþÓ@ànJ©IYaQ½×k$÷¼ KÇpÌ©\` h Âªä}(zÙIµ#äò	¿ú95ë¶Ýw¾'qaÁì	¬Üc;ÑÖº¨ÉicT8åVçÕít7d¦] %ÄÙr=Mq­þú$Âáî%ÌÐ¦pýQÙÈÉ¶Iµ½/ÿZ¢©Ù~åÕ[U¹éòLà´ßÛ»éqè§Ó(=Jó)­þøðÙ|ÚXC7ÐQWf©Ôù1¹ìüõ÷ÉÂ	ï'"e×û"Û¨Å!Ø7MNCèD5á£XFº|/Eé&ßÁwý\\¡æÎ$ðAàIt"R©õ]=JúáàoÔå§¿ÏùíT§}®÷íÐàÍçk\\cà+=JurÓrùÓn¨ÍAe£_Ú|íÈóÝ\`HãVÔ=Ju¡Èãàx]=@Gè»Ùn÷ ­ñX À4wÌqø	 ØÕ³°v=JäÑ¹üÖñÚÕþµ£-ô\`g=@Ä¡"ÁÞnQ÷¥=J«\\å8Éæ¦!Ã¥ÈèFdïèU#¬¿$=MÑ×©aÒ× ­ÐViMyãd=MÐ×gõé }'Wj~âÒíQÒíË@e¦]y(×Í½¨Ý)èÊ4ÿÄñ÷©&ÀÚÏéÞ£EøôÑ%Ê{aGè<fÜ{ñë\`ÉâÛü®áÈãÊà5áF¨ºñé6cÙÃ'ìD (=@-©hYÙ¥üÖw1Ùh5T@Ê=M£ExÙú¤=Jâã Èè=M}Ê¦µ{]h Ùzß@§héÓûnÉA8YFFwGæÕ¸õÛÇ³1]±S.IWY'ÐÜÐÓxQGßåáG=@eVâª¦wÖÇ(Ð¢dõ#Ïã[È{gAFødÿÌ8³aÑ=M=}JãäØ¡²¶Îá¦8ûxÆÂçíQýr{},edY bG÷qUÂ»m/±ÜÐËP{zÃ¹	éå¾Cä«~þMc¡Ä=M^ñÛª£4©ïç8·GâýÑvñ!¸}úØ58±Ñ¬mâ£ããØMßéÖdGl%bOeÿæ=}Ø=Mý;¥Þ7÷EÍÐýÑ#PGjeúÉFàdÉ^wÒ·y²ÓÛm}ø÷Y÷G@ÙqÑ«L8ñ]àíDý}ýPÁïø5¥b\`_	:Í\\Ifh¶¤ÂácpÍçYF Ío-äfÜ	¶Æ½úô-fðdßXµÖØ8k8cN&4eAZ\`oµ\`qcbéÌ3rö~Ay&®è¹îò:g7kt=MdÑ!Ò¡7ôî\`´ûªfE8ÂHchì£dâÎã R)½mÐ=M4ñk¸Zu¹Fb×jã/öZLy8áÎÑüÜ=M°»íUÁU=}ÜûìKë+zG·Ü¾ýqáXI}aõâëça×G{è¢ë&ÈHx®sÝ¨Ã]ËÿÅzÑq8Zõ¨JåûúgTNNbNB)Ä6SIfÞ×D_\`Ô{MüÜpµºËiùÈâÈÇÁð¹(Þîhç¤þÒÛÙå=@æçÞùÄá¥ Ãú¥ø=M±Âa¥õe¡Ø £æ³ßÏE©wâbÕ(fÄ=}ØÃâôûu=M¨éú wûv¹ë_ÒÛßé×ÆeØy×¸Éb¨P§) ï2tU%é4ihÉØM¨æ	»¨¦§äÍÃ­"e¡$Ø/RùýÇ5=MBåYé#ã]rä{ ýò~\`qXñ(èßÙû¹Ï­ÍÀ%t=MrÚTMo)ätÉÝ<W¿Õ=}¦¼CnÏG<§j³ù3:?«¼ÍÔ±F¼Î«¸¼<®vÂÝN_k¤³~÷o¼ÐL¥AØÝ¹ËÍV¼£$ð5	út_Å¡EÇæÈÉä×¶þKd¿åx¤ÂQÎVã©ôù5=@Æâ öÕzãÔ·ðN¸Ãã³ÅYG-õ¯]¸§ºÑzcu=M­|Pöß	ÃéÆ­UÛp×%ï¹tã¿Ñ=JÍ®~è&âã¡Ié$öÆé¢¿¤%8Ee#à-éÜ5T?{émv"#Õ¡Gä¢õÊnb\\6Ie¥Í©g Y?åw¹ÍýÁi»å¡ë|¿E ²xF­ Hé(öïç/éöºûÝ=@g£Ïó÷é¤Q¶Éå\`=MîÈK7!·IgØÍ©g!ÙåÑhS=M¨à'òßØ#uU·å8sÅfÿà'Ñf¡Sz|þªôÌ·%x¢Ê¶üâmvìµaÒñÙh6SCÊ§é=}Øm#ùÇf,tp^I½bgñÙg 9RË­q'¬(§ÈáÛT·d yÈb÷½adâ0Á×æ%º{ý[Iè 5·ÔÔªþ]©=@U¡	l'8ç<pyæ»É©=JCzðüæqy]À"ìÇH+ÞGÁ\\Áa}%&uq\`AÇª6Åzuf/õp=@ÿß©lùE9(ÖØuÖ#	§=J=}XÈ^Iu	u¨Ë%%÷Ûr?ê¯=}7Øõ÷ÇðdïMy+-.À¹Õ¸Ûçøóx%÷+xñp ÞîÉvqÿ}¶aé8ñ=@=Mn5yEþq5ù}}PÀÙ0?Pcdøq×~ÛÖ6c°=@z%ì÷GÌç9º´ý?ÑxE÷[]gÉÄFÇ9Ì°Ñæxøõ÷ÞâÛ*@Z9æûõÍ«%¦}}-ÍÕ½ÿ»À,¤hóÛÖ}G[<ipoEÃ	û{}*$r'³oì÷gúpÜ}â£½õPÁx+òmy=J¨ftÐÜS©9qA¶	QDß¢þyOde{ñõû=@ÏÕéæn =MÜÂ9D#=@m+ùÕªFQkøÇÄÄdQdýÀ\\2§ÊÑÃ¸øQØvß{¹oózXOë¥¦èæø³ði?g´×´hþ´2ñ5AteEµ»5\`dCwDßÖj#YûànÅp"vïR<æöjh!Ø~aÿp=@Çèßåõ¨9&¸CVµaE³aµyVt'ó×¬QyDdLIßµqÉq¸Y[¨^$:k©ÝÉÿë=@íçÕýJÄÏÐÒ­tID­s¸?=@®äÖæ´&n~,Ê<<e´ÞÀ)Òo{oÙù58§Æyâö î'ÀM¶¦Ãª)nÈXk¸"e=}{U2ÍÕ=M}õ{M÷Þ\`M.óB\`,ö:èÏ,ÈÖBÕÂ'høÁÇ'ïvû=M¡6cÄ4öÆ¹	+¢py³=@üPØ¬n©Óê³UZÁkJô¨,s=@Me¡b¡ø®K­$ñ =@ã·ít@96^tÈi©ê ¿U¨Ç_KÓ©É ·DþÔC\\Q¹ø=@ðRvæõ$7õ\`bÚ'=Jè_¾Ò²dWï¹Å_££¼q[h­ÍA º=JXõ@àÙ{OcîÉ#$oÙçpµýÚÅÅþNà{öØ³ç¥Èh)î<¥±³ZeÚðî®®_åÿgVhèðWã§øî[Ñ§ÖÉ[¢vCz<¼å½³³åð!GýÉg ÖGýÍ·{{ëÍÔ×M.åB¦11q·h)¨îÂÂ=@ç¤sH[hè!ëñ!E\`¢ïÉÑÄ_æ!è×(ýÛ ¶#Þ¦Ù(=M!v³=Mrr~·¬À+úô3E¤Z²CÀ:±9\`)ëH<Þí÷ì¹Yì__ï¹Y9¡àÚA¡L¨æüèªW;;¡\`!îGR÷eêÖóÄ]º6¡¤ã :iX^!Ó¾¨ö:îXGÚ¢Ï"¦QüÍ{{Í ­²BÊ|¯».p®{TÔý6à¼5h¸º×C]«7¾5dìw¢×¦DÞìºÑçZk£juzôµ=MGüN$¡3=M!%pà+[¥ÎC,ç§ÏöùHIÕà¬k+(#'#$¢÷-ú÷ÿï3±E1¥,RæØ)~çÞ'ð9¥dÙ·ö=Mf¥" ÙAB¯yIé¥%"ûM±)úÖt?uÏÏüÛÃüÉéÙr	¶ôWsEº°sÓÿÎ±5GÏ%üÅ%¨mÌ¡gÎ=};|Â>âàÏÞ9ùyöxäÚ\`ßèïÓêç{þ÷H×qáùF_Ö©áÀLô>7\`) ýQ¹GôÛÉ¤5#£ãbzíöEq ÖÆgKjá\`·S¿õÀR|ZêùQ¹±Åµ½Í­Ç¢£Ð£=}<äYÈù{ÈúNÜk>*pJP°Lãh9é·ûëèO('ø¯ÏmÅWH­¶P]DÎA¥°o=JÐ£h	eàã,ÈøÒåó¯}¥a¹ÔzVRH¡q%ÑQQÁïaVÙó$ ïhiË¢KûÕÖiåÎU?ù=Mtª(üï¥bÃÒu£Ý%Uõ=@lÎEÃ5Po±AJçCVcäv¤¼Äq¤åÝ¸$¢[ßÂç=@ÄPèàüÁÑ1}T¤BÏùùùWúÿ$&=JÔþ\`?¦ÎÙùYtåÒ±·÷×mU|¯1bEÏIÇ	[Mà3q^õE1Î4Ìø:ç§ á'ÁL¦$ #ß-õ|en>Ê]õáyÙÇ\`ç©­ZiAÄíÊüÓÜüý^YØd¸üÑ5ïÎùáá Ý»èfi|Ü»higßâ¥¡Ö¹YYIÿ^þv%òÌÂrYDÛy¹xØs=@E©=@Á¡Ñ!Õî­÷í,ø^"$ëCÔçÞÙÃXé§¦ )ÙÓG¿lÈÌ	iéä§Þ+·õ?ßÍ/ûä?ÏñüåÇGÏù©Ð¯tIØ¾èçfÆÿJ§¥¥£Ñì¸=J¼èåÇ[äàIÄ'­µ$ Ðp¦¦yWu¥ü²¦©)Ìâ¯Æîäê¨¾#(#ÿ¶Ô±â{âc¬à¡àÿÞ!¹YúâAùrBÓúä»üTü­»#ZÝ7ÆÎyAq@ñæg	Ä!ÒôX0öß¿Ç4dÇ"ZÎïÅÄïãÏuäüR¦£!RnÊ;"$(û¯§í§n¥è§¢@Ofßï<=}§ûêÄK*©Bõw=Md]õáÙYØBÊÂ±*õt­×óïõÙ³´À°$N¶ï\`)K©Y}çÝ¸9Äg¦,lt¿´þä}ÉýX£,µ¿µôþQ =Jº"¹?\`ýã\`ýHKJ¶p ,Á_Ö.!%}Y	¦OÐã"Qâ'"qäÑ]8N+î°Î%î\\ÐfØ$Â{g}hÝ(8»IQdXxgÆz°vâãpßÍ_'D_EáÏ[N«LÎr%>SC¨¹â%Dc;SQuè0SOSKàÒÑ³=@ÖOöJpúi	³Y§ÁèC²*Ü|'®6¾ÎÙBá?,áçÒN#>ÁÎ-:·ÀRWs9»dá¯½ \\¢¸>¬ÎóAV1 si55]($©)¹³:¾:Â:À:½º¿:½ºGó=}3Î<î<.p¼±.»,ò/³{êIÓ2|R<²,sêIìCÓF|/Îtrr»2³ZÚJ»,wÎr»M_ÎzÝrw»ÄMßn·þÀù»Gc|ÎØî¢m³þEÓY|6|Vü*ÎkrºtqÎ.Îr³n¸J»üºpK'ncÎr=}»¨pÄ¬^70üYrÝºJ÷mªÞ23üÙrõ»L×P7güpÎ÷r»¨m«Þ5¹:¿ë¬*S=}¡ÎirÆ­.Bü3Î}rºøKj$=}\\ü?ÎraºKkä±*;ü=}ÎrYºKçk¤±.Ó35üa<Ê´§*¹®7vì@UÃºj2JYIóGó=}S9¼a¼Y¼I¼i|*|:<Wª¯º´J¯L?qT³.§eÓ6|cÎ4rzß¿ì»Ê+ûKIó¬~GÓP|Îär»DL_p´þFÓO|Îàrný¡nvþ¼=J¸´=J®Æ·ðÆð³$nðLWqäoðØý=}güQÎäj¬/rºÄÑ¶¾1r»¶2ÓW Õ=}r_«NÃr@©J_.ìpµGEüYjÈ\\øJïË(¸J71\\¿î=MHü<J9¶C:CüXÆqð-ëd6|+r­£mäª¸-v+1v,¨T*Â/Ï=M$3ò!]\`Ùcjêÿb*3Y>ðåjn¡6r¯R=}òbH( +KÉ¿lÇòä,SÁ¾oªÂO«ÂíUÌ·jx©JFÞø*kõZ©ëp%7rAr¤c4§×«h-{WjþödBµ¤B=}JJÍpBÕPB]Æ\`-ÅLßìÂàëàíB--¥,­ªÞáäX¤xjº®!ëFoØªâé+Ñ+1<,M«âËjJØ]:@²U-kltàjJØY:a>²E3î3îG.îÇ0*"7²¥7²Ä·dÌØ#ÒK¶\`*¥,-i+ØmaÊ÷Åú J*yÈÇýY$2g+×£*§i²[*Ì(+n¢<D.N'0N'<ð82¤0ªA¡=}4f,F(:7îæ1î|%KÆGxâ*BÞ* ð,vºÜ2ð*y9*qÉ*eê3óH=Jµ£Â|º¥ªcF¸#LiCÃ7hðA=M±¢¸#®ò´&Ág¥;ËríLêmÀ°-C:ûüxÀð8/W_?îdI½Ï1¹êì#ôJÏ_]r íÊbÚòJmJÏEÎ1(p¢§ÍîqBÏößpÍMrÃ\`ü­g\`üÑ9bqÚ¿¢óH/èO@QÏwÚ½HÆá½°1uJ¾VªçFN	1SUýkÜas9°ÃÎy©ÄNâÍ¾àê{¬Ø´EÀ"OÝN ¼H¼°A¡À"<S]Éµ^ ÐµµíÆÐUØÎ1uÎyïÏÖÇ¼mÜéK#8 ¾ÂutOgÒ¿qD(R¹îÐ¿V¿çÏÛ¡çO	g#tÀèü­#Îym&N#&|ñ&¼'h©ó¡+³á7ºâ7¤*ý¬Nè]ô.L¸w3»¦¥A¼Ö÷5uÃÿµr9T?¿h¿8¿Ü´Am(¼§3óás³ÿROÏßRWg=}P7yUMÛ¯O5Y±$õuèX?ÏÖÔ¿Nu)ôü­üÑENj®¾=@g|ÜÑrèÉÂîN£s¾=Ju¢%Ä<ßÎöÌú)ä¼ÙÓèwJ¨RgrV§\\\`¿ÜPa½ª@¼'àÀ¼Í=@<¥=@ptÅ=@x¤zÏ-$	{5duÀ[(O	ugÎÖïçNõªhü­Ò½ió$cÖÿÕ+ÑPÖ±ÂH.ðÖÕÛ@«@¼>4¦a+ýªvlõ­&x¼Ïö}ÜÞd6¼ïJú-*YE·¼Óã·Þ;Î)OSWíx4YÃXl.ñ¢ãå\\'N¯8»üôãsÀ¦Hü¼Ó¡S¶¹³½v;/Îÿÿ¬Îö:s¨n4\\'tåxt~\\¯ptËÿÌN£SÝumêRÝWøËªñçO}ý+üÒ.óÜòTÏo¹½lw½vGs®¼½Ûq4cNÏßdQ4¾¹¦PÃ°©»\\GG;.ê\`£®ôÕÑ°õÃ¥óæ8*¾\`|xÅh}xå\`Ã]úÎi£)cÀÇ÷*­jâë\\×¯KÝj­S¼Ä_0uÕM°^%q°ú-PÍ¤ÍÆúòR9I^WÆ6§Äv¥ùóÝÛÜ·Ó¡Åö×}V³C\`Ðyå#hU±·Þ7çå=@$ö\`q²¸ Ð/ÝlIÈá½y¢\`éd°çÓýo¥õ¦8Ã_ädÂdØ Gðëw[ÏÏy\\¯ä_Ã°¿¾ùÑdôOXdÄð¿^±èFx¡ETßÿÆYeHS Üæõ§µêÏ¡¿©u7g&ÿþÚå­éüx_¡abHdä»±¦"¾q=@ÈÕÅ&ÿõ%5ÙößS£v[£eXùs¹x)ýeüzI½uH£óxã¦PîJ97Á=@ã¨õ)ÿx%ÅxwRºÜxªÏX¶æáÇ2ç"ÁÊv	ØëÛÚ¬Ë7KÐÔÁmüÄW^­ êÒU=@v¡Ö½kjdy0G²ßcF.p!%Üõ­>º®Í/É ü_-"°÷ü»X|ãV9SÓ>©ÓvÑ:uÁ<ü¤ß¬^s_ÓÏ°¼¥Ól¨<U¿V]ýÏ$=@sók±ÏLqu¹ÄuõigUaXf]mÈkbÛÌqNí¶í°eaº$´ÛvÅQÙ!"¡²Ú×'Ê×Ó¨¥åK#é?ç¨ê×8­¾Z¦ »=MÉAÄ¢~'ßëO§ÿ«9äyÖ=@]õ\`Ùk·°ø]"¢x%(;Ûõôhÿ©Ä'ªUWm¬©(bPmw»5à®½|Lyè«ÏA¿F sÛ4ïA4î]ÕÿßÉ~»W¤ ¡â!ãwaYTo± OÎ¡Èú±[Í¨ia	e3fâ´iºkÊ-Ð¹'À¤dCÎq3pø|Ó,ãj=@yS!&üÝGoÏâ¿ÏàDtËÉ¥u¯h¸ÁL9½Ä@¨V VKeÅN)$ä¦ÎuíØ¡6£æPCEdÞÚóFîWÏÄÇÂ¿)õN½SfÑ=@ÕÆ¹CÐrmÙ]¢>Ø=Má¦ê´°ÈIE$ÝüÛ±ÜLfÜÕÏm÷µä^$£\`è½eÅiêç{A¼ÜjºõÕt¶{¤ßúx/ÇÎöòfü¾/ÏíÏÖÐO#nó_¶^²Á¿Çÿ­Óøðk½AOpóÅevÃ)ÿ\`XN¹öl©¢yèêÕ^ÙìÀÀÓWâÊ[%Ü3M]CWí/þÞJ½ì=}ûw5sÀðßÏÿ}O!9Nã=@:Èø=JX^xÕÚ=@\\OxdãÃ[÷hc¦Kã«§#5 ÚØµïÞÞ¬wt©Y?M÷£©s´Cé h:JaÛ7äTYöìühU¥e>3'ÀF»"­ (3(=MaXX£'n&§c¦Qmu\`éyZT¤úgòhZØøòôó×¡aDüX?Û%Zä½Í'Ö=}É~vÙ¹á¨Ð}Àu¢yëèùÑÿyE¦ãÐ@éªPÕ®çJ5ÞÀ7ÔbþîkPÛÐÃ´í:ò>èÎN÷ÕµµüuúÔhO°<ÍÝJa=J_Î~úsf:_F(0¬¸V4dÜ5Øñétï+Ü5üÁ²þ\`0Ë50¾gô.½ô/<,YóqôY/mÄ:Por·êá& \\É¿_Ó½X}^	õ­"~)H^ÔÓ|Ø»ê¦ä°¦)G_Óõ|ßlÌ+Øî¼|<0 à£Íd{;?uA3¡lÝð±7ß§uk©aq£"»s­¤ ýÖk×RcRÉÕf¥®û³-$ úÔsç»¿ô>9¼ÁøuÉ&½"º¨çäÞûÚ\`Ujá¦S=MqOñ9¶ûÓ}sÙí$é­Ã¥¡é¯üý$!åYÃAjos¦îQ9hhb}(ÉUa}Ê´m	Õph¦!W·ïMìØ°q}<L)äZöiLè¹£?[×Î$»Í!´¨éqÎ%"»»A÷²fà£C?¨fÜïð»=}hnä>ÜXézdÁ3z$&ÃÑÜ<=@ÖÀ¼HúlßåS½98~\`÷ÜT÷¹äâx{	ÅÓ6éÜzC"¦¯óÍÏõ8ï§9?cÖ¤CÜ¼èÀþ&Û'ï&Ao]Úª  V»M¯?ùóV_çËi\`~*ecÏJå);\`^Óbt]	ì­?Æ{cy¯'[óì<þ=@T»$ÂpÂÐé@=@ÖÍàÖÐß-%&Ó=}EüàUâÊeõf½Çd	ÅãIõøX¸'eñÜP\`-S-§íÀû25\\¾=}Ö¢à,Å BåÝ bE\\¢.U|N»gbÄò@t?NÛ#½ð(\`PJ¯IÂì=@rÑÐÚìË\`ÐÏ¿ÓMÖFUeèïôæ8(i×GUå þôàéÛÜ3I×AUå"÷ôÝÖcümÎr®a+³ñc~O+Å×þ/;2î*¬=J­-êñ¼5ÊzErgÎ@Ç¶>'ô¦oãÉ{ñ¥þôìÈ=M%KØ=M(fi[ñ×ôÒá¿ÞÜmõÖöIaóô\`×JUµ)D çÆ¿÷7àÜÖá>à=J4%#4eÀÃì×uÏÐÚ=@> Ú¡4Eýb¯ÏvYÑÚ°>\`k\\e¡VÃÂöwym±PÝW½´ól@h³çhÉîsÑPÛQ'¼¿dsöYN³×(Èòðt\`QÜÚ3³nGÈòpäPÜò¥MÇMüóMí".uáIëìX9(°Ý M°Ýq±ÝíhíÑ%íàÖ{Z\`ÎZ BQ«ÇÉêÔNNÚyV«cdNÚ(ÑËÃÖ±¢\`SRÈo¹ÿ=@îÛÛVTV¸9±ÜÔm±Üt±ÜÛ°Ú<°Úì-±Ú"¼mèñ­Ã´ëÖqëö[)¥:g/ìàd­=@j=@ñjiº¯6X9£P9«{-¡'CÿÉ_É]! ðÜ'Ã©( iaæI|âIugAí ½[Öï\`S_Ä¿W@÷TÆõN 75 g¸ Á0 Õ A ä¤ÝSU¥Û¤Û´y¥Üi!×u3Q¥Ú¡Ûg£ÑHö¡àãx¡ê©a\`ÜEe=M	·ç¿O^ôdfìÀ·ìD/¡ñD5A<eÛ«Ç)?GTG½GëØGáý[0 Ô k ÖþàÖràç\`Öº\`öTßiáhè×ò×Õü×¶W¿W'=MWË@W°Õ÷ÃÍc=M¹ÅÛq-Å[%Ð} dÕ3e_Ô3õ	®ÇG	Â§\`a}©îüD[ý¾°ÃumÃªdaQ=@áFÝyiÿÍ6Â_ÏX¥(Ó8e_Þ85£{Åg}Å¯Øï(µsÜ£ÜÃ_ô_7ÿü¬ÿùÝÍ5ÑR bÿìç×ðÔð´gð& T¢3¯§ÂIó@bo\\_[¬¢¿ïßÓôF9(ÔÚµìHbÕÇzÃ_ç³'ÿÊ<åÝçLµ3Öò°¸ÙêèçTù¿]\\õÛïoõÛÚSþå\\|å\\?9½mìðÏõÑÏ=M|ÖÀ¼ÖÙsNè.µ#ÝbÕ~ãbÅbåB'[¾GGô YôôSôô7Sì"ìóì"®l':=@_T®×zºO©6aÄ/Ý}¬måJ=@èJ%âMª?5á¥AÉã'Ýû%'hIig\`I½ %ÜÐ£§ïIàcíÅä£ÝÜ©õíÚæÿÈö$­×ë|äÝ1¹íôà¬5Åú¯§IöFQàÿû³§aÀdÜùwvâ³ÿGê=@ÇÞE§µ \`×7·Þ»iCÃ3-E=MuõÖ|3øSUe¨H§ 9#ÌF& sE%{ó'ÊÈxÛ5¢ÕÖ(&¿ý5¯ôþy¿±;y¾ã&»Üzó%§p¥´í«eôÞá¿Î'a¿íÿRíþôÎÔ?åÇ©S!õt&}ã;¤{#£O)Æü©Câõ=@Â½ôñ¿Ëñ¾c¹¹RoäF´bÒVÔ%±\\K=M¡¨=JÙ%>	æãi\`mS#¹ÔÏe¿¡RÏ¡'ÐfYÜwSgµâ3IÞ{ÛãèÇ|¤%DúîÎ¿ôµ!õ¿AÀSsqÁTÝôW{Ô÷Î¶ÚÒþaØ\\×ôFO¼tÂ'véOïÄ\\ >=@ùtý½¾Ï1QRýlñU«½ðTwÈ)Î.aC×öf|»ÐéÉÌÖÃÒ&¥Â|ärÆ&Jï©rBOÌjIÏg¾±éx_Î]á¸I×yËî~Ô¦zõSýeþ(ÒËödwcÃFÓÎÀ×Ìâ{báÆíZOtTÓN3Ì¤>ÐSÒiBÊ³ùÙ&³çÂqÃ'½±üèæÕÜ%à[ÿkËTyárå3M1¨;ØôÍòðýqÈ¤Oáò5»ðCQM!gb>#ä&SåM©éç_Ü¯»ðØ²££{ÌL}<Ñqèi\`[üÆ)ÑòÛ©Po=@´I:ûÕï÷WL¡_ÔG NfÂ<»ÿ¬-Luâq=}#Ç;æùoîCx:{ =Mò²ùÃ·Mè±µR¤ÎÆ¿ÕÀtèâ×k¥=@éÝïÎL¥ýleçÿ&ïõ h'Ð¤Å]	WÝhpfC½<­]fÀøRzM\\#ô¤C5F¦]mgcb=MÛ¡°	[Cù<¨øzNgÍ%ïãC	pYóRðÅE\\Q)ÀÞô¶!!ÖÃ¨N=M¶@9YþÅ¨WÿåCGhøBfðßI](gÍh­$ÿíx×ýÎÀÎ }Ùß~ÙóÕh(ÕÈØÙ=@ÈEÒ\`¤~zçÓ²T·SÐØb|gApG?'OßÑp=}o×\\ùÌàåm§Ô¸$SËèdMßÍm]=MÀºÃþ#Õï¬eÕ¨çåÓÛ¥Ô+Y$ÒOô }ý±8zIÖp©²}ùDØ(ÆºÎø=MpÎÓ_§qÓå ¶yáFÍ¸¥]ç_æ$ó³êÍ½þçPÕm7}ÿE5ÐÓ¡UùzýøÏÕÔ ÝÿµÒ©°ù}eÉÇÙ8¹Ò@^Ve÷Ì@8%whâvü¯¤ÿt=JÂÿéß½·þÅ{Eþ¡A\`Ô}$©Ì\`ÆÞwéÚm7} ÓÑxI¡Õ¸¦¼ËÐ9ª§ÐZ§éäRªdIñt±þ%9Õë7¹ÔáYH}gåÆz©¥¢|'=J_=MCßÎÆdô ¬§o_=@¼Ä¿¨'oe)ÔI×ß°¤X"ÀÄ#ÿWØÔ(¤ygH&j×æËT/fmi{Á$f}qÎiäè~õw¢Ï¤æ{Oéyç¥ÑØ³'Êè%{ý(ÝöAß ×åéÕ=J»gÑO¨¡æöánC¢ËY0Õ»é¹à÷­£õà&>eãÀg!)ùÁ =J±¤Ã"Niq(¾M©]ôö~He5Æ£r=}A=JôI¥äÉæ¦=@k¡èS­¡Yóaýp¥£¢ê×f&æKìÅ¥÷&í¦#ÿÑè hèYô¹åh=MYÕ#h¹&#!/¢ËT+&×*¦J)d²¡èBîÅO/k/#Ç­/ã_P®ÙWîeWîAÞTö%¦Tö#æL¦{è{¾m£[h[ÏbY¼ÆIz¬iÖ¼yé¼)H´9!V÷áV÷±þ9=Me±C¨öÙVÉ(â{cÈÊF!rWùI¤=J/Èáo)oOh	è\\I^é\\)MVÆùf:øáØìáfØìéP%Lâ.ù6µÉ!ow>¨°ìq¦#ðÕwÒðÅ¥"÷W&Ry>Õdy5ÿ=Jþ=J%%ÿàçsß"mh¨lèê×8Y^Ý89ÕõQYÔõ1>Öñ]þ=MlçOE;EDm°&°°æÓpf¦§MÈ|æ[Yáä[â3ééÞ3éÊS\\áSYÄÑC¹Çü¶AZ_q\`é©ø¡6ëhëóg(óa_ï¡àoTàüÄ=@fôé7©dÏ7)Xáí°ÞàuÞ=Mw9Þ=MçôßáÁÞéå =J¸óG"¸qG"ÀGã¼»%¾îùîi§dhd¢áï"EåØ&éØæôØ&ïaÈ$çEßeÉ(¥¡Ìz9v9Èé1Ù~ÕQÞæQ)íµùµÉz¥x¨ç£í®¦æpóhæ(h¦í÷h¦j¢hÒYéöÌã^y©<÷=}Õïç[æíBâiè"¨æ(·¨æVÉDõ¥È¸+'#·(¦óÈ(¦¹í*Ô*(*!*)ÏjeJÉ¤J¡BîáGîgÁ6ÝH6­t8µ19¯¡6ÁëæÖ\\®vGìý!91¶m£Dm£Ëæóm#c¸Ù&|FÜU¸1çµ=M_í£pfIáVÈÙâ@ùw=JÁEPAÍ=}¢g3',!Yf¶¹a¶AÅf¶AùFð½	6=Mk¯°æ×°8°é7©GøgfqãÿpKÛM"¬cM¢ipEYp¹è³ænÈÙL9xyM Nê³K³¡RÃî\`w¼âÆNhy<£W³9#Èî>r¿(ñ(c[ÃYÄ½öÑyøPù½c]Ïè/}"×²>èÜ4	GÅì'¨tqÏ-Å}âË>èt4)o4)÷#ìô=M£»\`Hüô%ñãRU©bïô§#YU×æ@UIäô)&íô©dA×&_U¢ôMI£5Uéðô©ÚgÉaUiGéÝÖ&]øèb%Ø(®]Uøæ/W¢ïôHÝÜöÇ=@(UUdûô´6ÞÜ ÷Ö¶ÁÛÜ\`XKøf¯Â»ì8!r§õÏZu\\¦bÃ÷ÆÆöæÄOÝHbÕÈx9PPÛ°_¼µy³îän ÒmLÕÂòØEëà¡BëøòMÓíóíÀÅíÿ;í-¹ö,Ý3yjÃµ¢ ¤F¥	]¸ïgHôEô¤hCì(g®'¤Z	Z5i[²ÃJ¨íjàQ	jà¢* !s©\`Ës©\`uV½g¯('Â%»BàMZ°G³µë2!õí0÷ ©ï¼¾y\`©9àvëoýäÛ0äÜóaåÚàH0u\`×©QÆý»c µáÑvÁdáHÌ¾=@Y×_W!¶@ó³ü¿Öò­ÐV=}\`&m(Mà ¥m =M¥- (§\`g"äX Ò8£ç\`Õ§Ð@%¼½·~­ÅÇ/¸·0#ÀÿÂbÁS2"|à?àÛq@Ï<Å»Rù¼\`¾É<õÜ»ßõZ!Zà)|S¼ß¬ÿ3Sø7}Á@yd?­¦5ÝlmÂ¦kz3Ù,Ã÷Ù+Ý,ØùL%Û×Û¼Y÷à_öõ=@æ	¢ÜWgÖóJ@ìÀ×sÿöîÉP\`a=@«g¼päW¢}\`öâê|òV)Ùt)¿ùQiSqèè¢Í^'$|ó!Ó&nã(z££ysæ×¶åË®ÂÙT¶Á¿ÉXRõÈÈxeÏf¨à²ì©gÒ¦É"å]¢É¼á°L×ËæÔVcÝs#¤Ò_ôÓàU¿LÏÀSÎOô]5¾É@ùîø|Ð®ÑUµ·ý¾¦ñ©vz¶I×ÆâÈÔ³´EIÔÓcÏóØtÏ¾VÙ@týÉDT	þ|ØÐbI3¸°¿}ÐøVË6(rCKjcåq³!zÖíö´¦p_ÚµòúçáL¥cIò=MzÎí»eeÙµF>c§#Þr%ÍMg¸ðp¸ÚHcwÓFãVøiDmû¶};×4ø·|a¹¿¥Ôp¸ß~ÿH¹!\`ÃÚÙOeGwC/µ°ö¦Óæ\`=M²ËC#@¸÷²$ÀÈâü¶[aÞ õòòðæ¶i]¨¡åÁûá¶ÈEÝ\\OÓ§¬Æÿùé¥Ôù¤}u.ÓÀ>{ÅqÀ|(VÙÈG=}Ï$øØÍ89ÖÐÓàÔkÔÅdèÿ+¢·Nßï°^_óß»=JØ=}ÿºã½ÿÄÐÓQ¨{áÃ×hayGäËD£¦³ý\\ròT~íßâ7aÕíþÔ	÷GÖ§©g~c}WþªèKßô{_3¼ýÔÞÆ$ùoIÁBÖÓjUÈå×Øh¡y'¦$ËÄ³$"!ÚÙþXÔ©zy"ÖB$w·WO=M<ÃÁZ%\`æîu(ã­g«ARò%÷_mfö%q£ó<¦N9h³QézQ9¹ÀÁ9$÷!ß=@=Mw7##®À(ÞÜ*i hªIÙ;îwý¬£ü¿¬fNÎ:)@ÂE\`?´ûµùm´SÅu ÖNáY|Ä	>ðyÑÁq9ÁQiÁ=M©?ÕêIàÓòi¶Øî7EU%iíã?(TZ¬É´´åSæT=M¹=M§¨Ý­ñÍâ¦åd!¨­E-ß£ÕÊd¦¥ä&ã¤&¦¢§(-7£7Ï;¹ÖÂéÖú®áUÿ¾99ð#^qwW"±¹W"ó¥W£íý×"êÇ×£Ï¯"&Þà¦á ÛÞ(Gâm1èqÈ(Q?	Ã1ì¡¥ ÁÙ¡=@¿"æoCúPÙ¥ìÅ¥äÛç"çìç#ñç£hfÛp(w(%~i°¥GíÙùñ¥~³w(´µ=}$H-¢Ù_-jÍ6Õù8Aä78<1kðK&âK&ä£R¡É^¾ù^ïÂû¦ôbX70×aÈI»ê§ QWO°Cí"Èyí¢û8í#gí#3É;Z.I¨.YGºòm0O\`%<#;ÑNH	T³¡ºîqta­½£l¥k\\¦[Ãy t\`ÿ|"Ð«S¦$ì>è$r4©!T¯ñ££?U¡ï=}Ö¦^U)âôô#¾}è&ä¿ií¨×¿å©ëë¹Û)-¥ï§UU£îô¼@Y'Ö¢sUUQ¯(c¯ÃuÐZÀÃöÄÿu8QÛÌ½±Ï³VM.u4(Öê#öe¶£@yßïÝ×Í8m=@=JÙ=@Höfu8#G0Ü¯Á$Ý5ß '´c°ïõ¦E!]Ù% ôí±ëXVàrbÏMU¤Ög%óÏGÑ7%U\`{5@Âû¶ïÉì¨ç²êØ&¹£HØí¼\`=@ÏPÀH{Ã%ru~ÉàÕ<Hæ(ÜVÀQËN#ßBÕZÌRÜ:eãJ¡Rº×Uª×Hñø¬Ü§f¶¿wÀÿFáàë-UUui½\\EO]ÏÀ1tî=@t­_êéäÊFsfÏÒ×¸Ra´(Ø6¦çÛåÏ	PO×êD$¿K[5¾¨ Ý¾iy8?ÉÊ\`tc^®<>=}Õâ¡Ì®Ø¦5ÖÏ.èÙÖ>(çâÜ+Ï¡ÏÀ{	'(¶Ý»©ã¶æ¤kÁcMM!ØF]©èòc¸qL´×ÖD»c¼_0'Çç7ü´Îå öò}¦peåCÛ¥þ¶=JhÁ]DÃ	ÙÀÈÏ¨"]r³z¥nExÏÈÜ¨ÊÜ&Q³ÔÔñ¼Y=ML¿¡ØÜÅßWÑ¤Sµ' jçÒä¢p×)ÑDÄ$ÔG_h»äY"¯$Ý=Me­ùã8<Ù÷òÙ"£F¢åm(ä5ûðÇa Qxü¦#<#£è]/¢)Jè=@P®Â{Â95±?]ætgi¯ìYôGwTÀTeì£çÄ;æ)B¯ÿ"îAbñ£?éDþ[áø7#=@ ·ãüÚSÉÛc	ÄáOI&Ö?)¡E(ute¨ä1{q£×¥ahé9¨y(NÜaéÝÔ9´oäî@$ªÛ¦nË+æwÝ«¦úkæ!Îëd2©ZR)pFys·]åO7Fðu7597SM¢¤L¡h4é<éR³%wôß×4ùéV¯I©ÉìETh©®¿ø£Ñè7bæ,"Å8Cÿ&ãº¯»SÀð NÛ}<ÅTM#íÂå,¥S¸ÒZ®cÂ0ÛÅ%Ýy'þ[§×çGCº=}þòõ¶tUfßCãÊ;^ÝHeH}µoA²É\`nÜ/ìÃ£ ¨\` [ Kð°0Ü¼¨ÖÛföãÛEÝõ»ïÂÓs	¿UÙ	Ö9)|bÓ¶àaÏµÿtýo¿QÑRÛ!pTQ¹îR@_ìÄ~|øöÙæzäc?ÃN÷·6#|QüÈ²a3× ²¦ß¡ùèCçeØöôâÄ&Ê8Û@~õi²~Á¿Í@^2HÍ¸áÇËÀißrçºÞxWÞu÷Á"±(úCî½A¹þm1	Ó}¡k!âG93iç4¥##öJÈsBié,IÝ4) lõ¥±óûDªK÷#¼L×£!"ë,Ç¢ÁØn9¨SÐaáÙ:÷-X=MÕ9=J¿9 9q\`ñæS3&§«fR§.ø³æN(#\\¡Âì±=@Ü÷¨ã¿5µè)Ü/Ëý6ÉnÃäX )TÅõ­zÐù\\¦t¸ÜÉNó	Nc§Fqã¶ÖòP ½é¢3$R"ÞÀeõç¨ ½éR­¶ù£ÂÆL¹L!òõxÅÌ )éÌØ#-¬m4A3Wænó|ÏuÁSØ¦¯´¿T¯ÓD;ÓZ³ÔÍ×ßµ¤/¯°2¹Ö@Ý $7D_=@Ü Gd=@Ý¡	Â¨'18¸uBÈÂ¾¼þårã²Eaè}Hç$ð6B<ifSOþ³½ÑÏùÆ]ûÙUÙÚ£ë&V· ¹CfVâÉÑ'\\ûßÅàô¡îãu¥"ÁfkD¡GÂfh§ë´7]¨iÇQèâA×Ì=}Qøè£ùIQYé)ÝjÏ$%ðÏxÂh¡óÔ7 Ó±y)£'½ÁÜlV%ÑxÞ¨«}Ái¨'FÙ¡Ö&ö×Ð·%y"!ÓeÇ´þÈb ­Aè$Tûú%XhóÜYýøäÂ'ØÂ_ñHÁÇb# å¸	$Ï¢Ö§9Õ8¢·Ï] Þ·BÞqEõ²·aÔámnáúþ)Wðéå ÜvËÅYþÓ}19ÂD¾ã Ûlßì¾mù"=MÃÃÐn?ÏF¤X$qcWoR±È"»Mq ~{g±"á©)(ÇeyÞ>ËF¤ØM19HÝ=MÎÒÌ¼æUÞµÞ9|uXäS½AõÿNRJõ§Ü­þ1Òz~HQA¿ðs9ÏdzkÔ-8I#Zæ´6¾xu~6y/Ö\`»aówÎw¼ÅfzhW%jI¼~ÈWÀuIÏ\`xã7®#*¨Yó\`úc*ÁÍ:ÞÔKY½*áH+sQGÁtò½<üNÓþjQaº=@ëi#âO7¿øuãæ¾Xç¿ò@ü\`óuHTÉÁusüSlÈYqrÏÙ|1£ÙkU±´Â=}¯wmºÆ0ç^QOz5,e­ØÐ¬§ð;2¶1¹±×l£ßA\`=}PãÙ¦n ±(C^ã6!k!©Ý>@>J#¶5·õú=MÉM±í4=M=}V+ óyU9ÁYõàÚ*#-2ió¯õ9 .õÄÚôÚ¿¥ô©òøÚ1c+Å®ÉË\\']MDìmbõÛ3c9ÖmXêlAã,fë=@=JaãOÖ1ò/IàLÙÚj¸®ÿñaHòGé9­þw9)ÚMxÎEø)Àô{ü|ÂÎ½!õ¸|Þ~TPyºµs=}Îñ|g£·y­ßUhTíÅTUyÁõtýÏ|]£µvL£7dU½pr©sã²¸dAh|óå üSÉfl(uà½¤s1ÏìBãÚ^0êß?W¯±ÊLÁxLÞ&ã¾^¤X_¼aò·Î7¼µhS¿Ïµja}ØR÷¾u×Uå¾¸ÁYô/Î>Vø´æzÎ¯Ú¿NÕQs¿4æXEeVhpó/a1àEéôÿ+¾åõéõF­'ñnãbÖÈê¼×I ZcphP¥ì<FÖkò}0 GÚ¸¾±òiÖE\\yØ45ÅYÚMá±×¶ÉÆR»2@PLÚý£*»¿õçªø?àhÑ\\oX7ÕÇAÚFRa°'·ÕfjhO¥íyÉö¼Uë°-r ò×·=MWQò©ô+Ú-ä+¾o\\­oy@ÖtâCàc+ÜèkDÎ¹ÀGXfØÿ³¹Ööúïçíy­½«CÏ¿x×\\\`8Û\\ùi¦Ôï\`Xø¢Àìô½ 4ÝæÂÛaf¯7\\ÍÓà¿×¤6Ôg¥¢Ò¯XQÛ8«°s	¼J«{Ùnà)¹M³%W~ýÐ!ØîÝÖËý*êZ\`	_s§U«gI_wHù¾ù=}þ´!oy}í¼°Ü0Ó­°7MTW~·û­¸Cõþáw0Ûç9Ò·u8À´ÅÿÊÖ(vxËðI¶ZþxÍ$ÛfY¨I~²'¸Ô/Ø!qÿMÓ9ÅÌ¤ßa¥=}GdÑQ]àT% ­0g~©È·!¦Ø@'¯?ç	è]ÅÝ$=@¸^¨ÿú«#_ïßÛ®'à¦E ¨Ø-!	´OîÄ£ÃUWX&ïÑòø%ã\`qãQùö¦°I5^Q´%èûi'"bñä|+"Ð@55ø=@ßà>I­AÂùB·c¾R4Uþ*V­ÙÇit=JWvØFðÑ Øî¤XWõSN¯Âî°¥FùB¢±=M°\\bôR½Í°dbÒ½Í°\`Þ¯ËwFMqCöû °h¯ËyÚL1áCqC$öû¡°[=JB5°[BE°[BU°[M=}[°[Bu/ô[à4ðÂÖ?¶cñUÂ-¸ãzZQFÍ¸btëÆöÇ¬cÂu/ô[á4ÂØ?öcñUª+8z*=}FÚË*pÐ*bq+6ê¼,ÂªW/Zð+4¸- >êJ1VTªs8~*ÍFÚÔ*c+6êÜ,Âª/Zø+4È- ?=J*1XRê38zªMFâ<3ÆêÇr=J:1Xo,ÑbU<bð«»êc8µ.8=JN¼-aMªÍFâD+Æ|ùúvÏçwâuù3¡SiXçyâu;|#®å~IXÿyâuKÏ ;|¥3¡Ó'®åþIìIXÁÁ$yâu=Mkâu=Mmâu=Moâu=Mqâu=Msâu=Muâu=Mwâu=MyâukâumâuoâuqâusâuuâuwâuyâujâukâulâumâunâuoâupâuqâurâusâU=J?âuuâuvâuwâuxâuyâu"jâu"kâu"lâu"mâu"nâu"oâu"pâU9âu"râu"sâu"tâu³¨ýg¤p£RYçm|C~@¿s}G~Aÿs}EÒWþPEß»tÐà}IÒYþQE»$t§ÐèýBúúÂúúBûûÂûûBüüÂüüBýýÂýýFúúÆúúFûûÆûûFüüÆüüFýýÆý=}6:V:v::¶:Ö:ö::6;V;v;;¶;Ö;ö;;6<V<v<<¶<Ö<ö<<6=}V=}v=}=}¶=}Ö=}ö=}=}8:X:x::¸:Ø:ø::8;X;x;;¸;Ø;ø;;8<X<x<<¸<Ø<ø<ì'=J\`âÈ=Jh×+¤£Ê_lÙyÖGÞ°³þQ=@D µß²=@Nç©×Ì_uéõwýñqÖÞ=MQ=@l=}?O×Ã$"µß¾=@~§¨îuØh©WÐ_ÉÛýÄ×ùéõwmÖÞM ,=}"<¥/Cd&³ç® >Ghïm¥¸8éYÌgs±ÛûÈÏíéõyýmÞ"M l=}&<¥OÃd(³ç¾ ~Giïu¥Ø¸éYÐgñÛýÈ×=Méõy1ÛýÈÙÙI¬@JÄj.×j^­è(2¬4§§<Þ0ûF$$O;ÌswúTnÝÉÊ²Ðûqk:÷ÍÙÉ¬@LÄr/×n^½è(4´T§§@Þ@û$$W[ÌóúnÝéÊ²Ðý!1k;÷ÑI¬@NÄz	.×r^Íè)2¼t§©<ÞPûÆ$(O{Ìs'wúÔnÝ%ÉÊ³Ðÿ!qk<÷ÕÉ¬@PÄ	/×v^ÝâcViJû ¤xbv#éÐ!3±ÓfìTÉÂMFÐ$3±Óg®íþhÌ9Òç®íþ¨ì9Z¹Â$ubv'QFÐJFÐKFÐLFÐMFÐNFÐOFÐPFÐQFÐ#JFÐ#KFÐ#LFÐ#MFÐ#NFÐ#OFÐ#PFÐ#QFP¢JFP"JFP¢KFP"KFP¢LFP"LFP¢MFP"M$¹=J»Â=J½Â=J¿Â=JÁÂ=JÃÂ=JÅÂ=JÇÂ=JÉÂ«Â­Â¯Â±Â³ÂµÂ)UÉÌXÍb(í5XåRK¾/Azñõäµ1¯;NÁO+?nò:Îöª»OîÂì>ÿ.ÐÞÄÅ°VÐÃÄ£ÿ1cyù^÷îö©&¢Èg"Çù#ØþÚþÉþÚþÍþÚþÑþÚþÕþÚþÙ$£çQå9'fØW©miÙÕéW¥úùÜq'æÙ Xú'ªdÅÆ{!5<-yÒr¶éËQ[þ'²´×î!UT Ì«¾\`Ì»¡¾ ÌË±¾àÌÛÁ¾ ¼-äÉ|ãKcÌ%W¿e¼mäI}ãOcÐ%_¿¥¼­äÉ}ãScÔ%g¿å¼íäI~ãWcØ%o¿%|-äÉ~ßK_Ì%we|mäIßO_Ð%¥|­äÉ÷þ'×ÔÓFüB6ã.í4ï¾Ö5ßìºrCV+ÄßðêÃXmÄì·­zÍÁ=JpspOîÂ½ór­÷jâÌ7aÞ?¢¿Ò¯Wíä¬ÃÜ®J§óþÿÂüzÏ°AH+nT*ºRúñbºì¯Øm°Öâ«6ë­¨ Iæc²y.øKhbùFrÔJiê¨¬C±;§°]n;þâ{\\øKÍúÌ¶ò®0­1ï\\H4-O·ËºËðH²ø>vM	Åý7óãíj~c3ä=}bXýºÁrÍ*´=}¸]ÔKZìöBÉ¬ÿ¦¸Gé1¤]9ésë¸©6E]zÃâöÐõH±ð&^H®ù°úÖðOB~=}NYlt<h£<h5X"ñ:ºR|øìgà|-3£9@ë{Ï-/øVïz¾=JRÓâÎ¶my¨ñïOEd\\1I¬Íô*~QÆ¸ìsh®¾o¶¸¶²O1{ïhlÿ¹D)#=MxªOÚ3?C)£Å*õÔØ½;PÜJ·fbó \\ÍÀ­¼8Þf¸àsÒ³è¤:¥ã	P^WlÿJ¾¹ÀÅ¶äå@_ Ëñ3´l>«X±zð±T[kC]Fj¹}½¬l>rnÇîÞ¿B²_¸Nà/ná¹=}ï<ÌKÌîÞ­BÑ<0æ¸Òâ²uEpÎ²?=}én#RÀ³í»;}°~×Oµï	ÒÕ¡³øJ]±<ÇOf/·å¢i¾³°³2òAãÏEKUA Ñ7Æ\`Ã0pUÑùpEÑ6ÅcÅ½ÝpÇÆ¡_åµ©¥Bexù@ Ãòxý³ÞüZ=MIIÉ_Ò "¡+ÀØ/PLË(#TñZhWÝaÁ=}ÖÕÖ=@>'$\\iòC'¨)ôç*õÉÕ-ãm£­ã­c­ÖÆkÓ!²áÞ(r¹ç¹ñvâHæÞnéßö£û	aÆ ë¡#]å5Äfßïß_Èäæ°&=MÇ¥$¹xW}{#jßÑÐÚèÒûý£òÇuOfÝ=M~·=JÁ÷u/\`W0oWc¥Ü8Gþ?\`>_¾=@Á£Dý\\x"Fà¹OüU»	ÂûÈü»¦¤qÙ¶×õ ¶i NL&¯ËÝEm@÷Åh4¦]øFÛ¾¨äÚäâÔÜÌKÙàÒðWáI bäm¥' nustôMw£ÇÓ9§ùï!QÇß8±=}ðMÈ·Ä3ÉOîEËõKõº%LÁÜåg¿?àÖP¡}(³Ì8!CÉ=MæÍùgä&Ýß.Ü(½³Ãw'q]°eÜÛñø\`ä"=J=@ôV[²%$¥èaò><D@;?G=}¥©W=@®®nhrÝÆÞ÷à¤Ïé`, new Uint8Array(89469));

var HEAP8, HEAP16, HEAP32, HEAPU8, HEAPU16, HEAPU32, HEAPF32, HEAPF64;

var wasmMemory, buffer, wasmTable;

function updateGlobalBufferAndViews(b) {
 buffer = b;
 HEAP8 = new Int8Array(b);
 HEAP16 = new Int16Array(b);
 HEAP32 = new Int32Array(b);
 HEAPU8 = new Uint8Array(b);
 HEAPU16 = new Uint16Array(b);
 HEAPU32 = new Uint32Array(b);
 HEAPF32 = new Float32Array(b);
 HEAPF64 = new Float64Array(b);
}

function JS_cos(x) {
 return Math.cos(x);
}

function JS_exp(x) {
 return Math.exp(x);
}

function _emscripten_memcpy_big(dest, src, num) {
 HEAPU8.copyWithin(dest, src, src + num);
}

function abortOnCannotGrowMemory(requestedSize) {
 abort("OOM");
}

function _emscripten_resize_heap(requestedSize) {
 var oldSize = HEAPU8.length;
 requestedSize = requestedSize >>> 0;
 abortOnCannotGrowMemory(requestedSize);
}

var asmLibraryArg = {
 "b": JS_cos,
 "a": JS_exp,
 "c": _emscripten_memcpy_big,
 "d": _emscripten_resize_heap
};

function initRuntime(asm) {
 asm["f"]();
}

var imports = {
 "a": asmLibraryArg
};

var _opus_frame_decoder_create, _malloc, _opus_frame_decode_float_deinterleaved, _opus_frame_decoder_destroy, _free;

WebAssembly.instantiate(Module["wasm"], imports).then(function(output) {
 var asm = output.instance.exports;
 _opus_frame_decoder_create = asm["g"];
 _malloc = asm["h"];
 _opus_frame_decode_float_deinterleaved = asm["i"];
 _opus_frame_decoder_destroy = asm["j"];
 _free = asm["k"];
 wasmTable = asm["l"];
 wasmMemory = asm["e"];
 updateGlobalBufferAndViews(wasmMemory.buffer);
 initRuntime(asm);
 ready();
});

this.ready = new Promise(resolve => {
 ready = resolve;
}).then(() => {
 this.HEAP = buffer;
 this._malloc = _malloc;
 this._free = _free;
 this._opus_frame_decoder_create = _opus_frame_decoder_create;
 this._opus_frame_decode_float_deinterleaved = _opus_frame_decode_float_deinterleaved;
 this._opus_frame_decoder_destroy = _opus_frame_decoder_destroy;
});
}}

/***/ }),

/***/ "./node_modules/opus-decoder/src/OpusDecoder.js":
/*!******************************************************!*\
  !*** ./node_modules/opus-decoder/src/OpusDecoder.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return OpusDecoder; });
/* harmony import */ var _wasm_audio_decoders_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wasm-audio-decoders/common */ "./node_modules/@wasm-audio-decoders/common/index.js");
/* harmony import */ var _EmscriptenWasm_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EmscriptenWasm.js */ "./node_modules/opus-decoder/src/EmscriptenWasm.js");




class OpusDecoder {
  constructor(_WASMAudioDecoderCommon, _EmscriptenWASM) {
    this._isWebWorker = _WASMAudioDecoderCommon && _EmscriptenWASM;
    this._WASMAudioDecoderCommon =
      _WASMAudioDecoderCommon || _wasm_audio_decoders_common__WEBPACK_IMPORTED_MODULE_0__["WASMAudioDecoderCommon"];
    this._EmscriptenWASM = _EmscriptenWASM || _EmscriptenWasm_js__WEBPACK_IMPORTED_MODULE_1__["default"];

    this._inputPtrSize = (0.12 * 510000) / 8;
    this._outputPtrSize = 120 * 48;
    this._channelsOut = 2;

    this._ready = this._init();
  }

  // injects dependencies when running as a web worker
  async _init() {
    this._common = await this._WASMAudioDecoderCommon.initWASMAudioDecoder.bind(
      this
    )();

    this._decoder = this._common.wasm._opus_frame_decoder_create();
  }

  get ready() {
    return this._ready;
  }

  async reset() {
    this.free();
    await this._init();
  }

  free() {
    this._common.wasm._opus_frame_decoder_destroy(this._decoder);

    this._common.free();
  }

  decodeFrame(opusFrame) {
    if (!(opusFrame instanceof Uint8Array))
      throw Error(
        `Data to decode must be Uint8Array. Instead got ${typeof opusFrame}`
      );

    this._input.set(opusFrame);

    const samplesDecoded =
      this._common.wasm._opus_frame_decode_float_deinterleaved(
        this._decoder,
        this._inputPtr,
        opusFrame.length,
        this._leftPtr,
        this._rightPtr
      );

    return this._WASMAudioDecoderCommon.getDecodedAudio(
      [
        this._leftArr.slice(0, samplesDecoded),
        this._rightArr.slice(0, samplesDecoded),
      ],
      samplesDecoded,
      48000
    );
  }

  decodeFrames(opusFrames) {
    let left = [],
      right = [],
      samples = 0;

    opusFrames.forEach((frame) => {
      const { channelData, samplesDecoded } = this.decodeFrame(frame);

      left.push(channelData[0]);
      right.push(channelData[1]);
      samples += samplesDecoded;
    });

    return this._WASMAudioDecoderCommon.getDecodedAudioConcat(
      [left, right],
      samples,
      48000
    );
  }
}


/***/ }),

/***/ "./node_modules/opus-decoder/src/OpusDecoderWebWorker.js":
/*!***************************************************************!*\
  !*** ./node_modules/opus-decoder/src/OpusDecoderWebWorker.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return OpusDecoderWebWorker; });
/* harmony import */ var _wasm_audio_decoders_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wasm-audio-decoders/common */ "./node_modules/@wasm-audio-decoders/common/index.js");
/* harmony import */ var _EmscriptenWasm_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EmscriptenWasm.js */ "./node_modules/opus-decoder/src/EmscriptenWasm.js");
/* harmony import */ var _OpusDecoder_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OpusDecoder.js */ "./node_modules/opus-decoder/src/OpusDecoder.js");




class OpusDecoderWebWorker extends _wasm_audio_decoders_common__WEBPACK_IMPORTED_MODULE_0__["WASMAudioDecoderWorker"] {
  constructor() {
    super(_OpusDecoder_js__WEBPACK_IMPORTED_MODULE_2__["default"], _EmscriptenWasm_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
  }

  async decodeFrame(data) {
    return this._postToDecoder("decodeFrame", data);
  }

  async decodeFrames(data) {
    return this._postToDecoder("decodeFrames", data);
  }
}


/***/ }),

/***/ "./node_modules/web-worker/cjs/browser.js":
/*!************************************************!*\
  !*** ./node_modules/web-worker/cjs/browser.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
module.exports = Worker;

/***/ })

}]);