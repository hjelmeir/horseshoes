// tslint:disable:no-expression-statement
import test from 'ava';
import { initResources, defaultResources } from './resourceHelper';
import { Resource } from '../models/resource';

interface Foo extends Resource {
  test: true
}

test('initResources', t => {
  t.deepEqual(initResources<Foo>(), defaultResources);
});
