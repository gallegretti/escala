import React from "react";
import { TextGlyph } from "../icons/beat/text";
import { Divider } from "@mui/material";
import { UpstrokeGlyph } from "../icons/beat/upstroke";
import { DownStrokeGlyph } from "../icons/beat/downstroke";

interface BeatSectionProps {
    currentPickStroke: number | null,
    setPickStroke: (stroke: number) => void,
    hasSelectedBeat: boolean, setText: () => void
}

export function BeatSection(props: BeatSectionProps) {
    return (
        <>
            <TextGlyph disabled={!props.hasSelectedBeat} selected={false} onClick={() => {
                if (props.hasSelectedBeat) {
                    props.setText()
                }
            }} />
            <Divider variant="middle" orientation="vertical" flexItem />
            <UpstrokeGlyph
                disabled={!props.hasSelectedBeat}
                selected={props.currentPickStroke === alphaTab.model.PickStroke.Up}
                onClick={() => props.setPickStroke(props.currentPickStroke === alphaTab.model.PickStroke.Up ? alphaTab.model.PickStroke.None : alphaTab.model.PickStroke.Up)}
            />
            <DownStrokeGlyph
                disabled={!props.hasSelectedBeat}
                selected={props.currentPickStroke === alphaTab.model.PickStroke.Down}
                onClick={() => props.setPickStroke(props.currentPickStroke === alphaTab.model.PickStroke.Down ? alphaTab.model.PickStroke.None : alphaTab.model.PickStroke.Down)}
            />
        </>
    );
}