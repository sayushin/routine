'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'

const items = [
    {href: '/', label:'Goal'},
    {href: '/input', label:'Input'},
    {href: '/result', label:'Result'},
]

const BottomNav = () =>  {
    const pathname = usePathname()

    return(
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white md:hidden">
    <div className="mx-auto grid max-w-md grid-cols-3">
        {items.map((item) => {
            const isActive = pathname === item.href
            console.log('isActive:',isActive)
            return(
                <Link
                key={item.href}
                href={item.href}
                className = {`flex flex-col items-center justify-center py-3  text-sm font-medium 
                    ${isActive ? 'text-slate-900' : 'text-slate-400'

                    }`}
                 >
                    {item.label}

                    </Link>
            )
        })}
    </div>
    </nav>


    )

}

export default BottomNav