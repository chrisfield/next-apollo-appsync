import React, { useContext } from 'react';
import { withApollo } from '../libs/apollo';
import { useQuery } from '@apollo/react-hooks';
import { ALL_PRODUCTS } from '../gql/products';
import Header from '../components/header';
import { BasketContext, withSession } from '../libs/basket';
import Link from 'next/link';
import parseCookies from '../libs/parse-cookies';
import { serialize } from 'cookie';

const Product = ({id, name, sku, price }) => {
  const { addItem } = useContext(BasketContext); 
  const buyIt = () => {
    console.log(`buy ${name} for ${price} (id: ${id})`);
    addItem({id, name, price, sku});
  }
  return (
    <Link href={`/product/${sku}`}>
      <a>
        {name} - ({sku}) £{price}
        <button onClick={buyIt}>Buy</button>
      </a>
    </Link>
  );
}

const Index = () => {
	const { loading, error, data } = useQuery(ALL_PRODUCTS);
	if (error) return <h1>Error</h1>;
  if (loading) return <h1>Loading...</h1>;
  
	return (
		<>
      <Header />
			<div>
				<h1>Product List</h1>
			</div>
			<div>
        <ul>
          {data.listProducts.items.map(({ id, name, price, sku }) => (
            <li key={id}>
              <Product id={id} name={name} price={price} sku={sku}/>
            </li>
          ))}
        </ul>
      </div>
		</>
	);
};

// function abc (res) {
//   // ...
//   res.setHeader('Set-Cookie', serialize('sessionId', 'sessionId_cookie_value', { path: '/' }));
// }

Index.getInitialProps = ({ req, res }) => {
  // abc(res);

  const cookies = parseCookies(req);
  console.log('cookies', cookies);  
  return { sessionId: cookies.sessionId };
}

export default withApollo({ ssr: true })(withSession(Index));
