export type StateType = {
  centerIndex: number;
  startX: number;
  beforePositionX: number;
  positionX: number;
  isAnimation: boolean;
};

export type Action =
  | {
      type: "MOVE_START";
      payload: { startX: number };
    }
  | {
      type: "MOVING";
      payload: { startX: number; deltaX: number };
    }
  | {
      type: "MOVE_RETURN" | "MOVE_NEXT" | "MOVE_BACK" | "CHANGE_WIDTH";
    };
