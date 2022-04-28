(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[16],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dialogs/selling/PayPalCheckout.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/dialogs/selling/PayPalCheckout.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_Loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../services/Loader */ "./resources/js/services/Loader.js");
/* harmony import */ var _elements_single_items_PageLoading_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../elements/single-items/PageLoading.vue */ "./resources/js/components/elements/single-items/PageLoading.vue");
/* harmony import */ var _mixins_billing_billing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mixins/billing/billing */ "./resources/js/mixins/billing/billing.js");
//
//
//
//
//
//
//
//
//
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
    PageLoading: _elements_single_items_PageLoading_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  mixins: [_mixins_billing_billing__WEBPACK_IMPORTED_MODULE_2__["default"]],
  props: ["cart"],
  data: function data() {
    return {
      isScriptLoading: true
    };
  },
  mounted: function mounted() {
    var _this = this;

    var self = this;
    var loader = new _services_Loader__WEBPACK_IMPORTED_MODULE_0__["default"]();
    loader.loadAsset("https://www.paypal.com/sdk/js?client-id=" + this.$store.getters.getSettings.paypalClientID + "&currency=" + this.defaultCurrency.value, {
      id: "paypal-sdk-script"
    }).then(function () {
      _this.isScriptLoading = false;
      paypal.Buttons({
        style: {
          shape: "rect",
          color: "gold",
          layout: "horizontal",
          label: "paypal"
        },
        createOrder: function createOrder(data, actions) {
          return actions.order.create({
            purchase_units: [{
              amount: {
                currency_code: self.defaultCurrency.value,
                value: self.price(self.cart.total)
              }
            }]
          });
        },
        onApprove: function onApprove(data, actions) {
          return actions.order.capture().then(function (details) {
            axios.post("/api/user/checkout-with-paypal").then(function () {
              self.$emit("successfulPayment");
            }); // This function shows a transaction success message to your buyer.

            alert("Transaction completed by " + details.payer.name.given_name);
          });
        },
        onError: function onError(err) {
          self.$emit("error", err);
        }
      }).render("#paypal-button");
    });
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dialogs/selling/PayPalCheckout.vue?vue&type=template&id=b8440932&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/dialogs/selling/PayPalCheckout.vue?vue&type=template&id=b8440932& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************/
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
    {
      directives: [
        {
          name: "show",
          rawName: "v-show",
          value: !_vm.isScriptLoading,
          expression: "!isScriptLoading",
        },
      ],
      class: { "dark-backround": _vm.$vuetify.theme.dark },
      attrs: { flat: "", light: "" },
    },
    [
      _c(
        "v-card-text",
        [
          _c("div", {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: !_vm.isScriptLoading,
                expression: "!isScriptLoading",
              },
            ],
            attrs: { id: "paypal-button" },
          }),
          _vm._v(" "),
          _c("page-loading", {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.isScriptLoading,
                expression: "isScriptLoading",
              },
            ],
            attrs: { height: "20vh", size: 50, width: 5 },
          }),
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

/***/ "./resources/js/components/dialogs/selling/PayPalCheckout.vue":
/*!********************************************************************!*\
  !*** ./resources/js/components/dialogs/selling/PayPalCheckout.vue ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PayPalCheckout_vue_vue_type_template_id_b8440932___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PayPalCheckout.vue?vue&type=template&id=b8440932& */ "./resources/js/components/dialogs/selling/PayPalCheckout.vue?vue&type=template&id=b8440932&");
/* harmony import */ var _PayPalCheckout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PayPalCheckout.vue?vue&type=script&lang=js& */ "./resources/js/components/dialogs/selling/PayPalCheckout.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify/lib/components/VCard */ "./node_modules/vuetify/lib/components/VCard/index.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _PayPalCheckout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PayPalCheckout_vue_vue_type_template_id_b8440932___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PayPalCheckout_vue_vue_type_template_id_b8440932___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* vuetify-loader */



_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default()(component, {VCard: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_4__["VCard"],VCardText: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_4__["VCardText"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/dialogs/selling/PayPalCheckout.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/dialogs/selling/PayPalCheckout.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/components/dialogs/selling/PayPalCheckout.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PayPalCheckout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./PayPalCheckout.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dialogs/selling/PayPalCheckout.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PayPalCheckout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/dialogs/selling/PayPalCheckout.vue?vue&type=template&id=b8440932&":
/*!***************************************************************************************************!*\
  !*** ./resources/js/components/dialogs/selling/PayPalCheckout.vue?vue&type=template&id=b8440932& ***!
  \***************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PayPalCheckout_vue_vue_type_template_id_b8440932___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./PayPalCheckout.vue?vue&type=template&id=b8440932& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dialogs/selling/PayPalCheckout.vue?vue&type=template&id=b8440932&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PayPalCheckout_vue_vue_type_template_id_b8440932___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PayPalCheckout_vue_vue_type_template_id_b8440932___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);