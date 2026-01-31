import moment from "moment";
import { supabase } from "./supabase";

const tasksServices = {
  fetchTasks: async (id: string) => {
    const { data, error } = await supabase
      .from("Tasks")
      .select("*")
      .eq("user_id", id)
      .eq("due_date", moment().format("DD-MM-YYYY"))
      .order("is_complete", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }
    return data;
  },
  completeTask: async (taskId: string) => {
    const { data, error } = await supabase
      .from("Tasks")
      .update({ is_complete: true })
      .eq("id", taskId)
      .select();

    if (error) {
      throw error;
    }
    return data;
  },
  createTask: async (taskData: any) => {
    const { data, error } = await supabase
      .from("Tasks")
      .insert([
        {
          user_id: taskData.id,
          task_name: taskData.taskName,
          tag: taskData.tag,
          priority: taskData.priority,
          due_date: taskData.dueDate,
          estimated_time: taskData.estimatedTime,
        },
      ])
      .select();

    if (error) {
      throw error;
    }
    return data;
  },
  fetchTaskById: async (taskId: string) => {
    const { data, error } = await supabase
      .from("Tasks")
      .select("*")
      .eq("id", taskId)
      .single();

    if (error) {
      throw error;
    }
    return data;
  }
};

export default tasksServices;
