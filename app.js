/**
 * ==========================================================================
 * ✧XE・PON♡✧ // JP MARKET REDESIGN — Y2K × IDOL × ANIME BAND
 * Full Vanilla JS: Bilingual i18n, Audio Engine, Sparkle Canvas, Interactions
 * ==========================================================================
 */

// ── Global State (Declared at top to prevent TDZ ReferenceErrors) ──────────
let currentLang = 'en';
let currentTrackIdx = 4; // Start with featured climax single: BREAK THE LIMIT#2
let currentShowcaseIdx = 0;
let currentModalTrackIdx = 4;
let audioEl = null;
let isPlaying = false;

/**
 * ==========================================================================
 * 1. BILINGUAL TRANSLATION DICTIONARY (EN & JA)
 * ==========================================================================
 */
const I18N = {
  en: {
    page_title: "✧XE・PON♡✧ // OFFICIAL PORTAL | BREAK THE LIMIT#2",
    page_desc: "Official website for ✧XE・PON♡✧. Stream the 5 full tracks from Xe Pon _ NEON & FRICTION and the climax single BREAK THE LIMIT#2.",
    nav_home: "HOME",
    nav_showcase: "TRACKS",
    nav_playlist: "PLAYLIST",
    nav_toei: "TOEI",
    nav_artist_phase: "PHASE",
    status_ready: "READY TO PLAY",
    status_playing: "PLAYING NOW ⚡",
    status_paused: "PAUSED",
    badge_new_release: "✧ NEW SINGLE",
    badge_bpm_energy: "♡ PUNK ENERGY 100%",
    badge_phase_tracks: "16 SONGS ON PHASE",
    badge_5_tracks: "5 FULL TRACKS",
    hero_title_top: "JAPANESE POST-HARDCORE & PUNK",
    hero_kanji_sub: 'BREAK THE LIMIT#2 「叫べ！夜を切り裂いて光を掴め！」',
    hero_desc: 'Wall-of-sound production driven by high-gain guitars, high-velocity dynamic skank drumming, furious double-kick pedals, and raw female rock chest vocals. Stream the 5 featured tracks from <em>NEON & FRICTION</em> directly on site, or explore ✧XE・PON♡✧\'s full 16-song catalogue on <strong>Phase</strong>.',
    btn_play_single: "PLAY NEW SINGLE",
    btn_view_playlist: "VIEW ALL 5 TRACKS",
    btn_lyrics_notes: "LYRICS & NOTES",
    btn_sub_production: "PRODUCTION SPECS (ALL 5 SONGS)",
    stat_members: "MEMBERS",
    stat_phase_songs: "ON PHASE",
    stat_tracks: "ON SITE",
    stat_toei: "TOEI CALLS",
    hero_tag_top: "✧XE・PON♡✧ // ALL 4 MEMBERS",
    hero_tag_bottom: "5 TRACKS READY ♡",
    sec1_badge: "TRACK SHOWCASE",
    sec1_kanji: "SOUND PROFILE",
    sec1_sub: "Explore the sonic direction, Tokyo street locations, lyrics, and musical identity behind all 5 original tracks.",
    pill_location_lbl: "LOCATION",
    direction_header: "// TRACK OVERVIEW & SOUND PROFILE",
    chorus_tag: "CHORUS HIGHLIGHT // サビ",
    btn_expand_lyrics: "VIEW FULL LYRICS 📜",
    btn_play_onsite: "▶ PLAY",
    btn_pause_onsite: "⏸ PAUSE",
    btn_prev_track: "◀ PREV",
    btn_next_track: "NEXT ▶",
    btn_stream_phase: "PHASE ↗",
    btn_sub_open_app: "OPEN IN OFFICIAL APP ↗",
    sec2_badge: "OFFICIAL PLAYLIST",
    sec2_kanji: "PLAYLIST ♡",
    sec2_sub: "Play any of the 5 original songs directly in the site's integrated player or launch on Phase.",
    badge_5_songs: "5 TRACKS",
    playlist_sub_tag: "IN-SITE AUDIO READY",
    playlist_meta_info: "Artist: ✧XE・PON♡✧ • 5 Tracks • Japanese Alt Rock / Post-Hardcore",
    btn_play_all: "PLAY ALL",
    btn_open_phase: "OPEN IN PHASE ↗",
    th_track: "TRACK & TITLE",
    th_genre: "GENRE",
    th_duration: "TIME",
    th_action: "PLAY",
    btn_play_inline: "▶ PLAY",
    btn_pause_inline: "⏸ PAUSE",
    badge_new_hit: "★ FEATURED SINGLE",
    sec3_badge: "TOEI TRANSMISSION",
    sec3_kanji: "TOEI ANIMATION",
    sec3_sub: "When your tracks sound so much like an anime opening that major studios won't stop ringing.",
    toei_terminal_title: "COMMS_LOG // TOEI_ANIMATION",
    toei_alert_badge: "100+ MISSED CALLS",
    toei_log_status: "INCOMING CALL OVERFLOW // DO NOT DISTURB ON",
    toei_log_freq: "ARTIST: ✧XE・PON♡✧",
    toei_sender_1: "TOEI ANIMATION // CHIEF PRODUCER SUZUKI",
    toei_time_1: "3:42 AM (CALL #47)",
    toei_msg_1: '"PLEASE PICK UP YOUR PHONES!! 😭 The director heard BREAK THE LIMIT#2 and literally threw out the entire storyboard for the season finale just to sync the climax fight to your chorus. We don\'t care what your manager asks for, name your price!! JUST STOP LEAVING US ON READ!"',
    toei_sender_2: "TOEI ANIMATION // MUSIC PRODUCTION DESK",
    toei_time_2: "4:15 AM (CALL #89)",
    toei_msg_2: '"Urgent: Who authorized all 4 of you to turn on \'Do Not Disturb\' during band practice?! We have three animators in the studio crying with their headphones on. The fall season broadcast deadline is in two weeks. PLEASE CALL BACK."',
    toei_sender_3: "SHIBUYA LIVEHOUSE // FRONT DESK",
    toei_time_3: "4:21 AM (CALL #102)",
    toei_msg_3: '"Uhh girls... there\'s a guy in a tailored suit with a Toei Animation VIP badge literally pacing outside the back door waiting for your rehearsal to finish. Did you guys rob an anime studio or what? 💀"',
    btn_follow_phase: "FOLLOW ✧XE・PON♡✧ ON PHASE (16 SONGS)",
    disco_badge: "⚡ COMPLETE DISCOGRAPHY // PHASE",
    disco_title: "ALL 16 SONGS STREAMING ON PHASE",
    disco_desc: 'Beyond the 5 featured tracks on <em>NEON & FRICTION</em>, stream ✧XE・PON♡✧\'s full 16-song catalogue of Japanese post-hardcore, alternative rock, and melodic punk directly on the official Phase platform.',
    btn_explore_16: "STREAM ALL 16 SONGS ON PHASE",
    cap_akiba: "AKIHABARA GIGO ✧",
    cap_street: "SHIBUYA BACK-ALLEY ♡",
    cap_chrome: "SESSIONS ☆",
    modal_chip: "LYRICS & NOTES // ✧XE・PON♡✧",
    modal_specs: "Japanese Post-Hardcore • Track 05 • Featured Single",
    modal_btn_play: "PLAY THIS TRACK",
    modal_btn_close: "CLOSE",
    dock_meta_default: "READY TO PLAY ♡",
    dock_meta_playing: "NOW PLAYING ⚡",
    dock_btn_phase: "PHASE ↗"
  },
  ja: {
    page_title: "✧XE・PON♡✧ // 公式ポータル | BREAK THE LIMIT#2",
    page_desc: "✧XE・PON♡✧の公式サイト。公式プレイリスト『Xe Pon _ NEON & FRICTION』全5曲およびクライマックス新曲『BREAK THE LIMIT#2』を配信中。",
    nav_home: "ホーム",
    nav_showcase: "楽曲紹介",
    nav_playlist: "プレイリスト",
    nav_toei: "東映通信",
    nav_artist_phase: "PHASE",
    status_ready: "再生準備完了",
    status_playing: "再生中 ⚡",
    status_paused: "一時停止中",
    badge_new_release: "✧ 新曲公開",
    badge_bpm_energy: "♡ パンクエネルギー100%",
    badge_phase_tracks: "PHASEで全16曲配信中",
    badge_5_tracks: "全5曲完全収録",
    hero_title_top: "超音速ジャパニーズ・ポストハードコア＆パンク",
    hero_kanji_sub: "BREAK THE LIMIT#2 「叫べ！夜を切り裂いて光を掴め！」",
    hero_desc: "ハイゲインギターが生み出す音の壁、超高速スカンクビート、怒涛のツーバス、そして感情と摩擦に満ちた女性ロックボーカルの生々しい叫び。『NEON & FRICTION』収録の厳選5曲をサイト内で直接試聴、またはPhaseで✧XE・PON♡✧の全16曲カタログをストリーミング。",
    btn_play_single: "新曲を再生",
    btn_view_playlist: "全5曲を見る",
    btn_lyrics_notes: "歌詞 & ノート",
    btn_sub_production: "全5曲 制作ディレクション",
    stat_members: "メンバー",
    stat_phase_songs: "PHASE配信",
    stat_tracks: "サイト再生",
    stat_toei: "東映着信",
    hero_tag_top: "✧XE・PON♡✧ // メンバー4名",
    hero_tag_bottom: "全5曲再生可能 ♡",
    sec1_badge: "楽曲深層解説",
    sec1_kanji: "サウンド解説",
    sec1_sub: "全5曲のサウンドディレクション、東京の撮影ロケーション、歌詞、制作背景を徹底解説。",
    pill_location_lbl: "ロケーション",
    direction_header: "// 楽曲解説 & サウンドプロファイル",
    chorus_tag: "サビ抜粋 // サビ",
    btn_expand_lyrics: "フル歌詞を見る 📜",
    btn_play_onsite: "▶ 再生",
    btn_pause_onsite: "⏸ 一時停止",
    btn_prev_track: "◀ 前の曲",
    btn_next_track: "次の曲 ▶",
    btn_stream_phase: "PHASE ↗",
    btn_sub_open_app: "公式アプリを開く ↗",
    sec2_badge: "公式プレイリスト",
    sec2_kanji: "プレイリスト ♡",
    sec2_sub: "内蔵プレイヤーで5曲すべてを直接再生、またはPhaseでフル再生。",
    badge_5_songs: "全5曲",
    playlist_sub_tag: "サイト内再生対応",
    playlist_meta_info: "アーティスト: ✧XE・PON♡✧ • 全5曲 • ジャパニーズ・オルタナティブロック / ポストハードコア",
    btn_play_all: "全曲再生",
    btn_open_phase: "PHASEで開く ↗",
    th_track: "トラック & 曲名",
    th_genre: "ジャンル",
    th_duration: "時間",
    th_action: "再生",
    btn_play_inline: "▶ 再生",
    btn_pause_inline: "⏸ 一時停止",
    badge_new_hit: "★ 最新シングル",
    sec3_badge: "東映通信",
    sec3_kanji: "東映アニメーション",
    sec3_sub: "曲があまりにもアニメOPすぎるため、大手アニメスタジオからの着信が止まらない事態に。",
    toei_terminal_title: "通信記録 // 東映アニメーション",
    toei_alert_badge: "着信100件以上",
    toei_log_status: "着信過多 // おやすみモード作動中",
    toei_log_freq: "アーティスト: ✧XE・PON♡✧",
    toei_sender_1: "東映アニメーション // 鈴木チーフプロデューサー",
    toei_time_1: "午前3:42 (着信47回目)",
    toei_msg_1: "「頼むから電話に出てくれ！！😭 監督が『BREAK THE LIMIT#2』を聴いて、クライマックスの戦闘シーンをサビに合わせるために最終話の絵コンテを全部描き直すって言い出したんだ！条件は何でも飲むから、頼むから既読無視をやめて折り返してくれ！！」",
    toei_sender_2: "東映アニメーション // 劇伴音楽制作部",
    toei_time_2: "午前4:15 (着信89回目)",
    toei_msg_2: "「緊急連絡：バンド練習中にメンバー4人全員で『おやすみモード』にするのを今すぐやめてください！！スタジオでアニメーター3人がヘッドホンして泣いてます。秋クールの納品まであと2週間切ってるんです。今すぐ連絡ください。」",
    toei_sender_3: "渋谷ライブハウス // 受付スタッフ",
    toei_time_3: "午前4:21 (着信102回目)",
    toei_msg_3: "「おい、お前ら…ライブハウスの裏口に東映アニメーションの腕章つけたスーツの男が張り付いて練習終わるの待ってるんだけど。お前らスタジオで何やらかしたの？💀」",
    btn_follow_phase: "PHASEで全16曲を聴く ↗",
    disco_badge: "⚡ 完全ディスコグラフィ // PHASE",
    disco_title: "PHASEにて全16曲配信中",
    disco_desc: "『NEON & FRICTION』の5曲にとどまらず、公式Phaseプラットフォームでは✧XE・PON♡✧の全16曲におよぶジャパニーズ・ポストハードコア、オルタナティブロック、メロディックパンクをストリーミング配信中。",
    btn_explore_16: "PHASEで全16曲を聴く",
    cap_akiba: "秋葉原GIGO ✧",
    cap_street: "渋谷の路地裏 ♡",
    cap_chrome: "セッション ☆",
    modal_chip: "公式歌詞 & ノート // ✧XE・PON♡✧",
    modal_specs: "ポストハードコア • 最新シングル",
    modal_btn_play: "この曲を再生",
    modal_btn_close: "閉じる",
    dock_meta_default: "再生準備完了 ♡",
    dock_meta_playing: "再生中 ⚡",
    dock_btn_phase: "PHASE ↗"
  }
};

/**
 * ==========================================================================
 * 2. TRACK DATA
 * ==========================================================================
 */
const XE_PON_TRACKS = [
  {
    index: 0,
    title: "ASTRAL SHIBUYA OVERDRIVE",
    artist: "✧XE・PON♡✧",
    duration: "3:34",
    audioSrc: "assets/audio/astral-shibuya-overdrive.mp3",
    phaseUrl: "https://app.phase.app.br/?track=8c124227-9d14-43c1-aaaa-847472eb1d95",
    tag: "Track 01",
    genre: { en: "Japanese Alt Rock", ja: "ジャパニーズ・オルタナ" }
  },
  {
    index: 1,
    title: "ZANGAI",
    artist: "✧XE・PON♡✧",
    duration: "3:30",
    audioSrc: "assets/audio/zangai.mp3",
    phaseUrl: "https://app.phase.app.br/?track=6cabef0e-061d-4697-b5dd-6152ea718683",
    tag: "Track 02",
    genre: { en: "Math Rock / Post-Hardcore", ja: "マスロック / ポストハードコア" }
  },
  {
    index: 2,
    title: "BREAK THE LIMIT#1",
    artist: "✧XE・PON♡✧",
    duration: "3:26",
    audioSrc: "assets/audio/break-the-limit-1.mp3",
    phaseUrl: "https://app.phase.app.br/?track=db4daa95-648c-4518-b21c-8d8affa7437b",
    tag: "Track 03",
    genre: { en: "Melodic Punk", ja: "メロディックパンク" }
  },
  {
    index: 3,
    title: "HIBANA",
    artist: "✧XE・PON♡✧",
    duration: "3:25",
    audioSrc: "assets/audio/hibana.mp3",
    phaseUrl: "https://app.phase.app.br/?track=bc0b1e00-c033-4072-922f-a11d77c036d3",
    tag: "Track 04",
    genre: { en: "Post-Hardcore / Punk", ja: "ポストハードコア / パンク" }
  },
  {
    index: 4,
    title: "BREAK THE LIMIT#2",
    artist: "✧XE・PON♡✧",
    duration: "3:45",
    audioSrc: "assets/audio/break-the-limit-2.mp3",
    phaseUrl: "https://app.phase.app.br/?track=a49e18b4-39cf-44f6-8f29-9f5dbebeed17",
    tag: "Climax Single",
    genre: { en: "Post-Hardcore / Climax", ja: "ポストハードコア / クライマックス" },
    isHit: true
  }
];

/**
 * ==========================================================================
 * 2.1 SHOWCASE DATA
 * ==========================================================================
 */
const XE_PON_SHOWCASE = [
  {
    index: 0,
    title: "ASTRAL SHIBUYA OVERDRIVE",
    subtitle: { en: "✧XE・PON♡✧ • Track 01 of 05", ja: "✧XE・PON♡✧ • トラック 01 / 05" },
    tag: "TRACK 01",
    image: "assets/arcade-follow.jpg",
    imageAlt: "✧XE・PON♡✧ in Shibuya",
    location: { en: "Shibuya Scramble & Center-Gai, Tokyo", ja: "東京・渋谷スクランブル交差点＆センター街" },
    genres: [
      { text: "JAPANESE ALT ROCK", cls: "tag-blue" },
      { text: "ELECTRONIC PUNK", cls: "tag-pink" },
      { text: "NEON OVERDRIVE", cls: "tag-white" }
    ],
    editorialHeader: { en: "// TRACK OVERVIEW & SOUND PROFILE", ja: "// 楽曲解説 & サウンドプロファイル" },
    editorialBody: {
      en: "A high-octane collision of Tokyo midnight energy and roaring alternative rock. Blending distorted melodic guitar riffs with pulsing electronic bass grooves, this track captures the adrenaline rush of sprinting through Shibuya's neon canyons at 2 AM.",
      ja: "東京の夜の熱気と轟音オルタナティブロックが火花を散らすハイスピードナンバー。疾走感あふれるディストーションギターと脈動するエレクトロニックベースが融合し、午前2時の渋谷のネオン街を全力疾走するような高揚感を表現。"
    },
    lyricTag: { en: "HOOK HIGHLIGHT // 歌詞抜粋", ja: "サビ抜粋 // サビ" },
    lyricQuote: {
      en: '"Sprint through the electric storm — our voices will pierce through Tokyo\'s midnight sky!"',
      ja: "「ネオンの嵐を蹴散らして走れ！東京の真夜中を貫く叫びを響かせろ！」"
    },
    phaseUrl: "https://app.phase.app.br/?track=8c124227-9d14-43c1-aaaa-847472eb1d95"
  },
  {
    index: 1,
    title: "ZANGAI",
    subtitle: { en: "✧XE・PON♡✧ • Track 02 of 05", ja: "✧XE・PON♡✧ • トラック 02 / 05" },
    tag: "TRACK 02",
    image: "assets/band-collage.jpg",
    imageAlt: "✧XE・PON♡✧ band session",
    location: { en: "Shinjuku Omoide Yokocho, Tokyo", ja: "東京・新宿思い出横丁" },
    genres: [
      { text: "MATH ROCK", cls: "tag-pink" },
      { text: "POST-HARDCORE", cls: "tag-blue" },
      { text: "MELODIC PUNK", cls: "tag-white" }
    ],
    editorialHeader: { en: "// TRACK OVERVIEW & SOUND PROFILE", ja: "// 楽曲解説 & サウンドプロファイル" },
    editorialBody: {
      en: "Angular, intricate math-rock guitar tapping intertwines with raw post-hardcore aggression. 'Zangai' (Remnants) explores the raw feeling of standing amidst broken promises and rising stronger from the ashes.",
      ja: "変拍子のマスロック的ギタータッピングと、生々しいポストハードコアの衝動が交錯するエモーショナル・アンセム。『残骸』という名の通り、壊れかけた街や挫折の中で立ち上がる強さを描く一曲。"
    },
    lyricTag: { en: "CHORUS HIGHLIGHT // サビ", ja: "サビ抜粋 // サビ" },
    lyricQuote: {
      en: '"Even from the ashes of yesterday, we will ignite a fire that never goes out."',
      ja: "「瓦礫の隙間に残った火種でも、消えない炎を何度だって燃え上がらせろ！」"
    },
    phaseUrl: "https://app.phase.app.br/?track=6cabef0e-061d-4697-b5dd-6152ea718683"
  },
  {
    index: 2,
    title: "BREAK THE LIMIT#1",
    subtitle: { en: "✧XE・PON♡✧ • Track 03 of 05", ja: "✧XE・PON♡✧ • トラック 03 / 05" },
    tag: "TRACK 03",
    image: "assets/street-food.jpg",
    imageAlt: "✧XE・PON♡✧ street food session",
    location: { en: "Shimokitazawa Underground Livehouse, Tokyo", ja: "東京・下北沢アンダーグラウンド・ライブハウス" },
    genres: [
      { text: "MELODIC PUNK", cls: "tag-white" },
      { text: "POST-HARDCORE", cls: "tag-pink" },
      { text: "186 BPM", cls: "tag-blue" }
    ],
    editorialHeader: { en: "// TRACK OVERVIEW & SOUND PROFILE", ja: "// 楽曲解説 & サウンドプロファイル" },
    editorialBody: {
      en: "The genesis of the 'Break the Limit' saga. Pure melodic punk energy built for sweat-drenched underground livehouses. Driven by relentless 186 BPM skank beats and rapid-fire octave guitar leads.",
      ja: "『Break the Limit』サーガの原点となる超直球メロディックパンク。地下ライブハウスの熱気とサークルピットをそのままパッケージしたような186 BPMの疾走感。"
    },
    lyricTag: { en: "CHORUS HIGHLIGHT // サビ", ja: "サビ抜粋 // サビ" },
    lyricQuote: {
      en: '"Smash through the barrier in front of you — don\'t dare look back until the dawn!"',
      ja: "「目の前の壁をぶち壊せ！朝が来るまで後ろなんて振り返るな！」"
    },
    phaseUrl: "https://app.phase.app.br/?track=db4daa95-648c-4518-b21c-8d8affa7437b"
  },
  {
    index: 3,
    title: "HIBANA",
    subtitle: { en: "✧XE・PON♡✧ • Track 04 of 05", ja: "✧XE・PON♡✧ • トラック 04 / 05" },
    tag: "TRACK 04",
    image: "assets/arcade-follow.jpg",
    imageAlt: "✧XE・PON♡✧ Tokyo Electric Town",
    location: { en: "Akihabara GiGO Rooftop, Tokyo", ja: "東京・秋葉原GiGO屋上" },
    genres: [
      { text: "POST-HARDCORE", cls: "tag-pink" },
      { text: "JAPANESE PUNK", cls: "tag-blue" },
      { text: "DOUBLE BASS", cls: "tag-white" }
    ],
    editorialHeader: { en: "// TRACK OVERVIEW & SOUND PROFILE", ja: "// 楽曲解説 & サウンドプロファイル" },
    editorialBody: {
      en: "Explosive and razor-sharp, 'Hibana' (Sparks) hits like an electric shock. Thunderous double-kick drum patterns drive aggressive high-gain guitars, while gritty melodic screams capture defiance.",
      ja: "稲妻のように鋭く炸裂する『火花』。連打されるツーバスの重低音とエッジの効いたハイゲインギターが織りなすソリッドな音圧。痛みや葛藤をシャウトに変え、逆境を切り拓く強靭な意志を描いたナンバー。"
    },
    lyricTag: { en: "HOOK HIGHLIGHT // 歌詞抜粋", ja: "サビ抜粋 // サビ" },
    lyricQuote: {
      en: '"Transform every scar into sparks that illuminate the path forward!"',
      ja: "「全ての傷を光る火花に変えろ！未来を照らす灯火にしろ！」"
    },
    phaseUrl: "https://app.phase.app.br/?track=bc0b1e00-c033-4072-922f-a11d77c036d3"
  },
  {
    index: 4,
    title: "BREAK THE LIMIT#2",
    subtitle: { en: "✧XE・PON♡✧ • Track 05 of 05 ★ Climax Single", ja: "✧XE・PON♡✧ • トラック 05 / 05 ★ クライマックスシングル" },
    tag: "★ CLIMAX SINGLE",
    image: "assets/toei-missed-calls.jpg",
    imageAlt: "✧XE・PON♡✧ Break The Limit",
    location: { en: "Ikebukuro & Toei Animation HQ, Tokyo", ja: "東京・池袋＆東映アニメーション本社" },
    genres: [
      { text: "POST-HARDCORE", cls: "tag-pink" },
      { text: "CLIMAX ANTHEM", cls: "tag-blue" },
      { text: "FEATURED SINGLE", cls: "tag-white" }
    ],
    editorialHeader: { en: "// TRACK OVERVIEW & SOUND PROFILE", ja: "// 楽曲解説 & サウンドプロファイル" },
    editorialBody: {
      en: "The definitive evolution and climax of the 'Break the Limit' saga. Every sonic element of ✧XE・PON♡✧ converges in an overwhelming anthem. This is the track that made Toei Animation lose sleep.",
      ja: "『Break the Limit』サーガの完結編にしてクライマックス。✧XE・PON♡✧のすべてが結実した圧倒的アンセム。東映アニメーションの眠れぬ夜を引き起こした伝説の一曲。"
    },
    lyricTag: { en: "CLIMAX CHORUS // サビ", ja: "クライマックス・サビ // サビ" },
    lyricQuote: {
      en: '"Scream! Tear through the night and seize the light!"',
      ja: "「叫べ！夜を切り裂いて光を掴め！」"
    },
    phaseUrl: "https://app.phase.app.br/?track=a49e18b4-39cf-44f6-8f29-9f5dbebeed17"
  }
];

/**
 * ==========================================================================
 * 3. SPARKLE CANVAS (Y2K Idol Aesthetic)
 * ==========================================================================
 */
function initSparkleCanvas() {
  const canvas = document.getElementById('sparkle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let animationId;
  let particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const colors = [
    'rgba(255, 20, 147, 0.7)',
    'rgba(137, 207, 240, 0.7)',
    'rgba(255, 255, 255, 0.9)',
    'rgba(255, 105, 180, 0.6)'
  ];

  for (let i = 0; i < 40; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.7 + 0.2,
      opacityDelta: (Math.random() - 0.5) * 0.015,
      color: colors[Math.floor(Math.random() * colors.length)],
      type: Math.random() > 0.4 ? 'cross' : 'circle'
    });
  }

  function drawCross(cx, cy, size, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx - size * 2, cy);
    ctx.lineTo(cx + size * 2, cy);
    ctx.moveTo(cx, cy - size * 2);
    ctx.lineTo(cx, cy + size * 2);
    ctx.stroke();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      p.opacity += p.opacityDelta;
      if (p.opacity > 0.85 || p.opacity < 0.15) {
        p.opacityDelta *= -1;
      }

      ctx.save();
      ctx.globalAlpha = Math.max(0.1, Math.min(1, p.opacity));
      if (p.type === 'cross') {
        drawCross(p.x, p.y, p.size, p.color);
      } else {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });

    animationId = requestAnimationFrame(animate);
  }
  animate();
}

/**
 * ==========================================================================
 * 4. AUDIO ENGINE
 * ==========================================================================
 */
function initAudioEngine() {
  audioEl = document.getElementById('native-audio');
  if (!audioEl) return;

  // Set initial source
  audioEl.src = XE_PON_TRACKS[currentTrackIdx].audioSrc;
  audioEl.preload = 'auto';

  // Event bindings directly onto HTMLAudioElement
  audioEl.addEventListener('play', () => {
    isPlaying = true;
    updatePlayUI();
    updatePlaylistHighlight();
  });

  audioEl.addEventListener('pause', () => {
    isPlaying = false;
    updatePlayUI();
    updatePlaylistHighlight();
  });

  audioEl.addEventListener('ended', () => {
    // Auto-advance to next track
    switchTrack(currentTrackIdx + 1, true);
  });

  audioEl.addEventListener('timeupdate', updateProgress);
  audioEl.addEventListener('loadedmetadata', updateTotalTime);
  audioEl.addEventListener('durationchange', updateTotalTime);

  audioEl.addEventListener('error', (e) => {
    console.warn('Audio engine error or media not ready:', audioEl.error);
    isPlaying = false;
    updatePlayUI();
    updatePlaylistHighlight();
  });

  // Dock buttons
  const playPauseBtn = document.getElementById('play-pause-btn');
  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', togglePlayPause);
  }

  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  if (prevBtn) prevBtn.addEventListener('click', () => switchTrack(currentTrackIdx - 1, true));
  if (nextBtn) nextBtn.addEventListener('click', () => switchTrack(currentTrackIdx + 1, true));

  // Hero Play button
  const heroPlayBtn = document.getElementById('hero-play-featured-btn');
  if (heroPlayBtn) {
    heroPlayBtn.addEventListener('click', () => {
      if (currentTrackIdx === 4 && isPlaying) {
        pauseAudio();
      } else {
        switchTrack(4, true);
      }
    });
  }

  // Playlist "Play All" button
  const playAllBtn = document.getElementById('play-all-btn');
  if (playAllBtn) {
    playAllBtn.addEventListener('click', () => {
      switchTrack(0, true);
    });
  }

  // Progress Bar Seek
  const progressBar = document.getElementById('player-progress');
  if (progressBar) {
    progressBar.addEventListener('click', (e) => {
      const rect = progressBar.getBoundingClientRect();
      const pct = (e.clientX - rect.left) / rect.width;
      if (audioEl.duration) {
        audioEl.currentTime = pct * audioEl.duration;
      }
    });
  }

  updatePlayerInfo();
}

function playAudio() {
  if (!audioEl) audioEl = document.getElementById('native-audio');
  if (!audioEl) return;

  if (!audioEl.src || audioEl.src === '' || audioEl.src.endsWith('/')) {
    audioEl.src = XE_PON_TRACKS[currentTrackIdx].audioSrc;
  }

  if (typeof audioEl.play === 'function') {
    const promise = audioEl.play();
    if (promise !== undefined && typeof promise.then === 'function') {
      promise
        .then(() => {
          isPlaying = true;
          updatePlayUI();
          updatePlaylistHighlight();
        })
        .catch((err) => {
          console.warn('Audio play request interrupted or requires direct gesture:', err);
          isPlaying = false;
          updatePlayUI();
          updatePlaylistHighlight();
        });
    } else {
      isPlaying = true;
      updatePlayUI();
      updatePlaylistHighlight();
    }
  }
}

function pauseAudio() {
  if (!audioEl) return;
  if (typeof audioEl.pause === 'function') {
    audioEl.pause();
  }
  isPlaying = false;
  updatePlayUI();
  updatePlaylistHighlight();
}

function togglePlayPause() {
  if (!audioEl) return;
  if (audioEl.paused) {
    playAudio();
  } else {
    pauseAudio();
  }
}

function switchTrack(idx, andPlay = false) {
  if (idx < 0) idx = XE_PON_TRACKS.length - 1;
  if (idx >= XE_PON_TRACKS.length) idx = 0;

  currentTrackIdx = idx;

  if (!audioEl) audioEl = document.getElementById('native-audio');
  if (audioEl) {
    const targetSrc = XE_PON_TRACKS[idx].audioSrc;
    if (!audioEl.src.endsWith(targetSrc)) {
      audioEl.src = targetSrc;
      if (typeof audioEl.load === 'function') {
        audioEl.load();
      }
    }
  }

  // Sync showcase view to currently active track
  currentShowcaseIdx = idx;
  renderShowcaseNav();
  renderShowcaseTrack(idx);

  updatePlayerInfo();
  updatePlaylistHighlight();

  if (andPlay) {
    playAudio();
  }
}

function updatePlayUI() {
  const playPauseBtn = document.getElementById('play-pause-btn');
  if (playPauseBtn) {
    playPauseBtn.textContent = isPlaying ? '⏸' : '▶';
    playPauseBtn.classList.toggle('is-playing', isPlaying);
  }

  const dict = I18N[currentLang] || I18N.en;
  const playerMeta = document.getElementById('player-meta');
  if (playerMeta) {
    playerMeta.textContent = isPlaying ? dict.dock_meta_playing : dict.dock_meta_default;
  }
}

function updatePlayerInfo() {
  const track = XE_PON_TRACKS[currentTrackIdx];
  const playerTitle = document.getElementById('player-title');
  if (playerTitle) playerTitle.textContent = `${track.title} — ${track.artist}`;

  const playerPhaseLink = document.getElementById('player-phase-link');
  if (playerPhaseLink) playerPhaseLink.href = track.phaseUrl;

  updatePlayUI();
  updateTotalTime();
}

function updateProgress() {
  if (!audioEl || !audioEl.duration) return;
  const pct = (audioEl.currentTime / audioEl.duration) * 100;
  const fill = document.getElementById('progress-fill');
  if (fill) fill.style.width = pct + '%';

  const currentTimeEl = document.getElementById('current-time');
  if (currentTimeEl) currentTimeEl.textContent = formatTime(audioEl.currentTime);
}

function updateTotalTime() {
  const totalTimeEl = document.getElementById('total-time');
  if (totalTimeEl && audioEl && audioEl.duration) {
    totalTimeEl.textContent = formatTime(audioEl.duration);
  }
}

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/**
 * ==========================================================================
 * 5. TRACK SHOWCASE
 * ==========================================================================
 */
function initTrackShowcase() {
  // Arrow buttons
  const prevBtn = document.getElementById('showcase-prev-btn');
  const nextBtn = document.getElementById('showcase-next-btn');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      let nextIdx = currentShowcaseIdx - 1;
      if (nextIdx < 0) nextIdx = XE_PON_SHOWCASE.length - 1;
      switchTrack(nextIdx, isPlaying);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      let nextIdx = currentShowcaseIdx + 1;
      if (nextIdx >= XE_PON_SHOWCASE.length) nextIdx = 0;
      switchTrack(nextIdx, isPlaying);
    });
  }

  renderShowcaseNav();
  renderShowcaseTrack(currentShowcaseIdx);
}

function renderShowcaseNav() {
  const nav = document.getElementById('showcase-nav');
  if (!nav) return;
  nav.innerHTML = '';

  XE_PON_SHOWCASE.forEach((track, i) => {
    const pill = document.createElement('button');
    const isCurrent = i === currentShowcaseIdx;
    pill.className = `showcase-pill${isCurrent ? ' active' : ''}`;
    pill.innerHTML = `<span>${String(i + 1).padStart(2, '0')}</span> <span>${track.title}</span>`;
    pill.addEventListener('click', () => {
      switchTrack(i, false);
    });
    nav.appendChild(pill);
  });

  // Update counter display
  const counter = document.getElementById('showcase-counter');
  if (counter) {
    counter.textContent = `${String(currentShowcaseIdx + 1).padStart(2, '0')} / ${String(XE_PON_SHOWCASE.length).padStart(2, '0')}`;
  }
}

function renderShowcaseTrack(idx) {
  const card = document.getElementById('showcase-card');
  if (!card) return;
  const data = XE_PON_SHOWCASE[idx];
  if (!data) return;
  const dict = I18N[currentLang] || I18N.en;

  const genreTags = data.genres.map(g => `<span class="genre-tag ${g.cls}">${g.text}</span>`).join('');
  const isThisPlaying = idx === currentTrackIdx && isPlaying;

  card.innerHTML = `
    <div class="showcase-card-layout">
      <div class="showcase-card-img">
        <img src="${data.image}" alt="${data.imageAlt}" />
        <span class="img-tag">${data.tag}</span>
      </div>
      <div class="showcase-card-body">
        <h3 class="showcase-card-title">${data.title}</h3>
        <p class="showcase-card-subtitle">${data.subtitle[currentLang] || data.subtitle.en}</p>
        <div class="showcase-genres">${genreTags}</div>
        <div class="showcase-location">${data.location[currentLang] || data.location.en}</div>
        <div class="showcase-editorial-header">${data.editorialHeader[currentLang] || data.editorialHeader.en}</div>
        <p class="showcase-editorial-body">${data.editorialBody[currentLang] || data.editorialBody.en}</p>
        <div class="showcase-lyric-quote">
          <div class="showcase-lyric-tag">${data.lyricTag[currentLang] || data.lyricTag.en}</div>
          <p class="showcase-lyric-text">${data.lyricQuote[currentLang] || data.lyricQuote.en}</p>
        </div>
        <div class="showcase-actions">
          <button class="btn btn-primary btn-sm showcase-play-btn${isThisPlaying ? ' is-playing' : ''}" data-track-idx="${idx}">
            <span class="btn-icon">${isThisPlaying ? '⏸' : '▶'}</span>
            <span>${isThisPlaying ? dict.btn_pause_onsite : dict.btn_play_onsite}</span>
          </button>
          <a href="${data.phaseUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-dark btn-sm">
            <span>${dict.btn_stream_phase}</span>
          </a>
          <button class="btn btn-outline-dark btn-sm showcase-lyrics-btn" data-track-idx="${idx}">
            <span>${dict.btn_expand_lyrics}</span>
          </button>
        </div>
      </div>
    </div>
  `;

  // Bind play button
  const playBtn = card.querySelector('.showcase-play-btn');
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (idx === currentTrackIdx && isPlaying) {
        pauseAudio();
      } else {
        switchTrack(idx, true);
      }
    });
  }

  // Bind lyrics button
  const lyricsBtn = card.querySelector('.showcase-lyrics-btn');
  if (lyricsBtn) {
    lyricsBtn.addEventListener('click', () => {
      openLyricsModal(idx);
    });
  }
}

/**
 * ==========================================================================
 * 6. PLAYLIST
 * ==========================================================================
 */
function initPlaylist() {
  renderPlaylist();
}

function renderPlaylist() {
  const list = document.getElementById('track-list');
  if (!list) return;
  const dict = I18N[currentLang] || I18N.en;

  list.innerHTML = '';

  XE_PON_TRACKS.forEach((track, i) => {
    const isThisTrack = i === currentTrackIdx;
    const isThisPlaying = isThisTrack && isPlaying;
    const row = document.createElement('div');
    row.className = `track-row${isThisTrack ? ' is-active' : ''}${isThisPlaying ? ' is-playing' : ''}`;
    row.setAttribute('data-track-idx', i);

    const hitBadge = track.isHit
      ? `<span class="track-hit-badge">${dict.badge_new_hit}</span>`
      : '';

    const eqHtml = isThisPlaying
      ? `<span class="eq-visualizer"><span class="eq-bar"></span><span class="eq-bar"></span><span class="eq-bar"></span></span>`
      : `<span class="track-num">${String(i + 1).padStart(2, '0')}</span>`;

    const playBtnLabel = isThisPlaying ? (dict.btn_pause_inline || '⏸ PAUSE') : (dict.btn_play_inline || '▶ PLAY');

    row.innerHTML = `
      <div class="track-col-num">${eqHtml}</div>
      <div class="track-title-cell">
        <span class="track-title-name">${track.title}</span>
        <span class="track-title-artist">${track.artist}</span>
        ${hitBadge}
      </div>
      <span class="track-genre">${track.genre[currentLang] || track.genre.en}</span>
      <span class="track-duration">${track.duration}</span>
      <div class="track-action-btns">
        <button class="btn-play-inline${isThisPlaying ? ' is-playing' : ''}">${playBtnLabel}</button>
        <a href="${track.phaseUrl}" target="_blank" rel="noopener noreferrer" class="btn-phase-inline">${dict.dock_btn_phase}</a>
      </div>
    `;

    // Inline play button
    const inlinePlayBtn = row.querySelector('.btn-play-inline');
    if (inlinePlayBtn) {
      inlinePlayBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (i === currentTrackIdx && isPlaying) {
          pauseAudio();
        } else {
          switchTrack(i, true);
        }
      });
    }

    // Row click selects and toggles
    row.addEventListener('click', (e) => {
      if (e.target.closest('.btn-phase-inline')) return;
      if (i === currentTrackIdx && isPlaying) {
        pauseAudio();
      } else {
        switchTrack(i, true);
      }
    });

    list.appendChild(row);
  });
}

function updatePlaylistHighlight() {
  const dict = I18N[currentLang] || I18N.en;

  document.querySelectorAll('.track-row').forEach((row, i) => {
    const isThisTrack = i === currentTrackIdx;
    const isThisPlaying = isThisTrack && isPlaying;

    row.classList.toggle('is-active', isThisTrack);
    row.classList.toggle('is-playing', isThisPlaying);

    const numCell = row.querySelector('.track-col-num');
    if (numCell) {
      if (isThisPlaying) {
        numCell.innerHTML = `<span class="eq-visualizer"><span class="eq-bar"></span><span class="eq-bar"></span><span class="eq-bar"></span></span>`;
      } else {
        numCell.innerHTML = `<span class="track-num">${String(i + 1).padStart(2, '0')}</span>`;
      }
    }

    const btn = row.querySelector('.btn-play-inline');
    if (btn) {
      btn.textContent = isThisPlaying ? (dict.btn_pause_inline || '⏸ PAUSE') : (dict.btn_play_inline || '▶ PLAY');
      btn.classList.toggle('is-playing', isThisPlaying);
    }
  });

  // Also update showcase card button if visible
  const showcasePlayBtn = document.querySelector('.showcase-play-btn');
  if (showcasePlayBtn) {
    const cardIdx = parseInt(showcasePlayBtn.getAttribute('data-track-idx'), 10);
    const isCardPlaying = cardIdx === currentTrackIdx && isPlaying;
    showcasePlayBtn.innerHTML = `
      <span class="btn-icon">${isCardPlaying ? '⏸' : '▶'}</span>
      <span>${isCardPlaying ? dict.btn_pause_onsite : dict.btn_play_onsite}</span>
    `;
    showcasePlayBtn.classList.toggle('is-playing', isCardPlaying);
  }
}

/**
 * ==========================================================================
 * 7. LYRICS MODAL
 * ==========================================================================
 */
function initLyricsModal() {
  const openBtn = document.getElementById('open-lyrics-btn');
  if (openBtn) {
    openBtn.addEventListener('click', () => openLyricsModal(currentTrackIdx));
  }

  const closeBtn = document.getElementById('modal-close-btn');
  const closeBtn2 = document.getElementById('modal-close-btn-2');
  if (closeBtn) closeBtn.addEventListener('click', closeLyricsModal);
  if (closeBtn2) closeBtn2.addEventListener('click', closeLyricsModal);

  const modalPlayBtn = document.getElementById('modal-play-btn');
  if (modalPlayBtn) {
    modalPlayBtn.addEventListener('click', () => {
      switchTrack(currentModalTrackIdx, true);
      closeLyricsModal();
    });
  }

  // Close on overlay click
  const overlay = document.getElementById('lyrics-modal');
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeLyricsModal();
    });
  }
}

function openLyricsModal(idx) {
  currentModalTrackIdx = idx;
  renderModalLyrics(idx);
  const modal = document.getElementById('lyrics-modal');
  if (modal) modal.classList.add('is-open');
}

function closeLyricsModal() {
  const modal = document.getElementById('lyrics-modal');
  if (modal) modal.classList.remove('is-open');
}

function renderModalLyrics(idx) {
  const body = document.getElementById('modal-lyrics-body');
  if (!body) return;
  const data = XE_PON_SHOWCASE[idx];
  if (!data) return;

  body.innerHTML = `
    <h3 class="modal-track-title">${data.title}</h3>
    <p class="modal-track-specs">${data.subtitle[currentLang] || data.subtitle.en}</p>
    <div class="showcase-genres" style="margin-bottom:20px;">
      ${data.genres.map(g => `<span class="genre-tag ${g.cls}">${g.text}</span>`).join('')}
    </div>
    <div class="showcase-editorial-header">${data.editorialHeader[currentLang] || data.editorialHeader.en}</div>
    <p class="showcase-editorial-body">${data.editorialBody[currentLang] || data.editorialBody.en}</p>
    <div class="showcase-lyric-quote" style="margin-top:20px;">
      <div class="showcase-lyric-tag">${data.lyricTag[currentLang] || data.lyricTag.en}</div>
      <p class="showcase-lyric-text">${data.lyricQuote[currentLang] || data.lyricQuote.en}</p>
    </div>
  `;
}

/**
 * ==========================================================================
 * 8. LANGUAGE SWITCHER (EN / JA)
 * ==========================================================================
 */
function initLanguageSwitcher() {
  const saved = localStorage.getItem('xepon_lang');
  if (saved === 'ja' || saved === 'en') {
    currentLang = saved;
  }
  applyLanguage(currentLang);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      if (lang && (lang === 'en' || lang === 'ja')) {
        currentLang = lang;
        try {
          localStorage.setItem('xepon_lang', lang);
        } catch (e) {}
        applyLanguage(lang);
      }
    });
  });
}

function applyLanguage(lang) {
  document.documentElement.lang = lang === 'ja' ? 'ja' : 'en';

  // Toggle active button
  document.querySelectorAll('.lang-btn').forEach(b => {
    if (b.getAttribute('data-lang') === lang) b.classList.add('active');
    else b.classList.remove('active');
  });

  const dict = I18N[lang] || I18N.en;

  // Title and description
  document.title = dict.page_title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = dict.page_desc;

  // Apply to all data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });

  // Re-render showcase with updated translations
  renderShowcaseNav();
  renderShowcaseTrack(currentShowcaseIdx);

  // Re-render playlist with updated translations
  renderPlaylist();

  // Re-render modal lyrics if open
  renderModalLyrics(currentModalTrackIdx);

  // Refresh player info
  updatePlayerInfo();
}

/**
 * ==========================================================================
 * 9. MOBILE NAV
 * ==========================================================================
 */
function initMobileNav() {
  const toggle = document.getElementById('mobile-toggle');
  const nav = document.getElementById('main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('is-open');
    toggle.classList.toggle('is-active');
  });

  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.classList.remove('is-active');
    });
  });
}

/**
 * ==========================================================================
 * 10. SCROLL NAVIGATION HIGHLIGHT
 * ==========================================================================
 */
function initScrollNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[data-section]');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('data-section') === id);
        });
      }
    });
  }, {
    rootMargin: '-30% 0px -70% 0px'
  });

  sections.forEach(section => observer.observe(section));
}

/**
 * ==========================================================================
 * 11. SCROLL REVEAL ANIMATION
 * ==========================================================================
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    '.section-header-block, .showcase-container, .playlist-card, .chat-window, .disco-layout, .photo-grid'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/**
 * ==========================================================================
 * INITIALIZATION ON DOM READY
 * ==========================================================================
 */
document.addEventListener('DOMContentLoaded', () => {
  initAudioEngine();
  initTrackShowcase();
  initPlaylist();
  initLyricsModal();
  initLanguageSwitcher();
  initSparkleCanvas();
  initMobileNav();
  initScrollNav();
  initScrollReveal();
});
