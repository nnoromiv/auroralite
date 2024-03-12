'use client'
import React, { useState } from 'react'
import { HoveredLink, Menu, MenuItem } from './ui/Menu'
import { cn } from '../utils/cn'
import { NavBarProps } from '../types'
import { NAV } from '../constants'
import MobileNavBar from './MobileNavBar'

const NavBar: React.FC<NavBarProps> = ({ className }) => {
    const [active, setActive] = useState<string | null>(null)
    return (
        <div className={cn("fixed top-5 inset-x-0 max-w-full mx-auto px-3 z-50", className)}>
            <div className='max-pn:hidden'>
            <Menu setActive={setActive} >
                <h1 className='font-bold'>Aurora Lite</h1>
                <MenuItem setActive={setActive} active={active} item="Buy">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="">Pancake Swap</HoveredLink>
                        <HoveredLink href="">Dex</HoveredLink>
                        <HoveredLink href="/branding">Binance</HoveredLink>
                    </div>
                </MenuItem>
                {
                    NAV.map((item: any, index:number) => (
                        <HoveredLink key={index} href={item.link}>{item.name}</HoveredLink>
                    ))
                }
            </Menu>
            </div>
            <div className='pn:hidden z-40'>
                <MobileNavBar />
            </div>
        </div>
    )
}

export default NavBar