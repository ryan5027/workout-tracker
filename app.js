const STORAGE_KEY = "workout-tracker-v1";
const ACTIVE_PROGRAM = {"schemaVersion":3,"id":"strength-block-2026-10","version":3,"name":"5-Week Full Body Strength Block","summary":"This block shifts the emphasis toward strength while keeping enough hypertrophy work to maintain and build muscle. The three days remain full-body, the main lifts use lower rep ranges and longer rest periods, arm and shoulder accessories use time-efficient supersets, and Week 5 is a planned deload at about 90% of the most recent normal working load with reduced sets. Seated Leg Curl is standardized across Workouts A and C so it shares one exercise history.","weeks":5,"deloadWeek":5,"deloadLoadFactor":0.9,"deloadSetRule":{"4":3,"3":2,"2":1,"1":1},"workouts":[{"id":"A","name":"Workout A \u2014 Squat + Horizontal Push/Pull","exercises":[{"id":"hack-squat","name":"Hack Squat","sets":4,"minReps":5,"maxReps":7,"increment":10,"restSeconds":180,"muscles":["quads","glutes"],"substitutes":[{"id":"pendulum-squat","name":"Pendulum Squat"}]},{"id":"incline-dumbbell-press","name":"Incline Dumbbell Press","sets":4,"minReps":6,"maxReps":8,"increment":5,"restSeconds":180,"muscles":["chest","triceps","shoulders"],"substitutes":[{"id":"incline-machine-press","name":"Incline Machine Press"}]},{"id":"chest-supported-row","name":"Chest-Supported Row","sets":4,"minReps":6,"maxReps":8,"increment":5,"restSeconds":150,"muscles":["back","biceps"],"substitutes":[{"id":"seated-cable-row","name":"Seated Cable Row"}]},{"id":"seated-leg-curl","name":"Seated Leg Curl","sets":3,"minReps":8,"maxReps":10,"increment":5,"restSeconds":120,"muscles":["hamstrings"],"substitutes":[{"id":"lying-leg-curl","name":"Lying Leg Curl"}]},{"id":"lateral-raise-machine","name":"Lateral Raise Machine","sets":3,"minReps":10,"maxReps":15,"increment":5,"restSeconds":90,"muscles":["shoulders"],"substitutes":[{"id":"dumbbell-lateral-raise","name":"Dumbbell Lateral Raise"}]},{"id":"dumbbell-curl","name":"Dumbbell Curl","sets":2,"minReps":8,"maxReps":12,"increment":5,"restSeconds":90,"muscles":["biceps"],"supersetGroup":"A-ARMS","supersetOrder":1,"substitutes":[{"id":"preacher-curl","name":"Preacher Curl"},{"id":"hammer-curl","name":"Hammer Curl"}]},{"id":"rope-pressdown","name":"Rope Pressdown","sets":2,"minReps":8,"maxReps":12,"increment":5,"restSeconds":90,"muscles":["triceps"],"supersetGroup":"A-ARMS","supersetOrder":2,"substitutes":[{"id":"straight-bar-pressdown","name":"Straight-Bar Pressdown"}]}]},{"id":"B","name":"Workout B \u2014 Hinge + Vertical Push/Pull","exercises":[{"id":"romanian-deadlift","name":"Romanian Deadlift","sets":4,"minReps":5,"maxReps":7,"increment":10,"restSeconds":180,"muscles":["hamstrings","glutes","back"],"substitutes":[{"id":"smith-romanian-deadlift","name":"Smith Machine Romanian Deadlift"},{"id":"dumbbell-romanian-deadlift","name":"Dumbbell Romanian Deadlift"}]},{"id":"machine-shoulder-press","name":"Machine Shoulder Press","sets":4,"minReps":6,"maxReps":8,"increment":5,"restSeconds":180,"muscles":["shoulders","triceps"],"substitutes":[{"id":"dumbbell-shoulder-press","name":"Dumbbell Shoulder Press"}]},{"id":"lat-pulldown","name":"Lat Pulldown","sets":4,"minReps":6,"maxReps":8,"increment":5,"restSeconds":150,"muscles":["back","biceps"],"substitutes":[{"id":"assisted-pull-up","name":"Assisted Pull-Up"},{"id":"neutral-grip-lat-pulldown","name":"Neutral-Grip Lat Pulldown"}]},{"id":"bulgarian-split-squat","name":"Bulgarian Split Squat","sets":3,"minReps":6,"maxReps":8,"increment":5,"restSeconds":120,"muscles":["quads","glutes"],"substitutes":[{"id":"reverse-lunge","name":"Reverse Lunge"}]},{"id":"pec-deck","name":"Pec Deck / Machine Fly","sets":3,"minReps":8,"maxReps":12,"increment":5,"restSeconds":90,"muscles":["chest"],"substitutes":[{"id":"dumbbell-fly","name":"Dumbbell Fly"}]},{"id":"preacher-curl","name":"Preacher Curl","sets":2,"minReps":8,"maxReps":12,"increment":5,"restSeconds":90,"muscles":["biceps"],"supersetGroup":"B-ARMS","supersetOrder":1,"substitutes":[{"id":"dumbbell-curl","name":"Dumbbell Curl"},{"id":"hammer-curl","name":"Hammer Curl"}]},{"id":"overhead-cable-triceps-extension","name":"Overhead Cable Triceps Extension","sets":2,"minReps":8,"maxReps":12,"increment":5,"restSeconds":90,"muscles":["triceps"],"supersetGroup":"B-ARMS","supersetOrder":2,"substitutes":[{"id":"overhead-dumbbell-triceps-extension","name":"Overhead Dumbbell Triceps Extension"}]}]},{"id":"C","name":"Workout C \u2014 Press + Pull + Secondary Legs","exercises":[{"id":"machine-chest-press","name":"Machine Chest Press","sets":4,"minReps":5,"maxReps":7,"increment":5,"restSeconds":180,"muscles":["chest","triceps","shoulders"],"substitutes":[{"id":"dumbbell-bench-press","name":"Dumbbell Bench Press"}]},{"id":"seated-cable-row","name":"Seated Cable Row","sets":4,"minReps":6,"maxReps":8,"increment":5,"restSeconds":150,"muscles":["back","biceps"],"substitutes":[{"id":"chest-supported-row","name":"Chest-Supported Row"}]},{"id":"leg-extension","name":"Leg Extension","sets":3,"minReps":8,"maxReps":10,"increment":5,"restSeconds":120,"muscles":["quads"],"substitutes":[{"id":"single-leg-leg-extension","name":"Single-Leg Leg Extension"}]},{"id":"seated-leg-curl","name":"Seated Leg Curl","sets":3,"minReps":8,"maxReps":10,"increment":5,"restSeconds":120,"muscles":["hamstrings"],"substitutes":[{"id":"lying-leg-curl","name":"Lying Leg Curl"}]},{"id":"neutral-grip-lat-pulldown","name":"Neutral-Grip Lat Pulldown","sets":3,"minReps":8,"maxReps":10,"increment":5,"restSeconds":120,"muscles":["back","biceps"],"substitutes":[{"id":"lat-pulldown","name":"Lat Pulldown"},{"id":"assisted-pull-up","name":"Assisted Pull-Up"}]},{"id":"lateral-raise-machine","name":"Lateral Raise Machine","sets":3,"minReps":12,"maxReps":15,"increment":5,"restSeconds":75,"muscles":["shoulders"],"supersetGroup":"C-SHOULDERS","supersetOrder":1,"substitutes":[{"id":"dumbbell-lateral-raise","name":"Dumbbell Lateral Raise"}]},{"id":"rear-delt-fly","name":"Rear-Delt Fly","sets":3,"minReps":12,"maxReps":15,"increment":5,"restSeconds":75,"muscles":["shoulders","back"],"supersetGroup":"C-SHOULDERS","supersetOrder":2,"substitutes":[{"id":"face-pull","name":"Face Pull"}]}]}]};
const APP_SCHEMA_VERSION = 3;

const EXERCISE_ID_ALIASES = {
  "incline-db":"incline-dumbbell-press",
  "chest-row":"chest-supported-row",
  "leg-curl":"seated-leg-curl",
  "lateral-raise":"lateral-raise-machine",
  "machine-press":"machine-chest-press",
  "pulldown":"lat-pulldown",
  "cable-row":"seated-cable-row",
  "shoulder-press":"machine-shoulder-press",
  "rear-delt":"rear-delt-fly"
};

const EXERCISE_NAME_BY_ID = {};
function indexProgramExercises(program){
  if(!program?.workouts) return;
  program.workouts.forEach(w => w.exercises.forEach(ex => {
    EXERCISE_NAME_BY_ID[ex.id] = ex.name;
    (ex.substitutes || []).forEach(s => EXERCISE_NAME_BY_ID[s.id] = s.name);
  }));
}
indexProgramExercises(ACTIVE_PROGRAM);

const GARAGE_INVENTORY = [
  "Bodyweight", "Pull-up bar", "TRX", "Leg curl roller", "Ab roller",
  "15 lb dumbbells", "30 lb kettlebell", "45 lb kettlebell", "80 lb kettlebell",
  "Sandbags", "Speed jump rope", "2 weighted jump ropes"
];
const BASEMENT_INVENTORY = [
  "Treadmill", "Weighted vest", "20/30/45/80 lb kettlebells", "Resistance bands",
  "Dumbbells 5–30 lb", "Single-leg squat setup", "Leg curl roller", "Ab roller"
];

const HOME_POOLS = {
  garage: {
    move: [
      {name:"TRX Row", role:"pull", muscles:["back","biceps"], intensity:1, rx:"10–15 smooth reps"},
      {name:"TRX Chest Press", role:"push", muscles:["chest","triceps"], intensity:1, rx:"8–15 controlled reps"},
      {name:"TRX Squat", role:"lower", muscles:["quads","glutes"], intensity:1, rx:"12–20 reps"},
      {name:"Goblet Squat — 30 or 45 lb KB", role:"lower", muscles:["quads","glutes"], intensity:2, rx:"10–15 reps"},
      {name:"Kettlebell Deadlift — 45 or 80 lb", role:"hinge", muscles:["hamstrings","glutes"], intensity:2, rx:"10–15 reps"},
      {name:"Suitcase Carry — 45 or 80 lb KB", role:"carry", muscles:["core","grip"], intensity:1, rx:"30–45 sec/side"},
      {name:"Sandbag Bear-Hug Carry", role:"carry", muscles:["core","legs"], intensity:2, rx:"30–60 sec"},
      {name:"Easy Jump Rope", role:"cardio", muscles:["calves"], intensity:1, rx:"45–75 sec"},
      {name:"Leg Curl Roller", role:"hamstring", muscles:["hamstrings"], intensity:1, rx:"10–15 reps"},
      {name:"Ab Roller", role:"core", muscles:["core"], intensity:2, rx:"5–10 quality reps"},
      {name:"Pull-Up", role:"pull", muscles:["back","biceps"], intensity:2, rx:"submax set, stop 2–3 reps early"}
    ],
    condition: [
      {name:"Speed Jump Rope", role:"cardio", muscles:["calves"], intensity:2, rx:"45 sec work / 30 sec easy"},
      {name:"Weighted Jump Rope", role:"cardio", muscles:["shoulders","calves"], intensity:2, rx:"30 sec work / 45 sec easy"},
      {name:"Kettlebell Swing — 30 or 45 lb", role:"hinge", muscles:["hamstrings","glutes"], intensity:2, rx:"15–20 reps"},
      {name:"Sandbag Bear-Hug Carry", role:"carry", muscles:["core","legs"], intensity:2, rx:"40–60 sec"},
      {name:"Kettlebell Suitcase Carry", role:"carry", muscles:["core","grip"], intensity:2, rx:"30–45 sec/side"},
      {name:"TRX Row", role:"pull", muscles:["back","biceps"], intensity:1, rx:"10–15 reps"},
      {name:"Push-Up", role:"push", muscles:["chest","triceps"], intensity:1, rx:"8–15 reps"},
      {name:"Reverse Lunge", role:"lower", muscles:["quads","glutes"], intensity:1, rx:"8–10/side"},
      {name:"Mountain Climber", role:"core", muscles:["core"], intensity:2, rx:"30–40 sec"},
      {name:"Ab Roller", role:"core", muscles:["core"], intensity:2, rx:"5–10 reps"}
    ],
    mobility: [
      {name:"90/90 Hip Switch", role:"mobility", muscles:["hips"], intensity:1, rx:"6–8/side"},
      {name:"TRX Assisted Deep Squat", role:"mobility", muscles:["hips","quads"], intensity:1, rx:"8–10 slow reps"},
      {name:"TRX Fallout", role:"core", muscles:["core","shoulders"], intensity:1, rx:"6–10 reps"},
      {name:"Ab Roller", role:"core", muscles:["core"], intensity:2, rx:"5–8 quality reps"},
      {name:"Leg Curl Roller", role:"hamstring", muscles:["hamstrings"], intensity:1, rx:"10–15 reps"},
      {name:"TRX Y Raise", role:"upper", muscles:["shoulders","back"], intensity:1, rx:"8–12 reps"},
      {name:"Split Squat Iso Hold", role:"lower", muscles:["quads","glutes"], intensity:1, rx:"20–30 sec/side"},
      {name:"Dead Bug", role:"core", muscles:["core"], intensity:1, rx:"8–10/side"},
      {name:"Easy Suitcase Carry — 30 or 45 lb KB", role:"carry", muscles:["core","grip"], intensity:1, rx:"30–45 sec/side"}
    ]
  },
  basement: {
    move: [
      {name:"Incline Treadmill Walk", role:"cardio", muscles:["legs"], intensity:1, rx:"easy-moderate pace"},
      {name:"Weighted-Vest Incline Walk", role:"cardio", muscles:["legs"], intensity:2, rx:"comfortable pace; no running"},
      {name:"Goblet Squat — 20 or 30 lb KB", role:"lower", muscles:["quads","glutes"], intensity:1, rx:"12–15 reps"},
      {name:"Dumbbell Romanian Deadlift", role:"hinge", muscles:["hamstrings","glutes"], intensity:1, rx:"12–15 reps"},
      {name:"One-Arm Dumbbell Row", role:"pull", muscles:["back","biceps"], intensity:1, rx:"10–15/side"},
      {name:"Dumbbell Floor Press", role:"push", muscles:["chest","triceps"], intensity:1, rx:"10–15 reps"},
      {name:"Band Row", role:"pull", muscles:["back","biceps"], intensity:1, rx:"15–20 reps"},
      {name:"Single-Leg Squat", role:"lower", muscles:["quads","glutes"], intensity:2, rx:"6–10/side, controlled"},
      {name:"Leg Curl Roller", role:"hamstring", muscles:["hamstrings"], intensity:1, rx:"10–15 reps"},
      {name:"Ab Roller", role:"core", muscles:["core"], intensity:2, rx:"5–10 reps"}
    ],
    condition: [
      {name:"Weighted-Vest Incline Walk", role:"cardio", muscles:["legs"], intensity:2, rx:"steady moderate incline; no running"},
      {name:"Treadmill Fast Intervals — no vest", role:"cardio", muscles:["legs"], intensity:2, rx:"30 sec fast / 60 sec easy"},
      {name:"Kettlebell Swing — 30 or 45 lb", role:"hinge", muscles:["hamstrings","glutes"], intensity:2, rx:"15–20 reps"},
      {name:"Kettlebell Suitcase Carry", role:"carry", muscles:["core","grip"], intensity:2, rx:"30–45 sec/side"},
      {name:"Dumbbell Thruster — light", role:"full", muscles:["quads","shoulders"], intensity:2, rx:"8–12 reps"},
      {name:"Band Row", role:"pull", muscles:["back","biceps"], intensity:1, rx:"15–20 reps"},
      {name:"Reverse Lunge", role:"lower", muscles:["quads","glutes"], intensity:1, rx:"8–10/side"},
      {name:"Ab Roller", role:"core", muscles:["core"], intensity:2, rx:"5–10 reps"}
    ],
    mobility: [
      {name:"Easy Treadmill Walk", role:"cardio", muscles:["legs"], intensity:1, rx:"easy pace"},
      {name:"90/90 Hip Switch", role:"mobility", muscles:["hips"], intensity:1, rx:"6–8/side"},
      {name:"Band Pull-Apart", role:"upper", muscles:["shoulders","back"], intensity:1, rx:"15–20 reps"},
      {name:"Band Face Pull", role:"upper", muscles:["shoulders","back"], intensity:1, rx:"12–20 reps"},
      {name:"Leg Curl Roller", role:"hamstring", muscles:["hamstrings"], intensity:1, rx:"10–15 reps"},
      {name:"Ab Roller", role:"core", muscles:["core"], intensity:2, rx:"5–8 reps"},
      {name:"Dead Bug", role:"core", muscles:["core"], intensity:1, rx:"8–10/side"},
      {name:"Single-Leg Squat — easy", role:"lower", muscles:["quads","glutes"], intensity:1, rx:"6–8/side"}
    ]
  }
};

function defaultState(){
  return {
    schemaVersion: APP_SCHEMA_VERSION,
    activeProgramVersion: ACTIVE_PROGRAM.version,
    currentBlock: structuredClone(ACTIVE_PROGRAM),
    currentWeek: 1,
    nextWorkoutId: "A",
    blockComplete: false,
    completedWorkouts: [],
    activeWorkout: null,
    exerciseNotes: {},
    substitutionUse: {},
    approvedPendingProgram: null,
    availableProgram: null,
    settings: {defaultRestSeconds:90},
    homeGenerator: {location:"garage",duration:20,style:"move",generated:null},
    lastModifiedAt: new Date().toISOString()
  };
}

function normalizeHistoricalId(id){ return EXERCISE_ID_ALIASES[id] || id; }
function normalizeHistory(history){
  return (history || []).map(w => ({
    ...w,
    exercises:(w.exercises || []).map(e => {
      const oldId = e.actualExerciseId || e.exerciseId || e.prescribedExerciseId;
      const newId = normalizeHistoricalId(oldId);
      return {
        ...e,
        exerciseId:newId,
        actualExerciseId:newId,
        actualName:e.actualName || EXERCISE_NAME_BY_ID[newId] || e.name || newId,
        prescribedExerciseId:normalizeHistoricalId(e.prescribedExerciseId || oldId),
        prescribedName:e.prescribedName || e.name || EXERCISE_NAME_BY_ID[normalizeHistoricalId(e.prescribedExerciseId || oldId)] || newId
      };
    })
  }));
}

function migrateState(raw){
  if(!raw) return defaultState();
  const s = defaultState();
  s.completedWorkouts = normalizeHistory(raw.completedWorkouts || []);
  s.exerciseNotes = {...(raw.exerciseNotes || {})};
  try {
    (raw.currentBlock?.workouts || []).flatMap(w=>w.exercises || []).forEach(ex => {
      const id = normalizeHistoricalId(ex.id);
      if(ex.setupNote && !s.exerciseNotes[id]) s.exerciseNotes[id] = ex.setupNote;
    });
    s.completedWorkouts.forEach(w => w.exercises.forEach(ex => {
      if(ex.setupNote && !s.exerciseNotes[ex.actualExerciseId]) s.exerciseNotes[ex.actualExerciseId] = ex.setupNote;
    }));
  } catch {}
  s.substitutionUse = raw.substitutionUse || {};
  s.settings = {...s.settings,...(raw.settings || {})};
  s.homeGenerator = {...s.homeGenerator,...(raw.homeGenerator || {}),generated:null};
  s.approvedPendingProgram = raw.approvedPendingProgram || null;
  s.availableProgram = raw.availableProgram || null;
  s.lastModifiedAt = raw.lastModifiedAt || new Date().toISOString();

  // V3 is the already-approved next block. Activate it once when upgrading from V1/V2.
  if(Number(raw.activeProgramVersion || 0) >= ACTIVE_PROGRAM.version && raw.currentBlock?.version >= ACTIVE_PROGRAM.version){
    s.activeProgramVersion = raw.activeProgramVersion;
    s.currentBlock = raw.currentBlock;
    s.currentWeek = raw.currentWeek || 1;
    s.nextWorkoutId = raw.nextWorkoutId || "A";
    s.blockComplete = !!raw.blockComplete;
    s.activeWorkout = raw.activeWorkout || null;
  } else {
    s.activeProgramVersion = ACTIVE_PROGRAM.version;
    s.currentBlock = structuredClone(ACTIVE_PROGRAM);
    s.currentWeek = 1;
    s.nextWorkoutId = "A";
    s.blockComplete = false;
    s.activeWorkout = null;
  }
  indexProgramExercises(s.currentBlock);
  return s;
}

function loadState(){
  try { return migrateState(JSON.parse(localStorage.getItem(STORAGE_KEY) || "null")); }
  catch { return defaultState(); }
}

let state = loadState();
let view = "home";
let modal = null;
let chartMode = "weight";
let chartFilter = "all";
let audioContext = null;
let timer = {
  selectedSeconds: state.settings.defaultRestSeconds || 90,
  remaining: state.settings.defaultRestSeconds || 90,
  running:false,
  endAt:null,
  intervalId:null,
  alertFired:false,
  exerciseSlotId:null,
  exerciseName:null
};

window.getWorkoutState = () => structuredClone(state);
window.restoreStateFromCloud = function(remoteState){
  if(!remoteState) return;
  const restored = migrateState(remoteState);
  // If a cloud backup predates V3, keep history but activate the approved V3 block.
  state = restored;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  render();
};

function save(reason="change", requestBackup=true){
  state.schemaVersion = APP_SCHEMA_VERSION;
  state.lastModifiedAt = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  if(requestBackup && typeof window.requestCloudBackup === "function") window.requestCloudBackup(reason);
}

function workoutById(id){ return state.currentBlock?.workouts?.find(w=>w.id===id); }
function currentWorkoutIndex(){ return state.currentBlock.workouts.findIndex(w=>w.id===state.nextWorkoutId); }
function exerciseDefById(id){
  for(const w of state.currentBlock?.workouts || []){
    const e = w.exercises.find(x=>x.id===id);
    if(e) return e;
  }
  return null;
}
function historyId(e){ return normalizeHistoricalId(e.actualExerciseId || e.exerciseId || e.prescribedExerciseId); }
function allHistoryForExercise(exId){
  const id = normalizeHistoricalId(exId);
  return state.completedWorkouts
    .flatMap(w => (w.exercises || []).map(e => ({...e,date:w.finishedAt || w.date,workoutName:w.workoutName,week:w.week,isDeload:!!w.isDeload,programVersion:w.programVersion})))
    .filter(e => historyId(e)===id)
    .sort((a,b)=>new Date(b.date)-new Date(a.date));
}
function lastHistory(exId, includeDeload=true){
  return allHistoryForExercise(exId).find(h=>includeDeload || !h.isDeload) || null;
}
function lastNormalHistory(exId){ return lastHistory(exId,false); }
function completedSets(hist){ return (hist?.sets || []).filter(s=>s.done && Number(s.weight)>=0 && Number(s.reps)>0); }
function representativeWeight(hist){
  const done = completedSets(hist);
  if(!done.length) return null;
  const counts = new Map();
  done.forEach(s=>counts.set(Number(s.weight), (counts.get(Number(s.weight))||0)+1));
  return [...counts.entries()].sort((a,b)=>b[1]-a[1] || b[0]-a[0])[0][0];
}
function roundLoad(x){
  if(!Number.isFinite(x)) return "";
  const step = x < 50 ? 2.5 : 5;
  return Math.round(x/step)*step;
}
function suggestionForDefinition(def, week=state.currentWeek){
  const hist = lastNormalHistory(def.id);
  if(!hist) return "";
  const base = representativeWeight(hist);
  if(base===null) return "";
  if(week===state.currentBlock.deloadWeek) return roundLoad(base * Number(state.currentBlock.deloadLoadFactor || .9));
  if(hist.programVersion !== state.activeProgramVersion) return base;
  const done = completedSets(hist);
  const targetSets = Number(hist.plannedSets || def.sets);
  const targetMax = Number(hist.maxReps || def.maxReps);
  const hitTop = done.length >= targetSets && done.slice(0,targetSets).every(s=>Number(s.reps)>=targetMax);
  return hitTop ? roundLoad(base + Number(def.increment || 0)) : base;
}
function formatWeight(v){ return Number(v)%1===0 ? String(Number(v)) : Number(v).toFixed(1); }
function fmtSets(hist){
  if(!hist) return "No history yet";
  const s = completedSets(hist);
  return s.length ? s.map(x=>`${formatWeight(x.weight)} × ${x.reps}`).join(" · ") : "No completed sets";
}
function deloadSets(normalSets){
  const rule = state.currentBlock.deloadSetRule || {4:3,3:2,2:1,1:1};
  return Number(rule[String(normalSets)] || Math.max(1,normalSets-1));
}
function activeExerciseBySlot(slotId){ return state.activeWorkout?.exercises?.find(e=>e.slotId===slotId); }
function activeDefForSlot(slotId){
  const active = activeExerciseBySlot(slotId);
  if(!active) return null;
  return workoutById(state.activeWorkout.workoutId)?.exercises?.find(e=>e.id===active.prescribedExerciseId) || null;
}

function startWorkout(id){
  const w = workoutById(id);
  if(!w) return;
  const isDeload = Number(state.currentWeek)===Number(state.currentBlock.deloadWeek);
  state.activeWorkout = {
    id:crypto.randomUUID(),
    programVersion:state.activeProgramVersion,
    week:state.currentWeek,
    isDeload,
    workoutId:id,
    workoutName:w.name,
    startedAt:new Date().toISOString(),
    currentSlotId:null,
    supersetDisabledGroups:[],
    exercises:w.exercises.map((def,index)=>{
      const plannedSets = isDeload ? deloadSets(def.sets) : def.sets;
      return {
        slotId:`${id}-${index}`,
        prescribedExerciseId:def.id,
        prescribedName:def.name,
        actualExerciseId:def.id,
        actualName:def.name,
        isSubstitution:false,
        plannedSets,
        minReps:def.minReps,
        maxReps:def.maxReps,
        restSeconds:def.restSeconds || state.settings.defaultRestSeconds || 90,
        increment:def.increment || 5,
        supersetGroup:def.supersetGroup || null,
        supersetOrder:def.supersetOrder || null,
        rpe:"",
        sessionNote:"",
        suggestedWeight:suggestionForDefinition(def,state.currentWeek),
        sets:Array.from({length:plannedSets},(_,i)=>({index:i+1,weight:"",reps:"",done:false}))
      };
    })
  };
  save("start-workout");
  view="workout";
  render();
}

function updateSet(slotId,idx,key,value){
  const ex=activeExerciseBySlot(slotId); if(!ex) return;
  ex.sets[idx][key]=value;
  state.activeWorkout.currentSlotId=slotId;
  save("set-entry");
}
function setRpe(slotId,value){
  const ex=activeExerciseBySlot(slotId); if(!ex) return;
  ex.rpe=value;
  save("rpe");
}
function updateSessionNote(slotId,value){
  const ex=activeExerciseBySlot(slotId); if(!ex) return;
  ex.sessionNote=value;
  save("session-note");
}
function updateSetupNote(slotId,value){
  const ex=activeExerciseBySlot(slotId); if(!ex) return;
  state.exerciseNotes[ex.actualExerciseId]=value;
  save("setup-note");
}
function useSuggestion(slotId){
  const ex=activeExerciseBySlot(slotId); if(!ex || ex.suggestedWeight==="") return;
  ex.sets.forEach(s=>{ if(!s.weight) s.weight=String(ex.suggestedWeight); });
  save("use-suggestion"); render();
}
function supersetDisabled(group){ return !!state.activeWorkout?.supersetDisabledGroups?.includes(group); }
function toggleSuperset(group){
  if(!state.activeWorkout || !group) return;
  const arr=state.activeWorkout.supersetDisabledGroups;
  const i=arr.indexOf(group);
  if(i>=0) arr.splice(i,1); else arr.push(group);
  save("superset-override"); render();
}
function supersetPartner(ex){
  if(!ex?.supersetGroup) return null;
  return state.activeWorkout.exercises.find(x=>x.supersetGroup===ex.supersetGroup && x.slotId!==ex.slotId);
}
function toggleDone(slotId,idx){
  const ex=activeExerciseBySlot(slotId); if(!ex) return;
  const becomingDone=!ex.sets[idx].done;
  ex.sets[idx].done=becomingDone;
  state.activeWorkout.currentSlotId=slotId;
  save("set-complete");
  render();
  if(!becomingDone) return;
  initAudio();
  if(ex.supersetGroup && !supersetDisabled(ex.supersetGroup) && Number(ex.supersetOrder)===1){
    const partner=supersetPartner(ex);
    if(partner){
      state.activeWorkout.currentSlotId=partner.slotId;
      save("superset-next",false);
      render();
      return;
    }
  }
  startTimer(ex.restSeconds,slotId,ex.actualName);
}

function sortedSubstitutes(def){
  const usage=state.substitutionUse?.[def.id] || {};
  return [...(def.substitutes || [])].sort((a,b)=>(usage[b.id]||0)-(usage[a.id]||0));
}
function openSubstitutes(slotId){ modal={type:"substitute",slotId}; render(); }
function chooseSubstitute(slotId,subId,subName){
  const ex=activeExerciseBySlot(slotId); const def=activeDefForSlot(slotId); if(!ex||!def) return;
  if(subId===def.id){
    ex.actualExerciseId=def.id; ex.actualName=def.name; ex.isSubstitution=false;
  } else {
    const allowed=(def.substitutes||[]).find(s=>s.id===subId);
    if(!allowed) return;
    ex.actualExerciseId=allowed.id; ex.actualName=allowed.name; ex.isSubstitution=true;
  }
  // Weight recommendation intentionally remains based on the prescribed exercise history.
  ex.suggestedWeight=suggestionForDefinition(def,state.currentWeek);
  save("substitution"); modal=null; render();
}

function cancelWorkout(){
  if(confirm("Discard this active workout?")){
    state.activeWorkout=null; stopTimer(false); save("discard-workout"); view="home"; render();
  }
}

function priorSetsForExercise(exId){
  return allHistoryForExercise(exId).flatMap(h=>completedSets(h));
}
function detectPRs(activeWorkout){
  if(activeWorkout.isDeload) return [];
  const prs=[];
  activeWorkout.exercises.forEach(ex=>{
    const curr=ex.sets.filter(s=>s.done && Number(s.weight)>0 && Number(s.reps)>0).map(s=>({weight:Number(s.weight),reps:Number(s.reps)}));
    if(!curr.length) return;
    const prior=priorSetsForExercise(ex.actualExerciseId).map(s=>({weight:Number(s.weight),reps:Number(s.reps)}));
    const priorMax=prior.length ? Math.max(...prior.map(s=>s.weight)) : -Infinity;
    const currentMax=Math.max(...curr.map(s=>s.weight));
    if(currentMax>priorMax) prs.push(`${ex.actualName}: heaviest weight ${formatWeight(currentMax)} lb`);
    const byRep={};
    prior.forEach(s=>byRep[s.reps]=Math.max(byRep[s.reps] ?? -Infinity,s.weight));
    const bestCurr={};
    curr.forEach(s=>bestCurr[s.reps]=Math.max(bestCurr[s.reps] ?? -Infinity,s.weight));
    Object.entries(bestCurr).forEach(([reps,weight])=>{
      if(weight>(byRep[reps] ?? -Infinity)) prs.push(`${ex.actualName}: ${reps}-rep PR at ${formatWeight(weight)} lb`);
    });
  });
  return [...new Set(prs)];
}
function progressedExercises(activeWorkout){
  if(activeWorkout.isDeload) return [];
  return activeWorkout.exercises.filter(ex=>{
    if(ex.isSubstitution) return false;
    const done=ex.sets.filter(s=>s.done);
    return done.length>=ex.plannedSets && done.slice(0,ex.plannedSets).every(s=>Number(s.reps)>=Number(ex.maxReps));
  }).map(ex=>ex.actualName);
}
function finishWorkout(){
  const a=state.activeWorkout; if(!a) return;
  const incomplete=a.exercises.reduce((n,e)=>n+e.sets.filter(s=>!s.done).length,0);
  if(incomplete && !confirm(`${incomplete} working set${incomplete===1?" is":"s are"} not marked complete. Finish anyway?`)) return;
  const finishedAt=new Date().toISOString();
  const durationMinutes=Math.max(1,Math.round((new Date(finishedAt)-new Date(a.startedAt))/60000));
  const totalSets=a.exercises.reduce((n,e)=>n+e.sets.filter(s=>s.done).length,0);
  const prs=detectPRs(a);
  const progressed=progressedExercises(a);
  a.exercises.forEach(ex=>{
    if(ex.isSubstitution){
      state.substitutionUse[ex.prescribedExerciseId] ||= {};
      state.substitutionUse[ex.prescribedExerciseId][ex.actualExerciseId]=(state.substitutionUse[ex.prescribedExerciseId][ex.actualExerciseId]||0)+1;
    }
  });
  const saved={
    ...a,
    finishedAt,
    date:finishedAt,
    durationMinutes,
    totalSets,
    prs,
    progressedExercises:progressed
  };
  state.completedWorkouts.push(saved);
  const completedWorkoutId=a.workoutId;
  const completedWeek=a.week;
  state.activeWorkout=null;
  stopTimer(false);
  let nextText="";
  if(completedWorkoutId!=="C"){
    state.nextWorkoutId=completedWorkoutId==="A"?"B":"C";
    nextText=`Week ${state.currentWeek} · ${workoutById(state.nextWorkoutId)?.name || state.nextWorkoutId}`;
  } else if(completedWeek < Number(state.currentBlock.weeks || 5)){
    state.currentWeek=completedWeek+1;
    state.nextWorkoutId="A";
    nextText=`Week ${state.currentWeek} · ${workoutById("A")?.name || "Workout A"}`;
  } else {
    state.blockComplete=true;
    state.nextWorkoutId=null;
    nextText="Block complete";
    if(state.approvedPendingProgram){
      const p=state.approvedPendingProgram;
      activateProgram(p,false);
      nextText=`New block activated · ${state.currentBlock.name}`;
    }
  }
  save("workout-complete");
  view="home";
  modal={type:"complete",workoutName:a.workoutName,durationMinutes,totalSets,prs,progressed,nextText};
  render();
}

function activateProgram(program,doSave=true){
  if(!program?.workouts) return;
  indexProgramExercises(program);
  state.currentBlock=structuredClone(program);
  state.activeProgramVersion=Number(program.version || state.activeProgramVersion+1);
  state.currentWeek=1;
  state.nextWorkoutId="A";
  state.blockComplete=false;
  state.activeWorkout=null;
  state.approvedPendingProgram=null;
  state.availableProgram=null;
  if(doSave) save("program-activated");
}
async function checkRemoteProgram(){
  try{
    const res=await fetch(`program.json?t=${Date.now()}`,{cache:"no-store"});
    if(!res.ok) return;
    const p=await res.json();
    indexProgramExercises(p);
    if(Number(p.version)>Number(state.activeProgramVersion) && Number(p.version)!==Number(state.approvedPendingProgram?.version || 0)){
      state.availableProgram=p;
      save("remote-program-found",false);
      render();
    }
  } catch {}
}
function reviewRemoteProgram(){ if(state.availableProgram || state.approvedPendingProgram){ view="programReview"; modal=null; render(); } }
function approveRemoteProgram(){
  const p=state.availableProgram;
  if(!p) return;
  state.approvedPendingProgram=p;
  state.availableProgram=null;
  if(state.blockComplete) activateProgram(p,false);
  save("program-approved");
  view="program"; render();
}

/* ---------- Timer ---------- */
function formatTime(sec){
  const safe=Math.max(0,Math.round(sec||0));
  return `${String(Math.floor(safe/60)).padStart(2,"0")}:${String(safe%60).padStart(2,"0")}`;
}
function initAudio(){
  try{
    if(!audioContext){ const Ctx=window.AudioContext||window.webkitAudioContext; if(Ctx) audioContext=new Ctx(); }
    if(audioContext?.state==="suspended") audioContext.resume();
  } catch {}
}
function beep(){
  try{
    initAudio();
    if(audioContext){
      [0,.18,.36].forEach(delay=>{
        const osc=audioContext.createOscillator(), gain=audioContext.createGain();
        osc.frequency.value=880;
        gain.gain.setValueAtTime(.0001,audioContext.currentTime+delay);
        gain.gain.exponentialRampToValueAtTime(.18,audioContext.currentTime+delay+.01);
        gain.gain.exponentialRampToValueAtTime(.0001,audioContext.currentTime+delay+.12);
        osc.connect(gain); gain.connect(audioContext.destination);
        osc.start(audioContext.currentTime+delay); osc.stop(audioContext.currentTime+delay+.14);
      });
    }
  } catch {}
  try{ if(navigator.vibrate) navigator.vibrate([180,100,180,100,260]); } catch {}
}
function ensureTicker(){
  if(timer.intervalId) return;
  timer.intervalId=setInterval(()=>{
    if(timer.running){
      timer.remaining=Math.max(0,Math.ceil((timer.endAt-Date.now())/1000));
      if(timer.remaining<=0){ timer.running=false; if(!timer.alertFired){timer.alertFired=true;beep();} }
      updateTimerDisplays();
    }
  },250);
}
function startTimer(seconds,slotId=null,exerciseName=null){
  const s=Math.max(1,Number(seconds||timer.selectedSeconds||90));
  timer.selectedSeconds=s; timer.remaining=s; timer.endAt=Date.now()+s*1000; timer.running=true; timer.alertFired=false;
  timer.exerciseSlotId=slotId; timer.exerciseName=exerciseName;
  ensureTicker(); updateTimerDisplays();
}
function pauseTimer(){
  if(timer.running){ timer.remaining=Math.max(0,Math.ceil((timer.endAt-Date.now())/1000)); timer.running=false; }
  else if(timer.remaining>0){ initAudio(); timer.endAt=Date.now()+timer.remaining*1000; timer.running=true; timer.alertFired=false; ensureTicker(); }
  updateTimerDisplays();
}
function stopTimer(reset=true){
  timer.running=false; timer.alertFired=false;
  if(reset) timer.remaining=timer.selectedSeconds;
  timer.exerciseSlotId=null; timer.exerciseName=null;
  updateTimerDisplays();
}
function addTimerSeconds(sec){
  if(timer.running){ timer.endAt+=Number(sec)*1000; timer.remaining=Math.max(0,Math.ceil((timer.endAt-Date.now())/1000)); }
  else { timer.remaining=Math.max(0,timer.remaining+Number(sec)); if(timer.remaining) timer.selectedSeconds=timer.remaining; }
  updateTimerDisplays();
}
function setTimerPreset(sec){ timer.selectedSeconds=Number(sec); timer.remaining=Number(sec); timer.running=false; timer.alertFired=false; timer.exerciseSlotId=null; timer.exerciseName=null; initAudio(); updateTimerDisplays(); }
function timerToggle(){ if(timer.remaining<=0) startTimer(timer.selectedSeconds); else pauseTimer(); }
function updateTimerDisplays(){
  const text=formatTime(timer.remaining);
  const big=document.getElementById("bigTimerText"); if(big) big.textContent=text;
  const status=document.getElementById("bigTimerStatus"); if(status) status.textContent=timer.remaining===0?"GO":(timer.running?"RESTING":"READY");
  const tog=document.getElementById("timerToggle"); if(tog) tog.textContent=timer.running?"Pause":(timer.remaining===0?"Restart":"Start");
  document.querySelectorAll("[data-rest-countdown]").forEach(el=>el.textContent=text);
}
function exerciseTimerHtml(ex){
  if(timer.exerciseSlotId!==ex.slotId) return "";
  if(!timer.running && timer.remaining===timer.selectedSeconds) return "";
  return `<div class="exercise-timer">
    <div><div class="eyebrow light">${timer.remaining===0?"Start next set":(timer.running?"Rest":"Paused")}</div><div class="exercise-timer-time" data-rest-countdown>${formatTime(timer.remaining)}</div></div>
    <div class="rest-actions"><button onclick="addTimerSeconds(30)">+30</button><button onclick="stopTimer(true);render()">Skip</button></div>
  </div>`;
}

/* ---------- Garage / Basement generator ---------- */
function shuffle(arr){ const c=[...arr]; for(let i=c.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[c[i],c[j]]=[c[j],c[i]];} return c; }
function nextGymMuscles(){
  const w=workoutById(state.nextWorkoutId); return new Set((w?.exercises||[]).flatMap(e=>e.muscles||[]));
}
function chooseHomeExercise(pool,role,used,nextMuscles){
  let candidates=pool.filter(e=>e.role===role && !used.has(e.name));
  if(!candidates.length) candidates=pool.filter(e=>!used.has(e.name));
  if(!candidates.length) return null;
  const ranked=candidates.map(e=>({e,score:Math.random() - ((e.muscles||[]).some(m=>nextMuscles.has(m)) ? .12*Number(e.intensity||1) : 0)})).sort((a,b)=>b.score-a.score);
  used.add(ranked[0].e.name); return ranked[0].e;
}
function homeRounds(style,duration){
  if(style==="mobility") return duration<=20?2:3;
  if(duration===10) return 2; if(duration===20) return 3; if(duration===30) return 3; return 4;
}
function treadmillMinutes(duration){ return duration===10?5:duration===20?8:duration===30?10:15; }
function homePrescription(ex,style,duration){
  if(ex.name.includes("Treadmill") || ex.name.includes("Incline Walk")){
    if(ex.name.includes("Fast Intervals")) return `${Math.max(4,Math.round(treadmillMinutes(duration)/1.5))} rounds · ${ex.rx}`;
    return `${treadmillMinutes(duration)} min · ${ex.rx}`;
  }
  const rounds=homeRounds(style,duration);
  return `${rounds} rounds · ${ex.rx}`;
}
function buildHomeWorkout(){
  const g=state.homeGenerator;
  const pool=HOME_POOLS[g.location][g.style];
  const nextMuscles=nextGymMuscles();
  const used=new Set();
  const count=g.duration===10?3:g.duration===20?4:g.duration===30?5:6;
  let roles;
  if(g.style==="move") roles=["cardio","lower","pull","push","carry","core","hinge"];
  else if(g.style==="condition") roles=["cardio","hinge","carry","upper","core","pull","lower"];
  else roles=["cardio","mobility","core","hamstring","upper","lower","carry"];
  const chosen=[];
  if(g.location==="basement" && g.style==="condition"){
    const tread=shuffle(pool.filter(e=>e.role==="cardio"))[0]; if(tread){chosen.push(tread);used.add(tread.name);}
  }
  for(const role of roles){
    if(chosen.length>=count) break;
    const e=chooseHomeExercise(pool,role,used,nextMuscles); if(e) chosen.push(e);
  }
  while(chosen.length<count){ const e=chooseHomeExercise(pool,"any",used,nextMuscles); if(!e) break; chosen.push(e); }
  g.generated={
    id:Date.now(), createdAt:new Date().toISOString(), location:g.location, duration:g.duration, style:g.style,
    exercises:chosen.map(e=>({name:e.name,prescription:homePrescription(e,g.style,g.duration)})),
    note:g.style==="condition"?"Work at a sustainable conditioning effort. This is movement work, not a replacement for your gym strength session.":"Keep the session comfortable to moderate and finish feeling better than you started."
  };
  save("home-generator",false); render();
}
function setHomeLocation(loc){ state.homeGenerator.location=loc; state.homeGenerator.generated=null; save("home-setting"); render(); }
function setHomeDuration(min){ state.homeGenerator.duration=Number(min); state.homeGenerator.generated=null; save("home-setting"); render(); }
function setHomeStyle(style){ state.homeGenerator.style=style; state.homeGenerator.generated=null; save("home-setting"); render(); }
function clearGeneratedHomeWorkout(){ state.homeGenerator.generated=null; save("home-clear",false); render(); }

/* ---------- Charts ---------- */
function exerciseHistorySeries(exId){
  return [...allHistoryForExercise(exId)].reverse().map(h=>{
    const sets=completedSets(h);
    if(!sets.length) return null;
    const bestWeight=Math.max(...sets.map(s=>Number(s.weight)));
    const e1rm=Math.max(...sets.map(s=>Number(s.weight)*(1+Number(s.reps)/30)));
    return {date:new Date(h.date),weight:bestWeight,e1rm,workoutName:h.workoutName};
  }).filter(Boolean);
}
function filteredSeries(series){
  if(chartFilter==="all") return series;
  const weeks=Number(chartFilter); const cutoff=Date.now()-weeks*7*24*3600*1000;
  return series.filter(p=>p.date.getTime()>=cutoff);
}
function setChartMode(mode){ chartMode=mode; render(); }
function setChartFilter(value){ chartFilter=value; render(); }
function drawProgressChart(exId){
  const canvas=document.getElementById("progressChart"); if(!canvas) return;
  const data=filteredSeries(exerciseHistorySeries(exId));
  const rect=canvas.getBoundingClientRect(); const dpr=Math.max(1,window.devicePixelRatio||1);
  const width=Math.max(280,rect.width||320),height=220;
  canvas.width=width*dpr; canvas.height=height*dpr; canvas.style.height=height+"px";
  const ctx=canvas.getContext("2d"); ctx.scale(dpr,dpr); ctx.clearRect(0,0,width,height);
  ctx.font="12px system-ui"; ctx.fillStyle="#6b7280";
  if(data.length<1){ctx.fillText("No chart data yet.",16,30);return;}
  const vals=data.map(p=>chartMode==="weight"?p.weight:p.e1rm);
  let min=Math.min(...vals),max=Math.max(...vals); if(min===max){min-=5;max+=5;}
  const pad={l:44,r:12,t:16,b:32}; const cw=width-pad.l-pad.r,ch=height-pad.t-pad.b;
  ctx.strokeStyle="#e5e7eb"; ctx.lineWidth=1;
  for(let i=0;i<4;i++){const y=pad.t+(ch*i/3);ctx.beginPath();ctx.moveTo(pad.l,y);ctx.lineTo(width-pad.r,y);ctx.stroke();const val=max-(max-min)*i/3;ctx.fillStyle="#6b7280";ctx.fillText(String(Math.round(val)),4,y+4);}
  ctx.strokeStyle="#111827";ctx.lineWidth=2;ctx.beginPath();
  data.forEach((p,i)=>{const x=pad.l+(data.length===1?cw/2:cw*i/(data.length-1));const v=chartMode==="weight"?p.weight:p.e1rm;const y=pad.t+ch-(v-min)/(max-min)*ch;i?ctx.lineTo(x,y):ctx.moveTo(x,y);});ctx.stroke();
  ctx.fillStyle="#111827";data.forEach((p,i)=>{const x=pad.l+(data.length===1?cw/2:cw*i/(data.length-1));const v=chartMode==="weight"?p.weight:p.e1rm;const y=pad.t+ch-(v-min)/(max-min)*ch;ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();});
  ctx.fillStyle="#6b7280";const first=data[0].date.toLocaleDateString(undefined,{month:"short",day:"numeric"});const last=data[data.length-1].date.toLocaleDateString(undefined,{month:"short",day:"numeric"});ctx.fillText(first,pad.l,height-9);const m=ctx.measureText(last).width;ctx.fillText(last,width-pad.r-m,height-9);
}

/* ---------- Views ---------- */
function nav(v){ view=v; modal=null; render(); updateTimerDisplays(); }
function homeView(){
  const next=state.nextWorkoutId?workoutById(state.nextWorkoutId):null;
  const last=[...state.completedWorkouts].sort((a,b)=>new Date(b.finishedAt||b.date)-new Date(a.finishedAt||a.date))[0];
  return `<div class="topbar"><div class="toprow"><div><h1>Workout Tracker</h1><div class="subtle">${escapeHtml(state.currentBlock.name)}</div></div><span class="pill">V3</span></div></div>
  <main class="content">
    ${state.activeWorkout?`<div class="card"><div class="eyebrow">In progress</div><h2>${escapeHtml(state.activeWorkout.workoutName)}</h2><button class="btn" onclick="nav('workout')">Resume workout</button></div>`:""}
    ${state.availableProgram?`<div class="card update-card"><div class="eyebrow">New program available</div><h3>${escapeHtml(state.availableProgram.name)}</h3><button class="btn" onclick="reviewRemoteProgram()">Review program</button></div>`:""}
    ${state.approvedPendingProgram?`<div class="card"><div class="eyebrow">Approved for next block</div><h3>${escapeHtml(state.approvedPendingProgram.name)}</h3><div class="subtle">It will activate after the current block is finished.</div></div>`:""}
    <div class="card hero">
      <div class="eyebrow">${state.blockComplete?"Block complete":`Week ${state.currentWeek} of ${state.currentBlock.weeks}`}</div>
      <div class="big">${state.blockComplete?"Nice work":escapeHtml(next?.name || "Choose workout")}</div>
      <div class="subtle">${last?`Last completed: ${escapeHtml(last.workoutName)} · ${new Date(last.finishedAt||last.date).toLocaleDateString()}`:"No completed workouts yet"}</div>
      ${next?`<div style="margin-top:16px"><button class="btn" onclick="startWorkout('${next.id}')">Start ${escapeHtml(next.name)}</button></div>`:""}
    </div>
    ${!state.blockComplete?`<div class="card"><h3>Choose a different workout</h3><div class="subtle" style="margin-bottom:12px">Override the recommendation anytime.</div><div class="grid">${state.currentBlock.workouts.map(w=>`<button class="workout-choice ${w.id===state.nextWorkoutId?'active':''}" onclick="startWorkout('${w.id}')">${w.id}</button>`).join("")}</div></div>`:""}
    <div class="card"><h3>Garage / Basement workout</h3><div class="subtle" style="margin-bottom:12px">Disposable movement, conditioning, and mobility sessions. They do not alter your gym progression.</div><button class="btn secondary" onclick="nav('homegen')">Generate home workout</button></div>
  </main>`;
}

function supersetBanner(ex){
  if(!ex.supersetGroup) return "";
  const partner=supersetPartner(ex); const disabled=supersetDisabled(ex.supersetGroup);
  return `<div class="superset-banner"><div><strong>${disabled?"Superset disabled today":`Superset ${ex.supersetOrder===1?'A1':'A2'}`}</strong><div class="subtle">${disabled?"Each exercise gets its own rest timer.":`${ex.supersetOrder===1?'Then':'After'} ${escapeHtml(partner?.actualName || partner?.prescribedName || '')}${ex.supersetOrder===2?' → rest':''}`}</div></div><button class="btn ghost small" onclick="toggleSuperset('${ex.supersetGroup}')">${disabled?"Use superset":"Do separately"}</button></div>`;
}
function workoutView(){
  if(!state.activeWorkout) return `<div class="topbar"><h1>Workout</h1></div><div class="content"><div class="empty">No active workout.</div></div>`;
  const a=state.activeWorkout;
  return `<div class="topbar"><div class="toprow"><div><div class="eyebrow">Week ${a.week}${a.isDeload?' · Deload':''}</div><h1>${escapeHtml(a.workoutName)}</h1></div><button class="btn ghost small" onclick="cancelWorkout()">Discard</button></div></div>
  <main class="content">
    ${a.isDeload?`<div class="card deload"><strong>Deload week</strong><div class="subtle">Reduced sets and ~90% of your last normal working weight. This work is ignored for future progression calculations.</div></div>`:""}
    ${a.exercises.map((ex,i)=>{
      const def=activeDefForSlot(ex.slotId); const hist=lastNormalHistory(ex.prescribedExerciseId); const note=state.exerciseNotes[ex.actualExerciseId]||"";
      const cue=a.currentSlotId===ex.slotId && ex.supersetGroup && !supersetDisabled(ex.supersetGroup) ? `<div class="next-cue">Current superset exercise</div>`:"";
      return `<div class="card exercise-card">
        ${exerciseTimerHtml(ex)}${cue}${supersetBanner(ex)}
        <div class="exercise-head"><div><button class="exercise-title" onclick="openHistory('${ex.actualExerciseId}')">${escapeHtml(ex.actualName)}</button><div class="rx">${ex.plannedSets} × ${ex.minReps}–${ex.maxReps}${a.isDeload?' · deload':''}</div>${ex.isSubstitution?`<div class="subtle">Substituting for ${escapeHtml(ex.prescribedName)}</div>`:""}</div><span class="pill">${i+1}/${a.exercises.length}</span></div>
        <div class="row wrap" style="margin-top:10px"><button class="btn ghost small" onclick="openSubstitutes('${ex.slotId}')">Substitute</button><span class="pill">Rest ${formatTime(ex.restSeconds)}</span></div>
        <div class="last"><strong>Last prescribed exercise:</strong> ${fmtSets(hist)}</div>
        ${ex.suggestedWeight!==""?`<div class="suggest">Suggested starting weight: <strong>${formatWeight(ex.suggestedWeight)} lb</strong> <button class="btn secondary small" style="margin-left:8px" onclick="useSuggestion('${ex.slotId}')">Use</button></div>`:`<div class="suggest">No suggested weight yet — establish one today.</div>`}
        ${note?`<div class="note"><strong>Setup:</strong> ${escapeHtml(note)}</div>`:""}
        <div class="labels"><span>Set</span><span>Weight</span><span>Reps</span><span>Done</span></div>
        ${ex.sets.map((s,idx)=>`<div class="setrow"><strong style="text-align:center">${idx+1}</strong><input class="field" type="number" inputmode="decimal" placeholder="${ex.suggestedWeight!==''?formatWeight(ex.suggestedWeight):'lb'}" value="${escapeAttr(s.weight)}" onchange="updateSet('${ex.slotId}',${idx},'weight',this.value)"><input class="field" type="number" inputmode="numeric" placeholder="reps" value="${escapeAttr(s.reps)}" onchange="updateSet('${ex.slotId}',${idx},'reps',this.value)"><button class="check ${s.done?'done':''}" onclick="toggleDone('${ex.slotId}',${idx})">${s.done?'✓':''}</button></div>`).join("")}
        <div class="rpe-row"><label><strong>Exercise RPE</strong><div class="subtle">Optional · one rating for the whole exercise</div></label><select onchange="setRpe('${ex.slotId}',this.value)"><option value="">—</option>${[1,2,3,4,5,6,7,8,9,10].map(n=>`<option value="${n}" ${String(ex.rpe)===String(n)?'selected':''}>${n}</option>`).join("")}</select></div>
        <hr><div class="subtle" style="margin-bottom:5px"><strong>Permanent setup note</strong></div><textarea onchange="updateSetupNote('${ex.slotId}',this.value)" placeholder="Seat position, grip, handle, foot position...">${escapeHtml(note)}</textarea>
        <div class="subtle" style="margin:10px 0 5px"><strong>Today's note</strong></div><textarea onchange="updateSessionNote('${ex.slotId}',this.value)" placeholder="Anything specific to today's session...">${escapeHtml(ex.sessionNote)}</textarea>
      </div>`;
    }).join("")}
    <button class="btn" style="width:100%;padding:16px" onclick="finishWorkout()">Complete workout</button>
  </main>`;
}

function timerView(){
  return `<div class="topbar"><div class="toprow"><div><h1>Timer</h1><div class="subtle">Big enough to see across the gym.</div></div></div></div><main class="content">
    <div class="timer-stage"><div id="bigTimerStatus" class="timer-caption">${timer.remaining===0?'GO':(timer.running?'RESTING':'READY')}</div><div id="bigTimerText" class="timer-digits">${formatTime(timer.remaining)}</div><div class="timer-main-actions"><button id="timerToggle" class="btn timer-light" onclick="timerToggle()">${timer.running?'Pause':'Start'}</button><button class="btn timer-dark" onclick="stopTimer(true);render()">Reset</button></div><div class="timer-secondary"><button class="btn timer-dark" onclick="addTimerSeconds(30)">+30 sec</button><button class="btn timer-dark" onclick="addTimerSeconds(-30)">−30 sec</button></div></div>
    <div class="timer-presets">${[60,90,120,180].map(s=>`<button onclick="setTimerPreset(${s});render()">${formatTime(s)}</button>`).join("")}</div>
    <div class="card" style="margin-top:12px"><h3>Workout timers</h3><div class="subtle">During a workout, the programmed rest time starts automatically after a completed set and appears directly above that exercise. Supersets rest after A2 unless you tap “Do separately.”</div></div>
  </main>`;
}

function homeGeneratorView(){
  const g=state.homeGenerator, generated=g.generated, inventory=g.location==="garage"?GARAGE_INVENTORY:BASEMENT_INVENTORY;
  return `<div class="topbar"><h1>At-Home Generator</h1><div class="subtle">Movement days, not replacement strength sessions.</div></div><main class="content">
    <div class="card"><div class="eyebrow">Location</div><div class="segmented"><button class="${g.location==='garage'?'selected':''}" onclick="setHomeLocation('garage')">Garage</button><button class="${g.location==='basement'?'selected':''}" onclick="setHomeLocation('basement')">Basement</button></div>
      <div class="eyebrow" style="margin-top:16px">Time</div><div class="segmented four">${[10,20,30,45].map(m=>`<button class="${g.duration===m?'selected':''}" onclick="setHomeDuration(${m})">${m} min</button>`).join("")}</div>
      <div class="eyebrow" style="margin-top:16px">Workout type</div><div class="segmented three">${[["move","Move"],["condition","Condition"],["mobility","Mobility + Core"]].map(([v,l])=>`<button class="${g.style===v?'selected':''}" onclick="setHomeStyle('${v}')">${l}</button>`).join("")}</div>
    </div>
    <div class="card"><h3>${g.location==='garage'?'Garage':'Basement'} equipment</h3><div class="inventory-list">${inventory.map(x=>`<span class="pill">${escapeHtml(x)}</span>`).join("")}</div>${g.location==='basement'?`<div class="note"><strong>Basement rule:</strong> treadmill work is emphasized for conditioning. Weighted-vest work is walking only; faster intervals are done without the vest. No jump rope.</div>`:`<div class="note"><strong>Garage rule:</strong> TRX and jump ropes are available here. Sessions stay movement/conditioning focused rather than trying to duplicate heavy gym work.</div>`}</div>
    <button class="btn" style="width:100%;padding:16px" onclick="buildHomeWorkout()">${generated?'Generate another workout':'Generate workout'}</button>
    ${generated?`<div class="card" style="margin-top:12px"><div class="row between"><div><div class="eyebrow">${generated.location==='garage'?'Garage':'Basement'} · ${generated.duration} min · ${generated.style==='mobility'?'Mobility + Core':generated.style}</div><h2 style="margin-top:5px">Today's one-off workout</h2></div><button class="btn ghost small" onclick="clearGeneratedHomeWorkout()">Clear</button></div><div class="home-plan">${generated.exercises.map((ex,i)=>`<div class="home-exercise"><div class="home-num">${i+1}</div><div><strong>${escapeHtml(ex.name)}</strong><div class="subtle">${escapeHtml(ex.prescription)}</div></div></div>`).join("")}</div><div class="note">${escapeHtml(generated.note)}</div><div class="subtle" style="margin-top:10px">This session is disposable and will not be added to workout history.</div></div>`:""}
  </main>`;
}

function historyExerciseCatalog(){
  const map=new Map();
  state.completedWorkouts.forEach(w=>(w.exercises||[]).forEach(e=>map.set(historyId(e),e.actualName||e.name||EXERCISE_NAME_BY_ID[historyId(e)]||historyId(e))));
  state.currentBlock.workouts.forEach(w=>w.exercises.forEach(e=>{map.set(e.id,e.name);(e.substitutes||[]).forEach(s=>map.set(s.id,s.name));}));
  return [...map.entries()].map(([id,name])=>({id,name})).sort((a,b)=>a.name.localeCompare(b.name));
}
function historyView(){
  const list=historyExerciseCatalog();
  return `<div class="topbar"><h1>Exercise History</h1><div class="subtle">Tap an exercise for history, PRs, and progress charts.</div></div><main class="content">${list.map(ex=>{const h=lastHistory(ex.id,true);return `<div class="card history-card" onclick="openHistory('${ex.id}')"><div class="row between"><h3 style="margin:0">${escapeHtml(ex.name)}</h3><span>›</span></div><div class="last">${h?`${new Date(h.date).toLocaleDateString()} · ${fmtSets(h)}`:"No history yet"}</div>${state.exerciseNotes[ex.id]?`<div class="note">${escapeHtml(state.exerciseNotes[ex.id])}</div>`:""}</div>`;}).join("")}</main>`;
}

function programWorkoutHtml(w){
  const groups=new Set();
  return `<div class="card"><div class="row between"><h2>${escapeHtml(w.name)}</h2><span class="pill">${w.exercises.length} exercises</span></div>${w.exercises.map(e=>{const ss=e.supersetGroup?` · Superset ${e.supersetOrder===1?'A1':'A2'}`:"";return `<div class="history-item"><div class="row between"><strong>${escapeHtml(e.name)}</strong><span>${e.sets} × ${e.minReps}–${e.maxReps}</span></div><div class="subtle">Rest ${formatTime(e.restSeconds)}${ss} · +${e.increment} lb after all sets reach ${e.maxReps}</div></div>`;}).join("")}</div>`;
}
function programView(){
  return `<div class="topbar"><h1>Program</h1><div class="subtle">Week ${state.currentWeek} of ${state.currentBlock.weeks}</div></div><main class="content">
    ${state.availableProgram?`<div class="card update-card"><div class="eyebrow">New program available</div><h3>${escapeHtml(state.availableProgram.name)}</h3><button class="btn" onclick="reviewRemoteProgram()">Review / approve</button></div>`:""}
    ${state.approvedPendingProgram?`<div class="card"><div class="eyebrow">Approved for next block</div><h3>${escapeHtml(state.approvedPendingProgram.name)}</h3><div class="subtle">Activates when this block is complete.</div><button class="btn ghost small" style="margin-top:10px" onclick="reviewRemoteProgram()">Review</button></div>`:""}
    <div class="card"><div class="eyebrow">Current block</div><h2>${escapeHtml(state.currentBlock.name)}</h2><p class="subtle">${escapeHtml(state.currentBlock.summary || '')}</p><div class="note"><strong>Week ${state.currentBlock.deloadWeek} deload:</strong> 90% of the last normal working weight; 4 sets → 3, 3 → 2, 2 → 1. Deload performance is excluded from progression.</div></div>
    ${state.currentBlock.workouts.map(programWorkoutHtml).join("")}
    <div class="card"><h3>Data & cloud backup</h3><div class="subtle" style="margin-bottom:12px">Manage automatic cloud backup, sign-in, and manual export.</div><button class="btn secondary" onclick="nav('settings')">Open settings</button></div>
  </main>`;
}
function programReviewView(){
  const p=state.availableProgram || state.approvedPendingProgram;
  if(!p) return programView();
  return `<div class="topbar"><div class="toprow"><div><h1>Review New Program</h1><div class="subtle">Nothing changes until you approve it.</div></div><button class="btn ghost small" onclick="nav('program')">Back</button></div></div><main class="content"><div class="card"><div class="eyebrow">What changes</div><h2>${escapeHtml(p.name)}</h2><p>${escapeHtml(p.summary || 'New training block')}</p></div>${p.workouts.map(programWorkoutHtml).join("")}${state.availableProgram?`<button class="btn" style="width:100%;padding:16px" onclick="approveRemoteProgram()">Approve for next block</button>`:`<div class="card"><strong>Approved</strong><div class="subtle">This program is queued for the next block.</div></div>`}</main>`;
}

function cloudPanelHtml(){
  const c=window.cloudBackupStatus || {configured:false,user:null,lastBackup:null,message:"Cloud backup setup has not been completed yet."};
  if(!c.configured){
    return `<div class="card"><h3>Automatic cloud backup</h3><p class="subtle">The app is ready for Google sign-in and email/password backup, but the one-time Firebase connection still needs to be configured.</p><div class="note">Your local data and manual export continue to work normally. See FIREBASE_SETUP.md in the update package when you're ready to turn cloud backup on.</div></div>`;
  }
  if(c.user){
    return `<div class="card"><h3>Automatic cloud backup</h3><div class="success">Signed in as ${escapeHtml(c.user.email || 'user')}</div><p class="subtle">Changes back up automatically after workouts, notes, and settings changes.${c.lastBackup?` Last backup: ${new Date(c.lastBackup).toLocaleString()}.`:''}</p><button class="btn ghost" onclick="window.cloudSignOut?.()">Sign out</button></div>`;
  }
  return `<div class="card"><h3>Automatic cloud backup</h3><p class="subtle">Sign in to protect your workout data and restore it on a replacement phone.</p><button class="btn" onclick="window.cloudGoogleSignIn?.()">Continue with Google</button><hr><div class="form-stack"><input id="cloudEmail" type="email" placeholder="Email"><input id="cloudPassword" type="password" placeholder="Password"><div class="row wrap"><button class="btn secondary" onclick="window.cloudEmailSignIn?.(document.getElementById('cloudEmail').value,document.getElementById('cloudPassword').value)">Sign in</button><button class="btn ghost" onclick="window.cloudEmailCreate?.(document.getElementById('cloudEmail').value,document.getElementById('cloudPassword').value)">Create account</button></div></div>${c.message?`<div class="subtle" style="margin-top:10px">${escapeHtml(c.message)}</div>`:""}</div>`;
}
function settingsView(){
  return `<div class="topbar"><h1>Settings</h1></div><main class="content"><div id="cloudPanel">${cloudPanelHtml()}</div><div class="card"><h3>Manual backup</h3><p class="subtle">Useful as an extra safety copy even after cloud backup is enabled.</p><button class="btn secondary" onclick="exportData()">Export backup</button><button class="btn ghost" style="margin-left:6px" onclick="document.getElementById('importFile').click()">Import backup</button><input id="importFile" type="file" accept="application/json" style="display:none" onchange="importData(this.files[0])"></div><div class="card"><h3>Reset</h3><p class="subtle">Erase local history and restart the current program. Cloud data is not deleted by this button.</p><button class="btn danger" onclick="resetApp()">Reset local app</button></div></main>`;
}
window.renderCloudPanel=function(){ if(view==="settings") render(); };

function openHistory(exId){ chartMode="weight";chartFilter="all";modal={type:"history",exId:normalizeHistoricalId(exId)};render(); }
function closeModal(){ modal=null; render(); }
function modalHtml(){
  if(!modal) return "";
  if(modal.type==="complete"){
    return `<div class="modalback" onclick="closeModal()"><div class="modal" onclick="event.stopPropagation()"><div class="eyebrow">Workout complete</div><h2>${escapeHtml(modal.workoutName)}</h2><div class="summary-grid"><div><strong>${modal.durationMinutes}</strong><span>minutes</span></div><div><strong>${modal.totalSets}</strong><span>working sets</span></div><div><strong>${modal.prs.length}</strong><span>PRs</span></div><div><strong>${modal.progressed.length}</strong><span>progressed</span></div></div>${modal.prs.length ? `<h3>Personal records</h3>${modal.prs.map(x=>`<div class="history-item">🏆 ${escapeHtml(x)}</div>`).join("")}` : `<p class="subtle">No PRs this session.</p>`}${modal.progressed.length?`<h3 style="margin-top:16px">Exercises progressed</h3><div class="subtle">${modal.progressed.map(escapeHtml).join(" · ")}</div>`:""}<hr><div class="success">Next: ${escapeHtml(modal.nextText)}</div><button class="btn" style="margin-top:14px" onclick="closeModal()">Done</button></div></div>`;
  }
  if(modal.type==="substitute"){
    const ex=activeExerciseBySlot(modal.slotId),def=activeDefForSlot(modal.slotId); if(!ex||!def) return "";
    const subs=sortedSubstitutes(def);
    return `<div class="modalback" onclick="closeModal()"><div class="modal" onclick="event.stopPropagation()"><div class="row between"><div><div class="eyebrow">Approved substitutions</div><h2>${escapeHtml(def.name)}</h2></div><button class="btn ghost small" onclick="closeModal()">Close</button></div>${ex.actualExerciseId!==def.id?`<button class="sub-option" onclick="chooseSubstitute('${ex.slotId}','${def.id}','${escapeAttr(def.name)}')"><strong>Use prescribed exercise</strong><span>${escapeHtml(def.name)}</span></button>`:""}${subs.length?subs.map(s=>{const n=state.substitutionUse?.[def.id]?.[s.id]||0;return `<button class="sub-option" onclick="chooseSubstitute('${ex.slotId}','${s.id}','${escapeAttr(s.name)}')"><strong>${escapeHtml(s.name)}</strong><span>${n?`Used ${n} time${n===1?'':'s'} · `:''}History stays separate</span></button>`;}).join(""):`<div class="empty">No approved substitutions for this exercise.</div>`}<div class="note">The gray suggested weight still comes from the last completed sets of the prescribed exercise, as requested.</div></div></div>`;
  }
  if(modal.type==="history"){
    const id=modal.exId, name=EXERCISE_NAME_BY_ID[id] || allHistoryForExercise(id)[0]?.actualName || id, hist=allHistoryForExercise(id);
    return `<div class="modalback" onclick="closeModal()"><div class="modal history-modal" onclick="event.stopPropagation()"><div class="row between"><div><div class="eyebrow">Exercise history</div><h2>${escapeHtml(name)}</h2></div><button class="btn ghost small" onclick="closeModal()">Close</button></div>${state.exerciseNotes[id]?`<div class="note"><strong>Setup:</strong> ${escapeHtml(state.exerciseNotes[id])}</div>`:""}<div class="chart-controls"><div class="segmented"><button class="${chartMode==='weight'?'selected':''}" onclick="setChartMode('weight')">Best weight</button><button class="${chartMode==='e1rm'?'selected':''}" onclick="setChartMode('e1rm')">Estimated 1RM</button></div><select onchange="setChartFilter(this.value)"><option value="all" ${chartFilter==='all'?'selected':''}>All history</option><option value="4" ${chartFilter==='4'?'selected':''}>4 weeks</option><option value="8" ${chartFilter==='8'?'selected':''}>8 weeks</option><option value="12" ${chartFilter==='12'?'selected':''}>12 weeks</option><option value="26" ${chartFilter==='26'?'selected':''}>26 weeks</option></select></div><canvas id="progressChart" aria-label="Progress chart"></canvas>${hist.length?hist.map(h=>`<div class="history-item"><div class="history-date">${new Date(h.date).toLocaleDateString()} · ${escapeHtml(h.workoutName || '')}${h.isDeload?' · Deload':''}</div><div class="history-sets">${fmtSets(h)}</div>${h.rpe?`<div class="subtle">RPE ${escapeHtml(h.rpe)}</div>`:""}${h.sessionNote?`<div class="subtle">${escapeHtml(h.sessionNote)}</div>`:""}</div>`).join(""):`<div class="empty">No previous sessions yet.</div>`}</div></div>`;
  }
  return "";
}

function exportData(){ const blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=`workout-tracker-backup-${new Date().toISOString().slice(0,10)}.json`;a.click();URL.revokeObjectURL(url); }
function importData(file){ if(!file) return;const r=new FileReader();r.onload=()=>{try{state=migrateState(JSON.parse(r.result));save("import");render();alert("Backup imported.");}catch{alert("That file could not be imported.");}};r.readAsText(file); }
function resetApp(){ if(confirm("Reset the local app and erase workout history on this device?")){state=defaultState();save("reset");view="home";modal=null;render();} }
function escapeHtml(v=""){return String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}
function escapeAttr(v=""){return escapeHtml(v);}

function render(){
  const body=view==="home"?homeView():view==="workout"?workoutView():view==="timer"?timerView():view==="homegen"?homeGeneratorView():view==="history"?historyView():view==="program"?programView():view==="programReview"?programReviewView():settingsView();
  document.getElementById("app").innerHTML=`<div class="shell">${body}<nav class="nav"><div class="navinner"><button class="${view==='home'?'on':''}" onclick="nav('home')">Home</button><button class="${view==='workout'?'on':''}" onclick="nav('workout')">Workout</button><button class="${view==='timer'?'on':''}" onclick="nav('timer')">Timer</button><button class="${view==='history'?'on':''}" onclick="nav('history')">History</button><button class="${view==='program'||view==='programReview'||view==='settings'?'on':''}" onclick="nav('program')">Program</button></div></nav>${modalHtml()}</div>`;
  updateTimerDisplays();
  if(modal?.type==="history") setTimeout(()=>drawProgressChart(modal.exId),0);
}

save("v3-migration",false);
render();
checkRemoteProgram();
window.addEventListener("cloud-status",()=>{ if(view==="settings") render(); });
if("serviceWorker" in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));}
