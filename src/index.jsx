// eslint-disable-next-line import/no-extraneous-dependencies
import React, { Component } from 'react';

class TreeNode extends Component {
  static defaultProps = {
    verticalMargin: 12,
    horizontalMargin: 20,
    itemWidth: 200,
    stroke: 'black',
    strokeWidth: 1,
    strokeOpacity: 0.25,
  };

  containerRef = null;

  rootRef = null;

  childrenRefs = [];

  state = {
    paths: [],
    width: 0,
    height: 0,
  };

  initPosition = () => {
    if (this.childrenRefs.length === 0) {
      return;
    }
    const { verticalMargin } = this.props;
    const paths = [];
    const containerRect = this.containerRef.getBoundingClientRect();
    const rootRect = this.rootRef.getBoundingClientRect();
    const py = rootRect.top - containerRect.top + rootRect.height;
    const px = rootRect.left - containerRect.left + rootRect.width / 2;
    paths.push([[px, py], [px, py + verticalMargin]]);
    let minX = px;
    let maxX = px;
    this.childrenRefs.forEach(v => {
      const rect = v.getBoundingClientRect();
      const y = rect.top - containerRect.top;
      const x = rect.left - containerRect.left + rect.width / 2;
      paths.push([[x, y - verticalMargin], [x, y]]);
      if (x < minX) {
        minX = x;
      }
      if (x > maxX) {
        maxX = x;
      }
    });
    paths.push([[minX, py + verticalMargin], [maxX, py + verticalMargin]]);

    this.setState({ paths, width: containerRect.width, height: containerRect.height });
  };

  componentDidMount() {
    this.initPosition();
  }

  // componentDidUpdate() {

  //   this.initPosition();
  // }

  render() {
    const {
      verticalMargin,
      horizontalMargin,
      itemWidth,
      stroke,
      strokeWidth,
      strokeOpacity,
      content,
      children,
    } = this.props;
    const { width, height, paths } = this.state;
    const d = paths
      .map(path =>
        path
          .map((v, i) => {
            if (i === 0) {
              return `M${v.join(' ')}`;
            }
            return `L${v.join(' ')}`;
          })
          .join(''),
      )
      .join('');

    return (
      <div
        style={{
          margin: `0 ${horizontalMargin}px`,
          position: 'relative',
          display: 'inline-block',
        }}
        ref={r => {
          this.containerRef = r;
        }}
      >
        <svg
          version="1.1"
          width={width}
          height={height}
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
        >
          <g
            fill="transparent"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeOpacity={strokeOpacity}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={d}></path>
          </g>
        </svg>
        <div
          style={{
            width: itemWidth,
            minHeight: 1,
            margin: `0 auto ${verticalMargin * 2}px auto`,
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
          }}
          ref={r => {
            this.rootRef = r;
          }}
        >
          {content}
        </div>
        <div style={{ display: 'flex' }}>
          {React.Children.map(children, (v, i) => (
            <div
              key={i}
              ref={r => {
                this.childrenRefs[i] = r;
              }}
            >
              {v}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default TreeNode;
