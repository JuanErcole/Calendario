import { useCalendarStore } from "../../hooks/useCalendarStore"

export const FabDelete = () => {
  
  const { startDeleteEvent, hasEventSelected } = useCalendarStore();

  const handleDeleteEvent = () => {
    startDeleteEvent();
  }
  
   
  return (
    <button
      style={{ display: !hasEventSelected && 'none' }}
      onClick={ handleDeleteEvent }
      className="btn btn-danger fab-delete"
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  )
}
