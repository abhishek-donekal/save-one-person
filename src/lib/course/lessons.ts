// The 12 ingredients from "How to Create a Miracle" by Lauren Finkelstein, expanded for the online course.
export type Lesson = {
  n: number; name: string; idea: string; story: string; questions: string[]; action: string
  teaching: string[]; why: string; practice: { title: string; steps: string[] }
  obstacles: { thought: string; shift: string }[]; affirmation: string; deeper: string
}

export const LESSONS: Lesson[] = [
  {
    "n": 1,
    "name": "Pray",
    "idea": "Speak to your Heavenly Father, the universe or your higher power about exactly what you need. Prayer is grounding, and it opens the door.",
    "story": "Heshy Fellig needed a living kidney donor and couldn't find one. He flew to the Holy Land to pray at the graves of righteous souls. Soon after, Save One Person's alert ran in an email called Joke of the Day, and a Catholic woman from Alabama who had never met a Jew became his living kidney donor.",
    "questions": [
      "What do you most need a miracle for right now?",
      "When did you last ask for it out loud?",
      "Where do you feel most connected to something bigger than you?",
      "If you could ask for one thing with complete faith that it would be heard, what would it be?",
      "What part of this situation are you ready to hand over?"
    ],
    "action": "Write your request in one sentence. Say it out loud as a prayer every morning for the 12 days of this course.",
    "teaching": [
      "Prayer is the first ingredient because every miracle begins with a clear request. Most of us carry our hopes around as a vague cloud of worry: \"I hope it gets better.\" Prayer turns that cloud into words. When you name exactly what you need, you stop drifting and start moving toward it.",
      "You don't need special words, a special place or a special religion. You can speak to your Heavenly Father, to the universe, or to whatever you feel is bigger than you. Talk the way you'd talk to someone who loves you completely. Be honest. Say what scares you, what you want, and what you're willing to do.",
      "Prayer is also a way of letting go. You are handing the part you can't control to something bigger, so you can put your full energy into the part you can. People who pray often describe a calm that arrives before anything outside them changes. That calm is not the end of the story. It's the ground you stand on while the miracle comes."
    ],
    "why": "When you put a need into words, your mind starts noticing people, ideas and chances connected to it. You also stop wasting energy on fear and start spending it on hope. Many people find that a few minutes of daily prayer or quiet reflection lowers stress and makes them kinder and braver. Those are exactly the qualities a miracle needs.",
    "practice": {
      "title": "The One-Sentence Prayer",
      "steps": [
        "Sit somewhere quiet for three minutes. Put one hand on your heart and breathe slowly.",
        "Finish this sentence: \"Please help me with...\" Keep rewriting it until it's one clear, specific sentence.",
        "Add a second line: \"And I will do my part by...\"",
        "Say both lines out loud every morning for 12 days. Notice what shows up."
      ]
    },
    "obstacles": [
      {
        "thought": "\"I don't know if anyone is listening.\"",
        "shift": "You don't have to be sure. Pray as an experiment for 12 days and watch what changes in you and around you."
      },
      {
        "thought": "\"It feels selfish to ask for what I want.\"",
        "shift": "Asking isn't selfish. A person who receives a miracle almost always becomes a miracle for someone else."
      }
    ],
    "affirmation": "I ask clearly, I trust deeply, and I do my part.",
    "deeper": "This week, pray for someone else's miracle as hard as you pray for your own. Write their name in your workbook and tell them you're praying for them."
  },
  {
    "n": 2,
    "name": "Do the Work",
    "idea": "Do your part with everything you have, then let go and let G-d take over.",
    "story": "Stuart Zimmer, a father of three, needed a second kidney and was told his chances were slim. His wife refused to accept the odds and contacted outlet after outlet. Save One Person sent his story to the media, 1010 WINS put it on the air, hundreds called the hospital, and Regina Grebb became his living kidney donor. He went on to have more children.",
    "questions": [
      "What is the one thing you've been avoiding that would move your miracle forward?",
      "Who could help if you asked?",
      "What would you do if you refused to accept the odds?",
      "What 'no' are you treating as final that might only be 'not yet'?",
      "Where do you need to stop working and start trusting?"
    ],
    "action": "List 5 concrete actions toward your miracle. Do the first one today.",
    "teaching": [
      "Miracles rarely land on people who are sitting still. Stuart Zimmer's wife didn't just hope. She called outlet after outlet until someone listened. That is what doing the work looks like: refusing to accept \"no\" as the final answer, and taking action even when you're tired and scared.",
      "Doing the work doesn't mean doing everything. It means doing your part with everything you have: the calls, the letters, the research, the asking for help. Then, when you've done all you can, you let go and let G-d take over. Work and faith aren't opposites. They are two hands clapping.",
      "Many people get stuck because the work feels too big. The secret is to break it into actions so small you can't say no to them. One email. One phone call. One question to one person. Big miracles are built from a pile of small, brave actions."
    ],
    "why": "Action creates momentum and opens doors you can't see from where you stand. Every call you make reaches someone who knows someone. Every \"no\" brings you closer to a \"yes.\" Action is also the best cure for anxiety: it turns helpless waiting into hopeful doing.",
    "practice": {
      "title": "The Miracle Action List",
      "steps": [
        "Write your miracle at the top of a page.",
        "List every action you could take toward it, big and small. Aim for at least 15.",
        "Circle the 5 that would make the biggest difference.",
        "Put them in order and do the first one today, before you go to sleep."
      ]
    },
    "obstacles": [
      {
        "thought": "\"I've already tried everything.\"",
        "shift": "Ask three people what they would try. A new set of eyes almost always finds a door you missed."
      },
      {
        "thought": "\"I'm too tired.\"",
        "shift": "Do one five-minute action. Momentum gives energy back."
      }
    ],
    "affirmation": "I do my part fully, and I trust the rest to G-d.",
    "deeper": "Ask for help from three people this week: one friend, one expert, and one person you've never asked before."
  },
  {
    "n": 3,
    "name": "Have Fun",
    "idea": "Joy changes your state, and your state changes what's possible, even in the hardest moments.",
    "story": "Before a frightening surgery, Lauren booked a helicopter ride over New York City to see life from a bigger view, and asked the doctor to play ABBA's Dancing Queen in the operating room. With the Tony Robbins community she walked on hot coals and jumped off a cliff in Africa, by changing her state first.",
    "questions": [
      "When did you last laugh until it hurt?",
      "What fear could you meet with music, movement or laughter instead?",
      "What would getting every last drop out of life look like this week?",
      "What did you love doing as a child that you've stopped doing?",
      "Who makes you laugh, and when did you last see them?"
    ],
    "action": "Do one thing today purely for joy: dance, watch a comedy, or call the funniest person you know.",
    "teaching": [
      "It might seem strange that fun is an ingredient in creating a miracle. But think about how you feel when you're laughing: lighter, braver, more open. Fear makes us small and stiff. Joy makes us expand. A person who can still find joy in a hard season has more strength to keep going.",
      "Lauren learned this before a frightening surgery. Instead of spending the days before it frozen with fear, she took a helicopter ride over New York to see her life from a bigger view, and asked for ABBA's Dancing Queen in the operating room. She didn't deny the fear. She changed her state so the fear wasn't in charge.",
      "Fun is also a way of saying yes to life right now, not just after the miracle comes. When you squeeze joy out of today, you stop waiting to start living. And people are drawn to joy: the friends, helpers and opportunities you need often show up around the person who is still laughing."
    ],
    "why": "Your emotional state shapes how you think and act. When you're stressed, your thinking narrows. When you feel good, you see more options, solve problems more creatively and connect with people more easily. Laughter, music and movement are some of the fastest ways to shift your state.",
    "practice": {
      "title": "The 10-Minute State Change",
      "steps": [
        "Notice how you feel right now on a scale of 1 to 10.",
        "Put on a song that makes you want to move, and dance or walk around for the whole song.",
        "Watch or read something that makes you laugh for five minutes.",
        "Rate yourself again. Write down what helped most, so you can use it whenever fear takes over."
      ]
    },
    "obstacles": [
      {
        "thought": "\"It feels wrong to have fun when things are so serious.\"",
        "shift": "Joy isn't disrespect. It refuels you so you can keep fighting for what matters."
      },
      {
        "thought": "\"I don't have time for fun.\"",
        "shift": "Fun can take three minutes: one song, one call, one silly moment."
      }
    ],
    "affirmation": "Joy gives me strength, and I let myself enjoy today.",
    "deeper": "Plan one 'bucket list' experience, big or small, and put a date on the calendar."
  },
  {
    "n": 4,
    "name": "Find and Live Your Mission",
    "idea": "Rabbi Simon Jacobson's formula: take the skills you've gained in life and use them to help others. That is your mission.",
    "story": "Lauren started her TV career as a production assistant at MTV, then spent four years as a promo producer at Court TV and freelanced at WNBC, WABC, King World Television and CNBC. One day at Inside Edition she saw airtime spent on swimsuits and thought: why not use 30 seconds to help someone who needs a miracle? After great loss and 9/11, Rabbi Jacobson told her to use her TV skills to help people, and Save One Person was born.",
    "questions": [
      "What are you good at that people often ask you for?",
      "Whose pain moves you most?",
      "Where do those two meet?",
      "What problem in the world makes you angry enough to want to fix it?",
      "If money didn't matter, how would you spend your days helping others?"
    ],
    "action": "Write your mission in one sentence: \"I use my ___ to help ___.\"",
    "teaching": [
      "Rabbi Simon Jacobson gives a simple formula for finding your mission: take the skills life has given you and use them to help others. Your mission isn't hidden in a mountaintop cave. It's sitting in your own story: the things you're good at, the pain you've lived through, and the people your heart goes out to.",
      "Lauren started her TV career as a production assistant at MTV, then became a promo producer at Court TV and freelanced at WNBC, WABC, King World Television and CNBC. One day she wondered why airtime couldn't be used to help someone who needs a miracle. After great loss and 9/11, she used those TV skills to start Save One Person. Her career, her losses and her faith all came together into one purpose.",
      "When you live your mission, miracles have a way of following you, because you're already in the business of helping them happen. Your mission doesn't have to be a nonprofit or a big title. It can be how you show up for your family, your coworkers or your community, using what you know to lift others."
    ],
    "why": "People who feel their life has purpose tend to be more resilient, more hopeful and more motivated. A clear mission also makes decisions easier: you can ask, \"Does this serve my mission?\" and the answer cuts through the noise.",
    "practice": {
      "title": "The Mission Map",
      "steps": [
        "Make three columns: My skills, What I've been through, Who I care about.",
        "Write at least five things in each column.",
        "Draw lines between things that connect across the columns.",
        "Write your mission in one sentence: \"I use my ___ to help ___.\""
      ]
    },
    "obstacles": [
      {
        "thought": "\"I don't have any special skills.\"",
        "shift": "Ask three people what they come to you for. You'll be surprised."
      },
      {
        "thought": "\"My past is too painful to use.\"",
        "shift": "Your hardest experiences often make you the best person to help someone going through the same thing."
      }
    ],
    "affirmation": "My life has a purpose, and I use my gifts to help others.",
    "deeper": "Take one small action this week that lives out your mission sentence, and notice how it feels."
  },
  {
    "n": 5,
    "name": "Own Your Voice",
    "idea": "Speak up when you see someone in pain, even when it costs you. One voice can save a life.",
    "story": "Rebbetzin Jungreis taught: when you see another in pain, you must get involved, because G-d showed you for a reason. Remember Kitty Genovese, whose neighbors each assumed someone else would call for help. Three pillars carried Lauren through her own storms: connect to a higher power, find people who have your back, and find your mission.",
    "questions": [
      "Where have you stayed quiet when you wanted to speak?",
      "Who around you might need you to speak up for them?",
      "Which of the three pillars do you need most right now?",
      "Whose voice has changed your life by speaking up for you?",
      "What would you say if you knew you couldn't fail?"
    ],
    "action": "Use your voice once today: make the call, send the message, or say what needs saying, with kindness.",
    "teaching": [
      "Rebbetzin Esther Jungreis taught that when you see someone in pain, you must get involved. Staying quiet is easy. Speaking up can cost you comfort, approval, even friendships. But one voice, at the right moment, can change the course of a life.",
      "Owning your voice starts with believing your words matter. Many of us were taught to be polite, keep the peace, and not make waves. But miracles often need someone willing to make a wave: to call the station, write the letter, ask the doctor one more question, or tell a friend the truth with love.",
      "Owning your voice doesn't mean being loud or harsh. The most powerful voices are clear, honest and kind. Speak up for yourself, and speak up for people who can't speak for themselves. Every Save One Alert exists because someone was willing to tell a story out loud."
    ],
    "why": "When you speak up, you invite others to act. Most people want to help but wait for someone else to go first. Your voice gives them permission. Speaking up also builds self-respect: every time you say what's true, your confidence grows.",
    "practice": {
      "title": "The Kind and Clear Script",
      "steps": [
        "Think of one thing you've been holding back from saying.",
        "Write it in three sentences: what you see, how you feel, what you're asking for.",
        "Read it out loud until it sounds calm and kind.",
        "Say it or send it today."
      ]
    },
    "obstacles": [
      {
        "thought": "\"What if they get angry?\"",
        "shift": "You can't control their reaction, only your kindness and honesty. Lead with care."
      },
      {
        "thought": "\"Who am I to speak up?\"",
        "shift": "You're someone who sees the problem. That's enough."
      }
    ],
    "affirmation": "My voice matters, and I use it with courage and kindness.",
    "deeper": "Share a cause you care about publicly this week: a post, a letter, or a conversation with someone who can help."
  },
  {
    "n": 6,
    "name": "Be the Miracle",
    "idea": "The surest way to find a miracle is to be one for someone else.",
    "story": "After PIX11's Help Me Howard aired Steven Scarduzio's story, Bonnie Larossa stepped forward to be his living kidney donor. The hospital asked her to join a kidney swap instead, and six lives were saved. Everyone in that chain, from the producer who said \"time to step it up\" to Bonnie, was a miracle maker.",
    "questions": [
      "Who could you be a miracle for this week?",
      "When did a stranger change your life?",
      "Can you accept a miracle that arrives differently than you prayed for?",
      "What would you want someone to do for you if you were in their place?",
      "How could you be part of a miracle chain like the kidney swap?"
    ],
    "action": "Do one unexpected kind act for someone who can't repay you.",
    "teaching": [
      "The fastest way to find a miracle is to become one for someone else. When Bonnie Larossa stepped forward to be a living kidney donor for Steven Scarduzio, the hospital asked her to join a kidney swap instead, and six lives were saved. One person's yes created a chain of miracles.",
      "You don't have to give a kidney to be a miracle. You can be the call that comes at the right time, the meal on someone's doorstep, the introduction that opens a door, or the person who shares a patient's story so the right donor sees it. Miracles are often made of ordinary kindness delivered at an extraordinary moment.",
      "Being the miracle also changes how you see your own struggle. When you help someone else, you remember that you're not helpless. And very often, the help you give comes back to you in ways you never expected."
    ],
    "why": "Helping others is good for the helper too. Many people report feeling more purpose, more connection and less stress when they give. Kindness also spreads: people who receive help are more likely to help someone else.",
    "practice": {
      "title": "The Miracle Mission",
      "steps": [
        "Write the names of three people who are struggling right now.",
        "Next to each name, write one thing you could do that would mean a lot to them.",
        "Choose one and do it today, without expecting anything back.",
        "Write down how it felt."
      ]
    },
    "obstacles": [
      {
        "thought": "\"I have nothing to give right now.\"",
        "shift": "A message, a prayer or sharing someone's story costs nothing and can still change a life."
      },
      {
        "thought": "\"My help is too small to matter.\"",
        "shift": "Every miracle chain starts with one small yes."
      }
    ],
    "affirmation": "I am a miracle for someone today.",
    "deeper": "Learn about becoming a living kidney donor or joining the bone marrow registry, and share a Save One Alert with three people."
  },
  {
    "n": 7,
    "name": "Learn from the Masters",
    "idea": "Miracle makers can be learned from. Find teachers who help you tap into something bigger, and keep your eyes and heart open.",
    "story": "Lauren has learned from Sara Yardeni, Dr. Joe Dispenza, Tony Robbins, Loren Lahav, Abraham Hicks and Vianna Stibal. At one meditation she asked, half as a joke, to see a fairy. At breakfast, the little girl sitting next to her was drawing one.",
    "questions": [
      "Who has taught you the most about faith or possibility?",
      "What teacher or practice have you been curious about but never tried?",
      "How will you tell a real teacher from someone who preys on your pain?",
      "What is the best lesson a teacher ever gave you?",
      "What would you love to learn if you knew it could change your life?"
    ],
    "action": "Spend 15 minutes today with one teacher: a meditation, a class, a book chapter or a talk.",
    "teaching": [
      "Nobody creates miracles alone. Every miracle maker has teachers: people who have walked the path and can show you what's possible. Lauren has learned from many teachers of faith, healing and possibility, and each one added something to her toolbox.",
      "A good teacher doesn't make you dependent on them. They help you find something in yourself and connect you to something bigger. Look for teachers whose lives show the results they talk about, who are generous with what they know, and who leave you feeling stronger, not smaller.",
      "Keep your eyes and heart open, too, because the universe has a sense of humor. Lauren once asked, half as a joke, to see a fairy during a meditation. At breakfast, the little girl next to her was drawing one. Sometimes the lesson arrives through a child, a stranger or a moment you almost missed."
    ],
    "why": "Learning from people who've done what you want to do saves years of trial and error. Meditation, prayer and reflection practices taught by experienced teachers can help calm the mind and build focus, and being part of a community of learners keeps you going when motivation fades.",
    "practice": {
      "title": "Your Teacher Plan",
      "steps": [
        "Write three areas where you want to grow: faith, health, confidence, purpose, or something else.",
        "For each, name one teacher, book, class or community you could learn from.",
        "Choose one and spend 15 minutes with it today.",
        "Write down the one idea that stayed with you."
      ]
    },
    "obstacles": [
      {
        "thought": "\"I can't afford courses or seminars.\"",
        "shift": "Libraries, free talks, podcasts and videos hold wisdom from great teachers at no cost."
      },
      {
        "thought": "\"I've been burned by teachers before.\"",
        "shift": "Trust teachers who encourage your independence and never prey on your pain or your wallet."
      }
    ],
    "affirmation": "I am open to learning, and wisdom finds me everywhere.",
    "deeper": "Teach one thing you've learned to someone else this week. Teaching is the fastest way to master it."
  },
  {
    "n": 8,
    "name": "Believe",
    "idea": "Every healer says the same thing: you have to believe it's possible. Faith and fear are both made up, so feed your mind with faith.",
    "story": "Richard Woontyler's son was going to be his living kidney donor, then was in a car crash. 1010 WINS aired Richard's story and a woman in England read it online and offered to help. Insurance wouldn't allow it, so she became the living kidney donor for an 11-year-old girl in Israel instead. Richard later received a kidney from a family member.",
    "questions": [
      "Where are you feeding fear more than faith?",
      "What would you do differently if you knew your miracle was on its way?",
      "Can you trust the 'how' to your creator?",
      "What story about your future are you telling most often?",
      "Whose faith in you helped you believe in yourself?"
    ],
    "action": "Write your miracle in the present tense, as if it has already happened. Read it before bed tonight.",
    "teaching": [
      "Every healer, teacher and miracle maker says the same thing: you have to believe it's possible. Faith and fear are both stories about a future that hasn't happened yet. Since you're telling yourself a story either way, choose the one that gives you strength.",
      "Richard Woontyler's story shows how belief works. His son was going to be his living kidney donor, then was in a car crash. Richard's story aired on 1010 WINS, and a woman in England offered to help. Insurance wouldn't allow it, so she became a living kidney donor for an 11-year-old girl in Israel instead. Richard later received a kidney from a family member. The miracle didn't arrive the way anyone planned, but it arrived, more than once.",
      "Believing doesn't mean ignoring reality or pretending everything is fine. It means refusing to let fear have the last word. Feed your mind with faith the way you feed your body: on purpose, every day, with good things."
    ],
    "why": "Our beliefs shape our choices. People who expect good things tend to keep trying longer, ask for help more often, and notice more opportunities, which makes good outcomes more likely. Hope is not passive. It's fuel.",
    "practice": {
      "title": "The Faith Feed",
      "steps": [
        "Write down the three fearful thoughts you repeat most often.",
        "Next to each, write a believing thought that is also true. (Fear: \"Nobody will help.\" Faith: \"Strangers have helped people like me before.\")",
        "Read the believing thoughts every morning and every night.",
        "For 12 days, cut one source of fear from your day: a news habit, a negative conversation, a scary search."
      ]
    },
    "obstacles": [
      {
        "thought": "\"I've been disappointed before.\"",
        "shift": "Disappointment is part of every miracle story. Look at how many miracles came after the disappointments."
      },
      {
        "thought": "\"Belief feels fake.\"",
        "shift": "Start with 'it's possible.' You don't have to be certain to be hopeful."
      }
    ],
    "affirmation": "I believe my miracle is possible, and I feed my faith every day.",
    "deeper": "Collect three true miracle stories this week, from friends, family or the news, and read them whenever doubt creeps in."
  },
  {
    "n": 9,
    "name": "Charity",
    "idea": "Giving, of money, time or skills, shakes up the heavens. The only thing we take with us is what we give away.",
    "story": "Lauren had just lost a tenant and was staring at her mortgage when a charity request arrived. She wrote the check anyway. Moments later she opened an unexpected check for $30,000, exactly what she needed, and a new tenant called the same day.",
    "questions": [
      "What could you give this week: money, time or a skill?",
      "Where are you holding on so tight there's no room to receive?",
      "Who gave to you when you needed it most?",
      "What is the most meaningful gift you've ever given?",
      "Where could your skills help a cause you care about?"
    ],
    "action": "Give something today, a little beyond what feels comfortable.",
    "teaching": [
      "Giving shakes up the heavens. In many traditions, charity is said to open doors that nothing else can. The only thing we truly take with us is what we give away.",
      "Lauren learned this when she had just lost a tenant and was staring at her mortgage. A charity request arrived, and she wrote the check anyway. Moments later she opened an unexpected check for $30,000, exactly what she needed, and a new tenant called the same day. Giving when it feels hardest is an act of faith that says: there is enough.",
      "Charity isn't only money. You can give time, skills, attention, a meal, a ride, or a few minutes of listening. Give in a way that stretches you a little, and give without needing credit. The point is not to make a deal with heaven, but to open your hands, so you can also receive."
    ],
    "why": "Giving moves you from a mindset of scarcity to one of abundance. People who give often feel more grateful and connected, and generosity builds relationships and community, the very networks that carry miracles from one person to the next.",
    "practice": {
      "title": "The Stretch Gift",
      "steps": [
        "Decide what you'll give today: money, time, or a skill.",
        "Choose an amount or a length of time a little beyond what feels comfortable.",
        "Give it quietly, without telling anyone.",
        "Write down how you felt before and after."
      ]
    },
    "obstacles": [
      {
        "thought": "\"I can't afford to give right now.\"",
        "shift": "Give a small amount, or give time. The size matters less than the open heart."
      },
      {
        "thought": "\"I'm giving to get something back.\"",
        "shift": "That's human. Give anyway, and let the giving itself change you."
      }
    ],
    "affirmation": "I give freely, and I am open to receive.",
    "deeper": "Choose one cause to support every week for the next month, even with a small amount or an hour of your time."
  },
  {
    "n": 10,
    "name": "One Step at a Time",
    "idea": "Don't look at the whole mountain. Look at the next step, and step outside the box.",
    "story": "Nachshon took the first step into the Red Sea before it split. Lauren's winning formula is looking only at the next task. Save One Person itself is outside the box: who thinks to go on the news to find a living kidney donor? It works.",
    "questions": [
      "What is the very next step, small enough to do today?",
      "What box are you stuck in?",
      "If one way hasn't worked, what's another way?",
      "What would you try if you weren't worried about looking foolish?",
      "What is one step you've been putting off that would take less than 15 minutes?"
    ],
    "action": "Take the single next step today, and try one thing you've never tried.",
    "teaching": [
      "When the Israelites stood at the edge of the Red Sea, the story goes that Nachshon walked into the water before it split. He didn't wait for the whole path to appear. He took the first step, and the way opened.",
      "Looking at the whole mountain is overwhelming. Looking at the next step is doable. Lauren's winning formula is simple: just look at the next task. Finish it, then look at the next one. Big things get done this way, one small step after another.",
      "One step at a time also means being willing to step outside the box. Save One Person is itself an outside-the-box idea: who thinks of going on the news to find a living kidney donor? But it works. If one road is blocked, look for a side door, a window, or a completely different road."
    ],
    "why": "Breaking big goals into small, clear steps makes them easier to start and easier to finish. Each step completed gives a sense of progress, which builds motivation for the next one. Creative, unexpected approaches often succeed exactly because nobody else is trying them.",
    "practice": {
      "title": "The Next Step Ladder",
      "steps": [
        "Write your miracle at the top of a page.",
        "Ask: what is the very next step? Make it small enough to do in 15 minutes.",
        "Do it now.",
        "Then write one 'outside the box' idea, the craziest way you could move toward your miracle, and one small way to test it."
      ]
    },
    "obstacles": [
      {
        "thought": "\"It's too big. I don't know where to start.\"",
        "shift": "Start with the smallest step you can think of. Starting is the only step that matters today."
      },
      {
        "thought": "\"My idea seems silly.\"",
        "shift": "Many miracles began as ideas that seemed silly to everyone else."
      }
    ],
    "affirmation": "I take the next step with faith, and the way opens before me.",
    "deeper": "For the rest of the week, write the next single step every morning and do it before lunch."
  },
  {
    "n": 11,
    "name": "Share What You Learn",
    "idea": "What you've learned is meant to pass through you. Share it, even if you never see where it lands.",
    "story": "After years of seminars, Lauren began sharing short Health Hacks videos every week, simply because the information might help someone. Every week Save One Person sends a Save One Alert for someone who needs a living organ donor or a medical miracle, and the miracle lands where it's meant to.",
    "questions": [
      "What do you know that could help someone else?",
      "Who in your life needs to hear it?",
      "What's the simplest way to share it this week?",
      "What is something you wish someone had told you sooner?",
      "What story from your life could give someone else hope?"
    ],
    "action": "Share one thing you've learned with one person today: a call, a post or a note.",
    "teaching": [
      "What you've learned isn't meant to stay inside you. It's meant to pass through you to someone who needs it. You may never see where it lands, and that's okay. Sharing is like planting seeds: some will grow in gardens you'll never visit.",
      "After years of learning about health, Lauren began sharing short Health Hacks videos every week, because the information might help someone. Every week, Save One Person sends a Save One Alert for someone who needs a living organ donor or a medical miracle. The message goes out, and the miracle lands where it's meant to.",
      "You have knowledge someone else needs: how you got through an illness, how you handled a loss, a recipe, a prayer, a phone number, a lesson learned the hard way. When you share it, you turn your experience into a gift."
    ],
    "why": "Sharing knowledge helps others avoid mistakes and find solutions faster. It also deepens your own understanding and connects you to people. Information that reaches the right person at the right time can literally save a life.",
    "practice": {
      "title": "The Share Plan",
      "steps": [
        "List five things you know that could help someone else.",
        "Next to each, write who might need it.",
        "Choose one and share it today: a call, a text, a post or a note.",
        "Notice any response, but share without needing one."
      ]
    },
    "obstacles": [
      {
        "thought": "\"Who would want to hear from me?\"",
        "shift": "Someone is searching right now for exactly what you know."
      },
      {
        "thought": "\"I'm not an expert.\"",
        "shift": "You don't need to be. Your real experience is often more useful than expert advice."
      }
    ],
    "affirmation": "What I learn flows through me to bless others.",
    "deeper": "Share a Save One Alert, a health tip or a story of hope with your community every day this week."
  },
  {
    "n": 12,
    "name": "Dream",
    "idea": "Dream big again, look for the miracles already in front of you, and notice the miracles that came even when your exact prayer wasn't answered.",
    "story": "A doctor told Lauren that families of patients in a coma should stop hoping and let go. A week later, the woman translating a class for her hugged her seven-year-old and said he'd been in a coma for months: \"He's my miracle child.\" Lauren's own dream of Save One Person units in every newsroom isn't finished yet, and so many miracles have happened on the way.",
    "questions": [
      "What did you stop dreaming about, and why?",
      "What miracle is already in front of you that you've stopped seeing?",
      "What miracles came while you waited for the one you asked for?",
      "What would your life look like five years from now if your miracle came true?",
      "Who will you share your dream with, so they can help you hold it?"
    ],
    "action": "Write your biggest dream without limits. Then write three miracles you already have.",
    "teaching": [
      "Life can teach us to stop dreaming. Disappointments pile up and we start protecting our hearts by wanting less. The last ingredient asks you to dream big again, without apologizing.",
      "A doctor once told Lauren that families of patients in a coma should stop hoping and let go. A week later, the woman translating a class for her hugged her seven-year-old son and said he'd been in a coma for months: \"He's my miracle child.\" Hope isn't foolish. Sometimes it's the only realistic thing to hold on to.",
      "Dreaming also means opening your eyes to the miracles already in front of you, and noticing the miracles that came even when your exact prayer wasn't answered. Lauren's dream of a Save One Person unit in every newsroom isn't finished yet, and so many miracles have happened along the way. Keep dreaming, and keep counting the miracles you already have."
    ],
    "why": "Big dreams give direction and energy. Gratitude for what you already have keeps you grounded and happy while you work toward what's next. Together they make a powerful combination: hope for the future and peace in the present.",
    "practice": {
      "title": "The Dream Without Limits",
      "steps": [
        "Set a timer for 10 minutes and write your biggest dream as if anything were possible.",
        "Underline the part that excites you most.",
        "Write three miracles you already have in your life.",
        "Write one action you'll take this month toward the underlined part."
      ]
    },
    "obstacles": [
      {
        "thought": "\"It's too late for me.\"",
        "shift": "Many people found their greatest purpose later in life. Your story isn't over."
      },
      {
        "thought": "\"Dreaming just leads to disappointment.\"",
        "shift": "Dream and stay grateful at the same time, so you're rich either way."
      }
    ],
    "affirmation": "I dream big, I notice my miracles, and I keep going.",
    "deeper": "Write a letter to yourself one year from now describing the miracles that happened. Seal it and put a date on your calendar to open it."
  }
]

export const BONUS: Record<"morning" | "circle", { title: string; steps: string[] }> = {
  "morning": {
    "title": "The 5-Minute Miracle Morning",
    "steps": [
      "Minute 1: Breathe. Three slow breaths with a hand on your heart.",
      "Minute 2: Pray. Say your one-sentence prayer out loud.",
      "Minute 3: Believe. Read today's affirmation and your miracle written in the present tense.",
      "Minute 4: Give thanks. Name three miracles you already have.",
      "Minute 5: Step. Decide the one next step you'll take today."
    ]
  },
  "circle": {
    "title": "Start a Miracle Circle",
    "steps": [
      "Invite 3 to 8 friends to take the course with you.",
      "Meet once a week (in person, by phone or video) for 45 minutes.",
      "Each person shares one win and one challenge from the week's lessons.",
      "Choose one 'be the miracle' action to do together, such as sharing a Save One Alert.",
      "Close by praying for each person's miracle by name."
    ]
  }
}
