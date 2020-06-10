import { defineLocale } from "moment";

const initialState = 0;

export default function (state = initialState, action) {
  const { type } = action
  switch(type) {
    case 'UPDATE_TIMER':
      return state + 1
    default: 
      return state
  }
}