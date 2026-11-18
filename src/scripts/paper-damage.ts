type DamageKind = 'crack' | 'tear' | 'notch' | 'lift' | 'large';
type DamageEdge = 'left' | 'right' | 'bottom';

type Box = {
	x: number;
	y: number;
	width: number;
	height: number;
};

type DamageRecipe = {
	id: string;
	kind: DamageKind;
	seed: number;
	length: number;
	depth: number;
	backHue: number;
	backSaturation: number;
	backLightness: number;
	shadow: number;
	fibers: number;
	liftAngle: number;
	edge: DamageEdge;
	zone: 'edge' | 'corner' | 'blank' | 'interior';
};

type PositionedDamage = {
	recipe: DamageRecipe;
	box: Box;
	edge: DamageEdge;
	flip: boolean;
};

type RandomSource = () => number;

const rootSelector = '[data-paper-damage]';
const randomLayerSelector = '[data-paper-damage-random]';
const containerSelector = '.main-container';
const initialisedLayers = new WeakSet<HTMLElement>();
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function randomUnit() {
	const values = new Uint32Array(1);
	if (window.crypto?.getRandomValues) {
		window.crypto.getRandomValues(values);
		return values[0] / 0x100000000;
	}
	return Math.random();
}

function createSeed() {
	return Math.floor(randomUnit() * 0xffffffff);
}

function mulberry32(seed: number): RandomSource {
	let value = seed >>> 0;
	return () => {
		value += 0x6d2b79f5;
		let result = value;
		result = Math.imul(result ^ (result >>> 15), result | 1);
		result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
		return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
	};
}

function between(random: RandomSource, minimum: number, maximum: number) {
	return minimum + random() * (maximum - minimum);
}

function integerBetween(
	random: RandomSource,
	minimum: number,
	maximum: number,
) {
	return Math.round(between(random, minimum, maximum));
}

function choose<Value>(random: RandomSource, values: readonly Value[]) {
	return values[Math.floor(random() * values.length)];
}

function pickDamageCount(random: RandomSource, width: number, height: number) {
	const roll = random();
	const narrow = width < 620;
	let count = narrow
		? roll < 0.2
			? 0
			: roll < 0.72
				? 1
				: 2
		: roll < 0.1
			? 0
			: roll < 0.52
				? 1
				: roll < 0.88
					? 2
					: 3;

	if (height < 560) count = Math.min(count, 1);
	if (height < 360) count = 0;
	return count;
}

function pickDamageKind(
	random: RandomSource,
	width: number,
	height: number,
	alreadyHasLarge: boolean,
): DamageKind {
	if (
		width >= 620 &&
		height >= 1050 &&
		!alreadyHasLarge &&
		random() < 0.035
	) {
		return 'large';
	}

	const roll = random();
	if (roll < 0.3) return 'crack';
	if (roll < 0.65) return 'tear';
	if (roll < 0.85) return 'notch';
	return 'lift';
}

function pickDamageZone(
	random: RandomSource,
	kind: DamageKind,
): DamageRecipe['zone'] {
	const roll = random();
	if (kind === 'large') return 'edge';
	if (kind === 'crack') {
		if (roll < 0.35) return 'edge';
		if (roll < 0.76) return 'blank';
		if (roll < 0.91) return 'interior';
		return 'corner';
	}
	if (kind === 'lift') {
		if (roll < 0.56) return 'edge';
		if (roll < 0.78) return 'corner';
		if (roll < 0.94) return 'blank';
		return 'interior';
	}
	if (roll < 0.7) return 'edge';
	if (roll < 0.91) return 'corner';
	return 'blank';
}

function createRecipes(
	random: RandomSource,
	width: number,
	height: number,
	count: number,
) {
	const recipes: DamageRecipe[] = [];
	let hasLarge = false;

	for (let index = 0; index < count; index++) {
		const kind = pickDamageKind(random, width, height, hasLarge);
		hasLarge ||= kind === 'large';
		const edge = choose(random, ['left', 'right', 'bottom'] as const);
		const zone = pickDamageZone(random, kind);

		const length =
			kind === 'crack'
				? integerBetween(random, 38, 108)
				: kind === 'large'
					? integerBetween(random, 150, 260)
					: kind === 'notch'
						? integerBetween(random, 30, 56)
						: integerBetween(random, 38, 82);
		const rawDepth =
			kind === 'crack'
				? integerBetween(random, 12, 24)
				: kind === 'large'
					? integerBetween(random, 42, 68)
					: kind === 'notch'
						? integerBetween(random, 19, 34)
						: integerBetween(random, 14, 28);
		const responsiveScale = width < 620 ? 0.82 : 1;

		recipes.push({
			id: `damage-${index}-${createSeed().toString(36)}`,
			kind,
			seed: createSeed(),
			length: Math.max(
				kind === 'crack' ? 28 : 22,
				Math.round(length * responsiveScale),
			),
			depth: Math.max(8, Math.round(rawDepth * responsiveScale)),
			backHue: integerBetween(random, 34, 43),
			backSaturation: integerBetween(random, 12, 22),
			backLightness: integerBetween(random, 87, 93),
			shadow: Number(between(random, 0.13, 0.23).toFixed(3)),
			fibers: integerBetween(random, 2, 5),
			liftAngle: between(random, -7.5, -2.5),
			edge,
			zone,
		});
	}

	return recipes;
}

function isVisibleRect(rect: DOMRect) {
	return rect.width >= 2 && rect.height >= 2;
}

function addRect(
	rects: Box[],
	rect: DOMRect,
	originX: number,
	originY: number,
	padding = 2,
) {
	if (!isVisibleRect(rect)) return;
	rects.push({
		x: rect.left - originX - padding,
		y: rect.top - originY - padding,
		width: rect.width + padding * 2,
		height: rect.height + padding * 2,
	});
}

function collectObstacleRects(
	container: HTMLElement,
	originX: number,
	originY: number,
) {
	const rects: Box[] = [];
	const ignoredSelector =
		'.paper-damage, script, style, noscript, template, .sr-only';
	const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
		acceptNode(node) {
			const parent = node.parentElement;
			if (
				!parent ||
				!node.textContent?.trim() ||
				parent.closest(ignoredSelector)
			) {
				return NodeFilter.FILTER_REJECT;
			}
			return NodeFilter.FILTER_ACCEPT;
		},
	});

	while (walker.nextNode()) {
		const range = document.createRange();
		range.selectNodeContents(walker.currentNode);
		for (const rect of range.getClientRects()) {
			addRect(rects, rect, originX, originY, 2.5);
		}
		range.detach();
	}

	container
		.querySelectorAll<SVGElement | HTMLElement>(
			'img, picture, video, canvas, iframe, svg, pre, table, button, input, textarea, select, summary, [role="button"]',
		)
		.forEach((element) => {
			if (element.closest(ignoredSelector)) return;
			const style = window.getComputedStyle(element);
			if (
				style.display === 'none' ||
				style.visibility === 'hidden' ||
				Number.parseFloat(style.opacity) < 0.08
			) {
				return;
			}
			for (const rect of element.getClientRects()) {
				addRect(rects, rect, originX, originY, 3);
			}
		});

	return rects;
}

function boxesOverlap(first: Box, second: Box, gap = 0) {
	return !(
		first.x + first.width + gap <= second.x ||
		second.x + second.width + gap <= first.x ||
		first.y + first.height + gap <= second.y ||
		second.y + second.height + gap <= first.y
	);
}

function isSafeBox(
	box: Box,
	containerWidth: number,
	containerHeight: number,
	obstacles: Box[],
	placed: Box[],
	obstacleGap: number,
) {
	if (
		box.x < 0 ||
		box.y < 58 ||
		box.x + box.width > containerWidth + 0.5 ||
		box.y + box.height > containerHeight
	) {
		return false;
	}

	if (
		box.x + box.width > containerWidth - 42 &&
		box.y < 56
	) {
		return false;
	}

	if (obstacles.some((obstacle) => boxesOverlap(box, obstacle, obstacleGap))) {
		return false;
	}

	if (placed.some((previous) => boxesOverlap(box, previous, 12))) {
		return false;
	}

	return true;
}

function dimensionsForRecipe(recipe: DamageRecipe) {
	if (recipe.kind === 'crack') {
		return {
			width: recipe.length + 8,
			height: Math.max(26, Math.ceil(recipe.length * 0.38)),
		};
	}
	const width = Math.ceil(recipe.depth * 1.2) + (recipe.kind === 'lift' ? 22 : 5);
	return {
		width,
		height: recipe.length + (recipe.kind === 'lift' ? 4 : 0),
	};
}

function collectEdgePositions(
	recipe: DamageRecipe,
	containerWidth: number,
	containerHeight: number,
	obstacles: Box[],
	placed: Box[],
) {
	const positions: PositionedDamage[] = [];
	const { width, height } = dimensionsForRecipe(recipe);
	const random = mulberry32(recipe.seed ^ 0x6a09e667);
	const step = recipe.kind === 'large' ? 64 : 38;
	const clearance = recipe.kind === 'lift' ? 4 : 1;

	for (let y = 64; y <= containerHeight - height - 28; y += step) {
		const jitteredY = Math.min(
			containerHeight - height,
			Math.max(64, y + between(random, -12, 12)),
		);
		const rightBox = {
			x: containerWidth - width,
			y: jitteredY,
			width,
			height,
		};
		if (
			isSafeBox(
				rightBox,
				containerWidth,
				containerHeight,
				obstacles,
				placed,
				clearance,
			)
		) {
			positions.push({
				recipe,
				box: rightBox,
				edge: 'right',
				flip: true,
			});
		}

		const leftBox = {
			x: 0,
			y: Math.max(64, y + between(random, -15, 15)),
			width,
			height,
		};
		if (
			isSafeBox(
				leftBox,
				containerWidth,
				containerHeight,
				obstacles,
				placed,
				clearance,
			)
		) {
			positions.push({
				recipe,
				box: leftBox,
				edge: 'left',
				flip: false,
			});
		}
	}

	const bottomStep = recipe.kind === 'large' ? 58 : 34;
	for (
		let x = 18;
		x <= containerWidth - height - 18;
		x += bottomStep
	) {
		const jitteredX = Math.min(
			containerWidth - height,
			Math.max(10, x + between(random, -12, 12)),
		);
		const bottomBox = {
			x: jitteredX,
			y: containerHeight - width,
			width: height,
			height: width,
		};
		if (
			isSafeBox(
				bottomBox,
				containerWidth,
				containerHeight,
				obstacles,
				placed,
				clearance,
			)
		) {
			positions.push({
				recipe,
				box: bottomBox,
				edge: 'bottom',
				flip: false,
			});
		}
	}

	return positions;
}

function collectInteriorPositions(
	recipe: DamageRecipe,
	containerWidth: number,
	containerHeight: number,
	obstacles: Box[],
	placed: Box[],
	clearance: number,
) {
	const positions: PositionedDamage[] = [];
	const { width, height } = dimensionsForRecipe(recipe);
	const random = mulberry32(recipe.seed ^ 0xbb67ae85);
	const horizontalStep = width > 44 ? 36 : 28;
	const verticalStep = height > 44 ? 36 : 28;

	for (
		let y = 72;
		y <= containerHeight - height - 24;
		y += verticalStep
	) {
		for (
			let x = 12;
			x <= containerWidth - width - 12;
			x += horizontalStep
		) {
			const box = {
				x: Math.min(
					containerWidth - width,
					Math.max(2, x + between(random, -5, 5)),
				),
				y: Math.min(
					containerHeight - height,
					Math.max(64, y + between(random, -5, 5)),
				),
				width,
				height,
			};
			if (
				isSafeBox(
					box,
					containerWidth,
					containerHeight,
					obstacles,
					placed,
					clearance,
				)
			) {
				positions.push({
					recipe,
					box,
					edge: 'left',
					flip: false,
				});
			}
		}
	}

	return positions;
}

function collectCornerPositions(
	recipe: DamageRecipe,
	containerWidth: number,
	containerHeight: number,
	obstacles: Box[],
	placed: Box[],
) {
	if (recipe.kind === 'large') return [];
	const { width, height } = dimensionsForRecipe(recipe);
	const random = mulberry32(recipe.seed ^ 0x3c6ef372);
	const candidates: PositionedDamage[] = [
		{
			recipe,
			box: {
				x: 0,
				y: containerHeight - height - between(random, 0, 5),
				width,
				height,
			},
			edge: 'left',
			flip: false,
		},
		{
			recipe,
			box: {
				x: containerWidth - width,
				y: containerHeight - height - between(random, 0, 5),
				width,
				height,
			},
			edge: 'right',
			flip: true,
		},
		{
			recipe,
			box: {
				x: 0,
				y: containerHeight - width,
				width: height,
				height: width,
			},
			edge: 'bottom',
			flip: false,
		},
	];

	return candidates.filter(({ box }) =>
		isSafeBox(box, containerWidth, containerHeight, obstacles, placed, 1),
	);
}

function resolvePosition(
	recipe: DamageRecipe,
	containerWidth: number,
	containerHeight: number,
	obstacles: Box[],
	placed: Box[],
) {
	const edge = () =>
		collectEdgePositions(
			recipe,
			containerWidth,
			containerHeight,
			obstacles,
			placed,
		);
	const corner = () =>
		collectCornerPositions(
			recipe,
			containerWidth,
			containerHeight,
			obstacles,
			placed,
		);
	const blank = () =>
		collectInteriorPositions(
			recipe,
			containerWidth,
			containerHeight,
			obstacles,
			placed,
			11,
		);
	const interior = () =>
		collectInteriorPositions(
			recipe,
			containerWidth,
			containerHeight,
			obstacles,
			placed,
			4,
		);
	const attempts: Array<() => PositionedDamage[]> =
		recipe.zone === 'edge'
			? [edge, corner, blank, interior]
			: recipe.zone === 'corner'
				? [corner, edge, blank, interior]
				: recipe.zone === 'blank'
					? [blank, edge, corner, interior]
					: [interior, blank, edge, corner];

	for (const getCandidates of attempts) {
		const candidates = getCandidates();
		if (candidates.length === 0) continue;
		const random = mulberry32(recipe.seed ^ Math.floor(randomUnit() * 0xffffffff));
		return candidates[Math.floor(random() * candidates.length)];
	}

	return null;
}

function makeCrackMarkup(recipe: DamageRecipe, width: number, height: number) {
	const random = mulberry32(recipe.seed);
	const startY = between(random, height * 0.22, height * 0.42);
	const endY = between(random, height * 0.58, height * 0.8);
	const segments = Math.max(7, Math.round(width / 7));
	const points: Array<{ x: number; y: number }> = [];

	for (let index = 0; index <= segments; index++) {
		const progress = index / segments;
		const taper = Math.sin(progress * Math.PI);
		points.push({
			x: 2 + progress * (width - 4),
			y:
				startY +
				(endY - startY) * progress +
				between(random, -2.4, 2.4) * (0.3 + taper * 0.7),
		});
	}

	const linePath = points
		.map(({ x, y }, index) => `${index === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`)
		.join(' ');
	const branchPaths: string[] = [];

	for (let index = 1; index < points.length - 1; index++) {
		if (random() > 0.34) continue;
		const point = points[index];
		const direction = random() < 0.5 ? -1 : 1;
		branchPaths.push(
			`M${point.x.toFixed(2)} ${point.y.toFixed(2)} l${between(random, -3, 3).toFixed(2)} ${(direction * between(random, 2.2, 5.5)).toFixed(2)} l${between(random, -2, 2).toFixed(2)} ${(direction * between(random, 1, 3)).toFixed(2)}`,
		);
	}

	for (let index = 0; index < recipe.fibers; index++) {
		const anchor = points[integerBetween(random, 1, points.length - 2)];
		const yOffset = between(random, -4.5, 4.5);
		branchPaths.push(
			`M${(anchor.x + between(random, -2, 2)).toFixed(2)} ${anchor.y.toFixed(2)} l${between(random, 2, 6).toFixed(2)} ${yOffset.toFixed(2)}`,
		);
	}

	return {
		width,
		height,
		markup: `
			<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" focusable="false">
				<path class="paper-damage__crack-shadow" pathLength="1" d="${linePath}" />
				<path class="paper-damage__crack-line" pathLength="1" d="${linePath}" />
				<path class="paper-damage__crack-highlight" pathLength="1" d="${linePath}" />
				<g class="paper-damage__fibers">${branchPaths
					.map((path) => `<path d="${path}" />`)
					.join('')}</g>
			</svg>
		`,
	};
}

function makeEdgeProfile(recipe: DamageRecipe, length: number, depth: number) {
	const random = mulberry32(recipe.seed);
	const segments =
		recipe.kind === 'large'
			? integerBetween(random, 11, 16)
			: integerBetween(random, 7, 11);
	const points: Array<{ x: number; y: number }> = [];
	const peakOffset = between(random, 0.38, 0.64);

	for (let index = 0; index <= segments; index++) {
		const progress = index / segments;
		const distanceFromPeak = Math.abs(progress - peakOffset);
		const envelope = Math.max(0.24, 1 - distanceFromPeak * between(random, 1.5, 1.95));
		const roughness =
			recipe.kind === 'notch'
				? between(random, 0.76, 1.08)
				: between(random, 0.82, 1.16);
		points.push({
			x: Math.max(0.8, depth * envelope * roughness),
			y:
				progress * length +
				between(random, -1.25, 1.25) *
					(index === 0 || index === segments ? 0.2 : 1),
		});
	}

	points[0].y = 0;
	points[points.length - 1].y = length;
	const line = points
		.map(
			({ x, y }, index) =>
				`${index === 0 ? 'M' : 'L'}${index === 0 ? 0 : x.toFixed(2)} ${y.toFixed(2)}`,
		)
		.join(' ')
		.replace(/^M[^L]+/, `M0 0`)
		.concat(` L0 ${length}`);

	return {
		points,
		line,
		innerLine: points
			.map(({ x, y }, index) => `${index === 0 ? 'M' : 'L'}${(x + 1.5).toFixed(2)} ${y.toFixed(2)}`)
			.join(' '),
	};
}

function makeEdgeMarkup(recipe: DamageRecipe, horizontal: boolean) {
	const random = mulberry32(recipe.seed ^ 0x510e527f);
	const length = recipe.length;
	const depth = recipe.depth;
	const profile = makeEdgeProfile(recipe, length, depth);
	const voidPath = `${profile.line} Z`;
	const fiberPaths: string[] = [];

	for (let index = 0; index < recipe.fibers; index++) {
		const point =
			profile.points[integerBetween(random, 1, profile.points.length - 2)];
		fiberPaths.push(
			`M${point.x.toFixed(2)} ${point.y.toFixed(2)} l${between(random, 2, 8).toFixed(2)} ${between(random, -3.2, 3.2).toFixed(2)} l${between(random, 1, 4).toFixed(2)} ${between(random, -1.8, 1.8).toFixed(2)}`,
		);
	}

	const flakeStart =
		profile.points[Math.max(1, Math.floor(profile.points.length * 0.34))];
	const flakeEnd =
		profile.points[Math.min(profile.points.length - 2, Math.ceil(profile.points.length * 0.65))];
	const flakeTipY = between(random, flakeStart.y, flakeEnd.y);
	const flakeDepth = Math.max(recipe.depth + between(random, 5, 11), 17);
	const flakePath =
		recipe.kind === 'lift'
			? `M0 ${flakeStart.y.toFixed(2)} L${between(random, 3, 7).toFixed(2)} ${flakeStart.y.toFixed(2)} L${(flakeDepth * 0.72).toFixed(2)} ${flakeTipY.toFixed(2)} L${flakeDepth.toFixed(2)} ${between(random, flakeTipY + 2, flakeEnd.y).toFixed(2)} L${(flakeDepth * 0.82).toFixed(2)} ${(flakeEnd.y + between(random, 1, 4)).toFixed(2)} L${between(random, 2, 6).toFixed(2)} ${flakeEnd.y.toFixed(2)} L0 ${flakeEnd.y.toFixed(2)} Z`
			: '';
	const creasePath =
		recipe.kind === 'lift'
			? `M0 ${flakeStart.y.toFixed(2)} L${(flakeDepth * 0.72).toFixed(2)} ${flakeTipY.toFixed(2)} L0 ${flakeEnd.y.toFixed(2)}`
			: '';
	const width = Math.max(
		Math.ceil(depth * 1.2) + (recipe.kind === 'lift' ? 22 : 5),
		20,
	);
	const height = Math.max(length, 12);

	const markup = `
		<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" focusable="false">
			<path class="paper-damage__shadow" d="${profile.line}" />
			<path class="paper-damage__void" d="${voidPath}" />
			<path class="paper-damage__back-edge" pathLength="1" d="${profile.line}" />
			<path class="paper-damage__paper-edge" pathLength="1" d="${profile.innerLine}" />
			<path class="paper-damage__highlight-edge" pathLength="1" d="${profile.innerLine}" />
			<path class="paper-damage__edge-shadow" d="${profile.innerLine}" />
			<g class="paper-damage__fibers">${fiberPaths
				.map((path) => `<path d="${path}" />`)
				.join('')}</g>
			${
				recipe.kind === 'lift'
					? `<g class="paper-damage__flake-layer">
							<path class="paper-damage__flake" d="${flakePath}" />
							<path class="paper-damage__flake-fold" d="${creasePath}" />
						</g>`
					: ''
			}
		</svg>
	`;

	return { width, height, markup, rotate: horizontal };
}

function renderDamage(damage: PositionedDamage) {
	const { recipe, box, edge, flip } = damage;
	const item = document.createElement('div');
	item.className = `paper-damage__item paper-damage__item--${recipe.kind}`;
	item.dataset.damageKind = recipe.kind;
	item.style.left = `${box.x}px`;
	item.style.top = `${box.y}px`;
	item.style.width = `${box.width}px`;
	item.style.height = `${box.height}px`;
	item.style.setProperty('--paper-damage-shadow', String(recipe.shadow));
	item.style.setProperty(
		'--paper-damage-back',
		`hsl(${recipe.backHue}, ${recipe.backSaturation}%, ${recipe.backLightness}%)`,
	);
	item.style.setProperty('--paper-damage-lift-angle', `${recipe.liftAngle}deg`);
	if (flip) item.style.setProperty('--paper-damage-flip', '-1');

	if (recipe.kind === 'crack') {
		const size = dimensionsForRecipe(recipe);
		item.innerHTML = `<div class="paper-damage__graphic">${makeCrackMarkup(
			recipe,
			size.width,
			size.height,
		).markup}</div>`;
		return item;
	}

	const isHorizontal = edge === 'bottom';
	const rendered = makeEdgeMarkup(recipe, isHorizontal);
	item.innerHTML = `<div class="paper-damage__graphic">${rendered.markup}</div>`;
	if (rendered.rotate) {
		const graphic = item.querySelector<HTMLElement>('.paper-damage__graphic');
		if (graphic) {
			graphic.style.width = `${rendered.width}px`;
			graphic.style.height = `${rendered.height}px`;
			graphic.style.position = 'absolute';
			graphic.style.left = '50%';
			graphic.style.top = '50%';
			graphic.style.transform = `translate(-50%, -50%) rotate(-90deg) scaleX(${flip ? -1 : 1})`;
		}
	}

	return item;
}

function getContainer(layer: HTMLElement) {
	const container = layer.closest<HTMLElement>(containerSelector);
	return container ?? null;
}

function createDamageLayer(
	container: HTMLElement,
	layer: HTMLElement,
	recipes: DamageRecipe[],
	animate = true,
) {
	const canvas = layer.querySelector<HTMLElement>(randomLayerSelector);
	if (!canvas) return;
	canvas.replaceChildren();

	const containerRect = container.getBoundingClientRect();
	const originX = containerRect.left + container.clientLeft;
	const originY = containerRect.top + container.clientTop;
	const containerWidth = container.clientWidth;
	const containerHeight = container.clientHeight;
	const obstacles = collectObstacleRects(container, originX, originY);
	const placed: Box[] = [];
	const narrow = containerWidth < 620;
	const maxCount = narrow ? 2 : 3;

	recipes.slice(0, maxCount).forEach((recipe) => {
		const positioned = resolvePosition(
			recipe,
			containerWidth,
			containerHeight,
			obstacles,
			placed,
		);
		if (!positioned) return;
		placed.push(positioned.box);
		const item = renderDamage(positioned);
		if (animate && !reducedMotion.matches) item.classList.add('is-revealing');
		canvas.append(item);

		if (animate && !reducedMotion.matches) {
			const animationDuration =
				recipe.kind === 'lift'
					? 860
					: recipe.kind === 'crack'
						? 560
						: 760;
			window.setTimeout(() => {
				item.classList.remove('is-revealing');
			}, animationDuration);
		}
	});
}

function initialiseDamage(layer: HTMLElement) {
	if (initialisedLayers.has(layer)) return;
	const container = getContainer(layer);
	if (!container) return;

	const width = container.clientWidth;
	const height = container.clientHeight;
	if (width < 260 || height < 300) return;

	initialisedLayers.add(layer);
	const random = mulberry32(createSeed());
	const count = pickDamageCount(random, width, height);
	const recipes = createRecipes(random, width, height, count);
	layer.dataset.damageCount = String(count);
	createDamageLayer(container, layer, recipes);

	let lastWidth = width;
	let resizeTimer: number | undefined;
	if (!('ResizeObserver' in window)) return;
	const observer = new ResizeObserver(() => {
		const nextWidth = container.clientWidth;
		if (Math.abs(nextWidth - lastWidth) < 2) return;
		lastWidth = nextWidth;
		window.clearTimeout(resizeTimer);
		resizeTimer = window.setTimeout(() => {
			if (!layer.isConnected) {
				observer.disconnect();
				return;
			}
			createDamageLayer(container, layer, recipes, false);
		}, 180);
	});
	observer.observe(container);
}

function whenPageIsReady(callback: () => void) {
	const documentRoot = document.documentElement;
	const ready = () =>
		!documentRoot.classList.contains('motion-active') ||
		documentRoot.classList.contains('motion-finished') ||
		documentRoot.classList.contains('motion-fallback');

	if (ready()) {
		requestAnimationFrame(callback);
		return;
	}

	let settled = false;
	let fallbackTimer = 0;
	const observer = new MutationObserver(() => {
		if (!ready() || settled) return;
		settled = true;
		window.clearTimeout(fallbackTimer);
		observer.disconnect();
		requestAnimationFrame(callback);
	});
	observer.observe(documentRoot, { attributes: true, attributeFilter: ['class'] });
	fallbackTimer = window.setTimeout(() => {
		if (settled) return;
		settled = true;
		observer.disconnect();
		requestAnimationFrame(callback);
	}, 6500);
}

function startPaperDamage() {
	const layer = document.querySelector<HTMLElement>(rootSelector);
	if (!layer) return;
	whenPageIsReady(() => initialiseDamage(layer));
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', startPaperDamage, { once: true });
} else {
	startPaperDamage();
}
