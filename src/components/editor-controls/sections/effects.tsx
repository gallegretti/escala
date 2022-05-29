import React, { useState } from "react"
import { PalmMuteGlyph } from "../icons/effects/palm-mute"
import { GhostNoteGlyph } from "../icons/effects/ghost-note"
import { AccentuatedNoteGlyph } from "../icons/effects/accentuated-note"
import { HeavyAccentuatedNoteGlyph } from "../icons/effects/heavy-accentuated-note"
import { DeadNoteGlyph } from "../icons/effects/dead-note"
import { Divider } from "@mui/material"
import HarmonicButton from "../components/harmonic-button"
import PreBendButton from "../components/bends/pre-bend-button"
import BendButton from "../components/bends/bend-button"
import ReleaseBendButton from "../components/bends/release-button"
import { BendState } from "../editor-controls"
import { BendType } from "../../../editor/bend-type"
import { TapNoteGlyph } from "../icons/effects/tap-note"
import { VibratoNoteGlyph } from "../icons/effects/vibratro"

interface EffectsSectionProps {
    hasSelectedNote: boolean;
    isPalmMute: boolean | null;
    isGhost: boolean | null;
    isDeadNote: boolean | null;
    isLeftHandTapNote: boolean | null;
    isVibrato: boolean | null;
    currentHarmonicType: any | null;
    currentAccentuation: any | null;
    currentBend: BendState | null;
    togglePalmMute: () => void;
    setVibrato: (value: boolean) => void;
    setGhostNote: (value: boolean) => void;
    setAccentuationNote: (value: any) => void;
    setDeadNote: (value: boolean) => void;
    setTapNote: (value: boolean) => void;
    setHarmonicType: (value: any) => void;
    setBend: (bend: BendState) => void;
}

export function EffectsSection(props: EffectsSectionProps) {
    const [openPopper, setOpenPopper] = useState<string | null>(null);
    const setBend = (newBend: keyof BendState, bendType: BendType) => {
        if (props.currentBend === null) {
            return;
        }
        if (props.currentBend[newBend] === bendType) {
            props.setBend({
                ...props.currentBend,
                [newBend]: null
            });
        } else {
            props.setBend({
                ...props.currentBend,
                [newBend]: bendType
            });
        }
    }

    const updateOpenPopper = (popperId: string) => {
        setOpenPopper((popper) => popper === popperId ? null : popperId);
    }

    return (
        <>
            <PalmMuteGlyph
                disabled={!props.hasSelectedNote}
                selected={props.isPalmMute ?? false}
                onClick={() => props.togglePalmMute()}
            />
            <GhostNoteGlyph
                disabled={!props.hasSelectedNote}
                selected={props.isGhost ?? false}
                onClick={() => props.setGhostNote(!props.isGhost)}
            />
            <AccentuatedNoteGlyph
                disabled={!props.hasSelectedNote}
                selected={props.currentAccentuation === alphaTab.model.AccentuationType.Normal}
                onClick={() => props.setAccentuationNote(props.currentAccentuation === alphaTab.model.AccentuationType.Normal ? alphaTab.model.AccentuationType.None : alphaTab.model.AccentuationType.Normal)}
            />
            <HeavyAccentuatedNoteGlyph
                disabled={!props.hasSelectedNote}
                selected={props.currentAccentuation === alphaTab.model.AccentuationType.Heavy}
                onClick={() => props.setAccentuationNote(props.currentAccentuation === alphaTab.model.AccentuationType.Heavy ? alphaTab.model.AccentuationType.None : alphaTab.model.AccentuationType.Heavy)}
            />
            <DeadNoteGlyph
                disabled={!props.hasSelectedNote}
                selected={props.isDeadNote ?? false}
                onClick={() => props.setDeadNote(!props.isDeadNote)}
            />
            <TapNoteGlyph
                disabled={!props.hasSelectedNote}
                selected={props.isLeftHandTapNote ?? false}
                onClick={() => props.setTapNote(!props.isLeftHandTapNote)}
            />
            <VibratoNoteGlyph
                disabled={!props.hasSelectedNote}
                selected={props.isVibrato ?? false}
                onClick={() => props.setVibrato(!props.isVibrato)}
            />
            <Divider variant="middle" orientation="vertical" flexItem />
            <HarmonicButton
                disabled={!props.hasSelectedNote}
                currentHarmonicType={props.currentHarmonicType ?? 0}
                setHarmonicType={props.setHarmonicType}
                isPopperOpen={openPopper === 'harmonic'}
                setPopperOpen={() => updateOpenPopper('harmonic')}
            />
            <Divider variant="middle" orientation="vertical" flexItem />
            <PreBendButton
                disabled={!props.hasSelectedNote}
                preBend={props.currentBend?.preBend ?? null}
                setPreBend={(bendType) => { setBend('preBend', bendType) }}
                isPopperOpen={openPopper === 'pre-bend'}
                setPopperOpen={() => updateOpenPopper('pre-bend')}
            />
            <BendButton
                disabled={!props.hasSelectedNote}
                bend={props.currentBend?.bend ?? null}
                hasSelectedNote={props.hasSelectedNote}
                setBend={(bendType) => { setBend('bend', bendType) }}
                isPopperOpen={openPopper === 'bend'}
                setPopperOpen={() => updateOpenPopper('bend')}
            />
            <ReleaseBendButton
                disabled={!props.hasSelectedNote}
                release={props.currentBend?.release ?? null}
                setRelease={(bendType) => { setBend('release', bendType) }}
                isPopperOpen={openPopper === 'release'}
                setPopperOpen={() => updateOpenPopper('release')}
            />
        </>
    )
}