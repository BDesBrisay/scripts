'use strict';

const scale = 165;

const scaleUp = (obj) => ({
  changePercent: obj.changePercent,
  open: obj.open * scale,
  high: obj.high * scale,
  low: obj.low * scale,
  close: obj.close * scale
});

const scaleDown = (obj) => ({
  changePercent: obj.changePercent,
  open: obj.open / scale,
  high: obj.high / scale,
  low: obj.low / scale,
  close: obj.close / scale
});

const rawData = [{"date":"2018-11-26","open":1038.35,"high":1049.31,"low":1033.91,"close":1048.62,"volume":1942822,"unadjustedVolume":1942822,"change":24.74,"changePercent":2.416,"vwap":1043.74,"label":"Nov 26","changeOverTime":0},
{"date":"2018-11-27","open":1041,"high":1057.58,"low":1038.49,"close":1044.41,"volume":1803164,"unadjustedVolume":1803164,"change":-4.21,"changePercent":-0.401,"vwap":1046.65,"label":"Nov 27","changeOverTime":-0.004014800404340761},
{"date":"2018-11-28","open":1048.76,"high":1086.84,"low":1035.76,"close":1086.23,"volume":2475419,"unadjustedVolume":2475419,"change":41.82,"changePercent":4.004,"vwap":1068.81,"label":"Nov 28","changeOverTime":0.03586618603497943},
{"date":"2018-11-29","open":1076.08,"high":1094.24,"low":1076,"close":1088.3,"volume":1468859,"unadjustedVolume":1468859,"change":2.07,"changePercent":0.191,"vwap":1085.88,"label":"Nov 29","changeOverTime":0.03784020903663869},
{"date":"2018-11-30","open":1089.07,"high":1095.57,"low":1077.88,"close":1094.43,"volume":2580612,"unadjustedVolume":2580612,"change":6.13,"changePercent":0.563,"vwap":1089.89,"label":"Nov 30","changeOverTime":0.04368598729759129},
{"date":"2018-12-03","open":1123.14,"high":1124.65,"low":1103.66,"close":1106.43,"volume":1990758,"unadjustedVolume":1990758,"change":12,"changePercent":1.096,"vwap":1112.51,"label":"Dec 3","changeOverTime":0.05512959890141346},
{"date":"2018-12-04","open":1103.12,"high":1104.42,"low":1049.98,"close":1050.82,"volume":2345166,"unadjustedVolume":2345166,"change":-55.61,"changePercent":-5.026,"vwap":1069.87,"label":"Dec 4","changeOverTime":0.002097995460700774},
{"date":"2018-12-06","open":1034.26,"high":1071.2,"low":1030.77,"close":1068.73,"volume":2769225,"unadjustedVolume":2769225,"change":17.91,"changePercent":1.704,"vwap":1053,"label":"Dec 6","changeOverTime":0.019177585779405436},
{"date":"2018-12-07","open":1060.01,"high":1075.26,"low":1028.5,"close":1036.58,"volume":2101206,"unadjustedVolume":2101206,"change":-32.15,"changePercent":-3.008,"vwap":1045.56,"label":"Dec 7","changeOverTime":-0.011481756975834874},
{"date":"2018-12-10","open":1035.05,"high":1048.45,"low":1023.29,"close":1039.55,"volume":1807725,"unadjustedVolume":1807725,"change":2.97,"changePercent":0.287,"vwap":1038.54,"label":"Dec 10","changeOverTime":-0.00864946310388886},
{"date":"2018-12-11","open":1056.49,"high":1060.6,"low":1039.84,"close":1051.75,"volume":1394731,"unadjustedVolume":1394731,"change":12.2,"changePercent":1.174,"vwap":1050.74,"label":"Dec 11","changeOverTime":0.0029848753599970527},
{"date":"2018-12-12","open":1068,"high":1081.65,"low":1062.79,"close":1063.68,"volume":1523804,"unadjustedVolume":1523804,"change":11.93,"changePercent":1.134,"vwap":1070.91,"label":"Dec 12","changeOverTime":0.014361732562796985},
{"date":"2018-12-13","open":1068.07,"high":1079.76,"low":1053.93,"close":1061.9,"volume":1329768,"unadjustedVolume":1329768,"change":-1.78,"changePercent":-0.167,"vwap":1064.76,"label":"Dec 13","changeOverTime":0.012664263508230056},
{"date":"2018-12-14","open":1049.98,"high":1062.6,"low":1040.79,"close":1042.1,"volume":1686619,"unadjustedVolume":1686619,"change":-19.8,"changePercent":-1.865,"vwap":1046.83,"label":"Dec 14","changeOverTime":-0.0062176956380766936},
{"date":"2018-12-17","open":1037.51,"high":1053.15,"low":1007.9,"close":1016.53,"volume":2385364,"unadjustedVolume":2385364,"change":-25.57,"changePercent":-2.454,"vwap":1025.56,"label":"Dec 17","changeOverTime":-0.030602124697221036},
{"date":"2018-12-18","open":1026.09,"high":1049.48,"low":1021.44,"close":1028.71,"volume":2192533,"unadjustedVolume":2192533,"change":12.18,"changePercent":1.198,"vwap":1034.43,"label":"Dec 18","changeOverTime":-0.018986858919341473},
{"date":"2018-12-19","open":1033.99,"high":1062,"low":1008.05,"close":1023.01,"volume":2479338,"unadjustedVolume":2479338,"change":-5.7,"changePercent":-0.554,"vwap":1037.64,"label":"Dec 19","changeOverTime":-0.024422574431157047},
{"date":"2018-12-20","open":1018.13,"high":1034.22,"low":996.36,"close":1009.41,"volume":2673464,"unadjustedVolume":2673464,"change":-13.6,"changePercent":-1.329,"vwap":1011.04,"label":"Dec 20","changeOverTime":-0.03739200091548886},
{"date":"2018-12-21","open":1015.3,"high":1024.02,"low":973.69,"close":979.54,"volume":4595891,"unadjustedVolume":4595891,"change":-29.87,"changePercent":-2.959,"vwap":991.0527,"label":"Dec 21","changeOverTime":-0.06587705746600288},
{"date":"2018-12-24","open":973.9,"high":1003.54,"low":970.11,"close":976.22,"volume":1590328,"unadjustedVolume":1590328,"change":-3.32,"changePercent":-0.339,"vwap":983.2254,"label":"Dec 24","changeOverTime":-0.06904312334306029}];

const raw6m = [{"date":"2018-06-26","open":181.7164,"high":185.2318,"low":181.2696,"close":183.1464,"volume":24569201,"unadjustedVolume":24569201,"change":2.2443,"changePercent":1.241,"vwap":183.4571,"label":"Jun 26, 18","changeOverTime":0},
{"date":"2018-06-27","open":183.9386,"high":185.9766,"low":182.7492,"close":182.8783,"volume":25285328,"unadjustedVolume":25285328,"change":-0.26812,"changePercent":-0.146,"vwap":184.2214,"label":"Jun 27, 18","changeOverTime":-0.001463856237414462},
{"date":"2018-06-28","open":182.8187,"high":184.914,"low":182.5208,"close":184.2089,"volume":17365235,"unadjustedVolume":17365235,"change":1.3307,"changePercent":0.728,"vwap":183.8537,"label":"Jun 28, 18","changeOverTime":0.005801369833095272},
{"date":"2018-06-29","open":184.9934,"high":185.8872,"low":181.637,"close":183.8217,"volume":22737666,"unadjustedVolume":22737666,"change":-0.387286,"changePercent":-0.21,"vwap":184.6601,"label":"Jun 29, 18","changeOverTime":0.0036872141630957143},
{"date":"2018-07-02","open":182.5406,"high":185.9964,"low":182.1434,"close":185.8773,"volume":17731343,"unadjustedVolume":17731343,"change":2.0556,"changePercent":1.118,"vwap":184.8994,"label":"Jul 2, 18","changeOverTime":0.014911022002070427},
{"date":"2018-07-03","open":186.483,"high":186.6419,"low":182.2626,"close":182.6399,"volume":13954806,"unadjustedVolume":13954806,"change":-3.2373,"changePercent":-1.742,"vwap":184.5363,"label":"Jul 3, 18","changeOverTime":-0.0027655471251413536},
{"date":"2018-07-05","open":183.9706,"high":185.1126,"low":182.9974,"close":184.1096,"volume":16604248,"unadjustedVolume":16604248,"change":1.4697,"changePercent":0.805,"vwap":184.1828,"label":"Jul 5, 18","changeOverTime":0.005259180633635171},
{"date":"2018-07-06","open":184.1295,"high":187.1225,"low":183.911,"close":186.6618,"volume":17485245,"unadjustedVolume":17485245,"change":2.5521,"changePercent":1.386,"vwap":186.0373,"label":"Jul 6, 18","changeOverTime":0.019194480481188818},
{"date":"2018-07-09","open":188.1811,"high":189.3529,"low":187.9825,"close":189.2536,"volume":19756634,"unadjustedVolume":19756634,"change":2.5918,"changePercent":1.389,"vwap":188.8663,"label":"Jul 9, 18","changeOverTime":0.033346000794992454},
{"date":"2018-07-10","open":189.3827,"high":189.9487,"low":188.8565,"close":189.0252,"volume":15939149,"unadjustedVolume":15939149,"change":-0.228399,"changePercent":-0.121,"vwap":189.3429,"label":"Jul 10, 18","changeOverTime":0.03209891103510641},
{"date":"2018-07-11","open":187.1881,"high":188.4591,"low":186.3043,"close":186.5724,"volume":18831470,"unadjustedVolume":18831470,"change":-2.4528,"changePercent":-1.298,"vwap":187.0366,"label":"Jul 11, 18","changeOverTime":0.018706346398291135},
{"date":"2018-07-12","open":188.2109,"high":190.0778,"low":187.9924,"close":189.7005,"volume":18041131,"unadjustedVolume":18041131,"change":3.1281,"changePercent":1.677,"vwap":189.3319,"label":"Jul 12, 18","changeOverTime":0.03578612519820212},
{"date":"2018-07-13","open":189.7501,"high":190.5048,"low":189.5714,"close":189.9984,"volume":12519792,"unadjustedVolume":12519792,"change":0.297913,"changePercent":0.157,"vwap":190.0918,"label":"Jul 13, 18","changeOverTime":0.03741269279658243},
{"date":"2018-07-16","open":190.187,"high":191.3092,"low":189.0897,"close":189.5813,"volume":15043110,"unadjustedVolume":15043110,"change":-0.417077,"changePercent":-0.22,"vwap":189.9551,"label":"Jul 16, 18","changeOverTime":0.0351352797543386},
{"date":"2018-07-17","open":188.4294,"high":190.5346,"low":187.8832,"close":190.1175,"volume":15534523,"unadjustedVolume":15534523,"change":0.536241,"changePercent":0.283,"vwap":189.5627,"label":"Jul 17, 18","changeOverTime":0.03806299222916752},
{"date":"2018-07-18","open":190.4452,"high":190.4651,"low":188.6081,"close":189.0748,"volume":16393381,"unadjustedVolume":16393381,"change":-1.0427,"changePercent":-0.548,"vwap":189.0647,"label":"Jul 18, 18","changeOverTime":0.03236973262919725},
{"date":"2018-07-19","open":188.3698,"high":191.2099,"low":188.3698,"close":190.5445,"volume":20286752,"unadjustedVolume":20286752,"change":1.4697,"changePercent":0.777,"vwap":190.4823,"label":"Jul 19, 18","changeOverTime":0.04039446038797377},
{"date":"2018-07-20","open":190.4452,"high":191.0907,"low":188.8464,"close":190.1076,"volume":20706042,"unadjustedVolume":20706042,"change":-0.436937,"changePercent":-0.229,"vwap":190.2152,"label":"Jul 20, 18","changeOverTime":0.038008937112604946},
{"date":"2018-07-23","open":189.3529,"high":190.624,"low":188.2407,"close":190.2764,"volume":15989365,"unadjustedVolume":15989365,"change":0.168816,"changePercent":0.089,"vwap":189.5294,"label":"Jul 23, 18","changeOverTime":0.03893060415055931},
{"date":"2018-07-24","open":191.1106,"high":192.3123,"low":190.7134,"close":191.6567,"volume":18697898,"unadjustedVolume":18697898,"change":1.3803,"changePercent":0.725,"vwap":191.4865,"label":"Jul 24, 18","changeOverTime":0.04646719782643831},
{"date":"2018-07-25","open":191.7165,"high":193.4939,"low":191.0907,"close":193.4641,"volume":16826483,"unadjustedVolume":16826483,"change":1.8073,"changePercent":0.943,"vwap":192.4062,"label":"Jul 25, 18","changeOverTime":0.056335805672401984},
{"date":"2018-07-26","open":193.2555,"high":194.5961,"low":192.2625,"close":192.8583,"volume":19075964,"unadjustedVolume":19075964,"change":-0.605754,"changePercent":-0.313,"vwap":193.3664,"label":"Jul 26, 18","changeOverTime":0.05302806934780053},
{"date":"2018-07-27","open":193.6329,"high":193.8315,"low":188.7769,"close":189.6508,"volume":24023972,"unadjustedVolume":24023972,"change":-3.2075,"changePercent":-1.663,"vwap":190.8687,"label":"Jul 27, 18","changeOverTime":0.03551475759283286},
{"date":"2018-07-30","open":190.5644,"high":190.8623,"low":187.7541,"close":188.5883,"volume":21029535,"unadjustedVolume":21029535,"change":-1.0626,"changePercent":-0.56,"vwap":188.6622,"label":"Jul 30, 18","changeOverTime":0.029713387759737586},
{"date":"2018-07-31","open":188.9755,"high":190.8027,"low":188.0222,"close":188.9656,"volume":39373038,"unadjustedVolume":39373038,"change":0.377354,"changePercent":0.2,"vwap":189.4491,"label":"Jul 31, 18","changeOverTime":0.03177348831317457},
{"date":"2018-08-01","open":197.7441,"high":200.3558,"low":195.9368,"close":200.0976,"volume":67935716,"unadjustedVolume":67935716,"change":11.132,"changePercent":5.891,"vwap":198.5305,"label":"Aug 1, 18","changeOverTime":0.09255546382566078},
{"date":"2018-08-02","open":199.184,"high":206.9297,"low":198.9556,"close":205.9466,"volume":62404012,"unadjustedVolume":62404012,"change":5.849,"changePercent":2.923,"vwap":204.4153,"label":"Aug 2, 18","changeOverTime":0.12449166349980119},
{"date":"2018-08-03","open":205.5891,"high":207.2872,"low":204.0502,"close":206.5424,"volume":33447396,"unadjustedVolume":33447396,"change":0.595824,"changePercent":0.289,"vwap":205.8513,"label":"Aug 3, 18","changeOverTime":0.1277447986965618},
{"date":"2018-08-06","open":206.5524,"high":207.7937,"low":205.6288,"close":207.6149,"volume":25425387,"unadjustedVolume":25425387,"change":1.0725,"changePercent":0.519,"vwap":207.0421,"label":"Aug 6, 18","changeOverTime":0.13360076965749806},
{"date":"2018-08-07","open":207.8632,"high":208.0419,"low":205.321,"close":205.6685,"volume":25587387,"unadjustedVolume":25587387,"change":-1.9464,"changePercent":-0.937,"vwap":206.1233,"label":"Aug 7, 18","changeOverTime":0.12297320613454589},
{"date":"2018-08-08","open":204.6159,"high":206.3637,"low":203.0966,"close":205.8076,"volume":22525487,"unadjustedVolume":22525487,"change":0.139025,"changePercent":0.068,"vwap":205.3294,"label":"Aug 8, 18","changeOverTime":0.12373270782281283},
{"date":"2018-08-09","open":205.8374,"high":208.32,"low":205.7579,"close":207.4262,"volume":23492626,"unadjustedVolume":23492626,"change":1.6187,"changePercent":0.786,"vwap":207.602,"label":"Aug 9, 18","changeOverTime":0.1325704463751403},
{"date":"2018-08-10","open":206.639,"high":208.373,"low":205.9514,"close":206.8084,"volume":24611202,"unadjustedVolume":24611202,"change":-0.617809,"changePercent":-0.298,"vwap":207.1349,"label":"Aug 10, 18","changeOverTime":0.12919718869712976},
{"date":"2018-08-13","open":206.9778,"high":210.2185,"low":206.9778,"close":208.1438,"volume":25890880,"unadjustedVolume":25890880,"change":1.3353,"changePercent":0.646,"vwap":208.8467,"label":"Aug 13, 18","changeOverTime":0.13648862330900308},
{"date":"2018-08-14","open":209.4243,"high":209.8279,"low":207.5359,"close":209.0207,"volume":20748010,"unadjustedVolume":20748010,"change":0.87694,"changePercent":0.421,"vwap":208.7194,"label":"Aug 14, 18","changeOverTime":0.14127659620937133},
{"date":"2018-08-15","open":208.4925,"high":210.0073,"low":207.6056,"close":209.509,"volume":28807564,"unadjustedVolume":28807564,"change":0.488297,"changePercent":0.234,"vwap":208.6754,"label":"Aug 15, 18","changeOverTime":0.14394276928184221},
{"date":"2018-08-16","open":211.0137,"high":213.0687,"low":210.7347,"close":212.5783,"volume":28500367,"unadjustedVolume":28500367,"change":3.0693,"changePercent":1.465,"vwap":212.2532,"label":"Aug 16, 18","changeOverTime":0.16070149345004878},
{"date":"2018-08-17","open":212.6979,"high":217.1922,"low":212.4188,"close":216.8235,"volume":35426997,"unadjustedVolume":35426997,"change":4.2452,"changePercent":1.997,"vwap":215.2574,"label":"Aug 17, 18","changeOverTime":0.18388076424106614},
{"date":"2018-08-20","open":217.3417,"high":218.4179,"low":214.3621,"close":214.7108,"volume":30287695,"unadjustedVolume":30287695,"change":-2.1126,"changePercent":-0.974,"vwap":215.7256,"label":"Aug 20, 18","changeOverTime":0.17234518396211995},
{"date":"2018-08-21","open":216.0462,"high":216.4348,"low":213.2808,"close":214.2923,"volume":26159755,"unadjustedVolume":26159755,"change":-0.41854,"changePercent":-0.195,"vwap":214.8765,"label":"Aug 21, 18","changeOverTime":0.17006012676197846},
{"date":"2018-08-22","open":213.3556,"high":215.6077,"low":213.0965,"close":214.3023,"volume":19018131,"unadjustedVolume":19018131,"change":0.009965,"changePercent":0.005,"vwap":214.4295,"label":"Aug 22, 18","changeOverTime":0.1701147278898193},
{"date":"2018-08-23","open":213.9037,"high":216.2953,"low":213.8538,"close":214.7407,"volume":18883224,"unadjustedVolume":18883224,"change":0.43847,"changePercent":0.205,"vwap":215.2115,"label":"Aug 23, 18","changeOverTime":0.17250844133436422},
{"date":"2018-08-24","open":215.8469,"high":216.1458,"low":214.3621,"close":215.4084,"volume":18476356,"unadjustedVolume":18476356,"change":0.667671,"changePercent":0.311,"vwap":215.3073,"label":"Aug 24, 18","changeOverTime":0.17615415864030087},
{"date":"2018-08-27","open":216.395,"high":217.9794,"low":215.5778,"close":217.1822,"volume":20525117,"unadjustedVolume":20525117,"change":1.7738,"changePercent":0.823,"vwap":217.0153,"label":"Aug 27, 18","changeOverTime":0.1858393066967191},
{"date":"2018-08-28","open":218.2485,"high":219.7732,"low":218.1588,"close":218.9361,"volume":22776766,"unadjustedVolume":22776766,"change":1.7539,"changePercent":0.808,"vwap":218.9236,"label":"Aug 28, 18","changeOverTime":0.19541579850873406},
{"date":"2018-08-29","open":219.3845,"high":222.7129,"low":218.6471,"close":222.2047,"volume":27254804,"unadjustedVolume":27254804,"change":3.2686,"changePercent":1.493,"vwap":221.0337,"label":"Aug 29, 18","changeOverTime":0.2132627231548095},
{"date":"2018-08-30","open":222.4738,"high":227.4663,"low":221.6267,"close":224.2476,"volume":48793824,"unadjustedVolume":48793824,"change":2.0429,"changePercent":0.919,"vwap":224.4233,"label":"Aug 30, 18","changeOverTime":0.2244171875614263},
{"date":"2018-08-31","open":225.7224,"high":228.0742,"low":225.2142,"close":226.8385,"volume":43340134,"unadjustedVolume":43340134,"change":2.591,"changePercent":1.155,"vwap":226.8985,"label":"Aug 31, 18","changeOverTime":0.23856379377372425},
{"date":"2018-09-04","open":227.6158,"high":228.3831,"low":225.842,"close":227.566,"volume":27390132,"unadjustedVolume":27390132,"change":0.727462,"changePercent":0.321,"vwap":227.2879,"label":"Sep 4, 18","changeOverTime":0.24253602582414943},
{"date":"2018-09-05","open":228.1938,"high":228.8714,"low":224.3173,"close":226.0812,"volume":33332960,"unadjustedVolume":33332960,"change":-1.4848,"changePercent":-0.652,"vwap":226.4187,"label":"Sep 5, 18","changeOverTime":0.23442885036233307},
{"date":"2018-09-06","open":225.4434,"high":226.5595,"low":220.5305,"close":222.3243,"volume":34289976,"unadjustedVolume":34289976,"change":-3.7569,"changePercent":-1.662,"vwap":222.7624,"label":"Sep 6, 18","changeOverTime":0.21391575264378657},
{"date":"2018-09-07","open":221.0786,"high":224.5864,"low":219.9426,"close":220.5305,"volume":37619810,"unadjustedVolume":37619810,"change":-1.7937,"changePercent":-0.807,"vwap":222.4248,"label":"Sep 7, 18","changeOverTime":0.20412140233168652},
{"date":"2018-09-10","open":220.1818,"high":221.0786,"low":215.7173,"close":217.5709,"volume":39516453,"unadjustedVolume":39516453,"change":-2.9597,"changePercent":-1.342,"vwap":217.4712,"label":"Sep 10, 18","changeOverTime":0.18796165253589475},
{"date":"2018-09-11","open":217.252,"high":223.5191,"low":215.807,"close":223.0717,"volume":35749049,"unadjustedVolume":35749049,"change":5.5008,"changePercent":2.528,"vwap":221.1192,"label":"Sep 11, 18","changeOverTime":0.21799664093861518},
{"date":"2018-09-12","open":224.1579,"high":224.2177,"low":219.0756,"close":220.3013,"volume":49278740,"unadjustedVolume":49278740,"change":-2.7703,"changePercent":-1.242,"vwap":220.9347,"label":"Sep 12, 18","changeOverTime":0.2028699444815732},
{"date":"2018-09-13","open":222.7428,"high":227.556,"low":221.7961,"close":225.6228,"volume":41706377,"unadjustedVolume":41706377,"change":5.3214,"changePercent":2.416,"vwap":225.1469,"label":"Sep 13, 18","changeOverTime":0.23192593466210645},
{"date":"2018-09-14","open":224.9651,"high":226.0513,"low":221.7483,"close":223.0617,"volume":31999289,"unadjustedVolume":31999289,"change":-2.5611,"changePercent":-1.135,"vwap":223.5391,"label":"Sep 14, 18","changeOverTime":0.21794203981077434},
{"date":"2018-09-17","open":221.3776,"high":222.1748,"low":216.5146,"close":217.1224,"volume":37195133,"unadjustedVolume":37195133,"change":-5.9393,"changePercent":-2.663,"vwap":218.8461,"label":"Sep 17, 18","changeOverTime":0.18551279195223055},
{"date":"2018-09-18","open":217.0327,"high":221.0786,"low":216.3651,"close":217.4812,"volume":31571712,"unadjustedVolume":31571712,"change":0.358749,"changePercent":0.165,"vwap":218.6928,"label":"Sep 18, 18","changeOverTime":0.18747188041916193},
{"date":"2018-09-19","open":217.7403,"high":218.8564,"low":214.5514,"close":217.6107,"volume":27123833,"unadjustedVolume":27123833,"change":0.129548,"changePercent":0.06,"vwap":216.6509,"label":"Sep 19, 18","changeOverTime":0.1881789650247016},
{"date":"2018-09-20","open":219.4742,"high":221.5071,"low":218.388,"close":219.265,"volume":26608794,"unadjustedVolume":26608794,"change":1.6542,"changePercent":0.76,"vwap":219.9999,"label":"Sep 20, 18","changeOverTime":0.197211629603421},
{"date":"2018-09-21","open":220.0123,"high":220.5903,"low":216.5345,"close":216.9032,"volume":96246748,"unadjustedVolume":96246748,"change":-2.3618,"changePercent":-1.077,"vwap":217.7347,"label":"Sep 21, 18","changeOverTime":0.1843159352299581},
{"date":"2018-09-24","open":216.0661,"high":220.4907,"low":215.8768,"close":220.0223,"volume":27693358,"unadjustedVolume":27693358,"change":3.1191,"changePercent":1.438,"vwap":218.6857,"label":"Sep 24, 18","changeOverTime":0.2013465730148122},
{"date":"2018-09-25","open":218.9859,"high":222.0453,"low":218.9361,"close":221.4174,"volume":24554379,"unadjustedVolume":24554379,"change":1.3951,"changePercent":0.634,"vwap":220.8589,"label":"Sep 25, 18","changeOverTime":0.2089639763598956},
{"date":"2018-09-26","open":220.2316,"high":222.972,"low":218.9959,"close":219.6536,"volume":23984706,"unadjustedVolume":23984706,"change":-1.7638,"changePercent":-0.797,"vwap":221.1197,"label":"Sep 26, 18","changeOverTime":0.1993334294313184},
{"date":"2018-09-27","open":223.0418,"high":225.6527,"low":222.7628,"close":224.1678,"volume":30181227,"unadjustedVolume":30181227,"change":4.5142,"changePercent":2.055,"vwap":224.3829,"label":"Sep 27, 18","changeOverTime":0.22398147056125592},
{"date":"2018-09-28","open":224.0084,"high":225.0548,"low":223.2411,"close":224.9551,"volume":22929364,"unadjustedVolume":22929364,"change":0.787253,"changePercent":0.351,"vwap":224.3687,"label":"Sep 28, 18","changeOverTime":0.22828021735616963},
{"date":"2018-10-01","open":227.1574,"high":228.6223,"low":225.563,"close":226.4698,"volume":23600802,"unadjustedVolume":23600802,"change":1.5147,"changePercent":0.673,"vwap":227.2574,"label":"Oct 1, 18","changeOverTime":0.23655065019023028},
{"date":"2018-10-02","open":226.4599,"high":229.2003,"low":225.842,"close":228.4828,"volume":24788170,"unadjustedVolume":24788170,"change":2.013,"changePercent":0.889,"vwap":228.2469,"label":"Oct 2, 18","changeOverTime":0.2475418572246028},
{"date":"2018-10-03","open":229.2501,"high":232.6582,"low":228.9811,"close":231.2631,"volume":28654799,"unadjustedVolume":28654799,"change":2.7803,"changePercent":1.217,"vwap":231.4269,"label":"Oct 3, 18","changeOverTime":0.26272260879820736},
{"date":"2018-10-04","open":229.9776,"high":231.5421,"low":225.9417,"close":227.1973,"volume":32042000,"unadjustedVolume":32042000,"change":-4.0658,"changePercent":-1.758,"vwap":227.9985,"label":"Oct 4, 18","changeOverTime":0.24052288224065563},
{"date":"2018-10-05","open":227.1674,"high":227.6158,"low":219.813,"close":223.5101,"volume":33580463,"unadjustedVolume":33580463,"change":-3.6871,"changePercent":-1.623,"vwap":223.5999,"label":"Oct 5, 18","changeOverTime":0.2203903543831601},
{"date":"2018-10-08","open":221.4374,"high":224.0184,"low":219.4344,"close":222.992,"volume":29663923,"unadjustedVolume":29663923,"change":-0.518192,"changePercent":-0.232,"vwap":222.0075,"label":"Oct 8, 18","changeOverTime":0.21756146994972322},
{"date":"2018-10-09","open":222.8624,"high":226.4798,"low":221.4735,"close":226.0812,"volume":26891029,"unadjustedVolume":26891029,"change":3.0892,"changePercent":1.385,"vwap":224.8239,"label":"Oct 9, 18","changeOverTime":0.23442885036233307},
{"date":"2018-10-10","open":224.6761,"high":225.563,"low":215.2988,"close":215.6077,"volume":41990554,"unadjustedVolume":41990554,"change":-10.4735,"changePercent":-4.633,"vwap":220.2722,"label":"Oct 10, 18","changeOverTime":0.1772423591181699},
{"date":"2018-10-11","open":213.7741,"high":218.7368,"low":211.5818,"close":213.7044,"volume":53124392,"unadjustedVolume":53124392,"change":-1.9034,"changePercent":-0.883,"vwap":215.0777,"label":"Oct 11, 18","changeOverTime":0.16685012645621203},
{"date":"2018-10-12","open":219.6536,"high":222.105,"low":216.086,"close":221.3377,"volume":40337851,"unadjustedVolume":40337851,"change":7.6334,"changePercent":3.572,"vwap":219.6263,"label":"Oct 12, 18","changeOverTime":0.20852880537100382},
{"date":"2018-10-15","open":220.391,"high":221.0587,"low":216.5146,"close":216.6042,"volume":30791007,"unadjustedVolume":30791007,"change":-4.7335,"changePercent":-2.139,"vwap":217.9779,"label":"Oct 15, 18","changeOverTime":0.18268336150751524},
{"date":"2018-10-16","open":218.1688,"high":222.2147,"low":216.009,"close":221.3776,"volume":29183963,"unadjustedVolume":29183963,"change":4.7733,"changePercent":2.204,"vwap":219.2339,"label":"Oct 16, 18","changeOverTime":0.20874666387108892},
{"date":"2018-10-17","open":221.5271,"high":221.8659,"low":218.5774,"close":220.4209,"volume":22885397,"unadjustedVolume":22885397,"change":-0.956662,"changePercent":-0.432,"vwap":220.2394,"label":"Oct 17, 18","changeOverTime":0.20352297397055027},
{"date":"2018-10-18","open":217.1025,"high":218.976,"low":212.2594,"close":215.2689,"volume":32581315,"unadjustedVolume":32581315,"change":-5.152,"changePercent":-2.337,"vwap":216.23,"label":"Oct 18, 18","changeOverTime":0.17539247290692037},
{"date":"2018-10-19","open":217.3018,"high":220.4907,"low":216.674,"close":218.5475,"volume":33078726,"unadjustedVolume":33078726,"change":3.2786,"changePercent":1.523,"vwap":218.5974,"label":"Oct 19, 18","changeOverTime":0.19329399868083683},
{"date":"2018-10-22","open":219.0258,"high":222.5834,"low":218.1787,"close":219.8828,"volume":28792082,"unadjustedVolume":28792082,"change":1.3353,"changePercent":0.611,"vwap":220.5185,"label":"Oct 22, 18","changeOverTime":0.2005848872814317},
{"date":"2018-10-23","open":215.0796,"high":222.4738,"low":213.9535,"close":221.9556,"volume":38767846,"unadjustedVolume":38767846,"change":2.0728,"changePercent":0.943,"vwap":218.0573,"label":"Oct 23, 18","changeOverTime":0.21190260906029276},
{"date":"2018-10-24","open":221.826,"high":223.4504,"low":213.794,"close":214.3421,"volume":40925163,"unadjustedVolume":40925163,"change":-7.6134,"changePercent":-3.43,"vwap":218.6682,"label":"Oct 24, 18","changeOverTime":0.17033204037862598},
{"date":"2018-10-25","open":216.953,"high":220.6103,"low":215.9964,"close":219.0358,"volume":29855768,"unadjustedVolume":29855768,"change":4.6936,"changePercent":2.19,"vwap":218.6828,"label":"Oct 25, 18","changeOverTime":0.1959601717533077},
{"date":"2018-10-26","open":215.1493,"high":219.4244,"low":211.9305,"close":215.5479,"volume":47258375,"unadjustedVolume":47258375,"change":-3.4878,"changePercent":-1.592,"vwap":215.4815,"label":"Oct 26, 18","changeOverTime":0.17691584437368138},
{"date":"2018-10-29","open":218.4279,"high":218.9261,"low":205.3734,"close":211.502,"volume":45935520,"unadjustedVolume":45935520,"change":-4.0459,"changePercent":-1.877,"vwap":213.8345,"label":"Oct 29, 18","changeOverTime":0.15482477406053305},
{"date":"2018-10-30","open":210.4158,"high":214.4318,"low":208.5424,"close":212.5584,"volume":36659990,"unadjustedVolume":36659990,"change":1.0563,"changePercent":0.499,"vwap":212.0577,"label":"Oct 30, 18","changeOverTime":0.16059283720564535},
{"date":"2018-10-31","open":216.1259,"high":219.6835,"low":215.8668,"close":218.099,"volume":38358933,"unadjustedVolume":38358933,"change":5.5407,"changePercent":2.607,"vwap":218.1614,"label":"Oct 31, 18","changeOverTime":0.1908451380971725},
{"date":"2018-11-01","open":218.2884,"high":221.5869,"low":216.0562,"close":221.4473,"volume":58323180,"unadjustedVolume":58323180,"change":3.3483,"changePercent":1.535,"vwap":218.8588,"label":"Nov 1, 18","changeOverTime":0.20912723373214004},
{"date":"2018-11-02","open":208.8214,"high":212.9071,"low":204.7157,"close":206.7586,"volume":91328654,"unadjustedVolume":91328654,"change":-14.6887,"changePercent":-6.633,"vwap":207.2844,"label":"Nov 2, 18","changeOverTime":0.12892527508048207},
{"date":"2018-11-05","open":203.5896,"high":203.6793,"low":197.481,"close":200.8891,"volume":66163669,"unadjustedVolume":66163669,"change":-5.8695,"changePercent":-2.839,"vwap":200.1058,"label":"Nov 5, 18","changeOverTime":0.09687714309426783},
{"date":"2018-11-06","open":201.2179,"high":204.0082,"low":200.9887,"close":203.0615,"volume":31882881,"unadjustedVolume":31882881,"change":2.1724,"changePercent":1.081,"vwap":202.542,"label":"Nov 6, 18","changeOverTime":0.10873869210642413},
{"date":"2018-11-07","open":205.2538,"high":209.3296,"low":203.4202,"close":209.22,"volume":33424434,"unadjustedVolume":33424434,"change":6.1585,"changePercent":3.033,"vwap":206.5064,"label":"Nov 7, 18","changeOverTime":0.14236479668724036},
{"date":"2018-11-08","open":209.98,"high":210.12,"low":206.75,"close":208.49,"volume":25362636,"unadjustedVolume":25362636,"change":-0.730004,"changePercent":-0.349,"vwap":208.0776,"label":"Nov 8, 18","changeOverTime":0.13837891435485497},
{"date":"2018-11-09","open":205.55,"high":206.01,"low":202.25,"close":204.47,"volume":34365750,"unadjustedVolume":34365750,"change":-4.02,"changePercent":-1.928,"vwap":204.1159,"label":"Nov 9, 18","changeOverTime":0.11642926096281445},
{"date":"2018-11-12","open":199,"high":199.85,"low":193.79,"close":194.17,"volume":51135518,"unadjustedVolume":51135518,"change":-10.3,"changePercent":-5.037,"vwap":195.5708,"label":"Nov 12, 18","changeOverTime":0.0601900992866908},
{"date":"2018-11-13","open":191.63,"high":197.18,"low":191.4501,"close":192.23,"volume":46882936,"unadjustedVolume":46882936,"change":-1.94,"changePercent":-0.999,"vwap":193.7888,"label":"Nov 13, 18","changeOverTime":0.04959748048555686},
{"date":"2018-11-14","open":193.9,"high":194.48,"low":185.93,"close":186.8,"volume":60800957,"unadjustedVolume":60800957,"change":-5.43,"changePercent":-2.825,"vwap":188.6527,"label":"Nov 14, 18","changeOverTime":0.019949068067950073},
{"date":"2018-11-15","open":188.39,"high":191.97,"low":186.9,"close":191.41,"volume":46478801,"unadjustedVolume":46478801,"change":4.61,"changePercent":2.468,"vwap":189.8177,"label":"Nov 15, 18","changeOverTime":0.04512018800260336},
{"date":"2018-11-16","open":190.5,"high":194.9695,"low":189.46,"close":193.53,"volume":36928253,"unadjustedVolume":36928253,"change":2.12,"changePercent":1.108,"vwap":193.1617,"label":"Nov 16, 18","changeOverTime":0.05669562710487348},
{"date":"2018-11-19","open":190,"high":190.7,"low":184.99,"close":185.86,"volume":41920872,"unadjustedVolume":41920872,"change":-7.67,"changePercent":-3.963,"vwap":186.9198,"label":"Nov 19, 18","changeOverTime":0.014816562050905799},
{"date":"2018-11-20","open":178.37,"high":181.47,"low":175.51,"close":176.98,"volume":67825247,"unadjustedVolume":67825247,"change":-8.88,"changePercent":-4.778,"vwap":178.4357,"label":"Nov 20, 18","changeOverTime":-0.03366923947181059},
{"date":"2018-11-21","open":179.73,"high":180.27,"low":176.55,"close":176.78,"volume":31124210,"unadjustedVolume":31124210,"change":-0.2,"changePercent":-0.113,"vwap":177.9581,"label":"Nov 21, 18","changeOverTime":-0.034761262028628455},
{"date":"2018-11-23","open":174.94,"high":176.595,"low":172.1,"close":172.29,"volume":23623972,"unadjustedVolume":23623972,"change":-4.49,"changePercent":-2.54,"vwap":173.9189,"label":"Nov 23, 18","changeOverTime":-0.05927716842919112},
{"date":"2018-11-26","open":174.24,"high":174.95,"low":170.26,"close":174.62,"volume":44998520,"unadjustedVolume":44998520,"change":2.33,"changePercent":1.352,"vwap":173.0331,"label":"Nov 26","changeOverTime":-0.04655510564226212},
{"date":"2018-11-27","open":171.51,"high":174.77,"low":170.88,"close":174.24,"volume":41387377,"unadjustedVolume":41387377,"change":-0.38,"changePercent":-0.218,"vwap":173.289,"label":"Nov 27","changeOverTime":-0.04862994850021617},
{"date":"2018-11-28","open":176.73,"high":181.29,"low":174.93,"close":180.94,"volume":46062539,"unadjustedVolume":46062539,"change":6.7,"changePercent":3.845,"vwap":178.1889,"label":"Nov 28","changeOverTime":-0.012047192846815456},
{"date":"2018-11-29","open":182.66,"high":182.8,"low":177.7,"close":179.55,"volume":41769992,"unadjustedVolume":41769992,"change":-1.39,"changePercent":-0.768,"vwap":179.3465,"label":"Nov 29","changeOverTime":-0.01963674961670002},
{"date":"2018-11-30","open":180.29,"high":180.33,"low":177.03,"close":178.58,"volume":39531549,"unadjustedVolume":39531549,"change":-0.97,"changePercent":-0.54,"vwap":178.2914,"label":"Nov 30","changeOverTime":-0.02493305901726699},
{"date":"2018-12-03","open":184.46,"high":184.94,"low":181.21,"close":184.82,"volume":40798002,"unadjustedVolume":40798002,"change":6.24,"changePercent":3.494,"vwap":182.9573,"label":"Dec 3","changeOverTime":0.009138044755452433},
{"date":"2018-12-04","open":180.95,"high":182.3899,"low":176.27,"close":176.69,"volume":41344282,"unadjustedVolume":41344282,"change":-8.13,"changePercent":-4.399,"vwap":178.7221,"label":"Dec 4","changeOverTime":-0.035252672179196545},
{"date":"2018-12-06","open":171.76,"high":174.78,"low":170.42,"close":174.72,"volume":43098410,"unadjustedVolume":43098410,"change":-1.97,"changePercent":-1.115,"vwap":172.4285,"label":"Dec 6","changeOverTime":-0.046009094363853184},
{"date":"2018-12-07","open":173.49,"high":174.49,"low":168.3,"close":168.49,"volume":42281631,"unadjustedVolume":42281631,"change":-6.23,"changePercent":-3.566,"vwap":170.4207,"label":"Dec 7","changeOverTime":-0.08002559700873176},
{"date":"2018-12-10","open":165,"high":170.09,"low":163.33,"close":169.6,"volume":62025994,"unadjustedVolume":62025994,"change":1.11,"changePercent":0.659,"vwap":166.9123,"label":"Dec 10","changeOverTime":-0.07396487181839231},
{"date":"2018-12-11","open":171.66,"high":171.79,"low":167,"close":168.63,"volume":47281665,"unadjustedVolume":47281665,"change":-0.97,"changePercent":-0.572,"vwap":168.9359,"label":"Dec 11","changeOverTime":-0.07926118121895928},
{"date":"2018-12-12","open":170.4,"high":171.92,"low":169.02,"close":169.1,"volume":35627674,"unadjustedVolume":35627674,"change":0.47,"changePercent":0.279,"vwap":170.3124,"label":"Dec 12","changeOverTime":-0.07669492821043715},
{"date":"2018-12-13","open":170.49,"high":172.57,"low":169.55,"close":170.95,"volume":31897827,"unadjustedVolume":31897827,"change":1.85,"changePercent":1.094,"vwap":170.9691,"label":"Dec 13","changeOverTime":-0.06659371955987128},
{"date":"2018-12-14","open":169,"high":169.08,"low":165.28,"close":165.48,"volume":40703710,"unadjustedVolume":40703710,"change":-5.47,"changePercent":-3.2,"vwap":166.6283,"label":"Dec 14","changeOverTime":-0.09646053648884177},
{"date":"2018-12-17","open":165.45,"high":168.35,"low":162.73,"close":163.94,"volume":44287922,"unadjustedVolume":44287922,"change":-1.54,"changePercent":-0.931,"vwap":165.495,"label":"Dec 17","changeOverTime":-0.10486911017633982},
{"date":"2018-12-18","open":165.38,"high":167.53,"low":164.39,"close":166.07,"volume":33841518,"unadjustedVolume":33841518,"change":2.13,"changePercent":1.299,"vwap":165.89,"label":"Dec 18","changeOverTime":-0.09323906994622884},
{"date":"2018-12-19","open":166,"high":167.45,"low":159.09,"close":160.89,"volume":49047297,"unadjustedVolume":49047297,"change":-5.18,"changePercent":-3.119,"vwap":163.2712,"label":"Dec 19","changeOverTime":-0.12152245416781336},
{"date":"2018-12-20","open":160.4,"high":162.11,"low":155.3,"close":156.83,"volume":64772960,"unadjustedVolume":64772960,"change":-4.06,"changePercent":-2.523,"vwap":158.3974,"label":"Dec 20","changeOverTime":-0.14369051207121727},
{"date":"2018-12-21","open":156.86,"high":158.16,"low":149.63,"close":150.73,"volume":95744384,"unadjustedVolume":95744384,"change":-6.1,"changePercent":-3.89,"vwap":153.0778,"label":"Dec 21","changeOverTime":-0.17699720005416436},
{"date":"2018-12-24","open":148.15,"high":151.55,"low":146.59,"close":146.83,"volume":37169232,"unadjustedVolume":37169232,"change":-3.9,"changePercent":-2.587,"vwap":148.759,"label":"Dec 24","changeOverTime":-0.19829163991211396}];

const scaledData = raw6m.map(scaleDown);

const length = scaledData.length;
const trainingData = [
  scaledData.slice(0, scaledData.length * (1/4)),
  scaledData.slice(scaledData.length * (1/4), scaledData.length / 2),
  scaledData.slice(scaledData.length / 2, scaledData.length * (3/4)),
  scaledData.slice(scaledData.length * (3/4), scaledData.length),
]

const net = new brain.recurrent.LSTMTimeStep({
  inputSize: 5,
  hiddenLayers: [8, 8],
  outputSize: 5
});

net.train(trainingData, { 
  learningRate: 0.005, 
  errorThresh: 0.02
});

console.log(trainingData)

console.log(scaleUp(net.run(trainingData[3])));







