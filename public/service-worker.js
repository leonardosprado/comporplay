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
    "revision": "df74bd931bb4544006abea1e3ea2efb1"
  }, {
    "url": "//js/app.js",
    "revision": "fffd227cacbe6fd9f55b2d1dda2d548d"
  }, {
    "url": "/js/chunks/04c6a1d74eab10fdc152.js",
    "revision": null
  }, {
    "url": "/js/chunks/0b9dc159092f28bda617.js",
    "revision": null
  }, {
    "url": "/js/chunks/16c46a7c3ef695317887.js",
    "revision": null
  }, {
    "url": "/js/chunks/16e25bf3ef811a8d46ef.js",
    "revision": null
  }, {
    "url": "/js/chunks/1d80614b06a960d5c16a.js",
    "revision": null
  }, {
    "url": "/js/chunks/20520b14338b5afdaca5.js",
    "revision": null
  }, {
    "url": "/js/chunks/218eb485f5a6b4123adc.js",
    "revision": null
  }, {
    "url": "/js/chunks/24ec91e5aa58fc60fa63.js",
    "revision": null
  }, {
    "url": "/js/chunks/253e938bb31ddbe69f89.js",
    "revision": null
  }, {
    "url": "/js/chunks/3720532ab11aaeace581.js",
    "revision": null
  }, {
    "url": "/js/chunks/3902c42cc07f14ac337c.js",
    "revision": null
  }, {
    "url": "/js/chunks/3bbb1d94b24cfbb4ec69.js",
    "revision": null
  }, {
    "url": "/js/chunks/3e3ad841d6c09dec38a7.js",
    "revision": null
  }, {
    "url": "/js/chunks/45bddac700038d6850bb.js",
    "revision": null
  }, {
    "url": "/js/chunks/497537b9e0d5b5ce5576.js",
    "revision": null
  }, {
    "url": "/js/chunks/537ebab1b488ac2de928.js",
    "revision": null
  }, {
    "url": "/js/chunks/5c4fadd785f56b87bed7.js",
    "revision": null
  }, {
    "url": "/js/chunks/6bf2d9236a8d12aeb420.js",
    "revision": null
  }, {
    "url": "/js/chunks/6d2c31d9614c2b263a7b.js",
    "revision": null
  }, {
    "url": "/js/chunks/75f849370fbd03f3f4ad.js",
    "revision": null
  }, {
    "url": "/js/chunks/7784fa14267fbacd35a6.js",
    "revision": null
  }, {
    "url": "/js/chunks/89309a7dcd641a6b9afb.js",
    "revision": null
  }, {
    "url": "/js/chunks/8e3632146abcf4f98e03.js",
    "revision": null
  }, {
    "url": "/js/chunks/8eedee7604150e951206.js",
    "revision": null
  }, {
    "url": "/js/chunks/90a7f77bff158def13e2.js",
    "revision": null
  }, {
    "url": "/js/chunks/aa3c931b318d83ebce98.js",
    "revision": null
  }, {
    "url": "/js/chunks/ad2d8d2c3f164979b38e.js",
    "revision": null
  }, {
    "url": "/js/chunks/b1073f523fa00429bdf1.js",
    "revision": null
  }, {
    "url": "/js/chunks/b132fe2fbdf1ad919f34.js",
    "revision": null
  }, {
    "url": "/js/chunks/c0038d160b31f03dafee.js",
    "revision": null
  }, {
    "url": "/js/chunks/d5ebfbf21e95869c5049.js",
    "revision": null
  }, {
    "url": "/js/chunks/d6538064096334b5fe96.js",
    "revision": null
  }, {
    "url": "/js/chunks/dbe5cb082ba3753874e7.js",
    "revision": null
  }, {
    "url": "/js/chunks/e0c7c1ab7c06dedc221e.js",
    "revision": null
  }, {
    "url": "/js/chunks/e39e3391160ed5878879.js",
    "revision": null
  }, {
    "url": "/js/chunks/e88593745a60c23b119c.js",
    "revision": null
  }, {
    "url": "/js/chunks/f919bf08e15f29850808.js",
    "revision": null
  }, {
    "url": "/js/chunks/f956fd111cf4aee0f735.js",
    "revision": null
  }, {
    "url": "/js/chunks/fb3a1a8981552e73ad82.js",
    "revision": null
  }, {
    "url": "/js/chunks/fd9d9ef5e324219f0d10.js",
    "revision": null
  }], {});

}));
