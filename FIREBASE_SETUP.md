# One-time cloud backup setup (Firebase)

The app already contains the sign-in and automatic-backup code. This setup only supplies your own Firebase project connection.

1. Go to the Firebase console and create a project. Google Analytics is optional for this app.
2. Add a **Web app** to the Firebase project and copy the Firebase configuration object.
3. In **Authentication**, enable **Google** and **Email/Password** sign-in. Add `ryan5027.github.io` as an authorized domain if it is not already listed.
4. Create a **Cloud Firestore** database. Start with locked/production rules, not open test rules.
5. Use Firestore rules that allow each signed-in user to read/write only their own user document subtree:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

6. Open `firebase-config.js` from this package and replace `null` with the configuration object Firebase gave you, for example:

```js
window.WORKOUT_FIREBASE_CONFIG = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

7. Upload the updated `firebase-config.js` to GitHub and let GitHub Pages redeploy.
8. Open **Program → Settings** in the workout app and sign in with Google or email/password. The existing local workout history will become the first cloud backup if no prior backup exists.

Automatic backup is debounced and runs after workouts, notes, settings, and other saved changes. On a replacement phone, install the app and sign in; when the local app is empty and a cloud backup exists, the cloud history is restored automatically.
