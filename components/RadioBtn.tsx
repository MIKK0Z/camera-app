import { Text, TouchableOpacity } from 'react-native';
import type { SetStateAction, Dispatch } from 'react';

type Props = {
    value: string,
    selected: boolean,
    setValue: Dispatch<SetStateAction<string>>,
}

export default function RadioBtn({ value, selected, setValue }: Props) {
    return (
        <TouchableOpacity
            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
            onPress={() => {
                setValue(_ => value);
            }}
        >
            <Text style={{ fontFamily: 'Material-Icons', fontSize: 28, margin: 4, color: 'white' }}>{selected ? 'radio_button_checked' : 'radio_button_unchecked'}</Text>
            <Text style={{ fontSize: 24, color: 'white' }}>{value}</Text>
        </TouchableOpacity>
    )
}
