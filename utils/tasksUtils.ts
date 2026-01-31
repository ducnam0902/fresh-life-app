import { COLORS } from "@/constants/color";

export const getTagColor = (tag: string): string => {
  const tagColors: { [key: string]: string } = {
    Personal: COLORS.colors.brown,
    Development: COLORS.colors.springGreen,
    Shopping: COLORS.colors.gold,
    Work: COLORS.colors.aqua,
    Health: COLORS.colors.orangeColor,
    Finance: COLORS.colors.orangeRed
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

export interface Task {
  id: string;
  task_name: string;
  tag: string;
  priority: string;
  due_date: string;
  estimated_time: string;
  is_complete: boolean;
}
