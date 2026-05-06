import Hero from "@/components/Hero";
import AboutPractice from "@/components/AboutPractice";
import AboutMe from "@/components/AboutMe";
import ForWhom from "@/components/ForWhom";
import CommonQuestions from "@/components/CommonQuestions";
import Approach from "@/components/Approach";
import Pricing from "@/components/Pricing";
import Availability from "@/components/Availability";
import CoreValues from "@/components/CoreValues";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <AboutPractice />
      <AboutMe />
      <ForWhom />
      <CommonQuestions />
      <Approach />
      <Pricing />
      <Availability />
      <CoreValues />
      <Contact />
    </main>
  );
}
