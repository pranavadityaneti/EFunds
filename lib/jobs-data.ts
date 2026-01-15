export interface JobPosition {
    id: string;
    title: string;
    type: "Full Time" | "Part Time" | "Contract" | "Remote";
    location: string;
    salary: string;
    description: string;
    longDescription?: string;
    requirements?: string[];
    benefits?: string[];
}

export const jobPositions: JobPosition[] = [
    {
        id: "ui-ux-product-designer",
        title: "UI/UX & Product Designer",
        type: "Full Time",
        location: "London, UK",
        salary: "$23k-35k",
        description: "Product design encompasses both UI/UX design but it also involves a broader understanding of the entire product.",
        longDescription: "We are looking for a talented UI/UX & Product Designer to join our team. You will be responsible for creating intuitive and aesthetically pleasing interfaces for our financial products. You will work closely with product managers and engineers to understand user needs and translate them into design solutions.",
        requirements: [
            "3+ years of experience in UI/UX design",
            "Proficiency in Figma and Adobe Creative Suite",
            "Strong portfolio showcasing web and mobile designs",
            "Experience with design systems"
        ],
        benefits: ["Competitive salary", "Remote work options", "Health insurance", "Professional development budget"]
    },
    {
        id: "social-media-marketing",
        title: "Social Media Marketing",
        type: "Remote",
        location: "United State",
        salary: "$30k-40k",
        description: "It involves creating and sharing to content on social media networks to achieve marketing and branding goals.",
        longDescription: "Join our marketing team as a Social Media Marketing Specialist. You will be in charge of managing our social media presence, creating engaging content, and interacting with our community. Your goal is to increase brand awareness and drive engagement.",
        requirements: [
            "2+ years of experience in social media marketing",
            "Excellent written and verbal communication skills",
            "Experience with social media analytics tools",
            "Creative mindset"
        ],
        benefits: ["Flexible hours", "Performance bonuses", "Team retreats"]
    },
    {
        id: "web-developer",
        title: "Web Developer",
        type: "Remote",
        location: "New York",
        salary: "$45k-55k",
        description: "Encompasses a rang of task including web design fornt end development back end development & server.",
        longDescription: "We are seeking a skilled Web Developer to build and maintain our web applications. You should be proficient in modern web technologies like React, Next.js, and Node.js. You will work on both frontend and backend tasks to deliver high-quality software.",
        requirements: [
            "Proficiency in HTML, CSS, JavaScript, and TypeScript",
            "Experience with React and Next.js",
            "Understanding of REST APIs and database management",
            "Git version control"
        ],
        benefits: ["Stock options", "Home office stipend", "Wellness programs"]
    },
    {
        id: "graphic-designer",
        title: "Graphic Designer",
        type: "Full Time",
        location: "New York",
        salary: "$25k-35k",
        description: "Graphic designers combine art technology to the message through images & the layout of web screens & Printed.",
        longDescription: "We need a creative Graphic Designer to produce visual content for our marketing campaigns, website, and social media. You will need to translate our brand identity into compelling visuals across various media.",
        requirements: [
            "Strong graphic design skills",
            "Proficiency in Adobe Photoshop, Illustrator, and InDesign",
            "Attention to detail",
            "Ability to meet deadlines"
        ],
        benefits: ["Creative freedom", "Collaborative environment", "Annual bonuses"]
    },
    {
        id: "vp-growth-marketing",
        title: "VP of Growth Marketing",
        type: "Full Time",
        location: "London, UK",
        salary: "$30k-40k",
        description: "Marketing often works closely with other departments such as product development sales & analytics implement.",
        longDescription: "As the VP of Growth Marketing, you will lead our marketing strategy and drive user acquisition. You will analyze market trends, measure campaign performance, and optimize our marketing funnel. Leadership experience is essential.",
        requirements: [
            "5+ years of experience in growth marketing",
            "Proven track record of scaling user base",
            "Strong analytical skills",
            "Leadership experience"
        ],
        benefits: ["Executive compensation package", "Equity", "Comprehensive healthcare"]
    },
    {
        id: "lead-product-design",
        title: "Lead of Product Design",
        type: "Remote",
        location: "United State",
        salary: "$25-35k",
        description: "Encompasses a rang of task including web design fornt end development back end development & server.",
        longDescription: "We are looking for a Lead Product Designer to oversee our design team. You will set the design direction, mentor junior designers, and ensure the quality of our product design. You should have a deep understanding of user-centered design principles.",
        requirements: [
            "Senior-level design experience",
            "Leadership and mentorship skills",
            "Strategic thinking",
            "Excellent communication skills"
        ],
        benefits: ["Leadership role", "Top-tier salary", "Global conferences"]
    }
];
