/* eslint-disable react/no-unused-state */
import React from 'react';
import TreeNode from '../src';

export default class SimpleDemo extends React.Component {
  state = {
    data: {
      title: 'root',
      children: [
        { title: '1.1', children: [{ title: '1.1.1' }, { title: '1.1.2' }] },
        { title: '1.2' },
      ],
    },
  };

  render() {
    // const { data } = this.state;

    // const renderTree = nodeData => (
    //   <TreeNode content={<div style={{ border: '1px solid rgba(0,0,0,0.25)',
    // boxShadow: '0 2px 8px 0 rgba(0,0,0,0.25)' }}
    // key={nodeData.title}>{nodeData.title}</div>}>
    //     {nodeData.children ? nodeData.children.map(v => renderTree(v)) : null}
    //   </TreeNode>
    // );
    const nodeStyle = {
      background: 'white',
      borderRadius: 4,
      boxShadow: '0 2px 8px 0 rgba(0,0,0,0.09)',
    };
    const bigNodeStyle = {
      ...nodeStyle,
      height: 90,
    };
    return (
      <div style={{ overflow: 'scroll', padding: 20 }}>
        <TreeNode content={<div style={nodeStyle}>root</div>}>
          <TreeNode content={<div style={bigNodeStyle}>1.1</div>}>
            <TreeNode
              content={
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div>1.1.1</div>
                </div>
              }
            >
              <TreeNode content={<div style={nodeStyle}>1.1.1.1</div>}></TreeNode>
              <TreeNode content={<span>1.1.1.2</span>}></TreeNode>
            </TreeNode>
          </TreeNode>
          <TreeNode content={<div style={nodeStyle}>1.2</div>}>
            <TreeNode content={<div style={nodeStyle}>1.2.1</div>}></TreeNode>
            <TreeNode content={<div style={nodeStyle}>1.2.2(间距30px)</div>} verticalMargin={30}>
              <TreeNode content={<div style={nodeStyle}>1.2.2.1</div>}></TreeNode>
              <TreeNode content={<div style={nodeStyle}>1.2.2.2</div>}></TreeNode>
            </TreeNode>
            <TreeNode content={<div style={nodeStyle}>1.2.3</div>}></TreeNode>
          </TreeNode>
        </TreeNode>
        {/* {renderTree(data)} */}
      </div>
    );
  }
}
