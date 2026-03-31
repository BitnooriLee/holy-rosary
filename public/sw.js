/* 디지털 묵주 — Service Worker (Offline-first) */
const CACHE = 'rosary-v3'
const OFFLINE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
]

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) =>
      Promise.all(OFFLINE_ASSETS.map((url) => c.add(url).catch(() => null)))
    ).then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return
  const url = new URL(e.request.url)
  if (url.origin !== self.location.origin) {
    /* 외부 리소스(폰트 등): 네트워크 우선, 실패시 캐시 */
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          const copy = res.clone()
          caches.open(CACHE + '-ext').then((c) => c.put(e.request, copy).catch(() => {}))
          return res
        })
        .catch(() => caches.match(e.request))
    )
    return
  }
  /* 동일 출처: 캐시 우선, 없으면 네트워크 후 캐시 저장 */
  e.respondWith(
    caches.match(e.request).then((cached) => {
      if (cached) return cached
      return fetch(e.request).then((res) => {
        if (res.ok) {
          const copy = res.clone()
          caches.open(CACHE).then((c) => c.put(e.request, copy))
        }
        return res
      }).catch(() => caches.match('/'))
    })
  )
})
