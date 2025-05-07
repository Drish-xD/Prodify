import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const NoProducts = () => {
	return (
		<div className="flex flex-col justify-center items-center py-20">
			<Image
				src="/images/Not-Found.png"
				width="400"
				height="400"
				alt="not found"
			/>

			<h2 className="text-xl font-medium">No products yet</h2>
			<p className="text-muted-foreground">
				Add your first product to start chatting with the AI
			</p>

			<Button asChild>
				<Link href="/products/new" className="mt-4">
					<PlusCircle className="mr-2 h-4 w-4" />
					Add Your First Product
				</Link>
			</Button>
		</div>
	);
};

export default NoProducts;
