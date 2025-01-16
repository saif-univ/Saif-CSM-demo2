"use client";
import React from "react";
import StartButton from "@/app/ui/surgical-session/StartButton";

export default function Home() {
  return (
    <main className="bg-gray-50 text-gray-800 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Revolutionizing Surgery with{" "}
            <span className="text-yellow-300">CSM</span>
          </h1>
          <p className="text-xl mb-8">
            Collaborative Surgical Module (CSM) is your ultimate assistant for
            seamless surgery planning, collaboration, and execution. Designed
            for surgeons, by experts.
          </p>
          <a
            href="#features"
            className="bg-yellow-300 text-blue-600 px-8 py-3 text-lg rounded-lg shadow-lg hover:bg-yellow-400"
          >
            Discover Features
          </a>
        </div>
        <div className="absolute inset-0 opacity-20">
          {/* Replace with a real surgical image */}
          <img
            src="/images/surgery-hero.jpg"
            alt="Surgery Hero"
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </div>
      </section>

      {/* Core Features Section */}
      <section id="features" className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Why Surgeons Love CSM
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 bg-white shadow-md rounded-lg">
              <img
                src="/images/feature-collaboration.jpg"
                alt="Collaboration"
                width={300}
                height={200}
                className="rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-2">
                Real-Time Collaboration
              </h3>
              <p>
                Connect with surgical teams, guiding surgeons, and remote
                experts in real time using video conferencing, whiteboards, and
                more.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-white shadow-md rounded-lg">
              <div className="grid grid-rows-2 gap-4">
                <div className="bg-white shadow-md rounded-lg p-6 text-center justify-center items-center">
                  <StartButton />
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-white shadow-md rounded-lg">
              <img
                src="/images/feature-streaming.jpg"
                alt="Live Streaming"
                width={300}
                height={200}
                className="rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Secure Live Streaming</h3>
              <p>
                Broadcast surgeries securely to observers or medical students,
                ensuring privacy and compliance with medical standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">
            Empowering Surgeons Worldwide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <img
                src="/images/surgeon-team.jpg"
                alt="Surgeon Team"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-xl font-bold mb-4">
                Built for Surgeons, Operating Rooms, and Hospitals
              </h3>
              <p className="text-lg">
                With CSM, surgeons can focus on what they do best—saving lives.
                Whether it’s real-time collaboration, robust surgical planning,
                or post-operative analysis, CSM is tailored to meet the dynamic
                needs of modern surgical environments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Surgical Practice?
          </h2>
          <p className="text-lg mb-8">
            Join thousands of surgeons who trust CSM to enhance their surgical
            workflows, improve patient outcomes, and drive innovation in the
            operating room.
          </p>
          <a
            href="/signup"
            className="bg-yellow-300 text-blue-600 px-8 py-3 text-lg rounded-lg shadow-lg hover:bg-yellow-400"
          >
            Get Started Now
          </a>
        </div>
      </section>
    </main>
  );
}
