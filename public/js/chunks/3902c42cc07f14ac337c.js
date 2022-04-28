(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./node_modules/codec-parser/index.js":
/*!********************************************!*\
  !*** ./node_modules/codec-parser/index.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_CodecParser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/CodecParser */ "./node_modules/codec-parser/src/CodecParser.js");


/* harmony default export */ __webpack_exports__["default"] = (_src_CodecParser__WEBPACK_IMPORTED_MODULE_0__["default"]);


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
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilities */ "./node_modules/codec-parser/src/utilities.js");
/* harmony import */ var _codecs_mpeg_MPEGParser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./codecs/mpeg/MPEGParser */ "./node_modules/codec-parser/src/codecs/mpeg/MPEGParser.js");
/* harmony import */ var _codecs_aac_AACParser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./codecs/aac/AACParser */ "./node_modules/codec-parser/src/codecs/aac/AACParser.js");
/* harmony import */ var _codecs_ogg_OggParser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./codecs/ogg/OggParser */ "./node_modules/codec-parser/src/codecs/ogg/OggParser.js");
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
  constructor(mimeType, { onCodecUpdate, onCodec } = {}) {
    this._inputMimeType = mimeType;
    this._onCodecUpdate = onCodecUpdate || noOp;
    this._onCodec = onCodec || noOp;

    if (this._inputMimeType.match(/aac/)) {
      this._codecParser = new _codecs_aac_AACParser__WEBPACK_IMPORTED_MODULE_2__["default"](this._onCodecUpdate, this._onCodec);
    } else if (this._inputMimeType.match(/mpeg/)) {
      this._codecParser = new _codecs_mpeg_MPEGParser__WEBPACK_IMPORTED_MODULE_1__["default"](this._onCodecUpdate, this._onCodec);
    } else if (this._inputMimeType.match(/ogg/)) {
      this._codecParser = new _codecs_ogg_OggParser__WEBPACK_IMPORTED_MODULE_3__["default"](this._onCodecUpdate, this._onCodec);
    } else {
      throw new Error(`Unsupported Codec ${mimeType}`);
    }

    this._frameNumber = 0;
    this._totalBytesOut = 0;
    this._totalSamples = 0;

    this._frames = [];
    this._codecData = new Uint8Array(0);

    this._generator = this._generator();
    this._generator.next();
  }

  /**
   * @public
   * @returns The detected codec
   */
  get codec() {
    return this._codecParser.codec;
  }

  /**
   * @public
   * @description Returns an iterator for the passed in codec data.
   * @param {Uint8Array} chunk Next chunk of codec data to read
   * @returns {IterableIterator} Iterator that operates over the codec data.
   * @yields {Uint8Array} Codec Frames
   */
  *iterator(chunk) {
    for (
      let i = this._generator.next(chunk);
      i.value;
      i = this._generator.next()
    ) {
      yield i.value;
    }
  }

  *_generator() {
    let frames = [];
    // start parsing out frames
    while (true) {
      yield* this._sendReceiveData(frames);
      frames = this._parseFrames();
    }
  }

  /**
   * @private
   */
  *_sendReceiveData(frames) {
    for (const frame of frames) {
      yield frame;
    }

    let codecData;

    do {
      codecData = yield;
    } while (!codecData);

    this._codecData = Object(_utilities__WEBPACK_IMPORTED_MODULE_0__["concatBuffers"])(this._codecData, codecData);
  }

  /**
   * @private
   */
  _parseFrames() {
    const { frames, remainingData } = this._codecParser.parseFrames(
      this._codecData
    );

    this._codecData = this._codecData.subarray(remainingData);

    return frames.map((frame) => {
      frame.frameNumber = this._frameNumber++;
      frame.totalBytesOut = this._totalBytesOut;
      frame.totalSamples = this._totalSamples;
      frame.totalDuration =
        (this._totalSamples / frame.header.sampleRate) * 1000;

      this._totalBytesOut += frame.data.length;
      this._totalSamples += frame.samples;

      return frame;
    });
  }
}


/***/ }),

/***/ "./node_modules/codec-parser/src/codecs/Frame.js":
/*!*******************************************************!*\
  !*** ./node_modules/codec-parser/src/codecs/Frame.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Frame; });
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../globals */ "./node_modules/codec-parser/src/globals.js");
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



class Frame {
  constructor(header, data, samples) {
    this.data = data || [];
    this.header = header;
    this.samples = samples;
    this.duration =
      header && samples && (this.samples / this.header.sampleRate) * 1000;
    this.frameNumber = undefined;
    this.totalBytesOut = undefined;
    this.totalSamples = undefined;
    this.totalDuration = undefined;

    _globals__WEBPACK_IMPORTED_MODULE_0__["frameStore"].set(this, { length: this.data.length });
  }
}


/***/ }),

/***/ "./node_modules/codec-parser/src/codecs/Header.js":
/*!********************************************************!*\
  !*** ./node_modules/codec-parser/src/codecs/Header.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Header; });
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../globals */ "./node_modules/codec-parser/src/globals.js");
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



class Header {
  /**
   * @private
   */
  constructor(header, isParsed) {
    _globals__WEBPACK_IMPORTED_MODULE_0__["headerStore"].set(this, header);
    _globals__WEBPACK_IMPORTED_MODULE_0__["isParsedStore"].set(this, isParsed);

    this.bitDepth = header.bitDepth;
    this.channels = header.channels;
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

  static getKey(bytes) {
    return String.fromCharCode(...bytes);
  }

  enable() {
    this._isEnabled = true;
  }

  reset() {
    this._headerCache = new Map();
    this._codecUpdateData = new WeakMap();
    this._isEnabled = false;
  }

  getHeader(key) {
    const header = this._headerCache.get(key);

    if (header) {
      if (key !== this._currentHeader) {
        this._currentHeader = key;
        this._onCodecUpdate({ ...this._codecUpdateData.get(header) });
      }
    }

    return header;
  }

  setHeader(key, header, codecUpdateFields) {
    if (this._isEnabled) {
      if (key !== this._currentHeader) {
        this._currentHeader = key;
        this._onCodecUpdate({ ...codecUpdateFields });
      }

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
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../globals */ "./node_modules/codec-parser/src/globals.js");
/* harmony import */ var _HeaderCache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HeaderCache */ "./node_modules/codec-parser/src/codecs/HeaderCache.js");
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
  constructor(onCodecUpdate) {
    this._headerCache = new _HeaderCache__WEBPACK_IMPORTED_MODULE_1__["default"](onCodecUpdate);
  }

  syncFrame(data, remainingData = 0) {
    let frame = new this.Frame(data.subarray(remainingData), this._headerCache);

    while (
      !frame.header &&
      remainingData + this._maxHeaderLength < data.length
    ) {
      remainingData += _globals__WEBPACK_IMPORTED_MODULE_0__["frameStore"].get(frame).length || 1;
      frame = new this.Frame(data.subarray(remainingData), this._headerCache);
    }

    return { frame, remainingData };
  }

  /**
   * @description Searches without as much sync logic for more resilient framing
   * @param {Uint8Array} data Codec data that should contain a sequence of known length frames.
   * @returns {object} Object containing the actual offset and frame. Frame is undefined if no valid header was found
   */
  fixedLengthFrame(data) {
    return this.fixedLengthFrameSync(data, false);
  }

  /**
   * @description Searches for Frames within bytes containing a sequence of known codec frames.
   * @param {Uint8Array} data Codec data that should contain a sequence of known length frames.
   * @returns {object} Object containing the actual offset and frame. Frame is undefined if no valid header was found
   */
  fixedLengthFrameSync(data, sync = true) {
    // initial sync
    let { frame, remainingData } = this.syncFrame(data);
    let frames = [];

    while (
      _globals__WEBPACK_IMPORTED_MODULE_0__["isParsedStore"].get(frame.header) && // was there enough data to parse the header
      _globals__WEBPACK_IMPORTED_MODULE_0__["frameStore"].get(frame).length + remainingData + this._maxHeaderLength <
        data.length // is there enough data left to form a frame and check the next frame
    ) {
      // check if there is a valid frame immediately after this frame
      const nextFrame = new this.Frame(
        data.subarray(_globals__WEBPACK_IMPORTED_MODULE_0__["frameStore"].get(frame).length + remainingData),
        this._headerCache
      );

      if (nextFrame.header || !sync) {
        // start caching when synced
        this._headerCache.enable();
        // there is a next frame, so the current frame is valid
        frames.push(frame);
        remainingData += _globals__WEBPACK_IMPORTED_MODULE_0__["frameStore"].get(frame).length;
        frame = nextFrame;

        if (!_globals__WEBPACK_IMPORTED_MODULE_0__["isParsedStore"].get(frame.header)) break; // out of data
      } else {
        // frame is invalid and must re-sync and clear cache
        this._headerCache.reset();
        remainingData++; // increment to invalidate the invalid frame
        const syncResult = this.syncFrame(data, remainingData);
        remainingData += syncResult.remainingData;
        frame = syncResult.frame;
      }
    }

    return {
      frames,
      remainingData,
    };
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
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../globals */ "./node_modules/codec-parser/src/globals.js");
/* harmony import */ var _Frame__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Frame */ "./node_modules/codec-parser/src/codecs/Frame.js");
/* harmony import */ var _AACHeader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AACHeader */ "./node_modules/codec-parser/src/codecs/aac/AACHeader.js");
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





class AACFrame extends _Frame__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(data, headerCache) {
    const header = _AACHeader__WEBPACK_IMPORTED_MODULE_2__["default"].getHeader(data, headerCache);

    super(
      header,
      header &&
        data.subarray(
          _globals__WEBPACK_IMPORTED_MODULE_0__["headerStore"].get(header).length,
          _globals__WEBPACK_IMPORTED_MODULE_0__["headerStore"].get(header).frameLength
        ),
      header && _globals__WEBPACK_IMPORTED_MODULE_0__["headerStore"].get(header).samples
    );

    _globals__WEBPACK_IMPORTED_MODULE_0__["frameStore"].get(this).length = header && _globals__WEBPACK_IMPORTED_MODULE_0__["headerStore"].get(header).frameLength;
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
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../globals */ "./node_modules/codec-parser/src/globals.js");
/* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Header */ "./node_modules/codec-parser/src/codecs/Header.js");
/* harmony import */ var _HeaderCache__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../HeaderCache */ "./node_modules/codec-parser/src/codecs/HeaderCache.js");
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
Letter 	Length (bits) 	Description
A 	12 	syncword 0xFFF, all bits must be 1
B 	1 	MPEG Version: 0 for MPEG-4, 1 for MPEG-2
C 	2 	Layer: always 0
D 	1 	protection absent, Warning, set to 1 if there is no CRC and 0 if there is CRC
E 	2 	profile, the MPEG-4 Audio Object Type minus 1
F 	4 	MPEG-4 Sampling Frequency Index (15 is forbidden)
G 	1 	private bit, guaranteed never to be used by MPEG, set to 0 when encoding, ignore when decoding
H 	3 	MPEG-4 Channel Configuration (in the case of 0, the channel configuration is sent via an inband PCE)
I 	1 	originality, set to 0 when encoding, ignore when decoding
J 	1 	home, set to 0 when encoding, ignore when decoding
K 	1 	copyrighted id bit, the next bit of a centrally registered copyright identifier, set to 0 when encoding, ignore when decoding
L 	1 	copyright id start, signals that this frame's copyright id bit is the first bit of the copyright id, set to 0 when encoding, ignore when decoding
M 	13 	frame length, this value must include 7 or 9 bytes of header length: FrameLength = (ProtectionAbsent == 1 ? 7 : 9) + size(AACFrame)
O 	11 	Buffer fullness // 0x7FF for VBR
P 	2 	Number of AAC frames (RDBs) in ADTS frame minus 1, for maximum compatibility always use 1 AAC frame per ADTS frame
Q 	16 	CRC if protection absent is 0 
*/






const mpegVersion = {
  0b00000000: "MPEG-4",
  0b00001000: "MPEG-2",
};

const layer = {
  0b00000000: "valid",
  0b00000010: "bad",
  0b00000100: "bad",
  0b00000110: "bad",
};

const protection = {
  0b00000000: "16bit CRC",
  0b00000001: "none",
};

const profile = {
  0b00000000: "AAC Main",
  0b01000000: "AAC LC (Low Complexity)",
  0b10000000: "AAC SSR (Scalable Sample Rate)",
  0b11000000: "AAC LTP (Long Term Prediction)",
};

const sampleRates = {
  0b00000000: 96000,
  0b00000100: 88200,
  0b00001000: 64000,
  0b00001100: 48000,
  0b00010000: 44100,
  0b00010100: 32000,
  0b00011000: 24000,
  0b00011100: 22050,
  0b00100000: 16000,
  0b00100100: 12000,
  0b00101000: 11025,
  0b00101100: 8000,
  0b00110000: 7350,
  0b00110100: "reserved",
  0b00111000: "reserved",
  0b00111100: "frequency is written explicitly",
};

const channelMode = {
  0b000000000: { channels: 0, description: "Defined in AOT Specific Config" },
  0b001000000: { channels: 1, description: "front-center" },
  0b010000000: { channels: 2, description: "front-left, front-right" },
  0b011000000: {
    channels: 3,
    description: "front-center, front-left, front-right",
  },
  0b100000000: {
    channels: 4,
    description: "front-center, front-left, front-right, back-center",
  },
  0b101000000: {
    channels: 5,
    description: "front-center, front-left, front-right, back-left, back-right",
  },
  0b110000000: {
    channels: 6,
    description:
      "front-center, front-left, front-right, back-left, back-right, LFE-channel",
  },
  0b111000000: {
    channels: 8,
    description:
      "front-center, front-left, front-right, side-left, side-right, back-left, back-right, LFE-channel",
  },
};

class AACHeader extends _Header__WEBPACK_IMPORTED_MODULE_1__["default"] {
  static getHeader(data, headerCache) {
    const header = {};

    // Must be at least seven bytes. Out of data
    if (data.length < 7) return new AACHeader(header, false);

    // Check header cache
    const key = _HeaderCache__WEBPACK_IMPORTED_MODULE_2__["default"].getKey([
      data[0],
      data[1],
      data[2],
      data[3] & 111111100, // frame length varies so don't cache it
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
      const mpegVersionBits = data[1] & 0b00001000;
      const layerBits = data[1] & 0b00000110;
      const protectionBit = data[1] & 0b00000001;

      header.mpegVersion = mpegVersion[mpegVersionBits];

      header.layer = layer[layerBits];
      if (header.layer === "bad") return null;

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
      if (header.sampleRate === "reserved") return null;

      header.isPrivate = !!(privateBit >> 1);

      // Byte (3,4 of 7)
      // * `.......H|HH......`: MPEG-4 Channel Configuration (in the case of 0, the channel configuration is sent via an inband PCE)
      header.channelModeBits =
        new DataView(Uint8Array.of(data[2], data[3]).buffer).getUint16() &
        0b111000000;
      header.channelMode = channelMode[header.channelModeBits].description;
      header.channels = channelMode[header.channelModeBits].channels;

      // Byte (4 of 7)
      // * `HHIJKLMM`
      // * `..I.....`: originality, set to 0 when encoding, ignore when decoding
      // * `...J....`: home, set to 0 when encoding, ignore when decoding
      // * `....K...`: copyrighted id bit, the next bit of a centrally registered copyright identifier, set to 0 when encoding, ignore when decoding
      // * `.....L..`: copyright id start, signals that this frame's copyright id bit is the first bit of the copyright id, set to 0 when encoding, ignore when decoding
      const originalBit = data[3] & 0b00100000;
      const homeBit = data[3] & 0b00001000;
      const copyrightIdBit = data[3] & 0b00001000;
      const copyrightIdStartBit = data[3] & 0b00000100;

      header.isOriginal = !!(originalBit >> 5);
      header.isHome = !!(homeBit >> 4);
      header.copyrightId = !!(copyrightIdBit >> 3);
      header.copyrightIdStart = !!(copyrightIdStartBit >> 2);
      header.bitDepth = 16;
    } else {
      Object.assign(header, cachedHeader);
    }

    // Byte (4,5,6 of 7)
    // * `.......MM|MMMMMMMM|MMM.....`: frame length, this value must include 7 or 9 bytes of header length: FrameLength = (ProtectionAbsent == 1 ? 7 : 9) + size(AACFrame)
    const frameLengthBits =
      new DataView(
        Uint8Array.of(0x00, data[3], data[4], data[5]).buffer
      ).getUint32() & 0x3ffe0;
    header.frameLength = frameLengthBits >> 5;
    if (!header.frameLength) return null;

    // Byte (6,7 of 7)
    // * `...OOOOO|OOOOOO..`: Buffer fullness
    const bufferFullnessBits =
      new DataView(Uint8Array.of(data[5], data[6]).buffer).getUint16() & 0x1ffc;
    header.bufferFullness =
      bufferFullnessBits === 0x1ffc ? "VBR" : bufferFullnessBits >> 2;

    // Byte (7 of 7)
    // * `......PP` Number of AAC frames (RDBs) in ADTS frame minus 1, for maximum compatibility always use 1 AAC frame per ADTS frame
    header.numberAACFrames = data[6] & 0b00000011;
    header.samples = 1024;

    if (!cachedHeader) {
      const {
        length,
        channelModeBits,
        profileBits,
        sampleRateBits,
        frameLength,
        bufferFullness,
        numberAACFrames,
        samples,
        ...codecUpdateFields
      } = header;
      headerCache.setHeader(key, header, codecUpdateFields);
    }
    return new AACHeader(header, true);
  }

  /**
   * @private
   * Call AACHeader.getHeader(Array<Uint8>) to get instance
   */
  constructor(header, isParsed) {
    super(header, isParsed);

    this.copyrightId = header.copyrightId;
    this.copyrightIdStart = header.copyrightIdStart;
    this.channelMode = header.channelMode;
    this.bufferFullness = header.bufferFullness;
    this.isHome = header.isHome;
    this.isOriginal = header.isOriginal;
    this.isPrivate = header.isPrivate;
    this.layer = header.layer;
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
    const header = _globals__WEBPACK_IMPORTED_MODULE_0__["headerStore"].get(this);

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
/* harmony import */ var _Parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Parser */ "./node_modules/codec-parser/src/codecs/Parser.js");
/* harmony import */ var _AACFrame__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AACFrame */ "./node_modules/codec-parser/src/codecs/aac/AACFrame.js");
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




class AACParser extends _Parser__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(onCodecUpdate, onCodec) {
    super(onCodecUpdate);
    this.Frame = _AACFrame__WEBPACK_IMPORTED_MODULE_1__["default"];
    this._maxHeaderLength = 9;

    onCodec(this.codec);
  }

  get codec() {
    return "aac";
  }

  parseFrames(data) {
    return this.fixedLengthFrameSync(data);
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
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../globals */ "./node_modules/codec-parser/src/globals.js");
/* harmony import */ var _Frame__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Frame */ "./node_modules/codec-parser/src/codecs/Frame.js");
/* harmony import */ var _FLACHeader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FLACHeader */ "./node_modules/codec-parser/src/codecs/flac/FLACHeader.js");
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





class FLACFrame extends _Frame__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(data, header) {
    const flacHeader = new _FLACHeader__WEBPACK_IMPORTED_MODULE_2__["default"](header, true);

    super(flacHeader, data, flacHeader && _globals__WEBPACK_IMPORTED_MODULE_0__["headerStore"].get(flacHeader).samples);
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
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utilities */ "./node_modules/codec-parser/src/utilities.js");
/* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Header */ "./node_modules/codec-parser/src/codecs/Header.js");
/* harmony import */ var _HeaderCache__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../HeaderCache */ "./node_modules/codec-parser/src/codecs/HeaderCache.js");
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

AAAAAAAA AAAAAABC DDDDEEEE FFFFGGGH 
(IIIIIIII...)
(JJJJJJJJ|JJJJJJJJ)
(KKKKKKKK|KKKKKKKK)
LLLLLLLLL

FLAC Frame Header
Letter 	Length (bits) 	Description
A 	13 	11111111|11111
B   1   Reserved 0 - mandatory, 1 - reserved
C 	1 	Blocking strategy, 0 - fixed, 1 - variable
D 	4   Block size in inter-channel samples
E 	4 	Sample rate
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





const blockingStrategy = {
  0b00000000: "Fixed",
  0b00000001: "Variable",
};

const blockSize = {
  0b00000000: "reserved",
  0b00010000: 192,
  0b00100000: 576,
  0b00110000: 1152,
  0b01000000: 2304,
  0b01010000: 4608,
  0b01100000: "8-bit (blocksize-1) end of header",
  0b01110000: "16-bit (blocksize-1) end of header",
  0b10000000: 256,
  0b10010000: 512,
  0b10100000: 1024,
  0b10110000: 2048,
  0b11000000: 4096,
  0b11010000: 8192,
  0b11100000: 16384,
  0b11110000: 32768,
};

const sampleRate = {
  0b00000000: "invalid", // (unsupported) get from STREAMINFO metadata block
  0b00000001: 88200,
  0b00000010: 176400,
  0b00000011: 192000,
  0b00000100: 8000,
  0b00000101: 16000,
  0b00000110: 22050,
  0b00000111: 24000,
  0b00001000: 32000,
  0b00001001: 44100,
  0b00001010: 48000,
  0b00001011: 96000,
  0b00001100: "get 8 bit sample rate (in kHz) from end of header",
  0b00001101: "get 16 bit sample rate (in Hz) from end of header",
  0b00001110: "get 16 bit sample rate (in tens of Hz) from end of header",
  0b00001111: "invalid",
};

/* prettier-ignore */
const channelAssignments = {
  0b00000000: {channels: 1, description: "mono"},
  0b00010000: {channels: 2, description: "left, right"},
  0b00100000: {channels: 3, description: "left, right, center"},
  0b00110000: {channels: 4, description: "front left, front right, back left, back right"},
  0b01000000: {channels: 5, description: "front left, front right, front center, back/surround left, back/surround right"},
  0b01010000: {channels: 6, description: "front left, front right, front center, LFE, back/surround left, back/surround right"},
  0b01100000: {channels: 7, description: "front left, front right, front center, LFE, back center, side left, side right"},
  0b01110000: {channels: 8, description: "front left, front right, front center, LFE, back left, back right, side left, side right"},
  0b10000000: {channels: 2, description: "left/side stereo: channel 0 is the left channel, channel 1 is the side(difference) channel"},
  0b10010000: {channels: 2, description: "right/side stereo: channel 0 is the side(difference) channel, channel 1 is the right channel"},
  0b10100000: {channels: 2, description: "mid/side stereo: channel 0 is the mid(average) channel, channel 1 is the side(difference) channel"},
  0b10110000: "reserved",
  0b11000000: "reserved",
  0b11010000: "reserved",
  0b11100000: "reserved",
  0b11110000: "reserved",
}

const bitDepth = {
  0b00000000: "get from STREAMINFO metadata block",
  0b00000010: 8,
  0b00000100: 12,
  0b00000110: "reserved",
  0b00001000: 16,
  0b00001010: 20,
  0b00001100: 24,
  0b00001110: "reserved",
};

class FLACHeader extends _Header__WEBPACK_IMPORTED_MODULE_1__["default"] {
  static decodeUTF8Int(data) {
    if (data[0] < 0x80) return { value: data[0], next: 1 };

    if (data === 0xff) return null; // invalid

    let next = 2,
      mask = 0xe0,
      value;

    // determine length of utf-8 character
    while ((data[0] & mask) !== ((mask << 1) & 0xff) && next < 7) {
      next++;
      mask |= mask >> 1;
    }

    if (next === 7) return null; // invalid

    const offset = (next - 1) * 6;

    // set value for the remaining bits in the length character
    value = data[0] & ((mask ^ 0xff) << offset);

    // set the remaining values
    for (let idx = 1; idx < next; idx++) {
      value |= (data[idx] & 0x3f) << (offset - 6 * idx);
    }

    return { value, next };
  }

  static getHeader(data, headerCache) {
    const header = {};

    // Must be at least 6 bytes.
    if (data.length < 6) return new FLACHeader(header, false);

    // Check header cache
    const key = _HeaderCache__WEBPACK_IMPORTED_MODULE_2__["default"].getKey(data.subarray(0, 4));
    const cachedHeader = headerCache.getHeader(key);

    if (!cachedHeader) {
      // Bytes (1-2 of 6)
      // * `11111111|111110..`: Frame sync
      // * `........|......0.`: Reserved 0 - mandatory, 1 - reserved
      if (data[0] !== 0xff || !(data[1] === 0xf8 || data[1] === 0xf9)) {
        return null;
      }

      header.length = 2;

      // Byte (2 of 6)
      // * `.......C`: Blocking strategy, 0 - fixed, 1 - variable
      header.blockingStrategyBits = data[1] & 0b00000001;
      header.blockingStrategy = blockingStrategy[header.blockingStrategyBits];

      // Byte (3 of 6)
      // * `DDDD....`: Block size in inter-channel samples
      // * `....EEEE`: Sample rate
      header.length++;
      const blockSizeBits = data[2] & 0b11110000;
      const sampleRateBits = data[2] & 0b00001111;

      header.blockSize = blockSize[blockSizeBits];
      if (header.blockSize === "reserved") return null;

      header.sampleRate = sampleRate[sampleRateBits];
      if (header.sampleRate === "invalid") return null;

      // Byte (4 of 6)
      // * `FFFF....`: Channel assignment
      // * `....GGG.`: Sample size in bits
      // * `.......H`: Reserved 0 - mandatory, 1 - reserved
      header.length++;
      if (data[3] & 0b00000001) return null;
      const channelAssignmentBits = data[3] & 0b11110000;
      const bitDepthBits = data[3] & 0b00001110;

      const channelAssignment = channelAssignments[channelAssignmentBits];
      if (channelAssignment === "reserved") return null;

      header.channels = channelAssignment.channels;
      header.channelMode = channelAssignment.description;

      header.bitDepth = bitDepth[bitDepthBits];
      if (header.bitDepth === "reserved") return null;
    } else {
      Object.assign(header, cachedHeader);
    }

    // Byte (5...)
    // * `IIIIIIII|...`: VBR block size ? sample number : frame number
    header.length = 5;

    // check if there is enough data to parse UTF8
    if (data.length < header.length + 8) return new FLACHeader(header, false);
    const decodedUtf8 = FLACHeader.decodeUTF8Int(data.subarray(4));
    if (!decodedUtf8) return null;

    if (header.blockingStrategyBits) {
      header.sampleNumber = decodedUtf8.value;
    } else {
      header.frameNumber = decodedUtf8.value;
    }

    header.length += decodedUtf8.next;

    // Byte (...)
    // * `JJJJJJJJ|(JJJJJJJJ)`: Blocksize (8/16bit custom value)
    if (typeof header.blockSize === "string") {
      if (blockSizeBits === 0b01100000) {
        // 8 bit
        if (data.length < header.length) return new FLACHeader(header, false); // out of data
        header.blockSize = data[header.length - 1] - 1;
        header.length += 1;
      } else if (blockSizeBits === 0b01110000) {
        // 16 bit
        if (data.length <= header.length) return new FLACHeader(header, false); // out of data
        header.blockSize =
          (data[header.length - 1] << 8) + data[header.length] - 1;
        header.length += 2;
      }
    }

    header.samples = header.blockSize;

    // Byte (...)
    // * `KKKKKKKK|(KKKKKKKK)`: Sample rate (8/16bit custom value)
    if (typeof header.sampleRate === "string") {
      if (sampleRateBits === 0b00001100) {
        // 8 bit
        if (data.length < header.length) return new FLACHeader(header, false); // out of data
        header.sampleRate = data[header.length - 1] - 1;
        header.length += 1;
      } else if (sampleRateBits === 0b00001101) {
        // 16 bit
        if (data.length <= header.length) return new FLACHeader(header, false); // out of data
        header.sampleRate =
          (data[header.length - 1] << 8) + data[header.length] - 1;
        header.length += 2;
      } else if (sampleRateBits === 0b00001110) {
        // 16 bit
        if (data.length <= header.length) return new FLACHeader(header, false); // out of data
        header.sampleRate =
          (data[header.length - 1] << 8) + data[header.length] - 1;
        header.length += 2;
      }
    }

    // Byte (...)
    // * `LLLLLLLL`: CRC-8
    if (data.length < header.length) return new FLACHeader(header, false); // out of data

    header.crc = data[header.length - 1];
    if (header.crc !== Object(_utilities__WEBPACK_IMPORTED_MODULE_0__["crc8"])(data.subarray(0, header.length - 1))) {
      return null;
    }

    if (!cachedHeader) {
      const {
        blockingStrategyBits,
        frameNumber,
        sampleNumber,
        samples,
        crc,
        length,
        ...codecUpdateFields
      } = header;
      headerCache.setHeader(key, header, codecUpdateFields);
    }
    return header;
  }

  /**
   * @private
   * Call FLACHeader.getHeader(Array<Uint8>) to get instance
   */
  constructor(header, isParsed) {
    super(header, isParsed);

    this.channelMode = header.channelMode;
    this.blockingStrategy = header.blockingStrategy;
    this.blockSize = header.blockSize;
    this.frameNumber = header.frameNumber;
    this.sampleNumber = header.sampleNumber;
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
/* harmony import */ var _Parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Parser */ "./node_modules/codec-parser/src/codecs/Parser.js");
/* harmony import */ var _FLACFrame__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FLACFrame */ "./node_modules/codec-parser/src/codecs/flac/FLACFrame.js");
/* harmony import */ var _FLACHeader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FLACHeader */ "./node_modules/codec-parser/src/codecs/flac/FLACHeader.js");
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





class FLACParser extends _Parser__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(onCodecUpdate, onCodec) {
    super(onCodecUpdate);
    this.Frame = _FLACFrame__WEBPACK_IMPORTED_MODULE_1__["default"];

    onCodec(this.codec);
  }

  get codec() {
    return "flac";
  }

  parseFrames(oggPage) {
    if (oggPage.header.pageSequenceNumber === 0) {
      // Identification header
      this._headerCache.enable();

      return { frames: [], remainingData: 0 };
    }

    if (oggPage.header.pageSequenceNumber === 1) {
      // Vorbis comments
      return { frames: [], remainingData: 0 };
    }

    return {
      frames: oggPage.segments
        .filter((segment) => segment[0] === 0xff) // filter out padding and other metadata frames
        .map(
          (segment) =>
            new _FLACFrame__WEBPACK_IMPORTED_MODULE_1__["default"](
              segment,
              _FLACHeader__WEBPACK_IMPORTED_MODULE_2__["default"].getHeader(segment, this._headerCache)
            )
        ),
      remainingData: 0,
    };
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
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../globals */ "./node_modules/codec-parser/src/globals.js");
/* harmony import */ var _Frame__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Frame */ "./node_modules/codec-parser/src/codecs/Frame.js");
/* harmony import */ var _MPEGHeader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MPEGHeader */ "./node_modules/codec-parser/src/codecs/mpeg/MPEGHeader.js");
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





class MPEGFrame extends _Frame__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(data, headerCache) {
    const header = _MPEGHeader__WEBPACK_IMPORTED_MODULE_2__["default"].getHeader(data, headerCache);

    super(
      header,
      header && data.subarray(0, _globals__WEBPACK_IMPORTED_MODULE_0__["headerStore"].get(header).frameLength),
      header && _globals__WEBPACK_IMPORTED_MODULE_0__["headerStore"].get(header).samples
    );
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
/* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Header */ "./node_modules/codec-parser/src/codecs/Header.js");
/* harmony import */ var _HeaderCache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../HeaderCache */ "./node_modules/codec-parser/src/codecs/HeaderCache.js");
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
  // bits | V1,L1 | V1,L2 | V1,L3 | V2,L1 | V2, L2 & L3
  0b00000000: ["free", "free", "free", "free", "free"],
  0b00010000: [32, 32, 32, 32, 8],
  0b00100000: [64, 48, 40, 48, 16],
  0b00110000: [96, 56, 48, 56, 24],
  0b01000000: [128, 64, 56, 64, 32],
  0b01010000: [160, 80, 64, 80, 40],
  0b01100000: [192, 96, 80, 96, 48],
  0b01110000: [224, 112, 96, 112, 56],
  0b10000000: [256, 128, 112, 128, 64],
  0b10010000: [288, 160, 128, 144, 80],
  0b10100000: [320, 192, 160, 160, 96],
  0b10110000: [352, 224, 192, 176, 112],
  0b11000000: [384, 256, 224, 192, 128],
  0b11010000: [416, 320, 256, 224, 144],
  0b11100000: [448, 384, 320, 256, 160],
  0b11110000: ["bad", "bad", "bad", "bad", "bad"],
};

const v1Layer1 = 0;
const v1Layer2 = 1;
const v1Layer3 = 2;
const v2Layer1 = 3;
const v2Layer23 = 4;

const layer12ModeExtensions = {
  0b00000000: "bands 4 to 31",
  0b00010000: "bands 8 to 31",
  0b00100000: "bands 12 to 31",
  0b00110000: "bands 16 to 31",
};

const layer3ModeExtensions = {
  0b00000000: "Intensity stereo off, MS stereo off",
  0b00010000: "Intensity stereo on, MS stereo off",
  0b00100000: "Intensity stereo off, MS stereo on",
  0b00110000: "Intensity stereo on, MS stereo on",
};

const layers = {
  0b00000000: { description: "reserved" },
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

const mpegVersions = {
  0b00000000: {
    description: "MPEG Version 2.5 (later extension of MPEG 2)",
    layers: "v2",
    sampleRates: {
      0b00000000: 11025,
      0b00000100: 12000,
      0b00001000: 8000,
      0b00001100: "reserved",
    },
  },
  0b00001000: { description: "reserved" },
  0b00010000: {
    description: "MPEG Version 2 (ISO/IEC 13818-3)",
    layers: "v2",
    sampleRates: {
      0b00000000: 22050,
      0b00000100: 24000,
      0b00001000: 16000,
      0b00001100: "reserved",
    },
  },
  0b00011000: {
    description: "MPEG Version 1 (ISO/IEC 11172-3)",
    layers: "v1",
    sampleRates: {
      0b00000000: 44100,
      0b00000100: 48000,
      0b00001000: 32000,
      0b00001100: "reserved",
    },
  },
};

const protection = {
  0b00000000: "16bit CRC",
  0b00000001: "none",
};

const emphasis = {
  0b00000000: "none",
  0b00000001: "50/15 ms",
  0b00000010: "reserved",
  0b00000011: "CCIT J.17",
};

const channelModes = {
  0b00000000: { channels: 2, description: "Stereo" },
  0b01000000: { channels: 2, description: "Joint stereo" },
  0b10000000: { channels: 2, description: "Dual channel" },
  0b11000000: { channels: 1, description: "Single channel (Mono)" },
};

class MPEGHeader extends _Header__WEBPACK_IMPORTED_MODULE_0__["default"] {
  static getHeader(data, headerCache) {
    const header = {};
    // Must be at least four bytes.
    if (data.length < 4) return new MPEGHeader(header, false);

    // Check header cache
    const key = _HeaderCache__WEBPACK_IMPORTED_MODULE_1__["default"].getKey(data.subarray(0, 4));
    const cachedHeader = headerCache.getHeader(key);
    if (cachedHeader) return new MPEGHeader(cachedHeader, true);

    // Frame sync (all bits must be set): `11111111|111`:
    if (data[0] !== 0xff || data[1] < 0xe0) return null;

    // Byte (2 of 4)
    // * `111BBCCD`
    // * `...BB...`: MPEG Audio version ID
    // * `.....CC.`: Layer description
    // * `.......D`: Protection bit (0 - Protected by CRC (16bit CRC follows header), 1 = Not protected)
    const mpegVersionBits = data[1] & 0b00011000;
    const layerBits = data[1] & 0b00000110;
    const protectionBit = data[1] & 0b00000001;

    header.length = 4;

    // Mpeg version (1, 2, 2.5)
    const mpegVersion = mpegVersions[mpegVersionBits];
    if (mpegVersion.description === "reserved") return null;

    // Layer (I, II, III)
    if (layers[layerBits].description === "reserved") return null;
    const layer = {
      ...layers[layerBits],
      ...layers[layerBits][mpegVersion.layers],
    };

    header.mpegVersion = mpegVersion.description;
    header.layer = layer.description;
    header.samples = layer.samples;
    header.protection = protection[protectionBit];

    // Byte (3 of 4)
    // * `EEEEFFGH`
    // * `EEEE....`: Bitrate index. 1111 is invalid, everything else is accepted
    // * `....FF..`: Sample rate
    // * `......G.`: Padding bit, 0=frame not padded, 1=frame padded
    // * `.......H`: Private bit.
    const bitrateBits = data[2] & 0b11110000;
    const sampleRateBits = data[2] & 0b00001100;
    const paddingBit = data[2] & 0b00000010;
    const privateBit = data[2] & 0b00000001;

    header.bitrate = bitrateMatrix[bitrateBits][layer.bitrateIndex];
    if (header.bitrate === "bad") return null;

    header.sampleRate = mpegVersion.sampleRates[sampleRateBits];
    if (header.sampleRate === "reserved") return null;

    header.framePadding = paddingBit >> 1 && layer.framePadding;
    header.isPrivate = !!privateBit;

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
    const modeExtensionBits = data[3] & 0b00110000;
    const copyrightBit = data[3] & 0b00001000;
    const originalBit = data[3] & 0b00000100;
    const emphasisBits = data[3] & 0b00000011;

    header.channelMode = channelModes[channelModeBits].description;
    header.channels = channelModes[channelModeBits].channels;
    header.modeExtension = layer.modeExtensions[modeExtensionBits];
    header.isCopyrighted = !!(copyrightBit >> 3);
    header.isOriginal = !!(originalBit >> 2);

    header.emphasis = emphasis[emphasisBits];
    if (header.emphasis === "reserved") return null;

    header.bitDepth = 16;

    // set header cache
    const { length, frameLength, samples, ...codecUpdateFields } = header;

    headerCache.setHeader(key, header, codecUpdateFields);
    return new MPEGHeader(header, true);
  }

  /**
   * @private
   * Call MPEGHeader.getHeader(Array<Uint8>) to get instance
   */
  constructor(header, isParsed) {
    super(header, isParsed);

    this.bitrate = header.bitrate;
    this.channelMode = header.channelMode;
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
/* harmony import */ var _Parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Parser */ "./node_modules/codec-parser/src/codecs/Parser.js");
/* harmony import */ var _MPEGFrame__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MPEGFrame */ "./node_modules/codec-parser/src/codecs/mpeg/MPEGFrame.js");
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




class MPEGParser extends _Parser__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(onCodecUpdate, onCodec) {
    super(onCodecUpdate);
    this.Frame = _MPEGFrame__WEBPACK_IMPORTED_MODULE_1__["default"];
    this._maxHeaderLength = 4;

    onCodec(this.codec);
  }

  get codec() {
    return "mpeg";
  }

  parseFrames(data) {
    return this.fixedLengthFrameSync(data);
  }
}


/***/ }),

/***/ "./node_modules/codec-parser/src/codecs/ogg/OggPage.js":
/*!*************************************************************!*\
  !*** ./node_modules/codec-parser/src/codecs/ogg/OggPage.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return OggPage; });
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../globals */ "./node_modules/codec-parser/src/globals.js");
/* harmony import */ var _Frame__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Frame */ "./node_modules/codec-parser/src/codecs/Frame.js");
/* harmony import */ var _OggPageHeader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OggPageHeader */ "./node_modules/codec-parser/src/codecs/ogg/OggPageHeader.js");
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





class OggPage extends _Frame__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(data) {
    const oggPage = _OggPageHeader__WEBPACK_IMPORTED_MODULE_2__["default"].getHeader(data);
    const pageStore = _globals__WEBPACK_IMPORTED_MODULE_0__["headerStore"].get(oggPage);

    super(
      oggPage,
      oggPage
        ? data.subarray(
            pageStore.length,
            pageStore.length + pageStore.frameLength
          )
        : []
    );

    if (_globals__WEBPACK_IMPORTED_MODULE_0__["isParsedStore"].get(oggPage)) {
      let offset = pageStore.length;

      this.segments = oggPage.pageSegmentTable.map((segmentLength) => {
        const segment = data.subarray(offset, offset + segmentLength);
        offset += segmentLength;
        return segment;
      });
      this.length = pageStore.length + pageStore.frameLength;
    }
  }
}


/***/ }),

/***/ "./node_modules/codec-parser/src/codecs/ogg/OggPageHeader.js":
/*!*******************************************************************!*\
  !*** ./node_modules/codec-parser/src/codecs/ogg/OggPageHeader.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return OggPageHeader; });
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../globals */ "./node_modules/codec-parser/src/globals.js");
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
Letter 	Length (bits) 	Description
A 	32 	0x4f676753, "OggS"
B 	8 	stream_structure_version
C 	1 	(0 no, 1 yes) continued packet
D 	1 	(0 no, 1 yes) first page of logical bitstream (bos)
E 	1 	(0 no, 1 yes) last page of logical bitstream (eos)

F 	64 	absolute granule position
        Sample Count??
G   32  stream serial number
H   32  page sequence no
I   32  page checksum
J   8   Number of page segments in the segment table
L   n   Segment table (n=page_segments+26).
        Segment table values sum to the total length of the packet.
        Last value is always < 0xFF. Last lacing value will be 0x00 if evenly divisible by 0xFF.
        
*/

const OggS = 0x4f676753;



class OggPageHeader {
  static getHeader(data) {
    const header = {};

    // Must be at least 28 bytes.
    if (data.length < 28) return new OggPageHeader(header, false);

    const view = new DataView(Uint8Array.of(...data.subarray(0, 28)).buffer);

    // Bytes (1-4 of 28)
    // Frame sync (must equal OggS): `AAAAAAAA|AAAAAAAA|AAAAAAAA|AAAAAAAA`:
    if (view.getUint32(0) !== OggS) {
      return null;
    }

    // Byte (5 of 28)
    // * `BBBBBBBB`: stream_structure_version
    header.streamStructureVersion = data[4];

    // Byte (6 of 28)
    // * `00000CDE`
    // * `00000...`: All zeros
    // * `.....C..`: (0 no, 1 yes) continued packet
    // * `......D.`: (0 no, 1 yes) first page of logical bitstream (bos)
    // * `.......E`: (0 no, 1 yes) last page of logical bitstream (eos)
    const zeros = data[5] & 0b11111000;
    const continuePacketBit = data[5] & 0b00000100;
    const firstPageBit = data[5] & 0b00000010;
    const lastPageBit = data[5] & 0b00000001;

    if (zeros) return null;
    header.isContinuedPacket = !!(continuePacketBit >> 2);
    header.isFirstPage = !!(firstPageBit >> 1);
    header.isLastPage = !!lastPageBit;

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

    if (header.length > data.length) return new OggPageHeader(header, false); // out of data

    header.frameLength = 0;
    header.pageSegmentTable = [];
    header.pageSegmentBytes = data.subarray(27, header.length);

    let segmentLength = 0;

    for (const segmentByte of header.pageSegmentBytes) {
      header.frameLength += segmentByte;
      segmentLength += segmentByte;

      if (segmentByte !== 0xff) {
        header.pageSegmentTable.push(segmentLength);
        segmentLength = 0;
      }
    }

    return new OggPageHeader(header, true);
  }

  /**
   * @private
   * Call OggPageHeader.getHeader(Array<Uint8>) to get instance
   */
  constructor(header, isParsed) {
    _globals__WEBPACK_IMPORTED_MODULE_0__["headerStore"].set(this, header);
    _globals__WEBPACK_IMPORTED_MODULE_0__["isParsedStore"].set(this, isParsed);

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

/***/ "./node_modules/codec-parser/src/codecs/ogg/OggParser.js":
/*!***************************************************************!*\
  !*** ./node_modules/codec-parser/src/codecs/ogg/OggParser.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return OggParser; });
/* harmony import */ var _Parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Parser */ "./node_modules/codec-parser/src/codecs/Parser.js");
/* harmony import */ var _OggPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OggPage */ "./node_modules/codec-parser/src/codecs/ogg/OggPage.js");
/* harmony import */ var _flac_FLACParser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../flac/FLACParser */ "./node_modules/codec-parser/src/codecs/flac/FLACParser.js");
/* harmony import */ var _opus_OpusParser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../opus/OpusParser */ "./node_modules/codec-parser/src/codecs/opus/OpusParser.js");
/* harmony import */ var _vorbis_VorbisParser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../vorbis/VorbisParser */ "./node_modules/codec-parser/src/codecs/vorbis/VorbisParser.js");
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








class OggParser extends _Parser__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(onCodecUpdate, onCodec) {
    super();
    this._onCodecUpdate = onCodecUpdate;
    this._onCodec = onCodec;
    this.Frame = _OggPage__WEBPACK_IMPORTED_MODULE_1__["default"];
    this._maxHeaderLength = 283;
    this._codec = null;
  }

  get codec() {
    return this._codec || "";
  }

  _matchBytes(matchString, bytes) {
    return String.fromCharCode(...bytes).match(matchString);
  }

  getCodec({ data }) {
    if (this._matchBytes(/\x7fFLAC/, data.subarray(0, 5))) {
      this._parser = new _flac_FLACParser__WEBPACK_IMPORTED_MODULE_2__["default"](this._onCodecUpdate, this._onCodec);
      return "flac";
    } else if (this._matchBytes(/OpusHead/, data.subarray(0, 8))) {
      this._parser = new _opus_OpusParser__WEBPACK_IMPORTED_MODULE_3__["default"](this._onCodecUpdate, this._onCodec);
      return "opus";
    } else if (this._matchBytes(/\x01vorbis/, data.subarray(0, 7))) {
      this._parser = new _vorbis_VorbisParser__WEBPACK_IMPORTED_MODULE_4__["default"](this._onCodecUpdate, this._onCodec);
      return "vorbis";
    }
  }

  parseFrames(data) {
    const oggPages = this.fixedLengthFrame(data);

    if (!oggPages.frames.length) {
      return {
        frames: [],
        remainingData: oggPages.remainingData,
      };
    }

    if (!this._codec) {
      this._codec = this.getCodec(oggPages.frames[0]);
      if (!this._codec) {
        return {
          frames: [],
          remainingData: oggPages.remainingData,
        };
      }
    }

    return {
      frames: oggPages.frames.flatMap(
        (oggPage) => this._parser.parseFrames(oggPage).frames
      ),
      remainingData: oggPages.remainingData,
    };
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
/* harmony import */ var _Frame__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Frame */ "./node_modules/codec-parser/src/codecs/Frame.js");
/* harmony import */ var _OpusHeader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OpusHeader */ "./node_modules/codec-parser/src/codecs/opus/OpusHeader.js");
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




//  0 1 2 3 4 5 6 7
// +-+-+-+-+-+-+-+-+
// | config  |s| c |
// +-+-+-+-+-+-+-+-+
const configTable = {
  0b00000000: { mode: "SILK-only", bandwidth: "NB", frameSize: 10 },
  0b00001000: { mode: "SILK-only", bandwidth: "NB", frameSize: 20 },
  0b00010000: { mode: "SILK-only", bandwidth: "NB", frameSize: 40 },
  0b00011000: { mode: "SILK-only", bandwidth: "NB", frameSize: 60 },
  0b00100000: { mode: "SILK-only", bandwidth: "MB", frameSize: 10 },
  0b00101000: { mode: "SILK-only", bandwidth: "MB", frameSize: 20 },
  0b00110000: { mode: "SILK-only", bandwidth: "MB", frameSize: 40 },
  0b00111000: { mode: "SILK-only", bandwidth: "MB", frameSize: 60 },
  0b01000000: { mode: "SILK-only", bandwidth: "WB", frameSize: 10 },
  0b01001000: { mode: "SILK-only", bandwidth: "WB", frameSize: 20 },
  0b01010000: { mode: "SILK-only", bandwidth: "WB", frameSize: 40 },
  0b01011000: { mode: "SILK-only", bandwidth: "WB", frameSize: 60 },
  0b01100000: { mode: "Hybrid", bandwidth: "SWB", frameSize: 10 },
  0b01101000: { mode: "Hybrid", bandwidth: "SWB", frameSize: 20 },
  0b01110000: { mode: "Hybrid", bandwidth: "FB", frameSize: 10 },
  0b01111000: { mode: "Hybrid", bandwidth: "FB", frameSize: 20 },
  0b10000000: { mode: "CELT-only", bandwidth: "NB", frameSize: 2.5 },
  0b10001000: { mode: "CELT-only", bandwidth: "NB", frameSize: 5 },
  0b10010000: { mode: "CELT-only", bandwidth: "NB", frameSize: 10 },
  0b10011000: { mode: "CELT-only", bandwidth: "NB", frameSize: 20 },
  0b10100000: { mode: "CELT-only", bandwidth: "WB", frameSize: 2.5 },
  0b10101000: { mode: "CELT-only", bandwidth: "WB", frameSize: 5 },
  0b10110000: { mode: "CELT-only", bandwidth: "WB", frameSize: 10 },
  0b10111000: { mode: "CELT-only", bandwidth: "WB", frameSize: 20 },
  0b11000000: { mode: "CELT-only", bandwidth: "SWB", frameSize: 2.5 },
  0b11001000: { mode: "CELT-only", bandwidth: "SWB", frameSize: 5 },
  0b11010000: { mode: "CELT-only", bandwidth: "SWB", frameSize: 10 },
  0b11011000: { mode: "CELT-only", bandwidth: "SWB", frameSize: 20 },
  0b11100000: { mode: "CELT-only", bandwidth: "FB", frameSize: 2.5 },
  0b11101000: { mode: "CELT-only", bandwidth: "FB", frameSize: 5 },
  0b11110000: { mode: "CELT-only", bandwidth: "FB", frameSize: 10 },
  0b11111000: { mode: "CELT-only", bandwidth: "FB", frameSize: 20 },
};

class OpusFrame extends _Frame__WEBPACK_IMPORTED_MODULE_0__["default"] {
  static getPacket(data) {
    const packet = {
      config: configTable[0b11111000 & data[0]],
      channels: 0b00000100 & data[0] ? 2 : 1,
      // 0: 1 frame in the packet
      // 1: 2 frames in the packet, each with equal compressed size
      // 2: 2 frames in the packet, with different compressed sizes
      // 3: an arbitrary number of frames in the packet
      code: 0b00000011 & data[0],
    };

    // https://tools.ietf.org/html/rfc6716#appendix-B
    switch (packet.code) {
      case 0:
        packet.frameCount = 1;
        return packet;
      case 1:
        packet.frameCount = 2;
        return packet;
      case 2:
        packet.frameCount = 2;
        return packet;
      case 3:
        packet.isVbr = Boolean(0b10000000 & data[1]);
        packet.hasOpusPadding = Boolean(0b01000000 & data[1]);
        packet.frameCount = 0b00111111 & data[1];
        return packet;
    }
  }

  constructor(data, header) {
    let opusHeader = new _OpusHeader__WEBPACK_IMPORTED_MODULE_1__["default"](header, true);
    const packet = OpusFrame.getPacket(data);

    super(
      opusHeader,
      data,
      opusHeader &&
        ((packet.config.frameSize * packet.frameCount) / 1000) *
          opusHeader.sampleRate
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
/* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Header */ "./node_modules/codec-parser/src/codecs/Header.js");
/* harmony import */ var _HeaderCache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../HeaderCache */ "./node_modules/codec-parser/src/codecs/HeaderCache.js");
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

Letter 	Length (bits) 	Description
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
  0b00000000: [
    "monophonic (mono)",
    "stereo (left, right)"
  ],
  0b00000001: [
    "monophonic (mono)",
    "stereo (left, right)",
    "linear surround (left, center, right)",
    "quadraphonic (front left, front right, rear left, rear right)",
    "5.0 surround (front left, front center, front right, rear left, rear right)",
    "5.1 surround (front left, front center, front right, rear left, rear right, LFE)",
    "6.1 surround (front left, front center, front right, side left, side right, rear center, LFE)",
    "7.1 surround (front left, front center, front right, side left, side right, rear left, rear right, LFE)",
  ]
};

class OpusHeader extends _Header__WEBPACK_IMPORTED_MODULE_0__["default"] {
  static getHeader(data, headerCache) {
    const header = {};
    // Must be at least 19 bytes.
    if (data.length < 19) return new OpusHeader(header, false);

    // Check header cache
    const key = _HeaderCache__WEBPACK_IMPORTED_MODULE_1__["default"].getKey(data.subarray(0, 19));
    const cachedHeader = headerCache.getHeader(key);

    if (!cachedHeader) {
      // Bytes (1-8 of 19): OpusHead - Magic Signature
      if (
        data[0] !== 0x4f ||
        data[1] !== 0x70 ||
        data[2] !== 0x75 ||
        data[3] !== 0x73 ||
        data[4] !== 0x48 ||
        data[5] !== 0x65 ||
        data[6] !== 0x61 ||
        data[7] !== 0x64
      ) {
        return null;
      }

      // Byte (9 of 19)
      // * `00000001`: Version number
      if (data[8] !== 1) return null;

      const view = new DataView(Uint8Array.of(...data.subarray(0, 19)).buffer);
      header.bitDepth = 16;

      header.length = 19;

      // Byte (10 of 19)
      // * `CCCCCCCC`: Channel Count
      header.channels = data[9];

      // Byte (11-12 of 19)
      // * `DDDDDDDD|DDDDDDDD`: Pre skip
      header.preSkip = view.getUint16(10, true);

      // Byte (13-16 of 19)
      // * `EEEEEEEE|EEEEEEEE|EEEEEEEE|EEEEEEEE`: Sample Rate
      header.inputSampleRate = view.getUint32(12, true);
      // Opus is always decoded at 48kHz
      header.sampleRate = 48000;

      // Byte (17-18 of 19)
      // * `FFFFFFFF|FFFFFFFF`: Output Gain
      header.outputGain = view.getInt16(16, true);

      // Byte (19 of 19)
      // * `GGGGGGGG`: Channel Mapping Family
      header.channelMappingFamily = data[18];
      if (!header.channelMappingFamily in channelMappingFamilies) return null;

      header.channelMode =
        channelMappingFamilies[header.channelMappingFamily][
          header.channels - 1
        ];
      if (!header.channelMode) return null;
    } else {
      Object.assign(header, cachedHeader);
    }

    if (header.channelMappingFamily !== 0) {
      header.length += 2 + header.channels;
      if (data.length < header.length) return new OpusHeader(header, false); // out of data

      // * `HHHHHHHH`: Stream count
      header.streamCount = data[19];

      // * `IIIIIIII`: Coupled Stream count
      header.coupledStreamCount = data[20];

      // * `JJJJJJJJ|...` Channel Mapping table
      header.channelMappingTable = data.subarray(21, header.channels + 21);
    }

    header.data = Uint8Array.of(...data.subarray(0, header.length));

    if (!cachedHeader) {
      // set header cache
      const {
        length,
        data,
        channelMappingFamily,
        ...codecUpdateFields
      } = header;

      headerCache.setHeader(key, header, codecUpdateFields);
    }

    return new OpusHeader(header, true);
  }

  /**
   * @private
   * Call OpusHeader.getHeader(Array<Uint8>) to get instance
   */
  constructor(header, isParsed) {
    super(header, isParsed);

    this.data = header.data;
    this.channelMappingFamily = header.channelMappingFamily;
    this.channelMode = header.channelMode;
    this.coupledStreamCount = header.coupledStreamCount;
    this.preSkip = header.preSkip;
    this.outputGain = header.outputGain;
    this.inputSampleRate = header.inputSampleRate;
    this.streamCount = header.streamCount;
    this.channelMappingTable = header.channelMappingTable;
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
/* harmony import */ var _Parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Parser */ "./node_modules/codec-parser/src/codecs/Parser.js");
/* harmony import */ var _OpusFrame__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OpusFrame */ "./node_modules/codec-parser/src/codecs/opus/OpusFrame.js");
/* harmony import */ var _OpusHeader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OpusHeader */ "./node_modules/codec-parser/src/codecs/opus/OpusHeader.js");
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





class OpusParser extends _Parser__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(onCodecUpdate, onCodec) {
    super(onCodecUpdate);
    this.Frame = _OpusFrame__WEBPACK_IMPORTED_MODULE_1__["default"];
    this._identificationHeader = null;
    this._maxHeaderLength = 26;

    onCodec(this.codec);
  }

  get codec() {
    return "opus";
  }

  parseFrames(oggPage) {
    if (oggPage.header.pageSequenceNumber === 0) {
      this._headerCache.enable();

      this._identificationHeader = _OpusHeader__WEBPACK_IMPORTED_MODULE_2__["default"].getHeader(
        oggPage.data,
        this._headerCache
      );
      return { frames: [], remainingData: 0 };
    }

    if (oggPage.header.pageSequenceNumber === 1) {
      // OpusTags
      return { frames: [], remainingData: 0 };
    }

    return {
      frames: oggPage.segments.map(
        (segment) => new _OpusFrame__WEBPACK_IMPORTED_MODULE_1__["default"](segment, this._identificationHeader)
      ),
      remainingData: 0,
    };
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
/* harmony import */ var _Frame__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Frame */ "./node_modules/codec-parser/src/codecs/Frame.js");
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



class VorbisFrame extends _Frame__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
/* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Header */ "./node_modules/codec-parser/src/codecs/Header.js");
/* harmony import */ var _HeaderCache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../HeaderCache */ "./node_modules/codec-parser/src/codecs/HeaderCache.js");
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




/* prettier-ignore */
const blockSizes = {
  0b0110: 64,
  0b0111: 128,
  0b1000: 256,
  0b1001: 512,
  0b1010: 1024,
  0b1011: 2048,
  0b1100: 4096,
  0b1101: 8192
};

class VorbisHeader extends _Header__WEBPACK_IMPORTED_MODULE_0__["default"] {
  static getHeader(data, headerCache) {
    const header = { length: 30 };

    // Must be at least 30 bytes.
    if (data.length < 30) return new VorbisHeader(header, false);

    // Check header cache
    const key = _HeaderCache__WEBPACK_IMPORTED_MODULE_1__["default"].getKey(data.subarray(0, 30));
    const cachedHeader = headerCache.getHeader(key);
    if (cachedHeader) return new VorbisHeader(cachedHeader, true);

    // Bytes (1-7 of 30): /01vorbis - Magic Signature
    if (
      data[0] !== 0x01 || // identification header packet type
      data[1] !== 0x76 || // v
      data[2] !== 0x6f || // o
      data[3] !== 0x72 || // r
      data[4] !== 0x62 || // b
      data[5] !== 0x69 || // i
      data[6] !== 0x73 //    s
    ) {
      return null;
    }

    header.data = Uint8Array.of(...data.subarray(0, 30));
    const view = new DataView(header.data.buffer);

    // Byte (8-11 of 30)
    // * `CCCCCCCC|CCCCCCCC|CCCCCCCC|CCCCCCCC`: Version number
    header.version = view.getUint32(7, true);
    if (header.version !== 0) return null;

    // Byte (12 of 30)
    // * `DDDDDDDD`: Channel Count
    header.channels = data[11];

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

    // Byte (29 of 30)
    // * `00000001` Framing bit
    if (data[29 !== 0x01]) return null;

    header.bitDepth = 32;

    {
      // set header cache
      const { length, data, version, ...codecUpdateFields } = header;
      headerCache.setHeader(key, header, codecUpdateFields);
    }

    return new VorbisHeader(header, true);
  }

  /**
   * @private
   * Call VorbisHeader.getHeader(Array<Uint8>) to get instance
   */
  constructor(header, isParsed) {
    super(header, isParsed);

    this.bitrateMaximum = header.bitrateMaximum;
    this.bitrateMinimum = header.bitrateMinimum;
    this.bitrateNominal = header.bitrateNominal;
    this.blocksize0 = header.blocksize0;
    this.blocksize1 = header.blocksize1;
    this.data = header.data;
    this.vorbisComments = undefined; // set during ogg parsing
    this.vorbisSetup = undefined; // set during ogg parsing
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
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utilities */ "./node_modules/codec-parser/src/utilities.js");
/* harmony import */ var _Parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Parser */ "./node_modules/codec-parser/src/codecs/Parser.js");
/* harmony import */ var _VorbisFrame__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VorbisFrame */ "./node_modules/codec-parser/src/codecs/vorbis/VorbisFrame.js");
/* harmony import */ var _VorbisHeader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./VorbisHeader */ "./node_modules/codec-parser/src/codecs/vorbis/VorbisHeader.js");
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






class VorbisParser extends _Parser__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(onCodecUpdate, onCodec) {
    super(onCodecUpdate);
    this.Frame = _VorbisFrame__WEBPACK_IMPORTED_MODULE_2__["default"];
    this._maxHeaderLength = 29;

    onCodec(this.codec);

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

  parseFrames(oggPage) {
    if (oggPage.header.pageSequenceNumber === 0) {
      this._headerCache.enable();

      this._identificationHeader = _VorbisHeader__WEBPACK_IMPORTED_MODULE_3__["default"].getHeader(
        oggPage.data,
        this._headerCache
      );

      return { frames: [], remainingData: 0 };
    }

    if (oggPage.header.pageSequenceNumber === 1) {
      // gather WEBM CodecPrivate data
      this._identificationHeader.vorbisComments = oggPage.segments[0];
      this._identificationHeader.vorbisSetup = oggPage.segments[1];

      this._mode = this._parseSetupHeader(oggPage.segments[1]);

      return { frames: [], remainingData: 0 };
    }

    return {
      frames: oggPage.segments.map(
        (segment) =>
          new _VorbisFrame__WEBPACK_IMPORTED_MODULE_2__["default"](
            segment,
            this._identificationHeader,
            this._getSamples(segment)
          )
      ),
      remainingData: 0,
    };
  }

  _getSamples(segment) {
    const byte = segment[0] >> 1;

    const blockFlag = this._mode[byte & this._mode.mask];

    // is this a large window
    if (blockFlag) {
      this._prevBlockSize =
        byte & this._mode.prevMask
          ? this._identificationHeader.blocksize1
          : this._identificationHeader.blocksize0;
    }

    this._currBlockSize = blockFlag
      ? this._identificationHeader.blocksize1
      : this._identificationHeader.blocksize0;

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
    const bitReader = new _utilities__WEBPACK_IMPORTED_MODULE_0__["BitReader"](setup);

    let mode = {
      count: 0,
    };

    // sync with the framing bit
    while ((bitReader.read(1) & 0x01) !== 1) {}

    let modeBits;
    // search in reverse to parse out the mode entries
    // limit mode count to 63 so previous block flag will be in first packet byte
    while (mode.count < 64 && bitReader.position > 0) {
      const mapping = Object(_utilities__WEBPACK_IMPORTED_MODULE_0__["reverse"])(bitReader.read(8));
      if (mapping in mode) {
        Object(_utilities__WEBPACK_IMPORTED_MODULE_0__["logError"])(
          "received duplicate mode mapping, failed to parse vorbis modes"
        );
        throw new Error("Failed to read Vorbis stream");
      }

      // 16 bits transform type, 16 bits window type, all values must be zero
      let i = 0;
      while (bitReader.read(8) === 0x00 && i++ < 3) {} // a non-zero value may indicate the end of the mode entries, or a read error

      if (i === 4) {
        // transform type and window type were all zeros
        modeBits = bitReader.read(7); // modeBits may need to be used in the next iteration if this is the last mode entry
        mode[mapping] = modeBits & 0x01; // read and store mode -> block flag mapping
        bitReader.position += 6; // go back 6 bits so next iteration starts right after the block flag
        mode.count++;
      } else {
        // transform type and window type were not all zeros
        // check for mode count using previous iteration modeBits
        if (((Object(_utilities__WEBPACK_IMPORTED_MODULE_0__["reverse"])(modeBits) & 0b01111110) >> 1) + 1 !== mode.count) {
          Object(_utilities__WEBPACK_IMPORTED_MODULE_0__["logError"])(
            "mode count did not match actual modes, failed to parse vorbis modes"
          );
          throw new Error("Failed to read Vorbis stream");
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

/***/ "./node_modules/codec-parser/src/globals.js":
/*!**************************************************!*\
  !*** ./node_modules/codec-parser/src/globals.js ***!
  \**************************************************/
/*! exports provided: isParsedStore, headerStore, frameStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isParsedStore", function() { return isParsedStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "headerStore", function() { return headerStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "frameStore", function() { return frameStore; });
const isParsedStore = new WeakMap();
const headerStore = new WeakMap();
const frameStore = new WeakMap();


/***/ }),

/***/ "./node_modules/codec-parser/src/utilities.js":
/*!****************************************************!*\
  !*** ./node_modules/codec-parser/src/utilities.js ***!
  \****************************************************/
/*! exports provided: crc8, reverse, logError, concatBuffers, BitReader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "crc8", function() { return crc8; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reverse", function() { return reverse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logError", function() { return logError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "concatBuffers", function() { return concatBuffers; });
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

const logError = (...messages) => {
  console.error(
    "codec-parser",
    messages.reduce((acc, message) => acc + "\n  " + message, "")
  );
};

// https://pycrc.org/

// prettier-ignore
const crc8Table = new Int32Array([
  0x00,0x07,0x0e,0x09,0x1c,0x1b,0x12,0x15,0x38,0x3f,0x36,0x31,0x24,0x23,0x2a,0x2d,
  0x70,0x77,0x7e,0x79,0x6c,0x6b,0x62,0x65,0x48,0x4f,0x46,0x41,0x54,0x53,0x5a,0x5d,
  0xe0,0xe7,0xee,0xe9,0xfc,0xfb,0xf2,0xf5,0xd8,0xdf,0xd6,0xd1,0xc4,0xc3,0xca,0xcd,
  0x90,0x97,0x9e,0x99,0x8c,0x8b,0x82,0x85,0xa8,0xaf,0xa6,0xa1,0xb4,0xb3,0xba,0xbd,
  0xc7,0xc0,0xc9,0xce,0xdb,0xdc,0xd5,0xd2,0xff,0xf8,0xf1,0xf6,0xe3,0xe4,0xed,0xea,
  0xb7,0xb0,0xb9,0xbe,0xab,0xac,0xa5,0xa2,0x8f,0x88,0x81,0x86,0x93,0x94,0x9d,0x9a,
  0x27,0x20,0x29,0x2e,0x3b,0x3c,0x35,0x32,0x1f,0x18,0x11,0x16,0x03,0x04,0x0d,0x0a,
  0x57,0x50,0x59,0x5e,0x4b,0x4c,0x45,0x42,0x6f,0x68,0x61,0x66,0x73,0x74,0x7d,0x7a,
  0x89,0x8e,0x87,0x80,0x95,0x92,0x9b,0x9c,0xb1,0xb6,0xbf,0xb8,0xad,0xaa,0xa3,0xa4,
  0xf9,0xfe,0xf7,0xf0,0xe5,0xe2,0xeb,0xec,0xc1,0xc6,0xcf,0xc8,0xdd,0xda,0xd3,0xd4,
  0x69,0x6e,0x67,0x60,0x75,0x72,0x7b,0x7c,0x51,0x56,0x5f,0x58,0x4d,0x4a,0x43,0x44,
  0x19,0x1e,0x17,0x10,0x05,0x02,0x0b,0x0c,0x21,0x26,0x2f,0x28,0x3d,0x3a,0x33,0x34,
  0x4e,0x49,0x40,0x47,0x52,0x55,0x5c,0x5b,0x76,0x71,0x78,0x7f,0x6a,0x6d,0x64,0x63,
  0x3e,0x39,0x30,0x37,0x22,0x25,0x2c,0x2b,0x06,0x01,0x08,0x0f,0x1a,0x1d,0x14,0x13,
  0xae,0xa9,0xa0,0xa7,0xb2,0xb5,0xbc,0xbb,0x96,0x91,0x98,0x9f,0x8a,0x8d,0x84,0x83,
  0xde,0xd9,0xd0,0xd7,0xc2,0xc5,0xcc,0xcb,0xe6,0xe1,0xe8,0xef,0xfa,0xfd,0xf4,0xf3
]);

const crc8 = (buf) => {
  let crc;

  for (const byte of buf) {
    crc = crc8Table[(crc ^ byte) & 0xff] & 0xff;
  }

  return crc;
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

/***/ "./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/src/IcecastMetadataReader.js":
/*!************************************************************************************************************!*\
  !*** ./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/src/IcecastMetadataReader.js ***!
  \************************************************************************************************************/
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

const MetadataParser = __webpack_require__(/*! ./MetadataParser/MetadataParser */ "./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/src/MetadataParser/MetadataParser.js");
const IcyMetadataParser = __webpack_require__(/*! ./MetadataParser/IcyMetadataParser */ "./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/src/MetadataParser/IcyMetadataParser.js");
const OggMetadataParser = __webpack_require__(/*! ./MetadataParser/OggMetadataParser */ "./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/src/MetadataParser/OggMetadataParser.js");
const DualMetadataParser = __webpack_require__(/*! ./MetadataParser/DualMetadataParser */ "./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/src/MetadataParser/DualMetadataParser.js");

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
        icecast = new _IcecastMetadataReader__WEBPACK_IMPORTED_MODULE_0___default.a({
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


/***/ }),

/***/ "./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/src/MetadataParser/DualMetadataParser.js":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/src/MetadataParser/DualMetadataParser.js ***!
  \************************************************************************************************************************/
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

const MetadataParser = __webpack_require__(/*! ./MetadataParser */ "./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/src/MetadataParser/MetadataParser.js");

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

/***/ "./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/src/MetadataParser/MetadataParser.js":
/*!********************************************************************************************************************!*\
  !*** ./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/src/MetadataParser/MetadataParser.js ***!
  \********************************************************************************************************************/
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

/***/ "./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/src/MetadataParser/OggMetadataParser.js":
/*!***********************************************************************************************************************!*\
  !*** ./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/src/MetadataParser/OggMetadataParser.js ***!
  \***********************************************************************************************************************/
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

const MetadataParser = __webpack_require__(/*! ./MetadataParser */ "./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/src/MetadataParser/MetadataParser.js");

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

/***/ "./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/src/MetadataParser/Stats.js":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/src/MetadataParser/Stats.js ***!
  \***********************************************************************************************************/
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

/***/ "./node_modules/icecast-metadata-player/src/IcecastMetadataPlayer.js":
/*!***************************************************************************!*\
  !*** ./node_modules/icecast-metadata-player/src/IcecastMetadataPlayer.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return IcecastMetadataPlayer; });
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global */ "./node_modules/icecast-metadata-player/src/global.js");
/* harmony import */ var icecast_metadata_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! icecast-metadata-js */ "./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/browser.js");
/* harmony import */ var _EventTargetPolyfill__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EventTargetPolyfill */ "./node_modules/icecast-metadata-player/src/EventTargetPolyfill.js");
/* harmony import */ var _players_MediaSourcePlayer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./players/MediaSourcePlayer */ "./node_modules/icecast-metadata-player/src/players/MediaSourcePlayer.js");
/* harmony import */ var _players_HTML5Player__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./players/HTML5Player */ "./node_modules/icecast-metadata-player/src/players/HTML5Player.js");
/**
 * @license
 * @see https://github.com/eshaz/icecast-metadata-js
 * @copyright 2021 Ethan Halsall
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
  EventClass = _EventTargetPolyfill__WEBPACK_IMPORTED_MODULE_2__["default"];
}

const player = Symbol();
const playerResetPromise = Symbol();
const events = Symbol();
const playerState = Symbol();

const onAudioPause = Symbol();
const onAudioPlay = Symbol();
const onAudioCanPlay = Symbol();
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
   * @param {number} options.icyMetaInt ICY metadata interval
   * @param {number} options.icyDetectionTimeout ICY metadata detection timeout
   *
   * @callback options.onMetadata Called with metadata when synchronized with the audio
   * @callback options.onMetadataEnqueue Called with metadata when discovered on the response
   * @callback options.onError Called with message(s) when a fallback or error condition is met
   * @callback options.onWarn Called with message(s) when a warning condition is met
   * @callback options.onPlay Called when the audio element begins playing
   * @callback options.onLoad Called when stream request is started
   * @callback options.onStreamStart Called when stream requests begins to return data
   * @callback options.onStream Called when stream data is sent to the audio element
   * @callback options.onStreamEnd Called when the stream request completes
   * @callback options.onStop Called when the stream is completely stopped and all cleanup operations are complete
   * @callback options.onRetry Called when a connection retry is attempted
   * @callback options.onRetryTimeout Called when when connections attempts have timed out
   * @callback options.onCodecUpdate Called when the audio codec information has changed
   */
  constructor(url, options = {}) {
    super();

    _global__WEBPACK_IMPORTED_MODULE_0__["p"].set(this, {
      // options
      [_global__WEBPACK_IMPORTED_MODULE_0__["endpoint"]]: url,
      [_global__WEBPACK_IMPORTED_MODULE_0__["audioElement"]]: options.audioElement || new Audio(),
      [_global__WEBPACK_IMPORTED_MODULE_0__["icyMetaInt"]]: options.icyMetaInt,
      [_global__WEBPACK_IMPORTED_MODULE_0__["icyDetectionTimeout"]]: options.icyDetectionTimeout,
      [_global__WEBPACK_IMPORTED_MODULE_0__["metadataTypes"]]: options.metadataTypes || ["icy"],
      [_global__WEBPACK_IMPORTED_MODULE_0__["hasIcy"]]: (options.metadataTypes || ["icy"]).includes("icy"),
      [_global__WEBPACK_IMPORTED_MODULE_0__["enableLogging"]]: options.enableLogging || false,
      [_global__WEBPACK_IMPORTED_MODULE_0__["retryDelayRate"]]: (options.retryDelayRate || 0.1) + 1,
      [_global__WEBPACK_IMPORTED_MODULE_0__["retryDelayMin"]]: (options.retryDelayMin || 0.5) * 1000,
      [_global__WEBPACK_IMPORTED_MODULE_0__["retryDelayMax"]]: (options.retryDelayMax || 2) * 1000,
      [_global__WEBPACK_IMPORTED_MODULE_0__["retryTimeout"]]: (options.retryTimeout || 30) * 1000,
      // callbacks
      [events]: {
        [_global__WEBPACK_IMPORTED_MODULE_0__["event"].PLAY]: options.onPlay || _global__WEBPACK_IMPORTED_MODULE_0__["noOp"],
        [_global__WEBPACK_IMPORTED_MODULE_0__["event"].LOAD]: options.onLoad || _global__WEBPACK_IMPORTED_MODULE_0__["noOp"],
        [_global__WEBPACK_IMPORTED_MODULE_0__["event"].STREAM_START]: options.onStreamStart || _global__WEBPACK_IMPORTED_MODULE_0__["noOp"],
        [_global__WEBPACK_IMPORTED_MODULE_0__["event"].STREAM]: options.onStream || _global__WEBPACK_IMPORTED_MODULE_0__["noOp"],
        [_global__WEBPACK_IMPORTED_MODULE_0__["event"].STREAM_END]: options.onStreamEnd || _global__WEBPACK_IMPORTED_MODULE_0__["noOp"],
        [_global__WEBPACK_IMPORTED_MODULE_0__["event"].METADATA]: options.onMetadata || _global__WEBPACK_IMPORTED_MODULE_0__["noOp"],
        [_global__WEBPACK_IMPORTED_MODULE_0__["event"].METADATA_ENQUEUE]: options.onMetadataEnqueue || _global__WEBPACK_IMPORTED_MODULE_0__["noOp"],
        [_global__WEBPACK_IMPORTED_MODULE_0__["event"].CODEC_UPDATE]: options.onCodecUpdate || _global__WEBPACK_IMPORTED_MODULE_0__["noOp"],
        [_global__WEBPACK_IMPORTED_MODULE_0__["event"].STOP]: options.onStop || _global__WEBPACK_IMPORTED_MODULE_0__["noOp"],
        [_global__WEBPACK_IMPORTED_MODULE_0__["event"].RETRY]: options.onRetry || _global__WEBPACK_IMPORTED_MODULE_0__["noOp"],
        [_global__WEBPACK_IMPORTED_MODULE_0__["event"].RETRY_TIMEOUT]: options.onRetryTimeout || _global__WEBPACK_IMPORTED_MODULE_0__["noOp"],
        [_global__WEBPACK_IMPORTED_MODULE_0__["event"].WARN]: (...messages) => {
          if (_global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[_global__WEBPACK_IMPORTED_MODULE_0__["enableLogging"]]) {
            console.warn(
              "icecast-metadata-js",
              messages.reduce((acc, message) => acc + "\n  " + message, "")
            );
          }
          if (options.onWarn) options.onWarn(...messages);
        },
        [_global__WEBPACK_IMPORTED_MODULE_0__["event"].ERROR]: (...messages) => {
          if (_global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[_global__WEBPACK_IMPORTED_MODULE_0__["enableLogging"]]) {
            console.error(
              "icecast-metadata-js",
              messages.reduce((acc, message) => acc + "\n  " + message, "")
            );
          }
          if (options.onError) options.onError(...messages);
        },
      },
      // variables
      [_global__WEBPACK_IMPORTED_MODULE_0__["icecastMetadataQueue"]]: new icecast_metadata_js__WEBPACK_IMPORTED_MODULE_1__["IcecastMetadataQueue"]({
        onMetadataUpdate: (...args) => this[_global__WEBPACK_IMPORTED_MODULE_0__["fireEvent"]](_global__WEBPACK_IMPORTED_MODULE_0__["event"].METADATA, ...args),
        onMetadataEnqueue: (...args) =>
          this[_global__WEBPACK_IMPORTED_MODULE_0__["fireEvent"]](_global__WEBPACK_IMPORTED_MODULE_0__["event"].METADATA_ENQUEUE, ...args),
      }),
      [resetPlayback]: () => {
        clearTimeout(_global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[retryTimeoutId]);
        this.removeEventListener(
          _global__WEBPACK_IMPORTED_MODULE_0__["event"].STREAM_START,
          _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[resetPlayback]
        );
        _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[_global__WEBPACK_IMPORTED_MODULE_0__["audioElement"]].removeEventListener(
          "waiting",
          _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[onAudioWaiting]
        );

        _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[_global__WEBPACK_IMPORTED_MODULE_0__["audioElement"]].pause();
        _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[_global__WEBPACK_IMPORTED_MODULE_0__["icecastMetadataQueue"]].purgeMetadataQueue();
        _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[playerResetPromise] = _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[player].reset();
      },
      // audio element event handlers
      [onAudioPlay]: () => {
        this.play();
      },
      [onAudioPause]: () => {
        this.stop();
      },
      [onAudioCanPlay]: () => {
        if (this.state === _global__WEBPACK_IMPORTED_MODULE_0__["state"].LOADING || this.state === _global__WEBPACK_IMPORTED_MODULE_0__["state"].RETRYING) {
          _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[_global__WEBPACK_IMPORTED_MODULE_0__["audioElement"]].play();
          this[playerState] = _global__WEBPACK_IMPORTED_MODULE_0__["state"].PLAYING;
          this[_global__WEBPACK_IMPORTED_MODULE_0__["fireEvent"]](_global__WEBPACK_IMPORTED_MODULE_0__["event"].PLAY);
        }
      },
      [onAudioError]: (e) => {
        const errors = {
          1: "MEDIA_ERR_ABORTED The fetching of the associated resource was aborted by the user's request.",
          2: "MEDIA_ERR_NETWORK Some kind of network error occurred which prevented the media from being successfully fetched, despite having previously been available.",
          3: "MEDIA_ERR_DECODE Despite having previously been determined to be usable, an error occurred while trying to decode the media resource, resulting in an error.",
          4: "MEDIA_ERR_SRC_NOT_SUPPORTED The associated resource or media provider object (such as a MediaStream) has been found to be unsuitable.",
          5: "MEDIA_ERR_ENCRYPTED",
        };
        this[_global__WEBPACK_IMPORTED_MODULE_0__["fireEvent"]](
          _global__WEBPACK_IMPORTED_MODULE_0__["event"].ERROR,
          "The audio element encountered an error",
          errors[e.target.error.code] || `Code: ${e.target.error.code}`,
          `Message: ${e.target.error.message}`
        );

        if (this.state !== _global__WEBPACK_IMPORTED_MODULE_0__["state"].RETRYING) {
          this.stop();
        } else {
          _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[resetPlayback]();
        }
      },
    });

    this[_global__WEBPACK_IMPORTED_MODULE_0__["attachAudioElement"]]();
    this[playerState] = _global__WEBPACK_IMPORTED_MODULE_0__["state"].STOPPED;

    if (_players_MediaSourcePlayer__WEBPACK_IMPORTED_MODULE_3__["default"].isSupported()) {
      _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[player] = new _players_MediaSourcePlayer__WEBPACK_IMPORTED_MODULE_3__["default"](this);
    } else {
      _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[player] = new _players_HTML5Player__WEBPACK_IMPORTED_MODULE_4__["default"](this);

      this[_global__WEBPACK_IMPORTED_MODULE_0__["fireEvent"]](
        _global__WEBPACK_IMPORTED_MODULE_0__["event"].WARN,
        `Media Source Extensions API in your browser is not supported. Using two requests, one for audio, and another for metadata.`,
        "See: https://caniuse.com/mediasource and https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API"
      );
    }
  }

  /**
   * @description Checks for MediaSource and HTML5 support for a given codec
   * @param {string} type Codec / mime-type to check
   * @returns {mediasource: string, html5: string} Object indicating if the codec is supported by MediaSource or HTML5 audio
   */
  static canPlayType(type) {
    return {
      mediasource: _players_MediaSourcePlayer__WEBPACK_IMPORTED_MODULE_3__["default"].canPlayType(type),
      html5: _players_HTML5Player__WEBPACK_IMPORTED_MODULE_4__["default"].canPlayType(type),
    };
  }

  /**
   * @returns {HTMLAudioElement} The audio element associated with this instance
   */
  get audioElement() {
    return _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[_global__WEBPACK_IMPORTED_MODULE_0__["audioElement"]];
  }

  /**
   * @returns {number} The ICY metadata interval in number of bytes for this instance
   */
  get icyMetaInt() {
    return _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[player].icyMetaInt;
  }

  /**
   * @returns {Array<Metadata>} Array of enqueued metadata objects in FILO order
   */
  get metadataQueue() {
    return _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[_global__WEBPACK_IMPORTED_MODULE_0__["icecastMetadataQueue"]].metadataQueue;
  }

  /**
   * @returns {string} The current state ("loading", "playing", "stopping", "stopped", "retrying")
   */
  get state() {
    return _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[playerState];
  }

  set [playerState](_state) {
    this.dispatchEvent(new CustomEvent(_state));
    _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[playerState] = _state;
  }

  [_global__WEBPACK_IMPORTED_MODULE_0__["attachAudioElement"]]() {
    // audio events
    const audio = _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[_global__WEBPACK_IMPORTED_MODULE_0__["audioElement"]];
    audio.addEventListener("pause", _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[onAudioPause]);
    audio.addEventListener("play", _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[onAudioPlay]);
    audio.addEventListener("canplay", _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[onAudioCanPlay]);
    audio.addEventListener("error", _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[onAudioError]);
  }

  /**
   * @description Remove event listeners from the audio element and this instance
   */
  detachAudioElement() {
    const audio = _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[_global__WEBPACK_IMPORTED_MODULE_0__["audioElement"]];
    audio.removeEventListener("pause", _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[onAudioPause]);
    audio.removeEventListener("play", _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[onAudioPlay]);
    audio.removeEventListener("canplay", _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[onAudioCanPlay]);
    audio.removeEventListener("error", _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[onAudioError]);
  }

  /**
   * @description Plays the Icecast stream
   * @async Resolves when the audio element is playing
   */
  async play() {
    if (this.state === _global__WEBPACK_IMPORTED_MODULE_0__["state"].STOPPED) {
      _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[_global__WEBPACK_IMPORTED_MODULE_0__["abortController"]] = new AbortController();
      this[playerState] = _global__WEBPACK_IMPORTED_MODULE_0__["state"].LOADING;
      this[_global__WEBPACK_IMPORTED_MODULE_0__["fireEvent"]](_global__WEBPACK_IMPORTED_MODULE_0__["event"].LOAD);

      let error;

      const tryFetching = () =>
        _global__WEBPACK_IMPORTED_MODULE_0__["p"]
          .get(this)
          [player].play()
          .catch(async (e) => {
            if (e.name !== "AbortError") {
              if (await this[_global__WEBPACK_IMPORTED_MODULE_0__["shouldRetry"]](e)) {
                this[_global__WEBPACK_IMPORTED_MODULE_0__["fireEvent"]](_global__WEBPACK_IMPORTED_MODULE_0__["event"].RETRY);
                return tryFetching();
              }

              _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[_global__WEBPACK_IMPORTED_MODULE_0__["abortController"]].abort(); // stop fetch if is wasn't aborted

              if (
                _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[playerState] !== _global__WEBPACK_IMPORTED_MODULE_0__["state"].STOPPING &&
                _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[playerState] !== _global__WEBPACK_IMPORTED_MODULE_0__["state"].STOPPED
              ) {
                this[_global__WEBPACK_IMPORTED_MODULE_0__["fireEvent"]](_global__WEBPACK_IMPORTED_MODULE_0__["event"].ERROR, e);
                error = e;
              }
            }
          });

      tryFetching().finally(() => {
        _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[resetPlayback]();

        if (error && !error.message.match(/network|fetch|offline/))
          this[_global__WEBPACK_IMPORTED_MODULE_0__["fallbackToHTML5"]]();

        this[_global__WEBPACK_IMPORTED_MODULE_0__["fireEvent"]](_global__WEBPACK_IMPORTED_MODULE_0__["event"].STOP);
        this[playerState] = _global__WEBPACK_IMPORTED_MODULE_0__["state"].STOPPED;
      });

      await new Promise((resolve) => {
        this.addEventListener(_global__WEBPACK_IMPORTED_MODULE_0__["event"].PLAY, resolve, { once: true });
      });
    }
  }

  /**
   * @description Stops playing the Icecast stream
   * @async Resolves the icecast stream has stopped
   */
  async stop() {
    if (this.state !== _global__WEBPACK_IMPORTED_MODULE_0__["state"].STOPPED && this.state !== _global__WEBPACK_IMPORTED_MODULE_0__["state"].STOPPING) {
      this[playerState] = _global__WEBPACK_IMPORTED_MODULE_0__["state"].STOPPING;
      _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[_global__WEBPACK_IMPORTED_MODULE_0__["abortController"]].abort();

      await new Promise((resolve) => {
        this.addEventListener(_global__WEBPACK_IMPORTED_MODULE_0__["event"].STOP, resolve, { once: true });
      });
    }
  }

  async [_global__WEBPACK_IMPORTED_MODULE_0__["shouldRetry"]](error) {
    if (_global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[_global__WEBPACK_IMPORTED_MODULE_0__["retryTimeout"]] === 0) return false;

    if (_global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[playerState] === _global__WEBPACK_IMPORTED_MODULE_0__["state"].RETRYING) {
      // wait for retry interval
      await new Promise((resolve) => {
        this.addEventListener(_global__WEBPACK_IMPORTED_MODULE_0__["state"].STOPPING, resolve, { once: true });

        const delay = Math.min(
          _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[_global__WEBPACK_IMPORTED_MODULE_0__["retryDelayMin"]] *
            _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[_global__WEBPACK_IMPORTED_MODULE_0__["retryDelayRate"]] ** _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[retryAttempt]++,
          _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[_global__WEBPACK_IMPORTED_MODULE_0__["retryDelayMax"]]
        ); // exponential backoff

        setTimeout(() => {
          this.removeEventListener(_global__WEBPACK_IMPORTED_MODULE_0__["state"].STOPPING, resolve);
          resolve();
        }, delay + delay * 0.3 * Math.random()); // jitter
      });

      // ensure the retry hasn't been cancelled while waiting
      return _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[playerState] === _global__WEBPACK_IMPORTED_MODULE_0__["state"].RETRYING;
    }

    if (
      _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[playerState] !== _global__WEBPACK_IMPORTED_MODULE_0__["state"].STOPPING &&
      _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[playerState] !== _global__WEBPACK_IMPORTED_MODULE_0__["state"].STOPPED &&
      (error.message.match(/network|fetch|offline|Error in body stream/i) ||
        error.name === "HTTP Response Error")
    ) {
      this[_global__WEBPACK_IMPORTED_MODULE_0__["fireEvent"]](_global__WEBPACK_IMPORTED_MODULE_0__["event"].ERROR, error);
      this[playerState] = _global__WEBPACK_IMPORTED_MODULE_0__["state"].RETRYING;
      this.addEventListener(_global__WEBPACK_IMPORTED_MODULE_0__["event"].STREAM_START, _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[resetPlayback], {
        once: true,
      });

      if (_global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[_global__WEBPACK_IMPORTED_MODULE_0__["hasIcy"]]) {
        this[_global__WEBPACK_IMPORTED_MODULE_0__["fireEvent"]](
          _global__WEBPACK_IMPORTED_MODULE_0__["event"].WARN,
          "This stream was requested with ICY metadata.",
          'If there is a CORS preflight failure, try removing "icy" from the metadataTypes option.',
          "See https://github.com/eshaz/icecast-metadata-js#cors for more details."
        );
      }

      const audioWaiting = new Promise((resolve) => {
        _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[onAudioWaiting] = resolve;
        _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[_global__WEBPACK_IMPORTED_MODULE_0__["audioElement"]].addEventListener(
          "waiting",
          _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[onAudioWaiting],
          {
            once: true,
          }
        );
      });

      // wait for whichever is longer, audio element waiting or retry timeout
      _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[retryTimeoutId] = setTimeout(() => {
        audioWaiting.then(() => {
          if (_global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[playerState] === _global__WEBPACK_IMPORTED_MODULE_0__["state"].RETRYING) {
            this[_global__WEBPACK_IMPORTED_MODULE_0__["fireEvent"]](_global__WEBPACK_IMPORTED_MODULE_0__["event"].RETRY_TIMEOUT);
            this.stop();
          }
        });
      }, _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[_global__WEBPACK_IMPORTED_MODULE_0__["retryTimeout"]]);

      _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[retryAttempt] = 0;
      return true;
    }

    return false;
  }

  [_global__WEBPACK_IMPORTED_MODULE_0__["fireEvent"]](event, ...args) {
    this.dispatchEvent(new CustomEvent(event, { detail: args }));
    _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[events][event](...args);
  }

  [_global__WEBPACK_IMPORTED_MODULE_0__["fallbackToHTML5"]]() {
    this[_global__WEBPACK_IMPORTED_MODULE_0__["fireEvent"]](
      _global__WEBPACK_IMPORTED_MODULE_0__["event"].ERROR,
      "Falling back to HTML5 audio by using two requests: one for audio, and another for metadata.",
      "See the console for details on the error."
    );

    _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[player] = new _players_HTML5Player__WEBPACK_IMPORTED_MODULE_4__["default"](this);
    _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this)[playerResetPromise].then(() => this.play());
  }
}


/***/ }),

/***/ "./node_modules/icecast-metadata-player/src/global.js":
/*!************************************************************!*\
  !*** ./node_modules/icecast-metadata-player/src/global.js ***!
  \************************************************************/
/*! exports provided: noOp, p, state, event, endpoint, metadataTypes, audioElement, icyMetaInt, icyDetectionTimeout, enableLogging, retryDelayRate, retryDelayMin, retryDelayMax, retryTimeout, fireEvent, fallbackToHTML5, attachAudioElement, shouldRetry, hasIcy, icecastMetadataQueue, abortController */
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "icyMetaInt", function() { return icyMetaInt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "icyDetectionTimeout", function() { return icyDetectionTimeout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enableLogging", function() { return enableLogging; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "retryDelayRate", function() { return retryDelayRate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "retryDelayMin", function() { return retryDelayMin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "retryDelayMax", function() { return retryDelayMax; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "retryTimeout", function() { return retryTimeout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fireEvent", function() { return fireEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fallbackToHTML5", function() { return fallbackToHTML5; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "attachAudioElement", function() { return attachAudioElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shouldRetry", function() { return shouldRetry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasIcy", function() { return hasIcy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "icecastMetadataQueue", function() { return icecastMetadataQueue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "abortController", function() { return abortController; });
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
const icyMetaInt = Symbol();
const icyDetectionTimeout = Symbol();
const enableLogging = Symbol();
const retryDelayRate = Symbol();
const retryDelayMin = Symbol();
const retryDelayMax = Symbol();
const retryTimeout = Symbol();

// methods
const fireEvent = Symbol();
const fallbackToHTML5 = Symbol();
const attachAudioElement = Symbol();
const shouldRetry = Symbol();

// variables
const hasIcy = Symbol();
const icecastMetadataQueue = Symbol();
const abortController = Symbol();


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
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../global */ "./node_modules/icecast-metadata-player/src/global.js");
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Player */ "./node_modules/icecast-metadata-player/src/players/Player.js");
/* harmony import */ var codec_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! codec-parser */ "./node_modules/codec-parser/index.js");




class HTML5Player extends _Player__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(icecast) {
    super(icecast);

    this._frame = null;
    this._audioLoaded = 0;
    this._offset = 0;

    this._audioElement.crossOrigin = "anonymous";
    this._audioElement.preload = "none";
    this._audioElement.src = this._endpoint;
  }

  static canPlayType(mimeType) {
    return new Audio().canPlayType(mimeType);
  }

  async reset() {
    if (this._icecast.state !== _global__WEBPACK_IMPORTED_MODULE_0__["state"].PLAYING) {
      this._frame = null;
      this._audioLoaded = 0;
      this._offset = 0;
      this._audioElement.removeAttribute("src");
      this._audioElement.load();
      this._audioElement.src = this._endpoint;
    }
  }

  async play() {
    const audioPromise = new Promise((resolve, reject) => {
      this._icecast.addEventListener(_global__WEBPACK_IMPORTED_MODULE_0__["state"].STOPPING, resolve, { once: true }); // short circuit when user has stopped the stream
      this._audioElement.addEventListener("playing", resolve, { once: true });
      this._audioElement.addEventListener("error", reject, { once: true });
    });

    this._audioElement.src = this._endpoint;
    this._audioElement.load();

    if (this._metadataTypes.length) {
      return audioPromise.then(async () => {
        const audioLoaded = performance.now();

        const res = await super.play();
        this._offset = performance.now() - audioLoaded;

        return res;
      });
    }

    // don't fetch metadata if there are no metadata types
    return new Promise((_, reject) => {
      const abort = () => reject(new DOMException("Aborted", "AbortError"));

      const controller = _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this._icecast)[_global__WEBPACK_IMPORTED_MODULE_0__["abortController"]];

      controller.aborted
        ? abort()
        : controller.signal.addEventListener("abort", abort, { once: true });
    });
  }

  get metadataTimestamp() {
    return this._frame ? (this._frame.totalDuration + this._offset) / 1000 : 0;
  }

  getOnStream(res) {
    this._codecParser = new codec_parser__WEBPACK_IMPORTED_MODULE_2__["default"](res.headers.get("content-type"), {
      onCodecUpdate: (...args) =>
        this._icecast[_global__WEBPACK_IMPORTED_MODULE_0__["fireEvent"]](_global__WEBPACK_IMPORTED_MODULE_0__["event"].CODEC_UPDATE, ...args),
    });

    return ({ stream }) => {
      this._icecast[_global__WEBPACK_IMPORTED_MODULE_0__["fireEvent"]](_global__WEBPACK_IMPORTED_MODULE_0__["event"].STREAM, stream);

      for (const frame of this._codecParser.iterator(stream)) {
        this._frame = frame;
      }
    };
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
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../global */ "./node_modules/icecast-metadata-player/src/global.js");
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Player */ "./node_modules/icecast-metadata-player/src/players/Player.js");
/* harmony import */ var mse_audio_wrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mse-audio-wrapper */ "./node_modules/mse-audio-wrapper/index.js");




const BUFFER = 10; // seconds of audio to store in SourceBuffer
const BUFFER_INTERVAL = 10; // seconds before removing from SourceBuffer

class MediaSourcePlayer extends _Player__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(icecast) {
    super(icecast);

    this._createMediaSource();
  }

  static isSupported() {
    try {
      new MediaSource();
    } catch {
      return false;
    }

    return true;
  }

  static canPlayType(mimeType) {
    const mapping = {
      mpeg: ['audio/mp4;codecs="mp3"'],
      aac: ['audio/mp4;codecs="mp4a.40.2"'],
      aacp: ['audio/mp4;codecs="mp4a.40.2"'],
      ogg: {
        flac: ['audio/mp4;codecs="flac"'],
        opus: ['audio/mp4;codecs="opus"', 'audio/webm;codecs="opus"'],
        vorbis: ['audio/webm;codecs="vorbis"'],
      },
    };

    if (!MediaSourcePlayer.isSupported()) return "";
    if (MediaSource.isTypeSupported(mimeType)) return "probably";

    const matches = mimeType.match(
      /^(?:application\/|audio\/|)(?<mime>[a-zA-Z]+)(?:$|;[ ]*codecs=(?:\'|\")(?<codecs>[a-zA-Z,]+)(?:\'|\"))/
    );

    if (matches) {
      const { mime, codecs } = matches.groups;

      if (mapping[mime]) {
        return (Array.isArray(mapping[mime])
          ? mapping[mime] // test codec without a container
          : codecs
          ? codecs.split(",").flatMap((codec) => mapping[mime][codec]) // test multiple codecs
          : Object.values(mapping[mime]).flat()
        ) // test all codecs within a container
          .reduce((acc, codec) => {
            if (MediaSource.isTypeSupported(codec)) {
              return acc === "" ? "maybe" : "probably";
            } else {
              return !acc ? "" : "maybe";
            }
          }, null);
      }
    }

    return "";
  }

  async reset() {
    await this._createMediaSource();
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

  getOnStream(res) {
    const sourceBufferPromise = this._getMimeType(
      res.headers.get("content-type")
    ).then((mimeType) => this._createSourceBuffer(mimeType));

    const onStream = async ({ stream }) => {
      this._icecast[_global__WEBPACK_IMPORTED_MODULE_0__["fireEvent"]](_global__WEBPACK_IMPORTED_MODULE_0__["event"].STREAM, stream);
      await sourceBufferPromise;
      await this._appendSourceBuffer(stream);
    };

    return this._mseAudioWrapper
      ? async ({ stream }) => {
          for await (const fragment of this._mseAudioWrapper.iterator(stream)) {
            await onStream({ stream: fragment });
          }
        }
      : onStream;
  }

  async _getMimeType(inputMimeType) {
    if (MediaSource.isTypeSupported(inputMimeType)) {
      return inputMimeType;
    } else {
      const mimeType = await new Promise((onMimeType) => {
        this._mseAudioWrapper = new mse_audio_wrapper__WEBPACK_IMPORTED_MODULE_2__["default"](inputMimeType, {
          onCodecUpdate: (...args) =>
            this._icecast[_global__WEBPACK_IMPORTED_MODULE_0__["fireEvent"]](_global__WEBPACK_IMPORTED_MODULE_0__["event"].CODEC_UPDATE, ...args),
          onMimeType,
        });
      });

      if (!MediaSource.isTypeSupported(mimeType)) {
        this._icecast[_global__WEBPACK_IMPORTED_MODULE_0__["fireEvent"]](
          _global__WEBPACK_IMPORTED_MODULE_0__["event"].ERROR,
          `Media Source Extensions API in your browser does not support ${inputMimeType} or ${mimeType}`,
          "See: https://caniuse.com/mediasource and https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API"
        );
        const error = new Error(`Unsupported Media Source Codec ${mimeType}`);
        error.name = "CodecError";
        throw error;
      }

      return mimeType;
    }
  }

  async _createSourceBuffer(mimeType) {
    await this._mediaSourcePromise;

    this._sourceBufferRemoved = 0;
    this._mediaSource.addSourceBuffer(mimeType).mode = "sequence";
  }

  async _createMediaSource() {
    this._mediaSource = new MediaSource();

    this._audioElement.src = URL.createObjectURL(this._mediaSource);
    this._mediaSourcePromise = new Promise((resolve) => {
      this._mediaSource.addEventListener("sourceopen", resolve, {
        once: true,
      });
    });
    return this._mediaSourcePromise;
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
    if (this._icecast.state !== _global__WEBPACK_IMPORTED_MODULE_0__["state"].STOPPING) {
      this._mediaSource.sourceBuffers[0].appendBuffer(chunk);
      await this._waitForSourceBuffer();

      if (
        this._audioElement.currentTime > BUFFER &&
        this._sourceBufferRemoved + BUFFER_INTERVAL * 1000 < Date.now()
      ) {
        this._sourceBufferRemoved = Date.now();
        this._mediaSource.sourceBuffers[0].remove(
          0,
          this._audioElement.currentTime - BUFFER
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
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../global */ "./node_modules/icecast-metadata-player/src/global.js");
/* harmony import */ var icecast_metadata_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! icecast-metadata-js */ "./node_modules/icecast-metadata-player/node_modules/icecast-metadata-js/browser.js");



class Player {
  constructor(icecast) {
    const instanceVariables = _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(icecast);

    this._icecast = icecast;
    this._audioElement = instanceVariables[_global__WEBPACK_IMPORTED_MODULE_0__["audioElement"]];
    this._endpoint = instanceVariables[_global__WEBPACK_IMPORTED_MODULE_0__["endpoint"]];
    this._metadataTypes = instanceVariables[_global__WEBPACK_IMPORTED_MODULE_0__["metadataTypes"]];
    this._icyMetaInt = instanceVariables[_global__WEBPACK_IMPORTED_MODULE_0__["icyMetaInt"]];
    this._icyDetectionTimeout = instanceVariables[_global__WEBPACK_IMPORTED_MODULE_0__["icyDetectionTimeout"]];

    this._hasIcy = instanceVariables[_global__WEBPACK_IMPORTED_MODULE_0__["hasIcy"]];
    this._icecastMetadataQueue = instanceVariables[_global__WEBPACK_IMPORTED_MODULE_0__["icecastMetadataQueue"]];
  }

  get icyMetaInt() {
    return (
      this._icecastReadableStream && this._icecastReadableStream.icyMetaInt
    );
  }

  async play() {
    return this.fetchStream().then(async (res) => {
      this._icecast[_global__WEBPACK_IMPORTED_MODULE_0__["fireEvent"]](_global__WEBPACK_IMPORTED_MODULE_0__["event"].STREAM_START);

      return this.playResponse(res).finally(() => {
        this._icecast[_global__WEBPACK_IMPORTED_MODULE_0__["fireEvent"]](_global__WEBPACK_IMPORTED_MODULE_0__["event"].STREAM_END);
      });
    });
  }

  async fetchStream() {
    const res = await fetch(this._endpoint, {
      method: "GET",
      headers: this._hasIcy ? { "Icy-MetaData": 1 } : {},
      signal: _global__WEBPACK_IMPORTED_MODULE_0__["p"].get(this._icecast)[_global__WEBPACK_IMPORTED_MODULE_0__["abortController"]].signal,
    });

    if (!res.ok) {
      const error = new Error(`${res.status} received from ${res.url}`);
      error.name = "HTTP Response Error";
      throw error;
    }

    return res;
  }

  async playResponse(res) {
    this._icecastReadableStream = new icecast_metadata_js__WEBPACK_IMPORTED_MODULE_1__["IcecastReadableStream"](res, {
      onMetadata: this.getOnMetadata(),
      onStream: this.getOnStream(res),
      onError: (...args) => this._icecast[_global__WEBPACK_IMPORTED_MODULE_0__["fireEvent"]](_global__WEBPACK_IMPORTED_MODULE_0__["event"].WARN, ...args),
      metadataTypes: this._metadataTypes,
      icyMetaInt: this._icyMetaInt,
      icyDetectionTimeout: this._icyDetectionTimeout,
    });

    await this._icecastReadableStream.startReading();
  }

  getOnMetadata() {
    return (value) => {
      this._icecastMetadataQueue.addMetadata(
        value,
        this.metadataTimestamp,
        this._audioElement.currentTime
      );
    };
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

/***/ "./node_modules/mse-audio-wrapper/index.js":
/*!*************************************************!*\
  !*** ./node_modules/mse-audio-wrapper/index.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_MSEAudioWrapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/MSEAudioWrapper */ "./node_modules/mse-audio-wrapper/src/MSEAudioWrapper.js");


/* harmony default export */ __webpack_exports__["default"] = (_src_MSEAudioWrapper__WEBPACK_IMPORTED_MODULE_0__["default"]);


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
/* harmony import */ var _containers_isobmff_ISOBMFFContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./containers/isobmff/ISOBMFFContainer */ "./node_modules/mse-audio-wrapper/src/containers/isobmff/ISOBMFFContainer.js");
/* harmony import */ var _containers_webm_WEBMContainer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./containers/webm/WEBMContainer */ "./node_modules/mse-audio-wrapper/src/containers/webm/WEBMContainer.js");
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
   * @param {object} options.preferredContainer Preferred audio container to output if multiple containers are available
   * @param {number} options.minBytesPerSegment Minimum number of bytes to process before returning a media segment
   * @param {number} options.minFramesPerSegment Minimum number of frames to process before returning a media segment
   * @param {number} options.minBytesPerSegment Minimum number of bytes to process before returning a media segment
   */
  constructor(mimeType, options = {}) {
    this._inputMimeType = mimeType;

    this.PREFERRED_CONTAINER = options.preferredContainer || "webm";
    this.MIN_FRAMES = options.minFramesPerSegment || 4;
    this.MAX_FRAMES = options.maxFramesPerSegment || 50;
    this.MIN_FRAMES_LENGTH = options.minBytesPerSegment || 1022;
    this.MAX_SAMPLES_PER_SEGMENT = Infinity;

    this._onMimeType = options.onMimeType || noOp;

    this._frames = [];
    this._codecParser = new codec_parser__WEBPACK_IMPORTED_MODULE_0__["default"](mimeType, {
      onCodec: (codec) => {
        this._container = this._getContainer(codec);
        this._onMimeType(this._mimeType);
      },
      onCodecUpdate: options.onCodecUpdate,
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
   * @param {Uint8Array} chunk Next chunk of codec data to read
   * @returns {Iterator} Iterator that operates over the codec data.
   * @yields {Uint8Array} Movie Fragments containing codec frames
   */
  *iterator(chunk) {
    this._frames.push(...this._codecParser.iterator(chunk));

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
        this._mimeType = 'audio/mp4;codecs="mp3"';
        return new _containers_isobmff_ISOBMFFContainer__WEBPACK_IMPORTED_MODULE_1__["default"]("mp3");
      case "aac":
        this._mimeType = 'audio/mp4;codecs="mp4a.40.2"';
        return new _containers_isobmff_ISOBMFFContainer__WEBPACK_IMPORTED_MODULE_1__["default"]("mp4a.40.2");
      case "flac":
        this._mimeType = 'audio/mp4;codecs="flac"';
        return new _containers_isobmff_ISOBMFFContainer__WEBPACK_IMPORTED_MODULE_1__["default"]("flac");
      case "vorbis":
        this._mimeType = 'audio/webm;codecs="vorbis"';

        this.MAX_SAMPLES_PER_SEGMENT = 32767;
        return new _containers_webm_WEBMContainer__WEBPACK_IMPORTED_MODULE_2__["default"]("vorbis");
      case "opus":
        if (this.PREFERRED_CONTAINER === "webm") {
          this._mimeType = 'audio/webm;codecs="opus"';

          this.MAX_SAMPLES_PER_SEGMENT = 32767;
          return new _containers_webm_WEBMContainer__WEBPACK_IMPORTED_MODULE_2__["default"]("opus");
        }
        this._mimeType = 'audio/mp4;codecs="opus"';
        return new _containers_isobmff_ISOBMFFContainer__WEBPACK_IMPORTED_MODULE_1__["default"]("opus");
    }
  }
}


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
/* harmony import */ var _ContainerElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ContainerElement */ "./node_modules/mse-audio-wrapper/src/containers/ContainerElement.js");
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



class Box extends _ContainerElement__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
      ..._ContainerElement__WEBPACK_IMPORTED_MODULE_0__["default"].stringToByteArray(this._name),
      ...super._buildContents(),
    ];
  }

  _buildLength() {
    if (!this._length) {
      // length bytes + name length + content length
      this._length = 4 + this._name.length + super._buildLength();
      this._lengthBytes = _ContainerElement__WEBPACK_IMPORTED_MODULE_0__["default"].getUint32(this._length);
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
/* harmony import */ var _ContainerElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ContainerElement */ "./node_modules/mse-audio-wrapper/src/containers/ContainerElement.js");
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



class ESTag extends _ContainerElement__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(tagNumber, { contents, tags } = {}) {
    super({ name: tagNumber, contents, children: tags });
  }

  static getLength(length) {
    const bytes = _ContainerElement__WEBPACK_IMPORTED_MODULE_0__["default"].getUint32(length);

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
/* harmony import */ var _ContainerElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ContainerElement */ "./node_modules/mse-audio-wrapper/src/containers/ContainerElement.js");
/* harmony import */ var _Box__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Box */ "./node_modules/mse-audio-wrapper/src/containers/isobmff/Box.js");
/* harmony import */ var _ESTag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ESTag */ "./node_modules/mse-audio-wrapper/src/containers/isobmff/ESTag.js");
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
      case "mp3":
        return this.getMp4a(header, 0x6b);
      case "mp4a.40.2":
        return this.getMp4a(header, 0x40);
      case "opus":
        return this.getOpus(header);
      case "flac":
        return this.getFlaC(header);
    }
  }

  getOpus(header) {
    // https://opus-codec.org/docs/opus_in_isobmff.html
    return new _Box__WEBPACK_IMPORTED_MODULE_1__["default"]("Opus", {
      /* prettier-ignore */
      contents: [
        0x00,0x00,0x00,0x00,0x00,0x00, // reserved
        0x00,0x01, // data reference index
        0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00, // reserved
        0x00,header.channels, // channel count
        0x00,header.bitDepth, // PCM bitrate (16bit)
        0x00,0x00, // predefined
        0x00,0x00, // reserved
        _Box__WEBPACK_IMPORTED_MODULE_1__["default"].getUint16(header.sampleRate),0x00,0x00, // sample rate 16.16 fixed-point
      ],
      children: [
        new _Box__WEBPACK_IMPORTED_MODULE_1__["default"]("dOps", {
          /* prettier-ignore */
          contents: [0x00, // version
            header.channels, // output channel count
            _Box__WEBPACK_IMPORTED_MODULE_1__["default"].getUint16(header.preSkip), // pre skip
            _Box__WEBPACK_IMPORTED_MODULE_1__["default"].getUint32(header.inputSampleRate),// input sample rate
            _Box__WEBPACK_IMPORTED_MODULE_1__["default"].getInt16(header.outputGain), // output gain
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
    return new _Box__WEBPACK_IMPORTED_MODULE_1__["default"]("fLaC", {
      /* prettier-ignore */
      contents: [
        0x00,0x00,0x00,0x00,0x00,0x00, // reserved
        0x00,0x01, // data reference index
        0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00, // reserved
        0x00,header.channels, // channel count
        0x00,header.bitDepth, // PCM bitrate (16bit)
        0x00,0x00, // predefined
        0x00,0x00, // reserved
        _Box__WEBPACK_IMPORTED_MODULE_1__["default"].getUint16(header.sampleRate),0x00,0x00, // sample rate 16.16 fixed-point
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
        new _Box__WEBPACK_IMPORTED_MODULE_1__["default"]("dfLa", {
          /* prettier-ignore */
          contents: [0x00, // version
            0x00,0x00,0x00, // flags
            // * `A........` Last metadata block flag
            // * `.BBBBBBBB` BlockType
            0x80, // last metadata block, stream info
            0x00,0x00,0x22, // Length
            _Box__WEBPACK_IMPORTED_MODULE_1__["default"].getUint16(header.blockSize), // maximum block size
            _Box__WEBPACK_IMPORTED_MODULE_1__["default"].getUint16(header.blockSize), // minimum block size
            0x00,0x00,0x00, // maximum frame size
            0x00,0x00,0x00, // minimum frame size
            _Box__WEBPACK_IMPORTED_MODULE_1__["default"].getUint32((header.sampleRate << 12) | (header.channels << 8) | ((header.bitDepth - 1) << 4)), // 20bits sample rate, 3bits channels, 5bits bitDepth - 1
            0x00,0x00,0x00,0x00, // total samples
            0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00 // md5 of stream
          ],
        }),
      ],
    });
  }

  getMp4a(header, esdsCodec) {
    const streamDescriptorTag = new _ESTag__WEBPACK_IMPORTED_MODULE_2__["default"](4, {
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
        new _ESTag__WEBPACK_IMPORTED_MODULE_2__["default"](5, {
          contents: header.audioSpecificConfig,
        })
      );
    }

    return new _Box__WEBPACK_IMPORTED_MODULE_1__["default"]("mp4a", {
      /* prettier-ignore */
      contents: [0x00,0x00,0x00,0x00,0x00,0x00, // reserved
        0x00,0x01, // data reference index
        0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00, // reserved
        0x00,header.channels, // channel count
        0x00,0x10, // PCM bitrate (16bit)
        0x00,0x00, // Compression ID
        0x00,0x00, // Packet size
        _Box__WEBPACK_IMPORTED_MODULE_1__["default"].getUint16(header.sampleRate),0x00,0x00], // sample rate unsigned floating point
      children: [
        new _Box__WEBPACK_IMPORTED_MODULE_1__["default"]("esds", {
          contents: [0x00, 0x00, 0x00, 0x00],
          children: [
            new _ESTag__WEBPACK_IMPORTED_MODULE_2__["default"](3, {
              contents: [
                0x00,
                0x01, // ES_ID = 1
                0x00, // flags etc = 0
              ],
              tags: [
                streamDescriptorTag,
                new _ESTag__WEBPACK_IMPORTED_MODULE_2__["default"](6, {
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
    return new _ContainerElement__WEBPACK_IMPORTED_MODULE_0__["default"]({
      children: [
        new _Box__WEBPACK_IMPORTED_MODULE_1__["default"]("ftyp", {
          /* prettier-ignore */
          contents: [_Box__WEBPACK_IMPORTED_MODULE_1__["default"].stringToByteArray("iso5"), // major brand
            0x00,0x00,0x02,0x00, // minor version
            _Box__WEBPACK_IMPORTED_MODULE_1__["default"].stringToByteArray("iso6mp41")], // compatible brands
        }),
        new _Box__WEBPACK_IMPORTED_MODULE_1__["default"]("moov", {
          children: [
            new _Box__WEBPACK_IMPORTED_MODULE_1__["default"]("mvhd", {
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
            new _Box__WEBPACK_IMPORTED_MODULE_1__["default"]("trak", {
              children: [
                new _Box__WEBPACK_IMPORTED_MODULE_1__["default"]("tkhd", {
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
                new _Box__WEBPACK_IMPORTED_MODULE_1__["default"]("mdia", {
                  children: [
                    new _Box__WEBPACK_IMPORTED_MODULE_1__["default"]("mdhd", {
                      /* prettier-ignore */
                      contents: [0x00, // version
                        0x00,0x00,0x00, // flags
                        0x00,0x00,0x00,0x00, // creation time (in seconds since midnight, January 1, 1904)
                        0x00,0x00,0x00,0x00, // modification time
                        _Box__WEBPACK_IMPORTED_MODULE_1__["default"].getUint32(header.sampleRate), // time scale
                        0x00,0x00,0x00,0x00, // duration
                        0x55,0xc4, // language
                        0x00,0x00], // quality
                    }),
                    new _Box__WEBPACK_IMPORTED_MODULE_1__["default"]("hdlr", {
                      /* prettier-ignore */
                      contents: [0x00, // version
                        0x00,0x00,0x00, // flags
                        _Box__WEBPACK_IMPORTED_MODULE_1__["default"].stringToByteArray('mhlr'), // component type (mhlr, dhlr)
                        _Box__WEBPACK_IMPORTED_MODULE_1__["default"].stringToByteArray('soun'), // component subtype (vide' for video data, 'soun' for sound data or ‘subt’ for subtitles)
                        0x00,0x00,0x00,0x00, // component manufacturer
                        0x00,0x00,0x00,0x00, // component flags
                        0x00,0x00,0x00,0x00, // component flags mask
                        0x00], // String that specifies the name of the component, terminated by a null character
                    }),
                    new _Box__WEBPACK_IMPORTED_MODULE_1__["default"]("minf", {
                      children: [
                        new _Box__WEBPACK_IMPORTED_MODULE_1__["default"]("stbl", {
                          children: [
                            new _Box__WEBPACK_IMPORTED_MODULE_1__["default"]("stsd", {
                              // Sample description atom
                              /* prettier-ignore */
                              contents: [0x00, // version
                                0x00,0x00,0x00, // flags
                                0x00,0x00,0x00,0x01], // entry count
                              children: [this.getCodecBox(header)],
                            }),
                            new _Box__WEBPACK_IMPORTED_MODULE_1__["default"]("stts", {
                              // Time-to-sample atom
                              /* prettier-ignore */
                              contents: [0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00],
                            }),
                            new _Box__WEBPACK_IMPORTED_MODULE_1__["default"]("stsc", {
                              // Sample-to-chunk atom
                              /* prettier-ignore */
                              contents: [0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00],
                            }),
                            new _Box__WEBPACK_IMPORTED_MODULE_1__["default"]("stsz", {
                              // Sample Size atom
                              /* prettier-ignore */
                              contents: [0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
                                0x00,0x00,0x00,0x00],
                            }),
                            new _Box__WEBPACK_IMPORTED_MODULE_1__["default"]("stco", {
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
            new _Box__WEBPACK_IMPORTED_MODULE_1__["default"]("mvex", {
              children: [
                new _Box__WEBPACK_IMPORTED_MODULE_1__["default"]("trex", {
                  /* prettier-ignore */
                  contents: [0x00,0x00,0x00,0x00, // flags
                    0x00,0x00,0x00,0x01, // track id
                    0x00,0x00,0x00,0x01, // default_sample_description_index
                    _Box__WEBPACK_IMPORTED_MODULE_1__["default"].getUint32(samples), // default_sample_duration
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

  /**
   * @description Wraps codec frames into a Movie Fragment
   * @param {Array<Frame>} frames Frames to contain in this Movie Fragment
   * @returns {Uint8Array} Movie Fragment containing the frames
   */
  getMediaSegment(frames) {
    return new _ContainerElement__WEBPACK_IMPORTED_MODULE_0__["default"]({
      children: [
        new _Box__WEBPACK_IMPORTED_MODULE_1__["default"]("moof", {
          children: [
            new _Box__WEBPACK_IMPORTED_MODULE_1__["default"]("mfhd", {
              /* prettier-ignore */
              contents: [0x00,0x00,0x00,0x00, 0x00,0x00,0x00,0x00], // sequence number
            }),
            new _Box__WEBPACK_IMPORTED_MODULE_1__["default"]("traf", {
              children: [
                new _Box__WEBPACK_IMPORTED_MODULE_1__["default"]("tfhd", {
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
                new _Box__WEBPACK_IMPORTED_MODULE_1__["default"]("tfdt", {
                  /* prettier-ignore */
                  contents: [0x00, // version
                    0x00,0x00,0x00, // flags
                    0x00,0x00,0x00,0x00], // base media decode time
                }),
                new _Box__WEBPACK_IMPORTED_MODULE_1__["default"]("trun", {
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
                    _Box__WEBPACK_IMPORTED_MODULE_1__["default"].getUint32(frames.length), // number of samples
                    _Box__WEBPACK_IMPORTED_MODULE_1__["default"].getUint32(92 + frames.length * 4), // data offset
                    ...frames.map(({data}) => _Box__WEBPACK_IMPORTED_MODULE_1__["default"].getUint32(data.length))], // samples size per frame
                }),
              ],
            }),
          ],
        }),
        new _Box__WEBPACK_IMPORTED_MODULE_1__["default"]("mdat", {
          contents: frames.map(({ data }) => data),
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
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utilities */ "./node_modules/mse-audio-wrapper/src/utilities.js");
/* harmony import */ var _ContainerElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ContainerElement */ "./node_modules/mse-audio-wrapper/src/containers/ContainerElement.js");
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




class EBML extends _ContainerElement__WEBPACK_IMPORTED_MODULE_1__["default"] {
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
      buffer = _ContainerElement__WEBPACK_IMPORTED_MODULE_1__["default"].getUint16(number);
      buffer[0] |= 0b01000000;
    } else if (number < 0x1fffff) {
      buffer = _ContainerElement__WEBPACK_IMPORTED_MODULE_1__["default"].getUint32(number).subarray(1);
      buffer[0] |= 0b00100000;
    } else if (number < 0xfffffff) {
      buffer = _ContainerElement__WEBPACK_IMPORTED_MODULE_1__["default"].getUint32(number);
      buffer[0] |= 0b00010000;
    } else if (number < 0x7ffffffff) {
      buffer = _ContainerElement__WEBPACK_IMPORTED_MODULE_1__["default"].getUint64(number).subarray(3);
      buffer[0] |= 0b00001000;
    } else if (number < 0x3ffffffffff) {
      buffer = _ContainerElement__WEBPACK_IMPORTED_MODULE_1__["default"].getUint64(number).subarray(2);
      buffer[0] |= 0b00000100;
    } else if (number < 0x1ffffffffffff) {
      buffer = _ContainerElement__WEBPACK_IMPORTED_MODULE_1__["default"].getUint64(number).subarray(1);
      buffer[0] |= 0b00000010;
    } else if (number < 0xffffffffffffff) {
      buffer = _ContainerElement__WEBPACK_IMPORTED_MODULE_1__["default"].getUint64(number);
      buffer[0] |= 0b00000001;
    } else if (typeof number !== "number" || isNaN(number)) {
      Object(_utilities__WEBPACK_IMPORTED_MODULE_0__["logError"])(
        `EBML Variable integer must be a number, instead received ${number}`
      );
      throw new Error("mse-audio-wrapper: Unable to encode WEBM");
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
/* harmony import */ var _ContainerElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ContainerElement */ "./node_modules/mse-audio-wrapper/src/containers/ContainerElement.js");
/* harmony import */ var _EBML__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EBML */ "./node_modules/mse-audio-wrapper/src/containers/webm/EBML.js");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utilities */ "./node_modules/mse-audio-wrapper/src/utilities.js");
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
      case "opus": {
        this._codecId = "A_OPUS";
        this._getCodecSpecificTrack = (header) => [
          new _EBML__WEBPACK_IMPORTED_MODULE_1__["default"](_EBML__WEBPACK_IMPORTED_MODULE_1__["id"].CodecDelay, {
            contents: _EBML__WEBPACK_IMPORTED_MODULE_1__["default"].getUint32(
              Math.round(header.preSkip * this._timestampScale)
            ),
          }), // OPUS codec delay
          new _EBML__WEBPACK_IMPORTED_MODULE_1__["default"](_EBML__WEBPACK_IMPORTED_MODULE_1__["id"].SeekPreRoll, {
            contents: _EBML__WEBPACK_IMPORTED_MODULE_1__["default"].getUint32(Math.round(3840 * this._timestampScale)),
          }), // OPUS seek preroll 80ms
          new _EBML__WEBPACK_IMPORTED_MODULE_1__["default"](_EBML__WEBPACK_IMPORTED_MODULE_1__["id"].CodecPrivate, { contents: header.data }), // OpusHead bytes
        ];
        break;
      }
      case "vorbis": {
        this._codecId = "A_VORBIS";
        this._getCodecSpecificTrack = (header) => [
          new _EBML__WEBPACK_IMPORTED_MODULE_1__["default"](_EBML__WEBPACK_IMPORTED_MODULE_1__["id"].CodecPrivate, {
            contents: [
              0x02, // number of packets
              Object(_utilities__WEBPACK_IMPORTED_MODULE_2__["xiphLacing"])(header.data, header.vorbisComments),
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

    return new _ContainerElement__WEBPACK_IMPORTED_MODULE_0__["default"]({
      children: [
        new _EBML__WEBPACK_IMPORTED_MODULE_1__["default"](_EBML__WEBPACK_IMPORTED_MODULE_1__["id"].EBML, {
          children: [
            new _EBML__WEBPACK_IMPORTED_MODULE_1__["default"](_EBML__WEBPACK_IMPORTED_MODULE_1__["id"].EBMLVersion, { contents: 1 }),
            new _EBML__WEBPACK_IMPORTED_MODULE_1__["default"](_EBML__WEBPACK_IMPORTED_MODULE_1__["id"].EBMLReadVersion, { contents: 1 }),
            new _EBML__WEBPACK_IMPORTED_MODULE_1__["default"](_EBML__WEBPACK_IMPORTED_MODULE_1__["id"].EBMLMaxIDLength, { contents: 4 }),
            new _EBML__WEBPACK_IMPORTED_MODULE_1__["default"](_EBML__WEBPACK_IMPORTED_MODULE_1__["id"].EBMLMaxSizeLength, { contents: 8 }),
            new _EBML__WEBPACK_IMPORTED_MODULE_1__["default"](_EBML__WEBPACK_IMPORTED_MODULE_1__["id"].DocType, { contents: _EBML__WEBPACK_IMPORTED_MODULE_1__["default"].stringToByteArray("webm") }),
            new _EBML__WEBPACK_IMPORTED_MODULE_1__["default"](_EBML__WEBPACK_IMPORTED_MODULE_1__["id"].DocTypeVersion, { contents: 4 }),
            new _EBML__WEBPACK_IMPORTED_MODULE_1__["default"](_EBML__WEBPACK_IMPORTED_MODULE_1__["id"].DocTypeReadVersion, { contents: 2 }),
          ],
        }),
        new _EBML__WEBPACK_IMPORTED_MODULE_1__["default"](_EBML__WEBPACK_IMPORTED_MODULE_1__["id"].Segment, {
          isUnknownLength: true,
          children: [
            new _EBML__WEBPACK_IMPORTED_MODULE_1__["default"](_EBML__WEBPACK_IMPORTED_MODULE_1__["id"].Info, {
              children: [
                new _EBML__WEBPACK_IMPORTED_MODULE_1__["default"](_EBML__WEBPACK_IMPORTED_MODULE_1__["id"].TimestampScale, {
                  contents: _EBML__WEBPACK_IMPORTED_MODULE_1__["default"].getUint32(
                    Math.floor(this._timestampScale) // Base timestamps on sample rate vs. milliseconds https://www.matroska.org/technical/notes.html#timestamps
                  ),
                }),
                new _EBML__WEBPACK_IMPORTED_MODULE_1__["default"](_EBML__WEBPACK_IMPORTED_MODULE_1__["id"].MuxingApp, {
                  contents: _EBML__WEBPACK_IMPORTED_MODULE_1__["default"].stringToByteArray("mse-audio-wrapper"),
                }),
                new _EBML__WEBPACK_IMPORTED_MODULE_1__["default"](_EBML__WEBPACK_IMPORTED_MODULE_1__["id"].WritingApp, {
                  contents: _EBML__WEBPACK_IMPORTED_MODULE_1__["default"].stringToByteArray("mse-audio-wrapper"),
                }),
              ],
            }),
            new _EBML__WEBPACK_IMPORTED_MODULE_1__["default"](_EBML__WEBPACK_IMPORTED_MODULE_1__["id"].Tracks, {
              children: [
                new _EBML__WEBPACK_IMPORTED_MODULE_1__["default"](_EBML__WEBPACK_IMPORTED_MODULE_1__["id"].TrackEntry, {
                  children: [
                    new _EBML__WEBPACK_IMPORTED_MODULE_1__["default"](_EBML__WEBPACK_IMPORTED_MODULE_1__["id"].TrackNumber, { contents: 0x01 }),
                    new _EBML__WEBPACK_IMPORTED_MODULE_1__["default"](_EBML__WEBPACK_IMPORTED_MODULE_1__["id"].TrackUID, { contents: 0x01 }),
                    new _EBML__WEBPACK_IMPORTED_MODULE_1__["default"](_EBML__WEBPACK_IMPORTED_MODULE_1__["id"].FlagLacing, { contents: 0x00 }),
                    new _EBML__WEBPACK_IMPORTED_MODULE_1__["default"](_EBML__WEBPACK_IMPORTED_MODULE_1__["id"].CodecID, {
                      contents: _EBML__WEBPACK_IMPORTED_MODULE_1__["default"].stringToByteArray(this._codecId),
                    }),
                    new _EBML__WEBPACK_IMPORTED_MODULE_1__["default"](_EBML__WEBPACK_IMPORTED_MODULE_1__["id"].TrackType, { contents: 0x02 }), // audio
                    new _EBML__WEBPACK_IMPORTED_MODULE_1__["default"](_EBML__WEBPACK_IMPORTED_MODULE_1__["id"].Audio, {
                      children: [
                        new _EBML__WEBPACK_IMPORTED_MODULE_1__["default"](_EBML__WEBPACK_IMPORTED_MODULE_1__["id"].Channels, { contents: header.channels }),
                        new _EBML__WEBPACK_IMPORTED_MODULE_1__["default"](_EBML__WEBPACK_IMPORTED_MODULE_1__["id"].SamplingFrequency, {
                          contents: _EBML__WEBPACK_IMPORTED_MODULE_1__["default"].getFloat64(header.sampleRate),
                        }),
                        new _EBML__WEBPACK_IMPORTED_MODULE_1__["default"](_EBML__WEBPACK_IMPORTED_MODULE_1__["id"].BitDepth, { contents: header.bitDepth }),
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

    return new _EBML__WEBPACK_IMPORTED_MODULE_1__["default"](_EBML__WEBPACK_IMPORTED_MODULE_1__["id"].Cluster, {
      children: [
        new _EBML__WEBPACK_IMPORTED_MODULE_1__["default"](_EBML__WEBPACK_IMPORTED_MODULE_1__["id"].Timestamp, {
          contents: _EBML__WEBPACK_IMPORTED_MODULE_1__["default"].getUintVariable(offsetSamples), // Absolute timecode of the cluster
        }),
        ...frames.map(
          ({ data, totalSamples }) =>
            new _EBML__WEBPACK_IMPORTED_MODULE_1__["default"](_EBML__WEBPACK_IMPORTED_MODULE_1__["id"].SimpleBlock, {
              contents: [
                0x81, // track number
                _EBML__WEBPACK_IMPORTED_MODULE_1__["default"].getInt16(totalSamples - offsetSamples), // timestamp relative to cluster Int16
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
    "mse-audio-wrapper",
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

/***/ })

}]);