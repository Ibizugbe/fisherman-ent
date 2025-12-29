import { motion } from "framer-motion";
import { Dot } from "lucide-react";
import { Navbar } from "../components/layouts/Navbar";
import { Footer } from "../components/layouts/Footer";
import netete from "../assets/team/netete.png";
import jesse from "../assets/team/jesse.png";
import oseyomo from "../assets/team/oseyomo.png";

export default function About() {
  const team = [
    {
      name: "Netete James",
      role: "CEO and Co-founder",
      image: netete,
    },
    {
      name: "Jesse Praise",
      role: "Talents Manager",
      image: jesse,
    },
    {
      name: "Oseyemo Adams",
      role: "Creative Director",
      image: oseyomo,
    },
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-linear-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-16 items-start"
          >
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 leading-none">
              About Us
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed max-w-lg">
              Fisherman Entertainment is a creative powerhouse that encompasses
              every facet of production in film, music, comedy founded by{" "}
              <strong>Netete Asowata</strong> in 2025.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-3xl p-10 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-[#739AD4]/10 rounded-full">
                <Dot className="w-8 h-8 text-[#739AD4]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Our mission is to create, produce, and promote world-class
              entertainment that inspires laughter, connection, and creativity.
              We aim to amplify unique voices, deliver unforgettable stories
              across film, television, digital media, and live experiences, and
              provide the tools, talent, and platforms that bring ideas to life.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gray-50 rounded-3xl p-10 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-[#739AD4]/10 rounded-full">
                <Dot className="w-8 h-8 text-[#739AD4]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To become a leading force in global entertainment — a home for
              creativity, excellence, and originality — where comedy and
              storytelling spark cultural impact, shape the future of
              entertainment, and bring people together through shared moments of
              joy and inspiration.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-24 bg-linear-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start mb-20">
            <h2 className="text-6xl md:text-8xl font-black text-gray-900 leading-none">
              Our Team
            </h2>
            <p className="text-lg text-gray-700 max-w-lg">
              Fisherman Entertainment is powered by a passionate team of
              creatives, strategists, and innovators, all united by one goal:
              making African entertainment global.
            </p>
          </div>

          {/* Team Cards */}
          <div className="grid md:grid-cols-3 gap-10">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group"
              >
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500">
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-8 text-center">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {member.name}
                    </h3>
                    <p className="text-gray-600 mt-2">{member.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
