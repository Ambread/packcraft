import { Selector } from './selector';

const condition = (past: string) => ({
    biome: (pos: unknown, biome: unknown) => chain(`${past} biome ${pos} ${biome}`),
    block: (pos: unknown, block: unknown) => chain(`${past} block ${pos} ${block}`),
    blocks: (start: unknown, end: unknown, destination: unknown, behavior: 'all' | 'masked') =>
        chain(`${past} blocks ${start} ${end} ${destination} ${behavior}`),
    data: {
        block: (sourcePos: unknown, path: unknown) => chain(`${past} data block ${sourcePos} ${path}`),
        entity: (source: unknown, path: unknown) => chain(`${past} entity ${source} ${path}`),
        storage: (source: unknown, path: unknown) => chain(`${past} entity ${source} ${path}`),
    },
    dimension: (dimension: unknown) => chain(`${past} dimension ${dimension}`),
    entity: (entities: unknown) => chain(`${past} entities ${entities}`),
    loaded: (pos: unknown) => chain(`${past} loaded ${pos}`),
    predicate: (predicate: unknown) => chain(`${past} predicate ${predicate}`),
    score: Object.assign(
        (operation: '<' | '<=' | '=' | '>=' | '>', target: unknown, targetObjective: unknown) =>
            chain(`${past} score ${operation} ${target} ${targetObjective}`),
        { matches: (range: unknown) => chain(`${past} score matches ${range}`) },
    ),
});

const chain = (past: string) => ({
    toString: () => past,
    align: (axis: unknown) => chain(`${past} align ${axis}`),
    anchored: (anchor: unknown) => chain(`${past} anchored ${anchor}`),
    as: (targets: Selector) => chain(`${past} as ${targets}`),
    at: (targets: Selector) => chain(`${past} at ${targets}`),
    facing: Object.assign((pos: unknown) => chain(`${past} facing ${pos}`), {
        entity: (targets: Selector, anchor: unknown) => chain(`${past} facing entity ${targets} ${anchor}`),
    }),
    in: (dimension: unknown) => chain(`${past} in ${dimension}`),
    on: (target: 'attacker' | 'controller' | 'leasher' | 'origin' | 'owner' | 'passengers' | 'target' | 'vehicle') =>
        chain(`${past} on ${target}`),
    positioned: Object.assign((pos: unknown) => chain(`${past} positioned ${pos}`), {
        as: (targets: Selector) => chain(`${past} positioned as ${targets}`),
        over: (heightMap: unknown) => chain(`${past} positioned over ${heightMap}`),
    }),
    rotated: Object.assign((rot: unknown) => chain(`${past} rotated ${rot}`), {
        as: (targets: Selector) => chain(`${past} rotated as ${targets}`),
    }),
    store: (variable: 'result' | 'success') => ({
        block: (targetPos: unknown, path: unknown, type: unknown, scale: unknown) =>
            chain(`${past} store ${variable} block ${targetPos} ${path} ${type} ${scale}`),
        bossbar: (id: unknown, location: 'max' | 'value') =>
            chain(`${past} store ${variable} bossbar ${id} ${location}`),
        entity: (target: unknown, path: unknown, type: unknown, scale: unknown) =>
            chain(`${past} store ${variable} entity ${target} ${path} ${type} ${scale}`),
        score: (targets: unknown, objective: unknown) =>
            chain(`${past} store ${variable} score ${targets} ${objective}`),
        storage: (target: unknown, path: unknown, type: unknown, scale: unknown) =>
            chain(`${past} store ${variable} storage ${target} ${path} ${type} ${scale}`),
    }),
    summon: (entity: unknown) => chain(`${past} summon ${entity}`),
    if: condition(`${past} if`),
    unless: condition(`${past} unless`),
    run: (command: string) => `${past} run ${command}`,
});

export const execute = chain('execute');
