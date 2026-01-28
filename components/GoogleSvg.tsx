import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface GoogleSvgProps {
  width?: number;
  height?: number;
}

const GoogleSvg: React.FC<GoogleSvgProps> = ({ width = 24, height = 24 }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24">
    <Path
      d="M21.35 11.1h-9.18v2.98h5.27c-.23 1.24-1.39 3.64-5.27 3.64-3.17 0-5.76-2.62-5.76-5.85s2.59-5.85 5.76-5.85c1.81 0 3.02.77 3.72 1.43l2.54-2.47C17.13 3.99 15.36 3 13.18 3 7.98 3 4 7.03 4 12s3.98 9 9.18 9c5.3 0 8.8-3.72 8.8-8.97 0-.6-.07-1.19-.18-1.93z"
      fill="#4285F4"
    />
  </Svg>
);

export default GoogleSvg;
