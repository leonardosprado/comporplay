/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-b7445681'], (function (workbox) { 'use strict';

  /**
  * Welcome to your Workbox-powered service worker!
  *
  * You'll need to register this file in your web app.
  * See https://goo.gl/nhQhGp
  *
  * The rest of the code is auto-generated. Please don't update this file
  * directly; instead, make changes to your Workbox build configuration
  * and re-run your build process.
  * See https://goo.gl/2aRDsh
  */

  self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */

  workbox.precacheAndRoute([{
    "url": "//css/app.css",
    "revision": "5f1e6edecef48d4630c7b94be3625ee9"
  }, {
    "url": "//installer/css/app.css",
    "revision": "64d21d90a2bbf428edff16e395dbf3d4"
  }, {
    "url": "//installer/js/app.js",
    "revision": "c360a7767f7f713b7b21d46d4c12404e"
  }, {
    "url": "//js/app.js",
    "revision": "22324f76c3c9e8b623416d48f94ff292"
  }, {
    "url": "/js/chunks/04ea356d84798ce4d98a.js",
    "revision": null
  }, {
    "url": "/js/chunks/1463cdf233b588f0932b.js",
    "revision": null
  }, {
    "url": "/js/chunks/1543dce456e530e6c0ed.js",
    "revision": null
  }, {
    "url": "/js/chunks/1db93989b6bf9c97fb1b.js",
    "revision": null
  }, {
    "url": "/js/chunks/20520b14338b5afdaca5.js",
    "revision": null
  }, {
    "url": "/js/chunks/2dea9de1b09049b210e7.js",
    "revision": null
  }, {
    "url": "/js/chunks/31835af85530a8500b36.js",
    "revision": null
  }, {
    "url": "/js/chunks/45ae7bdcc05f360234cd.js",
    "revision": null
  }, {
    "url": "/js/chunks/4c6d5b6e80b41115f4ba.js",
    "revision": null
  }, {
    "url": "/js/chunks/50c7bdce555d47a27ecc.js",
    "revision": null
  }, {
    "url": "/js/chunks/5a8069ba664820a6ac23.js",
    "revision": null
  }, {
    "url": "/js/chunks/5e3a1477102f911f9a1f.js",
    "revision": null
  }, {
    "url": "/js/chunks/64f001ce7a7dc79de545.js",
    "revision": null
  }, {
    "url": "/js/chunks/66e4222d3320e2d88479.js",
    "revision": null
  }, {
    "url": "/js/chunks/74b05f0a57186f4e2373.js",
    "revision": null
  }, {
    "url": "/js/chunks/76f579010e036872690e.js",
    "revision": null
  }, {
    "url": "/js/chunks/79b656464f250c2f88bc.js",
    "revision": null
  }, {
    "url": "/js/chunks/82266ffeb35768441890.js",
    "revision": null
  }, {
    "url": "/js/chunks/862c30e161c6d960a08b.js",
    "revision": null
  }, {
    "url": "/js/chunks/95500f3c0c98c1547b00.js",
    "revision": null
  }, {
    "url": "/js/chunks/9752885ca2bb21431669.js",
    "revision": null
  }, {
    "url": "/js/chunks/9b01188d01b92fc6c86c.js",
    "revision": null
  }, {
    "url": "/js/chunks/9e0cff22a214d49fc71b.js",
    "revision": null
  }, {
    "url": "/js/chunks/9e21ecd55b7c3fc35a21.js",
    "revision": null
  }, {
    "url": "/js/chunks/a19ca2100d947b2adff6.js",
    "revision": null
  }, {
    "url": "/js/chunks/b0408222bd5bf5a6e3cf.js",
    "revision": null
  }, {
    "url": "/js/chunks/b132fe2fbdf1ad919f34.js",
    "revision": null
  }, {
    "url": "/js/chunks/b34dea5bdad98073ccaf.js",
    "revision": null
  }, {
    "url": "/js/chunks/b3f15364308986fc141f.js",
    "revision": null
  }, {
    "url": "/js/chunks/c51deef1e0f812bf701b.js",
    "revision": null
  }, {
    "url": "/js/chunks/d176da2d6a101ea36b13.js",
    "revision": null
  }, {
    "url": "/js/chunks/d44906a77a3c2403ea29.js",
    "revision": null
  }, {
    "url": "/js/chunks/d5bb636aabaafa221da5.js",
    "revision": null
  }, {
    "url": "/js/chunks/da44441856501eca3b19.js",
    "revision": null
  }, {
    "url": "/js/chunks/dbe5cb082ba3753874e7.js",
    "revision": null
  }, {
    "url": "/js/chunks/dfc2d56607c6126f0370.js",
    "revision": null
  }, {
    "url": "/js/chunks/ef0b3dca60405aba2770.js",
    "revision": null
  }, {
    "url": "/js/chunks/f6c89486f9b7f8dbb7e1.js",
    "revision": null
  }, {
    "url": "/js/chunks/f9aee06b5520696c7d1b.js",
    "revision": null
  }, {
    "url": "/js/chunks/fb3a1a8981552e73ad82.js",
    "revision": null
  }], {});

}));
