# Pack Craft

WIP

```ts
import { Datapack, e, execute, scoreboard, teams } from 'silly';

const pack = new Datapack({
    namespace: 'control_point',
    description: 'Control point test',
});

const load = pack.functions.create('load').tag('minecraft', 'load');
const tick = pack.functions.create('tick').tag('minecraft', 'tick');
const reset = pack.functions.create('reset');

const teams = {
    foo: 'Foo',
    bar: 'Bar',
    baz: 'Baz',
};

for (const [team, fakePlayer] of Object.entries(teams)) {
    load.add(
        scoreboard.objectives.add('score', 'dummy', 'Score'),
        teams.join(fakePlayer, team),
    );

    tick.add(
        execute
            .at(e.type('marker').tag('control_point'))
            .if.entity(e.type('player').distance({ to: 2 }).team(team).limit(1))
            .run(scoreboard.players.add(fakePlayer, 'score', 1)),
    );

    reset.add(scoreboard.players.set(fakePlayer, 'score', 0));
}
```
