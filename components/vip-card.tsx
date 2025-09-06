"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

type VipLevel = 1 | 2 | 3 | 4 | 5 | 6

export interface VipCardProps {
  level: VipLevel
  username?: string
  progress?: number // 0-100 toward next level
  className?: string
}

const badgeByLevel: Record<VipLevel, string> = {
  1: "/vip/badge-1.png",
  2: "/vip/badge-2.png",
  3: "/vip/badge-3.png",
  4: "/vip/badge-4.png",
  5: "/vip/badge-5.png",
  6: "/vip/badge-6.png",
}

const bgByLevel: Record<VipLevel, string> = {
  1: "/vip/bg-0.png", // bronze
  2: "/vip/bg-1.png", // steel
  3: "/vip/bg-3.png", // gold
  4: "/vip/bg-0.png",
  5: "/vip/bg-2.png", // subtle accent
  6: "/vip/bg-3.png",
}

export default function VipCard({ level, username, progress = 0, className }: VipCardProps) {
  const clamped = Math.max(0, Math.min(100, progress))

  return (
    <div
      className={cn("relative w-full overflow-hidden rounded-2xl", "bg-black text-white shadow-lg", "p-4", className)}
      role="region"
      aria-label={`VIP ${level} card`}
    >
      {/* Background */}
      <Image
        src={bgByLevel[level] || "/placeholder.svg"}
        alt=""
        fill
        priority
        className="object-cover opacity-90 pointer-events-none select-none"
        sizes="(max-width: 480px) 100vw, 480px"
      />
      <div className="absolute inset-0 bg-black/45" aria-hidden="true" />

      {/* Foreground */}
      <div className="relative z-10 flex items-center gap-4">
        <div className="shrink-0">
          <Image
            src={badgeByLevel[level] || "/placeholder.svg"}
            alt={`VIP ${level} badge`}
            width={72}
            height={72}
            className="drop-shadow-md"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-semibold">VIP {level}</span>
            {username ? <span className="text-xs text-white/80 truncate">• {username}</span> : null}
          </div>

          {/* Progress */}
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-white/80">
              <span>Progress to next level</span>
              <span>{clamped}%</span>
            </div>
            <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-white/20">
              {/* Colors: gold primary with green accent for progress */}
              <div className="h-full rounded-full bg-emerald-400" style={{ width: `${clamped}%` }} />
            </div>
          </div>

          {/* Perks */}
          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px]">
          </div>
        </div>
      </div>
    </div>
  )
}
