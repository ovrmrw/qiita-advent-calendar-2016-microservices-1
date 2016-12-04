import * as assert from 'power-assert';

import { createHelloMessage, createWelcomeMessage } from '../../lib/repository';


describe('Unit Test', () => {

  it('createWelcomeMessage', () => {
    const result = createWelcomeMessage();
    console.log(result);
    assert(result.includes('This is root.'));
  });


  it('createHelloMessage', () => {
    const result = createHelloMessage();
    console.log(result);
    assert(result.includes('Hello world, you.'));
  });

  it('createHelloMessage', () => {
    const name = 'foo';
    const result = createHelloMessage(name);
    console.log(result);
    assert(result.includes('Hello world, foo.'));
  });

});
