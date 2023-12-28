import { IRevenue } from "@/interfaces/IRevenue";
import { IStatistics } from "@/interfaces/IStatistics";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  statistics: IStatistics | null;
  revenues: IRevenue[];
  timeline: any;
};

type Action = {
  setStatistics: (updatedStatistics: IStatistics) => void;
  setRevenues: (updatedRevenues: IRevenue[]) => void;
  setTimeline: (updatedTimeline: any) => void;
};

export const useGeneralStore = create(
  immer<State & Action>((set) => ({
    statistics: null,
    revenues: [],
    timeline: null,
    setStatistics: (updatedStatistics: IStatistics) =>
      set((state) => {
        state.statistics = updatedStatistics;
      }),
    setRevenues: (updatedRevenues: IRevenue[]) =>
      set((state) => {
        state.revenues = updatedRevenues;
      }),
    setTimeline: (updatedTimeline: any) =>
      set((state) => {
        state.timeline = updatedTimeline;
      }),
  }))
);
