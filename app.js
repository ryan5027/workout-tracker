
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
  activeWorkout: null
};

let state = loadState();
let view = "home";
let modal = null;

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
  ex.sets[idx].done=!ex.sets[idx].done; save(); render();
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
  save(); view="home"; modal={type:"complete", workoutName:a.workoutName}; render();
}
function cancelWorkout(){
  if(confirm("Discard this active workout?")){
    state.activeWorkout=null; save(); view="home"; render();
  }
}
function nav(v){ view=v; modal=null; render(); }

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
      <div class="subtle">V1 preserves the data needed for the future planning workflow: completed sessions, exercise history, progression, and notes. AI-assisted next-block creation can be layered on later.</div>
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
      <p class="subtle">This V1 stores data only in this browser on this device.</p>
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
  let body = view==="home" ? homeView() : view==="workout" ? workoutView() : view==="history" ? historyView() : view==="program" ? programView() : settingsView();
  document.getElementById("app").innerHTML = `<div class="shell">${body}
    <nav class="nav"><div class="navinner">
      <button class="${view==='home'?'on':''}" onclick="nav('home')">Home</button>
      <button class="${view==='workout'?'on':''}" onclick="nav('workout')">Workout</button>
      <button class="${view==='history'?'on':''}" onclick="nav('history')">History</button>
      <button class="${view==='program'||view==='settings'?'on':''}" onclick="nav('program')">Program</button>
    </div></nav>
    ${modalHtml()}
  </div>`;
}
render();

if("serviceWorker" in navigator){
  window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));
}
