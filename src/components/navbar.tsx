import { Link } from "react-router-dom";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { useAtom } from "jotai";
import { selectAtom } from "jotai/utils";
import { authAtom } from "@/store/store";

const statusAtom = selectAtom(authAtom, (auth) => auth.status);
export default function Navbar() {
	const [status] = useAtom(statusAtom);
	console.log(status);
	return (
		<div className="border-b-[0.05rem] border-b-slate-50">
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
								{status === "unauthenticated" ? (
									<span className={navigationMenuTriggerStyle()}>
										<Link to={"/auth/login"}>Login</Link>
									</span>
								) : (
									<span className={navigationMenuTriggerStyle()}>
										<Link to={"/dashboard"}>Dashboard</Link>
									</span>
								)}
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</div>
			</div>
		</div>
	);
}
