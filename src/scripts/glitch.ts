type GlitchTrigger = 'hover' | 'idle' | 'mount';
type GlitchMode = 'micro' | 'rgb';

const GLITCH_CHARACTERS = ['#', '_', '/', '0', '1', '▌'] as const;
const DEFAULT_CHANCES: Record<GlitchTrigger, number> = {
	hover: 0.32,
	idle: 0.6,
	mount: 0.35,
};
const DEFAULT_COOLDOWN = 2000;
const IDLE_SHOWCASE_MIN_DELAY = 1800;
const IDLE_SHOWCASE_MAX_DELAY = 3000;
const IDLE_INTRO_MIN_DELAY = 3500;
const IDLE_INTRO_MAX_DELAY = 5000;
const IDLE_MIN_DELAY = 5500;
const IDLE_MAX_DELAY = 9000;
const HOVER_PAGE_COOLDOWN = 900;
const PAGE_TRANSITION_MISSES_KEY = 'suiyan:page-transition-misses';
const SHOWCASE_STORAGE_PREFIX = 'suiyan:glitch-showcase:';

const root = document.documentElement;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
const lastGlitchAt = new WeakMap<HTMLElement, number>();
const hoveredElements = new WeakSet<HTMLElement>();
const originalText = new WeakMap<HTMLElement, string>();
const idleElements = new Set<HTMLElement>();
const introducedIdleGroups = new Set<string>();

let ambientReady = false;
let ready = false;
let idleTimer: number | undefined;
let activeElement: HTMLElement | null = null;
let activeTimer: number | undefined;
let pageTransitionPlayed = false;
let idleShowcasePending = true;
let hoverShowcaseUsed = false;
let lastHoverGlitchAt = 0;
let lastIdleGroup = '';
let pageTransitionMisses = readPageTransitionMisses();
let idleObserverRegistered = false;
let settleObserver: MutationObserver | undefined;
let idleObserver: IntersectionObserver | undefined;

function readPageTransitionMisses() {
	try {
		const value = Number(
			window.sessionStorage.getItem(PAGE_TRANSITION_MISSES_KEY) ?? 0,
		);
		return Number.isFinite(value) ? Math.max(0, Math.min(2, value)) : 0;
	} catch {
		return 0;
	}
}

function writePageTransitionMisses(misses: number) {
	pageTransitionMisses = misses;
	try {
		window.sessionStorage.setItem(PAGE_TRANSITION_MISSES_KEY, String(misses));
	} catch {
		// 存储不可用时仍保留当前页面内的连续未命中计数。
	}
}

function getMode(element: HTMLElement): GlitchMode {
	return element.dataset.glitchText === 'rgb' ? 'rgb' : 'micro';
}

function getTriggers(element: HTMLElement) {
	return new Set((element.dataset.glitchOn ?? '').split(/\s+/).filter(Boolean));
}

function getChance(element: HTMLElement, trigger: GlitchTrigger) {
	const triggerChance = Number(
		element.getAttribute(`data-glitch-${trigger}-chance`),
	);
	const configured = Number(element.dataset.glitchChance);
	if (Number.isFinite(triggerChance) && triggerChance > 0) {
		return Math.min(triggerChance, 1);
	}
	if (Number.isFinite(configured) && configured > 0) {
		return Math.min(configured, 1);
	}
	return DEFAULT_CHANCES[trigger];
}

function getCooldown(element: HTMLElement) {
	const configured = Number(element.dataset.glitchCooldown);
	return Number.isFinite(configured) && configured >= 0
		? configured
		: DEFAULT_COOLDOWN;
}

function isAriaHidden(element: HTMLElement) {
	return Boolean(element.closest('[aria-hidden="true"]'));
}

function isVisuallyAvailable(element: HTMLElement) {
	let current: HTMLElement | null = element;
	while (current && current !== document.body) {
		const style = window.getComputedStyle(current);
		if (
			style.visibility === 'hidden' ||
			style.display === 'none' ||
			Number.parseFloat(style.opacity) < 0.1
		) {
			return false;
		}
		current = current.parentElement;
	}
	return true;
}

function canTrigger(element: HTMLElement, trigger: GlitchTrigger) {
	const isReady =
		trigger === 'mount' && element.dataset.glitchAfter !== 'ambient'
			? ready
			: ambientReady;
	if (!isReady || reduceMotion.matches || document.hidden || activeElement) return false;
	if (
		!element.isConnected ||
		element.getClientRects().length === 0 ||
		!isVisuallyAvailable(element) ||
		element.classList.contains('is-typing')
	) {
		return false;
	}
	const lastTriggered = lastGlitchAt.get(element) ?? 0;
	return performance.now() - lastTriggered >= getCooldown(element);
}

function startActiveTimer(element: HTMLElement, duration: number) {
	activeElement = element;
	window.clearTimeout(activeTimer);
	activeTimer = window.setTimeout(() => {
		element.classList.remove(
			'is-character-glitching',
			'is-rgb-glitching',
			'is-avatar-glitching',
		);
		element.removeAttribute('data-glitch-copy');

		const text = originalText.get(element);
		if (text !== undefined) {
			element.textContent = text;
			originalText.delete(element);
		}

		if (activeElement === element) activeElement = null;
		activeTimer = undefined;
	}, duration);
}

function triggerCharacterGlitch(element: HTMLElement) {
	if (!isAriaHidden(element)) return false;

	const text = element.textContent ?? '';
	const characters = Array.from(text);
	const replaceable = characters
		.map((character, index) => ({ character, index }))
		.filter(({ character }) => /[\p{L}\p{N}]/u.test(character));
	if (replaceable.length === 0) return false;

	const target = replaceable[Math.floor(Math.random() * replaceable.length)];
	characters[target.index] =
		GLITCH_CHARACTERS[Math.floor(Math.random() * GLITCH_CHARACTERS.length)];
	originalText.set(element, text);
	element.textContent = characters.join('');
	element.classList.add('is-character-glitching');
	startActiveTimer(element, 150);
	return true;
}

function triggerRgbGlitch(element: HTMLElement) {
	if (!isAriaHidden(element)) return false;

	element.dataset.glitchCopy = element.textContent?.trim() ?? '';
	if (!element.dataset.glitchCopy) return false;

	element.classList.add('is-rgb-glitching');
	startActiveTimer(element, 190);
	return true;
}

function triggerAvatarGlitch(element: HTMLElement) {
	if (element.dataset.glitchVisual !== 'avatar') return false;
	element.classList.add('is-avatar-glitching');
	startActiveTimer(element, 260);
	return true;
}

function triggerGlitch(element: HTMLElement, trigger: GlitchTrigger, force = false) {
	if (!canTrigger(element, trigger)) return false;
	if (!force && Math.random() >= getChance(element, trigger)) return false;

	const applied =
		element.dataset.glitchVisual === 'avatar'
			? triggerAvatarGlitch(element)
			: getMode(element) === 'rgb'
				? triggerRgbGlitch(element)
				: triggerCharacterGlitch(element);
	if (!applied) return false;

	lastGlitchAt.set(element, performance.now());
	return true;
}

function registerIdleElements() {
	if (idleObserverRegistered) return;
	idleObserverRegistered = true;
	idleObserver?.disconnect();
	idleElements.clear();
	idleObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				const element = entry.target as HTMLElement;
				if (entry.isIntersecting) {
					idleElements.add(element);
				} else {
					idleElements.delete(element);
				}
			});
		},
		{ rootMargin: '80px 0px', threshold: 0.2 },
	);

	document
		.querySelectorAll<HTMLElement>('[data-glitch-text], [data-glitch-visual]')
		.forEach((element) => {
			if (getTriggers(element).has('idle')) idleObserver?.observe(element);
		});
}

function isClearlyVisible(element: HTMLElement) {
	const rect = element.getBoundingClientRect();
	return (
		rect.bottom > 12 &&
		rect.top < window.innerHeight - 12 &&
		rect.right > 0 &&
		rect.left < window.innerWidth
	);
}

function getIdleGroup(element: HTMLElement) {
	return element.dataset.glitchGroup ?? '';
}

function groupCandidates(candidates: HTMLElement[]) {
	const groups = new Map<string, HTMLElement[]>();
	candidates.forEach((element) => {
		const group = getIdleGroup(element);
		const entries = groups.get(group) ?? [];
		entries.push(element);
		groups.set(group, entries);
	});
	return groups;
}

function chooseIdleCandidate(candidates: HTMLElement[]) {
	if (candidates.length === 0) return null;
	const groups = groupCandidates(candidates);
	const pendingIntroductions = Array.from(groups.entries()).filter(
		([group, elements]) =>
			!introducedIdleGroups.has(group) &&
			elements.some((element) => element.hasAttribute('data-glitch-introduce')),
	);
	const selectableGroups =
		pendingIntroductions.length > 0
			? pendingIntroductions
			: groups.size > 1
				? Array.from(groups.entries()).filter(([group]) => group !== lastIdleGroup)
				: Array.from(groups.entries());
	const [group, entries] =
		selectableGroups[Math.floor(Math.random() * selectableGroups.length)];
	return {
		element: entries[Math.floor(Math.random() * entries.length)],
		group,
	};
}

function scheduleIdleGlitch() {
	window.clearTimeout(idleTimer);
	idleTimer = undefined;
	if (!ambientReady || reduceMotion.matches || document.hidden) return;

	const introductionPending = Array.from(idleElements).some(
		(element) =>
			element.hasAttribute('data-glitch-introduce') &&
			!introducedIdleGroups.has(getIdleGroup(element)),
	);
	const delay = idleShowcasePending
		? IDLE_SHOWCASE_MIN_DELAY +
			Math.random() * (IDLE_SHOWCASE_MAX_DELAY - IDLE_SHOWCASE_MIN_DELAY)
		: introductionPending
			? IDLE_INTRO_MIN_DELAY +
				Math.random() * (IDLE_INTRO_MAX_DELAY - IDLE_INTRO_MIN_DELAY)
			: IDLE_MIN_DELAY + Math.random() * (IDLE_MAX_DELAY - IDLE_MIN_DELAY);
	idleTimer = window.setTimeout(() => {
		const candidates = Array.from(idleElements).filter(
			(element) =>
				!hoveredElements.has(element) &&
				isClearlyVisible(element) &&
				canTrigger(element, 'idle'),
		);
		const selection = chooseIdleCandidate(candidates);
		if (selection) {
			const needsIntroduction =
				selection.element.hasAttribute('data-glitch-introduce') &&
				!introducedIdleGroups.has(selection.group);
			const applied = triggerGlitch(
				selection.element,
				'idle',
				idleShowcasePending || needsIntroduction,
			);
			if (applied) {
				if (idleShowcasePending) idleShowcasePending = false;
				if (needsIntroduction) introducedIdleGroups.add(selection.group);
				lastIdleGroup = selection.group;
			}
		} else if (idleShowcasePending) {
			window.clearTimeout(idleTimer);
			idleTimer = window.setTimeout(scheduleIdleGlitch, 1200);
			return;
		}
		scheduleIdleGlitch();
	}, delay);
}

function showcaseAlreadyShown(key: string) {
	try {
		return window.sessionStorage.getItem(SHOWCASE_STORAGE_PREFIX + key) === '1';
	} catch {
		return false;
	}
}

function markShowcaseShown(key: string) {
	try {
		window.sessionStorage.setItem(SHOWCASE_STORAGE_PREFIX + key, '1');
	} catch {
		// 存储不可用时本次页面仍已完成展示。
	}
}

function scheduleMountGlitches(after: 'ambient' | 'settled') {
	document
		.querySelectorAll<HTMLElement>('[data-glitch-text]')
		.forEach((element, index) => {
			if (!getTriggers(element).has('mount')) return;
			const requestedAfter = element.dataset.glitchAfter ?? 'settled';
			if (requestedAfter !== after) return;

			window.setTimeout(() => {
				const showcaseKey = element.dataset.glitchShowcase;
				const force = Boolean(
					showcaseKey && !showcaseAlreadyShown(showcaseKey),
				);
				const attempt = (attemptIndex = 0) => {
					const applied = triggerGlitch(element, 'mount', force);
					if (applied) {
						if (showcaseKey) markShowcaseShown(showcaseKey);
						return;
					}
					if (force && attemptIndex < 8) {
						window.setTimeout(() => attempt(attemptIndex + 1), 600);
					}
				};
				attempt();
			}, 420 + index * 120);
		});
}

function activateAmbientGlitches() {
	if (ambientReady) return;
	ambientReady = true;
	registerIdleElements();
	scheduleMountGlitches('ambient');
	scheduleIdleGlitch();
}

function activateGlitches() {
	if (ready) return;
	ready = true;
	settleObserver?.disconnect();
	activateAmbientGlitches();
	scheduleMountGlitches('settled');
	if (idleTimer === undefined) scheduleIdleGlitch();
}

function watchForSettledMotion() {
	const motionSettled =
		root.classList.contains('motion-finished') ||
		root.classList.contains('motion-fallback') ||
		!root.classList.contains('motion-active');
	const ambientAvailable =
		motionSettled || root.classList.contains('motion-shell-drawn');

	if (ambientAvailable) activateAmbientGlitches();
	if (motionSettled) {
		activateGlitches();
		return;
	}

	settleObserver?.disconnect();
	settleObserver = new MutationObserver(() => {
		if (root.classList.contains('motion-shell-drawn')) {
			activateAmbientGlitches();
		}
		if (
			root.classList.contains('motion-finished') ||
			root.classList.contains('motion-fallback')
		) {
			activateGlitches();
		}
	});
	settleObserver.observe(root, { attributes: true, attributeFilter: ['class'] });
}

function canUseAmbientGlitch() {
	return ambientReady && !reduceMotion.matches && !document.hidden;
}

function closestGlitchTarget(target: EventTarget | null) {
	return target instanceof Element
		? target.closest<HTMLElement>(
				'[data-glitch-text][data-glitch-on~="hover"]',
			)
		: null;
}

document.addEventListener('pointerover', (event) => {
	if (!finePointer.matches || !canUseAmbientGlitch()) return;
	const element = closestGlitchTarget(event.target);
	if (!element || element.contains(event.relatedTarget as Node | null)) return;

	hoveredElements.add(element);
	const now = performance.now();
	if (hoverShowcaseUsed && now - lastHoverGlitchAt < HOVER_PAGE_COOLDOWN) return;

	const firstHover = !hoverShowcaseUsed;
	const applied = triggerGlitch(element, 'hover', firstHover);
	if (!applied) return;

	hoverShowcaseUsed = true;
	lastHoverGlitchAt = now;
});

document.addEventListener('pointerout', (event) => {
	const element = closestGlitchTarget(event.target);
	if (!element) return;
	if (event.relatedTarget instanceof Node && element.contains(event.relatedTarget)) return;
	hoveredElements.delete(element);
});

document.addEventListener('visibilitychange', () => {
	if (document.hidden) {
		window.clearTimeout(idleTimer);
		idleTimer = undefined;
	} else {
		scheduleIdleGlitch();
	}
});

reduceMotion.addEventListener('change', (event) => {
	if (event.matches) {
		window.clearTimeout(idleTimer);
		idleTimer = undefined;
		return;
	}
	scheduleIdleGlitch();
});

/*
 * Ambient effects may begin after the shell is drawn, while the remaining
 * page reveal continues. Settled-only effects and navigation wait for the
 * full page timeline.
 */

function getInternalNavigation(anchor: HTMLAnchorElement) {
	const url = new URL(anchor.href, window.location.href);
	if (!['http:', 'https:'].includes(url.protocol)) return null;
	if (url.origin !== window.location.origin) return null;
	if (url.pathname === window.location.pathname && url.search === window.location.search) {
		return null;
	}
	if (url.protocol !== window.location.protocol) return null;
	return url;
}

function canAnimateNavigation(
	event: MouseEvent,
	anchor: HTMLAnchorElement,
	destination: URL,
) {
	if (!ready || reduceMotion.matches || document.hidden || pageTransitionPlayed) {
		return false;
	}
	if (event.defaultPrevented || event.button !== 0) return false;
	if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
	if (anchor.hasAttribute('download')) return false;
	if (anchor.dataset.noGlitch !== undefined) return false;

	const target = anchor.getAttribute('target');
	if (target && target.toLowerCase() !== '_self') return false;

	const rel = new Set((anchor.getAttribute('rel') ?? '').toLowerCase().split(/\s+/));
	if (rel.has('external')) return false;

	return destination.href !== window.location.href;
}

function shouldPlayPageTransition() {
	const chance =
		pageTransitionMisses >= 2 ? 1 : Math.min(0.8, 0.3 + pageTransitionMisses * 0.25);
	if (Math.random() < chance) {
		writePageTransitionMisses(0);
		return true;
	}
	writePageTransitionMisses(Math.min(2, pageTransitionMisses + 1));
	return false;
}

function playPageTransition(destination: URL) {
	pageTransitionPlayed = true;
	root.classList.add('is-page-glitching-out');

	const layer = document.createElement('div');
	layer.className = 'suiyan-glitch-transition';
	layer.setAttribute('aria-hidden', 'true');

	[
		{ top: 16, height: 2, offset: -3, delay: 0 },
		{ top: 34, height: 4, offset: 2, delay: 18 },
		{ top: 57, height: 2, offset: -2, delay: 8 },
		{ top: 73, height: 5, offset: 3, delay: 26 },
		{ top: 88, height: 2, offset: -1, delay: 14 },
	].forEach(({ top, height, offset, delay }) => {
		const slice = document.createElement('span');
		slice.className = 'suiyan-glitch-transition__slice';
		slice.style.setProperty('--slice-top', `${top}%`);
		slice.style.setProperty('--slice-height', `${height}px`);
		slice.style.setProperty('--slice-offset', `${offset}px`);
		slice.style.setProperty('--slice-delay', `${delay}ms`);
		layer.append(slice);
	});

	document.body.append(layer);
	try {
		window.sessionStorage.setItem('suiyan:glitch-arrival', String(Date.now()));
	} catch {
		// 存储不可用时仍应继续导航。
	}
	window.setTimeout(() => {
		window.location.assign(destination.href);
	}, 280);
	window.setTimeout(() => {
		root.classList.remove('is-page-glitching-out');
		layer.remove();
		pageTransitionPlayed = false;
	}, 1600);
}

document.addEventListener('click', (event) => {
	if (!(event.target instanceof Element)) return;
	const anchor = event.target.closest<HTMLAnchorElement>('a[href]');
	if (!anchor) return;

	const destination = getInternalNavigation(anchor);
	if (!destination || !canAnimateNavigation(event, anchor, destination)) return;
	if (!shouldPlayPageTransition()) return;

	event.preventDefault();
	playPageTransition(destination);
});

watchForSettledMotion();
