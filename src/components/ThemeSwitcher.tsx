'use client'

import { THEMES, THEME_ORDER, type ThemeId } from '@/lib/themes'

interface ThemeSwitcherProps {
  current: ThemeId
  onChange: (t: ThemeId) => void
}

export default function ThemeSwitcher({ current, onChange }: ThemeSwitcherProps) {
  return (
    <div className="theme-switcher" role="group" aria-label="테마 선택">
      {THEME_ORDER.map((id) => {
        const theme = THEMES[id]
        const isActive = id === current
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            aria-pressed={isActive}
            aria-label={`${theme.label} 테마`}
            className={`theme-btn${isActive ? ' theme-btn-active' : ''}`}
          >
            {theme.label}
          </button>
        )
      })}
    </div>
  )
}
