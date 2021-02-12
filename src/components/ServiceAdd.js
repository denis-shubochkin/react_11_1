import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { changeServiceField, addService, clearService } from '../actions/actionCreators';
import './ServiceAdd.css';

function ServiceAdd() {
  const {item, loading, error} = useSelector(state => state.serviceAdd);
  const dispatch = useDispatch();

  const handleChange = evt => {
    const {name, value, desc} = evt.target;
    dispatch(changeServiceField(name, value, desc));
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    addService(dispatch, item.name, item.price, item.desc);
  }

  const handleClear = (evt) => {
		evt.preventDefault();
		dispatch(clearService());
	}

  return (
    <form onSubmit={handleSubmit} className="Form">
      <span className="NameLabel">Название</span>
      <input name='name' onChange={handleChange} value={item.name} className="InputName Input"/>
      <span className="PriceLabel">Цена</span>
      <input name='price' onChange={handleChange} value={item.price} className="InputPrice Input" />
      <span className="DescLabel">Описание</span>
      <input name='desc' onChange={handleChange} value={item.desc} className="InputDesc Input" />
      <div className="Buttons">   
        <button type='submit' disabled={loading} className="SubmitBtn Btn">Сохранить</button>
        <button onClick={handleClear} className="ClearBtn Btn">Отмена</button>
      </div>
      {error && <p>Something went wrong try again</p>}
    </form>
  );
}

export default ServiceAdd;
