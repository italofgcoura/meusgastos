import {Text, TouchableOpacity} from 'react-native';

type PropsType = {
  selectedMonthFilter: string;
  setSelectedMonthFilter: React.Dispatch<React.SetStateAction<string>>;
  month: {monthName: string; monthIndex: number};
};

export default function ({
  setSelectedMonthFilter,
  selectedMonthFilter,
  month,
}: PropsType) {
  const handleSelectMonth = () => {
    if (selectedMonthFilter === month.monthIndex.toString()) {
      setSelectedMonthFilter('');
      return;
    }

    setSelectedMonthFilter(month.monthIndex.toString());
  };

  return (
    <TouchableOpacity
      onPress={handleSelectMonth}
      style={{
        marginHorizontal: 4,
        height: 40,
        width: 40,
        borderWidth: 2,
        borderColor: '#d1d1d1',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:
          selectedMonthFilter === month.monthIndex.toString()
            ? 'red'
            : 'transparent',
      }}>
      <Text>{month.monthName}</Text>
    </TouchableOpacity>
  );
}
