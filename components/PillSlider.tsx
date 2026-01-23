import React, { useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

export interface PillSliderProps {
  value: number;
  onValueChange: (v: number) => void;
  onSlidingComplete?: (v: number) => void;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  trackHeight?: number;
  trackRadius?: number;
  thumbSize?: number;
  minimumTrackTintColor?: string;
  maximumTrackTintColor?: string;
  thumbColor?: string;
  containerStyle?: any;
}

export default function PillSlider({
  value,
  onValueChange,
  onSlidingComplete,
  minimumValue = 0,
  maximumValue = 1,
  step = 0.01,
  trackHeight = 18,
  trackRadius = 9,
  thumbSize = 24,
  minimumTrackTintColor = '#2563EB',
  maximumTrackTintColor = '#E5E7EB',
  thumbColor = '#2563EB',
  containerStyle,
}: PillSliderProps) {
  const [trackWidth, setTrackWidth] = useState(0);
  const [dragging, setDragging] = useState(false);
  const trackRef = useRef<View>(null);

  const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);
  const roundToStep = (n: number) => {
    if (!step) return n;
    return Math.round(n / step) * step;
  };

  const percent = useMemo(() => {
    const range = maximumValue - minimumValue;
    if (range <= 0) return 0;
    return clamp((value - minimumValue) / range, 0, 1);
  }, [value, minimumValue, maximumValue]);

  const onGestureEvent = (evt: any) => {
    if (!trackWidth) return;
    const x = evt?.nativeEvent?.x ?? 0;
    const pct = clamp(x / trackWidth, 0, 1);
    const range = maximumValue - minimumValue;
    const rawVal = minimumValue + pct * range;
    const v = roundToStep(rawVal);
    onValueChange(v);
  };

  const onHandlerStateChange = (evt: any) => {
    const state = evt?.nativeEvent?.state;
    if (state === State.BEGAN || state === State.ACTIVE) {
      setDragging(true);
    }
    if (state === State.END || state === State.CANCELLED || state === State.FAILED) {
      setDragging(false);
      const x = evt?.nativeEvent?.x ?? 0;
      const pct = clamp(x / trackWidth, 0, 1);
      const range = maximumValue - minimumValue;
      const rawVal = minimumValue + pct * range;
      const v = roundToStep(rawVal);
      if (onSlidingComplete) onSlidingComplete(v);
    }
  };

  // PanResponder removed in favor of PanGestureHandler for better ScrollView interop

  const filledWidth = trackWidth * percent;
  const thumbLeft = clamp(filledWidth - thumbSize / 2, 0, Math.max(trackWidth - thumbSize, 0));

  const translateY = -(thumbSize / 2);
  return (
    <View style={[styles.container, { height: Math.max(trackHeight, thumbSize) }, containerStyle]}>
      <PanGestureHandler
        activeOffsetX={[-2, 2]} // Lower threshold for more sensitivity
        failOffsetY={[-12, 12]} // Allow more vertical wiggle
        hitSlop={{ left: 16, right: 16, top: 16, bottom: 16 }} // Easier to grab
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
      <View
        ref={trackRef}
        style={[styles.track, { height: trackHeight, borderRadius: trackRadius, backgroundColor: maximumTrackTintColor }]}
        onLayout={(e) => {
          setTrackWidth(e.nativeEvent.layout.width);
        }}
        pointerEvents="box-only"
      >
        <View pointerEvents="none" style={[styles.filled, { width: filledWidth, height: trackHeight, borderRadius: trackRadius, backgroundColor: minimumTrackTintColor }]} />
        <View pointerEvents="none" style={[styles.thumb, { width: thumbSize, height: thumbSize, borderRadius: thumbSize / 2, left: thumbLeft, backgroundColor: thumbColor, borderWidth: 3, borderColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 4, transform: [{ translateY }] }]} />
      </View>
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: 'center' },
  track: { width: '100%', position: 'relative', overflow: 'hidden' },
  filled: { position: 'absolute', left: 0, top: 0 },
  thumb: { position: 'absolute', top: '50%', elevation: 3 },
});
