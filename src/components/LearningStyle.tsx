
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Folder, Music, Mic, Beaker, Atom, Puzzle, Swords, FileText, BotMessageSquare, GraduationCap } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import LearningStyleQuiz from './LearningStyleQuiz';
import { ResourceDialog, Resource } from './ResourceDialog';
import type { UserDetails } from '@/lib/types';
import FormulasView from './FormulasView';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import { DiagramsDialog } from './DiagramsDialog';


const diagramFolders: Resource[] = [
  { id: 'd1', title: 'Atomic structure and the periodic table', description: 'Visual breakdowns of atomic models, electron shells, and periodic trends.', imageIds: ['c4', 'c5', 'c6', 'c7'] },
  { id: 'd2', title: 'Bonding, structure, and the properties of matter', description: '3D models of ionic lattices, covalent molecules, and metallic structures.', imageIds: ['c8', 'c9', 'c10', 'c11', 'c12'] },
  { id: 'd3', title: 'Quantitative chemistry', description: 'Diagrams explaining mole calculations, stoichiometry, and reacting masses.', imageIds: ['c1', 'c2', 'c13', 'c16'] },
  { id: 'd4', title: 'Chemical changes', description: 'Visuals of reactivity series, electrolysis, and acid-base reactions.', imageIds: ['c3', 'c6', 'c7', 'c18', 'c20'] },
  { id: 'd5', title: 'Energy changes', description: 'Flowcharts explaining enthalpy changes, Hess\'s Law, and reaction profiles.', imageIds: ['c13', 'c14', 'c15'] },
  { id: 'd6', title: 'The rate and extent of chemical change', description: 'Graphs and models for reaction rates and chemical equilibrium.', imageIds: ['c7', 'c14', 'c16', 'c23'] },
  { id: 'd7', title: 'Organic chemistry', description: 'Structures of hydrocarbons, functional groups, and polymerization.', imageIds: ['c9', 'c10', 'c11'] },
  { id: 'd8', title: 'Chemical analysis', description: 'Diagrams for chromatography, spectroscopy, and ion tests.', imageIds: ['c3', 'c18', 'c19', 'c20'] },
  { id: 'd9', title: 'Chemistry of the atmosphere', description: 'Visuals explaining atmospheric composition, greenhouse effect, and pollution.', imageIds: ['c22'] },
];

const mindmapFolders: Resource[] = [
  { id: 'm1', title: 'Atomic structure and the periodic table', description: 'A mindmap connecting moles, mass, and volume calculations.', imageIds: ['c4', 'c6', 'c7'] },
  { id: 'm2', title: 'Bonding, structure, and the properties of matter', description: 'Hierarchical maps for filling electron orbitals (Aufbau, Hund, Pauli).', imageIds: ['c8', 'c9', 'c12'] },
  { id: 'm3', title: 'Quantitative chemistry', description: 'A map linking electronegativity, ionization energy, and atomic radius.', imageIds: ['c1', 'c2'] },
  { id: 'm4', title: 'Chemical changes', description: 'Visual connections between London dispersion, dipole-dipole, and hydrogen bonds.', imageIds: ['c3', 'c18', 'c20'] },
  { id: 'm5', title: 'Energy changes', description: 'A map exploring the concepts of thermochemistry and spontaneity.', imageIds: ['c14', 'c15'] },
  { id: 'm6', title: 'The rate and extent of chemical change', description: 'A mindmap covering temperature, concentration, surface area, and catalysts.', imageIds: ['c16', 'c23'] },
  { id: 'm7', title: 'Organic chemistry', description: 'A visual guide to how equilibrium shifts with changes in conditions.', imageIds: ['c9', 'c10', 'c11'] },
  { id: 'm8', title: 'Chemical analysis', description: 'Mindmaps showing the shapes of different titration curves.', imageIds: ['c19', 'c21'] },
  { id: 'm9', title: 'Chemistry of the atmosphere', description: 'A mindmap covering the composition, greenhouse effect, and pollutants.', imageIds: ['c22'] },
];


const podcastEpisodes: Resource[] = [
  { id: 'p1', title: 'Podcast: The Mole Concept', description: 'An audio deep-dive into Avogadro\'s number and its importance.' },
  { id: 'p2', title: 'Podcast: Periodic Trends Explained', description: 'A professor explains the reasons behind periodic trends.' },
  { id: 'p3', title: 'Podcast: Hess\'s Law', description: 'A chapter from a chemistry textbook, read aloud.' },
  { id: 'p4', title: 'Podcast: Collision Theory Explained', description: 'A conversational explanation of how and why reactions happen.' },
];

const otherAudioResources: Resource[] = [
  { id: 'a1', title: 'Rhymes for Electron Shells', icon: Mic, description: 'Catchy mnemonics and rhymes to remember electron configurations.' },
  { id: 'a2', title: 'Debate: Ionic vs. Covalent Bonds', icon: Mic, description: 'Two experts debate the characteristics of different bond types.' },
  { id: 'a3', title: 'Equilibrium Constant Sonification', icon: Music, description: 'Listen to how the "sound" of a reaction changes as it reaches equilibrium.' },
  { id: 'a4', title: 'Strong vs. Weak Acids Chant', icon: Mic, description: 'A chant to help you remember the key differences.' },
];


const simulationFolders: Resource[] = [
  { id: '1', title: 'Virtual Lab: Titration', icon: Beaker, description: 'Perform a virtual titration to find the concentration of an unknown acid.' },
  { id: '2', title: 'Interactive: Build an Atom', icon: Atom, description: 'Drag and drop protons, neutrons, and electrons to build any element.' },
  { id: '3', title: 'Model Kit: VSEPR Theory', icon: Beaker, description: 'Build and rotate 3D molecules to understand their shapes.' },
  { id: '4', title: 'Virtual Bond Builder', icon: Atom, description: 'Combine atoms to see how ionic and covalent bonds form.' },
  { id: '5', title: 'Calorimetry Experiment', icon: Beaker, description: 'Measure the heat of a reaction in a virtual coffee-cup calorimeter.' },
  { id: '6', title: 'Reaction Rate Simulator', icon: Atom, description: 'Adjust temperature and concentration to see the effect on reaction speed.' },
  { id: '7', title: 'Equilibrium Simulation', icon: Beaker, description: 'Add and remove reactants to see Le Chatelier\'s Principle in action.' },
  { id: '8', title: 'Acid-Base Virtual Lab', icon: Atom, description: 'Test the pH of different household items in a safe, virtual environment.' },
];

const gamificationFolders: Resource[] = [
  { id: '1', title: 'Molecule Naming Race', icon: Swords, description: 'Race against the clock to name as many chemical compounds as you can.' },
  { id: '2', title: 'Element Matching Game', icon: Puzzle, description: 'A memory game where you match element symbols to their names.' },
  { id: '3', title: 'Periodic Table Battleship', icon: Swords, description: 'Guess the location of your opponent\'s "elements" on the periodic table.' },
  { id: '4', title: 'Bonding Type Quiz Show', icon: Puzzle, description: 'Answer questions about ionic, covalent, and metallic bonding in a game show format.' },
  { id: '5', title: 'Enthalpy Change Challenge', icon: Swords, description: 'Quickly calculate the enthalpy change for a series of reactions.' },
  { id: '6', title: 'Kinetics Rate Law Puzzle', icon: Puzzle, description: 'Solve puzzles to determine the rate law for different reactions.' },
  { id: '7', title: 'Le Chatelier\'s Principle Game', icon: Swords, description: 'Predict which way the equilibrium will shift in this fast-paced game.' },
  { id: '8', title: 'pH Scale Target Practice', icon: Puzzle, description: 'Drag and drop substances onto the correct position on the pH scale.' },
];

const examPracticeResources: Resource[] = [
    { id: 'rw1', title: 'Past Paper Questions', icon: FileText, description: 'Practice with real exam questions from previous years.' },
    { id: 'rw2', title: 'Command Word Drills', icon: BotMessageSquare, description: 'Learn to identify and answer questions based on command words like "Explain" vs. "Describe".' },
    { id: 'rw3', title: 'Timed Essay Practice', icon: FileText, description: 'Practice writing long-form answers under timed conditions.' },
    { id: 'rw4', title: 'Mark Scheme Analysis', icon: GraduationCap, description: 'Understand how exams are marked to maximize your score.' },
];

const modelAnswerResources: Resource[] = [
    { id: 'rw5', title: '6-Mark Question Examples', icon: FileText, description: 'Review perfect-score answers for extended response questions.' },
    { id: 'rw6', title: 'Definition Bank', icon: BotMessageSquare, description: 'A comprehensive list of key terms and their perfect definitions.' },
    { id: 'rw7', title: 'Equation Walkthroughs', icon: GraduationCap, description: 'Step-by-step written guides for solving complex chemical equations.' },
    { id: 'rw8', title: 'Practical Write-ups', icon: FileText, description: 'Model examples of how to write up a practical experiment report.' },
];

const formulaResources: Resource[] = [];


type LearningStyleProps = {
  userDetails: UserDetails | null;
  setUserDetails: (details: UserDetails | null) => void;
};

const LearningStyle = ({ userDetails, setUserDetails }: LearningStyleProps) => {
  const learnerType = userDetails?.learningStyle || 'Visual';
  const [selectedStyle, setSelectedStyle] = useState(learnerType);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [isPodcastListOpen, setIsPodcastListOpen] = useState(false);
  const [isDiagramsOpen, setIsDiagramsOpen] = useState(false);
  const [diagramsToShow, setDiagramsToShow] = useState<ImagePlaceholder[]>([]);
  const [diagramsTitle, setDiagramsTitle] = useState('');
  const learningStyles = ["Visual", "Auditory", "Kinesthetic", "Reading/Writing"];

  const setLearnerType = (style: string) => {
    if (userDetails) {
      setUserDetails({ ...userDetails, learningStyle: style });
    }
  };

  const handleSave = () => {
    setLearnerType(selectedStyle);
    setIsDialogOpen(false);
  };

  const handleQuizComplete = (style: string) => {
    setLearnerType(style);
    setShowQuiz(false);
  };
  
  const handleVisualResourceClick = (resource: Resource) => {
    if (resource.imageIds) {
      const images = PlaceHolderImages.filter(img => resource.imageIds?.includes(img.id));
      setDiagramsToShow(images);
      setDiagramsTitle(resource.title);
      setIsDiagramsOpen(true);
    }
  }

  const renderFolderList = (folders: Resource[], onFolderClick: (folder: Resource) => void, icon: React.ElementType = Folder) => (
    <div className="space-y-2 pr-4">
      {folders.map((folder) => {
        const Icon = folder.icon || icon;
        return (
          <button
            key={folder.id}
            onClick={() => onFolderClick(folder)}
            className="w-full p-3 text-left rounded-2xl transition-colors duration-200 font-sidebar text-lg flex items-center gap-3 hover:bg-accent/50"
          >
            <Icon className="w-6 h-6 flex-shrink-0" />
            <h3 className="font-bold truncate flex-1">{folder.title}</h3>
          </button>
        );
      })}
    </div>
  );
  
  const renderVisualContent = () => (
    <Tabs defaultValue="diagrams" className="flex-1 flex flex-col mt-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="diagrams">Diagrams</TabsTrigger>
          <TabsTrigger value="mindmaps">Mindmaps</TabsTrigger>
          <TabsTrigger value="formulas">Formulas</TabsTrigger>
        </TabsList>
        <TabsContent value="diagrams" className="flex-1 flex flex-col pt-4">
          <Card className="flex-1 flex flex-col">
            <CardHeader>
              <CardTitle>Diagram Folders</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <ScrollArea className="h-full">
                {renderFolderList(diagramFolders, handleVisualResourceClick)}
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
                {renderFolderList(mindmapFolders, handleVisualResourceClick)}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
         <TabsContent value="formulas" className="flex-1 flex flex-col pt-4">
          <FormulasView learningStyle='Visual' />
        </TabsContent>
      </Tabs>
  );

  const renderAuditoryContent = () => {
    const auditoryResources: Resource[] = [
        { id: 'podcasts', title: 'Podcasts', icon: Music, description: 'Listen to various podcasts on chemistry topics.' },
        ...otherAudioResources
    ];

    const handleAudioResourceClick = (resource: Resource) => {
        if (resource.id === 'podcasts') {
            setIsPodcastListOpen(true);
        } else {
            setSelectedResource(resource);
        }
    }

     return (
        <Tabs defaultValue="resources" className="flex-1 flex flex-col mt-8">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="resources">Audio Resources</TabsTrigger>
                <TabsTrigger value="formulas">Formulas</TabsTrigger>
            </TabsList>
            <TabsContent value="resources" className="flex-1 flex flex-col pt-4">
                <Card className="flex-1 flex flex-col">
                <CardHeader>
                    <CardTitle>Audio Resources</CardTitle>
                    <CardDescription>Listen to recordings, podcasts, and rhymes about chemistry.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                    <ScrollArea className="h-[300px]">
                        {renderFolderList(auditoryResources, handleAudioResourceClick)}
                    </ScrollArea>
                </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="formulas" className="flex-1 flex flex-col pt-4">
                <FormulasView learningStyle='Auditory' />
            </TabsContent>
        </Tabs>
     )
  };

  const renderKinestheticContent = () => (
    <Tabs defaultValue="simulations" className="flex-1 flex flex-col mt-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="simulations">Simulations</TabsTrigger>
          <TabsTrigger value="gamification">Gamification</TabsTrigger>
           <TabsTrigger value="formulas">Formulas</TabsTrigger>
        </TabsList>
        <TabsContent value="simulations" className="flex-1 flex flex-col pt-4">
          <Card className="flex-1 flex flex-col">
            <CardHeader>
              <CardTitle>Interactive Simulations</CardTitle>
              <CardDescription>Get hands-on with virtual labs and simulations.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ScrollArea className="h-full">
                {renderFolderList(simulationFolders, (r) => setSelectedResource(r))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="gamification" className="flex-1 flex flex-col pt-4">
          <Card className="flex-1 flex flex-col">
            <CardHeader>
              <CardTitle>Learning Games</CardTitle>
              <CardDescription>Learn chemistry through fun and engaging games.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ScrollArea className="h-full">
                {renderFolderList(gamificationFolders, (r) => setSelectedResource(r))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="formulas" className="flex-1 flex flex-col pt-4">
            <FormulasView learningStyle='Kinesthetic' />
        </TabsContent>
      </Tabs>
  );

  const renderReadingWritingContent = () => (
    <Tabs defaultValue="exam-practices" className="flex-1 flex flex-col mt-8">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="exam-practices">Exam Practices</TabsTrigger>
        <TabsTrigger value="model-answers">Model Answers</TabsTrigger>
        <TabsTrigger value="formulas">Formulas</TabsTrigger>
      </TabsList>
      <TabsContent value="exam-practices" className="flex-1 flex flex-col pt-4">
        <Card className="flex-1 flex flex-col">
          <CardHeader><CardTitle>Exam Practices</CardTitle></CardHeader>
          <CardContent className="flex-1">
            <ScrollArea className="h-full">
              {renderFolderList(examPracticeResources, (r) => setSelectedResource(r))}
            </ScrollArea>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="model-answers" className="flex-1 flex flex-col pt-4">
        <Card className="flex-1 flex flex-col">
          <CardHeader><CardTitle>Model Answers</CardTitle></CardHeader>
          <CardContent className="flex-1">
            <ScrollArea className="h-full">
              {renderFolderList(modelAnswerResources, (r) => setSelectedResource(r))}
            </ScrollArea>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="formulas" className="flex-1 flex flex-col pt-4">
          <FormulasView learningStyle='Reading/Writing' />
      </TabsContent>
    </Tabs>
  );


  const renderContentForLearner = () => {
    switch (learnerType) {
        case 'Auditory':
            return renderAuditoryContent();
        case 'Kinesthetic':
            return renderKinestheticContent();
        case 'Reading/Writing':
            return renderReadingWritingContent();
        case 'Visual':
        default:
            return renderVisualContent();
    }
  }

  if (showQuiz) {
    return (
        <div className="p-8 h-full flex flex-col items-center justify-center">
            <LearningStyleQuiz onComplete={handleQuizComplete} />
        </div>
    );
  }

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
            {learnerType === "Auditory" && "Auditory learners best absorb information through listening, speaking, and music. Try out some audio resources below!"}
            {learnerType === "Kinesthetic" && "Kinesthetic learners best absorb information by doing, moving, and interacting with their environment."}
            {learnerType === "Reading/Writing" && "Reading/Writing learners best absorb information through reading and writing."}
          </p>
          <Button className="mt-6" onClick={() => setShowQuiz(true)}>
            Press here to re-take learning style quiz
          </Button>
        </CardContent>
        <CardFooter className="flex-col gap-4">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={() => setSelectedStyle(learnerType)}>Press here to change learning style</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Your Learning Style</DialogTitle>
                <DialogDescription>
                  Choose the learning style you identified with from the quiz.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="learning-style-select" className="text-right">
                    Style
                  </Label>
                  <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                    <SelectTrigger id="learning-style-select" className="col-span-3">
                        <SelectValue placeholder="Select a style" />
                    </SelectTrigger>
                    <SelectContent>
                        {learningStyles.map((style) => (
                            <SelectItem key={style} value={style}>{style}</SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
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
      
      {renderContentForLearner()}

       <ResourceDialog
        isOpen={selectedResource !== null}
        onClose={() => setSelectedResource(null)}
        resource={selectedResource}
      />
      
      <DiagramsDialog
        isOpen={isDiagramsOpen}
        onClose={() => setIsDiagramsOpen(false)}
        diagrams={diagramsToShow}
        title={diagramsTitle}
      />

       <Dialog open={isPodcastListOpen} onOpenChange={setIsPodcastListOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Podcasts</DialogTitle>
            <DialogDescription>
              Select a podcast episode to listen to.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-72 my-4">
             {renderFolderList(podcastEpisodes, (r) => {
                setIsPodcastListOpen(false);
                setSelectedResource(r);
             }, Music)}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LearningStyle;
