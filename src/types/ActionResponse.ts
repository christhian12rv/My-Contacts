export type ActionResponse = | {
	status: 'success',
	body: Record<string, any>
} | {
	status: 'error',
	body: {
		message: string | string[]
	} & Record<string, any>
}