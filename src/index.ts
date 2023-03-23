import { e } from './selector';

class Collection<T> {
    private contents = new Map<string, T>();

    constructor(private create: () => T) {}

    public get(id: string) {
        const namespace = this.contents.get(id) ?? this.create();
        this.contents.set(id, namespace);
        return namespace;
    }
}

export class Datapack extends Collection<Namespace> {
    constructor() {
        super(() => new Namespace(this));
    }
}

class Namespace {
    constructor(private pack: Datapack) {}

    public functions = new Collection<Function>(() => new Function(this.pack));
}

class Function {
    constructor(private pack: Datapack) {}

    private commands: string[] = [];

    public add(...commands: string[]): Function {
        this.commands.push(...commands);
        return this;
    }
}

export type Range = { from?: number; to?: number };
