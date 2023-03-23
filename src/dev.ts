import { Datapack } from '.';
import { e } from './selector';

const datapack = new Datapack();
const testing = datapack.get('testing');

testing.functions.get('tick');
console.log(e.type('foo').type.not('foo').toString());
