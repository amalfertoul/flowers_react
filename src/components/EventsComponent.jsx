import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents, deleteEvent } from "../redux/slices/eventsSlice";

const EventsComponent = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  return (
    <div>
      <h2>Events</h2>
      <ul>
        {items.map(event => (
          <li key={event.id}>
            {event.request} <button onClick={() => dispatch(deleteEvent(event.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventsComponent;
