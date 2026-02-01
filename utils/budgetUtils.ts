import { COLORS } from "@/constants/color";

export interface BudgetPeriod {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  amount: number;
  user_id?: number;
}

export interface DailyExpenses {
  id?: number;
  name: string;
  amount: number;
  date: string;
  tag: string;
  reason: string;
  user_id?: number;
  created_at?: string;
}

export const getTagColorExpense = (tag: string): string => {
  const tagColors: { [key: string]: string } = {
    Eating: COLORS.colors.orangeColor,
    Drink: COLORS.colors.aqua,
    Shopping: COLORS.colors.gold,
    Transport: COLORS.colors.brown,
    Other: COLORS.colors.warning,
  };
  return tagColors[tag] || "#999999";
};
