// ═══════════════════════════════════════════════════════════════════
// TIKUS DI GOT — script.js
// ═══════════════════════════════════════════════════════════════════

const TILE = 48, CW = 900, CH = 514, MW = 30, MH = 24;
const T = { FLOOR:1, WALL:2, MOSS:3, PIPEH:4, PIPEV:5, PUDDLE:6 };

// ── MAP ─────────────────────────────────────────────────────────────
const MAP = [
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
  [2,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,2],
  [2,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,2],
  [2,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,2],
  [2,1,1,6,1,1,1,1,1,1,1,1,1,4,4,4,4,1,1,1,1,1,1,1,6,1,1,1,1,2],
  [2,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,2],
  [2,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,2],
  [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
  [2,3,3,3,3,3,1,1,1,2,2,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,3,3,3,2],
  [2,1,1,1,1,3,1,1,1,2,2,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,3,1,1,2],
  [2,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,1,2],
  [2,1,1,1,1,1,1,1,1,2,2,1,1,6,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,2],
  [2,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,2,2,1,1,1,6,1,1,1,1,2],
  [5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
  [5,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,2],
  [2,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,2],
  [2,3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,3,2],
  [2,1,1,3,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,3,1,1,2],
  [2,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,2],
  [2,1,1,1,1,1,1,1,1,1,1,1,1,4,4,4,4,1,1,1,1,1,1,1,6,1,1,1,1,2],
  [2,1,1,6,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,2],
  [2,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,2],
  [2,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,2],
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
];

// ── MISSION CHAIN (ordered, must complete in sequence) ──────────────
// missionStep: 0=find makanan, 1=beri ke pak koak (dapat peta),
//              2=temui kiki (dapat catatan), 3=find papan kayu,
//              4=beri ke nyonya siput (dapat kunci), 5=exit
const MISSIONS = [
  { id:'m0', label:'Cari Makanan Basi di Got Tengah',    icon:'🍖' },
  { id:'m1', label:'Beri Makanan ke Pak Koak → Dapat Peta', icon:'🗺️' },
  { id:'m2', label:'Temui Kiki untuk dapat info',        icon:'💬' },
  { id:'m3', label:'Cari Papan Kayu di Got Timur',       icon:'🪵' },
  { id:'m4', label:'Beri Papan ke Nyonya Siput → Dapat Kunci', icon:'🔑' },
  { id:'m5', label:'Temukan Pintu Keluar!',              icon:'🚪' },
];

// ── NPC DEFINITIONS ─────────────────────────────────────────────────
const NPC_DEFS = [
  {
    id:'pak_koak', name:'Pak Koak', img:'assets/npc_pak_koak.png',
    tx:3, ty:15, fsmState:'IDLE', wanderRange:1,
    // required mission step to enter this NPC's quest dialog
    requiredStep: 0, // player must have item_makanan
    dialogs:{
      IDLE:{
        text:'Hei, Tikus Kecil! Petugas Kota akan datang besok pagi! Aku punya peta got ini... tapi aku lapar sekali.',
        choices:[
          {text:'> Ada apa, Pak Koak?', next:'INFO'},
          {text:'Permisi dulu.', close:true}
        ]
      },
      INFO:{
        text:'Bawakan aku Makanan Basi dari Got Tengah, dan aku berikan petanya padamu!',
        choices:[
          {text:'> Oke, aku carikan!', close:true},
          {text:'Nanti dulu.', close:true}
        ]
      },
      WAITING:{
        text:'Sudah dapat makanannya belum? Aku sangat lapar...',
        choices:[
          {
            text:'> Ini makanannya!',
            needItem:'item_makanan',
            needStep:0,
            removeItem:'item_makanan',
            giveItem:'item_peta', giveItemName:'Peta Sebagian Got',
            advanceStep:1,
            next:'DONE'
          },
          {text:'Belum dapat nih.', close:true}
        ]
      },
      DONE:{
        text:'Terima kasih banyak! Ini peta got-nya. Hati-hati ya! Dan coba temui Kiki, dia tahu jalan rahasia.',
        choices:[{text:'> Terima kasih, Pak Koak!', close:true}]
      }
    }
  },
  {
    id:'kiki', name:'Kiki', img:'assets/npc_kiki.png',
    tx:23, ty:5, fsmState:'WANDERING', wanderRange:2,
    requiredStep: 1,
    dialogs:{
      WANDERING:{
        text:'Eh ada tikus lain! Kamu mau kabur juga? Ikuti aku!',
        choices:[
          {text:'> Ada info apa?', next:'INFO2'},
          {text:'Hm, nanti.', close:true}
        ]
      },
      INFO2:{
        text:'Ada lorong rahasia di ujung peta. Tapi pintunya terkunci. Nyonya Siput di Got Selatan punya kuncinya—tapi dia butuh Papan Kayu dulu!',
        choices:[
          {
            text:'> Oke, aku cari Papan Kayu!',
            needStep:1,
            giveItem:'item_catatan', giveItemName:'Catatan Kiki',
            advanceStep:2,
            next:'DONE2'
          },
          {text:'Makasih infonya.', close:true}
        ]
      },
      DONE2:{
        text:'Ini catatan dariku! Ada clue posisi Nyonya Siput. Semangat ya, kita bisa kabur!',
        choices:[{text:'> Makasih Kiki! 💪', close:true}]
      }
    }
  },
  {
    id:'nyonya_siput', name:'Nyonya Siput', img:'assets/npc_nyonya_siput.png',
    tx:25, ty:19, fsmState:'IDLE', wanderRange:1,
    requiredStep: 2,
    dialogs:{
      IDLE:{
        text:'Oh, ada tamu! Jarang ada yang mampir ke sini. Mau apa, sayang?',
        choices:[
          {text:'> Aku butuh kunci lorong!', next:'ASK'},
          {text:'Hanya mampir.', close:true}
        ]
      },
      ASK:{
        text:'Kunci? Aku punya... tapi rumahku rusak. Bawakan aku Papan Kayu dan kuncinya untukmu!',
        choices:[
          {text:'> Aku carikan!', close:true},
          {text:'Nanti ya.', close:true}
        ]
      },
      WAITING:{
        text:'Sudah dapat papan kayunya? Rumahku sudah mau roboh nih...',
        choices:[
          {
            text:'> Ini papan kayunya!',
            needItem:'item_papan_kayu',
            needStep:3,
            removeItem:'item_papan_kayu',
            giveItem:'item_kunci', giveItemName:'Kunci Lorong',
            advanceStep:4,
            next:'DONE3'
          },
          {text:'Belum dapat nih.', close:true}
        ]
      },
      DONE3:{
        text:'Terima kasih banyak, sayang! Ini kuncinya. Pintunya ada di pojok utara. Hati-hati dengan Petugas!',
        choices:[{text:'> Terima kasih, Nyonya!', close:true}]
      }
    }
  },
  {
    id:'blirik', name:'Blirik', img:'assets/npc_blirik.png',
    tx:14, ty:11, fsmState:'PATROL', wanderRange:0,
    requiredStep:-1, // no quest, just guard
    patrolPath:[{tx:12,ty:9},{tx:17,ty:9},{tx:17,ty:14},{tx:12,ty:14}],
    patrolIdx:0, patrolTimer:0,
    dialogs:{
      BLOCK:{
        text:'STOP! Area ini dijaga! Kamu tidak boleh lewat sembarangan! Pergi sekarang!',
        choices:[{text:'> Baik baik...', close:true}]
      },
      PATROL:{
        text:'...',
        choices:[{text:'Maaf, permisi.', close:true}]
      }
    }
  },
  {
    id:'petugas', name:'Petugas Got', img:'assets/npc_petugas_got.png',
    tx:28, ty:13, fsmState:'PATROL', wanderRange:0,
    requiredStep:-1,
    patrolPath:[
      {tx:27,ty:7},{tx:27,ty:13},{tx:27,ty:19},
      {tx:22,ty:19},{tx:22,ty:7},{tx:27,ty:7}
    ],
    patrolIdx:0, patrolTimer:0, patrolSpeed:35,
    dialogs:{}
  }
];

// ── ITEMS ON MAP ─────────────────────────────────────────────────────
const ITEM_DEFS = [
  {id:'item_makanan',   name:'Makanan Basi',  tx:13, ty:7,  img:'assets/item_makanan.png',   collected:false, requiredStep:0},
  {id:'item_papan_kayu',name:'Papan Kayu',    tx:24, ty:3,  img:'assets/item_papan_kayu.png', collected:false, requiredStep:2},
  {id:'item_obor',      name:'Obor Kecil',    tx:3,  ty:9,  img:'assets/item_obor.png',       collected:false, requiredStep:-1},
  {id:'item_catatan',   name:'Catatan Kiki',  tx:22, ty:15, img:'assets/item_catatan.png',    collected:false, requiredStep:-1},
];

// ── TRAPS ────────────────────────────────────────────────────────────
const TRAPS = [
  {tx:17,ty:4},{tx:5,ty:11},{tx:24,ty:12},{tx:8,ty:19},{tx:20,ty:7},{tx:11,ty:20}
];

// EXIT
const EXIT = {tx:28, ty:13, requiredStep:4};

// ═══════════════════════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════════════════════
let G = {};
function resetState() {
  G = {
    running: false, paused: false, dialogOpen: false,
    mobileMode: false, tick: 0,
    player: { x:14*TILE+TILE/2, y:11*TILE+TILE/2, dir:'down', moving:false, speed:3.2 },
    camera: { x:0, y:0 },
    keys: {},
    inventory: [],
    missionStep: 0,
    npcs: NPC_DEFS.map(d=>({
      ...d,
      x: d.tx*TILE+TILE/2, y: d.ty*TILE+TILE/2,
      ox: d.tx, oy: d.ty,
      fsmState: d.fsmState,
      patrolIdx: d.patrolIdx||0,
      patrolTimer: 0,
      wTimer: 0,
      alertMode: false,
      lastSeen: 0,
    })),
    items: ITEM_DEFS.map(d=>({...d})),
    timerSec: 23*3600+59*60+59,
    timerInterval: null,
    alertBorderOn: false,
    currentNpc: null,
    notifTimeout: null,
  };
}

// ═══════════════════════════════════════════════════════════════════
// CANVAS / CONTEXT
// ═══════════════════════════════════════════════════════════════════
const canvas = document.getElementById('gc');
const ctx    = canvas.getContext('2d');
const mmCvs  = document.getElementById('mmc');
const mmCtx  = mmCvs.getContext('2d');

// ═══════════════════════════════════════════════════════════════════
// UTILS
// ═══════════════════════════════════════════════════════════════════
function rr(ctx, x,y,w,h,r){
  ctx.beginPath();
  ctx.moveTo(x+r,y);
  ctx.lineTo(x+w-r,y); ctx.quadraticCurveTo(x+w,y,x+w,y+r);
  ctx.lineTo(x+w,y+h-r); ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
  ctx.lineTo(x+r,y+h); ctx.quadraticCurveTo(x,y+h,x,y+h-r);
  ctx.lineTo(x,y+r); ctx.quadraticCurveTo(x,y,x+r,y);
  ctx.closePath();
}
const isWall = (tx,ty) => tx<0||ty<0||tx>=MW||ty>=MH || MAP[ty][tx]===T.WALL || MAP[ty][tx]===T.MOSS;
const dist   = (a,b) => Math.hypot((a.x||a.tx*TILE+TILE/2)-(b.x||b.tx*TILE+TILE/2),(a.y||a.ty*TILE+TILE/2)-(b.y||b.ty*TILE+TILE/2));
const getArea = (tx,ty) => ty<8 ? (tx<15?'Got Utara Barat':'Got Utara Timur') : ty>15 ? (tx<15?'Got Selatan Barat':'Got Selatan Timur') : tx<10?'Got Barat':tx>19?'Got Timur':'Got Tengah';

// ═══════════════════════════════════════════════════════════════════
// DRAW TILE
// ═══════════════════════════════════════════════════════════════════
function drawTile(c, type, px, py){
  const W=TILE,H=TILE;
  switch(type){
    case T.FLOOR:
      c.fillStyle='#1A1208'; c.fillRect(px,py,W,H);
      c.fillStyle='#1E150A';
      c.fillRect(px+1,py+1,W/2-2,H/2-2); c.fillRect(px+W/2+1,py+H/2+1,W/2-2,H/2-2);
      c.fillStyle='#181005';
      c.fillRect(px+W/2+1,py+1,W/2-2,H/2-2); c.fillRect(px+1,py+H/2+1,W/2-2,H/2-2);
      c.strokeStyle='#110E06'; c.lineWidth=0.4; c.strokeRect(px,py,W,H);
      break;
    case T.WALL: case T.MOSS:{
      const wc = type===T.MOSS?'#1A2A10':'#2A1F0F';
      c.fillStyle=wc; c.fillRect(px,py,W,H);
      const bc = type===T.MOSS?'#253818':'#352515';
      c.fillStyle=bc;
      for(let r=0;r<3;r++){
        const off=(r%2===0)?W/2:0;
        for(let col=0;col<3;col++){
          c.strokeStyle=type===T.MOSS?'#192210':'#1A1008'; c.lineWidth=0.4;
          c.fillRect(px+off+col*W/2+1,py+r*H/3+1,W/2-2,H/3-2);
          c.strokeRect(px+off+col*W/2+1,py+r*H/3+1,W/2-2,H/3-2);
        }
      }
      c.fillStyle='#111008'; c.fillRect(px,py+H-4,W,4);
      if(type===T.MOSS){
        c.fillStyle='rgba(50,80,28,0.65)';
        for(let m=0;m<4;m++) c.fillRect(px+m*12+2,py+H-10,9,6);
      }
      break;
    }
    case T.PIPEH:
      c.fillStyle='#1A1208'; c.fillRect(px,py,W,H);
      c.fillStyle='#3D5A3E'; c.fillRect(px,py+H*.3,W,H*.4);
      c.fillStyle='#4A6E4B'; c.fillRect(px,py+H*.55,W,H*.08);
      c.fillStyle='#2A3D2B'; c.fillRect(px,py+H*.3,W,H*.05);
      for(let s=0;s<W;s+=14){c.fillStyle='#2A3D2B';c.fillRect(px+s,py+H*.3,1,H*.4);}
      break;
    case T.PIPEV:
      c.fillStyle='#1A1208'; c.fillRect(px,py,W,H);
      c.fillStyle='#3D5A3E'; c.fillRect(px+W*.3,py,W*.4,H);
      c.fillStyle='#4A6E4B'; c.fillRect(px+W*.55,py,W*.08,H);
      c.fillStyle='#2A3D2B'; c.fillRect(px+W*.3,py,W*.05,H);
      c.fillStyle='rgba(20,60,90,.7)';
      c.beginPath();c.ellipse(px+W*.7,py+H*.3,3,5,0,0,Math.PI*2);c.fill();
      break;
    case T.PUDDLE:
      c.fillStyle='#1A1208'; c.fillRect(px,py,W,H);
      c.fillStyle='rgba(8,26,42,.92)';
      c.beginPath();c.ellipse(px+W/2,py+H/2,W*.44,H*.34,0,0,Math.PI*2);c.fill();
      c.fillStyle='rgba(22,60,90,.45)';
      c.beginPath();c.ellipse(px+W*.58,py+H*.44,W*.16,H*.11,0,0,Math.PI*2);c.fill();
      break;
    default:
      c.fillStyle='#1A1208'; c.fillRect(px,py,W,H);
  }
}

// ═══════════════════════════════════════════════════════════════════
// DRAW PLAYER
// ═══════════════════════════════════════════════════════════════════
function drawPlayer(c, px, py, dir, moving, t){
  const bob = moving ? Math.sin(t*.18)*3 : 0;
  const y=py+bob, s=TILE*.9;
  // shadow
  c.fillStyle='rgba(0,0,0,.4)';
  c.beginPath();c.ellipse(px,py+s*.42,s*.28,s*.1,0,0,Math.PI*2);c.fill();
  // tail
  c.strokeStyle='#B08858'; c.lineWidth=3; c.lineCap='round';
  c.beginPath();
  if(dir==='right'){c.moveTo(px-s*.2,y+s*.05);c.bezierCurveTo(px-s*.5,y+s*.2,px-s*.7,y,px-s*.6,y-s*.2);}
  else if(dir==='left'){c.moveTo(px+s*.2,y+s*.05);c.bezierCurveTo(px+s*.5,y+s*.2,px+s*.7,y,px+s*.6,y-s*.2);}
  else{c.moveTo(px+s*.18,y+s*.1);c.bezierCurveTo(px+s*.5,y+s*.25,px+s*.6,y,px+s*.5,y-s*.2);}
  c.stroke();
  // body + jacket
  c.fillStyle='#C8A878'; c.beginPath();c.ellipse(px,y,s*.22,s*.28,0,0,Math.PI*2);c.fill();
  c.fillStyle='#1A3A6A'; c.beginPath();c.ellipse(px,y,s*.2,s*.26,0,0,Math.PI*2);c.fill();
  c.fillStyle='#C8A878'; c.beginPath();c.ellipse(px,y-s*.08,s*.1,s*.14,0,0,Math.PI*2);c.fill();
  // head
  c.fillStyle='#C8A878'; c.beginPath();c.arc(px,y-s*.3,s*.17,0,Math.PI*2);c.fill();
  // ears
  for(const [ex,ey] of [[-s*.12,-s*.44],[s*.12,-s*.44]]){
    c.fillStyle='#C8A878'; c.beginPath();c.arc(px+ex,y+ey,s*.08,0,Math.PI*2);c.fill();
    c.fillStyle='#E8A0A0'; c.beginPath();c.arc(px+ex,y+ey,s*.05,0,Math.PI*2);c.fill();
  }
  if(dir!=='up'){
    c.fillStyle='#111';
    c.beginPath();c.arc(px-s*.07,y-s*.31,s*.034,0,Math.PI*2);c.fill();
    c.beginPath();c.arc(px+s*.07,y-s*.31,s*.034,0,Math.PI*2);c.fill();
    c.fillStyle='#fff';
    c.beginPath();c.arc(px-s*.06,y-s*.32,s*.013,0,Math.PI*2);c.fill();
    c.beginPath();c.arc(px+s*.08,y-s*.32,s*.013,0,Math.PI*2);c.fill();
    c.fillStyle='#FF8888'; c.beginPath();c.arc(px,y-s*.245,s*.025,0,Math.PI*2);c.fill();
    c.strokeStyle='#999'; c.lineWidth=.8;
    for(const [wx,wy] of [[-s*.22,0],[-s*.22,s*.04],[s*.22,0],[s*.22,s*.04]]){
      c.beginPath();c.moveTo(px,y-s*.245);c.lineTo(px+wx,y-s*.245+wy);c.stroke();
    }
  }
  // arrow
  c.fillStyle='#FFD700'; c.font=`${TILE*.35}px monospace`;
  c.textAlign='center'; c.textBaseline='middle';
  c.fillText('▼',px,y-s*.65);
}

// ═══════════════════════════════════════════════════════════════════
// DRAW NPC
// ═══════════════════════════════════════════════════════════════════
function drawNPC(c, npc, camX, camY, t){
  const px=npc.x-camX, py=npc.y-camY;
  const s=TILE*.9, bob=Math.sin(t*.05+npc.id.length)*2;
  const nearby = dist(G.player,npc)<TILE*2.5 && !G.dialogOpen;

  // ── Draw body by id ────────────────────────────────────────
  if(npc.id==='pak_koak'){
    c.fillStyle='rgba(0,0,0,.35)';c.beginPath();c.ellipse(px,py+s*.45,s*.3,s*.1,0,0,Math.PI*2);c.fill();
    c.fillStyle='#4A7A30';c.beginPath();c.ellipse(px,py+bob,s*.25,s*.32,0,0,Math.PI*2);c.fill();
    c.fillStyle='#7AB850';c.beginPath();c.ellipse(px,py+s*.1+bob,s*.18,s*.22,0,0,Math.PI*2);c.fill();
    c.fillStyle='#5A8A3A';c.beginPath();c.arc(px,py-s*.18+bob,s*.2,0,Math.PI*2);c.fill();
    c.fillStyle='#8AC040';
    c.beginPath();c.ellipse(px-s*.1,py-s*.25+bob,s*.1,s*.09,0,0,Math.PI*2);c.fill();
    c.beginPath();c.ellipse(px+s*.1,py-s*.25+bob,s*.1,s*.09,0,0,Math.PI*2);c.fill();
    c.fillStyle='#111';
    c.beginPath();c.arc(px-s*.1,py-s*.25+bob,s*.05,0,Math.PI*2);c.fill();
    c.beginPath();c.arc(px+s*.1,py-s*.25+bob,s*.05,0,Math.PI*2);c.fill();
    c.fillStyle='#2A1A08';
    c.beginPath();c.ellipse(px,py-s*.35+bob,s*.22,s*.06,0,0,Math.PI*2);c.fill();
    c.fillRect(px-s*.12,py-s*.55+bob,s*.24,s*.2);
    c.beginPath();c.ellipse(px,py-s*.55+bob,s*.16,s*.05,0,0,Math.PI*2);c.fill();
    c.fillStyle='#4A7A30';
    c.beginPath();c.ellipse(px-s*.14,py+s*.45+bob,s*.12,s*.07,0,0,Math.PI*2);c.fill();
    c.beginPath();c.ellipse(px+s*.14,py+s*.45+bob,s*.12,s*.07,0,0,Math.PI*2);c.fill();
  }
  else if(npc.id==='kiki'){
    c.fillStyle='rgba(0,0,0,.3)';c.beginPath();c.ellipse(px,py+s*.42,s*.22,s*.08,0,0,Math.PI*2);c.fill();
    c.fillStyle='#FF9AB0';c.beginPath();c.ellipse(px,py+s*.05+bob,s*.18,s*.28,0,0,Math.PI*2);c.fill();
    c.fillStyle='#FF6B8A';c.beginPath();c.ellipse(px,py+s*.25+bob,s*.22,s*.12,0,0,Math.PI*2);c.fill();
    c.fillStyle='#D4B896';c.beginPath();c.arc(px,py-s*.2+bob,s*.17,0,Math.PI*2);c.fill();
    c.beginPath();c.arc(px-s*.11,py-s*.33+bob,s*.07,0,Math.PI*2);c.fill();
    c.beginPath();c.arc(px+s*.11,py-s*.33+bob,s*.07,0,Math.PI*2);c.fill();
    c.fillStyle='#E8A0B0';
    c.beginPath();c.arc(px-s*.11,py-s*.33+bob,s*.04,0,Math.PI*2);c.fill();
    c.beginPath();c.arc(px+s*.11,py-s*.33+bob,s*.04,0,Math.PI*2);c.fill();
    c.fillStyle='#111';
    c.beginPath();c.arc(px-s*.06,py-s*.22+bob,s*.032,0,Math.PI*2);c.fill();
    c.beginPath();c.arc(px+s*.06,py-s*.22+bob,s*.032,0,Math.PI*2);c.fill();
    c.fillStyle='rgba(255,180,200,.65)';
    c.beginPath();c.ellipse(px-s*.1,py-s*.12+bob,s*.06,s*.03,0,0,Math.PI*2);c.fill();
    c.beginPath();c.ellipse(px+s*.1,py-s*.12+bob,s*.06,s*.03,0,0,Math.PI*2);c.fill();
    c.fillStyle='#FF4488';c.beginPath();c.ellipse(px+s*.1,py-s*.37+bob,s*.1,s*.05,-0.5,0,Math.PI*2);c.fill();
    c.strokeStyle='#C4A080';c.lineWidth=2;c.beginPath();
    c.moveTo(px+s*.12,py+s*.1+bob);c.bezierCurveTo(px+s*.3,py+s*.25+bob,px+s*.4,py+s*.1+bob,px+s*.35,py-s*.05+bob);
    c.stroke();
  }
  else if(npc.id==='blirik'){
    c.fillStyle='rgba(0,0,0,.35)';c.beginPath();c.ellipse(px,py+s*.42,s*.22,s*.08,0,0,Math.PI*2);c.fill();
    c.fillStyle='#2A1A08';c.beginPath();c.ellipse(px,py+bob,s*.2,s*.32,0,0,Math.PI*2);c.fill();
    c.fillStyle='#3D2810';
    c.beginPath();c.ellipse(px-s*.08,py+s*.02+bob,s*.14,s*.28,-0.1,0,Math.PI*2);c.fill();
    c.beginPath();c.ellipse(px+s*.08,py+s*.02+bob,s*.14,s*.28,0.1,0,Math.PI*2);c.fill();
    c.fillStyle='#3D2810';c.beginPath();c.arc(px,py-s*.22+bob,s*.12,0,Math.PI*2);c.fill();
    c.fillStyle='#CC2200';
    c.beginPath();c.arc(px-s*.06,py-s*.26+bob,s*.04,0,Math.PI*2);c.fill();
    c.beginPath();c.arc(px+s*.06,py-s*.26+bob,s*.04,0,Math.PI*2);c.fill();
    c.strokeStyle='#5A3A18';c.lineWidth=1.5;
    for(const [ax,ay,ex,ey] of [[-s*.04,s*.12,-s*.2,s*.02],[-s*.04,s*.12,-s*.2,s*.22],[s*.04,s*.12,s*.2,s*.02],[s*.04,s*.12,s*.2,s*.22]]){
      c.beginPath();c.moveTo(px+ax,py-s*.22-ay+bob);c.lineTo(px+ex,py-s*.22-ey+bob);c.stroke();
    }
    for(const [lx,ly] of [[-s*.18,-s*.1],[-s*.18,s*.05],[-s*.18,s*.2],[s*.18,-s*.1],[s*.18,s*.05],[s*.18,s*.2]]){
      c.strokeStyle='#2A1A08';c.lineWidth=1.5;
      c.beginPath();c.moveTo(px+lx*.5,py+ly+bob);c.lineTo(px+lx,py+ly+s*.12+bob);c.stroke();
    }
    c.fillStyle='#FF6600';
    rr(c,px-s*.1,py-s*.08+bob,s*.2,s*.1,3);c.fill();
    c.fillStyle='#fff';c.font=`bold ${TILE*.13}px monospace`;
    c.textAlign='center';c.textBaseline='middle';
    c.fillText('JAGA',px,py-s*.03+bob);
  }
  else if(npc.id==='nyonya_siput'){
    c.fillStyle='rgba(0,0,0,.3)';c.beginPath();c.ellipse(px,py+s*.42,s*.28,s*.1,0,0,Math.PI*2);c.fill();
    for(const [r2,cl] of [[s*.35,'#C4883A'],[s*.28,'#D49A4A'],[s*.21,'#C4883A'],[s*.14,'#B87830']]){
      c.fillStyle=cl;c.beginPath();c.arc(px+s*.08,py-s*.1+bob,r2,0,Math.PI*2);c.fill();
    }
    c.fillStyle='rgba(232,184,96,.4)';c.beginPath();c.ellipse(px,py-s*.22+bob,s*.12,s*.06,-0.5,0,Math.PI*2);c.fill();
    c.fillStyle='#D4AA70';c.beginPath();c.ellipse(px-s*.05,py+s*.2+bob,s*.32,s*.16,0,0,Math.PI*2);c.fill();
    c.fillStyle='#D4AA70';c.beginPath();c.arc(px-s*.28,py+s*.05+bob,s*.14,0,Math.PI*2);c.fill();
    for(const [tx2,ofs] of [[-s*.04,0],[s*.04,0]]){
      c.strokeStyle='#C4A060';c.lineWidth=2.5;
      c.beginPath();c.moveTo(px-s*.28+tx2,py+s*.05+bob);c.lineTo(px-s*.28+tx2,py-s*.05+bob);c.stroke();
      c.fillStyle='#111';c.beginPath();c.arc(px-s*.28+tx2,py-s*.07+bob,s*.025,0,Math.PI*2);c.fill();
    }
    c.fillStyle='#FF6B9D';c.beginPath();c.arc(px+s*.08,py-s*.32+bob,s*.05,0,Math.PI*2);c.fill();
    c.fillStyle='#FFB0D0';
    for(let a=0;a<6;a++){c.beginPath();c.arc(px+s*.08+Math.cos(a*Math.PI/3)*s*.08,py-s*.32+bob+Math.sin(a*Math.PI/3)*s*.08,s*.04,0,Math.PI*2);c.fill();}
  }
  else if(npc.id==='petugas'){
    c.fillStyle='rgba(0,0,0,.4)';c.beginPath();c.ellipse(px,py+s*.42,s*.25,s*.09,0,0,Math.PI*2);c.fill();
    c.fillStyle='#2A4A1A';c.beginPath();c.ellipse(px,py+s*.2+bob,s*.22,s*.22,0,0,Math.PI*2);c.fill();
    c.fillStyle='#D4A800';c.beginPath();c.ellipse(px,py-s*.05+bob,s*.24,s*.28,0,0,Math.PI*2);c.fill();
    c.fillStyle='rgba(180,180,180,.7)';
    c.beginPath();c.ellipse(px,py-s*.1+bob,s*.22,s*.025,0,0,Math.PI*2);c.fill();
    c.beginPath();c.ellipse(px,py+s*.05+bob,s*.22,s*.025,0,0,Math.PI*2);c.fill();
    c.fillStyle='#FFDD00';c.beginPath();c.arc(px,py-s*.32+bob,s*.18,0,Math.PI*2);c.fill();
    c.beginPath();c.ellipse(px,py-s*.4+bob,s*.28,s*.08,0,0,Math.PI*2);c.fill();
    c.fillStyle='rgba(26,42,58,.9)';c.beginPath();c.ellipse(px,py-s*.33+bob,s*.24,s*.1,0,0,Math.PI*2);c.fill();
    c.strokeStyle='#8B6914';c.lineWidth=3;
    c.beginPath();c.moveTo(px+s*.18,py-s*.05+bob);c.lineTo(px+s*.42,py+s*.42+bob);c.stroke();
    c.fillStyle='#5A3A10';c.beginPath();c.ellipse(px+s*.45,py+s*.48+bob,s*.1,s*.06,.3,0,Math.PI*2);c.fill();
    // Alert indicator
    if(npc.alertMode){
      c.fillStyle='#FF2200';c.font=`bold ${TILE*.5}px monospace`;
      c.textAlign='center';c.textBaseline='middle';
      c.fillText('!',px,py-s*.9+bob);
    }
  }

  // Interaction indicator
  if(nearby && npc.id!=='petugas'){
    const done = npc.fsmState==='DONE'||npc.fsmState==='DONE2'||npc.fsmState==='DONE3';
    const ind = done?'•':'!';
    const bg  = done?'#3A3A3A':'#FFD700';
    const fc  = done?'#666':'#1A0A00';
    c.fillStyle=bg; rr(c,px-10,py-s*.65-20,20,22,4); c.fill();
    c.fillStyle=fc; c.font=`bold ${TILE*.36}px monospace`;
    c.textAlign='center'; c.textBaseline='middle';
    c.fillText(ind,px,py-s*.65-9);
  }

  // Name tag
  const nw = npc.name.length*5.8+14;
  c.fillStyle='rgba(6,18,6,.87)';
  rr(c,px-nw/2,py+s*.5,nw,15,4); c.fill();
  c.fillStyle = npc.id==='blirik'||npc.id==='petugas'?'#FFAA44':npc.id==='kiki'?'#FFAACC':'#AAFFAA';
  c.font=`${TILE*.19}px monospace`;
  c.textAlign='center'; c.textBaseline='middle';
  c.fillText(npc.name,px,py+s*.5+7.5);
}

// ═══════════════════════════════════════════════════════════════════
// DRAW ITEM
// ═══════════════════════════════════════════════════════════════════
const imgCache = {};
function getImg(src){
  if(!imgCache[src]){const i=new Image();i.src=src;imgCache[src]=i;}
  return imgCache[src];
}

function drawItem(c, item, t){
  if(item.collected) return;
  // Only show if reachable (missionStep >= requiredStep or requiredStep===-1)
  if(item.requiredStep>0 && G.missionStep < item.requiredStep) return;
  const px = item.tx*TILE+TILE/2-G.camera.x;
  const py = item.ty*TILE+TILE/2-G.camera.y;
  const bob = Math.sin(t*.05+item.tx)*4;
  // Glow
  const grd=c.createRadialGradient(px,py,0,px,py,24);
  grd.addColorStop(0,'rgba(255,215,0,.22)');
  grd.addColorStop(1,'rgba(255,215,0,0)');
  c.fillStyle=grd;
  c.beginPath();c.ellipse(px,py+6,24,9,0,0,Math.PI*2);c.fill();
  // Image
  const img=getImg(item.img);
  if(img.complete && img.naturalWidth>0){
    c.save();
    c.translate(px,py+bob);
    c.drawImage(img,-18,-18,36,36);
    c.restore();
  } else {
    // fallback
    c.fillStyle='#FFD700';
    c.beginPath();c.arc(px,py+bob,12,0,Math.PI*2);c.fill();
  }
  // Label
  const lw=item.name.length*5.2+12;
  c.fillStyle='rgba(6,6,0,.88)';
  rr(c,px-lw/2,py+bob+16,lw,14,3);c.fill();
  c.fillStyle='#CCAA55';c.font=`${TILE*.18}px monospace`;
  c.textAlign='center';c.textBaseline='middle';
  c.fillText(item.name,px,py+bob+23);
}

// ═══════════════════════════════════════════════════════════════════
// DRAW TRAP
// ═══════════════════════════════════════════════════════════════════
function drawTrap(c, px, py, t){
  // Red danger pulse
  const pulse=.5+Math.sin(t*.1)*.5;
  c.fillStyle=`rgba(255,0,0,${.08*pulse})`;
  c.beginPath();c.ellipse(px,py,22,14,0,0,Math.PI*2);c.fill();
  // Metal base
  c.fillStyle='#7A5810';
  rr(c,px-15,py-5,30,10,2);c.fill();
  c.strokeStyle='#4A3000';c.lineWidth=1.5;
  rr(c,px-15,py-5,30,10,2);c.stroke();
  // Spring arm
  c.strokeStyle='#C0A020';c.lineWidth=2;
  c.beginPath();c.moveTo(px-10,py-5);c.lineTo(px,py-14);c.lineTo(px+10,py-5);c.stroke();
  // Danger !
  c.fillStyle=`rgba(255,60,60,${pulse})`;
  c.font=`bold ${TILE*.28}px monospace`;
  c.textAlign='center';c.textBaseline='middle';
  c.fillText('!',px,py-22);
}

// ═══════════════════════════════════════════════════════════════════
// DRAW EXIT
// ═══════════════════════════════════════════════════════════════════
function drawExit(c, t){
  const ex=EXIT.tx*TILE+TILE/2-G.camera.x;
  const ey=EXIT.ty*TILE+TILE/2-G.camera.y;
  const pulse=.6+Math.sin(t*.06)*.4;
  // Glow
  const grd=c.createRadialGradient(ex,ey,0,ex,ey,TILE*1.2);
  grd.addColorStop(0,`rgba(255,255,80,${.35*pulse})`);
  grd.addColorStop(1,'rgba(255,255,0,0)');
  c.fillStyle=grd;
  c.beginPath();c.arc(ex,ey,TILE*1.2,0,Math.PI*2);c.fill();
  // Door
  c.fillStyle='#1A3A1A';
  rr(c,ex-16,ey-TILE*.7,32,TILE*1.4,4);c.fill();
  c.strokeStyle=`rgba(170,255,100,${.5+.5*pulse})`;c.lineWidth=2;
  rr(c,ex-16,ey-TILE*.7,32,TILE*1.4,4);c.stroke();
  c.fillStyle=G.missionStep>=EXIT.requiredStep?`rgba(255,255,80,${pulse})`:'rgba(100,100,100,.5)';
  c.font=`bold ${TILE*.22}px monospace`;c.textAlign='center';c.textBaseline='middle';
  c.fillText('EXIT',ex,ey);
  c.font=`${TILE*.16}px monospace`;
  c.fillStyle=G.missionStep>=EXIT.requiredStep?'#AAFFAA':'#444';
  c.fillText(G.missionStep>=EXIT.requiredStep?'Pintu Keluar':'Terkunci',ex,ey+TILE*.5);
}

// ═══════════════════════════════════════════════════════════════════
// FOG OF WAR
// ═══════════════════════════════════════════════════════════════════
function drawFog(c, px, py, radius){
  const fc=document.createElement('canvas');
  fc.width=CW; fc.height=CH;
  const fx=fc.getContext('2d');
  fx.fillStyle='rgba(0,0,0,1)';
  fx.fillRect(0,0,CW,CH);
  fx.globalCompositeOperation='destination-out';
  const grd=fx.createRadialGradient(px,py,radius*.18,px,py,radius);
  grd.addColorStop(0,'rgba(0,0,0,1)');
  grd.addColorStop(.65,'rgba(0,0,0,.96)');
  grd.addColorStop(.88,'rgba(0,0,0,.6)');
  grd.addColorStop(1,'rgba(0,0,0,0)');
  fx.fillStyle=grd;
  fx.beginPath();fx.arc(px,py,radius,0,Math.PI*2);fx.fill();
  c.drawImage(fc,0,0);
  // warm torch tint
  c.save();
  c.globalCompositeOperation='multiply';
  const wg=c.createRadialGradient(px,py,0,px,py,radius);
  wg.addColorStop(0,'rgba(215,160,70,.28)');
  wg.addColorStop(.6,'rgba(150,90,35,.14)');
  wg.addColorStop(1,'rgba(0,0,0,0)');
  c.fillStyle=wg;
  c.beginPath();c.arc(px,py,radius,0,Math.PI*2);c.fill();
  c.restore();
}

// ═══════════════════════════════════════════════════════════════════
// CAMERA
// ═══════════════════════════════════════════════════════════════════
function updateCamera(){
  const tx=G.player.x-CW/2, ty=G.player.y-CH/2;
  const maxX=MW*TILE-CW, maxY=MH*TILE-CH;
  G.camera.x += (Math.max(0,Math.min(maxX,tx))-G.camera.x)*.12;
  G.camera.y += (Math.max(0,Math.min(maxY,ty))-G.camera.y)*.12;
}

// ═══════════════════════════════════════════════════════════════════
// MOVEMENT
// ═══════════════════════════════════════════════════════════════════
function movePlayer(){
  if(G.dialogOpen||G.paused) return;
  const {keys,player}=G;
  let dx=0,dy=0;
  if(keys['ArrowLeft']||keys['a']||keys['A']){dx=-1;player.dir='left';}
  if(keys['ArrowRight']||keys['d']||keys['D']){dx=1;player.dir='right';}
  if(keys['ArrowUp']||keys['w']||keys['W']){dy=-1;player.dir='up';}
  if(keys['ArrowDown']||keys['s']||keys['S']){dy=1;player.dir='down';}
  if(dx&&dy){dx*=.707;dy*=.707;}
  const spd=player.speed;
  const hw=TILE*.27;
  function ok(x,y){
    return !isWall(Math.floor((x-hw)/TILE),Math.floor((y-hw)/TILE))&&
           !isWall(Math.floor((x+hw)/TILE),Math.floor((y-hw)/TILE))&&
           !isWall(Math.floor((x-hw)/TILE),Math.floor((y+hw)/TILE))&&
           !isWall(Math.floor((x+hw)/TILE),Math.floor((y+hw)/TILE));
  }
  if(ok(player.x+dx*spd,player.y)) player.x+=dx*spd;
  if(ok(player.x,player.y+dy*spd)) player.y+=dy*spd;
  player.moving=(dx!==0||dy!==0);
}

// ═══════════════════════════════════════════════════════════════════
// NPC FSM UPDATE
// ═══════════════════════════════════════════════════════════════════
function updateNPCs(){
  G.npcs.forEach(npc=>{
    // Patrol
    if(npc.fsmState==='PATROL'||npc.fsmState==='ALERT'||npc.id==='petugas'||npc.id==='blirik'){
      npc.patrolTimer++;
      const spd = npc.id==='petugas' ? (npc.alertMode?20:40) : 55;
      if(npc.patrolTimer>=spd){
        npc.patrolTimer=0;
        if(npc.alertMode){
          // Chase player
          const dx=G.player.x-npc.x, dy=G.player.y-npc.y;
          const d=Math.hypot(dx,dy);
          if(d>TILE*.5){npc.x+=dx/d*TILE*.8;npc.y+=dy/d*TILE*.8;}
          if(d<TILE*.7){gameOver('Kamu tertangkap Petugas Got!😱');return;}
          if(d>TILE*7){npc.alertMode=false;} // lost
        } else {
          // Follow patrol path
          if(npc.patrolPath&&npc.patrolPath.length>0){
            npc.patrolIdx=(npc.patrolIdx+1)%npc.patrolPath.length;
            const tg=npc.patrolPath[npc.patrolIdx];
            npc.x=tg.tx*TILE+TILE/2; npc.y=tg.ty*TILE+TILE/2;
          }
        }
      }
      // Detection
      const d=dist(G.player,npc);
      if(npc.id==='petugas'&&!npc.alertMode&&d<TILE*3){
        npc.alertMode=true;
        showNotif('','⚠️ TERDETEKSI!','Petugas melihatmu! Cepat kabur!');
        document.getElementById('ab').classList.add('on');
        G.alertBorderOn=true;
        setTimeout(()=>{document.getElementById('ab').classList.remove('on');G.alertBorderOn=false;},4000);
      }
    }

    // Wandering
    if(npc.wanderRange>0 && npc.id!=='blirik' && npc.id!=='petugas'){
      npc.wTimer=(npc.wTimer||0)+1;
      if(npc.wTimer>100){
        npc.wTimer=0;
        const dirs=[{dx:0,dy:0},{dx:0,dy:0},{dx:TILE,dy:0},{dx:-TILE,dy:0},{dx:0,dy:TILE},{dx:0,dy:-TILE}];
        const d2=dirs[Math.floor(Math.random()*dirs.length)];
        const nx=npc.x+d2.dx, ny=npc.y+d2.dy;
        const ntx=Math.floor(nx/TILE), nty=Math.floor(ny/TILE);
        if(!isWall(ntx,nty)&&Math.abs(ntx-npc.ox)<=npc.wanderRange&&Math.abs(nty-npc.oy)<=npc.wanderRange){
          npc.x=nx; npc.y=ny;
        }
      }
    }

    // Sync FSM state based on mission progress (auto-advance NPC state)
    if(npc.id==='pak_koak'){
      if(G.missionStep===0) npc.fsmState='WAITING';
      if(G.missionStep>=1) npc.fsmState='DONE';
    }
    if(npc.id==='kiki'){
      if(G.missionStep===1) npc.fsmState='WANDERING';
      if(G.missionStep>=2) npc.fsmState='DONE2';
    }
    if(npc.id==='nyonya_siput'){
      if(G.missionStep===2||G.missionStep===3) npc.fsmState='WAITING';
      if(G.missionStep>=4) npc.fsmState='DONE3';
    }
  });
}

// ═══════════════════════════════════════════════════════════════════
// INTERACTION
// ═══════════════════════════════════════════════════════════════════
function interact(){
  if(G.dialogOpen||G.paused||!G.running) return;
  // NPC check
  for(const npc of G.npcs){
    if(dist(G.player,npc)<TILE*2.4&&npc.id!=='petugas'){
      openDialog(npc); return;
    }
  }
  // Item check
  for(const item of G.items){
    if(!item.collected && dist(G.player,{x:item.tx*TILE+TILE/2,y:item.ty*TILE+TILE/2})<TILE*1.5){
      // Check if reachable
      if(item.requiredStep>0 && G.missionStep<item.requiredStep){
        showNotif('','Item ini belum bisa diambil!','Selesaikan misi sebelumnya dulu.');
        return;
      }
      collectItem(item); return;
    }
  }
  // Exit check
  if(dist(G.player,{x:EXIT.tx*TILE+TILE/2,y:EXIT.ty*TILE+TILE/2})<TILE*1.8){
    if(G.missionStep>=EXIT.requiredStep){
      winGame();
    } else {
      showNotif('','Pintu Terkunci!🔒','Kamu perlu kunci dari Nyonya Siput dulu!');
    }
  }
}

function collectItem(item){
  item.collected=true;
  G.inventory.push(item.id);
  updateInvUI();
  showNotif(item.img,'Item Ditemukan! ✅',item.name);
  // Auto advance mission step for item pickup
  if(item.id==='item_makanan' && G.missionStep===0){
    // just collected, now go give to pak koak — step stays 0
  }
  if(item.id==='item_papan_kayu' && G.missionStep===2){
    G.missionStep=3;
    updateMissionUI();
  }
  updateHUD();
}

// ═══════════════════════════════════════════════════════════════════
// DIALOG
// ═══════════════════════════════════════════════════════════════════
function openDialog(npc){
  G.currentNpc=npc;
  G.dialogOpen=true;
  const dialog = npc.dialogs[npc.fsmState] || npc.dialogs[Object.keys(npc.dialogs)[0]];
  renderDialog(npc, dialog);
}

function renderDialog(npc, dialog){
  if(!dialog){closeDialog();return;}
  document.getElementById('dlg').style.display='block';
  // Avatar
  const av=document.getElementById('dav');
  av.src=npc.img; av.alt=npc.name;
  document.getElementById('dname').textContent=npc.name;
  document.getElementById('dtxt').textContent='"'+dialog.text+'"';
  const cc=document.getElementById('dchoices');
  cc.innerHTML='';
  dialog.choices.forEach(ch=>{
    const btn=document.createElement('button');
    // Check if locked
    const needsMet  = !ch.needItem || G.inventory.includes(ch.needItem);
    const stepMet   = ch.needStep===undefined || G.missionStep>=ch.needStep;
    const isLocked  = !needsMet || !stepMet;
    btn.className='dc'+(ch.close&&ch.text!==dialog.choices[0]?.text?' neu':'')+(isLocked?' lk':'');
    btn.textContent=ch.text;
    if(!isLocked){
      btn.onclick=()=>handleChoice(npc,ch);
    } else {
      const reason = !needsMet ?
        `[Butuh: ${ch.needItem?.replace('item_','').replace(/_/g,' ')}]` :
        `[Selesaikan misi sebelumnya]`;
      btn.onclick=()=>showNotif('','Belum bisa! 🔒',reason);
    }
    cc.appendChild(btn);
  });
}

function handleChoice(npc, ch){
  // Give item to player
  if(ch.giveItem){
    G.inventory.push(ch.giveItem);
    // add fake item entry for display if not in items list
    const existing=G.items.find(i=>i.id===ch.giveItem);
    if(!existing){
      G.items.push({id:ch.giveItem,name:ch.giveItemName,img:`assets/${ch.giveItem}.png`,collected:false,requiredStep:-1,collected:true});
    } else { existing.collected=true; }
    updateInvUI();
    showNotif(`assets/${ch.giveItem}.png`,'Item Diterima! 🎁',ch.giveItemName);
  }
  // Remove item from player
  if(ch.removeItem){
    G.inventory=G.inventory.filter(i=>i!==ch.removeItem);
    updateInvUI();
  }
  // Advance mission step
  if(ch.advanceStep!==undefined){
    G.missionStep=ch.advanceStep;
    updateMissionUI(); updateHUD();
  }
  // Next dialog or close
  if(ch.close||!ch.next){ closeDialog(); }
  else {
    const nd=npc.dialogs[ch.next];
    if(nd) renderDialog(npc,nd); else closeDialog();
  }
}

function closeDialog(){
  G.dialogOpen=false;
  document.getElementById('dlg').style.display='none';
  G.currentNpc=null;
}

// ═══════════════════════════════════════════════════════════════════
// UI UPDATES
// ═══════════════════════════════════════════════════════════════════
const INV_DISPLAY=[
  {id:'item_makanan',    name:'MAKANAN', img:'assets/item_makanan.png'},
  {id:'item_papan_kayu', name:'PAPAN',   img:'assets/item_papan_kayu.png'},
  {id:'item_obor',       name:'OBOR',    img:'assets/item_obor.png'},
  {id:'item_catatan',    name:'CATATAN', img:'assets/item_catatan.png'},
  {id:'item_peta',       name:'PETA',    img:'assets/item_peta.png'},
  {id:'item_kunci',      name:'KUNCI',   img:'assets/item_kunci.png'},
];

function updateInvUI(){
  const sl=document.getElementById('islots');
  sl.innerHTML='';
  INV_DISPLAY.forEach(id=>{
    const div=document.createElement('div');
    const has=G.inventory.includes(id.id);
    div.className='isl'+(has?' has':'');
    if(has){
      const img=document.createElement('img');
      img.src=id.img; img.alt=id.name;
      div.appendChild(img);
      const lbl=document.createElement('div');
      lbl.className='iln'; lbl.textContent=id.name;
      div.appendChild(lbl);
    } else {
      div.textContent='·';
    }
    sl.appendChild(div);
  });
}

function updateMissionUI(){
  const mp=document.getElementById('mp');
  mp.innerHTML='<h4>🎯 MISI</h4>';
  MISSIONS.forEach((m,i)=>{
    const div=document.createElement('div');
    const done=i<G.missionStep;
    const active=i===G.missionStep;
    div.className='msp'+(done?' dn':active?' act':'');
    div.innerHTML=`<span class="msi">${done?'✓':active?'▶':'○'}</span>${m.label}`;
    mp.appendChild(div);
  });
}

function updateHUD(){
  const h=Math.floor(G.timerSec/3600);
  const m=Math.floor((G.timerSec%3600)/60);
  const s=G.timerSec%60;
  const el=document.getElementById('htimer');
  el.textContent=`Sisa Waktu: ${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  el.className=h===0&&m<30?'urgent':'';
  const ptx=Math.floor(G.player.x/TILE),pty=Math.floor(G.player.y/TILE);
  document.getElementById('harea').textContent=getArea(ptx,pty);
  document.getElementById('hmission').textContent=MISSIONS[Math.min(G.missionStep,MISSIONS.length-1)]?.label||'';
}

// ═══════════════════════════════════════════════════════════════════
// MINIMAP
// ═══════════════════════════════════════════════════════════════════
function drawMinimap(){
  const W=130,H=130,sx=W/MW,sy=H/MH;
  mmCtx.fillStyle='#060606'; mmCtx.fillRect(0,0,W,H);
  for(let ty=0;ty<MH;ty++) for(let tx=0;tx<MW;tx++){
    const t=MAP[ty][tx];
    mmCtx.fillStyle=t===T.FLOOR?'#182818':t===T.MOSS?'#182A10':t===T.WALL?'#2A1A08':'#0A1A28';
    mmCtx.fillRect(tx*sx,ty*sy,sx,sy);
  }
  // Exit
  mmCtx.fillStyle='rgba(255,255,80,.85)';
  mmCtx.fillRect(EXIT.tx*sx,EXIT.ty*sy,sx,sy);
  // NPCs
  G.npcs.forEach(npc=>{
    const nx=npc.x/TILE*sx, ny=npc.y/TILE*sy;
    mmCtx.fillStyle=npc.id==='petugas'?'#FF4444':npc.id==='blirik'?'#FF8800':'#AAFFAA';
    mmCtx.beginPath();mmCtx.arc(nx,ny,2.5,0,Math.PI*2);mmCtx.fill();
  });
  // Player
  const ppx=G.player.x/TILE*sx, ppy=G.player.y/TILE*sy;
  mmCtx.fillStyle='#FFD700';
  mmCtx.beginPath();mmCtx.arc(ppx,ppy,3.5,0,Math.PI*2);mmCtx.fill();
  // Viewport rect
  mmCtx.strokeStyle='rgba(255,255,255,.15)';mmCtx.lineWidth=1;
  mmCtx.strokeRect(G.camera.x/TILE*sx,G.camera.y/TILE*sy,(CW/TILE)*sx,(CH/TILE)*sy);
  // Label
  mmCtx.fillStyle='#2A2A2A'; mmCtx.font='8px monospace';
  mmCtx.textAlign='center'; mmCtx.fillText('PETA',65,10);
}

// ═══════════════════════════════════════════════════════════════════
// NOTIFICATION
// ═══════════════════════════════════════════════════════════════════
function showNotif(imgSrc, title, sub){
  const el=document.getElementById('notif');
  const img=document.getElementById('notif').querySelector('img');
  if(imgSrc){ img.src=imgSrc; img.style.display='block'; }
  else { img.style.display='none'; }
  document.getElementById('ntitle').textContent=title;
  document.getElementById('nsub').textContent=sub;
  el.style.display='flex'; el.style.opacity='1';
  clearTimeout(G.notifTimeout);
  G.notifTimeout=setTimeout(()=>{
    el.style.transition='opacity .5s';
    el.style.opacity='0';
    setTimeout(()=>{el.style.display='none';el.style.opacity='1';el.style.transition='';},500);
  },3000);
}

// ═══════════════════════════════════════════════════════════════════
// TRAP & GAMEOVER
// ═══════════════════════════════════════════════════════════════════
function checkTraps(){
  for(const trap of TRAPS){
    if(dist(G.player,{x:trap.tx*TILE+TILE/2,y:trap.ty*TILE+TILE/2})<TILE*.48){
      gameOver('Kamu terkena perangkap tikus! 🪤');
      return;
    }
  }
}

function gameOver(reason){
  G.running=false;
  clearInterval(G.timerInterval);
  showOverlay('GAME OVER 💀',reason,[
    {text:'Main Lagi',cls:'',fn:startGame},
    {text:'Intro',cls:'red',fn:showIntro},
  ]);
}

function winGame(){
  G.running=false;
  clearInterval(G.timerInterval);
  showOverlay('SELAMAT! 🎉','Si Tikus berhasil kabur dari got sebelum dibersihkan!',[
    {text:'Main Lagi',cls:'',fn:startGame},
    {text:'Intro',cls:'red',fn:showIntro},
  ]);
}

// ═══════════════════════════════════════════════════════════════════
// OVERLAY
// ═══════════════════════════════════════════════════════════════════
function showOverlay(title,sub,btns){
  document.getElementById('ovt').textContent=title;
  document.getElementById('ovs').textContent=sub;
  const bb=document.getElementById('ovb');
  bb.innerHTML='';
  btns.forEach(b=>{
    const btn=document.createElement('button');
    btn.className='ob '+(b.cls||'');
    btn.textContent=b.text;
    btn.onclick=b.fn;
    bb.appendChild(btn);
  });
  document.getElementById('ov').style.display='flex';
}
function hideOverlay(){ document.getElementById('ov').style.display='none'; }

function pauseGame(){
  if(!G.running) return;
  G.paused=true;
  clearInterval(G.timerInterval);
  showOverlay('PAUSE ⏸','',[ 
    {text:'Lanjutkan',cls:'',fn:()=>{G.paused=false;hideOverlay();startTimer();}},
    {text:'Mulai Ulang',cls:'red',fn:startGame},
  ]);
}

// ═══════════════════════════════════════════════════════════════════
// TIMER
// ═══════════════════════════════════════════════════════════════════
function startTimer(){
  G.timerInterval=setInterval(()=>{
    if(!G.running||G.paused) return;
    G.timerSec--;
    if(G.timerSec<=0) gameOver('Waktu habis! Petugas Got telah membersihkan seluruh got. ⏰');
    else updateHUD();
  },1000);
}

// ═══════════════════════════════════════════════════════════════════
// GAME LOOP
// ═══════════════════════════════════════════════════════════════════
function loop(){
  requestAnimationFrame(loop);
  G.tick++;
  if(!G.running) return;
  movePlayer();
  updateCamera();
  updateNPCs();
  checkTraps();
  // Canvas size sync
  const rect=canvas.getBoundingClientRect();
  canvas.width=rect.width||CW;
  canvas.height=rect.height||CH;
  const scaleX=canvas.width/CW, scaleY=canvas.height/CH;
  ctx.save();
  ctx.scale(scaleX,scaleY);
  // Clear
  ctx.fillStyle='#050505'; ctx.fillRect(0,0,CW,CH);
  // World tiles
  const sx=Math.max(0,Math.floor(G.camera.x/TILE)-1);
  const ex=Math.min(MW,Math.ceil((G.camera.x+CW)/TILE)+1);
  const sy2=Math.max(0,Math.floor(G.camera.y/TILE)-1);
  const ey=Math.min(MH,Math.ceil((G.camera.y+CH)/TILE)+1);
  for(let ty=sy2;ty<ey;ty++) for(let tx=sx;tx<ex;tx++) drawTile(ctx,MAP[ty][tx],tx*TILE-G.camera.x,ty*TILE-G.camera.y);
  // Exit
  drawExit(ctx,G.tick);
  // Traps
  TRAPS.forEach(tr=>drawTrap(ctx,tr.tx*TILE+TILE/2-G.camera.x,tr.ty*TILE+TILE/2-G.camera.y,G.tick));
  // Items
  G.items.forEach(it=>drawItem(ctx,it,G.tick));
  // NPCs
  G.npcs.forEach(npc=>drawNPC(ctx,npc,G.camera.x,G.camera.y,G.tick));
  // Player
  const ppx=G.player.x-G.camera.x, ppy=G.player.y-G.camera.y;
  drawPlayer(ctx,ppx,ppy,G.player.dir,G.player.moving,G.tick);
  // Fog of war
  drawFog(ctx,ppx,ppy,TILE*4.5);
  ctx.restore();
  // Minimap
  drawMinimap();
}

// ═══════════════════════════════════════════════════════════════════
// INPUT
// ═══════════════════════════════════════════════════════════════════
document.addEventListener('keydown',e=>{
  G.keys[e.key]=true;
  if(e.key==='e'||e.key==='E'){e.preventDefault();interact();}
  if(e.key==='Escape'){e.preventDefault();if(G.dialogOpen)closeDialog();else if(G.running&&!G.paused)pauseGame();else if(G.paused){G.paused=false;hideOverlay();startTimer();}}
  if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key))e.preventDefault();
});
document.addEventListener('keyup',e=>delete G.keys[e.key]);

// ═══════════════════════════════════════════════════════════════════
// MOBILE D-PAD
// ═══════════════════════════════════════════════════════════════════
function setupMobile(){
  const map={dpu:'w',dpd:'s',dpl:'a',dpr:'d'};
  Object.entries(map).forEach(([id,key])=>{
    const el=document.getElementById(id);
    if(!el) return;
    const press=()=>{G.keys[key]=true;el.classList.add('p');};
    const rel=()=>{delete G.keys[key];el.classList.remove('p');};
    el.addEventListener('touchstart',e=>{e.preventDefault();press();},{passive:false});
    el.addEventListener('touchend',e=>{e.preventDefault();rel();},{passive:false});
    el.addEventListener('mousedown',press);
    el.addEventListener('mouseup',rel);
  });
  document.getElementById('btn-e')?.addEventListener('click',interact);
  document.getElementById('btn-esc')?.addEventListener('click',()=>{
    if(G.dialogOpen)closeDialog(); else if(G.running&&!G.paused)pauseGame(); else{G.paused=false;hideOverlay();startTimer();}
  });
}

// ═══════════════════════════════════════════════════════════════════
// SCREENS
// ═══════════════════════════════════════════════════════════════════
function showIntro(){
  G.running=false;
  clearInterval(G?.timerInterval);
  document.getElementById('introScreen').classList.add('active');
  document.getElementById('gameScreen').classList.remove('active');
}

function startGame(mode){
  document.getElementById('introScreen').classList.remove('active');
  document.getElementById('gameScreen').classList.add('active');
  if(mode==='mobile') document.body.classList.add('mobile');
  else document.body.classList.remove('mobile');
  resetState();
  G.mobileMode=(mode==='mobile');
  G.running=true;
  hideOverlay();
  closeDialog();
  updateInvUI();
  updateMissionUI();
  updateHUD();
  clearInterval(G.timerInterval);
  startTimer();
}

// ═══════════════════════════════════════════════════════════════════
// BOOT
// ═══════════════════════════════════════════════════════════════════
resetState();
setupMobile();
loop();
showIntro();
