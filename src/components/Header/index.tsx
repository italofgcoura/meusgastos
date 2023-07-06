import {Text, View, StyleSheet, Image} from 'react-native';
import colors from '../../constants/colors';

import bg from '../../../assets/default_765x625.png';

type ItemProps = {
  currentItems?: any;
  title?: string;
};

export default function ({currentItems, title}: ItemProps) {
  return (
    <View
      style={
        currentItems
          ? styles.container
          : {...styles.container, justifyContent: 'center'}
      }>
      <View style={{alignItems: 'center', backgroundColor: 'red'}}>
        <Image
          source={bg}
          style={{width: 135, height: 80, objectFit: 'contain'}}
        />
      </View>
      <Text style={styles.title}>{title ? title : ''}</Text>

      {currentItems && (
        <Text style={styles.total}>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(
            currentItems?.reduce(
              (accumulator: number, currentValue: {value: number}) =>
                accumulator + currentValue.value,
              0,
            ),
          )}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.yellow,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: colors.blackFade,
  },
  total: {
    color: colors.blackFade,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
