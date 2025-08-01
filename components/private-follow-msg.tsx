import { Lock } from "lucide-react";

export const PrivateFollowPageMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
      <Lock className="w-10 h-10 text-muted-foreground mb-4" />
      <p className="text-lg font-semibold">This account is private</p>
      <p className="text-sm text-muted-foreground">
        Follow this user to see their followers and following.
      </p>
    </div>
  );
};
