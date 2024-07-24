import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { File } from '@/app/(main)/(routes)/clusters/[id]/graph/_components/file';
import { Badge } from './ui/badge';

export function FileDialog({
	children,
	isOpen,
	setIsOpen,
	file,
}: {
	children?: React.ReactNode;
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	file?: any;
}) {
	return (
	<Dialog open={isOpen} onOpenChange={setIsOpen}>
		<DialogContent className="max-w-7xl">
		<DialogHeader className="border-b pb-3 items-center">
			{file && 
			<DialogTitle>{file.f.filepath}</DialogTitle>
			}
			{file &&
			<DialogDescription>
				<div className='flex gap-2 mt-1'>
					<Badge variant='secondary'>
						{file.f.repository.name}
					</Badge>
					<Badge variant='secondary'>
						{file.f.repository.owner}
					</Badge>
					<Badge variant='secondary'>
						{file.f.type}
					</Badge>
				</div>
			</DialogDescription>
			}
		</DialogHeader>

		{file &&
			<div className="h-[30rem] flex flex-col dark:bg-[#1F1F1F] rounded-md">
			{ file.elements && <File data={file.elements} clusterId={file.clusterId}/> }
			</div>
		}
		
		</DialogContent>
	</Dialog>
	);
}