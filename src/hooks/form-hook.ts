import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent, useReducer } from "react";


export const useFormInputs = (initialState: any) => {
    const reducer = (state: typeof initialState, payload: { type: string, name: string, value: string | boolean}) => {
        switch(payload.type) {
            case 'text':
                return {
                    ...state,
                    [payload.name]: payload.value
                }
            case 'check':
                return {
                    ...state,
                    [payload.name]: payload.value
                }
            case 'select':
                return {
                        ...state,
                        [payload.name]: payload.value
                }
            case 'reset':
                return initialState
            default:
                return state
        }
    };

    const [inputs, dispatch] = useReducer(reducer, initialState);
    
    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        dispatch({type: 'text', name: e.target.name, value: e.target.value})
    };

    const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({type: 'check', name: e.target.name, value: e.target.checked})
    }

    const handleSelect = (e: ChangeEvent<HTMLSelectElement> | SelectChangeEvent<string>) => {
        dispatch({type: "select", name: e.target.name, value: e.target.value})
    }

    // const handleReset = () => {
    //     dispatch({type: 'reset'})
    // }

    return {inputs, bind: { onChange: handleChange }, toggle: { onChange: handleToggle}, select: { onChange: handleSelect}};
};