/*
 * The Original Code is Mozilla Universal charset detector code.
 *
 * The Initial Developer of the Original Code is
 * Netscape Communications Corporation.
 * Portions created by the Initial Developer are Copyright (C) 2001
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   António Afonso (antonio.afonso gmail.com) - port to JavaScript
 *   Mark Pilgrim - port to Python
 *   Shy Shalom - original C code
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 * 
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 * 
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA
 * 02110-1301  USA
 */

!function(jschardet) {
    
// GB2312 most frequently used character table
//
// Char to FreqOrder table , from hz6763

// 512  --> 0.79  -- 0.79
// 1024 --> 0.92  -- 0.13
// 2048 --> 0.98  -- 0.06
// 6768 --> 1.00  -- 0.02
//
// Ideal Distribution Ratio = 0.79135/(1-0.79135) = 3.79
// Random Distribution Ration = 512 / (3755 - 512) = 0.157
// 
// Typical Distribution Ratio about 25% of Ideal one, still much higher that RDR

jschardet.GB2312_TYPICAL_DISTRIBUTION_RATIO = 0.9;

jschardet.GB2312_TABLE_SIZE = 3760;

jschardet.GB2312CharToFreqOrder = [
1671, 749,1443,2364,3924,3807,2330,3921,1704,3463,2691,1511,1515, 572,3191,2205,
2361, 224,2558, 479,1711, 963,3162, 440,4060,1905,2966,2947,3580,2647,3961,3842,
2204, 869,4207, 970,2678,5626,2944,2956,1479,4048, 514,3595, 588,1346,2820,3409,
 249,4088,1746,1873,2047,1774, 581,1813, 358,1174,3590,1014,1561,4844,2245, 670,
1636,3112, 889,1286, 953, 556,2327,3060,1290,3141, 613, 185,3477,1367, 850,3820,
1715,2428,2642,2303,2732,3041,2562,2648,3566,3946,1349, 388,3098,2091,1360,3585,
 152,1687,1539, 738,1559,  59,1232,2925,2267,1388,1249,1741,1679,2960, 151,1566,
1125,1352,4271, 924,4296, 385,3166,4459, 310,1245,2850,  70,3285,2729,3534,3575,
2398,3298,3466,1960,2265, 217,3647, 864,1909,2084,4401,2773,1010,3269,5152, 853,
3051,3121,1244,4251,1895, 364,1499,1540,2313,1180,3655,2268, 562, 715,2417,3061,
 544, 336,3768,2380,1752,4075, 950, 280,2425,4382, 183,2759,3272, 333,4297,2155,
1688,2356,1444,1039,4540, 736,1177,3349,2443,2368,2144,2225, 565, 196,1482,3406,
 927,1335,4147, 692, 878,1311,1653,3911,3622,1378,4200,1840,2969,3149,2126,1816,
2534,1546,2393,2760, 737,2494,  13, 447, 245,2747,  38,2765,2129,2589,1079, 606,
 360, 471,3755,2890, 404, 848, 699,1785,1236, 370,2221,1023,3746,2074,2026,2023,
2388,1581,2119, 812,1141,3091,2536,1519, 804,2053, 406,1596,1090, 784, 548,4414,
1806,2264,2936,1100, 343,4114,5096, 622,3358, 743,3668,1510,1626,5020,3567,2513,
3195,4115,5627,2489,2991,  24,2065,2697,1087,2719,  48,1634, 315,  68, 985,2052,
 198,2239,1347,1107,1439, 597,2366,2172, 871,3307, 919,2487,2790,1867, 236,2570,
1413,3794, 906,3365,3381,1701,1982,1818,1524,2924,1205, 616,2586,2072,2004, 575,
 253,3099,  32,1365,1182, 197,1714,2454,1201, 554,3388,3224,2748, 756,2587, 250,
2567,1507,1517,3529,1922,2761,2337,3416,1961,1677,2452,2238,3153, 615, 911,1506,
1474,2495,1265,1906,2749,3756,3280,2161, 898,2714,1759,3450,2243,2444, 563,  26,
3286,2266,3769,3344,2707,3677, 611,1402, 531,1028,2871,4548,1375, 261,2948, 835,
1190,4134, 353, 840,2684,1900,3082,1435,2109,1207,1674, 329,1872,2781,4055,2686,
2104, 608,3318,2423,2957,2768,1108,3739,3512,3271,3985,2203,1771,3520,1418,2054,
1681,1153, 225,1627,2929, 162,2050,2511,3687,1954, 124,1859,2431,1684,3032,2894,
 585,4805,3969,2869,2704,2088,2032,2095,3656,2635,4362,2209, 256, 518,2042,2105,
3777,3657, 643,2298,1148,1779, 190, 989,3544, 414,  11,2135,2063,2979,1471, 403,
3678, 126, 770,1563, 671,2499,3216,2877, 600,1179, 307,2805,4937,1268,1297,2694,
 252,4032,1448,1494,1331,1394, 127,2256, 222,1647,1035,1481,3056,1915,1048, 873,
3651, 210,  33,1608,2516, 200,1520, 415, 102,   0,3389,1287, 817,  91,3299,2940,
 836,1814, 549,2197,1396,1669,2987,3582,2297,2848,4528,1070, 687,  20,1819, 121,
1552,1364,1461,1968,2617,3540,2824,2083, 177, 948,4938,2291, 110,4549,2066, 648,
3359,1755,2110,2114,4642,4845,1693,3937,3308,1257,1869,2123, 208,1804,3159,2992,
2531,2549,3361,2418,1350,2347,2800,2568,1291,2036,2680,  72, 842,1990, 212,1233,
1154,1586,  75,2027,3410,4900,1823,1337,2710,2676, 728,2810,1522,3026,4995, 157,
 755,1050,4022, 710, 785,1936,2194,2085,1406,2777,2400, 150,1250,4049,1206, 807,
1910, 534, 529,3309,1721,1660, 274,  39,2827, 661,2670,1578, 925,3248,3815,1094,
4278,4901,4252,  41,1150,3747,2572,2227,4501,3658,4902,3813,3357,3617,2884,2258,
 887, 538,4187,3199,1294,2439,3042,2329,2343,2497,1255, 107, 543,1527, 521,3478,
3568, 194,5062,  15, 961,3870,1241,1192,2664,  66,5215,3260,2111,1295,1127,2152,
3805,4135, 901,1164,1976, 398,1278, 530,1460, 748, 904,1054,1966,1426,  53,2909,
 509, 523,2279,1534, 536,1019, 239,1685, 460,2353, 673,1065,2401,3600,4298,2272,
1272,2363, 284,1753,3679,4064,1695,  81, 815,2677,2757,2731,1386, 859, 500,4221,
2190,2566, 757,1006,2519,2068,1166,1455, 337,2654,3203,1863,1682,1914,3025,1252,
1409,1366, 847, 714,2834,2038,3209, 964,2970,1901, 885,2553,1078,1756,3049, 301,
1572,3326, 688,2130,1996,2429,1805,1648,2930,3421,2750,3652,3088, 262,1158,1254,
 389,1641,1812, 526,1719, 923,2073,1073,1902, 468, 489,4625,1140, 857,2375,3070,
3319,2863, 380, 116,1328,2693,1161,2244, 273,1212,1884,2769,3011,1775,1142, 461,
3066,1200,2147,2212, 790, 702,2695,4222,1601,1058, 434,2338,5153,3640,  67,2360,
4099,2502, 618,3472,1329, 416,1132, 830,2782,1807,2653,3211,3510,1662, 192,2124,
 296,3979,1739,1611,3684,  23, 118, 324, 446,1239,1225, 293,2520,3814,3795,2535,
3116,  17,1074, 467,2692,2201, 387,2922,  45,1326,3055,1645,3659,2817, 958, 243,
1903,2320,1339,2825,1784,3289, 356, 576, 865,2315,2381,3377,3916,1088,3122,1713,
1655, 935, 628,4689,1034,1327, 441, 800, 720, 894,1979,2183,1528,5289,2702,1071,
4046,3572,2399,1571,3281,  79, 761,1103, 327, 134, 758,1899,1371,1615, 879, 442,
 215,2605,2579, 173,2048,2485,1057,2975,3317,1097,2253,3801,4263,1403,1650,2946,
 814,4968,3487,1548,2644,1567,1285,   2, 295,2636,  97, 946,3576, 832, 141,4257,
3273, 760,3821,3521,3156,2607, 949,1024,1733,1516,1803,1920,2125,2283,2665,3180,
1501,2064,3560,2171,1592, 803,3518,1416, 732,3897,4258,1363,1362,2458, 119,1427,
 602,1525,2608,1605,1639,3175, 694,3064,  10, 465,  76,2000,4846,4208, 444,3781,
1619,3353,2206,1273,3796, 740,2483, 320,1723,2377,3660,2619,1359,1137,1762,1724,
2345,2842,1850,1862, 912, 821,1866, 612,2625,1735,2573,3369,1093, 844,  89, 937,
 930,1424,3564,2413,2972,1004,3046,3019,2011, 711,3171,1452,4178, 428, 801,1943,
 432, 445,2811, 206,4136,1472, 730, 349,  73, 397,2802,2547, 998,1637,1167, 789,
 396,3217, 154,1218, 716,1120,1780,2819,4826,1931,3334,3762,2139,1215,2627, 552,
3664,3628,3232,1405,2383,3111,1356,2652,3577,3320,3101,1703, 640,1045,1370,1246,
4996, 371,1575,2436,1621,2210, 984,4033,1734,2638,  16,4529, 663,2755,3255,1451,
3917,2257,1253,1955,2234,1263,2951, 214,1229, 617, 485, 359,1831,1969, 473,2310,
 750,2058, 165,  80,2864,2419, 361,4344,2416,2479,1134, 796,3726,1266,2943, 860,
2715, 938, 390,2734,1313,1384, 248, 202, 877,1064,2854, 522,3907, 279,1602, 297,
2357, 395,3740, 137,2075, 944,4089,2584,1267,3802,  62,1533,2285, 178, 176, 780,
2440, 201,3707, 590, 478,1560,4354,2117,1075,  30,  74,4643,4004,1635,1441,2745,
 776,2596, 238,1077,1692,1912,2844, 605, 499,1742,3947, 241,3053, 980,1749, 936,
2640,4511,2582, 515,1543,2162,5322,2892,2993, 890,2148,1924, 665,1827,3581,1032,
 968,3163, 339,1044,1896, 270, 583,1791,1720,4367,1194,3488,3669,  43,2523,1657,
 163,2167, 290,1209,1622,3378, 550, 634,2508,2510, 695,2634,2384,2512,1476,1414,
 220,1469,2341,2138,2852,3183,2900,4939,2865,3502,1211,3680, 854,3227,1299,2976,
3172, 186,2998,1459, 443,1067,3251,1495, 321,1932,3054, 909, 753,1410,1828, 436,
2441,1119,1587,3164,2186,1258, 227, 231,1425,1890,3200,3942, 247, 959, 725,5254,
2741, 577,2158,2079, 929, 120, 174, 838,2813, 591,1115, 417,2024,  40,3240,1536,
1037, 291,4151,2354, 632,1298,2406,2500,3535,1825,1846,3451, 205,1171, 345,4238,
  18,1163, 811, 685,2208,1217, 425,1312,1508,1175,4308,2552,1033, 587,1381,3059,
2984,3482, 340,1316,4023,3972, 792,3176, 519, 777,4690, 918, 933,4130,2981,3741,
  90,3360,2911,2200,5184,4550, 609,3079,2030, 272,3379,2736, 363,3881,1130,1447,
 286, 779, 357,1169,3350,3137,1630,1220,2687,2391, 747,1277,3688,2618,2682,2601,
1156,3196,5290,4034,3102,1689,3596,3128, 874, 219,2783, 798, 508,1843,2461, 269,
1658,1776,1392,1913,2983,3287,2866,2159,2372, 829,4076,  46,4253,2873,1889,1894,
 915,1834,1631,2181,2318, 298, 664,2818,3555,2735, 954,3228,3117, 527,3511,2173,
 681,2712,3033,2247,2346,3467,1652, 155,2164,3382, 113,1994, 450, 899, 494, 994,
1237,2958,1875,2336,1926,3727, 545,1577,1550, 633,3473, 204,1305,3072,2410,1956,
2471, 707,2134, 841,2195,2196,2663,3843,1026,4940, 990,3252,4997, 368,1092, 437,
3212,3258,1933,1829, 675,2977,2893, 412, 943,3723,4644,3294,3283,2230,2373,5154,
2389,2241,2661,2323,1404,2524, 593, 787, 677,3008,1275,2059, 438,2709,2609,2240,
2269,2246,1446,  36,1568,1373,3892,1574,2301,1456,3962, 693,2276,5216,2035,1143,
2720,1919,1797,1811,2763,4137,2597,1830,1699,1488,1198,2090, 424,1694, 312,3634,
3390,4179,3335,2252,1214, 561,1059,3243,2295,2561, 975,5155,2321,2751,3772, 472,
1537,3282,3398,1047,2077,2348,2878,1323,3340,3076, 690,2906,  51, 369, 170,3541,
1060,2187,2688,3670,2541,1083,1683, 928,3918, 459, 109,4427, 599,3744,4286, 143,
2101,2730,2490,  82,1588,3036,2121, 281,1860, 477,4035,1238,2812,3020,2716,3312,
1530,2188,2055,1317, 843, 636,1808,1173,3495, 649, 181,1002, 147,3641,1159,2414,
3750,2289,2795, 813,3123,2610,1136,4368,   5,3391,4541,2174, 420, 429,1728, 754,
1228,2115,2219, 347,2223,2733, 735,1518,3003,2355,3134,1764,3948,3329,1888,2424,
1001,1234,1972,3321,3363,1672,1021,1450,1584, 226, 765, 655,2526,3404,3244,2302,
3665, 731, 594,2184, 319,1576, 621, 658,2656,4299,2099,3864,1279,2071,2598,2739,
 795,3086,3699,3908,1707,2352,2402,1382,3136,2475,1465,4847,3496,3865,1085,3004,
2591,1084, 213,2287,1963,3565,2250, 822, 793,4574,3187,1772,1789,3050, 595,1484,
1959,2770,1080,2650, 456, 422,2996, 940,3322,4328,4345,3092,2742, 965,2784, 739,
4124, 952,1358,2498,2949,2565, 332,2698,2378, 660,2260,2473,4194,3856,2919, 535,
1260,2651,1208,1428,1300,1949,1303,2942, 433,2455,2450,1251,1946, 614,1269, 641,
1306,1810,2737,3078,2912, 564,2365,1419,1415,1497,4460,2367,2185,1379,3005,1307,
3218,2175,1897,3063, 682,1157,4040,4005,1712,1160,1941,1399, 394, 402,2952,1573,
1151,2986,2404, 862, 299,2033,1489,3006, 346, 171,2886,3401,1726,2932, 168,2533,
  47,2507,1030,3735,1145,3370,1395,1318,1579,3609,4560,2857,4116,1457,2529,1965,
 504,1036,2690,2988,2405, 745,5871, 849,2397,2056,3081, 863,2359,3857,2096,  99,
1397,1769,2300,4428,1643,3455,1978,1757,3718,1440,  35,4879,3742,1296,4228,2280,
 160,5063,1599,2013, 166, 520,3479,1646,3345,3012, 490,1937,1545,1264,2182,2505,
1096,1188,1369,1436,2421,1667,2792,2460,1270,2122, 727,3167,2143, 806,1706,1012,
1800,3037, 960,2218,1882, 805, 139,2456,1139,1521, 851,1052,3093,3089, 342,2039,
 744,5097,1468,1502,1585,2087, 223, 939, 326,2140,2577, 892,2481,1623,4077, 982,
3708, 135,2131,  87,2503,3114,2326,1106, 876,1616, 547,2997,2831,2093,3441,4530,
4314,   9,3256,4229,4148, 659,1462,1986,1710,2046,2913,2231,4090,4880,5255,3392,
3274,1368,3689,4645,1477, 705,3384,3635,1068,1529,2941,1458,3782,1509, 100,1656,
2548, 718,2339, 408,1590,2780,3548,1838,4117,3719,1345,3530, 717,3442,2778,3220,
2898,1892,4590,3614,3371,2043,1998,1224,3483, 891, 635, 584,2559,3355, 733,1766,
1729,1172,3789,1891,2307, 781,2982,2271,1957,1580,5773,2633,2005,4195,3097,1535,
3213,1189,1934,5693,3262, 586,3118,1324,1598, 517,1564,2217,1868,1893,4445,3728,
2703,3139,1526,1787,1992,3882,2875,1549,1199,1056,2224,1904,2711,5098,4287, 338,
1993,3129,3489,2689,1809,2815,1997, 957,1855,3898,2550,3275,3057,1105,1319, 627,
1505,1911,1883,3526, 698,3629,3456,1833,1431, 746,  77,1261,2017,2296,1977,1885,
 125,1334,1600, 525,1798,1109,2222,1470,1945, 559,2236,1186,3443,2476,1929,1411,
2411,3135,1777,3372,2621,1841,1613,3229, 668,1430,1839,2643,2916, 195,1989,2671,
2358,1387, 629,3205,2293,5256,4439, 123,1310, 888,1879,4300,3021,3605,1003,1162,
3192,2910,2010, 140,2395,2859,  55,1082,2012,2901, 662, 419,2081,1438, 680,2774,
4654,3912,1620,1731,1625,5035,4065,2328, 512,1344, 802,5443,2163,2311,2537, 524,
3399,  98,1155,2103,1918,2606,3925,2816,1393,2465,1504,3773,2177,3963,1478,4346,
 180,1113,4655,3461,2028,1698, 833,2696,1235,1322,1594,4408,3623,3013,3225,2040,
3022, 541,2881, 607,3632,2029,1665,1219, 639,1385,1686,1099,2803,3231,1938,3188,
2858, 427, 676,2772,1168,2025, 454,3253,2486,3556, 230,1950, 580, 791,1991,1280,
1086,1974,2034, 630, 257,3338,2788,4903,1017,  86,4790, 966,2789,1995,1696,1131,
 259,3095,4188,1308, 179,1463,5257, 289,4107,1248,  42,3413,1725,2288, 896,1947,
 774,4474,4254, 604,3430,4264, 392,2514,2588, 452, 237,1408,3018, 988,4531,1970,
3034,3310, 540,2370,1562,1288,2990, 502,4765,1147,   4,1853,2708, 207, 294,2814,
4078,2902,2509, 684,  34,3105,3532,2551, 644, 709,2801,2344, 573,1727,3573,3557,
2021,1081,3100,4315,2100,3681, 199,2263,1837,2385, 146,3484,1195,2776,3949, 997,
1939,3973,1008,1091,1202,1962,1847,1149,4209,5444,1076, 493, 117,5400,2521, 972,
1490,2934,1796,4542,2374,1512,2933,2657, 413,2888,1135,2762,2314,2156,1355,2369,
 766,2007,2527,2170,3124,2491,2593,2632,4757,2437, 234,3125,3591,1898,1750,1376,
1942,3468,3138, 570,2127,2145,3276,4131, 962, 132,1445,4196,  19, 941,3624,3480,
3366,1973,1374,4461,3431,2629, 283,2415,2275, 808,2887,3620,2112,2563,1353,3610,
 955,1089,3103,1053,  96,  88,4097, 823,3808,1583, 399, 292,4091,3313, 421,1128,
 642,4006, 903,2539,1877,2082, 596,  29,4066,1790, 722,2157, 130, 995,1569, 769,
1485, 464, 513,2213, 288,1923,1101,2453,4316, 133, 486,2445,  50, 625, 487,2207,
  57, 423, 481,2962, 159,3729,1558, 491, 303, 482, 501, 240,2837, 112,3648,2392,
1783, 362,   8,3433,3422, 610,2793,3277,1390,1284,1654,  21,3823, 734, 367, 623,
 193, 287, 374,1009,1483, 816, 476, 313,2255,2340,1262,2150,2899,1146,2581, 782,
2116,1659,2018,1880, 255,3586,3314,1110,2867,2137,2564, 986,2767,5185,2006, 650,
 158, 926, 762, 881,3157,2717,2362,3587, 306,3690,3245,1542,3077,2427,1691,2478,
2118,2985,3490,2438, 539,2305, 983, 129,1754, 355,4201,2386, 827,2923, 104,1773,
2838,2771, 411,2905,3919, 376, 767, 122,1114, 828,2422,1817,3506, 266,3460,1007,
1609,4998, 945,2612,4429,2274, 726,1247,1964,2914,2199,2070,4002,4108, 657,3323,
1422, 579, 455,2764,4737,1222,2895,1670, 824,1223,1487,2525, 558, 861,3080, 598,
2659,2515,1967, 752,2583,2376,2214,4180, 977, 704,2464,4999,2622,4109,1210,2961,
 819,1541, 142,2284,  44, 418, 457,1126,3730,4347,4626,1644,1876,3671,1864, 302,
1063,5694, 624, 723,1984,3745,1314,1676,2488,1610,1449,3558,3569,2166,2098, 409,
1011,2325,3704,2306, 818,1732,1383,1824,1844,3757, 999,2705,3497,1216,1423,2683,
2426,2954,2501,2726,2229,1475,2554,5064,1971,1794,1666,2014,1343, 783, 724, 191,
2434,1354,2220,5065,1763,2752,2472,4152, 131, 175,2885,3434,  92,1466,4920,2616,
3871,3872,3866, 128,1551,1632, 669,1854,3682,4691,4125,1230, 188,2973,3290,1302,
1213, 560,3266, 917, 763,3909,3249,1760, 868,1958, 764,1782,2097, 145,2277,3774,
4462,  64,1491,3062, 971,2132,3606,2442, 221,1226,1617, 218, 323,1185,3207,3147,
 571, 619,1473,1005,1744,2281, 449,1887,2396,3685, 275, 375,3816,1743,3844,3731,
 845,1983,2350,4210,1377, 773, 967,3499,3052,3743,2725,4007,1697,1022,3943,1464,
3264,2855,2722,1952,1029,2839,2467,  84,4383,2215, 820,1391,2015,2448,3672, 377,
1948,2168, 797,2545,3536,2578,2645,  94,2874,1678, 405,1259,3071, 771, 546,1315,
 470,1243,3083, 895,2468, 981, 969,2037, 846,4181, 653,1276,2928,  14,2594, 557,
3007,2474, 156, 902,1338,1740,2574, 537,2518, 973,2282,2216,2433,1928, 138,2903,
1293,2631,1612, 646,3457, 839,2935, 111, 496,2191,2847, 589,3186, 149,3994,2060,
4031,2641,4067,3145,1870,  37,3597,2136,1025,2051,3009,3383,3549,1121,1016,3261,
1301, 251,2446,2599,2153, 872,3246, 637, 334,3705, 831, 884, 921,3065,3140,4092,
2198,1944, 246,2964, 108,2045,1152,1921,2308,1031, 203,3173,4170,1907,3890, 810,
1401,2003,1690, 506, 647,1242,2828,1761,1649,3208,2249,1589,3709,2931,5156,1708,
 498, 666,2613, 834,3817,1231, 184,2851,1124, 883,3197,2261,3710,1765,1553,2658,
1178,2639,2351,  93,1193, 942,2538,2141,4402, 235,1821, 870,1591,2192,1709,1871,
3341,1618,4126,2595,2334, 603, 651,  69, 701, 268,2662,3411,2555,1380,1606, 503,
 448, 254,2371,2646, 574,1187,2309,1770, 322,2235,1292,1801, 305, 566,1133, 229,
2067,2057, 706, 167, 483,2002,2672,3295,1820,3561,3067, 316, 378,2746,3452,1112,
 136,1981, 507,1651,2917,1117, 285,4591, 182,2580,3522,1304, 335,3303,1835,2504,
1795,1792,2248, 674,1018,2106,2449,1857,2292,2845, 976,3047,1781,2600,2727,1389,
1281,  52,3152, 153, 265,3950, 672,3485,3951,4463, 430,1183, 365, 278,2169,  27,
1407,1336,2304, 209,1340,1730,2202,1852,2403,2883, 979,1737,1062, 631,2829,2542,
3876,2592, 825,2086,2226,3048,3625, 352,1417,3724, 542, 991, 431,1351,3938,1861,
2294, 826,1361,2927,3142,3503,1738, 463,2462,2723, 582,1916,1595,2808, 400,3845,
3891,2868,3621,2254,  58,2492,1123, 910,2160,2614,1372,1603,1196,1072,3385,1700,
3267,1980, 696, 480,2430, 920, 799,1570,2920,1951,2041,4047,2540,1321,4223,2469,
3562,2228,1271,2602, 401,2833,3351,2575,5157, 907,2312,1256, 410, 263,3507,1582,
 996, 678,1849,2316,1480, 908,3545,2237, 703,2322, 667,1826,2849,1531,2604,2999,
2407,3146,2151,2630,1786,3711, 469,3542, 497,3899,2409, 858, 837,4446,3393,1274,
 786, 620,1845,2001,3311, 484, 308,3367,1204,1815,3691,2332,1532,2557,1842,2020,
2724,1927,2333,4440, 567,  22,1673,2728,4475,1987,1858,1144,1597, 101,1832,3601,
  12, 974,3783,4391, 951,1412,   1,3720, 453,4608,4041, 528,1041,1027,3230,2628,
1129, 875,1051,3291,1203,2262,1069,2860,2799,2149,2615,3278, 144,1758,3040,  31,
 475,1680, 366,2685,3184, 311,1642,4008,2466,5036,1593,1493,2809, 216,1420,1668,
 233, 304,2128,3284, 232,1429,1768,1040,2008,3407,2740,2967,2543, 242,2133, 778,
1565,2022,2620, 505,2189,2756,1098,2273, 372,1614, 708, 553,2846,2094,2278, 169,
3626,2835,4161, 228,2674,3165, 809,1454,1309, 466,1705,1095, 900,3423, 880,2667,
3751,5258,2317,3109,2571,4317,2766,1503,1342, 866,4447,1118,  63,2076, 314,1881,
1348,1061, 172, 978,3515,1747, 532, 511,3970,   6, 601, 905,2699,3300,1751, 276,
1467,3725,2668,  65,4239,2544,2779,2556,1604, 578,2451,1802, 992,2331,2624,1320,
3446, 713,1513,1013, 103,2786,2447,1661, 886,1702, 916, 654,3574,2031,1556, 751,
2178,2821,2179,1498,1538,2176, 271, 914,2251,2080,1325, 638,1953,2937,3877,2432,
2754,  95,3265,1716, 260,1227,4083, 775, 106,1357,3254, 426,1607, 555,2480, 772,
1985, 244,2546, 474, 495,1046,2611,1851,2061,  71,2089,1675,2590, 742,3758,2843,
3222,1433, 267,2180,2576,2826,2233,2092,3913,2435, 956,1745,3075, 856,2113,1116,
 451,   3,1988,2896,1398, 993,2463,1878,2049,1341,2718,2721,2870,2108, 712,2904,
4363,2753,2324, 277,2872,2349,2649, 384, 987, 435, 691,3000, 922, 164,3939, 652,
1500,1184,4153,2482,3373,2165,4848,2335,3775,3508,3154,2806,2830,1554,2102,1664,
2530,1434,2408, 893,1547,2623,3447,2832,2242,2532,3169,2856,3223,2078,  49,3770,
3469, 462, 318, 656,2259,3250,3069, 679,1629,2758, 344,1138,1104,3120,1836,1283,
3115,2154,1437,4448, 934, 759,1999, 794,2862,1038, 533,2560,1722,2342, 855,2626,
1197,1663,4476,3127,  85,4240,2528,  25,1111,1181,3673, 407,3470,4561,2679,2713,
 768,1925,2841,3986,1544,1165, 932, 373,1240,2146,1930,2673, 721,4766, 354,4333,
 391,2963, 187,  61,3364,1442,1102, 330,1940,1767, 341,3809,4118, 393,2496,2062,
2211, 105, 331, 300, 439, 913,1332, 626, 379,3304,1557, 328, 689,3952, 309,1555,
 931, 317,2517,3027, 325, 569, 686,2107,3084,  60,1042,1333,2794, 264,3177,4014,
1628, 258,3712,   7,4464,1176,1043,1778, 683, 114,1975,  78,1492, 383,1886, 510,
 386, 645,5291,2891,2069,3305,4138,3867,2939,2603,2493,1935,1066,1848,3588,1015,
1282,1289,4609, 697,1453,3044,2666,3611,1856,2412,  54, 719,1330, 568,3778,2459,
1748, 788, 492, 551,1191,1000, 488,3394,3763, 282,1799, 348,2016,1523,3155,2390,
1049, 382,2019,1788,1170, 729,2968,3523, 897,3926,2785,2938,3292, 350,2319,3238,
1718,1717,2655,3453,3143,4465, 161,2889,2980,2009,1421,  56,1908,1640,2387,2232,
1917,1874,2477,4921, 148,  83,3438, 592,4245,2882,1822,1055, 741, 115,1496,1624,
 381,1638,4592,1020, 516,3214, 458, 947,4575,1432, 211,1514,2926,1865,2142, 189,
 852,1221,1400,1486, 882,2299,4036, 351,  28,1122, 700,6479,6480,6481,6482,6483,  // last 512
//Everything below is of no interest for detection purpose
5508,6484,3900,3414,3974,4441,4024,3537,4037,5628,5099,3633,6485,3148,6486,3636,
5509,3257,5510,5973,5445,5872,4941,4403,3174,4627,5873,6276,2286,4230,5446,5874,
5122,6102,6103,4162,5447,5123,5323,4849,6277,3980,3851,5066,4246,5774,5067,6278,
3001,2807,5695,3346,5775,5974,5158,5448,6487,5975,5976,5776,3598,6279,5696,4806,
4211,4154,6280,6488,6489,6490,6281,4212,5037,3374,4171,6491,4562,4807,4722,4827,
5977,6104,4532,4079,5159,5324,5160,4404,3858,5359,5875,3975,4288,4610,3486,4512,
5325,3893,5360,6282,6283,5560,2522,4231,5978,5186,5449,2569,3878,6284,5401,3578,
4415,6285,4656,5124,5979,2506,4247,4449,3219,3417,4334,4969,4329,6492,4576,4828,
4172,4416,4829,5402,6286,3927,3852,5361,4369,4830,4477,4867,5876,4173,6493,6105,
4657,6287,6106,5877,5450,6494,4155,4868,5451,3700,5629,4384,6288,6289,5878,3189,
4881,6107,6290,6495,4513,6496,4692,4515,4723,5100,3356,6497,6291,3810,4080,5561,
3570,4430,5980,6498,4355,5697,6499,4724,6108,6109,3764,4050,5038,5879,4093,3226,
6292,5068,5217,4693,3342,5630,3504,4831,4377,4466,4309,5698,4431,5777,6293,5778,
4272,3706,6110,5326,3752,4676,5327,4273,5403,4767,5631,6500,5699,5880,3475,5039,
6294,5562,5125,4348,4301,4482,4068,5126,4593,5700,3380,3462,5981,5563,3824,5404,
4970,5511,3825,4738,6295,6501,5452,4516,6111,5881,5564,6502,6296,5982,6503,4213,
4163,3454,6504,6112,4009,4450,6113,4658,6297,6114,3035,6505,6115,3995,4904,4739,
4563,4942,4110,5040,3661,3928,5362,3674,6506,5292,3612,4791,5565,4149,5983,5328,
5259,5021,4725,4577,4564,4517,4364,6298,5405,4578,5260,4594,4156,4157,5453,3592,
3491,6507,5127,5512,4709,4922,5984,5701,4726,4289,6508,4015,6116,5128,4628,3424,
4241,5779,6299,4905,6509,6510,5454,5702,5780,6300,4365,4923,3971,6511,5161,3270,
3158,5985,4100, 867,5129,5703,6117,5363,3695,3301,5513,4467,6118,6512,5455,4232,
4242,4629,6513,3959,4478,6514,5514,5329,5986,4850,5162,5566,3846,4694,6119,5456,
4869,5781,3779,6301,5704,5987,5515,4710,6302,5882,6120,4392,5364,5705,6515,6121,
6516,6517,3736,5988,5457,5989,4695,2457,5883,4551,5782,6303,6304,6305,5130,4971,
6122,5163,6123,4870,3263,5365,3150,4871,6518,6306,5783,5069,5706,3513,3498,4409,
5330,5632,5366,5458,5459,3991,5990,4502,3324,5991,5784,3696,4518,5633,4119,6519,
4630,5634,4417,5707,4832,5992,3418,6124,5993,5567,4768,5218,6520,4595,3458,5367,
6125,5635,6126,4202,6521,4740,4924,6307,3981,4069,4385,6308,3883,2675,4051,3834,
4302,4483,5568,5994,4972,4101,5368,6309,5164,5884,3922,6127,6522,6523,5261,5460,
5187,4164,5219,3538,5516,4111,3524,5995,6310,6311,5369,3181,3386,2484,5188,3464,
5569,3627,5708,6524,5406,5165,4677,4492,6312,4872,4851,5885,4468,5996,6313,5709,
5710,6128,2470,5886,6314,5293,4882,5785,3325,5461,5101,6129,5711,5786,6525,4906,
6526,6527,4418,5887,5712,4808,2907,3701,5713,5888,6528,3765,5636,5331,6529,6530,
3593,5889,3637,4943,3692,5714,5787,4925,6315,6130,5462,4405,6131,6132,6316,5262,
6531,6532,5715,3859,5716,5070,4696,5102,3929,5788,3987,4792,5997,6533,6534,3920,
4809,5000,5998,6535,2974,5370,6317,5189,5263,5717,3826,6536,3953,5001,4883,3190,
5463,5890,4973,5999,4741,6133,6134,3607,5570,6000,4711,3362,3630,4552,5041,6318,
6001,2950,2953,5637,4646,5371,4944,6002,2044,4120,3429,6319,6537,5103,4833,6538,
6539,4884,4647,3884,6003,6004,4758,3835,5220,5789,4565,5407,6540,6135,5294,4697,
4852,6320,6321,3206,4907,6541,6322,4945,6542,6136,6543,6323,6005,4631,3519,6544,
5891,6545,5464,3784,5221,6546,5571,4659,6547,6324,6137,5190,6548,3853,6549,4016,
4834,3954,6138,5332,3827,4017,3210,3546,4469,5408,5718,3505,4648,5790,5131,5638,
5791,5465,4727,4318,6325,6326,5792,4553,4010,4698,3439,4974,3638,4335,3085,6006,
5104,5042,5166,5892,5572,6327,4356,4519,5222,5573,5333,5793,5043,6550,5639,5071,
4503,6328,6139,6551,6140,3914,3901,5372,6007,5640,4728,4793,3976,3836,4885,6552,
4127,6553,4451,4102,5002,6554,3686,5105,6555,5191,5072,5295,4611,5794,5296,6556,
5893,5264,5894,4975,5466,5265,4699,4976,4370,4056,3492,5044,4886,6557,5795,4432,
4769,4357,5467,3940,4660,4290,6141,4484,4770,4661,3992,6329,4025,4662,5022,4632,
4835,4070,5297,4663,4596,5574,5132,5409,5895,6142,4504,5192,4664,5796,5896,3885,
5575,5797,5023,4810,5798,3732,5223,4712,5298,4084,5334,5468,6143,4052,4053,4336,
4977,4794,6558,5335,4908,5576,5224,4233,5024,4128,5469,5225,4873,6008,5045,4729,
4742,4633,3675,4597,6559,5897,5133,5577,5003,5641,5719,6330,6560,3017,2382,3854,
4406,4811,6331,4393,3964,4946,6561,2420,3722,6562,4926,4378,3247,1736,4442,6332,
5134,6333,5226,3996,2918,5470,4319,4003,4598,4743,4744,4485,3785,3902,5167,5004,
5373,4394,5898,6144,4874,1793,3997,6334,4085,4214,5106,5642,4909,5799,6009,4419,
4189,3330,5899,4165,4420,5299,5720,5227,3347,6145,4081,6335,2876,3930,6146,3293,
3786,3910,3998,5900,5300,5578,2840,6563,5901,5579,6147,3531,5374,6564,6565,5580,
4759,5375,6566,6148,3559,5643,6336,6010,5517,6337,6338,5721,5902,3873,6011,6339,
6567,5518,3868,3649,5722,6568,4771,4947,6569,6149,4812,6570,2853,5471,6340,6341,
5644,4795,6342,6012,5723,6343,5724,6013,4349,6344,3160,6150,5193,4599,4514,4493,
5168,4320,6345,4927,3666,4745,5169,5903,5005,4928,6346,5725,6014,4730,4203,5046,
4948,3395,5170,6015,4150,6016,5726,5519,6347,5047,3550,6151,6348,4197,4310,5904,
6571,5581,2965,6152,4978,3960,4291,5135,6572,5301,5727,4129,4026,5905,4853,5728,
5472,6153,6349,4533,2700,4505,5336,4678,3583,5073,2994,4486,3043,4554,5520,6350,
6017,5800,4487,6351,3931,4103,5376,6352,4011,4321,4311,4190,5136,6018,3988,3233,
4350,5906,5645,4198,6573,5107,3432,4191,3435,5582,6574,4139,5410,6353,5411,3944,
5583,5074,3198,6575,6354,4358,6576,5302,4600,5584,5194,5412,6577,6578,5585,5413,
5303,4248,5414,3879,4433,6579,4479,5025,4854,5415,6355,4760,4772,3683,2978,4700,
3797,4452,3965,3932,3721,4910,5801,6580,5195,3551,5907,3221,3471,3029,6019,3999,
5908,5909,5266,5267,3444,3023,3828,3170,4796,5646,4979,4259,6356,5647,5337,3694,
6357,5648,5338,4520,4322,5802,3031,3759,4071,6020,5586,4836,4386,5048,6581,3571,
4679,4174,4949,6154,4813,3787,3402,3822,3958,3215,3552,5268,4387,3933,4950,4359,
6021,5910,5075,3579,6358,4234,4566,5521,6359,3613,5049,6022,5911,3375,3702,3178,
4911,5339,4521,6582,6583,4395,3087,3811,5377,6023,6360,6155,4027,5171,5649,4421,
4249,2804,6584,2270,6585,4000,4235,3045,6156,5137,5729,4140,4312,3886,6361,4330,
6157,4215,6158,3500,3676,4929,4331,3713,4930,5912,4265,3776,3368,5587,4470,4855,
3038,4980,3631,6159,6160,4132,4680,6161,6362,3923,4379,5588,4255,6586,4121,6587,
6363,4649,6364,3288,4773,4774,6162,6024,6365,3543,6588,4274,3107,3737,5050,5803,
4797,4522,5589,5051,5730,3714,4887,5378,4001,4523,6163,5026,5522,4701,4175,2791,
3760,6589,5473,4224,4133,3847,4814,4815,4775,3259,5416,6590,2738,6164,6025,5304,
3733,5076,5650,4816,5590,6591,6165,6592,3934,5269,6593,3396,5340,6594,5804,3445,
3602,4042,4488,5731,5732,3525,5591,4601,5196,6166,6026,5172,3642,4612,3202,4506,
4798,6366,3818,5108,4303,5138,5139,4776,3332,4304,2915,3415,4434,5077,5109,4856,
2879,5305,4817,6595,5913,3104,3144,3903,4634,5341,3133,5110,5651,5805,6167,4057,
5592,2945,4371,5593,6596,3474,4182,6367,6597,6168,4507,4279,6598,2822,6599,4777,
4713,5594,3829,6169,3887,5417,6170,3653,5474,6368,4216,2971,5228,3790,4579,6369,
5733,6600,6601,4951,4746,4555,6602,5418,5475,6027,3400,4665,5806,6171,4799,6028,
5052,6172,3343,4800,4747,5006,6370,4556,4217,5476,4396,5229,5379,5477,3839,5914,
5652,5807,4714,3068,4635,5808,6173,5342,4192,5078,5419,5523,5734,6174,4557,6175,
4602,6371,6176,6603,5809,6372,5735,4260,3869,5111,5230,6029,5112,6177,3126,4681,
5524,5915,2706,3563,4748,3130,6178,4018,5525,6604,6605,5478,4012,4837,6606,4534,
4193,5810,4857,3615,5479,6030,4082,3697,3539,4086,5270,3662,4508,4931,5916,4912,
5811,5027,3888,6607,4397,3527,3302,3798,2775,2921,2637,3966,4122,4388,4028,4054,
1633,4858,5079,3024,5007,3982,3412,5736,6608,3426,3236,5595,3030,6179,3427,3336,
3279,3110,6373,3874,3039,5080,5917,5140,4489,3119,6374,5812,3405,4494,6031,4666,
4141,6180,4166,6032,5813,4981,6609,5081,4422,4982,4112,3915,5653,3296,3983,6375,
4266,4410,5654,6610,6181,3436,5082,6611,5380,6033,3819,5596,4535,5231,5306,5113,
6612,4952,5918,4275,3113,6613,6376,6182,6183,5814,3073,4731,4838,5008,3831,6614,
4888,3090,3848,4280,5526,5232,3014,5655,5009,5737,5420,5527,6615,5815,5343,5173,
5381,4818,6616,3151,4953,6617,5738,2796,3204,4360,2989,4281,5739,5174,5421,5197,
3132,5141,3849,5142,5528,5083,3799,3904,4839,5480,2880,4495,3448,6377,6184,5271,
5919,3771,3193,6034,6035,5920,5010,6036,5597,6037,6378,6038,3106,5422,6618,5423,
5424,4142,6619,4889,5084,4890,4313,5740,6620,3437,5175,5307,5816,4199,5198,5529,
5817,5199,5656,4913,5028,5344,3850,6185,2955,5272,5011,5818,4567,4580,5029,5921,
3616,5233,6621,6622,6186,4176,6039,6379,6380,3352,5200,5273,2908,5598,5234,3837,
5308,6623,6624,5819,4496,4323,5309,5201,6625,6626,4983,3194,3838,4167,5530,5922,
5274,6381,6382,3860,3861,5599,3333,4292,4509,6383,3553,5481,5820,5531,4778,6187,
3955,3956,4324,4389,4218,3945,4325,3397,2681,5923,4779,5085,4019,5482,4891,5382,
5383,6040,4682,3425,5275,4094,6627,5310,3015,5483,5657,4398,5924,3168,4819,6628,
5925,6629,5532,4932,4613,6041,6630,4636,6384,4780,4204,5658,4423,5821,3989,4683,
5822,6385,4954,6631,5345,6188,5425,5012,5384,3894,6386,4490,4104,6632,5741,5053,
6633,5823,5926,5659,5660,5927,6634,5235,5742,5824,4840,4933,4820,6387,4859,5928,
4955,6388,4143,3584,5825,5346,5013,6635,5661,6389,5014,5484,5743,4337,5176,5662,
6390,2836,6391,3268,6392,6636,6042,5236,6637,4158,6638,5744,5663,4471,5347,3663,
4123,5143,4293,3895,6639,6640,5311,5929,5826,3800,6189,6393,6190,5664,5348,3554,
3594,4749,4603,6641,5385,4801,6043,5827,4183,6642,5312,5426,4761,6394,5665,6191,
4715,2669,6643,6644,5533,3185,5427,5086,5930,5931,5386,6192,6044,6645,4781,4013,
5745,4282,4435,5534,4390,4267,6045,5746,4984,6046,2743,6193,3501,4087,5485,5932,
5428,4184,4095,5747,4061,5054,3058,3862,5933,5600,6646,5144,3618,6395,3131,5055,
5313,6396,4650,4956,3855,6194,3896,5202,4985,4029,4225,6195,6647,5828,5486,5829,
3589,3002,6648,6397,4782,5276,6649,6196,6650,4105,3803,4043,5237,5830,6398,4096,
3643,6399,3528,6651,4453,3315,4637,6652,3984,6197,5535,3182,3339,6653,3096,2660,
6400,6654,3449,5934,4250,4236,6047,6401,5831,6655,5487,3753,4062,5832,6198,6199,
6656,3766,6657,3403,4667,6048,6658,4338,2897,5833,3880,2797,3780,4326,6659,5748,
5015,6660,5387,4351,5601,4411,6661,3654,4424,5935,4339,4072,5277,4568,5536,6402,
6662,5238,6663,5349,5203,6200,5204,6201,5145,4536,5016,5056,4762,5834,4399,4957,
6202,6403,5666,5749,6664,4340,6665,5936,5177,5667,6666,6667,3459,4668,6404,6668,
6669,4543,6203,6670,4276,6405,4480,5537,6671,4614,5205,5668,6672,3348,2193,4763,
6406,6204,5937,5602,4177,5669,3419,6673,4020,6205,4443,4569,5388,3715,3639,6407,
6049,4058,6206,6674,5938,4544,6050,4185,4294,4841,4651,4615,5488,6207,6408,6051,
5178,3241,3509,5835,6208,4958,5836,4341,5489,5278,6209,2823,5538,5350,5206,5429,
6675,4638,4875,4073,3516,4684,4914,4860,5939,5603,5389,6052,5057,3237,5490,3791,
6676,6409,6677,4821,4915,4106,5351,5058,4243,5539,4244,5604,4842,4916,5239,3028,
3716,5837,5114,5605,5390,5940,5430,6210,4332,6678,5540,4732,3667,3840,6053,4305,
3408,5670,5541,6410,2744,5240,5750,6679,3234,5606,6680,5607,5671,3608,4283,4159,
4400,5352,4783,6681,6411,6682,4491,4802,6211,6412,5941,6413,6414,5542,5751,6683,
4669,3734,5942,6684,6415,5943,5059,3328,4670,4144,4268,6685,6686,6687,6688,4372,
3603,6689,5944,5491,4373,3440,6416,5543,4784,4822,5608,3792,4616,5838,5672,3514,
5391,6417,4892,6690,4639,6691,6054,5673,5839,6055,6692,6056,5392,6212,4038,5544,
5674,4497,6057,6693,5840,4284,5675,4021,4545,5609,6418,4454,6419,6213,4113,4472,
5314,3738,5087,5279,4074,5610,4959,4063,3179,4750,6058,6420,6214,3476,4498,4716,
5431,4960,4685,6215,5241,6694,6421,6216,6695,5841,5945,6422,3748,5946,5179,3905,
5752,5545,5947,4374,6217,4455,6423,4412,6218,4803,5353,6696,3832,5280,6219,4327,
4702,6220,6221,6059,4652,5432,6424,3749,4751,6425,5753,4986,5393,4917,5948,5030,
5754,4861,4733,6426,4703,6697,6222,4671,5949,4546,4961,5180,6223,5031,3316,5281,
6698,4862,4295,4934,5207,3644,6427,5842,5950,6428,6429,4570,5843,5282,6430,6224,
5088,3239,6060,6699,5844,5755,6061,6431,2701,5546,6432,5115,5676,4039,3993,3327,
4752,4425,5315,6433,3941,6434,5677,4617,4604,3074,4581,6225,5433,6435,6226,6062,
4823,5756,5116,6227,3717,5678,4717,5845,6436,5679,5846,6063,5847,6064,3977,3354,
6437,3863,5117,6228,5547,5394,4499,4524,6229,4605,6230,4306,4500,6700,5951,6065,
3693,5952,5089,4366,4918,6701,6231,5548,6232,6702,6438,4704,5434,6703,6704,5953,
4168,6705,5680,3420,6706,5242,4407,6066,3812,5757,5090,5954,4672,4525,3481,5681,
4618,5395,5354,5316,5955,6439,4962,6707,4526,6440,3465,4673,6067,6441,5682,6708,
5435,5492,5758,5683,4619,4571,4674,4804,4893,4686,5493,4753,6233,6068,4269,6442,
6234,5032,4705,5146,5243,5208,5848,6235,6443,4963,5033,4640,4226,6236,5849,3387,
6444,6445,4436,4437,5850,4843,5494,4785,4894,6709,4361,6710,5091,5956,3331,6237,
4987,5549,6069,6711,4342,3517,4473,5317,6070,6712,6071,4706,6446,5017,5355,6713,
6714,4988,5436,6447,4734,5759,6715,4735,4547,4456,4754,6448,5851,6449,6450,3547,
5852,5318,6451,6452,5092,4205,6716,6238,4620,4219,5611,6239,6072,4481,5760,5957,
5958,4059,6240,6453,4227,4537,6241,5761,4030,4186,5244,5209,3761,4457,4876,3337,
5495,5181,6242,5959,5319,5612,5684,5853,3493,5854,6073,4169,5613,5147,4895,6074,
5210,6717,5182,6718,3830,6243,2798,3841,6075,6244,5855,5614,3604,4606,5496,5685,
5118,5356,6719,6454,5960,5357,5961,6720,4145,3935,4621,5119,5962,4261,6721,6455,
4786,5963,4375,4582,6245,6246,6247,6076,5437,4877,5856,3376,4380,6248,4160,6722,
5148,6456,5211,6457,6723,4718,6458,6724,6249,5358,4044,3297,6459,6250,5857,5615,
5497,5245,6460,5498,6725,6251,6252,5550,3793,5499,2959,5396,6461,6462,4572,5093,
5500,5964,3806,4146,6463,4426,5762,5858,6077,6253,4755,3967,4220,5965,6254,4989,
5501,6464,4352,6726,6078,4764,2290,5246,3906,5438,5283,3767,4964,2861,5763,5094,
6255,6256,4622,5616,5859,5860,4707,6727,4285,4708,4824,5617,6257,5551,4787,5212,
4965,4935,4687,6465,6728,6466,5686,6079,3494,4413,2995,5247,5966,5618,6729,5967,
5764,5765,5687,5502,6730,6731,6080,5397,6467,4990,6258,6732,4538,5060,5619,6733,
4719,5688,5439,5018,5149,5284,5503,6734,6081,4607,6259,5120,3645,5861,4583,6260,
4584,4675,5620,4098,5440,6261,4863,2379,3306,4585,5552,5689,4586,5285,6735,4864,
6736,5286,6082,6737,4623,3010,4788,4381,4558,5621,4587,4896,3698,3161,5248,4353,
4045,6262,3754,5183,4588,6738,6263,6739,6740,5622,3936,6741,6468,6742,6264,5095,
6469,4991,5968,6743,4992,6744,6083,4897,6745,4256,5766,4307,3108,3968,4444,5287,
3889,4343,6084,4510,6085,4559,6086,4898,5969,6746,5623,5061,4919,5249,5250,5504,
5441,6265,5320,4878,3242,5862,5251,3428,6087,6747,4237,5624,5442,6266,5553,4539,
6748,2585,3533,5398,4262,6088,5150,4736,4438,6089,6267,5505,4966,6749,6268,6750,
6269,5288,5554,3650,6090,6091,4624,6092,5690,6751,5863,4270,5691,4277,5555,5864,
6752,5692,4720,4865,6470,5151,4688,4825,6753,3094,6754,6471,3235,4653,6755,5213,
5399,6756,3201,4589,5865,4967,6472,5866,6473,5019,3016,6757,5321,4756,3957,4573,
6093,4993,5767,4721,6474,6758,5625,6759,4458,6475,6270,6760,5556,4994,5214,5252,
6271,3875,5768,6094,5034,5506,4376,5769,6761,2120,6476,5253,5770,6762,5771,5970,
3990,5971,5557,5558,5772,6477,6095,2787,4641,5972,5121,6096,6097,6272,6763,3703,
5867,5507,6273,4206,6274,4789,6098,6764,3619,3646,3833,3804,2394,3788,4936,3978,
4866,4899,6099,6100,5559,6478,6765,3599,5868,6101,5869,5870,6275,6766,4527,6767
];

}((typeof process !== 'undefined' && typeof process.title !== 'undefined') ? module.parent.exports : jschardet);