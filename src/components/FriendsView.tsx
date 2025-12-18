"use client";

import React from 'react';
import { initialFriends } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from './ui/button';
import { UserPlus } from 'lucide-react';

const FriendsView = () => {
  const friends = initialFriends;

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Friends</h2>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Friend
        </Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {friends.map((friend) => (
          <Card key={friend.id} className="text-center">
            <CardContent className="p-6 flex flex-col items-center gap-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={friend.avatarUrl} alt={friend.name} data-ai-hint="person face" />
                <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h3 className="font-bold truncate text-lg">{friend.name}</h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FriendsView;
