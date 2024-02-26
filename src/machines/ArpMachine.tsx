import styled from '@emotion/styled';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import * as React from 'react';
import * as WebMidi from 'webmidi';
import { AddBox, Clear, VolumeOff, VolumeUp } from '@mui/icons-material';
import { Checkbox, IconButton, Slider } from '@mui/material';

import { allNotes } from '../Utils';
import { MidiLinkModel } from '../layout/Link';
import { MachineNodeModel } from './../layout/Node';
import { ClockMachine } from './ClockMachine';
import { AbstractMachine, CustomNodeWidgetProps, MachineFactory, MachineMessage, MachineSourceTarget, MachineType, registeredMachine } from './Machines';

interface NoteConfig {

    noteValue: string;
    octave: number;
    muted: boolean;
}

type ArpStyle = "up" | "down" | "updown" | "updown2" | "random";

interface ArpConfig {

    notes: NoteConfig[];
    notesToPlay: NoteConfig[];
    octaves: number;
    arpStyle: ArpStyle;
}

const notesRawDataCache: { [note: string]: Uint8Array } = { }

@registeredMachine
export class ArpMachine extends AbstractMachine implements MachineSourceTarget {

    private static factory: MachineFactory;
    private config: ArpConfig;
    getFactory() { return ArpMachine.factory; }

    private arpIndex = 0;
    private clockIndex = 0;

    static buildFactory(): MachineFactory {

        if (this.factory) {

            return this.factory;
        }

        this.factory = {

            createMachine(arpConfig?: ArpConfig): AbstractMachine {

                return new ArpMachine(arpConfig);
            },
            getName(): string { return "ArpMachine"; },
            createWidget(engine: DiagramEngine, node: MachineNodeModel) { return <ArpNodeWidget engine={engine} size={50} machine={node.machine as ArpMachine} />; },
            getType() { return MachineType.Emitter; },
            getTooltip() { return "Reads CLOCK message and sends out arpeggiated notes ; add notes to the arpeggiato with the + button"; },
            getMachineCode() { return "arp" }
        }

        return this.factory;
    }

    constructor(config?: ArpConfig) {

        super();

        this.config = config ?? { notes: [], octaves: 1, arpStyle: "up", notesToPlay: [] };
        this.getNode().addMachineInPort("Clock", 0);
        this.getNode().addMachineOutPort("Out", 0);
    }

    setState(config: ArpConfig) {

        let notesToPlay = config.notes.slice();
        for (let i = 1; i < config.octaves; i++) {

            config.notes.forEach(note => notesToPlay.push({ noteValue: note.noteValue, muted: note.muted, octave: note.octave + i }));
        }

        switch (config.arpStyle) {

            case "down":
                notesToPlay = notesToPlay.reverse();
                break;
            case "updown":
                const reversed = notesToPlay.slice();
                reversed.shift();
                reversed.reverse();
                reversed.shift();
                notesToPlay = notesToPlay.concat(reversed);
                break;
            case "updown2":
                notesToPlay = notesToPlay.concat(notesToPlay.slice().reverse());
                break
            default:
            case "random":
            case "up":
                break;
        }

        if (this.arpIndex >= notesToPlay.length) {

            this.arpIndex = notesToPlay.length - 1;
        }

        if (this.config.notes.length !== config.notes.length) {

            this.clockIndex = 0;
            this.arpIndex = 0;
            if (this.previousNote != undefined) {

                this.emit({ message: { rawData: this.previousNote, isChannelMessage: true, type: "noteoff", channel: 0 }, type: "noteoff" }, 0);
            }

            this.emit(ClockMachine.messages["stop"], 0);
        }

        this.config = { ...config, notesToPlay: notesToPlay };
    }

    getState() {

        return this.config;
    }

    private previousNote: Uint8Array | undefined;

    receive(messageEvent: MachineMessage, _: number, link: MidiLinkModel): void {

        switch (messageEvent.type) {

            case "start":
                link.setSending(true);
                this.emit(messageEvent, 0);
                this.arpIndex = 0;
                break;
            case "stop":
                link.setSending(true);
                this.clockIndex = 0;
                if (this.previousNote != undefined) {

                    this.emit({ message: { rawData: this.previousNote, isChannelMessage: true, type: "noteoff", channel: 0 }, type: "noteoff" }, 0);
                }

                this.emit(messageEvent, 0);
                break;
            case "clock":
                link.setSending(true);
                const max = Math.floor(24 / this.config.notes.length);
                if (this.config.notes.length !== 0 && this.emit != undefined) {

                    this.clockIndex = (this.clockIndex + 1) % max;
                    if (this.clockIndex === 0) {

                        const noteData = this.config.notesToPlay[this.arpIndex];

                        if (this.previousNote != undefined) {

                            this.emit({ message: { rawData: this.previousNote, isChannelMessage: true, type: "noteoff", channel: 0 }, type: "noteoff" }, 0);
                        }

                        this.arpIndex = this.config.arpStyle === "random"
                            ? Math.floor(Math.random() * this.config.notesToPlay.length)
                            : (this.arpIndex + 1) % this.config.notesToPlay.length;

                        if (noteData.muted) {

                            return;
                        }

                        if (!notesRawDataCache[noteData.noteValue + noteData.octave]) {

                            const note = WebMidi.Utilities.buildNote(noteData.noteValue + noteData.octave, { rawAttack: 150 });
                            notesRawDataCache[noteData.noteValue + noteData.octave] = Uint8Array.from([
                                (WebMidi.Enumerations.MIDI_CHANNEL_MESSAGES.noteon << 4),
                                note.getOffsetNumber(WebMidi.WebMidi.octaveOffset),
                                note.rawAttack]);
                        }

                        const data = notesRawDataCache[noteData.noteValue + noteData.octave];

                        this.emit({ message: { rawData: data, isChannelMessage: true, type: "noteon", channel: 0 }, type: "noteon" }, 0);
                        this.previousNote = data;
                    }
                }
                break;
            default:
                break;
        }
    }
}

const ArpNodeWidget: React.FunctionComponent<CustomNodeWidgetProps<ArpMachine>> = props => {

    const [config, setConfig] = React.useState(props.machine.getState());

    function update(newConfig: ArpConfig) {

        props.machine.setState(newConfig);
        setConfig(newConfig);
    }
    function noteToIndex(note: string) {

        return allNotes.indexOf(note);
    }

    const notesRender = config.notes.map((note, i) =>
        <S.Note key={i}>
            <Slider
                sx={{

                    '& input[type="range"]': {

                        WebkitAppearance: 'slider-vertical',
                    },
                }}
                step={1}
                style={{ marginTop: 10, marginBottom: 10 }}
                orientation="vertical"
                defaultValue={0}
                max={11}
                value={noteToIndex(note.noteValue)}
                valueLabelDisplay="off"
                onChange={(_, v) => {

                    if (typeof v === "number") {

                        config.notes[i].noteValue = allNotes[v];
                        update({ ...config, notes: config.notes })
                    }
                }}
            />
            <S.SettingsBarVertical
                style={{ margin: 0, padding: 0 }}>
                <Checkbox aria-label="add note"
                    icon={<VolumeOff />}
                    style={{ margin: 0, padding: 0 }}
                    checkedIcon={<VolumeUp />}
                    checked={!note.muted}
                    onChange={e => {

                        config.notes[i].muted = !e.target.checked;
                        update({ ...config, notes: config.notes });
                    }} />
                <IconButton aria-label="remove note"
                    color="error"
                    size="small"
                    style={{ margin: 0, padding: 0 }}
                    onClick={() => {

                        config.notes.splice(i, 1);
                        update({ ...config, notes: config.notes });
                    }
                    }>
                    <Clear />
                </IconButton>
            </S.SettingsBarVertical>
            {note.noteValue + note.octave}
        </S.Note>);

    return (
        <S.SettingsBarHorizontal>
            <S.SettingsBarVertical>
                {notesRender}
                <IconButton aria-label="add note"
                    color="primary"
                    onClick={() => update({ ...config, notes: config.notes.concat({ muted: false, noteValue: "C", octave: 3 }) })}>
                    <AddBox />
                </IconButton>
            </S.SettingsBarVertical>
            {config.octaves + " octaves"}
            <Slider aria-label="Volume"
                min={1}
                max={4}
                onChange={(_, v) => {

                    if (typeof v === "number") {

                        update({ ...config, octaves: v })
                    }
                }}
                value={config.octaves} />
            <S.Dropdown>
                <span>Style: </span>
                <select name="arpstyle"
                    value={config.arpStyle}
                    onChange={e => { update({ ...config, arpStyle: e.target.value as ArpStyle }) }}                    >
                    <option value="up">Up</option>
                    <option value="down">Down</option>
                    <option value="updown">UpDown</option>
                    <option value="updown2">UpDown2</option>
                    <option value="random">Random</option>
                </select>
            </S.Dropdown>
        </S.SettingsBarHorizontal>
    );
}

namespace S {

    export const Dropdown = styled.div`
        vertical-align: middle;
        span {

            vertical-align: middle;
        }
        input {

            vertical-align: middle;
        }
    `;
    export const Slider = styled.div`
        vertical-align: middle;
        input {

            vertical-align: middle;
        }
        span {

            vertical-align: middle;
        }
    `;

    export const Note = styled.div`
        height: 200px;
        position: relative;
        vertical-align: middle;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    `;

    export const SettingsBarVertical = styled.div`
        position: relative;
        vertical-align: middle;
        width: 100%;
        display: flex;
        justifyContent: "down";
        flex-direction: row;
    `;

    export const SettingsBarHorizontal = styled.div`
        position: relative;
        vertical-align: middle;
        width: 100%;
        display: flex;
        justifyContent: "down";
        flex-direction: column;
        padding: 10px;
    `;
}