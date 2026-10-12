/* @ds-bundle: {"format":4,"namespace":"Fieldnote","components":[{"name":"Button"},{"name":"TextField"},{"name":"Divider"},{"name":"InstitutionPicker"},{"name":"Alert"},{"name":"Highlight"},{"name":"Icon"}]} */
(function () {
  var React = window.React, h = React.createElement;
  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(' '); }
  function assign(t) { for (var i = 1; i < arguments.length; i++) { var s = arguments[i]; if (s) for (var k in s) if (Object.prototype.hasOwnProperty.call(s, k)) t[k] = s[k]; } return t; }
  function omit(o, keys) { var r = {}; for (var k in o) if (keys.indexOf(k) < 0) r[k] = o[k]; return r; }
  var uid = 0; function useId(p) { var r = React.useRef(null); if (r.current == null) r.current = (p || 'fn') + '-' + (++uid); return r.current; }

  /* Icons: Lucide v1.48.0 (lucide.dev, ISC License). 24px grid, 2px stroke, currentColor. */
  var ICONS = {
    "search": "<path d=\"m21 21-4.34-4.34\" /><circle cx=\"11\" cy=\"11\" r=\"8\" />",
    "circle-alert": "<circle cx=\"12\" cy=\"12\" r=\"10\" /><line x1=\"12\" x2=\"12\" y1=\"8\" y2=\"12\" /><line x1=\"12\" x2=\"12.01\" y1=\"16\" y2=\"16\" />",
    "info": "<circle cx=\"12\" cy=\"12\" r=\"10\" /><path d=\"M12 16v-4\" /><path d=\"M12 8h.01\" />",
    "circle-check": "<circle cx=\"12\" cy=\"12\" r=\"10\" /><path d=\"m16 9-5.5 5.5L8 12\" />",
    "check": "<path d=\"M20 6 9 17l-5-5\" />",
    "x": "<path d=\"M18 6 6 18\" /><path d=\"m6 6 12 12\" />",
    "chevron-down": "<path d=\"m6 9 6 6 6-6\" />",
    "arrow-right": "<path d=\"M5 12h14\" /><path d=\"m12 5 7 7-7 7\" />",
    "external-link": "<path d=\"M15 3h6v6\" /><path d=\"M10 14 21 3\" /><path d=\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\" />",
    "loader-circle": "<path d=\"M21 12a9 9 0 1 1-6.219-8.56\" />",
    "landmark": "<path d=\"M10 18v-7\" /><path d=\"M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z\" /><path d=\"M14 18v-7\" /><path d=\"M18 18v-7\" /><path d=\"M3 22h18\" /><path d=\"M6 18v-7\" />",
    "graduation-cap": "<path d=\"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z\" /><path d=\"M22 10v6\" /><path d=\"M6 12.5V16a6 3 0 0 0 12 0v-3.5\" />",
    "mail": "<path d=\"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7\" /><rect x=\"2\" y=\"4\" width=\"20\" height=\"16\" rx=\"2\" />",
    "eye": "<path d=\"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0\" /><circle cx=\"12\" cy=\"12\" r=\"3\" />",
    "eye-off": "<path d=\"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49\" /><path d=\"M14.084 14.158a3 3 0 0 1-4.242-4.242\" /><path d=\"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143\" /><path d=\"m2 2 20 20\" />",
    "notebook-pen": "<path d=\"M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4\" /><path d=\"M2 6h4\" /><path d=\"M2 10h4\" /><path d=\"M2 14h4\" /><path d=\"M2 18h4\" /><path d=\"M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z\" />",
    "book-open": "<path d=\"M12 5v16\" /><path d=\"M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z\" />",
    "file-text": "<path d=\"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z\" /><path d=\"M14 2v5a1 1 0 0 0 1 1h5\" /><path d=\"M10 9H8\" /><path d=\"M16 13H8\" /><path d=\"M16 17H8\" />",
    "bookmark": "<path d=\"M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z\" />",
    "library": "<path d=\"m16 6 4 14\" /><path d=\"M12 6v14\" /><path d=\"M8 8v12\" /><path d=\"M4 4v16\" />",
    "quote": "<path d=\"M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z\" /><path d=\"M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z\" />",
    "highlighter": "<path d=\"m9 11-6 6v3h9l3-3\" /><path d=\"m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4\" />"
  };
  var ALIAS = { alert: 'circle-alert' };
  function Icon(props) {
    var name = ALIAS[props.name] || props.name, size = props.size || 20;
    var a11y = props.label ? { role: 'img', 'aria-label': props.label } : { 'aria-hidden': 'true' };
    return h('svg', assign({ className: cx('fn-icon', props.className), width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
      strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', focusable: 'false', dangerouslySetInnerHTML: { __html: ICONS[name] || '' } }, a11y));
  }
  Icon.names = Object.keys(ICONS);
  var Glyph = Icon;

  function Button(props) {
    var variant = props.variant || 'secondary';
    var rest = omit(props, ['variant', 'block', 'icon', 'className', 'children']);
    return h('button', assign({ type: 'button' }, rest, {
      className: cx('fn-btn', 'fn-btn-' + variant, props.block && 'fn-btn-block', props.className)
    }), props.icon ? h('span', { className: 'fn-btn-icon', 'aria-hidden': 'true' }, props.icon) : null, props.children);
  }

  function TextField(props) {
    var autoId = useId('field');
    var id = props.id || autoId, helpId = id + '-help';
    var rest = omit(props, ['label', 'helper', 'error', 'id', 'className']);
    var described = props.error || props.helper ? helpId : undefined;
    return h('div', { className: cx('fn-field', props.className) },
      props.label ? h('label', { className: 'fn-field-label', htmlFor: id }, props.label) : null,
      h('input', assign({ type: 'text' }, rest, { id: id, className: 'fn-input', 'aria-invalid': props.error ? 'true' : undefined, 'aria-describedby': described })),
      props.error
        ? h('p', { id: helpId, className: 'fn-help fn-help-error', role: 'alert' }, h(Glyph, { name: 'alert' }), h('span', null, props.error))
        : props.helper ? h('p', { id: helpId, className: 'fn-help' }, props.helper) : null);
  }

  function Divider(props) {
    return h('div', { className: 'fn-divider', role: 'separator' }, props.children == null ? 'or' : props.children);
  }

  function Alert(props) {
    var tone = props.tone || 'info';
    var icon = tone === 'error' ? 'circle-alert' : tone === 'success' ? 'circle-check' : 'info';
    return h('div', { className: cx('fn-alert', 'fn-alert-' + tone, props.className), role: tone === 'error' ? 'alert' : 'status' },
      h(Glyph, { name: icon, className: 'fn-alert-icon' }),
      h('div', null,
        props.title ? h('span', { className: 'fn-alert-title' }, props.title) : null,
        props.children,
        props.action ? h('div', { style: { marginTop: 'var(--space-2)' } }, props.action) : null));
  }

  function Highlight(props) { return h('mark', { className: 'fn-mark' }, props.children); }

  function defaultFilter(list, q) {
    q = q.trim().toLowerCase(); if (!q) return [];
    return list.filter(function (i) { return i.name.toLowerCase().indexOf(q) >= 0 || i.domain.toLowerCase().indexOf(q) >= 0; });
  }

  function InstitutionPicker(props) {
    var label = props.label || 'Find your institution';
    var listId = useId('picker-list'), inputId = useId('picker');
    var qs = React.useState(props.defaultQuery || ''), query = qs[0], setQuery = qs[1];
    var os = React.useState(!!props.defaultOpen), open = os[0], setOpen = os[1];
    var as = React.useState(-1), active = as[0], setActive = as[1];
    var state = props.state || 'idle';
    var results = props.results || defaultFilter(props.institutions || [], query);

    function choose(i) { setOpen(false); if (props.onSelect) props.onSelect(results[i]); }
    function onKey(e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); setActive(Math.min(results.length - 1, active + 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(Math.max(0, active - 1)); }
      else if (e.key === 'Enter' && open && active >= 0 && results[active]) { e.preventDefault(); choose(active); }
      else if (e.key === 'Escape') { setOpen(false); setActive(-1); }
    }

    if (state === 'redirecting') {
      return h('div', { className: 'fn-redirect', role: 'status', 'aria-live': 'polite' },
        h('span', { className: 'fn-spin', 'aria-hidden': 'true' }),
        h('span', null, 'Taking you to ' + (props.redirectTo || 'your institution') + '…'),
        h('button', { type: 'button', className: 'fn-link', onClick: props.onCancel }, 'Cancel'));
    }

    var body = null, announce = '';
    if (open) {
      if (state === 'loading') {
        announce = 'Searching…';
        body = h('div', { className: 'fn-list', 'aria-hidden': 'true' }, [0, 1, 2].map(function (k) { return h('div', { key: k, className: 'fn-skel' }, h('span'), h('span')); }));
      } else if (!query.trim()) {
        body = h('div', { className: 'fn-empty' }, h('p', null, 'Start typing your university or email domain.'));
      } else if (!results.length) {
        announce = 'No results';
        body = h('div', { className: 'fn-empty' },
          h('p', null, 'No match for ‘' + query + '.’ Try your email domain, or sign up with email.'),
          h('button', { type: 'button', className: 'fn-link', onClick: props.onRequestInstitution }, 'Request your institution'));
      } else {
        announce = results.length + (results.length === 1 ? ' result' : ' results') + ', use up and down arrows to choose';
        body = h('ul', { className: 'fn-list', role: 'listbox', id: listId, 'aria-label': 'Institutions' }, results.map(function (r, i) {
          return h('li', { key: r.domain, id: listId + '-' + i, role: 'option', className: 'fn-opt', 'aria-selected': i === active ? 'true' : 'false',
            onMouseDown: function (e) { e.preventDefault(); choose(i); }, onMouseEnter: function () { setActive(i); } },
            h('span', { className: 'fn-opt-name' }, r.name), h('span', { className: 'fn-opt-domain' }, r.domain));
        }));
      }
    }

    return h('div', { className: 'fn-picker' },
      h('label', { className: 'fn-field-label', htmlFor: inputId }, label),
      h('div', { className: 'fn-search' },
        h(Glyph, { name: 'search' }),
        h('input', { id: inputId, className: 'fn-input', type: 'text', role: 'combobox', autoComplete: 'off',
          placeholder: props.placeholder || 'University name or email domain',
          'aria-expanded': open && results.length > 0 ? 'true' : 'false', 'aria-controls': listId, 'aria-autocomplete': 'list',
          'aria-activedescendant': open && active >= 0 && results[active] ? listId + '-' + active : undefined,
          value: query, onKeyDown: onKey, onFocus: function () { setOpen(true); },
          onChange: function (e) { setQuery(e.target.value); setOpen(true); setActive(-1); if (props.onQueryChange) props.onQueryChange(e.target.value); } })),
      body,
      h('div', { className: 'fn-sr', role: 'status', 'aria-live': 'polite' }, announce));
  }

  window.Fieldnote = assign(window.Fieldnote || {}, { Button: Button, TextField: TextField, Divider: Divider, InstitutionPicker: InstitutionPicker, Alert: Alert, Highlight: Highlight, Icon: Icon, Glyph: Glyph });
})();
