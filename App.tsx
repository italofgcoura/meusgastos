import React, {useState, useEffect, useCallback} from 'react';

import {
  Button,
  StatusBar,
  Text,
  useColorScheme,
  View,
  // Modal,
  FlatList,
  // TextInput,
  // KeyboardAvoidingView,
  // Platform,
  ScrollView,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ListItem from './src/components/ListItem';

import Header from './src/components/Header';
// import Calendar from './src/components/Calendar';
// import colors from './src/constants/colors';
import NewSpent from './src/components/NewSpent';

type ItemProps = {title: string; value: number; id: string; date: string};

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [showModal, setShowModal] = useState<boolean>(false);

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

  const saveToStorage = useCallback(async (newItems: any) => {
    try {
      await AsyncStorage.setItem('items', JSON.stringify(newItems));

      setShowModal(false);
    } catch (error) {
      // Error saving data
      console.log('error', error);
    }
  }, []);

  const removeItem = useCallback(
    (itemId: string) => {
      const newItems = [...currentItems.filter(i => i.id !== itemId)];

      setCurrentItems(newItems);

      saveToStorage(newItems);

      return itemId;
    },
    [currentItems, saveToStorage],
  );

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
        hidden
      />

      <NewSpent
        showModal={showModal}
        setShowModal={setShowModal}
        currentItems={currentItems}
        setCurrentItems={setCurrentItems}
        saveToStorage={saveToStorage}
      />

      <Header currentItems={currentItems} />
      {/* <View style={{padding: 16, flexGrow: 1}}> */}
      <FlatList
        data={currentItems}
        renderItem={({item}) => (
          <ListItem
            title={item.title}
            value={item.value}
            id={item.id}
            date={item.date}
            removeItem={removeItem}
          />
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
      {/* </View> */}
      <View>
        <Button
          title="NOVA DESPESA"
          onPress={() => {
            setShowModal(true);
          }}
          color={'#235789'}
        />
      </View>
      <View>
        <ScrollView
          style={{
            marginTop: 16,
            // marginBottom: 8,
            gap: 4,
            // backgroundColor: 'green',
            height: 'auto',
            paddingBottom: 16,
          }}
          horizontal>
          <View
            style={{
              marginHorizontal: 4,
              height: 40,
              width: 40,
              // backgroundColor: 'red',
              borderWidth: 2,
              borderColor: '#d1d1d1',
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
              // backgroundColor: 'red',
              borderWidth: 2,
              borderColor: '#d1d1d1',
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
              // backgroundColor: 'red',
              borderWidth: 2,
              borderColor: '#d1d1d1',
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
              // backgroundColor: 'red',
              borderWidth: 2,
              borderColor: '#d1d1d1',
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
              // backgroundColor: 'red',
              borderWidth: 2,
              borderColor: '#d1d1d1',
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
              // backgroundColor: 'red',
              borderWidth: 2,
              borderColor: '#d1d1d1',
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
              // backgroundColor: 'red',
              borderWidth: 2,
              borderColor: '#d1d1d1',
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
              // backgroundColor: 'red',
              borderWidth: 2,
              borderColor: '#d1d1d1',
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
              // backgroundColor: 'red',
              borderWidth: 2,
              borderColor: '#d1d1d1',
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
              // backgroundColor: 'red',
              borderWidth: 2,
              borderColor: '#d1d1d1',
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
              // backgroundColor: 'red',
              borderWidth: 2,
              borderColor: '#d1d1d1',
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
              // backgroundColor: 'red',
              borderWidth: 2,
              borderColor: '#d1d1d1',
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
