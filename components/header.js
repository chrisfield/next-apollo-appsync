import React, { useContext } from 'react';
import { BasketContext, SessionContext } from '../libs/basket';
import Link from 'next/link';

const Header = () => {
  const { data, error, loading } = useContext(SessionContext);
  if (error) return <h1>Error</h1>;
  if (loading) return <h1>Loading...</h1>;
  // console.log('data in header', data);
  return (
    <div>
      This is the header.
      {data.getSession.products.map(sku => (<div key={sku}>{sku}</div>))}
      <Link href="/index2">
        <a>Index 2</a>
      </Link>
      <Link href="/">
        <a>Home</a>
      </Link>
    </div>
  );
};

export default Header;
