/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect, useCallback} from 'react';

import TrashCan from './assets/delete_forever_white_24dp.svg';

// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';

// import type {PropsWithChildren} from 'react';
import {
  Button,
  // SafeAreaView,
  // ScrollView,
  StatusBar,
  // StyleSheet,
  Text,
  useColorScheme,
  View,
  Modal,
  // Alert,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
} from 'react-native';

// import {Calendar} from 'react-native-calendars';

import {
  Colors,
  // DebugInstructions,
  // Header,
  // LearnMoreLinks,
  // ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
// import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
// import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
// import {DatePicker} from '@mui/x-date-pickers/DatePicker';
// import dayjs from 'dayjs';
import {Calendar} from 'react-native-calendars';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ListItem from './src/components/ListItem';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({children, title}: SectionProps): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

type ItemProps = {title: string; value: number; id: string};

// const items = [
//   {title: 'Compra epa', value: 150.0, id: Math.random().toString()},
//   {title: 'Compra epa', value: 150.0, id: Math.random().toString()},
//   {title: 'Compra epa', value: 150.0, id: Math.random().toString()},
// ];

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [showModal, setShowModal] = useState(false);

  const [selected, setSelected] = useState('');

  const [spend, setNewSpend] = useState<string>('');

  const [spendDescription, setSpendDescription] = useState<string>('');

  const [showCalendar, setShowCalendar] = useState(false);

  const [currentItems, setCurrentItems] = useState<ItemProps[]>([]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    (async () => {
      try {
        const value = await AsyncStorage.getItem('items');
        if (value !== null) {
          setCurrentItems(JSON.parse(value));
        }
      } catch (error) {
        // Error saving data
        console.log('error', error);
      }
    })();
  }, []);

  const resetInputFields = useCallback(() => {
    setNewSpend('');
    setSpendDescription('');
  }, []);

  const saveToStorage = useCallback(
    async (newItems: any) => {
      try {
        await AsyncStorage.setItem('items', JSON.stringify(newItems));
        resetInputFields();
        setShowModal(false);
      } catch (error) {
        // Error saving data
        console.log('error', error);
      }
    },
    [resetInputFields],
  );

  // console.log('currentItems', currentItems);

  const saveNewSpend = useCallback(
    async (newSpend: string, newDescription: string) => {
      const oldItems = [...currentItems];

      oldItems.push({
        title: newDescription,
        value: Number(newSpend),
        id: Math.random().toString(),
      });

      setCurrentItems(oldItems);
      await saveToStorage(oldItems);
    },
    [currentItems, saveToStorage],
  );

  const removeItem = useCallback(
    (itemId: string) => {
      const newItems = [...currentItems.filter(i => i.id !== itemId)];

      setCurrentItems(newItems);

      saveToStorage(newItems);

      resetInputFields();

      return itemId;
    },
    [currentItems, resetInputFields, saveToStorage],
  );

  // const Item = ({title, value, id}: ItemProps) => (
  //   <View
  //     // eslint-disable-next-line react-native/no-inline-styles
  //     style={{
  //       flex: 1,
  //       height: 'auto',
  //       backgroundColor: 'red',
  //       padding: 16,
  //       marginBottom: 8,
  //     }}>
  //     <Text style={{color: '#fff'}}>{title}</Text>
  //     <Text style={{color: '#fff'}}>
  //       {new Intl.NumberFormat('pt-BR', {
  //         style: 'currency',
  //         currency: 'BRL',
  //       }).format(value)}
  //     </Text>
  //     <Pressable
  //       onPress={() => removeItem(id)}
  //       style={{
  //         backgroundColor: 'blue',
  //         padding: 8,
  //         width: '50%',
  //       }}>
  //       <Text>REMOVER</Text>
  //       <TrashCan />
  //     </Pressable>
  //   </View>
  // );

  const inputFocus = () => {
    if (showCalendar) {
      setShowCalendar(false);
    }
  };

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <Modal
        animationType="slide"
        // transparent={true}
        visible={showModal}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setShowModal(prevState => !prevState);
        }}
        style={{flex: 1, backgroundColor: 'red', padding: 16}}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1, padding: 16, backgroundColor: 'red'}}>
          <ScrollView style={{flex: 1}}>
            {/* <View style={{flex: 1, backgroundColor: 'blue'}} /> */}
            {showCalendar && (
              <Calendar
                onDayPress={day => {
                  setSelected(day.dateString);
                  setShowCalendar(false);
                }}
                markedDates={{
                  [selected]: {
                    selected: true,
                    disableTouchEvent: true,
                    // selectedDotColor: 'orange',
                  },
                }}
                style={{borderRadius: 4}}
              />
              // <LocalizationProvider dateAdapter={AdapterDayjs}>
              //   <DemoContainer components={['DatePicker']}>
              //     <DatePicker
              //       label="Uncontrolled picker"
              //       defaultValue={dayjs('2022-04-17')}
              //     />
              //   </DemoContainer>
              // </LocalizationProvider>
            )}
            {!showCalendar && (
              <Pressable
                onPress={() => setShowCalendar(true)}
                style={{
                  borderWidth: 2,
                  borderColor: '#fff',
                  padding: 8,
                  borderRadius: 4,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: 16,
                }}>
                <Text>Data selecionada:</Text>
                <Text>{selected}</Text>
              </Pressable>
            )}
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
              onChangeText={text => setNewSpend(text)}
              value={spend}
              onFocus={inputFocus}
            />
            <TextInput
              // keyboardType="numeric"
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
              onChangeText={text => setSpendDescription(text)}
              value={spendDescription}
              multiline
              onFocus={inputFocus}
            />
          </ScrollView>
          <View
            style={{
              // padding: 16,
              gap: 16,
              marginTop: 16,
            }}>
            <View>
              <Button
                title="salvar"
                onPress={
                  () => saveNewSpend(spend, spendDescription)
                  // setShowModal(false)}
                }
              />
            </View>
            <View>
              <Button
                title="cancelar"
                onPress={() => {
                  resetInputFields();
                  setShowModal(false);
                }}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      <View
        style={{
          paddingVertical: 8,
          paddingHorizontal: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 24,
          }}>
          Meus Gastos
        </Text>
        <Text>
          Total:
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(
            currentItems?.reduce(
              (accumulator, currentValue) => accumulator + currentValue.value,
              0,
            ),
          )}
        </Text>
      </View>

      <FlatList
        data={currentItems}
        renderItem={({item}) => (
          <ListItem
            title={item.title}
            value={item.value}
            id={item.id}
            removeItem={removeItem}
          />
          // <Item title={item.title} value={item.value} id={item.id} />
        )}
        style={{flexGrow: 1}}
        keyExtractor={item => item.id}
        contentContainerStyle={{flexGrow: 1}}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              // flexGrow: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'pink',
            }}>
            <Text>tem nada aqui n</Text>
          </View>
        )}
      />

      {/* <ScrollView>
        {items.map((item: {title: string; value: string; key: Key}) => (
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              flex: 1,
              height: 100,
              backgroundColor: 'red',
              padding: 16,
              marginBottom: 8,
            }}
            key={item.key}>
            <Text style={{color: '#fff'}}>{item.title}</Text>
            <Text style={{color: '#fff'}}>{item.value}</Text>
          </View>
        ))}
      </ScrollView> */}
      <View>
        <Button
          title="NOVA DESPESA"
          onPress={() => {
            setShowModal(true);
          }}
        />
      </View>
      <View>
        <ScrollView
          style={{
            marginTop: 8,
            gap: 4,
            backgroundColor: 'green',
            height: 'auto',
          }}
          horizontal>
          <View
            style={{
              marginHorizontal: 4,
              height: 40,
              width: 40,
              backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>JAN</Text>
          </View>
          <View
            style={{
              marginHorizontal: 4,
              height: 40,
              width: 40,
              backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>FEV</Text>
          </View>
          <View
            style={{
              marginHorizontal: 4,
              height: 40,
              width: 40,
              backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>MAR</Text>
          </View>
          <View
            style={{
              marginHorizontal: 4,
              height: 40,
              width: 40,
              backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>ABR</Text>
          </View>
          <View
            style={{
              marginHorizontal: 4,
              height: 40,
              width: 40,
              backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>MAI</Text>
          </View>
          <View
            style={{
              marginHorizontal: 4,
              height: 40,
              width: 40,
              backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>JUN</Text>
          </View>
          <View
            style={{
              marginHorizontal: 4,
              height: 40,
              width: 40,
              backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>JUL</Text>
          </View>
          <View
            style={{
              marginHorizontal: 4,
              height: 40,
              width: 40,
              backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>AGO</Text>
          </View>
          <View
            style={{
              marginHorizontal: 4,
              height: 40,
              width: 40,
              backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>SET</Text>
          </View>
          <View
            style={{
              marginHorizontal: 4,
              height: 40,
              width: 40,
              backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>OUT</Text>
          </View>
          <View
            style={{
              marginHorizontal: 4,
              height: 40,
              width: 40,
              backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>NOV</Text>
          </View>
          <View
            style={{
              marginHorizontal: 4,
              height: 40,
              width: 40,
              backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>DEZ</Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

export default App;
