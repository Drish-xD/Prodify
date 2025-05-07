"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2Icon, PlusCircle, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { createProduct } from "../services/actions";

export default function ProductForm() {
	const router = useRouter();
	const formRef = useRef<HTMLFormElement>(null);
	const [state, formAction, isPending] = useActionState(createProduct, {
		status: "default",
		data: null,
		error: null,
	});

	const [competitors, setCompetitors] = useState([""]);

	const addCompetitor = () => setCompetitors((prev) => [...prev, ""]);

	const removeCompetitor = (index: number) =>
		setCompetitors((prev) => prev.filter((_, i) => i !== index));

	const updateCompetitors = (index: number, value: string) =>
		setCompetitors((prev) =>
			prev.map((competitor, i) => (i === index ? value : competitor)),
		);

	useEffect(() => {
		if (state.status === "success") {
			formRef.current?.reset();
			setCompetitors([""]);
			toast.success("Product created successfully");
			router.push("/");
		} else if (state.status === "error") {
			toast.error(String(state.error));
		}
	}, [state, router]);

	return (
		<form action={formAction} className="space-y-6">
			<div className="space-y-2">
				<Label htmlFor="name">Product Name *</Label>
				<Input
					id="name"
					name="name"
					required
					placeholder="Enter product name"
				/>
			</div>

			<div className="space-y-2">
				<Label htmlFor="description">Product Description *</Label>
				<Textarea
					id="description"
					name="description"
					required
					placeholder="Describe your product in detail"
					rows={4}
				/>
			</div>

			<div className="space-y-2">
				<Label htmlFor="websiteUrl">Website URL</Label>
				<Input
					id="websiteUrl"
					name="websiteUrl"
					placeholder="https://example.com"
					type="url"
				/>
			</div>

			<div className="space-y-2">
				<Label htmlFor="additionalInfo">Additional Information</Label>
				<Textarea
					id="additionalInfo"
					name="additionalInfo"
					placeholder="Any other details about your product"
					rows={3}
				/>
			</div>

			<div className="space-y-2">
				<Label>Competitors *</Label>
				<p className="text-sm text-muted-foreground mb-2">
					List competitors that the AI should not discuss
				</p>

				{competitors.map((competitor, index) => (
					<div key={index} className="flex items-center gap-2 mb-2">
						<Input
							name="competitors"
							value={competitor}
							onChange={(e) => updateCompetitors(index, e.target.value)}
							placeholder="Competitor name"
							required={index === 0}
						/>
						{competitors.length > 1 && (
							<Button
								type="button"
								variant="ghost"
								size="icon"
								onClick={() => removeCompetitor(index)}
							>
								<XIcon className="h-4 w-4" />
							</Button>
						)}
					</div>
				))}

				<Button
					type="button"
					variant="outline"
					size="sm"
					onClick={addCompetitor}
					className="mt-2"
				>
					<PlusCircle className="mr-2 h-4 w-4" />
					Add Competitor
				</Button>
			</div>

			<Button className="w-full" type="submit" disabled={isPending}>
				{isPending ? (
					<Loader2Icon className="h-4 w-4 animate-spin" />
				) : (
					"Create Product"
				)}
			</Button>
		</form>
	);
}
