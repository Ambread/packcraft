import { Range } from '..';

export type Selector = string | SelectorBuilder;

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

export class SelectorBuilder {
    public type = this.arg('type');
    public tag = this.arg('tag');
    public distance = this.arg('distance');
    public team = this.arg('team');
    public limit = this.arg('limit');

    constructor(private variable: SelectorVariable, private args: SelectorArgument[] = []) {}

    private arg<K extends keyof SelectorArgumentTypes>(key: K) {
        const helper = (inverted: boolean) => (value: SelectorArgumentTypes[K]) =>
            new SelectorBuilder(this.variable, [...this.args, { key, value, inverted } as SelectorArgument]);

        return Object.assign(helper(false), { not: helper(true) });
    }

    public toString() {
        const args = this.args
            .map(({ key, value, inverted }) => {
                const raw =
                    typeof value === 'string' || typeof value === 'number' ? value : `${value.from}..${value.to}`;

                return `${key}=${inverted ? '!' : ''}${raw}`;
            })
            .join(',');

        return `@${this.variable}[${args}]`;
    }
}

export const p = new SelectorBuilder('p');
export const r = new SelectorBuilder('r');
export const a = new SelectorBuilder('a');
export const e = new SelectorBuilder('e');
export const s = new SelectorBuilder('s');
