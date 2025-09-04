import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text } from 'react-native'

type Props = {
    error?: string | string[] | never[] | undefined,
    touched?: boolean | never[] | undefined
}

const ValidationError = ({error, touched}: Props) => {
  const {t} = useTranslation();
  
  return ( 
    <>
        {error !=="undefined" && touched && error ? (<Text className='px-4 mt-2 relative bottom-2 text-red-500 text-xs'>{t(error)}</Text>) : null}
    </>
)
}

export default ValidationError
