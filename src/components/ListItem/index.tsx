import {View, Text, Pressable, StyleSheet, Modal, Button} from 'react-native';

import TrashCan from '../../../assets/delete_black_24dp.svg';

import Pencil from '../../../assets/edit_white_24dp.svg';
import colors from '../../constants/colors';
import {useState} from 'react';

import {Spent} from '../../interfaces/spent';

type ItemProps = {
  description: string;
  spentValue: number;
  id: string;
  date: string;
  removeItem: (id: string) => void;
  onEditPress: (item: Spent) => void;
};

export default function ({
  description,
  spentValue,
  id,
  date,
  removeItem,
  onEditPress,
}: ItemProps) {
  const [showModal, setShowModal] = useState<boolean>(false);

  const editButtonTextStyle = {
    ...styles.removeButtonText,
    color: colors.white,
  };
  const editButtonStyle = {
    ...styles.removeButton,
    backgroundColor: colors.blue,
    borderColor: colors.blue,
  };

  console.log(spentValue);

  return (
    <>
      <Modal visible={showModal} animationType="fade" transparent>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            gap: 16,
            padding: 16,
            backgroundColor: colors.blackFade,
          }}>
          <View
            style={{
              justifyContent: 'center',
              gap: 24,
              padding: 24,
              backgroundColor: colors.white,
              borderRadius: 4,
            }}>
            <Text
              style={{textAlign: 'center', fontSize: 16, color: colors.black}}>
              Deseja realmente excluir o item selecionado?
            </Text>
            <Text
              style={{textAlign: 'center', fontSize: 16, color: colors.black}}>
              Esta ação não pode ser desfeita.
            </Text>

            <Button
              onPress={() => setShowModal(false)}
              title="NÃO, voltar para meus gastos"
              color={colors.blue}
            />

            <Button
              onPress={() => removeItem(id)}
              title="SIM, desejo excluir"
              color={colors.red}
            />
          </View>
        </View>
      </Modal>
      <View style={styles.card}>
        <View style={styles.dateValue}>
          <Text style={styles.text}>
            {date.toString()?.split('T')[0].split('-').reverse().join('/')}
            {/* {date.toString()} */}
          </Text>
          <Text style={styles.text}>
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(spentValue)}
          </Text>
        </View>
        <Text style={styles.text}>
          {description?.length >= 50
            ? description.substring(0, 50).concat('...')
            : description}
        </Text>

        <View style={styles.buttonsContainer}>
          <Pressable
            android_ripple={{color: colors.redFade}}
            onPress={() => setShowModal(true)}
            style={styles.removeButton}>
            <Text style={styles.removeButtonText}>excluir</Text>
            <TrashCan />
          </Pressable>

          <Pressable
            onPress={() =>
              onEditPress({
                description,
                spentValue,
                id,
                date,
              })
            }
            android_ripple={{color: '#ffffff'}}
            style={editButtonStyle}>
            <Text style={editButtonTextStyle}>editar</Text>
            <Pencil />
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 'auto',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    position: 'relative',
  },
  viewMore: {
    position: 'absolute',
    right: 16,
    bottom: 4,
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
