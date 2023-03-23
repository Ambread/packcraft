import { Color } from './command';

export type TextComponent =
    | Text
    | TextComponent[]
    | PlainText
    | TranslatedText
    | ScoreboardValue
    | EntityNames
    | Keybind
    | NBTValues;

type Text = string | boolean | number;

interface BaseComponent {
    extra?: TextComponent[];

    // Formatting
    color?: Color | 'reset';
    font?: string;
    bold?: boolean;
    italic?: boolean;
    underlined?: boolean;
    strikethrough?: boolean;
    obfuscated?: boolean;

    // Interactivity
    insertion?: string;
    clickEvent?: {
        action: 'open_url' | 'open_file' | 'run_command' | 'suggest_command' | 'change_page' | 'copy_to_clipboard';
        value: string;
    };
    hoverEvent:
        | { action: 'show_text'; contents: TextComponent }
        | { action: 'show_item'; contents: { id: string; count: string; tag: string } }
        | { action: 'show_entity'; contents: { name: TextComponent; type: string; id: string } };
}

interface PlainText extends BaseComponent {
    text: Text;
}

interface TranslatedText extends BaseComponent {
    translate: string;
    with?: TextComponent[];
}

interface ScoreboardValue extends BaseComponent {
    score: {
        name: string;
        objective: string;
        value?: string;
    };
}

interface EntityNames {
    selector: string;
    separator?: TextComponent;
}

interface Keybind {
    keybind: string;
}

interface NBTValues {
    nbt: string;
    interpret?: boolean;
    separator?: TextComponent;
    block: string;
    entity: string;
    storage: string;
}
