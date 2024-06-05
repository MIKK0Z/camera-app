import { View, Text } from 'react-native';
import type { SetStateAction, Dispatch } from "react";

import RadioBtn from './RadioBtn';

type Props = {
    groupTitle: string,
    options: Array<string>,
    value: string,
    setValue: Dispatch<SetStateAction<any>>,
}

export default function RadionGroup({ groupTitle, options, setValue, value }: Props) {
    return (
        <View>
            <Text style={{ fontSize: 36, color: 'white', marginLeft: 16 }}>{groupTitle}</Text>
            {options.map((opt, i) => <RadioBtn value={opt} selected={value === opt} setValue={setValue} key={i} />)}
        </View>
    )
}
