import { COLORS } from "@/constants/color";

export const getTagColor = (tag: string): string => {
  const tagColors: { [key: string]: string } = {
    Personal: "#4D96FF",
    Work: "#FFB84D",
    Health: "#4CAF50",
    Shopping: "#FF9ED5",
    Development: "#9B59B6",
    Finance: "#F39C12",
  };
  return tagColors[tag] || "#999999";
};

export const getPriorityColor = (priority: string): string => {
  const priorityColors: { [key: string]: string } = {
    High: COLORS.colors.error,
    Medium: COLORS.colors.warning,
    Low: COLORS.colors.info,
  };
  return priorityColors[priority] || COLORS.colors.border;
};

export const tagOptions = [
  "Personal",
  "Work",
  "Health",
  "Shopping",
  "Development",
  "Finance",
];

export const priorityOptions = ["Low", "Medium", "High"];
