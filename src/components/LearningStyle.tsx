"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Folder } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";


const diagramFolders = [
  { id: '1', title: 'Atomic Structure' },
  { id: '2', title: 'Bonding & Structures' },
  { id: '3', title: 'Organic Molecules' },
  { id: '4', title: 'Reaction Mechanisms' },
];

const mindmapFolders = [
  { id: '1', title: 'Periodic Table Trends' },
  { id: '2', title: 'Types of Chemical Reactions' },
  { id: '3', title: 'Solution Chemistry' },
  { id: '4', title: 'Gas Laws' },
];

const LearningStyle = () => {
  const [learnerType, setLearnerType] = useState("Visual");
  const [inputValue, setInputValue] = useState(learnerType);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSave = () => {
    setLearnerType(inputValue);
    setIsDialogOpen(false);
  };

  return (
    <div className="p-8 h-full flex flex-col">
      <Card className="max-w-md w-full mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Your Learning Style
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-lg">
            You are a: <span className="font-bold text-primary">{learnerType} Learner</span>
          </p>
          <p className="text-muted-foreground mt-4">
            {learnerType === "Visual" && "Visual learners best absorb information through charts, graphs, and seeing information in a spatial layout."}
            {learnerType === "Auditory" && "Auditory learners best absorb information through listening, speaking, and music."}
            {learnerType === "Kinesthetic" && "Kinesthetic learners best absorb information by doing, moving, and interacting with their environment."}
            {learnerType === "Reading/Writing" && "Reading/Writing learners best absorb information through reading and writing."}
          </p>
          <Button className="mt-6" asChild>
            <a href="https://www.educationplanner.org/students/self-assessments/learning-styles" target="_blank" rel="noopener noreferrer">
              Press here to re-take learning style quiz
            </a>
          </Button>
        </CardContent>
        <CardFooter className="flex-col gap-4">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Enter your learning style</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Your Learning Style</DialogTitle>
                <DialogDescription>
                  Enter the learning style you identified with from the quiz.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="learning-style-input" className="text-right">
                    Style
                  </Label>
                  <Input
                    id="learning-style-input"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                   <Button type="button" variant="secondary">Cancel</Button>
                </DialogClose>
                <Button onClick={handleSave}>Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
      
      <Tabs defaultValue="diagrams" className="flex-1 flex flex-col mt-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="diagrams">Diagrams of Chemistry</TabsTrigger>
          <TabsTrigger value="mindmaps">Mindmaps</TabsTrigger>
        </TabsList>
        <TabsContent value="diagrams" className="flex-1 flex flex-col pt-4">
          <Card className="flex-1 flex flex-col">
            <CardHeader>
              <CardTitle>Diagram Folders</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <ScrollArea className="h-full">
                <div className="space-y-2 pr-4">
                  {diagramFolders.map((folder) => (
                     <button
                        key={folder.id}
                        className="w-full p-3 text-left rounded-2xl transition-colors duration-200 font-sidebar text-lg flex items-center gap-3 hover:bg-accent/50"
                      >
                        <Folder className="w-6 h-6 flex-shrink-0" />
                        <h3 className="font-bold truncate flex-1">{folder.title}</h3>
                      </button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="mindmaps" className="flex-1 flex flex-col pt-4">
          <Card className="flex-1 flex flex-col">
            <CardHeader>
              <CardTitle>Mindmap Folders</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <ScrollArea className="h-full">
                <div className="space-y-2 pr-4">
                  {mindmapFolders.map((folder) => (
                     <button
                        key={folder.id}
                        className="w-full p-3 text-left rounded-2xl transition-colors duration-200 font-sidebar text-lg flex items-center gap-3 hover:bg-accent/50"
                      >
                        <Folder className="w-6 h-6 flex-shrink-0" />
                        <h3 className="font-bold truncate flex-1">{folder.title}</h3>
                      </button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LearningStyle;
