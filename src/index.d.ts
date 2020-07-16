// eslint-disable-next-line import/no-extraneous-dependencies
import * as React from 'react';

export interface Props {
  verticalMargin?: number;
  horizontalMargin?: number;
  itemWidth?: number;
  stroke?: string;
  strokeWidth?: number;
  strokeOpacity?: number;
}

// eslint-disable-next-line react/prefer-stateless-function
export default class TreeNode extends React.Component<Props> {}
