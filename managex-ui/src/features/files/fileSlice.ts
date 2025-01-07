// src/features/files/fileSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { uploadFileThunk, fetchFileThunk } from "./fileThunks";
import { ProjectFile, FilesState } from "./file-types";
import { AppError } from "../../utils/error-handling";


const initialState: FilesState = {
  files: [],
  loading: false,
  error: null,
};

const fileSlice = createSlice({
  name: "files",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadFileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadFileThunk.fulfilled, (state, action: PayloadAction<ProjectFile>) => {
        state.loading = false;
        state.files.push(action.payload);
        state.error = null;
      })
      .addCase(uploadFileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as AppError;
      })
      .addCase(fetchFileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFileThunk.fulfilled, (state, action: PayloadAction<ProjectFile>) => {
        state.loading = false;
        state.files = [action.payload];
        state.error = null;
      })
      .addCase(fetchFileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as AppError;
      });
  },
});

export const fileReducer = fileSlice.reducer;