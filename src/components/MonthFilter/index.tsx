import {ScrollView, View} from 'react-native';

import MonthSelector from './MonthSelector';

type PropsType = {
  selectedMonthFilter: string;
  setSelectedMonthFilter: React.Dispatch<React.SetStateAction<string>>;
};

const months = [
  {
    monthName: 'JAN',
    monthIndex: 0,
  },
  {
    monthName: 'FEV',
    monthIndex: 1,
  },
  {
    monthName: 'MAR',
    monthIndex: 2,
  },
  {
    monthName: 'ABR',
    monthIndex: 3,
  },
  {
    monthName: 'MAI',
    monthIndex: 4,
  },
  {
    monthName: 'JUN',
    monthIndex: 5,
  },
  {
    monthName: 'JUL',
    monthIndex: 6,
  },
  {
    monthName: 'AGO',
    monthIndex: 7,
  },
  {
    monthName: 'SET',
    monthIndex: 8,
  },
  {
    monthName: 'OUT',
    monthIndex: 9,
  },
  {
    monthName: 'NOV',
    monthIndex: 10,
  },
  {
    monthName: 'DEZ',
    monthIndex: 11,
  },
];

export default function ({
  setSelectedMonthFilter,
  selectedMonthFilter,
}: PropsType) {
  return (
    <View>
      <ScrollView
        style={{
          marginTop: 16,
          gap: 4,
          paddingBottom: 16,
          height: 'auto',
          // backgroundColor: 'red',
        }}
        horizontal>
        {months.map(month => (
          <MonthSelector
            setSelectedMonthFilter={setSelectedMonthFilter}
            selectedMonthFilter={selectedMonthFilter}
            month={month}
          />
        ))}
      </ScrollView>
    </View>
  );
}
