import { Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "./ui/navigation-menu";

export default function Navbar() {
  return (
    <div className="border-b-[0.05rem] border-b-slate-50">
      <div className="container">
        <div className="flex items-center py-2 justify-between">
          {/* Logo */}
          <div className="hover:underline font-bold"><Link to={'/'}>hello-world</Link></div>
          {/* Menu */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Contact</NavigationMenuLink>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}><Link to={'/dashboard'}>Dashboard</Link></NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </div>
  );
}
