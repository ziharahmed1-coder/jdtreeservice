# Video Setup Instructions

The video files referenced in `Hero.tsx` and `CinematicCTA.tsx` are currently pointing to `/videos/jd-canopy.mp4`. Follow these steps to make videos work:

## For Lovable Hosting

1. **Create public directory**: 
   ```bash
   mkdir -p public/videos
   ```

2. **Place your video file**:
   - Copy `jd-canopy.mp4` to `public/videos/jd-canopy.mp4`
   - File size: ~10.5 MB

3. **Verify in dev**:
   ```bash
   npm run dev
   # Navigate to http://localhost:5173
   # Videos should play in Hero and CinematicCTA sections
   ```

## For Vercel Deployment

1. **Same steps as Lovable**:
   - `public/videos/jd-canopy.mp4` is automatically served at `/videos/jd-canopy.mp4` on Vercel

2. **Deploy**:
   ```bash
   git add public/videos/jd-canopy.mp4
   git commit -m "Add video files"
   git push origin main
   ```
   
3. **Vercel will automatically serve the video**

## File Structure
```
jdtreeservice/
├── public/
│   └── videos/
│       └── jd-canopy.mp4          ← Place your video here
├── src/
│   ├── components/
│   │   ├── Hero.tsx               ← Uses /videos/jd-canopy.mp4
│   │   └── CinematicCTA.tsx       ← Uses /videos/jd-canopy.mp4
│   └── assets/
│       ├── jd-canopy.mp4.asset.json   ← Old CDN reference (no longer used)
│       └── canopy-poster.jpg
└── package.json
```

## Troubleshooting

### Video still doesn't play
- Check browser console for 404 errors
- Ensure file is at `public/videos/jd-canopy.mp4`
- Verify video codec: MP4 with H.264 video + AAC audio
- Test direct URL: `http://localhost:5173/videos/jd-canopy.mp4`

### Large file size
- Original: 10.5 MB
- Consider compressing: `ffmpeg -i jd-canopy.mp4 -c:v libx264 -crf 28 -c:a aac -b:a 128k jd-canopy-compressed.mp4`
- Vercel has 50 MB limit per function, but static files have no limit

### Video not autoplay on mobile Safari
- Videos need `muted` attribute (✓ already added)
- Videos need `playsInline` attribute (✓ already added)
- Some iOS versions still require user interaction

## Current Video References

Both components now use:
```typescript
const VIDEO_URL = "/videos/jd-canopy.mp4";

<video src={VIDEO_URL} ... />
```

This works on:
- ✅ Lovable dev/preview
- ✅ Vercel deployment
- ✅ Any static host (with `public/` folder support)
