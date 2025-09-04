import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text } from "react-native"

const EmptyListComponent = ({text}: {text: string}) => {
    const {t} = useTranslation();
    return (
    <Text className="text-xl font-semibold bg-grey-200 text-offwhite text-center p-2 w-[50%] rounded-md mx-auto">
        {t(text)}
    </Text>
  )
}

export default EmptyListComponent
