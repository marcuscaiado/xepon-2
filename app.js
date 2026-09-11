/**
 * ==========================================================================
 * ✧XE・PON♡✧ // JP MARKET REDESIGN — Y2K × IDOL × ANIME BAND
 * Full Vanilla JS: Bilingual i18n, Audio Engine, Sparkle Canvas, Picture Viewer, Interactions
 * ==========================================================================
 */

// ── Global State (Declared at top to prevent TDZ ReferenceErrors) ──────────
let currentLang = 'en';
let currentTrackIdx = 4; // Start with featured climax single: BREAK THE LIMIT#2
let currentShowcaseIdx = 0;
let currentModalTrackIdx = 4;
let currentLyricsViewMode = 'ja';
let currentPicIdx = 0;
let audioEl = null;
let isPlaying = false;

/**
 * ==========================================================================
 * 1. BILINGUAL TRANSLATION DICTIONARY (EN & JA)
 * Rebranded with Phaseia
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
    nav_artist_phase: "PHASEIA",
    status_ready: "READY TO PLAY",
    status_playing: "PLAYING NOW ⚡",
    status_paused: "PAUSED",
    badge_new_release: "✧ NEW SINGLE",
    badge_bpm_energy: "♡ PUNK ENERGY 100%",
    badge_phase_tracks: "16 SONGS ON PHASEIA",
    badge_5_tracks: "5 FULL TRACKS",
    hero_title_top: "JAPANESE POST-HARDCORE & PUNK",
    hero_kanji_sub: 'BREAK THE LIMIT#2 「叫べ！夜を切り裂いて光を掴め！」',
    hero_desc: 'Wall-of-sound production driven by high-gain guitars, high-velocity dynamic skank drumming, furious double-kick pedals, and raw female rock chest vocals. Stream the 5 featured tracks from <em>NEON & FRICTION</em> directly on site, or explore ✧XE・PON♡✧\'s full 16-song catalogue on <strong>Phaseia</strong>.',
    btn_play_single: "PLAY NEW SINGLE",
    btn_view_playlist: "VIEW ALL 5 TRACKS",
    btn_lyrics_notes: "FULL LYRICS & NOTES",
    btn_sub_production: "PRODUCTION SPECS (ALL 5 SONGS)",
    stat_members: "MEMBERS",
    stat_phase_songs: "ON PHASEIA",
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
    btn_play_onsite: "PLAY",
    btn_pause_onsite: "PAUSE",
    btn_prev_track: "◀ PREV",
    btn_next_track: "NEXT ▶",
    btn_stream_phase: "PHASEIA ↗",
    btn_sub_open_app: "OPEN IN OFFICIAL APP ↗",
    sec2_badge: "OFFICIAL PLAYLIST",
    sec2_kanji: "PLAYLIST ♡",
    sec2_sub: "Play any of the 5 original songs directly in the site's integrated player or launch on Phaseia.",
    badge_5_songs: "5 TRACKS",
    playlist_sub_tag: "IN-SITE AUDIO READY",
    playlist_meta_info: "Artist: ✧XE・PON♡✧ • 5 Tracks • Japanese Alt Rock / Post-Hardcore",
    btn_play_all: "PLAY ALL",
    btn_open_phase: "OPEN IN PHASEIA ↗",
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
    toei_photo_tag: "TOEI ANIMATION HQ // 108+ MISSED CALLS",
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
    btn_follow_phase: "FOLLOW ✧XE・PON♡✧ ON PHASEIA (16 SONGS)",
    disco_badge: "⚡ COMPLETE DISCOGRAPHY // PHASEIA",
    disco_title: "ALL 16 SONGS STREAMING ON PHASEIA",
    disco_desc: 'Beyond the 5 featured tracks on <em>NEON & FRICTION</em>, stream ✧XE・PON♡✧\'s full 16-song catalogue of Japanese post-hardcore, alternative rock, and melodic punk directly on the official Phaseia platform.',
    btn_explore_16: "STREAM ALL 16 SONGS ON PHASEIA",
    cap_akiba: "AKIHABARA GIGO ✧",
    cap_street: "SHIBUYA BACK-ALLEY ♡",
    cap_chrome: "SESSIONS ☆",
    modal_chip: "OFFICIAL FULL LYRICS // ✧XE・PON♡✧",
    modal_specs: "Japanese Post-Hardcore • Track 05 • Featured Single",
    modal_btn_play: "PLAY THIS TRACK",
    modal_btn_pause: "PAUSE THIS TRACK",
    modal_btn_close: "CLOSE",
    btn_lyrics_short: "LYRICS",
    tip_lyrics: "View Full Official Lyrics & Notes",
    tab_original_ja: "🇯🇵 日本語 (Original)",
    tab_romaji_en: "🌐 Romaji & English",
    tab_side_by_side: "⚡ Side-by-Side",
    notes_toggle_open: "▼ TRACK NOTES & PRODUCTION DETAILS",
    dock_lyrics: "📜 LYRICS",
    dock_meta_default: "READY TO PLAY ♡",
    dock_meta_playing: "NOW PLAYING ⚡",
    dock_btn_phase: "PHASEIA ↗",
    tip_open_miniature: "OPEN IN MINIATURE",
    tip_minimize: "MINIATURE",
    btn_minimize_pip: "OPEN MINIATURE"
  },
  ja: {
    page_title: "✧XE・PON♡✧ // 公式ポータル | BREAK THE LIMIT#2",
    page_desc: "✧XE・PON♡✧の公式サイト。公式プレイリスト『Xe Pon _ NEON & FRICTION』全5曲およびクライマックス新曲『BREAK THE LIMIT#2』を配信中。",
    nav_home: "ホーム",
    nav_showcase: "楽曲紹介",
    nav_playlist: "プレイリスト",
    nav_toei: "東映通信",
    nav_artist_phase: "PHASEIA",
    status_ready: "再生準備完了",
    status_playing: "再生中 ⚡",
    status_paused: "一時停止中",
    badge_new_release: "✧ 新曲公開",
    badge_bpm_energy: "♡ パンクエネルギー100%",
    badge_phase_tracks: "PHASEIAで全16曲配信中",
    badge_5_tracks: "全5曲完全収録",
    hero_title_top: "超音速ジャパニーズ・ポストハードコア＆パンク",
    hero_kanji_sub: "BREAK THE LIMIT#2 「叫べ！夜を切り裂いて光を掴め！」",
    hero_desc: "ハイゲインギターが生み出す音の壁、超高速スカンクビート、怒涛のツーバス、そして感情と摩擦に満ちた女性ロックボーカルの生々しい叫び。『NEON & FRICTION』収録の厳選5曲をサイト内で直接試聴、またはPhaseiaで✧XE・PON♡✧の全16曲カタログをストリーミング。",
    btn_play_single: "新曲を再生",
    btn_view_playlist: "全5曲を見る",
    btn_lyrics_notes: "全曲フル歌詞 & ノート",
    btn_sub_production: "全5曲 制作ディレクション",
    stat_members: "メンバー",
    stat_phase_songs: "PHASEIA配信",
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
    btn_play_onsite: "再生",
    btn_pause_onsite: "一時停止",
    btn_prev_track: "◀ 前の曲",
    btn_next_track: "次の曲 ▶",
    btn_stream_phase: "PHASEIA ↗",
    btn_sub_open_app: "公式アプリを開く ↗",
    sec2_badge: "公式プレイリスト",
    sec2_kanji: "プレイリスト ♡",
    sec2_sub: "内蔵プレイヤーで5曲すべてを直接再生、またはPhaseiaでフル再生。",
    badge_5_songs: "全5曲",
    playlist_sub_tag: "サイト内再生対応",
    playlist_meta_info: "アーティスト: ✧XE・PON♡✧ • 全5曲 • ジャパニーズ・オルタナティブロック / ポストハードコア",
    btn_play_all: "全曲再生",
    btn_open_phase: "PHASEIAで開く ↗",
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
    toei_photo_tag: "東映アニメーション本社 // 着信108件以上",
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
    btn_follow_phase: "PHASEIAで全16曲を聴く ↗",
    disco_badge: "⚡ 完全ディスコグラフィ // PHASEIA",
    disco_title: "PHASEIAにて全16曲配信中",
    disco_desc: "『NEON & FRICTION』の5曲にとどまらず、公式Phaseiaプラットフォームでは✧XE・PON♡✧の全16曲におよぶジャパニーズ・ポストハードコア、オルタナティブロック、メロディックパンクをストリーミング配信中。",
    btn_explore_16: "PHASEIAで全16曲を聴く",
    cap_akiba: "秋葉原GIGO ✧",
    cap_street: "渋谷の路地裏 ♡",
    cap_chrome: "セッション ☆",
    modal_chip: "公式フル歌詞 // ✧XE・PON♡✧",
    modal_specs: "ポストハードコア • 最新シングル",
    modal_btn_play: "この曲を再生",
    modal_btn_pause: "一時停止",
    modal_btn_close: "閉じる",
    btn_lyrics_short: "歌詞",
    tip_lyrics: "公式フル歌詞・楽曲ノートを見る",
    tab_original_ja: "🇯🇵 日本語 (原詞)",
    tab_romaji_en: "🌐 英語 / ローマ字 (対訳)",
    tab_side_by_side: "⚡ 並列表示",
    notes_toggle_open: "▼ 楽曲解説・サウンドノートを見る",
    dock_lyrics: "📜 歌詞",
    dock_meta_default: "再生準備完了 ♡",
    dock_meta_playing: "再生中 ⚡",
    dock_btn_phase: "PHASEIA ↗",
    tip_open_miniature: "ミニチュアで開く",
    tip_minimize: "ミニチュア化",
    btn_minimize_pip: "ミニチュア表示"
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
    image: "assets/toei-missed-calls.png",
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
 * 2.15 COMPLETE OFFICIAL FULL LYRICS (ALL 5 ORIGINAL TRACKS)
 * Full lyrics with verses, pre-choruses, choruses, bridges, and outros
 * Both Japanese original and English / Romaji translation
 * ==========================================================================
 */
const XE_PON_LYRICS = [
  {
    trackIndex: 0,
    title: "ASTRAL SHIBUYA OVERDRIVE",
    tempo: "178 BPM • Drop D Tuning • Fuzz Rock",
    stanzas: [
      {
        tag: { ja: "VERSE 1 // Aメロ", en: "VERSE 1 // INTRO" },
        isChorus: false,
        lines: [
          { ja: "深夜二時のスクランブル　消えかけの青信号", en: "2 AM at the Shibuya Scramble, green light flickering out.", romaji: "Shinya niji no scramble, kiekake no aoshingou" },
          { ja: "雨上がりのアスファルト　滲むネオンの乱反射", en: "Wet asphalt shining with the blur of distorted neon reflections.", romaji: "Ameagari no asufaruto, nijimu neon no ranhansha" },
          { ja: "擦り切れたコンバースで　影を踏み鳴らしてく", en: "Stomping down midnight shadows in shredded Converse sneakers.", romaji: "Surikireta konbaasu de, kage o fuminarashiteku" },
          { ja: "誰かの引いた境界線なんて　蹴り飛ばして加速しろ！", en: "Kick aside whatever boundary someone else drew and accelerate!", romaji: "Dareka no hiita kyoukaisen nante, keritobashite kasoku shiro!" }
        ]
      },
      {
        tag: { ja: "PRE-CHORUS // Bメロ", en: "PRE-CHORUS // ACCEL" },
        isChorus: false,
        lines: [
          { ja: "鼓動が178を刻んでる", en: "My pulse is hammering at 178 BPM!", romaji: "Kodou ga hyaku-nanajuu-hachi o kizanderu" },
          { ja: "歪むファズギター　耳鳴りを引き裂いて", en: "Screaming fuzz guitar tearing right through the tinnitus.", romaji: "Yugamu fazu gitaa, miminari o hikisaite" },
          { ja: "「立ち止まるな」と夜が叫んでる", en: "The midnight screams at us: 'Don't you dare stand still!'", romaji: "'Tachidomaru na' to yoru ga sakenderu" },
          { ja: "信号が変わる前に――今すぐ飛び込め！", en: "Before the signal turns—dive right in now!", romaji: "Shingou ga kawaru mae ni—ima sugu tobikome!" }
        ]
      },
      {
        tag: { ja: "CHORUS // サビ", en: "CHORUS // FIRST DROP" },
        isChorus: true,
        lines: [
          { ja: "ASTRAL OVERDRIVE！　真夜中を撃ち抜け！", en: "ASTRAL OVERDRIVE! Shoot straight through the dead of night!", romaji: "ASTRAL OVERDRIVE! Mayonaka o uchinuke!", highlight: true },
          { ja: "雑音だらけの街で　僕らの声だけがリアルだ！", en: "In a city drowned in white noise, only our voices are real!", romaji: "Zatsuon darake no machi de, bokura no koe dake ga riaru da!", highlight: true },
          { ja: "ネオンの嵐を蹴散らして走れ", en: "Kick through the electric storm and sprint!", romaji: "Neon no arashi o kechirashite hashire" },
          { ja: "東京の空を貫くまで　鳴り止まないディストーション！", en: "Distortion that will never cease until it pierces Tokyo's skyline!", romaji: "Toukyou no sora o tsuranuku made, nariyamanai disutooshon!", highlight: true }
        ]
      },
      {
        tag: { ja: "VERSE 2 // Aメロ", en: "VERSE 2 // BACK-ALLEY" },
        isChorus: false,
        lines: [
          { ja: "センター街の路地裏　落書きだらけの壁", en: "Center-Gai back-alleys, concrete tagged with faded graffiti.", romaji: "Sentaagai no rojiura, rakugaki darake no kabe" },
          { ja: "冷え切った自販機に　もたれて見上げた三日月", en: "Leaning against a freezing vending machine, staring at the crescent moon.", romaji: "Hiekitta jihanki ni, motarete miageta mikazuki" },
          { ja: "約束なんていらない　今ここにある熱だけで", en: "We don't need promises—just the burning heat alive right here.", romaji: "Yakusoku nante iranai, ima koko ni aru netsu dake de" },
          { ja: "擦り切れたピック握りしめ　次のコードを叩きつける！", en: "Gripping a shredded guitar pick, slamming down the next chord!", romaji: "Surikireta pikku nigirishime, tsugi no koudo o tatakitsukeru!" }
        ]
      },
      {
        tag: { ja: "PRE-CHORUS // Bメロ", en: "PRE-CHORUS // SURGE" },
        isChorus: false,
        lines: [
          { ja: "息が切れても　足がもつれても", en: "Even if our lungs burn out, even if our legs stumble,", romaji: "Iki ga kiretemo, ashi ga motsuretemo" },
          { ja: "アンプから火花が散るその瞬間", en: "The very millisecond sparks burst from the amplifier stack,", romaji: "Anpu kara hibana ga chiru sono shunkan" },
          { ja: "世界が息を止めるのが見えた", en: "I saw the entire world hold its breath!", romaji: "Sekai ga iki o tomeru no ga mieta" },
          { ja: "もう誰にも僕らを止められない！", en: "Nobody alive can hold us back now!", romaji: "Mou dare ni mo bokura o tomerarenai!" }
        ]
      },
      {
        tag: { ja: "CHORUS // サビ", en: "CHORUS // SECOND DROP" },
        isChorus: true,
        lines: [
          { ja: "ASTRAL OVERDRIVE！　闇を切り裂いて行け！", en: "ASTRAL OVERDRIVE! Rip straight through the dark!", romaji: "ASTRAL OVERDRIVE! Yami o kirisaite yuke!", highlight: true },
          { ja: "誰にも奪えない　僕らだけの周波数で！", en: "On a sacred frequency that nobody can ever steal!", romaji: "Dare ni mo ubaenai, bokura dake no shuuhasuu de!", highlight: true },
          { ja: "擦り減る靴底　火花を撒き散らし", en: "Shoe soles wearing paper-thin, throwing showers of sparks!", romaji: "Suriheru kutsuzoko, hibana o makichirashi" },
          { ja: "星も届かないアスファルトを　僕らの色に染め変えろ！", en: "Dye the starless Tokyo asphalt in our own blazing colors!", romaji: "Hoshi mo todokanai asufaruto o, bokura no iro ni somekaero!" }
        ]
      },
      {
        tag: { ja: "BRIDGE // ギターソロ＆ブレイクダウン", en: "BRIDGE // TWIN GUITAR HARMONY" },
        isBridge: true,
        lines: [
          { ja: "（Twin Guitars Melodic Harmony // 178 BPM Skank Beat）", en: "(Twin Guitars Melodic Harmony // 178 BPM Skank Beat)", romaji: "[Twin Guitars Melodic Harmony // 178 BPM Skank Beat]" },
          { ja: "擦り切れた過去の残響なんて", en: "Hollow echoes of yesterday's broken moments—", romaji: "Surikireta kako no zankyou nante" },
          { ja: "この爆音オーバードライブで塗り潰せ！", en: "Paint over every single one of them with this roaring overdrive!", romaji: "Kono bakuon oobaadoraibu de nuritsubuse!" },
          { ja: "Ready? 1, 2, 3, Scream!!", en: "Ready? 1, 2, 3, Scream!!", romaji: "Ready? 1, 2, 3, Scream!!", highlight: true }
        ]
      },
      {
        tag: { ja: "CLIMAX CHORUS // ラスサビ", en: "CLIMAX CHORUS // FINAL ROAR" },
        isChorus: true,
        lines: [
          { ja: "ASTRAL OVERDRIVE！　最後の一秒まで！", en: "ASTRAL OVERDRIVE! Down to the very last fraction of a second!", romaji: "ASTRAL OVERDRIVE! Saigo no ichibyou made!", highlight: true },
          { ja: "叫べ！震えろ！この心臓が燃え尽きるまで！", en: "Scream! Shake! Until this beating heart burns completely to ash!", romaji: "Sakebe! Furuero! Kono shinzou ga moetsukiru made!", highlight: true },
          { ja: "夜が明ける前に　光をこの手で掴み取れ", en: "Before the dawn breaks, snatch the light with our own bare hands!", romaji: "Yoru ga akeru mae ni, hikari o kono te de tsukamitore" },
          { ja: "東京の真夜中を貫いて　僕らの歌は終わらない！", en: "Piercing through midnight Shibuya—our song will never die!", romaji: "Toukyou no mayonaka o tsuranuite, bokura no uta wa owaranai!", highlight: true }
        ]
      },
      {
        tag: { ja: "OUTRO // アウトロ", en: "OUTRO // FEEDBACK FADE" },
        isChorus: false,
        lines: [
          { ja: "Overdrive... 響け、世界の果てまで。", en: "Overdrive... echo to the ends of the earth.", romaji: "Overdrive... hibike, sekai no hate made." },
          { ja: "Shibuya Midnight, never die ♡", en: "Shibuya Midnight, never die ♡", romaji: "Shibuya Midnight, never die ♡", highlight: true }
        ]
      }
    ]
  },
  {
    trackIndex: 1,
    title: "ZANGAI",
    tempo: "182 BPM • Drop C# Tuning • Math Rock & Post-Hardcore",
    stanzas: [
      {
        tag: { ja: "VERSE 1 // Aメロ", en: "VERSE 1 // FRACTURED SCREEN" },
        isChorus: false,
        lines: [
          { ja: "割れたスマホの液晶に　歪んで映る冷めた顔", en: "A cold, detached face reflected crooked on a cracked smartphone screen.", romaji: "Wareta sumaho no ekishou ni, yugande utsuru sameta kao" },
          { ja: "散らばったガラスの破片が　昨日の後悔を反射する", en: "Scattered glass shards reflecting every bitter regret of yesterday.", romaji: "Chirabatta garasu no hahen ga, kinou no koukai o hansha suru" },
          { ja: "「これで終わりだ」って　誰が決めた？", en: "'This is the end'—who the hell decided that?", romaji: "'Kore de owari da' tte, dare ga kimeta?" },
          { ja: "精密に狂った不協和音　指先で弾き直してく", en: "Precision-calculated dissonance, tapped back into life with raw fingertips.", romaji: "Seimitsu ni kurutta fukyouwaon, yubisaki de hikinaoshiteku" }
        ]
      },
      {
        tag: { ja: "PRE-CHORUS // Bメロ", en: "PRE-CHORUS // 7/8 SPIRAL" },
        isChorus: false,
        lines: [
          { ja: "7/8の螺旋階段　駆け上がっていく変拍子", en: "Sprinting up a 7/8 spiral staircase, odd-meter heartbeat accelerating.", romaji: "Hachi-bun-no-nana no rasenkaidan, kakeagatte iku henbyoushi" },
          { ja: "タッピングの残響が　夜のコンクリートを叩く", en: "Reverberating two-hand tapping pounding against cold midnight concrete.", romaji: "Tappingu no zankyou ga, yoru no konkuriito o tataku" },
          { ja: "息を止めて、弦を叩け――", en: "Hold your breath, hammer-on the strings—", romaji: "Iki o tomete, gen o tatake—" },
          { ja: "痛みを全部、音に変えて解き放て！", en: "Transmute every ounce of agony into roaring, cathartic sound!", romaji: "Itami o zenbu, oto ni kaete tokihanate!" }
        ]
      },
      {
        tag: { ja: "CHORUS // サビ", en: "CHORUS // RESURGENCE" },
        isChorus: true,
        lines: [
          { ja: "残骸の中から立ち上がれ！ (ZANGAI!)", en: "Rise up from the debris! (ZANGAI!)", romaji: "Zangai no naka kara tachiagare!", highlight: true },
          { ja: "砕け散った夢の破片で　この喉を切り裂いて叫べ！", en: "Cut your throat on the shards of shattered dreams and SCREAM!", romaji: "Kudakechitta yume no hahen de, kono nodo o kirisaite sakebe!", highlight: true },
          { ja: "綺麗じゃなくていい　傷だらけでいい", en: "It doesn't have to be pretty! Be covered in raw battle scars!", romaji: "Kirei ja nakute ii, kizudarake de ii" },
          { ja: "ゼロになった瓦礫の上で　新しい朝を睨みつけろ！", en: "Standing atop the ruins of zero, glare right back into the coming morning!", romaji: "Zero ni natta gareki no ue de, atarashii asa o niramitsukero!", highlight: true }
        ]
      },
      {
        tag: { ja: "VERSE 2 // Aメロ", en: "VERSE 2 // UNDERGROUND" },
        isChorus: false,
        lines: [
          { ja: "地下鉄のホームに響く　無機質なアナウンス", en: "Sterile, mechanical announcements echoing across empty subway platforms.", romaji: "Chikatetsu no hoomu ni hibiku, mukishitsu na anaunsu" },
          { ja: "人混みに押し流されて　消えそうだった自分の声", en: "Shoved around by the Tokyo commute, my voice was about to disappear.", romaji: "Hitogomi ni oshinagasarete, kiesou datta jibun no koe" },
          { ja: "拾い集めた破片は　まだ熱を帯びてる", en: "But the broken shards I gathered up are still burning red-hot!", romaji: "Hiroiatsumeta hahen wa, mada netsu o obiteru" },
          { ja: "捨てちまうには　惜しすぎるガラクタだろ？", en: "Far too precious to throw away as mere junk, don't you think?", romaji: "Sutechimau ni wa, oshisugiru garakuta daro?" }
        ]
      },
      {
        tag: { ja: "PRE-CHORUS // Bメロ", en: "PRE-CHORUS // UNCALCULATED" },
        isChorus: false,
        lines: [
          { ja: "計算通りの未来なんて　蹴り砕いて壊せ", en: "Shatter every safe, predictable future down to dust!", romaji: "Keisandoori no mirai nante, kerikudaite kowase" },
          { ja: "不協和音の中にしか　本当の僕らはいない", en: "The real versions of us only exist inside this dissonance!", romaji: "Fukyouwaon no naka ni shika, hontou no bokura wa inai" },
          { ja: "もう何も恐れるものはない", en: "There is nothing left on this earth to fear!", romaji: "Mou nani mo osoreru mono wa nai" },
          { ja: "ガレキの真ん中で踊り明かせ！", en: "Dance through the night in the very center of the wreckage!", romaji: "Gareki no mannaka de odoriakase!" }
        ]
      },
      {
        tag: { ja: "CHORUS // サビ", en: "CHORUS // FANFARE OF RESURGENCE" },
        isChorus: true,
        lines: [
          { ja: "残骸の中から立ち上がれ！", en: "Rise up from the debris!", romaji: "Zangai no naka kara tachiagare!", highlight: true },
          { ja: "失くしたものばかり数えるな　手の中の摩擦を感じろ！", en: "Stop counting what you lost—feel the friction burning in your palms!", romaji: "Nakushita mono bakari kazoeru na, te no naka no masatsu o kanjiro!", highlight: true },
          { ja: "絶望を燃料にして燃やせ", en: "Burn cold despair as raw high-octane rocket fuel!", romaji: "Zetsubou o nenryou ni shite moyase" },
          { ja: "灰の中から響かせる　僕らの再起のファンファーレ！", en: "Echoing from the ash: our unstoppable fanfare of resurgence!", romaji: "Hai no naka kara hibikaseru, bokura no saiki no fanfaare!", highlight: true }
        ]
      },
      {
        tag: { ja: "BRIDGE // マスロック・タッピング間奏", en: "BRIDGE // COMPLEX TAPPING" },
        isBridge: true,
        lines: [
          { ja: "（高速タッピングソロ // 5/8 ➔ 7/8 ➔ 4/4 展開）", en: "(Rapid two-hand tapping guitar solo // 5/8 ➔ 7/8 ➔ 4/4 shifts)", romaji: "[Kousoku tappingu solo // 5/8 ➔ 7/8 ➔ 4/4 tenkai]" },
          { ja: "壊れたからこそ、もう二度と壊れない。", en: "Because we broke once, we can never, ever be broken again.", romaji: "Kowareta kara koso, mou nido to kowarenai." },
          { ja: "ここからが、僕らの真の始まりだ！", en: "From here on, our true beginning begins!", romaji: "Koko kara ga, bokura no shin no hajimari da!", highlight: true }
        ]
      },
      {
        tag: { ja: "CLIMAX CHORUS // ラスサビ", en: "CLIMAX CHORUS // BLOOD RED SKY" },
        isChorus: true,
        lines: [
          { ja: "残骸を越えて飛び立て！", en: "Leap over the debris and take flight!", romaji: "Zangai o koete tobitate!", highlight: true },
          { ja: "傷口から溢れ出た熱情が　夜空を真っ赤に染める！", en: "The passion spilling from open wounds paints the night sky blood red!", romaji: "Kizuguchi kara afuredeta netsujou ga, yozora o makka ni someru!", highlight: true },
          { ja: "誰にも真似できない　僕らの不完全な証明", en: "Our flawed, irreplaceable proof of living on this earth!", romaji: "Dare ni mo mane dekinai, bokura no fukanzen na shoumei" },
          { ja: "生き残ったこの声で　明日を奪い取れ！", en: "With this surviving voice, tear tomorrow into our hands!", romaji: "Ikinokotta kono koe de, ashita o ubaitore!", highlight: true }
        ]
      },
      {
        tag: { ja: "OUTRO // アウトロ", en: "OUTRO // STILL BREATHING" },
        isChorus: false,
        lines: [
          { ja: "残骸の上に咲いた、消えない火花。", en: "A stubborn spark blooming on top of the rubble that never dies.", romaji: "Zangai no ue ni saita, kienai hibana." },
          { ja: "We survive. We breathe. We scream again.", en: "We survive. We breathe. We scream again.", romaji: "We survive. We breathe. We scream again.", highlight: true }
        ]
      }
    ]
  },
  {
    trackIndex: 2,
    title: "BREAK THE LIMIT#1",
    tempo: "186 BPM • Standard E Tuning • Melodic Skate Punk",
    stanzas: [
      {
        tag: { ja: "VERSE 1 // Aメロ", en: "VERSE 1 // REDLINE" },
        isChorus: false,
        lines: [
          { ja: "リミッターなんて最初から　壊して捨ててきたんだ", en: "We smashed the limiter and threw it away from day one!", romaji: "Rimittaa nante saisho kara, kowashite sutete kitanda" },
          { ja: "針がレッドゾーン振り切って　心臓が追いつかない", en: "The needle redlining past the gauge, heart struggling to keep up.", romaji: "Hari ga reddozoon furikitte, shinzou ga oitsukanai" },
          { ja: "ガレージのシャッター蹴り上げて　鳴り響くドラムロール", en: "Kicking open the garage shutter, snare drum rolling with fury.", romaji: "Gareeji no shattaa keriagete, narihibiku doramu rooru" },
          { ja: "186のビートに背中を押されて　飛び出す街角！", en: "Propelled by a 186 BPM beat, exploding into the Tokyo streets!", romaji: "Hyaku-hachijuu-roku no biito ni senaka o osarete, tobidasu machikado!" }
        ]
      },
      {
        tag: { ja: "PRE-CHORUS // Bメロ", en: "PRE-CHORUS // HEADWIND" },
        isChorus: false,
        lines: [
          { ja: "迷ってる暇なんて一秒もない", en: "Not a single split second to second-guess ourselves!", romaji: "Mayotteru hima nante ichibyou mo nai" },
          { ja: "向かい風を最大の味方につけて", en: "Turn the furious headwind into our greatest weapon!", romaji: "Mukaikaze o saidai no mikata ni tsukete" },
          { ja: "靴紐を固く結び直したら", en: "Tie your laces tight—", romaji: "Kutsuhimo o kataku musubinaoshitara" },
          { ja: "Go! Count 3, 2, 1, JUMP!!", en: "Go! Count 3, 2, 1, JUMP!!", romaji: "Go! Count 3, 2, 1, JUMP!!", highlight: true }
        ]
      },
      {
        tag: { ja: "CHORUS // サビ", en: "CHORUS // BREAK THE LIMIT" },
        isChorus: true,
        lines: [
          { ja: "BREAK THE LIMIT！　限界をブチ破れ！", en: "BREAK THE LIMIT! Smash straight through the ceiling!", romaji: "BREAK THE LIMIT! Genkai o buchiyabure!", highlight: true },
          { ja: "息が止まるほどのスピードで　昨日までの自分を置き去りにしろ！", en: "At a speed that steals your breath, leave yesterday's self far behind!", romaji: "Iki ga tomaru hodo no supiido de, kinou made no jibun o okizari ni shiro!", highlight: true },
          { ja: "泣いてる暇があるなら前を向け", en: "If you have time to weep, you have time to charge ahead!", romaji: "Naiteru hima ga aru nara mae o muke" },
          { ja: "転んでも立ち上がって　笑い飛ばしてやれ！", en: "Even when you hit the pavement, stand right back up and laugh in its face!", romaji: "Korondemo tachiagatte, waraitobashite yare!", highlight: true }
        ]
      },
      {
        tag: { ja: "VERSE 2 // Aメロ", en: "VERSE 2 // YOUTH UNSTOPPABLE" },
        isChorus: false,
        lines: [
          { ja: "すり減ったピックと弦のサビ　汗に濡れたTシャツ", en: "Shredded picks, rusted guitar strings, t-shirts drenched in sweat.", romaji: "Surikireta pikku to gen no sabi, ase ni nureta tiishatsu" },
          { ja: "周りの冷たい視線なんて　風圧で吹き飛んだ", en: "The cynical stares of the crowd got blown away by the air pressure!", romaji: "Mawari no tsumetai shisen nante, fuuatsu de fukitonda" },
          { ja: "「無理だ」って言葉を吐き捨てて　ボリューム全開に回せ", en: "Spit out the word 'impossible' and crank the volume knob to ten!", romaji: "'Muri da' tte kotoba o hakisutete, boryuumu zenkai ni mawase" },
          { ja: "僕らの青春は　誰にも止められない！", en: "Our roaring youth cannot be stopped by any force on earth!", romaji: "Bokura no seishun wa, dare ni mo tomerarenai!" }
        ]
      },
      {
        tag: { ja: "PRE-CHORUS // Bメロ", en: "PRE-CHORUS // SIREN CALL" },
        isChorus: false,
        lines: [
          { ja: "熱くなった真空管アンプが唸りを上げる", en: "Overheated tube amps growling with distortion.", romaji: "Atsuku natta shinkuukan anpu ga unari o ageru" },
          { ja: "高鳴る胸のサイレンが鳴り響く", en: "Sirens in our chest ringing with adrenaline.", romaji: "Takanaru mune no sairen ga narihibiku" },
          { ja: "限界線のその先へ飛び込め", en: "Dive past the finish line into the unknown—", romaji: "Genkaisen no sono saki e tobikome" },
          { ja: "Are you ready to BREAK THROUGH?!", en: "Are you ready to BREAK THROUGH?!", romaji: "Are you ready to BREAK THROUGH?!", highlight: true }
        ]
      },
      {
        tag: { ja: "CHORUS // サビ", en: "CHORUS // HURRICANE SPEED" },
        isChorus: true,
        lines: [
          { ja: "BREAK THE LIMIT！　空を蹴り上げて飛べ！", en: "BREAK THE LIMIT! Kick the sky and take flight!", romaji: "BREAK THE LIMIT! Sora o keriagete tobe!", highlight: true },
          { ja: "誰の指図も受けない　僕らだけのスピードで！", en: "Taking orders from nobody—running at our own reckless speed!", romaji: "Dare no sashizu mo ukenai, bokura dake no supiido de!", highlight: true },
          { ja: "心臓の音が叫び声と重なる瞬間", en: "The instant our heartbeat fuses with our screams,", romaji: "Shinzou no oto ga sakebigoe to kasanaru shunkan" },
          { ja: "世界中を巻き込んで　嵐を巻き起こせ！", en: "Pull the entire universe in and ignite a hurricane!", romaji: "Sekaijuu o makikonde, arashi o makiokose!", highlight: true }
        ]
      },
      {
        tag: { ja: "BRIDGE // メロディックパンク・ブレイクダウン", en: "BRIDGE // SKANK PIT BREAKDOWN" },
        isBridge: true,
        lines: [
          { ja: "（186 BPM 超高速スカンクビート＆コーラス掛け合い）", en: "(186 BPM Hyper-Speed Skank Beat & Gang Vocals)", romaji: "[186 BPM Choukousoku Skank Beat & Chorus Kakeai]" },
          { ja: "Wo-oh-oh! Break it down!", en: "Wo-oh-oh! Break it down!", romaji: "Wo-oh-oh! Break it down!" },
          { ja: "Wo-oh-oh! Never slow down!", en: "Wo-oh-oh! Never slow down!", romaji: "Wo-oh-oh! Never slow down!" },
          { ja: "「限界」なんて誰かの妄想だ！ぶち壊せ！", en: "'Limits' are just someone else's delusion! Smash them!", romaji: "'Genkai' nante dareka no mousou da! Buchikowase!", highlight: true }
        ]
      },
      {
        tag: { ja: "CLIMAX CHORUS // ラスサビ", en: "CLIMAX CHORUS // MAXIMUM HORIZON" },
        isChorus: true,
        lines: [
          { ja: "BREAK THE LIMIT！　もっと先へ、もっと速く！", en: "BREAK THE LIMIT! Further ahead! Even faster!", romaji: "BREAK THE LIMIT! Motto saki e, motto hayaku!", highlight: true },
          { ja: "このスピードの向こう側で　待ってる景色を見に行こう！", en: "Let's see the horizon waiting on the other side of maximum velocity!", romaji: "Kono supiido no mukougawa de, matteru keshiki o mi ni ikou!", highlight: true },
          { ja: "一度きりの命を燃やし尽くせ", en: "Burn this one-and-only life down to embers!", romaji: "Ichidokiri no inochi o moyashitsukuse" },
          { ja: "輝け、誰よりも眩しく！", en: "Shine brighter than anything in the world!", romaji: "Kagayake, dare yori mo mabushiku!", highlight: true }
        ]
      },
      {
        tag: { ja: "OUTRO // アウトロ", en: "OUTRO // NO TURNING BACK" },
        isChorus: false,
        lines: [
          { ja: "Break the limit, no turning back!", en: "Break the limit, no turning back!", romaji: "Break the limit, no turning back!" },
          { ja: "Break the limit, screaming loud!", en: "Break the limit, screaming loud!", romaji: "Break the limit, screaming loud!" },
          { ja: "限界の向こうへ――Go!", en: "Beyond the limit—GO!", romaji: "Genkai no mukou e—Go!", highlight: true }
        ]
      }
    ]
  },
  {
    trackIndex: 3,
    title: "HIBANA",
    tempo: "192 BPM • Drop D Tuning • Double-Bass Hardcore",
    stanzas: [
      {
        tag: { ja: "VERSE 1 // Aメロ", en: "VERSE 1 // 0.1 SECONDS" },
        isChorus: false,
        lines: [
          { ja: "ぶつかり合う視線の熱さ　火花が散る0.1秒", en: "Searing collision of locked gazes—sparks erupting in 0.1 seconds.", romaji: "Butsukariau shisen no atsusa, hibana ga chiru reiten-ichi byou" },
          { ja: "冷たい夜風が切り裂く　剥き出しの感情", en: "Freezing midnight wind slicing through stripped-bare emotions.", romaji: "Tsumetai yokaze ga kirisaku, mukidashi no kanjou" },
          { ja: "言葉なんて飾りはいらない　音階だけで語り合え", en: "We don't need decorative words—speak only in overdrive frequencies!", romaji: "Kotoba nante kazari wa iranai, onkai dake de katariae" },
          { ja: "指先が擦り切れて血が滲んでも　弦を緩めるな！", en: "Even if fingertips shred and bleed, don't you dare loosen that string!", romaji: "Yubisaki ga surikirete chi ga nijindemo, gen o yurumeru na!" }
        ]
      },
      {
        tag: { ja: "PRE-CHORUS // Bメロ", en: "PRE-CHORUS // POWDER KEG" },
        isChorus: false,
        lines: [
          { ja: "ツーバスが地響きを立てて迫る", en: "Double-bass pedals rumbling like a subterranean earthquake.", romaji: "Tsuubasu ga jihibiki o tatete semaru" },
          { ja: "加速していく鼓動のシンコペーション", en: "Accelerating syncopation of a runaway heartbeat.", romaji: "Kasoku shite iku kodou no shinkopeeshon" },
          { ja: "触れ合えば一瞬で燃え上がる導火線", en: "A powder-keg fuse detonating the instant of contact—", romaji: "Fureaeba isshun de moeagaru doukasen" },
          { ja: "一瞬でいい、全部焼き尽くしてしまえ！", en: "Even if it's just for one flash, burn everything to the ground!", romaji: "Isshun de ii, zenbu yakitsukushite shimae!" }
        ]
      },
      {
        tag: { ja: "CHORUS // サビ", en: "CHORUS // ILLUMINATE THE DARK" },
        isChorus: true,
        lines: [
          { ja: "火花を散らせ！ (HIBANA!)　暗闇を照らし出せ！", en: "LET THE SPARKS FLY! (HIBANA!) Illuminate the abyss!", romaji: "Hibana o chirase! Kurayami o terashidase!", highlight: true },
          { ja: "二つの魂が激突する　その閃光で世界を染めろ！", en: "Two souls colliding head-on—dye the world in that blinding flash!", romaji: "Futatsu no tamashii ga gekitotsu suru, sono senkou de sekai o somero!", highlight: true },
          { ja: "窒息しそうな夜を撃ち落とせ", en: "Shoot down this suffocating night!", romaji: "Chissoku shisou na yoru o uchiotose" },
          { ja: "僕らの命が爆ぜる音を聴け！", en: "Listen to the roar of our lives detonating into the sky!", romaji: "Bokura no inochi ga hazeru oto o kike!", highlight: true }
        ]
      },
      {
        tag: { ja: "VERSE 2 // Aメロ", en: "VERSE 2 // MELTING THE BARS" },
        isChorus: false,
        lines: [
          { ja: "冷め切った街並みが　僕らを規格品に閉じ込めようとする", en: "The cynical cityscape tries to lock us into a cookie-cutter mold.", romaji: "Samekitta machinami ga, bokura o kikakuhin ni tojikomeyou to suru" },
          { ja: "そんな檻なんて　摩擦の熱で溶かしてしまえ", en: "Melt those prison bars with the raw heat of our friction!", romaji: "Sonna ori nante, masatsu no netsu de tokashite shimae" },
          { ja: "静寂を切り裂くドラムスネア", en: "Snare drum cracks tearing through the suffocating silence.", romaji: "Seijaku o kirisaku doramu sunea" },
          { ja: "反骨の証を　この胸に深く刻み込め！", en: "Carve the proof of rebellion deep into your chest!", romaji: "Hankotsu no akashi o, kono mune ni fukaku kizamikome!" }
        ]
      },
      {
        tag: { ja: "PRE-CHORUS // Bメロ", en: "PRE-CHORUS // BLUE FIRE" },
        isChorus: false,
        lines: [
          { ja: "ためらいを捨てた瞳に宿る蒼い炎", en: "Blue flames burning in eyes that shed all hesitation.", romaji: "Tamerai o suteta hitomi ni yadoru aoi honoo" },
          { ja: "ギターのハウリングが突撃の合図だ", en: "Howling feedback from the guitar is our charge signal!", romaji: "Gitaa no hauringu ga totsugeki no aizu da" },
          { ja: "爆発する寸前の沈黙を破れ", en: "Shatter the silence on the verge of detonation—", romaji: "Bakuhatsu suru sunzen no chinmoku o yabure" },
          { ja: "いくよ――火をつけろ！！", en: "Here we go—IGNITE!!", romaji: "Iku yo—hi o tsukero!!", highlight: true }
        ]
      },
      {
        tag: { ja: "CHORUS // サビ", en: "CHORUS // ETERNAL TRUTH" },
        isChorus: true,
        lines: [
          { ja: "火花を散らせ！　燃え尽きることを恐れるな！", en: "LET THE SPARKS FLY! Fear no burnout!", romaji: "Hibana o chirase! Moetsukiru koto o osoreru na!", highlight: true },
          { ja: "一瞬の閃光の中にこそ　永遠の真実がある！", en: "Because eternal truth only lives inside that single blinding flash!", romaji: "Isshun no senkou no naka ni koso, eien no shinjitsu ga aru!", highlight: true },
          { ja: "涙も痛みも全部熱量に変えて", en: "Convert every drop of tears and pain into pure thermal power!", romaji: "Namida mo itami mo zenbu netsuryou ni kaete" },
          { ja: "燃え上がれ、星よりも熱く！", en: "Burn up, hotter than any supernova!", romaji: "Moeagare, hoshi yori mo atsuku!", highlight: true }
        ]
      },
      {
        tag: { ja: "BRIDGE // 怒涛のツーバス・ブレイクダウン", en: "BRIDGE // DOUBLE KICK ONSLAUGHT" },
        isBridge: true,
        lines: [
          { ja: "（192 BPM 高速ツーバス連打 // ヘヴィリフ）", en: "(192 BPM Relentless Double-Bass Gallop // Heavy Riff)", romaji: "[192 BPM Kousoku Tsuubasu Renda // Heavy Riff]" },
          { ja: "Spark! Burn! Ignite!", en: "Spark! Burn! Ignite!", romaji: "Spark! Burn! Ignite!" },
          { ja: "摩擦から生まれる剥き出しの衝動", en: "The stripped-bare impulse born from raw friction!", romaji: "Masatsu kara umareru mukidashi no shoudou" },
          { ja: "冷めるくらいなら、今ここで灰になれ！", en: "If you're going to turn cold, turn into ash right here!", romaji: "Sameru kurai nara, ima koko de hai ni nare!", highlight: true }
        ]
      },
      {
        tag: { ja: "CLIMAX CHORUS // ラスサビ", en: "CLIMAX CHORUS // CRIMSON DAWN" },
        isChorus: true,
        lines: [
          { ja: "火花よ、紅蓮の炎となれ！", en: "Sparks, transform into roaring crimson flames!", romaji: "Hibana yo, guren no honoo to nare!", highlight: true },
          { ja: "僕らの叫びが夜空を焦がし　新しい夜明けを引きずり降ろす！", en: "Our roar will scorch the night sky and drag down the new dawn!", romaji: "Bokura no sakebi ga yozora o kogashi, atarashii yoake o hikizuriorosu!", highlight: true },
          { ja: "生きている証をここに刻め", en: "Carve the undeniable proof that we lived right here!", romaji: "Ikite iru akashi o koko ni kizame" },
          { ja: "消えない光を　この胸に宿して走れ！", en: "Carry this unquenchable light in your chest and run!", romaji: "Kienai hikari o, kono mune ni yadoshite hashire!", highlight: true }
        ]
      },
      {
        tag: { ja: "OUTRO // アウトロ", en: "OUTRO // NEVER FADE AWAY" },
        isChorus: false,
        lines: [
          { ja: "Hibana... ignite the dark.", en: "Hibana... ignite the dark.", romaji: "Hibana... ignite the dark." },
          { ja: "Never fade away ♡", en: "Never fade away ♡", romaji: "Never fade away ♡", highlight: true }
        ]
      }
    ]
  },
  {
    trackIndex: 4,
    title: "BREAK THE LIMIT#2",
    tempo: "195 BPM • Drop D Tuning • Post-Hardcore Climax Single ★",
    stanzas: [
      {
        tag: { ja: "VERSE 1 // Aメロ", en: "VERSE 1 // 3:00 AM DESTINY" },
        isChorus: false,
        lines: [
          { ja: "運命の鐘が鳴り響く午前3時", en: "The bells of destiny ringing out through the city at 3:00 AM.", romaji: "Unmei no kane ga narihibiku gozen sanji" },
          { ja: "眠らない街の屋上　風が髪を激しく揺らす", en: "Rooftop overlooking the sleepless city, wild winds whipping our hair.", romaji: "Nemuranai machi no okujou, kaze ga kami o gekishiku yurasu" },
          { ja: "描きかけの未来予想図なんて破り捨てた", en: "Tore up that half-baked roadmap of the future they tried to hand us.", romaji: "Egakikake no mirai yosouzu nante yaburisuteta" },
          { ja: "誰かの作ったシナリオ通りに生きてたまるかよ！", en: "As if we'd ever live our lives according to someone else's script!", romaji: "Dareka no tsukutta shinario doori ni ikite tamaru ka yo!" }
        ]
      },
      {
        tag: { ja: "PRE-CHORUS // Bメロ", en: "PRE-CHORUS // 108 MISSED CALLS" },
        isChorus: false,
        lines: [
          { ja: "モニターの向こう　108件の着信履歴", en: "On the other side of the glowing screen: 108 missed calls from the anime studio desk.", romaji: "Monitaa no mukou, hyaku-hachi-ken no chakushin rireki" },
          { ja: "世界中が僕らを止めようと手を伸ばしてくる", en: "The whole outside world is desperately reaching out to rein us in.", romaji: "Sekaijuu ga bokura o tomeyou to te o nobashite kuru" },
          { ja: "だけどもう届かない　僕らは音速を超えた", en: "Too late—they can't touch us! We already broke past the speed of sound!", romaji: "Dakedo mou todokanai, bokura wa onsoku o koeta" },
          { ja: "合図のスネアが鳴り響く――息を吸い込め！", en: "Snare rolls ringing the launch countdown—take a deep breath!", romaji: "Aizu no sunea ga narihibiku—iki o suikome!" }
        ]
      },
      {
        tag: { ja: "CHORUS // サビ", en: "CHORUS // THE TOEI CLIMAX ANTHEM" },
        isChorus: true,
        lines: [
          { ja: "叫べ！夜を切り裂いて光を掴み取れ！", en: "\"Scream! Tear through the night and seize the light!\"", romaji: "Sakebe! Yoru o kirisaite hikari o tsukamitore!", highlight: true },
          { ja: "BREAK THE LIMIT#2！　限界の向こう側へ！", en: "BREAK THE LIMIT#2! Fly beyond the outermost edge!", romaji: "BREAK THE LIMIT#2! Genkai no mukougawa e!", highlight: true },
          { ja: "傷つくこと恐れずに　胸の火花を解き放て！", en: "Never fearing the wounds, unleash the sparks burning inside your heart!", romaji: "Kizutsuku koto osorezu ni, mune no hibana o tokihanate!", highlight: true },
          { ja: "この声が枯れ果てるまで　歌い続ける僕らのアンセム！", en: "Until this voice completely gives out, our anthem roars into eternity!", romaji: "Kono koe ga karehateru made, utaitsudzukeru bokura no ansemu!", highlight: true }
        ]
      },
      {
        tag: { ja: "VERSE 2 // Aメロ", en: "VERSE 2 // REALITY BEYOND STORYBOARDS" },
        isChorus: false,
        lines: [
          { ja: "擦り切れた指先から　溢れ出すディストーション", en: "Distortion pouring like molten steel from blistered fingertips.", romaji: "Surikireta yubisaki kara, afuredasu disutooshon" },
          { ja: "アニメのクライマックスなんかより　今ここが本番だろ？", en: "Who needs an anime storyboard when reality right here is ten times more intense?", romaji: "Anime no kuraimakkusu nanka yori, ima koko ga honban daro?" },
          { ja: "冷めた大人の言い訳なんて　轟音で掻き消して", en: "Drown out every cynical excuse of adults with a wall of 100-watt sound!", romaji: "Sameta otona no iiwake nante, gouon de kakikeshite" },
          { ja: "4つの鼓動を一つにして　ステージを揺るがせろ！", en: "Lock our four heartbeats into one and shake the foundations of the stage!", romaji: "Yottsu no kodou o hitotsu ni shite, suteeji o yurugasero!" }
        ]
      },
      {
        tag: { ja: "PRE-CHORUS // Bメロ", en: "PRE-CHORUS // HARMONIZED CHILLS" },
        isChorus: false,
        lines: [
          { ja: "息が詰まるほどの圧倒的な緊張感", en: "Tension thick enough to choke on.", romaji: "Iki ga tsumaru hodo no attouteki na kinchoukan" },
          { ja: "ツインギターがハモる瞬間　全身に鳥肌が走る", en: "The millisecond twin guitars harmonize, goosebumps electrify our skin!", romaji: "Tsuin gitaa ga hamoru shunkan, zenshin ni torihada ga hashiru" },
          { ja: "演出抜きの剥き出しのリアルを見せてやる", en: "We're going to show you raw reality with zero special effects!", romaji: "Enshutsu nuki no mukidashi no riaru o misete yaru" },
          { ja: "Ready... Go to the CLIMAX!!", en: "Ready... Go to the CLIMAX!!", romaji: "Ready... Go to the CLIMAX!!", highlight: true }
        ]
      },
      {
        tag: { ja: "CHORUS // サビ", en: "CHORUS // INVINCIBLE MELODY" },
        isChorus: true,
        lines: [
          { ja: "叫べ！夜を切り裂いて光を掴み取れ！", en: "\"Scream! Tear through the night and seize the light!\"", romaji: "Sakebe! Yoru o kirisaite hikari o tsukamitore!", highlight: true },
          { ja: "奇跡なんかに頼るな　自分の手で奪い取れ！", en: "Don't wait for convenient miracles—rip tomorrow into your own hands!", romaji: "Kiseki nanka ni tayoru na, jibun no te de ubaitore!", highlight: true },
          { ja: "倒れそうになっても　僕らは絶対に膝をつかない！", en: "Even when our knees buckle, we will NEVER hit the floor!", romaji: "Taoresou ni nattemo, bokura wa zettai ni hiza o tsukanai!", highlight: true },
          { ja: "涙の数だけ強くなった　無敵のメロディを響かせろ！", en: "We grew stronger with every tear we cried—let this invincible melody roar!", romaji: "Namida no kazu dake tsuyoku natta, muteki no merodi o hibikasero!", highlight: true }
        ]
      },
      {
        tag: { ja: "BRIDGE // 劇伴級クライマックス・ブレイクダウン", en: "BRIDGE // FINALE BATTLE SOLO" },
        isBridge: true,
        lines: [
          { ja: "（東映アニメ最終話クライマックス戦闘シーン用 激闘ギターソロ）", en: "(Toei Animation Season Finale Climax Duel // Emotional Guitar Solo)", romaji: "[Toei Anime Saishuuwa Climax Sentou Scene-you Gekitou Guitar Solo]" },
          { ja: "聞こえるか？僕らの心臓の咆哮が。", en: "Can you hear it? The ferocious roar of our beating hearts!", romaji: "Kikoeru ka? Bokura no shinzou no houkou ga." },
          { ja: "100回の失敗だって、この1秒のためにあったんだ！", en: "Even a hundred bitter failures were just the price of admission for this one second!", romaji: "Hyak-kai no shippai datte, kono ichibyou no tame ni attanda!" },
          { ja: "全ての感情をサビに叩き込め！いくぞ――ラスサビ！！", en: "Slam every ounce of human emotion into this chorus! HERE WE GO—CLIMAX!!", romaji: "Subete no kanjou o sabi ni tatakikome! Iku zo—rasusabi!!", highlight: true }
        ]
      },
      {
        tag: { ja: "CLIMAX CHORUS // 怒涛の大サビ", en: "CLIMAX CHORUS // UNENDING DREAM" },
        isChorus: true,
        lines: [
          { ja: "叫べ！宇宙の果てまで届くように！", en: "SCREAM! Loud enough to reach the edge of the cosmos!", romaji: "Sakebe! Uchuu no hate made todoku you ni!", highlight: true },
          { ja: "BREAK THE LIMIT#2！　僕らが生きている証だ！", en: "BREAK THE LIMIT#2! Our undeniable proof of being alive!", romaji: "BREAK THE LIMIT#2! Bokura ga ikite iru akashi da!", highlight: true },
          { ja: "朝焼けが渋谷の空を茜色に染めていく", en: "Crimson sunrise dyeing the Shibuya skyline in blinding dawn!", romaji: "Asayake ga Shibuya no sora o akaneiro ni somete iku" },
          { ja: "終わらない夢の続きを　この歌と共に駆け抜けろ！", en: "Sprint through the unending dream with this anthem leading the charge!", romaji: "Owaranai yume no tsudzuki o, kono uta to tomo ni kakenukero!", highlight: true }
        ]
      },
      {
        tag: { ja: "OUTRO // アウトロ", en: "OUTRO // FOREVER CLIMAX" },
        isChorus: false,
        lines: [
          { ja: "Scream! Tear through the night and seize the light!", en: "Scream! Tear through the night and seize the light!", romaji: "Scream! Tear through the night and seize the light!", highlight: true },
          { ja: "Break the limit, higher and higher!", en: "Break the limit, higher and higher!", romaji: "Break the limit, higher and higher!" },
          { ja: "✧XE・PON♡✧ will never die ♡", en: "✧XE・PON♡✧ will never die ♡", romaji: "✧XE・PON♡✧ will never die ♡", highlight: true }
        ]
      }
    ]
  }
];

/**
 * ==========================================================================
 * 2.2 PHOTO GALLERY DATA (For Lightbox & Miniature)
 * ==========================================================================
 */
const GALLERY_PHOTOS = [
  {
    index: 0,
    src: "assets/arcade-follow.jpg",
    title: "AKIHABARA GIGO // ROOFTOP RUNNERS",
    location: "Akihabara GiGO Arcade, Tokyo",
    caption: "✧XE・PON♡✧ navigating the neon canyons and electric rooftops of Akihabara."
  },
  {
    index: 1,
    src: "assets/street-eating.png",
    title: "SHIBUYA STREET CORNER // MIDNIGHT NOODLES",
    location: "Shibuya Dogenzaka, Tokyo",
    caption: "Late-night ramen and street food session after exhausting 4-hour live rehearsal."
  },
  {
    index: 2,
    src: "assets/band-collage.jpg",
    title: "STUDIO SESSIONS // REHEARSAL BREAK",
    location: "Shinjuku Underground Studio, Tokyo",
    caption: "Analog gear, distorted pedals, and post-hardcore friction."
  },
  {
    index: 3,
    src: "assets/street-food.jpg",
    title: "SHIMOKITAZAWA LIVEHOUSE // BACKSTAGE",
    location: "Shimokitazawa Club 251, Tokyo",
    caption: "Pre-show adrenaline rush before headlining the Tokyo underground circuit."
  },
  {
    index: 4,
    src: "assets/toei-missed-calls.png",
    title: "TOEI ANIMATION // 108+ MISSED CALLS",
    location: "Shibuya Center-Gai & Don Quijote, Tokyo",
    caption: "The infamous night Toei Animation's producers couldn't reach ✧XE・PON♡✧ during studio rehearsal."
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

  // Volume controls (slider & mute toggle)
  const volSlider = document.getElementById('vol-slider');
  const volBtn = document.getElementById('vol-btn');

  // Set default initial volume to 0.8
  audioEl.volume = 0.8;
  if (volSlider) volSlider.value = 0.8;

  function updateVolIcon(vol) {
    if (!volBtn) return;
    if (vol === 0) {
      volBtn.textContent = '🔇';
      volBtn.setAttribute('title', 'Unmute');
      volBtn.setAttribute('aria-label', 'Unmute');
    } else if (vol < 0.5) {
      volBtn.textContent = '🔉';
      volBtn.setAttribute('title', 'Mute');
      volBtn.setAttribute('aria-label', 'Mute');
    } else {
      volBtn.textContent = '🔊';
      volBtn.setAttribute('title', 'Mute');
      volBtn.setAttribute('aria-label', 'Mute');
    }
  }

  if (volSlider) {
    volSlider.addEventListener('input', (e) => {
      const v = parseFloat(e.target.value);
      audioEl.volume = v;
      updateVolIcon(v);
    });
  }

  if (volBtn) {
    volBtn.addEventListener('click', () => {
      if (audioEl.volume > 0) {
        audioEl.dataset.prevVol = audioEl.volume;
        audioEl.volume = 0;
        if (volSlider) volSlider.value = 0;
        updateVolIcon(0);
      } else {
        const prev = parseFloat(audioEl.dataset.prevVol || '0.8');
        audioEl.volume = prev;
        if (volSlider) volSlider.value = prev;
        updateVolIcon(prev);
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

  // Synchronize modal play button if open
  const modalPlayBtn = document.getElementById('modal-play-btn');
  if (modalPlayBtn) {
    const isThisModalTrackPlaying = (currentModalTrackIdx === currentTrackIdx && isPlaying);
    modalPlayBtn.innerHTML = `
      <span class="btn-icon">${isThisModalTrackPlaying ? '⏸' : '▶'}</span>
      <span>${isThisModalTrackPlaying ? (dict.modal_btn_pause || 'PAUSE') : (dict.modal_btn_play || 'PLAY THIS TRACK')}</span>
    `;
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
      <div class="showcase-card-img" title="Click to view full photo / open miniature" style="cursor:pointer;">
        <img src="${data.image}" alt="${data.imageAlt}" />
        <span class="img-tag">${data.tag}</span>
        <div class="photo-expand-overlay">
          <span class="expand-icon">🔍</span>
          <span class="expand-text">${dict.tip_open_miniature || 'OPEN IN MINIATURE'}</span>
        </div>
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

  // Bind showcase image to picture viewer
  const imgWrap = card.querySelector('.showcase-card-img');
  if (imgWrap) {
    imgWrap.addEventListener('click', () => {
      const mapIdx = [0, 2, 3, 0, 4];
      openPictureModal(mapIdx[idx] || 0);
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
        <button class="btn-lyrics-inline" data-track-idx="${i}" title="${dict.tip_lyrics || 'View Full Lyrics'}">📜 ${dict.btn_lyrics_short || 'LYRICS'}</button>
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

    // Inline lyrics button
    const inlineLyricsBtn = row.querySelector('.btn-lyrics-inline');
    if (inlineLyricsBtn) {
      inlineLyricsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openLyricsModal(i);
      });
    }

    // Row click selects and toggles
    row.addEventListener('click', (e) => {
      if (e.target.closest('.btn-phase-inline') || e.target.closest('.btn-lyrics-inline')) return;
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
    openBtn.addEventListener('click', () => openLyricsModal(currentShowcaseIdx !== undefined ? currentShowcaseIdx : currentTrackIdx));
  }

  const closeBtn = document.getElementById('modal-close-btn');
  const closeBtn2 = document.getElementById('modal-close-btn-2');
  if (closeBtn) closeBtn.addEventListener('click', closeLyricsModal);
  if (closeBtn2) closeBtn2.addEventListener('click', closeLyricsModal);

  // Top navigation buttons
  const prevTrackBtn = document.getElementById('modal-prev-track-btn');
  const nextTrackBtn = document.getElementById('modal-next-track-btn');
  if (prevTrackBtn) {
    prevTrackBtn.addEventListener('click', () => {
      const prevIdx = (currentModalTrackIdx + XE_PON_TRACKS.length - 1) % XE_PON_TRACKS.length;
      renderModalLyrics(prevIdx);
    });
  }
  if (nextTrackBtn) {
    nextTrackBtn.addEventListener('click', () => {
      const nextIdx = (currentModalTrackIdx + 1) % XE_PON_TRACKS.length;
      renderModalLyrics(nextIdx);
    });
  }

  // Modal play button
  const modalPlayBtn = document.getElementById('modal-play-btn');
  if (modalPlayBtn) {
    modalPlayBtn.addEventListener('click', () => {
      if (currentTrackIdx === currentModalTrackIdx && isPlaying) {
        pauseAudio();
      } else {
        switchTrack(currentModalTrackIdx, true);
      }
      renderModalLyrics(currentModalTrackIdx);
    });
  }

  // Floating dock lyrics button
  const playerLyricsBtn = document.getElementById('player-lyrics-btn');
  if (playerLyricsBtn) {
    playerLyricsBtn.addEventListener('click', () => {
      openLyricsModal(currentTrackIdx);
    });
  }

  // Close on overlay click
  const overlay = document.getElementById('lyrics-modal');
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeLyricsModal();
    });
  }

  // Keyboard navigation when lyrics modal is open
  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('lyrics-modal');
    if (modal && modal.classList.contains('is-open')) {
      if (e.key === 'Escape') {
        closeLyricsModal();
      } else if (e.key === 'ArrowLeft') {
        const prevIdx = (currentModalTrackIdx + XE_PON_TRACKS.length - 1) % XE_PON_TRACKS.length;
        renderModalLyrics(prevIdx);
      } else if (e.key === 'ArrowRight') {
        const nextIdx = (currentModalTrackIdx + 1) % XE_PON_TRACKS.length;
        renderModalLyrics(nextIdx);
      }
    }
  });
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
  currentModalTrackIdx = idx;
  const body = document.getElementById('modal-lyrics-body');
  if (!body) return;
  const data = XE_PON_SHOWCASE[idx];
  const lyricsData = XE_PON_LYRICS[idx];
  const track = XE_PON_TRACKS[idx];
  if (!data || !lyricsData) return;
  const dict = I18N[currentLang] || I18N.en;

  // Header counter
  const counterEl = document.getElementById('modal-track-counter');
  if (counterEl) counterEl.textContent = `${String(idx + 1).padStart(2, '0')} / 05`;

  // Footer play button
  const modalPlayBtn = document.getElementById('modal-play-btn');
  if (modalPlayBtn) {
    const isThisTrackPlaying = (idx === currentTrackIdx && isPlaying);
    modalPlayBtn.innerHTML = `
      <span class="btn-icon">${isThisTrackPlaying ? '⏸' : '▶'}</span>
      <span>${isThisTrackPlaying ? (dict.modal_btn_pause || 'PAUSE') : (dict.modal_btn_play || 'PLAY THIS TRACK')}</span>
    `;
  }

  // Footer phase link
  const modalPhaseLink = document.getElementById('modal-phase-link');
  if (modalPhaseLink && track) {
    modalPhaseLink.href = track.phaseUrl;
  }

  // Track pills HTML
  const pillsHtml = XE_PON_TRACKS.map((t, i) => `
    <button class="modal-track-pill${i === idx ? ' is-active' : ''}" data-pill-idx="${i}">
      ${String(i + 1).padStart(2, '0')} ${t.title}
    </button>
  `).join('');

  // Stanzas HTML according to currentLyricsViewMode ('ja', 'en', 'both')
  let stanzasHtml = '';

  if (currentLyricsViewMode === 'both') {
    // Side by Side View
    stanzasHtml = `
      <div class="lyrics-side-by-side">
        <div class="lyrics-col-ja">
          <div class="lyrics-col-header">🇯🇵 日本語 (ORIGINAL LYRICS)</div>
          <div class="lyrics-stanzas-wrap">
            ${lyricsData.stanzas.map(s => `
              <div class="lyric-stanza${s.isChorus ? ' is-chorus' : ''}${s.isBridge ? ' is-bridge' : ''}">
                <span class="lyric-section-tag">${s.tag.ja}</span>
                <div class="lyric-stanza-lines">
                  ${s.lines.map(l => `
                    <div class="lyric-line-ja${l.highlight ? ' lyric-line-highlight' : ''}">${l.ja}</div>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="lyrics-col-en">
          <div class="lyrics-col-header">🌐 ENGLISH & ROMAJI (TRANSLATION)</div>
          <div class="lyrics-stanzas-wrap">
            ${lyricsData.stanzas.map(s => `
              <div class="lyric-stanza${s.isChorus ? ' is-chorus' : ''}${s.isBridge ? ' is-bridge' : ''}">
                <span class="lyric-section-tag">${s.tag.en}</span>
                <div class="lyric-stanza-lines">
                  ${s.lines.map(l => `
                    <div class="lyric-pair-row">
                      <div class="lyric-line-en${l.highlight ? ' lyric-line-highlight' : ''}">${l.en}</div>
                      <div class="lyric-line-en" style="font-size:0.75rem;opacity:0.75;">${l.romaji}</div>
                    </div>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  } else if (currentLyricsViewMode === 'en') {
    // English & Romaji
    stanzasHtml = `
      <div class="lyrics-stanzas-wrap">
        ${lyricsData.stanzas.map(s => `
          <div class="lyric-stanza${s.isChorus ? ' is-chorus' : ''}${s.isBridge ? ' is-bridge' : ''}">
            <span class="lyric-section-tag">${s.tag.en}</span>
            <div class="lyric-stanza-lines">
              ${s.lines.map(l => `
                <div class="lyric-pair-row">
                  <div class="lyric-line-en${l.highlight ? ' lyric-line-highlight' : ''}">${l.en}</div>
                  <div class="lyric-line-en" style="font-size:0.78rem;opacity:0.8;">Romaji: ${l.romaji}</div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } else {
    // Japanese Original (with English subtitle lines)
    stanzasHtml = `
      <div class="lyrics-stanzas-wrap">
        ${lyricsData.stanzas.map(s => `
          <div class="lyric-stanza${s.isChorus ? ' is-chorus' : ''}${s.isBridge ? ' is-bridge' : ''}">
            <span class="lyric-section-tag">${s.tag.ja}</span>
            <div class="lyric-stanza-lines">
              ${s.lines.map(l => `
                <div class="lyric-pair-row">
                  <div class="lyric-line-ja${l.highlight ? ' lyric-line-highlight' : ''}">${l.ja}</div>
                  <div class="lyric-line-en">${l.en}</div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  body.innerHTML = `
    <div class="modal-track-banner">
      <span class="modal-track-num-badge">TRACK ${String(idx + 1).padStart(2, '0')} // OFFICIAL FULL LYRICS</span>
      <h3 class="modal-track-title">${data.title}</h3>
      <div class="modal-track-specs">
        <span>${data.subtitle[currentLang] || data.subtitle.en}</span>
        <span class="modal-track-specs-sep">•</span>
        <span>${lyricsData.tempo}</span>
        <span class="modal-track-specs-sep">•</span>
        <span>Duration: ${track.duration}</span>
      </div>
      <div class="showcase-genres" style="margin-bottom:0;">
        ${data.genres.map(g => `<span class="genre-tag ${g.cls}">${g.text}</span>`).join('')}
      </div>
    </div>

    <!-- Song Selector Pills -->
    <div class="modal-track-pills">
      ${pillsHtml}
    </div>

    <!-- Lyrics View Tabs -->
    <div class="lyrics-view-tabs">
      <button class="lyrics-tab-btn${currentLyricsViewMode === 'ja' ? ' is-active' : ''}" data-view-mode="ja">
        ${dict.tab_original_ja || '🇯🇵 日本語 (Original)'}
      </button>
      <button class="lyrics-tab-btn${currentLyricsViewMode === 'en' ? ' is-active' : ''}" data-view-mode="en">
        ${dict.tab_romaji_en || '🌐 Romaji & English'}
      </button>
      <button class="lyrics-tab-btn${currentLyricsViewMode === 'both' ? ' is-active' : ''}" data-view-mode="both">
        ${dict.tab_side_by_side || '⚡ Side-by-Side'}
      </button>
    </div>

    <!-- Full Lyrics Stanzas -->
    ${stanzasHtml}

    <!-- Collapsible Editorial & Production Notes -->
    <div class="modal-editorial-accordion" id="modal-editorial-accordion">
      <button class="editorial-accordion-header" id="editorial-accordion-header">
        <span>${dict.notes_toggle_open || '▼ VIEW TRACK NOTES & PRODUCTION DETAILS'}</span>
        <span class="editorial-accordion-arrow">▼</span>
      </button>
      <div class="editorial-accordion-body">
        <div style="font-weight:700;color:var(--pink);margin-bottom:6px;">${data.editorialHeader[currentLang] || data.editorialHeader.en}</div>
        <p style="margin-bottom:12px;">${data.editorialBody[currentLang] || data.editorialBody.en}</p>
        <div style="font-size:0.75rem;color:var(--text-dark-muted);margin-bottom:6px;">📍 <strong>Location:</strong> ${data.location[currentLang] || data.location.en}</div>
        <div class="showcase-lyric-quote" style="margin-top:10px;">
          <div class="showcase-lyric-tag">${data.lyricTag[currentLang] || data.lyricTag.en}</div>
          <p class="showcase-lyric-text" style="font-size:0.85rem;">${data.lyricQuote[currentLang] || data.lyricQuote.en}</p>
        </div>
      </div>
    </div>
  `;

  // Bind pill clicks
  body.querySelectorAll('.modal-track-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const pIdx = parseInt(pill.getAttribute('data-pill-idx'), 10);
      renderModalLyrics(pIdx);
    });
  });

  // Bind tab clicks
  body.querySelectorAll('.lyrics-tab-btn').forEach(tab => {
    tab.addEventListener('click', () => {
      const mode = tab.getAttribute('data-view-mode');
      currentLyricsViewMode = mode;
      renderModalLyrics(currentModalTrackIdx);
    });
  });

  // Bind editorial accordion
  const accHeader = body.querySelector('#editorial-accordion-header');
  const accCard = body.querySelector('#modal-editorial-accordion');
  if (accHeader && accCard) {
    accHeader.addEventListener('click', () => {
      accCard.classList.toggle('is-open');
    });
  }
}

/**
 * ==========================================================================
 * 8. PICTURE VIEWER & MINIATURE DOCK
 * ==========================================================================
 */
function initPictureViewer() {
  const modal = document.getElementById('picture-modal');
  const miniViewer = document.getElementById('picture-mini-viewer');
  const minimizeBtn = document.getElementById('picture-minimize-btn');
  const footerMinimizeBtn = document.getElementById('picture-footer-minimize-btn');
  const closeBtn = document.getElementById('picture-close-btn');
  const footerClose = document.getElementById('picture-footer-close-btn');
  const backdrop = document.getElementById('picture-backdrop');
  const prevBtn = document.getElementById('picture-prev-btn');
  const nextBtn = document.getElementById('picture-next-btn');
  const miniExpandBtn = document.getElementById('mini-viewer-expand-btn');
  const miniCloseBtn = document.getElementById('mini-viewer-close-btn');
  const miniStage = document.getElementById('mini-viewer-stage');

  if (minimizeBtn) minimizeBtn.addEventListener('click', minimizePictureViewer);
  if (footerMinimizeBtn) footerMinimizeBtn.addEventListener('click', minimizePictureViewer);
  if (closeBtn) closeBtn.addEventListener('click', closePictureModal);
  if (footerClose) footerClose.addEventListener('click', closePictureModal);
  if (backdrop) backdrop.addEventListener('click', closePictureModal);
  if (prevBtn) prevBtn.addEventListener('click', prevPicture);
  if (nextBtn) nextBtn.addEventListener('click', nextPicture);
  if (miniExpandBtn) miniExpandBtn.addEventListener('click', expandPictureViewer);
  if (miniCloseBtn) miniCloseBtn.addEventListener('click', closeMiniViewer);
  if (miniStage) miniStage.addEventListener('click', expandPictureViewer);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (modal && modal.classList.contains('is-open')) {
      if (e.key === 'Escape') closePictureModal();
      else if (e.key === 'ArrowLeft') prevPicture();
      else if (e.key === 'ArrowRight') nextPicture();
      else if (e.key.toLowerCase() === 'm') minimizePictureViewer();
    } else if (miniViewer && miniViewer.classList.contains('is-active')) {
      if (e.key === 'Escape') closeMiniViewer();
      else if (e.key.toLowerCase() === 'm') expandPictureViewer();
    }
  });

  // Wire up all gallery elements
  document.querySelectorAll('[data-gallery-idx]').forEach(el => {
    const idx = parseInt(el.getAttribute('data-gallery-idx') || '0', 10);
    el.addEventListener('click', (e) => {
      // Avoid click collision if clicking buttons or links inside
      if (e.target.closest('a, button')) return;
      openPictureModal(idx);
    });
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openPictureModal(idx);
      }
    });
  });
}

function openPictureModal(idx) {
  if (idx < 0) idx = GALLERY_PHOTOS.length - 1;
  if (idx >= GALLERY_PHOTOS.length) idx = 0;
  currentPicIdx = idx;

  const modal = document.getElementById('picture-modal');
  const miniViewer = document.getElementById('picture-mini-viewer');
  if (miniViewer) miniViewer.classList.remove('is-active');

  renderPictureContent(idx);

  if (modal) {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

function renderPictureContent(idx) {
  const photo = GALLERY_PHOTOS[idx];
  if (!photo) return;

  const img = document.getElementById('picture-modal-img');
  const title = document.getElementById('picture-modal-title');
  const loc = document.getElementById('picture-modal-loc');
  const caption = document.getElementById('picture-modal-caption');
  const counter = document.getElementById('picture-counter');
  const miniImg = document.getElementById('mini-viewer-img');
  const miniTitle = document.getElementById('mini-viewer-title');

  if (img) {
    img.src = photo.src;
    img.alt = photo.title;
  }
  if (title) title.textContent = photo.title;
  if (loc) loc.textContent = photo.location;
  if (caption) caption.textContent = photo.caption;
  if (counter) counter.textContent = `PHOTO ${String(idx + 1).padStart(2, '0')} / ${String(GALLERY_PHOTOS.length).padStart(2, '0')}`;

  if (miniImg) miniImg.src = photo.src;
  if (miniTitle) miniTitle.textContent = `${photo.title} [MINIATURE]`;
}

function closePictureModal() {
  const modal = document.getElementById('picture-modal');
  if (modal) {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

function minimizePictureViewer() {
  closePictureModal();
  const miniViewer = document.getElementById('picture-mini-viewer');
  if (miniViewer) {
    miniViewer.classList.add('is-active');
    miniViewer.setAttribute('aria-hidden', 'false');
  }
}

function expandPictureViewer() {
  const miniViewer = document.getElementById('picture-mini-viewer');
  if (miniViewer) {
    miniViewer.classList.remove('is-active');
    miniViewer.setAttribute('aria-hidden', 'true');
  }
  openPictureModal(currentPicIdx);
}

function closeMiniViewer() {
  const miniViewer = document.getElementById('picture-mini-viewer');
  if (miniViewer) {
    miniViewer.classList.remove('is-active');
    miniViewer.setAttribute('aria-hidden', 'true');
  }
}

function prevPicture() {
  let nextIdx = currentPicIdx - 1;
  if (nextIdx < 0) nextIdx = GALLERY_PHOTOS.length - 1;
  openPictureModal(nextIdx);
}

function nextPicture() {
  let nextIdx = currentPicIdx + 1;
  if (nextIdx >= GALLERY_PHOTOS.length) nextIdx = 0;
  openPictureModal(nextIdx);
}

/**
 * ==========================================================================
 * 9. LANGUAGE SWITCHER (EN / JA)
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
 * 10. MOBILE NAV
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
 * 11. SCROLL NAVIGATION HIGHLIGHT
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
 * 12. SCROLL REVEAL ANIMATION
 * ==========================================================================
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    '.section-header-block, .showcase-container, .playlist-card, .chat-window, .disco-layout, .photo-grid, .toei-photo-card'
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
 * 12. DYNAMIC AUTO-UPDATING COPYRIGHT RULE
 * ==========================================================================
 * Automatically calculates and binds the current year dynamically
 * so the website copyright footer never stays on an outdated year.
 */
function initCopyrightYear() {
  const currentYear = new Date().getFullYear();
  const copyEl = document.getElementById('copyright-year');
  if (copyEl) {
    copyEl.textContent = currentYear;
  }
  document.querySelectorAll('.auto-copyright-year').forEach(el => {
    el.textContent = currentYear;
  });
}

/**
 * ==========================================================================
 * INITIALIZATION ON DOM READY
 * ==========================================================================
 */
document.addEventListener('DOMContentLoaded', () => {
  initCopyrightYear();
  initAudioEngine();
  initTrackShowcase();
  initPlaylist();
  initLyricsModal();
  initPictureViewer();
  initLanguageSwitcher();
  initSparkleCanvas();
  initMobileNav();
  initScrollNav();
  initScrollReveal();
});
