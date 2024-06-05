import { useEffect, useState } from "react";
import { Animated, View } from "react-native";
import type { SetStateAction, Dispatch } from "react";

import RadionGroup from './RadioGroup';

const HIDDEN_POS = -500;
const SHOW_POS = 0;

type Props = {
    isOpen: boolean,

    options: Array<
        {
            groupTitle: string,
            availableOptions: Array<string>,
            selectedOption: string,
            setOption: Dispatch<SetStateAction<string>>
        }
    >
}

export default function Settings({ isOpen, options }: Props) {
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

                {
                    options.map(({ groupTitle, availableOptions, selectedOption, setOption }, i) =>
                        <RadionGroup
                            key={i}
                            groupTitle={groupTitle}
                            options={availableOptions}
                            value={selectedOption}
                            setValue={setOption}
                        />
                    )
                }
            </Animated.ScrollView>
        </View>
    )
}
