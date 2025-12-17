"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LearningStyle = () => {
  const learnerType = "Visual Learner"; // This can be made dynamic later

  return (
    <div className="p-8">
      <Tabs defaultValue="style">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="style">Learning Style</TabsTrigger>
          <TabsTrigger value="diagrams">Diagrams of Chemistry</TabsTrigger>
        </TabsList>
        <TabsContent value="style">
          <div className="flex items-center justify-center pt-8">
            <Card className="max-w-md w-full">
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
                <Button className="mt-6">
                  Press here to re-take learning style quiz
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="diagrams">
          <Card>
            <CardHeader>
              <CardTitle>Chemistry Diagrams</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Diagrams will be shown here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LearningStyle;
