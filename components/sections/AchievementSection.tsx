"use client";

import Image from "next/image";

const achievements = [
  {
    title: "Best Financial Startup",
    description:
      "Recognized for outstanding growth and innovation in financial advisory services.",
    image: "/achievement/award1.jpg",
    position: "center",
  },
  {
    title: "Employee Excellence",
description:
  "Recognizing the dedication, talent, and achievements of our team members who drive FinBud's success.",
    image: "/achievement/clients.jpg",
    position: "top",
  },
  {
    title: "Team Excellence Award",
    description:
      "Awarded for exceptional teamwork, dedication, and service quality.",
    image: "/achievement/team-award.jpg",
    position: "center",
  },
  {
    title: "Industry Recognition",
    description:
      "FinBud continues to gain trust and recognition in the financial services industry.",
    image: "/achievement/recognition.jpg",
    position: "center",
  },
];

export default function AchievementSection() {
  return (
    <section className="py-20 bg-[#08162f] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-3">
          FinBud Achievements
        </h2>

        <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
          Celebrating milestones and accomplishments that reflect the dedication,
          trust, and growth of the FinBud team.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((item, index) => (
            <div
              key={index}
              className="bg-[#122848] rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition duration-300"
            >
              <div className="relative w-full h-[220px] overflow-hidden rounded-t-2xl">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className={`object-cover ${
                    item.position === "top" ? "object-top" : "object-center"
                  }`}
                />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-300">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}