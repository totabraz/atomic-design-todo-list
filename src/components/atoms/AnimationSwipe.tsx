import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  LayoutAnimation,
  PanResponder,
  UIManager,
} from "react-native";
import { SPACES } from "../../constants/sizes";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_THRESHOLD = 0.05 * Dimensions.get("window").width;
const SWIPE_OUT_DURATION = 250;
const DIRECTION_RIGHT = "right";
const DIRECTION_LEFT = "left";

type directionProps = "right" | "left";
type AnimationSwipeProps = {
  toggleOnAnimation?: () => void;
  onSwipeRight?: () => void;
  onSwipeLeft?: () => void;
  children: JSX.Element | JSX.Element[];
};

const AnimationSwipe = ({
  children,
  toggleOnAnimation = () => {},
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
        toggleOnAnimation();
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
        toggleOnAnimation();
        return true;
      },
    })
  ).current;

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-5 * SCREEN_WIDTH, 0, 5 * SCREEN_WIDTH],
      outputRange: ["-00deg", "0deg", "00deg"],
    });
    return {
      transform: [...position.getTranslateTransform(), { rotate }],
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
    const x = direction === DIRECTION_RIGHT ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(position, {
      useNativeDriver: true,
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
    }).start(() => {
      onSwipeComplete(direction);
    });
  };

  return (
    <Animated.View
      style={[
        {
          marginBottom: SPACES.XL,
        },
        getCardStyle(),
      ]}
      {...panResponder.panHandlers}
    >
      {children}
    </Animated.View>
  );
};

export default AnimationSwipe;


