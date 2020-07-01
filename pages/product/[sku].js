import React, { useContext } from 'react';
import { withApollo } from '../../libs/apollo';
import { useQuery } from '@apollo/react-hooks';
import { PRODUCTS_WITH_SKU } from '../../gql/products';
import Header from '../../components/header';
import { BasketContext, SessionContext ,withSession } from '../../libs/basket';
import { useRouter } from 'next/router';

const Product = ({id, name, sku, price }) => {
  const { addItem } = useContext(SessionContext); 
  const buyIt = () => {
    console.log(`buy ${name} for ${price} (id: ${id})`);
    addItem({id, name, price, sku});
  }
  return (
    <div>
      {name} - ({sku}) £{price}
      <button onClick={buyIt}>Buy</button>
    </div>
  );
}

const IndexPage = () => {
  const router = useRouter()
  const { sku } = router.query
  const { loading, error, data } = useQuery(PRODUCTS_WITH_SKU, {
    variables: {sku}
  });


	if (error) return <h1>Error</h1>;
  if (loading) return <h1>Loading...</h1>;

  console.log('data', data);
  const { id, name, price } = data.listProducts.items[0];
  
	return (
		<>
      <Header />
			<div>
        <h1>Product: {sku} </h1>
			</div>
			<div>
			  <Product id={id} name={name} price={price} sku={sku}/>
			</div>
		</>
	);
};

export default withApollo({ ssr: true })(withSession(IndexPage));
