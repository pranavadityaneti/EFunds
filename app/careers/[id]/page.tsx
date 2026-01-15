import { jobPositions } from "@/lib/jobs-data";
import LandingHeader from "@/components/landing/LandingHeader";
import LandingFooter from "@/components/landing/LandingFooter";
import { ArrowLeft, MapPin, DollarSign, Clock, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Generate static params for all known jobs
export async function generateStaticParams() {
    return jobPositions.map((job) => ({
        id: job.id,
    }));
}

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const job = jobPositions.find((p) => p.id === id);

    if (!job) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-black">
                <LandingHeader />
            </div>

            <article className="max-w-4xl mx-auto px-6 py-12 lg:py-20">
                {/* Back Link */}
                <Link href="/careers" className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-500 mb-8 transition-colors text-sm font-medium">
                    <ArrowLeft size={16} />
                    Back to careers
                </Link>

                {/* Header */}
                <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-100 mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                        <div>
                            <span className="inline-block px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-xs font-semibold mb-3">
                                {job.type}
                            </span>
                            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{job.title}</h1>
                            <div className="flex items-center gap-6 text-gray-500 text-sm font-medium">
                                <span className="flex items-center gap-1.5"><MapPin size={16} /> {job.location}</span>
                                <span className="flex items-center gap-1.5"><DollarSign size={16} /> {job.salary}</span>
                                <span className="flex items-center gap-1.5"><Clock size={16} /> Posted 2 days ago</span>
                            </div>
                        </div>
                        <a href="#apply" className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors text-center whitespace-nowrap">
                            Apply Now
                        </a>
                    </div>

                    <div className="prose prose-gray max-w-none">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">About the Role</h3>
                        <p className="text-gray-600 leading-relaxed mb-8">
                            {job.longDescription || job.description}
                        </p>

                        {job.requirements && (
                            <>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Requirements</h3>
                                <ul className="space-y-3 mb-8 list-none pl-0">
                                    {job.requirements.map((req, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-600">
                                            <CheckCircle2 size={20} className="text-orange-500 shrink-0 mt-0.5" />
                                            {req}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}

                        {job.benefits && (
                            <>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Benefits</h3>
                                <ul className="space-y-3 list-none pl-0">
                                    {job.benefits.map((ben, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-600">
                                            <CheckCircle2 size={20} className="text-teal-500 shrink-0 mt-0.5" />
                                            {ben}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                </div>

                {/* Application Form Placeholder */}
                <div id="apply" className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-100">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Apply for this position</h3>
                    <p className="text-gray-500 mb-8">Fill out the form below to submit your application.</p>

                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">First Name</label>
                                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all" placeholder="John" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Last Name</label>
                                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all" placeholder="Doe" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Email Address</label>
                            <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all" placeholder="john@example.com" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Portfolio / Resume URL</label>
                            <input type="url" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all" placeholder="https://" />
                        </div>
                        <button type="button" className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-900 transition-colors">
                            Submit Application
                        </button>
                    </form>
                </div>

            </article>

            <div className="bg-white">
                <LandingFooter />
            </div>
        </main>
    );
}
