"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export const LeaveServerModal = () => {
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();

  const {
    isOpen,
    onClose,
    type,
    data: { server },
    onOpen,
  } = useModal();

  const isModalOpen = isOpen && type === "leaveServer";

  const onClick = async () => {
    try {
      setisLoading(true);

      await axios.patch(`/api/servers/${server?.id}/leave`, );
      

      onClose();
      router.refresh();
      router.push("/");

    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Leave Server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to leave{" "}
            <span className="font-semibold text-indigo-500">
              {server?.name}{" "}
            </span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button disabled={isLoading} onClick={onClose} variant="ghost">
              Cancel
            </Button>
            <Button disabled={isLoading} variant="primary" onClick={onClick}>
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
