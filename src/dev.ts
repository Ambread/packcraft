import { Datapack } from '.';
import { scoreboard } from './command';
import { e } from './selector';

const datapack = new Datapack();
const testing = datapack.get('testing');

testing.functions.get('tick');
console.log(scoreboard.players.list(e.team('foo').team.not('bar')));
