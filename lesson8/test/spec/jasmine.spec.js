const sum = require('../sum');
const sub = require('../sub');
const mult = require('../mult');
const div = require('../div');
describe('проверка сложения', () => {
    it('проверка 3 + 2', () =>{
        expect(sum(3,2)).toBe(5);
    });
    it('если одно из чисел null => null', () =>{
         expect(sum(null, 3)).toBeNull()
    });
    it('если одно из чисел string => string', () =>{
        expect(sum('строка', 3)).toBe("string")
    });
    it('если одно из чисел undefined => undefined', () =>{
        expect(sum(undefined, 3)).toBeUndefined()
    });
});

describe('проверка  вычитания', () => {
    it('проверка 3 - 2', () =>{
        expect(sub(3,2)).toBe(1);
    });
    it('если одно из чисел null => null', () =>{
        expect(sub(null, 3)).toBeNull()
    });
    it('если одно из чисел string => string', () =>{
        expect(sub('строка', 3)).toBe("string")
    });
    it('если одно из чисел undefined => undefined', () =>{
        expect(sub(undefined, 3)).toBeUndefined()
    });
});

describe('проверка умножения', () => {
    it('проверка 3 * 2', () =>{
        expect(mult(3,2)).toBe(6);
    });
    it('если одно из чисел null => null', () =>{
        expect(mult(null, 3)).toBeNull()
    });
    it('если одно из чисел string => string', () =>{
        expect(mult('строка', 3)).toBe("string")
    });
    it('если одно из чисел undefined => undefined', () =>{
        expect(mult(undefined, 3)).toBeUndefined()
    });
});

describe('проверка деления', () => {
    it('проверка 6 / 2', () =>{
        expect(div(6,2)).toBe(3);
    });
    it('если одно из чисел null => null', () =>{
        expect(div(null, 3)).toBeNull()
    });
    it('если одно из чисел string => string', () =>{
        expect(div('строка', 3)).toBe("string")
    });
    it('если одно из чисел undefined => undefined', () =>{
        expect(div(undefined, 3)).toBeUndefined()
    });
});