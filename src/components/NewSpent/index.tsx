import {useCallback, useState} from 'react';

import {
  Button,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import Calendar from '../Calendar';
import colors from '../../constants/colors';
import Header from '../Header';

type ItemProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  currentItems: any;
  setCurrentItems: React.Dispatch<React.SetStateAction<any>>;
  saveToStorage: (newItems: any) => void;
};

export default function ({
  showModal,
  setShowModal,
  currentItems,
  setCurrentItems,
  saveToStorage,
}: ItemProps) {
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [spentDescription, setSpentDescription] = useState<string>('');
  const [spent, setNewSpent] = useState<string>('');

  const inputFocus = () => {
    if (showCalendar) {
      setShowCalendar(false);
    }

    setIsInputFocused(true);
  };

  const inputBlur = () => {
    setIsInputFocused(false);
  };

  const resetInputFields = useCallback(() => {
    setNewSpent('');
    setSpentDescription('');
    setSelectedDate('');
  }, []);

  const saveNewSpent = useCallback(
    async (newSpend: string, description: string, date: string) => {
      const oldItems = [...currentItems];

      oldItems.push({
        title: description,
        value: Number(newSpend),
        id: Math.random().toString(),
        date: date,
      });

      oldItems.sort(function (a: ItemProps, b: ItemProps) {
        return new Date(a.date) - new Date(b.date);
      });

      setCurrentItems(oldItems);
      await saveToStorage(oldItems);
    },
    [currentItems, saveToStorage, setCurrentItems],
  );

  return (
    <Modal
      animationType="slide"
      // transparent={true}
      visible={showModal}
      onRequestClose={() => {
        setShowModal(prevState => !prevState);
      }}
      style={{flex: 1, backgroundColor: 'red'}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1, backgroundColor: '#FDFFFC'}}>
        <ScrollView>
          <Header title="Novo gasto" />
          <View style={{flex: 1, paddingHorizontal: 16, paddingTop: 16}}>
            <Calendar
              setSelectedDate={setSelectedDate}
              selectedDate={selectedDate}
              setShowCalendar={setShowCalendar}
              showCalendar={showCalendar}
            />
            <TextInput
              keyboardType="numeric"
              placeholder="Valor"
              style={{
                borderWidth: 1,
                borderColor: '#1d1d1d',
                borderRadius: 4,
                marginTop: 16,
                padding: 8,
              }}
              onChangeText={text => setNewSpent(text)}
              value={spent}
              onFocus={inputFocus}
              onBlur={inputBlur}
            />
            <TextInput
              placeholder="Descrição"
              style={{
                borderWidth: 1,
                borderColor: '#1d1d1d',
                borderRadius: 4,
                marginTop: 16,
                minHeight: 200,
                textAlign: 'left',
                textAlignVertical: 'top',
                padding: 8,
              }}
              onChangeText={text => setSpentDescription(text)}
              value={spentDescription}
              multiline
              onFocus={inputFocus}
              onBlur={inputBlur}
            />
          </View>
        </ScrollView>
        <View
          style={{
            // gap: 16,
            marginTop: isInputFocused ? 16 : 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: isInputFocused ? 32 : 0,
          }}>
          <View style={{width: '45%'}}>
            <Button
              title="voltar"
              onPress={() => {
                resetInputFields();
                setShowModal(false);
              }}
              color={colors.blue}
            />
          </View>

          <View style={{width: '45%'}}>
            <Button
              title="salvar"
              onPress={() =>
                saveNewSpent(spent, spentDescription, selectedDate)
              }
              color={colors.blue}
              disabled={!spentDescription || !spent || !selectedDate}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
