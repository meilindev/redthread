/* ============================================================
   EARTH MAP — the physical frame.
   Nearly every division on the ethnic map is one of these:
   a range, a gorge, a desert or a plateau rim.
   type: range | river | water | dry | land
   ============================================================ */
window.GEO = [

/* ---------------- RANGES ---------------- */
{
  id:"himalaya", type:"range", name:"Himalaya", alt:"ཧི་མ་ལ་ཡ · the abode of snow",
  stat:"2,400 km · Everest 8,849 m",
  path:[[27.6,88.6],[28.0,86.9],[28.4,85.2],[28.8,83.8],[29.6,81.5],[30.4,79.6],[31.4,78.3],[32.6,77.1],[33.9,76.2]],
  sum:"The wall between the Tibetan plateau and the Indian subcontinent, and the sharpest ecological line in Asia.",
  detail:"North of the crest: cold, dry, barley and yak at 4,000 m. South of it: monsoon forest, rice and maize. The peoples change with the vegetation. Monba and Lhoba live on the wet southern slope and were never absorbed into the Tibetan monastic order that governs the plateau above them; Sherpa communities straddle the passes. Almost every trans-Himalayan people is defined by which side of this line their fields are on.",
  divides:["tibetan-utsang","monba","lhoba","sherpa","tibetan-changtang"]
},
{
  id:"karakoram", type:"range", name:"Karakoram", alt:"K2 · Qogir",
  stat:"500 km · K2 8,611 m",
  path:[[35.9,76.0],[35.9,76.5],[35.5,77.3],[35.0,78.0],[34.4,78.6]],
  sum:"The most heavily glaciated range outside the poles, and the hardest crossing on the old routes between the Tarim and India.",
  detail:"The Karakoram Pass at 5,540 m carried the Yarkand–Ladakh trade for centuries, moving Central Asian goods to Kashmir at a cost in pack animals that travellers described in numbers of skeletons per mile. The modern Karakoram Highway crosses further west at Khunjerab, through Tajik country at Tashkurgan.",
  divides:["tajik-sarikoli","tajik-wakhi","uyghur"]
},
{
  id:"kunlun", type:"range", name:"Kunlun Shan", alt:"ཀུན་ལུན · the mythic range",
  stat:"3,000 km · Kongur 7,649 m",
  path:[[36.4,75.4],[36.2,78.0],[35.8,81.0],[35.5,85.0],[35.7,88.5],[36.0,91.5],[36.3,94.5],[36.6,98.0]],
  sum:"The northern rim of the Tibetan plateau and the southern wall of the Taklamakan — the longest range in Asia and the least visited.",
  detail:"Every oasis on the southern Silk Road — Hotan, Keriya, Cherchen — exists because a Kunlun river reaches the sand before evaporating. The range is the reason those oases are strung in a line rather than scattered: the water comes off the mountains at fixed points. Hotan jade, traded to China for three thousand years, comes out of Kunlun riverbeds.",
  divides:["uyghur","tibetan-changtang"]
},
{
  id:"tianshan", type:"range", name:"Tian Shan", alt:"تەڭرى تاغ · Tengri Tagh, the mountains of heaven",
  stat:"2,500 km · Jengish Chokusu 7,439 m",
  path:[[42.4,76.0],[42.9,79.0],[43.2,82.5],[43.3,85.5],[43.1,88.5],[42.8,91.0],[42.3,94.0]],
  sum:"The range that splits Xinjiang in two — Dzungaria to the north, the Tarim to the south — and holds the pastures both depend on.",
  detail:"Kazakh and Kyrgyz herders take flocks to Tian Shan summer grazing above 2,500 m while Uyghur farmers work the irrigated fans below; the same mountain supports two completely different economies at different altitudes. The range also splits the climate: Dzungaria gets Atlantic moisture, the Tarim gets almost none, which is why one is steppe and the other is the second-largest sand desert on earth.",
  divides:["kazakh","kyrgyz","uyghur","mongol-oirat","xibe"]
},
{
  id:"altai", type:"range", name:"Altai", alt:"Алтай · the golden mountains",
  stat:"2,000 km · Belukha 4,506 m",
  path:[[49.2,86.8],[48.5,87.8],[47.7,89.2],[46.8,90.6],[45.9,91.8]],
  sum:"Where China, Mongolia, Russia and Kazakhstan meet — larch forest, alpine pasture, and the last golden-eagle falconers.",
  detail:"The Altai is the northern limit of Kazakh settlement in China and the wettest part of Xinjiang, with real forest rather than oasis scrub. Eagle hunting for fox and hare survives here, along with four-season transhumance in which a household may move its herds two hundred kilometres a year between valley winter shelter and high summer grazing.",
  divides:["kazakh","mongol-oirat","russian"]
},
{
  id:"pamir", type:"range", name:"The Pamirs", alt:"Bam-i-Dunya · the roof of the world",
  stat:"Kongur 7,649 m · plateau above 4,000 m",
  path:[[38.9,73.8],[38.2,74.6],[37.6,75.1],[37.0,75.4],[36.5,75.8]],
  sum:"The knot where the Tian Shan, Kunlun, Karakoram and Hindu Kush all meet, and the last stronghold of the Eastern Iranian languages.",
  detail:"Two unrelated Pamir languages — Sarikoli and Wakhi — survive in adjacent valleys here, both classified in China as 'Tajik', with Kyrgyz herders on the plateau above them. Altitude does the sorting: irrigated barley terraces below 3,500 m, yak and sheep pasture above. Tashkurgan, the stone tower of the classical accounts, sat at the hinge of the whole Silk Road system.",
  divides:["tajik-sarikoli","tajik-wakhi","kyrgyz"]
},
{
  id:"qilian", type:"range", name:"Qilian Shan", alt:"ཏི་ཤི · Nan Shan, the southern mountains",
  stat:"800 km · Kangze'gyai 5,808 m",
  path:[[39.5,95.5],[39.0,97.5],[38.4,99.5],[37.9,101.5],[37.3,103.2]],
  sum:"The snowfence that makes the Hexi Corridor possible: every oasis on the road to Central Asia drinks Qilian meltwater.",
  detail:"The corridor between these mountains and the Gobi is the only practical route from China proper to the west, and everyone who used it left people behind. A single spur of the Qilian separates the Turkic-speaking Yugur from the Mongolic-speaking Yugur, who share one county, one religion and no common language. Amdo Tibetan and Mongol herders hold the high pasture above the corridor towns.",
  divides:["yugur-turkic","yugur-mongolic","tibetan-amdo","hui-northwest"]
},
{
  id:"hengduan", type:"range", name:"Hengduan Shan", alt:"横断山 · the ranges that cut across",
  stat:"Gongga 7,556 m · gorges 3,000 m deep",
  path:[[33.0,99.2],[31.5,99.4],[30.0,99.3],[28.5,99.2],[27.0,99.3],[25.5,99.6],[24.5,99.8]],
  sum:"Where the great rivers of Asia are squeezed into parallel north–south gorges — and the peoples with them.",
  detail:"Anthropologists call this the Tibetan–Yi corridor. Ranges running north to south funnelled populations down off the plateau over two thousand years and then sealed them into separate valleys. Qiang, Kham Tibetan, Pumi, Naxi, Mosuo, Lisu, Nu and Derung are all products of that funnel. Valleys an hour apart in a straight line are days apart on foot, and their languages are correspondingly unlike.",
  divides:["qiang","pumi","naxi","mosuo","tibetan-kham","yi-nuosu"]
},
{
  id:"gaoligong", type:"range", name:"Gaoligong Shan", alt:"高黎贡山",
  stat:"600 km · up to 5,128 m",
  path:[[28.3,98.5],[27.4,98.6],[26.4,98.7],[25.4,98.8],[24.4,98.7]],
  sum:"The wall between the Nujiang and the Dulong valley — and the reason the Derung are a separate people at all.",
  detail:"Seven thousand people live in the Dulong valley on the far side of this range, reachable until 1999 only by a footpath over a 3,900 m pass closed by snow half the year. That single ridge is why Derung is a distinct language and why facial tattooing survived there into living memory. The range is also one of the richest biodiversity hotspots in the temperate world.",
  divides:["derung","nu-anong","lisu","nu-nusu"]
},
{
  id:"biluo", type:"range", name:"Biluo Snow Mountain", alt:"碧罗雪山",
  stat:"separates the Nu from the Lancang",
  path:[[28.2,99.0],[27.2,99.1],[26.2,99.2],[25.2,99.4]],
  sum:"The second wall of the Three Parallel Rivers, holding the Nujiang apart from the Lancang.",
  detail:"Between the Gaoligong and the Biluo lies a gorge 3,000 m deep and often less than 20 km wide, containing Lisu villages on the mid-slopes and Nu villages above them. Crossing from one river to the next means a two-day climb. The vertical stacking of peoples here is the most extreme in China.",
  divides:["lisu","nu-nusu","nu-anong","tibetan-kham"]
},
{
  id:"greater-khingan", type:"range", name:"Greater Khingan", alt:"ᠶᠡᠬᠡ ᠬᠢᠩᠭᠠᠨ · Da Hinggan",
  stat:"1,200 km · larch taiga",
  path:[[53.2,122.5],[51.5,123.0],[49.5,122.3],[47.5,121.2],[45.5,119.8],[44.0,118.5]],
  sum:"The line between forest and steppe, and the single most decisive divide in the peopling of the northeast.",
  detail:"West of this range: open grassland, Barga and Buryat Mongols, Solon Ewenki on horseback, herds. East and north: dense larch forest, Oroqen hunters, and the Aoluguya Ewenki with the only domesticated reindeer in China. Two peoples in the same census category, an hour apart, living in different worlds because of one ridge.",
  divides:["ewenki-solon","ewenki-reindeer","oroqen","mongol-barga","daur"]
},
{
  id:"changbai", type:"range", name:"Changbai / Paektu", alt:"백두산 · ᡤᠣᠯᠮᡳᠨ ᡧᠠᠩᡤᡳᠶᠠᠨ ᠠᠯᡳᠨ",
  stat:"Heaven Lake at 2,189 m",
  path:[[42.9,128.6],[42.0,128.1],[41.4,127.0],[41.0,126.0]],
  sum:"A sacred mountain to Koreans and the Manchu origin myth's birthplace, sitting exactly on the modern border.",
  detail:"The Qing declared the whole range a closed imperial preserve, the dynasty's ancestral homeland, and kept Han settlement out for two centuries — which is why Manchu and Korean communities on either side stayed distinct into the modern era. When the closure lapsed in the 1860s, Korean farmers crossed the Tumen into what became Yanbian, and Han migration into Manchuria began in earnest.",
  divides:["korean","manchu"]
},
{
  id:"qinling", type:"range", name:"Qinling", alt:"秦岭 — China's true dividing line",
  stat:"Taibai 3,767 m",
  path:[[34.3,105.8],[34.0,107.5],[33.8,109.5],[33.6,111.3],[33.4,112.5]],
  sum:"The wheat/rice, north/south, dry/wet boundary of China proper — climatically more important than the Yangtze.",
  detail:"North of the Qinling: wheat, millet, kang beds, dry winters. South: rice paddy, no central heating by law, subtropical damp. The range blocks the winter monsoon and marks the 0°C January isotherm. It is also the giant panda's last refuge and the wall behind which the Han heartland formed.",
  divides:["han","hui-northwest"]
},
{
  id:"taihang", type:"range", name:"Taihang", alt:"太行山",
  stat:"400 km · the loess edge",
  path:[[39.9,113.8],[38.5,113.4],[37.0,113.4],[35.8,113.2],[35.1,112.8]],
  sum:"The step between the loess plateau and the North China Plain — a wall of cliffs that shaped every invasion route into the heartland.",
  detail:"The Taihang separates Shanxi's high, dry, coal-bearing plateau from the flat wheat country of Hebei and Henan, and the handful of passes through it — Jingxing above all — decided the outcome of campaigns from the Warring States to the 1940s.",
  divides:["han"]
},
{
  id:"wuling", type:"range", name:"Wuling Mountains", alt:"武陵山",
  stat:"quartzite pillars up to 1,200 m",
  path:[[30.2,109.3],[29.4,109.8],[28.6,109.7],[27.8,109.3]],
  sum:"The four-province refuge where Tujia and Miao communities survived centuries of expansion from the plains.",
  detail:"Where Hunan, Hubei, Guizhou and Chongqing meet, the terrain is broken enough to shelter communities from administration and close enough to the heartland that they became bilingual early. Zhangjiajie's sandstone towers are the tourist face of it; the Tujia and Miao villages in the folds behind are the reason the region is an autonomous prefecture.",
  divides:["tujia","miao-hmu"]
},
{
  id:"nanling", type:"range", name:"Nanling", alt:"南岭 · the five ridges",
  stat:"the gate to Lingnan",
  path:[[25.6,110.8],[25.4,112.5],[25.0,114.0],[24.7,115.5]],
  sum:"The barrier between the Yangtze basin and the far south, and the frontier of Chinese expansion for a thousand years.",
  detail:"Qin armies cut canals through these ridges in 214 BCE to reach the Pearl River; everything south of the line — Cantonese, Zhuang, Yao — developed on the far side of that barrier. Yao communities still occupy the ridges themselves, having taken the high ground that Han settlement in the valleys left alone.",
  divides:["zhuang","yao-mien","she","han"]
},
{
  id:"tanggula", type:"range", name:"Tanggula", alt:"དང་ལ · the plateau's own crest",
  stat:"6,621 m · the Yangtze's source",
  path:[[33.4,90.5],[33.0,92.0],[32.6,93.5],[32.3,95.0]],
  sum:"The watershed of the plateau interior, dividing the Changtang's closed lake basins from the rivers that reach the sea.",
  detail:"North of the Tanggula, water has nowhere to go: the Changtang is a basin of salt lakes with no outlet, which is why it supports herders and no farmers at all. South of it, the Yangtze, Mekong and Salween begin their descent. The Qinghai–Tibet railway crosses at 5,072 m, the highest railway in the world.",
  divides:["tibetan-changtang","tibetan-amdo","tibetan-kham"]
},

/* ---------------- RIVERS ---------------- */
{
  id:"huanghe", type:"river", name:"Yellow River", alt:"黄河 · Huang He · rMa chu",
  stat:"5,464 km · China's second longest",
  path:[[34.9,96.2],[35.0,98.6],[35.6,100.9],[35.9,102.6],[36.1,103.8],[37.5,105.2],[38.9,106.4],[40.4,107.5],[40.7,110.5],[39.5,110.6],[37.5,110.4],[35.6,110.5],[34.9,113.6],[35.9,116.4],[37.4,118.4]],
  sum:"The river that made Chinese civilisation, carrying more silt than any other river on earth.",
  detail:"It rises on the Tibetan plateau in Amdo — where Tibetans call it the rMa chu — loops north around the Ordos through Mongol pasture, cuts the loess plateau and picks up the yellow sediment that names it, then crosses the North China Plain on a bed raised above the surrounding fields by its own deposits. The Salar of Xunhua live in its gorge; the Hui of Ningxia farm its northern bend.",
  divides:["han","hui-northwest","salar","tibetan-amdo","mongol-inner"]
},
{
  id:"changjiang", type:"river", name:"Yangtze", alt:"长江 · Chang Jiang · 'Zhi chu",
  stat:"6,300 km · the third longest on earth",
  path:[[33.5,91.2],[32.8,94.5],[31.0,97.5],[29.0,98.8],[27.4,99.9],[26.9,100.2],[27.8,101.6],[28.6,104.0],[29.6,106.6],[30.9,111.3],[30.5,114.3],[31.0,117.5],[31.4,121.5]],
  sum:"From the Tanggula ice to Shanghai — and in its upper gorges, one of the walls of the Hengduan corridor.",
  detail:"In its upper reach it is the Jinsha, the river of golden sand, running south through the Hengduan gorges beside the Mekong and Salween before making the sharp turn north at Shigu that sends it east across China. Naxi, Mosuo and Yi territory sits in that bend. Downstream it becomes the artery of Han China — Chongqing, Wuhan, Nanjing, Shanghai.",
  divides:["naxi","mosuo","yi-nuosu","tibetan-kham","han"]
},
{
  id:"lancang", type:"river", name:"Lancang / Mekong", alt:"澜沧江 · rDza chu · Mekong",
  stat:"4,900 km · six countries",
  path:[[33.2,94.5],[31.5,96.8],[29.5,98.2],[27.5,98.9],[25.5,99.6],[23.5,100.3],[22.0,100.8],[21.2,101.2]],
  sum:"The middle river of the Three Parallel Rivers, and downstream the artery of the Tai world.",
  detail:"In Tibet it is the rDza chu, in Yunnan the Lancang, in Laos and Cambodia the Mekong. Where it broadens in Xishuangbanna it becomes the axis of the Tai Lue kingdom of Sipsongpanna, with wet-rice basins along the banks and Akha, Blang and Lahu villages in the hills above. Chinese dams on the upper river are a standing regional political issue.",
  divides:["dai-lue","hani","blang","lahu","jino","tibetan-kham"]
},
{
  id:"nujiang", type:"river", name:"Nujiang / Salween", alt:"怒江 · rGyal mo rngul chu · Thanlwin",
  stat:"3,289 km · Asia's longest free-flowing river",
  path:[[32.2,91.8],[30.5,95.5],[28.8,97.8],[27.2,98.7],[25.8,98.9],[24.3,98.7],[23.0,97.9]],
  sum:"A 300 km gorge between two 4,000-metre walls, holding the most vertically stratified population in China.",
  detail:"The Nujiang runs so tightly between the Gaoligong and Biluo ranges that villages face each other across a river they cannot easily cross; rope bridges and cable crossings were standard into this century. Lisu hold the mid-slopes, Nu the upper valley, Derung the far side of the western wall, Tibetans the northern head. The proposed thirteen-dam cascade was shelved in 2016, leaving it the last major undammed river in the region.",
  divides:["lisu","nu-nusu","nu-anong","derung","tibetan-kham","deang"]
},
{
  id:"yarlung", type:"river", name:"Yarlung Tsangpo", alt:"ཡར་ཀླུངས་གཙང་པོ · Brahmaputra",
  stat:"2,900 km · the deepest canyon on earth",
  path:[[30.6,82.2],[29.9,85.0],[29.3,88.4],[29.3,91.0],[29.2,93.5],[29.7,95.0],[29.1,95.4],[28.2,95.4]],
  sum:"The valley in which the Tibetan state was born, ending in a canyon deeper than anything in the Americas.",
  detail:"The Yarlung valley held the kings who unified Tibet in the 7th century, and its irrigated barley terraces still carry most of central Tibet's farming population. At Namcha Barwa the river turns through a hairpin and falls 2,000 m into a gorge that until 2013 could only be reached on foot — the Monba and Lhoba country of Medog. Below it, in India, it becomes the Brahmaputra.",
  divides:["tibetan-utsang","monba","lhoba","deng"]
},
{
  id:"heilongjiang", type:"river", name:"Amur / Heilongjiang", alt:"黑龙江 · ᠰᠠᡥᠠᠯᡳᠶᠠᠨ ᡠᠯᠠ · Амур",
  stat:"2,824 km · an international border since 1858",
  path:[[53.3,121.0],[52.8,123.5],[51.5,125.5],[50.0,127.4],[48.8,130.5],[48.4,134.5],[48.3,135.0]],
  sum:"The great fishing river of the northeast — and the line along which a whole set of peoples were cut in two.",
  detail:"The Hezhen built their year around its salmon and sturgeon runs. Daur, Solon Ewenki and Oroqen all lived on or near it before the Qing pulled them south in the 1650s to escape Russian raiding. The treaties of 1858 and 1860 moved the border to the river itself, leaving the larger part of the Nanai, Evenki and other populations on the Russian side.",
  divides:["hezhen","daur","ewenki-solon","oroqen","russian"]
},
{
  id:"songhua", type:"river", name:"Songhua", alt:"松花江 · ᠰᡠᠩᡤᠠᡵᡳ ᡠᠯᠠ",
  stat:"1,927 km",
  path:[[42.0,127.9],[43.5,126.8],[45.0,126.5],[45.8,126.6],[46.4,129.5],[47.3,132.0],[47.7,132.5]],
  sum:"The Manchu homeland's main river, running from Changbai out across the northeastern plain.",
  detail:"Jurchen and then Manchu power formed along this river system; Nurhaci's unification of the tribes in the 1580s and 90s happened in its upper basin. Today it is the axis of Heilongjiang's grain belt and of Harbin, the city Russian railway engineers built in 1898.",
  divides:["manchu","hezhen","korean","han"]
},
{
  id:"tarim", type:"river", name:"Tarim", alt:"تارىم دەرياسى",
  stat:"1,321 km · ends in the sand",
  path:[[40.6,78.6],[40.9,80.5],[41.0,82.5],[40.9,85.0],[40.6,87.5],[40.3,88.4]],
  sum:"A river with no sea: it runs east along the desert's northern edge and evaporates.",
  detail:"Fed by the Kunlun, Pamir and Tian Shan, the Tarim once reached Lop Nor, the wandering lake that dried up in the 1970s after upstream irrigation took the water. Its poplar galleries are the only forest in the basin. The oasis chain along it carried the northern Silk Road, and the Loplik fishing communities on its lower course were among the last people to live directly off the river.",
  divides:["uyghur"]
},
{
  id:"ili", type:"river", name:"Ili", alt:"ىلى دەرياسى · Іле",
  stat:"1,439 km · flows out of China",
  path:[[43.3,82.5],[43.7,81.6],[43.9,81.0],[44.1,80.2],[44.5,79.0]],
  sum:"The one river in Xinjiang that runs west, watering the valley that is the only easy gate between China and Central Asia.",
  detail:"The Ili valley catches Atlantic moisture that reaches nowhere else in Xinjiang, making it green where the rest of the region is desert or steppe. That is why it holds Kazakh pasture, Uyghur and Hui farms, Xibe garrison villages founded in 1764, Russians, Tatars and Uzbeks in one prefecture. It drains into Lake Balkhash in Kazakhstan.",
  divides:["kazakh","xibe","uyghur","russian","tatar","uzbek","mongol-oirat"]
},
{
  id:"zhujiang", type:"river", name:"Pearl / Xi River", alt:"珠江 · 西江",
  stat:"2,400 km",
  path:[[23.6,104.5],[23.4,106.5],[23.5,108.5],[23.6,110.5],[23.3,112.3],[23.1,113.3]],
  sum:"The artery of the Zhuang south and, at its mouth, of the modern Chinese economy.",
  detail:"The Xi and its tributaries drain the Guangxi karst, and Zhuang settlement follows the basin floors along them. Qin canal-building linked this system to the Yangtze in 214 BCE, opening the south to incorporation. At the delta the same river system now carries Guangzhou, Shenzhen and Hong Kong.",
  divides:["zhuang","yao-mien","han","mulao","maonan"]
},
{
  id:"yuanjiang", type:"river", name:"Red River / Yuan", alt:"元江 · Sông Hồng",
  stat:"1,149 km · to Hanoi",
  path:[[25.0,101.5],[24.2,102.5],[23.4,103.4],[22.5,103.9],[21.8,104.5]],
  sum:"The corridor from Yunnan to the Gulf of Tonkin, and the axis of the Hani terraces.",
  detail:"The Honghe Hani terraces fall from the ridge forest to this river in thousands of steps, a system built over thirteen centuries. The valley is also the historic road between Yunnan and Vietnam — the French built a railway along it in 1910 — and Hmong and Yao migration into Indochina followed the same line.",
  divides:["hani","yi-nasu","miao-hmong","yao-mien","jing"]
},
{
  id:"dulongjiang", type:"river", name:"Dulong / Irrawaddy headwater", alt:"独龙江 · Nmai Hka",
  stat:"a single valley, 7,000 people",
  path:[[28.6,98.3],[28.0,98.3],[27.4,98.3],[26.8,98.4]],
  sum:"One valley, one people, one road finished in 1999.",
  detail:"The Derung valley drains west into the Irrawaddy rather than east into the Nujiang, which places it in a different watershed and, for most of history, a different world. Snow closed the only pass for half of every year until a tunnel opened in 2014. It is the clearest case in China of a single landform producing a single ethnicity.",
  divides:["derung","nu-anong"]
},

/* ---------------- LAKES & SEAS ---------------- */
{
  id:"qinghai-lake", type:"water", name:"Qinghai Lake", alt:"མཚོ་སྔོན་པོ · Kokonor · the blue sea",
  stat:"4,300 km² · 3,205 m · salt", at:[36.90,100.20],
  sum:"China's largest lake, a saline inland sea on the Amdo grassland with no outlet.",
  detail:"Kokonor gives Qinghai province its name and sits at the meeting point of the Tibetan, Mongol and Chinese worlds. Mongol Khoshut power was based on its shores in the 17th century, and Amdo Tibetan herders still bring flocks to the surrounding grassland. Bird Island on its western shore is a major migration stop for bar-headed geese crossing the Himalaya.",
  divides:["tibetan-amdo","mongol-oirat","hui-northwest","tu-mongghul"]
},
{
  id:"lugu", type:"water", name:"Lugu Lake", alt:"泸沽湖 · Mother Lake",
  stat:"48 km² · 2,690 m", at:[27.72,100.81],
  sum:"The lake on the Yunnan–Sichuan border around which the matrilineal Mosuo live — and where one people is split between two nationalities by a provincial line drawn through the water.",
  detail:"The boundary runs through the lake, and it is the reason the same Na-speaking people are registered as Naxi on the Yunnan shore and as Mongol on the Sichuan one. Pumi villages sit among the Mosuo ones all around Ninglang: the two peoples are neighbours rather than rivals, intermarry, and share much of the ritual world of the daba and hangui priests, but they speak different Qiangic and Naish languages and are counted separately. Gemu, the mountain above the lake, is worshipped as a goddess. The lake's isolation until the 1990s is much of the reason the matrilineal household survived intact — and the tourism that arrived with the road is now the main pressure on it.",
  divides:["mosuo","pumi","naxi","yi-nuosu"]
},
{
  id:"erhai", type:"water", name:"Erhai", alt:"洱海 · the ear-shaped sea",
  stat:"250 km² · 1,972 m", at:[25.78,100.18],
  sum:"The lake basin that held the Nanzhao and Dali kingdoms for five centuries.",
  detail:"A flat, fertile, well-watered basin between the Cangshan range and the lake — the best agricultural ground in western Yunnan, and therefore the seat of every state that ruled the southwest before the Mongol conquest of 1253. Bai villages ring it, with their whitewashed courtyard houses and painted gable walls.",
  divides:["bai","yi-nasu","hui-yunnan"]
},
{
  id:"bosten", type:"water", name:"Bosten Lake", alt:"باغراش كۆلى · Bagrash Köl",
  stat:"1,000 km² · China's largest inland freshwater lake", at:[41.95,87.05],
  sum:"A freshwater lake in the desert, and the centre of Oirat Mongol settlement in Xinjiang.",
  detail:"Fed by the Kaidu river out of the Tian Shan, Bosten supports reed beds, fisheries and the irrigated farmland around Korla. The Torghut Mongols who completed the migration from the Volga in 1771 were settled in this basin, and Bayingolin prefecture is named for the grassland to its north.",
  divides:["mongol-oirat","uyghur","hui-northwest"]
},
{
  id:"namtso", type:"water", name:"Namtso", alt:"གནམ་མཚོ · the heavenly lake",
  stat:"2,000 km² · 4,718 m", at:[30.72,90.60],
  sum:"One of the three great sacred lakes of Tibet, on the edge of the northern nomad country.",
  detail:"Namtso lies at the southern rim of the Changtang, where the barley-farming valleys give out and pure pastoralism begins. Pilgrims circumambulate it in the Year of the Sheep; drokpa households graze yak on the plain around it at nearly 4,700 m.",
  divides:["tibetan-changtang","tibetan-utsang"]
},
{
  id:"manasarovar", type:"water", name:"Manasarovar & Kailash", alt:"མ་ཕམ་གཡུ་མཚོ · གངས་རིན་པོ་ཆེ",
  stat:"lake 4,590 m · peak 6,638 m", at:[30.85,81.35],
  sum:"Sacred to Buddhists, Hindus, Jains and Bonpo alike — and the source region of four great rivers.",
  detail:"The Indus, Sutlej, Karnali and Yarlung Tsangpo all rise within a hundred kilometres of Mount Kailash. The Zhangzhung kingdom, associated with the pre-Buddhist Bon religion, was centred here, and the later Guge kingdom built Tsaparang nearby. It remains one of the most important pilgrimage destinations in Asia.",
  divides:["tibetan-changtang"]
},
{
  id:"hulun", type:"water", name:"Hulun Lake", alt:"ᠬᠥᠯᠥᠨ ᠨᠠᠭᠤᠷ · Dalai Nur",
  stat:"2,300 km² · steppe lake", at:[48.95,117.40],
  sum:"The lake that names the Hulunbuir grassland — the best-preserved open steppe in East Asia.",
  detail:"The Mongol tribes that Genghis Khan unified pastured here, and the Qing later settled Barga banners and Solon Ewenki around it as frontier garrisons. Buryat refugees from the Russian Civil War were granted grazing nearby in the 1920s. The lake has shrunk substantially since 2000 with drought and upstream extraction.",
  divides:["mongol-barga","ewenki-solon","daur","oroqen"]
},
{
  id:"heaven-lake", type:"water", name:"Heaven Lake (Paektu)", alt:"천지 · 天池 · Tianchi",
  stat:"crater lake at 2,189 m", at:[42.01,128.06],
  sum:"The crater lake on the Chinese–North Korean border, sacred in both Korean and Manchu tradition.",
  detail:"The volcano erupted catastrophically around 946 CE in one of the largest eruptions of the last two millennia. Korean foundation myth places Dangun's origin here; Manchu myth places the birth of the Aisin Gioro ancestor at its foot. The border runs across the water.",
  divides:["korean","manchu"]
},
{
  id:"sayram", type:"water", name:"Sayram Lake", alt:"سايرام كۆلى",
  stat:"460 km² · 2,073 m", at:[44.60,81.20],
  sum:"An alpine lake in the Tian Shan on the pass into the Ili valley — the last stop on the steppe road.",
  detail:"The lake sits directly on the historic route from Dzungaria into Ili, used by Mongol armies, Qing garrisons and modern highways alike. Kazakh herders graze its shores in summer, and the surrounding pasture is among the most photographed in Xinjiang.",
  divides:["kazakh","mongol-oirat"]
},
{
  id:"poyang", type:"water", name:"Poyang & Dongting", alt:"鄱阳湖 · 洞庭湖",
  stat:"China's two largest freshwater lakes", at:[29.20,116.10],
  sum:"The Yangtze's flood reservoirs, and the wintering ground for most of the world's Siberian cranes.",
  detail:"Both lakes swell and shrink enormously between the monsoon and the dry season, and both have shrunk overall since the Three Gorges Dam altered the river's regime. They sit at the heart of the densest rice-farming population in China.",
  divides:["han","she"]
},

/* ---------------- DESERTS & DRY BASINS ---------------- */
{
  id:"taklamakan", type:"dry", name:"Taklamakan", alt:"تەكلىماكان قۇملۇقى",
  stat:"337,000 km² · the second-largest shifting-sand desert", at:[38.80,82.50],
  sum:"The void at the centre of the Tarim basin — the reason the oases are a ring rather than a region.",
  detail:"Nobody lives in it; everybody lives around its edge, where mountain meltwater reaches the sand. That single fact produced the two Silk Roads, northern and southern, and the string of Uyghur oasis cities on both. Buried Buddhist and Tocharian sites under the dunes were recovered by expeditions from the 1890s onward, along with the desiccated Tarim mummies.",
  divides:["uyghur"]
},
{
  id:"gobi", type:"dry", name:"Gobi", alt:"ᠭᠣᠪᠢ · the waterless place",
  stat:"1,300,000 km² · gravel, not sand", at:[42.50,105.00],
  sum:"The steppe's dry heart, and for two thousand years the barrier between the Chinese and Mongol worlds.",
  detail:"Mostly gravel plain rather than dune, the Gobi is crossable but hungry, and the ability to move armies and herds across it defined the history of the northern frontier. The Great Wall lines were drawn along its southern approaches. Inner and Outer Mongolia are, in the end, the two sides of this desert.",
  divides:["mongol-inner","han","hui-northwest"]
},
{
  id:"turpan", type:"dry", name:"Turpan Depression", alt:"تۇرپان ئويمانلىقى",
  stat:"−154 m · the lowest point in China", at:[42.72,89.30],
  sum:"The hottest place in China, farmed with underground channels to stop the water evaporating.",
  detail:"Turpan's karez system — hundreds of kilometres of hand-dug tunnels tapping the water table at the mountain foot and carrying it underground to the fields — makes grapes and melons possible at 48°C. The basin held the Uyghur Buddhist kingdom of Qocho and its Manichaean and Nestorian communities before Islamisation.",
  divides:["uyghur","hui-northwest"]
},
{
  id:"qaidam", type:"dry", name:"Qaidam Basin", alt:"ཚྭ་འདམ · the salt marsh",
  stat:"120,000 km² · 2,700 m", at:[37.00,95.00],
  sum:"A high, cold salt basin between the Kunlun and the Qilian — potash, lithium and almost no people.",
  detail:"The Qaidam is one of the emptiest inhabited basins in Asia, historically crossed by Mongol and Tibetan herders and the caravan route from Dunhuang to Lhasa. It now holds some of China's largest salt, potash and lithium operations, and a growing solar industry.",
  divides:["mongol-oirat","tibetan-amdo","hui-northwest"]
},
{
  id:"badain", type:"dry", name:"Badain Jaran & Tengger", alt:"ᠪᠠᠳᠠᠢ ᠵᠠᠷᠠᠨ",
  stat:"dunes to 500 m — the tallest on earth", at:[40.00,102.20],
  sum:"Alashan desert country: the highest stationary sand dunes anywhere, with spring-fed lakes between them.",
  detail:"Improbably, permanent lakes sit in the troughs between 500-metre dunes, fed by groundwater from the Qilian. Alashan Mongol herders keep camels here. The Tengger's eastern edge presses on the Hexi Corridor and on Ningxia, and its advance is the target of one of the world's largest afforestation programmes.",
  divides:["mongol-inner","hui-northwest"]
},

/* ---------------- PLATEAUS, BASINS, PLAINS ---------------- */
{
  id:"tibetan-plateau", type:"land", name:"The Tibetan Plateau", alt:"བོད་ས་མཐོ · the third pole",
  stat:"2,500,000 km² · average 4,500 m", at:[33.00,88.00],
  sum:"The largest and highest plateau on earth, and the water tower of Asia.",
  detail:"Ten major rivers rise here, supplying water to nearly two billion people. Its uplift, caused by the Indian plate's collision with Asia, created the monsoon system that governs the climate of half the continent. Above 4,500 m agriculture is impossible and the only viable economy is pastoral — which is why the plateau's peoples are herders and its valleys hold the farmers.",
  divides:["tibetan-utsang","tibetan-amdo","tibetan-kham","tibetan-changtang"]
},
{
  id:"changtang", type:"land", name:"The Changtang", alt:"བྱང་ཐང · the northern plain",
  stat:"above 4,500 m · nature reserve 298,000 km²", at:[33.50,85.00],
  sum:"High cold desert with no outflow — one of the least populated inhabited places on the planet.",
  detail:"A basin-and-range country of salt lakes and gravel plains where nothing can be cultivated at all. Drokpa nomads keep yak, sheep and the goats whose underwool becomes pashmina, and until recently carried lake salt south by yak caravan to trade for Nepali grain. Chiru antelope, wild yak and kiang survive here in numbers found nowhere else.",
  divides:["tibetan-changtang"]
},
{
  id:"three-rivers", type:"land", name:"Three Parallel Rivers", alt:"三江并流 · UNESCO World Heritage",
  stat:"Nu, Lancang and Jinsha within 70 km", at:[27.50,99.10],
  sum:"Three of Asia's great rivers running side by side in parallel gorges — the densest ethnic mosaic in China.",
  detail:"The compression of the Hengduan ranges forces the Salween, Mekong and Yangtze into parallel courses less than a hundred kilometres apart, with 4,000-metre walls between them. Within that strip live Lisu, Nu, Derung, Tibetans, Naxi, Bai, Yi and Pumi, several of whom cannot understand a neighbour a day's walk away. It is simultaneously a World Heritage site for biodiversity and the best natural laboratory for how terrain makes ethnicity.",
  divides:["lisu","nu-nusu","nu-anong","derung","naxi","tibetan-kham","bai","pumi"]
},
{
  id:"loess", type:"land", name:"The Loess Plateau", alt:"黄土高原",
  stat:"640,000 km² · silt up to 300 m deep", at:[36.50,108.50],
  sum:"Wind-blown silt from the Gobi, hundreds of metres thick, cut into gullies — and the cradle of Chinese agriculture.",
  detail:"Loess is fertile and holds a vertical face, which is why cave dwellings (yaodong) are the traditional housing across Shanxi and Shaanxi. It is also catastrophically erodible, and it is loess in suspension that turns the Yellow River yellow and raises its bed. The Dongxiang live on some of the most eroded loess country in the northwest.",
  divides:["han","hui-northwest","dongxiang","bonan"]
},
{
  id:"sichuan-basin", type:"land", name:"The Sichuan Basin", alt:"四川盆地 · the red basin",
  stat:"260,000 km² · walled on all sides", at:[30.50,105.20],
  sum:"A fertile bowl ringed by mountains — the most naturally defended and heavily populated basin in China.",
  detail:"Warm, wet, foggy and enclosed, the basin has supported extraordinary population densities since the Dujiangyan irrigation works of 256 BCE. Its walls are why Sichuan repeatedly went its own way politically, and why the Yi, Qiang and Tibetan peoples of its western rim were never absorbed into it.",
  divides:["han","yi-nuosu","qiang","tujia"]
},
{
  id:"yungui", type:"land", name:"The Yunnan–Guizhou Plateau", alt:"云贵高原",
  stat:"karst · 1,000–2,000 m", at:[25.60,104.00],
  sum:"Limestone highlands riddled with caves, sinkholes and pocket basins — terrain that preserves small peoples.",
  detail:"Karst dissolves into thousands of separate small basins, each large enough for a community and awkward enough to reach that outsiders rarely bothered. That geology is a large part of why Guizhou and Yunnan hold more recognised nationalities than any other provinces, and why groups of a few thousand people survived intact into the 20th century.",
  divides:["miao-hmu","yi-nasu","bouyei","sui","gelao","yao-bunu","maonan","mulao"]
},
{
  id:"dzungaria", type:"land", name:"Dzungarian Basin", alt:"جوڭغار ئويمانلىقى",
  stat:"777,000 km² · steppe and semi-desert", at:[45.50,87.00],
  sum:"The steppe half of Xinjiang, and the homeland of the last great nomad empire.",
  detail:"Open to Atlantic weather through the Dzungarian Gate, this basin is grassland where the Tarim is desert — which is why it was nomad country while the south was oasis country. The Dzungar Khanate ruled here until the Qing destroyed it between 1755 and 1758, emptying the region and opening it to Kazakh, Xibe, Hui and Han resettlement.",
  divides:["kazakh","mongol-oirat","xibe","uyghur","russian"]
},
{
  id:"north-china-plain", type:"land", name:"The North China Plain", alt:"华北平原",
  stat:"409,000 km² · alluvium", at:[35.50,116.00],
  sum:"Flat, silt-built, and the demographic centre of gravity of China for three thousand years.",
  detail:"Built entirely by Yellow River sediment, the plain has no natural defences and the densest rural population on earth for its type. It is the Han heartland in the most literal sense: this is where the Central Plain states formed and where the language, the script and the state model that spread across the rest of the country originated.",
  divides:["han","hui-northwest","manchu"]
},
{
  id:"hexi", type:"land", name:"The Hexi Corridor", alt:"河西走廊",
  stat:"1,000 km long, sometimes 15 km wide", at:[39.20,99.50],
  sum:"The neck of the funnel: the one road between China proper and Central Asia.",
  detail:"Bounded by the Qilian snows on one side and desert on the other, the corridor concentrated everything that moved between China and the west — armies, silk, Buddhism, Islam, and people. Dunhuang's cave libraries, the Ganzhou Uyghur kingdom, the Yugur, the Hui towns and the Ming wall's western terminus at Jiayuguan are all products of that single geographic constriction.",
  divides:["yugur-turkic","yugur-mongolic","hui-northwest","tibetan-amdo","mongol-inner","han"]
},
{
  id:"hainan-island", type:"land", name:"Hainan", alt:"海南岛",
  stat:"33,900 km² · tropical", at:[19.00,109.60],
  sum:"An island layered by arrival: Hlai in the interior mountains, Han on the coastal ring, Cham refugees at the southern tip.",
  detail:"Hlai speakers crossed from the mainland some three thousand years ago and were pushed into the Wuzhi mountains by later Han settlement of the coast. Miao arrived as Ming soldiers. The Utsul of Sanya came by sea from Champa in Vietnam. Three separate migrations, three language families, one island.",
  divides:["li","hui-utsul","miao-hmu"]
},
{
  id:"taiwan-island", type:"land", name:"Taiwan", alt:"臺灣 · Formosa",
  stat:"36,200 km² · Yushan 3,952 m", at:[23.70,120.90],
  sum:"The homeland of the Austronesian language family — nine of its ten primary branches occur only here.",
  detail:"Every Malay, Filipino, Malagasy and Polynesian language descends from a migration that left this island around five thousand years ago. The central range, running the length of the island above 3,000 m, kept its indigenous peoples separate long enough for that depth of diversity to develop and survive: Amis on the eastern plain, Atayal in the north, Paiwan and Rukai in the south.",
  divides:["gaoshan-amis","gaoshan-atayal","gaoshan-paiwan"]
}

];
