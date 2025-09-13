import { Accordion, DrinkTypes, MedicationUnits, Option, TimeFrame } from "./types"
import SodaSVG from "@/assets/icons/drinks/drink-soda.svg"
import WaterSVG from "@/assets/icons/drinks/drink-water.svg"
import JuiceSVG from "@/assets/icons/drinks/drink-juice.svg"
import OtherSVG from "@/assets/icons/drinks/drink-other.svg"
import CoffeeSVG from "@/assets/icons/drinks/drink-coffee.svg"
import EnergySVG from "@/assets/icons/drinks/drink-energy.svg"
import IndividualPillsSVG from "@/assets/icons/meds/med-individual.svg"
import PillBottleSVG from "@/assets/icons/meds/med-bottle.svg"
import LiquidMedSVG from "@/assets/icons/meds/med-liquid.svg"
import VitaminsSVG from "@/assets/icons/meds/med-vitamins.svg"
import IntervalSVG from "@/assets/icons/notifs/interval.svg";
import RefillSVG from "@/assets/icons/notifs/refill-alert.svg";
import MedsSVG from "@/assets/icons/notifs/meds.svg"

// Days of Week and their translation keys
export const days: Option[] = [
  {
    value: 0,
    t: "sunday-abre" },
  {
    value: 1,
    t: "monday-abre" },
  {
    value: 2,
    t: "tuesday-abre" },
  {
    value: 3,
    t: "wednesday-abre" },
  {
    value: 4,
    t: "thursday-abre" },
  {
    value: 5,
    t: "friday-abre" },
  {
    value: 6,
    t: "saturday-abre" }
]

export const MONTH_NAMES = [
  "month-jan", "month-feb", "month-mar", "month-apr", "month-may", "month-jun", "month-jul", "month-aug", "month-sep", "month-oct", "month-nov", "month-dev"
];

const drinkIcon = {
  "soda": SodaSVG,
  "coffee": CoffeeSVG,
  "water": WaterSVG,
  "juice": JuiceSVG,
  "energy": EnergySVG,
  "other": OtherSVG
}

// Returns Component to a variable (const Icon = getDrinkIcon(type) => then place within component)
export const getDrinkIcon = (type: DrinkTypes) => drinkIcon[type];

export const currentTimeFrame = () : TimeFrame => {
  return {
      year: 2025, 
      month: 7
  }
} 

export const drinkTypes : { label: string; value: DrinkTypes; } [] = 
 [{ label: 'item-type-water', value: 'water' },
  { label: 'item-type-soda', value: 'soda' },
  { label: 'item-type-energy', value: 'energy' },
  { label: 'item-type-juice', value: 'juice' },
  { label: 'item-type-coffee', value: 'coffee' },
  { label: 'item-type-other', value: 'other' },
]

export const generalQuestions: Accordion[] = [
  { label:"faq-q-1",
    content:"faq-a-1"
  },
  { label:"faq-q-2",
    content:"faq-a-2"
  },
  { label:"faq-q-3",
    content:"faq-a-3"
  },
]

export const intakeQuestions: Accordion[] = [
  { label:"faq-q-4",
    content:"faq-a-4"
  },
  { label:"faq-q-5",
    content:"faq-a-5"
  },
  { label:"faq-q-6",
    content:"faq-a-6"
  },
  { label:"faq-q-7",
    content:"faq-a-7"
  },
  { label:"faq-q-8",
    content:"faq-a-8"
  },
  { label:"faq-q-9",
    content:"faq-a-9"
  },
]

export const weightQuestions: Accordion[] = [
  { label:"faq-q-10",
    content:"faq-a-10"
  },
  { label:"faq-q-11",
    content:"faq-a-11"
  },
]

export const unitTypes : { label: string; value: MedicationUnits; } [] = 
 [{ label: 'unit-pill', value: 'pill' },
  { label: 'unit-g', value: 'g' },
  { label: 'unit-mg', value: 'mg' },
  { label: 'unit-mcg', value: 'mcg' },
  { label: 'unit-ml', value: 'ml' },
  { label: 'unit-iu', value: 'IU' },
];

export const unitMap: Record<MedicationUnits, string> = 
  Object.fromEntries(unitTypes.map(u => [u.value, u.label])) as Record<MedicationUnits, string>;

export const unitIcons = {
  pill: IndividualPillsSVG,
  ml: LiquidMedSVG,
  mg: PillBottleSVG,
  mcg: PillBottleSVG,
  IU: VitaminsSVG, 
  g: PillBottleSVG
};

const notificationIcon = {
  meds: MedsSVG,
  refill: RefillSVG,
  interval: IntervalSVG
}

export const getNotificationIcon = (type: keyof typeof notificationIcon) => notificationIcon[type];
