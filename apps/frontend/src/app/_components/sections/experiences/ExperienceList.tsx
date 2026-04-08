import ExperienceCard from "./ExperienceCard";

export default function ExperienceList() {
  return (
    <div className="max-h-96 overflow-y-auto pr-2 mt-8">
      <div className="grid grid-cols-1 gap-6">
        <ExperienceCard />
        <ExperienceCard />
        <ExperienceCard />
        <ExperienceCard />
        <ExperienceCard />
        <ExperienceCard />
        <ExperienceCard />
        <ExperienceCard />
        <ExperienceCard />
      </div>
    </div>
  );
}