# For Sam, With Love ✨ — Birthday Surprise Website

A mobile-friendly React + Vite birthday experience with a romantic cinematic theme, three unlock levels, a photo gallery, a final friends' wishes video, and optional background music.

## 1. What you'll need
- Node.js 20+ installed
- VS Code
- A GitHub account
- A Render account
- Your own photos, the combined wishes video, and a music file you have permission to use

## 2. Add your media
Put your files in these folders (create the folders if needed):

- `public/photos/`: add 3–8 JPG, PNG, or WebP photos.
- `public/videos/friends-wishes.mp4`: your combined birthday wishes video.
- `public/music/birthday.mp3`: background music.

The starter gallery uses `/photos/memory-1.jpg`, `/photos/memory-2.jpg`, and `/photos/memory-3.jpg`. Either add files with those exact names or change the `MEMORIES` array in `src/App.jsx` to match your filenames and captions.

**Video tip:** compress the final MP4 before uploading. Very large videos can make deployments slow. For a long/high-resolution video, use a video hosting service with private/unlisted access and replace the `<video>` source in `src/App.jsx` with its embed or playback URL. A file in `public/` is public to anyone who has its URL.

**Music tip:** browsers usually block autoplay with sound. Sam can tap the music button to start/stop music. Use a track you have the right to share.

## 3. Run locally
Open a terminal in this project folder and run:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

Test on a phone using your computer's local network address if both devices are on the same Wi-Fi, or use your browser's mobile device preview.

## 4. Customize the questions and wording
Open `src/App.jsx` and edit:
- `QUIZ_LEVELS`: replace the example questions/answers with your real inside jokes and memories.
- `MEMORIES`: set each photo path, short title, and caption.
- `LOVE_NOTE`: customize the final note.
- `VIDEO_PATH`: change the video path if you use another filename.

The example answers are placeholders, not facts about your relationship. Replace them before sharing the site.

## 5. Deploy to Render
1. Create a GitHub repository and push this project.
2. In Render, choose **New + → Static Site** and connect your repository.
3. Build command: `npm install && npm run build`
4. Publish directory: `dist`
5. Click **Deploy Static Site**. The included `render.yaml` can also configure the service.
6. Open the Render URL on your phone and test the full experience.

## 6. Important privacy note
This is a playful surprise, not a secure access-control system. The quiz gates are client-side, so a technically curious visitor could bypass them; files inside `public/` are publicly accessible if someone knows their URLs. Do not upload anything that must remain confidential. For truly protected video access, host it behind authenticated/server-authorized access.

## Suggested birthday flow
1. Opening page → tap “Begin the surprise”
2. Level 1 → cute relationship quiz
3. Level 2 → memory clues
4. Level 3 → final birthday challenge
5. Unlock the gallery and wishes video

Make sure the questions feel fun rather than stressful; the hint button is there to help.
