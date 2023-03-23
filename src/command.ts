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
    },
};
