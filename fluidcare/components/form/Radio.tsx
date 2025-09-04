import { Text, View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"
import InputLabel from "./InputLabel";
import { useTranslation } from "react-i18next";

interface Option {
    label: string;
    value: string;
}

interface RadioProps {
    options: Option[],
    checkedValue: string,
    onChange: Function,
    label?: string,
    style?: string, 
    activeColor?: string,
    tooltip?:string, 
    labelStyle?:string
}

const Radio = ({options, checkedValue, onChange, label, style, activeColor, tooltip, labelStyle}: RadioProps) => {

    const {t} = useTranslation();

    return (
        <View className="my-2 ">
            {label && <InputLabel label={label} tooltip={tooltip} labelStyle={labelStyle}/>}
            <View className={`flex-row flew-wrap gap-5 mt-2 ${style}`}>
                {options.map(option => {
                    let active = checkedValue == option.value;
                    return (
                        <TouchableOpacity className={`min-w-[100px] flex-row gap-2 items-center rounded-md p-4 ${active? (activeColor || "bg-white"): "bg-grey-100"}`} onPress={() => {onChange(option.value)}}
                        key={option.value}
                        >
                            <MaterialIcons
                                name={`${active? "radio-button-checked": "radio-button-unchecked"}`}
                                size={24}
                                color={"#64748b"}
                                />
                            <Text className={`${active? "text-black": "text-grey-200"}`}>{t(option.label)}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    )
}

export default Radio;