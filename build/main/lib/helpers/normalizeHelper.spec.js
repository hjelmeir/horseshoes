"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const normalizeHelper_1 = require("./normalizeHelper");
ava_1.default('camelizeKeys converts numeric indexes to string', (t) => {
    const dirty = { 0: ['a', 'b', 'c'], 1: '1' };
    const clean = { '0': ['a', 'b', 'c'], '1': '1' };
    t.deepEqual(clean, normalizeHelper_1.camelizeKeys(dirty));
});
ava_1.default('camelizeKeys works recursively', (t) => {
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
    t.deepEqual(clean, normalizeHelper_1.camelizeKeys(dirty));
});
ava_1.default('camelizeKeys handles empty keys and values', (t) => {
    const dirty = {
        foo_bar: undefined,
        bar_baz: null,
    };
    const clean = {
        fooBar: null,
        barBaz: null,
    };
    t.deepEqual(clean, normalizeHelper_1.camelizeKeys(dirty));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9ybWFsaXplSGVscGVyLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2hlbHBlcnMvbm9ybWFsaXplSGVscGVyLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4Q0FBdUI7QUFDdkIsdURBQWlEO0FBRWpELGFBQUksQ0FBQyxpREFBaUQsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQzVELE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDN0MsTUFBTSxLQUFLLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUNqRCxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSw4QkFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDMUMsQ0FBQyxDQUFDLENBQUM7QUFFSCxhQUFJLENBQUMsZ0NBQWdDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUMzQyxNQUFNLEtBQUssR0FBRztRQUNaLFFBQVEsRUFBRSxLQUFLO1FBQ2YsUUFBUSxFQUFFO1lBQ1IsYUFBYSxFQUFFLE1BQU07WUFDckIsWUFBWSxFQUFFO2dCQUNaLE1BQU0sRUFBRSxLQUFLO2dCQUNiLGVBQWUsRUFBRSxPQUFPO2FBQ3pCO1NBQ0Y7S0FDRixDQUFDO0lBRUYsTUFBTSxLQUFLLEdBQUc7UUFDWixPQUFPLEVBQUUsS0FBSztRQUNkLE9BQU8sRUFBRTtZQUNQLFdBQVcsRUFBRSxNQUFNO1lBQ25CLFdBQVcsRUFBRTtnQkFDWCxLQUFLLEVBQUUsS0FBSztnQkFDWixjQUFjLEVBQUUsT0FBTzthQUN4QjtTQUNGO0tBQ0YsQ0FBQztJQUVGLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLDhCQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUMxQyxDQUFDLENBQUMsQ0FBQztBQUVILGFBQUksQ0FBQyw0Q0FBNEMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQ3ZELE1BQU0sS0FBSyxHQUFHO1FBQ1osT0FBTyxFQUFFLFNBQVM7UUFDbEIsT0FBTyxFQUFFLElBQUk7S0FDZCxDQUFDO0lBRUYsTUFBTSxLQUFLLEdBQUc7UUFDWixNQUFNLEVBQUUsSUFBSTtRQUNaLE1BQU0sRUFBRSxJQUFJO0tBQ2IsQ0FBQztJQUVGLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLDhCQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUMxQyxDQUFDLENBQUMsQ0FBQyJ9