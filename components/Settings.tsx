import { useEffect, useState } from "react";
import { ScrollView, Text, Animated, View, Button } from "react-native";

const HIDDEN_POS = -500;
const SHOW_POS = 0;

type Props = {
    isOpen: boolean,
}

export default function Settings({ isOpen }: Props) {
    const [currPos, _setCurrPos] = useState(new Animated.Value(HIDDEN_POS));

    const toggle = () => {
        Animated.spring(
            currPos,
            {
                toValue: isOpen ? SHOW_POS : HIDDEN_POS,
                velocity: 1,
                tension: 1,
                friction: 10,
                useNativeDriver: true,
            }
        ).start();
    }

    useEffect(() => {
        toggle();
    }, [isOpen])

    return (
        <View style={{ flex: 1, position: 'absolute', width: '50%', height: '100%' }}>

            <Animated.ScrollView
                style={[
                    { backgroundColor: 'rgba(0, 0, 0, .5)', height: '100%', width: '100%' },
                    {
                        transform: [
                            { translateX: currPos }
                        ]
                    }]}
            >
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
                <Text>ANIMATE ME!</Text>
            </Animated.ScrollView>
        </View>
    )
}