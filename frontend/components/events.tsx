import { BigNumber } from "@ethersproject/bignumber"
import {
	xyToLocation,
	locationToXY,
	coordFromLocation
} from "conquest-eth/lib/cjs/src/util/location"

export const parseEvents = (data: any[]) => {
	let fleetSent = []
	let exitComplete = []

	data.forEach((event) => {
		if (event.event === "FleetSent") {
			const locationHex = BigNumber.from(event.args.from).toHexString()
			const { x, y } = locationToXY(locationHex)

			fleetSent.push({
				x: x,
				y: y,
				quantity: event.args.quantity
			})
		} else if (event.event === "ExitComplete") {
			const locationHex = BigNumber.from(
				event.args.location
			).toHexString()
			const { x, y } = locationToXY(locationHex)

			exitComplete.push({
				x: x,
				y: y,
				stake: event.args.stake
			})
		}
	})

	return [fleetSent, exitComplete]
}

export const fleetSizeColor = (quantity: number) => {
	if (quantity < 100000) {
		return "green"
	} else if (quantity >= 100000 && quantity <= 1000000) {
		return "orange"
	} else return "red"
}
