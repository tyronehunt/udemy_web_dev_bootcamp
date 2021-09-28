
import React, { createContext, useReducer, useEffect } from 'react';
import { bookReducer } from '../reducers/bookReducer';

export const BookContext = createContext();

const BookContextProvider = (props) => {
  const [books, dispatch] = useReducer(bookReducer, [], () => {
      const localData = localStorage.getItem('books');
      return localData ? JSON.parse(localData) : []
  });

    // Whenever books data object changes run this hook
    useEffect(() => {
        localStorage.setItem('books', JSON.stringify(books))
    }, [books]);

  return (
    <BookContext.Provider value={{ books, dispatch}}>
      {props.children}
    </BookContext.Provider>
  );
}
 
export default BookContextProvider;