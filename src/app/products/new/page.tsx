import ProductForm from "@/components/product-form";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Add New Product",
	description: "Add a new product to chat about",
};

export default function NewProductPage() {
	return (
		<div className="container mx-auto py-10">
			<div className="mb-8">
				<Button variant="ghost" asChild>
					<Link href="/">
						<ArrowLeft className="mr-2 h-4 w-4" />
						Back to Products
					</Link>
				</Button>
			</div>

			<Card className="max-w-2xl mx-auto">
				<CardHeader>
					<CardTitle>Add New Product</CardTitle>
					<CardDescription>
						Create a new product to chat about with the AI assistant
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ProductForm />
				</CardContent>
			</Card>
		</div>
	);
}
