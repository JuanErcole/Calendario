import { addHours, differenceInSeconds } from "date-fns";
import { es } from "date-fns/locale";
import { useMemo, useState } from "react";

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal"
import Swal from "sweetalert2";
import { useUiStore } from "../../hooks/useUiStore";

registerLocale( 'es', es )

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

  const { isDateModalOpen, closeDateModal } = useUiStore();

    const [formSubmited, setFormSubmited] = useState(false)

  const [formValues, setFormValues] = useState({
    title: 'Juan',
    notes: 'Ercole',
    start: new Date(),
    end: addHours( new Date(), 2 ),
  })

  const titleClass = useMemo(() =>{
     if ( !formSubmited ) return '';

     return ( formValues.title.length > 0 )
      ? 'is-valid'
      : 'is-invalid'

  },[formValues.title, formSubmited])

  const onInputChange = ({ target })=>{
    
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }

  const onDateChanged = ( event, changing ) => {
    setFormValues({
      ...formValues,
      [changing]: event
    })
  }
  
  const onCloseModal = () =>{
    closeDateModal();
  }

  const onSubmit = (event) => {

    event.preventDefault();

    setFormSubmited(true);

    const difference = differenceInSeconds( formValues.end, formValues.start );

    if( isNaN( difference ) || difference <= 0 ){
      Swal.fire('Fechas incorrectas','revisar fechas ingresadas', 'error')
      return;
    }

    if( formValues.title.length <= 0 ) return;
    
    console.log(formValues);

  }

  return (
    <Modal
      isOpen={ isDateModalOpen }
      onRequestClose={ onCloseModal }
      style={ customStyles }
      className='modal'
      overlayClassName='modal-fondo'
      closeTimeoutMS={ 200 }
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form onSubmit={ onSubmit } className="container">

          <div className="form-group mb-2">
              <label>Fecha y hora inicio</label>
              <DatePicker
                locale='es'
                timeCaption="Hora" 
                selected={formValues.start} 
                onChange={ (event) => onDateChanged(event, 'start') }  
                dateFormat='Pp'
                showTimeSelect
              />
          </div>

          <div className="form-group mb-2">
              <label>Fecha y hora fin</label>
              <DatePicker
                locale='es'
                timeCaption="Hora" 
                minDate={formValues.start}
                selected={formValues.end} 
                onChange={ (event) => onDateChanged(event, 'end') } 
                dateFormat='Pp'
                showTimeSelect
              />
          </div>

          <hr />
          <div className="form-group mb-2">
              <label>Titulo y notas</label>
              <input 
                  type="text" 
                  className={`form-control ${ titleClass }`}
                  placeholder="Título del evento"
                  name="title"
                  value={formValues.title}
                  autoComplete="off"
                  onChange={ onInputChange }
              />
              <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
          </div>

          <div className="form-group mb-2">
              <textarea 
                  type="text" 
                  className="form-control"
                  placeholder="Notas"
                  rows="5"
                  name="notes"
                  value={formValues.notes}
                  onChange={ onInputChange }
              ></textarea>
              <small id="emailHelp" className="form-text text-muted">Información adicional</small>
          </div>

          <button
              type="submit"
              className="btn btn-outline-primary btn-block"
          >
              <i className="far fa-save"></i>
              <span> Guardar</span>
          </button>

      </form>
    </Modal>
  )
}
