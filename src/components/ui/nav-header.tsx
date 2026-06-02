"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";

type Position = { left: number; width: number; opacity: number };

interface NavItem {
  label: string;
  to: string;
}

interface NavHeaderProps {
  items?: NavItem[];
}

const defaultItems: NavItem[] = [
  { label: "Agents", to: "/agents" },
  { label: "Services", to: "/services" },
  { label: "About", to: "/about" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

function NavHeader({ items = defaultItems }: NavHeaderProps) {
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      className="relative mx-auto flex w-fit rounded-full border border-border bg-background p-1"
      onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
    >
      {items.map((item) => (
        <Tab key={item.to} setPosition={setPosition} to={item.to}>
          {item.label}
        </Tab>
      ))}
      <Cursor position={position} />
    </ul>
  );
}

const Tab = ({
  children,
  setPosition,
  to,
}: {
  children: React.ReactNode;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
  to: string;
}) => {
  const ref = useRef<HTMLLIElement>(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft,
        });
      }}
      className="relative z-10 block cursor-pointer text-xs uppercase text-foreground mix-blend-difference"
    >
      <Link
        to={to}
        className="block px-3 py-1.5 md:px-5 md:py-3 md:text-base"
      >
        {children}
      </Link>
    </li>
  );
};

const Cursor = ({ position }: { position: Position }) => {
  return (
    <motion.li
      animate={position}
      className="absolute z-0 h-7 rounded-full bg-foreground md:h-12"
    />
  );
};

export default NavHeader;
