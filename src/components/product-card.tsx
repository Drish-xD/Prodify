import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { Product } from "@/types";
import Link from "next/link";

const ProductCard = (product: Product) => {
	return (
		<Card key={product.id} className="flex flex-col">
			<CardHeader>
				<CardTitle>{product.name}</CardTitle>
				<CardDescription className="line-clamp-2">
					{product.description}
				</CardDescription>
			</CardHeader>
			<CardContent className="grow">
				{product.websiteUrl && (
					<p className="text-sm mb-2">
						<span className="font-medium">Website:</span>{" "}
						<a
							href={product.websiteUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-600 hover:underline"
						>
							{product.websiteUrl}
						</a>
					</p>
				)}
				<p className="text-sm">
					<span className="font-medium">Created:</span>{" "}
					{new Date(product.createdAt).toLocaleDateString()}
				</p>
			</CardContent>
			<CardFooter>
				<Button asChild className="w-full">
					<Link href={`/chat/${product.id}`}>Chat About This Product</Link>
				</Button>
			</CardFooter>
		</Card>
	);
};

export default ProductCard;
