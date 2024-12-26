import Image from "next/image";

export default function Home() {
	return (
		<div className="flex flex-col gap-4">
			<h1>TEST TEST KEYCLOAK</h1>
			<div className="px-4">
				<button className="px-4 py-2 rounded-lg bg-blue-500 text-white">
					Login
				</button>
			</div>
		</div>
	);
}
