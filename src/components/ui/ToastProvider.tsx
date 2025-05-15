'use client';

import { CircleAlertIcon, CircleCheckIcon, InfoIcon, TriangleAlertIcon } from 'lucide-react';
import { Toast as RadixToast } from 'radix-ui';
import { createContext, useCallback, useContext, useState } from 'react';

type ToastType = {
  title: string;
  description: React.ReactNode;
	type?: 'error' | 'success' | 'info' | 'warning';
	action?: React.ReactNode;
};

type ToastContextType = {
  toast: (toast: ToastType) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx.toast;
}

interface ToastProviderProps {
	children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
	const [open, setOpen] = useState(false);
  const [toastInfo, setToastInfo] = useState<ToastType | null>(null);

  const showToast = useCallback((toast: ToastType) => {
    setToastInfo(toast);
    setOpen(false);
    setTimeout(() => setOpen(true), 10);
  }, []);

	return (
		<ToastContext.Provider value={{ toast: showToast }}>
			<RadixToast.Provider swipeDirection="right" duration={3000000}>
				{children}
				<RadixToast.Root open={open} onOpenChange={setOpen} onClick={() => setOpen(false)}
				className={`bg-white rounded-sm shadow-xl/20 p-4 grid grid-rows-2 ${toastInfo?.type
					? 'grid-cols-[30px_max-content]'
					: 'grid-cols-[auto_max-content]'} gap-x-2 items-center
				data-[state=open]:animate-[slideIn_150ms_cubic-bezier(0.16,1,0.3,1)]
				data-[state=closed]:animate-[overlayHide_100ms_ease-in]
				data-[state=move]:transform-[translateX(300px)]
				data-[state=cancel]:transform-[translateX(0)] data-[state=cancel]:transition-[transform_200ms_ease-out]
				data-[state=end]:animate-[swipeOut_100ms_ease-out]`}>
					{toastInfo?.type &&
						<span className='col-start-1 row-start-1 row-span-2'>
							{toastInfo.type === 'error' ?
								<CircleAlertIcon className='text-red-400 size-7.5' /> :
								toastInfo.type === 'success' ?
									<CircleCheckIcon className='text-green-400 size-7.5' /> :
									toastInfo.type === 'info' ?
										<InfoIcon className='text-blue-400 size-7.5' /> :
										<TriangleAlertIcon className='text-yellow-400 size-7.5' />
							}
						</span>
					}

					<RadixToast.Title className={`${toastInfo?.type ? 'col-start-2 ml-2' : 'col-start-1'} row-start-1 font-semibold text-lg`}>{toastInfo?.title}</RadixToast.Title>

					<RadixToast.Description asChild className={`${toastInfo?.type ? 'col-start-2 ml-2' : 'col-start-1'} row-start-2 m-0 text-sm leading-1.5`}>
						{toastInfo?.description}
					</RadixToast.Description>

					{toastInfo?.action &&
						<RadixToast.Action
							asChild
							altText="Action"
							className={`${toastInfo?.type ? 'col-start-3' : 'col-start-2'} row-start-1 row-span-2`}
						>
							{toastInfo?.action}
						</RadixToast.Action>
					}
				</RadixToast.Root>
				<RadixToast.Viewport className='fixed bottom-0 right-0 flex flex-col p-4 m-0 gap-2 w-[390px] max-w-screen z-[2147483647] outline-none list-none'/>
			</RadixToast.Provider>
		</ToastContext.Provider>
	);
};