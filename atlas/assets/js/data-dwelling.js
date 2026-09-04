/* ============================================================
   HOW PEOPLE LIVE — the built form each people is associated
   with, and what most of them live in now.

   The second half matters as much as the first. Almost every
   traditional form below is now a minority case: China urbanised
   from roughly 36% to over 65% between 2000 and 2024, and the
   apartment block is the ordinary Chinese dwelling. Where a form
   survives in real use rather than as heritage display, it says
   so.
   ============================================================ */
window.DWELLING_TYPES = {
  felt:      { label: "Felt tent — ger, yurt",     color: "#3f7d7a" },
  hair:      { label: "Black hair tent",           color: "#3d4a5c" },
  hide:      { label: "Bark, hide & birch tent",   color: "#6f8fa3" },
  stilt:     { label: "Stilt & pile house",        color: "#4f8a63" },
  stone:     { label: "Stone & rammed earth",      color: "#8a8574" },
  cave:      { label: "Loess cave dwelling",       color: "#7a5c3a" },
  timber:    { label: "Timber & log house",        color: "#6e7f4a" },
  courtyard: { label: "Courtyard house",           color: "#8d6b8e" }
};

window.DWELLINGS = {
  /* --- Turkic & Central Asian --- */
  uyghur:{ t:"courtyard", trad:"Flat-roofed mud-brick courtyard houses with a grape trellis over the yard and a raised sitting platform, the supa, built for shade and dry heat.", now:"Apartment blocks in the oasis cities; much of old Kashgar was rebuilt from 2009." },
  kazakh:{ t:"felt", trad:"The kiiz üy — felt over a collapsible willow lattice, dismantled in under an hour, still moved between four seasonal pastures a year.", now:"Fixed winter houses under settlement programmes, with the tent kept for summer grazing." },
  kyrgyz:{ t:"felt", trad:"A yurt of the same family as the Kazakh one, with the tunduk roof-wheel that appears on Kyrgyzstan's flag.", now:"Stone and block houses in the valleys; yurts on the summer jailoo." },
  "tajik-sarikoli":{ t:"stone", trad:"Flat-roofed stone and mud houses built around a central skylight, with raised sleeping platforms on all four sides — the Pamir house plan.", now:"The same plan, now in concrete block, plus government border housing." },
  "tajik-wakhi":{ t:"stone", trad:"The Pamir house again, with five load-bearing pillars carrying Ismaili symbolic meaning.", now:"Little changed; this is among the most isolated inhabited country in China." },
  uzbek:{ t:"courtyard", trad:"Central Asian urban courtyard houses with carved ganch plasterwork, built by a merchant population.", now:"Wholly urban and apartment-dwelling." },
  tatar:{ t:"courtyard", trad:"Town houses in the Volga Tatar manner, brightly painted, with a separate summer kitchen.", now:"Apartments in Yining, Tacheng and Ürümqi." },
  salar:{ t:"timber", trad:"The libalou, a two-storey wattle-and-timber house of woven willow packed with earth, built into the Yellow River gorge slopes.", now:"Brick and concrete; a handful of libalou survive as protected heritage." },
  "yugur-turkic":{ t:"felt", trad:"Felt tents on the Qilian summer grassland, with the household's coral and silver ornament stored inside.", now:"Village housing in Sunan, with tents for the grazing season." },
  "yugur-mongolic":{ t:"felt", trad:"The same felt tents as their Turkic-speaking neighbours — the two Yugur peoples share a material culture and not a language.", now:"Settled housing and mixed farming." },

  /* --- Mongolic --- */
  "mongol-inner":{ t:"felt", trad:"The ger: felt over a khana lattice, a toono roof-ring, the door always south, the hearth at the centre, and a fixed order of who sits where.", now:"Overwhelmingly apartments and fixed houses. Grassland enclosure and resettlement since 2000 ended mobile herding for most families." },
  "mongol-oirat":{ t:"felt", trad:"A western Mongol ger, slightly steeper in the roof than the eastern form.", now:"Fixed housing in Bayingolin and Bortala; gers for summer pasture and for tourism." },
  "mongol-barga":{ t:"felt", trad:"Hulunbuir gers on some of the best-preserved open steppe in East Asia; the Shinehen Buryat brought their own variant in the 1920s.", now:"Village and town housing, with working gers still on the summer grass." },
  "tu-mongghul":{ t:"courtyard", trad:"Earth-walled courtyards on the loess hills, flat-roofed, with a spirit pole and a white stone in the yard.", now:"Brick courtyards and apartments around Xining." },
  "tu-mangghuer":{ t:"courtyard", trad:"Yellow River valley courtyards, wetter country than Huzhu, with orchards inside the walls.", now:"Modern village housing; heavy out-migration for work." },
  dongxiang:{ t:"cave", trad:"Yaodong cut into the eroded loess, or earth-walled courtyards where the slope will not hold a cave — the cheapest possible shelter in the poorest county in Gansu.", now:"Brick housing built under poverty-alleviation programmes; many households relocated wholesale." },
  bonan:{ t:"courtyard", trad:"Earthen courtyard houses on the slopes below the Jishi mountains, with the forge in the yard.", now:"Brick and concrete; knife-forging still happens in the same yards." },
  daur:{ t:"timber", trad:"Timber-framed houses with reed-thatched roofs and kang beds on three sides of the room, in the Nen river bottomland.", now:"Brick village housing across Morin Dawa." },

  /* --- Tungusic & the northeast --- */
  manchu:{ t:"courtyard", trad:"Three-bay houses with a wraparound kang, the west wall reserved for ancestors, and a spirit pole in the courtyard.", now:"Indistinguishable from Han housing — apartments and village brick." },
  xibe:{ t:"courtyard", trad:"Courtyard houses in the Ili valley built on the Manchu plan the garrison carried west in 1764.", now:"Rural brick housing in Qapqal, and apartments in Yining." },
  "ewenki-solon":{ t:"felt", trad:"Gers taken from their Mongol neighbours when the Qing moved them onto open steppe — the clearest sign of how far the Solon left the forest behind.", now:"Settled housing on the Hulunbuir grassland." },
  "ewenki-reindeer":{ t:"hide", trad:"The cuoluozi — a conical frame of larch poles covered in birch bark in summer and hide in winter, moved with the reindeer.", now:"A state-built settlement at Aoluguya since 2003; some herders returned to forest camps and still raise the cuoluozi." },
  oroqen:{ t:"hide", trad:"The xianrenzhu, the same conical bark-and-hide tent, pitched at hunting camps across the Greater Khingan.", now:"Fixed villages since 1953; the 1996 hunting ban ended the last of the mobile camps." },
  hezhen:{ t:"hide", trad:"Birch-bark summer shelters by the fishing grounds and semi-subterranean earth lodges for the Amur winter, with fish-skin clothing hung to dry.", now:"Brick village housing in three fishing settlements." },
  korean:{ t:"courtyard", trad:"Tiled or thatched houses over an ondol — flues under the floor carrying the kitchen fire's smoke, so the floor itself is the heating.", now:"Apartments in Yanji and the county towns; many houses stand empty from emigration to South Korea." },
  russian:{ t:"timber", trad:"The izba: squared logs, carved and painted window surrounds, a masonry stove, and a banya in the yard.", now:"The Argun villages keep them, partly for the tourists who come to see them." },

  /* --- Han & Hui --- */
  han:{ t:"courtyard", trad:"The courtyard house in a hundred regional forms — the Beijing siheyuan, the Hui-style white gable, the Fujian tulou, the Shaanxi loess cave, the Jiangnan water town.", now:"The apartment block. Over 65% of the country is urban, and the tower is the ordinary Chinese home." },
  "hui-northwest":{ t:"courtyard", trad:"Courtyards alongside the mosque, with the prayer room facing west and no images of living things in the decoration.", now:"Apartments and brick courtyards; mosque architecture has been regulated since 2018." },
  "hui-yunnan":{ t:"courtyard", trad:"Yunnanese courtyards on the caravan roads, built round a stable yard big enough for a mule train.", now:"Urban housing in Dali, Kunming and the border towns." },
  "hui-utsul":{ t:"courtyard", trad:"Dense coastal village houses at Sanya, more Cham and Southeast Asian than Chinese in plan.", now:"Multi-storey concrete, hemmed in by Sanya's resort development." },

  /* --- Tibetan plateau --- */
  "tibetan-utsang":{ t:"stone", trad:"Rammed-earth and stone houses two or three storeys tall, animals below, family above, a shrine room at the top and prayer flags on the roof.", now:"The same form in concrete, plus apartment blocks in Lhasa and Shigatse." },
  "tibetan-amdo":{ t:"hair", trad:"The black tent — panels of woven yak hair, porous to smoke and shed by rain, guyed low against the wind, with a hearth of stones or clay at the centre.", now:"Fixed housing under grassland resettlement since 2003; black tents still go up for the summer grazing." },
  "tibetan-kham":{ t:"stone", trad:"Tall stone houses with battered walls and heavy carved and painted timber, some of the most substantial rural architecture on the plateau.", now:"Largely unchanged in form, rebuilt in concrete and brick." },
  "tibetan-changtang":{ t:"hair", trad:"Black yak-hair tents above 4,500 m, the only shelter on ground where nothing can be cultivated, moved between seasonal pastures.", now:"Resettlement towns along new roads; some households keep both." },
  monba:{ t:"stilt", trad:"Timber and bamboo houses raised on posts, roofed in shingles or thatch — the wet southern slope demands a floor off the ground.", now:"The same, now with metal roofing, since the Medog road opened in 2013." },
  lhoba:{ t:"stilt", trad:"Bamboo and thatch longhouses on posts, with several hearths along the length, one per family.", now:"State-built border villages in concrete." },
  sherpa:{ t:"stone", trad:"Stone houses with timber upper floors, animals stalled below, on the Himalayan slope.", now:"Little changed; a small community in Dinggyê and Nyalam." },
  deng:{ t:"stilt", trad:"Long stilt houses of bamboo and thatch in the Zayü valleys, built for heavy monsoon rain.", now:"Concrete housing in new frontier settlements." },

  /* --- Hengduan corridor --- */
  qiang:{ t:"stone", trad:"Drystone houses stacked up the slope with flat roofs used as threshing floors, and the diaolou — mortarless stone towers up to thirty metres.", now:"Rebuilt in a standardised 'Qiang style' after the 2008 earthquake destroyed much of the original fabric." },
  pumi:{ t:"timber", trad:"Log houses with a central hearth pillar treated as the family's spiritual axis.", now:"Timber and brick; the hearth pillar is often kept in the new house." },
  naxi:{ t:"courtyard", trad:"Timber-framed courtyards on the Lijiang plan — three rooms and a screen wall — with carved lattice doors and a stream through the lane.", now:"The old town is now largely guesthouses; most Naxi live in modern Lijiang." },
  mosuo:{ t:"timber", trad:"Log-built compounds around a courtyard, with the grandmother's room as the ritual centre and separate upper rooms for adult women.", now:"Guesthouse construction around Lugu Lake has changed both the buildings and the households inside them." },
  "yi-nuosu":{ t:"timber", trad:"Low windowless houses of timber and rammed earth under split-plank roofs weighted with stones, the hearth in the middle of the single room.", now:"Brick and concrete under poverty-alleviation rebuilding; whole villages have been relocated." },
  "yi-nasu":{ t:"stone", trad:"Rammed-earth and stone houses with flat roofs across the Yunnan and Guizhou uplands.", now:"Village brick housing and small-town apartments." },
  bai:{ t:"courtyard", trad:"Whitewashed courtyards with painted gable murals and elaborate carved screen walls — 'three rooms and a screen wall' names the standard plan.", now:"The form is protected and still built, increasingly as guesthouses around Erhai." },
  lisu:{ t:"stilt", trad:"The 'thousand-legged house' — a timber floor carried on dozens of thin posts down a slope too steep to level.", now:"Concrete village housing along the new Nujiang road." },
  "nu-nusu":{ t:"stilt", trad:"Plank and bamboo houses on posts pinned to the gorge wall, reached until recently by rope bridges and cable crossings.", now:"Relocation housing lower in the valley." },
  "nu-anong":{ t:"stilt", trad:"The same stilted plank houses at the head of the Nujiang gorge.", now:"State village housing; a very small population." },
  derung:{ t:"timber", trad:"Log and bamboo houses with a fire always alight, in a valley closed by snow half the year until 1999.", now:"Rebuilt in concrete under a poverty programme that reached the whole valley within a decade." },
  tujia:{ t:"stilt", trad:"The diaojiaolou — a hanging-foot house, part on the slope and part on stilts, with a railed veranda across the front.", now:"Brick and concrete; diaojiaolou survive around Zhangjiajie and Enshi for tourism." },

  /* --- Yunnan borderlands --- */
  hani:{ t:"stone", trad:"The mushroom house — rammed earth walls under a deep four-sided thatch dome, set in the terrace villages between forest and field.", now:"Concrete and tile; a few mushroom houses are maintained inside the World Heritage terrace area." },
  lahu:{ t:"stilt", trad:"Bamboo and thatch houses on posts along the ridges, a household to each.", now:"Brick and tile in Lancang county." },
  jingpo:{ t:"stilt", trad:"Long bamboo houses on posts with a hearth for each family along the length, and buffalo skulls on the gable.", now:"Concrete village housing in Dehong." },
  achang:{ t:"stilt", trad:"Valley-floor houses on low posts, closer to the Dai form than to their hill neighbours.", now:"Brick and tile; the forge remains the important building." },
  jino:{ t:"stilt", trad:"Large communal longhouses on posts, once holding a whole patrilineage under a single roof.", now:"Single-family concrete houses; the last longhouses went in the 1970s." },
  va:{ t:"stilt", trad:"Thatched houses on posts around the village drum house, with the wooden drums that gave the village its voice.", now:"Concrete and tin; drum houses rebuilt as village halls." },
  blang:{ t:"stilt", trad:"Bamboo houses on posts among the ancient tea gardens of Bulang mountain.", now:"Tea wealth since 2005 has rebuilt most villages in brick and concrete." },
  deang:{ t:"stilt", trad:"Bamboo and thatch on posts, the household's tea drying on the platform.", now:"Brick housing in Dehong and Lincang." },
  "dai-lue":{ t:"stilt", trad:"Teak houses on tall posts with a steep tiled roof, the space beneath for looms, tools and shade — the classic Tai valley house.", now:"Concrete versions of the same silhouette, and apartments in Jinghong." },
  "dai-nuea":{ t:"stilt", trad:"The Shan variant of the Tai house, lower and broader than the Sipsongpanna form.", now:"Brick and concrete along the Ruili border." },

  /* --- The south --- */
  zhuang:{ t:"stilt", trad:"The ganlan house — living floor raised over a byre, the oldest documented building form in southern China.", now:"Concrete village houses and apartments; Guangxi is heavily urbanised." },
  bouyei:{ t:"stone", trad:"Houses of split limestone — walls, roof tiles and even furniture cut from the karst the village stands on.", now:"Stone villages survive around Huangguoshu; elsewhere brick and tile." },
  dong:{ t:"stilt", trad:"Fir houses on posts around the drum tower, all of it assembled without nails by carpenters working from memory.", now:"The technique is protected heritage and still practised; new houses often keep the form." },
  sui:{ t:"stilt", trad:"Timber houses on posts beside the fish ponds, granary separate from the dwelling.", now:"Brick and concrete in Sandu." },
  maonan:{ t:"stilt", trad:"Stone-footed timber houses on posts in the karst hollows, cattle stalled beneath.", now:"Concrete housing in Huanjiang." },
  mulao:{ t:"courtyard", trad:"Brick and earth houses with an internal ground hearth, the ditanlu, sunk into the floor of the main room.", now:"Modern brick; the ground hearth is largely gone." },
  gelao:{ t:"stone", trad:"Stone and earth houses on the terraced slopes of northern Guizhou.", now:"Brick village housing." },
  li:{ t:"stilt", trad:"The boat-shaped house — a thatched barrel vault reaching almost to the ground, raised on low posts.", now:"Concrete and tile island-wide; boat houses survive in a few heritage villages." },
  "miao-hmu":{ t:"stilt", trad:"Diaojiaolou stepping down the ridge, with a curved 'beauty's rail' bench along the veranda where women embroider.", now:"Still built in Qiandongnan, increasingly for guesthouses; elsewhere concrete." },
  "miao-ahmao":{ t:"stone", trad:"Low stone and earth houses in the cold high country of Weining, built against wind rather than rain.", now:"Brick housing under poverty programmes." },
  "miao-hmong":{ t:"timber", trad:"Ground-level timber and earth houses with a packed clay floor, unlike the stilted houses of their eastern kin.", now:"Concrete and brick in Wenshan; the diaspora builds in the styles of Laos, Thailand and the United States." },
  "yao-mien":{ t:"timber", trad:"Timber and earth houses on the mountainside, the ancestral altar facing the door.", now:"Brick and concrete; terrace villages at Longji rebuilt for tourism." },
  "yao-bunu":{ t:"stone", trad:"Stone houses wedged into the karst hollows of Hechi, on soil pockets between outcrops.", now:"Concrete; many households relocated off the worst karst entirely." },
  "yao-lakkia":{ t:"timber", trad:"Timber houses on Dayao mountain, their land and forest rights fixed by the shipai stone tablets.", now:"Brick and concrete in Jinxiu." },
  she:{ t:"timber", trad:"Timber-framed earth-walled houses in the Fujian and Zhejiang tea hills.", now:"Modern rural housing, largely indistinguishable from Han neighbours." },
  jing:{ t:"stilt", trad:"Thatched houses on low posts on the sand islands, built light against typhoons and easy to rebuild.", now:"Concrete and tile; among the wealthier minority communities, on border-trade money." },
  "gaoshan-amis":{ t:"stilt", trad:"Bamboo and thatch houses raised on posts on the eastern coastal plain, with a separate men's age-set house in the village.", now:"Concrete housing; the age-set houses are rebuilt for the Ilisin festival." },
  "gaoshan-atayal":{ t:"timber", trad:"Semi-subterranean plank houses dug into the slope with a bark or slate roof, warm through the mountain winter.", now:"Concrete village housing across the northern mountains." },
  "gaoshan-paiwan":{ t:"stone", trad:"Slate houses — walls, roof, floor, bed platform and ancestral posts all cut from the same grey stone, the carving indicating a noble house.", now:"Concrete, with slate façades still built for prestige and for public buildings." },

  /* --- Unrecognised --- */
  khmu:{ t:"stilt", trad:"Bamboo and thatch on posts, rebuilt every few years as the swidden moved.", now:"Fixed concrete housing in Mengla, on rubber money." },
  kucong:{ t:"stilt", trad:"Temporary shelters of leaves and bamboo, moved frequently — the group was still living this way when contacted in the 1950s.", now:"State-built villages; the shift from forest camp to fixed house happened inside two generations." }
};

/* merge into the people records */
(function () {
  var P = window.PEOPLES || [];
  for (var i = 0; i < P.length; i++) {
    var d = window.DWELLINGS[P[i].id];
    if (d) P[i].dwelling = d;
  }
})();
