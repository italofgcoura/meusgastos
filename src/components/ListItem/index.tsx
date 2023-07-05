import {View, Text, Pressable} from 'react-native';

import TrashCan from '../../../assets/delete_forever_white_24dp.svg';

type ItemProps = {
  title: string;
  value: number;
  id: string;
  removeItem: (id: string) => void;
};

export default function ({title, value, id, removeItem}: ItemProps) {
  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flex: 1,
        height: 'auto',
        backgroundColor: 'red',
        padding: 16,
        marginBottom: 8,
      }}>
      <Text style={{color: '#fff'}}>{title}</Text>
      <Text style={{color: '#fff'}}>
        {new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(value)}
      </Text>
      <Pressable
        onPress={() => removeItem(id)}
        style={{
          backgroundColor: 'blue',
          padding: 8,
          width: '50%',
        }}>
        <Text>REMOVER</Text>
        <TrashCan />
      </Pressable>
    </View>
  );
}
