// components/creationForm/DateRangeInput.tsx
import React, { useMemo, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

type Props = {
  startDate: string | "";
  endDate: string | "";
  onChangeStart: (v: string) => void;
  onChangeEnd: (v: string) => void;
};

const startOfDay = (d: Date) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};
const today = startOfDay(new Date());

const fmt = (d?: string | "") =>
  d ? new Date(d).toLocaleDateString() : "Select date";

const toYMD = (date: Date) => {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, "0");
  const d = `${date.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${d}`;
};

export const DatePicker = ({
  startDate,
  endDate,
  onChangeStart,
  onChangeEnd,
}: Props) => {
  const [open, setOpen] = useState<"start" | "end" | null>(null);

  const minEnd = useMemo(
    () => (startDate ? startOfDay(new Date(startDate)) : undefined),
    [startDate]
  );

  const handleConfirm = (raw: Date) => {
    const picked = startOfDay(raw > today ? today : raw);

    if (open === "start") {
      const ymd = toYMD(picked);
      onChangeStart(ymd);

      if (endDate && new Date(endDate) < new Date(ymd)) {
        onChangeEnd(ymd);
      }
    } else if (open === "end") {
      if (!startDate) {
        Alert.alert("Elegí primero la fecha de inicio");
        setOpen(null);
        return;
      }
      const min = new Date(startDate);
      const fixed = picked < min ? min : picked;
      onChangeEnd(toYMD(fixed));
    }
    setOpen(null);
  };

  return (
    <View className="w-full mb-5">
      <View className="flex-row gap-3">
        <Pressable
          className="flex-1 rounded-xl bg-highlight/60 px-3 py-3 pl-5"
          onPress={() => setOpen("start")}
        >
          <Text className="text-lg font-body text-expresso mb-1">Start Date</Text>
          <Text className="text-expresso/50">{fmt(startDate)}</Text>
        </Pressable>

        <Pressable
          className="flex-1 rounded-xl bg-highlight/60 px-3 py-3 pl-5"
          onPress={() => setOpen("end")}
          disabled={!startDate}
        >
          <Text className="text-lg font-body text-expresso mb-1">End Date</Text>
          <Text className="text-expresso/50">
            {startDate ? fmt(endDate) : "First choose start"}
          </Text>
        </Pressable>
      </View>

      <DateTimePickerModal
        isVisible={open !== null}
        mode="date"
        date={
          open === "start"
            ? startDate
              ? new Date(startDate)
              : today
            : endDate
            ? new Date(endDate)
            : startDate
            ? new Date(startDate)
            : today
        }
        minimumDate={open === "end" ? minEnd : undefined}
        maximumDate={today}            
        onConfirm={handleConfirm}
        onCancel={() => setOpen(null)}
      />
    </View>
  );
};
