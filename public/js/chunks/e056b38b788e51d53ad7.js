(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[24],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/EarningDetails.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/artist/EarningDetails.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mixins_billing_billing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mixins/billing/billing */ "./resources/js/mixins/billing/billing.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  props: ['artist'],
  mixins: [_mixins_billing_billing__WEBPACK_IMPORTED_MODULE_0__["default"]],
  computed: {
    totalSalesProfit: function totalSalesProfit() {
      return this.artist.sales.reduce(function (acc, val) {
        return acc + val.amount * val.artist_cut / 100;
      }, 0);
    },
    totalRoyaltiesProfit: function totalRoyaltiesProfit() {
      return this.artist.royalties.reduce(function (acc, val) {
        return acc + val.total_royalties * (val.price / 100);
      }, 0);
    },
    payedPayouts: function payedPayouts() {
      return this.artist.payouts.filter(function (payout) {
        return payout.status === "payed";
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dialogs/admin/edit/Artist.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/dialogs/admin/edit/Artist.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _artist_EarningDetails_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../artist/EarningDetails.vue */ "./resources/js/components/artist/EarningDetails.vue");
/* harmony import */ var _data_coutries__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../data/coutries */ "./resources/js/data/coutries.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  props: ["artist"],
  components: {
    ArtistEarningDetails: _artist_EarningDetails_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      editedArtist: this.artist,
      countriesList: _data_coutries__WEBPACK_IMPORTED_MODULE_1__["default"],
      firstCopy: JSON.parse(JSON.stringify(this.artist)),
      available_disk_space: this.artist.available_disk_space || this.$store.getters.getSettings.availableArtistDiskSpace,
      available_disk_space_unit: "MB",
      isLoading: false,
      defaultAvatarPath: "/storage/defaults/images/artist_avatar.png"
    };
  },
  methods: {
    imageReady: function imageReady(e) {
      this.artist.avatar = e;
    },
    closeWindow: function closeWindow() {
      var _this = this;

      var changed = false;

      if (JSON.stringify(this.editedArtist) != JSON.stringify(this.firstCopy)) {
        changed = true;
      }

      if (changed) {
        this.$confirm({
          message: "".concat(this.$t("Are you sure you wanna quit without saving the changes?")),
          button: {
            no: this.$t("Cancel"),
            yes: this.$t("Discard")
          },
          callback: function callback(confirm) {
            if (confirm) {
              _this.editedArtist = _this.firstCopy;

              _this.$emit("close");
            }
          }
        });
      } else {
        this.$emit("close");
      }
    },
    saveArtist: function saveArtist() {
      var _this2 = this;

      var formData = new FormData();
      this.isLoading = true;
      formData.append("firstname", this.editedArtist.firstname || "");
      formData.append("lastname", this.editedArtist.lastname || "");
      formData.append("displayname", this.editedArtist.displayname || "");
      formData.append("country", this.editedArtist.country || "");
      formData.append("phone", this.editedArtist.phone || "");
      formData.append("email", this.editedArtist.email || "");
      formData.append("address", this.editedArtist.address || "");
      formData.append("spotify_link", this.editedArtist.spotify_link || "");
      formData.append("youtube_link", this.editedArtist.youtube_link || "");
      formData.append("soundcloud_link", this.editedArtist.soundcloud_link || "");
      formData.append("itunes_link", this.editedArtist.itunes_link || "");

      if (this.available_disk_space_unit === "GB") {
        var available_disk_space = this.available_disk_space * 1024;
      } else if (this.available_disk_space_unit === "KB") {
        var available_disk_space = this.available_disk_space / 1024;
      } else {
        var available_disk_space = this.available_disk_space;
      }

      this.editedArtist.available_disk_space = available_disk_space;
      formData.append("available_disk_space", available_disk_space);

      if (this.editedArtist.avatar && this.editedArtist.avatar.data) {
        formData.append("avatar", this.editedArtist.avatar.data, this.editedArtist.avatar.title);
      } else if (this.editedArtist.avatar && !this.editedArtist.avatar.data) {
        // no avatar was picked, the value is stored as a string
        formData.append("avatar", this.editedArtist.avatar);
      } else {
        formData.append("avatar", this.defaultAvatarPath);
      }

      if (this.editedArtist["new"]) {
        axios.post("/api/admin/artists", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }).then(function (res) {
          _this2.$emit("updated");

          _this2.isLoading = false;
        })["catch"](function (e) {
          _this2.isLoading = false;
          _this2.errors = e.response.data.errors; // this.$notify({
          //     group: "foo",
          //     type: "error",
          //     title: this.$t("Error"),
          //     text: Object.values(e.response.data.errors).join(
          //         "<br />"
          //     )
          // });
        });
      } else {
        formData.append("_method", "PUT");
        axios.post("/api/admin/artists/" + this.editedArtist.id, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }).then(function () {
          _this2.$emit("updated");

          _this2.isLoading = false;
        })["catch"](function (e) {
          _this2.isLoading = false;
          _this2.errors = e.response.data.errors; // this.$notify({
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/EarningDetails.vue?vue&type=template&id=5d46bc85&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/artist/EarningDetails.vue?vue&type=template&id=5d46bc85& ***!
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
  return _c(
    "v-card",
    { staticClass: "p-3" },
    [
      _c(
        "v-card-title",
        [
          _c(
            "v-icon",
            { staticClass: "mr-3", attrs: { color: "primary", "x-large": "" } },
            [_vm._v("$vuetify.icons.currency-usd")]
          ),
          _vm._v("\n        " + _vm._s(_vm.$t("Earnings")) + "\n        "),
          _c("v-spacer"),
          _vm._v(" "),
          _c("v-spacer"),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "total-earnings__value price bold success--text" },
            [
              _vm._v(
                "\n            " +
                  _vm._s(
                    _vm.price(_vm.artist.funds) + _vm.defaultCurrency.symbol
                  ) +
                  "\n        "
              ),
            ]
          ),
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-card-text",
        [
          _c("div", { staticClass: "title" }, [
            _vm._v("\n            " + _vm._s(_vm.$t("Details")) + "\n        "),
          ]),
          _vm._v(" "),
          _c("v-divider"),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "details" },
            [
              _c(
                "v-container",
                [
                  _c(
                    "v-row",
                    [
                      _c(
                        "v-col",
                        { attrs: { cols: "12", lg: "6" } },
                        [
                          _c(
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
                                          _c(
                                            "v-card-title",
                                            [
                                              _vm._v(
                                                "\n                                            " +
                                                  _vm._s(_vm.$t("Sales")) +
                                                  "\n                                            "
                                              ),
                                              _c("v-spacer"),
                                              _vm._v(" "),
                                              _c("v-spacer"),
                                              _vm._v(" "),
                                              _c(
                                                "div",
                                                {
                                                  staticClass:
                                                    "total-earnings__value bold price small success--text",
                                                },
                                                [
                                                  _vm._v(
                                                    "\n                                                " +
                                                      _vm._s(
                                                        _vm.price(
                                                          _vm.totalSalesProfit
                                                        ) +
                                                          _vm.defaultCurrency
                                                            .symbol
                                                      ) +
                                                      "\n                                            "
                                                  ),
                                                ]
                                              ),
                                            ],
                                            1
                                          ),
                                          _vm._v(" "),
                                          _c("v-divider"),
                                        ],
                                        1
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "v-col",
                                        { attrs: { cols: "12" } },
                                        [
                                          _c("v-simple-table", {
                                            scopedSlots: _vm._u([
                                              {
                                                key: "default",
                                                fn: function () {
                                                  return [
                                                    _c("thead", [
                                                      _c("tr", [
                                                        _c(
                                                          "th",
                                                          {
                                                            staticClass:
                                                              "text-left",
                                                          },
                                                          [
                                                            _vm._v(
                                                              "\n                                                            " +
                                                                _vm._s(
                                                                  _vm.$t(
                                                                    "Product"
                                                                  )
                                                                ) +
                                                                "\n                                                        "
                                                            ),
                                                          ]
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "th",
                                                          {
                                                            staticClass:
                                                              "text-left",
                                                          },
                                                          [
                                                            _vm._v(
                                                              "\n                                                            " +
                                                                _vm._s(
                                                                  _vm.$t(
                                                                    "License"
                                                                  )
                                                                ) +
                                                                "\n                                                        "
                                                            ),
                                                          ]
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "th",
                                                          {
                                                            staticClass:
                                                              "text-left",
                                                          },
                                                          [
                                                            _vm._v(
                                                              "\n                                                            " +
                                                                _vm._s(
                                                                  _vm.$t(
                                                                    "Price"
                                                                  )
                                                                ) +
                                                                "\n                                                        "
                                                            ),
                                                          ]
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "th",
                                                          {
                                                            staticClass:
                                                              "text-left",
                                                          },
                                                          [
                                                            _vm._v(
                                                              "\n                                                            " +
                                                                _vm._s(
                                                                  _vm.$t(
                                                                    "Earned"
                                                                  )
                                                                ) +
                                                                "\n                                                        "
                                                            ),
                                                          ]
                                                        ),
                                                      ]),
                                                    ]),
                                                    _vm._v(" "),
                                                    _c(
                                                      "tbody",
                                                      _vm._l(
                                                        _vm.artist.sales,
                                                        function (sale, n) {
                                                          return _c(
                                                            "tr",
                                                            { key: n },
                                                            [
                                                              _c(
                                                                "td",
                                                                [
                                                                  _c(
                                                                    "v-list-item",
                                                                    [
                                                                      _c(
                                                                        "v-list-item-avatar",
                                                                        {
                                                                          staticClass:
                                                                            "asset-shadow",
                                                                          attrs:
                                                                            {
                                                                              width:
                                                                                "35",
                                                                              height:
                                                                                "35",
                                                                              rounded:
                                                                                "0",
                                                                            },
                                                                        },
                                                                        [
                                                                          _c(
                                                                            "img",
                                                                            {
                                                                              attrs:
                                                                                {
                                                                                  src: sale.cover,
                                                                                },
                                                                            }
                                                                          ),
                                                                        ]
                                                                      ),
                                                                      _vm._v(
                                                                        " "
                                                                      ),
                                                                      _c(
                                                                        "v-list-item-content",
                                                                        [
                                                                          _c(
                                                                            "v-list-item-title",
                                                                            [
                                                                              _vm._v(
                                                                                _vm._s(
                                                                                  sale.itemTitle
                                                                                )
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
                                                              _vm._v(" "),
                                                              _c(
                                                                "td",
                                                                {
                                                                  staticClass:
                                                                    "text-left",
                                                                },
                                                                [
                                                                  _vm._v(
                                                                    "\n                                                            " +
                                                                      _vm._s(
                                                                        sale.priceName
                                                                      ) +
                                                                      "\n                                                        "
                                                                  ),
                                                                ]
                                                              ),
                                                              _vm._v(" "),
                                                              _c(
                                                                "td",
                                                                {
                                                                  staticClass:
                                                                    "text-left",
                                                                },
                                                                [
                                                                  _c(
                                                                    "div",
                                                                    {
                                                                      staticClass:
                                                                        "price success--text bold",
                                                                    },
                                                                    [
                                                                      _vm._v(
                                                                        "\n                                                                " +
                                                                          _vm._s(
                                                                            _vm.price(
                                                                              sale.amount
                                                                            ) +
                                                                              sale.priceSymbol
                                                                          ) +
                                                                          "\n                                                            "
                                                                      ),
                                                                    ]
                                                                  ),
                                                                ]
                                                              ),
                                                              _vm._v(" "),
                                                              _c(
                                                                "td",
                                                                {
                                                                  staticClass:
                                                                    "text-left",
                                                                },
                                                                [
                                                                  _c(
                                                                    "div",
                                                                    {
                                                                      staticClass:
                                                                        "price success--text bold",
                                                                    },
                                                                    [
                                                                      _vm._v(
                                                                        "\n                                                                " +
                                                                          _vm._s(
                                                                            _vm.price(
                                                                              (sale.amount *
                                                                                sale.artist_cut) /
                                                                                100
                                                                            ) +
                                                                              sale.priceSymbol
                                                                          ) +
                                                                          "\n                                                            "
                                                                      ),
                                                                    ]
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
                                                },
                                                proxy: true,
                                              },
                                            ]),
                                          }),
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
                      _vm._v(" "),
                      _c(
                        "v-col",
                        { attrs: { cols: "12", lg: "6" } },
                        [
                          _c(
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
                                          _c(
                                            "v-card-title",
                                            [
                                              _vm._v(
                                                "\n                                            " +
                                                  _vm._s(_vm.$t("Royalties")) +
                                                  "\n                                            "
                                              ),
                                              _c("v-spacer"),
                                              _vm._v(" "),
                                              _c("v-spacer"),
                                              _vm._v(" "),
                                              _c(
                                                "div",
                                                {
                                                  staticClass:
                                                    "total-earnings__value price small bold success--text",
                                                },
                                                [
                                                  _vm._v(
                                                    "\n                                                " +
                                                      _vm._s(
                                                        _vm.price(
                                                          _vm.totalRoyaltiesProfit
                                                        ) +
                                                          _vm.defaultCurrency
                                                            .symbol
                                                      ) +
                                                      "\n                                            "
                                                  ),
                                                ]
                                              ),
                                            ],
                                            1
                                          ),
                                          _vm._v(" "),
                                          _c("v-divider"),
                                        ],
                                        1
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "v-col",
                                        { attrs: { cols: "12" } },
                                        [
                                          _c("v-simple-table", {
                                            scopedSlots: _vm._u([
                                              {
                                                key: "default",
                                                fn: function () {
                                                  return [
                                                    _c("thead", [
                                                      _c("tr", [
                                                        _c(
                                                          "th",
                                                          {
                                                            staticClass:
                                                              "text-left",
                                                          },
                                                          [
                                                            _vm._v(
                                                              "\n                                                            " +
                                                                _vm._s(
                                                                  _vm.$t(
                                                                    "Total Plays"
                                                                  )
                                                                ) +
                                                                "\n                                                        "
                                                            ),
                                                          ]
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "th",
                                                          {
                                                            staticClass:
                                                              "text-left",
                                                          },
                                                          [
                                                            _vm._v(
                                                              "\n                                                            " +
                                                                _vm._s(
                                                                  _vm.$t(
                                                                    "Artist Royalty"
                                                                  )
                                                                ) +
                                                                "\n                                                        "
                                                            ),
                                                          ]
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "th",
                                                          {
                                                            staticClass:
                                                              "text-left",
                                                          },
                                                          [
                                                            _vm._v(
                                                              "\n                                                            " +
                                                                _vm._s(
                                                                  _vm.$t(
                                                                    "Total"
                                                                  )
                                                                ) +
                                                                "\n                                                        "
                                                            ),
                                                          ]
                                                        ),
                                                      ]),
                                                    ]),
                                                    _vm._v(" "),
                                                    _c(
                                                      "tbody",
                                                      _vm._l(
                                                        _vm.artist.royalties,
                                                        function (
                                                          royaltyGroup,
                                                          i
                                                        ) {
                                                          return _c(
                                                            "tr",
                                                            { key: i },
                                                            [
                                                              _c("td", [
                                                                _vm._v(
                                                                  "\n                                                            " +
                                                                    _vm._s(
                                                                      royaltyGroup.total_royalties
                                                                    ) +
                                                                    "\n                                                        "
                                                                ),
                                                              ]),
                                                              _vm._v(" "),
                                                              _c("td", [
                                                                _vm._v(
                                                                  "\n                                                            " +
                                                                    _vm._s(
                                                                      _vm.price(
                                                                        royaltyGroup.price
                                                                      ) +
                                                                        _vm
                                                                          .defaultCurrency
                                                                          .symbol
                                                                    ) +
                                                                    "\n                                                            " +
                                                                    _vm._s(
                                                                      "(" +
                                                                        _vm.$t(
                                                                          "for each 100 play"
                                                                        ) +
                                                                        ")"
                                                                    ) +
                                                                    "\n                                                        "
                                                                ),
                                                              ]),
                                                              _vm._v(" "),
                                                              _c("td", [
                                                                _c(
                                                                  "div",
                                                                  {
                                                                    staticClass:
                                                                      "price success--text bold",
                                                                  },
                                                                  [
                                                                    _vm._v(
                                                                      "\n                                                                " +
                                                                        _vm._s(
                                                                          _vm.price(
                                                                            royaltyGroup.total_royalties *
                                                                              (royaltyGroup.price /
                                                                                100)
                                                                          ) +
                                                                            _vm
                                                                              .defaultCurrency
                                                                              .symbol
                                                                        ) +
                                                                        "\n                                                            "
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
                                                  ]
                                                },
                                                proxy: true,
                                              },
                                            ]),
                                          }),
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
                      _vm._v(" "),
                      _c(
                        "v-col",
                        { attrs: { cols: "12" } },
                        [
                          _c(
                            "v-card",
                            [
                              _c("v-card-title", [
                                _vm._v(
                                  "\n                                " +
                                    _vm._s(_vm.$t("Previous Payouts")) +
                                    "\n                            "
                                ),
                              ]),
                              _vm._v(" "),
                              _vm.payedPayouts && _vm.payedPayouts.length
                                ? _c("v-simple-table", {
                                    scopedSlots: _vm._u(
                                      [
                                        {
                                          key: "default",
                                          fn: function () {
                                            return [
                                              _c("thead", [
                                                _c("tr", [
                                                  _c(
                                                    "th",
                                                    {
                                                      staticClass: "text-left",
                                                    },
                                                    [
                                                      _vm._v(
                                                        "\n                                                Payout N°\n                                            "
                                                      ),
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "th",
                                                    {
                                                      staticClass: "text-left",
                                                    },
                                                    [
                                                      _vm._v(
                                                        "\n                                                Date\n                                            "
                                                      ),
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "th",
                                                    {
                                                      staticClass: "text-left",
                                                    },
                                                    [
                                                      _vm._v(
                                                        "\n                                                Amount\n                                            "
                                                      ),
                                                    ]
                                                  ),
                                                ]),
                                              ]),
                                              _vm._v(" "),
                                              _c(
                                                "tbody",
                                                _vm._l(
                                                  _vm.payedPayouts,
                                                  function (payout) {
                                                    return _c(
                                                      "tr",
                                                      { key: payout.id },
                                                      [
                                                        _c(
                                                          "td",
                                                          {
                                                            staticClass:
                                                              "text-left",
                                                          },
                                                          [
                                                            _vm._v(
                                                              "\n                                                " +
                                                                _vm._s(
                                                                  payout.id
                                                                ) +
                                                                "\n                                            "
                                                            ),
                                                          ]
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "td",
                                                          {
                                                            staticClass:
                                                              "text-left",
                                                          },
                                                          [
                                                            _vm._v(
                                                              "\n                                                " +
                                                                _vm._s(
                                                                  _vm
                                                                    .moment(
                                                                      payout.created_at
                                                                    )
                                                                    .format(
                                                                      "ll"
                                                                    )
                                                                ) +
                                                                "\n                                            "
                                                            ),
                                                          ]
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "td",
                                                          {
                                                            staticClass:
                                                              "text-left bold error--text",
                                                          },
                                                          [
                                                            _vm._v(
                                                              "\n                                                " +
                                                                _vm._s(
                                                                  -_vm.price(
                                                                    payout.amount
                                                                  ) +
                                                                    _vm
                                                                      .defaultCurrency
                                                                      .symbol
                                                                ) +
                                                                "\n                                            "
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
                                          },
                                          proxy: true,
                                        },
                                      ],
                                      null,
                                      false,
                                      1689849607
                                    ),
                                  })
                                : _c("div", { staticClass: "text-center" }, [
                                    _vm._v(
                                      "\n                                " +
                                        _vm._s(_vm.$t("No previous payouts")) +
                                        "\n                            "
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
                        "v-col",
                        { attrs: { cols: "12" } },
                        [
                          _c(
                            "v-card",
                            [
                              _c("v-card-title", [
                                _vm._v(
                                  "\n                                " +
                                    _vm._s(_vm.$t("Summary")) +
                                    "\n                            "
                                ),
                              ]),
                              _vm._v(" "),
                              _c("v-simple-table", {
                                scopedSlots: _vm._u([
                                  {
                                    key: "default",
                                    fn: function () {
                                      return [
                                        _c("thead", [
                                          _c("tr", [
                                            _c("th", {
                                              staticClass: "text-center",
                                            }),
                                            _vm._v(" "),
                                            _c("th", {
                                              staticClass: "text-center",
                                            }),
                                            _vm._v(" "),
                                            _c(
                                              "th",
                                              { staticClass: "text-right" },
                                              [
                                                _vm._v(
                                                  "\n                                                " +
                                                    _vm._s(
                                                      _vm.$t("Account Funds")
                                                    ) +
                                                    "\n                                            "
                                                ),
                                              ]
                                            ),
                                          ]),
                                        ]),
                                        _vm._v(" "),
                                        _c("tbody", [
                                          _c("tr", [
                                            _c("td"),
                                            _vm._v(" "),
                                            _c("td"),
                                            _vm._v(" "),
                                            _c(
                                              "td",
                                              {
                                                staticClass:
                                                  "text-right bold success--text",
                                              },
                                              [
                                                _vm._v(
                                                  "\n                                                " +
                                                    _vm._s(
                                                      _vm.price(
                                                        _vm.artist.funds
                                                      ) +
                                                        _vm.defaultCurrency
                                                          .symbol
                                                    ) +
                                                    "\n                                            "
                                                ),
                                              ]
                                            ),
                                          ]),
                                        ]),
                                      ]
                                    },
                                    proxy: true,
                                  },
                                ]),
                              }),
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
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dialogs/admin/edit/Artist.vue?vue&type=template&id=4f5547ad&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/dialogs/admin/edit/Artist.vue?vue&type=template&id=4f5547ad& ***!
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
  return _c("edit-dialog", {
    attrs: { loading: _vm.isLoading, editing: "artist" },
    on: { callToAction: _vm.saveArtist, cancel: _vm.closeWindow },
    scopedSlots: _vm._u([
      {
        key: "body",
        fn: function () {
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
                            source: _vm.artist.avatar || _vm.defaultAvatarPath,
                          },
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
                                  { attrs: { cols: "12", sm: "6" } },
                                  [
                                    _c("v-text-field", {
                                      attrs: {
                                        label: _vm.$t("Firstname"),
                                        readonly: !_vm.artist.new,
                                      },
                                      model: {
                                        value: _vm.editedArtist.firstname,
                                        callback: function ($$v) {
                                          _vm.$set(
                                            _vm.editedArtist,
                                            "firstname",
                                            $$v
                                          )
                                        },
                                        expression: "editedArtist.firstname",
                                      },
                                    }),
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "v-col",
                                  { attrs: { cols: "12", sm: "6" } },
                                  [
                                    _c("v-text-field", {
                                      attrs: {
                                        label: _vm.$t("Lastname"),
                                        readonly: !_vm.artist.new,
                                      },
                                      model: {
                                        value: _vm.editedArtist.lastname,
                                        callback: function ($$v) {
                                          _vm.$set(
                                            _vm.editedArtist,
                                            "lastname",
                                            $$v
                                          )
                                        },
                                        expression: "editedArtist.lastname",
                                      },
                                    }),
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "v-col",
                                  { attrs: { cols: "12", sm: "6" } },
                                  [
                                    _c("v-text-field", {
                                      attrs: {
                                        label: _vm.$t("Displayname"),
                                        readonly: !_vm.artist.new,
                                      },
                                      model: {
                                        value: _vm.editedArtist.displayname,
                                        callback: function ($$v) {
                                          _vm.$set(
                                            _vm.editedArtist,
                                            "displayname",
                                            $$v
                                          )
                                        },
                                        expression: "editedArtist.displayname",
                                      },
                                    }),
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "v-col",
                                  { attrs: { cols: "12", sm: "6" } },
                                  [
                                    _c("v-select", {
                                      attrs: {
                                        label: _vm.$t("Country"),
                                        readonly: !_vm.artist.new,
                                        items: _vm.countriesList,
                                      },
                                      model: {
                                        value: _vm.editedArtist.country,
                                        callback: function ($$v) {
                                          _vm.$set(
                                            _vm.editedArtist,
                                            "country",
                                            $$v
                                          )
                                        },
                                        expression: "editedArtist.country",
                                      },
                                    }),
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "v-col",
                                  { attrs: { cols: "12", sm: "6" } },
                                  [
                                    _c("v-text-field", {
                                      attrs: {
                                        label: _vm.$t("Address"),
                                        readonly: !_vm.artist.new,
                                      },
                                      model: {
                                        value: _vm.editedArtist.address,
                                        callback: function ($$v) {
                                          _vm.$set(
                                            _vm.editedArtist,
                                            "address",
                                            $$v
                                          )
                                        },
                                        expression: "editedArtist.address",
                                      },
                                    }),
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "v-col",
                                  { attrs: { cols: "12", sm: "6" } },
                                  [
                                    _c("v-text-field", {
                                      attrs: {
                                        label: _vm.$t("Phone"),
                                        readonly: !_vm.artist.new,
                                      },
                                      model: {
                                        value: _vm.editedArtist.phone,
                                        callback: function ($$v) {
                                          _vm.$set(
                                            _vm.editedArtist,
                                            "phone",
                                            $$v
                                          )
                                        },
                                        expression: "editedArtist.phone",
                                      },
                                    }),
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "v-col",
                                  { attrs: { cols: "12", sm: "6" } },
                                  [
                                    _c("v-text-field", {
                                      attrs: {
                                        label: _vm.$t("Email"),
                                        readonly: !_vm.artist.new,
                                      },
                                      model: {
                                        value: _vm.editedArtist.email,
                                        callback: function ($$v) {
                                          _vm.$set(
                                            _vm.editedArtist,
                                            "email",
                                            $$v
                                          )
                                        },
                                        expression: "editedArtist.email",
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
                        ),
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _vm.editedArtist.user
                      ? _c(
                          "v-col",
                          { attrs: { cols: "12" } },
                          [
                            _c(
                              "v-card",
                              [
                                _c("v-card-title", [
                                  _vm._v(
                                    "\n                            " +
                                      _vm._s(_vm.$t("Storage Space")) +
                                      "\n                        "
                                  ),
                                ]),
                                _vm._v(" "),
                                _c("v-divider"),
                                _vm._v(" "),
                                _c(
                                  "v-card-text",
                                  [
                                    _c(
                                      "v-container",
                                      [
                                        _c(
                                          "v-row",
                                          [
                                            _c(
                                              "v-col",
                                              { attrs: { cols: "9" } },
                                              [
                                                _c("v-text-field", {
                                                  attrs: {
                                                    label: _vm.$t("Size"),
                                                    type: "number",
                                                    messages: _vm.editedArtist
                                                      .used_disk_space
                                                      ? (
                                                          _vm.editedArtist
                                                            .used_disk_space /
                                                          1024 /
                                                          1024
                                                        ).toFixed(1) +
                                                        " MB " +
                                                        this.$t("used already.")
                                                      : "",
                                                  },
                                                  model: {
                                                    value:
                                                      _vm.available_disk_space,
                                                    callback: function ($$v) {
                                                      _vm.available_disk_space =
                                                        $$v
                                                    },
                                                    expression:
                                                      "available_disk_space",
                                                  },
                                                }),
                                              ],
                                              1
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "v-col",
                                              { attrs: { cols: "3" } },
                                              [
                                                _c("veutify-select", {
                                                  attrs: {
                                                    type: "number",
                                                    items: ["MB", "GB", "KB"],
                                                  },
                                                  model: {
                                                    value:
                                                      _vm.available_disk_space_unit,
                                                    callback: function ($$v) {
                                                      _vm.available_disk_space_unit =
                                                        $$v
                                                    },
                                                    expression:
                                                      "\n                                                available_disk_space_unit\n                                            ",
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
                _c(
                  "v-row",
                  [
                    _c("edit-external-links", {
                      attrs: { item: _vm.editedArtist },
                      on: {
                        spotify_link: function ($event) {
                          _vm.editedArtist.spotify_link = $event
                        },
                        youtube_link: function ($event) {
                          _vm.editedArtist.youtube_link = $event
                        },
                        soundcloud_link: function ($event) {
                          _vm.editedArtist.soundcloud_link = $event
                        },
                        itunes_link: function ($event) {
                          _vm.editedArtist.itunes_link = $event
                        },
                        deezer_link: function ($event) {
                          _vm.editedArtist.deezer_link = $event
                        },
                      },
                    }),
                  ],
                  1
                ),
                _vm._v(" "),
                _vm.$store.getters.getSettings.saas && !_vm.editedArtist.new
                  ? _c(
                      "v-row",
                      [
                        _c("ArtistEarningDetails", {
                          attrs: { artist: _vm.artist },
                        }),
                      ],
                      1
                    )
                  : _vm._e(),
              ],
              1
            ),
          ]
        },
        proxy: true,
      },
    ]),
  })
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/artist/EarningDetails.vue":
/*!***********************************************************!*\
  !*** ./resources/js/components/artist/EarningDetails.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EarningDetails_vue_vue_type_template_id_5d46bc85___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EarningDetails.vue?vue&type=template&id=5d46bc85& */ "./resources/js/components/artist/EarningDetails.vue?vue&type=template&id=5d46bc85&");
/* harmony import */ var _EarningDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EarningDetails.vue?vue&type=script&lang=js& */ "./resources/js/components/artist/EarningDetails.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify/lib/components/VCard */ "./node_modules/vuetify/lib/components/VCard/index.js");
/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ "./node_modules/vuetify/lib/components/VGrid/index.js");
/* harmony import */ var vuetify_lib_components_VDivider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VDivider */ "./node_modules/vuetify/lib/components/VDivider/index.js");
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/index.js");
/* harmony import */ var vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VList */ "./node_modules/vuetify/lib/components/VList/index.js");
/* harmony import */ var vuetify_lib_components_VDataTable__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuetify/lib/components/VDataTable */ "./node_modules/vuetify/lib/components/VDataTable/index.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _EarningDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _EarningDetails_vue_vue_type_template_id_5d46bc85___WEBPACK_IMPORTED_MODULE_0__["render"],
  _EarningDetails_vue_vue_type_template_id_5d46bc85___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* vuetify-loader */















_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default()(component, {VCard: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_4__["VCard"],VCardText: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_4__["VCardText"],VCardTitle: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_4__["VCardTitle"],VCol: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_5__["VCol"],VContainer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_5__["VContainer"],VDivider: vuetify_lib_components_VDivider__WEBPACK_IMPORTED_MODULE_6__["VDivider"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_7__["VIcon"],VListItem: vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_8__["VListItem"],VListItemAvatar: vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_8__["VListItemAvatar"],VListItemContent: vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_8__["VListItemContent"],VListItemTitle: vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_8__["VListItemTitle"],VRow: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_5__["VRow"],VSimpleTable: vuetify_lib_components_VDataTable__WEBPACK_IMPORTED_MODULE_9__["VSimpleTable"],VSpacer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_5__["VSpacer"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/artist/EarningDetails.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/artist/EarningDetails.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/components/artist/EarningDetails.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EarningDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./EarningDetails.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/EarningDetails.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EarningDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/artist/EarningDetails.vue?vue&type=template&id=5d46bc85&":
/*!******************************************************************************************!*\
  !*** ./resources/js/components/artist/EarningDetails.vue?vue&type=template&id=5d46bc85& ***!
  \******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EarningDetails_vue_vue_type_template_id_5d46bc85___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./EarningDetails.vue?vue&type=template&id=5d46bc85& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/EarningDetails.vue?vue&type=template&id=5d46bc85&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EarningDetails_vue_vue_type_template_id_5d46bc85___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EarningDetails_vue_vue_type_template_id_5d46bc85___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/dialogs/admin/edit/Artist.vue":
/*!***************************************************************!*\
  !*** ./resources/js/components/dialogs/admin/edit/Artist.vue ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Artist_vue_vue_type_template_id_4f5547ad___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Artist.vue?vue&type=template&id=4f5547ad& */ "./resources/js/components/dialogs/admin/edit/Artist.vue?vue&type=template&id=4f5547ad&");
/* harmony import */ var _Artist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Artist.vue?vue&type=script&lang=js& */ "./resources/js/components/dialogs/admin/edit/Artist.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify/lib/components/VCard */ "./node_modules/vuetify/lib/components/VCard/index.js");
/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ "./node_modules/vuetify/lib/components/VGrid/index.js");
/* harmony import */ var vuetify_lib_components_VDivider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VDivider */ "./node_modules/vuetify/lib/components/VDivider/index.js");
/* harmony import */ var vuetify_lib_components_VSelect__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VSelect */ "./node_modules/vuetify/lib/components/VSelect/index.js");
/* harmony import */ var vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VTextField */ "./node_modules/vuetify/lib/components/VTextField/index.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Artist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Artist_vue_vue_type_template_id_4f5547ad___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Artist_vue_vue_type_template_id_4f5547ad___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* vuetify-loader */










_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default()(component, {VCard: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_4__["VCard"],VCardText: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_4__["VCardText"],VCardTitle: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_4__["VCardTitle"],VCol: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_5__["VCol"],VContainer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_5__["VContainer"],VDivider: vuetify_lib_components_VDivider__WEBPACK_IMPORTED_MODULE_6__["VDivider"],VRow: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_5__["VRow"],VSelect: vuetify_lib_components_VSelect__WEBPACK_IMPORTED_MODULE_7__["VSelect"],VTextField: vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_8__["VTextField"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/dialogs/admin/edit/Artist.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/dialogs/admin/edit/Artist.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/dialogs/admin/edit/Artist.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Artist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Artist.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dialogs/admin/edit/Artist.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Artist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/dialogs/admin/edit/Artist.vue?vue&type=template&id=4f5547ad&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/dialogs/admin/edit/Artist.vue?vue&type=template&id=4f5547ad& ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Artist_vue_vue_type_template_id_4f5547ad___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Artist.vue?vue&type=template&id=4f5547ad& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dialogs/admin/edit/Artist.vue?vue&type=template&id=4f5547ad&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Artist_vue_vue_type_template_id_4f5547ad___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Artist_vue_vue_type_template_id_4f5547ad___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);