import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  LayoutAnimation,
  PanResponder,
  StyleSheetProperties,
  UIManager,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_THRESHOLD = 0.05 * Dimensions.get("window").width;
const SWIPE_OUT_DURATION = 250;
const DIRECTION_RIGHT = "right";
const DIRECTION_LEFT = "left";

type directionProps = "right" | "left";
type AnimationSwipeProps = {
  handleScrollStatus?: () => void;
  onSwipeRight?: () => void;
  onSwipeLeft?: () => void;
  children: JSX.Element | JSX.Element[];
};

const AnimationSwipe = ({
  children,
  handleScrollStatus = () => {},
  onSwipeRight = () => {},
  onSwipeLeft = () => {},
}: AnimationSwipeProps) => {
  const position = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponderCapture: () => true,
      onStartShouldSetPanResponder: (_, gesture) => {
        handleScrollStatus();
        return true;
      },
      onPanResponderMove: Animated.event([null, { dx: position.x }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (event, { dx, vx }) => {
        if (dx > SCREEN_THRESHOLD) {
          forceSwipe(DIRECTION_RIGHT);
        } else if (dx < -SCREEN_THRESHOLD) {
          forceSwipe(DIRECTION_LEFT);
        }
        resetPosition();
      },
      onPanResponderTerminationRequest: () => {
        handleScrollStatus();
        return true;
      },
    })
  ).current;

  const getCardStyle = () => {
    return {
       transform: [{
        translateX: position.x.interpolate({
            inputRange: [ - SCREEN_WIDTH /3, 0, SCREEN_WIDTH /3 ],
            outputRange: [ - SCREEN_WIDTH /3, 0, SCREEN_WIDTH /3 ],
            extrapolate: 'clamp'
        })
    }],
      

    };
  };

  const resetPosition = () => {
    Animated.spring(position, {
      useNativeDriver: true,
      toValue: { x: 0, y: 0 },
    }).start();
  };

  const onSwipeComplete = (direction: directionProps) => {
    direction === DIRECTION_RIGHT ? onSwipeRight() : onSwipeLeft();
    position.setValue({ x: 0, y: 0 });
  };

  const forceSwipe = (direction: directionProps = DIRECTION_RIGHT) => {
    const moveLimit = SCREEN_WIDTH / 3;
    const x = direction === DIRECTION_RIGHT ? moveLimit : -moveLimit;
    Animated.timing(position, {
      useNativeDriver: true,
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
    }).start(() => {
      onSwipeComplete(direction);
    });
  };

  return (
    <Animated.View style={getCardStyle()} {...panResponder.panHandlers}>
      {children}
    </Animated.View>
  );
};

export default AnimationSwipe;
