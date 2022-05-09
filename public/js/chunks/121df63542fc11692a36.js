(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/elements/single-items/TV.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/elements/single-items/TV.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      smallScreen: true
    };
  },
  methods: {
    switchToSmallScreen: function switchToSmallScreen() {
      this.$emit("small-screen");
      this.smallScreen = true;
    },
    switchToTVScreen: function switchToTVScreen() {
      this.$emit("large-screen");
      this.smallScreen = false;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/audio-player/FooterPlayerLayout.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/audio-player/FooterPlayerLayout.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dialogs_admin_edit_Artist_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../dialogs/admin/edit/Artist.vue */ "./resources/js/components/dialogs/admin/edit/Artist.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    Artist: _dialogs_admin_edit_Artist_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      showAddMenu: false,
      showPlaylist: false,
      vol: this.volume // isTextOverflowed: false,

    };
  },
  computed: {
    fullScreenPlayer: {
      get: function get() {
        return this.fullScreenPlayerProp;
      },
      set: function set() {
        this.$emit("fullScreenPlayer");
      }
    },
    currentTitle: function currentTitle() {
      return this.currentAudio.title;
    }
  },
  // watch: {
  //     currentTitle() {
  //         return true
  //         // let element = document.getElementById('live-stream-title');
  //         // if( element ) {
  //         //     let elementWidth = element.clientWidth;
  //         //     if( elementWidth > 300 ) {
  //         //         this.isTextOverflowed =  true;
  //         //     } else {
  //         //         this.isTextOverflowed =  false;
  //         //     }
  //         // }
  //     }
  // },
  props: ["playlist", "currentAudio", "fullScreenPlayerProp", "getUp", "isLoading", "downloadLoading", "buttons", "volumebarInnerWidth", "playbackRate", "volumeButton", "isLiked", "isArtistFollowed", "isPodcastEpisode", "isCurrentAudioAStream", "isCurrentAudioAFileAudio", "volumeButton", "volume", "duration", "isPurchasable", "isOwned"]
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/audio-player/Index.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/audio-player/Index.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _elements_single_items_TV__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../elements/single-items/TV */ "./resources/js/components/elements/single-items/TV.vue");
/* harmony import */ var _FooterPlayerLayout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FooterPlayerLayout */ "./resources/js/components/player/audio-player/FooterPlayerLayout.vue");
/* harmony import */ var _PhonePlayerLayout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PhonePlayerLayout */ "./resources/js/components/player/audio-player/PhonePlayerLayout.vue");
/* harmony import */ var _mixins_player_eventHandlers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../mixins/player/eventHandlers */ "./resources/js/mixins/player/eventHandlers.js");
/* harmony import */ var _mixins_player_playerActions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../mixins/player/playerActions */ "./resources/js/mixins/player/playerActions.js");
/* harmony import */ var _mixins_player_progress__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../mixins/player/progress */ "./resources/js/mixins/player/progress.js");
/* harmony import */ var _mixins_player_stream__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../mixins/player/stream */ "./resources/js/mixins/player/stream.js");
/* harmony import */ var _mixins_player_update__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../mixins/player/update */ "./resources/js/mixins/player/update.js");
/* harmony import */ var _mixins_player_volume__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../mixins/player/volume */ "./resources/js/mixins/player/volume.js");
/* harmony import */ var _mixins_player_youTube__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../mixins/player/youTube */ "./resources/js/mixins/player/youTube.js");
/* harmony import */ var _mixins_billing_billing__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../mixins/billing/billing */ "./resources/js/mixins/billing/billing.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../helpers */ "./resources/js/helpers.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


 // mixins










/* harmony default export */ __webpack_exports__["default"] = ({
  props: ["playlist"],
  mixins: [_mixins_player_playerActions__WEBPACK_IMPORTED_MODULE_5__["default"], _mixins_player_eventHandlers__WEBPACK_IMPORTED_MODULE_4__["default"], _mixins_player_stream__WEBPACK_IMPORTED_MODULE_7__["default"], _mixins_player_update__WEBPACK_IMPORTED_MODULE_8__["default"], _mixins_player_progress__WEBPACK_IMPORTED_MODULE_6__["default"], _mixins_player_volume__WEBPACK_IMPORTED_MODULE_9__["default"], _mixins_player_youTube__WEBPACK_IMPORTED_MODULE_10__["default"], _mixins_billing_billing__WEBPACK_IMPORTED_MODULE_11__["default"]],
  components: {
    TV: _elements_single_items_TV__WEBPACK_IMPORTED_MODULE_1__["default"],
    FooterPlayerLayout: _FooterPlayerLayout__WEBPACK_IMPORTED_MODULE_2__["default"],
    PhonePlayerLayout: _PhonePlayerLayout__WEBPACK_IMPORTED_MODULE_3__["default"]
  },
  created: function created() {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.initPlayer();

              _this.startPlayer();

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  data: function data() {
    return {
      audioPlayer: null,
      streamPlayer: null,
      streamAudioElement: null,
      streamStats: null,
      downloadLoading: false,
      queue: [],
      audioStatus: null,
      playlistShownOnMobile: false,
      retryCount: 0,
      getUp: false,
      fullScreenPlayer: false,
      isLoading: true,
      canPlay: false,
      smallScreen: true,
      playbackRateDirection: "up",
      videoPlayer: null,
      videoStatus: null,
      volumeButton: "volume-medium",
      timeUpdater: null,
      metadataFetcher: null,
      playbackRate: 1,
      currentAudio: {
        source: null,
        source_format: null,
        index: 0,
        title: "",
        album: "",
        artist: "",
        cover: "",
        progress: 0,
        duration: "-:--",
        currentTime: "0:00",
        videoCurrentTime: 0,
        isPlaying: false
      },
      buttons: {
        shuffle: false,
        loop: false
      }
    };
  },
  computed: {
    isPodcastEpisode: function isPodcastEpisode() {
      return Boolean(this.currentAudio.type === "episode");
    },
    isCurrentAudioAStream: function isCurrentAudioAStream() {
      return this.currentAudio.streamEndpoint;
    },
    isCurrentAudioAFileAudio: function isCurrentAudioAFileAudio() {
      return this.currentAudio.source_format === 'file' || this.currentAudio.source_format === 'audio_url';
    },
    isCurrentAudioAYoutubeVideo: function isCurrentAudioAYoutubeVideo() {
      return this.currentAudio.source_format === 'yt_video';
    },
    isLiked: function isLiked() {
      var _this2 = this;

      return (this.$store.getters.getLikedSongs || []).some(function (x) {
        return x.id == _this2.currentAudio.id;
      });
    },
    isArtistFollowed: function isArtistFollowed() {
      var _this3 = this;

      return (this.$store.getters.getFollowedArtists || []).some(function (artist) {
        return artist.id === _this3.currentAudio.artist_id;
      });
    },
    isPurchasable: function isPurchasable() {
      return this.currentAudio.product && !this.isPurchased(this.currentAudio);
    },
    isOwned: function isOwned() {
      return this.currentAudio.artist && this.$store.getters.getUser && this.$store.getters.getUser.artist && this.currentAudio.artist.id === this.$store.getters.getUser.artist.id || this.currentAudio.product && this.isPurchased(this.currentAudio);
    }
  },
  methods: {
    initPlayer: function initPlayer() {
      var _this4 = this;

      this.audioPlayer = new Audio();
      this.volume = this.$store.getters.getSettings.playerVolume || 50;
      this.audioPlayer.preload = "metadata"; // attaching the events to their handlers

      this.initEventHandlers();
      setTimeout(function () {
        _this4.getUp = true;
      }, 100);
    },
    getRandomAudio: function getRandomAudio(length, index) {
      var randomAudio = Math.floor(Math.random() * length);
      if (randomAudio == index) return this.getRandomAudio(length, index);else return randomAudio;
    },
    addSongToPlaylist: function addSongToPlaylist(song_id) {
      if (this.$store.getters.getUser) {
        this.$store.commit("setAddSongToPlaylist", song_id);
      } else {
        this.loginOrCancel();
      }
    },
    startPlayer: function startPlayer() {
      if (this.playlist[0] !== this.queue[0]) {
        this.updateCurrentAudio(0, true);
      }

      this.queue = this.playlist;
    },
    purchase: function purchase() {
      var _this5 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (_this5.$store.getters.isLogged) {
                  _context2.next = 3;
                  break;
                }

                _context2.next = 3;
                return _helpers__WEBPACK_IMPORTED_MODULE_12__["default"].loginOrCancel();

              case 3:
                _this5.$store.commit('purchase/setSellingAsset', _this5.currentAudio);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    }
  },
  watch: {
    playbackRate: function playbackRate(val) {
      this.audioPlayer.playbackRate = val;
    },
    playlist: function playlist() {
      var _this6 = this;

      setTimeout(function () {
        _this6.startPlayer();
      }, 100);
    },
    audioStatus: function audioStatus(val) {
      if (this.$store.getters.getSettings.crossfade) {
        if (val === "starting") {
          this.easeVolumeRaise();
        } else if (val === "ending") {
          this.easeVolumeDrop();
        }
      }
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.resetAudioElement();
    this.killStreamIfExists();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/audio-player/PhonePlayerLayout.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/audio-player/PhonePlayerLayout.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      showAddMenu: false,
      showPlaylist: false
    };
  },
  computed: {
    fullScreenPlayer: {
      get: function get() {
        return this.fullScreenPlayerProp;
      },
      set: function set() {
        this.$emit("fullScreenPlayer");
      }
    }
  },
  props: ["playlist", "currentAudio", "downloadLoading", "fullScreenPlayerProp", "getUp", "isLoading", "buttons", "volumebarInnerWidth", "playbackRate", "volumeButton", "isLiked", "isArtistFollowed", "isPodcastEpisode", "isCurrentAudioAStream", "volumeButton", "volume", "duration", "isPurchasable", "isOwned"]
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/elements/single-items/TV.vue?vue&type=style&index=0&id=53a28649&lang=scss&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/elements/single-items/TV.vue?vue&type=style&index=0&id=53a28649&lang=scss&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#container[data-v-53a28649] {\n  max-width: 1024px;\n  margin: auto;\n  width: 800px;\n  height: 450px;\n}\n@media screen and (max-width: 900px) {\n#container[data-v-53a28649] {\n    width: 500px;\n    height: 300px;\n}\n}\n@media screen and (max-width: 600px) {\n#container[data-v-53a28649] {\n    width: 90%;\n}\n}\n@media screen and (max-width: 600px) {\n#container.small-screen.phone-layout[data-v-53a28649] {\n    width: 95%;\n    height: 300px;\n}\n}\n@media screen and (max-width: 600px) {\n#container.small-screen[data-v-53a28649] {\n    width: 95%;\n    height: 300px;\n}\n}\n#monitor[data-v-53a28649] {\n  background: #000;\n  width: 100%;\n  height: 100%;\n  position: relative;\n  border-top: 3px solid #888;\n  padding: 2% 2% 4% 2%;\n  border-radius: 10px;\n  border-bottom-left-radius: 50% 2%;\n  border-bottom-right-radius: 50% 2%;\n  transition: margin-right 1s;\n}\n#monitor[data-v-53a28649]:after {\n  content: \"\";\n  display: block;\n  position: absolute;\n  bottom: 3%;\n  left: 36%;\n  height: 0.5%;\n  width: 28%;\n  background: #ddd;\n  border-radius: 50%;\n  box-shadow: 0 0 3px 0 white;\n}\n.small-screen__icon[data-v-53a28649] {\n  position: absolute;\n  top: 3px;\n  right: 3px;\n}\n#monitorscreen[data-v-53a28649] {\n  background-color: black;\n  width: 100%;\n  height: 100%;\n}\n#container.small-screen[data-v-53a28649] {\n  width: auto;\n  height: auto;\n}\n#container.small-screen #monitor[data-v-53a28649]:after {\n  display: none;\n}\n#container.small-screen #monitor[data-v-53a28649] {\n  background: transparent;\n  position: relative;\n  border-top: none;\n  margin: 0;\n  padding: 0;\n  border-radius: 0;\n  border-bottom-left-radius: 0;\n  border-bottom-right-radius: 0;\n}\n#container.small-screen #monitorscreen[data-v-53a28649] {\n  background-color: transparent;\n  border-top: none;\n  border-radius: 0px;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/audio-player/FooterPlayerLayout.vue?vue&type=style&index=0&lang=scss&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/audio-player/FooterPlayerLayout.vue?vue&type=style&index=0&lang=scss& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".play-button-container {\n  height: 3em;\n  width: 3em;\n  position: relative;\n  display: flex;\n  justify-content: center;\n}\n.play-button-container .progress-circle {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.play-button-container .play-button {\n  margin: 0 !important;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/audio-player/PhonePlayerLayout.vue?vue&type=style&index=0&lang=css&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--7-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/audio-player/PhonePlayerLayout.vue?vue&type=style&index=0&lang=css& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.epico_audio-title {\n    text-align: center;\n    padding: 0 1em 1em 1em;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/elements/single-items/TV.vue?vue&type=style&index=0&id=53a28649&lang=scss&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/elements/single-items/TV.vue?vue&type=style&index=0&id=53a28649&lang=scss&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./TV.vue?vue&type=style&index=0&id=53a28649&lang=scss&scoped=true& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/elements/single-items/TV.vue?vue&type=style&index=0&id=53a28649&lang=scss&scoped=true&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/audio-player/FooterPlayerLayout.vue?vue&type=style&index=0&lang=scss&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/audio-player/FooterPlayerLayout.vue?vue&type=style&index=0&lang=scss& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./FooterPlayerLayout.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/audio-player/FooterPlayerLayout.vue?vue&type=style&index=0&lang=scss&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/audio-player/PhonePlayerLayout.vue?vue&type=style&index=0&lang=css&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--7-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/audio-player/PhonePlayerLayout.vue?vue&type=style&index=0&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--7-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./PhonePlayerLayout.vue?vue&type=style&index=0&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/audio-player/PhonePlayerLayout.vue?vue&type=style&index=0&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/elements/single-items/TV.vue?vue&type=template&id=53a28649&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/elements/single-items/TV.vue?vue&type=template&id=53a28649&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { class: { "small-screen": _vm.smallScreen }, attrs: { id: "container" } },
    [
      _c("div", { attrs: { id: "monitor" } }, [
        _c(
          "div",
          { staticClass: "small-screen__icon" },
          [
            !_vm.smallScreen
              ? _c(
                  "v-icon",
                  {
                    attrs: { title: _vm.$t("Small Window"), dark: "" },
                    on: { click: _vm.switchToSmallScreen },
                  },
                  [_vm._v("$vuetify.icons.fullscreen-exit")]
                )
              : _c(
                  "v-icon",
                  { attrs: { dark: "" }, on: { click: _vm.switchToTVScreen } },
                  [_vm._v("$vuetify.icons.fullscreen")]
                ),
          ],
          1
        ),
        _vm._v(" "),
        _c("div", { attrs: { id: "monitorscreen" } }, [_vm._t("default")], 2),
      ]),
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/audio-player/FooterPlayerLayout.vue?vue&type=template&id=4f0e5cda&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/audio-player/FooterPlayerLayout.vue?vue&type=template&id=4f0e5cda& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "epico_footer-layout",
      style: {
        transform: !_vm.getUp
          ? "translateY(120px)"
          : _vm.fullScreenPlayer
          ? "translateY(-50px)"
          : "translateY(0px)",
        opacity: _vm.fullScreenPlayer ? 0.5 : 1,
      },
      attrs: { id: "player-wrapper" },
    },
    [
      _c("div", { staticClass: "epico_player-main-container" }, [
        _c(
          "div",
          { staticClass: "epico_audio-info epico_audio-info-u500h" },
          [
            !_vm.isPodcastEpisode && !_vm.isCurrentAudioAStream
              ? _c(
                  "div",
                  { staticClass: "plus-container" },
                  [
                    _c("song-menu", {
                      attrs: {
                        item: _vm.currentAudio,
                        icon: "plus",
                        isOnPlayer: true,
                        closeOnContentClick: true,
                      },
                      on: {
                        close: function ($event) {
                          return _vm.$store.commit("setSongMenu", null)
                        },
                      },
                    }),
                  ],
                  1
                )
              : _vm._e(),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "chevron-up-container px-3 pb-1",
                on: {
                  click: function ($event) {
                    _vm.fullScreenPlayer = true
                  },
                },
              },
              [
                _c("v-icon", { staticClass: "pointer" }, [
                  _vm._v("$vuetify.icons.chevron-up"),
                ]),
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "v-card",
              {
                staticClass: "song-img transparent ml-2",
                attrs: { elevation: "0" },
              },
              [
                _c("v-img", {
                  staticClass: "img",
                  attrs: { src: _vm.currentAudio.cover, "aspect-ratio": "1" },
                  scopedSlots: _vm._u([
                    {
                      key: "placeholder",
                      fn: function () {
                        return [
                          _c(
                            "v-row",
                            {
                              staticClass: "fill-height ma-0",
                              attrs: { align: "center", justify: "center" },
                            },
                            [
                              _c(
                                "content-placeholders",
                                {
                                  staticStyle: { width: "100%" },
                                  attrs: { rounded: true },
                                },
                                [_c("content-placeholders-img")],
                                1
                              ),
                            ],
                            1
                          ),
                        ]
                      },
                      proxy: true,
                    },
                  ]),
                }),
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "infos" },
              [
                !_vm.isCurrentAudioAStream
                  ? _c("div", { staticClass: "current-info" }, [
                      _vm.currentAudio.album &&
                      _vm.currentAudio.album.title !== _vm.currentAudio.title
                        ? _c(
                            "div",
                            { staticClass: "audio-album max-1-lines" },
                            [
                              _c(
                                "router-link",
                                {
                                  staticClass: "router-link",
                                  attrs: {
                                    to: {
                                      name: "album",
                                      params: { id: _vm.currentAudio.album.id },
                                    },
                                  },
                                },
                                [
                                  _vm._v(
                                    "\n                            " +
                                      _vm._s(_vm.currentAudio.album.title) +
                                      "\n                        "
                                  ),
                                ]
                              ),
                            ],
                            1
                          )
                        : _vm.currentAudio.podcast
                        ? _c(
                            "div",
                            { staticClass: "audio-album max-1-lines" },
                            [
                              _c(
                                "router-link",
                                {
                                  staticClass: "router-link",
                                  attrs: {
                                    title: _vm.currentAudio.podcast.title,
                                    to: {
                                      name: "podcast",
                                      params: {
                                        id: _vm.currentAudio.podcast.id,
                                      },
                                    },
                                  },
                                },
                                [
                                  _vm._v(
                                    "\n                            " +
                                      _vm._s(_vm.currentAudio.podcast.title) +
                                      "\n                        "
                                  ),
                                ]
                              ),
                            ],
                            1
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          staticClass: "audio-title max-1-lines",
                          attrs: { title: _vm.currentAudio.title },
                        },
                        [
                          !_vm.isPodcastEpisode
                            ? _c(
                                "router-link",
                                {
                                  staticClass: "router-link",
                                  attrs: {
                                    title: _vm.currentAudio.title,
                                    to: {
                                      name: "song",
                                      params: { id: _vm.currentAudio.id },
                                    },
                                  },
                                },
                                [_vm._v(_vm._s(_vm.currentAudio.title))]
                              )
                            : [_vm._v(_vm._s(_vm.currentAudio.title))],
                        ],
                        2
                      ),
                      _vm._v(" "),
                      !_vm.isCurrentAudioAStream
                        ? _c(
                            "div",
                            { staticClass: "audio-artists max-1-lines" },
                            [
                              _c("artists", {
                                attrs: { artists: _vm.currentAudio.artists },
                              }),
                            ],
                            1
                          )
                        : _vm._e(),
                    ])
                  : _c("div", { staticClass: "current-info" }, [
                      _c(
                        "div",
                        { staticClass: "now-playing" },
                        [
                          _vm.isLoading
                            ? [
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(_vm.$t("Loading")) +
                                    "...\n                        "
                                ),
                              ]
                            : _vm._e(),
                          _vm._v(" "),
                          !_vm.isLoading && _vm.currentAudio.title
                            ? [
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(_vm.$t("Now Playing")) +
                                    "\n                        "
                                ),
                              ]
                            : _vm._e(),
                        ],
                        2
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "live-stream-title-container" },
                        [
                          _c("div", { staticClass: "hiding-box-left" }),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass: "live-stream-title",
                              class: {
                                slideAnimation:
                                  _vm.currentAudio.title &&
                                  _vm.currentAudio.title.length > 25,
                              },
                              attrs: { id: "live-stream-title" },
                            },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(
                                    _vm.currentAudio.title ||
                                      _vm.currentAudio.name
                                  ) +
                                  "\n                        "
                              ),
                            ]
                          ),
                          _vm._v(" "),
                          _c("div", { staticClass: "hiding-box-right" }),
                        ]
                      ),
                      _vm._v(" "),
                      _vm.currentAudio.artist
                        ? _c(
                            "div",
                            { staticClass: "audio-artists max-1-lines" },
                            [
                              _vm._v(
                                "\n                        " +
                                  _vm._s(_vm.currentAudio.artist) +
                                  "\n                    "
                              ),
                            ]
                          )
                        : _vm._e(),
                    ]),
                _vm._v(" "),
                !_vm.isCurrentAudioAStream &&
                !_vm.$store.getters.getSettings.disableRegistration &&
                _vm.currentAudio.type !== "episode"
                  ? [
                      _vm.isLiked
                        ? _c(
                            "v-btn",
                            {
                              staticClass: "align-center ml-2",
                              attrs: { icon: "", small: "" },
                              on: {
                                click: function ($event) {
                                  return _vm.$emit("like", _vm.currentAudio)
                                },
                              },
                            },
                            [
                              _c(
                                "v-icon",
                                {
                                  attrs: {
                                    small: "",
                                    color: "primary",
                                    title: _vm.$t("Dislike"),
                                  },
                                },
                                [_vm._v("$vuetify.icons.heart")]
                              ),
                            ],
                            1
                          )
                        : _c(
                            "v-btn",
                            {
                              staticClass: "align-center ml-2",
                              attrs: { icon: "", small: "" },
                              on: {
                                click: function ($event) {
                                  return _vm.$emit("like", _vm.currentAudio)
                                },
                              },
                            },
                            [
                              _c(
                                "v-icon",
                                { attrs: { title: _vm.$t("Like"), small: "" } },
                                [_vm._v("$vuetify.icons.heart-outline")]
                              ),
                            ],
                            1
                          ),
                    ]
                  : _vm._e(),
              ],
              2
            ),
          ],
          1
        ),
        _vm._v(" "),
        _c("div", { staticClass: "epico_main-control-section" }, [
          _c("div", { staticClass: "epico_progressbar-container" }, [
            !_vm.isCurrentAudioAStream
              ? _c(
                  "div",
                  {
                    staticClass: "epico_progressbar epico_progressbar-u500h",
                    attrs: { id: "progress-bar" },
                    on: {
                      click: function ($event) {
                        return _vm.$emit("updateProgress", $event)
                      },
                    },
                  },
                  [
                    _c(
                      "div",
                      {
                        staticClass: "epico_progressbar-inner",
                        style: { width: _vm.currentAudio.progress + "%" },
                      },
                      [_c("span", { staticClass: "epico_progress-circle" })]
                    ),
                  ]
                )
              : _c(
                  "div",
                  {
                    staticClass: "epico_progressbar epico_progressbar-u500h",
                    attrs: { id: "progress-bar" },
                    on: {
                      click: function ($event) {
                        return _vm.$emit("updateProgress", $event)
                      },
                    },
                  },
                  [
                    _c("div", {
                      staticClass: "epico_progressbar-inner",
                      style: { width: "100%" },
                    }),
                  ]
                ),
            _vm._v(" "),
            _c("span", {
              staticClass: "epico_loading-circle",
              staticStyle: { opacity: "0" },
            }),
            _vm._v(" "),
            _c("div", { staticClass: "times" }, [
              _c("span", { staticClass: "current-audio-time" }, [
                _vm._v(
                  "\n                        " +
                    _vm._s(_vm.currentAudio.currentTime) +
                    "\n                    "
                ),
              ]),
              _vm._v(" "),
              !_vm.isCurrentAudioAStream
                ? _c("span", {
                    staticClass: "current-audio-duration",
                    domProps: { textContent: _vm._s(_vm.duration) },
                  })
                : _c("div", { staticClass: "live-animation" }, [
                    _c("div", { staticClass: "align-center" }, [
                      _c(
                        "svg",
                        {
                          staticClass: "blinking",
                          attrs: { height: "20", width: "13" },
                        },
                        [
                          _c("circle", {
                            attrs: { cx: "5", cy: "10", r: "3", fill: "red" },
                          }),
                        ]
                      ),
                      _vm._v(
                        "\n                            " +
                          _vm._s(_vm.$t("Live")) +
                          "\n                        "
                      ),
                    ]),
                  ]),
            ]),
          ]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "play-next-previous-container" },
            [
              !_vm.isCurrentAudioAStream
                ? [
                    !_vm.isPodcastEpisode
                      ? _c(
                          "button",
                          {
                            staticClass: "repeat-button",
                            class: { activeButton: _vm.buttons.loop },
                            attrs: { title: _vm.$t("Loop") },
                            on: {
                              click: function ($event) {
                                return _vm.$emit("loopAudio")
                              },
                            },
                          },
                          [
                            _c(
                              "v-icon",
                              {
                                attrs: {
                                  color: _vm.buttons.loop
                                    ? "primary"
                                    : "textContMedium",
                                },
                              },
                              [_vm._v("$vuetify.icons.refresh")]
                            ),
                          ],
                          1
                        )
                      : _c(
                          "button",
                          {
                            staticClass: "random-button",
                            class: { activeButton: _vm.buttons.shuffle },
                            attrs: {
                              disabled: _vm.playlist.length <= 1,
                              title: _vm.$t("Shuffle"),
                            },
                            on: {
                              click: function ($event) {
                                return _vm.$emit("shuffleAudio")
                              },
                            },
                          },
                          [
                            _c(
                              "v-icon",
                              {
                                attrs: {
                                  size: 20,
                                  color: _vm.buttons.shuffle
                                    ? "primary"
                                    : "textContMedium",
                                },
                              },
                              [_vm._v("$vuetify.icons.shuffle-variant")]
                            ),
                          ],
                          1
                        ),
                    _vm._v(" "),
                    !_vm.isPodcastEpisode
                      ? _c(
                          "button",
                          {
                            staticClass: "previous-button",
                            attrs: {
                              title: _vm.$t("Previous"),
                              disabled:
                                !_vm.playlist[_vm.currentAudio.index - 1],
                            },
                            on: {
                              click: function ($event) {
                                return _vm.$emit("goPrevious")
                              },
                            },
                          },
                          [
                            _c(
                              "v-icon",
                              { attrs: { color: "textContMedium" } },
                              [_vm._v("$vuetify.icons.skip-previous")]
                            ),
                          ],
                          1
                        )
                      : _c(
                          "button",
                          {
                            staticClass:
                              "epico_previous-button epico_rewind-button",
                            attrs: { title: _vm.$t("Rewind") },
                            on: {
                              click: function ($event) {
                                return _vm.$emit("rewindAudio", -10)
                              },
                            },
                          },
                          [
                            _c(
                              "v-icon",
                              { attrs: { color: "textContMedium" } },
                              [_vm._v("$vuetify.icons.rewind-10")]
                            ),
                          ],
                          1
                        ),
                  ]
                : _vm._e(),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "play-button-container" },
                [
                  _vm.isLoading
                    ? [
                        _c(
                          "div",
                          { staticClass: "progress-circl" },
                          [
                            _c("v-progress-circular", {
                              staticClass: "loading-circle-e",
                              attrs: {
                                size: 39,
                                width: 5,
                                color: "primary",
                                indeterminate: "",
                              },
                            }),
                          ],
                          1
                        ),
                      ]
                    : [
                        !_vm.currentAudio.isPlaying
                          ? _c(
                              "button",
                              {
                                staticClass: "play-button",
                                attrs: {
                                  title: _vm.$t("Play") + "/" + _vm.$t("Pause"),
                                },
                                on: {
                                  click: function ($event) {
                                    return _vm.$emit("playPause")
                                  },
                                },
                              },
                              [
                                _c(
                                  "v-icon",
                                  {
                                    attrs: {
                                      size: "54",
                                      large: "",
                                      color: _vm.$vuetify.theme.dark
                                        ? "textContMedium"
                                        : "primary",
                                    },
                                  },
                                  [_vm._v("$vuetify.icons.play-circle")]
                                ),
                              ],
                              1
                            )
                          : _c(
                              "button",
                              {
                                staticClass: "play-button",
                                on: {
                                  click: function ($event) {
                                    return _vm.$emit("playPause")
                                  },
                                },
                              },
                              [
                                _c(
                                  "v-icon",
                                  {
                                    attrs: {
                                      size: "54",
                                      large: "",
                                      color: _vm.$vuetify.theme.dark
                                        ? "textContMedium"
                                        : "primary",
                                    },
                                  },
                                  [_vm._v("$vuetify.icons.pause-circle")]
                                ),
                              ],
                              1
                            ),
                      ],
                ],
                2
              ),
              _vm._v(" "),
              !_vm.isCurrentAudioAStream
                ? [
                    !_vm.isPodcastEpisode
                      ? _c(
                          "button",
                          {
                            staticClass: "next-button",
                            attrs: {
                              title: _vm.$t("Next"),
                              disabled:
                                !_vm.playlist[_vm.currentAudio.index + 1],
                            },
                            on: {
                              click: function ($event) {
                                return _vm.$emit("goNext")
                              },
                            },
                          },
                          [
                            _c(
                              "v-icon",
                              { attrs: { color: "textContMedium" } },
                              [_vm._v("$vuetify.icons.skip-next")]
                            ),
                          ],
                          1
                        )
                      : _c(
                          "button",
                          {
                            staticClass:
                              "epico_next-button epico_forwrad-button",
                            attrs: { title: _vm.$t("Rewind") },
                            on: {
                              click: function ($event) {
                                return _vm.$emit("rewindAudio", +30)
                              },
                            },
                          },
                          [
                            _c(
                              "v-icon",
                              { attrs: { color: "textContMedium" } },
                              [_vm._v("$vuetify.icons.fast-forward-30")]
                            ),
                          ],
                          1
                        ),
                    _vm._v(" "),
                    !_vm.isPodcastEpisode
                      ? _c(
                          "button",
                          {
                            staticClass: "random-button",
                            class: { activeButton: _vm.buttons.shuffle },
                            attrs: { disabled: _vm.playlist.length <= 1 },
                            on: {
                              click: function ($event) {
                                return _vm.$emit("shuffleAudio")
                              },
                            },
                          },
                          [
                            _c(
                              "v-icon",
                              {
                                attrs: {
                                  title: _vm.$t("Shuffle"),
                                  size: "20",
                                  color: _vm.buttons.shuffle
                                    ? "primary"
                                    : "textContMedium",
                                },
                              },
                              [_vm._v("$vuetify.icons.shuffle-variant")]
                            ),
                          ],
                          1
                        )
                      : _c(
                          "button",
                          {
                            staticClass: "playback_rate__button",
                            attrs: { title: _vm.$t("Play Speed") },
                            on: {
                              click: function ($event) {
                                return _vm.$emit("adjustPlayspeed")
                              },
                            },
                          },
                          [
                            _c(
                              "span",
                              {
                                staticClass: "playback_rate",
                                attrs: {
                                  color:
                                    _vm.playbackRate > 1
                                      ? "primary"
                                      : "textContMedium",
                                },
                              },
                              [_vm._v(_vm._s(_vm.playbackRate) + "x")]
                            ),
                          ]
                        ),
                  ]
                : _vm._e(),
            ],
            2
          ),
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "epico_option-section epico_option-section-u500h" },
          [
            _c("div", { staticClass: "epico_option-section__group" }, [
              _c(
                "div",
                { staticClass: "btn-group d-flex align-center" },
                [
                  _vm.isOwned && _vm.currentAudio.isProduct
                    ? _c("div", { staticClass: "owned-icon" }, [
                        _c(
                          "div",
                          {
                            staticClass: "premium",
                            attrs: { title: _vm.$t("Premium") },
                          },
                          [
                            _c("v-icon", { attrs: { color: "#FFA500" } }, [
                              _vm._v("$vuetify.icons.crown"),
                            ]),
                          ],
                          1
                        ),
                      ])
                    : _vm.isPurchasable
                    ? _c(
                        "div",
                        { staticClass: "purchase-button" },
                        [
                          _c(
                            "v-btn",
                            {
                              staticClass: "mr-2",
                              attrs: {
                                "x-small": "",
                                title: _vm.$t("Purchase"),
                                color: "#FF8F00",
                                dark: "",
                                fab: "",
                                dense: "",
                              },
                              on: {
                                click: function ($event) {
                                  return _vm.$emit("showPurchaseDialog")
                                },
                              },
                            },
                            [_c("v-icon", [_vm._v("$vuetify.icons.cart")])],
                            1
                          ),
                        ],
                        1
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.isCurrentAudioAFileAudio &&
                  _vm.currentAudio.origin === "local" &&
                  !_vm.$store.getters.getSettings.hideDownloadButton
                    ? _c(
                        "div",
                        { staticClass: "download-button" },
                        [
                          _c(
                            "v-btn",
                            {
                              staticClass: "mr-2",
                              attrs: {
                                "x-small": "",
                                title: _vm.$t("Download"),
                                color: "primary",
                                disabled: _vm.downloadLoading,
                                fab: "",
                                loading: _vm.downloadLoading,
                                dense: "",
                              },
                              on: {
                                click: function ($event) {
                                  return _vm.$emit("downloadAudio")
                                },
                              },
                            },
                            [
                              _c("v-icon", [
                                _vm._v("$vuetify.icons.download-circle"),
                              ]),
                            ],
                            1
                          ),
                        ],
                        1
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.playlist.length > 1
                    ? _c(
                        "v-chip",
                        {
                          staticClass: "ma-2",
                          attrs: { outlined: "", small: "" },
                          on: {
                            click: function ($event) {
                              _vm.showPlaylist = !_vm.showPlaylist
                            },
                          },
                        },
                        [
                          _c(
                            "v-icon",
                            { attrs: { left: "", color: "textContMedium" } },
                            [_vm._v("$vuetify.icons.playlist-play")]
                          ),
                          _vm._v(" "),
                          _vm.$store.getters.getScreenWidth > 900
                            ? _c("span", [_vm._v(_vm._s(_vm.$t("Queue")))])
                            : _vm._e(),
                          _vm._v(" "),
                          _c(
                            "v-icon",
                            {
                              style: {
                                transform: _vm.showPlaylist
                                  ? "rotate(0deg)"
                                  : "rotate(180deg)",
                              },
                            },
                            [_vm._v("$vuetify.icons.chevron-up")]
                          ),
                        ],
                        1
                      )
                    : _vm._e(),
                ],
                1
              ),
            ]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "epico_volume-button-container" },
              [
                _c(
                  "v-btn",
                  {
                    attrs: { icon: "", small: "" },
                    on: {
                      click: function ($event) {
                        return _vm.$emit("mute", $event)
                      },
                    },
                  },
                  [
                    _c("v-icon", { attrs: { color: "textContMedium" } }, [
                      _vm._v("$vuetify.icons." + _vm._s(_vm.volumeButton)),
                    ]),
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass:
                      "epico_volumebar-container epico_volumebar-container-u500h",
                  },
                  [
                    _c("v-slider", {
                      attrs: {
                        "thumb-color": "primary",
                        "tick-size": "50",
                        "thumb-size": "22",
                        "hide-details": "",
                        "thumb-label": true,
                      },
                      on: {
                        change: function ($event) {
                          return _vm.$emit("volume", _vm.vol)
                        },
                      },
                      model: {
                        value: _vm.vol,
                        callback: function ($$v) {
                          _vm.vol = $$v
                        },
                        expression: "vol",
                      },
                    }),
                  ],
                  1
                ),
              ],
              1
            ),
          ]
        ),
        _vm._v(" "),
        _c("div", { staticClass: "epico_play-circle-phone-layout" }, [
          !_vm.currentAudio.isPlaying
            ? _c(
                "button",
                {
                  staticClass: "play-button",
                  attrs: { title: _vm.$t("Play") + "/" + _vm.$t("Pause") },
                  on: {
                    click: function ($event) {
                      return _vm.$emit("playPause")
                    },
                  },
                },
                [
                  _c("v-progress-circular", {
                    staticClass: "progress-circle",
                    attrs: {
                      rotate: -90,
                      size: 36,
                      width: 5,
                      value: _vm.isCurrentAudioAStream
                        ? 100
                        : _vm.currentAudio.progress,
                      color: "primary",
                    },
                  }),
                  _vm._v(" "),
                  _c(
                    "div",
                    [
                      _c(
                        "v-icon",
                        {
                          attrs: {
                            size: "50",
                            large: "",
                            color: _vm.$vuetify.theme.dark
                              ? "textContMedium"
                              : "primary",
                          },
                        },
                        [_vm._v("$vuetify.icons.play-circle")]
                      ),
                    ],
                    1
                  ),
                ],
                1
              )
            : _c(
                "button",
                {
                  staticClass: "play-button",
                  on: {
                    click: function ($event) {
                      return _vm.$emit("playPause")
                    },
                  },
                },
                [
                  _c("v-progress-circular", {
                    staticClass: "progress-circle",
                    attrs: {
                      rotate: -90,
                      size: 36,
                      width: 5,
                      value: _vm.isCurrentAudioAStream
                        ? 100
                        : _vm.currentAudio.progress,
                      color: "primary",
                    },
                  }),
                  _vm._v(" "),
                  _c(
                    "div",
                    [
                      _c(
                        "v-icon",
                        {
                          attrs: {
                            size: "50",
                            large: "",
                            color: _vm.$vuetify.theme.dark
                              ? "textContMedium"
                              : "primary",
                          },
                        },
                        [_vm._v("$vuetify.icons.pause-circle")]
                      ),
                    ],
                    1
                  ),
                ],
                1
              ),
        ]),
      ]),
      _vm._v(" "),
      _vm.playlist.length > 1
        ? _c("div", { staticClass: "epico_playlist-container" }, [
            _c(
              "div",
              {
                staticClass: "epico_playlist-ul-wrapper",
                style: {
                  transform: _vm.showPlaylist
                    ? "translateY(0em)"
                    : "translateY(100%) ",
                },
              },
              [
                _c(
                  "ul",
                  { staticClass: "epico_playlist-ul" },
                  _vm._l(_vm.playlist, function (audio, i) {
                    return _c(
                      "li",
                      {
                        key: i,
                        staticClass: "epico_playlist-audio",
                        class: { "active-Song": _vm.currentAudio.index == i },
                        on: {
                          click: function ($event) {
                            return _vm.$emit("updateCurrentAudio", [i, true])
                          },
                        },
                      },
                      [
                        _c(
                          "div",
                          { staticClass: "audio-cover" },
                          [
                            _c(
                              "v-img",
                              {
                                staticClass: "img",
                                attrs: { src: audio.cover },
                                scopedSlots: _vm._u(
                                  [
                                    {
                                      key: "placeholder",
                                      fn: function () {
                                        return [
                                          _c(
                                            "div",
                                            { staticClass: "fill-height" },
                                            [
                                              _c(
                                                "content-placeholders",
                                                { attrs: { rounded: true } },
                                                [
                                                  _c(
                                                    "content-placeholders-img"
                                                  ),
                                                ],
                                                1
                                              ),
                                            ],
                                            1
                                          ),
                                        ]
                                      },
                                      proxy: true,
                                    },
                                  ],
                                  null,
                                  true
                                ),
                              },
                              [
                                _vm._v(" "),
                                _vm.$store.getters.isCurrentlyPlaying(audio)
                                  ? _c(
                                      "div",
                                      {
                                        staticClass:
                                          "dark-layer absolute fill justify-align-center",
                                      },
                                      [
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "epico_music-is-playing-container white-bars",
                                          },
                                          [
                                            _c("span"),
                                            _vm._v(" "),
                                            _c("span"),
                                            _vm._v(" "),
                                            _c("span"),
                                          ]
                                        ),
                                      ]
                                    )
                                  : _vm._e(),
                              ]
                            ),
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c("div", { staticClass: "audio-title max-1-lines" }, [
                          _vm._v(
                            "\n                        " +
                              _vm._s(audio.title) +
                              "\n                    "
                          ),
                        ]),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "audio-artist max-1-lines",
                            on: {
                              click: function ($event) {
                                $event.preventDefault()
                              },
                            },
                          },
                          [
                            _c("artists", {
                              attrs: { artists: audio.artists },
                            }),
                          ],
                          1
                        ),
                      ]
                    )
                  }),
                  0
                ),
              ]
            ),
          ])
        : _vm._e(),
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/audio-player/Index.vue?vue&type=template&id=50c4b64e&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/audio-player/Index.vue?vue&type=template&id=50c4b64e& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { attrs: { id: "audio-player-container" } },
    [
      _vm.$store.getters.getSettings.allowVideos
        ? _c(
            "TV",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value:
                    _vm.currentAudio.source_format === "yt_video" &&
                    !_vm.$store.getters.getSettings.disableVideo &&
                    (_vm.fullScreenPlayer
                      ? _vm.fullScreenPlayer && !_vm.playlistShownOnMobile
                      : true),
                  expression:
                    "currentAudio.source_format === 'yt_video' && !$store.getters.getSettings.disableVideo && (fullScreenPlayer? (fullScreenPlayer && !playlistShownOnMobile) : true)",
                },
              ],
              staticClass: "video-tv",
              class: {
                "small-screen": _vm.smallScreen || _vm.fullScreenPlayer,
                "phone-layout": _vm.fullScreenPlayer,
              },
              on: {
                "small-screen": _vm.switchScreenToSmall,
                "large-screen": _vm.switchScreenToLarge,
              },
            },
            [
              _c("div", {
                class: { smallScreenVideo: _vm.smallScreen },
                attrs: { id: "youtube_video_container" },
              }),
            ]
          )
        : _vm._e(),
      _vm._v(" "),
      _c("phone-player-layout", {
        style: {
          transform:
            "translateY(" + (_vm.fullScreenPlayer ? "0%" : "100%") + ")",
        },
        attrs: {
          currentAudio: _vm.currentAudio,
          playlist: _vm.playlist,
          getUp: _vm.getUp,
          isLoading: _vm.isLoading,
          playbackRate: _vm.playbackRate,
          isLiked: _vm.isLiked,
          isArtistFollowed: _vm.isArtistFollowed,
          isPodcastEpisode: _vm.isPodcastEpisode,
          isCurrentAudioAStream: _vm.isCurrentAudioAStream,
          isCurrentAudioAFileAudio: _vm.isCurrentAudioAFileAudio,
          downloadLoading: _vm.downloadLoading,
          volumeButton: _vm.volumeButton,
          duration: _vm.getDurationInHHMMSS(_vm.currentAudio.duration),
          buttons: _vm.buttons,
          volume: _vm.volume,
          fullScreenPlayerProp: _vm.fullScreenPlayer,
          isPurchasable: _vm.isPurchasable,
          isOwned: _vm.isOwned,
        },
        on: {
          updateCurrentAudio: function ($event) {
            return _vm.updateCurrentAudio($event[0], $event[1])
          },
          playPause: _vm.playPause,
          adjustPlayspeed: _vm.adjustPlayspeed,
          rewindAudio: function ($event) {
            return _vm.rewindAudio($event)
          },
          fullScreenPlayer: function ($event) {
            _vm.fullScreenPlayer = false
          },
          goNext: _vm.goNext,
          goPrevious: _vm.goPrevious,
          like: _vm.like,
          showPlaylist: function ($event) {
            _vm.playlistShownOnMobile = $event
          },
          mute: _vm.muteAudio,
          downloadAudio: _vm.downloadAudio,
          showPurchaseDialog: _vm.purchase,
          addSongToPlaylist: _vm.addSongToPlaylist,
          updateProgressOnPhone: _vm.updateProgressOnPhone,
          loopAudio: _vm.loopAudio,
          shuffleAudio: _vm.shuffleAudio,
        },
      }),
      _vm._v(" "),
      _c("footer-player-layout", {
        attrs: {
          getUp: _vm.getUp,
          playlist: _vm.playlist,
          isLoading: _vm.isLoading,
          playbackRate: _vm.playbackRate,
          isLiked: _vm.isLiked,
          isArtistFollowed: _vm.isArtistFollowed,
          isPodcastEpisode: _vm.isPodcastEpisode,
          isCurrentAudioAStream: _vm.isCurrentAudioAStream,
          isCurrentAudioAFileAudio: _vm.isCurrentAudioAFileAudio,
          downloadLoading: _vm.downloadLoading,
          volumeButton: _vm.volumeButton,
          duration: _vm.getDurationInHHMMSS(_vm.currentAudio.duration),
          buttons: _vm.buttons,
          volume: _vm.volume,
          fullScreenPlayerProp: _vm.fullScreenPlayer,
          currentAudio: _vm.currentAudio,
          isPurchasable: _vm.isPurchasable,
          isOwned: _vm.isOwned,
        },
        on: {
          volume: function ($event) {
            _vm.volume = $event
          },
          mute: _vm.muteAudio,
          fullScreenPlayer: function ($event) {
            _vm.fullScreenPlayer = true
          },
          updateCurrentAudio: function ($event) {
            return _vm.updateCurrentAudio($event[0], $event[1])
          },
          downloadAudio: _vm.downloadAudio,
          showPurchaseDialog: _vm.purchase,
          playPause: _vm.playPause,
          adjustPlayspeed: _vm.adjustPlayspeed,
          rewindAudio: function ($event) {
            return _vm.rewindAudio($event)
          },
          goNext: _vm.goNext,
          goPrevious: _vm.goPrevious,
          like: _vm.like,
          addSongToPlaylist: _vm.addSongToPlaylist,
          updateProgress: _vm.updateProgress,
          loopAudio: _vm.loopAudio,
          shuffleAudio: _vm.shuffleAudio,
        },
      }),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/audio-player/PhonePlayerLayout.vue?vue&type=template&id=1c4cddf5&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/audio-player/PhonePlayerLayout.vue?vue&type=template&id=1c4cddf5& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "small-screen-player" }, [
    _c("div", { staticClass: "epico_phone-layout-full" }, [
      _c("div", { staticClass: "epico_player-container" }, [
        _c("div", { staticClass: "epico_playlist-container" }, [
          _c(
            "ul",
            {
              staticClass: "epico_playlist-ul",
              style: { maxHeight: _vm.showPlaylist ? "45vh" : "0px" },
            },
            _vm._l(_vm.playlist, function (audio, i) {
              return _c(
                "li",
                {
                  key: i,
                  staticClass: "epico_playlist-audio",
                  class: { "active-Song": _vm.currentAudio.index == i },
                  on: {
                    click: function ($event) {
                      return _vm.$emit("updateCurrentAudio", [i, true])
                    },
                  },
                },
                [
                  _c(
                    "div",
                    { staticClass: "audio-cover" },
                    [
                      _c(
                        "v-img",
                        {
                          staticClass: "img",
                          attrs: {
                            src: audio.cover,
                            width: "50",
                            height: "50",
                          },
                          scopedSlots: _vm._u(
                            [
                              {
                                key: "placeholder",
                                fn: function () {
                                  return [
                                    _c(
                                      "div",
                                      { staticClass: "fill-height" },
                                      [
                                        _c(
                                          "content-placeholders",
                                          { attrs: { rounded: true } },
                                          [_c("content-placeholders-img")],
                                          1
                                        ),
                                      ],
                                      1
                                    ),
                                  ]
                                },
                                proxy: true,
                              },
                            ],
                            null,
                            true
                          ),
                        },
                        [
                          _vm._v(" "),
                          _vm.$store.getters.isCurrentlyPlaying(audio)
                            ? _c(
                                "div",
                                {
                                  staticClass:
                                    "dark-layer absolute fill justify-align-center",
                                },
                                [
                                  _c(
                                    "div",
                                    {
                                      staticClass:
                                        "epico_music-is-playing-container white-bars",
                                    },
                                    [
                                      _c("span"),
                                      _vm._v(" "),
                                      _c("span"),
                                      _vm._v(" "),
                                      _c("span"),
                                    ]
                                  ),
                                ]
                              )
                            : _vm._e(),
                        ]
                      ),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "audio-title text-center max-1-lines" },
                    [
                      _vm._v(
                        "\n                            " +
                          _vm._s(audio.title) +
                          "\n                        "
                      ),
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass: "audio-artist max-1-lines",
                      on: {
                        click: function ($event) {
                          $event.preventDefault()
                        },
                      },
                    },
                    [_c("artists", { attrs: { artists: audio.artists } })],
                    1
                  ),
                ]
              )
            }),
            0
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "epico_playlist-text-container px-3" },
            [
              _c(
                "button",
                {
                  staticClass: "epico_chevron-down",
                  on: {
                    click: function ($event) {
                      _vm.fullScreenPlayer = false
                    },
                  },
                },
                [
                  _c("v-icon", { attrs: { large: "" } }, [
                    _vm._v("$vuetify.icons.chevron-down"),
                  ]),
                ],
                1
              ),
              _vm._v(" "),
              _vm.hasPermission("Download songs") &&
              _vm.currentAudio.source_format === "file" &&
              !_vm.$store.getters.getSettings.hideDownloadButton
                ? _c(
                    "div",
                    { staticClass: "download-button" },
                    [
                      _c(
                        "v-btn",
                        {
                          staticClass: "mr-2",
                          attrs: {
                            "x-small": "",
                            title: _vm.$t("Download"),
                            color: "primary",
                            disabled: _vm.downloadLoading,
                            fab: "",
                            loading: _vm.downloadLoading,
                            dense: "",
                          },
                          on: {
                            click: function ($event) {
                              return _vm.$emit("downloadAudio")
                            },
                          },
                        },
                        [
                          _c("v-icon", [
                            _vm._v("$vuetify.icons.download-circle"),
                          ]),
                        ],
                        1
                      ),
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.isOwned && _vm.currentAudio.isProduct
                ? _c("div", { staticClass: "owned-icon" }, [
                    _c(
                      "div",
                      {
                        staticClass: "premium",
                        attrs: { title: _vm.$t("Premium") },
                      },
                      [
                        _c("v-icon", { attrs: { color: "#FFA500" } }, [
                          _vm._v("$vuetify.icons.crown"),
                        ]),
                      ],
                      1
                    ),
                  ])
                : _vm.isPurchasable
                ? _c(
                    "div",
                    { staticClass: "purchase-button" },
                    [
                      _c(
                        "v-btn",
                        {
                          staticClass: "mr-2",
                          attrs: {
                            "x-small": "",
                            title: _vm.$t("Purchase"),
                            color: "#FF8F00",
                            dark: "",
                            fab: "",
                            dense: "",
                          },
                          on: {
                            click: function ($event) {
                              return _vm.$emit("showPurchaseDialog")
                            },
                          },
                        },
                        [_c("v-icon", [_vm._v("$vuetify.icons.cart")])],
                        1
                      ),
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.playlist.length > 1
                ? _c(
                    "v-chip",
                    {
                      staticClass: "ma-2",
                      attrs: { outlined: "" },
                      on: {
                        click: function ($event) {
                          _vm.showPlaylist = !_vm.showPlaylist
                          _vm.$emit("showPlaylist", _vm.showPlaylist)
                        },
                      },
                    },
                    [
                      _c(
                        "v-icon",
                        { attrs: { left: "", color: "textContMedium" } },
                        [_vm._v("$vuetify.icons.playlist-music")]
                      ),
                      _vm._v(
                        "\n                        " +
                          _vm._s(_vm.$t("Queue")) +
                          "\n                        "
                      ),
                      _c(
                        "v-icon",
                        {
                          style: {
                            transform: _vm.showPlaylist
                              ? "rotate(0deg)"
                              : "rotate(180deg)",
                          },
                          attrs: { color: "textContMedium" },
                        },
                        [_vm._v("$vuetify.icons.chevron-up")]
                      ),
                    ],
                    1
                  )
                : _vm._e(),
            ],
            1
          ),
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "epico_player-main-container" }, [
          _c(
            "div",
            {
              staticClass: "epico_image-section",
              style: {
                opacity:
                  _vm.currentAudio.source_format === "yt_video" &&
                  !_vm.$store.getters.getSettings.disableVideo
                    ? 0
                    : 1,
              },
            },
            [
              _c("v-img", {
                staticClass: "img",
                attrs: { src: _vm.currentAudio.cover, "aspect-ratio": "1" },
                scopedSlots: _vm._u([
                  {
                    key: "placeholder",
                    fn: function () {
                      return [
                        _c(
                          "v-row",
                          {
                            staticClass: "fill-height ma-0",
                            attrs: { align: "center", justify: "center" },
                          },
                          [
                            _c(
                              "content-placeholders",
                              {
                                staticStyle: { width: "100%" },
                                attrs: { rounded: true },
                              },
                              [_c("content-placeholders-img")],
                              1
                            ),
                          ],
                          1
                        ),
                      ]
                    },
                    proxy: true,
                  },
                ]),
              }),
            ],
            1
          ),
          _vm._v(" "),
          _c("div", { staticClass: "epico_details-section" }, [
            !_vm.isCurrentAudioAStream
              ? _c("div", { staticClass: "epico_audio-info" }, [
                  _vm.currentAudio.album &&
                  _vm.currentAudio.album.title !== _vm.currentAudio.title
                    ? _c(
                        "div",
                        { staticClass: "audio-album max-1-lines" },
                        [
                          _c(
                            "router-link",
                            {
                              staticClass: "router-link",
                              attrs: {
                                to: {
                                  name: "album",
                                  params: { id: _vm.currentAudio.album.id },
                                },
                              },
                            },
                            [
                              _vm._v(
                                "\n                                " +
                                  _vm._s(_vm.currentAudio.album.title) +
                                  "\n                            "
                              ),
                            ]
                          ),
                        ],
                        1
                      )
                    : _vm.currentAudio.podcast
                    ? _c(
                        "div",
                        { staticClass: "audio-album max-1-lines" },
                        [
                          _c(
                            "router-link",
                            {
                              staticClass: "router-link",
                              attrs: {
                                title: _vm.currentAudio.podcast.title,
                                to: {
                                  name: "podcast",
                                  params: { id: _vm.currentAudio.podcast.id },
                                },
                              },
                            },
                            [
                              _vm._v(
                                "\n                                " +
                                  _vm._s(_vm.currentAudio.podcast.title) +
                                  "\n                            "
                              ),
                            ]
                          ),
                        ],
                        1
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass: "epico_audio-title",
                      on: {
                        click: function ($event) {
                          return _vm.$emit("fullScreenPlayer")
                        },
                      },
                    },
                    [
                      !_vm.isPodcastEpisode
                        ? _c(
                            "router-link",
                            {
                              staticClass: "router-link",
                              attrs: {
                                to: {
                                  name: "song",
                                  params: { id: _vm.currentAudio.id },
                                },
                              },
                            },
                            [_vm._v(_vm._s(_vm.currentAudio.title))]
                          )
                        : [_vm._v(_vm._s(_vm.currentAudio.title))],
                    ],
                    2
                  ),
                  _vm._v(" "),
                  !_vm.isCurrentAudioAStream
                    ? _c(
                        "div",
                        { staticClass: "audio-artists max-1-lines" },
                        [
                          _c("artists", {
                            attrs: { artists: _vm.currentAudio.artists },
                          }),
                        ],
                        1
                      )
                    : _vm._e(),
                ])
              : _c("div", { staticClass: "epico_audio-info" }, [
                  _c(
                    "div",
                    { staticClass: "now-playing" },
                    [
                      _vm.isLoading
                        ? [
                            _vm._v(
                              "\n                                " +
                                _vm._s(_vm.$t("Loading")) +
                                "...\n                            "
                            ),
                          ]
                        : _vm._e(),
                      _vm._v(" "),
                      !_vm.isLoading && _vm.currentAudio.title
                        ? [
                            _vm._v(
                              "\n                                " +
                                _vm._s(_vm.$t("Now Playing")) +
                                "\n                            "
                            ),
                          ]
                        : _vm._e(),
                    ],
                    2
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "live-stream-title-container" }, [
                    _c("div", { staticClass: "hiding-box-left" }),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass: "live-stream-title no-wrap",
                        class: {
                          slideAnimation:
                            _vm.currentAudio.title &&
                            _vm.currentAudio.title.length > 25,
                        },
                        attrs: { id: "live-stream-title" },
                      },
                      [
                        _vm._v(
                          "\n                                " +
                            _vm._s(
                              _vm.currentAudio.title || _vm.currentAudio.name
                            ) +
                            "\n                            "
                        ),
                      ]
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "hiding-box-right" }),
                  ]),
                  _vm._v(" "),
                  _vm.currentAudio.artist
                    ? _c("p", { staticClass: "epico_audio-artist" }, [
                        _vm._v(
                          "\n                            " +
                            _vm._s(_vm.currentAudio.artist) +
                            "\n                        "
                        ),
                      ])
                    : _vm._e(),
                ]),
            _vm._v(" "),
            _c("div", { staticClass: "epico_control-section" }, [
              _c("div", { staticClass: "epico_progressbar-container" }, [
                !_vm.isCurrentAudioAStream
                  ? _c(
                      "div",
                      {
                        staticClass: "epico_progressbar",
                        attrs: { id: "progress-bar_phone_layout" },
                        on: {
                          click: function ($event) {
                            return _vm.$emit("updateProgressOnPhone", $event)
                          },
                        },
                      },
                      [
                        _c(
                          "div",
                          {
                            staticClass: "epico_progressbar-inner",
                            style: {
                              width: _vm.currentAudio.progress + "%",
                            },
                          },
                          [_c("span", { staticClass: "epico_progress-circle" })]
                        ),
                      ]
                    )
                  : _c(
                      "div",
                      {
                        staticClass: "epico_progressbar",
                        attrs: { id: "progress-bar_phone_layout" },
                        on: {
                          click: function ($event) {
                            return _vm.$emit("updateProgressOnPhone", $event)
                          },
                        },
                      },
                      [
                        _c(
                          "div",
                          {
                            staticClass: "epico_progressbar-inner",
                            style: {
                              width: "100%",
                            },
                          },
                          [_c("span", { staticClass: "epico_progress-circle" })]
                        ),
                      ]
                    ),
                _vm._v(" "),
                _c("span", { staticClass: "epico_loading-circle" }),
                _vm._v(" "),
                _c("span", { staticClass: "epico_current-audio-time" }, [
                  _vm._v(_vm._s(_vm.currentAudio.currentTime)),
                ]),
                _vm._v(" "),
                !_vm.isCurrentAudioAStream
                  ? _c("span", {
                      staticClass: "epico_current-audio-duration",
                      domProps: { textContent: _vm._s(_vm.duration) },
                    })
                  : _c(
                      "span",
                      {
                        staticClass:
                          "live-animation epico_current-audio-duration",
                      },
                      [
                        _c("div", { staticClass: "align-center" }, [
                          _c(
                            "svg",
                            {
                              staticClass: "blinking",
                              attrs: { height: "20", width: "13" },
                            },
                            [
                              _c("circle", {
                                attrs: {
                                  cx: "5",
                                  cy: "10",
                                  r: "3",
                                  fill: "red",
                                },
                              }),
                            ]
                          ),
                          _vm._v(
                            "\n                                    " +
                              _vm._s(_vm.$t("Live")) +
                              "\n                                "
                          ),
                        ]),
                      ]
                    ),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "epico_main-control-section" }, [
                _c(
                  "div",
                  { staticClass: "epico_play-next-previous-container" },
                  [
                    !_vm.isPodcastEpisode && !_vm.isCurrentAudioAStream
                      ? _c(
                          "button",
                          {
                            staticClass: "epico_previous-button",
                            attrs: {
                              disabled:
                                !_vm.playlist[_vm.currentAudio.index - 1],
                              title: _vm.$t("Previous"),
                            },
                            on: {
                              click: function ($event) {
                                return _vm.$emit("goPrevious")
                              },
                            },
                          },
                          [
                            _c(
                              "v-icon",
                              { attrs: { color: "textContMedium" } },
                              [_vm._v("$vuetify.icons.skip-previous")]
                            ),
                          ],
                          1
                        )
                      : _vm.isPodcastEpisode
                      ? _c(
                          "button",
                          {
                            staticClass:
                              "epico_previous-button epico_rewind-button",
                            attrs: { title: _vm.$t("Rewind") },
                            on: {
                              click: function ($event) {
                                return _vm.$emit("rewindAudio", -10)
                              },
                            },
                          },
                          [
                            _c(
                              "v-icon",
                              { attrs: { color: "textContMedium" } },
                              [_vm._v("$vuetify.icons.rewind-10")]
                            ),
                          ],
                          1
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass:
                          "epico_btn epico_play-button epico_no-border",
                      },
                      [
                        _vm.isLoading
                          ? [
                              _vm.isLoading
                                ? _c("v-progress-circular", {
                                    attrs: {
                                      size: 60,
                                      width: 5,
                                      color: "primary",
                                      indeterminate: "",
                                    },
                                  })
                                : _vm._e(),
                            ]
                          : [
                              !_vm.currentAudio.isPlaying
                                ? _c(
                                    "button",
                                    {
                                      staticClass: "play-button",
                                      attrs: { title: _vm.$t("Play") },
                                      on: {
                                        click: function ($event) {
                                          return _vm.$emit("playPause")
                                        },
                                      },
                                    },
                                    [
                                      _c(
                                        "v-icon",
                                        {
                                          attrs: {
                                            size: "60",
                                            color: _vm.$vuetify.theme.dark
                                              ? "textContMedium"
                                              : "primary",
                                          },
                                        },
                                        [_vm._v("$vuetify.icons.play-circle")]
                                      ),
                                    ],
                                    1
                                  )
                                : _c(
                                    "button",
                                    {
                                      staticClass: "play-button",
                                      attrs: { title: _vm.$t("Pause") },
                                      on: {
                                        click: function ($event) {
                                          return _vm.$emit("playPause")
                                        },
                                      },
                                    },
                                    [
                                      _c(
                                        "v-icon",
                                        {
                                          attrs: {
                                            size: "60",
                                            color: _vm.$vuetify.theme.dark
                                              ? "textContMedium"
                                              : "primary",
                                          },
                                        },
                                        [_vm._v("$vuetify.icons.pause-circle")]
                                      ),
                                    ],
                                    1
                                  ),
                            ],
                      ],
                      2
                    ),
                    _vm._v(" "),
                    !_vm.isPodcastEpisode && !_vm.isCurrentAudioAStream
                      ? _c(
                          "button",
                          {
                            staticClass: "epico_next-button",
                            attrs: {
                              disabled:
                                !_vm.playlist[_vm.currentAudio.index + 1],
                              title: _vm.$t("Next"),
                            },
                            on: {
                              click: function ($event) {
                                return _vm.$emit("goNext")
                              },
                            },
                          },
                          [
                            _c(
                              "v-icon",
                              { attrs: { color: "textContMedium" } },
                              [_vm._v("$vuetify.icons.skip-next")]
                            ),
                          ],
                          1
                        )
                      : _vm.isPodcastEpisode
                      ? _c(
                          "button",
                          {
                            staticClass:
                              "epico_next-button epico_forwrad-button",
                            attrs: { title: _vm.$t("Rewind") },
                            on: {
                              click: function ($event) {
                                return _vm.$emit("rewindAudio", +30)
                              },
                            },
                          },
                          [
                            _c(
                              "v-icon",
                              { attrs: { color: "textContMedium" } },
                              [_vm._v("$vuetify.icons.fast-forward-30")]
                            ),
                          ],
                          1
                        )
                      : _vm._e(),
                  ]
                ),
              ]),
            ]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "epico_option-section" },
              [
                !_vm.isPodcastEpisode && !_vm.isCurrentAudioAStream
                  ? _c(
                      "div",
                      { staticClass: "plus-container" },
                      [
                        _c("song-menu", {
                          attrs: {
                            item: _vm.currentAudio,
                            icon: "plus",
                            isOnPlayer: true,
                            closeOnContentClick: true,
                          },
                          on: {
                            close: function ($event) {
                              return _vm.$store.commit("setSongMenu", null)
                            },
                          },
                        }),
                      ],
                      1
                    )
                  : _vm._e(),
                _vm._v(" "),
                !_vm.isPodcastEpisode && !_vm.isCurrentAudioAStream
                  ? _c(
                      "button",
                      { staticClass: "epico_shuffle-button" },
                      [
                        _c(
                          "v-icon",
                          {
                            attrs: {
                              title: _vm.$t("Shuffle"),
                              color: _vm.buttons.shuffle
                                ? "primary"
                                : "textContMedium",
                            },
                            on: {
                              click: function ($event) {
                                return _vm.$emit("shuffleAudio")
                              },
                            },
                          },
                          [_vm._v("$vuetify.icons.shuffle-variant")]
                        ),
                      ],
                      1
                    )
                  : _vm._e(),
                _vm._v(" "),
                !_vm.isCurrentAudioAStream &&
                !_vm.$store.getters.getSettings.disableRegistration &&
                _vm.currentAudio.type !== "episode"
                  ? [
                      _vm.isLiked
                        ? _c(
                            "v-btn",
                            {
                              staticClass: "align-center",
                              attrs: { icon: "", small: "" },
                              on: {
                                click: function ($event) {
                                  return _vm.$emit("like", _vm.currentAudio)
                                },
                              },
                            },
                            [
                              _c(
                                "v-icon",
                                {
                                  attrs: {
                                    color: "primary",
                                    title: _vm.$t("Dislike"),
                                  },
                                },
                                [_vm._v("$vuetify.icons.heart")]
                              ),
                            ],
                            1
                          )
                        : _c(
                            "v-btn",
                            {
                              staticClass: "align-center",
                              attrs: { icon: "", small: "" },
                              on: {
                                click: function ($event) {
                                  return _vm.$emit("like", _vm.currentAudio)
                                },
                              },
                            },
                            [
                              _c(
                                "v-icon",
                                { attrs: { title: _vm.$t("Like") } },
                                [_vm._v("$vuetify.icons.heart-outline")]
                              ),
                            ],
                            1
                          ),
                    ]
                  : _vm._e(),
                _vm._v(" "),
                !_vm.isPodcastEpisode && !_vm.isCurrentAudioAStream
                  ? _c(
                      "button",
                      { staticClass: "epico_repeat-button" },
                      [
                        _c(
                          "v-icon",
                          {
                            attrs: {
                              color: _vm.buttons.loop
                                ? "primary"
                                : "textContMedium",
                              title: _vm.$t("Loop"),
                            },
                            on: {
                              click: function ($event) {
                                return _vm.$emit("loopAudio")
                              },
                            },
                          },
                          [_vm._v("$vuetify.icons.refresh")]
                        ),
                      ],
                      1
                    )
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "epico_volume-button-container" },
                  [
                    _c(
                      "v-btn",
                      {
                        attrs: { icon: "", small: "" },
                        on: {
                          click: function ($event) {
                            return _vm.$emit("mute", $event)
                          },
                        },
                      },
                      [
                        _c("v-icon", { attrs: { color: "textContMedium" } }, [
                          _vm._v("$vuetify.icons." + _vm._s(_vm.volumeButton)),
                        ]),
                      ],
                      1
                    ),
                  ],
                  1
                ),
              ],
              2
            ),
          ]),
        ]),
      ]),
    ]),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/elements/single-items/TV.vue":
/*!**************************************************************!*\
  !*** ./resources/js/components/elements/single-items/TV.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TV_vue_vue_type_template_id_53a28649_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TV.vue?vue&type=template&id=53a28649&scoped=true& */ "./resources/js/components/elements/single-items/TV.vue?vue&type=template&id=53a28649&scoped=true&");
/* harmony import */ var _TV_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TV.vue?vue&type=script&lang=js& */ "./resources/js/components/elements/single-items/TV.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _TV_vue_vue_type_style_index_0_id_53a28649_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TV.vue?vue&type=style&index=0&id=53a28649&lang=scss&scoped=true& */ "./resources/js/components/elements/single-items/TV.vue?vue&type=style&index=0&id=53a28649&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/index.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _TV_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _TV_vue_vue_type_template_id_53a28649_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _TV_vue_vue_type_template_id_53a28649_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "53a28649",
  null
  
)

/* vuetify-loader */


_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default()(component, {VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_5__["VIcon"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/elements/single-items/TV.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/elements/single-items/TV.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/elements/single-items/TV.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TV_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./TV.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/elements/single-items/TV.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TV_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/elements/single-items/TV.vue?vue&type=style&index=0&id=53a28649&lang=scss&scoped=true&":
/*!************************************************************************************************************************!*\
  !*** ./resources/js/components/elements/single-items/TV.vue?vue&type=style&index=0&id=53a28649&lang=scss&scoped=true& ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TV_vue_vue_type_style_index_0_id_53a28649_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./TV.vue?vue&type=style&index=0&id=53a28649&lang=scss&scoped=true& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/elements/single-items/TV.vue?vue&type=style&index=0&id=53a28649&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TV_vue_vue_type_style_index_0_id_53a28649_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TV_vue_vue_type_style_index_0_id_53a28649_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TV_vue_vue_type_style_index_0_id_53a28649_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TV_vue_vue_type_style_index_0_id_53a28649_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/components/elements/single-items/TV.vue?vue&type=template&id=53a28649&scoped=true&":
/*!*********************************************************************************************************!*\
  !*** ./resources/js/components/elements/single-items/TV.vue?vue&type=template&id=53a28649&scoped=true& ***!
  \*********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TV_vue_vue_type_template_id_53a28649_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./TV.vue?vue&type=template&id=53a28649&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/elements/single-items/TV.vue?vue&type=template&id=53a28649&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TV_vue_vue_type_template_id_53a28649_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TV_vue_vue_type_template_id_53a28649_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/player/audio-player/FooterPlayerLayout.vue":
/*!****************************************************************************!*\
  !*** ./resources/js/components/player/audio-player/FooterPlayerLayout.vue ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FooterPlayerLayout_vue_vue_type_template_id_4f0e5cda___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FooterPlayerLayout.vue?vue&type=template&id=4f0e5cda& */ "./resources/js/components/player/audio-player/FooterPlayerLayout.vue?vue&type=template&id=4f0e5cda&");
/* harmony import */ var _FooterPlayerLayout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FooterPlayerLayout.vue?vue&type=script&lang=js& */ "./resources/js/components/player/audio-player/FooterPlayerLayout.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _FooterPlayerLayout_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FooterPlayerLayout.vue?vue&type=style&index=0&lang=scss& */ "./resources/js/components/player/audio-player/FooterPlayerLayout.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ "./node_modules/vuetify/lib/components/VBtn/index.js");
/* harmony import */ var vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VCard */ "./node_modules/vuetify/lib/components/VCard/index.js");
/* harmony import */ var vuetify_lib_components_VChip__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VChip */ "./node_modules/vuetify/lib/components/VChip/index.js");
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/index.js");
/* harmony import */ var vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuetify/lib/components/VImg */ "./node_modules/vuetify/lib/components/VImg/index.js");
/* harmony import */ var vuetify_lib_components_VProgressCircular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vuetify/lib/components/VProgressCircular */ "./node_modules/vuetify/lib/components/VProgressCircular/index.js");
/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ "./node_modules/vuetify/lib/components/VGrid/index.js");
/* harmony import */ var vuetify_lib_components_VSlider__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! vuetify/lib/components/VSlider */ "./node_modules/vuetify/lib/components/VSlider/index.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _FooterPlayerLayout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _FooterPlayerLayout_vue_vue_type_template_id_4f0e5cda___WEBPACK_IMPORTED_MODULE_0__["render"],
  _FooterPlayerLayout_vue_vue_type_template_id_4f0e5cda___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* vuetify-loader */









_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default()(component, {VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_5__["VBtn"],VCard: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__["VCard"],VChip: vuetify_lib_components_VChip__WEBPACK_IMPORTED_MODULE_7__["VChip"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_8__["VIcon"],VImg: vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_9__["VImg"],VProgressCircular: vuetify_lib_components_VProgressCircular__WEBPACK_IMPORTED_MODULE_10__["VProgressCircular"],VRow: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_11__["VRow"],VSlider: vuetify_lib_components_VSlider__WEBPACK_IMPORTED_MODULE_12__["VSlider"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/player/audio-player/FooterPlayerLayout.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/player/audio-player/FooterPlayerLayout.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/components/player/audio-player/FooterPlayerLayout.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FooterPlayerLayout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./FooterPlayerLayout.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/audio-player/FooterPlayerLayout.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FooterPlayerLayout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/player/audio-player/FooterPlayerLayout.vue?vue&type=style&index=0&lang=scss&":
/*!**************************************************************************************************************!*\
  !*** ./resources/js/components/player/audio-player/FooterPlayerLayout.vue?vue&type=style&index=0&lang=scss& ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FooterPlayerLayout_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./FooterPlayerLayout.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/audio-player/FooterPlayerLayout.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FooterPlayerLayout_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FooterPlayerLayout_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FooterPlayerLayout_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FooterPlayerLayout_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/components/player/audio-player/FooterPlayerLayout.vue?vue&type=template&id=4f0e5cda&":
/*!***********************************************************************************************************!*\
  !*** ./resources/js/components/player/audio-player/FooterPlayerLayout.vue?vue&type=template&id=4f0e5cda& ***!
  \***********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FooterPlayerLayout_vue_vue_type_template_id_4f0e5cda___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./FooterPlayerLayout.vue?vue&type=template&id=4f0e5cda& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/audio-player/FooterPlayerLayout.vue?vue&type=template&id=4f0e5cda&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FooterPlayerLayout_vue_vue_type_template_id_4f0e5cda___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FooterPlayerLayout_vue_vue_type_template_id_4f0e5cda___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/player/audio-player/Index.vue":
/*!***************************************************************!*\
  !*** ./resources/js/components/player/audio-player/Index.vue ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Index_vue_vue_type_template_id_50c4b64e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Index.vue?vue&type=template&id=50c4b64e& */ "./resources/js/components/player/audio-player/Index.vue?vue&type=template&id=50c4b64e&");
/* harmony import */ var _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Index.vue?vue&type=script&lang=js& */ "./resources/js/components/player/audio-player/Index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Index_vue_vue_type_template_id_50c4b64e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Index_vue_vue_type_template_id_50c4b64e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/player/audio-player/Index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/player/audio-player/Index.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/player/audio-player/Index.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/audio-player/Index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/player/audio-player/Index.vue?vue&type=template&id=50c4b64e&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/player/audio-player/Index.vue?vue&type=template&id=50c4b64e& ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_50c4b64e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=template&id=50c4b64e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/audio-player/Index.vue?vue&type=template&id=50c4b64e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_50c4b64e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_50c4b64e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/player/audio-player/PhonePlayerLayout.vue":
/*!***************************************************************************!*\
  !*** ./resources/js/components/player/audio-player/PhonePlayerLayout.vue ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PhonePlayerLayout_vue_vue_type_template_id_1c4cddf5___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PhonePlayerLayout.vue?vue&type=template&id=1c4cddf5& */ "./resources/js/components/player/audio-player/PhonePlayerLayout.vue?vue&type=template&id=1c4cddf5&");
/* harmony import */ var _PhonePlayerLayout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PhonePlayerLayout.vue?vue&type=script&lang=js& */ "./resources/js/components/player/audio-player/PhonePlayerLayout.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _PhonePlayerLayout_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PhonePlayerLayout.vue?vue&type=style&index=0&lang=css& */ "./resources/js/components/player/audio-player/PhonePlayerLayout.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ "./node_modules/vuetify/lib/components/VBtn/index.js");
/* harmony import */ var vuetify_lib_components_VChip__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VChip */ "./node_modules/vuetify/lib/components/VChip/index.js");
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/index.js");
/* harmony import */ var vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VImg */ "./node_modules/vuetify/lib/components/VImg/index.js");
/* harmony import */ var vuetify_lib_components_VProgressCircular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuetify/lib/components/VProgressCircular */ "./node_modules/vuetify/lib/components/VProgressCircular/index.js");
/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ "./node_modules/vuetify/lib/components/VGrid/index.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _PhonePlayerLayout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PhonePlayerLayout_vue_vue_type_template_id_1c4cddf5___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PhonePlayerLayout_vue_vue_type_template_id_1c4cddf5___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* vuetify-loader */







_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default()(component, {VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_5__["VBtn"],VChip: vuetify_lib_components_VChip__WEBPACK_IMPORTED_MODULE_6__["VChip"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_7__["VIcon"],VImg: vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_8__["VImg"],VProgressCircular: vuetify_lib_components_VProgressCircular__WEBPACK_IMPORTED_MODULE_9__["VProgressCircular"],VRow: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_10__["VRow"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/player/audio-player/PhonePlayerLayout.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/player/audio-player/PhonePlayerLayout.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************!*\
  !*** ./resources/js/components/player/audio-player/PhonePlayerLayout.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PhonePlayerLayout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./PhonePlayerLayout.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/audio-player/PhonePlayerLayout.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PhonePlayerLayout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/player/audio-player/PhonePlayerLayout.vue?vue&type=style&index=0&lang=css&":
/*!************************************************************************************************************!*\
  !*** ./resources/js/components/player/audio-player/PhonePlayerLayout.vue?vue&type=style&index=0&lang=css& ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PhonePlayerLayout_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader??ref--7-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./PhonePlayerLayout.vue?vue&type=style&index=0&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/audio-player/PhonePlayerLayout.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PhonePlayerLayout_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PhonePlayerLayout_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PhonePlayerLayout_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PhonePlayerLayout_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/components/player/audio-player/PhonePlayerLayout.vue?vue&type=template&id=1c4cddf5&":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/components/player/audio-player/PhonePlayerLayout.vue?vue&type=template&id=1c4cddf5& ***!
  \**********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PhonePlayerLayout_vue_vue_type_template_id_1c4cddf5___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./PhonePlayerLayout.vue?vue&type=template&id=1c4cddf5& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/audio-player/PhonePlayerLayout.vue?vue&type=template&id=1c4cddf5&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PhonePlayerLayout_vue_vue_type_template_id_1c4cddf5___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PhonePlayerLayout_vue_vue_type_template_id_1c4cddf5___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/mixins/player/eventHandlers.js":
/*!*****************************************************!*\
  !*** ./resources/js/mixins/player/eventHandlers.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  methods: {
    initEventHandlers: function initEventHandlers() {
      this.audioPlayer.onloadstart = this.onloadstart;
      this.audioPlayer.onerror = this.onerror;
      this.audioPlayer.onloadedmetadata = this.onloadmetadata;
      this.audioPlayer.oncanplay = this.oncanplay;
      this.audioPlayer.ontimeupdate = this.ontimeupdate;
      this.audioPlayer.onended = this.onended;
      this.audioPlayer.onwaiting = this.onwaiting;
      this.audioPlayer.oncanplaythrough = this.oncanplay;
    },
    onloadstart: function onloadstart() {
      this.isLoading = true;
    },
    onerror: function onerror() {
      if (!this.isRadioStation) {
        this.failedToPlay();
      }
    },
    onwaiting: function onwaiting() {
      this.isLoading = true;
    },
    onloadmetadata: function onloadmetadata() {
      // this.currentAudio.currentTime = "0:00";
      this.currentAudio.duration = this.audioPlayer.duration;
    },
    oncanplay: function oncanplay() {
      this.canPlay = true;
      this.isLoading = false;
    },
    ontimeupdate: function ontimeupdate() {
      // this.currentAudio.isPlaying = true
      this.updateTime(this.audioPlayer.currentTime, this.audioPlayer.duration);
    },
    onended: function onended() {
      var index;
      this.canPlay = false;
      this.$store.commit("setCurrentAudio", null);
      this.currentAudio.isPlaying = false;

      if (this.$store.getters.getUser && this.$store.getters.getUser.id) {
        this.$store.dispatch("endPlay");
      }

      if (!this.buttons.loop) {
        if (this.buttons.shuffle && this.playlist.length > 1) {
          index = this.getRandomAudio(this.playlist.length, this.currentAudio.index);
          this.updateCurrentAudio(index);
        } else {
          if (this.playlist.length !== this.currentAudio.index + 1) {
            index = this.currentAudio.index + 1;
          } else {
            index = 0;
          }

          this.updateCurrentAudio(index);
        }
      } else {
        if (this.isCurrentAudioAFileAudio) {
          index = this.currentAudio.index;
          this.updateCurrentAudio(index, true);
        } else if (this.currentAudio.source_format === "yt_video") {
          this.videoPlayer.seekTo(0);
          this.videoPlayer.playVideo();
        }
      }
    }
  }
});

/***/ }),

/***/ "./resources/js/mixins/player/playerActions.js":
/*!*****************************************************!*\
  !*** ./resources/js/mixins/player/playerActions.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* harmony default export */ __webpack_exports__["default"] = ({
  methods: {
    playPause: function playPause() {
      var _this = this;

      if (this.currentAudio.source_format === "yt_video") {
        if (!this.$store.getters.getSettings.allowVideos) {
          this.$notify({
            group: "foo",
            type: "warning",
            title: this.$t("Oops!"),
            text: this.$t("Sorry, you can not play YouTube videos.")
          });
        }

        if (this.videoStatus === 2 || this.videoPlayer.getCurrentTime() === 0 || this.videoStatus === 0) {
          this.videoPlayer.playVideo();
          this.$nextTick(function () {
            document.title = "\u25B6 " + _this.currentAudio.title + (_this.getMainArtist(_this.currentAudio) ? ' - ' + _this.getMainArtist(_this.currentAudio) : "");
          });
          this.$store.commit("setCurrentAudio", {
            id: this.currentAudio.id,
            type: this.currentAudio.type
          });
          this.currentAudio.isPlaying = true;

          if (this.videoPlayer.getCurrentTime() === 0) {
            this.$store.dispatch("registerPlay", {
              id: this.currentAudio.id,
              type: this.isPodcastEpisode ? "episode" : "song",
              label: this.currentAudio.title,
              artist_id: this.currentAudio.artist ? this.currentAudio.artist.id : '',
              duration: this.currentAudio.duration,
              origin: 'youtube'
            });
          }
        } else if (this.videoPlayer.getCurrentTime() > 0) {
          this.currentAudio.isPlaying = false;
          this.$store.commit("setCurrentAudio", null);
          this.$nextTick(function () {
            document.title = _this.currentAudio.title + (_this.getMainArtist(_this.currentAudio) ? ' - ' + _this.getMainArtist(_this.currentAudio) : "");
          });
          this.videoPlayer.pauseVideo();
        }
      } else if (this.currentAudio.source_format === "file") {
        if (this.audioPlayer.paused || this.audioPlayer.currentTime === 0) {
          var _int = setInterval(function () {
            if (_this.canPlay) {
              _this.audioPlayer.play();

              _this.$nextTick(function () {
                document.title = "\u25B6 " + _this.currentAudio.title + (_this.getMainArtist(_this.currentAudio) ? ' - ' + _this.getMainArtist(_this.currentAudio) : "");
              });

              _this.$store.commit("setCurrentAudio", {
                id: _this.currentAudio.id,
                type: _this.currentAudio.type
              });

              _this.currentAudio.isPlaying = true;
              clearInterval(_int);
            }
          }, 200);

          if (this.audioPlayer.currentTime === 0) {
            this.$store.dispatch("registerPlay", {
              id: this.currentAudio.id,
              type: this.isPodcastEpisode ? "episode" : "song",
              label: this.currentAudio.title,
              artist_id: this.currentAudio.artist ? this.currentAudio.artist.id : '',
              duration: this.currentAudio.duration,
              origin: this.currentAudio.origin
            });
          }
        } else if (this.audioPlayer.currentTime > 0) {
          this.currentAudio.isPlaying = false;
          this.$store.commit("setCurrentAudio", null);
          this.$nextTick(function () {
            document.title = _this.currentAudio.title + (_this.getMainArtist(_this.currentAudio) ? ' - ' + _this.getMainArtist(_this.currentAudio) : "");
          });
          this.audioPlayer.pause();
        }
      } else {
        // live stream
        if (this.streamPlayer) {
          if (this.streamPlayer.state == "stopped") {
            this.streamPlayer.play();
            this.$nextTick(function () {
              document.title = "\u25B6 " + _this.currentAudio.title;
            }); // current audio works of songs only

            this.$store.commit("setCurrentAudio", {
              id: this.currentAudio.id,
              type: this.currentAudio.type
            });
            this.currentAudio.isPlaying = true;

            if (this.audioPlayer.currentTime === 0) {
              this.$store.dispatch("registerPlay", {
                id: this.currentAudio.id,
                type: "radio-sation",
                label: this.currentAudio.title
              });
            }
          } else {
            this.currentAudio.isPlaying = false;
            this.$store.commit("setCurrentAudio", null);
            this.$nextTick(function () {
              document.title = _this.currentAudio.title;
            });
            this.streamPlayer.stop();
          }
        } else {
          if (this.audioPlayer.paused || this.audioPlayer.currentTime === 0) {
            this.audioPlayer.play();
            this.currentAudio.isPlaying = true;
            this.$nextTick(function () {
              document.title = "\u25B6 " + _this.currentAudio.title;
            });
            this.$store.commit("setCurrentAudio", {
              id: this.currentAudio.id,
              type: this.currentAudio.type
            });

            if (this.audioPlayer.currentTime === 0) {
              this.$store.dispatch("registerPlay", {
                id: this.currentAudio.id,
                type: "radio-sation",
                label: this.currentAudio.title
              });
            }
          } else if (this.audioPlayer.currentTime > 0) {
            this.currentAudio.isPlaying = false; // emitAnalyticsTime({
            //     name: 'stream_time',
            //     value: this.audioPlayer.currentTime,
            //     event_category: 'Radio Station - ' + this.currentAudio.title
            // })

            this.$store.commit("setCurrentAudio", null);
            this.$nextTick(function () {
              document.title = _this.currentAudio.title;
            });
            this.audioPlayer.pause();
          }
        }
      }
    },
    rewindAudio: function rewindAudio(seconds) {
      this.audioPlayer.currentTime = this.audioPlayer.currentTime + seconds;

      if (this.currentAudio.source_format === "yt_video") {
        this.videoPlayer.seekTo(this.audioPlayer.currentTime);
      }
    },
    loopAudio: function loopAudio() {
      this.buttons.shuffle = false;
      this.buttons.loop = !this.buttons.loop;
    },
    shuffleAudio: function shuffleAudio() {
      this.buttons.loop = false;
      this.buttons.shuffle = !this.buttons.shuffle;
    },
    goNext: function goNext() {
      var index;

      if (this.currentAudio.index == this.playlist.length - 1) {
        index = 0;
      } else {
        index = this.currentAudio.index + 1;
      }

      this.updateCurrentAudio(index, true);
    },
    goPrevious: function goPrevious() {
      var index;

      if (this.currentAudio.index == 0) {
        index = this.playlist.length - 1;
      } else {
        index = this.currentAudio.index - 1;
      }

      this.updateCurrentAudio(index, true);
    },
    switchScreenToSmall: function switchScreenToSmall() {
      this.smallScreen = true;
    },
    switchScreenToLarge: function switchScreenToLarge() {
      this.smallScreen = false;
    },
    like: function like(song) {
      if (this.isLiked) {
        this.$store.dispatch("dislike", song);
      } else {
        this.$store.dispatch("like", song);
      }
    },
    downloadAudio: function downloadAudio() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this2.downloadLoading = true;
                _context.prev = 1;
                _context.next = 4;
                return _this2.$store.dispatch("downloadAudio", {
                  id: _this2.currentAudio.id,
                  type: _this2.isPodcastEpisode ? "episode" : "song",
                  file_name: _this2.currentAudio.file_name
                });

              case 4:
                _context.next = 8;
                break;

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](1);

              case 8:
                _this2.downloadLoading = false;

                if (_this2.$store.getters.getSettings.ga4 && _this2.$store.getters.getSettings.analytics_download_event) {
                  emitAnalyticsEvent({
                    action: 'file_download',
                    category: _this2.isPodcastEpisode ? "episode" : "song",
                    label: _this2.currentAudio.file_name
                  });
                }

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 6]]);
      }))();
    }
  }
});

/***/ }),

/***/ "./resources/js/mixins/player/progress.js":
/*!************************************************!*\
  !*** ./resources/js/mixins/player/progress.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  methods: {
    updateProgress: function updateProgress(event) {
      var progressBar = document.getElementById("progress-bar");

      if (this.isCurrentAudioAFileAudio) {
        var currentAudioDurationInSeconds = this.audioPlayer.duration;
        var currentTimeInSeconds = event.offsetX * currentAudioDurationInSeconds / progressBar.offsetWidth;
        this.audioPlayer.currentTime = currentTimeInSeconds;
      } else {
        var currentAudioDurationInSeconds = this.videoPlayer.getDuration();
        var currentTimeInSeconds = event.offsetX * currentAudioDurationInSeconds / progressBar.offsetWidth;
        this.videoPlayer.seekTo(currentTimeInSeconds);
      }
    },
    getDurationInHHMMSS: function getDurationInHHMMSS(duration) {
      if (isNaN(duration)) {
        return "-:--";
      }

      function addZeroBeforeSingleChar(i) {
        if (i < 10) {
          i = "0" + i;
        }

        return i;
      }

      var h = Math.floor(duration / 3600);
      duration %= 3600;
      var m = Math.floor(duration / 60);
      var s = Math.floor(duration % 60); // add a zero in front of numbers<10

      h = addZeroBeforeSingleChar(h);
      m = addZeroBeforeSingleChar(m);
      s = addZeroBeforeSingleChar(s);
      return (h !== "00" ? h + ":" : "") + m + ":" + s; // if( duration !== '-:--' ) {
      //     return this.moment(duration * 1000).format('mm:ss')
      // }
    },
    getTimeFormat: function getTimeFormat(secs) {
      var minutes = Math.floor(secs / 60);
      var seconds = secs % 60;
      return minutes + ":" + (Math.floor(seconds / 10) > 0 ? seconds : "0" + seconds);
    },
    adjustPlayspeed: function adjustPlayspeed() {
      this.playbackRateDirection == "up" ? this.playbackRate += 0.25 : this.playbackRate -= 0.25;

      if (this.playbackRate == 2) {
        this.playbackRateDirection = "down";
      } else if (this.playbackRate == 0.25) {
        this.playbackRateDirection = "up";
      }

      if (this.currentAudio.source_format === "yt_video") {
        this.videoPlayer.setPlaybackRate(this.playbackRate);
      }
    },
    updateProgressOnPhone: function updateProgressOnPhone(event) {
      var progressBar = document.getElementById("progress-bar_phone_layout");

      if (this.isCurrentAudioAFileAudio) {
        var seconds = event.offsetX * this.audioPlayer.duration / progressBar.offsetWidth;
        this.audioPlayer.currentTime = seconds;
      } else {
        var _seconds = event.offsetX * this.videoPlayer.getDuration() / progressBar.offsetWidth;

        this.videoPlayer.seekTo(_seconds);
      }
    },
    resetTime: function resetTime() {
      this.currentAudio.progress = 0;
      this.currentAudio.currentTime = this.currentAudio.currentTime;
    }
  }
});

/***/ }),

/***/ "./resources/js/mixins/player/stream.js":
/*!**********************************************!*\
  !*** ./resources/js/mixins/player/stream.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var icecast_metadata_player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! icecast-metadata-player */ "./node_modules/icecast-metadata-player/src/IcecastMetadataPlayer.js");
/* harmony import */ var icecast_metadata_player__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(icecast_metadata_player__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var icecast_metadata_stats__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! icecast-metadata-stats */ "./node_modules/icecast-metadata-stats/src/IcecastMetadataStats.js");


/* harmony default export */ __webpack_exports__["default"] = ({
  methods: {
    afterPrepareForStream: function afterPrepareForStream(index) {
      var audio = this.playlist[index];
      this.currentAudio.title = audio.name;
      this.resetAudioElement();
    },
    playStream: function playStream() {
      this.afterPrepareForStream(this.currentAudio.index);
      this.initStreamPlayer(this.currentAudio);
    },
    killStreamIfExists: function killStreamIfExists() {
      this.streamAudioElement = null;

      if (this.streamPlayer) {
        this.streamPlayer.stop();
        this.streamPlayer.detachAudioElement();
        this.streamStats.stop();
        this.streamPlayer = null;
        this.streamStats = null;
      }
    },
    failedToPlay: function failedToPlay() {
      this.$notify({
        group: "foo",
        type: "warning",
        title: this.$t("Error"),
        text: this.$t("Failed to load the audio source")
      });

      if (this.queue.length > 1) {
        this.goNext();
      } else {
        this.$store.state.queue = []; // kill the stream

        this.killStreamIfExists();
      }
    },
    updateMetaData: function updateMetaData(source, stats) {
      if (source === 'server') {
        this.currentAudio.title = stats.title;
        this.currentAudio.artist = stats.artist;
      } else {
        if (stats) {
          if (stats.icestats && stats.icestats.source && stats.icestats.source.title) {
            this.currentAudio.title = stats.icestats.source.title || this.currentAudio.name;
          } else if (stats.icy) {
            this.currentAudio.title = stats.icy.StreamTitle || this.currentAudio.name;
          } else if (stats.ogg) {
            if (stats.ogg.TITLE) {
              this.currentAudio.title = stats.ogg.TITLE || this.currentAudio.name;
            }

            if (stats.ogg.ARTIST) {
              this.currentAudio.artist = stats.ogg.ARTIST;
            }
          }

          document.title = "\u25B6 " + this.currentAudio.title;
        }
      }
    },
    getMetaDataUsingProxy: function getMetaDataUsingProxy(stationID) {
      var _this = this;

      axios.get("/api/get-stream-metadata-pr/" + stationID).then(function (res) {
        _this.updateMetaData('proxy', res.data);
      })["catch"](function () {
        return {};
      });
    },
    getMetaDataFromServer: function getMetaDataFromServer(stationID) {
      var _this2 = this;

      axios.get("/api/get-stream-metadata-sr/" + stationID, {}).then(function (res) {
        _this2.updateMetaData('server', res.data);
      })["catch"](function () {
        return {};
      });
    },
    startFetchMetadata: function startFetchMetadata(station) {
      if (station.statsSource === 'endpoint') {
        this.metadataFetcher = setInterval(function x() {
          this.getMetaDataUsingProxy(station.id);
        }.bind(this), station.interval || 5000);
      } else {
        this.metadataFetcher = setInterval(function x() {
          this.getMetaDataFromServer(station.id);
        }.bind(this), station.interval || 5000);
      }
    },
    initStreamPlayer: function initStreamPlayer(station) {
      var _this3 = this;

      if (station.statsSource === 'endpoint' && !station.proxy) {
        this.canPlay = true;
        this.isLoading = true;
        var timeInterval = 0;
        this.streamStats = new icecast_metadata_stats__WEBPACK_IMPORTED_MODULE_1__["default"](station.streamEndpoint, {
          sources: ["icestats", "ogg", "icy"],
          interval: 10,
          onStats: function onStats(stats) {
            _this3.updateMetaData('client', stats);
          }
        }); // creating new audio Element just for the volume since attaching the
        // audioPlayer causes bugs

        var volume = this.volume;
        this.streamAudioElement = new Audio();
        this.volume = volume;
        this.streamPlayer = new icecast_metadata_player__WEBPACK_IMPORTED_MODULE_0___default.a(station.statsEndpoint, {
          metadataTypes: station.metadata_types,
          audioElement: this.streamAudioElement,
          onRetry: function onRetry() {
            _this3.retryCount++;

            if (_this3.retryCount > 10) {
              _this3.failedToPlay();
            }
          },
          onPlay: function onPlay() {
            _this3.interval = setInterval(function () {
              timeInterval++;
              _this3.currentAudio.currentTime = _this3.getTimeFormat(timeInterval.toFixed(0));
            }, 1000);
            _this3.currentAudio.isStopped = false;
            _this3.currentAudio.isPlaying = true;
          },
          onStreamStart: function onStreamStart() {
            _this3.isLoading = false;
          },
          onLoading: function onLoading() {
            _this3.isLoading = true;
          },
          onStop: function onStop() {
            clearInterval(_this3.interval);
            _this3.currentAudio.isStopped = true;

            if (_this3.audioPlayer.paused) {
              _this3.currentAudio.isPlaying = false;
            }
          }
        });
        this.streamStats.start();
        this.streamPlayer.play();
      } else {
        this.startFetchMetadata(station);
        this.updateAudioElement(this.currentAudio.streamEndpoint);
        this.playPause();
      }

      this.$store.commit("setCurrentAudio", {
        id: this.currentAudio.id,
        type: this.currentAudio.type
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/mixins/player/update.js":
/*!**********************************************!*\
  !*** ./resources/js/mixins/player/update.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


/* harmony default export */ __webpack_exports__["default"] = ({
  methods: {
    updateCurrentAudio: function updateCurrentAudio(index, force) {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.isLoading = true;

                _this.reset();

                _context.next = 4;
                return _this.prepare(index);

              case 4:
                if (_this.$store.getters.getSettings.autoPlay && _this.$store.getters.getQueue.length < 2) {
                  _this.fetchSimilarities(index);
                }

                if (_this.isCurrentAudioAYoutubeVideo) {
                  _this.playYoutubeVideo(index, force);
                } else if (_this.isCurrentAudioAFileAudio) {
                  _this.playAudioFile(index, force);
                } else if (_this.isCurrentAudioAStream) {
                  _this.playStream(index, force);
                }

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    reset: function reset() {
      clearInterval(this.timeUpdater);
      clearInterval(this.metadataFetcher);
      this.initCurrentAudioObj();
      this.resetBasicValues();
      this.resetAudioElement();
      this.resetTime();
      this.killStreamIfExists(); // this.initCurrentAudioObj();
      // stop the video if it is mounted

      if (this.videoPlayer && this.videoPlayer.stopVideo) {
        this.videoPlayer.stopVideo();
      }
    },
    playAudioFile: function playAudioFile(index, force) {
      this.updateAudioElement(this.currentAudio.source);

      if (this.currentAudio.index !== 0 || force || this.buttons.shuffle) {
        this.playPause();
      }
    },
    // async afterPrepareForNonStream(index) {
    //     var audio = this.playlist[index];
    //     if( !audio.source ) {
    //         await this.getYoutubeVideoIfExists(audio.title);
    //         return;
    //     }
    //     return
    // },
    prepare: function prepare(index) {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        var audio, res, title, artist;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                audio = _this2.playlist[index];
                _this2.currentAudio.index = index; // updating the currentAudio with the new audio values

                Object.keys(audio).forEach(function (key) {
                  _this2.$set(_this2.currentAudio, key, audio[key]);
                });

                if (!(audio.type === "podcast" && audio.origin === "listenNotes")) {
                  _context2.next = 10;
                  break;
                }

                _context2.next = 6;
                return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("/api/podcast/" + audio.id);

              case 6:
                res = _context2.sent;
                audio = res.data;
                _context2.next = 19;
                break;

              case 10:
                if (!(!_this2.isCurrentAudioAStream && !_this2.currentAudio.source)) {
                  _context2.next = 18;
                  break;
                }

                title = _this2.currentAudio.title;
                artist = _this2.currentAudio.artists.length ? _this2.currentAudio.artists[0].name ? _this2.currentAudio.artists[0].name : _this2.currentAudio.artists[0].displayname : '';
                _context2.next = 15;
                return _this2.getYoutubeVideoIfExists(title, artist);

              case 15:
                _this2.currentAudio.source = _context2.sent;
                _context2.next = 19;
                break;

              case 18:
                if (_this2.isCurrentAudioAStream) {
                  _this2.currentAudio.source = _this2.currentAudio.streamEndpoint;
                }

              case 19:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    initCurrentAudioObj: function initCurrentAudioObj() {
      this.currentAudio = {
        src: null,
        title: "",
        album: "",
        artist: "",
        progress: 0,
        duration: "-:--",
        currentTime: "0:00",
        streamEndpoint: null,
        videoCurrentTime: 0,
        isPlaying: false
      };
    },
    updateAudioElement: function updateAudioElement(source) {
      this.audioPlayer.src = source;
      this.audioPlayer.load();
    },
    resetAudioElement: function resetAudioElement() {
      this.audioPlayer.pause();
    },
    resetBasicValues: function resetBasicValues() {
      // resetting basic keys
      this.currentAudio.isPlaying = false;
      this.currentAudio.duration = "-:--";
      this.currentAudio.source_format = null;
      this.currentAudio.file_name = null;
      this.currentAudio.source = null;
      this.currentAudio.progress = 0;
      this.currentAudio.currentTime = "0:00";
    },
    updateTime: function updateTime(currentTime, duration) {
      // updating the bar progress
      if (!this.isCurrentAudioAStream) {
        if (this.audioPlayer.duration === Infinity && !this.isCurrentAudioAYoutubeVideo) {
          this.currentAudio.duration = "live";
          this.currentAudio.progress = 100;
        } else if (currentTime < duration || currentTime == 0) {
          this.currentAudio.progress = currentTime / duration * 100;
        } else {
          this.currentAudio.progress = 0;
        }

        if (!isNaN(currentTime) && !isNaN(duration) && duration - currentTime <= 5) {
          this.audioStatus = "ending";
        } else if (!isNaN(currentTime) && !isNaN(duration) && currentTime >= 0 && currentTime <= 5) {
          this.audioStatus = "starting";
        } else {
          this.audioStatus = null;
        }
      } // updating the current time "xx:yy"


      this.$set(this.currentAudio, 'currentTime', this.getTimeFormat(currentTime.toFixed(0)));
    },
    easeVolumeRaise: function easeVolumeRaise() {
      var _this3 = this;

      var initVolume = this.volume;
      var dropDownVolume = setInterval(function () {
        _this3.volume = _this3.volume + _this3.volume / 20;

        if (_this3.volume >= initVolume) {
          clearInterval(dropDownVolume);
        }
      }, 250);
    },
    easeVolumeDrop: function easeVolumeDrop() {
      var _this4 = this;

      var initVolume = this.volume;
      this.volume = 0;
      var dropDownVolume = setInterval(function () {
        _this4.volume = _this4.volume - _this4.volume / 20;

        if (_this4.volume <= initVolume) {
          clearInterval(dropDownVolume);
        }
      }, 250);
    },
    getYoutubeVideoIfExists: function getYoutubeVideoIfExists(title, artist) {
      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
        var res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('/api/track-source?title=' + title + '&artist=' + artist);

              case 3:
                res = _context3.sent;
                return _context3.abrupt("return", res.data);

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", null);

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 7]]);
      }))();
    },
    fetchSimilarities: function fetchSimilarities(index) {
      var _this5 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4() {
        var audio;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                audio = _this5.playlist[index];
                axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('/api/next-songs?id=' + audio.id + "&origin=" + audio.origin).then(function (res) {
                  if (res.data.length) {
                    _this5.$store.dispatch('updateQueue', {
                      content: res.data,
                      reset: false
                    });
                  }
                });

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    }
  }
});

/***/ }),

/***/ "./resources/js/mixins/player/volume.js":
/*!**********************************************!*\
  !*** ./resources/js/mixins/player/volume.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  computed: {
    volume: {
      set: function set(val) {
        if (this.streamAudioElement) {
          this.streamAudioElement.volume = val / 100;
        } else if (this.videoPlayer && this.isCurrentAudioAYoutubeVideo) {
          this.videoPlayer.setVolume(val);
        } else {
          this.audioPlayer.volume = val / 100;
        }
      },
      get: function get() {
        if (this.streamAudioElement) {
          return Math.round(this.streamAudioElement.volume * 100);
        } else if (this.videoPlayer && this.videoPlayer.getVolume) {
          return this.videoPlayer.getVolume() || 70;
        } else {
          return Math.round(this.audioPlayer.volume * 100);
        }
      }
    }
  },
  methods: {
    muteAudio: function muteAudio() {
      if (this.audioPlayer.muted) {
        this.audioPlayer.muted = false;
        this.volumeButton = "volume-high";
      } else {
        this.audioPlayer.muted = true;
        this.volumeButton = "volume-off";
      }

      if (this.streamAudioElement) {
        if (this.streamAudioElement.muted) {
          this.streamAudioElement.muted = false;
          this.volumeButton = "volume-high";
        } else {
          this.volumeButton = "volume-off";
          this.streamAudioElement.muted = true;
        }
      }

      if (this.isCurrentAudioAYoutubeVideo) {
        if (!this.videoPlayer.isMuted()) {
          this.videoPlayer.mute();
          this.volumeButton = "volume-off";
        } else {
          this.volumeButton = "volume-high";
          this.videoPlayer.unMute();
        }
      }
    }
  }
});

/***/ }),

/***/ "./resources/js/mixins/player/youTube.js":
/*!***********************************************!*\
  !*** ./resources/js/mixins/player/youTube.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  methods: {
    playYoutubeVideo: function playYoutubeVideo(index, force) {
      if (this.$store.getters.getSettings.allowVideos) {
        if (this.currentAudio.index !== 0 || force || this.buttons.shuffle) {
          this.setVideo(this.currentAudio.source, this.videoReadyCallback, this.videoStatusChangeCallback);
        }
      } else {
        // Sorry, can't play this song
        this.$notify({
          group: "foo",
          type: "warning",
          title: this.$t("Oops!"),
          text: this.$t("Sorry, you can not play YouTube videos.")
        });
      }
    },
    setVideo: function setVideo(youtube_id, readyCallback, stateChangedCallback) {
      var _this = this;

      if (!this.videoPlayer) {
        this.$nextTick(function () {
          _this.videoPlayer = new YT.Player("youtube_video_container", {
            width: "500",
            height: "305",
            videoId: youtube_id,
            events: {
              onReady: readyCallback,
              onStateChange: stateChangedCallback
            }
          });
        });
      } else {
        this.videoPlayer.loadVideoById(youtube_id, 0);
      }

      this.$store.commit("setCurrentAudio", this.currentAudio);
    },
    videoStatusChangeCallback: function videoStatusChangeCallback(event) {
      this.videoStatus = event.data;
    },
    videoReadyCallback: function videoReadyCallback(event) {
      this.currentAudio.duration = event.target.getDuration(); // update volume

      this.videoPlayer.setVolume(this.volume);
      this.isLoading = false;
      this.playPause();
    }
  },
  watch: {
    videoStatus: function videoStatus(val) {
      switch (val) {
        case -1:
          if (this.currentAudio.source_format === "yt_video") {
            this.isLoading = false;
          }

          break;

        case 0:
          this.onended();
          break;

        case 1:
          this.currentAudio.duration = this.videoPlayer.getDuration();
          this.isLoading = false;
          this.currentAudio.isPlaying = true;
          var self = this;

          var updateTime = function updateTime() {
            var oldTime = self.currentAudio.videoCurrentTime;

            if (self.videoPlayer && self.videoPlayer.getCurrentTime) {
              self.currentAudio.videoCurrentTime = self.videoPlayer.getCurrentTime();
            }

            if (self.currentAudio.videoCurrentTime !== oldTime) {
              self.updateTime(self.currentAudio.videoCurrentTime, self.videoPlayer.getDuration());
            }
          };

          this.timeUpdater = setInterval(updateTime, 100);
          break;

        case 2:
          clearInterval(this.timeUpdater);
          this.currentAudio.isPlaying = false;
          break;

        case 3:
          this.isLoading = true;
          break;
      }
    }
  }
});

/***/ })

}]);