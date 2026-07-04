/* SingClaw MVP — Embed widget
 * Right-bottom floating chat button.
 * Loaded as <script src="/embed/widget.js" data-session-key="..." async></script>
 * Talks to BFF /api/mvp-chat (server-side) → FastAPI Adapter → OpenClaw agent.
 *
 * S4 — H Sing @syberh
 * Public — anyone can include this script. No auth yet (S5 will add access_code).
 */
(function () {
  if (typeof window === 'undefined') return
  if (window.__SINGCLAW_WIDGET_LOADED__) return
  window.__SINGCLAW_WIDGET_LOADED__ = true

  var script = document.currentScript
  if (!script) {
    var scripts = document.getElementsByTagName('script')
    for (var i = scripts.length - 1; i >= 0; i--) {
      if (scripts[i].src && scripts[i].src.indexOf('/embed/widget.js') !== -1) {
        script = scripts[i]
        break
      }
    }
  }
  var position = (script && script.getAttribute('data-position')) || 'bottom-right'
  var sessionKey = (script && script.getAttribute('data-session-key')) || 'singclaw-mvp-session-id'

  function newId() {
    return 'embed-' + Math.random().toString(36).slice(2, 10)
  }

  function getSessionId() {
    try {
      var id = window.localStorage.getItem(sessionKey)
      if (!id) {
        id = newId()
        window.localStorage.setItem(sessionKey, id)
      }
      return id
    } catch (_) {
      return newId()
    }
  }

  function el(tag, attrs, children) {
    var e = document.createElement(tag)
    if (attrs) for (var k in attrs) {
      if (k === 'style') {
        for (var s in attrs.style) e.style[s] = attrs.style[s]
      } else if (k === 'html') {
        e.innerHTML = attrs[k]
      } else if (k === 'text') {
        e.textContent = attrs[k]
      } else {
        e.setAttribute(k, attrs[k])
      }
    }
    if (children) for (var i = 0; i < children.length; i++) e.appendChild(children[i])
    return e
  }

  // ---------- styles ----------
  var css = document.createElement('style')
  css.textContent = [
    '#singclaw-fab{position:fixed;' + (position === 'bottom-left' ? 'left:20px;' : 'right:20px;') + 'bottom:20px;z-index:2147483600;width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#3b82f6,#8b5cf6);box-shadow:0 8px 24px rgba(59,130,246,.4);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:24px;font-family:system-ui,sans-serif;border:none;transition:transform .2s}',
    '#singclaw-fab:hover{transform:scale(1.05)}',
    '#singclaw-panel{position:fixed;' + (position === 'bottom-left' ? 'left:20px;' : 'right:20px;') + 'bottom:90px;z-index:2147483601;width:380px;max-width:calc(100vw - 40px);height:540px;max-height:calc(100vh - 110px);background:#0b1220;border:1px solid rgba(255,255,255,.1);border-radius:16px;box-shadow:0 16px 48px rgba(0,0,0,.6);display:none;flex-direction:column;font-family:system-ui,-apple-system,sans-serif;color:#e2e8f0;overflow:hidden}',
    '#singclaw-panel.open{display:flex}',
    '#singclaw-head{padding:12px 16px;background:linear-gradient(135deg,#1e3a8a,#5b21b6);display:flex;align-items:center;justify-content:space-between}',
    '#singclaw-head h3{margin:0;font-size:15px;font-weight:600}',
    '#singclaw-close{background:none;border:none;color:#fff;font-size:22px;cursor:pointer;line-height:1;padding:0}',
    '#singclaw-list{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px}',
    '#singclaw-list .row{display:flex}',
    '#singclaw-list .row.user{justify-content:flex-end}',
    '#singclaw-list .bubble{max-width:80%;padding:8px 12px;border-radius:12px;font-size:13px;line-height:1.5;white-space:pre-wrap;word-break:break-word}',
    '#singclaw-list .row.user .bubble{background:#2563eb;color:#fff}',
    '#singclaw-list .row.agent .bubble{background:#1e293b;color:#e2e8f0}',
    '#singclaw-list .row.system .bubble{background:#3f1d1d;color:#fca5a5;border:1px solid #7f1d1d}',
    '#singclaw-list .meta{font-size:10px;color:#94a3b8;margin-bottom:2px}',
    '#singclaw-foot{padding:10px;border-top:1px solid rgba(255,255,255,.1);display:flex;gap:6px}',
    '#singclaw-input{flex:1;background:#1e293b;border:1px solid rgba(255,255,255,.1);border-radius:10px;color:#e2e8f0;padding:8px 10px;font-size:13px;resize:none;font-family:inherit;outline:none}',
    '#singclaw-input:focus{border-color:#3b82f6}',
    '#singclaw-send{background:#2563eb;color:#fff;border:none;border-radius:10px;padding:0 14px;font-size:13px;font-weight:600;cursor:pointer}',
    '#singclaw-send:disabled{opacity:.5;cursor:not-allowed}',
    '#singclaw-loading{display:inline-block;width:6px;height:6px;border-radius:50%;background:#94a3b8;margin-right:4px;animation:singclaw-blink 1.2s infinite}',
    '#singclaw-loading:nth-child(2){animation-delay:.2s}',
    '#singclaw-loading:nth-child(3){animation-delay:.4s}',
    '@keyframes singclaw-blink{0%,80%,100%{opacity:.3}40%{opacity:1}}',
    '@media(max-width:480px){#singclaw-panel{width:calc(100vw - 20px);left:10px;right:10px;height:calc(100vh - 100px)}}',
  ].join('')
  document.head.appendChild(css)

  // ---------- DOM ----------
  var fab = el('button', { id: 'singclaw-fab', type: 'button', 'aria-label': 'SingClaw Chat' }, [])
  fab.textContent = '💬'

  var panel = el('div', { id: 'singclaw-panel', role: 'dialog', 'aria-label': 'SingClaw Chat' }, [])
  var head = el('div', { id: 'singclaw-head' }, [
    el('h3', { text: 'SingClaw 客服' }),
    el('button', { id: 'singclaw-close', type: 'button', 'aria-label': '关闭' }),
  ])
  head.querySelector('#singclaw-close').textContent = '×'
  var list = el('div', { id: 'singclaw-list' })
  var foot = el('div', { id: 'singclaw-foot' })
  var input = el('textarea', { id: 'singclaw-input', rows: '2', placeholder: '说点什么，按 Enter 发送…' })
  var send = el('button', { id: 'singclaw-send', type: 'button' }, [])
  send.textContent = '发送'
  foot.appendChild(input)
  foot.appendChild(send)
  panel.appendChild(head)
  panel.appendChild(list)
  panel.appendChild(foot)
  document.body.appendChild(fab)
  document.body.appendChild(panel)

  // ---------- state ----------
  var sessionId = getSessionId()
  var busy = false

  function append(role, text, meta) {
    var row = el('div', { class: 'row ' + role })
    var bubble = el('div', { class: 'bubble' })
    if (role === 'agent' && meta && typeof meta.elapsed_sec === 'number') {
      var m = el('div', { class: 'meta' })
      m.textContent = 'agent · ' + Number(meta.elapsed_sec).toFixed(1) + 's'
      bubble.appendChild(m)
    }
    var body = el('div')
    body.textContent = text
    bubble.appendChild(body)
    row.appendChild(bubble)
    list.appendChild(row)
    list.scrollTop = list.scrollHeight
  }

  function setBusy(b) {
    busy = b
    send.disabled = b
    input.disabled = b
  }

  function welcome() {
    if (list.children.length === 0) {
      append('agent', '👋 你好，我是 SingClaw 助手。问点啥都行。', { elapsed_sec: 0 })
    }
  }

  // ---------- events ----------
  fab.addEventListener('click', function () {
    var isOpen = panel.classList.toggle('open')
    if (isOpen) {
      welcome()
      setTimeout(function () { input.focus() }, 50)
    }
  })
  head.querySelector('#singclaw-close').addEventListener('click', function () {
    panel.classList.remove('open')
  })

  function sendMessage() {
    var text = input.value.trim()
    if (!text || busy) return
    input.value = ''
    append('user', text)
    setBusy(true)

    fetch('/api/mvp-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, session_id: sessionId }),
    })
      .then(function (r) { return r.json().catch(function () { return {} }).then(function (d) { return { ok: r.ok, status: r.status, data: d } }) })
      .then(function (resp) {
        if (!resp.ok) {
          append('system', 'error: HTTP ' + resp.status + ' ' + JSON.stringify(resp.data))
          return
        }
        var d = resp.data || {}
        var reply = (typeof d.reply === 'string') ? d.reply : '(empty)'
        append('agent', reply, { elapsed_sec: Number(d.elapsed_sec) || 0 })
        if (d.session_id && d.session_id !== sessionId) {
          sessionId = d.session_id
          try { window.localStorage.setItem(sessionKey, sessionId) } catch (_) {}
        }
      })
      .catch(function (e) {
        append('system', 'network error: ' + (e && e.message ? e.message : String(e)))
      })
      .then(function () { setBusy(false) })
  }

  send.addEventListener('click', sendMessage)
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  })

  // expose for embedders
  window.SingClawWidget = {
    open: function () { panel.classList.add('open'); welcome() },
    close: function () { panel.classList.remove('open') },
    sessionId: function () { return sessionId },
  }
})()