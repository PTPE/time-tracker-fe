"use client";
import useGetProjects from "@/hooks/project/useGetProjects";
import ProjectSelect from "./ProjectSelect";
import Timer from "./Timer";
import { useState } from "react";
import { Project } from "@/types/project";
import useGetActiveLog from "@/hooks/timer/useGetActiveLog";

export default function TimerView() {
  const { data: projects, isLoading: isGettingProject } = useGetProjects();
  const { data: activeLog, isLoading: isGettingActiveLog } = useGetActiveLog();
  const [selectedProject, setSelectedProject] = useState<Project>();

  if (isGettingProject || isGettingActiveLog) return null;

  const projectOptions =
    projects?.map((p) => ({
      label: p.name,
      value: p.id,
    })) || [];
  ``;

  const handleSelectProject = (value: string) =>
    setSelectedProject(projects?.find((p) => p.id === value));

  return (
    <div className="flex w-full max-w-2xl flex-col items-center justify-center gap-5">
      <ProjectSelect
        options={projectOptions}
        onChange={handleSelectProject}
        defaultValue={activeLog?.projectId}
      />

      <Timer
        projectId={activeLog?.projectId ?? selectedProject?.id ?? ""}
        activeLog={activeLog}
      />
    </div>
  );
}
