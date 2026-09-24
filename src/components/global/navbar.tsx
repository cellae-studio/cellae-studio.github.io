"use client";
import {
  Navbar,
  NavBody,
  NavbarLogo,
} from "@/components/ui/resizable-navbar";

export function NavbarDemo() {
  return (
    <Navbar>
      <NavBody>
        <NavbarLogo />
      </NavBody>
    </Navbar>
  );
}