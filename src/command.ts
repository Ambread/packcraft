import { Selector } from './selector';

export const say = (message: string) => `say ${message}`;

export const scoreboard = {
    objectives: {
        list: 'scoreboard objectives list',
        add: (objective: string, criteria: string, displayName?: string) =>
            `scoreboard objectives add ${objective} ${criteria} ${displayName}`,
        remove: (objective: string) =>
            `scoreboard objectives remove ${objective}`,
        setDisplay: (slot: string, objective?: string) =>
            `scoreboard objectives setdisplay ${slot} ${objective}`,
        modify: (objective: string) => ({
            displayname: (displayName: string) =>
                `scoreboard objectives modify ${objective} displayname ${displayName}`,
            renderType: (renderType: 'hearts' | 'integer') =>
                `scoreboard objectives modify ${objective} rendertype ${renderType}`,
        }),
    },
    players: {
        list: (target?: Selector) => `scoreboard players list ${target}`,
        get: (target: Selector) => `scoreboard players get ${target}`,
        set: (targets: Selector, objective: string, score: number) =>
            `scoreboard players set ${targets} ${objective} ${score}`,
        add: (targets: Selector, objective: string, score: number) =>
            `scoreboard players add ${targets} ${objective} ${score}`,
        remove: (targets: Selector, objective: string, score: number) =>
            `scoreboard players remove ${targets} ${objective} ${score}`,
        reset: (targets: Selector, objective?: string) =>
            `scoreboard players reset ${targets} ${objective}`,
        enable: (targets: Selector, objective: string) =>
            `scoreboard players enable ${targets} ${objective}`,
        operation: (
            targets: Selector,
            targetObjective: string,
            operation: ScoreboardOperation,
            source: Selector,
            sourceObjective: string,
        ) =>
            `scoreboard players operation ${targets} ${targetObjective} ${operation} ${source} ${sourceObjective}`,
    },
};

export type ScoreboardOperation =
    | '+='
    | '-='
    | '*='
    | '/='
    | '%='
    | '='
    | '<'
    | '>'
    | '><';
