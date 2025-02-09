/**
 * alphaTab v1.3.1 (, build 11)
 * 
 * Copyright © 2024, Daniel Kuschny and Contributors, All rights reserved.
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * 
 * SoundFont loading and Audio Synthesis based on TinySoundFont (licensed under MIT)
 * Copyright (C) 2017, 2018 Bernhard Schelling (https://github.com/schellingb/TinySoundFont)
 * 
 * TinySoundFont is based on SFZero (licensed under MIT)
 * Copyright (C) 2012 Steve Folta (https://github.com/stevefolta/SFZero)
 */

import * as alphaTab from './alphaTab.core.mjs';
export * from './alphaTab.core.mjs';

/**@target web */
if (alphaTab.Environment.isRunningInWorker) {
    alphaTab.Environment.initializeWorker();
}
else if (alphaTab.Environment.isRunningInAudioWorklet) {
    alphaTab.Environment.initializeAudioWorklet();
}
else {
    alphaTab.Environment.initializeMain(settings => {
        if (alphaTab.Environment.webPlatform == alphaTab.WebPlatform.NodeJs) {
            throw new alphaTab.AlphaTabError(alphaTab.AlphaTabErrorType.General, 'Workers not yet supported in Node.js');
        }
        if (alphaTab.Environment.webPlatform == alphaTab.WebPlatform.BrowserModule || alphaTab.Environment.isWebPackBundled || alphaTab.Environment.isViteBundled) {
            alphaTab.Logger.debug("AlphaTab", "Creating webworker");
            return new alphaTab.Environment.alphaTabWorker(new URL('./alphaTab.worker.mjs', import.meta.url), { type: 'module' });
        }
        // classical browser entry point
        if (!settings.core.scriptFile) {
            throw new alphaTab.AlphaTabError(alphaTab.AlphaTabErrorType.General, 'Could not detect alphaTab script file, cannot initialize renderer');
        }
        try {
            alphaTab.Logger.debug('AlphaTab', 'Creating Blob worker');
            const script = `importScripts('${settings.core.scriptFile}')`;
            const blob = new Blob([script]);
            return new Worker(URL.createObjectURL(blob));
        }
        catch (e) {
            alphaTab.Logger.warning('Rendering', 'Could not create inline worker, fallback to normal worker');
            return new Worker(settings.core.scriptFile);
        }
    }, (context, settings) => {
        if (alphaTab.Environment.webPlatform == alphaTab.WebPlatform.NodeJs) {
            throw new alphaTab.AlphaTabError(alphaTab.AlphaTabErrorType.General, 'Audio Worklets not yet supported in Node.js');
        }
        if (alphaTab.Environment.webPlatform == alphaTab.WebPlatform.BrowserModule || alphaTab.Environment.isWebPackBundled || alphaTab.Environment.isViteBundled) {
            alphaTab.Logger.debug("AlphaTab", "Creating Module worklet");
            const alphaTabWorklet = context.audioWorklet; // this name triggers the WebPack Plugin
            return alphaTabWorklet.addModule(new URL('./alphaTab.worklet.mjs', import.meta.url));
        }
        alphaTab.Logger.debug('AlphaTab', 'Creating Script worklet');
        return context.audioWorklet.addModule(settings.core.scriptFile);
    });
}
//# sourceMappingURL=alphaTab.mjs.map
