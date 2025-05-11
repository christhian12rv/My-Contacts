'use client'

import { InputHTMLAttributes } from 'react'

export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
	return (
		<input {...props} className='border border-black rounded-md p-2' />
	)
}