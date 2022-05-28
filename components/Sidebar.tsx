import { useEffect, useState } from "react"

import { parseEvents } from "./events"
import styles from "../styles/Sidebar.module.css"

const Sidebar = ({ data }) => {
	const [dataList, setDataList] = useState([])

	useEffect(() => {
		const [eventFleetSent, eventExitComplete] = parseEvents(data)

		let fleetSentList = []
		eventFleetSent.forEach((loc) => {
			fleetSentList.push(
				<p key={`${loc.x}-${loc.y}`}>
					{loc.x}-{loc.y} sent {loc.quantity}
				</p>
			)
		})
		setDataList(fleetSentList)
	}, [])

	return <div className={styles.sidebar}>{dataList}</div>
}

export default Sidebar
