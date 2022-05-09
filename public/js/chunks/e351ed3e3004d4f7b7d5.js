(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{124:function(t,i,a){"use strict";function n(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}var s={data:function(){var e,t=this;return n(e={isLoading:!1,valid:!0,userMenu:!1,fullname:"",message:"",email:"",subject:"",subjectRules:[function(e){return!!e||t.$t("Subject is required")},function(e){return e&&e.length>3||t.$t("Subject must contain be at least 4 characters")}]},"email",""),n(e,"emailRules",[function(e){return!!e||t.$t("E-mail is required")},function(e){return/.+@.+\..+/.test(e)||t.$t("E-mail must be valid")}]),e},methods:{validateAndSend:function(){var t=this;this.isLoading=!0;var i=new FormData;i.append("email",this.email),i.append("subject",this.subject),i.append("message",this.message),i.append("fullname",this.fullname),axios.post("/api/contact-email",i).then((function(){t.$notify({group:"foo",type:"success",title:t.$t("Sent"),text:t.$t("Email sent successfully.")}),t.$emit("emailSent")})).catch((function(){t.$notify({group:"foo",type:"error",title:t.$t("Error"),text:Object.values(e.response.data.errors).join("<br />")})})).finally((function(){t.isLoading=!1}))}}},r=a(0),l=a(1),o=a.n(l),d=a(84),v=a(109),u=a(610),c=a(78),x=a(42),f=a(607),p=Object(r.a)(s,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-card",{attrs:{"max-width":"600",width:"100%"}},[i("v-form",{ref:"form",staticClass:"p-3",attrs:{"lazy-validation":""},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[i("v-text-field",{attrs:{label:e.$t("Full Name"),required:"",outlined:""},model:{value:e.fullname,callback:function(t){e.fullname=t},expression:"fullname"}}),e._v(" "),i("v-text-field",{attrs:{rules:e.emailRules,label:e.$t("E-mail"),required:"",outlined:""},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}}),e._v(" "),i("v-text-field",{attrs:{rules:e.subjectRules,label:e.$t("Subject"),required:"",outlined:""},model:{value:e.subject,callback:function(t){e.subject=t},expression:"subject"}}),e._v(" "),i("v-textarea",{attrs:{label:e.$t("Message"),rows:"6",outlined:"",required:""},model:{value:e.message,callback:function(t){e.message=t},expression:"message"}}),e._v(" "),i("v-btn",{staticClass:"mr-4",attrs:{disabled:!e.valid||e.isLoading,loading:e.isLoading,color:"success"},on:{click:e.validateAndSend},scopedSlots:e._u([{key:"loader",fn:function(){return[i("span",{staticClass:"custom-loader"},[i("v-icon",{attrs:{light:""}},[e._v("$vuetify.icons.cached")])],1)]},proxy:!0}])},[e._v("\n            "+e._s(e.$t("Send"))+"\n        ")])],1)],1)}),[],!1,null,null,null);i.a=p.exports;o()(p,{VBtn:d.a,VCard:v.a,VForm:u.a,VIcon:c.a,VTextField:x.a,VTextarea:f.a})},125:function(e,t,i){"use strict";var a={computed:{user:function(){return this.$store.getters.getUser}}},n=(i(281),i(0)),s=i(1),r=i.n(s),l=i(78),o=i(155),d=i(117),v=i(10),u=i(159),c=Object(n.a)(a,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-menu",{attrs:{left:"",bottom:"","position-y":125,"offset-y":""},scopedSlots:e._u([{key:"activator",fn:function(t){var a=t.on,n=t.attrs;return[i("div",e._g(e._b({staticClass:"account"},"div",n,!1),a),[i("div",{staticClass:"avatar user-avatar"},[e.userPlan&&e.userPlan.badge?i("div",{staticClass:"badge"},[i("v-icon",{attrs:{color:"primary"}},[e._v("$vuetify.icons."+e._s(e.user.plan.badge))])],1):e._e(),e._v(" "),i("img",{staticClass:"avatar-image",attrs:{src:e.user.avatar,alt:""}})]),e._v(" "),i("div",{staticClass:"name max-1-lines"},[e._v("\n        "+e._s(e.user.name)+"\n      ")]),e._v(" "),i("div",{staticClass:"chevron"},[i("v-icon",{attrs:{small:""}},[e._v("$vuetify.icons.chevron-down")])],1)])]}}])},[e._v(" "),i("v-list",{class:{"dark-backround":e.$vuetify.theme.dark},attrs:{dense:""}},[e.isAdmin()?i("v-list-item",{attrs:{to:{path:"/admin/analytics"}}},[i("v-list-item-title",[i("v-icon",{attrs:{size:"20"}},[e._v("$vuetify.icons.account-tie")]),e._v("\n        "+e._s(e.$t("Admin Area"))+"\n      ")],1)],1):e._e(),e._v(" "),e.isArtist()?i("v-list-item",{attrs:{to:{path:"/artist/analytics"}}},[i("v-list-item-title",[i("v-icon",{attrs:{size:"20"}},[e._v("$vuetify.icons.account-music")]),e._v("\n        "+e._s(e.$t("Artist Area"))+"\n      ")],1)],1):e._e(),e._v(" "),e.$route.matched.some((function(e){return e.meta.player}))?e._e():i("v-list-item",{attrs:{to:{path:e.$store.getters.getSettings.playerLanding}},on:{click:function(t){return e.$router.push({path:e.$store.getters.getSettings.playerLanding})}}},[i("v-list-item-title",[i("v-icon",{attrs:{size:"20"}},[e._v("$vuetify.icons.music-note-eighth")]),e._v("\n        "+e._s(e.$t("Player")))],1)],1),e._v(" "),e.isUpgradable?i("v-list-item",{attrs:{to:{name:"subscription"}}},[i("v-list-item-title",[i("v-icon",{attrs:{size:"20"}},[e._v("$vuetify.icons."+e._s(e.$store.getters.getSettings.subscriptionButtonIcon))]),e._v("\n        "+e._s(e.$t("Upgrade Account")))],1)],1):e._e(),e._v(" "),e.$store.getters.getUser.is_admin?e._e():i("v-list-item",{attrs:{to:{name:"profile",params:{id:e.$store.getters.getUser.id}}}},[i("v-list-item-title",[i("v-icon",{attrs:{size:"20"}},[e._v("$vuetify.icons.account-cog")]),e._v("\n        "+e._s(e.$t("Profile"))+"\n      ")],1)],1),e._v(" "),i("v-list-item",{attrs:{to:{name:"account-settings"}}},[i("v-list-item-title",[i("v-icon",{attrs:{size:"20"}},[e._v("$vuetify.icons.account-cog")]),e._v("\n        "+e._s(e.$t("Account Settings"))+"\n      ")],1)],1),e._v(" "),i("v-list-item",{on:{click:function(t){return e.$store.dispatch("logout")}}},[i("v-list-item-title",[i("v-icon",{attrs:{size:"20"}},[e._v("$vuetify.icons.logout")]),e._v("\n        "+e._s(e.$t("Logout")))],1)],1)],1)],1)}),[],!1,null,"8f9c75e8",null);t.a=c.exports;r()(c,{VIcon:l.a,VList:o.a,VListItem:d.a,VListItemTitle:v.c,VMenu:u.a})},168:function(e,t,i){var a=i(282);"string"==typeof a&&(a=[[e.i,a,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};i(7)(a,n);a.locals&&(e.exports=a.locals)},172:function(e,t,i){var a=i(298);"string"==typeof a&&(a=[[e.i,a,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};i(7)(a,n);a.locals&&(e.exports=a.locals)},279:function(e,t,i){var a=i(280);"string"==typeof a&&(a=[[e.i,a,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};i(7)(a,n);a.locals&&(e.exports=a.locals)},280:function(e,t,i){(e.exports=i(6)(!1)).push([e.i,".theme--light.v-textarea.v-text-field--solo-inverted.v-input--is-focused textarea{color:#fff}.theme--light.v-textarea.v-text-field--solo-inverted.v-input--is-focused textarea::-moz-placeholder{color:hsla(0,0%,100%,.5)}.theme--light.v-textarea.v-text-field--solo-inverted.v-input--is-focused textarea:-ms-input-placeholder{color:hsla(0,0%,100%,.5)}.theme--light.v-textarea.v-text-field--solo-inverted.v-input--is-focused textarea::placeholder{color:hsla(0,0%,100%,.5)}.theme--dark.v-textarea.v-text-field--solo-inverted.v-input--is-focused textarea{color:rgba(0,0,0,.87)}.theme--dark.v-textarea.v-text-field--solo-inverted.v-input--is-focused textarea::-moz-placeholder{color:rgba(0,0,0,.38)}.theme--dark.v-textarea.v-text-field--solo-inverted.v-input--is-focused textarea:-ms-input-placeholder{color:rgba(0,0,0,.38)}.theme--dark.v-textarea.v-text-field--solo-inverted.v-input--is-focused textarea::placeholder{color:rgba(0,0,0,.38)}.v-textarea textarea{align-self:stretch;flex:1 1 auto;line-height:1.75rem;max-width:100%;min-height:32px;outline:none;padding:0;width:100%}.v-textarea .v-text-field__prefix,.v-textarea .v-text-field__suffix{padding-top:2px;align-self:start}.v-textarea.v-text-field--box .v-text-field__prefix,.v-textarea.v-text-field--box textarea,.v-textarea.v-text-field--enclosed .v-text-field__prefix,.v-textarea.v-text-field--enclosed textarea{margin-top:24px}.v-textarea.v-text-field--box.v-text-field--outlined:not(.v-input--dense) .v-text-field__prefix,.v-textarea.v-text-field--box.v-text-field--outlined:not(.v-input--dense) .v-text-field__suffix,.v-textarea.v-text-field--box.v-text-field--outlined:not(.v-input--dense) textarea,.v-textarea.v-text-field--box.v-text-field--single-line:not(.v-input--dense) .v-text-field__prefix,.v-textarea.v-text-field--box.v-text-field--single-line:not(.v-input--dense) .v-text-field__suffix,.v-textarea.v-text-field--box.v-text-field--single-line:not(.v-input--dense) textarea,.v-textarea.v-text-field--enclosed.v-text-field--outlined:not(.v-input--dense) .v-text-field__prefix,.v-textarea.v-text-field--enclosed.v-text-field--outlined:not(.v-input--dense) .v-text-field__suffix,.v-textarea.v-text-field--enclosed.v-text-field--outlined:not(.v-input--dense) textarea,.v-textarea.v-text-field--enclosed.v-text-field--single-line:not(.v-input--dense) .v-text-field__prefix,.v-textarea.v-text-field--enclosed.v-text-field--single-line:not(.v-input--dense) .v-text-field__suffix,.v-textarea.v-text-field--enclosed.v-text-field--single-line:not(.v-input--dense) textarea{margin-top:10px}.v-textarea.v-text-field--box.v-text-field--outlined:not(.v-input--dense) .v-label,.v-textarea.v-text-field--box.v-text-field--single-line:not(.v-input--dense) .v-label,.v-textarea.v-text-field--enclosed.v-text-field--outlined:not(.v-input--dense) .v-label,.v-textarea.v-text-field--enclosed.v-text-field--single-line:not(.v-input--dense) .v-label{top:18px}.v-textarea.v-text-field--box.v-text-field--outlined.v-input--dense .v-text-field__prefix,.v-textarea.v-text-field--box.v-text-field--outlined.v-input--dense .v-text-field__suffix,.v-textarea.v-text-field--box.v-text-field--outlined.v-input--dense textarea,.v-textarea.v-text-field--box.v-text-field--single-line.v-input--dense .v-text-field__prefix,.v-textarea.v-text-field--box.v-text-field--single-line.v-input--dense .v-text-field__suffix,.v-textarea.v-text-field--box.v-text-field--single-line.v-input--dense textarea,.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense .v-text-field__prefix,.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense .v-text-field__suffix,.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense textarea,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-input--dense .v-text-field__prefix,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-input--dense .v-text-field__suffix,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-input--dense textarea{margin-top:6px}.v-textarea.v-text-field--box.v-text-field--outlined.v-input--dense .v-input__append-inner,.v-textarea.v-text-field--box.v-text-field--outlined.v-input--dense .v-input__append-outer,.v-textarea.v-text-field--box.v-text-field--outlined.v-input--dense .v-input__prepend-inner,.v-textarea.v-text-field--box.v-text-field--outlined.v-input--dense .v-input__prepend-outer,.v-textarea.v-text-field--box.v-text-field--single-line.v-input--dense .v-input__append-inner,.v-textarea.v-text-field--box.v-text-field--single-line.v-input--dense .v-input__append-outer,.v-textarea.v-text-field--box.v-text-field--single-line.v-input--dense .v-input__prepend-inner,.v-textarea.v-text-field--box.v-text-field--single-line.v-input--dense .v-input__prepend-outer,.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense .v-input__append-inner,.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense .v-input__append-outer,.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense .v-input__prepend-inner,.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense .v-input__prepend-outer,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-input--dense .v-input__append-inner,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-input--dense .v-input__append-outer,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-input--dense .v-input__prepend-inner,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-input--dense .v-input__prepend-outer{align-self:flex-start;margin-top:8px}.v-textarea.v-text-field--solo{align-items:flex-start}.v-textarea.v-text-field--solo .v-input__control textarea{caret-color:auto}.v-textarea.v-text-field--solo .v-input__append-inner,.v-textarea.v-text-field--solo .v-input__append-outer,.v-textarea.v-text-field--solo .v-input__prepend-inner,.v-textarea.v-text-field--solo .v-input__prepend-outer{align-self:flex-start;margin-top:12px}.v-application--is-ltr .v-textarea.v-text-field--solo .v-input__append-inner{padding-left:12px}.v-application--is-rtl .v-textarea.v-text-field--solo .v-input__append-inner{padding-right:12px}.v-textarea--auto-grow textarea{overflow:hidden}.v-textarea--no-resize textarea{resize:none}.v-textarea.v-text-field--enclosed .v-text-field__slot{align-self:stretch}.v-application--is-ltr .v-textarea.v-text-field--enclosed .v-text-field__slot{margin-right:-12px}.v-application--is-rtl .v-textarea.v-text-field--enclosed .v-text-field__slot{margin-left:-12px}.v-application--is-ltr .v-textarea.v-text-field--enclosed .v-text-field__slot textarea{padding-right:12px}.v-application--is-rtl .v-textarea.v-text-field--enclosed .v-text-field__slot textarea{padding-left:12px}",""])},281:function(e,t,i){"use strict";i(168)},282:function(e,t,i){(e.exports=i(6)(!1)).push([e.i,"",""])},297:function(e,t,i){"use strict";i(172)},298:function(e,t,i){(e.exports=i(6)(!1)).push([e.i,".landing-container{background-color:#fdfdfd;min-width:350px;color:#0f0f0f;min-height:100vh;display:flex;flex-direction:column;justify-content:space-between}.landing-container main{flex-grow:1}.landing-header.custom{height:90vh}@media (max-width:900px){.landing-header.custom{height:50vh}}.landing-header.default{background-image:url(/images/background.png)}.landing-header{background-size:cover;background-position:50%;border-bottom-right-radius:160% 40%;border-bottom-left-radius:160% 40%;color:#fff;margin-bottom:3em}.landing-header__nav{padding:1em 1.5em;display:flex;z-index:2;justify-content:space-between;align-items:center}.landing-header__nav .logo{padding-left:1em;z-index:2}.landing-header__nav .logo img{max-height:3em}.landing-header__nav .options{display:flex;z-index:2}.landing-header__cover-layer{z-index:0;border-bottom-right-radius:160% 40%;border-bottom-left-radius:160% 40%}.landing-header__hero{text-align:center;padding-top:5rem;display:flex;justify-content:center}.landing-header__hero img{width:27%;min-width:180px}.landing-header__main{overflow:hidden;border-bottom-right-radius:150% 40%;border-bottom-left-radius:150% 40%}.landing-header__text{left:0;right:0;top:50%;transform:translateY(-50%);text-align:center;position:absolute;color:#fff}.landing-header__text h1{font-size:4em}.landing-header__text h2{font-size:1.25em;font-weight:400}.landing-header__default-text{left:0;right:0;top:50%;transform:translateY(-50%);text-align:center;position:absolute;color:#fff}.landing-header__default-text h1{font-weight:800;word-spacing:4em;white-space:nowrap;font-size:6em;padding-left:1em;text-transform:uppercase;margin-bottom:2em}.landing-header__default-text h2{text-align:center;font-size:2.5em;font-weight:500;z-index:2;position:relative}@media (max-width:1920px){.landing-header__default-text{top:60%}}@media (max-width:1500px){.landing-header__default-text{top:60%}.landing-header__default-text h1{word-spacing:3em;padding-left:.55em}}@media (max-width:1300px){.landing-header__default-text{top:65%}.landing-header__default-text h1{word-spacing:2em;margin-bottom:1em;padding-left:.95em}}@media (max-width:950px){.landing-header__default-text{top:65%}.landing-header__default-text h1{margin-bottom:.75em;font-size:5em}.landing-header__default-text h2{font-size:1.75em}}@media (max-width:750px){.landing-header__default-text{top:55%}.landing-header__default-text h1{font-size:4em;padding-left:.45em}}@media (max-width:600px){.landing-header__default-text{top:60%}.landing-header__default-text h1{font-size:3em}}@media (max-width:500px){.landing-header__default-text h1{word-spacing:2.5em;padding-left:.65em}}@media (max-width:400px){.landing-header__default-text{top:50%}.landing-header__default-text h1{word-spacing:1.25em}}.landing-header__button{position:absolute;left:0;right:0;z-index:2;bottom:0;text-align:center;transform:translateY(50%)}.landing-header__button .v-btn{max-width:14em;width:30%}.landing-section{padding:1em 4em}.landing-section .container{max-width:1200px!important}.landing-section__title{font-size:2em;font-weight:700;line-height:1.15;margin-bottom:.75em}.landing-section__sub-title{opacity:.75}@media (max-width:960px){.landing-section .text-side-container{text-align:center;order:-1}}.landing-section .text-side-container .text-side{max-width:500px}.landing-section .image-side{padding:1.5em;display:flex;justify-content:center}.landing-section .image-side img{max-width:650px;min-width:350px}@media (max-width:1300px){.landing-section .image-side img{max-width:550px}}@media (max-width:960px){.landing-section .image-side img{width:110%}}.footer-container{padding:3em;background-size:cover;color:#fff}.footer-container .footer__title{font-size:1.2em}.footer-container .footer__sub-title{font-weight:400;opacity:.75;line-height:2}.z-index-0{z-index:0}@media (min-width:960px){.sections-divider{display:none!important}}.account{display:flex;align-items:center;border-radius:25px;padding:.3rem;transition:all .4s;position:relative;cursor:pointer}.account:hover{background-color:hsla(0,0%,43.1%,.226)}.account .avatar{width:35px;margin-right:.3rem}.account .avatar-image{height:100%;border-radius:50%;width:100%}@media screen and (min-width:900px){.account .short-name{display:none}}@media screen and (max-width:700px){.account .short-name{display:none}}.account .name{max-width:6em}@media screen and (max-width:900px){.account .name{display:none}}.account .chevron{margin-left:.5rem}",""])},607:function(e,t,i){"use strict";i(279);var a=i(42),n=i(9);const s=Object(n.a)(a.a);t.a=s.extend({name:"v-textarea",props:{autoGrow:Boolean,noResize:Boolean,rowHeight:{type:[Number,String],default:24,validator:e=>!isNaN(parseFloat(e))},rows:{type:[Number,String],default:5,validator:e=>!isNaN(parseInt(e,10))}},computed:{classes(){return{"v-textarea":!0,"v-textarea--auto-grow":this.autoGrow,"v-textarea--no-resize":this.noResizeHandle,...a.a.options.computed.classes.call(this)}},noResizeHandle(){return this.noResize||this.autoGrow}},watch:{autoGrow(e){this.$nextTick(()=>{var t;e?this.calculateInputHeight():null==(t=this.$refs.input)||t.style.removeProperty("height")})},lazyValue(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)},rowHeight(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)}},mounted(){setTimeout(()=>{this.autoGrow&&this.calculateInputHeight()},0)},methods:{calculateInputHeight(){const e=this.$refs.input;if(!e)return;e.style.height="0";const t=e.scrollHeight,i=parseInt(this.rows,10)*parseFloat(this.rowHeight);e.style.height=Math.max(i,t)+"px"},genInput(){const e=a.a.options.methods.genInput.call(this);return e.tag="textarea",delete e.data.attrs.type,e.data.attrs.rows=this.rows,e},onInput(e){a.a.options.methods.onInput.call(this,e),this.autoGrow&&this.calculateInputHeight()},onKeyDown(e){this.isFocused&&13===e.keyCode&&e.stopPropagation(),this.$emit("keydown",e)}}})},610:function(e,t,i){"use strict";var a=i(9),n=i(54),s=i(37);t.a=Object(a.a)(n.a,Object(s.b)("form")).extend({name:"v-form",provide(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:()=>({inputs:[],watchers:[],errorBag:{}}),watch:{errorBag:{handler(e){const t=Object.values(e).includes(!0);this.$emit("input",!t)},deep:!0,immediate:!0}},methods:{watchInput(e){const t=e=>e.$watch("hasError",t=>{this.$set(this.errorBag,e._uid,t)},{immediate:!0}),i={_uid:e._uid,valid:()=>{},shouldValidate:()=>{}};return this.lazyValidation?i.shouldValidate=e.$watch("shouldValidate",a=>{a&&(this.errorBag.hasOwnProperty(e._uid)||(i.valid=t(e)))}):i.valid=t(e),i},validate(){return 0===this.inputs.filter(e=>!e.validate(!0)).length},reset(){this.inputs.forEach(e=>e.reset()),this.resetErrorBag()},resetErrorBag(){this.lazyValidation&&setTimeout(()=>{this.errorBag={}},0)},resetValidation(){this.inputs.forEach(e=>e.resetValidation()),this.resetErrorBag()},register(e){this.inputs.push(e),this.watchers.push(this.watchInput(e))},unregister(e){const t=this.inputs.find(t=>t._uid===e._uid);if(!t)return;const i=this.watchers.find(e=>e._uid===t._uid);i&&(i.valid(),i.shouldValidate()),this.watchers=this.watchers.filter(e=>e._uid!==t._uid),this.inputs=this.inputs.filter(e=>e._uid!==t._uid),this.$delete(this.errorBag,t._uid)}},render(e){return e("form",{staticClass:"v-form",attrs:{novalidate:!0,...this.attrs$},on:{submit:e=>this.$emit("submit",e)}},this.$slots.default)}})},643:function(e,t,i){"use strict";i.r(t);var a=i(124),n=i(125),s={metaInfo:function(){return{meta:[{name:"description",content:this.$store.getters.getSettings.siteDescription.replace("%site_name",this.$store.getters.getSettings.appName)}]}},components:{ContactUs:a.a,User:n.a},created:function(){this.landingPage.sections=JSON.parse(this.landingPage.sections),this.landingPage.showContactUs=Boolean(parseInt(this.landingPage.showContactUs))},data:function(){return{landingPage:JSON.parse(JSON.stringify(this.$store.getters.getSettings.landingPage)),userMenu:!1}},computed:{user:function(){return this.$store.getters.getUser}}},r=(i(297),i(0)),l=i(1),o=i.n(l),d=i(84),v=i(564),u=i(866),c=i(154),x=i(563),f=Object(r.a)(s,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"landing-container"},[i("header",{staticClass:"landing-header relative custom",style:{backgroundImage:"url("+(e.landingPage.headerBackground||"/images/landing-background.jpg")+")"}},[i("div",{staticClass:"landing-header__cover-layer absolute fill",style:{backgroundColor:e.landingPage.headerBackgroundLayerColor}}),e._v(" "),i("nav",{staticClass:"landing-header__nav"},[i("div",{staticClass:"logo"},[i("img",{attrs:{src:e.$store.getters.getSettings.appLogo,alt:e.$t("Logo Image")}})]),e._v(" "),i("div",{staticClass:"options"},[e.user?i("div",{staticClass:"user white--text"},[i("User")],1):i("div",{staticClass:"auth-buttons"},[i("div",{staticClass:"buttons"},[i("v-btn",{staticClass:"primary white--text",attrs:{small:""},on:{click:function(t){return e.$router.push({name:"login"})}}},[e._v(e._s(e.$t("Login")))]),e._v(" "),e.$store.getters.getSettings.disableRegistration?e._e():i("v-btn",{staticClass:"register__btn ml-2 white--text",attrs:{small:"",outlined:"",color:"white"},on:{click:function(t){return e.$router.push({name:"register"})}}},[e._v(e._s(e.$t("Register")))])],1)])])]),e._v(" "),i("div",{staticClass:"absolute fill text-center z-index-0"},[i("div",{staticClass:"landing-header__main"},[i("div",{staticClass:"landing-header__text"},[i("h1",[e._v(e._s(e.landingPage.headerTitle))]),e._v(" "),i("h2",[e._v(e._s(e.landingPage.headerDescription))])])]),e._v(" "),i("div",{staticClass:"landing-header__button"},[i("v-btn",{staticClass:"primary",attrs:{rounded:"",large:"",to:e.$store.getters.getSettings.playerLanding}},[e._v("\n                    "+e._s(e.landingPage.callToAction)+"\n                ")])],1)])]),e._v(" "),i("main",[e._l(e.landingPage.sections,(function(t,a){return i("section",{key:a,staticClass:"landing-section"},[i("v-container",{staticClass:"container"},[i("v-row",{attrs:{align:"center"}},[t.background?i("v-col",{staticClass:"justify-center",style:{order:a%2==0?1:0},attrs:{lg:"6",md:"6",sm:"12"}},[i("div",{staticClass:"image-side"},[i("img",{attrs:{src:t.background}})])]):e._e(),e._v(" "),i("v-col",{staticClass:"text-side-container justify-center",attrs:{lg:t.background?6:12,md:t.background?6:12,sm:"12"}},[i("div",{staticClass:"text-side"},[i("div",{staticClass:"landing-section__title"},[e._v("\n                                "+e._s(t.title)+"\n                            ")]),e._v(" "),i("div",{staticClass:"landing-section__sub-title"},[e._v("\n                                "+e._s(t.description)+"\n                            ")])])])],1)],1),e._v(" "),i("v-divider",{staticClass:"sections-divider"})],1)})),e._v(" "),e.landingPage.showContactUs&&e.$store.getters.getSettings.enableMail?i("section",{staticClass:"landing-section"},[i("v-container",{staticClass:"container"},[i("h2",{staticClass:"text-center"},[e._v(e._s(e.$t("Contact Us")))]),e._v(" "),i("v-row",[i("v-col",{staticClass:"justify-center"},[i("contact-us")],1)],1)],1)],1):e._e()],2),e._v(" "),i("footer",[i("div",{staticClass:"footer-container",style:{backgroundImage:"url("+e.landingPage.footerBackground+")"}},[i("v-row",[i("v-col",{staticClass:"text-center"},[i("div",{staticClass:"footer__title"},[i("h2",[e._v("\n                            "+e._s(e.landingPage.footerTitle)+"\n                        ")])]),e._v(" "),i("div",{staticClass:"footer__sub-title"},[e._v("\n                        "+e._s(e.landingPage.footerDescription)+"\n                    ")]),e._v(" "),e.$store.getters.getSettings.disableRegistration?e._e():i("v-btn",{staticClass:"mt-2",attrs:{color:"white",outlined:"","min-width":"120"},on:{click:function(t){return e.$router.push({name:"register"})}}},[e._v(e._s(e.$t("Register")))])],1)],1)],1)]),e._v(" "),i("div",{staticClass:"text-center py-4"},[e._v("\n        © "+e._s(e.moment().year())+" "+e._s(e.$store.getters.getSettings.appName)+". "+e._s(e.$t("All rights reserved."))+"\n    ")])])}),[],!1,null,null,null);t.default=f.exports;o()(f,{VBtn:d.a,VCol:v.a,VContainer:u.a,VDivider:c.a,VRow:x.a})}}]);