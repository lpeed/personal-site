/* ============================================
   数据库层 — Supabase
   ============================================
   所有页面共用。依赖：
   1. content.js 里的 SITE.supabase 配置
   2. Supabase JS SDK（CDN 引入）
   没有配置或 SDK 加载失败时，DB.ready = false，
   页面自动回退到 content.js 的静态内容，不会报错。
   ============================================ */

const DB = {
  client: null,
  ready: false,

  init() {
    try {
      const cfg = (typeof SITE !== 'undefined' && SITE.supabase) || {};
      if (!cfg.url || !cfg.anonKey) return false;
      if (typeof window.supabase === 'undefined' || !window.supabase.createClient) return false;
      this.client = window.supabase.createClient(cfg.url, cfg.anonKey);
      this.ready = true;
      return true;
    } catch (e) {
      console.warn('Supabase 初始化失败:', e);
      return false;
    }
  },

  /* 把数据库记录格式化成页面需要的字段 */
  _fmt(note) {
    const d = new Date(note.created_at);
    const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
    // 阅读时长估算：中文约 400 字/分钟，英文约 200 词/分钟
    const text = (note.content || '');
    const cnChars = (text.match(/[一-龥]/g) || []).length;
    const enWords = (text.replace(/[一-龥]/g, ' ').match(/[a-zA-Z0-9]+/g) || []).length;
    const readingMinutes = Math.max(1, Math.round(cnChars / 400 + enWords / 200));
    return {
      id: note.id,
      title: note.title,
      tag: note.tag || '',
      excerpt: note.excerpt || '',
      content: text,
      published: note.published,
      readingMinutes: readingMinutes,
      day: String(d.getDate()).padStart(2, '0'),
      month: months[d.getMonth()],
      year: String(d.getFullYear()),
      dateText: d.getFullYear() + ' 年 ' + (d.getMonth() + 1) + ' 月 ' + d.getDate() + ' 日',
    };
  },

  /* 公开读取：只拿已发布的（列表用） */
  async listPublished() {
    const { data, error } = await this.client
      .from('notes')
      .select('id,title,tag,excerpt,content,published,created_at')
      .eq('published', true)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (data || []).map(n => this._fmt(n));
  },

  /* 后台读取：全部（含草稿，含正文） */
  async listAll() {
    const { data, error } = await this.client
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (data || []).map(n => this._fmt(n));
  },

  /* 读取单篇（详情页） */
  async get(id) {
    const { data, error } = await this.client
      .from('notes')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return this._fmt(data);
  },

  async create(note) {
    const { error } = await this.client.from('notes').insert({
      title: note.title,
      tag: note.tag,
      excerpt: note.excerpt,
      content: note.content,
      published: note.published,
    });
    if (error) throw error;
  },

  async update(id, note) {
    const { error } = await this.client.from('notes').update({
      title: note.title,
      tag: note.tag,
      excerpt: note.excerpt,
      content: note.content,
      published: note.published,
      updated_at: new Date().toISOString(),
    }).eq('id', id);
    if (error) throw error;
  },

  async remove(id) {
    const { error } = await this.client.from('notes').delete().eq('id', id);
    if (error) throw error;
  },

  /* 登录 / 登出 / 会话 */
  async signIn(email, password) {
    const { error } = await this.client.auth.signInWithPassword({ email, password });
    if (error) throw error;
  },

  async signOut() {
    await this.client.auth.signOut();
  },

  async session() {
    const { data } = await this.client.auth.getSession();
    return data && data.session ? data.session : null;
  },
};

DB.init();


/* ============================================
   Markdown 渲染（详情页和后台预览共用）
   marked + DOMPurify 由 CDN 引入；
   CDN 加载失败时用极简后备渲染（纯文本转段落），保证内容永远可读。
   ============================================ */
function renderMarkdown(md) {
  md = md || '';
  if (typeof marked !== 'undefined' && typeof DOMPurify !== 'undefined') {
    return DOMPurify.sanitize(marked.parse(md));
  }
  const esc = md
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return esc
    .split(/\n{2,}/)
    .map(p => '<p>' + p.replace(/\n/g, '<br>') + '</p>')
    .join('');
}
