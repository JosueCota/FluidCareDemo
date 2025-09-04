import React from 'react'
import { KeyboardAvoidingView, Platform, Modal, View} from "react-native"

type Props = {
    isOpen: boolean,
    withInput?: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    children: React.ReactNode,
    modalStyle?: string,
    allowClose?: boolean
    animation?: "none" | "slide" | "fade" 
}

const CustomModal = ({isOpen, withInput, children, setIsOpen, modalStyle, allowClose = true, animation ="none"}: Props) => {

    const content = withInput ? (
        <KeyboardAvoidingView behavior={Platform.OS==="ios"? "padding": "height"}
        className={`flex-1 bg-black/40 px-4 ${modalStyle? modalStyle : "justify-center"}`}
        >
            {children}
        </KeyboardAvoidingView>
    ) : (
        <View className={`flex-1 bg-black/40 px-4 ${modalStyle? modalStyle : "justify-center"}`}>
            {children}
        </View>
    );

  return (
    <Modal 
        visible={isOpen}
        transparent
        animationType={animation}
        statusBarTranslucent
        onRequestClose={() => allowClose && setIsOpen(false)}
    >
        {content}
    </Modal>
)};

export default CustomModal
