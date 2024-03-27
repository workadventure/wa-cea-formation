/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    var inBubble = WA.sound.loadSound("./webrtc-in.mp3");
    var outBubble = WA.sound.loadSound("./webrtc-out.mp3");
    var config = {
        volume : 0.5,
        loop : false,
        rate : 1,
        detune : 1,
        delay : 0,
        seek : 0,
        mute : false
    }
    
    
    WA.room.area.onEnter("bubble").subscribe(() => {
        WA.displayBubble();
        WA.room.hideLayer("step1overlay");
        WA.room.hideLayer("step1");
        WA.room.showLayer("step2");
        inBubble.play(config);
        outBubble.stop();
    })

    WA.room.area.onLeave("bubble").subscribe(() => {
        WA.removeBubble();
        inBubble.stop();
        outBubble.play(config);
    });

    WA.room.area.onEnter("chat").subscribe(() => {
        WA.room.hideLayer("step2");
        WA.room.showLayer("step3");
    })

    WA.room.area.onEnter("interaction").subscribe(() => {
        WA.room.hideLayer("step3");
        WA.room.showLayer("step4");
    })

    WA.room.area.onEnter("silent").subscribe(() => {
        WA.room.hideLayer("step4");
        WA.room.showLayer("step5");
    })

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));


export {};
