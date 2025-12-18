"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Folder } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

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
  const learnerType = "Visual Learner"; // This can be made dynamic later

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
            You are a: <span className="font-bold text-primary">{learnerType}</span>
          </p>
          <p className="text-muted-foreground mt-4">
            Visual learners best absorb information through charts, graphs, and seeing information in a spatial layout.
          </p>
          <Button className="mt-6" asChild>
            <a href="https://www.educationplanner.org/students/self-assessments/learning-styles" target="_blank" rel="noopener noreferrer">
              Press here to re-take learning style quiz
            </a>
          </Button>
        </CardContent>
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
