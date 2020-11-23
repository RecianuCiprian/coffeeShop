import React, {useRef} from 'react';
import {PanResponder, Animated, Dimensions} from "react-native";

const SWIPE_THRESHOLD = 125;
const SCREEN_WIDTH = Dimensions.get('window').width;
const DURATION = 500

const Deck: React.FC<any> = ({children, onChange}) => {
    const position = useRef(new Animated.ValueXY()).current
    const resetPosition = () => {
        Animated.spring(position, {
            toValue: {x: 0, y: 0},
            useNativeDriver: true
        }).start()
    }
    const forceSwipe = (direction) => {
        const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
        Animated.timing(position, {
            toValue: {x, y: 0},
            duration: DURATION,
            useNativeDriver: true,
        }).start(() =>{
            onChange()
        });
    }
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                position.setOffset({
                    x: position.x._value,
                    y: position.y._value,
                })
            },
            onPanResponderMove: (_, gesture) => {
                position.setValue({x: gesture.dx, y: gesture.dy})
            },
            onPanResponderRelease: (event, gesture) => {
                if (gesture.dx > SWIPE_THRESHOLD) {
                    forceSwipe('right')
                } else if (gesture.dx < -SWIPE_THRESHOLD) {
                    forceSwipe('left')
                } else {
                    resetPosition()
                }
            },
        })
    ).current
    const getCardStyle = (position) => {
        const rotate = position.x.interpolate({
            inputRange: [-(SCREEN_WIDTH * 1.5), 0, SCREEN_WIDTH * 1.5],
            outputRange: ['-120deg', '0deg', '120deg'],
        })
        return {
            transform: [...position.getTranslateTransform(), {rotate}],
        }
    }

    return (<Animated.View
        style={getCardStyle(position)}
        {...panResponder.panHandlers}
    >
        {children}
    </Animated.View>);
};

export default Deck;
