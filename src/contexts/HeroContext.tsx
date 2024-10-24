import { Hero } from "../types/types";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

interface HeroContextType {
  selectedHero: Hero | null;
  selectHero: (hero: Hero) => void;
}

const HeroContext = createContext<HeroContextType | undefined>(undefined);

export const HeroProvider = ({ children }: { children: ReactNode }) => {
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);

  const selectHero = useCallback((hero: Hero) => {
    setSelectedHero(hero);
  }, []);

  return (
    <HeroContext.Provider value={{ selectedHero, selectHero }}>
      {children}
    </HeroContext.Provider>
  );
};

export const useHeroContext = () => {
  const context = useContext(HeroContext);
  if (!context) {
    throw new Error("useHeroContext must be used within a HeroProvider");
  }
  return context;
};
