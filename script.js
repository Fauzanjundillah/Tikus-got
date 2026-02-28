// ═══════════════════════════════════════════════════════════
// ASSETS (embedded as data URLs)
// ═══════════════════════════════════════════════════════════
const IMG = {};
const ASSET_KEYS = [
  'tikus_down','tikus_up','tikus_left','tikus_right',
  'npc_pak_koak','npc_kiki','npc_blirik','npc_nyonya_siput','npc_petugas_got',
  'tile_floor','tile_wall','tile_wall_moss','tile_pipe_h','tile_pipe_v','tile_puddle',
  'item_peta','item_kunci','item_makanan','item_papan_kayu',
  'item_obor','item_catatan','item_perangkap',
  'ui_dialog_box','ui_hud_top','ui_inventory','ui_minimap','ui_notif_item','ui_pause_menu'
];

// ═══════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════
const TILE = 48;
const CANVAS_W = 900, CANVAS_H = 514;
const MAP_W = 30, MAP_H = 24;

// Tile types
const T = { EMPTY:0, FLOOR:1, WALL:2, WALL_MOSS:3, PIPE_H:4, PIPE_V:5, PUDDLE:6 };

// ═══════════════════════════════════════════════════════════
// MAP DEFINITION (30x24 grid)
// ═══════════════════════════════════════════════════════════
const MAP_DATA = [
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
  [2,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,2],
  [2,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,2],
  [2,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,2],
  [2,1,1,6,1,1,1,1,1,1,1,1,1,4,4,4,1,1,1,1,1,1,1,1,6,1,1,1,1,2],
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
  [2,1,1,1,1,1,1,1,1,1,1,1,1,4,4,4,1,1,1,1,1,1,1,1,6,1,1,1,1,2],
  [2,1,1,6,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,2],
  [2,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,2],
  [2,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,2],
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
];

// ═══════════════════════════════════════════════════════════
// GAME STATE
// ═══════════════════════════════════════════════════════════
const state = {
  player: {
    x: 14*TILE, y: 11*TILE,  // pixel position (center)
    dir: 'down',
    speed: 3.5,
    moving: false,
  },
  camera: { x: 0, y: 0 },
  keys: {},
  inventory: [],
  discoveredAreas: new Set(['tengah']),
  timer: { hours:23, minutes:59, seconds:59, total: 23*3600+59*60+59 },
  timerInterval: null,
  gameRunning: false,
  paused: false,
  dialogOpen: false,
  notifTimeout: null,
  trapPositions: [
    {tx:17, ty:4}, {tx:5, ty:11}, {tx:24, ty:12}, {tx:8, ty:19}
  ],
  itemPositions: [
    { id:'item_makanan', tx:13, ty:7,  name:'Makanan Basi',    collected:false },
    { id:'item_papan_kayu', tx:24, ty:3, name:'Papan Kayu',   collected:false },
    { id:'item_obor',   tx:3,  ty:9,  name:'Obor Kecil',      collected:false },
    { id:'item_catatan',tx:22, ty:15, name:'Catatan Kiki',     collected:false },
  ],
  exitPos: { tx:28, ty:13 },
  npcs: [],
  currentNPC: null,
  currentDialogStep: 0,
};

// ═══════════════════════════════════════════════════════════
// NPC DEFINITIONS + FSM
// ═══════════════════════════════════════════════════════════
const NPC_DEFS = [
  {
    id:'pak_koak', name:'Pak Koak', img:'npc_pak_koak',
    tx:3, ty:15, state:'IDLE',
    wanderRange:1,
    dialogs: {
      IDLE: {
        text: 'Hei, Tikus Kecil! Sudah lama aku tidak bertemu siapapun. Petugas Kota akan datang besok pagi!',
        choices: [
          { text:'> Ada apa, Pak Koak?', next:'INFO' },
          { text:'Permisi dulu.', close:true }
        ]
      },
      INFO: {
        text: 'Aku punya peta sebagian got ini... tapi kamu harus membantuku dulu. Bawakan aku Makanan Basi dari Got Tengah!',
        choices: [
          { text:'> Oke, aku carikan!', next:'WAITING', setState:'WAITING' },
          { text:'Nanti dulu.', close:true }
        ]
      },
      WAITING: {
        text: 'Aku menunggu di sini. Jangan lupa bawakan Makanan Basi ya!',
        choices: [
          { text:'> Aku sudah bawa!', condition:'item_makanan', next:'GIVE', giveItem:'item_peta', takesItem:'item_makanan' },
          { text:'Belum dapat nih.', close:true }
        ]
      },
      GIVE: {
        text: 'Wah, terima kasih! Ini petanya. Gunakan dengan baik untuk menemukan jalan keluar!',
        choices: [
          { text:'> Terima kasih, Pak Koak!', next:'DONE', setState:'DONE' }
        ]
      },
      DONE: {
        text: 'Hati-hati ya, Tikus Kecil. Semoga kamu bisa keluar sebelum Petugas datang!',
        choices: [
          { text:'> Terima kasih!', close:true }
        ]
      },
    }
  },
  {
    id:'kiki', name:'Kiki', img:'npc_kiki',
    tx:22, ty:5, state:'WANDERING',
    wanderRange:3,
    wanderTimer:0,
    wanderDirX:0, wanderDirY:0,
    dialogs: {
      WANDERING: {
        text: 'Eh, ada tikus lain! Hei hei! Kamu mau keluar juga? Aku dengar ada lorong rahasia di Got Timur lho!',
        choices: [
          { text:'> Serius? Di mana?', next:'INFO2' },
          { text:'Oh gitu ya.', close:true }
        ]
      },
      INFO2: {
        text: 'Iya! Tapi pintunya terkunci. Nyonya Siput di Got Timur punya kuncinya. Temui dia deh!',
        choices: [
          { text:'> Oke, aku cari Nyonya Siput!', next:'DONE2', setState:'DONE2', giveItem:'item_catatan' },
          { text:'Makasih infonya!', close:true }
        ]
      },
      DONE2: {
        text: 'Ini catatan dariku! Ada peta kecil ke tempat Nyonya Siput. Semangat ya!',
        choices: [
          { text:'> Makasih Kiki!', close:true }
        ]
      },
    }
  },
  {
    id:'blirik', name:'Blirik', img:'npc_blirik',
    tx:14, ty:11, state:'PATROL',
    patrolPath:[{tx:14,ty:11},{tx:17,ty:11},{tx:17,ty:14},{tx:14,ty:14}],
    patrolIdx:0, patrolTimer:0,
    dialogs: {
      PATROL: {
        text: '...',
        choices: []
      },
      BRIBED: {
        text: 'Hmm... kali ini aku biarkan kamu lewat. Tapi lain kali jangan ganggu rondeku!',
        choices: [
          { text:'> Terima kasih, Blirik!', close:true }
        ]
      },
      BLOCK: {
        text: 'STOP! Area ini dijaga! Kamu tidak boleh lewat sembarangan!',
        choices: [
          { text:'> Ini makanannya...', condition:'item_makanan', next:'BRIBED', setState:'BRIBED', takesItem:'item_makanan' },
          { text:'Maaf, aku pergi.', close:true }
        ]
      },
    }
  },
  {
    id:'nyonya_siput', name:'Nyonya Siput', img:'npc_nyonya_siput',
    tx:25, ty:19, state:'IDLE',
    wanderRange:1,
    dialogs: {
      IDLE: {
        text: 'Oh, tamu! Jarang ada yang datang ke sini. Ada yang bisa aku bantu, sayang?',
        choices: [
          { text:'> Aku perlu kunci lorong!', next:'ASK_KEY' },
          { text:'Hanya mampir saja.', close:true }
        ]
      },
      ASK_KEY: {
        text: 'Kunci lorong? Oh aku punya... tapi aku butuh Papan Kayu untuk memperbaiki rumahku dulu!',
        choices: [
          { text:'> Aku carikan papannya!', next:'WAITING_KEY', setState:'WAITING_KEY' },
          { text:'Nanti ya.', close:true }
        ]
      },
      WAITING_KEY: {
        text: 'Aku tunggu Papan Kayunya ya. Jangan lama-lama, Petugas mau datang!',
        choices: [
          { text:'> Ini papannya!', condition:'item_papan_kayu', next:'GIVE_KEY', giveItem:'item_kunci', takesItem:'item_papan_kayu' },
          { text:'Belum ada nih.', close:true }
        ]
      },
      GIVE_KEY: {
        text: 'Wah, terima kasih banyak! Ini kuncinya. Lorong rahasianya ada di pojok Got Utara. Hati-hati!',
        choices: [
          { text:'> Terima kasih, Nyonya!', next:'DONE3', setState:'DONE3' }
        ]
      },
      DONE3: {
        text: 'Semoga selamat ya, sayang. Aku akan pergi juga setelah ini.',
        choices: [
          { text:'> Sampai jumpa!', close:true }
        ]
      },
    }
  },
];

// ═══════════════════════════════════════════════════════════
// IMAGE LOADER
// ═══════════════════════════════════════════════════════════
function loadImages(callback) {
  // We'll draw everything procedurally since assets are matplotlib PNGs
  // but still try to load them
  let loaded = 0;
  const total = ASSET_KEYS.length;

  if (total === 0) { callback(); return; }

  ASSET_KEYS.forEach(key => {
    const img = new Image();
    img.onload = img.onerror = () => {
      loaded++;
      if (loaded >= total) callback();
    };
    // Assets will be set externally or use fallback
    IMG[key] = img;
    img.src = ''; // placeholder — will use procedural drawing
    // immediately trigger
    img.dispatchEvent(new Event('error'));
  });
}

// ═══════════════════════════════════════════════════════════
// CANVAS SETUP
// ═══════════════════════════════════════════════════════════
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const mmCanvas = document.getElementById('minimapCanvas');
const mmCtx = mmCanvas.getContext('2d');

// ═══════════════════════════════════════════════════════════
// PROCEDURAL DRAWING FUNCTIONS
// ═══════════════════════════════════════════════════════════
function drawTile(ctx, type, px, py, tw=TILE, th=TILE) {
  switch(type) {
    case T.FLOOR:
      ctx.fillStyle = '#1A1208';
      ctx.fillRect(px,py,tw,th);
      ctx.fillStyle = '#1E150A';
      for(let i=0;i<2;i++) for(let j=0;j<2;j++) {
        ctx.fillRect(px+i*tw/2+1,py+j*th/2+1,tw/2-2,th/2-2);
      }
      ctx.strokeStyle='#111'; ctx.lineWidth=0.5;
      ctx.strokeRect(px,py,tw,th);
      break;
    case T.WALL: case T.WALL_MOSS:
      const wc = type===T.WALL_MOSS?'#1A2A10':'#2A1F0F';
      ctx.fillStyle=wc; ctx.fillRect(px,py,tw,th);
      const bc = type===T.WALL_MOSS?'#253818':'#352515';
      ctx.fillStyle=bc;
      for(let r=0;r<3;r++){
        const off=(r%2)*tw/2;
        for(let c=0;c<3;c++){
          ctx.strokeStyle=type===T.WALL_MOSS?'#1A2A10':'#1A1008';
          ctx.lineWidth=0.5;
          ctx.fillRect(px+off+c*tw/2+1,py+r*th/3+1,tw/2-2,th/3-2);
          ctx.strokeRect(px+off+c*tw/2+1,py+r*th/3+1,tw/2-2,th/3-2);
        }
      }
      ctx.fillStyle='#1A1008'; ctx.fillRect(px,py+th-4,tw,4);
      if(type===T.WALL_MOSS) {
        ctx.fillStyle='rgba(58,90,32,0.6)';
        for(let m=0;m<3;m++) ctx.fillRect(px+m*14+4,py+th-10,10,6);
      }
      break;
    case T.PIPE_H:
      ctx.fillStyle='#1A1208'; ctx.fillRect(px,py,tw,th);
      ctx.fillStyle='#3D5A3E'; ctx.fillRect(px,py+th*0.3,tw,th*0.4);
      ctx.fillStyle='#4A6E4B'; ctx.fillRect(px,py+th*0.55,tw,th*0.1);
      ctx.fillStyle='#2A3D2B'; ctx.fillRect(px,py+th*0.3,tw,th*0.06);
      for(let s=0;s<tw;s+=14) { ctx.fillStyle='#2A3D2B'; ctx.fillRect(px+s,py+th*0.3,1,th*0.4); }
      break;
    case T.PIPE_V:
      ctx.fillStyle='#1A1208'; ctx.fillRect(px,py,tw,th);
      ctx.fillStyle='#3D5A3E'; ctx.fillRect(px+tw*0.3,py,tw*0.4,th);
      ctx.fillStyle='#4A6E4B'; ctx.fillRect(px+tw*0.55,py,tw*0.1,th);
      ctx.fillStyle='#2A3D2B'; ctx.fillRect(px+tw*0.3,py,tw*0.06,th);
      for(let s=0;s<th;s+=14) { ctx.fillStyle='#2A3D2B'; ctx.fillRect(px+tw*0.3,py+s,tw*0.4,1); }
      // drip
      ctx.fillStyle='rgba(26,64,96,0.7)';
      ctx.beginPath(); ctx.ellipse(px+tw*0.7,py+th*0.4,3,5,0,0,Math.PI*2); ctx.fill();
      break;
    case T.PUDDLE:
      ctx.fillStyle='#1A1208'; ctx.fillRect(px,py,tw,th);
      ctx.fillStyle='rgba(10,30,48,0.9)';
      ctx.beginPath(); ctx.ellipse(px+tw/2,py+th/2,tw*0.45,th*0.35,0,0,Math.PI*2); ctx.fill();
      ctx.fillStyle='rgba(26,64,96,0.45)';
      ctx.beginPath(); ctx.ellipse(px+tw*0.55,py+th*0.45,tw*0.18,th*0.12,0,0,Math.PI*2); ctx.fill();
      break;
    default:
      ctx.fillStyle='#1A1208'; ctx.fillRect(px,py,tw,th);
  }
}

function drawPlayer(ctx, px, py, dir, moving, t) {
  const bobY = moving ? Math.sin(t*0.18)*3 : 0;
  const y = py + bobY;
  const s = TILE*0.9;

  // Shadow
  ctx.fillStyle='rgba(0,0,0,0.4)';
  ctx.beginPath(); ctx.ellipse(px,py+s*0.42,s*0.28,s*0.1,0,0,Math.PI*2); ctx.fill();

  // Tail
  ctx.strokeStyle='#B08858'; ctx.lineWidth=3;
  ctx.lineCap='round';
  ctx.beginPath();
  if(dir==='down'||dir==='up') {
    ctx.moveTo(px+s*0.18,y+s*0.1);
    ctx.bezierCurveTo(px+s*0.5,y+s*0.25,px+s*0.6,y,px+s*0.5,y-s*0.2);
  } else if(dir==='right') {
    ctx.moveTo(px-s*0.2,y+s*0.05);
    ctx.bezierCurveTo(px-s*0.5,y+s*0.2,px-s*0.7,y,px-s*0.6,y-s*0.2);
  } else {
    ctx.moveTo(px+s*0.2,y+s*0.05);
    ctx.bezierCurveTo(px+s*0.5,y+s*0.2,px+s*0.7,y,px+s*0.6,y-s*0.2);
  }
  ctx.stroke();

  // Body
  ctx.fillStyle='#C8A878';
  ctx.beginPath(); ctx.ellipse(px,y,s*0.22,s*0.28,0,0,Math.PI*2); ctx.fill();
  // Jacket
  ctx.fillStyle='#1A3A6A';
  ctx.beginPath(); ctx.ellipse(px,y,s*0.2,s*0.26,0,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#C8A878';
  ctx.beginPath(); ctx.ellipse(px,y-s*0.08,s*0.1,s*0.14,0,0,Math.PI*2); ctx.fill();

  // Head
  ctx.fillStyle='#C8A878';
  ctx.beginPath(); ctx.arc(px,y-s*0.3,s*0.17,0,Math.PI*2); ctx.fill();

  // Ears
  ctx.fillStyle='#C8A878';
  ctx.beginPath(); ctx.arc(px-s*0.12,y-s*0.44,s*0.08,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(px+s*0.12,y-s*0.44,s*0.08,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#E8A0A0';
  ctx.beginPath(); ctx.arc(px-s*0.12,y-s*0.44,s*0.05,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(px+s*0.12,y-s*0.44,s*0.05,0,Math.PI*2); ctx.fill();

  if(dir!=='up') {
    // Eyes
    ctx.fillStyle='#111';
    ctx.beginPath(); ctx.arc(px-s*0.07,y-s*0.31,s*0.035,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(px+s*0.07,y-s*0.31,s*0.035,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='white';
    ctx.beginPath(); ctx.arc(px-s*0.06,y-s*0.32,s*0.014,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(px+s*0.08,y-s*0.32,s*0.014,0,Math.PI*2); ctx.fill();
    // Nose
    ctx.fillStyle='#FF8888';
    ctx.beginPath(); ctx.arc(px,y-s*0.24,s*0.025,0,Math.PI*2); ctx.fill();
    // Whiskers
    ctx.strokeStyle='#999'; ctx.lineWidth=0.8;
    for(const [wx,wy] of [[-s*0.22,0],[-s*0.22,s*0.04],[s*0.22,0],[s*0.22,s*0.04]]) {
      ctx.beginPath(); ctx.moveTo(px,y-s*0.24); ctx.lineTo(px+wx,y-s*0.24+wy); ctx.stroke();
    }
  }

  // Player arrow indicator
  ctx.fillStyle='#FFD700';
  ctx.font=`${TILE*0.35}px monospace`;
  ctx.textAlign='center'; ctx.textBaseline='middle';
  ctx.fillText('▼',px,y-s*0.65);
}

function drawNPC(ctx, npc, camX, camY, t) {
  const px = npc.x - camX;
  const py = npc.y - camY;
  const s = TILE*0.9;
  const bobY = Math.sin(t*0.05 + npc.id.length)*2;

  if(npc.id==='pak_koak') {
    // Shadow
    ctx.fillStyle='rgba(0,0,0,0.35)';
    ctx.beginPath(); ctx.ellipse(px,py+s*0.45,s*0.3,s*0.1,0,0,Math.PI*2); ctx.fill();
    // Body
    ctx.fillStyle='#4A7A30';
    ctx.beginPath(); ctx.ellipse(px,py+bobY,s*0.25,s*0.32,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#7AB850';
    ctx.beginPath(); ctx.ellipse(px,py+s*0.1+bobY,s*0.18,s*0.22,0,0,Math.PI*2); ctx.fill();
    // Head
    ctx.fillStyle='#5A8A3A';
    ctx.beginPath(); ctx.arc(px,py-s*0.18+bobY,s*0.2,0,Math.PI*2); ctx.fill();
    // Eyes
    ctx.fillStyle='#8AC040';
    ctx.beginPath(); ctx.ellipse(px-s*0.1,py-s*0.25+bobY,s*0.1,s*0.09,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(px+s*0.1,py-s*0.25+bobY,s*0.1,s*0.09,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#111';
    ctx.beginPath(); ctx.arc(px-s*0.1,py-s*0.25+bobY,s*0.05,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(px+s*0.1,py-s*0.25+bobY,s*0.05,0,Math.PI*2); ctx.fill();
    // Hat
    ctx.fillStyle='#2A1A08';
    ctx.beginPath(); ctx.ellipse(px,py-s*0.35+bobY,s*0.22,s*0.06,0,0,Math.PI*2); ctx.fill();
    ctx.fillRect(px-s*0.12,py-s*0.55+bobY,s*0.24,s*0.2);
    ctx.beginPath(); ctx.ellipse(px,py-s*0.55+bobY,s*0.16,s*0.05,0,0,Math.PI*2); ctx.fill();
    // Legs
    ctx.fillStyle='#4A7A30';
    ctx.beginPath(); ctx.ellipse(px-s*0.14,py+s*0.45+bobY,s*0.12,s*0.07,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(px+s*0.14,py+s*0.45+bobY,s*0.12,s*0.07,0,0,Math.PI*2); ctx.fill();
  }
  else if(npc.id==='kiki') {
    ctx.fillStyle='rgba(0,0,0,0.3)';
    ctx.beginPath(); ctx.ellipse(px,py+s*0.42,s*0.22,s*0.08,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#FF9AB0';
    ctx.beginPath(); ctx.ellipse(px,py+s*0.05+bobY,s*0.18,s*0.28,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#FF6B8A';
    ctx.beginPath(); ctx.ellipse(px,py+s*0.25+bobY,s*0.22,s*0.12,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#D4B896';
    ctx.beginPath(); ctx.arc(px,py-s*0.2+bobY,s*0.17,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(px-s*0.11,py-s*0.33+bobY,s*0.07,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(px+s*0.11,py-s*0.33+bobY,s*0.07,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#E8A0B0';
    ctx.beginPath(); ctx.arc(px-s*0.11,py-s*0.33+bobY,s*0.04,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(px+s*0.11,py-s*0.33+bobY,s*0.04,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#111';
    ctx.beginPath(); ctx.arc(px-s*0.06,py-s*0.22+bobY,s*0.032,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(px+s*0.06,py-s*0.22+bobY,s*0.032,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='white';
    ctx.beginPath(); ctx.arc(px-s*0.05,py-s*0.215+bobY,s*0.013,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(px+s*0.07,py-s*0.215+bobY,s*0.013,0,Math.PI*2); ctx.fill();
    // Blush
    ctx.fillStyle='rgba(255,176,192,0.6)';
    ctx.beginPath(); ctx.ellipse(px-s*0.1,py-s*0.12+bobY,s*0.06,s*0.03,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(px+s*0.1,py-s*0.12+bobY,s*0.06,s*0.03,0,0,Math.PI*2); ctx.fill();
    // Ribbon
    ctx.fillStyle='#FF4488';
    ctx.beginPath(); ctx.ellipse(px+s*0.1,py-s*0.37+bobY,s*0.1,s*0.05,-0.5,0,Math.PI*2); ctx.fill();
    // Tail
    ctx.strokeStyle='#C4A080'; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(px+s*0.12,py+s*0.1+bobY);
    ctx.bezierCurveTo(px+s*0.3,py+s*0.25+bobY,px+s*0.4,py+s*0.1+bobY,px+s*0.35,py-s*0.05+bobY);
    ctx.stroke();
  }
  else if(npc.id==='blirik') {
    ctx.fillStyle='rgba(0,0,0,0.35)';
    ctx.beginPath(); ctx.ellipse(px,py+s*0.42,s*0.22,s*0.08,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#2A1A08';
    ctx.beginPath(); ctx.ellipse(px,py+bobY,s*0.2,s*0.32,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#3D2810';
    ctx.beginPath(); ctx.ellipse(px-s*0.08,py+s*0.02+bobY,s*0.14,s*0.28,-0.1,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(px+s*0.08,py+s*0.02+bobY,s*0.14,s*0.28,0.1,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#3D2810';
    ctx.beginPath(); ctx.arc(px,py-s*0.22+bobY,s*0.12,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#CC2200';
    ctx.beginPath(); ctx.arc(px-s*0.06,py-s*0.26+bobY,s*0.04,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(px+s*0.06,py-s*0.26+bobY,s*0.04,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle='#5A3A18'; ctx.lineWidth=1.5;
    for(const [ax,ay,ex,ey] of [
      [-s*.04,s*-.12,-s*.2,s*-.02],[-s*.04,s*-.12,-s*.2,s*-.22],
      [s*.04,s*-.12,s*.2,s*-.02],[s*.04,s*-.12,s*.2,s*-.22]
    ]) {
      ctx.beginPath(); ctx.moveTo(px+ax,py-s*0.22+ay+bobY); ctx.lineTo(px+ex,py-s*0.22+ey+bobY); ctx.stroke();
    }
    // Legs
    for(const [lx,ly] of [[-s*.18,-s*.1],[-s*.18,s*.05],[-s*.18,s*.2],[s*.18,-s*.1],[s*.18,s*.05],[s*.18,s*.2]]) {
      ctx.strokeStyle='#2A1A08'; ctx.lineWidth=1.5;
      ctx.beginPath(); ctx.moveTo(px+lx*0.5,py+ly+bobY); ctx.lineTo(px+lx,py+ly+s*.12+bobY); ctx.stroke();
    }
    // Badge
    ctx.fillStyle='#FF6600';
    roundRect(ctx,px-s*.1,py-s*.08+bobY,s*.2,s*.1,3); ctx.fill();
    ctx.fillStyle='white'; ctx.font=`bold ${TILE*0.13}px monospace`;
    ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText('JAGA',px,py-s*.03+bobY);
  }
  else if(npc.id==='nyonya_siput') {
    ctx.fillStyle='rgba(0,0,0,0.3)';
    ctx.beginPath(); ctx.ellipse(px,py+s*0.42,s*0.28,s*0.1,0,0,Math.PI*2); ctx.fill();
    // Shell
    for(const [r,c] of [[s*.35,'#C4883A'],[s*.28,'#D49A4A'],[s*.21,'#C4883A'],[s*.14,'#B87830']]) {
      ctx.fillStyle=c;
      ctx.beginPath(); ctx.arc(px+s*0.08,py-s*0.1+bobY,r,0,Math.PI*2); ctx.fill();
    }
    ctx.fillStyle='rgba(232,184,96,0.4)';
    ctx.beginPath(); ctx.ellipse(px,py-s*0.22+bobY,s*0.12,s*0.06,-0.5,0,Math.PI*2); ctx.fill();
    // Body
    ctx.fillStyle='#D4AA70';
    ctx.beginPath(); ctx.ellipse(px-s*0.05,py+s*0.2+bobY,s*0.32,s*0.16,0,0,Math.PI*2); ctx.fill();
    // Head
    ctx.fillStyle='#D4AA70';
    ctx.beginPath(); ctx.arc(px-s*0.28,py+s*0.05+bobY,s*0.14,0,Math.PI*2); ctx.fill();
    // Tentacles
    for(const [tx2,ty2] of [[-s*.04,s*.1],[s*.04,s*.1]]) {
      ctx.strokeStyle='#C4A060'; ctx.lineWidth=2.5;
      ctx.beginPath(); ctx.moveTo(px-s*.28+tx2,py+s*.05+bobY); ctx.lineTo(px-s*.28+tx2,py-s*.05+bobY); ctx.stroke();
      ctx.fillStyle='#111';
      ctx.beginPath(); ctx.arc(px-s*.28+tx2,py-s*.07+bobY,s*.025,0,Math.PI*2); ctx.fill();
    }
    // Flower on shell
    ctx.fillStyle='#FF6B9D';
    ctx.beginPath(); ctx.arc(px+s*0.08,py-s*0.32+bobY,s*0.05,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#FFB0D0';
    for(let a=0;a<6;a++) {
      const fx=px+s*0.08+Math.cos(a*Math.PI/3)*s*0.08;
      const fy=py-s*0.32+bobY+Math.sin(a*Math.PI/3)*s*0.08;
      ctx.beginPath(); ctx.arc(fx,fy,s*0.04,0,Math.PI*2); ctx.fill();
    }
  }
  else if(npc.id==='petugas_got') {
    ctx.fillStyle='rgba(0,0,0,0.4)';
    ctx.beginPath(); ctx.ellipse(px,py+s*0.42,s*0.25,s*0.09,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#2A4A1A';
    ctx.beginPath(); ctx.ellipse(px,py+s*0.2+bobY,s*0.22,s*0.22,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#D4A800';
    ctx.beginPath(); ctx.ellipse(px,py-s*0.05+bobY,s*0.24,s*0.28,0,0,Math.PI*2); ctx.fill();
    // Reflective strips
    ctx.fillStyle='rgba(180,180,180,0.7)';
    ctx.beginPath(); ctx.ellipse(px,py-s*0.1+bobY,s*0.22,s*0.025,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(px,py+s*0.05+bobY,s*0.22,s*0.025,0,0,Math.PI*2); ctx.fill();
    // Helmet
    ctx.fillStyle='#FFDD00';
    ctx.beginPath(); ctx.arc(px,py-s*0.32+bobY,s*0.18,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(px,py-s*0.4+bobY,s*0.28,s*0.08,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='rgba(26,42,58,0.88)';
    ctx.beginPath(); ctx.ellipse(px,py-s*0.33+bobY,s*0.24,s*0.1,0,0,Math.PI*2); ctx.fill();
    // Broom
    ctx.strokeStyle='#8B6914'; ctx.lineWidth=3;
    ctx.beginPath(); ctx.moveTo(px+s*0.18,py-s*0.05+bobY); ctx.lineTo(px+s*0.42,py+s*0.42+bobY); ctx.stroke();
    ctx.fillStyle='#5A3A10';
    ctx.beginPath(); ctx.ellipse(px+s*0.45,py+s*0.48+bobY,s*0.1,s*0.06,0.3,0,Math.PI*2); ctx.fill();
  }

  // NPC interaction indicator
  const nearby = isNearby(state.player, npc, TILE*2.2);
  if(nearby && !state.dialogOpen) {
    const isBribed = npc.id==='blirik' && npc.state==='BRIBED';
    const isDone = npc.state==='DONE' || npc.state==='DONE2' || npc.state==='DONE3';
    const ind = isDone ? '•' : '!';
    const indBg = isDone ? '#4A4A4A' : '#FFD700';
    const indColor = isDone ? '#888' : '#1A0A00';
    ctx.fillStyle=indBg;
    roundRect(ctx,px-10,py-s*0.65-18,20,22,4); ctx.fill();
    ctx.fillStyle=indColor; ctx.font=`bold ${TILE*0.35}px monospace`;
    ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText(ind,px,py-s*0.65-7);
  }

  // NPC Name tag
  ctx.fillStyle='rgba(10,26,10,0.85)';
  const nameW = npc.name.length*6+12;
  roundRect(ctx,px-nameW/2,py+s*0.5,nameW,16,4); ctx.fill();
  ctx.fillStyle=npc.id==='blirik'?'#FFAA44':npc.id==='kiki'?'#FFAACC':'#AAFFAA';
  ctx.font=`${TILE*0.2}px monospace`; ctx.textAlign='center'; ctx.textBaseline='middle';
  ctx.fillText(npc.name,px,py+s*0.5+8);
}

function drawTrap(ctx, px, py) {
  ctx.fillStyle='#7A5810';
  roundRect(ctx,px-14,py-5,28,10,2); ctx.fill();
  ctx.strokeStyle='#4A3000'; ctx.lineWidth=1.5;
  roundRect(ctx,px-14,py-5,28,10,2); ctx.stroke();
  ctx.strokeStyle='#C0A020'; ctx.lineWidth=2;
  ctx.beginPath(); ctx.moveTo(px-10,py-5); ctx.lineTo(px,py-13); ctx.lineTo(px+10,py-5); ctx.stroke();
  ctx.fillStyle='rgba(255,0,0,0.12)';
  ctx.beginPath(); ctx.ellipse(px,py,20,12,0,0,Math.PI*2); ctx.fill();
}

function drawItem(ctx, item, t) {
  if(item.collected) return;
  const px = item.tx*TILE + TILE/2 - state.camera.x;
  const py = item.ty*TILE + TILE/2 - state.camera.y;
  const bobY = Math.sin(t*0.05)*4;

  // Glow
  const grd = ctx.createRadialGradient(px,py,0,px,py,24);
  grd.addColorStop(0,'rgba(255,215,0,0.2)');
  grd.addColorStop(1,'rgba(255,215,0,0)');
  ctx.fillStyle=grd;
  ctx.beginPath(); ctx.ellipse(px,py+5,22,8,0,0,Math.PI*2); ctx.fill();

  // Item icon (drawn procedurally)
  ctx.save();
  ctx.translate(px, py+bobY);
  const ic = TILE*0.35;
  if(item.id==='item_makanan') {
    ctx.fillStyle='#8B4513'; ctx.beginPath(); ctx.arc(0,0,ic*0.7,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#A0522D'; ctx.beginPath(); ctx.arc(0,0,ic*0.4,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle='rgba(100,180,50,0.6)'; ctx.lineWidth=1.5;
    for(let i=0;i<3;i++) { ctx.beginPath(); ctx.moveTo(0,-ic*0.7); ctx.bezierCurveTo(ic*0.3,-ic*0.4,0,0,0,-ic*0.1); ctx.stroke(); }
  } else if(item.id==='item_papan_kayu') {
    ctx.fillStyle='#8B6914';
    for(let i=0;i<3;i++) { roundRect(ctx,-ic*0.9,i*ic*0.5-ic*0.6,ic*1.8,ic*0.42,2); ctx.fill(); }
  } else if(item.id==='item_obor') {
    ctx.fillStyle='#8B6914'; ctx.fillRect(-3,-ic*0.8,6,ic*1.2);
    for(const [r,c] of [[ic*0.5,'#FF4400'],[ic*0.38,'#FF6600'],[ic*0.25,'#FF9900'],[ic*0.14,'#FFDD00']]) {
      ctx.fillStyle=c; ctx.beginPath(); ctx.ellipse(0,-ic*0.8,r,r*1.4,0,0,Math.PI*2); ctx.fill();
    }
  } else if(item.id==='item_catatan') {
    ctx.fillStyle='#F0E8D0'; roundRect(ctx,-ic*0.7,-ic*0.8,ic*1.4,ic*1.6,3); ctx.fill();
    ctx.strokeStyle='#A09070'; ctx.lineWidth=1;
    for(let i=0;i<4;i++) { ctx.beginPath(); ctx.moveTo(-ic*0.5,-ic*0.5+i*ic*0.4); ctx.lineTo(ic*0.5,-ic*0.5+i*ic*0.4); ctx.stroke(); }
  }
  ctx.restore();

  // Label
  ctx.fillStyle='rgba(10,8,0,0.85)';
  const lw = item.name.length*5.5+10;
  roundRect(ctx,px-lw/2,py+bobY+14,lw,14,3); ctx.fill();
  ctx.fillStyle='#CCAA55'; ctx.font=`${TILE*0.18}px monospace`;
  ctx.textAlign='center'; ctx.textBaseline='middle';
  ctx.fillText(item.name,px,py+bobY+21);
}

function drawExit(ctx, t) {
  const ex = state.exitPos.tx * TILE + TILE/2 - state.camera.x;
  const ey = state.exitPos.ty * TILE + TILE/2 - state.camera.y;
  const pulse = 0.7 + Math.sin(t*0.06)*0.3;

  // Exit glow
  const grd = ctx.createRadialGradient(ex,ey,0,ex,ey,TILE*1.2);
  grd.addColorStop(0,`rgba(255,255,100,${0.35*pulse})`);
  grd.addColorStop(1,'rgba(255,255,0,0)');
  ctx.fillStyle=grd;
  ctx.beginPath(); ctx.arc(ex,ey,TILE*1.2,0,Math.PI*2); ctx.fill();

  // Door
  ctx.fillStyle='#1A3A1A';
  roundRect(ctx,ex-16,ey-TILE*0.7,32,TILE*1.4,4); ctx.fill();
  ctx.strokeStyle=`rgba(170,255,100,${0.6+0.4*pulse})`; ctx.lineWidth=2;
  roundRect(ctx,ex-16,ey-TILE*0.7,32,TILE*1.4,4); ctx.stroke();

  ctx.fillStyle=`rgba(255,255,80,${pulse})`;
  ctx.font=`bold ${TILE*0.25}px monospace`; ctx.textAlign='center'; ctx.textBaseline='middle';
  ctx.fillText('EXIT',ex,ey);
  ctx.font=`${TILE*0.18}px monospace`;
  ctx.fillStyle='#AAFFAA';
  ctx.fillText('Pintu Keluar',ex,ey+TILE*0.55);
}

// ═══════════════════════════════════════════════════════════
// FOG OF WAR
// ═══════════════════════════════════════════════════════════
function drawFog(ctx, px, py, radius) {
  // Mask everything outside radius
  ctx.save();
  ctx.fillStyle='rgba(0,0,0,0.0)'; // transparent fill
  ctx.globalCompositeOperation='source-over';

  // Full dark overlay
  ctx.fillStyle='rgba(0,0,0,1)';
  ctx.fillRect(0,0,CANVAS_W,CANVAS_H);

  // Cut out circle around player (torch effect)
  ctx.globalCompositeOperation='destination-out';
  const grd = ctx.createRadialGradient(px,py,radius*0.2,px,py,radius);
  grd.addColorStop(0,'rgba(0,0,0,1)');
  grd.addColorStop(0.6,'rgba(0,0,0,0.95)');
  grd.addColorStop(0.85,'rgba(0,0,0,0.7)');
  grd.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=grd;
  ctx.beginPath(); ctx.arc(px,py,radius,0,Math.PI*2); ctx.fill();

  ctx.restore();

  // Warm torch color overlay
  ctx.save();
  ctx.globalCompositeOperation='multiply';
  const warmGrd = ctx.createRadialGradient(px,py,0,px,py,radius);
  warmGrd.addColorStop(0,'rgba(220,170,80,0.25)');
  warmGrd.addColorStop(0.5,'rgba(160,100,40,0.15)');
  warmGrd.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=warmGrd;
  ctx.beginPath(); ctx.arc(px,py,radius,0,Math.PI*2); ctx.fill();
  ctx.restore();
}

// ═══════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x+r,y);
  ctx.lineTo(x+w-r,y); ctx.quadraticCurveTo(x+w,y,x+w,y+r);
  ctx.lineTo(x+w,y+h-r); ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
  ctx.lineTo(x+r,y+h); ctx.quadraticCurveTo(x,y+h,x,y+h-r);
  ctx.lineTo(x,y+r); ctx.quadraticCurveTo(x,y,x+r,y);
  ctx.closePath();
}

function isWall(tx, ty) {
  if(tx<0||ty<0||tx>=MAP_W||ty>=MAP_H) return true;
  return MAP_DATA[ty][tx]===T.WALL || MAP_DATA[ty][tx]===T.WALL_MOSS;
}

function isNearby(player, obj, range) {
  const dx = player.x - (obj.x || obj.tx*TILE+TILE/2);
  const dy = player.y - (obj.y || obj.ty*TILE+TILE/2);
  return Math.sqrt(dx*dx+dy*dy) < range;
}

function getArea(tx, ty) {
  if(ty < 8) return tx < 15 ? 'Got Utara Barat' : 'Got Utara Timur';
  if(ty > 15) return tx < 15 ? 'Got Selatan Barat' : 'Got Selatan Timur';
  return tx < 10 ? 'Got Barat' : tx > 19 ? 'Got Timur' : 'Got Tengah';
}

// ═══════════════════════════════════════════════════════════
// CAMERA
// ═══════════════════════════════════════════════════════════
function updateCamera() {
  const targetX = state.player.x - CANVAS_W/2;
  const targetY = state.player.y - CANVAS_H/2;
  const maxX = MAP_W*TILE - CANVAS_W;
  const maxY = MAP_H*TILE - CANVAS_H;
  state.camera.x += (Math.max(0,Math.min(maxX,targetX)) - state.camera.x)*0.12;
  state.camera.y += (Math.max(0,Math.min(maxY,targetY)) - state.camera.y)*0.12;
}

// ═══════════════════════════════════════════════════════════
// MOVEMENT
// ═══════════════════════════════════════════════════════════
function movePlayer() {
  if(state.dialogOpen||state.paused) return;
  const {keys,player} = state;
  let dx=0, dy=0;
  if(keys['ArrowLeft']||keys['a']||keys['A']) { dx=-1; player.dir='left'; }
  if(keys['ArrowRight']||keys['d']||keys['D']) { dx=1; player.dir='right'; }
  if(keys['ArrowUp']||keys['w']||keys['W']) { dy=-1; player.dir='up'; }
  if(keys['ArrowDown']||keys['s']||keys['S']) { dy=1; player.dir='down'; }

  if(dx&&dy) { dx*=0.707; dy*=0.707; }

  const spd = player.speed;
  const nx = player.x + dx*spd;
  const ny = player.y + dy*spd;

  // Collision: check corners of player hitbox
  const hw = TILE*0.28;
  function canMove(x,y) {
    return !isWall(Math.floor((x-hw)/TILE),Math.floor((y-hw)/TILE)) &&
           !isWall(Math.floor((x+hw)/TILE),Math.floor((y-hw)/TILE)) &&
           !isWall(Math.floor((x-hw)/TILE),Math.floor((y+hw)/TILE)) &&
           !isWall(Math.floor((x+hw)/TILE),Math.floor((y+hw)/TILE));
  }

  if(canMove(nx,player.y)) player.x=nx;
  if(canMove(player.x,ny)) player.y=ny;
  player.moving = (dx!==0||dy!==0);
}

// ═══════════════════════════════════════════════════════════
// NPC AI — FSM
// ═══════════════════════════════════════════════════════════
function updateNPCs(t) {
  state.npcs.forEach(npc => {
    // Wandering movement
    if(npc.state==='WANDERING' || npc.wanderRange>0 && npc.state!=='PATROL' && npc.state!=='ALERT') {
      npc.wanderTimer = (npc.wanderTimer||0)+1;
      if(npc.wanderTimer > 90) {
        npc.wanderTimer=0;
        const dirs=[{dx:0,dy:0},{dx:0,dy:0},{dx:TILE,dy:0},{dx:-TILE,dy:0},{dx:0,dy:TILE},{dx:0,dy:-TILE}];
        const d=dirs[Math.floor(Math.random()*dirs.length)];
        const nx=(npc.x||npc.tx*TILE+TILE/2)+d.dx;
        const ny=(npc.y||npc.ty*TILE+TILE/2)+d.dy;
        const ntx=Math.floor(nx/TILE), nty=Math.floor(ny/TILE);
        const originTx=npc.originTx||npc.tx, originTy=npc.originTy||npc.ty;
        if(!isWall(ntx,nty) &&
           Math.abs(ntx-originTx)<=npc.wanderRange &&
           Math.abs(nty-originTy)<=npc.wanderRange) {
          npc.x=nx; npc.y=ny;
        }
      }
    }

    // Patrol movement
    if(npc.state==='PATROL'||npc.state==='ALERT') {
      npc.patrolTimer=(npc.patrolTimer||0)+1;
      if(npc.patrolTimer>50) {
        npc.patrolTimer=0;
        if(npc.state==='ALERT') {
          // move toward player
          const dx=state.player.x-npc.x, dy=state.player.y-npc.y;
          const dist=Math.sqrt(dx*dx+dy*dy);
          if(dist>TILE*0.5) { npc.x+=dx/dist*TILE*0.5; npc.y+=dy/dist*TILE*0.5; }
          if(dist>TILE*5) { npc.state='PATROL'; } // lost player
          // caught!
          if(dist<TILE*0.8) { gameOver('Kamu tertangkap Petugas Got!'); }
        } else {
          npc.patrolIdx=(npc.patrolIdx+1)%npc.patrolPath.length;
          const target=npc.patrolPath[npc.patrolIdx];
          npc.x=target.tx*TILE+TILE/2; npc.y=target.ty*TILE+TILE/2;
        }
      }
      // Detection radius
      const dx=state.player.x-npc.x, dy=state.player.y-npc.y;
      const dist=Math.sqrt(dx*dx+dy*dy);
      if(dist<TILE*2.5 && npc.id==='petugas_got') {
        if(npc.state==='PATROL') { npc.state='ALERT'; showNotif('','Kamu terdeteksi Petugas!','Segera bersembunyi!'); }
      }
    }
  });
}

// ═══════════════════════════════════════════════════════════
// INTERACTIONS
// ═══════════════════════════════════════════════════════════
function interact() {
  if(state.dialogOpen||state.paused) return;

  // Check NPC nearby
  for(const npc of state.npcs) {
    if(isNearby(state.player, npc, TILE*2.2)) {
      openDialog(npc);
      return;
    }
  }

  // Check item nearby
  for(const item of state.itemPositions) {
    if(!item.collected && isNearby(state.player,
      {x:item.tx*TILE+TILE/2, y:item.ty*TILE+TILE/2}, TILE*1.5)) {
      collectItem(item);
      return;
    }
  }

  // Check exit
  if(isNearby(state.player,
    {x:state.exitPos.tx*TILE+TILE/2, y:state.exitPos.ty*TILE+TILE/2}, TILE*1.8)) {
    if(state.inventory.includes('item_kunci')) {
      winGame();
    } else {
      showNotif('','Pintu terkunci!','Kamu perlu kunci untuk membuka lorong keluar.');
    }
  }
}

function collectItem(item) {
  item.collected=true;
  state.inventory.push(item.id);
  updateInventoryUI();
  showNotif(item.id, 'Item Ditemukan!', item.name);
}

function openDialog(npc) {
  state.currentNPC=npc;
  const dialogState = npc.state==='PATROL'||npc.state==='ALERT' ? 'BLOCK' : npc.state;
  const dialog = npc.dialogs[dialogState] || npc.dialogs[Object.keys(npc.dialogs)[0]];
  showDialog(npc, dialog);
}

function showDialog(npc, dialog) {
  if(!dialog) return;
  state.dialogOpen=true;
  document.getElementById('dialogBox').style.display='block';
  document.getElementById('dialogNameText').textContent=npc.name;
  document.getElementById('dialogText').textContent='"'+dialog.text+'"';

  const choicesEl=document.getElementById('dialogChoices');
  choicesEl.innerHTML='';
  dialog.choices.forEach(ch => {
    const btn=document.createElement('button');
    btn.className='dialogChoice'+(ch.close&&ch.text!==dialog.choices[0]?.text?' neutral':'');
    btn.textContent=ch.text;
    btn.onclick=()=>handleChoice(npc,ch);
    choicesEl.appendChild(btn);
  });
}

function handleChoice(npc, choice) {
  // Condition check
  if(choice.condition && !state.inventory.includes(choice.condition)) {
    showNotif('','Kamu belum punya '+choice.condition.replace('item_','').replace(/_/g,' ')+'!','Cari dulu di got.');
    return;
  }

  // Give item
  if(choice.giveItem) {
    state.inventory.push(choice.giveItem);
    updateInventoryUI();
    const inames={'item_peta':'Peta Sebagian Got','item_kunci':'Kunci Lorong','item_catatan':'Catatan Kiki'};
    showNotif(choice.giveItem,'Item Diterima!', inames[choice.giveItem]||choice.giveItem);
  }

  // Take item
  if(choice.takesItem) {
    state.inventory=state.inventory.filter(i=>i!==choice.takesItem);
    updateInventoryUI();
  }

  // Set FSM state
  if(choice.setState) { npc.state=choice.setState; }

  // Next dialog step or close
  if(choice.close) {
    closeDialog();
  } else if(choice.next) {
    const nextDialog=npc.dialogs[choice.next];
    if(nextDialog) showDialog(npc,nextDialog);
    else closeDialog();
  }
}

function closeDialog() {
  state.dialogOpen=false;
  document.getElementById('dialogBox').style.display='none';
  state.currentNPC=null;
}

// ═══════════════════════════════════════════════════════════
// UI UPDATES
// ═══════════════════════════════════════════════════════════
function updateInventoryUI() {
  const slotsEl=document.getElementById('invSlots');
  slotsEl.innerHTML='';
  const allItems=[
    {id:'item_peta',name:'PETA'},
    {id:'item_kunci',name:'KUNCI'},
    {id:'item_makanan',name:'MAKANAN'},
    {id:'item_papan_kayu',name:'PAPAN'},
    {id:'item_obor',name:'OBOR'},
    {id:'item_catatan',name:'CATATAN'},
  ];
  allItems.forEach(item=>{
    const slot=document.createElement('div');
    slot.className='invSlot'+(state.inventory.includes(item.id)?' has':'');
    slot.textContent=state.inventory.includes(item.id)?item.name:'...';
    slot.title=item.name;
    slotsEl.appendChild(slot);
  });
}

let notifAnimTimeout=null;
function showNotif(imgKey, title, subtitle) {
  const el=document.getElementById('notif');
  document.getElementById('notifText').textContent=title;
  document.getElementById('notifSub').textContent=subtitle;
  el.style.display='flex';
  el.style.opacity='1';
  if(notifAnimTimeout) clearTimeout(notifAnimTimeout);
  notifAnimTimeout=setTimeout(()=>{
    el.style.transition='opacity 0.5s';
    el.style.opacity='0';
    setTimeout(()=>{el.style.display='none';el.style.opacity='1';el.style.transition='';},500);
  },2800);
}

function updateHUD() {
  const {hours,minutes,seconds} = state.timer;
  const str=`Sisa Waktu: ${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;
  const timerEl=document.getElementById('hudTimer');
  timerEl.textContent=str;
  timerEl.className=hours===0&&minutes<30?'urgent':'';
  const ptx=Math.floor(state.player.x/TILE), pty=Math.floor(state.player.y/TILE);
  document.getElementById('hudArea').textContent=getArea(ptx,pty);
}

// ═══════════════════════════════════════════════════════════
// MINIMAP
// ═══════════════════════════════════════════════════════════
function drawMinimap() {
  mmCtx.fillStyle='#080808'; mmCtx.fillRect(0,0,130,130);
  const scale=130/MAP_W;
  for(let y=0;y<MAP_H;y++) {
    for(let x=0;x<MAP_W;x++) {
      const t=MAP_DATA[y][x];
      let c='#111';
      if(t===T.FLOOR) c='#1A2A1A';
      else if(t===T.WALL||t===T.WALL_MOSS) c='#2A1F0F';
      else if(t===T.PUDDLE) c='#0A1E30';
      mmCtx.fillStyle=c;
      mmCtx.fillRect(x*scale,y*(130/MAP_H),scale,130/MAP_H);
    }
  }
  // Exit
  const es=130/MAP_W;
  mmCtx.fillStyle='rgba(255,255,80,0.8)';
  mmCtx.fillRect(state.exitPos.tx*es,(state.exitPos.ty*(130/MAP_H)),es,130/MAP_H);

  // NPCs
  state.npcs.forEach(npc=>{
    const nx=npc.x/TILE*(130/MAP_W), ny=npc.y/TILE*(130/MAP_H);
    mmCtx.fillStyle=npc.id==='petugas_got'||npc.id==='blirik'?'#FF4444':'#AAFFAA';
    mmCtx.beginPath(); mmCtx.arc(nx,ny,2.5,0,Math.PI*2); mmCtx.fill();
  });

  // Player
  const ppx=state.player.x/TILE*(130/MAP_W), ppy=state.player.y/TILE*(130/MAP_H);
  mmCtx.fillStyle='#FFD700';
  mmCtx.beginPath(); mmCtx.arc(ppx,ppy,3.5,0,Math.PI*2); mmCtx.fill();

  // Camera viewport rect
  mmCtx.strokeStyle='rgba(255,255,255,0.2)'; mmCtx.lineWidth=1;
  mmCtx.strokeRect(
    state.camera.x/TILE*(130/MAP_W),
    state.camera.y/TILE*(130/MAP_H),
    (CANVAS_W/TILE)*(130/MAP_W),
    (CANVAS_H/TILE)*(130/MAP_H)
  );

  mmCtx.fillStyle='#333'; mmCtx.fillRect(0,0,130,14);
  mmCtx.fillStyle='#555'; mmCtx.font='8px monospace'; mmCtx.textAlign='center';
  mmCtx.fillText('PETA',65,10);
}

// ═══════════════════════════════════════════════════════════
// TRAP CHECK
// ═══════════════════════════════════════════════════════════
function checkTraps() {
  for(const trap of state.trapPositions) {
    const px=trap.tx*TILE+TILE/2, py=trap.ty*TILE+TILE/2;
    const dx=state.player.x-px, dy=state.player.y-py;
    if(Math.sqrt(dx*dx+dy*dy)<TILE*0.5) {
      gameOver('Kamu terkena perangkap tikus!');
      return;
    }
  }
}

// ═══════════════════════════════════════════════════════════
// GAME OVER / WIN
// ═══════════════════════════════════════════════════════════
function gameOver(reason) {
  state.gameRunning=false;
  clearInterval(state.timerInterval);
  showOverlay('GAME OVER', reason, [
    {text:'Main Lagi', cls:'', action:resetGame},
  ]);
}

function winGame() {
  state.gameRunning=false;
  clearInterval(state.timerInterval);
  showOverlay('SELAMAT!', 'Si Tikus berhasil kabur dari got! Kebebasan menanti!', [
    {text:'Main Lagi', cls:'', action:resetGame},
  ]);
}

function showOverlay(title, subtitle, btns) {
  const el=document.getElementById('overlay');
  document.getElementById('overlayTitle').textContent=title;
  document.getElementById('overlaySubtitle').textContent=subtitle;
  const btnsEl=document.getElementById('overlayBtns');
  btnsEl.innerHTML='';
  btns.forEach(b=>{
    const btn=document.createElement('button');
    btn.className='overlayBtn '+(b.cls||'');
    btn.textContent=b.text;
    btn.onclick=b.action;
    btnsEl.appendChild(btn);
  });
  el.style.display='flex';
}

function hideOverlay() {
  document.getElementById('overlay').style.display='none';
}

function pauseGame() {
  if(!state.gameRunning) return;
  state.paused=!state.paused;
  if(state.paused) {
    clearInterval(state.timerInterval);
    showOverlay('PAUSE','', [
      {text:'Lanjutkan', cls:'', action:()=>{
        state.paused=false; hideOverlay(); startTimer();
      }},
      {text:'Mulai Ulang', cls:'red', action:resetGame},
    ]);
  }
}

// ═══════════════════════════════════════════════════════════
// TIMER
// ═══════════════════════════════════════════════════════════
function startTimer() {
  state.timerInterval=setInterval(()=>{
    if(!state.gameRunning||state.paused) return;
    state.timer.seconds--;
    if(state.timer.seconds<0) { state.timer.seconds=59; state.timer.minutes--; }
    if(state.timer.minutes<0) { state.timer.minutes=59; state.timer.hours--; }
    if(state.timer.hours<0) gameOver('Waktu habis! Petugas Got telah membersihkan got.');
    updateHUD();
  },1000);
}

// ═══════════════════════════════════════════════════════════
// INIT & RESET
// ═══════════════════════════════════════════════════════════
function initNPCs() {
  state.npcs=NPC_DEFS.map(def=>({
    ...def,
    x: def.tx*TILE+TILE/2,
    y: def.ty*TILE+TILE/2,
    originTx: def.tx,
    originTy: def.ty,
    patrolPath: def.patrolPath ? def.patrolPath.map(p=>({...p})) : undefined,
  }));
}

function resetGame() {
  hideOverlay();
  closeDialog();
  state.player.x=14*TILE; state.player.y=11*TILE;
  state.player.dir='down'; state.player.moving=false;
  state.inventory=[];
  state.timer={hours:23,minutes:59,seconds:59,total:23*3600+59*60+59};
  state.gameRunning=true;
  state.paused=false;
  state.itemPositions.forEach(i=>i.collected=false);
  initNPCs();
  updateInventoryUI();
  updateHUD();
  clearInterval(state.timerInterval);
  startTimer();
}

// ═══════════════════════════════════════════════════════════
// MAIN RENDER LOOP
// ═══════════════════════════════════════════════════════════
let tick=0;
function render() {
  requestAnimationFrame(render);
  tick++;

  if(!state.gameRunning&&!state.paused) return;

  movePlayer();
  updateCamera();
  updateNPCs(tick);
  checkTraps();

  // Clear
  ctx.fillStyle='#050505';
  ctx.fillRect(0,0,CANVAS_W,CANVAS_H);

  // Draw world
  const startTX=Math.max(0,Math.floor(state.camera.x/TILE)-1);
  const endTX=Math.min(MAP_W,Math.ceil((state.camera.x+CANVAS_W)/TILE)+1);
  const startTY=Math.max(0,Math.floor(state.camera.y/TILE)-1);
  const endTY=Math.min(MAP_H,Math.ceil((state.camera.y+CANVAS_H)/TILE)+1);

  for(let ty=startTY;ty<endTY;ty++) {
    for(let tx=startTX;tx<endTX;tx++) {
      const px=tx*TILE-state.camera.x;
      const py=ty*TILE-state.camera.y;
      drawTile(ctx,MAP_DATA[ty][tx],px,py);
    }
  }

  // Draw exit
  drawExit(ctx,tick);

  // Draw traps
  for(const trap of state.trapPositions) {
    const px=trap.tx*TILE+TILE/2-state.camera.x;
    const py=trap.ty*TILE+TILE/2-state.camera.y;
    drawTrap(ctx,px,py);
  }

  // Draw items
  for(const item of state.itemPositions) {
    drawItem(ctx,item,tick);
  }

  // Draw NPCs
  for(const npc of state.npcs) {
    drawNPC(ctx,npc,state.camera.x,state.camera.y,tick);
  }

  // Draw player
  const ppx=state.player.x-state.camera.x;
  const ppy=state.player.y-state.camera.y;
  drawPlayer(ctx,ppx,ppy,state.player.dir,state.player.moving,tick);

  // Fog of war
  const fogCanvas=document.createElement('canvas');
  fogCanvas.width=CANVAS_W; fogCanvas.height=CANVAS_H;
  const fogCtx=fogCanvas.getContext('2d');
  drawFog(fogCtx,ppx,ppy,TILE*4.5);
  ctx.drawImage(fogCanvas,0,0);

  // Minimap
  drawMinimap();
}

// ═══════════════════════════════════════════════════════════
// INPUT
// ═══════════════════════════════════════════════════════════
document.addEventListener('keydown',e=>{
  state.keys[e.key]=true;
  if(e.key==='e'||e.key==='E') { e.preventDefault(); interact(); }
  if(e.key==='Escape') { e.preventDefault(); if(state.dialogOpen) closeDialog(); else pauseGame(); }
  if(e.key==='i'||e.key==='I') { /* could show full inventory */ }
  if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key)) e.preventDefault();
});
document.addEventListener('keyup',e=>{ delete state.keys[e.key]; });

// Touch / click on canvas for mobile
canvas.addEventListener('click',e=>{
  const rect=canvas.getBoundingClientRect();
  const scaleX=CANVAS_W/rect.width, scaleY=CANVAS_H/rect.height;
  const cx=(e.clientX-rect.left)*scaleX, cy=(e.clientY-rect.top)*scaleY;
  // If near an NPC, interact
  interact();
});

// ═══════════════════════════════════════════════════════════
// SPLASH SCREEN
// ═══════════════════════════════════════════════════════════
function showSplash() {
  showOverlay('TIKUS DI GOT', 'Top-Down Adventure | Kabur sebelum got dibersihkan!', [
    {text:'Mulai Bermain!', cls:'', action:()=>{ resetGame(); }},
  ]);
  // Draw title screen on canvas
  ctx.fillStyle='#050505'; ctx.fillRect(0,0,CANVAS_W,CANVAS_H);
  // Draw some tiles as preview
  for(let ty=0;ty<MAP_H;ty++) for(let tx=0;tx<MAP_W;tx++) {
    drawTile(ctx,MAP_DATA[ty][tx],tx*TILE-6*TILE,ty*TILE-5*TILE);
  }
  // Dark overlay
  ctx.fillStyle='rgba(0,0,0,0.7)'; ctx.fillRect(0,0,CANVAS_W,CANVAS_H);
}

// ═══════════════════════════════════════════════════════════
// START
// ═══════════════════════════════════════════════════════════
initNPCs();
updateInventoryUI();
updateHUD();
showSplash();
render();