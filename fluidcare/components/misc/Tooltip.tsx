import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  Animated,
  TouchableOpacity,
} from "react-native";

type TooltipProps = {
  children: React.ReactNode;
  tooltipText: string;
  right?:boolean
};

const Tooltip = ({ children, tooltipText, right=false }: TooltipProps) => {
  const [visible, setVisible] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0});
  const opacity = useRef(new Animated.Value(0)).current;
  const childRef = useRef<View>(null);

  const toggleTooltip = () => {
    if (visible) {
      hideTooltip();
    } else {
      if (childRef.current) {
        childRef.current.measureInWindow((x, y, width, height) => {
          const TOOLTIP_WIDTH = 170;
          const OFFSET = 50;
      
          let left = 0;
          const top = y - OFFSET + height/4;
          if (right) {
            left = - x - width + TOOLTIP_WIDTH;
          } else {
            left = x + width - TOOLTIP_WIDTH;
          }

          setTooltipPos({ top, left });
          setVisible(true);
          Animated.timing(opacity, {
            toValue: 1,
            duration: 50,
            useNativeDriver: true,
          }).start();
        });
      }
    }
  };

  const hideTooltip = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
    });
  };

  return (
    <>
      <TouchableOpacity onPress={toggleTooltip}>
        <View ref={childRef}>{children}</View>
      </TouchableOpacity>

      {visible && (
        <Modal transparent animationType="none">
          <Pressable onPress={hideTooltip} className="absolute inset-0">
            <Animated.View
              className="absolute bg-neutral-800 p-3 rounded-md z-50"
              style={{
                width: 150,
                top: tooltipPos.top,
                left: tooltipPos.left,
                opacity,
              }}
            >
              <Text className="text-white text-center text-sm" style={{ flexWrap: "wrap", flexShrink: 1 }}>
                {tooltipText}
              </Text>
            </Animated.View>
          </Pressable>
        </Modal>
      )}
    </>
  );
};

export default Tooltip;
