import React, { useContext } from 'react';
import { withApollo } from '../libs/apollo';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { ALL_PRODUCTS } from '../gql/products';
import { CREATE_SESSION } from '../gql/session';
import Header from '../components/header';
import { BasketContext, withSession } from '../libs/basket';

const Product = ({id, name, price, sku }) => {
  const { addItem } = useContext(BasketContext);

  const [createSession, { data }] = useMutation(CREATE_SESSION, {variables: {productSku: sku}});

  const buyIt = () => {
    console.log(`buy ${name} for ${price} (id: ${id})`);
    addItem({id, name, price, sku});
    createSession();
  }


  return (
    <div>
      {name} - ({price})
      <button onClick={buyIt}>Buy</button>
    </div>
  );
}

const IndexPage = () => {
	const { loading, error, data } = useQuery(ALL_PRODUCTS);
	if (error) return <h1>Error</h1>;
  if (loading) return <h1>Loading...</h1>;
  
	return (
		<>
      <Header />
			<div>
				<h1>Index2</h1>
			</div>
      <ul>
				{data.listProducts.items.map(({ id, name, price, sku }) => (
						<li key={id}><Product id={id} name={name} price={price} sku={sku}/></li>
				))}
			</ul>
		</>
	);
};

export default withApollo({ ssr: true })(withSession(IndexPage));
