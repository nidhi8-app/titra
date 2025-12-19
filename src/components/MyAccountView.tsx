
"use client";

import React from 'react';
import type { UserDetails } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Pencil } from 'lucide-react';

type MyAccountViewProps = {
  userDetails: UserDetails | null;
};

const DetailItem = ({ label, value }: { label: string, value: string | number | undefined }) => (
    <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-semibold">{value || 'N/A'}</p>
    </div>
);

const MyAccountView = ({ userDetails }: MyAccountViewProps) => {
  if (!userDetails) {
    return (
      <div className="p-8 text-center">
        <p>No user details found. Please complete the onboarding process.</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
        <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
                <div className="flex justify-center mb-4 relative w-fit mx-auto">
                    <Avatar className="w-32 h-32 border-4 border-primary">
                        <AvatarImage src={`https://api.dicebear.com/8.x/bottts/svg?seed=${userDetails.name}`} alt={userDetails.name} />
                        <AvatarFallback>{userDetails.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Button variant="ghost" size="icon" className="absolute -bottom-2 -right-2 bg-background rounded-full h-10 w-10">
                        <Pencil className="h-5 w-5"/>
                    </Button>
                </div>
                <CardTitle className="text-3xl">{userDetails.name}</CardTitle>
                <CardDescription>{userDetails.emailOrPhone}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-x-8 gap-y-6 mt-6">
                    <DetailItem label="Age" value={userDetails.age} />
                    <DetailItem label="Year Group" value={userDetails.yearGroup} />
                    <DetailItem label="School" value={userDetails.schoolName} />
                    <DetailItem label="Curriculum" value={userDetails.curriculum} />
                </div>
                 <div className="mt-8 flex justify-end">
                    <Button variant="outline">Edit Profile</Button>
                </div>
            </CardContent>
        </Card>
    </div>
  );
};

export default MyAccountView;
