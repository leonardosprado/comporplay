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
    "revision": "909fd270f9af08992e8fe0c523a86f06"
  }, {
    "url": "/js/chunks/05823dfe9a96b73d51c7.js",
    "revision": null
  }, {
    "url": "/js/chunks/06ad6e9f7ca958c9c1a6.js",
    "revision": null
  }, {
    "url": "/js/chunks/0b418b6f2f93d0ea65ca.js",
    "revision": null
  }, {
    "url": "/js/chunks/0f0e2e370701e9e009d3.js",
    "revision": null
  }, {
    "url": "/js/chunks/184a5d9480503c3bad30.js",
    "revision": null
  }, {
    "url": "/js/chunks/1fdcd6f8359b7aaf5e34.js",
    "revision": null
  }, {
    "url": "/js/chunks/20520b14338b5afdaca5.js",
    "revision": null
  }, {
    "url": "/js/chunks/244851bd83c295b0e3bb.js",
    "revision": null
  }, {
    "url": "/js/chunks/317b6b01627439e2d8bb.js",
    "revision": null
  }, {
    "url": "/js/chunks/3544cb400f9ca29032f8.js",
    "revision": null
  }, {
    "url": "/js/chunks/500ecce73ff150a9e679.js",
    "revision": null
  }, {
    "url": "/js/chunks/5283b8a8db7ed57a6619.js",
    "revision": null
  }, {
    "url": "/js/chunks/558a359a79a584810b4a.js",
    "revision": null
  }, {
    "url": "/js/chunks/5b31a534f8e9e2c45d8a.js",
    "revision": null
  }, {
    "url": "/js/chunks/5b87d42e0c93b414a82f.js",
    "revision": null
  }, {
    "url": "/js/chunks/5c664fadabe441731b2c.js",
    "revision": null
  }, {
    "url": "/js/chunks/6873fc4d997e43ea7105.js",
    "revision": null
  }, {
    "url": "/js/chunks/6968540d7cc2f535fd0b.js",
    "revision": null
  }, {
    "url": "/js/chunks/76e4e44efa53f729f88e.js",
    "revision": null
  }, {
    "url": "/js/chunks/7c833a97e6a96617b3d7.js",
    "revision": null
  }, {
    "url": "/js/chunks/7ea728cea5ed56436e6e.js",
    "revision": null
  }, {
    "url": "/js/chunks/82873e5c9be88ab0c204.js",
    "revision": null
  }, {
    "url": "/js/chunks/8cce207f5ca663377711.js",
    "revision": null
  }, {
    "url": "/js/chunks/9302d7eb1465b44fdecc.js",
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
    "url": "/js/chunks/baeb656856ec001dd30d.js",
    "revision": null
  }, {
    "url": "/js/chunks/bd641d5cf477acd1f345.js",
    "revision": null
  }, {
    "url": "/js/chunks/c1dcc0e0034da076d6d5.js",
    "revision": null
  }, {
    "url": "/js/chunks/c977ef0e575ac9a2c31e.js",
    "revision": null
  }, {
    "url": "/js/chunks/cb9c552420855c67bf83.js",
    "revision": null
  }, {
    "url": "/js/chunks/d7372c4471043fa032c3.js",
    "revision": null
  }, {
    "url": "/js/chunks/d7a8c324a16d763ba4e4.js",
    "revision": null
  }, {
    "url": "/js/chunks/dcc79b1e9b7f3d0a3bc0.js",
    "revision": null
  }, {
    "url": "/js/chunks/de3ba423bfb67f99ea4a.js",
    "revision": null
  }, {
    "url": "/js/chunks/e89c9feef8f8b84be8d3.js",
    "revision": null
  }, {
    "url": "/js/chunks/ee7455c4d5a5b87580e6.js",
    "revision": null
  }], {});

}));
