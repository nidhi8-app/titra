
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Flame } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  ChartContainer,
} from "@/components/ui/chart";
import { Pie, PieChart } from "recharts"
import { startOfMonth, getDaysInMonth, getDay, format } from 'date-fns';

const chartData = [
  { name: "Progress", value: 75, fill: "hsl(var(--accent))" },
  { name: "Remaining", value: 25, fill: "hsl(var(--muted))" },
];

const chartConfig = {
  value: {
    label: "Value",
  },
};

const StreakTracker = () => {
  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const firstDayOfMonth = startOfMonth(currentDate);
  const daysInMonth = getDaysInMonth(currentDate);
  const startingDayOfWeek = getDay(firstDayOfMonth);

  const calendarDays = Array.from({ length: startingDayOfWeek + daysInMonth }, (_, i) => {
    if (i < startingDayOfWeek) {
      return { day: null, status: 'inactive' };
    }
    const day = i - startingDayOfWeek + 1;
    const today = new Date();
    const isToday = day === today.getDate() &&
                    currentDate.getMonth() === today.getMonth() &&
                    currentDate.getFullYear() === today.getFullYear();

    let status = 'inactive';
    if (isToday) {
      status = 'today';
    } else if (new Date(currentDate.getFullYear(), currentDate.getMonth(), day) < today) {
      // Dummy logic for past days, will be based on activity later
      status = 'active'; 
    }
    
    return { day, status };
  });

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">9 day streak!</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{format(currentDate, 'MMMM yyyy')}</h3>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center text-muted-foreground mb-4">
            {weekDays.map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center">
            {calendarDays.map(({ day, status }, index) => (
              <div
                key={index}
                className={cn('flex items-center justify-center w-10 h-10 rounded-full cursor-pointer transition-colors', {
                  'text-muted-foreground/50': status === 'inactive' || !day,
                  'bg-orange-100 text-orange-500': status === 'active',
                  'bg-primary text-primary-foreground': status === 'today',
                })}
              >
                {day && (
                   status === 'active' ? <Flame className="w-6 h-6" /> : day
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center space-y-4">
          <h3 className="text-4xl font-bold">18</h3>
          <p className="text-center text-muted-foreground">Questions to get your Emerald streak</p>
          <ChartContainer config={chartConfig} className="w-full h-48">
              <PieChart accessibilityLayer>
                  <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={80} startAngle={90} endAngle={450}>
                  </Pie>
              </PieChart>
          </ChartContainer>
        </div>
      </CardContent>
      <div className="p-6">
        <Button className="w-full font-bold text-lg" size="lg">
          <Sparkles className="mr-2" />
          Get Emerald streak
        </Button>
      </div>
    </Card>
  );
};

const Sparkles = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m12 3-1.9 4.8-4.8 1.9 4.8 1.9 1.9 4.8 1.9-4.8 4.8-1.9-4.8-1.9L12 3zM5 13l-1 2.5-2.5.5 2.5.5 1 2.5 1-2.5 2.5-.5-2.5-.5L5 13zM21 13l-1 2.5-2.5.5 2.5.5 1 2.5 1-2.5 2.5-.5-2.5-.5L21 13z"/></svg>
)


export default StreakTracker;
