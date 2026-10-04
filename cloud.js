(() => {
  const cfg = window.WORKOUT_FIREBASE_CONFIG;
  window.cloudBackupStatus = {configured:false,user:null,lastBackup:null,message:"Cloud backup setup has not been completed yet."};
  const notify = () => { window.dispatchEvent(new CustomEvent("cloud-status")); if(typeof window.renderCloudPanel==="function") window.renderCloudPanel(); };
  if(!cfg || !cfg.apiKey || !cfg.projectId){ notify(); return; }
  let auth, db, api, user=null, backupTimer=null, syncing=false;
  window.cloudBackupStatus.configured=true;
  Promise.all([
    import("https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js"),
    import("https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js"),
    import("https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js")
  ]).then(([appMod,authMod,fireMod])=>{
    const app=appMod.initializeApp(cfg);
    auth=authMod.getAuth(app); db=fireMod.getFirestore(app);
    api={...authMod,...fireMod};
    api.onAuthStateChanged(auth,async u=>{
      user=u || null;
      window.cloudBackupStatus.user=user?{uid:user.uid,email:user.email,displayName:user.displayName}:null;
      window.cloudBackupStatus.message=user?"Signed in. Checking cloud backup…":"Signed out.";
      notify();
      if(user) await syncOnSignIn();
    });
  }).catch(err=>{window.cloudBackupStatus.message=`Cloud setup error: ${err.message}`;notify();});

  function ref(){ return api.doc(db,"users",user.uid,"backups","current"); }
  async function syncOnSignIn(){
    if(!user||syncing) return; syncing=true;
    try{
      const snap=await api.getDoc(ref());
      const local=window.getWorkoutState?.();
      if(snap.exists()){
        const remote=snap.data();
        const localCount=local?.completedWorkouts?.length||0;
        const remoteCount=remote?.state?.completedWorkouts?.length||0;
        const localTime=Date.parse(local?.lastModifiedAt||0)||0;
        const remoteTime=Date.parse(remote?.updatedAt||0)||0;
        if(remote.state && (localCount===0 && remoteCount>0 || remoteTime>localTime)){
          window.restoreStateFromCloud?.(remote.state);
          window.cloudBackupStatus.message="Restored the newer cloud backup.";
          window.cloudBackupStatus.lastBackup=remote.updatedAt||null;
        } else {
          await uploadNow("sign-in sync");
        }
      } else {
        await uploadNow("first backup");
      }
    } catch(err){ window.cloudBackupStatus.message=`Backup error: ${err.message}`; }
    finally{syncing=false;notify();}
  }
  async function uploadNow(reason){
    if(!user||!api||syncing===true && reason!=="sign-in sync" && reason!=="first backup") return;
    const s=window.getWorkoutState?.(); if(!s) return;
    const updatedAt=new Date().toISOString();
    await api.setDoc(ref(),{updatedAt,reason,state:s},{merge:false});
    window.cloudBackupStatus.lastBackup=updatedAt;
    window.cloudBackupStatus.message="Backed up automatically.";
    notify();
  }
  window.requestCloudBackup=(reason="change")=>{
    if(!user||!api) return;
    clearTimeout(backupTimer);
    backupTimer=setTimeout(()=>uploadNow(reason).catch(err=>{window.cloudBackupStatus.message=`Backup error: ${err.message}`;notify();}),1400);
  };
  window.cloudGoogleSignIn=async()=>{
    try{const provider=new api.GoogleAuthProvider();await api.signInWithPopup(auth,provider);}catch(err){window.cloudBackupStatus.message=err.message;notify();}
  };
  window.cloudEmailSignIn=async(email,password)=>{
    try{await api.signInWithEmailAndPassword(auth,email,password);}catch(err){window.cloudBackupStatus.message=err.message;notify();}
  };
  window.cloudEmailCreate=async(email,password)=>{
    try{await api.createUserWithEmailAndPassword(auth,email,password);}catch(err){window.cloudBackupStatus.message=err.message;notify();}
  };
  window.cloudSignOut=async()=>{try{await api.signOut(auth);}catch(err){window.cloudBackupStatus.message=err.message;notify();}};
})();
