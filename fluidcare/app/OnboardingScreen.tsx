import {
  View,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  useWindowDimensions,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import OnboardSlide from "@/components/onboarding/OnboardSlide";
import { OnboardSlideProp } from "@/utility/types";
import SlideFooter from "@/components/onboarding/SlideFooter";
import CustomButton from "@/components/form/CustomButton";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";

const onboardSlides: OnboardSlideProp[] = [
  {
    imgSrc: require("../assets/images/OnboardFluid.png"),
    text: "onboard-content-1",
    title: "onboard-title-1",
  },
  {
    imgSrc: require("../assets/images/OnboardKidney.png"),
    text: "onboard-content-2",
    title: "onboard-title-2",
  },
  {
    imgSrc: require("../assets/images/OnboardDoctor.png"),
    text: "onboard-content-3",
    title: "onboard-title-3",
  },
];

export default function OnboardingScreen() {
  const { width } = useWindowDimensions();
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const ref = useRef<FlatList<OnboardSlideProp>>(null);

  useEffect(() => {
    const offset = currentSlide * width;
    ref?.current?.scrollToOffset({ offset });
  }, [currentSlide]);

  const slideScreen = (next: -1 | 1) => {
    if (currentSlide !== 2 && next === 1) {
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
    <View className="flex-1 bg-grey-200">
      <FlatList
        ref={ref}
        onMomentumScrollEnd={(e) => updateCurrentSlideIndex(e)}
        pagingEnabled
        data={onboardSlides}
        contentContainerStyle={{ height: "75%" }}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item }) => <OnboardSlide item={item} />}
      />
      <SlideFooter slides={onboardSlides} currentSlide={currentSlide} />
      <View className="flex-row mb-6">
        <CustomButton
          label={t("btn-back")}
          onPress={
            currentSlide !== 0
              ? () => slideScreen(-1)
              : () => router.replace("/LandingScreen")
          }
          style="bg-danger"
        />
        {currentSlide !== 2 ? (
          <CustomButton
            label={t("btn-continue")}
            onPress={() => slideScreen(1)}
            style="bg-success"
          />
        ) : (
          <CustomButton
            label={t("btn-sign-up")}
            onPress={() => router.replace("/SignUpScreen")}
            style="bg-success"
          />
        )}
      </View>
    </View>
  );
}
