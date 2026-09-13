// node_modules/@lit/reactive-element/css-tag.js
var t = window;
var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s = /* @__PURE__ */ Symbol();
var n = /* @__PURE__ */ new WeakMap();
var o = class {
  constructor(t3, e4, n5) {
    if (this._$cssResult$ = true, n5 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t3, this.t = e4;
  }
  get styleSheet() {
    let t3 = this.o;
    const s5 = this.t;
    if (e && void 0 === t3) {
      const e4 = void 0 !== s5 && 1 === s5.length;
      e4 && (t3 = n.get(s5)), void 0 === t3 && ((this.o = t3 = new CSSStyleSheet()).replaceSync(this.cssText), e4 && n.set(s5, t3));
    }
    return t3;
  }
  toString() {
    return this.cssText;
  }
};
var r = (t3) => new o("string" == typeof t3 ? t3 : t3 + "", void 0, s);
var i = (t3, ...e4) => {
  const n5 = 1 === t3.length ? t3[0] : e4.reduce(((e5, s5, n6) => e5 + ((t4) => {
    if (true === t4._$cssResult$) return t4.cssText;
    if ("number" == typeof t4) return t4;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t4 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s5) + t3[n6 + 1]), t3[0]);
  return new o(n5, t3, s);
};
var S = (s5, n5) => {
  e ? s5.adoptedStyleSheets = n5.map(((t3) => t3 instanceof CSSStyleSheet ? t3 : t3.styleSheet)) : n5.forEach(((e4) => {
    const n6 = document.createElement("style"), o5 = t.litNonce;
    void 0 !== o5 && n6.setAttribute("nonce", o5), n6.textContent = e4.cssText, s5.appendChild(n6);
  }));
};
var c = e ? (t3) => t3 : (t3) => t3 instanceof CSSStyleSheet ? ((t4) => {
  let e4 = "";
  for (const s5 of t4.cssRules) e4 += s5.cssText;
  return r(e4);
})(t3) : t3;

// node_modules/@lit/reactive-element/reactive-element.js
var s2;
var e2 = window;
var r2 = e2.trustedTypes;
var h = r2 ? r2.emptyScript : "";
var o2 = e2.reactiveElementPolyfillSupport;
var n2 = { toAttribute(t3, i3) {
  switch (i3) {
    case Boolean:
      t3 = t3 ? h : null;
      break;
    case Object:
    case Array:
      t3 = null == t3 ? t3 : JSON.stringify(t3);
  }
  return t3;
}, fromAttribute(t3, i3) {
  let s5 = t3;
  switch (i3) {
    case Boolean:
      s5 = null !== t3;
      break;
    case Number:
      s5 = null === t3 ? null : Number(t3);
      break;
    case Object:
    case Array:
      try {
        s5 = JSON.parse(t3);
      } catch (t4) {
        s5 = null;
      }
  }
  return s5;
} };
var a = (t3, i3) => i3 !== t3 && (i3 == i3 || t3 == t3);
var l = { attribute: true, type: String, converter: n2, reflect: false, hasChanged: a };
var d = "finalized";
var u = class extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$El = null, this._$Eu();
  }
  static addInitializer(t3) {
    var i3;
    this.finalize(), (null !== (i3 = this.h) && void 0 !== i3 ? i3 : this.h = []).push(t3);
  }
  static get observedAttributes() {
    this.finalize();
    const t3 = [];
    return this.elementProperties.forEach(((i3, s5) => {
      const e4 = this._$Ep(s5, i3);
      void 0 !== e4 && (this._$Ev.set(e4, s5), t3.push(e4));
    })), t3;
  }
  static createProperty(t3, i3 = l) {
    if (i3.state && (i3.attribute = false), this.finalize(), this.elementProperties.set(t3, i3), !i3.noAccessor && !this.prototype.hasOwnProperty(t3)) {
      const s5 = "symbol" == typeof t3 ? /* @__PURE__ */ Symbol() : "__" + t3, e4 = this.getPropertyDescriptor(t3, s5, i3);
      void 0 !== e4 && Object.defineProperty(this.prototype, t3, e4);
    }
  }
  static getPropertyDescriptor(t3, i3, s5) {
    return { get() {
      return this[i3];
    }, set(e4) {
      const r4 = this[t3];
      this[i3] = e4, this.requestUpdate(t3, r4, s5);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t3) {
    return this.elementProperties.get(t3) || l;
  }
  static finalize() {
    if (this.hasOwnProperty(d)) return false;
    this[d] = true;
    const t3 = Object.getPrototypeOf(this);
    if (t3.finalize(), void 0 !== t3.h && (this.h = [...t3.h]), this.elementProperties = new Map(t3.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const t4 = this.properties, i3 = [...Object.getOwnPropertyNames(t4), ...Object.getOwnPropertySymbols(t4)];
      for (const s5 of i3) this.createProperty(s5, t4[s5]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), true;
  }
  static finalizeStyles(i3) {
    const s5 = [];
    if (Array.isArray(i3)) {
      const e4 = new Set(i3.flat(1 / 0).reverse());
      for (const i4 of e4) s5.unshift(c(i4));
    } else void 0 !== i3 && s5.push(c(i3));
    return s5;
  }
  static _$Ep(t3, i3) {
    const s5 = i3.attribute;
    return false === s5 ? void 0 : "string" == typeof s5 ? s5 : "string" == typeof t3 ? t3.toLowerCase() : void 0;
  }
  _$Eu() {
    var t3;
    this._$E_ = new Promise(((t4) => this.enableUpdating = t4)), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), null === (t3 = this.constructor.h) || void 0 === t3 || t3.forEach(((t4) => t4(this)));
  }
  addController(t3) {
    var i3, s5;
    (null !== (i3 = this._$ES) && void 0 !== i3 ? i3 : this._$ES = []).push(t3), void 0 !== this.renderRoot && this.isConnected && (null === (s5 = t3.hostConnected) || void 0 === s5 || s5.call(t3));
  }
  removeController(t3) {
    var i3;
    null === (i3 = this._$ES) || void 0 === i3 || i3.splice(this._$ES.indexOf(t3) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach(((t3, i3) => {
      this.hasOwnProperty(i3) && (this._$Ei.set(i3, this[i3]), delete this[i3]);
    }));
  }
  createRenderRoot() {
    var t3;
    const s5 = null !== (t3 = this.shadowRoot) && void 0 !== t3 ? t3 : this.attachShadow(this.constructor.shadowRootOptions);
    return S(s5, this.constructor.elementStyles), s5;
  }
  connectedCallback() {
    var t3;
    void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), null === (t3 = this._$ES) || void 0 === t3 || t3.forEach(((t4) => {
      var i3;
      return null === (i3 = t4.hostConnected) || void 0 === i3 ? void 0 : i3.call(t4);
    }));
  }
  enableUpdating(t3) {
  }
  disconnectedCallback() {
    var t3;
    null === (t3 = this._$ES) || void 0 === t3 || t3.forEach(((t4) => {
      var i3;
      return null === (i3 = t4.hostDisconnected) || void 0 === i3 ? void 0 : i3.call(t4);
    }));
  }
  attributeChangedCallback(t3, i3, s5) {
    this._$AK(t3, s5);
  }
  _$EO(t3, i3, s5 = l) {
    var e4;
    const r4 = this.constructor._$Ep(t3, s5);
    if (void 0 !== r4 && true === s5.reflect) {
      const h3 = (void 0 !== (null === (e4 = s5.converter) || void 0 === e4 ? void 0 : e4.toAttribute) ? s5.converter : n2).toAttribute(i3, s5.type);
      this._$El = t3, null == h3 ? this.removeAttribute(r4) : this.setAttribute(r4, h3), this._$El = null;
    }
  }
  _$AK(t3, i3) {
    var s5;
    const e4 = this.constructor, r4 = e4._$Ev.get(t3);
    if (void 0 !== r4 && this._$El !== r4) {
      const t4 = e4.getPropertyOptions(r4), h3 = "function" == typeof t4.converter ? { fromAttribute: t4.converter } : void 0 !== (null === (s5 = t4.converter) || void 0 === s5 ? void 0 : s5.fromAttribute) ? t4.converter : n2;
      this._$El = r4, this[r4] = h3.fromAttribute(i3, t4.type), this._$El = null;
    }
  }
  requestUpdate(t3, i3, s5) {
    let e4 = true;
    void 0 !== t3 && (((s5 = s5 || this.constructor.getPropertyOptions(t3)).hasChanged || a)(this[t3], i3) ? (this._$AL.has(t3) || this._$AL.set(t3, i3), true === s5.reflect && this._$El !== t3 && (void 0 === this._$EC && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t3, s5))) : e4 = false), !this.isUpdatePending && e4 && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = true;
    try {
      await this._$E_;
    } catch (t4) {
      Promise.reject(t4);
    }
    const t3 = this.scheduleUpdate();
    return null != t3 && await t3, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t3;
    if (!this.isUpdatePending) return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach(((t4, i4) => this[i4] = t4)), this._$Ei = void 0);
    let i3 = false;
    const s5 = this._$AL;
    try {
      i3 = this.shouldUpdate(s5), i3 ? (this.willUpdate(s5), null === (t3 = this._$ES) || void 0 === t3 || t3.forEach(((t4) => {
        var i4;
        return null === (i4 = t4.hostUpdate) || void 0 === i4 ? void 0 : i4.call(t4);
      })), this.update(s5)) : this._$Ek();
    } catch (t4) {
      throw i3 = false, this._$Ek(), t4;
    }
    i3 && this._$AE(s5);
  }
  willUpdate(t3) {
  }
  _$AE(t3) {
    var i3;
    null === (i3 = this._$ES) || void 0 === i3 || i3.forEach(((t4) => {
      var i4;
      return null === (i4 = t4.hostUpdated) || void 0 === i4 ? void 0 : i4.call(t4);
    })), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t3)), this.updated(t3);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t3) {
    return true;
  }
  update(t3) {
    void 0 !== this._$EC && (this._$EC.forEach(((t4, i3) => this._$EO(i3, this[i3], t4))), this._$EC = void 0), this._$Ek();
  }
  updated(t3) {
  }
  firstUpdated(t3) {
  }
};
u[d] = true, u.elementProperties = /* @__PURE__ */ new Map(), u.elementStyles = [], u.shadowRootOptions = { mode: "open" }, null == o2 || o2({ ReactiveElement: u }), (null !== (s2 = e2.reactiveElementVersions) && void 0 !== s2 ? s2 : e2.reactiveElementVersions = []).push("1.6.3");

// node_modules/lit-html/lit-html.js
var t2;
var i2 = window;
var s3 = i2.trustedTypes;
var e3 = s3 ? s3.createPolicy("lit-html", { createHTML: (t3) => t3 }) : void 0;
var o3 = "$lit$";
var n3 = `lit$${(Math.random() + "").slice(9)}$`;
var l2 = "?" + n3;
var h2 = `<${l2}>`;
var r3 = document;
var u2 = () => r3.createComment("");
var d2 = (t3) => null === t3 || "object" != typeof t3 && "function" != typeof t3;
var c2 = Array.isArray;
var v = (t3) => c2(t3) || "function" == typeof (null == t3 ? void 0 : t3[Symbol.iterator]);
var a2 = "[ 	\n\f\r]";
var f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var _ = /-->/g;
var m = />/g;
var p = RegExp(`>|${a2}(?:([^\\s"'>=/]+)(${a2}*=${a2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var g = /'/g;
var $ = /"/g;
var y = /^(?:script|style|textarea|title)$/i;
var w = (t3) => (i3, ...s5) => ({ _$litType$: t3, strings: i3, values: s5 });
var x = w(1);
var b = w(2);
var T = /* @__PURE__ */ Symbol.for("lit-noChange");
var A = /* @__PURE__ */ Symbol.for("lit-nothing");
var E = /* @__PURE__ */ new WeakMap();
var C = r3.createTreeWalker(r3, 129, null, false);
function P(t3, i3) {
  if (!Array.isArray(t3) || !t3.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e3 ? e3.createHTML(i3) : i3;
}
var V = (t3, i3) => {
  const s5 = t3.length - 1, e4 = [];
  let l4, r4 = 2 === i3 ? "<svg>" : "", u3 = f;
  for (let i4 = 0; i4 < s5; i4++) {
    const s6 = t3[i4];
    let d3, c3, v2 = -1, a3 = 0;
    for (; a3 < s6.length && (u3.lastIndex = a3, c3 = u3.exec(s6), null !== c3); ) a3 = u3.lastIndex, u3 === f ? "!--" === c3[1] ? u3 = _ : void 0 !== c3[1] ? u3 = m : void 0 !== c3[2] ? (y.test(c3[2]) && (l4 = RegExp("</" + c3[2], "g")), u3 = p) : void 0 !== c3[3] && (u3 = p) : u3 === p ? ">" === c3[0] ? (u3 = null != l4 ? l4 : f, v2 = -1) : void 0 === c3[1] ? v2 = -2 : (v2 = u3.lastIndex - c3[2].length, d3 = c3[1], u3 = void 0 === c3[3] ? p : '"' === c3[3] ? $ : g) : u3 === $ || u3 === g ? u3 = p : u3 === _ || u3 === m ? u3 = f : (u3 = p, l4 = void 0);
    const w2 = u3 === p && t3[i4 + 1].startsWith("/>") ? " " : "";
    r4 += u3 === f ? s6 + h2 : v2 >= 0 ? (e4.push(d3), s6.slice(0, v2) + o3 + s6.slice(v2) + n3 + w2) : s6 + n3 + (-2 === v2 ? (e4.push(void 0), i4) : w2);
  }
  return [P(t3, r4 + (t3[s5] || "<?>") + (2 === i3 ? "</svg>" : "")), e4];
};
var N = class _N {
  constructor({ strings: t3, _$litType$: i3 }, e4) {
    let h3;
    this.parts = [];
    let r4 = 0, d3 = 0;
    const c3 = t3.length - 1, v2 = this.parts, [a3, f2] = V(t3, i3);
    if (this.el = _N.createElement(a3, e4), C.currentNode = this.el.content, 2 === i3) {
      const t4 = this.el.content, i4 = t4.firstChild;
      i4.remove(), t4.append(...i4.childNodes);
    }
    for (; null !== (h3 = C.nextNode()) && v2.length < c3; ) {
      if (1 === h3.nodeType) {
        if (h3.hasAttributes()) {
          const t4 = [];
          for (const i4 of h3.getAttributeNames()) if (i4.endsWith(o3) || i4.startsWith(n3)) {
            const s5 = f2[d3++];
            if (t4.push(i4), void 0 !== s5) {
              const t5 = h3.getAttribute(s5.toLowerCase() + o3).split(n3), i5 = /([.?@])?(.*)/.exec(s5);
              v2.push({ type: 1, index: r4, name: i5[2], strings: t5, ctor: "." === i5[1] ? H : "?" === i5[1] ? L : "@" === i5[1] ? z : k });
            } else v2.push({ type: 6, index: r4 });
          }
          for (const i4 of t4) h3.removeAttribute(i4);
        }
        if (y.test(h3.tagName)) {
          const t4 = h3.textContent.split(n3), i4 = t4.length - 1;
          if (i4 > 0) {
            h3.textContent = s3 ? s3.emptyScript : "";
            for (let s5 = 0; s5 < i4; s5++) h3.append(t4[s5], u2()), C.nextNode(), v2.push({ type: 2, index: ++r4 });
            h3.append(t4[i4], u2());
          }
        }
      } else if (8 === h3.nodeType) if (h3.data === l2) v2.push({ type: 2, index: r4 });
      else {
        let t4 = -1;
        for (; -1 !== (t4 = h3.data.indexOf(n3, t4 + 1)); ) v2.push({ type: 7, index: r4 }), t4 += n3.length - 1;
      }
      r4++;
    }
  }
  static createElement(t3, i3) {
    const s5 = r3.createElement("template");
    return s5.innerHTML = t3, s5;
  }
};
function S2(t3, i3, s5 = t3, e4) {
  var o5, n5, l4, h3;
  if (i3 === T) return i3;
  let r4 = void 0 !== e4 ? null === (o5 = s5._$Co) || void 0 === o5 ? void 0 : o5[e4] : s5._$Cl;
  const u3 = d2(i3) ? void 0 : i3._$litDirective$;
  return (null == r4 ? void 0 : r4.constructor) !== u3 && (null === (n5 = null == r4 ? void 0 : r4._$AO) || void 0 === n5 || n5.call(r4, false), void 0 === u3 ? r4 = void 0 : (r4 = new u3(t3), r4._$AT(t3, s5, e4)), void 0 !== e4 ? (null !== (l4 = (h3 = s5)._$Co) && void 0 !== l4 ? l4 : h3._$Co = [])[e4] = r4 : s5._$Cl = r4), void 0 !== r4 && (i3 = S2(t3, r4._$AS(t3, i3.values), r4, e4)), i3;
}
var M = class {
  constructor(t3, i3) {
    this._$AV = [], this._$AN = void 0, this._$AD = t3, this._$AM = i3;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t3) {
    var i3;
    const { el: { content: s5 }, parts: e4 } = this._$AD, o5 = (null !== (i3 = null == t3 ? void 0 : t3.creationScope) && void 0 !== i3 ? i3 : r3).importNode(s5, true);
    C.currentNode = o5;
    let n5 = C.nextNode(), l4 = 0, h3 = 0, u3 = e4[0];
    for (; void 0 !== u3; ) {
      if (l4 === u3.index) {
        let i4;
        2 === u3.type ? i4 = new R(n5, n5.nextSibling, this, t3) : 1 === u3.type ? i4 = new u3.ctor(n5, u3.name, u3.strings, this, t3) : 6 === u3.type && (i4 = new Z(n5, this, t3)), this._$AV.push(i4), u3 = e4[++h3];
      }
      l4 !== (null == u3 ? void 0 : u3.index) && (n5 = C.nextNode(), l4++);
    }
    return C.currentNode = r3, o5;
  }
  v(t3) {
    let i3 = 0;
    for (const s5 of this._$AV) void 0 !== s5 && (void 0 !== s5.strings ? (s5._$AI(t3, s5, i3), i3 += s5.strings.length - 2) : s5._$AI(t3[i3])), i3++;
  }
};
var R = class _R {
  constructor(t3, i3, s5, e4) {
    var o5;
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t3, this._$AB = i3, this._$AM = s5, this.options = e4, this._$Cp = null === (o5 = null == e4 ? void 0 : e4.isConnected) || void 0 === o5 || o5;
  }
  get _$AU() {
    var t3, i3;
    return null !== (i3 = null === (t3 = this._$AM) || void 0 === t3 ? void 0 : t3._$AU) && void 0 !== i3 ? i3 : this._$Cp;
  }
  get parentNode() {
    let t3 = this._$AA.parentNode;
    const i3 = this._$AM;
    return void 0 !== i3 && 11 === (null == t3 ? void 0 : t3.nodeType) && (t3 = i3.parentNode), t3;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t3, i3 = this) {
    t3 = S2(this, t3, i3), d2(t3) ? t3 === A || null == t3 || "" === t3 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t3 !== this._$AH && t3 !== T && this._(t3) : void 0 !== t3._$litType$ ? this.g(t3) : void 0 !== t3.nodeType ? this.$(t3) : v(t3) ? this.T(t3) : this._(t3);
  }
  k(t3) {
    return this._$AA.parentNode.insertBefore(t3, this._$AB);
  }
  $(t3) {
    this._$AH !== t3 && (this._$AR(), this._$AH = this.k(t3));
  }
  _(t3) {
    this._$AH !== A && d2(this._$AH) ? this._$AA.nextSibling.data = t3 : this.$(r3.createTextNode(t3)), this._$AH = t3;
  }
  g(t3) {
    var i3;
    const { values: s5, _$litType$: e4 } = t3, o5 = "number" == typeof e4 ? this._$AC(t3) : (void 0 === e4.el && (e4.el = N.createElement(P(e4.h, e4.h[0]), this.options)), e4);
    if ((null === (i3 = this._$AH) || void 0 === i3 ? void 0 : i3._$AD) === o5) this._$AH.v(s5);
    else {
      const t4 = new M(o5, this), i4 = t4.u(this.options);
      t4.v(s5), this.$(i4), this._$AH = t4;
    }
  }
  _$AC(t3) {
    let i3 = E.get(t3.strings);
    return void 0 === i3 && E.set(t3.strings, i3 = new N(t3)), i3;
  }
  T(t3) {
    c2(this._$AH) || (this._$AH = [], this._$AR());
    const i3 = this._$AH;
    let s5, e4 = 0;
    for (const o5 of t3) e4 === i3.length ? i3.push(s5 = new _R(this.k(u2()), this.k(u2()), this, this.options)) : s5 = i3[e4], s5._$AI(o5), e4++;
    e4 < i3.length && (this._$AR(s5 && s5._$AB.nextSibling, e4), i3.length = e4);
  }
  _$AR(t3 = this._$AA.nextSibling, i3) {
    var s5;
    for (null === (s5 = this._$AP) || void 0 === s5 || s5.call(this, false, true, i3); t3 && t3 !== this._$AB; ) {
      const i4 = t3.nextSibling;
      t3.remove(), t3 = i4;
    }
  }
  setConnected(t3) {
    var i3;
    void 0 === this._$AM && (this._$Cp = t3, null === (i3 = this._$AP) || void 0 === i3 || i3.call(this, t3));
  }
};
var k = class {
  constructor(t3, i3, s5, e4, o5) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t3, this.name = i3, this._$AM = e4, this.options = o5, s5.length > 2 || "" !== s5[0] || "" !== s5[1] ? (this._$AH = Array(s5.length - 1).fill(new String()), this.strings = s5) : this._$AH = A;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t3, i3 = this, s5, e4) {
    const o5 = this.strings;
    let n5 = false;
    if (void 0 === o5) t3 = S2(this, t3, i3, 0), n5 = !d2(t3) || t3 !== this._$AH && t3 !== T, n5 && (this._$AH = t3);
    else {
      const e5 = t3;
      let l4, h3;
      for (t3 = o5[0], l4 = 0; l4 < o5.length - 1; l4++) h3 = S2(this, e5[s5 + l4], i3, l4), h3 === T && (h3 = this._$AH[l4]), n5 || (n5 = !d2(h3) || h3 !== this._$AH[l4]), h3 === A ? t3 = A : t3 !== A && (t3 += (null != h3 ? h3 : "") + o5[l4 + 1]), this._$AH[l4] = h3;
    }
    n5 && !e4 && this.j(t3);
  }
  j(t3) {
    t3 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t3 ? t3 : "");
  }
};
var H = class extends k {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t3) {
    this.element[this.name] = t3 === A ? void 0 : t3;
  }
};
var I = s3 ? s3.emptyScript : "";
var L = class extends k {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t3) {
    t3 && t3 !== A ? this.element.setAttribute(this.name, I) : this.element.removeAttribute(this.name);
  }
};
var z = class extends k {
  constructor(t3, i3, s5, e4, o5) {
    super(t3, i3, s5, e4, o5), this.type = 5;
  }
  _$AI(t3, i3 = this) {
    var s5;
    if ((t3 = null !== (s5 = S2(this, t3, i3, 0)) && void 0 !== s5 ? s5 : A) === T) return;
    const e4 = this._$AH, o5 = t3 === A && e4 !== A || t3.capture !== e4.capture || t3.once !== e4.once || t3.passive !== e4.passive, n5 = t3 !== A && (e4 === A || o5);
    o5 && this.element.removeEventListener(this.name, this, e4), n5 && this.element.addEventListener(this.name, this, t3), this._$AH = t3;
  }
  handleEvent(t3) {
    var i3, s5;
    "function" == typeof this._$AH ? this._$AH.call(null !== (s5 = null === (i3 = this.options) || void 0 === i3 ? void 0 : i3.host) && void 0 !== s5 ? s5 : this.element, t3) : this._$AH.handleEvent(t3);
  }
};
var Z = class {
  constructor(t3, i3, s5) {
    this.element = t3, this.type = 6, this._$AN = void 0, this._$AM = i3, this.options = s5;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t3) {
    S2(this, t3);
  }
};
var B = i2.litHtmlPolyfillSupport;
null == B || B(N, R), (null !== (t2 = i2.litHtmlVersions) && void 0 !== t2 ? t2 : i2.litHtmlVersions = []).push("2.8.0");
var D = (t3, i3, s5) => {
  var e4, o5;
  const n5 = null !== (e4 = null == s5 ? void 0 : s5.renderBefore) && void 0 !== e4 ? e4 : i3;
  let l4 = n5._$litPart$;
  if (void 0 === l4) {
    const t4 = null !== (o5 = null == s5 ? void 0 : s5.renderBefore) && void 0 !== o5 ? o5 : null;
    n5._$litPart$ = l4 = new R(i3.insertBefore(u2(), t4), t4, void 0, null != s5 ? s5 : {});
  }
  return l4._$AI(t3), l4;
};

// node_modules/lit-element/lit-element.js
var l3;
var o4;
var s4 = class extends u {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t3, e4;
    const i3 = super.createRenderRoot();
    return null !== (t3 = (e4 = this.renderOptions).renderBefore) && void 0 !== t3 || (e4.renderBefore = i3.firstChild), i3;
  }
  update(t3) {
    const i3 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t3), this._$Do = D(i3, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t3;
    super.connectedCallback(), null === (t3 = this._$Do) || void 0 === t3 || t3.setConnected(true);
  }
  disconnectedCallback() {
    var t3;
    super.disconnectedCallback(), null === (t3 = this._$Do) || void 0 === t3 || t3.setConnected(false);
  }
  render() {
    return T;
  }
};
s4.finalized = true, s4._$litElement$ = true, null === (l3 = globalThis.litElementHydrateSupport) || void 0 === l3 || l3.call(globalThis, { LitElement: s4 });
var n4 = globalThis.litElementPolyfillSupport;
null == n4 || n4({ LitElement: s4 });
(null !== (o4 = globalThis.litElementVersions) && void 0 !== o4 ? o4 : globalThis.litElementVersions = []).push("3.3.3");

// src/const.js
var CARD_TYPE = "ha-vertical-action-card";
var EDITOR_TYPE = "ha-vertical-action-card-editor";
var CARD_NAME = "Vertical Action Card";
var CARD_VERSION = "2026.09.12.1";
var VIEW_SWITCH = "switch";
var VIEW_SLIDER = "slider";
var VIEW_PRESET = "preset";
var ALL_VIEWS = [VIEW_SWITCH, VIEW_SLIDER, VIEW_PRESET];
var TOGGLE_DOMAINS = [
  "light",
  "switch",
  "fan",
  "input_boolean",
  "humidifier",
  "media_player",
  "climate",
  "water_heater",
  "cover",
  "valve"
];
var RANGE_DOMAINS = [
  "light",
  "fan",
  "cover",
  "valve",
  "media_player",
  "climate",
  "humidifier",
  "water_heater",
  "number",
  "input_number"
];
var DEFAULT_PRESETS = [0, 50, 100];
var DEFAULT_DOUBLE_CLICK_SPEED = 800;
var HOLD_TIME = 550;
var DRAG_THRESHOLD = 6;
var VIEW_LABELS = {
  [VIEW_SWITCH]: "Switch / Toggle",
  [VIEW_SLIDER]: "Slider",
  [VIEW_PRESET]: "Preset"
};
function computeDomain(entityId) {
  return entityId.substr(0, entityId.indexOf("."));
}
function domainSupportsView(domain, view) {
  if (view === VIEW_SWITCH) return TOGGLE_DOMAINS.includes(domain);
  if (view === VIEW_SLIDER || view === VIEW_PRESET) {
    return RANGE_DOMAINS.includes(domain);
  }
  return false;
}
function supportedViewsForDomain(domain) {
  return ALL_VIEWS.filter((v2) => domainSupportsView(domain, v2));
}

// src/colors.js
var GENERIC_ACTIVE_FALLBACK = "#FDD835";
var GENERIC_INACTIVE_FALLBACK = "#44739e";
var CLIMATE_COLORS = {
  heat: "#FF6262",
  heating: "#FF6262",
  cool: "#039BE5",
  cooling: "#039BE5",
  fan_only: "#0da035",
  dry: "#e0b400",
  drying: "#e0b400",
  auto: "#ff8100",
  heat_cool: "#ff8100",
  idle: GENERIC_INACTIVE_FALLBACK,
  off: GENERIC_INACTIVE_FALLBACK
};
function activeColorForDomain(domain) {
  return `var(--state-${domain}-active-color, var(--state-active-color, ${GENERIC_ACTIVE_FALLBACK}))`;
}
function climateColor(stateObj) {
  const mode = stateObj.attributes.hvac_action || stateObj.state || "off";
  const fallback = CLIMATE_COLORS[mode] || GENERIC_INACTIVE_FALLBACK;
  return `var(--state-climate-${mode}-color, var(--state-climate-active-color, ${fallback}))`;
}
function stateActiveColor(domain, stateObj) {
  if (domain === "climate") return climateColor(stateObj);
  return activeColorForDomain(domain);
}
function clampNum(v2, min, max) {
  return Math.min(max, Math.max(min, v2));
}
function lightCurrentColor(stateObj) {
  if (!stateObj || stateObj.state !== "on") return null;
  const a3 = stateObj.attributes || {};
  if (Array.isArray(a3.rgb_color) && a3.rgb_color.length === 3) {
    const [r4, g2, b2] = a3.rgb_color;
    return `rgb(${r4}, ${g2}, ${b2})`;
  }
  if (Array.isArray(a3.rgbw_color) && a3.rgbw_color.length >= 3) {
    const [r4, g2, b2] = a3.rgbw_color;
    return `rgb(${r4}, ${g2}, ${b2})`;
  }
  if (Array.isArray(a3.rgbww_color) && a3.rgbww_color.length >= 3) {
    const [r4, g2, b2] = a3.rgbww_color;
    return `rgb(${r4}, ${g2}, ${b2})`;
  }
  if (Array.isArray(a3.hs_color) && a3.hs_color.length === 2) {
    const [h3, s5] = a3.hs_color;
    return `hsl(${h3}, ${clampNum(s5, 0, 100)}%, 50%)`;
  }
  const kelvin = a3.color_temp_kelvin || (a3.color_temp ? Math.round(1e6 / a3.color_temp) : null);
  if (kelvin) return kelvinToRgb(kelvin);
  return null;
}
function kelvinToRgb(kelvin) {
  const temp = clampNum(kelvin, 1e3, 4e4) / 100;
  let r4, g2, b2;
  r4 = temp <= 66 ? 255 : 329.698727446 * Math.pow(temp - 60, -0.1332047592);
  g2 = temp <= 66 ? 99.4708025861 * Math.log(temp) - 161.1195681661 : 288.1221695283 * Math.pow(temp - 60, -0.0755148492);
  b2 = temp >= 66 ? 255 : temp <= 19 ? 0 : 138.5177312231 * Math.log(temp - 10) - 305.0447927307;
  const byte = (v2) => Math.round(clampNum(v2, 0, 255));
  return `rgb(${byte(r4)}, ${byte(g2)}, ${byte(b2)})`;
}

// src/cover.js
var COVER_SUPPORT_OPEN = 1;
var COVER_SUPPORT_CLOSE = 2;
var COVER_SUPPORT_SET_POSITION = 4;
var COVER_SUPPORT_OPEN_TILT = 16;
var COVER_SUPPORT_CLOSE_TILT = 32;
var COVER_SUPPORT_SET_TILT_POSITION = 128;
function coverSupportedFeatures(stateObj) {
  return Number(stateObj && stateObj.attributes.supported_features || 0);
}
function coverControlMode(stateObj, domain) {
  if (domain === "valve") return "position";
  const features = coverSupportedFeatures(stateObj);
  if ((features & COVER_SUPPORT_SET_POSITION) !== 0) return "position";
  if ((features & COVER_SUPPORT_SET_TILT_POSITION) !== 0) return "tilt";
  return "none";
}

// src/range.js
function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
function roundToStep(value, min, step) {
  if (!step) return Math.round(value);
  const steps = Math.round((value - min) / step);
  const result = min + steps * step;
  return Math.round(result * 1e3) / 1e3;
}
function getRangeState(hass, stateObj, domain, config) {
  const attrs = stateObj.attributes || {};
  const invert = !!config.invert_cover_close;
  const unavailable = stateObj.state === "unavailable";
  switch (domain) {
    case "light": {
      const supportsBrightness = !attrs.supported_color_modes || attrs.supported_color_modes.some((m2) => m2 !== "onoff");
      const brightness = attrs.brightness;
      const percent = stateObj.state === "on" && typeof brightness === "number" ? Math.round(brightness / 255 * 100) : 0;
      return {
        percent,
        min: 0,
        max: 100,
        unit: "%",
        display: `${percent}%`,
        available: !unavailable && supportsBrightness
      };
    }
    case "fan": {
      const supportsSpeed = typeof attrs.percentage === "number" || attrs.percentage_step;
      const percent = Math.round(attrs.percentage || 0);
      return {
        percent,
        min: 0,
        max: 100,
        unit: "%",
        display: `${percent}%`,
        available: !unavailable && supportsSpeed
      };
    }
    case "cover":
    case "valve": {
      const mode = coverControlMode(stateObj, domain);
      const posAttr = mode === "tilt" ? "current_tilt_position" : "current_position";
      const rawPos = typeof attrs[posAttr] === "number" ? attrs[posAttr] : stateObj.state === "open" ? 100 : 0;
      const percent = invert ? 100 - rawPos : rawPos;
      return {
        percent: clamp(percent, 0, 100),
        min: 0,
        max: 100,
        unit: "%",
        display: `${Math.round(percent)}%`,
        available: !unavailable && mode !== "none"
      };
    }
    case "media_player": {
      const supportsVolume = typeof attrs.volume_level === "number";
      const percent = Math.round((attrs.volume_level || 0) * 100);
      return {
        percent,
        min: 0,
        max: 100,
        unit: "%",
        display: `${percent}%`,
        available: !unavailable && supportsVolume
      };
    }
    case "climate": {
      const min = typeof attrs.min_temp === "number" ? attrs.min_temp : 7;
      const max = typeof attrs.max_temp === "number" ? attrs.max_temp : 35;
      const step = attrs.target_temp_step || 0.5;
      const unit = hass.config?.unit_system?.temperature || "";
      const hasTarget = typeof attrs.temperature === "number";
      const temperature = hasTarget ? attrs.temperature : min;
      const percent = clamp((temperature - min) / (max - min) * 100, 0, 100);
      return {
        percent,
        min,
        max,
        step,
        unit,
        display: hasTarget ? `${temperature}${unit}` : "\u2014",
        available: !unavailable && hasTarget && stateObj.state !== "off"
      };
    }
    case "humidifier": {
      const min = typeof attrs.min_humidity === "number" ? attrs.min_humidity : 0;
      const max = typeof attrs.max_humidity === "number" ? attrs.max_humidity : 100;
      const hasTarget = typeof attrs.humidity === "number";
      const humidity = hasTarget ? attrs.humidity : min;
      const percent = clamp((humidity - min) / (max - min) * 100, 0, 100);
      return {
        percent,
        min,
        max,
        unit: "%",
        display: hasTarget ? `${humidity}%` : "\u2014",
        available: !unavailable && hasTarget
      };
    }
    case "water_heater": {
      const min = typeof attrs.min_temp === "number" ? attrs.min_temp : 35;
      const max = typeof attrs.max_temp === "number" ? attrs.max_temp : 140;
      const unit = hass.config?.unit_system?.temperature || "";
      const hasTarget = typeof attrs.temperature === "number";
      const temperature = hasTarget ? attrs.temperature : min;
      const percent = clamp((temperature - min) / (max - min) * 100, 0, 100);
      return {
        percent,
        min,
        max,
        unit,
        display: hasTarget ? `${temperature}${unit}` : "\u2014",
        available: !unavailable && hasTarget && stateObj.state !== "off"
      };
    }
    case "number":
    case "input_number": {
      const min = typeof attrs.min === "number" ? attrs.min : 0;
      const max = typeof attrs.max === "number" ? attrs.max : 100;
      const step = attrs.step || 1;
      const value = parseFloat(stateObj.state);
      const hasValue = !Number.isNaN(value);
      const percent = clamp(
        ((hasValue ? value : min) - min) / (max - min) * 100,
        0,
        100
      );
      const unit = attrs.unit_of_measurement || "";
      return {
        percent,
        min,
        max,
        step,
        unit,
        display: hasValue ? `${value}${unit ? " " + unit : ""}` : "\u2014",
        available: !unavailable
      };
    }
    default:
      return { percent: 0, min: 0, max: 100, unit: "", display: "", available: false };
  }
}
function setRangeValue(hass, stateObj, domain, config, percent) {
  const entity_id = stateObj.entity_id;
  const attrs = stateObj.attributes || {};
  const invert = !!config.invert_cover_close;
  const p2 = clamp(Math.round(percent), 0, 100);
  switch (domain) {
    case "light": {
      if (p2 <= 0) {
        return hass.callService("light", "turn_off", { entity_id });
      }
      return hass.callService("light", "turn_on", {
        entity_id,
        brightness_pct: p2
      });
    }
    case "fan": {
      return hass.callService("fan", "set_percentage", {
        entity_id,
        percentage: p2
      });
    }
    case "cover": {
      const mode = coverControlMode(stateObj, "cover");
      if (mode === "none") return void 0;
      const position = invert ? 100 - p2 : p2;
      if (mode === "tilt") {
        return hass.callService("cover", "set_cover_tilt_position", {
          entity_id,
          tilt_position: position
        });
      }
      return hass.callService("cover", "set_cover_position", {
        entity_id,
        position
      });
    }
    case "valve": {
      const position = invert ? 100 - p2 : p2;
      return hass.callService("valve", "set_valve_position", {
        entity_id,
        position
      });
    }
    case "media_player": {
      return hass.callService("media_player", "volume_set", {
        entity_id,
        volume_level: p2 / 100
      });
    }
    case "climate": {
      const min = typeof attrs.min_temp === "number" ? attrs.min_temp : 7;
      const max = typeof attrs.max_temp === "number" ? attrs.max_temp : 35;
      const step = attrs.target_temp_step || 0.5;
      const raw = min + p2 / 100 * (max - min);
      return hass.callService("climate", "set_temperature", {
        entity_id,
        temperature: roundToStep(raw, min, step)
      });
    }
    case "humidifier": {
      const min = typeof attrs.min_humidity === "number" ? attrs.min_humidity : 0;
      const max = typeof attrs.max_humidity === "number" ? attrs.max_humidity : 100;
      const raw = min + p2 / 100 * (max - min);
      return hass.callService("humidifier", "set_humidity", {
        entity_id,
        humidity: Math.round(raw)
      });
    }
    case "water_heater": {
      const min = typeof attrs.min_temp === "number" ? attrs.min_temp : 35;
      const max = typeof attrs.max_temp === "number" ? attrs.max_temp : 140;
      const raw = min + p2 / 100 * (max - min);
      return hass.callService("water_heater", "set_temperature", {
        entity_id,
        temperature: Math.round(raw * 10) / 10
      });
    }
    case "number": {
      const min = typeof attrs.min === "number" ? attrs.min : 0;
      const max = typeof attrs.max === "number" ? attrs.max : 100;
      const step = attrs.step || 1;
      const raw = min + p2 / 100 * (max - min);
      return hass.callService("number", "set_value", {
        entity_id,
        value: roundToStep(raw, min, step)
      });
    }
    case "input_number": {
      const min = typeof attrs.min === "number" ? attrs.min : 0;
      const max = typeof attrs.max === "number" ? attrs.max : 100;
      const step = attrs.step || 1;
      const raw = min + p2 / 100 * (max - min);
      return hass.callService("input_number", "set_value", {
        entity_id,
        value: roundToStep(raw, min, step)
      });
    }
    default:
      return void 0;
  }
}

// src/toggle.js
function coverClosedPosition(config) {
  return config && config.invert_cover_close ? 100 : 0;
}
function coverOpenPosition(config) {
  const p2 = config && config.cover_open_position;
  return typeof p2 === "number" && !Number.isNaN(p2) ? p2 : 50;
}
function isEntityOn(stateObj, domain, config) {
  if (!stateObj) return false;
  const state = stateObj.state;
  if (domain === "cover" || domain === "valve") {
    const mode = coverControlMode(stateObj, domain);
    const posAttr = mode === "tilt" ? "current_tilt_position" : "current_position";
    const pos = stateObj.attributes[posAttr];
    if (typeof pos === "number") {
      const closedPos = coverClosedPosition(config);
      return closedPos === 0 ? pos > 3 : pos < 97;
    }
    if (state === "open" || state === "opening") return true;
    if (state === "closed" || state === "closing") return false;
    return false;
  }
  if (domain === "climate" || domain === "water_heater") {
    return state !== "off" && state !== "unavailable" && state !== "unknown";
  }
  if (domain === "media_player") {
    return state !== "off" && state !== "unavailable" && state !== "unknown" && state !== "standby";
  }
  return state === "on";
}
function toggleCoverLike(hass, stateObj, domain, config) {
  const entity_id = stateObj.entity_id;
  const mode = coverControlMode(stateObj, domain);
  const on = isEntityOn(stateObj, domain, config);
  const targetPos = on ? coverClosedPosition(config) : coverOpenPosition(config);
  if (mode === "position") {
    const service = domain === "valve" ? "set_valve_position" : "set_cover_position";
    return hass.callService(domain, service, { entity_id, position: targetPos });
  }
  if (mode === "tilt") {
    return hass.callService("cover", "set_cover_tilt_position", {
      entity_id,
      tilt_position: targetPos
    });
  }
  const opening = !on;
  if (domain === "valve") {
    return hass.callService("valve", opening ? "open_valve" : "close_valve", {
      entity_id
    });
  }
  const features = coverSupportedFeatures(stateObj);
  const canOpen = (features & COVER_SUPPORT_OPEN) !== 0;
  const canClose = (features & COVER_SUPPORT_CLOSE) !== 0;
  const canOpenTilt = (features & COVER_SUPPORT_OPEN_TILT) !== 0;
  const canCloseTilt = (features & COVER_SUPPORT_CLOSE_TILT) !== 0;
  if (opening) {
    if (canOpen) return hass.callService("cover", "open_cover", { entity_id });
    if (canOpenTilt) return hass.callService("cover", "open_cover_tilt", { entity_id });
  } else {
    if (canClose) return hass.callService("cover", "close_cover", { entity_id });
    if (canCloseTilt) return hass.callService("cover", "close_cover_tilt", { entity_id });
  }
  return void 0;
}
function toggleEntity(hass, stateObj, domain, config) {
  const entity_id = stateObj.entity_id;
  if (domain === "cover" || domain === "valve") {
    return toggleCoverLike(hass, stateObj, domain, config);
  }
  return hass.callService("homeassistant", "toggle", { entity_id });
}
function humanizeState(stateObj, domain, on) {
  if (!stateObj) return "";
  const state = stateObj.state;
  if (state === "unavailable") return "Unavailable";
  if (state === "unknown") return "Unknown";
  if ((domain === "cover" || domain === "valve") && typeof on === "boolean") {
    if (state === "opening") return "Opening";
    if (state === "closing") return "Closing";
    return on ? "Open" : "Closed";
  }
  return state.split("_").map((w2) => w2.charAt(0).toUpperCase() + w2.slice(1)).join(" ");
}

// src/icons.js
var DEFAULT_ON_ICONS = {
  light: "mdi:lightbulb",
  switch: "mdi:toggle-switch-variant",
  fan: "mdi:fan",
  input_boolean: "mdi:toggle-switch-variant",
  humidifier: "mdi:air-humidifier",
  media_player: "mdi:cast-connected",
  climate: "mdi:thermostat",
  water_heater: "mdi:water-boiler",
  cover: "mdi:arrow-up-bold",
  valve: "mdi:valve-open",
  number: "mdi:ray-vertex",
  input_number: "mdi:ray-vertex"
};
var DEFAULT_OFF_ICONS = {
  light: "mdi:lightbulb-off",
  switch: "mdi:toggle-switch-variant-off",
  fan: "mdi:fan-off",
  input_boolean: "mdi:toggle-switch-variant-off",
  humidifier: "mdi:air-humidifier-off",
  media_player: "mdi:cast-off",
  climate: "mdi:thermostat",
  water_heater: "mdi:water-boiler-off",
  cover: "mdi:arrow-down-bold",
  valve: "mdi:valve-closed",
  number: "mdi:ray-vertex",
  input_number: "mdi:ray-vertex"
};
var CLIMATE_MODE_ICONS = {
  heat: "mdi:fire",
  cool: "mdi:snowflake",
  heat_cool: "mdi:sun-snowflake-variant",
  auto: "mdi:thermostat-auto",
  dry: "mdi:water-percent",
  fan_only: "mdi:fan",
  off: "mdi:thermostat"
};
function defaultIcon(domain, stateObj, on) {
  if (stateObj?.attributes?.icon) return stateObj.attributes.icon;
  if (domain === "climate") {
    return CLIMATE_MODE_ICONS[stateObj.state] || "mdi:thermostat";
  }
  if (domain === "cover" || domain === "valve") {
    return on ? "mdi:arrow-up-bold" : "mdi:arrow-down-bold";
  }
  const table = on ? DEFAULT_ON_ICONS : DEFAULT_OFF_ICONS;
  return table[domain] || "mdi:help-circle-outline";
}

// src/fire-event.js
var fireEvent = (node, type, detail, options) => {
  options = options || {};
  detail = detail === null || detail === void 0 ? {} : detail;
  const event = new Event(type, {
    bubbles: options.bubbles === void 0 ? true : options.bubbles,
    cancelable: Boolean(options.cancelable),
    composed: options.composed === void 0 ? true : options.composed
  });
  event.detail = detail;
  node.dispatchEvent(event);
  return event;
};

// src/card.js
var HaVerticalActionCard = class extends s4 {
  static get properties() {
    return {
      hass: {},
      _config: { state: true },
      _currentView: { state: true },
      _dragPercent: { state: true }
    };
  }
  static getConfigElement() {
    return document.createElement(EDITOR_TYPE);
  }
  static getStubConfig(hass) {
    const supported = /* @__PURE__ */ new Set([...TOGGLE_DOMAINS, ...RANGE_DOMAINS]);
    const entities = hass ? Object.keys(hass.states) : [];
    const entity = entities.find((e4) => supported.has(computeDomain(e4))) || "";
    const domain = entity ? computeDomain(entity) : "light";
    const views = supportedViewsForDomain(domain);
    return {
      type: `custom:${CARD_TYPE}`,
      entity,
      show_name: true,
      views: views.length ? views : [VIEW_SWITCH],
      default_view: views.includes(VIEW_SWITCH) ? VIEW_SWITCH : views[0] || VIEW_SWITCH,
      hide_state: false,
      invert_cover_close: false,
      cover_open_position: 50,
      double_click_speed: DEFAULT_DOUBLE_CLICK_SPEED,
      presets: [...DEFAULT_PRESETS]
    };
  }
  setConfig(config) {
    if (!config || !config.entity) {
      throw new Error("Please define an entity.");
    }
    const domain = computeDomain(config.entity);
    const supported = supportedViewsForDomain(domain);
    let views = Array.isArray(config.views) && config.views.length ? config.views.filter((v2) => supported.includes(v2)) : supported;
    if (!views.length) views = supported.length ? [supported[0]] : [];
    let defaultView = config.default_view;
    if (!views.includes(defaultView)) {
      defaultView = views.includes(VIEW_SWITCH) ? VIEW_SWITCH : views[0];
    }
    this._config = {
      show_name: true,
      hide_state: false,
      invert_cover_close: false,
      cover_open_position: 50,
      double_click_speed: DEFAULT_DOUBLE_CLICK_SPEED,
      presets: [...DEFAULT_PRESETS],
      ...config,
      views,
      default_view: defaultView
    };
    if (!this._currentView || !views.includes(this._currentView)) {
      this._currentView = defaultView;
    }
  }
  getCardSize() {
    return 3;
  }
  getGridOptions() {
    return {
      rows: 3,
      columns: 4,
      min_rows: 3,
      min_columns: 4
    };
  }
  shouldUpdate(changedProps) {
    if (!this._config) return false;
    if (changedProps.has("_config") || changedProps.has("_currentView") || changedProps.has("_dragPercent")) {
      return true;
    }
    if (changedProps.has("hass")) {
      const oldHass = changedProps.get("hass");
      if (!oldHass) return true;
      const entity = this._config.entity;
      return oldHass.states[entity] !== this.hass.states[entity] || oldHass.themes !== this.hass.themes || oldHass.locale !== this.hass.locale;
    }
    return false;
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this._holdTimer);
  }
  // ---------------------------------------------------------------------
  // Rendering
  // ---------------------------------------------------------------------
  render() {
    if (!this._config || !this.hass) return A;
    const entityId = this._config.entity;
    const stateObj = this.hass.states[entityId];
    if (!stateObj) {
      const name2 = this._config.show_name === false ? "" : this._config.name || entityId;
      const red = "var(--error-color, #db4437)";
      const trackBg = `color-mix(in srgb, ${red} 50%, var(--card-background-color, transparent) 50%)`;
      const thumbBg = `color-mix(in srgb, ${red} 70%, var(--card-background-color, transparent) 30%)`;
      return x`
        <ha-card>
          <div class="action-area" role="group" aria-label=${name2 || entityId}>
            ${name2 ? x`<div class="name">${name2}</div>` : A}
            <div class="control">
              <div class="switch-track" style="--track-bg:${trackBg};">
                <div
                  class="switch-thumb off"
                  style="--thumb-bg:${thumbBg};--icon-color:rgba(255,255,255,0.75);"
                >
                  <ha-icon icon="mdi:alert"></ha-icon>
                </div>
              </div>
            </div>
            <div class="state-row">
              <span class="state-text">Not found</span>
            </div>
          </div>
        </ha-card>
      `;
    }
    const domain = computeDomain(entityId);
    const view = this._currentView;
    const name = this._config.show_name === false ? "" : this._config.name || stateObj.attributes.friendly_name || entityId;
    return x`
      <ha-card>
        <div
          class="action-area"
          tabindex="0"
          role="group"
          aria-label=${name || entityId}
          @pointerdown=${this._onPointerDown}
          @pointermove=${this._onPointerMove}
          @pointerup=${this._onPointerUp}
          @pointercancel=${this._onPointerCancel}
          @keydown=${this._onKeyDown}
        >
          ${name ? x`<div class="name">${name}</div>` : A}
          <div class="control">
            ${view === VIEW_SWITCH ? this._renderSwitch(stateObj, domain) : A}
            ${view === VIEW_SLIDER ? this._renderSlider(stateObj, domain) : A}
            ${view === VIEW_PRESET ? this._renderPreset(stateObj, domain) : A}
          </div>
          ${this._renderFooter(stateObj, domain, view)}
        </div>
      </ha-card>
    `;
  }
  _renderSwitch(stateObj, domain) {
    const on = isEntityOn(stateObj, domain, this._config);
    const activeColor = stateActiveColor(domain, stateObj);
    const realColor = domain === "light" ? lightCurrentColor(stateObj) : null;
    const icon = defaultIcon(domain, stateObj, on);
    const trackBg = `color-mix(in srgb, ${activeColor} 50%, var(--card-background-color, transparent) 50%)`;
    const thumbBg = on ? activeColor : `color-mix(in srgb, ${activeColor} 75%, var(--card-background-color, transparent) 25%)`;
    const iconColor = on ? domain === "light" ? realColor || activeColor : "#fff" : "rgba(255, 255, 255, 0.75)";
    return x`
      <div class="switch-track" style="--track-bg:${trackBg};">
        <div
          class="switch-thumb ${on ? "on" : "off"}"
          style="--thumb-bg:${thumbBg};--icon-color:${iconColor};"
        >
          <ha-icon .icon=${icon}></ha-icon>
        </div>
      </div>
    `;
  }
  _renderSlider(stateObj, domain) {
    const range = getRangeState(this.hass, stateObj, domain, this._config);
    const percent = this._dragPercent != null && this._dragView === VIEW_SLIDER ? this._dragPercent : range.percent;
    const activeColor = stateActiveColor(domain, stateObj);
    const disabled = range.available === false;
    return x`
      <div class="slider-track" style="--active-color:${activeColor};">
        <div
          class="slider-fill ${disabled ? "disabled" : ""}"
          style="height:${percent}%"
        ></div>
        <div class="marks">
          <div class="mark mid" style="bottom:25%"></div>
          <div class="mark major" style="bottom:50%"></div>
          <div class="mark mid" style="bottom:75%"></div>
        </div>
      </div>
    `;
  }
  _renderPreset(stateObj, domain) {
    const range = getRangeState(this.hass, stateObj, domain, this._config);
    const presets = this._presets();
    const current = Math.round(range.percent);
    const activeColor = stateActiveColor(domain, stateObj);
    const disabled = range.available === false;
    return x`
      <div class="slider-track preset-track" style="--active-color:${activeColor};">
        <div class="preset-buttons">
          ${presets.map(
      (p2) => x`
              <button
                class="preset-button ${current === p2 ? "active" : ""}"
                ?disabled=${disabled}
                @pointerdown=${(e4) => e4.stopPropagation()}
                @keydown=${(e4) => e4.stopPropagation()}
                @click=${(e4) => {
        e4.stopPropagation();
        this._selectPreset(p2);
      }}
              >
                ${p2}
              </button>
            `
    )}
        </div>
      </div>
    `;
  }
  _renderFooter(stateObj, domain, view) {
    if (this._config.hide_state) {
      return x`<div class="state-row spacer"></div>`;
    }
    if (view === VIEW_SWITCH) {
      const on2 = isEntityOn(stateObj, domain, this._config);
      return x`
        <div class="state-row">
          <span class="state-text">${humanizeState(stateObj, domain, on2)}</span>
        </div>
      `;
    }
    const range = getRangeState(this.hass, stateObj, domain, this._config);
    const on = isEntityOn(stateObj, domain, this._config) || range.percent > 0;
    const icon = defaultIcon(domain, stateObj, on);
    return x`
      <div class="state-row">
        <ha-icon class="state-icon" .icon=${icon}></ha-icon>
        <span class="state-text">${range.display}</span>
      </div>
    `;
  }
  _presets() {
    const presets = this._config.presets && this._config.presets.length ? this._config.presets : DEFAULT_PRESETS;
    return [...presets].sort((a3, b2) => a3 - b2);
  }
  // ---------------------------------------------------------------------
  // Gestures. Two zones behave differently:
  //  - The control itself (switch-track / slider-track, i.e. the visible
  //    track, thumb and icon) responds to a tap (toggle / set value / drag)
  //    and a press-and-hold (more info). Double-click does nothing extra
  //    there.
  //  - The rest of the action area (name, footer, padding) responds only
  //    to a double-click/double-tap, which cycles the view. A single tap
  //    there does nothing, and press-and-hold does not open more-info.
  // ---------------------------------------------------------------------
  _isControlTarget(e4) {
    const path = typeof e4.composedPath === "function" ? e4.composedPath() : [];
    return path.some(
      (node) => node && node.classList && (node.classList.contains("switch-track") || node.classList.contains("slider-track"))
    );
  }
  _onPointerDown(e4) {
    if (!this._config || e4.button > 0) return;
    this._pointerId = e4.pointerId;
    this._startX = e4.clientX;
    this._startY = e4.clientY;
    this._dragging = false;
    this._holdFired = false;
    this._dragView = this._currentView;
    this._pointerOnControl = this._isControlTarget(e4);
    const trackEl = this.renderRoot.querySelector(
      ".switch-track, .slider-track"
    );
    this._trackRect = trackEl ? trackEl.getBoundingClientRect() : null;
    try {
      e4.currentTarget.setPointerCapture(e4.pointerId);
    } catch (err) {
    }
    if (this._pointerOnControl) {
      clearTimeout(this._holdTimer);
      this._holdTimer = setTimeout(() => {
        this._holdFired = true;
        this._openMoreInfo();
      }, HOLD_TIME);
    }
  }
  _onPointerMove(e4) {
    if (this._pointerId !== e4.pointerId || this._holdFired) return;
    const dx = e4.clientX - this._startX;
    const dy = e4.clientY - this._startY;
    if (!this._dragging && Math.hypot(dx, dy) > DRAG_THRESHOLD) {
      this._dragging = true;
      clearTimeout(this._holdTimer);
    }
    if (this._dragging && this._pointerOnControl && this._trackRect && this._dragView === VIEW_SLIDER) {
      const percent = this._percentFromY(e4.clientY);
      this._applyLiveValue(percent);
    }
  }
  _onPointerUp(e4) {
    if (this._pointerId !== e4.pointerId) return;
    clearTimeout(this._holdTimer);
    try {
      e4.currentTarget.releasePointerCapture(e4.pointerId);
    } catch (err) {
    }
    const wasHold = this._holdFired;
    const wasDragging = this._dragging;
    const onControl = this._pointerOnControl;
    this._pointerId = null;
    this._dragging = false;
    this._holdFired = false;
    if (wasHold) return;
    if (wasDragging) {
      if (onControl && this._dragView === VIEW_SLIDER) {
        this._commitValue(this._percentFromY(e4.clientY));
      }
      this._dragPercent = null;
      return;
    }
    if (onControl) {
      this._handleSingleTap(e4.clientX, e4.clientY);
    } else {
      this._registerCardZoneTap();
    }
  }
  _onPointerCancel() {
    clearTimeout(this._holdTimer);
    this._pointerId = null;
    this._dragging = false;
    this._holdFired = false;
    this._dragPercent = null;
  }
  _onKeyDown(e4) {
    if (!this._config) return;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) return;
    const domain = computeDomain(this._config.entity);
    if (e4.key === "Enter" || e4.key === " ") {
      e4.preventDefault();
      if (this._currentView === VIEW_SWITCH) {
        toggleEntity(this.hass, stateObj, domain, this._config);
      } else {
        this._openMoreInfo();
      }
      return;
    }
    if (this._currentView === VIEW_SLIDER && (e4.key === "ArrowUp" || e4.key === "ArrowDown")) {
      e4.preventDefault();
      const range = getRangeState(this.hass, stateObj, domain, this._config);
      const delta = e4.key === "ArrowUp" ? 5 : -5;
      this._sendValue(clamp(range.percent + delta, 0, 100));
    }
  }
  // Card-zone double-click detection --------------------------------------
  _registerCardZoneTap() {
    const now = Date.now();
    const speed = this._config.double_click_speed || DEFAULT_DOUBLE_CLICK_SPEED;
    if (this._lastCardTapTime && now - this._lastCardTapTime <= speed) {
      this._lastCardTapTime = null;
      this._cycleView();
    } else {
      this._lastCardTapTime = now;
    }
  }
  _handleSingleTap(x2, y2) {
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) return;
    const domain = computeDomain(this._config.entity);
    if (this._currentView === VIEW_SWITCH) {
      toggleEntity(this.hass, stateObj, domain, this._config);
      return;
    }
    if (this._currentView === VIEW_SLIDER) {
      if (!this._trackRect) return;
      this._sendValue(this._percentFromY(y2));
    }
  }
  _cycleView() {
    const views = this._config.views;
    if (!views || views.length < 2) return;
    const idx = views.indexOf(this._currentView);
    this._currentView = views[(idx + 1) % views.length];
  }
  _openMoreInfo() {
    fireEvent(this, "hass-more-info", { entityId: this._config.entity });
  }
  // Value helpers -----------------------------------------------------------
  _percentFromY(clientY) {
    if (!this._trackRect) return 0;
    const { top, height } = this._trackRect;
    const rel = (top + height - clientY) / height;
    return clamp(rel * 100, 0, 100);
  }
  // While dragging the slider we only update the visual preview; the
  // service call is only made once, on release (see _commitValue) - the
  // same input-live / change-commit split a native <input type="range">
  // gives you for free.
  _applyLiveValue(percent) {
    if (this._dragView === VIEW_SLIDER) {
      this._dragPercent = percent;
    }
  }
  _commitValue(percent) {
    if (this._dragView === VIEW_SLIDER) {
      this._sendValue(percent);
    }
  }
  _sendValue(percent) {
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) return;
    const domain = computeDomain(this._config.entity);
    setRangeValue(this.hass, stateObj, domain, this._config, percent);
  }
  _selectPreset(percent) {
    this._sendValue(percent);
  }
  // ---------------------------------------------------------------------
  // Styles
  // ---------------------------------------------------------------------
  static get styles() {
    return i`
      :host {
        display: block;
        height: 100%;
      }
      ha-card {
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      .action-area {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 8px 4px;
        box-sizing: border-box;
        cursor: pointer;
        user-select: none;
        -webkit-user-select: none;
        touch-action: none;
        outline: none;
      }
      .action-area:focus-visible {
        box-shadow: inset 0 0 0 2px var(--primary-color);
        border-radius: var(--ha-card-border-radius, 12px);
      }
      .name {
        font-size: 13px;
        font-weight: 500;
        line-height: 1.2;
        color: var(--primary-text-color);
        text-align: center;
        padding: 2px 4px 4px;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .control {
        flex: 1;
        width: 100%;
        min-height: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2px 0;
      }

      /* Switch / toggle view -------------------------------------------- */
      .switch-track {
        position: relative;
        height: 100%;
        max-height: 100%;
        aspect-ratio: 0.46;
        width: auto;
        min-width: 56px;
        max-width: min(240px, 100%);
        border-radius: 12px;
        background: var(--track-bg);
        transition: background-color 180ms ease;
        box-sizing: border-box;
        overflow: hidden;
      }
      .switch-thumb {
        position: absolute;
        left: 0;
        right: 0;
        height: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--thumb-bg);
        color: var(--icon-color);
        transition: top 220ms cubic-bezier(0.4, 0, 0.2, 1),
          background-color 180ms ease, color 180ms ease;
      }
      .switch-thumb.on {
        top: 0;
        border-radius: 12px;
      }
      .switch-thumb.off {
        top: 50%;
        border-radius: 12px;
      }
      .switch-thumb ha-icon {
        --mdc-icon-size: 22px;
      }

      /* Slider / preset view ---------------------------------------------- */
      .slider-track {
        position: relative;
        height: 100%;
        max-height: 100%;
        aspect-ratio: 0.46;
        width: auto;
        min-width: 56px;
        max-width: min(240px, 100%);
        border-radius: 12px;
        background: color-mix(in srgb, #888 55%, var(--card-background-color, transparent) 45%);
        overflow: hidden;
        box-sizing: border-box;
      }
      .slider-fill {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        background: var(--active-color);
        border-radius: 12px 12px 0 0;
        transition: height 120ms ease-out;
      }
      .slider-fill.disabled {
        opacity: 0.35;
      }
      .marks {
        position: absolute;
        inset: 0;
        z-index: 1;
        pointer-events: none;
      }
      .mark {
        position: absolute;
        left: 8px;
        right: 8px;
        height: 1px;
        background: rgba(255, 255, 255, 0.35);
      }
      .mark.major {
        height: 2px;
        background: rgba(255, 255, 255, 0.65);
      }
      .mark.mid {
        background: rgba(255, 255, 255, 0.5);
      }

      /* Preset view -------------------------------------------------------- */
      .preset-buttons {
        position: absolute;
        inset: 6px;
        display: flex;
        flex-direction: column-reverse;
        align-items: stretch;
        justify-content: space-between;
        gap: 4px;
        z-index: 2;
      }
      .preset-button {
        flex: 1;
        min-height: 0;
        border: none;
        border-radius: 10px;
        margin: 0;
        padding: 0;
        font: inherit;
        font-size: 11px;
        font-weight: 600;
        color: var(--secondary-text-color);
        background: var(--card-background-color, rgba(0, 0, 0, 0.05));
        cursor: pointer;
        transition: background-color 150ms ease, color 150ms ease;
      }
      .preset-button.active {
        background: var(--active-color);
        color: var(--card-background-color, #fff);
      }
      .preset-button:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }
      .preset-button:focus-visible {
        outline: 2px solid var(--active-color);
        outline-offset: 1px;
      }

      /* Footer state row --------------------------------------------------- */
      .state-row {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        min-height: 20px;
        padding-top: 4px;
      }
      .state-row.spacer {
        min-height: 4px;
      }
      .state-icon {
        --mdc-icon-size: 16px;
        color: var(--secondary-text-color);
      }
      .state-text {
        font-size: 12px;
        color: var(--secondary-text-color);
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    `;
  }
};
if (!customElements.get(CARD_TYPE)) {
  customElements.define(CARD_TYPE, HaVerticalActionCard);
}

// src/editor.js
var SUPPORTED_DOMAINS = [.../* @__PURE__ */ new Set([...TOGGLE_DOMAINS, ...RANGE_DOMAINS])];
var ICON_ARROW_UP = "M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z";
var ICON_ARROW_DOWN = "M7.41,8.59L12,13.17L16.59,8.59L18,10L12,16L6,10L7.41,8.59Z";
var ICON_DELETE = "M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z";
var ICON_PLUS = "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z";
var FIELD_LABELS = {
  name: "Name",
  show_name: "Show name",
  hide_state: "Hide state",
  invert_cover_close: "Invert cover/valve close (close = 100%)",
  cover_open_position: "Cover/valve open position (%)",
  double_click_speed: "Double-click speed (ms)"
};
var HaVerticalActionCardEditor = class extends s4 {
  static get properties() {
    return {
      hass: {},
      _config: { state: true }
    };
  }
  setConfig(config) {
    this._config = { ...config };
  }
  _schema(domain) {
    const schema = [
      { name: "name", selector: { text: {} } },
      { name: "show_name", selector: { boolean: {} } },
      { name: "hide_state", selector: { boolean: {} } }
    ];
    if (domain === "cover" || domain === "valve") {
      schema.push({ name: "invert_cover_close", selector: { boolean: {} } });
      schema.push({
        name: "cover_open_position",
        selector: {
          number: { min: 0, max: 100, step: 1, mode: "box", unit_of_measurement: "%" }
        }
      });
    }
    schema.push({
      name: "double_click_speed",
      selector: {
        number: {
          min: 200,
          max: 2e3,
          step: 50,
          mode: "box",
          unit_of_measurement: "ms"
        }
      }
    });
    return schema;
  }
  _computeLabel(schemaItem) {
    return FIELD_LABELS[schemaItem.name] || schemaItem.name;
  }
  render() {
    if (!this.hass || !this._config) return A;
    const entity = this._config.entity || "";
    const domain = entity ? computeDomain(entity) : "";
    const supported = domain ? supportedViewsForDomain(domain) : [];
    const enabledViews = (this._config.views && this._config.views.length ? this._config.views : supported).filter((v2) => supported.includes(v2));
    const displayOrder = [
      ...enabledViews,
      ...supported.filter((v2) => !enabledViews.includes(v2))
    ];
    return x`
      <div class="editor">
        <ha-entity-picker
          .hass=${this.hass}
          .value=${entity}
          .includeDomains=${SUPPORTED_DOMAINS}
          label="Entity"
          allow-custom-entity
          @value-changed=${this._entityChanged}
        ></ha-entity-picker>

        ${domain ? x`
              <ha-form
                .hass=${this.hass}
                .data=${this._config}
                .schema=${this._schema(domain)}
                .computeLabel=${this._computeLabel}
                @value-changed=${this._formChanged}
              ></ha-form>

              <details class="section">
                <summary class="section-title">Views</summary>
                <div class="hint">
                  Choose which views are enabled and in what order. Double
                  clicking the card cycles through the enabled views.
                </div>
                ${displayOrder.map(
      (view) => this._renderViewRow(view, enabledViews)
    )}
              </details>
              ${supported.includes(VIEW_PRESET) ? x`
                    <details class="section">
                      <summary class="section-title">Presets</summary>
                      <div class="hint">
                        Used by the Preset view. Values are a percentage of
                        the entity's range.
                      </div>
                      ${this._renderPresets()}
                    </details>
                  ` : A}
            ` : x`<div class="hint">
              Select an entity to configure this card.
            </div>`}
      </div>
    `;
  }
  _renderViewRow(view, enabledViews) {
    const isEnabled = enabledViews.includes(view);
    const idx = enabledViews.indexOf(view);
    const isDefault = this._config.default_view === view;
    return x`
      <div class="view-row">
        <ha-checkbox
          .checked=${isEnabled}
          .disabled=${isEnabled && enabledViews.length <= 1}
          @change=${(e4) => this._toggleView(view, e4.target.checked)}
        ></ha-checkbox>
        <span class="view-name">${VIEW_LABELS[view]}</span>
        <span class="spacer"></span>
        ${isEnabled ? x`
              <ha-icon-button
                .disabled=${idx <= 0}
                .path=${ICON_ARROW_UP}
                @click=${() => this._moveView(view, -1)}
              ></ha-icon-button>
              <ha-icon-button
                .disabled=${idx >= enabledViews.length - 1}
                .path=${ICON_ARROW_DOWN}
                @click=${() => this._moveView(view, 1)}
              ></ha-icon-button>
              <label class="default-radio">
                <input
                  type="radio"
                  name="default_view"
                  .checked=${isDefault}
                  @change=${() => this._setDefaultView(view)}
                />
                <span>Default</span>
              </label>
            ` : A}
      </div>
    `;
  }
  _renderPresets() {
    const presets = this._config.presets && this._config.presets.length ? this._config.presets : DEFAULT_PRESETS;
    return x`
      ${presets.map(
      (p2, i3) => x`
          <div class="preset-row">
            <input
              class="preset-input"
              type="number"
              min="0"
              max="100"
              step="1"
              .value=${String(p2)}
              @change=${(e4) => this._updatePreset(i3, e4.target.value)}
            />
            <span class="preset-suffix">%</span>
            <ha-icon-button
              .disabled=${presets.length <= 1}
              .path=${ICON_DELETE}
              @click=${() => this._removePreset(i3)}
            ></ha-icon-button>
          </div>
        `
    )}
      <ha-icon-button
        class="add-preset"
        .path=${ICON_PLUS}
        @click=${this._addPreset}
      ></ha-icon-button>
    `;
  }
  _entityChanged(e4) {
    e4.stopPropagation();
    const newEntity = e4.detail.value;
    const domain = newEntity ? computeDomain(newEntity) : "";
    const supported = domain ? supportedViewsForDomain(domain) : [];
    let views = (this._config.views || []).filter(
      (v2) => supported.includes(v2)
    );
    if (!views.length) views = supported;
    let defaultView = this._config.default_view;
    if (!views.includes(defaultView)) {
      defaultView = views.includes(VIEW_SWITCH) ? VIEW_SWITCH : views[0];
    }
    this._updateConfig({ entity: newEntity, views, default_view: defaultView });
  }
  _formChanged(e4) {
    e4.stopPropagation();
    this._updateConfig(e4.detail.value);
  }
  _toggleView(view, checked) {
    const domain = computeDomain(this._config.entity);
    const supported = supportedViewsForDomain(domain);
    let views = (this._config.views || supported).filter(
      (v2) => supported.includes(v2)
    );
    if (checked && !views.includes(view)) {
      views = [...views, view];
    } else if (!checked) {
      const next = views.filter((v2) => v2 !== view);
      if (!next.length) return;
      views = next;
    }
    let defaultView = this._config.default_view;
    if (!views.includes(defaultView)) defaultView = views[0];
    this._updateConfig({ views, default_view: defaultView });
  }
  _moveView(view, direction) {
    const domain = computeDomain(this._config.entity);
    const supported = supportedViewsForDomain(domain);
    const views = [...this._config.views || supported].filter(
      (v2) => supported.includes(v2)
    );
    const idx = views.indexOf(view);
    const newIdx = idx + direction;
    if (idx < 0 || newIdx < 0 || newIdx >= views.length) return;
    [views[idx], views[newIdx]] = [views[newIdx], views[idx]];
    this._updateConfig({ views });
  }
  _setDefaultView(view) {
    this._updateConfig({ default_view: view });
  }
  _updatePreset(i3, value) {
    const presets = [
      ...this._config.presets && this._config.presets.length ? this._config.presets : DEFAULT_PRESETS
    ];
    const num = Math.max(0, Math.min(100, Number(value)));
    presets[i3] = Number.isNaN(num) ? presets[i3] : num;
    this._updateConfig({ presets });
  }
  _removePreset(i3) {
    const presets = [
      ...this._config.presets && this._config.presets.length ? this._config.presets : DEFAULT_PRESETS
    ];
    if (presets.length <= 1) return;
    presets.splice(i3, 1);
    this._updateConfig({ presets });
  }
  _addPreset() {
    const presets = [
      ...this._config.presets && this._config.presets.length ? this._config.presets : DEFAULT_PRESETS,
      50
    ];
    this._updateConfig({ presets });
  }
  _updateConfig(partial) {
    this._config = { ...this._config, ...partial };
    fireEvent(this, "config-changed", { config: this._config });
  }
  static get styles() {
    return i`
      .editor {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 8px 0 24px;
      }
      ha-entity-picker {
        display: block;
      }
      .section {
        border: 1px solid var(--divider-color, #ccc);
        border-radius: 8px;
        padding: 4px 12px 12px;
      }
      .section .hint {
        margin-top: 4px;
      }
      .section-title {
        font-weight: 500;
        font-size: 14px;
        margin-top: 8px;
        cursor: pointer;
        user-select: none;
        padding: 4px 0;
      }
      .hint {
        font-size: 12px;
        color: var(--secondary-text-color);
        margin-top: -6px;
      }
      .view-row {
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .view-name {
        font-size: 14px;
      }
      .spacer {
        flex: 1;
      }
      .default-radio {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 12px;
        color: var(--secondary-text-color);
        cursor: pointer;
      }
      .default-radio input {
        margin: 0;
        cursor: pointer;
      }
      .preset-row {
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .preset-input {
        width: 70px;
        box-sizing: border-box;
        padding: 6px 8px;
        font-size: 14px;
        font-family: inherit;
        color: var(--primary-text-color);
        background: var(--card-background-color, #fff);
        border: 1px solid var(--divider-color, #ccc);
        border-radius: 4px;
      }
      .preset-input:focus {
        outline: none;
        border-color: var(--primary-color);
      }
      .preset-suffix {
        font-size: 13px;
        color: var(--secondary-text-color);
      }
      .add-preset {
        align-self: flex-start;
        color: var(--primary-color);
      }
    `;
  }
};
if (!customElements.get(EDITOR_TYPE)) {
  customElements.define(EDITOR_TYPE, HaVerticalActionCardEditor);
}

// src/index.js
window.customCards = window.customCards || [];
window.customCards.push({
  type: CARD_TYPE,
  name: CARD_NAME,
  description: "A compact vertical action card with Switch/Toggle, Slider and Preset views for lights, switches, fans, covers, valves, climate, media players, humidifiers, water heaters and numbers.",
  preview: false
});
console.info(
  `%c HA-VERTICAL-ACTION-CARD %c v${CARD_VERSION} `,
  "color: #fff; background: #03a9f4; font-weight: 700; border-radius: 3px 0 0 3px; padding: 2px 4px;",
  "color: #03a9f4; background: #fff; font-weight: 700; border: 1px solid #03a9f4; border-radius: 0 3px 3px 0; padding: 2px 4px;"
);
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
