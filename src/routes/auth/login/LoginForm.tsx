import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { atomsWithMutation } from "jotai-tanstack-query";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useAtom } from "jotai";
import { AuthStatus, authAtom } from "@/store/store";


interface LoginResponse {
	user: {
		id: number;
		username: string;
		role: string | null,
	}
	token: string;
}

const loginFormSchema = z.object({
	username: z.string().min(1, {
		message: "Username cannot be empty!",
	}),
	password: z.string().min(1, {
		message: "Password cannot be empty!",
	}),
});


const [, loginAtom] = atomsWithMutation(() => ({
	mutationKey: ['login'],
	mutationFn: async ({username, password}: {username: string, password: string}) => {
		const res = await fetch("http://localhost:8080/auth/login", {
			method: "POST",
			body: JSON.stringify({ username, password }),
			headers: {
				'Content-Type': "application/json; charset=UTF-8"
			}
		})
		const data: LoginResponse = await res.json()
		return data;
	}
}))

export default function LoginForm() {
	const [login ,mutate] = useAtom(loginAtom)
	const [value, setValue] = useAtom(authAtom)
	const form = useForm<z.infer<typeof loginFormSchema>>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof loginFormSchema>) {
		try {

			const response = await mutate([{ username: values.username, password: values.password}])	
			if (login.isSuccess) {
				setValue({
					user: response.user,
					token: response.token,
					status: AuthStatus.Authenticated,
			})
			}
		} catch (error) {
			console.error(error);
		}
	}

	console.log(value);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="space-y-3">
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input {...field} placeholder="Username..." />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input type="password" {...field} placeholder="Password..." />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormDescription>
						Forgot your username and password? too bad we didn't implement the
						feature yet!.
					</FormDescription>
					<Button type="submit">Login</Button>
				</div>
			</form>
			{JSON.stringify(value)}
		</Form>
	);
}
