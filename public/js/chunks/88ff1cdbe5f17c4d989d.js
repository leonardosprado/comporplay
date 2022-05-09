(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["artist"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/layout/Master.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/artist/layout/Master.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Sidebar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sidebar */ "./resources/js/components/artist/layout/Sidebar.vue");
/* harmony import */ var _Navbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Navbar */ "./resources/js/components/artist/layout/Navbar.vue");
/* harmony import */ var _pages_NewArtistForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../pages/NewArtistForm */ "./resources/js/components/artist/pages/NewArtistForm.vue");
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



/* harmony default export */ __webpack_exports__["default"] = (_defineProperty({
  created: function created() {
    this.screenWidth < 750 ? this.sidebar = false : '';
  },
  metaInfo: {
    title: window.Settings.find(function (set) {
      return set.key === 'appName';
    }).value + ' - Artist Dashboard'
  },
  data: function data() {
    return {
      sidebar: true,
      screenWidth: window.innerWidth
    };
  },
  components: {
    SidebarArtist: _Sidebar__WEBPACK_IMPORTED_MODULE_0__["default"],
    NavbarArtist: _Navbar__WEBPACK_IMPORTED_MODULE_1__["default"],
    NewArtistForm: _pages_NewArtistForm__WEBPACK_IMPORTED_MODULE_2__["default"]
  }
}, "created", function created() {
  this.$store.dispatch('fetchArtist');
}));

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/layout/Navbar.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/artist/layout/Navbar.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _notifications_Index_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../notifications/Index.vue */ "./resources/js/components/notifications/Index.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    NotificationsBox: _notifications_Index_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      notifications: null
    };
  },
  created: function created() {
    var _this = this;

    axios.get('/api/artist/notifications').then(function (res) {
      _this.notifications = res.data;
    });
  },
  computed: {
    isThereUnreadNotifications: function isThereUnreadNotifications() {
      if (this.notifications) {
        return this.notifications && this.notifications.length && this.notifications.filter(function (not) {
          return not.read_at;
        }).length < this.notifications.length;
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/layout/Sidebar.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/artist/layout/Sidebar.vue?vue&type=script&lang=js& ***!
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
/* harmony default export */ __webpack_exports__["default"] = ({
  created: function created() {
    var _this = this;

    this.items = this.items.filter(function (item) {
      if (item.name === "podcasts") {
        return _this.hasPermission("CED podcasts(artist)") ? 1 : 0;
      } else if (item.name === "albums") {
        return _this.hasPermission("CED albums(artist)") ? 1 : 0;
      } else if (item.name === "songs") {
        return _this.hasPermission("CED songs(artist)") ? 1 : 0;
      } else if (item.name === "earnings") {
        return _this.$store.getters.getSettings.saas;
      } else {
        return 1;
      }
    });
  },
  data: function data() {
    return {
      items: [{
        path: "/artist/analytics",
        icon: "google-analytics",
        text: this.$t('Analytics')
      }, {
        path: "/artist/earnings",
        icon: "currency-usd",
        text: this.$t('Earnings'),
        name: "earnings"
      }, {
        path: "/artist/albums",
        icon: "album",
        text: this.$t('Albums'),
        name: "albums"
      }, {
        path: "/artist/songs",
        icon: "music-note",
        text: this.$t('Songs'),
        name: "songs"
      }, {
        path: "/artist/podcasts",
        icon: "microphone",
        text: this.$t('Podcasts'),
        name: "podcasts"
      }, {
        path: "/artist/account",
        icon: "account-music",
        text: this.$t('Account'),
        name: "account"
      }]
    };
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/pages/Account.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/artist/pages/Account.vue?vue&type=script&lang=js& ***!
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  created: function created() {
    var _this = this;

    axios.get("/api/artist").then(function (res) {
      return _this.artist = res.data;
    })["catch"](function (e) {
      return _this.artist = {};
    });
  },
  data: function data() {
    return {
      artist: null,
      loading: false
    };
  },
  methods: {
    imageReady: function imageReady(e) {
      this.artist.avatar = e;
    },
    save: function save() {
      var _this2 = this;

      var formData = new FormData();
      this.loading = true;
      formData.append("id", this.artist.id);
      formData.append("firstname", this.artist.firstname);
      formData.append("lastname", this.artist.lastname);
      formData.append("displayname", this.artist.displayname); //external links

      formData.append("spotify_link", this.artist.spotify_link || "");
      formData.append("youtube_link", this.artist.youtube_link || "");
      formData.append("soundcloud_link", this.artist.soundcloud_link || "");
      formData.append("itunes_link", this.artist.itunes_link || "");
      formData.append("deezer_link", this.artist.deezer_link || "");

      if (this.artist.avatar && this.artist.avatar.data) {
        formData.append("avatar", this.artist.avatar.data, this.artist.avatar.title);
      }

      axios.post("/api/artist/save-personal-infos", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(function () {
        _this2.loading = false;

        _this2.$notify({
          group: "foo",
          type: "success",
          title: _this2.$t("Success"),
          text: _this2.$t("Artist account") + " " + _this2.$t("updated successfully.")
        });

        setTimeout(function () {
          location.reload();
        }, 500);
      })["catch"](function (e) {
        _this2.loading = false;

        _this2.$notify({
          group: "foo",
          type: "error",
          title: _this2.$t("Error"),
          text: Object.values(e.response.data.errors).join("<br />")
        });
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/pages/Albums.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/artist/pages/Albums.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dialogs_edit_Album__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../dialogs/edit/Album */ "./resources/js/components/dialogs/edit/Album.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    editAlbumDialog: _dialogs_edit_Album__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      albums: null,
      search: "",
      headers: [{
        text: this.$t("Cover"),
        align: "start",
        sortable: false,
        value: "cover"
      }, {
        text: this.$t("Title"),
        value: "title"
      }, {
        text: this.$t("Likes"),
        value: "likes_count"
      }, {
        text: this.$t("Plays"),
        value: "plays"
      }, {
        text: this.$t("Released At"),
        value: "release_date"
      }, {
        text: this.$t("Created At"),
        value: "created_at"
      }, {
        text: this.$t("Operations"),
        value: "operations",
        align: "center"
      }],
      editDialog: false,
      editingAlbum: {}
    };
  },
  created: function created() {
    this.fetchAlbums();
  },
  methods: {
    fetchAlbums: function fetchAlbums() {
      var _this = this;

      return axios.get("/api/artist/albums").then(function (res) {
        _this.albums = res.data;
      });
    },
    deleteAlbum: function deleteAlbum(album_id) {
      var _this2 = this;

      this.$confirm({
        message: "".concat(this.$t("Are you sure you wanna delete this") + " " + this.$t("Album") + "?"),
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
            axios["delete"]("/api/albums/" + album_id).then(function () {
              _this2.$notify({
                group: "foo",
                type: "success",
                title: _this2.$t("Deleted"),
                text: _this2.$t("Album") + " " + _this2.$t("Deleted") + "."
              });

              _this2.fetchAlbums();
            })["catch"]();
          }
        }
      });
    },
    editAlbum: function editAlbum(album) {
      if (!album) {
        this.editDialog = false;
        this.editingAlbum = {};
      } else if (album === "new") {
        this.editingAlbum = {
          "new": true,
          artists: []
        };
        this.editDialog = true;
      } else {
        this.editingAlbum = album;
        this.editDialog = true;
      }
    },
    albumEdited: function albumEdited() {
      this.editDialog = false;
      this.$notify({
        group: "foo",
        type: "success",
        title: this.$t("Saved"),
        text: this.$t("Album") + " " + this.$t("Updated") + "."
      });
      this.fetchAlbums();
    },
    albumCreated: function albumCreated() {
      var _this3 = this;

      this.editDialog = false;
      this.$notify({
        group: "foo",
        type: "success",
        title: this.$t("Created"),
        text: this.$t("Album") + " " + this.$t("Created") + "."
      });
      this.fetchAlbums().then(function () {
        _this3.editingAlbum = _this3.albums[0];
        _this3.editDialog = true;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/pages/Analytics.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/artist/pages/Analytics.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _charts_AreaChart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../charts/AreaChart */ "./resources/js/components/charts/AreaChart.vue");
/* harmony import */ var _charts_PieChart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../charts/PieChart */ "./resources/js/components/charts/PieChart.vue");
/* harmony import */ var vuetify_lib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuetify/lib */ "./node_modules/vuetify/lib/index.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    AreaChart: _charts_AreaChart__WEBPACK_IMPORTED_MODULE_0__["default"],
    PieChart: _charts_PieChart__WEBPACK_IMPORTED_MODULE_1__["default"],
    veutifySelect: vuetify_lib__WEBPACK_IMPORTED_MODULE_2__["VSelect"]
  },
  data: function data() {
    return {
      stats: null,
      playsChartReset: false,
      popularSongs: [],
      timeOptions: [{
        name: this.$t("Last 7 days"),
        param: "lw"
      }, {
        name: this.$t("Last Month"),
        param: "lm"
      }, {
        name: this.$t("Last Year"),
        param: "ly"
      }],
      songsTableHeaders: [{
        text: this.$t("#"),
        value: "rank"
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
        value: "artists"
      }, {
        text: this.$t("Plays"),
        value: "nb_plays"
      }, {
        text: this.$t("Likes"),
        value: "nb_likes"
      }, {
        text: this.$t("Created At"),
        value: "created_at"
      }],
      salesTableHeaders: [{
        text: this.$t("#"),
        value: "rank"
      }, {
        text: this.$t("Cover"),
        align: "start",
        sortable: false,
        value: "cover"
      }, {
        text: this.$t("Title"),
        value: "itemTitle"
      }, {
        text: this.$t("Earned"),
        value: "price"
      }],
      timeOption: {
        name: this.$t("Last 7 days"),
        param: "lw"
      },
      analyticsCards: [{
        title: this.$store.getters.getSettings.enable_selling ? "Sales" : "Songs",
        icon: this.$store.getters.getSettings.enable_selling ? "currency-usd" : 'music-note-eighth',
        number: 0,
        gradient: "45deg,#00cdac,#02aab0",
        this_month: "0"
      }, {
        icon: "account-group",
        title: "Followers",
        number: 0,
        gradient: "45deg,#8C366C, #6E64E7",
        this_month: "0"
      }, {
        icon: "music-note",
        title: "Songs",
        number: 0,
        gradient: "45deg,#00cdac,#02aab0",
        this_month: "0"
      }, {
        icon: "play-speed",
        title: "Total Plays",
        number: 0,
        gradient: "45deg,#00cdac,#02aab0",
        this_month: "0"
      } // upcoming feature
      // {
      //     icon: "account",
      //     title: this.$t("profile visits"),
      //     number: 0,
      //     gradient: "45deg,#f09819,#edde5d",
      //     this_month: "0",
      // }
      ],
      plays: [],
      chartPlaysData: {
        labels: [],
        datasets: [{
          data: [],
          fill: true,
          borderColor: "#2196f3",
          backgroundColor: "#4245a8",
          borderWidth: 1
        }],
        options: {
          legend: {
            display: false
          },
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              ticks: {
                precision: 0,
                beginAtZero: true
              }
            }]
          }
        }
      }
    };
  },
  created: function created() {
    var _this = this;

    // fetching the stats and updating the page components
    axios.get("/api/artist/analytics").then(function (res) {
      _this.stats = res.data;

      _this.updatePlaysChart(); // upcoming feature
      // this.analyticsCards[
      //   this.analyticsCards.findIndex((card) => card.title.match(/profile/i))
      // ].number = this.stats.nb_profile_visits;
      // this.analyticsCards[
      //   this.analyticsCards.findIndex((card) => card.title.match(/profile/i))
      // ].this_month = this.stats.nb_profile_visits_this_month;
      // updating the analytics cards data


      _this.analyticsCards[_this.analyticsCards.findIndex(function (card) {
        return card.title.match(/play/i);
      })].number = _this.stats.total_plays;
      _this.analyticsCards[_this.analyticsCards.findIndex(function (card) {
        return card.title.match(/play/i);
      })].this_month = _this.stats.total_plays_this_month;
      _this.analyticsCards[_this.analyticsCards.findIndex(function (card) {
        return card.title.match(/song/i);
      })].number = _this.stats.nb_songs;
      _this.analyticsCards[_this.analyticsCards.findIndex(function (card) {
        return card.title.match(/song/i);
      })].this_month = _this.stats.nb_songs_this_month; // updating the songs card

      if (_this.$store.getters.getSettings.enable_selling) {
        _this.analyticsCards[_this.analyticsCards.findIndex(function (card) {
          return card.title.match(/sale/i);
        })].number = _this.stats.nb_sales;
        _this.analyticsCards[_this.analyticsCards.findIndex(function (card) {
          return card.title.match(/sale/i);
        })].this_month = _this.stats.nb_sales_this_month;
      } else {
        _this.analyticsCards[_this.analyticsCards.findIndex(function (card) {
          return card.title.match(/song/i);
        })].number = _this.stats.nb_songs;
        _this.analyticsCards[_this.analyticsCards.findIndex(function (card) {
          return card.title.match(/song/i);
        })].this_month = _this.stats.nb_songs_this_month;
      }

      _this.analyticsCards[_this.analyticsCards.findIndex(function (card) {
        return card.title.match(/follower/i);
      })].number = _this.stats.nb_followers;
      _this.analyticsCards[_this.analyticsCards.findIndex(function (card) {
        return card.title.match(/follower/i);
      })].this_month = _this.stats.nb_followers_this_month;
      _this.popularSongs = _this.stats.popular_songs;
      _this.sales = _this.stats.sales;
    });
  },
  methods: {
    updatePlaysChart: function updatePlaysChart() {
      var _this2 = this;

      var playsCount;
      axios.get("/api/artist/plays/" + this.timeOption.param).then(function (res) {
        playsCount = res.data;
      }).then(function () {
        // lw = last week
        // After getting the plays data from the API
        // this script reform the data so it is displayable
        // by the ChartJs script
        if (_this2.timeOption.param === "lw") {
          var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
          var last7Days = [];

          for (var i = 1; i <= 7; i++) {
            var moment = _this2.moment().subtract(1, "weeks").add(i, "d");

            last7Days.push({
              day: days[moment.day()],
              date: moment.format("YYYY-MM-DD")
            });
          }

          var plays = last7Days.map(function (day) {
            if (playsCount.some(function (play) {
              return play.date === day.date;
            })) {
              day.plays = playsCount.find(function (play) {
                return play.date === day.date;
              }).plays;
            } else {
              day.plays = 0;
            }

            return day;
          });
          _this2.chartPlaysData.labels = plays.map(function (play) {
            return play.day;
          });
          _this2.chartPlaysData.datasets[0].data = plays.map(function (play) {
            return play.plays;
          });
          _this2.playsChartReset = true;
        } else if (_this2.timeOption.param === "lm") {
          // lm = last month
          var last30Days = [];

          for (var _i = 1; _i <= 30; _i++) {
            var _moment = _this2.moment().subtract(30, "days").add(_i, "d");

            last30Days.push({
              day: _moment.format("ll"),
              date: _moment.format("YYYY-MM-DD")
            });
          }

          var _plays = last30Days.map(function (day) {
            if (playsCount.some(function (play) {
              return play.date === day.date;
            })) {
              day.plays = playsCount.find(function (play) {
                return play.date === day.date;
              }).plays;
            } else {
              day.plays = 0;
            }

            return day;
          });

          _this2.chartPlaysData.labels = _plays.map(function (play) {
            return play.day;
          });
          _this2.chartPlaysData.datasets[0].data = _plays.map(function (play) {
            return play.plays;
          });
          _this2.playsChartReset = true;
        } else if (_this2.timeOption.param === "ly") {
          // ly = last year
          var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          var last12Month = [];

          for (var _i2 = 1; _i2 <= 12; _i2++) {
            var _moment2 = _this2.moment().subtract(12, "months").add(_i2, "M");

            last12Month.push({
              month: months[_moment2.month()],
              date: _moment2.format("M")
            });
          }

          var _plays2 = last12Month.map(function (month) {
            if (playsCount.some(function (play) {
              return play.date === parseInt(month.date);
            })) {
              month.plays = playsCount.find(function (play) {
                return play.date === parseInt(month.date);
              }).plays;
            } else {
              month.plays = 0;
            }

            return month;
          });

          _this2.chartPlaysData.labels = _plays2.map(function (play) {
            return play.month;
          });
          _this2.chartPlaysData.datasets[0].data = _plays2.map(function (play) {
            return play.plays;
          });
          _this2.playsChartReset = true;
        }
      });
      setTimeout(function () {
        _this2.playsChartReset = false;
      }, 300);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/pages/Contact.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/artist/pages/Contact.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _elements_select_Users_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../elements/select/Users.vue */ "./resources/js/components/elements/select/Users.vue");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

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


var TextEditor = function TextEditor() {
  return __webpack_require__.e(/*! import() | textEditor */ "textEditor").then(__webpack_require__.bind(null, /*! ../../elements/other/TextEditor.vue */ "./resources/js/components/elements/other/TextEditor.vue"));
};

/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    SelectUsers: _elements_select_Users_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    TextEditor: TextEditor
  },
  data: function data() {
    return {
      contact: {
        to: 'admins',
        title: "",
        message: ""
      },
      loading: false,
      sent: false
    };
  },
  methods: {
    sendMessage: function sendMessage() {
      var _this = this;

      this.loading = true;
      axios.post('/api/artist/contact', _objectSpread({}, this.contact)).then(function () {
        _this.loading = false;
        _this.sent = true;

        _this.$notify({
          group: "foo",
          type: "success",
          title: _this.$t("Sent"),
          text: _this.$t('Message') + ' ' + _this.$t('sent successfully.')
        });
      })["catch"](function () {
        _this.loading = false;

        _this.$notify({
          group: "foo",
          type: "error",
          title: _this.$t("Error"),
          text: _this.$t('Some error occured. Please try again!')
        });
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/pages/Earnings.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/artist/pages/Earnings.vue?vue&type=script&lang=js& ***!
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  created: function created() {
    var _this = this;

    axios.get("/api/artist").then(function (res) {
      _this.artist = res.data;

      if (_this.artist.payout_method) {
        _this.payoutDetails = _this.artist.payout_method.pivot.payout_details;
      }
    })["catch"](function (e) {
      return _this.artist = {};
    });
    axios.get("/api/artist/payout-options").then(function (res) {
      return _this.payoutOptions = res.data;
    })["catch"](function (e) {
      return _this.payoutOptions = {};
    });
  },
  mixins: [_mixins_billing_billing__WEBPACK_IMPORTED_MODULE_0__["default"]],
  data: function data() {
    return {
      artist: null,
      loading: false,
      requestPayoutDialog: false,
      payoutRequestLoading: false,
      payoutOptions: [],
      payoutDetails: ''
    };
  },
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
    }
  },
  methods: {
    requestPayout: function requestPayout() {
      var _this2 = this;

      if (!this.artist.payout_method.id) {
        return this.$notify({
          group: "foo",
          type: "error",
          title: this.$t("Oops!"),
          text: this.$t("Please select a payout method.")
        });
      }

      if (!this.payoutDetails) {
        return this.$notify({
          group: "foo",
          type: "error",
          title: this.$t("Oops!"),
          text: this.$t("Please enter your payout details.")
        });
      }

      this.payoutRequestLoading = true;
      axios.post("/api/artist/request-payout", {
        amount: this.artist.payoutAmount,
        payoutOption: {
          id: this.artist.payout_method.id,
          details: this.payoutDetails,
          minimum: this.artist.payout_method.minimum
        }
      }).then(function (res) {
        _this2.artist.payouts = res.data;

        _this2.$notify({
          group: "foo",
          type: "success",
          title: _this2.$t("Submitted"),
          text: _this2.$t("Payout requet submitted successfully.")
        });

        setTimeout(function () {
          location.reload();
        }, 500);
      })["catch"](function (e) {
        return _this2.$notify({
          group: "foo",
          type: "error",
          title: _this2.$t("Oops!"),
          text: e.response.data
        });
      })["finally"](function () {
        _this2.requestPayoutDialog = false;
        _this2.payoutRequestLoading = false;
      });
    },
    imageReady: function imageReady(e) {
      this.artist.avatar = e;
    },
    save: function save() {
      var _this3 = this;

      var formData = new FormData();
      this.loading = true;
      formData.append("id", this.artist.id);
      formData.append("firstname", this.artist.firstname);
      formData.append("lastname", this.artist.lastname);
      formData.append("displayname", this.artist.displayname);

      if (this.artist.avatar && this.artist.avatar.data) {
        formData.append("avatar", this.artist.avatar.data, this.artist.avatar.title);
      }

      axios.post("/api/artist/save-personal-infos", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(function () {
        _this3.loading = false;

        _this3.$notify({
          group: "foo",
          type: "success",
          title: _this3.$t("Success"),
          text: _this3.$t("Artist account") + " " + _this3.$t("updated successfully.")
        });

        setTimeout(function () {
          location.reload();
        }, 500);
      })["catch"](function (e) {
        _this3.loading = false;

        _this3.$notify({
          group: "foo",
          type: "error",
          title: _this3.$t("Error"),
          text: Object.values(e.response.data.errors).join("<br />")
        });
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/pages/NewArtistForm.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/artist/pages/NewArtistForm.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************/
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

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      artist: {},
      loading: false,
      countriesList: _data_coutries__WEBPACK_IMPORTED_MODULE_0__["default"],
      defaultCoverPath: "/storage/defaults/images/artist_avatar.png"
    };
  },
  methods: {
    imageReady: function imageReady(e) {
      this.artist.avatar = e;
    },
    save: function save() {
      var _this = this;

      var formData = new FormData();
      this.loading = true;
      formData.append("firstname", this.artist.firstname || "");
      formData.append("lastname", this.artist.lastname || "");
      formData.append("country", this.artist.country || "");
      formData.append("phone", this.artist.phone || "");
      formData.append("email", this.artist.email || "");
      formData.append("address", this.artist.address || "");
      formData.append("spotify_link", this.artist.spotify_link || "");
      formData.append("youtube_link", this.artist.youtube_link || "");
      formData.append("soundcloud_link", this.artist.soundcloud_link || "");
      formData.append("itunes_link", this.artist.itunes_link || "");
      formData.append("displayname", this.artist.displayname || "");

      if (this.artist.avatar && this.artist.avatar.data) {
        formData.append("avatar", this.artist.avatar.data, this.artist.avatar.title);
      } else {
        formData.append("avatar", this.defaultCoverPath);
      }

      axios.post("/api/artist/save-personal-infos", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(function () {
        _this.loading = false;

        _this.$notify({
          group: "foo",
          type: "success",
          title: _this.$t("Success"),
          text: _this.$t("Artist account") + " " + _this.$t("updated successfully.")
        });

        setTimeout(function () {
          location.reload();
        }, 500);
      })["catch"](function (e) {
        _this.loading = false;

        _this.$notify({
          group: "foo",
          type: "error",
          title: _this.$t("Error"),
          text: Object.values(e.response.data.errors).join("<br />")
        });
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/pages/Podcasts.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/artist/pages/Podcasts.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dialogs_edit_Podcast_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../dialogs/edit/Podcast.vue */ "./resources/js/components/dialogs/edit/Podcast.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    editPodcastDialog: _dialogs_edit_Podcast_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      podcasts: null,
      search: "",
      headers: [{
        text: this.$t("Cover"),
        align: "start",
        sortable: false,
        value: "cover"
      }, {
        text: this.$t('Title'),
        value: "title"
      }, {
        text: this.$t('Followers'),
        value: "followers_count"
      }, {
        text: this.$t('Created At'),
        value: "created_at"
      }, {
        text: this.$t('Operations'),
        value: "operations",
        align: "center"
      }],
      editDialog: false,
      editingPodcast: {}
    };
  },
  created: function created() {
    this.fetchPodcasts();
  },
  methods: {
    fetchPodcasts: function fetchPodcasts() {
      var _this = this;

      return axios.get("/api/artist/podcasts").then(function (res) {
        _this.podcasts = res.data;
      });
    },
    deletePodcast: function deletePodcast(podcast_id) {
      var _this2 = this;

      this.$confirm({
        message: "".concat(this.$t("Are you sure you wanna delete this") + " " + this.$t('Podcast') + "?"),
        button: {
          no: this.$t('No'),
          yes: this.$t('Yes')
        },

        /**
         * Callback Function
         * @param {Boolean} confirm
         */
        callback: function callback(confirm) {
          if (confirm) {
            axios["delete"]("/api/podcasts/" + podcast_id).then(function () {
              _this2.$notify({
                group: "foo",
                type: "success",
                title: _this2.$t("Deleted"),
                text: _this2.$t('Podcast') + " " + _this2.$t('Deleted') + "."
              });

              _this2.fetchPodcasts();
            })["catch"]();
          }
        }
      });
    },
    editPodcast: function editPodcast(podcast) {
      if (!podcast) {
        this.editDialog = false;
        this.editingPodcast = {};
      } else if (podcast === "new") {
        this.editingPodcast = {
          "new": true,
          description: "",
          genres: []
        };
        this.editDialog = true;
      } else {
        this.editingPodcast = podcast;
        this.editDialog = true;
      }
    },
    podcastEdited: function podcastEdited() {
      this.editDialog = false;
      this.$notify({
        group: "foo",
        type: "success",
        title: this.$t("Saved"),
        text: this.$t('Podcast') + " " + this.$t('Updated') + "."
      });
      this.fetchPodcasts();
    },
    podcastCreated: function podcastCreated() {
      var _this3 = this;

      this.editDialog = false;
      this.$notify({
        group: "foo",
        type: "success",
        title: this.$t("Created"),
        text: this.$t('Podcast') + " " + this.$t('Created') + "."
      });
      this.fetchPodcasts().then(function () {
        _this3.editingPodcast = _this3.podcasts[0];
        _this3.editDialog = true;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/pages/Songs.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/artist/pages/Songs.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dialogs_edit_Song__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../dialogs/edit/Song */ "./resources/js/components/dialogs/edit/Song.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    editSongDialog: _dialogs_edit_Song__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  computed: {
    isShowing: function isShowing() {
      var _this = this;

      return function (song_id) {
        return _this.songs[_this.songs.findIndex(function (song) {
          return song.id === song_id;
        })].isShowing;
      };
    }
  },
  data: function data() {
    return {
      songs: null,
      search: "",
      headers: [{
        text: this.$t("Cover"),
        align: "start",
        sortable: false,
        value: "cover"
      }, {
        text: this.$t("Title"),
        value: "title"
      }, {
        text: this.$t("Artists"),
        value: "artists"
      }, {
        text: this.$t("Plays"),
        value: "nb_plays"
      }, {
        text: this.$t("Downloads"),
        value: "nb_downloads",
        align: "center"
      }, {
        text: this.$t("Likes"),
        value: "nb_likes"
      }, {
        text: this.$t("Created At"),
        value: "created_at"
      }, {
        text: this.$t("Operations"),
        value: "operations",
        align: "center"
      }],
      editDialog: false,
      editingSong: null
    };
  },
  created: function created() {
    this.fetchSongs();
  },
  methods: {
    fetchSongs: function fetchSongs() {
      var _this2 = this;

      axios.get("/api/artist/songs").then(function (res) {
        _this2.songs = res.data;
      });
    },
    wakeSongDialog: function wakeSongDialog(song_id) {
      this.editDialog = true;
      var index = this.songs.findIndex(function (song) {
        return song.id === song_id;
      });
      this.$set(this.songs[index], "isShowing", true);
    },
    sleepSongDialog: function sleepSongDialog(song_id) {
      this.editDialog = false;
      var index = this.songs.findIndex(function (song) {
        return song.id === song_id;
      });
      this.$set(this.songs[index], "isShowing", false);
      this.$forceUpdate();
    },
    closeSong: function closeSong(song_id) {
      var index = this.songs.findIndex(function (song) {
        return song.id === song_id;
      });

      if (this.songs[index].isShowing) {
        this.editDialog = false;
      }

      if (this.songs[index]["new"]) {
        this.songs.splice(index, 1);
      }

      this.$set(this.songs[index], "isActive", false);
      this.$set(this.songs[index], "isShowing", false);
      this.$forceUpdate();
    },
    hideAllsongs: function hideAllsongs() {
      for (var i = 0; i < this.songs.length; i++) {
        this.$set(this.songs[i], "isShowing", false);
      }

      this.editDialog = false;
    },
    updateProgress: function updateProgress(progress, song_id) {
      var index = this.songs.findIndex(function (song) {
        return song.id === song_id;
      });
      this.$set(this.songs[index], "progress", progress);
    },
    deleteSong: function deleteSong(song_id) {
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
            var index = _this3.songs.findIndex(function (song) {
              return song.id === song_id;
            });

            if (_this3.songs[index].requestSource) {
              _this3.songs[index].requestSource.cancel();
            }

            axios["delete"]("/api/songs/" + song_id, {
              song_id: song_id
            }).then(function () {
              _this3.songs.splice(index, 1);

              _this3.$notify({
                group: "foo",
                type: "success",
                title: _this3.$t("Deleted"),
                text: _this3.$t("Song") + " " + _this3.$t("Deleted") + "."
              });
            })["catch"](function () {});
          }
        }
      });
    },
    editSong: function editSong(song) {
      if (song === "new") {
        this.songs.unshift({
          id: Math.floor(Math.random() * (100000 - 5000) + 100000),
          "new": true,
          artists: [this.$store.getters.getArtist],
          cover: "/storage/defaults/images/song_cover.png",
          genres: [],
          isActive: true,
          isShowing: true,
          nb_plays: 0,
          nb_likes: 0,
          "public": true,
          source: "",
          source_format: "file"
        });
        this.editDialog = true;
      } else {
        this.songs[this.songs.findIndex(function (t) {
          return t.id === song.id;
        })].isActive = true;
        this.songs[this.songs.findIndex(function (t) {
          return t.id === song.id;
        })].isShowing = true;
        this.editDialog = true;
      }
    },
    songEdited: function songEdited(song_id) {
      var index = this.songs.findIndex(function (song) {
        return song.id === song_id;
      });
      this.$set(this.songs[index], "progress", 0);
      this.$set(this.songs[index], "isActive", false);
      this.$notify({
        group: "foo",
        type: "success",
        title: this.$t("Saved"),
        text: this.$t("Song") + " " + this.$t("Updated") + "."
      });
    },
    songCreated: function songCreated() {
      this.$notify({
        group: "foo",
        type: "success",
        title: this.$t("Created"),
        text: this.$t("Song") + " " + this.$t("Created") + "."
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/charts/AreaChart.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/charts/AreaChart.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue_chartjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-chartjs */ "./node_modules/vue-chartjs/es/index.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  "extends": vue_chartjs__WEBPACK_IMPORTED_MODULE_0__["Line"],
  props: ['chartdata', 'options', 'reset'],
  mounted: function mounted() {
    this.renderChart(this.chartdata, this.options);
  },
  watch: {
    reset: function reset(val) {
      if (val) {
        this.renderChart(this.chartdata, this.options);
        this.$emit('resetOver');
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/charts/PieChart.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/charts/PieChart.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue_chartjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-chartjs */ "./node_modules/vue-chartjs/es/index.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  "extends": vue_chartjs__WEBPACK_IMPORTED_MODULE_0__["Pie"],
  props: ['chartdata', 'options'],
  mounted: function mounted() {
    this.renderChart(this.chartdata, this.options);
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/layout/Master.vue?vue&type=style&index=0&id=a3fbacec&lang=scss&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/artist/layout/Master.vue?vue&type=style&index=0&id=a3fbacec&lang=scss&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#artist-master[data-v-a3fbacec] {\n  position: relative;\n  height: 100vh;\n  overflow: hidden;\n}\n#artist-master #artist-header[data-v-a3fbacec] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  z-index: 3;\n}\n#artist-master #artist-sidebar[data-v-a3fbacec] {\n  position: absolute;\n  top: 0em;\n  left: 0;\n  z-index: 2;\n  width: 18em;\n  bottom: 0;\n  overflow-y: auto;\n  transition: transform 0.4s ease-in;\n}\n#artist-master #artist-main-container[data-v-a3fbacec] {\n  padding: 80px 1.5em 0 19.8em;\n  overflow: auto;\n  height: 100%;\n}\n@media screen and (max-width: 750px) {\n#artist-master #artist-main-container[data-v-a3fbacec] {\n    padding: 0 !important;\n    padding-top: 7em !important;\n}\n}\n.artist-search-bar[data-v-a3fbacec] {\n  max-width: 300px;\n  margin-left: auto;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/layout/Sidebar.vue?vue&type=style&index=0&id=98c1d738&lang=scss&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/artist/layout/Sidebar.vue?vue&type=style&index=0&id=98c1d738&lang=scss&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#sidebar-wrapper[data-v-98c1d738] {\n  min-height: 100vh;\n  margin-left: -15rem;\n  transition: margin 0.25s ease-out;\n}\n#sidebar-wrapper .sidebar-heading[data-v-98c1d738] {\n  padding: 0.875rem 1.25rem;\n  font-size: 1.2rem;\n}\n#page-content-wrapper[data-v-98c1d738] {\n  min-width: 100vw;\n}\n#wrapper.toggled #sidebar-wrapper[data-v-98c1d738] {\n  margin-left: 0;\n}\n@media (min-width: 768px) {\n#sidebar-wrapper[data-v-98c1d738] {\n    margin-left: 0;\n}\n#page-content-wrapper[data-v-98c1d738] {\n    min-width: 0;\n    width: 100%;\n}\n#wrapper.toggled #sidebar-wrapper[data-v-98c1d738] {\n    margin-left: -15rem;\n}\n}\n.artist-list[data-v-98c1d738] {\n  height: 100%;\n  padding-top: 4em;\n}\n.list[data-v-98c1d738] {\n  height: 100%;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/pages/Analytics.vue?vue&type=style&index=0&id=2953fac4&lang=scss&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/artist/pages/Analytics.vue?vue&type=style&index=0&id=2953fac4&lang=scss&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".v-image__image--preload[data-v-2953fac4] {\n  filter: blur(0) !important;\n}\n.subline[data-v-2953fac4] {\n  font-size: 0.7em;\n  margin-top: -1em;\n  color: grey;\n  font-weight: 600;\n}\n.flex-end[data-v-2953fac4] {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n}\n.analytics-card-icon .v-responsive__content[data-v-2953fac4] {\n  display: flex !important;\n  align-items: center !important;\n  justify-content: center !important;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/pages/NewArtistForm.vue?vue&type=style&index=0&lang=scss&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/artist/pages/NewArtistForm.vue?vue&type=style&index=0&lang=scss& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".new-artist-account {\n  max-width: 800px;\n  margin: 5em auto;\n}\n.header_and_sub_title {\n  text-align: center;\n}\n.header_and_sub_title__header {\n  font-size: 1.3em;\n  font-weight: bold;\n}\n.header_and_sub_title__sub {\n  opacity: 0.75;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/layout/Master.vue?vue&type=style&index=0&id=a3fbacec&lang=scss&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/artist/layout/Master.vue?vue&type=style&index=0&id=a3fbacec&lang=scss&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Master.vue?vue&type=style&index=0&id=a3fbacec&lang=scss&scoped=true& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/layout/Master.vue?vue&type=style&index=0&id=a3fbacec&lang=scss&scoped=true&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/layout/Sidebar.vue?vue&type=style&index=0&id=98c1d738&lang=scss&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/artist/layout/Sidebar.vue?vue&type=style&index=0&id=98c1d738&lang=scss&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Sidebar.vue?vue&type=style&index=0&id=98c1d738&lang=scss&scoped=true& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/layout/Sidebar.vue?vue&type=style&index=0&id=98c1d738&lang=scss&scoped=true&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/pages/Analytics.vue?vue&type=style&index=0&id=2953fac4&lang=scss&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/artist/pages/Analytics.vue?vue&type=style&index=0&id=2953fac4&lang=scss&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Analytics.vue?vue&type=style&index=0&id=2953fac4&lang=scss&scoped=true& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/pages/Analytics.vue?vue&type=style&index=0&id=2953fac4&lang=scss&scoped=true&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/pages/NewArtistForm.vue?vue&type=style&index=0&lang=scss&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/artist/pages/NewArtistForm.vue?vue&type=style&index=0&lang=scss& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./NewArtistForm.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/pages/NewArtistForm.vue?vue&type=style&index=0&lang=scss&");

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

/***/ "./node_modules/vue-chartjs/es/index.js":
/*!**********************************************!*\
  !*** ./node_modules/vue-chartjs/es/index.js ***!
  \**********************************************/
/*! exports provided: default, VueCharts, Bar, HorizontalBar, Doughnut, Line, Pie, PolarArea, Radar, Bubble, Scatter, mixins, generateChart */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/leonardo/Documentos/Meus Projetos/freela/comporplay/node_modules/vue-chartjs/es/index.js'");

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/layout/Master.vue?vue&type=template&id=a3fbacec&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/artist/layout/Master.vue?vue&type=template&id=a3fbacec&scoped=true& ***!
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
  return _vm.$store.getters.getArtist && _vm.$store.getters.getArtist.id
    ? _c(
        "div",
        { attrs: { id: "artist-master" } },
        [
          _c("NavbarArtist", {
            attrs: {
              id: "artist-header",
              artist: _vm.$store.getters.getArtist,
            },
            on: {
              "toggle-sidebar": function ($event) {
                _vm.sidebar = !_vm.sidebar
              },
            },
          }),
          _vm._v(" "),
          _c("SidebarArtist", {
            style: { transform: !_vm.sidebar ? "translateX(-100%)" : "" },
            attrs: { id: "artist-sidebar" },
            on: {
              clickOnItem: function ($event) {
                _vm.screenWidth < 750 ? (_vm.sidebar = false) : ""
              },
            },
          }),
          _vm._v(" "),
          _c(
            "div",
            {
              style: { paddingLeft: !_vm.sidebar ? "0.8em" : "19.8em" },
              attrs: { id: "artist-main-container" },
            },
            [_c("router-view")],
            1
          ),
        ],
        1
      )
    : _vm.$store.getters.getArtist !== null
    ? _c("new-artist-form", { attrs: { artist: _vm.$store.getters.getArtist } })
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/layout/Navbar.vue?vue&type=template&id=1aeb9438&":
/*!******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/artist/layout/Navbar.vue?vue&type=template&id=1aeb9438& ***!
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
  return _vm.artist
    ? _c(
        "v-app-bar",
        [
          _c("v-app-bar-nav-icon", {
            on: {
              click: function ($event) {
                return _vm.$emit("toggle-sidebar")
              },
            },
          }),
          _vm._v(" "),
          _c("v-toolbar-title", [_vm._v(_vm._s(_vm.$t("Artist Area")))]),
          _vm._v(" "),
          _c("v-spacer"),
          _vm._v(" "),
          _vm.notifications
            ? _c(
                "div",
                { staticClass: "notifications mr-4" },
                [
                  _c(
                    "v-menu",
                    {
                      attrs: {
                        bottom: "",
                        left: "",
                        "nudge-bottom": "50",
                        "close-on-click": false,
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
                                          color: _vm.isThereUnreadNotifications
                                            ? "error"
                                            : "transparent",
                                        },
                                      },
                                      [
                                        _c("v-icon", [
                                          _vm._v("$vuetify.icons.bell"),
                                        ]),
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
                        1791742882
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
            { staticClass: "text-overflow-ellipsis" },
            [
              _c(
                "v-avatar",
                {
                  staticClass: "mr-2",
                  attrs: { color: "primary", size: "35" },
                },
                [_c("v-img", { attrs: { src: _vm.artist.avatar } })],
                1
              ),
              _vm._v("\n        " + _vm._s(_vm.artist.displayname) + "\n    "),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-menu",
            {
              attrs: { left: "", bottom: "" },
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
                            _c("v-icon", [
                              _vm._v("$vuetify.icons.dots-vertical"),
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
                1136110947
              ),
            },
            [
              _vm._v(" "),
              _c(
                "v-list",
                [
                  _c(
                    "v-list-item",
                    {
                      attrs: {
                        to: {
                          path: _vm.$store.getters.getSettings.playerLanding,
                        },
                      },
                    },
                    [
                      _c(
                        "v-list-item-title",
                        [
                          _c("v-icon", [
                            _vm._v("$vuetify.icons.music-note-eighth"),
                          ]),
                          _vm._v(
                            "\n                    " + _vm._s(_vm.$t("Player"))
                          ),
                        ],
                        1
                      ),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-list-item",
                    {
                      on: {
                        click: function ($event) {
                          _vm.$vuetify.theme.dark = !_vm.$vuetify.theme.dark
                        },
                      },
                    },
                    [
                      _c(
                        "v-list-item-title",
                        [
                          _c("v-icon", [_vm._v("$vuetify.icons.brightness-4")]),
                          _vm._v(
                            "\n                    " +
                              _vm._s(
                                _vm.$t(
                                  (_vm.$vuetify.theme.dark ? "Light" : "Dark") +
                                    " Mode"
                                )
                              )
                          ),
                        ],
                        1
                      ),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-list-item",
                    {
                      on: {
                        click: function ($event) {
                          return _vm.$store.dispatch("logout")
                        },
                      },
                    },
                    [
                      _c(
                        "v-list-item-title",
                        [
                          _c("v-icon", [_vm._v("$vuetify.icons.logout")]),
                          _vm._v(" " + _vm._s(_vm.$t("Logout"))),
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
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/layout/Sidebar.vue?vue&type=template&id=98c1d738&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/artist/layout/Sidebar.vue?vue&type=template&id=98c1d738&scoped=true& ***!
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
  return _c(
    "v-card",
    { staticClass: "artist-list" },
    [
      _c(
        "v-list",
        { staticClass: "list", attrs: { rounded: "" } },
        [
          _c(
            "v-list-item-group",
            { attrs: { color: "primary" } },
            _vm._l(_vm.items, function (item, i) {
              return _c(
                "v-list-item",
                {
                  key: i,
                  attrs: { to: item.path, link: "" },
                  on: {
                    click: function ($event) {
                      return _vm.$emit("clickOnItem")
                    },
                  },
                },
                [
                  _c(
                    "v-list-item-icon",
                    [
                      _c("v-icon", {
                        domProps: {
                          textContent: _vm._s("$vuetify.icons." + item.icon),
                        },
                      }),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-list-item-content",
                    [
                      _c("v-list-item-title", {
                        domProps: { textContent: _vm._s(item.text) },
                      }),
                    ],
                    1
                  ),
                ],
                1
              )
            }),
            1
          ),
          _vm._v(" "),
          _c("div", { staticClass: "space_used mt-5" }, [
            _c("div", { staticClass: "highlight" }, [
              _vm._v(
                "\n                " +
                  _vm._s(_vm.$t("Space Used")) +
                  "\n            "
              ),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "space_used_value small" }, [
              _vm._v(
                "\n                " +
                  _vm._s(
                    _vm.bytesToMB(_vm.$store.getters.getArtist.used_disk_space)
                  ) +
                  " /\n                " +
                  _vm._s(_vm.$store.getters.getArtist.available_disk_space) +
                  " " +
                  _vm._s(_vm.$t("MB")) +
                  " " +
                  _vm._s(_vm.$t("used")) +
                  ".\n            "
              ),
            ]),
          ]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "space_used mt-5" },
            [
              _c(
                "router-link",
                {
                  staticClass: "router-link",
                  attrs: { to: { name: "artist.contact" } },
                },
                [
                  _vm._v(
                    "\n               " +
                      _vm._s(_vm.$t("Contact Us")) +
                      "\n           "
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
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/pages/Account.vue?vue&type=template&id=207125c5&":
/*!******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/artist/pages/Account.vue?vue&type=template&id=207125c5& ***!
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
  return _vm.artist && _vm.artist.id
    ? _c(
        "div",
        { staticClass: "new-artist-account" },
        [
          _c(
            "v-container",
            { attrs: { fluid: "" } },
            [
              _c(
                "v-row",
                [
                  _c(
                    "v-col",
                    { attrs: { cols: "12", "max-width": "800px" } },
                    [
                      _c(
                        "v-card",
                        { staticClass: "p-3" },
                        [
                          _c(
                            "v-card-title",
                            [
                              _c(
                                "v-icon",
                                {
                                  staticClass: "mr-3",
                                  attrs: { color: "primary", "x-large": "" },
                                },
                                [_vm._v("$vuetify.icons.account-music")]
                              ),
                              _vm._v(
                                "\n                        " +
                                  _vm._s(_vm.$t("Edit Personal Information")) +
                                  "\n                    "
                              ),
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
                                { staticClass: "p-2", attrs: { cols: "auto" } },
                                [
                                  _c("upload-image", {
                                    attrs: {
                                      source: _vm.artist.avatar || null,
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
                                  _c("v-text-field", {
                                    attrs: {
                                      label: _vm.$t("Firstname"),
                                      message: _vm.$t(
                                        "This is a private information."
                                      ),
                                    },
                                    model: {
                                      value: _vm.artist.firstname,
                                      callback: function ($$v) {
                                        _vm.$set(_vm.artist, "firstname", $$v)
                                      },
                                      expression: "artist.firstname",
                                    },
                                  }),
                                  _vm._v(" "),
                                  _c("v-text-field", {
                                    attrs: {
                                      label: _vm.$t("Lastname"),
                                      message: _vm.$t(
                                        "This is a private information."
                                      ),
                                    },
                                    model: {
                                      value: _vm.artist.lastname,
                                      callback: function ($$v) {
                                        _vm.$set(_vm.artist, "lastname", $$v)
                                      },
                                      expression: "artist.lastname",
                                    },
                                  }),
                                  _vm._v(" "),
                                  _c("v-text-field", {
                                    attrs: {
                                      label: _vm.$t("Displayname"),
                                      message: _vm.$t(
                                        "This name will be displayed on your profile."
                                      ),
                                    },
                                    model: {
                                      value: _vm.artist.displayname,
                                      callback: function ($$v) {
                                        _vm.$set(_vm.artist, "displayname", $$v)
                                      },
                                      expression: "artist.displayname",
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
                                  _c("v-text-field", {
                                    attrs: {
                                      label: _vm.$t("Country"),
                                      readonly: "",
                                    },
                                    model: {
                                      value: _vm.artist.country,
                                      callback: function ($$v) {
                                        _vm.$set(_vm.artist, "country", $$v)
                                      },
                                      expression: "artist.country",
                                    },
                                  }),
                                  _vm._v(" "),
                                  _c("v-text-field", {
                                    attrs: { label: _vm.$t("Address") },
                                    model: {
                                      value: _vm.artist.lastname,
                                      callback: function ($$v) {
                                        _vm.$set(_vm.artist, "lastname", $$v)
                                      },
                                      expression: "artist.lastname",
                                    },
                                  }),
                                  _vm._v(" "),
                                  _c("v-text-field", {
                                    attrs: { label: _vm.$t("Email") },
                                    model: {
                                      value: _vm.artist.email,
                                      callback: function ($$v) {
                                        _vm.$set(_vm.artist, "email", $$v)
                                      },
                                      expression: "artist.email",
                                    },
                                  }),
                                  _vm._v(" "),
                                  _c("v-text-field", {
                                    attrs: {
                                      label: _vm.$t("Phone Number"),
                                      hint: "+xxxxxxxxxx",
                                    },
                                    model: {
                                      value: _vm.artist.phone,
                                      callback: function ($$v) {
                                        _vm.$set(_vm.artist, "phone", $$v)
                                      },
                                      expression: "artist.phone",
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
                                    attrs: { item: _vm.artist, expanded: true },
                                    on: {
                                      spotify_link: function ($event) {
                                        _vm.artist.spotify_link = $event
                                      },
                                      youtube_link: function ($event) {
                                        _vm.artist.youtube_link = $event
                                      },
                                      soundcloud_link: function ($event) {
                                        _vm.artist.soundcloud_link = $event
                                      },
                                      itunes_link: function ($event) {
                                        _vm.artist.itunes_link = $event
                                      },
                                      deezer_link: function ($event) {
                                        _vm.artist.deezer_link = $event
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
                                      staticClass: "success ml-auto d-flex",
                                      attrs: {
                                        disabled: _vm.loading,
                                        loading: _vm.loading,
                                      },
                                      on: { click: _vm.save },
                                    },
                                    [_vm._v(_vm._s(_vm.$t("Save")))]
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
          ),
        ],
        1
      )
    : _c("page-loading")
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/pages/Albums.vue?vue&type=template&id=6291b8fc&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/artist/pages/Albums.vue?vue&type=template&id=6291b8fc& ***!
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
  return _c(
    "div",
    { staticClass: "albums-wrapper" },
    [
      _c(
        "v-card",
        { attrs: { outlined: "" } },
        [
          _c(
            "v-card-title",
            [
              _c("v-icon", { attrs: { color: "primary", "x-large": "" } }, [
                _vm._v("$vuetify.icons.album"),
              ]),
              _vm._v(" "),
              _c(
                "v-btn",
                {
                  staticClass: "mx-2",
                  attrs: { dark: "", small: "", color: "primary" },
                  on: {
                    click: function ($event) {
                      return _vm.editAlbum("new")
                    },
                  },
                },
                [
                  _c("v-icon", [_vm._v("$vuetify.icons.plus")]),
                  _vm._v(" " + _vm._s(_vm.$t("New")) + "\n            "),
                ],
                1
              ),
              _vm._v(" "),
              _c("v-spacer"),
              _vm._v(" "),
              _c("v-spacer"),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "admin-search-bar" },
                [
                  _c("v-text-field", {
                    attrs: {
                      "append-icon": "mdi-magnify",
                      label: _vm.$t("Search"),
                      "single-line": "",
                      "hide-details": "",
                    },
                    model: {
                      value: _vm.search,
                      callback: function ($$v) {
                        _vm.search = $$v
                      },
                      expression: "search",
                    },
                  }),
                ],
                1
              ),
            ],
            1
          ),
          _vm._v(" "),
          _c("v-data-table", {
            staticClass: "elevation-1",
            attrs: {
              "no-data-text": _vm.$t("No data available"),
              "loading-text": _vm.$t("Fetching data") + "...",
              headers: _vm.headers,
              items: _vm.albums || [],
              "items-per-page": 25,
              loading: !_vm.albums,
              search: _vm.search,
            },
            scopedSlots: _vm._u([
              {
                key: "item.cover",
                fn: function (ref) {
                  var item = ref.item
                  return [
                    _c(
                      "div",
                      { staticClass: "img-container py-2" },
                      [
                        _c("v-img", {
                          staticClass: "album-cover",
                          attrs: {
                            src: item.cover,
                            alt: item.title,
                            width: "50",
                            height: "50",
                          },
                        }),
                      ],
                      1
                    ),
                  ]
                },
              },
              {
                key: "item.artists",
                fn: function (ref) {
                  var item = ref.item
                  return [_c("artists", { attrs: { artists: item.artists } })]
                },
              },
              {
                key: "item.title",
                fn: function (ref) {
                  var item = ref.item
                  return [
                    _c(
                      "router-link",
                      {
                        staticClass: "router-link",
                        attrs: {
                          to: { name: "album", params: { id: item.id } },
                          target: "_blank",
                        },
                      },
                      [
                        _vm._v(
                          "\n                    " +
                            _vm._s(item.title) +
                            "\n                "
                        ),
                      ]
                    ),
                  ]
                },
              },
              {
                key: "item.operations",
                fn: function (ref) {
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
                          color: "info",
                        },
                        on: {
                          click: function ($event) {
                            return _vm.editAlbum(item)
                          },
                        },
                      },
                      [_c("v-icon", [_vm._v("$vuetify.icons.pencil")])],
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
                          color: "error",
                        },
                        on: {
                          click: function ($event) {
                            return _vm.deleteAlbum(item.id)
                          },
                        },
                      },
                      [_c("v-icon", [_vm._v("$vuetify.icons.delete")])],
                      1
                    ),
                  ]
                },
              },
              {
                key: "item.release_date",
                fn: function (ref) {
                  var item = ref.item
                  return [
                    _c("div", [
                      _vm._v(
                        "\n                    " +
                          _vm._s(_vm.moment(item.release_date).format("ll")) +
                          "\n                "
                      ),
                    ]),
                  ]
                },
              },
              {
                key: "item.created_at",
                fn: function (ref) {
                  var item = ref.item
                  return [
                    _c("div", [
                      _vm._v(
                        "\n                    " +
                          _vm._s(_vm.moment(item.created_at).format("ll")) +
                          "\n                "
                      ),
                    ]),
                  ]
                },
              },
            ]),
          }),
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-dialog",
        {
          attrs: {
            fullscreen: !_vm.editingAlbum.new,
            "max-width": "950",
            "no-click-animation": "",
            persistent: "",
          },
          model: {
            value: _vm.editDialog,
            callback: function ($$v) {
              _vm.editDialog = $$v
            },
            expression: "editDialog",
          },
        },
        [
          _vm.editDialog
            ? _c("edit-album-dialog", {
                attrs: { album: _vm.editingAlbum, creator: "artist" },
                on: {
                  beforeDestroy: _vm.fetchAlbums,
                  updated: _vm.albumEdited,
                  created: _vm.albumCreated,
                  close: function ($event) {
                    return _vm.editAlbum(null)
                  },
                },
              })
            : _vm._e(),
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/pages/Analytics.vue?vue&type=template&id=2953fac4&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/artist/pages/Analytics.vue?vue&type=template&id=2953fac4&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************/
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
  return _vm.stats
    ? _c(
        "div",
        { staticClass: "analytics-wrapper" },
        [
          _c(
            "v-container",
            { attrs: { fluid: "" } },
            [
              _c(
                "v-row",
                _vm._l(_vm.analyticsCards, function (card, t) {
                  return _c(
                    "v-col",
                    { key: t, attrs: { cols: "12", sm: "6", lg: "3" } },
                    [
                      _c(
                        "v-card",
                        {
                          staticClass: "analytic-info-card",
                          attrs: { rounded: "", outlined: "" },
                        },
                        [
                          _c(
                            "v-card-title",
                            [
                              _c(
                                "v-row",
                                { attrs: { justify: "space-between" } },
                                [
                                  _c("v-col", { attrs: { cols: "8" } }, [
                                    _c(
                                      "h5",
                                      {
                                        staticClass:
                                          "analytic-info-card__headline max-1-lines",
                                      },
                                      [
                                        _vm._v(
                                          "\n                                    " +
                                            _vm._s(_vm.$t(card.title)) +
                                            "\n                                "
                                        ),
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "analytic-info-card__subline",
                                      },
                                      [
                                        _vm._v(
                                          "\n                                    " +
                                            _vm._s(card.number) +
                                            "\n                                "
                                        ),
                                      ]
                                    ),
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticClass: "flex-end",
                                      attrs: { cols: "4" },
                                    },
                                    [
                                      _c(
                                        "v-avatar",
                                        [
                                          _c(
                                            "v-img",
                                            {
                                              staticClass:
                                                "d-flex justify-align-center analytics-card-icon",
                                              attrs: {
                                                gradient: card.gradient,
                                              },
                                            },
                                            [
                                              _c(
                                                "v-icon",
                                                {
                                                  attrs: {
                                                    color: "white",
                                                    large: "",
                                                  },
                                                },
                                                [
                                                  _vm._v(
                                                    "$vuetify.icons." +
                                                      _vm._s(card.icon)
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
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c("div", { staticClass: "percetage px-3 pb-2" }, [
                            _c(
                              "strong",
                              {
                                class:
                                  (card.this_month === 0
                                    ? "secondary"
                                    : "success") + "--text",
                              },
                              [
                                _vm._v(
                                  _vm._s(
                                    (card.this_month > 0 ? "+" : "") +
                                      card.this_month
                                  )
                                ),
                              ]
                            ),
                            _vm._v(" "),
                            _c("span", { staticClass: "muted" }, [
                              _vm._v(_vm._s(_vm.$t("New this month"))),
                            ]),
                          ]),
                        ],
                        1
                      ),
                    ],
                    1
                  )
                }),
                1
              ),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-container",
            { attrs: { fluid: "" } },
            [
              _c(
                "v-row",
                { staticClass: "py-5" },
                [
                  _c(
                    "v-col",
                    {
                      attrs: {
                        cols: "12",
                        sm: _vm.$store.getters.getSettings.enable_selling
                          ? 6
                          : 12,
                      },
                    },
                    [
                      _c(
                        "v-card",
                        [
                          _c(
                            "v-card-title",
                            [
                              _c(
                                "v-row",
                                [
                                  _c(
                                    "v-col",
                                    { staticClass: "flex-grow-0" },
                                    [
                                      _c(
                                        "v-icon",
                                        {
                                          staticClass: "ml-3",
                                          attrs: {
                                            color: "primary",
                                            "x-large": "",
                                          },
                                        },
                                        [_vm._v("$vuetify.icons.arrow-up")]
                                      ),
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c("v-col", [
                                    _c(
                                      "h5",
                                      {
                                        staticClass:
                                          "analytic-info-card__headline",
                                      },
                                      [
                                        _vm._v(
                                          "\n                                    " +
                                            _vm._s(_vm.$t("Popular Songs")) +
                                            "\n                                "
                                        ),
                                      ]
                                    ),
                                  ]),
                                ],
                                1
                              ),
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c("v-data-table", {
                            attrs: {
                              "no-data-text": _vm.$t("No data available"),
                              "loading-text": _vm.$t("Fetching data") + "...",
                              headers: _vm.songsTableHeaders,
                              items: _vm.popularSongs,
                              "hide-default-footer": "",
                            },
                            scopedSlots: _vm._u(
                              [
                                {
                                  key: "item.rank",
                                  fn: function (ref) {
                                    var item = ref.item
                                    return [
                                      _vm.popularSongs.indexOf(item) == 0
                                        ? _c(
                                            "span",
                                            { staticClass: "rank rank-one" },
                                            [_vm._v("1.")]
                                          )
                                        : _vm.popularSongs.indexOf(item) == 1
                                        ? _c(
                                            "span",
                                            { staticClass: "rank rank-two" },
                                            [_vm._v("2.")]
                                          )
                                        : _vm.popularSongs.indexOf(item) == 2
                                        ? _c(
                                            "span",
                                            { staticClass: "rank rank-three" },
                                            [_vm._v("3.")]
                                          )
                                        : _c("span", [
                                            _vm._v(
                                              _vm._s(
                                                _vm.popularSongs.indexOf(item)
                                              ) + "."
                                            ),
                                          ]),
                                    ]
                                  },
                                },
                                {
                                  key: "item.cover",
                                  fn: function (ref) {
                                    var item = ref.item
                                    return [
                                      _c(
                                        "div",
                                        { staticClass: "img-container py-2" },
                                        [
                                          _c("v-img", {
                                            staticClass:
                                              "user-avatar song-cover",
                                            attrs: {
                                              src: item.cover,
                                              alt: item.title,
                                              width: "50",
                                              height: "50",
                                            },
                                          }),
                                        ],
                                        1
                                      ),
                                    ]
                                  },
                                },
                                {
                                  key: "item.title",
                                  fn: function (ref) {
                                    var item = ref.item
                                    return [
                                      _c(
                                        "router-link",
                                        {
                                          staticClass: "router-link",
                                          attrs: {
                                            to: {
                                              name: "Song",
                                              params: { id: item.id },
                                            },
                                            target: "_blank",
                                          },
                                        },
                                        [
                                          _vm._v(
                                            "\n                                " +
                                              _vm._s(item.title) +
                                              "\n                            "
                                          ),
                                        ]
                                      ),
                                    ]
                                  },
                                },
                                {
                                  key: "item.artists",
                                  fn: function (ref) {
                                    var item = ref.item
                                    return [
                                      _vm._v(
                                        "\n                            " +
                                          _vm._s(_vm.getArtists(item.artists)) +
                                          "\n                        "
                                      ),
                                    ]
                                  },
                                },
                                {
                                  key: "item.created_at",
                                  fn: function (ref) {
                                    var item = ref.item
                                    return [
                                      _vm._v(
                                        "\n                            " +
                                          _vm._s(
                                            _vm
                                              .moment(item.created_at)
                                              .format("ll")
                                          ) +
                                          "\n                        "
                                      ),
                                    ]
                                  },
                                },
                              ],
                              null,
                              false,
                              1370149459
                            ),
                          }),
                        ],
                        1
                      ),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _vm.$store.getters.getSettings.enable_selling
                    ? _c(
                        "v-col",
                        { attrs: { cols: "12", sm: "6" } },
                        [
                          _c(
                            "v-card",
                            [
                              _c(
                                "v-card-title",
                                [
                                  _c(
                                    "v-row",
                                    [
                                      _c(
                                        "v-col",
                                        { staticClass: "flex-grow-0" },
                                        [
                                          _c(
                                            "v-icon",
                                            {
                                              staticClass: "ml-3",
                                              attrs: {
                                                color: "primary",
                                                "x-large": "",
                                              },
                                            },
                                            [_vm._v("$vuetify.icons.shopping")]
                                          ),
                                        ],
                                        1
                                      ),
                                      _vm._v(" "),
                                      _c("v-col", [
                                        _c(
                                          "h5",
                                          {
                                            staticClass:
                                              "analytic-info-card__headline",
                                          },
                                          [
                                            _vm._v(
                                              "\n                                    " +
                                                _vm._s(_vm.$t("New Sales")) +
                                                "\n                                "
                                            ),
                                          ]
                                        ),
                                      ]),
                                    ],
                                    1
                                  ),
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c("v-data-table", {
                                attrs: {
                                  "no-data-text": _vm.$t("No data available"),
                                  "loading-text":
                                    _vm.$t("Fetching data") + "...",
                                  headers: _vm.salesTableHeaders,
                                  items: _vm.sales,
                                  "hide-default-footer": "",
                                },
                                scopedSlots: _vm._u(
                                  [
                                    {
                                      key: "item.rank",
                                      fn: function (ref) {
                                        var item = ref.item
                                        return [
                                          _vm.sales.indexOf(item) == 0
                                            ? _c(
                                                "span",
                                                {
                                                  staticClass: "rank rank-one",
                                                },
                                                [_vm._v("1.")]
                                              )
                                            : _vm.sales.indexOf(item) == 1
                                            ? _c(
                                                "span",
                                                {
                                                  staticClass: "rank rank-two",
                                                },
                                                [_vm._v("2.")]
                                              )
                                            : _vm.sales.indexOf(item) == 2
                                            ? _c(
                                                "span",
                                                {
                                                  staticClass:
                                                    "rank rank-three",
                                                },
                                                [_vm._v("3.")]
                                              )
                                            : _c("span", [
                                                _vm._v(
                                                  _vm._s(
                                                    _vm.sales.indexOf(item)
                                                  ) + "."
                                                ),
                                              ]),
                                        ]
                                      },
                                    },
                                    {
                                      key: "item.cover",
                                      fn: function (ref) {
                                        var item = ref.item
                                        return [
                                          _c(
                                            "div",
                                            {
                                              staticClass: "img-container py-2",
                                            },
                                            [
                                              _c("v-img", {
                                                staticClass:
                                                  "user-avatar song-cover",
                                                attrs: {
                                                  src: item.cover,
                                                  alt: item.itemTitle,
                                                  width: "50",
                                                  height: "50",
                                                },
                                              }),
                                            ],
                                            1
                                          ),
                                        ]
                                      },
                                    },
                                    {
                                      key: "item.itemTitle",
                                      fn: function (ref) {
                                        var item = ref.item
                                        return [
                                          _vm._v(
                                            "\n                            " +
                                              _vm._s(item.itemTitle) +
                                              "\n                        "
                                          ),
                                        ]
                                      },
                                    },
                                    {
                                      key: "item.price",
                                      fn: function (ref) {
                                        var item = ref.item
                                        return [
                                          _c(
                                            "div",
                                            {
                                              staticClass:
                                                "price success--text bold",
                                            },
                                            [
                                              _vm._v(
                                                "\n                                " +
                                                  _vm._s(
                                                    _vm.price(
                                                      (item.amount *
                                                        item.artist_cut) /
                                                        100
                                                    ) + item.priceSymbol
                                                  ) +
                                                  "\n                            "
                                              ),
                                            ]
                                          ),
                                        ]
                                      },
                                    },
                                  ],
                                  null,
                                  false,
                                  1953205585
                                ),
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
          ),
          _vm._v(" "),
          _c(
            "v-container",
            { attrs: { fluid: "" } },
            [
              _c(
                "v-row",
                [
                  _c(
                    "v-col",
                    { attrs: { cols: "12" } },
                    [
                      _c(
                        "v-card",
                        {
                          staticClass: "chart",
                          attrs: { height: "550px", outlined: "", rounded: "" },
                        },
                        [
                          _c("v-card-title", [
                            _c(
                              "div",
                              {
                                staticClass:
                                  "flex flex-grow-1 align-center plays-chart-card-title",
                              },
                              [
                                _c(
                                  "v-icon",
                                  {
                                    staticClass: "ml-3",
                                    attrs: { color: "primary", "x-large": "" },
                                  },
                                  [_vm._v("$vuetify.icons.music-note")]
                                ),
                                _vm._v(" "),
                                _c(
                                  "h5",
                                  {
                                    staticClass: "analytic-info-card__headline",
                                  },
                                  [
                                    _vm._v(
                                      "\n                                " +
                                        _vm._s(_vm.$t("Plays Chart")) +
                                        "\n                            "
                                    ),
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "card-subline ml-2" },
                                  [
                                    _vm._v(
                                      "\n                                " +
                                        _vm._s(
                                          _vm.$t("Number of plays per interval")
                                        ) +
                                        "\n                            "
                                    ),
                                  ]
                                ),
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "flex-grow-0" },
                              [
                                _c("veutify-select", {
                                  staticClass:
                                    "ml-auto plays-chart-card-title__select",
                                  attrs: {
                                    items: _vm.timeOptions,
                                    "item-text": "name",
                                    "return-object": "",
                                    label: _vm.$t("Period"),
                                    dense: "",
                                  },
                                  on: { change: _vm.updatePlaysChart },
                                  model: {
                                    value: _vm.timeOption,
                                    callback: function ($$v) {
                                      _vm.timeOption = $$v
                                    },
                                    expression: "timeOption",
                                  },
                                }),
                              ],
                              1
                            ),
                          ]),
                          _vm._v(" "),
                          _c(
                            "div",
                            {},
                            [
                              _vm.chartPlaysData.datasets[0].data.length
                                ? _c("area-chart", {
                                    attrs: {
                                      chartdata: _vm.chartPlaysData,
                                      options: _vm.chartPlaysData.options,
                                      reset: _vm.playsChartReset,
                                    },
                                    on: {
                                      resetOver: function ($event) {
                                        _vm.playsChartReset = false
                                      },
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
      )
    : _c("page-loading")
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/pages/Contact.vue?vue&type=template&id=217ee390&":
/*!******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/artist/pages/Contact.vue?vue&type=template&id=217ee390& ***!
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
    "v-container",
    [
      _c(
        "v-card",
        {
          staticClass: "mx-auto",
          attrs: { "max-width": "800px", outlined: "" },
        },
        [
          _c("v-card-title", [_vm._v(_vm._s(_vm.$t("Contact Us")))]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "card-body pb-3" },
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
                            attrs: { label: _vm.$t("Subject"), outlined: "" },
                            model: {
                              value: _vm.contact.title,
                              callback: function ($$v) {
                                _vm.$set(_vm.contact, "title", $$v)
                              },
                              expression: "contact.title",
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
                            "div",
                            { staticClass: "message py-2" },
                            [
                              _c("div", { staticClass: "title" }, [
                                _vm._v(_vm._s(_vm.$t("Message"))),
                              ]),
                              _vm._v(" "),
                              _c("v-divider"),
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c("TextEditor", {
                            attrs: {
                              initialContent: _vm.contact.message,
                              placeholder: "Add your message here",
                            },
                            on: {
                              content: function ($event) {
                                _vm.contact.message = $event
                              },
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
                        { staticClass: "text-center" },
                        [
                          _c(
                            "v-btn",
                            {
                              staticClass: "success py-3",
                              attrs: {
                                "min-width": "100",
                                disabled: _vm.sent || _vm.loading,
                                loading: _vm.loading,
                              },
                              on: { click: _vm.sendMessage },
                            },
                            [_vm._v(_vm._s(_vm.$t("Send")))]
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/pages/Earnings.vue?vue&type=template&id=a4af097e&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/artist/pages/Earnings.vue?vue&type=template&id=a4af097e& ***!
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
  return _vm.artist && _vm.artist.id
    ? _c(
        "div",
        { staticClass: "new-artist-account" },
        [
          _c(
            "v-container",
            { attrs: { fluid: "" } },
            [
              _c(
                "v-row",
                [
                  _c(
                    "v-col",
                    { attrs: { cols: "12" } },
                    [
                      _c(
                        "v-card",
                        [
                          _c(
                            "v-card-title",
                            [
                              _c(
                                "v-icon",
                                {
                                  staticClass: "mr-3",
                                  attrs: { color: "primary", large: "" },
                                },
                                [_vm._v("$vuetify.icons.cash-account")]
                              ),
                              _vm._v(
                                "\n                        " +
                                  _vm._s(_vm.$t("Funds")) +
                                  "\n                        "
                              ),
                              _c("v-spacer"),
                              _vm._v(" "),
                              _c("v-spacer"),
                              _vm._v(" "),
                              _c(
                                "div",
                                {
                                  staticClass:
                                    "total-earnings__value price bold success--text",
                                },
                                [
                                  _vm._v(
                                    "\n                            " +
                                      _vm._s(
                                        _vm.price(_vm.artist.funds) +
                                          _vm.defaultCurrency.symbol
                                      ) +
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
                  _vm._v(" "),
                  _c(
                    "v-col",
                    { attrs: { cols: "12" } },
                    [
                      _c("v-card", [
                        _c(
                          "div",
                          { staticClass: "payouts" },
                          [
                            _c(
                              "v-card-title",
                              [
                                _c(
                                  "v-icon",
                                  {
                                    staticClass: "mr-3",
                                    attrs: { color: "primary", large: "" },
                                  },
                                  [
                                    _vm._v(
                                      "\n                                $vuetify.icons.cash-check\n                            "
                                    ),
                                  ]
                                ),
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(_vm.$t("Payouts")) +
                                    "\n                            "
                                ),
                                _c("v-spacer"),
                                _vm._v(" "),
                                _c("v-spacer"),
                                _vm._v(" "),
                                _c(
                                  "v-btn",
                                  {
                                    staticClass: "success",
                                    attrs: {
                                      small: "",
                                      disabled: !_vm.artist.funds,
                                    },
                                    on: {
                                      click: function ($event) {
                                        _vm.requestPayoutDialog = true
                                      },
                                    },
                                  },
                                  [_vm._v(_vm._s(_vm.$t("Request Payout")))]
                                ),
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c("v-simple-table", {
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
                                              { staticClass: "text-left" },
                                              [
                                                _vm._v(
                                                  "\n                                            " +
                                                    _vm._s(
                                                      _vm.$t("Payout N°")
                                                    ) +
                                                    "\n                                        "
                                                ),
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "th",
                                              { staticClass: "text-left" },
                                              [
                                                _vm._v(
                                                  "\n                                            " +
                                                    _vm._s(_vm.$t("Amount")) +
                                                    "\n                                        "
                                                ),
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "th",
                                              { staticClass: "text-left" },
                                              [
                                                _vm._v(
                                                  "\n                                            " +
                                                    _vm._s(_vm.$t("Status")) +
                                                    "\n                                        "
                                                ),
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "th",
                                              { staticClass: "text-left" },
                                              [
                                                _vm._v(
                                                  "\n                                            " +
                                                    _vm._s(_vm.$t("Details")) +
                                                    "\n                                        "
                                                ),
                                              ]
                                            ),
                                          ]),
                                        ]),
                                        _vm._v(" "),
                                        _c(
                                          "tbody",
                                          _vm._l(
                                            _vm.artist.payouts,
                                            function (payout) {
                                              return _c(
                                                "tr",
                                                { key: payout.id },
                                                [
                                                  _c(
                                                    "td",
                                                    {
                                                      staticClass: "text-left",
                                                    },
                                                    [
                                                      _vm._v(
                                                        "\n                                            " +
                                                          _vm._s(payout.id) +
                                                          "\n                                        "
                                                      ),
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "td",
                                                    {
                                                      staticClass:
                                                        "text-left bold success--price",
                                                    },
                                                    [
                                                      _vm._v(
                                                        "\n                                            " +
                                                          _vm._s(
                                                            _vm.price(
                                                              payout.amount
                                                            ) +
                                                              _vm
                                                                .defaultCurrency
                                                                .symbol
                                                          ) +
                                                          "\n                                        "
                                                      ),
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "td",
                                                    {
                                                      staticClass: "text-left",
                                                    },
                                                    [
                                                      _c(
                                                        "v-btn",
                                                        {
                                                          attrs: {
                                                            "x-small": "",
                                                            outlined: "",
                                                            color:
                                                              payout.status ===
                                                              "requested"
                                                                ? "info"
                                                                : payout.status ===
                                                                  "pending"
                                                                ? "warning"
                                                                : payout.status ===
                                                                  "cancelled"
                                                                ? "error"
                                                                : "success",
                                                          },
                                                        },
                                                        [
                                                          _vm._v(
                                                            "\n                                                " +
                                                              _vm._s(
                                                                payout.status
                                                              ) +
                                                              "\n                                            "
                                                          ),
                                                        ]
                                                      ),
                                                    ],
                                                    1
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "td",
                                                    {
                                                      staticClass: "text-left",
                                                    },
                                                    [
                                                      _vm._v(
                                                        "\n                                            " +
                                                          _vm._s(
                                                            payout.details ||
                                                              "-"
                                                          ) +
                                                          "\n                                        "
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
                                3544157281
                              ),
                            }),
                          ],
                          1
                        ),
                      ]),
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
                          _c(
                            "v-card-title",
                            [
                              _c(
                                "v-icon",
                                {
                                  staticClass: "mr-3",
                                  attrs: { color: "primary", large: "" },
                                },
                                [_vm._v("$vuetify.icons.currency-usd")]
                              ),
                              _vm._v(
                                "\n                        " +
                                  _vm._s(_vm.$t("Total Earnings")) +
                                  "\n                        "
                              ),
                              _c("v-spacer"),
                              _vm._v(" "),
                              _c("v-spacer"),
                              _vm._v(" "),
                              _c(
                                "div",
                                {
                                  staticClass:
                                    "total-earnings__value price bold success--text",
                                },
                                [
                                  _vm._v(
                                    "\n                            " +
                                      _vm._s(
                                        _vm.price(
                                          _vm.totalSalesProfit +
                                            _vm.totalRoyaltiesProfit
                                        ) + _vm.defaultCurrency.symbol
                                      ) +
                                      "\n                        "
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
                              _c("div", { staticClass: "title py-3" }, [
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(_vm.$t("Details")) +
                                    "\n                        "
                                ),
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
                                            { attrs: { cols: "12" } },
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
                                                            {
                                                              attrs: {
                                                                cols: "12",
                                                              },
                                                            },
                                                            [
                                                              _c(
                                                                "v-card-title",
                                                                [
                                                                  _vm._v(
                                                                    "\n                                                            " +
                                                                      _vm._s(
                                                                        _vm.$t(
                                                                          "Sales"
                                                                        )
                                                                      ) +
                                                                      "\n                                                            "
                                                                  ),
                                                                  _c(
                                                                    "v-spacer"
                                                                  ),
                                                                  _vm._v(" "),
                                                                  _c(
                                                                    "v-spacer"
                                                                  ),
                                                                  _vm._v(" "),
                                                                  _c(
                                                                    "div",
                                                                    {
                                                                      staticClass:
                                                                        "total-earnings__value bold price small success--text",
                                                                    },
                                                                    [
                                                                      _vm._v(
                                                                        "\n                                                                " +
                                                                          _vm._s(
                                                                            _vm.price(
                                                                              _vm.totalSalesProfit
                                                                            ) +
                                                                              _vm
                                                                                .defaultCurrency
                                                                                .symbol
                                                                          ) +
                                                                          "\n                                                            "
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
                                                            {
                                                              attrs: {
                                                                cols: "12",
                                                              },
                                                            },
                                                            [
                                                              _c(
                                                                "v-simple-table",
                                                                {
                                                                  scopedSlots:
                                                                    _vm._u(
                                                                      [
                                                                        {
                                                                          key: "default",
                                                                          fn: function () {
                                                                            return [
                                                                              _c(
                                                                                "thead",
                                                                                [
                                                                                  _c(
                                                                                    "tr",
                                                                                    [
                                                                                      _c(
                                                                                        "th",
                                                                                        {
                                                                                          staticClass:
                                                                                            "text-left",
                                                                                        },
                                                                                        [
                                                                                          _vm._v(
                                                                                            "\n                                                                            " +
                                                                                              _vm._s(
                                                                                                _vm.$t(
                                                                                                  "Product"
                                                                                                )
                                                                                              ) +
                                                                                              "\n                                                                        "
                                                                                          ),
                                                                                        ]
                                                                                      ),
                                                                                      _vm._v(
                                                                                        " "
                                                                                      ),
                                                                                      _c(
                                                                                        "th",
                                                                                        {
                                                                                          staticClass:
                                                                                            "text-left",
                                                                                        },
                                                                                        [
                                                                                          _vm._v(
                                                                                            "\n                                                                            " +
                                                                                              _vm._s(
                                                                                                _vm.$t(
                                                                                                  "License"
                                                                                                )
                                                                                              ) +
                                                                                              "\n                                                                        "
                                                                                          ),
                                                                                        ]
                                                                                      ),
                                                                                      _vm._v(
                                                                                        " "
                                                                                      ),
                                                                                      _c(
                                                                                        "th",
                                                                                        {
                                                                                          staticClass:
                                                                                            "text-left",
                                                                                        },
                                                                                        [
                                                                                          _vm._v(
                                                                                            "\n                                                                            " +
                                                                                              _vm._s(
                                                                                                _vm.$t(
                                                                                                  "Price"
                                                                                                )
                                                                                              ) +
                                                                                              "\n                                                                        "
                                                                                          ),
                                                                                        ]
                                                                                      ),
                                                                                      _vm._v(
                                                                                        " "
                                                                                      ),
                                                                                      _c(
                                                                                        "th",
                                                                                        {
                                                                                          staticClass:
                                                                                            "text-left",
                                                                                        },
                                                                                        [
                                                                                          _vm._v(
                                                                                            "\n                                                                            " +
                                                                                              _vm._s(
                                                                                                _vm.$t(
                                                                                                  "Earned"
                                                                                                )
                                                                                              ) +
                                                                                              "\n                                                                        "
                                                                                          ),
                                                                                        ]
                                                                                      ),
                                                                                    ]
                                                                                  ),
                                                                                ]
                                                                              ),
                                                                              _vm._v(
                                                                                " "
                                                                              ),
                                                                              _c(
                                                                                "tbody",
                                                                                _vm._l(
                                                                                  _vm
                                                                                    .artist
                                                                                    .sales,
                                                                                  function (
                                                                                    sale,
                                                                                    n
                                                                                  ) {
                                                                                    return _c(
                                                                                      "tr",
                                                                                      {
                                                                                        key: n,
                                                                                      },
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
                                                                                        _vm._v(
                                                                                          " "
                                                                                        ),
                                                                                        _c(
                                                                                          "td",
                                                                                          {
                                                                                            staticClass:
                                                                                              "text-left",
                                                                                          },
                                                                                          [
                                                                                            _vm._v(
                                                                                              "\n                                                                            " +
                                                                                                _vm._s(
                                                                                                  sale.priceName
                                                                                                ) +
                                                                                                "\n                                                                        "
                                                                                            ),
                                                                                          ]
                                                                                        ),
                                                                                        _vm._v(
                                                                                          " "
                                                                                        ),
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
                                                                                                  "\n                                                                                " +
                                                                                                    _vm._s(
                                                                                                      _vm.price(
                                                                                                        sale.amount
                                                                                                      ) +
                                                                                                        sale.priceSymbol
                                                                                                    ) +
                                                                                                    "\n                                                                            "
                                                                                                ),
                                                                                              ]
                                                                                            ),
                                                                                          ]
                                                                                        ),
                                                                                        _vm._v(
                                                                                          " "
                                                                                        ),
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
                                                                                                  "\n                                                                                " +
                                                                                                    _vm._s(
                                                                                                      _vm.price(
                                                                                                        (sale.amount *
                                                                                                          sale.artist_cut) /
                                                                                                          100
                                                                                                      ) +
                                                                                                        sale.priceSymbol
                                                                                                    ) +
                                                                                                    "\n                                                                            "
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
                                                                      ],
                                                                      null,
                                                                      false,
                                                                      1753896908
                                                                    ),
                                                                }
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
                                          _vm._v(" "),
                                          _c(
                                            "v-col",
                                            { attrs: { cols: "12" } },
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
                                                            {
                                                              attrs: {
                                                                cols: "12",
                                                              },
                                                            },
                                                            [
                                                              _c(
                                                                "v-card-title",
                                                                [
                                                                  _vm._v(
                                                                    "\n                                                            " +
                                                                      _vm._s(
                                                                        _vm.$t(
                                                                          "Royalties"
                                                                        )
                                                                      ) +
                                                                      "\n                                                            "
                                                                  ),
                                                                  _c(
                                                                    "v-spacer"
                                                                  ),
                                                                  _vm._v(" "),
                                                                  _c(
                                                                    "v-spacer"
                                                                  ),
                                                                  _vm._v(" "),
                                                                  _c(
                                                                    "div",
                                                                    {
                                                                      staticClass:
                                                                        "total-earnings__value price small bold success--text",
                                                                    },
                                                                    [
                                                                      _vm._v(
                                                                        "\n                                                                " +
                                                                          _vm._s(
                                                                            _vm.price(
                                                                              _vm.totalRoyaltiesProfit
                                                                            ) +
                                                                              _vm
                                                                                .defaultCurrency
                                                                                .symbol
                                                                          ) +
                                                                          "\n                                                            "
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
                                                            {
                                                              attrs: {
                                                                cols: "12",
                                                              },
                                                            },
                                                            [
                                                              _c(
                                                                "v-simple-table",
                                                                {
                                                                  scopedSlots:
                                                                    _vm._u(
                                                                      [
                                                                        {
                                                                          key: "default",
                                                                          fn: function () {
                                                                            return [
                                                                              _c(
                                                                                "thead",
                                                                                [
                                                                                  _c(
                                                                                    "tr",
                                                                                    [
                                                                                      _c(
                                                                                        "th",
                                                                                        {
                                                                                          staticClass:
                                                                                            "text-left",
                                                                                        },
                                                                                        [
                                                                                          _vm._v(
                                                                                            "\n                                                                            " +
                                                                                              _vm._s(
                                                                                                _vm.$t(
                                                                                                  "Total Plays"
                                                                                                )
                                                                                              ) +
                                                                                              "\n                                                                        "
                                                                                          ),
                                                                                        ]
                                                                                      ),
                                                                                      _vm._v(
                                                                                        " "
                                                                                      ),
                                                                                      _c(
                                                                                        "th",
                                                                                        {
                                                                                          staticClass:
                                                                                            "text-left",
                                                                                        },
                                                                                        [
                                                                                          _vm._v(
                                                                                            "\n                                                                            " +
                                                                                              _vm._s(
                                                                                                _vm.$t(
                                                                                                  "Artist Royalty"
                                                                                                )
                                                                                              ) +
                                                                                              "\n                                                                        "
                                                                                          ),
                                                                                        ]
                                                                                      ),
                                                                                      _vm._v(
                                                                                        " "
                                                                                      ),
                                                                                      _c(
                                                                                        "th",
                                                                                        {
                                                                                          staticClass:
                                                                                            "text-left",
                                                                                        },
                                                                                        [
                                                                                          _vm._v(
                                                                                            "\n                                                                            " +
                                                                                              _vm._s(
                                                                                                _vm.$t(
                                                                                                  "Total"
                                                                                                )
                                                                                              ) +
                                                                                              "\n                                                                        "
                                                                                          ),
                                                                                        ]
                                                                                      ),
                                                                                    ]
                                                                                  ),
                                                                                ]
                                                                              ),
                                                                              _vm._v(
                                                                                " "
                                                                              ),
                                                                              _c(
                                                                                "tbody",
                                                                                _vm._l(
                                                                                  _vm
                                                                                    .artist
                                                                                    .royalties,
                                                                                  function (
                                                                                    royaltyGroup,
                                                                                    i
                                                                                  ) {
                                                                                    return _c(
                                                                                      "tr",
                                                                                      {
                                                                                        key: i,
                                                                                      },
                                                                                      [
                                                                                        _c(
                                                                                          "td",
                                                                                          [
                                                                                            _vm._v(
                                                                                              "\n                                                                            " +
                                                                                                _vm._s(
                                                                                                  royaltyGroup.total_royalties
                                                                                                ) +
                                                                                                "\n                                                                        "
                                                                                            ),
                                                                                          ]
                                                                                        ),
                                                                                        _vm._v(
                                                                                          " "
                                                                                        ),
                                                                                        _c(
                                                                                          "td",
                                                                                          [
                                                                                            _vm._v(
                                                                                              "\n                                                                            " +
                                                                                                _vm._s(
                                                                                                  _vm.price(
                                                                                                    royaltyGroup.price
                                                                                                  ) +
                                                                                                    _vm
                                                                                                      .defaultCurrency
                                                                                                      .symbol
                                                                                                ) +
                                                                                                "\n                                                                            " +
                                                                                                _vm._s(
                                                                                                  "(" +
                                                                                                    _vm.$t(
                                                                                                      "for each 100 play"
                                                                                                    ) +
                                                                                                    ")"
                                                                                                ) +
                                                                                                "\n                                                                        "
                                                                                            ),
                                                                                          ]
                                                                                        ),
                                                                                        _vm._v(
                                                                                          " "
                                                                                        ),
                                                                                        _c(
                                                                                          "td",
                                                                                          [
                                                                                            _c(
                                                                                              "div",
                                                                                              {
                                                                                                staticClass:
                                                                                                  "price success--text bold",
                                                                                              },
                                                                                              [
                                                                                                _vm._v(
                                                                                                  "\n                                                                                " +
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
                                                                                                    "\n                                                                            "
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
                                                                      ],
                                                                      null,
                                                                      false,
                                                                      362024796
                                                                    ),
                                                                }
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
              ),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-dialog",
            {
              attrs: { "max-width": "500" },
              model: {
                value: _vm.requestPayoutDialog,
                callback: function ($$v) {
                  _vm.requestPayoutDialog = $$v
                },
                expression: "requestPayoutDialog",
              },
            },
            [
              _c(
                "v-card",
                [
                  _c("v-card-title", [
                    _vm._v(
                      "\n                " +
                        _vm._s(_vm.$t("Request Payout")) +
                        "\n            "
                    ),
                  ]),
                  _vm._v(" "),
                  _c("v-card-text", [
                    _c(
                      "div",
                      { staticClass: "card-content" },
                      [
                        _c(
                          "div",
                          { staticClass: "payout-option" },
                          [
                            _c("v-select", {
                              attrs: {
                                items: _vm.payoutOptions,
                                "item-text": "name",
                                label: _vm.$t("Select payout method"),
                                "item-value": "id",
                                "return-object": "",
                              },
                              model: {
                                value: _vm.artist.payout_method,
                                callback: function ($$v) {
                                  _vm.$set(_vm.artist, "payout_method", $$v)
                                },
                                expression: "artist.payout_method",
                              },
                            }),
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _vm.artist.payout_method.id
                          ? _c("v-text-field", {
                              attrs: { label: _vm.$t("Address") },
                              model: {
                                value: _vm.payoutDetails,
                                callback: function ($$v) {
                                  _vm.payoutDetails = $$v
                                },
                                expression: "payoutDetails",
                              },
                            })
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.artist.payout_method.id
                          ? _c(
                              "div",
                              { staticClass: "align-justify-center" },
                              [
                                _c("v-text-field", {
                                  staticClass: "pr-2",
                                  attrs: {
                                    label: _vm.$t(
                                      "Enter payout amount(in cents)"
                                    ),
                                    type: "number",
                                    messages:
                                      _vm.$t("Minimum") +
                                      ": " +
                                      _vm.price(
                                        _vm.artist.payout_method.minimum
                                      ) +
                                      _vm.defaultCurrency.symbol +
                                      " | " +
                                      _vm.$t("Available") +
                                      ": " +
                                      _vm.price(_vm.artist.funds) +
                                      _vm.defaultCurrency.symbol,
                                  },
                                  model: {
                                    value: _vm.artist.payoutAmount,
                                    callback: function ($$v) {
                                      _vm.$set(_vm.artist, "payoutAmount", $$v)
                                    },
                                    expression: "artist.payoutAmount",
                                  },
                                }),
                                _vm._v(" "),
                                _c("div", [
                                  _c("div", { staticClass: "plan__price" }, [
                                    _c(
                                      "div",
                                      { staticClass: "plan__price__currency" },
                                      [
                                        _vm._v(
                                          "\n                                    " +
                                            _vm._s(_vm.defaultCurrency.symbol) +
                                            "\n                                "
                                        ),
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      { staticClass: "plan__price__amount" },
                                      [
                                        _vm._v(
                                          "\n                                    " +
                                            _vm._s(
                                              _vm.price(_vm.artist.payoutAmount)
                                            ) +
                                            "\n                                "
                                        ),
                                      ]
                                    ),
                                  ]),
                                ]),
                              ],
                              1
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _c("div", {
                          staticClass: "description pt-5",
                          domProps: {
                            innerHTML: _vm._s(
                              _vm.artist.payout_method.description
                            ),
                          },
                        }),
                      ],
                      1
                    ),
                  ]),
                  _vm._v(" "),
                  _c(
                    "v-card-actions",
                    [
                      _c("v-spacer"),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          staticClass: "success",
                          attrs: {
                            loading: _vm.payoutRequestLoading,
                            disabled: _vm.payoutRequestLoading,
                          },
                          on: { click: _vm.requestPayout },
                        },
                        [_vm._v(_vm._s(_vm.$t("Request")))]
                      ),
                      _vm._v(" "),
                      _c("v-spacer"),
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
    : _c("page-loading")
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/pages/NewArtistForm.vue?vue&type=template&id=01d10f03&":
/*!************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/artist/pages/NewArtistForm.vue?vue&type=template&id=01d10f03& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "new-artist-account" },
    [
      _c("div", { staticClass: "header_and_sub_title" }, [
        _c("div", { staticClass: "header_and_sub_title__header" }, [
          _vm._v(
            "\n            " +
              _vm._s(_vm.$t("Welcome to your artist account")) +
              "\n        "
          ),
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "header_and_sub_title__sub" }, [
          _vm._v(
            "\n            " +
              _vm._s(_vm.$t("Firstly, fill your information")) +
              "\n        "
          ),
        ]),
      ]),
      _vm._v(" "),
      _c(
        "v-card",
        { staticClass: "p-3 mt-5" },
        [
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
                        _vm.artist.avatar ||
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
                      value: _vm.artist.firstname,
                      callback: function ($$v) {
                        _vm.$set(_vm.artist, "firstname", $$v)
                      },
                      expression: "artist.firstname",
                    },
                  }),
                  _vm._v(" "),
                  _c("v-text-field", {
                    attrs: { label: _vm.$t("Lastname") },
                    model: {
                      value: _vm.artist.lastname,
                      callback: function ($$v) {
                        _vm.$set(_vm.artist, "lastname", $$v)
                      },
                      expression: "artist.lastname",
                    },
                  }),
                  _vm._v(" "),
                  _c("v-text-field", {
                    attrs: {
                      label: _vm.$t("Displayname"),
                      message: "This name will be displayed on your profile.",
                    },
                    model: {
                      value: _vm.artist.displayname,
                      callback: function ($$v) {
                        _vm.$set(_vm.artist, "displayname", $$v)
                      },
                      expression: "artist.displayname",
                    },
                  }),
                  _vm._v(" "),
                  _c("v-select", {
                    attrs: {
                      label: _vm.$t("Country"),
                      items: _vm.countriesList,
                    },
                    model: {
                      value: _vm.artist.country,
                      callback: function ($$v) {
                        _vm.$set(_vm.artist, "country", $$v)
                      },
                      expression: "artist.country",
                    },
                  }),
                  _vm._v(" "),
                  _c("v-text-field", {
                    attrs: { label: _vm.$t("Address") },
                    model: {
                      value: _vm.artist.address,
                      callback: function ($$v) {
                        _vm.$set(_vm.artist, "address", $$v)
                      },
                      expression: "artist.address",
                    },
                  }),
                  _vm._v(" "),
                  _c("v-text-field", {
                    attrs: { label: _vm.$t("Email") },
                    model: {
                      value: _vm.artist.email,
                      callback: function ($$v) {
                        _vm.$set(_vm.artist, "email", $$v)
                      },
                      expression: "artist.email",
                    },
                  }),
                  _vm._v(" "),
                  _c("v-text-field", {
                    attrs: {
                      label: _vm.$t("Phone Number"),
                      hint: "+xxxxxxxxxx",
                    },
                    model: {
                      value: _vm.artist.phone,
                      callback: function ($$v) {
                        _vm.$set(_vm.artist, "phone", $$v)
                      },
                      expression: "artist.phone",
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
                    attrs: { item: _vm.artist, expanded: true },
                    on: {
                      spotify_link: function ($event) {
                        _vm.artist.spotify_link = $event
                      },
                      youtube_link: function ($event) {
                        _vm.artist.youtube_link = $event
                      },
                      soundcloud_link: function ($event) {
                        _vm.artist.soundcloud_link = $event
                      },
                      itunes_link: function ($event) {
                        _vm.artist.itunes_link = $event
                      },
                      deezer_link: function ($event) {
                        _vm.artist.deezer_link = $event
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
                      staticClass: "success ml-auto d-flex",
                      attrs: { loading: _vm.loading, disabled: _vm.loading },
                      on: { click: _vm.save },
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
                    [_vm._v(_vm._s(_vm.$t("Save")))]
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/pages/Podcasts.vue?vue&type=template&id=4b7c2987&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/artist/pages/Podcasts.vue?vue&type=template&id=4b7c2987& ***!
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
    "div",
    { staticClass: "podcasts-wrapper" },
    [
      !_vm.$store.getters.getSettings.enablePodcasts
        ? _c("disabled-page", {
            attrs: { text: _vm.$t("Podcasts are disabled.") },
          })
        : _vm._e(),
      _vm._v(" "),
      _c(
        "v-card",
        { attrs: { outlined: "" } },
        [
          _c(
            "v-card-title",
            [
              _c("v-icon", { attrs: { color: "primary", "x-large": "" } }, [
                _vm._v("$vuetify.icons.podcast"),
              ]),
              _vm._v(" "),
              _c(
                "v-btn",
                {
                  staticClass: "mx-2",
                  attrs: { dark: "", small: "", color: "primary" },
                  on: {
                    click: function ($event) {
                      return _vm.editPodcast("new")
                    },
                  },
                },
                [
                  _c("v-icon", [_vm._v("$vuetify.icons.plus")]),
                  _vm._v(" " + _vm._s(_vm.$t("New")) + "\n      "),
                ],
                1
              ),
              _vm._v(" "),
              _c("v-spacer"),
              _vm._v(" "),
              _c("v-spacer"),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "admin-search-bar" },
                [
                  _c("v-text-field", {
                    attrs: {
                      "append-icon": "mdi-magnify",
                      label: _vm.$t("Search"),
                      "single-line": "",
                      "hide-details": "",
                    },
                    model: {
                      value: _vm.search,
                      callback: function ($$v) {
                        _vm.search = $$v
                      },
                      expression: "search",
                    },
                  }),
                ],
                1
              ),
            ],
            1
          ),
          _vm._v(" "),
          _c("v-data-table", {
            staticClass: "elevation-1",
            attrs: {
              "no-data-text": _vm.$t("No data available"),
              "loading-text": _vm.$t("Fetching data") + "...",
              headers: _vm.headers,
              items: _vm.podcasts || [],
              "items-per-page": 25,
              loading: !_vm.podcasts,
              search: _vm.search,
            },
            scopedSlots: _vm._u([
              {
                key: "item.cover",
                fn: function (ref) {
                  var item = ref.item
                  return [
                    _c(
                      "div",
                      { staticClass: "img-container py-2" },
                      [
                        _c("v-img", {
                          staticClass: "user-avatar podcast-cover",
                          attrs: {
                            src: item.cover,
                            alt: item.title,
                            width: "50",
                            height: "50",
                          },
                        }),
                      ],
                      1
                    ),
                  ]
                },
              },
              {
                key: "item.title",
                fn: function (ref) {
                  var item = ref.item
                  return [
                    _c(
                      "router-link",
                      {
                        staticClass: "router-link",
                        attrs: {
                          to: { name: "podcast", params: { id: item.id } },
                          target: "_blank",
                        },
                      },
                      [
                        _vm._v(
                          "\n          " + _vm._s(item.title) + "\n        "
                        ),
                      ]
                    ),
                  ]
                },
              },
              {
                key: "item.operations",
                fn: function (ref) {
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
                          color: "info",
                        },
                        on: {
                          click: function ($event) {
                            return _vm.editPodcast(item)
                          },
                        },
                      },
                      [_c("v-icon", [_vm._v("$vuetify.icons.pencil")])],
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
                          color: "error",
                        },
                        on: {
                          click: function ($event) {
                            return _vm.deletePodcast(item.id)
                          },
                        },
                      },
                      [_c("v-icon", [_vm._v("$vuetify.icons.delete")])],
                      1
                    ),
                  ]
                },
              },
              {
                key: "item.release_date",
                fn: function (ref) {
                  var item = ref.item
                  return [
                    _c("div", [
                      _vm._v(
                        "\n          " +
                          _vm._s(_vm.moment(item.release_date).format("ll")) +
                          "\n        "
                      ),
                    ]),
                  ]
                },
              },
              {
                key: "item.created_at",
                fn: function (ref) {
                  var item = ref.item
                  return [
                    _c("div", [
                      _vm._v(
                        "\n          " +
                          _vm._s(_vm.moment(item.created_at).format("ll")) +
                          "\n        "
                      ),
                    ]),
                  ]
                },
              },
            ]),
          }),
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-dialog",
        {
          attrs: {
            fullscreen: !_vm.editingPodcast.new,
            "max-width": "950",
            "no-click-animation": "",
            persistent: "",
          },
          model: {
            value: _vm.editDialog,
            callback: function ($$v) {
              _vm.editDialog = $$v
            },
            expression: "editDialog",
          },
        },
        [
          _vm.editDialog
            ? _c("edit-podcast-dialog", {
                attrs: { creator: "artist", podcast: _vm.editingPodcast },
                on: {
                  updated: _vm.podcastEdited,
                  created: _vm.podcastCreated,
                  close: function ($event) {
                    return _vm.editPodcast(null)
                  },
                },
              })
            : _vm._e(),
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/pages/Songs.vue?vue&type=template&id=8fac4dd4&":
/*!****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--12-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/artist/pages/Songs.vue?vue&type=template&id=8fac4dd4& ***!
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
  return _c(
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
              _c("v-icon", { attrs: { color: "primary", "x-large": "" } }, [
                _vm._v("$vuetify.icons.music-note"),
              ]),
              _vm._v(" "),
              _c(
                "v-btn",
                {
                  staticClass: "mx-2",
                  attrs: { dark: "", small: "", color: "primary" },
                  on: {
                    click: function ($event) {
                      return _vm.editSong("new")
                    },
                  },
                },
                [
                  _c("v-icon", [_vm._v("$vuetify.icons.plus")]),
                  _vm._v(
                    "\n                " +
                      _vm._s(_vm.$t("New")) +
                      "\n            "
                  ),
                ],
                1
              ),
              _vm._v(" "),
              _c("v-spacer"),
              _vm._v(" "),
              _c("v-spacer"),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "admin-search-bar" },
                [
                  _c("v-text-field", {
                    attrs: {
                      "append-icon": "mdi-magnify",
                      label: _vm.$t("Search"),
                      "single-line": "",
                      "hide-details": "",
                    },
                    model: {
                      value: _vm.search,
                      callback: function ($$v) {
                        _vm.search = $$v
                      },
                      expression: "search",
                    },
                  }),
                ],
                1
              ),
            ],
            1
          ),
          _vm._v(" "),
          _c("v-data-table", {
            staticClass: "elevation-1",
            attrs: {
              "no-data-text": _vm.$t("No data available"),
              "loading-text": _vm.$t("Fetching data") + "...",
              headers: _vm.headers,
              items: _vm.songs || [],
              loading: !_vm.songs,
              "items-per-page": 25,
              search: _vm.search,
            },
            scopedSlots: _vm._u([
              {
                key: "item.cover",
                fn: function (ref) {
                  var item = ref.item
                  return [
                    _c(
                      "div",
                      { staticClass: "img-container py-2" },
                      [
                        _c(
                          "v-img",
                          {
                            staticClass: "user-avatar song-cover",
                            attrs: {
                              src:
                                (item.cover && item.cover.image) || item.cover,
                              alt: item.title,
                              width: "50",
                              height: "50",
                            },
                          },
                          [
                            item.progress != null && item.progress < 100
                              ? _c(
                                  "div",
                                  { staticClass: "upload-percentage" },
                                  [
                                    _c(
                                      "div",
                                      { staticClass: "content-text" },
                                      [
                                        item.progress < 99
                                          ? [
                                              _vm._v(
                                                "\n                                    " +
                                                  _vm._s(item.progress) +
                                                  "%\n                                "
                                              ),
                                            ]
                                          : [
                                              _c("v-progress-circular", {
                                                attrs: {
                                                  size: 15,
                                                  width: 3,
                                                  color: "grey",
                                                  indeterminate: "",
                                                },
                                              }),
                                            ],
                                      ],
                                      2
                                    ),
                                  ]
                                )
                              : _vm._e(),
                          ]
                        ),
                      ],
                      1
                    ),
                  ]
                },
              },
              {
                key: "item.title",
                fn: function (ref) {
                  var item = ref.item
                  return [
                    _c(
                      "router-link",
                      {
                        staticClass: "router-link",
                        attrs: {
                          to: { name: "song", params: { id: item.id } },
                          target: "_blank",
                        },
                      },
                      [
                        _vm._v(
                          "\n                    " +
                            _vm._s(item.title) +
                            "\n                "
                        ),
                      ]
                    ),
                  ]
                },
              },
              {
                key: "item.operations",
                fn: function (ref) {
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
                          color: "info",
                        },
                        on: {
                          click: function ($event) {
                            return _vm.editSong(item)
                          },
                        },
                      },
                      [
                        _c(
                          "v-icon",
                          {
                            attrs: {
                              dark:
                                _vm.$store.state.darkTheme ||
                                _vm.$store.getters.getSettings.defaultTheme ==
                                  "dark",
                            },
                          },
                          [_vm._v("$vuetify.icons.pencil")]
                        ),
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
                          color: "error",
                        },
                        on: {
                          click: function ($event) {
                            return _vm.deleteSong(item.id)
                          },
                        },
                      },
                      [_c("v-icon", [_vm._v("$vuetify.icons.delete")])],
                      1
                    ),
                  ]
                },
              },
              {
                key: "item.artists",
                fn: function (ref) {
                  var item = ref.item
                  return [_c("artists", { attrs: { artists: item.artists } })]
                },
              },
              {
                key: "item.created_at",
                fn: function (ref) {
                  var item = ref.item
                  return [
                    _vm._v(
                      "\n                " +
                        _vm._s(_vm.moment(item.created_at).format("ll")) +
                        "\n            "
                    ),
                  ]
                },
              },
            ]),
          }),
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-dialog",
        {
          attrs: { persistent: "", "max-width": "950" },
          on: { "click:outside": _vm.hideAllsongs },
          model: {
            value: _vm.editDialog,
            callback: function ($$v) {
              _vm.editDialog = $$v
            },
            expression: "editDialog",
          },
        },
        [
          _vm._l(_vm.songs, function (song) {
            return [
              song.isActive
                ? _c("edit-song-dialog", {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.isShowing(song.id),
                        expression: "isShowing(song.id)",
                      },
                    ],
                    key: song.id,
                    attrs: { uploader: "artist", song: song },
                    on: {
                      updated: function ($event) {
                        return _vm.songEdited(song.id)
                      },
                      progress: function ($event) {
                        return _vm.updateProgress($event, song.id)
                      },
                      created: _vm.songCreated,
                      close: function ($event) {
                        return _vm.closeSong(song.id)
                      },
                      sleep: function ($event) {
                        return _vm.sleepSongDialog(song.id)
                      },
                      wake: function ($event) {
                        return _vm.wakeSongDialog(song.id)
                      },
                    },
                  })
                : _vm._e(),
            ]
          }),
        ],
        2
      ),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/artist/layout/Master.vue":
/*!**********************************************************!*\
  !*** ./resources/js/components/artist/layout/Master.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Master_vue_vue_type_template_id_a3fbacec_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Master.vue?vue&type=template&id=a3fbacec&scoped=true& */ "./resources/js/components/artist/layout/Master.vue?vue&type=template&id=a3fbacec&scoped=true&");
/* harmony import */ var _Master_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Master.vue?vue&type=script&lang=js& */ "./resources/js/components/artist/layout/Master.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Master_vue_vue_type_style_index_0_id_a3fbacec_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Master.vue?vue&type=style&index=0&id=a3fbacec&lang=scss&scoped=true& */ "./resources/js/components/artist/layout/Master.vue?vue&type=style&index=0&id=a3fbacec&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Master_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Master_vue_vue_type_template_id_a3fbacec_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Master_vue_vue_type_template_id_a3fbacec_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "a3fbacec",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/artist/layout/Master.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/artist/layout/Master.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/artist/layout/Master.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Master_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Master.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/layout/Master.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Master_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/artist/layout/Master.vue?vue&type=style&index=0&id=a3fbacec&lang=scss&scoped=true&":
/*!********************************************************************************************************************!*\
  !*** ./resources/js/components/artist/layout/Master.vue?vue&type=style&index=0&id=a3fbacec&lang=scss&scoped=true& ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Master_vue_vue_type_style_index_0_id_a3fbacec_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Master.vue?vue&type=style&index=0&id=a3fbacec&lang=scss&scoped=true& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/layout/Master.vue?vue&type=style&index=0&id=a3fbacec&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Master_vue_vue_type_style_index_0_id_a3fbacec_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Master_vue_vue_type_style_index_0_id_a3fbacec_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Master_vue_vue_type_style_index_0_id_a3fbacec_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Master_vue_vue_type_style_index_0_id_a3fbacec_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/components/artist/layout/Master.vue?vue&type=template&id=a3fbacec&scoped=true&":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/components/artist/layout/Master.vue?vue&type=template&id=a3fbacec&scoped=true& ***!
  \*****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Master_vue_vue_type_template_id_a3fbacec_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Master.vue?vue&type=template&id=a3fbacec&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/layout/Master.vue?vue&type=template&id=a3fbacec&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Master_vue_vue_type_template_id_a3fbacec_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Master_vue_vue_type_template_id_a3fbacec_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/artist/layout/Navbar.vue":
/*!**********************************************************!*\
  !*** ./resources/js/components/artist/layout/Navbar.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Navbar_vue_vue_type_template_id_1aeb9438___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Navbar.vue?vue&type=template&id=1aeb9438& */ "./resources/js/components/artist/layout/Navbar.vue?vue&type=template&id=1aeb9438&");
/* harmony import */ var _Navbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Navbar.vue?vue&type=script&lang=js& */ "./resources/js/components/artist/layout/Navbar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vuetify_lib_components_VAppBar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify/lib/components/VAppBar */ "./node_modules/vuetify/lib/components/VAppBar/index.js");
/* harmony import */ var vuetify_lib_components_VAvatar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VAvatar */ "./node_modules/vuetify/lib/components/VAvatar/index.js");
/* harmony import */ var vuetify_lib_components_VBadge__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VBadge */ "./node_modules/vuetify/lib/components/VBadge/index.js");
/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ "./node_modules/vuetify/lib/components/VBtn/index.js");
/* harmony import */ var vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VCard */ "./node_modules/vuetify/lib/components/VCard/index.js");
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/index.js");
/* harmony import */ var vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vuetify/lib/components/VImg */ "./node_modules/vuetify/lib/components/VImg/index.js");
/* harmony import */ var vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! vuetify/lib/components/VList */ "./node_modules/vuetify/lib/components/VList/index.js");
/* harmony import */ var vuetify_lib_components_VMenu__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! vuetify/lib/components/VMenu */ "./node_modules/vuetify/lib/components/VMenu/index.js");
/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ "./node_modules/vuetify/lib/components/VGrid/index.js");
/* harmony import */ var vuetify_lib_components_VToolbar__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! vuetify/lib/components/VToolbar */ "./node_modules/vuetify/lib/components/VToolbar/index.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Navbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Navbar_vue_vue_type_template_id_1aeb9438___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Navbar_vue_vue_type_template_id_1aeb9438___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* vuetify-loader */















_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default()(component, {VAppBar: vuetify_lib_components_VAppBar__WEBPACK_IMPORTED_MODULE_4__["VAppBar"],VAppBarNavIcon: vuetify_lib_components_VAppBar__WEBPACK_IMPORTED_MODULE_4__["VAppBarNavIcon"],VAvatar: vuetify_lib_components_VAvatar__WEBPACK_IMPORTED_MODULE_5__["VAvatar"],VBadge: vuetify_lib_components_VBadge__WEBPACK_IMPORTED_MODULE_6__["VBadge"],VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_7__["VBtn"],VCard: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_8__["VCard"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_9__["VIcon"],VImg: vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_10__["VImg"],VList: vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_11__["VList"],VListItem: vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_11__["VListItem"],VListItemTitle: vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_11__["VListItemTitle"],VMenu: vuetify_lib_components_VMenu__WEBPACK_IMPORTED_MODULE_12__["VMenu"],VSpacer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_13__["VSpacer"],VToolbarTitle: vuetify_lib_components_VToolbar__WEBPACK_IMPORTED_MODULE_14__["VToolbarTitle"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/artist/layout/Navbar.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/artist/layout/Navbar.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/artist/layout/Navbar.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Navbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Navbar.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/layout/Navbar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Navbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/artist/layout/Navbar.vue?vue&type=template&id=1aeb9438&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/artist/layout/Navbar.vue?vue&type=template&id=1aeb9438& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Navbar_vue_vue_type_template_id_1aeb9438___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Navbar.vue?vue&type=template&id=1aeb9438& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/layout/Navbar.vue?vue&type=template&id=1aeb9438&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Navbar_vue_vue_type_template_id_1aeb9438___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Navbar_vue_vue_type_template_id_1aeb9438___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/artist/layout/Sidebar.vue":
/*!***********************************************************!*\
  !*** ./resources/js/components/artist/layout/Sidebar.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Sidebar_vue_vue_type_template_id_98c1d738_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sidebar.vue?vue&type=template&id=98c1d738&scoped=true& */ "./resources/js/components/artist/layout/Sidebar.vue?vue&type=template&id=98c1d738&scoped=true&");
/* harmony import */ var _Sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Sidebar.vue?vue&type=script&lang=js& */ "./resources/js/components/artist/layout/Sidebar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Sidebar_vue_vue_type_style_index_0_id_98c1d738_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Sidebar.vue?vue&type=style&index=0&id=98c1d738&lang=scss&scoped=true& */ "./resources/js/components/artist/layout/Sidebar.vue?vue&type=style&index=0&id=98c1d738&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VCard */ "./node_modules/vuetify/lib/components/VCard/index.js");
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/index.js");
/* harmony import */ var vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VList */ "./node_modules/vuetify/lib/components/VList/index.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Sidebar_vue_vue_type_template_id_98c1d738_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Sidebar_vue_vue_type_template_id_98c1d738_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "98c1d738",
  null
  
)

/* vuetify-loader */









_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default()(component, {VCard: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__["VCard"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_6__["VIcon"],VList: vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_7__["VList"],VListItem: vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_7__["VListItem"],VListItemContent: vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_7__["VListItemContent"],VListItemGroup: vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_7__["VListItemGroup"],VListItemIcon: vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_7__["VListItemIcon"],VListItemTitle: vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_7__["VListItemTitle"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/artist/layout/Sidebar.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/artist/layout/Sidebar.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/components/artist/layout/Sidebar.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Sidebar.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/layout/Sidebar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/artist/layout/Sidebar.vue?vue&type=style&index=0&id=98c1d738&lang=scss&scoped=true&":
/*!*********************************************************************************************************************!*\
  !*** ./resources/js/components/artist/layout/Sidebar.vue?vue&type=style&index=0&id=98c1d738&lang=scss&scoped=true& ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_style_index_0_id_98c1d738_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Sidebar.vue?vue&type=style&index=0&id=98c1d738&lang=scss&scoped=true& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/layout/Sidebar.vue?vue&type=style&index=0&id=98c1d738&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_style_index_0_id_98c1d738_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_style_index_0_id_98c1d738_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_style_index_0_id_98c1d738_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_style_index_0_id_98c1d738_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/components/artist/layout/Sidebar.vue?vue&type=template&id=98c1d738&scoped=true&":
/*!******************************************************************************************************!*\
  !*** ./resources/js/components/artist/layout/Sidebar.vue?vue&type=template&id=98c1d738&scoped=true& ***!
  \******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_template_id_98c1d738_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Sidebar.vue?vue&type=template&id=98c1d738&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/layout/Sidebar.vue?vue&type=template&id=98c1d738&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_template_id_98c1d738_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_template_id_98c1d738_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/artist/pages/Account.vue":
/*!**********************************************************!*\
  !*** ./resources/js/components/artist/pages/Account.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Account_vue_vue_type_template_id_207125c5___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Account.vue?vue&type=template&id=207125c5& */ "./resources/js/components/artist/pages/Account.vue?vue&type=template&id=207125c5&");
/* harmony import */ var _Account_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Account.vue?vue&type=script&lang=js& */ "./resources/js/components/artist/pages/Account.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ "./node_modules/vuetify/lib/components/VBtn/index.js");
/* harmony import */ var vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VCard */ "./node_modules/vuetify/lib/components/VCard/index.js");
/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ "./node_modules/vuetify/lib/components/VGrid/index.js");
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/index.js");
/* harmony import */ var vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VTextField */ "./node_modules/vuetify/lib/components/VTextField/index.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Account_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Account_vue_vue_type_template_id_207125c5___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Account_vue_vue_type_template_id_207125c5___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* vuetify-loader */









_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default()(component, {VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__["VBtn"],VCard: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__["VCard"],VCardTitle: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__["VCardTitle"],VCol: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__["VCol"],VContainer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__["VContainer"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_7__["VIcon"],VRow: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__["VRow"],VTextField: vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_8__["VTextField"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/artist/pages/Account.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/artist/pages/Account.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/artist/pages/Account.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Account_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Account.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/pages/Account.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Account_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/artist/pages/Account.vue?vue&type=template&id=207125c5&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/artist/pages/Account.vue?vue&type=template&id=207125c5& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Account_vue_vue_type_template_id_207125c5___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Account.vue?vue&type=template&id=207125c5& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/pages/Account.vue?vue&type=template&id=207125c5&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Account_vue_vue_type_template_id_207125c5___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Account_vue_vue_type_template_id_207125c5___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/artist/pages/Albums.vue":
/*!*********************************************************!*\
  !*** ./resources/js/components/artist/pages/Albums.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Albums_vue_vue_type_template_id_6291b8fc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Albums.vue?vue&type=template&id=6291b8fc& */ "./resources/js/components/artist/pages/Albums.vue?vue&type=template&id=6291b8fc&");
/* harmony import */ var _Albums_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Albums.vue?vue&type=script&lang=js& */ "./resources/js/components/artist/pages/Albums.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ "./node_modules/vuetify/lib/components/VBtn/index.js");
/* harmony import */ var vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VCard */ "./node_modules/vuetify/lib/components/VCard/index.js");
/* harmony import */ var vuetify_lib_components_VDataTable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VDataTable */ "./node_modules/vuetify/lib/components/VDataTable/index.js");
/* harmony import */ var vuetify_lib_components_VDialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VDialog */ "./node_modules/vuetify/lib/components/VDialog/index.js");
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/index.js");
/* harmony import */ var vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuetify/lib/components/VImg */ "./node_modules/vuetify/lib/components/VImg/index.js");
/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ "./node_modules/vuetify/lib/components/VGrid/index.js");
/* harmony import */ var vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! vuetify/lib/components/VTextField */ "./node_modules/vuetify/lib/components/VTextField/index.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Albums_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Albums_vue_vue_type_template_id_6291b8fc___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Albums_vue_vue_type_template_id_6291b8fc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* vuetify-loader */










_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default()(component, {VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__["VBtn"],VCard: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__["VCard"],VCardTitle: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__["VCardTitle"],VDataTable: vuetify_lib_components_VDataTable__WEBPACK_IMPORTED_MODULE_6__["VDataTable"],VDialog: vuetify_lib_components_VDialog__WEBPACK_IMPORTED_MODULE_7__["VDialog"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_8__["VIcon"],VImg: vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_9__["VImg"],VSpacer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_10__["VSpacer"],VTextField: vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_11__["VTextField"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/artist/pages/Albums.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/artist/pages/Albums.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/artist/pages/Albums.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Albums_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Albums.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/pages/Albums.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Albums_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/artist/pages/Albums.vue?vue&type=template&id=6291b8fc&":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/artist/pages/Albums.vue?vue&type=template&id=6291b8fc& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Albums_vue_vue_type_template_id_6291b8fc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Albums.vue?vue&type=template&id=6291b8fc& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/pages/Albums.vue?vue&type=template&id=6291b8fc&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Albums_vue_vue_type_template_id_6291b8fc___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Albums_vue_vue_type_template_id_6291b8fc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/artist/pages/Analytics.vue":
/*!************************************************************!*\
  !*** ./resources/js/components/artist/pages/Analytics.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Analytics_vue_vue_type_template_id_2953fac4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Analytics.vue?vue&type=template&id=2953fac4&scoped=true& */ "./resources/js/components/artist/pages/Analytics.vue?vue&type=template&id=2953fac4&scoped=true&");
/* harmony import */ var _Analytics_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Analytics.vue?vue&type=script&lang=js& */ "./resources/js/components/artist/pages/Analytics.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Analytics_vue_vue_type_style_index_0_id_2953fac4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Analytics.vue?vue&type=style&index=0&id=2953fac4&lang=scss&scoped=true& */ "./resources/js/components/artist/pages/Analytics.vue?vue&type=style&index=0&id=2953fac4&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var vuetify_lib_components_VAvatar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VAvatar */ "./node_modules/vuetify/lib/components/VAvatar/index.js");
/* harmony import */ var vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VCard */ "./node_modules/vuetify/lib/components/VCard/index.js");
/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ "./node_modules/vuetify/lib/components/VGrid/index.js");
/* harmony import */ var vuetify_lib_components_VDataTable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VDataTable */ "./node_modules/vuetify/lib/components/VDataTable/index.js");
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/index.js");
/* harmony import */ var vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vuetify/lib/components/VImg */ "./node_modules/vuetify/lib/components/VImg/index.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Analytics_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Analytics_vue_vue_type_template_id_2953fac4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Analytics_vue_vue_type_template_id_2953fac4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "2953fac4",
  null
  
)

/* vuetify-loader */










_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default()(component, {VAvatar: vuetify_lib_components_VAvatar__WEBPACK_IMPORTED_MODULE_5__["VAvatar"],VCard: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__["VCard"],VCardTitle: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__["VCardTitle"],VCol: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_7__["VCol"],VContainer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_7__["VContainer"],VDataTable: vuetify_lib_components_VDataTable__WEBPACK_IMPORTED_MODULE_8__["VDataTable"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_9__["VIcon"],VImg: vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_10__["VImg"],VRow: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_7__["VRow"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/artist/pages/Analytics.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/artist/pages/Analytics.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/js/components/artist/pages/Analytics.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Analytics_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Analytics.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/pages/Analytics.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Analytics_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/artist/pages/Analytics.vue?vue&type=style&index=0&id=2953fac4&lang=scss&scoped=true&":
/*!**********************************************************************************************************************!*\
  !*** ./resources/js/components/artist/pages/Analytics.vue?vue&type=style&index=0&id=2953fac4&lang=scss&scoped=true& ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Analytics_vue_vue_type_style_index_0_id_2953fac4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Analytics.vue?vue&type=style&index=0&id=2953fac4&lang=scss&scoped=true& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/pages/Analytics.vue?vue&type=style&index=0&id=2953fac4&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Analytics_vue_vue_type_style_index_0_id_2953fac4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Analytics_vue_vue_type_style_index_0_id_2953fac4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Analytics_vue_vue_type_style_index_0_id_2953fac4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Analytics_vue_vue_type_style_index_0_id_2953fac4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/components/artist/pages/Analytics.vue?vue&type=template&id=2953fac4&scoped=true&":
/*!*******************************************************************************************************!*\
  !*** ./resources/js/components/artist/pages/Analytics.vue?vue&type=template&id=2953fac4&scoped=true& ***!
  \*******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Analytics_vue_vue_type_template_id_2953fac4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Analytics.vue?vue&type=template&id=2953fac4&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/pages/Analytics.vue?vue&type=template&id=2953fac4&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Analytics_vue_vue_type_template_id_2953fac4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Analytics_vue_vue_type_template_id_2953fac4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/artist/pages/Contact.vue":
/*!**********************************************************!*\
  !*** ./resources/js/components/artist/pages/Contact.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Contact_vue_vue_type_template_id_217ee390___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Contact.vue?vue&type=template&id=217ee390& */ "./resources/js/components/artist/pages/Contact.vue?vue&type=template&id=217ee390&");
/* harmony import */ var _Contact_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Contact.vue?vue&type=script&lang=js& */ "./resources/js/components/artist/pages/Contact.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ "./node_modules/vuetify/lib/components/VBtn/index.js");
/* harmony import */ var vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VCard */ "./node_modules/vuetify/lib/components/VCard/index.js");
/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ "./node_modules/vuetify/lib/components/VGrid/index.js");
/* harmony import */ var vuetify_lib_components_VDivider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VDivider */ "./node_modules/vuetify/lib/components/VDivider/index.js");
/* harmony import */ var vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VTextField */ "./node_modules/vuetify/lib/components/VTextField/index.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Contact_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Contact_vue_vue_type_template_id_217ee390___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Contact_vue_vue_type_template_id_217ee390___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* vuetify-loader */









_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default()(component, {VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__["VBtn"],VCard: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__["VCard"],VCardTitle: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__["VCardTitle"],VCol: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__["VCol"],VContainer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__["VContainer"],VDivider: vuetify_lib_components_VDivider__WEBPACK_IMPORTED_MODULE_7__["VDivider"],VRow: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__["VRow"],VTextField: vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_8__["VTextField"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/artist/pages/Contact.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/artist/pages/Contact.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/artist/pages/Contact.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Contact_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Contact.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/pages/Contact.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Contact_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/artist/pages/Contact.vue?vue&type=template&id=217ee390&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/artist/pages/Contact.vue?vue&type=template&id=217ee390& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Contact_vue_vue_type_template_id_217ee390___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Contact.vue?vue&type=template&id=217ee390& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/pages/Contact.vue?vue&type=template&id=217ee390&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Contact_vue_vue_type_template_id_217ee390___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Contact_vue_vue_type_template_id_217ee390___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/artist/pages/Earnings.vue":
/*!***********************************************************!*\
  !*** ./resources/js/components/artist/pages/Earnings.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Earnings_vue_vue_type_template_id_a4af097e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Earnings.vue?vue&type=template&id=a4af097e& */ "./resources/js/components/artist/pages/Earnings.vue?vue&type=template&id=a4af097e&");
/* harmony import */ var _Earnings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Earnings.vue?vue&type=script&lang=js& */ "./resources/js/components/artist/pages/Earnings.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ "./node_modules/vuetify/lib/components/VBtn/index.js");
/* harmony import */ var vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VCard */ "./node_modules/vuetify/lib/components/VCard/index.js");
/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ "./node_modules/vuetify/lib/components/VGrid/index.js");
/* harmony import */ var vuetify_lib_components_VDialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VDialog */ "./node_modules/vuetify/lib/components/VDialog/index.js");
/* harmony import */ var vuetify_lib_components_VDivider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VDivider */ "./node_modules/vuetify/lib/components/VDivider/index.js");
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/index.js");
/* harmony import */ var vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vuetify/lib/components/VList */ "./node_modules/vuetify/lib/components/VList/index.js");
/* harmony import */ var vuetify_lib_components_VSelect__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! vuetify/lib/components/VSelect */ "./node_modules/vuetify/lib/components/VSelect/index.js");
/* harmony import */ var vuetify_lib_components_VDataTable__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! vuetify/lib/components/VDataTable */ "./node_modules/vuetify/lib/components/VDataTable/index.js");
/* harmony import */ var vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! vuetify/lib/components/VTextField */ "./node_modules/vuetify/lib/components/VTextField/index.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Earnings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Earnings_vue_vue_type_template_id_a4af097e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Earnings_vue_vue_type_template_id_a4af097e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* vuetify-loader */




















_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default()(component, {VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__["VBtn"],VCard: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__["VCard"],VCardActions: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__["VCardActions"],VCardText: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__["VCardText"],VCardTitle: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__["VCardTitle"],VCol: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__["VCol"],VContainer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__["VContainer"],VDialog: vuetify_lib_components_VDialog__WEBPACK_IMPORTED_MODULE_7__["VDialog"],VDivider: vuetify_lib_components_VDivider__WEBPACK_IMPORTED_MODULE_8__["VDivider"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_9__["VIcon"],VListItem: vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_10__["VListItem"],VListItemAvatar: vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_10__["VListItemAvatar"],VListItemContent: vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_10__["VListItemContent"],VListItemTitle: vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_10__["VListItemTitle"],VRow: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__["VRow"],VSelect: vuetify_lib_components_VSelect__WEBPACK_IMPORTED_MODULE_11__["VSelect"],VSimpleTable: vuetify_lib_components_VDataTable__WEBPACK_IMPORTED_MODULE_12__["VSimpleTable"],VSpacer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__["VSpacer"],VTextField: vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_13__["VTextField"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/artist/pages/Earnings.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/artist/pages/Earnings.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/components/artist/pages/Earnings.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Earnings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Earnings.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/pages/Earnings.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Earnings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/artist/pages/Earnings.vue?vue&type=template&id=a4af097e&":
/*!******************************************************************************************!*\
  !*** ./resources/js/components/artist/pages/Earnings.vue?vue&type=template&id=a4af097e& ***!
  \******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Earnings_vue_vue_type_template_id_a4af097e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Earnings.vue?vue&type=template&id=a4af097e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/pages/Earnings.vue?vue&type=template&id=a4af097e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Earnings_vue_vue_type_template_id_a4af097e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Earnings_vue_vue_type_template_id_a4af097e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/artist/pages/NewArtistForm.vue":
/*!****************************************************************!*\
  !*** ./resources/js/components/artist/pages/NewArtistForm.vue ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NewArtistForm_vue_vue_type_template_id_01d10f03___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NewArtistForm.vue?vue&type=template&id=01d10f03& */ "./resources/js/components/artist/pages/NewArtistForm.vue?vue&type=template&id=01d10f03&");
/* harmony import */ var _NewArtistForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NewArtistForm.vue?vue&type=script&lang=js& */ "./resources/js/components/artist/pages/NewArtistForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _NewArtistForm_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NewArtistForm.vue?vue&type=style&index=0&lang=scss& */ "./resources/js/components/artist/pages/NewArtistForm.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ "./node_modules/vuetify/lib/components/VBtn/index.js");
/* harmony import */ var vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VCard */ "./node_modules/vuetify/lib/components/VCard/index.js");
/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ "./node_modules/vuetify/lib/components/VGrid/index.js");
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/index.js");
/* harmony import */ var vuetify_lib_components_VSelect__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuetify/lib/components/VSelect */ "./node_modules/vuetify/lib/components/VSelect/index.js");
/* harmony import */ var vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vuetify/lib/components/VTextField */ "./node_modules/vuetify/lib/components/VTextField/index.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _NewArtistForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NewArtistForm_vue_vue_type_template_id_01d10f03___WEBPACK_IMPORTED_MODULE_0__["render"],
  _NewArtistForm_vue_vue_type_template_id_01d10f03___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* vuetify-loader */








_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default()(component, {VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_5__["VBtn"],VCard: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__["VCard"],VCol: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_7__["VCol"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_8__["VIcon"],VRow: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_7__["VRow"],VSelect: vuetify_lib_components_VSelect__WEBPACK_IMPORTED_MODULE_9__["VSelect"],VTextField: vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_10__["VTextField"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/artist/pages/NewArtistForm.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/artist/pages/NewArtistForm.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/artist/pages/NewArtistForm.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewArtistForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./NewArtistForm.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/pages/NewArtistForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewArtistForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/artist/pages/NewArtistForm.vue?vue&type=style&index=0&lang=scss&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/components/artist/pages/NewArtistForm.vue?vue&type=style&index=0&lang=scss& ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewArtistForm_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--8-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./NewArtistForm.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/pages/NewArtistForm.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewArtistForm_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewArtistForm_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewArtistForm_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewArtistForm_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/components/artist/pages/NewArtistForm.vue?vue&type=template&id=01d10f03&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/components/artist/pages/NewArtistForm.vue?vue&type=template&id=01d10f03& ***!
  \***********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewArtistForm_vue_vue_type_template_id_01d10f03___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./NewArtistForm.vue?vue&type=template&id=01d10f03& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/pages/NewArtistForm.vue?vue&type=template&id=01d10f03&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewArtistForm_vue_vue_type_template_id_01d10f03___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewArtistForm_vue_vue_type_template_id_01d10f03___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/artist/pages/Podcasts.vue":
/*!***********************************************************!*\
  !*** ./resources/js/components/artist/pages/Podcasts.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Podcasts_vue_vue_type_template_id_4b7c2987___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Podcasts.vue?vue&type=template&id=4b7c2987& */ "./resources/js/components/artist/pages/Podcasts.vue?vue&type=template&id=4b7c2987&");
/* harmony import */ var _Podcasts_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Podcasts.vue?vue&type=script&lang=js& */ "./resources/js/components/artist/pages/Podcasts.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ "./node_modules/vuetify/lib/components/VBtn/index.js");
/* harmony import */ var vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VCard */ "./node_modules/vuetify/lib/components/VCard/index.js");
/* harmony import */ var vuetify_lib_components_VDataTable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VDataTable */ "./node_modules/vuetify/lib/components/VDataTable/index.js");
/* harmony import */ var vuetify_lib_components_VDialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VDialog */ "./node_modules/vuetify/lib/components/VDialog/index.js");
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/index.js");
/* harmony import */ var vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuetify/lib/components/VImg */ "./node_modules/vuetify/lib/components/VImg/index.js");
/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ "./node_modules/vuetify/lib/components/VGrid/index.js");
/* harmony import */ var vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! vuetify/lib/components/VTextField */ "./node_modules/vuetify/lib/components/VTextField/index.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Podcasts_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Podcasts_vue_vue_type_template_id_4b7c2987___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Podcasts_vue_vue_type_template_id_4b7c2987___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* vuetify-loader */










_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default()(component, {VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__["VBtn"],VCard: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__["VCard"],VCardTitle: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__["VCardTitle"],VDataTable: vuetify_lib_components_VDataTable__WEBPACK_IMPORTED_MODULE_6__["VDataTable"],VDialog: vuetify_lib_components_VDialog__WEBPACK_IMPORTED_MODULE_7__["VDialog"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_8__["VIcon"],VImg: vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_9__["VImg"],VSpacer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_10__["VSpacer"],VTextField: vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_11__["VTextField"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/artist/pages/Podcasts.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/artist/pages/Podcasts.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/components/artist/pages/Podcasts.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Podcasts_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Podcasts.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/pages/Podcasts.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Podcasts_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/artist/pages/Podcasts.vue?vue&type=template&id=4b7c2987&":
/*!******************************************************************************************!*\
  !*** ./resources/js/components/artist/pages/Podcasts.vue?vue&type=template&id=4b7c2987& ***!
  \******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Podcasts_vue_vue_type_template_id_4b7c2987___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Podcasts.vue?vue&type=template&id=4b7c2987& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/pages/Podcasts.vue?vue&type=template&id=4b7c2987&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Podcasts_vue_vue_type_template_id_4b7c2987___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Podcasts_vue_vue_type_template_id_4b7c2987___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/artist/pages/Songs.vue":
/*!********************************************************!*\
  !*** ./resources/js/components/artist/pages/Songs.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Songs_vue_vue_type_template_id_8fac4dd4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Songs.vue?vue&type=template&id=8fac4dd4& */ "./resources/js/components/artist/pages/Songs.vue?vue&type=template&id=8fac4dd4&");
/* harmony import */ var _Songs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Songs.vue?vue&type=script&lang=js& */ "./resources/js/components/artist/pages/Songs.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ "./node_modules/vuetify/lib/components/VBtn/index.js");
/* harmony import */ var vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VCard */ "./node_modules/vuetify/lib/components/VCard/index.js");
/* harmony import */ var vuetify_lib_components_VDataTable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VDataTable */ "./node_modules/vuetify/lib/components/VDataTable/index.js");
/* harmony import */ var vuetify_lib_components_VDialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VDialog */ "./node_modules/vuetify/lib/components/VDialog/index.js");
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/index.js");
/* harmony import */ var vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuetify/lib/components/VImg */ "./node_modules/vuetify/lib/components/VImg/index.js");
/* harmony import */ var vuetify_lib_components_VProgressCircular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vuetify/lib/components/VProgressCircular */ "./node_modules/vuetify/lib/components/VProgressCircular/index.js");
/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ "./node_modules/vuetify/lib/components/VGrid/index.js");
/* harmony import */ var vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! vuetify/lib/components/VTextField */ "./node_modules/vuetify/lib/components/VTextField/index.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Songs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Songs_vue_vue_type_template_id_8fac4dd4___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Songs_vue_vue_type_template_id_8fac4dd4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* vuetify-loader */











_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default()(component, {VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__["VBtn"],VCard: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__["VCard"],VCardTitle: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__["VCardTitle"],VDataTable: vuetify_lib_components_VDataTable__WEBPACK_IMPORTED_MODULE_6__["VDataTable"],VDialog: vuetify_lib_components_VDialog__WEBPACK_IMPORTED_MODULE_7__["VDialog"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_8__["VIcon"],VImg: vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_9__["VImg"],VProgressCircular: vuetify_lib_components_VProgressCircular__WEBPACK_IMPORTED_MODULE_10__["VProgressCircular"],VSpacer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_11__["VSpacer"],VTextField: vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_12__["VTextField"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/artist/pages/Songs.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/artist/pages/Songs.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/artist/pages/Songs.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Songs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Songs.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/pages/Songs.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Songs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/artist/pages/Songs.vue?vue&type=template&id=8fac4dd4&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/artist/pages/Songs.vue?vue&type=template&id=8fac4dd4& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Songs_vue_vue_type_template_id_8fac4dd4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Songs.vue?vue&type=template&id=8fac4dd4& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artist/pages/Songs.vue?vue&type=template&id=8fac4dd4&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Songs_vue_vue_type_template_id_8fac4dd4___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Songs_vue_vue_type_template_id_8fac4dd4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/charts/AreaChart.vue":
/*!******************************************************!*\
  !*** ./resources/js/components/charts/AreaChart.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AreaChart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AreaChart.vue?vue&type=script&lang=js& */ "./resources/js/components/charts/AreaChart.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
var render, staticRenderFns




/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  _AreaChart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/charts/AreaChart.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/charts/AreaChart.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/js/components/charts/AreaChart.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AreaChart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./AreaChart.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/charts/AreaChart.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AreaChart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/charts/PieChart.vue":
/*!*****************************************************!*\
  !*** ./resources/js/components/charts/PieChart.vue ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PieChart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PieChart.vue?vue&type=script&lang=js& */ "./resources/js/components/charts/PieChart.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
var render, staticRenderFns




/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  _PieChart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/charts/PieChart.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/charts/PieChart.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./resources/js/components/charts/PieChart.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PieChart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vuetify-loader/lib/loader.js??ref--12-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./PieChart.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/charts/PieChart.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_12_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PieChart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ })

}]);