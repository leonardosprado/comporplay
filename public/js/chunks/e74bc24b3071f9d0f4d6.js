(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["player"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dialogs/EditPlaylist.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/dialogs/EditPlaylist.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ["playlist"],
  data: function data() {
    return {
      editedPlaylist: JSON.parse(JSON.stringify(this.playlist)),
      isLoading: false
    };
  },
  methods: {
    validateAndCreatePlaylist: function validateAndCreatePlaylist() {
      var _this = this;

      if (this.editedPlaylist.title) {
        this.isLoading = true;
        var formData = new FormData();
        formData.append("playlist_id", this.editedPlaylist.id);
        formData.append("title", this.editedPlaylist.title);

        if (this.editedPlaylist.cover && this.editedPlaylist.cover.data) {
          formData.append("cover", this.editedPlaylist.cover.data, this.editedPlaylist.cover.title);
        }

        formData.append("public", this.editedPlaylist["public"] ? 1 : 0);
        formData.append("_method", "PUT");
        axios.post("/api/user/playlists/" + this.editedPlaylist.id, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }).then(function () {
          _this.$notify({
            type: "success",
            group: "foo",
            title: _this.$t("Updated"),
            text: _this.$t("Playlist") + " " + _this.$t("updated successfully.")
          });

          _this.$emit("updated");
        })["catch"]()["finally"](function () {
          return _this.isLoading = false;
        });
      }
    },
    imageUploaded: function imageUploaded(e) {
      this.editedPlaylist.cover = e;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dialogs/Share.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/dialogs/Share.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _player_ShareLinks_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../player/ShareLinks.vue */ "./resources/js/components/player/ShareLinks.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    ShareLinks: _player_ShareLinks_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  computed: {
    item: function item() {
      return this.$store.getters.getSharableItem;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/elements/PlayerSearchbar.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/elements/PlayerSearchbar.vue?vue&type=script&lang=js& ***!
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      menuItem: 0,
      keyword: "",
      searchResults: null,
      loading: false
    };
  },
  methods: {
    search: function search() {
      var _this = this;

      if (!this.keyword) {
        this.searchResults = null;
        this.loading = false;
      } else {
        this.loading = true;
        axios.get("/api/search/" + this.keyword).then(function (res) {
          _this.searchResults = res.data;
        })["finally"](function () {
          return _this.loading = false;
        });
      }
    },
    goToSearchRoute: function goToSearchRoute(_ref) {
      var id = _ref.id,
          name = _ref.name;
      this.$emit("navigation");
      this.pushRoute({
        name: name,
        id: id
      });
      this.showResultPanel = false;
    }
  },
  computed: {
    currentPage: function currentPage() {
      switch (this.menuItem) {
        case 0:
          return "top";

        case 1:
          return "songs";

        case 2:
          return "albums";

        case 3:
          return "artists";

        case 4:
          return "users";

        case 5:
          return "playlists";

        case 6:
          return "podcasts";
      }
    },
    showResultPanel: {
      set: function set(val) {
        this.$store.commit("setSearchResultsPanel", val);
      },
      get: function get() {
        return this.$store.getters.getSearchResultsPanel;
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/elements/lists/playlistSongs.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/elements/lists/playlistSongs.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ["songs", "playlist_id", "mine", "ranked", "headers"],
  computed: {
    isLiked: function isLiked() {
      return function (id) {
        return this.$store.getters.isLiked(id);
      };
    }
  },
  data: function data() {
    return {
      compid: Math.floor(Math.random(50 * 50) * 5000)
    };
  },
  methods: {
    like: function like(song_id) {
      if (this.isLiked(song_id)) {
        this.$store.dispatch("dislike", song_id);
      } else {
        this.$store.dispatch("like", song_id);
      }
    },
    detachSong: function detachSong(song_id, song_title) {
      var _this = this;

      this.$confirm({
        message: "".concat(this.$t("Are you sure you wanna remove this song from this playlist?")),
        button: {
          no: this.$t('No'),
          yes: this.$t("Yes")
        },

        /**
         * Callback Function
         * @param {Boolean} confirm
         */
        callback: function callback(confirm) {
          if (confirm) {
            _this.$store.dispatch("detachFromPlaylist", {
              song_id: song_id,
              playlist_id: _this.playlist_id
            }).then(function (res) {
              _this.$notify({
                group: "foo",
                type: "success",
                title: _this.$t("Song Removed"),
                text: song_title + " " + _this.$t("has been removed from playlist successfully.")
              });

              _this.$emit("deleted", song_id);
            });
          }
        }
      });
    },
    changePrivacy: function changePrivacy(song) {
      var _this2 = this;

      if (song["private"] == 1) {
        this.$confirm({
          message: "".concat(this.$t("Are you sure you wanna make this song public? This means that it's gonna be visible on your profile.")),
          button: {
            no: this.$t('No'),
            yes: this.$t("Yes")
          },

          /**
           * Callback Function
           * @param {Boolean} confirm
           */
          callback: function callback(confirm) {
            if (confirm) {
              _this2.$store.dispatch("make_song_public", song.id);
            }
          }
        });
      } else {
        this.$confirm({
          message: "".concat(this.$t("Are you sure you wanna make this song private? This means that it's gonna be visible only for you.")),
          button: {
            no: this.$t('No'),
            yes: this.$t("Yes")
          },

          /**
           * Callback Function
           * @param {Boolean} confirm
           */
          callback: function callback(confirm) {
            if (confirm) {
              _this2.$store.dispatch("make_song_private", song.id);
            }
          }
        });
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/ShareLinks.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/ShareLinks.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ["item"],
  created: function created() {
    if (this.$store.getters.getSettings.enable_share_facebook) {
      this.networks.push({
        network: "facebook",
        name: "Facebook",
        icon: "facebook",
        color: "#1877f2"
      });
    }

    if (this.$store.getters.getSettings.enable_share_twitter) {
      this.networks.push({
        network: "twitter",
        name: "Twitter",
        icon: "twitter",
        color: "#1da1f2"
      });
    }

    if (this.$store.getters.getSettings.enable_share_whatsapp) {
      this.networks.push({
        network: "whatsapp",
        name: "Whatsapp",
        icon: "whatsapp",
        color: "#25d366"
      });
    }

    if (this.$store.getters.getSettings.enable_share_telegram) {
      this.networks.push({
        network: "telegram",
        name: "Telegram",
        icon: "telegram",
        color: "#0088cc"
      });
    }
  },
  data: function data() {
    return {
      networks: []
    };
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/layout/Master.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/layout/Master.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Navbar_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Navbar.vue */ "./resources/js/components/player/layout/Navbar.vue");
/* harmony import */ var _Sidebar_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Sidebar.vue */ "./resources/js/components/player/layout/Sidebar.vue");
/* harmony import */ var _RightSidebar_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RightSidebar.vue */ "./resources/js/components/player/layout/RightSidebar.vue");
/* harmony import */ var _dialogs_Playlists__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../dialogs/Playlists */ "./resources/js/components/dialogs/Playlists.vue");
/* harmony import */ var _dialogs_Share__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../dialogs/Share */ "./resources/js/components/dialogs/Share.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    Navbar: _Navbar_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    Sidebar: _Sidebar_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    RightSidebar: _RightSidebar_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    addToPlaylist: _dialogs_Playlists__WEBPACK_IMPORTED_MODULE_3__["default"],
    ShareDialog: _dialogs_Share__WEBPACK_IMPORTED_MODULE_4__["default"],
    Checkout: function Checkout() {
      return __webpack_require__.e(/*! import() */ 10).then(__webpack_require__.bind(null, /*! ../../dialogs/selling/Checkout.vue */ "./resources/js/components/dialogs/selling/Checkout.vue"));
    },
    PurchaseDialog: function PurchaseDialog() {
      return __webpack_require__.e(/*! import() */ 11).then(__webpack_require__.bind(null, /*! ../../dialogs/selling/Purchase.vue */ "./resources/js/components/dialogs/selling/Purchase.vue"));
    }
  },
  created: function created() {
    var _this = this;

    window.addEventListener("resize", function () {
      this.$store.commit("setScreenWidth", window.innerWidth);
    }.bind(this));

    if (this.$store.getters.getSettings.saas && this.$store.getters.getSettings.enable_subscription) {
      this.$store.dispatch("fetchPlans");
    }

    window.addEventListener('beforeinstallprompt', function (e) {
      // Stash the event so it can be triggered later.
      _this.$store.commit('setInstallPrompt', e);
    });
    window.addEventListener('appinstalled', function () {
      // Hide the app-provided install promotion
      // Clear the deferredPrompt so it can be garbage collected
      _this.$store.commit('setInstallPrompt', null);
    });
  },
  computed: {
    windowWidth: function windowWidth() {
      return this.$store.getters.getScreenWidth;
    },
    PDialog: {
      get: function get() {
        return this.$store.getters['purchase/getSellingAsset'];
      },
      set: function set(value) {
        this.$store.commit('purchase/setSellingAsset', value);
      }
    }
  },
  data: function data() {
    return {
      rightSidebar: false,
      rightSidebarWidth: 0,
      installButton: false
    };
  },
  methods: {
    hideWindows: function hideWindows() {
      this.$store.commit("setSongMenu", null);
      this.$store.commit("setSongContextMenu", null);
      this.$store.commit("setSearchResultsPanel", false);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/layout/Navbar.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/layout/Navbar.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _elements_PlayerSearchbar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../elements/PlayerSearchbar */ "./resources/js/components/elements/PlayerSearchbar.vue");
/* harmony import */ var _notifications_Index_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../notifications/Index.vue */ "./resources/js/components/notifications/Index.vue");
/* harmony import */ var _elements_User_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../elements/User.vue */ "./resources/js/components/elements/User.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    NotificationsBox: _notifications_Index_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    User: _elements_User_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    PlayerSearchbar: _elements_PlayerSearchbar__WEBPACK_IMPORTED_MODULE_0__["default"],
    // SubButton: () => import('../../elements/single-items/SubButton'),
    ChatComponent: function ChatComponent() {
      return __webpack_require__.e(/*! import() */ 12).then(__webpack_require__.bind(null, /*! ../chat/Chat */ "./resources/js/components/player/chat/Chat.vue"));
    },
    Cart: function Cart() {
      return __webpack_require__.e(/*! import() */ 9).then(__webpack_require__.bind(null, /*! ../../dialogs/selling/Cart.vue */ "./resources/js/components/dialogs/selling/Cart.vue"));
    }
  },
  data: function data() {
    return {
      userMenu: false,
      showing: null,
      openChatEventFriend: null,
      unreadMessages: 0,
      showSearchBar: false,
      chatMenu: false
    };
  },
  computed: {
    user: function user() {
      return this.$store.getters.getUser;
    },
    notifications: function notifications() {
      return this.$store.getters.getNotifications;
    },
    isThereUnreadNotifications: function isThereUnreadNotifications() {
      return this.notifications && this.notifications.length && this.notifications.filter(function (not) {
        return not.read_at;
      }).length < this.notifications.length;
    },
    openChatEvent: function openChatEvent() {
      return this.$store.getters.getOpenChatWith;
    }
  },
  watch: {
    openChatEvent: function openChatEvent() {
      this.showing = "chat";
      this.chatMenu = true;
      this.openChatEventFriend = this.openChatEvent;
    }
  },
  methods: {
    show: function show(whatToShow) {
      if (this.showing == whatToShow) {
        this.showing = null;
      } else {
        this.showing = whatToShow;

        if (whatToShow == "chat") {
          this.unreadMessages = 0;
        }
      }
    },
    deleteNotification: function deleteNotification(not_id) {
      this.notifications.splice(not_id, 1);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/layout/RightSidebar.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/layout/RightSidebar.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dialogs_ContactUs_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../dialogs/ContactUs.vue */ "./resources/js/components/dialogs/ContactUs.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    ContactUs: _dialogs_ContactUs_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    FriendList: function FriendList() {
      return Promise.all(/*! import() */[__webpack_require__.e(22), __webpack_require__.e(16)]).then(__webpack_require__.bind(null, /*! ../chat/FriendList.vue */ "./resources/js/components/player/chat/FriendList.vue"));
    }
  },
  created: function created() {
    this.fetchHighlights();
    this.fetchPages();
  },
  methods: {
    fetchHighlights: function fetchHighlights() {
      var _this = this;

      axios.get("/api/highlights").then(function (res) {
        _this.highlights = res.data; // this.$store.dispatch('updateQueue', { content: [this.highlights[0]], force: false })
      });
    },
    fetchPages: function fetchPages() {
      var _this2 = this;

      axios.get('/api/pages').then(function (res) {
        _this2.pages = res.data;
      });
    }
  },
  data: function data() {
    return {
      aboutUsDialog: false,
      contactUsDialog: false,
      highlights: [],
      pages: []
    };
  },
  computed: {
    hideRightSidebar: function hideRightSidebar() {
      return this.$store.getters.getSettings.hideRightSidebar;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/layout/Sidebar.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/layout/Sidebar.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_Loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../services/Loader */ "./resources/js/services/Loader.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  props: ["installButton"],
  components: {
    player: function player() {
      return Promise.all(/*! import() */[__webpack_require__.e(4), __webpack_require__.e(1), __webpack_require__.e(5)]).then(__webpack_require__.bind(null, /*! ../audio-player/Index.vue */ "./resources/js/components/player/audio-player/Index.vue"));
    }
  },
  created: function created() {
    var _this = this;

    axios.get("/api/navigation-items").then(function (res) {
      return _this.items = res.data;
    });

    if (this.$store.getters.getSettings.youtubePlugin) {
      var loader = new _services_Loader__WEBPACK_IMPORTED_MODULE_0__["default"]();

      if (this.$store.getters.getSettings.allowVideos) {
        loader.loadAsset("https://www.youtube.com/iframe_api");
        return;
      }
    }
  },
  data: function data() {
    return {
      items: []
    };
  },
  methods: {
    navigate: function navigate(path) {
      if (path.match(/\./)) {
        window.open(path, "_self");
      } else {
        this.$router.push({
          path: path
        });
      }
    },
    showInstallationPrompt: function showInstallationPrompt() {
      // localStorage.getItem('deferredPrompt').prompt();
      this.$store.getters.getInstallPrompt.prompt(); // // Wait for the user to respond to the prompt
      // const { outcome } = await deferredPrompt.userChoice;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/AccountSettings.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/pages/AccountSettings.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _data_coutries__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../data/coutries */ "./resources/js/data/coutries.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  created: function created() {// this.fetchLanguages();
  },
  data: function data() {
    return {
      user: JSON.parse(JSON.stringify(this.$store.getters.getUser)),
      requestArtistDialog: false,
      status: "Submit",
      isLoading: false,
      artistAccount: {
        email: this.$store.getters.getUser.email
      },
      flagsPath: "/storage/defaults/icons/flags/",
      supportedLanguages: [],
      countriesList: _data_coutries__WEBPACK_IMPORTED_MODULE_0__["default"]
    };
  },
  mounted: function mounted() {
    console.log($store.getters.getSettings);
  },
  methods: {
    fetchLanguages: function fetchLanguages() {
      var _this = this;

      axios.get("/api/languages").then(function (res) {
        _this.supportedLanguages = res.data;
      });
    },
    imageReady: function imageReady(e, who) {
      if (who === "artist") {
        this.artistAccount.avatar = e;
      } else {
        this.user.avatar = e;
      }
    },
    cancelSubscription: function cancelSubscription() {
      var _this2 = this;

      this.$confirm({
        auth: true,
        message: "".concat(this.$t("Are you sure you wanna cancel your subscription?")),
        button: {
          no: this.$t("No"),
          yes: this.$t("Yes")
        },

        /**
         * Callback Function
         * @param {Boolean} confirm
         */
        callback: function callback(confirm, password) {
          if (confirm) {
            axios.post("/api/user/cancel-subscritpion", {
              subscription_id: _this2.$store.getters.getUser.subscription.id,
              password: password
            }).then(function () {
              _this2.$notify({
                group: "foo",
                type: "success",
                title: _this2.$t("Deleted"),
                text: _this2.$t("Subscription") + " " + _this2.$t("Deleted") + "."
              });

              setTimeout(function () {
                location.reload();
              }, 800);
            })["catch"](function (e) {
              if (e.response.data.message) {
                _this2.$notify({
                  group: "foo",
                  type: "error",
                  title: _this2.$t("Error"),
                  text: e.response.data.message
                });
              }
            });
          }
        }
      });
    },
    saveChanges: function saveChanges() {
      var _this3 = this;

      this.isLoading = true;

      if ((this.confirmPassword || this.newPassword) && this.confirmPassword !== this.newPassword) {
        this.$notify({
          group: "foo",
          type: "error",
          title: this.$t("Error"),
          text: this.$t("Confirm password does not match.")
        });
        this.isLoading = false;
        return;
      }

      var formData = new FormData();
      formData.append("id", this.user.id);
      formData.append("name", this.user.name);
      formData.append("lang", this.user.lang);
      formData.append("currentPassword", this.user.currentPassword || 0);
      formData.append("newPassword", this.user.newPassword || 0);
      formData.append("hide_activity", this.user.hide_activity || 0);
      formData.append("avatar", this.user.avatar);

      if (this.user.avatar && this.user.avatar.data) {
        formData.append("avatar", this.user.avatar.data, this.user.avatar.title);
      }

      axios.post("/api/user/save-account-settings", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(function () {
        _this3.$notify({
          group: "foo",
          type: "success",
          title: _this3.$t("Success"),
          text: _this3.$t("Account Settings") + " " + _this3.$t("updated successfully.")
        });

        setTimeout(function () {
          location.reload();
        }, 800);
      })["catch"](function (e) {
        _this3.$notify({
          group: "foo",
          type: "error",
          title: _this3.$t("Error"),
          text: Object.values(e.response.data.errors).join("<br />")
        });
      })["finally"](function () {
        return _this3.isLoading = false;
      });
    },
    submitArtistAccount: function submitArtistAccount() {
      var _this4 = this;

      var formData = new FormData();
      this.isLoading = true;
      formData.append("firstname", this.artistAccount.firstname || "");
      formData.append("lastname", this.artistAccount.lastname || "");
      formData.append("country", this.artistAccount.country || "");
      formData.append("phone", this.artistAccount.phone || "");
      formData.append("email", this.artistAccount.email || "");
      formData.append("address", this.artistAccount.address || "");
      formData.append("spotify_link", this.artistAccount.spotify_link || "");
      formData.append("youtube_link", this.artistAccount.youtube_link || "");
      formData.append("soundcloud_link", this.artistAccount.soundcloud_link || "");
      formData.append("itunes_link", this.artistAccount.itunes_link || "");
      formData.append("displayname", this.artistAccount.displayname || "");

      if (this.artistAccount.avatar && this.artistAccount.avatar.data) {
        formData.append("avatar", this.artistAccount.avatar.data, this.artistAccount.avatar.title);
      } else {
        formData.append("avatar", "/storage/defaults/images/artist_avatar.png");
      }

      axios.post("/api/user/request-artist-account", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(function () {
        _this4.status = "requested";
        _this4.isLoading = false;
        _this4.requestArtistDialog = false;
        _this4.$store.getters.getUser.requested_artist_account = 1;

        _this4.$notify({
          group: "foo",
          type: "success",
          title: _this4.$t("Requested"),
          text: _this4.$t("Request submitted to admins successfully.")
        });

        setTimeout(function () {
          location.reload();
        }, 800);
      })["catch"](function (e) {
        _this4.isLoading = false;

        _this4.$notify({
          group: "foo",
          type: "error",
          title: _this4.$t("Error"),
          text: Object.values(e.response.data.errors).join("<br />")
        });
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/Album.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/pages/Album.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _elements_other_ProductBtn_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../elements/other/ProductBtn.vue */ "./resources/js/components/elements/other/ProductBtn.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  metaInfo: function metaInfo() {
    return {
      // title: this.generateMetaInfos(
      //     this.album,
      //     this.$store.getters.getSettings.albumPageTitle,
      //     "album"
      // ),
      meta: [// {
      //     name: "description",
      //     content: this.generateMetaInfos(
      //         this.album,
      //         this.$store.getters.getSettings.albumPageDescription,
      //         "album"
      //     )
      // },
      {
        property: 'og:title',
        content: this.album.title
      }, {
        property: 'og:description',
        content: this.album.description
      }, {
        property: 'og:image',
        content: this.album.cover
      }, {
        property: 'og:image:width',
        content: '300'
      }, {
        property: 'og:image:height',
        content: '300'
      }]
    };
  },
  created: function created() {
    this.fetchAlbum();
  },
  data: function data() {
    return {
      album: {},
      errorStatus: null
    };
  },
  components: {
    ProductBtn: _elements_other_ProductBtn_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  computed: {
    isLiked: function isLiked() {
      var _this = this;

      return (this.$store.getters.getLikedAlbums || []).some(function (album) {
        return album.id === _this.album.id;
      });
    }
  },
  methods: {
    fetchAlbum: function fetchAlbum() {
      var _this2 = this;

      axios.get("/api/album/" + this.$route.params.id).then(function (res) {
        return _this2.album = res.data;
      })["catch"](function (e) {
        return _this2.errorStatus = e.response.status;
      });
    },
    likeAlbum: function likeAlbum() {
      if (!this.isLiked) {
        this.$store.dispatch("like", {
          type: "album",
          id: this.album.id,
          origin: this.album.origin
        })["catch"](function () {});
      } else {
        this.$store.dispatch("dislike", {
          type: "album",
          id: this.album.id,
          origin: this.album.origin
        })["catch"](function () {});
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/Artist.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/pages/Artist.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _elements_sections_SwiperSection_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../elements/sections/SwiperSection.vue */ "./resources/js/components/elements/sections/SwiperSection.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    SwiperSection: _elements_sections_SwiperSection_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  metaInfo: function metaInfo() {
    return {
      title: this.title.slice(0, 1).toUpperCase() + this.title.slice(1, this.title.length),
      meta: [{
        name: "description",
        content: this.description.slice(0, 1).toUpperCase() + this.description.slice(1, this.description.length)
      }]
    };
  },
  data: function data() {
    return {
      artist: null,
      isFollowed: null,
      nPopular: 5,
      nSingles: 5,
      errorStatus: null,
      albumsSwiperBreakpoints: {
        1500: {
          slidesPerView: 5,
          slidesPerGroup: 5,
          spaceBetweenSlides: 20
        },
        1230: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          spaceBetweenSlides: 20
        },
        1050: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetweenSlides: 10
        },
        500: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetweenSlides: 10
        }
      }
    };
  },
  computed: {
    popularSpliced: function popularSpliced() {
      if (this.artist.top_tracks !== 5) {
        return this.artist.top_tracks.slice(0, this.nPopular);
      } else {
        return this.artist.top_tracks;
      }
    },
    singlesSpliced: function singlesSpliced() {
      if (this.artist.songs !== 5) {
        return this.artist.songs.slice(0, this.nSingles);
      } else {
        return this.artist.songs;
      }
    },
    title: function title() {
      if (this.artist) {
        return this.$store.getters.getSettings.artistPageTitle.replace("%site_name", this.$store.getters.getSettings.appName).replace("%artist_name", this.artist.displayname).replace("%creation_date", this.moment(this.artist.created_at).format("ll")).replace(/(—|-)\W+/, function (c) {
          if (c.length >= 3) return c.replace(/(—|-)/, "");else return c;
        });
      } else {
        return '';
      }
    },
    description: function description() {
      if (this.artist) {
        return this.$store.getters.getSettings.artistPageDescription.replace("%site_name", this.$store.getters.getSettings.appName).replace("%artist_name", this.artist.displayname).replace("%creation_date", this.moment(this.artist.created_at).format("ll")).replace(/(—|-)\W+/, function (c) {
          if (c.length >= 3) return c.replace(/(—|-)/, "");else return c;
        });
      } else {
        return '';
      }
    }
  },
  created: function created() {
    var _this = this;

    axios.get("/api/artist/" + this.$route.params.id).then(function (res) {
      return _this.artist = res.data;
    }).then(function () {
      _this.$store.dispatch("isArtistFollowed", _this.artist.id).then(function (res) {
        return _this.isFollowed = res;
      });
    })["catch"](function (e) {
      return _this.errorStatus = e.response.status;
    });
  },
  methods: {
    follow: function follow() {
      var _this2 = this;

      if (this.isFollowed) {
        this.$store.dispatch("unfollow", this.artist).then(function () {
          _this2.isFollowed = false;
          _this2.artist.nb_followers--;
        })["catch"](function () {});
      } else {
        this.$store.dispatch("follow", this.artist).then(function () {
          _this2.isFollowed = true;
          _this2.artist.nb_followers++;
        })["catch"](function () {});
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/CustomPage.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/pages/CustomPage.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _elements_sections_layouts_Featured_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../elements/sections/layouts/Featured.vue */ "./resources/js/components/elements/sections/layouts/Featured.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    Featured: _elements_sections_layouts_Featured_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  metaInfo: function metaInfo() {
    return {
      title: this.page ? this.page.title : document.title,
      meta: [{
        name: "description",
        content: this.page ? this.page.description : ""
      } // {
      //     property: 'og:url',
      //     content: 'https://www.youtube.com/watch?v=qKsRCu4cYsI'
      // },
      // {
      //     property: 'og:site_name',
      //     content: 'http://muzzie.com'
      // },
      // {
      //     property: 'og:description',
      //     content: 'some description here'
      // },
      // {
      //     property: 'og:image',
      //     content: 'https://mediadesknm.com/wp-content/uploads/2018/09/photographer-698908_960_720-864x576.jpg'
      // },
      // {
      //     property: 'og:image:width',
      //     content: '300'
      // },
      // {
      //     property: 'og:image:height',
      //     content: '300'
      // }
      ]
    };
  },
  data: function data() {
    return {
      page: null,
      loading: true,
      contentLength: 0
    };
  },
  created: function created() {
    var _this = this;

    if (this.$route.path === "/charts") {
      this.$router.push({
        path: "/not-found"
      });
    } else {
      axios.get("/api/page?path=" + this.$route.path).then(function (res) {
        _this.page = res.data;

        if (_this.page.sections) {
          _this.contentLength = _this.page.sections.length;
        }
      })["catch"](function () {
        return _this.page = "404";
      });
    }
  },
  methods: {
    showShare: function showShare() {
      window.open("https://www.facebook.com/sharer/sharer.php?u=" + window.location.href, "facebook-share-dialog", "width=800,height=600");
      return false;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/Playlist.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/pages/Playlist.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _elements_lists_playlistSongs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../elements/lists/playlistSongs */ "./resources/js/components/elements/lists/playlistSongs.vue");
/* harmony import */ var _dialogs_EditPlaylist__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../dialogs/EditPlaylist */ "./resources/js/components/dialogs/EditPlaylist.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  metaInfo: function metaInfo() {
    return {
      title: this.generateMetaInfos(this.playlist, this.$store.getters.getSettings.playlistPageTitle, "playlist"),
      meta: [{
        name: "description",
        content: this.generateMetaInfos(this.playlist, this.$store.getters.getSettings.playlistPageDescription, "playlist")
      }]
    };
  },
  components: {
    playlistSongList: _elements_lists_playlistSongs__WEBPACK_IMPORTED_MODULE_0__["default"],
    EditPlaylist: _dialogs_EditPlaylist__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  created: function created() {
    this.fetchPlaylist();
  },
  data: function data() {
    return {
      playlist: null,
      showMenu: false,
      editPlaylist: false,
      errorStatus: null
    };
  },
  computed: {
    isFollowed: function isFollowed() {
      var _this = this;

      return (this.$store.getters.getFollowedPlaylists || []).some(function (playlist) {
        return playlist.id === _this.playlist.id;
      });
    }
  },
  methods: {
    spliceSong: function spliceSong(song_id) {
      this.playlist.songs.splice(this.playlist.songs.findIndex(function (song) {
        return song.id === song_id;
      }), 1);
    },
    fetchPlaylist: function fetchPlaylist() {
      var _this2 = this;

      axios.get("/api/playlist/" + this.$route.params.id).then(function (res) {
        return _this2.playlist = res.data;
      })["catch"](function (e) {
        _this2.errorStatus = e.response.status;
      });
    },
    followPlaylist: function followPlaylist() {
      if (this.isFollowed) {
        this.$store.dispatch("unfollow", this.playlist).then(function () {// this.isFollowed = false;
        })["catch"](function () {});
      } else {
        this.$store.dispatch("follow", this.playlist).then(function () {// this.isFollowed = true;
        })["catch"](function () {});
      }
    },
    playlistUpdated: function playlistUpdated() {
      this.editPlaylist = false;
      this.fetchPlaylist();
    },
    deletePlaylist: function deletePlaylist() {
      var _this3 = this;

      this.$store.dispatch("delete_user_playlist", this.playlist.id).then(function (res) {
        _this3.$notify({
          group: "foo",
          type: "success",
          title: _this3.$t("Deleted"),
          text: _this3.$t("Playlist") + " " + _this3.$t("deleted successfully.")
        });

        _this3.showMenu = false;

        _this3.$router.push({
          name: "library.playlists"
        });
      })["catch"](function () {
        _this3.$notify({
          group: "foo",
          type: "danger",
          title: _this3.$t("Oops!"),
          text: _this3.$t("Something went wrong. Please try again.")
        });
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/Podcast.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/pages/Podcast.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  metaInfo: function metaInfo() {
    return {
      title: this.generateMetaInfos(this.podcast, this.$store.getters.getSettings.podcastPageTitle, "podcast"),
      meta: [{
        name: "description",
        content: this.generateMetaInfos(this.podcast, this.$store.getters.getSettings.podcastPageDescription, "podcast")
      }]
    };
  },
  data: function data() {
    return {
      podcast: null,
      isFollowed: null,
      errorStatus: null
    };
  },
  created: function created() {
    var _this = this;

    axios.get("/api/podcast/" + this.$route.params.id).then(function (res) {
      _this.podcast = res.data;

      if (_this.$route.query.episode) {
        var episode = _this.podcast.episodes.find(function (ep) {
          return ep.id == _this.$route.query.episode;
        });

        _this.$store.dispatch("playEpisode", {
          episode: episode,
          reset: true
        });
      }
    })["catch"](function (e) {
      return _this.errorStatus = e.response.status;
    });
  },
  methods: {
    shareEpisode: function shareEpisode(episode) {
      var appUrl = this.$store.getters.getSettings.appUrl;
      this.$store.commit("shareItem", {
        cover: this.podcast.cover,
        url: appUrl + (appUrl.substring(appUrl.length - 1) === "/" ? 'podcast' + "/" : "/" + 'podcast' + "/") + this.podcast.id + '?episode=' + episode.id,
        title: episode.title,
        type: 'episode',
        artist: this.getMainArtist(this.podcast)
      });
    },
    formatEpisodeDate: function formatEpisodeDate(date) {
      return moment__WEBPACK_IMPORTED_MODULE_0___default()(date).fromNow().match(/year/) ? moment__WEBPACK_IMPORTED_MODULE_0___default()(date).format("MMM YYYY") : moment__WEBPACK_IMPORTED_MODULE_0___default()(date).format("DD MMM");
    },
    formatEpisodeDuration: function formatEpisodeDuration(secs) {
      var minutes = Math.floor(secs / 60);
      secs = secs % 60;
      return minutes + " min" + " " + secs + " secs";
    } // follow() {
    //     if (this.isFollowed) {
    //         this.$store
    //             .dispatch("unfollowPodcast", this.podcast.id)
    //             .then(() => {
    //                 this.isFollowed = false;
    //             })
    //             .catch(() => {});
    //     } else {
    //         this.$store
    //             .dispatch("followPodcast", this.podcast.id)
    //             .then(() => {
    //                 this.isFollowed = true;
    //             })
    //             .catch(() => {});
    //     }
    // }

  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/Song.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/pages/Song.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _elements_other_ProductBtn_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../elements/other/ProductBtn.vue */ "./resources/js/components/elements/other/ProductBtn.vue");


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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    PurchaseButton: _elements_other_ProductBtn_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  metaInfo: function metaInfo() {
    return {
      title: this.generateMetaInfos(this.song, this.$store.getters.getSettings.songPageTitle, "song"),
      meta: [{
        name: "description",
        content: this.generateMetaInfos(this.song, this.$store.getters.getSettings.songPageDescription, "song")
      }]
    };
  },
  created: function created() {
    var _this = this;

    axios.get("/api/song/" + this.$route.params.id).then(function (res) {
      _this.song = res.data;
      axios.get("/api/more-from-album?id=" + _this.song.id + "&origin=" + _this.song.origin).then(function (res) {
        return _this.moreFromAlbum = res.data.filter(function (song) {
          return song.id !== _this.song.id;
        });
      });
      axios.get("/api/more-from-artist?id=" + _this.song.id + "&origin=" + _this.song.origin).then(function (res) {
        return _this.moreFromArtists = res.data.filter(function (song) {
          return song.id !== _this.song.id;
        });
      });

      if (_this.song.genres.length) {
        axios.get("/api/more-from-genre/" + _this.song.genres[0].id).then(function (res) {
          return _this.moreFromGenre = res.data.filter(function (song) {
            return song.id !== _this.song.id;
          });
        });
      }
    })["catch"](function (e) {
      if (e.response.status === 404) {
        _this.errorStatus = 404;
      } else {
        _this.errorStatus = 500;
      }
    });
  },
  computed: {
    isLiked: function isLiked() {
      var _this2 = this;

      if (this.song) {
        return (this.$store.getters.getLikedSongs || []).some(function (x) {
          return x.id == _this2.song.id;
        });
      }
    }
  },
  data: function data() {
    return {
      song: null,
      moreFromArtists: null,
      moreFromAlbum: null,
      moreFromGenre: null,
      allowedToWrite: null,
      errorStatus: null
    };
  },
  methods: {
    share: function share() {
      this.$store.commit("shareItem", {
        cover: this.song.cover,
        url: this.getItemURL(this.song),
        title: this.song.title,
        type: this.song.type,
        artist: this.getMainArtist(this.song)
      });
    },
    deleteSong: function deleteSong() {
      var _this3 = this;

      this.$confirm({
        message: "".concat(this.$t("Are you sure you wanna delete this") + " " + this.$t("Song") + "?"),
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
            _this3.$store.dispatch("delete_user_song", _this3.song.id).then(function (res) {
              _this3.$notify({
                group: "foo",
                type: "success",
                title: _this3.$t("Song Deleted"),
                text: _this3.song.title + " " + _this3.$t("has been deleted successfully.")
              });

              _this3.$router.push("/library/my-songs");
            });
          }
        }
      });
    },
    like: function like(song) {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (_this4.isLiked) {
                  _this4.$store.dispatch("dislike", song);
                } else {
                  _this4.$store.dispatch("like", song);
                }

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/UserProfile.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/pages/UserProfile.vue?vue&type=script&lang=js& ***!
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  metaInfo: function metaInfo() {
    return {
      title: this.generateMetaInfos(this.user, this.$store.getters.getSettings.userProfilePageTitle, "user"),
      meta: [{
        name: "description",
        content: this.generateMetaInfos(this.user, this.$store.getters.getSettings.userProfilePageDescription, "user")
      }]
    };
  },
  created: function created() {
    this.fetchUserProfile();
  },
  data: function data() {
    return {
      user: null,
      friendStatus: null,
      nLikes: 3,
      nMostPlayed: 3,
      errorStatus: null
    };
  },
  computed: {
    LikesSpliced: function LikesSpliced() {
      if (this.user.likes !== 3) {
        return this.user.likes.slice(0, this.nLikes);
      } else {
        return this.user.likes;
      }
    },
    mostPlayedSpliced: function mostPlayedSpliced() {
      if (this.user.mostPlayed !== 3) {
        return this.user.mostPlayed.slice(0, this.nMostPlayed);
      } else {
        return this.user.mostPlayed;
      }
    }
  },
  methods: {
    addFriend: function addFriend(user_id) {
      var _this = this;

      if (this.friendStatus == "friends") {
        this.$confirm({
          message: "".concat(this.$t("Are you sure you wanna unfriend"), "  ").concat(this.user.name, "?"),
          button: {
            no: this.$t("Cancel"),
            yes: this.$t("Yes")
          },

          /**
           * Callback Function
           * @param {Boolean} confirm
           */
          callback: function callback(confirm) {
            if (confirm) {
              _this.friendStatus = "notFriends";

              _this.$store.dispatch("removeFriend", user_id).then(function () {
                _this.$notify({
                  group: "foo",
                  type: "success",
                  title: _this.$t("Removed"),
                  text: _this.$t('Friend removed successfully.')
                });
              });
            }
          }
        });
      } else if (this.friendStatus == "notFriends") {
        this.friendStatus = "requested";
        this.$store.dispatch("addFriend", user_id).then(function () {
          _this.$notify({
            group: "foo",
            type: "success",
            title: _this.$t("Requested"),
            text: _this.$t('Friend Request sent successfully.')
          });
        });
      }
    },
    fetchUserProfile: function fetchUserProfile() {
      var _this2 = this;

      axios.get("/api/profile/" + this.$route.params.id).then(function (res) {
        return _this2.user = res.data;
      }).then(function () {
        _this2.$store.dispatch("checkFriendStatus", _this2.$route.params.id).then(function (res) {
          return _this2.friendStatus = res;
        });
      })["catch"](function (e) {
        return _this2.errorStatus = e.response.status;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/elements/PlayerSearchbar.vue?vue&type=style&index=0&id=4d9d709d&lang=scss&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/elements/PlayerSearchbar.vue?vue&type=style&index=0&id=4d9d709d&lang=scss&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".searchbar-wrapper[data-v-4d9d709d] {\n  position: relative;\n  width: 24em;\n  margin-right: 1em;\n}\n@media screen and (max-width: 700px) {\n.searchbar-wrapper[data-v-4d9d709d] {\n    width: 23em;\n}\n}\n@media screen and (max-width: 700px) {\n.searchbar-wrapper[data-v-4d9d709d] {\n    margin-right: 0em;\n}\n}\n.searchbar-wrapper .search-panel[data-v-4d9d709d] {\n  position: absolute;\n  top: 110%;\n  background-color: var(--light-theme-bg-color);\n  border-radius: 6px;\n  width: 100%;\n  z-index: 999;\n  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);\n}\n.searchbar[data-v-4d9d709d] {\n  position: relative;\n  transition: all 0.5s;\n  font-size: 1.05rem;\n  border-radius: 8px;\n  background-color: #e2e2e2;\n}\n.searchbar input[data-v-4d9d709d] {\n  border: none;\n  font-weight: bold;\n  padding: 0.2rem 2.3rem;\n  width: 100%;\n  color: black;\n  border-radius: 8px;\n}\n.searchbar .style-search-icon[data-v-4d9d709d] {\n  position: absolute;\n  left: 0.5rem;\n  width: 1.15rem;\n  top: 50%;\n  transform: translateY(-50%);\n}\n.searchbar .searchbar-bottom-nav[data-v-4d9d709d] {\n  overflow-x: auto;\n  overflow-y: hidden;\n  justify-content: flex-start;\n}\n.searchbar-wrapper .v-item-group.v-bottom-navigation[data-v-4d9d709d] {\n  bottom: 0;\n  display: flex;\n  left: 0;\n  width: 100%;\n  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);\n}\n.searchbar-wrapper .v-item-group.v-bottom-navigation[data-v-4d9d709d]::-webkit-scrollbar {\n  width: 7px;\n  height: 7px;\n  transform: translateX(-50px);\n}\n.searchbar-wrapper .v-item-group.v-bottom-navigation .v-btn[data-v-4d9d709d] {\n  border-radius: 0 !important;\n  box-shadow: none !important;\n  font-size: 0.6rem !important;\n  height: inherit !important;\n  max-width: 168px !important;\n  min-width: 50px !important;\n  position: relative !important;\n  text-transform: none !important;\n}\n.search-panel .search-results-container[data-v-4d9d709d] {\n  max-height: 400px;\n  overflow-y: auto;\n  padding: 0.6em 0.5em;\n}\n.search-panel .search-results-container .search-result[data-v-4d9d709d] {\n  border-radius: 10px;\n  transition: background-color 0.5s;\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n}\n.search-panel .search-results-container .search-result[data-v-4d9d709d]:hover {\n  background-color: rgba(201, 201, 201, 0.308);\n}\n.search-panel .search-results-container .search-result .cover[data-v-4d9d709d] {\n  padding: 0.5em;\n}\n.search-panel .search-results-container .search-result .cover > *[data-v-4d9d709d] {\n  border-radius: 7px;\n}\n.search-panel .search-results-container .search-result .body[data-v-4d9d709d] {\n  color: var(--light-theme-text-color);\n}\n.search-panel .search-results-container .search-result .body .asset-title[data-v-4d9d709d] {\n  font-weight: 600;\n  font-size: 0.95em !important;\n}\n.search-panel .search-results-container .search-result .body .asset-artists[data-v-4d9d709d] {\n  font-size: 0.8em !important;\n  opacity: 0.85;\n}\n.search-panel .search-results-container .search-category .category-title[data-v-4d9d709d] {\n  color: #4c60a3;\n  font-size: 0.9rem;\n  font-weight: bold;\n  padding-left: 0.5rem;\n  padding-top: 0.6rem;\n}\n.search-panel .search-results-container .search-category .category-results[data-v-4d9d709d] {\n  padding: 0.5em 0 0.5em 0.9em;\n}\n.player--dark .searchbar-wrapper .search-panel[data-v-4d9d709d] {\n  box-shadow: none;\n  background-color: var(--dark-theme-panel-bg-color);\n}\n.player--dark .searchbar-wrapper .search-panel .search-results-container .search-result .body[data-v-4d9d709d] {\n  color: var(--dark-theme-text-color);\n}\n.player--dark .searchbar-wrapper .search-panel .search-results-container .search-category .category-title[data-v-4d9d709d] {\n  color: #4c60a3;\n}\n.player--dark .searchbar[data-v-4d9d709d] {\n  background-color: #eeeeee;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/ShareLinks.vue?vue&type=style&index=0&id=1e8af86d&lang=scss&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/ShareLinks.vue?vue&type=style&index=0&id=1e8af86d&lang=scss&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "a[class^=share-network-][data-v-1e8af86d] {\n  flex: none;\n  color: #ffffff;\n  background-color: #333;\n  border-radius: 3px;\n  overflow: hidden;\n  display: flex;\n  flex-direction: row;\n  align-content: center;\n  align-items: center;\n  cursor: pointer;\n  padding-right: 0.4em;\n  margin: 0 10px 10px 0;\n  text-decoration: none;\n}\n@media (max-width: 700px) {\na[class^=share-network-][data-v-1e8af86d] {\n    padding-right: 0;\n}\n}\n.share-network-icon[data-v-1e8af86d] {\n  background-color: rgba(0, 0, 0, 0.2);\n  padding: 7px;\n  flex: 0 1 auto;\n}\n@media (max-width: 700px) {\n.share-network-icon[data-v-1e8af86d] {\n    margin-right: 0 !important;\n}\n}\n@media (max-width: 700px) {\n.share-network-text[data-v-1e8af86d] {\n    display: none;\n}\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/layout/Master.vue?vue&type=style&index=0&lang=scss&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/layout/Master.vue?vue&type=style&index=0&lang=scss& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#right-sidebar-container {\n  transition: transform 0.5s;\n  padding: 5em 0.5em 5em 0.5em;\n  display: flex;\n  min-height: 100vh;\n  width: 19em;\n  height: 100%;\n  flex-direction: column;\n  background-color: var(--light-theme-panel-bg-color);\n  border-left: 1px solid rgba(206, 206, 206, 0.13);\n}\n#right-sidebar-container .right-sidebar-toggle {\n  position: -webkit-sticky;\n  position: sticky;\n  padding: 0.5em;\n  background: var(--light-theme-panel-bg-color);\n  border: 1px solid var(--color-primary);\n  /* border: 1px solid grey; */\n  border-radius: 3px;\n  width: 2em;\n  transform: translateX(-37px);\n  top: 120px;\n  z-index: -1;\n}\n@media screen and (min-width: 900px) {\n#right-sidebar-container .right-sidebar-toggle {\n    display: none;\n}\n}\n@media screen and (max-width: 900px) {\n#right-sidebar-container {\n    position: absolute;\n    right: 0;\n    z-index: 55;\n}\n}\n#right-sidebar-container .friends-container {\n  position: relative;\n  min-width: 17em;\n  width: 100%;\n}\n#right-sidebar-container .friends-container__title {\n  font-weight: bold;\n  font-size: 1.2em;\n  padding: 0.5em;\n}\n#right-sidebar-container .friends-container__main {\n  background-color: var(--light-theme-bg-color);\n}\n#right-sidebar-container .friends-container .friends-list {\n  padding: 0 0.3em;\n  cursor: pointer;\n}\n#right-sidebar-container .friends-container .friends-list ul {\n  list-style: none;\n}\n#right-sidebar-container .friends-container .friends-list ul li {\n  padding: 0.5rem 0.3rem;\n  border-radius: 25px;\n}\n#right-sidebar-container .friends-container .friends-list ul li .top-side {\n  display: flex;\n}\n#right-sidebar-container .friends-container .friends-list ul li .top-side .avatar {\n  margin-right: 1rem;\n  position: relative;\n}\n#right-sidebar-container .friends-container .friends-list ul li .top-side .avatar img {\n  border-radius: 50%;\n  width: 3em;\n}\n#right-sidebar-container .friends-container .friends-list ul li .top-side .avatar .status {\n  border-radius: 50%;\n  height: 0.65em;\n  width: 0.65em;\n  position: absolute;\n  right: 5px;\n  bottom: 6px;\n}\n#right-sidebar-container .friends-container .friends-list ul li .top-side .avatar .status-online {\n  background-color: #23a823;\n}\n#right-sidebar-container .friends-container .friends-list ul li .top-side .avatar .status-offline {\n  background-color: #afafaf;\n}\n#right-sidebar-container .friends-container .friends-list ul li .top-side .infos {\n  flex-grow: 2;\n}\n#right-sidebar-container .friends-container .friends-list ul li .top-side .infos .name-container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding-right: 2em;\n  position: relative;\n}\n#right-sidebar-container .friends-container .friends-list ul li .top-side .infos .name-container .name {\n  color: var(--light-theme-text-color);\n  margin-right: 1em;\n  max-width: 150px;\n}\n#right-sidebar-container .friends-container .friends-list ul li .top-side .infos .activity-container {\n  overflow-x: hidden;\n  position: relative;\n  padding-right: 0.5em;\n  max-width: 150px;\n}\n#right-sidebar-container .friends-container .friends-list ul li .top-side .infos .activity-container .hiding-box-left {\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  width: 15px;\n  background-image: linear-gradient(to right, var(--light-theme-bg-color) 0%, transparent 100%);\n}\n#right-sidebar-container .friends-container .friends-list ul li .top-side .infos .activity-container .hiding-box-right {\n  position: absolute;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  width: 15px;\n  background-image: linear-gradient(to left, var(--light-theme-bg-color) 0%, transparent 100%);\n}\n#right-sidebar-container .friends-container .friends-list ul li .top-side .infos .activity-container .activity {\n  font-size: 0.9em;\n  white-space: nowrap;\n  padding: 0.2em 0;\n  width: 100%;\n  -webkit-animation: slide-to-left linear 12s infinite;\n          animation: slide-to-left linear 12s infinite;\n}\n#right-sidebar-container .friends-container .friends-list ul li .bottom-side {\n  max-height: 0;\n  overflow: hidden;\n  transition: max-height 1s ease-out;\n}\n#right-sidebar-container .friends-container .friends-list ul li .bottom-side .options {\n  padding-top: 0.9em;\n  display: flex;\n  padding: 0.2em 0.4em;\n  justify-content: space-around;\n  text-align: center;\n}\n#right-sidebar-container .friends-container .friends-list ul li .bottom-side .options > * {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  border-radius: 10px;\n  cursor: pointer;\n  padding: 0.3em 0.4em;\n}\n#right-sidebar-container .friends-container .friends-list ul li .bottom-side .options > *:hover {\n  background-color: rgba(88, 88, 88, 0.26);\n}\n#right-sidebar-container .friends-container .friends-list ul li .bottom-side .options > button {\n  border: none;\n  background-color: transparent;\n  color: var(--light-theme-text-color);\n}\n#right-sidebar-container .friends-container .friends-list ul li:hover {\n  background-color: rgba(150, 150, 150, 0.05);\n}\n#right-sidebar-container .friends-container .friends-list ul li:hover .bottom-side {\n  max-height: 100px;\n}\n#right-sidebar-container .active {\n  background-color: rgba(107, 107, 107, 0.26);\n}\n@-webkit-keyframes slide-to-left {\n0% {\n    margin-left: 200px;\n}\n25% {\n    margin-left: 100px;\n}\n50% {\n    margin-left: 0;\n}\n75% {\n    margin-left: -100px;\n}\n100% {\n    margin-left: -200px;\n}\n}\n@keyframes slide-to-left {\n0% {\n    margin-left: 200px;\n}\n25% {\n    margin-left: 100px;\n}\n50% {\n    margin-left: 0;\n}\n75% {\n    margin-left: -100px;\n}\n100% {\n    margin-left: -200px;\n}\n}\n#navbar.navbar {\n  position: fixed;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  top: 0;\n  height: 4em;\n  left: 6.5em;\n  padding: 0.2rem 1rem;\n  padding-left: 1em !important;\n  right: 0;\n  z-index: 56;\n  box-shadow: 0px 0px 1px -2px rgba(0, 0, 0, 0.14), 0px 0px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 2px 0px rgba(0, 0, 0, 0.12);\n  background-color: var(--light-theme-bg-color);\n}\n#navbar.navbar .navbar__left-side,\n#navbar.navbar .navbar__right-side {\n  display: flex;\n  align-items: center;\n}\n#navbar.navbar .chevrons {\n  margin-right: 0.5rem;\n  display: flex;\n}\n@media screen and (max-width: 750px) {\n#navbar.navbar .chevrons {\n    margin-right: 1.3em;\n}\n}\n@media screen and (max-width: 600px) {\n#navbar.navbar .chevrons {\n    display: none;\n}\n}\n@media screen and (max-width: 650px) {\n#navbar.navbar .searchbar-container {\n    transition: all 0.5s;\n    position: absolute;\n    left: 0px;\n    right: 0px;\n    display: flex;\n    justify-content: center;\n}\n}\n@media screen and (min-width: 651px) {\n#navbar.navbar .searchbar-container {\n    transform: none !important;\n    opacity: 1 !important;\n    pointer-events: initial !important;\n}\n}\n#navbar.navbar .logo {\n  height: 3em;\n  margin-bottom: 0;\n}\n#navbar.navbar .logo img {\n  height: 75%;\n}\n#navbar.navbar .logo a {\n  height: 100%;\n  display: flex;\n  align-items: center;\n}\n@media screen and (min-width: 600px) {\n#navbar.navbar .logo {\n    display: none;\n}\n}\n@media screen and (max-width: 900px) {\n#navbar.navbar {\n    left: 5.5em;\n}\n#navbar.navbar .icons .friends {\n    display: none;\n}\n#navbar.navbar .register__btn {\n    display: none;\n}\n}\n@media screen and (min-width: 650px) {\n#navbar.navbar {\n    margin-right: auto;\n}\n#navbar.navbar .search-icon {\n    display: none;\n}\n}\n@media (max-width: 600px) {\n#navbar.navbar {\n    left: 0;\n    z-index: 1000;\n    padding: 0 0.3em;\n}\n}\n.player--dark #navbar {\n  background-color: var(--dark-theme-bg-color);\n  border-bottom: 1px solid rgba(206, 206, 206, 0.13);\n}\n.user {\n  display: flex;\n  align-items: center;\n  color: var(--light-theme-text-color);\n}\n.user .upgrade-account {\n  display: flex;\n  align-items: center;\n  margin-right: 1em;\n}\n@media (max-width: 900px) {\n.user .upgrade-account {\n    display: none;\n}\n}\n.user .icons {\n  display: flex;\n  align-items: center;\n}\n.user .icons .icon {\n  cursor: pointer;\n}\n.user .icons .chat {\n  position: relative;\n}\n.user .icons .chat-component {\n  position: absolute;\n  top: 120%;\n  z-index: 11111111;\n  right: -10em;\n}\n@media screen and (max-width: 700px) {\n.user .icons .chat-component {\n    padding: 0 1em;\n    position: fixed;\n    top: 5em;\n    right: 0;\n    left: 0;\n}\n}\n@media screen and (min-width: 900px) {\n.user .icons .friends {\n    display: none;\n}\n}\n.user .icons .svg-image {\n  width: 1.15rem;\n}\n.user .icons .notifications {\n  position: relative;\n}\n.user .icons .notifications-indicator,\n.user .icons .unread-indicator {\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 0.7rem;\n  height: 0.7rem;\n  background-color: red;\n  color: white;\n  border-radius: 50%;\n  font-size: 0.7rem;\n}\n.user .icons .notifications-indicator > *,\n.user .icons .unread-indicator > * {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n.user .account {\n  display: flex;\n  align-items: center;\n  border-radius: 25px;\n  padding: 0.3rem;\n  transition: all 0.4s;\n  position: relative;\n  cursor: pointer;\n}\n.user .account:hover {\n  background-color: rgba(110, 110, 110, 0.226);\n}\n.user .account .avatar {\n  width: 35px;\n  margin-right: 0.3rem;\n}\n.user .account .avatar-image {\n  height: 100%;\n  border-radius: 50%;\n  width: 100%;\n}\n@media screen and (min-width: 900px) {\n.user .account .short-name {\n    display: none;\n}\n}\n@media screen and (max-width: 700px) {\n.user .account .short-name {\n    display: none;\n}\n}\n.user .account .name {\n  max-width: 6em;\n}\n@media screen and (max-width: 900px) {\n.user .account .name {\n    display: none;\n}\n}\n.user .account .chevron {\n  margin-left: 0.5rem;\n}\n.svg-image {\n  fill: white;\n}\n.auth .buttons {\n  display: flex;\n  align-items: center;\n}\n.player--dark .user {\n  color: var(--dark-theme-text-color);\n}\n.panel {\n  min-width: 250px;\n}\n#player-sidebar {\n  width: 6.5em;\n  top: 0;\n  bottom: 0;\n  z-index: 56;\n  position: fixed;\n  display: flex;\n  border-right: 1px solid rgba(206, 206, 206, 0.13);\n  flex-direction: column;\n}\n#player-sidebar div.hl {\n  width: 80%;\n  display: inline-block;\n  height: 1px;\n  background: #383838;\n  margin-bottom: 0.5rem;\n}\n#player-sidebar #sidebar-wrapper {\n  height: 100%;\n}\n@media (max-width: 600px) {\n#player-sidebar #sidebar-wrapper {\n    display: none;\n}\n}\n@media screen and (min-width: 600px) {\n#player-sidebar #bottom-nav {\n    display: none;\n}\n}\n#player-sidebar .v-list-item__title,\n#player-sidebar .v-list-item__subtitle {\n  overflow: initial !important;\n  text-overflow: unset !important;\n  white-space: unset !important;\n  text-align: center !important;\n}\n#player-sidebar .v-list-item__title {\n  font-size: 0.95em !important;\n  font-weight: 600 !important;\n}\n#player-sidebar .logo {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding-top: 0.5em;\n}\n@media screen and (max-width: 600px) {\n#player-sidebar .v-item-group.v-bottom-navigation .v-btn {\n    border-radius: 0 !important;\n    box-shadow: none !important;\n    font-size: 0.6rem !important;\n    height: inherit !important;\n    max-width: 168px !important;\n    min-width: 50px !important;\n    position: relative !important;\n    text-transform: none !important;\n}\n}\n@media screen and (max-width: 900px) {\n#player-sidebar {\n    width: 5.5em;\n}\n}\n@media (max-width: 600px) {\n#player-sidebar {\n    top: unset;\n    left: 0;\n    right: 0;\n    width: unset !important;\n    padding: 0 !important;\n    z-index: 1001;\n}\n}\n.list-group {\n  height: 100%;\n  display: flex;\n  padding: 0 0.3em;\n  top: 2.2em;\n  flex-direction: column;\n}\n.sidebar-item {\n  display: flex !important;\n  flex-direction: column !important;\n  justify-content: center !important;\n  align-items: center !important;\n  min-height: auto !important;\n  flex: 0 0 !important;\n  padding: 0.3em 0 !important;\n  border-radius: 22px !important;\n  margin-bottom: 0.8em !important;\n}\n.sidebar-item .v-list-item__content {\n  padding: 0.3em 0 !important;\n}\n.sidebar-item::before {\n  border-radius: 22px;\n}\n#audio-player-container {\n  position: fixed;\n  left: 0;\n  display: flex;\n  margin-top: auto;\n  right: 0;\n  z-index: 999;\n  bottom: 0rem;\n  transition: bottom 0.5s ease-out;\n}\n@media (max-width: 600px) {\n#audio-player-container {\n    padding: 1em;\n    position: absolute;\n    bottom: 96%;\n    height: 6rem;\n}\n#audio-player-container #player-wrapper {\n    display: flex;\n    transition: all 0.5s;\n    border-radius: 10px;\n}\n}\n#audio-player-container .small-screen-player {\n  position: fixed;\n  left: 0;\n  right: 0;\n  z-index: 1000;\n  transition: transform 0.2s 0.1s;\n  top: 0;\n  bottom: 0;\n}\n@media (min-width: 600px) {\n#audio-player-container .small-screen-player {\n    display: none;\n}\n}\n.audio-player-container__hidden {\n  bottom: -7rem !important;\n  display: none !important;\n}\n.epico_footer-layout {\n  position: relative;\n  min-width: 600px;\n  z-index: 1;\n  width: 100%;\n}\n@media (max-width: 600px) {\n.epico_footer-layout {\n    min-width: 0;\n}\n}\n.epico_footer-layout .times {\n  display: flex;\n  width: 100%;\n  justify-content: space-between;\n  height: 0px;\n}\n.epico_footer-layout .epico_player-main-container {\n  display: flex;\n  width: 100%;\n  z-index: 2;\n  background-color: var(--light-theme-panel-bg-color);\n  border-top: 1px solid rgba(150, 150, 150, 0.473);\n  box-shadow: 0px 0px 1px -2px rgba(0, 0, 0, 0.14), 0px 0px 2px 0px rgba(0, 0, 0, 0.14), 0px 2px 2px 3px rgba(0, 0, 0, 0.14);\n}\n.epico_footer-layout .epico_player-main-container .epico_audio-info {\n  flex: 0 2 30%;\n  display: flex;\n  min-width: 300px;\n  align-items: center;\n  color: var(--light-theme-text-color);\n}\n@media screen and (max-width: 750px) {\n.epico_footer-layout .epico_player-main-container .epico_audio-info {\n    min-width: 250px;\n    padding-right: 0em;\n}\n}\n@media screen and (max-width: 650px) {\n.epico_footer-layout .epico_player-main-container .epico_audio-info {\n    min-width: 220px;\n}\n}\n@media (max-width: 600px) {\n.epico_footer-layout .epico_player-main-container .epico_audio-info {\n    flex: 2 0 80%;\n}\n}\n@media (min-width: 600px) {\n.epico_footer-layout .epico_player-main-container .epico_audio-info .chevron-up-container {\n    display: none;\n}\n}\n.epico_footer-layout .epico_player-main-container .epico_audio-info .plus-container {\n  padding: 0.3em 0em 0 1rem;\n  position: relative;\n}\n.epico_footer-layout .epico_player-main-container .epico_audio-info .plus-container img {\n  width: 1rem;\n}\n@media (max-width: 600px) {\n.epico_footer-layout .epico_player-main-container .epico_audio-info .plus-container {\n    display: none;\n}\n}\n@media screen and (max-width: 800px) {\n.epico_footer-layout .epico_player-main-container .epico_audio-info .plus-container {\n    padding: 0.35em 0em 0 0.5rem;\n}\n}\n.epico_footer-layout .epico_player-main-container .epico_audio-info .song-img {\n  min-width: 4.2em;\n}\n.epico_footer-layout .epico_player-main-container .epico_audio-info .infos {\n  display: flex;\n  align-items: center;\n  overflow-x: hidden;\n}\n.epico_footer-layout .epico_player-main-container .epico_audio-info .infos .current-info {\n  display: flex;\n  overflow-x: hidden;\n  flex-direction: column;\n}\n.epico_footer-layout .epico_player-main-container .epico_audio-info .infos .current-info .audio-title {\n  color: var(--light-theme-text-color);\n  font-size: 1.04em;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  font-weight: 600;\n  overflow: hidden;\n}\n.epico_footer-layout .epico_player-main-container .epico_audio-info .infos .current-info .now-playing {\n  font-size: 0.8em;\n  line-height: 1.2;\n}\n.epico_footer-layout .epico_player-main-container .epico_audio-info .infos .current-info .live-stream-title-container {\n  position: relative;\n  padding-right: 10px;\n  overflow-x: hidden;\n  transform: translateX(-12px);\n  padding-left: 10px;\n  line-height: 1.4;\n}\n.epico_footer-layout .epico_player-main-container .epico_audio-info .infos .current-info .live-stream-title-container .live-stream-title {\n  white-space: nowrap;\n  padding: 0.2em 0.1em;\n  width: 100%;\n  font-size: 1em;\n}\n.epico_footer-layout .epico_player-main-container .epico_audio-info .infos .current-info .live-stream-title-container .hiding-box-left {\n  position: absolute;\n  left: 5px;\n  top: 0;\n  bottom: 0;\n  width: 10px;\n  background-image: linear-gradient(to right, var(--light-theme-bg-color) 0%, transparent 100%);\n}\n.epico_footer-layout .epico_player-main-container .epico_audio-info .infos .current-info .live-stream-title-container .hiding-box-right {\n  position: absolute;\n  right: 0px;\n  top: 0;\n  bottom: 0;\n  width: 10px;\n  background-image: linear-gradient(to left, var(--light-theme-bg-color) 0%, transparent 100%);\n}\n.epico_footer-layout .epico_player-main-container .epico_audio-info .infos .current-info .audio-album {\n  line-height: 1.1;\n  opacity: 0.75;\n}\n.epico_footer-layout .epico_player-main-container .epico_audio-info .infos .current-info .audio-artists {\n  opacity: 0.75;\n  font-size: 0.85em;\n}\n.epico_footer-layout .epico_player-main-container .epico_audio-info .infos .heart-button {\n  margin: 0 0.7em;\n}\n.epico_footer-layout .epico_player-main-container .epico_main-control-section {\n  flex: 2 1 40%;\n}\n@media (max-width: 600px) {\n.epico_footer-layout .epico_player-main-container .epico_main-control-section {\n    display: none;\n}\n}\n.epico_footer-layout .epico_player-main-container .epico_main-control-section .epico_progressbar-container {\n  max-width: 75%;\n  margin: 0 auto;\n}\n@media screen and (max-width: 800px) {\n.epico_footer-layout .epico_player-main-container .epico_main-control-section .epico_progressbar-container {\n    max-width: 85%;\n}\n}\n.epico_footer-layout .epico_player-main-container .epico_option-section {\n  flex: 0 3 30%;\n  display: flex;\n  align-items: center;\n  padding-right: 1em;\n  justify-content: flex-end;\n}\n@media (max-width: 600px) {\n.epico_footer-layout .epico_player-main-container .epico_option-section {\n    display: none;\n}\n}\n.epico_footer-layout .epico_player-main-container .epico_option-section__group {\n  display: flex;\n}\n.epico_footer-layout .epico_player-main-container .epico_option-section > *:not(:first-child) {\n  margin-left: 0.5rem;\n}\n@media screen and (max-width: 900px) {\n.epico_footer-layout .epico_player-main-container .epico_option-section {\n    flex-direction: column;\n}\n}\n@media screen and (max-width: 800px) {\n.epico_footer-layout .epico_player-main-container .epico_option-section .epico_volumebar-container {\n    width: 70px;\n}\n}\n.epico_footer-layout .epico_player-main-container .epico_play-circle-phone-layout {\n  display: flex;\n  align-items: center;\n  flex: 0 2 20%;\n  transform: translateY(5px);\n  justify-content: flex-end;\n}\n@media (min-width: 600px) {\n.epico_footer-layout .epico_player-main-container .epico_play-circle-phone-layout {\n    display: none;\n}\n}\n.epico_footer-layout .epico_player-main-container .epico_play-circle-phone-layout .play-button {\n  position: relative;\n}\n.epico_footer-layout .epico_player-main-container .epico_play-circle-phone-layout .play-button .progress-circle {\n  position: absolute;\n  top: 0px;\n  left: 0px;\n}\n@media (max-width: 600px) {\n.epico_footer-layout .epico_player-main-container {\n    border: none;\n    border-radius: 6px;\n}\n}\n.epico_footer-layout .epico_playlist-container {\n  position: absolute;\n  top: 0;\n  right: 0;\n}\n@media (max-width: 600px) {\n.epico_footer-layout .epico_playlist-container {\n    display: none;\n}\n}\n.epico_footer-layout .epico_playlist-container .epico_playlist-ul-wrapper {\n  position: absolute;\n  background-color: var(--light-theme-panel-bg-color);\n  color: var(--light-theme-text-color);\n  z-index: -5;\n  bottom: -0.6em;\n  padding: 0.5rem;\n  padding-bottom: 2.4%;\n  border-radius: 5px;\n  padding-bottom: 1em;\n  transition: -webkit-all 0.2s ease-in-out;\n  transition: all 0.2s ease-in-out;\n  transition: all 0.2s ease-in-out;\n  box-shadow: 0px 4px 5px rgba(7, 7, 7, 0.425);\n  width: 35em;\n  right: 0;\n}\n.epico_footer-layout .epico_playlist-container .epico_playlist-ul {\n  overflow-y: scroll;\n  font-size: 93%;\n  max-height: 15em;\n  padding-right: 0.3em;\n}\n.epico_footer-layout .epico_playlist-container li {\n  display: flex;\n  align-items: center;\n  padding: 0.3rem 0.2rem;\n  padding-right: 1.6rem;\n  border-radius: 9px;\n  cursor: pointer;\n}\n.epico_footer-layout .epico_playlist-container li:hover {\n  background-color: #86868636;\n}\n.epico_footer-layout .epico_playlist-container li .audio-cover .img {\n  width: 3em;\n  height: 3em;\n  border-radius: 9px;\n}\n.epico_footer-layout .epico_playlist-container li .audio-cover {\n  margin-right: 0.5rem;\n}\n.epico_footer-layout .epico_playlist-container li .audio-title {\n  font-weight: 500;\n  flex-basis: 42%;\n}\n.epico_footer-layout .epico_playlist-container li .audio-artist {\n  font-size: 0.8em;\n  color: #a7a7a7;\n}\n.epico_footer-layout .epico_playlist-container li.active-Song {\n  background-color: #86868636;\n}\n.epico_footer-layout button {\n  border: none;\n  background-color: transparent;\n}\n.epico_footer-layout button img {\n  width: 1rem;\n  height: 1rem;\n}\n.epico_footer-layout .play-next-previous-container {\n  display: flex;\n  justify-content: center;\n  padding-top: 0.6rem;\n  align-items: flex-start;\n}\n.epico_footer-layout button {\n  margin: 0.5rem 1rem;\n}\n.epico_footer-layout .svg {\n  height: 1.1rem;\n  width: 1.1rem;\n  fill: var(--light-theme-text-color);\n}\n.epico_footer-layout .play-button {\n  transform: translateY(-5px);\n  position: relative;\n}\n.epico_footer-layout .play-button .svg {\n  width: 2.2rem;\n  height: 2.2rem;\n}\n@media screen and (max-width: 900px) {\n.epico_footer-layout .play-button .svg {\n    width: 2rem;\n    height: 2rem;\n}\n}\n.epico_footer-layout .random-button i {\n  font-size: 20px;\n}\n.epico_footer-layout .repeat-button .svg {\n  width: 1rem;\n  height: 1rem;\n}\n@media screen and (max-width: 900px) {\n.epico_footer-layout .random-button i,\n.epico_footer-layout .repeat-button i {\n    font-size: 16px !important;\n}\n}\n.plus-container {\n  position: relative;\n}\n.epico_progressbar-inner {\n  width: 0%;\n  background: linear-gradient(45deg, var(--color-secondary), var(--color-primary));\n  height: 100%;\n  border-radius: 5px;\n  z-index: 1;\n  position: relative;\n}\n.epico_progress-circle {\n  position: absolute;\n  height: 10px;\n  width: 10px;\n  border-radius: 50%;\n  background-color: var(--color-primary);\n  top: 50%;\n  right: 0;\n  transform: translate(50%, -50%);\n  cursor: pointer;\n  transition: background 0.2s;\n}\n.epico_volumebar-inner {\n  height: 100%;\n  background: var(--color-primary);\n  border-radius: 25px;\n  position: relative;\n  width: 50%;\n}\n.activeButton .svg {\n  fill: var(--color-primary) !important;\n}\n.loading-circle {\n  position: absolute;\n  width: 114%;\n  height: 114%;\n  border: 4px solid var(--color-primary);\n  border-radius: 50%;\n  border-right-color: transparent;\n  left: 55%;\n  top: 55%;\n  margin-left: -63%;\n  margin-top: -63%;\n  -webkit-animation: circle 0.75s linear infinite;\n          animation: circle 0.75s linear infinite;\n}\n.current-audio-time,\n.current-audio-duration {\n  color: var(--light-theme-text-color);\n}\n@media screen and (max-width: 900px) {\n.current-audio-time,\n.current-audio-duration {\n    font-size: 12px;\n}\n}\n@-webkit-keyframes circle {\nfrom {\n    transform: rotate(0deg);\n}\nto {\n    transform: rotate(360deg);\n}\n}\n@keyframes circle {\nfrom {\n    transform: rotate(0deg);\n}\nto {\n    transform: rotate(360deg);\n}\n}\n.epico_music-is-playing-container {\n  display: flex;\n  justify-content: center;\n  height: 16px;\n}\n.epico_music-is-playing-container > span {\n  width: 5px;\n  background-color: var(--color-primary);\n  margin-top: auto;\n  height: 50%;\n}\n.white-bars > span {\n  background-color: white !important;\n}\n.epico_music-is-playing-container > span:nth-child(1) {\n  -webkit-animation: go-up-down infinite linear 2.2s;\n  animation: go-up-down infinite linear 2.2s;\n  -webkit-animation-delay: 0s;\n  animation-delay: 0s;\n}\n.epico_music-is-playing-container > span:nth-child(2) {\n  -webkit-animation: go-up-down infinite linear 1.7s;\n  animation: go-up-down infinite linear 1.7s;\n  -webkit-animation-delay: 0.3s;\n  animation-delay: 0.3s;\n}\n.epico_music-is-playing-container > span:nth-child(3) {\n  -webkit-animation: go-up-down infinite linear 1.6s;\n  animation: go-up-down infinite linear 1.6s;\n  -webkit-animation-delay: 0.5s;\n  animation-delay: 0.5s;\n}\n@-webkit-keyframes go-up-down {\n0% {\n    height: 20%;\n}\n20% {\n    height: 80%;\n}\n30% {\n    height: 10%;\n}\n40% {\n    height: 70%;\n}\n50% {\n    height: 50%;\n}\n60% {\n    height: 20%;\n}\n70% {\n    height: 80%;\n}\n80% {\n    height: 10%;\n}\n90% {\n    height: 70%;\n}\n100% {\n    height: 50%;\n}\n}\n@keyframes go-up-down {\n0% {\n    height: 20%;\n}\n20% {\n    height: 80%;\n}\n30% {\n    height: 10%;\n}\n40% {\n    height: 70%;\n}\n50% {\n    height: 50%;\n}\n60% {\n    height: 20%;\n}\n70% {\n    height: 80%;\n}\n80% {\n    height: 10%;\n}\n90% {\n    height: 70%;\n}\n100% {\n    height: 50%;\n}\n}\n@-webkit-keyframes toCircle {\n0% {\n    transform: rotate(0);\n}\n100% {\n    transform: rotate(360deg);\n}\n}\n@keyframes toCircle {\n0% {\n    transform: rotate(0);\n}\n100% {\n    transform: rotate(360deg);\n}\n}\n.epico_main-control-section {\n  padding-top: 5px;\n}\n.epico_main-control-section > .epico_play-next-previous-container {\n  display: flex;\n  padding-top: 2em;\n  justify-content: center;\n  align-items: center;\n}\n.epico_main-control-section-u500h > .epico_play-next-previous-container {\n  margin-left: -15px;\n  transform: translateY(8px);\n}\n.epico_progressbar-container {\n  padding: 10px 0 2px 0;\n  font-size: 12px;\n  width: 100%;\n  position: relative;\n}\n.epico_progressbar {\n  width: 80%;\n  margin: 0 auto;\n  position: relative;\n  height: 4px;\n  border-radius: 5px;\n  background: #dfdfdf;\n  opacity: 0.75;\n  cursor: pointer;\n}\n.epico_progressbar-u500h {\n  margin: 0 auto 0 0;\n  width: 100%;\n}\n.epico_volume-button-container {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.epico_volume-button > i {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n.epico_volumebar-container {\n  width: 100px;\n  position: absolute;\n  border-radius: 25px;\n  transform: rotate(-90deg);\n  top: -60%;\n  left: -25%;\n  opacity: 0;\n  transition: opacity 0.3s 0.2s ease-in;\n}\n.epico_volumebar-container-u500h {\n  opacity: 1;\n  position: static;\n  transform: none;\n}\n.epico_volumebar {\n  width: 100%;\n  height: 4px;\n  border-radius: 25px;\n  background-color: #dfdfe9;\n}\n.epico_volumebar-inner > .epico_progress-circle {\n  opacity: 1;\n  transform: translate(50%, -50%);\n}\n.epico_phone-layout-full {\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\n.epico_phone-layout-full .epico_player-container {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  color: var(--light-theme-text-color);\n}\n.epico_phone-layout-full .epico_playlist-container {\n  position: relative;\n}\n.epico_phone-layout-full .epico_playlist-text-container {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  color: grey;\n  background-color: var(--light-theme-bg-color);\n  justify-content: space-between;\n  align-items: center;\n  padding: 15px 0;\n  box-shadow: -2px 5px 6px rgba(5, 5, 5, 0.288);\n}\n.epico_phone-layout-full .epico_playlist-chevron {\n  position: absolute;\n  right: 7px;\n  top: 2px;\n  font-size: 15px;\n  transform: rotate(90deg);\n  transition: transform 0.2s linear;\n}\n.epico_phone-layout-full .epico_playlist-ul {\n  position: absolute;\n  background-color: var(--light-theme-bg-color);\n  width: 100%;\n  padding: 0;\n  margin: 0;\n  z-index: 1;\n  top: 100%;\n  max-height: 0px;\n  transition: -webkit-max-height 0.2s ease-in-out;\n  transition: max-height 0.2s ease-in-out;\n  transition: max-height 0.2s ease-in-out, -webkit-max-height 0.2s ease-in-out;\n  overflow-y: scroll;\n  box-shadow: 0px 4px 5px rgba(7, 7, 7, 0.24);\n}\n.epico_phone-layout-full .epico_playlist-ul li {\n  font-size: 16px;\n  display: flex;\n  align-items: center;\n  padding: 0.5rem 0.6rem;\n  padding-right: 1.6rem;\n  border-radius: 9px;\n  cursor: pointer;\n}\n.epico_phone-layout-full .epico_playlist-ul li:hover {\n  background-color: #eeeeee;\n}\n.epico_phone-layout-full .epico_playlist-ul li {\n  display: flex;\n  align-items: center;\n  padding: 0.3rem 0.2rem;\n  padding-right: 1.6rem;\n  border-radius: 9px;\n  cursor: pointer;\n}\n.epico_phone-layout-full .epico_playlist-ul li:hover {\n  background-color: #86868636;\n}\n.epico_phone-layout-full .epico_playlist-ul li .audio-cover {\n  padding: 0.2em;\n  margin-right: 0.5rem;\n}\n.epico_phone-layout-full .epico_playlist-ul li .audio-cover .img {\n  border-radius: 9px;\n}\n.epico_phone-layout-full .epico_playlist-ul li .audio-title {\n  font-weight: 500;\n  flex-basis: 42%;\n}\n.epico_phone-layout-full .epico_playlist-ul li .audio-artist {\n  font-size: 0.8em;\n  opacity: 0.8;\n}\n.epico_phone-layout-full .epico_playlist-ul li.active-Song {\n  background-color: #86868636;\n}\n.epico_phone-layout-full .epico_loading-circle {\n  position: absolute;\n  top: -8px;\n  right: 0;\n  height: 13px;\n  width: 13px;\n  border-radius: 50%;\n  border: 3px solid #f3f3f3;\n  border-top: 3px solid var(--color-primary);\n  border-left: 3px solid var(--color-primary);\n  -webkit-animation: toCircle 0.4s linear infinite;\n          animation: toCircle 0.4s linear infinite;\n  opacity: 0;\n}\n.epico_phone-layout-full .epico_audio-title > *:first-child {\n  margin: 0;\n}\n.epico_phone-layout-full .epico_audio-info > .epico_audio-album,\n.epico_phone-layout-full .epico_audio-artist {\n  font-size: 13px;\n  opacity: 0.8;\n}\n.epico_phone-layout-full .epico_image-section {\n  width: 100%;\n  display: flex;\n  padding: 20px 20px 0px 20px;\n  margin: 0 auto;\n  flex: 1 0 75%;\n  margin-top: 10px;\n  justify-content: center;\n  align-items: center;\n  -webkit-box-flex: 1;\n  -ms-flex-positive: 1;\n  max-width: 380px;\n  flex-grow: 1;\n}\n.epico_phone-layout-full .epico_image-section .img {\n  border-radius: 15px;\n}\n.epico_phone-layout-full .epico_progressbar-container {\n  padding: 10px 0 2px 0;\n  margin-top: 0.5rem;\n  font-size: 14px;\n  width: 100%;\n  position: relative;\n}\n.epico_phone-layout-full .epico_progressbar {\n  width: 80%;\n  margin: 0 auto;\n  position: relative;\n  height: 4px;\n  border-radius: 5px;\n  background: #dfdfdf;\n  opacity: 0.75;\n  cursor: pointer;\n}\n.epico_phone-layout-full .epico_main-control-section {\n  padding-top: 5px;\n}\n.epico_phone-layout-full .epico_main-control-section .epico_play-next-previous-container {\n  display: flex;\n  padding-top: 10px;\n  padding-bottom: 5px;\n  justify-content: center;\n  align-items: center;\n}\n.epico_phone-layout-full .epico_main-control-section .epico_play-next-previous-container .epico_play-button {\n  position: relative;\n}\n.epico_phone-layout-full .epico_main-control-section .epico_play-next-previous-container .epico_play-button img {\n  width: 4.5em;\n}\n.epico_phone-layout-full .epico_option-section {\n  display: flex;\n  justify-content: space-around;\n  padding-bottom: 10px;\n  padding-top: 10px;\n}\n.epico_phone-layout-full .epico_playlist-audio > .img {\n  height: 50px;\n  width: 50px;\n}\n.epico_phone-layout-full .epico_progressbar-inner {\n  width: 0%;\n  background: var(--color-primary);\n  height: 100%;\n  border-radius: 5px;\n  z-index: 1;\n  position: relative;\n}\n.epico_phone-layout-full .epico_progress-circle {\n  position: absolute;\n  height: 12px;\n  width: 12px;\n  border-radius: 50%;\n  background-color: #fff;\n  top: 50%;\n  right: 0;\n  transform: translate(50%, -50%);\n  border: 2px solid var(--color-primary);\n  cursor: pointer;\n  transition: background 0.2s;\n}\n.epico_phone-layout-full .epico_progress-circle:hover {\n  background-color: var(--color-primary);\n}\n.epico_phone-layout-full .epico_current-audio-duration,\n.epico_phone-layout-full .epico_current-audio-time {\n  position: absolute;\n  margin-top: 7px;\n  cursor: default;\n}\n.epico_phone-layout-full .epico_loading-circle {\n  right: 6%;\n}\n.epico_phone-layout-full .epico_volume-button-container {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.epico_phone-layout-full .epico_volume-button-container > .epico_volume-button {\n  position: relative;\n  padding: 20px;\n}\n.epico_phone-layout-full .epico_volumebar-container {\n  width: 60px;\n  position: absolute;\n  border-radius: 25px;\n  transform: rotate(-90deg);\n  top: -60%;\n  left: -25%;\n  opacity: 0;\n  transition: opacity 0.3s 0.2s ease-in;\n}\n.epico_phone-layout-full .epico_volumebar {\n  width: 100%;\n  height: 4px;\n  border-radius: 25px;\n  background-color: #dfdfe9;\n}\n.epico_phone-layout-full .epico_volumebar-inner {\n  height: 100%;\n  background: var(--color-primary);\n  border-radius: 25px;\n  position: relative;\n  width: 50%;\n}\n.epico_phone-layout-full .epico_next-button .v-icon,\n.epico_phone-layout-full .epico_previous-button .v-icon {\n  font-size: 34px !important;\n}\n.epico_phone-layout-full .epico_download-button .v-icon,\n.epico_phone-layout-full .epico_shuffle-button .v-icon,\n.epico_phone-layout-full .epico_heart-button .v-icon,\n.epico_phone-layout-full .epico_repeat-button .v-icon,\n.epico_phone-layout-full .epico_volume-button .v-icon,\n.epico_phone-layout-full .epico_playlist-button .v-icon {\n  font-size: 30px !important;\n}\n.epico_phone-layout-full .epico_max-height-180 {\n  max-height: 180px;\n}\n.epico_phone-layout-full .epico_no-border {\n  border: none !important;\n}\n@keyframes toCircle {\n0% {\n    transform: rotate(0);\n}\n100% {\n    transform: rotate(360deg);\n}\n}\n.epico_phone-layout-full .epico_btn-disabled {\n  cursor: unset;\n  color: white;\n}\n.epico_phone-layout-full .epico_max-height-0 {\n  max-height: 0px;\n}\n.epico_phone-layout-full .epico_playlist-button {\n  margin-right: -10px;\n}\n.epico_phone-layout-full .epico_no-border {\n  border: none !important;\n}\n.epico_phone-layout-full .epico_volumebar-inner > .epico_progress-circle {\n  opacity: 1;\n  transform: translate(50%, -50%);\n}\n.epico_phone-layout-full .epico_current-audio-duration {\n  right: 26px;\n}\n.epico_phone-layout-full .epico_player-container button:hover > i {\n  color: var(--color-primary);\n}\n.epico_phone-layout-full .epico_current-audio-time {\n  left: 22px;\n}\n.epico_phone-layout-full .epico_player-container > .epico_player-main-container {\n  position: relative;\n  width: 100%;\n  border-radius: 2px;\n  display: flex;\n  flex-direction: column;\n  background-color: var(--light-theme-bg-color);\n  justify-content: flex-end;\n  height: 100%;\n  transition: 0.5s background;\n}\n.epico_phone-layout-full .epico_player-container > .epico_player-main-container .epico_details-section {\n  flex: 1 0 34%;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\n.epico_phone-layout-full .epico_player-container > .epico_player-main-container .epico_details-section > * {\n  width: 100%;\n}\n.epico_phone-layout-full .epico_player-container > .epico_player-main-container .epico_details-section .epico_audio-info {\n  font-size: 20px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n.epico_phone-layout-full .epico_player-container > .epico_player-main-container .epico_details-section .epico_audio-info p {\n  margin: 6px 0;\n}\n.epico_phone-layout-full .epico_player-container > .epico_player-main-container .epico_playlist-text {\n  font-size: 14px;\n}\n.epico_phone-layout-full .epico_player-container > .epico_player-main-container > .epico_details-section {\n  width: 100%;\n}\n@media screen and (min-height: 480px) {\n.epico_phone-layout-full .epico_playlist-ul > li {\n    font-size: 20px;\n}\n}\n@media screen and (min-height: 480px) {\n.epico_phone-layout-full .epico_playlist-text {\n    font-size: 20px;\n}\n}\n@media screen and (min-height: 480px) {\n.epico_phone-layout-full .epico_playlist-chevron {\n    font-size: 20px;\n}\n}\n@media screen and (min-height: 480px) {\n.epico_phone-layout-full .epico_playlist-ul > li {\n    font-size: 20px;\n}\n}\n@media screen and (min-height: 480px) {\n.epico_phone-layout-full .epico_audio-info > .epico_audio-album,\n.epico_phone-layout-full .epico_audio-artist {\n    font-size: 18px;\n}\n}\n@media screen and (min-width: 0px) and (min-height: 450px) {\n.epico_phone-layout-full .epico_image-section > .epico_img {\n    max-width: 200px;\n}\n}\n@media screen and (min-width: 0px) and (min-height: 600px) {\n.epico_phone-layout-full .epico_image-section > .epico_img {\n    max-width: 230px;\n}\n}\n@media screen and (min-width: 360px) and (min-height: 650px) {\n.epico_phone-layout-full .epico_image-section > .epico_img {\n    max-width: 270px;\n}\n}\n@media screen and (min-width: 360px) and (min-height: 700px) {\n.epico_phone-layout-full .epico_image-section > .epico_img {\n    max-width: 300px;\n}\n}\n@media screen and (min-width: 680px) {\n.epico_phone-layout-full .epico_image-section > .epico_img {\n    max-width: 550px;\n}\n}\n@media screen and (min-height: 480px) {\n.epico_phone-layout-full .epico_control-section > .epico_option-section {\n    padding-bottom: 6px;\n    padding-top: 0px;\n}\n}\n@media screen and (min-height: 680px) {\n.epico_phone-layout-full .epico_control-section > .epico_option-section {\n    padding-bottom: 10px;\n    padding-top: 10px;\n}\n}\n@media screen and (min-height: 480px) {\n.epico_phone-layout-full .epico_progressbar-container {\n    font-size: 16px;\n}\n}\n@media screen and (min-height: 480px) {\n.epico_phone-layout-full .epico_progressbar {\n    height: 6px;\n    width: 86%;\n}\n}\n@media screen and (min-height: 480px) {\n.epico_phone-layout-full .epico_progress-circle {\n    height: 16px;\n    width: 16px;\n}\n}\n@media screen and (min-height: 480px) {\n.epico_phone-layout-full .epico_volumebar {\n    height: 8px;\n    width: 120%;\n}\n}\n@media screen and (min-height: 480px) {\n.epico_phone-layout-full .epico_next-button,\n.epico_phone-layout-full .epico_previous-button {\n    font-size: 18px;\n    padding: 20px !important;\n}\n}\n@media screen and (min-height: 480px) {\n.epico_phone-layout-full .epico_download-button,\n.epico_phone-layout-full .epico_shuffle-button,\n.epico_phone-layout-full .epico_heart-button,\n.epico_phone-layout-full .epico_repeat-button,\n.epico_phone-layout-full .epico_volume-button,\n.epico_phone-layout-full .epico_playlist-button {\n    font-size: 22px;\n}\n}\n@media screen and (min-height: 480px) {\n.epico_phone-layout-full .epico_details-section > .epico_audio-info {\n    font-size: 30px;\n}\n}\n.epico_phone-layout-full .epico_audio-info > p {\n  margin: 6px 0;\n}\n@media screen and (min-height: 480px) {\n.epico_phone-layout-full .epico_audio-info > p {\n    margin: 3px 0;\n}\n}\n.muted {\n  color: #8898aa !important;\n}\n@media screen and (min-width: 600px) {\n#player-wrapper {\n    opacity: 1 !important;\n    transform: translateY(0) !important;\n}\n}\n.playback_rate__button {\n  max-width: 10px;\n  opacity: 0.8;\n}\n.playback_rate__button .playback_rate {\n  font-size: 0.85em;\n  font-weight: bold;\n}\n.song-img {\n  width: 80px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n@media screen and (max-width: 900px) {\n.song-img {\n    width: 60px;\n}\n}\n.song-img .img {\n  max-width: 80%;\n}\n.video-tv {\n  position: absolute;\n  bottom: calc(100% - 30px);\n  z-index: 0;\n  left: 50%;\n  -webkit-animation: go-up 1s;\n  animation: go-up 1s;\n  transform: translateX(-50%);\n}\n@media screen and (max-width: 900px) {\n.video-tv {\n    bottom: calc(100% - 20px);\n}\n}\n.video-tv.small-screen {\n  position: fixed;\n  right: 10px;\n  bottom: 71px;\n  left: unset;\n  transform: translateX(0%);\n}\n@media (max-width: 600px) {\n.video-tv.small-screen {\n    display: none;\n}\n}\n@media (max-width: 600px) {\n.video-tv.phone-layout {\n    z-index: 1000000;\n    bottom: unset;\n    top: 50%;\n    transform: translate(-50%, -75%);\n    left: 50%;\n    display: initial;\n}\n}\n.small-screen #youtube_video_container {\n  width: 280px !important;\n  height: 195px !important;\n}\n@media (max-width: 600px) {\n.small-screen #youtube_video_container {\n    width: 200px !important;\n    height: 125px !important;\n}\n}\n#youtube_video_container {\n  width: 100%;\n  height: 100%;\n}\n@media screen and (max-width: 600px) {\n.small-screen.phone-layout #youtube_video_container {\n    width: 100% !important;\n    height: 100% !important;\n}\n}\n@-webkit-keyframes go-up {\n0% {\n    bottom: -600px;\n}\n100% {\n    bottom: 0px;\n}\n}\n@keyframes go-up {\n0% {\n    bottom: -600px;\n}\n100% {\n    bottom: 0px;\n}\n}\n.blinking {\n  -webkit-animation: 1s blink ease infinite;\n  animation: 1s blink ease infinite;\n}\n.blinking {\n  -webkit-animation: 1s blink ease infinite;\n  animation: 1s blink ease infinite;\n}\n@keyframes blink {\nfrom, to {\n    opacity: 0;\n}\n50% {\n    opacity: 1;\n}\n}\n@-webkit-keyframes blink {\nfrom, to {\n    opacity: 0;\n}\n50% {\n    opacity: 1;\n}\n}\n@-webkit-keyframes slide-to-left-title {\n0% {\n    margin-left: 115%;\n}\n25% {\n    margin-left: 57.5%;\n}\n50% {\n    margin-left: 0%;\n}\n75% {\n    margin-left: -57.5%;\n}\n100% {\n    margin-left: -115%;\n}\n}\n@keyframes slide-to-left-title {\n0% {\n    margin-left: 115%;\n}\n25% {\n    margin-left: 57.5%;\n}\n50% {\n    margin-left: 0%;\n}\n75% {\n    margin-left: -57.5%;\n}\n100% {\n    margin-left: -115%;\n}\n}\n.slideAnimation {\n  -webkit-animation: slide-to-left-title 13s linear 0s infinite;\n          animation: slide-to-left-title 13s linear 0s infinite;\n}\n.content-list-wrapper ul {\n  list-style: none;\n  padding: 0;\n}\n.content-list-wrapper ul li {\n  display: flex;\n  width: 100%;\n  padding: 0.4rem 1rem;\n  align-items: center;\n}\n.content-list-wrapper ul li .rank {\n  padding-right: 0.8em;\n  width: 30px;\n}\n.content-list-wrapper ul li .rank .play-icon {\n  display: none;\n}\n.content-list-wrapper ul li .item-cover {\n  display: flex;\n  align-items: center;\n}\n.content-list-wrapper ul li .item-cover .img {\n  width: 2.7rem;\n  margin-right: 0.8rem;\n  border-radius: 5px;\n}\n.content-list-wrapper ul li .item-info {\n  display: flex;\n  width: 40%;\n  align-items: center;\n}\n.content-list-wrapper ul li .item-info .epico_music-is-playing-container {\n  margin-left: 0.7em;\n  margin-bottom: 0.2em;\n}\n.content-list-wrapper ul li .item-title {\n  font-weight: 600;\n  cursor: pointer;\n}\n.content-list-wrapper ul li .item-artist {\n  flex-grow: 1;\n  text-align: end;\n}\n.content-list-wrapper ul li:hover {\n  background-color: rgba(134, 134, 134, 0.212);\n}\n.content-list-wrapper ul li:hover .rank__rank {\n  display: none;\n}\n.content-list-wrapper ul li:hover .play-icon {\n  display: inline;\n}\n.content-list-wrapper ul a {\n  color: var(--light-theme-text-color);\n  text-decoration: none;\n}\n.content-list-wrapper .custom-options {\n  display: flex;\n  align-items: flex-end;\n}\n.content-list-wrapper .custom-options > * {\n  margin-left: 1em;\n}\n.content-list-wrapper .custom-options .delete-button .svg-image,\n.content-list-wrapper .custom-options .download .svg-image,\n.content-list-wrapper .custom-options .privacy .svg-image {\n  width: 1em;\n}\n.content-list-wrapper .options {\n  flex-grow: 1;\n  display: flex;\n  justify-content: flex-end;\n}\n.content-list-wrapper .options > * {\n  margin-left: 1em;\n}\n.rank {\n  font-weight: bold;\n}\n.rank-one {\n  font-size: 1.6em;\n  color: #fdd835;\n}\n.rank-two {\n  font-size: 1.3em;\n  color: #c0c0c0;\n}\n.rank-three {\n  font-size: 1.1em;\n  color: #cd7f32;\n}\n.skeleton-list {\n  list-style: none;\n  padding: 0;\n}\n.skeleton-list .skeleton {\n  display: flex;\n  width: 100%;\n  padding: 0.5rem 1rem;\n  align-items: center;\n}\n.skeleton-list .skeleton > *:first-child {\n  width: 4em;\n  padding-right: 1em;\n}\n.skeleton-list .skeleton > *:nth-child(2) {\n  width: 88%;\n}\n.skeleton-list .vue-content-placeholders-img {\n  height: 50px !important;\n  margin-top: 0;\n}\n#player-container {\n  width: 100%;\n  display: flex;\n}\n#player-container .player-container__content {\n  display: flex;\n  width: 100%;\n  justify-content: space-between;\n}\n#player-container #player-container__content__main {\n  flex-grow: 1;\n  overflow-x: hidden;\n  overflow-y: hidden;\n  min-height: 99vh;\n  color: var(--light-theme-text-color);\n  position: relative;\n  padding: 4em 0em 0rem 6.5em;\n  background-color: var(--light-theme-bg-color);\n}\n#player-container #player-container__content__main .content-container {\n  padding-bottom: 5em;\n  padding-right: 0 !important;\n}\n@media screen and (max-width: 900px) {\n#player-container #player-container__content__main {\n    padding: 4em 0em 0rem 5.5em;\n}\n}\n@media screen and (max-width: 600px) {\n#player-container #player-container__content__main {\n    padding: 4em 0em 0rem 0em;\n}\n}\n.svg-image {\n  width: 1em;\n}\n.play-button .v-icon {\n  opacity: 1 !important;\n}\n.ad-slot {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.separator {\n  width: 1px;\n  height: 0.85em;\n  margin: 0 0.5em;\n  display: inline-block;\n  background: grey;\n  opacity: 0.5;\n}\n.button-with-img-inside {\n  border: none;\n  background: none;\n  padding: 0.2em 0.4em;\n  align-items: center;\n  display: flex;\n  border-radius: 25px;\n}\n.button-with-img-inside .content-text {\n  font-weight: bold;\n  font-size: 0.65em;\n  margin-left: 0.3em;\n}\n@media screen and (max-width: 500px) {\n.button-with-img-inside .content-text {\n    display: none;\n}\n}\n.button-with-img-inside .image {\n  position: relative;\n  background-color: #fff;\n  border-radius: 50%;\n  height: 1.5em;\n  width: 1.5em;\n}\n.button-with-img-inside .image .svg-image {\n  cursor: pointer;\n  position: absolute;\n  top: 50%;\n  width: 0.8em !important;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n.button-with-img-inside.primary {\n  color: white;\n  background-color: #0288d1;\n}\n.button-with-img-inside.success {\n  color: white;\n  background-color: #38c172;\n}\n.button-with-img-inside.danger {\n  color: white;\n  background-color: #e53935;\n}\n.button-with-img-inside.warning {\n  color: white;\n  background-color: #ffb515;\n}\n.container-max-1024 {\n  max-width: 1024px !important;\n}\n.user-avatar .badge {\n  position: absolute;\n  top: -1px;\n  left: -2px;\n}\n.user-avatar .badge i {\n  font-size: 21px !important;\n}\n.successful-payment {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.successful-payment__icon i {\n  font-size: 13em !important;\n}\n.successful-payment__text {\n  font-size: 1.3em;\n  font-weight: bold;\n  padding: 1em 0;\n}\n.panel-color {\n  background-color: var(--light-theme-panel-bg-color) !important;\n}\n.player--dark#player-container .auth-page-wrapper,\n.v-application.theme--dark .auth-page-wrapper {\n  background-color: #222222;\n}\n.player--dark#player-container .panel-color,\n.v-application.theme--dark .panel-color {\n  background-color: var(--dark-theme-panel-bg-color) !important;\n}\n.player--dark#player-container #player-sidebar,\n.v-application.theme--dark #player-sidebar {\n  background-color: var(--dark-theme-panel-bg-color) !important;\n}\n.player--dark#player-container #player-container__content__main,\n.v-application.theme--dark #player-container__content__main {\n  color: var(--dark-theme-text-color);\n  background-color: var(--dark-theme-bg-color);\n}\n.player--dark#player-container #right-sidebar-container,\n.v-application.theme--dark #right-sidebar-container {\n  background-color: var(--dark-theme-panel-bg-color);\n}\n.player--dark#player-container #right-sidebar-container .right-sidebar-toggle,\n.v-application.theme--dark #right-sidebar-container .right-sidebar-toggle {\n  background: var(--dark-theme-panel-bg-color);\n}\n.player--dark#player-container #right-sidebar-container .friends-container__main,\n.v-application.theme--dark #right-sidebar-container .friends-container__main {\n  background-color: var(--dark-theme-bg-color);\n}\n.player--dark#player-container #right-sidebar-container .friends-container .friends-toggle-button,\n.v-application.theme--dark #right-sidebar-container .friends-container .friends-toggle-button {\n  background-color: var(--dark-theme-panel-bg-color);\n}\n.player--dark#player-container #right-sidebar-container .friends-container .card-title-medium,\n.v-application.theme--dark #right-sidebar-container .friends-container .card-title-medium {\n  padding: 0 0.7em;\n  margin-bottom: 0.6em;\n  color: var(--dark-theme-text-color);\n}\n.player--dark#player-container #right-sidebar-container .friends-container .friends-list,\n.v-application.theme--dark #right-sidebar-container .friends-container .friends-list {\n  color: var(--dark-theme-text-color);\n}\n.player--dark#player-container #right-sidebar-container .friends-container .friends-list ul li .top-side .infos .name-container .name,\n.v-application.theme--dark #right-sidebar-container .friends-container .friends-list ul li .top-side .infos .name-container .name {\n  color: var(--dark-theme-text-color);\n}\n.player--dark#player-container #right-sidebar-container .friends-container .friends-list ul li .bottom-side .options > button,\n.v-application.theme--dark #right-sidebar-container .friends-container .friends-list ul li .bottom-side .options > button {\n  color: var(--dark-theme-text-color);\n}\n.player--dark#player-container .content-page .icon-header,\n.v-application.theme--dark .content-page .icon-header {\n  color: var(--dark-theme-text-color);\n}\n.player--dark#player-container .content-page .icon-header .title .sub,\n.v-application.theme--dark .content-page .icon-header .title .sub {\n  color: var(--dark-theme-text-color);\n}\n.player--dark#player-container .browse-container .options-menu ul li a,\n.v-application.theme--dark .browse-container .options-menu ul li a {\n  color: var(--dark-theme-text-color);\n}\n.player--dark#player-container .circle,\n.v-application.theme--dark .circle {\n  color: var(--dark-theme-text-color);\n}\n.player--dark#player-container .circle .img,\n.v-application.theme--dark .circle .img {\n  border: 1px solid var(--dark-theme-text-color);\n}\n.player--dark#player-container .page-title-medium,\n.v-application.theme--dark .page-title-medium {\n  color: var(--dark-theme-text-color);\n}\n.player--dark#player-container .infos-layer,\n.v-application.theme--dark .infos-layer {\n  color: var(--dark-theme-text-color);\n}\n.player--dark#player-container .library-container .library-fixed-wrapper,\n.v-application.theme--dark .library-container .library-fixed-wrapper {\n  background-color: var(--dark-theme-bg-color);\n}\n.player--dark#player-container .library-container .library-fixed-wrapper ul,\n.v-application.theme--dark .library-container .library-fixed-wrapper ul {\n  background-color: var(--dark-theme-bg-color);\n}\n@media screen and (max-width: 800px) {\n.player--dark#player-container .library-container .library-fixed-wrapper,\n.v-application.theme--dark .library-container .library-fixed-wrapper {\n    position: static;\n    padding-top: 0;\n    width: 100%;\n}\n}\n.player--dark#player-container .library-container .library-fixed-wrapper .list-menu .list a,\n.v-application.theme--dark .library-container .library-fixed-wrapper .list-menu .list a {\n  color: var(--dark-theme-text-color);\n}\n.player--dark#player-container .displayname,\n.player--dark#player-container .podcast-title,\n.v-application.theme--dark .displayname,\n.v-application.theme--dark .podcast-title {\n  color: var(--dark-theme-text-color);\n}\n.player--dark#player-container .epico_footer-layout .epico_player-main-container,\n.v-application.theme--dark .epico_footer-layout .epico_player-main-container {\n  background-color: var(--dark-theme-panel-bg-color);\n}\n.player--dark#player-container .epico_footer-layout .epico_player-main-container .epico_audio-info,\n.v-application.theme--dark .epico_footer-layout .epico_player-main-container .epico_audio-info {\n  color: var(--dark-theme-text-color);\n}\n.player--dark#player-container .epico_footer-layout .epico_player-main-container .epico_audio-info .audio-title,\n.v-application.theme--dark .epico_footer-layout .epico_player-main-container .epico_audio-info .audio-title {\n  color: var(--dark-theme-text-color);\n}\n.player--dark#player-container .epico_footer-layout .epico_playlist-container .epico_playlist-ul-wrapper,\n.v-application.theme--dark .epico_footer-layout .epico_playlist-container .epico_playlist-ul-wrapper {\n  background-color: var(--dark-theme-bg-color);\n  color: var(--dark-theme-text-color);\n}\n.player--dark#player-container .epico_footer-layout .current-audio-time,\n.player--dark#player-container .epico_footer-layout .current-audio-duration,\n.v-application.theme--dark .epico_footer-layout .current-audio-time,\n.v-application.theme--dark .epico_footer-layout .current-audio-duration {\n  color: var(--dark-theme-text-color);\n}\n.player--dark#player-container .epico_phone-layout-full .epico_player-container,\n.v-application.theme--dark .epico_phone-layout-full .epico_player-container {\n  color: var(--dark-theme-text-color);\n}\n.player--dark#player-container .epico_phone-layout-full .epico_player-container .epico_player-main-container,\n.v-application.theme--dark .epico_phone-layout-full .epico_player-container .epico_player-main-container {\n  background-color: var(--dark-theme-panel-bg-color);\n  box-shadow: none;\n}\n.player--dark#player-container .epico_phone-layout-full .epico_playlist-ul,\n.v-application.theme--dark .epico_phone-layout-full .epico_playlist-ul {\n  background-color: var(--dark-theme-panel-bg-color);\n}\n.player--dark#player-container .epico_phone-layout-full .epico_playlist-text-container,\n.v-application.theme--dark .epico_phone-layout-full .epico_playlist-text-container {\n  background-color: var(--dark-theme-panel-bg-color);\n}\n.player--dark#player-container .more-or-less > *,\n.v-application.theme--dark .more-or-less > * {\n  color: var(--dark-theme-text-color);\n  opacity: 0.8;\n}\n.player--dark#player-container .more-or-less > *::before, .player--dark#player-container .more-or-less > *::after,\n.v-application.theme--dark .more-or-less > *::before,\n.v-application.theme--dark .more-or-less > *::after {\n  background-color: var(--dark-theme-text-color);\n  opacity: 0.8;\n}\n.player--dark#player-container .hiding-box-left,\n.v-application.theme--dark .hiding-box-left {\n  background-image: linear-gradient(to right, var(--dark-theme-panel-bg-color) 0%, transparent 100%) !important;\n}\n.player--dark#player-container .hiding-box-right,\n.v-application.theme--dark .hiding-box-right {\n  background-image: linear-gradient(to left, var(--dark-theme-panel-bg-color) 0%, transparent 100%) !important;\n}\n.player--dark#player-container .activity-container .hiding-box-left,\n.v-application.theme--dark .activity-container .hiding-box-left {\n  background-image: linear-gradient(to right, var(--dark-theme-bg-color) 0%, transparent 100%) !important;\n}\n.player--dark#player-container .activity-container .hiding-box-right,\n.v-application.theme--dark .activity-container .hiding-box-right {\n  background-image: linear-gradient(to left, var(--dark-theme-bg-color) 0%, transparent 100%) !important;\n}\n.player--dark#player-container .chat-wrapper,\n.v-application.theme--dark .chat-wrapper {\n  background-color: var(--dark-theme-panel-bg-color);\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/layout/Navbar.vue?vue&type=style&index=0&id=ad65455c&lang=scss&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/layout/Navbar.vue?vue&type=style&index=0&id=ad65455c&lang=scss&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".lang[data-v-ad65455c] {\n  border: 1px solid black;\n  padding: 0.1em 0.4em;\n  border-radius: 3px;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/layout/RightSidebar.vue?vue&type=style&index=0&id=0a7d493c&lang=scss&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/layout/RightSidebar.vue?vue&type=style&index=0&id=0a7d493c&lang=scss&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".card-inside[data-v-0a7d493c] {\n  background-color: var(--light-theme-bg-color);\n  border-radius: 0.5em;\n  padding: 1em 0;\n  -webkit-border-radius: 0.5em;\n  -moz-border-radius: 0.5em;\n  -ms-border-radius: 0.5em;\n  -o-border-radius: 0.5em;\n  padding: 0.2em;\n  display: block;\n  width: 100%;\n  margin-top: 1em;\n}\n.card-inside__title[data-v-0a7d493c] {\n  font-weight: bold;\n  font-size: 1.1em;\n  padding: 0.5em;\n}\n.sticky[data-v-0a7d493c] {\n  position: -webkit-sticky;\n  position: sticky;\n  top: 4em;\n}\n.links[data-v-0a7d493c] {\n  display: flex;\n  flex-wrap: wrap;\n  max-width: 100%;\n  min-width: 200px;\n  margin-top: 0.5em;\n  padding: 0.5em 0.2em;\n}\n.links .link[data-v-0a7d493c] {\n  padding: 0.1em 0.4em;\n  cursor: pointer;\n  font-size: 0.75em;\n}\n.links .link[data-v-0a7d493c]:hover {\n  text-decoration: underline;\n}\n.player--dark .card-inside[data-v-0a7d493c] {\n  background-color: var(--dark-theme-bg-color);\n}\n.copyrights[data-v-0a7d493c] {\n  opacity: 0.7;\n  padding-left: 0.5em;\n  margin-top: 1.5em;\n  font-size: 0.7em;\n}\n.highlights[data-v-0a7d493c] {\n  padding: 0.7em 0.3em;\n}\n.highlights .radio-station[data-v-0a7d493c] {\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n  padding: 0.35em 0.6em;\n}\n.highlights .radio-station[data-v-0a7d493c]:hover {\n  background-color: rgba(223, 223, 223, 0.226);\n}\n.highlights .radio-station__cover[data-v-0a7d493c] {\n  margin-right: 0.5em;\n}\n.highlights .radio-station__cover .img[data-v-0a7d493c] {\n  border-radius: 5px;\n}\n.highlights .radio-station__details[data-v-0a7d493c] {\n  display: flex;\n  align-items: center;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/layout/Sidebar.vue?vue&type=style&index=0&id=1d1322ec&lang=scss&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/layout/Sidebar.vue?vue&type=style&index=0&id=1d1322ec&lang=scss&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".theme-switch[data-v-1d1322ec] {\n  position: absolute;\n  bottom: 65px;\n  transform: scale(0.9);\n}\n.list[data-v-1d1322ec] {\n  height: 80%;\n  overflow-y: auto;\n  background: linear-gradient(var(--light-theme-panel-bg-color) 33%, rgba(41, 38, 54, 0)), linear-gradient(rgba(41, 38, 54, 0), var(--light-theme-panel-bg-color) 66%) 0 100%, radial-gradient(farthest-side at 50% 0, rgba(148, 148, 148, 0.5), rgba(0, 0, 0, 0)), radial-gradient(farthest-side at 50% 100%, rgba(148, 148, 148, 0.5), rgba(0, 0, 0, 0)) 0 100%;\n  background-color: var(--light-theme-panel-bg-color);\n  background-repeat: no-repeat;\n  background-attachment: local, local, scroll, scroll;\n  background-size: 100% 45px, 100% 45px, 100% 15px, 100% 15px;\n}\n@media (max-height: 950px) {\n.list[data-v-1d1322ec] {\n    height: 75%;\n}\n}\n@media (max-height: 750px) {\n.list[data-v-1d1322ec] {\n    height: 70%;\n}\n}\n@media (max-height: 650px) {\n.list[data-v-1d1322ec] {\n    height: 65%;\n}\n}\n@media (max-height: 550px) {\n.list[data-v-1d1322ec] {\n    height: 60%;\n}\n}\n@media (max-height: 500px) {\n.list[data-v-1d1322ec] {\n    height: 55%;\n}\n}\n.player--dark .list[data-v-1d1322ec] {\n  background: linear-gradient(var(--dark-theme-panel-bg-color) 33%, rgba(41, 38, 54, 0)), linear-gradient(rgba(41, 38, 54, 0), var(--dark-theme-panel-bg-color) 66%) 0 100%, radial-gradient(farthest-side at 50% 0, rgba(148, 148, 148, 0.5), rgba(0, 0, 0, 0)), radial-gradient(farthest-side at 50% 100%, rgba(148, 148, 148, 0.5), rgba(0, 0, 0, 0)) 0 100%;\n  background-color: var(--dark-theme-panel-bg-color);\n  background-repeat: no-repeat;\n  background-attachment: local, local, scroll, scroll;\n  background-size: 100% 45px, 100% 45px, 100% 15px, 100% 15px;\n}\n.list-group[data-v-1d1322ec] {\n  height: 95%;\n}\n.install-pwa-button-container[data-v-1d1322ec] {\n  display: flex;\n  justify-content: center;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/AccountSettings.vue?vue&type=style&index=0&id=f56202bc&lang=scss&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/pages/AccountSettings.vue?vue&type=style&index=0&id=f56202bc&lang=scss&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".account-settings-container[data-v-f56202bc] {\n  max-width: 1000px;\n}\n.user-plan[data-v-f56202bc] {\n  padding: 0.5em;\n}\n.user-plan__features ul[data-v-f56202bc] {\n  list-style: none;\n  padding: 1em;\n  padding-left: 0.3em;\n}\n.user-plan__features ul li[data-v-f56202bc] {\n  padding: 0.1em 0.2em;\n  display: flex;\n}\n.user-plan__features__title[data-v-f56202bc] {\n  font-size: 1.1em;\n  font-weight: 600;\n}\n.user-plan__header[data-v-f56202bc] {\n  padding: 1em 0.4em;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/Artist.vue?vue&type=style&index=0&lang=scss&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/pages/Artist.vue?vue&type=style&index=0&lang=scss& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".singles img {\n  max-width: 50px;\n}\n.latest > * {\n  max-width: 11rem;\n}\n.singles,\n.latest,\n.popular-songs,\n.albums {\n  margin-bottom: 2rem;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/CustomPage.vue?vue&type=style&index=0&id=32a6d544&lang=scss&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/pages/CustomPage.vue?vue&type=style&index=0&id=32a6d544&lang=scss&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#page-404-container .content-svg[data-v-32a6d544] {\n  font: 13.5em \"Monoton\";\n  width: 100%;\n  height: 180px;\n}\n#page-404-container .content[data-v-32a6d544] {\n  text-align: center;\n  height: 66vh;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n#page-404-container .content-title[data-v-32a6d544] {\n  text-align: center;\n  font-weight: bold;\n  color: grey;\n  opacity: 0.6;\n}\n#page-404-container a[data-v-32a6d544] {\n  display: inline-block;\n  text-transform: uppercase;\n  font-size: 1em \"Roboto\";\n  font-weight: 300;\n  border: 1px solid var(--color-primary);\n  border-radius: 4px;\n  color: var(--color-primary);\n  margin: 20px 0;\n  padding: 8px 14px;\n  text-decoration: none;\n  opacity: 0.6;\n}\n#page-404-container .text[data-v-32a6d544] {\n  fill: none;\n  stroke: white;\n  stroke-dasharray: 8% 29%;\n  stroke-width: 5px;\n  stroke-dashoffset: 1%;\n  -webkit-animation: stroke-offset-data-v-32a6d544 5.5s infinite linear;\n          animation: stroke-offset-data-v-32a6d544 5.5s infinite linear;\n}\n#page-404-container .text[data-v-32a6d544]:nth-child(1) {\n  stroke: var(--color-secondary);\n  -webkit-animation-delay: -1;\n          animation-delay: -1;\n}\n#page-404-container .text[data-v-32a6d544]:nth-child(2) {\n  stroke: var(--color-secondary);\n  -webkit-animation-delay: -2s;\n          animation-delay: -2s;\n}\n#page-404-container .text[data-v-32a6d544]:nth-child(3) {\n  stroke: var(--color-primary);\n  -webkit-animation-delay: -3s;\n          animation-delay: -3s;\n}\n#page-404-container .text[data-v-32a6d544]:nth-child(4) {\n  stroke: var(--color-primary);\n  -webkit-animation-delay: -4s;\n          animation-delay: -4s;\n}\n#page-404-container .text[data-v-32a6d544]:nth-child(5) {\n  stroke: var(--color-primary);\n  -webkit-animation-delay: -5s;\n          animation-delay: -5s;\n}\n@-webkit-keyframes stroke-offset-data-v-32a6d544 {\n100% {\n    stroke-dashoffset: -35%;\n}\n}\n@keyframes stroke-offset-data-v-32a6d544 {\n100% {\n    stroke-dashoffset: -35%;\n}\n}\n.icon-header .cover[data-v-32a6d544] {\n  background: linear-gradient(45deg, var(--color-secondary), var(--color-primary));\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/Podcast.vue?vue&type=style&index=0&id=77eca436&lang=scss&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/pages/Podcast.vue?vue&type=style&index=0&id=77eca436&lang=scss&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".podcast-container[data-v-77eca436] {\n  padding: 2em;\n}\n@media (max-width: 700px) {\n.podcast-container[data-v-77eca436] {\n    padding: 0.2em;\n}\n}\n.podcast__info[data-v-77eca436] {\n  display: flex;\n}\n.podcast__description-sm[data-v-77eca436] {\n  padding-top: 1em;\n}\n@media (min-width: 1400px) {\n.podcast__description-sm[data-v-77eca436] {\n    display: none;\n}\n}\n@media (max-width: 1401px) {\n.podcast__description-lg[data-v-77eca436] {\n    display: none;\n}\n}\n.podcast__title[data-v-77eca436] {\n  font-size: 1.3em;\n  font-weight: bold;\n}\n.podcast__text[data-v-77eca436] {\n  padding: 0.4em 1em;\n}\n.podcast__text .info-badge[data-v-77eca436] {\n  font-size: 0.8em;\n  letter-spacing: 2px;\n}\n.podcast__text__title[data-v-77eca436] {\n  font-size: 2em;\n  line-height: 2.3;\n}\n@media (max-width: 700px) {\n.podcast__text__title[data-v-77eca436] {\n    font-size: 1.3em;\n}\n}\n.podcast__actions[data-v-77eca436] {\n  display: flex;\n  padding: 2em 0;\n}\n.podcast__actions > *[data-v-77eca436] {\n  margin-right: 2em;\n}\n.podcast__cover[data-v-77eca436] {\n  min-width: 250px;\n}\n.podcast__cover__img[data-v-77eca436] {\n  border-radius: 7px;\n}\n@media (max-width: 700px) {\n.podcast__cover[data-v-77eca436] {\n    min-width: 200px;\n}\n}\n@media (max-width: 500px) {\n.podcast__cover[data-v-77eca436] {\n    min-width: 150px;\n}\n}\n.podcast__episodes .episodes .episode[data-v-77eca436] {\n  display: flex;\n  cursor: pointer;\n  background-color: var(--light-theme-panel-bg-color);\n  margin: 0 1em 1.6em 0;\n  padding: 0.7em;\n}\n@media (max-width: 700px) {\n.podcast__episodes .episodes .episode[data-v-77eca436] {\n    flex-direction: column;\n}\n}\n.podcast__episodes .episodes .episode__cover[data-v-77eca436] {\n  padding: 0.3em;\n}\n.podcast__episodes .episodes .episode__cover__img[data-v-77eca436] {\n  border-radius: 6px;\n}\n.podcast__episodes .episodes .episode__body[data-v-77eca436] {\n  padding: 0.2em 0.5em;\n  flex-grow: 1;\n}\n.podcast__episodes .episodes .episode-header[data-v-77eca436] {\n  display: flex;\n}\n.podcast__episodes .episodes .episode-header .infos[data-v-77eca436] {\n  flex-grow: 999;\n}\n.podcast__episodes .episodes .episode-header .infos .title[data-v-77eca436] {\n  display: flex;\n  align-items: center;\n  padding-left: 2em;\n  position: relative;\n}\n@media (max-width: 700px) {\n.podcast__episodes .episodes .episode-header .infos .title[data-v-77eca436] {\n    padding-left: 0em;\n}\n}\n.podcast__episodes .episodes .episode-header .infos .title__title[data-v-77eca436] {\n  font-size: 1.18rem;\n  font-weight: bold;\n}\n.podcast__episodes .episodes .episode-header .infos .times[data-v-77eca436] {\n  display: flex;\n  padding: 0.6em 0;\n}\n.podcast__episodes .episodes .episode-header .infos .times .created_at[data-v-77eca436] {\n  opacity: 0.8;\n  font-size: 0.8em;\n  margin-right: 0.6em;\n}\n.podcast__episodes .episodes .episode-header .infos .times .duration[data-v-77eca436] {\n  font-size: 0.8em;\n}\n.podcast__episodes .episodes .episode-header .icons .icon-download[data-v-77eca436] {\n  width: 1.4em;\n}\n.podcast__episodes .episodes .episode-body[data-v-77eca436] {\n  padding: 0.4em 0.2em;\n}\n.podcast__episodes .episodes .episode-body .description[data-v-77eca436] {\n  color: rgba(141, 141, 141, 0.719);\n}\n.podcast__episodes .episodes .episode .icon[data-v-77eca436] {\n  width: 2em;\n  left: 0;\n  position: absolute;\n}\n.podcast__episodes .episodes .episode .icon__play[data-v-77eca436] {\n  display: none;\n}\n@media (max-width: 700px) {\n.podcast__episodes .episodes .episode .icon[data-v-77eca436] {\n    display: none;\n}\n}\n.podcast__episodes .episodes .episode .icon-inside-cover[data-v-77eca436] {\n  width: 100%;\n  left: 0;\n  display: flex;\n  align-items: center;\n  position: absolute;\n  justify-content: center;\n}\n.podcast__episodes .episodes .episode .icon-inside-cover .epico_music-is-playing-container[data-v-77eca436] {\n  margin-left: unset;\n}\n.podcast__episodes .episodes .episode .icon-inside-cover .epico_music-is-playing-container > span[data-v-77eca436] {\n  width: 6px;\n  background-color: white;\n  margin-top: auto;\n  height: 80%;\n}\n@media (min-width: 699px) {\n.podcast__episodes .episodes .episode .icon-inside-cover[data-v-77eca436] {\n    display: none;\n}\n}\n.podcast__episodes .episodes .episode:hover .icon__access-point[data-v-77eca436] {\n  display: none;\n}\n.podcast__episodes .episodes .episode:hover .icon__play[data-v-77eca436] {\n  display: initial;\n}\n.player--dark .podcast-main-wrapper .episodes .episode[data-v-77eca436] {\n  background-color: var(--dark-theme-panel-bg-color);\n}\n@media (max-width: 700px) {\n.hide-under-700[data-v-77eca436] {\n    display: none;\n}\n}\n@media (min-width: 699px) {\n.hide-above-699[data-v-77eca436] {\n    display: none;\n}\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/Song.vue?vue&type=style&index=0&id=ac304a5a&lang=scss&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/pages/Song.vue?vue&type=style&index=0&id=ac304a5a&lang=scss&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".delete[data-v-ac304a5a] {\n  display: flex;\n  justify-content: center;\n  padding-top: 1.2em;\n}\n.song-page-container[data-v-ac304a5a] {\n  margin: -12px;\n  padding-bottom: 3em;\n}\n.song-page-container .other-actions[data-v-ac304a5a] {\n  position: absolute;\n  right: 3em;\n  top: 0;\n  z-index: 3;\n  transform: translateY(-50%);\n}\n.song-page-container .main[data-v-ac304a5a] {\n  position: relative;\n  padding: 2em 1em;\n  padding-top: 3em;\n}\n.song-page-container .main .stats[data-v-ac304a5a] {\n  display: flex;\n  font-size: 2em;\n  opacity: 0.8;\n  justify-content: center;\n}\n.song-page-container .main .stats .plays[data-v-ac304a5a] {\n  margin: 0 2em;\n}\n.song-page-container .main .links[data-v-ac304a5a] {\n  justify-content: center;\n  margin-top: -2em;\n}\n.song-page-container .main .links .link[data-v-ac304a5a] {\n  margin: 0 1em;\n}\n.song-page-container .main .play-button[data-v-ac304a5a] {\n  width: 8%;\n  min-width: 4.5em;\n  position: absolute;\n  max-width: 8em;\n  left: 3em;\n  top: 0;\n  z-index: 3;\n  transform: translateY(-50%);\n}\n.song-page-container .main .play-button .svg-image[data-v-ac304a5a] {\n  width: 100%;\n  z-index: 1;\n}\n.song-page-container .main .play-button .back-layer[data-v-ac304a5a] {\n  width: 5em;\n  height: 5em;\n  z-index: -1;\n  border-radius: 50%;\n  background-color: white;\n}\n@media (max-width: 1400px) {\n.song-page-container .main .play-button .back-layer[data-v-ac304a5a] {\n    width: 3em;\n    height: 3em;\n}\n}\n.song-page-container .cover-img[data-v-ac304a5a] {\n  height: 50vh;\n  overflow: hidden;\n  position: relative;\n}\n.song-page-container .cover-img .song-info[data-v-ac304a5a] {\n  position: absolute;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  bottom: 0;\n  top: 0;\n  left: 0;\n  padding-left: 3em;\n  z-index: 2;\n  color: white;\n  right: 0;\n}\n.song-page-container .cover-img .song-info .genre[data-v-ac304a5a] {\n  background: #fff;\n  color: #000;\n  display: inline-block;\n  text-transform: uppercase;\n  border-radius: 0.2rem;\n  font-weight: 600;\n  margin-right: 1em;\n  font-size: 0.8em;\n  padding: 0 0.6em;\n}\n.song-page-container .cover-img .song-info .song-title[data-v-ac304a5a] {\n  font-weight: bold;\n  font-size: 4.5em;\n}\n@media screen and (max-width: 1400px) {\n.song-page-container .cover-img .song-info .song-title[data-v-ac304a5a] {\n    font-size: 3em;\n}\n}\n.song-page-container .cover-img .song-info .song-artist[data-v-ac304a5a] {\n  font-weight: 400;\n  font-size: 3.5em;\n}\n.song-page-container .cover-img .actions[data-v-ac304a5a] {\n  position: absolute;\n  top: 5%;\n  z-index: 4;\n  right: 4%;\n  display: flex;\n  align-items: center;\n}\n.song-page-container .cover-img .actions > *[data-v-ac304a5a] {\n  padding: 0 0.3em;\n}\n.song-page-container .cover-img .overlay[data-v-ac304a5a] {\n  position: absolute;\n  bottom: 0;\n  top: 0;\n  left: 0;\n  right: 0;\n  z-index: 1;\n  background: black;\n  background: linear-gradient(0deg, rgba(0, 0, 0, 0.9023984594) 0%, rgba(0, 0, 0, 0.650297619) 33%, rgba(0, 0, 0, 0.3253676471) 100%);\n}\n.song-page-container .cover-img .cover-background[data-v-ac304a5a] {\n  width: 100%;\n  transform: translateY(-20%);\n  filter: blur(2px);\n}\n@media screen and (max-width: 1000px) {\n.song-page-container .cover-img .cover-background[data-v-ac304a5a] {\n    transform: translateY(-3%);\n}\n}\n.song-page-container .cover[data-v-ac304a5a] {\n  width: 100px;\n  border-radius: 15px;\n  top: 20px;\n  position: absolute;\n}\n@media screen and (max-width: 550px) {\n.song-page-container .cover[data-v-ac304a5a] {\n    display: none;\n}\n}\n.player--dark .song-page-container .main .play-button .back-layer[data-v-ac304a5a] {\n  background-color: black;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/UserProfile.vue?vue&type=style&index=0&id=d7c81ae0&lang=scss&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/pages/UserProfile.vue?vue&type=style&index=0&id=d7c81ae0&lang=scss&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".artists-container[data-v-d7c81ae0] {\n  display: flex;\n  flex-wrap: wrap;\n}\n.artists-container > *[data-v-d7c81ae0] {\n  flex-basis: 20%;\n  max-width: 12em;\n}\n.followed-playlists .playlists-container[data-v-d7c81ae0] {\n  display: flex;\n  flex-wrap: wrap;\n}\n.followed-playlists .playlists-container > *[data-v-d7c81ae0] {\n  flex-basis: 25%;\n  max-width: 12em;\n}\n.profile-main-content > *[data-v-d7c81ae0] {\n  margin-bottom: 2.5em;\n}\n#unfriend_button #friends_no_friends[data-v-d7c81ae0] {\n  display: none;\n}\n#unfriend_button:hover #friends_are_friends[data-v-d7c81ae0] {\n  display: none;\n}\n#unfriend_button:hover #friends_no_friends[data-v-d7c81ae0] {\n  display: initial;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/elements/PlayerSearchbar.vue?vue&type=style&index=0&id=4d9d709d&lang=scss&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/elements/PlayerSearchbar.vue?vue&type=style&index=0&id=4d9d709d&lang=scss&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--8-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./PlayerSearchbar.vue?vue&type=style&index=0&id=4d9d709d&lang=scss&scoped=true& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/elements/PlayerSearchbar.vue?vue&type=style&index=0&id=4d9d709d&lang=scss&scoped=true&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/ShareLinks.vue?vue&type=style&index=0&id=1e8af86d&lang=scss&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/ShareLinks.vue?vue&type=style&index=0&id=1e8af86d&lang=scss&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--8-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ShareLinks.vue?vue&type=style&index=0&id=1e8af86d&lang=scss&scoped=true& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/ShareLinks.vue?vue&type=style&index=0&id=1e8af86d&lang=scss&scoped=true&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/layout/Master.vue?vue&type=style&index=0&lang=scss&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/layout/Master.vue?vue&type=style&index=0&lang=scss& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Master.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/layout/Master.vue?vue&type=style&index=0&lang=scss&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/layout/Navbar.vue?vue&type=style&index=0&id=ad65455c&lang=scss&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/layout/Navbar.vue?vue&type=style&index=0&id=ad65455c&lang=scss&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Navbar.vue?vue&type=style&index=0&id=ad65455c&lang=scss&scoped=true& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/layout/Navbar.vue?vue&type=style&index=0&id=ad65455c&lang=scss&scoped=true&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/layout/RightSidebar.vue?vue&type=style&index=0&id=0a7d493c&lang=scss&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/layout/RightSidebar.vue?vue&type=style&index=0&id=0a7d493c&lang=scss&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./RightSidebar.vue?vue&type=style&index=0&id=0a7d493c&lang=scss&scoped=true& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/layout/RightSidebar.vue?vue&type=style&index=0&id=0a7d493c&lang=scss&scoped=true&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/layout/Sidebar.vue?vue&type=style&index=0&id=1d1322ec&lang=scss&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/layout/Sidebar.vue?vue&type=style&index=0&id=1d1322ec&lang=scss&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Sidebar.vue?vue&type=style&index=0&id=1d1322ec&lang=scss&scoped=true& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/layout/Sidebar.vue?vue&type=style&index=0&id=1d1322ec&lang=scss&scoped=true&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/AccountSettings.vue?vue&type=style&index=0&id=f56202bc&lang=scss&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/pages/AccountSettings.vue?vue&type=style&index=0&id=f56202bc&lang=scss&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./AccountSettings.vue?vue&type=style&index=0&id=f56202bc&lang=scss&scoped=true& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/AccountSettings.vue?vue&type=style&index=0&id=f56202bc&lang=scss&scoped=true&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/Artist.vue?vue&type=style&index=0&lang=scss&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/pages/Artist.vue?vue&type=style&index=0&lang=scss& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Artist.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/Artist.vue?vue&type=style&index=0&lang=scss&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/CustomPage.vue?vue&type=style&index=0&id=32a6d544&lang=scss&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/pages/CustomPage.vue?vue&type=style&index=0&id=32a6d544&lang=scss&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./CustomPage.vue?vue&type=style&index=0&id=32a6d544&lang=scss&scoped=true& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/CustomPage.vue?vue&type=style&index=0&id=32a6d544&lang=scss&scoped=true&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/Podcast.vue?vue&type=style&index=0&id=77eca436&lang=scss&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/pages/Podcast.vue?vue&type=style&index=0&id=77eca436&lang=scss&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Podcast.vue?vue&type=style&index=0&id=77eca436&lang=scss&scoped=true& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/Podcast.vue?vue&type=style&index=0&id=77eca436&lang=scss&scoped=true&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/Song.vue?vue&type=style&index=0&id=ac304a5a&lang=scss&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/pages/Song.vue?vue&type=style&index=0&id=ac304a5a&lang=scss&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Song.vue?vue&type=style&index=0&id=ac304a5a&lang=scss&scoped=true& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/Song.vue?vue&type=style&index=0&id=ac304a5a&lang=scss&scoped=true&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/UserProfile.vue?vue&type=style&index=0&id=d7c81ae0&lang=scss&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/pages/UserProfile.vue?vue&type=style&index=0&id=d7c81ae0&lang=scss&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserProfile.vue?vue&type=style&index=0&id=d7c81ae0&lang=scss&scoped=true& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/UserProfile.vue?vue&type=style&index=0&id=d7c81ae0&lang=scss&scoped=true&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dialogs/EditPlaylist.vue?vue&type=template&id=36326e4b&":
/*!******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/dialogs/EditPlaylist.vue?vue&type=template&id=36326e4b& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************/
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
  return _c("dialog-wrapper", [
    _c("div", { staticClass: "create-playlist-wrapper" }, [
      _c("div", { staticClass: "create-playlist-wrapper__header" }, [
        _c("div", { staticClass: "title" }, [
          _vm._v(
            "\n                " +
              _vm._s(_vm.$t("Edit Playlist")) +
              "\n            "
          ),
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "buttons" },
          [
            _c(
              "v-btn",
              {
                staticClass: "primary create",
                attrs: { small: "", rounded: "", disabled: _vm.isLoading },
                on: {
                  click: function ($event) {
                    return _vm.validateAndCreatePlaylist()
                  },
                },
              },
              [
                _vm._v(
                  "\n                    " +
                    _vm._s(_vm.$t("Save")) +
                    "\n                "
                ),
              ]
            ),
            _vm._v(" "),
            _c(
              "v-btn",
              {
                staticClass: "secondary cancel ml-2",
                attrs: { small: "", rounded: "" },
                on: {
                  click: function ($event) {
                    return _vm.$emit("cancel")
                  },
                },
              },
              [
                _vm._v(
                  "\n                    " +
                    _vm._s(_vm.$t("Cancel")) +
                    "\n                "
                ),
              ]
            ),
          ],
          1
        ),
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "create-playlist-wrapper__body" },
        [
          _c(
            "v-container",
            [
              _c(
                "v-row",
                [
                  _c(
                    "v-col",
                    { staticClass: "max-width-175", attrs: { cols: "auto" } },
                    [
                      _c("upload-image", {
                        attrs: { source: this.editedPlaylist.cover },
                        on: {
                          imageReady: function ($event) {
                            return _vm.imageUploaded($event)
                          },
                        },
                      }),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-col",
                    [
                      _c(
                        "v-row",
                        [
                          _c(
                            "v-col",
                            { attrs: { cols: "12" } },
                            [
                              _c("v-text-field", {
                                attrs: { label: _vm.$t("Name") },
                                model: {
                                  value: _vm.editedPlaylist.title,
                                  callback: function ($$v) {
                                    _vm.$set(_vm.editedPlaylist, "title", $$v)
                                  },
                                  expression: "editedPlaylist.title",
                                },
                              }),
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-col",
                            { attrs: { cols: "12" } },
                            [
                              _vm.hasPermission("Publish playlists")
                                ? _c("v-switch", {
                                    attrs: { label: _vm.$t("Public") },
                                    model: {
                                      value: _vm.editedPlaylist.public,
                                      callback: function ($$v) {
                                        _vm.$set(
                                          _vm.editedPlaylist,
                                          "public",
                                          $$v
                                        )
                                      },
                                      expression: "editedPlaylist.public",
                                    },
                                  })
                                : _vm._e(),
                            ],
                            1
                          ),
                        ],
                        1
                      ),
                    ],
                    1
                  ),
                ],
                1
              ),
            ],
            1
          ),
        ],
        1
      ),
    ]),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dialogs/Share.vue?vue&type=template&id=891e89c0&":
/*!***********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/dialogs/Share.vue?vue&type=template&id=891e89c0& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************/
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
    "v-card",
    { class: { "dark-background": _vm.$vuetify.theme.dark } },
    [
      _c("v-card-title", [
        _vm._v("\n        " + _vm._s(_vm.$t("Share")) + "\n    "),
      ]),
      _vm._v(" "),
      _c("v-card-text", [
        _c("div", { staticClass: "d-flex" }, [
          _c(
            "div",
            { staticClass: "cover" },
            [
              _c("v-img", {
                staticClass: "asset-shadow",
                attrs: { width: "150", height: "150", src: _vm.item.cover },
              }),
            ],
            1
          ),
          _vm._v(" "),
          _c("div", { staticClass: "details pl-4" }, [
            _c("div", {
              staticClass: "title",
              domProps: { textContent: _vm._s(_vm.item.title) },
            }),
            _vm._v(" "),
            _c("div", {
              staticClass: "artist",
              domProps: { textContent: _vm._s(_vm.item.artist) },
            }),
          ]),
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "url pt-5" }, [
          _c(
            "div",
            { staticClass: "align-center" },
            [
              _c("v-text-field", {
                attrs: {
                  outlined: "",
                  readonly: "",
                  label: _vm.$t("Link"),
                  dense: "",
                  "hide-details": "",
                  value: _vm.item.url,
                },
              }),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "px-2" },
                [
                  _c(
                    "v-btn",
                    {
                      staticClass: "primary",
                      attrs: { small: "" },
                      on: {
                        click: function ($event) {
                          return _vm.copyToClipboard(_vm.item.url)
                        },
                      },
                    },
                    [
                      _c(
                        "v-icon",
                        {
                          attrs: {
                            left: "",
                            title: _vm.$t("Copy to clipboard"),
                          },
                        },
                        [_vm._v("$vuetify.icons.clipboard-outline")]
                      ),
                      _vm._v(
                        "\n                        " + _vm._s(_vm.$t("Copy"))
                      ),
                    ],
                    1
                  ),
                ],
                1
              ),
            ],
            1
          ),
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "social-links pt-5" },
          [_c("ShareLinks", { attrs: { item: _vm.item } })],
          1
        ),
      ]),
      _vm._v(" "),
      _c(
        "v-card-actions",
        [
          _c(
            "v-btn",
            {
              attrs: { text: "", small: "" },
              on: {
                click: function ($event) {
                  return _vm.$emit("close")
                },
              },
            },
            [_vm._v(_vm._s(_vm.$t("Cancel")))]
          ),
        ],
        1
      ),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/elements/PlayerSearchbar.vue?vue&type=template&id=4d9d709d&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/elements/PlayerSearchbar.vue?vue&type=template&id=4d9d709d&scoped=true& ***!
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
  return _c("div", { staticClass: "searchbar-wrapper" }, [
    _c(
      "div",
      { staticClass: "searchbar" },
      [
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.keyword,
              expression: "keyword",
            },
          ],
          staticClass: "searchbar_input m_input",
          attrs: { type: "text", placeholder: _vm.$t("Search") },
          domProps: { value: _vm.keyword },
          on: {
            click: function ($event) {
              $event.stopPropagation()
              _vm.showResultPanel = true
            },
            input: [
              function ($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.keyword = $event.target.value
              },
              function ($event) {
                return _vm.search()
              },
            ],
          },
        }),
        _vm._v(" "),
        _c(
          "v-icon",
          { staticClass: "style-search-icon", attrs: { light: "" } },
          [_vm._v("$vuetify.icons.magnify")]
        ),
      ],
      1
    ),
    _vm._v(" "),
    _vm.showResultPanel
      ? _c(
          "div",
          {
            staticClass: "search-panel",
            on: {
              click: function ($event) {
                $event.stopPropagation()
              },
            },
          },
          [
            _c(
              "v-bottom-navigation",
              {
                staticClass: "searchbar-bottom-nav",
                attrs: { shift: "" },
                model: {
                  value: _vm.menuItem,
                  callback: function ($$v) {
                    _vm.menuItem = $$v
                  },
                  expression: "menuItem",
                },
              },
              [
                _c(
                  "v-btn",
                  [
                    _c("span", [_vm._v(_vm._s(_vm.$t("Top")))]),
                    _vm._v(" "),
                    _c("v-icon", [
                      _vm._v("$vuetify.icons.feature-search-outline"),
                    ]),
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "v-btn",
                  [
                    _c("span", [_vm._v(_vm._s(_vm.$t("Songs")))]),
                    _vm._v(" "),
                    _c("v-icon", [_vm._v("$vuetify.icons.music-note")]),
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "v-btn",
                  [
                    _c("span", [_vm._v(_vm._s(_vm.$t("Albums")))]),
                    _vm._v(" "),
                    _c("v-icon", [_vm._v("$vuetify.icons.album")]),
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "v-btn",
                  [
                    _c("span", [_vm._v(_vm._s(_vm.$t("Artists")))]),
                    _vm._v(" "),
                    _c("v-icon", [_vm._v("$vuetify.icons.account-music")]),
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "v-btn",
                  [
                    _c("span", [_vm._v(_vm._s(_vm.$t("Users")))]),
                    _vm._v(" "),
                    _c("v-icon", [_vm._v("$vuetify.icons.account")]),
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "v-btn",
                  [
                    _c("span", [_vm._v(_vm._s(_vm.$t("Playlists")))]),
                    _vm._v(" "),
                    _c("v-icon", [
                      _vm._v("$vuetify.icons.playlist-music-outline"),
                    ]),
                  ],
                  1
                ),
                _vm._v(" "),
                _vm.$store.getters.getSettings.enablePodcasts
                  ? _c(
                      "v-btn",
                      [
                        _c("span", [_vm._v(_vm._s(_vm.$t("Podcasts")))]),
                        _vm._v(" "),
                        _c("v-icon", [_vm._v("$vuetify.icons.microphone")]),
                      ],
                      1
                    )
                  : _vm._e(),
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "search-results-container" },
              [
                _vm.loading
                  ? [_c("page-loading", { attrs: { height: "18vh" } })]
                  : _vm.currentPage === "top"
                  ? [
                      _vm.searchResults &&
                      _vm.searchResults.radioStations.length
                        ? _c("div", { staticClass: "search-category" }, [
                            _c("div", { staticClass: "category-title" }, [
                              _vm._v(
                                "\n                        " +
                                  _vm._s(_vm.$t("Radio Stations")) +
                                  "\n                    "
                              ),
                            ]),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "category-results" },
                              _vm._l(
                                _vm.searchResults.radioStations.slice(0, 3),
                                function (radioStation) {
                                  return _c(
                                    "div",
                                    {
                                      key: radioStation.id,
                                      staticClass: "search-result",
                                      on: {
                                        click: function ($event) {
                                          $event.stopPropagation()
                                          return _vm.$store.dispatch(
                                            "playRadioStation",
                                            {
                                              radioStation: radioStation,
                                            }
                                          )
                                        },
                                      },
                                    },
                                    [
                                      _c(
                                        "div",
                                        { staticClass: "cover" },
                                        [
                                          _c("v-img", {
                                            attrs: {
                                              src: radioStation.cover,
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
                                                        "content-placeholders",
                                                        {
                                                          attrs: {
                                                            rounded: true,
                                                          },
                                                        },
                                                        [
                                                          _c(
                                                            "content-placeholders-img",
                                                            {
                                                              staticClass:
                                                                "small-image-skeleton",
                                                            }
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
                                          }),
                                        ],
                                        1
                                      ),
                                      _vm._v(" "),
                                      _c("div", { staticClass: "body" }, [
                                        _c(
                                          "div",
                                          { staticClass: "asset-title" },
                                          [
                                            _vm._v(
                                              "\n                                    " +
                                                _vm._s(radioStation.name) +
                                                "\n                                "
                                            ),
                                          ]
                                        ),
                                      ]),
                                    ]
                                  )
                                }
                              ),
                              0
                            ),
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.searchResults && _vm.searchResults.songs.length
                        ? _c("div", { staticClass: "search-category" }, [
                            _c("div", { staticClass: "category-title" }, [
                              _vm._v(
                                "\n                        " +
                                  _vm._s(_vm.$t("Songs")) +
                                  "\n                    "
                              ),
                            ]),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "category-results" },
                              _vm._l(
                                _vm.searchResults.songs.slice(0, 3),
                                function (song) {
                                  return _c(
                                    "div",
                                    {
                                      key: song.id,
                                      staticClass: "search-result",
                                      on: {
                                        click: function ($event) {
                                          $event.stopPropagation()
                                          return _vm.goToSearchRoute({
                                            id: song.id,
                                            name: "song",
                                          })
                                        },
                                      },
                                    },
                                    [
                                      _c(
                                        "div",
                                        { staticClass: "cover" },
                                        [
                                          _c("v-img", {
                                            attrs: {
                                              src: song.cover,
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
                                                        "content-placeholders",
                                                        {
                                                          attrs: {
                                                            rounded: true,
                                                          },
                                                        },
                                                        [
                                                          _c(
                                                            "content-placeholders-img",
                                                            {
                                                              staticClass:
                                                                "small-image-skeleton",
                                                            }
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
                                          }),
                                        ],
                                        1
                                      ),
                                      _vm._v(" "),
                                      _c("div", { staticClass: "body" }, [
                                        _c(
                                          "div",
                                          { staticClass: "asset-title" },
                                          [
                                            _vm._v(
                                              "\n                                    " +
                                                _vm._s(song.title) +
                                                "\n                                "
                                            ),
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          { staticClass: "asset-artists" },
                                          [
                                            _vm._v(
                                              "\n                                    " +
                                                _vm._s(
                                                  _vm.getArtists(song.artists)
                                                ) +
                                                "\n                                "
                                            ),
                                          ]
                                        ),
                                      ]),
                                    ]
                                  )
                                }
                              ),
                              0
                            ),
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.searchResults && _vm.searchResults.artists.length
                        ? _c("div", { staticClass: "search-category" }, [
                            _c("div", { staticClass: "category-title" }, [
                              _vm._v(
                                "\n                        " +
                                  _vm._s(_vm.$t("Artists")) +
                                  "\n                    "
                              ),
                            ]),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "category-results" },
                              _vm._l(
                                _vm.searchResults.artists.slice(0, 3),
                                function (artist) {
                                  return _c(
                                    "div",
                                    {
                                      key: artist.id,
                                      staticClass: "search-result",
                                      on: {
                                        click: function ($event) {
                                          $event.stopPropagation()
                                          return _vm.goToSearchRoute({
                                            id: artist.id,
                                            name: "artist",
                                          })
                                        },
                                      },
                                    },
                                    [
                                      _c(
                                        "div",
                                        { staticClass: "cover" },
                                        [
                                          _c("v-img", {
                                            attrs: {
                                              src: artist.avatar,
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
                                                        "content-placeholders",
                                                        {
                                                          attrs: {
                                                            rounded: true,
                                                          },
                                                        },
                                                        [
                                                          _c(
                                                            "content-placeholders-img",
                                                            {
                                                              staticClass:
                                                                "small-image-skeleton",
                                                            }
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
                                          }),
                                        ],
                                        1
                                      ),
                                      _vm._v(" "),
                                      _c("div", { staticClass: "body" }, [
                                        artist
                                          ? _c(
                                              "div",
                                              { staticClass: "asset-title" },
                                              [
                                                _vm._v(
                                                  "\n                                    " +
                                                    _vm._s(artist.displayname) +
                                                    "\n                                "
                                                ),
                                              ]
                                            )
                                          : _vm._e(),
                                      ]),
                                    ]
                                  )
                                }
                              ),
                              0
                            ),
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.searchResults && _vm.searchResults.albums.length
                        ? _c("div", { staticClass: "search-category" }, [
                            _c("div", { staticClass: "category-title" }, [
                              _vm._v(
                                "\n                        " +
                                  _vm._s(_vm.$t("Albums")) +
                                  "\n                    "
                              ),
                            ]),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "category-results" },
                              _vm._l(
                                _vm.searchResults.albums.slice(0, 3),
                                function (album) {
                                  return _c(
                                    "div",
                                    {
                                      key: album.id,
                                      staticClass: "search-result",
                                      on: {
                                        click: function ($event) {
                                          $event.stopPropagation()
                                          return _vm.goToSearchRoute({
                                            id: album.id,
                                            name: "album",
                                          })
                                        },
                                      },
                                    },
                                    [
                                      _c(
                                        "div",
                                        { staticClass: "cover" },
                                        [
                                          _c("v-img", {
                                            attrs: {
                                              src: album.cover,
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
                                                        "content-placeholders",
                                                        {
                                                          attrs: {
                                                            rounded: true,
                                                          },
                                                        },
                                                        [
                                                          _c(
                                                            "content-placeholders-img",
                                                            {
                                                              staticClass:
                                                                "small-image-skeleton",
                                                            }
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
                                          }),
                                        ],
                                        1
                                      ),
                                      _vm._v(" "),
                                      _c("div", { staticClass: "body" }, [
                                        _c(
                                          "div",
                                          { staticClass: "asset-title" },
                                          [
                                            _vm._v(
                                              "\n                                    " +
                                                _vm._s(album.title) +
                                                "\n                                "
                                            ),
                                          ]
                                        ),
                                        _vm._v(" "),
                                        album.artist
                                          ? _c(
                                              "div",
                                              { staticClass: "asset-artists" },
                                              [
                                                _vm._v(
                                                  "\n                                    " +
                                                    _vm._s(
                                                      album.artist.displayname
                                                    ) +
                                                    "\n                                "
                                                ),
                                              ]
                                            )
                                          : _vm._e(),
                                      ]),
                                    ]
                                  )
                                }
                              ),
                              0
                            ),
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.searchResults &&
                      _vm.$store.getters.getSettings.enablePodcasts &&
                      _vm.searchResults.podcasts.length
                        ? _c("div", { staticClass: "search-category" }, [
                            _c("div", { staticClass: "category-title" }, [
                              _vm._v(
                                "\n                        " +
                                  _vm._s(_vm.$t("Podcasts")) +
                                  "\n                    "
                              ),
                            ]),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "category-results" },
                              _vm._l(
                                _vm.searchResults.podcasts.slice(0, 3),
                                function (podcast) {
                                  return _c(
                                    "div",
                                    {
                                      key: podcast.id,
                                      staticClass: "search-result",
                                      on: {
                                        click: function ($event) {
                                          $event.stopPropagation()
                                          return _vm.goToSearchRoute({
                                            id: podcast.id,
                                            name: "podcast",
                                          })
                                        },
                                      },
                                    },
                                    [
                                      _c(
                                        "div",
                                        { staticClass: "cover" },
                                        [
                                          _c("v-img", {
                                            attrs: {
                                              src: podcast.cover,
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
                                                        "content-placeholders",
                                                        {
                                                          attrs: {
                                                            rounded: true,
                                                          },
                                                        },
                                                        [
                                                          _c(
                                                            "content-placeholders-img",
                                                            {
                                                              staticClass:
                                                                "small-image-skeleton",
                                                            }
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
                                          }),
                                        ],
                                        1
                                      ),
                                      _vm._v(" "),
                                      _c("div", { staticClass: "body" }, [
                                        _c(
                                          "div",
                                          { staticClass: "asset-title" },
                                          [
                                            _vm._v(
                                              "\n                                    " +
                                                _vm._s(podcast.title) +
                                                "\n                                "
                                            ),
                                          ]
                                        ),
                                        _vm._v(" "),
                                        podcast.artist
                                          ? _c(
                                              "div",
                                              { staticClass: "asset-artists" },
                                              [
                                                _vm._v(
                                                  "\n                                    " +
                                                    _vm._s(
                                                      podcast.artist.displayname
                                                    ) +
                                                    "\n                                "
                                                ),
                                              ]
                                            )
                                          : _vm._e(),
                                      ]),
                                    ]
                                  )
                                }
                              ),
                              0
                            ),
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.searchResults && _vm.searchResults.playlists.length
                        ? _c("div", { staticClass: "search-category" }, [
                            _c("div", { staticClass: "category-title" }, [
                              _vm._v(
                                "\n                        " +
                                  _vm._s(_vm.$t("Playlists")) +
                                  "\n                    "
                              ),
                            ]),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "category-results" },
                              _vm._l(
                                _vm.searchResults.playlists.slice(0, 3),
                                function (playlist) {
                                  return _c(
                                    "div",
                                    {
                                      key: playlist.id,
                                      staticClass: "search-result",
                                      on: {
                                        click: function ($event) {
                                          $event.stopPropagation()
                                          return _vm.goToSearchRoute({
                                            id: playlist.id,
                                            name: "playlist",
                                          })
                                        },
                                      },
                                    },
                                    [
                                      _c(
                                        "div",
                                        { staticClass: "cover" },
                                        [
                                          _c("v-img", {
                                            attrs: {
                                              src: playlist.cover,
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
                                                        "content-placeholders",
                                                        {
                                                          attrs: {
                                                            rounded: true,
                                                          },
                                                        },
                                                        [
                                                          _c(
                                                            "content-placeholders-img",
                                                            {
                                                              staticClass:
                                                                "small-image-skeleton",
                                                            }
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
                                          }),
                                        ],
                                        1
                                      ),
                                      _vm._v(" "),
                                      _c("div", { staticClass: "body" }, [
                                        _c(
                                          "div",
                                          { staticClass: "asset-title" },
                                          [
                                            _vm._v(
                                              "\n                                    " +
                                                _vm._s(playlist.title) +
                                                "\n                                "
                                            ),
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          { staticClass: "asset-artists" },
                                          [
                                            _vm._v(
                                              "\n                                    " +
                                                _vm._s(
                                                  playlist.user
                                                    ? playlist.user.name
                                                    : ""
                                                ) +
                                                "\n                                "
                                            ),
                                          ]
                                        ),
                                      ]),
                                    ]
                                  )
                                }
                              ),
                              0
                            ),
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.searchResults && _vm.searchResults.users.length
                        ? _c("div", { staticClass: "search-category" }, [
                            _c("div", { staticClass: "category-title" }, [
                              _vm._v(
                                "\n                        " +
                                  _vm._s(_vm.$t("Users")) +
                                  "\n                    "
                              ),
                            ]),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "category-results" },
                              _vm._l(
                                _vm.searchResults.users.slice(0, 3),
                                function (user) {
                                  return _c(
                                    "div",
                                    {
                                      key: user.id,
                                      staticClass: "search-result",
                                      on: {
                                        click: function ($event) {
                                          $event.stopPropagation()
                                          return _vm.goToSearchRoute({
                                            id: user.id,
                                            name: "profile",
                                          })
                                        },
                                      },
                                    },
                                    [
                                      _c(
                                        "div",
                                        { staticClass: "cover" },
                                        [
                                          _c("v-img", {
                                            attrs: {
                                              src: user.avatar,
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
                                                        "content-placeholders",
                                                        {
                                                          attrs: {
                                                            rounded: true,
                                                          },
                                                        },
                                                        [
                                                          _c(
                                                            "content-placeholders-img",
                                                            {
                                                              staticClass:
                                                                "small-image-skeleton",
                                                            }
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
                                          }),
                                        ],
                                        1
                                      ),
                                      _vm._v(" "),
                                      _c("div", { staticClass: "body" }, [
                                        _c(
                                          "div",
                                          { staticClass: "asset-title" },
                                          [
                                            _vm._v(
                                              "\n                                    " +
                                                _vm._s(user.name) +
                                                "\n                                "
                                            ),
                                          ]
                                        ),
                                      ]),
                                    ]
                                  )
                                }
                              ),
                              0
                            ),
                          ])
                        : _vm.searchResults &&
                          ((_vm.searchResults.podcasts &&
                            !_vm.searchResults.podcasts.length) ||
                            !_vm.searchResults.podcasts) &&
                          !_vm.searchResults.radioStations.length &&
                          !_vm.searchResults.albums.length &&
                          !_vm.searchResults.playlists.length &&
                          !_vm.searchResults.songs.length &&
                          !_vm.searchResults.artists.length &&
                          !_vm.searchResults.users.length
                        ? _c(
                            "div",
                            { staticClass: "no-results" },
                            [
                              _c("empty-page", {
                                attrs: {
                                  headline: _vm.$t("No Results!"),
                                  sub: _vm.$t(
                                    "There are no results found for this search keyword."
                                  ),
                                },
                              }),
                            ],
                            1
                          )
                        : _vm._e(),
                    ]
                  : _vm.searchResults
                  ? [
                      _vm.currentPage === "songs"
                        ? [
                            _vm.searchResults.songs.length
                              ? _c(
                                  "div",
                                  { staticClass: "search-results" },
                                  _vm._l(
                                    _vm.searchResults.songs,
                                    function (song) {
                                      return _c(
                                        "div",
                                        {
                                          key: song.id,
                                          staticClass: "search-result",
                                          on: {
                                            click: function ($event) {
                                              $event.stopPropagation()
                                              return _vm.goToSearchRoute({
                                                id: song.id,
                                                name: "song",
                                              })
                                            },
                                          },
                                        },
                                        [
                                          _c(
                                            "div",
                                            { staticClass: "cover" },
                                            [
                                              _c("v-img", {
                                                attrs: {
                                                  src: song.cover,
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
                                                            "content-placeholders",
                                                            {
                                                              attrs: {
                                                                rounded: true,
                                                              },
                                                            },
                                                            [
                                                              _c(
                                                                "content-placeholders-img",
                                                                {
                                                                  staticClass:
                                                                    "small-image-skeleton",
                                                                }
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
                                              }),
                                            ],
                                            1
                                          ),
                                          _vm._v(" "),
                                          _c("div", { staticClass: "body" }, [
                                            _c(
                                              "div",
                                              { staticClass: "asset-title" },
                                              [
                                                _vm._v(
                                                  "\n                                    " +
                                                    _vm._s(song.title) +
                                                    "\n                                "
                                                ),
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "div",
                                              { staticClass: "asset-artists" },
                                              [
                                                _vm._v(
                                                  "\n                                    " +
                                                    _vm._s(
                                                      _vm.getArtists(
                                                        song.artists
                                                      )
                                                    ) +
                                                    "\n                                "
                                                ),
                                              ]
                                            ),
                                          ]),
                                        ]
                                      )
                                    }
                                  ),
                                  0
                                )
                              : _c(
                                  "div",
                                  { staticClass: "no-results" },
                                  [
                                    _c("empty-page", {
                                      attrs: {
                                        headline: _vm.$t("No Results!"),
                                        sub: _vm.$t(
                                          "There are no results found for this search keyword."
                                        ),
                                      },
                                    }),
                                  ],
                                  1
                                ),
                          ]
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.currentPage === "albums"
                        ? [
                            _vm.searchResults.albums.length
                              ? _c(
                                  "div",
                                  { staticClass: "search-results" },
                                  _vm._l(
                                    _vm.searchResults.albums,
                                    function (album) {
                                      return _c(
                                        "div",
                                        {
                                          key: album.id,
                                          staticClass: "search-result",
                                          on: {
                                            click: function ($event) {
                                              $event.stopPropagation()
                                              return _vm.goToSearchRoute({
                                                id: album.id,
                                                name: "album",
                                              })
                                            },
                                          },
                                        },
                                        [
                                          _c(
                                            "div",
                                            { staticClass: "cover" },
                                            [
                                              _c("v-img", {
                                                attrs: {
                                                  src: album.cover,
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
                                                            "content-placeholders",
                                                            {
                                                              attrs: {
                                                                rounded: true,
                                                              },
                                                            },
                                                            [
                                                              _c(
                                                                "content-placeholders-img",
                                                                {
                                                                  staticClass:
                                                                    "small-image-skeleton",
                                                                }
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
                                              }),
                                            ],
                                            1
                                          ),
                                          _vm._v(" "),
                                          _c("div", { staticClass: "body" }, [
                                            _c(
                                              "div",
                                              { staticClass: "asset-title" },
                                              [
                                                _vm._v(
                                                  "\n                                    " +
                                                    _vm._s(album.title) +
                                                    "\n                                "
                                                ),
                                              ]
                                            ),
                                            _vm._v(" "),
                                            album.artist
                                              ? _c(
                                                  "div",
                                                  {
                                                    staticClass:
                                                      "asset-artists",
                                                  },
                                                  [
                                                    _vm._v(
                                                      "\n                                    " +
                                                        _vm._s(
                                                          album.artist
                                                            .displayname
                                                        ) +
                                                        "\n                                "
                                                    ),
                                                  ]
                                                )
                                              : _vm._e(),
                                          ]),
                                        ]
                                      )
                                    }
                                  ),
                                  0
                                )
                              : _c(
                                  "div",
                                  { staticClass: "no-results" },
                                  [
                                    _c("empty-page", {
                                      attrs: {
                                        headline: _vm.$t("No Results!"),
                                        sub: _vm.$t(
                                          "There are no results found for this search keyword."
                                        ),
                                      },
                                    }),
                                  ],
                                  1
                                ),
                          ]
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.currentPage === "playlists"
                        ? [
                            _vm.searchResults.playlists.length
                              ? _c(
                                  "div",
                                  { staticClass: "search-results" },
                                  _vm._l(
                                    _vm.searchResults.playlists,
                                    function (playlist) {
                                      return _c(
                                        "div",
                                        {
                                          key: playlist.id,
                                          staticClass: "search-result",
                                          on: {
                                            click: function ($event) {
                                              $event.stopPropagation()
                                              return _vm.goToSearchRoute({
                                                id: playlist.id,
                                                name: "playlist",
                                              })
                                            },
                                          },
                                        },
                                        [
                                          _c(
                                            "div",
                                            { staticClass: "cover" },
                                            [
                                              _c("v-img", {
                                                attrs: {
                                                  src: playlist.cover,
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
                                                            "content-placeholders",
                                                            {
                                                              attrs: {
                                                                rounded: true,
                                                              },
                                                            },
                                                            [
                                                              _c(
                                                                "content-placeholders-img",
                                                                {
                                                                  staticClass:
                                                                    "small-image-skeleton",
                                                                }
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
                                              }),
                                            ],
                                            1
                                          ),
                                          _vm._v(" "),
                                          _c("div", { staticClass: "body" }, [
                                            _c(
                                              "div",
                                              { staticClass: "asset-title" },
                                              [
                                                _vm._v(
                                                  "\n                                    " +
                                                    _vm._s(playlist.title) +
                                                    "\n                                "
                                                ),
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "div",
                                              { staticClass: "asset-artists" },
                                              [
                                                _vm._v(
                                                  "\n                                    " +
                                                    _vm._s(playlist.user.name) +
                                                    "\n                                "
                                                ),
                                              ]
                                            ),
                                          ]),
                                        ]
                                      )
                                    }
                                  ),
                                  0
                                )
                              : _c(
                                  "div",
                                  { staticClass: "no-results" },
                                  [
                                    _c("empty-page", {
                                      attrs: {
                                        headline: _vm.$t("No Results!"),
                                        sub: _vm.$t(
                                          "There are no results found for this search keyword."
                                        ),
                                      },
                                    }),
                                  ],
                                  1
                                ),
                          ]
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.currentPage === "podcasts"
                        ? [
                            _vm.searchResults.podcasts.length
                              ? _c(
                                  "div",
                                  { staticClass: "search-results" },
                                  _vm._l(
                                    _vm.searchResults.podcasts,
                                    function (podcast) {
                                      return _c(
                                        "div",
                                        {
                                          key: podcast.id,
                                          staticClass: "search-result",
                                          on: {
                                            click: function ($event) {
                                              $event.stopPropagation()
                                              return _vm.goToSearchRoute({
                                                id: podcast.id,
                                                name: "podcast",
                                              })
                                            },
                                          },
                                        },
                                        [
                                          _c(
                                            "div",
                                            { staticClass: "cover" },
                                            [
                                              _c("v-img", {
                                                attrs: {
                                                  src: podcast.cover,
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
                                                            "content-placeholders",
                                                            {
                                                              attrs: {
                                                                rounded: true,
                                                              },
                                                            },
                                                            [
                                                              _c(
                                                                "content-placeholders-img",
                                                                {
                                                                  staticClass:
                                                                    "small-image-skeleton",
                                                                }
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
                                              }),
                                            ],
                                            1
                                          ),
                                          _vm._v(" "),
                                          _c("div", { staticClass: "body" }, [
                                            _c(
                                              "div",
                                              { staticClass: "asset-title" },
                                              [
                                                _vm._v(
                                                  "\n                                    " +
                                                    _vm._s(podcast.title) +
                                                    "\n                                "
                                                ),
                                              ]
                                            ),
                                            _vm._v(" "),
                                            podcast.artist
                                              ? _c(
                                                  "div",
                                                  {
                                                    staticClass:
                                                      "asset-artists",
                                                  },
                                                  [
                                                    _vm._v(
                                                      "\n                                    " +
                                                        _vm._s(
                                                          podcast.artist
                                                            .displayname
                                                        ) +
                                                        "\n                                "
                                                    ),
                                                  ]
                                                )
                                              : _vm._e(),
                                          ]),
                                        ]
                                      )
                                    }
                                  ),
                                  0
                                )
                              : _c(
                                  "div",
                                  { staticClass: "no-results" },
                                  [
                                    _c("empty-page", {
                                      attrs: {
                                        headline: _vm.$t("No Results!"),
                                        sub: _vm.$t(
                                          "There are no results found for this search keyword."
                                        ),
                                      },
                                    }),
                                  ],
                                  1
                                ),
                          ]
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.currentPage === "artists"
                        ? [
                            _vm.searchResults.artists.length
                              ? _c(
                                  "div",
                                  { staticClass: "search-results" },
                                  _vm._l(
                                    _vm.searchResults.artists,
                                    function (artist) {
                                      return _c(
                                        "div",
                                        {
                                          key: artist.id,
                                          staticClass: "search-result",
                                          on: {
                                            click: function ($event) {
                                              $event.stopPropagation()
                                              return _vm.goToSearchRoute({
                                                id: artist.id,
                                                name: "artist",
                                              })
                                            },
                                          },
                                        },
                                        [
                                          _c(
                                            "div",
                                            { staticClass: "cover" },
                                            [
                                              _c("v-img", {
                                                attrs: {
                                                  src: artist.avatar,
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
                                                            "content-placeholders",
                                                            {
                                                              attrs: {
                                                                rounded: true,
                                                              },
                                                            },
                                                            [
                                                              _c(
                                                                "content-placeholders-img",
                                                                {
                                                                  staticClass:
                                                                    "small-image-skeleton",
                                                                }
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
                                              }),
                                            ],
                                            1
                                          ),
                                          _vm._v(" "),
                                          _c("div", { staticClass: "body" }, [
                                            artist
                                              ? _c(
                                                  "div",
                                                  {
                                                    staticClass: "asset-title",
                                                  },
                                                  [
                                                    _vm._v(
                                                      "\n                                    " +
                                                        _vm._s(
                                                          artist.displayname
                                                        ) +
                                                        "\n                                "
                                                    ),
                                                  ]
                                                )
                                              : _vm._e(),
                                          ]),
                                        ]
                                      )
                                    }
                                  ),
                                  0
                                )
                              : _c(
                                  "div",
                                  { staticClass: "no-results" },
                                  [
                                    _c("empty-page", {
                                      attrs: {
                                        headline: _vm.$t("No Results!"),
                                        sub: _vm.$t(
                                          "There are no results found for this search keyword."
                                        ),
                                      },
                                    }),
                                  ],
                                  1
                                ),
                          ]
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.currentPage === "users"
                        ? [
                            _vm.searchResults.users.length
                              ? _c(
                                  "div",
                                  { staticClass: "search-results" },
                                  _vm._l(
                                    _vm.searchResults.users,
                                    function (user) {
                                      return _c(
                                        "div",
                                        {
                                          key: user.id,
                                          staticClass: "search-result",
                                          on: {
                                            click: function ($event) {
                                              $event.stopPropagation()
                                              return _vm.goToSearchRoute({
                                                id: user.id,
                                                name: "profile",
                                              })
                                            },
                                          },
                                        },
                                        [
                                          _c(
                                            "div",
                                            { staticClass: "cover" },
                                            [
                                              _c("v-img", {
                                                attrs: {
                                                  src: user.avatar,
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
                                                            "content-placeholders",
                                                            {
                                                              attrs: {
                                                                rounded: true,
                                                              },
                                                            },
                                                            [
                                                              _c(
                                                                "content-placeholders-img",
                                                                {
                                                                  staticClass:
                                                                    "small-image-skeleton",
                                                                }
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
                                              }),
                                            ],
                                            1
                                          ),
                                          _vm._v(" "),
                                          _c("div", { staticClass: "body" }, [
                                            _c(
                                              "div",
                                              { staticClass: "asset-title" },
                                              [
                                                _vm._v(
                                                  "\n                                    " +
                                                    _vm._s(user.name) +
                                                    "\n                                "
                                                ),
                                              ]
                                            ),
                                          ]),
                                        ]
                                      )
                                    }
                                  ),
                                  0
                                )
                              : _c(
                                  "div",
                                  { staticClass: "no-results" },
                                  [
                                    _c("empty-page", {
                                      attrs: {
                                        headline: _vm.$t("No Results!"),
                                        sub: _vm.$t(
                                          "There are no results found for this search keyword."
                                        ),
                                      },
                                    }),
                                  ],
                                  1
                                ),
                          ]
                        : _vm._e(),
                    ]
                  : _vm._e(),
              ],
              2
            ),
          ],
          1
        )
      : _vm._e(),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/elements/lists/playlistSongs.vue?vue&type=template&id=94f473f6&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/elements/lists/playlistSongs.vue?vue&type=template&id=94f473f6& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "content-list-wrapper" }, [
    _vm.songs
      ? _c(
          "ul",
          [
            _vm.headers
              ? _c("li", [
                  _vm.ranked
                    ? _c("div", { staticClass: "rank" }, [
                        _vm._v("\n                #\n            "),
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.songs.length
                    ? _c("div", { staticClass: "list-item-cover mr-5" }, [
                        _vm._v(
                          "\n                " +
                            _vm._s(_vm.$t("Title")) +
                            "\n            "
                        ),
                      ])
                    : _vm._e(),
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm._l(_vm.songs, function (song, i) {
              return _c(
                "li",
                {
                  key: i,
                  staticClass: "item-list__item relative",
                  on: {
                    click: function ($event) {
                      return _vm.$store.dispatch("playSong", {
                        song: song,
                        reset: true,
                      })
                    },
                    contextmenu: function ($event) {
                      $event.preventDefault()
                      $event.stopPropagation()
                      return _vm.$store.commit(
                        "setSongContextMenu",
                        _vm.compid + i
                      )
                    },
                  },
                },
                [
                  _vm.$store.getters.getSongContextMenu == _vm.compid + i
                    ? _c(
                        "abs-menu",
                        { style: { top: "24px", right: 0 } },
                        [
                          _c("song-menu", {
                            attrs: { song: song },
                            on: {
                              close: function ($event) {
                                return _vm.$store.commit(
                                  "setSongContextMenu",
                                  null
                                )
                              },
                            },
                          }),
                        ],
                        1
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.ranked
                    ? _c(
                        "div",
                        { staticClass: "rank" },
                        [
                          _c(
                            "v-icon",
                            { staticClass: "play-icon", attrs: { small: "" } },
                            [_vm._v("$vuetify.icons.play")]
                          ),
                          _vm._v(" "),
                          _c("span", { staticClass: "rank__rank" }, [
                            _vm._v(_vm._s(i + 1)),
                          ]),
                        ],
                        1
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "item-cover" },
                    [
                      _c("v-img", {
                        staticClass: "img",
                        attrs: { src: song.cover, "aspect-ratio": "1" },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "placeholder",
                              fn: function () {
                                return [
                                  _c(
                                    "v-row",
                                    {
                                      staticClass: "fill-height ma-0",
                                      attrs: {
                                        align: "center",
                                        justify: "center",
                                      },
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
                          ],
                          null,
                          true
                        ),
                      }),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "item-info" }, [
                    _c(
                      "div",
                      {
                        staticClass: "item-title router-link",
                        on: {
                          click: function ($event) {
                            $event.stopPropagation()
                            return _vm.$router.push({
                              name: "song",
                              params: { id: song.id },
                            })
                          },
                        },
                      },
                      [
                        _vm._v(
                          "\n                    " +
                            _vm._s(song.title) +
                            "\n                    "
                        ),
                        song.youtube_id
                          ? _c("v-icon", { attrs: { small: "" } }, [
                              _vm._v("$vuetify.icons.youtube"),
                            ])
                          : _vm._e(),
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _vm.$store.getters.getCurrentAudio &&
                    _vm.$store.getters.getCurrentAudio.id === song.id
                      ? _c(
                          "div",
                          { staticClass: "epico_music-is-playing-container" },
                          [
                            _c("span"),
                            _vm._v(" "),
                            _c("span"),
                            _vm._v(" "),
                            _c("span"),
                          ]
                        )
                      : _vm._e(),
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "item-artist" },
                    [
                      song.artist_id
                        ? _c(
                            "router-link",
                            {
                              staticClass: "router-link",
                              attrs: {
                                to: {
                                  name: "artist",
                                  params: { id: song.artist_id },
                                },
                              },
                            },
                            [
                              _vm._v(
                                "\n                    " +
                                  _vm._s(song.artist_name) +
                                  "\n                "
                              ),
                            ]
                          )
                        : _c("span", [_vm._v(_vm._s(song.artist_name))]),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "duration small mr-3" },
                    [
                      !song.youtube_id
                        ? [
                            _vm._v(
                              "\n                    " +
                                _vm._s(_vm.mmss(song.duration)) +
                                "\n                "
                            ),
                          ]
                        : [
                            _vm._v(
                              "\n                    --:--\n                "
                            ),
                          ],
                    ],
                    2
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "custom-options" }, [
                    _vm.mine
                      ? _c(
                          "div",
                          {
                            staticClass: "delete-button",
                            attrs: {
                              title: _vm.$t("Remove song from playlist"),
                            },
                            on: {
                              click: function ($event) {
                                $event.stopPropagation()
                                return _vm.detachSong(song.id, song.title)
                              },
                            },
                          },
                          [
                            _c(
                              "v-icon",
                              {
                                staticClass: "pointer",
                                attrs: { color: "danger", small: "" },
                              },
                              [_vm._v("$vuetify.icons.delete")]
                            ),
                          ],
                          1
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _c("div", { staticClass: "like-button" }, [
                      _vm.isLiked(song.id)
                        ? _c(
                            "div",
                            {
                              staticClass: "button-svg-container",
                              on: {
                                click: function ($event) {
                                  $event.stopPropagation()
                                  return _vm.like(song.id)
                                },
                              },
                            },
                            [
                              _c(
                                "v-icon",
                                {
                                  staticClass: "pointer",
                                  attrs: { color: "primary", small: "" },
                                },
                                [_vm._v("$vuetify.icons.heart")]
                              ),
                            ],
                            1
                          )
                        : _c(
                            "div",
                            {
                              staticClass: "button-svg-container",
                              on: {
                                click: function ($event) {
                                  $event.stopPropagation()
                                  return _vm.like(song.id)
                                },
                              },
                            },
                            [
                              _c(
                                "v-icon",
                                {
                                  staticClass: "pointer",
                                  attrs: { small: "" },
                                },
                                [_vm._v("$vuetify.icons.heart-outline")]
                              ),
                            ],
                            1
                          ),
                    ]),
                  ]),
                ],
                1
              )
            }),
          ],
          2
        )
      : _c(
          "ul",
          _vm._l(10, function (n) {
            return _c(
              "div",
              { key: n, staticClass: "skeleton" },
              [
                _c(
                  "content-placeholders",
                  { attrs: { rounded: true } },
                  [_c("content-placeholders-img")],
                  1
                ),
                _vm._v(" "),
                _c(
                  "content-placeholders",
                  { attrs: { rounded: true } },
                  [_c("content-placeholders-img")],
                  1
                ),
              ],
              1
            )
          }),
          0
        ),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/ShareLinks.vue?vue&type=template&id=1e8af86d&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/ShareLinks.vue?vue&type=template&id=1e8af86d&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "share-links d-flex" },
    _vm._l(_vm.networks, function (network) {
      return _c(
        "ShareNetwork",
        {
          key: network.network,
          style: { backgroundColor: network.color },
          attrs: {
            network: network.network,
            url: _vm.item.url,
            title: _vm.item.title,
          },
        },
        [
          _c(
            "v-icon",
            {
              staticClass: "share-network-icon",
              attrs: { left: "", dark: "" },
            },
            [
              _vm._v(
                "\n                $vuetify.icons." +
                  _vm._s(network.icon) +
                  "\n            "
              ),
            ]
          ),
          _vm._v(" "),
          _c("span", { staticClass: "share-network-text" }, [
            _vm._v(_vm._s(network.name)),
          ]),
        ],
        1
      )
    }),
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/layout/Master.vue?vue&type=template&id=3c63f2a4&":
/*!******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/layout/Master.vue?vue&type=template&id=3c63f2a4& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************/
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
    "main",
    {
      class: this.$vuetify.theme.dark ? "player--dark" : "player--light",
      attrs: { id: "player-container" },
      on: { click: _vm.hideWindows },
    },
    [
      _c("Sidebar", { attrs: { installButton: _vm.installButton } }),
      _vm._v(" "),
      _c("Navbar", {
        on: {
          toggle: function ($event) {
            _vm.rightSidebar = !_vm.rightSidebar
          },
          width: function ($event) {
            _vm.rightSidebarWidth = $event
          },
        },
      }),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "player-container__content" },
        [
          _c(
            "div",
            { attrs: { id: "player-container__content__main" } },
            [
              _vm.$store.getters.getAddSongToPlaylist
                ? _c("add-to-playlist", {
                    on: {
                      end: function ($event) {
                        return _vm.$store.commit("setAddSongToPlaylist", null)
                      },
                    },
                  })
                : _vm._e(),
              _vm._v(" "),
              _c(
                "v-container",
                {
                  staticClass: "player-main-container full-heigth",
                  attrs: { fluid: "" },
                },
                [
                  _c("router-view", {
                    key: _vm.$store.getters.getCurrentPageId,
                  }),
                ],
                1
              ),
            ],
            1
          ),
          _vm._v(" "),
          _c("RightSidebar", {
            style: {
              transform:
                _vm.windowWidth < 900
                  ? "translateX(" + (_vm.rightSidebar ? "0px" : "100%") + ")"
                  : "translateX(0)",
            },
            on: {
              width: function ($event) {
                _vm.rightSidebarWidth = $event
              },
              toggle: function ($event) {
                _vm.rightSidebar = !_vm.rightSidebar
              },
            },
          }),
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-dialog",
        {
          attrs: { "max-width": "700px" },
          model: {
            value: _vm.$store.state.showSharingDialog,
            callback: function ($$v) {
              _vm.$set(_vm.$store.state, "showSharingDialog", $$v)
            },
            expression: "$store.state.showSharingDialog",
          },
        },
        [
          _c("ShareDialog", {
            on: {
              close: function ($event) {
                return _vm.$store.commit("hideSharingDialog")
              },
            },
          }),
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-dialog",
        {
          attrs: { persistent: "", "max-width": "800" },
          model: {
            value: _vm.$store.getters["purchase/getCheckoutDialog"],
            callback: function ($$v) {
              _vm.$set(_vm.$store.getters, "purchase/getCheckoutDialog", $$v)
            },
            expression: "$store.getters['purchase/getCheckoutDialog']",
          },
        },
        [
          _vm.$store.getters["purchase/getCheckoutDialog"]
            ? _c("checkout")
            : _vm._e(),
        ],
        1
      ),
      _vm._v(" "),
      _vm.$store.getters["purchase/getSellingAsset"]
        ? _c(
            "v-dialog",
            {
              attrs: { "max-width": "700" },
              model: {
                value: _vm.PDialog,
                callback: function ($$v) {
                  _vm.PDialog = $$v
                },
                expression: "PDialog",
              },
            },
            [
              _c("purchase-dialog", {
                attrs: {
                  asset: _vm.$store.getters["purchase/getSellingAsset"],
                },
              }),
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _c(
        "v-dialog",
        {
          attrs: { "max-width": "350", "max-height": "300" },
          model: {
            value: _vm.$store.state.chooseLangDialog,
            callback: function ($$v) {
              _vm.$set(_vm.$store.state, "chooseLangDialog", $$v)
            },
            expression: "$store.state.chooseLangDialog",
          },
        },
        [
          _c(
            "v-list",
            { staticClass: "panel-color" },
            _vm._l(_vm.$store.getters.getAvailableLanguages, function (lang) {
              return _c(
                "v-list-item",
                {
                  key: lang.id,
                  on: {
                    click: function ($event) {
                      return _vm.$store.dispatch("updateLang", lang)
                    },
                  },
                },
                [
                  _c("div", { staticClass: "align-center" }, [
                    _c(
                      "div",
                      { staticClass: "img px-2 py-1" },
                      [
                        _c("v-img", {
                          attrs: {
                            width: "20",
                            height: "100%",
                            src:
                              "/storage/defaults/icons/flags/" +
                              lang.flag +
                              ".svg",
                          },
                        }),
                      ],
                      1
                    ),
                    _vm._v(
                      "\n                    " +
                        _vm._s(lang.name) +
                        "\n                "
                    ),
                  ]),
                ]
              )
            }),
            1
          ),
        ],
        1
      ),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/layout/Navbar.vue?vue&type=template&id=ad65455c&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/layout/Navbar.vue?vue&type=template&id=ad65455c&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************/
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
  return _c("nav", { staticClass: "navbar", attrs: { id: "navbar" } }, [
    _c("div", { staticClass: "navbar__left-side" }, [
      _c("div", { staticClass: "chevrons" }, [
        _c(
          "div",
          {
            staticClass: "chevron-left mr-3 pointer",
            on: {
              click: function ($event) {
                return _vm.$router.go(-1)
              },
            },
          },
          [_c("v-icon", [_vm._v("$vuetify.icons.chevron-left")])],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass: "chevron-right pointer",
            on: {
              click: function ($event) {
                return _vm.$router.go(1)
              },
            },
          },
          [_c("v-icon", [_vm._v("$vuetify.icons.chevron-right")])],
          1
        ),
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "logo" },
        [
          _c(
            "router-link",
            {
              attrs: {
                to: { path: _vm.$store.getters.getSettings.playerLanding },
              },
            },
            [
              _c("v-img", {
                attrs: {
                  src: _vm.$store.getters.getSettings.appLogo,
                  width: "3em",
                  height: "3em",
                  alt: "Logo image",
                },
              }),
            ],
            1
          ),
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "searchbar-container",
          style: {
            transform: _vm.showSearchBar
              ? "translateY(50px)"
              : "translateY(8px)",
            opacity: _vm.showSearchBar ? 1 : 0,
            pointerEvents: _vm.showSearchBar ? "initial" : "none",
          },
        },
        [
          _c("PlayerSearchbar", {
            on: {
              navigation: function ($event) {
                _vm.showSearchBar = !_vm.showSearchBar
              },
            },
          }),
        ],
        1
      ),
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "navbar__right-side" }, [
      _c(
        "div",
        {
          staticClass: "search-icon pointer mr-3 ml-auto",
          on: {
            click: function ($event) {
              _vm.showSearchBar = !_vm.showSearchBar
            },
          },
        },
        [_c("v-icon", [_vm._v("$vuetify.icons.magnify")])],
        1
      ),
      _vm._v(" "),
      _vm.$store.getters.getSettings.enableLangSwitcher &&
      _vm.$store.getters.getCurrentLang
        ? _c("div", { staticClass: "lang-switcher mr-1" }, [
            _c(
              "div",
              {
                staticClass: "pointer",
                on: {
                  click: function ($event) {
                    return _vm.$store.commit("setChooseLangDialog", true)
                  },
                },
              },
              [
                _vm.$store.getters.getCurrentLang.flag
                  ? _c("v-img", {
                      attrs: {
                        width: "18px",
                        height: "100%",
                        src:
                          "/storage/defaults/icons/flags/" +
                          _vm.$store.getters.getCurrentLang.flag +
                          ".svg",
                      },
                    })
                  : _c("div", { staticClass: "small bold lang" }, [
                      _vm._v(
                        "\n          " +
                          _vm._s(_vm.$store.getters.getCurrentLang.locale) +
                          "\n        "
                      ),
                    ]),
              ],
              1
            ),
          ])
        : _vm._e(),
      _vm._v(" "),
      _vm.$store.getters.getSettings.enableThemeSwitcher
        ? _c(
            "div",
            { staticClass: "theme-switch" },
            [
              _c(
                "v-btn",
                { attrs: { icon: "" }, on: { click: _vm.changeTheme } },
                [
                  _c("v-icon", { attrs: { small: "" } }, [
                    _vm._v("$vuetify.icons.brightness-4"),
                  ]),
                ],
                1
              ),
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.user
        ? _c(
            "div",
            { staticClass: "user" },
            [
              _vm.$store.getters["purchase/getCart"].items.length
                ? _c("Cart", { staticClass: "mx-1" })
                : _vm._e(),
              _vm._v(" "),
              _c("div", { staticClass: "icons" }, [
                _vm.$store.getters.getSettings.enableRealtime &&
                _vm.$store.getters.getSettings.enableChat &&
                _vm.hasPermission("Chat with friends")
                  ? _c(
                      "div",
                      { staticClass: "chat" },
                      [
                        _c(
                          "v-menu",
                          {
                            attrs: {
                              left: "",
                              bottom: "",
                              "position-y": 125,
                              "offset-y": "",
                              "close-on-content-click": false,
                              dark: _vm.$vuetify.theme.dark,
                            },
                            scopedSlots: _vm._u(
                              [
                                {
                                  key: "activator",
                                  fn: function (ref) {
                                    var on = ref.on
                                    var attrs = ref.attrs
                                    return [
                                      _c(
                                        "v-btn",
                                        _vm._g(
                                          _vm._b(
                                            { attrs: { icon: "" } },
                                            "v-btn",
                                            attrs,
                                            false
                                          ),
                                          on
                                        ),
                                        [
                                          _c(
                                            "v-icon",
                                            { attrs: { small: "" } },
                                            [
                                              _vm._v(
                                                "$vuetify.icons.message-processing-outline"
                                              ),
                                            ]
                                          ),
                                        ],
                                        1
                                      ),
                                      _vm._v(" "),
                                      _vm.unreadMessages
                                        ? _c(
                                            "div",
                                            { staticClass: "unread-indicator" },
                                            [
                                              _c("span", [
                                                _vm._v(
                                                  _vm._s(_vm.unreadMessages)
                                                ),
                                              ]),
                                            ]
                                          )
                                        : _vm._e(),
                                    ]
                                  },
                                },
                              ],
                              null,
                              false,
                              2924528773
                            ),
                            model: {
                              value: _vm.chatMenu,
                              callback: function ($$v) {
                                _vm.chatMenu = $$v
                              },
                              expression: "chatMenu",
                            },
                          },
                          [
                            _vm._v(" "),
                            _c("chat-component", {
                              attrs: {
                                user: _vm.$store.getters.getUser,
                                whoToOpen: _vm.openChatEventFriend,
                                amIAlive: _vm.chatMenu,
                              },
                              on: {
                                chatOpened: function ($event) {
                                  return _vm.$store.commit(
                                    "setOpenChatWith",
                                    null
                                  )
                                },
                                unread: function ($event) {
                                  _vm.unreadMessages += $event
                                },
                              },
                            }),
                          ],
                          1
                        ),
                      ],
                      1
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.notifications
                  ? _c(
                      "div",
                      { staticClass: "notifications" },
                      [
                        _c(
                          "v-menu",
                          {
                            attrs: {
                              bottom: "",
                              left: "",
                              "nudge-bottom": "45",
                              "max-height": "20em",
                              "close-on-content-click": false,
                            },
                            scopedSlots: _vm._u(
                              [
                                {
                                  key: "activator",
                                  fn: function (ref) {
                                    var on = ref.on
                                    var attrs = ref.attrs
                                    return [
                                      _c(
                                        "v-btn",
                                        _vm._g(
                                          _vm._b(
                                            { attrs: { small: "", icon: "" } },
                                            "v-btn",
                                            attrs,
                                            false
                                          ),
                                          on
                                        ),
                                        [
                                          _c(
                                            "v-badge",
                                            {
                                              attrs: {
                                                left: "",
                                                overlap: "",
                                                dot: "",
                                                color:
                                                  _vm.isThereUnreadNotifications
                                                    ? "error"
                                                    : "transparent",
                                              },
                                            },
                                            [
                                              _c(
                                                "v-icon",
                                                { attrs: { small: "" } },
                                                [_vm._v("$vuetify.icons.bell")]
                                              ),
                                            ],
                                            1
                                          ),
                                        ],
                                        1
                                      ),
                                    ]
                                  },
                                },
                              ],
                              null,
                              false,
                              3086334385
                            ),
                          },
                          [
                            _vm._v(" "),
                            _c(
                              "v-card",
                              { staticClass: "panel" },
                              [
                                _c("notifications-box", {
                                  attrs: { notifications: _vm.notifications },
                                  on: {
                                    handled: function ($event) {
                                      return _vm.show("notifications")
                                    },
                                  },
                                }),
                              ],
                              1
                            ),
                          ],
                          1
                        ),
                      ],
                      1
                    )
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass: "friends",
                    on: {
                      click: function ($event) {
                        return _vm.$emit("toggle")
                      },
                    },
                  },
                  [
                    _c(
                      "v-icon",
                      { staticClass: "mr-3", attrs: { small: "" } },
                      [_vm._v("$vuetify.icons.account-group")]
                    ),
                  ],
                  1
                ),
              ]),
              _vm._v(" "),
              _c("User"),
            ],
            1
          )
        : _c("div", { staticClass: "auth" }, [
            _c(
              "div",
              { staticClass: "buttons" },
              [
                !_vm.$store.getters.getSettings.disableRegistration
                  ? _c(
                      "v-btn",
                      {
                        staticClass: "primary white--text",
                        attrs: { small: "" },
                        on: {
                          click: function ($event) {
                            return _vm.$router.push({ name: "login" })
                          },
                        },
                      },
                      [_vm._v(_vm._s(_vm.$t("Login")))]
                    )
                  : _vm._e(),
                _vm._v(" "),
                !_vm.$store.getters.getSettings.disableRegistration
                  ? _c(
                      "v-btn",
                      {
                        staticClass: "register__btn ml-2 white--text",
                        attrs: { small: "", outlined: "", color: "primary" },
                        on: {
                          click: function ($event) {
                            return _vm.$router.push({ name: "register" })
                          },
                        },
                      },
                      [_vm._v(_vm._s(_vm.$t("Register")))]
                    )
                  : _vm._e(),
              ],
              1
            ),
          ]),
    ]),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/layout/RightSidebar.vue?vue&type=template&id=0a7d493c&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/layout/RightSidebar.vue?vue&type=template&id=0a7d493c&scoped=true& ***!
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
  return !_vm.hideRightSidebar
    ? _c(
        "v-card",
        { ref: "rightSidebar", attrs: { id: "right-sidebar-container" } },
        [
          _c(
            "div",
            {
              staticClass: "right-sidebar-toggle",
              on: {
                click: function ($event) {
                  return _vm.$emit("toggle")
                },
              },
            },
            [
              _c("v-icon", { staticClass: "mr-1", attrs: { small: "" } }, [
                _vm._v("$vuetify.icons.menu"),
              ]),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "sticky" },
            [
              _vm.$store.getters.getSettings.enableAds
                ? [
                    _vm.parseAd(_vm.$store.getters.getSettings.square_ad)
                      .position == "trs" &&
                    _vm.parseAd(_vm.$store.getters.getSettings.square_ad).code
                      ? _c(
                          "div",
                          { staticClass: "ad-slot" },
                          [
                            !_vm.hasPermission("No ads")
                              ? _c("ad", {
                                  attrs: {
                                    ad_code: _vm.parseAd(
                                      _vm.$store.getters.getSettings.square_ad
                                    ).code,
                                  },
                                  on: {
                                    click: function ($event) {
                                      _vm.$store.getters.getSettings.ga4 &&
                                      _vm.$store.getters.getSettings
                                        .analytics_adClick_event
                                        ? _vm.emitAnalyticsEvent({
                                            action: "ad_click",
                                            category: "square_ad",
                                            label: "top right-sidebar ad",
                                          })
                                        : ""
                                    },
                                  },
                                })
                              : _vm._e(),
                          ],
                          1
                        )
                      : _vm._e(),
                  ]
                : _vm._e(),
              _vm._v(" "),
              _vm.highlights && _vm.highlights.length
                ? _c(
                    "div",
                    {
                      staticClass: "card-inside highlights",
                      attrs: { flat: "" },
                    },
                    [
                      _c("div", { staticClass: "card-inside__title" }, [
                        _vm._v(_vm._s(_vm.$t("Live Radio"))),
                      ]),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "card-inside__body" },
                        _vm._l(_vm.highlights, function (radioStation) {
                          return _c(
                            "div",
                            {
                              key: radioStation.id,
                              staticClass: "radio-station",
                              on: {
                                click: function ($event) {
                                  return _vm.$store.dispatch(
                                    "playRadioStation",
                                    {
                                      radioStation: radioStation,
                                    }
                                  )
                                },
                              },
                            },
                            [
                              _c(
                                "div",
                                { staticClass: "radio-station__cover" },
                                [
                                  _c("v-img", {
                                    staticClass: "bordered-small-img img",
                                    attrs: {
                                      src: radioStation.cover,
                                      width: "45",
                                      height: "45",
                                    },
                                  }),
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "radio-station__details" },
                                [
                                  _vm._v(
                                    "\n                        " +
                                      _vm._s(radioStation.name) +
                                      "\n                        "
                                  ),
                                  _c(
                                    "div",
                                    { staticClass: "live-animation ml-2" },
                                    [
                                      _c(
                                        "div",
                                        { staticClass: "align-center" },
                                        [
                                          _c(
                                            "svg",
                                            {
                                              staticClass: "blinking",
                                              attrs: {
                                                height: "20",
                                                width: "13",
                                              },
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
                                        ]
                                      ),
                                    ]
                                  ),
                                ]
                              ),
                            ]
                          )
                        }),
                        0
                      ),
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.$store.getters.getUser &&
              _vm.$store.getters.getFriends &&
              _vm.$store.getters.getSettings.enableFriendshipSystem
                ? _c("friend-list", { staticClass: "card-inside" })
                : _vm._e(),
              _vm._v(" "),
              _vm.$store.getters.getSettings.enableAds
                ? [
                    _vm.parseAd(_vm.$store.getters.getSettings.square_ad)
                      .position == "brs" &&
                    _vm.parseAd(_vm.$store.getters.getSettings.square_ad).code
                      ? _c(
                          "div",
                          { staticClass: "ad-slot" },
                          [
                            !_vm.hasPermission("No ads")
                              ? _c("ad", {
                                  attrs: {
                                    ad_code: _vm.parseAd(
                                      _vm.$store.getters.getSettings.square_ad
                                    ).code,
                                  },
                                  on: {
                                    click: function ($event) {
                                      _vm.$store.getters.getSettings.ga4 &&
                                      _vm.$store.getters.getSettings
                                        .analytics_adClick_event
                                        ? _vm.emitAnalyticsEvent({
                                            action: "ad_click",
                                            category: "square_ad",
                                            label: "bottom right-sidebar ad",
                                          })
                                        : ""
                                    },
                                  },
                                })
                              : _vm._e(),
                          ],
                          1
                        )
                      : _vm._e(),
                  ]
                : _vm._e(),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "links" },
                [
                  _vm._l(_vm.pages, function (page) {
                    return _c(
                      "div",
                      { key: page.id, staticClass: "link" },
                      [
                        _c(
                          "router-link",
                          {
                            staticClass: "router-link",
                            attrs: { to: { path: page.path } },
                          },
                          [
                            _vm._v(
                              "\n                    " +
                                _vm._s(_vm.$t(page.name)) +
                                "\n                "
                            ),
                          ]
                        ),
                      ],
                      1
                    )
                  }),
                  _vm._v(" "),
                  _vm.$store.getters.getPlans &&
                  _vm.$store.getters.getPlans.length > 1
                    ? _c(
                        "div",
                        { staticClass: "link" },
                        [
                          _c(
                            "router-link",
                            {
                              staticClass: "router-link",
                              attrs: { to: { name: "subscription" } },
                            },
                            [
                              _vm._v(
                                "\n                    " +
                                  _vm._s(_vm.$t("Plans")) +
                                  "\n                "
                              ),
                            ]
                          ),
                        ],
                        1
                      )
                    : _vm._e(),
                ],
                2
              ),
              _vm._v(" "),
              _c("div", { staticClass: "copyrights" }, [
                _vm._v(
                  "\n            © " +
                    _vm._s(_vm.moment().year()) +
                    " " +
                    _vm._s(_vm.$store.getters.getSettings.appName) +
                    ". " +
                    _vm._s(_vm.$t("All rights reserved.")) +
                    "\n        "
                ),
              ]),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "external-link mt-4" },
                [
                  _vm.$store.getters.getSettings.twitter_link
                    ? _c(
                        "v-btn",
                        {
                          staticClass: "mx-1",
                          attrs: {
                            "x-small": "",
                            href: _vm.$store.getters.getSettings.twitter_link,
                            rel: "noreferrer",
                            target: "_blank",
                            icon: "",
                          },
                        },
                        [_c("v-icon", [_vm._v("$vuetify.icons.twitter")])],
                        1
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.$store.getters.getSettings.facebook_link
                    ? _c(
                        "v-btn",
                        {
                          staticClass: "mx-1",
                          attrs: {
                            "x-small": "",
                            href: _vm.$store.getters.getSettings.facebook_link,
                            rel: "noreferrer",
                            target: "_blank",
                            icon: "",
                          },
                        },
                        [_c("v-icon", [_vm._v("$vuetify.icons.facebook")])],
                        1
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.$store.getters.getSettings.youtube_link
                    ? _c(
                        "v-btn",
                        {
                          staticClass: "mx-1",
                          attrs: {
                            "x-small": "",
                            href: _vm.$store.getters.getSettings.youtube_link,
                            rel: "noreferrer",
                            target: "_blank",
                            icon: "",
                          },
                        },
                        [_c("v-icon", [_vm._v("$vuetify.icons.youtube")])],
                        1
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.$store.getters.getSettings.instagram_link
                    ? _c(
                        "v-btn",
                        {
                          staticClass: "mx-1",
                          attrs: {
                            "x-small": "",
                            href: _vm.$store.getters.getSettings.instagram_link,
                            rel: "noreferrer",
                            target: "_blank",
                            icon: "",
                          },
                        },
                        [_c("v-icon", [_vm._v("$vuetify.icons.instagram")])],
                        1
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.$store.getters.getSettings.spotify_link
                    ? _c(
                        "v-btn",
                        {
                          staticClass: "mx-1",
                          attrs: {
                            "x-small": "",
                            href: _vm.$store.getters.getSettings.spotify_link,
                            rel: "noreferrer",
                            target: "_blank",
                            icon: "",
                          },
                        },
                        [_c("v-icon", [_vm._v("$vuetify.icons.spotify")])],
                        1
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.$store.getters.getSettings.soundcloud_link
                    ? _c(
                        "v-btn",
                        {
                          staticClass: "mx-1",
                          attrs: {
                            "x-small": "",
                            href: _vm.$store.getters.getSettings
                              .soundcloud_link,
                            rel: "noreferrer",
                            target: "_blank",
                            icon: "",
                          },
                        },
                        [_c("v-icon", [_vm._v("$vuetify.icons.soundcloud")])],
                        1
                      )
                    : _vm._e(),
                ],
                1
              ),
            ],
            2
          ),
          _vm._v(" "),
          _c(
            "v-dialog",
            {
              attrs: { "max-width": "600" },
              model: {
                value: _vm.contactUsDialog,
                callback: function ($$v) {
                  _vm.contactUsDialog = $$v
                },
                expression: "contactUsDialog",
              },
            },
            [
              _vm.$store.getters.getSettings.allowGuestsToContact
                ? _c(
                    "v-card",
                    [
                      _c(
                        "v-card-title",
                        [
                          _vm._v(
                            _vm._s(_vm.$t("Contact Us")) + "\n                "
                          ),
                          _c("v-spacer"),
                          _vm._v(" "),
                          _c("v-spacer"),
                          _vm._v(" "),
                          _c(
                            "v-card-actions",
                            [
                              _c(
                                "v-btn",
                                {
                                  attrs: { icon: "" },
                                  on: {
                                    click: function ($event) {
                                      _vm.contactUsDialog = false
                                    },
                                  },
                                },
                                [
                                  _c("v-icon", [
                                    _vm._v("$vuetify.icons.close"),
                                  ]),
                                ],
                                1
                              ),
                            ],
                            1
                          ),
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "body" },
                        [
                          _c("contact-us", {
                            on: {
                              emailSent: function ($event) {
                                _vm.contactUsDialog = false
                              },
                            },
                          }),
                        ],
                        1
                      ),
                    ],
                    1
                  )
                : _vm._e(),
            ],
            1
          ),
        ],
        1
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/layout/Sidebar.vue?vue&type=template&id=1d1322ec&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/layout/Sidebar.vue?vue&type=template&id=1d1322ec&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************/
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
  return _vm.items
    ? _c(
        "div",
        { attrs: { id: "player-sidebar" } },
        [
          _c(
            "v-card",
            { staticClass: "panel-color", attrs: { id: "sidebar-wrapper" } },
            [
              _c(
                "router-link",
                {
                  attrs: {
                    to: { path: _vm.$store.getters.getSettings.playerLanding },
                  },
                },
                [
                  _c(
                    "div",
                    { staticClass: "logo" },
                    [
                      _c("v-img", {
                        attrs: {
                          width: "3.5em",
                          height: "3.5em",
                          src: _vm.$store.getters.getSettings.appLogo,
                          alt: "Logo image",
                        },
                      }),
                    ],
                    1
                  ),
                ]
              ),
              _vm._v(" "),
              _c(
                "v-list",
                { staticClass: "list panel-color scrollbar-hidden my-2" },
                [
                  _c(
                    "v-list-item-group",
                    { staticClass: "list-group", attrs: { color: "primary" } },
                    [
                      _vm._l(_vm.items, function (item, i) {
                        return [
                          item.path.substr(0, 1) === "/" && item.visibility
                            ? _c(
                                "v-list-item",
                                {
                                  key: i,
                                  staticClass: "sidebar-item",
                                  attrs: { to: item.path, link: "" },
                                },
                                [
                                  _c(
                                    "div",
                                    [
                                      _c("v-icon", [
                                        _vm._v(
                                          "$vuetify.icons." + _vm._s(item.icon)
                                        ),
                                      ]),
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-list-item-content",
                                    [
                                      _c("v-list-item-title", {
                                        domProps: {
                                          textContent: _vm._s(
                                            _vm.$t("" + item.name)
                                          ),
                                        },
                                      }),
                                    ],
                                    1
                                  ),
                                ],
                                1
                              )
                            : item.visibility && item.path.substr(0, 1) !== "/"
                            ? _c(
                                "v-list-item",
                                {
                                  key: i + 100,
                                  staticClass: "sidebar-item",
                                  attrs: { link: "" },
                                  on: {
                                    click: function ($event) {
                                      return _vm.navigate(item.path)
                                    },
                                  },
                                },
                                [
                                  _c(
                                    "div",
                                    [
                                      _c("v-icon", [
                                        _vm._v(
                                          "$vuetify.icons." + _vm._s(item.icon)
                                        ),
                                      ]),
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-list-item-content",
                                    [
                                      _c("v-list-item-title", {
                                        domProps: {
                                          textContent: _vm._s(item.name),
                                        },
                                      }),
                                    ],
                                    1
                                  ),
                                ],
                                1
                              )
                            : _vm._e(),
                        ]
                      }),
                    ],
                    2
                  ),
                ],
                1
              ),
              _vm._v(" "),
              _vm.$store.getters.getInstallPrompt
                ? _c(
                    "div",
                    { staticClass: "install-pwa-button-container mt-5" },
                    [
                      _c(
                        "v-btn",
                        {
                          staticClass: "primary",
                          attrs: {
                            text: "",
                            "x-small": "",
                            title: _vm.$t("Install the app"),
                            dark: "",
                            rounded: "",
                          },
                          on: { click: _vm.showInstallationPrompt },
                        },
                        [
                          _c("v-icon", { attrs: { small: "", left: "" } }, [
                            _vm._v("$vuetify.icons.download"),
                          ]),
                          _vm._v(
                            "\n        " +
                              _vm._s(_vm.$t("Install")) +
                              "\n      "
                          ),
                        ],
                        1
                      ),
                    ],
                    1
                  )
                : _vm._e(),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-bottom-navigation",
            { attrs: { id: "bottom-nav", grow: "", color: "primary" } },
            _vm._l(_vm.items, function (item, i) {
              return _c(
                "v-btn",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: item.visibility,
                      expression: "item.visibility",
                    },
                  ],
                  key: i,
                  on: {
                    click: function ($event) {
                      return _vm.navigate(item.path)
                    },
                  },
                },
                [
                  _c("span", [_vm._v(_vm._s(_vm.$t(item.name)))]),
                  _vm._v(" "),
                  _c("v-icon", [_vm._v("$vuetify.icons." + _vm._s(item.icon))]),
                ],
                1
              )
            }),
            1
          ),
          _vm._v(" "),
          _vm.$store.getters.getQueue.length
            ? _c("player", { attrs: { playlist: _vm.$store.getters.getQueue } })
            : _vm._e(),
        ],
        1
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/AccountSettings.vue?vue&type=template&id=f56202bc&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/pages/AccountSettings.vue?vue&type=template&id=f56202bc&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "elevate-page" },
    [
      _vm.$store.getters.getUser
        ? _c(
            "v-container",
            { staticClass: "account-settings-container" },
            [
              _c(
                "v-card",
                { staticClass: "p-3" },
                [
                  _c(
                    "v-card-title",
                    { staticClass: "header" },
                    [
                      _c(
                        "v-icon",
                        {
                          staticClass: " pr-3",
                          attrs: { color: "primary", "x-large": "" },
                        },
                        [_vm._v("$vuetify.icons.cog")]
                      ),
                      _vm._v(" "),
                      _c("span", { staticClass: "title" }, [
                        _vm._v(_vm._s(_vm.$t("Account Settings"))),
                      ]),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-row",
                    { staticClass: "px-4" },
                    [
                      _c(
                        "v-col",
                        {
                          staticClass: "p-2",
                          attrs: { cols: "12", sm: "auto", "x-sm": "6" },
                        },
                        [
                          _c("upload-image", {
                            attrs: { source: _vm.user.avatar || null },
                            on: {
                              imageReady: function ($event) {
                                return _vm.imageReady($event)
                              },
                            },
                          }),
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
                                          label: _vm.$t("Name"),
                                          outlined: "",
                                        },
                                        model: {
                                          value: _vm.user.name,
                                          callback: function ($$v) {
                                            _vm.$set(_vm.user, "name", $$v)
                                          },
                                          expression: "user.name",
                                        },
                                      }),
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    { attrs: { cols: "12", lg: "6" } },
                                    [
                                      _c(
                                        "div",
                                        {
                                          staticClass:
                                            "card-title card-title-small py-1",
                                        },
                                        [
                                          _vm._v(
                                            "\n                                    " +
                                              _vm._s(
                                                _vm.$t("Update Password")
                                              ) +
                                              "\n                                "
                                          ),
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c("v-divider"),
                                      _vm._v(" "),
                                      _c("v-text-field", {
                                        staticClass: "mt-2",
                                        attrs: {
                                          label: _vm.$t("Current password"),
                                          type: "password",
                                        },
                                        model: {
                                          value: _vm.user.currentPassword,
                                          callback: function ($$v) {
                                            _vm.$set(
                                              _vm.user,
                                              "currentPassword",
                                              $$v
                                            )
                                          },
                                          expression: "user.currentPassword",
                                        },
                                      }),
                                      _vm._v(" "),
                                      _c("v-text-field", {
                                        staticClass: "mt-2",
                                        attrs: {
                                          label: _vm.$t("New Password"),
                                          type: "password",
                                        },
                                        model: {
                                          value: _vm.user.newPassword,
                                          callback: function ($$v) {
                                            _vm.$set(
                                              _vm.user,
                                              "newPassword",
                                              $$v
                                            )
                                          },
                                          expression: "user.newPassword",
                                        },
                                      }),
                                      _vm._v(" "),
                                      _c("v-text-field", {
                                        staticClass: "mt-2",
                                        attrs: {
                                          label: _vm.$t("Confirm Password"),
                                          type: "password",
                                        },
                                        model: {
                                          value: _vm.user.confirmPassword,
                                          callback: function ($$v) {
                                            _vm.$set(
                                              _vm.user,
                                              "confirmPassword",
                                              $$v
                                            )
                                          },
                                          expression: "user.confirmPassword",
                                        },
                                      }),
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _vm.$store.getters.getSettings.enableRealtime
                                    ? _c(
                                        "v-col",
                                        { attrs: { cols: "12", lg: "6" } },
                                        [
                                          _c(
                                            "div",
                                            {
                                              staticClass:
                                                "card-title card-title-small  py-1",
                                            },
                                            [
                                              _vm._v(
                                                "\n                                    " +
                                                  _vm._s(_vm.$t("Privacy")) +
                                                  "\n                                "
                                              ),
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-divider"),
                                          _vm._v(" "),
                                          _vm.$store.getters.getSettings
                                            .enableFriendshipSystemSystem ||
                                          true
                                            ? _c("v-switch", {
                                                attrs: {
                                                  label: _vm.$t(
                                                    "Do not show what I am currently playing to friends."
                                                  ),
                                                },
                                                model: {
                                                  value: _vm.user.hide_activity,
                                                  callback: function ($$v) {
                                                    _vm.$set(
                                                      _vm.user,
                                                      "hide_activity",
                                                      $$v
                                                    )
                                                  },
                                                  expression:
                                                    "user.hide_activity",
                                                },
                                              })
                                            : _vm._e(),
                                        ],
                                        1
                                      )
                                    : _vm._e(),
                                ],
                                1
                              ),
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _vm.$store.getters.getSettings
                            .enable_artist_account &&
                          _vm.$store.getters.getSettings
                            .allowArtistAccountRequests &&
                          !_vm.$store.getters.getUser.roles.some(function (
                            role
                          ) {
                            return role.name == "artist"
                          }) &&
                          !_vm.$store.getters.getUser.is_admin
                            ? [
                                _c("v-divider"),
                                _vm._v(" "),
                                _vm.$store.getters.getUser
                                  .requested_artist_account
                                  ? _c(
                                      "v-btn",
                                      {
                                        staticClass: "mt-4",
                                        attrs: {
                                          outlined: "",
                                          dark: "",
                                          color: "primary",
                                        },
                                      },
                                      [
                                        _c("v-icon", { attrs: { left: "" } }, [
                                          _vm._v(
                                            "$vuetify.icons.account-music"
                                          ),
                                        ]),
                                        _vm._v(
                                          _vm._s(
                                            _vm.$t(
                                              "Artist Account Request sent"
                                            )
                                          )
                                        ),
                                      ],
                                      1
                                    )
                                  : _c(
                                      "v-btn",
                                      {
                                        staticClass: "mt-4",
                                        attrs: { dark: "", color: "primary" },
                                        on: {
                                          click: function ($event) {
                                            _vm.requestArtistDialog = true
                                          },
                                        },
                                      },
                                      [
                                        _c("v-icon", { attrs: { left: "" } }, [
                                          _vm._v(
                                            "$vuetify.icons.account-music"
                                          ),
                                        ]),
                                        _vm._v(
                                          "\n                            " +
                                            _vm._s(
                                              _vm.$t("Request Artist Account")
                                            ) +
                                            "\n                        "
                                        ),
                                      ],
                                      1
                                    ),
                              ]
                            : _vm._e(),
                        ],
                        2
                      ),
                      _vm._v(" "),
                      _c(
                        "v-col",
                        { attrs: { cols: "12" } },
                        [
                          _vm.userPlan
                            ? _c(
                                "v-card",
                                {
                                  staticClass: "user-plan plan",
                                  attrs: { outlined: "" },
                                },
                                [
                                  _c(
                                    "div",
                                    { staticClass: "user-plan__header" },
                                    [
                                      _c(
                                        "v-container",
                                        [
                                          _c(
                                            "v-row",
                                            {
                                              attrs: {
                                                justify: "space-between",
                                              },
                                            },
                                            [
                                              _c(
                                                "div",
                                                { staticClass: "g-infos" },
                                                [
                                                  _c(
                                                    "div",
                                                    { staticClass: "sub" },
                                                    [
                                                      _vm._v(
                                                        "\n                                            " +
                                                          _vm._s(
                                                            _vm.$t(
                                                              "Subscribed to"
                                                            )
                                                          ) +
                                                          "\n                                        "
                                                      ),
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        "title d-flex",
                                                    },
                                                    [
                                                      _vm._v(
                                                        "\n                                            " +
                                                          _vm._s(
                                                            _vm.userPlan.name
                                                          ) +
                                                          "\n                                            " +
                                                          _vm._s(
                                                            _vm.$t("Plan")
                                                          ) +
                                                          "\n                                            "
                                                      ),
                                                      _vm.userPlan.badge
                                                        ? _c(
                                                            "div",
                                                            {
                                                              staticClass:
                                                                " ml-2 badge",
                                                              attrs: {
                                                                title:
                                                                  _vm.userPlan
                                                                    .name +
                                                                  " plan",
                                                              },
                                                            },
                                                            [
                                                              _c(
                                                                "v-icon",
                                                                {
                                                                  attrs: {
                                                                    color:
                                                                      "primary",
                                                                  },
                                                                },
                                                                [
                                                                  _vm._v(
                                                                    "$veutify.icons." +
                                                                      _vm._s(
                                                                        _vm
                                                                          .userPlan
                                                                          .badge
                                                                      )
                                                                  ),
                                                                ]
                                                              ),
                                                            ],
                                                            1
                                                          )
                                                        : _vm._e(),
                                                    ]
                                                  ),
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _vm.userPlan.stripe_plan
                                                ? _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        "align-center",
                                                    },
                                                    [
                                                      _c(
                                                        "div",
                                                        {
                                                          staticClass:
                                                            "plan__price",
                                                        },
                                                        [
                                                          _c(
                                                            "div",
                                                            {
                                                              staticClass:
                                                                "plan__price__currency",
                                                            },
                                                            [
                                                              _vm._v(
                                                                "\n                                                " +
                                                                  _vm._s(
                                                                    _vm.planCurrencySymbol(
                                                                      _vm.userPlan
                                                                    )
                                                                  ) +
                                                                  "\n                                            "
                                                              ),
                                                            ]
                                                          ),
                                                          _vm._v(" "),
                                                          _c(
                                                            "div",
                                                            {
                                                              staticClass:
                                                                "plan__price__amount",
                                                            },
                                                            [
                                                              _vm._v(
                                                                "\n                                                " +
                                                                  _vm._s(
                                                                    _vm.price(
                                                                      _vm
                                                                        .userPlan
                                                                        .amount
                                                                    )
                                                                  ) +
                                                                  "\n                                            "
                                                              ),
                                                            ]
                                                          ),
                                                          _vm._v(" "),
                                                          _c(
                                                            "div",
                                                            {
                                                              staticClass:
                                                                "plan__price__interval",
                                                            },
                                                            [
                                                              _vm._v(
                                                                "\n                                                / " +
                                                                  _vm._s(
                                                                    _vm.userPlan
                                                                      .interval
                                                                  ) +
                                                                  "\n                                            "
                                                              ),
                                                            ]
                                                          ),
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
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    { staticClass: "user-plan__features" },
                                    [
                                      _c(
                                        "div",
                                        {
                                          staticClass:
                                            "user-plan__features__title py-2",
                                        },
                                        [
                                          _c("v-divider"),
                                          _vm._v(
                                            "\n                                " +
                                              _vm._s(_vm.$t("Features")) +
                                              "\n                                "
                                          ),
                                          _c("v-divider"),
                                        ],
                                        1
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "ul",
                                        _vm._l(
                                          _vm.userPlan.displayed_features,
                                          function (feature, i) {
                                            return _c(
                                              "li",
                                              { key: i },
                                              [
                                                _c(
                                                  "v-icon",
                                                  {
                                                    staticClass: "mr-1",
                                                    attrs: {
                                                      color: "success",
                                                      small: "",
                                                    },
                                                  },
                                                  [
                                                    _vm._v(
                                                      "$vuetify.icons.check"
                                                    ),
                                                  ]
                                                ),
                                                _vm._v(
                                                  _vm._s(_vm.$t(feature)) +
                                                    "\n                                "
                                                ),
                                              ],
                                              1
                                            )
                                          }
                                        ),
                                        0
                                      ),
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-card-actions",
                                    { staticClass: " py-2 justify-center" },
                                    [
                                      _vm.isUpgradable
                                        ? _c(
                                            "v-btn",
                                            {
                                              attrs: {
                                                small: "",
                                                color: "#FF8F00",
                                                dark: "",
                                              },
                                              on: {
                                                click: function ($event) {
                                                  return _vm.$router.push({
                                                    name: "subscription",
                                                  })
                                                },
                                              },
                                            },
                                            [
                                              _c(
                                                "v-icon",
                                                { attrs: { left: "" } },
                                                [
                                                  _vm._v(
                                                    "$vuetify.icons.star-circle"
                                                  ),
                                                ]
                                              ),
                                              _vm._v(
                                                "\n                                " +
                                                  _vm._s(_vm.$t("Upgrade")) +
                                                  "\n                            "
                                              ),
                                            ],
                                            1
                                          )
                                        : _vm._e(),
                                      _vm._v(" "),
                                      _vm.$store.getters.getPlans &&
                                      _vm.$store.getters.getPlans.length > 1 &&
                                      !_vm.isUpgradable
                                        ? _c(
                                            "v-btn",
                                            {
                                              attrs: {
                                                small: "",
                                                color: "primary",
                                                dark: "",
                                              },
                                              on: {
                                                click: function ($event) {
                                                  return _vm.$router.push({
                                                    name: "subscription",
                                                  })
                                                },
                                              },
                                            },
                                            [
                                              _c(
                                                "v-icon",
                                                { attrs: { left: "" } },
                                                [
                                                  _vm._v(
                                                    "$vuetify.icons.refresh"
                                                  ),
                                                ]
                                              ),
                                              _vm._v(
                                                "\n                                " +
                                                  _vm._s(_vm.$t("Change")) +
                                                  "\n                            "
                                              ),
                                            ],
                                            1
                                          )
                                        : _vm._e(),
                                      _vm._v(" "),
                                      _c(
                                        "v-btn",
                                        {
                                          attrs: {
                                            color: "error",
                                            small: "",
                                            outlined: "",
                                          },
                                          on: { click: _vm.cancelSubscription },
                                        },
                                        [
                                          _c(
                                            "v-icon",
                                            { attrs: { left: "" } },
                                            [
                                              _vm._v(
                                                "$vuetify.icons.window-close"
                                              ),
                                            ]
                                          ),
                                          _vm._v(
                                            "\n                                " +
                                              _vm._s(_vm.$t("Cancel"))
                                          ),
                                        ],
                                        1
                                      ),
                                    ],
                                    1
                                  ),
                                ],
                                1
                              )
                            : _vm._e(),
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c("v-col", { attrs: { cols: "12" } }, [
                        _c("h1", [_vm._v("Solicitar")]),
                      ]),
                      _vm._v(" "),
                      _c(
                        "v-col",
                        { attrs: { cols: "12" } },
                        [
                          _c(
                            "v-btn",
                            {
                              staticClass: "success ml-auto d-flex",
                              attrs: { disabled: _vm.isLoading },
                              on: { click: _vm.saveChanges },
                            },
                            [_vm._v(_vm._s(_vm.$t("Save Changes")))]
                          ),
                        ],
                        1
                      ),
                    ],
                    1
                  ),
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-dialog",
                {
                  attrs: { "max-width": "800" },
                  model: {
                    value: _vm.requestArtistDialog,
                    callback: function ($$v) {
                      _vm.requestArtistDialog = $$v
                    },
                    expression: "requestArtistDialog",
                  },
                },
                [
                  _c(
                    "v-card",
                    { staticClass: "p-3  mx-auto" },
                    [
                      _c("v-card-title", { staticClass: "d-block" }, [
                        _c("div", { staticClass: "text-align-center" }, [
                          _c("div", { staticClass: "header" }, [
                            _vm._v(
                              "\n                            " +
                                _vm._s(_vm.$t("Fill your information")) +
                                "\n                        "
                            ),
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "sub" }, [
                            _vm._v(
                              "\n                            " +
                                _vm._s(
                                  _vm.$t(
                                    "This request can only be submitted ones."
                                  )
                                ) +
                                "\n                        "
                            ),
                          ]),
                        ]),
                      ]),
                      _vm._v(" "),
                      _c(
                        "v-row",
                        { staticClass: "px-4" },
                        [
                          _c(
                            "v-col",
                            {
                              staticClass: "p-2",
                              attrs: { lg: "3", md: "4", "x-sm": "6" },
                            },
                            [
                              _c("upload-image", {
                                attrs: {
                                  id: "artist-image",
                                  source:
                                    _vm.artistAccount.avatar ||
                                    "/storage/defaults/images/artist_avatar.png",
                                },
                                on: {
                                  imageReady: function ($event) {
                                    return _vm.imageReady($event, "artist")
                                  },
                                },
                              }),
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-col",
                            { attrs: { lg: "9", sm: "6" } },
                            [
                              _c("v-text-field", {
                                attrs: { label: _vm.$t("Firstname") },
                                model: {
                                  value: _vm.artistAccount.firstname,
                                  callback: function ($$v) {
                                    _vm.$set(
                                      _vm.artistAccount,
                                      "firstname",
                                      $$v
                                    )
                                  },
                                  expression: "artistAccount.firstname",
                                },
                              }),
                              _vm._v(" "),
                              _c("v-text-field", {
                                attrs: { label: _vm.$t("Lastname") },
                                model: {
                                  value: _vm.artistAccount.lastname,
                                  callback: function ($$v) {
                                    _vm.$set(_vm.artistAccount, "lastname", $$v)
                                  },
                                  expression: "artistAccount.lastname",
                                },
                              }),
                              _vm._v(" "),
                              _c("v-text-field", {
                                attrs: {
                                  label: _vm.$t("Displayname"),
                                  message:
                                    "This name will be displayed on your profile.",
                                },
                                model: {
                                  value: _vm.artistAccount.displayname,
                                  callback: function ($$v) {
                                    _vm.$set(
                                      _vm.artistAccount,
                                      "displayname",
                                      $$v
                                    )
                                  },
                                  expression: "artistAccount.displayname",
                                },
                              }),
                              _vm._v(" "),
                              _c("v-select", {
                                attrs: {
                                  label: _vm.$t("Country"),
                                  items: _vm.countriesList,
                                },
                                model: {
                                  value: _vm.artistAccount.country,
                                  callback: function ($$v) {
                                    _vm.$set(_vm.artistAccount, "country", $$v)
                                  },
                                  expression: "artistAccount.country",
                                },
                              }),
                              _vm._v(" "),
                              _c("v-text-field", {
                                attrs: { label: _vm.$t("Address") },
                                model: {
                                  value: _vm.artistAccount.address,
                                  callback: function ($$v) {
                                    _vm.$set(_vm.artistAccount, "address", $$v)
                                  },
                                  expression: "artistAccount.address",
                                },
                              }),
                              _vm._v(" "),
                              _c("v-text-field", {
                                attrs: { label: _vm.$t("Email") },
                                model: {
                                  value: _vm.artistAccount.email,
                                  callback: function ($$v) {
                                    _vm.$set(_vm.artistAccount, "email", $$v)
                                  },
                                  expression: "artistAccount.email",
                                },
                              }),
                              _vm._v(" "),
                              _c("v-text-field", {
                                attrs: {
                                  label: _vm.$t("Phone Number"),
                                  hint: "+xxxxxxxxxx",
                                },
                                model: {
                                  value: _vm.artistAccount.phone,
                                  callback: function ($$v) {
                                    _vm.$set(_vm.artistAccount, "phone", $$v)
                                  },
                                  expression: "artistAccount.phone",
                                },
                              }),
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-col",
                            { attrs: { cols: "12" } },
                            [
                              _c("edit-external-links", {
                                attrs: {
                                  item: _vm.artistAccount,
                                  expanded: true,
                                },
                                on: {
                                  spotify_link: function ($event) {
                                    _vm.artistAccount.spotify_link = $event
                                  },
                                  youtube_link: function ($event) {
                                    _vm.artistAccount.youtube_link = $event
                                  },
                                  soundcloud_link: function ($event) {
                                    _vm.artistAccount.soundcloud_link = $event
                                  },
                                  itunes_link: function ($event) {
                                    _vm.artistAccount.itunes_link = $event
                                  },
                                  deezer_link: function ($event) {
                                    _vm.artistAccount.deezer_link = $event
                                  },
                                },
                              }),
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
                                  staticClass: "ml-auto d-flex",
                                  attrs: {
                                    color: "success",
                                    disabled:
                                      _vm.status === "requested" ||
                                      _vm.isLoading,
                                  },
                                  on: { click: _vm.submitArtistAccount },
                                },
                                [_vm._v(_vm._s(_vm.$t("Submit")))]
                              ),
                            ],
                            1
                          ),
                        ],
                        1
                      ),
                    ],
                    1
                  ),
                ],
                1
              ),
            ],
            1
          )
        : _vm._e(),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/Album.vue?vue&type=template&id=e1df5ebe&":
/*!****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/pages/Album.vue?vue&type=template&id=e1df5ebe& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************/
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
  return _vm.album
    ? _c("fixed-left", {
        scopedSlots: _vm._u(
          [
            {
              key: "img",
              fn: function () {
                return [
                  _c(
                    "div",
                    { staticClass: "img-cover" },
                    [
                      _c("v-img", {
                        staticClass: "img",
                        attrs: { src: _vm.album.cover, "aspect-ratio": "1" },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "placeholder",
                              fn: function () {
                                return [
                                  _c(
                                    "div",
                                    {
                                      staticClass: "fixed-area__image-skeleton",
                                    },
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
                          false,
                          4032264742
                        ),
                      }),
                    ],
                    1
                  ),
                ]
              },
              proxy: true,
            },
            {
              key: "infos",
              fn: function () {
                return [
                  _c("div", { staticClass: "info-wrapper" }, [
                    _c("div", { staticClass: "title" }, [
                      _c("div", { staticClass: "info-badge" }, [
                        _vm._v(_vm._s(_vm.$t("Album"))),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "title__title" }, [
                        _c(
                          "div",
                          { staticClass: "align-center justify-between" },
                          [
                            _c("div", { staticClass: "title" }, [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(_vm.album.title) +
                                  "\n                        "
                              ),
                            ]),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "product-btn" },
                              [
                                _c("product-btn", {
                                  attrs: { item: _vm.album },
                                }),
                              ],
                              1
                            ),
                          ]
                        ),
                      ]),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "sub" },
                        [
                          _c("artists", {
                            staticClass: "py-3",
                            attrs: {
                              artists: _vm.album.artists,
                              withAvatar: true,
                            },
                          }),
                          _vm._v(" "),
                          _c(
                            "span",
                            { staticClass: "bold album-release-date" },
                            [
                              _vm._v(
                                _vm._s(
                                  _vm
                                    .moment(_vm.album.release_date)
                                    .format("ll")
                                )
                              ),
                            ]
                          ),
                          _vm._v(" "),
                          _c("div", { staticClass: "separator" }),
                          _vm._v(" "),
                          _c("span", [
                            _vm._v(
                              _vm._s(
                                _vm.album.songs
                                  ? _vm.album.songs.length == 1
                                    ? ""
                                    : _vm.album.songs.length
                                  : 0
                              ) +
                                " " +
                                _vm._s(
                                  _vm.album.songs && _vm.album.songs.length == 1
                                    ? _vm.$t("Single")
                                    : _vm.$t("Tracks")
                                )
                            ),
                          ]),
                        ],
                        1
                      ),
                    ]),
                  ]),
                ]
              },
              proxy: true,
            },
            {
              key: "buttons",
              fn: function () {
                return [
                  _c("div", { staticClass: "buttons" }, [
                    _c(
                      "div",
                      { staticClass: "btn-container" },
                      [
                        _c(
                          "v-btn",
                          {
                            staticClass: "play primary",
                            attrs: { rounded: "", small: "" },
                            on: {
                              click: function ($event) {
                                return _vm.$store.dispatch("playAlbum", {
                                  album: _vm.album,
                                })
                              },
                            },
                          },
                          [
                            _c("v-icon", { attrs: { left: "" } }, [
                              _vm._v("$vuetify.icons.play"),
                            ]),
                            _vm._v(
                              "\n                    " + _vm._s(_vm.$t("Play"))
                            ),
                          ],
                          1
                        ),
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "btn-container" },
                      [
                        !_vm.isLiked
                          ? _c(
                              "v-btn",
                              {
                                attrs: { rounded: "", small: "" },
                                on: { click: _vm.likeAlbum },
                              },
                              [
                                _c("v-icon", { attrs: { small: "" } }, [
                                  _vm._v("$vuetify.icons.heart-outline"),
                                ]),
                              ],
                              1
                            )
                          : _c(
                              "v-btn",
                              {
                                attrs: { rounded: "", small: "" },
                                on: { click: _vm.likeAlbum },
                              },
                              [
                                _c(
                                  "v-icon",
                                  { attrs: { color: "primary", small: "" } },
                                  [_vm._v("$vuetify.icons.heart")]
                                ),
                              ],
                              1
                            ),
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "btn-container" },
                      [
                        _c(
                          "v-btn",
                          {
                            staticClass: "secondary",
                            attrs: { small: "", rounded: "" },
                            on: {
                              click: function ($event) {
                                _vm.$store.commit("shareItem", {
                                  cover: _vm.album.cover,
                                  url: _vm.getItemURL(_vm.album),
                                  title: _vm.album.title,
                                  type: _vm.album.type,
                                  artist: _vm.getMainArtist(_vm.album),
                                })
                              },
                            },
                          },
                          [
                            _c("v-icon", { attrs: { small: "" } }, [
                              _vm._v("$vuetify.icons.share"),
                            ]),
                          ],
                          1
                        ),
                      ],
                      1
                    ),
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "pt-4" },
                    [_c("external-links", { attrs: { content: _vm.album } })],
                    1
                  ),
                ]
              },
              proxy: true,
            },
            {
              key: "main",
              fn: function () {
                return [
                  _vm.album.songs && _vm.album.songs.length
                    ? _c(
                        "div",
                        { staticClass: "songs-container" },
                        [
                          _c("List", {
                            staticClass: "song-list",
                            attrs: {
                              isAlbum: true,
                              content: _vm.album.songs,
                              headers: "true",
                              ranked: "true",
                            },
                          }),
                        ],
                        1
                      )
                    : _vm.album.id
                    ? _c("empty-page", {
                        attrs: {
                          img: "peep-68.png",
                          headline: _vm.$t("No Songs!"),
                          sub: _vm.$t("This album is empty."),
                        },
                      })
                    : _vm._e(),
                ]
              },
              proxy: true,
            },
          ],
          null,
          false,
          3623756791
        ),
      })
    : !_vm.album && _vm.errorStatus == 404
    ? _c("empty-page", {
        attrs: {
          headline: _vm.$t("Not Available!"),
          sub: _vm.$t("Album") + " " + _vm.$t("does not exist."),
          img: "peep-68.png",
        },
        scopedSlots: _vm._u([
          {
            key: "button",
            fn: function () {
              return [
                _c(
                  "v-btn",
                  {
                    staticClass: "primary",
                    attrs: { small: "", rounded: "" },
                    on: {
                      click: function ($event) {
                        return _vm.$router.go(-1)
                      },
                    },
                  },
                  [
                    _vm._v(
                      "\n            " +
                        _vm._s(_vm.$t("Go back")) +
                        "\n        "
                    ),
                  ]
                ),
              ]
            },
            proxy: true,
          },
        ]),
      })
    : !_vm.album && _vm.errorStatus
    ? _c("empty-page", {
        attrs: {
          headline: _vm.$t("Something wrong happend!"),
          sub: _vm.$t("Some server error has occurred. Try again later."),
          img: "peep-68.png",
        },
        scopedSlots: _vm._u([
          {
            key: "button",
            fn: function () {
              return [
                _c(
                  "v-btn",
                  {
                    staticClass: "primary",
                    attrs: { small: "", rounded: "" },
                    on: {
                      click: function ($event) {
                        return _vm.$router.go(-1)
                      },
                    },
                  },
                  [
                    _vm._v(
                      "\n            " +
                        _vm._s(_vm.$t("Go back")) +
                        "\n        "
                    ),
                  ]
                ),
              ]
            },
            proxy: true,
          },
        ]),
      })
    : _c("page-loading")
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/Artist.vue?vue&type=template&id=a4d4eaf6&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/pages/Artist.vue?vue&type=template&id=a4d4eaf6& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************/
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
  return _vm.artist
    ? _c("fixed-left", {
        staticClass: "artist",
        scopedSlots: _vm._u(
          [
            {
              key: "img",
              fn: function () {
                return [
                  _c(
                    "div",
                    { staticClass: "img-cover" },
                    [
                      _c("v-img", {
                        staticClass: "img",
                        attrs: { src: _vm.artist.avatar, "aspect-ratio": "1" },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "placeholder",
                              fn: function () {
                                return [
                                  _c(
                                    "div",
                                    {
                                      staticClass: "fixed-area__image-skeleton",
                                    },
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
                          false,
                          4032264742
                        ),
                      }),
                    ],
                    1
                  ),
                ]
              },
              proxy: true,
            },
            {
              key: "infos",
              fn: function () {
                return [
                  _c("div", { staticClass: "info-wrapper" }, [
                    _c("div", { staticClass: "title" }, [
                      _c("div", { staticClass: "info-badge" }, [
                        _vm._v(_vm._s(_vm.$t("ARTIST"))),
                      ]),
                      _vm._v(" "),
                      _c("div", [_vm._v(_vm._s(_vm.artist.displayname))]),
                    ]),
                  ]),
                ]
              },
              proxy: true,
            },
            {
              key: "buttons",
              fn: function () {
                return [
                  _c("div", { staticClass: "buttons" }, [
                    _c(
                      "div",
                      { staticClass: "play-button" },
                      [
                        _c(
                          "v-btn",
                          {
                            staticClass: "primary",
                            attrs: { rounded: "", small: "" },
                            on: {
                              click: function ($event) {
                                return _vm.$store.dispatch("updateQueue", {
                                  content: _vm.artist.top_tracks,
                                  reset: true,
                                })
                              },
                            },
                          },
                          [
                            _c("v-icon", { attrs: { left: "" } }, [
                              _vm._v("$vuetify.icons.play"),
                            ]),
                            _vm._v(
                              "\n                    " +
                                _vm._s(_vm.$t("Play")) +
                                "\n                "
                            ),
                          ],
                          1
                        ),
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _vm.isFollowed !== null
                      ? _c(
                          "div",
                          { staticClass: "follow-button" },
                          [
                            _vm.isFollowed
                              ? _c(
                                  "v-btn",
                                  {
                                    staticClass: "secondary",
                                    attrs: { rounded: "", small: "" },
                                    on: {
                                      click: function ($event) {
                                        return _vm.follow()
                                      },
                                    },
                                  },
                                  [
                                    _vm._v(
                                      "\n                    " +
                                        _vm._s(_vm.$t("Following")) +
                                        "\n                "
                                    ),
                                  ]
                                )
                              : _c(
                                  "v-btn",
                                  {
                                    staticClass: "primary",
                                    attrs: { rounded: "", small: "" },
                                    on: {
                                      click: function ($event) {
                                        return _vm.follow()
                                      },
                                    },
                                  },
                                  [
                                    _vm._v(
                                      "\n                    " +
                                        _vm._s(_vm.$t("Follow")) +
                                        "\n                "
                                    ),
                                  ]
                                ),
                          ],
                          1
                        )
                      : _vm._e(),
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "pt-4" },
                    [_c("external-links", { attrs: { content: _vm.artist } })],
                    1
                  ),
                ]
              },
              proxy: true,
            },
            {
              key: "main",
              fn: function () {
                return [
                  _vm.artist.top_tracks ||
                  _vm.artist.albums ||
                  _vm.artist.latest
                    ? _c("div", { staticClass: "profile-main-content" }, [
                        _vm.artist.latest
                          ? _c("div", { staticClass: "latest" }, [
                              _c("div", { staticClass: "card-title-medium" }, [
                                _vm._v(
                                  "\n                    " +
                                    _vm._s(_vm.$t("Latest Song")) +
                                    "\n                "
                                ),
                              ]),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "content" },
                                [
                                  _c("song-encap", {
                                    attrs: { song: _vm.artist.latest },
                                    on: {
                                      song: function ($event) {
                                        return _vm.$store.commit(
                                          "updatePlaylist",
                                          [$event]
                                        )
                                      },
                                    },
                                  }),
                                ],
                                1
                              ),
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.artist.top_tracks && _vm.artist.top_tracks.length
                          ? _c(
                              "div",
                              { staticClass: "popular-songs" },
                              [
                                _c(
                                  "div",
                                  { staticClass: "card-title-medium" },
                                  [
                                    _vm._v(
                                      "\n                    " +
                                        _vm._s(_vm.$t("Popular Songs")) +
                                        "\n                "
                                    ),
                                  ]
                                ),
                                _vm._v(" "),
                                _c("List", {
                                  staticClass: "song-list",
                                  attrs: {
                                    isAlbum: true,
                                    content: _vm.artist.top_tracks,
                                    headers: "true",
                                    ranked: "true",
                                  },
                                }),
                              ],
                              1
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.artist.albums && _vm.artist.albums.length
                          ? _c("div", { staticClass: "albums" }, [
                              _c("div", { staticClass: "card-title-medium" }, [
                                _vm._v(
                                  "\n                    " +
                                    _vm._s(_vm.$t("Albums")) +
                                    "\n                "
                                ),
                              ]),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "content" },
                                [
                                  _c("swiper-section", {
                                    attrs: {
                                      content: _vm.artist.albums,
                                      _breakpoints: _vm.albumsSwiperBreakpoints,
                                    },
                                  }),
                                ],
                                1
                              ),
                            ])
                          : _vm._e(),
                      ])
                    : [
                        _c("empty-page", {
                          attrs: {
                            img: "peep-68.png",
                            headline: _vm.$t("This artist profile is empty."),
                            sub: _vm.$t(
                              "Looks like this account is still new!"
                            ),
                          },
                        }),
                      ],
                ]
              },
              proxy: true,
            },
          ],
          null,
          false,
          3165471710
        ),
      })
    : !_vm.artist && _vm.errorStatus == 404
    ? _c("empty-page", {
        attrs: {
          headline: _vm.$t("Not Available!"),
          sub: "Artist does not exist!",
          img: "peep-68.png",
        },
        scopedSlots: _vm._u([
          {
            key: "button",
            fn: function () {
              return [
                _c(
                  "v-btn",
                  {
                    staticClass: "primary",
                    attrs: { small: "", rounded: "" },
                    on: {
                      click: function ($event) {
                        return _vm.$router.go(-1)
                      },
                    },
                  },
                  [
                    _vm._v(
                      "\n            " +
                        _vm._s(_vm.$t("Go back")) +
                        "\n        "
                    ),
                  ]
                ),
              ]
            },
            proxy: true,
          },
        ]),
      })
    : !_vm.artist && _vm.errorStatus
    ? _c("empty-page", {
        attrs: {
          headline: _vm.$t("Something wrong happend!"),
          sub: _vm.$t("Some server error has occurred. Try again later."),
          img: "peep-68.png",
        },
        scopedSlots: _vm._u([
          {
            key: "button",
            fn: function () {
              return [
                _c(
                  "v-btn",
                  {
                    staticClass: "primary",
                    attrs: { rounded: "", small: "" },
                    on: {
                      click: function ($event) {
                        return _vm.$router.go(-1)
                      },
                    },
                  },
                  [_vm._v(_vm._s(_vm.$t("Go Back")))]
                ),
              ]
            },
            proxy: true,
          },
        ]),
      })
    : _c("page-loading")
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/CustomPage.vue?vue&type=template&id=32a6d544&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/pages/CustomPage.vue?vue&type=template&id=32a6d544&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************/
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
  return _vm.page && _vm.page !== "404"
    ? _c(
        "div",
        { staticClass: "content-page" },
        [
          _vm.page.blank
            ? [
                _c("div", { staticClass: "content-container" }, [
                  _c("div", {
                    staticClass: "page-content",
                    domProps: { innerHTML: _vm._s(_vm.page.content) },
                  }),
                ]),
              ]
            : [
                _c("div", { staticClass: "icon-header" }, [
                  _c(
                    "div",
                    { staticClass: "cover" },
                    [
                      _c("v-icon", { attrs: { dark: "" } }, [
                        _vm._v("$vuetify.icons." + _vm._s(_vm.page.icon)),
                      ]),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "title" }, [
                    _c("div", { staticClass: "headline" }, [
                      _vm._v(
                        "\n                    " +
                          _vm._s(_vm.$t(_vm.page.title)) +
                          "\n                "
                      ),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "sub" }, [
                      _vm._v(
                        "\n                    " +
                          _vm._s(_vm.$t(_vm.page.description)) +
                          "\n                "
                      ),
                    ]),
                  ]),
                ]),
                _vm._v(" "),
                _vm.$store.getters.getSettings.enableAds
                  ? [
                      _vm.parseAd(_vm.$store.getters.getSettings.rect_ad)
                        .position === "tcp"
                        ? _c(
                            "div",
                            { staticClass: "ad-slot" },
                            [
                              !_vm.hasPermission("No ads")
                                ? _c("ad", {
                                    attrs: {
                                      ad_code: _vm.parseAd(
                                        _vm.$store.getters.getSettings.rect_ad
                                      ).code,
                                    },
                                    on: {
                                      click: function ($event) {
                                        _vm.$store.getters.getSettings.ga4 &&
                                        _vm.$store.getters.getSettings
                                          .analytics_adClick_event
                                          ? _vm.emitAnalyticsEvent({
                                              action: "ad_click",
                                              category: "leaderboard_ad",
                                              label: "top of content page",
                                            })
                                          : ""
                                      },
                                    },
                                  })
                                : _vm._e(),
                            ],
                            1
                          )
                        : _vm._e(),
                    ]
                  : _vm._e(),
                _vm._v(" "),
                _vm.page.sections
                  ? _c(
                      "div",
                      { attrs: { id: "main-content" } },
                      [
                        _vm.page.sections.length && _vm.contentLength
                          ? [
                              _vm._l(_vm.page.sections, function (section) {
                                return [
                                  section.layout === "section"
                                    ? _c("swiper-section", {
                                        key: section.rank,
                                        attrs: { section: section },
                                        on: {
                                          contentLength: function ($event) {
                                            _vm.contentLength += $event
                                          },
                                          content: function ($event) {
                                            _vm.loading = false
                                          },
                                        },
                                      })
                                    : section.layout === "list"
                                    ? _c("List", {
                                        key: section.rank,
                                        attrs: { section: section },
                                        on: {
                                          contentLength: function ($event) {
                                            _vm.contentLength += $event
                                          },
                                        },
                                      })
                                    : section.layout === "cards"
                                    ? _c("Featured", {
                                        key: section.rank,
                                        attrs: { section: section },
                                        on: {
                                          contentLength: function ($event) {
                                            _vm.contentLength += $event
                                          },
                                        },
                                      })
                                    : _vm._e(),
                                ]
                              }),
                            ]
                          : [
                              _c("empty-page", {
                                attrs: {
                                  headline: _vm.$t("No Content!"),
                                  sub: _vm.$t(
                                    "There is no content to be displayed."
                                  ),
                                },
                              }),
                            ],
                        _vm._v(" "),
                        _vm.$store.getters.getSettings.enableAds
                          ? [
                              _vm.parseAd(
                                _vm.$store.getters.getSettings.rect_ad
                              ).position === "bcp"
                                ? _c(
                                    "div",
                                    { staticClass: "ad-slot" },
                                    [
                                      !_vm.hasPermission("No ads")
                                        ? _c("ad", {
                                            attrs: {
                                              ad_code: _vm.parseAd(
                                                _vm.$store.getters.getSettings
                                                  .rect_ad
                                              ).code,
                                            },
                                            on: {
                                              click: function ($event) {
                                                _vm.$store.getters.getSettings
                                                  .ga4 &&
                                                _vm.$store.getters.getSettings
                                                  .analytics_adClick_event
                                                  ? _vm.emitAnalyticsEvent({
                                                      action: "ad_click",
                                                      category:
                                                        "leaderboard_ad",
                                                      label:
                                                        "bottom of content page",
                                                    })
                                                  : ""
                                              },
                                            },
                                          })
                                        : _vm._e(),
                                    ],
                                    1
                                  )
                                : _vm._e(),
                            ]
                          : _vm._e(),
                      ],
                      2
                    )
                  : _vm._e(),
              ],
        ],
        2
      )
    : _vm.page === "404"
    ? _c("div", { attrs: { id: "page-404-container" } }, [
        _c(
          "div",
          { staticClass: "content" },
          [
            _c("empty-page", {
              attrs: { headline: _vm.$t("Page Not Found"), img: "peep-68.png" },
            }),
          ],
          1
        ),
      ])
    : _c("page-loading")
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/Playlist.vue?vue&type=template&id=0fb27e10&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/pages/Playlist.vue?vue&type=template&id=0fb27e10& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************/
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
  return _vm.playlist
    ? _c("fixed-left", {
        scopedSlots: _vm._u(
          [
            {
              key: "img",
              fn: function () {
                return [
                  _c(
                    "div",
                    { staticClass: "img-cover" },
                    [
                      _c("v-img", {
                        staticClass: "img",
                        attrs: { src: _vm.playlist.cover, "aspect-ratio": "1" },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "placeholder",
                              fn: function () {
                                return [
                                  _c(
                                    "div",
                                    {
                                      staticClass: "fixed-area__image-skeleton",
                                    },
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
                          false,
                          4032264742
                        ),
                      }),
                    ],
                    1
                  ),
                ]
              },
              proxy: true,
            },
            {
              key: "infos",
              fn: function () {
                return [
                  _c("div", { staticClass: "info-wrapper" }, [
                    _c("div", { staticClass: "info-badge" }, [
                      _vm._v(_vm._s(_vm.$t("PLAYLIST"))),
                    ]),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "title justify-between" },
                      [
                        _vm._v(
                          "\n        " +
                            _vm._s(_vm.playlist.title) +
                            "\n        "
                        ),
                        !_vm.playlist.public
                          ? _c(
                              "v-icon",
                              { attrs: { title: _vm.$t("Private playlist") } },
                              [_vm._v("$vuetify.icons.key")]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.playlist.songs.length
                          ? _c(
                              "div",
                              { staticClass: "menu-toggle" },
                              [
                                _c(
                                  "v-icon",
                                  {
                                    on: {
                                      click: function ($event) {
                                        _vm.showMenu = !_vm.showMenu
                                      },
                                    },
                                  },
                                  [_vm._v("$vuetify.icons.menu")]
                                ),
                                _vm._v(" "),
                                _vm.showMenu
                                  ? _c(
                                      "abs-menu",
                                      { style: { top: "24px", right: 0 } },
                                      [
                                        _c(
                                          "ul",
                                          {
                                            staticClass:
                                              "abs-menu-container__list",
                                          },
                                          [
                                            _c(
                                              "li",
                                              {
                                                on: {
                                                  click: function ($event) {
                                                    _vm.$store.commit(
                                                      "pushIntoQueue",
                                                      _vm.playlist.songs
                                                    )
                                                    _vm.showMenu = false
                                                  },
                                                },
                                              },
                                              [
                                                _c("v-icon", [
                                                  _vm._v(
                                                    "$vuetify.icons.account-music"
                                                  ),
                                                ]),
                                                _vm._v(
                                                  "\n                " +
                                                    _vm._s(
                                                      _vm.$t("Add To Queue")
                                                    ) +
                                                    "\n              "
                                                ),
                                              ],
                                              1
                                            ),
                                          ]
                                        ),
                                      ]
                                    )
                                  : _vm._e(),
                              ],
                              1
                            )
                          : _vm._e(),
                      ],
                      1
                    ),
                  ]),
                ]
              },
              proxy: true,
            },
            {
              key: "buttons",
              fn: function () {
                return [
                  _c("div", { staticClass: "buttons" }, [
                    _c(
                      "div",
                      { staticClass: "btn-container" },
                      [
                        _c(
                          "v-btn",
                          {
                            staticClass: "primary",
                            attrs: {
                              rounded: "",
                              small: "",
                              disabled: !_vm.playlist.songs.length,
                            },
                            on: {
                              click: function ($event) {
                                return _vm.$store.dispatch("playPlaylist", {
                                  playlist: _vm.playlist,
                                })
                              },
                            },
                          },
                          [_vm._v(_vm._s(_vm.$t("Play")))]
                        ),
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _vm.playlist.user &&
                    _vm.$store.getters.getUser &&
                    _vm.playlist.user.id == _vm.$store.getters.getUser.id
                      ? _c(
                          "div",
                          { staticClass: "btn-container" },
                          [
                            _c(
                              "v-btn",
                              {
                                staticClass: "info white--text",
                                attrs: { rounded: "", small: "" },
                                on: {
                                  click: function ($event) {
                                    _vm.editPlaylist = true
                                  },
                                },
                              },
                              [_vm._v(_vm._s(_vm.$t("Edit")))]
                            ),
                          ],
                          1
                        )
                      : _c(
                          "div",
                          { staticClass: "btn-container" },
                          [
                            !_vm.isFollowed
                              ? _c(
                                  "v-btn",
                                  {
                                    staticClass: "secondary",
                                    attrs: { rounded: "", small: "" },
                                    on: { click: _vm.followPlaylist },
                                  },
                                  [_vm._v(_vm._s(_vm.$t("Follow")))]
                                )
                              : _c(
                                  "v-btn",
                                  {
                                    staticClass: "primary",
                                    attrs: { rounded: "", small: "" },
                                    on: { click: _vm.followPlaylist },
                                  },
                                  [_vm._v(_vm._s(_vm.$t("Unfollow")))]
                                ),
                          ],
                          1
                        ),
                  ]),
                ]
              },
              proxy: true,
            },
            {
              key: "main",
              fn: function () {
                return [
                  _vm.editPlaylist
                    ? _c("edit-playlist", {
                        attrs: { playlist: _vm.playlist },
                        on: {
                          updated: _vm.playlistUpdated,
                          cancel: function ($event) {
                            _vm.editPlaylist = false
                          },
                        },
                      })
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.playlist.songs &&
                  _vm.playlist.songs.filter(function (valid) {
                    return valid
                  }).length
                    ? _c(
                        "div",
                        { staticClass: "trcks-container" },
                        [
                          _c("List", {
                            staticClass: "song-list",
                            attrs: {
                              isAlbum: true,
                              isPlaylistOwner:
                                _vm.playlist.user &&
                                _vm.$store.getters.getUser &&
                                _vm.playlist.user.id ==
                                  _vm.$store.getters.getUser.id,
                              playlist_id: _vm.playlist.id,
                              content: _vm.playlist.songs,
                              headers: "true",
                              ranked: "true",
                            },
                            on: {
                              deleted: function ($event) {
                                return _vm.spliceSong($event)
                              },
                            },
                          }),
                        ],
                        1
                      )
                    : _c("empty-page", {
                        attrs: {
                          img: "peep-68.png",
                          headline: _vm.$t("No Songs!"),
                          sub: _vm.$t("This playlist is empty."),
                        },
                      }),
                ]
              },
              proxy: true,
            },
          ],
          null,
          false,
          3094407114
        ),
      })
    : !_vm.playlist && _vm.errorStatus == 404
    ? _c("empty-page", {
        attrs: {
          headline: _vm.$t("Not Available!"),
          sub: _vm.$t(
            "Playlist does not exist or maybe it is not available for public access. who knows!"
          ),
          img: "peep-68.png",
        },
        scopedSlots: _vm._u([
          {
            key: "button",
            fn: function () {
              return [
                _c(
                  "v-btn",
                  {
                    staticClass: "primary",
                    attrs: { rounded: "", small: "" },
                    on: {
                      click: function ($event) {
                        return _vm.$router.go(-1)
                      },
                    },
                  },
                  [_vm._v(_vm._s(_vm.$t("Go Back")))]
                ),
              ]
            },
            proxy: true,
          },
        ]),
      })
    : !_vm.playlist && _vm.errorStatus
    ? _c("empty-page", {
        attrs: {
          headline: _vm.$t("Something wrong happend!"),
          sub: _vm.$t("Some server error has occurred. Try again later."),
          img: "peep-68.png",
        },
        scopedSlots: _vm._u([
          {
            key: "button",
            fn: function () {
              return [
                _c(
                  "v-btn",
                  {
                    staticClass: "primary",
                    attrs: { rounded: "", small: "" },
                    on: {
                      click: function ($event) {
                        return _vm.$router.go(-1)
                      },
                    },
                  },
                  [_vm._v(_vm._s(_vm.$t("Go Back")))]
                ),
              ]
            },
            proxy: true,
          },
        ]),
      })
    : _c("page-loading")
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/Podcast.vue?vue&type=template&id=77eca436&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/pages/Podcast.vue?vue&type=template&id=77eca436&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************/
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
  return _vm.podcast
    ? _c("div", { staticClass: "podcast-container elevate-page" }, [
        _c("div", { staticClass: "podcast__header" }, [
          _c("div", { staticClass: "podcast__info" }, [
            _c(
              "div",
              { staticClass: "podcast__cover" },
              [
                _c("v-img", {
                  staticClass: "podcast__cover__img",
                  attrs: { src: _vm.podcast.cover, "aspect-ratio": "1" },
                  scopedSlots: _vm._u(
                    [
                      {
                        key: "placeholder",
                        fn: function () {
                          return [
                            _c(
                              "div",
                              { staticClass: "fixed-area__image-skeleton" },
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
                    false,
                    4032264742
                  ),
                }),
              ],
              1
            ),
            _vm._v(" "),
            _c("div", { staticClass: "podcast__text" }, [
              _c("div", { staticClass: "info-badge" }, [
                _vm._v(_vm._s(_vm.$t("Podcast"))),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "podcast__text__title" }, [
                _vm._v(_vm._s(_vm.podcast.title)),
              ]),
              _vm._v(" "),
              _vm.podcast.artist && _vm.podcast.artist.id
                ? _c(
                    "div",
                    {},
                    [
                      _c(
                        "router-link",
                        {
                          staticClass:
                            "router-link d-flex pt-2 pb-5 mb-3 align-center",
                          attrs: {
                            to: {
                              name: "artist",
                              params: { id: _vm.podcast.artist.id },
                            },
                            target: "_blank",
                          },
                        },
                        [
                          _c(
                            "div",
                            { staticClass: "avatar mr-2" },
                            [
                              _c(
                                "v-avatar",
                                { attrs: { size: "35" } },
                                [
                                  _c("v-img", {
                                    attrs: { src: _vm.podcast.artist.avatar },
                                  }),
                                ],
                                1
                              ),
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c("div", { staticClass: "artist-name" }, [
                            _vm._v(
                              "\n                            " +
                                _vm._s(_vm.podcast.artist.displayname) +
                                "\n                        "
                            ),
                          ]),
                        ]
                      ),
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _c("div", {
                staticClass: "podcast__description-lg",
                domProps: { innerHTML: _vm._s(_vm.podcast.description) },
              }),
            ]),
          ]),
          _vm._v(" "),
          _c("div", {
            staticClass: "podcast__description-sm",
            domProps: { innerHTML: _vm._s(_vm.podcast.description) },
          }),
          _vm._v(" "),
          _c("div", { staticClass: "podcast__actions" }, [
            _c(
              "div",
              { staticClass: "play-button" },
              [
                _c(
                  "v-btn",
                  {
                    attrs: {
                      color: "primary",
                      rounded: "",
                      block: "",
                      disabled: !_vm.podcast.episodes.length,
                    },
                    on: {
                      click: function ($event) {
                        return _vm.$store.dispatch("playPodcast", {
                          podcast: _vm.podcast,
                        })
                      },
                    },
                  },
                  [
                    _c("v-icon", { attrs: { left: "" } }, [
                      _vm._v("$vuetify.icons.play"),
                    ]),
                    _vm._v(
                      "\n                    " +
                        _vm._s(_vm.$t("Play")) +
                        "\n                "
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
        _c(
          "div",
          { staticClass: "podcast__body" },
          [
            _vm.podcast.episodes.length
              ? _c("div", { staticClass: "podcast__episodes" }, [
                  _c("div", { staticClass: "podcast__title py-4" }, [
                    _vm._v(
                      "\n                " +
                        _vm._s(_vm.$t("All Episodes")) +
                        "\n            "
                    ),
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "episodes" },
                    _vm._l(_vm.podcast.episodes, function (episode) {
                      return _c(
                        "v-card",
                        {
                          key: episode.id,
                          staticClass: "episode",
                          on: {
                            click: function ($event) {
                              return _vm.$store.dispatch("playEpisode", {
                                episode: episode,
                                reset: true,
                              })
                            },
                          },
                        },
                        [
                          _c("div", { staticClass: "justify-between" }, [
                            _c(
                              "div",
                              { staticClass: "episode__cover" },
                              [
                                _c(
                                  "v-img",
                                  {
                                    staticClass: "episode__cover__img",
                                    attrs: {
                                      src: episode.cover,
                                      width: "100px",
                                      "aspect-ratio": "1",
                                    },
                                    scopedSlots: _vm._u(
                                      [
                                        {
                                          key: "placeholder",
                                          fn: function () {
                                            return [
                                              _c(
                                                "div",
                                                {
                                                  staticClass:
                                                    "fixed-area__image-skeleton",
                                                },
                                                [
                                                  _c(
                                                    "content-placeholders",
                                                    {
                                                      attrs: { rounded: true },
                                                    },
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
                                    _vm.$store.getters.getCurrentAudio &&
                                    _vm.$store.getters.getCurrentAudio.id ===
                                      episode.id &&
                                    _vm.$store.getters.getCurrentAudio.podcast
                                      ? _c(
                                          "div",
                                          {
                                            staticClass:
                                              "dark-layer hide-above-699",
                                          },
                                          [
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "icon icon-inside-cover absolute fill",
                                              },
                                              [
                                                _c(
                                                  "div",
                                                  {
                                                    staticClass:
                                                      "epico_music-is-playing-container",
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
                              { staticClass: "share-button hide-above-699" },
                              [
                                _c(
                                  "v-btn",
                                  {
                                    attrs: {
                                      color: "primary",
                                      rounded: "",
                                      small: "",
                                    },
                                    on: {
                                      click: function ($event) {
                                        $event.stopPropagation()
                                        return _vm.shareEpisode(episode)
                                      },
                                    },
                                  },
                                  [
                                    _c("v-icon", { attrs: { left: "" } }, [
                                      _vm._v("$vuetify.icons.share-variant"),
                                    ]),
                                    _vm._v(
                                      "\n                                " +
                                        _vm._s(_vm.$t("Share")) +
                                        "\n                            "
                                    ),
                                  ],
                                  1
                                ),
                              ],
                              1
                            ),
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "episode__body" }, [
                            _c("div", { staticClass: "episode-header" }, [
                              _c("div", { staticClass: "infos" }, [
                                _c("div", { staticClass: "title" }, [
                                  _c(
                                    "div",
                                    { staticClass: "icon hide-under-700" },
                                    [
                                      _vm.$store.getters.getCurrentAudio &&
                                      _vm.$store.getters.getCurrentAudio.id ===
                                        episode.id &&
                                      _vm.$store.getters.getCurrentAudio.podcast
                                        ? [
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "epico_music-is-playing-container",
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
                                        : [
                                            _c(
                                              "v-icon",
                                              {
                                                staticClass:
                                                  "icon__access-point",
                                                attrs: { large: "" },
                                              },
                                              [
                                                _vm._v(
                                                  "$vuetify.icons.access-point"
                                                ),
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "v-icon",
                                              {
                                                staticClass: "icon__play",
                                                attrs: { large: "" },
                                              },
                                              [_vm._v("$vuetify.icons.play")]
                                            ),
                                          ],
                                    ],
                                    2
                                  ),
                                  _vm._v(" "),
                                  _c("div", { staticClass: "title__title" }, [
                                    _vm._v(
                                      "\n                                        " +
                                        _vm._s(episode.title) +
                                        "\n                                    "
                                    ),
                                  ]),
                                ]),
                                _vm._v(" "),
                                _c("div", { staticClass: "times" }, [
                                  _c("div", { staticClass: "created_at" }, [
                                    _vm._v(
                                      "\n                                        " +
                                        _vm._s(
                                          _vm.formatEpisodeDate(
                                            episode.created_at
                                          )
                                        ) +
                                        "\n                                    "
                                    ),
                                  ]),
                                  _vm._v(" "),
                                  _c("div", { staticClass: "duration" }, [
                                    _vm._v(
                                      "\n                                        " +
                                        _vm._s(
                                          _vm.formatEpisodeDuration(
                                            episode.duration
                                          )
                                        ) +
                                        "\n                                    "
                                    ),
                                  ]),
                                ]),
                              ]),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "share-button hide-under-700" },
                                [
                                  _c(
                                    "v-btn",
                                    {
                                      attrs: {
                                        color: "primary",
                                        rounded: "",
                                        small: "",
                                      },
                                      on: {
                                        click: function ($event) {
                                          $event.stopPropagation()
                                          return _vm.shareEpisode(episode)
                                        },
                                      },
                                    },
                                    [
                                      _c("v-icon", { attrs: { left: "" } }, [
                                        _vm._v("$vuetify.icons.share-variant"),
                                      ]),
                                      _vm._v(
                                        "\n                                    " +
                                          _vm._s(_vm.$t("Share")) +
                                          "\n                                "
                                      ),
                                    ],
                                    1
                                  ),
                                ],
                                1
                              ),
                            ]),
                            _vm._v(" "),
                            _c("div", {
                              staticClass: "description",
                              domProps: {
                                innerHTML: _vm._s(episode.description),
                              },
                            }),
                          ]),
                        ]
                      )
                    }),
                    1
                  ),
                ])
              : _c("empty-page", {
                  attrs: {
                    headline: _vm.$t("No Episodes!"),
                    sub: _vm.$t("Looks like this podcast has no episodes yet."),
                    img: "peep-34.png",
                  },
                }),
          ],
          1
        ),
      ])
    : !_vm.podcast && _vm.errorStatus == 404
    ? _c("empty-page", {
        attrs: {
          headline: _vm.$t("Not Available!"),
          sub: _vm.$t("Podcast") + "" + _vm.$t("does no exist."),
          img: "peep-68.png",
        },
        scopedSlots: _vm._u([
          {
            key: "button",
            fn: function () {
              return [
                _c(
                  "v-btn",
                  {
                    staticClass: "primary",
                    attrs: { rounded: "", small: "" },
                    on: {
                      click: function ($event) {
                        return _vm.$router.go(-1)
                      },
                    },
                  },
                  [_vm._v(_vm._s(_vm.$t("Go Back")))]
                ),
              ]
            },
            proxy: true,
          },
        ]),
      })
    : !_vm.podcast && _vm.errorStatus
    ? _c("empty-page", {
        attrs: {
          headline: _vm.$t("Something wrong happend!"),
          sub: _vm.$t("Some server error has occurred. Try again later."),
          img: "peep-68.png",
        },
        scopedSlots: _vm._u([
          {
            key: "button",
            fn: function () {
              return [
                _c(
                  "v-btn",
                  {
                    staticClass: "primary",
                    attrs: { rounded: "", small: "" },
                    on: {
                      click: function ($event) {
                        return _vm.$router.go(-1)
                      },
                    },
                  },
                  [_vm._v(_vm._s(_vm.$t("Go Back")))]
                ),
              ]
            },
            proxy: true,
          },
        ]),
      })
    : _c("page-loading")
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/Song.vue?vue&type=template&id=ac304a5a&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/pages/Song.vue?vue&type=template&id=ac304a5a&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************/
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
  return _vm.song
    ? _c("div", { staticClass: "song-page-container elevate-page" }, [
        _c("div", { staticClass: "cover-img" }, [
          _c("div", { staticClass: "overlay" }),
          _vm._v(" "),
          _c("img", {
            staticClass: "cover-background",
            attrs: { src: _vm.song.cover, alt: "" },
          }),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "song-info" },
            [
              _c("v-img", {
                staticClass: "cover",
                attrs: { src: _vm.song.cover, "aspect-ratio": "1" },
                scopedSlots: _vm._u(
                  [
                    {
                      key: "placeholder",
                      fn: function () {
                        return [
                          _c(
                            "div",
                            { staticClass: "song-expo-skeleton fill-height" },
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
                  false,
                  449974666
                ),
              }),
              _vm._v(" "),
              _vm.song.genres && _vm.song.genres.length
                ? _c(
                    "div",
                    { staticClass: "main-genre align-center" },
                    [
                      _c(
                        "router-link",
                        {
                          staticClass: "router-link",
                          attrs: {
                            to: {
                              name: "genre-page",
                              params: {
                                genre_name: _vm.slug(_vm.song.genres[0].name),
                                id: _vm.song.genres[0].id,
                              },
                            },
                          },
                        },
                        [
                          _c("div", { staticClass: "genre" }, [
                            _vm._v(
                              "\n                        " +
                                _vm._s(_vm.song.genres[0].name) +
                                " " +
                                _vm._s(_vm.$t("Song")) +
                                "\n                    "
                            ),
                          ]),
                        ]
                      ),
                      _vm._v(" "),
                      _c("div", { staticClass: "badges align-center" }, [
                        _vm.song.isExclusive
                          ? _c(
                              "div",
                              {
                                staticClass: "exclusive mr-2",
                                attrs: { title: _vm.$t("Exclusive") },
                              },
                              [
                                _c(
                                  "v-btn",
                                  {
                                    attrs: {
                                      "x-small": "",
                                      dense: "",
                                      depressed: "",
                                      color: "primary",
                                    },
                                  },
                                  [_vm._v("Exclusive")]
                                ),
                              ],
                              1
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.song.isExplicit
                          ? _c(
                              "div",
                              {
                                staticClass: "explicit mr-2",
                                attrs: { title: _vm.$t("Explicit") },
                              },
                              [
                                _c("div", { staticClass: "explicit__sign" }, [
                                  _vm._v(
                                    "\n                            E\n                        "
                                  ),
                                ]),
                              ]
                            )
                          : _vm._e(),
                      ]),
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _c("div", { staticClass: "song-title" }, [
                _vm._v(
                  "\n                " +
                    _vm._s(_vm.song.title) +
                    "\n            "
                ),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "song-infos" }, [
                _c(
                  "h3",
                  [
                    _vm.song.album
                      ? [
                          _c("small", [_vm._v(_vm._s(_vm.$t("From")))]),
                          _vm._v(" "),
                          _c(
                            "router-link",
                            {
                              staticClass: "router-link router-link__white",
                              attrs: {
                                to: {
                                  name: "album",
                                  params: { id: _vm.song.album.id },
                                },
                              },
                            },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(_vm.song.album.title) +
                                  "\n                        "
                              ),
                            ]
                          ),
                        ]
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.song.artists && _vm.song.artists.length
                      ? [
                          _c("small", [_vm._v(_vm._s(_vm.$t("By")))]),
                          _vm._v(" "),
                          _c("artists", {
                            attrs: {
                              artists: _vm.song.artists,
                              textColor: "white",
                            },
                          }),
                        ]
                      : _vm._e(),
                  ],
                  2
                ),
              ]),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "actions" },
            [
              _c("purchase-button", {
                attrs: { size: "large", item: _vm.song },
              }),
              _vm._v(" "),
              _c("external-links", { attrs: { content: _vm.song } }),
              _vm._v(" "),
              !_vm.$store.getters.getSettings.disableRegistration
                ? _c("div", { staticClass: "like-button" }, [
                    _vm.isLiked
                      ? _c(
                          "div",
                          {
                            staticClass: "button-svg-container button-heart",
                            on: {
                              click: function ($event) {
                                return _vm.like(_vm.song)
                              },
                            },
                          },
                          [
                            _c(
                              "button",
                              { staticClass: "heart-button" },
                              [
                                _c("v-icon", { attrs: { color: "primary" } }, [
                                  _vm._v("$vuetify.icons.heart"),
                                ]),
                              ],
                              1
                            ),
                          ]
                        )
                      : _c(
                          "div",
                          {
                            staticClass: "button-svg-container button-heart",
                            on: {
                              click: function ($event) {
                                return _vm.like(_vm.song)
                              },
                            },
                          },
                          [
                            _c(
                              "button",
                              { staticClass: "heart-button" },
                              [
                                _c("v-icon", { attrs: { color: "primary" } }, [
                                  _vm._v("$vuetify.icons.heart-outline"),
                                ]),
                              ],
                              1
                            ),
                          ]
                        ),
                  ])
                : _vm._e(),
            ],
            1
          ),
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "main" },
          [
            _c(
              "div",
              {
                staticClass: "play-button relative pointer",
                on: {
                  click: function ($event) {
                    return _vm.$store.dispatch("playSong", {
                      song: _vm.song,
                      reset: true,
                    })
                  },
                },
              },
              [
                _vm._m(0),
                _vm._v(" "),
                _vm.$vuetify.theme.dark
                  ? _c("img", {
                      staticClass: "svg-image",
                      attrs: { src: "/svg/play-round.svg", alt: "" },
                    })
                  : _c("img", {
                      staticClass: "svg-image",
                      attrs: { src: "/svg/play-round-purple.svg", alt: "" },
                    }),
              ]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "other-actions" }, [
              _c(
                "div",
                { staticClass: "share-btn" },
                [
                  _c(
                    "v-btn",
                    {
                      attrs: { small: "", fab: "", color: "secondary" },
                      on: { click: _vm.share },
                    },
                    [_c("v-icon", [_vm._v("$vuetify.icons.share-variant")])],
                    1
                  ),
                ],
                1
              ),
            ]),
            _vm._v(" "),
            _vm.$store.getters.getSettings.enableAds
              ? [
                  _c(
                    "div",
                    { staticClass: "ad-slot" },
                    [
                      _c("ad", {
                        attrs: {
                          ad_code: _vm.parseAd(
                            _vm.$store.getters.getSettings.rect_ad
                          ).code,
                        },
                        on: {
                          click: function ($event) {
                            _vm.$store.getters.getSettings.ga4 &&
                            _vm.$store.getters.getSettings
                              .analytics_adClick_event
                              ? _vm.emitAnalyticsEvent({
                                  action: "ad_click",
                                  category: "leaderboard_ad",
                                  label: "Song page",
                                })
                              : ""
                          },
                        },
                      }),
                    ],
                    1
                  ),
                ]
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "sections pt-5" }, [
              _vm.moreFromAlbum && _vm.moreFromAlbum.length
                ? _c(
                    "div",
                    { staticClass: "section-more-from-album" },
                    [
                      _c("swiper-section", {
                        attrs: {
                          content: _vm.moreFromAlbum,
                          rank: "1",
                          title:
                            _vm.$t("More from") +
                            " " +
                            '"' +
                            _vm.song.album.title +
                            '"' +
                            " " +
                            _vm.$t("Album"),
                        },
                      }),
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.moreFromArtists && _vm.moreFromArtists.length
                ? _c(
                    "div",
                    { staticClass: "section-more-from-artist" },
                    [
                      _c("swiper-section", {
                        attrs: {
                          content: _vm.moreFromArtists,
                          rank: "1",
                          title: _vm.$t("More from the same aritsts"),
                        },
                      }),
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.moreFromGenre && _vm.moreFromGenre.length
                ? _c(
                    "div",
                    { staticClass: "section-more-from-genre" },
                    [
                      _c("swiper-section", {
                        attrs: {
                          content: _vm.moreFromGenre,
                          rank: "2",
                          title:
                            _vm.$t("More") +
                            " " +
                            _vm.song.genres[0].name +
                            " " +
                            _vm.$t("Music"),
                        },
                      }),
                    ],
                    1
                  )
                : _vm._e(),
            ]),
          ],
          2
        ),
      ])
    : !_vm.song && _vm.errorStatus == 404
    ? _c("empty-page", {
        attrs: {
          headline: _vm.$t("Not Available!"),
          sub: _vm.$t(
            "Song does not exist or maybe it is not available for public access. Who knows!"
          ),
          img: "peep-68.png",
        },
        scopedSlots: _vm._u([
          {
            key: "button",
            fn: function () {
              return [
                _c(
                  "v-btn",
                  {
                    staticClass: "primary",
                    attrs: { rounded: "", small: "" },
                    on: {
                      click: function ($event) {
                        return _vm.$router.go(-1)
                      },
                    },
                  },
                  [
                    _vm._v(
                      "\n            " +
                        _vm._s(_vm.$t("Go back")) +
                        "\n        "
                    ),
                  ]
                ),
              ]
            },
            proxy: true,
          },
        ]),
      })
    : !_vm.song && _vm.errorStatus
    ? _c("empty-page", {
        attrs: {
          headline: _vm.$t("Something wrong happend!"),
          sub: _vm.$t("Some server error has occurred. Try again later."),
          img: "peep-68.png",
        },
        scopedSlots: _vm._u([
          {
            key: "button",
            fn: function () {
              return [
                _c(
                  "v-btn",
                  {
                    staticClass: "primary",
                    attrs: { rounded: "", small: "" },
                    on: {
                      click: function ($event) {
                        return _vm.$router.go(-1)
                      },
                    },
                  },
                  [
                    _vm._v(
                      "\n            " +
                        _vm._s(_vm.$t("Go back")) +
                        "\n        "
                    ),
                  ]
                ),
              ]
            },
            proxy: true,
          },
        ]),
      })
    : _c("page-loading")
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "absolute fill align-justify-center" }, [
      _c("div", { staticClass: "back-layer" }),
    ])
  },
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/UserProfile.vue?vue&type=template&id=d7c81ae0&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/pages/UserProfile.vue?vue&type=template&id=d7c81ae0&scoped=true& ***!
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
  return _vm.user
    ? _c("fixed-left", {
        scopedSlots: _vm._u(
          [
            {
              key: "img",
              fn: function () {
                return [
                  _c(
                    "div",
                    { staticClass: "img-cover" },
                    [
                      _c("v-img", {
                        staticClass: "img",
                        attrs: { src: _vm.user.avatar, "aspect-ratio": "1" },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "placeholder",
                              fn: function () {
                                return [
                                  _c(
                                    "div",
                                    {
                                      staticClass: "fixed-area__image-skeleton",
                                    },
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
                          false,
                          4032264742
                        ),
                      }),
                    ],
                    1
                  ),
                ]
              },
              proxy: true,
            },
            {
              key: "infos",
              fn: function () {
                return [
                  _c("div", { staticClass: "infos-container" }, [
                    _c("div", { staticClass: "info-wrapper d-flex" }, [
                      _c("div", { staticClass: "displayname max-2-lines" }, [
                        _vm._v(
                          "\n                    " +
                            _vm._s(_vm.user.name) +
                            "\n                "
                        ),
                      ]),
                      _vm._v(" "),
                      _vm.user.plan
                        ? _c(
                            "div",
                            {
                              staticClass: "badge",
                              attrs: {
                                title:
                                  _vm.$t("Subscribed to") +
                                  " " +
                                  _vm.user.plan.name +
                                  " plan",
                              },
                            },
                            [
                              _c(
                                "v-btn",
                                {
                                  attrs: {
                                    outlined: "",
                                    small: "",
                                    color: "primary",
                                  },
                                },
                                [
                                  _vm.user.plan.badge
                                    ? _c("v-icon", { attrs: { left: "" } }, [
                                        _vm._v(
                                          "$vuetify.icons." +
                                            _vm._s(_vm.user.plan.badge)
                                        ),
                                      ])
                                    : _vm._e(),
                                  _vm._v(
                                    "\n                        " +
                                      _vm._s(_vm.user.plan.name) +
                                      "\n                    "
                                  ),
                                ],
                                1
                              ),
                            ],
                            1
                          )
                        : _vm._e(),
                    ]),
                  ]),
                ]
              },
              proxy: true,
            },
            {
              key: "buttons",
              fn: function () {
                return [
                  _c("div", { staticClass: "buttons" }, [
                    _vm.$store.getters.getUser &&
                    _vm.$route.params.id != _vm.$store.getters.getUser.id &&
                    _vm.friendStatus !== null &&
                    _vm.$store.getters.getSettings.enableFriendshipSystem
                      ? _c(
                          "div",
                          { staticClass: "follow" },
                          [
                            _vm.friendStatus == "notFriends"
                              ? _c(
                                  "v-btn",
                                  {
                                    staticClass: "primary",
                                    attrs: { rounded: "", small: "" },
                                    on: {
                                      click: function ($event) {
                                        return _vm.addFriend(
                                          _vm.$route.params.id
                                        )
                                      },
                                    },
                                  },
                                  [
                                    _vm._v(
                                      "\n                    " +
                                        _vm._s(_vm.$t("Add Friend")) +
                                        "\n                "
                                    ),
                                  ]
                                )
                              : _vm.friendStatus == "requested"
                              ? _c(
                                  "v-btn",
                                  {
                                    staticClass: "secondary",
                                    attrs: {
                                      rounded: "",
                                      small: "",
                                      disabled: "",
                                    },
                                  },
                                  [
                                    _vm._v(
                                      "\n                    " +
                                        _vm._s(_vm.$t("Friend request sent")) +
                                        "\n                "
                                    ),
                                  ]
                                )
                              : _c(
                                  "div",
                                  { attrs: { id: "unfriend_button" } },
                                  [
                                    _c(
                                      "v-btn",
                                      {
                                        staticClass: "secondary",
                                        attrs: {
                                          id: "friends_are_friends",
                                          rounded: "",
                                          small: "",
                                        },
                                      },
                                      [
                                        _vm._v(
                                          "\n                        " +
                                            _vm._s(_vm.$t("Friends")) +
                                            "\n                    "
                                        ),
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "v-btn",
                                      {
                                        staticClass: "error",
                                        attrs: {
                                          id: "friends_no_friends",
                                          rounded: "",
                                          small: "",
                                        },
                                        on: {
                                          click: function ($event) {
                                            return _vm.addFriend(
                                              _vm.$route.params.id
                                            )
                                          },
                                        },
                                      },
                                      [
                                        _vm._v(
                                          "\n                        " +
                                            _vm._s(_vm.$t("Unfriend")) +
                                            "\n                    "
                                        ),
                                      ]
                                    ),
                                  ],
                                  1
                                ),
                          ],
                          1
                        )
                      : _vm._e(),
                  ]),
                ]
              },
              proxy: true,
            },
            {
              key: "main",
              fn: function () {
                return [
                  _vm.user.mostPlayed.length ||
                  _vm.user.playlists.length ||
                  _vm.user.likes.length
                    ? _c("div", { staticClass: "profile-main-content" }, [
                        _vm.user.mostPlayed.length
                          ? _c("div", { staticClass: "most-played" }, [
                              _c(
                                "div",
                                { staticClass: "card-title-medium mb-3" },
                                [_vm._v(_vm._s(_vm.$t("Most played songs")))]
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "content" },
                                [
                                  _c("song-list", {
                                    attrs: {
                                      songs: _vm.mostPlayedSpliced,
                                      options: ["like"],
                                    },
                                  }),
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c("div", { staticClass: "more-or-less" }, [
                                _vm.nMostPlayed < _vm.user.mostPlayed.length
                                  ? _c(
                                      "div",
                                      {
                                        staticClass: "more",
                                        on: {
                                          click: function ($event) {
                                            _vm.nMostPlayed += 3
                                          },
                                        },
                                      },
                                      [
                                        _vm._v(
                                          "\n                        " +
                                            _vm._s(_vm.$t("More")) +
                                            "\n                    "
                                        ),
                                      ]
                                    )
                                  : _vm._e(),
                              ]),
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.user.likes.length
                          ? _c("div", { staticClass: "singles" }, [
                              _c(
                                "div",
                                { staticClass: "card-title-medium mb-3" },
                                [_vm._v(_vm._s(_vm.$t("Likes")))]
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "content" },
                                [
                                  _c("song-list", {
                                    attrs: { songs: _vm.LikesSpliced },
                                  }),
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c("div", { staticClass: "more-or-less" }, [
                                _vm.nLikes < _vm.user.likes.length
                                  ? _c(
                                      "div",
                                      {
                                        staticClass: "more",
                                        on: {
                                          click: function ($event) {
                                            _vm.nLikes += 3
                                          },
                                        },
                                      },
                                      [
                                        _vm._v(
                                          "\n                        " +
                                            _vm._s(_vm.$t("More")) +
                                            "\n                    "
                                        ),
                                      ]
                                    )
                                  : _vm._e(),
                              ]),
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.user.playlists.length
                          ? _c("div", { staticClass: "users_playlists" }, [
                              _c(
                                "div",
                                { staticClass: "card-title-medium mb-3" },
                                [
                                  _vm._v(
                                    "\n                    " +
                                      _vm._s(_vm.user.name) +
                                      " " +
                                      _vm._s(_vm.$t("Playlists")) +
                                      "\n                "
                                  ),
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "content content-list-wrapper" },
                                [
                                  _c(
                                    "ul",
                                    _vm._l(
                                      _vm.user.playlists,
                                      function (playlist, i) {
                                        return _c(
                                          "li",
                                          {
                                            key: i,
                                            on: {
                                              click: function ($event) {
                                                return _vm.$router.push({
                                                  name: "playlist",
                                                  params: { id: playlist.id },
                                                })
                                              },
                                            },
                                          },
                                          [
                                            _c(
                                              "div",
                                              { staticClass: "item-cover" },
                                              [
                                                _c("v-img", {
                                                  staticClass: "img",
                                                  attrs: {
                                                    src: playlist.cover,
                                                    "aspect-ratio": "1",
                                                  },
                                                  scopedSlots: _vm._u(
                                                    [
                                                      {
                                                        key: "placeholder",
                                                        fn: function () {
                                                          return [
                                                            _c(
                                                              "v-row",
                                                              {
                                                                staticClass:
                                                                  "fill-height ma-0",
                                                                attrs: {
                                                                  align:
                                                                    "center",
                                                                  justify:
                                                                    "center",
                                                                },
                                                              },
                                                              [
                                                                _c(
                                                                  "content-placeholders",
                                                                  {
                                                                    staticStyle:
                                                                      {
                                                                        width:
                                                                          "100%",
                                                                      },
                                                                    attrs: {
                                                                      rounded: true,
                                                                    },
                                                                  },
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
                                                }),
                                              ],
                                              1
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "div",
                                              { staticClass: "item-title" },
                                              [
                                                _vm._v(
                                                  "\n                                " +
                                                    _vm._s(playlist.title) +
                                                    "\n                            "
                                                ),
                                              ]
                                            ),
                                          ]
                                        )
                                      }
                                    ),
                                    0
                                  ),
                                ]
                              ),
                            ])
                          : _vm._e(),
                      ])
                    : [
                        _c("empty-page", {
                          attrs: {
                            img: "peep-68.png",
                            headline: _vm.$t("This profile is empty!"),
                            sub: _vm.$t(
                              "Looks like this account is still new!"
                            ),
                          },
                        }),
                      ],
                ]
              },
              proxy: true,
            },
          ],
          null,
          false,
          3399544632
        ),
      })
    : !_vm.user && _vm.errorStatus == 404
    ? _c("empty-page", {
        attrs: {
          headline: _vm.$t("Not Available!"),
          sub: _vm.$t("User does not exist."),
          img: "peep-68.png",
        },
        scopedSlots: _vm._u([
          {
            key: "button",
            fn: function () {
              return [
                _c(
                  "v-btn",
                  {
                    staticClass: "primary",
                    attrs: { rounded: "", small: "" },
                    on: {
                      click: function ($event) {
                        return _vm.$router.go(-1)
                      },
                    },
                  },
                  [_vm._v(_vm._s(_vm.$t("Go Back")))]
                ),
              ]
            },
            proxy: true,
          },
        ]),
      })
    : !_vm.user && _vm.errorStatus
    ? _c("empty-page", {
        attrs: {
          ":headline": _vm.$t("Something wrong happend"),
          sub: _vm.$t("Some server error has occurred. Try again later."),
          img: "peep-68.png",
        },
        scopedSlots: _vm._u([
          {
            key: "button",
            fn: function () {
              return [
                _c(
                  "v-btn",
                  {
                    staticClass: "primary",
                    attrs: { rounded: "", small: "" },
                    on: {
                      click: function ($event) {
                        return _vm.$router.go(-1)
                      },
                    },
                  },
                  [_vm._v(_vm._s(_vm.$t("Go Back")))]
                ),
              ]
            },
            proxy: true,
          },
        ]),
      })
    : _c("page-loading")
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/dialogs/EditPlaylist.vue":
/*!**********************************************************!*\
  !*** ./resources/js/components/dialogs/EditPlaylist.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EditPlaylist_vue_vue_type_template_id_36326e4b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditPlaylist.vue?vue&type=template&id=36326e4b& */ "./resources/js/components/dialogs/EditPlaylist.vue?vue&type=template&id=36326e4b&");
/* harmony import */ var _EditPlaylist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EditPlaylist.vue?vue&type=script&lang=js& */ "./resources/js/components/dialogs/EditPlaylist.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ "./node_modules/vuetify/lib/components/VBtn/index.js");
/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ "./node_modules/vuetify/lib/components/VGrid/index.js");
/* harmony import */ var vuetify_lib_components_VSwitch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VSwitch */ "./node_modules/vuetify/lib/components/VSwitch/index.js");
/* harmony import */ var vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VTextField */ "./node_modules/vuetify/lib/components/VTextField/index.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _EditPlaylist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _EditPlaylist_vue_vue_type_template_id_36326e4b___WEBPACK_IMPORTED_MODULE_0__["render"],
  _EditPlaylist_vue_vue_type_template_id_36326e4b___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* vuetify-loader */







_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default()(component, {VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__["VBtn"],VCol: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_5__["VCol"],VContainer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_5__["VContainer"],VRow: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_5__["VRow"],VSwitch: vuetify_lib_components_VSwitch__WEBPACK_IMPORTED_MODULE_6__["VSwitch"],VTextField: vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_7__["VTextField"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/dialogs/EditPlaylist.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/dialogs/EditPlaylist.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/dialogs/EditPlaylist.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditPlaylist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./EditPlaylist.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dialogs/EditPlaylist.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditPlaylist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/dialogs/EditPlaylist.vue?vue&type=template&id=36326e4b&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/dialogs/EditPlaylist.vue?vue&type=template&id=36326e4b& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditPlaylist_vue_vue_type_template_id_36326e4b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./EditPlaylist.vue?vue&type=template&id=36326e4b& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dialogs/EditPlaylist.vue?vue&type=template&id=36326e4b&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditPlaylist_vue_vue_type_template_id_36326e4b___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditPlaylist_vue_vue_type_template_id_36326e4b___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/dialogs/Share.vue":
/*!***************************************************!*\
  !*** ./resources/js/components/dialogs/Share.vue ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Share_vue_vue_type_template_id_891e89c0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Share.vue?vue&type=template&id=891e89c0& */ "./resources/js/components/dialogs/Share.vue?vue&type=template&id=891e89c0&");
/* harmony import */ var _Share_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Share.vue?vue&type=script&lang=js& */ "./resources/js/components/dialogs/Share.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ "./node_modules/vuetify/lib/components/VBtn/index.js");
/* harmony import */ var vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VCard */ "./node_modules/vuetify/lib/components/VCard/index.js");
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/index.js");
/* harmony import */ var vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VImg */ "./node_modules/vuetify/lib/components/VImg/index.js");
/* harmony import */ var vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VTextField */ "./node_modules/vuetify/lib/components/VTextField/index.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Share_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Share_vue_vue_type_template_id_891e89c0___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Share_vue_vue_type_template_id_891e89c0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* vuetify-loader */









_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default()(component, {VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__["VBtn"],VCard: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__["VCard"],VCardActions: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__["VCardActions"],VCardText: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__["VCardText"],VCardTitle: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__["VCardTitle"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_6__["VIcon"],VImg: vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_7__["VImg"],VTextField: vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_8__["VTextField"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/dialogs/Share.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/dialogs/Share.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/components/dialogs/Share.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Share_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Share.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dialogs/Share.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Share_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/dialogs/Share.vue?vue&type=template&id=891e89c0&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/dialogs/Share.vue?vue&type=template&id=891e89c0& ***!
  \**********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Share_vue_vue_type_template_id_891e89c0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Share.vue?vue&type=template&id=891e89c0& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dialogs/Share.vue?vue&type=template&id=891e89c0&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Share_vue_vue_type_template_id_891e89c0___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Share_vue_vue_type_template_id_891e89c0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/elements/PlayerSearchbar.vue":
/*!**************************************************************!*\
  !*** ./resources/js/components/elements/PlayerSearchbar.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PlayerSearchbar_vue_vue_type_template_id_4d9d709d_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PlayerSearchbar.vue?vue&type=template&id=4d9d709d&scoped=true& */ "./resources/js/components/elements/PlayerSearchbar.vue?vue&type=template&id=4d9d709d&scoped=true&");
/* harmony import */ var _PlayerSearchbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PlayerSearchbar.vue?vue&type=script&lang=js& */ "./resources/js/components/elements/PlayerSearchbar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _PlayerSearchbar_vue_vue_type_style_index_0_id_4d9d709d_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PlayerSearchbar.vue?vue&type=style&index=0&id=4d9d709d&lang=scss&scoped=true& */ "./resources/js/components/elements/PlayerSearchbar.vue?vue&type=style&index=0&id=4d9d709d&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var vuetify_lib_components_VBottomNavigation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VBottomNavigation */ "./node_modules/vuetify/lib/components/VBottomNavigation/index.js");
/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ "./node_modules/vuetify/lib/components/VBtn/index.js");
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/index.js");
/* harmony import */ var vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VImg */ "./node_modules/vuetify/lib/components/VImg/index.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _PlayerSearchbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PlayerSearchbar_vue_vue_type_template_id_4d9d709d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PlayerSearchbar_vue_vue_type_template_id_4d9d709d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "4d9d709d",
  null
  
)

/* vuetify-loader */





_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default()(component, {VBottomNavigation: vuetify_lib_components_VBottomNavigation__WEBPACK_IMPORTED_MODULE_5__["VBottomNavigation"],VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_6__["VBtn"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_7__["VIcon"],VImg: vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_8__["VImg"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/elements/PlayerSearchbar.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/elements/PlayerSearchbar.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/elements/PlayerSearchbar.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PlayerSearchbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./PlayerSearchbar.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/elements/PlayerSearchbar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PlayerSearchbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/elements/PlayerSearchbar.vue?vue&type=style&index=0&id=4d9d709d&lang=scss&scoped=true&":
/*!************************************************************************************************************************!*\
  !*** ./resources/js/components/elements/PlayerSearchbar.vue?vue&type=style&index=0&id=4d9d709d&lang=scss&scoped=true& ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PlayerSearchbar_vue_vue_type_style_index_0_id_4d9d709d_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--8-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./PlayerSearchbar.vue?vue&type=style&index=0&id=4d9d709d&lang=scss&scoped=true& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/elements/PlayerSearchbar.vue?vue&type=style&index=0&id=4d9d709d&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PlayerSearchbar_vue_vue_type_style_index_0_id_4d9d709d_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PlayerSearchbar_vue_vue_type_style_index_0_id_4d9d709d_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PlayerSearchbar_vue_vue_type_style_index_0_id_4d9d709d_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PlayerSearchbar_vue_vue_type_style_index_0_id_4d9d709d_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/components/elements/PlayerSearchbar.vue?vue&type=template&id=4d9d709d&scoped=true&":
/*!*********************************************************************************************************!*\
  !*** ./resources/js/components/elements/PlayerSearchbar.vue?vue&type=template&id=4d9d709d&scoped=true& ***!
  \*********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PlayerSearchbar_vue_vue_type_template_id_4d9d709d_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./PlayerSearchbar.vue?vue&type=template&id=4d9d709d&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/elements/PlayerSearchbar.vue?vue&type=template&id=4d9d709d&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PlayerSearchbar_vue_vue_type_template_id_4d9d709d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PlayerSearchbar_vue_vue_type_template_id_4d9d709d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/elements/lists/playlistSongs.vue":
/*!******************************************************************!*\
  !*** ./resources/js/components/elements/lists/playlistSongs.vue ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _playlistSongs_vue_vue_type_template_id_94f473f6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./playlistSongs.vue?vue&type=template&id=94f473f6& */ "./resources/js/components/elements/lists/playlistSongs.vue?vue&type=template&id=94f473f6&");
/* harmony import */ var _playlistSongs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./playlistSongs.vue?vue&type=script&lang=js& */ "./resources/js/components/elements/lists/playlistSongs.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/index.js");
/* harmony import */ var vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VImg */ "./node_modules/vuetify/lib/components/VImg/index.js");
/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ "./node_modules/vuetify/lib/components/VGrid/index.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _playlistSongs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _playlistSongs_vue_vue_type_template_id_94f473f6___WEBPACK_IMPORTED_MODULE_0__["render"],
  _playlistSongs_vue_vue_type_template_id_94f473f6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* vuetify-loader */




_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default()(component, {VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_4__["VIcon"],VImg: vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_5__["VImg"],VRow: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__["VRow"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/elements/lists/playlistSongs.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/elements/lists/playlistSongs.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/elements/lists/playlistSongs.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_playlistSongs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./playlistSongs.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/elements/lists/playlistSongs.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_playlistSongs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/elements/lists/playlistSongs.vue?vue&type=template&id=94f473f6&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/components/elements/lists/playlistSongs.vue?vue&type=template&id=94f473f6& ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_playlistSongs_vue_vue_type_template_id_94f473f6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./playlistSongs.vue?vue&type=template&id=94f473f6& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/elements/lists/playlistSongs.vue?vue&type=template&id=94f473f6&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_playlistSongs_vue_vue_type_template_id_94f473f6___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_playlistSongs_vue_vue_type_template_id_94f473f6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/player/ShareLinks.vue":
/*!*******************************************************!*\
  !*** ./resources/js/components/player/ShareLinks.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ShareLinks_vue_vue_type_template_id_1e8af86d_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ShareLinks.vue?vue&type=template&id=1e8af86d&scoped=true& */ "./resources/js/components/player/ShareLinks.vue?vue&type=template&id=1e8af86d&scoped=true&");
/* harmony import */ var _ShareLinks_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ShareLinks.vue?vue&type=script&lang=js& */ "./resources/js/components/player/ShareLinks.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _ShareLinks_vue_vue_type_style_index_0_id_1e8af86d_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ShareLinks.vue?vue&type=style&index=0&id=1e8af86d&lang=scss&scoped=true& */ "./resources/js/components/player/ShareLinks.vue?vue&type=style&index=0&id=1e8af86d&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/index.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ShareLinks_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ShareLinks_vue_vue_type_template_id_1e8af86d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ShareLinks_vue_vue_type_template_id_1e8af86d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "1e8af86d",
  null
  
)

/* vuetify-loader */


_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default()(component, {VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_5__["VIcon"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/player/ShareLinks.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/player/ShareLinks.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./resources/js/components/player/ShareLinks.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ShareLinks_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ShareLinks.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/ShareLinks.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ShareLinks_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/player/ShareLinks.vue?vue&type=style&index=0&id=1e8af86d&lang=scss&scoped=true&":
/*!*****************************************************************************************************************!*\
  !*** ./resources/js/components/player/ShareLinks.vue?vue&type=style&index=0&id=1e8af86d&lang=scss&scoped=true& ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ShareLinks_vue_vue_type_style_index_0_id_1e8af86d_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--8-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ShareLinks.vue?vue&type=style&index=0&id=1e8af86d&lang=scss&scoped=true& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/ShareLinks.vue?vue&type=style&index=0&id=1e8af86d&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ShareLinks_vue_vue_type_style_index_0_id_1e8af86d_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ShareLinks_vue_vue_type_style_index_0_id_1e8af86d_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ShareLinks_vue_vue_type_style_index_0_id_1e8af86d_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ShareLinks_vue_vue_type_style_index_0_id_1e8af86d_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/components/player/ShareLinks.vue?vue&type=template&id=1e8af86d&scoped=true&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/components/player/ShareLinks.vue?vue&type=template&id=1e8af86d&scoped=true& ***!
  \**************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ShareLinks_vue_vue_type_template_id_1e8af86d_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ShareLinks.vue?vue&type=template&id=1e8af86d&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/ShareLinks.vue?vue&type=template&id=1e8af86d&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ShareLinks_vue_vue_type_template_id_1e8af86d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ShareLinks_vue_vue_type_template_id_1e8af86d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/player/layout/Master.vue":
/*!**********************************************************!*\
  !*** ./resources/js/components/player/layout/Master.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Master_vue_vue_type_template_id_3c63f2a4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Master.vue?vue&type=template&id=3c63f2a4& */ "./resources/js/components/player/layout/Master.vue?vue&type=template&id=3c63f2a4&");
/* harmony import */ var _Master_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Master.vue?vue&type=script&lang=js& */ "./resources/js/components/player/layout/Master.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Master_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Master.vue?vue&type=style&index=0&lang=scss& */ "./resources/js/components/player/layout/Master.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ "./node_modules/vuetify/lib/components/VGrid/index.js");
/* harmony import */ var vuetify_lib_components_VDialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VDialog */ "./node_modules/vuetify/lib/components/VDialog/index.js");
/* harmony import */ var vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VImg */ "./node_modules/vuetify/lib/components/VImg/index.js");
/* harmony import */ var vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VList */ "./node_modules/vuetify/lib/components/VList/index.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Master_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Master_vue_vue_type_template_id_3c63f2a4___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Master_vue_vue_type_template_id_3c63f2a4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* vuetify-loader */






_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default()(component, {VContainer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_5__["VContainer"],VDialog: vuetify_lib_components_VDialog__WEBPACK_IMPORTED_MODULE_6__["VDialog"],VImg: vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_7__["VImg"],VList: vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_8__["VList"],VListItem: vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_8__["VListItem"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/player/layout/Master.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/player/layout/Master.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/player/layout/Master.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Master_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Master.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/layout/Master.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Master_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/player/layout/Master.vue?vue&type=style&index=0&lang=scss&":
/*!********************************************************************************************!*\
  !*** ./resources/js/components/player/layout/Master.vue?vue&type=style&index=0&lang=scss& ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Master_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Master.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/layout/Master.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Master_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Master_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Master_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Master_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/components/player/layout/Master.vue?vue&type=template&id=3c63f2a4&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/player/layout/Master.vue?vue&type=template&id=3c63f2a4& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Master_vue_vue_type_template_id_3c63f2a4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Master.vue?vue&type=template&id=3c63f2a4& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/layout/Master.vue?vue&type=template&id=3c63f2a4&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Master_vue_vue_type_template_id_3c63f2a4___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Master_vue_vue_type_template_id_3c63f2a4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/player/layout/Navbar.vue":
/*!**********************************************************!*\
  !*** ./resources/js/components/player/layout/Navbar.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Navbar_vue_vue_type_template_id_ad65455c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Navbar.vue?vue&type=template&id=ad65455c&scoped=true& */ "./resources/js/components/player/layout/Navbar.vue?vue&type=template&id=ad65455c&scoped=true&");
/* harmony import */ var _Navbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Navbar.vue?vue&type=script&lang=js& */ "./resources/js/components/player/layout/Navbar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Navbar_vue_vue_type_style_index_0_id_ad65455c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Navbar.vue?vue&type=style&index=0&id=ad65455c&lang=scss&scoped=true& */ "./resources/js/components/player/layout/Navbar.vue?vue&type=style&index=0&id=ad65455c&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var vuetify_lib_components_VBadge__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VBadge */ "./node_modules/vuetify/lib/components/VBadge/index.js");
/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ "./node_modules/vuetify/lib/components/VBtn/index.js");
/* harmony import */ var vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VCard */ "./node_modules/vuetify/lib/components/VCard/index.js");
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/index.js");
/* harmony import */ var vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuetify/lib/components/VImg */ "./node_modules/vuetify/lib/components/VImg/index.js");
/* harmony import */ var vuetify_lib_components_VMenu__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vuetify/lib/components/VMenu */ "./node_modules/vuetify/lib/components/VMenu/index.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Navbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Navbar_vue_vue_type_template_id_ad65455c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Navbar_vue_vue_type_template_id_ad65455c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "ad65455c",
  null
  
)

/* vuetify-loader */







_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default()(component, {VBadge: vuetify_lib_components_VBadge__WEBPACK_IMPORTED_MODULE_5__["VBadge"],VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_6__["VBtn"],VCard: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_7__["VCard"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_8__["VIcon"],VImg: vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_9__["VImg"],VMenu: vuetify_lib_components_VMenu__WEBPACK_IMPORTED_MODULE_10__["VMenu"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/player/layout/Navbar.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/player/layout/Navbar.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/player/layout/Navbar.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Navbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Navbar.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/layout/Navbar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Navbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/player/layout/Navbar.vue?vue&type=style&index=0&id=ad65455c&lang=scss&scoped=true&":
/*!********************************************************************************************************************!*\
  !*** ./resources/js/components/player/layout/Navbar.vue?vue&type=style&index=0&id=ad65455c&lang=scss&scoped=true& ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Navbar_vue_vue_type_style_index_0_id_ad65455c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Navbar.vue?vue&type=style&index=0&id=ad65455c&lang=scss&scoped=true& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/layout/Navbar.vue?vue&type=style&index=0&id=ad65455c&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Navbar_vue_vue_type_style_index_0_id_ad65455c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Navbar_vue_vue_type_style_index_0_id_ad65455c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Navbar_vue_vue_type_style_index_0_id_ad65455c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Navbar_vue_vue_type_style_index_0_id_ad65455c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/components/player/layout/Navbar.vue?vue&type=template&id=ad65455c&scoped=true&":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/components/player/layout/Navbar.vue?vue&type=template&id=ad65455c&scoped=true& ***!
  \*****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Navbar_vue_vue_type_template_id_ad65455c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Navbar.vue?vue&type=template&id=ad65455c&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/layout/Navbar.vue?vue&type=template&id=ad65455c&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Navbar_vue_vue_type_template_id_ad65455c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Navbar_vue_vue_type_template_id_ad65455c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/player/layout/RightSidebar.vue":
/*!****************************************************************!*\
  !*** ./resources/js/components/player/layout/RightSidebar.vue ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RightSidebar_vue_vue_type_template_id_0a7d493c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RightSidebar.vue?vue&type=template&id=0a7d493c&scoped=true& */ "./resources/js/components/player/layout/RightSidebar.vue?vue&type=template&id=0a7d493c&scoped=true&");
/* harmony import */ var _RightSidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RightSidebar.vue?vue&type=script&lang=js& */ "./resources/js/components/player/layout/RightSidebar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _RightSidebar_vue_vue_type_style_index_0_id_0a7d493c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RightSidebar.vue?vue&type=style&index=0&id=0a7d493c&lang=scss&scoped=true& */ "./resources/js/components/player/layout/RightSidebar.vue?vue&type=style&index=0&id=0a7d493c&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ "./node_modules/vuetify/lib/components/VBtn/index.js");
/* harmony import */ var vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VCard */ "./node_modules/vuetify/lib/components/VCard/index.js");
/* harmony import */ var vuetify_lib_components_VDialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VDialog */ "./node_modules/vuetify/lib/components/VDialog/index.js");
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/index.js");
/* harmony import */ var vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuetify/lib/components/VImg */ "./node_modules/vuetify/lib/components/VImg/index.js");
/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ "./node_modules/vuetify/lib/components/VGrid/index.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _RightSidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _RightSidebar_vue_vue_type_template_id_0a7d493c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _RightSidebar_vue_vue_type_template_id_0a7d493c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "0a7d493c",
  null
  
)

/* vuetify-loader */









_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default()(component, {VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_5__["VBtn"],VCard: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__["VCard"],VCardActions: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__["VCardActions"],VCardTitle: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__["VCardTitle"],VDialog: vuetify_lib_components_VDialog__WEBPACK_IMPORTED_MODULE_7__["VDialog"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_8__["VIcon"],VImg: vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_9__["VImg"],VSpacer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_10__["VSpacer"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/player/layout/RightSidebar.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/player/layout/RightSidebar.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/player/layout/RightSidebar.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RightSidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./RightSidebar.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/layout/RightSidebar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RightSidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/player/layout/RightSidebar.vue?vue&type=style&index=0&id=0a7d493c&lang=scss&scoped=true&":
/*!**************************************************************************************************************************!*\
  !*** ./resources/js/components/player/layout/RightSidebar.vue?vue&type=style&index=0&id=0a7d493c&lang=scss&scoped=true& ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RightSidebar_vue_vue_type_style_index_0_id_0a7d493c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./RightSidebar.vue?vue&type=style&index=0&id=0a7d493c&lang=scss&scoped=true& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/layout/RightSidebar.vue?vue&type=style&index=0&id=0a7d493c&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RightSidebar_vue_vue_type_style_index_0_id_0a7d493c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RightSidebar_vue_vue_type_style_index_0_id_0a7d493c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RightSidebar_vue_vue_type_style_index_0_id_0a7d493c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RightSidebar_vue_vue_type_style_index_0_id_0a7d493c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/components/player/layout/RightSidebar.vue?vue&type=template&id=0a7d493c&scoped=true&":
/*!***********************************************************************************************************!*\
  !*** ./resources/js/components/player/layout/RightSidebar.vue?vue&type=template&id=0a7d493c&scoped=true& ***!
  \***********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RightSidebar_vue_vue_type_template_id_0a7d493c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./RightSidebar.vue?vue&type=template&id=0a7d493c&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/layout/RightSidebar.vue?vue&type=template&id=0a7d493c&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RightSidebar_vue_vue_type_template_id_0a7d493c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RightSidebar_vue_vue_type_template_id_0a7d493c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/player/layout/Sidebar.vue":
/*!***********************************************************!*\
  !*** ./resources/js/components/player/layout/Sidebar.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Sidebar_vue_vue_type_template_id_1d1322ec_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sidebar.vue?vue&type=template&id=1d1322ec&scoped=true& */ "./resources/js/components/player/layout/Sidebar.vue?vue&type=template&id=1d1322ec&scoped=true&");
/* harmony import */ var _Sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Sidebar.vue?vue&type=script&lang=js& */ "./resources/js/components/player/layout/Sidebar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Sidebar_vue_vue_type_style_index_0_id_1d1322ec_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Sidebar.vue?vue&type=style&index=0&id=1d1322ec&lang=scss&scoped=true& */ "./resources/js/components/player/layout/Sidebar.vue?vue&type=style&index=0&id=1d1322ec&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var vuetify_lib_components_VBottomNavigation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VBottomNavigation */ "./node_modules/vuetify/lib/components/VBottomNavigation/index.js");
/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ "./node_modules/vuetify/lib/components/VBtn/index.js");
/* harmony import */ var vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VCard */ "./node_modules/vuetify/lib/components/VCard/index.js");
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/index.js");
/* harmony import */ var vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuetify/lib/components/VImg */ "./node_modules/vuetify/lib/components/VImg/index.js");
/* harmony import */ var vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vuetify/lib/components/VList */ "./node_modules/vuetify/lib/components/VList/index.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Sidebar_vue_vue_type_template_id_1d1322ec_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Sidebar_vue_vue_type_template_id_1d1322ec_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "1d1322ec",
  null
  
)

/* vuetify-loader */











_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default()(component, {VBottomNavigation: vuetify_lib_components_VBottomNavigation__WEBPACK_IMPORTED_MODULE_5__["VBottomNavigation"],VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_6__["VBtn"],VCard: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_7__["VCard"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_8__["VIcon"],VImg: vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_9__["VImg"],VList: vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_10__["VList"],VListItem: vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_10__["VListItem"],VListItemContent: vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_10__["VListItemContent"],VListItemGroup: vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_10__["VListItemGroup"],VListItemTitle: vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_10__["VListItemTitle"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/player/layout/Sidebar.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/player/layout/Sidebar.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/components/player/layout/Sidebar.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Sidebar.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/layout/Sidebar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/player/layout/Sidebar.vue?vue&type=style&index=0&id=1d1322ec&lang=scss&scoped=true&":
/*!*********************************************************************************************************************!*\
  !*** ./resources/js/components/player/layout/Sidebar.vue?vue&type=style&index=0&id=1d1322ec&lang=scss&scoped=true& ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_style_index_0_id_1d1322ec_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Sidebar.vue?vue&type=style&index=0&id=1d1322ec&lang=scss&scoped=true& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/layout/Sidebar.vue?vue&type=style&index=0&id=1d1322ec&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_style_index_0_id_1d1322ec_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_style_index_0_id_1d1322ec_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_style_index_0_id_1d1322ec_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_style_index_0_id_1d1322ec_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/components/player/layout/Sidebar.vue?vue&type=template&id=1d1322ec&scoped=true&":
/*!******************************************************************************************************!*\
  !*** ./resources/js/components/player/layout/Sidebar.vue?vue&type=template&id=1d1322ec&scoped=true& ***!
  \******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_template_id_1d1322ec_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Sidebar.vue?vue&type=template&id=1d1322ec&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/layout/Sidebar.vue?vue&type=template&id=1d1322ec&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_template_id_1d1322ec_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_template_id_1d1322ec_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/player/pages/AccountSettings.vue":
/*!******************************************************************!*\
  !*** ./resources/js/components/player/pages/AccountSettings.vue ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AccountSettings_vue_vue_type_template_id_f56202bc_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AccountSettings.vue?vue&type=template&id=f56202bc&scoped=true& */ "./resources/js/components/player/pages/AccountSettings.vue?vue&type=template&id=f56202bc&scoped=true&");
/* harmony import */ var _AccountSettings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AccountSettings.vue?vue&type=script&lang=js& */ "./resources/js/components/player/pages/AccountSettings.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _AccountSettings_vue_vue_type_style_index_0_id_f56202bc_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AccountSettings.vue?vue&type=style&index=0&id=f56202bc&lang=scss&scoped=true& */ "./resources/js/components/player/pages/AccountSettings.vue?vue&type=style&index=0&id=f56202bc&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ "./node_modules/vuetify/lib/components/VBtn/index.js");
/* harmony import */ var vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VCard */ "./node_modules/vuetify/lib/components/VCard/index.js");
/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ "./node_modules/vuetify/lib/components/VGrid/index.js");
/* harmony import */ var vuetify_lib_components_VDialog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VDialog */ "./node_modules/vuetify/lib/components/VDialog/index.js");
/* harmony import */ var vuetify_lib_components_VDivider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuetify/lib/components/VDivider */ "./node_modules/vuetify/lib/components/VDivider/index.js");
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/index.js");
/* harmony import */ var vuetify_lib_components_VSelect__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! vuetify/lib/components/VSelect */ "./node_modules/vuetify/lib/components/VSelect/index.js");
/* harmony import */ var vuetify_lib_components_VSwitch__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! vuetify/lib/components/VSwitch */ "./node_modules/vuetify/lib/components/VSwitch/index.js");
/* harmony import */ var vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! vuetify/lib/components/VTextField */ "./node_modules/vuetify/lib/components/VTextField/index.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _AccountSettings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AccountSettings_vue_vue_type_template_id_f56202bc_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AccountSettings_vue_vue_type_template_id_f56202bc_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "f56202bc",
  null
  
)

/* vuetify-loader */














_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default()(component, {VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_5__["VBtn"],VCard: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__["VCard"],VCardActions: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__["VCardActions"],VCardTitle: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__["VCardTitle"],VCol: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_7__["VCol"],VContainer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_7__["VContainer"],VDialog: vuetify_lib_components_VDialog__WEBPACK_IMPORTED_MODULE_8__["VDialog"],VDivider: vuetify_lib_components_VDivider__WEBPACK_IMPORTED_MODULE_9__["VDivider"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_10__["VIcon"],VRow: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_7__["VRow"],VSelect: vuetify_lib_components_VSelect__WEBPACK_IMPORTED_MODULE_11__["VSelect"],VSwitch: vuetify_lib_components_VSwitch__WEBPACK_IMPORTED_MODULE_12__["VSwitch"],VTextField: vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_13__["VTextField"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/player/pages/AccountSettings.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/player/pages/AccountSettings.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/player/pages/AccountSettings.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AccountSettings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./AccountSettings.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/AccountSettings.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AccountSettings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/player/pages/AccountSettings.vue?vue&type=style&index=0&id=f56202bc&lang=scss&scoped=true&":
/*!****************************************************************************************************************************!*\
  !*** ./resources/js/components/player/pages/AccountSettings.vue?vue&type=style&index=0&id=f56202bc&lang=scss&scoped=true& ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AccountSettings_vue_vue_type_style_index_0_id_f56202bc_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./AccountSettings.vue?vue&type=style&index=0&id=f56202bc&lang=scss&scoped=true& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/AccountSettings.vue?vue&type=style&index=0&id=f56202bc&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AccountSettings_vue_vue_type_style_index_0_id_f56202bc_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AccountSettings_vue_vue_type_style_index_0_id_f56202bc_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AccountSettings_vue_vue_type_style_index_0_id_f56202bc_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AccountSettings_vue_vue_type_style_index_0_id_f56202bc_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/components/player/pages/AccountSettings.vue?vue&type=template&id=f56202bc&scoped=true&":
/*!*************************************************************************************************************!*\
  !*** ./resources/js/components/player/pages/AccountSettings.vue?vue&type=template&id=f56202bc&scoped=true& ***!
  \*************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AccountSettings_vue_vue_type_template_id_f56202bc_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./AccountSettings.vue?vue&type=template&id=f56202bc&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/AccountSettings.vue?vue&type=template&id=f56202bc&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AccountSettings_vue_vue_type_template_id_f56202bc_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AccountSettings_vue_vue_type_template_id_f56202bc_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/player/pages/Album.vue":
/*!********************************************************!*\
  !*** ./resources/js/components/player/pages/Album.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Album_vue_vue_type_template_id_e1df5ebe___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Album.vue?vue&type=template&id=e1df5ebe& */ "./resources/js/components/player/pages/Album.vue?vue&type=template&id=e1df5ebe&");
/* harmony import */ var _Album_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Album.vue?vue&type=script&lang=js& */ "./resources/js/components/player/pages/Album.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ "./node_modules/vuetify/lib/components/VBtn/index.js");
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/index.js");
/* harmony import */ var vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VImg */ "./node_modules/vuetify/lib/components/VImg/index.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Album_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Album_vue_vue_type_template_id_e1df5ebe___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Album_vue_vue_type_template_id_e1df5ebe___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* vuetify-loader */




_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default()(component, {VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__["VBtn"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_5__["VIcon"],VImg: vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_6__["VImg"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/player/pages/Album.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/player/pages/Album.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/player/pages/Album.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Album_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Album.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/Album.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Album_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/player/pages/Album.vue?vue&type=template&id=e1df5ebe&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/player/pages/Album.vue?vue&type=template&id=e1df5ebe& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Album_vue_vue_type_template_id_e1df5ebe___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Album.vue?vue&type=template&id=e1df5ebe& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/Album.vue?vue&type=template&id=e1df5ebe&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Album_vue_vue_type_template_id_e1df5ebe___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Album_vue_vue_type_template_id_e1df5ebe___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/player/pages/Artist.vue":
/*!*********************************************************!*\
  !*** ./resources/js/components/player/pages/Artist.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Artist_vue_vue_type_template_id_a4d4eaf6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Artist.vue?vue&type=template&id=a4d4eaf6& */ "./resources/js/components/player/pages/Artist.vue?vue&type=template&id=a4d4eaf6&");
/* harmony import */ var _Artist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Artist.vue?vue&type=script&lang=js& */ "./resources/js/components/player/pages/Artist.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Artist_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Artist.vue?vue&type=style&index=0&lang=scss& */ "./resources/js/components/player/pages/Artist.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ "./node_modules/vuetify/lib/components/VBtn/index.js");
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/index.js");
/* harmony import */ var vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VImg */ "./node_modules/vuetify/lib/components/VImg/index.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Artist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Artist_vue_vue_type_template_id_a4d4eaf6___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Artist_vue_vue_type_template_id_a4d4eaf6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* vuetify-loader */




_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default()(component, {VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_5__["VBtn"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_6__["VIcon"],VImg: vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_7__["VImg"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/player/pages/Artist.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/player/pages/Artist.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/player/pages/Artist.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Artist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Artist.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/Artist.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Artist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/player/pages/Artist.vue?vue&type=style&index=0&lang=scss&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/player/pages/Artist.vue?vue&type=style&index=0&lang=scss& ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Artist_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Artist.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/Artist.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Artist_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Artist_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Artist_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Artist_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/components/player/pages/Artist.vue?vue&type=template&id=a4d4eaf6&":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/player/pages/Artist.vue?vue&type=template&id=a4d4eaf6& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Artist_vue_vue_type_template_id_a4d4eaf6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Artist.vue?vue&type=template&id=a4d4eaf6& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/Artist.vue?vue&type=template&id=a4d4eaf6&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Artist_vue_vue_type_template_id_a4d4eaf6___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Artist_vue_vue_type_template_id_a4d4eaf6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/player/pages/CustomPage.vue":
/*!*************************************************************!*\
  !*** ./resources/js/components/player/pages/CustomPage.vue ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CustomPage_vue_vue_type_template_id_32a6d544_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CustomPage.vue?vue&type=template&id=32a6d544&scoped=true& */ "./resources/js/components/player/pages/CustomPage.vue?vue&type=template&id=32a6d544&scoped=true&");
/* harmony import */ var _CustomPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CustomPage.vue?vue&type=script&lang=js& */ "./resources/js/components/player/pages/CustomPage.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _CustomPage_vue_vue_type_style_index_0_id_32a6d544_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CustomPage.vue?vue&type=style&index=0&id=32a6d544&lang=scss&scoped=true& */ "./resources/js/components/player/pages/CustomPage.vue?vue&type=style&index=0&id=32a6d544&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/index.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _CustomPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CustomPage_vue_vue_type_template_id_32a6d544_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _CustomPage_vue_vue_type_template_id_32a6d544_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "32a6d544",
  null
  
)

/* vuetify-loader */


_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default()(component, {VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_5__["VIcon"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/player/pages/CustomPage.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/player/pages/CustomPage.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/player/pages/CustomPage.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./CustomPage.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/CustomPage.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/player/pages/CustomPage.vue?vue&type=style&index=0&id=32a6d544&lang=scss&scoped=true&":
/*!***********************************************************************************************************************!*\
  !*** ./resources/js/components/player/pages/CustomPage.vue?vue&type=style&index=0&id=32a6d544&lang=scss&scoped=true& ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomPage_vue_vue_type_style_index_0_id_32a6d544_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./CustomPage.vue?vue&type=style&index=0&id=32a6d544&lang=scss&scoped=true& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/CustomPage.vue?vue&type=style&index=0&id=32a6d544&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomPage_vue_vue_type_style_index_0_id_32a6d544_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomPage_vue_vue_type_style_index_0_id_32a6d544_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomPage_vue_vue_type_style_index_0_id_32a6d544_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomPage_vue_vue_type_style_index_0_id_32a6d544_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/components/player/pages/CustomPage.vue?vue&type=template&id=32a6d544&scoped=true&":
/*!********************************************************************************************************!*\
  !*** ./resources/js/components/player/pages/CustomPage.vue?vue&type=template&id=32a6d544&scoped=true& ***!
  \********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomPage_vue_vue_type_template_id_32a6d544_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./CustomPage.vue?vue&type=template&id=32a6d544&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/CustomPage.vue?vue&type=template&id=32a6d544&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomPage_vue_vue_type_template_id_32a6d544_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomPage_vue_vue_type_template_id_32a6d544_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/player/pages/Playlist.vue":
/*!***********************************************************!*\
  !*** ./resources/js/components/player/pages/Playlist.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Playlist_vue_vue_type_template_id_0fb27e10___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Playlist.vue?vue&type=template&id=0fb27e10& */ "./resources/js/components/player/pages/Playlist.vue?vue&type=template&id=0fb27e10&");
/* harmony import */ var _Playlist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Playlist.vue?vue&type=script&lang=js& */ "./resources/js/components/player/pages/Playlist.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ "./node_modules/vuetify/lib/components/VBtn/index.js");
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/index.js");
/* harmony import */ var vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VImg */ "./node_modules/vuetify/lib/components/VImg/index.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Playlist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Playlist_vue_vue_type_template_id_0fb27e10___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Playlist_vue_vue_type_template_id_0fb27e10___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* vuetify-loader */




_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default()(component, {VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__["VBtn"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_5__["VIcon"],VImg: vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_6__["VImg"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/player/pages/Playlist.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/player/pages/Playlist.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/components/player/pages/Playlist.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Playlist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Playlist.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/Playlist.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Playlist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/player/pages/Playlist.vue?vue&type=template&id=0fb27e10&":
/*!******************************************************************************************!*\
  !*** ./resources/js/components/player/pages/Playlist.vue?vue&type=template&id=0fb27e10& ***!
  \******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Playlist_vue_vue_type_template_id_0fb27e10___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Playlist.vue?vue&type=template&id=0fb27e10& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/Playlist.vue?vue&type=template&id=0fb27e10&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Playlist_vue_vue_type_template_id_0fb27e10___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Playlist_vue_vue_type_template_id_0fb27e10___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/player/pages/Podcast.vue":
/*!**********************************************************!*\
  !*** ./resources/js/components/player/pages/Podcast.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Podcast_vue_vue_type_template_id_77eca436_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Podcast.vue?vue&type=template&id=77eca436&scoped=true& */ "./resources/js/components/player/pages/Podcast.vue?vue&type=template&id=77eca436&scoped=true&");
/* harmony import */ var _Podcast_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Podcast.vue?vue&type=script&lang=js& */ "./resources/js/components/player/pages/Podcast.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Podcast_vue_vue_type_style_index_0_id_77eca436_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Podcast.vue?vue&type=style&index=0&id=77eca436&lang=scss&scoped=true& */ "./resources/js/components/player/pages/Podcast.vue?vue&type=style&index=0&id=77eca436&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var vuetify_lib_components_VAvatar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VAvatar */ "./node_modules/vuetify/lib/components/VAvatar/index.js");
/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ "./node_modules/vuetify/lib/components/VBtn/index.js");
/* harmony import */ var vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VCard */ "./node_modules/vuetify/lib/components/VCard/index.js");
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/index.js");
/* harmony import */ var vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuetify/lib/components/VImg */ "./node_modules/vuetify/lib/components/VImg/index.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Podcast_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Podcast_vue_vue_type_template_id_77eca436_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Podcast_vue_vue_type_template_id_77eca436_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "77eca436",
  null
  
)

/* vuetify-loader */






_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default()(component, {VAvatar: vuetify_lib_components_VAvatar__WEBPACK_IMPORTED_MODULE_5__["VAvatar"],VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_6__["VBtn"],VCard: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_7__["VCard"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_8__["VIcon"],VImg: vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_9__["VImg"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/player/pages/Podcast.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/player/pages/Podcast.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/player/pages/Podcast.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Podcast_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Podcast.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/Podcast.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Podcast_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/player/pages/Podcast.vue?vue&type=style&index=0&id=77eca436&lang=scss&scoped=true&":
/*!********************************************************************************************************************!*\
  !*** ./resources/js/components/player/pages/Podcast.vue?vue&type=style&index=0&id=77eca436&lang=scss&scoped=true& ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Podcast_vue_vue_type_style_index_0_id_77eca436_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Podcast.vue?vue&type=style&index=0&id=77eca436&lang=scss&scoped=true& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/Podcast.vue?vue&type=style&index=0&id=77eca436&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Podcast_vue_vue_type_style_index_0_id_77eca436_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Podcast_vue_vue_type_style_index_0_id_77eca436_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Podcast_vue_vue_type_style_index_0_id_77eca436_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Podcast_vue_vue_type_style_index_0_id_77eca436_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/components/player/pages/Podcast.vue?vue&type=template&id=77eca436&scoped=true&":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/components/player/pages/Podcast.vue?vue&type=template&id=77eca436&scoped=true& ***!
  \*****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Podcast_vue_vue_type_template_id_77eca436_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Podcast.vue?vue&type=template&id=77eca436&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/Podcast.vue?vue&type=template&id=77eca436&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Podcast_vue_vue_type_template_id_77eca436_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Podcast_vue_vue_type_template_id_77eca436_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/player/pages/Song.vue":
/*!*******************************************************!*\
  !*** ./resources/js/components/player/pages/Song.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Song_vue_vue_type_template_id_ac304a5a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Song.vue?vue&type=template&id=ac304a5a&scoped=true& */ "./resources/js/components/player/pages/Song.vue?vue&type=template&id=ac304a5a&scoped=true&");
/* harmony import */ var _Song_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Song.vue?vue&type=script&lang=js& */ "./resources/js/components/player/pages/Song.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Song_vue_vue_type_style_index_0_id_ac304a5a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Song.vue?vue&type=style&index=0&id=ac304a5a&lang=scss&scoped=true& */ "./resources/js/components/player/pages/Song.vue?vue&type=style&index=0&id=ac304a5a&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ "./node_modules/vuetify/lib/components/VBtn/index.js");
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/index.js");
/* harmony import */ var vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VImg */ "./node_modules/vuetify/lib/components/VImg/index.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Song_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Song_vue_vue_type_template_id_ac304a5a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Song_vue_vue_type_template_id_ac304a5a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "ac304a5a",
  null
  
)

/* vuetify-loader */




_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default()(component, {VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_5__["VBtn"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_6__["VIcon"],VImg: vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_7__["VImg"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/player/pages/Song.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/player/pages/Song.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./resources/js/components/player/pages/Song.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Song_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Song.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/Song.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Song_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/player/pages/Song.vue?vue&type=style&index=0&id=ac304a5a&lang=scss&scoped=true&":
/*!*****************************************************************************************************************!*\
  !*** ./resources/js/components/player/pages/Song.vue?vue&type=style&index=0&id=ac304a5a&lang=scss&scoped=true& ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Song_vue_vue_type_style_index_0_id_ac304a5a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Song.vue?vue&type=style&index=0&id=ac304a5a&lang=scss&scoped=true& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/Song.vue?vue&type=style&index=0&id=ac304a5a&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Song_vue_vue_type_style_index_0_id_ac304a5a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Song_vue_vue_type_style_index_0_id_ac304a5a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Song_vue_vue_type_style_index_0_id_ac304a5a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Song_vue_vue_type_style_index_0_id_ac304a5a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/components/player/pages/Song.vue?vue&type=template&id=ac304a5a&scoped=true&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/components/player/pages/Song.vue?vue&type=template&id=ac304a5a&scoped=true& ***!
  \**************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Song_vue_vue_type_template_id_ac304a5a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Song.vue?vue&type=template&id=ac304a5a&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/Song.vue?vue&type=template&id=ac304a5a&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Song_vue_vue_type_template_id_ac304a5a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Song_vue_vue_type_template_id_ac304a5a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/player/pages/UserProfile.vue":
/*!**************************************************************!*\
  !*** ./resources/js/components/player/pages/UserProfile.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserProfile_vue_vue_type_template_id_d7c81ae0_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserProfile.vue?vue&type=template&id=d7c81ae0&scoped=true& */ "./resources/js/components/player/pages/UserProfile.vue?vue&type=template&id=d7c81ae0&scoped=true&");
/* harmony import */ var _UserProfile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserProfile.vue?vue&type=script&lang=js& */ "./resources/js/components/player/pages/UserProfile.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _UserProfile_vue_vue_type_style_index_0_id_d7c81ae0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UserProfile.vue?vue&type=style&index=0&id=d7c81ae0&lang=scss&scoped=true& */ "./resources/js/components/player/pages/UserProfile.vue?vue&type=style&index=0&id=d7c81ae0&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ "./node_modules/vuetify/lib/components/VBtn/index.js");
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/index.js");
/* harmony import */ var vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VImg */ "./node_modules/vuetify/lib/components/VImg/index.js");
/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ "./node_modules/vuetify/lib/components/VGrid/index.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _UserProfile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UserProfile_vue_vue_type_template_id_d7c81ae0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UserProfile_vue_vue_type_template_id_d7c81ae0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "d7c81ae0",
  null
  
)

/* vuetify-loader */





_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default()(component, {VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_5__["VBtn"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_6__["VIcon"],VImg: vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_7__["VImg"],VRow: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_8__["VRow"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/player/pages/UserProfile.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/player/pages/UserProfile.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/player/pages/UserProfile.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserProfile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserProfile.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/UserProfile.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserProfile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/player/pages/UserProfile.vue?vue&type=style&index=0&id=d7c81ae0&lang=scss&scoped=true&":
/*!************************************************************************************************************************!*\
  !*** ./resources/js/components/player/pages/UserProfile.vue?vue&type=style&index=0&id=d7c81ae0&lang=scss&scoped=true& ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserProfile_vue_vue_type_style_index_0_id_d7c81ae0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserProfile.vue?vue&type=style&index=0&id=d7c81ae0&lang=scss&scoped=true& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/UserProfile.vue?vue&type=style&index=0&id=d7c81ae0&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserProfile_vue_vue_type_style_index_0_id_d7c81ae0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserProfile_vue_vue_type_style_index_0_id_d7c81ae0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserProfile_vue_vue_type_style_index_0_id_d7c81ae0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserProfile_vue_vue_type_style_index_0_id_d7c81ae0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/components/player/pages/UserProfile.vue?vue&type=template&id=d7c81ae0&scoped=true&":
/*!*********************************************************************************************************!*\
  !*** ./resources/js/components/player/pages/UserProfile.vue?vue&type=template&id=d7c81ae0&scoped=true& ***!
  \*********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserProfile_vue_vue_type_template_id_d7c81ae0_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserProfile.vue?vue&type=template&id=d7c81ae0&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/pages/UserProfile.vue?vue&type=template&id=d7c81ae0&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserProfile_vue_vue_type_template_id_d7c81ae0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserProfile_vue_vue_type_template_id_d7c81ae0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);