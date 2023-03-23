import { Datapack } from '.';
import { scoreboard, e } from './commands';

const datapack = new Datapack();
const testing = datapack.get('testing');

testing.functions.get('tick');
console.log(scoreboard.players.list(e.team('foo').team.not('bar')));
