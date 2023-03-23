import { Selector } from './selector';

export const say = (message: string) => `say ${message}`;

export const scoreboard = {
    objectives: {
        list: 'scoreboard objectives list',
        add: (objective: string, criteria: string, displayName?: string) =>
            `scoreboard objectives add ${objective} ${criteria} ${displayName ?? ''}`,
        remove: (objective: string) => `scoreboard objectives remove ${objective}`,
        setDisplay: (slot: string, objective?: string) => `scoreboard objectives setdisplay ${slot} ${objective ?? ''}`,
        modify: (objective: string) => ({
            displayname: (displayName: string) =>
                `scoreboard objectives modify ${objective} displayname ${displayName}`,
            renderType: (renderType: 'hearts' | 'integer') =>
                `scoreboard objectives modify ${objective} rendertype ${renderType}`,
        }),
    },
    players: {
        list: (target?: Selector) => `scoreboard players list ${target ?? ''}`,
        get: (target: Selector) => `scoreboard players get ${target}`,
        set: (targets: Selector, objective: string, score: number) =>
            `scoreboard players set ${targets} ${objective} ${score}`,
        add: (targets: Selector, objective: string, score: number) =>
            `scoreboard players add ${targets} ${objective} ${score}`,
        remove: (targets: Selector, objective: string, score: number) =>
            `scoreboard players remove ${targets} ${objective} ${score}`,
        reset: (targets: Selector, objective?: string) => `scoreboard players reset ${targets} ${objective ?? ''}`,
        enable: (targets: Selector, objective: string) => `scoreboard players enable ${targets} ${objective}`,
        operation: (
            targets: Selector,
            targetObjective: string,
            operation: ScoreboardOperation,
            source: Selector,
            sourceObjective: string,
        ) => `scoreboard players operation ${targets} ${targetObjective} ${operation} ${source} ${sourceObjective}`,
    },
};

export type ScoreboardOperation = '+=' | '-=' | '*=' | '/=' | '%=' | '=' | '<' | '>' | '><';

export const tag = (targets: Selector) => ({
    add: (name: string) => `tag ${targets} add ${name}`,
    list: `tag ${targets} list`,
    remove: (name: string) => `tag ${targets} remove ${name}`,
});

export const team = {
    list: (team?: string) => `team list ${team ?? ''}`,
    add: (team: string, displayName?: string) => `team add ${team} ${displayName ?? ''}`,
    remove: (team: string) => `team remove ${team}`,
    empty: (team: string) => `team empty ${team}`,
    join: (team: string, members?: Selector) => `team join ${team} ${members ?? ''}`,
    leave: (members: Selector) => `team join ${members}`,
    modify: (team: string) => ({
        displayName: (displayName: string) => `team modify ${team} displayName ${displayName}`,
        color: (value: Color | 'reset') => `team modify ${team} color ${value}`,
        friendlyFire: (allowed: boolean) => `team modify ${team} friendlyFire ${allowed}`,
        seeFriendlyInvisibles: (allowed: boolean) => `team modify ${team} seeFriendlyInvisibles ${allowed}`,
        nametagVisibility: (option: 'never' | 'hideForOtherTeams' | 'hideForOwnTeam' | 'always') =>
            `team modify ${team} nametagVisibility ${option}`,
        deathMessageVisibility: (option: 'never' | 'hideForOtherTeams' | 'hideForOwnTeam' | 'always') =>
            `team modify ${team} deathMessageVisibility ${option}`,
        collisionRule: (option: 'never' | 'pushOtherTeams' | 'pushOwnTeam' | 'always') =>
            `team modify ${team} collisionRule ${option}`,
        prefix: (prefix: string) => `team modify ${team} prefix ${prefix}`,
        suffix: (suffix: string) => `team modify ${team} suffix ${suffix}`,
    }),
};

export type Color =
    | 'black'
    | 'dark_blue'
    | 'dark_green'
    | 'dark_aqua'
    | 'dark_red'
    | 'dark_purple'
    | 'gold'
    | 'gray'
    | 'dark_gray'
    | 'blue'
    | 'green'
    | 'aqua'
    | 'red'
    | 'light_purple'
    | 'yellow'
    | 'white';
