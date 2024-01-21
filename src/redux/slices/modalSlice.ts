import { createSlice} from "@reduxjs/toolkit";

interface ModalState {
    loading: "idle" | "pending" | "fulfilled" | "rejected" | boolean
    error?: any
    action: string
    type:string
    modalData: string
}

const initialState: ModalState = {
    loading: false,
  error: {},
  
  action: "",
  type: "",
  modalData: ""
}



export const modalSlice = createSlice({
  name: "modal",

  initialState,

  reducers: {

    startLoading: state => {
      state.loading = true;
    },
    hasError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    showModalAction: (state, action) => {
      state.action = action.payload.action;
      state.type = action.payload.type;
      state.modalData = action.payload.modalData;
      state.loading = false;
    }
 
  }
});
export default modalSlice.reducer;

// Actions
const { startLoading, hasError, showModalAction } = modalSlice.actions;

export const showModal = (data: any) => async (dispatch: (arg0: { payload: any; type: string; }) => void) => {
  try {
    dispatch(startLoading());
    return dispatch(showModalAction(data));
  }
  catch (e:any) {
    return dispatch(hasError(e.message));
  }
};