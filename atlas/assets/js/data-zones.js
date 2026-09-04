/* ============================================================
   Shared-territory zones.
   When two or more peoples collapse into one marker, the panel
   explains WHY they share that ground and what separates them.
   ============================================================ */
window.ZONES = {
  ili: {
    name: "The Ili Valley & Dzungaria",
    note: "The only gap in the mountain wall between Central Asia and China, and so the most layered piece of ground in the country. Kazakh and Mongol herders hold the high summer pasture; Uyghur, Hui and Uzbek farmers and traders hold the irrigated valley floor; the Xibe were marched here from Manchuria in 1764 as a garrison and never left; Russians and Tatars arrived as merchants and refugees across the Qing and Soviet borders. What divides them here is altitude and trade, not distance — the same valley, stacked."
  },
  tarim: {
    name: "The Tarim Rim",
    note: "Nobody lives in the Taklamakan; everybody lives on its edge. Uyghur oasis towns sit on the alluvial fans where mountain meltwater reaches the sand, strung out along the old northern and southern Silk Roads. Kyrgyz and Tajik herders occupy the mountain rim above them, Mongol groups the eastern grasslands, Han settlers the newer state farms. The desert is the divider — these communities are neighbours on a map and days apart on the ground."
  },
  pamir: {
    name: "The Pamir Knot",
    note: "At Tashkurgan the Pamir, Karakoram, Kunlun and Tian Shan meet. Two quite different Iranian-speaking peoples are both filed as 'Tajik' here — Sarikoli in the central valleys, Wakhi along the Wakhan corridor — and Kyrgyz herders graze the plateau above both. The split is by valley system and by altitude: irrigated barley terraces below, yak and sheep pasture above 3,500 m, with ridges rather than borders keeping the languages apart."
  },
  hexi: {
    name: "The Hexi Corridor",
    note: "A thousand-kilometre strip of oasis between the Qilian snows and the Gobi — the only practical road from China proper to Central Asia. Everyone who ever used that road left people behind. Two Yugur peoples speaking unrelated languages, Turkic and Mongolic, live in the same county on opposite sides of a mountain spur; Amdo Tibetan and Mongol herders work the Qilian pastures; Hui and Han hold the towns. The corridor concentrates and the Qilian range divides."
  },
  gansuqinghai: {
    name: "The Gansu–Qinghai Corridor",
    note: "The seam where the Tibetan plateau, the Mongolian steppe and the Chinese loess country all meet, and the densest cluster of small peoples in China. Dongxiang, Bonan and Salar are all Muslim but speak, respectively, a Mongolic, a Mongolic and a Turkic language; the Tu speak two mutually unintelligible Mongolic tongues and are Buddhist; Amdo Tibetans hold the grassland above and Hui the market towns below. Religion divides some, altitude others, and the Yellow River gorge at Xunhua divides the rest."
  },
  hulunbuir: {
    name: "Hulunbuir & the Greater Khingan",
    note: "The Khingan range is the wall between forest and steppe, and it sorted these peoples. West of it: open grassland, Barga and Buryat Mongols, and Solon Ewenki on horseback. East and north: dense larch taiga, Oroqen hunters and the Aoluguya Ewenki with their reindeer. Daur farmers took the river bottoms in between. Same prefecture, three completely different ways of getting food."
  },
  amur: {
    name: "The Amur–Ussuri Confluence",
    note: "Fishing country. The Hezhen (Nanai) built their year around the salmon and sturgeon runs rather than around herds or fields, which set them apart from every Tungusic neighbour. Manchu, Han and — since the 1860s — Korean farmers occupy the surrounding plain. The rivers themselves are the organising line, and since 1860 an international border runs down the middle of them."
  },
  changbai: {
    name: "The Changbai Range & Yanbian",
    note: "Korea's sacred mountain sits on the border, and the Korean-Chinese communities of Yanbian are the descendants of farmers who crossed it from the 1860s through the Japanese occupation. Manchu villages, the Qing dynasty's own homeland, lie to the west; the mountain forest between them was for two centuries a closed imperial preserve, which is precisely why the two groups stayed distinct."
  },
  liangshan: {
    name: "The Liangshan Massif",
    note: "A textbook altitude split. Nuosu Yi clans hold the cold high country above roughly 2,000 m, growing buckwheat and potatoes and keeping their own caste order and script; Han farmers hold the hot river valleys of the Anning and Jinsha below. The two economies barely overlapped before the 1950s, and the boundary between them is a contour line, not a river or a road."
  },
  hengduan: {
    name: "The Hengduan Corridor",
    note: "Anthropologists call this the 'ethnic corridor of the Tibetan–Yi passage': a set of parallel north–south gorges that funnelled peoples down out of the plateau over two thousand years and then kept them apart. Qiang, Kham Tibetan, Pumi, Naxi and Mosuo all sit in adjacent valleys of the Min, Yalong and Jinsha rivers. Ridges of 5,000 m separate valleys an hour apart as the crow flies."
  },
  nujiang: {
    name: "The Three Parallel Rivers",
    note: "The Nu, Lancang and Jinsha run within 70 km of each other, walled off by the Gaoligong and Biluo ranges. The result is the most vertically stratified ethnic map in China: Lisu on the mid-slopes, Nu on the upper Nujiang, Derung alone over the pass in the Dulong valley, Tibetans at the northern head of the gorge, Bai and Han at the southern mouth. People a day's walk apart cannot understand one another."
  },
  dehong: {
    name: "The Dehong Valleys",
    note: "Classic mainland Southeast Asian 'vertical ethnicity'. Tai-speaking Dai hold the flat, malarial, wet-rice valley floors and the market towns; Jingpo hold the ridges above them; De'ang, Achang and Lisu occupy the intermediate slopes. The division is by elevation band and crop — irrigated paddy below, swidden and tea above — and it produced centuries of tributary relations between hill and valley rather than simple separation."
  },
  banna: {
    name: "Xishuangbanna",
    note: "The same valley-and-hill logic as Dehong, in a Theravada Buddhist key. Tai Lue princes ruled the paddy basins from Jinghong; Akha (Hani), Blang, Lahu and Jino cleared and farmed the forested hills above, supplying tea, cotton and labour to the valley courts. Blang, De'ang and Va are Austroasiatic and were almost certainly there first; the Tai arrived later and took the flat ground."
  },
  qiandongnan: {
    name: "Southeast Guizhou",
    note: "Miao and Dong villages sit within a few kilometres of each other across this whole prefecture yet remain sharply distinct. Dong settled the river valleys and lower terraces — hence the drum towers and wind-and-rain bridges over water — while Miao took the steeper ridges above. Language separates them completely: Hmong-Mien on the ridge, Tai-Kadai in the valley."
  },
  guangxi: {
    name: "The Guangxi Karst",
    note: "Limestone country broken into thousands of small basins, each one a pocket that a community could hold. Zhuang farm the fertile basin floors; Yao and Miao took the poorer karst slopes; and the tiny Maonan, Mulao and Gelao populations survive in single-county pockets precisely because the terrain made them hard to reach and hard to absorb."
  },
  yundian: {
    name: "The Central Yunnan Plateau",
    note: "The old core of the Nanzhao and Dali kingdoms. Bai hold the lake basins around Erhai, Yi the surrounding hills, Hui the caravan towns along the routes to Burma and Tibet, Naxi the Lijiang plain to the north. This was a trading crossroads long before it was a Chinese province, and the mix reflects routes rather than any single migration."
  },
  tibet: {
    name: "The Tibetan Plateau",
    note: "'Tibetan' is one official category covering peoples whose dialects are not mutually intelligible and whose lives are structured differently: Ü-Tsang farmers of the central valleys, Amdo herders of the northeastern grassland, Kham traders and warriors of the eastern gorges, and Changtang drokpa nomads of the western high desert. Distance, altitude and the old political division between Lhasa's rule and independent eastern polities keep them apart."
  },
  himalaya: {
    name: "The Eastern Himalayan Slope",
    note: "Below the plateau rim the land falls into subtropical forest, and the peoples change with it. Monba and Lhoba live on the monsoon-facing southern slopes of the Himalaya in and around the Yarlung Tsangpo gorge, along with unrecognised groups such as the Deng and Sherpa. The plateau edge itself is the divide: Buddhist barley farmers above, forest cultivators below."
  },
  hainan: {
    name: "Hainan",
    note: "An island layered by arrival. Li, Tai-Kadai speakers, have been in the central highlands for some three thousand years; Miao arrived as Ming-era soldiers and settled the eastern hills; and the Utsul of Sanya are Cham refugees from Vietnam, Austronesian-speaking and Muslim, who are counted as Hui despite sharing neither language nor origin with the Hui of the northwest."
  },
  taiwan: {
    name: "Taiwan",
    note: "'Gaoshan' is a single mainland census label for at least sixteen distinct Austronesian peoples, recognised separately in Taiwan itself, who between them represent the deepest linguistic diversity in the entire Austronesian family — the family's likely homeland. Amis on the eastern coastal plain, Atayal in the northern mountains, Paiwan and Rukai in the south. Mountains and river systems, not one culture."
  },
  wuling: {
    name: "The Wuling Mountains",
    note: "Where Hunan, Hubei, Guizhou and Chongqing meet — rugged enough to shelter Tujia and Miao communities through centuries of expansion from the plains, and close enough to the Chinese heartland that both have long been bilingual. The border zone itself is what preserved them."
  }
};
