'use client'

import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes } from 'react'

export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button {...props} className={cn(`flex items-center justify-center gap-2 bg-black text-white px-3 py-2 rounded-lg font-bold border border-black
		transition duration-200 ease-in-out
		cursor-pointer hover:bg-white hover:text-black disabled:bg-gray-300 disabled:border-gray-300 disabled:cursor-default`, props.className)}></button>
	)
}