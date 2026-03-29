<!-- don'tParseAsArticle -->
<style>
	#aboutContent,
	#aboutContent * {
		box-sizing: border-box;
	}

	#aboutContent {
		width: 100%;
		color: var(--text-color, #e7eaf0);
		font-family: "Inter", "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif;
	}

	#aboutContent .about-shell {
		width: 100%;
		max-width: 1100px;
		margin: 0 auto;
		padding: 0;
	}

	#aboutContent .about-hero {
		margin-bottom: 1.5rem;
		padding: 2rem 2rem 1.25rem;
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 20px;
		background:
			linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015)),
			var(--box-backgroundColor, #27292f);
	}

	#aboutContent .about-eyebrow {
		margin: 0 0 0.6rem 0;
		font-size: 0.85rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--text-color-faint, #7f8793);
	}

	#aboutContent .about-title {
		margin: 0 0 0.8rem 0;
		font-size: clamp(2rem, 1.5rem + 1.4vw, 3rem);
		font-weight: 800;
		line-height: 1.15;
		letter-spacing: -0.03em;
		color: var(--text-color, #e7eaf0);
	}

	#aboutContent .about-description {
		max-width: 42rem;
		margin: 0;
		font-size: 1rem;
		line-height: 1.8;
		color: var(--text-color-muted, #a6adb8);
	}

	#aboutContent .about-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
	}

	#aboutContent .about-card {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
		min-height: 180px;
		padding: 1.25rem 1.25rem 1.1rem;
		border: 1px solid rgba(255, 255, 255, 0.07);
		border-radius: 18px;
		background: var(--box-backgroundColor, #27292f);
		text-decoration: none;
		color: inherit;
		overflow: hidden;
		transition:
			transform 0.18s ease,
			border-color 0.18s ease,
			background-color 0.18s ease,
			box-shadow 0.18s ease;
	}

	#aboutContent .about-card:hover {
		transform: translateY(-3px);
		border-color: rgba(255, 255, 255, 0.14);
		background: rgba(255, 255, 255, 0.04);
		box-shadow: 0 14px 36px rgba(0, 0, 0, 0.18);
	}

	#aboutContent .about-card::before {
		content: "";
		position: absolute;
		inset: auto -30px -30px auto;
		width: 120px;
		height: 120px;
		border-radius: 50%;
		background: var(--card-accent, rgba(255,255,255,0.08));
		filter: blur(10px);
		opacity: 0.22;
		pointer-events: none;
	}

	#aboutContent .about-card-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	#aboutContent .about-icon {
		width: 52px;
		height: 52px;
		border-radius: 14px;
		background:
			linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03)),
			rgba(255,255,255,0.02);
		border: 1px solid rgba(255, 255, 255, 0.08);
		background-image: var(--icon-url);
		background-repeat: no-repeat;
		background-position: center;
		background-size: 26px;
		flex: 0 0 auto;
	}

	#aboutContent .about-link-hint {
		font-size: 0.82rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		color: var(--text-color-faint, #7f8793);
	}

	#aboutContent .about-card-body {
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
	}

	#aboutContent .about-card-title {
		margin: 0;
		font-size: 1.35rem;
		font-weight: 800;
		line-height: 1.2;
		color: var(--text-color, #e7eaf0);
	}

	#aboutContent .about-card-text {
		margin: 0;
		font-size: 0.96rem;
		line-height: 1.7;
		color: var(--text-color-muted, #a6adb8);
	}

	#aboutContent .about-card-footer {
		margin-top: auto;
		padding-top: 0.2rem;
		font-size: 0.88rem;
		font-weight: 700;
		color: var(--card-strong, #ffffff);
	}

	#aboutContent .about-card.wide {
		grid-column: 1 / -1;
		min-height: 150px;
	}

	@media (max-width: 800px) {
		#aboutContent .about-hero {
			padding: 1.4rem 1.2rem 1rem;
			border-radius: 16px;
		}

		#aboutContent .about-grid {
			grid-template-columns: 1fr;
		}

		#aboutContent .about-card,
		#aboutContent .about-card.wide {
			grid-column: auto;
			min-height: 0;
			padding: 1rem;
			border-radius: 16px;
		}

		#aboutContent .about-card-title {
			font-size: 1.15rem;
		}

		#aboutContent .about-card-text {
			font-size: 0.92rem;
		}
	}
</style>
<div id="aboutContent">
	<section class="about-shell">
		<div class="about-hero">
			<p class="about-eyebrow">About</p>
			<h1 class="about-title">alanwu-9582</h1>
			<p class="about-description">
				UWU
			</p>
		</div>
		<div class="about-grid">
			<a
				target="_blank"
				class="about-card youtube"
				style="
					--icon-url: url('<?=basicPath?>/image/aboutImage/logo-youtube.png');
					--card-accent: rgba(255, 84, 84, 0.22);
					--card-strong: #ff8f8f;
				"
				href="https://www.youtube.com/channel/UCSc8KKDgxmsa5xwY7FjEI0w"
			>
				<div class="about-card-top">
					<div class="about-icon"></div>
					<span class="about-link-hint">Open Link</span>
				</div>
				<div class="about-card-body">
					<h3 class="about-card-title">YouTube</h3>
					<p class="about-card-text">就一些影片</p>
				</div>
				<div class="about-card-footer">Watch videos</div>
			</a>
			<a
				target="_blank"
				class="about-card github"
				style="
					--icon-url: url('<?=basicPath?>/image/aboutImage/logo-github.png');
					--card-accent: rgba(200, 200, 200, 0.16);
					--card-strong: #e7eaf0;
				"
				href="https://github.com/alanwu-9582"
			>
				<div class="about-card-top">
					<div class="about-icon"></div>
					<span class="about-link-hint">Open Link</span>
				</div>
				<div class="about-card-body">
					<h3 class="about-card-title">GitHub</h3>
					<p class="about-card-text">各種奇怪專案，堆放處。</p>
				</div>
				<div class="about-card-footer">View repositories</div>
			</a>
			<a
				target="_blank"
				class="about-card instagram"
				style="
						--icon-url: url('<?=basicPath?>/image/aboutImage/logo-instagram.png');
						--card-accent: rgba(255, 129, 84, 0.2);
						--card-strong: #ffb08e;
				"
				href="https://www.instagram.com/wu.chin.lun"
			>
				<div class="about-card-top">
					<div class="about-icon"></div>
					<span class="about-link-hint">Open Link</span>
				</div>
				<div class="about-card-body">
					<h3 class="about-card-title">Instagram</h3>
					<p class="about-card-text">沒什麼東西 :P</p>
				</div>
				<div class="about-card-footer">Follow updates</div>
			</a>
			<a
				target="_blank"
				class="about-card twitch"
				style="
					--icon-url: url('<?=basicPath?>/image/aboutImage/logo-twitch.png');
					--card-strong: #b29bff;
				"
				href="https://www.twitch.tv/avocatchi114"
			>
				<div class="about-card-top">
					<div class="about-icon"></div>
					<span class="about-link-hint">Open Link</span>
				</div>
				<div class="about-card-body">
					<h3 class="about-card-title">Twitch</h3>
					<p class="about-card-text">會不會哪天突然開台呢？按下追隨不就知道了。</p>
				</div>
				<div class="about-card-footer">Watch streams</div>
			</a>
		</div>
	</section>
</div>