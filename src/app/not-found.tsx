import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-4">
			<h1 className="text-4xl font-bold mb-2">404</h1>
			<h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
			<p className="text-muted-foreground mb-8 text-center">
				The page you are looking for doesn&apos;t exist or has been moved.
			</p>
			<Button asChild>
				<Link href="/">
					<Home className="mr-2 h-4 w-4" />
					Back to Home
				</Link>
			</Button>
		</div>
	);
}
