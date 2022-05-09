(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[14],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/chat/MessageComponent.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/chat/MessageComponent.vue?vue&type=script&lang=js& ***!
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ["friend"],
  data: function data() {
    return {
      chats: [],
      message: null,
      isTyping: false,
      chatMenuDialog: false,
      blockFriendConfirmationDialog: false
    };
  },
  computed: {
    session: function session() {
      return this.friend.session;
    }
  },
  methods: {
    send: function send() {
      if (this.message) {
        this.pushToChats(this.message);
        axios.post("/api/send/".concat(this.friend.session.id), {
          content: this.message,
          to_user: this.friend.id
        });

        if (!this.friend.session.last_message[0]) {
          this.friend.session.last_message[0] = {};
        }

        if (this.$store.getters.getSettings.ga4 && this.$store.getters.getSettings.analytics_fileUpload_event) {
          emitAnalyticsEvent({
            action: "Chat Message",
            category: "message",
            label: this.message
          });
        }

        this.friend.session.last_message[0].content = this.$t("You") + ": " + this.message;
        this.message = null;
      }
    },
    pushToChats: function pushToChats(message) {
      this.chats.push({
        message: message,
        type: 0,
        read_at: null,
        sent_at: this.$t("Just Now")
      });
    },
    close: function close() {
      this.$emit("close");
    },
    clear: function clear() {
      var _this = this;

      axios.post("/api/sessions/".concat(this.friend.session.id, "/clear")).then(function () {
        return _this.chats = [];
      });
    },
    block: function block() {
      if (!this.session.block) {
        this.session.block = true;
        this.session.blocked_by = this.$store.getters.getUser.id;
        this.chatMenuDialog = !this.chatMenuDialog;
        axios.post("/api/sessions/".concat(this.friend.session.id, "/block"));
      }
    },
    unblock: function unblock() {
      if (this.session.blocked_by == this.$store.getters.getUser.id) {
        this.session.block = false;
        this.session.blocked_by = null;
        axios.post("/api/sessions/".concat(this.friend.session.id, "/unblock"));
      }

      this.chatMenuDialog = !this.chatMenuDialog;
    },
    getAllMessages: function getAllMessages() {
      var _this2 = this;

      axios.post("/api/sessions/".concat(this.friend.session.id, "/chats")).then(function (res) {
        return _this2.chats = res.data;
      });
    },
    read: function read() {
      axios.post("/api/sessions/".concat(this.friend.session.id, "/read"));
    }
  },
  created: function created() {
    var _this3 = this;

    this.read();
    this.getAllMessages();
    window.Echo["private"]("Chat.".concat(this.friend.session.id)).listen("PrivateChatEvent", function (e) {
      _this3.friend.session.open ? _this3.read() : "";

      _this3.chats.push({
        message: e.content,
        type: 1,
        sent_at: _this3.$t("Just Now")
      });

      _this3.friend.session.last_message[0].content = e.content;
    });
    window.Echo["private"]("Chat.".concat(this.friend.session.id)).listen("MsgReadEvent", function (e) {
      return _this3.chats.forEach(function (chat) {
        return chat.id == e.chat.id ? chat.read_at = e.chat.read_at : "";
      });
    });
    window.Echo["private"]("Chat.".concat(this.friend.session.id)).listen("BlockEvent", function (e) {
      return _this3.session.block = e.blocked, _this3.session.blocked_by = e.blocked_by;
    });
    window.Echo["private"]("Chat.".concat(this.friend.session.id)).listenForWhisper("typing", function (e) {
      _this3.isTyping = true;
      setTimeout(function () {
        _this3.isTyping = false;
      }, 2000);
    });
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/chat/MessageComponent.vue?vue&type=style&index=0&lang=scss&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/chat/MessageComponent.vue?vue&type=style&index=0&lang=scss& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/sass-loader/dist/cjs.js):\nError: Missing binary. See message above.\n    at Object.<anonymous> (/home/leonardo/Documentos/Meus Projetos/freela/comporplay/node_modules/fibers/fibers.js:23:9)\n    at Module._compile (/home/leonardo/Documentos/Meus Projetos/freela/comporplay/node_modules/v8-compile-cache/v8-compile-cache.js:192:30)\n    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1155:10)\n    at Module.load (node:internal/modules/cjs/loader:981:32)\n    at Function.Module._load (node:internal/modules/cjs/loader:822:12)\n    at Module.require (node:internal/modules/cjs/loader:1005:19)\n    at require (/home/leonardo/Documentos/Meus Projetos/freela/comporplay/node_modules/v8-compile-cache/v8-compile-cache.js:159:20)\n    at getSassOptions (/home/leonardo/Documentos/Meus Projetos/freela/comporplay/node_modules/sass-loader/dist/getSassOptions.js:49:25)\n    at Object.loader (/home/leonardo/Documentos/Meus Projetos/freela/comporplay/node_modules/sass-loader/dist/index.js:48:51)");

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/chat/MessageComponent.vue?vue&type=style&index=0&lang=scss&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/chat/MessageComponent.vue?vue&type=style&index=0&lang=scss& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./MessageComponent.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/chat/MessageComponent.vue?vue&type=style&index=0&lang=scss&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/chat/MessageComponent.vue?vue&type=template&id=0b25444a&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/player/chat/MessageComponent.vue?vue&type=template&id=0b25444a& ***!
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
  return _vm.friend
    ? _c("div", { staticClass: "chat-wrapper" }, [
        _c("div", { staticClass: "chat-header" }, [
          _c(
            "div",
            {
              staticClass: "back pointer",
              on: {
                click: function ($event) {
                  $event.preventDefault()
                  return _vm.close.apply(null, arguments)
                },
              },
            },
            [_c("v-icon", [_vm._v("$vuetify.icons.chevron-left")])],
            1
          ),
          _vm._v(" "),
          _c("div", { staticClass: "friend-cover" }, [
            _c("img", { attrs: { src: _vm.friend.avatar, alt: "" } }),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "friend-name max-1-lines" }, [
            _vm._v("\n      " + _vm._s(_vm.friend.name) + "\n    "),
          ]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "dots" },
            [
              _c(
                "v-menu",
                {
                  attrs: {
                    left: "",
                    bottom: "",
                    "position-y": 125,
                    "offset-y": "",
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
                                _c("v-icon", { attrs: { small: "" } }, [
                                  _vm._v("$vuetify.icons.dots-horizontal"),
                                ]),
                              ],
                              1
                            ),
                          ]
                        },
                      },
                    ],
                    null,
                    false,
                    4209589308
                  ),
                },
                [
                  _vm._v(" "),
                  _c(
                    "v-list",
                    {
                      staticClass: "list",
                      class: { "dark-background": _vm.$vuetify.theme.dark },
                    },
                    [
                      _vm.session.blocked_by
                        ? _c("v-list-item", { on: { click: _vm.unblock } }, [
                            _vm._v(
                              "\n           " +
                                _vm._s(_vm.$t("Unblock")) +
                                "\n        "
                            ),
                          ])
                        : _c("v-list-item", { on: { click: _vm.block } }, [
                            _vm._v(
                              "\n           " +
                                _vm._s(_vm.$t("Block")) +
                                "\n        "
                            ),
                          ]),
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
                  attrs: { "max-width": "400" },
                  model: {
                    value: _vm.blockFriendConfirmationDialog,
                    callback: function ($$v) {
                      _vm.blockFriendConfirmationDialog = $$v
                    },
                    expression: "blockFriendConfirmationDialog",
                  },
                },
                [
                  _c(
                    "v-card",
                    [
                      _vm._v(
                        "\n          " +
                          _vm._s(_vm.$t("Are you sure you wanna block")) +
                          " " +
                          _vm._s(_vm.friend.name) +
                          " ?\n          "
                      ),
                      _c(
                        "v-card-actions",
                        [
                          _c(
                            "v-btn",
                            {
                              attrs: { color: "error", text: "" },
                              on: { click: _vm.block },
                            },
                            [_vm._v(_vm._s(_vm.$t("Block")))]
                          ),
                          _vm._v(" "),
                          _c(
                            "v-btn",
                            {
                              attrs: { text: "" },
                              on: {
                                click: function ($event) {
                                  _vm.blockFriendConfirmationDialog = false
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
          { staticClass: "chat-body" },
          _vm._l(_vm.chats, function (chat, i) {
            return _c(
              "div",
              {
                key: chat.id,
                staticClass: "msg",
                class: { "my-msg": chat.type == 0 },
              },
              [
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: i == _vm.chats.length - 1,
                        expression: "i == chats.length - 1",
                      },
                    ],
                    staticClass: "msg-time",
                  },
                  [_vm._v("\n        " + _vm._s(chat.send_at) + "\n      ")]
                ),
                _vm._v(" "),
                _c("div", { staticClass: "msg-text" }, [
                  _c("div", { staticClass: "text" }, [
                    _vm._v(
                      "\n          " + _vm._s(chat.message) + "\n        "
                    ),
                  ]),
                ]),
                _vm._v(" "),
                i == _vm.chats.length - 1
                  ? _c(
                      "div",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: chat.read_at,
                            expression: "chat.read_at",
                          },
                        ],
                        staticClass: "seen",
                      },
                      [
                        _vm._v(
                          "\n        " + _vm._s(_vm.$t("Seen")) + "\n      "
                        ),
                      ]
                    )
                  : _vm._e(),
              ]
            )
          }),
          0
        ),
        _vm._v(" "),
        _c("div", { staticClass: "chat-footer" }, [
          _c(
            "form",
            {
              on: {
                submit: function ($event) {
                  $event.preventDefault()
                  return _vm.send.apply(null, arguments)
                },
              },
            },
            [
              _c(
                "div",
                { staticClass: "chat-input text-center" },
                [
                  !_vm.session.block
                    ? [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.message,
                              expression: "message",
                            },
                          ],
                          staticClass: "form-control m_input",
                          attrs: {
                            type: "text",
                            placeholder: "Write your message here",
                          },
                          domProps: { value: _vm.message },
                          on: {
                            input: function ($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.message = $event.target.value
                            },
                          },
                        }),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "send-icon pointer",
                            on: { click: _vm.send },
                          },
                          [
                            _c("img", {
                              staticClass: "svg-image",
                              attrs: { src: "/svg/send.svg", alt: "" },
                            }),
                          ]
                        ),
                      ]
                    : [
                        _vm.session.blocked_by == _vm.$store.getters.getUser.id
                          ? _c(
                              "v-btn",
                              {
                                staticClass: "error",
                                attrs: { block: "" },
                                on: { click: _vm.unblock },
                              },
                              [_vm._v(_vm._s(_vm.$t("Unblock")))]
                            )
                          : _c("span", [
                              _vm._v(
                                _vm._s(
                                  _vm.$t(
                                    "You can no longer chat with this person."
                                  )
                                )
                              ),
                            ]),
                      ],
                ],
                2
              ),
            ]
          ),
        ]),
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/player/chat/MessageComponent.vue":
/*!******************************************************************!*\
  !*** ./resources/js/components/player/chat/MessageComponent.vue ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MessageComponent_vue_vue_type_template_id_0b25444a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MessageComponent.vue?vue&type=template&id=0b25444a& */ "./resources/js/components/player/chat/MessageComponent.vue?vue&type=template&id=0b25444a&");
/* harmony import */ var _MessageComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MessageComponent.vue?vue&type=script&lang=js& */ "./resources/js/components/player/chat/MessageComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _MessageComponent_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MessageComponent.vue?vue&type=style&index=0&lang=scss& */ "./resources/js/components/player/chat/MessageComponent.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ "./node_modules/vuetify/lib/components/VBtn/index.js");
/* harmony import */ var vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VCard */ "./node_modules/vuetify/lib/components/VCard/index.js");
/* harmony import */ var vuetify_lib_components_VDialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VDialog */ "./node_modules/vuetify/lib/components/VDialog/index.js");
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/index.js");
/* harmony import */ var vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuetify/lib/components/VList */ "./node_modules/vuetify/lib/components/VList/index.js");
/* harmony import */ var vuetify_lib_components_VMenu__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vuetify/lib/components/VMenu */ "./node_modules/vuetify/lib/components/VMenu/index.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _MessageComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _MessageComponent_vue_vue_type_template_id_0b25444a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _MessageComponent_vue_vue_type_template_id_0b25444a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* vuetify-loader */









_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default()(component, {VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_5__["VBtn"],VCard: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__["VCard"],VCardActions: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__["VCardActions"],VDialog: vuetify_lib_components_VDialog__WEBPACK_IMPORTED_MODULE_7__["VDialog"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_8__["VIcon"],VList: vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_9__["VList"],VListItem: vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_9__["VListItem"],VMenu: vuetify_lib_components_VMenu__WEBPACK_IMPORTED_MODULE_10__["VMenu"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/player/chat/MessageComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/player/chat/MessageComponent.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/player/chat/MessageComponent.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MessageComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./MessageComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/chat/MessageComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MessageComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/player/chat/MessageComponent.vue?vue&type=style&index=0&lang=scss&":
/*!****************************************************************************************************!*\
  !*** ./resources/js/components/player/chat/MessageComponent.vue?vue&type=style&index=0&lang=scss& ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MessageComponent_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./MessageComponent.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/chat/MessageComponent.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MessageComponent_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MessageComponent_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MessageComponent_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MessageComponent_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/components/player/chat/MessageComponent.vue?vue&type=template&id=0b25444a&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/components/player/chat/MessageComponent.vue?vue&type=template&id=0b25444a& ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MessageComponent_vue_vue_type_template_id_0b25444a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./MessageComponent.vue?vue&type=template&id=0b25444a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/player/chat/MessageComponent.vue?vue&type=template&id=0b25444a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MessageComponent_vue_vue_type_template_id_0b25444a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MessageComponent_vue_vue_type_template_id_0b25444a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);