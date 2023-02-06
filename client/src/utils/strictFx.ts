import { curry, map, pipe, reduce } from '@fxts/core';

const _: any = {};

const makeString = (iter: any) => reduce((a, b) => `${a}${b}`, iter)!;

_.strMap = curry(pipe(map, makeString));

export default _;
