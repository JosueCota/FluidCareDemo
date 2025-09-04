import { MaterialIcons } from '@expo/vector-icons';
import React, { ReactNode, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View, Text } from 'react-native';

type Props = {
    label?: string, 
    content?: string,
    children?: ReactNode,
    boxed?:boolean
}

const Accordion = ({  label, content, children, boxed = true}: Props) => {

  const {t} = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handlePress = () => {
    setIsOpen(prev => !prev);
  }

  return (
    <View className={`${boxed? "my-2 p-4 w-[95%] mx-auto rounded-md border border-[#eee] bg-white": "px-4 py-3 w-full mx-auto border border-white"}`}>
      <TouchableOpacity className="" activeOpacity={.85} onPress={handlePress}>
        {label && 
        <View className={`flex-row justify-between items-center ${!boxed && (isOpen ? "bg-blue-200 border border-blue-200 rounded-md p-2": "bg-white border p-2 rounded-md")}`}>
          <Text className="text-xl font-semibold w-[80%]">{t(label)}</Text>
          <MaterialIcons name={isOpen? "arrow-drop-up" :"arrow-drop-down"} size={32}/>
        </View>
        }
      </TouchableOpacity>
        {isOpen && content &&
        <View className='mt-2'>
          <View className="mx-auto w-[95%] my-2 border-t border-t-lightgrey"></View>
          <Text className="text-grey-200 p-1 text-lg">{t(content)}</Text>
        </View>
        }
        {isOpen && children}
    </View>
  )
}

export default Accordion
