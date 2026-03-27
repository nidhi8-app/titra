
"use client";

import React, { useState, useRef, useEffect } from 'react';
import type { Friend, Message } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from './ui/button';
import { UserPlus, MessageSquare, ArrowLeft, Flame, Layers, Search, UserSearch, Send } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { useUser } from '@/firebase';
import { cn } from '@/lib/utils';

const ChatBox = ({ friend }: { friend: Friend }) => {
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Initial welcome message from friend
  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        senderId: friend.id,
        text: `Hey! Ready to study some Chemistry today?`,
        timestamp: new Date(),
      }
    ]);
  }, [friend]);

  const handleSendMessage = () => {
    if (!inputValue.trim() || !user) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: user.uid,
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');

    // Simulated reply after 1 second
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        senderId: friend.id,
        text: "That sounds like a great plan! Let's hit the quizzes.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, reply]);
    }, 1000);
  };

  return (
    <Card className="flex flex-col h-[500px]">
      <CardHeader className="border-b p-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={friend.avatarUrl} />
            <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-lg">Chat with {friend.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0 flex flex-col">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((msg) => {
              const isMe = msg.senderId === user?.uid;
              return (
                <div
                  key={msg.id}
                  className={cn(
                    "flex flex-col max-w-[80%]",
                    isMe ? "ml-auto items-end" : "mr-auto items-start"
                  )}
                >
                  <div
                    className={cn(
                      "p-3 rounded-2xl text-sm",
                      isMe
                        ? "bg-primary text-primary-foreground rounded-tr-none"
                        : "bg-muted text-foreground rounded-tl-none"
                    )}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-muted-foreground mt-1 px-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              );
            })}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>
        <div className="p-4 border-t flex gap-2">
          <Input
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button size="icon" onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const FriendProfile = ({ friend, onBack }: { friend: Friend, onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState('feed');

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
              <Button size="lg" onClick={() => setActiveTab('chat')}>
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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="feed">Feed</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
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
          <TabsContent value="chat">
            <ChatBox friend={friend} />
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
  // Default sample friend for testing
  const [friends] = useState<Friend[]>([
    {
      id: 'f1',
      name: 'Sarah Chemist',
      avatarUrl: 'https://api.dicebear.com/8.x/miniavs/svg?seed=Sarah'
    },
    {
      id: 'f2',
      name: 'James Proton',
      avatarUrl: 'https://api.dicebear.com/8.x/miniavs/svg?seed=James'
    }
  ]);

  if (selectedFriend) {
    return <FriendProfile friend={selectedFriend} onBack={() => setSelectedFriend(null)} />;
  }
  
  const renderFriendsGrid = () => {
     if (friends.length === 0) {
        return (
            <div className="text-center col-span-full py-16">
                <UserSearch className="mx-auto h-16 w-16 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">Find your friends</h3>
                <p className="mt-1 text-sm text-muted-foreground">Search for friends by name or email to connect.</p>
            </div>
        )
     }
     
     return friends.map((friend) => (
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
        ));
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Friends</h2>
        <div className="relative w-full max-w-xs">
          <Input 
            placeholder="Search for friends..."
            className="pr-10"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {renderFriendsGrid()}
      </div>
    </div>
  );
};

export default FriendsView;
