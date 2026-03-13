import Link from "next/link";
import { historyTimeline } from "../curiosites/utils";

export default function HistoryTimeline() {
  return (
    <div className="space-y-0">
      {historyTimeline.map(
        ({ year, title, description, icon: Icon, source }, i) => (
          <div key={year} className="flex gap-x-4">
            <div className="flex flex-col items-center">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-green-200 bg-green-50 text-green-500">
                <Icon size={16} weight="duotone" />
              </div>
              {i < historyTimeline.length - 1 && (
                <div className="my-1 w-px flex-1 bg-green-200/50" />
              )}
            </div>

            <div className="pb-8">
              <span className="font-lora text-xs font-semibold tracking-widest text-green-500/70 uppercase italic">
                {year}
              </span>
              <h3 className="font-lora mt-0.5 text-base font-semibold text-green-200">
                {title}
              </h3>
              <p className="font-maitree mt-1 text-sm leading-relaxed text-green-200/70">
                {description}
              </p>
              {source && (
                <Link
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-2 inline-flex items-center gap-1.5 text-[10px] text-green-500/40 transition-colors duration-200 hover:text-green-500/70"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 256 256"
                    fill="currentColor"
                    className="shrink-0"
                  >
                    <path d="M224,104a8,8,0,0,1-16,0V75.31l-82.34,82.35a8,8,0,0,1-11.32-11.32L196.69,64H168a8,8,0,0,1,0-16h48a8,8,0,0,1,8,8Zm-40,24a8,8,0,0,0-8,8v72H48V80h72a8,8,0,0,0,0-16H48A16,16,0,0,0,32,80V208a16,16,0,0,0,16,16H176a16,16,0,0,0,16-16V136A8,8,0,0,0,184,128Z" />
                  </svg>
                  <span className="max-w-[200px] truncate">{source.label}</span>
                </Link>
              )}
            </div>
          </div>
        ),
      )}
    </div>
  );
}
