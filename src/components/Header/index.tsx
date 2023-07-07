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
      <View>
        <Image
          source={bg}
          style={{width: 90, height: 50, objectFit: 'cover'}}
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
              (accumulator: number, currentValue: {spentValue: number}) =>
                accumulator + currentValue.spentValue,
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
    // paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.yellow,
    height: 80,
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
