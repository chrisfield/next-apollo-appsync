import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { ALL_SESSIONS, GET_SESSION, UPDATE_SESSION, CREATE_SESSION } from '../gql/session';
import cookie from 'cookie';
import cookies from 'js-cookie';
import parseCookies from './parse-cookies';

export const BasketContext = React.createContext();
export const SessionContext = React.createContext();

export const withBasket = (BaseComponent) => {
  return (
    (props) => {
      const [items, setItems] = useState([]);
      const addItem = item => {
        const newItems = items.slice();
        newItems.push(item);
        setItems(newItems);
      }
      useEffect(()=>{
        console.log('withBasket mounted');
        return () => {console.log('withBasket unmounted');};
      }, []);
      return (
        <BasketContext.Provider value={{items, addItem}}>
          <BaseComponent {...props} />
        </BasketContext.Provider>
      );
    }
  )
};

export const withSession = (BaseComponent) => {
  const NewComponent = (props) => {
    const [sessionId, setSessionId] = useState(props.sessionId);
    const { loading, error, data } = useQuery(GET_SESSION, {variables: {id:sessionId}});
    console.log('data', data)
    const [createSession] = useMutation(CREATE_SESSION);
    const [updateSession] = useMutation(UPDATE_SESSION);
    // console.log('data', data);
    const addItem = item => {
      const { sessionId } = cookie.parse(document.cookie);
      const products = data.getSession.products.slice();
      products.push(item.sku);
      updateSession({variables: { products, id: sessionId }});
    }

    useEffect(()=>{
      (async () => {
        const { sessionId } = cookie.parse(document.cookie);
        console.log('Session Id is: ', sessionId);
        if (!sessionId) {
          const hh = await createSession();
          setSessionId(hh.data.createSession.id);
          console.log('Session Created', hh.data.createSession.id)
          cookies.set('sessionId', hh.data.createSession.id)
        }  
      })();
    }, []);
    
    return (
      <SessionContext.Provider value={{error, loading, data, addItem}}>
        <BaseComponent {...props} />
      </SessionContext.Provider>
    );
  };
  NewComponent.getInitialProps = (ctx) => {
    const { req } = ctx;
    const cookies = parseCookies(req);
    const props = { sessionId: cookies.sessionId };
    if (BaseComponent.getInitialProps) {
      const props2 = BaseComponent.getInitialProps(ctx);
      return {...props, ...props2};
    }
    return props;
  };
  return NewComponent;
};