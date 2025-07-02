// src/helpers/extraControlsHandle.ts

import { Dispatch, SetStateAction } from "react";

export interface ExtraControlsState {
  visibleTrackId: string | null;
  timerId: number | null; 
}

/**
 * Show the extra controls for a given track
 */
export function handleExtraControlsToggle(
  trackId: string,
  state: ExtraControlsState,
  setState: Dispatch<SetStateAction<ExtraControlsState>>
) {
  if (state.visibleTrackId === trackId) {
    // If same button clicked again, reset timer
    clearTimeout(state.timerId!);
  }

  setState((prev) => ({
    visibleTrackId: trackId,
    timerId: window.setTimeout(() => {
      setState({
        visibleTrackId: null,
        timerId: null,
      });
    }, 7000),
  }));
}

/**
 * Hide the extra controls immediately (when a button is clicked inside it)
 */
export function handleExtraControlsHide(setState: Dispatch<SetStateAction<ExtraControlsState>>) {
  setState({
    visibleTrackId: null,
    timerId: null,
  });
}
