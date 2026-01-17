'use client';
import { useState, useEffect } from 'react';
import { FaBible, FaSync } from 'react-icons/fa';

export default function BibleVerse() {
  const [verse, setVerse] = useState(null);
  const [loading, setLoading] = useState(false);

  const verses = [
    {
      text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
      reference: "John 3:16",
      category: "salvation"
    },
    {
      text: "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
      reference: "Proverbs 3:5-6",
      category: "trust"
    },
    {
      text: "I can do all this through him who gives me strength.",
      reference: "Philippians 4:13",
      category: "strength"
    },
    {
      text: "The LORD is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul.",
      reference: "Psalm 23:1-3",
      category: "comfort"
    },
    {
      text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
      reference: "Romans 8:28",
      category: "hope"
    },
    {
      text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.",
      reference: "Philippians 4:6",
      category: "peace"
    },
    {
      text: "But those who hope in the LORD will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
      reference: "Isaiah 40:31",
      category: "strength"
    },
    {
      text: "The LORD himself goes before you and will be with you; he will never leave you nor forsake you. Do not be afraid; do not be discouraged.",
      reference: "Deuteronomy 31:8",
      category: "comfort"
    },
    {
      text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.",
      reference: "Joshua 1:9",
      category: "courage"
    },
    {
      text: "Jesus Christ is the same yesterday and today and forever.",
      reference: "Hebrews 13:8",
      category: "faith"
    },
    {
      text: "Come to me, all you who are weary and burdened, and I will give you rest.",
      reference: "Matthew 11:28",
      category: "rest"
    },
    {
      text: "The LORD bless you and keep you; the LORD make his face shine on you and be gracious to you; the LORD turn his face toward you and give you peace.",
      reference: "Numbers 6:24-26",
      category: "blessing"
    },
    {
      text: "For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future.",
      reference: "Jeremiah 29:11",
      category: "hope"
    },
    {
      text: "Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.",
      reference: "Ephesians 4:32",
      category: "love"
    },
    {
      text: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud.",
      reference: "1 Corinthians 13:4",
      category: "love"
    },
    {
      text: "The Lord is close to the brokenhearted and saves those who are crushed in spirit.",
      reference: "Psalm 34:18",
      category: "comfort"
    },
    {
      text: "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!",
      reference: "2 Corinthians 5:17",
      category: "salvation"
    },
    {
      text: "For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God.",
      reference: "Ephesians 2:8",
      category: "salvation"
    },
    {
      text: "Rejoice in the Lord always. I will say it again: Rejoice!",
      reference: "Philippians 4:4",
      category: "joy"
    },
    {
      text: "Cast all your anxiety on him because he cares for you.",
      reference: "1 Peter 5:7",
      category: "peace"
    },
    {
      text: "The name of the LORD is a fortified tower; the righteous run to it and are safe.",
      reference: "Proverbs 18:10",
      category: "protection"
    },
    {
      text: "He heals the brokenhearted and binds up their wounds.",
      reference: "Psalm 147:3",
      category: "healing"
    },
    {
      text: "But seek first his kingdom and his righteousness, and all these things will be given to you as well.",
      reference: "Matthew 6:33",
      category: "faith"
    },
    {
      text: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.",
      reference: "Joshua 1:9",
      category: "courage"
    },
    {
      text: "For where two or three gather in my name, there am I with them.",
      reference: "Matthew 18:20",
      category: "community"
    }
  ];

  const getRandomVerse = () => {
    const randomIndex = Math.floor(Math.random() * verses.length);
    return verses[randomIndex];
  };

  const refreshVerse = () => {
    setLoading(true);
    setTimeout(() => {
      setVerse(getRandomVerse());
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    setVerse(getRandomVerse());

    // Change verse every 30 seconds
    const interval = setInterval(() => {
      setVerse(getRandomVerse());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  if (!verse) return null;

  return (
    <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaBible className="text-3xl text-blue-300" />
            <h3 className="text-xl font-semibold text-blue-200">Verse of the Moment</h3>
          </div>

          <div className={`transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
            <blockquote className="text-2xl md:text-3xl font-serif italic mb-4 leading-relaxed">
              "{verse.text}"
            </blockquote>
            <p className="text-lg text-blue-200 font-semibold mb-6">
              - {verse.reference}
            </p>
          </div>

          <button
            onClick={refreshVerse}
            disabled={loading}
            className="inline-flex items-center gap-2 bg-white text-blue-900 px-6 py-2 rounded-full font-medium hover:bg-blue-50 transition-colors disabled:opacity-50"
          >
            <FaSync className={loading ? 'animate-spin' : ''} />
            New Verse
          </button>
        </div>
      </div>
    </div>
  );
}