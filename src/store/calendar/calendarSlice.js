import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = {
  title: 'Cumpleaños del perro',
  notes: 'Hay que comprar comida',
  start: new Date(),
  end: addHours( new Date(), 2 ),
  bgColor:'#fafafa',
  user: {
    id: '123',
    name: 'Juan'
  }

}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    events: [
      tempEvent
    ],
    activeEvent: null,

  },
  reducers: {
    viewEvents: (state ) => {
      

  },
  }
});


// Action creators are generated for each case reducer function
export const { increment } = calendarSlice.actions;