
export type QuizOption = {
    text: string;
    type: 'V' | 'A' | 'R' | 'K'; // Visual, Auditory, Read/Write, Kinesthetic
};

export type LearningStyleQuestion = {
    question: string;
    options: QuizOption[];
};

export const learningStyleQuestions: LearningStyleQuestion[] = [
    {
        question: "When choosing a career or area of study, these are important for me:",
        options: [
            { text: "Applying my knowledge in real situations.", type: 'K' },
            { text: "Communicating with others through discussion.", type: 'A' },
            { text: "Working with designs, maps or charts.", type: 'V' },
            { text: "Using words well in written communications.", type: 'R' }
        ]
    },
    {
        question: "I have been advised by the doctor that I have a medical problem and I have some questions about it. I would:",
        options: [
            { text: "look at a diagram showing what was wrong.", type: 'V' },
            { text: "read an article that explains the problem.", type: 'R' },
            { text: "have a detailed discussion with my doctor.", type: 'A' },
            { text: "use a 3D model to see what is wrong.", type: 'K' }
        ]
    },
    {
        question: "I want to learn how to play a new board game or card game. I would:",
        options: [
            { text: "use the diagrams that explain the various stages, moves and strategies in the game.", type: 'V' },
            { text: "read the instructions.", type: 'R' },
            { text: "listen to somebody explaining it and ask questions.", type: 'A' },
            { text: "watch others play the game before joining in.", type: 'K' }
        ]
    },
    {
        question: "I want to learn to do something new on a computer. I would:",
        options: [
            { text: "start using it and learn by trial and error.", type: 'K' },
            { text: "follow the diagrams in a book.", type: 'V' },
            { text: "read the written instructions that came with the program.", type: 'R' },
            { text: "talk with people who know about the program.", type: 'A' }
        ]
    },
    {
        question: "I want to learn about a new project. I would ask for:",
        options: [
            { text: "an opportunity to discuss the project.", type: 'A' },
            { text: "a written report describing the main features of the project.", type: 'R' },
            { text: "diagrams to show the project stages with charts of benefits and costs.", type: 'V' },
            { text: "examples where the project has been used successfully.", type: 'K' }
        ]
    },
    {
        question: "When I am learning I:",
        options: [
            { text: "read books, articles and handouts.", type: 'R' },
            { text: "like to talk things through.", type: 'A' },
            { text: "see patterns in things.", type: 'V' },
            { text: "use examples and applications.", type: 'K' }
        ]
    },
    {
        question: "When finding my way, I:",
        options: [
            { text: "rely on paper maps or GPS maps.", type: 'V' },
            { text: "like to read instructions from GPS or instructions that have been written.", type: 'R' },
            { text: "head in the general direction to see if I can find my destination without instructions.", type: 'K' },
            { text: "rely on verbal instructions from GPS or from someone traveling with me.", type: 'A' }
        ]
    },
    {
        question: "I prefer a presenter or a teacher who uses:",
        options: [
            { text: "demonstrations, models or practical sessions.", type: 'K' },
            { text: "handouts, books, or readings.", type: 'R' },
            { text: "question and answer, talk, group discussion, or guest speakers.", type: 'A' },
            { text: "diagrams, charts, maps or graphs.", type: 'V' }
        ]
    },
    {
        question: "I want to learn how to take better photos. I would:",
        options: [
            { text: "use the written instructions about what to do.", type: 'R' },
            { text: "ask questions and talk about the camera and its features.", type: 'A' },
            { text: "use examples of good and poor photos showing how to improve them.", type: 'V' },
            { text: "use diagrams showing the camera and what each part does.", type: 'K' } // This is also very visual/kinesthetic
        ]
    },
    {
        question: "When learning from the Internet I like:",
        options: [
            { text: "detailed articles.", type: 'R' },
            { text: "podcasts and videos where I can listen to experts.", type: 'A' },
            { text: "videos showing how to do things.", type: 'K' },
            { text: "interesting design and visual features.", type: 'V' }
        ]
    },
    {
        question: "I want to find out about a house or an apartment. Before visiting it I would want:",
        options: [
            { text: "a discussion with the owner.", type: 'A' },
            { text: "to view a video of the property.", type: 'K' }, // K for virtual tour aspect
            { text: "a printed description of the rooms and features.", type: 'R' },
            { text: "a plan showing the rooms and a map of the area.", type: 'V' }
        ]
    },
    {
        question: "I want to save more money and to decide between a range of options. I would:",
        options: [
            { text: "talk with an expert about the options.", type: 'A' },
            { text: "read a print brochure that describes the options in detail.", type: 'R' },
            { text: "use graphs showing different options for different time periods.", type: 'V' },
            { text: "consider examples of each option using my financial information.", type: 'K' }
        ]
    },
    {
        question: "A website has a video showing how to make a special graph or chart. There is a person speaking, some lists and words describing what to do and some diagrams. I would learn most from:",
        options: [
            { text: "seeing the diagrams.", type: 'V' },
            { text: "reading the words.", type: 'R' },
            { text: "watching the actions.", type: 'K' },
            { text: "listening.", type: 'A' }
        ]
    },
    {
        question: "I want to find out more about a tour that I am going on. I would:",
        options: [
            { text: "talk with the person who planned the tour or others who are going on the tour.", type: 'A' },
            { text: "look at details about the highlights and activities on the tour.", type: 'K' },
            { text: "read about the tour on the itinerary.", type: 'R' },
            { text: "use a map and see where the places are.", type: 'V' }
        ]
    },
    {
        question: "I am having trouble assembling a wooden table that came in parts (kitset). I would:",
        options: [
            { text: "watch a video of a person assembling a similar table.", type: 'K' },
            { text: "study diagrams showing each stage of the assembly.", type: 'V' },
            { text: "ask for advice from someone who assembles furniture.", type: 'A' },
            { text: "read the instructions that came with the table.", type: 'R' }
        ]
    },
    {
        question: "I have finished a competition or test and I would like some feedback:",
        options: [
            { text: "using a written description of my results.", type: 'R' },
            { text: "using graphs showing how my performance has improved.", type: 'V' },
            { text: "using examples from what I have done.", type: 'K' },
            { text: "from somebody who talks it through with me.", type: 'A' }
        ]
    }
];
