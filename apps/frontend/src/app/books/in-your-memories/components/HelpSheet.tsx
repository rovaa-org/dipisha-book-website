// HelpSheet.tsx - Server Component
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

export function HelpSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <HelpCircle className="mr-2" size={18} /> Navigation Help
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[350px]">
        <SheetHeader>
          <SheetTitle>Navigation Help</SheetTitle>
        </SheetHeader>

        <div className="space-y-4 mt-4">
          <section>
            <h3 className="font-semibold mb-2">Keyboard Navigation</h3>
            <ul className="space-y-1 text-sm">
              <li>Left Arrow: Previous Page</li>
              <li>Right Arrow: Next Page</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold mb-2">Touch Navigation</h3>
            <ul className="space-y-1 text-sm">
              <li>➡️ Swipe Left: Next Page</li>
              <li>⬅️ Swipe Right: Previous Page</li>
            </ul>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
