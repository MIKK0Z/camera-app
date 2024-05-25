import { View, Text } from 'react-native';

import RadioBtn from './RadioBtn';

type Props = {
    groupTitle: string,
    options: Array<string>,
}

export default function RadionGroup({ groupTitle, options }: Props) {
    return (
        <View>
            <Text style={{ fontSize: 36, color: 'white' }}>{groupTitle}</Text>
            {options.map((opt, i) => <RadioBtn value={opt} selected={false} key={i} />)}
        </View>
    )
}
