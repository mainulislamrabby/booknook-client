import { toast } from "@/components/ui/toast";
import { authClient } from "./auth-client";

export const getTokenFromClient = async () => {
        const { data, error } = await authClient.token();
    const token = data?.token;
    if (error || !token) {
      toast.add({
        title: "Authentication failed",
        description: "Could not generate JWT token.",
        type: "error",
      });
      return;
    }
    return token;
}