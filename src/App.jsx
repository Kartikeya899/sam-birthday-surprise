import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight, Heart, LockKeyhole, Volume2, VolumeX, Sparkles,
  Gift, Image as ImageIcon, Play, RotateCcw, Music2, CheckCircle2
} from "lucide-react";

const QUIZ_LEVELS = [
  {
    eyebrow: "LEVEL ONE · THE LITTLE THINGS",
    title: "How well do you know us?",
    intro: "Every great story is made of tiny moments. Let's start with a few.",
    questions: [
      {
        question: "What's the one thing this surprise is made for?",
        options: ["A random Tuesday", "Your birthday, Sam 💗", "A school project"],
        answer: 1,
        hint: "Look at the date and the name on this page."
      },
      {
        question: "What should you do if a question gets tricky?",
        options: ["Give up immediately", "Ask for a little hint", "Close the website"],
        answer: 1,
        hint: "This little adventure is meant to be fun. Hints are allowed!"
      }
    ]
  },
  {
    eyebrow: "LEVEL TWO · MEMORY LANE",
    title: "A little trip down memory lane",
    intro: "Unlock the next chapter by choosing the answer that feels right.",
    questions: [
      {
        question: "Which kind of memory deserves a place in our scrapbook?",
        options: ["The moments that make us smile", "Only blurry screenshots", "The boring ones only"],
        answer: 0,
        hint: "The gallery is full of moments worth keeping."
      },
      {
        question: "Which place we enjoyed together is the most memorable?",
        options: ["Movie theatre", "Bike rides", "Tasting new foods"],
        answer: 1,
        hint: "its a journey we always do."
      }
    ]
  },
  {
    eyebrow: "LEVEL THREE · ONE LAST SECRET",
    title: "Ready for your birthday surprise?",
    intro: "One last tiny challenge before the final gift opens.",
    questions: [
      {
        question: "What might be waiting behind the final unlock?",
        options: ["A dump of our photos", "A collection of birthday wishes", "A random gift"],
        answer: 1,
        hint: "Some of your favourite people have something to tell you."
      }
    ]
  }
];


const MEMORIES = Array.from({ length: 20 }, (_, index) => ({
  src: `/photos/memory-${index + 1}.jpg`,
  title: [
    "A favourite moment 💗",
    "Little things, big feelings",
    "One for the scrapbook ✨",
    "My favourite smile",
    "A memory to keep",
    "Just us",
    "The little adventures",
    "A moment worth saving",
    "You make me smile",
    "Our kind of happiness",
    "A day to remember",
    "My favourite person",
    "Little moments, forever",
    "A beautiful memory",
    "Happiness looks like this",
    "One more reason to smile",
    "Our little world",
    "A memory close to my heart",
    "Forever a favourite",
    "To many more memories ❤️"
  ][index],
  caption: "A little moment from our story, kept close to my heart."
}));


const VIDEO_PATH = "/videos/friends-wishes.mp4";
const MUSIC_PATH = "/music/birthday.mp3";
const LOVE_NOTE = `Happy Birthday, Sam. 💗

I wanted to make you something a little different — a tiny place full of smiles, memories, and love from the people who care about you.

I hope this new year of your life brings you peaceful days, exciting adventures, endless reasons to smile, and all the love you deserve.

You are the reason for today's little celebration. Now, get comfy and enjoy your surprise. Happy birthday! ✨`;

function FloatingHearts() {
  return (
    <div className="floating-hearts" aria-hidden="true">
      {Array.from({ length: 13 }, (_, i) => (
        <span key={i} style={{ "--i": i, "--left": `${(i * 17 + 5) % 100}%` }}>
          {i % 3 === 0 ? "✦" : "♡"}
        </span>
      ))}
    </div>
  );
}

function Progress({ level }) {
  return (
    <div className="progress-wrap" aria-label={`Level ${level} of 3`}>
      {[1, 2, 3].map((n) => (
        <div className={`progress-step ${n <= level ? "active" : ""}`} key={n}>
          <span>{n < level ? "✓" : n}</span>
          <small>{["The little things", "Memory lane", "The final secret"][n - 1]}</small>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("welcome");
  const [level, setLevel] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [hintVisible, setHintVisible] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [musicError, setMusicError] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [openPhoto, setOpenPhoto] = useState(null);
  const audioRef = useRef(null);

  const currentLevel = QUIZ_LEVELS[level];
  const currentQuestion = currentLevel?.questions[questionIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.24;
      if (!musicOn) audioRef.current.pause();
    }
  }, [musicOn]);

  async function toggleMusic() {
    if (!audioRef.current) return;
    if (musicOn) {
      audioRef.current.pause();
      setMusicOn(false);
      return;
    }
    try {
      await audioRef.current.play();
      setMusicOn(true);
      setMusicError(false);
    } catch {
      setMusicOn(false);
      setMusicError(true);
    }
  }

  function beginQuiz() {
    setScreen("quiz");
    setLevel(0);
    setQuestionIndex(0);
    setSelected(null);
    setFeedback("");
  }

  function checkAnswer() {
    if (selected === null || !currentQuestion) return;
    if (selected === currentQuestion.answer) {
      setFeedback("That's it! A little closer to your surprise. ✨");
    } else {
      setFeedback("Not quite, birthday girl. Try again — or ask for a hint. 💗");
    }
  }

  function nextQuestion() {
    if (questionIndex + 1 < currentLevel.questions.length) {
      setQuestionIndex((n) => n + 1);
      setSelected(null);
      setFeedback("");
      setHintVisible(false);
      return;
    }
    if (level + 1 < QUIZ_LEVELS.length) {
      setLevel((n) => n + 1);
      setQuestionIndex(0);
      setSelected(null);
      setFeedback("");
      setHintVisible(false);
    } else {
      setScreen("reveal");
    }
  }

  const answerCorrect = selected === currentQuestion?.answer;

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <FloatingHearts />
      <audio ref={audioRef} src={MUSIC_PATH} loop preload="none" onError={() => setMusicError(true)} />

      <header className="topbar">
        <a className="brand" href="#top" onClick={(e) => { e.preventDefault(); setScreen("welcome"); }}>
          <span className="brand-mark"><Heart size={15} fill="currentColor" /></span>
          <span>for sam, with love</span>
        </a>
        <button className="music-toggle" onClick={toggleMusic} aria-label={musicOn ? "Turn music off" : "Turn music on"}>
          {musicOn ? <Volume2 size={17} /> : <VolumeX size={17} />}
          <span>{musicOn ? "Music on" : "Music off"}</span>
        </button>
      </header>

      {musicError && (
        <div className="toast" role="status">
          <Music2 size={15} /> Add <code>public/music/birthday.mp3</code> to enable music.
          <button onClick={() => setMusicError(false)} aria-label="Dismiss">×</button>
        </div>
      )}

      {screen === "welcome" && (
        <section className="hero page-enter" id="top">
          <div className="hero-kicker"><Sparkles size={14} /> A little universe made just for you</div>
          <div className="hero-art">
            <div className="orbit orbit-a" />
            <div className="orbit orbit-b" />
            <div className="moon">S<span>♡</span></div>
            <div className="tiny-star star-a">✦</div>
            <div className="tiny-star star-b">✧</div>
            <div className="tiny-star star-c">✦</div>
          </div>
          <p className="overline">SUNDAY · OCTOBER 18, 2026</p>
          <h1>Hey, <em>Sam.</em><br />This is all for you.</h1>
          <p className="hero-copy">A few little questions. A walk through some memories.<br className="desktop-only" /> And a surprise waiting at the end. Ready, birthday girl?</p>
          <button className="primary-button" onClick={beginQuiz}>
            Begin your surprise <ArrowRight size={17} />
          </button>
          <div className="hero-foot"><span /> made with a whole lot of love <Heart size={12} fill="currentColor" /></div>
        </section>
      )}

      {screen === "quiz" && currentQuestion && (
        <section className="quiz-page page-enter">
          <div className="section-icon"><LockKeyhole size={21} /></div>
          <Progress level={level + 1} />
          <p className="overline">{currentLevel.eyebrow}</p>
          <h2>{currentLevel.title}</h2>
          <p className="section-copy">{currentLevel.intro}</p>
          <div className="quiz-card">
            <div className="question-count">QUESTION {questionIndex + 1} OF {currentLevel.questions.length}</div>
            <h3>{currentQuestion.question}</h3>
            <div className="answers">
              {currentQuestion.options.map((option, index) => (
                <button
                  className={`answer-option ${selected === index ? "chosen" : ""} ${feedback && selected === index && answerCorrect ? "correct" : ""}`}
                  key={option}
                  onClick={() => { setSelected(index); setFeedback(""); }}
                >
                  <span className="answer-letter">{String.fromCharCode(65 + index)}</span>
                  <span>{option}</span>
                  {selected === index && answerCorrect && feedback ? <CheckCircle2 size={17} /> : null}
                </button>
              ))}
            </div>
            {feedback && <p className={`feedback ${answerCorrect ? "good" : ""}`} role="status">{feedback}</p>}
            {hintVisible && <p className="hint"><Sparkles size={14} /> {currentQuestion.hint}</p>}
            <div className="quiz-actions">
              <button className="text-button" onClick={() => setHintVisible((v) => !v)}>
                {hintVisible ? "Hide hint" : "Need a hint?"}
              </button>
              {feedback && answerCorrect ? (
                <button className="primary-button compact" onClick={nextQuestion}>
                  {questionIndex + 1 === currentLevel.questions.length && level === QUIZ_LEVELS.length - 1 ? "Unlock surprise" : "Continue"} <ArrowRight size={16} />
                </button>
              ) : (
                <button className="primary-button compact" onClick={checkAnswer} disabled={selected === null}>
                  Check answer <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>
          <button className="restart-link" onClick={() => setScreen("welcome")}><RotateCcw size={13} /> Start over</button>
        </section>
      )}

      {screen === "reveal" && (
        <section className="reveal-page page-enter" aria-labelledby="reveal-title">
          <div className="reveal-stars" aria-hidden="true">
            {Array.from({ length: 22 }, (_, i) => <span key={i} style={{ "--i": i }}>{i % 3 === 0 ? "✦" : "♡"}</span>)}
          </div>
          <p className="overline reveal-overline">JUST FOR YOU · SAM</p>
          <div className="gift-scene" aria-hidden="true">
            <div className="gift-glow" />
            <div className="gift-ribbon ribbon-vertical" />
            <div className="gift-ribbon ribbon-horizontal" />
            <div className="gift-box"><Heart size={34} fill="currentColor" /></div>
            <div className="gift-lid"><span /></div>
            <div className="gift-bow bow-left" /><div className="gift-bow bow-right" />
          </div>
          <p className="reveal-whisper">A little something made with love</p>
          <h2 id="reveal-title">Every little step<br />led you <em>here.</em></h2>
          <p className="section-copy">Take a deep breath, birthday girl. Your memories and a message from your favourite people are waiting just beyond this moment.</p>
          <button className="primary-button reveal-button" onClick={() => setScreen("unlocked")}>
            Open your final gift <Heart size={16} fill="currentColor" />
          </button>
          <div className="reveal-bottom-note"><Sparkles size={13} /> MADE ESPECIALLY FOR SAM <Sparkles size={13} /></div>
        </section>
      )}

      {screen === "unlocked" && (
        <section className="unlocked-page page-enter">
          <div className="celebration-icon"><Gift size={34} /></div>
          <p className="overline">ALL THREE LEVELS COMPLETE</p>
          <h2>You did it,<br /><em>birthday girl.</em></h2>
          <p className="section-copy">Your little surprise is ready. Take a breath, turn the sound on if you like, and open your birthday gifts.</p>
          <div className="unlock-grid">
            <button className="unlock-card" onClick={() => setScreen("gallery")}>
              <span className="unlock-icon"><ImageIcon size={23} /></span>
              <span className="unlock-title">Memory lane</span>
              <span className="unlock-copy">A few moments to keep</span>
              <span className="unlock-cta">Open gallery <ArrowRight size={14} /></span>
            </button>
            <button className="unlock-card featured" onClick={() => setScreen("video")}>
              <span className="unlock-icon"><Play size={23} fill="currentColor" /></span>
              <span className="unlock-title">A message for you</span>
              <span className="unlock-copy">Your friends have something to say</span>
              <span className="unlock-cta">Open final gift <ArrowRight size={14} /></span>
            </button>
          </div>
          <button className="text-button back-link" onClick={() => setScreen("welcome")}>Back to the beginning</button>
        </section>
      )}

      {screen === "gallery" && (
        <section className="content-page page-enter">
          <button className="back-button" onClick={() => setScreen("unlocked")}>← All your surprises</button>
          <p className="overline">CHAPTER ONE · THE SCRAPBOOK</p>
          <h2>Little moments,<br /><em>kept forever.</em></h2>
          <p className="section-copy">Replace these starter images with your own favourite photos and add your own captions.</p>
          <div className="memory-grid">
            {MEMORIES.map((memory, index) => (
              <button className={`memory-card memory-${index + 1}`} key={memory.src} onClick={() => setOpenPhoto(memory)}>
                <img src={memory.src} alt={memory.title} onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.parentElement.classList.add("image-missing"); }} />
                <span className="photo-placeholder"><ImageIcon size={25} /><small>Add your photo</small></span>
                <span className="memory-caption"><strong>{memory.title}</strong><small>{memory.caption}</small></span>
              </button>
            ))}
          </div>
          <button className="primary-button gallery-next" onClick={() => setScreen("video")}>Next: your birthday wishes <ArrowRight size={16} /></button>
        </section>
      )}

      {screen === "video" && (
        <section className="content-page video-page page-enter">
          <button className="back-button" onClick={() => setScreen("unlocked")}>← All your surprises</button>
          <div className="video-sparkle"><Gift size={27} /></div>
          <p className="overline">THE FINAL GIFT · MADE WITH LOVE</p>
          <h2>A little love<br />from <em>your people.</em></h2>
          <p className="section-copy">They all wanted to make you smile today. This one's for you, Sam. 💗</p>
          <div className="video-frame">
            {!videoError ? (
              <video controls playsInline preload="metadata" poster="/photos/video-poster.jpg" onError={() => setVideoError(true)}>
                <source src={VIDEO_PATH} type="video/mp4" />
                Your browser does not support this video.
              </video>
            ) : (
              <div className="video-placeholder">
                <Play size={34} />
                <h3>Your friends' wishes go here</h3>
                <p>Add your combined video at <code>public/videos/friends-wishes.mp4</code>.</p>
              </div>
            )}
          </div>
          <div className="love-note">
            <span className="note-heart"><Heart size={16} fill="currentColor" /></span>
            {LOVE_NOTE.split("\n\n").map((paragraph, i) => <p key={i}>{paragraph}</p>)}
            <span className="note-signoff">Always cheering for you <span>♡</span></span>
          </div>
          <button className="text-button back-link" onClick={() => setScreen("gallery")}>Revisit the memories</button>
        </section>
      )}

      {openPhoto && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={openPhoto.title} onClick={() => setOpenPhoto(null)}>
          <button className="lightbox-close" onClick={() => setOpenPhoto(null)} aria-label="Close photo">×</button>
          <img src={openPhoto.src} alt={openPhoto.title} onClick={(e) => e.stopPropagation()} />
          <div className="lightbox-caption"><strong>{openPhoto.title}</strong><p>{openPhoto.caption}</p></div>
        </div>
      )}

      <footer className="footer">
        <span>FOR SAM, WITH LOVE</span>
        <span className="footer-heart">♥</span>
        <span>OCTOBER 18, 2026</span>
      </footer>
    </main>
  );
}
