import React, { useEffect, useState } from "react";
import { Form, Link, NavLink, Outlet, useLoaderData, useNavigation, useSubmit } from "react-router-dom";
import { createContact, getContacts } from "../contacts";


export async function action() {
	await createContact();
}

export async function loader({ request }) {
	const url = new URL(request.url);
	const q = url.searchParams.get('q');
	const contacts = await getContacts(q);
	return { contacts, q };
}

export default function Root() {
	const { contacts, q } = useLoaderData();
	// const [query, setQuery] = useState(q);
	const navigation = useNavigation();
	const submit = useSubmit();

	const searching = navigation.location && new URLSearchParams(navigation.location.search).has('q');

	useEffect(() => {
		document.getElementById('q').value = q;
	}, [q])

	// useEffect(()=>{
	// 	setQuery(q);
	// },[q])

	return (
		<>
			<div id="sidebar">
				<h1>React Router Contacts</h1>
				<div>

					<Form id="search-form" role="search">
						<input
							id="q"
							className={searching ? 'loading' : ''}
							aria-label="Search contacts"
							placeholder="Search"
							type="search"
							name="q"
							defaultValue={q}
							onChange={(e) => {
								const isFirstSearch = q == null;
								submit(e.currentTarget.form, {
									replace: !isFirstSearch,
								})
							}}
						/>
						{/* <input value={query} onChange={(e)=> setQuery(e.target.value)} id="q" aria-label="Search contacts" placeholder="Search" type="search" name="q"/> */}
						<div id="search-spinner" aria-hidden hidden={!searching} />
						<div className="sr-only" aria-live="polite"></div>
					</Form>

					<Form method="post">
						<button type="submit">New</button>
					</Form>

				</div>
				<nav>
					{contacts.length ? (
						<ul>
							{contacts.map((contact) => (
								<li key={contact.id}>
									<NavLink to={`contacts/${contact.id}`} className={({ isActive, isPending }) => isActive ? 'active' : isPending ? 'pending' : ''}>
										{contact.first || contact.last ? (
											<>
												{contact.first} {contact.last}
											</>
										) : (
											<i>No Name</i>
										)}{" "}
										{contact.favorite && <span>★</span>}
									</NavLink>
								</li>
							))}
						</ul>
					) : (
						<p>
							<i>No contacts</i>
						</p>
					)}
				</nav>
			</div>
			<div id="detail" className={navigation.state === 'loading' ? 'loading' : ''}>
				<Outlet />
			</div>
		</>
	)
}
