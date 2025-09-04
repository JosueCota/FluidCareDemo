import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";
import InputLabel from "./InputLabel";
import { useTranslation } from "react-i18next";

type Props = {
  label: string;
  isSelected: boolean;
  setIsSelected: React.Dispatch<React.SetStateAction<boolean>>;
};

const Checkbox = ({ label, isSelected, setIsSelected }: Props) => {
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      disabled
      onPress={() => setIsSelected((prev) => !prev)}
      className="flex-row items-center gap-2 justify-between mb-4 mt-2 w-[95%]"
    >
      {isSelected ? (
        <MaterialIcons name="check-box" size={24} color={"green"} />
      ) : (
        <MaterialIcons name="check-box-outline-blank" size={24} />
      )}
      <InputLabel label={t(label)} />
    </TouchableOpacity>
  );
};

export default Checkbox;
