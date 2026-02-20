// GLOBAL VARIABLES //

// LOG DEBUG SWITCHES //

const dev = true, dbg = false, dCl = true, dBd = false;

// CACHED API KEY //

var __SAPLING_KEY = null;

// REGEX PATTERNS //

var CH_EJ = /(?![®©™])[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu;
var CH_EJV = /📧|\u{1F4E7}|📩|\u{1F4E9}/u;
var CH_EMD = /—|[\u{2014}\u{2012}]/gui;
var CH_EPS = /\b(?:(?:\. ?){3}|…)\b/g;
var CH_MS = /mailsuite|\bmailtrack\b/i;
var CH_N1 = /(?:1|I|i)\b/;
var CH_PHE = /[^\s][!?\.]$/;
var CH_WS = /wisestamp|create\syour\sown\semail\ssignature/i;
var CL_AD = /\b(?:S(?:[Tt][Ee]?|tree|ui)t?e?|A[Vv][Ee]?(?:nue)?|R(?:oa)?[Dd]|D[Rr](?:ive)?|B(?:ou)?[Ll]?e?[Vv](?:ar)?[Dd]|H(?:igh)?[Ww]a?[Yy]|Way|La?[Nn]e?|C(?:our)?[Tt]|Pi?[Kk]e?|C[Ii][Rr](?:cle)?|(?:T|P[Ll]a?)(?:ERR?|err?|[Cc][Ee]?)?|(?:P\.? *[Oo]\.? *)?[Bb](?:OX|ox) *\d+|A[Pp](?:ar)?[Tt](?:ment)?|Fl(?:oor)?|Unit)\.?\b/;
var CL_AD2 = /^[\w+\. ],? [A-Z]{2},? [\d\-]{5,10}$/;
var CL_AFT = /-->|<!?--|→|^\s*>\s*$|\[[^\[\]]+?\]|\b96\b|=\s?\d\s?\?|ADVERTISEMENT|SPONSOR(?:ED|)|\|\n|\s*\*{2,}\s*|image\svia.*?$|##[\d\w]+##|[A-Z_]{5,}:\s*(True|False|None|Null|[0-9]+)/gm;
var CL_ATT = /^(?:class|src|title|id|alt|data|target|border|role|xmlns|lang|meta|content|contenteditable|spellcheck|type|width|height|tabindex|dir|translated|bell|mt|start|bgcolor|draggable|name|item\w{3,5}|(?:data|sculpt|aria)-[\w\-]+|(?:col|row)span|cell-(?:padding|spacing)|(?:background|font)-(?:color|face)|(?:h|v|)(?:space|align)|oid|label|datatype|comboservice|unselectable|x-em-[a-z]+?|\/?[wo]:|meta)$/i;
var CL_CPS = /[\t ]+/g;
var CL_DSH = /^[-=]+$/gm;
var CL_FR = /unsubscribe|(?:no\s*longer|)\s*(?:would|want|wish|need)\s*(?:like\s*|)(?:stop|change)\s*(?:show\syou|to|your\ssubcription)\s*(?:receive?(?:ing)?|(?:be\s*|)removed|remove\s*yourself)|advertise\s*(?:on|with)/i;
var CL_FRB = /(?:(?:mem|subsci|read)b?er|pay)[\s\-](?:only|(?:wall|support)ed)|(?:pledg|donat)(?:ing|e|ion)\b|(?:keep|continue|read|view|see)\s(?:more|full\sstory|reading)|(?:you(?:\sare|[’']re)\scurrently)|(?:become?(?:ing)?\s*an?\s*(?:free\s*(?:or\s*(?:paid|paying))?|(?:[\w\p{P} ]+))?\s*(?:member|subscriber\b))|buy\sme\sa\scoffee|support\s(?:us|me|(?:our|my)\swork)|(?:for\saccess|if\syou).*?\supgrade\b|add\s*(?:your)?\spostal\saddress\shere|web\s*version/ui;
var CL_FRC = /(?:did\snot|didn[’']t)\s(?:authorize|atpt|req|grant|access|allow|make)|\bdo\snot\s(?:respond|reply)|no[-\s]reply|(?:not\s|un)(?:monitor|attend)ed|void\swhere\sprohibited|no\scash\svalue|not\scombinable|(?:about|check\sout|connect|download|chat|reach\sout)\s?(?:with|the|our|to|)\s?(?:new\s|)(?:us|help|support|(?:mobile\s|)app\b|web[ -]?(?:site|page))|free\s(?:trial|membership|subscription|month|post|article|account|sample|gift)|(?:secure|change|reset|(?:re|)view|manage|adjust|modify|update|\bedit)\s(?:your|the|my|)\s?(?:account|communications?|notifications?|subscription|membership|profile|security|password|(?:email\s|)preferences?|settings|options|activity)|(?:you\s*(?:[’']ve|have|are|)\s*(?:(?:receiv|got)(?:ed|ing))|forwarded|was\s*(?:this|these)\s*(?:electronic\smessage\s|)(?:email|message|notification|notice|transmission|communication)s?\s*(?:because|is|was|(?:may\s*|)contains?|forwarded\sto\syou|in\serror))|offer\s(?:only|)\s?valid|not\scombinable|cannot\sbe\scombined|fees\s(?:may|)\s?apply|use\sthereof|terms\s(?:of|and|&)\s(?:use|sale|conditions)|(?:privacy|confidentiality)\s*(?:and|&)?\s*(?:policy|notice|statement|practices|(?:and|&)\ssecurity)|(named|intended)\s*(?:(?:only\s)?for|recipient|to\s*be(?:\s*for|))/i;
var CL_HFF = /forward(?:ed|)\sthis\s(?:to\syou|)\s?(?:message|email|post|newsletter|article)/i;
var CL_HR = /(?:view|read|see|open)\s(?:this|)\s?(?:email|post|article|message|web|in)\s?(?:[oi]n|as|)\s?(?:the|a|)[\s\-](?:line|app|web|version|browser)|web\s*version/i;
var CL_LKI = /\[([\w \p{P}]+?)\]\((?:https?:\/\/|mailto:|\??utm_)[\w\d\p{P}\s=]+?\)/gui;
var CL_LKP = /(?:^[\w ]+:\s*|)([\(\[<])\s*(?:(?:a|link)\s\w+="|)https?:\/\/[^\1\2]+?\s*([>\]\)])/gim;
var CL_LKS = /https?:\/\/[^<>\]\(\s]+?(?:([<\s])|$)/gim;
var CL_LLN = /(?!\b\d{1,2}\.\s)(?:©|[Cc]opyright|\(c\)|\u{00A9}|(?:[Rr]egistered\s*)?(?:[Ss]ervice\s*|[Tt]rade)mark|™|\u{2122}|not\s*affiliated|[Rr]ights\s[Rr]eserved|[Dd]isclosures?|[Rr]estrictions\sapply|Our\s[Mm]ailing\s[Aa]ddress\s[Ii]s|Careers|Questions\?|Start\swriting|Sent\svia|\BPowered\sby|Upgrade\sto\spaid|[Cc]lick\shere|(?:Contact|Follow)\s[Uu]s|Disclaimer)/u;
var CL_OPT = /opt[\-\s]out/gi;
var CL_SJ = /^\s*(re|fwd?)\s*:\s*/i;
var CL_SC = /Facebook|TikTok|Threads|Instagram|Bluesky|Reddit|Linkedin|Discord|Twitter|\bX\b|YouTube/i;
var CL_SC2 = /Share|Like|Heart|Restack|Comment|Forward/;
var CL_SDR = /<[^<>]+>|"/g;
var CL_TGA = /\s+data-[\w-]+="?\{[^}]+\}"?/gi;
var CL_TGB = /<\/?\w+\s*$/gm;
var CL_TGS = / +([\/;"]?) *>/g;
var CL_TGY = /style=" +/g;
var CL_UDD = /[\u{2013}\u{2212}\u{00AD}]/gu;
var CL_UDL = /[\p{Zp}\u{000A}\u{000d}\u{0085}\u{2028}\u{2029}\u{0000}-\u{0018}\u{001A}-\u{001F}]/gu;
var CL_UDS = /[\p{Zs}\f\u{2000}-\u{200A}\u{2007}\u{00A0}\u{0340}\u{00AD}\u{0340}\u{0020}\u{202F}]/gu;
var CL_UDZ = /[\u{2060}\u{FEFF}\u{200B}-\u{200F}\u{034F}\u{0019}]/gu;
var D_AMP = /%26/g, D_ANY = /&#x([0-9A-Fa-f]+);?/g, D_NU = /&#(\d+);?/g, D_QPB = /=\r?\n/g, D_QPC = /=([0-9A-F]{2})/g;
var F_CML = /([a-z0-9]),\s+([a-z0-9])/g;
var F_ERX = /([\|\+\*\.\?\^\$\{\}\(\)\[\]\/\\])/g;
var F_PRD = /⭕/g;
var F_TGL = /<([^<>\n\r]*?)[\n\r]+>/g;
var F_TGY = /(<\w+) *[\n\r]+ *(style.*?>)/g;
var M_AZN = /Amazon/;
var M_AZO = /Ordered/;
var M_BSR = /newsletter|blog|(?:ghost|substack|medium|blogspot|blogger|wordpress|wix|squarespace|tumblr|hostinger|strikingly|actionnetwork)\.(?:com|org|io|net|co.uk)/i;
var M_CSJ = /order|receipt|schedule|delivery|(?:pay|state|ship)ment|(?:transac|reserva)tion|app(?:t\b|ointment)|book(?:ed|ing)/i;
var M_FNR = /font-weight:\s*(?:normal|[1-5]00)/i;
var M_HTM = /(<(?:!doctype|head|style|html|body)[^<>]*?>[\S\s]+<\/(?:html|body)[^<>]*?>)/i;
var M_LBS = /[\n\r]+/g;
var M_LI = /(<li[^>]*?>([\S\s]+?)<\/li>)/g;
var M_NOP = /your\semail\ssoftware\scan't\sdisplay\sHTML\semails|this\sis\s(?:a|the)\s.*?\stemplate/i;
var M_NAT = /logo|badge|custom|icon|_|\.[a-z]{3,4}/i;
var M_OTG = /^\s*(\s*<\/?[^<>\n\r]+?>\s*)+\s*$/;
var M_PAF = /<\/(?:html|body)>([\S\s]+?)$/i;
var M_PBF = /^([\S\s]+?)<(?:doctype|html|head|style|body)/i;
var M_PDA = /(?:\b(S[Tt]?[Ee]?|A[VvPp][EeTt]?|R[Dd]|B(?:lvd|LVD)|H[Ww][Yy]|L[NnTt][Dd]?|C[TtIi][Rr]?|T[EeCc][RrEe]|P[LlKk]?|O|F[Ll]|I[Nn][Cc]|C[Oo]|N|E|W))\.(\s*)/gm;
var M_PDE = /(\w+@\w+)\.([a-z]{2,4})/gm;
var M_PDN = /((?:^|[>\s])\d{1,2})\.( +)/gm;
var M_SCH = /font-size:\s*calc\(([\d[a-zA-Z%]+)\s*-\s*\1\)/gi;
var M_SCR = /score\s*:\s*([^\s,}\]]+)/i;
var M_SLT = /(?:class\saction|legal)\ssettlement/i;
var M_SYB = /bold|normal/i;
var M_SYF = /^font-style$/i;
var M_SYI = /italic/i;
var M_SYL = /^list-style(?:-type)?$/i;
var M_SYN = /none/i;
var M_SYP = /^style$/i;
var M_SYW = /^font-weight$/i;
var M_TBK = /<((?:[^<>]+?[\n\r]+[^<>]+?)+[\n\r]*?\/?)>/g;
var M_TKN = /[a-z]{4,}/g;
var M_WSO = /^[\s\|]+$/;
var M_XVL = /Expecting value/;
var P_ACN = /[\S\s]*?/;
var P_ACR = /[\S\s]+?/;
var P_AC1 = /(.*?)/;
var P_ALB = /[\n\r]/g;
var P_ALR = /[A-Za-z]/;
var P_ATG = /<[^!]\/?[^>]*?>/g;
var P_APH = /[’']/;
var P_BDC = /<\/(?:\k<tag>|strong|b)>/i;
var P_BDO = /(?<!<(?:h\d|ol|ul|li)[^>]*?>)<(?:strong|\bb\b|(?!h\d|ul|ol|li)(?<tag>\w+)\s*[^<>]*?style=[^<>]*?font-weight:\s*(?:bold|[6-9]00);?)[^>]*?>/i;
var P_BL = /[\+\-#○■\*‣•—·•]/;
var P_CMI = /[^<>\-!]+?/;
var P_DCD = /(?: |%)/;
var P_DSH = /-{0,2}/;
var P_DTP = /!DOCTYPE/i;
var P_EJH = /^\s*/;
var P_EML = /[\w@\.\-_\s<>\/\\"=:]+/;
var P_LS = /[\n\r>]/;
var P_LBM = /(?:^|[\n\r]|>)/;
var P_LE = /[\n\r<]/;
var P_LEM = /(?:$|[\n\r]|<)/;
var P_LKO = /<(a\b|button)/i;
var P_LRN = /[A-Za-z0-9]/g;
var P_MD = /[\*_]/;
var P_MDH = /#{1,3}.*?(?:\s*\w|#{1,3})/g;
var P_NEJ = /[^\p{Emoji_Presentation}\p{Extended_Pictographic}]/u;
var P_NLB = /[^\n\r]/;
var P_NTG = /[^<>]*?/;
var P_NU = /\d+/;
var P_NUL = /[\divx]{1,3}/;
var P_OLC = /(?:[\n\r]|$)/;
var P_OLO = /(?:[\n\r]|^)/;
var P_PCT = /[,:\?!@\(\);<>\/\\=\|]/;
var P_QTS = /["']/;
var P_SF1 = /(?:(?:(?:(?:(?:Kind|Warm)(?:est|)|Best|Thank(?:s|\s*[Yy]ou)\s*(?:and|&)\s*([Kk]ind)?)\s*[Rr]egards?)|Best|Warmly|Regards))/;
var P_SF2 = /Sincerely(?: [Yy]ours|)|Thank(?:s| [Yy]ou)(?: for [\w ]+?)|Yours(?: [Tt]ruly|Sincerely)?|Signed/;
var P_SFP = /[,:!\.\?]?/;
var P_SNC = /[\w\p{P}]+?/u;
var P_SEQ = /\s*=\s*/;
var P_STB = /[ \t]*/;
var P_TAC = /<\/a>/i;
var P_TAO = /<a>/i;
var P_TCC = /<\/\1>/;
var P_TSC = /\b\s*/;
var P_TSO = /<\/?\b/;
var P_TSP = /p|div|h\d|ul|ol|li|button|img|hrl/gi;
var P_TSR = /table|tr|th|tbody|thead|br/gi;
var P_TSX = /[^>\/]*?>/;
var P_ULL = /[A-Z][a-z]/;
var P_WDD = /[\w\-]+/;
var P_WS = /\s*/;
var S_GHH = /(?:&nbsp;(?:\s*|&nbsp;)*){2,}/;
var S_HF = /(\.\s+|\n+)/;
var S_NU = /\s+|\./;
var S_WS = /\s+/g;

// STRINGS //

var CH_BD = new RegExp(`(?<emj>${CH_EJ.source} *)?${P_BDO.source}(?<num>[${P_NUL.source}\\. +)?(?<cnt>${P_ACN.source})${P_BDC.source}`, `gui`);
var CH_BNU = new RegExp(`(?:${P_SF1.source}|${P_SF2.source})${P_SFP.source}(?:${P_ATG.source}|)${P_ALB.source}+${P_BDO.source}(${P_ACN.source})${P_BDC.source}`, `gim`);
var CH_BEJ = new RegExp(`${P_LBM.source}(${CH_EJ.source}${P_WS.source}[A-Za-z\d]${P_NLB.source}${P_NEJ.source}+?)${P_LBM.source}`, `gumi`);
var CH_BLN = new RegExp(`${P_EJH.source}${CH_EJ.source} ? *${P_LRN.source}`, `u`);
var CH_BLT = new RegExp(`<ul${P_TSX.source}`, `gi`);
var CH_BLX = new RegExp(`${P_LBM.source}(${P_BL.source})${P_WS.source}${P_NLB.source}+$${P_ALB.source}`, `gmi`);
var CH_HTG = new RegExp (`<h\\d\\b${P_TSX.source}`, `gi`);
var CH_ITC = new RegExp(`<(?:\\b(?:em|i)\\b|${P_NTG.source}font-style:\\s?italic)${P_TSX.source}`, `gi`);
var CH_NUT = new RegExp(`<ol${P_TSX.source}`, `gi`);
var CH_NUX = new RegExp(`${P_LBM.source}${P_STB.source}[${P_NUL.source}[\\.\\)]\\s+${P_NLB.source}+?(?:$|${P_LE.source})`, `gm`);
var CH_PH = new RegExp(`(?:you(?:\\sare|${P_APH.source}re)\\s(?:absolutely|completely)\\s?(?:right|correct)|that(?:${P_APH.source}s|\\sis)\\s?a?\\s?(?:great|good)\\squestion|i\\scompletely\\sunderstand|(?:just\\sto|let${P_APH.source}s)\\s(?:clarify|be\\sclear)|would\\syou\\sbe\\s(?:interested\\sin|open\\sto)|no\\s(?:strings attached|pressure)|that(?:\\sis|${P_APH.source}s)\\son\\sme|thank(?:s|\\syou)\\s?(?:so|very|)\\s?(?:much|)\\sfor\\syour\\s(?:kind|thoughtful|kind\\s(?:and|&|&amp;)\\sthoughtful)\\s(?:reply|rsps|message|email|question)|i\\stake\\s(?:full|total|complete|)\\s?responsibility|i\\sjust\\s(?:wanted|had)\\sto|(?:y[eu]p|got\\sit)${P_WS.source}(?:${CH_EMD.source}))${P_SFP.source}?`, `gui`);
var CH_QA = new RegExp(`(?:Short answer|Why|The (?:${P_SNC.source} *){1,2})\\? *[A-Z](?:${P_SNC.source} *){1,10}(?:${P_ATG.source})?\\.`, `gu`);
var CH_SF = new RegExp(`${P_LBM.source}(${P_SF1.source}${P_SFP.source})${P_LEM.source}`, `m`);
var CH_SF2 = new RegExp(`${P_LBM.source}(${P_SF2.source}${P_SFP.source})${P_LEM.source}`, `im`);
var CL_CLB = new RegExp(`(?:${P_STB.source}${P_ALB.source})+${P_STB.source}|[ \\t]{8,}`, `g`);
var CL_CMT = new RegExp(`<!(?${P_DTP.source})${P_DSH.source} *\\[?${P_CMI.source}\\]? *${P_DSH.source}>${P_DSH.source}>?|\\/\\*\\[?${P_CMI.source}\\*\\/|^ *${P_CMI.source} *-{2}>$`, `gim`)
var CL_DTY = new RegExp(`<${P_WS.source}${P_DTP.source}${P_NTG.source}>`, `i`);
var CL_XBT = new RegExp(`(${P_ATG.source})>`, `g`);
var CL_HDN = new RegExp(`<(?<tag>(?!br)\\w+)${P_WS.source}${P_NTG.source}(?:aria-hidden="true"|style=")${P_NTG.source}(?:[^-]color:${P_WS.source}transparent|display:${P_WS.source}none|(?:(?:line|max)-?(?:height|width)|(?<!-)(?:height|weight)|font-size|opacity):${P_WS.source}(?:0|calc\(?<pct>[\\d[a-zA-Z%]+)${P_WS.source}-${P_WS.source}\\k<pct>\\)|mso-hide:${P_WS.source}all|visibility:${P_WS.source}hidden))${P_TSX.source}${P_NTG.source}<\\/\\k<tag>>`, `gi`);
var CL_HDS = new RegExp(`<(?<tag>\\w+)${P_WS.source}${P_NTG.source}(?:aria-hidden="true"|style=")${P_NTG.source}(?:[^-]color:\\s?transparent|display:${P_WS.source}none|(?:(?:line|max)-?(?:height|width)|(?<!-)(?:height|weight)|font-size|opacity):${P_WS.source}(?:0|calc(?<pct>[\\d[a-zA-Z%]+)${P_WS.source}-${P_WS.source}\\k<pct>\\)|mso-hide:\\s?all|visibility:\\s?hidden))${P_NTG.source} ?\\/>`, `gi`);
var CL_LK = new RegExp(`${P_TAO.source}${P_ACN.source}${P_TAC.source}`, `gi`);
var CL_LKA = new RegExp(`${P_LKO.source}${P_NTG.source}>`, `gi`);
var CL_LKE = new RegExp(`${P_TAO.source}${P_WS.source}${P_TAC.source}`, `gi`);
var CL_MD = new RegExp(`${P_MD.source}{1,3}([\\S\\s]+?)${P_MD.source}{1,3}`, `g`);
var CL_MBD = new RegExp(`${P_MD.source}{2}${P_AC1.source}${P_MD.source}{2}`, `g`);
var CL_MBT = new RegExp(`${P_MD.source}{3}${P_AC1.source}${P_MD.source}{3}`, `g`);
var CL_MIT = new RegExp(`${P_MD.source}${P_AC1.source}${P_MD.source}`, `g`);
var CL_MSK = new RegExp(`~~${P_AC1.source}~~`, "g");
var CL_PVS = new RegExp(`(${P_LS.source})(?:(?:(?:(?:On\\s${P_ULL.source}{1,5},\\s${P_ULL.source}{1,5}\\s\\d{1,2},\\s\\d{4},?\\s(?:at\\s)?\\d{1,2}:\\d{2}\\s[AP]M,?\\s${P_EML.source}\\swrote${P_WS.source})|(?:(?:(?:Begin\\s|${P_WS.source}-{2,10}${P_WS.source})[Ff]orwarded|[Oo]riginal)\\s[Mm]essage))(?:${P_WS.source}-{2,6}${P_WS.source}|:))|(?:${P_BDO.source}|)From${P_WS.source}${P_EML.source})${P_LE.source}${P_ACN.source}$`);
var CL_TBC = new RegExp(`^${P_WS.source}style=${P_QTS.source}${P_NTG.source}>`, `gm`);
var CL_TFG = new RegExp(`<(figure|figcaption)${P_TSX.source}${P_ACN.source}${P_TCC.source}`, `gi`);
var CL_TFR = new RegExp(`fr-original-style${P_SEQ.source}"[^">]*(?:"[^">]*"[^">]*)*"`, `gi`);
var CL_TSP = new RegExp(`${P_TSO.source}(?:${P_TSP.source})${P_TSC.source}${P_TSX.source}`, `gi`);
var CL_TSR = new RegExp(`${P_TSO.source}(?:${P_TSR.source})${P_TSC.source}${P_NTG.source}\\s*\\/?>`, `gi`);
var CL_TDE = new RegExp(`${P_WS.source}<\\/?td${P_TSX.source}${P_WS.source}(?:<\\/?td${P_TSX.source})?${P_WS.source}(?<ej1>${P_WS.source}(?:${CH_EJ.source}|${P_BL.source}))${P_WS.source}<\\/?td${P_TSX.source}${P_WS.source}(?:<\\/?td${P_TSX.source})?${P_WS.source}`, `gui`);
var CL_TDT = new RegExp (`<\\/?td${P_TSX.source}`, `gui`);
var CL_UHM = new RegExp(`<(?!\\/?(?:\\b(b|strong|i|em|ul|ol|li|h[1-9]|hrl|p|div|span|a|td)\\b))${P_TSX.source}`, `gi`);
var D_LB = new RegExp(`(?:\\r|${CL_UDL.source})`, `gu`);
var D_LTR = new RegExp(`&(${P_ALR.source}${P_LRN.source}+);?`, `g`);
var D_MD = new RegExp(`${P_DCD.source}?96`, `g`);
var F_BK = new RegExp(`${P_WS.source}(${P_TSO.source}(?:${P_TSR.source}|${P_TSP.source})${P_TSC.source}${P_TSX.source})${P_WS.source}`, `gi`);
var F_BL = new RegExp(`^${P_WS.source}(${P_BL.source})${P_WS.source}${P_ALB.source}+${P_WS.source}(${P_ALR.source})`, `gum`);
var F_CMS = new RegExp(`(${P_ALR.source}),(${P_ALR.source})`, `g`);
var F_IEJ = new RegExp(`${P_ALB.source}*<img\\s?(?:data|class)[\\-=]emoji="(.)"${P_TSX.source}${P_ALB.source}`, `gi`);
var F_NU = new RegExp(`([0-9]{1,2}\\.)${P_WS.source}${P_ALB.source}+${P_WS.source}(${P_ALR.source})`, `g`);
var F_PNC = new RegExp(`(${P_ALR.source}+)\\s+([\\.!\\?,])`, `g`);
var F_SBP = new RegExp(`<\\b(sub|sup)\\b${P_TSX.source}(${P_NTG.source})${P_TCC.source}`, `gi`);
var F_TSP = new RegExp(`(<\\/?${P_NTG.source})${P_WS.source}(${P_ALB.source}+${P_WS.source}>)`, `gi`);
var M_ATT= new RegExp(`(${P_WDD.source})${P_SEQ.source}(?:(${P_QTS.source})(${P_ACN.source})\\2|([^\\s>]+))(?=\\s+${P_WDD.source}${P_WS.source}=|${P_WS.source}\\/?>|$)`, `gi`);
var M_HP = new RegExp(`${P_SNC.source}[\\.\\!\\?]`);
var M_IGA = new RegExp(`<img${P_NTG.source}alt${P_SEQ.source}"([\\w\\p{P} ]+?)"\\s*${P_NTG.source}>`, `gui`);
var M_LBL = new RegExp(`<ul${P_TSX.source}(${P_ACR.source})<\\/ul>`, `gi`);
var M_LNU = new RegExp(`<ol${P_TSX.source}(${P_ACR.source})<\\/ol>`, `gi`);
var M_OPC = new RegExp(`^${P_PCT.source}+$`);
var S_PRA = new RegExp(`${P_ALB.source}+${P_WS.source}${P_ALB.source}+|${P_ALB.source}+(?=\\S)`, `g`);
var M_SYA = new RegExp(`(${P_WDD.source}):\\s?([^;]+);?\\s?`, `gi`);

// FONTS //

var bkbry = `<font color="#200055">`, rsbry = `<font color="#3f00ab">`, stbry = `<font color="#ff0060">`, cFt = `</font>`;

// MESSAGES //

var eAE = `🚫 ${stbry}<em>Sapling error. Refresh and try again.</em>${cFt}`;
var eAT = `⚠️ ${stbry}<em>Sapling timeout. Refresh and try again.</em>${cFt}`;
var eCO = `Final score based only on scanE.`;
var fBt = `🗑️ ${stbry}This message is full of junk and can't be scanned without timing out. Sorry about that.${cFt}`;
var fNC = `${rsbry}It looks like this message has no content. I'll just take a little nap until the next one. 😴${cFt}`;
var fNCT = `${rsbry}The top message in this thread is too short to scan. Try another one.`;
var fSm = `${stbry}🚨 <b>STOP!! 🚨<br /><em>This email is likely a scam!</em><br /></b>(Contains hidden "dummy" text)<br />🔻 <b>DON'T</b> click any links.<br /><b>🔻 DON'T</b> open any attachments.<br />🔻 <b>REPORT</b> the email to your provider.<br />🔻 <b>DELETE </b> the email immediately.${cFt}`;
var fCZ = `🚫 ${stbry}<em>Message too large to scan. Final score based only on Sapling.</em>${cFt}`;
var fZ = `${stbry}This email is too large to process without timing out. Try another one.${cFt}`;
var fWc = `🚫 ${stbry}<em>Message too short for accurate scan. ${eCO}</em>${cFt}`;
var lBH = "NOT BDHG:", lBN = "NOT BDNM:", lBS = "NOT BDSC:", lBT = "NOT BDTX:";
var lBl = `\n   - `;
var lHSm = `🛑 FILTER: 🚨 SCAM! 🚨 (SNEAKY HIDDEN TEXT) 🚨 🛑`;
var lNH = `🛑 FILTER: NO HTML - USING PLAIN TEXT`;
var lSm = `🛑 FILTER: 🚨 SCAM! 🚨 (DISSIMILAR) 🚨 🛑`;
var rNC = `WORD COUNT < 5`;

// FUNCTIONS //

// HELPER FUNCTIONS //

function eRx(txt) { return txt.replace(F_ERX, "\\$1"); };
function lIx(ptn) { return ptn.lastIndex = 0; };
function lCs(chr) { return chr.toLowerCase(); };
function uCs(chr) { return chr.toUpperCase(); };
function rd2(num) { return Number(num.toFixed(2)); };
function pct(num) { return rd2((num * 100)); };
function clM(src) { return src.map(m => eRx(m).trim()).join('|'); };
function clp(txt) { return String(txt || "").replace(CL_CPS, " ").replace(CL_CLB, "\n").trim(); };
function nNl(vbl) { return (vbl === "undefined" || vbl === "" || vbl === null || !vbl) ? true : false; };

function cWd(str) {
  if (nNl(str)) { return 0; };
  const txt = String(str).trim();
  return txt.split(S_WS).filter(Boolean).length;
}

function ckL(lb, dta, sz = 4000) {
  let c = 0;
  if (nNl(dta)) { return; };
  const txt = (typeof dta === 'object') ? JSON.stringify(dta, null, 2) : String(dta);
  const tl = Math.ceil(txt.length / sz);
  for (let i = 0; i < txt.length; i += sz) {
    c++;
    console.log(`${lb} CHUNK ${c} of ${tl}:\n${txt.substring(i, i + sz)}`);
  }
}

function rRx(out, chs, clL) {
  if (clL === "HTML" || clL === "Plain Text") {
    chs.forEach(([p, r, l]) => {
      out = (r === "fm") ? p(out) : out.replace(p, r);
      if (dbg) { console.log(`🆗 COMPLETED: ${l} 🆗`) };
      if (dCl) { ckL(`🐞🐞 AFTER ${clL} ${l} 🐞🐞`, clp(out)); };
    });
  } else {
    chs.forEach(([p, r]) => { out = (r === "fm") ? p(out) : out.replace(p, r); });
  }
  if (dbg) { console.log(`🆗 COMPLETED: ${clL} rRx 🆗`) };
  return out;
}

function cTC(num) {
  if (!Number.isFinite(num)) { return ""; };
  try { return String.fromCodePoint(num); } catch (e) { return ""; };
}

function dMg(src) {
  const ENT = {
    amp: "&", apos: "'", bull: "•", copy: "©", gt: ">", hellip: "…", laquo: "«", lsquo: "'", ldquo: '"', lt: "<",
    mdash: "—", middot: "·", nbsp: " ", ndash: "-", newline: "\n", ntilde: "ñ", ordm: "°", quot: '"', raquo: "»",
    rarr: "→", reg: "®", rsaquo: "›", rsquo: "'", rdquo: '"', shy: "", times: "×", trade: "™", zwnj: ""
  },
  RGX1 = [ [D_QPB, ""], [D_QPC, "%$1"] ],
  RGX2 = [
    [D_ANY, (_, hex) => cTC(parseInt(hex, 16))],
    [D_NU, (_, dec) => cTC(parseInt(dec, 10))],
    [D_LTR, (m, name) => (name in ENT ? ENT[name] : m)],
    [D_AMP, "&"], [D_LB, "\n"], [D_MD, "—"]
  ]
  let out = String(src || "");
  const clL = "Decode Message";
  if (D_QPC.test(out)) {
    out = rRx(out, RGX1, clL);
    try { out = decodeURIComponent(out); } catch (e) { out; };
  }
  out = rRx(out, RGX2, clL);
  if (dbg) { console.log(`🆗 COMPLETED: dMg 🆗`); };
  return out;
}

function fxT(src) {
  let mch;
  const wdC = cWd(src);
  for (let i = 0; i < wdC; i++) {
    while ((mch = M_TBK.exec(src)) !== null) {
      src = src.replace((new RegExp(`${eRx(mch[0])}`)), (mch[0].replace(M_LBS, " ")));
    }
  }
  src = src.replace(CL_TGS, "$1>");
  return src;
}

function cHS(htm) {
  const tgs = [
    { o: '<head', c: '</head>', l: 7 }, { o: '<style', c: '</style>', l: 8 }
  ];
  tgs.forEach(tg => {
    const lcH = lCs(htm);
    let res = '', i = 0;
    while (i < htm.length) {
      const st = lcH.indexOf(tg.o, i), nd = lcH.indexOf(tg.c, st);
      if (st === -1) { res += htm.slice(i); break; };
      res += htm.slice(i, st);
      if (nd === -1) { res += htm.slice(st); break; };
      i = nd + tg.l;
    }
    htm = res;
  });
  return htm;
}

function cIA(src) {
  let txt = String(src || ""), ig;
  while ((ig = M_IGA.exec(txt)) !== null) {
    const alt = ig[1] || "", notAlt = M_NAT.test(alt),
    sp = / /.test(alt), p = new RegExp(`${eRx(ig[0])}`);
    if (alt.length > 3 && !notAlt && sp) {
      txt = txt.replace(p, `${alt}`);
    } else {
      txt = txt.replace(p, "");
    }
  }
  return txt;
}

function cAt(htm) {
  lIx(P_ATG); let tg, nLs = false;
  while ((tg = P_ATG.exec(htm)) !== null) {
    lIx(M_ATT); let ts = tg[0], am, ct = ts.replace(CL_TGA, "");
    while ((am = M_ATT.exec(ts)) !== null) {
      let ma = am[0], mn = am[1];
      if (M_SYP.test(mn)) {
        let cs = (am[3] || am[4] || "").replace(M_SYA, function(pp, pn, pv) {
          let nm = parseInt(pv, 10);
          const ps = [
            { py: M_SYL.test(pn), vl: M_SYN.test(pv), tg: CH_BLT.exec(ts) },
            { py: M_SYF.test(pn), vl: M_SYI.test(pv) },
            { py: M_SYW.test(pn), vl: M_SYB.test(pv) || (nm >= 600 && nm <= 900) }
          ];
          const m = ps.find(p => p.py); if (m) {
            if (m.py && m.vl) { if (m.tg) { nLs = true; }; return pp; } else { return ""; };
          } else { return ""; }
        });
        let tm = cs.replace(S_WS, "").trim();
        ct = cs && (tm !== null && tm !== undefined && tm !== "") ? ct.replace(ma, `style="${cs}"`) : ct.replace(ma, "");
      } else if (CL_ATT.test(mn)) { ct = ct.replace(ma, ""); };
    }
    if (ct !== ts) {
      ct = ct.replace(CL_TGS, "$1>").replace(CL_TGY, `style="`).trim();
      htm = htm.slice(0, tg.index) + ct + htm.slice(tg.index + ts.length);
      P_ATG.lastIndex = tg.index + ct.length;
    }
  }
  return { htm: htm, nLs: nLs }
}

function cBT(out) {
  const ts = ["div", "span", "p", "td"];
  ts.forEach(tg => {
    const bt = new RegExp(`<${tg}>`, "i"),
    ol = tg.length + 2, cl = tg.length + 3;
    let st = out.search(bt);
    while (st !== -1) {
      let dt = 1, i = st + ol;
      while (i < out.length) {
        const rt = out.slice(i);
        if ((new RegExp(`^<${tg}[\\s>]`, "i")).test(rt)) { dt++; i += ol; continue; };
        if ((new RegExp(`^<\\/${tg}>`, "i")).test(rt)) {
          dt--; if (dt === 0) {
            out = out.slice(0, i) + out.slice(i + cl);
            out = out.slice(0, st) + out.slice(st + ol);
            break;
          }
          i += cl; continue;
        }
        i++;
      }
      if (dt !== 0) {
        const nt = out.slice(st + ol).search(bt);
        st = nt === -1 ? -1 : st + ol + nt;
      } else { st = out.search(bt); };
    }
  });
  return out;
}

function cvL(txt) {
  let nL, bL;
  while ((nL = M_LNU.exec(txt)) !== null) {
    for (let i = 0; i < nL[1].length;) {
      const nLi = M_LI.exec(nL[1]);
      if (nNl(nLi)) { continue; } else if (nLi) {
        const nLiPtn = new RegExp(`${eRx(nLi[1])}`);
        i++; txt = txt.replace(nLiPtn, `${i}. ${nLi[2].replace(P_ALB, " ")}`);
      }
    }
  }
  while ((bL = M_LBL.exec(txt)) !== null) {
    lIx(M_LI);
    for (let j = 0; j < bL[1].length;) {
      const bLi = M_LI.exec(bL[1]);
      if (nNl(bLi)) { break; } else if (bLi) {
        const bLiPtn = new RegExp(`${eRx(bLi[1])}`);
        j++; txt = txt.replace(bLiPtn, `• ${bLi[2].replace(P_ALB, " ")}`);
      }
    }
  }
  return txt;
}

function fxP(out) {
  const ptns = [
    [F_PNC, "$1$2"],   [F_NU, "$1 $2"], [F_CMS, "$1, $2"], [F_CML, "$1, $2"]
  ];
  const clL = "Fix Punctuation"; out = rRx(out, ptns, clL);
  return out;
}

function cPL(rwP, wdC) {
  let pLnk;
  for (let i = 0; i < wdC; i++) {
    while ((pLnk = CL_LKI.exec(rwP)) !== null) {
      if (!M_NAT.test(pLnk[1])) {
        const pLp = new RegExp(`${eRx(pLnk[0]) || ""}`);
        rwP = rwP.replace(pLp, `${pLnk[1]}`);
      }
    }
  }
  return rwP;
}

function exH(raw) {
  if (nNl(raw)) { return ""; };
  raw = String(raw || "");
  let htm = M_HTM.exec(raw) || "";
  htm = htm ? htm[1] : "";
  return htm;
}

function exP(raw) {
  let scP = false, out = raw;
  if (nNl(raw)) { return ""; };
  raw = String(raw || "");
  let pA = M_PAF.exec(raw) || "";
  const pAt = M_OTG.test(pA[1]), pAW = cWd(pA[1]);
  pA = pAt ? "" : pA[1].replace(P_ATG, "").trim();
  if (nNl(pA[1]) || pAt || pAW === 0) {
    scP = false; out = "";
  } else { scP = true; out = pA };
  return { scP, raP: out };
}

function cHC(htm, clL) {
  if (nNl(htm)) {
    if (dbg) { console.log(`🛑 FILTER: NO HTML - SKIPPING CLHCN`); };
    return { out: htm, cMs: false, cWs: false, isTh: false };
  }  
  let out = String(htm || "");
  const isTh = CL_PVS.test(out), cWs = CH_WS.test(out), cMs = CH_MS.test(out);
  out = out.replace(CL_PVS, "$1");
  const chs = [
    [fxT, "f", "fxT"],        [F_BK, "\n$1\n", "F_BK"], [CL_HDN, "", "CL_HDN"],     [CL_HDS, "", "CL_HDS"],
    [CL_CMT, "", "CL_CMT"],   [cHS, "f", "cHS"],        [CL_UDZ, "", "CL_UDZ"],     [CL_UDS, " ", "CL_UDS"],
    [CL_UDD, "-", "CL_UDD"],  [CL_UDL, "\n", "CL_UDL"], [F_SBP, " ($2) ", "F_SBP"], [F_TGY, "$1 $2", "F_TGY"],
    [F_IEJ, "$1", "F_IEJ"],   [cIA, "f", "cIA"],        [CL_TSR, "\n\n", "CL_TSR"], [CL_TDE, "$<ej1> ", "CL_TDE"],
    [CL_TDT, "\n", "CL_TDT"], [CL_TFR, "", "CL_TFR"],   [CL_TFG, "\n", "CL_TFG"],   [F_TGL, "<$1>", "F_TGL"],
    [F_TSP, "$1$2", "F_TSP"], [CL_UHM, "", "CL_UHM"],   [CL_AFT, "", "CL_AFT"],     [h => cAt(h).htm, "f", "cAt"],
    [cBT, "f", "cBT"],        [cvL, "f", "cvL"],        [CL_LKA, "<$1>", "CL_LKA"], [CL_LKS, "$1", "CL_LKS"],
    [CL_LKE, "", "CL_LKE"],   [CL_DSH, "", "CL_DSH"],   [CL_XBT, "$1", "CL_XBT"],   [fxP, "f", "fxP"]
  ];
  out = rRx(out, chs, clL); out = clp(out);
  if (dbg) { console.log(`🆗 COMPLETED: cHC 🆗`); };
  return { out: out, cMs: cMs, cWs: cWs, isTh: isTh };
}

function cPC(ptx, clL) {
  if (nNl(ptx)) {
    if (dbg) { console.log(`🛑 FILTER: NO PLAIN TEXT - SKIPPING CLPCN`); };
    return { out: ptx, isTp: false };
  }
  let out = String(ptx || "");
  const isTp = CL_PVS.test(out);
  if (isTp) { out = out.replace(CL_PVS, "$1") };
  const chs = [
    [P_ATG, "", "P_ATG"],     [CL_UDZ, "", "CL_UDZ"],   [CL_UDS, " ", "CL_UDS"],
    [CL_UDD, "-", "CL_UDD"],  [CL_UDL, "\n", "CL_UDL"], [CL_CMT, "", "CL_CMT"],
    [CL_LKP, "", "CL_LKP"],   [F_PNC, "$1$2", "F_PNC"], [CL_MD, "$1", "CL_MD"],
    [CL_AFT, "", "CL_AFT"],   [F_NU, "$1 $2", "F_NU"],  [CL_LKS, "$1", "CL_LKS"],
    [CL_DSH, "", "CL_DSH"],   [CL_MIT, "$1", "CL_MIT"], [CL_MBD, "$1", "CL_MBD"],
    [CL_MBT, "$1", "CL_MBT"], [CL_MSK, "$1", "CL_MSK"], [P_MDH, "", "P_MDH"]
  ];
  out = rRx(out, chs, clL);
  const pWC = cWd(out); out = cPL(out, pWC);
  out = clp(out);
  if (dbg) { console.log(`🆗 COMPLETED: cPC 🆗`); };
  return { cnP: out, isTp: isTp };
}

function sHF(txt) {
  const ps = [M_PDA, M_PDN, M_PDE];
  ps.forEach(p => txt = txt.replace(p, "$1⭕$2"));
  let cks = txt.split(S_HF), out = [];
  for (let i = 0; i < cks.length; i += 2) {
    let t = cks[i] ?? "", sp = cks[i + 1] ?? "";
    if (t === "" && sp === "") { continue; };
    out.push([t, sp]);
  }
  return out;
}

function jHF(cks) { let jd = ""; for (let i = 0; i < cks.length; i++) { jd += cks[i][0] + cks[i][1]; }; return jd; };

function cHF(src, stl) {
  let txt = src.trim();
  const lns = sHF(txt).filter(ln => !M_OTG.test(ln[0])).filter(ln => !M_OPC.test(ln[0])),
  noLs = lns.length, hEd = Math.min((noLs * 0.3), noLs),
  fSt = Math.max(hEd,noLs-(noLs * 0.6)),
  bdy = jHF(lns.slice(hEd, fSt)).replace(F_PRD, "."),
  hFr = jHF(lns.slice(fSt));
  let hdr = lns.slice(0, hEd), ftr = lns.slice(fSt);
  hdr = hdr.map(ln => [ln[0].replace(P_ATG, "").replace(F_PRD, "."), ln[1]]);
  ftr = ftr.map(ln => [ln[0].replace(P_ATG, "").replace(F_PRD, "."), ln[1]]);
  const wdC = cWd(jHF(hdr) + `\n` + bdy +`\n` + jHF(ftr));
  if (dev) { console.log(`📐 PRECLEAN WORD COUNT: ${wdC}\n\n📐 LINES: ${noLs}`); };
  if (wdC < 30) { return { txt, hFr: "" }; };
  if (hdr.some(ln => CL_HR.test(ln[0]))) {
    if (dev) { console.log(`🗣️ HEADER MATCH(ES) 🗣️:\n${hdr.filter(ln => CL_HR.test(ln[0]))}`); };
    hdr = hdr.filter(ln => !CL_HR.test(ln[0]));
  }
  hdr = jHF(hdr); let lLns, fLns;
  if (ftr.length >= 20) {
    lLns = ftr.slice(-15); fLns = ftr.slice(0, -15);
  } else {
    lLns = ftr.slice(-8); fLns = ftr.slice(0, -8);
  }
  const lLn = lLns[lLns.length - 1],
  addM1 = (lLns.map(ln => ln[0].match(CL_AD))).filter(Boolean),
  addM2 = (lLns.map(ln => ln[0].match(CL_AD2))).filter(Boolean);
  if (addM1 || addM2) {
    for (let i = 0; i < lLns.length; i++) {
      const aLn1 = lLns[i] || [] || [], aLn2 = lLns[i + 1] || [] || [],
      aLn3 = lLns[i + 2] || [] || [], mA1 = CL_AD.exec(aLn1[0] || []),
      mA2 = CL_AD2.exec(aLn2[0] || []) || CL_AD.exec(aLn2[0] || []),
      mA3 = CL_AD2.exec(aLn3[0] || []) || CL_AD.exec(aLn3[0] || []);
      if (nNl(aLn1) || !mA1) { continue; };
      if (mA1) {
        if (dev) {
          console.log(`🏠 ADDRESS MATCH(ES): ${lBl}${mA1}` + (mA2 ? `${lBl}${mA2}` : '') + (mA3 ? `${lBl}${mA3}` : ''));
        }
        if (mA2) {
          if (mA3) { lLns.splice(i,3); } else if (!mA3 || aLn2 === lLn) { lLns.splice(i,2); };
        } else { lLns.splice(i); };
      } else if ((!mA2 && !mA3) || aLn1 === lLn) { lLns.splice(i); };
    }
  }
  let cS = false;
  for (let j = 0; j < lLns.length; j++) {
    const l1 = (String(lLns[j]).trim()).split(S_WS),
    l2 = (String(lLns[j + 1]).trim()).split(S_WS),
    sM1 = l1.filter(w => CL_SC.test(w)),  sM2 = l2.filter(w => CL_SC.test(w)),
    iM1 = l1.filter(w => CL_SC2.test(w)), iM2 = l2.filter(w => CL_SC2.test(w));
    if (l1.length === 0 && l2.length === 0) { break; };
    const t = { s1: sM1.length > 0, i1: iM1.length > 0, s2: sM2.length > 0, i2: iM2.length > 0 };
    if (dev) {
      if (t.s1) { console.log(`🌐 SOCIAL MATCH(ES) 🌐:${lBl}${sM1}` + (t.s2 ? `${lBl}${sM2}` : ``)); };
      if (t.i1) { console.log(`🌐 INTERACTION MATCH(ES) 🌐:${lBl}${iM1}` + (t.i2 ? `${lBl}${iM2}` : ``)); };
    }
    if (((t.s1 || t.i1) && (t.s2 || t.i2)) || sM1.length > 1 || iM1.length > 1) { cS = true; break; };
  }
  const ps = [CL_SC, CL_SC2];
  if (cS) { ps.forEach(p => { lLns = lLns.filter(ln => !p.test(ln[0])); }); };
  if (lLns.some(ln => CL_LLN.test(ln[0]))) {
    if (dev) {
      console.log(`🔚 LAST LINES MATCH(ES) 🔚:\n${lLns.filter(ln => CL_LLN.test(ln[0]))}`);
    }
    lLns = lLns.filter(ln => !CL_LLN.test(ln[0]));
  }
  if (!stl) { lLns = lLns.map(ln => [ln[0].replace(CL_OPT, ""), ln[1]]); };
  ftr = (nNl(lLns)) ? fLns : fLns.concat(lLns);
  const sF = jHF(ftr), fPtns = [CL_FR, CL_FRB, CL_FRC, CL_HFF];
  fPtns.forEach(ptn => {
    if (ftr.some(ln => ptn.test(ln[0]))) {
      if (dev) { console.log(`👣 FOOTER MATCHES 👣:\n${ftr.filter(ln => ptn.test(ln[0]))}`); };
      ftr = ftr.filter(ln => !ptn.test(ln[0]));
    }
  });
  ftr = jHF(ftr);
  const prndWc = cWd(hdr + `\n` + bdy + `\n` + ftr);
  if (dev) { console.log(`📐 PRUNED WORD COUNT: ${prndWc}`); };
  if (prndWc <= (wdC / 4)) {
    if (dev) { console.log(`🛑 FILTER: OVER-PRUNED (USING SAFE FOOTER) 🛑`); };
    ftr = sF;
  }
  const clL = "Clean Header/Footer";
  txt = clp((hdr + `\n` + bdy + `\n` + ftr), clL);
  if (dbg) { console.log(`🆗 COMPLETED: ${clL} cHF 🆗`); };
  return { txt, hFr };
}

function pCl(src, clL) {
  let out = String(src || "");
  const RGX = [
    [CL_TSP, "\n", "CL_TSP"], [CL_TBC, "", "CL_TBC"], [CL_TGB, "", "CL_TGB"],
    [P_ATG, "", "P_ATG"],     [F_BL, "$1 $2", "FL_BL"],     [CH_EJ, "", "CL_EJ"]
  ];
  out = rRx(out, RGX, clL); out = clp(out);
  if (dbg) { console.log(`🆗 COMPLETED: ${clL} pCl 🆗`); };
  return out;
}

// FILTERS //

function cnF(clH, clP, mpH, isT) {
  let h = true, p = true, fm, v, r;
  const hWc = cWd(clH), pWc = cWd(clP), pTp = M_NOP.exec(clP),
  nH = (nNl(clH) || hWc <= 5), nP = (nNl(clP) || pWc <= 5),
  lbD = rd2(pWc / clP.split("\n").length), noN = ((lbD > 40) || !P_ALB.test(clP));
  if (dev) {
    console.log(`📐 HTML WORD COUNT: ${hWc}\n📐 PLAIN WORD COUNT: ${pWc}`);
    console.log(`🧱 PLAIN TEXT LINE BREAK DENSITY: ${lbD}`);
  }
  if (nH && nP) {
    fm = isT ? fNCT : fNC;
    r = isT ? `TOP MESSAGE <= 5 WORDS` : rNC;
    if (dev) { `🛑 FILTER: NO CONTENT ${r}` };
    return { h: false, p: false, fm }
  }
  if (nH) { h = false; v = "HTML"; };
  if (nP || mpH || pTp || noN) { p = false; v = "PLAIN TEXT"; };
  const rls = [
    { t: (nH || nP), r: rNC }, { t: mpH, r: "MISPLACED HTML" },
    { t: pTp, r: `PLACEHOLDER/TEMPLATE (${pTp})` }, { t: noN, r: `LINE BREAK DENSITY (${lbD})` }
  ];
  const rt = rls.find(rl => rl.t); if (rt) { r = rt.r };
  if (!h && !p) { fm = isT ? fNCT : fNC; };
  if (dev && (!h || !p)) {
    console.log(`🛑 FILTER: ` + (v ? v : 'NO CONTENT') + ` ${r} - SKIPPING SCAM CHECK 🛑`);
  }
  return { h, p, fm };
}

function szF(src, thd, lb) {
  const txt = String(src || "");
  let mgS = txt.length, unt = "B"; const kb = 1024, mb = 1048576;
  const bMg = (mgS > thd) ? true : false;
  if (mgS > kb) {
    if (mgS > mb) { mgS = mgS / mb; unt = "MB"; } else { mgS = mgS / kb; unt = "KB"; };
  }
  mgS = rd2(mgS);
  if (dev) {
    if (bMg) {
      console.log(`🛑 FILTER: ${lb} SIZE (${mgS} ${unt}) 🛑`);
    } else { console.log(`📐 ${lb} SIZE: ${mgS} ${unt}`); };
  }
  return bMg;
}

function btF(raw) {
  raw = raw.replace(CL_CMT, "");
  const chs = [
    { ch: raw.split(S_GHH).length > 20, rn: `👻 GHOST HEADER` },
    { ch: ((raw.split("<").length - 1) / raw.length) > 0.25, rn: `🏷️ TAG DENSITY` },
    { ch: raw.split("mso]").length > 10, rn: `🔭 OUTLOOK TAGS` }
  ];
  const mch = chs.find(c => c.ch);
  if (mch) { if (dev) { console.log(`🛑 FILTER: BLOATED - ${mch.rn} 🛑`); }; return true; };
  return false;
}

function dSm(clH, clP) {
  let scm = false, hMCn = 0, pMCn = 0;
  const gtTkn = (txt) => new Set(lCs(String(txt || "")).match(M_TKN) || []),
  clL = "Detect Scam"; clH = pCl(clH, clL);
  const hTkn = gtTkn(clH), pTkn = gtTkn(clP);
  hTkn.forEach(token => { if (pTkn.has(token)) hMCn++; });
  pTkn.forEach(token => { if (hTkn.has(token)) pMCn++; });
  const hSim = hTkn.size ? (hMCn / hTkn.size) : 0,
  pSim = pTkn.size ? (pMCn / pTkn.size) : 0;
  const hIp = clH.includes(clP), pIh = clP.includes(clH);
  if (hSim < 0.4 && pSim < 0.4 && !hIp && !pIh) { scm = true; };
  if (dev) {
    console.log(`❓ HTML INCLUDES PLAIN TEXT? ${hIp} ❓\n❓ PLAIN TEXT INCLUDES HTML? ${pIh} ❓`);
    console.log(`📐 HTML > PLAIN SIMILARITY: ${pct(hSim)}%\n📐 PLAIN > HTML SIMILARITY: ${pct(pSim)}%`);
  }
  return scm;
}

function ckT(txt, mL) {
  const s = String(txt || ""), cks = [];
  let srt = 0, N = s.length;
  while (srt < N) {
    let end = Math.min(srt + mL, N);
    const pce = s.slice(srt, end).trim();
    if (end < N) { let wst = s.lastIndexOf(" ", end - 1);
    if (wst <= srt) wst = end; end = wst; };
    if (pce) cks.push(pce); srt = end + 1;
  }
  return cks;
}

// MATCHERS & COUNTERS //

function mBc(src, sbj, sdr) {
  let txt = String(src || ""), bg = false, bgC = false, stl = false;
  const slm = M_SLT.exec(sbj);
  if (slm) { stl = true; if (dev) { console.log(`💵 SETTLEMENT MATCH: ${slm}`); }; };
  const fPns = [CL_FR, CL_FRC, CL_HR, CL_LLN];
  fPns.forEach(fPn => { lIx(fPn); if (fPn.test(txt)) { bgC = true; }; });
  if (M_BSR.test(sdr) || CL_FRB.test(txt)) { bg = true; };
  if (M_CSJ.test(sbj) || bg)  { bgC = true; };
  if (dbg) { console.log(`🆗 COMPLETED: mBc 🆗`); };
  return { bg, bgC, stl };
}

function mBd(wds) {
  lIx(P_ATG); let lg = "", bHg = true, bNm = true, bSc = true, lb = "";
  const wdC = wds.length;
  if (wdC < 2 || /\|/.test(wds)) {
    if (dBd) { console.log(`🚫 ${lBT} < 2 WORDS/PIPE ("${wds}")`); };
    return { bHg: false, bNm: false, bSc: false };
  }
  if (M_OTG.test(wds)) {
    if (dBd) { console.log(`🚫 ${lBT} TAGS ONLY ("${wds}")`); };
    return { bHg: false, bNm: false, bSc: false };
  }
  for (let i = 0; i < wds.length; i++) {
    const wd = wds[i].trim(), l1 = wd.charAt(0), lw1 = wds[0].charAt(0);
    if (!wd || wd.length === 1) { continue; };
    if (!P_ALR.test(wd)) {
      lb = lBT; lg = "NO LETTERS";
      return { bHg: false, bNm: false, bSc: false };
    }
    const chs = [
      { ch: wd === uCs(wd), bNm: false, lb: lBN, lg: "ALL CAPS" },
      { ch: l1 !== uCs(l1), bNm: false, lb: lBN, lg: "LOWER 1ST LETTER" },
      { ch: P_NU.test(wd), bNm: false, lb: lBN, lg: "NUMBER(S)" },
      { ch: lw1 !== uCs(lw1) && !P_APH.test(wd), bHg: false, lb: lBH, lg: "NOT 1ST WORD CAPS" }
    ];
    chs.forEach(c => {
      if (c?.ch) {
        if (c.bHg === false) { bHg = false; };
        if (c.bNm === false) { bNm = false; };
        if (c.lg) { lg = c.lg; };
        if (c.lb) { lb = c.lb; };
      }
    });
    if (dBd) {
      if (!(nNl(lg))) { console.log(`🚫 ${lb} ${lg} ("${wds}")`); };
    }
  }
  const wcs = [
    { w: wdC < 3, bSc: false, lb: lBS, lg: "< 3 WORDS" },
    { w: wdC > 4, bNm: false, lb: lBN, lg: "> 4 WORDS" },
    { w: wdC > 8, bHg: false, lb: lBH, lg: "> 8 WORDS" }
  ];
  wcs.forEach(wc => {
    if (wc?.w) {
      lb = wc.lb; lg = wc.lg;
      if (wc.bSc === false) { bSc = false; };
      if (wc.bNm === false) { bNm = false; };
      if (wc.bHg === false) { bHg = false; };
    }
  })
  if (dbg) { console.log(`🆗 COMPLETED: mBd 🆗`); };
  return { bHg: bHg, bNm: bNm, bSc: bSc };
}

function mBN(ftr) {
  lIx(P_ATG); lIx(S_NU); let cBN = false, bNT = "", mch;
  while ((mch = CH_BNU.exec(ftr)) !== null) {
    let mTx = String(mch[2]).replace(P_ATG, "");
    if (!mTx) { continue; };
    if (!P_PCT.test(mTx)) {
      const wds = mTx.split(S_NU).filter(w => w), wrdLt = wds.length;
      if (wrdLt > 1 && wrdLt < 5) {
        if (mBd(wds).bNm) {
          cBN = true; bNT = mTx;
          if (dev) { console.log(`✅ BOLD NAME MATCH: ${bNT}`); };
        }
      }
    }
  }
  if (dbg) { console.log(`🆗 COMPLETED: mBN 🆗`); };
  return { cBN: cBN, bNT: bNT };
}

function cBd(src, cBN, bNT) {
  lIx(CH_BD); let mch, bd = { bHC: 0, bSC: 0, eHC: 0, nHC: 0, hLs: 0 };
  let txt = cBN ? src.replace(new RegExp(bNT, "g"), "") : src;
  txt = txt.replace(CL_LK, "").trim();
  const lLns = (txt.split('\n')).filter(l => (!M_OTG.test(l) && !M_WSO.test(l))).slice(-5).join('\n');
  while ((mch = CH_BD.exec(txt)) !== null) {
    const bdM = `("${mch[0]}")`; let lg = "";
    if (mch.length === 0) {
      if (dBd) { console.log(`🚫 ${lBT} NO CONTENT ${bdM}`) };
      continue;
    }
    if (M_FNR.test(mch[0])) {
      if (dBd) { console.log(`🚫 ${lBT} INLINE NORMAL FONT ${bdM}`) };
      continue;
    }
    const mEj = mch.groups.emj, mNo = mch.groups.num, cn = mch.groups.cnt, clMc = eRx(mch[0]);
    const cPc = M_HP.test(cn), cLl = (new RegExp(`${clMc}`)).test(lLns), tOly = M_OTG.test(cn),
    cHg = (new RegExp(`${P_OLO.source}\\s*(${clMc})\\s*${P_OLC.source}`)).test(txt);
    const { bHg, bSc } = mBd(cn.split(S_WS));
    const isH = (bHg && cHg && !cLl && !cPc);
    if ((bHg || bSc) && dBd) {
      if (tOly) { console.log(`🚫 ${lBT} TAGS ONLY ${bdM}`) };
      if (!cHg) { console.log(`🚫 ${lBH} NOT OWN LINE ${bdM}`); };
      if (cLl) { console.log(`🚫 ${lBH} LAST 5 LINES ${bdM}`) };
      if (cPc) { console.log(`🚫 ${lBH} SENTENCE PUNCTUATION ${bdM}`) };
    }
    if (isH && !tOly) {
      if (mEj) {
        bd.eHC++; lg = `🙂 EMOJI HEADING MATCH: "${mEj}"`;
      } else if (mNo) {
        bd.nHC++; lg = `🔢 NUMBER HEADING MATCH: "${mNo}"`;
        if (CH_N1.test(mNo)) { bd.hLs++; };
      } else {
        bd.bHC++; lg = "🔝 BOLD HEADING MATCH: ";
      }
    } else if (bSc && !isH && !tOly) {
      bd.bSC++; lg = `🖊️ BOLD SENTENCE MATCH: `;
    }
    if (dev && lg !== "") { console.log(`${lg} ("${cn}")`); };
  }
  if (dbg) { console.log(`🆗 COMPLETED: cBd 🆗`); };
  return bd;
}

function cBl(txt) {
  const ptns = [CH_BEJ, CH_BLN, CH_BLT, CH_BLX, P_ATG];
  ptns.forEach(ptn => lIx(ptn));
  let blC = 0, eBlC = 0, ejC = 0, tBl = 0, xBl = 0;
  const ulTg = txt.match(CH_BLT), nLs = cAt(ulTg).nLs;
  if (ulTg && !nLs) { tBl += ulTg.length; };
  txt = txt.replace(P_ATG, "");
  const blTx = CH_BLX.exec(txt), blEj = CH_BEJ.test(txt), pghs = txt.split(S_PRA);
  let ctv = 0, gap = 0, i = 0, pgh = "";
  if (blTx) {
    const fstBl = String(eRx(blTx[1]));
    for (i = 0; i < pghs.length; i++) {
      pgh = pghs[i].trim(); if (!pgh) { continue; };
      if ((new RegExp(`^${fstBl}${P_WS.source}${P_LRN.source}`)).test(pgh)) { ctv++; gap = 0; } else if (ctv > 0) {
        gap++; if (gap >= 1) { if (ctv >= 2) { xBl++; } ctv = 0; gap = 0; };
      }
    }
    if (ctv >= 2) { xBl++; };
  }
  blC = tBl + xBl;
  if (blEj) {
    for (i = 0; i < pghs.length; i++) {
      pgh = pghs[i].trim(); if (!pgh) { continue; };
      if (CH_HTG.test(pgh)) { i++; }; const ejSt = CH_BLN.test(pgh);
      if (ejSt) { ctv++; gap = 0; } else if (ctv > 0) {
        gap++; if (gap >= 1) { if (ctv >= 2) { eBlC++;  ejC += ctv; }; ctv = 0; gap = 0; };
      }
    }
    if (ctv >= 2) { eBlC++; ejC += ctv; };
  }
  if (dbg) { console.log(`🆗 COMPLETED: cBl 🆗`); };
  return { blC, eBlC, ejC };
}

function cNm(txt) {
  lIx(CH_NUX); lIx(CH_NUT); const clTx = txt.replace(P_ATG, "");
  const nTx = clTx.match(CH_NUX), nTg = txt.match(CH_NUT);
  let nCt = 0, nTC = 0, nXC = 0;
  if (nTg && !cAt(nTg).nLs) { nTC += nTg.length; };
  if (nTx && CH_N1.test(nTx)) { nXC += 1; };
  nCt = nTC + nXC;
  if (dbg) { console.log(`🆗 COMPLETED: cNm 🆗`); };
  return nCt;
}

function mQa(txt) {
  let cQa, qaM = txt.match(CH_QA);
  if (!qaM) { return false; };
  if (dev && qaM) {
    console.log(`❔ Q&A MATCH(ES): ${qaM[0].replace(P_ATG, "")}`);
  }
  for (let i = 0; i < qaM.length; i++) {
    if (nNl(qaM)) { continue; };
    const clM = eRx(qaM[0]),
    M_QA_OLN = new RegExp(`${P_OLO.source}${clM}${P_OLC.source}`, `i`),
    M_QA_HG = new RegExp(`<(h\\d|a\\b)${P_TSX.source}${clM}${P_TCC.source}`, `i`);
    cQa = M_QA_HG.test(txt) && M_QA_OLN.test(txt) ? false : true;
  }
  if (dbg) { console.log(`🆗 COMPLETED: mQa 🆗`); };
  return cQa;
}

function cEt(txt, cBN, bNT) {
  let cts = {
    bLs: 0, nLs: 0, hdg: 0, hrl: 0, itc: 0, eps: 0,
    mDh: 0, emj: 0, eBl: 0, bSc: 0, bHg: 0, eHg: 0, nHg: 0
  }
  const pCt = {
    hdg: CH_HTG, hrl: CH_HTG, itc: CH_ITC,
    eps: CH_EPS, mDh: CH_EMD, emj: CH_EJ
  }
  for (const [key, pat] of Object.entries(pCt)) {
    lIx(pat); const m = txt.match(pat); cts[key] = m ? m.length : 0;
  }
  const { bSC, bHC, eHC, nHC, hLs } = cBd(txt, cBN, bNT);
  const { blC, eBlC, ejC } = cBl(txt);
  Object.assign(cts, {
    nLs: cNm(txt), bSc: bSC, bHg: bHC,
    bLs: blC, eHg: eHC, nHg: nHC, eBl: eBlC
  });
  if (cts.emj > 0) {
    if (ejC > 0) { cts.emj -= ejC }; if (eHC > 0) { cts.emj -= eHC };
  }
  if (cts.nLs > 0 && hLs > 0) { cts.nLs -= hLs; };
  if (dbg) { console.log(`🆗 COMPLETED: cEt 🆗`); };
  return cts;
}

function mFl(txt, cMs, cWs, ftr) {
  const ptns = [CH_EJV, CH_SF, CH_PH, CH_QA];
  ptns.forEach(ptn => lIx(ptn));
  const snps = { phs: [], qa: [], snf: null, eEj: null, wst: null, msT: null }, flgs = { msT: cMs, wst: cWs },
  cEnv = CH_EJV.exec(txt), snOff = CH_SF.exec(ftr), cQa = mQa(txt);
  if (cEnv) { snps.eEj = cEnv[0].replace(P_ATG, ""); };
  if (snOff) { snps.snf = snOff[1].replace(P_ATG, ""); };
  for (const [key, flg] of Object.entries(flgs)) { if (flg) snps[key] = true; };
  const pcM = Array.from(txt.matchAll(CH_PH)), qaM = Array.from(txt.matchAll(CH_QA)), clL = "Match Flags";
  if (pcM.length) { snps.phs = pcM.map(snp => clp((snp[0].replace(P_ATG, "")), clL)); };
  if (cQa && qaM.length) { snps.qa = qaM.map(snp => clp((snp[0].replace(P_ATG, "")), clL)); };
  if (dbg) { console.log(`🆗 COMPLETED: mFl 🆗`); };
  return snps;
}

function bAR(ck) {
  return {
    url: "https://api.sapling.ai/api/v1/aidetect", method: "post", contentType: "application/json",
    headers: { "Accept": "application/json", "Accept-Encoding": "gzip" },
    payload: JSON.stringify({ key: __SAPLING_KEY, txt: ck, sent_SCRs: false }),
    followRedirects: false, muteHttpExceptions: true
  }
}

function rtA(ck) {
  let last = { code: 400, body: "" };
  for (var atpt = 0; atpt < 2; atpt++) {
    if (atpt > 0) { Utilities.sleep(400); };
    const req = bAR(ck), rsps = UrlFetchApp.fetch(req.url, req),
    code = rsps.getResponseCode(), body = rsps.getContentText();
    last = { code: code, body: body };
    if (code >= 200 && code < 300) { return last; };
    if (code !== 400 || !M_XVL.test(body)) { return last; };
  }
  if (dbg) { console.log(`🆗 COMPLETED: rtA 🆗`) };
  return last;
}

function saE(src) {
  try {
    return pct(aDc(src));
  } catch (err) {
    if (err.message === "TIMEOUT") return eAT;
    const req = bAR(src),
    res = UrlFetchApp.fetch(req.url, req), code = res.getResponseCode();
    if (dbg) { console.log(`🆗 COMPLETED: saE 🆗`) };
    if (code < 200 || code >= 300) { return eAE; } else { return eAT; };
  }
}

// WORKFLOW FUNCTIONS //

function gMg(e) {
  if (!e || !e.gmail || !e.gmail.accessToken) { throw new Error("⛔ MISSING GMAIL ACCESS TOKEN."); };
  GmailApp.setCurrentMessageAccessToken(e.gmail.accessToken);
  const mId = e.gmail.messageId;
  if (!mId) { return null; };
  const msg = GmailApp.getMessageById(mId),
  date = msg.getDate() ? Utilities.formatDate(msg.getDate(), Session.getScriptTimeZone(), "M/d/yyyy h:mm a") : "",
  sbj = String(msg.getSubject() || "").replace(CL_SJ, "").trim(),
  sdr = dMg(msg.getFrom() || "unknown").replace(CL_SDR, "");
  const dta = { mId, date, sbj, sdr };
  let fm, rwCn = msg.getBody() || "";
  if (szF(rwCn, 1024000, "RAW")) { return { ...dta, fm: fZ }; };
  if (btF(rwCn.substring(10000, 20000))) { return { ...dta, fm: fBt }; };
  rwCn = dMg(rwCn);
  const rwH = exH(rwCn);
  if (M_SCH.test(rwH)) { if (dev) { console.log(lHSm); }; return { ...dta, fm: fSm }; };
  const { scP, raP } = exP(rwCn);
  if (dev) { console.log(`❓ SCAM PLAIN TEXT? ${scP} ❓`); };
  const rwP = scP ? raP : dMg(msg.getPlainBody());
  const hWc = cWd(rwH), pWc = cWd(rwP);
  if (hWc < 5 && pWc < 5) { return { ...date, fm: fNC }; };
  let clH, clP, clL = "HTML";
  ({ out: clH, cMs, cWs, isTh } = cHC(rwH, clL));
  clH = clH.replace(CL_DTY, "");
  const mpH = CL_DTY.test(rwP) ? true : false;
  clL = "Plain Text"; ({ cnP, isTp } = cPC(rwP, clL));
  clP = !mpH ? cnP : clH;
  const isT = (isTh || isTp) ? true : false;
  ({ h, p, fm: fm } = cnF(clH, clP, mpH, isT));
  if (!h && !p) { return { ...dta, fm: fm }; };
  if (h && p && dSm(clH, clP)) {
    if (dev) { console.log(lSm); }; return { ...dta, fm: fSm };
  }
  const useP = !h && p ? true : false;
  if (useP && dev) { console.log(lNH); };
  const pMg = useP ? clP : clH, { bg, bgC, stl } = mBc(pMg, sbj, sdr);
  if (dev) {
    console.log(`❓ BLOG? ${bg} \n\n❓ BLOG/CO? ${bgC}`);
    ckL("📝 PRECLEAN CONTENT", pMg);
  }
  let mgCn; ({ txt: mgCn, hFr } = cHF(pMg, stl));
  const snps = mFl(pMg, cMs, cWs, hFr), { cBN, bNT } = mBN(hFr);
  if (cBN) { snps.bNm = true; };
  const cts = cEt(pMg, cBN, bNT);
  clL = "Pre-cleaned Message";
  mgCn = useP ? mgCn.replace(CH_EJ, "") : pCl(mgCn, clL);
  let wdC = cWd(mgCn);
  if (dev) { ckL(`📝 POSTCLEAN CONTENT`, mgCn); console.log(`📐 SAP WORD COUNT: ${wdC}`); };
  if (dbg) { console.log(`🆗 COMPLETED: gMg 🆗`); };
  return { ...dta, mgCn: mgCn, bg: bg, bgC: bgC, cBN: cBN, bNT: bNT, cts: cts, snps: snps, wdC: wdC };
}

function gCS(dta) {
  const { sbj, sdr, snps, bg, bgC } = dta;
  let { bNm, eEj, wst, msT, snf } = snps, pMg = null, qMg = null;
  const phS = snps.phs || [], qaS = snps.qa || [], fCs = { ...dta.cts };
  if ((bgC) && !CH_SF2) { bNm = null; };
  if (eEj && fCs.emj > 1) { fCs.emj--; };
  if (M_AZO.test(sbj) || M_AZN.test(sdr)) { fCs.eps = 0 };
  const cln = (t) => t ? clp(t) : null, sfX = cln(snf), evX = cln(eEj),
  sPh = phS.map(s => { const t = String(s || ""); return CH_PHE.test(t) ? t : `${t}...`; }).filter(Boolean),
  sQa = qaS.map(a => { const q = String(a || ""); return CH_PHE.test(q) ? q : `${q}...`; }).filter(Boolean);
  if (sPh.length === 1) {
    pMg = `Phrase(s): "${sPh[0]}"`;
  } else if (sPh.length > 1) {
    pMg = `Phrase(s):` + sPh.map(s => `${lBl}"${s}"`).join("");
  }
  if (sQa.length === 1) {
    qMg = `Q&A: "${sQa[0]}"`;
  } else if (sQa.length > 1) {
    qMg = `Q&A:` + sQa.map(a => `${lBl}"${a}"`).join("");
  }
  const rules = [
    { vl: fCs.bHg, lb: 'Bold Headings:', scr: 3 },
    { vl: fCs.eHg, lb: 'Emoji Headings:', scr: 90 },
    { vl: fCs.nHg, lb: 'Numbered Headings:', scr: 10 },
    { vl: fCs.bSc, lb: 'Bold Sentences:', scr: 20 },
    { vl: fCs.bLs, lb: 'Bulleted Lists:', scr: 3 },
    { vl: fCs.eps, lb: 'Ellipses:', scr: 10 },
    { vl: fCs.mDh, lb: 'EM Dashes:', scr: 10 },
    { vl: fCs.eBl, lb: 'Emoji Bullets:', scr: 100 },
    { vl: fCs.emj, lb: 'Emojis:', scr: 50 },
    { vl: fCs.hdg, lb: 'Headings:', scr: 8 },
    { vl: fCs.hrl, lb: 'Horizontal Lines:', scr: 8 },
    { vl: fCs.itc, lb: 'Italics:', scr: 5 },
    { vl: fCs.nLs, lb: 'Numbered Lists:', scr: 3 },
    { vl: pMg, txt: pMg, scr: 70 },
    { vl: qMg, txt: qMg, scr: 70 },
    { vl: bNm, txt: `Bold Name in Signature`, scr: 20 },
    { vl: evX, txt: `Envelope Emoji: ${evX}`, scr: 50 },
    { vl: msT, txt: `Mailsuite Tracking`, scr: 80 },
    { vl: sfX, txt: `Sign-off: "${sfX}"`, scr: 90 },
    { vl: wst, txt: `Wisestamp Signature`, scr: 80 }
  ];
  const tgr = []; let cSr = 0, pts = 0;
  rules.forEach(r => {
    if (r?.vl) {
      pts++;
      if (r.lb) {
        tgr.push(` 🔸 ${r.lb} ${r.vl}`);
      } else { tgr.push(` 🔸 ${r.txt}`); };
      cSr += r.scr;
    }
  });
  if (dev) { console.log(`📐 MULTIPLICATION POINTS: ${pts}`); }
  cSr = Math.sqrt(cSr * (pts * 10)); cSr = Math.min(100, cSr);
  if (dev) { console.log(`📐 SCANE SUBTOTAL: ${rd2(cSr)}`); };
  if (bg) { cSr -= (cSr * 0.20); };
  const flgs = {
    phs: phS.length > 0, qa: qaS.length > 0, snf: !!snf,
    bNm: !!bNm, eEj: !!eEj, wst: !!wst, msT: !!msT, bg, bgC
  }
  const eSp = { phs: phS, qa: qaS, snf: sfX, eEj: evX };
  var sbHg = `SUBJECT: ${sbj}\nSENDER: ${sdr}\n🚩 AI ELEMENTS FOUND: 🚩\n`;
  const smy = tgr.length ? sbHg + tgr.map(t => t).join("\n") : sbHg + `None`;
  if (dbg) { console.log(`🆗 COMPLETED: gCS 🆗`); }
  return { smy, tgr, flgs, snps: eSp, cts: fCs, cSr: cSr };
}

function map(pct) {
  const msgs = [
    { max: 1, msg: `🎉 ${rsbry}This email was definitely written by a human.${cFt}` },
    { max: 20, msg: `🎉 ${rsbry}This email was most likely written by a human.${cFt}` },
    { max: 40, msg: `🆗 ${rsbry}There's a slight chance this email is AI&#8209;generated, but it's probably not.${cFt}` },
    { max: 60, msg: `❓${rsbry}This email might (or might not) be AI&#8209;generated. Your guess is as good as mine.${cFt}` },
    { max: 75, msg: `⚠️ ${stbry}This email is probably AI&#8209;generated. Use caution.${cFt}` },
    { max: 90, msg: `🚨 ${stbry}<b>This email is most likely AI&#8209;generated.</b><br />Might I suggest breaking the bot? 😉${cFt}` },
    { max: 100, msg: `🚨 ${stbry}<b>This email is definitely AI&#8209;generated.</b><br />Might I suggest breaking the bot? 😉${cFt}` }
  ];
  for (const m of msgs) {
    if (pct <= m.max) { if (dbg) { console.log(`🆗 COMPLETED: map 🆗`); }; return m.msg; };
  }
}

function aDc(src) {
  var skA = `🛑 FILTER: SAPLING ERROR - TIMEOUT - SKIPPING SAPLING 🛑\n`;
  if (!__SAPLING_KEY) {
    __SAPLING_KEY = PropertiesService.getScriptProperties().getProperty("SAPLING_API_KEY");
    if (!__SAPLING_KEY) throw new Error("Missing SAPLING_API_KEY script property");
  }
  const txt = String(src || "");
  if (!txt) return 0; const t0 = Date.now();
  const cks = ckT(txt, 400), req = bAR(cks[0]),
  res = UrlFetchApp.fetch(req.url, req);
  if ((Date.now() - t0) > 5000) {
    console.log(skA); throw new Error("TIMEOUT");
  }
  let rty, num, total = 0, wtd = 0,
  code = res.getResponseCode(), body = res.getContentText(),
  rtE = 400 && M_XVL.test(body), mch = M_SCR.exec(body),
  jsn = JSON.parse(body);
  const rsps = UrlFetchApp.fetchAll(cks.map(function(ck) {
    return bAR(ck); 
  }));
  if ((Date.now() - t0) > 5000) {
    console.log(skA); throw new Error("TIMEOUT");
  }
  rsps.forEach(function(res, idx) {
    if ((Date.now() - t0) > 5000) {
      console.log(skA); throw new Error("TIMEOUT");
    }
    if (cks.length === 1) {
      if (code === rtE) { rty = rtA(cks[0]); };
    }
    if (code === rtE) {
      rty = rtA(cks[idx]); code = rty.code; body = rty.body;
    }
    if (code < 200 || code >= 300) {
      console.log(`🛑 FILTER: SAPLING ERROR - ${code}: ${body} - SKIPPING SAPLING 🛑\n`);
      throw new Error(eAE);
    }
    let raw = null;
    if (mch) { raw = mch[1]; } else {
      try {
        raw = typeof jsn.score === "number" ? jsn.score : (jsn.data && typeof jsn.data.score === "number" ? jsn.data.score : null);
      } catch(e) { raw = null; }
    }
    num = Number(raw); if (!Number.isFinite(num) || num < 0) num = 0;
    if (num > 1) num = 1; const fLt = cks[idx].length;
    wtd += num * fLt; total += fLt;
  });
  if (dbg) { console.log(`🆗 COMPLETED: aDc 🆗`); };
  if (cks.length === 1) {
    return num;
  } else { return total ? (wtd / total) : 0; };
}

function onHomepage(e) {
  const card = CardService.newCardBuilder().setHeader(CardService.newCardHeader().setTitle("scanE"))
    .addSection(CardService.newCardSection().addWidget(CardService.newTextParagraph()
    .setText(`${rsbry}<b>Hi! I'm scanE.</b><br />I scan emails and tell you how likely they are to contain AI-generated content. Open any email to scan it.${cFt}`)));
  if (dbg) { console.log(`🆗 COMPLETED: onHomepage 🆗`) };
  return card.build();
}

function onGmailMessageOpen(e) {
  try {
    var dta = gMg(e); if (!dta) { return onHomepage(e); };
    if (dta.fm) {
      const out = { pct: null, message: null, fm: dta.fm };
      return bCd(out, dta.sbj, dta.sdr, dta.date, null, null, dta.mId, null);
    }
    let cFS; let ch;
    if (szF(dta.mgCn, 512000, "SCANE")) {
      ch = {}; cFS = fCZ;
    } else {
      ch = gCS(dta); cFS = rd2(ch.cSr);
    }
    let out, aFS, spCn = dta.mgCn;
    if (dta.wdC < 100) {
      aFS = fWc;
      if (dev) {
        console.log(`🛑 FILTER: WORD COUNT (${dta.wdC} words) - SKIPPING SAPLING 🛑`);
      }
      const elmts = map(cFS);
      out = { pct: cFS, message: elmts, details: ch.smy || "" };
    } else {
      let avgScr; aFS = saE(spCn); cFS = Math.min(100, cFS);
      const mNo = (n) => typeof n === 'number', cNm = mNo(cFS), aNm = mNo(aFS);
      const chs = [
        { ch: cNm && aNm, scr: (cFS + aFS) / 2 },
        { ch: cNm && aNm && cFS === 0, scr: aFS / 2 },
        { ch: cNm && aNm && aFS === 0, scr: cFS / 2 },
        { ch: !cNm && aNm, scr: aFS },
        { ch: cNm && !aNm, scr: cFS }
      ];
      const calc = chs.find(c => c.ch); avgScr = calc ? calc.scr : 0;
      out = { pct: rd2(avgScr), message: map(avgScr), details: ch.smy || "" };
    }
    if (dev) { console.log(out.details); };
    if (dbg) { console.log(`🆗 COMPLETED: onGmailMessageOpen 🆗`); }
    return bCd(out, dta.sbj, dta.sdr, dta.date, aFS, cFS, dta.mId, null);
  } catch (err) { return bEC(err); }
}

function bCd(out, sbj, sdr, date, aFS, cFS, mid, tid) {
  const cHdr = CardService.newCardHeader()
    .setTitle(`${rsbry}scanE - Gmail™ AI Content Scanner${cFt}`)
    .setSubtitle('Developed by Teddy Did It Development 🐻');
  const cMta = CardService.newCardSection()
    .addWidget(CardService.newKeyValue().setTopLabel(`${rsbry}Subject:${cFt}`).setContent(sbj).setMultiline(true))
    .addWidget(CardService.newKeyValue().setTopLabel(`${rsbry}From:${cFt}`).setContent(sdr).setMultiline(true))
    .addWidget(CardService.newKeyValue().setTopLabel(`${rsbry}Date:${cFt}`).setContent(date));
  const cDta = CardService.newCardSection().setHeader(`${rsbry}<b>Scan Results</b>${cFt}`);
  const cRst = [];
  if (out && out.fm) { cRst.push(CardService.newTextParagraph().setText(out.fm)); }
  if (out && out.pct != null) {
    let cSX = ""; let aSX = "";
    if (typeof cFS === 'number') {
      cSX = `${bkbry}<b>▸ ${cFS}%</b>${cFt}`;
    } else { cSX = `${bkbry}<b>▸ </b>${cFt}${cFS}`; };
    if (typeof aFS === 'number') {
      aSX = `${bkbry}<b>▸ ${aFS}%</b>${cFt}`;
    } else { aSX = `${bkbry}<b>▸ </b>${cFt}${aFS}`; };
    cRst.push(CardService.newTextParagraph()
      .setText(`${bkbry}<b>scanE Score</b>${cFt}<br /><em>(Level 1: phrases, formatting, punctuation, emojis, email tracking)</em>`));
    cRst.push(CardService.newTextParagraph().setText(cSX));
    cRst.push(CardService.newTextParagraph()
      .setText(`${bkbry}<b>Sapling Score</b>${cFt}<br /><em>(Level 2: tone, style, word choice, phrasing, sentence structure)</em>`));
    cRst.push(CardService.newTextParagraph().setText(aSX));
    cRst.push(CardService.newTextParagraph().setText(`${rsbry}<b>⭐FINAL SCORE: ${out.pct}%⭐</b>${cFt}`));
  }
  if (out && out.message) { cRst.push(CardService.newTextParagraph().setText(`${out.message}`)); };
  cRst.forEach(w => cDta.addWidget(w));
  const bdr = CardService.newCardBuilder().setHeader(cHdr).addSection(cMta);
  if (cRst.length > 0) { bdr.addSection(cDta); }
  if (out && out.pct !== null) {
    const cDmr = CardService.newCardSection().addWidget(CardService.newTextParagraph()
      .setText(`${bkbry}<em>Powered by Sapling's AI Detector</em><strong>:</strong> <em>Over&nbsp;97%&nbsp;accurate.</em>${cFt}`));
    bdr.addSection(cDmr);
  }
  if (dbg) { console.log(`🆗 COMPLETED: bCd 🆗`); };
  if (dbg || dev) { console.log(`🎉 SUCCESS! 🎉`); };
  return bdr.build();
}

function bEC(err) {
  const eMg = (err && err.message) ? err.message : String(err),
  crd = CardService.newCardHeader().setTitle("scanE - Gmail™ AI Content Scanner").setSubtitle("Error"),
  cErr = CardService.newCardSection().addWidget(CardService.newTextParagraph()
    .setText(`${stbry}<em><b>Sorry!</b></em> That didn't work. 😕<br />${eMg}${cFt}`));
  return CardService.newCardBuilder().setHeader(crd).addSection(cErr).build();
}