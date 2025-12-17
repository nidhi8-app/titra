"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Flame, Layers, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

type ProgressTrackerProps = {
  mainView?: boolean;
};

const ProgressTracker = ({ mainView = false }: ProgressTrackerProps) => {
    const stats = [
        { icon: Flame, value: '12 days', label: 'Current Streak', color: 'text-orange-500' },
        { icon: Layers, value: '5', label: 'Decks Completed', color: 'text-blue-500' },
        { icon: Target, value: '23', label: 'Topics Mastered', color: 'text-green-500' },
    ];

    if (mainView) {
      return (
         <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-background/50">
           <Card className="w-full max-w-sm border-2 border-primary/20 bg-primary/5 shadow-lg">
             <CardHeader>
               <CardTitle className="text-2xl font-bold text-primary">
                 Your Progress
               </CardTitle>
             </CardHeader>
             <CardContent>
               <div className="space-y-4">
                 {stats.map((stat, index) => (
                   <div key={index} className="flex items-center gap-3">
                     <stat.icon className={cn("w-7 h-7", stat.color)} />
                     <div className="text-left">
                       <p className="font-bold text-xl text-primary">{stat.value}</p>
                       <p className="text-sm text-primary/70">{stat.label}</p>
                     </div>
                   </div>
                 ))}
               </div>
             </CardContent>
           </Card>
           <p className="mt-6 text-muted-foreground">
             Create a new deck or select an existing one to get started.
           </p>
         </div>
       );
    }

    return (
        <Card className="m-2 border-2 border-primary/20 bg-primary/5 shadow-none">
            <CardHeader className="items-center">
                <CardTitle className="font-sidebar text-2xl font-bold text-primary/80">
                    Your Progress
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex items-center gap-4">
                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            <div>
                                <p className="font-bold text-lg text-primary">{stat.value}</p>
                                <p className="text-sm text-primary/70">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default ProgressTracker;
