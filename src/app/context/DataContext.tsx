import React, { createContext, useContext, useState, ReactNode } from 'react';
import { LucideIcon, Droplets, Navigation, Anchor, Sun } from 'lucide-react';

interface Action {
  text: string;
  icon: LucideIcon;
}

interface DataContextType {
  todayActions: Action[];
  upcomingActions: Action[];
  updateTodayActions: (actions: Action[]) => void;
  updateUpcomingActions: (actions: Action[]) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [todayActions, setTodayActions] = useState<Action[]>([
    {
      text: 'Check tanks before 2 pm',
      icon: Droplets
    },
    {
      text: 'Avoid river travel after 4 pm',
      icon: Navigation
    },
    {
      text: 'Move boats higher before 6 pm',
      icon: Anchor
    },
  ]);

  const [upcomingActions, setUpcomingActions] = useState<Action[]>([
    {
      text: 'Hot conditions Sunday — check water supply',
      icon: Sun
    },
  ]);

  const updateTodayActions = (actions: Action[]) => {
    setTodayActions(actions);
  };

  const updateUpcomingActions = (actions: Action[]) => {
    setUpcomingActions(actions);
  };

  return (
    <DataContext.Provider
      value={{
        todayActions,
        upcomingActions,
        updateTodayActions,
        updateUpcomingActions,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
