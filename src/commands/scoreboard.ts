import { TextComponent } from '../TextComponent';
import { Color } from './arguments';
import { Selector } from './selector';

export const scoreboard = {
    objectives: {
        list: 'scoreboard objectives list',
        add: (objective: string, criteria: string, displayName?: TextComponent) =>
            `scoreboard objectives add ${objective} ${criteria} ${JSON.stringify(displayName) ?? ''}`,
        remove: (objective: string) => `scoreboard objectives remove ${objective}`,
        setDisplay: (slot: string, objective?: string) => `scoreboard objectives setdisplay ${slot} ${objective ?? ''}`,
        modify: (objective: string) => ({
            displayname: (displayName: TextComponent) =>
                `scoreboard objectives modify ${objective} displayname ${JSON.stringify(displayName) ?? ''}`,
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
    add: (team: string, displayName?: TextComponent) => `team add ${team} ${JSON.stringify(displayName) ?? ''}`,
    remove: (team: string) => `team remove ${team}`,
    empty: (team: string) => `team empty ${team}`,
    join: (team: string, members?: Selector) => `team join ${team} ${members ?? ''}`,
    leave: (members: Selector) => `team join ${members}`,
    modify: (team: string) => ({
        displayName: (displayName: TextComponent) =>
            `team modify ${team} displayName ${JSON.stringify(displayName) ?? ''}`,
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
