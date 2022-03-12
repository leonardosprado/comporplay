(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin~artist"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dialogs/AttachSong.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/dialogs/AttachSong.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['creator'],
  data: function data() {
    return {
      selectedSong: null,
      searchedSongs: [],
      isSearchSongLoading: false,
      searchSongs: null
    };
  },
  watch: {
    searchSongs: function searchSongs(val) {
      var _this = this;

      // Items have already been requested
      if (this.isSearchSongLoading) return;
      this.isSearchSongLoading = true; // Lazily load input items

      axios.get("/api/" + (this.creator === 'artist' ? "artist/match-songs" : "match-songs") + "?query=" + val).then(function (res) {
        _this.searchedSongs = res.data;
      })["catch"]()["finally"](function () {
        return _this.isSearchSongLoading = false;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dialogs/edit/Album.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/dialogs/edit/Album.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuedraggable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuedraggable */ "./node_modules/vuedraggable/dist/vuedraggable.umd.js");
/* harmony import */ var vuedraggable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vuedraggable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Song__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Song */ "./resources/js/components/dialogs/edit/Song.vue");
/* harmony import */ var _dialogs_AttachSong__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../dialogs/AttachSong */ "./resources/js/components/dialogs/AttachSong.vue");
/* harmony import */ var _dialogs_admin_AttachAssetDialog_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../dialogs/admin/AttachAssetDialog.vue */ "./resources/js/components/dialogs/admin/AttachAssetDialog.vue");
/* harmony import */ var _mixins_billing_billing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mixins/billing/billing */ "./resources/js/mixins/billing/billing.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  props: ["album", "creator"],
  created: function created() {
    var _this = this;

    axios.get("/api/prices").then(function (res) {
      _this.previousPrices = _this.previousPrices = res.data;
    });
  },
  mixins: [_mixins_billing_billing__WEBPACK_IMPORTED_MODULE_4__["default"]],
  components: {
    draggable: vuedraggable__WEBPACK_IMPORTED_MODULE_0___default.a,
    editSongDialog: _Song__WEBPACK_IMPORTED_MODULE_1__["default"],
    AttachAssetDialog: _dialogs_admin_AttachAssetDialog_vue__WEBPACK_IMPORTED_MODULE_3__["default"],
    attachSongDialog: _dialogs_AttachSong__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  computed: {
    isShowing: function isShowing() {
      var _this2 = this;

      return function (song_id) {
        return _this2.editedAlbum.songs[_this2.editedAlbum.songs.findIndex(function (song) {
          return song.id === song_id;
        })].isShowing;
      };
    },
    canBeProduct: function canBeProduct() {
      return this.creator === "admin" || this.creator === "artist";
    }
  },
  data: function data() {
    return {
      editedAlbum: JSON.parse(JSON.stringify(this.album)),
      firstCopy: this.album,
      artistsFocused: false,
      editDialog: false,
      artistsComp: true,
      songToBeDeleted: null,
      defaultCoverPath: "/storage/defaults/images/album_cover.png",
      deleteSongConfirmationDialog: false,
      editingSong: null,
      artists: [],
      addSong: false,
      dateMenu: false,
      isLoading: false,
      errors: {},
      licenseDialog: false,
      selectedLicense: 0,
      editedLicense: {},
      licenses: (this.album.product ? this.album.product.prices : []) || [],
      importFromSpotifyDialog: false,
      progress: null,
      songTableHeaders: [{
        text: ""
      }, {
        text: this.$t("#"),
        sortable: true
      }, {
        text: this.$t("Cover"),
        align: "start",
        sortable: false,
        value: "cover"
      }, {
        text: this.$t("Title"),
        value: "title"
      }, {
        text: this.$t("Artists"),
        value: "artists",
        align: "center"
      }, {
        text: this.$t("Plays"),
        value: "plays",
        align: "center"
      }, {
        text: this.$t("Likes"),
        value: "likes",
        align: "center"
      }, {
        text: this.$t("Created At"),
        value: "created_at"
      }, {
        text: this.$t("Operations"),
        value: "operations",
        align: "center"
      }]
    };
  },
  watch: {
    dateMenu: function dateMenu(val) {
      var _this3 = this;

      val && setTimeout(function () {
        return _this3.$refs.picker.activePicker = "YEAR";
      });
    },
    importFromSpotifyDialog: function importFromSpotifyDialog() {
      var _this4 = this;

      this.artistsComp = false;
      setTimeout(function () {
        _this4.artistsComp = true;
      }, 10);
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.$emit("beforeDestroy");
  },
  methods: {
    addLicense: function addLicense() {
      var _this5 = this;

      if (this.selectedLicense) {
        var selectedLicense = this.previousPrices.find(function (wx) {
          return wx.id === _this5.selectedLicense;
        });
      } else {
        // validation
        if (!this.editedLicense.name) {
          return this.$notify({
            group: "foo",
            type: "error",
            title: this.$t("Oops!"),
            text: this.$t("Please provide a name for the license.")
          });
        }

        if (!this.editedLicense.amount || isNaN(this.editedLicense.amount)) {
          return this.$notify({
            group: "foo",
            type: "error",
            title: this.$t("Oops!"),
            text: this.$t("Please enter a correct amount.")
          });
        } else if (!isNaN(this.editedLicense.amount) && this.editedLicense.amount < 50) {
          return this.$notify({
            group: "foo",
            type: "error",
            title: this.$t("Oops!"),
            text: this.$t("Please enter a value above 50 on the amount (minimum charge for Stripe)")
          });
        }

        var selectedLicense = this.editedLicense;
      }

      this.licenses.push(_objectSpread({}, selectedLicense));
      this.licenseDialog = false;
      this.selectedLicense = 0;
      this.editedLicense = {};
      this.$notify({
        group: "foo",
        type: "success",
        title: this.$t("Added"),
        text: this.$t("License added!")
      });
    },
    closeWindow: function closeWindow() {
      var _this6 = this;

      var changed = false;

      if (JSON.stringify(this.editedAlbum) != JSON.stringify(this.firstCopy)) {
        changed = true;
      }

      if (changed) {
        this.$confirm({
          message: "".concat(this.$t("Are you sure you wanna quit without saving the changes?")),
          button: {
            no: this.$t("Cancel"),
            yes: this.$t("Discard")
          },

          /**
           * Callback Function
           * @param {Boolean} confirm
           */
          callback: function callback(confirm) {
            if (confirm) {
              _this6.editedAlbum.title = _this6.firstCopy.title;
              _this6.editedAlbum.artist = _this6.firstCopy.artist;
              _this6.editedAlbum.cover = _this6.firstCopy.cover;
              _this6.editedAlbum.release_date = _this6.firstCopy.release_date;

              _this6.$emit("close");
            }
          }
        });
      } else {
        this.$emit("close");
      }
    },
    updateProgress: function updateProgress(progress, song_id) {
      var index = this.editedAlbum.songs.findIndex(function (song) {
        return song.id === song_id;
      });
      this.$set(this.editedAlbum.songs[index], "progress", progress);
    },
    addSpotifyData: function addSpotifyData(data) {
      this.editedAlbum.cover = data.cover;
      this.editedAlbum.title = data.title;
      this.editedAlbum.artists = data.artists;
      this.importFromSpotifyDialog = false;
    },
    saveReleaseDate: function saveReleaseDate(date) {
      this.$refs.menu.save(date);
    },
    cancelUpload: function cancelUpload(song_id) {
      var index = this.editedAlbum.songs.findIndex(function (song) {
        return song.id === song_id;
      });
      this.editedAlbum.songs[index].requestSource.cancel();
      this.editSong(song_id);
    },
    sleepSong: function sleepSong(song_id) {
      this.editDialog = false;
      var index = this.editedAlbum.songs.findIndex(function (song) {
        return song.id === song_id;
      });
      this.$set(this.editedAlbum.songs[index], "isShowing", false);
    },
    goodByeSong: function goodByeSong() {
      var _this7 = this;

      var index = this.editedAlbum.songs.findIndex(function (song) {
        return song.id === _this7.songToBeDeleted;
      });

      if (this.editedAlbum.songs[index].requestSource) {
        this.editedAlbum.songs[index].requestSource.cancel();
      }

      this.deleteSongConfirmationDialog = false;
      this.editedAlbum.songs.splice(index, 1);
      axios["delete"]("/api/songs/" + this.songToBeDeleted).then(function () {
        _this7.$notify({
          group: "foo",
          type: "success",
          title: _this7.$t("Deleted"),
          text: _this7.$t("Song") + " " + _this7.$t("Deleted") + "."
        });
      })["catch"](function (e) {});
      this.songToBeDeleted = null;
    },
    wakeSong: function wakeSong(song_id) {
      this.editDialog = true;
      var index = this.editedAlbum.songs.findIndex(function (song) {
        return song.id === song_id;
      });
      this.$set(this.editedAlbum.songs[index], "isShowing", true);
    },
    hideAllsongs: function hideAllsongs() {
      for (var i = 0; i < this.editedAlbum.songs.length; i++) {
        this.$set(this.editedAlbum.songs[i], "isShowing", false);
      }

      this.editDialog = false;
    },
    imageReady: function imageReady(e) {
      this.editedAlbum.cover = e;
    },
    deleteSong: function deleteSong(song_id) {
      this.songToBeDeleted = song_id;
      this.deleteSongConfirmationDialog = true;
    },
    editSong: function editSong(song_id) {
      if (song_id === "new") {
        this.editedAlbum.songs.unshift({
          id: Math.floor(Math.random() * (100000 - 5000) + 100000),
          "new": true,
          genres: [],
          isActive: true,
          "public": true,
          isShowing: true,
          artists: this.editedAlbum.artists,
          cover: this.editedAlbum.cover.data ? this.editedAlbum.cover.data : this.editedAlbum.cover,
          nb_likes: 0,
          nb_plays: 0,
          source_format: "file"
        });
        this.editDialog = true;
      } else {
        this.editedAlbum.songs[this.editedAlbum.songs.findIndex(function (song) {
          return song.id === song_id;
        })].isActive = true;
        this.editedAlbum.songs[this.editedAlbum.songs.findIndex(function (song) {
          return song.id === song_id;
        })].isShowing = true;
        this.editDialog = true;
      }
    },
    closeSong: function closeSong(song_id) {
      var index = this.editedAlbum.songs.findIndex(function (song) {
        return song.id === song_id;
      });

      if (this.editedAlbum.songs[index].isShowing) {
        this.editDialog = false;
      }

      this.$set(this.editedAlbum.songs[index], "isShowing", false);
      this.$set(this.editedAlbum.songs[index], "isActive", false);
      this.$forceUpdate();
    },
    songEdited: function songEdited(song_id) {
      var index = this.editedAlbum.songs.findIndex(function (song) {
        return song.id === song_id;
      });
      this.$set(this.editedAlbum.songs[index], "progress", 0);
      this.$set(this.editedAlbum.songs[index], "isActive", false);
      this.$notify({
        group: "foo",
        type: "success",
        title: this.$t("Saved"),
        text: this.$t("Song") + " " + this.$t("Updated") + "."
      });
    },
    songCreated: function songCreated() {
      this.saveAlbum();
      this.$notify({
        group: "foo",
        type: "success",
        title: this.$t("Created"),
        text: this.$t("Song") + " " + this.$t("Created") + "."
      });
    },
    fetchArtists: function fetchArtists(search, loading) {
      var _this8 = this;

      if (search) {
        loading(true), axios.get("/api/match-artists/" + search).then(function (res) {
          return _this8.artists = res.data.map(function (artist) {
            return {
              id: artist.id,
              displayname: artist.displayname,
              avatar: artist.avatar
            };
          });
        })["finally"](function () {
          return loading(false);
        });
      }
    },
    attachSong: function attachSong(song) {
      var _this9 = this;

      axios.post("/api/attach-to-album", {
        album_id: this.album.id,
        song_id: song.id
      }).then(function () {
        _this9.$notify({
          group: "foo",
          type: "success",
          title: _this9.$t("Added"),
          text: _this9.$t("Song attached to album.")
        });

        _this9.editedAlbum.songs.push(song);

        _this9.addSong = false;
      });
    },
    detachSong: function detachSong(song_id) {
      var _this10 = this;

      axios.post("/api/detach-from-album", {
        album_id: this.album.id,
        song_id: song_id
      }).then(function () {
        _this10.$notify({
          group: "foo",
          type: "success",
          title: _this10.$t("Added"),
          text: _this10.$t("Song detached from album!")
        });

        var index = _this10.editedAlbum.songs.findIndex(function (song) {
          return song.id === song_id;
        });

        _this10.editedAlbum.songs.splice(index, 1);
      });
    },
    saveAlbum: function saveAlbum(emit) {
      var _this11 = this;

      var formData = new FormData();
      this.isLoading = true;

      if (this.editedAlbum.cover && this.editedAlbum.cover.data) {
        // if cover was picked, the value is stored as an object from the CropImage component
        formData.append("cover", this.editedAlbum.cover.data, this.editedAlbum.cover.title);
      } else if (this.editedAlbum.cover && !this.editedAlbum.cover.data) {
        // no cover was picked, the value is stored as a string
        formData.append("cover", this.editedAlbum.cover);
      } else {
        formData.append("cover", this.defaultCoverPath);
      }

      if (this.editedAlbum.title) {
        formData.append("title", this.editedAlbum.title);
      } // links


      if (this.editedAlbum.spotify_link) {
        formData.append("spotify_link", this.editedAlbum.title);
      }

      if (this.editedAlbum.youtube_link) {
        formData.append("youtube_link", this.editedAlbum.youtube_link);
      }

      if (this.editedAlbum.soundcloud_link) {
        formData.append("soundcloud_link", this.editedAlbum.soundcloud_link);
      }

      if (this.editedAlbum.itunes_link) {
        formData.append("itunes_link", this.editedAlbum.itunes_link);
      }

      if (this.editedAlbum.deezer_link) {
        formData.append("deezer_link", this.editedAlbum.deezer_link);
      }

      if (this.editedAlbum.release_date) {
        formData.append("release_date", this.editedAlbum.release_date);
      }

      if (this.editedAlbum.songs) {
        formData.append("songs", JSON.stringify(this.editedAlbum.songs.map(function (s) {
          return s.id;
        })));
      }

      if (this.editedAlbum.isExclusive) {
        formData.append("isExclusive", 1);
      } else {
        formData.append("isExclusive", 0);
      }

      if (this.editedAlbum.isExplicit) {
        formData.append("isExplicit", 1);
      } else {
        formData.append("isExplicit", 0);
      }

      if (this.editedAlbum.isProduct) {
        formData.append("isProduct", 1);

        if (!this.licenses.length) {
          this.isLoading = false;
          return this.$notify({
            group: "foo",
            type: "error",
            title: this.$t("Error"),
            text: this.$t("Please add atleast one license/price")
          });
        } else {
          formData.append("licenses", JSON.stringify(this.licenses));
        }
      } else {
        formData.append("isProduct", 0);
      }

      if (this.editedAlbum.artists.length) {
        formData.append("artists", JSON.stringify(this.editedAlbum.artists));
      }

      formData.append("created_by", this.creator);

      if (this.editedAlbum["new"]) {
        axios.post("/api/albums", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          onUploadProgress: function onUploadProgress(progressEvent) {
            var percentCompleted = Math.floor(progressEvent.loaded * 100 / progressEvent.total);
            _this11.progress = percentCompleted;
          }
        }).then(function () {
          _this11.$emit("created");

          _this11.isLoading = false;
        })["catch"](function (e) {
          _this11.progress = 0;
          _this11.isLoading = false;
          _this11.errors = e.response.data.errors; // this.$notify({
          //     group: "foo",
          //     type: "error",
          //     title: this.$t("Error"),
          //     text: Object.values(e.response.data.errors).join(
          //         "<br />"
          //     )
          // });
        });
      } else {
        formData.append("album_id", this.editedAlbum.id);
        formData.append("_method", "PUT");
        axios.post("/api/albums/" + this.editedAlbum.id, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          onUploadProgress: function onUploadProgress(progressEvent) {
            var percentCompleted = Math.floor(progressEvent.loaded * 100 / progressEvent.total);
            _this11.progress = percentCompleted;
          }
        }).then(function () {
          if (emit) {
            _this11.$emit("updated");
          }

          _this11.isLoading = false;
        })["catch"](function (e) {
          _this11.progress = 0;
          _this11.isLoading = false; // this.$notify({
          //     group: "foo",
          //     type: "error",
          //     title: this.$t("Error"),
          //     text: Object.values(e.response.data.errors).join(
          //         "<br />"
          //     )
          // });
        });
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dialogs/edit/Episode.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/dialogs/edit/Episode.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vuetify_lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuetify/lib */ "./node_modules/vuetify/lib/index.js");


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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  props: ["episode", "podcast_id", "uploader"],
  components: {
    veutifySelect: vuetify_lib__WEBPACK_IMPORTED_MODULE_1__["VSelect"]
  },
  data: function data() {
    var _this = this;

    return {
      firstCopy: JSON.parse(JSON.stringify(this.episode)),
      rules: {
        fileSize: function fileSize(file) {
          return (file === null || file === void 0 ? void 0 : file.size) < parseInt(_this.$store.getters.getSettings.maxFileSize) * 1024 * 1024 || "Max file size is " + _this.$store.getters.getSettings.maxFileSize + _this.$t("MB");
        }
      },
      editedEpisode: this.episode,
      episodeFile: null,
      artistsFocused: false,
      rolesDialog: false,
      progress: null,
      isLoading: false,
      fileSize: null,
      episodeSourceLoading: false,
      sourceFormats: [{
        value: "file",
        text: this.$t('Audio File'),
        icon: "file-chart"
      }, {
        value: "yt_video",
        text: this.$t('YouTube Video'),
        icon: "youtube"
      }],
      autoDuration: true,
      error: false
    };
  },
  computed: {
    sourceMissing: function sourceMissing() {
      return !this.episodeFile && !this.editedEpisode.source;
    }
  },
  methods: {
    imageReady: function imageReady(e) {
      this.editedEpisode.cover = e;
    },
    loadEpisodeMetadata: function loadEpisodeMetadata(file) {
      var _this2 = this;

      if (!file) return this.episodeFile = null, this.editedEpisode.source = null;
      this.episodeSourceLoading = true;
      return new Promise(function (res, rej) {
        _this2.getAudioMetadata(file ? file : _this2.editedEpisode.source, function (audioMetadata) {
          if (!audioMetadata) {
            this.$notify({
              group: "foo",
              type: "error",
              title: this.$t("File corrupted!"),
              text: this.$t("The source file you are trying to upload is corrupted.")
            });
            this.episodeSourceLoading = false;
            rej();
            return;
          }

          this.episodeFile = file;
          this.fileSize = file.size;
          this.editedEpisode.duration = Math.floor(audioMetadata.duration);
          this.episodeSourceLoading = false;
          res();
        }.bind(_this2));
      });
    },
    closeWindow: function closeWindow() {
      var _this3 = this;

      var changed = false;

      if (this.editedEpisode.title != this.firstCopy.title) {
        changed = true;
      }

      if (this.episodeFile || changed) {
        this.$confirm({
          message: "".concat(this.$t("Are you sure you wanna quit without saving the changes ? maybe consider just hiding the window.")),
          button: {
            no: this.$t("Cancel"),
            yes: this.$t("Discard")
          },
          callback: function callback(confirm) {
            if (confirm) {
              if (_this3.editedEpisode.requestSource) {
                _this3.editedEpisode.requestSource.cancel();
              }

              _this3.editedEpisode.title = _this3.firstCopy.title;

              _this3.$emit("close");
            }
          }
        });
      } else {
        this.$emit("close");
      }
    },
    cancelRequest: function cancelRequest() {
      this.editedEpisode.progress = null;
      this.editedEpisode.requestSource.cancel("upload canceled");
    },
    getYoutubeVideoID: function getYoutubeVideoID() {
      var string = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      if (string) {
        if (string.length === 11) {
          return string;
        }

        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = string.match(regExp);
        return match && match[7].length == 11 ? match[7] : "";
      }

      return "";
    },
    saveEpisode: function saveEpisode() {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var formData, duration, videoID, promise, request;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                formData = new FormData();
                formData.append("podcast_id", _this4.podcast_id);
                formData.append("description", _this4.editedEpisode.description || "");
                formData.append("title", _this4.editedEpisode.title || "");
                _this4.isLoading = true;

                if (!(_this4.editedEpisode.source_format === "yt_video")) {
                  _context.next = 15;
                  break;
                }

                // source format is youtube video
                videoID = _this4.getYoutubeVideoID(_this4.editedEpisode.source);

                if (!(_this4.editedEpisode.source && videoID)) {
                  _context.next = 11;
                  break;
                }

                formData.append("source", videoID);
                _context.next = 12;
                break;

              case 11:
                return _context.abrupt("return", _this4.$notify({
                  group: "foo",
                  type: "error",
                  title: _this4.$t("Error"),
                  text: _this4.$t('Please add a valid YouTube video ID or URL.')
                }));

              case 12:
                duration = _this4.editedEpisode.duration;
                _context.next = 16;
                break;

              case 15:
                if (_this4.editedEpisode.source_format === "file") {
                  promise = new Promise(function (res, rej) {
                    if (_this4.episodeFile || _this4.editedEpisode.source) {
                      if (!_this4.autoDuration && _this4.editedEpisode.duration > 1) {
                        duration = _this4.editedEpisode.duration;
                        res();
                      } else {
                        _this4.loadEpisodeMetadata(_this4.episodeFile ? _this4.episodeFile : _this4.editedEpisode.source);

                        duration = _this4.editedEpisode.duration;
                        res();
                      }
                    } else {
                      return _this4.$notify({
                        group: "foo",
                        type: "error",
                        title: _this4.$t("Error"),
                        text: _this4.$t('Please add a valid source file.')
                      });
                    }
                  });
                }

              case 16:
                if (!promise) {
                  _context.next = 25;
                  break;
                }

                _context.prev = 17;
                _context.next = 20;
                return promise;

              case 20:
                _context.next = 25;
                break;

              case 22:
                _context.prev = 22;
                _context.t0 = _context["catch"](17);
                return _context.abrupt("return", _this4.$notify({
                  group: "foo",
                  type: "error",
                  title: _this4.$t("Error"),
                  text: _context.t0
                }));

              case 25:
                request = axios.CancelToken.source();
                _this4.editedEpisode.requestSource = request;
                _this4.isLoading = true;
                formData.append("source_format", _this4.editedEpisode.source_format);

                _this4.$emit("sleep");

                if (_this4.episodeFile) {
                  formData.append("source", _this4.episodeFile);
                  formData.append("file_size", _this4.fileSize);
                }

                formData.append("duration", duration || '');

                if (_this4.editedEpisode["new"]) {
                  formData.append("new", true);
                  formData.append("uploaded_by", _this4.uploader);

                  _this4.createNewEpisode(formData);
                } else {
                  formData.append("id", _this4.editedEpisode.id);

                  _this4.updateEpisode(formData);
                }

              case 33:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[17, 22]]);
      }))();
    },
    updateEpisode: function updateEpisode(formData) {
      var _this5 = this;

      formData.append("_method", "PUT");
      axios.post("/api/episodes/" + this.editedEpisode.id, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        cancelToken: this.editedEpisode.requestSource.token,
        onUploadProgress: function onUploadProgress(progressEvent) {
          var percentCompleted = Math.floor(progressEvent.loaded * 100 / progressEvent.total);
          _this5.progress = percentCompleted === 100 ? 99 : percentCompleted;

          _this5.$emit("progress", _this5.progress);
        }
      }).then(function (res) {
        _this5.$emit("updated");

        _this5.$emit("progress", 100);

        _this5.editedEpisode = res.data;
        _this5.isLoading = false;

        _this5.$emit("close");
      })["catch"](function (e) {
        _this5.editedEpisode.progress = null;
        _this5.isLoading = false;

        _this5.$emit("wake");

        _this5.$notify({
          group: "foo",
          type: "error",
          title: _this5.$t("Error"),
          text: Object.values(e.response.data.errors).join("<br />")
        });
      });
    },
    resetSource: function resetSource($event) {
      this.editedEpisode.source = null;

      if ($event === 'yt_video') {
        this.autoDuration = false;
      } else if ($event === 'file') {
        this.autoDuration = true;
      }
    },
    createNewEpisode: function createNewEpisode(formData) {
      var _this6 = this;

      axios.post("/api/episodes", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        cancelToken: this.editedEpisode.requestSource.token,
        onUploadProgress: function onUploadProgress(progressEvent) {
          var percentCompleted = Math.floor(progressEvent.loaded * 100 / progressEvent.total);
          _this6.progress = percentCompleted === 100 ? 99 : percentCompleted;

          _this6.$emit("progress", _this6.progress);
        }
      }).then(function (res) {
        _this6.editedEpisode.id = res.data.id;
        _this6.editedEpisode.source = res.data.source;
        _this6.editedEpisode["new"] = false;

        _this6.$emit("progress", 100);

        _this6.$emit("created");

        _this6.$emit("close");

        _this6.isLoading = false;
      })["catch"](function (e) {
        _this6.editedEpisode.progress = null;

        _this6.$emit("wake");

        _this6.isLoading = false;

        _this6.$notify({
          group: "foo",
          type: "error",
          title: _this6.$t("Error"),
          text: Object.values(e.response.data.errors).join("<br />")
        });
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dialogs/edit/Podcast.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/dialogs/edit/Podcast.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuetify_lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuetify/lib */ "./node_modules/vuetify/lib/index.js");
/* harmony import */ var _Episode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Episode */ "./resources/js/components/dialogs/edit/Episode.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  props: ["podcast", "creator"],
  components: {
    veutifySelect: vuetify_lib__WEBPACK_IMPORTED_MODULE_0__["VSelect"],
    editEpisodeDialog: _Episode__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  computed: {
    isShowing: function isShowing() {
      var _this = this;

      return function (episode_id) {
        return _this.editedPodcast.episodes[_this.editedPodcast.episodes.findIndex(function (episode) {
          return episode.id === episode_id;
        })].isShowing;
      };
    }
  },
  created: function created() {
    var _this2 = this;

    axios.get("/api/podcast-genres").then(function (res) {
      return _this2.genres = res.data;
    });
  },
  data: function data() {
    return {
      editedPodcast: this.podcast,
      firstCopy: JSON.parse(JSON.stringify(this.podcast)),
      artistsFocused: false,
      editDialog: false,
      search: null,
      defaultCoverPath: "/storage/defaults/images/podcast_cover.png",
      genres: [],
      editingEpisode: null,
      genresFocused: false,
      artists: [],
      isLoading: false,
      errors: {},
      progress: null,
      episodeTableHeaders: [{
        text: this.$t("Cover"),
        value: "cover",
        align: "center"
      }, {
        text: this.$t("Title"),
        value: "title"
      }, {
        text: this.$t("Likes"),
        value: "nb_likes",
        align: "center"
      }, {
        text: this.$t("Duration"),
        value: "duration",
        align: "center"
      }, {
        text: this.$t("Number of plays"),
        value: "nb_plays",
        align: "center"
      }, {
        text: this.$t("Created At"),
        value: "created_at",
        align: "center"
      }, {
        text: this.$t("Operations"),
        value: "operations",
        align: "center"
      }]
    };
  },
  beforeDestroy: function beforeDestroy() {
    this.$emit("beforeDestroy");
  },
  methods: {
    closeWindow: function closeWindow() {
      var _this3 = this;

      var changed = false;

      if (JSON.stringify(this.editedPodcast) != JSON.stringify(this.firstCopy)) {
        changed = true;
      }

      if (changed) {
        this.$confirm({
          message: "".concat(this.$t("Are you sure you wanna quit without saving the changes ? maybe consider just hiding the window.")),
          button: {
            no: this.$t("Cancel"),
            yes: this.$t("Discard")
          },

          /**
           * Callback Function
           * @param {Boolean} confirm
           */
          callback: function callback(confirm) {
            if (confirm) {
              _this3.editedPodcast.title = _this3.firstCopy.title;
              _this3.editedPodcast.genres = _this3.firstCopy.genres;
              _this3.editedPodcast.artist = _this3.firstCopy.artist;
              _this3.editedPodcast.description = _this3.firstCopy.description;
              _this3.editedPodcast.cover = _this3.firstCopy.cover;

              _this3.$emit("close");
            }
          }
        });
      } else {
        this.$emit("close");
      }
    },
    updateProgress: function updateProgress(progress, episode_id) {
      var index = this.editedPodcast.episodes.findIndex(function (episode) {
        return episode.id === episode_id;
      });
      this.$set(this.editedPodcast.episodes[index], "progress", progress);
    },
    cancelUpload: function cancelUpload(episode_id) {
      var index = this.editedPodcast.episodes.findIndex(function (episode) {
        return episode.id === episode_id;
      });
      this.editedPodcast.episodes[index].requestSource.cancel();
      this.editEpisode(episode_id);
    },
    sleepEpisode: function sleepEpisode(episode_id) {
      this.editDialog = false;
      var index = this.editedPodcast.episodes.findIndex(function (episode) {
        return episode.id === episode_id;
      });
      this.$set(this.editedPodcast.episodes[index], "isShowing", false);
    },
    wakeEpisode: function wakeEpisode(episode_id) {
      this.editDialog = true;
      var index = this.editedPodcast.episodes.findIndex(function (episode) {
        return episode.id === episode_id;
      });
      this.$set(this.editedPodcast.episodes[index], "isShowing", true);
    },
    hideAllepisodes: function hideAllepisodes() {
      for (var i = 0; i < this.editedPodcast.episodes.length; i++) {
        this.$set(this.editedPodcast.episodes[i], "isShowing", false);
      }

      this.editDialog = false;
    },
    imageReady: function imageReady(e) {
      this.editedPodcast.cover = e;
    },
    deleteEpisode: function deleteEpisode(episode_id) {
      var _this4 = this;

      this.$confirm({
        message: "".concat(this.$t("Are you sure you wanna delete this") + " " + this.$t("episode") + "?"),
        button: {
          no: this.$t("No"),
          yes: this.$t("Yes")
        },

        /**
         * Callback Function
         * @param {Boolean} confirm
         */
        callback: function callback(confirm) {
          if (confirm) {
            var index = _this4.editedPodcast.episodes.findIndex(function (episode) {
              return episode.id === episode_id;
            });

            if (_this4.editedPodcast.episodes[index].requestSource) {
              _this4.editedPodcast.episodes[index].requestSource.cancel();
            }

            _this4.editedPodcast.episodes.splice(index, 1);

            axios["delete"]("/api/episodes/" + episode_id).then(function () {
              _this4.$notify({
                group: "foo",
                type: "success",
                title: _this4.$t("Deleted"),
                text: _this4.$t("Episode") + " " + _this4.$t("Deleted") + "."
              });
            })["catch"](function (e) {});
          }
        }
      });
    },
    editEpisode: function editEpisode(episode_id) {
      if (episode_id === "new") {
        this.editedPodcast.episodes.unshift({
          id: Math.floor(Math.random() * (100000 - 5000) + 100000),
          "new": true,
          genres: [],
          isActive: true,
          isShowing: true,
          source: "",
          nb_likes: 0,
          nb_plays: 0,
          source_format: "file"
        });
        this.editDialog = true;
      } else {
        this.editedPodcast.episodes[this.editedPodcast.episodes.findIndex(function (episode) {
          return episode.id === episode_id;
        })].isActive = true;
        this.editedPodcast.episodes[this.editedPodcast.episodes.findIndex(function (episode) {
          return episode.id === episode_id;
        })].isShowing = true;
        this.editDialog = true;
      }
    },
    closeEpisode: function closeEpisode(episode_id) {
      var index = this.editedPodcast.episodes.findIndex(function (episode) {
        return episode.id === episode_id;
      });

      if (this.editedPodcast.episodes[index].isShowing) {
        this.editDialog = false;
      }

      if (this.editedPodcast.episodes[index]["new"]) {
        this.editedPodcast.episodes.splice(index, 1);
      }

      this.$set(this.editedPodcast.episodes[index], "isShowing", false);
      this.$set(this.editedPodcast.episodes[index], "isActive", false);
      this.$forceUpdate();
    },
    episodeEdited: function episodeEdited(episode_id) {
      var index = this.editedPodcast.episodes.findIndex(function (episode) {
        return episode.id === episode_id;
      });
      this.$set(this.editedPodcast.episodes[index], "progress", 0);
      this.$set(this.editedPodcast.episodes[index], "isActive", false);
      this.$notify({
        group: "foo",
        type: "success",
        title: this.$t("Saved"),
        text: this.$t("Episode") + " " + this.$t("Updated") + "."
      });
    },
    episodeCreated: function episodeCreated() {
      this.savePodcast();
      this.$notify({
        group: "foo",
        type: "success",
        title: this.$t("Created"),
        text: this.$t("Episode") + " " + this.$t("Created") + "."
      });
    },
    fetchArtists: function fetchArtists(search, loading) {
      var _this5 = this;

      if (search) {
        loading(true), axios.get("/api/match-artists/" + search).then(function (res) {
          return _this5.artists = res.data.map(function (artist) {
            return {
              id: artist.id,
              displayname: artist.displayname,
              avatar: artist.avatar
            };
          });
        }).then(function () {
          return loading(false);
        })["catch"](function () {
          return loading(false);
        });
      }
    },
    savePodcast: function savePodcast(emit) {
      var _this6 = this;

      var formData = new FormData();
      this.isLoading = true;

      if (this.editedPodcast.cover && this.editedPodcast.cover.data) {
        // if cover was picked, the value is stored as an object from the CropImage component
        formData.append("cover", this.editedPodcast.cover.data, this.editedPodcast.cover.title);
      } else if (this.editedPodcast.cover && !this.editedPodcast.cover.data) {
        // no cover was picked, the value is stored as a string
        formData.append("cover", this.editedPodcast.cover);
      } else {
        formData.append("cover", this.defaultCoverPath);
      }

      if (this.editedPodcast.genres.length) {
        formData.append("genres", JSON.stringify(this.editedPodcast.genres));
      }

      if (this.editedPodcast.title) {
        formData.append("title", this.editedPodcast.title);
      } // links


      if (this.editedPodcast.spotify_link) {
        formData.append("spotify_link", this.editedPodcast.title);
      }

      if (this.editedPodcast.youtube_link) {
        formData.append("youtube_link", this.editedPodcast.youtube_link);
      }

      if (this.editedPodcast.soundcloud_link) {
        formData.append("soundcloud_link", this.editedPodcast.soundcloud_link);
      }

      if (this.editedPodcast.itunes_link) {
        formData.append("itunes_link", this.editedPodcast.itunes_link);
      }

      if (this.editedPodcast.deezer_link) {
        formData.append("deezer_link", this.editedPodcast.deezer_link);
      }

      if (this.creator === "admin") {
        if (this.editedPodcast.artist) {
          formData.append("artist_id", this.editedPodcast.artist.id);
        } else {
          formData.append("artist_id", "");
        }
      } else if (this.creator === "artist") {
        formData.append("artist_id", this.$store.getters.getArtist.id);
      } else {
        formData.append("artist_id", "");
      }

      if (this.editedPodcast.description) {
        formData.append("description", this.editedPodcast.description);
      }

      if (this.editedPodcast["new"]) {
        axios.post("/api/podcasts", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          onUploadProgress: function onUploadProgress(progressEvent) {
            var percentCompleted = Math.floor(progressEvent.loaded * 100 / progressEvent.total);
            _this6.progress = percentCompleted;
          }
        }).then(function () {
          _this6.$emit("created");

          _this6.isLoading = false;
        })["catch"](function (e) {
          _this6.progress = 0;
          _this6.isLoading = false;
          _this6.errors = e.response.data.errors; // this.$notify({
          //     group: "foo",
          //     type: "error",
          //     title: this.$t("Error"),
          //     text: Object.values(e.response.data.errors).join(
          //         "<br />"
          //     )
          // });
        });
      } else {
        formData.append("podcast_id", this.editedPodcast.id);
        formData.append("_method", "PUT");
        axios.post("/api/podcasts/" + this.editedPodcast.id, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          onUploadProgress: function onUploadProgress(progressEvent) {
            var percentCompleted = Math.floor(progressEvent.loaded * 100 / progressEvent.total);
            _this6.progress = percentCompleted;
          }
        }).then(function () {
          if (emit) {
            _this6.$emit("updated");
          }

          _this6.isLoading = false;
        })["catch"](function (e) {
          _this6.progress = 0;
          _this6.isLoading = false; // this.$notify({
          //     group: "foo",
          //     type: "error",
          //     title: this.$t("Error"),
          //     text: Object.values(e.response.data.errors).join(
          //         "<br />"
          //     )
          // });
        });
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/elements/select/Users.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/elements/select/Users.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['users', 'multiple'],
  data: function data() {
    return {
      searchedUsers: JSON.parse(JSON.stringify(this.users)),
      selectedUsers: JSON.parse(JSON.stringify(this.users)),
      isSearchUserLoading: false,
      searchUsers: null
    };
  },
  watch: {
    searchUsers: function searchUsers(val) {
      var _this = this;

      if (this.isSearchUserLoading) return;
      this.isSearchUserLoading = true;
      axios.get("/api/match-users" + "?query=" + val).then(function (res) {
        res.data.forEach(function (ar) {
          _this.searchedUsers.push(ar);
        });
      })["catch"]()["finally"](function () {
        return _this.isSearchUserLoading = false;
      });
    },
    selectedUsers: function selectedUsers(val) {
      this.$emit('users', val);
    }
  },
  methods: {
    pushUser: function pushUser(item) {
      this.selectedUsers.push(item);
    },
    remove: function remove(id) {
      if (this.multiple) {
        var index = this.selectedUsers.findIndex(function (item) {
          return item.id === id;
        });
        if (index >= 0) this.selectedUsers.splice(index, 1);
      } else {
        this.selectedUsers = null;
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dialogs/edit/Album.vue?vue&type=style&index=0&id=696254f9&scoped=true&lang=css&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--7-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/dialogs/edit/Album.vue?vue&type=style&index=0&id=696254f9&scoped=true&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.selected-artist > .artist-name[data-v-696254f9] {\n    color: var(--light-theme-text-color);\n}\n.v-application.theme--dark .selected-artist > .artist-name[data-v-696254f9] {\n    color: var(--dark-theme-text-color);\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dialogs/edit/Album.vue?vue&type=style&index=0&id=696254f9&scoped=true&lang=css&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--7-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/dialogs/edit/Album.vue?vue&type=style&index=0&id=696254f9&scoped=true&lang=css& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--7-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Album.vue?vue&type=style&index=0&id=696254f9&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dialogs/edit/Album.vue?vue&type=style&index=0&id=696254f9&scoped=true&lang=css&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dialogs/AttachSong.vue?vue&type=template&id=ec5f77ee&":
/*!****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/dialogs/AttachSong.vue?vue&type=template&id=ec5f77ee& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-card",
    [
      _c(
        "v-container",
        [
          _c(
            "v-row",
            [
              _c(
                "v-col",
                { attrs: { cols: "12" } },
                [
                  _c("v-autocomplete", {
                    attrs: {
                      items: _vm.searchedSongs,
                      loading: _vm.isSearchSongLoading,
                      "search-input": _vm.searchSongs,
                      "item-text": "title",
                      label: _vm.$t("Search Song"),
                      placeholder: _vm.$t("Start typing to search"),
                      "return-object": "",
                      "prepend-icon": "mdi-music-note"
                    },
                    on: {
                      "update:searchInput": function($event) {
                        _vm.searchSongs = $event
                      },
                      "update:search-input": function($event) {
                        _vm.searchSongs = $event
                      }
                    },
                    scopedSlots: _vm._u([
                      {
                        key: "item",
                        fn: function(ref) {
                          var item = ref.item
                          return [
                            _c("div", { staticClass: "item py-2" }, [
                              _c(
                                "div",
                                { staticClass: "list-item-cover" },
                                [
                                  _c("v-img", {
                                    staticClass: "img mr-2",
                                    attrs: {
                                      src: item.cover,
                                      width: "50",
                                      "aspect-ratio": "1"
                                    },
                                    scopedSlots: _vm._u(
                                      [
                                        {
                                          key: "placeholder",
                                          fn: function() {
                                            return [
                                              _c(
                                                "v-row",
                                                {
                                                  staticClass:
                                                    "fill-height ma-0",
                                                  attrs: {
                                                    align: "center",
                                                    justify: "center"
                                                  }
                                                },
                                                [
                                                  _c(
                                                    "content-placeholders",
                                                    {
                                                      staticStyle: {
                                                        width: "100%"
                                                      },
                                                      attrs: { rounded: true }
                                                    },
                                                    [
                                                      _c(
                                                        "content-placeholders-img"
                                                      )
                                                    ],
                                                    1
                                                  )
                                                ],
                                                1
                                              )
                                            ]
                                          },
                                          proxy: true
                                        }
                                      ],
                                      null,
                                      true
                                    )
                                  })
                                ],
                                1
                              )
                            ]),
                            _vm._v(
                              "\n                        " +
                                _vm._s(item.title) +
                                "\n                    "
                            )
                          ]
                        }
                      }
                    ]),
                    model: {
                      value: _vm.selectedSong,
                      callback: function($$v) {
                        _vm.selectedSong = $$v
                      },
                      expression: "selectedSong"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "12" } },
                [
                  _c(
                    "v-btn",
                    {
                      staticClass: "success",
                      attrs: { block: "", disabled: !_vm.selectedSong },
                      on: {
                        click: function($event) {
                          _vm.$emit("songSelected", _vm.selectedSong),
                            (_vm.searchedSongs = [])
                        }
                      }
                    },
                    [_vm._v(_vm._s(_vm.$t("Add")))]
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dialogs/edit/Album.vue?vue&type=template&id=696254f9&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/dialogs/edit/Album.vue?vue&type=template&id=696254f9&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("edit-dialog", {
    attrs: {
      loading: _vm.isLoading,
      fullscreen: !_vm.editedAlbum.new ? true : false,
      editing: "Album"
    },
    on: {
      callToAction: function($event) {
        return _vm.saveAlbum(true)
      },
      cancel: _vm.closeWindow
    },
    scopedSlots: _vm._u([
      {
        key: "header-actions",
        fn: function() {
          return [
            _vm.$store.getters.getSettings.provider_spotify
              ? _c(
                  "v-btn",
                  {
                    attrs: { small: "", color: "#1DB954", dark: "" },
                    on: {
                      click: function($event) {
                        _vm.importFromSpotifyDialog = true
                      }
                    }
                  },
                  [
                    _c("v-icon", { attrs: { left: "" } }, [
                      _vm._v("$vuetify.icons.spotify")
                    ]),
                    _vm._v(
                      "\n            " +
                        _vm._s(_vm.$t("From Spotify")) +
                        "\n        "
                    )
                  ],
                  1
                )
              : _vm._e()
          ]
        },
        proxy: true
      },
      {
        key: "body",
        fn: function() {
          return [
            _c(
              "v-container",
              [
                _c(
                  "v-row",
                  [
                    _c(
                      "v-col",
                      { attrs: { cols: "auto" } },
                      [
                        _c("upload-image", {
                          attrs: {
                            id: "album" + _vm.editedAlbum.id,
                            source:
                              _vm.editedAlbum.cover || _vm.defaultCoverPath
                          },
                          on: {
                            imageReady: function($event) {
                              return _vm.imageReady($event)
                            }
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "v-col",
                      [
                        _c(
                          "v-container",
                          [
                            _c(
                              "v-row",
                              [
                                _c(
                                  "v-col",
                                  { attrs: { cols: "12" } },
                                  [
                                    _c("v-text-field", {
                                      attrs: {
                                        label: _vm.$t("Title"),
                                        outlined: "",
                                        "hide-details": ""
                                      },
                                      model: {
                                        value: _vm.editedAlbum.title,
                                        callback: function($$v) {
                                          _vm.$set(
                                            _vm.editedAlbum,
                                            "title",
                                            $$v
                                          )
                                        },
                                        expression: "editedAlbum.title"
                                      }
                                    })
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _vm.creator === "admin"
                                  ? _c(
                                      "v-col",
                                      { attrs: { cols: "12" } },
                                      [
                                        _vm.artistsComp
                                          ? _c("select-artists", {
                                              attrs: {
                                                artists:
                                                  _vm.editedAlbum.artists,
                                                multiple: true
                                              },
                                              on: {
                                                artists: function($event) {
                                                  _vm.editedAlbum.artists = $event
                                                }
                                              }
                                            })
                                          : _vm._e()
                                      ],
                                      1
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                _c(
                                  "v-col",
                                  { attrs: { cols: "12" } },
                                  [
                                    _c(
                                      "v-menu",
                                      {
                                        ref: "menu",
                                        attrs: {
                                          "close-on-content-click": false,
                                          transition: "scale-transition",
                                          "offset-y": "",
                                          "min-width": "290px"
                                        },
                                        scopedSlots: _vm._u([
                                          {
                                            key: "activator",
                                            fn: function(ref) {
                                              var on = ref.on
                                              var attrs = ref.attrs
                                              return [
                                                _c(
                                                  "v-text-field",
                                                  _vm._g(
                                                    _vm._b(
                                                      {
                                                        attrs: {
                                                          label: _vm.$t(
                                                            "Release Date"
                                                          ),
                                                          readonly: "",
                                                          outlined: "",
                                                          "hide-details": ""
                                                        },
                                                        model: {
                                                          value:
                                                            _vm.editedAlbum
                                                              .release_date,
                                                          callback: function(
                                                            $$v
                                                          ) {
                                                            _vm.$set(
                                                              _vm.editedAlbum,
                                                              "release_date",
                                                              $$v
                                                            )
                                                          },
                                                          expression:
                                                            "\n                                                editedAlbum.release_date\n                                            "
                                                        }
                                                      },
                                                      "v-text-field",
                                                      attrs,
                                                      false
                                                    ),
                                                    on
                                                  )
                                                )
                                              ]
                                            }
                                          }
                                        ]),
                                        model: {
                                          value: _vm.dateMenu,
                                          callback: function($$v) {
                                            _vm.dateMenu = $$v
                                          },
                                          expression: "dateMenu"
                                        }
                                      },
                                      [
                                        _vm._v(" "),
                                        _c("v-date-picker", {
                                          ref: "picker",
                                          attrs: {
                                            max: new Date()
                                              .toISOString()
                                              .substr(0, 10),
                                            min: "1950-01-01"
                                          },
                                          on: { change: _vm.saveReleaseDate },
                                          model: {
                                            value: _vm.editedAlbum.release_date,
                                            callback: function($$v) {
                                              _vm.$set(
                                                _vm.editedAlbum,
                                                "release_date",
                                                $$v
                                              )
                                            },
                                            expression:
                                              "editedAlbum.release_date"
                                          }
                                        })
                                      ],
                                      1
                                    )
                                  ],
                                  1
                                )
                              ],
                              1
                            )
                          ],
                          1
                        )
                      ],
                      1
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "v-row",
                  [
                    _c(
                      "v-col",
                      { attrs: { cols: "12", sm: "6" } },
                      [
                        _c("v-switch", {
                          attrs: { label: _vm.$t("Exclusive") },
                          model: {
                            value: _vm.editedAlbum.isExclusive,
                            callback: function($$v) {
                              _vm.$set(_vm.editedAlbum, "isExclusive", $$v)
                            },
                            expression: "editedAlbum.isExclusive"
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "v-col",
                      { attrs: { cols: "12", sm: "6" } },
                      [
                        _c("v-switch", {
                          attrs: { label: _vm.$t("Explicit") },
                          model: {
                            value: _vm.editedAlbum.isExplicit,
                            callback: function($$v) {
                              _vm.$set(_vm.editedAlbum, "isExplicit", $$v)
                            },
                            expression: "editedAlbum.isExplicit"
                          }
                        })
                      ],
                      1
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "v-row",
                  [
                    _c("edit-external-links", {
                      attrs: { item: _vm.editedAlbum },
                      on: {
                        spotify_link: function($event) {
                          _vm.editedAlbum.spotify_link = $event
                        },
                        youtube_link: function($event) {
                          _vm.editedAlbum.youtube_link = $event
                        },
                        soundcloud_link: function($event) {
                          _vm.editedAlbum.soundcloud_link = $event
                        },
                        itunes_link: function($event) {
                          _vm.editedAlbum.itunes_link = $event
                        },
                        deezer_link: function($event) {
                          _vm.editedAlbum.deezer_link = $event
                        }
                      }
                    })
                  ],
                  1
                ),
                _vm._v(" "),
                _vm.$store.getters.getSettings.enable_selling &&
                _vm.canBeProduct
                  ? _c(
                      "v-row",
                      [
                        _c(
                          "v-col",
                          { attrs: { cols: "12" } },
                          [
                            _c("div", { staticClass: "title" }, [
                              _vm._v(_vm._s(_vm.$t("Product")))
                            ]),
                            _vm._v(" "),
                            _c("v-divider")
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "v-col",
                          [
                            _c("v-switch", {
                              attrs: {
                                label:
                                  "Provide as product" +
                                  (_vm.$store.getters.getSettings.enableBilling
                                    ? ""
                                    : " (Enable Billing first)"),
                                disabled: !_vm.$store.getters.getSettings
                                  .enableBilling
                              },
                              model: {
                                value: _vm.editedAlbum.isProduct,
                                callback: function($$v) {
                                  _vm.$set(_vm.editedAlbum, "isProduct", $$v)
                                },
                                expression: "editedAlbum.isProduct"
                              }
                            })
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _vm.editedAlbum.isProduct
                          ? _c(
                              "v-col",
                              { attrs: { cols: "12" } },
                              [
                                _c(
                                  "div",
                                  {
                                    staticClass: "d-flex justify-space-between"
                                  },
                                  [
                                    _c("div", { staticClass: "title" }, [
                                      _vm._v(_vm._s(_vm.$t("Licenses")))
                                    ]),
                                    _vm._v(" "),
                                    _c("div"),
                                    _vm._v(" "),
                                    _c(
                                      "v-btn",
                                      {
                                        staticClass: "primary",
                                        attrs: { small: "" },
                                        on: {
                                          click: function($event) {
                                            _vm.licenseDialog = true
                                          }
                                        }
                                      },
                                      [_vm._v(_vm._s(_vm.$t("Add License")))]
                                    )
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "py-3" },
                                  [_c("v-divider")],
                                  1
                                ),
                                _vm._v(" "),
                                [
                                  _c("v-simple-table", {
                                    scopedSlots: _vm._u(
                                      [
                                        {
                                          key: "default",
                                          fn: function() {
                                            return [
                                              _c("thead", [
                                                _c("tr", [
                                                  _c(
                                                    "th",
                                                    {
                                                      staticClass: "text-left"
                                                    },
                                                    [
                                                      _vm._v(
                                                        "\n                                            " +
                                                          _vm._s(
                                                            _vm.$t("Name")
                                                          ) +
                                                          "\n                                        "
                                                      )
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "th",
                                                    {
                                                      staticClass: "text-left"
                                                    },
                                                    [
                                                      _vm._v(
                                                        "\n                                            " +
                                                          _vm._s(
                                                            _vm.$t("Price")
                                                          ) +
                                                          "\n                                        "
                                                      )
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "th",
                                                    {
                                                      staticClass: "text-left"
                                                    },
                                                    [
                                                      _vm._v(
                                                        "\n                                            " +
                                                          _vm._s(
                                                            _vm.$t(
                                                              "Description"
                                                            )
                                                          ) +
                                                          "\n                                        "
                                                      )
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "th",
                                                    {
                                                      staticClass: "text-left"
                                                    },
                                                    [
                                                      _vm._v(
                                                        "\n                                            " +
                                                          _vm._s(
                                                            _vm.$t("Delete")
                                                          ) +
                                                          "\n                                        "
                                                      )
                                                    ]
                                                  )
                                                ])
                                              ]),
                                              _vm._v(" "),
                                              _c(
                                                "tbody",
                                                _vm._l(_vm.licenses, function(
                                                  license,
                                                  n
                                                ) {
                                                  return _c("tr", { key: n }, [
                                                    _c("td", [
                                                      _vm._v(
                                                        _vm._s(license.name)
                                                      )
                                                    ]),
                                                    _vm._v(" "),
                                                    _c("td", [
                                                      _vm._v(
                                                        "\n                                            " +
                                                          _vm._s(
                                                            _vm.price(
                                                              license.amount
                                                            ) +
                                                              _vm
                                                                .defaultCurrency
                                                                .symbol
                                                          ) +
                                                          "\n                                        "
                                                      )
                                                    ]),
                                                    _vm._v(" "),
                                                    _c("td", [
                                                      _vm._v(
                                                        _vm._s(
                                                          license.description
                                                        )
                                                      )
                                                    ]),
                                                    _vm._v(" "),
                                                    _c(
                                                      "td",
                                                      [
                                                        _c(
                                                          "v-btn",
                                                          {
                                                            attrs: {
                                                              "x-small": "",
                                                              fab: "",
                                                              dark: "",
                                                              color: "error"
                                                            },
                                                            on: {
                                                              click: function(
                                                                $event
                                                              ) {
                                                                return _vm.licenses.splice(
                                                                  n,
                                                                  1
                                                                )
                                                              }
                                                            }
                                                          },
                                                          [
                                                            _c("v-icon", [
                                                              _vm._v(
                                                                "$vuetify.icons.delete"
                                                              )
                                                            ])
                                                          ],
                                                          1
                                                        )
                                                      ],
                                                      1
                                                    )
                                                  ])
                                                }),
                                                0
                                              )
                                            ]
                                          },
                                          proxy: true
                                        }
                                      ],
                                      null,
                                      false,
                                      100354717
                                    )
                                  })
                                ]
                              ],
                              2
                            )
                          : _vm._e()
                      ],
                      1
                    )
                  : _vm._e()
              ],
              1
            ),
            _vm._v(" "),
            !_vm.editedAlbum.new
              ? _c("v-container", { staticClass: "songs pt-5" }, [
                  _c(
                    "div",
                    { staticClass: "songs-wrapper" },
                    [
                      _c(
                        "v-card",
                        { attrs: { outlined: "" } },
                        [
                          _c(
                            "v-card-title",
                            [
                              _c(
                                "v-icon",
                                { attrs: { color: "primary", "x-large": "" } },
                                [_vm._v("$vuetify.icons.music-note")]
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                {
                                  staticClass: "large-icon-text tertiary--text"
                                },
                                [
                                  _vm._v(
                                    "\n                            " +
                                      _vm._s(_vm.$t("Songs")) +
                                      "\n                        "
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "v-btn",
                                {
                                  staticClass: "mx-2 ml-3",
                                  attrs: {
                                    dark: "",
                                    small: "",
                                    color: "primary"
                                  },
                                  on: {
                                    click: function($event) {
                                      return _vm.editSong("new")
                                    }
                                  }
                                },
                                [
                                  _c("v-icon", { attrs: { dark: "" } }, [
                                    _vm._v("$vuetify.icons.plus")
                                  ]),
                                  _vm._v(
                                    "\n                            " +
                                      _vm._s(_vm.$t("New")) +
                                      "\n                        "
                                  )
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-btn",
                                {
                                  staticClass: "mx-2",
                                  attrs: {
                                    dark: "",
                                    small: "",
                                    color: "secondary"
                                  },
                                  on: {
                                    click: function($event) {
                                      _vm.addSong = true
                                    }
                                  }
                                },
                                [
                                  _c("v-icon", [_vm._v("$vuetify.icons.link")]),
                                  _vm._v(
                                    "\n                            " +
                                      _vm._s(_vm.$t("Attach")) +
                                      "\n                        "
                                  )
                                ],
                                1
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c("v-data-table", {
                            attrs: {
                              "no-data-text": _vm.$t("No data available"),
                              "loading-text": _vm.$t("Fetching data") + "...",
                              headers: _vm.songTableHeaders,
                              items: _vm.editedAlbum.songs || [],
                              "items-per-page": 15,
                              "hide-default-footer": "",
                              loading: !_vm.editedAlbum.songs
                            },
                            scopedSlots: _vm._u(
                              [
                                {
                                  key: "body",
                                  fn: function(props) {
                                    return [
                                      _vm.editedAlbum.songs.length
                                        ? _c(
                                            "draggable",
                                            {
                                              attrs: { tag: "tbody" },
                                              model: {
                                                value: _vm.editedAlbum.songs,
                                                callback: function($$v) {
                                                  _vm.$set(
                                                    _vm.editedAlbum,
                                                    "songs",
                                                    $$v
                                                  )
                                                },
                                                expression: "editedAlbum.songs"
                                              }
                                            },
                                            _vm._l(
                                              _vm.editedAlbum.songs,
                                              function(song, index) {
                                                return _c(
                                                  "tr",
                                                  { key: index },
                                                  [
                                                    _c(
                                                      "td",
                                                      [
                                                        _c(
                                                          "v-icon",
                                                          {
                                                            staticClass:
                                                              "page__grab-icon",
                                                            attrs: { small: "" }
                                                          },
                                                          [
                                                            _vm._v(
                                                              "\n                                            mdi-arrow-all\n                                        "
                                                            )
                                                          ]
                                                        )
                                                      ],
                                                      1
                                                    ),
                                                    _vm._v(" "),
                                                    _c("td", [
                                                      _vm._v(_vm._s(index + 1))
                                                    ]),
                                                    _vm._v(" "),
                                                    _c("td", [
                                                      _c(
                                                        "div",
                                                        {
                                                          staticClass:
                                                            "img-container py-2"
                                                        },
                                                        [
                                                          _c(
                                                            "v-img",
                                                            {
                                                              staticClass:
                                                                "user-avatar song-cover",
                                                              attrs: {
                                                                src:
                                                                  song.cover
                                                                    .image ||
                                                                  song.cover,
                                                                alt: song.title,
                                                                width: "50",
                                                                height: "50"
                                                              }
                                                            },
                                                            [
                                                              song.progress !=
                                                                null &&
                                                              song.progress <
                                                                100
                                                                ? _c(
                                                                    "div",
                                                                    {
                                                                      staticClass:
                                                                        "upload-percentage"
                                                                    },
                                                                    [
                                                                      _c(
                                                                        "div",
                                                                        {
                                                                          staticClass:
                                                                            "content-text"
                                                                        },
                                                                        [
                                                                          song.progress <
                                                                          99
                                                                            ? [
                                                                                _vm._v(
                                                                                  "\n                                                            " +
                                                                                    _vm._s(
                                                                                      song.progress
                                                                                    ) +
                                                                                    "%\n                                                        "
                                                                                )
                                                                              ]
                                                                            : [
                                                                                _c(
                                                                                  "v-progress-circular",
                                                                                  {
                                                                                    attrs: {
                                                                                      size: 15,
                                                                                      width: 3,
                                                                                      color:
                                                                                        "grey",
                                                                                      indeterminate:
                                                                                        ""
                                                                                    }
                                                                                  }
                                                                                )
                                                                              ]
                                                                        ],
                                                                        2
                                                                      )
                                                                    ]
                                                                  )
                                                                : _vm._e()
                                                            ]
                                                          )
                                                        ],
                                                        1
                                                      )
                                                    ]),
                                                    _vm._v(" "),
                                                    _c(
                                                      "td",
                                                      [
                                                        _c(
                                                          "router-link",
                                                          {
                                                            staticClass:
                                                              "router-link",
                                                            attrs: {
                                                              to: {
                                                                name: "song",
                                                                params: {
                                                                  id: song.id
                                                                }
                                                              },
                                                              target: "_blank"
                                                            }
                                                          },
                                                          [
                                                            _vm._v(
                                                              "\n                                            " +
                                                                _vm._s(
                                                                  song.title
                                                                ) +
                                                                "\n                                        "
                                                            )
                                                          ]
                                                        )
                                                      ],
                                                      1
                                                    ),
                                                    _vm._v(" "),
                                                    _c("td", [
                                                      _vm._v(
                                                        "\n                                        " +
                                                          _vm._s(
                                                            _vm.getArtists(
                                                              song.artists
                                                            )
                                                          ) +
                                                          "\n                                    "
                                                      )
                                                    ]),
                                                    _vm._v(" "),
                                                    _c(
                                                      "td",
                                                      {
                                                        staticClass:
                                                          "text-center"
                                                      },
                                                      [
                                                        _vm._v(
                                                          "\n                                        " +
                                                            _vm._s(
                                                              song.nb_plays
                                                            ) +
                                                            "\n                                    "
                                                        )
                                                      ]
                                                    ),
                                                    _vm._v(" "),
                                                    _c(
                                                      "td",
                                                      {
                                                        staticClass:
                                                          "text-center"
                                                      },
                                                      [
                                                        _vm._v(
                                                          "\n                                        " +
                                                            _vm._s(
                                                              song.nb_likes
                                                            ) +
                                                            "\n                                    "
                                                        )
                                                      ]
                                                    ),
                                                    _vm._v(" "),
                                                    _c("td", [
                                                      _vm._v(
                                                        "\n                                        " +
                                                          _vm._s(
                                                            _vm
                                                              .moment(
                                                                song.created_at
                                                              )
                                                              .format("ll")
                                                          ) +
                                                          "\n                                    "
                                                      )
                                                    ]),
                                                    _vm._v(" "),
                                                    _c(
                                                      "td",
                                                      [
                                                        _c(
                                                          "v-btn",
                                                          {
                                                            staticClass: "mx-2",
                                                            attrs: {
                                                              "x-small": "",
                                                              fab: "",
                                                              dark: "",
                                                              color: "info"
                                                            },
                                                            on: {
                                                              click: function(
                                                                $event
                                                              ) {
                                                                return _vm.editSong(
                                                                  song.id
                                                                )
                                                              }
                                                            }
                                                          },
                                                          [
                                                            _c(
                                                              "v-icon",
                                                              {
                                                                attrs: {
                                                                  dark: ""
                                                                }
                                                              },
                                                              [
                                                                _vm._v(
                                                                  "$vuetify.icons.pencil"
                                                                )
                                                              ]
                                                            )
                                                          ],
                                                          1
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "v-btn",
                                                          {
                                                            staticClass: "mx-2",
                                                            attrs: {
                                                              "x-small": "",
                                                              fab: "",
                                                              dark: "",
                                                              title: _vm.$t(
                                                                "Detach song from this album"
                                                              ),
                                                              color: "secondary"
                                                            },
                                                            on: {
                                                              click: function(
                                                                $event
                                                              ) {
                                                                return _vm.detachSong(
                                                                  song.id
                                                                )
                                                              }
                                                            }
                                                          },
                                                          [
                                                            _c(
                                                              "v-icon",
                                                              {
                                                                attrs: {
                                                                  dark: ""
                                                                }
                                                              },
                                                              [
                                                                _vm._v(
                                                                  "$vuetify.icons.link-off"
                                                                )
                                                              ]
                                                            )
                                                          ],
                                                          1
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "v-btn",
                                                          {
                                                            staticClass: "mx-2",
                                                            attrs: {
                                                              "x-small": "",
                                                              fab: "",
                                                              title: _vm.$t(
                                                                "Delete Song"
                                                              ),
                                                              dark: "",
                                                              color: "error"
                                                            },
                                                            on: {
                                                              click: function(
                                                                $event
                                                              ) {
                                                                return _vm.deleteSong(
                                                                  song.id
                                                                )
                                                              }
                                                            }
                                                          },
                                                          [
                                                            _c("v-icon", [
                                                              _vm._v(
                                                                "$vuetify.icons.delete"
                                                              )
                                                            ])
                                                          ],
                                                          1
                                                        )
                                                      ],
                                                      1
                                                    )
                                                  ]
                                                )
                                              }
                                            ),
                                            0
                                          )
                                        : _c("empty-page", {
                                            staticClass: "empty-songs",
                                            attrs: {
                                              headline: _vm.$t("No Songs!"),
                                              sub: _vm.$t(
                                                "This album is empty."
                                              )
                                            }
                                          })
                                    ]
                                  }
                                }
                              ],
                              null,
                              false,
                              913445694
                            )
                          })
                        ],
                        1
                      )
                    ],
                    1
                  )
                ])
              : _vm._e()
          ]
        },
        proxy: true
      },
      {
        key: "dialogs",
        fn: function() {
          return [
            _c(
              "v-dialog",
              {
                attrs: { persistent: "", scrollable: "", "max-width": "950" },
                on: { "click:outside": _vm.hideAllsongs },
                model: {
                  value: _vm.editDialog,
                  callback: function($$v) {
                    _vm.editDialog = $$v
                  },
                  expression: "editDialog"
                }
              },
              [
                _vm._l(_vm.editedAlbum.songs, function(song) {
                  return [
                    song.isActive
                      ? _c("edit-song-dialog", {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: _vm.isShowing(song.id),
                              expression: "isShowing(song.id)"
                            }
                          ],
                          key: song.id,
                          attrs: {
                            song: song,
                            uploader: _vm.creator,
                            album_id: _vm.editedAlbum.id
                          },
                          on: {
                            updated: function($event) {
                              return _vm.songEdited(song.id)
                            },
                            progress: function($event) {
                              return _vm.updateProgress($event, song.id)
                            },
                            created: _vm.songCreated,
                            close: function($event) {
                              return _vm.closeSong(song.id)
                            },
                            sleep: function($event) {
                              return _vm.sleepSong(song.id)
                            },
                            wake: function($event) {
                              return _vm.wakeSong(song.id)
                            }
                          }
                        })
                      : _vm._e()
                  ]
                })
              ],
              2
            ),
            _vm._v(" "),
            _c(
              "v-dialog",
              {
                attrs: { "max-width": "400" },
                model: {
                  value: _vm.deleteSongConfirmationDialog,
                  callback: function($$v) {
                    _vm.deleteSongConfirmationDialog = $$v
                  },
                  expression: "deleteSongConfirmationDialog"
                }
              },
              [
                _c(
                  "v-card",
                  [
                    _c("div", { staticClass: "p-2" }, [
                      _vm._v(
                        "\n                    " +
                          _vm._s(
                            _vm.$t("Are you sure you wanna delete this") +
                              _vm.$t("Song") +
                              "?"
                          ) +
                          "\n                "
                      )
                    ]),
                    _vm._v(" "),
                    _c(
                      "v-card-actions",
                      [
                        _c(
                          "v-btn",
                          {
                            attrs: { color: "error", text: "" },
                            on: { click: _vm.goodByeSong }
                          },
                          [_vm._v(_vm._s(_vm.$t("Delete")))]
                        ),
                        _vm._v(" "),
                        _c(
                          "v-btn",
                          {
                            attrs: { text: "" },
                            on: {
                              click: function($event) {
                                _vm.deleteSongConfirmationDialog = false
                              }
                            }
                          },
                          [_vm._v(_vm._s(_vm.$t("Cancel")))]
                        )
                      ],
                      1
                    )
                  ],
                  1
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "v-dialog",
              {
                attrs: { "max-width": "500px" },
                model: {
                  value: _vm.addSong,
                  callback: function($$v) {
                    _vm.addSong = $$v
                  },
                  expression: "addSong"
                }
              },
              [
                _vm.addSong
                  ? _c("attach-song-dialog", {
                      attrs: { creator: _vm.creator },
                      on: {
                        songSelected: function($event) {
                          return _vm.attachSong($event)
                        }
                      }
                    })
                  : _vm._e()
              ],
              1
            ),
            _vm._v(" "),
            _vm.canBeProduct && _vm.licenseDialog
              ? _c(
                  "v-dialog",
                  {
                    attrs: { "max-width": "500" },
                    model: {
                      value: _vm.licenseDialog,
                      callback: function($$v) {
                        _vm.licenseDialog = $$v
                      },
                      expression: "licenseDialog"
                    }
                  },
                  [
                    _c("edit-dialog", {
                      attrs: {
                        callToActionText: "Add",
                        loading: false,
                        title: _vm.$t("Add License")
                      },
                      on: {
                        callToAction: function($event) {
                          return _vm.addLicense($event)
                        },
                        cancel: function($event) {
                          ;(_vm.licenseDialog = false),
                            (_vm.selectedLicense = null)
                        }
                      },
                      scopedSlots: _vm._u(
                        [
                          {
                            key: "body",
                            fn: function() {
                              return [
                                _c(
                                  "v-container",
                                  [
                                    _c("v-select", {
                                      attrs: {
                                        items: _vm.previousPrices,
                                        "item-value": "id",
                                        "item-text": "name",
                                        label: "Choose License"
                                      },
                                      scopedSlots: _vm._u(
                                        [
                                          {
                                            key: "item",
                                            fn: function(ref) {
                                              var item = ref.item
                                              return [
                                                _vm._v(
                                                  "\n                                " +
                                                    _vm._s(item.name) +
                                                    "\n                                " +
                                                    _vm._s(
                                                      _vm.price(item.amount) +
                                                        " " +
                                                        item.currency_symbol
                                                    ) +
                                                    "\n                            "
                                                )
                                              ]
                                            }
                                          },
                                          {
                                            key: "selection",
                                            fn: function(ref) {
                                              var item = ref.item
                                              return [
                                                _vm._v(
                                                  "\n                                " +
                                                    _vm._s(item.name) +
                                                    "\n                                " +
                                                    _vm._s(
                                                      _vm.price(item.amount) +
                                                        " " +
                                                        item.currency_symbol
                                                    ) +
                                                    "\n                            "
                                                )
                                              ]
                                            }
                                          }
                                        ],
                                        null,
                                        false,
                                        2705768188
                                      ),
                                      model: {
                                        value: _vm.selectedLicense,
                                        callback: function($$v) {
                                          _vm.selectedLicense = $$v
                                        },
                                        expression: "selectedLicense"
                                      }
                                    }),
                                    _vm._v(" "),
                                    !_vm.selectedLicense
                                      ? [
                                          _c("v-text-field", {
                                            attrs: { label: _vm.$t("Name") },
                                            model: {
                                              value: _vm.editedLicense.name,
                                              callback: function($$v) {
                                                _vm.$set(
                                                  _vm.editedLicense,
                                                  "name",
                                                  $$v
                                                )
                                              },
                                              expression: "editedLicense.name"
                                            }
                                          }),
                                          _vm._v(" "),
                                          _c("v-text-field", {
                                            attrs: {
                                              label: _vm.$t("Description")
                                            },
                                            model: {
                                              value:
                                                _vm.editedLicense.description,
                                              callback: function($$v) {
                                                _vm.$set(
                                                  _vm.editedLicense,
                                                  "description",
                                                  $$v
                                                )
                                              },
                                              expression:
                                                "editedLicense.description"
                                            }
                                          }),
                                          _vm._v(" "),
                                          _c(
                                            "div",
                                            {
                                              staticClass: "d-flex align-center"
                                            },
                                            [
                                              _c("v-text-field", {
                                                staticClass: "pr-2",
                                                attrs: {
                                                  label: _vm.$t("Amount"),
                                                  hint:
                                                    "Important: the amount should be in cents ( 1$ = 100 )",
                                                  value: 0
                                                },
                                                model: {
                                                  value:
                                                    _vm.editedLicense.amount,
                                                  callback: function($$v) {
                                                    _vm.$set(
                                                      _vm.editedLicense,
                                                      "amount",
                                                      $$v
                                                    )
                                                  },
                                                  expression:
                                                    "editedLicense.amount"
                                                }
                                              }),
                                              _vm._v(" "),
                                              _c("div", [
                                                _c(
                                                  "div",
                                                  {
                                                    staticClass: "plan__price"
                                                  },
                                                  [
                                                    _c(
                                                      "div",
                                                      {
                                                        staticClass:
                                                          "plan__price__currency"
                                                      },
                                                      [
                                                        _vm._v(
                                                          "\n                                            " +
                                                            _vm._s(
                                                              _vm
                                                                .defaultCurrency
                                                                .symbol
                                                            ) +
                                                            "\n                                        "
                                                        )
                                                      ]
                                                    ),
                                                    _vm._v(" "),
                                                    _c(
                                                      "div",
                                                      {
                                                        staticClass:
                                                          "plan__price__amount"
                                                      },
                                                      [
                                                        _vm._v(
                                                          "\n                                            " +
                                                            _vm._s(
                                                              _vm.price(
                                                                _vm
                                                                  .editedLicense
                                                                  .amount
                                                              )
                                                            ) +
                                                            "\n                                        "
                                                        )
                                                      ]
                                                    )
                                                  ]
                                                )
                                              ])
                                            ],
                                            1
                                          )
                                        ]
                                      : _vm._e()
                                  ],
                                  2
                                )
                              ]
                            },
                            proxy: true
                          }
                        ],
                        null,
                        false,
                        2046711004
                      )
                    })
                  ],
                  1
                )
              : _vm._e(),
            _vm._v(" "),
            _c(
              "v-dialog",
              {
                attrs: { "max-width": "500" },
                model: {
                  value: _vm.importFromSpotifyDialog,
                  callback: function($$v) {
                    _vm.importFromSpotifyDialog = $$v
                  },
                  expression: "importFromSpotifyDialog"
                }
              },
              [
                _vm.importFromSpotifyDialog
                  ? _c("attach-asset-dialog", {
                      staticClass: "p-3",
                      attrs: { type: "album", engine: "spotify" },
                      on: {
                        asset: function($event) {
                          return _vm.addSpotifyData($event)
                        }
                      }
                    })
                  : _vm._e()
              ],
              1
            )
          ]
        },
        proxy: true
      }
    ])
  })
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dialogs/edit/Episode.vue?vue&type=template&id=7c4e4bf6&":
/*!******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/dialogs/edit/Episode.vue?vue&type=template&id=7c4e4bf6& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("edit-dialog", {
    attrs: {
      loading: _vm.isLoading,
      hideCallToAction: true,
      editing: "episode"
    },
    on: { callToAction: _vm.saveEpisode, cancel: _vm.closeWindow },
    scopedSlots: _vm._u([
      {
        key: "body",
        fn: function() {
          return [
            _c(
              "v-container",
              [
                _c(
                  "v-row",
                  [
                    _c(
                      "v-col",
                      { attrs: { cols: "5" } },
                      [
                        _c("veutifySelect", {
                          attrs: {
                            outlined: "",
                            items: _vm.sourceFormats,
                            label: _vm.$t("Source Format"),
                            "item-value": "value"
                          },
                          on: { change: _vm.resetSource },
                          scopedSlots: _vm._u([
                            {
                              key: "item",
                              fn: function(ref) {
                                var item = ref.item
                                return [
                                  _c(
                                    "div",
                                    { staticClass: "align-center p-1" },
                                    [
                                      _c(
                                        "v-icon",
                                        {
                                          staticClass: "mr-2",
                                          attrs: { color: "primary" }
                                        },
                                        [
                                          _vm._v(
                                            "$vuetify.icons." +
                                              _vm._s(item.icon)
                                          )
                                        ]
                                      ),
                                      _vm._v(
                                        "\n                                " +
                                          _vm._s(item.text) +
                                          "\n                            "
                                      )
                                    ],
                                    1
                                  )
                                ]
                              }
                            },
                            {
                              key: "selection",
                              fn: function(ref) {
                                var item = ref.item
                                return [
                                  _c(
                                    "div",
                                    { staticClass: "align-center p-1" },
                                    [
                                      _c(
                                        "v-icon",
                                        {
                                          staticClass: "mr-2",
                                          attrs: { color: "primary" }
                                        },
                                        [
                                          _vm._v(
                                            "$vuetify.icons." +
                                              _vm._s(item.icon)
                                          )
                                        ]
                                      ),
                                      _vm._v(
                                        "\n                                " +
                                          _vm._s(item.text) +
                                          "\n                            "
                                      )
                                    ],
                                    1
                                  )
                                ]
                              }
                            }
                          ]),
                          model: {
                            value: _vm.editedEpisode.source_format,
                            callback: function($$v) {
                              _vm.$set(_vm.editedEpisode, "source_format", $$v)
                            },
                            expression: "editedEpisode.source_format"
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "v-col",
                      { attrs: { cols: "7" } },
                      [
                        _vm.editedEpisode.source_format === "file"
                          ? _c("v-file-input", {
                              attrs: {
                                rules: [_vm.rules.fileSize],
                                accept: "audio/*",
                                "show-size": "",
                                outlined: "",
                                label: _vm.editedEpisode.file_name
                                  ? _vm.editedEpisode.file_name
                                  : _vm.$t("Attach Audio File"),
                                loading: _vm.episodeSourceLoading
                              },
                              on: {
                                "update:error": function($event) {
                                  _vm.error = $event
                                },
                                change: function($event) {
                                  return _vm.loadEpisodeMetadata($event)
                                }
                              },
                              model: {
                                value: _vm.episodeFile,
                                callback: function($$v) {
                                  _vm.episodeFile = $$v
                                },
                                expression: "episodeFile"
                              }
                            })
                          : _vm.editedEpisode.source_format === "yt_video"
                          ? _c("v-text-field", {
                              attrs: {
                                label: _vm.$t("Video URL"),
                                hint: _vm.$t(
                                  "You can add the video ID, but It must be valid."
                                ),
                                outlined: ""
                              },
                              model: {
                                value: _vm.editedEpisode.source,
                                callback: function($$v) {
                                  _vm.$set(_vm.editedEpisode, "source", $$v)
                                },
                                expression: "editedEpisode.source"
                              }
                            })
                          : _vm._e()
                      ],
                      1
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "v-row",
                  [
                    _c(
                      "v-col",
                      [
                        _c("v-text-field", {
                          attrs: {
                            label: _vm.$t("Title"),
                            dense: "",
                            outlined: "",
                            "hide-details": ""
                          },
                          model: {
                            value: _vm.editedEpisode.title,
                            callback: function($$v) {
                              _vm.$set(_vm.editedEpisode, "title", $$v)
                            },
                            expression: "editedEpisode.title"
                          }
                        })
                      ],
                      1
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "v-row",
                  { attrs: { justify: "center" } },
                  [
                    _c(
                      "v-col",
                      { attrs: { cols: "6", sm: "8" } },
                      [
                        _c("v-text-field", {
                          attrs: {
                            label: _vm.$t("Duration"),
                            placeholder: _vm.$t("Duration in seconds"),
                            type: "number",
                            outlined: "",
                            dense: "",
                            "hide-details": "",
                            disabled: _vm.autoDuration
                          },
                          model: {
                            value: _vm.editedEpisode.duration,
                            callback: function($$v) {
                              _vm.$set(_vm.editedEpisode, "duration", $$v)
                            },
                            expression: "editedEpisode.duration"
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "v-col",
                      { attrs: { cols: "6", sm: "4" } },
                      [
                        _c("v-switch", {
                          attrs: {
                            dense: "",
                            "hide-details": "",
                            label: _vm.$t("Auto Duration"),
                            disabled:
                              _vm.editedEpisode.source_format === "yt_video"
                          },
                          on: {
                            change: function($event) {
                              $event
                                ? _vm.loadEpisodeMetadata(
                                    _vm.episodeFile || _vm.editedEpisode.source
                                  )
                                : ""
                            }
                          },
                          model: {
                            value: _vm.autoDuration,
                            callback: function($$v) {
                              _vm.autoDuration = $$v
                            },
                            expression: "autoDuration"
                          }
                        })
                      ],
                      1
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "v-row",
                  [
                    _c(
                      "v-col",
                      { attrs: { cols: "12" } },
                      [
                        _c("v-textarea", {
                          attrs: {
                            outlined: "",
                            label: _vm.$t("Description"),
                            "hide-details": "",
                            hint: _vm.$t("General description of the episode."),
                            disabled: _vm.sourceMissing
                          },
                          model: {
                            value: _vm.editedEpisode.description,
                            callback: function($$v) {
                              _vm.$set(_vm.editedEpisode, "description", $$v)
                            },
                            expression: "editedEpisode.description"
                          }
                        })
                      ],
                      1
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "v-row",
                  [
                    _c("v-col", { attrs: { cols: "12" } }, [
                      _c(
                        "div",
                        [
                          _vm.isLoading && _vm.progress
                            ? _c(
                                "div",
                                { staticClass: "button-upload" },
                                [
                                  _c(
                                    "button",
                                    {
                                      staticClass:
                                        "uploading my-2  v-btn v-btn--block v-btn--contained theme--dark v-size--default",
                                      attrs: { color: "transparent" }
                                    },
                                    [
                                      _c(
                                        "div",
                                        { staticClass: "content-text" },
                                        [
                                          _vm._v(
                                            "\n                                    " +
                                              _vm._s(_vm.$t("Saving...")) +
                                              "\n                                    " +
                                              _vm._s(_vm.progress) +
                                              "%\n                                "
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c("div", {
                                        staticClass: "percentage success",
                                        style: {
                                          width: _vm.progress + "%"
                                        }
                                      })
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-btn",
                                    {
                                      staticClass: "cancel my-2 ",
                                      attrs: { block: "", color: "error" },
                                      on: {
                                        click: function($event) {
                                          return _vm.cancelRequest()
                                        }
                                      }
                                    },
                                    [
                                      _vm._v(
                                        "\n                                " +
                                          _vm._s(_vm.$t("Cancel")) +
                                          "\n                            "
                                      )
                                    ]
                                  )
                                ],
                                1
                              )
                            : _c(
                                "v-btn",
                                {
                                  staticClass: "my-2 success",
                                  attrs: { block: "", disabled: _vm.error },
                                  on: { click: _vm.saveEpisode }
                                },
                                [
                                  _vm._v(
                                    _vm._s(_vm.$t("Save")) +
                                      "\n                        "
                                  )
                                ]
                              )
                        ],
                        1
                      )
                    ])
                  ],
                  1
                )
              ],
              1
            )
          ]
        },
        proxy: true
      }
    ])
  })
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dialogs/edit/Podcast.vue?vue&type=template&id=05cef28e&":
/*!******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/dialogs/edit/Podcast.vue?vue&type=template&id=05cef28e& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("edit-dialog", {
    attrs: {
      loading: _vm.isLoading,
      fullscreen: !_vm.editedPodcast.new ? true : false,
      editing: "Podcast"
    },
    on: {
      callToAction: function($event) {
        return _vm.savePodcast(true)
      },
      cancel: _vm.closeWindow
    },
    scopedSlots: _vm._u([
      {
        key: "body",
        fn: function() {
          return [
            _c(
              "v-container",
              [
                _c(
                  "v-row",
                  [
                    _c(
                      "v-col",
                      { attrs: { cols: "auto" } },
                      [
                        _c("upload-image", {
                          attrs: {
                            id: "podcast" + _vm.editedPodcast.id,
                            source:
                              _vm.editedPodcast.cover || _vm.defaultCoverPath
                          },
                          on: {
                            imageReady: function($event) {
                              return _vm.imageReady($event)
                            }
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "v-col",
                      [
                        _c(
                          "v-container",
                          [
                            _c(
                              "v-row",
                              [
                                _c(
                                  "v-col",
                                  { attrs: { cols: "12" } },
                                  [
                                    _c("v-text-field", {
                                      attrs: {
                                        label: _vm.$t("Title"),
                                        outlined: "",
                                        "hide-details": "",
                                        dense: ""
                                      },
                                      model: {
                                        value: _vm.editedPodcast.title,
                                        callback: function($$v) {
                                          _vm.$set(
                                            _vm.editedPodcast,
                                            "title",
                                            $$v
                                          )
                                        },
                                        expression: "editedPodcast.title"
                                      }
                                    })
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _vm.$route.path.match("admin/")
                                  ? _c(
                                      "v-col",
                                      { attrs: { cols: "12" } },
                                      [
                                        _c("select-artists", {
                                          attrs: {
                                            artists:
                                              _vm.editedPodcast.artist &&
                                              _vm.editedPodcast.artist.id
                                                ? _vm.editedPodcast.artist
                                                : "",
                                            multiple: false
                                          },
                                          on: {
                                            artists: function($event) {
                                              _vm.editedPodcast.artist = $event
                                            }
                                          }
                                        })
                                      ],
                                      1
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                _c(
                                  "v-col",
                                  { attrs: { cols: "12" } },
                                  [
                                    _c("v-autocomplete", {
                                      attrs: {
                                        items: _vm.genres,
                                        label: _vm.$t("Genres"),
                                        "item-text": "name",
                                        "return-object": "",
                                        placeholder: _vm.$t("Select Genres"),
                                        multiple: "",
                                        outlined: ""
                                      },
                                      scopedSlots: _vm._u([
                                        {
                                          key: "selection",
                                          fn: function(ref) {
                                            var item = ref.item
                                            return [
                                              _c(
                                                "v-chip",
                                                {
                                                  attrs: { close: "" },
                                                  on: {
                                                    "click:close": function(
                                                      $event
                                                    ) {
                                                      return _vm.remove(item.id)
                                                    }
                                                  }
                                                },
                                                [
                                                  _vm._v(
                                                    "\n                      " +
                                                      _vm._s(item.name) +
                                                      "\n                    "
                                                  )
                                                ]
                                              )
                                            ]
                                          }
                                        },
                                        {
                                          key: "item",
                                          fn: function(ref) {
                                            var item = ref.item
                                            return [
                                              [
                                                _c(
                                                  "v-list-item-content",
                                                  [
                                                    _c("v-list-item-title", {
                                                      domProps: {
                                                        innerHTML: _vm._s(
                                                          item.name
                                                        )
                                                      }
                                                    })
                                                  ],
                                                  1
                                                )
                                              ]
                                            ]
                                          }
                                        }
                                      ]),
                                      model: {
                                        value: _vm.editedPodcast.genres,
                                        callback: function($$v) {
                                          _vm.$set(
                                            _vm.editedPodcast,
                                            "genres",
                                            $$v
                                          )
                                        },
                                        expression: "editedPodcast.genres"
                                      }
                                    })
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "v-col",
                                  { attrs: { cols: "12" } },
                                  [
                                    _c("v-textarea", {
                                      attrs: {
                                        outlined: "",
                                        label: _vm.$t("Description"),
                                        hint:
                                          "A general description of the podcast."
                                      },
                                      model: {
                                        value: _vm.editedPodcast.description,
                                        callback: function($$v) {
                                          _vm.$set(
                                            _vm.editedPodcast,
                                            "description",
                                            $$v
                                          )
                                        },
                                        expression: "editedPodcast.description"
                                      }
                                    })
                                  ],
                                  1
                                )
                              ],
                              1
                            )
                          ],
                          1
                        ),
                        _vm._v(" "),
                        !_vm.editedPodcast.new
                          ? _c(
                              "v-container",
                              { staticClass: "episodes mb-5" },
                              [
                                _c(
                                  "div",
                                  { staticClass: "episodes-wrapper" },
                                  [
                                    _c(
                                      "v-card",
                                      { attrs: { outlined: "" } },
                                      [
                                        _c(
                                          "v-card-title",
                                          [
                                            _c(
                                              "v-icon",
                                              {
                                                attrs: {
                                                  color: "primary",
                                                  "x-large": ""
                                                }
                                              },
                                              [
                                                _vm._v(
                                                  "$vuetify.icons.music-note"
                                                )
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "large-icon-text tertiary--text"
                                              },
                                              [
                                                _vm._v(
                                                  "\n                    " +
                                                    _vm._s(_vm.$t("Episodes")) +
                                                    "\n                  "
                                                )
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "v-btn",
                                              {
                                                staticClass: "mx-2 ml-3",
                                                attrs: {
                                                  dark: "",
                                                  small: "",
                                                  color: "primary"
                                                },
                                                on: {
                                                  click: function($event) {
                                                    return _vm.editEpisode(
                                                      "new"
                                                    )
                                                  }
                                                }
                                              },
                                              [
                                                _c(
                                                  "v-icon",
                                                  {
                                                    attrs: {
                                                      dark:
                                                        _vm.$store.state
                                                          .darkTheme ||
                                                        _vm.$store.getters
                                                          .getSettings
                                                          .defaultTheme ==
                                                          "dark"
                                                    }
                                                  },
                                                  [
                                                    _vm._v(
                                                      "$vuetify.icons.plus"
                                                    )
                                                  ]
                                                ),
                                                _vm._v(
                                                  "\n                    " +
                                                    _vm._s(_vm.$t("New")) +
                                                    "\n                  "
                                                )
                                              ],
                                              1
                                            )
                                          ],
                                          1
                                        ),
                                        _vm._v(" "),
                                        _c("v-data-table", {
                                          attrs: {
                                            "no-data-text": _vm.$t(
                                              "No data available"
                                            ),
                                            "loading-text":
                                              _vm.$t("Fetching data") + "...",
                                            headers: _vm.episodeTableHeaders,
                                            items: _vm.editedPodcast.episodes,
                                            "hide-default-footer": "",
                                            "items-per-page": 10000,
                                            loading: !_vm.editedPodcast.episodes
                                          },
                                          scopedSlots: _vm._u(
                                            [
                                              {
                                                key: "item.created_at",
                                                fn: function(ref) {
                                                  var item = ref.item
                                                  return [
                                                    _vm._v(
                                                      "\n                    " +
                                                        _vm._s(
                                                          _vm
                                                            .moment(
                                                              item.created_at
                                                            )
                                                            .format("ll")
                                                        ) +
                                                        "\n                  "
                                                    )
                                                  ]
                                                }
                                              },
                                              {
                                                key: "item.cover",
                                                fn: function(ref) {
                                                  var item = ref.item
                                                  return [
                                                    _c(
                                                      "div",
                                                      {
                                                        staticClass:
                                                          "img-container py-2"
                                                      },
                                                      [
                                                        _c(
                                                          "v-img",
                                                          {
                                                            staticClass:
                                                              "user-avatar podcast-cover",
                                                            attrs: {
                                                              src:
                                                                _vm
                                                                  .editedPodcast
                                                                  .cover,
                                                              alt:
                                                                _vm
                                                                  .editedPodcast
                                                                  .title,
                                                              width: "50",
                                                              height: "50"
                                                            }
                                                          },
                                                          [
                                                            item.progress !=
                                                              null &&
                                                            item.progress < 100
                                                              ? _c(
                                                                  "div",
                                                                  {
                                                                    staticClass:
                                                                      "upload-percentage"
                                                                  },
                                                                  [
                                                                    _c(
                                                                      "div",
                                                                      {
                                                                        staticClass:
                                                                          "content-text"
                                                                      },
                                                                      [
                                                                        _vm._v(
                                                                          _vm._s(
                                                                            item.progress
                                                                          ) +
                                                                            "%"
                                                                        )
                                                                      ]
                                                                    )
                                                                  ]
                                                                )
                                                              : _vm._e()
                                                          ]
                                                        )
                                                      ],
                                                      1
                                                    )
                                                  ]
                                                }
                                              },
                                              {
                                                key: "item.duration",
                                                fn: function(ref) {
                                                  var item = ref.item
                                                  return [
                                                    _vm._v(
                                                      "\n                    " +
                                                        _vm._s(
                                                          item.duration
                                                            ? _vm.mmss(
                                                                item.duration
                                                              )
                                                            : ""
                                                        ) +
                                                        "\n                  "
                                                    )
                                                  ]
                                                }
                                              },
                                              {
                                                key: "item.operations",
                                                fn: function(ref) {
                                                  var item = ref.item
                                                  return [
                                                    _c(
                                                      "v-btn",
                                                      {
                                                        staticClass: "mx-2",
                                                        attrs: {
                                                          "x-small": "",
                                                          fab: "",
                                                          dark: "",
                                                          color: "info"
                                                        },
                                                        on: {
                                                          click: function(
                                                            $event
                                                          ) {
                                                            return _vm.editEpisode(
                                                              item.id
                                                            )
                                                          }
                                                        }
                                                      },
                                                      [
                                                        _c(
                                                          "v-icon",
                                                          {
                                                            attrs: {
                                                              dark:
                                                                _vm.$store.state
                                                                  .darkTheme ||
                                                                _vm.$store
                                                                  .getters
                                                                  .getSettings
                                                                  .defaultTheme ==
                                                                  "dark"
                                                            }
                                                          },
                                                          [
                                                            _vm._v(
                                                              "$vuetify.icons.pencil"
                                                            )
                                                          ]
                                                        )
                                                      ],
                                                      1
                                                    ),
                                                    _vm._v(" "),
                                                    _c(
                                                      "v-btn",
                                                      {
                                                        staticClass: "mx-2",
                                                        attrs: {
                                                          "x-small": "",
                                                          fab: "",
                                                          dark: "",
                                                          color: "error"
                                                        },
                                                        on: {
                                                          click: function(
                                                            $event
                                                          ) {
                                                            return _vm.deleteEpisode(
                                                              item.id
                                                            )
                                                          }
                                                        }
                                                      },
                                                      [
                                                        _c("v-icon", [
                                                          _vm._v(
                                                            "$vuetify.icons.delete"
                                                          )
                                                        ])
                                                      ],
                                                      1
                                                    )
                                                  ]
                                                }
                                              }
                                            ],
                                            null,
                                            false,
                                            3957771914
                                          )
                                        })
                                      ],
                                      1
                                    )
                                  ],
                                  1
                                )
                              ]
                            )
                          : _vm._e()
                      ],
                      1
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "v-row",
                  [
                    _c("edit-external-links", {
                      attrs: { item: _vm.editedPodcast },
                      on: {
                        spotify_link: function($event) {
                          _vm.editedPodcast.spotify_link = $event
                        },
                        youtube_link: function($event) {
                          _vm.editedPodcast.youtube_link = $event
                        },
                        soundcloud_link: function($event) {
                          _vm.editedPodcast.soundcloud_link = $event
                        },
                        itunes_link: function($event) {
                          _vm.editedPodcast.itunes_link = $event
                        },
                        deezer_link: function($event) {
                          _vm.editedPodcast.deezer_link = $event
                        }
                      }
                    })
                  ],
                  1
                )
              ],
              1
            )
          ]
        },
        proxy: true
      },
      {
        key: "dialogs",
        fn: function() {
          return [
            _c(
              "v-dialog",
              {
                attrs: { persistent: "", scrollable: "", "max-width": "950" },
                on: { "click:outside": _vm.hideAllepisodes },
                model: {
                  value: _vm.editDialog,
                  callback: function($$v) {
                    _vm.editDialog = $$v
                  },
                  expression: "editDialog"
                }
              },
              [
                _vm._l(_vm.editedPodcast.episodes, function(episode) {
                  return [
                    episode.isActive
                      ? _c("edit-episode-dialog", {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: _vm.isShowing(episode.id),
                              expression: "isShowing(episode.id)"
                            }
                          ],
                          key: episode.id,
                          attrs: {
                            episode: episode,
                            uploader: _vm.creator,
                            podcast_id: _vm.editedPodcast.id
                          },
                          on: {
                            updated: function($event) {
                              return _vm.episodeEdited(episode.id)
                            },
                            progress: function($event) {
                              return _vm.updateProgress($event, episode.id)
                            },
                            created: _vm.episodeCreated,
                            close: function($event) {
                              return _vm.closeEpisode(episode.id)
                            },
                            sleep: function($event) {
                              return _vm.sleepEpisode(episode.id)
                            },
                            wake: function($event) {
                              return _vm.wakeEpisode(episode.id)
                            }
                          }
                        })
                      : _vm._e()
                  ]
                })
              ],
              2
            )
          ]
        },
        proxy: true
      }
    ])
  })
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/elements/select/Users.vue?vue&type=template&id=0cbe351c&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/elements/select/Users.vue?vue&type=template&id=0cbe351c& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("v-autocomplete", {
    attrs: {
      items: _vm.searchedUsers,
      loading: _vm.isSearchUserLoading,
      "search-input": _vm.searchUsers,
      label: _vm.multiple ? _vm.$t("Users") : _vm.$t("User"),
      "item-text": "name",
      "return-object": "",
      "hide-details": "",
      placeholder: _vm.$t("Start typing to Search"),
      multiple: _vm.multiple,
      outlined: ""
    },
    on: {
      "update:searchInput": function($event) {
        _vm.searchUsers = $event
      },
      "update:search-input": function($event) {
        _vm.searchUsers = $event
      }
    },
    scopedSlots: _vm._u([
      {
        key: "selection",
        fn: function(ref) {
          var item = ref.item
          return [
            _c(
              "v-chip",
              {
                attrs: { close: "" },
                on: {
                  "click:close": function($event) {
                    return _vm.remove(item.id)
                  }
                }
              },
              [
                _c(
                  "v-avatar",
                  { attrs: { left: "" } },
                  [
                    item.avatar
                      ? _c("v-img", { attrs: { src: item.avatar } })
                      : _c("v-icon", [_vm._v("$vuetify.icons.account-music")])
                  ],
                  1
                ),
                _vm._v(
                  "\n            " +
                    _vm._s(item.name + "(" + item.email + ")") +
                    "\n        "
                )
              ],
              1
            )
          ]
        }
      },
      {
        key: "item",
        fn: function(ref) {
          var item = ref.item
          return [
            [
              _c(
                "v-list-item-avatar",
                [
                  item.avatar
                    ? _c("v-img", { attrs: { src: item.avatar } })
                    : _c("v-icon", [_vm._v("$vuetify.icons.account-music")])
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-list-item-content",
                [
                  _c("v-list-item-title", {
                    domProps: { innerHTML: _vm._s(item.name) }
                  })
                ],
                1
              )
            ]
          ]
        }
      }
    ]),
    model: {
      value: _vm.selectedUsers,
      callback: function($$v) {
        _vm.selectedUsers = $$v
      },
      expression: "selectedUsers"
    }
  })
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/dialogs/AttachSong.vue":
/*!********************************************************!*\
  !*** ./resources/js/components/dialogs/AttachSong.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AttachSong_vue_vue_type_template_id_ec5f77ee___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AttachSong.vue?vue&type=template&id=ec5f77ee& */ "./resources/js/components/dialogs/AttachSong.vue?vue&type=template&id=ec5f77ee&");
/* harmony import */ var _AttachSong_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AttachSong.vue?vue&type=script&lang=js& */ "./resources/js/components/dialogs/AttachSong.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vuetify_lib_components_VAutocomplete__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify/lib/components/VAutocomplete */ "./node_modules/vuetify/lib/components/VAutocomplete/index.js");
/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ "./node_modules/vuetify/lib/components/VBtn/index.js");
/* harmony import */ var vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VCard */ "./node_modules/vuetify/lib/components/VCard/index.js");
/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ "./node_modules/vuetify/lib/components/VGrid/index.js");
/* harmony import */ var vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VImg */ "./node_modules/vuetify/lib/components/VImg/index.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _AttachSong_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AttachSong_vue_vue_type_template_id_ec5f77ee___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AttachSong_vue_vue_type_template_id_ec5f77ee___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* vuetify-loader */








_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default()(component, {VAutocomplete: vuetify_lib_components_VAutocomplete__WEBPACK_IMPORTED_MODULE_4__["VAutocomplete"],VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_5__["VBtn"],VCard: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__["VCard"],VCol: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_7__["VCol"],VContainer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_7__["VContainer"],VImg: vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_8__["VImg"],VRow: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_7__["VRow"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/dialogs/AttachSong.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/dialogs/AttachSong.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/dialogs/AttachSong.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AttachSong_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./AttachSong.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dialogs/AttachSong.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AttachSong_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/dialogs/AttachSong.vue?vue&type=template&id=ec5f77ee&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/dialogs/AttachSong.vue?vue&type=template&id=ec5f77ee& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AttachSong_vue_vue_type_template_id_ec5f77ee___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./AttachSong.vue?vue&type=template&id=ec5f77ee& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dialogs/AttachSong.vue?vue&type=template&id=ec5f77ee&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AttachSong_vue_vue_type_template_id_ec5f77ee___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AttachSong_vue_vue_type_template_id_ec5f77ee___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/dialogs/edit/Album.vue":
/*!********************************************************!*\
  !*** ./resources/js/components/dialogs/edit/Album.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Album_vue_vue_type_template_id_696254f9_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Album.vue?vue&type=template&id=696254f9&scoped=true& */ "./resources/js/components/dialogs/edit/Album.vue?vue&type=template&id=696254f9&scoped=true&");
/* harmony import */ var _Album_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Album.vue?vue&type=script&lang=js& */ "./resources/js/components/dialogs/edit/Album.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Album_vue_vue_type_style_index_0_id_696254f9_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Album.vue?vue&type=style&index=0&id=696254f9&scoped=true&lang=css& */ "./resources/js/components/dialogs/edit/Album.vue?vue&type=style&index=0&id=696254f9&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ "./node_modules/vuetify/lib/components/VBtn/index.js");
/* harmony import */ var vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VCard */ "./node_modules/vuetify/lib/components/VCard/index.js");
/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ "./node_modules/vuetify/lib/components/VGrid/index.js");
/* harmony import */ var vuetify_lib_components_VDataTable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VDataTable */ "./node_modules/vuetify/lib/components/VDataTable/index.js");
/* harmony import */ var vuetify_lib_components_VDatePicker__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuetify/lib/components/VDatePicker */ "./node_modules/vuetify/lib/components/VDatePicker/index.js");
/* harmony import */ var vuetify_lib_components_VDialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vuetify/lib/components/VDialog */ "./node_modules/vuetify/lib/components/VDialog/index.js");
/* harmony import */ var vuetify_lib_components_VDivider__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! vuetify/lib/components/VDivider */ "./node_modules/vuetify/lib/components/VDivider/index.js");
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/index.js");
/* harmony import */ var vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! vuetify/lib/components/VImg */ "./node_modules/vuetify/lib/components/VImg/index.js");
/* harmony import */ var vuetify_lib_components_VMenu__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! vuetify/lib/components/VMenu */ "./node_modules/vuetify/lib/components/VMenu/index.js");
/* harmony import */ var vuetify_lib_components_VProgressCircular__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! vuetify/lib/components/VProgressCircular */ "./node_modules/vuetify/lib/components/VProgressCircular/index.js");
/* harmony import */ var vuetify_lib_components_VSelect__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! vuetify/lib/components/VSelect */ "./node_modules/vuetify/lib/components/VSelect/index.js");
/* harmony import */ var vuetify_lib_components_VSwitch__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! vuetify/lib/components/VSwitch */ "./node_modules/vuetify/lib/components/VSwitch/index.js");
/* harmony import */ var vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! vuetify/lib/components/VTextField */ "./node_modules/vuetify/lib/components/VTextField/index.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Album_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Album_vue_vue_type_template_id_696254f9_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Album_vue_vue_type_template_id_696254f9_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "696254f9",
  null
  
)

/* vuetify-loader */




















_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default()(component, {VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_5__["VBtn"],VCard: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__["VCard"],VCardActions: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__["VCardActions"],VCardTitle: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__["VCardTitle"],VCol: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_7__["VCol"],VContainer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_7__["VContainer"],VDataTable: vuetify_lib_components_VDataTable__WEBPACK_IMPORTED_MODULE_8__["VDataTable"],VDatePicker: vuetify_lib_components_VDatePicker__WEBPACK_IMPORTED_MODULE_9__["VDatePicker"],VDialog: vuetify_lib_components_VDialog__WEBPACK_IMPORTED_MODULE_10__["VDialog"],VDivider: vuetify_lib_components_VDivider__WEBPACK_IMPORTED_MODULE_11__["VDivider"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_12__["VIcon"],VImg: vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_13__["VImg"],VMenu: vuetify_lib_components_VMenu__WEBPACK_IMPORTED_MODULE_14__["VMenu"],VProgressCircular: vuetify_lib_components_VProgressCircular__WEBPACK_IMPORTED_MODULE_15__["VProgressCircular"],VRow: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_7__["VRow"],VSelect: vuetify_lib_components_VSelect__WEBPACK_IMPORTED_MODULE_16__["VSelect"],VSimpleTable: vuetify_lib_components_VDataTable__WEBPACK_IMPORTED_MODULE_8__["VSimpleTable"],VSwitch: vuetify_lib_components_VSwitch__WEBPACK_IMPORTED_MODULE_17__["VSwitch"],VTextField: vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_18__["VTextField"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/dialogs/edit/Album.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/dialogs/edit/Album.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/dialogs/edit/Album.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Album_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Album.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dialogs/edit/Album.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Album_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/dialogs/edit/Album.vue?vue&type=style&index=0&id=696254f9&scoped=true&lang=css&":
/*!*****************************************************************************************************************!*\
  !*** ./resources/js/components/dialogs/edit/Album.vue?vue&type=style&index=0&id=696254f9&scoped=true&lang=css& ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Album_vue_vue_type_style_index_0_id_696254f9_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader??ref--7-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Album.vue?vue&type=style&index=0&id=696254f9&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dialogs/edit/Album.vue?vue&type=style&index=0&id=696254f9&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Album_vue_vue_type_style_index_0_id_696254f9_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Album_vue_vue_type_style_index_0_id_696254f9_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Album_vue_vue_type_style_index_0_id_696254f9_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Album_vue_vue_type_style_index_0_id_696254f9_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/components/dialogs/edit/Album.vue?vue&type=template&id=696254f9&scoped=true&":
/*!***************************************************************************************************!*\
  !*** ./resources/js/components/dialogs/edit/Album.vue?vue&type=template&id=696254f9&scoped=true& ***!
  \***************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Album_vue_vue_type_template_id_696254f9_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Album.vue?vue&type=template&id=696254f9&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dialogs/edit/Album.vue?vue&type=template&id=696254f9&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Album_vue_vue_type_template_id_696254f9_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Album_vue_vue_type_template_id_696254f9_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/dialogs/edit/Episode.vue":
/*!**********************************************************!*\
  !*** ./resources/js/components/dialogs/edit/Episode.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Episode_vue_vue_type_template_id_7c4e4bf6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Episode.vue?vue&type=template&id=7c4e4bf6& */ "./resources/js/components/dialogs/edit/Episode.vue?vue&type=template&id=7c4e4bf6&");
/* harmony import */ var _Episode_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Episode.vue?vue&type=script&lang=js& */ "./resources/js/components/dialogs/edit/Episode.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ "./node_modules/vuetify/lib/components/VBtn/index.js");
/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ "./node_modules/vuetify/lib/components/VGrid/index.js");
/* harmony import */ var vuetify_lib_components_VFileInput__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VFileInput */ "./node_modules/vuetify/lib/components/VFileInput/index.js");
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/index.js");
/* harmony import */ var vuetify_lib_components_VSwitch__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VSwitch */ "./node_modules/vuetify/lib/components/VSwitch/index.js");
/* harmony import */ var vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuetify/lib/components/VTextField */ "./node_modules/vuetify/lib/components/VTextField/index.js");
/* harmony import */ var vuetify_lib_components_VTextarea__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vuetify/lib/components/VTextarea */ "./node_modules/vuetify/lib/components/VTextarea/index.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Episode_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Episode_vue_vue_type_template_id_7c4e4bf6___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Episode_vue_vue_type_template_id_7c4e4bf6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* vuetify-loader */










_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default()(component, {VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__["VBtn"],VCol: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_5__["VCol"],VContainer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_5__["VContainer"],VFileInput: vuetify_lib_components_VFileInput__WEBPACK_IMPORTED_MODULE_6__["VFileInput"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_7__["VIcon"],VRow: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_5__["VRow"],VSwitch: vuetify_lib_components_VSwitch__WEBPACK_IMPORTED_MODULE_8__["VSwitch"],VTextField: vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_9__["VTextField"],VTextarea: vuetify_lib_components_VTextarea__WEBPACK_IMPORTED_MODULE_10__["VTextarea"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/dialogs/edit/Episode.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/dialogs/edit/Episode.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/dialogs/edit/Episode.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Episode_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Episode.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dialogs/edit/Episode.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Episode_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/dialogs/edit/Episode.vue?vue&type=template&id=7c4e4bf6&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/dialogs/edit/Episode.vue?vue&type=template&id=7c4e4bf6& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Episode_vue_vue_type_template_id_7c4e4bf6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Episode.vue?vue&type=template&id=7c4e4bf6& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dialogs/edit/Episode.vue?vue&type=template&id=7c4e4bf6&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Episode_vue_vue_type_template_id_7c4e4bf6___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Episode_vue_vue_type_template_id_7c4e4bf6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/dialogs/edit/Podcast.vue":
/*!**********************************************************!*\
  !*** ./resources/js/components/dialogs/edit/Podcast.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Podcast_vue_vue_type_template_id_05cef28e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Podcast.vue?vue&type=template&id=05cef28e& */ "./resources/js/components/dialogs/edit/Podcast.vue?vue&type=template&id=05cef28e&");
/* harmony import */ var _Podcast_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Podcast.vue?vue&type=script&lang=js& */ "./resources/js/components/dialogs/edit/Podcast.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vuetify_lib_components_VAutocomplete__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify/lib/components/VAutocomplete */ "./node_modules/vuetify/lib/components/VAutocomplete/index.js");
/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ "./node_modules/vuetify/lib/components/VBtn/index.js");
/* harmony import */ var vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VCard */ "./node_modules/vuetify/lib/components/VCard/index.js");
/* harmony import */ var vuetify_lib_components_VChip__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VChip */ "./node_modules/vuetify/lib/components/VChip/index.js");
/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ "./node_modules/vuetify/lib/components/VGrid/index.js");
/* harmony import */ var vuetify_lib_components_VDataTable__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuetify/lib/components/VDataTable */ "./node_modules/vuetify/lib/components/VDataTable/index.js");
/* harmony import */ var vuetify_lib_components_VDialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vuetify/lib/components/VDialog */ "./node_modules/vuetify/lib/components/VDialog/index.js");
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/index.js");
/* harmony import */ var vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! vuetify/lib/components/VImg */ "./node_modules/vuetify/lib/components/VImg/index.js");
/* harmony import */ var vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! vuetify/lib/components/VList */ "./node_modules/vuetify/lib/components/VList/index.js");
/* harmony import */ var vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! vuetify/lib/components/VTextField */ "./node_modules/vuetify/lib/components/VTextField/index.js");
/* harmony import */ var vuetify_lib_components_VTextarea__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! vuetify/lib/components/VTextarea */ "./node_modules/vuetify/lib/components/VTextarea/index.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Podcast_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Podcast_vue_vue_type_template_id_05cef28e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Podcast_vue_vue_type_template_id_05cef28e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* vuetify-loader */

















_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default()(component, {VAutocomplete: vuetify_lib_components_VAutocomplete__WEBPACK_IMPORTED_MODULE_4__["VAutocomplete"],VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_5__["VBtn"],VCard: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__["VCard"],VCardTitle: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__["VCardTitle"],VChip: vuetify_lib_components_VChip__WEBPACK_IMPORTED_MODULE_7__["VChip"],VCol: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_8__["VCol"],VContainer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_8__["VContainer"],VDataTable: vuetify_lib_components_VDataTable__WEBPACK_IMPORTED_MODULE_9__["VDataTable"],VDialog: vuetify_lib_components_VDialog__WEBPACK_IMPORTED_MODULE_10__["VDialog"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_11__["VIcon"],VImg: vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_12__["VImg"],VListItemContent: vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_13__["VListItemContent"],VListItemTitle: vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_13__["VListItemTitle"],VRow: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_8__["VRow"],VTextField: vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_14__["VTextField"],VTextarea: vuetify_lib_components_VTextarea__WEBPACK_IMPORTED_MODULE_15__["VTextarea"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/dialogs/edit/Podcast.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/dialogs/edit/Podcast.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/dialogs/edit/Podcast.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Podcast_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Podcast.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dialogs/edit/Podcast.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Podcast_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/dialogs/edit/Podcast.vue?vue&type=template&id=05cef28e&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/dialogs/edit/Podcast.vue?vue&type=template&id=05cef28e& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Podcast_vue_vue_type_template_id_05cef28e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Podcast.vue?vue&type=template&id=05cef28e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dialogs/edit/Podcast.vue?vue&type=template&id=05cef28e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Podcast_vue_vue_type_template_id_05cef28e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Podcast_vue_vue_type_template_id_05cef28e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/elements/select/Users.vue":
/*!***********************************************************!*\
  !*** ./resources/js/components/elements/select/Users.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Users_vue_vue_type_template_id_0cbe351c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Users.vue?vue&type=template&id=0cbe351c& */ "./resources/js/components/elements/select/Users.vue?vue&type=template&id=0cbe351c&");
/* harmony import */ var _Users_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Users.vue?vue&type=script&lang=js& */ "./resources/js/components/elements/select/Users.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vuetify_lib_components_VAutocomplete__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify/lib/components/VAutocomplete */ "./node_modules/vuetify/lib/components/VAutocomplete/index.js");
/* harmony import */ var vuetify_lib_components_VAvatar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VAvatar */ "./node_modules/vuetify/lib/components/VAvatar/index.js");
/* harmony import */ var vuetify_lib_components_VChip__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VChip */ "./node_modules/vuetify/lib/components/VChip/index.js");
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/index.js");
/* harmony import */ var vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VImg */ "./node_modules/vuetify/lib/components/VImg/index.js");
/* harmony import */ var vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuetify/lib/components/VList */ "./node_modules/vuetify/lib/components/VList/index.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Users_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Users_vue_vue_type_template_id_0cbe351c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Users_vue_vue_type_template_id_0cbe351c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* vuetify-loader */









_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default()(component, {VAutocomplete: vuetify_lib_components_VAutocomplete__WEBPACK_IMPORTED_MODULE_4__["VAutocomplete"],VAvatar: vuetify_lib_components_VAvatar__WEBPACK_IMPORTED_MODULE_5__["VAvatar"],VChip: vuetify_lib_components_VChip__WEBPACK_IMPORTED_MODULE_6__["VChip"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_7__["VIcon"],VImg: vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_8__["VImg"],VListItemAvatar: vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_9__["VListItemAvatar"],VListItemContent: vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_9__["VListItemContent"],VListItemTitle: vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_9__["VListItemTitle"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/elements/select/Users.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/elements/select/Users.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/components/elements/select/Users.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Users_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Users.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/elements/select/Users.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Users_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/elements/select/Users.vue?vue&type=template&id=0cbe351c&":
/*!******************************************************************************************!*\
  !*** ./resources/js/components/elements/select/Users.vue?vue&type=template&id=0cbe351c& ***!
  \******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Users_vue_vue_type_template_id_0cbe351c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Users.vue?vue&type=template&id=0cbe351c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/elements/select/Users.vue?vue&type=template&id=0cbe351c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Users_vue_vue_type_template_id_0cbe351c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Users_vue_vue_type_template_id_0cbe351c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);