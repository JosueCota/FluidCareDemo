import Toast, { ToastType } from "react-native-toast-message";
import { TimeFrame, Units } from "./types";
import { lineDataItem } from "react-native-gifted-charts";

// 12 Hour Format Hours
export const formatHours = (date: Date, padding:boolean = true) => {
    const hour = date.getHours()
    if (padding) {
        return (hour % 12 === 0 ? 12 : hour % 12).toString().padStart(2, "0");
    }
    return (hour % 12 === 0 ? 12 : hour % 12).toString()
}

// Adds Padding For Minutes
export const formatMinutes = (date: Date) => {
    return date.getMinutes().toString().padStart(2, "0")
}

// Determines AM / PM Time
export const timeOfDay = (date: Date) => {
    return date.getHours() >= 12? "PM" : "AM"
}

// returns (12:00 PM) formatted date
export const formatTime = (date: Date, padding: boolean =true) => {
    return `${formatHours(date, padding)}:${formatMinutes(date)} ${timeOfDay(date)}`;
} 

// Converts pounds to kilograms (rounded)
export const poundToKG = (weight: number): number => {
    return Math.round(weight * 0.453);
}

// Converts kilograms to pounds (rounded)
export const kgToPound = (weight: number): number => {
    return Math.round(weight * 2.205);
}

//Converts mililiters to ounces
export const mlToOz = (volume: number): number => {
    return Math.round(volume / 29.574)
}

//Converts mililiters to ounces
export const ozToMl = (volume: number): number => {
    return Math.round(volume * 29.574)
}

// Takes formatted time "12:23" and converts to Date Object
export const timeToDate = (time: string): Date => {
    const {h, m} = getHourMinutes(time)

    return new Date(2024, 5, 24, h, m, 0, 0)
}

// Takes formatted string "1:3:2" and converts to number array 
export const daysToArray = (days: string): number[] => {
    const arr = days.split(":")
    return arr.map(Number).filter(n=> !isNaN(n))   
}

// Returns current week interval (Starts on Monday)
export const getWeekRange = (date: Date) => { 
    const startOfWeek = new Date(date.setDate(date.getDate() - date.getDay()));
    const endOfWeek = new Date(date.setDate(startOfWeek.getDate() + 6));

    return {
        startDate : dateForSQLite(startOfWeek),
        endDate : dateForSQLite(endOfWeek)
    }
}

// Convert Date Object to SQLite Formatted Date
export const dateForSQLite = (date: Date) => {
    return date.toISOString();
}

// Returns Hour and Minutes respectively from dialTime 
export const getHourMinutes = (time: string) => {
    return {
        h: Number(time.split(":")[0]),
        m: Number(time.split(":")[1])
    }
}

// Returns how many days there are in the interval (for calculating how much liquid per interval)
export const getDaysInInterval = (startDate: Date, endDate: Date): number => {
    const msPerDay = 1000 * 60 * 60 * 24;
    const start = startDate.getTime();
    const end = endDate.getTime();
    return Math.floor((end - start) / msPerDay)
}

// Ensures the date is safe
export const safeDate = (value: any): Date => {
  const d = new Date(value);
  return isNaN(d.getTime()) ? new Date() : d;
};

// Returns weight unit tag based on unit 
export const getWeightTag = (unit: Units) => {
    return unit === "metric"? "kg": "lb"
}
// Returns fluid unit tag based on unit 
export const getFluidTag = (unit: Units) => {
    return unit === "metric"? "ml": "oz"
}

// Shows a Toast
export const showToast = (type: ToastType, heading: string, subtitle : string, visibilityTime: number = 1000) => {
    Toast.show({
        type: type,
        text1: heading,
        text2: subtitle,
        visibilityTime: visibilityTime,
        topOffset:70,
        swipeable:false
    });
}

// For comparison of arrays
export const arraysEqual = (a: any[], b: any[]): boolean => {
  if (a.length !== b.length) return false;
  return a.every((val, index) => val === b[index]);
}

// From ISO(DB stored dates) to Month-Day Format (ex: Jan 24)
export const isoToFormattedDate = (date: string, language: string, type: "date"|"datetime" = "date"):string => {
  const parsedDate = new Date(date);

  if (type === "date") {
    return parsedDate.toLocaleDateString(language, {
      month: "short",
      day: "numeric",
    });
  } else if (type === "datetime"){
    return parsedDate.toLocaleString(language, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  } 
  
  return "Invalid Date";
}

// Increases month for date queries
export const increaseMonth = (setTimeFrame: (value: React.SetStateAction<TimeFrame>) => void, timeFrame: TimeFrame) => {
    if (timeFrame.month === 11){
      setTimeFrame(prev => {return {year: prev.year+1, month: 0}})
    } else {
      setTimeFrame(prev => {return {...prev, month: prev.month +1}})
    }
  }

// Decreases month for date queries
export const decreaseMonth = (setTimeFrame: (value: React.SetStateAction<TimeFrame>) => void, timeFrame: TimeFrame) => {
    if (timeFrame.month === 0){
      setTimeFrame(prev => {return {year: prev.year-1, month: 11}})
    } else {
      setTimeFrame(prev => {return {...prev, month: prev.month - 1}})
    }
}

// Checks if increase month button should be disabled (future dates are illegal)
export const shouldDisableNextMonth = (timeFrame: TimeFrame) => {
    const now = new Date();
    const currentMonth = now.getMonth(); 
    const currentYear = now.getFullYear();

    return ( timeFrame.year > currentYear || (timeFrame.year === currentYear && timeFrame.month === currentMonth));
}

// Splice First Data Point
export const dupeFirstDataPoint = (item: lineDataItem[]) => {
    if (item.length > 0) {
      const first = { ...item[0], hideDataPoint:true, hidePointer:true, label:"" };
      item.splice(0, 0, first);
    }
}

// Divides two numbers safely, useful for datasets where data may vary and may include 0s etc
export const safeDivide = (a: number, b: number): number => {
  if (!b || isNaN(a) || isNaN(b) || b === 0 || a === 0) return 0;
  return parseFloat((a / b).toFixed(2));
};

// Mainly for formatting dates
export const capitalizeFirstLetter = (string: string):string => {
    if (!string) return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getDayName = (dayNumber: number, locale = 'en-US') => {
  const baseDate = new Date(Date.UTC(2021, 0, 3 + dayNumber));
  return new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(baseDate);
};

export const slideScreen = (setCurrentSlide: (value: React.SetStateAction<number>) => void, currentSlide: number, next: -1 | 1) => {
    if (currentSlide !== 2 && next === 1) {
      setCurrentSlide((prev) => prev + 1);
    } else if (currentSlide !== 0 && next === -1) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

export const isPastDay = (date: string | Date) => {
  const d = new Date(date);
  const today = new Date();
  d.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  return d < today;
};