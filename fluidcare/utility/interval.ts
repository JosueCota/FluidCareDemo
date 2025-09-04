import { getHourMinutes } from "./utilityFunctions";

// Returns the dates of an interval
export const getIntervalDates = (intervalArray: number[], time: string): Date[] => {

  const {h,m} = getHourMinutes(time)
  if (!Array.isArray(intervalArray) || intervalArray.length === 0) throw new Error("Interval Array doesn't have at least one element");

  // Sorts and removes duplicates (incase)
  intervalArray = [...new Set(intervalArray)].sort((a, b) => a - b);

  const current = new Date();
  const cutoff = new Date(current);
  cutoff.setHours(h, m, 0, 0);

  // Effective day based on time cutoff
  const effectiveDate = new Date(current);
  if (current < cutoff) {
    effectiveDate.setDate(current.getDate() - 1);
  }
  const effectiveDay = effectiveDate.getDay();

   // Single day case: treat as full week
  if (intervalArray.length === 1) {
    const onlyDay = intervalArray[0];
    const start = getPreviousDateOfWeek(onlyDay, effectiveDate);
    const end = new Date(start);
    end.setDate(start.getDate() + 7);
    start.setHours(h, m, 0, 0)
    end.setHours(h,m,0,0)
    return  [start, end]
  }

  // Loop through intervals defined by the array
  for (let i = 0; i < intervalArray.length; i++) {
    const startDay = intervalArray[i];
    const endDay = intervalArray[(i + 1) % intervalArray.length];

    // Check if effectiveDay is within [startDay, endDay)
    const inInterval = (
      startDay <= endDay
        ? effectiveDay >= startDay && effectiveDay < endDay
        : effectiveDay >= startDay || effectiveDay < endDay
    );

    if (inInterval) {
      const start = getPreviousDateOfWeek(startDay, effectiveDate);
      const end = getNextDateOfWeek(endDay, effectiveDate);
      start.setHours(h, m, 0, 0)
      end.setHours(h,m,0,0)
      
      return [ start, end]
    }
  }

  throw new Error("Unable to resolve a valid interval from dayArray");

}

export const getNextDateInInterval = (
  intervalArray: number[],
  time: string = "12:00"
): Date => {
  const { h, m } = getHourMinutes(time);

  if (!Array.isArray(intervalArray) || intervalArray.length === 0) {
    throw new Error("Interval Array must contain at least one element");
  }

  // Sorts and removes duplicates
  intervalArray = [...new Set(intervalArray)].sort((a, b) => a - b);

  const now = new Date();

  // Candidate for today at the scheduled time
  const candidate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    h,
    m,
    0,
    0
  );

  const todayIndex = now.getDay();

  // If today is in interval AND time hasn't passed, return today
  if (intervalArray.includes(todayIndex) && candidate > now) {
    return candidate;
  }

  // Otherwise, find the next interval day
  for (let i = 1; i <= 7; i++) {
    const nextDate = new Date(candidate);
    nextDate.setDate(nextDate.getDate() + i);
    if (intervalArray.includes(nextDate.getDay())) {
      return nextDate;
    }
  }

  throw new Error("No valid next date found");
};

const getPreviousDateOfWeek = (day: number, fromDate: Date) => {
    const result = new Date(fromDate);
    const diff = (result.getDay() - day + 7) % 7;
    result.setDate(result.getDate() - diff);
    return result;
  }

const getNextDateOfWeek = (day: number, fromDate: Date) => {
    const result = new Date(fromDate);
    const diff = (day - result.getDay() + 7) % 7;
    result.setDate(result.getDate() + diff);
    return result;
  }