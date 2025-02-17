import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import { useGestures } from '../hooks/useGestures';
import { useImageLayout } from '../hooks/useImageLayout';

import type { ImageZoomProps } from '../types';
import FastImage, { FastImageProps } from 'react-native-fast-image';

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
});

const ImageZoom: React.FC<ImageZoomProps> = ({
  uri = '',
  minScale,
  maxScale,
  minPanPointers,
  maxPanPointers,
  isPanEnabled,
  isPinchEnabled,
  onInteractionStart,
  onInteractionEnd,
  onPinchStart,
  onPinchEnd,
  onPanStart,
  onPanEnd,
  onResetAnimationEnd,
  onLayout,
  style = {},
  ...props
}) => {
  const { center, onImageLayout } = useImageLayout({ onLayout });
  const { animatedStyle, gestures } = useGestures({
    center,
    minScale,
    maxScale,
    minPanPointers,
    maxPanPointers,
    isPanEnabled,
    isPinchEnabled,
    onInteractionStart,
    onInteractionEnd,
    onPinchStart,
    onPinchEnd,
    onPanStart,
    onPanEnd,
    onResetAnimationEnd,
  });

  const AnimatedFastImage = Animated.createAnimatedComponent(
    FastImage as FC<FastImageProps>
  );

  return (
    <GestureDetector gesture={gestures}>
      <AnimatedFastImage
        style={[styles.image, style, animatedStyle]}
        source={uri}
        resizeMode="cover"
        onLayout={onImageLayout}
        {...props}
      />
    </GestureDetector>
  );
};

export default ImageZoom;
