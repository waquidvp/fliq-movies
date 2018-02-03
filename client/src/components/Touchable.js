import React from 'react';
import PlatformTouchable from 'react-native-platform-touchable';

const Touchable = ({ style, children, ...props }) => {
  return (
    <PlatformTouchable style={style} {...props}>
      {children}
    </PlatformTouchable>
  );
};

export default Touchable;
