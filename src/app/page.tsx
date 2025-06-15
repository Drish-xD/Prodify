import NoProducts from "@/components/no-products";
import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { getAllProducts } from "@/services";
import { PlusCircle } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
	title: "Products",
	description: "Select a product to chat about",
};

export default async function Home() {
	const products = await getAllProducts();

	return (
		<div className="container mx-auto py-10">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold">Products</h1>
				<Button asChild>
					<Link href="/products/new">
						<PlusCircle className="mr-2 h-4 w-4" />
						Add Product
					</Link>
				</Button>
			</div>

			{products.length === 0 ? (
				<NoProducts />
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{products.map((product) => (
						<ProductCard key={product.id} {...product} />
					))}
				</div>
			)}
		</div>
	);
}
