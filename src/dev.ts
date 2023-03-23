import { Datapack } from '.';
import { e, execute, scoreboard, team } from './commands';

const pack = new Datapack();
const controlPoint = pack.get('control_point');

const load = controlPoint.functions.get('load');
const tick = controlPoint.functions.get('tick');
const reset = controlPoint.functions.get('reset');

const teams = {
    foo: 'Foo',
    bar: 'Bar',
    baz: 'Baz',
};

for (const [teamName, fakePlayer] of Object.entries(teams)) {
    load.add(scoreboard.objectives.add('score', 'dummy', 'Score'), team.join(fakePlayer, teamName));

    tick.add(
        execute
            .at(e.type('marker').tag('control_point'))
            .if.entity(e.type('player').distance({ to: 2 }).team(teamName).limit(1))
            .run(scoreboard.players.add(fakePlayer, 'score', 1)),
    );

    reset.add(scoreboard.players.set(fakePlayer, 'score', 0));
}
