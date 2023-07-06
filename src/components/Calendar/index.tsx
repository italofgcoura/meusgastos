import {Text, Pressable, StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';
import colors from '../../constants/colors';

type PropTypes = {
  setSelectedDate: any;
  selectedDate: string;
  setShowCalendar: any;
  showCalendar: boolean;
};

export default function ({
  setSelectedDate,
  selectedDate,
  setShowCalendar,
  showCalendar,
}: PropTypes) {
  return (
    <>
      {showCalendar && (
        <Calendar
          onDayPress={day => {
            setSelectedDate(day.dateString);
            setShowCalendar(false);
          }}
          markedDates={{
            [selectedDate]: {
              selected: true,
              disableTouchEvent: true,
            },
          }}
          style={{borderRadius: 4}}
        />
      )}
      {!showCalendar && (
        <Pressable
          onPress={() => setShowCalendar(true)}
          style={styles.calendarDate}>
          {selectedDate ? (
            <Text>Data selecionada:</Text>
          ) : (
            <Text>Selecionar data</Text>
          )}
          <Text>{selectedDate?.split('-').reverse().join('/')}</Text>
        </Pressable>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  calendarDate: {
    borderWidth: 1,
    borderColor: '#1d1d1d',
    padding: 8,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
});
