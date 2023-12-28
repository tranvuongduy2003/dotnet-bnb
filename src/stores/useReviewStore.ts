import { IRatingPoint, IReview } from "@/interfaces/IReview";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  ratingPoints: IRatingPoint[];
  reviews: IReview[];
};

type Action = {
  setRatingPoints: (updatedRatingPoints: IRatingPoint[]) => void;
  setReviews: (updatedReviews: IReview[]) => void;
};

export const useReviewStore = create(
  immer<State & Action>((set) => ({
    ratingPoints: [],
    reviews: [],
    setRatingPoints: (updatedRatingPoints: IRatingPoint[]) =>
      set((state) => {
        state.ratingPoints = updatedRatingPoints;
      }),
    setReviews: (updatedReviews: IReview[]) =>
      set((state) => {
        state.reviews = updatedReviews;
      }),
  }))
);
