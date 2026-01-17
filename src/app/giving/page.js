'use client';
import { useState } from 'react';
import { FaHeart, FaCreditCard, FaUniversity, FaCheck, FaLock } from 'react-icons/fa';

export default function GivingPage() {
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [frequency, setFrequency] = useState('once');
  const [givingType, setGivingType] = useState('general');

  const quickAmounts = [25, 50, 100, 250, 500];

  const givingOptions = [
    {
      id: 'general',
      title: 'General Fund',
      description: 'Supports all church operations, ministries, and outreach programs',
      icon: <FaHeart />
    },
    {
      id: 'missions',
      title: 'Missions',
      description: 'Supports local and global mission work',
      icon: <FaHeart />
    },
    {
      id: 'building',
      title: 'Building Fund',
      description: 'Helps maintain and improve our facilities',
      icon: <FaHeart />
    },
    {
      id: 'benevolence',
      title: 'Benevolence',
      description: 'Helps those in our community facing financial hardship',
      icon: <FaHeart />
    }
  ];

  const impactStats = [
    { number: '150+', label: 'Families Helped Monthly' },
    { number: '$50K', label: 'Given to Missions Annually' },
    { number: '25', label: 'Active Ministry Programs' },
    { number: '500+', label: 'Community Members Served' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalAmount = customAmount || amount;
    
    // Here you would integrate with your payment processor
    // Examples: Stripe, PayPal, Tithe.ly, Pushpay, etc.
    console.log({
      amount: finalAmount,
      frequency,
      givingType
    });
    
    alert(`Thank you for your generous gift of $${finalAmount}! 
    
This is a demo. In production, this would process through your payment gateway.`);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Give Online</h1>
            <p className="text-xl text-blue-100">
              Your generosity enables us to serve our community and spread the Gospel
            </p>
          </div>
        </div>
      </section>

      {/* Giving Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
            {/* Left Column - Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Make Your Gift</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Giving Type */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-3">
                    Where would you like to give?
                  </label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {givingOptions.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setGivingType(option.id)}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          givingType === option.id
                            ? 'border-blue-900 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`text-2xl ${givingType === option.id ? 'text-blue-900' : 'text-gray-400'}`}>
                            {option.icon}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold mb-1">{option.title}</div>
                            <div className="text-sm text-gray-600">{option.description}</div>
                          </div>
                          {givingType === option.id && (
                            <FaCheck className="text-blue-900" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Frequency */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-3">
                    How often would you like to give?
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['once', 'weekly', 'monthly'].map((freq) => (
                      <button
                        key={freq}
                        type="button"
                        onClick={() => setFrequency(freq)}
                        className={`py-3 px-4 rounded-lg font-semibold capitalize transition-colors ${
                          frequency === freq
                            ? 'bg-blue-900 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {freq}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-3">
                    Select or enter an amount
                  </label>
                  <div className="grid grid-cols-5 gap-3 mb-4">
                    {quickAmounts.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => {
                          setAmount(amt);
                          setCustomAmount('');
                        }}
                        className={`py-3 px-4 rounded-lg font-semibold transition-colors ${
                          amount === amt && !customAmount
                            ? 'bg-blue-900 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        ${amt}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
                      $
                    </span>
                    <input
                      type="number"
                      placeholder="Other amount"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setAmount('');
                      }}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-900"
                      min="1"
                      step="0.01"
                    />
                  </div>
                </div>

                {/* Payment Methods */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-3">
                    Payment Method
                  </label>
                  <div className="space-y-3">
                    <button
                      type="button"
                      className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-900 transition-colors text-left flex items-center gap-3"
                    >
                      <FaCreditCard className="text-2xl text-blue-900" />
                      <div>
                        <div className="font-semibold">Credit / Debit Card</div>
                        <div className="text-sm text-gray-600">Visa, Mastercard, Amex</div>
                      </div>
                    </button>
                    <button
                      type="button"
                      className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-900 transition-colors text-left flex items-center gap-3"
                    >
                      <FaUniversity className="text-2xl text-blue-900" />
                      <div>
                        <div className="font-semibold">Bank Transfer (ACH)</div>
                        <div className="text-sm text-gray-600">Direct from your bank account</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!amount && !customAmount}
                  className="w-full bg-blue-900 text-white py-4 px-6 rounded-lg font-bold text-lg hover:bg-blue-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <FaLock />
                  Continue to Secure Payment
                </button>

                <p className="text-sm text-gray-600 text-center">
                  <FaLock className="inline mr-1" />
                  Your information is secure and encrypted. We never store your payment details.
                </p>
              </form>
            </div>

            {/* Right Column - Info */}
            <div>
              <div className="card bg-gray-50 mb-6">
                <h3 className="text-2xl font-bold mb-4">Why Give?</h3>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Giving is an act of worship and an opportunity to partner with God in His work. 
                    Your generosity makes a real difference in the lives of people in our church and community.
                  </p>
                  <p className="font-semibold text-blue-900">
                    "Each of you should give what you have decided in your heart to give, not reluctantly 
                    or under compulsion, for God loves a cheerful giver." - 2 Corinthians 9:7
                  </p>
                </div>
              </div>

              <div className="card mb-6">
                <h3 className="text-2xl font-bold mb-4">Your Impact</h3>
                <div className="grid grid-cols-2 gap-4">
                  {impactStats.map((stat, index) => (
                    <div key={index} className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-3xl font-bold text-blue-900 mb-1">
                        {stat.number}
                      </div>
                      <div className="text-sm text-gray-600">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card bg-blue-900 text-white">
                <h3 className="text-xl font-bold mb-3">Tax Information</h3>
                <p className="text-blue-100 mb-4">
                  Grace Church is a 501(c)(3) nonprofit organization. Your gifts are tax-deductible 
                  to the extent allowed by law.
                </p>
                <p className="text-sm text-blue-200">
                  Tax ID: 12-3456789
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Ways to Give */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="section-title text-center mb-12">Other Ways to Give</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="card text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUniversity className="text-3xl text-blue-900" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Mail a Check</h3>
                <p className="text-gray-600 mb-4">
                  Make checks payable to:<br />
                  <strong>Grace Church</strong><br />
                  123 Faith Street<br />
                  Your City, ST 12345
                </p>
              </div>

              <div className="card text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaHeart className="text-3xl text-blue-900" />
                </div>
                <h3 className="text-xl font-semibold mb-3">In-Person</h3>
                <p className="text-gray-600 mb-4">
                  Place your gift in the offering during any Sunday service or drop it off at the church office during business hours.
                </p>
              </div>

              <div className="card text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCreditCard className="text-3xl text-blue-900" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Text to Give</h3>
                <p className="text-gray-600 mb-4">
                  Text <strong>GIVE</strong> to<br />
                  <strong className="text-2xl text-blue-900">(555) 123-4567</strong><br />
                  and follow the prompts
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-title text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-lg font-semibold mb-2">Is my gift secure?</h3>
                <p className="text-gray-700">
                  Yes! We use bank-level encryption and security measures. Your payment information is 
                  never stored on our servers and is processed through secure payment gateways.
                </p>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold mb-2">Will I receive a receipt?</h3>
                <p className="text-gray-700">
                  Yes, you'll receive an email receipt immediately after your gift is processed. 
                  At the end of the year, we'll send you a comprehensive giving statement for tax purposes.
                </p>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold mb-2">Can I cancel my recurring gift?</h3>
                <p className="text-gray-700">
                  Absolutely. You can modify or cancel recurring gifts at any time by contacting our 
                  office or through your online giving account.
                </p>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold mb-2">How is my gift used?</h3>
                <p className="text-gray-700">
                  Your gifts support all aspects of church ministry including worship services, children's 
                  and youth programs, community outreach, missions, and facility maintenance. We're committed 
                  to being good stewards of your generosity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Questions About Giving?</h2>
          <p className="text-xl text-blue-100 mb-8">
            We're here to help. Contact our finance team for assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:finance@gracechurch.org" className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block">
              Email Finance Team
            </a>
            <a href="tel:5551234567" className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors inline-block">
              Call (555) 123-4567
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}