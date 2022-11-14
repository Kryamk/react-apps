import React, { Fragment, useState } from 'react'



export default function DataTable() {
	const [filterSearch, setfilterSearch] = useState('');
	const [filterCheck, setfilterCheck] = useState(false);

	const products = [
		{ category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football" },
		{ category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball" },
		{ category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball" },
		{ category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch" },
		{ category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5" },
		{ category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" }
	];

	const handleCheck = (e) => {
		setfilterCheck(e.target.checked)
	}

	const handleSearch = (e) => {
		setfilterSearch(e.target.value)
	}

	return (
		<div style={{ width: 220, margin: '0 auto 0' }}>
			<SearchBar valueSearch={filterSearch} onChangeSearch={handleSearch} valueCheck={filterCheck} onChangeCheck={handleCheck} />
			<ProductTable products={products} valueCheck={filterCheck} valueSearch={filterSearch} />
		</div>
	)
}

function SearchBar({ valueSearch, onChangeSearch, valueCheck, onChangeCheck }) {
	return (
		<form style={{ display: 'flex', flexDirection: 'column' }}>
			<input type='text' placeholder='Search' value={valueSearch} onChange={onChangeSearch} />
			<label>
				<input type='checkbox' checked={valueCheck} onChange={onChangeCheck} />
				Only show products in stock
			</label>
		</form>
	)
}

function ProductTable({ products, valueCheck, valueSearch }) {
	let categaryCurrent = '';
	return (
		<table>
			<thead>
				<tr>
					<td>Name</td>
					<td>Price</td>
				</tr>
			</thead>
			<tbody>
				{products.map(pr => {
					if (valueCheck && !pr.stocked) return;
					if (valueSearch !== '' && pr.name.toLowerCase().indexOf(valueSearch) === -1) return;
					if (categaryCurrent !== pr.category) {
						categaryCurrent = pr.category;
						return (
							<Fragment key={pr.name}>
								<ProductCategoryRow category={pr.category} />
								<ProductRow name={pr.name} price={pr.price} />
							</Fragment>
						)
					}
					return <ProductRow key={pr.name} name={pr.name} price={pr.price} />
				})}
			</tbody>
		</table >
	)
}

function ProductCategoryRow({ category }) {
	return (
		<tr>
			<td colSpan={2} style={{ textAlign: 'center' }}>{category}</td>
		</tr>
	)
}

function ProductRow({ name, price }) {
	return (
		<tr>
			<td>{name}</td>
			<td>{price}</td>
		</tr>
	)
}
