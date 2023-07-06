import {View, Text, Pressable, StyleSheet} from 'react-native';

import TrashCan from '../../../assets/delete_black_24dp.svg';

import Pencil from '../../../assets/edit_white_24dp.svg';
import colors from '../../constants/colors';

type ItemProps = {
  title: string;
  value: number;
  id: string;
  date: string;
  removeItem: (id: string) => void;
};

export default function ({title, value, id, date, removeItem}: ItemProps) {
  const editButtonTextStyle = {
    ...styles.removeButtonText,
    color: colors.white,
  };
  const editButtonStyle = {
    ...styles.removeButton,
    backgroundColor: colors.blue,
    borderColor: colors.blue,
  };

  return (
    <View style={styles.card}>
      <View style={styles.dateValue}>
        <Text style={styles.text}>{date?.split('-').reverse().join('/')}</Text>
        <Text style={styles.text}>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(value)}
        </Text>
      </View>
      <Text style={styles.text}>
        {title?.length >= 50 ? title.substring(0, 50).concat('...') : title}
      </Text>

      <View style={styles.buttonsContainer}>
        <Pressable
          android_ripple={{color: '#C1292E'}}
          onPress={() => removeItem(id)}
          style={styles.removeButton}>
          <Text style={styles.removeButtonText}>excluir</Text>
          <TrashCan />
        </Pressable>

        <Pressable
          // onPress={() => removeItem(id)}
          android_ripple={{color: '#ffffff'}}
          style={editButtonStyle}>
          <Text style={editButtonTextStyle}>editar</Text>
          <Pencil />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 'auto',
    padding: 16,
    borderBottomWidth: 2,
    borderBottomColor: colors.lightGray,
  },
  dateValue: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    marginBottom: 4,
    color: colors.darkGray,
    fontWeight: 'bold',
    fontSize: 14,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  removeButton: {
    padding: 4,
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    borderWidth: 2,
    borderColor: colors.redFade,
  },
  removeButtonText: {
    color: colors.red,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
