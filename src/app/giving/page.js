// src/app/giving/page.js
'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  FaHeart,
  FaHandHoldingHeart,
  FaCreditCard,
  FaMobileAlt,
  FaUniversity,
  FaCheckCircle,
  FaChurch,
  FaGlobeAmericas,
  FaHome,
  FaUsers,
  FaLock,
  FaShieldAlt,
  FaQuestionCircle,
} from 'react-icons/fa';

export default function GivingPage() {
  const [selectedFund, setSelectedFund] = useState('general');
  const [selectedAmount, setSelectedAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [frequency, setFrequency] = useState('one-time');
  const [faqOpen, setFaqOpen] = useState(null);

  const funds = [
    {
      id: 'general',
      title: 'General Fund',
      description: 'Supports all church operations, ministries, and outreach programs',
      icon: <FaChurch />,
      color: 'from-red-800 to-orange-700',
    },
    {
      id: 'missions',
      title: 'Missions',
      description: 'Supports local and global mission work',
      icon: <FaGlobeAmericas />,
      color: 'from-orange-600 to-amber-600',
    },
    {
      id: 'building',
      title: 'Building Fund',
      description: 'Helps maintain and improve our facilities',
      icon: <FaHome />,
      color: 'from-amber-600 to-amber-700',
    },
    {
      id: 'benevolence',
      title: 'Benevolence',
      description: 'Helps those in our community facing financial hardship',
      icon: <FaHeart />,
      color: 'from-red-700 to-red-900',
    },
  ];

  const presetAmounts = ['10', '25', '50', '100', '250', '500'];

  const impactItems = [
    { amount: '$25', impact: 'Provides meals for 10 families at our weekly food pantry' },
    { amount: '$50', impact: 'Sponsors a child\'s attendance at summer youth camp' },
    { amount: '$100', impact: 'Covers one month of outreach supplies for campus ministry' },
    { amount: '$250', impact: 'Funds a missionary for one week of international service' },
    { amount: '$500', impact: 'Equips a small group with Bible study materials for a year' },
  ];

  const givingMethods = [
    {
      icon: <FaCreditCard />,
      title: 'Online Giving',
      description: 'Give securely online using your debit or credit card through our encrypted portal.',
      action: 'Give Online Now',
      color: 'from-red-800 to-orange-700',
      bg: 'from-red-50 to-orange-50',
      border: 'border-red-200',
    },
    {
      icon: <FaMobileAlt />,
      title: 'Text to Give',
      description: 'Text the amount you\'d like to give to (555) 123-GIVE and follow the simple prompts.',
      action: 'Text GIVE to 55512',
      color: 'from-orange-600 to-amber-600',
      bg: 'from-orange-50 to-amber-50',
      border: 'border-orange-200',
    },
    {
      icon: <FaUniversity />,
      title: 'Bank Transfer (ACH)',
      description: 'Set up a recurring gift directly from your bank account — no fees, maximum impact.',
      action: 'Set Up Transfer',
      color: 'from-amber-600 to-amber-700',
      bg: 'from-amber-50 to-yellow-50',
      border: 'border-amber-200',
    },
    {
      icon: <FaUsers />,
      title: 'Give In Person',
      description: 'Drop your offering in the giving boxes at the back of the sanctuary during any service.',
      action: 'Find Service Times',
      color: 'from-red-700 to-red-900',
      bg: 'from-red-50 to-orange-50',
      border: 'border-red-200',
    },
  ];

  const faqs = [
    {
      question: 'Is my online giving secure?',
      answer: 'Yes. All online transactions are processed through industry-standard SSL encryption. We never store your full card details on our servers.',
    },
    {
      question: 'Can I give tax-deductibly?',
      answer: 'Absolutely. The Church of Christ the Risen Lord is a registered 501(c)(3) nonprofit. All gifts are tax-deductible to the fullest extent of the law. You\'ll receive an annual giving statement every January.',
    },
    {
      question: 'Can I set up recurring giving?',
      answer: 'Yes! You can schedule weekly, bi-weekly, or monthly gifts when you give online. Recurring giving helps us plan ministry more effectively and is a great way to practice faithful stewardship.',
    },
    {
      question: 'What if I need to cancel or change my recurring gift?',
      answer: 'You can update or cancel any recurring gift at any time by logging into your giving account or emailing us at giving@churchoftherisen.org.',
    },
    {
      question: 'How is my money used?',
      answer: 'We are committed to transparency. The majority of all giving goes directly to ministry, missions, and community outreach. An annual financial report is available to all members upon request.',
    },
    {
      question: 'Do you accept non-cash gifts like stocks or property?',
      answer: 'Yes! We gladly accept non-cash gifts including stocks, real estate, and in-kind donations. Please contact our office directly to discuss the best way to make a non-cash gift.',
    },
  ];

  const handleGive = () => {
    const amount = customAmount || selectedAmount;
    if (!amount) {
      alert('Please select or enter a giving amount.');
      return;
    }
    alert(`Thank you for your generous gift of $${amount} to the ${funds.find(f => f.id === selectedFund)?.title}! You will be redirected to our secure payment portal.`);
  };

  return (
    <div className="relative">
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-white/30 to-white/80 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073')",
          }}
        ></div>
      </div>

      <div className="relative z-20">

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <section className="relative py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block mb-6 p-4 bg-orange-600/90 backdrop-blur-md rounded-full shadow-2xl">
                <FaHandHoldingHeart className="text-5xl text-white" />
              </div>
              <h1 className="text-6xl md:text-7xl font-extrabold mb-6 text-white drop-shadow-2xl">
                Give Online
              </h1>
              <p className="text-2xl md:text-3xl text-white font-medium leading-relaxed drop-shadow-xl bg-black/30 backdrop-blur-sm inline-block px-8 py-4 rounded-2xl">
                Your generosity enables us to serve our community and spread the Gospel
              </p>
              <div className="mt-10 inline-flex items-center gap-3 bg-white/95 backdrop-blur-sm px-8 py-4 rounded-full shadow-2xl">
                <FaShieldAlt className="text-3xl text-red-900" />
                <span className="text-xl font-bold text-red-900">Secure &bull; Simple &bull; Impactful</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── GIVING FORM + SIDEBAR ──────────────────────────────────── */}
        <section className="py-12 relative">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">

              {/* MAIN FORM */}
              <div className="lg:col-span-2 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 border-2 border-white/50">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Make Your Gift</h2>
                <p className="text-gray-500 mb-8">Every dollar makes a difference in the lives of real people.</p>

                {/* Step 1 — Choose Fund */}
                <div className="mb-8">
                  <p className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">
                    1. Where would you like to give?
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {funds.map((fund) => (
                      <button
                        key={fund.id}
                        onClick={() => setSelectedFund(fund.id)}
                        className={`relative flex items-start gap-3 p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                          selectedFund === fund.id
                            ? 'border-red-800 bg-gradient-to-br from-red-50 to-orange-50 shadow-md'
                            : 'border-gray-200 bg-white hover:border-orange-300 hover:bg-orange-50/50'
                        }`}
                      >
                        <span className={`mt-0.5 p-2 rounded-xl bg-gradient-to-br ${fund.color} text-white text-base flex-shrink-0 shadow`}>
                          {fund.icon}
                        </span>
                        <span>
                          <span className="block font-bold text-gray-900 text-sm">{fund.title}</span>
                          <span className="block text-xs text-gray-500 mt-0.5 leading-snug">{fund.description}</span>
                        </span>
                        {selectedFund === fund.id && (
                          <FaCheckCircle className="absolute top-3 right-3 text-red-800 text-lg" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2 — Frequency */}
                <div className="mb-8">
                  <p className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">
                    2. How often would you like to give?
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {['one-time', 'weekly', 'monthly'].map((f) => (
                      <button
                        key={f}
                        onClick={() => setFrequency(f)}
                        className={`py-3 rounded-2xl border-2 font-semibold text-sm capitalize transition-all duration-200 ${
                          frequency === f
                            ? 'bg-gradient-to-r from-red-800 to-orange-600 text-white border-transparent shadow-lg'
                            : 'border-gray-200 text-gray-700 hover:border-orange-400'
                        }`}
                      >
                        {f.replace('-', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3 — Amount */}
                <div className="mb-8">
                  <p className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">
                    3. Choose an amount
                  </p>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
                    {presetAmounts.map((amt) => (
                      <button
                        key={amt}
                        onClick={() => { setSelectedAmount(amt); setCustomAmount(''); }}
                        className={`py-3 rounded-2xl border-2 font-bold text-base transition-all duration-200 ${
                          selectedAmount === amt && !customAmount
                            ? 'bg-gradient-to-r from-red-800 to-orange-600 text-white border-transparent shadow-lg'
                            : 'border-gray-200 text-gray-700 hover:border-orange-400'
                        }`}
                      >
                        ${amt}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xl">$</span>
                    <input
                      type="number"
                      placeholder="Enter custom amount"
                      value={customAmount}
                      onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(''); }}
                      className="w-full pl-10 pr-5 py-4 rounded-2xl border-2 border-gray-200 focus:outline-none focus:border-red-800 focus:ring-4 focus:ring-orange-100 transition-all text-lg font-medium"
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  onClick={handleGive}
                  className="w-full bg-gradient-to-r from-red-800 via-orange-600 to-amber-500 text-white py-5 rounded-2xl font-extrabold text-xl hover:from-red-700 hover:to-orange-500 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] flex items-center justify-center gap-3"
                >
                  <FaLock className="text-lg" />
                  Give Securely Now
                </button>
                <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
                  <FaShieldAlt /> 256-bit SSL encryption &bull; PCI compliant &bull; Tax-deductible
                </p>
              </div>

              {/* SIDEBAR */}
              <div className="space-y-6">
                {/* Why Give */}
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-7 border-2 border-white/50">
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-3">Why Give?</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Giving is an act of worship and an opportunity to partner with God in His work. Your generosity makes a real difference in the lives of people in our church and community.
                  </p>
                  <blockquote className="border-l-4 border-orange-500 pl-4 text-red-900 font-semibold italic text-sm leading-relaxed">
                    "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
                    <span className="block mt-1 font-bold not-italic">— 2 Corinthians 9:7</span>
                  </blockquote>
                </div>

                {/* Your Impact */}
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-7 border-2 border-white/50">
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-4">Your Impact</h3>
                  <div className="space-y-3">
                    {impactItems.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100">
                        <span className="font-extrabold text-red-800 text-sm whitespace-nowrap mt-0.5 min-w-[40px]">
                          {item.amount}
                        </span>
                        <span className="text-gray-700 text-sm leading-snug">{item.impact}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── WAYS TO GIVE ─────────────────────────────────────────── */}
        <section className="py-12 relative">
          <div className="container mx-auto px-4">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-14 border-2 border-white/50">
              <div className="text-center mb-10">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent to-red-800"></div>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Other Ways to Give</h2>
                  <div className="h-px w-16 bg-gradient-to-l from-transparent to-red-800"></div>
                </div>
                <div className="w-20 h-1.5 bg-gradient-to-r from-red-800 via-orange-600 to-amber-500 rounded-full mx-auto"></div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {givingMethods.map((method, i) => (
                  <div
                    key={i}
                    className={`text-center p-6 rounded-2xl bg-gradient-to-br ${method.bg} border-2 ${method.border} shadow-lg hover:shadow-xl transition-all hover:-translate-y-1`}
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg text-white text-2xl`}>
                      {method.icon}
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 mb-2">{method.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{method.description}</p>
                    <span className={`inline-block text-xs font-bold px-3 py-1.5 rounded-full bg-gradient-to-r ${method.color} text-white shadow`}>
                      {method.action}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────── */}
        <section className="py-12 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-14 border-2 border-white/50">
              <div className="text-center mb-10">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent to-red-800"></div>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Giving FAQs</h2>
                  <div className="h-px w-16 bg-gradient-to-l from-transparent to-red-800"></div>
                </div>
                <div className="w-20 h-1.5 bg-gradient-to-r from-red-800 via-orange-600 to-amber-500 rounded-full mx-auto"></div>
              </div>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <div key={i} className="border-2 border-orange-100 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                      className="w-full flex items-center justify-between p-5 text-left bg-gradient-to-r from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 transition-colors"
                    >
                      <span className="font-bold text-gray-900 flex items-center gap-3 text-base">
                        <FaQuestionCircle className="text-orange-500 flex-shrink-0" />
                        {faq.question}
                      </span>
                      <span className={`text-red-800 font-black text-xl transition-transform duration-300 ${faqOpen === i ? 'rotate-45' : ''}`}>+</span>
                    </button>
                    {faqOpen === i && (
                      <div className="px-5 pb-5 pt-3 bg-white text-gray-700 leading-relaxed border-t border-orange-100">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────── */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-red-700 to-amber-600"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070')] bg-cover bg-center opacity-15"></div>
          <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl"></div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-3xl mx-auto bg-white/15 backdrop-blur-xl rounded-3xl p-14 border-2 border-white/30 shadow-2xl">
              <div className="inline-block mb-8 p-4 bg-white/25 backdrop-blur-md rounded-full shadow-xl">
                <FaHandHoldingHeart className="text-5xl text-white" />
              </div>
              <h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white drop-shadow-2xl">Have Questions?</h2>
              <p className="text-2xl text-white font-medium mb-12 leading-relaxed drop-shadow-lg">
                Our team is happy to help with any giving questions, planned gifts, or financial partnership opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-block bg-white text-red-900 px-10 py-5 rounded-full font-bold text-xl hover:bg-orange-50 transition-all duration-300 shadow-2xl hover:scale-105"
                >
                  Contact Us
                </Link>
                <Link
                  href="/about"
                  className="inline-block bg-transparent border-2 border-white text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-white/20 transition-all duration-300 shadow-2xl hover:scale-105"
                >
                  Our Mission
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}