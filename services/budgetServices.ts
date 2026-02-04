import { BudgetPeriod, DailyExpenses, IExpenseGroup } from "../utils/budgetUtils";
import { supabase } from "../utils/supabase";

const budgetServices = {
  setBudget: async (payload: BudgetPeriod) => {
    const { data, error } = await supabase
      .from("BudgetPeriod")
      .insert([payload])
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },
  checkBudgetPeriod: async (userId: number, date: string) => {
    const { data, error } = await supabase
      .from("BudgetPeriod")
      .select("*")
      .eq("user_id", userId)
      .lte("start_date", date)
      .gte("end_date", date);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },
  fetchExpenseToday: async (
    userId: number,
    date: string,
  ): Promise<DailyExpenses[]> => {
    const { data, error } = await supabase
      .from("Expenses")
      .select("*")
      .eq("user_id", userId)
      .eq("date", date)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }
    return data;
  },
  createExpense: async (payload: DailyExpenses) => {
    const { data, error } = await supabase
      .from("Expenses")
      .insert([payload])
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },
  fetchExpensesById: async (id: number): Promise<DailyExpenses> => {
    const { data, error } = await supabase
      .from("Expenses")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(error.message);
    }
    return data;
  },
  fetchExpenseGroup: async (
    userId: number,
    date: string,
  ): Promise<IExpenseGroup> => {
    const { data, error } = await supabase
      .from("Expenses")
      .select("*")
      .eq("user_id", userId)
      .eq("date", date)
      .order("created_at", { ascending: false });

    const limitBudgetToday = await budgetServices.checkBudgetPeriod(userId, date);

    if (error) {
      throw new Error(error.message);
    }

    const groupByData = data.reduce(
      (totalObject, currentExpense) => {
        return {
          totalExpenseToday:
            totalObject.totalExpenseToday + currentExpense.amount,
          Eating:
            currentExpense.tag === "Eating"
              ? totalObject.Eating + currentExpense.amount
              : totalObject.Eating,
          Drink:
            currentExpense.tag === "Drink"
              ? totalObject.Drink + currentExpense.amount
              : totalObject.Drink,
          Transport:
            currentExpense.tag === "Transport"
              ? totalObject.Transport + currentExpense.amount
              : totalObject.Transport,
          Shopping:
            currentExpense.tag === "Shopping"
              ? totalObject.Shopping + currentExpense.amount
              : totalObject.Shopping,
          Other:
            currentExpense.tag === "Other"
              ? totalObject.Other + currentExpense.amount
              : totalObject.Other,
        };
      },
      {
        totalExpenseToday: 0,
        Eating: 0,
        Drink: 0,
        Transport: 0,
        Shopping: 0,
        Other: 0,
      },
    );

    return {
      ...groupByData,
      budgetToday: limitBudgetToday[0]?.amount ?? 0,
    };
  },
};

export default budgetServices;
