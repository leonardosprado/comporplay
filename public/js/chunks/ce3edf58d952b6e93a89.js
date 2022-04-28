(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["landing"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Landing.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Landing.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dialogs_ContactUs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dialogs/ContactUs */ "./resources/js/components/dialogs/ContactUs.vue");
/* harmony import */ var _elements_User_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./elements/User.vue */ "./resources/js/components/elements/User.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      meta: [{
        name: "description",
        content: this.$store.getters.getSettings.siteDescription.replace("%site_name", this.$store.getters.getSettings.appName)
      }]
    };
  },
  components: {
    ContactUs: _dialogs_ContactUs__WEBPACK_IMPORTED_MODULE_0__["default"],
    User: _elements_User_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  created: function created() {
    this.landingPage.sections = JSON.parse(this.landingPage.sections);
    this.landingPage.showContactUs = Boolean(parseInt(this.landingPage.showContactUs));
  },
  data: function data() {
    return {
      landingPage: JSON.parse(JSON.stringify(this.$store.getters.getSettings.landingPage)),
      userMenu: false
    };
  },
  computed: {
    user: function user() {
      return this.$store.getters.getUser;
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Landing.vue?vue&type=style&index=0&lang=scss&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Landing.vue?vue&type=style&index=0&lang=scss& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/sass-loader/dist/cjs.js):\nError: Missing binary. See message above.\n    at Object.<anonymous> (/home/leonardo/Documentos/Meus Projetos/freela/comporplay/node_modules/fibers/fibers.js:23:9)\n    at Module._compile (/home/leonardo/Documentos/Meus Projetos/freela/comporplay/node_modules/v8-compile-cache/v8-compile-cache.js:192:30)\n    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1157:10)\n    at Module.load (node:internal/modules/cjs/loader:981:32)\n    at Function.Module._load (node:internal/modules/cjs/loader:822:12)\n    at Module.require (node:internal/modules/cjs/loader:1005:19)\n    at require (/home/leonardo/Documentos/Meus Projetos/freela/comporplay/node_modules/v8-compile-cache/v8-compile-cache.js:159:20)\n    at getSassOptions (/home/leonardo/Documentos/Meus Projetos/freela/comporplay/node_modules/sass-loader/dist/getSassOptions.js:49:25)\n    at Object.loader (/home/leonardo/Documentos/Meus Projetos/freela/comporplay/node_modules/sass-loader/dist/index.js:48:51)");

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Landing.vue?vue&type=style&index=0&lang=scss&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Landing.vue?vue&type=style&index=0&lang=scss& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--8-2!../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Landing.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Landing.vue?vue&type=style&index=0&lang=scss&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Landing.vue?vue&type=template&id=15bf0008&":
/*!*****************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Landing.vue?vue&type=template&id=15bf0008& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "landing-container" }, [
    _c(
      "header",
      {
        staticClass: "landing-header relative custom",
        style: {
          backgroundImage:
            "url(" +
            (_vm.landingPage.headerBackground ||
              "/images/landing-background.jpg") +
            ")",
        },
      },
      [
        _c("div", {
          staticClass: "landing-header__cover-layer absolute fill",
          style: {
            backgroundColor: _vm.landingPage.headerBackgroundLayerColor,
          },
        }),
        _vm._v(" "),
        _c("nav", { staticClass: "landing-header__nav" }, [
          _c("div", { staticClass: "logo" }, [
            _c("img", {
              attrs: {
                src: _vm.$store.getters.getSettings.appLogo,
                alt: _vm.$t("Logo Image"),
              },
            }),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "options" }, [
            _vm.user
              ? _c("div", { staticClass: "user white--text" }, [_c("User")], 1)
              : _c("div", { staticClass: "auth-buttons" }, [
                  _c(
                    "div",
                    { staticClass: "buttons" },
                    [
                      _c(
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
                      ),
                      _vm._v(" "),
                      !_vm.$store.getters.getSettings.disableRegistration
                        ? _c(
                            "v-btn",
                            {
                              staticClass: "register__btn ml-2 white--text",
                              attrs: {
                                small: "",
                                outlined: "",
                                color: "white",
                              },
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
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "absolute fill text-center z-index-0" }, [
          _c("div", { staticClass: "landing-header__main" }, [
            _c("div", { staticClass: "landing-header__text" }, [
              _c("h1", [_vm._v(_vm._s(_vm.landingPage.headerTitle))]),
              _vm._v(" "),
              _c("h2", [_vm._v(_vm._s(_vm.landingPage.headerDescription))]),
            ]),
          ]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "landing-header__button" },
            [
              _c(
                "v-btn",
                {
                  staticClass: "primary",
                  attrs: {
                    rounded: "",
                    large: "",
                    to: _vm.$store.getters.getSettings.playerLanding,
                  },
                },
                [
                  _vm._v(
                    "\n                    " +
                      _vm._s(_vm.landingPage.callToAction) +
                      "\n                "
                  ),
                ]
              ),
            ],
            1
          ),
        ]),
      ]
    ),
    _vm._v(" "),
    _c(
      "main",
      [
        _vm._l(_vm.landingPage.sections, function (section, i) {
          return _c(
            "section",
            { key: i, staticClass: "landing-section" },
            [
              _c(
                "v-container",
                { staticClass: "container" },
                [
                  _c(
                    "v-row",
                    { attrs: { align: "center" } },
                    [
                      section.background
                        ? _c(
                            "v-col",
                            {
                              staticClass: "justify-center",
                              style: { order: i % 2 == 0 ? 1 : 0 },
                              attrs: { lg: "6", md: "6", sm: "12" },
                            },
                            [
                              _c("div", { staticClass: "image-side" }, [
                                _c("img", {
                                  attrs: { src: section.background },
                                }),
                              ]),
                            ]
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _c(
                        "v-col",
                        {
                          staticClass: "text-side-container justify-center",
                          attrs: {
                            lg: section.background ? 6 : 12,
                            md: section.background ? 6 : 12,
                            sm: "12",
                          },
                        },
                        [
                          _c("div", { staticClass: "text-side" }, [
                            _c(
                              "div",
                              { staticClass: "landing-section__title" },
                              [
                                _vm._v(
                                  "\n                                " +
                                    _vm._s(section.title) +
                                    "\n                            "
                                ),
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "landing-section__sub-title" },
                              [
                                _vm._v(
                                  "\n                                " +
                                    _vm._s(section.description) +
                                    "\n                            "
                                ),
                              ]
                            ),
                          ]),
                        ]
                      ),
                    ],
                    1
                  ),
                ],
                1
              ),
              _vm._v(" "),
              _c("v-divider", { staticClass: "sections-divider" }),
            ],
            1
          )
        }),
        _vm._v(" "),
        _vm.landingPage.showContactUs &&
        _vm.$store.getters.getSettings.enableMail
          ? _c(
              "section",
              { staticClass: "landing-section" },
              [
                _c(
                  "v-container",
                  { staticClass: "container" },
                  [
                    _c("h2", { staticClass: "text-center" }, [
                      _vm._v(_vm._s(_vm.$t("Contact Us"))),
                    ]),
                    _vm._v(" "),
                    _c(
                      "v-row",
                      [
                        _c(
                          "v-col",
                          { staticClass: "justify-center" },
                          [_c("contact-us")],
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
      2
    ),
    _vm._v(" "),
    _c("footer", [
      _c(
        "div",
        {
          staticClass: "footer-container",
          style: {
            backgroundImage: "url(" + _vm.landingPage.footerBackground + ")",
          },
        },
        [
          _c(
            "v-row",
            [
              _c(
                "v-col",
                { staticClass: "text-center" },
                [
                  _c("div", { staticClass: "footer__title" }, [
                    _c("h2", [
                      _vm._v(
                        "\n                            " +
                          _vm._s(_vm.landingPage.footerTitle) +
                          "\n                        "
                      ),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "footer__sub-title" }, [
                    _vm._v(
                      "\n                        " +
                        _vm._s(_vm.landingPage.footerDescription) +
                        "\n                    "
                    ),
                  ]),
                  _vm._v(" "),
                  !_vm.$store.getters.getSettings.disableRegistration
                    ? _c(
                        "v-btn",
                        {
                          staticClass: "mt-2",
                          attrs: {
                            color: "white",
                            outlined: "",
                            "min-width": "120",
                          },
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
            ],
            1
          ),
        ],
        1
      ),
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "text-center py-4" }, [
      _vm._v(
        "\n        © " +
          _vm._s(_vm.moment().year()) +
          " " +
          _vm._s(_vm.$store.getters.getSettings.appName) +
          ". " +
          _vm._s(_vm.$t("All rights reserved.")) +
          "\n    "
      ),
    ]),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/Landing.vue":
/*!*********************************************!*\
  !*** ./resources/js/components/Landing.vue ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Landing_vue_vue_type_template_id_15bf0008___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Landing.vue?vue&type=template&id=15bf0008& */ "./resources/js/components/Landing.vue?vue&type=template&id=15bf0008&");
/* harmony import */ var _Landing_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Landing.vue?vue&type=script&lang=js& */ "./resources/js/components/Landing.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Landing_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Landing.vue?vue&type=style&index=0&lang=scss& */ "./resources/js/components/Landing.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ "./node_modules/vuetify/lib/components/VBtn/index.js");
/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ "./node_modules/vuetify/lib/components/VGrid/index.js");
/* harmony import */ var vuetify_lib_components_VDivider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VDivider */ "./node_modules/vuetify/lib/components/VDivider/index.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Landing_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Landing_vue_vue_type_template_id_15bf0008___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Landing_vue_vue_type_template_id_15bf0008___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* vuetify-loader */






_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default()(component, {VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_5__["VBtn"],VCol: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__["VCol"],VContainer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__["VContainer"],VDivider: vuetify_lib_components_VDivider__WEBPACK_IMPORTED_MODULE_7__["VDivider"],VRow: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__["VRow"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Landing.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Landing.vue?vue&type=script&lang=js&":
/*!**********************************************************************!*\
  !*** ./resources/js/components/Landing.vue?vue&type=script&lang=js& ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Landing_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Landing.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Landing.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Landing_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Landing.vue?vue&type=style&index=0&lang=scss&":
/*!*******************************************************************************!*\
  !*** ./resources/js/components/Landing.vue?vue&type=style&index=0&lang=scss& ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Landing_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader!../../../node_modules/css-loader!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--8-2!../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Landing.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Landing.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Landing_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Landing_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Landing_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Landing_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/components/Landing.vue?vue&type=template&id=15bf0008&":
/*!****************************************************************************!*\
  !*** ./resources/js/components/Landing.vue?vue&type=template&id=15bf0008& ***!
  \****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Landing_vue_vue_type_template_id_15bf0008___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Landing.vue?vue&type=template&id=15bf0008& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Landing.vue?vue&type=template&id=15bf0008&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Landing_vue_vue_type_template_id_15bf0008___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Landing_vue_vue_type_template_id_15bf0008___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);