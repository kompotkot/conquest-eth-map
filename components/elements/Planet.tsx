import { useLayoutEffect, useRef, useState } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"

import Details from "./Details"

const Planet = (props: JSX.IntrinsicElements["mesh"]) => {
	const planetRef = useRef<THREE.Mesh>(null!)
	const canvasRef = useRef(document.createElement("canvas"))

	const [hovered, setHover] = useState(false)

	// useLayoutEffect(() => {
	// 	const canvas = canvasRef.current

	// 	canvas.width = props.windowWidth
	// 	canvas.height = props.windowHeight

	// 	const ctx = canvas.getContext("2d")
	// 	if (ctx) {
	// 		ctx.fillStyle = "#ffffff"
	// 		ctx.fillRect(0, 0, 64, 32)

	// 		ctx.fillStyle = "#666666"
	// 		ctx.fillRect(8, 8, 48, 24)
	// 	}
	// }, [])

	useFrame((state, delta) => {
		const canvas = canvasRef.current
		canvas.width = window.innerWidth
		canvas.height = window.innerHeight

		const ctx = canvas.getContext("2d")
		if (ctx) {
			ctx.fillStyle = "purple"
			ctx.fillRect(0, 0, 20, 20)
		}
	})

	return (
		<mesh
			{...props}
			ref={planetRef}
			onPointerOver={() => setHover(true)}
			onPointerOut={() => setHover(false)}
		>
			<sphereBufferGeometry args={[1, 20, 20]} />
			<meshBasicMaterial color={hovered ? "blue" : props.color} />

			{hovered && (
				<>
					<mesh>
						<ringGeometry
							args={[2, 2.2, 40, 1, 0, 0.5 * Math.PI]}
						/>
						<meshBasicMaterial
							color="white"
							// transparent={true}
							// opacity={0.5}
							// side={THREE.DoubleSide}
						/>
					</mesh>
					<mesh>
						<ringGeometry args={[3, 3.2, 40]} />
						<meshBasicMaterial
							color="white"
							transparent={true}
							opacity={0.5}
							side={THREE.DoubleSide}
						/>
					</mesh>
					<Details quantity={props.eventQuantity} />
				</>
			)}
		</mesh>
	)
}

export default Planet
