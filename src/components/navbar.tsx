import { Link } from "react-router-dom";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { useAtom } from "jotai";
import { RESET } from "jotai/utils";
import { authAtom } from "@/store/store";
import { Button } from "./ui/button";
import { useCookies } from "react-cookie";

export default function Navbar() {
	const [auth, setAuth] = useAtom(authAtom);
	const [, , removeCookie] = useCookies(["access_token"]);
	function handleLogout() {
		setAuth(RESET);
		removeCookie("access_token");
	}
	return (
		<div className="border-b-[0.05rem] border-white/20">
			<div className="container">
				<div className="flex items-center py-2 justify-between">
					{/* Logo */}
					<div className="hover:underline font-bold">
						<Link to={"/"}>hello-world</Link>
					</div>
					{/* Menu */}
					<NavigationMenu>
						<NavigationMenuList>
							<NavigationMenuItem>
								{auth.status === "unauthenticated" ? (
									<span className={navigationMenuTriggerStyle()}>
										<Link to={"/auth/login"}>Login</Link>
									</span>
								) : (
									<>
										<span className={navigationMenuTriggerStyle()}>
											<Link to={"/dashboard"}>Dashboard</Link>
										</span>
										<Button variant="ghost" onClick={handleLogout}>
											Logout
										</Button>
									</>
								)}
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</div>
			</div>
		</div>
	);
}
