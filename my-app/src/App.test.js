/* global jest, expect */

'use strict'

jest.unmock('./App');


import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils'

import { Button } from './App';

describe('Button', () => {
  let props = {};

  let setUp = () => {
    const instance = TestUtils.renderIntoDocument(
      <Button {...props} />
    );

    const buttonNode = ReactDOM.findDOMNode(instance);

    return {
      instance,
      buttonNode
    };
  };

  describe('disabled', () => {
    it('should be true when disabled', () => {
      props.disabled = true;

      const {buttonNode} = setUp();

      expect(buttonNode.disabled).toBeTruthy();
    });

    it('should be false when not disabled', () => {
      props.disabled = false;

      const {buttonNode} = setUp();

      expect(buttonNode.disabled).toBeFalsy();
    });
  });

  describe('label', () => {
    it('should be \'Submitting\' when disabled', () => {
      props.disabled = true;

      const {buttonNode} = setUp();

      expect(buttonNode.innerHTML).toEqual('Submitting');
    });

    it('should be \'Submitting\' when disabled', () => {
      props.disabled = false;

      const {buttonNode} = setUp();

      expect(buttonNode.innerHTML).toEqual('Submit');
    });
  });
});
