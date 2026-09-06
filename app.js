
const STORAGE_KEY = "workout-tracker-v1";

const seed = {
  currentBlock: {
    id: "block-1",
    name: "Full Body — Block 1",
    workouts: [
      {
        id: "A", name: "Workout A",
        exercises: [
          { id:"hack-squat", name:"Hack Squat", sets:3, minReps:6, maxReps:8, increment:10, setupNote:"Record foot position and machine setting here." },
          { id:"incline-db", name:"Incline Dumbbell Press", sets:3, minReps:8, maxReps:10, increment:5, setupNote:"Record bench angle here." },
          { id:"chest-row", name:"Chest-Supported Row", sets:3, minReps:8, maxReps:10, increment:5, setupNote:"Record seat/chest pad and grip here." },
          { id:"leg-curl", name:"Seated Leg Curl", sets:3, minReps:10, maxReps:12, increment:5, setupNote:"Record seat/back-pad setting here." },
          { id:"lateral-raise", name:"Lateral Raise", sets:3, minReps:12, maxReps:15, increment:5, setupNote:"Record cable/DB setup here." },
          { id:"curl", name:"Dumbbell Curl", sets:2, minReps:8, maxReps:12, increment:5, setupNote:"Record grip or bench setup here." }
        ]
      },
      {
        id: "B", name: "Workout B",
        exercises: [
          { id:"leg-press", name:"Leg Press", sets:3, minReps:8, maxReps:10, increment:10, setupNote:"Record seat and foot placement here." },
          { id:"machine-press", name:"Machine Chest Press", sets:3, minReps:8, maxReps:12, increment:5, setupNote:"Record seat position and handle choice here." },
          { id:"pulldown", name:"Lat Pulldown", sets:3, minReps:8, maxReps:12, increment:5, setupNote:"Record seat, thigh pad, grip/handle here." },
          { id:"split-squat", name:"Split Squat", sets:3, minReps:8, maxReps:10, increment:5, setupNote:"Record stance and support setup here." },
          { id:"triceps", name:"Cable Triceps Pressdown", sets:2, minReps:10, maxReps:15, increment:5, setupNote:"Record rope/bar choice here." },
          { id:"calf", name:"Calf Raise", sets:3, minReps:10, maxReps:15, increment:10, setupNote:"Record machine setup here." }
        ]
      },
      {
        id: "C", name: "Workout C",
        exercises: [
          { id:"goblet", name:"Goblet Squat", sets:3, minReps:8, maxReps:12, increment:5, setupNote:"Record heel elevation/stance here." },
          { id:"shoulder-press", name:"Machine Shoulder Press", sets:3, minReps:8, maxReps:10, increment:5, setupNote:"Record seat and grip here." },
          { id:"cable-row", name:"Cable Row", sets:3, minReps:8, maxReps:12, increment:5, setupNote:"Record handle and torso position here." },
          { id:"hip-hinge", name:"45° Back Extension", sets:3, minReps:10, maxReps:15, increment:5, setupNote:"Record pad height and loading style here." },
          { id:"rear-delt", name:"Rear Delt Fly", sets:3, minReps:12, maxReps:15, increment:5, setupNote:"Record seat/handle setup here." },
          { id:"hammer-curl", name:"Hammer Curl", sets:2, minReps:8, maxReps:12, increment:5, setupNote:"Record grip variation here." }
        ]
      }
    ]
  },
  completedWorkouts: [],
  nextWorkoutId: "A",
  activeWorkout: null,
  settings: { defaultRestSeconds: 90 },
  homeGenerator: {
    location: "garage",
    duration: 30,
    style: "mixed",
    equipment: {
      garage: ["bodyweight"],
      basement: ["bodyweight"]
    },
    generated: null
  }
};

let state = loadState();
if(!state.settings) state.settings = { defaultRestSeconds: 90 };
if(!state.settings.defaultRestSeconds) state.settings.defaultRestSeconds = 90;
if(!state.homeGenerator){
  state.homeGenerator = {
    location: "garage",
    duration: 30,
    style: "mixed",
    equipment: { garage:["bodyweight"], basement:["bodyweight"] },
    generated: null
  };
}
if(!state.homeGenerator.equipment) state.homeGenerator.equipment = {garage:["bodyweight"], basement:["bodyweight"]};
if(!state.homeGenerator.equipment.garage) state.homeGenerator.equipment.garage = ["bodyweight"];
if(!state.homeGenerator.equipment.basement) state.homeGenerator.equipment.basement = ["bodyweight"];
save();
let view = "home";
let modal = null;
let timer = {
  selectedSeconds: state.settings.defaultRestSeconds,
  remaining: state.settings.defaultRestSeconds,
  running: false,
  endAt: null,
  intervalId: null,
  alertFired: false
};
let audioContext = null;

const HOME_EQUIPMENT = [
  ["bodyweight","Bodyweight"],
  ["dumbbells","Dumbbells"],
  ["bench","Bench"],
  ["bands","Resistance bands"],
  ["pullup","Pull-up bar"],
  ["kettlebell","Kettlebell"],
  ["barbell","Barbell"],
  ["rack","Rack / squat stands"],
  ["cable","Cable / pulley"],
  ["box","Box / step"],
  ["cardio","Bike / treadmill / rower"]
];

const HOME_EXERCISES = [
  {name:"Push-Up", eq:["bodyweight"], pattern:"push", modes:["strength","mixed","conditioning"], reps:"8–15"},
  {name:"Feet-Elevated Push-Up", eq:["bodyweight","bench"], pattern:"push", modes:["strength","mixed"], reps:"6–12"},
  {name:"Dumbbell Floor Press", eq:["dumbbells"], pattern:"push", modes:["strength","mixed"], reps:"8–12"},
  {name:"Dumbbell Bench Press", eq:["dumbbells","bench"], pattern:"push", modes:["strength","mixed"], reps:"8–12"},
  {name:"Dumbbell Shoulder Press", eq:["dumbbells"], pattern:"push", modes:["strength","mixed"], reps:"8–12"},
  {name:"Band Chest Press", eq:["bands"], pattern:"push", modes:["strength","mixed"], reps:"10–15"},

  {name:"One-Arm Dumbbell Row", eq:["dumbbells"], pattern:"pull", modes:["strength","mixed"], reps:"8–12/side"},
  {name:"Bench-Supported Dumbbell Row", eq:["dumbbells","bench"], pattern:"pull", modes:["strength","mixed"], reps:"8–12"},
  {name:"Pull-Up / Assisted Pull-Up", eq:["pullup"], pattern:"pull", modes:["strength","mixed"], reps:"5–10"},
  {name:"Band Row", eq:["bands"], pattern:"pull", modes:["strength","mixed","conditioning"], reps:"10–15"},
  {name:"Cable Row", eq:["cable"], pattern:"pull", modes:["strength","mixed"], reps:"8–12"},

  {name:"Goblet Squat", eq:["dumbbells"], pattern:"squat", modes:["strength","mixed"], reps:"8–15"},
  {name:"Kettlebell Goblet Squat", eq:["kettlebell"], pattern:"squat", modes:["strength","mixed"], reps:"8–15"},
  {name:"Bodyweight Squat", eq:["bodyweight"], pattern:"squat", modes:["mixed","conditioning"], reps:"15–25"},
  {name:"Split Squat", eq:["bodyweight"], pattern:"squat", modes:["strength","mixed"], reps:"8–12/side"},
  {name:"Rear-Foot-Elevated Split Squat", eq:["bodyweight","bench"], pattern:"squat", modes:["strength","mixed"], reps:"8–12/side"},
  {name:"Barbell Back Squat", eq:["barbell","rack"], pattern:"squat", modes:["strength"], reps:"5–8"},

  {name:"Dumbbell Romanian Deadlift", eq:["dumbbells"], pattern:"hinge", modes:["strength","mixed"], reps:"8–12"},
  {name:"Kettlebell Romanian Deadlift", eq:["kettlebell"], pattern:"hinge", modes:["strength","mixed"], reps:"8–12"},
  {name:"Barbell Romanian Deadlift", eq:["barbell"], pattern:"hinge", modes:["strength"], reps:"6–10"},
  {name:"Glute Bridge", eq:["bodyweight"], pattern:"hinge", modes:["strength","mixed","conditioning"], reps:"12–20"},
  {name:"Kettlebell Swing", eq:["kettlebell"], pattern:"hinge", modes:["mixed","conditioning"], reps:"15–20"},

  {name:"Dumbbell Curl", eq:["dumbbells"], pattern:"arms", modes:["strength","mixed"], reps:"10–15"},
  {name:"Band Curl", eq:["bands"], pattern:"arms", modes:["strength","mixed"], reps:"12–20"},
  {name:"Dumbbell Overhead Triceps Extension", eq:["dumbbells"], pattern:"arms", modes:["strength","mixed"], reps:"10–15"},
  {name:"Band Pressdown", eq:["bands"], pattern:"arms", modes:["strength","mixed"], reps:"12–20"},
  {name:"Dumbbell Lateral Raise", eq:["dumbbells"], pattern:"accessory", modes:["strength","mixed"], reps:"12–20"},

  {name:"Plank", eq:["bodyweight"], pattern:"core", modes:["strength","mixed","conditioning"], reps:"30–60 sec"},
  {name:"Dead Bug", eq:["bodyweight"], pattern:"core", modes:["strength","mixed"], reps:"8–12/side"},
  {name:"Mountain Climber", eq:["bodyweight"], pattern:"core", modes:["conditioning","mixed"], reps:"30–45 sec"},
  {name:"Suitcase Carry", eq:["dumbbells"], pattern:"core", modes:["strength","mixed"], reps:"30–45 sec/side"},
  {name:"Kettlebell Suitcase Carry", eq:["kettlebell"], pattern:"core", modes:["strength","mixed"], reps:"30–45 sec/side"},

  {name:"Step-Up", eq:["bodyweight","box"], pattern:"conditioning", modes:["conditioning","mixed"], reps:"10–15/side"},
  {name:"Fast Bodyweight Squat", eq:["bodyweight"], pattern:"conditioning", modes:["conditioning"], reps:"30–40 sec"},
  {name:"Reverse Lunge", eq:["bodyweight"], pattern:"conditioning", modes:["conditioning","mixed"], reps:"10–12/side"},
  {name:"Low-Impact Burpee", eq:["bodyweight"], pattern:"conditioning", modes:["conditioning"], reps:"30–40 sec"},
  {name:"Cardio Machine Push", eq:["cardio"], pattern:"conditioning", modes:["conditioning","mixed"], reps:"60–90 sec"}
];

function loadState(){
  const raw = localStorage.getItem(STORAGE_KEY);
  if(!raw) return structuredClone(seed);
  try { return JSON.parse(raw); } catch { return structuredClone(seed); }
}
function save(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }

function workoutById(id){ return state.currentBlock.workouts.find(w => w.id === id); }
function allHistoryForExercise(exId){
  return state.completedWorkouts
    .flatMap(w => w.exercises.map(e => ({...e, date:w.date, workoutName:w.workoutName})))
    .filter(e => e.exerciseId === exId)
    .sort((a,b)=> new Date(b.date)-new Date(a.date));
}
function lastHistory(exId){ return allHistoryForExercise(exId)[0] || null; }
function fmtSets(hist){
  if(!hist) return "No history yet";
  return hist.sets.filter(s => s.done).map(s => `${s.weight || "—"} × ${s.reps || "—"}`).join(" · ") || "No completed sets";
}
function suggestedWeight(ex){
  const hist = lastHistory(ex.id);
  if(!hist) return "";
  const done = hist.sets.filter(s=>s.done);
  if(done.length !== ex.sets) return done[0]?.weight || "";
  const allAtTop = done.every(s => Number(s.reps) >= ex.maxReps);
  const base = Number(done[0]?.weight || 0);
  if(!base) return "";
  return allAtTop ? base + Number(ex.increment || 0) : base;
}
function nextAfter(id){
  const arr = state.currentBlock.workouts;
  const ix = arr.findIndex(w=>w.id===id);
  return arr[(ix+1)%arr.length].id;
}

function startWorkout(id){
  const w = workoutById(id);
  state.activeWorkout = {
    workoutId:id,
    workoutName:w.name,
    startedAt:new Date().toISOString(),
    exercises:w.exercises.map(ex => {
      const sug = suggestedWeight(ex);
      return {
        exerciseId:ex.id, name:ex.name,
        setupNote:ex.setupNote || "",
        sessionNote:"",
        suggestedWeight:sug,
        sets:Array.from({length:ex.sets}, (_,i)=>({index:i+1, weight:"", reps:"", done:false}))
      }
    })
  };
  save(); view="workout"; render();
}
function updateSet(exId, idx, key, value){
  const ex = state.activeWorkout.exercises.find(e=>e.exerciseId===exId);
  ex.sets[idx][key]=value; save();
}
function toggleDone(exId, idx){
  const ex = state.activeWorkout.exercises.find(e=>e.exerciseId===exId);
  const becomingDone = !ex.sets[idx].done;
  ex.sets[idx].done = becomingDone;
  save();
  render();
  if(becomingDone){
    initAudio();
    startTimer(state.settings.defaultRestSeconds);
  }
}
function useSuggestion(exId){
  const ex = state.activeWorkout.exercises.find(e=>e.exerciseId===exId);
  if(!ex.suggestedWeight) return;
  ex.sets.forEach(s => { if(!s.weight) s.weight=String(ex.suggestedWeight); });
  save(); render();
}
function updateActiveNote(exId, key, value){
  const ex = state.activeWorkout.exercises.find(e=>e.exerciseId===exId);
  ex[key]=value;
  const programEx = state.currentBlock.workouts.flatMap(w=>w.exercises).find(x=>x.id===exId);
  if(key==="setupNote" && programEx) programEx.setupNote=value;
  save();
}
function finishWorkout(){
  const a = state.activeWorkout;
  if(!a) return;
  state.completedWorkouts.push({
    id:crypto.randomUUID(),
    workoutId:a.workoutId,
    workoutName:a.workoutName,
    date:new Date().toISOString(),
    exercises:a.exercises
  });
  state.nextWorkoutId = nextAfter(a.workoutId);
  state.activeWorkout = null;
  stopTimer(false);
  save(); view="home"; modal={type:"complete", workoutName:a.workoutName}; render();
}
function cancelWorkout(){
  if(confirm("Discard this active workout?")){
    state.activeWorkout=null; save(); view="home"; render();
  }
}
function nav(v){ view=v; modal=null; render(); updateTimerDisplays(); }

function homeEquipmentAvailable(ex, selected){
  return ex.eq.every(req => selected.includes(req));
}
function shuffle(arr){
  const copy = [...arr];
  for(let i=copy.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [copy[i],copy[j]] = [copy[j],copy[i]];
  }
  return copy;
}
function pickExercise(pool, pattern, used){
  const choices = shuffle(pool.filter(e=>e.pattern===pattern && !used.has(e.name)));
  if(!choices.length) return null;
  const picked = choices[0];
  used.add(picked.name);
  return picked;
}
function buildHomeWorkout(){
  const g = state.homeGenerator;
  const selected = g.equipment[g.location] || [];
  const pool = HOME_EXERCISES.filter(ex =>
    ex.modes.includes(g.style) &&
    homeEquipmentAvailable(ex, selected)
  );

  if(pool.length < 3){
    alert("Select a little more equipment for this location, or include Bodyweight.");
    return;
  }

  const used = new Set();
  let chosen = [];
  if(g.style === "strength"){
    ["squat","hinge","push","pull","core"].forEach(p=>{
      const ex = pickExercise(pool,p,used); if(ex) chosen.push(ex);
    });
    if(g.duration >= 45){
      const extra = pickExercise(pool,"arms",used) || pickExercise(pool,"accessory",used);
      if(extra) chosen.push(extra);
    }
  } else if(g.style === "conditioning"){
    ["conditioning","squat","push","hinge","core","conditioning"].forEach(p=>{
      const ex = pickExercise(pool,p,used); if(ex) chosen.push(ex);
    });
    if(chosen.length < 5){
      chosen = shuffle(pool).slice(0,Math.min(6,pool.length));
    }
  } else {
    ["squat","push","pull","hinge","core"].forEach(p=>{
      const ex = pickExercise(pool,p,used); if(ex) chosen.push(ex);
    });
    const finisher = pickExercise(pool,"conditioning",used);
    if(finisher) chosen.push(finisher);
  }

  const targetCount = g.duration===20 ? 4 : (g.duration===30 ? 5 : 6);
  if(chosen.length > targetCount) chosen = chosen.slice(0,targetCount);
  while(chosen.length < targetCount){
    const extra = shuffle(pool.filter(e=>!used.has(e.name)))[0];
    if(!extra) break;
    used.add(extra.name); chosen.push(extra);
  }

  const rounds = g.duration===20 ? 2 : 3;
  const plan = chosen.map((ex,idx)=>{
    let prescription;
    if(g.style==="conditioning"){
      prescription = `${rounds} rounds · ${ex.reps}`;
    } else if(g.style==="mixed" && idx===chosen.length-1 && ex.pattern==="conditioning"){
      prescription = `Finisher · 4 rounds · ${ex.reps}`;
    } else {
      prescription = `${rounds} sets · ${ex.reps}`;
    }
    return {name:ex.name, pattern:ex.pattern, prescription};
  });

  g.generated = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    location:g.location,
    duration:g.duration,
    style:g.style,
    exercises:plan
  };
  save(); render();
}
function setHomeLocation(loc){
  state.homeGenerator.location = loc; save(); render();
}
function setHomeDuration(min){
  state.homeGenerator.duration = Number(min); save(); render();
}
function setHomeStyle(style){
  state.homeGenerator.style = style; save(); render();
}
function toggleHomeEquipment(location, key){
  const list = state.homeGenerator.equipment[location] || [];
  const ix = list.indexOf(key);
  if(ix>=0) list.splice(ix,1); else list.push(key);
  state.homeGenerator.equipment[location] = list;
  state.homeGenerator.generated = null;
  save(); render();
}
function clearGeneratedHomeWorkout(){
  state.homeGenerator.generated = null; save(); render();
}

function formatTime(sec){
  const safe = Math.max(0, Math.round(Number(sec) || 0));
  const m = Math.floor(safe / 60);
  const ss = safe % 60;
  return `${String(m).padStart(2,"0")}:${String(ss).padStart(2,"0")}`;
}
function initAudio(){
  try {
    if(!audioContext){
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if(Ctx) audioContext = new Ctx();
    }
    if(audioContext?.state === "suspended") audioContext.resume();
  } catch {}
}
function timerAlert(){
  try {
    initAudio();
    if(audioContext){
      [0,0.18,0.36].forEach(delay=>{
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.frequency.value = 880;
        gain.gain.setValueAtTime(0.0001, audioContext.currentTime + delay);
        gain.gain.exponentialRampToValueAtTime(0.16, audioContext.currentTime + delay + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + delay + 0.12);
        osc.connect(gain); gain.connect(audioContext.destination);
        osc.start(audioContext.currentTime + delay);
        osc.stop(audioContext.currentTime + delay + 0.14);
      });
    }
  } catch {}
  try { if(navigator.vibrate) navigator.vibrate([180,100,180,100,260]); } catch {}
}
function ensureTimerTicker(){
  if(timer.intervalId) return;
  timer.intervalId = setInterval(()=>{
    if(!timer.running) return;
    timer.remaining = Math.max(0, Math.ceil((timer.endAt - Date.now()) / 1000));
    if(timer.remaining <= 0){
      timer.running = false;
      if(!timer.alertFired){ timer.alertFired = true; timerAlert(); }
    }
    updateTimerDisplays();
  }, 250);
}
function startTimer(seconds){
  const secs = Math.max(1, Number(seconds || timer.selectedSeconds || 90));
  timer.selectedSeconds = secs;
  timer.remaining = secs;
  timer.endAt = Date.now() + secs * 1000;
  timer.running = true;
  timer.alertFired = false;
  ensureTimerTicker();
  updateTimerDisplays();
}
function pauseResumeTimer(){
  if(timer.running){
    timer.remaining = Math.max(0, Math.ceil((timer.endAt - Date.now()) / 1000));
    timer.running = false;
  } else if(timer.remaining > 0){
    initAudio();
    timer.endAt = Date.now() + timer.remaining * 1000;
    timer.running = true;
    timer.alertFired = false;
    ensureTimerTicker();
  }
  updateTimerDisplays();
}
function resetTimer(){
  timer.running = false;
  timer.alertFired = false;
  timer.remaining = timer.selectedSeconds;
  updateTimerDisplays();
}
function stopTimer(reset=true){
  timer.running = false;
  timer.alertFired = false;
  if(reset) timer.remaining = timer.selectedSeconds;
  updateTimerDisplays();
}
function addTimerSeconds(seconds){
  const amount = Number(seconds) || 0;
  if(timer.running){
    timer.endAt += amount * 1000;
    timer.remaining = Math.max(0, Math.ceil((timer.endAt - Date.now()) / 1000));
    if(timer.remaining <= 0) timer.running = false;
  } else {
    timer.remaining = Math.max(0, timer.remaining + amount);
  }
  timer.alertFired = false;
  updateTimerDisplays();
}
function setTimerPreset(seconds){
  initAudio();
  timer.selectedSeconds = Number(seconds);
  timer.remaining = Number(seconds);
  timer.running = false;
  timer.alertFired = false;
  updateTimerDisplays();
}
function setDefaultRest(seconds){
  const secs = Number(seconds);
  state.settings.defaultRestSeconds = secs;
  save();
  timer.selectedSeconds = secs;
  if(!timer.running) timer.remaining = secs;
  render();
  updateTimerDisplays();
}
function timerToggle(){
  initAudio();
  if(timer.remaining <= 0) startTimer(timer.selectedSeconds);
  else pauseResumeTimer();
}
function updateTimerDisplays(){
  const text = formatTime(timer.remaining);
  const big = document.getElementById("bigTimerText");
  if(big) big.textContent = text;
  const status = document.getElementById("bigTimerStatus");
  if(status) status.textContent = timer.remaining === 0 ? "GO" : (timer.running ? "RESTING" : "READY");
  const toggle = document.getElementById("timerToggle");
  if(toggle) toggle.textContent = timer.running ? "Pause" : (timer.remaining === 0 ? "Restart" : "Start");
  const strip = document.getElementById("restStrip");
  if(strip){
    const shouldShow = timer.running || timer.remaining !== timer.selectedSeconds;
    strip.classList.toggle("hidden", !shouldShow);
    const countdown = document.getElementById("restCountdown");
    if(countdown) countdown.textContent = text;
    const label = document.getElementById("restLabel");
    if(label) label.textContent = timer.remaining === 0 ? "Start next set" : (timer.running ? "Rest" : "Paused");
  }
}


function homeView(){
  const next = workoutById(state.nextWorkoutId) || state.currentBlock.workouts[0];
  const last = [...state.completedWorkouts].sort((a,b)=>new Date(b.date)-new Date(a.date))[0];
  return `
    <div class="topbar"><div class="toprow"><div><h1>Workout Tracker</h1><div class="subtle">${state.currentBlock.name}</div></div></div></div>
    <main class="content">
      ${state.activeWorkout ? `
      <div class="card">
        <div class="eyebrow">In progress</div>
        <h2>${state.activeWorkout.workoutName}</h2>
        <button class="btn" onclick="nav('workout')">Resume workout</button>
      </div>` : ""}
      <div class="card hero">
        <div class="eyebrow">Up next</div>
        <div class="big">${next.name}</div>
        <div class="subtle">${last ? `Last completed: ${last.workoutName} · ${new Date(last.date).toLocaleDateString()}` : "No completed workouts yet"}</div>
        <div style="margin-top:16px"><button class="btn" onclick="startWorkout('${next.id}')">Start ${next.name}</button></div>
      </div>
      <div class="card">
        <h3>Choose a different workout</h3>
        <div class="subtle" style="margin-bottom:12px">Override the recommendation anytime.</div>
        <div class="grid">
          ${state.currentBlock.workouts.map(w=>`<button class="workout-choice ${w.id===next.id?'active':''}" onclick="startWorkout('${w.id}')">${w.id}</button>`).join("")}
        </div>
      </div>
      <div class="card">
        <h3>Rest timer</h3>
        <div class="subtle" style="margin-bottom:12px">Mark a set complete and a ${formatTime(state.settings.defaultRestSeconds)} rest countdown starts automatically.</div>
        <button class="btn secondary" onclick="nav('timer')">Open giant timer</button>
      </div>
      <div class="card">
        <h3>Garage / Basement workout</h3>
        <div class="subtle" style="margin-bottom:12px">Generate a one-off 20, 30, or 45 minute workout without changing your A/B/C gym rotation.</div>
        <button class="btn secondary" onclick="nav('homegen')">Generate home workout</button>
      </div>
      <div class="card">
        <h3>What this version remembers</h3>
        <div class="subtle">Weights and reps, exercise history, persistent equipment/setup notes, session notes, and progression suggestions.</div>
      </div>
    </main>`;
}

function workoutView(){
  if(!state.activeWorkout) return `<div class="content"><div class="empty">No active workout.</div></div>`;
  const prog = workoutById(state.activeWorkout.workoutId);
  return `
  <div class="topbar">
    <div class="toprow">
      <div><div class="eyebrow">Active workout</div><h1>${state.activeWorkout.workoutName}</h1></div>
      <button class="btn ghost small" onclick="cancelWorkout()">Discard</button>
    </div>
  </div>
  <div id="restStrip" class="rest-strip hidden">
    <div>
      <div id="restLabel" class="rest-label">Rest</div>
      <div id="restCountdown" class="rest-countdown">${formatTime(timer.remaining)}</div>
    </div>
    <div class="rest-actions">
      <button onclick="addTimerSeconds(30)">+30</button>
      <button onclick="resetTimer()">Skip</button>
    </div>
  </div>
  <main class="content">
    ${state.activeWorkout.exercises.map((e,i)=>{
      const def = prog.exercises.find(x=>x.id===e.exerciseId);
      const hist = lastHistory(e.exerciseId);
      return `<div class="card">
        <div class="exercise-head">
          <div>
            <button class="exercise-title" onclick="openHistory('${e.exerciseId}')">${e.name}</button>
            <div class="rx">${def.sets} × ${def.minReps}–${def.maxReps}</div>
          </div>
          <span class="pill">${i+1}/${state.activeWorkout.exercises.length}</span>
        </div>
        <div class="last"><strong>Last:</strong> ${fmtSets(hist)}</div>
        ${e.suggestedWeight ? `<div class="suggest">Suggested starting weight: <strong>${e.suggestedWeight} lb</strong> <button class="btn secondary small" style="margin-left:8px" onclick="useSuggestion('${e.exerciseId}')">Use</button></div>` : `<div class="suggest">No suggested weight yet — log this session to establish one.</div>`}
        <div class="note"><strong>Setup:</strong> ${escapeHtml(e.setupNote || "No setup note yet.")}</div>
        <div class="labels"><span>Set</span><span>Weight</span><span>Reps</span><span>Done</span></div>
        ${e.sets.map((s,idx)=>`<div class="setrow">
          <strong style="text-align:center">${idx+1}</strong>
          <input class="field" type="number" inputmode="decimal" placeholder="${e.suggestedWeight || "lb"}" value="${escapeAttr(s.weight)}" onchange="updateSet('${e.exerciseId}',${idx},'weight',this.value)">
          <input class="field" type="number" inputmode="numeric" placeholder="reps" value="${escapeAttr(s.reps)}" onchange="updateSet('${e.exerciseId}',${idx},'reps',this.value)">
          <button class="check ${s.done?'done':''}" onclick="toggleDone('${e.exerciseId}',${idx})">${s.done?'✓':''}</button>
        </div>`).join("")}
        <hr>
        <div class="subtle" style="margin-bottom:5px"><strong>Permanent setup note</strong></div>
        <textarea onchange="updateActiveNote('${e.exerciseId}','setupNote',this.value)" placeholder="Seat position, grip, handle, foot position...">${escapeHtml(e.setupNote)}</textarea>
        <div class="subtle" style="margin:10px 0 5px"><strong>Today's note</strong></div>
        <textarea onchange="updateActiveNote('${e.exerciseId}','sessionNote',this.value)" placeholder="Anything specific to today's session...">${escapeHtml(e.sessionNote)}</textarea>
      </div>`;
    }).join("")}
    <button class="btn" style="width:100%;padding:16px" onclick="finishWorkout()">Complete workout</button>
  </main>`;
}

function timerView(){
  return `<div class="topbar"><div class="toprow"><div><h1>Timer</h1><div class="subtle">Maximum-size countdown for across-the-gym visibility.</div></div></div></div>
  <main class="content">
    <div class="timer-stage">
      <div id="bigTimerStatus" class="timer-caption">${timer.remaining===0 ? "GO" : (timer.running ? "RESTING" : "READY")}</div>
      <div id="bigTimerText" class="timer-digits">${formatTime(timer.remaining)}</div>
      <div class="timer-main-actions">
        <button id="timerToggle" class="timer-primary" onclick="timerToggle()">${timer.running ? "Pause" : (timer.remaining===0 ? "Restart" : "Start")}</button>
        <button class="timer-secondary-button" onclick="resetTimer()">Reset</button>
      </div>
      <div class="timer-adjust-actions">
        <button onclick="addTimerSeconds(-30)">−30 sec</button>
        <button onclick="addTimerSeconds(30)">+30 sec</button>
      </div>
    </div>
    <div class="timer-presets">
      <button onclick="setTimerPreset(60)">1:00</button>
      <button onclick="setTimerPreset(90)">1:30</button>
      <button onclick="setTimerPreset(120)">2:00</button>
      <button onclick="setTimerPreset(180)">3:00</button>
    </div>
    <div class="card" style="margin-top:12px">
      <h3>Automatic rest after a set</h3>
      <div class="subtle" style="margin-bottom:10px">Choose the countdown that starts when you tap the ✓ after a set.</div>
      <select aria-label="Default rest period" style="width:100%" onchange="setDefaultRest(this.value)">
        ${[60,90,120,180].map(sec=>`<option value="${sec}" ${sec===state.settings.defaultRestSeconds?'selected':''}>${formatTime(sec)}</option>`).join("")}
      </select>
    </div>
  </main>`;
}


function homeGeneratorView(){
  const g = state.homeGenerator;
  const selected = g.equipment[g.location] || [];
  const generated = g.generated;
  const locationLabel = g.location==="garage" ? "Garage" : "Basement";
  return `<div class="topbar"><div class="toprow"><div><h1>At-Home Generator</h1><div class="subtle">One-off workouts that do not alter your gym rotation.</div></div></div></div>
  <main class="content">
    <div class="card">
      <div class="eyebrow">Location</div>
      <div class="segmented">
        <button class="${g.location==="garage"?"selected":""}" onclick="setHomeLocation('garage')">Garage</button>
        <button class="${g.location==="basement"?"selected":""}" onclick="setHomeLocation('basement')">Basement</button>
      </div>

      <div class="eyebrow" style="margin-top:16px">Time</div>
      <div class="segmented three">
        ${[20,30,45].map(m=>`<button class="${g.duration===m?"selected":""}" onclick="setHomeDuration(${m})">${m} min</button>`).join("")}
      </div>

      <div class="eyebrow" style="margin-top:16px">Workout type</div>
      <div class="segmented three">
        ${["strength","mixed","conditioning"].map(s=>`<button class="${g.style===s?"selected":""}" onclick="setHomeStyle('${s}')">${s[0].toUpperCase()+s.slice(1)}</button>`).join("")}
      </div>
    </div>

    <div class="card">
      <div class="row between">
        <div>
          <h3 style="margin-bottom:2px">${locationLabel} equipment</h3>
          <div class="subtle">Set this once; the app remembers it.</div>
        </div>
        <span class="pill">${selected.length} selected</span>
      </div>
      <div class="equipment-grid">
        ${HOME_EQUIPMENT.map(([key,label])=>`
          <label class="equipment-chip ${selected.includes(key)?"on":""}">
            <input type="checkbox" ${selected.includes(key)?"checked":""} onchange="toggleHomeEquipment('${g.location}','${key}')">
            <span>${label}</span>
          </label>`).join("")}
      </div>
    </div>

    <button class="btn" style="width:100%;padding:16px" onclick="buildHomeWorkout()">${generated ? "Generate another workout" : "Generate workout"}</button>

    ${generated ? `<div class="card" style="margin-top:12px">
      <div class="row between">
        <div>
          <div class="eyebrow">${generated.location==="garage"?"Garage":"Basement"} · ${generated.duration} min · ${generated.style}</div>
          <h2 style="margin-top:5px">Today's one-off workout</h2>
        </div>
        <button class="btn ghost small" onclick="clearGeneratedHomeWorkout()">Clear</button>
      </div>
      <div class="home-plan">
        ${generated.exercises.map((ex,i)=>`<div class="home-exercise">
          <div class="home-num">${i+1}</div>
          <div>
            <strong>${ex.name}</strong>
            <div class="subtle">${ex.prescription}</div>
          </div>
        </div>`).join("")}
      </div>
      <div class="note"><strong>Tip:</strong> Use the Timer tab for rest periods or conditioning intervals. This session will not advance Workout A/B/C.</div>
    </div>` : ""}
  </main>`;
}

function historyView(){
  const exDefs = new Map();
  state.currentBlock.workouts.flatMap(w=>w.exercises).forEach(e=>exDefs.set(e.id,e));
  return `<div class="topbar"><h1>Exercise History</h1><div class="subtle">Tap an exercise for all previous performances.</div></div>
  <main class="content">
    ${[...exDefs.values()].map(ex=>{
      const h=lastHistory(ex.id);
      return `<div class="card" onclick="openHistory('${ex.id}')">
        <div class="row between"><h3 style="margin:0">${ex.name}</h3><span>›</span></div>
        <div class="last">${h ? `${new Date(h.date).toLocaleDateString()} · ${fmtSets(h)}` : "No history yet"}</div>
        ${ex.setupNote ? `<div class="note">${escapeHtml(ex.setupNote)}</div>`:""}
      </div>`;
    }).join("")}
  </main>`;
}

function programView(){
  return `<div class="topbar"><h1>Program</h1><div class="subtle">${state.currentBlock.name}</div></div>
  <main class="content">
    ${state.currentBlock.workouts.map(w=>`<div class="card">
      <div class="row between"><h2>${w.name}</h2><span class="pill">${w.exercises.length} exercises</span></div>
      ${w.exercises.map(e=>`<div class="history-item">
        <div class="row between"><strong>${e.name}</strong><span>${e.sets} × ${e.minReps}–${e.maxReps}</span></div>
        <div class="subtle">Progress +${e.increment} lb after all prescribed sets reach ${e.maxReps} reps.</div>
      </div>`).join("")}
    </div>`).join("")}
    <div class="card">
      <h3>Future block handoff</h3>
      <div class="subtle">This version preserves the data needed for the future planning workflow: completed sessions, exercise history, progression, and notes. AI-assisted next-block creation can be layered on later.</div>
    </div>
    <div class="card">
      <h3>Backup & settings</h3>
      <div class="subtle" style="margin-bottom:12px">Export or restore your workout data from this device.</div>
      <button class="btn secondary" onclick="nav('settings')">Open settings</button>
    </div>
  </main>`;
}

function settingsView(){
  return `<div class="topbar"><h1>Settings</h1></div>
  <main class="content">
    <div class="card">
      <h3>Data</h3>
      <p class="subtle">This app stores workout data only in this browser on this device.</p>
      <button class="btn secondary" onclick="exportData()">Export backup</button>
      <button class="btn ghost" style="margin-left:6px" onclick="document.getElementById('importFile').click()">Import backup</button>
      <input id="importFile" type="file" accept="application/json" style="display:none" onchange="importData(this.files[0])">
    </div>
    <div class="card">
      <h3>Reset</h3>
      <p class="subtle">Clear workout history and restore the sample program.</p>
      <button class="btn danger" onclick="resetApp()">Reset app</button>
    </div>
  </main>`;
}

function openHistory(exId){ modal={type:"history", exId}; render(); }
function closeModal(){ modal=null; render(); }

function modalHtml(){
  if(!modal) return "";
  if(modal.type==="complete"){
    return `<div class="modalback" onclick="closeModal()"><div class="modal" onclick="event.stopPropagation()">
      <div class="eyebrow">Workout complete</div>
      <h2>${modal.workoutName}</h2>
      <p class="success">Next recommendation: ${workoutById(state.nextWorkoutId).name}</p>
      <button class="btn" onclick="closeModal()">Done</button>
    </div></div>`;
  }
  if(modal.type==="history"){
    const ex = state.currentBlock.workouts.flatMap(w=>w.exercises).find(e=>e.id===modal.exId);
    const hist = allHistoryForExercise(modal.exId);
    return `<div class="modalback" onclick="closeModal()"><div class="modal" onclick="event.stopPropagation()">
      <div class="row between"><div><div class="eyebrow">Exercise history</div><h2>${ex?.name || "Exercise"}</h2></div><button class="btn ghost small" onclick="closeModal()">Close</button></div>
      ${ex?.setupNote ? `<div class="note"><strong>Current setup:</strong> ${escapeHtml(ex.setupNote)}</div>`:""}
      ${hist.length ? hist.map(h=>`<div class="history-item">
        <div class="history-date">${new Date(h.date).toLocaleDateString()} · ${h.workoutName}</div>
        <div class="history-sets">${fmtSets(h)}</div>
        ${h.sessionNote ? `<div class="subtle" style="margin-top:5px">${escapeHtml(h.sessionNote)}</div>`:""}
      </div>`).join("") : `<div class="empty">No previous sessions yet.</div>`}
    </div></div>`;
  }
  return "";
}

function exportData(){
  const blob = new Blob([JSON.stringify(state,null,2)], {type:"application/json"});
  const url = URL.createObjectURL(blob);
  const a=document.createElement("a"); a.href=url; a.download="workout-tracker-backup.json"; a.click();
  URL.revokeObjectURL(url);
}
function importData(file){
  if(!file) return;
  const r=new FileReader();
  r.onload=()=>{ try { state=JSON.parse(r.result); save(); render(); alert("Backup imported."); } catch { alert("That file could not be imported."); } };
  r.readAsText(file);
}
function resetApp(){
  if(confirm("Reset the app and erase workout history on this device?")){
    state=structuredClone(seed); save(); view="home"; modal=null; render();
  }
}
function escapeHtml(v=""){ return String(v).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}
function escapeAttr(v=""){ return escapeHtml(v); }

function render(){
  let body = view==="home" ? homeView() : view==="workout" ? workoutView() : view==="timer" ? timerView() : view==="homegen" ? homeGeneratorView() : view==="history" ? historyView() : view==="program" ? programView() : settingsView();
  document.getElementById("app").innerHTML = `<div class="shell">${body}
    <nav class="nav"><div class="navinner">
      <button class="${view==='home'?'on':''}" onclick="nav('home')">Home</button>
      <button class="${view==='workout'?'on':''}" onclick="nav('workout')">Workout</button>
      <button class="${view==='timer'?'on':''}" onclick="nav('timer')">Timer</button>
      <button class="${view==='history'?'on':''}" onclick="nav('history')">History</button>
      <button class="${view==='program'||view==='settings'?'on':''}" onclick="nav('program')">Program</button>
    </div></nav>
    ${modalHtml()}
  </div>`;
  updateTimerDisplays();
}
render();

if("serviceWorker" in navigator){
  window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));
}
