import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { ContextOSDemo } from "@/components/context-os/ContextOSDemo";
import { getPath } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Personal Context OS · 交互演示",
  description: "体验对话如何经过捕获、治理、召回和项目回流，成为可信的长期 AI 上下文。",
};

export default function PersonalContextOSDemoPage() {
  return (
    <div className="bg-[#090d10] pt-20">
      <div className="mx-auto max-w-[1500px] px-4 pt-4 sm:px-6 lg:px-10">
        <a
          href={getPath("/project/personal-context-os")}
          className="inline-flex min-h-10 items-center gap-2 text-xs text-zinc-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          返回项目介绍
        </a>
      </div>
      <ContextOSDemo fullScreen />
    </div>
  );
}
