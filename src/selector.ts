import { Range } from '.';

export type SelectorVariable = 'p' | 'r' | 'a' | 'e' | 's';

export interface SelectorArgumentTypes {
    type: string;
    tag: string;
    distance: Range;
    team: string;
    limit: number;
}

export type SelectorArgument = {
    [K in keyof SelectorArgumentTypes]: {
        key: K;
        value: SelectorArgumentTypes[K];
        inverted: boolean;
    };
}[keyof SelectorArgumentTypes];

export class Selector {
    constructor(
        private variable: SelectorVariable,
        private args: SelectorArgument[] = [],
    ) {}

    private arg<K extends keyof SelectorArgumentTypes>(key: K) {
        const helper =
            (inverted: boolean) => (value: SelectorArgumentTypes[K]) =>
                new Selector(this.variable, [
                    ...this.args,
                    { key, value, inverted } as SelectorArgument,
                ]);

        return Object.assign(helper(false), { not: helper(true) });
    }

    public type = this.arg('type');
    public tag = this.arg('tag');
    public distance = this.arg('distance');
    public team = this.arg('team');
    public limit = this.arg('limit');
}

export const p = new Selector('p');
export const r = new Selector('r');
export const a = new Selector('a');
export const e = new Selector('e');
export const s = new Selector('s');
