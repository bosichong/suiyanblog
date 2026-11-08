import { animate } from 'motion/mini';
import type { AnimationPlaybackControls } from 'motion';

type MotionPage = 'home' | 'links' | 'about' | 'archive' | 'article' | 'tags' | 'static';

type TypewriterJob = {
	element: HTMLElement;
	text: string;
};

type Point = {
	x: number;
	y: number;
};

type PointerScene = {
	element: Element;
	reveal: () => void;
};

const EASE = [0.16, 1, 0.3, 1] as const;
const POINTER_EASE = [0.37, 0, 0.63, 1] as const;
const POINTER_COLORS = [
	'82, 111, 141',
	'177, 91, 91',
	'73, 139, 111',
	'176, 133, 65',
	'126, 93, 169',
	'62, 145, 157',
	'184, 99, 139',
	'105, 119, 172',
] as const;
const page = document.body.dataset.motionPage as MotionPage | undefined;
const root = document.documentElement;

if (page && root.classList.contains('motion-active')) {
	void initialiseMotion(page).catch(() => {
		window.__suiyanFinishMotion?.();
		if (!window.__suiyanFinishMotion) {
			root.classList.remove('motion-active', 'motion-loading');
			root.classList.add('motion-finished', 'motion-fallback');
			document.querySelector('[data-page-loader]')?.remove();
		}
	});
}

async function initialiseMotion(currentPage: MotionPage) {
	let typewriters: TypewriterJob[] = [];
	const animations: AnimationPlaybackControls[] = [];
	const pendingMotions = new Set<Promise<unknown>>();
	const timers = new Set<number>();
	let stopped = false;

	const sleep = (milliseconds: number) =>
		new Promise<void>((resolve) => {
			const timer = window.setTimeout(() => {
				timers.delete(timer);
				resolve();
			}, milliseconds);
			timers.add(timer);
		});

	const dismissLoader = (animated = false) => {
		const loader = document.querySelector<HTMLElement>('[data-page-loader]');
		if (!loader) return Promise.resolve();
		loader.classList.add('is-leaving');
		if (!animated) {
			loader.remove();
			return Promise.resolve();
		}
		return new Promise<void>((resolve) => {
			window.setTimeout(() => {
				loader.remove();
				resolve();
			}, 660);
		});
	};

	const finish = () => {
		if (stopped) return;
		stopped = true;
		window.clearTimeout(window.__suiyanMotionTimer);
		timers.forEach((timer) => window.clearTimeout(timer));
		animations.forEach((animation) => animation.stop());
		document.querySelector('.motion-drawing-layer')?.remove();
		typewriters.forEach(({ element, text }) => {
			element.textContent = text;
			element.classList.remove('is-typing');
		});
		window.__suiyanFinishMotion = undefined;
		void dismissLoader();
		root.classList.remove('motion-active', 'motion-loading');
		root.classList.add('motion-finished', 'motion-fallback');
	};

	window.__suiyanFinishMotion = finish;

	const motionAnimate = (
		element: Element,
		keyframes: Record<string, string | number | Array<string | number>>,
		options: Record<string, unknown> = {},
		track = true,
	) => {
		const animation = animate(element, keyframes, {
			ease: EASE,
			...options,
		});
		animations.push(animation);
		if (track) {
			const completion = animation.finished.catch(() => undefined);
			pendingMotions.add(completion);
			completion.then(() => pendingMotions.delete(completion));
		}
		return animation;
	};

	const scanFrame = (element: Element, delay = 0) => {
		return motionAnimate(
			element,
			{
				opacity: [0, 1],
				clipPath: ['inset(0 100% 0 0)', 'inset(0 0 0 0)'],
			},
			{ duration: 0.55, delay },
		);
	};

	const reveal = (
		element: Element,
		delay = 0,
		options: { duration?: number; distance?: number } = {},
	) => {
		const duration = options.duration ?? 0.42;
		const distance = options.distance ?? 8;
		return motionAnimate(
			element,
			{
				opacity: [0, 1],
				transform: [`translate3d(0, ${distance}px, 0)`, 'translate3d(0, 0, 0)'],
			},
			{ duration, delay },
		);
	};

	const revealNavItem = (item: Element, index: number) => {
		return motionAnimate(
			item,
			{
				opacity: [0, 1],
				transform: ['scale(0.72)', 'scale(1)'],
			},
			{ duration: 0.3, delay: index * 0.025 },
		);
	};

	const animateLinkItems = (items: Iterable<Element>, start: number, stagger = 0.065) => {
		Array.from(items).forEach((item, index) => {
			const delay = start + index * stagger;
			reveal(item, delay, { duration: 0.34, distance: 7 });

			const date = item.querySelector('.post-date');
			if (date) reveal(date, delay + 0.05, { duration: 0.3, distance: 0 });

			const target = item.querySelector<HTMLElement>('[data-typewriter]');
			if (target) scheduleTypewriter(target, delay + 0.12);
		});
	};

	const scheduleTypewriter = (element: HTMLElement, delay: number, speed = 30) => {
		const job = typewriters.find(({ element: candidate }) => candidate === element);
		if (!job) return;
		const completion = new Promise<void>((resolve) => {
			const timer = window.setTimeout(() => {
				timers.delete(timer);
				void typeText(job, speed).finally(resolve);
			}, delay * 1000);
			timers.add(timer);
		});
		pendingMotions.add(completion);
		completion.then(() => pendingMotions.delete(completion));
	};

	const typeText = async (job: TypewriterJob, speed: number) => {
		const characters = Array.from(job.text);
		job.element.textContent = '';
		const textNode = document.createTextNode('');
		job.element.append(textNode);
		job.element.classList.add('is-typing');

		for (const character of characters) {
			if (stopped) return;
			textNode.appendData(character);
			await sleep(speed);
		}

		job.element.classList.remove('is-typing');
	};

	const pointerTransform = (point: Point, scale = 1, rotation = 0) =>
		`translate3d(${point.x}px, ${point.y}px, 0) scale(${scale}) rotate(${rotation}deg)`;

	const distanceBetween = (from: Point, to: Point) =>
		Math.hypot(to.x - from.x, to.y - from.y);

	const pointerTiltAngles = (points: Point[]) =>
		points.map((_, index) => {
			const previous = points[Math.max(0, index - 1)];
			const next = points[Math.min(points.length - 1, index + 1)];
			const deltaX = next.x - previous.x;
			const deltaY = next.y - previous.y;
			const angle =
				deltaX === 0 && deltaY === 0
					? 0
					: (Math.atan2(deltaY, deltaX) * 180) / Math.PI;
			return Math.max(-15, Math.min(15, angle * 0.18));
		});

	const animatePointerPath = async (
		pointer: Element,
		points: Point[],
		duration: number,
		delay = 0,
	) => {
		const tilts = pointerTiltAngles(points);
		await motionAnimate(
			pointer,
			{
				transform: points.map((point, index) =>
					pointerTransform(point, 1, tilts[index]),
				),
			},
			{ duration, delay, ease: POINTER_EASE },
			false,
		).finished.catch(() => undefined);
	};

	const createCurve = (from: Point, to: Point, direction: number) => {
		const distance = Math.max(distanceBetween(from, to), 1);
		const normalX = -(to.y - from.y) / distance;
		const normalY = (to.x - from.x) / distance;
		const bend = Math.max(45, Math.min(260, distance * 0.5)) * direction;
		const controlOne = {
			x: from.x + (to.x - from.x) * 0.26 + normalX * bend * 0.9,
			y: from.y + (to.y - from.y) * 0.26 + normalY * bend * 0.9,
		};
		const controlTwo = {
			x: from.x + (to.x - from.x) * 0.72 + normalX * bend * 0.55,
			y: from.y + (to.y - from.y) * 0.72 + normalY * bend * 0.55,
		};
		const samples: Point[] = [];

		for (let index = 0; index <= 28; index++) {
			const progress = index / 28;
			const inverse = 1 - progress;
			samples.push({
				x:
					inverse ** 3 * from.x +
					3 * inverse ** 2 * progress * controlOne.x +
					3 * inverse * progress ** 2 * controlTwo.x +
					progress ** 3 * to.x,
				y:
					inverse ** 3 * from.y +
					3 * inverse ** 2 * progress * controlOne.y +
					3 * inverse * progress ** 2 * controlTwo.y +
					progress ** 3 * to.y,
			});
		}

		return samples;
	};

	const travelPointer = async (
		pointer: Element,
		from: Point,
		to: Point,
		duration: number,
		direction: number,
	) => {
		const samples = createCurve(from, to, direction);
		await animatePointerPath(pointer, samples, duration);
	};

	const revealedFrames = new WeakSet<Element>();
	const revealFrame = (element: Element) => {
		if (revealedFrames.has(element)) return;
		revealedFrames.add(element);
		scanFrame(element);
	};

	const scenePoint = (element: Element): Point => {
		const rect = element.getBoundingClientRect();
		return {
			x: Math.min(
				Math.max(rect.left + Math.min(rect.width * 0.65, 90), 12),
				window.innerWidth - 12,
			),
			y: rect.top + Math.min(rect.height * 0.5, 60),
		};
	};

	const pulsePointer = (pointer: Element) => {
		pointer.classList.remove('is-revealing');
		void (pointer as HTMLElement).offsetWidth;
		pointer.classList.add('is-revealing');
		const timer = window.setTimeout(() => {
			timers.delete(timer);
			pointer.classList.remove('is-revealing');
		}, 320);
		timers.add(timer);
	};

	let drawGuideFrame: (element: Element) => void = () => {};

	const revealScene = (scene: PointerScene, pointer?: Element) => {
		if (pointer) pulsePointer(pointer);
		scene.reveal();
		drawGuideFrame(scene.element);
	};

	const runPointerJourney = async (scenes: PointerScene[]) => {
		if (scenes.length === 0) return;

		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;
		const layer = document.createElement('div');
		layer.className = 'motion-drawing-layer';
		layer.setAttribute('aria-hidden', 'true');
		const guideLayer = document.createElement('div');
		guideLayer.className = 'motion-guide-layer';
		layer.append(guideLayer);

		const randomBetween = (minimum: number, maximum: number) =>
			minimum + Math.random() * (maximum - minimum);
		const createOutsidePoint = (): Point => {
			const margin = randomBetween(90, 220);
			const side = Math.floor(Math.random() * 4);
			if (side === 0) {
				return { x: randomBetween(0, viewportWidth), y: -margin };
			}
			if (side === 1) {
				return { x: viewportWidth + margin, y: randomBetween(0, viewportHeight) };
			}
			if (side === 2) {
				return { x: randomBetween(0, viewportWidth), y: viewportHeight + margin };
			}
			return { x: -margin, y: randomBetween(0, viewportHeight) };
		};
		const origins: Point[] = Array.from({ length: 8 }, () => ({
			x: randomBetween(viewportWidth * 0.08, viewportWidth * 0.92),
			y: randomBetween(viewportHeight * 0.14, viewportHeight * 0.78),
		}));

		const pointerMarkup = `
			<svg viewBox="0 0 24 28" aria-hidden="true">
				<path d="M2 2v20l5.3-4.8 4.1 8.5 3.8-1.8-4-8.3H19L2 2Z"
					fill="#fff" stroke="currentColor" stroke-width="1.8"
					stroke-linejoin="round" />
			</svg>
		`;
		const createPointer = (index: number, point: Point) => {
			const pointer = document.createElement('div');
			const color = POINTER_COLORS[index % POINTER_COLORS.length];
			pointer.className = 'motion-pointer';
			pointer.style.color = `rgb(${color})`;
			pointer.style.setProperty('--pointer-rgb', color);
			pointer.style.transform = pointerTransform(point);
			pointer.innerHTML = pointerMarkup;
			return pointer;
		};

		const pointers = origins.map((origin, index) => {
			const pointer = createPointer(index, origin);
			layer.append(pointer);
			return pointer;
		});

		document.body.append(layer);
		const currentPositions = origins.map((origin) => ({ ...origin }));
		const workQueue = [...scenes];

		const exitPointer = async (pointer: Element, pointerIndex: number) => {
			pointer.classList.remove('is-working');
			const from = currentPositions[pointerIndex];
			const target = createOutsidePoint();
			const samples = createCurve(
				from,
				target,
				Math.random() < 0.5 ? 1 : -1,
			);
			const duration = 0.55 + Math.min(0.3, distanceBetween(from, target) / 2000);
			await Promise.all([
				animatePointerPath(pointer, samples, duration),
				motionAnimate(
					pointer,
					{ opacity: [1, 1, 0] },
					{ duration, ease: POINTER_EASE },
					false,
				).finished.catch(() => undefined),
			]);
		};

		const maxGuideFrames = 2;
		let activeGuideFrames = 0;
		const guideWaiters: Array<() => void> = [];
		const acquireGuideSlot = () => {
			if (activeGuideFrames < maxGuideFrames) {
				activeGuideFrames++;
				return Promise.resolve();
			}
			return new Promise<void>((resolve) => guideWaiters.push(resolve));
		};
		const releaseGuideSlot = () => {
			const next = guideWaiters.shift();
			if (next) {
				next();
				return;
			}
			activeGuideFrames--;
		};

		const drawGuideFrameEffect = async (element: Element) => {
			await acquireGuideSlot();
			let frame: HTMLElement | undefined;

			try {
				if (stopped) return;
				const rect = element.getBoundingClientRect();
				if (rect.bottom < 0 || rect.top > viewportHeight) return;

				const top = Math.max(1, Math.min(rect.top, viewportHeight - 1));
				const bottom = Math.max(1, Math.min(rect.bottom, viewportHeight - 1));
				const left = Math.max(1, Math.min(rect.left, viewportWidth - 1));
				const right = Math.max(1, Math.min(rect.right, viewportWidth - 1));

				frame = document.createElement('div');
				frame.className = 'motion-guide-frame';
				guideLayer.append(frame);

				const edges = [
					{
						orientation: 'horizontal',
						start: { x: 0, y: top },
						end: { x: viewportWidth, y: top },
						clipStart: 'inset(0 100% 0 0)',
					},
					{
						orientation: 'vertical',
						start: { x: right, y: 0 },
						end: { x: right, y: viewportHeight },
						clipStart: 'inset(0 0 100% 0)',
					},
					{
						orientation: 'horizontal',
						start: { x: viewportWidth, y: bottom },
						end: { x: 0, y: bottom },
						clipStart: 'inset(0 0 0 100%)',
					},
					{
						orientation: 'vertical',
						start: { x: left, y: viewportHeight },
						end: { x: left, y: 0 },
						clipStart: 'inset(100% 0 0 0)',
					},
				] as const;
				const colorOffset = Math.floor(
					Math.random() * POINTER_COLORS.length,
				);

				await Promise.all(
					edges.map(async (edge, index) => {
						const delay = index * 0.018;
						const colorIndex = (colorOffset + index) % POINTER_COLORS.length;
						const color = POINTER_COLORS[colorIndex];
						const line = document.createElement('span');
						line.className = `motion-guide-line is-${edge.orientation}`;
						line.style.setProperty('--guide-rgb', color);
						if (edge.orientation === 'horizontal') {
							line.style.left = '0';
							line.style.top = `${edge.start.y}px`;
							line.style.width = `${viewportWidth}px`;
						} else {
							line.style.left = `${edge.start.x}px`;
							line.style.top = '0';
							line.style.height = `${viewportHeight}px`;
						}
						frame?.append(line);

						const helper = createPointer(colorIndex, edge.start);
						helper.classList.add('is-guide');
						(helper as HTMLElement).style.opacity = '1';
						layer.append(helper);

						await Promise.all([
							animatePointerPath(
								helper,
								[edge.start, edge.end],
								0.18,
								delay,
							),
							motionAnimate(
								line,
								{ clipPath: [edge.clipStart, 'inset(0 0 0 0)'] },
								{ duration: 0.18, delay, ease: POINTER_EASE },
								false,
							).finished.catch(() => undefined),
						]);
						helper.remove();
					}),
				);
			} finally {
				frame?.remove();
				releaseGuideSlot();
			}
		};

		drawGuideFrame = (element) => {
			const completion = drawGuideFrameEffect(element);
			pendingMotions.add(completion);
			completion.then(
				() => pendingMotions.delete(completion),
				() => pendingMotions.delete(completion),
			);
		};

		try {
			let shellDrawn = false;
			const markShellDrawn = () => {
				if (shellDrawn) return;
				shellDrawn = true;
				root.classList.add('motion-shell-drawn');
			};

			await Promise.all(
				pointers.map(async (pointer, index) => {
					await sleep(index * 45);
					if (stopped) return;

					(pointer as HTMLElement).style.opacity = '1';
					pointer.classList.add('is-working');
					markShellDrawn();

					while (!stopped) {
						const scene = workQueue.shift();
						if (!scene) break;

						const current = currentPositions[index];
						const target = scenePoint(scene.element);
						const duration =
							0.34 + Math.min(0.34, distanceBetween(current, target) / 1800);
						await travelPointer(
							pointer,
							current,
							target,
							duration,
							Math.random() < 0.5 ? 1 : -1,
						);
						if (stopped) return;
						revealScene(scene, pointer);
						currentPositions[index] = target;
					}

					if (!stopped) await exitPointer(pointer, index);
				}),
			);

			if (!stopped) {
				await Promise.allSettled(Array.from(pendingMotions));
			}
		} finally {
			drawGuideFrame = () => {};
			layer.remove();
		}
	};

	const buildPointerScenes = () => {
		const scenes: PointerScene[] = [];
		document.querySelectorAll<HTMLElement>('[data-motion-nav-item]').forEach((item, index) => {
			scenes.push({
				element: item,
				reveal: () => revealNavItem(item, index),
			});
		});
		if (currentPage === 'home') {
			const hero = document.querySelector('.hero');
			const avatar = document.querySelector('[data-motion-avatar]');
			const heroContent = document.querySelector('.hero-text');
			const heroTitle = document.querySelector('.hero-title');
			const intro = document.querySelector<HTMLElement>('.hero-desc [data-typewriter]');
			const list = document.querySelector('.category-section');
			const postItems = document.querySelectorAll<HTMLElement>('.category-section .post-item');

			if (avatar) {
				scenes.push({
					element: avatar,
					reveal: () => {
						if (hero) revealFrame(hero);
						motionAnimate(
							avatar,
							{
								opacity: [0, 1],
								transform: ['scale(0.72)', 'scale(1)'],
								clipPath: [
									'inset(0 0 100% 0 round 50%)',
									'inset(0 0 0 0 round 50%)',
								],
							},
							{ duration: 0.55 },
						);
					},
				});
			}
			if (heroContent) {
				scenes.push({
					element: heroContent,
					reveal: () => {
						if (hero) revealFrame(hero);
						reveal(heroContent, 0, { duration: 0.38, distance: 7 });
						if (heroTitle) reveal(heroTitle, 0.04, { duration: 0.32, distance: 4 });
						if (intro) scheduleTypewriter(intro, 0.08, 32);
					},
				});
			}
			postItems.forEach((item) => {
				scenes.push({
					element: item,
					reveal: () => {
						if (list) revealFrame(list);
						animateLinkItems([item], 0, 0);
					},
				});
			});
		} else if (currentPage === 'links') {
			const sections = document.querySelectorAll<HTMLElement>('.link-section');
			const headings = document.querySelectorAll<HTMLElement>('.link-section-heading');
			const lists = document.querySelectorAll<HTMLElement>('.link-list');
			const divider = document.querySelector('.divider');

			headings.forEach((heading, index) => {
				const section = sections[index];
				scenes.push({
					element: heading,
					reveal: () => {
						if (section) revealFrame(section);
						heading
							.querySelectorAll<HTMLElement>('[data-typewriter]')
							.forEach((text, textIndex) =>
								scheduleTypewriter(text, textIndex * 0.1, textIndex === 0 ? 30 : 25),
							);
					},
				});
			});

			lists.forEach((list, index) => {
				const section = sections[index];
				const items = list.querySelectorAll<HTMLElement>('li');
				items.forEach((item) => {
					scenes.push({
						element: item,
						reveal: () => {
							if (section) revealFrame(section);
							animateLinkItems([item], 0, 0);
						},
					});
				});
			});

			if (divider) {
				scenes.push({
					element: divider,
					reveal: () =>
						motionAnimate(
							divider,
							{ opacity: [0, 1], transform: ['scaleX(0)', 'scaleX(1)'] },
							{ duration: 0.35 },
						),
				});
			}
		} else if (currentPage === 'tags') {
			const header = document.querySelector<HTMLElement>('.tags-header');
			const flow = document.querySelector<HTMLElement>('.tags-flow');

			if (header) {
				scenes.push({
					element: header,
					reveal: () => reveal(header, 0, { duration: 0.4, distance: 8 }),
				});
			}

			if (flow) {
				const tags = Array.from(flow.querySelectorAll<HTMLElement>('[data-motion-tag]'));
				const groupCount = Math.min(8, tags.length);
				const tagGroups = Array.from({ length: groupCount }, (_, groupIndex) => {
					const start = Math.floor((tags.length * groupIndex) / groupCount);
					const end = Math.floor((tags.length * (groupIndex + 1)) / groupCount);
					return tags.slice(start, end);
				});

				tagGroups.forEach((group) => {
					const anchor = group[Math.floor(group.length / 2)];
					scenes.push({
						element: anchor,
						reveal: () => {
							group.forEach((tag, index) => {
								const delay = index * 0.018;
								scanFrame(tag, delay);
								tag.querySelectorAll<HTMLElement>('[data-typewriter]').forEach(
									(text) => scheduleTypewriter(text, delay + 0.03, 14),
								);
							});
						},
					});
				});
			}
		} else if (currentPage === 'about') {
			const title = document.querySelector<HTMLElement>('[data-motion-page-title]');
			const intro = document.querySelector<HTMLElement>('[data-motion-intro]');
			const sections = document.querySelectorAll<HTMLElement>('[data-motion-section]');

			if (title) {
				scenes.push({
					element: title,
					reveal: () => {
						reveal(title, 0, { duration: 0.32, distance: 6 });
						scheduleTypewriter(title, 0.06, 35);
					},
				});
			}

			sections.forEach((section, sectionIndex) => {
				scenes.push({
					element: section,
					reveal: () => {
						revealFrame(section);
						const children = Array.from(section.children).filter(
							(child): child is HTMLElement =>
								child instanceof HTMLElement && child.tagName !== 'STYLE',
						);
						children.forEach((child, childIndex) => {
							reveal(child, 0.1 + childIndex * 0.03, {
								duration: 0.3,
								distance: 5,
							});
						});
						const heading = section.querySelector<HTMLElement>(
							'h2 [data-typewriter]',
						);
						if (heading) scheduleTypewriter(heading, 0.14, 30);
						if (sectionIndex === 0 && intro) {
							scheduleTypewriter(intro, 0.24, 30);
						}
					},
				});
			});
		} else if (currentPage === 'article') {
			const hero = document.querySelector<HTMLElement>('[data-motion-scene="article-hero"]');
			const title = document.querySelector<HTMLElement>('[data-motion-article-title]');
			const titleText = title?.querySelector<HTMLElement>('[data-typewriter]');
			const metaItems = document.querySelectorAll<HTMLElement>('[data-motion-meta-item]');
			const tagsRegion = document.querySelector<HTMLElement>('[data-motion-tags]');
			const tags = tagsRegion?.querySelectorAll<HTMLElement>('[data-motion-article-tag]') ?? [];
			const tagLabel = tagsRegion?.querySelector<HTMLElement>(
				'.tag-label [data-typewriter]',
			);
			const body = document.querySelector<HTMLElement>('[data-motion-scene="article-body"]');
			const feedback = document.querySelector<HTMLElement>(
				'[data-motion-scene="article-feedback"]',
			);
			const comments = document.querySelector<HTMLElement>(
				'[data-motion-scene="article-comments"]',
			);

			if (hero) {
				scenes.push({
					element: hero,
					reveal: () => reveal(hero, 0, { duration: 0.45, distance: 10 }),
				});
			}
			if (title) {
				scenes.push({
					element: title,
					reveal: () => {
						reveal(title, 0, { duration: 0.34, distance: 6 });
						if (titleText) scheduleTypewriter(titleText, 0.08, 32);
					},
				});
			}
			metaItems.forEach((item) => {
				scenes.push({
					element: item,
					reveal: () => {
						reveal(item, 0, {
							duration: 0.28,
							distance: 4,
						});
						item
							.querySelectorAll<HTMLElement>('[data-typewriter]')
							.forEach((text, index) =>
								scheduleTypewriter(text, 0.05 + index * 0.12, 26),
							);
					},
				});
			});
			let tagsRegionRevealed = false;
			if (tagLabel) {
				scenes.push({
					element: tagLabel,
					reveal: () => {
						if (tagsRegion && !tagsRegionRevealed) {
							tagsRegionRevealed = true;
							reveal(tagsRegion, 0, {
								duration: 0.28,
								distance: 4,
							});
						}
						scheduleTypewriter(tagLabel, 0.05, 26);
					},
				});
			}
			tags.forEach((tag) => {
				scenes.push({
					element: tag,
					reveal: () => {
						if (tagsRegion && !tagsRegionRevealed) {
							tagsRegionRevealed = true;
							reveal(tagsRegion, 0, {
								duration: 0.28,
								distance: 4,
							});
						}
						reveal(tag, 0, {
							duration: 0.24,
							distance: 3,
						});
						tag
							.querySelectorAll<HTMLElement>('[data-typewriter]')
							.forEach((text) =>
								scheduleTypewriter(text, 0.05, 26),
							);
					},
				});
			});
			[body, feedback, comments].forEach((element) => {
				if (!element) return;
				scenes.push({
					element,
					reveal: () => reveal(element, 0, { duration: 0.42, distance: 8 }),
				});
			});
		} else if (currentPage === 'archive') {
			const header = document.querySelector('[data-motion-archive-header]');
			const months = document.querySelectorAll<HTMLElement>('[data-motion-month]');

			if (header) {
				scenes.push({
					element: header,
					reveal: () => revealFrame(header),
				});
			}
			months.forEach((month) => {
				scenes.push({
					element: month,
					reveal: () => revealFrame(month),
				});
			});
		} else {
			document.querySelectorAll<HTMLElement>('[data-motion-scene]').forEach((element) => {
				scenes.push({
					element,
					reveal: () => reveal(element, 0, { duration: 0.42, distance: 8 }),
				});
			});
		}

		if (currentPage === 'home') {
			const more = document.querySelector('.view-more');
			if (more) {
				scenes.push({
					element: more,
					reveal: () => reveal(more, 0, { duration: 0.3, distance: 4 }),
				});
			}
		}

		const footer = document.querySelector('[data-motion-footer]');
		if (footer) {
			scenes.push({
				element: footer,
				reveal: () => {
					reveal(footer, 0, { duration: 0.38, distance: 6 });
					footer
						.querySelectorAll<HTMLElement>('[data-typewriter]')
						.forEach((text, index) =>
							scheduleTypewriter(text, 0.08 + index * 0.12, 26),
						);
				},
			});
		}

		return scenes;
	};

	try {
		const ready = await waitForPageReady();
		if (!ready || stopped || !root.classList.contains('motion-active')) {
			finish();
			return;
		}

		typewriters = collectTypewriters();
		await dismissLoader(true);
		root.classList.remove('motion-loading');
		if (stopped || !root.classList.contains('motion-active')) {
			finish();
			return;
		}

		window.clearTimeout(window.__suiyanMotionTimer);
		await runPointerJourney(buildPointerScenes());
		await sleep(120);
		finish();
	} catch {
		finish();
	}

	async function waitForPageReady() {
		const loadReady =
			document.readyState === 'complete' ||
			(await Promise.race([
				new Promise<boolean>((resolve) => {
					window.addEventListener('load', () => resolve(true), { once: true });
				}),
				sleep(5000).then(() => false),
			]));
		if (!loadReady || stopped) return false;

		if ('fonts' in document) {
			const fontsReady = await Promise.race([
				document.fonts.ready.then(() => true),
				sleep(1000).then(() => false),
			]);
			if (!fontsReady || stopped) return false;
		}

		const criticalImages = Array.from(document.images).filter(
			(image) => image.loading !== 'lazy' && image.currentSrc,
		);
		if (criticalImages.length > 0) {
			const imagesReady = await Promise.race([
				Promise.allSettled(
					criticalImages.map((image) => image.decode().catch(() => undefined)),
				).then(() => true),
				sleep(1000).then(() => false),
			]);
			if (!imagesReady || stopped) return false;
		}

		const loaderCycleReady = await waitForLoaderCycle();
		if (!loaderCycleReady || stopped) return false;

		await new Promise<void>((resolve) =>
			window.requestAnimationFrame(() =>
				window.requestAnimationFrame(() => resolve()),
			),
		);
		return !stopped && root.classList.contains('motion-active');
	}

	async function waitForLoaderCycle() {
		const loader = document.querySelector<HTMLElement>('[data-page-loader]');
		if (!loader || loader.dataset.cycleComplete === 'true') return true;

		const loaderStartedAt = Number(loader.dataset.startedAt);
		const elapsed = Number.isFinite(loaderStartedAt)
			? performance.now() - loaderStartedAt
			: 0;
		const remaining = Math.max(500, 6500 - elapsed);
		return Promise.race([
			new Promise<boolean>((resolve) => {
				loader.addEventListener(
					'suiyan:loader-cycle-complete',
					() => resolve(true),
					{ once: true },
				);
			}),
			sleep(remaining).then(() => false),
		]);
	}

	function collectTypewriters() {
		const jobs: TypewriterJob[] = [];
		document.querySelectorAll<HTMLElement>('[data-typewriter]').forEach((element) => {
			const text = element.dataset.typeText ?? element.textContent?.trim() ?? '';
			const articleTitle = element.closest<HTMLElement>('[data-motion-article-title]');
			if (articleTitle) {
				articleTitle.style.minHeight = `${articleTitle.getBoundingClientRect().height}px`;
			}
			if (element.hasAttribute('data-typewriter-reserve')) {
				element.style.display = 'inline-block';
				element.style.minWidth = `${element.getBoundingClientRect().width}px`;
			}
			jobs.push({ element, text });
			element.textContent = '';
		});
		return jobs;
	}
}

declare global {
	interface Window {
		__suiyanMotionTimer?: number;
		__suiyanFinishMotion?: () => void;
	}
}

window.addEventListener('pageshow', (event) => {
	if (event.persisted) window.__suiyanFinishMotion?.();
});
