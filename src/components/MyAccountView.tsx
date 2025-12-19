
"use client";

import React, { useState, useEffect } from 'react';
import type { UserDetails } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Pencil } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { AvatarSelectionDialog } from './AvatarSelectionDialog';

type MyAccountViewProps = {
  userDetails: UserDetails | null;
  setUserDetails: (details: UserDetails | null) => void;
};

const DetailItem = ({ label, value }: { label: string, value: string | number | undefined }) => (
    <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-semibold">{value || 'N/A'}</p>
    </div>
);

const EditableDetailItem = ({ label, value, name, onChange, type = "text" }: { label: string, value: string | number, name: keyof UserDetails, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, type?: string }) => (
    <div>
        <Label htmlFor={name} className="text-sm text-muted-foreground">{label}</Label>
        <Input 
            id={name} 
            name={name}
            value={value}
            type={type}
            onChange={onChange}
            className="mt-1"
        />
    </div>
);

const MyAccountView = ({ userDetails, setUserDetails }: MyAccountViewProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState<UserDetails | null>(userDetails);
  const [avatarUrl, setAvatarUrl] = useState(userDetails?.avatarUrl || `https://api.dicebear.com/8.x/bottts/svg?seed=${userDetails?.name || 'default'}`);
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false);

  useEffect(() => {
    if (userDetails) {
      setEditedDetails(userDetails);
      setAvatarUrl(userDetails.avatarUrl || `https://api.dicebear.com/8.x/bottts/svg?seed=${userDetails.name || 'default'}`);
    }
  }, [userDetails]);

  if (!userDetails) {
    return (
      <div className="p-8 text-center">
        <p>No user details found. Please complete the onboarding process.</p>
      </div>
    );
  }

  const handleEditClick = () => {
    setEditedDetails(userDetails);
    setIsEditing(true);
  };
  
  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedDetails(userDetails);
    if (userDetails.avatarUrl) {
      setAvatarUrl(userDetails.avatarUrl);
    }
  }

  const handleSaveClick = () => {
    if (editedDetails) {
      const updatedDetails = { ...editedDetails, avatarUrl };
      setUserDetails(updatedDetails);
      localStorage.setItem('userDetails', JSON.stringify(updatedDetails));
      setIsEditing(false);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editedDetails) {
        setEditedDetails({
            ...editedDetails,
            [name]: name === 'age' ? Number(value) : value
        });
    }
  };

  const handleAvatarSelect = (newAvatarUrl: string) => {
    setAvatarUrl(newAvatarUrl);
    setIsAvatarDialogOpen(false);
    // Immediately update details if we are in editing mode.
    if(isEditing && editedDetails) {
        const updatedDetails = { ...editedDetails, avatarUrl: newAvatarUrl };
        setEditedDetails(updatedDetails);
        // We don't save to parent/localStorage until "Save" is clicked
    }
  }


  return (
    <div className="p-4 md:p-8">
        <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
                <div className="flex justify-center mb-4 relative w-fit mx-auto">
                    <Avatar className="w-32 h-32 border-4 border-primary">
                        <AvatarImage src={avatarUrl} alt={userDetails.name} />
                        <AvatarFallback>{userDetails.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                     <Button variant="ghost" size="icon" className="absolute -bottom-2 -right-2 bg-background rounded-full h-10 w-10" onClick={() => setIsAvatarDialogOpen(true)}>
                        <Pencil className="h-5 w-5"/>
                    </Button>
                </div>
                {isEditing ? (
                     <EditableDetailItem label="Name" name="name" value={editedDetails?.name || ''} onChange={handleChange} />
                ) : (
                    <>
                        <CardTitle className="text-3xl">{userDetails.name}</CardTitle>
                        <CardDescription>{userDetails.email}</CardDescription>
                    </>
                )}
            </CardHeader>
            <CardContent>
                 {isEditing && editedDetails ? (
                    <div className="space-y-4">
                        <EditableDetailItem label="Email" name="email" value={editedDetails.email} onChange={handleChange} />
                        <div className="grid grid-cols-2 gap-4">
                            <EditableDetailItem label="Age" name="age" value={editedDetails.age} onChange={handleChange} type="number" />
                            <EditableDetailItem label="Year Group" name="yearGroup" value={editedDetails.yearGroup} onChange={handleChange} />
                        </div>
                        <EditableDetailItem label="School" name="schoolName" value={editedDetails.schoolName} onChange={handleChange} />
                        <EditableDetailItem label="Curriculum" name="curriculum" value={editedDetails.curriculum} onChange={handleChange} />
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-x-8 gap-y-6 mt-6">
                        <DetailItem label="Learning Style" value={userDetails.learningStyle} />
                        <DetailItem label="Age" value={userDetails.age} />
                        <DetailItem label="Year Group" value={userDetails.yearGroup} />
                        <DetailItem label="School" value={userDetails.schoolName} />
                        <DetailItem label="Curriculum" value={userDetails.curriculum} />
                    </div>
                )}
                 <div className="mt-8 flex justify-end gap-2">
                    {isEditing ? (
                        <>
                            <Button variant="outline" onClick={handleCancelClick}>Cancel</Button>
                            <Button onClick={handleSaveClick}>Save</Button>
                        </>
                    ) : (
                        <Button variant="outline" onClick={handleEditClick}>Edit Profile</Button>
                    )}
                </div>
            </CardContent>
        </Card>
        {isAvatarDialogOpen && (
             <AvatarSelectionDialog 
                isOpen={isAvatarDialogOpen}
                onClose={() => setIsAvatarDialogOpen(false)}
                onAvatarSelect={handleAvatarSelect}
                currentAvatar={avatarUrl}
             />
        )}
    </div>
  );
};

export default MyAccountView;
