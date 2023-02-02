import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers/convertEventsToDateEvents";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store/calendar/calendarSlice';


export const useCalendarStore = () => {

  const dispatch = useDispatch();
  
  const { events, activeEvent } = useSelector( state => state.calendar )

  const { user } = useSelector( state => state.auth )
  
  const setActiveEvent = ( calendarEvent ) => {
    dispatch( onSetActiveEvent( calendarEvent ) )
  }

  const startSavingEvent = async( calendarEvent ) =>{
    
    try {

      if ( calendarEvent.id ){
  
        await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent)
        dispatch( onUpdateEvent({ ...calendarEvent, user }) )
        
        return
      }
  
      const { data } = await calendarApi.post('/events', calendarEvent)
      console.log({data});
      dispatch( onAddNewEvent({ ...calendarEvent, id: data.event.id, user }) )
      
    } catch (error) {
      Swal.fire('Error al guardar', error.response.data.msg , 'error')
    }

  } 

  const startDeleteEvent = async() =>{
    
    try {
      
      await calendarApi.delete(`/events/${ activeEvent.id }`)
      dispatch( onDeleteEvent() );

    } catch (error) {
      Swal.fire('Error al eliminar', error.response.data.msg , 'error')
    }

  }

  const startLoadEvents = async() => {

    try {

      const { data } = await calendarApi.get('/events');
      const events = convertEventsToDateEvents(data.events)

      dispatch( onLoadEvents( events ) )
      
    } catch (error) {
      console.log(error);
    }

  }
    
  
  return {
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    setActiveEvent,
    startSavingEvent,
    startDeleteEvent,
    startLoadEvents,
  }
}
