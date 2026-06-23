(function () {
  var p = new URLSearchParams(window.location.search);
  var BIZ   = p.get('biz_name')      || 'AquaForce';
  var CITY  = p.get('city')          || 'Los Angeles';
  var ST    = p.get('state')         || 'CA';
  var PRAW  = p.get('phone_raw')     || '13235550147';
  var PDISP = p.get('phone_display') || '(323) 555-0147';

  var MAP = {
    '{{BIZ_NAME}}':      BIZ,
    '{{CITY}}':          CITY,
    '{{STATE}}':         ST,
    '{{PHONE_RAW}}':     PRAW,
    '{{PHONE_DISPLAY}}': PDISP
  };

  function sub(str) {
    return str.replace(/\{\{BIZ_NAME\}\}|\{\{CITY\}\}|\{\{STATE\}\}|\{\{PHONE_RAW\}\}|\{\{PHONE_DISPLAY\}\}/g, function (m) {
      return MAP[m] !== undefined ? MAP[m] : m;
    });
  }

  function walk(node) {
    if (!node) return;
    if (node.nodeType === 3) {          // text node
      var v = sub(node.nodeValue);
      if (v !== node.nodeValue) node.nodeValue = v;
    } else if (node.nodeType === 1) {   // element node
      var tag = node.tagName && node.tagName.toUpperCase();
      if (tag === 'SCRIPT' || tag === 'STYLE') return;
      // Replace tokenized attributes
      ['href', 'src', 'alt', 'title', 'aria-label', 'content', 'placeholder'].forEach(function (attr) {
        if (node.hasAttribute && node.hasAttribute(attr)) {
          var orig = node.getAttribute(attr);
          var repl = sub(orig);
          if (repl !== orig) node.setAttribute(attr, repl);
        }
      });
      var child = node.firstChild;
      while (child) {
        walk(child);
        child = child.nextSibling;
      }
    }
  }

  walk(document.head);
  walk(document.body);
})();
