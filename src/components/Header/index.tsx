import {Text, View, StyleSheet} from 'react-native';
import colors from '../../constants/colors';

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
      <Text style={styles.title}>{title ? title : 'Meus Gastos'}</Text>

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
    paddingVertical: 24,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.yellowFade,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: colors.black,
  },
  total: {
    color: colors.black,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
