import Image from "next/image";
import Link from "next/link";

// Reemplazar la url de logo por la foto correcta

export default function Logo({ width = 40, height = 40 }: { width?: number; height?: number }) {
	return (
		<Link href="/" className="flex items-center gap-2">
			<Image src={"/window.svg"} alt="Logo" width={width} height={height} />
		</Link>
	);
}
