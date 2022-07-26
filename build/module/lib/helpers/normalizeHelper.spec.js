import test from 'ava';
import { camelizeKeys } from './normalizeHelper';
test('camelizeKeys converts numeric indexes to string', (t) => {
    const dirty = { 0: ['a', 'b', 'c'], 1: '1' };
    const clean = { '0': ['a', 'b', 'c'], '1': '1' };
    t.deepEqual(clean, camelizeKeys(dirty));
});
test('camelizeKeys works recursively', (t) => {
    const dirty = {
        some_bar: 'bar',
        some_foo: {
            dog_goes_woof: 'woof',
            some_animals: {
                my_cat: 'cat',
                dromedary_camel: 'camel',
            },
        },
    };
    const clean = {
        someBar: 'bar',
        someFoo: {
            dogGoesWoof: 'woof',
            someAnimals: {
                myCat: 'cat',
                dromedaryCamel: 'camel',
            },
        },
    };
    t.deepEqual(clean, camelizeKeys(dirty));
});
test('camelizeKeys handles empty keys and values', (t) => {
    const dirty = {
        foo_bar: undefined,
        bar_baz: null,
    };
    const clean = {
        fooBar: null,
        barBaz: null,
    };
    t.deepEqual(clean, camelizeKeys(dirty));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9ybWFsaXplSGVscGVyLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2hlbHBlcnMvbm9ybWFsaXplSGVscGVyLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxJQUFJLE1BQU0sS0FBSyxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUVqRCxJQUFJLENBQUMsaURBQWlELEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUM1RCxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQzdDLE1BQU0sS0FBSyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDakQsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDMUMsQ0FBQyxDQUFDLENBQUM7QUFFSCxJQUFJLENBQUMsZ0NBQWdDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUMzQyxNQUFNLEtBQUssR0FBRztRQUNaLFFBQVEsRUFBRSxLQUFLO1FBQ2YsUUFBUSxFQUFFO1lBQ1IsYUFBYSxFQUFFLE1BQU07WUFDckIsWUFBWSxFQUFFO2dCQUNaLE1BQU0sRUFBRSxLQUFLO2dCQUNiLGVBQWUsRUFBRSxPQUFPO2FBQ3pCO1NBQ0Y7S0FDRixDQUFDO0lBRUYsTUFBTSxLQUFLLEdBQUc7UUFDWixPQUFPLEVBQUUsS0FBSztRQUNkLE9BQU8sRUFBRTtZQUNQLFdBQVcsRUFBRSxNQUFNO1lBQ25CLFdBQVcsRUFBRTtnQkFDWCxLQUFLLEVBQUUsS0FBSztnQkFDWixjQUFjLEVBQUUsT0FBTzthQUN4QjtTQUNGO0tBQ0YsQ0FBQztJQUVGLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQzFDLENBQUMsQ0FBQyxDQUFDO0FBRUgsSUFBSSxDQUFDLDRDQUE0QyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDdkQsTUFBTSxLQUFLLEdBQUc7UUFDWixPQUFPLEVBQUUsU0FBUztRQUNsQixPQUFPLEVBQUUsSUFBSTtLQUNkLENBQUM7SUFFRixNQUFNLEtBQUssR0FBRztRQUNaLE1BQU0sRUFBRSxJQUFJO1FBQ1osTUFBTSxFQUFFLElBQUk7S0FDYixDQUFDO0lBRUYsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDMUMsQ0FBQyxDQUFDLENBQUMifQ==