import {
  View,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  useWindowDimensions,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import OnboardSlide from "@/components/onboarding/OnboardSlide";
import { Slides } from "@/utility/types";
import SlideFooter from "@/components/onboarding/SlideFooter";
import CustomButton from "@/components/form/CustomButton";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";

const onboardSlides: Slides[] = [
  {
    id: "fluid",
    component: <OnboardSlide 
      imgSrc= {require("../assets/images/OnboardFluid.png")}
      text={"onboard-content-1"}
      title={"onboard-title-1"}
    />  
  },
  {
    id: "kidney",
    component: <OnboardSlide 
      imgSrc={require("../assets/images/OnboardKidney.png")}
      text="onboard-content-2"
      title="onboard-title-2"
    />  
  },
  {
    id: "medication",
    component: <OnboardSlide 
      imgSrc={require("../assets/images/OnboardDoctor.png")}
      text="onboard-content-3"
      title="onboard-title-3"
    /> 
  },
  {
    id: "disclaimer",
    component:  <OnboardSlide 
      text="medical-disclaimer"
      title="nav-med-discl"
    />  
  }
];

export default function OnboardingScreen() {
  const { width } = useWindowDimensions();
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const ref = useRef<FlatList<Slides>>(null);

  useEffect(() => {
    const offset = currentSlide * width;
    ref?.current?.scrollToOffset({ offset });
  }, [currentSlide]);

  const slideScreen = (next: -1 | 1) => {
    if (currentSlide !== onboardSlides.length-1 && next === 1) { 
      setCurrentSlide((prev) => prev + 1);
    } else if (currentSlide !== 0 && next === -1) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const updateCurrentSlideIndex = (
    e: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    setCurrentSlide(Math.round(contentOffsetX / width));
  };

  return (
    <View className="flex-1 bg-white">
      <FlatList
        ref={ref}
        onMomentumScrollEnd={(e) => updateCurrentSlideIndex(e)}
        pagingEnabled
        data={onboardSlides}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={(item) => item.item.component}
      />
      <SlideFooter slideLength={onboardSlides.length} currentSlide={currentSlide} />
      <View className="flex-row border-t border-t-lightgrey py-6">
        <CustomButton
          label={t("btn-back")}
          onPress={
            currentSlide !== 0
              ? () => slideScreen(-1)
              : () => router.replace("/LandingScreen")
          }
          style="bg-white border"
        />
        {currentSlide !== onboardSlides.length-1 ? (
          <CustomButton
            label={t("btn-continue")}
            onPress={() => slideScreen(1)}
            style="bg-blue-300 border border-blue-300"
            textStyle="text-white"
          />
        ) : (
          <CustomButton
            label={t("btn-sign-up")}
            onPress={() => router.replace("/SignUpScreen")}
            style="bg-blue-300 border border-blue-300"
            textStyle="text-white"
          />
        )}
      </View>
    </View>
  );
}
