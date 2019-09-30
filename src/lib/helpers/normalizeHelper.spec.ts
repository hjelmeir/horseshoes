import test from 'ava';
import { camelizeKeys } from './normalizeHelper';

test('camelizeKeys converts numeric indexes to string', t => {
  const dirty = { 0: '0', 1: '1' };
  const clean = { '0': '0', '1': '1' };
  t.deepEqual(clean, camelizeKeys(dirty));
});

test('camelizeKeys works recursively', t => {
  const dirty = {
    some_bar: 'bar',
    some_foo: {
      dog_goes_woof: 'woof',
      some_animals: {
        my_cat: 'cat',
        dromedary_camel: 'camel'
      }
    }
  };

  const clean = {
    someBar: 'bar',
    someFoo: {
      dogGoesWoof: 'woof',
      someAnimals: {
        myCat: 'cat',
        dromedaryCamel: 'camel'
      }
    }
  };

  t.deepEqual(clean, camelizeKeys(dirty));
});

test('camelizeKeys handles empty keys and values', t => {
  const dirty = {
    foo_bar: undefined,
    bar_baz: null
  };

  const clean = {
    fooBar: null,
    barBaz: null
  };

  t.deepEqual(clean, camelizeKeys(dirty));
});
