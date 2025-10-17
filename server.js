import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
const GENIUS_TOKEN = "PASTE_YOUR_GENIUS_ACCESS_TOKEN_HERE";

app.get("/api/lyrics", async (req, res) => {
  try {
    const q = req.query.q;
    const r = await fetch(`https://api.genius.com/search?q=${encodeURIComponent(q)}`, {
      headers: { Authorization: `Bearer ${GENIUS_TOKEN}` },
    });
    const data = await r.json();
    if (!data.response.hits.length) return res.json({ error: "No results found." });

    const song = data.response.hits[0].result;
    res.json({
      title: song.full_title,
      image: song.song_art_image_url,
      lyrics: `Open full lyrics: ${song.url}`,
    });
  } catch (err) {
    res.json({ error: "API error." });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
