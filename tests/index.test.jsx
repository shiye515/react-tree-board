import React from 'react';
import { mount } from 'enzyme';
import TreeNode from '../src';

describe('react-tree-board', () => {
  it('works', () => {
    const wrapper = mount(
      <TreeNode content={<div>root</div>}>
        <TreeNode content={<div>1</div>}></TreeNode>
        <TreeNode content={<div>2</div>}></TreeNode>
      </TreeNode>,
    );
    expect(wrapper.state('paths')).toHaveLength(4);
  });
  it('has no line if no children', () => {
    const wrapper = mount(<TreeNode content={<div>root</div>}></TreeNode>);
    expect(wrapper.state('paths')).toHaveLength(0);
  });
});
