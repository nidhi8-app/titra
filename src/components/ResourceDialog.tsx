
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from './ui/button';

export type Resource = {
  id: string;
  title: string;
  description: string;
  icon?: React.ElementType;
};

type ResourceDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  resource: Resource | null;
};

export const ResourceDialog = ({ isOpen, onClose, resource }: ResourceDialogProps) => {
  if (!resource) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{resource.title}</DialogTitle>
          <DialogDescription>
            {resource.description}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 text-center">
            <p className="text-muted-foreground">
                This is a placeholder for the interactive resource. In a full application, you would find a game, simulation, or audio player here.
            </p>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
