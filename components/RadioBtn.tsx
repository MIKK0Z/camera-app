import { View, Text } from 'react-native';

type Props = {
    value: string,
    selected: boolean,
}

export default function RadioBtn({ value, selected }: Props) {
    return (
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontFamily: 'Material-Icons', fontSize: 28, margin: 4 }}>{selected ? 'radio_button_checked' : 'radio_button_unchecked'}</Text>
            <Text style={{ fontSize: 24 }}>{value}</Text>
        </View>
    )
}
