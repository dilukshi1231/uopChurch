'use client';
import { useState, useEffect } from 'react';
import { FaBible } from 'react-icons/fa';

export default function BibleVerseBanner() {
  const [currentVerse, setCurrentVerse] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const verses = [
    // SALVATION & ETERNAL LIFE
    {
      text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
      reference: "John 3:16"
    },
    {
      text: "If you declare with your mouth, 'Jesus is Lord,' and believe in your heart that God raised him from the dead, you will be saved.",
      reference: "Romans 10:9"
    },
    {
      text: "To all who did receive him, to those who believed in his name, he gave the right to become children of God.",
      reference: "John 1:12"
    },
    {
      text: "He who believes in the Son has eternal life.",
      reference: "John 3:36"
    },
    {
      text: "My sheep listen to my voice; I know them, and they follow me. I give them eternal life, and they shall never perish.",
      reference: "John 10:27-28"
    },
    {
      text: "For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord.",
      reference: "Romans 6:23"
    },
    {
      text: "Everyone who calls on the name of the Lord will be saved.",
      reference: "Romans 10:13"
    },
    {
      text: "If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness.",
      reference: "1 John 1:9"
    },
    {
      text: "There is now no condemnation for those who are in Christ Jesus.",
      reference: "Romans 8:1"
    },
    {
      text: "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!",
      reference: "2 Corinthians 5:17"
    },

    // GOD'S LOVE & CARE
    {
      text: "For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future.",
      reference: "Jeremiah 29:11"
    },
    {
      text: "The LORD himself goes before you and will be with you; he will never leave you nor forsake you.",
      reference: "Deuteronomy 31:8"
    },
    {
      text: "Cast all your anxiety on him because he cares for you.",
      reference: "1 Peter 5:7"
    },
    {
      text: "Can a mother forget the baby at her breast? Though she may forget, I will not forget you!",
      reference: "Isaiah 49:15"
    },
    {
      text: "The LORD is close to the brokenhearted and saves those who are crushed in spirit.",
      reference: "Psalm 34:18"
    },
    {
      text: "I have loved you with an everlasting love; I have drawn you with unfailing kindness.",
      reference: "Jeremiah 31:3"
    },
    {
      text: "He heals the brokenhearted and binds up their wounds.",
      reference: "Psalm 147:3"
    },
    {
      text: "As a father has compassion on his children, so the LORD has compassion on those who fear him.",
      reference: "Psalm 103:13"
    },
    {
      text: "The LORD your God is with you, the Mighty Warrior who saves. He will take great delight in you; in his love he will no longer rebuke you, but will rejoice over you with singing.",
      reference: "Zephaniah 3:17"
    },
    {
      text: "See what great love the Father has lavished on us, that we should be called children of God!",
      reference: "1 John 3:1"
    },

    // PEACE & COMFORT
    {
      text: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.",
      reference: "John 14:27"
    },
    {
      text: "Come to me, all you who are weary and burdened, and I will give you rest.",
      reference: "Matthew 11:28"
    },
    {
      text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
      reference: "Philippians 4:6-7"
    },
    {
      text: "The LORD gives strength to his people; the LORD blesses his people with peace.",
      reference: "Psalm 29:11"
    },
    {
      text: "You will keep in perfect peace those whose minds are steadfast, because they trust in you.",
      reference: "Isaiah 26:3"
    },
    {
      text: "Cast your cares on the LORD and he will sustain you; he will never let the righteous be shaken.",
      reference: "Psalm 55:22"
    },
    {
      text: "I have told you these things, so that in me you may have peace. In this world you will have trouble. But take heart! I have overcome the world.",
      reference: "John 16:33"
    },
    {
      text: "The God of peace will soon crush Satan under your feet. The grace of our Lord Jesus be with you.",
      reference: "Romans 16:20"
    },
    {
      text: "Now may the Lord of peace himself give you peace at all times and in every way. The Lord be with all of you.",
      reference: "2 Thessalonians 3:16"
    },
    {
      text: "Great peace have those who love your law, and nothing can make them stumble.",
      reference: "Psalm 119:165"
    },

    // STRENGTH & COURAGE
    {
      text: "I can do all things through Christ who strengthens me.",
      reference: "Philippians 4:13"
    },
    {
      text: "Be strong and courageous. Do not be afraid or terrified because of them, for the LORD your God goes with you; he will never leave you nor forsake you.",
      reference: "Deuteronomy 31:6"
    },
    {
      text: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.",
      reference: "Isaiah 41:10"
    },
    {
      text: "The LORD is my strength and my shield; my heart trusts in him, and he helps me.",
      reference: "Psalm 28:7"
    },
    {
      text: "But those who hope in the LORD will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
      reference: "Isaiah 40:31"
    },
    {
      text: "He gives strength to the weary and increases the power of the weak.",
      reference: "Isaiah 40:29"
    },
    {
      text: "The LORD is my strength and my defense; he has become my salvation.",
      reference: "Exodus 15:2"
    },
    {
      text: "God is our refuge and strength, an ever-present help in trouble.",
      reference: "Psalm 46:1"
    },
    {
      text: "Finally, be strong in the Lord and in his mighty power.",
      reference: "Ephesians 6:10"
    },
    {
      text: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.",
      reference: "Joshua 1:9"
    },

    // GUIDANCE & WISDOM
    {
      text: "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
      reference: "Proverbs 3:5-6"
    },
    {
      text: "Your word is a lamp for my feet, a light on my path.",
      reference: "Psalm 119:105"
    },
    {
      text: "I will instruct you and teach you in the way you should go; I will counsel you with my loving eye on you.",
      reference: "Psalm 32:8"
    },
    {
      text: "If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you.",
      reference: "James 1:5"
    },
    {
      text: "The LORD makes firm the steps of the one who delights in him.",
      reference: "Psalm 37:23"
    },
    {
      text: "Whether you turn to the right or to the left, your ears will hear a voice behind you, saying, 'This is the way; walk in it.'",
      reference: "Isaiah 30:21"
    },
    {
      text: "The fear of the LORD is the beginning of wisdom, and knowledge of the Holy One is understanding.",
      reference: "Proverbs 9:10"
    },
    {
      text: "Commit to the LORD whatever you do, and he will establish your plans.",
      reference: "Proverbs 16:3"
    },
    {
      text: "In their hearts humans plan their course, but the LORD establishes their steps.",
      reference: "Proverbs 16:9"
    },
    {
      text: "He guides the humble in what is right and teaches them his way.",
      reference: "Psalm 25:9"
    },

    // PROTECTION & SAFETY
    {
      text: "The LORD is my shepherd, I lack nothing.",
      reference: "Psalm 23:1"
    },
    {
      text: "He will cover you with his feathers, and under his wings you will find refuge; his faithfulness will be your shield and rampart.",
      reference: "Psalm 91:4"
    },
    {
      text: "No weapon forged against you will prevail, and you will refute every tongue that accuses you.",
      reference: "Isaiah 54:17"
    },
    {
      text: "The angel of the LORD encamps around those who fear him, and he delivers them.",
      reference: "Psalm 34:7"
    },
    {
      text: "But the Lord is faithful, and he will strengthen you and protect you from the evil one.",
      reference: "2 Thessalonians 3:3"
    },
    {
      text: "You are my hiding place; you will protect me from trouble and surround me with songs of deliverance.",
      reference: "Psalm 32:7"
    },
    {
      text: "The LORD will keep you from all harm—he will watch over your life.",
      reference: "Psalm 121:7"
    },
    {
      text: "When you pass through the waters, I will be with you; and when you pass through the rivers, they will not sweep over you.",
      reference: "Isaiah 43:2"
    },
    {
      text: "The name of the LORD is a fortified tower; the righteous run to it and are safe.",
      reference: "Proverbs 18:10"
    },
    {
      text: "The LORD is good, a refuge in times of trouble. He cares for those who trust in him.",
      reference: "Nahum 1:7"
    },

    // PROVISION & BLESSINGS
    {
      text: "And my God will meet all your needs according to the riches of his glory in Christ Jesus.",
      reference: "Philippians 4:19"
    },
    {
      text: "Take delight in the LORD, and he will give you the desires of your heart.",
      reference: "Psalm 37:4"
    },
    {
      text: "The LORD will open the heavens, the storehouse of his bounty, to send rain on your land in season and to bless all the work of your hands.",
      reference: "Deuteronomy 28:12"
    },
    {
      text: "Give, and it will be given to you. A good measure, pressed down, shaken together and running over, will be poured into your lap.",
      reference: "Luke 6:38"
    },
    {
      text: "And God is able to bless you abundantly, so that in all things at all times, having all that you need, you will abound in every good work.",
      reference: "2 Corinthians 9:8"
    },
    {
      text: "The blessing of the LORD brings wealth, without painful toil for it.",
      reference: "Proverbs 10:22"
    },
    {
      text: "The LORD will grant you abundant prosperity—in the fruit of your womb, the young of your livestock and the crops of your ground.",
      reference: "Deuteronomy 28:11"
    },
    {
      text: "Honor the LORD with your wealth, with the firstfruits of all your crops; then your barns will be filled to overflowing.",
      reference: "Proverbs 3:9-10"
    },
    {
      text: "Whoever sows generously will also reap generously.",
      reference: "2 Corinthians 9:6"
    },
    {
      text: "Bring the whole tithe into the storehouse, that there may be food in my house. Test me in this, says the LORD Almighty, and see if I will not throw open the floodgates of heaven and pour out so much blessing that there will not be room enough to store it.",
      reference: "Malachi 3:10"
    },

    // HEALING & HEALTH
    {
      text: "He himself bore our sins in his body on the cross, so that we might die to sins and live for righteousness; by his wounds you have been healed.",
      reference: "1 Peter 2:24"
    },
    {
      text: "Praise the LORD, my soul, and forget not all his benefits—who forgives all your sins and heals all your diseases.",
      reference: "Psalm 103:2-3"
    },
    {
      text: "But he was pierced for our transgressions, he was crushed for our iniquities; the punishment that brought us peace was on him, and by his wounds we are healed.",
      reference: "Isaiah 53:5"
    },
    {
      text: "Is anyone among you sick? Let them call the elders of the church to pray over them and anoint them with oil in the name of the Lord.",
      reference: "James 5:14"
    },
    {
      text: "He sent out his word and healed them; he rescued them from the grave.",
      reference: "Psalm 107:20"
    },
    {
      text: "Dear friend, I pray that you may enjoy good health and that all may go well with you, even as your soul is getting along well.",
      reference: "3 John 1:2"
    },
    {
      text: "The LORD will sustain him on his sickbed and restore him from his bed of illness.",
      reference: "Psalm 41:3"
    },
    {
      text: "I will give you back your health and heal your wounds, says the LORD.",
      reference: "Jeremiah 30:17"
    },
    {
      text: "Heal me, LORD, and I will be healed; save me and I will be saved, for you are the one I praise.",
      reference: "Jeremiah 17:14"
    },
    {
      text: "Jesus went throughout Galilee, teaching in their synagogues, proclaiming the good news of the kingdom, and healing every disease and sickness among the people.",
      reference: "Matthew 4:23"
    },

    // FAITH & TRUST
    {
      text: "Now faith is confidence in what we hope for and assurance about what we do not see.",
      reference: "Hebrews 11:1"
    },
    {
      text: "And without faith it is impossible to please God, because anyone who comes to him must believe that he exists and that he rewards those who earnestly seek him.",
      reference: "Hebrews 11:6"
    },
    {
      text: "For we live by faith, not by sight.",
      reference: "2 Corinthians 5:7"
    },
    {
      text: "Jesus replied, 'Truly I tell you, if you have faith and do not doubt, not only can you do what was done to the fig tree, but also you can say to this mountain, Go, throw yourself into the sea, and it will be done.'",
      reference: "Matthew 21:21"
    },
    {
      text: "Whoever believes in me, as Scripture has said, rivers of living water will flow from within them.",
      reference: "John 7:38"
    },
    {
      text: "If you have faith as small as a mustard seed, you can say to this mountain, 'Move from here to there,' and it will move.",
      reference: "Matthew 17:20"
    },
    {
      text: "The righteous will live by faith.",
      reference: "Romans 1:17"
    },
    {
      text: "Let us hold unswervingly to the hope we profess, for he who promised is faithful.",
      reference: "Hebrews 10:23"
    },
    {
      text: "Consequently, faith comes from hearing the message, and the message is heard through the word about Christ.",
      reference: "Romans 10:17"
    },
    {
      text: "I have been crucified with Christ and I no longer live, but Christ lives in me. The life I now live in the body, I live by faith in the Son of God.",
      reference: "Galatians 2:20"
    },

    // HOPE & ENCOURAGEMENT
    {
      text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
      reference: "Romans 8:28"
    },
    {
      text: "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.",
      reference: "Romans 15:13"
    },
    {
      text: "For our light and momentary troubles are achieving for us an eternal glory that far outweighs them all.",
      reference: "2 Corinthians 4:17"
    },
    {
      text: "The righteous cry out, and the LORD hears them; he delivers them from all their troubles.",
      reference: "Psalm 34:17"
    },
    {
      text: "For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers, neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord.",
      reference: "Romans 8:38-39"
    },
    {
      text: "Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up.",
      reference: "Galatians 6:9"
    },
    {
      text: "Being confident of this, that he who began a good work in you will carry it on to completion until the day of Christ Jesus.",
      reference: "Philippians 1:6"
    },
    {
      text: "No eye has seen, no ear has heard, and no mind has imagined what God has prepared for those who love him.",
      reference: "1 Corinthians 2:9"
    },
    {
      text: "He will wipe every tear from their eyes. There will be no more death or mourning or crying or pain, for the old order of things has passed away.",
      reference: "Revelation 21:4"
    },
    {
      text: "The LORD is good to those whose hope is in him, to the one who seeks him.",
      reference: "Lamentations 3:25"
    },

    // PRAYER & COMMUNION WITH GOD
    {
      text: "Ask and it will be given to you; seek and you will find; knock and the door will be opened to you.",
      reference: "Matthew 7:7"
    },
    {
      text: "If you remain in me and my words remain in you, ask whatever you wish, and it will be done for you.",
      reference: "John 15:7"
    },
    {
      text: "This is the confidence we have in approaching God: that if we ask anything according to his will, he hears us.",
      reference: "1 John 5:14"
    },
    {
      text: "The prayer of a righteous person is powerful and effective.",
      reference: "James 5:16"
    },
    {
      text: "Devote yourselves to prayer, being watchful and thankful.",
      reference: "Colossians 4:2"
    },
    {
      text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.",
      reference: "Philippians 4:6"
    },
    {
      text: "Then you will call on me and come and pray to me, and I will listen to you.",
      reference: "Jeremiah 29:12"
    },
    {
      text: "Call to me and I will answer you and tell you great and unsearchable things you do not know.",
      reference: "Jeremiah 33:3"
    },
    {
      text: "Very early in the morning, while it was still dark, Jesus got up, left the house and went off to a solitary place, where he prayed.",
      reference: "Mark 1:35"
    },
    {
      text: "But when you pray, go into your room, close the door and pray to your Father, who is unseen.",
      reference: "Matthew 6:6"
    },

    // VICTORY OVER EVIL
    {
      text: "But thanks be to God! He gives us the victory through our Lord Jesus Christ.",
      reference: "1 Corinthians 15:57"
    },
    {
      text: "You, dear children, are from God and have overcome them, because the one who is in you is greater than the one who is in the world.",
      reference: "1 John 4:4"
    },
    {
      text: "No temptation has overtaken you except what is common to mankind. And God is faithful; he will not let you be tempted beyond what you can bear.",
      reference: "1 Corinthians 10:13"
    },
    {
      text: "Submit yourselves, then, to God. Resist the devil, and he will flee from you.",
      reference: "James 4:7"
    },
    {
      text: "The God of peace will soon crush Satan under your feet.",
      reference: "Romans 16:20"
    },
    {
      text: "I have given you authority to trample on snakes and scorpions and to overcome all the power of the enemy; nothing will harm you.",
      reference: "Luke 10:19"
    },
    {
      text: "Put on the full armor of God, so that you can take your stand against the devil's schemes.",
      reference: "Ephesians 6:11"
    },
    {
      text: "They triumphed over him by the blood of the Lamb and by the word of their testimony.",
      reference: "Revelation 12:11"
    },
    {
      text: "Be alert and of sober mind. Your enemy the devil prowls around like a roaring lion looking for someone to devour.",
      reference: "1 Peter 5:8"
    },
    {
      text: "The one who is in you is greater than the one who is in the world.",
      reference: "1 John 4:4"
    },

    // FRUIT OF THE SPIRIT
    {
      text: "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control.",
      reference: "Galatians 5:22-23"
    },
    {
      text: "Remain in me, as I also remain in you. No branch can bear fruit by itself; it must remain in the vine.",
      reference: "John 15:4"
    },
    {
      text: "This is to my Father's glory, that you bear much fruit, showing yourselves to be my disciples.",
      reference: "John 15:8"
    },
    {
      text: "I am the vine; you are the branches. If you remain in me and I in you, you will bear much fruit.",
      reference: "John 15:5"
    },
    {
      text: "But the wisdom that comes from heaven is first of all pure; then peace-loving, considerate, submissive, full of mercy and good fruit, impartial and sincere.",
      reference: "James 3:17"
    },
    {
      text: "Let love and faithfulness never leave you; bind them around your neck, write them on the tablet of your heart.",
      reference: "Proverbs 3:3"
    },
    {
      text: "A new command I give you: Love one another. As I have loved you, so you must love one another.",
      reference: "John 13:34"
    },
    {
      text: "Rejoice in the Lord always. I will say it again: Rejoice!",
      reference: "Philippians 4:4"
    },
    {
      text: "Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.",
      reference: "Ephesians 4:32"
    },
    {
      text: "Clothe yourselves with compassion, kindness, humility, gentleness and patience.",
      reference: "Colossians 3:12"
    },

    // END TIMES & ETERNAL REWARDS
    {
      text: "Look, I am coming soon! My reward is with me, and I will give to each person according to what they have done.",
      reference: "Revelation 22:12"
    },
    {
      text: "In my Father's house are many rooms; if it were not so, I would have told you. I am going there to prepare a place for you.",
      reference: "John 14:2"
    },
    {
      text: "For the Lord himself will come down from heaven, with a loud command, with the voice of the archangel and with the trumpet call of God.",
      reference: "1 Thessalonians 4:16"
    },
    {
      text: "He will wipe every tear from their eyes. There will be no more death or mourning or crying or pain.",
      reference: "Revelation 21:4"
    },
    {
      text: "Therefore you also must be ready, for the Son of Man is coming at an hour you do not expect.",
      reference: "Matthew 24:44"
    },
    {
      text: "For our citizenship is in heaven, from which also we eagerly wait for a Savior, the Lord Jesus Christ.",
      reference: "Philippians 3:20"
    },
    {
      text: "So we fix our eyes not on what is seen, but on what is unseen, since what is seen is temporary, but what is unseen is eternal.",
      reference: "2 Corinthians 4:18"
    },
    {
      text: "Behold, I am coming soon! Blessed is the one who keeps the words of the prophecy in this book.",
      reference: "Revelation 22:7"
    },
    {
      text: "But the day of the Lord will come like a thief. The heavens will disappear with a roar; the elements will be destroyed by fire, and the earth and everything done in it will be laid bare.",
      reference: "2 Peter 3:10"
    },
    {
      text: "For we must all appear before the judgment seat of Christ, so that each of us may receive what is due us for the things done while in the body, whether good or bad.",
      reference: "2 Corinthians 5:10"
    }
  ];

  useEffect(() => {
    // Change verse every 10 seconds
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentVerse((prev) => (prev + 1) % verses.length);
        setIsVisible(true);
      }, 500); // Wait for fade out before changing
      
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [verses.length]);

  return (
    <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-2 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className={`flex items-center justify-center gap-3 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <FaBible className="text-amber-400 flex-shrink-0 hidden sm:block" />
          <div className="text-center">
            <span className="text-sm md:text-base italic">
              "{verses[currentVerse].text}"
            </span>
            <span className="ml-2 font-semibold text-blue-200 text-xs md:text-sm">
              - {verses[currentVerse].reference}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}