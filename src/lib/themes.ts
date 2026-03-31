/**
 * 4가지 테마 시스템
 * 배경은 연한 파스텔/시스템 그레이 기반, 테마 컬러는 강조색으로만 사용
 */
export type ThemeId = 'tiffany' | 'chanel' | 'hermes' | 'dior'

export interface BeadGradientStop {
  offset: string
  color: string
}

export interface Theme {
  id: ThemeId
  label: string
  bg: {
    fallback: string
  }
  vars: Record<string, string>
  beadHm: BeadGradientStop[]
  beadOf: BeadGradientStop[]
  beadHighlight: string
  chainColor: string
  crossColor: string
  glowColors: [string, string]
  visitedTint: string
}

export const THEMES: Record<ThemeId, Theme> = {
  tiffany: {
    id: 'tiffany',
    label: '천상의 블루',
    bg: {
      fallback: 'linear-gradient(175deg, #E8F6F8 0%, #C8E8EC 50%, #A8D4D8 100%)',
    },
    vars: {
      '--panel-bg':          'rgba(255, 255, 255, 0.82)',
      '--panel-border':      'rgba(10, 191, 188, 0.14)',
      '--text-primary':      '#1C1C1E',
      '--text-muted':        'rgba(60, 60, 67, 0.55)',
      '--accent':            '#0ABFBC',
      '--btn-primary-bg':    '#0ABFBC',
      '--btn-primary-text':  '#FFFFFF',
      '--glow-1':            'rgba(10, 191, 188, 0.85)',
      '--glow-2':            'rgba(0, 160, 158, 0.55)',
      '--seg-ctrl-bg':       'rgba(0, 0, 0, 0.06)',
      '--seg-ctrl-thumb':    '#FFFFFF',
      '--header-bg':         'rgba(240, 252, 253, 0.78)',
      '--header-border':     'rgba(0, 0, 0, 0.06)',
    },
    beadHm: [
      { offset: '0%',   color: '#f0fffe' },
      { offset: '25%',  color: '#b2ebf2' },
      { offset: '55%',  color: '#81D8D0' },
      { offset: '80%',  color: '#4db6ac' },
      { offset: '100%', color: '#00796b' },
    ],
    beadOf: [
      { offset: '0%',   color: '#ffffff' },
      { offset: '20%',  color: '#e0f7fa' },
      { offset: '50%',  color: '#80cbc4' },
      { offset: '80%',  color: '#00897b' },
      { offset: '100%', color: '#004d40' },
    ],
    beadHighlight: 'rgba(255,255,255,0.55)',
    chainColor:    'rgba(10,191,188,0.38)',
    crossColor:    '#009688',
    glowColors:    ['rgba(10,191,188,0.95)', 'rgba(0,160,158,0.6)'],
    visitedTint:   'rgba(10,191,188,0.14)',
  },

  chanel: {
    id: 'chanel',
    label: '미드나잇 펄',
    bg: {
      fallback: 'linear-gradient(175deg, #0C0C1A 0%, #141428 50%, #0A0A14 100%)',
    },
    vars: {
      '--panel-bg':          'rgba(22, 22, 38, 0.90)',
      '--panel-border':      'rgba(200, 200, 230, 0.12)',
      '--text-primary':      '#F5F5F7',
      '--text-muted':        'rgba(235, 235, 245, 0.52)',
      '--accent':            '#C8C8DC',
      '--btn-primary-bg':    '#3A3A5C',
      '--btn-primary-text':  '#F5F5F7',
      '--glow-1':            'rgba(200, 200, 220, 0.90)',
      '--glow-2':            'rgba(160, 160, 200, 0.55)',
      '--seg-ctrl-bg':       'rgba(255, 255, 255, 0.08)',
      '--seg-ctrl-thumb':    'rgba(255, 255, 255, 0.18)',
      '--header-bg':         'rgba(12, 12, 22, 0.82)',
      '--header-border':     'rgba(255, 255, 255, 0.08)',
    },
    beadHm: [
      { offset: '0%',   color: '#ffffff' },
      { offset: '25%',  color: '#f5f0eb' },
      { offset: '55%',  color: '#e0d8d0' },
      { offset: '80%',  color: '#c0b8b0' },
      { offset: '100%', color: '#908880' },
    ],
    beadOf: [
      { offset: '0%',   color: '#ffffff' },
      { offset: '20%',  color: '#f8f8f8' },
      { offset: '50%',  color: '#d8d8d8' },
      { offset: '80%',  color: '#a8a8a8' },
      { offset: '100%', color: '#686868' },
    ],
    beadHighlight: 'rgba(255,255,255,0.70)',
    chainColor:    'rgba(200,195,190,0.42)',
    crossColor:    '#C8C8D0',
    glowColors:    ['rgba(200,200,220,0.95)', 'rgba(160,160,200,0.55)'],
    visitedTint:   'rgba(160,160,180,0.20)',
  },

  hermes: {
    id: 'hermes',
    label: '대지의 온기',
    bg: {
      fallback: 'linear-gradient(175deg, #FAF3E8 0%, #F2E4CC 50%, #E8D4B0 100%)',
    },
    vars: {
      '--panel-bg':          'rgba(255, 252, 244, 0.84)',
      '--panel-border':      'rgba(200, 100, 20, 0.12)',
      '--text-primary':      '#2C1A08',
      '--text-muted':        'rgba(80, 50, 15, 0.55)',
      '--accent':            '#C96B1A',
      '--btn-primary-bg':    '#C96B1A',
      '--btn-primary-text':  '#FFF8EE',
      '--glow-1':            'rgba(220, 120, 30, 0.85)',
      '--glow-2':            'rgba(200, 100, 20, 0.55)',
      '--seg-ctrl-bg':       'rgba(0, 0, 0, 0.06)',
      '--seg-ctrl-thumb':    '#FFFFFF',
      '--header-bg':         'rgba(255, 250, 238, 0.80)',
      '--header-border':     'rgba(200, 100, 20, 0.10)',
    },
    beadHm: [
      { offset: '0%',   color: '#fffbe6' },
      { offset: '20%',  color: '#ffd966' },
      { offset: '50%',  color: '#FFD700' },
      { offset: '75%',  color: '#c9a227' },
      { offset: '100%', color: '#7d6210' },
    ],
    beadOf: [
      { offset: '0%',   color: '#ffffff' },
      { offset: '20%',  color: '#fff0c0' },
      { offset: '50%',  color: '#e8c040' },
      { offset: '80%',  color: '#b08820' },
      { offset: '100%', color: '#6b5210' },
    ],
    beadHighlight: 'rgba(255,255,220,0.60)',
    chainColor:    'rgba(200,150,40,0.42)',
    crossColor:    '#C96B1A',
    glowColors:    ['rgba(220,130,30,0.95)', 'rgba(200,100,20,0.65)'],
    visitedTint:   'rgba(200,150,40,0.16)',
  },

  dior: {
    id: 'dior',
    label: '장미의 기도',
    bg: {
      fallback: 'linear-gradient(175deg, #FDF2F6 0%, #F5E0EB 50%, #EDCADC 100%)',
    },
    vars: {
      '--panel-bg':          'rgba(255, 248, 252, 0.84)',
      '--panel-border':      'rgba(195, 95, 135, 0.14)',
      '--text-primary':      '#2A1520',
      '--text-muted':        'rgba(80, 40, 60, 0.55)',
      '--accent':            '#C0587A',
      '--btn-primary-bg':    '#C0587A',
      '--btn-primary-text':  '#FFFFFF',
      '--glow-1':            'rgba(210, 100, 145, 0.85)',
      '--glow-2':            'rgba(240, 170, 200, 0.55)',
      '--seg-ctrl-bg':       'rgba(0, 0, 0, 0.06)',
      '--seg-ctrl-thumb':    '#FFFFFF',
      '--header-bg':         'rgba(253, 245, 249, 0.80)',
      '--header-border':     'rgba(195, 95, 135, 0.10)',
    },
    beadHm: [
      { offset: '0%',   color: '#fff5f8' },
      { offset: '25%',  color: '#f0c8d8' },
      { offset: '55%',  color: '#d4a0b8' },
      { offset: '80%',  color: '#b87890' },
      { offset: '100%', color: '#885060' },
    ],
    beadOf: [
      { offset: '0%',   color: '#ffffff' },
      { offset: '20%',  color: '#ffe8ef' },
      { offset: '50%',  color: '#e8b8c8' },
      { offset: '80%',  color: '#c88898' },
      { offset: '100%', color: '#985860' },
    ],
    beadHighlight: 'rgba(255,240,248,0.65)',
    chainColor:    'rgba(195,110,150,0.38)',
    crossColor:    '#C0587A',
    glowColors:    ['rgba(210,100,145,0.95)', 'rgba(240,170,200,0.6)'],
    visitedTint:   'rgba(195,110,150,0.16)',
  },
}

export const THEME_ORDER: ThemeId[] = ['tiffany', 'chanel', 'hermes', 'dior']
