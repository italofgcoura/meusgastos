import {ScrollView, Text, View} from 'react-native';

type PropsType = {
  selectedMonthFilter: string;
  setSelectedMonthFilter: React.Dispatch<React.SetStateAction<string>>;
};

export default function ({
  selectedMonthFilter,
  setSelectedMonthFilter,
}: PropsType) {
  return (
    <View>
      <ScrollView
        style={{
          marginTop: 16,
          gap: 4,
          height: 'auto',
          paddingBottom: 16,
        }}
        horizontal>
        <View
          style={{
            marginHorizontal: 4,
            height: 40,
            width: 40,
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
  );
}
