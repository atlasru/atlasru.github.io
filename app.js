(() => {
  'use strict';
  const site = window.ATLAS_SITE;
  if (!site || !Array.isArray(site.projects)) return;
  const projects = site.projects;
  const $ = (selector) => document.querySelector(selector);
  // Live Moscow clock. Intl handles time zones; works when opened as file://.
  const moscowClock = $('#moscowTime');
  const moscowSeconds = $('#moscowSeconds');
  const moscowDate = $('#moscowDate');
  const moscowHours = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Moscow', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
  const moscowSecondFormatter = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Moscow', second: '2-digit' });
  const moscowDayFormatter = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Moscow', weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });
  function renderMoscowClock() {
    const now = new Date();
    const hhmm = moscowHours.format(now);
    moscowClock.textContent = hhmm;
    moscowClock.dateTime = now.toISOString();
    moscowSeconds.textContent = ':' + moscowSecondFormatter.format(now);
    moscowDate.textContent = moscowDayFormatter.format(now).toUpperCase();
  }
  renderMoscowClock();
  setInterval(renderMoscowClock, 1000);

  const svgWrap = (inside) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 420" preserveAspectRatio="xMidYMid meet" role="presentation"><defs>
    <radialGradient id="halo"><stop offset="0" stop-color="var(--project-color)" stop-opacity=".10"/><stop offset="1" stop-color="var(--project-color)" stop-opacity="0"/></radialGradient>
    <linearGradient id="beam" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0" stop-color="var(--project-color)" stop-opacity=".05"/><stop offset=".5" stop-color="var(--project-color)" stop-opacity=".9"/><stop offset="1" stop-color="var(--project-color)" stop-opacity=".07"/></linearGradient>
  </defs><ellipse cx="410" cy="178" rx="340" ry="220" fill="url(#halo)"/>${inside}</svg>`;
  const edge = (x1, y1, x2, y2, faint = false) => `<path class="${faint ? 'art-edge-faint' : 'art-edge'}" d="M${x1} ${y1} ${x2} ${y2}"/>`;
  const node = (x, y, r = 8, primary = false) => `<g><circle class="art-node" cx="${x}" cy="${y}" r="${r}"/><circle class="art-node-core" cx="${x}" cy="${y}" r="${primary ? 3.5 : 2}"/></g>`;
  const label = (text, x, y) => `<text class="art-label" x="${x}" y="${y}">${text}</text>`;

  const visuals = {
    archive() {
      return svgWrap('<image href="./saveryou-archive.svg" x="40" y="0" width="720" height="360"/>');
    },
    network() {
      const coords = [[178,122],[274,90],[377,156],[488,83],[615,142],[673,232],[555,269],[435,223],[318,277],[208,242],[380,55],[535,187],[292,179],[458,318],[130,199]];
      const pairs = [[0,1],[0,9],[0,12],[1,2],[1,10],[2,3],[2,7],[2,12],[3,4],[3,10],[4,5],[4,11],[5,6],[6,7],[6,11],[7,8],[7,11],[7,12],[7,13],[8,9],[8,12],[8,13],[9,14],[9,12],[10,3],[11,2],[12,1],[13,6]];
      return svgWrap(`<g>${pairs.map(([a,b],i) => edge(...coords[a],...coords[b],i%5===0)).join('')}</g>
        <circle class="art-edge art-dash" cx="405" cy="192" r="165"/><circle class="art-edge-faint" cx="405" cy="192" r="112"/>
        ${coords.map(([x,y],i) => node(x,y,i===7?13:(i%4===0?9:6),i===7)).join('')}
        ${label('ENTITY / 004',454,210)}${label('GRAPH VIEW',255,61)}${label('EDGE / 018',578,290)}
        <circle class="art-pulse" cx="435" cy="223" r="26" fill="none" stroke="var(--project-color)" stroke-width=".8" opacity=".42"/>
        <path class="art-edge-faint" d="M118 190h30M133 175v30M635 60h30M650 45v30"/>`);
    },
    route() {
      const arcs = [68,106,148,186];
      return svgWrap(`<g transform="translate(412 184)">
        ${arcs.map((r,i)=>`<circle cx="0" cy="0" r="${r}" fill="none" stroke="var(--project-color)" stroke-width="${i===3 ? .6 : 1}" opacity="${.46-i*.07}" stroke-dasharray="${i===3?'5 8':'none'}"/>`).join('')}
        <ellipse cx="0" cy="0" rx="186" ry="55" transform="rotate(-23)" class="art-edge"/>
        <ellipse cx="0" cy="0" rx="186" ry="55" transform="rotate(58)" class="art-edge-faint"/>
        <path d="M-161 95 C-80 -110, 75 130, 172 -95" fill="none" stroke="url(#beam)" stroke-width="2.5"/>
        <path d="M-161 95 C-80 -110, 75 130, 172 -95" fill="none" stroke="var(--project-color)" stroke-opacity=".45" stroke-dasharray="4 8"/>
        ${node(-161,95,10,true)}${node(172,-95,10,true)}${node(0,0,8,true)}
        ${label('EXIT / SECURE',-233,123)}${label('ENTRY / LOCAL',188,-109)}${label('XRAY / CORE',18,18)}
      </g>`);
    },
    prism() {
      return svgWrap(`<g transform="translate(404 188)">
        <path class="art-edge" d="M0 -155 153 -65 152 110 0 190 -153 110 -153 -65Z"/>
        <path class="art-edge" d="M0 -155V18L153 110M0 18l-153 92M0 18l152 -83M0 18l-153 -83"/>
        <path class="art-edge-faint" d="M-153 -65 0 190 153 -65M-153 110 0 -155 153 110"/>
        <path d="M0 -155 153 -65 0 18 -153 -65Z" fill="var(--project-color)" fill-opacity=".08" stroke="var(--project-color)" stroke-opacity=".45"/>
        <path d="M0 18 153 -65 153 110 0 190Z" fill="var(--project-color)" fill-opacity=".14"/>
        <path d="M0 18 -153 -65 -153 110 0 190Z" fill="var(--project-color)" fill-opacity=".045"/>
        ${node(0,-155,6)}${node(153,-65,6)}${node(-153,-65,6)}${node(0,18,7,true)}${node(0,190,6)}
        ${label('PRISM / 01',177,-82)}${label('VISUAL / LAYER',-270,139)}
        <circle class="art-edge-faint art-dash" cx="0" cy="0" r="210"/>
      </g>`);
    },
    target() {
      return svgWrap(`<g transform="translate(411 183)">
        <rect x="-176" y="-148" width="352" height="296" rx="4" fill="none" stroke="var(--project-color)" stroke-opacity=".45"/>
        <rect x="-142" y="-115" width="284" height="230" rx="2" fill="none" stroke="var(--project-color)" stroke-opacity=".16" stroke-dasharray="4 7"/>
        <circle class="art-edge" cx="0" cy="0" r="108"/><circle class="art-edge" cx="0" cy="0" r="76"/><circle class="art-edge" cx="0" cy="0" r="28"/>
        <path class="art-edge-faint" d="M-222 0H222M0 -170V170"/>
        <path d="M-190 -145h52m-52 0v40M190 -145h-52m52 0v40M-190 145h52m-52 0v-40M190 145h-52m52 0v-40" fill="none" stroke="var(--project-color)" stroke-width="2"/>
        <path class="art-edge art-dash" d="M-105 -82 74 49 127 -42"/>
        <circle class="art-node-core art-pulse" cx="74" cy="49" r="5"/>
        ${label('TRACKING / 01',-168,-160)}${label('CONFIDENCE: --',76,179)}${label('OFFLINE MODEL',-167,179)}
      </g>`);
    },
    peers() {
      const coords = [[400,192],[209,99],[600,84],[650,288],[236,290],[398,38],[516,316],[320,325]];
      const pairs = [[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[1,5],[2,5],[3,6],[4,7]];
      return svgWrap(`${pairs.map(([a,b])=>edge(...coords[a],...coords[b])).join('')}
        <circle class="art-edge-faint" cx="400" cy="192" r="167" stroke-dasharray="5 8"/>
        <circle cx="400" cy="192" r="59" fill="var(--project-color)" fill-opacity=".06" stroke="var(--project-color)" stroke-width="1.5"/>
        ${coords.map(([x,y],i)=>node(x,y,i===0?17:9,i===0)).join('')}
        ${label('DIRECT CONNECTION',426,192)}${label('PEER / A',168,86)}${label('PEER / B',610,75)}${label('P2P / TOX',361,20)}
        <path class="art-edge-faint" d="M270 192h260M400 72v245"/>`);
    }
  };

  const picker = $('#projectPicker');
  const workList = $('#workList');
  const stackCategories = $('#stackCategories');
  const canvas = $('#wbCanvas');
  const canvasArt = $('#canvasArt');
  const featuredProject = canvas.dataset.project;
  const featuredArt = canvasArt.querySelector('img');
  const initialProject = featuredProject
    ? projects.findIndex(project => project.slug === featuredProject)
    : 0;
  if (initialProject < 0) return;

  $('#projectCount').textContent = `${projects.length} PROJECTS`;
  let activeProject = initialProject;
  let swapTimeout;
  let selectionChanging = false;

  projects.forEach((project, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'project-pick';
    button.style.setProperty('--project-color', project.accent);
    button.setAttribute('aria-pressed', String(index === initialProject));
    button.innerHTML = '<span class="pick-indicator" aria-hidden="true"></span><span class="pick-copy"><span class="pick-name"></span><span class="pick-subtitle"></span></span>';
    button.querySelector('.pick-indicator').textContent = String(index + 1).padStart(2, '0');
    button.querySelector('.pick-name').textContent = project.name;
    button.querySelector('.pick-subtitle').textContent = project.category;
    button.addEventListener('click', () => activateProject(index));
    picker.append(button);

    if (project.slug === featuredProject) return;

    const row = document.createElement('a');
    row.className = 'work-row';
    row.href = project.url;
    row.target = '_blank';
    row.rel = 'noopener noreferrer';
    row.setAttribute('aria-label', `${project.name}: open project`);
    row.innerHTML = '<span class="work-number"></span><div class="work-title"><span class="work-name"></span><span class="work-category"></span></div><div class="work-details"><p></p><span class="work-minitags"></span></div><span class="work-link-icon" aria-hidden="true">↗</span>';
    row.querySelector('.work-number').textContent = String(index + 1).padStart(2, '0');
    row.querySelector('.work-name').textContent = project.name;
    row.querySelector('.work-category').textContent = project.category;
    row.querySelector('.work-details p').textContent = project.description;
    row.querySelector('.work-minitags').textContent = project.stack.join('  ·  ');
    workList.append(row);
  });

  site.stackGroups.forEach((group) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'stack-group';
    const title = document.createElement('div');
    title.className = 'stack-label';
    title.textContent = group.label;
    const pills = document.createElement('div');
    pills.className = 'stack-pills';
    group.items.forEach((item) => {
      const el = document.createElement('span');
      el.className = 'stack-pill';
      el.textContent = item;
      pills.append(el);
    });
    wrapper.append(title, pills);
    stackCategories.append(wrapper);
  });

  function activateProject(index) {
    activeProject = (index + projects.length) % projects.length;
    const project = projects[activeProject];
    const isFeatured = project.slug === featuredProject;
    canvas.classList.toggle('is-featured', isFeatured);
    canvas.style.setProperty('--project-color', project.accent);
    [...picker.children].forEach((button, buttonIndex) => {
      const isSelected = buttonIndex === activeProject;
      button.classList.toggle('is-selected', isSelected);
      button.setAttribute('aria-pressed', String(isSelected));
    });
    $('#activeProjectBreadcrumb').textContent = project.name;
    $('#canvasKind').textContent = project.kind;
    $('#canvasTitle').textContent = project.name;
    $('#canvasDescription').textContent = project.description;
    $('#canvasCounter').textContent = `${String(activeProject + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}`;
    $('#canvasOpen').href = project.url;
    $('#canvasOpen').firstElementChild.textContent = project.linkLabel || 'View source';
    $('#canvasOpen').setAttribute('aria-label', `Open ${project.name}`);
    const tags = $('#canvasTags');
    tags.replaceChildren();
    project.stack.forEach((t) => {
      const tag = document.createElement('span');
      tag.className = 'canvas-tag';
      tag.textContent = t;
      tags.append(tag);
    });
    clearTimeout(swapTimeout);
    if (canvasArt.dataset.project === project.slug) {
      canvasArt.classList.remove('swap-out');
      return;
    }
    canvasArt.classList.add('swap-out');
    swapTimeout = setTimeout(() => {
      if (isFeatured) {
        canvasArt.replaceChildren(featuredArt);
      } else {
        canvasArt.innerHTML = visuals[project.art]();
      }
      canvasArt.dataset.project = project.slug;
      canvasArt.classList.remove('swap-out');
    }, 115);
  }
  canvasArt.dataset.project = featuredProject;
  activateProject(initialProject);
  $('#prevProject').addEventListener('click', () => activateProject(activeProject - 1));
  $('#nextProject').addEventListener('click', () => activateProject(activeProject + 1));
  $('#projectSidebar')?.removeAttribute('hidden');
  $('#canvasControls')?.removeAttribute('hidden');

  const words = ['curiosity.', 'questions.', 'ideas.'];
  let wordIndex = 0;
  const wordButton = $('#heroWord');
  wordButton.addEventListener('click', () => {
    if (selectionChanging) return;
    selectionChanging = true;
    wordIndex = (wordIndex + 1) % words.length;
    wordButton.animate([{opacity:1,transform:'translateY(0)'},{opacity:.3,transform:'translateY(6px)'},{opacity:1,transform:'translateY(0)'}],{duration:230,easing:'ease-out'});
    wordButton.textContent = words[wordIndex];
    setTimeout(() => selectionChanging = false, 210);
  });

  // Scroll progress indicator; no tracking, storage, or external libraries.
  const progress = $('#pageProgress');
  let scrollQueued = false;
  const updateScroll = () => {
    const range = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${range > 0 ? (window.scrollY / range) * 100 : 0}%`;
    scrollQueued = false;
  };
  window.addEventListener('scroll', () => {
    if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateScroll); }
  }, { passive: true });
  window.addEventListener('resize', updateScroll, { passive: true });
  updateScroll();

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduceMotion) {
    const elements = document.querySelectorAll('.about-layout,.section-header-line,.work-row,.stack-layout,.activity-layout,.contact-layout');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: .09, rootMargin: '0px 0px 50px 0px' });
    elements.forEach(el => { el.classList.add('reveal'); observer.observe(el); });
  }

  const activityFeed = $('#activityFeed');
  function activityFallback() {
    activityFeed.replaceChildren();
    const message = document.createElement('div');
    message.className = 'activity-placeholder';
    message.textContent = 'Live activity needs an internet connection. ';
    const link = document.createElement('a');
    link.href = 'https://github.com/atlasru';
    link.target = '_blank'; link.rel = 'noopener noreferrer';
    link.textContent = 'View on GitHub ↗';
    link.style.color = '#ddd4ff';
    message.append(link);
    activityFeed.append(message);
  }
  async function loadActivity() {
    if (navigator.onLine === false) return activityFallback();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5500);
    try {
      const response = await fetch(`https://api.github.com/users/${encodeURIComponent(site.profile.github)}/events/public?per_page=25`, {
        headers: { Accept: 'application/vnd.github+json' }, signal: controller.signal
      });
      if (!response.ok) throw new Error(`GitHub HTTP ${response.status}`);
      const events = await response.json();
      if (!Array.isArray(events)) throw new Error('Invalid GitHub response');
      const recognized = events.filter(event => ['PushEvent', 'CreateEvent', 'ReleaseEvent', 'PullRequestEvent', 'IssuesEvent'].includes(event.type)).slice(0, 3);
      if (!recognized.length) return activityFallback();
      activityFeed.replaceChildren();
      recognized.forEach((event) => {
        const repo = event.repo && typeof event.repo.name === 'string' ? event.repo.name : 'unknown';
        if (!/^[-\w.]+\/[-\w.]+$/.test(repo)) return;
        const row = document.createElement('div'); row.className = 'activity-item';
        const symbol = document.createElement('span'); symbol.className = 'activity-item-symbol';
        const symbols = { PushEvent: '↗', CreateEvent: '+', ReleaseEvent: '↑', PullRequestEvent: '⇄', IssuesEvent: '#' };
        symbol.textContent = symbols[event.type] || '·';
        const body = document.createElement('div');
        const title = document.createElement('strong');
        const actions = { PushEvent: 'Pushed to', CreateEvent: 'Created in', ReleaseEvent: 'Published a release in', PullRequestEvent: 'Updated a pull request in', IssuesEvent: 'Worked on an issue in' };
        title.append(document.createTextNode(`${actions[event.type]} `));
        const link = document.createElement('a'); link.href = `https://github.com/${repo}`;
        link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = repo.split('/')[1];
        title.append(link);
        const date = document.createElement('p');
        const parsed = new Date(event.created_at);
        date.textContent = Number.isNaN(parsed.getTime()) ? 'GitHub public event' : new Intl.DateTimeFormat('en', { year:'numeric',month:'short',day:'numeric' }).format(parsed);
        body.append(title, date); row.append(symbol, body); activityFeed.append(row);
      });
      if (!activityFeed.children.length) return activityFallback();
      const footer = document.createElement('div'); footer.className = 'activity-footer';
      const info = document.createElement('span'); info.textContent = 'LIVE / GITHUB PUBLIC EVENTS';
      const link = document.createElement('a'); link.href = `https://github.com/${site.profile.github}`;
      link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = 'Profile ↗';
      footer.append(info, link); activityFeed.append(footer);
    } catch (error) {
      activityFallback();
    } finally { clearTimeout(timeout); }
  }
  loadActivity();
})();
