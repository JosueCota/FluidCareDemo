import { getDrinkIcon } from '@/utility/data';
import { DrinkTypes } from '@/utility/types';
import { FormikErrors } from 'formik';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

type DropdownProps = {
    data: { label: string; value: any; }[],
    value: string | number,
    setValue: ((val: string | number) => Promise<void | FormikErrors<{ name: string; amount: number; type: string; }>>) | React.Dispatch<React.SetStateAction<any>>,
    icon?: boolean,
    borderColor?:string
}

const CustomDropdown = ({data, value, setValue, icon, borderColor }: DropdownProps) => {
  const {t} = useTranslation();

  const readyData = data.map((item) => {
    return {...item, label: t(item.label)}
  })

  const renderItem = (item: {label:string, value: string | number}, selected: boolean | undefined) => {
    let Icon = null;
    if (icon) {
      Icon = getDrinkIcon(item.value as DrinkTypes);
    }
    return (
      <View className={`p-4 flex-row gap-4 items-center `}>
        {icon && Icon && (
          <Icon width={20} height={20} />
        )}
        <Text className={`flex ${selected && "font-bold"}`}>{item.label}</Text>
      </View>
    );
  };

  return (
    <Dropdown 
        style={{height: 45,
        borderRadius: 3,
        paddingHorizontal: 15,
        backgroundColor:"white",
        marginHorizontal:5, 
        borderColor:borderColor || "#9f9ba0", 
        borderWidth:1
        }}
        mode="modal"
        autoScroll={false}
        data={readyData}
        valueField={"value"}
        selectedTextStyle={{color:"#444", paddingLeft:4}}
        labelField={"label"}
        placeholder="Select Liquid Type"
        value={value}
        onChange={(val) => setValue(val.value)}
        renderItem={renderItem}
        renderLeftIcon={() => {
        if (icon) {
        const Icon = getDrinkIcon(value as DrinkTypes);
        return (
            <Icon width={20} height={20} />
        )
        } return (<></>) }}
    />
  )
}

export default CustomDropdown
