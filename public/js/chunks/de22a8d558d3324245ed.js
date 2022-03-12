(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[16],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/chat/FriendList.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/chat/FriendList.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var laravel_echo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! laravel-echo */ "./node_modules/laravel-echo/dist/echo.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

window.Pusher = __webpack_require__(/*! pusher-js */ "./node_modules/pusher-js/dist/web/pusher.js");
/* harmony default export */ __webpack_exports__["default"] = ({
  created: function created() {
    var _this = this;

    // init pusher/echo
    if (this.$store.getters.getSettings.enableRealtime) {
      window.Echo = new laravel_echo__WEBPACK_IMPORTED_MODULE_0__["default"]({
        auth: {
          headers: {
            Authorization: "Bearer " + this.$store.getters.getToken
          }
        },
        authEndpoint: "/api/broadcasting/auth",
        broadcaster: "pusher",
        key: this.$store.getters.getSettings.pusherKey,
        cluster: this.$store.getters.getSettings.pusherCluster
      });
      window.Echo.channel("Chat").listen("HearingEvent", function (e) {
        var friend = _this.friends.find(function (friend) {
          return friend.id == e.user_id;
        });

        if (friend) {
          friend.is_playing = e.is_playing;
        }
      });
      window.Echo.join("Chat").here(function (users) {
        // this script is added so if the user closed the window and did not complete
        // a song, then his 'is_playing' status woudn't update. When a user rejoins
        // his status will be reseted ( is_playing = null )
        users.forEach(function (user) {
          if (user.id == _this.$store.getters.getUser.id) {
            if (!_this.$store.getters.getCurrentAudio) {
              _this.$store.dispatch("endPlay");
            }
          }
        });

        _this.friends.forEach(function (friend) {
          users.forEach(function (user) {
            if (user.id == friend.id) {
              friend.online = true;
            }
          });
        });
      }).joining(function (user) {
        _this.friends.forEach(function (friend) {
          return user.id == friend.id ? friend.online = true : "";
        });
      }).leaving(function (user) {
        _this.friends.forEach(function (friend) {
          return user.id == friend.id ? (friend.online = false, friend.is_playing = null) : "";
        });
      });
    }
  },
  data: function data() {
    return {
      focused: null
    };
  },
  computed: {
    friends: function friends() {
      return this.$store.getters.getFriends;
    }
  },
  methods: {
    unfriend: function unfriend(friend) {
      var _this2 = this;

      this.$confirm({
        message: "".concat(this.$t("Are you sure you wanna unfriend"), "  ").concat(friend.name, "?\")}"),
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
            _this2.$store.dispatch("removeFriend", friend.id).then(function () {
              return _this2.$store.dispatch("fetchFriends");
            });
          }
        }
      });
    },
    listenToFriendPlayer: function listenToFriendPlayer(content) {
      if (content.content_item.podcast) {
        this.$store.dispatch("playEpisode", {
          episode: content.content_item,
          reset: true
        });
      } else {
        this.$store.dispatch("playSong", {
          song: content.content_item,
          reset: true
        });
      }
    },
    whatIsHeListeningTo: function whatIsHeListeningTo(friend) {
      var is_playing = friend.is_playing;
      return this.$t("Listening to") + " " + is_playing.title + (is_playing.artists ? " " + this.$t("by") + " " + this.getArtists(is_playing.artists) : "") + (is_playing.parent_title ? " " + this.$t("from") + " " + is_playing.parent_title + (is_playing.content_type === "song" ? " " + this.$t("album") : is_playing.content_type === "episode" ? " " + this.$t("podacst") : "") : "");
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/chat/FriendList.vue?vue&type=template&id=eb71ec20&":
/*!********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/chat/FriendList.vue?vue&type=template&id=eb71ec20& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "friends-container" }, [
    _c(
      "div",
      { staticClass: "friends-container__main" },
      [
        _c("div", { staticClass: "friends-container__title" }, [
          _vm._v("\n            " + _vm._s(_vm.$t("Friends")) + "\n        ")
        ]),
        _vm._v(" "),
        _vm.friends.length
          ? _c("div", { staticClass: "friends-list" }, [
              _c(
                "ul",
                _vm._l(_vm.friends, function(friend) {
                  return _c("li", { key: friend.id }, [
                    _c("div", { staticClass: "top-side" }, [
                      _c("div", { staticClass: "avatar user-avatar" }, [
                        friend.badge
                          ? _c(
                              "div",
                              { staticClass: "badge" },
                              [
                                _c("v-icon", { attrs: { color: "primary" } }, [
                                  _vm._v(
                                    "$vuetify.icons." + _vm._s(friend.badge)
                                  )
                                ])
                              ],
                              1
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _c("img", { attrs: { src: friend.avatar, alt: "" } }),
                        _vm._v(" "),
                        friend.online
                          ? _c("div", { staticClass: "status status-online" })
                          : _c("div", { staticClass: "status status-offline" })
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "infos" }, [
                        _c("div", { staticClass: "name-container" }, [
                          _c("div", { staticClass: "name max-1-lines" }, [
                            _vm._v(
                              "\n                                    " +
                                _vm._s(friend.name) +
                                "\n                                "
                            )
                          ])
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "activity-container" }, [
                          _c("div", { staticClass: "hiding-box-left" }),
                          _vm._v(" "),
                          friend.is_playing && friend.online
                            ? _c("div", { staticClass: "activity" }, [
                                _vm._v(
                                  "\n                                    " +
                                    _vm._s(_vm.whatIsHeListeningTo(friend)) +
                                    "\n                                "
                                )
                              ])
                            : _vm._e(),
                          _vm._v(" "),
                          _c("div", { staticClass: "hiding-box-right" })
                        ])
                      ])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "bottom-side" }, [
                      _c("div", { staticClass: "options" }, [
                        _c(
                          "div",
                          {
                            staticClass: "profile",
                            on: {
                              click: function($event) {
                                return _vm.$router.push({
                                  name: "profile",
                                  params: { id: friend.id }
                                })
                              }
                            }
                          },
                          [
                            _vm._m(0, true),
                            _vm._v(" "),
                            _c("div", { staticClass: "option-title" }, [
                              _vm._v(
                                "\n                                    " +
                                  _vm._s(_vm.$t("Profile")) +
                                  "\n                                "
                              )
                            ])
                          ]
                        ),
                        _vm._v(" "),
                        _vm.$store.getters.getSettings.enableRealtime &&
                        _vm.$store.getters.getSettings.enableChat &&
                        _vm.hasPermission("Chat with friends")
                          ? _c(
                              "div",
                              {
                                staticClass: "chat",
                                on: {
                                  click: function($event) {
                                    return _vm.$store.commit(
                                      "setOpenChatWith",
                                      friend.id
                                    )
                                  }
                                }
                              },
                              [
                                _vm._m(1, true),
                                _vm._v(" "),
                                _c("div", { staticClass: "option-title" }, [
                                  _vm._v(
                                    "\n                                    " +
                                      _vm._s(_vm.$t("Chat")) +
                                      "\n                                "
                                  )
                                ])
                              ]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        friend.is_playing &&
                        friend.online &&
                        _vm.hasPermission("Listen with friends")
                          ? _c(
                              "button",
                              {
                                staticClass: "hear",
                                on: {
                                  click: function($event) {
                                    return _vm.listenToFriendPlayer(
                                      friend.is_playing
                                    )
                                  }
                                }
                              },
                              [
                                _vm._m(2, true),
                                _vm._v(" "),
                                _c("div", { staticClass: "option-title" }, [
                                  _vm._v(
                                    "\n                                    " +
                                      _vm._s(_vm.$t("Listen")) +
                                      "\n                                "
                                  )
                                ]),
                                _vm._v(" "),
                                _c("div", { staticClass: "overlay" })
                              ]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "unfollow",
                            on: {
                              click: function($event) {
                                return _vm.unfriend(friend)
                              }
                            }
                          },
                          [
                            _vm._m(3, true),
                            _vm._v(" "),
                            _c("div", { staticClass: "option-title" }, [
                              _vm._v(
                                "\n                                    " +
                                  _vm._s(_vm.$t("Unfriend")) +
                                  "\n                                "
                              )
                            ])
                          ]
                        )
                      ])
                    ])
                  ])
                }),
                0
              )
            ])
          : _c("empty-page", {
              attrs: {
                id: "no-friends",
                headline: _vm.$t("No Friends!"),
                sub: _vm.$t("You seem to be having no friends. Add some!")
              }
            })
      ],
      1
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "icon" }, [
      _c("img", {
        staticClass: "svg-image",
        attrs: { src: "/svg/user-circle.svg", alt: "" }
      })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "icon" }, [
      _c("img", {
        staticClass: "svg-image",
        attrs: { src: "/svg/speech-bubble-line.svg", alt: "" }
      })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "icon" }, [
      _c("img", {
        staticClass: "svg-image",
        attrs: { src: "/svg/headphone.svg", alt: "" }
      })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "icon" }, [
      _c("img", {
        staticClass: "svg-image",
        attrs: { src: "/svg/male-remove.svg", alt: "" }
      })
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/player/chat/FriendList.vue":
/*!************************************************************!*\
  !*** ./resources/js/components/player/chat/FriendList.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FriendList_vue_vue_type_template_id_eb71ec20___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FriendList.vue?vue&type=template&id=eb71ec20& */ "./resources/js/components/player/chat/FriendList.vue?vue&type=template&id=eb71ec20&");
/* harmony import */ var _FriendList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FriendList.vue?vue&type=script&lang=js& */ "./resources/js/components/player/chat/FriendList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/index.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _FriendList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _FriendList_vue_vue_type_template_id_eb71ec20___WEBPACK_IMPORTED_MODULE_0__["render"],
  _FriendList_vue_vue_type_template_id_eb71ec20___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* vuetify-loader */


_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default()(component, {VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_4__["VIcon"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/player/chat/FriendList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/player/chat/FriendList.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/js/components/player/chat/FriendList.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FriendList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./FriendList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/chat/FriendList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FriendList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/player/chat/FriendList.vue?vue&type=template&id=eb71ec20&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/player/chat/FriendList.vue?vue&type=template&id=eb71ec20& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FriendList_vue_vue_type_template_id_eb71ec20___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./FriendList.vue?vue&type=template&id=eb71ec20& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/chat/FriendList.vue?vue&type=template&id=eb71ec20&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FriendList_vue_vue_type_template_id_eb71ec20___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FriendList_vue_vue_type_template_id_eb71ec20___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);