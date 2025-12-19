
"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Camera, Upload } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

const avatarStyles = [
  'adventurer', 'avataaars', 'big-ears', 'big-smile', 'bottts', 'croodles',
  'fun-emoji', 'icons', 'identicon', 'initials', 'micah', 'miniavs',
  'open-peeps', 'personas', 'pixel-art', 'shapes'
];

const avatarSeeds = ['Felix', 'Milo', 'Luna', 'Oliver', 'Zoe', 'Leo', 'Cleo', 'Max', 'Ruby', 'Oscar', 'Chloe', 'Toby'];

type AvatarSelectionDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onAvatarSelect: (url: string) => void;
  currentAvatar: string;
};

export const AvatarSelectionDialog = ({ isOpen, onClose, onAvatarSelect, currentAvatar }: AvatarSelectionDialogProps) => {

  const handleUploadClick = () => {
    // This will trigger the hidden file input
    document.getElementById('avatar-upload')?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onAvatarSelect(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Choose Your Avatar</DialogTitle>
          <DialogDescription>
            Select a pre-made avatar, or upload your own image.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 my-4">
            <Button variant="outline" size="lg" onClick={handleUploadClick}>
                <Upload className="mr-2 h-5 w-5" />
                Upload Image
            </Button>
            <input type="file" id="avatar-upload" accept="image/*" className="hidden" onChange={handleFileChange} />

            <Button variant="outline" size="lg">
                <Camera className="mr-2 h-5 w-5" />
                Use Camera
            </Button>
        </div>
        <p className="text-sm text-muted-foreground mb-2">Or select one from the gallery:</p>
        <ScrollArea className="h-64 border rounded-md">
            <div className="p-4 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
                {avatarStyles.flatMap(style => 
                    avatarSeeds.slice(0, 2).map(seed => {
                        const url = `https://api.dicebear.com/8.x/${style}/svg?seed=${seed}`;
                        return (
                            <button key={`${style}-${seed}`} onClick={() => onAvatarSelect(url)} className="p-1 border-2 border-transparent rounded-full hover:border-primary data-[current=true]:border-primary" data-current={url === currentAvatar}>
                                <Avatar className="w-16 h-16">
                                    <AvatarImage src={url} alt={`${style} avatar with seed ${seed}`} />
                                    <AvatarFallback>{seed.charAt(0)}</AvatarFallback>
                                </Avatar>
                            </button>
                        )
                    })
                )}
            </div>
        </ScrollArea>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
