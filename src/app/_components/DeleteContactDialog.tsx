'use client';

import Button from '@/components/ui/Button';
import { TrashIcon } from '@heroicons/react/24/outline';
import { AlertDialog } from 'radix-ui';
import { deleteContactAction } from '../_actions/deleteContactAction';
import { useState } from 'react';
import { Loader2Icon } from 'lucide-react';
import { useToast } from '@/components/ui/ToastProvider';

interface DeleteContactDialogProps {
	contactId: string;
}

export function DeleteContactDialog({ contactId }: DeleteContactDialogProps) {
	const [isLoading, setIsLoading] = useState(false);
	const toast = useToast();

	async function handleDeleteContact() {
		setIsLoading(true);
		const response = await deleteContactAction(contactId);
		setIsLoading(false);

		if (response.status === 'error') {
			toast({
				title: 'Erro!',
				description: <p>{response.body.message}</p>,
				type: 'info',
			})
		}
	}

	return (
		<AlertDialog.Root>
			<AlertDialog.Trigger asChild>
				<Button className='border-0 rounded-lg w-10 h-10 p-2.5 bg-red-400 text-white
				transition duration-200 ease-in-out cursor-pointer hover:bg-red-600'
				disabled={isLoading}>
					{isLoading && <Loader2Icon className='animate-spin' />}
					{!isLoading && <TrashIcon/>}
				</Button>
			</AlertDialog.Trigger>

			<AlertDialog.Portal>
				<AlertDialog.Overlay className="fixed bg-black/60 inset-0 z-50 backdrop-blur-xs
				data-[state=open]:animate-[overlayShow_150ms_cubic-bezier(0.16,1,0.3,1)]
				data-[state=closed]:animate-[overlayHide_150ms_cubic-bezier(0.16,1,0.3,1)]" />

				<AlertDialog.Content className="bg-gray-50 shadow-lg w-full max-w-lg max-h-[85vh] rounded-lg px-5 py-6 fixed
				top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 focus:outline-none z-50
				data-[state=open]:animate-[contentShow_150ms_cubic-bezier(0.16,1,0.3,1)]
				data-[state=closed]:animate-[contentHide_150ms_cubic-bezier(0.16,1,0.3,1)]">
					<AlertDialog.Title className='m-0 text-gray-800 text-lg font-semibold'>
						Tem certeza?
					</AlertDialog.Title>

					<AlertDialog.Description className='leading-[1.5] text-gray-600 text-base'>
						O contato será deletado permanentemente e não poderá ser recuperado.
					</AlertDialog.Description>
					
					<div className="mt-6 flex justify-end gap-2">
						<AlertDialog.Cancel asChild>
							<Button className='bg-white text-gray-800 border-gray-300 px-4 hover:bg-gray-200 hover:border-gray-200 outline-none'>Cancelar</Button>
						</AlertDialog.Cancel>
						<AlertDialog.Action asChild>
							<Button className='bg-red-400 text-white border-red-400 px-4 hover:bg-red-700 hover:border-red-700 hover:text-white'
							onClick={handleDeleteContact}>Deletar</Button>
						</AlertDialog.Action>
					</div>
				</AlertDialog.Content>
			</AlertDialog.Portal>
		</AlertDialog.Root>
	)
}