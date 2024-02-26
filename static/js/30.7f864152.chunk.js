"use strict";(self.webpackChunkmidispatcher=self.webpackChunkmidispatcher||[]).push([[30],{63030:function(e,t,n){n.r(t),n.d(t,{ToneJsSynthMachine:function(){return T}});var a,o,i,r,s,l,c,u,d,p,f,v,y,h,g=n(30168),m=n(70885),k=n(15671),x=n(43144),w=n(60136),b=n(27277),C=n(7894),S=n(47313),j=n(28689),E=n(94650),Z=n(47616),q=n(22089),D=n(46417),T=(0,q.xc)((o=function(e){(0,w.Z)(n,e);var t=(0,b.Z)(n);function n(e){var a;return(0,k.Z)(this,n),(a=t.call(this)).synth=void 0,a.config=void 0,a.destination=void 0,a.config=null!==e&&void 0!==e?e:P[0],a.synth=new j.v2(j.I8,a.config.voice),a.destination=new j.qk,a.synth.connect(a.destination),a.destination.toDestination(),a.getNode().addMachineInPort("In",1),a}return(0,x.Z)(n,[{key:"getState",value:function(){return this.config}},{key:"setState",value:function(e){var t=new j.v2(j.I8,e.voice);this.config=e,this.synth.dispose(),this.synth=t.connect(this.destination)}},{key:"dispose",value:function(){this.synth.releaseAll()}},{key:"getFactory",value:function(){return n.factory}},{key:"receive",value:function(e,t,n){switch(e.type){case"stop":this.synth.releaseAll(),n.setSending(!0);break;case"noteon":n.setSending(!0),0===e.message.rawData[2]?this.synth.triggerRelease((0,E.lK)(e.message.rawData[1])):this.synth.triggerAttack((0,E.lK)(e.message.rawData[1]),j.Do.currentTime,(0,E.e1)(e.message.rawData[2]));break;case"noteoff":n.setSending(!0),this.synth.triggerRelease((0,E.lK)(e.message.rawData[1]))}}},{key:"getInChannelCount",value:function(){return 1}}],[{key:"buildFactory",value:function(){return this.factory||(this.factory={createMachine:function(e){return new n(e)},createWidget:function(e,t){return(0,D.jsx)(I,{engine:e,size:50,node:t,machine:t.machine})},getName:function(){return"ToneJsSynthMachine"},getType:function(){return q.Ax.Output},getTooltip:function(){return"Reads MIDI notes and emits sound"},getMachineCode:function(){return"tonejssynth"}}),this.factory}}]),n}(q.Vs),o.factory=void 0,a=o))||a,I=function(e){var t=S.useState({inError:!1,voiceConfig:e.node.machine.getState(),editVoice:JSON.stringify(e.node.machine.getState().voice,null,2)}),n=(0,m.Z)(t,2),a=n[0],o=n[1],i=S.useState(!1),r=(0,m.Z)(i,2),s=r[0],l=r[1];function c(t){return(0,D.jsx)(Z.kL,{engine:e.engine,port:t},t.getID())}function u(t,n){var a=!0;try{var i={preset:n,voice:JSON.parse(t)};e.machine.setState(i),a=!1}catch(s){}var r={voiceConfig:e.node.machine.getState(),editVoice:t,inError:a};o(r)}function d(t){e.node.setLocked(!t)}var p=S.useRef(null);!function(e,t){S.useEffect((function(){if(e){e.style.height="0px";var t=e.scrollHeight;e.style.height=t+"px",e.style.width="0px";var n=e.scrollWidth+5;e.style.width=n+"px"}}),[e,t])}(p.current,a.editVoice);var f=s?"\u25b2":"\u25bc",v=(0,q.mV)(e.machine.destination),h=(0,m.Z)(v,2),g=h[0],k=h[1];return(0,D.jsxs)(y.Body,{"data-default-node-name":e.node.getOptions().name,selected:e.node.isSelected(),background:e.node.getOptions().color,children:[(0,D.jsx)(y.Title,{children:(0,D.jsx)(y.TitleName,{children:e.node.getOptions().name})}),(0,D.jsxs)(y.Ports,{children:[(0,D.jsx)(y.PortsContainer,{children:e.node.getInPorts().map(c)}),(0,D.jsx)(y.PortsContainer,{children:e.node.getOutPorts().map(c)})]}),(0,D.jsxs)(y.SettingsBar,{children:[(0,D.jsx)("div",{ref:g}),(0,D.jsx)("div",{ref:k}),(0,D.jsxs)(y.ExpandButton,{open:s,onClick:function(){l(!s)},children:[f," Edit ",a.voiceConfig.preset," ",f]}),(0,D.jsxs)(y.InternalWrapper,{open:s,children:[(0,D.jsxs)(y.Dropdown,{children:[(0,D.jsx)("span",{children:"Preset: "}),(0,D.jsx)("select",{name:"waveform",value:a.voiceConfig.preset,onChange:function(e){var t;"Custom"!==(t=e.target.value)&&u(JSON.stringify(P.filter((function(e){return e.preset===t}))[0].voice,null,2),t)},children:P.map((function(e){return(0,D.jsx)("option",{value:e.preset,children:e.preset},e.preset)}))})]}),(0,D.jsx)(y.VoiceInput,{inError:a.inError,value:a.editVoice,onChange:function(e){return u(e.target.value,"Custom")},spellCheck:!1,ref:p,onKeyDown:function(e){e.stopPropagation()},onMouseOver:function(e){return d(!1)},onMouseOut:function(e){return d(!0)}})]}),(0,D.jsx)("button",{onClick:function(){u(JSON.stringify(a.voiceConfig.voice,null,2),a.voiceConfig.preset)},disabled:!a.inError,children:"Reset"})]})]})};(h=y||(y={})).ExpandButton=C.default.button(i||(i=(0,g.Z)(["\n        background: ",";\n        float: center;\n        border: solid;\n        border-width: 1px;\n        border-color: rgb(60, 60, 60);\n        color: white;\n        outline: none;\n        cursor: pointer;\n        border-radius: 5px;\n        transition: all 0.3s ease-in-out;\n    "])),(function(e){return e.open?"rgb(7, 133, 116)":"rgb(7, 81, 7)"})),h.Dropdown=C.default.div(r||(r=(0,g.Z)(["\n        vertical-align: middle;\n        width: 100%;\n        span {\n\n            vertical-align: middle;\n        }\n        input {\n\n            vertical-align: middle;\n        }\n    "]))),h.VoiceInput=C.default.textarea(s||(s=(0,g.Z)(["\n        display: inline-block;\n        border: solid 1px black;\n        width: 100%;\n        white-space: pre;\n        max-width: auto;\n        font-size: 11px;\n        padding: 5px;\n        overflow-wrap: normal;\n        overscroll-behavior: contain;\n        overflow-y: hidden;\n        overflow-x: hidden;\n        background-color: ",";\n    "])),(function(e){return e.inError?"#ffe6e6":"white"})),h.SettingsBar=C.default.div(l||(l=(0,g.Z)(['\n        padding: 3px;\n        position: relative;\n        vertical-align: middle;\n        width: auto;\n        display: flex;\n        justifyContent: "center";\n        flex-direction: column;\n    ']))),h.InternalWrapper=C.default.div(c||(c=(0,g.Z)(["\n        width: 100%;\n        height: ",";\n        overflow: hidden;\n    "])),(function(e){return e.open?"auto":"0"})),h.Title=C.default.div(u||(u=(0,g.Z)(["\n        background: rgba(0, 0, 0, 0.3);\n        display: flex;\n        white-space: nowrap;\n        justify-items: center;\n    "]))),h.TitleName=C.default.div(d||(d=(0,g.Z)(["\n        flex-grow: 1;\n        padding: 5px 5px;\n    "]))),h.Ports=C.default.div(p||(p=(0,g.Z)(["\n        display: flex;\n        background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2));\n    "]))),h.PortsContainer=C.default.div(f||(f=(0,g.Z)(["\n        flex-grow: 1;\n        display: flex;\n        flex-direction: column;\n        &:first-of-type {\n\n            margin-right: 10px;\n        }\n        &:only-child {\n\n            margin-right: 0px;\n        }\n    "]))),h.Body=C.default.div(v||(v=(0,g.Z)(["\n        background-color: ",";\n        border-radius: 5px;\n        font-family: sans-serif;\n        color: white;\n        border: solid 2px black;\n        overflow: visible;\n        font-size: 11px;\n        border: solid 2px ",";\n\n    * {\n\n        box-sizing:border-box\n    }"])),(function(e){return e.background}),(function(e){return e.selected?"rgb(0,192,255)":"black"}));var P=[{preset:"Default",voice:{volume:15,detune:0,portamento:0,harmonicity:2.5,oscillator:{partialCount:0,partials:[],phase:0,type:"fatsawtooth",count:3,spread:20},envelope:{attack:.1,attackCurve:"linear",decay:.2,decayCurve:"exponential",release:.3,releaseCurve:"exponential",sustain:.2},modulation:{partialCount:0,partials:[],phase:0,type:"square"},modulationEnvelope:{attack:.5,attackCurve:"linear",decay:.01,decayCurve:"exponential",release:.5,releaseCurve:"exponential",sustain:1}}},{preset:"Harmonics",voice:{harmonicity:3.999,oscillator:{type:"square"},envelope:{attack:.03,decay:.3,sustain:.7,release:.8},modulation:{volume:12,type:"square6"},modulationEnvelope:{attack:2,decay:3,sustain:.8,release:.1}}},{preset:"Tiny",voice:{harmonicity:2,oscillator:{type:"amsine2",modulationType:"sine",harmonicity:1.01},envelope:{attack:.006,decay:4,sustain:.04,release:1.2},modulation:{volume:13,type:"amsine2",modulationType:"sine",harmonicity:12},modulationEnvelope:{attack:.006,decay:.2,sustain:.2,release:.4}}},{preset:"Bah",voice:{volume:10,oscillator:{type:"sawtooth"},filter:{Q:2,type:"bandpass",rolloff:-24},envelope:{attack:.01,decay:.1,sustain:.2,release:.6},filterEnvelope:{attack:.02,decay:.4,sustain:1,release:.7,releaseCurve:"linear",baseFrequency:20,octaves:5}}},{preset:"BassGuitar",voice:{oscillator:{type:"fmsquare5",modulationType:"triangle",modulationIndex:2,harmonicity:.501},filter:{Q:1,type:"lowpass",rolloff:-24},envelope:{attack:.01,decay:.1,sustain:.4,release:2},filterEnvelope:{attack:.01,decay:.1,sustain:.8,release:1.5,baseFrequency:50,octaves:4.4}}},{preset:"Bassy",voice:{portamento:.08,oscillator:{partials:[2,1,3,2,.4]},filter:{Q:4,type:"lowpass",rolloff:-48},envelope:{attack:.04,decay:.06,sustain:.4,release:1},filterEnvelope:{attack:.01,decay:.1,sustain:.6,release:1.5,baseFrequency:50,octaves:3.4}}},{preset:"BrassCircuit",voice:{portamento:.01,oscillator:{type:"sawtooth"},filter:{Q:2,type:"lowpass",rolloff:-24},envelope:{attack:.1,decay:.1,sustain:.6,release:.5},filterEnvelope:{attack:.05,decay:.8,sustain:.4,release:1.5,baseFrequency:2e3,octaves:1.5}}},{preset:"CoolGuy",voice:{oscillator:{type:"pwm",modulationFrequency:1},filter:{Q:6,rolloff:-24},envelope:{attack:.025,decay:.3,sustain:.9,release:2},filterEnvelope:{attack:.245,decay:.131,sustain:.5,release:2,baseFrequency:20,octaves:7.2,exponent:2}}},{preset:"Pianoetta",voice:{oscillator:{type:"square"},filter:{Q:2,type:"lowpass",rolloff:-12},envelope:{attack:.005,decay:3,sustain:0,release:.45},filterEnvelope:{attack:.001,decay:.32,sustain:.9,release:3,baseFrequency:700,octaves:2.3}}},{preset:"Pizz",voice:{oscillator:{type:"sawtooth"},filter:{Q:3,type:"highpass",rolloff:-12},envelope:{attack:.01,decay:.3,sustain:0,release:.9},filterEnvelope:{attack:.01,decay:.1,sustain:0,release:.1,baseFrequency:800,octaves:-1.2}}},{preset:"AlienChorus",voice:{oscillator:{type:"fatsine4",spread:60,count:10},envelope:{attack:.4,decay:.01,sustain:1,attackCurve:"sine",releaseCurve:"sine",release:.4}}},{preset:"DelicateWindPart",voice:{portamento:0,oscillator:{type:"square4"},envelope:{attack:2,decay:1,sustain:.2,release:2}}},{preset:"DropPulse",voice:{oscillator:{type:"pulse",width:.8},envelope:{attack:.01,decay:.05,sustain:.2,releaseCurve:"bounce",release:.4}}},{preset:"Lectric",voice:{portamento:.2,oscillator:{type:"sawtooth"},envelope:{attack:.03,decay:.1,sustain:.2,release:.02}}},{preset:"Marimba",voice:{oscillator:{partials:[1,0,2,0,3]},envelope:{attack:.001,decay:1.2,sustain:0,release:1.2}}},{preset:"Steelpan",voice:{oscillator:{type:"fatcustom",partials:[.2,1,0,.5,.1],spread:40,count:3},envelope:{attack:.001,decay:1.6,sustain:0,release:1.6}}},{preset:"SuperSaw",voice:{oscillator:{type:"fatsawtooth",count:3,spread:30},envelope:{attack:.01,decay:.1,sustain:.5,release:.4,attackCurve:"exponential"}}},{preset:"TreeTrunk",voice:{oscillator:{type:"sine"},envelope:{attack:.001,decay:.1,sustain:.1,release:1.2}}}]}}]);