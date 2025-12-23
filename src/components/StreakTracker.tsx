
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Flame, Beaker, FlaskConical, Atom, ChevronDown, Sparkles as SparklesIcon, Medal, BookOpen, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  ChartContainer,
} from "@/components/ui/chart";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Pie, PieChart } from "recharts"
import { startOfMonth, getDaysInMonth, getDay, format, isToday, parseISO, isSameDay, subDays, differenceInCalendarDays } from 'date-fns';
import { useUser } from '@/firebase';
import { initialQuizTopics } from '@/lib/data';
import type { DailyActivity } from '@/lib/types';

const streakRewards = [
    { id: 'taskDone', icon: CheckCircle2, label: "Task Complete", description: "Complete any daily task.", color: "text-green-500" },
    { id: 'aceQuiz', icon: Medal, label: "Quiz Ace", description: "Score 80%+ on a quiz.", color: "text-yellow-500" },
    { id: 'halfHour', icon: Beaker, label: "Half Hour", description: "30+ minutes of revision.", color: "text-sky-500" },
    { id: 'deep', icon: FlaskConical, label: "Deep Dive", description: "60+ minutes of revision.", color: "text-purple-500" },
    { id: 'startQuiz', icon: Flame, label: "Quiz Starter", description: "Start any quiz.", color: "text-orange-500" },
    { id: 'weekly', icon: SparklesIcon, label: "Weekly Warrior", description: "Maintain a 7-day streak.", color: "text-green-500" },
]

const chartConfig = {
  value: {
    label: "Value",
  },
};

type StreakTrackerProps = {
    onStartQuizzing: (topic?: any) => void;
    dailyActivity: Record<string, DailyActivity>;
    streak: number;
};

const ContinueLearning = ({ onStartQuizzing }: { onStartQuizzing: (topic: any) => void; }) => {
    const { user } = useUser();
    const [lowestScoreTopic, setLowestScoreTopic] = React.useState<{id: string; title: string} | null>(null);

    React.useEffect(() => {
        if (user) {
            const scoresKey = `quizScores-${user.uid}`;
            const scores = JSON.parse(localStorage.getItem(scoresKey) || '{}');
            const topicIds = Object.keys(scores);

            if (topicIds.length > 0) {
                let lowestTopicId = topicIds[0];
                let lowestScore = scores[lowestTopicId];

                for (let i = 1; i < topicIds.length; i++) {
                    const topicId = topicIds[i];
                    if (scores[topicId] < lowestScore) {
                        lowestScore = scores[topicId];
                        lowestTopicId = topicId;
                    }
                }

                const topicDetails = initialQuizTopics.find(t => t.id === lowestTopicId);
                if (topicDetails) {
                    setLowestScoreTopic({ id: topicDetails.id, title: topicDetails.title });
                }
            }
        }
    }, [user]);

    if (!lowestScoreTopic) {
        return null;
    }

    const handleContinue = () => {
        const topic = initialQuizTopics.find(t => t.id === lowestScoreTopic.id);
        if (topic) {
            onStartQuizzing(topic);
        }
    }

    return (
        <div className="mt-6">
             <h4 className="font-semibold text-lg mb-2">Recommended for you</h4>
             <Button variant="outline" className="w-full justify-start h-auto" onClick={() => handleContinue()}>
                <BookOpen className="mr-4 text-primary" />
                <div className="text-left">
                    <p className="font-bold">Continue learning about</p>
                    <p className="text-primary">{lowestScoreTopic.title}</p>
                </div>
             </Button>
        </div>
    );
};


const StreakTracker = ({ onStartQuizzing, dailyActivity, streak }: StreakTrackerProps) => {
  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const firstDayOfMonth = startOfMonth(currentDate);
  const daysInMonth = getDaysInMonth(currentDate);
  const startingDayOfWeek = getDay(firstDayOfMonth);

  const getEmojiForDay = (dayDate: Date) => {
    const dateString = format(dayDate, 'yyyy-MM-dd');
    const activity = dailyActivity[dateString];

    if (!activity || (activity.duration === 0 && Object.keys(activity.tasks).length === 0)) return null;
    
    if (activity.duration >= 60) return <FlaskConical className="w-8 h-8 text-purple-400" />;
    if (activity.duration >= 30) return <Beaker className="w-8 h-8 text-sky-400" />;
    
    return <CheckCircle2 className="w-8 h-8 text-green-400" />;
  };

  const calendarDays = Array.from({ length: startingDayOfWeek + daysInMonth }, (_, i) => {
    if (i < startingDayOfWeek) {
      return { day: null, status: 'inactive', icon: null };
    }
    const day = i - startingDayOfWeek + 1;
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const today = new Date();
    
    let status = 'inactive';
    if (isToday(date)) {
      status = 'today';
    } else if (date < today) {
      status = 'past';
    }

    const icon = getEmojiForDay(date);

    return { day, status, icon };
  });

   const today = format(new Date(), 'yyyy-MM-dd');
   const todayTasksCompleted = Object.keys(dailyActivity[today]?.tasks || {}).length;
   const totalTasks = streakRewards.length;
   const progress = totalTasks > 0 ? (todayTasksCompleted / totalTasks) * 100 : 0;
   
    const chartData = [
      { name: "Progress", value: progress, fill: "hsl(var(--progress-ring))" },
      { name: "Remaining", value: 100 - progress, fill: "hsl(var(--secondary))" },
    ];


  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        {streak > 0 ? (
          <CardTitle className="text-3xl font-bold">{streak} day streak!</CardTitle>
        ) : (
           <CardTitle className="text-3xl font-bold">Start quizzing to start a streak!</CardTitle>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-3">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold">{format(currentDate, 'MMMM yyyy')}</h3>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-muted-foreground text-sm mb-2 font-bold">
                    {weekDays.map((day) => (
                    <div key={day}>{day}</div>
                    ))}
                </div>
                <div className="grid grid-cols-7 text-center">
                    {calendarDays.map(({ day, status, icon }, index) => (
                    <div
                        key={index}
                        className={cn('relative flex items-center justify-center w-10 h-10 rounded-full transition-colors font-bold', {
                        'text-muted-foreground/50': !day,
                        'cursor-pointer': !!day,
                        })}
                    >
                        {day && (
                        <>
                            {icon && (
                            <div className="absolute inset-0 flex items-center justify-center">{icon}</div>
                            )}
                            <span className={cn('z-10 flex items-center justify-center w-10 h-10 rounded-full text-foreground', {
                                'bg-primary text-primary-foreground': status === 'today' && !icon,
                                'text-foreground': icon
                            })}>
                            {day}
                            </span>
                        </>
                        )}
                    </div>
                    ))}
                </div>
                <div className="w-full pt-4">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1" className="border-b-0">
                            <AccordionTrigger className="font-semibold text-lg">Streak rewards</AccordionTrigger>
                            <AccordionContent>
                                <div className="grid grid-cols-2 gap-2">
                                    {streakRewards.map((reward) => {
                                        const isCompleted = dailyActivity[today]?.tasks[reward.id] || (reward.id === 'deep' && dailyActivity[today]?.duration >= 60) || (reward.id === 'halfHour' && dailyActivity[today]?.duration >= 30) || (reward.id === 'taskDone' && Object.keys(dailyActivity[today]?.tasks || {}).length > 0);
                                        return (
                                            <div key={reward.label} className={cn("flex items-center gap-3 p-2 rounded-md", isCompleted ? "bg-green-500/10 opacity-100" : "opacity-60")}>
                                                <div className={cn("p-1 rounded-full", isCompleted ? "bg-green-500/20" : "bg-muted")}>
                                                    <reward.icon className={cn("w-6 h-6 flex-shrink-0", reward.color, isCompleted && "text-green-500")} />
                                                </div>
                                                <div>
                                                    <p className="font-semibold">{reward.label}</p>
                                                    <p className="text-xs text-muted-foreground">{reward.description}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <ContinueLearning onStartQuizzing={onStartQuizzing} />
                </div>
            </div>

            <div className="md:col-span-2 flex flex-col items-center justify-start space-y-4">
                <div className='relative flex flex-col items-center justify-center'>
                    <h3 className="text-4xl font-bold">Goal</h3>
                    <p className="text-center text-muted-foreground px-4">Complete tasks to fill the circle</p>
                    <ChartContainer config={chartConfig} className="w-full h-48">
                        <PieChart accessibilityLayer>
                            <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={80} startAngle={90} endAngle={450}>
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                </div>
            </div>
        </div>
      </CardContent>
      <CardFooter className="p-6">
        <Button className="w-full font-bold text-lg" size="lg" onClick={() => onStartQuizzing()}>
          <SparklesIcon className="mr-2" />
          Start Quizzing
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StreakTracker;
