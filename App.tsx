import React, {useState, useEffect, useCallback} from 'react';

import {
  Button,
  StatusBar,
  Text,
  View,
  FlatList,
  StyleSheet,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ListItem from './src/components/ListItem';

import Header from './src/components/Header';
import NewSpent from './src/components/NewSpent';

type ItemProps = {title: string; value: number; id: string; date: string};

function App(): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(false);

  const [currentItems, setCurrentItems] = useState<ItemProps[]>([]);

  const [itemToEdit, setItemToEdit] = useState<ItemProps | undefined>(
    undefined,
  );

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

  const editItem = ({id, value, date, title}: ItemProps) => {
    const item = currentItems.find((i: ItemProps) => i.id === id);

    if (item !== undefined) {
      item.value = value;
      item.date = date;
      item.title = title;
    }

    const oldItems = currentItems.filter(item => item.id !== id);

    if (item) {
      oldItems.push(item);

      setCurrentItems(oldItems);
      saveToStorage(oldItems);
    }
  };

  const onEditPress = (item: ItemProps) => {
    setItemToEdit(item);
    setShowModal(true);
  };

  return (
    <>
      <StatusBar />

      <NewSpent
        showModal={showModal}
        setShowModal={setShowModal}
        currentItems={currentItems}
        setCurrentItems={setCurrentItems}
        saveToStorage={saveToStorage}
        itemToEdit={itemToEdit}
        editItem={editItem}
        setItemToEdit={setItemToEdit}
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
            onEditPress={onEditPress}
          />
        )}
        style={{flexGrow: 1}}
        keyExtractor={item => item.id}
        contentContainerStyle={{flexGrow: 1}}
        ListEmptyComponent={() => (
          <View style={styles.noData}>
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
      {/* <MonthFilter /> */}
    </>
  );
}

export default App;

const styles = StyleSheet.create({
  noData: {
    flex: 1,
    // flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink',
  },
});
