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
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".landing-container {\n  background-color: #fdfdfd;\n  min-width: 350px;\n  color: #0f0f0f;\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\n.landing-container main {\n  flex-grow: 1;\n}\n.landing-header.custom {\n  height: 90vh;\n}\n@media (max-width: 900px) {\n.landing-header.custom {\n    height: 50vh;\n}\n}\n.landing-header.default {\n  background-image: url(\"/images/background.png\");\n}\n.landing-header {\n  background-size: cover;\n  background-position: center center;\n  border-bottom-right-radius: 160% 40%;\n  border-bottom-left-radius: 160% 40%;\n  color: white;\n  margin-bottom: 3em;\n}\n.landing-header__nav {\n  padding: 1em 1.5em;\n  display: flex;\n  z-index: 2;\n  justify-content: space-between;\n  align-items: center;\n}\n.landing-header__nav .logo {\n  padding-left: 1em;\n  z-index: 2;\n}\n.landing-header__nav .logo img {\n  max-height: 3em;\n}\n.landing-header__nav .options {\n  display: flex;\n  z-index: 2;\n}\n.landing-header__cover-layer {\n  z-index: 0;\n  border-bottom-right-radius: 160% 40%;\n  border-bottom-left-radius: 160% 40%;\n}\n.landing-header__hero {\n  text-align: center;\n  padding-top: 5rem;\n  display: flex;\n  justify-content: center;\n}\n.landing-header__hero img {\n  width: 27%;\n  min-width: 180px;\n}\n.landing-header__main {\n  overflow: hidden;\n  border-bottom-right-radius: 150% 40%;\n  border-bottom-left-radius: 150% 40%;\n}\n.landing-header__text {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 50%;\n  transform: translateY(-50%);\n  text-align: center;\n  position: absolute;\n  color: #fff;\n}\n.landing-header__text h1 {\n  font-size: 4em;\n}\n.landing-header__text h2 {\n  font-size: 1.25em;\n  font-weight: 400;\n}\n.landing-header__default-text {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 50%;\n  transform: translateY(-50%);\n  text-align: center;\n  position: absolute;\n  color: #fff;\n}\n.landing-header__default-text h1 {\n  font-weight: 800;\n  word-spacing: 4em;\n  white-space: nowrap;\n  font-size: 6em;\n  padding-left: 1em;\n  text-transform: uppercase;\n  margin-bottom: 2em;\n}\n.landing-header__default-text h2 {\n  text-align: center;\n  font-size: 2.5em;\n  font-weight: 500;\n  z-index: 2;\n  position: relative;\n}\n@media (max-width: 1920px) {\n.landing-header__default-text {\n    top: 60%;\n}\n}\n@media (max-width: 1500px) {\n.landing-header__default-text {\n    top: 60%;\n}\n.landing-header__default-text h1 {\n    word-spacing: 3em;\n    padding-left: 0.55em;\n}\n}\n@media (max-width: 1300px) {\n.landing-header__default-text {\n    top: 65%;\n}\n.landing-header__default-text h1 {\n    word-spacing: 2em;\n    margin-bottom: 1em;\n    padding-left: 0.95em;\n}\n}\n@media (max-width: 950px) {\n.landing-header__default-text {\n    top: 65%;\n}\n.landing-header__default-text h1 {\n    margin-bottom: 0.75em;\n    font-size: 5em;\n}\n.landing-header__default-text h2 {\n    font-size: 1.75em;\n}\n}\n@media (max-width: 750px) {\n.landing-header__default-text {\n    top: 55%;\n}\n.landing-header__default-text h1 {\n    font-size: 4em;\n    padding-left: 0.45em;\n}\n}\n@media (max-width: 600px) {\n.landing-header__default-text {\n    top: 60%;\n}\n.landing-header__default-text h1 {\n    font-size: 3em;\n}\n}\n@media (max-width: 500px) {\n.landing-header__default-text h1 {\n    word-spacing: 2.5em;\n    padding-left: 0.65em;\n}\n}\n@media (max-width: 400px) {\n.landing-header__default-text {\n    top: 50%;\n}\n.landing-header__default-text h1 {\n    word-spacing: 1.25em;\n}\n}\n.landing-header__button {\n  position: absolute;\n  left: 0;\n  right: 0;\n  z-index: 2;\n  bottom: 0;\n  text-align: center;\n  transform: translateY(50%);\n}\n.landing-header__button .v-btn {\n  max-width: 14em;\n  width: 30%;\n}\n.landing-section {\n  padding: 1em 4em;\n}\n.landing-section .container {\n  max-width: 1200px !important;\n}\n.landing-section__title {\n  font-size: 2em;\n  font-weight: 700;\n  line-height: 1.15;\n  margin-bottom: 0.75em;\n}\n.landing-section__sub-title {\n  opacity: 0.75;\n}\n@media (max-width: 960px) {\n.landing-section .text-side-container {\n    text-align: center;\n    order: -1;\n}\n}\n.landing-section .text-side-container .text-side {\n  max-width: 500px;\n}\n.landing-section .image-side {\n  padding: 1.5em;\n  display: flex;\n  justify-content: center;\n}\n.landing-section .image-side img {\n  max-width: 650px;\n  min-width: 350px;\n}\n@media (max-width: 1300px) {\n.landing-section .image-side img {\n    max-width: 550px;\n}\n}\n@media (max-width: 960px) {\n.landing-section .image-side img {\n    width: 110%;\n}\n}\n.footer-container {\n  padding: 3em;\n  background-size: cover;\n  color: white;\n}\n.footer-container .footer__title {\n  font-size: 1.2em;\n}\n.footer-container .footer__sub-title {\n  font-weight: 400;\n  opacity: 0.75;\n  line-height: 2;\n}\n.z-index-0 {\n  z-index: 0;\n}\n@media (min-width: 960px) {\n.sections-divider {\n    display: none !important;\n}\n}\n.account {\n  display: flex;\n  align-items: center;\n  border-radius: 25px;\n  padding: 0.3rem;\n  transition: all 0.4s;\n  position: relative;\n  cursor: pointer;\n}\n.account:hover {\n  background-color: rgba(110, 110, 110, 0.226);\n}\n.account .avatar {\n  width: 35px;\n  margin-right: 0.3rem;\n}\n.account .avatar-image {\n  height: 100%;\n  border-radius: 50%;\n  width: 100%;\n}\n@media screen and (min-width: 900px) {\n.account .short-name {\n    display: none;\n}\n}\n@media screen and (max-width: 700px) {\n.account .short-name {\n    display: none;\n}\n}\n.account .name {\n  max-width: 6em;\n}\n@media screen and (max-width: 900px) {\n.account .name {\n    display: none;\n}\n}\n.account .chevron {\n  margin-left: 0.5rem;\n}", ""]);

// exports


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

/***/ "./node_modules/vuetify/lib/components/VTextarea/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/vuetify/lib/components/VTextarea/index.js ***!
  \****************************************************************/
/*! exports provided: VTextarea, default */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/leonardo/Documentos/Meus Projetos/freela/comporplay/node_modules/vuetify/lib/components/VTextarea/index.js'");

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