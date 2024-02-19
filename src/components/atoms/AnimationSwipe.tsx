import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  LayoutAnimation,
  PanResponder,
  UIManager
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_THRESHOLD = 5;
const SWIPE_OUT_DURATION = 250;
const DIRECTION_RIGHT = "right";
const DIRECTION_LEFT = "left";

type AnimationSwipeProps = {
  onSwipeRight?: () => void;
  onSwipeLeft?: () => void;
  onCompleteFunction?: (props?: any) => void;
  children: JSX.Element | JSX.Element[];
};
type directionProps = "right" | "left";

const AnimationSwipe = ({
  children,
  onSwipeRight = () => {},
  onSwipeLeft = () => {},
  onCompleteFunction = () => {},
}: AnimationSwipeProps) => {
  const position = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: position.x, dy: position.y }],
        {
          useNativeDriver: false,
        }
      ),
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SCREEN_THRESHOLD) {
          forceSwipe(DIRECTION_RIGHT);
        } else if (gesture.dx < -SCREEN_THRESHOLD) {
          forceSwipe(DIRECTION_LEFT);
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-5 * SCREEN_WIDTH, 0, 5 * SCREEN_WIDTH],
      outputRange: ["-40deg", "0deg", "40deg"],
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
    onCompleteFunction();
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
    <Animated.View style={getCardStyle()} {...panResponder.panHandlers}>
      {children}
    </Animated.View>
  );
};

export default AnimationSwipe;
