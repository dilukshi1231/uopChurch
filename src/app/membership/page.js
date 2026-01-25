
'use client';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendar, FaHeart, FaCheck } from 'react-icons/fa';

export default function MembershipPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    maritalStatus: '',
    
    // Address
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    
    // Spiritual Information
    salvationDate: '',
    baptized: '',
    baptismDate: '',
    previousChurch: '',
    membershipReason: '',
    
    // Ministry Interests
    ministryInterests: [],
    servingExperience: '',
    spiritualGifts: [],
    availability: [],
    
    // Emergency Contact
    emergencyName: '',
    emergencyRelationship: '',
    emergencyPhone: '',
    
    // Agreement
    agreeStatement: false,
    agreeCommitment: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'ministryInterests' || name === 'spiritualGifts' || name === 'availability') {
        setFormData(prev => ({
          ...prev,
          [name]: checked 
            ? [...prev[name], value]
            : prev[name].filter(item => item !== value)
        }));
      } else {
        setFormData(prev => ({ ...prev, [name]: checked }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, 'memberships'), {
        ...formData,
        submittedAt: new Date(),
        status: 'pending',
        approvedBy: null,
        approvedAt: null
      });

      setSubmitted(true);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Error submitting membership:', error);
      alert('There was an error submitting your application. Please try again or contact us directly.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    setStep(step + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const ministryOptions = [
    'Children\'s Ministry', 'Youth Ministry', 'Worship Team', 'Audio/Visual',
    'Greeters/Hospitality', 'Ushers', 'Prayer Team', 'Small Groups',
    'Outreach/Missions', 'Administrative', 'Facilities', 'Teaching/Education'
  ];

  const spiritualGiftOptions = [
    'Teaching', 'Leadership', 'Administration', 'Hospitality', 'Mercy',
    'Giving', 'Evangelism', 'Encouragement', 'Service', 'Faith', 'Wisdom'
  ];

  const availabilityOptions = [
    'Sunday Morning', 'Sunday Evening', 'Wednesday Evening', 
    'Weekday Mornings', 'Weekday Afternoons', 'Weekday Evenings', 'Saturdays'
  ];

  if (submitted) {
    return (
      <div>
        <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Membership Application</h1>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCheck className="text-5xl text-green-600" />
              </div>
              
              <h2 className="text-3xl font-bold mb-4">Thank You for Applying!</h2>
              
              <p className="text-lg text-gray-700 mb-6">
                We're excited that you want to become a member of Grace Church! 
                Your application has been received and is under review.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-900 p-6 text-left mb-8">
                <h3 className="font-bold text-lg mb-3">What Happens Next?</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-900 font-bold">1.</span>
                    <span>Our pastoral team will review your application within 3-5 business days.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-900 font-bold">2.</span>
                    <span>You'll be contacted to schedule a meeting with one of our pastors.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-900 font-bold">3.</span>
                    <span>We'll invite you to attend our next membership class (typically held monthly).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-900 font-bold">4.</span>
                    <span>After completing the class, you'll be welcomed as an official member!</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/" className="btn-primary">
                  Return to Home
                </a>
                <a href="/contact" className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors inline-block">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Become a Member</h1>
            <p className="text-xl text-blue-100">
              Join our church family and be part of something greater
            </p>
          </div>
        </div>
      </section>

      {/* Progress Bar */}
      <section className="bg-white border-b py-6">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="flex items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= num ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {num}
                  </div>
                  {num < 4 && (
                    <div className={`flex-1 h-1 mx-2 ${
                      step > num ? 'bg-blue-900' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span className={step >= 1 ? 'text-blue-900 font-semibold' : 'text-gray-500'}>Personal</span>
              <span className={step >= 2 ? 'text-blue-900 font-semibold' : 'text-gray-500'}>Spiritual</span>
              <span className={step >= 3 ? 'text-blue-900 font-semibold' : 'text-gray-500'}>Ministry</span>
              <span className={step >= 4 ? 'text-blue-900 font-semibold' : 'text-gray-500'}>Review</span>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
              
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <FaUser className="text-blue-900" />
                    Personal Information
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-900"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-900"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-900"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-900"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Date of Birth *</label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-900"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Gender *</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-900"
                      >
                        <option value="">Select...</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Marital Status *</label>
                      <select
                        name="maritalStatus"
                        value={formData.maritalStatus}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-900"
                      >
                        <option value="">Select...</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                        <option value="widowed">Widowed</option>
                        <option value="divorced">Divorced</option>
                      </select>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-4 mt-8 flex items-center gap-3">
                    <FaMapMarkerAlt className="text-blue-900" />
                    Address
                  </h3>

                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Street Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-900"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-900"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">State *</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-900"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">ZIP Code *</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-900"
                      />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-4 mt-8 flex items-center gap-3">
                    <FaPhone className="text-blue-900" />
                    Emergency Contact
                  </h3>

                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Name *</label>
                      <input
                        type="text"
                        name="emergencyName"
                        value={formData.emergencyName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-900"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Relationship *</label>
                      <input
                        type="text"
                        name="emergencyRelationship"
                        value={formData.emergencyRelationship}
                        onChange={handleChange}
                        required
                        placeholder="Spouse, Parent, etc."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-900"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Phone *</label>
                      <input
                        type="tel"
                        name="emergencyPhone"
                        value={formData.emergencyPhone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-900"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Spiritual Information */}
              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <FaHeart className="text-blue-900" />
                    Spiritual Journey
                  </h2>

                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">
                      When did you accept Jesus Christ as your Savior?
                    </label>
                    <input
                      type="date"
                      name="salvationDate"
                      value={formData.salvationDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-900"
                    />
                    <p className="text-sm text-gray-600 mt-1">If you don't remember the exact date, an approximate year is fine</p>
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">
                      Have you been baptized? *
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="baptized"
                          value="yes"
                          checked={formData.baptized === 'yes'}
                          onChange={handleChange}
                          required
                          className="mr-2"
                        />
                        Yes
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="baptized"
                          value="no"
                          checked={formData.baptized === 'no'}
                          onChange={handleChange}
                          required
                          className="mr-2"
                        />
                        No
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="baptized"
                          value="interested"
                          checked={formData.baptized === 'interested'}
                          onChange={handleChange}
                          required
                          className="mr-2"
                        />
                        Interested in baptism
                      </label>
                    </div>
                  </div>

                  {formData.baptized === 'yes' && (
                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-2">
                        When were you baptized?
                      </label>
                      <input
                        type="date"
                        name="baptismDate"
                        value={formData.baptismDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-900"
                      />
                    </div>
                  )}

                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">
                      Previous Church Membership (if any)
                    </label>
                    <input
                      type="text"
                      name="previousChurch"
                      value={formData.previousChurch}
                      onChange={handleChange}
                      placeholder="Church name and location"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-900"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">
                      Why do you want to become a member of Grace Church? *
                    </label>
                    <textarea
                      name="membershipReason"
                      value={formData.membershipReason}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-900"
                      placeholder="Share your heart with us..."
                    ></textarea>
                  </div>
                </div>
              )}

              {/* Step 3: Ministry Interests */}
              {step === 3 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Ministry & Service</h2>

                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-3">
                      Which ministries are you interested in? (Select all that apply)
                    </label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {ministryOptions.map((ministry) => (
                        <label key={ministry} className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            name="ministryInterests"
                            value={ministry}
                            checked={formData.ministryInterests.includes(ministry)}
                            onChange={handleChange}
                            className="mr-3"
                          />
                          {ministry}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-3">
                      What spiritual gifts do you believe you have? (Select all that apply)
                    </label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {spiritualGiftOptions.map((gift) => (
                        <label key={gift} className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            name="spiritualGifts"
                            value={gift}
                            checked={formData.spiritualGifts.includes(gift)}
                            onChange={handleChange}
                            className="mr-3"
                          />
                          {gift}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">
                      Previous serving experience (in any church)
                    </label>
                    <textarea
                      name="servingExperience"
                      value={formData.servingExperience}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-900"
                      placeholder="Tell us about your experience serving in ministry..."
                    ></textarea>
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-3">
                      When are you available to serve? (Select all that apply)
                    </label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {availabilityOptions.map((time) => (
                        <label key={time} className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            name="availability"
                            value={time}
                            checked={formData.availability.includes(time)}
                            onChange={handleChange}
                            className="mr-3"
                          />
                          {time}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Review & Submit */}
              {step === 4 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Review & Agreement</h2>

                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-bold mb-4">Review Your Information</h3>
                    
                    <div className="space-y-4 text-sm">
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-1">Personal</h4>
                        <p>{formData.firstName} {formData.lastName}</p>
                        <p>{formData.email} | {formData.phone}</p>
                        <p>{formData.address}, {formData.city}, {formData.state} {formData.zipCode}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-700 mb-1">Ministry Interests</h4>
                        <p>{formData.ministryInterests.join(', ') || 'None selected'}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-700 mb-1">Spiritual Gifts</h4>
                        <p>{formData.spiritualGifts.join(', ') || 'None selected'}</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="mt-4 text-blue-900 font-semibold hover:underline"
                    >
                      Edit Information
                    </button>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-900 p-6 mb-6">
                    <h3 className="font-bold text-lg mb-3">Membership Covenant</h3>
                    <div className="text-sm text-gray-700 space-y-2 mb-4">
                      <p>As a member of Grace Church, I covenant to:</p>
                      <ul className="list-disc ml-6 space-y-1">
                        <li>Attend services regularly and participate in the life of the church</li>
                        <li>Support the church through my prayers, presence, and financial giving</li>
                        <li>Live a life that honors Christ and reflects His love</li>
                        <li>Work toward unity and peace within the body of believers</li>
                        <li>Use my spiritual gifts to serve others and build up the church</li>
                        <li>Submit to the spiritual leadership and teaching of the church</li>
                        <li>Share the Gospel and invite others to know Christ</li>
                      </ul>
                    </div>

                    <label className="flex items-start mb-4">
                      <input
                        type="checkbox"
                        name="agreeStatement"
                        checked={formData.agreeStatement}
                        onChange={handleChange}
                        required
                        className="mr-3 mt-1"
                      />
                      <span className="text-sm">
                        I have read and agree with the Statement of Faith and beliefs of Grace Church *
                      </span>
                    </label>

                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        name="agreeCommitment"
                        checked={formData.agreeCommitment}
                        onChange={handleChange}
                        required
                        className="mr-3 mt-1"
                      />
                      <span className="text-sm">
                        I commit to fulfill the responsibilities of church membership to the best of my ability *
                      </span>
                    </label>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-700">
                      <strong>Note:</strong> Submitting this application does not automatically make you a member. 
                      You'll meet with a pastor and attend a membership class before your membership is finalized.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Previous
                  </button>
                )}
                
                {step < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="ml-auto bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading || !formData.agreeStatement || !formData.agreeCommitment}
                    className="ml-auto bg-blue-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Submitting...' : 'Submit Application'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Why Become a Member */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="section-title text-center mb-12">Why Become a Member?</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                  <FaHeart />
                </div>
                <h3 className="text-xl font-semibold mb-3">Deeper Connection</h3>
                <p className="text-gray-600">
                  Membership formalizes your commitment to our church family and creates deeper, more meaningful relationships.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                  <FaUser />
                </div>
                <h3 className="text-xl font-semibold mb-3">Spiritual Growth</h3>
                <p className="text-gray-600">
                  Access to member-only resources, classes, and mentorship opportunities to help you grow in your faith.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                  <FaCheck />
                </div>
                <h3 className="text-xl font-semibold mb-3">Greater Impact</h3>
                <p className="text-gray-600">
                  Participate in church decisions, serve in leadership roles, and make a lasting impact in our community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}