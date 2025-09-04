import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Theme, Units } from "../utility/types";


type UserContextType = {
  user: number;
  setUser: (user: number) => void | null;
  theme: Theme;
  setTheme: (unit: Theme) => void;
  unit: Units;
  setUnit: (unit: Units) => void;
  loading: boolean;
  setDailyIntake: (amount: number) => void;
  dailyIntake: number;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(-1);
  const [theme, setTheme] = useState<Theme>("light");
  const [unit, setUnit] = useState<Units>("imperial");
  const [loading, setLoading] = useState<boolean>(true);
  const [dailyIntake, setDailyIntake] = useState<number>(1000);

  useEffect(() => {
    (async () => {
      try {
        const u = await AsyncStorage.getItem("user");
        const t = await AsyncStorage.getItem("theme");
        const un = await AsyncStorage.getItem("unit");
        const daily = await AsyncStorage.getItem("dailyIntake");
        
        if (u && !isNaN(Number(u))) {
          setUser(Number(u));
        }
        if (daily && !isNaN(Number(daily))) {
          setDailyIntake(Number(daily));
        }
        if (t === "light" || t === "dark") {
          setTheme(t);
        }
        if (un === "imperial" || un === "metric") {
          setUnit(un);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, theme, setTheme, loading, setUnit, unit, setDailyIntake, dailyIntake }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
