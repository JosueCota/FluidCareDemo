import React from 'react'
import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native'

const InputOverflowWrapper = ({children}:  any) => {
    return (
        <KeyboardAvoidingView className='flex-1' behavior={ Platform.OS === "ios"? "padding" : "height"}>
            <ScrollView keyboardShouldPersistTaps='handled'>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                    {children}
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
  )
}

export default InputOverflowWrapper
