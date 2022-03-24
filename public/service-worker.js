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
define(['./workbox-819adc78'], (function (workbox) { 'use strict';

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
    "revision": "d98c247f5fe15a58e515638f731891bd"
  }, {
    "url": "//installer/css/app.css",
    "revision": "64d21d90a2bbf428edff16e395dbf3d4"
  }, {
    "url": "//installer/js/app.js",
    "revision": "37431d05837f17e8598958c5051e08e5"
  }, {
    "url": "//js/app.js",
    "revision": "f111135ee90cf89672a09c61387ca5bf"
  }, {
    "url": "/js/chunks/184a5d9480503c3bad30.js",
    "revision": null
  }, {
    "url": "/js/chunks/18e536a2436171872ee4.js",
    "revision": null
  }, {
    "url": "/js/chunks/1a8352842a679cae9adb.js",
    "revision": null
  }, {
    "url": "/js/chunks/1f1affb0f717e6ad48b4.js",
    "revision": null
  }, {
    "url": "/js/chunks/1fdcd6f8359b7aaf5e34.js",
    "revision": null
  }, {
    "url": "/js/chunks/20520b14338b5afdaca5.js",
    "revision": null
  }, {
    "url": "/js/chunks/2076a31b6effc49f0838.js",
    "revision": null
  }, {
    "url": "/js/chunks/23e93e96ae6e31442a1a.js",
    "revision": null
  }, {
    "url": "/js/chunks/298265a047795f32addf.js",
    "revision": null
  }, {
    "url": "/js/chunks/3b88aafe0ec54715094f.js",
    "revision": null
  }, {
    "url": "/js/chunks/4183239f5aa3df45ba9f.js",
    "revision": null
  }, {
    "url": "/js/chunks/4a5c217da39cc6986031.js",
    "revision": null
  }, {
    "url": "/js/chunks/4b2707e23c5d518f0d66.js",
    "revision": null
  }, {
    "url": "/js/chunks/558a359a79a584810b4a.js",
    "revision": null
  }, {
    "url": "/js/chunks/57a18b1b1bf9e67736d6.js",
    "revision": null
  }, {
    "url": "/js/chunks/5b31a534f8e9e2c45d8a.js",
    "revision": null
  }, {
    "url": "/js/chunks/6968540d7cc2f535fd0b.js",
    "revision": null
  }, {
    "url": "/js/chunks/7c6c365480097b30545e.js",
    "revision": null
  }, {
    "url": "/js/chunks/7c833a97e6a96617b3d7.js",
    "revision": null
  }, {
    "url": "/js/chunks/8c0fc7ef34a7c0d3ecc4.js",
    "revision": null
  }, {
    "url": "/js/chunks/8cce207f5ca663377711.js",
    "revision": null
  }, {
    "url": "/js/chunks/a4c07580409c3782ee72.js",
    "revision": null
  }, {
    "url": "/js/chunks/a7643386d2959bbd09af.js",
    "revision": null
  }, {
    "url": "/js/chunks/aad9febd1f8a701d8617.js",
    "revision": null
  }, {
    "url": "/js/chunks/b5c1a4e37d530e8afb13.js",
    "revision": null
  }, {
    "url": "/js/chunks/bacf22b6e7b9aca45c29.js",
    "revision": null
  }, {
    "url": "/js/chunks/bbfd4799a9bb91f816a9.js",
    "revision": null
  }, {
    "url": "/js/chunks/bd641d5cf477acd1f345.js",
    "revision": null
  }, {
    "url": "/js/chunks/c7b3d0e01335c8bee6cd.js",
    "revision": null
  }, {
    "url": "/js/chunks/cb1f97c1dec9b54968d5.js",
    "revision": null
  }, {
    "url": "/js/chunks/cb9c552420855c67bf83.js",
    "revision": null
  }, {
    "url": "/js/chunks/d5d1fb9b93b553dfd9fb.js",
    "revision": null
  }, {
    "url": "/js/chunks/d7372c4471043fa032c3.js",
    "revision": null
  }, {
    "url": "/js/chunks/d7a8c324a16d763ba4e4.js",
    "revision": null
  }, {
    "url": "/js/chunks/dc5b8b5e379ed866ef02.js",
    "revision": null
  }, {
    "url": "/js/chunks/dcc79b1e9b7f3d0a3bc0.js",
    "revision": null
  }, {
    "url": "/js/chunks/de3ba423bfb67f99ea4a.js",
    "revision": null
  }, {
    "url": "/js/chunks/f898dde242df2c518090.js",
    "revision": null
  }, {
    "url": "/js/chunks/fcdeaabe5cb6d0db2f27.js",
    "revision": null
  }], {});

}));
