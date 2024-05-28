import { Bento, generateRandomBento } from "@/utils";

import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface BentoSettingsState {
  bento: Bento;
  columnNumber: number;
  displayCopyToast: boolean;
  rowNumber: number;
}

const initialState: BentoSettingsState = {
  bento: generateRandomBento(6, 5),
  columnNumber: 6,
  displayCopyToast: false,
  rowNumber: 5,
};

export const bentoSettingsSlice = createSlice({
  name: "bentoSettings",
  initialState,
  reducers: {
    setBento: (state) => {
      state.bento = generateRandomBento(state.columnNumber, state.rowNumber);
      state.displayCopyToast = false;
    },
    setColumnNumber: (state, action: PayloadAction<number>) => {
      state.columnNumber = action.payload;
      state.bento = generateRandomBento(state.columnNumber, state.rowNumber);
      state.displayCopyToast = false;
    },
    setRowNumber: (state, action: PayloadAction<number>) => {
      state.rowNumber = action.payload;
      state.bento = generateRandomBento(state.columnNumber, state.rowNumber);
      state.displayCopyToast = false;
    },
    setDisplayCopyToast: (state, action: PayloadAction<boolean>) => {
      state.displayCopyToast = action.payload;
    },
  },
});

export const { setBento, setDisplayCopyToast, setColumnNumber, setRowNumber } =
  bentoSettingsSlice.actions;

export default bentoSettingsSlice.reducer;
