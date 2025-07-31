import { create } from "zustand";
import { useUserStore } from "./userStore";

export const useChatStore = create((set) => ({
  chatId: null,
  user: null,
  isCurrentUserBlocked: false,
  isReceiverUserBlocked: false,
  changeChat: (chatId, user) => {
    const currentUser = useUserStore.getState().currentUser;

    //CODE TO CHECK IF THE CURRENT USER IS BLOCKED

    if (user.blocked.includes(currentUser.id)) {
      return set({
        chatId,
        user: null,
        isCurrentUserBlocked: true,
        isReceiverUserBlocked: false,
      });
    }
    //CODE TO CHECK IF THE RECEIVER IS BLOCKED
    else if (currentUser.blocked.includes(user.id)) {
      return set({
        chatId,
        user: user,
        isCurrentUserBlocked: false,
        isReceiverUserBlocked: true,
      });
    } else {
      return set({
        chatId,
        user,
        isCurrentUserBlocked: false,
        isReceiverUserBlocked: false,
      });
    }
  },

  changeBlock: () => {
    set((state) => ({
      ...state,
      isReceiverUserBlocked: !state.isReceiverUserBlocked,
    }));
  },
}));
