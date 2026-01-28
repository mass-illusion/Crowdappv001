import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const NextButtonSvg = (props: React.ComponentProps<typeof Svg>) => (
  <Svg width={60} height={60} viewBox="0 0 60 60" fill="none" {...props}>
    <Path d="M30 0C13.431 0 0 13.431 0 30s13.431 30 30 30 30-13.431 30-30S46.569 0 30 0zm0 56C16.561 56 4 43.439 4 30S16.561 4 30 4s26 12.561 26 26-12.561 26-26 26zm-2-38v8.586l-7.293-7.293-2.414 2.414L25.586 30l-7.293 7.293 2.414 2.414L28 33.414V42h4v-8.586l7.293 7.293 2.414-2.414L34.414 30l7.293-7.293-2.414-2.414L32 26.586V18h-4z" fill="#000"/>
  </Svg>
);

export default NextButtonSvg;
