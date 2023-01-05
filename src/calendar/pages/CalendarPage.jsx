import { NavBar } from '../components/NavBar';

import { Calendar } from 'react-big-calendar';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours  } from 'date-fns';
import { localizer } from '../../helpers/calendarLocalizer';
import { getMessagesES } from '../../helpers/getMessages';
import { CalendarEvent } from '../components/CalendarEvent';
import { useState } from 'react';
import { CalendarModal } from '../components/CalendarModal';



const events = [{
  title: 'Cumpleaños del perro',
  notes: 'Hay que comprar comida',
  start: new Date(),
  end: addHours( new Date(), 2 ),
  bgColor:'#fafafa',
  user: {
    id: '123',
    name: 'Juan'
  }

}]

export const CalendarPage = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week' );

  const eventStyleGetter = ( event, start, end, isSelected ) =>{

    const style = {
      backgroundColor: '#347cf7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    }

    return{
      style
    }
  }

  const onDoubleClick = ( event ) =>{
    console.log({ doubleClick: event });
  }

  const onSelect = ( event ) =>{
    console.log({ click: event });
  }

  const onViewChanged = ( event ) =>{
    localStorage.setItem('lastView', event)
    setLastView(event)
  }


  return (
    <>
      <NavBar />

      <Calendar
        eventPropGetter={ eventStyleGetter }
        culture='es'
        localizer={ localizer }
        events={ events }
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )' }}
        messages={ getMessagesES() }
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChanged }
      />

      <CalendarModal/>

    </>
  )
}
