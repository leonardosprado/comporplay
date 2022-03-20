(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["auth"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/authentication/ForgotPassword.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/authentication/ForgotPassword.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _templates_Authentication__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../templates/Authentication */ "./resources/js/components/templates/Authentication.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  metaInfo: {
    title: window.Settings.find(function (set) {
      return set.key === "appName";
    }).value + " - forget password"
  },
  components: {
    authentificationTemplate: _templates_Authentication__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      email: "",
      error: null,
      success: null,
      loading: false
    };
  },
  methods: {
    requestResetPassword: function requestResetPassword() {
      var _this = this;

      this.loading = true;
      axios.post("/api/password/forgot", {
        email: this.email
      }).then(function (result) {
        _this.success = result.data.message;
      })["finally"](function () {
        return _this.loading = false;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/authentication/Login.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/authentication/Login.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _LoadingBackground__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../LoadingBackground */ "./resources/js/components/LoadingBackground.vue");
/* harmony import */ var _templates_Authentication__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../templates/Authentication */ "./resources/js/components/templates/Authentication.vue");


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

 // import { VFBLoginScope as VFacebookLoginScope } from "vue-facebook-login-component";

/* harmony default export */ __webpack_exports__["default"] = ({
  metaInfo: {
    title: window.Settings.find(function (set) {
      return set.key === "appName";
    }).value + " - Login to your account"
  },
  components: {
    LoadingBackground: _LoadingBackground__WEBPACK_IMPORTED_MODULE_1__["default"],
    authentificationTemplate: _templates_Authentication__WEBPACK_IMPORTED_MODULE_2__["default"] // VFacebookLoginScope

  },
  data: function data() {
    return {
      email: "",
      password: "",
      remember: false,
      error: "",
      loading: false,
      loadingPage: false,
      showPassword: false
    };
  },
  created: function created() {},
  methods: {
    login: function login() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.loading = true;
                _context.prev = 1;
                _context.next = 4;
                return _this.$store.dispatch("login", {
                  email: _this.email,
                  password: _this.password
                });

              case 4:
                _context.next = 9;
                break;

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](1);
                _this.loading = false;

              case 9:
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

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/authentication/Register.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/authentication/Register.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _templates_Authentication__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../templates/Authentication */ "./resources/js/components/templates/Authentication.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
 // import { VFBLoginScope as VFacebookLoginScope } from "vue-facebook-login-component";

/* harmony default export */ __webpack_exports__["default"] = ({
  metaInfo: {
    title: window.Settings.find(function (set) {
      return set.key === "appName";
    }).value + " - Create new account"
  },
  components: {
    authentificationTemplate: _templates_Authentication__WEBPACK_IMPORTED_MODULE_0__["default"] // VFacebookLoginScope

  },
  data: function data() {
    var _this = this;

    return {
      email: "",
      name: "",
      password1: "",
      password2: "",
      error: "",
      success: "",
      loading: false,
      showPassword1: false,
      showPassword2: false,
      rules: {
        required: function required(value) {
          return !!value || _this.$t("Required.");
        },
        min: function min(v) {
          return v.length >= 8 || _this.$t("Min 8 characters");
        },
        emailMatch: function emailMatch() {
          return _this.$t("Please enter a valid email.");
        }
      }
    };
  },
  methods: {
    register: function register() {
      var _this2 = this;

      this.error = "";
      this.loading = true;

      if (this.password1 !== this.password2) {
        this.error = this.$t("Password does not match!");
        this.loading = false;
      } else {
        axios.post("/api/register", {
          email: this.email,
          password: this.password1,
          name: this.name
        }).then(function (res) {
          _this2.success = res.data.message || _this2.$t("Account created successfully. You can login now.");
        })["catch"](function (e) {// if (e.response.data.errors) {
          //     this.error = Object.values(
          //         e.response.data.errors
          //     )[0];
          // } else {
          //     this.error = e.response.data;
          // }
        })["finally"](function () {
          return _this2.loading = false;
        });
      }
    },
    // upcoming feature
    // logInWithFacebook(res) {
    //   axios
    //     .get(
    //       `https://graph.facebook.com/me?fields=name,email,picture&access_token=${res.authResponse.accessToken}`
    //     )
    //     .then((result) => {
    //       let profile = {
    //         email: result.data.email,
    //         avatar: result.data.picture.data.url,
    //         name: result.data.name,
    //         id: result.data.id,
    //       };
    //       this.$store.dispatch("login", { driver: "facebook", profile });
    //     });
    // },
    handleSdkInit: function handleSdkInit(_ref) {
      var scope = _ref.scope;
      this.$store.commit("setFbLogoutFunction", scope.logout);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/authentication/RegisterCompositor.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/authentication/RegisterCompositor.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _templates_Authentication__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../templates/Authentication */ "./resources/js/components/templates/Authentication.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  metaInfo: {
    title: window.Settings.find(function (set) {
      return set.key === "appName";
    }).value + " - Criar Novo Compositor(a)"
  },
  components: {
    authentificationTemplate: _templates_Authentication__WEBPACK_IMPORTED_MODULE_0__["default"] // VFacebookLoginScope

  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/authentication/RegisterCompositorPf.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/authentication/RegisterCompositorPf.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _templates_Authentication__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../templates/Authentication */ "./resources/js/components/templates/Authentication.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  metaInfo: {
    title: window.Settings.find(function (set) {
      return set.key === "appName";
    }).value + " - Registrar Compositor(a) - Pessoa Fisíca"
  },
  components: {
    authentificationTemplate: _templates_Authentication__WEBPACK_IMPORTED_MODULE_0__["default"] // VFacebookLoginScope

  },
  data: function data() {
    var _this = this;

    return {
      email: "",
      name: "",
      nameArtistico: "",
      rg: "",
      cpf: "",
      nacionalidade: "",
      nome_mae: "",
      nome_pai: "",
      estado_civil: "",
      nome_conjugue: "",
      password1: "",
      password2: "",
      error: "",
      success: "",
      loading: false,
      showPassword1: false,
      showPassword2: false,
      rules: {
        required: function required(value) {
          return !!value || _this.$t("Required.");
        },
        min: function min(v) {
          return v.length >= 8 || _this.$t("Min 8 characters");
        },
        emailMatch: function emailMatch() {
          return _this.$t("Please enter a valid email.");
        }
      }
    };
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/authentication/RegisterCompositorPj.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/authentication/RegisterCompositorPj.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _templates_Authentication__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../templates/Authentication */ "./resources/js/components/templates/Authentication.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  metaInfo: {
    title: window.Settings.find(function (set) {
      return set.key === "appName";
    }).value + " - Registrar Compositor(a) - Pessoa Fisíca"
  },
  components: {
    authentificationTemplate: _templates_Authentication__WEBPACK_IMPORTED_MODULE_0__["default"] // VFacebookLoginScope

  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/authentication/ResetPassword.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/authentication/ResetPassword.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _templates_Authentication__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../templates/Authentication */ "./resources/js/components/templates/Authentication.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  metaInfo: {
    title: window.Settings.find(function (set) {
      return set.key === "appName";
    }).value + " - Reset password"
  },
  components: {
    authentificationTemplate: _templates_Authentication__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      error: null,
      success: "",
      password: "",
      email: "",
      password_confirmation: "",
      loading: false
    };
  },
  methods: {
    resetPassword: function resetPassword() {
      var _this = this;

      this.loading = true;
      axios.post("/api/password/reset", {
        token: this.$route.params.token,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation
      }).then(function () {
        _this.success = "Password reset successfully. Redirecting to login...";
        setTimeout(function () {
          _this.$router.push({
            name: "login"
          });
        }, 1500);
      })["catch"](function (error) {
        _this.error = Object.values(error.response.data.errors).join("<br />");
      })["finally"](function () {
        return _this.loading = false;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/templates/Authentication.vue?vue&type=style&index=0&lang=scss&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/templates/Authentication.vue?vue&type=style&index=0&lang=scss& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".auth-page-wrapper {\n  font-family: \"Nunito\", sans-serif;\n  color: rgba(0, 0, 0, 0.795) !important;\n  background-image: url(\"/images/background.svg\");\n  background-color: #f3f3f3;\n  background-size: cover;\n  transition: height 0.5s;\n  height: 100%;\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  position: relative;\n  padding: 1em 0;\n}\n.auth-page-wrapper .auth-box {\n  max-width: 500px;\n  min-width: 400px;\n  padding: 1em;\n  border-radius: 5px !important;\n}\n@media (max-width: 500px) {\n.auth-page-wrapper .auth-box {\n    width: 85%;\n    min-width: 320px;\n}\n}\n.auth-page-wrapper .auth-box .logo-img-container img {\n  height: 50px;\n}\n.auth-page-wrapper .auth-box__auth-btn {\n  position: relative !important;\n  width: 60px !important;\n}\n.auth-page-wrapper .auth-box__title h2 {\n  text-align: center !important;\n  padding: 0.6em 0 !important;\n}\n.auth-page-wrapper .auth-box .error-message-container {\n  display: flex;\n  justify-content: center;\n}\n.auth-page-wrapper .auth-box .link-text {\n  font-size: 0.9em;\n  opacity: 0.7;\n  cursor: pointer;\n  transition: color 0.5s;\n}\n.auth-page-wrapper .auth-box .link-text:hover {\n  color: #4245a8;\n}\n.auth-page-wrapper .auth-box .wide-divider {\n  margin-top: 26px;\n  opacity: 0.75;\n  margin-bottom: 8px;\n}\n.v-application.theme--dark .auth-page-wrapper {\n  background-color: #222222;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/templates/Authentication.vue?vue&type=style&index=0&lang=scss&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/templates/Authentication.vue?vue&type=style&index=0&lang=scss& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--8-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Authentication.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/templates/Authentication.vue?vue&type=style&index=0&lang=scss&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/LoadingBackground.vue?vue&type=template&id=c67ca0a2&":
/*!***************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/LoadingBackground.vue?vue&type=template&id=c67ca0a2& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************/
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
  return _vm._m(0)
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "loading-background-wrapper" }, [
      _c("div", { staticClass: "loader" }, [
        _c("span"),
        _vm._v(" "),
        _c("span"),
        _vm._v(" "),
        _c("span"),
        _vm._v(" "),
        _c("span"),
        _vm._v(" "),
        _c("span"),
        _vm._v(" "),
        _c("span"),
        _vm._v(" "),
        _c("span"),
        _vm._v(" "),
        _c("span"),
        _vm._v(" "),
        _c("span"),
        _vm._v(" "),
        _c("span"),
        _vm._v(" "),
        _c("span"),
        _vm._v(" "),
        _c("span"),
        _vm._v(" "),
        _c("span"),
        _vm._v(" "),
        _c("span"),
      ]),
    ])
  },
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/authentication/ForgotPassword.vue?vue&type=template&id=70967aba&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/authentication/ForgotPassword.vue?vue&type=template&id=70967aba& ***!
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
  return _c("authentification-template", [
    _c(
      "div",
      { staticClass: "login-wrapper" },
      [
        _c("div", { staticClass: "auth-box__title" }, [
          _c("h2", [_vm._v(_vm._s(_vm.$t("Reset your password")))]),
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "error-message-container" },
          [
            _vm.error
              ? _c(
                  "v-chip",
                  {
                    staticClass: "ma-2",
                    attrs: { color: "red", label: "", "text-color": "white" },
                  },
                  [
                    _c("v-icon", { attrs: { left: "" } }, [
                      _vm._v("$vuetify.icons.alert"),
                    ]),
                    _vm._v(
                      "\n                " +
                        _vm._s(_vm.error) +
                        "\n            "
                    ),
                  ],
                  1
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.success
              ? _c(
                  "v-chip",
                  {
                    staticClass: "ma-2",
                    attrs: {
                      color: "success",
                      label: "",
                      "text-color": "white",
                    },
                  },
                  [
                    _c("v-icon", { attrs: { left: "" } }, [
                      _vm._v("$vuetify.icons.checkmark"),
                    ]),
                    _vm._v(
                      "\n                " +
                        _vm._s(_vm.success) +
                        "\n            "
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
          "v-container",
          [
            _c(
              "v-row",
              [
                _c(
                  "v-col",
                  { staticClass: "auth-box__inputs", attrs: { cols: "12" } },
                  [
                    _c("v-text-field", {
                      attrs: {
                        light: "",
                        label: _vm.$t("Enter your login email"),
                        outlined: "",
                      },
                      model: {
                        value: _vm.email,
                        callback: function ($$v) {
                          _vm.email = $$v
                        },
                        expression: "email",
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
                        attrs: {
                          block: "",
                          loading: _vm.loading,
                          color: "primary",
                          disabled: _vm.loading,
                        },
                        on: { click: _vm.requestResetPassword },
                        scopedSlots: _vm._u([
                          {
                            key: "loader",
                            fn: function () {
                              return [
                                _c(
                                  "span",
                                  { staticClass: "custom-loader" },
                                  [
                                    _c("v-icon", { attrs: { light: "" } }, [
                                      _vm._v("$vuetify.icons.cached"),
                                    ]),
                                  ],
                                  1
                                ),
                              ]
                            },
                            proxy: true,
                          },
                        ]),
                      },
                      [
                        _vm._v(
                          "\n                        " +
                            _vm._s(_vm.$t("Reset")) +
                            "\n                        "
                        ),
                      ]
                    ),
                  ],
                  1
                ),
              ],
              1
            ),
            _vm._v(" "),
            _c("div", { staticClass: "divider wide-divider" }),
            _vm._v(" "),
            _c("div", [
              _c("div", [
                _c("div", { staticClass: "bold text-center" }, [
                  _c("h3", [_vm._v(_vm._s(_vm.$t("Remember you password?")))]),
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "signup-button-con text-center mt-4" },
                  [
                    _c(
                      "v-btn",
                      {
                        attrs: { color: "primary", outlined: "" },
                        on: {
                          click: function ($event) {
                            return _vm.$router.push({ name: "login" })
                          },
                        },
                      },
                      [_vm._v(_vm._s(_vm.$t("Login to your account")))]
                    ),
                  ],
                  1
                ),
              ]),
            ]),
          ],
          1
        ),
      ],
      1
    ),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/authentication/Login.vue?vue&type=template&id=093970bd&":
/*!******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/authentication/Login.vue?vue&type=template&id=093970bd& ***!
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
  return !_vm.loadingPage
    ? _c("authentification-template", [
        _c(
          "div",
          { staticClass: "login-wrapper" },
          [
            _c("div", { staticClass: "auth-box__title" }, [
              _c("h2", [_vm._v(_vm._s(_vm.$t("Login to your account")))]),
            ]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "error-message-container" },
              [
                _vm.error
                  ? _c(
                      "v-chip",
                      {
                        staticClass: "ma-2",
                        attrs: {
                          color: "red",
                          label: "",
                          "text-color": "white",
                        },
                      },
                      [
                        _c("v-icon", { attrs: { left: "" } }, [
                          _vm._v("$vuetify.icons.alert"),
                        ]),
                        _vm._v(
                          "\n                " +
                            _vm._s(_vm.error) +
                            "\n            "
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
              "v-container",
              [
                _c(
                  "v-row",
                  [
                    _c(
                      "v-col",
                      {
                        staticClass: "auth-box__inputs",
                        attrs: { cols: "12" },
                      },
                      [
                        _c("v-text-field", {
                          attrs: { label: _vm.$t("Email"), outlined: "" },
                          model: {
                            value: _vm.email,
                            callback: function ($$v) {
                              _vm.email = $$v
                            },
                            expression: "email",
                          },
                        }),
                        _vm._v(" "),
                        _c("v-text-field", {
                          staticClass: "mt-3",
                          attrs: {
                            "append-icon": _vm.showPassword
                              ? "mdi-eye"
                              : "mdi-eye-off",
                            type: _vm.showPassword ? "text" : "password",
                            label: _vm.$t("Password"),
                            outlined: "",
                            "hide-details": "",
                          },
                          on: {
                            "click:append": function ($event) {
                              _vm.showPassword = !_vm.showPassword
                            },
                          },
                          model: {
                            value: _vm.password,
                            callback: function ($$v) {
                              _vm.password = $$v
                            },
                            expression: "password",
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
                  "v-row",
                  {
                    staticClass: "py-3",
                    attrs: { justify: "end", align: "center" },
                  },
                  [
                    _c(
                      "v-col",
                      { attrs: { cols: "12" } },
                      [
                        _c(
                          "v-btn",
                          {
                            attrs: {
                              block: "",
                              loading: _vm.loading,
                              color: "primary",
                              disabled: _vm.loading,
                            },
                            on: { click: _vm.login },
                            scopedSlots: _vm._u(
                              [
                                {
                                  key: "loader",
                                  fn: function () {
                                    return [
                                      _c(
                                        "span",
                                        { staticClass: "custom-loader" },
                                        [
                                          _c("v-icon", [
                                            _vm._v("$vuetify.icons.cached"),
                                          ]),
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
                              1624374772
                            ),
                          },
                          [
                            _vm._v(
                              "\n                        " +
                                _vm._s(_vm.$t("Login")) +
                                "\n                        "
                            ),
                          ]
                        ),
                      ],
                      1
                    ),
                  ],
                  1
                ),
                _vm._v(" "),
                _c("v-row", { staticClass: "text-center" }, [
                  _c("div", { staticClass: "link-text flex-grow-1" }, [
                    _c(
                      "span",
                      {
                        staticClass: "text",
                        on: {
                          click: function ($event) {
                            return _vm.$router.push({ name: "forgot_password" })
                          },
                        },
                      },
                      [
                        _vm._v(
                          "\n                        " +
                            _vm._s(_vm.$t("Forgot your password?")) +
                            "\n                    "
                        ),
                      ]
                    ),
                  ]),
                ]),
                _vm._v(" "),
                _vm.$store.getters.getSettings.facebook_oauth_client_id ||
                (_vm.$store.getters.getSettings.enableGoogleLogin &&
                  _vm.$store.getters.getSettings.google_oauth_client_id)
                  ? _c("div", { staticClass: "justify-center mt-2" }, [
                      _c("div", { staticClass: "divider divider__small" }, [
                        _c("strong", { staticClass: "divider__text" }, [
                          _vm._v(" " + _vm._s(_vm.$t("Or")) + " "),
                        ]),
                      ]),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.$store.getters.getSettings.enableGoogleLogin
                  ? _c(
                      "v-row",
                      { staticClass: "text-center" },
                      [
                        _c("v-col", [
                          _c("div", { staticClass: "justify-center" }, [
                            _vm.$store.getters.getSettings
                              .google_oauth_client_id
                              ? _c("div", {
                                  staticClass: "g-signin2 px-2",
                                  attrs: { "data-onsuccess": "onSignIn" },
                                })
                              : _vm._e(),
                          ]),
                        ]),
                      ],
                      1
                    )
                  : _vm._e(),
                _vm._v(" "),
                _c("div", { staticClass: "divider wide-divider" }),
                _vm._v(" "),
                !_vm.$store.getters.getSettings.disableRegistration
                  ? _c("div", [
                      _c("div", [
                        _c("div", { staticClass: "bold text-center" }, [
                          _c("h3", [
                            _vm._v(
                              _vm._s(_vm.$t("You do not have an account yet?"))
                            ),
                          ]),
                        ]),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "signup-button-con text-center mt-4" },
                          [
                            _c(
                              "v-btn",
                              {
                                attrs: { color: "primary", outlined: "" },
                                on: {
                                  click: function ($event) {
                                    return _vm.$router.push({
                                      name: "register",
                                    })
                                  },
                                },
                              },
                              [_vm._v(_vm._s(_vm.$t("Open New Account")))]
                            ),
                          ],
                          1
                        ),
                      ]),
                    ])
                  : _vm._e(),
              ],
              1
            ),
          ],
          1
        ),
      ])
    : _c("LoadingBackground")
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/authentication/Register.vue?vue&type=template&id=31b792ff&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/authentication/Register.vue?vue&type=template&id=31b792ff& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************/
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
  return _c("authentification-template", [
    _c(
      "div",
      { staticClass: "register-wrapper" },
      [
        _c("div", { staticClass: "auth-box__title" }, [
          _c("h2", [_vm._v(_vm._s(_vm.$t("Create An Account")))]),
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "error-message-container" },
          [
            _vm.error && !_vm.success
              ? _c(
                  "v-alert",
                  {
                    staticClass: "ma-2",
                    attrs: { type: "error", "text-color": "white", dense: "" },
                  },
                  [_vm._v("\n        " + _vm._s(_vm.error) + "\n      ")]
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.success
              ? _c(
                  "v-alert",
                  {
                    staticClass: "ma-2",
                    attrs: {
                      icon: "$vuetify.icons.checkbox-marked-circle-outline",
                      dense: "",
                      type: "success",
                      "text-color": "white",
                    },
                  },
                  [_vm._v("\n        " + _vm._s(_vm.success) + "\n      ")]
                )
              : _vm._e(),
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "v-container",
          [
            _c(
              "v-row",
              [
                _c(
                  "v-col",
                  { staticClass: "auth-box__inputs", attrs: { cols: "12" } },
                  [
                    _c("v-text-field", {
                      attrs: {
                        rules: [_vm.rules.required],
                        label: _vm.$t("Name"),
                        outlined: "",
                      },
                      model: {
                        value: _vm.name,
                        callback: function ($$v) {
                          _vm.name = $$v
                        },
                        expression: "name",
                      },
                    }),
                    _vm._v(" "),
                    _c("v-text-field", {
                      attrs: {
                        rules: [_vm.rules.required],
                        label: _vm.$t("Email"),
                        outlined: "",
                      },
                      model: {
                        value: _vm.email,
                        callback: function ($$v) {
                          _vm.email = $$v
                        },
                        expression: "email",
                      },
                    }),
                    _vm._v(" "),
                    _c("v-text-field", {
                      staticClass: "input-group--focused",
                      attrs: {
                        rules: [_vm.rules.required, _vm.rules.min],
                        type: _vm.showPassword1 ? "text" : "password",
                        name: "input-10-2",
                        label: _vm.$t("Password"),
                        hint: _vm.$t("At least 8 characters"),
                        outlined: "",
                      },
                      on: {
                        "click:append": function ($event) {
                          _vm.showPassword1 = !_vm.showPassword1
                        },
                      },
                      scopedSlots: _vm._u([
                        {
                          key: "append",
                          fn: function () {
                            return [
                              _vm.showPassword1
                                ? _c("v-icon", [
                                    _vm._v(
                                      "\n                $vuetify.icons.eye-outline\n              "
                                    ),
                                  ])
                                : _c("v-icon", [
                                    _vm._v(" $vuetify.icons.eye-outline-off "),
                                  ]),
                            ]
                          },
                          proxy: true,
                        },
                      ]),
                      model: {
                        value: _vm.password1,
                        callback: function ($$v) {
                          _vm.password1 = $$v
                        },
                        expression: "password1",
                      },
                    }),
                    _vm._v(" "),
                    _c("v-text-field", {
                      staticClass: "input-group--focused",
                      attrs: {
                        "append-icon": _vm.showPassword2
                          ? "$vuetify.icons.eye-outline"
                          : "$vuetify.icons.eye-outline-off",
                        rules: [_vm.rules.required],
                        type: _vm.showPassword2 ? "text" : "password",
                        name: "input-10-2",
                        label: _vm.$t("Confirm Password"),
                        outlined: "",
                      },
                      on: {
                        paste: function ($event) {
                          $event.preventDefault()
                        },
                        "click:append": function ($event) {
                          _vm.showPassword2 = !_vm.showPassword2
                        },
                      },
                      model: {
                        value: _vm.password2,
                        callback: function ($$v) {
                          _vm.password2 = $$v
                        },
                        expression: "password2",
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
              "v-row",
              { staticClass: "py-3", attrs: { align: "center" } },
              [
                _c(
                  "v-col",
                  { attrs: { cols: "12" } },
                  [
                    _c(
                      "v-btn",
                      {
                        attrs: {
                          block: "",
                          loading: _vm.loading,
                          color: "primary",
                          disabled: Boolean(_vm.loading || _vm.success),
                        },
                        on: { click: _vm.register },
                        scopedSlots: _vm._u([
                          {
                            key: "loader",
                            fn: function () {
                              return [
                                _c(
                                  "span",
                                  { staticClass: "custom-loader" },
                                  [
                                    _c("v-icon", [
                                      _vm._v("$vuetify.icons.cached"),
                                    ]),
                                  ],
                                  1
                                ),
                              ]
                            },
                            proxy: true,
                          },
                        ]),
                      },
                      [
                        _vm._v(
                          "\n            " +
                            _vm._s(_vm.$t("Register")) +
                            "\n            "
                        ),
                      ]
                    ),
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
                        attrs: {
                          block: "",
                          loading: _vm.loading,
                          color: "secondary",
                          disabled: Boolean(_vm.loading || _vm.success),
                        },
                        on: {
                          click: function ($event) {
                            return _vm.$router.push({
                              name: "register_compositor",
                            })
                          },
                        },
                        scopedSlots: _vm._u([
                          {
                            key: "loader",
                            fn: function () {
                              return [
                                _c(
                                  "span",
                                  { staticClass: "custom-loader" },
                                  [
                                    _c("v-icon", [
                                      _vm._v("$vuetify.icons.cached"),
                                    ]),
                                  ],
                                  1
                                ),
                              ]
                            },
                            proxy: true,
                          },
                        ]),
                      },
                      [
                        _vm._v(
                          "\n            " +
                            _vm._s(_vm.$t("Criar Conta Compositor(a)")) +
                            "\n            "
                        ),
                      ]
                    ),
                  ],
                  1
                ),
              ],
              1
            ),
            _vm._v(" "),
            _vm.$store.getters.getSettings.facebook_oauth_client_id ||
            _vm.$store.getters.getSettings.facebook_oauth_client_id
              ? _c("div", { staticClass: "center-content" }, [
                  _c("div", { staticClass: "divider divider__small" }, [
                    _c("strong", { staticClass: "divider__text" }, [
                      _vm._v(" " + _vm._s(_vm.$t("Or")) + " "),
                    ]),
                  ]),
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.$store.getters.getSettings.facebook_oauth_client_id ||
            _vm.$store.getters.getSettings.facebook_oauth_client_id
              ? _c(
                  "v-row",
                  { staticClass: "text-center" },
                  [
                    _c("v-col", [
                      _c(
                        "div",
                        { staticClass: "justify-center" },
                        [
                          _vm.$store.getters.getSettings
                            .facebook_oauth_client_id
                            ? _c("v-facebook-login-scope", {
                                attrs: {
                                  "app-id":
                                    _vm.$store.getters.getSettings
                                      .facebook_oauth_client_id,
                                },
                                on: {
                                  login: function ($event) {
                                    return _vm.logInWithFacebook($event)
                                  },
                                  "sdk-init": _vm.handleSdkInit,
                                },
                                scopedSlots: _vm._u(
                                  [
                                    {
                                      key: "default",
                                      fn: function (scope) {
                                        return _c(
                                          "v-btn",
                                          {
                                            staticClass: "px-2",
                                            attrs: {
                                              color: "#3578E5",
                                              dark: "",
                                            },
                                            on: { click: scope.login },
                                          },
                                          [
                                            _c(
                                              "v-icon",
                                              { attrs: { left: "" } },
                                              [
                                                _vm._v(
                                                  "$vuetify.icons.facebook"
                                                ),
                                              ]
                                            ),
                                            _vm._v(
                                              "\n                " +
                                                _vm._s(_vm.$t("Sign In")) +
                                                "\n              "
                                            ),
                                          ],
                                          1
                                        )
                                      },
                                    },
                                  ],
                                  null,
                                  false,
                                  1370040071
                                ),
                              })
                            : _vm._e(),
                          _vm._v(" "),
                          _vm.$store.getters.getSettings
                            .facebook_oauth_client_id
                            ? _c("div", {
                                staticClass: "g-signin2 px-2",
                                attrs: { "data-onsuccess": "onSignIn" },
                              })
                            : _vm._e(),
                        ],
                        1
                      ),
                    ]),
                  ],
                  1
                )
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "divider wide-divider" }),
            _vm._v(" "),
            _c("div", [
              _c("div", [
                _c("div", { staticClass: "bold text-center" }, [
                  _c("h3", [
                    _vm._v(_vm._s(_vm.$t("Already have an account?"))),
                  ]),
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "signup-button-con text-center mt-4" },
                  [
                    _c(
                      "v-btn",
                      {
                        attrs: {
                          color: _vm.success ? "success" : "primary",
                          outlined: !_vm.success,
                        },
                        on: {
                          click: function ($event) {
                            return _vm.$router.push({ name: "login" })
                          },
                        },
                      },
                      [_vm._v(_vm._s(_vm.$t("Login to your account")))]
                    ),
                  ],
                  1
                ),
              ]),
            ]),
            _vm._v(" "),
            _vm.$store.getters.getSettings.account_agreement
              ? [
                  _c("div", { staticClass: "divider wide-divider" }),
                  _vm._v(" "),
                  _c("div", {
                    staticClass: "agreement text-center",
                    domProps: {
                      innerHTML: _vm._s(
                        _vm.$store.getters.getSettings.account_agreement
                      ),
                    },
                  }),
                ]
              : _vm._e(),
          ],
          2
        ),
      ],
      1
    ),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/authentication/RegisterCompositor.vue?vue&type=template&id=7ea541e0&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/authentication/RegisterCompositor.vue?vue&type=template&id=7ea541e0& ***!
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
  return _c("authentificationTemplate", [
    _c(
      "div",
      { staticClass: "register-wrapper" },
      [
        _c("div", { staticClass: "auth-box__title" }, [
          _c("h2", [_vm._v(_vm._s(_vm.$t("Criar uma Conta de Compositor")))]),
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "error-message-container" },
          [
            _vm.error && !_vm.success
              ? _c(
                  "v-alert",
                  {
                    staticClass: "ma-2",
                    attrs: { type: "error", "text-color": "white", dense: "" },
                  },
                  [
                    _vm._v(
                      "\n                " +
                        _vm._s(_vm.error) +
                        "\n            "
                    ),
                  ]
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.success
              ? _c(
                  "v-alert",
                  {
                    staticClass: "ma-2",
                    attrs: {
                      icon: "$vuetify.icons.checkbox-marked-circle-outline",
                      dense: "",
                      type: "success",
                      "text-color": "white",
                    },
                  },
                  [
                    _vm._v(
                      "\n                " +
                        _vm._s(_vm.success) +
                        "\n            "
                    ),
                  ]
                )
              : _vm._e(),
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "v-container",
          [
            _c(
              "v-row",
              [
                _c(
                  "v-col",
                  { attrs: { cols: "6" } },
                  [
                    _c(
                      "v-btn",
                      {
                        attrs: {
                          block: "",
                          loading: _vm.loading,
                          color: "",
                          disabled: Boolean(_vm.loading || _vm.success),
                        },
                        on: {
                          click: function ($event) {
                            return _vm.$router.push({
                              name: "register_compositor_pf",
                            })
                          },
                        },
                        scopedSlots: _vm._u([
                          {
                            key: "loader",
                            fn: function () {
                              return [
                                _c(
                                  "span",
                                  { staticClass: "custom-loader" },
                                  [
                                    _c("v-icon", [
                                      _vm._v("$vuetify.icons.cached"),
                                    ]),
                                  ],
                                  1
                                ),
                              ]
                            },
                            proxy: true,
                          },
                        ]),
                      },
                      [
                        _vm._v(
                          "\n                        " +
                            _vm._s(_vm.$t("Pessoa Física")) +
                            "\n                        "
                        ),
                      ]
                    ),
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "v-col",
                  { attrs: { cols: "6" } },
                  [
                    _c(
                      "v-btn",
                      {
                        attrs: {
                          block: "",
                          loading: _vm.loading,
                          color: "",
                          disabled: Boolean(_vm.loading || _vm.success),
                        },
                        on: {
                          click: function ($event) {
                            return _vm.$router.push({
                              name: "register_compositor_pj",
                            })
                          },
                        },
                        scopedSlots: _vm._u([
                          {
                            key: "loader",
                            fn: function () {
                              return [
                                _c(
                                  "span",
                                  { staticClass: "custom-loader" },
                                  [
                                    _c("v-icon", [
                                      _vm._v("$vuetify.icons.cached"),
                                    ]),
                                  ],
                                  1
                                ),
                              ]
                            },
                            proxy: true,
                          },
                        ]),
                      },
                      [
                        _vm._v(
                          "\n                        " +
                            _vm._s(_vm.$t("Pessoa Juridica")) +
                            "\n                        "
                        ),
                      ]
                    ),
                  ],
                  1
                ),
              ],
              1
            ),
            _vm._v(" "),
            _c("div", { staticClass: "divider wide-divider" }),
            _vm._v(" "),
            _c("div", [
              _c("div", [
                _c("div", { staticClass: "bold text-center" }, [
                  _c("h3", [
                    _vm._v(_vm._s(_vm.$t("Already have an account?"))),
                  ]),
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "signup-button-con text-center mt-4" },
                  [
                    _c(
                      "v-btn",
                      {
                        attrs: {
                          color: _vm.success ? "success" : "primary",
                          outlined: !_vm.success,
                        },
                        on: {
                          click: function ($event) {
                            return _vm.$router.push({ name: "login" })
                          },
                        },
                      },
                      [_vm._v(_vm._s(_vm.$t("Login to your account")))]
                    ),
                  ],
                  1
                ),
              ]),
            ]),
          ],
          1
        ),
      ],
      1
    ),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/authentication/RegisterCompositorPf.vue?vue&type=template&id=b940c214&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/authentication/RegisterCompositorPf.vue?vue&type=template&id=b940c214& ***!
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
  return _c("authentificationTemplate", [
    _c(
      "div",
      { staticClass: "register-wrapper" },
      [
        _c("div", { staticClass: "auth-box__title" }, [
          _c("h2", [
            _vm._v(_vm._s(_vm.$t("Registrar Compositor(a) - Pessoa Fisíca"))),
          ]),
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "error-message-container" },
          [
            _vm.error && !_vm.success
              ? _c(
                  "v-alert",
                  {
                    staticClass: "ma-2",
                    attrs: { type: "error", "text-color": "white", dense: "" },
                  },
                  [
                    _vm._v(
                      "\n                " +
                        _vm._s(_vm.error) +
                        "\n            "
                    ),
                  ]
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.success
              ? _c(
                  "v-alert",
                  {
                    staticClass: "ma-2",
                    attrs: {
                      icon: "$vuetify.icons.checkbox-marked-circle-outline",
                      dense: "",
                      type: "success",
                      "text-color": "white",
                    },
                  },
                  [
                    _vm._v(
                      "\n                " +
                        _vm._s(_vm.success) +
                        "\n            "
                    ),
                  ]
                )
              : _vm._e(),
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "v-container",
          [
            _c(
              "v-row",
              [
                _c(
                  "v-col",
                  { staticClass: "auth-box__inputs", attrs: { cols: "12" } },
                  [
                    _c(
                      "v-row",
                      [
                        _c(
                          "v-col",
                          { attrs: { cols: "6" } },
                          [
                            _c("v-text-field", {
                              attrs: {
                                rules: [_vm.rules.required],
                                label: _vm.$t("Name"),
                                outlined: "",
                              },
                              model: {
                                value: _vm.name,
                                callback: function ($$v) {
                                  _vm.name = $$v
                                },
                                expression: "name",
                              },
                            }),
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "v-col",
                          { attrs: { cols: "6" } },
                          [
                            _c("v-text-field", {
                              attrs: {
                                rules: [_vm.rules.required],
                                label: _vm.$t("Nome Artistico"),
                                outlined: "",
                              },
                              model: {
                                value: _vm.nameArtistico,
                                callback: function ($$v) {
                                  _vm.nameArtistico = $$v
                                },
                                expression: "nameArtistico",
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
                      "v-row",
                      [
                        _c(
                          "v-col",
                          { attrs: { cols: "4" } },
                          [
                            _c("v-text-field", {
                              attrs: {
                                rules: [_vm.rules.required],
                                label: _vm.$t("RG"),
                                outlined: "",
                              },
                              model: {
                                value: _vm.rg,
                                callback: function ($$v) {
                                  _vm.rg = $$v
                                },
                                expression: "rg",
                              },
                            }),
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "v-col",
                          { attrs: { cols: "4" } },
                          [
                            _c("v-text-field", {
                              attrs: {
                                rules: [_vm.rules.required],
                                label: _vm.$t("CPF"),
                                outlined: "",
                              },
                              model: {
                                value: _vm.cpf,
                                callback: function ($$v) {
                                  _vm.cpf = $$v
                                },
                                expression: "cpf",
                              },
                            }),
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "v-col",
                          { attrs: { cols: "4" } },
                          [
                            _c("v-text-field", {
                              attrs: {
                                rules: [_vm.rules.required],
                                label: _vm.$t("Nascimento"),
                                outlined: "",
                              },
                              model: {
                                value: _vm.nascimento,
                                callback: function ($$v) {
                                  _vm.nascimento = $$v
                                },
                                expression: "nascimento",
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
                      "v-row",
                      [
                        _c(
                          "v-col",
                          { attrs: { cols: "6" } },
                          [
                            _c("v-text-field", {
                              attrs: {
                                rules: [_vm.rules.required],
                                label: _vm.$t("Nacionalidade"),
                                outlined: "",
                              },
                              model: {
                                value: _vm.nacionalidade,
                                callback: function ($$v) {
                                  _vm.nacionalidade = $$v
                                },
                                expression: "nacionalidade",
                              },
                            }),
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "v-col",
                          { attrs: { cols: "6" } },
                          [
                            _c("v-text-field", {
                              attrs: {
                                rules: [_vm.rules.required],
                                label: _vm.$t("Nome da mãe"),
                                outlined: "",
                              },
                              model: {
                                value: _vm.nome_mae,
                                callback: function ($$v) {
                                  _vm.nome_mae = $$v
                                },
                                expression: "nome_mae",
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
                      "v-row",
                      [
                        _c(
                          "v-col",
                          { attrs: { cols: "6" } },
                          [
                            _c("v-text-field", {
                              attrs: {
                                rules: [_vm.rules.required],
                                label: _vm.$t("Nome do pai"),
                                outlined: "",
                              },
                              model: {
                                value: _vm.nome_pai,
                                callback: function ($$v) {
                                  _vm.nome_pai = $$v
                                },
                                expression: "nome_pai",
                              },
                            }),
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "v-col",
                          { attrs: { cols: "6" } },
                          [
                            _c("v-text-field", {
                              attrs: {
                                rules: [_vm.rules.required],
                                label: _vm.$t("Estado Civil"),
                                outlined: "",
                              },
                              model: {
                                value: _vm.estado_civil,
                                callback: function ($$v) {
                                  _vm.estado_civil = $$v
                                },
                                expression: "estado_civil",
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
                      "v-row",
                      [
                        _c(
                          "v-col",
                          { attrs: { cols: "6" } },
                          [
                            _c("v-text-field", {
                              attrs: {
                                rules: [_vm.rules.required],
                                label: _vm.$t("Nome do Conjugue"),
                                outlined: "",
                              },
                              model: {
                                value: _vm.nome_conjugue,
                                callback: function ($$v) {
                                  _vm.nome_conjugue = $$v
                                },
                                expression: "nome_conjugue",
                              },
                            }),
                          ],
                          1
                        ),
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "divider wide-divider" }),
                    _vm._v(" "),
                    _c("div", { staticClass: "bold text-center" }, [
                      _c("h3", [
                        _vm._v(_vm._s(_vm.$t("Already have an account?"))),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("v-text-field", {
                      attrs: {
                        rules: [_vm.rules.required],
                        label: _vm.$t("Email"),
                        outlined: "",
                      },
                      model: {
                        value: _vm.email,
                        callback: function ($$v) {
                          _vm.email = $$v
                        },
                        expression: "email",
                      },
                    }),
                    _vm._v(" "),
                    _c("v-text-field", {
                      staticClass: "input-group--focused",
                      attrs: {
                        rules: [_vm.rules.required, _vm.rules.min],
                        type: _vm.showPassword1 ? "text" : "password",
                        name: "input-10-2",
                        label: _vm.$t("Password"),
                        hint: _vm.$t("At least 8 characters"),
                        outlined: "",
                      },
                      on: {
                        "click:append": function ($event) {
                          _vm.showPassword1 = !_vm.showPassword1
                        },
                      },
                      scopedSlots: _vm._u([
                        {
                          key: "append",
                          fn: function () {
                            return [
                              _vm.showPassword1
                                ? _c("v-icon", [
                                    _vm._v(
                                      "\n                                $vuetify.icons.eye-outline\n                            "
                                    ),
                                  ])
                                : _c("v-icon", [
                                    _vm._v(" $vuetify.icons.eye-outline-off "),
                                  ]),
                            ]
                          },
                          proxy: true,
                        },
                      ]),
                      model: {
                        value: _vm.password1,
                        callback: function ($$v) {
                          _vm.password1 = $$v
                        },
                        expression: "password1",
                      },
                    }),
                    _vm._v(" "),
                    _c("v-text-field", {
                      staticClass: "input-group--focused",
                      attrs: {
                        "append-icon": _vm.showPassword2
                          ? "$vuetify.icons.eye-outline"
                          : "$vuetify.icons.eye-outline-off",
                        rules: [_vm.rules.required],
                        type: _vm.showPassword2 ? "text" : "password",
                        name: "input-10-2",
                        label: _vm.$t("Confirm Password"),
                        outlined: "",
                      },
                      on: {
                        paste: function ($event) {
                          $event.preventDefault()
                        },
                        "click:append": function ($event) {
                          _vm.showPassword2 = !_vm.showPassword2
                        },
                      },
                      model: {
                        value: _vm.password2,
                        callback: function ($$v) {
                          _vm.password2 = $$v
                        },
                        expression: "password2",
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
              "v-row",
              { staticClass: "flex-column-reverse flex-md-row" },
              [
                _c(
                  "v-col",
                  { attrs: { cols: "12", md: "6" } },
                  [
                    _c(
                      "v-btn",
                      {
                        attrs: {
                          block: "",
                          loading: _vm.loading,
                          color: "",
                          disabled: Boolean(_vm.loading || _vm.success),
                        },
                        on: {
                          click: function ($event) {
                            return _vm.$router.push({
                              name: "register_compositor",
                            })
                          },
                        },
                        scopedSlots: _vm._u([
                          {
                            key: "loader",
                            fn: function () {
                              return [
                                _c(
                                  "span",
                                  { staticClass: "custom-loader" },
                                  [
                                    _c("v-icon", [
                                      _vm._v("$vuetify.icons.cached"),
                                    ]),
                                  ],
                                  1
                                ),
                              ]
                            },
                            proxy: true,
                          },
                        ]),
                      },
                      [
                        _vm._v(
                          "\n                        " +
                            _vm._s(_vm.$t("Voltar")) +
                            "\n                        "
                        ),
                      ]
                    ),
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "v-col",
                  { attrs: { cols: "12", md: "6" } },
                  [
                    _c(
                      "v-btn",
                      {
                        attrs: {
                          block: "",
                          loading: _vm.loading,
                          color: "primary",
                          disabled: Boolean(_vm.loading || _vm.success),
                        },
                        on: {
                          click: function ($event) {
                            return _vm.$router.push({
                              name: "register_compositor",
                            })
                          },
                        },
                        scopedSlots: _vm._u([
                          {
                            key: "loader",
                            fn: function () {
                              return [
                                _c(
                                  "span",
                                  { staticClass: "custom-loader" },
                                  [
                                    _c("v-icon", [
                                      _vm._v("$vuetify.icons.cached"),
                                    ]),
                                  ],
                                  1
                                ),
                              ]
                            },
                            proxy: true,
                          },
                        ]),
                      },
                      [
                        _vm._v(
                          "\n                        " +
                            _vm._s(_vm.$t("Registrar")) +
                            "\n                        "
                        ),
                      ]
                    ),
                  ],
                  1
                ),
              ],
              1
            ),
            _vm._v(" "),
            _c("div", { staticClass: "divider wide-divider" }),
            _vm._v(" "),
            _c("div", [
              _c("div", [
                _c("div", { staticClass: "bold text-center" }, [
                  _c("h3", [
                    _vm._v(_vm._s(_vm.$t("Already have an account?"))),
                  ]),
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "signup-button-con text-center mt-4" },
                  [
                    _c(
                      "v-btn",
                      {
                        attrs: {
                          color: _vm.success ? "success" : "primary",
                          outlined: !_vm.success,
                        },
                        on: {
                          click: function ($event) {
                            return _vm.$router.push({ name: "login" })
                          },
                        },
                      },
                      [_vm._v(_vm._s(_vm.$t("Login to your account")))]
                    ),
                  ],
                  1
                ),
              ]),
            ]),
          ],
          1
        ),
      ],
      1
    ),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/authentication/RegisterCompositorPj.vue?vue&type=template&id=b8d0060c&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/authentication/RegisterCompositorPj.vue?vue&type=template&id=b8d0060c& ***!
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
  return _c("authentificationTemplate", [
    _c(
      "div",
      { staticClass: "register-wrapper" },
      [
        _c("div", { staticClass: "auth-box__title" }, [
          _c("h2", [
            _vm._v(_vm._s(_vm.$t("Registrar Compositor(a) - Pessoa Juridica"))),
          ]),
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "error-message-container" },
          [
            _vm.error && !_vm.success
              ? _c(
                  "v-alert",
                  {
                    staticClass: "ma-2",
                    attrs: { type: "error", "text-color": "white", dense: "" },
                  },
                  [
                    _vm._v(
                      "\n                " +
                        _vm._s(_vm.error) +
                        "\n            "
                    ),
                  ]
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.success
              ? _c(
                  "v-alert",
                  {
                    staticClass: "ma-2",
                    attrs: {
                      icon: "$vuetify.icons.checkbox-marked-circle-outline",
                      dense: "",
                      type: "success",
                      "text-color": "white",
                    },
                  },
                  [
                    _vm._v(
                      "\n                " +
                        _vm._s(_vm.success) +
                        "\n            "
                    ),
                  ]
                )
              : _vm._e(),
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "v-container",
          [
            _c(
              "v-row",
              { staticClass: "flex-column-reverse flex-md-row" },
              [
                _c(
                  "v-col",
                  { attrs: { cols: "6" } },
                  [
                    _c(
                      "v-btn",
                      {
                        attrs: {
                          block: "",
                          loading: _vm.loading,
                          color: "",
                          disabled: Boolean(_vm.loading || _vm.success),
                        },
                        on: {
                          click: function ($event) {
                            return _vm.$router.push({
                              name: "register_compositor",
                            })
                          },
                        },
                        scopedSlots: _vm._u([
                          {
                            key: "loader",
                            fn: function () {
                              return [
                                _c(
                                  "span",
                                  { staticClass: "custom-loader" },
                                  [
                                    _c("v-icon", [
                                      _vm._v("$vuetify.icons.cached"),
                                    ]),
                                  ],
                                  1
                                ),
                              ]
                            },
                            proxy: true,
                          },
                        ]),
                      },
                      [
                        _vm._v(
                          "\n                        " +
                            _vm._s(_vm.$t("Voltar")) +
                            "\n                        "
                        ),
                      ]
                    ),
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "v-col",
                  { attrs: { cols: "6" } },
                  [
                    _c(
                      "v-btn",
                      {
                        attrs: {
                          block: "",
                          loading: _vm.loading,
                          color: "primary",
                          disabled: Boolean(_vm.loading || _vm.success),
                        },
                        on: {
                          click: function ($event) {
                            return _vm.$router.push({
                              name: "register_compositor",
                            })
                          },
                        },
                        scopedSlots: _vm._u([
                          {
                            key: "loader",
                            fn: function () {
                              return [
                                _c(
                                  "span",
                                  { staticClass: "custom-loader" },
                                  [
                                    _c("v-icon", [
                                      _vm._v("$vuetify.icons.cached"),
                                    ]),
                                  ],
                                  1
                                ),
                              ]
                            },
                            proxy: true,
                          },
                        ]),
                      },
                      [
                        _vm._v(
                          "\n                        " +
                            _vm._s(_vm.$t("Registrar")) +
                            "\n                        "
                        ),
                      ]
                    ),
                  ],
                  1
                ),
              ],
              1
            ),
            _vm._v(" "),
            _c("div", { staticClass: "divider wide-divider" }),
            _vm._v(" "),
            _c("div", [
              _c("div", [
                _c("div", { staticClass: "bold text-center" }, [
                  _c("h3", [
                    _vm._v(_vm._s(_vm.$t("Already have an account?"))),
                  ]),
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "signup-button-con text-center mt-4" },
                  [
                    _c(
                      "v-btn",
                      {
                        attrs: {
                          color: _vm.success ? "success" : "primary",
                          outlined: !_vm.success,
                        },
                        on: {
                          click: function ($event) {
                            return _vm.$router.push({ name: "login" })
                          },
                        },
                      },
                      [_vm._v(_vm._s(_vm.$t("Login to your account")))]
                    ),
                  ],
                  1
                ),
              ]),
            ]),
          ],
          1
        ),
      ],
      1
    ),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/authentication/ResetPassword.vue?vue&type=template&id=f5c76c44&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/authentication/ResetPassword.vue?vue&type=template&id=f5c76c44& ***!
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
  return _c("authentification-template", [
    _c(
      "div",
      { staticClass: "login-wrapper" },
      [
        _c("div", { staticClass: "auth-box__title" }, [
          _c("h2", [_vm._v(_vm._s(_vm.$t("Reset your password")))]),
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "error-message-container" },
          [
            _vm.error
              ? _c(
                  "v-chip",
                  {
                    staticClass: "ma-2",
                    attrs: { color: "red", label: "", "text-color": "white" },
                  },
                  [
                    _c("v-icon", { attrs: { left: "" } }, [
                      _vm._v("$vuetify.icons.alert"),
                    ]),
                    _vm._v(
                      "\n                " +
                        _vm._s(_vm.error) +
                        "\n            "
                    ),
                  ],
                  1
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.success
              ? _c(
                  "v-chip",
                  {
                    staticClass: "ma-2",
                    attrs: {
                      color: "success",
                      label: "",
                      "text-color": "white",
                    },
                  },
                  [
                    _c("v-icon", { attrs: { left: "" } }, [
                      _vm._v("$vuetify.icons.checkmark"),
                    ]),
                    _vm._v(
                      "\n                " +
                        _vm._s(_vm.success) +
                        "\n            "
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
          "v-container",
          [
            _c(
              "v-row",
              [
                _c(
                  "v-col",
                  { staticClass: "auth-box__inputs", attrs: { cols: "12" } },
                  [
                    _c("v-text-field", {
                      attrs: {
                        light: "",
                        label: _vm.$t("Email"),
                        outlined: "",
                      },
                      model: {
                        value: _vm.email,
                        callback: function ($$v) {
                          _vm.email = $$v
                        },
                        expression: "email",
                      },
                    }),
                    _vm._v(" "),
                    _c("v-text-field", {
                      attrs: {
                        type: "password",
                        light: "",
                        label: _vm.$t("New Password"),
                        outlined: "",
                      },
                      model: {
                        value: _vm.password,
                        callback: function ($$v) {
                          _vm.password = $$v
                        },
                        expression: "password",
                      },
                    }),
                    _vm._v(" "),
                    _c("v-text-field", {
                      attrs: {
                        type: "password",
                        light: "",
                        label: _vm.$t("Confirm Password"),
                        outlined: "",
                      },
                      model: {
                        value: _vm.password_confirmation,
                        callback: function ($$v) {
                          _vm.password_confirmation = $$v
                        },
                        expression: "password_confirmation",
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
                        attrs: {
                          block: "",
                          loading: _vm.loading,
                          color: "primary",
                          disabled: _vm.loading,
                        },
                        on: { click: _vm.resetPassword },
                        scopedSlots: _vm._u([
                          {
                            key: "loader",
                            fn: function () {
                              return [
                                _c(
                                  "span",
                                  { staticClass: "custom-loader" },
                                  [
                                    _c("v-icon", { attrs: { light: "" } }, [
                                      _vm._v("$vuetify.icons.cached"),
                                    ]),
                                  ],
                                  1
                                ),
                              ]
                            },
                            proxy: true,
                          },
                        ]),
                      },
                      [
                        _vm._v(
                          "\n                        " +
                            _vm._s(_vm.$t("Reset")) +
                            "\n                        "
                        ),
                      ]
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
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/templates/Authentication.vue?vue&type=template&id=e10eaf0e&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/templates/Authentication.vue?vue&type=template&id=e10eaf0e& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "auth-page-wrapper" }, [
    _c(
      "div",
      { staticClass: "white-layer" },
      [
        _c(
          "v-card",
          { staticClass: "auth-box", attrs: { elevation: "8" } },
          [
            _c("div", { staticClass: "align-justify-center" }, [
              _c(
                "a",
                { staticClass: "logo-img-container", attrs: { href: "/" } },
                [
                  _c("img", {
                    attrs: {
                      src: "/images/favicon/logo.png",
                      alt: _vm.$t("Logo Image"),
                    },
                  }),
                ]
              ),
            ]),
            _vm._v(" "),
            _vm._t("default"),
          ],
          2
        ),
      ],
      1
    ),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/LoadingBackground.vue":
/*!*******************************************************!*\
  !*** ./resources/js/components/LoadingBackground.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _LoadingBackground_vue_vue_type_template_id_c67ca0a2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LoadingBackground.vue?vue&type=template&id=c67ca0a2& */ "./resources/js/components/LoadingBackground.vue?vue&type=template&id=c67ca0a2&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");

var script = {}


/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  script,
  _LoadingBackground_vue_vue_type_template_id_c67ca0a2___WEBPACK_IMPORTED_MODULE_0__["render"],
  _LoadingBackground_vue_vue_type_template_id_c67ca0a2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/LoadingBackground.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/LoadingBackground.vue?vue&type=template&id=c67ca0a2&":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/LoadingBackground.vue?vue&type=template&id=c67ca0a2& ***!
  \**************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LoadingBackground_vue_vue_type_template_id_c67ca0a2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../node_modules/vue-loader/lib??vue-loader-options!./LoadingBackground.vue?vue&type=template&id=c67ca0a2& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/LoadingBackground.vue?vue&type=template&id=c67ca0a2&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LoadingBackground_vue_vue_type_template_id_c67ca0a2___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LoadingBackground_vue_vue_type_template_id_c67ca0a2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/authentication/ForgotPassword.vue":
/*!*******************************************************************!*\
  !*** ./resources/js/components/authentication/ForgotPassword.vue ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ForgotPassword_vue_vue_type_template_id_70967aba___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ForgotPassword.vue?vue&type=template&id=70967aba& */ "./resources/js/components/authentication/ForgotPassword.vue?vue&type=template&id=70967aba&");
/* harmony import */ var _ForgotPassword_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ForgotPassword.vue?vue&type=script&lang=js& */ "./resources/js/components/authentication/ForgotPassword.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ "./node_modules/vuetify/lib/components/VBtn/index.js");
/* harmony import */ var vuetify_lib_components_VChip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VChip */ "./node_modules/vuetify/lib/components/VChip/index.js");
/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ "./node_modules/vuetify/lib/components/VGrid/index.js");
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/index.js");
/* harmony import */ var vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VTextField */ "./node_modules/vuetify/lib/components/VTextField/index.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ForgotPassword_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ForgotPassword_vue_vue_type_template_id_70967aba___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ForgotPassword_vue_vue_type_template_id_70967aba___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* vuetify-loader */








_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default()(component, {VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__["VBtn"],VChip: vuetify_lib_components_VChip__WEBPACK_IMPORTED_MODULE_5__["VChip"],VCol: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__["VCol"],VContainer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__["VContainer"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_7__["VIcon"],VRow: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__["VRow"],VTextField: vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_8__["VTextField"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/authentication/ForgotPassword.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/authentication/ForgotPassword.vue?vue&type=script&lang=js&":
/*!********************************************************************************************!*\
  !*** ./resources/js/components/authentication/ForgotPassword.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ForgotPassword_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ForgotPassword.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/authentication/ForgotPassword.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ForgotPassword_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/authentication/ForgotPassword.vue?vue&type=template&id=70967aba&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/components/authentication/ForgotPassword.vue?vue&type=template&id=70967aba& ***!
  \**************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ForgotPassword_vue_vue_type_template_id_70967aba___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ForgotPassword.vue?vue&type=template&id=70967aba& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/authentication/ForgotPassword.vue?vue&type=template&id=70967aba&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ForgotPassword_vue_vue_type_template_id_70967aba___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ForgotPassword_vue_vue_type_template_id_70967aba___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/authentication/Login.vue":
/*!**********************************************************!*\
  !*** ./resources/js/components/authentication/Login.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Login_vue_vue_type_template_id_093970bd___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Login.vue?vue&type=template&id=093970bd& */ "./resources/js/components/authentication/Login.vue?vue&type=template&id=093970bd&");
/* harmony import */ var _Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Login.vue?vue&type=script&lang=js& */ "./resources/js/components/authentication/Login.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ "./node_modules/vuetify/lib/components/VBtn/index.js");
/* harmony import */ var vuetify_lib_components_VChip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VChip */ "./node_modules/vuetify/lib/components/VChip/index.js");
/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ "./node_modules/vuetify/lib/components/VGrid/index.js");
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/index.js");
/* harmony import */ var vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VTextField */ "./node_modules/vuetify/lib/components/VTextField/index.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Login_vue_vue_type_template_id_093970bd___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Login_vue_vue_type_template_id_093970bd___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* vuetify-loader */








_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default()(component, {VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__["VBtn"],VChip: vuetify_lib_components_VChip__WEBPACK_IMPORTED_MODULE_5__["VChip"],VCol: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__["VCol"],VContainer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__["VContainer"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_7__["VIcon"],VRow: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__["VRow"],VTextField: vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_8__["VTextField"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/authentication/Login.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/authentication/Login.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/authentication/Login.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Login.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/authentication/Login.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/authentication/Login.vue?vue&type=template&id=093970bd&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/authentication/Login.vue?vue&type=template&id=093970bd& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_093970bd___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Login.vue?vue&type=template&id=093970bd& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/authentication/Login.vue?vue&type=template&id=093970bd&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_093970bd___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_093970bd___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/authentication/Register.vue":
/*!*************************************************************!*\
  !*** ./resources/js/components/authentication/Register.vue ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Register_vue_vue_type_template_id_31b792ff___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Register.vue?vue&type=template&id=31b792ff& */ "./resources/js/components/authentication/Register.vue?vue&type=template&id=31b792ff&");
/* harmony import */ var _Register_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Register.vue?vue&type=script&lang=js& */ "./resources/js/components/authentication/Register.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vuetify_lib_components_VAlert__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify/lib/components/VAlert */ "./node_modules/vuetify/lib/components/VAlert/index.js");
/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ "./node_modules/vuetify/lib/components/VBtn/index.js");
/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ "./node_modules/vuetify/lib/components/VGrid/index.js");
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/index.js");
/* harmony import */ var vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VTextField */ "./node_modules/vuetify/lib/components/VTextField/index.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Register_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Register_vue_vue_type_template_id_31b792ff___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Register_vue_vue_type_template_id_31b792ff___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* vuetify-loader */








_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default()(component, {VAlert: vuetify_lib_components_VAlert__WEBPACK_IMPORTED_MODULE_4__["VAlert"],VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_5__["VBtn"],VCol: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__["VCol"],VContainer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__["VContainer"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_7__["VIcon"],VRow: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__["VRow"],VTextField: vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_8__["VTextField"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/authentication/Register.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/authentication/Register.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/authentication/Register.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Register.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/authentication/Register.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/authentication/Register.vue?vue&type=template&id=31b792ff&":
/*!********************************************************************************************!*\
  !*** ./resources/js/components/authentication/Register.vue?vue&type=template&id=31b792ff& ***!
  \********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_template_id_31b792ff___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Register.vue?vue&type=template&id=31b792ff& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/authentication/Register.vue?vue&type=template&id=31b792ff&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_template_id_31b792ff___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_template_id_31b792ff___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/authentication/RegisterCompositor.vue":
/*!***********************************************************************!*\
  !*** ./resources/js/components/authentication/RegisterCompositor.vue ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RegisterCompositor_vue_vue_type_template_id_7ea541e0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RegisterCompositor.vue?vue&type=template&id=7ea541e0& */ "./resources/js/components/authentication/RegisterCompositor.vue?vue&type=template&id=7ea541e0&");
/* harmony import */ var _RegisterCompositor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RegisterCompositor.vue?vue&type=script&lang=js& */ "./resources/js/components/authentication/RegisterCompositor.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vuetify_lib_components_VAlert__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify/lib/components/VAlert */ "./node_modules/vuetify/lib/components/VAlert/index.js");
/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ "./node_modules/vuetify/lib/components/VBtn/index.js");
/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ "./node_modules/vuetify/lib/components/VGrid/index.js");
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/index.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _RegisterCompositor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _RegisterCompositor_vue_vue_type_template_id_7ea541e0___WEBPACK_IMPORTED_MODULE_0__["render"],
  _RegisterCompositor_vue_vue_type_template_id_7ea541e0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* vuetify-loader */







_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default()(component, {VAlert: vuetify_lib_components_VAlert__WEBPACK_IMPORTED_MODULE_4__["VAlert"],VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_5__["VBtn"],VCol: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__["VCol"],VContainer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__["VContainer"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_7__["VIcon"],VRow: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__["VRow"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/authentication/RegisterCompositor.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/authentication/RegisterCompositor.vue?vue&type=script&lang=js&":
/*!************************************************************************************************!*\
  !*** ./resources/js/components/authentication/RegisterCompositor.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RegisterCompositor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./RegisterCompositor.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/authentication/RegisterCompositor.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RegisterCompositor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/authentication/RegisterCompositor.vue?vue&type=template&id=7ea541e0&":
/*!******************************************************************************************************!*\
  !*** ./resources/js/components/authentication/RegisterCompositor.vue?vue&type=template&id=7ea541e0& ***!
  \******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RegisterCompositor_vue_vue_type_template_id_7ea541e0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./RegisterCompositor.vue?vue&type=template&id=7ea541e0& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/authentication/RegisterCompositor.vue?vue&type=template&id=7ea541e0&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RegisterCompositor_vue_vue_type_template_id_7ea541e0___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RegisterCompositor_vue_vue_type_template_id_7ea541e0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/authentication/RegisterCompositorPf.vue":
/*!*************************************************************************!*\
  !*** ./resources/js/components/authentication/RegisterCompositorPf.vue ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RegisterCompositorPf_vue_vue_type_template_id_b940c214___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RegisterCompositorPf.vue?vue&type=template&id=b940c214& */ "./resources/js/components/authentication/RegisterCompositorPf.vue?vue&type=template&id=b940c214&");
/* harmony import */ var _RegisterCompositorPf_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RegisterCompositorPf.vue?vue&type=script&lang=js& */ "./resources/js/components/authentication/RegisterCompositorPf.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vuetify_lib_components_VAlert__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify/lib/components/VAlert */ "./node_modules/vuetify/lib/components/VAlert/index.js");
/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ "./node_modules/vuetify/lib/components/VBtn/index.js");
/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ "./node_modules/vuetify/lib/components/VGrid/index.js");
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/index.js");
/* harmony import */ var vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VTextField */ "./node_modules/vuetify/lib/components/VTextField/index.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _RegisterCompositorPf_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _RegisterCompositorPf_vue_vue_type_template_id_b940c214___WEBPACK_IMPORTED_MODULE_0__["render"],
  _RegisterCompositorPf_vue_vue_type_template_id_b940c214___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* vuetify-loader */








_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default()(component, {VAlert: vuetify_lib_components_VAlert__WEBPACK_IMPORTED_MODULE_4__["VAlert"],VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_5__["VBtn"],VCol: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__["VCol"],VContainer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__["VContainer"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_7__["VIcon"],VRow: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__["VRow"],VTextField: vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_8__["VTextField"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/authentication/RegisterCompositorPf.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/authentication/RegisterCompositorPf.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/components/authentication/RegisterCompositorPf.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RegisterCompositorPf_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./RegisterCompositorPf.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/authentication/RegisterCompositorPf.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RegisterCompositorPf_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/authentication/RegisterCompositorPf.vue?vue&type=template&id=b940c214&":
/*!********************************************************************************************************!*\
  !*** ./resources/js/components/authentication/RegisterCompositorPf.vue?vue&type=template&id=b940c214& ***!
  \********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RegisterCompositorPf_vue_vue_type_template_id_b940c214___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./RegisterCompositorPf.vue?vue&type=template&id=b940c214& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/authentication/RegisterCompositorPf.vue?vue&type=template&id=b940c214&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RegisterCompositorPf_vue_vue_type_template_id_b940c214___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RegisterCompositorPf_vue_vue_type_template_id_b940c214___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/authentication/RegisterCompositorPj.vue":
/*!*************************************************************************!*\
  !*** ./resources/js/components/authentication/RegisterCompositorPj.vue ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RegisterCompositorPj_vue_vue_type_template_id_b8d0060c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RegisterCompositorPj.vue?vue&type=template&id=b8d0060c& */ "./resources/js/components/authentication/RegisterCompositorPj.vue?vue&type=template&id=b8d0060c&");
/* harmony import */ var _RegisterCompositorPj_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RegisterCompositorPj.vue?vue&type=script&lang=js& */ "./resources/js/components/authentication/RegisterCompositorPj.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vuetify_lib_components_VAlert__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify/lib/components/VAlert */ "./node_modules/vuetify/lib/components/VAlert/index.js");
/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ "./node_modules/vuetify/lib/components/VBtn/index.js");
/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ "./node_modules/vuetify/lib/components/VGrid/index.js");
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/index.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _RegisterCompositorPj_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _RegisterCompositorPj_vue_vue_type_template_id_b8d0060c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _RegisterCompositorPj_vue_vue_type_template_id_b8d0060c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* vuetify-loader */







_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default()(component, {VAlert: vuetify_lib_components_VAlert__WEBPACK_IMPORTED_MODULE_4__["VAlert"],VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_5__["VBtn"],VCol: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__["VCol"],VContainer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__["VContainer"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_7__["VIcon"],VRow: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__["VRow"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/authentication/RegisterCompositorPj.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/authentication/RegisterCompositorPj.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/components/authentication/RegisterCompositorPj.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RegisterCompositorPj_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./RegisterCompositorPj.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/authentication/RegisterCompositorPj.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RegisterCompositorPj_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/authentication/RegisterCompositorPj.vue?vue&type=template&id=b8d0060c&":
/*!********************************************************************************************************!*\
  !*** ./resources/js/components/authentication/RegisterCompositorPj.vue?vue&type=template&id=b8d0060c& ***!
  \********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RegisterCompositorPj_vue_vue_type_template_id_b8d0060c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./RegisterCompositorPj.vue?vue&type=template&id=b8d0060c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/authentication/RegisterCompositorPj.vue?vue&type=template&id=b8d0060c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RegisterCompositorPj_vue_vue_type_template_id_b8d0060c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RegisterCompositorPj_vue_vue_type_template_id_b8d0060c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/authentication/ResetPassword.vue":
/*!******************************************************************!*\
  !*** ./resources/js/components/authentication/ResetPassword.vue ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ResetPassword_vue_vue_type_template_id_f5c76c44___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ResetPassword.vue?vue&type=template&id=f5c76c44& */ "./resources/js/components/authentication/ResetPassword.vue?vue&type=template&id=f5c76c44&");
/* harmony import */ var _ResetPassword_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ResetPassword.vue?vue&type=script&lang=js& */ "./resources/js/components/authentication/ResetPassword.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ "./node_modules/vuetify/lib/components/VBtn/index.js");
/* harmony import */ var vuetify_lib_components_VChip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VChip */ "./node_modules/vuetify/lib/components/VChip/index.js");
/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ "./node_modules/vuetify/lib/components/VGrid/index.js");
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/index.js");
/* harmony import */ var vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VTextField */ "./node_modules/vuetify/lib/components/VTextField/index.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ResetPassword_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ResetPassword_vue_vue_type_template_id_f5c76c44___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ResetPassword_vue_vue_type_template_id_f5c76c44___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* vuetify-loader */








_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default()(component, {VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__["VBtn"],VChip: vuetify_lib_components_VChip__WEBPACK_IMPORTED_MODULE_5__["VChip"],VCol: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__["VCol"],VContainer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__["VContainer"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_7__["VIcon"],VRow: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__["VRow"],VTextField: vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_8__["VTextField"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/authentication/ResetPassword.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/authentication/ResetPassword.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/authentication/ResetPassword.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ResetPassword_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ResetPassword.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/authentication/ResetPassword.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ResetPassword_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/authentication/ResetPassword.vue?vue&type=template&id=f5c76c44&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/components/authentication/ResetPassword.vue?vue&type=template&id=f5c76c44& ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ResetPassword_vue_vue_type_template_id_f5c76c44___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ResetPassword.vue?vue&type=template&id=f5c76c44& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/authentication/ResetPassword.vue?vue&type=template&id=f5c76c44&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ResetPassword_vue_vue_type_template_id_f5c76c44___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ResetPassword_vue_vue_type_template_id_f5c76c44___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/templates/Authentication.vue":
/*!**************************************************************!*\
  !*** ./resources/js/components/templates/Authentication.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Authentication_vue_vue_type_template_id_e10eaf0e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Authentication.vue?vue&type=template&id=e10eaf0e& */ "./resources/js/components/templates/Authentication.vue?vue&type=template&id=e10eaf0e&");
/* harmony import */ var _Authentication_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Authentication.vue?vue&type=style&index=0&lang=scss& */ "./resources/js/components/templates/Authentication.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify/lib/components/VCard */ "./node_modules/vuetify/lib/components/VCard/index.js");

var script = {}



/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  script,
  _Authentication_vue_vue_type_template_id_e10eaf0e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Authentication_vue_vue_type_template_id_e10eaf0e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* vuetify-loader */


_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default()(component, {VCard: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_4__["VCard"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/templates/Authentication.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/templates/Authentication.vue?vue&type=style&index=0&lang=scss&":
/*!************************************************************************************************!*\
  !*** ./resources/js/components/templates/Authentication.vue?vue&type=style&index=0&lang=scss& ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Authentication_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--8-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Authentication.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/templates/Authentication.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Authentication_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Authentication_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Authentication_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Authentication_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/components/templates/Authentication.vue?vue&type=template&id=e10eaf0e&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/components/templates/Authentication.vue?vue&type=template&id=e10eaf0e& ***!
  \*********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Authentication_vue_vue_type_template_id_e10eaf0e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Authentication.vue?vue&type=template&id=e10eaf0e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/templates/Authentication.vue?vue&type=template&id=e10eaf0e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Authentication_vue_vue_type_template_id_e10eaf0e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Authentication_vue_vue_type_template_id_e10eaf0e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);