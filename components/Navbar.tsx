import Link from "next/link";
import React from "react";
import ActiveLink from "./ActiveLink";
import { CalendarIcon, ChecklistIcon, HomeIcon, InfoIcon, QuestionIcon } from "@primer/octicons-react";

export default function Navbar() {
    const navItem =[
        {path:'about',text:"about us", icon: <InfoIcon/>},
        {path:'FAQ',text:"FAQ", icon: <QuestionIcon/>},
        {path:'/',text:"calendar", icon: <CalendarIcon/>},
        {path:'registro',text:"Registro Usuario", icon: <ChecklistIcon/>}
    ]

  return (
    <div>
      <nav className="bg-gray-800">
        <div className="hidden sm:ml-6 sm:block">
          <div className="flex space-x-4">
            <Link
              href="/"
              className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white no-underline"
              aria-current="page"
            >
              <HomeIcon className="mr-2 "></HomeIcon>
              home
            </Link>
            {
                navItem.map(navItem=>(
                    <ActiveLink key={navItem.path} {...navItem} ></ActiveLink>
                ))
            }
            
          </div>
        </div>
      </nav>
    </div>
  );
}
