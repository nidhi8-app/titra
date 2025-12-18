"use client";

import React, { useState } from 'react';
import type { Friend } from '@/lib/types';
import { initialFriends } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from './ui/button';
import { UserPlus, MessageSquare, ArrowLeft, Flame, Layers } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FriendProfile = ({ friend, onBack }: { friend: Friend, onBack: () => void }) => {
  return (
    <div className="p-4 md:p-6">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Friends
      </Button>
      <div className="max-w-xl mx-auto">
        <Card className="mb-6">
          <CardContent className="p-6 flex flex-col items-center gap-4">
            <Avatar className="w-32 h-32">
              <AvatarImage src={friend.avatarUrl} alt={friend.name} data-ai-hint="person face" />
              <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h2 className="text-3xl font-bold">{friend.name}</h2>
            </div>
            <div className="flex gap-4 pt-4">
              <Button size="lg">
                <MessageSquare className="mr-2 h-5 w-5" />
                Chat
              </Button>
              <Button size="lg" variant="outline">
                <UserPlus className="mr-2 h-5 w-5" />
                Add Friend
              </Button>
            </div>
          </CardContent>
        </Card>
        <Tabs defaultValue="feed" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="feed">Feed</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
            <TabsTrigger value="decks">Decks</TabsTrigger>
            <TabsTrigger value="school">School</TabsTrigger>
          </TabsList>
          <TabsContent value="feed">
            <Card>
              <CardContent className="p-6">
                <p>Friend's activity feed will show up here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="stats">
            <Card>
              <CardContent className="p-6">
                 <div className="flex gap-8 justify-center">
                  <div className="text-center">
                    <p className="text-2xl font-bold flex items-center gap-2"><Flame className="text-orange-500" /> 15</p>
                    <p className="text-muted-foreground">Streak</p>
                  </div>
                   <div className="text-center">
                    <p className="text-2xl font-bold flex items-center gap-2"><Layers className="text-blue-500" /> 8</p>
                    <p className="text-muted-foreground">Decks</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="decks">
            <Card>
              <CardContent className="p-6">
                <p>Friend's decks will show up here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="school">
            <Card>
              <CardContent className="p-6">
                <p>Friend's school information will show up here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};


const FriendsView = () => {
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const friends = initialFriends;

  if (selectedFriend) {
    return <FriendProfile friend={selectedFriend} onBack={() => setSelectedFriend(null)} />;
  }

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
          <Card 
            key={friend.id} 
            className="text-center cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedFriend(friend)}
          >
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
