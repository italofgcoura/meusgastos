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
import MonthFilter from './src/components/MonthFilter';

import {Spent} from './src/interfaces/spent';

function App(): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(false);

  const [currentItems, setCurrentItems] = useState<Spent[]>([]);

  const [itemToEdit, setItemToEdit] = useState<Spent | undefined>(undefined);

  const [selectedMonthFilter, setSelectedMonthFilter] = useState('');

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

  const editItem = ({id, spentValue, date, description}: Spent) => {
    const item = currentItems.find((i: Spent) => i.id === id);

    if (item !== undefined) {
      item.spentValue = spentValue;
      item.date = date;
      item.description = description;
    }

    const oldItems = currentItems.filter(i => i.id !== id);

    if (item) {
      oldItems.push(item);

      setCurrentItems(oldItems);
      saveToStorage(oldItems);
    }
  };

  const onEditPress = (item: Spent) => {
    setItemToEdit(item);
    setShowModal(true);
  };
  console.log(currentItems);
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
      <FlatList
        data={currentItems}
        renderItem={({item}) => (
          <ListItem
            description={item.description}
            spentValue={item.spentValue}
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
      <MonthFilter
        selectedMonthFilter={selectedMonthFilter}
        setSelectedMonthFilter={setSelectedMonthFilter}
      />
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
