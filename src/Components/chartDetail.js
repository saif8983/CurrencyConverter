import { Dimensions, StyleSheet } from "react-native";
import {
  NativeBaseProvider,
  Modal,
  VStack,
  HStack,
  Button,
  Spinner,
} from "native-base";
import CalendarPicker from "react-native-calendar-picker";
import { LineChart } from "react-native-chart-kit";
import useChart from "../Hooks/useChart";
import chartData from "../../utils/chartData";
import { PreviousWeek } from "../../utils/PreviousWeek";
const screenWidth = Dimensions.get("window").width;

const ChartDetail = ({
  serviceFirst,
  serviceSecond,
  inputAmountValue,
  amount,
  setServiceFirst,
  setServiceSecond,
  setInputAmountValue,
  setAmount,
}) => {
  const { startOfPreviousWeek } = PreviousWeek();
  const {
    startDate,
    endDate,
    modalStartDate,
    modalEndDate,
    lablsOfChart,
    dataOfChart,
    selectedDate,
    spiner,
    handleStartDateChange,
    handleEndDateChange,
    handleOpenCalenderStartDate,
    handleOpenCalenderEndDate,
  } = useChart(serviceFirst,serviceSecond,setServiceFirst,setServiceSecond,setInputAmountValue,inputAmountValue,setAmount,amount);

  const { chartConfig, data } = chartData(
    lablsOfChart,
    dataOfChart,
    serviceFirst,
    serviceSecond
  );
  return (
    <NativeBaseProvider>
      {spiner ? (
        <HStack space={8} justifyContent="center" alignItems="center">
          <Spinner size="lg" />
        </HStack>
      ) : null}
      <VStack alignItems="center" space={4}>
        <LineChart
          data={data}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
        />
        <HStack space={6} justifyContent="center">
          <Button
            size="xs"
            style={styles.button}
            onPress={() => handleOpenCalenderStartDate()}
          >
            Start date
          </Button>
          <Button
            size="xs"
            style={styles.button}
            onPress={() => handleOpenCalenderEndDate()}
          >
            End date
          </Button>
        </HStack>
        <HStack space={3} justifyContent="center" style={{ height: 300 }}>
          <Modal style={styles.modal} isOpen={modalStartDate}>
            <CalendarPicker
              selected={startDate}
              onDateChange={(newDate) => handleStartDateChange(newDate)}
              todayBackgroundColor="#f2e6ff"
              selectedDayColor="#7300e6"
              selectedDayTextColor="#FFFFFF"
              minDate={startOfPreviousWeek}
              maxDate={selectedDate}
            />
          </Modal>
          <Modal isOpen={modalEndDate} style={styles.modal}>
            <CalendarPicker
              selected={endDate}
              onDateChange={(newDate) => handleEndDateChange(newDate)}
              todayBackgroundColor="#f2e6ff"
              selectedDayColor="#7300e6"
              selectedDayTextColor="#FFFFFF"
              minDate={startOfPreviousWeek}
              maxDate={selectedDate}
            />
          </Modal>
        </HStack>
      </VStack>
    </NativeBaseProvider>
  );
};
const styles = StyleSheet.create({
  modal: {
    backgroundColor: "grey",
    maxHeight: 300,
    marginTop: 300,
  },
  button: {
    borderRadius: 20,
  },
});
export default ChartDetail;
