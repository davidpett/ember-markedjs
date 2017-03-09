import Ember from 'ember';
import marked from 'npm:marked';
import highlight from 'npm:highlight.js';
import layout from '../templates/components/md-text';

const {
  computed,
  get
} = Ember;

export default Ember.Component.extend({
  layout,
  tagName: '',
  text: '',

  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,

  init() {
    let options = this.getProperties('gfm', 'tables', 'breaks', 'pedantic', 'sanitize', 'smartLists', 'smartypants');
    let renderer = new marked.Renderer();

    options.highlight = function(code) {
      return highlight.highlightAuto(code).value;
    };

    renderer.heading = function(text, level) {
      let textLink = text.toLowerCase().replace(/[^\w]+/g, '-');
      return `<h${level}><a id="${textLink}" class="anchor" href="#${textLink}">${text}</a></h${level}>`;
    };
    renderer.code = function(code, lang, escaped) {
      if (this.options.highlight) {
        var out = this.options.highlight(code, lang);
        if (out != null && out !== code) {
          escaped = true;
          code = out;
        }
      }

      if (!lang) {
        return `<pre class="hljs"><code>${(escaped ? code : escape(code, true))}\n</code></pre>`;
      }
      return `<pre class="hljs"><code class="${this.options.langPrefix}${escape(lang, true)}">${(escaped ? code : escape(code, true))}\n</code></pre>\n`;
    };
    renderer.codespan = function(text) {
      return `<code class="hljs-span">${text}</code>`;
    };
    options.renderer = renderer;

    marked.setOptions(options);
    this._super(...arguments);
  },

  parsedMarkdownUnsafe: computed('text', function () {
    return marked(get(this, 'text'));
  }),

  parsedMarkdown: computed('parsedMarkdownUnsafe', function () {
    let parsedMarkdownUnsafe = get(this, 'parsedMarkdownUnsafe');
    return new Ember.String.htmlSafe(parsedMarkdownUnsafe);
  })
});
