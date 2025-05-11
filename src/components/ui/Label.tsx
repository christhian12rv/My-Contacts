'use client'

import { LabelHTMLAttributes } from 'react'

export default function Label(props: LabelHTMLAttributes<HTMLLabelElement>) {
	return (
		<label className='font-bold' {...props}></label>
	)
}