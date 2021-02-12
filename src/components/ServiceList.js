import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { fetchServices, editService, clearService, delService } from '../actions/actionCreators';
import './ServiceList.css';

function ServiceList(props) {
  const {items, loading, error} = useSelector(state => state.serviceList);
  const {item} = useSelector(state => state.serviceAdd);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchServices(dispatch);
  }, [dispatch])

  const handleRemove = id => {
    // очищаем форму ввода если удаляем редактируемый элемент
    if(item.name===items.find((el)=>el.id===id).name)
    {
      dispatch(clearService());
    }
    delService(dispatch, id);
  }

  if (loading) {
    return  <div className="Loading"></div>;
  }

  if (error) {
    return <p>Something went wrong try again</p>;
  }


  const handleEdit = (name,price,desc) => {
    dispatch(editService(name,price, desc));
  }


  return (
    <ul className="List">
      {items.map(o => (
        <li className="Item" key={o.id}>
          <div className="Content">{o.name}: {o.price} руб.</div>
          <div className="ItemButtons">  
          <button className="DelBtn ItemBtn" onClick={() => handleRemove(o.id)}>✕</button>
          <button className="EditBtn ItemBtn" onClick={() => handleEdit(o.name, o.price, o.desc)}>✎</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ServiceList
