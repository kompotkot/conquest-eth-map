import React from "react"

import { getData } from "../api/receiver"
import Layout from "../components/Layout"
import Map from "../components/Map"
import Sidebar from "../components/Sidebar"

const Index = ({ data }) => {
	return (
		<Layout>
			<Map data={data} />
			<Sidebar data={data} />
		</Layout>
	)
}

export default Index
export async function getStaticProps() {
	const data = await getData()

	return {
		props: { data }
	}
}
