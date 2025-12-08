'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const testimonials = [
    {
        name: 'Rajesh Kumar',
        role: 'Business Owner, Delhi',
        image: null,
        rating: 5,
        text: 'I was struggling to get a business loan from traditional banks. Efunds connected me with 5 different lenders and I got funded within a week. The rates were much better than expected!',
    },
    {
        name: 'Priya Sharma',
        role: 'IT Professional, Bangalore',
        image: null,
        rating: 5,
        text: 'The comparison feature saved me lakhs in interest. I could see all offers side by side and choose the one with the best terms. Highly recommend for anyone looking for a personal loan.',
    },
    {
        name: 'Amit Patel',
        role: 'Doctor, Mumbai',
        image: null,
        rating: 5,
        text: 'Got my home loan approved in just 3 days! The process was completely online and the support team was always available to answer my questions. Excellent service!',
    },
    {
        name: 'Sunita Reddy',
        role: 'Teacher, Hyderabad',
        image: null,
        rating: 5,
        text: 'As a first-time borrower, I was nervous about the process. Efunds made it so simple. Got my education loan with the lowest interest rate available.',
    },
];

export default function TestimonialsSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => setCurrentIndex((i) => (i + 1) % testimonials.length);
    const prev = () => setCurrentIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

    return (
        <section
            ref={sectionRef}
            className="relative py-24 bg-[#1a1a3a] overflow-hidden"
        >
            {/* Decorative quotes */}
            <Quote className="absolute top-20 left-10 w-20 h-20 text-[#f48b3b]/10 rotate-180" />
            <Quote className="absolute bottom-20 right-10 w-20 h-20 text-[#f48b3b]/10" />

            <div className="relative z-10 max-w-4xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-[#f48b3b] bg-[#f48b3b]/10 rounded-full">
                        Testimonials
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                        What Our{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f48b3b] to-[#fbbf24]">
                            Customers Say
                        </span>
                    </h2>
                </motion.div>

                {/* Testimonial Card */}
                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 sm:p-12 text-center"
                        >
                            {/* Stars */}
                            <div className="flex items-center justify-center gap-1 mb-6">
                                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-[#fbbf24] text-[#fbbf24]" />
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed">
                                "{testimonials[currentIndex].text}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center justify-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#f48b3b] to-[#fbbf24] flex items-center justify-center text-white font-bold text-lg">
                                    {testimonials[currentIndex].name[0]}
                                </div>
                                <div className="text-left">
                                    <p className="text-white font-semibold">{testimonials[currentIndex].name}</p>
                                    <p className="text-gray-400 text-sm">{testimonials[currentIndex].role}</p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <button
                            onClick={prev}
                            className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        {/* Dots */}
                        <div className="flex gap-2">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentIndex(i)}
                                    className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? 'w-6 bg-[#f48b3b]' : 'bg-white/20'
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={next}
                            className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
