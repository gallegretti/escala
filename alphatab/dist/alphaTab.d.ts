/**
 * Defines all loglevels.
 * @json
 */
declare enum LogLevel {
    /**
     * No logging
     */
    None = 0,
    /**
     * Debug level (internal details are displayed).
     */
    Debug = 1,
    /**
     * Info level (only important details are shown)
     */
    Info = 2,
    /**
     * Warning level
     */
    Warning = 3,
    /**
     * Error level.
     */
    Error = 4
}

/**
 * @json
 */
declare class CoreSettings {
    /**
     * Gets or sets the script file url that will be used to spawn the workers.
     * @target web
     */
    scriptFile: string | null;
    /**
     * Gets or sets the url to the fonts that will be used to generate the alphaTab font style.
     * @target web
     */
    fontDirectory: string | null;
    /**
     * Gets or sets the file to load directly after initializing alphaTab.
     * @target web
     */
    file: string | null;
    /**
     * Gets or sets whether the UI element contains alphaTex code that should be
     * used to initialize alphaTab.
     * @target web
     */
    tex: boolean;
    /**
     * Gets or sets the initial tracks that should be loaded for the score.
     * @target web
     */
    tracks: unknown;
    /**
     * Gets or sets whether lazy loading for displayed elements is enabled.
     */
    enableLazyLoading: boolean;
    /**
     * The engine which should be used to render the the tablature.
     *
     * - **default**- Platform specific default engine
     * - **html5**- HTML5 Canvas
     * - **svg**- SVG
     */
    engine: string;
    /**
     * The log level to use within alphaTab
     */
    logLevel: LogLevel;
    /**
     * Gets or sets whether the rendering should be done in a worker if possible.
     */
    useWorkers: boolean;
    /**
     * Gets or sets whether in the {@link BoundsLookup} also the
     * position and area of each individual note is provided.
     */
    includeNoteBounds: boolean;
    /**
     * @target web
     */
    constructor();
}

/**
 * @json_immutable
 */
declare class Color {
    static readonly BlackRgb: string;
    /**
     * Initializes a new instance of the {@link Color} class.
     * @param r The red component.
     * @param g The green component.
     * @param b The blue component.
     * @param a The alpha component.
     */
    constructor(r: number, g: number, b: number, a?: number);
    updateRgba(): void;
    /**
     * Gets or sets the raw RGBA value.
     */
    raw: number;
    get a(): number;
    get r(): number;
    get g(): number;
    get b(): number;
    /**
     * Gets the RGBA hex string to use in CSS areas.
     */
    rgba: string;
    static random(opacity?: number): Color;
    static fromJson(v: unknown): Color | null;
    static toJson(obj: Color): number;
}

/**
 * Lists all flags for font styles.
 */
declare enum FontStyle {
    /**
     * No flags.
     */
    Plain = 0,
    /**
     * Font is italic.
     */
    Italic = 1
}
/**
 * Lists all font weight values.
 */
declare enum FontWeight {
    /**
     * Not bold
     */
    Regular = 0,
    /**
     * Font is bold
     */
    Bold = 1
}
/**
 * @json_immutable
 */
declare class Font {
    private _css;
    private _cssScale;
    private _families;
    private _style;
    private _weight;
    private _size;
    private reset;
    /**
     * Gets the first font family name.
     * @deprecated Consider using {@link families} for multi font family support.
     */
    get family(): string;
    /**
     * Sets the font family list.
     * @deprecated Consider using {@link families} for multi font family support.
     */
    set family(value: string);
    /**
     * Gets the font family name.
     */
    get families(): string[];
    /**
     * Sets the font family name.
     */
    set families(value: string[]);
    /**
     * Gets the font size in pixels.
     */
    get size(): number;
    /**
     * Sets the font size in pixels.
     */
    set size(value: number);
    /**
     * Gets the font style.
     */
    get style(): FontStyle;
    /**
     * Sets the font style.
     */
    set style(value: FontStyle);
    /**
     * Gets the font weight.
     */
    get weight(): FontWeight;
    /**
     * Gets or sets the font weight.
     */
    set weight(value: FontWeight);
    get isBold(): boolean;
    get isItalic(): boolean;
    /**
     * Initializes a new instance of the {@link Font} class.
     * @param family The family.
     * @param size The size.
     * @param style The style.
     * @param weight The weight.
     */
    constructor(family: string, size: number, style?: FontStyle, weight?: FontWeight);
    /**
     * Initializes a new instance of the {@link Font} class.
     * @param families The families.
     * @param size The size.
     * @param style The style.
     * @param weight The weight.
     */
    static withFamilyList(families: string[], size: number, style?: FontStyle, weight?: FontWeight): Font;
    toCssString(scale?: number): string;
    static fromJson(v: unknown): Font | null;
    static toJson(font: Font): Map<string, unknown>;
}

/**
 * This public class contains central definitions for controlling the visual appearance.
 * @json
 */
declare class RenderingResources {
    private static sansFont;
    private static serifFont;
    /**
     * Gets or sets the font to use for displaying the songs copyright information in the header of the music sheet.
     */
    copyrightFont: Font;
    /**
     * Gets or sets the font to use for displaying the songs title in the header of the music sheet.
     */
    titleFont: Font;
    /**
     * Gets or sets the font to use for displaying the songs subtitle in the header of the music sheet.
     */
    subTitleFont: Font;
    /**
     * Gets or sets the font to use for displaying the lyrics information in the header of the music sheet.
     */
    wordsFont: Font;
    /**
     * Gets or sets the font to use for displaying certain effect related elements in the music sheet.
     */
    effectFont: Font;
    /**
     * Gets or sets the font to use for displaying the fretboard numbers in chord diagrams.
     */
    fretboardNumberFont: Font;
    /**
     * Gets or sets the font to use for displaying the guitar tablature numbers in the music sheet.
     */
    tablatureFont: Font;
    /**
     * Gets or sets the font to use for grace notation related texts in the music sheet.
     */
    graceFont: Font;
    /**
     * Gets or sets the color to use for rendering the lines of staves.
     */
    staffLineColor: Color;
    /**
     * Gets or sets the color to use for rendering bar separators, the accolade and repeat signs.
     */
    barSeparatorColor: Color;
    /**
     * Gets or sets the font to use for displaying the bar numbers above the music sheet.
     */
    barNumberFont: Font;
    /**
     * Gets or sets the color to use for displaying the bar numbers above the music sheet.
     */
    barNumberColor: Color;
    /**
     * Gets or sets the font to use for displaying finger information in the music sheet.
     */
    fingeringFont: Font;
    /**
     * Gets or sets the font to use for section marker labels shown above the music sheet.
     */
    markerFont: Font;
    /**
     * Gets or sets the color to use for music notation elements of the primary voice.
     */
    mainGlyphColor: Color;
    /**
     * Gets or sets the color to use for music notation elements of the secondary voices.
     */
    secondaryGlyphColor: Color;
    /**
     * Gets or sets the color to use for displaying the song information above the music sheet.
     */
    scoreInfoColor: Color;
}

/**
 * Lists all layout modes that are supported.
 */
declare enum LayoutMode {
    /**
     * Bars are aligned in rows using a fixed width.
     */
    Page = 0,
    /**
     * Bars are aligned horizontally in one row
     */
    Horizontal = 1
}

/**
 * Lists all stave profiles controlling which staves are shown.
 */
declare enum StaveProfile {
    /**
     * The profile is auto detected by the track configurations.
     */
    Default = 0,
    /**
     * Standard music notation and guitar tablature are rendered.
     */
    ScoreTab = 1,
    /**
     * Only standard music notation is rendered.
     */
    Score = 2,
    /**
     * Only guitar tablature is rendered.
     */
    Tab = 3,
    /**
     * Only guitar tablature is rendered, but also rests and time signatures are not shown.
     * This profile is typically used in multi-track scenarios.
     */
    TabMixed = 4
}

/**
 * Lists the different modes in which the staves and systems are arranged.
 */
declare enum SystemsLayoutMode {
    /**
     * Use the automatic alignment system provided by alphaTab (default)
     */
    Automatic = 0,
    /**
     * Use the systems layout and sizing information stored from the score model.
     */
    UseModelLayout = 1
}
/**
 * The display settings control how the general layout and display of alphaTab is done.
 * @json
 */
declare class DisplaySettings {
    /**
     * Sets the zoom level of the rendered notation
     */
    scale: number;
    /**
     * The default stretch force to use for layouting.
     */
    stretchForce: number;
    /**
     * The layouting mode used to arrange the the notation.
     */
    layoutMode: LayoutMode;
    /**
     * The stave profile to use.
     */
    staveProfile: StaveProfile;
    /**
     * Limit the displayed bars per row.
     */
    barsPerRow: number;
    /**
     * The bar start number to start layouting with. Note that this is the bar number and not an index!
     */
    startBar: number;
    /**
     * The amount of bars to render overall.
     */
    barCount: number;
    /**
     * The number of bars that should be rendered per partial. This setting is not used by all layouts.
     */
    barCountPerPartial: number;
    /**
     * Whether the last system (row) should be also justified to the whole width of the music sheet.
     * (applies only for page layout).
     */
    justifyLastSystem: boolean;
    /**
     * Gets or sets the resources used during rendering. This defines all fonts and colors used.
     * @json_partial_names
     */
    resources: RenderingResources;
    /**
     * Gets or sets the padding between the music notation and the border.
     */
    padding: number[] | null;
    /**
     * Gets how the systems should be layed out.
     */
    systemsLayoutMode: SystemsLayoutMode;
}

/**
 * All settings related to importers that decode file formats.
 * @json
 */
declare class ImporterSettings {
    /**
     * The text encoding to use when decoding strings. By default UTF-8 is used.
     */
    encoding: string;
    /**
     * If part-groups should be merged into a single track.
     */
    mergePartGroupsInMusicXml: boolean;
    /**
     * If set to true, text annotations on beats are attempted to be parsed as
     * lyrics considering spaces as separators and removing underscores.
     * If a track/staff has explicit lyrics the beat texts will not be detected as lyrics.
     */
    beatTextAsLyrics: boolean;
}

/**
 * Lists the different modes on how rhythm notation is shown on the tab staff.
 */
declare enum TabRhythmMode {
    /**
     * Rhythm notation is hidden.
     */
    Hidden = 0,
    /**
     * Rhythm notation is shown with individual beams per beat.
     */
    ShowWithBeams = 1,
    /**
     * Rhythm notation is shown and behaves like normal score notation with connected bars.
     */
    ShowWithBars = 2
}
/**
 * Lists all modes on how fingerings should be displayed.
 */
declare enum FingeringMode {
    /**
     * Fingerings will be shown in the standard notation staff.
     */
    ScoreDefault = 0,
    /**
     * Fingerings will be shown in the standard notation staff. Piano finger style is enforced, where
     * fingers are rendered as 1-5 instead of p,i,m,a,c and T,1,2,3,4.
     */
    ScoreForcePiano = 1,
    /**
     * Fingerings will be shown in a effect band above the tabs in case
     * they have only a single note on the beat.
     */
    SingleNoteEffectBand = 2,
    /**
     * Fingerings will be shown in a effect band above the tabs in case
     * they have only a single note on the beat. Piano finger style is enforced, where
     * fingers are rendered as 1-5 instead of p,i,m,a,c and T,1,2,3,4.
     */
    SingleNoteEffectBandForcePiano = 3
}
/**
 * Lists all modes on how alphaTab can handle the display and playback of music notation.
 */
declare enum NotationMode {
    /**
     * Music elements will be displayed and played as in Guitar Pro.
     */
    GuitarPro = 0,
    /**
     * Music elements will be displayed and played as in traditional songbooks.
     * Changes:
     * 1. Bends
     *   For bends additional grace beats are introduced.
     *   Bends are categorized into gradual and fast bends.
     *   - Gradual bends are indicated by beat text "grad" or "grad.". Bend will sound along the beat duration.
     *   - Fast bends are done right before the next note. If the next note is tied even on-beat of the next note.
     * 2. Whammy Bars
     *   Dips are shown as simple annotation over the beats
     *   Whammy Bars are categorized into gradual and fast.
     *   - Gradual whammys are indicated by beat text "grad" or "grad.". Whammys will sound along the beat duration.
     *   - Fast whammys are done right the beat.
     * 3. Let Ring
     *   Tied notes with let ring are not shown in standard notation
     *   Let ring does not cause a longer playback, duration is defined via tied notes.
     */
    SongBook = 1
}
/**
 * Lists all major music notation elements that are part
 * of the music sheet and can be dynamically controlled to be shown
 * or hidden.
 */
declare enum NotationElement {
    /**
     * The score title shown at the start of the music sheet.
     */
    ScoreTitle = 0,
    /**
     * The score subtitle shown at the start of the music sheet.
     */
    ScoreSubTitle = 1,
    /**
     * The score artist shown at the start of the music sheet.
     */
    ScoreArtist = 2,
    /**
     * The score album shown at the start of the music sheet.
     */
    ScoreAlbum = 3,
    /**
     * The score words author shown at the start of the music sheet.
     */
    ScoreWords = 4,
    /**
     * The score music author shown at the start of the music sheet.
     */
    ScoreMusic = 5,
    /**
     * The score words&music author shown at the start of the music sheet.
     */
    ScoreWordsAndMusic = 6,
    /**
     * The score copyright owner shown at the start of the music sheet.
     */
    ScoreCopyright = 7,
    /**
     * The tuning information of the guitar shown
     * above the staves.
     */
    GuitarTuning = 8,
    /**
     * The track names which are shown in the accolade.
     */
    TrackNames = 9,
    /**
     * The chord diagrams for guitars. Usually shown
     * below the score info.
     */
    ChordDiagrams = 10,
    /**
     * Parenthesis that are shown for tied bends
     * if they are preceeded by bends.
     */
    ParenthesisOnTiedBends = 11,
    /**
     * The tab number for tied notes if the
     * bend of a note is increased at that point.
     */
    TabNotesOnTiedBends = 12,
    /**
     * Zero tab numbers on "dive whammys".
     */
    ZerosOnDiveWhammys = 13,
    /**
     * The alternate endings information on repeats shown above the staff.
     */
    EffectAlternateEndings = 14,
    /**
     * The information about the fret on which the capo is placed shown above the staff.
     */
    EffectCapo = 15,
    /**
     * The chord names shown above beats shown above the staff.
     */
    EffectChordNames = 16,
    /**
     * The crescendo/decrescendo angle  shown above the staff.
     */
    EffectCrescendo = 17,
    /**
     * The beat dynamics  shown above the staff.
     */
    EffectDynamics = 18,
    /**
     * The curved angle for fade in/out effects  shown above the staff.
     */
    EffectFadeIn = 19,
    /**
     * The fermata symbol shown above the staff.
     */
    EffectFermata = 20,
    /**
     * The fingering information.
     */
    EffectFingering = 21,
    /**
     * The harmonics names shown above the staff.
     * (does not represent the harmonic note heads)
     */
    EffectHarmonics = 22,
    /**
     * The let ring name and line above the staff.
     */
    EffectLetRing = 23,
    /**
     * The lyrics of the track shown above the staff.
     */
    EffectLyrics = 24,
    /**
     * The section markers shown above the staff.
     */
    EffectMarker = 25,
    /**
     * The ottava symbol and lines shown above the staff.
     */
    EffectOttavia = 26,
    /**
     * The palm mute name and line shown above the staff.
     */
    EffectPalmMute = 27,
    /**
     * The pick slide information shown above the staff.
     * (does not control the pick slide lines)
     */
    EffectPickSlide = 28,
    /**
     * The pick stroke symbols shown above the staff.
     */
    EffectPickStroke = 29,
    /**
     * The slight beat vibrato waves shown above the staff.
     */
    EffectSlightBeatVibrato = 30,
    /**
     * The slight note vibrato waves shown above the staff.
     */
    EffectSlightNoteVibrato = 31,
    /**
     * The tap/slap/pop effect names shown above the staff.
     */
    EffectTap = 32,
    /**
     * The tempo information shown above the staff.
     */
    EffectTempo = 33,
    /**
     * The additional beat text shown above the staff.
     */
    EffectText = 34,
    /**
     * The trill name and waves shown above the staff.
     */
    EffectTrill = 35,
    /**
     * The triplet feel symbol shown above the staff.
     */
    EffectTripletFeel = 36,
    /**
     * The whammy bar information shown above the staff.
     * (does not control the whammy lines shown within the staff)
     */
    EffectWhammyBar = 37,
    /**
     * The wide beat vibrato waves shown above the staff.
     */
    EffectWideBeatVibrato = 38,
    /**
     * The wide note vibrato waves shown above the staff.
     */
    EffectWideNoteVibrato = 39,
    /**
     * The left hand tap symbol shown above the staff.
     */
    EffectLeftHandTap = 40
}
/**
 * The notation settings control how various music notation elements are shown and behaving
 * @json
 */
declare class NotationSettings {
    /**
     * Gets or sets the mode to use for display and play music notation elements.
     */
    notationMode: NotationMode;
    /**
     * Gets or sets the fingering mode to use.
     */
    fingeringMode: FingeringMode;
    /**
     * Gets or sets the configuration on whether music notation elements are visible or not.
     * If notation elements are not specified, the default configuration will be applied.
     */
    elements: Map<NotationElement, boolean>;
    /**
     * Gets the default configuration of the {@see notationElements} setting. Do not modify
     * this map as it might not result in the expected side effects.
     * If items are not listed explicitly in this list, they are considered visible.
     */
    static defaultElements: Map<NotationElement, boolean>;
    /**
     * Whether to show rhythm notation in the guitar tablature.
     */
    rhythmMode: TabRhythmMode;
    /**
     * The height of the rythm bars.
     */
    rhythmHeight: number;
    /**
     * The transposition pitch offsets for the individual tracks.
     * They apply to rendering and playback.
     */
    transpositionPitches: number[];
    /**
     * The transposition pitch offsets for the individual tracks.
     * They apply to rendering only.
     */
    displayTranspositionPitches: number[];
    /**
     * If set to true the guitar tabs on grace beats are rendered smaller.
     */
    smallGraceTabNotes: boolean;
    /**
     * If set to true bend arrows expand to the end of the last tied note
     * of the string. Otherwise they end on the next beat.
     */
    extendBendArrowsOnTiedNotes: boolean;
    /**
     * If set to true, line effects (like w/bar, let-ring etc)
     * are drawn until the end of the beat instead of the start.
     */
    extendLineEffectsToBeatEnd: boolean;
    /**
     * Gets or sets the height for slurs. The factor is multiplied with the a logarithmic distance
     * between slur start and end.
     */
    slurHeight: number;
    /**
     * Gets whether the given music notation element should be shown
     * @param element the element to check
     * @returns true if the element should be shown, otherwise false.
     */
    isNotationElementVisible(element: NotationElement): boolean;
}

/**
 * Lists all modes how alphaTab can scroll the container during playback.
 */
declare enum ScrollMode {
    /**
     * Do not scroll automatically
     */
    Off = 0,
    /**
     * Scrolling happens as soon the offsets of the cursors change.
     */
    Continuous = 1,
    /**
     * Scrolling happens as soon the cursors exceed the displayed range.
     */
    OffScreen = 2
}
/**
 * This object defines the details on how to generate the vibrato effects.
 * @json
 */
declare class VibratoPlaybackSettings {
    /**
     * Gets or sets the wavelength of the note-wide vibrato in midi ticks.
     */
    noteWideLength: number;
    /**
     * Gets or sets the amplitude for the note-wide vibrato in semitones.
     */
    noteWideAmplitude: number;
    /**
     * Gets or sets the wavelength of the note-slight vibrato in midi ticks.
     */
    noteSlightLength: number;
    /**
     * Gets or sets the amplitude for the note-slight vibrato in semitones.
     */
    noteSlightAmplitude: number;
    /**
     * Gets or sets the wavelength of the beat-wide vibrato in midi ticks.
     */
    beatWideLength: number;
    /**
     * Gets or sets the amplitude for the beat-wide vibrato in semitones.
     */
    beatWideAmplitude: number;
    /**
     * Gets or sets the wavelength of the beat-slight vibrato in midi ticks.
     */
    beatSlightLength: number;
    /**
     * Gets or sets the amplitude for the beat-slight vibrato in semitones.
     */
    beatSlightAmplitude: number;
}
/**
 * This object defines the details on how to generate the slide effects.
 * @json
 */
declare class SlidePlaybackSettings {
    /**
     * Gets or sets 1/4 tones (bend value) offset that
     * simple slides like slide-out-below or slide-in-above use.
     */
    simpleSlidePitchOffset: number;
    /**
     * Gets or sets the percentage which the simple slides should take up
     * from the whole note. for "slide into" effects the slide will take place
     * from time 0 where the note is plucked to 25% of the overall note duration.
     * For "slide out" effects the slide will start 75% and finish at 100% of the overall
     * note duration.
     */
    simpleSlideDurationRatio: number;
    /**
     * Gets or sets the percentage which the legato and shift slides should take up
     * from the whole note. For a value 0.5 the sliding will start at 50% of the overall note duration
     * and finish at 100%
     */
    shiftSlideDurationRatio: number;
}
/**
 * Lists the different modes how alphaTab will play the generated audio.
 * @target web
 */
declare enum PlayerOutputMode {
    /**
     * If audio worklets are available in the browser, they will be used for playing the audio.
     * It will fallback to the ScriptProcessor output if unavailable.
     */
    WebAudioAudioWorklets = 0,
    /**
     * Uses the legacy ScriptProcessor output which might perform worse.
     */
    WebAudioScriptProcessor = 1
}
/**
 * The player settings control how the audio playback and UI is behaving.
 * @json
 */
declare class PlayerSettings {
    /**
     * Gets or sets the URL of the sound font to be loaded.
     */
    soundFont: string | null;
    /**
     * Gets or sets the element that should be used for scrolling.
     * @target web
     * @json_read_only
     */
    scrollElement: string | HTMLElement;
    /**
     * Gets or sets which output mode alphaTab should use.
     * @target web
     */
    outputMode: PlayerOutputMode;
    /**
     * Gets or sets whether the player should be enabled.
     */
    enablePlayer: boolean;
    /**
     * Gets or sets whether playback cursors should be displayed.
     */
    enableCursor: boolean;
    /**
     * Gets or sets whether the beat cursor should be animated or just ticking.
     */
    enableAnimatedBeatCursor: boolean;
    /**
     * Gets or sets whether the notation elements of the currently played beat should be
     * highlighted.
     */
    enableElementHighlighting: boolean;
    /**
     * Gets or sets alphaTab should provide user interaction features to
     * select playback ranges and jump to the playback position by click (aka. seeking).
     */
    enableUserInteraction: boolean;
    /**
     * Gets or sets the X-offset to add when scrolling.
     */
    scrollOffsetX: number;
    /**
     * Gets or sets the Y-offset to add when scrolling
     */
    scrollOffsetY: number;
    /**
     * Gets or sets the mode how to scroll.
     */
    scrollMode: ScrollMode;
    /**
     * Gets or sets how fast the scrolling to the new position should happen (in milliseconds)
     */
    scrollSpeed: number;
    /**
     * Gets or sets whether the native browser smooth scroll mechanism should be used over a custom animation.
     * @target web
     */
    nativeBrowserSmoothScroll: boolean;
    /**
     * Gets or sets the bend duration in milliseconds for songbook bends.
     */
    songBookBendDuration: number;
    /**
     * Gets or sets the duration of whammy dips in milliseconds for songbook whammys.
     */
    songBookDipDuration: number;
    /**
     * Gets or sets the settings on how the vibrato audio is generated.
     * @json_partial_names
     */
    readonly vibrato: VibratoPlaybackSettings;
    /**
     * Gets or sets the setitngs on how the slide audio is generated.
     * @json_partial_names
     */
    readonly slide: SlidePlaybackSettings;
    /**
     * Gets or sets whether the triplet feel should be applied/played during audio playback.
     */
    playTripletFeel: boolean;
    /**
     * Gets or sets how many milliseconds of audio samples should be buffered in total.
     * Larger buffers cause a delay from when audio settings like volumes will be applied.
     * Smaller buffers can cause audio crackling due to constant buffering that is happening.
     */
    bufferTimeInMilliseconds: number;
}

/**
 * Represents the progress of any data being loaded.
 */
declare class ProgressEventArgs {
    /**
     * Gets the currently loaded bytes.
     */
    readonly loaded: number;
    /**
     * Gets the total number of bytes to load.
     */
    readonly total: number;
    /**
     * Initializes a new instance of the {@link ProgressEventArgs} class.
     * @param loaded
     * @param total
     */
    constructor(loaded: number, total: number);
}

/**
 * This public class contains instance specific settings for alphaTab
 * @json
 */
declare class Settings {
    /**
     * The core settings control the general behavior of alphatab like
     * what modules are active.
     * @json_on_parent
     * @json_partial_names
     */
    readonly core: CoreSettings;
    /**
     * The display settings control how the general layout and display of alphaTab is done.
     * @json_on_parent
     * @json_partial_names
     */
    readonly display: DisplaySettings;
    /**
     * The notation settings control how various music notation elements are shown and behaving.
     * @json_partial_names
     */
    readonly notation: NotationSettings;
    /**
     * All settings related to importers that decode file formats.
     * @json_partial_names
     */
    readonly importer: ImporterSettings;
    /**
     * Contains all player related settings
     * @json_partial_names
     */
    player: PlayerSettings;
    setSongBookModeSettings(): void;
    static get songBook(): Settings;
    /**
     * @target web
     */
    fillFromJson(json: any): void;
}

/**
 * Represents the information related to a resize event.
 */
declare class ResizeEventArgs {
    /**
     * Gets the size before the resizing happened.
     */
    oldWidth: number;
    /**
     * Gets the size after the resize was complete.
     */
    newWidth: number;
    /**
     * Gets the settings currently used for rendering.
     */
    settings: Settings | null;
    core(): CoreSettings;
    private causeIssue;
}

declare enum AlphaTabErrorType {
    General = 0,
    Format = 1,
    AlphaTex = 2
}
declare class AlphaTabError extends Error {
    inner: Error | null;
    type: AlphaTabErrorType;
    constructor(type: AlphaTabErrorType, message?: string | null, inner?: Error);
}

/**
 * An invalid input format was detected (e.g. invalid setting values, file formats,...)
 */
declare class FormatError extends AlphaTabError {
    constructor(message: string);
}

interface ILogger {
    debug(category: string, msg: string, ...details: unknown[]): void;
    warning(category: string, msg: string, ...details: unknown[]): void;
    info(category: string, msg: string, ...details: unknown[]): void;
    error(category: string, msg: string, ...details: unknown[]): void;
}
declare class Logger {
    static logLevel: LogLevel;
    static log: ILogger;
    private static shouldLog;
    static debug(category: string, msg: string, ...details: unknown[]): void;
    static warning(category: string, msg: string, ...details: unknown[]): void;
    static info(category: string, msg: string, ...details: unknown[]): void;
    static error(category: string, msg: string, ...details: unknown[]): void;
}

/**
 * @target web
 */
declare class FileLoadError extends AlphaTabError {
    xhr: XMLHttpRequest;
    constructor(message: string, xhr: XMLHttpRequest);
}

/**
 * Represents a stream of binary data that can be read from.
 */
interface IReadable {
    /**
     * Gets or sets the current read position relative in the stream.
     */
    position: number;
    /**
     * Gets the total number of bytes contained in the stream.
     */
    readonly length: number;
    /**
     * Resets the stream for reading the data from the beginning.
     */
    reset(): void;
    /**
     * Skip the given number of bytes.
     * @param offset The number of bytes to skip.
     */
    skip(offset: number): void;
    /**
     * Read a single byte from the data stream.
     * @returns The value of the next byte or -1 if there is no more data.
     */
    readByte(): number;
    /**
     * Reads the given number of bytes from the stream into the given buffer.
     * @param buffer The buffer to fill.
     * @param offset The offset in the buffer where to start writing.
     * @param count The number of bytes to read.
     * @returns
     */
    read(buffer: Uint8Array, offset: number, count: number): number;
    /**
     * Reads the remaining data.
     * @returns
     */
    readAll(): Uint8Array;
}

/**
 * This public enumeration lists all types of automations.
 */
declare enum AutomationType {
    /**
     * Tempo change.
     */
    Tempo = 0,
    /**
     * Colume change.
     */
    Volume = 1,
    /**
     * Instrument change.
     */
    Instrument = 2,
    /**
     * Balance change.
     */
    Balance = 3
}
/**
 * Automations are used to change the behaviour of a song.
 * @cloneable
 * @json
 * @json_strict
 */
declare class Automation {
    /**
     * Gets or sets whether the automation is applied linear.
     */
    isLinear: boolean;
    /**
     * Gets or sets the type of the automation.
     */
    type: AutomationType;
    /**
     * Gets or sets the target value of the automation.
     */
    value: number;
    /**
     * Gets or sets the relative position of of the automation.
     */
    ratioPosition: number;
    /**
     * Gets or sets the additional text of the automation.
     */
    text: string;
    static buildTempoAutomation(isLinear: boolean, ratioPosition: number, value: number, reference: number): Automation;
    static buildInstrumentAutomation(isLinear: boolean, ratioPosition: number, value: number): Automation;
}

/**
 * A single point of a bending graph. Used to
 * describe WhammyBar and String Bending effects.
 * @cloneable
 * @json
 * @json_strict
 */
declare class BendPoint {
    static readonly MaxPosition: number;
    static readonly MaxValue: number;
    /**
     * Gets or sets offset of the point relative to the note duration (0-60)
     */
    offset: number;
    /**
     * Gets or sets the 1/4 note value offsets for the bend.
     */
    value: number;
    /**
     * Initializes a new instance of the {@link BendPoint} class.
     * @param offset The offset.
     * @param value The value.
     */
    constructor(offset?: number, value?: number);
}

/**
 * Lists the different bend styles
 */
declare enum BendStyle {
    /**
     * The bends are as described by the bend points
     */
    Default = 0,
    /**
     * The bends are gradual over the beat duration.
     */
    Gradual = 1,
    /**
     * The bends are done fast before the next note.
     */
    Fast = 2
}

/**
 * Lists all types of how to brush multiple notes on a beat.
 */
declare enum BrushType {
    /**
     * No brush.
     */
    None = 0,
    /**
     * Normal brush up.
     */
    BrushUp = 1,
    /**
     * Normal brush down.
     */
    BrushDown = 2,
    /**
     * Arpeggio up.
     */
    ArpeggioUp = 3,
    /**
     * Arpeggio down.
     */
    ArpeggioDown = 4
}

/**
 * This public enumeration lists all supported Clefs.
 */
declare enum Clef {
    /**
     * Neutral clef.
     */
    Neutral = 0,
    /**
     * C3 clef
     */
    C3 = 1,
    /**
     * C4 clef
     */
    C4 = 2,
    /**
     * F4 clef
     */
    F4 = 3,
    /**
     * G2 clef
     */
    G2 = 4
}

/**
 * Lists all ottavia.
 */
declare enum Ottavia {
    /**
     * 2 octaves higher
     */
    _15ma = 0,
    /**
     * 1 octave higher
     */
    _8va = 1,
    /**
     * Normal
     */
    Regular = 2,
    /**
     * 1 octave lower
     */
    _8vb = 3,
    /**
     * 2 octaves lower.
     */
    _15mb = 4
}

/**
 * Lists all simile mark types as they are assigned to bars.
 */
declare enum SimileMark {
    /**
     * No simile mark is applied
     */
    None = 0,
    /**
     * A simple simile mark. The previous bar is repeated.
     */
    Simple = 1,
    /**
     * A double simile mark. This value is assigned to the first
     * bar of the 2 repeat bars.
     */
    FirstOfDouble = 2,
    /**
     * A double simile mark. This value is assigned to the second
     * bar of the 2 repeat bars.
     */
    SecondOfDouble = 3
}

/**
 * A voice represents a group of beats
 * that can be played during a bar.
 * @json
 * @json_strict
 */
declare class Voice {
    private _beatLookup;
    private static _globalBarId;
    /**
     * Gets or sets the unique id of this bar.
     */
    id: number;
    /**
     * Gets or sets the zero-based index of this voice within the bar.
     * @json_ignore
     */
    index: number;
    /**
     * Gets or sets the reference to the bar this voice belongs to.
     * @json_ignore
     */
    bar: Bar;
    /**
     * Gets or sets the list of beats contained in this voice.
     * @json_add addBeat
     */
    beats: Beat[];
    /**
     * Gets or sets a value indicating whether this voice is empty.
     */
    isEmpty: boolean;
    insertBeat(after: Beat, newBeat: Beat): void;
    addBeat(beat: Beat): void;
    private chain;
    addGraceBeat(beat: Beat): void;
    getBeatAtPlaybackStart(playbackStart: number): Beat | null;
    finish(settings: Settings, sharedDataBag?: Map<string, unknown> | null): void;
    calculateDuration(): number;
}

/**
 * A bar is a single block within a track, also known as Measure.
 * @json
 * @json_strict
 */
declare class Bar {
    private static _globalBarId;
    /**
     * Gets or sets the unique id of this bar.
     */
    id: number;
    /**
     * Gets or sets the zero-based index of this bar within the staff.
     * @json_ignore
     */
    index: number;
    /**
     * Gets or sets the next bar that comes after this bar.
     * @json_ignore
     */
    nextBar: Bar | null;
    /**
     * Gets or sets the previous bar that comes before this bar.
     * @json_ignore
     */
    previousBar: Bar | null;
    /**
     * Gets or sets the clef on this bar.
     */
    clef: Clef;
    /**
     * Gets or sets the ottava applied to the clef.
     */
    clefOttava: Ottavia;
    /**
     * Gets or sets the reference to the parent staff.
     * @json_ignore
     */
    staff: Staff;
    /**
     * Gets or sets the list of voices contained in this bar.
     * @json_add addVoice
     */
    voices: Voice[];
    /**
     * Gets or sets the simile mark on this bar.
     */
    simileMark: SimileMark;
    /**
     * Gets a value indicating whether this bar contains multiple voices with notes.
     * @json_ignore
     */
    isMultiVoice: boolean;
    /**
     * A relative scale for the size of the bar when displayed. The scale is relative
     * within a single line (system/stave group). The sum of all scales in one line make the total width,
     * and then this individual scale gives the relative size.
     */
    displayScale: number;
    /**
     * An absolute width of the bar to use when displaying in single track display scenarios.
     */
    displayWidth: number;
    get masterBar(): MasterBar;
    get isEmpty(): boolean;
    addVoice(voice: Voice): void;
    finish(settings: Settings, sharedDataBag?: Map<string, unknown> | null): void;
    calculateDuration(): number;
}

/**
 * Represents the lyrics of a song.
 */
declare class Lyrics {
    private static readonly CharCodeLF;
    private static readonly CharCodeTab;
    private static readonly CharCodeCR;
    private static readonly CharCodeSpace;
    private static readonly CharCodeBrackedClose;
    private static readonly CharCodeBrackedOpen;
    private static readonly CharCodeDash;
    /**
     * Gets or sets he start bar on which the lyrics should begin.
     */
    startBar: number;
    /**
     * Gets or sets the raw lyrics text in Guitar Pro format.
     * (spaces split word syllables, plus merge syllables, [..] are comments)
     */
    text: string;
    /**
     * Gets or sets the prepared chunks of the lyrics to apply to beats.
     */
    chunks: string[];
    finish(skipEmptyEntries?: boolean): void;
    private parse;
    private addChunk;
    private prepareChunk;
}

/**
 * This public class stores the midi specific information of a track needed
 * for playback.
 * @json
 * @json_strict
 */
declare class PlaybackInformation {
    /**
     * Gets or sets the volume (0-16)
     */
    volume: number;
    /**
     * Gets or sets the balance (0-16; 8=center)
     */
    balance: number;
    /**
     * Gets or sets the midi port to use.
     */
    port: number;
    /**
     * Gets or sets the midi program to use.
     */
    program: number;
    /**
     * Gets or sets the primary channel for all normal midi events.
     */
    primaryChannel: number;
    /**
     * Gets or sets the secondary channel for special midi events.
     */
    secondaryChannel: number;
    /**
     * Gets or sets whether the track is muted.
     */
    isMute: boolean;
    /**
     * Gets or sets whether the track is playing alone.
     */
    isSolo: boolean;
}

/**
 * Lists all music font symbols used within alphaTab. The names
 * and values are aligned with the SMuFL standard.
 */
declare enum MusicFontSymbol {
    None = -1,
    GClef = 57424,
    CClef = 57436,
    FClef = 57442,
    UnpitchedPercussionClef1 = 57449,
    SixStringTabClef = 57453,
    FourStringTabClef = 57454,
    TimeSig0 = 57472,
    TimeSig1 = 57473,
    TimeSig2 = 57474,
    TimeSig3 = 57475,
    TimeSig4 = 57476,
    TimeSig5 = 57477,
    TimeSig6 = 57478,
    TimeSig7 = 57479,
    TimeSig8 = 57480,
    TimeSig9 = 57481,
    TimeSigCommon = 57482,
    TimeSigCutCommon = 57483,
    NoteheadDoubleWholeSquare = 57505,
    NoteheadDoubleWhole = 57504,
    NoteheadWhole = 57506,
    NoteheadHalf = 57507,
    NoteheadBlack = 57508,
    NoteheadNull = 57509,
    NoteheadXOrnate = 57514,
    NoteheadTriangleUpWhole = 57531,
    NoteheadTriangleUpHalf = 57532,
    NoteheadTriangleUpBlack = 57534,
    NoteheadDiamondBlackWide = 57564,
    NoteheadDiamondWhite = 57565,
    NoteheadDiamondWhiteWide = 57566,
    NoteheadCircleX = 57523,
    NoteheadXWhole = 57511,
    NoteheadXHalf = 57512,
    NoteheadXBlack = 57513,
    NoteheadParenthesis = 57550,
    NoteheadSlashedBlack2 = 57552,
    NoteheadCircleSlash = 57591,
    NoteheadHeavyX = 57592,
    NoteheadHeavyXHat = 57593,
    NoteQuarterUp = 57813,
    NoteEighthUp = 57815,
    Tremolo3 = 57890,
    Tremolo2 = 57889,
    Tremolo1 = 57888,
    FlagEighthUp = 57920,
    FlagEighthDown = 57921,
    FlagSixteenthUp = 57922,
    FlagSixteenthDown = 57923,
    FlagThirtySecondUp = 57924,
    FlagThirtySecondDown = 57925,
    FlagSixtyFourthUp = 57926,
    FlagSixtyFourthDown = 57927,
    FlagOneHundredTwentyEighthUp = 57928,
    FlagOneHundredTwentyEighthDown = 57929,
    FlagTwoHundredFiftySixthUp = 57930,
    FlagTwoHundredFiftySixthDown = 57931,
    AccidentalFlat = 57952,
    AccidentalNatural = 57953,
    AccidentalSharp = 57954,
    AccidentalDoubleSharp = 57955,
    AccidentalDoubleFlat = 57956,
    AccidentalQuarterToneFlatArrowUp = 57968,
    AccidentalQuarterToneSharpArrowUp = 57972,
    AccidentalQuarterToneNaturalArrowUp = 57970,
    ArticAccentAbove = 58528,
    ArticStaccatoAbove = 58530,
    ArticMarcatoAbove = 58540,
    FermataAbove = 58560,
    FermataShortAbove = 58564,
    FermataLongAbove = 58566,
    RestLonga = 58593,
    RestDoubleWhole = 58594,
    RestWhole = 58595,
    RestHalf = 58596,
    RestQuarter = 58597,
    RestEighth = 58598,
    RestSixteenth = 58599,
    RestThirtySecond = 58600,
    RestSixtyFourth = 58601,
    RestOneHundredTwentyEighth = 58602,
    RestTwoHundredFiftySixth = 58603,
    Repeat1Bar = 58624,
    Repeat2Bars = 58625,
    Ottava = 58640,
    OttavaAlta = 58641,
    OttavaBassaVb = 58652,
    Quindicesima = 58644,
    QuindicesimaAlta = 58645,
    DynamicPPP = 58666,
    DynamicPP = 58667,
    DynamicPiano = 58656,
    DynamicMP = 58668,
    DynamicMF = 58669,
    DynamicForte = 58658,
    DynamicFF = 58671,
    DynamicFFF = 58672,
    OrnamentTrill = 58726,
    StringsDownBow = 58896,
    StringsUpBow = 58898,
    PictEdgeOfCymbal = 59177,
    GuitarString0 = 59443,
    GuitarString1 = 59444,
    GuitarString2 = 59445,
    GuitarString3 = 59446,
    GuitarString4 = 59447,
    GuitarString5 = 59448,
    GuitarString6 = 59449,
    GuitarString7 = 59450,
    GuitarString8 = 59451,
    GuitarString9 = 59452,
    GuitarGolpe = 59458,
    FretboardX = 59481,
    FretboardO = 59482,
    WiggleTrill = 60068,
    WiggleVibratoMediumFast = 60126,
    OctaveBaselineM = 60565,
    OctaveBaselineB = 60563
}

/**
 * This public enum lists all different text alignments
 */
declare enum TextAlign {
    /**
     * Text is left aligned.
     */
    Left = 0,
    /**
     * Text is centered.
     */ Center = 1,
    /**
     * Text is right aligned.
     */ Right = 2
}
/**
 * This public enum lists all base line modes
 */
declare enum TextBaseline {
    /**
     * Text is aligned on top.
     */
    Top = 0,
    /**
     * Text is aligned middle
     */
    Middle = 1,
    /**
     * Text is aligend on the bottom.
     */
    Bottom = 2
}
/**
 * This is the base public interface for canvas implementations on different plattforms.
 */
interface ICanvas {
    settings: Settings;
    color: Color;
    lineWidth: number;
    fillRect(x: number, y: number, w: number, h: number): void;
    strokeRect(x: number, y: number, w: number, h: number): void;
    fillCircle(x: number, y: number, radius: number): void;
    strokeCircle(x: number, y: number, radius: number): void;
    font: Font;
    textAlign: TextAlign;
    textBaseline: TextBaseline;
    beginGroup(identifier: string): void;
    endGroup(): void;
    fillText(text: string, x: number, y: number): void;
    measureText(text: string): number;
    fillMusicFontSymbol(x: number, y: number, scale: number, symbol: MusicFontSymbol, centerAtPosition?: boolean): void;
    fillMusicFontSymbols(x: number, y: number, scale: number, symbols: MusicFontSymbol[], centerAtPosition?: boolean): void;
    beginRender(width: number, height: number): void;
    endRender(): unknown;
    onRenderFinished(): unknown;
    beginRotate(centerX: number, centerY: number, angle: number): void;
    endRotate(): void;
    beginPath(): void;
    closePath(): void;
    fill(): void;
    stroke(): void;
    moveTo(x: number, y: number): void;
    lineTo(x: number, y: number): void;
    bezierCurveTo(cp1X: number, cp1Y: number, cp2X: number, cp2Y: number, x: number, y: number): void;
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
    destroy(): void;
}

/**
 * Lists all durations of a beat.
 */
declare enum Duration {
    /**
     * A quadruple whole note duration
     */
    QuadrupleWhole = -4,
    /**
     * A double whole note duration
     */
    DoubleWhole = -2,
    /**
     * A whole note duration
     */
    Whole = 1,
    /**
     * A 1/2 note duration
     */
    Half = 2,
    /**
     * A 1/4 note duration
     */
    Quarter = 4,
    /**
     * A 1/8 note duration
     */
    Eighth = 8,
    /**
     * A 1/16 note duration
     */
    Sixteenth = 16,
    /**
     * A 1/32 note duration
     */
    ThirtySecond = 32,
    /**
     * A 1/64 note duration
     */
    SixtyFourth = 64,
    /**
     * A 1/128 note duration
     */
    OneHundredTwentyEighth = 128,
    /**
     * A 1/256 note duration
     */
    TwoHundredFiftySixth = 256
}

/**
 * Describes an instrument articulation which is used for percussions.
 * @json
 * @json_strict
 */
declare class InstrumentArticulation {
    /**
     * Gets or sets the type of the element for which this articulation is for.
     */
    elementType: string;
    /**
     * Gets or sets the line the note head should be shown for standard notation
     */
    staffLine: number;
    /**
     * Gets or sets the note head to display by default.
     */
    noteHeadDefault: MusicFontSymbol;
    /**
     * Gets or sets the note head to display for half duration notes.
     */
    noteHeadHalf: MusicFontSymbol;
    /**
     * Gets or sets the note head to display for whole duration notes.
     */
    noteHeadWhole: MusicFontSymbol;
    /**
     * Gets or sets which additional technique symbol should be placed for the note head.
     */
    techniqueSymbol: MusicFontSymbol;
    /**
     * Gets or sets where the technique symbol should be placed.
     */
    techniqueSymbolPlacement: TextBaseline;
    /**
     * Gets or sets which midi number to use when playing the note.
     */
    outputMidiNumber: number;
    constructor(elementType?: string, staffLine?: number, outputMidiNumber?: number, noteHeadDefault?: MusicFontSymbol, noteHeadHalf?: MusicFontSymbol, noteHeadWhole?: MusicFontSymbol, techniqueSymbol?: MusicFontSymbol, techniqueSymbolPlacement?: TextBaseline);
    getSymbol(duration: Duration): MusicFontSymbol;
}

/**
 * This public class describes a single track or instrument of score.
 * It is bascially a list of staffs containing individual music notation kinds.
 * @json
 * @json_strict
 */
declare class Track {
    private static readonly ShortNameMaxLength;
    /**
     * Gets or sets the zero-based index of this track.
     * @json_ignore
     */
    index: number;
    /**
     * Gets or sets the reference this track belongs to.
     * @json_ignore
     */
    score: Score;
    /**
     * Gets or sets the list of staffs that are defined for this track.
     * @json_add addStaff
     */
    staves: Staff[];
    /**
     * Gets or sets the playback information for this track.
     */
    playbackInfo: PlaybackInformation;
    /**
     * Gets or sets the display color defined for this track.
     */
    color: Color;
    /**
     * Gets or sets the long name of this track.
     */
    name: string;
    /**
     * Gets or sets the short name of this track.
     */
    shortName: string;
    /**
     * Defines how many bars are placed into the systems (rows) when displaying
     * the track unless a value is set in the systemsLayout.
     */
    defaultSystemsLayout: number;
    /**
     * Defines how many bars are placed into the systems (rows) when displaying
     * the track.
     */
    systemsLayout: number[];
    /**
     * Gets or sets a mapping on which staff liens particular percussion instruments
     * should be shown.
     */
    percussionArticulations: InstrumentArticulation[];
    ensureStaveCount(staveCount: number): void;
    addStaff(staff: Staff): void;
    finish(settings: Settings, sharedDataBag?: Map<string, unknown> | null): void;
    applyLyrics(lyrics: Lyrics[]): void;
}

/**
 * This public class represents a predefined string tuning.
 * @json
 * @json_strict
 */
declare class Tuning {
    private static _sevenStrings;
    private static _sixStrings;
    private static _fiveStrings;
    private static _fourStrings;
    private static _defaultTunings;
    static readonly defaultAccidentals: string[];
    static readonly defaultSteps: string[];
    static getTextForTuning(tuning: number, includeOctave: boolean): string;
    static getTextPartsForTuning(tuning: number, octaveShift?: number): string[];
    /**
     * Gets the default tuning for the given string count.
     * @param stringCount The string count.
     * @returns The tuning for the given string count or null if the string count is not defined.
     */
    static getDefaultTuningFor(stringCount: number): Tuning | null;
    /**
     * Gets a list of all tuning presets for a given stirng count.
     * @param stringCount The string count.
     * @returns The list of known tunings for the given string count or an empty list if the string count is not defined.
     */
    static getPresetsFor(stringCount: number): Tuning[];
    static initialize(): void;
    /**
     * Tries to find a known tuning by a given list of tuning values.
     * @param strings The values defining the tuning.
     * @returns The known tuning.
     */
    static findTuning(strings: number[]): Tuning | null;
    /**
     * Gets or sets whether this is the standard tuning for this number of strings.
     */
    isStandard: boolean;
    /**
     * Gets or sets the name of the tuning.
     */
    name: string;
    /**
     * Gets or sets the values for each string of the instrument.
     */
    tunings: number[];
    /**
     * Initializes a new instance of the {@link Tuning} class.
     * @param name The name.
     * @param tuning The tuning.
     * @param isStandard if set to`true`[is standard].
     */
    constructor(name?: string, tuning?: number[] | null, isStandard?: boolean);
    /**
     * Tries to detect the name and standard flag of the tuning from a known tuning list based
     * on the string values.
     */
    finish(): void;
}

/**
 * This class describes a single staff within a track. There are instruments like pianos
 * where a single track can contain multiple staffs.
 * @json
 * @json_strict
 */
declare class Staff {
    /**
     * Gets or sets the zero-based index of this staff within the track.
     * @json_ignore
     */
    index: number;
    /**
     * Gets or sets the reference to the track this staff belongs to.
     * @json_ignore
     */
    track: Track;
    /**
     * Gets or sets a list of all bars contained in this staff.
     * @json_add addBar
     */
    bars: Bar[];
    /**
     * Gets or sets a list of all chords defined for this staff. {@link Beat.chordId} refers to entries in this lookup.
     * @json_add addChord
     */
    chords: Map<string, Chord> | null;
    /**
     * Gets or sets the fret on which a capo is set.
     */
    capo: number;
    /**
     * Gets or sets the number of semitones this track should be
     * transposed. This applies to rendering and playback.
     */
    transpositionPitch: number;
    /**
     * Gets or sets the number of semitones this track should be
     * transposed. This applies only to rendering.
     */
    displayTranspositionPitch: number;
    /**
     * Get or set the guitar tuning of the guitar. This tuning also indicates the number of strings shown in the
     * guitar tablature. Unlike the {@link Note.string} property this array directly represents
     * the order of the tracks shown in the tablature. The first item is the most top tablature line.
     */
    stringTuning: Tuning;
    /**
     * Get or set the values of the related guitar tuning.
     */
    get tuning(): number[];
    /**
     * Gets or sets the name of the tuning.
     */
    get tuningName(): string;
    get isStringed(): boolean;
    /**
     * Gets or sets whether the tabs are shown.
     */
    showTablature: boolean;
    /**
     * Gets or sets whether the standard notation is shown.
     */
    showStandardNotation: boolean;
    /**
     * Gets or sets whether the staff contains percussion notation
     */
    isPercussion: boolean;
    /**
     * The number of lines shown for the standard notation.
     * For some percussion instruments this number might vary.
     */
    standardNotationLineCount: number;
    finish(settings: Settings, sharedDataBag?: Map<string, unknown> | null): void;
    addChord(chordId: string, chord: Chord): void;
    hasChord(chordId: string): boolean;
    getChord(chordId: string): Chord | null;
    addBar(bar: Bar): void;
}

/**
 * A chord definition.
 * @json
 * @json_strict
 */
declare class Chord {
    /**
     * Gets or sets the name of the chord
     */
    name: string;
    /**
     * Indicates the first fret of the chord diagram.
     */
    firstFret: number;
    /**
     * Gets or sets the frets played on the individual strings for this chord.
     * - The order in this list goes from the highest string to the lowest string.
     * - -1 indicates that the string is not played.
     */
    strings: number[];
    /**
     * Gets or sets a list of frets where the finger should hold a barre
     */
    barreFrets: number[];
    /**
     * Gets or sets the staff the chord belongs to.
     * @json_ignore
     */
    staff: Staff;
    /**
     * Gets or sets whether the chord name is shown above the chord diagram.
     */
    showName: boolean;
    /**
     * Gets or sets whether the chord diagram is shown.
     */
    showDiagram: boolean;
    /**
     * Gets or sets whether the fingering is shown below the chord diagram.
     */
    showFingering: boolean;
    /**
     * Gets a unique id for this chord based on its properties.
     */
    get uniqueId(): string;
}

/**
 * Lists all Crescendo and Decrescendo types.
 */
declare enum CrescendoType {
    /**
     * No crescendo applied.
     */
    None = 0,
    /**
     * Normal crescendo applied.
     */
    Crescendo = 1,
    /**
     * Normal decrescendo applied.
     */
    Decrescendo = 2
}

/**
 * Lists all dynamics.
 */
declare enum DynamicValue {
    /**
     * pianississimo (very very soft)
     */
    PPP = 0,
    /**
     * pianissimo (very soft)
     */
    PP = 1,
    /**
     * piano (soft)
     */
    P = 2,
    /**
     * mezzo-piano (half soft)
     */
    MP = 3,
    /**
     * mezzo-forte (half loud)
     */
    MF = 4,
    /**
     * forte (loud)
     */
    F = 5,
    /**
     * fortissimo (very loud)
     */
    FF = 6,
    /**
     * fortississimo (very very loud)
     */
    FFF = 7
}

/**
 * Lists all types of fermatas
 */
declare enum FermataType {
    /**
     * A short fermata (triangle symbol)
     */
    Short = 0,
    /**
     * A medium fermata (round symbol)
     */
    Medium = 1,
    /**
     * A long fermata (rectangular symbol)
     */
    Long = 2
}
/**
 * Represents a fermata.
 * @json
 * @json_strict
 */
declare class Fermata {
    /**
     * Gets or sets the type of fermata.
     */
    type: FermataType;
    /**
     * Gets or sets the actual lenght of the fermata.
     */
    length: number;
}

/**
 * Lists all types of grace notes
 */
declare enum GraceType {
    /**
     * No grace, normal beat.
     */
    None = 0,
    /**
     * The beat contains on-beat grace notes.
     */
    OnBeat = 1,
    /**
     * The beat contains before-beat grace notes.
     */
    BeforeBeat = 2,
    /**
     * The beat contains very special bend-grace notes used in SongBook style displays.
     */
    BendGrace = 3
}

/**
 * Lists all types of note acceuntations
 */
declare enum AccentuationType {
    /**
     * No accentuation
     */
    None = 0,
    /**
     * Normal accentuation
     */
    Normal = 1,
    /**
     * Heavy accentuation
     */
    Heavy = 2
}

/**
 * Lists all types of bends
 */
declare enum BendType {
    /**
     * No bend at all
     */
    None = 0,
    /**
     * Individual points define the bends in a flexible manner.
     * This system was mainly used in Guitar Pro 3-5
     */
    Custom = 1,
    /**
     * Simple Bend from an unbended string to a higher note.
     */
    Bend = 2,
    /**
     * Release of a bend that was started on an earlier note.
     */
    Release = 3,
    /**
     * A bend that starts from an unbended string,
     * and also releases the bend after some time.
     */
    BendRelease = 4,
    /**
     * Holds a bend that was started on an earlier note
     */
    Hold = 5,
    /**
     * A bend that is already started before the note is played then it is held until the end.
     */
    Prebend = 6,
    /**
     * A bend that is already started before the note is played and
     * bends even further, then it is held until the end.
     */
    PrebendBend = 7,
    /**
     * A bend that is already started before the note is played and
     * then releases the bend to a lower note where it is held until the end.
     */
    PrebendRelease = 8
}

/**
 * Lists all fingers.
 */
declare enum Fingers {
    /**
     * Unknown type (not documented)
     */
    Unknown = -2,
    /**
     * No finger, dead note
     */
    NoOrDead = -1,
    /**
     * The thumb
     */
    Thumb = 0,
    /**
     * The index finger
     */
    IndexFinger = 1,
    /**
     * The middle finger
     */
    MiddleFinger = 2,
    /**
     * The annular finger
     */
    AnnularFinger = 3,
    /**
     * The little finger
     */
    LittleFinger = 4
}

/**
 * Lists all harmonic types.
 */
declare enum HarmonicType {
    /**
     * No harmonics.
     */
    None = 0,
    /**
     * Natural harmonic
     */
    Natural = 1,
    /**
     * Artificial harmonic
     */
    Artificial = 2,
    /**
     * Pinch harmonics
     */
    Pinch = 3,
    /**
     * Tap harmonics
     */
    Tap = 4,
    /**
     * Semi harmonics
     */
    Semi = 5,
    /**
     * Feedback harmonics
     */
    Feedback = 6
}

/**
 * Lists the modes how accidentals are handled for notes
 */
declare enum NoteAccidentalMode {
    /**
     * Accidentals are calculated automatically.
     */
    Default = 0,
    /**
     * This will try to ensure that no accidental is shown.
     */
    ForceNone = 1,
    /**
     * This will move the note one line down and applies a Naturalize.
     */
    ForceNatural = 2,
    /**
     * This will move the note one line down and applies a Sharp.
     */
    ForceSharp = 3,
    /**
     * This will move the note to be shown 2 half-notes deeper with a double sharp symbol
     */
    ForceDoubleSharp = 4,
    /**
     * This will move the note one line up and applies a Flat.
     */
    ForceFlat = 5,
    /**
     * This will move the note two half notes up with a double flag symbol.
     */
    ForceDoubleFlat = 6
}

/**
 * This public enum lists all different types of finger slide-ins on a string.
 */
declare enum SlideInType {
    /**
     * No slide.
     */
    None = 0,
    /**
     * Slide into the note from below on the same string.
     */
    IntoFromBelow = 1,
    /**
     * Slide into the note from above on the same string.
     */
    IntoFromAbove = 2
}

/**
 * This public enum lists all different types of finger slide-outs on a string.
 */
declare enum SlideOutType {
    /**
     * No slide.
     */
    None = 0,
    /**
     * Shift slide to next note on same string
     */
    Shift = 1,
    /**
     * Legato slide to next note on same string.
     */
    Legato = 2,
    /**
     * Slide out from the note from upwards on the same string.
     */
    OutUp = 3,
    /**
     * Slide out from the note from downwards on the same string.
     */
    OutDown = 4,
    /**
     * Pickslide down on this note
     */
    PickSlideDown = 5,
    /**
     * Pickslide up on this note
     */
    PickSlideUp = 6
}

/**
 * This public enum lists all vibrato types that can be performed.
 */
declare enum VibratoType {
    /**
     * No vibrato.
     */
    None = 0,
    /**
     * A slight vibrato.
     */
    Slight = 1,
    /**
     * A wide vibrato.
     */
    Wide = 2
}

/**
 * A note is a single played sound on a fretted instrument.
 * It consists of a fret offset and a string on which the note is played on.
 * It also can be modified by a lot of different effects.
 * @cloneable
 * @json
 * @json_strict
 */
declare class Note {
    static GlobalNoteId: number;
    /**
     * Gets or sets the unique id of this note.
     * @clone_ignore
     */
    id: number;
    /**
     * Gets or sets the zero-based index of this note within the beat.
     * @json_ignore
     */
    index: number;
    /**
     * Gets or sets the accentuation of this note.
     */
    accentuated: AccentuationType;
    /**
     * Gets or sets the bend type for this note.
     */
    bendType: BendType;
    /**
     * Gets or sets the bend style for this note.
     */
    bendStyle: BendStyle;
    /**
     * Gets or sets the note from which this note continues the bend.
     * @clone_ignore
     * @json_ignore
     */
    bendOrigin: Note | null;
    /**
     * Gets or sets whether this note continues a bend from a previous note.
     */
    isContinuedBend: boolean;
    /**
     * Gets or sets a list of the points defining the bend behavior.
     * @clone_add addBendPoint
     * @json_add addBendPoint
     */
    bendPoints: BendPoint[] | null;
    /**
     * Gets or sets the bend point with the highest bend value.
     * @clone_ignore
     * @json_ignore
     */
    maxBendPoint: BendPoint | null;
    get hasBend(): boolean;
    get isStringed(): boolean;
    /**
     * Gets or sets the fret on which this note is played on the instrument.
     * 0 is the nut.
     */
    fret: number;
    /**
     * Gets or sets the string number where the note is placed.
     * 1 is the lowest string on the guitar and the bottom line on the tablature.
     * It then increases the the number of strings on available on the track.
     */
    string: number;
    get isPiano(): boolean;
    /**
     * Gets or sets the octave on which this note is played.
     */
    octave: number;
    /**
     * Gets or sets the tone of this note within the octave.
     */
    tone: number;
    get isPercussion(): boolean;
    /**
     * Gets or sets the percusson element.
     * @deprecated
     */
    get element(): number;
    /**
     * Gets or sets the variation of this note.
     * @deprecated
     */
    get variation(): number;
    /**
     * Gets or sets the index of percussion articulation in the related `track.percussionArticulations`.
     * If the articulation is not listed in `track.percussionArticulations` the following list based on GP7 applies:
     * - 029 Ride (choke)
     * - 030 Cymbal (hit)
     * - 031 Snare (side stick)
     * - 033 Snare (side stick)
     * - 034 Snare (hit)
     * - 035 Kick (hit)
     * - 036 Kick (hit)
     * - 037 Snare (side stick)
     * - 038 Snare (hit)
     * - 039 Hand Clap (hit)
     * - 040 Snare (hit)
     * - 041 Low Floor Tom (hit)
     * - 042 Hi-Hat (closed)
     * - 043 Very Low Tom (hit)
     * - 044 Pedal Hi-Hat (hit)
     * - 045 Low Tom (hit)
     * - 046 Hi-Hat (open)
     * - 047 Mid Tom (hit)
     * - 048 High Tom (hit)
     * - 049 Crash high (hit)
     * - 050 High Floor Tom (hit)
     * - 051 Ride (middle)
     * - 052 China (hit)
     * - 053 Ride (bell)
     * - 054 Tambourine (hit)
     * - 055 Splash (hit)
     * - 056 Cowbell medium (hit)
     * - 057 Crash medium (hit)
     * - 058 Vibraslap (hit)
     * - 059 Ride (edge)
     * - 060 Hand (hit)
     * - 061 Hand (hit)
     * - 062 Conga high (mute)
     * - 063 Conga high (hit)
     * - 064 Conga low (hit)
     * - 065 Timbale high (hit)
     * - 066 Timbale low (hit)
     * - 067 Agogo high (hit)
     * - 068 Agogo tow (hit)
     * - 069 Cabasa (hit)
     * - 070 Left Maraca (hit)
     * - 071 Whistle high (hit)
     * - 072 Whistle low (hit)
     * - 073 Guiro (hit)
     * - 074 Guiro (scrap-return)
     * - 075 Claves (hit)
     * - 076 Woodblock high (hit)
     * - 077 Woodblock low (hit)
     * - 078 Cuica (mute)
     * - 079 Cuica (open)
     * - 080 Triangle (rnute)
     * - 081 Triangle (hit)
     * - 082 Shaker (hit)
     * - 083 Tinkle Bell (hat)
     * - 083 Jingle Bell (hit)
     * - 084 Bell Tree (hit)
     * - 085 Castanets (hit)
     * - 086 Surdo (hit)
     * - 087 Surdo (mute)
     * - 091 Snare (rim shot)
     * - 092 Hi-Hat (half)
     * - 093 Ride (edge)
     * - 094 Ride (choke)
     * - 095 Splash (choke)
     * - 096 China (choke)
     * - 097 Crash high (choke)
     * - 098 Crash medium (choke)
     * - 099 Cowbell low (hit)
     * - 100 Cowbell low (tip)
     * - 101 Cowbell medium (tip)
     * - 102 Cowbell high (hit)
     * - 103 Cowbell high (tip)
     * - 104 Hand (mute)
     * - 105 Hand (slap)
     * - 106 Hand (mute)
     * - 107 Hand (slap)
     * - 108 Conga low (slap)
     * - 109 Conga low (mute)
     * - 110 Conga high (slap)
     * - 111 Tambourine (return)
     * - 112 Tambourine (roll)
     * - 113 Tambourine (hand)
     * - 114 Grancassa (hit)
     * - 115 Piatti (hat)
     * - 116 Piatti (hand)
     * - 117 Cabasa (return)
     * - 118 Left Maraca (return)
     * - 119 Right Maraca (hit)
     * - 120 Right Maraca (return)
     * - 122 Shaker (return)
     * - 123 Bell Tee (return)
     * - 124 Golpe (thumb)
     * - 125 Golpe (finger)
     * - 126 Ride (middle)
     * - 127 Ride (bell)
     */
    percussionArticulation: number;
    /**
     * Gets or sets whether this note is visible on the music sheet.
     */
    isVisible: boolean;
    /**
     * Gets a value indicating whether the note is left hand tapped.
     */
    isLeftHandTapped: boolean;
    /**
     * Gets or sets whether this note starts a hammeron or pulloff.
     */
    isHammerPullOrigin: boolean;
    get isHammerPullDestination(): boolean;
    /**
     * Gets the origin of the hammeron/pulloff of this note.
     * @clone_ignore
     * @json_ignore
     */
    hammerPullOrigin: Note | null;
    /**
     * Gets the destination for the hammeron/pullof started by this note.
     * @clone_ignore
     * @json_ignore
     */
    hammerPullDestination: Note | null;
    get isSlurOrigin(): boolean;
    /**
     * Gets or sets whether this note finishes a slur.
     */
    isSlurDestination: boolean;
    /**
     * Gets or sets the note where the slur of this note starts.
     * @clone_ignore
     * @json_ignore
     */
    slurOrigin: Note | null;
    /**
     * Gets or sets the note where the slur of this note ends.
     * @clone_ignore
     * @json_ignore
     */
    slurDestination: Note | null;
    get isHarmonic(): boolean;
    /**
     * Gets or sets the harmonic type applied to this note.
     */
    harmonicType: HarmonicType;
    /**
     * Gets or sets the value defining the harmonic pitch.
     */
    harmonicValue: number;
    /**
     * Gets or sets whether the note is a ghost note and shown in parenthesis. Also this will make the note a bit more silent.
     */
    isGhost: boolean;
    /**
     * Gets or sets whether this note has a let-ring effect.
     */
    isLetRing: boolean;
    /**
     * Gets or sets the destination note for the let-ring effect.
     * @clone_ignore
     * @json_ignore
     */
    letRingDestination: Note | null;
    /**
     * Gets or sets whether this note has a palm-mute effect.
     */
    isPalmMute: boolean;
    /**
     * Gets or sets the destination note for the palm-mute effect.
     * @clone_ignore
     * @json_ignore
     */
    palmMuteDestination: Note | null;
    /**
     * Gets or sets whether the note is shown and played as dead note.
     */
    isDead: boolean;
    /**
     * Gets or sets whether the note is played as staccato.
     */
    isStaccato: boolean;
    /**
     * Gets or sets the slide-in type this note is played with.
     */
    slideInType: SlideInType;
    /**
     * Gets or sets the slide-out type this note is played with.
     */
    slideOutType: SlideOutType;
    /**
     * Gets or sets the target note for several slide types.
     * @clone_ignore
     * @json_ignore
     */
    slideTarget: Note | null;
    /**
     * Gets or sets the source note for several slide types.
     * @clone_ignore
     * @json_ignore
     */
    slideOrigin: Note | null;
    /**
     * Gets or sets whether a vibrato is played on the note.
     */
    vibrato: VibratoType;
    /**
     * Gets the origin of the tied if this note is tied.
     * @clone_ignore
     * @json_ignore
     */
    tieOrigin: Note | null;
    /**
     * Gets the desination of the tie.
     * @clone_ignore
     * @json_ignore
     */
    tieDestination: Note | null;
    /**
     * Gets or sets whether this note is ends a tied note.
     */
    isTieDestination: boolean;
    get isTieOrigin(): boolean;
    /**
     * Gets or sets the fingers used for this note on the left hand.
     */
    leftHandFinger: Fingers;
    /**
     * Gets or sets the fingers used for this note on the right hand.
     */
    rightHandFinger: Fingers;
    /**
     * Gets or sets whether this note has fingering defined.
     */
    isFingering: boolean;
    /**
     * Gets or sets the target note value for the trill effect.
     */
    trillValue: number;
    get trillFret(): number;
    get isTrill(): boolean;
    /**
     * Gets or sets the speed of the trill effect.
     */
    trillSpeed: Duration;
    /**
     * Gets or sets the percentual duration of the note relative to the overall beat duration .
     */
    durationPercent: number;
    /**
     * Gets or sets how accidetnals for this note should  be handled.
     */
    accidentalMode: NoteAccidentalMode;
    /**
     * Gets or sets the reference to the parent beat to which this note belongs to.
     * @clone_ignore
     * @json_ignore
     */
    beat: Beat;
    /**
     * Gets or sets the dynamics for this note.
     */
    dynamics: DynamicValue;
    /**
     * @clone_ignore
     * @json_ignore
     */
    isEffectSlurOrigin: boolean;
    /**
     * @clone_ignore
     * @json_ignore
     */
    hasEffectSlur: boolean;
    get isEffectSlurDestination(): boolean;
    /**
     * @clone_ignore
     * @json_ignore
     */
    effectSlurOrigin: Note | null;
    /**
     * @clone_ignore
     * @json_ignore
     */
    effectSlurDestination: Note | null;
    get stringTuning(): number;
    static getStringTuning(staff: Staff, noteString: number): number;
    get realValue(): number;
    get realValueWithoutHarmonic(): number;
    /**
     * Calculates the real note value of this note as midi key respecting the given options.
     * @param applyTranspositionPitch Whether or not to apply the transposition pitch of the current staff.
     * @param applyHarmonic Whether or not to apply harmonic pitches to the note.
     * @returns The calculated note value as midi key.
     */
    calculateRealValue(applyTranspositionPitch: boolean, applyHarmonic: boolean): number;
    get harmonicPitch(): number;
    get initialBendValue(): number;
    get displayValue(): number;
    get displayValueWithoutBend(): number;
    get hasQuarterToneOffset(): boolean;
    addBendPoint(point: BendPoint): void;
    finish(settings: Settings, sharedDataBag?: Map<string, unknown> | null): void;
    private static readonly MaxOffsetForSameLineSearch;
    static nextNoteOnSameLine(note: Note): Note | null;
    static findHammerPullDestination(note: Note): Note | null;
    static findTieOrigin(note: Note): Note | null;
    private static NoteIdLookupKey;
    private _noteIdBag;
    chain(sharedDataBag?: Map<string, unknown> | null): void;
    /**
     * @internal
     */
    toJson(o: Map<string, unknown>): void;
    /**
     * @internal
     */
    setProperty(property: string, v: unknown): boolean;
}

/**
 * Lists all types of pick strokes.
 */
declare enum PickStroke {
    /**
     * No pickstroke used.
     */
    None = 0,
    /**
     * Pickstroke up.
     */
    Up = 1,
    /**
     * Pickstroke down
     */
    Down = 2
}

/**
 * Represents a list of beats that are grouped within the same tuplet.
 */
declare class TupletGroup {
    private static readonly HalfTicks;
    private static readonly QuarterTicks;
    private static readonly EighthTicks;
    private static readonly SixteenthTicks;
    private static readonly ThirtySecondTicks;
    private static readonly SixtyFourthTicks;
    private static readonly OneHundredTwentyEighthTicks;
    private static readonly TwoHundredFiftySixthTicks;
    private static AllTicks;
    private _isEqualLengthTuplet;
    totalDuration: number;
    /**
     * Gets or sets the list of beats contained in this group.
     */
    beats: Beat[];
    /**
     * Gets or sets the voice this group belongs to.
     */
    voice: Voice;
    /**
     * Gets a value indicating whether the tuplet group is fully filled.
     */
    isFull: boolean;
    /**
     * Initializes a new instance of the {@link TupletGroup} class.
     * @param voice The voice this group belongs to.
     */
    constructor(voice: Voice);
    check(beat: Beat): boolean;
}

/**
 * Lists all types of whammy bars
 */
declare enum WhammyType {
    /**
     * No whammy at all
     */
    None = 0,
    /**
     * Individual points define the whammy in a flexible manner.
     * This system was mainly used in Guitar Pro 3-5
     */
    Custom = 1,
    /**
     * Simple dive to a lower or higher note.
     */
    Dive = 2,
    /**
     * A dive to a lower or higher note and releasing it back to normal.
     */
    Dip = 3,
    /**
     * Continue to hold the whammy at the position from a previous whammy.
     */
    Hold = 4,
    /**
     * Dive to a lower or higher note before playing it.
     */
    Predive = 5,
    /**
     * Dive to a lower or higher note before playing it, then change to another
     * note.
     */
    PrediveDive = 6
}

declare enum BeamDirection {
    Up = 0,
    Down = 1
}

/**
 * Represents a group of grace beats that belong together
 */
declare class GraceGroup {
    /**
     * All beats within this group.
     */
    beats: Beat[];
    /**
     * Gets a unique ID for this grace group.
     */
    id: string;
    /**
     * true if the grace beat are followed by a normal beat within the same
     * bar.
     */
    isComplete: boolean;
    /**
     * Adds a new beat to this group
     * @param beat The beat to add
     */
    addBeat(beat: Beat): void;
    finish(): void;
}

/**
 * Lists the different modes on how beaming for a beat should be done.
 */
declare enum BeatBeamingMode {
    /**
     * Automatic beaming based on the timing rules.
     */
    Auto = 0,
    /**
     * Force a split to the next beat.
     */
    ForceSplitToNext = 1,
    /**
     * Force a merge with the next beat.
     */
    ForceMergeWithNext = 2
}
/**
 * A beat is a single block within a bar. A beat is a combination
 * of several notes played at the same time.
 * @json
 * @json_strict
 * @cloneable
 */
declare class Beat {
    private static _globalBeatId;
    /**
     * Gets or sets the unique id of this beat.
     * @clone_ignore
     */
    id: number;
    /**
     * Gets or sets the zero-based index of this beat within the voice.
     * @json_ignore
     */
    index: number;
    /**
     * Gets or sets the previous beat within the whole song.
     * @json_ignore
     * @clone_ignore
     */
    previousBeat: Beat | null;
    /**
     * Gets or sets the next beat within the whole song.
     * @json_ignore
     * @clone_ignore
     */
    nextBeat: Beat | null;
    get isLastOfVoice(): boolean;
    /**
     * Gets or sets the reference to the parent voice this beat belongs to.
     * @json_ignore
     * @clone_ignore
     */
    voice: Voice;
    /**
     * Gets or sets the list of notes contained in this beat.
     * @json_add addNote
     * @clone_add addNote
     */
    notes: Note[];
    /**
     * Gets the lookup where the notes per string are registered.
     * If this staff contains string based notes this lookup allows fast access.
     * @json_ignore
     */
    readonly noteStringLookup: Map<number, Note>;
    /**
     * Gets the lookup where the notes per value are registered.
     * If this staff contains string based notes this lookup allows fast access.
     * @json_ignore
     */
    readonly noteValueLookup: Map<number, Note>;
    /**
     * Gets or sets a value indicating whether this beat is considered empty.
     */
    isEmpty: boolean;
    /**
     * Gets or sets which whammy bar style should be used for this bar.
     */
    whammyStyle: BendStyle;
    /**
     * Gets or sets the ottava applied to this beat.
     */
    ottava: Ottavia;
    /**
     * Gets or sets the fermata applied to this beat.
     * @clone_ignore
     * @json_ignore
     */
    fermata: Fermata | null;
    /**
     * Gets a value indicating whether this beat starts a legato slur.
     */
    isLegatoOrigin: boolean;
    get isLegatoDestination(): boolean;
    /**
     * Gets or sets the note with the lowest pitch in this beat. Only visible notes are considered.
     * @json_ignore
     * @clone_ignore
     */
    minNote: Note | null;
    /**
     * Gets or sets the note with the highest pitch in this beat. Only visible notes are considered.
     * @json_ignore
     * @clone_ignore
     */
    maxNote: Note | null;
    /**
     * Gets or sets the note with the highest string number in this beat. Only visible notes are considered.
     * @json_ignore
     * @clone_ignore
     */
    maxStringNote: Note | null;
    /**
     * Gets or sets the note with the lowest string number in this beat. Only visible notes are considered.
     * @json_ignore
     * @clone_ignore
     */
    minStringNote: Note | null;
    /**
     * Gets or sets the duration of this beat.
     */
    duration: Duration;
    get isRest(): boolean;
    /**
     * Gets a value indicating whether this beat is a full bar rest.
     */
    get isFullBarRest(): boolean;
    /**
     * Gets or sets whether any note in this beat has a let-ring applied.
     * @json_ignore
     */
    isLetRing: boolean;
    /**
     * Gets or sets whether any note in this beat has a palm-mute paplied.
     * @json_ignore
     */
    isPalmMute: boolean;
    /**
     * Gets or sets a list of all automations on this beat.
     */
    automations: Automation[];
    /**
     * Gets or sets the number of dots applied to the duration of this beat.
     */
    dots: number;
    /**
     * Gets or sets a value indicating whether this beat is fade-in.
     */
    fadeIn: boolean;
    /**
     * Gets or sets the lyrics shown on this beat.
     */
    lyrics: string[] | null;
    /**
     * Gets or sets a value indicating whether the beat is played in rasgueado style.
     */
    hasRasgueado: boolean;
    /**
     * Gets or sets a value indicating whether the notes on this beat are played with a pop-style (bass).
     */
    pop: boolean;
    /**
     * Gets or sets a value indicating whether the notes on this beat are played with a slap-style (bass).
     */
    slap: boolean;
    /**
     * Gets or sets a value indicating whether the notes on this beat are played with a tap-style (bass).
     */
    tap: boolean;
    /**
     * Gets or sets the text annotation shown on this beat.
     */
    text: string | null;
    /**
     * Gets or sets the brush type applied to the notes of this beat.
     */
    brushType: BrushType;
    /**
     * Gets or sets the duration of the brush between the notes in midi ticks.
     */
    brushDuration: number;
    /**
     * Gets or sets the tuplet denominator.
     */
    tupletDenominator: number;
    /**
     * Gets or sets the tuplet numerator.
     */
    tupletNumerator: number;
    get hasTuplet(): boolean;
    /**
     * @clone_ignore
     * @json_ignore
     */
    tupletGroup: TupletGroup | null;
    /**
     * Gets or sets whether this beat continues a whammy effect.
     */
    isContinuedWhammy: boolean;
    /**
     * Gets or sets the whammy bar style of this beat.
     */
    whammyBarType: WhammyType;
    /**
     * Gets or sets the points defining the whammy bar usage.
     * @json_add addWhammyBarPoint
     * @clone_add addWhammyBarPoint
     */
    whammyBarPoints: BendPoint[] | null;
    /**
     * Gets or sets the highest point with for the highest whammy bar value.
     * @json_ignore
     * @clone_ignore
     */
    maxWhammyPoint: BendPoint | null;
    /**
     * Gets or sets the highest point with for the lowest whammy bar value.
     * @json_ignore
     * @clone_ignore
     */
    minWhammyPoint: BendPoint | null;
    get hasWhammyBar(): boolean;
    /**
     * Gets or sets the vibrato effect used on this beat.
     */
    vibrato: VibratoType;
    /**
     * Gets or sets the ID of the chord used on this beat.
     */
    chordId: string | null;
    get hasChord(): boolean;
    get chord(): Chord | null;
    /**
     * Gets or sets the grace style of this beat.
     */
    graceType: GraceType;
    /**
     * Gets or sets the grace group this beat belongs to.
     * If this beat is not a grace note, it holds the group which belongs to this beat.
     * @json_ignore
     * @clone_ignore
     */
    graceGroup: GraceGroup | null;
    /**
     * Gets or sets the index of this beat within the grace group if
     * this is a grace beat.
     * @json_ignore
     * @clone_ignore
     */
    graceIndex: number;
    /**
     * Gets or sets the pickstroke applied on this beat.
     */
    pickStroke: PickStroke;
    get isTremolo(): boolean;
    /**
     * Gets or sets the speed of the tremolo effect.
     */
    tremoloSpeed: Duration | null;
    /**
     * Gets or sets whether a crescendo/decrescendo is applied on this beat.
     */
    crescendo: CrescendoType;
    /**
     * The timeline position of the voice within the current bar as it is displayed. (unit: midi ticks)
     * This might differ from the actual playback time due to special grace types.
     */
    displayStart: number;
    /**
     * The timeline position of the voice within the current bar as it is played. (unit: midi ticks)
     * This might differ from the actual playback time due to special grace types.
     */
    playbackStart: number;
    /**
     * Gets or sets the duration that is used for the display of this beat. It defines the size/width of the beat in
     * the music sheet. (unit: midi ticks).
     */
    displayDuration: number;
    /**
     * Gets or sets the duration that the note is played during the audio generation.
     */
    playbackDuration: number;
    get absoluteDisplayStart(): number;
    get absolutePlaybackStart(): number;
    /**
     * Gets or sets the dynamics applied to this beat.
     */
    dynamics: DynamicValue;
    /**
     * Gets or sets a value indicating whether the beam direction should be inverted.
     */
    invertBeamDirection: boolean;
    /**
     * Gets or sets the preferred beam direction as specified in the input source.
     */
    preferredBeamDirection: BeamDirection | null;
    /**
     * @json_ignore
     */
    isEffectSlurOrigin: boolean;
    get isEffectSlurDestination(): boolean;
    /**
     * @clone_ignore
     * @json_ignore
     */
    effectSlurOrigin: Beat | null;
    /**
     * @clone_ignore
     * @json_ignore
     */
    effectSlurDestination: Beat | null;
    /**
     * Gets or sets how the beaming should be done for this beat.
     */
    beamingMode: BeatBeamingMode;
    addWhammyBarPoint(point: BendPoint): void;
    removeWhammyBarPoint(index: number): void;
    addNote(note: Note): void;
    removeNote(note: Note): void;
    getAutomation(type: AutomationType): Automation | null;
    getNoteOnString(noteString: number): Note | null;
    private calculateDuration;
    updateDurations(): void;
    finishTuplet(): void;
    finish(settings: Settings, sharedDataBag?: Map<string, unknown> | null): void;
    /**
     * Checks whether the current beat is timewise before the given beat.
     * @param beat
     * @returns
     */
    isBefore(beat: Beat): boolean;
    /**
     * Checks whether the current beat is timewise after the given beat.
     * @param beat
     * @returns
     */
    isAfter(beat: Beat): boolean;
    hasNoteOnString(noteString: number): boolean;
    getNoteWithRealValue(noteRealValue: number): Note | null;
    chain(sharedDataBag?: Map<string, unknown> | null): void;
}

/**
 * This public enumeration lists all available key signatures
 */
declare enum KeySignature {
    /**
     * Cb (7 flats)
     */
    Cb = -7,
    /**
     * Gb (6 flats)
     */
    Gb = -6,
    /**
     * Db (5 flats)
     */
    Db = -5,
    /**
     * Ab (4 flats)
     */
    Ab = -4,
    /**
     * Eb (3 flats)
     */
    Eb = -3,
    /**
     * Bb (2 flats)
     */
    Bb = -2,
    /**
     * F (1 flat)
     */
    F = -1,
    /**
     * C (no signs)
     */
    C = 0,
    /**
     * G (1 sharp)
     */
    G = 1,
    /**
     * D (2 sharp)
     */
    D = 2,
    /**
     * A (3 sharp)
     */
    A = 3,
    /**
     * E (4 sharp)
     */
    E = 4,
    /**
     * B (5 sharp)
     */
    B = 5,
    /**
     * F# (6 sharp)
     */
    FSharp = 6,
    /**
     * C# (7 sharp)
     */
    CSharp = 7
}

/**
 * This public enumeration lists all available types of KeySignatures
 */
declare enum KeySignatureType {
    /**
     * Major
     */
    Major = 0,
    /**
     * Minor
     */
    Minor = 1
}

/**
 * This public class can store the information about a group of measures which are repeated
 */
declare class RepeatGroup {
    /**
     * All masterbars repeated within this group
     */
    masterBars: MasterBar[];
    /**
     * the masterbars which opens the group.
     */
    opening: MasterBar | null;
    /**
     * a list of masterbars which open the group.
     * @deprecated There can only be one opening, use the opening property instead
     */
    get openings(): MasterBar[];
    /**
     * a list of masterbars which close the group.
     */
    closings: MasterBar[];
    /**
     * Gets whether this repeat group is really opened as a repeat.
     */
    get isOpened(): boolean;
    /**
     * true if the repeat group was closed well
     */
    isClosed: boolean;
    addMasterBar(masterBar: MasterBar): void;
}

/**
 * This public class is used to describe the beginning of a
 * section within a song. It acts like a marker.
 * @json
 * @json_strict
 */
declare class Section {
    /**
     * Gets or sets the marker ID for this section.
     */
    marker: string;
    /**
     * Gets or sets the descriptional text of this section.
     */
    text: string;
}

/**
 * This public enumeration lists all feels of triplets.
 */
declare enum TripletFeel {
    /**
     * No triplet feel
     */
    NoTripletFeel = 0,
    /**
     * Triplet 16th
     */
    Triplet16th = 1,
    /**
     * Triplet 8th
     */
    Triplet8th = 2,
    /**
     * Dotted 16th
     */
    Dotted16th = 3,
    /**
     * Dotted 8th
     */
    Dotted8th = 4,
    /**
     * Scottish 16th
     */
    Scottish16th = 5,
    /**
     * Scottish 8th
     */
    Scottish8th = 6
}

/**
 * The MasterBar stores information about a bar which affects
 * all tracks.
 * @json
 * @json_strict
 */
declare class MasterBar {
    static readonly MaxAlternateEndings: number;
    /**
     * Gets or sets the bitflag for the alternate endings. Each bit defines for which repeat counts
     * the bar is played.
     */
    alternateEndings: number;
    /**
     * Gets or sets the next masterbar in the song.
     * @json_ignore
     */
    nextMasterBar: MasterBar | null;
    /**
     * Gets or sets the next masterbar in the song.
     * @json_ignore
     */
    previousMasterBar: MasterBar | null;
    /**
     * Gets the zero based index of the masterbar.
     * @json_ignore
     */
    index: number;
    /**
     * Gets or sets the key signature used on all bars.
     */
    keySignature: KeySignature;
    /**
     * Gets or sets the type of key signature (major/minor)
     */
    keySignatureType: KeySignatureType;
    /**
     * Gets or sets whether a double bar is shown for this masterbar.
     */
    isDoubleBar: boolean;
    /**
     * Gets or sets whether a repeat section starts on this masterbar.
     */
    isRepeatStart: boolean;
    get isRepeatEnd(): boolean;
    /**
     * Gets or sets the number of repeats for the current repeat section.
     */
    repeatCount: number;
    /**
     * Gets or sets the repeat group this bar belongs to.
     * @json_ignore
     */
    repeatGroup: RepeatGroup;
    /**
     * Gets or sets the time signature numerator.
     */
    timeSignatureNumerator: number;
    /**
     * Gets or sets the time signature denominiator.
     */
    timeSignatureDenominator: number;
    /**
     * Gets or sets whether this is bar has a common time signature.
     */
    timeSignatureCommon: boolean;
    /**
     * Gets or sets the triplet feel that is valid for this bar.
     */
    tripletFeel: TripletFeel;
    /**
     * Gets or sets the new section information for this bar.
     */
    section: Section | null;
    get isSectionStart(): boolean;
    /**
     * Gets or sets the tempo automation for this bar.
     */
    tempoAutomation: Automation | null;
    /**
     * Gets or sets the reference to the score this song belongs to.
     * @json_ignore
     */
    score: Score;
    /**
     * Gets or sets the fermatas for this bar. The key is the offset of the fermata in midi ticks.
     * @json_add addFermata
     */
    fermata: Map<number, Fermata> | null;
    /**
     * The timeline position of the voice within the whole score. (unit: midi ticks)
     */
    start: number;
    /**
     * Gets or sets a value indicating whether the master bar is an anacrusis (aka. pickup bar)
     */
    isAnacrusis: boolean;
    /**
     * Gets a percentual scale for the size of the bars when displayed in a multi-track layout.
     */
    displayScale: number;
    /**
     * An absolute width of the bar to use when displaying in a multi-track layout.
     */
    displayWidth: number;
    /**
     * Calculates the time spent in this bar. (unit: midi ticks)
     */
    calculateDuration(respectAnacrusis?: boolean): number;
    /**
     * Adds a fermata to the masterbar.
     * @param offset The offset of the fermata within the bar in midi ticks.
     * @param fermata The fermata.
     */
    addFermata(offset: number, fermata: Fermata): void;
    /**
     * Gets the fermata for a given beat.
     * @param beat The beat to get the fermata for.
     * @returns
     */
    getFermata(beat: Beat): Fermata | null;
}

/**
 * This class represents the rendering stylesheet.
 * It contains settings which control the display of the score when rendered.
 * @json
 * @json_strict
 */
declare class RenderStylesheet {
    /**
     * Gets or sets whether dynamics are hidden.
     */
    hideDynamics: boolean;
}

/**
 * The score is the root node of the complete
 * model. It stores the basic information of
 * a song and stores the sub components.
 * @json
 * @json_strict
 */
declare class Score {
    private _currentRepeatGroup;
    private _openedRepeatGroups;
    private _properlyOpenedRepeatGroups;
    /**
     * The album of this song.
     */
    album: string;
    /**
     * The artist who performs this song.
     */
    artist: string;
    /**
     * The owner of the copyright of this song.
     */
    copyright: string;
    /**
     * Additional instructions
     */
    instructions: string;
    /**
     * The author of the music.
     */
    music: string;
    /**
     * Some additional notes about the song.
     */
    notices: string;
    /**
     * The subtitle of the song.
     */
    subTitle: string;
    /**
     * The title of the song.
     */
    title: string;
    /**
     * The author of the song lyrics
     */
    words: string;
    /**
     * The author of this tablature.
     */
    tab: string;
    /**
     * Gets or sets the global tempo of the song in BPM. The tempo might change via {@link MasterBar.tempo}.
     */
    tempo: number;
    /**
     * Gets or sets the name/label of the tempo.
     */
    tempoLabel: string;
    /**
     * Gets or sets a list of all masterbars contained in this song.
     * @json_add addMasterBar
     */
    masterBars: MasterBar[];
    /**
     * Gets or sets a list of all tracks contained in this song.
     * @json_add addTrack
     */
    tracks: Track[];
    /**
     * Defines how many bars are placed into the systems (rows) when displaying
     * multiple tracks unless a value is set in the systemsLayout.
     */
    defaultSystemsLayout: number;
    /**
     * Defines how many bars are placed into the systems (rows) when displaying
     * multiple tracks.
     */
    systemsLayout: number[];
    /**
     * Gets or sets the rendering stylesheet for this song.
     */
    stylesheet: RenderStylesheet;
    rebuildRepeatGroups(): void;
    addMasterBar(bar: MasterBar): void;
    /**
     * Adds the given bar correctly into the current repeat group setup.
     * @param bar
     */
    private addMasterBarToRepeatGroups;
    addTrack(track: Track): void;
    finish(settings: Settings): void;
}

/**
 * This is the base public class for creating new song importers which
 * enable reading scores from any binary datasource
 */
declare abstract class ScoreImporter {
    protected data: IReadable;
    protected settings: Settings;
    /**
     * Initializes the importer with the given data and settings.
     */
    init(data: IReadable, settings: Settings): void;
    abstract get name(): string;
    /**
     * Reads the {@link Score} contained in the data.
     * @returns The score that was contained in the data.
     */
    abstract readScore(): Score;
}

/**
 * Lists the different position modes for {@link BarRendererBase.getBeatX}
 */
declare enum BeatXPosition {
    /**
     * Gets the pre-notes position which is located before the accidentals
     */
    PreNotes = 0,
    /**
     * Gets the on-notes position which is located after the accidentals but before the note heads.
     */
    OnNotes = 1,
    /**
     * Gets the middle-notes position which is located after in the middle the note heads.
     */
    MiddleNotes = 2,
    /**
     * Gets position of the stem for this beat
     */
    Stem = 3,
    /**
     * Get the post-notes position which is located at after the note heads.
     */
    PostNotes = 4,
    /**
     * Get the end-beat position which is located at the end of the beat. This position is almost
     * equal to the pre-notes position of the next beat.
     */
    EndBeat = 5
}

/**
 * A glyph is a single symbol which can be added to a GlyphBarRenderer for automated
 * layouting and drawing of stacked symbols.
 */
declare class Glyph {
    x: number;
    y: number;
    width: number;
    height: number;
    renderer: BarRendererBase;
    constructor(x: number, y: number);
    get scale(): number;
    doLayout(): void;
    paint(cx: number, cy: number, canvas: ICanvas): void;
}

/**
 * This glyph allows to group several other glyphs to be
 * drawn at the same x position
 */
declare class GlyphGroup extends Glyph {
    protected glyphs: Glyph[] | null;
    get isEmpty(): boolean;
    constructor(x: number, y: number);
    doLayout(): void;
    addGlyph(g: Glyph): void;
    paint(cx: number, cy: number, canvas: ICanvas): void;
}

declare class BeatGlyphBase extends GlyphGroup {
    container: BeatContainerGlyph;
    computedWidth: number;
    constructor();
    doLayout(): void;
    protected noteLoop(action: (note: Note) => void): void;
}

declare class BeamingHelperDrawInfo {
    startBeat: Beat | null;
    startX: number;
    startY: number;
    endBeat: Beat | null;
    endX: number;
    endY: number;
    /**
     * calculates the Y-position given a X-pos using the current start end point
     * @param x
     */
    calcY(x: number): number;
}
/**
 * This public class helps drawing beams and bars for notes.
 */
declare class BeamingHelper {
    private _staff;
    private _beatLineXPositions;
    private _renderer;
    private _firstNonRestBeat;
    private _lastNonRestBeat;
    voice: Voice | null;
    beats: Beat[];
    shortestDuration: Duration;
    /**
     * the number of fingering indicators that will be drawn
     */
    fingeringCount: number;
    /**
     * an indicator whether any beat has a tuplet on it.
     */
    hasTuplet: boolean;
    private _firstBeatLowestNoteCompareValue;
    private _firstBeatHighestNoteCompareValue;
    private _lastBeatLowestNoteCompareValue;
    private _lastBeatHighestNoteCompareValue;
    lowestNoteInHelper: Note | null;
    private _lowestNoteCompareValueInHelper;
    highestNoteInHelper: Note | null;
    private _highestNoteCompareValueInHelper;
    invertBeamDirection: boolean;
    preferredBeamDirection: BeamDirection | null;
    isGrace: boolean;
    minRestLine: number | null;
    beatOfMinRestLine: Beat | null;
    maxRestLine: number | null;
    beatOfMaxRestLine: Beat | null;
    get isRestBeamHelper(): boolean;
    get hasLine(): boolean;
    get hasFlag(): boolean;
    constructor(staff: Staff, renderer: BarRendererBase);
    getBeatLineX(beat: Beat): number;
    hasBeatLineX(beat: Beat): boolean;
    registerBeatLineX(staffId: string, beat: Beat, up: number, down: number): void;
    private getOrCreateBeatPositions;
    direction: BeamDirection;
    finish(): void;
    private calculateDirection;
    static computeLineHeightsForRest(duration: Duration): number[];
    /**
     * Registers a rest beat within the accidental helper so the rest
     * symbol is considered properly during beaming.
     * @param beat The rest beat.
     * @param line The line on which the rest symbol is placed
     */
    applyRest(beat: Beat, line: number): void;
    private invert;
    checkBeat(beat: Beat): boolean;
    private checkNote;
    private static canJoin;
    private static canJoinDuration;
    static isFullBarJoin(a: Beat, b: Beat, barIndex: number): boolean;
    get beatOfLowestNote(): Beat;
    get beatOfHighestNote(): Beat;
    /**
     * Returns whether the the position of the given beat, was registered by the staff of the given ID
     * @param staffId
     * @param beat
     * @returns
     */
    isPositionFrom(staffId: string, beat: Beat): boolean;
    drawingInfos: Map<BeamDirection, BeamingHelperDrawInfo>;
}

/**
 * Represents a rectangular area within the renderer music notation.
 */
declare class Bounds {
    /**
     * Gets or sets the X-position of the rectangle within the music notation.
     */
    x: number;
    /**
     * Gets or sets the Y-position of the rectangle within the music notation.
     */
    y: number;
    /**
     * Gets or sets the width of the rectangle.
     */
    w: number;
    /**
     * Gets or sets the height of the rectangle.
     */
    h: number;
}

declare class BoundsLookup {
    /**
     * @target web
     */
    toJson(): unknown;
    /**
     * @target web
     */
    static fromJson(json: unknown, score: Score): BoundsLookup;
    /**
     * @target web
     */
    private boundsToJson;
    private _beatLookup;
    private _masterBarLookup;
    private _currentStaveGroup;
    /**
     * Gets a list of all individual stave groups contained in the rendered music notation.
     */
    staveGroups: StaveGroupBounds[];
    /**
     * Gets or sets a value indicating whether this lookup was finished already.
     */
    isFinished: boolean;
    /**
     * Finishes the lookup for optimized access.
     */
    finish(): void;
    /**
     * Adds a new stave group to the lookup.
     * @param bounds The stave group bounds to add.
     */
    addStaveGroup(bounds: StaveGroupBounds): void;
    /**
     * Adds a new master bar to the lookup.
     * @param bounds The master bar bounds to add.
     */
    addMasterBar(bounds: MasterBarBounds): void;
    /**
     * Adds a new beat to the lookup.
     * @param bounds The beat bounds to add.
     */
    addBeat(bounds: BeatBounds): void;
    /**
     * Tries to find the master bar bounds by a given index.
     * @param index The index of the master bar to find.
     * @returns The master bar bounds if it was rendered, or null if no boundary information is available.
     */
    findMasterBarByIndex(index: number): MasterBarBounds | null;
    /**
     * Tries to find the master bar bounds by a given master bar.
     * @param bar The master bar to find.
     * @returns The master bar bounds if it was rendered, or null if no boundary information is available.
     */
    findMasterBar(bar: MasterBar): MasterBarBounds | null;
    /**
     * Tries to find the bounds of a given beat.
     * @param beat The beat to find.
     * @returns The beat bounds if it was rendered, or null if no boundary information is available.
     */
    findBeat(beat: Beat): BeatBounds | null;
    /**
     * Tries to find the bounds of a given beat.
     * @param beat The beat to find.
     * @returns The beat bounds if it was rendered, or null if no boundary information is available.
     */
    findBeats(beat: Beat): BeatBounds[] | null;
    /**
     * Tries to find a beat at the given absolute position.
     * @param x The absolute X-position of the beat to find.
     * @param y The absolute Y-position of the beat to find.
     * @returns The beat found at the given position or null if no beat could be found.
     */
    getBeatAtPos(x: number, y: number): Beat | null;
    /**
     * Tries to find the note at the given position using the given beat for fast access.
     * Use {@link findBeat} to find a beat for a given position first.
     * @param beat The beat containing the note.
     * @param x The X-position of the note.
     * @param y The Y-position of the note.
     * @returns The note at the given position within the beat.
     */
    getNoteAtPos(beat: Beat, x: number, y: number): Note | null;
}

/**
 * Represents the bounds of a stave group.
 */
declare class StaveGroupBounds {
    /**
     * Gets or sets the index of the bounds within the parent lookup.
     * This allows fast access of the next/previous groups.
     */
    index: number;
    /**
     * Gets or sets the bounds covering all visually visible elements of this stave group.
     */
    visualBounds: Bounds;
    /**
     * Gets or sets the actual bounds of the elements in this stave group including whitespace areas.
     */
    realBounds: Bounds;
    /**
     * Gets or sets the list of master bar bounds related to this stave group.
     */
    bars: MasterBarBounds[];
    /**
     * Gets or sets a reference to the parent bounds lookup.
     */
    boundsLookup: BoundsLookup;
    /**
     * Finished the lookup for optimized access.
     */
    finish(): void;
    /**
     * Adds a new master bar to this lookup.
     * @param bounds The master bar bounds to add.
     */
    addBar(bounds: MasterBarBounds): void;
    /**
     * Tries to find the master bar bounds that are located at the given X-position.
     * @param x The X-position to find a master bar.
     * @returns The master bounds at the given X-position.
     */
    findBarAtPos(x: number): MasterBarBounds | null;
}

/**
 * Represents the boundaries of a list of bars related to a single master bar.
 */
declare class MasterBarBounds {
    /**
     * Gets or sets the index of this bounds relative within the parent lookup.
     */
    index: number;
    /**
     * Gets or sets a value indicating whether this bounds are the first of the line.
     */
    isFirstOfLine: boolean;
    /**
     * Gets or sets the bounds covering all visually visible elements spanning all bars of this master bar.
     */
    visualBounds: Bounds;
    /**
     * Gets or sets the actual bounds of the elements in this master bar including whitespace areas.
     */
    realBounds: Bounds;
    /**
     * Gets or sets the actual bounds which are exactly aligned with the lines of the staffs.
     */
    lineAlignedBounds: Bounds;
    /**
     * Gets or sets the list of individual bars within this lookup.
     */
    bars: BarBounds[];
    /**
     * Gets or sets a reference to the parent {@link staveGroupBounds}.
     */
    staveGroupBounds: StaveGroupBounds | null;
    /**
     * Adds a new bar to this lookup.
     * @param bounds The bar bounds to add to this lookup.
     */
    addBar(bounds: BarBounds): void;
    /**
     * Tries to find a beat at the given location.
     * @param x The absolute X position where the beat spans across.
     * @param y The absolute Y position where the beat spans across.
     * @returns The beat that spans across the given point, or null if none of the contained bars had a beat at this position.
     */
    findBeatAtPos(x: number, y: number): Beat | null;
    /**
     * Finishes the lookup object and optimizes itself for fast access.
     */
    finish(): void;
    /**
     * Adds a new beat to the lookup.
     * @param bounds The beat bounds to add.
     */
    addBeat(bounds: BeatBounds): void;
}

/**
 * Represents the boundaries of a single bar.
 */
declare class BarBounds {
    /**
     * Gets or sets the reference to the related {@link MasterBarBounds}
     */
    masterBarBounds: MasterBarBounds;
    /**
     * Gets or sets the bounds covering all visually visible elements spanning this bar.
     */
    visualBounds: Bounds;
    /**
     * Gets or sets the actual bounds of the elements in this bar including whitespace areas.
     */
    realBounds: Bounds;
    /**
     * Gets or sets the bar related to this boundaries.
     */
    bar: Bar;
    /**
     * Gets or sets a list of the beats contained in this lookup.
     */
    beats: BeatBounds[];
    /**
     * Adds a new beat to this lookup.
     * @param bounds The beat bounds to add.
     */
    addBeat(bounds: BeatBounds): void;
    /**
     * Tries to find the beat at the given X-position.
     * @param x The X-position of the beat to find.
     * @returns The beat at the given X-position or null if none was found.
     */
    findBeatAtPos(x: number): BeatBounds | null;
    /**
     * Finishes the lookup object and optimizes itself for fast access.
     */
    finish(): void;
}

/**
 * Represents the bounds of a single note
 */
declare class NoteBounds {
    /**
     * Gets or sets the reference to the beat boudns this note relates to.
     */
    beatBounds: BeatBounds;
    /**
     * Gets or sets the bounds of the individual note head.
     */
    noteHeadBounds: Bounds;
    /**
     * Gets or sets the note related to this instance.
     */
    note: Note;
}

/**
 * Represents the bounds of a single beat.
 */
declare class BeatBounds {
    /**
     * Gets or sets the reference to the parent {@link BarBounds}.
     */
    barBounds: BarBounds;
    /**
     * Gets or sets the bounds covering all visually visible elements spanning this beat.
     */
    visualBounds: Bounds;
    /**
     * Gets or sets the actual bounds of the elements in this beat including whitespace areas.
     */
    realBounds: Bounds;
    /**
     * Gets or sets the beat related to this bounds.
     */
    beat: Beat;
    /**
     * Gets or sets the individual note positions of this beat (if {@link CoreSettings.includeNoteBounds} was set to true).
     */
    notes: NoteBounds[] | null;
    /**
     * Adds a new note to this bounds.
     * @param bounds The note bounds to add.
     */
    addNote(bounds: NoteBounds): void;
    /**
     * Tries to find a note at the given position.
     * @param x The X-position of the note to find.
     * @param y The Y-position of the note to find.
     * @returns The note at the given position or null if no note was found, or the note lookup was not enabled before rendering.
     */
    findNoteAtPos(x: number, y: number): Note | null;
}

declare class BeatOnNoteGlyphBase extends BeatGlyphBase {
    beamingHelper: BeamingHelper;
    centerX: number;
    updateBeamingHelper(): void;
    buildBoundingsLookup(beatBounds: BeatBounds, cx: number, cy: number): void;
    getNoteX(note: Note, requestedPosition: NoteXPosition): number;
    getNoteY(note: Note, requestedPosition: NoteYPosition): number;
}

declare class Spring {
    timePosition: number;
    longestDuration: number;
    smallestDuration: number;
    force: number;
    springConstant: number;
    get springWidth(): number;
    preBeatWidth: number;
    graceBeatWidth: number;
    postSpringWidth: number;
    get preSpringWidth(): number;
    allDurations: Set<number>;
}

/**
 * This public class stores size information about a stave.
 * It is used by the layout engine to collect the sizes of score parts
 * to align the parts across multiple staves.
 */
declare class BarLayoutingInfo {
    private static readonly MinDuration;
    private static readonly MinDurationWidth;
    private _timeSortedSprings;
    private _xMin;
    private _minTime;
    private _onTimePositionsForce;
    private _onTimePositions;
    private _incompleteGraceRodsWidth;
    /**
     * an internal version number that increments whenever a change was made.
     */
    version: number;
    preBeatSizes: Map<number, number>;
    onBeatSizes: Map<number, number>;
    onBeatCenterX: Map<number, number>;
    preBeatSize: number;
    postBeatSize: number;
    voiceSize: number;
    minStretchForce: number;
    totalSpringConstant: number;
    updateVoiceSize(size: number): void;
    setPreBeatSize(beat: Beat, size: number): void;
    getPreBeatSize(beat: Beat): number;
    setOnBeatSize(beat: Beat, size: number): void;
    getOnBeatSize(beat: Beat): number;
    getBeatCenterX(beat: Beat): number;
    setBeatCenterX(beat: Beat, x: number): void;
    private updateMinStretchForce;
    incompleteGraceRods: Map<string, Spring[]>;
    allGraceRods: Map<string, Spring[]>;
    springs: Map<number, Spring>;
    addSpring(start: number, duration: number, graceBeatWidth: number, preBeatWidth: number, postSpringSize: number): Spring;
    addBeatSpring(beat: Beat, preBeatSize: number, postBeatSize: number): void;
    finish(): void;
    private calculateSpringConstants;
    height: number;
    paint(_cx: number, _cy: number, _canvas: ICanvas): void;
    private calculateSpringConstant;
    spaceToForce(space: number): number;
    calculateVoiceWidth(force: number): number;
    private calculateWidth;
    buildOnTimePositions(force: number): Map<number, number>;
}

/**
 * This glyph acts as container for handling
 * multiple voice rendering
 */
declare class VoiceContainerGlyph extends GlyphGroup {
    static readonly KeySizeBeat: string;
    beatGlyphs: BeatContainerGlyph[];
    voice: Voice;
    tupletGroups: TupletGroup[];
    constructor(x: number, y: number, voice: Voice);
    scaleToWidth(width: number): void;
    private scaleToForce;
    registerLayoutingInfo(info: BarLayoutingInfo): void;
    applyLayoutingInfo(info: BarLayoutingInfo): void;
    addGlyph(g: Glyph): void;
    doLayout(): void;
    paint(cx: number, cy: number, canvas: ICanvas): void;
}

declare class BeatContainerGlyph extends Glyph {
    static readonly GraceBeatPadding: number;
    voiceContainer: VoiceContainerGlyph;
    beat: Beat;
    preNotes: BeatGlyphBase;
    onNotes: BeatOnNoteGlyphBase;
    ties: Glyph[];
    minWidth: number;
    get onTimeX(): number;
    constructor(beat: Beat, voiceContainer: VoiceContainerGlyph);
    addTie(tie: Glyph): void;
    registerLayoutingInfo(layoutings: BarLayoutingInfo): void;
    applyLayoutingInfo(info: BarLayoutingInfo): void;
    doLayout(): void;
    protected updateWidth(): void;
    scaleToWidth(beatWidth: number): void;
    protected createTies(n: Note): void;
    static getGroupId(beat: Beat): string;
    paint(cx: number, cy: number, canvas: ICanvas): void;
    buildBoundingsLookup(barBounds: BarBounds, cx: number, cy: number, isEmptyBar: boolean): void;
}

interface IEventEmitter {
    on(value: () => void): void;
    off(value: () => void): void;
}
/**
 * @partial
 */
interface IEventEmitterOfT<T> {
    on(value: (arg: T) => void): void;
    off(value: (arg: T) => void): void;
}

/**
 * This eventargs define the details about the rendering and layouting process and are
 * provided whenever a part of of the music sheet is rendered.
 */
declare class RenderFinishedEventArgs {
    /**
     * Gets or sets the unique id of this event args.
     */
    id: string;
    /**
     * Gets or sets the x position of the current rendering result.
     */
    x: number;
    /**
     * Gets or sets the y position of the current rendering result.
     */
    y: number;
    /**
     * Gets or sets the width of the current rendering result.
     */
    width: number;
    /**
     * Gets or sets the height of the current rendering result.
     */
    height: number;
    /**
     * Gets or sets the currently known total width of the final music sheet.
     */
    totalWidth: number;
    /**
     * Gets or sets the currently known total height of the final music sheet.
     */
    totalHeight: number;
    /**
     * Gets or sets the index of the first masterbar that was rendered in this result.
     */
    firstMasterBarIndex: number;
    /**
     * Gets or sets the index of the last masterbar that was rendered in this result.
     */
    lastMasterBarIndex: number;
    /**
     * Gets or sets the render engine specific result object which contains the rendered music sheet.
     */
    renderResult: unknown;
}

/**
 * Represents the public interface of the component that can render scores.
 */
interface IScoreRenderer {
    /**
     * Gets or sets the lookup which allows fast access to beats at a given position.
     */
    readonly boundsLookup: BoundsLookup | null;
    /**
     * Gets or sets the width of the score to be rendered.
     */
    width: number;
    /**
     * Initiates a full re-rendering of the score using the current settings.
     */
    render(): void;
    /**
     * Initiates a resize-optimized re-rendering of the score using the current settings.
     */
    resizeRender(): void;
    /**
     * Initiates the rendering of the specified tracks of the given score.
     * @param score The score defining the tracks.
     * @param trackIndexes The indexes of the tracks to draw.
     */
    renderScore(score: Score | null, trackIndexes: number[] | null): void;
    /**
     * Initiates the rendering of a partial render result which the renderer
     * should have layed out already.
     * @param resultId the result ID as provided by the {@link partialLayoutFinished} event.
     */
    renderResult(resultId: string): void;
    /**
     * Updates the settings to the given object.
     * @param settings
     */
    updateSettings(settings: Settings): void;
    /**
     * Destroys the renderer.
     */
    destroy(): void;
    /**
     * Occurs before the rendering of the tracks starts.
     */
    readonly preRender: IEventEmitterOfT<boolean>;
    /**
     * Occurs after the rendering of the tracks finished.
     */
    readonly renderFinished: IEventEmitterOfT<RenderFinishedEventArgs>;
    /**
     * Occurs whenever a part of the whole music sheet is rendered and can be displayed.
     */
    readonly partialRenderFinished: IEventEmitterOfT<RenderFinishedEventArgs>;
    /**
     * Occurs whenever a part of the whole music sheet is layed out but not yet rendered.
     */
    readonly partialLayoutFinished: IEventEmitterOfT<RenderFinishedEventArgs>;
    /**
     * Occurs when the whole rendering and layout process finished.
     */
    readonly postRenderFinished: IEventEmitter;
    /**
     * Occurs whenever an error happens.
     */
    readonly error: IEventEmitterOfT<Error>;
}

declare class RowContainerGlyph extends GlyphGroup {
    private static readonly Padding;
    private _rows;
    private _align;
    constructor(x: number, y: number, align?: TextAlign);
    doLayout(): void;
    paint(cx: number, cy: number, canvas: ICanvas): void;
}

declare class ChordDiagramContainerGlyph extends RowContainerGlyph {
    constructor(x: number, y: number);
    addChord(chord: Chord): void;
}

/**
 * Effect-Glyphs implementing this public interface get notified
 * as they are expanded over multiple beats.
 */
declare class EffectGlyph extends Glyph {
    /**
     * Gets or sets the beat where the glyph belongs to.
     */
    beat: Beat | null;
    /**
     * Gets or sets the next glyph of the same type in case
     * the effect glyph is expanded when using {@link EffectBarGlyphSizing.groupedOnBeat}.
     */
    nextGlyph: EffectGlyph | null;
    /**
     * Gets or sets the previous glyph of the same type in case
     * the effect glyph is expanded when using {@link EffectBarGlyphSizing.groupedOnBeat}.
     */
    previousGlyph: EffectGlyph | null;
    constructor(x?: number, y?: number);
}

declare class TextGlyph extends EffectGlyph {
    private _lines;
    font: Font;
    textAlign: TextAlign;
    constructor(x: number, y: number, text: string, font: Font, textAlign?: TextAlign);
    doLayout(): void;
    paint(cx: number, cy: number, canvas: ICanvas): void;
}

/**
 * This container represents a single column of bar renderers independent from any staves.
 * This container can be used to reorganize renderers into a new staves.
 */
declare class MasterBarsRenderers {
    width: number;
    isLinkedToPrevious: boolean;
    canWrap: boolean;
    masterBar: MasterBar;
    renderers: BarRendererBase[];
    layoutingInfo: BarLayoutingInfo;
}

declare class StaveTrackGroup {
    track: Track;
    staveGroup: StaveGroup;
    staves: RenderStaff[];
    stavesRelevantForBoundsLookup: RenderStaff[];
    firstStaffInAccolade: RenderStaff | null;
    lastStaffInAccolade: RenderStaff | null;
    constructor(staveGroup: StaveGroup, track: Track);
    addStaff(staff: RenderStaff): void;
}

/**
 * A Staff represents a single line within a StaveGroup.
 * It stores BarRenderer instances created from a given factory.
 */
declare class RenderStaff {
    private _factory;
    private _sharedLayoutData;
    staveTrackGroup: StaveTrackGroup;
    staveGroup: StaveGroup;
    barRenderers: BarRendererBase[];
    x: number;
    y: number;
    height: number;
    index: number;
    staffIndex: number;
    /**
     * This is the index of the track being rendered. This is not the index of the track within the model,
     * but the n-th track being rendered. It is the index of the {@link ScoreRenderer.tracks} array defining
     * which tracks should be rendered.
     * For single-track rendering this will always be zero.
     */
    trackIndex: number;
    modelStaff: Staff;
    get staveId(): string;
    /**
     * This is the visual offset from top where the
     * Staff contents actually start. Used for grouping
     * using a accolade
     */
    staveTop: number;
    topSpacing: number;
    bottomSpacing: number;
    /**
     * This is the visual offset from top where the
     * Staff contents actually ends. Used for grouping
     * using a accolade
     */
    staveBottom: number;
    isFirstInAccolade: boolean;
    isLastInAccolade: boolean;
    constructor(trackIndex: number, staff: Staff, factory: BarRendererFactory);
    getSharedLayoutData<T>(key: string, def: T): T;
    setSharedLayoutData<T>(key: string, def: T): void;
    get isInAccolade(): boolean;
    get isRelevantForBoundsLookup(): boolean;
    registerStaffTop(offset: number): void;
    registerStaffBottom(offset: number): void;
    addBarRenderer(renderer: BarRendererBase): void;
    addBar(bar: Bar, layoutingInfo: BarLayoutingInfo): void;
    revertLastBar(): BarRendererBase;
    scaleToWidth(width: number): void;
    get topOverflow(): number;
    get bottomOverflow(): number;
    finalizeStaff(): void;
    paint(cx: number, cy: number, canvas: ICanvas, startIndex: number, count: number): void;
}

/**
 * A Staff consists of a list of different staves and groups
 * them using an accolade.
 */
declare class StaveGroup {
    private static readonly AccoladeLabelSpacing;
    private _allStaves;
    private _firstStaffInAccolade;
    private _lastStaffInAccolade;
    private _accoladeSpacingCalculated;
    x: number;
    y: number;
    index: number;
    accoladeSpacing: number;
    /**
     * Indicates whether this line is full or not. If the line is full the
     * bars can be aligned to the maximum width. If the line is not full
     * the bars will not get stretched.
     */
    isFull: boolean;
    /**
     * The width that the content bars actually need
     */
    width: number;
    computedWidth: number;
    totalBarDisplayScale: number;
    isLast: boolean;
    masterBarsRenderers: MasterBarsRenderers[];
    staves: StaveTrackGroup[];
    layout: ScoreLayout;
    get firstBarIndex(): number;
    get lastBarIndex(): number;
    addMasterBarRenderers(tracks: Track[], renderers: MasterBarsRenderers): MasterBarsRenderers | null;
    addBars(tracks: Track[], barIndex: number): MasterBarsRenderers | null;
    revertLastBar(): MasterBarsRenderers | null;
    private updateWidthFromLastBar;
    private calculateAccoladeSpacing;
    private getStaveTrackGroup;
    addStaff(track: Track, staff: RenderStaff): void;
    get height(): number;
    scaleToWidth(width: number): void;
    paint(cx: number, cy: number, canvas: ICanvas): void;
    paintPartial(cx: number, cy: number, canvas: ICanvas, startIndex: number, count: number): void;
    finalizeGroup(): void;
    buildBoundingsLookup(cx: number, cy: number): void;
    getBarX(index: number): number;
}

declare class TuningContainerGlyph extends RowContainerGlyph {
    constructor(x: number, y: number);
    addTuning(tuning: Tuning, trackLabel: string): void;
}

/**
 * Lists the different modes in which the staves and systems are arranged.
 */
declare enum InternalSystemsLayoutMode {
    /**
     * Use the automatic alignment system provided by alphaTab (default)
     */
    Automatic = 0,
    /**
     * Use the relative scaling information stored in the score model.
     */
    FromModelWithScale = 1,
    /**
     * Use the absolute size information stored in the score model.
     */
    FromModelWithWidths = 2
}
/**
 * This is the base class for creating new layouting engines for the score renderer.
 */
declare abstract class ScoreLayout {
    private _barRendererLookup;
    abstract get name(): string;
    renderer: ScoreRenderer;
    width: number;
    height: number;
    protected scoreInfoGlyphs: Map<NotationElement, TextGlyph>;
    protected chordDiagrams: ChordDiagramContainerGlyph | null;
    protected tuningGlyph: TuningContainerGlyph | null;
    systemsLayoutMode: InternalSystemsLayoutMode;
    protected constructor(renderer: ScoreRenderer);
    abstract get firstBarX(): number;
    abstract get supportsResize(): boolean;
    resize(): void;
    abstract doResize(): void;
    layoutAndRender(): void;
    private _lazyPartials;
    protected registerPartial(args: RenderFinishedEventArgs, callback: (canvas: ICanvas) => void): void;
    private internalRenderLazyPartial;
    renderLazyPartial(resultId: string): void;
    protected abstract doLayoutAndRender(): void;
    private createScoreInfoGlyphs;
    get scale(): number;
    firstBarIndex: number;
    lastBarIndex: number;
    protected createEmptyStaveGroup(): StaveGroup;
    registerBarRenderer(key: string, renderer: BarRendererBase): void;
    unregisterBarRenderer(key: string, renderer: BarRendererBase): void;
    getRendererForBar(key: string, bar: Bar): BarRendererBase | null;
    layoutAndRenderAnnotation(y: number): number;
}

/**
 * This is the main wrapper of the rendering engine which
 * can render a single track of a score object into a notation sheet.
 */
declare class ScoreRenderer implements IScoreRenderer {
    private _currentLayoutMode;
    private _currentRenderEngine;
    private _renderedTracks;
    canvas: ICanvas | null;
    score: Score | null;
    tracks: Track[] | null;
    /**
     * @internal
     */
    layout: ScoreLayout | null;
    settings: Settings;
    boundsLookup: BoundsLookup | null;
    width: number;
    /**
     * Initializes a new instance of the {@link ScoreRenderer} class.
     * @param settings The settings to use for rendering.
     */
    constructor(settings: Settings);
    destroy(): void;
    private recreateCanvas;
    private recreateLayout;
    renderScore(score: Score | null, trackIndexes: number[] | null): void;
    /**
     * Initiates rendering fof the given tracks.
     * @param tracks The tracks to render.
     */
    renderTracks(tracks: Track[]): void;
    updateSettings(settings: Settings): void;
    renderResult(resultId: string): void;
    render(): void;
    resizeRender(): void;
    private layoutAndRender;
    readonly preRender: IEventEmitterOfT<boolean>;
    readonly renderFinished: IEventEmitterOfT<RenderFinishedEventArgs>;
    readonly partialRenderFinished: IEventEmitterOfT<RenderFinishedEventArgs>;
    readonly partialLayoutFinished: IEventEmitterOfT<RenderFinishedEventArgs>;
    readonly postRenderFinished: IEventEmitter;
    readonly error: IEventEmitterOfT<Error>;
    private onRenderFinished;
}

declare class ReservedLayoutAreaSlot {
    topY: number;
    bottomY: number;
    constructor(topY: number, bottomY: number);
}
declare class ReservedLayoutArea {
    beat: Beat;
    topY: number;
    bottomY: number;
    slots: ReservedLayoutAreaSlot[];
    constructor(beat: Beat);
    addSlot(topY: number, bottomY: number): void;
}
declare class BarCollisionHelper {
    reservedLayoutAreasByDisplayTime: Map<number, ReservedLayoutArea>;
    restDurationsByDisplayTime: Map<number, Map<number, number>>;
    getBeatMinMaxY(): number[];
    reserveBeatSlot(beat: Beat, topY: number, bottomY: number): void;
    registerRest(beat: Beat): void;
    applyRestCollisionOffset(beat: Beat, currentY: number, linesToPixel: number): number;
}

declare class BarHelpers {
    private _renderer;
    beamHelpers: BeamingHelper[][];
    beamHelperLookup: Map<number, BeamingHelper>[];
    collisionHelper: BarCollisionHelper;
    constructor(renderer: BarRendererBase);
    initialize(): void;
    getBeamingHelperForBeat(beat: Beat): BeamingHelper;
}

/**
 * Lists the different position modes for {@link BarRendererBase.getNoteY}
 */
declare enum NoteYPosition {
    /**
     * Gets the note y-position on top of the note stem or tab number.
     */
    TopWithStem = 0,
    /**
     * Gets the note y-position on top of the note head or tab number.
     */
    Top = 1,
    /**
     * Gets the note y-position on the center of the note head or tab number.
     */
    Center = 2,
    /**
     * Gets the note y-position on the bottom of the note head or tab number.
     */
    Bottom = 3,
    /**
     * Gets the note y-position on the bottom of the note stem or tab number.
     */
    BottomWithStem = 4
}
/**
 * Lists the different position modes for {@link BarRendererBase.getNoteX}
 */
declare enum NoteXPosition {
    /**
     * Gets the note x-position on left of the note head or tab number.
     */
    Left = 0,
    /**
     * Gets the note x-position on the center of the note head or tab number.
     */
    Center = 1,
    /**
     * Gets the note x-position on the right of the note head or tab number.
     */
    Right = 2
}
/**
 * This is the base public class for creating blocks which can render bars.
 */
declare class BarRendererBase {
    static readonly LineSpacing: number;
    static readonly StemWidth: number;
    static readonly StaffLineThickness: number;
    static readonly BeamThickness: number;
    static readonly BeamSpacing: number;
    private _preBeatGlyphs;
    private _voiceContainers;
    private _postBeatGlyphs;
    private _ties;
    get nextRenderer(): BarRendererBase | null;
    get previousRenderer(): BarRendererBase | null;
    scoreRenderer: ScoreRenderer;
    staff: RenderStaff;
    layoutingInfo: BarLayoutingInfo;
    bar: Bar;
    x: number;
    y: number;
    width: number;
    computedWidth: number;
    height: number;
    index: number;
    topOverflow: number;
    bottomOverflow: number;
    helpers: BarHelpers;
    /**
     * Gets or sets whether this renderer is linked to the next one
     * by some glyphs like a vibrato effect
     */
    isLinkedToPrevious: boolean;
    /**
     * Gets or sets whether this renderer can wrap to the next line
     * or it needs to stay connected to the previous one.
     * (e.g. when having double bar repeats we must not separate the 2 bars)
     */
    canWrap: boolean;
    constructor(renderer: ScoreRenderer, bar: Bar);
    registerTies(ties: Glyph[]): void;
    get middleYPosition(): number;
    registerOverflowTop(topOverflow: number): boolean;
    registerOverflowBottom(bottomOverflow: number): boolean;
    scaleToWidth(width: number): void;
    get resources(): RenderingResources;
    get settings(): Settings;
    get scale(): number;
    /**
     * Gets the scale with which the bar should be displayed in case the model
     * scale should be respected.
     */
    get barDisplayScale(): number;
    /**
     * Gets the absolute width in which the bar should be displayed in case the model
     * scale should be respected.
     */
    get barDisplayWidth(): number;
    private _wasFirstOfLine;
    get isFirstOfLine(): boolean;
    get isLast(): boolean;
    registerLayoutingInfo(): void;
    private _appliedLayoutingInfo;
    applyLayoutingInfo(): boolean;
    isFinalized: boolean;
    finalizeRenderer(): boolean;
    /**
     * Gets the top padding for the main content of the renderer.
     * Can be used to specify where i.E. the score lines of the notation start.
     * @returns
     */
    topPadding: number;
    /**
     * Gets the bottom padding for the main content of the renderer.
     * Can be used to specify where i.E. the score lines of the notation end.
     */
    bottomPadding: number;
    doLayout(): void;
    protected hasVoiceContainer(voice: Voice): boolean;
    protected updateSizes(): void;
    protected addPreBeatGlyph(g: Glyph): void;
    protected addBeatGlyph(g: BeatContainerGlyph): void;
    protected getVoiceContainer(voice: Voice): VoiceContainerGlyph | undefined;
    getBeatContainer(beat: Beat): BeatContainerGlyph | undefined;
    getPreNotesGlyphForBeat(beat: Beat): BeatGlyphBase | undefined;
    getOnNotesGlyphForBeat(beat: Beat): BeatOnNoteGlyphBase | undefined;
    paint(cx: number, cy: number, canvas: ICanvas): void;
    protected paintBackground(cx: number, cy: number, canvas: ICanvas): void;
    buildBoundingsLookup(masterBarBounds: MasterBarBounds, cx: number, cy: number): void;
    protected addPostBeatGlyph(g: Glyph): void;
    protected createPreBeatGlyphs(): void;
    protected createBeatGlyphs(): void;
    protected createVoiceGlyphs(v: Voice): void;
    protected createPostBeatGlyphs(): void;
    get beatGlyphsStart(): number;
    get postBeatGlyphsStart(): number;
    getBeatX(beat: Beat, requestedPosition?: BeatXPosition): number;
    getNoteX(note: Note, requestedPosition: NoteXPosition): number;
    getNoteY(note: Note, requestedPosition: NoteYPosition): number;
    reLayout(): void;
    protected paintSimileMark(cx: number, cy: number, canvas: ICanvas): void;
    completeBeamingHelper(helper: BeamingHelper): void;
}

/**
 * This is the base public class for creating factories providing BarRenderers
 */
declare abstract class BarRendererFactory {
    isInAccolade: boolean;
    isRelevantForBoundsLookup: boolean;
    hideOnMultiTrack: boolean;
    hideOnPercussionTrack: boolean;
    abstract get staffId(): string;
    canCreate(track: Track, staff: Staff): boolean;
    abstract create(renderer: ScoreRenderer, bar: Bar): BarRendererBase;
}

/**
 * This small utility helps to detect whether a particular font is already loaded.
 * @target web
 */
declare class FontLoadingChecker {
    private _originalFamilies;
    private _families;
    private _isStarted;
    isFontLoaded: boolean;
    fontLoaded: IEventEmitterOfT<string>;
    constructor(families: string[]);
    checkForFontAvailability(): void;
    private isFontAvailable;
}

/**
 * Lists all web specific platforms alphaTab might run in
 * like browser, nodejs.
 */
declare enum WebPlatform {
    Browser = 0,
    NodeJs = 1,
    BrowserModule = 2
}

/**
 * Defines all possible accidentals for notes.
 */
declare enum AccidentalType {
    /**
     * No accidental
     */
    None = 0,
    /**
     * Naturalize
     */
    Natural = 1,
    /**
     * Sharp
     */
    Sharp = 2,
    /**
     * Flat
     */
    Flat = 3,
    /**
     * Natural for smear bends
     */
    NaturalQuarterNoteUp = 4,
    /**
     * Sharp for smear bends
     */
    SharpQuarterNoteUp = 5,
    /**
     * Flat for smear bends
     */
    FlatQuarterNoteUp = 6,
    /**
     * Double Sharp, indicated by an 'x'
     */
    DoubleSharp = 7,
    /**
     * Double Flat, indicated by 'bb'
     */
    DoubleFlat = 8
}

/**
 * Represents a writer where binary data can be written to.
 */
interface IWriteable {
    /**
     * Gets the current number of written bytes.
     */
    readonly bytesWritten: number;
    /**
     * Write a single byte to the stream.
     * @param value The value to write.
     */
    writeByte(value: number): void;
    /**
     * Write data from the given buffer.
     * @param buffer The buffer to get the data from.
     * @param offset The offset where to start reading the data.
     * @param count The number of bytes to write
     */
    write(buffer: Uint8Array, offset: number, count: number): void;
}

/**
 * Lists all midi controllers.
 */
declare enum ControllerType {
    /**
     * Bank Select. MSB
     */
    BankSelectCoarse = 0,
    /**
     * Modulation wheel or lever MSB
     */
    ModulationCoarse = 1,
    /**
     * Data entry MSB
     */
    DataEntryCoarse = 6,
    /**
     * Channel Volume MSB
     */
    VolumeCoarse = 7,
    /**
     * Pan MSB
     */
    PanCoarse = 10,
    /**
     * Expression Controller MSB
     */
    ExpressionControllerCoarse = 11,
    BankSelectFine = 32,
    /**
     * Modulation wheel or level LSB
     */
    ModulationFine = 33,
    /**
     * Data Entry LSB
     */
    DataEntryFine = 38,
    /**
     * Channel Volume LSB
     */
    VolumeFine = 39,
    /**
     * Pan LSB
     */
    PanFine = 42,
    /**
     * Expression controller LSB
     */
    ExpressionControllerFine = 43,
    /**
     * Damper pedal (sustain)
     */
    HoldPedal = 64,
    /**
     * Legato Footswitch
     */
    LegatoPedal = 68,
    /**
     * Non-Registered Parameter Number LSB
     */
    NonRegisteredParameterFine = 98,
    /**
     * Non-Registered Parameter Number MSB
     */
    NonRegisteredParameterCourse = 99,
    /**
     * Registered Parameter Number LSB
     */
    RegisteredParameterFine = 100,
    /**
     * Registered Parameter Number MSB
     */
    RegisteredParameterCourse = 101,
    AllSoundOff = 120,
    /**
     * Reset all controllers
     */
    ResetControllers = 121,
    /**
     * All notes of.
     */
    AllNotesOff = 123
}

/**
 * Lists all midi event types. Based on the type the instance is a specific subclass.
 */
declare enum MidiEventType {
    TimeSignature = 88,// 0xFF _0x58_ in Midi 1.0
    NoteOn = 128,// Aligned with Midi 1.0
    NoteOff = 144,// Aligned with Midi 1.0
    ControlChange = 176,// Aligned with Midi 1.0
    ProgramChange = 192,// Aligned with Midi 1.0
    TempoChange = 81,// 0xFF _0x51_ in Midi 1.0 
    PitchBend = 224,// Aligned with Midi 1.0
    PerNotePitchBend = 96,// Aligned with Midi 2.0
    EndOfTrack = 47,// 0xFF _0x2F_ in Midi 1.0
    AlphaTabRest = 241,// SystemExclusive + 1 
    AlphaTabMetronome = 242,// SystemExclusive + 2
    /**
     * @deprecated Not used anymore internally. move to the other concrete types.
     */
    SystemExclusive = 240,// Aligned with Midi 1.0
    /**
     * @deprecated Not used anymore internally. move to the other concrete types.
     */
    SystemExclusive2 = 247,// Aligned with Midi 1.0
    /**
     * @deprecated Not used anymore internally. move to the other concrete types.
     */
    Meta = 255
}
/**
 * Represents a midi event.
 */
declare abstract class MidiEvent {
    /**
     * Gets or sets the track to which the midi event belongs.
     */
    track: number;
    /**
     * Gets or sets the absolute tick of this midi event.
     */
    tick: number;
    /**
     * Gets or sets the midi command (type) of this event.
     */
    type: MidiEventType;
    /**
     * Initializes a new instance of the {@link MidiEvent} class.
     * @param track The track this event belongs to.
     * @param tick The absolute midi ticks of this event.
     * @param command The type of this event.
     */
    constructor(track: number, tick: number, command: MidiEventType);
    /**
     * @deprecated Change to `type`
     */
    get command(): MidiEventType;
    /**
     * @deprecated Use individual properties to access data.
     */
    get message(): number;
    /**
     * @deprecated Use individual properties to access data.
     */
    get data1(): number;
    /**
     * @deprecated Use individual properties to access data.
     */
    get data2(): number;
    /**
     * Writes the midi event as binary into the given stream.
     * @param s The stream to write to.
     */
    abstract writeTo(s: IWriteable): void;
}
/**
 * Represents a time signature change event.
 */
declare class TimeSignatureEvent extends MidiEvent {
    /**
     * The time signature numerator.
     */
    numerator: number;
    /**
     * The denominator index is a negative power of two: 2 represents a quarter-note, 3 represents an eighth-note, etc.
     * Denominator = 2^(index)
     */
    denominatorIndex: number;
    /**
     * The number of MIDI clocks in a metronome click
     */
    midiClocksPerMetronomeClick: number;
    /**
     * The number of notated 32nd-notes in what MIDI thinks of as a quarter-note (24 MIDI Clocks).
     */
    thirtySecondNodesInQuarter: number;
    constructor(track: number, tick: number, numerator: number, denominatorIndex: number, midiClocksPerMetronomeClick: number, thirtySecondNodesInQuarter: number);
    writeTo(s: IWriteable): void;
}
/**
 * The base class for alphaTab specific midi events (like metronomes and rests).
 */
declare abstract class AlphaTabSysExEvent extends MidiEvent {
    static readonly AlphaTabManufacturerId = 125;
    static readonly MetronomeEventId = 0;
    static readonly RestEventId = 1;
    constructor(track: number, tick: number, type: MidiEventType);
    writeTo(s: IWriteable): void;
    protected abstract writeEventData(s: IWriteable): void;
}
/**
 * Represents a metronome event. This event is emitted by the synthesizer only during playback and
 * is typically not part of the midi file itself.
 */
declare class AlphaTabMetronomeEvent extends AlphaTabSysExEvent {
    /**
     * The metronome counter as per current time signature.
     */
    metronomeNumerator: number;
    /**
     * The duration of the metronome tick in MIDI ticks.
     */
    metronomeDurationInTicks: number;
    /**
     * The duration of the metronome tick in milliseconds.
     */
    metronomeDurationInMilliseconds: number;
    /**
     * Gets a value indicating whether the current event is a metronome event.
     */
    readonly isMetronome: boolean;
    constructor(track: number, tick: number, counter: number, durationInTicks: number, durationInMillis: number);
    protected writeEventData(s: IWriteable): void;
}
/**
 * Represents a REST beat being 'played'. This event supports alphaTab in placing the cursor.
 */
declare class AlphaTabRestEvent extends AlphaTabSysExEvent {
    channel: number;
    constructor(track: number, tick: number, channel: number);
    protected writeEventData(s: IWriteable): void;
}
/**
 * The base class for note related events.
 */
declare abstract class NoteEvent extends MidiEvent {
    /**
     * The channel on which the note is played.
     */
    channel: number;
    /**
     * The key of the note being played (aka. the note height).
     */
    noteKey: number;
    /**
     * The velocity in which the 'key' of the note is pressed (aka. the loudness/intensity of the note).
     */
    noteVelocity: number;
    constructor(track: number, tick: number, type: MidiEventType, channel: number, noteKey: number, noteVelocity: number);
    get data1(): number;
    get data2(): number;
}
/**
 * Represents a note being played
 */
declare class NoteOnEvent extends NoteEvent {
    constructor(track: number, tick: number, channel: number, noteKey: number, noteVelocity: number);
    writeTo(s: IWriteable): void;
}
/**
 * Represents a note stop being played.
 */
declare class NoteOffEvent extends NoteEvent {
    constructor(track: number, tick: number, channel: number, noteKey: number, noteVelocity: number);
    writeTo(s: IWriteable): void;
}
/**
 * Represents the change of a value on a midi controller.
 */
declare class ControlChangeEvent extends MidiEvent {
    /**
     * The channel for which the controller is changing.
     */
    channel: number;
    /**
     * The type of the controller which is changing.
     */
    controller: ControllerType;
    /**
     * The new value of the controller. The meaning is depending on the controller type.
     */
    value: number;
    constructor(track: number, tick: number, channel: number, controller: ControllerType, value: number);
    writeTo(s: IWriteable): void;
    get data1(): number;
    get data2(): number;
}
/**
 * Represents the change of the midi program on a channel.
 */
declare class ProgramChangeEvent extends MidiEvent {
    /**
     * The midi channel for which the program changes.
     */
    channel: number;
    /**
     * The numeric value of the program indicating the instrument bank to choose.
     */
    program: number;
    constructor(track: number, tick: number, channel: number, program: number);
    writeTo(s: IWriteable): void;
    get data1(): number;
}
/**
 * Represents a change of the tempo in the song.
 */
declare class TempoChangeEvent extends MidiEvent {
    /**
     * The tempo in microseconds per quarter note (aka USQ). A time format typically for midi.
     */
    microSecondsPerQuarterNote: number;
    constructor(tick: number, microSecondsPerQuarterNote: number);
    writeTo(s: IWriteable): void;
}
/**
 * Represents a change of the pitch bend (aka. pitch wheel) on a specific channel.
 */
declare class PitchBendEvent extends MidiEvent {
    /**
     * The channel for which the pitch bend changes.
     */
    channel: number;
    /**
     * The value to which the pitch changes. This value is according to the MIDI specification.
     */
    value: number;
    constructor(track: number, tick: number, channel: number, value: number);
    writeTo(s: IWriteable): void;
    get data1(): number;
    get data2(): number;
}
/**
 * Represents a single note pitch bend change.
 */
declare class NoteBendEvent extends MidiEvent {
    /**
     * The channel on which the note is played for which the pitch changes.
     */
    channel: number;
    /**
     * The key of the note for which the pitch changes.
     */
    noteKey: number;
    /**
     * The value to which the pitch changes. This value is according to the MIDI specification.
     */
    value: number;
    constructor(track: number, tick: number, channel: number, noteKey: number, value: number);
    writeTo(s: IWriteable): void;
}
/**
 * Represents the end of the track indicating that no more events for this track follow.
 */
declare class EndOfTrackEvent extends MidiEvent {
    constructor(track: number, tick: number);
    writeTo(s: IWriteable): void;
}

/**
 * Lists the different midi file formats which are supported for export.
 */
declare enum MidiFileFormat {
    /**
     * A single track multi channel file (SMF Type 0)
     */
    SingleTrackMultiChannel = 0,
    /**
     * A multi track file (SMF Type 1)
     */
    MultiTrack = 1
}
declare class MidiTrack {
    /**
     * Gets a list of midi events sorted by time.
     */
    readonly events: MidiEvent[];
    /**
     * Adds the given midi event a the correct time position into the file.
     */
    addEvent(e: MidiEvent): void;
    /**
     * Writes the midi track as binary into the given stream.
     * @returns The stream to write to.
     */
    writeTo(s: IWriteable): void;
}
/**
 * Represents a midi file with a single track that can be played via {@link AlphaSynth}
 */
declare class MidiFile {
    /**
     * Gets or sets the midi file format to use.
     */
    format: MidiFileFormat;
    /**
     * Gets or sets the division per quarter notes.
     */
    division: number;
    /**
     * Gets a list of midi events sorted by time.
     */
    get events(): MidiEvent[];
    /**
     * Gets a list of midi tracks.
     */
    readonly tracks: MidiTrack[];
    private ensureTracks;
    /**
     * Adds the given midi event a the correct time position into the file.
     */
    addEvent(e: MidiEvent): void;
    /**
     * Writes the midi file into a binary format.
     * @returns The binary midi file.
     */
    toBinary(): Uint8Array;
    /**
     * Writes the midi file as binary into the given stream.
     * @returns The stream to write to.
     */
    writeTo(s: IWriteable): void;
    static writeVariableInt(s: IWriteable, value: number): void;
}

/**
 * This class can convert a full {@link Score} instance to a simple JavaScript object and back for further
 * JSON serialization.
 */
declare class JsonConverter {
    /**
     * @target web
     */
    private static jsonReplacer;
    /**
     * Converts the given score into a JSON encoded string.
     * @param score The score to serialize.
     * @returns A JSON encoded string.
     * @target web
     */
    static scoreToJson(score: Score): string;
    /**
     * Converts the given JSON string back to a {@link Score} object.
     * @param json The JSON string
     * @param settings The settings to use during conversion.
     * @returns The converted score object.
     * @target web
     */
    static jsonToScore(json: string, settings?: Settings): Score;
    /**
     * Converts the score into a JavaScript object without circular dependencies.
     * @param score The score object to serialize
     * @returns A serialized score object without ciruclar dependencies that can be used for further serializations.
     */
    static scoreToJsObject(score: Score): unknown;
    /**
     * Converts the given JavaScript object into a score object.
     * @param jsObject The javascript object created via {@link Score}
     * @param settings The settings to use during conversion.
     * @returns The converted score object.
     */
    static jsObjectToScore(jsObject: unknown, settings?: Settings): Score;
    /**
     * Converts the given settings into a JSON encoded string.
     * @param settings The settings to serialize.
     * @returns A JSON encoded string.
     * @target web
     */
    static settingsToJson(settings: Settings): string;
    /**
     * Converts the given JSON string back to a {@link Score} object.
     * @param json The JSON string
     * @returns The converted settings object.
     * @target web
     */
    static jsonToSettings(json: string): Settings;
    /**
     * Converts the settings object into a JavaScript object for transmission between components or saving purposes.
     * @param settings The settings object to serialize
     * @returns A serialized settings object without ciruclar dependencies that can be used for further serializations.
     */
    static settingsToJsObject(settings: Settings): Map<string, unknown> | null;
    /**
     * Converts the given JavaScript object into a settings object.
     * @param jsObject The javascript object created via {@link Settings}
     * @returns The converted Settings object.
     */
    static jsObjectToSettings(jsObject: unknown): Settings;
    /**
     * Converts the given JavaScript object into a MidiFile object.
     * @param jsObject The javascript object to deserialize.
     * @returns The converted MidiFile.
     */
    static jsObjectToMidiFile(jsObject: unknown): MidiFile;
    private static jsObjectToMidiTrack;
    /**
     * Converts the given JavaScript object into a MidiEvent object.
     * @param jsObject The javascript object to deserialize.
     * @returns The converted MidiEvent.
     */
    static jsObjectToMidiEvent(midiEvent: unknown): MidiEvent;
    /**
     * Converts the given MidiFile object into a serialized JavaScript object.
     * @param midi The midi file to convert.
     * @returns A serialized MidiFile object without ciruclar dependencies that can be used for further serializations.
     */
    static midiFileToJsObject(midi: MidiFile): Map<string, unknown>;
    private static midiTrackToJsObject;
    /**
     * Converts the given MidiEvent object into a serialized JavaScript object.
     * @param midi The midi file to convert.
     * @returns A serialized MidiEvent object without ciruclar dependencies that can be used for further serializations.
     */
    static midiEventToJsObject(midiEvent: MidiEvent): Map<string, unknown>;
}

type index_d$6_AccentuationType = AccentuationType;
declare const index_d$6_AccentuationType: typeof AccentuationType;
type index_d$6_AccidentalType = AccidentalType;
declare const index_d$6_AccidentalType: typeof AccidentalType;
type index_d$6_Automation = Automation;
declare const index_d$6_Automation: typeof Automation;
type index_d$6_AutomationType = AutomationType;
declare const index_d$6_AutomationType: typeof AutomationType;
type index_d$6_Bar = Bar;
declare const index_d$6_Bar: typeof Bar;
type index_d$6_Beat = Beat;
declare const index_d$6_Beat: typeof Beat;
type index_d$6_BendPoint = BendPoint;
declare const index_d$6_BendPoint: typeof BendPoint;
type index_d$6_BendStyle = BendStyle;
declare const index_d$6_BendStyle: typeof BendStyle;
type index_d$6_BendType = BendType;
declare const index_d$6_BendType: typeof BendType;
type index_d$6_BrushType = BrushType;
declare const index_d$6_BrushType: typeof BrushType;
type index_d$6_Chord = Chord;
declare const index_d$6_Chord: typeof Chord;
type index_d$6_Clef = Clef;
declare const index_d$6_Clef: typeof Clef;
type index_d$6_Color = Color;
declare const index_d$6_Color: typeof Color;
type index_d$6_CrescendoType = CrescendoType;
declare const index_d$6_CrescendoType: typeof CrescendoType;
type index_d$6_Duration = Duration;
declare const index_d$6_Duration: typeof Duration;
type index_d$6_DynamicValue = DynamicValue;
declare const index_d$6_DynamicValue: typeof DynamicValue;
type index_d$6_Fermata = Fermata;
declare const index_d$6_Fermata: typeof Fermata;
type index_d$6_FermataType = FermataType;
declare const index_d$6_FermataType: typeof FermataType;
type index_d$6_Fingers = Fingers;
declare const index_d$6_Fingers: typeof Fingers;
type index_d$6_Font = Font;
declare const index_d$6_Font: typeof Font;
type index_d$6_FontStyle = FontStyle;
declare const index_d$6_FontStyle: typeof FontStyle;
type index_d$6_GraceType = GraceType;
declare const index_d$6_GraceType: typeof GraceType;
type index_d$6_HarmonicType = HarmonicType;
declare const index_d$6_HarmonicType: typeof HarmonicType;
type index_d$6_InstrumentArticulation = InstrumentArticulation;
declare const index_d$6_InstrumentArticulation: typeof InstrumentArticulation;
type index_d$6_JsonConverter = JsonConverter;
declare const index_d$6_JsonConverter: typeof JsonConverter;
type index_d$6_KeySignature = KeySignature;
declare const index_d$6_KeySignature: typeof KeySignature;
type index_d$6_KeySignatureType = KeySignatureType;
declare const index_d$6_KeySignatureType: typeof KeySignatureType;
type index_d$6_Lyrics = Lyrics;
declare const index_d$6_Lyrics: typeof Lyrics;
type index_d$6_MasterBar = MasterBar;
declare const index_d$6_MasterBar: typeof MasterBar;
type index_d$6_MusicFontSymbol = MusicFontSymbol;
declare const index_d$6_MusicFontSymbol: typeof MusicFontSymbol;
type index_d$6_Note = Note;
declare const index_d$6_Note: typeof Note;
type index_d$6_NoteAccidentalMode = NoteAccidentalMode;
declare const index_d$6_NoteAccidentalMode: typeof NoteAccidentalMode;
type index_d$6_Ottavia = Ottavia;
declare const index_d$6_Ottavia: typeof Ottavia;
type index_d$6_PickStroke = PickStroke;
declare const index_d$6_PickStroke: typeof PickStroke;
type index_d$6_PlaybackInformation = PlaybackInformation;
declare const index_d$6_PlaybackInformation: typeof PlaybackInformation;
type index_d$6_RenderStylesheet = RenderStylesheet;
declare const index_d$6_RenderStylesheet: typeof RenderStylesheet;
type index_d$6_RepeatGroup = RepeatGroup;
declare const index_d$6_RepeatGroup: typeof RepeatGroup;
type index_d$6_Score = Score;
declare const index_d$6_Score: typeof Score;
type index_d$6_Section = Section;
declare const index_d$6_Section: typeof Section;
type index_d$6_SimileMark = SimileMark;
declare const index_d$6_SimileMark: typeof SimileMark;
type index_d$6_SlideInType = SlideInType;
declare const index_d$6_SlideInType: typeof SlideInType;
type index_d$6_SlideOutType = SlideOutType;
declare const index_d$6_SlideOutType: typeof SlideOutType;
type index_d$6_Staff = Staff;
declare const index_d$6_Staff: typeof Staff;
type index_d$6_Track = Track;
declare const index_d$6_Track: typeof Track;
type index_d$6_TripletFeel = TripletFeel;
declare const index_d$6_TripletFeel: typeof TripletFeel;
type index_d$6_Tuning = Tuning;
declare const index_d$6_Tuning: typeof Tuning;
type index_d$6_TupletGroup = TupletGroup;
declare const index_d$6_TupletGroup: typeof TupletGroup;
type index_d$6_VibratoType = VibratoType;
declare const index_d$6_VibratoType: typeof VibratoType;
type index_d$6_Voice = Voice;
declare const index_d$6_Voice: typeof Voice;
type index_d$6_WhammyType = WhammyType;
declare const index_d$6_WhammyType: typeof WhammyType;
declare namespace index_d$6 {
  export { index_d$6_AccentuationType as AccentuationType, index_d$6_AccidentalType as AccidentalType, index_d$6_Automation as Automation, index_d$6_AutomationType as AutomationType, index_d$6_Bar as Bar, index_d$6_Beat as Beat, index_d$6_BendPoint as BendPoint, index_d$6_BendStyle as BendStyle, index_d$6_BendType as BendType, index_d$6_BrushType as BrushType, index_d$6_Chord as Chord, index_d$6_Clef as Clef, index_d$6_Color as Color, index_d$6_CrescendoType as CrescendoType, index_d$6_Duration as Duration, index_d$6_DynamicValue as DynamicValue, index_d$6_Fermata as Fermata, index_d$6_FermataType as FermataType, index_d$6_Fingers as Fingers, index_d$6_Font as Font, index_d$6_FontStyle as FontStyle, index_d$6_GraceType as GraceType, index_d$6_HarmonicType as HarmonicType, index_d$6_InstrumentArticulation as InstrumentArticulation, index_d$6_JsonConverter as JsonConverter, index_d$6_KeySignature as KeySignature, index_d$6_KeySignatureType as KeySignatureType, index_d$6_Lyrics as Lyrics, index_d$6_MasterBar as MasterBar, index_d$6_MusicFontSymbol as MusicFontSymbol, index_d$6_Note as Note, index_d$6_NoteAccidentalMode as NoteAccidentalMode, index_d$6_Ottavia as Ottavia, index_d$6_PickStroke as PickStroke, index_d$6_PlaybackInformation as PlaybackInformation, index_d$6_RenderStylesheet as RenderStylesheet, index_d$6_RepeatGroup as RepeatGroup, index_d$6_Score as Score, index_d$6_Section as Section, index_d$6_SimileMark as SimileMark, index_d$6_SlideInType as SlideInType, index_d$6_SlideOutType as SlideOutType, index_d$6_Staff as Staff, index_d$6_Track as Track, index_d$6_TripletFeel as TripletFeel, index_d$6_Tuning as Tuning, index_d$6_TupletGroup as TupletGroup, index_d$6_VibratoType as VibratoType, index_d$6_Voice as Voice, index_d$6_WhammyType as WhammyType };
}

declare class LayoutEngineFactory {
    readonly vertical: boolean;
    readonly createLayout: (renderer: ScoreRenderer) => ScoreLayout;
    constructor(vertical: boolean, createLayout: (renderer: ScoreRenderer) => ScoreLayout);
}
declare class RenderEngineFactory {
    readonly supportsWorkers: boolean;
    readonly createCanvas: () => ICanvas;
    constructor(supportsWorkers: boolean, canvas: () => ICanvas);
}
/**
 * This public class represents the global alphaTab environment where
 * alphaTab looks for information like available layout engines
 * staves etc.
 * This public class represents the global alphaTab environment where
 * alphaTab looks for information like available layout engines
 * staves etc.
 * @partial
 */
declare class Environment {
    /**
     * The font size of the music font in pixel.
     */
    static readonly MusicFontSize = 34;
    /**
     * The scaling factor to use when rending raster graphics for sharper rendering on high-dpi displays.
     */
    static HighDpiFactor: number;
    /**
     * @target web
     */
    static createStyleElement(elementDocument: HTMLDocument, fontDirectory: string | null): void;
    /**
     * @target web
     */
    private static _globalThis;
    /**
     * @target web
     */
    static get globalThis(): any;
    /**
     * @target web
     */
    static webPlatform: WebPlatform;
    /**
     * @target web
     */
    static isWebPackBundled: boolean;
    /**
     * @target web
     */
    static isViteBundled: boolean;
    /**
     * @target web
     */
    static scriptFile: string | null;
    /**
     * @target web
     */
    static fontDirectory: string | null;
    /**
     * @target web
     */
    static bravuraFontChecker: FontLoadingChecker;
    /**
     * @target web
     */
    static get isRunningInWorker(): boolean;
    /**
     * @target web
     */
    static get isRunningInAudioWorklet(): boolean;
    /**
     * @target web
     * @internal
     */
    static createWebWorker: (settings: Settings) => Worker;
    /**
     * @target web
     * @internal
     */
    static createAudioWorklet: (context: AudioContext, settings: Settings) => Promise<void>;
    /**
     * @target web
     * @partial
     */
    static throttle(action: () => void, delay: number): () => void;
    /**
     * @target web
     */
    private static detectScriptFile;
    /**
     * @target web
     */
    static ensureFullUrl(relativeUrl: string | null): string;
    private static appendScriptName;
    /**
     * @target web
     */
    private static detectFontDirectory;
    /**
     * @target web
     */
    private static registerJQueryPlugin;
    static renderEngines: Map<string, RenderEngineFactory>;
    static layoutEngines: Map<LayoutMode, LayoutEngineFactory>;
    static staveProfiles: Map<StaveProfile, BarRendererFactory[]>;
    static getRenderEngineFactory(engine: string): RenderEngineFactory;
    static getLayoutEngineFactory(layoutMode: LayoutMode): LayoutEngineFactory;
    /**
     * Gets all default ScoreImporters
     * @returns
     */
    static buildImporters(): ScoreImporter[];
    private static createDefaultRenderEngines;
    /**
     * Enables the usage of alphaSkia as rendering backend.
     * @param musicFontData The raw binary data of the music font.
     * @param alphaSkia The alphaSkia module.
     */
    static enableAlphaSkia(musicFontData: ArrayBuffer, alphaSkia: unknown): void;
    /**
     * Registers a new custom font for the usage in the alphaSkia rendering backend using
     * provided font information.
     * @param fontData The raw binary data of the font.
     * @param fontInfo If provided the font info provided overrules
     * @returns The font info under which the font was registered.
     */
    static registerAlphaSkiaCustomFont(fontData: Uint8Array, fontInfo?: Font | undefined): Font;
    /**
     * @target web
     * @partial
     */
    private static createPlatformSpecificRenderEngines;
    private static createDefaultStaveProfiles;
    private static createDefaultLayoutEngines;
    /**
     * @target web
     */
    static initializeMain(createWebWorker: (settings: Settings) => Worker, createAudioWorklet: (context: AudioContext, settings: Settings) => Promise<void>): void;
    /**
     * @target web
     */
    static get alphaTabWorker(): any;
    /**
     * @target web
     */
    static initializeWorker(): void;
    /**
     * @target web
     */
    static initializeAudioWorklet(): void;
    /**
     * @target web
     */
    private static detectWebPack;
    /**
     * @target web
     */
    private static detectVite;
    /**
     * @target web
     */
    private static detectWebPlatform;
}

/**
 * Represents a beat and when it is actually played according to the generated audio.
 */
declare class BeatTickLookupItem {
    /**
     * Gets the beat represented by this item.
     */
    readonly beat: Beat;
    /**
     * Gets the playback start of the beat according to the generated audio.
     */
    readonly playbackStart: number;
    constructor(beat: Beat, playbackStart: number);
}
/**
 * Represents the time period, for which one or multiple {@link Beat}s are played
 */
declare class BeatTickLookup {
    private _highlightedBeats;
    /**
     * Gets or sets the start time in midi ticks at which the given beat is played.
     */
    start: number;
    /**
     * Gets or sets the end time in midi ticks at which the given beat is played.
     */
    end: number;
    /**
     * Gets or sets a list of all beats that should be highlighted when
     * the beat of this lookup starts playing. This might not mean
     * the beats start at this position.
     */
    highlightedBeats: BeatTickLookupItem[];
    /**
     * Gets the next BeatTickLookup which comes after this one and is in the same
     * MasterBarTickLookup.
     */
    nextBeat: BeatTickLookup | null;
    /**
     * Gets the preivous BeatTickLookup which comes before this one and is in the same
     * MasterBarTickLookup.
     */
    previousBeat: BeatTickLookup | null;
    /**
     * Gets the tick duration of this lookup.
     */
    get duration(): number;
    constructor(start: number, end: number);
    /**
     * Marks the given beat as highlighed as part of this lookup.
     * @param beat The beat to add.
     */
    highlightBeat(beat: Beat, playbackStart: number): void;
    /**
     * Looks for the first visible beat which starts at this lookup so it can be used for cursor placement.
     * @param visibleTracks The visible tracks.
     * @returns The first beat which is visible according to the given tracks or null.
     */
    getVisibleBeatAtStart(visibleTracks: Set<number>): Beat | null;
}

/**
 * Represents the time period, for which all bars of a {@link MasterBar} are played.
 */
declare class MasterBarTickLookup {
    /**
     * Gets or sets the start time in midi ticks at which the MasterBar is played.
     */
    start: number;
    /**
     * Gets or sets the end time in midi ticks at which the MasterBar is played.
     */
    end: number;
    /**
     * Gets or sets the current tempo when the MasterBar is played.
     */
    tempo: number;
    /**
     * Gets or sets the MasterBar which is played.
     */
    masterBar: MasterBar;
    firstBeat: BeatTickLookup | null;
    lastBeat: BeatTickLookup | null;
    /**
     * Inserts `newNextBeat` after `currentBeat` in the linked list of items and updates.
     * the `firstBeat` and `lastBeat` respectively too.
     * @param currentBeat The item in which to insert the new item afterwards
     * @param newBeat The new item to insert
     */
    private insertAfter;
    /**
       * Inserts `newNextBeat` before `currentBeat` in the linked list of items and updates.
       * the `firstBeat` and `lastBeat` respectively too.
       * @param currentBeat The item in which to insert the new item afterwards
       * @param newBeat The new item to insert
       */
    private insertBefore;
    /**
     * Gets or sets the {@link MasterBarTickLookup} of the next masterbar in the {@link Score}
     */
    nextMasterBar: MasterBarTickLookup | null;
    /**
     * Gets or sets the {@link MasterBarTickLookup} of the previous masterbar in the {@link Score}
     */
    previousMasterBar: MasterBarTickLookup | null;
    /**
     * Adds a new beat to this masterbar following the slicing logic required by the MidiTickLookup.
     * @param beat The beat to add to this masterbat
     * @param beatPlaybackStart The original start of this beat. This time is relevant for highlighting.
     * @param sliceStart The slice start to which this beat should be added. This time is relevant for creating new slices.
     * @param sliceDuration The slice duration to which this beat should be added. This time is relevant for creating new slices.
     * @returns The first item of the chain which was affected.
     */
    addBeat(beat: Beat, beatPlaybackStart: number, sliceStart: number, sliceDuration: number): void;
}

/**
 * Represents the results of searching the currently played beat.
 * @see MidiTickLookup.FindBeat
 */
declare class MidiTickLookupFindBeatResult {
    /**
     * Gets or sets the beat that is currently played and used for the start
     * position of the cursor animation.
     */
    beat: Beat;
    /**
     * Gets or sets the parent MasterBarTickLookup to which this beat lookup belongs to.
     */
    masterBar: MasterBarTickLookup;
    /**
     * Gets or sets the related beat tick lookup.
     */
    beatLookup: BeatTickLookup;
    /**
     * Gets or sets the beat that will be played next.
     */
    nextBeat: MidiTickLookupFindBeatResult | null;
    /**
     * Gets or sets the duration in midi ticks how long this lookup is valid.
     */
    tickDuration: number;
    /**
     * Gets or sets the duration in milliseconds how long this lookup is valid.
     */
    duration: number;
    get start(): number;
    get end(): number;
    constructor(masterBar: MasterBarTickLookup);
}
/**
 * This class holds all information about when {@link MasterBar}s and {@link Beat}s are played.
 *
 * On top level it is organized into {@link MasterBarTickLookup} objects indicating the
 * master bar start and end times. This information is used to highlight the currently played bars
 * and it gives access to the played beats in this masterbar and their times.
 *
 * The {@link BeatTickLookup} are then the slices into which the masterbar is separated by the voices and beats
 * of all tracks. An example how things are organized:
 *
 * Time (eighths):  | 01 | 02 | 03 | 04 | 05 | 06 | 07 | 08 | 09 | 10 | 11 | 12 | 13 | 14 | 15 | 16 |
 *
 * Track 1:         |        B1         |        B2         |    B3   |    B4   |    B5   |    B6   |
 * Track 2:         |                  B7                   |         B7        | B9 | B10| B11| B12|
 * Track 3:         |                                      B13                                      |
 *
 * Lookup:          |        L1         |        L2         |    L3    |   L4   | L5 | L6 | L7 | L8 |
 * Active Beats:
 * - L1             B1,B7,B13
 * - L2                                 B2,B7,B13
 * - L3                                                      B3,B7,B13
 * - L4                                                                 B4,B7,B13
 * - L5                                                                          B5,B9,B13
 * - L6                                                                               B5,B10,B13
 * - L7                                                                                    B6,B11,B13
 * - L8                                                                                         B6,B12,B13
 *
 * Then during playback we build out of this list {@link MidiTickLookupFindBeatResult} objects which are sepcific
 * to the visible tracks displayed. This is required because if only Track 2 is displayed we cannot use the the
 * Lookup L1 alone to determine the start and end of the beat cursor. In this case we will derive a
 * MidiTickLookupFindBeatResult which holds for Time 01 the lookup L1 as start and L3 as end. This will be used
 * both for the cursor and beat highlighting.
 */
declare class MidiTickLookup {
    private _currentMasterBar;
    /**
     * Gets a dictionary of all master bars played. The index is the index equals to {@link MasterBar.index}.
     * This lookup only contains the first time a MasterBar is played. For a whole sequence of the song refer to {@link MasterBars}.
     * @internal
     */
    readonly masterBarLookup: Map<number, MasterBarTickLookup>;
    /**
     * Gets a list of all {@link MasterBarTickLookup} sorted by time.
     * @internal
     */
    readonly masterBars: MasterBarTickLookup[];
    /**
     * Finds the currently played beat given a list of tracks and the current time.
     * @param trackLookup The tracks indices in which to search the played beat for.
     * @param tick The current time in midi ticks.
     * @returns The information about the current beat or null if no beat could be found.
     */
    findBeat(trackLookup: Set<number>, tick: number, currentBeatHint?: MidiTickLookupFindBeatResult | null): MidiTickLookupFindBeatResult | null;
    private findBeatFast;
    private fillNextBeat;
    private findBeatSlow;
    /**
     * Finds the beat at a given tick position within the known master bar.
     * @param masterBar
     * @param currentStartLookup
     * @param tick
     * @param visibleTracks
     * @param fillNext
     * @returns
     */
    private findBeatInMasterBar;
    private createResult;
    private findMasterBar;
    /**
     * Gets the {@link MasterBarTickLookup} for a given masterbar at which the masterbar is played the first time.
     * @param bar The masterbar to find the time period for.
     * @returns A {@link MasterBarTickLookup} containing the details about the first time the {@link MasterBar} is played.
     */
    getMasterBar(bar: MasterBar): MasterBarTickLookup;
    /**
     * Gets the start time in midi ticks for a given masterbar at which the masterbar is played the first time.
     * @param bar The masterbar to find the time period for.
     * @returns The time in midi ticks at which the masterbar is played the first time or 0 if the masterbar is not contained
     */
    getMasterBarStart(bar: MasterBar): number;
    /**
     * Gets the start time in midi ticks for a given beat at which the masterbar is played the first time.
     * @param beat The beat to find the time period for.
     * @returns The time in midi ticks at which the beat is played the first time or 0 if the beat is not contained
     */
    getBeatStart(beat: Beat): number;
    /**
     * Adds a new {@link MasterBarTickLookup} to the lookup table.
     * @param masterBar The item to add.
     */
    addMasterBar(masterBar: MasterBarTickLookup): void;
    addBeat(beat: Beat, start: number, duration: number): void;
}

/**
 * Represents a range of the song that should be played.
 */
declare class PlaybackRange {
    /**
     * The position in midi ticks from where the song should start.
     */
    startTick: number;
    /**
     * The position in midi ticks to where the song should be played.
     */
    endTick: number;
}

/**
 * Lists the different states of the player
 */
declare enum PlayerState {
    /**
     * Player is paused
     */
    Paused = 0,
    /**
     * Player is playing
     */
    Playing = 1
}

/**
 * Represents the info when the player state changes.
 */
declare class PlayerStateChangedEventArgs {
    /**
     * The new state of the player.
     */
    readonly state: PlayerState;
    /**
     * Gets a value indicating whether the playback was stopped or only paused.
     * @returns true if the playback was stopped, false if the playback was started or paused
     */
    readonly stopped: boolean;
    /**
     * Initializes a new instance of the {@link PlayerStateChangedEventArgs} class.
     * @param state The state.
     */
    constructor(state: PlayerState, stopped: boolean);
}

/**
 * Represents the info when the playback range changed.
 */
declare class PlaybackRangeChangedEventArgs {
    /**
     * The new playback range.
     */
    readonly playbackRange: PlaybackRange | null;
    /**
     * Initializes a new instance of the {@link PlaybackRangeChangedEventArgs} class.
     * @param range The range.
     */
    constructor(playbackRange: PlaybackRange | null);
}

/**
 * Represents the info when the time in the synthesizer changes.
 */
declare class PositionChangedEventArgs {
    /**
     * Gets a value indicating whether the position changed because of time seeking.
     */
    isSeek: boolean;
    /**
     * Gets the current time in milliseconds.
     */
    readonly currentTime: number;
    /**
     * Gets the length of the played song in milliseconds.
     */
    readonly endTime: number;
    /**
     * Gets the current time in midi ticks.
     */
    readonly currentTick: number;
    /**
     * Gets the length of the played song in midi ticks.
     */
    readonly endTick: number;
    /**
     * Initializes a new instance of the {@link PositionChangedEventArgs} class.
     * @param currentTime The current time.
     * @param endTime The end time.
     * @param currentTick The current tick.
     * @param endTick The end tick.
     * @param isSeek Whether the time was seeked.
     */
    constructor(currentTime: number, endTime: number, currentTick: number, endTick: number, isSeek: boolean);
}

/**
 * Represents the info when the synthesizer played certain midi events.
 */
declare class MidiEventsPlayedEventArgs {
    /**
     * Gets the events which were played.
     */
    readonly events: MidiEvent[];
    /**
     * Initializes a new instance of the {@link MidiEventsPlayedEventArgs} class.
     * @param events The events which were played.
     */
    constructor(events: MidiEvent[]);
}

/**
 * The public API interface for interacting with the synthesizer.
 */
interface IAlphaSynth {
    /**
     * Gets or sets whether the synthesizer is ready for interaction. (output and worker are initialized)
     */
    readonly isReady: boolean;
    /**
     * Gets or sets whether the synthesizer is ready for playback. (output, worker are initialized, soundfont and midi are loaded)
     */
    readonly isReadyForPlayback: boolean;
    /**
     * Gets the current player state.
     */
    readonly state: PlayerState;
    /**
     * Gets or sets the loging level.
     */
    logLevel: LogLevel;
    /**
     * Gets or sets the current master volume as percentage. (range: 0.0-3.0, default 1.0)
     */
    masterVolume: number;
    /**
     * Gets or sets the metronome volume. (range: 0.0-3.0, default 0.0)
     */
    metronomeVolume: number;
    /**
     * Gets or sets the current playback speed as percentage. (range: 0.125-8.0, default: 1.0)
     */
    playbackSpeed: number;
    /**
     * Gets or sets the position within the song in midi ticks.
     */
    tickPosition: number;
    /**
     * Gets or sets the position within the song in milliseconds.
     */
    timePosition: number;
    /**
     * Gets or sets the range of the song that should be played. Set this to null
     * to play the whole song.
     */
    playbackRange: PlaybackRange | null;
    /**
     * Gets or sets whether the playback should automatically restart after it finished.
     */
    isLooping: boolean;
    /**
     * Gets or sets volume of the metronome during count-in. (range: 0.0-3.0, default 0.0 - no count in)
     */
    countInVolume: number;
    /**
     * Gets or sets the midi events which will trigger the `midiEventsPlayed` event.
     */
    midiEventsPlayedFilter: MidiEventType[];
    /**
     * Destroys the synthesizer and all related components
     */
    destroy(): void;
    /**
     * Starts the playback if possible
     * @returns true if the playback was started, otherwise false. Reasons for not starting can be that the player is not ready or already playing.
     */
    play(): boolean;
    /**
     * Pauses the playback if was running
     */
    pause(): void;
    /**
     * Starts the playback if possible, pauses the playback if was running
     */
    playPause(): void;
    /**
     * Stopps the playback
     */
    stop(): void;
    /**
     * Stops any ongoing playback and plays the given midi file instead.
     * @param midi The midi file to play
     */
    playOneTimeMidiFile(midi: MidiFile): void;
    /**
     * Loads a soundfont from the given data
     * @param data a byte array to load the data from
     * @param append Whether to fully replace or append the data from the given soundfont.
     */
    loadSoundFont(data: Uint8Array, append: boolean): void;
    /**
     * Resets all loaded soundfonts as if they were not loaded.
     */
    resetSoundFonts(): void;
    /**
     * Loads the given midi file structure.
     * @param midi
     */
    loadMidiFile(midi: MidiFile): void;
    /**
     * Applies the given transposition pitches to be used during playback.
     * @param transpositionPitches a map defining the transposition pitches for midi channel.
     */
    applyTranspositionPitches(transpositionPitches: Map<number, number>): void;
    /**
     * Sets the mute state of a channel.
     * @param channel The channel number
     * @param mute true if the channel should be muted, otherwise false.
     */
    setChannelMute(channel: number, mute: boolean): void;
    /**
     * Resets the mute/solo state of all channels
     */
    resetChannelStates(): void;
    /**
     * Gets the solo state of a channel.
     * @param channel The channel number
     * @param solo true if the channel should be played solo, otherwise false.
     */
    setChannelSolo(channel: number, solo: boolean): void;
    /**
     * Gets or sets the current and initial volume of the given channel.
     * @param channel The channel number.
     * @param volume The volume of of the channel (0.0-1.0)
     */
    setChannelVolume(channel: number, volume: number): void;
    /**
     * This event is fired when the player is ready to be interacted with.
     */
    readonly ready: IEventEmitter;
    /**
     * This event is fired when all required data for playback is loaded and ready.
     */
    readonly readyForPlayback: IEventEmitter;
    /**
     * This event is fired when the playback of the whole song finished.
     */
    readonly finished: IEventEmitter;
    /**
     * This event is fired when the SoundFont needed for playback was loaded.
     */
    readonly soundFontLoaded: IEventEmitter;
    /**
     * This event is fired when the loading of the SoundFont failed.
     */
    readonly soundFontLoadFailed: IEventEmitterOfT<Error>;
    /**
     * This event is fired when the Midi file needed for playback was loaded.
     */
    readonly midiLoaded: IEventEmitterOfT<PositionChangedEventArgs>;
    /**
     * This event is fired when the loading of the Midi file failed.
     */
    readonly midiLoadFailed: IEventEmitterOfT<Error>;
    /**
     * This event is fired when the playback state changed.
     */
    readonly stateChanged: IEventEmitterOfT<PlayerStateChangedEventArgs>;
    /**
     * This event is fired when the current playback position of/ the song changed.
     */
    readonly positionChanged: IEventEmitterOfT<PositionChangedEventArgs>;
    /**
     * The event is fired when certain midi events were sent to the audio output device for playback.
     */
    readonly midiEventsPlayed: IEventEmitterOfT<MidiEventsPlayedEventArgs>;
    /**
     * The event is fired when the playback range within the player was updated.
     */
    readonly playbackRangeChanged: IEventEmitterOfT<PlaybackRangeChangedEventArgs>;
}

/**
 * This interface represents the information about a mouse event that occured on the UI.
 */
interface IMouseEventArgs {
    /**
     * Gets a value indicating whether the left mouse button was pressed.
     */
    readonly isLeftMouseButton: boolean;
    /**
     * Gets the X-position of the cursor at the time of the event relative to the given UI container.
     * @param relativeTo The UI element to which the relative position should be calculated.
     * @returns The relative X-position of the cursor to the given UI container at the time the event occured.
     */
    getX(relativeTo: IContainer): number;
    /**
     * Gets the Y-position of the cursor at the time of the event relative to the given UI container.
     * @param relativeTo The UI element to which the relative position should be calculated.
     * @returns The relative Y-position of the cursor to the given UI container at the time the event occured.
     */
    getY(relativeTo: IContainer): number;
    /**
     * If called, the original mouse action is prevented and the event is flagged as handled.
     */
    preventDefault(): void;
}

/**
 * This interface represents a container control in the UI layer.
 */
interface IContainer {
    /**
     * Gets or sets the width of the control.
     */
    width: number;
    /**
     * Gets or sets the height of the control.
     */
    height: number;
    /**
     * Gets a value indicating whether the control is visible.
     */
    readonly isVisible: boolean;
    /**
     * Gets or sets the horizontal scroll offset of this control if it is scrollable.
     */
    scrollLeft: number;
    /**
     * Gets or sets the vertical scroll offset of this control if it is scrollable.
     */
    scrollTop: number;
    /**
     * Adds the given child control to this container.
     * @param child The child control to add.
     */
    appendChild(child: IContainer): void;
    /**
     * Stops the animations of this control immediately.
     */
    stopAnimation(): void;
    /**
     * Sets the position and size of the container for efficient repositioning.
     * @param x The X-position
     * @param y The Y-position
     * @param w The width
     * @param h The height
     */
    setBounds(x: number, y: number, w: number, h: number): void;
    /**
     * Tells the control to move to the given X-position in the given time.
     * @param duration The milliseconds that should be needed to reach the new X-position
     * @param x The new X-position
     */
    transitionToX(duration: number, x: number): void;
    /**
     * Clears the container and removes all child items.
     */
    clear(): void;
    /**
     * This event occurs when the control was resized.
     */
    resize: IEventEmitter;
    /**
     * This event occurs when a mouse/finger press happened on the control.
     */
    mouseDown: IEventEmitterOfT<IMouseEventArgs>;
    /**
     * This event occurs when a mouse/finger moves on top of the control.
     */
    mouseMove: IEventEmitterOfT<IMouseEventArgs>;
    /**
     * This event occurs when a mouse/finger is released from the control.
     */
    mouseUp: IEventEmitterOfT<IMouseEventArgs>;
}

/**
 * This wrapper holds all cursor related elements.
 */
declare class Cursors {
    /**
     * Gets the element that spans across the whole music sheet and holds the other cursor elements.
     */
    readonly cursorWrapper: IContainer;
    /**
     * Gets the element that is positioned above the bar that is currently played.
     */
    readonly barCursor: IContainer;
    /**
     * Gets the element that is positioned above the beat that is currently played.
     */
    readonly beatCursor: IContainer;
    /**
     * Gets the element that spans across the whole music sheet and will hold any selection related elements.
     */
    readonly selectionWrapper: IContainer;
    /**
     * Initializes a new instance of the {@link Cursors} class.
     * @param cursorWrapper
     * @param barCursor
     * @param beatCursor
     * @param selectionWrapper
     */
    constructor(cursorWrapper: IContainer, barCursor: IContainer, beatCursor: IContainer, selectionWrapper: IContainer);
}

/**
 * This interface represents the UI abstraction between alphaTab and the corresponding UI framework being used.
 * @param <TSettings> The type of that holds the settings passed from the UI layer.
 */
interface IUiFacade<TSettings> {
    /**
     * Gets the root UI element that holds the whole alphaTab control.
     */
    readonly rootContainer: IContainer;
    /**
     * Gets a value indicating whether the UI framework supports worker based rendering.
     */
    readonly areWorkersSupported: boolean;
    /**
     * Gets or sets whether the UI is ready to render the music notation. On some platforms where pre-loading of assets is done asynchronously,
     * rendering might need to be deferred.
     */
    readonly canRender: boolean;
    /**
     * Gets the resize throttling in milliseconds. Then the music sheet is resized, the re-rendering is deferred until this timeout is reached.
     */
    readonly resizeThrottle: number;
    /**
     * Initializes the UI using the given alphaTab API and settings object.
     * @param api The alphaTab API wrapper responsible for UI interaction.
     * @param settings The settings object holding the settings from the UI layer.
     */
    initialize(api: AlphaTabApiBase<TSettings>, settings: TSettings): void;
    /**
     * Tells the UI layer to destroy the alphaTab controls and restore the initial state.
     */
    destroy(): void;
    /**
     * Creates the canvas element that wraps all individually rendered partials.
     * @returns The canvas element that wraps all individually rendered partials.
     */
    createCanvasElement(): IContainer;
    /**
     * Tells the UI layer to trigger an event with the given name and details.
     * @param container The element on which the event should be triggered.
     * @param eventName The event that should be triggered.
     * @param details The object holding the details about the event.
     * @param originalEvent The original event related to this custom event.
     */
    triggerEvent(container: IContainer, eventName: string, details: unknown, originalEvent?: IMouseEventArgs): void;
    /**
     * Tells the UI layer to do the initial rendering.
     */
    initialRender(): void;
    /**
     * Tells the UI layer to append the given render results to the UI. At this point
     * the partial result is not actually rendered yet, only the layouting process
     * completed.
     * @param renderResults The rendered partial that should be added to the UI. null indicates the rendering finished.
     */
    beginAppendRenderResults(renderResults: RenderFinishedEventArgs | null): void;
    /**
     * Tells the UI layer to update the given render results within the UI.
     * @param renderResults The rendered partial that should be updated within the UI.
     */
    beginUpdateRenderResults(renderResults: RenderFinishedEventArgs): void;
    /**
     * Tells the UI layer to create the worker renderer. This method is the UI layer supports worker rendering and worker rendering is not disabled via setting.
     * @returns
     */
    createWorkerRenderer(): IScoreRenderer;
    /**
     * Tells the UI layer to create a player worker.
     * @returns
     */
    createWorkerPlayer(): IAlphaSynth | null;
    /**
     * Creates the cursor objects that are used to highlight the currently played beats and bars.
     * @returns
     */
    createCursors(): Cursors | null;
    /**
     * Destroys the cursor objects that are used to highlight the currently played beats and bars.
     */
    destroyCursors(): void;
    /**
     * Tells the UI layer to invoke the given action.
     * @param action
     */
    beginInvoke(action: () => void): void;
    /**
     * Tells the UI layer to remove all highlights from highlighted music notation elements.
     */
    removeHighlights(): void;
    /**
     * Tells the UI layer to highlight the music notation elements with the given ID.
     * @param groupId The group id that identifies the elements to be highlighted.
     * @param masterBarIndex The index of the related masterbar of the highlighted group.
     */
    highlightElements(groupId: string, masterBarIndex: number): void;
    /**
     * Creates a new UI element that is used to display the selection rectangle.
     * @returns
     */
    createSelectionElement(): IContainer | null;
    /**
     * Gets the UI element that is used for scrolling during playback.
     * @returns
     */
    getScrollContainer(): IContainer;
    /**
     * Calculates the relative offset of a container to the scroll element.
     * @param scrollElement The parent scroll element to which the relative position is computed.
     * @param container The container element for which the relative position is calculated.
     * @returns
     */
    getOffset(scrollElement: IContainer | null, container: IContainer): Bounds;
    /**
     * Initiates a vertical scroll on the given element.
     * @param scrollElement The element on which the scrolling should happen.
     * @param offset The absolute scroll offset to which scrolling should happen.
     * @param speed How fast the scrolling from the current offset to the given one should happen in milliseconds.
     */
    scrollToY(scrollElement: IContainer, offset: number, speed: number): void;
    /**
     * Initiates a horizontal scroll on the given element.
     * @param scrollElement The element on which the scrolling should happen.
     * @param offset The absolute scroll offset to which scrolling should happen.
     * @param speed How fast the scrolling from the current offset to the given one should happen in milliseconds.
     */
    scrollToX(scrollElement: IContainer, offset: number, speed: number): void;
    /**
     * Attempts a load of the score represented by the given data object.
     * @param data The data object to decode
     * @param success The action to call if the score was loaded
     * @param error The action to call if any error during loading ocurred.
     * @returns true if the data object is supported and a load was initiated, otherwise false
     */
    load(data: unknown, success: (score: Score) => void, error: (error: Error) => void): boolean;
    /**
     * Attempts a load of the score represented by the given data object.
     * @param data The data object to decode
     * @param append Whether to fully replace or append the data from the given soundfont.
     * @returns true if the data object is supported and a load was initiated, otherwise false
     */
    loadSoundFont(data: unknown, append: boolean): boolean;
    /**
     * This events is fired when the {@link canRender} property changes.
     */
    readonly canRenderChanged: IEventEmitter;
    /**
     * This event is fired when {@link rootContainer} became visible when it was invisible at the time rendering was initiated.
     */
    readonly rootContainerBecameVisible: IEventEmitter;
}

/**
 * Represents the information related to the beats actively being played now.
 */
declare class ActiveBeatsChangedEventArgs {
    /**
     * The currently active beats across all tracks and voices.
     */
    activeBeats: Beat[];
    constructor(activeBeats: Beat[]);
}

/**
 * This class represents the public API of alphaTab and provides all logic to display
 * a music sheet in any UI using the given {@link IUiFacade}
 * @param <TSettings> The UI object holding the settings.
 * @csharp_public
 */
declare class AlphaTabApiBase<TSettings> {
    private _startTime;
    private _trackIndexes;
    private _trackIndexLookup;
    private _isDestroyed;
    /**
     * Gets the UI facade to use for interacting with the user interface.
     */
    readonly uiFacade: IUiFacade<TSettings>;
    /**
     * Gets the UI container that holds the whole alphaTab control.
     */
    readonly container: IContainer;
    /**
     * Gets the score renderer used for rendering the music sheet. This is the low-level API responsible for the actual rendering chain.
     */
    readonly renderer: IScoreRenderer;
    /**
     * Gets the score holding all information about the song being rendered.
     */
    score: Score | null;
    /**
     * Gets the settings that are used for rendering the music notation.
     */
    settings: Settings;
    /**
     * Gets a list of the tracks that are currently rendered;
     */
    tracks: Track[];
    /**
     * Gets the UI container that will hold all rendered results.
     */
    readonly canvasElement: IContainer;
    /**
     * Initializes a new instance of the {@link AlphaTabApiBase} class.
     * @param uiFacade The UI facade to use for interacting with the user interface.
     * @param settings The UI settings object to use for loading the settings.
     */
    constructor(uiFacade: IUiFacade<TSettings>, settings: TSettings);
    /**
     * Destroys the alphaTab control and restores the initial state of the UI.
     */
    destroy(): void;
    /**
     * Applies any changes that were done to the settings object and informs the {@link renderer} about any new values to consider.
     */
    updateSettings(): void;
    /**
     * Attempts a load of the score represented by the given data object.
     * @param scoreData The data container supported by {@link IUiFacade}
     * @param trackIndexes The indexes of the tracks from the song that should be rendered. If not provided, the first track of the
     * song will be shown.
     * @returns true if the data object is supported and a load was initiated, otherwise false
     */
    load(scoreData: unknown, trackIndexes?: number[]): boolean;
    /**
     * Initiates a rendering of the given score.
     * @param score The score containing the tracks to be rendered.
     * @param trackIndexes The indexes of the tracks from the song that should be rendered. If not provided, the first track of the
     * song will be shown.
     */
    renderScore(score: Score, trackIndexes?: number[]): void;
    /**
     * Renders the given list of tracks.
     * @param tracks The tracks to render. They must all belong to the same score.
     */
    renderTracks(tracks: Track[]): void;
    private internalRenderTracks;
    /**
     * @internal
     */
    private triggerResize;
    private appendRenderResult;
    private updateRenderResult;
    /**
     * Tells alphaTab to render the given alphaTex.
     * @param tex The alphaTex code to render.
     * @param tracks If set, the given tracks will be rendered, otherwise the first track only will be rendered.
     */
    tex(tex: string, tracks?: number[]): void;
    /**
     * Attempts a load of the score represented by the given data object.
     * @param data The data object to decode
     * @param append Whether to fully replace or append the data from the given soundfont.
     * @returns true if the data object is supported and a load was initiated, otherwise false
     */
    loadSoundFont(data: unknown, append?: boolean): boolean;
    /**
     * Resets all loaded soundfonts as if they were not loaded.
     */
    resetSoundFonts(): void;
    /**
     * Initiates a re-rendering of the current setup. If rendering is not yet possible, it will be deferred until the UI changes to be ready for rendering.
     */
    render(): void;
    private _tickCache;
    /**
     * Gets the tick cache related to the current score.
     */
    get tickCache(): MidiTickLookup | null;
    /**
     * Gets the alphaSynth player used for playback. This is the low-level API to the Midi synthesizer used for playback.
     */
    player: IAlphaSynth | null;
    get isReadyForPlayback(): boolean;
    get playerState(): PlayerState;
    get masterVolume(): number;
    set masterVolume(value: number);
    get metronomeVolume(): number;
    set metronomeVolume(value: number);
    get countInVolume(): number;
    set countInVolume(value: number);
    get midiEventsPlayedFilter(): MidiEventType[];
    set midiEventsPlayedFilter(value: MidiEventType[]);
    get tickPosition(): number;
    set tickPosition(value: number);
    get timePosition(): number;
    set timePosition(value: number);
    get playbackRange(): PlaybackRange | null;
    set playbackRange(value: PlaybackRange | null);
    get playbackSpeed(): number;
    set playbackSpeed(value: number);
    get isLooping(): boolean;
    set isLooping(value: boolean);
    private destroyPlayer;
    private setupPlayer;
    private loadMidiForScore;
    /**
     * Changes the volume of the given tracks.
     * @param tracks The tracks for which the volume should be changed.
     * @param volume The volume to set for all tracks in percent (0-1)
     */
    changeTrackVolume(tracks: Track[], volume: number): void;
    /**
     * Changes the given tracks to be played solo or not.
     * If one or more tracks are set to solo, only those tracks are hearable.
     * @param tracks The list of tracks to play solo or not.
     * @param solo If set to true, the tracks will be added to the solo list. If false, they are removed.
     */
    changeTrackSolo(tracks: Track[], solo: boolean): void;
    /**
     * Changes the given tracks to be muted or not.
     * @param tracks The list of track to mute or unmute.
     * @param mute If set to true, the tracks will be muted. If false they are unmuted.
     */
    changeTrackMute(tracks: Track[], mute: boolean): void;
    /**
     * Starts the playback of the current song.
     * @returns true if the playback was started, otherwise false. Reasons for not starting can be that the player is not ready or already playing.
     */
    play(): boolean;
    /**
     * Pauses the playback of the current song.
     */
    pause(): void;
    /**
     * Toggles between play/pause depending on the current player state.
     */
    playPause(): void;
    /**
     * Stops the playback of the current song, and moves the playback position back to the start.
     */
    stop(): void;
    /**
     * Triggers the play of the given beat. This will stop the any other current ongoing playback.
     * @param beat the single beat to play
     */
    playBeat(beat: Beat): void;
    /**
     * Triggers the play of the given note. This will stop the any other current ongoing playback.
     * @param beat the single note to play
     */
    playNote(note: Note): void;
    private _cursorWrapper;
    private _barCursor;
    private _beatCursor;
    private _selectionWrapper;
    private _previousTick;
    private _playerState;
    private _currentBeat;
    private _currentBarBounds;
    private _previousStateForCursor;
    private _previousCursorCache;
    private _lastScroll;
    private destroyCursors;
    private updateCursors;
    private setupPlayerEvents;
    /**
     * updates the cursors to highlight the beat at the specified tick position
     * @param tick
     * @param stop
     * @param shouldScroll whether we should scroll to the bar (if scrolling is active)
     */
    private cursorUpdateTick;
    /**
     * updates the cursors to highlight the specified beat
     */
    private cursorUpdateBeat;
    /**
     * Initiates a scroll to the cursor
     */
    scrollToCursor(): void;
    internalScrollToCursor(barBoundings: MasterBarBounds): void;
    private internalCursorUpdateBeat;
    playedBeatChanged: IEventEmitterOfT<Beat>;
    private onPlayedBeatChanged;
    activeBeatsChanged: IEventEmitterOfT<ActiveBeatsChangedEventArgs>;
    private onActiveBeatsChanged;
    private _beatMouseDown;
    private _noteMouseDown;
    private _selectionStart;
    private _selectionEnd;
    beatMouseDown: IEventEmitterOfT<Beat>;
    beatMouseMove: IEventEmitterOfT<Beat>;
    beatMouseUp: IEventEmitterOfT<Beat | null>;
    noteMouseDown: IEventEmitterOfT<Note>;
    noteMouseMove: IEventEmitterOfT<Note>;
    noteMouseUp: IEventEmitterOfT<Note | null>;
    private onBeatMouseDown;
    private onNoteMouseDown;
    private onBeatMouseMove;
    private onNoteMouseMove;
    private onBeatMouseUp;
    private onNoteMouseUp;
    private updateSelectionCursor;
    private setupClickHandling;
    private cursorSelectRange;
    scoreLoaded: IEventEmitterOfT<Score>;
    private onScoreLoaded;
    resize: IEventEmitterOfT<ResizeEventArgs>;
    private onResize;
    renderStarted: IEventEmitterOfT<boolean>;
    private onRenderStarted;
    renderFinished: IEventEmitterOfT<RenderFinishedEventArgs>;
    private onRenderFinished;
    postRenderFinished: IEventEmitter;
    private onPostRenderFinished;
    error: IEventEmitterOfT<Error>;
    onError(error: Error): void;
    playerReady: IEventEmitter;
    private onPlayerReady;
    playerFinished: IEventEmitter;
    private onPlayerFinished;
    soundFontLoaded: IEventEmitter;
    private onSoundFontLoaded;
    midiLoad: IEventEmitterOfT<MidiFile>;
    private onMidiLoad;
    midiLoaded: IEventEmitterOfT<PositionChangedEventArgs>;
    private onMidiLoaded;
    playerStateChanged: IEventEmitterOfT<PlayerStateChangedEventArgs>;
    private onPlayerStateChanged;
    playerPositionChanged: IEventEmitterOfT<PositionChangedEventArgs>;
    private onPlayerPositionChanged;
    midiEventsPlayed: IEventEmitterOfT<MidiEventsPlayedEventArgs>;
    private onMidiEventsPlayed;
    playbackRangeChanged: IEventEmitterOfT<PlaybackRangeChangedEventArgs>;
    private onPlaybackRangeChanged;
    /**
     * @internal
     */
    settingsUpdated: IEventEmitter;
    private onSettingsUpdated;
}

/**
 * @target web
 */
declare class AlphaTabApi extends AlphaTabApiBase<any | Settings> {
    constructor(element: HTMLElement, options: any | Settings);
    tex(tex: string, tracks?: number[]): void;
    print(width?: string, additionalSettings?: unknown): void;
    downloadMidi(format?: MidiFileFormat): void;
    changeTrackMute(tracks: Track[], mute: boolean): void;
    changeTrackSolo(tracks: Track[], solo: boolean): void;
    changeTrackVolume(tracks: Track[], volume: number): void;
    private trackIndexesToTracks;
    soundFontLoad: IEventEmitterOfT<ProgressEventArgs>;
    loadSoundFontFromUrl(url: string, append: boolean): void;
}

declare class VersionInfo {
    static readonly version: string;
    static readonly date: string;
}

/**
 * The ScoreLoader enables you easy loading of Scores using all
 * available importers
 */
declare class ScoreLoader {
    /**
     * Loads a score asynchronously from the given datasource
     * @param path the source path to load the binary file from
     * @param success this function is called if the Score was successfully loaded from the datasource
     * @param error this function is called if any error during the loading occured.
     * @param settings settings for the score import
     * @target web
     */
    static loadScoreAsync(path: string, success: (score: Score) => void, error: (error: any) => void, settings?: Settings): void;
    /**
     * Loads the score from the given binary data.
     * @param data The binary data containing a score in any known file format.
     * @param settings The settings to use during importing.
     * @returns The loaded score.
     */
    static loadScoreFromBytes(data: Uint8Array, settings?: Settings): Score;
}

/**
 * The exception thrown by a {@link ScoreImporter} in case the
 * binary data does not contain a reader compatible structure.
 */
declare class UnsupportedFormatError extends AlphaTabError {
    inner: Error | null;
    constructor(message?: string | null, inner?: Error | null);
}

type index_d$5_ScoreImporter = ScoreImporter;
declare const index_d$5_ScoreImporter: typeof ScoreImporter;
type index_d$5_ScoreLoader = ScoreLoader;
declare const index_d$5_ScoreLoader: typeof ScoreLoader;
type index_d$5_UnsupportedFormatError = UnsupportedFormatError;
declare const index_d$5_UnsupportedFormatError: typeof UnsupportedFormatError;
declare namespace index_d$5 {
  export { index_d$5_ScoreImporter as ScoreImporter, index_d$5_ScoreLoader as ScoreLoader, index_d$5_UnsupportedFormatError as UnsupportedFormatError };
}

/**
 * This is the base class for creating new song exporters which
 * enable writing scores to a binary datasink.
 */
declare abstract class ScoreExporter {
    protected data: IWriteable;
    protected settings: Settings;
    /**
     * Initializes the importer with the given data and settings.
     */
    init(data: IWriteable, settings: Settings): void;
    /**
     * Exports the given score to a binary buffer.
     * @param score The score to serialize
     * @param settings  The settings to use during serialization
     * @returns A byte buffer with the serialized score.
     */
    export(score: Score, settings?: Settings | null): Uint8Array;
    abstract get name(): string;
    /**
     * Writes the given score into the data sink.
     * @returns The score to write.
     */
    abstract writeScore(score: Score): void;
}

/**
 * This ScoreExporter can write Guitar Pro 7 (gp) files.
 */
declare class Gp7Exporter extends ScoreExporter {
    get name(): string;
    constructor();
    writeScore(score: Score): void;
}

type index_d$4_Gp7Exporter = Gp7Exporter;
declare const index_d$4_Gp7Exporter: typeof Gp7Exporter;
type index_d$4_ScoreExporter = ScoreExporter;
declare const index_d$4_ScoreExporter: typeof ScoreExporter;
declare namespace index_d$4 {
  export { index_d$4_Gp7Exporter as Gp7Exporter, index_d$4_ScoreExporter as ScoreExporter };
}

/**
 * A handler is responsible for writing midi events to a custom structure
 */
interface IMidiFileHandler {
    /**
     * Adds a time signature to the generated midi file
     * @param tick The midi ticks when this event should be happening.
     * @param timeSignatureNumerator The time signature numerator
     * @param timeSignatureDenominator The time signature denominator
     */
    addTimeSignature(tick: number, timeSignatureNumerator: number, timeSignatureDenominator: number): void;
    /**
     * Adds a rest to the generated midi file.
     * @param track The midi track on which the rest should be "played".
     * @param tick The midi ticks when the rest is "playing".
     * @param channel The midi channel on which the rest should be "played".
     */
    addRest(track: number, tick: number, channel: number): void;
    /**
     * Adds a note to the generated midi file
     * @param track The midi track on which the note should be played.
     * @param start The midi ticks when the note should start playing.
     * @param length The duration the note in midi ticks.
     * @param key The key of the note to play
     * @param velocity The velocity which should be applied to the note (derived from the note dynamics).
     * @param channel The midi channel on which the note should be played.
     */
    addNote(track: number, start: number, length: number, key: number, velocity: number, channel: number): void;
    /**
     * Adds a control change to the generated midi file.
     * @param track The midi track on which the controller should change.
     * @param tick The midi ticks when the controller should change.
     * @param channel The midi channel on which the controller should change.
     * @param controller The midi controller that should change.
     * @param value The value to which the midi controller should change
     */
    addControlChange(track: number, tick: number, channel: number, controller: ControllerType, value: number): void;
    /**
     * Add a program change to the generated midi file
     * @param track The midi track on which the program should change.
     * @param tick The midi ticks when the program should change.
     * @param channel The midi channel on which the program should change.
     * @param program The new program for the selected track and channel.
     */
    addProgramChange(track: number, tick: number, channel: number, program: number): void;
    /**
     * Add a tempo change to the generated midi file.
     * @param tick The midi ticks when the tempo should change change.
     * @param tempo The tempo as BPM
     */
    addTempo(tick: number, tempo: number): void;
    /**
     * Add a bend specific to a note to the generated midi file.
     * The note does not need to be started, if this event is signaled, the next time a note
     * on this channel and key is played it will be affected. The note bend is cleared on a note-off for this key.
     * @param track The midi track on which the bend should change.
     * @param tick The midi ticks when the bend should change.
     * @param channel The midi channel on which the bend should change.
     * @param channel The key of the note that should be affected by the bend.
     * @param value The new bend for the selected note.
     */
    addNoteBend(track: number, tick: number, channel: number, key: number, value: number): void;
    /**
     * Add a bend to the generated midi file.
     * @param track The midi track on which the bend should change.
     * @param tick The midi ticks when the bend should change.
     * @param channel The midi channel on which the bend should change.
     * @param value The new bend for the selected track and channel.
     */
    addBend(track: number, tick: number, channel: number, value: number): void;
    /**
     * Indicates that the track is finished on the given ticks.
     * @param track The track that was finished.
     * @param tick The end tick for this track.
     */
    finishTrack(track: number, tick: number): void;
}

/**
 * This generator creates a midi file using a score.
 */
declare class MidiFileGenerator {
    private static readonly DefaultDurationDead;
    private static readonly DefaultDurationPalmMute;
    private readonly _score;
    private _settings;
    private _handler;
    private _currentTempo;
    private _programsPerChannel;
    /**
     * Gets a lookup object which can be used to quickly find beats and bars
     * at a given midi tick position.
     */
    readonly tickLookup: MidiTickLookup;
    /**
     * Gets or sets whether transposition pitches should be applied to the individual midi events or not.
     */
    applyTranspositionPitches: boolean;
    /**
     * Gets the transposition pitches for the individual midi channels.
     */
    readonly transpositionPitches: Map<number, number>;
    /**
     * Initializes a new instance of the {@link MidiFileGenerator} class.
     * @param score The score for which the midi file should be generated.
     * @param settings The settings ot use for generation.
     * @param handler The handler that should be used for generating midi events.
     */
    constructor(score: Score, settings: Settings | null, handler: IMidiFileHandler);
    /**
     * Starts the generation of the midi file.
     */
    generate(): void;
    private generateTrack;
    private addProgramChange;
    static buildTranspositionPitches(score: Score, settings: Settings): Map<number, number>;
    private generateChannel;
    private static toChannelShort;
    private generateMasterBar;
    private generateBar;
    private getPlaybackBar;
    private generateVoice;
    private _currentTripletFeel;
    private generateBeat;
    private static calculateTripletFeelInfo;
    private generateNote;
    private getNoteDuration;
    private applyStaticDuration;
    private static getNoteVelocity;
    private generateFadeIn;
    private generateVibrato;
    vibratoResolution: number;
    private generateVibratorWithParams;
    /**
     * Maximum semitones that are supported in bends in one direction (up or down)
     * GP has 8 full tones on whammys.
     */
    private static readonly PitchBendRangeInSemitones;
    /**
     * The value on how many pitch-values are used for one semitone
     */
    private static readonly PitchValuePerSemitone;
    /**
     * The minimum number of breakpoints generated per semitone bend.
     */
    private static readonly MinBreakpointsPerSemitone;
    /**
     * How long until a new breakpoint is generated for a bend.
     */
    private static readonly MillisecondsPerBreakpoint;
    /**
     * Calculates the midi pitch wheel value for the give bend value.
     */
    static getPitchWheel(bendValue: number): number;
    private generateSlide;
    private generateBend;
    private generateSongBookWhammyOrBend;
    private generateWhammy;
    private generateWhammyOrBend;
    private generateBendValues;
    private generateTrill;
    private generateTremoloPicking;
    private getBrushInfo;
    private generateAutomation;
    prepareSingleBeat(beat: Beat): void;
    generateSingleBeat(beat: Beat): void;
    generateSingleNote(note: Note): void;
}

/**
 * This implementation of the {@link IMidiFileHandler}
 * generates a {@link MidiFile} object which can be used in AlphaSynth for playback.
 */
declare class AlphaSynthMidiFileHandler implements IMidiFileHandler {
    private _midiFile;
    private _smf1Mode;
    /**
     * Initializes a new instance of the {@link AlphaSynthMidiFileHandler} class.
     * @param midiFile The midi file.
     * @param smf1Mode Whether to generate a SMF1 compatible midi file. This might break multi note bends.
     */
    constructor(midiFile: MidiFile, smf1Mode?: boolean);
    addTimeSignature(tick: number, timeSignatureNumerator: number, timeSignatureDenominator: number): void;
    addRest(track: number, tick: number, channel: number): void;
    addNote(track: number, start: number, length: number, key: number, velocity: number, channel: number): void;
    private static fixValue;
    addControlChange(track: number, tick: number, channel: number, controller: ControllerType, value: number): void;
    addProgramChange(track: number, tick: number, channel: number, program: number): void;
    addTempo(tick: number, tempo: number): void;
    addBend(track: number, tick: number, channel: number, value: number): void;
    addNoteBend(track: number, tick: number, channel: number, key: number, value: number): void;
    finishTrack(track: number, tick: number): void;
}

type index_d$3_AlphaSynthMidiFileHandler = AlphaSynthMidiFileHandler;
declare const index_d$3_AlphaSynthMidiFileHandler: typeof AlphaSynthMidiFileHandler;
type index_d$3_AlphaTabMetronomeEvent = AlphaTabMetronomeEvent;
declare const index_d$3_AlphaTabMetronomeEvent: typeof AlphaTabMetronomeEvent;
type index_d$3_AlphaTabRestEvent = AlphaTabRestEvent;
declare const index_d$3_AlphaTabRestEvent: typeof AlphaTabRestEvent;
type index_d$3_BeatTickLookup = BeatTickLookup;
declare const index_d$3_BeatTickLookup: typeof BeatTickLookup;
type index_d$3_ControlChangeEvent = ControlChangeEvent;
declare const index_d$3_ControlChangeEvent: typeof ControlChangeEvent;
type index_d$3_ControllerType = ControllerType;
declare const index_d$3_ControllerType: typeof ControllerType;
type index_d$3_EndOfTrackEvent = EndOfTrackEvent;
declare const index_d$3_EndOfTrackEvent: typeof EndOfTrackEvent;
type index_d$3_MasterBarTickLookup = MasterBarTickLookup;
declare const index_d$3_MasterBarTickLookup: typeof MasterBarTickLookup;
type index_d$3_MidiEvent = MidiEvent;
declare const index_d$3_MidiEvent: typeof MidiEvent;
type index_d$3_MidiEventType = MidiEventType;
declare const index_d$3_MidiEventType: typeof MidiEventType;
type index_d$3_MidiFile = MidiFile;
declare const index_d$3_MidiFile: typeof MidiFile;
type index_d$3_MidiFileFormat = MidiFileFormat;
declare const index_d$3_MidiFileFormat: typeof MidiFileFormat;
type index_d$3_MidiFileGenerator = MidiFileGenerator;
declare const index_d$3_MidiFileGenerator: typeof MidiFileGenerator;
type index_d$3_MidiTickLookup = MidiTickLookup;
declare const index_d$3_MidiTickLookup: typeof MidiTickLookup;
type index_d$3_MidiTickLookupFindBeatResult = MidiTickLookupFindBeatResult;
declare const index_d$3_MidiTickLookupFindBeatResult: typeof MidiTickLookupFindBeatResult;
type index_d$3_NoteBendEvent = NoteBendEvent;
declare const index_d$3_NoteBendEvent: typeof NoteBendEvent;
type index_d$3_NoteEvent = NoteEvent;
declare const index_d$3_NoteEvent: typeof NoteEvent;
type index_d$3_NoteOffEvent = NoteOffEvent;
declare const index_d$3_NoteOffEvent: typeof NoteOffEvent;
type index_d$3_NoteOnEvent = NoteOnEvent;
declare const index_d$3_NoteOnEvent: typeof NoteOnEvent;
type index_d$3_PitchBendEvent = PitchBendEvent;
declare const index_d$3_PitchBendEvent: typeof PitchBendEvent;
type index_d$3_ProgramChangeEvent = ProgramChangeEvent;
declare const index_d$3_ProgramChangeEvent: typeof ProgramChangeEvent;
type index_d$3_TempoChangeEvent = TempoChangeEvent;
declare const index_d$3_TempoChangeEvent: typeof TempoChangeEvent;
type index_d$3_TimeSignatureEvent = TimeSignatureEvent;
declare const index_d$3_TimeSignatureEvent: typeof TimeSignatureEvent;
declare namespace index_d$3 {
  export { index_d$3_AlphaSynthMidiFileHandler as AlphaSynthMidiFileHandler, index_d$3_AlphaTabMetronomeEvent as AlphaTabMetronomeEvent, index_d$3_AlphaTabRestEvent as AlphaTabRestEvent, index_d$3_BeatTickLookup as BeatTickLookup, index_d$3_ControlChangeEvent as ControlChangeEvent, index_d$3_ControllerType as ControllerType, index_d$3_EndOfTrackEvent as EndOfTrackEvent, index_d$3_MasterBarTickLookup as MasterBarTickLookup, index_d$3_MidiEvent as MidiEvent, index_d$3_MidiEventType as MidiEventType, index_d$3_MidiFile as MidiFile, index_d$3_MidiFileFormat as MidiFileFormat, index_d$3_MidiFileGenerator as MidiFileGenerator, index_d$3_MidiTickLookup as MidiTickLookup, index_d$3_MidiTickLookupFindBeatResult as MidiTickLookupFindBeatResult, index_d$3_NoteBendEvent as NoteBendEvent, index_d$3_NoteEvent as NoteEvent, index_d$3_NoteOffEvent as NoteOffEvent, index_d$3_NoteOnEvent as NoteOnEvent, index_d$3_PitchBendEvent as PitchBendEvent, index_d$3_ProgramChangeEvent as ProgramChangeEvent, index_d$3_TempoChangeEvent as TempoChangeEvent, index_d$3_TimeSignatureEvent as TimeSignatureEvent };
}

type index_d$2_BarBounds = BarBounds;
declare const index_d$2_BarBounds: typeof BarBounds;
type index_d$2_BeatBounds = BeatBounds;
declare const index_d$2_BeatBounds: typeof BeatBounds;
type index_d$2_Bounds = Bounds;
declare const index_d$2_Bounds: typeof Bounds;
type index_d$2_BoundsLookup = BoundsLookup;
declare const index_d$2_BoundsLookup: typeof BoundsLookup;
type index_d$2_IScoreRenderer = IScoreRenderer;
type index_d$2_MasterBarBounds = MasterBarBounds;
declare const index_d$2_MasterBarBounds: typeof MasterBarBounds;
type index_d$2_NoteBounds = NoteBounds;
declare const index_d$2_NoteBounds: typeof NoteBounds;
type index_d$2_RenderFinishedEventArgs = RenderFinishedEventArgs;
declare const index_d$2_RenderFinishedEventArgs: typeof RenderFinishedEventArgs;
type index_d$2_ScoreRenderer = ScoreRenderer;
declare const index_d$2_ScoreRenderer: typeof ScoreRenderer;
type index_d$2_StaveGroupBounds = StaveGroupBounds;
declare const index_d$2_StaveGroupBounds: typeof StaveGroupBounds;
declare namespace index_d$2 {
  export { index_d$2_BarBounds as BarBounds, index_d$2_BeatBounds as BeatBounds, index_d$2_Bounds as Bounds, index_d$2_BoundsLookup as BoundsLookup, type index_d$2_IScoreRenderer as IScoreRenderer, index_d$2_MasterBarBounds as MasterBarBounds, index_d$2_NoteBounds as NoteBounds, index_d$2_RenderFinishedEventArgs as RenderFinishedEventArgs, index_d$2_ScoreRenderer as ScoreRenderer, index_d$2_StaveGroupBounds as StaveGroupBounds };
}

/**
 * A canvas implementation storing SVG data
 */
declare abstract class SvgCanvas implements ICanvas {
    protected buffer: string;
    private _currentPath;
    private _currentPathIsEmpty;
    color: Color;
    lineWidth: number;
    font: Font;
    textAlign: TextAlign;
    textBaseline: TextBaseline;
    settings: Settings;
    destroy(): void;
    beginRender(width: number, height: number): void;
    beginGroup(identifier: string): void;
    endGroup(): void;
    endRender(): unknown;
    fillRect(x: number, y: number, w: number, h: number): void;
    strokeRect(x: number, y: number, w: number, h: number): void;
    beginPath(): void;
    closePath(): void;
    moveTo(x: number, y: number): void;
    lineTo(x: number, y: number): void;
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
    bezierCurveTo(cp1X: number, cp1Y: number, cp2X: number, cp2Y: number, x: number, y: number): void;
    fillCircle(x: number, y: number, radius: number): void;
    strokeCircle(x: number, y: number, radius: number): void;
    fill(): void;
    stroke(): void;
    fillText(text: string, x: number, y: number): void;
    private static escapeText;
    protected getSvgTextAlignment(textAlign: TextAlign): string;
    protected getSvgBaseLine(): string;
    measureText(text: string): number;
    abstract fillMusicFontSymbol(x: number, y: number, scale: number, symbol: MusicFontSymbol, centerAtPosition?: boolean): void;
    abstract fillMusicFontSymbols(x: number, y: number, scale: number, symbols: MusicFontSymbol[], centerAtPosition?: boolean): void;
    onRenderFinished(): unknown;
    beginRotate(centerX: number, centerY: number, angle: number): void;
    endRotate(): void;
}

/**
 * This SVG canvas renders the music symbols by adding a CSS class 'at' to all elements.
 */
declare class CssFontSvgCanvas extends SvgCanvas {
    constructor();
    fillMusicFontSymbol(x: number, y: number, scale: number, symbol: MusicFontSymbol, centerAtPosition?: boolean): void;
    fillMusicFontSymbols(x: number, y: number, scale: number, symbols: MusicFontSymbol[], centerAtPosition?: boolean): void;
    private fillMusicFontSymbolText;
}

/**
 * This public class stores text widths for several fonts and allows width calculation
 * @partial
 */
declare class FontSizes {
    static Georgia: Uint8Array;
    static Arial: Uint8Array;
    static FontSizeLookupTables: Map<string, Uint8Array>;
    static readonly ControlChars: number;
    /**
     * @target web
     * @partial
     */
    static generateFontLookup(family: string): void;
    static measureString(s: string, families: string[], size: number, style: FontStyle, weight: FontWeight): number;
}

type index_d$1_CssFontSvgCanvas = CssFontSvgCanvas;
declare const index_d$1_CssFontSvgCanvas: typeof CssFontSvgCanvas;
type index_d$1_Cursors = Cursors;
declare const index_d$1_Cursors: typeof Cursors;
type index_d$1_FontSizes = FontSizes;
declare const index_d$1_FontSizes: typeof FontSizes;
type index_d$1_ICanvas = ICanvas;
type index_d$1_IContainer = IContainer;
type index_d$1_IMouseEventArgs = IMouseEventArgs;
type index_d$1_IUiFacade<TSettings> = IUiFacade<TSettings>;
type index_d$1_SvgCanvas = SvgCanvas;
declare const index_d$1_SvgCanvas: typeof SvgCanvas;
type index_d$1_TextAlign = TextAlign;
declare const index_d$1_TextAlign: typeof TextAlign;
type index_d$1_TextBaseline = TextBaseline;
declare const index_d$1_TextBaseline: typeof TextBaseline;
declare namespace index_d$1 {
  export { index_d$1_CssFontSvgCanvas as CssFontSvgCanvas, index_d$1_Cursors as Cursors, index_d$1_FontSizes as FontSizes, type index_d$1_ICanvas as ICanvas, type index_d$1_IContainer as IContainer, type index_d$1_IMouseEventArgs as IMouseEventArgs, type index_d$1_IUiFacade as IUiFacade, index_d$1_SvgCanvas as SvgCanvas, index_d$1_TextAlign as TextAlign, index_d$1_TextBaseline as TextBaseline };
}

/**
 * This is the base interface for output devices which can
 * request and playback audio samples.
 * @csharp_public
 */
interface ISynthOutput {
    /**
     * Gets the sample rate required by the output.
     */
    readonly sampleRate: number;
    /**
     * Called when the output should be opened.
     */
    open(bufferTimeInMilliseconds: number): void;
    /**
     * Called when the output should start the playback.
     */
    play(): void;
    /**
     * Requests the output to destroy itself.
     */
    destroy(): void;
    /**
     * Called when the output should stop the playback.
     */
    pause(): void;
    /**
     * Called when samples have been synthesized and should be added to the playback buffer.
     * @param samples
     */
    addSamples(samples: Float32Array): void;
    /**
     * Called when the samples in the output buffer should be reset. This is neeed for instance when seeking to another position.
     */
    resetSamples(): void;
    /**
     * Activates the output component.
     */
    activate(): void;
    /**
     * Fired when the output has been successfully opened and is ready to play samples.
     */
    readonly ready: IEventEmitter;
    /**
     * Fired when a certain number of samples have been played.
     */
    readonly samplesPlayed: IEventEmitterOfT<number>;
    /**
     * Fired when the output needs more samples to be played.
     */
    readonly sampleRequest: IEventEmitter;
}

/**
 * This is the main synthesizer component which can be used to
 * play a {@link MidiFile} via a {@link ISynthOutput}.
 */
declare class AlphaSynth implements IAlphaSynth {
    private _sequencer;
    private _synthesizer;
    private _isSoundFontLoaded;
    private _isMidiLoaded;
    private _tickPosition;
    private _timePosition;
    private _metronomeVolume;
    private _countInVolume;
    private _playedEventsQueue;
    private _midiEventsPlayedFilter;
    private _notPlayedSamples;
    /**
     * Gets the {@link ISynthOutput} used for playing the generated samples.
     */
    readonly output: ISynthOutput;
    isReady: boolean;
    get isReadyForPlayback(): boolean;
    state: PlayerState;
    get logLevel(): LogLevel;
    set logLevel(value: LogLevel);
    get masterVolume(): number;
    set masterVolume(value: number);
    get metronomeVolume(): number;
    set metronomeVolume(value: number);
    get countInVolume(): number;
    set countInVolume(value: number);
    get midiEventsPlayedFilter(): MidiEventType[];
    set midiEventsPlayedFilter(value: MidiEventType[]);
    get playbackSpeed(): number;
    set playbackSpeed(value: number);
    get tickPosition(): number;
    set tickPosition(value: number);
    get timePosition(): number;
    set timePosition(value: number);
    get playbackRange(): PlaybackRange | null;
    set playbackRange(value: PlaybackRange | null);
    get isLooping(): boolean;
    set isLooping(value: boolean);
    destroy(): void;
    /**
     * Initializes a new instance of the {@link AlphaSynth} class.
     * @param output The output to use for playing the generated samples.
     */
    constructor(output: ISynthOutput, bufferTimeInMilliseconds: number);
    play(): boolean;
    private playInternal;
    pause(): void;
    playPause(): void;
    stop(): void;
    playOneTimeMidiFile(midi: MidiFile): void;
    resetSoundFonts(): void;
    loadSoundFont(data: Uint8Array, append: boolean): void;
    private checkReadyForPlayback;
    /**
     * Loads the given midi file for playback.
     * @param midi The midi file to load
     */
    loadMidiFile(midi: MidiFile): void;
    applyTranspositionPitches(transpositionPitches: Map<number, number>): void;
    setChannelMute(channel: number, mute: boolean): void;
    resetChannelStates(): void;
    setChannelSolo(channel: number, solo: boolean): void;
    setChannelVolume(channel: number, volume: number): void;
    private onSamplesPlayed;
    private checkForFinish;
    private stopOneTimeMidi;
    private updateTimePosition;
    readonly ready: IEventEmitter;
    readonly readyForPlayback: IEventEmitter;
    readonly finished: IEventEmitter;
    readonly soundFontLoaded: IEventEmitter;
    readonly soundFontLoadFailed: IEventEmitterOfT<Error>;
    readonly midiLoaded: IEventEmitterOfT<PositionChangedEventArgs>;
    readonly midiLoadFailed: IEventEmitterOfT<Error>;
    readonly stateChanged: IEventEmitterOfT<PlayerStateChangedEventArgs>;
    readonly positionChanged: IEventEmitterOfT<PositionChangedEventArgs>;
    readonly midiEventsPlayed: IEventEmitterOfT<MidiEventsPlayedEventArgs>;
    readonly playbackRangeChanged: IEventEmitterOfT<PlaybackRangeChangedEventArgs>;
}

/**
 * Represents a fixed size circular sample buffer that can be written to and read from.
 * @csharp_public
 */
declare class CircularSampleBuffer {
    private _buffer;
    private _writePosition;
    private _readPosition;
    /**
     * Gets the number of samples written to the buffer.
     */
    count: number;
    /**
     * Initializes a new instance of the {@link CircularSampleBuffer} class.
     * @param size The size.
     */
    constructor(size: number);
    /**
     * Clears all samples written to this buffer.
     */
    clear(): void;
    /**
     * Writes the given samples to this buffer.
     * @param data The sample array to read from.
     * @param offset
     * @param count
     * @returns
     */
    write(data: Float32Array, offset: number, count: number): number;
    /**
     * Reads the requested amount of samples from the buffer.
     * @param data The sample array to store the read elements.
     * @param offset The offset within the destination buffer to put the items at.
     * @param count The number of items to read from this buffer.
     * @returns The number of items actually read from the buffer.
     */
    read(data: Float32Array, offset: number, count: number): number;
}

/**
 * a WebWorker based alphaSynth which uses the given player as output.
 * @target web
 */
declare class AlphaSynthWebWorkerApi implements IAlphaSynth {
    private _synth;
    private _output;
    private _workerIsReadyForPlayback;
    private _workerIsReady;
    private _outputIsReady;
    private _state;
    private _masterVolume;
    private _metronomeVolume;
    private _countInVolume;
    private _playbackSpeed;
    private _tickPosition;
    private _timePosition;
    private _isLooping;
    private _playbackRange;
    private _midiEventsPlayedFilter;
    get isReady(): boolean;
    get isReadyForPlayback(): boolean;
    get state(): PlayerState;
    get logLevel(): LogLevel;
    set logLevel(value: LogLevel);
    get masterVolume(): number;
    set masterVolume(value: number);
    get metronomeVolume(): number;
    set metronomeVolume(value: number);
    get countInVolume(): number;
    set countInVolume(value: number);
    get midiEventsPlayedFilter(): MidiEventType[];
    set midiEventsPlayedFilter(value: MidiEventType[]);
    get playbackSpeed(): number;
    set playbackSpeed(value: number);
    get tickPosition(): number;
    set tickPosition(value: number);
    get timePosition(): number;
    set timePosition(value: number);
    get isLooping(): boolean;
    set isLooping(value: boolean);
    get playbackRange(): PlaybackRange | null;
    set playbackRange(value: PlaybackRange | null);
    constructor(player: ISynthOutput, settings: Settings);
    destroy(): void;
    play(): boolean;
    pause(): void;
    playPause(): void;
    stop(): void;
    playOneTimeMidiFile(midi: MidiFile): void;
    loadSoundFont(data: Uint8Array, append: boolean): void;
    loadSoundFontFromUrl(url: string, append: boolean, progress: (e: ProgressEventArgs) => void): void;
    resetSoundFonts(): void;
    loadMidiFile(midi: MidiFile): void;
    applyTranspositionPitches(transpositionPitches: Map<number, number>): void;
    setChannelMute(channel: number, mute: boolean): void;
    resetChannelStates(): void;
    setChannelSolo(channel: number, solo: boolean): void;
    setChannelVolume(channel: number, volume: number): void;
    handleWorkerMessage(e: MessageEvent): void;
    private checkReady;
    private checkReadyForPlayback;
    readonly ready: IEventEmitter;
    readonly readyForPlayback: IEventEmitter;
    readonly finished: IEventEmitter;
    readonly soundFontLoaded: IEventEmitter;
    readonly soundFontLoadFailed: IEventEmitterOfT<Error>;
    readonly midiLoaded: IEventEmitterOfT<PositionChangedEventArgs>;
    readonly midiLoadFailed: IEventEmitterOfT<Error>;
    readonly stateChanged: IEventEmitterOfT<PlayerStateChangedEventArgs>;
    readonly positionChanged: IEventEmitterOfT<PositionChangedEventArgs>;
    readonly midiEventsPlayed: IEventEmitterOfT<MidiEventsPlayedEventArgs>;
    readonly playbackRangeChanged: IEventEmitterOfT<PlaybackRangeChangedEventArgs>;
    onOutputSampleRequest(): void;
    onOutputSamplesPlayed(samples: number): void;
    private onOutputReady;
}

/**
 * @target web
 */
declare abstract class AlphaSynthWebAudioOutputBase implements ISynthOutput {
    protected static readonly BufferSize: number;
    protected static readonly PreferredSampleRate: number;
    protected _context: AudioContext | null;
    protected _buffer: AudioBuffer | null;
    protected _source: AudioBufferSourceNode | null;
    private _resumeHandler?;
    get sampleRate(): number;
    activate(resumedCallback?: () => void): void;
    private patchIosSampleRate;
    private createAudioContext;
    open(bufferTimeInMilliseconds: number): void;
    private registerResumeHandler;
    private unregisterResumeHandler;
    play(): void;
    pause(): void;
    destroy(): void;
    abstract addSamples(f: Float32Array): void;
    abstract resetSamples(): void;
    readonly ready: IEventEmitter;
    readonly samplesPlayed: IEventEmitterOfT<number>;
    readonly sampleRequest: IEventEmitter;
    protected onSamplesPlayed(numberOfSamples: number): void;
    protected onSampleRequest(): void;
    protected onReady(): void;
}

/**
 * This class implements a HTML5 Web Audio API based audio output device
 * for alphaSynth using the legacy ScriptProcessor node.
 * @target web
 */
declare class AlphaSynthScriptProcessorOutput extends AlphaSynthWebAudioOutputBase {
    private _audioNode;
    private _circularBuffer;
    private _bufferCount;
    private _requestedBufferCount;
    open(bufferTimeInMilliseconds: number): void;
    play(): void;
    pause(): void;
    addSamples(f: Float32Array): void;
    resetSamples(): void;
    private requestBuffers;
    private _outputBuffer;
    private generateSound;
}

/**
 * This class implements a HTML5 Web Audio API based audio output device
 * for alphaSynth. It can be controlled via a JS API.
 * @target web
 */
declare class AlphaSynthAudioWorkletOutput extends AlphaSynthWebAudioOutputBase {
    private _worklet;
    private _bufferTimeInMilliseconds;
    private readonly _settings;
    constructor(settings: Settings);
    open(bufferTimeInMilliseconds: number): void;
    play(): void;
    private handleMessage;
    pause(): void;
    addSamples(f: Float32Array): void;
    resetSamples(): void;
}

type index_d_ActiveBeatsChangedEventArgs = ActiveBeatsChangedEventArgs;
declare const index_d_ActiveBeatsChangedEventArgs: typeof ActiveBeatsChangedEventArgs;
type index_d_AlphaSynth = AlphaSynth;
declare const index_d_AlphaSynth: typeof AlphaSynth;
type index_d_AlphaSynthAudioWorkletOutput = AlphaSynthAudioWorkletOutput;
declare const index_d_AlphaSynthAudioWorkletOutput: typeof AlphaSynthAudioWorkletOutput;
type index_d_AlphaSynthScriptProcessorOutput = AlphaSynthScriptProcessorOutput;
declare const index_d_AlphaSynthScriptProcessorOutput: typeof AlphaSynthScriptProcessorOutput;
type index_d_AlphaSynthWebAudioOutputBase = AlphaSynthWebAudioOutputBase;
declare const index_d_AlphaSynthWebAudioOutputBase: typeof AlphaSynthWebAudioOutputBase;
type index_d_AlphaSynthWebWorkerApi = AlphaSynthWebWorkerApi;
declare const index_d_AlphaSynthWebWorkerApi: typeof AlphaSynthWebWorkerApi;
type index_d_CircularSampleBuffer = CircularSampleBuffer;
declare const index_d_CircularSampleBuffer: typeof CircularSampleBuffer;
type index_d_IAlphaSynth = IAlphaSynth;
type index_d_ISynthOutput = ISynthOutput;
type index_d_MidiEventsPlayedEventArgs = MidiEventsPlayedEventArgs;
declare const index_d_MidiEventsPlayedEventArgs: typeof MidiEventsPlayedEventArgs;
type index_d_PlaybackRange = PlaybackRange;
declare const index_d_PlaybackRange: typeof PlaybackRange;
type index_d_PlaybackRangeChangedEventArgs = PlaybackRangeChangedEventArgs;
declare const index_d_PlaybackRangeChangedEventArgs: typeof PlaybackRangeChangedEventArgs;
type index_d_PlayerState = PlayerState;
declare const index_d_PlayerState: typeof PlayerState;
type index_d_PlayerStateChangedEventArgs = PlayerStateChangedEventArgs;
declare const index_d_PlayerStateChangedEventArgs: typeof PlayerStateChangedEventArgs;
type index_d_PositionChangedEventArgs = PositionChangedEventArgs;
declare const index_d_PositionChangedEventArgs: typeof PositionChangedEventArgs;
declare namespace index_d {
  export { index_d_ActiveBeatsChangedEventArgs as ActiveBeatsChangedEventArgs, index_d_AlphaSynth as AlphaSynth, index_d_AlphaSynthAudioWorkletOutput as AlphaSynthAudioWorkletOutput, index_d_AlphaSynthScriptProcessorOutput as AlphaSynthScriptProcessorOutput, index_d_AlphaSynthWebAudioOutputBase as AlphaSynthWebAudioOutputBase, index_d_AlphaSynthWebWorkerApi as AlphaSynthWebWorkerApi, index_d_CircularSampleBuffer as CircularSampleBuffer, type index_d_IAlphaSynth as IAlphaSynth, type index_d_ISynthOutput as ISynthOutput, index_d_MidiEventsPlayedEventArgs as MidiEventsPlayedEventArgs, index_d_PlaybackRange as PlaybackRange, index_d_PlaybackRangeChangedEventArgs as PlaybackRangeChangedEventArgs, index_d_PlayerState as PlayerState, index_d_PlayerStateChangedEventArgs as PlayerStateChangedEventArgs, index_d_PositionChangedEventArgs as PositionChangedEventArgs };
}

export { AlphaTabApi, AlphaTabError, AlphaTabErrorType, CoreSettings, DisplaySettings, Environment, FileLoadError, FingeringMode, FormatError, ImporterSettings, LayoutMode, LogLevel, Logger, NotationMode, NotationSettings, PlayerOutputMode, PlayerSettings, ProgressEventArgs, RenderingResources, ResizeEventArgs, ScrollMode, Settings, StaveProfile, SystemsLayoutMode, TabRhythmMode, VibratoPlaybackSettings, WebPlatform, index_d$4 as exporter, index_d$5 as importer, VersionInfo as meta, index_d$3 as midi, index_d$6 as model, index_d$1 as platform, index_d$2 as rendering, index_d as synth };
